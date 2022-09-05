import { ethers } from 'ethers'
import { TGenerateLinkUtil } from './type'
import { computeProxyAddress } from '../compute-proxy-address'
import { createLinkERC20 } from '../create-link-erc20'
import { createLinkERC721 } from '../create-link-erc721'
import { createLinkERC1155 } from '../create-link-erc1155'

export const generateLink: TGenerateLinkUtil = async ({
  factoryAddress,
  chainId,
  claimHost,
  signer,
  weiAmount,
  tokenAddress,
  tokenAmount,
  expirationTime,
  version,
  campaignId,
  wallet,
  masterAddress,
  tokenId,
  type,
  manual
}) => {
  console.log({ type, tokenId })
  if (!factoryAddress || factoryAddress === '') {
    throw new Error('Please provide factory address')
  }

  if (!chainId || !chainId) {
    throw new Error('Please provide chainId')
  }

  if (!claimHost || claimHost === '') {
    throw new Error('Please provide claim host')
  }

  if (!masterAddress || masterAddress === '') {
    throw new Error("Please provide linkdrop master's address")
  }

  if (!signer || signer === '') {
    throw new Error('Please provide signing key or wallet')
  }

  if (!weiAmount || weiAmount === '') {
    throw new Error('Please provide amount of native token to claim')
  }

  if (!tokenAddress || tokenAddress === '') {
    throw new Error('Please provide ERC20 token address')
  }

  if (!expirationTime || expirationTime === '') {
    throw new Error('Please provide expiration time')
  }

  if (!version || !version) {
    throw new Error('Please provide contract version')
  }

  let linkdropSigner
  if (typeof signer === 'string') {
    linkdropSigner = new ethers.Wallet(signer)
  } else if (typeof signer === 'object') {
    linkdropSigner = signer
  } else {
    throw new Error('linkdropSigner is not valid')
  }

  const proxyAddress = computeProxyAddress(
    factoryAddress,
    masterAddress,
    campaignId
  )

  let linkData
  if (type === 'erc20') {
    if (!tokenAmount || tokenAmount === '') {
      throw new Error('Please provide amount of tokens to claim')
    }
    linkData = await createLinkERC20({
      linkdropSigner,
      weiAmount,
      tokenAddress,
      tokenAmount,
      expirationTime,
      version,
      chainId,
      proxyAddress
    })
  } else if (type === 'erc721') {
    if (!campaignId || campaignId === '') {
      throw new Error('Please provide campaign id')
    }
    if (!tokenId || tokenId === '') {
      throw new Error('Please provide token id')
    }
    linkData = await createLinkERC721({
      linkdropSigner,
      weiAmount,
      tokenAddress,
      tokenId,
      expirationTime,
      version,
      chainId,
      proxyAddress
    })
  } else {
    if (!tokenAmount || tokenAmount === '') {
      throw new Error('Please provide amount of tokens to claim')
    }
    if (!campaignId || campaignId === '') {
      throw new Error('Please provide campaign id')
    }
    if (!tokenId || tokenId === '') {
      throw new Error('Please provide token id')
    }
    linkData = await createLinkERC1155({
      linkdropSigner,
      weiAmount,
      tokenAddress,
      tokenId,
      tokenAmount,
      expirationTime,
      version,
      chainId,
      proxyAddress
    })
  }

  const { linkKey, linkId, linkdropSignerSignature } = linkData

  // // Construct link
  let url = `${claimHost}/#/receive?weiAmount=${weiAmount}&tokenAddress=${tokenAddress}&expirationTime=${expirationTime}&version=${version}&chainId=${chainId}&linkKey=${linkKey}&linkdropMasterAddress=${masterAddress}&linkdropSignerSignature=${linkdropSignerSignature}&campaignId=${campaignId}${manual ? '&manual=true' : ''}${tokenId ? `&tokenId=${tokenId}` : ''}${tokenAmount ? `&tokenAmount=${tokenAmount}` : ''}`

  if (wallet) {
    url = `${url}&w=${wallet}`
  }

  return { url, linkId, linkKey, linkdropSignerSignature }
}

