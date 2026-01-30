import {load, DEFAULT_SCHEMA, type LoadOptions} from "js-yaml";
import type {Plugin} from "vite";

export type ViteYamlPluginOpts = {
  /** Regex to match on the file path. Default: `/\.(yml|yaml)$/i` */
  match?: RegExp;
  /** Options passed to js-yaml's `load` function */
  opts?: LoadOptions,
};

/** Vite plugin to import YAML files */
export const yamlPlugin: (opts?: ViteYamlPluginOpts) => Plugin = ({match = /\.(yml|yaml)$/i, opts}: ViteYamlPluginOpts = {}): Plugin => ({
  name: "vite-yaml-plugin",
  transform: {
    filter: {
      id: match,
    },
    handler: (code, id) => ({
      code: `export default ${JSON.stringify(load(code, {
        filename: id.split("?")[0],
        onWarning: (err) => { console.warn(String(err)); },
        schema: DEFAULT_SCHEMA,
        ...opts,
      }))};\n`,
      map: {mappings: ""},
    }),
  },
});
