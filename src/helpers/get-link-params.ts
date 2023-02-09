import { linkApi } from '../api'
import { TLinkParams } from '../types'

const getLinkParams = async (
  apiHost: string,
  campaignSig: string,
  linkId: string
) => {
  const linkParams = await linkApi.getParams(
    apiHost,
    campaignSig,
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
}

export default getLinkParams