# younagi.dev

[![Production deployment](https://github.com/brklntmhwk/younagi.dev/actions/workflows/prod.yml/badge.svg)](https://github.com/brklntmhwk/younagi.dev/actions/workflows/prod.yml)

![younagi.dev site image](/public/placeholder.jpg)

A website where Nagi, just another engineer & creator, posts his work and writings every so often.

## Tech stack

- **Languages:**
  - [TypeScript](https://www.typescriptlang.org/): JavaScript with syntax for types
  - [TSX](https://www.typescriptlang.org/docs/handbook/jsx.html): JSX, an embeddable XML-like syntax, written in TypeScript
  - [YAML](https://yaml.org/): A human-friendly data serialization language
- **Data format**:
  - [JSON](https://www.json.org/json-en.html): A lightweight data-interchange format
- **Meta framework:**
  - [Astro](https://astro.build/): The web framework for content-driven websites
- **Framework:**
  - [SolidJS](https://www.solidjs.com/): A declarative, efficient and flexible JavaScript library for building UIs
- **Styling:**
  - [Vanilla CSS](https://www.w3.org/Style/CSS/Overview.en.html): A simple mechanism for adding style to Web documents
  - [Astro's Scoped CSS](https://docs.astro.build/en/guides/styling/#scoped-styles): Vanilla CSS encapsulated inside Astro components
  - [Vanilla Extract](https://vanilla-extract.style/): Zero-runtime stylesheets in TypeScript
- **DB:**
  - [Cloudflare D1](https://developers.cloudflare.com/d1/)([Sqlite](https://www.sqlite.org/)): Cloudflare’s native serverless database
- **ORM:**
  - [Drizzle ORM](https://orm.drizzle.team/): A lightweight and performant TypeScript ORM
- **Dev:**
  - [Dev Containers](https://code.visualstudio.com/docs/devcontainers/containers): Docker containers that are specifically configured to provide a fully featured development environment
  - [Docker](https://www.docker.com/): An open platform for developing, shipping, and running applications
- **CI/CD:**
  - [Github Actions](https://github.co.jp/features/actions): A CI/CD platform fully based in Github
  - [DangerJS](https://danger.systems/js/): An automation tool for your team's conventions surrounding code review
- **Commit management:**
  - [Git-cz](https://ttys3.github.io/git-cz/): A Conventional commit CLI
- **Deployment:**
  - [Cloudflare Pages](https://pages.cloudflare.com/): A JAMstack platform for frontend developers to collaborate and deploy websites
- **CMS:**
  - [Front Matter CMS](https://frontmatter.codes/): The CMS that runs within VSCode, GitPod, etc
- **Bot management:**
  - [Cloudflare Turnstile](https://www.cloudflare.com/products/turnstile/): Cloudflare's CAPTCHA alternative solution
- **Package manager:**
  - [Bun](https://bun.sh/): An all-in-one JavaScript runtime & toolkit
- **Dependency management:**
  - [Renovate](https://github.com/renovatebot/renovate): A Github app that keeps deps up-to-date using automated PRs
- **Linter & formatter:**
  - [Biome](https://biomejs.dev/): Both a fast formatter and performant linter
- **Proofreading:**
  - [Textlint](https://textlint.github.io/): The pluggable linting tool for text and markdown
- **Git hooks manager:**
  - [Lefthook](https://github.com/evilmartians/lefthook): A polyglot Git hooks manager
- **Email sender:**
  - [Resend](https://resend.com/docs/introduction): A simple email API for developers

## Ready, Set, Go!

This section is a memo for myself assuming there are other project members or contributers.

### Prerequisites

You need to:

- install [VSCode](https://code.visualstudio.com/) on your local machine
- install [the Remote Development extension](https://github.com/Microsoft/vscode-remote-release) in your VSCode editor

> [!IMPORTANT]
> You can also start coding without them, but need to install required packages and libraries in your local in that case.

### The Dev Workflow

This project adopts Issue-driven Development.

> [!NOTE]
> Issue-driven Development is a dev process where:
> - developers are always supposed to create a Github issue first whenever starting coding
> - issues are associated with specific branches one-to-one, in which development proceeds
> - After peer code reviews and passing your team's conventional rules, changes are finally merged into the main branch

1. On [the issue page](https://github.com/brklntmhwk/younagi.dev/issues), Create an issue
    - Preferably add a label that matches the purpose of your issue
    - In your issue, clarify the following points
        - The purpose
        - As-is
        - To-be
2. Select "Create a branch for this issue or link a pull request" to create a branch for your issue
    - e.g., "18-refine-readme" for an issue #18 to refine the README doc
3. In your local dev environment, execute `git switch -c [[the branch name]]`
    - If you haven't had a clone of this project, execute `git clone https://github.com/brklntmhwk/younagi.dev.git` first
    - Hereafter, you're supposed to be at the project root
4. Execute `git pull origin [[the branch name]]` to keep your local up to date
5. Start coding!
    1. Open the VSCode command palette
    2. Select "Dev Containers: Reopen Container"
        - It starts rebuilding the container if needed
        - It might take longer the first time
6. After you're finished coding, execute `git add .` > `git cz`, add commit info answering prompts, and then execute `git push origin [[the branch name]]`
7. Go to [the project's repo](https://github.com/brklntmhwk/younagi.dev) and create a pull request for changes you've made
    - The title of pull requests must be in this format: `[[type]]([[scope]]): detailed descriptions here...`
      - Check the changelog config or dangerfile for allowed types & scopes
8. Fix your code over the course of peer code review on an as-needed basis
    - Once the whole team gives you the green light, changes you've made will be merged into the main branch
9. Confirm if the merge is done without any problem and then delete the remote branch from [this page](https://github.com/brklntmhwk/younagi.dev/branches)
    - Execute `git switch main` > `git branch -d [[the branch name]]` to delete the one in local
