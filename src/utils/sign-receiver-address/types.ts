import { ethers } from 'ethers'

export type TSignReceiverAddress = (
  wallet: ethers.Wallet,
  receiverAddress: string
) => Promise<string>