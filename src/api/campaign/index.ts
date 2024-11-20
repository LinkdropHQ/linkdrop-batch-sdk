import axios from 'axios'
import { TRequests } from './types'
import { defineRequestKeyHeader } from '../../helpers'

const requests: TRequests = {
  getCampaign: (
    apiHost,
    apiKey,
    campaignSig,
    campaignId
  ) => {
    const headers = defineRequestKeyHeader(apiKey, campaignSig)
    return axios.get(`${apiHost}/api/v2/dashboard/linkdrop/campaigns/${campaignId}`, {
      headers
    })
  }
}

export default requests