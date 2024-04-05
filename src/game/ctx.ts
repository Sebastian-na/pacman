const app = document.getElementById("app") as HTMLDivElement

class GameCanvasContext {
  public canvas: HTMLCanvasElement
  private container = document.createElement("div")
  private static instance: GameCanvasContext

  private constructor(private app: HTMLDivElement) {
    this.container.id = "canvas-container"
    this.container.style.width = "440px"
    this.container.style.height = "600px"
    this.app.appendChild(this.container)
    this.canvas = document.createElement("canvas")
    this.canvas.width = 440
    this.canvas.height = 600
    this.container.appendChild(this.canvas)
    GameCanvasContext.instance = this
  }

  static getInstance(app: HTMLDivElement) {
    if (!this.instance) {
      this.instance = new GameCanvasContext(app)
    }
    return this.instance
  }

  get context() {
    return this.canvas.getContext("2d") as CanvasRenderingContext2D
  }
}

export default GameCanvasContext.getInstance(app)
