import ethers from 'ethers'
import { TGenerateLinkUtil } from './type'
import { computeProxyAddress } from '../compute-proxy-address'
import { createLinkERC20 } from '../create-link-erc20'

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
  tokenId
}) => {
  if (factoryAddress === null || factoryAddress === '') {
    throw new Error('Please provide factory address')
  }

  if (!chainId || chainId === null || !chainId) {
    throw new Error('Please provide chainId')
  }

  if (claimHost === null || claimHost === '') {
    throw new Error('Please provide claim host')
  }

  if (masterAddress === null || masterAddress === '') {
    throw new Error("Please provide linkdrop master's address")
  }

  if (signer === null || signer === '') {
    throw new Error('Please provide signing key or wallet')
  }

  if (weiAmount === null || weiAmount === '') {
    throw new Error('Please provide amount of eth to claim')
  }

  if (tokenAddress === null || tokenAddress === '') {
    throw new Error('Please provide ERC20 token address')
  }

  if (tokenAmount === null || tokenAmount === '') {
    throw new Error('Please provide amount of tokens to claim')
  }

  if (expirationTime === null || expirationTime === '') {
    throw new Error('Please provide expiration time')
  }

  if (version === null || !version) {
    throw new Error('Please provide contract version')
  }

  if (campaignId === null || campaignId === '') {
    throw new Error('Please provide campaign id')
  }

  let linkdropSigner
  if (typeof signer === 'string') {
    linkdropSigner = new ethers.Wallet(signer)
  } else if (typeof signer === 'object') {
    linkdropSigner = signer
  } else {
    return
  }

  const proxyAddress = computeProxyAddress(
    factoryAddress,
    masterAddress,
    campaignId
  )

  const { linkKey, linkId, linkdropSignerSignature } = await createLinkERC20({
    linkdropSigner,
    weiAmount,
    tokenAddress,
    tokenAmount,
    expirationTime,
    version,
    chainId,
    proxyAddress
  })

  // // Construct link
  let url = `${claimHost}/#/receive?weiAmount=${weiAmount}&tokenAddress=${tokenAddress}&tokenAmount=${tokenAmount}&expirationTime=${expirationTime}&version=${version}&chainId=${chainId}&linkKey=${linkKey}&linkdropMasterAddress=${masterAddress}&linkdropSignerSignature=${linkdropSignerSignature}&campaignId=${campaignId}`

  if (wallet) {
    url = `${url}&w=${wallet}`
  }

  return { url, linkId, linkKey, linkdropSignerSignature }
}

