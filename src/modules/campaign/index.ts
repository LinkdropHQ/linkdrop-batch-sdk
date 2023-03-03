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
import { AxiosError } from 'axios'
import { ethers } from 'ethers'

class Campaign implements ICampaign {
  data: TCampaignItem
  campaignId: string
  signerKey: string
  encryptionKey: string
  apiHost: string
  claimAppUrl: string
  campaignSig: string

  constructor (
    campaignId: string,
    signerKey: string,
    encryptionKey: string,
    data: TCampaignItem,
    claimAppUrl: string,
    campaignSig: string,
    apiHost: string
  ) {
    this.campaignId = campaignId
    this.signerKey = signerKey
    this.encryptionKey = encryptionKey
    this.data = data
    this.claimAppUrl = claimAppUrl
    this.apiHost = apiHost
    this.campaignSig = campaignSig
  }

  getBatches: TGetBatches = async () => {
    try {
      const campaignData = await batchesApi.getBatches(
        this.apiHost,
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
    } catch (err) {
      console.error({
        err
      })
    }
  }

  getBatch: TGetBatch = async (
    batchId
  ) => {
    try {
      const campaignData = await batchesApi.getBatch(
        this.apiHost,
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
          this.claimAppUrl,
          this.data,
          this.signerKey,
          this.campaignSig,
          this.apiHost
        )
      }
    } catch (err) {
      console.error({
        err
      })
    }
  }

  createBatch: TCreateBatch = async (
    assets: TAsset[],
    options: {
      sponsored: boolean,
      batchDescription: string,
      shortCodeLength: number,
      shortCodeMixRegister: boolean
    } = {
      sponsored: true,
      batchDescription: 'Created by SDK',
      shortCodeLength: 12,
      shortCodeMixRegister: true
    }
  ) => {
    try {
      const transformedAssets = await prepareAssets(
        assets,
        this.signerKey,
        this.encryptionKey,
        this.data.token_standard,
        this.data.token_address,
        this.data.proxy_contract_address,
        this.data.chain_id,
        this.data.proxy_contract_version,
        options.shortCodeLength,
        options.shortCodeMixRegister
      )
      if (!transformedAssets) { return alert('Error with assets') }
      const response = await batchesApi.createBatch(
        this.apiHost,
        this.campaignSig,
        this.data.campaign_id,
        transformedAssets,
        options.sponsored,
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
    } catch (err) {
      console.error({
        err
      })
    }
  }

  async reactivate (
    claimCode
  ) {
    try {
      const linkKey = ethers.utils.id(claimCode)
      const wallet = new ethers.Wallet(linkKey)

      const linkData = await linkApi.reactivateLink(
        this.apiHost,
        this.campaignSig,
        wallet.address
      )
      const { data } = linkData
      if (data) {
        const { success } = data
        return success
      }
    } catch (err: any | AxiosError) {
      console.error({
        err
      })
    }
    
  }

  async deactivate (
    claimCode
  ) {
    try {
      const linkKey = ethers.utils.id(claimCode)
      const wallet = new ethers.Wallet(linkKey)
  
      const linkData = await linkApi.deactivateLink(
        this.apiHost,
        this.campaignSig,
        wallet.address
      )
      const { data } = linkData
      if (data) {
        const { success } = data
        return success
      }
    } catch (err: any | AxiosError) {
      console.error({
        err
      })
    }
  }
}

export default Campaign