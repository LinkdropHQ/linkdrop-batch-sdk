import { ethers } from 'ethers'
import { TClaimLink, TLinkData } from './types'
import { signReceiverAddress } from '../index'
import { getClaimEndpoint } from '../../helpers'
import axios from 'axios'

export const claimLink: TClaimLink = async ({
  apiHost,
  weiAmount,
  tokenAddress,
  tokenAmount,
  tokenId,
  expirationTime,
  version,
  chainId,
  linkKey,
  masterAddress,
  linkdropSignerSignature,
  receiverAddress,
  factoryAddress,
  campaignId,
  type
}) => {

  if (apiHost === null || apiHost === '') {
    throw new Error('Please provide api host')
  }

  if (weiAmount === null || weiAmount === '') {
    throw new Error('Please provide amount of eth to claim')
  }

  if (tokenAddress === null || tokenAddress === '') {
    throw new Error('Please provide ERC20 token address')
  }

  if (expirationTime === null || expirationTime === '') {
    throw new Error('Please provide expiration time')
  }

  if (version === null || version === '') {
    throw new Error('Please provide mastercopy version ')
  }

  if (chainId === null || chainId === '') {
    throw new Error('Please provide chain id')
  }

  if (linkKey === null || linkKey === '') {
    throw new Error('Please provide link key')
  }

  if (masterAddress === null || masterAddress === '') {
    throw new Error('Please provide linkdropMaster address')
  }

  if (linkdropSignerSignature === null || linkdropSignerSignature === '') {
    throw new Error('Please provide linkdropMaster signature')
  }

  if (receiverAddress === null || receiverAddress === '') {
    throw new Error('Please provide receiver address')
  }

  if (campaignId === null || campaignId === '') {
    throw new Error('Please provide campaign id')
  }

  if (factoryAddress === null || factoryAddress === '') {
    throw new Error('Please provide factory address')
  }

  const linkId = new ethers.Wallet(linkKey).address

  const receiverSignature = await signReceiverAddress(linkKey, receiverAddress)

  let linkData: TLinkData = {
    weiAmount,
    expirationTime,
    version,
    chainId,
    linkId,
    linkdropMasterAddress: masterAddress,
    linkdropSignerSignature,
    receiverAddress,
    receiverSignature,
    factoryAddress,
    campaignId
  }

  if (type === 'erc20') {
    if (!tokenAmount || tokenAmount === '') {
      throw new Error('Please provide amount of tokens to claim')
    }
    linkData.tokenAmount = tokenAmount
    linkData.tokenAddress = tokenAddress
    
  } else if (type === 'erc721') {
    if (!tokenId || tokenId === '') {
      throw new Error('Please provide token id to claim')
    }

    linkData.tokenId = tokenId
    linkData.nftAddress = tokenAddress
    
  } else {
    if (!tokenAmount || tokenAmount === '') {
      throw new Error('Please provide amount of tokens to claim')
    }
    if (!tokenId || tokenId === '') {
      throw new Error('Please provide token id to claim')
    }

    linkData.tokenAmount = tokenAmount
    linkData.tokenId = tokenId
    linkData.nftAddress = tokenAddress
  }

  const response = await axios.post(
    `${apiHost}/api/v1/linkdrops/${getClaimEndpoint(type)}`,
    linkData
  )

  const { errors, success, txHash } = response.data
  return { errors, success, txHash }
}