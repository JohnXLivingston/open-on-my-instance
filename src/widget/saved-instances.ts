import type { App } from '../utils/app.js'
import { Storage } from '../utils/storage.js'

class SavedInstances {
  private readonly container: HTMLElement

  constructor (public app: App) {
    this.container = document.createElement('ul')
    this.container.classList.add('oomi-saved-instances')
    this.app.container.append(this.container)
  }

  async render (): Promise<void> {
    const instances = await Storage.singleton(this.app).savedInstances()
    this.container.innerHTML = ''
    for (const instance of instances) {
      const li = document.createElement('li')

      const remove = document.createElement('button')
      remove.classList.add('oomi-remove')
      remove.innerText = 'X'
      remove.onclick = async () => {
        await Storage.singleton(this.app).removeInstance(instance.url)
        await this.render()
      }
      li.append(remove)

      const infos = document.createElement('div')
      infos.classList.add('oomi-instance-info')
      li.append(infos)

      const name = document.createElement('div')
      name.innerText = instance.name
      infos.append(name)

      const a = document.createElement('a')
      a.setAttribute('href', instance.url) // TODO: link to the video
      a.setAttribute('target', '_top')
      a.innerText = instance.url
      li.append(a)

      this.container.append(li)
    }
  }
}

export {
  SavedInstances
}
