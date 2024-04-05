import BoundingRect from "./BoundingRect"

interface Positionable {
  getBoundingRect(): BoundingRect
}

export default Positionable
