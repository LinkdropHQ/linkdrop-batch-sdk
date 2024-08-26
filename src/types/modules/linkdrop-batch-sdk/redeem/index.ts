export type TRedeem = (claimCode: string, destination: string) => Promise<{
  txHash: string,
  recipient: string
} | void>