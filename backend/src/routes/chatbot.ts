import { Router } from 'express';
import * as chatbotController from '../controllers/chatbotController';

const router = Router();

// Route pour envoyer un message au chatbot
router.post('/message', chatbotController.sendMessage);

// Route pour obtenir l'historique des conversations
router.get('/history/:userId', chatbotController.getHistory);

// Route pour effacer l'historique des conversations
router.delete('/history/:userId', chatbotController.clearHistory);

export default router;
