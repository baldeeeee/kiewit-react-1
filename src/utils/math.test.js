import { add } from "./math";
import { isTSAnyKeyword } from "@babel/types";

it("should return 3 when passed 1 and 2", () => {
  //arrange
  //act
  const result = add(1, 2);
  //assert
  expect(result).toBe(3);
});
