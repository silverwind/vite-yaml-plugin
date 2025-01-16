import {readFile} from "node:fs/promises";
import {load as loadYaml} from "js-yaml";
import type {Plugin} from "vite";

type ViteYamlPluginOpts = {
  /** regex to match on the file path. Default: `/\.(yml|yaml)$/i` */
  match?: RegExp;
}

/** Vite plugin to import files as string */
type YamlPlugin = (opts?: ViteYamlPluginOpts) => Plugin;

export const yamlPlugin: YamlPlugin = ({match = /\.(yml|yaml)$/i}: ViteYamlPluginOpts = {}): Plugin => ({
  name: "vite-yaml-plugin",
  enforce: "pre",
  async load(id) {
    const path = id.split("?")[0];
    if (!match.test(path)) return null;
    return {
      code: `const data = ${JSON.stringify(loadYaml(await readFile(path, "utf8")))};\nexport default data;`,
      map: {mappings: ""},
    };
  }
});
