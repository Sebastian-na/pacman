import Ghost from "../classes/Ghost"
import gcv from "./ctx"
const ghosts = [
  Ghost.createInitialGhost(gcv.context, { x: 9, y: 11 }, "red"),
  Ghost.createInitialGhost(gcv.context, { x: 1, y: 11 }, "pink"),
  Ghost.createInitialGhost(gcv.context, { x: 5, y: 8 }, "green"),
]

export default ghosts
