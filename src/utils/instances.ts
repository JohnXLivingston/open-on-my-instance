import type { AppApiOptions } from './app.js'

interface APIResult {
  total: number
  data: Array<{
    host: string
    name: string
  }>
}

async function _requestPage (endpoint: string, start: number, count: number): Promise<string[] | null> {
  const url = new URL('', endpoint)
  url.searchParams.set('start', start.toString())
  url.searchParams.set('count', count.toString())
  const response = await fetch(url, {
    method: 'GET'
  })
  const json: APIResult = await response.json()
  if (!json.data) { return null }
  if (!json.data.length) { return null }

  return json.data?.map(l => 'https://' + l.host)
}

async function list (options: AppApiOptions): Promise<string[]> {
  // TODO: instead of returning all result (and wait for them before returning),
  //  return an iterator, so that the frontend can incrementally update the list.
  let result: string[] = []
  let current = 0
  const count = options.count ?? 2000
  let list = await _requestPage(options.listEndpoint, current, count)
  // TODO: doing so, we are always making an extra request (we are waiting for an empty set).
  //   Try to avoid this.
  while (list) {
    result = result.concat(list)
    current += count
    list = await _requestPage(options.listEndpoint, current, count)
  }
  return result
}

export {
  list
}
