interface InstanceInfos {
  name: string
  url: string
}

async function getInstanceInfos (url: string): Promise<InstanceInfos | false> {
  // TODO: validate that url is a valid url
  // TODO: validate that url points to a Peertube server
  // TODO: validate that url points to a Peertube server allowing remote search
  // TODO: return correct infos
  return {
    url,
    name: url.replace(/^https?:\/\//, '')
  }
}

export {
  InstanceInfos,
  getInstanceInfos
}
