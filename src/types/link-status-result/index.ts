import { TLinkStatus } from '../link-status'

export type TLinkStatusResult = { 
	status: TLinkStatus
	recipient?: string
  txHash?: string
	claimedAtBlock?: number
	createdAt?: string
	linkId: string
}