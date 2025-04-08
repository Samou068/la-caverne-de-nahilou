import { Router } from 'express';
import * as creativeController from '../controllers/creativeController';

const router = Router();

// Route pour sauvegarder un dessin
router.post('/drawing', creativeController.saveDrawing);

// Route pour obtenir tous les dessins d'un utilisateur
router.get('/drawings/:userId', creativeController.getUserDrawings);

// Route pour générer une histoire basée sur un dessin
router.post('/generate-story', creativeController.generateStoryFromDrawing);

export default router;
