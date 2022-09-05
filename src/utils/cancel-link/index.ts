import axios from 'axios'
import { TCancelLink } from './types'

export const cancelLink: TCancelLink = async ({
  apiHost,
  masterAddress,
  linkId
}) => {
  const response = await axios.post(`${apiHost}/api/v1/linkdrops/cancel`, {
    linkdropMasterAddress: masterAddress,
    linkId
  })

  const { error, errors, success, claimOperation } = response.data
  return { error, errors, success, claimOperation }
}
