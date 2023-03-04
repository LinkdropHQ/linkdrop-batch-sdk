# SDK APIs

## How to Use the Linkdrop SDK
The Linkdrop SDK is a TypeScript library that provides a set of tools for creating and managing linkdrop campaigns on the Ethereum blockchain.

## Initializing a New Instance
To initialize a new instance of the Linkdrop SDK, use the following code:

```ts

import LinkdropSDK from 'linkdrop-sdk'
// or
// const LinkdropSDK = require('linkdrop-sdk').default

const sdk = new LinkdropSDK(
  // optional parameters
  {
    mode: 'testnets',
    apiHost: string,
    claimApiUrl: string
  }
);
```

The `LinkdropSDK` constructor creates a new instance of the SDK with three optional parameters:

1. `mode`: This parameter specifies the mode of operation for the SDK. It can be set to `testnets`. If set to `testnets`, it will operate on the Goerli and Mumbai networks.

2. `apiHost`: This parameter specifies the URL of the API host to use for the SDK. If this parameter is not provided, the default API host will be used.

3. `claimApiUrl`: This parameter specifies the API URL that will be used as a prefix for the claim links. If this parameter is not provided, no prefix will be used.


## Methods

### Campaign Methods

#### Get Campaign

```ts
const campaign = await sdk.getCampaign(
  campaignId: string,
  signerKey: string,
  encryptionKey: string
)
// Get all params from the campaign page of the Linkdrop-Dashboard
```

The `getCampaign` method retrieves information about a campaign from the API. It takes three parameters:

1. `campaignId`: This is a required string parameter that represents the ID of the campaign that you want to retrieve information about.

2. `signerKey`: This is a required string parameter that is the signer key decrypted with the dashboard key. It is used to sign and verify transactions.

3. `encryptionKey`: This is a required string parameter that is the key for link encryption. It is used to encrypt and decrypt links.

The `getCampaign` method returns a promise that resolves to an object that contains information about the campaign.

#### Campaign Data

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