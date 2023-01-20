import { TTokenType } from '../types'

export const getClaimEndpoint = (type: TTokenType) => {
  switch (type) {
    case 'ERC20':
      return 'claim'
    case 'ERC721':
      return 'claim-erc721'
    default:
      return 'claim-erc1155'
  }
}