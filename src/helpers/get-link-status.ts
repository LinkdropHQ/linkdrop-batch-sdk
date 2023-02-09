import { linkApi } from '../api'

const getLinkStatus = async (
  linkId: string,
  apiHost: string,
  campaignSig: string
) => {
  const linkStatus = await linkApi.getStatus(
    apiHost,
    campaignSig,
    linkId
  )
  if (linkStatus.data) {
    const { data } = linkStatus.data
    return data
  }
}

export default getLinkStatus