import { Router } from 'express';
import * as quizController from '../controllers/quizController';

const router = Router();

// Route pour obtenir tous les quiz disponibles
router.get('/', quizController.getAllQuizzes);

// Route pour obtenir un quiz spécifique
router.get('/:id', quizController.getQuizById);

// Route pour générer un nouveau quiz
router.post('/generate', quizController.generateQuiz);

// Route pour soumettre les réponses d'un utilisateur
router.post('/:id/submit', quizController.submitQuizAnswers);

export default router;
