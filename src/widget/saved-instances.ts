import type { App } from '../utils/app.js'
import { savedInstances } from '../utils/storage.js'

class SavedInstances {
  private readonly container: HTMLElement

  constructor (public app: App) {
    this.container = document.createElement('ul')
    this.app.container.append(this.container)
  }

  async render (): Promise<void> {
    const instances = await savedInstances()
    this.container.innerHTML = ''
    for (const instance of instances) {
      const li = document.createElement('li')
      li.innerText = instance
      this.container.append(li)
    }
  }
}

export {
  SavedInstances
}
