import BoundingRect from "./BoundingRect"
import Vector2 from "./Vector2"

interface Movement {
  position: Vector2
  velocity: Vector2

  getNextBoundingRect(): BoundingRect
}

export default Movement
