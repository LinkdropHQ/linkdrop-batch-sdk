import { ethers } from 'ethers'
import { linkApi } from '../api'
import { AxiosError } from 'axios'
import { TLinkParams } from '../types'

const getLinkParams = async (
  linkKey: string
) => {
  try {


    return {
      creator_address: "string",
      sponsored: false,
      chain_id: "string",
      campaign_number: "string",
      token_address: "string",
      token_standard: "string",
      symbol: "string",
      claim_pattern: "string",
      token_id: "string",
      token_amount: "string",
      sender_signature: "string",
      proxy_contract_version: "string",
      wei_amount: "string",
      expiration_time: "string",
      wallet: "string",
      link_key: "string"
    }
    



    // 
    const linkId = new ethers.Wallet(linkKey).address
    const linkParams = await linkApi.getParams(linkId)
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