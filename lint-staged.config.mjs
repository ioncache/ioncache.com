const quotePath = (filePath) => JSON.stringify(filePath);

const runCommand =
  ({ command }) =>
  (filePaths) => {
    if (filePaths.length === 0) {
      return [];
    }

    return `${command} ${filePaths.map(quotePath).join(' ')}`;
  };

const compactCommands = (commands) =>
  commands.filter((command) => typeof command === 'string');

const runMarkdownTasks = (filePaths) =>
  compactCommands([
    runCommand({ command: 'markdownlint-cli2' })(filePaths),
    runCommand({ command: 'oxfmt' })(filePaths),
  ]);

export default {
  '*.{js,mjs,cjs}': [
    runCommand({ command: 'oxlint --fix' }),
    runCommand({ command: 'oxfmt' }),
  ],
  '*.json': [runCommand({ command: 'oxfmt' })],
  '*.md': runMarkdownTasks,
};
