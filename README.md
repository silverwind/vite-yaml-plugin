# vite-yaml-plugin
[![](https://img.shields.io/npm/v/vite-yaml-plugin.svg?style=flat)](https://www.npmjs.org/package/vite-yaml-plugin) [![](https://img.shields.io/npm/dm/vite-yaml-plugin.svg)](https://www.npmjs.org/package/vite-yaml-plugin) [![](https://packagephobia.com/badge?p=vite-yaml-plugin)](https://packagephobia.com/result?p=vite-yaml-plugin)

Vite plugin to import files as string, with zero dependencies

## Usage

#### vite.config.js

```js
import {defineConfig} from "vite";
import {stringPlugin} from "vite-yaml-plugin";

export default defineConfig({
  plugins: [
    stringPlugin(),
  ],
});
```
#### file.js

```js
import foo from "./foo.svg";
```

## Options

- `match`: Regex to match the path against. Default: `/\.(svg|md|xml)$/i`.

## Typescript

Add these to your project-specific type declarations:

```ts
declare module "*.svg" {
  const value: string;
  export default value;
}
declare module "*.md" {
  const value: string;
  export default value;
}
declare module "*.xml" {
  const value: string;
  export default value;
}
```
