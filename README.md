## Installation

Get the plugin and extend your ESLint config.

### Install

```sh
npm install --save-dev eslint eslint-plugin-diff
yarn add -D eslint eslint-plugin-diff
pnpm add -D eslint eslint-plugin-diff
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