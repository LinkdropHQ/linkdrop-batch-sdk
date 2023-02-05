import { TLinkStatus } from '../link-status'

export type TLinkStatusResponse = { 
	status: TLinkStatus
	recipient?: string
  tx_hash?: string
	claimed_at_block?: number
	created_at?: string
	link_id: string
}