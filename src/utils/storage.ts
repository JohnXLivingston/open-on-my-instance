import type { App } from './app.js'
import type { InstanceInfos } from './instance.js'

let storage: Storage

class Storage {
  public readonly prefix: string
  private readonly savedInstancesKey: string

  constructor (prefix?: string) {
    this.prefix = prefix ?? 'oomi-'
    this.savedInstancesKey = this.prefix + 'saved-instances'
  }

  static singleton (app: App): Storage {
    if (!storage || storage.prefix !== (app.options.prefix ?? 'oomi-')) {
      storage = new Storage(app.options.prefix)
    }
    return storage
  }

  public async savedInstances (): Promise<InstanceInfos[]> {
    try {
      const json: string = window.localStorage.getItem(this.savedInstancesKey) ?? '[]'
      const instances = JSON.parse(json)
      if (Array.isArray(instances)) {
        return instances
      }
    } catch {}
    return []
  }

  public async saveInstance (instance: InstanceInfos): Promise<void> {
    let json: string = window.localStorage.getItem(this.savedInstancesKey) ?? '[]'
    let instances: InstanceInfos[] = JSON.parse(json)
    // filtering to remove the instance if already present (so we can update saved instances infos)
    instances = instances.filter((i) => i.url !== instance.url)
    // Adding the new instance in first position.
    instances.unshift(instance)
    json = JSON.stringify(instances)
    window.localStorage.setItem(this.savedInstancesKey, json)
  }

  public async removeInstance (url: string): Promise<void> {
    let json: string = window.localStorage.getItem(this.savedInstancesKey) ?? '[]'
    let instances: InstanceInfos[] = JSON.parse(json)
    instances = instances.filter(i => i.url !== url)
    json = JSON.stringify(instances)
    window.localStorage.setItem(this.savedInstancesKey, json)
  }
}

export {
  Storage
}
