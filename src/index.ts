import { App, AppOptions } from './utils/app.js'

async function init (container: HTMLElement, options?: AppOptions): Promise<void> {
  const app = new App(container, options)
  await app.render()
}

export {
  init
}
