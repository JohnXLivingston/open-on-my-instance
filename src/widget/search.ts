import type { App } from '../utils/app.js'
import { list as listInstances } from '../utils/instances.js'
import { Storage } from '../utils/storage.js'
import { getInstanceInfos } from '../utils/instance.js'

class Search {
  private readonly container: HTMLFormElement
  private label?: HTMLLabelElement
  private dataList?: HTMLDataListElement
  private input?: HTMLInputElement

  constructor (public app: App) {
    this.container = document.createElement('form')
    this.container.classList.add('oomi-search')
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
    if (!url) {
      return
    }
    const instanceInfos = await getInstanceInfos(url)
    if (!instanceInfos) {
      return
    }
    await Storage.singleton(this.app).saveInstance(instanceInfos)
    await this.app.savedInstances?.render()
  }
}

export {
  Search
}
