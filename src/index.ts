import { App } from './utils/app.js'

async function init (container: HTMLElement): Promise<void> {
  const app = new App(container)
  await app.render()
}

export {
  init
}
