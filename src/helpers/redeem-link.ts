import { ethers } from 'ethers'
import { linkApi } from '../api'
import { AxiosError } from 'axios'
import { TApiKey, TLinkParams, TLinkStatus } from '../types'
import { signReceiverAddress } from '../utils'

const redeemLink = async (
  linkKey: string,
  receiverAddress: string,
  apiHost: string,
  apiKey: TApiKey,
) => {
  try {
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

  } catch (err: any | AxiosError) {
    console.error(err)
  }
}

export default redeemLink