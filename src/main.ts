import { pacmanControls, keyQueue, Key } from "./game/controls"
import "./style.css"
import gcv from "./game/ctx"
import boundaries, { pellets, powerUps } from "./game/boundaries"
import { player } from "./game/player"
import nearestMultipleOf from "./utils/nearestMultipleOf"
import Boundary from "./classes/Boundary"
import Player from "./classes/Player"
import { getIntersectionAxis } from "./utils/bounding-rect"
import ghosts from "./game/ghosts"
import Movement from "./interfaces/Movement"
import Ghost from "./classes/Ghost"

const ctx = gcv.context
player.setBoundaries(boundaries)
ghosts.forEach((ghost) => ghost.setBoundaries(boundaries))
window.addEventListener("keydown", pacmanControls)

const app = document.getElementById("app")
const scoreElement = document.createElement("div")
scoreElement.id = "score"
scoreElement.innerText = "Score: 0"
app?.appendChild(scoreElement)

let score = 0
let animationId: number
function animate() {
  if (pellets.length === 0) {
    alert("You won!")
    cancelAnimationFrame(animationId)
    return
  }

  ctx.clearRect(0, 0, gcv.canvas.width, gcv.canvas.height)

  // depending on the keys pressed, update the player's velocity
  // get next key in the queue
  const key = keyQueue[0]
  if (elementCanMoveInDirectionKey(player, key)) {
    moveElement(player, keyQueue, key)
  }

  if (player.velocity.x === 0 && player.velocity.y === 0) {
    keyQueue.shift()
  }

  for (let i = pellets.length - 1; i >= 0; i--) {
    pellets[i].render()

    if (
      getIntersectionAxis(
        pellets[i].getBoundingRect(),
        player.getBoundingRect()
      )
    ) {
      pellets.splice(i, 1)
      score += 10
      scoreElement.innerText = `Score: ${score}`
    }
  }

  for (let i = powerUps.length - 1; i >= 0; i--) {
    powerUps[i].render()

    if (
      getIntersectionAxis(
        powerUps[i].getBoundingRect(),
        player.getBoundingRect()
      )
    ) {
      powerUps.splice(i, 1)
      score += 50
      scoreElement.innerText = `Score: ${score}`
      ghosts.forEach((ghost) => {
        ghost.scared = true
        setTimeout(() => {
          ghost.scared = false
        }, 5000)
      })
    }
  }

  player.render()
  ghosts.forEach((ghost) => {
    const possibleDirections: Key[] = [
      "ArrowDown",
      "ArrowUp",
      "ArrowLeft",
      "ArrowRight",
    ]
    const pathways = possibleDirections
      .filter((direction) => elementCanMoveInDirectionKey(ghost, direction))
      .filter((direction) => {
        if (direction === "ArrowDown" && ghost.velocity.y === -1) return false
        if (direction === "ArrowUp" && ghost.velocity.y === 1) return false
        if (direction === "ArrowLeft" && ghost.velocity.x === 1) return false
        if (direction === "ArrowRight" && ghost.velocity.x === -1) return false
        return true
      })

    const randomPathway = pathways[Math.floor(Math.random() * pathways.length)]
    if (randomPathway) {
      ghost.previousPathways = pathways
      moveElement(ghost, [], randomPathway)
    }
  })
  ghosts.forEach((ghost) => ghost.render())

  boundaries.forEach((boundary) => boundary.render())

  if (player.velocity.x > 0) player.rotation = 0
  if (player.velocity.x < 0) player.rotation = Math.PI
  if (player.velocity.y > 0) player.rotation = Math.PI / 2
  if (player.velocity.y < 0) player.rotation = -Math.PI / 2

  animationId = requestAnimationFrame(animate)

  for (let i = ghosts.length - 1; i <= 0; i--) {
    if (
      getIntersectionAxis(ghosts[i].getBoundingRect(), player.getBoundingRect())
    ) {
      if (ghosts[i].scared) {
        ghosts.splice(i, 1)
        score += 100
        scoreElement.innerText = `Score: ${score}`
      } else {
        alert("Game Over")
        cancelAnimationFrame(animationId)
        return
      }
    }
  }
}

function moveElement(
  player: Movement & { radius: number },
  keyQueue: string[],
  directionKey: Key
) {
  if (directionKey === "ArrowDown" || directionKey === "ArrowUp") {
    player.position.x =
      nearestMultipleOf(player.position.x - player.radius, Boundary.width) +
      player.radius
    player.velocity = { x: 0, y: directionKey === "ArrowDown" ? 1 : -1 }

    const indexes = keyQueue.reduce((acc, key, index) => {
      if (key === directionKey) {
        acc.push(index)
      }
      return acc
    }, [] as number[])
    indexes.forEach((index) => keyQueue.splice(index, 1))
  }

  if (directionKey === "ArrowLeft" || directionKey === "ArrowRight") {
    player.position.y =
      nearestMultipleOf(player.position.y - player.radius, Boundary.height) +
      player.radius
    player.velocity = { x: directionKey === "ArrowRight" ? 1 : -1, y: 0 }

    const indexes = keyQueue.reduce((acc, key, index) => {
      if (key === directionKey) {
        acc.push(index)
      }
      return acc
    }, [] as number[])
    indexes.forEach((index) => keyQueue.splice(index, 1))
  }
}

function elementCanMoveInDirectionKey(
  player: Player | Ghost,
  directionKey: Key
) {
  return (
    (directionKey === "ArrowDown" && player.canMoveDown(boundaries)) ||
    (directionKey === "ArrowUp" && player.canMoveUp(boundaries)) ||
    (directionKey === "ArrowLeft" && player.canMoveLeft(boundaries)) ||
    (directionKey === "ArrowRight" && player.canMoveRight(boundaries))
  )
}

animate()
