#!/bin/bash

# Add the project directory as a safe directory in Git
git config --global --add safe.directory /workspace

# Make the ".git/hooks" consistent with your lefthook.yml
bun lefthook install
