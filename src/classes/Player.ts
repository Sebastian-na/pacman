import Boundary from "./Boundary"
import Positionable from "../interfaces/Positionable"
import Vector2 from "../interfaces/Vector2"
import { getIntersectionAxis } from "../utils/bounding-rect"
import Movement from "../interfaces/Movement"

interface PlayerProps {
  position: Vector2
  velocity: Vector2
  ctx: CanvasRenderingContext2D
  boundaries?: Boundary[]
}

class Player implements Positionable, Movement {
  public position: Vector2
  public velocity: Vector2
  public radius: number
  private ctx: CanvasRenderingContext2D
  private boundaries: Boundary[]
  public radians = 0.75
  public openRate = 0.1
  public rotation = 0

  constructor({ position, velocity, ctx, boundaries = [] }: PlayerProps) {
    this.position = position
    this.velocity = velocity
    this.radius = 20
    this.ctx = ctx
    this.boundaries = boundaries
  }

  draw() {
    this.ctx.save()
    this.ctx.translate(this.position.x, this.position.y)
    this.ctx.rotate(this.rotation)
    this.ctx.translate(-this.position.x, -this.position.y)
    this.ctx.beginPath()
    this.ctx.fillStyle = "yellow"
    this.ctx.arc(
      this.position.x,
      this.position.y,
      this.radius,
      this.radians,
      Math.PI * 2 - this.radians
    )
    this.ctx.lineTo(this.position.x, this.position.y)
    this.ctx.fill()
    this.ctx.restore()
  }

  update() {
    // only update if the player can move in the direction of the velocity
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

    if (this.radians < 0 || this.radians > 0.75) {
      this.openRate *= -1
    }

    this.radians += this.openRate
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

  static createInitialPlayer(ctx: CanvasRenderingContext2D) {
    return new Player({
      position: {
        x: Boundary.width + Boundary.width / 2,
        y: Boundary.width + Boundary.width / 2,
      },
      velocity: {
        x: 1,
        y: 0,
      },
      ctx,
    })
  }

  setBoundaries(boundaries: Boundary[]) {
    this.boundaries = boundaries
  }

  /**
   * It receives the position of the left top corner of the player
   * We need to convert it to the center of the player
   * @param position
   */
  setPosition(position: Vector2) {
    this.position = {
      x: position.x + this.radius,
      y: position.y + this.radius,
    }
  }
}

export default Player
