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
RUN bun --bun run build

############################################################################
# Runtime Stage
# Launch the project
############################################################################
# The GLIBC version of the Debian in the oven/bun image is discrepant with that of the Lefthook, which causes an error.
# That's why other compatible image must be used here
FROM ubuntu:24.10 AS runtime

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
    ca-certificates curl git unzip binutils \
    && apt-get auto-remove -y \
    && apt-get clean -y

# Define the base path for Bun related bins
ARG ORIGINAL_BUN_PATH=/root/.bun
ARG BIN_BASE_PATH=/usr/local/bin

# Install Bun
RUN curl -fsSL https://bun.sh/install | bash \
    && mv $ORIGINAL_BUN_PATH/bin/bun $BIN_BASE_PATH/bun \
    && rm -rf $ORIGINAL_BUN_PATH \
    && ln -s $BIN_BASE_PATH/bun $BIN_BASE_PATH/bunx \
    && chmod a+x $BIN_BASE_PATH/bun

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
ENV PNPM_HOME="$BIN_BASE_PATH/pnpm"
ENV PATH="$PNPM_HOME:$PATH"

# Enable pnpm
RUN corepack enable pnpm

# Install Git-cz globally
RUN pnpm install -g git-cz

## Git-cz could also be available via another route below but the "commit init git-cz ..." command took a large amount of time

# Install Commitizen & Git-cz globally
# RUN pnpm install -g commitizen

# Init git-cz
# RUN commitizen init git-cz --save-dev --save-exact

# Execute as a non-root user hereafter
USER $USERNAME
