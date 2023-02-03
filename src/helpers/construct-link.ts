import { TLinkParams } from '../types'

type TConstructLink = (linkDetails: TLinkParams) => string

const constructLink: TConstructLink = ({
  creator_address,
  sponsored,
  chain_id,
  campaign_number,
  token_address,
  token_standard,
  token_id,
  token_amount,
  sender_signature,
  proxy_contract_version,
  wei_amount,
  expiration_time,
  link_key,
  wallet
}) => {
  let link = `/receive?linkdropSignerSignature=${sender_signature}&linkKey=${link_key}&weiAmount=${wei_amount}&linkdropMasterAddress=${creator_address}&chainId=${chain_id}&campaignId=${campaign_number}&version=${proxy_contract_version}&w=${wallet}&expirationTime=${expiration_time}${!sponsored ? '&manual=true' : ''}`

  if (token_standard === 'ERC20') {
    link = `${link}&tokenAmount=${token_amount}&tokenAddress=${token_address}`
  }
  if (token_standard === 'ERC721') {
    link = `${link}&tokenId=${token_id}&nftAddress=${token_address}`
  }
  if (token_standard === 'ERC1155') {
    link = `${link}&tokenId=${token_id}&nftAddress=${token_address}&tokenAmount=${token_amount}`
  }
  return link
}

export default constructLink