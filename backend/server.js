const express = require('express');
const cors = require('cors');
const fetch = require('node-fetch');

const app = express();
const PORT = process.env.PORT || 10000;

const ETHERSCAN_API_KEY = process.env.ETHERSCAN_API_KEY || 'TVJEPKYWMRAH2XQGPZ6Q9NRQTFGWIYPMWH';
const BASE_API_URL = 'https://api.basescan.org/api';

app.use(cors());
app.use(express.json());

const cache = new Map();
const CACHE_DURATION = 5 * 60 * 1000;

async function fetchFromEtherscan(params) {
  const url = new URL(BASE_API_URL);
  url.searchParams.append('apikey', ETHERSCAN_API_KEY);
  
  Object.keys(params).forEach(key => {
    url.searchParams.append(key, params[key]);
  });

  const response = await fetch(url.toString());
  const data = await response.json();
  
  if (data.status === '1' && data.result) {
    return data.result;
  }
  
  if (data.status === '0') {
    console.error('Basescan API Error:', data.message || data.result);
  }
  
  return [];
}

app.get('/api/transactions/:address', async (req, res) => {
  try {
    const { address } = req.params;
    const cacheKey = `tx_${address}`;
    
    if (cache.has(cacheKey)) {
      const cached = cache.get(cacheKey);
      if (Date.now() - cached.timestamp < CACHE_DURATION) {
        return res.json({ data: cached.data, cached: true });
      }
    }

    const transactions = await fetchFromEtherscan({
      module: 'account',
      action: 'txlist',
      address: address,
      startblock: 0,
      endblock: 99999999,
      page: 1,
      offset: 100,
      sort: 'desc'
    });

    cache.set(cacheKey, {
      data: transactions,
      timestamp: Date.now()
    });

    res.json({ data: transactions, cached: false });
  } catch (error) {
    console.error('Error fetching transactions:', error);
    res.status(500).json({ error: error.message });
  }
});

app.get('/api/nft-transactions/:address', async (req, res) => {
  try {
    const { address } = req.params;
    const cacheKey = `nft_${address}`;
    
    if (cache.has(cacheKey)) {
      const cached = cache.get(cacheKey);
      if (Date.now() - cached.timestamp < CACHE_DURATION) {
        return res.json({ data: cached.data, cached: true });
      }
    }

    const nftTransactions = await fetchFromEtherscan({
      module: 'account',
      action: 'tokennfttx',
      address: address,
      startblock: 0,
      endblock: 99999999,
      page: 1,
      offset: 100,
      sort: 'desc'
    });

    cache.set(cacheKey, {
      data: nftTransactions,
      timestamp: Date.now()
    });

    res.json({ data: nftTransactions, cached: false });
  } catch (error) {
    console.error('Error fetching NFT transactions:', error);
    res.status(500).json({ error: error.message });
  }
});

app.get('/api/token-transactions/:address', async (req, res) => {
  try {
    const { address } = req.params;
    const cacheKey = `token_${address}`;
    
    if (cache.has(cacheKey)) {
      const cached = cache.get(cacheKey);
      if (Date.now() - cached.timestamp < CACHE_DURATION) {
        return res.json({ data: cached.data, cached: true });
      }
    }

    const tokenTransactions = await fetchFromEtherscan({
      module: 'account',
      action: 'tokentx',
      address: address,
      startblock: 0,
      endblock: 99999999,
      page: 1,
      offset: 100,
      sort: 'desc'
    });

    cache.set(cacheKey, {
      data: tokenTransactions,
      timestamp: Date.now()
    });

    res.json({ data: tokenTransactions, cached: false });
  } catch (error) {
    console.error('Error fetching token transactions:', error);
    res.status(500).json({ error: error.message });
  }
});

app.get('/api/analyze/:address', async (req, res) => {
  try {
    const { address } = req.params;
    const cacheKey = `full_${address}`;
    
    if (cache.has(cacheKey)) {
      const cached = cache.get(cacheKey);
      if (Date.now() - cached.timestamp < CACHE_DURATION) {
        return res.json({ ...cached.data, cached: true });
      }
    }

    console.log(`Analyzing wallet: ${address}`);

    const [transactions, nftTransactions, tokenTransactions] = await Promise.all([
      fetchFromEtherscan({
        module: 'account',
        action: 'txlist',
        address: address,
        startblock: 0,
        endblock: 99999999,
        page: 1,
        offset: 100,
        sort: 'desc'
      }),
      fetchFromEtherscan({
        module: 'account',
        action: 'tokennfttx',
        address: address,
        startblock: 0,
        endblock: 99999999,
        page: 1,
        offset: 100,
        sort: 'desc'
      }),
      fetchFromEtherscan({
        module: 'account',
        action: 'tokentx',
        address: address,
        startblock: 0,
        endblock: 99999999,
        page: 1,
        offset: 100,
        sort: 'desc'
      })
    ]);

    console.log(`Data fetched: ${transactions.length} txs, ${nftTransactions.length} NFTs, ${tokenTransactions.length} tokens`);

    const analysis = analyzeWalletData(transactions, nftTransactions, tokenTransactions, address);

    cache.set(cacheKey, {
      data: analysis,
      timestamp: Date.now()
    });

    res.json({ ...analysis, cached: false });
  } catch (error) {
    console.error('Error analyzing wallet:', error);
    res.status(500).json({ error: error.message });
  }
});

