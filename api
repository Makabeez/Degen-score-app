// api/score.js - Vercel Serverless Function
const { ethers } = require('ethers');

// Initialize provider
const provider = new ethers.providers.JsonRpcProvider(
    process.env.BASE_RPC_URL || 'https://mainnet.base.org'
);

module.exports = async (req, res) => {
    // Enable CORS
    res.setHeader('Access-Control-Allow-Credentials', true);
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

    // Handle preflight
    if (req.method === 'OPTIONS') {
        res.status(200).end();
        return;
    }

    const { address } = req.query;

    console.log('=== ANALYZING WALLET ===');
    console.log('Address:', address);
    console.log('RPC URL:', process.env.BASE_RPC_URL || 'https://mainnet.base.org');

    // Validate address
    if (!address || !ethers.utils.isAddress(address)) {
        return res.status(400).json({ error: 'Invalid wallet address' });
    }

    try {
        // Get wallet data from Base
        const balance = await provider.getBalance(address);
        const txCount = await provider.getTransactionCount(address);
        
        console.log('Balance:', ethers.utils.formatEther(balance));
        console.log('Transaction count:', txCount);

        // Calculate scores
        const scores = calculateScores(address, txCount, balance);
        
        console.log('Calculated scores:', scores);

        return res.status(200).json(scores);

    } catch (error) {
        console.error('Error analyzing wallet:', error);
        return res.status(500).json({ 
            error: 'Failed to analyze wallet',
            details: error.message 
        });
    }
};

// Calculate scores based on on-chain activity
function calculateScores(address, txCount, balance) {
    // Simple scoring algorithm based on activity
    const balanceEth = parseFloat(ethers.utils.formatEther(balance));

    // Calculate individual category scores
    const airdropScore = Math.min(Math.floor(txCount / 20), 25);
    const defiScore = Math.min(Math.floor(txCount / 10), 25);
    const nftScore = Math.min(Math.floor(balanceEth * 10), 20);
    const bridgeScore = Math.min(Math.floor(txCount / 30), 15);
    const gasScore = Math.min(Math.floor(txCount / 40), 15);

    const totalScore = airdropScore + defiScore + nftScore + bridgeScore + gasScore;

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
