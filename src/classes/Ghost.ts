import Boundary from "./Boundary"
import Positionable from "../interfaces/Positionable"
import Vector2 from "../interfaces/Vector2"
import { getIntersectionAxis } from "../utils/bounding-rect"
import Movement from "../interfaces/Movement"
import { Key } from "../game/controls"

interface GhostProps {
  position: Vector2
  velocity: Vector2
  ctx: CanvasRenderingContext2D
  boundaries?: Boundary[]
  color?: string
}

class Ghost implements Positionable, Movement {
  public position: Vector2
  public velocity: Vector2
  public radius: number
  private ctx: CanvasRenderingContext2D
  private boundaries: Boundary[]
  public previousPathways: Key[] = []
  public color = "red"
  public originalColor = "red"
  public scared = false

  constructor({
    position,
    velocity,
    ctx,
    boundaries = [],
    color = "red",
  }: GhostProps) {
    this.position = position
    this.velocity = velocity
    this.radius = 20
    this.ctx = ctx
    this.boundaries = boundaries
    this.color = color
  }

  draw() {
    this.ctx.beginPath()
    this.ctx.fillStyle = this.scared ? "blue" : this.color
    this.ctx.arc(this.position.x, this.position.y, this.radius, 0, Math.PI * 2)
    this.ctx.fill()
  }

  update() {
    // only update if the Ghost can move in the direction of the velocity
    if (this.velocity.x > 0 && this.canMoveRight(this.boundaries)) {
      this.position.x += this.velocity.x
    }

    if (this.velocity.x < 0 && this.canMoveLeft(this.boundaries)) {
      this.position.x += this.velocity.x
    }

    if (this.velocity.y > 0 && this.canMoveDown(this.boundaries)) {
      this.position.y += this.velocity.y
    }

    if (this.velocity.y < 0 && this.canMoveUp(this.boundaries)) {
      this.position.y += this.velocity.y
    }
  }

  render() {
    this.update()
    this.draw()
  }

  getBoundingRect() {
    return {
      x: this.position.x - this.radius,
      y: this.position.y - this.radius,
      width: this.radius * 2,
      height: this.radius * 2,
    }
  }

  getNextBoundingRect() {
    return {
      x: this.position.x + this.velocity.x - this.radius,
      y: this.position.y + this.velocity.y - this.radius,
      width: this.radius * 2,
      height: this.radius * 2,
    }
  }

  getNextBoundingRectWithVelocity(velocity: Vector2) {
    return {
      x: this.position.x + velocity.x - this.radius,
      y: this.position.y + velocity.y - this.radius,
      width: this.radius * 2,
      height: this.radius * 2,
    }
  }

  canMoveUp(boundaries: Boundary[]) {
    const nextBoundingRect = this.getNextBoundingRectWithVelocity({
      x: 0,
      y: -1,
    })
    return !boundaries.some((boundary) => {
      const intersection = getIntersectionAxis(
        boundary.getBoundingRect(),
        nextBoundingRect
      )
      return intersection === "y"
    })
  }

  canMoveDown(boundaries: Boundary[]) {
    const nextBoundingRect = this.getNextBoundingRectWithVelocity({
      x: 0,
      y: 1,
    })
    return !boundaries.some((boundary) => {
      const intersection = getIntersectionAxis(
        boundary.getBoundingRect(),
        nextBoundingRect
      )

      return intersection === "y"
    })
  }

  canMoveLeft(boundaries: Boundary[]) {
    const nextBoundingRect = this.getNextBoundingRectWithVelocity({
      x: -1,
      y: 0,
    })
    for (let i = 0; i < boundaries.length; i++) {
      const boundary = boundaries[i]
      const intersection = getIntersectionAxis(
        boundary.getBoundingRect(),
        nextBoundingRect
      )
      if (intersection === "x") {
        return false
      }
    }
    return true
  }

  canMoveRight(boundaries: Boundary[]) {
    const nextBoundingRect = this.getNextBoundingRectWithVelocity({
      x: 1,
      y: 0,
    })
    return !boundaries.some((boundary) => {
      const intersection = getIntersectionAxis(
        boundary.getBoundingRect(),
        nextBoundingRect
      )
      return intersection === "x"
    })
  }

  static createInitialGhost(ctx: CanvasRenderingContext2D) {
    return new Ghost({
      position: {
        x: Boundary.width * 7 + Boundary.width / 2,
        y: Boundary.width * 2 + Boundary.width / 2,
      },
      velocity: {
        x: 0,
        y: 1,
      },
      ctx,
    })
  }

  setBoundaries(boundaries: Boundary[]) {
    this.boundaries = boundaries
  }

  /**
   * It receives the position of the left top corner of the Ghost
   * We need to convert it to the center of the Ghost
   * @param position
   */
  setPosition(position: Vector2) {
    this.position = {
      x: position.x + this.radius,
      y: position.y + this.radius,
    }
  }
}

export default Ghost
