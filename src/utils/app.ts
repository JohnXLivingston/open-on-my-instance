import { Search, SavedInstances } from '../widget/index.js'

interface AppApiOptions {
  listEndpoint: string
  count?: number
}

interface AppOptions {
  prefix?: string // prefix for HTML ids and storage keys
  instancesAPI?: AppApiOptions
}

class App {
  public search?: Search
  public savedInstances?: SavedInstances

  constructor (public readonly container: HTMLElement, public options: AppOptions = {}) {
    container.classList.add('oomi-container')
  }

  async render (): Promise<void> {
    const promises: Array<Promise<any>> = []

    if (!this.savedInstances) {
      this.savedInstances = new SavedInstances(this)
    }
    promises.push(this.savedInstances.render())

    await Promise.all(promises)

    if (!this.search) {
      this.container.append(document.createElement('hr'))
      this.search = new Search(this)
    }
    promises.push(this.search.render())
  }
}

export {
  App,
  AppOptions,
  AppApiOptions
}
