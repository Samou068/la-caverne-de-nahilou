# Guide technique - La caverne de Nahilou

## Architecture du projet

La caverne de Nahilou est une application web moderne construite avec une architecture client-serveur :

- **Frontend** : Application React.js avec TypeScript, Tailwind CSS et Framer Motion
- **Backend** : API RESTful développée avec Node.js/Express.js et TypeScript
- **IA** : Intégration de l'API DeepSeek pour les fonctionnalités d'intelligence artificielle

## Structure des répertoires

```
la-caverne-de-nahilou/
├── frontend/                # Application React
│   ├── public/              # Fichiers statiques
│   ├── src/                 # Code source
│   │   ├── components/      # Composants React
│   │   ├── App.tsx          # Composant principal
│   │   └── ...
│   ├── package.json         # Dépendances
│   └── ...
├── backend/                 # Serveur Node.js/Express
│   ├── src/                 # Code source
│   │   ├── controllers/     # Contrôleurs
│   │   ├── routes/          # Routes API
│   │   ├── services/        # Services
│   │   ├── utils/           # Utilitaires
│   │   └── index.ts         # Point d'entrée
│   ├── package.json         # Dépendances
│   └── ...
├── docs/                    # Documentation
│   ├── deployment.md        # Guide de déploiement
│   ├── test-plan.md         # Plan de tests
│   └── user-guide.md        # Guide utilisateur
├── docker-compose.yml       # Configuration Docker
├── Dockerfile.frontend      # Docker pour le frontend
├── Dockerfile.backend       # Docker pour le backend
└── nginx.conf               # Configuration Nginx
```

## Technologies utilisées

### Frontend
- **React.js** : Bibliothèque JavaScript pour construire l'interface utilisateur
- **TypeScript** : Superset de JavaScript avec typage statique
- **Tailwind CSS** : Framework CSS utilitaire pour le style
- **Framer Motion** : Bibliothèque d'animations pour React
- **Axios** : Client HTTP pour les requêtes API

### Backend
- **Node.js** : Environnement d'exécution JavaScript côté serveur
- **Express.js** : Framework web pour Node.js
- **TypeScript** : Superset de JavaScript avec typage statique
- **Cors** : Middleware pour gérer le partage de ressources entre origines
- **Helmet** : Middleware pour sécuriser les en-têtes HTTP
- **Morgan** : Middleware de journalisation HTTP

### Intégration IA
- **API DeepSeek** : Service d'IA pour le chatbot, la génération d'histoires et l'analyse de contenu
- **Modèle deepseek-chat** : Modèle de langage utilisé pour les fonctionnalités d'IA

### Déploiement
- **Docker** : Plateforme de conteneurisation
- **Docker Compose** : Outil pour définir et exécuter des applications multi-conteneurs
- **Nginx** : Serveur web et proxy inverse

## Fonctionnalités techniques

### Animations avancées
- Effets parallaxe réactifs au défilement et au mouvement de la souris
- Transitions fluides entre les pages
- Effets de particules et de lumière pour une immersion visuelle
- Animations réactives sur les éléments interactifs

### Intégration de l'IA
- Chatbot intelligent avec filtrage de contenu
- Génération d'histoires interactives personnalisées
- Création de quiz adaptés au niveau de l'enfant
- Analyse des dessins pour générer des histoires correspondantes

### Sécurité
- Filtrage automatique du contenu inapproprié
- Stockage sécurisé des clés API
- Limitation du nombre de requêtes
- En-têtes HTTP sécurisés
- Conformité RGPD avec consentement parental

### Contrôle parental
- Tableau de bord avec statistiques d'utilisation
- Limites de temps configurables
- Gestion des permissions d'accès
- Historique des activités

## API Backend

### Endpoints principaux

#### Chatbot
- `POST /api/chatbot/message` : Envoyer un message au chatbot
- `GET /api/chatbot/history/:userId` : Obtenir l'historique des conversations
- `DELETE /api/chatbot/history/:userId` : Effacer l'historique des conversations

#### Histoires
- `GET /api/stories` : Obtenir toutes les histoires disponibles
- `GET /api/stories/:id` : Obtenir une histoire spécifique
- `POST /api/stories/generate` : Générer une nouvelle histoire
- `POST /api/stories/:id/choice` : Sauvegarder un choix dans une histoire

#### Mini-jeux
- `GET /api/games` : Obtenir tous les mini-jeux disponibles
- `GET /api/games/:id` : Obtenir un mini-jeu spécifique
- `POST /api/games/:id/score` : Sauvegarder un score
- `GET /api/games/:id/leaderboard` : Obtenir le classement d'un mini-jeu

#### Quiz
- `GET /api/quiz` : Obtenir tous les quiz disponibles
- `GET /api/quiz/:id` : Obtenir un quiz spécifique
- `POST /api/quiz/generate` : Générer un nouveau quiz
- `POST /api/quiz/:id/submit` : Soumettre les réponses d'un quiz

#### Espace créatif
- `POST /api/creative/drawing` : Sauvegarder un dessin
- `GET /api/creative/drawings/:userId` : Obtenir les dessins d'un utilisateur
- `POST /api/creative/generate-story` : Générer une histoire basée sur un dessin

#### Contrôle parental
- `GET /api/parental/stats/:childId` : Obtenir les statistiques d'un enfant
- `POST /api/parental/limits/:childId` : Définir des limites de temps
- `GET /api/parental/activity/:childId` : Obtenir l'historique d'activité
- `POST /api/parental/permissions/:childId` : Gérer les permissions

#### Conformité
- `GET /api/compliance/privacy-policy` : Obtenir la politique de confidentialité
- `GET /api/compliance/terms-of-service` : Obtenir les conditions d'utilisation
- `GET /api/compliance/parental-consent` : Obtenir le formulaire de consentement
- `POST /api/compliance/parental-consent` : Soumettre le consentement parental

## Maintenance et évolution

### Maintenance
- Mettre à jour régulièrement les dépendances
- Surveiller les journaux d'erreurs
- Effectuer des sauvegardes régulières
- Vérifier les performances du serveur

### Évolutions possibles
- Ajout de nouveaux mini-jeux et histoires
- Intégration de fonctionnalités multijoueurs
- Développement d'une application mobile
- Ajout de contenu éducatif supplémentaire
- Amélioration des algorithmes d'IA pour personnaliser davantage l'expérience

## Résolution des problèmes courants

### Problèmes de connexion à l'API DeepSeek
- Vérifier que la clé API est valide et correctement configurée
- S'assurer que les quotas d'utilisation ne sont pas dépassés
- Vérifier la connectivité réseau

### Problèmes de performance
- Optimiser les animations côté client
- Mettre en cache les réponses API fréquemment utilisées
- Surveiller l'utilisation des ressources serveur

### Problèmes d'affichage
- Vérifier la compatibilité des navigateurs
- Tester sur différentes tailles d'écran
- Valider le CSS pour les problèmes de mise en page
