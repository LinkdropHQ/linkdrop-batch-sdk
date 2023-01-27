import axios from 'axios'
import { TRequests } from './types'

const requests: TRequests = {
  getCampaign: (
    apiHost,
    campaignId,
    apiKey
  ) => {
    const headers = {}
    headers[
      apiKey.mode === 'client' ? 'x-api-key' : 'x-secret-key'
    ] = apiKey.key
    
    return axios.get(`${apiHost}/linkdrop/campaigns/${campaignId}`, {
      headers
    })
  }
}

export default requests