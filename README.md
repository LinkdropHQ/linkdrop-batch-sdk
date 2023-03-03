# SDK APIs

## Initialize SDK
```ts
import LinkdropSDK from 'linkdrop-sdk'
// or
// const LinkdropSDK = require('linkdrop-sdk').default

const sdk = new LinkdropSDK({
  // optional params
  mode: 'testnets', // for goerli and mumbai networks
  apiHost: string, // overrides defulat api host
  claimApiUrl: string // api url that will be used as prefix for claim links
})
```

### Campaign Methods

#### Get Campaign
```js
const campaign = await sdk.getCampaign(
  campaignId: string,
  signerKey: string, // signer key decrypted with dashboard key
  encryptionKey: string // key for link encryption
)

// Get all params from the campaign page of the Linkdrop-Dashboard
```

#### Campaign Data

```js
console.log(campaign.data)
// campaign id, campaign number, chain id, claim pattern, proxy contract address, title, etc.

```

#### Create Batch 
```ts
const batch = await campaign.createBatch(
  [{ 
    id: string, // Token id (needed for ERC721/ERC1155 campaign)
    amount: string, // Amount of tokens per link (needed for ERC20/ERC1155 campaign)
    links: string, // Amount of links
    weiAmount: string, // Amount of native tokens. Should be sent to proxy contract address manually
  }],
  // optional parameters
  {
    sponsored: boolean, // if set to true claim will be paid by campaign creator. Default: true
    batchDescription: string // description of batch. Default: 'Created by SDK'
  }
)
```

#### Get Batches 
```ts
const batches = await campaign.getBatches()
```

#### Get Batch 
```ts
const batch = await campaign.getBatch(
  batchId: string //id of batch
) 
```

### Batch methods
#### Add Links
```ts
const links = await batch.addLinks([{ 
  id: string, 
  amount: string, 
  links: string, 
  weiAmount: string,
}]) 
```

#### Get Links
```js
const links = await batch.getLinks() // array of links with linkId for each link
```

## Claim methods
#### Redeem Link
```ts
const { txHash, recipient } = await sdk.redeem(
  code: string, // linkKey parameter from claim link url
  destination: string // recipient of tokens
)
```

#### Deactivate Link
```ts
const success = await campaign.deactivate(
  linkId: string // id of link
)
```
#### Reactivate Link
```ts
const success = await campaign.reactivate(
  linkId: string // id of link
) 
```
#### Get Link Params
```js
const linkParams = await sdk.getLinkParams(
  linkId: string // id of link
)
```

#### Get Link Status
```js
const linkParams = await sdk.getLinkStatus(linkId)
const	{ 
  status, // "CREATED", "PENDING", "CLAIMED", "FAILED", "DEACTIVATED", "EXPIRED"
  recipient, // Ethereum address 
  linkId, // id of link
  txHash,
  claimedAt, // UNIX timestamp
  createdAtBlock, // number of block
} = linkParams
```