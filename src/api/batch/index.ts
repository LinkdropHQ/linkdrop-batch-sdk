import axios from 'axios'
import { TRequests } from './types'
import { defineRequestKeyHeader } from '../../helpers'

const requests: TRequests = {
  getBatches: (
    apiHost,
    campaignSig,
    campaignId
  ) => {
    const headers = defineRequestKeyHeader(campaignSig)
    return axios.get(`${apiHost}/api/v2/dashboard/linkdrop/campaigns/${campaignId}/batches`, {
      headers,
    })
  },
  getBatch: (
    apiHost,
    campaignSig,
    campaignId,
    batchId
  ) => {
    const headers = defineRequestKeyHeader(campaignSig)
    return axios.get(`${apiHost}/api/v2/dashboard/linkdrop/campaigns/${campaignId}/batches/${batchId}`, {
      headers,
    })
  },
  createBatch: (
    apiHost,
    campaignSig,
    campaignId,
    claimLinks,
    sponsored,
    batchDescription
  ) => {
    const headers = defineRequestKeyHeader(campaignSig)
    return axios.post(`${apiHost}/api/v2/dashboard/linkdrop/campaigns/${campaignId}/save-batch`, {
      claim_links: claimLinks,
      sponsored,
      batch_description: batchDescription
    }, {
      headers
    })
  },
  addLinks: (
    apiHost,
    campaignSig,
    campaignId,
    batchId,
    claimLinks,
  ) => {
    const headers = defineRequestKeyHeader(campaignSig)
    return axios.post(`${apiHost}/api/v2/dashboard/linkdrop/campaigns/${campaignId}/batches/${batchId}/add-links `, {
      claim_links: claimLinks
    }, {
      headers
    })
  }
}

export default requests