import { danger, fail, markdown, warn } from 'danger';

const checkPRTitle = () => {
  const title = danger.github.pr.title;

  // These must be consistent with those in the changelog config
  const typeAllowList = [
    'test',
    'feat',
    'fix',
    'chore',
    'docs',
    'refactor',
    'revert',
    'style',
    'ci',
    'perf',
  ];
  const scopeAllowList = [
    'api',
    'cms',
    'config',
    'content',
    'db',
    'dev',
    'deps',
    'lang',
    'others',
    'some',
    'ui',
    'utils',
  ];

  const typePattern = typeAllowList.join('|');
  const scopePattern = scopeAllowList.join('|');
  const titleRegex = new RegExp(`^(${typePattern})\\((${scopePattern})\\): .+`);

  if (!titleRegex.test(title)) {
    fail(`**:x: Invalid PR title: ${title}**\n`);
    markdown(
      `Use either of the following type & scope instead.\n
        **Allowed type list:**\n
        - ${typeAllowList.join(',')}\n
        **Allowed scope list:**\n
        - ${scopeAllowList.join(',')}\n
        e.g., feat(ui): 🆕 add a likes button\n`,
    );
  }
};

const warnLargePR = () => {
  const changedFiles = danger.github.pr.changed_files;
  const changedLinesTotal =
    danger.github.pr.additions + danger.github.pr.deletions;

  if (changedLinesTotal > 500 || changedFiles > 30) {
    warn('**:warning: PR size appears relatively large.**\n');
    markdown(
      `Preferably, break changes into separate PRs for faster and easier code review.\n
      - Changed files: ${changedFiles}\n
      - Changed lines: ${changedLinesTotal}\n`,
    );
  }
};

const preventInconsistentDeps = () => {
  const hasPackageChanges = danger.git.modified_files.includes('packge.json');
  const hasLockfileChanges = danger.git.modified_files.includes('bun.lockb');

  if (hasPackageChanges && !hasLockfileChanges) {
    fail(
      '**:x: Inconsistent deps changes detected.**\n' +
        'Make changes in package.json consistent with those in your lockfile.\n',
    );
  }
};

checkPRTitle();
warnLargePR();
preventInconsistentDeps();
