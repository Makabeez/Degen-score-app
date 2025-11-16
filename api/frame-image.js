// api/frame-image.js - Generate dynamic Frame images
module.exports = async (req, res) => {
    const { score = '0', rank = 'NORMIE 🥲' } = req.query;

    // Set headers for PNG image
    res.setHeader('Content-Type', 'image/png');
    res.setHeader('Cache-Control', 'public, max-age=3600');

    // Generate SVG that will be converted to PNG
    const svg = `
    <svg width="1200" height="630" xmlns="http://www.w3.org/2000/svg">
        <defs>
            <linearGradient id="bg" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" style="stop-color:#667eea;stop-opacity:1" />
                <stop offset="100%" style="stop-color:#764ba2;stop-opacity:1" />
            </linearGradient>
            <linearGradient id="header" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" style="stop-color:#ff6b6b;stop-opacity:1" />
                <stop offset="100%" style="stop-color:#ee5a6f;stop-opacity:1" />
            </linearGradient>
        </defs>
        
        <!-- Background -->
        <rect width="1200" height="630" fill="url(#bg)"/>
        
        <!-- Header -->
        <rect x="100" y="60" width="1000" height="120" rx="20" fill="url(#header)"/>
        <text x="600" y="110" font-family="Arial, sans-serif" font-size="48" font-weight="bold" fill="white" text-anchor="middle">
            ⚔️ DeGen Score
        </text>
        <text x="600" y="150" font-family="Arial, sans-serif" font-size="24" fill="rgba(255,255,255,0.9)" text-anchor="middle">
            Real On-Chain Analysis + NFT
        </text>
        
        <!-- Score Circle -->
        <circle cx="600" cy="360" r="120" fill="rgba(255,255,255,0.2)" stroke="rgba(255,255,255,0.4)" stroke-width="8"/>
        <text x="600" y="380" font-family="Arial, sans-serif" font-size="80" font-weight="bold" fill="white" text-anchor="middle">
            ${score}
        </text>
        <text x="600" y="410" font-family="Arial, sans-serif" font-size="20" fill="rgba(255,255,255,0.9)" text-anchor="middle">
            DEGEN SCORE
        </text>
        
        <!-- Rank -->
        <text x="600" y="530" font-family="Arial, sans-serif" font-size="36" font-weight="bold" fill="white" text-anchor="middle">
            ${rank}
        </text>
    </svg>`;

    // For simplicity, return SVG (browsers support it in og:image)
    // In production, you'd use a library like 'sharp' to convert to PNG
    res.setHeader('Content-Type', 'image/svg+xml');
    res.status(200).send(svg);
};
