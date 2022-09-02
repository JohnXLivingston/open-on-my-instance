import { Search, SavedInstances } from '../widget/index.js'

interface AppOptions {
  prefix?: string // prefix for HTML ids
}

class App {
  public search?: Search
  public savedInstances?: SavedInstances

  constructor (public readonly container: HTMLElement, public options: AppOptions = {}) {}

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
  App,
  AppOptions
}
