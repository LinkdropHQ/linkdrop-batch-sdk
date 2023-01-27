import { ethers } from 'ethers'
import { TClaimLink, TLinkData } from './types'
import { signReceiverAddress } from '../index'
import { getClaimEndpoint } from '../../helpers'
import axios from 'axios'

export const claimLink: TClaimLink = async ({
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
}) => {

  if (api_host === null || api_host === '') {
    throw new Error('Please provide api host')
  }

  if (wei_amount === null || wei_amount === '') {
    throw new Error('Please provide amount of eth to claim')
  }

  if (token_address === null || token_address === '') {
    throw new Error('Please provide ERC20 token address')
  }

  if (expiration_time === null || expiration_time === '') {
    throw new Error('Please provide expiration time')
  }

  if (version === null || version === '') {
    throw new Error('Please provide mastercopy version ')
  }

  if (chain_id === null || chain_id === '') {
    throw new Error('Please provide chain id')
  }

  if (link_key === null || link_key === '' || !link_key) {
    throw new Error('Please provide link key')
  }

  if (master_address === null || master_address === '') {
    throw new Error('Please provide linkdropMaster address')
  }

  if (linkdrop_signer_signature === null || linkdrop_signer_signature === '') {
    throw new Error('Please provide linkdropMaster signature')
  }

  if (receiver_address === null || receiver_address === '') {
    throw new Error('Please provide receiver address')
  }

  if (campaign_id === null || campaign_id === '') {
    throw new Error('Please provide campaign id')
  }

  if (factory_address === null || factory_address === '') {
    throw new Error('Please provide factory address')
  }

  const linkId = new ethers.Wallet(link_key).address

  const receiverSignature = await signReceiverAddress(link_key, receiver_address)

  let linkData: TLinkData = {
    weiAmount: wei_amount,
    expirationTime: expiration_time,
    version,
    chainId: chain_id,
    linkId,
    linkdropMasterAddress: master_address,
    linkdropSignerSignature: linkdrop_signer_signature,
    receiverAddress: receiver_address,
    receiverSignature,
    factoryAddress: factory_address,
    campaignId: campaign_id
  }

  if (type === 'ERC20') {
    if (!token_amount || token_amount === '') {
      throw new Error('Please provide amount of tokens to claim')
    }
    linkData.tokenAmount = token_amount
    linkData.tokenAddress = token_address
    
  } else if (type === 'ERC721') {
    if (!token_id || token_id === '') {
      throw new Error('Please provide token id to claim')
    }

    linkData.tokenId = token_id
    linkData.nftAddress = token_address
    
  } else {
    if (!token_amount || token_amount === '') {
      throw new Error('Please provide amount of tokens to claim')
    }
    if (!token_id || token_id === '') {
      throw new Error('Please provide token id to claim')
    }

    linkData.tokenAmount = token_amount
    linkData.tokenId = token_id
    linkData.nftAddress = token_address
  }

  const response = await axios.post(
    `${api_host}/api/v1/linkdrops/${getClaimEndpoint(type)}`,
    linkData
  )

  const { errors, success, txHash } = response.data
  return { errors, success, txHash }
}