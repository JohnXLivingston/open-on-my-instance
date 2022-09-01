async function savedInstances (): Promise<string[]> {
  try {
    const json: string = window.localStorage.getItem('open-on-my-instance-saved-instances') ?? '[]'
    const instances = JSON.parse(json)
    if (Array.isArray(instances)) {
      return instances
    }
  } catch {}
  return []
}

async function saveInstance (url: string): Promise<void> {
  let json: string = window.localStorage.getItem('open-on-my-instance-saved-instances') ?? '[]'
  const instances: string[] = JSON.parse(json)
  if (instances.indexOf(url) >= 0) {
    return
  }
  instances.push(url)
  json = JSON.stringify(instances.sort())
  window.localStorage.setItem('open-on-my-instance-saved-instances', json)
}

export {
  savedInstances,
  saveInstance
}
