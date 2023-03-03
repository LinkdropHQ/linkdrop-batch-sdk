import { linkApi } from '../api'
import { TLinkParams } from '../types'
import { ethers } from 'ethers'

const getLinkParams = async (
  apiHost: string,
  claimCode: string
) => {
  const linkKey = ethers.utils.id(claimCode)
  const wallet = new ethers.Wallet(linkKey)

  const linkParams = await linkApi.getParams(
    apiHost,
    wallet.address
  )
  const { success, data } = linkParams.data
  if (success) {
    const {
      creator_address,
      sponsored,
      chain_id,
      campaign_number,
      token_address,
      token_standard,
      symbol,
      claim_pattern,
      token_id,
      token_amount,
      sender_signature,
      proxy_contract_version,
      wei_amount,
      expiration_time,
      wallet
    } : TLinkParams = data

    return {
      creator_address,
      sponsored,
      chain_id,
      campaign_number,
      token_address,
      token_standard,
      symbol,
      claim_pattern,
      token_id,
      token_amount,
      sender_signature,
      proxy_contract_version,
      wei_amount,
      expiration_time,
      wallet
    }
  }
}

export default getLinkParams