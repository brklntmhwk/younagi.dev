#!/bin/bash

# Add the project directory as a safe directory in Git
git config --global --add safe.directory /workspace

# Set required user info for the container user.
# As to the email, set an alternative one available for the private email setting "Keep my email addresses private" in Github
git config --global user.email "86272619+brklntmhwk@users.noreply.github.com"
git config --global user.name "brklntmhwk_dev"

# Make the settings in ".git/hooks" consistent with your lefthook.yml
lefthook install

# # Install tools specified in the .tool-versions file
# mise install
