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
