interface InstanceInfos {
  name: string
  url: string
  type: 'peertube'
}

async function getInstanceInfos (url: string): Promise<InstanceInfos | false> {
  // validate that url is a valid url:
  const urlObject = new URL('', url)
  if (!urlObject) {
    throw new Error('Wrong url')
  }
  // TODO: validate that url points to a Peertube server
  // TODO: validate that url points to a Peertube server allowing remote search
  // TODO: return correct infos
  return {
    url,
    name: url.replace(/^https?:\/\//, ''),
    type: 'peertube'
  }
}

export {
  InstanceInfos,
  getInstanceInfos
}
