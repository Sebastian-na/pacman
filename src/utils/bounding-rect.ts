import { Key } from "../game/controls"
import BoundingRect from "../interfaces/BoundingRect"

// function that says the axis of the intersection or null if there is no intersection
// intersection is defined if any of the sides of the two rectangles overlap

export function getIntersectionAxis(aRect: BoundingRect, bRect: BoundingRect) {
  const a = aRect
  const b = bRect

  const aTop = a.y
  const aBottom = a.y + a.height
  const aLeft = a.x
  const aRight = a.x + a.width

  const bTop = b.y
  const bBottom = b.y + b.height
  const bLeft = b.x
  const bRight = b.x + b.width

  if (aTop < bBottom && aBottom > bTop && aRight > bLeft && aLeft < bRight) {
    const xOverlap = Math.min(aRight, bRight) - Math.max(aLeft, bLeft)
    const yOverlap = Math.min(aBottom, bBottom) - Math.max(aTop, bTop)

    if (xOverlap > yOverlap) {
      return "y"
    } else {
      return "x"
    }
  }

  return null
}

export function getIntersectionSide(
  rect1: BoundingRect,
  rect2: BoundingRect
): Key | null {
  // Check for horizontal intersection
  if (
    rect1.y + rect1.height >= rect2.y &&
    rect2.y + rect2.height >= rect1.y &&
    // Overlap horizontally
    Math.max(rect1.x, rect2.x) <
      Math.min(rect1.x + rect1.width, rect2.x + rect2.width)
  ) {
    // Determine horizontal intersection side
    return rect1.x + rect1.width > rect2.x + rect2.width
      ? "ArrowRight"
      : "ArrowLeft"
  }

  // Check for vertical intersection
  if (
    rect1.x + rect1.width >= rect2.x &&
    rect2.x + rect2.width >= rect1.x &&
    // Overlap vertically
    Math.max(rect1.y, rect2.y) <
      Math.min(rect1.y + rect1.height, rect2.y + rect2.height)
  ) {
    // Determine vertical intersection side
    return rect1.y + rect1.height > rect2.y + rect2.height
      ? "ArrowDown"
      : "ArrowUp"
  }

  // No intersection
  return null
}
