/** @type {import('semantic-release').Options} */
const config = {
  branches: 'main',
  plugins: [
    [
      '@semantic-release/commit-analyzer',
      {
        preset: 'conventionalcommits',
        parserOpts: {
          noteKeywords: ['BREAKING CHANGE', 'BREAKING CHANGES', 'BREAKING'],
        },
        releaseRules: [
          {type: 'chore', release: 'patch'},
          {
            type: 'docs',
            release: 'patch',
          },
          {
            type: 'build',
            release: 'patch',
          },
          {
            type: 'ci',
            release: 'patch',
          },
          {
            type: 'style',
            release: 'patch',
          },
          {
            type: 'test',
            release: 'patch',
          },
        ],
      },
    ],
    [
      '@semantic-release/release-notes-generator',
      {
        preset: 'conventionalcommits',
        parserOpts: {
          noteKeywords: ['BREAKING CHANGE', 'BREAKING CHANGES', 'BREAKING'],
        },
        writerOpts: {
          commitsSort: ['subject', 'scope'],
        },
        presetConfig: {
          types: [
            {type: 'feat', section: 'Features'},
            {type: 'fix', section: 'Bug Fixes'},
            {type: 'chore', section: 'Chores', hidden: false},
            {type: 'build', section: 'Builds', hidden: false},
            {type: 'ci', section: 'CI/CD', hidden: false},
            {type: 'docs', section: 'Docs', hidden: false},
            {type: 'style', section: 'Code Style', hidden: false},
            {type: 'refactor', section: 'Refactors', hidden: false},
            {type: 'perf', section: 'Performance Improvements', hidden: false},
            {type: 'test', section: 'Tests', hidden: false},
          ],
        },
      },
    ],
    '@semantic-release/changelog',
    '@semantic-release/github',
    '@semantic-release/npm',
    [
      '@semantic-release/git',
      {
        message:
          // eslint-disable-next-line no-template-curly-in-string
          'chore(release): ${nextRelease.version} [skip ci]\n\n${nextRelease.notes}',
      },
    ],
  ],
};

module.exports = config;
