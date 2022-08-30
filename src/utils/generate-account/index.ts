import { ethers } from 'ethers'

export const generateAccount = () => {
  return ethers.Wallet.createRandom()
}