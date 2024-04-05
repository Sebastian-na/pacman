import { getIntersectionAxis } from "../../utils/bounding-rect"
import { expect, test } from "vitest"

test("intersects x axis", () => {
  const rect1 = {
    x: 0,
    y: 0,
    width: 10,
    height: 10,
  }

  const rect2 = {
    x: 5,
    y: 5,
    width: 10,
    height: 10,
  }

  const intersection = getIntersectionAxis(rect1, rect2)
  expect(intersection).toBe("x")

  const rect3 = {
    x: 199,
    y: 20,
    width: 40,
    height: 40,
  }
  // 199 - 239

  const rect4 = {
    x: 160,
    y: 40,
    width: 40,
    height: 40,
  }
  // 160 - 200

  const intersection2 = getIntersectionAxis(rect3, rect4)

  expect(intersection2).toBe("x")
})

test("intersects y axis", () => {
  const rect1 = {
    x: 0,
    y: 0,
    width: 10,
    height: 10,
  }

  const rect2 = {
    x: 0,
    y: 5,
    width: 10,
    height: 10,
  }

  const intersection = getIntersectionAxis(rect1, rect2)
  expect(intersection).toBe("y")
})

test("does not intersect y axis", () => {
  const rect1 = {
    x: 0,
    y: 0,
    width: 10,
    height: 10,
  }

  const rect2 = {
    x: 0,
    y: 15,
    width: 10,
    height: 10,
  }

  const intersection = getIntersectionAxis(rect1, rect2)
  expect(intersection).toBe(null)
})

test("does not intersect x axis", () => {
  const rect1 = {
    x: 0,
    y: 0,
    width: 10,
    height: 10,
  }

  const rect2 = {
    x: 15,
    y: 0,
    width: 10,
    height: 10,
  }

  const intersection = getIntersectionAxis(rect1, rect2)
  expect(intersection).toBe(null)
})
