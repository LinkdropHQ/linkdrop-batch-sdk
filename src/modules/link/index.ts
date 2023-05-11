import { TNetworkName, ILink } from '../../types'

class Link implements ILink {
  network: TNetworkName
  apiHost: string
  apiKey: string
  provider: any
  claimHostUrl: string
  tokenAddress: string
  tokenId?: string
  tokenAmount?: string

  constructor ({
    apiKey,
    network,
    apiHost,
    claimHostUrl,
    provider,
    tokenAddress,
    tokenId,
    tokenAmount
  }: {
    apiHost: string
    network: TNetworkName
    claimHostUrl: string
    provider: any
    apiKey: string
    tokenAddress: string
    tokenId?: string
    tokenAmount?: string
  }) {
    this.claimHostUrl = claimHostUrl || ''
    this.network = network || 'mainnet'
    this.provider = provider
    this.apiKey = apiKey
    this.apiHost = apiHost
    this.tokenAddress = tokenAddress
    this.tokenId = tokenId
    this.tokenAmount = tokenAmount
  }

  generate = async () => {
    return { link: '' }
  }

  sponsorClaimFees = async () => {
    return { txHash: '' }
  }

  approve = async () => {
    return { txHash: '' }
  }

}

export default Link