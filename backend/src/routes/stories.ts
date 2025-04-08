import { Router } from 'express';
import * as storiesController from '../controllers/storiesController';

const router = Router();

// Route pour obtenir toutes les histoires
router.get('/', storiesController.getAllStories);

// Route pour obtenir une histoire spécifique
router.get('/:id', storiesController.getStoryById);

// Route pour générer une nouvelle histoire
router.post('/generate', storiesController.generateStory);

// Route pour sauvegarder les choix d'un utilisateur dans une histoire
router.post('/:id/choice', storiesController.saveStoryChoice);

export default router;
