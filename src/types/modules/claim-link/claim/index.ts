// export type TClaim = (receiverAddress: string) => Promise<{
//   errors: string[],
//   success: boolean,
//   txHash: string
// }>

export type TClaim = (receiverAddress: string) => void