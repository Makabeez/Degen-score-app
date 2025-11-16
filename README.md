# ⚔️ DEGEN OLYMPICS - DeGen Score App

![License](https://img.shields.io/badge/license-MIT-blue.svg)
![Base](https://img.shields.io/badge/Base-Blockchain-blue)
![Farcaster](https://img.shields.io/badge/Farcaster-Frame-purple)

**🚀 [Live App](https://degen-score-app.vercel.app)** | **📱 [Try on Farcaster](#)**

> Who's the BIGGEST degen on @base? Let's find out! 👀

DeGen Score is a comprehensive on-chain reputation system that analyzes wallet activity on Base to determine your level of degeneracy in the crypto space.

![DeGen Score Demo](./assets/demo.gif) <!-- Add your demo gif/screenshot -->

## ✨ Features

### 🔍 Real On-Chain Analysis
- **20+ DeFi Protocols** - Tracks interactions across major Base protocols
- **NFT Activity Tracking** - Monitors your NFT trading and collecting behavior
- **Airdrop Hunter Score** - Measures your farming efficiency
- **Bridge & Gas Metrics** - Analyzes cross-chain activity and transaction patterns
- **Comprehensive Scoring** - Algorithm weighs multiple factors for accurate reputation

### 🏆 Ranking System
Get ranked from **NORMIE 🥲** to **ULTRA DEGEN 🦍**:

| Score | Rank | Description |
|-------|------|-------------|
| 0-20 | NORMIE 🥲 | Just getting started |
| 21-40 | CASUAL 👀 | You're learning |
| 41-60 | DEGEN 🎯 | Respectable activity |
| 61-80 | DEGEN KING 👑 | You know what's up |
| 81-100 | ULTRA DEGEN 🦍 | Absolute legend |

### 🎖️ Certificate NFT
- Mint your achievement as an NFT on Base
- Cost: 0.00015 ETH
- Soulbound token representing your score
- Show off your degen creds!

## 🛠️ Tech Stack

**Frontend:**
- Next.js / React
- TailwindCSS
- Web3.js / Ethers.js
- RainbowKit / WalletConnect

**Backend:**
- Node.js / Express
- PostgreSQL / MongoDB (specify which one you used)
- Base RPC integration
- Indexing service for on-chain data

**Blockchain:**
- Base (L2)
- Smart Contract: 0xaba449D7F76c17c9D77a5351E92536Ade2Bb4ca5 ([View on BaseScan]https://basescan.org/address/0xaba449D7F76c17c9D77a5351E92536Ade2Bb4ca5))
- Solidity ^0.8.0

**Deployment:**
- Vercel (Frontend & API)
- Base Mainnet

## 🚀 Quick Start

### Prerequisites
- Node.js v18 or higher
- npm or yarn
- MetaMask or compatible Web3 wallet
- Base network configured in your wallet

### Installation

1. **Clone the repository**
```bash
git clone https://github.com/Makabeez/Degen-score-app.git
cd Degen-score-app
```

2. **Install dependencies**
```bash
# Frontend
cd frontend
npm install

# Backend
cd ../backend
npm install
```

3. **Set up environment variables**

Create `.env` files in both frontend and backend directories:

**Frontend `.env`:**
```env
NEXT_PUBLIC_CONTRACT_ADDRESS=your_contract_address
NEXT_PUBLIC_BASE_RPC_URL=https://mainnet.base.org
NEXT_PUBLIC_BASESCAN_API_KEY=your_basescan_key
NEXT_PUBLIC_CHAIN_ID=8453
```

**Backend `.env`:**
```env
DATABASE_URL=your_database_url
BASE_RPC_URL=your_rpc_endpoint
CONTRACT_ADDRESS=your_contract_address
PORT=3001
```

4. **Run the development servers**

```bash
# Frontend (in frontend directory)
npm run dev

# Backend (in backend directory)
npm run dev
```

Visit `http://localhost:3000` to see the app running locally.

## 📊 How Scoring Works

The DeGen Score algorithm analyzes multiple on-chain metrics:

### Weighted Factors:

1. **DeFi Protocol Interactions (35%)**
   - Uniswap, Aerodrome, Velodrome
   - AAVE, Compound
   - Curve, Balancer
   - And 15+ more protocols

2. **NFT Activity (20%)**
   - Number of NFT transactions
   - Collections owned
   - Trading volume

3. **Airdrop Hunting (20%)**
   - Eligible airdrops claimed
   - Early protocol interactions
   - Testnet activity

4. **Bridge & Gas Metrics (15%)**
   - Cross-chain transactions
   - Gas spent (shows commitment)
   - Transaction frequency

5. **Wallet Age & Activity (10%)**
   - Account age on Base
   - Transaction consistency
   - Total transaction count

## 📄 Smart Contract

### Contract Address
```
[0xaba449D7F76c17c9D77a5351E92536Ade2Bb4ca5]
```

### Key Functions

```solidity
// Mint your certificate NFT
function mintCertificate(uint256 score) external payable

// Get wallet score
function getScore(address wallet) external view returns (uint256)

// View certificate metadata
function tokenURI(uint256 tokenId) external view returns (string)
```

### Contract Features
- ✅ ERC-721 compliant
- ✅ Soulbound (non-transferable)
- ✅ On-chain metadata
- ✅ Verifiable score
- ✅ Mint fee: 0.00015 ETH

[View on BaseScan](https://basescan.org/address/0xaba449D7F76c17c9D77a5351E92536Ade2Bb4ca5)

## 🎯 Usage

1. **Connect Your Wallet**
   - Visit [degen-score-app.vercel.app](https://degen-score-app.vercel.app)
   - Click "Connect Wallet"
   - Approve the connection

2. **Analyze Your Score**
   - Enter your Base wallet address
   - Click "Calculate Score"
   - Wait for on-chain analysis (can take 30-60 seconds)

3. **View Your Results**
   - See your total score (0-100)
   - Review breakdown by category
   - Compare with other degens

4. **Mint Your Certificate** (Optional)
   - Pay 0.00015 ETH
   - Mint your achievement NFT
   - Share on Farcaster with your rank!

## 🔒 Security

- ✅ Contract audited by [Auditor Name] (if applicable)
- ✅ No admin keys or backdoors
- ✅ Open source and verifiable
- ⚠️ Use at your own risk - this is experimental software

**Important:** Never share your private keys. This app only reads public blockchain data.

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📝 Roadmap

- [ ] Support for more Base protocols
- [ ] Historical score tracking
- [ ] Leaderboard system
- [ ] Integration with more Farcaster frames
- [ ] Polygon and Optimism support
- [ ] Social sharing features
- [ ] Achievement badges

## 📜 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## ⚠️ Disclaimer

This tool is for entertainment and informational purposes only. Scores are calculated based on on-chain activity and do not constitute financial advice. Always DYOR (Do Your Own Research) before interacting with any DeFi protocols.

## 🙏 Acknowledgments

- Shoutout to [@jessepollak](https://warpcast.com/jessepollak) and the [@base](https://warpcast.com/base) team for making this chain fast af! 🚀
- Built with ❤️ for the Farcaster and Base communities

## 📞 Contact & Support

- **Twitter/X:** [@geiserjoe2]
- **Farcaster:** [@Makabeez]
- **Issues:** [GitHub Issues](https://github.com/Makabeez/Degen-score-app/issues)

---

**🏆 Post your score on Farcaster and tag us! 🏆**

Made with 🔥 by [Makabeez]
