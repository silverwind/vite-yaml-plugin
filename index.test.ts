import {yamlPlugin} from "./index.ts";
import petstore from "./fixtures/petstore.yaml";
import {load} from "js-yaml";
import {readFile} from "node:fs/promises";

test("exists", () => {
  expect(yamlPlugin).toBeFunction();
});

test("petstore", async () => {
  expect(petstore).toMatchSnapshot();
  expect(load(await readFile("fixtures/petstore.yaml", "utf8"))).toEqual(petstore);
});
