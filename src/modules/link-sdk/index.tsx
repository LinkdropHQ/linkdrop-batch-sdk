import { ILinkSDK, TNetworkName } from '../../types'
import Link from '../link'
import { defineCampaignSig, getLinkParams, getLinkStatus, redeemLink } from '../../helpers'
import { campaignsApi } from '../../api'
import {
  testnetsApiUrl,
  apiUrl
} from '../../configs'

class LinkSDK implements ILinkSDK {
  network: TNetworkName
  apiHost: string
  apiKey: string
  provider: any
  claimHostUrl: string

  constructor ({
    apiKey,
    network,
    apiHost,
    claimHostUrl,
    provider
  }: {
    apiHost?: string
    network: TNetworkName
    claimHostUrl?: string
    provider: any
    apiKey: string
  }) {
    this.claimHostUrl = claimHostUrl || ''
    this.network = network || 'mainnet'
    this.provider = provider
    this.apiKey = apiKey
    if (apiHost) {
      this.apiHost = apiHost
    } else {
      this.apiHost = (this.network === 'goerli' || this.network === 'mumbai') ? testnetsApiUrl : apiUrl
    }
  }

  initializeLink = async ({ tokenAddress, tokenId, tokenAmount }) => {
    return new Link({
      apiKey: this.apiKey,
      network: this.network,
      apiHost: this.apiHost,
      claimHostUrl: this.claimHostUrl,
      provider: this.provider,
      tokenAddress,
      tokenId,
      tokenAmount
    })
  }

}

export default LinkSDK