module.exports = {
  disableEmoji: false,
  list: [
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
    'package',
  ],
  maxMessageLength: 72,
  minMessageLength: 3,
  questions: ['type', 'scope', 'subject', 'body', 'breaking', 'issues', 'lerna'],
  scopes: ['api', "cms", 'config', 'contents', 'db', 'deps', 'docker', 'i18n', 'none', 'ui', "utils"],
  types: {
    chore: {
      description: 'Build process or auxiliary tool changes',
      emoji: '🤖',
      value: 'chore',
    },
    ci: {
      description: 'CI related changes',
      emoji: '🎡',
      value: 'ci',
    },
    docs: {
      description: 'Doc or article tweaks only',
      emoji: '📖',
      value: 'docs',
    },
    feat: {
      description: 'A new feature',
      emoji: '🆕',
      value: 'feat',
    },
    fix: {
      description: 'A bug fix',
      emoji: '🐛',
      value: 'fix',
    },
    perf: {
      description: 'A code tweak for performance enhancement',
      emoji: '⚡️',
      value: 'perf',
    },
    refactor: {
      description: 'A code tweak that neither fixes a bug or adds a new feature(rename a variable etc...)',
      emoji: '✨',
      value: 'refactor',
    },
    revert: {
      description: 'Reverting to a previous commit',
      emoji: '🔙',
      value: 'revert',
    },
    style: {
      description: 'Formatting tweaks(Markup, white-space, missing semi-colons etc...)',
      emoji: '💄',
      value: 'style',
    },
    test: {
      description: 'Tweaks for tests',
      emoji: '✒️',
      value: 'test',
    },
    package: {
      description: 'Package changes(install, update, remove etc...)',
      emoji: '📦',
      value: 'package',
    },
  },
};
