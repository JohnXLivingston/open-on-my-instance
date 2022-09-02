import { Search, SavedInstances } from '../widget/index.js'

class App {
  public readonly container: HTMLElement
  public search?: Search
  public savedInstances?: SavedInstances

  constructor (container: HTMLElement) {
    this.container = container
  }

  async render (): Promise<void> {
    const promises: Array<Promise<any>> = []

    if (!this.savedInstances) {
      this.savedInstances = new SavedInstances(this)
    }
    promises.push(this.savedInstances.render())

    await Promise.all(promises)

    if (!this.search) {
      this.search = new Search(this)
    }
    promises.push(this.search.render())
  }
}

export {
  App
}
