import { expect, test } from "vitest"
import Boundary from "../../../classes/Boundary"
import Player from "../../../classes/Player"

test("Boundary getBoundingRect", () => {
  const ctx: any = ""

  const player = new Player({
    ctx,
    position: { x: 120, y: 60 },
    velocity: { x: -1, y: 0 },
  })

  const boundary = new Boundary({
    ctx,
    position: { x: 60, y: 60 },
    elements: [player],
  })

  boundary.stopElements()

  expect(player.velocity.x).toBe(0)
})
