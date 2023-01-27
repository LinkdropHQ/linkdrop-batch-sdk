import { TLinkStatus } from '../link-status'

export type TLinkStatusResponse = { 
	status: TLinkStatus
	recipient: string
  txHash: string
	claimedAt: string
	createdAt: string
}