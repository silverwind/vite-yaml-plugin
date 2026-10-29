import {yamlPlugin} from "./index.ts";
import petstore from "./fixtures/petstore.yaml";
import prototypeKeys from "./fixtures/prototype-keys.yaml";
import {load} from "js-yaml";
import {readFile} from "node:fs/promises";

test("exists", () => {
  expect(yamlPlugin).toBeFunction();
});

test("petstore", async () => {
  expect(load(await readFile("fixtures/petstore.yaml", "utf8"))).toEqual(petstore);
});

test("preserves prototype keys as own properties", async () => {
  expect(prototypeKeys).toEqual(load(await readFile("fixtures/prototype-keys.yaml", "utf8")));
  for (const value of [prototypeKeys, prototypeKeys.nested, ...prototypeKeys.items]) {
    expect(Object.getPrototypeOf(value)).toBe(Object.prototype);
  }
});
