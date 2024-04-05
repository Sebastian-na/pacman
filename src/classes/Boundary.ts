import Positionable from "../interfaces/Positionable"
import Movement from "../interfaces/Movement"
import Vector2 from "../interfaces/Vector2"
import { getIntersectionAxis } from "../utils/bounding-rect"

interface BoundaryProps {
  position: Vector2
  ctx: CanvasRenderingContext2D
  elements: (Positionable & Movement)[]
  image: HTMLImageElement
}

class Boundary implements Positionable {
  static width = 40
  static height = 40
  public position: Vector2
  private ctx: CanvasRenderingContext2D
  private elements: (Positionable & Movement)[]
  private image: HTMLImageElement

  constructor({ position, ctx, elements, image }: BoundaryProps) {
    this.position = position
    this.ctx = ctx
    this.elements = elements
    this.image = image
  }

  draw() {
    this.ctx.drawImage(
      this.image,
      this.position.x,
      this.position.y,
      Boundary.width,
      Boundary.height
    )
  }

  render() {
    this.stopElements()
    this.draw()
  }

  getBoundingRect() {
    return {
      x: this.position.x,
      y: this.position.y,
      width: Boundary.width,
      height: Boundary.height,
    }
  }

  // if elements are going to intersect with the boundary, stop their movement by setting their velocity to 0
  stopElements() {
    this.elements.forEach((element) => {
      const intersection = getIntersectionAxis(
        this.getBoundingRect(),
        element.getNextBoundingRect()
      )

      if (intersection) {
        if (intersection === "x") {
          element.velocity.x = 0
        }
        if (intersection === "y") {
          element.velocity.y = 0
        }
      }
    })
  }
}

export default Boundary
