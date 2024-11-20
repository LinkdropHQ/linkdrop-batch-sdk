import axios from 'axios'
import { TRequests } from './types'
import { defineRequestKeyHeader } from '../../helpers'

const requests: TRequests = {
  getParams: (
    apiHost,
    apiKey,
    linkId,
  ) => {
    const headers = defineRequestKeyHeader(apiKey)
    return axios.get(`${apiHost}/api/v2/claim-links/${linkId}`, { headers })
  },
  getStatus: (
    apiHost,
    apiKey,
    linkId
  ) => {
    const headers = defineRequestKeyHeader(apiKey)
    return axios.get(`${apiHost}/api/v2/claim-links/${linkId}/status`, { headers })
  },
  deactivateLink: (
    apiHost,
    apiKey,
    campaignSig,
    linkId
  ) => {
    const headers = defineRequestKeyHeader(apiKey, campaignSig)
    return axios.post(`${apiHost}/api/v2/dashboard/linkdrop/claim-links/${linkId}/deactivate`, {}, {
      headers
    })
  },
  reactivateLink: (
    apiHost,
    apiKey,
    campaignSig,
    linkId
  ) => {
    const headers = defineRequestKeyHeader(apiKey, campaignSig)
    return axios.post(`${apiHost}/api/v2/dashboard/linkdrop/claim-links/${linkId}/reactivate`, {}, {
      headers
    })
  },
  redeemLink: (
    apiHost,
    apiKey,
    linkId,
    receiverAddress,
    receiverSignature
  ) => {
    const headers = defineRequestKeyHeader(apiKey)

    return axios.post(`${apiHost}/api/v2/claim-links/${linkId}/claim`, {
      receiver_address: receiverAddress,
      receiver_signature: receiverSignature
    }, {
      headers
    })
  }
}

export default requests