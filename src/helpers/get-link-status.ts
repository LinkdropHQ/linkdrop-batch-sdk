import { linkApi } from '../api'
import { TApiKey } from '../types'

const getLinkStatus = async (
  linkId: string,
  apiHost: string,
  apiKey: TApiKey
) => {
  const linkStatus = await linkApi.getStatus(
    apiHost,
    apiKey,
    linkId
  )
  if (linkStatus.data) {
    const { data } = linkStatus.data
    return data
  }
}

export default getLinkStatus