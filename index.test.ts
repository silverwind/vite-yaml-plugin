import {yamlPlugin} from "./index.ts";
import petstore from "./fixtures/petstore.yaml";

test("exists", () => {
  expect(yamlPlugin).toBeFunction();
});

test("yaml", () => {
  expect(petstore).toMatchSnapshot();
});
