import { Router } from 'express';
import * as gamesController from '../controllers/gamesController';

const router = Router();

// Route pour obtenir tous les mini-jeux disponibles
router.get('/', gamesController.getAllGames);

// Route pour obtenir un mini-jeu spécifique
router.get('/:id', gamesController.getGameById);

// Route pour sauvegarder le score d'un utilisateur
router.post('/:id/score', gamesController.saveGameScore);

// Route pour obtenir le classement d'un mini-jeu
router.get('/:id/leaderboard', gamesController.getGameLeaderboard);

export default router;
