import { generateLink } from "./generate-link"
import { computeProxyAddress } from "./compute-proxy-address"
import generateKeyPair from './generate-keypair'
import generateAccount from './generate-account'

import { signLinkERC20 } from './sign-link-erc20'
import { signLinkERC721 } from './sign-link-erc721'
import { signLinkERC1155 } from './sign-link-erc1155'
import { signReceiverAddress } from './sign-receiver-address'
import { cancelLink } from './cancel-link'
import { createLinkERC1155 } from './create-link-erc1155'
import { createLinkERC721 } from './create-link-erc721'
import { createLinkERC20 } from './create-link-erc20'
import crypto from './crypto'

export {
  generateLink,
  computeProxyAddress,
  generateKeyPair,
  signLinkERC20,
  signLinkERC721,
  signLinkERC1155,
  signReceiverAddress,
  cancelLink,
  createLinkERC1155,
  createLinkERC721,
  createLinkERC20,
  crypto,
  generateAccount
}