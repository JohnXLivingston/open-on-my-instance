interface VideoInfos {
  uuid: string
  host: string
}

function readParams (): VideoInfos | null {
  try {
    const s = window.location.hash.replace(/^#/, '?')
    const uri = new URL(s, 'http://localhost')
    const host = uri.searchParams.get('host') ?? ''

    // Validation the host using URL (will thrown an exception if not valid):
    const hostObject = new URL('', 'https://' + host)

    const uuid = uri.searchParams.get('uuid') ?? ''
    if (!/^[\w-]+$/.test(uuid)) {
      return null
    }
    return {
      uuid,
      host: hostObject.host
    }
  } catch (error) {
    console.error(error)
    return null
  }
}

export {
  readParams
}
