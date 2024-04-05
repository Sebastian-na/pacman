import { expect, test } from "vitest"
import Player from "../../../classes/Player"
import Boundary from "../../../classes/Boundary"

test("Player canMoveUp", () => {
  const ctx: any = ""
  const player = new Player({
    ctx,
    position: { x: 60, y: 60 },
    velocity: { x: 0, y: -1 },
  })
  const boundary = new Boundary({
    ctx,
    elements: [player],
    position: { x: 60, y: 0 },
  })

  expect(player.canMoveUp([boundary])).toBe(false)
})

test("Player canMoveLeft", () => {
  const ctx: any = ""
  const player = new Player({
    ctx,
    position: { x: 60, y: 60 },
    velocity: { x: -1, y: 0 },
  })
  const boundary = new Boundary({
    ctx,
    elements: [player],
    position: { x: 0, y: 60 },
  })

  expect(player.canMoveLeft([boundary])).toBe(false)

  player.position = { x: 60, y: 140 }
  expect(player.canMoveLeft([boundary])).toBe(true)
})