function analyzeWalletData(transactions, nftTransactions, tokenTransactions, address) {
  const defiProtocols = {
    '0x4200000000000000000000000000000000000006': 'WETH',
    '0x50c5725949a6f0c72e6c4a641f24049a917db0cb': 'Aerodrome',
    '0x2626664c2603336e57b271c5c0b26f421741e481': 'BaseSwap',
    '0x940181a94a35a4569e4529a3cdfb74e38fd98631': 'Aave',
    '0x4752ba5dbc23f44d87826276bf6fd6b1c372ad24': 'Uniswap V3',
    '0xa238dd80c259a72e81d7e4664a9801593f98d1c5': 'Aave V3 Pool',
    '0xfbb21d0380bee3312b33c4353c8936a0f13ef26c': 'MoonWell',
  };

  const bridges = [
    '0x49048044d57e1c92a77f79988d21fa8faf74e97e',
    '0x3154cf16ccdb4c6d922629664174b904d80f2c35',
  ];

  const uniqueDefiProtocols = new Set();
  transactions.forEach(tx => {
    if (defiProtocols[tx.to?.toLowerCase()]) {
      uniqueDefiProtocols.add(tx.to.toLowerCase());
    }
  });
  const defiScore = Math.min(uniqueDefiProtocols.size * 5, 25);

  const uniqueNftCollections = new Set(
    nftTransactions.map(tx => tx.contractAddress?.toLowerCase()).filter(Boolean)
  );
  const nftScore = Math.min(uniqueNftCollections.size * 2, 20);

  const bridgeTxs = transactions.filter(tx => 
    bridges.includes(tx.to?.toLowerCase())
  );
  const bridgeScore = Math.min(bridgeTxs.length * 3, 15);

  let totalGasEth = 0;
  transactions.forEach(tx => {
    if (tx.gasUsed && tx.gasPrice) {
      try {
        const gasCost = (parseInt(tx.gasUsed) * parseInt(tx.gasPrice)) / 1e18;
        totalGasEth += gasCost;
      } catch (e) {}
    }
  });
  
  let gasScore = 0;
  if (totalGasEth > 0.1) gasScore = 15;
  else if (totalGasEth > 0.05) gasScore = 12;
  else if (totalGasEth > 0.01) gasScore = 8;
  else if (totalGasEth > 0.001) gasScore = 4;

  const receivedTokens = tokenTransactions.filter(tx => 
    tx.to?.toLowerCase() === address.toLowerCase()
  );
  const uniqueTokensReceived = new Set(
    receivedTokens.map(tx => tx.contractAddress?.toLowerCase()).filter(Boolean)
  );
  const airdropScore = Math.min(uniqueTokensReceived.size * 2, 25);

  const totalScore = airdropScore + defiScore + nftScore + bridgeScore + gasScore;

  let rank;
  if (totalScore >= 90) rank = "ULTRA DEGEN 🦍";
  else if (totalScore >= 70) rank = "DEGEN KING 👑";
  else if (totalScore >= 50) rank = "DEGEN PRINCE 🤴";
  else if (totalScore >= 30) rank = "BABY DEGEN 🐣";
  else rank = "NORMIE 🥲";

  console.log(`Score calculated: ${totalScore}/100 - ${rank}`);

  return {
    totalScore,
    rank,
    breakdown: {
      airdrop: airdropScore,
      defi: defiScore,
      nft: nftScore,
      bridge: bridgeScore,
      gas: gasScore
    },
    details: {
      totalTransactions: transactions.length,
      nftCollections: uniqueNftCollections.size,
      defiProtocolsUsed: uniqueDefiProtocols.size,
      bridgeTransactions: bridgeTxs.length,
      totalGasSpent: totalGasEth.toFixed(6),
      tokensReceived: uniqueTokensReceived.size
    }
  };
}

app.get('/health', (req, res) => {
  res.json({ 
    status: 'ok', 
    timestamp: new Date().toISOString(),
    cacheSize: cache.size,
    apiKeyConfigured: !!ETHERSCAN_API_KEY
  });
});

app.get('/', (req, res) => {
  res.json({
    name: 'DeGen Score API',
    version: '1.0.0',
    endpoints: {
      health: '/health',
      analyze: '/api/analyze/:address',
      transactions: '/api/transactions/:address',
      nftTransactions: '/api/nft-transactions/:address',
      tokenTransactions: '/api/token-transactions/:address'
    }
  });
});

setInterval(() => {
  const now = Date.now();
  let deleted = 0;
  for (const [key, value] of cache.entries()) {
    if (now - value.timestamp > CACHE_DURATION) {
      cache.delete(key);
      deleted++;
    }
  }
  if (deleted > 0) {
    console.log(`Cache cleaned: ${deleted} entries removed`);
  }
}, 60000);

app.listen(PORT, () => {
  console.log(`DeGen Score Backend running on port ${PORT}`);
  console.log(`API Key configured: ${ETHERSCAN_API_KEY ? 'Yes' : 'No'}`);
});

process.on('unhandledRejection', (reason) => {
  console.error('Unhandled Rejection:', reason);
});

process.on('uncaughtException', (error) => {
  console.error('Uncaught Exception:', error);
});
