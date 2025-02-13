
## Contribution Guide

This document serves as a guide for contributing to this project. It is primarily written for my practice and as a personal reminder.

While contributions from others are NOT expected, they are welcome if they improve my content (e.g., typos, misinformation, etc.).

### Table of Content

- [Prerequisites](#prerequisites)
- [How to Start Developing](#how-to-start-developing)
  - [Create A GitHub Issue](#create-a-github-issue)
  - [Setup Your Local](#setup-your-local)
  - [Start Coding](#start-coding)
  - [Commit and Push to Remote](#commit-and-push-to-remote)
  - [Create A Pull Request](#create-a-pull-request)
  - [Clean up The Mess](#clean-up-the-mess)

### Prerequisites

You need to install:

- [Git](https://git-scm.com/)
- [Nix](https://nixos.org/download/#download-nix)

> [!IMPORTANT]
> You can also start coding without them, but need to install required packages and libraries in your local in that case.

### How to Start Developing

#### Create A GitHub Issue

As this project adopts Issue-driven Development, you need to create a GitHub issue first.

> [!NOTE]
> Issue-driven Development is a dev process where:
> - developers are always supposed to create a Github issue first whenever starting coding
> - issues are associated with specific branches one-to-one, in which development proceeds
> - After peer code reviews and passing your team's conventional rules, commits are finally merged into the main branch

1. On [the issue page](https://github.com/brklntmhwk/younagi.dev/issues), create an issue
    - Select a template that matches the purpose of your issue
    - Add a label that describes the purpose well on an as-needed basis
      - Some templates has the default setting so you don't have to do so
    - In your issue, clarify the following points
        - The purpose
        - As-is
        - To-be
2. Select "Create a branch for this issue or link a pull request" to create a branch for your issue
    - e.g., "18-refine-readme" for an issue #18 to refine the README doc

> [!NOTE]
> You can also do them on the terminal by using `gh`, the official GitHub CLI.

#### Setup Your Local

1. In your local, execute `git switch -c [[the branch name]]`
    - If you have yet to `git clone` it, execute `git clone https://github.com/brklntmhwk/younagi.dev.git` first
        - In a real project run by a team, fork this project first via [the Github repo](https://github.com/brklntmhwk/younagi.dev) and then clone it
    - Hereafter, you're supposed to be at the project root
2. Execute `git pull origin [[the branch name]]` to keep your local up to date
3. Create `.env` and `.dev.vars` at the root
    - see `.env.example` and `.dev.vars.example` for reference, respectively

#### Start Coding

1. Run `nix develop`
    - Enter into the Nix dev environment
2. Run `bun dev`
    - Setup the localhost

#### Commit and Push to Remote

After you're finished coding a small chunk,

1. Run `git add .` > `bun cz`
2. Follow the terminal prompts
3. Finished commiting the changes you made!
4. Run `git push -u origin [[the branch name]]` the first time (\* Next time, you can do it with `git push`)

#### Create A Pull Request

1. Go to [the project's repo](https://github.com/brklntmhwk/younagi.dev) and create a pull request for your currently working branch
    - The title of pull requests must be in this format: `<type>(<scope>): detailed descriptions here...`
      - Check the `cz.config.mjs` or `dangerfile.ts` file for allowed types
        - Scopes can be anything and optional
      - e.g., "feat(ui): add likes button", "ci: modify dev workflow"
2. Fix your code over the course of the peer code review
    - Once the team gives you the green light, your commits will be merged into the main branch

> [!NOTE]
> You can also do them on the terminal by using `gh`, the official GitHub CLI.

#### Clean up The Mess

1. Confirm if the merge is done without any problem
2. Delete the remote branch from [this page](https://github.com/brklntmhwk/younagi.dev/branches)
3. Run `git switch main` > `git branch -d [[the branch name]]`
    - Delete the branch in local too
4. Run `git pull origin main`
    - Update the main branch in your local too
