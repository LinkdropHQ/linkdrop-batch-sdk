import { IClaimLink } from '../types'
import { parseLinkParams } from '../helpers'
import { TokenType } from '../types/token-type'
import { TClaimLinkOptions } from '../types/claim-link/claim-link-options'
import contracts from '../configs'
import { claimLink } from '../utils'

class ClaimLink implements IClaimLink {
  link: string
  apiHost: string
  tokenAddress: string
  chainId: string
  tokenId: string
  tokenAmount: string
  expirationTime: string
  version: string
  campaignId: string
  wallet: string
  manual: boolean
  linkdropMasterAddress: string
  linkKey: string
  weiAmount: string
  type: TokenType
  linkdropSignerSignature: string
  factoryAddress: string


  constructor (link: string, options: TClaimLinkOptions = {}) {
    this.link = link
    const {
      tokenAddress,
      nftAddress,
      chainId,
      tokenId,
      tokenAmount,
      expirationTime,
      version,
      campaignId,
      w,
      manual,
      linkdropMasterAddress,
      linkKey,
      weiAmount,
      linkdropSignerSignature
    } = parseLinkParams(link)
    const contract = contracts[chainId]

    const {
      apiHost = contract.apiHost,
      factoryAddress = contract.factory
    } = options

    this.tokenAddress = nftAddress || tokenAddress
    this.chainId = chainId
    this.tokenAmount = tokenAmount
    this.tokenId = tokenId
    this.expirationTime = expirationTime
    this.version = version
    this.campaignId = campaignId
    this.wallet = w
    this.manual = manual === "true" ? true : false
    this.linkdropMasterAddress = linkdropMasterAddress
    this.linkKey = linkKey
    this.weiAmount = weiAmount
    this.type = this.defineTokenType()
    this.apiHost = apiHost
    this.linkdropSignerSignature = linkdropSignerSignature
    this.factoryAddress = factoryAddress
  }

  defineTokenType () {
    if (this.tokenAmount && this.tokenId) { return 'erc1155' }
    if (this.tokenAmount && !this.tokenId) { return 'erc20' }
    return 'erc721'
  }

  async claim (receiverAddress: string) {
    return await claimLink({
      apiHost: this.apiHost,
      weiAmount: this.weiAmount,
      tokenAddress: this.tokenAddress,
      tokenAmount: this.tokenAmount,
      tokenId: this.tokenId,
      expirationTime: this.expirationTime,
      version: this.version,
      chainId: this.version,
      linkKey: this.linkKey,
      linkdropMasterAddress: this.linkdropMasterAddress,
      receiverAddress,
      linkdropSignerSignature: this.linkdropSignerSignature,
      factoryAddress: this.factoryAddress,
      campaignId: this.campaignId,
      type: this.type
    })
  
  }

  cancel () {

  }
}

export default ClaimLink