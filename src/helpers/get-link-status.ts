import { ethers } from 'ethers'
import { linkApi } from '../api'
import { AxiosError } from 'axios'
import { TApiKey, TLinkParams, TLinkStatus } from '../types'

const getLinkStatus = async (
  linkId: string,
  apiHost: string,
  apiKey: TApiKey
) => {
  try {
    const linkStatus = await linkApi.getStatus(
      apiHost,
      apiKey,
      linkId
    )
    if (linkStatus.data) {
      const { data } = linkStatus.data
      return data
    }

  } catch (err: any | AxiosError) {
    console.error(err)
  }
}

export default getLinkStatus