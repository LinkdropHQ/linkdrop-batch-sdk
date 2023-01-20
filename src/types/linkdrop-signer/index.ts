export type TLinkdropSigner = {
  signMessage: (message: Uint8Array) => Promise<string>
}
