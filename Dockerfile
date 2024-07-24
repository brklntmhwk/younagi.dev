############################################################################
# Base Stage
# Getting the base image
############################################################################
FROM oven/bun:slim AS base

# Explicitly define the arg to be used at this stage
ARG PROJECT_DIR

# Move to the project dir
WORKDIR /$PROJECT_DIR

############################################################################
# Cacher Stage
# Installing dependencies for the project
############################################################################
FROM base AS cacher

# Copy the project
COPY package.json bun.lockb ./

# Install dependencies
RUN bun install --no-save

############################################################################
# Builder Stage
# Building the project
############################################################################
FROM cacher AS builder

# Copy the project
COPY . .

# Build the app
RUN bun --bun run build

############################################################################
# Runtime Stage
# Launching the project
############################################################################
FROM base AS runtime

ARG USERNAME
# ARG USER_UID
# ARG USER_GID
ARG PROJECT_DIR

# Copy dependencies
COPY --from=cacher /$PROJECT_DIR/node_modules node_modules

# Copy the build artifacts
COPY --from=builder /$PROJECT_DIR/dist dist

# Add a non-root user
# RUN groupadd --gid $USER_GID $USERNAME \
#     && useradd -m -s /bin/bash $USERNAME --uid $USER_UID --gid $USER_GID \
#     && apt-get update \
#     && apt-get install -y sudo \
#     && echo $USERNAME ALL=\(root\) NOPASSWD:ALL > /etc/sudoers.d/$USERNAME \
#     && chmod 0440 /etc/sudoers.d/$USERNAME

# Install packages
RUN apt-get update \
    && apt-get -y install --no-install-recommends \
    ca-certificates curl git sudo unzip \
    && apt-get auto-remove -y \
    && apt-get clean -y

# Install Node.js and npm
RUN curl -fsSL https://deb.nodesource.com/setup_20.x | bash -
RUN apt-get update \
    && apt-get -y install nodejs

# Install Commitizen & Git-cz
RUN npm install -g commitizen git-cz

# Init Git-cz
RUN commitizen init git-cz --save-dev --save-exact

# Execute as a non-root user hereafter
USER $USERNAME
