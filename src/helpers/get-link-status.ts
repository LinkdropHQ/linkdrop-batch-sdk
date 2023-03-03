import { linkApi } from '../api'
import { ethers } from 'ethers'

const getLinkStatus = async (
  claimCode: string,
  apiHost: string
) => {
  const linkKey = ethers.utils.id(claimCode)
  const wallet = new ethers.Wallet(linkKey)

  const linkStatus = await linkApi.getStatus(
    apiHost,
    wallet.address
  )
  if (linkStatus.data) {
    const { data } = linkStatus.data
    return data
  }
}

export default getLinkStatus