import { Request, Response } from 'express';
import * as deepseekService from '../services/deepseekService';

// Stockage temporaire des quiz (à remplacer par une base de données dans une version production)
const quizzes: Record<string, any> = {
  '1': {
    id: '1',
    title: 'Quiz sur les animaux',
    category: 'Nature',
    difficulty: 'facile',
    questions: [
      {
        id: '1',
        question: 'Quel animal est le plus grand du monde ?',
        options: ['Éléphant', 'Girafe', 'Baleine bleue', 'Dinosaure'],
        correctAnswer: 2
      },
      {
        id: '2',
        question: 'Combien de pattes a une araignée ?',
        options: ['4', '6', '8', '10'],
        correctAnswer: 2
      },
      {
        id: '3',
        question: 'Quel animal peut voler ?',
        options: ['Pingouin', 'Autruche', 'Chauve-souris', 'Poisson'],
        correctAnswer: 2
      }
    ]
  },
  '2': {
    id: '2',
    title: 'Quiz sur l\'espace',
    category: 'Sciences',
    difficulty: 'moyen',
    questions: [
      {
        id: '1',
        question: 'Quelle est la planète la plus proche du Soleil ?',
        options: ['Vénus', 'Terre', 'Mars', 'Mercure'],
        correctAnswer: 3
      },
      {
        id: '2',
        question: 'Combien de planètes y a-t-il dans notre système solaire ?',
        options: ['7', '8', '9', '10'],
        correctAnswer: 1
      },
      {
        id: '3',
        question: 'Comment s\'appelle notre galaxie ?',
        options: ['Andromède', 'Voie Lactée', 'Grande Ourse', 'Petite Ourse'],
        correctAnswer: 1
      }
    ]
  }
};

/**
 * Récupère tous les quiz disponibles
 */
export const getAllQuizzes = (req: Request, res: Response) => {
  // Retourner seulement les informations de base des quiz (sans les questions)
  const quizzesList = Object.values(quizzes).map(quiz => ({
    id: quiz.id,
    title: quiz.title,
    category: quiz.category,
    difficulty: quiz.difficulty,
    questionCount: quiz.questions.length
  }));
  
  return res.json({ quizzes: quizzesList });
};

/**
 * Récupère un quiz spécifique par son ID
 */
export const getQuizById = (req: Request, res: Response) => {
  const { id } = req.params;
  
  if (!id) {
    return res.status(400).json({ error: 'L\'identifiant du quiz est requis' });
  }
  
  const quiz = quizzes[id];
  
  if (!quiz) {
    return res.status(404).json({ error: 'Quiz non trouvé' });
  }
  
  return res.json({ quiz });
};

/**
 * Génère un nouveau quiz basé sur les préférences de l'utilisateur
 */
export const generateQuiz = async (req: Request, res: Response) => {
  try {
    const { category, difficulty, questionCount } = req.body;
    
    if (!category || !difficulty || !questionCount) {
      return res.status(400).json({ 
        error: 'Informations manquantes',
        message: 'La catégorie, la difficulté et le nombre de questions sont requis pour générer un quiz'
      });
    }
    
    // Vérifier que le nombre de questions est valide
    if (questionCount < 1 || questionCount > 10) {
      return res.status(400).json({ 
        error: 'Nombre de questions invalide',
        message: 'Le nombre de questions doit être compris entre 1 et 10'
      });
    }
    
    // Dans une version de production, nous utiliserions l'API DeepSeek pour générer un quiz
    // Pour le développement, nous retournons un quiz prédéfini
    
    const newQuizId = String(Object.keys(quizzes).length + 1);
    
    const newQuiz = {
      id: newQuizId,
      title: `Quiz sur ${category}`,
      category,
      difficulty,
      questions: [
        {
          id: '1',
          question: `Première question sur ${category} (${difficulty})`,
          options: ['Option A', 'Option B', 'Option C', 'Option D'],
          correctAnswer: 0
        },
        {
          id: '2',
          question: `Deuxième question sur ${category} (${difficulty})`,
          options: ['Option A', 'Option B', 'Option C', 'Option D'],
          correctAnswer: 1
        },
        {
          id: '3',
          question: `Troisième question sur ${category} (${difficulty})`,
          options: ['Option A', 'Option B', 'Option C', 'Option D'],
          correctAnswer: 2
        }
      ].slice(0, questionCount)
    };
    
    // Ajouter le nouveau quiz à notre "base de données"
    quizzes[newQuizId] = newQuiz;
    
    return res.json({ 
      message: 'Quiz généré avec succès',
      quiz: {
        id: newQuiz.id,
        title: newQuiz.title,
        category: newQuiz.category,
        difficulty: newQuiz.difficulty,
        questionCount: newQuiz.questions.length
      }
    });
  } catch (error: any) {
    console.error('Erreur lors de la génération du quiz:', error);
    return res.status(500).json({ 
      error: 'Erreur serveur', 
      message: 'Une erreur est survenue lors de la génération du quiz.'
    });
  }
};

/**
 * Soumet les réponses d'un utilisateur à un quiz et calcule le score
 */
export const submitQuizAnswers = (req: Request, res: Response) => {
  const { id } = req.params;
  const { userId, answers } = req.body;
  
  if (!id || !userId || !answers || !Array.isArray(answers)) {
    return res.status(400).json({ 
      error: 'Informations manquantes',
      message: 'L\'identifiant du quiz, de l\'utilisateur et les réponses sont requis'
    });
  }
  
  const quiz = quizzes[id];
  
  if (!quiz) {
    return res.status(404).json({ error: 'Quiz non trouvé' });
  }
  
  // Vérifier que le nombre de réponses correspond au nombre de questions
  if (answers.length !== quiz.questions.length) {
    return res.status(400).json({ 
      error: 'Nombre de réponses invalide',
      message: 'Le nombre de réponses doit correspondre au nombre de questions'
    });
  }
  
  // Calculer le score
  let score = 0;
  const results = quiz.questions.map((question: any, index: number) => {
    const isCorrect = answers[index] === question.correctAnswer;
    if (isCorrect) {
      score++;
    }
    return {
      questionId: question.id,
      userAnswer: answers[index],
      correctAnswer: question.correctAnswer,
      isCorrect
    };
  });
  
  // Calculer le pourcentage
  const percentage = Math.round((score / quiz.questions.length) * 100);
  
  // Dans une version de production, nous sauvegarderions le résultat dans une base de données
  
  return res.json({ 
    message: 'Réponses soumises avec succès',
    score,
    total: quiz.questions.length,
    percentage,
    results
  });
};
