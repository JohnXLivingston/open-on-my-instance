import type { App } from '../utils/app.js'
import { Storage } from '../utils/storage.js'
import { readParams } from '../utils/video.js'

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

    const videoInfos = readParams()
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
      let url = instance.url
      if (videoInfos) {
        // Using an undocumented Peertube functionality: lazy loading.
        // https://instance.tld/search/lazy-load-video;url=https:%2F%2Forigininstance.tld%2Fvideos%2Fwatch%2Fb14ba404-..
        const urlObject = new URL('/search/lazy-load-video', instance.url)
        urlObject.searchParams.append('url', 'https://' + videoInfos.host + '/videos/watch/' + videoInfos.uuid)
        url = urlObject.toString().replace(/\?/, ';')
      }
      a.setAttribute('href', url)
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
