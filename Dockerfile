############################################################################
# Base Stage
# Prepare the base image
############################################################################
FROM oven/bun:slim AS base

# Explicitly define the arg to be used at this stage
ARG PROJECT_DIR

# Move to the project dir
WORKDIR /$PROJECT_DIR

############################################################################
# Cacher Stage
# Install dependencies for the project
############################################################################
FROM base AS cacher

# Copy deps files
COPY package.json bun.lockb ./

# Install dependencies
RUN bun install

############################################################################
# Builder Stage
# Build the project
############################################################################
FROM base AS builder

# Copy dependencies
COPY --from=cacher /$PROJECT_DIR/node_modules node_modules

# Copy the project
COPY . .

# Build the app
# RUN bun run build

############################################################################
# Runtime Stage
# Launch the project
############################################################################
# The GLIBC version of the Debian in the oven/bun image is discrepant with that of the Lefthook, which causes an error.
# That's why other compatible image must be used here
FROM ubuntu:oracular-20240617 AS runtime

# Move to the project dir
WORKDIR /$PROJECT_DIR

ARG PROJECT_DIR
ARG USERNAME
ARG USER_UID
ARG USER_GID

# Add a non-root user
RUN groupadd --gid $USER_GID $USERNAME \
    && useradd -m -s /bin/bash $USERNAME --uid $USER_UID --gid $USER_GID \
    && apt-get update \
    && apt-get install -y sudo \
    && echo $USERNAME ALL=\(root\) NOPASSWD:ALL > /etc/sudoers.d/$USERNAME \
    && chmod 0440 /etc/sudoers.d/$USERNAME

# Copy the whole project
COPY --from=builder --chown=$USERNAME:$USERNAME /$PROJECT_DIR /$PROJECT_DIR

# Install packages
RUN apt-get update \
    && apt-get -y install --no-install-recommends \
    ca-certificates curl git unzip \
    && apt-get auto-remove -y \
    && apt-get clean -y

# Install Lefthook
# (Must be installed here otherwise it'll be unavailable in the script for the "postCreateCommand" in devcontainer and thereafter)
RUN curl -1sLf 'https://dl.cloudsmith.io/public/evilmartians/lefthook/setup.deb.sh' | bash \
    && apt-get update \
    && apt-get -y install lefthook

# Install Node.js & npm (To install git-cz, bun didn't work somewhat)
RUN apt-get update \
    && curl -fsSL https://deb.nodesource.com/setup_20.x | bash - \
    && apt-get -y install nodejs

# Set the pnpm bin dir
ARG BIN_BASE_PATH=/usr/local/bin
ENV PNPM_HOME="$BIN_BASE_PATH/pnpm"
ENV PATH="$PNPM_HOME:$PATH"

# Enable pnpm
RUN corepack enable pnpm

# Install Git-cz globally
RUN pnpm install -g git-cz

# Execute as a non-root user hereafter
USER $USERNAME

# Copy the tool-versions file
# COPY .tool-versions ./.tool-versions

# Define the user's home path
ARG USER_HOME=/home/$USERNAME

# Install Mise & other tools specified in the tool-versions file
# RUN curl https://mise.run | sh \
#     && $USER_HOME/.local/bin/mise install \
#     && $USER_HOME/.local/bin/mise reshim \
#     && echo 'eval "$('$USER_HOME'/.local/bin/mise activate bash)"' >> ~/.bashrc \
#     && echo 'export PS1="\[\e[1;32m\]\u@\h\[\e[0m\]:\[\e[1;31m\]\w\[\e[0m\]\$ "' >> ~/.bashrc
