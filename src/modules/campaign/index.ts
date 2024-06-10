import {
  ICampaign,
  TCampaignItem,
  TAsset,
} from '../../types'
import TGetBatches from '../../types/modules/campaign/get-batches'
import TGetBatch from '../../types/modules/campaign/get-batch'
import { linkApi, batchesApi } from '../../api'
import Batch from '../batch'
import TCreateBatch from '../../types/modules/campaign/create-batch'
import { prepareAssets } from '../../helpers'
import { ethers } from 'ethers'

class Campaign implements ICampaign {
  data: TCampaignItem
  campaignId: string
  signerKey: string
  encryptionKey: string
  apiHost: string
  claimHostUrl: string
  campaignSig: string
  apiKey: string

  constructor (
    campaignId: string,
    signerKey: string,
    encryptionKey: string,
    data: TCampaignItem,
    claimHostUrl: string,
    campaignSig: string,
    apiHost: string,
    apiKey: string
  ) {
    this.campaignId = campaignId
    this.signerKey = signerKey
    this.encryptionKey = encryptionKey
    this.data = data
    this.claimHostUrl = claimHostUrl
    this.apiHost = apiHost
    this.campaignSig = campaignSig
    this.apiKey = apiKey
  }

  getBatches: TGetBatches = async () => {
    const campaignData = await batchesApi.getBatches(
      this.apiHost,
      this.apiKey,
      this.campaignSig,
      this.campaignId
    )
    const { data } = campaignData
    if (data) {
      const { batches, creator_address } = data
      return {
        batches,
        creator_address
      }
    }
  }

  getBatch: TGetBatch = async (
    batchId
  ) => {
    const campaignData = await batchesApi.getBatch(
      this.apiHost,
      this.apiKey,
      this.campaignSig,
      this.campaignId,
      batchId
    )
    const { data } = campaignData
    if (data) {
      const { batch, claim_links } = data
      return new Batch(
        batchId,
        batch,
        claim_links,
        this.encryptionKey,
        this.claimHostUrl,
        this.data,
        this.signerKey,
        this.campaignSig,
        this.apiHost,
        this.apiKey,
        this.data.chain_id
      )
    }
  }

  createBatch: TCreateBatch = async (
    assets: TAsset[],
    options: {
      batchDescription: string,
      shortCodeLength: number,
      shortCodeMixRegister: boolean,
      expirationTime: string
    } = {
      batchDescription: 'Created by SDK',
      shortCodeLength: 12,
      shortCodeMixRegister: true,
      expirationTime: '1900000000000'
    }
  ) => {
    const transformedAssets = await prepareAssets(
      assets,
      this.signerKey,
      this.encryptionKey,
      this.data.token_standard,
      this.data.token_address,
      this.data.proxy_contract_address,
      this.data.chain_id,
      this.data.proxy_contract_version,
      options.expirationTime,
      options.shortCodeLength,
      options.shortCodeMixRegister
    )
    if (!transformedAssets) { return alert('Error with assets') }
    const response = await batchesApi.createBatch(
      this.apiHost,
      this.apiKey,
      this.campaignSig,
      this.data.campaign_id,
      transformedAssets,
      options.batchDescription
    )
    if (response.data) {
      const {
        campaign_id,
        creator_address,
        claim_links,
        batch
      } = response.data
      return {
        batch,
        campaign_id,
        creator_address,
        claim_links
      }
    }
  }

  async reactivate (
    claimCode
  ) {
    const linkKey = ethers.utils.id(claimCode)
    const wallet = new ethers.Wallet(linkKey)

    const linkData = await linkApi.reactivateLink(
      this.apiHost,
      this.apiKey,
      this.campaignSig,
      wallet.address
    )
    const { data } = linkData
    if (data) {
      const { success } = data
      return success
    }
  }

  async deactivate (
    claimCode
  ) {
    const linkKey = ethers.utils.id(claimCode)
    const wallet = new ethers.Wallet(linkKey)

    const linkData = await linkApi.deactivateLink(
      this.apiHost,
      this.apiKey,
      this.campaignSig,
      wallet.address
    )
    const { data } = linkData
    if (data) {
      const { success } = data
      return success
    }
  }
}

export default Campaign