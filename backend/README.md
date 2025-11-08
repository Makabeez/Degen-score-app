# 🚀 DeGen Score Backend API

Backend sécurisé pour l'application DeGen Score. Analyse l'activité on-chain des wallets sur Base Network.

## 🌐 URL de Production

```
https://degen-score-backend.onrender.com
```

## 📡 Endpoints Disponibles

### 1. Health Check
```bash
GET /health
```
Vérifie que le serveur fonctionne.

**Réponse :**
```json
{
  "status": "ok",
  "timestamp": "2025-11-08T...",
  "cacheSize": 0,
  "apiKeyConfigured": true
}
```

### 2. Analyse Complète (Recommandé)
```bash
GET /api/analyze/:address
```

**Exemple :**
```bash
curl https://degen-score-backend.onrender.com/api/analyze/0x742d35Cc6634C0532925a3b844Bc9e7595f0bEb
```

**Réponse :**
```json
{
  "totalScore": 76,
  "rank": "DEGEN KING 👑",
  "breakdown": {
    "airdrop": 18,
    "defi": 20,
    "nft": 15,
    "bridge": 12,
    "gas": 11
  },
  "details": {
    "totalTransactions": 84,
    "nftCollections": 7,
    "defiProtocolsUsed": 4,
    "bridgeTransactions": 4,
    "totalGasSpent": "0.043210",
    "tokensReceived": 9
  },
  "cached": false
}
```

### 3. Transactions Normales
```bash
GET /api/transactions/:address
```

### 4. Transactions NFT
```bash
GET /api/nft-transactions/:address
```

### 5. Transactions ERC-20
```bash
GET /api/token-transactions/:address
```

## 🏗️ Architecture

```
Frontend (React)
    ↓
Backend API (Node.js + Express)
    ↓ Etherscan API Key (sécurisée)
Etherscan API V2
    ↓
Base Network
```

## 🔒 Sécurité

- ✅ Clé API Etherscan cachée côté serveur
- ✅ CORS activé pour tous les domaines
- ✅ Cache en mémoire (5 minutes)
- ✅ Rate limiting naturel via cache
- ✅ Gestion d'erreurs complète

## 📊 Système de Cache

Le backend utilise un cache en mémoire pour optimiser les performances :

- **Durée :** 5 minutes
- **Nettoyage :** Automatique toutes les minutes
- **Avantage :** Réduit les appels API et améliore la vitesse

## 🎯 Méthode de Scoring

### Score Total : /100 points

| Catégorie | Points Max | Calcul |
|-----------|-----------|---------|
| 🎯 Airdrop Hunting | 25 | 2 pts par token reçu |
| 🔧 DeFi Usage | 25 | 5 pts par protocole utilisé |
| 🎨 NFT Activity | 20 | 2 pts par collection |
| 🌉 Bridge Usage | 15 | 3 pts par transaction bridge |
| ⛽ Gas Spent | 15 | Basé sur ETH dépensé |

### Rangs

- **90-100 :** ULTRA DEGEN 🦍
- **70-89 :** DEGEN KING 👑
- **50-69 :** DEGEN PRINCE 🤴
- **30-49 :** BABY DEGEN 🐣
- **0-29 :** NORMIE 🥲

## 🛠️ Technologies Utilisées

- **Node.js** 18+
- **Express** 4.18
- **node-fetch** 3.3 (pour appels API)
- **CORS** (Cross-Origin Resource Sharing)

## 📈 Performance

- **Temps de réponse :** 1-3 secondes (première analyse)
- **Temps de réponse :** <500ms (avec cache)
- **Uptime :** 99.9% (Render)

## 🌍 Variables d'Environnement

| Variable | Description | Requis |
|----------|-------------|--------|
| `ETHERSCAN_API_KEY` | Clé API Etherscan | ✅ Oui |
| `PORT` | Port du serveur | Non (auto par Render) |

## 🔄 Déploiement

Le backend est déployé sur **Render** avec auto-déploiement activé.

Chaque push sur la branche `main` déclenche un nouveau déploiement automatique.

## 📝 Logs

Les logs incluent :
- Requêtes d'analyse avec adresse wallet
- Résultats de score calculés
- Erreurs API
- Opérations de cache

## 🐛 Troubleshooting

### Service s'endort après inactivité
**Problème :** Render gratuit met le service en veille après 15 min.
**Solution :** La première requête réveille le service (30-60s).

### Erreur 500 - Internal Server Error
**Vérifier :**
1. La clé API Etherscan est valide
2. Les logs Render pour voir l'erreur exacte
3. L'adresse wallet est valide (format 0x...)

### Réponses lentes
**Cause possible :**
- Service en veille (premier appel)
- Pas de cache disponible
- API Etherscan lente

## 📞 Support

Pour tout problème :
1. Vérifiez `/health` pour voir si le serveur est up
2. Consultez les logs Render
3. Testez l'endpoint depuis Postman/curl

## 🚀 Améliorations Futures

- [ ] Base de données PostgreSQL pour cache persistant
- [ ] Rate limiting par IP
- [ ] Authentification API key pour le frontend
- [ ] WebSocket pour updates temps réel
- [ ] Monitoring avec Sentry
- [ ] Tests unitaires et d'intégration

---

**Version :** 1.0.0  
**Dernière mise à jour :** Novembre 2025  
**Licence :** MIT
