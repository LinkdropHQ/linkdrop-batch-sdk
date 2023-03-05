# Linkdrop SDK

Linkdrop provides tools to distribute NFTs with links, QR codes or claim codes. The Linkdrop SDK is a Typescript library that can be used to automate creating and managing claim links.   

## Supported networks
Currently, Linkdrop supports the following networks:
- Ethereum Mainnet
- Polygon Mainnet

Testnets:
- Goerli (Ethereum testnet)
- Mumbai (Polygon testnet)  
  
We can add support of any EVM-based chain by request. Please contact us If you need to use Linkdrop on other networks. 

## Getting Started
Create a campaign using Linkdrop Dashboard. When creating a campaign you will need to choose how you want to generate links:
  - Generate claim links via Dashboard interface. 
  - Generate claim links via Linkdrop SDK (see ["Creating claim links"](README.md#creating-claim-links))

## Initializing SDK

First, import SDK into your code:
```ts
import LinkdropSDK from 'linkdrop-sdk'
// or
// const LinkdropSDK = require('linkdrop-sdk').default
```
To use SDK on a tesnet:
```ts
// initializing Linkdrop SDK on a testnet (Goerli or Mumbai)
const sdk = new LinkdropSDK({ mode: 'testnets' });
```
To use SDK on a production network (Ethereum Mainnet or Polygon): 
```ts
// initializing Linkdrop SDK on a production network 
const sdk = new LinkdropSDK();
```

## Public and private SDK methods

Linkdrop SDK methods are divided in two groups:
- Public methods can be used to create a custom front-end claim application.
- Private methods can be used to manage campaigns, create new claim links, deactivate existing links and other powerful methods. To use these methods you need to provide sensitive campaign keys. Never use private methods on the front-end.

### Public methods (For front-end & back-end usage)

Public SDK methods can be used both in a back-end and a front-end applications as these methods don't require providing sensitive campaign keys to invoke them. Please note that you still should be careful with `claimCode` as it can be used to claim tokens attached to the link to any address.

#### Redeeming Link
```ts
const txHash = await sdk.redeem(
  claimCode: string,
  destination: string
)
```
The `redeem` method is used to redeem a claim link, transferring the specified tokens to the recipient address.

Parameters:
- `claimCode`: The `claimCode` parameter from the claim link URL.
- `destination`: The recipient address of the tokens.

The redeem method returns tx hash for the claim transaction. 

#### Getting Link Params
To get claim link params via claim code:
```ts
const linkParams = await sdk.getLinkParams(
  claimCode: string
)
```

To get claim link params via link ID:
```ts
const linkParams = await sdk.getLinkParams(
  linkId: string
)
```

**TODO: provide details for linkParams object**

#### Getting Link Status
To retrieve link status and some other info via claim code:
```ts
const	{ 
  status,
  recipient,
  linkId,
  txHash,
  claimedAt,
  createdAtBlock,
} = await sdk.getLinkStatus(
  claimCode: string
)
```
You can also retrieve status by link ID as well:
```ts
const	{ 
  status,
  recipient,
  linkId,
  txHash,
  claimedAt,
  createdAtBlock,
} = await sdk.getLinkStatus(
  linkId: string
)
```

Returns an object with the following properties:
- status: string - The status of the link. Possible values are:
  - `"CREATED"` - The link has been created but has not yet been claimed.
  - `"PENDING"` - The link is waiting for the transaction to be confirmed on the blockchain.
  - `"CLAIMED"` - The link has been successfully claimed.
  - `"FAILED"` - The claim transaction has failed.
  - `"DEACTIVATED"` - The link has been deactivated by the campaign creator.
  - `"EXPIRED"` - The link has expired and can no longer be claimed.
- recipient: string - The Ethereum address to which the tokens have been sent.
- linkId: string - The ID of the link.
- txHash: string - The transaction hash of the claim transaction.
- claimedAt: number - The UNIX timestamp at which the link was claimed.
- createdAtBlock: number - The number of the block in which the link was created.

## Private methods (FOR BACK-END USE ONLY)

To use private SDK methods, you need to create a campaign via Linkdrop Dashboard first. Refer here for more info. 

### Managing campaigns

**⚠️ IMPORTANT! Private methods to manage campaigns and links require secret keys that should never be exposed to public. Use private methods on a back-end and never within a front-end app.**

After you have created a campaign using Linkdrop Dashboard, you can use SDK to manage the campaign. 
Using SDK you can: 
- fetch campaign data
- create a new batch of claim links
- add claim links to an existing batch
- fetch created claim links
- activate or deactivate links

#### Getting Campaign
To be able to do all that, first you need to fetch initialize campaign object
```ts
const campaign = await sdk.private.getCampaign(
  campaignId: string,
  signerKey: string,
  encryptionKey: string
)
```
Get all params from the campaign page on Dashboard:
-  `campaignId`: ID of the campaign that you want to retrieve information about.
-  `signerKey`: private key used to create claim links. **(NEVER EXPOSE SIGNER KEY PUBLICLY)**
-  `encryptionKey`: private key used to encode and decode sensitive data stored on server **(NEVER EXPOSE ENCRYPTION KEY PUBLICLY)**

**⚠️ IMPORTANT! Private methods to manage campaigns and links require secret keys that should never be exposed to public. Use private methods on a back-end and never within a front-end app.**

The returned `campaign` object has campaign data and addtional methods to manage the campaign.   
  
**TODO: provide campaign data details**
```ts
console.log(campaign.data)
```

### Creating claim links
#### Creating new batch 

To create a batch of claim links for the campaign, use the `campaign.createBatch` method
```ts
const batch = await campaign.createBatch(
  [{ 
    id: string,
    amount: string,
    links: string,
    weiAmount: string
  }],
  // optional parameters
  {
    sponsored: boolean,
    batchDescription: string
  }
)
```
It takes two parameters:
- `linkData`: This is a required array of objects that contain information about the links to be created. Each object in the array must have the following properties:
  * `id`: token ID for ERC721/ERC1155 campaigns. For ERC20 campaigns, id is not provided.
  * `amount`: amount of tokens per link for ERC20/ERC1155 campaigns. For ERC721 campaigns, amount is not provided.
  * `links`: number of links to create.
  * `weiAmount`: amount of network tokens (ETH/MATIC) to be sent to receiver on claim. Campaign contract should have enough network tokens before claim. Top up the campaign contract in advance manually. 

- `options`: This is an optional object that can contain the following properties:
  * `sponsored`: This is an optional boolean property that, if set to `true`, specifies that the claim will be paid by the campaign creator. The default value is `true`.
  * `batchDescription`: This is an optional string property that specifies the description of the batch. The default value is "Created by SDK".

The returned `batch` object contains information related to the specified batch and methods to manage it.  

#### Getting Batches 

To retrieve all batches associated with the campaign, call the `campaign.getBatches` method: 
```ts
const batches = await campaign.getBatches()
```

#### Getting Batch 

To manage a batch, first you need to retrieve it by ID: 
```ts
const batch = await campaign.getBatch(
  batchId: string
) 
```
The returned `batch` object contains information related to the specified batch and methods to manage it.  
**#TODO: provide batch data details**


### Batch methods

#### Adding Links to an existing batch

To add claim links to an existing batch, call the `batch.addLinks` method:
```ts
const links = await batch.addLinks([{ 
  id: string, 
  amount: string, 
  links: string, 
  weiAmount: string,
}]) 
```

It takes an array of link objects as an argument and returns an array of link IDs. **TODO: link codes?**

1. `links`: An array of link objects that contain the following properties:
  * `id`: The token ID (required for ERC721/ERC1155 campaigns).
  * `amount`: The amount of tokens per link (required for ERC20/ERC1155 campaigns).
  * `links`: The number of links to be created.
  * `weiAmount`: The amount of native tokens that should be sent to the proxy contract address manually.

#### Getting Links
To fetch all links created for that batch, use the `batch.getLinks` method:
```ts
const links = await batch.getLinks()
```

### Deactivating / reactivating links

#### Deactivate Link
To deactivate link:
```ts
const success = await campaign.deactivate(
  claimCode: string
)
```

Parameters:
 - `claimCode`: The `claimCode` parameter from the claim link URL.

#### Reactivate Link
To reactivatate previosly deactivated link:
```ts
const success = await campaign.reactivate(
  claimCode: string
) 
```

Parameters:
- `claimCode`: The `claimCode` parameter from the claim link URL.


## Troubleshooting and getting in touch
- Join [Linkdrop Community](https://t.me/linkdrophq) in Telegram to chat with the team
- Reach us at hi@linkdop.io
