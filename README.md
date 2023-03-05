# Linkdrop SDK

Linkdrop provides tools to distribute NFTs with links, QR codes or redeem codes. The Linkdrop SDK is a Typescript library that can be used to automate creating and managing claim links.   

## Supported networks
Currently, Linkdrop supports the following networks:
- Ethereum Mainnet
- Polygon Mainnet

Testnets:
- Goerli (Ethereum testnet)
- Mumbai (Polygon testnet)  
  
We can add support of any EVM-based chain by request. Please contact us If you need to use Linkdrop on other networks. 

## Getting Started
To start using SDK, first you need to create a campaign using Linkdrop Dashboard. Refer to documentation for more info.  


## Initializing SDK

First, import SDK into your code:
```ts
import LinkdropSDK from 'linkdrop-sdk'
// or
// const LinkdropSDK = require('linkdrop-sdk').default
```
To use SDK on a tesnet:
```ts
// initializing Linkdrop SDK on a testnet 
const sdk = new LinkdropSDK(
  // optional parameters
  {
    mode: 'testnets' // for Goerli or Mumbai
  }
);
```
To use SDK on a production network (Ethereum Mainnet or Polygon): 
```ts
// initializing Linkdrop SDK on a production network 
const sdk = new LinkdropSDK();
```

## Managing Campaigns

**IMPORTANT! Managing campaigns requires secret keys that should never be exposed to public. Use campaign methods on a back-end and never within a front-end app.**

After you have created a campaign using Linkdrop Dashboard, you can use SDK to manage the campaign. 
Using SDK you can: 
- fetch campaign data
- create a new batch of claim links
- add claim links to an existing batch
- fetch created claim links
- activate or deactivate links

#### Get Campaign
To be able to do all that, first you need to fetch initialize campaign object
```ts
const campaign = await sdk.getCampaign(
  campaignId: string,
  signerKey: string,
  encryptionKey: string
)
```
Get all params from the campaign page on Dashboard:
-  `campaignId`: ID of the campaign that you want to retrieve information about.
-  `signerKey`: private key used to create claim links. **NEVER EXPOSE SIGNER KEY PUBLICLY**
-  `encryptionKey`: private key used to encode and decode sensitive data stored on server **NEVER EXPOSE ENCRYPTION KEY PUBLICLY**

**IMPORTANT! Managing campaigns requires secret keys that should never be exposed to public. Use campaign methods on a back-end and never within a front-end app.**


The `getCampaign` method returns a promise that resolves to an object that contains information about the campaign.  
**TODO: provide campaign data details**
```ts
console.log(campaign.data)
```

#### Create Batch 
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

The `createBatch` method is a function that is called on a campaign instance to create a batch of claim links for the campaign. It takes two parameters:

1. `linkData`: This is a required array of objects that contain information about the links to be created. Each object in the array must have the following properties:

  * `id`: This is a required string property that represents the token ID for ERC721/ERC1155 campaigns. For ERC20 campaigns, this property is not required.
  * `amount`: This is a required string property that represents the amount of tokens per link for ERC20/ERC1155 campaigns. For ERC721 campaigns, this property is not required.
  * `links`: This is a required string property that represents the number of links to be created.
  * `weiAmount`: This is a required string property that represents the amount of native tokens to be sent to the proxy contract address manually.

2. `options`: This is an optional object that can contain the following properties:
  * `sponsored`: This is an optional boolean property that, if set to `true`, specifies that the claim will be paid by the campaign creator. The default value is `true`.
  * `batchDescription`: This is an optional string property that specifies the description of the batch. The default value is `"Created by SDK"`.

The `createBatch` method returns a promise that resolves to an object that contains information about the batch.


#### Get Batches 
```ts
const batches = await campaign.getBatches()
```
The `getBatches` method is a function that is called on a campaign instance to retrieve all batches associated with the campaign. 

The `getBatches` method takes no parameters.

#### Get Batch 
```ts
const batch = await campaign.getBatch(
  batchId: string
) 
```

The `getBatch` method is a function that is called on a campaign instance to retrieve an instance of the `Batch` class that represents a specific batch associated with the campaign. 

The `getBatch` method takes one parameter:
1. `batchId`: This is a string property that represents the unique identifier for the batch that you want to retrieve information for.

The `getBatch` method returns a promise that resolves to an instance of the `Batch` class that contains information and methods related to the specified batch. 


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
The `addLinks()` method adds a batch of links to the current batch instance. It takes an array of link objects as an argument and returns an array of link IDs.

1. `links`: An array of link objects that contain the following properties:
  * `id`: The token ID (required for ERC721/ERC1155 campaigns).
  * `amount`: The amount of tokens per link (required for ERC20/ERC1155 campaigns).
  * `links`: The number of links to be created.
  * `weiAmount`: The amount of native tokens that should be sent to the proxy contract address manually.

#### Get Links
```ts
const links = await batch.getLinks()
```
The `getLinks()` method of a Batch instance retrieves an array of all links created for that batch. It returns a Promise that resolves with an array of objects


### Link methods

#### Redeem Link
```ts
const { txHash, recipient } = await sdk.redeem(
  claimCode: string,
  destination: string
)
```
The `redeem` method is used to redeem a claim link, transferring the specified token or native currency to the recipient address.

Parameters:
1. `claimCode`: The `claimCode` parameter from the claim link URL.
2. `destination`: The recipient address of the tokens.

#### Deactivate Link
```ts
const success = await campaign.deactivate(
  claimCode: string
)
```
This method deactivates a claim link with the provided claim code.

Parameters:
1. `claimCode`: The `claimCode` parameter from the claim link URL.

#### Reactivate Link
```ts
const success = await campaign.reactivate(
  claimCode: string
) 
```
This method reactivates a claim link with the provided claim code.

Parameters:
1. `claimCode`: The `claimCode` parameter from the claim link URL.

#### Get Link Params
```ts
const linkParams = await sdk.getLinkParams(
  claimCode: string
)
```
This method retrieves the link parameters for the claim link with the provided claim code.

Parameters:
1. `claimCode`: The `claimCode` parameter from the claim link URL.

#### Get Link Status
```ts
const linkStatus= await sdk.getLinkStatus(
  claimCode: string
)
```
This method retrieves the status and other details of a claim link.

Parameters:
1. `claimCode`: The `claimCode` parameter from the claim link URL.


```ts
const	{ 
  status,
  recipient,
  linkId,
  txHash,
  claimedAt,
  createdAtBlock,
} = linkParams

```

Returns an object with the following properties:
1. status: string - The status of the link. Possible values are:
  - `"CREATED"` - The link has been created but has not yet been claimed.
  - `"PENDING"` - The link is waiting for the transaction to be confirmed on the blockchain.
  - `"CLAIMED"` - The link has been successfully claimed.
  - `"FAILED"` - The claim transaction has failed.
  - `"DEACTIVATED"` - The link has been deactivated by the campaign creator.
  - `"EXPIRED"` - The link has expired and can no longer be claimed.
2. recipient: string - The Ethereum address to which the tokens have been sent.
2. linkId: string - The ID of the link.
2. txHash: string - The transaction hash of the claim transaction.
2. claimedAt: number - The UNIX timestamp at which the link was claimed.
2. createdAtBlock: number - The number of the block in which the link was created.
