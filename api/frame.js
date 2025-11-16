// api/frame.js - Farcaster Frame endpoint
const { ethers } = require('ethers');

// Initialize provider
const provider = new ethers.providers.JsonRpcProvider(
    process.env.BASE_RPC_URL || 'https://mainnet.base.org'
);

module.exports = async (req, res) => {
    // Enable CORS
    res.setHeader('Access-Control-Allow-Credentials', true);
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'POST,OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

    if (req.method === 'OPTIONS') {
        res.status(200).end();
        return;
    }

    try {
        const body = req.body;
        
        // Handle different button actions
        if (body.untrustedData?.buttonIndex === 1) {
            // Button 1: Check Score
            const fid = body.untrustedData.fid;
            const address = body.untrustedData.address || body.untrustedData.inputText;
            
            if (!address || !ethers.utils.isAddress(address)) {
                return res.status(200).send(generateErrorFrame());
            }

            // Get score
            const balance = await provider.getBalance(address);
            const txCount = await provider.getTransactionCount(address);
            const scores = calculateScores(address, txCount, balance);
            
            return res.status(200).send(generateScoreFrame(scores));
        } 
        else if (body.untrustedData?.buttonIndex === 2) {
            // Button 2: Share
            return res.status(200).send(generateShareFrame());
        }
        else if (body.untrustedData?.buttonIndex === 3) {
            // Button 3: Mint NFT
            return res.status(200).send(generateMintFrame());
        }
        else {
            // Initial frame
            return res.status(200).send(generateInitialFrame());
        }

    } catch (error) {
        console.error('Frame error:', error);
        return res.status(200).send(generateErrorFrame());
    }
};

function calculateScores(address, txCount, balance) {
    const balanceEth = parseFloat(ethers.utils.formatEther(balance));
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
        rank: getRank(totalScore)
    };
}

function getRank(score) {
    if (score >= 81) return 'ULTRA DEGEN 🦍';
    if (score >= 61) return 'DEGEN KING 👑';
    if (score >= 41) return 'DEGEN 🎯';
    if (score >= 21) return 'CASUAL 👀';
    return 'NORMIE 🥲';
}

function generateInitialFrame() {
    return `
<!DOCTYPE html>
<html>
<head>
    <meta property="fc:frame" content="vNext" />
    <meta property="fc:frame:image" content="https://degen-score-app.vercel.app/frame-initial.png" />
    <meta property="fc:frame:button:1" content="Check My Score" />
    <meta property="fc:frame:button:1:action" content="post" />
    <meta property="fc:frame:input:text" content="Enter your wallet address" />
    <meta property="fc:frame:post_url" content="https://degen-score-app.vercel.app/api/frame" />
    <meta property="og:image" content="https://degen-score-app.vercel.app/app_icon.png" />
</head>
<body>
    <h1>DeGen Score</h1>
    <p>Check your on-chain reputation on Base!</p>
</body>
</html>`;
}

function generateScoreFrame(scores) {
    const imageUrl = `https://degen-score-app.vercel.app/api/frame-image?score=${scores.totalScore}&rank=${encodeURIComponent(scores.rank)}`;
    
    return `
<!DOCTYPE html>
<html>
<head>
    <meta property="fc:frame" content="vNext" />
    <meta property="fc:frame:image" content="${imageUrl}" />
    <meta property="fc:frame:button:1" content="Share Result" />
    <meta property="fc:frame:button:1:action" content="link" />
    <meta property="fc:frame:button:1:target" content="https://warpcast.com/~/compose?text=I%20got%20${scores.totalScore}%2F100%20on%20DeGen%20Score!%20Check%20yours%3A%20https%3A%2F%2Fdegen-score-app.vercel.app" />
    <meta property="fc:frame:button:2" content="Mint NFT (0.00015 ETH)" />
    <meta property="fc:frame:button:2:action" content="link" />
    <meta property="fc:frame:button:2:target" content="https://degen-score-app.vercel.app" />
    <meta property="fc:frame:button:3" content="Check Another" />
    <meta property="fc:frame:button:3:action" content="post" />
    <meta property="fc:frame:post_url" content="https://degen-score-app.vercel.app/api/frame" />
</head>
<body>
    <h1>Your Score: ${scores.totalScore}/100</h1>
    <h2>${scores.rank}</h2>
</body>
</html>`;
}

function generateErrorFrame() {
    return `
<!DOCTYPE html>
<html>
<head>
    <meta property="fc:frame" content="vNext" />
    <meta property="fc:frame:image" content="https://degen-score-app.vercel.app/frame-error.png" />
    <meta property="fc:frame:button:1" content="Try Again" />
    <meta property="fc:frame:button:1:action" content="post" />
    <meta property="fc:frame:post_url" content="https://degen-score-app.vercel.app/api/frame" />
</head>
<body>
    <h1>Error</h1>
    <p>Invalid wallet address. Please try again.</p>
</body>
</html>`;
}

function generateShareFrame() {
    return generateInitialFrame();
}

function generateMintFrame() {
    return generateInitialFrame();
}
