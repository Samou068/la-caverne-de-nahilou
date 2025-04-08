import { Router } from 'express';
import * as parentalController from '../controllers/parentalController';

const router = Router();

// Route pour obtenir les statistiques d'utilisation d'un enfant
router.get('/stats/:childId', parentalController.getChildStats);

// Route pour définir des limites de temps pour un enfant
router.post('/limits/:childId', parentalController.setTimeLimit);

// Route pour obtenir l'historique d'activité d'un enfant
router.get('/activity/:childId', parentalController.getActivityHistory);

// Route pour gérer les permissions d'accès aux fonctionnalités
router.post('/permissions/:childId', parentalController.setPermissions);

export default router;
