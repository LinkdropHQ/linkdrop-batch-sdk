import { ethers } from 'ethers'
import { linkApi } from '../api'
import { AxiosError } from 'axios'
import { TLinkParams, TApiKey } from '../types'

const getLinkParams = async (
  apiHost: string,
  apiKey: TApiKey,
  linkId: string
) => {
  try {
    // 
    const linkParams = await linkApi.getParams(
      apiHost,
      apiKey,
      linkId
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
  } catch (err: any | AxiosError) {
    console.error(err)
  }
  
}

export default getLinkParams