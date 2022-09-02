import type { App } from '../utils/app.js'
import { list as listInstances } from '../utils/instances.js'
import { saveInstance } from '../utils/storage.js'
import { validate } from '../utils/url.js'

class Search {
  private readonly container: HTMLFormElement
  private label?: HTMLLabelElement
  private dataList?: HTMLDataListElement
  private input?: HTMLInputElement

  constructor (public app: App) {
    this.container = document.createElement('form')
    this.app.container.append(this.container)
  }

  async render (): Promise<void> {
    if (!this.container.onsubmit) {
      this.container.onsubmit = () => {
        this.addInstance().catch(() => {})
        return false
      }
    }

    if (!this.label) {
      this.label = document.createElement('label')
      this.label.innerText = 'Please select your instance:'
      this.container.innerHTML = ''
      this.container.append(this.label)
    }

    if (!this.dataList) {
      this.dataList = document.createElement('datalist')
      this.dataList.setAttribute('id', (this.app.options.prefix ?? '') + 'instances')
      this.label.append(this.dataList)
    }

    if (!this.input) {
      this.input = document.createElement('input')
      this.input.setAttribute('type', 'url')
      this.input.setAttribute('list', this.dataList.getAttribute('id') ?? '')
      this.label.append(this.input)
    }

    const instances = await listInstances()
    this.dataList.innerHTML = ''
    for (const instance of instances) {
      const option = document.createElement('option')
      option.setAttribute('value', instance)
      this.dataList.append(option)
    }
  }

  private async addInstance (): Promise<void> {
    const url = this.input?.value
    if (!url || !await validate(url)) {
      return
    }
    await saveInstance(url)
    await this.app.savedInstances?.render()
  }
}

export {
  Search
}
