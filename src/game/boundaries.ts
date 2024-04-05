import Boundary from "../classes/Boundary"
import Pellet from "../classes/Pellet"
import gcv from "./ctx"
import { player } from "./player"
import ghosts from "./ghosts"
import block from "../assets/block.png"
import pipeVertical from "../assets/pipeVertical.png"
import pipeHorizontal from "../assets/pipeHorizontal.png"
import pipeCorner1 from "../assets/pipeCorner1.png"
import pipeCorner2 from "../assets/pipeCorner2.png"
import pipeCorner3 from "../assets/pipeCorner3.png"
import pipeCorner4 from "../assets/pipeCorner4.png"
import capLeft from "../assets/capLeft.png"
import capRight from "../assets/capRight.png"
import capTop from "../assets/capTop.png"
import capBottom from "../assets/capBottom.png"
import pipeCross from "../assets/pipeCross.png"
import pipeConnectorTop from "../assets/pipeConnectorTop.png"
import pipeConnectorRight from "../assets/pipeConnectorRight.png"
import pipeConnectorBottom from "../assets/pipeConnectorBottom.png"
import pipeConnectorLeft from "../assets/pipeConnectorLeft.png"
import PowerUp from "../classes/PowerUp"

const boundariesMap = [
  ["1", "-", "-", "-", "-", "-", "-", "-", "-", "-", "2"],
  ["|", ".", ".", ".", ".", ".", ".", ".", ".", ".", "|"],
  ["|", ".", "b", ".", "[", "7", "]", ".", "b", ".", "|"],
  ["|", ".", ".", ".", ".", "_", ".", ".", ".", ".", "|"],
  ["|", ".", "[", "]", ".", ".", ".", "[", "]", ".", "|"],
  ["|", ".", ".", ".", ".", "^", ".", ".", ".", ".", "|"],
  ["|", ".", "b", ".", "[", "+", "]", ".", "b", ".", "|"],
  ["|", ".", ".", ".", ".", "_", ".", ".", ".", ".", "|"],
  ["|", ".", "[", "]", ".", ".", ".", "[", "]", ".", "|"],
  ["|", ".", ".", ".", ".", "^", ".", ".", ".", ".", "|"],
  ["|", ".", "b", ".", "[", "5", "]", ".", "b", ".", "|"],
  ["|", ".", ".", ".", ".", ".", ".", ".", ".", "p", "|"],
  ["4", "-", "-", "-", "-", "-", "-", "-", "-", "-", "3"],
]

const imageMap = {
  "|": pipeVertical,
  "-": pipeHorizontal,
  "1": pipeCorner1,
  "2": pipeCorner2,
  "3": pipeCorner3,
  "4": pipeCorner4,
  b: block,
  "[": capLeft,
  "]": capRight,
  "^": capTop,
  _: capBottom,
  "+": pipeCross,
  "5": pipeConnectorTop,
  "6": pipeConnectorRight,
  "7": pipeConnectorBottom,
  "8": pipeConnectorLeft,
}

const boundaries = boundariesMap.reduce((acc, row, rowIndex) => {
  row.forEach((cell, cellIndex) => {
    if (cell === " " || cell === "." || cell === "p") {
      return
    }

    const image = new Image()
    image.src = imageMap[cell as keyof typeof imageMap]
    acc.push(
      new Boundary({
        position: {
          x: Boundary.width * cellIndex,
          y: Boundary.height * rowIndex,
        },
        ctx: gcv.context,
        elements: [player, ...ghosts],
        image,
      })
    )
  })
  return acc
}, [] as Boundary[])

// pellets are the . that the player will collect
const pellets = boundariesMap.reduce((acc, row, rowIndex) => {
  row.forEach((cell, cellIndex) => {
    if (cell === ".") {
      acc.push(
        new Pellet({
          position: {
            x: Boundary.width * cellIndex + Boundary.width / 2,
            y: Boundary.height * rowIndex + Boundary.height / 2,
          },
          ctx: gcv.context,
        })
      )
    }
  })
  return acc
}, [] as Pellet[])

const powerUps = boundariesMap.reduce((acc, row, rowIndex) => {
  row.forEach((cell, cellIndex) => {
    if (cell === "p") {
      acc.push(
        new PowerUp({
          position: {
            x: Boundary.width * cellIndex + Boundary.width / 2,
            y: Boundary.height * rowIndex + Boundary.height / 2,
          },
          ctx: gcv.context,
        })
      )
    }
  })
  return acc
}, [] as PowerUp[])

export default boundaries

export { pellets, powerUps }
