const express = require('express');
const cors = require('cors');
const { ethers } = require('ethers');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3001;

// Middleware
app.use(cors({
    origin: [
        'http://localhost:3000',
        'https://degen-score-app.vercel.app'
    ]
}));
app.use(express.json());

// Initialize Base provider
const provider = new ethers.providers.JsonRpcProvider(
    process.env.BASE_RPC_URL || 'https://mainnet.base.org'
);

// Health check
app.get('/health', (req, res) => {
    res.json({ status: 'ok', timestamp: new Date().toISOString() });
});

// Main scoring endpoint
app.get('/api/score', async (req, res) => {
    const { address } = req.query;

    console.log('=== ANALYZING WALLET ===');
    console.log('Address:', address);
    console.log('RPC URL:', process.env.BASE_RPC_URL || 'https://mainnet.base.org');

    // Validate address
    if (!address || !ethers.utils.isAddress(address)) {
        return res.status(400).json({ error: 'Invalid wallet address' });
    }

    try {
        // Get wallet data
        const balance = await provider.getBalance(address);
        const txCount = await provider.getTransactionCount(address);
        
        console.log('Balance:', ethers.utils.formatEther(balance));
        console.log('Transaction count:', txCount);

        // Calculate scores
        const scores = await calculateScores(address, txCount, balance);
        
        console.log('Calculated scores:', scores);

        res.json(scores);

    } catch (error) {
        console.error('Error analyzing wallet:', error);
        res.status(500).json({ 
            error: 'Failed to analyze wallet',
            details: error.message 
        });
    }
});

// Calculate scores based on on-chain activity
async function calculateScores(address, txCount, balance) {
    // Simple scoring algorithm
    // You should replace this with your actual scoring logic

    // Transaction-based scoring
    const txScore = Math.min(txCount / 10, 25); // Max 25 points

    // Balance-based scoring  
    const balanceEth = parseFloat(ethers.utils.formatEther(balance));
    const balanceScore = Math.min(balanceEth * 5, 20); // Max 20 points

    // Calculate individual category scores
    const airdropScore = Math.floor(Math.min(txCount / 20, 25));
    const defiScore = Math.floor(Math.min(txScore, 25));
    const nftScore = Math.floor(Math.min(balanceScore, 20));
    const bridgeScore = Math.floor(Math.min(txCount / 30, 15));
    const gasScore = Math.floor(Math.min(txCount / 40, 15));

    const totalScore = Math.floor(
        airdropScore + defiScore + nftScore + bridgeScore + gasScore
    );

    return {
        address,
        totalScore,
        airdropScore,
        defiScore,
        nftScore,
        bridgeScore,
        gasScore,
        txCount,
        balance: ethers.utils.formatEther(balance),
        timestamp: new Date().toISOString()
    };
}

// Advanced scoring (example - you'll need to implement based on your needs)
async function getAdvancedScores(address) {
    // TODO: Implement detailed scoring:
    // - Check interactions with specific DeFi protocols
    // - Check NFT transfers
    // - Check bridge transactions
    // - Check historical gas spent
    // - Check airdrop eligibility
    
    // For now, return basic data
    return {
        defiProtocols: [],
        nftActivity: [],
        bridgeTransactions: [],
        totalGasSpent: '0'
    };
}

// Start server
app.listen(PORT, () => {
    console.log(`🚀 Server running on port ${PORT}`);
    console.log(`📡 RPC: ${process.env.BASE_RPC_URL || 'https://mainnet.base.org'}`);
});

module.exports = app;
