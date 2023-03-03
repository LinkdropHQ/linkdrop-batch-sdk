type TLinkItem = {
  link_id: string
  encrypted_claim_link?: string
  encrypted_claim_code: string
  token_id: string
  token_amount: string
  sender_signature : string
  wei_amount: string
  expiration_time: string
}

export default TLinkItem