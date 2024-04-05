export type Key = "ArrowUp" | "ArrowDown" | "ArrowLeft" | "ArrowRight"

export let keyQueue: Key[] = []

export function isValidKey(key: string): key is Key {
  return ["ArrowUp", "ArrowDown", "ArrowLeft", "ArrowRight"].includes(key)
}

export function pacmanControls(e: KeyboardEvent) {
  if (!isValidKey(e.key)) return

  keyQueue = keyQueue.filter((key) => key !== e.key)

  // if the keys is ArrowUp, then we need to remove ArrowDown from the queue
  if (e.key === "ArrowUp" && keyQueue.includes("ArrowDown")) {
    keyQueue = keyQueue.filter((key) => key !== "ArrowDown")
  }

  // if the keys is ArrowDown, then we need to remove ArrowUp from the queue
  if (e.key === "ArrowDown" && keyQueue.includes("ArrowUp")) {
    keyQueue = keyQueue.filter((key) => key !== "ArrowUp")
  }

  // if the keys is ArrowLeft, then we need to remove ArrowRight from the queue
  if (e.key === "ArrowLeft" && keyQueue.includes("ArrowRight")) {
    keyQueue = keyQueue.filter((key) => key !== "ArrowRight")
  }

  // if the keys is ArrowRight, then we need to remove ArrowLeft from the queue
  if (e.key === "ArrowRight" && keyQueue.includes("ArrowLeft")) {
    keyQueue = keyQueue.filter((key) => key !== "ArrowLeft")
  }

  keyQueue.push(e.key as Key)
}

export default keyQueue
