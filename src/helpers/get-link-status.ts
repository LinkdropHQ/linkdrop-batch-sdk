import { linkApi } from '../api'
import { ethers } from 'ethers'

const getLinkStatus = async (
  apiHost: string,
  claimCode: string
) => {
  let linkId
  if (claimCode.startsWith('0x')) {
    linkId = claimCode
  } else {
    const linkKey = ethers.utils.id(claimCode)
    linkId = new ethers.Wallet(linkKey).address
  }
  const linkStatus = await linkApi.getStatus(
    apiHost,
    linkId
  )
  if (linkStatus.data) {
    const { data } = linkStatus.data
    return data
  }
}

export default getLinkStatus