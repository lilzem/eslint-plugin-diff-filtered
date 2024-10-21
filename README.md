## Installation

Get the plugin and extend your ESLint config.

### Install

```sh
npm install --save-dev eslint eslint-plugin-diff-filtered
yarn add -D eslint eslint-plugin-diff-filtered
pnpm add -D eslint eslint-plugin-diff-filtered
```

### Extend config

Extend your ESLint config with one of our configs.

#### `"plugin:diff/diff"`

Only lint changes

```json
{
  "extends": ["plugin:diff/diff"]
}
```