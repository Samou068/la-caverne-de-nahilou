# Fichier README pour le déploiement de La caverne de Nahilou

Ce fichier ZIP contient tous les éléments nécessaires pour déployer le site web "La caverne de Nahilou", une plateforme éducative et ludique pour les enfants de 7 à 12 ans.

## Structure du projet

```
la-caverne-de-nahilou/
├── frontend/          # Application React
│   ├── public/        # Fichiers statiques
│   ├── src/           # Code source React
│   └── build/         # Version compilée pour production
├── backend/           # Serveur Node.js/Express
│   ├── src/           # Code source TypeScript
│   │   ├── controllers/  # Contrôleurs API
│   │   ├── routes/       # Routes API
│   │   ├── services/     # Services (DeepSeek, etc.)
│   │   └── utils/        # Utilitaires
│   └── config/        # Configuration
├── docs/              # Documentation
│   ├── deployment.md  # Guide de déploiement détaillé
│   ├── test-plan.md   # Plan de tests
│   ├── user-guide.md  # Guide utilisateur
│   └── technical-guide.md # Guide technique
├── docker-compose.yml # Configuration Docker Compose
├── Dockerfile.frontend # Configuration Docker pour le frontend
├── Dockerfile.backend # Configuration Docker pour le backend
└── nginx.conf        # Configuration Nginx
```

## Instructions de déploiement rapide

1. Assurez-vous que Docker et Docker Compose sont installés sur votre serveur
2. Créez un fichier `.env` à la racine avec les variables suivantes:
   ```
   DEEPSEEK_API_KEY=sk-7b61787c1c5f43a5a657d70fe69e2a46
   DEEPSEEK_MODEL=deepseek-chat
   CORS_ORIGIN=https://votre-domaine.com
   ```
3. Exécutez la commande: `docker-compose up -d`
4. Le site sera accessible sur le port 80 (HTTP) et 443 (HTTPS)

## Documentation complète

Pour des instructions détaillées, veuillez consulter les fichiers dans le dossier `docs/`:
- `deployment.md` - Guide complet de déploiement
- `technical-guide.md` - Documentation technique du projet
- `user-guide.md` - Guide d'utilisation pour les utilisateurs finaux

## Accès au site déployé

Une version de démonstration du site est accessible à l'adresse: https://takvjyuk.manus.space

## Support

Pour toute question ou assistance, veuillez contacter:
support@lacaverne-nahilou.com
