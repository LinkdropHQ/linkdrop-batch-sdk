# SDK APIs

## Initialize SDK
```ts
const sdk = new LinkdropSDK({
 // required params
 apiKey: "XXXXXXX",  // starts with "TEST-" for dev environments
 chain: "polygon" | "mainnet",  // required

 // optional params
 encryptionKey: "" // optional parameter
 apiHost: "https://dev.dashboard-api.linkdrop.io" // overrides api host 
})
```

## Claim methods
#### Redeem Link
```js
const { txHash, recipient } = await sdk.redeem(code, destination)
```
API endpoints: 
 - https://github.com/LinkdropHQ/dashboard-api-docs/blob/main/api-linkdrop-campaigns.md#get-userclaim-paramslink_id

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
API end-point https://github.com/LinkdropHQ/dashboard-api-docs/blob/main/api-linkdrop-campaigns.md#get-dashboardlinkdropcampaignscampaign_idbatchesbatch_id-jwt

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
