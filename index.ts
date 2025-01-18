import {readFile} from "node:fs/promises";
import {load as loadYaml, DEFAULT_SCHEMA, type LoadOptions} from "js-yaml";
import type {Plugin} from "vite";

type ViteYamlPluginOpts = {
  /** Regex to match on the file path. Default: `/\.(yml|yaml)$/i` */
  match?: RegExp;
  /** Options passed to js-yaml's `load` function */
  opts?: LoadOptions,
}

/** Vite plugin to import YAML files */
export const yamlPlugin: (opts?: ViteYamlPluginOpts) => Plugin = ({match = /\.(yml|yaml)$/i, opts}: ViteYamlPluginOpts = {}): Plugin => ({
  name: "vite-yaml-plugin",
  enforce: "pre",
  async load(id) {
    const path = id.split("?")[0];
    if (!match.test(path)) return null;
    const data = loadYaml(await readFile(path, "utf8"), {
      filename: path,
      onWarning: (err) => { console.warn(String(err)); },
      schema: DEFAULT_SCHEMA,
      ...opts,
    });
    return {
      code: `export default ${JSON.stringify(data)};\n`,
      map: {mappings: ""},
    };
  }
});
