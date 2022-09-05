import { TokenType } from '../types'

export const getClaimEndpoint = (type: TokenType) => {
  switch (type) {
    case 'erc20':
      return 'claim'
    case 'erc721':
      return 'claim-erc721'
    default:
      return 'claim-erc1155'
  }
}