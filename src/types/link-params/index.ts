type TLinkParams = {
  creator_address: string
  sponsored: boolean
  chain_id: string
  campaign_number: string
  token_address: string
  token_standard: string
  symbol: string
  claim_pattern: string
  token_id: string
  token_amount: string
  sender_signature: string
  proxy_contract_version: string
  wei_amount: string
  expiration_time: string
  wallet: string
  link_key?: string
  claiming_finished_description: string
  claiming_finished_button_title: string 
  claiming_finished_button_url: string
  only_preferred_wallet: boolean
}

export default TLinkParams