# Configuration de déploiement pour La caverne de Nahilou

## Structure des fichiers pour le déploiement

```
la-caverne-de-nahilou/
├── frontend/          # Code source React
│   ├── build/         # Fichiers statiques compilés pour la production
│   └── ...
├── backend/           # Code source Node.js/Express
│   ├── dist/          # Code TypeScript compilé
│   └── ...
├── .env               # Variables d'environnement (ne pas inclure dans le dépôt)
├── docker-compose.yml # Configuration Docker pour le déploiement
├── Dockerfile.frontend # Configuration Docker pour le frontend
├── Dockerfile.backend # Configuration Docker pour le backend
└── nginx.conf        # Configuration Nginx pour servir l'application
```

## Variables d'environnement requises

```
# Général
NODE_ENV=production
PORT=5000

# API DeepSeek
DEEPSEEK_API_KEY=sk-7b61787c1c5f43a5a657d70fe69e2a46
DEEPSEEK_MODEL=deepseek-chat

# Sécurité
CORS_ORIGIN=https://lacaverne-nahilou.com
RATE_LIMIT_MAX=60
CONTENT_FILTER_ENABLED=true
```

## Étapes de déploiement

1. Compiler le frontend React
   ```
   cd frontend
   npm run build
   ```

2. Compiler le backend TypeScript
   ```
   cd backend
   npm run build
   ```

3. Configurer les variables d'environnement
   - Créer un fichier .env à la racine du projet
   - Ajouter les variables d'environnement requises

4. Déployer avec Docker Compose
   ```
   docker-compose up -d
   ```

5. Ou déployer sur un service d'hébergement comme Vercel/Netlify (frontend) et Heroku/DigitalOcean (backend)

## Vérifications post-déploiement

- Vérifier que toutes les pages sont accessibles
- Tester le chatbot avec l'API DeepSeek
- Vérifier que les mini-jeux fonctionnent correctement
- Tester les histoires interactives
- Vérifier que l'espace créatif fonctionne
- Tester les quiz
- Vérifier le tableau de bord parental
