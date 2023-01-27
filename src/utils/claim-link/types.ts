import { TTokenType } from '../../types/token-type'
import TLinkParams from '../../types/link-params'

type TClaimLinkArgs = {
  api_host: string
  version: string
  master_address: string
  linkdrop_signer_signature: string
  receiver_address: string
  factory_address: string
  campaign_id: string
  type: TTokenType
}

type TClaimLinkResult = {
  errors: string[]
  success: boolean
  txHash: string
}

export type TClaimLink = ({
  wei_amount,
  token_address,
  token_amount,
  token_id,
  expiration_time,
  chain_id,
  link_key,
  api_host,
  version,
  master_address,
  linkdrop_signer_signature,
  receiver_address,
  factory_address,
  campaign_id,
  type
}: (TLinkParams & TClaimLinkArgs)) => Promise<TClaimLinkResult>

export type TLinkData = {
  weiAmount: string
  expirationTime: string
  version: string
  chainId: string
  linkId: string
  linkdropMasterAddress: string
  linkdropSignerSignature: string
  receiverAddress: string
  receiverSignature: string
  factoryAddress: string
  campaignId: string,
  tokenAmount?: string,
  tokenId?: string,
  tokenAddress?: string,
  nftAddress?: string
}