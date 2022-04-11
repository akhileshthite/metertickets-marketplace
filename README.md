<p align="center">
  <img align="center" src="https://github.com/AkhileshThite/metertickets-landingpage/blob/main/src/images/logo.png" width="200" height="200"></img>
</p>

<h1 align="center">MeterTickets</h1>

<p aign="center">
  <p align="center">Landing page website: <a href="https://metertickets.on.fleek.co"></a>https://metertickets.on.fleek.co</p>
  <p align="center">Marketplace website: <a href="https://metertickets-marketplace.vercel.app/"></a>https://metertickets-marketplace.vercel.app/</p>
</p>

<div align="center">
  <img src="https://img.shields.io/github/repo-size/akhileshthite/metertickets-marketplace" alt="repo size">
  <img src="https://img.shields.io/badge/Platform-Meter-purple.svg" alt="platform">
</div>

## Deployed addresses
```bash
0x888ec74a70EF2e960a3CCCF22f675FAf7b10796F
0xeE6b61dF722C1a2D80C07cC29944Bb6B670f8e57
```

## Run locally
1. Clone the project locally, change into the directory, and install the dependencies:
```bash
git clone https://github.com/AkhileshThite/metertickets-marketplace

cd metertickets-marketplace
```

2. install dependencies
```bash
npm install

# or

yarn
```

3. Start the application.
```bash
npm run dev
```

## Development setup
1. Clone the project locally, change into the directory, and install the dependencies:
```bash
git clone https://github.com/AkhileshThite/metertickets-marketplace

cd metertickets-marketplace

# install dependencies using `npm` or `yarn`.

npm install

# or

yarn
```

Create `.secret` and `.env` files, 
* Put private key of your wallet account in `.secret`.
* Put `NEXT_PUBLIC_WORKSPACE_URL=https://rpctest.meter.io/` in `.env` file.

2. Start the local Hardhat node.
```bash
npx hardhat node
```

3. With the network running, deploy the contracts to the local network in a separate terminal window.

```bash
npx hardhat run scripts/deploy.js --network meter
```

4. Start the application.
```bash
npm run dev
```
