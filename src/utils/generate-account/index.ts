import { ethers } from 'ethers'
import generateKeyPair from '../generate-keypair'
import TGenerateAccount from './types'

const generateAccount: TGenerateAccount = () => {
  const { privateKey } = generateKeyPair()
  const address = new ethers.Wallet(privateKey).address
  return { privateKey, address }  
}

export default generateAccount