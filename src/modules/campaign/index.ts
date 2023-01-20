import {
  TCampaign,
  TTokenType,
  TClaimPattern
} from '../../types'

import { ethers } from 'ethers'

class Campaign implements TCampaign {

  title: string
  chain_id: number
  campaign_number: string
  token_address: string
  token_standard: TTokenType
  symbol: string
  wallet: string
  proxy_contract_address: string
  encrypted_signer_key: string
  signer_address: string
  sponsored?: boolean
  batch_description: string
  creator_address: string
  created_at?: string
  claim_pattern: TClaimPattern
  sdk: boolean
  proxy_contract_version: string | number

  constructor () {

  }

}

export default Campaign