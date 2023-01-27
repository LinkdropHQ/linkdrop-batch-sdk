import { ethers } from 'ethers'
import { linkApi } from '../api'
import { AxiosError } from 'axios'
import { TLinkParams, TLinkStatus } from '../types'

const getLinkStatus = async (
  linkKey: string
) => {
  try {
    return {
      status: 'claimed' as TLinkStatus,
      recipient: '0xB4C3d57327D4fC9bcC3499963E21dB1A5435d537',
      txHash: '0x2f3fdbcd187a05a21cdde63db10e892958283db60efd5fa1a15bdb4e2f72c920',
      claimedAt: '12.12.12',
      createdAt: '12.12.12'
    }

  } catch (err: any | AxiosError) {
    console.error(err)
  }
}

export default getLinkStatus