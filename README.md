# vite-yaml-plugin
[![](https://img.shields.io/npm/v/vite-yaml-plugin.svg?style=flat)](https://www.npmjs.org/package/vite-yaml-plugin) [![](https://img.shields.io/npm/dm/vite-yaml-plugin.svg)](https://www.npmjs.org/package/vite-yaml-plugin) [![](https://packagephobia.com/badge?p=vite-yaml-plugin)](https://packagephobia.com/result?p=vite-yaml-plugin)

Vite plugin to import YAML files, with minimal dependencies

## Usage

#### vite.config.js

```js
import {defineConfig} from "vite";
import {yamlPlugin} from "vite-yaml-plugin";

export default defineConfig({
  plugins: [
    yamlPlugin(),
  ],
});
```
#### file.js

```js
import foo from "./foo.yaml";
```

## Options

- `match`: Regex to match the path against. Default: `/\.(yaml|yml)$/i`.
- `opts`: Options passed to js-yaml's `load` function.

Parsing follows the YAML 1.2 `CORE_SCHEMA` (js-yaml's default). To restore YAML 1.1 behavior (merge keys, timestamps, octal `0NNN`, etc.), pass `opts: {schema: YAML11_SCHEMA}` using the `YAML11_SCHEMA` export from `js-yaml`.

## Typescript

Add `vite-yaml-plugin/types` to your `types` in `tsconfig.json`:

```json
{
  "compilerOptions": {
    "types": [
      "vite-yaml-plugin/types"
    ]
  }
}
```

Alternatively, you can also add ambient type declarations:

```ts
declare module "*.yaml" {
  const value: Record<string, any>;
  export default value;
}
declare module "*.yml" {
  const value: Record<string, any>;
  export default value;
}
```

## Related

- [`vite-string-plugin`](https://github.com/silverwind/vite-string-plugin)
