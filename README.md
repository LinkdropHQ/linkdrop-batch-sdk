# SDK APIs

## Initialize SDK
```ts
const sdk = new LinkdropSDK({
 // required param
 // key starts with "TEST-CLIENT-XXXXXX" for dev environments
 apiKey: { key: XXXXXX, mode: "client"}, // apiKey: { key: XXXXXX, mode: "server"}, 	 

 // optional param
 apiHost: "https://dev.dashboard-api.linkdrop.io", // overrides api host
 claimApiUrl: 'https://staging.claim.ledger.com' // api that will be used as prefix for claim links
})
```

### Campaign Methods

#### Get Campaign
```js
const campaign = await sdk.getCampaign(campaignId, signerKey, encryptionKey) 
```

#### Create Batch 
```js
const batch = await campaign.createBatch([{ 
		id: "1", 
		amount: "3", 
		links: "100", 
		weiAmount: "1000",
	}], { sponsored = true }) 
```

#### Get Batches 
```js
const batches = await campaign.getBatches()
```

#### Get Batch 
```js
const batch = await campaign.getBatch(batchId) 
```


### Batch methods
#### Add Links
```js
const links = await batch.addLinks([{ 
		id: "1", 
		amount: "3", 
		links: "100", 
		weiAmount: "1000",
	}]) 
```

#### Get Links
```js
const links = await batch.getLinks() 
```

## Claim methods
#### Redeem Link
```js
const { txHash, recipient } = await sdk.redeem(code, destination)
```

#### Deactivate Link
```js
const success = await sdk.deactivate(linkId) 
```
#### Reactivate Link
```js
const success = await sdk.reactivate(linkId) 
```
#### Get Link Params
```js
const linkParams = await sdk.getLinkParams(linkId)
```

#### Get Link Status
```js
const linkParams = await sdk.getLinkStatus(linkId)
const	{ 
	status, // “claimed” | “cancelled” | “created”
	recipient, // Ethereum address 
        txHash,
	claimedAt, // UNIX timestamp
	createdAt, // UNIX timestamp	 
   } = linkParams
```
