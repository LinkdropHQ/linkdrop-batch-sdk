import { ethers } from 'ethers'
import { linkApi } from '../api'
import { TApiKey } from '../types'
import { signReceiverAddress } from '../utils'

const redeemLink = async (
  linkKey: string,
  receiverAddress: string,
  apiHost: string,
  apiKey: TApiKey,
) => {
  const wallet = new ethers.Wallet(linkKey)
  const receiverSignature = await signReceiverAddress(wallet, receiverAddress)
  const claimLink = await linkApi.redeemLink(
    apiHost,
    apiKey,
    wallet.address,
    receiverAddress,
    receiverSignature
  )
  if (claimLink.data) {
    const { data } = claimLink.data
    return data
  }
}

export default redeemLink