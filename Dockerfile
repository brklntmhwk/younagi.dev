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
FROM cacher AS builder

# Copy the project
COPY . .

# Build the app
RUN bun --bun run build

############################################################################
# Runtime Stage
# Launch the project
############################################################################
FROM base AS runtime

ARG USERNAME
ARG PROJECT_DIR

# Copy dependencies
COPY --from=cacher /$PROJECT_DIR/node_modules node_modules

# Copy the build artifacts
COPY --from=builder /$PROJECT_DIR/dist dist

# The oven/bun Docker image prepares a non-root user "bun" with its ID "1000" so you don't have to do it on your own
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
    ca-certificates curl git sudo \
    && apt-get auto-remove -y \
    && apt-get clean -y

# Install Lefthook
RUN apt-get update \
    && curl -1sLf 'https://dl.cloudsmith.io/public/evilmartians/lefthook/setup.deb.sh' | bash \
    && apt-get -y install lefthook

# Install Node.js & npm (To install git-cz, bun didn't work somewhat)
RUN apt-get update \
    && curl -fsSL https://deb.nodesource.com/setup_20.x | bash - \
    && apt-get -y install nodejs

# Set the pnpm bin dir
ENV PNPM_HOME="/pnpm"
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
