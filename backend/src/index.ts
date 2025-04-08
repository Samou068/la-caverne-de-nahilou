import dotenv from 'dotenv';
import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import morgan from 'morgan';
import { config } from '../config/default';
import chatbotRoutes from './routes/chatbot';
import storiesRoutes from './routes/stories';
import quizRoutes from './routes/quiz';
import gamesRoutes from './routes/games';
import creativeRoutes from './routes/creative';
import parentalRoutes from './routes/parental';

// Charger les variables d'environnement
dotenv.config();

// Initialiser l'application Express
const app = express();
const PORT = process.env.PORT || 5000;

// Middlewares
app.use(cors());
app.use(helmet());
app.use(morgan('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Routes
app.use('/api/chatbot', chatbotRoutes);
app.use('/api/stories', storiesRoutes);
app.use('/api/quiz', quizRoutes);
app.use('/api/games', gamesRoutes);
app.use('/api/creative', creativeRoutes);
app.use('/api/parental', parentalRoutes);

// Route de base
app.get('/', (req, res) => {
  res.json({
    message: 'Bienvenue sur l\'API de La caverne de Nahilou',
    version: config.version,
    status: 'online'
  });
});

// Gestion des erreurs
app.use((err: any, req: express.Request, res: express.Response, next: express.NextFunction) => {
  console.error(err.stack);
  res.status(500).json({
    error: 'Une erreur est survenue sur le serveur',
    message: process.env.NODE_ENV === 'development' ? err.message : 'Erreur interne'
  });
});

// Démarrer le serveur
app.listen(PORT, () => {
  console.log(`Serveur démarré sur le port ${PORT} en mode ${process.env.NODE_ENV}`);
  console.log(`API disponible à l'adresse: http://localhost:${PORT}`);
});

export default app;
