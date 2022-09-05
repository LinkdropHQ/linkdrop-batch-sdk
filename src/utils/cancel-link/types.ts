type TCancelLinkArgs = {
  apiHost: string,
  masterAddress: string,
  linkId: string
}

type TCancelLinkResult = { errors: string[], success: boolean, claimOperation: string }

export type TCancelLink = ({
  apiHost,
  masterAddress,
  linkId
}: TCancelLinkArgs) => Promise<TCancelLinkResult>