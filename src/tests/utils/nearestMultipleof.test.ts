import { expect, test } from "vitest"
import nearestMultipleOf from "../../utils/nearestMultipleOf"

test("nearestMultipleof", () => {
  expect(nearestMultipleOf(199, 40)).toBe(200)

  expect(nearestMultipleOf(160, 40)).toBe(160)

  expect(nearestMultipleOf(0, 10)).toBe(0)
})
