import { Request, Response } from 'express';
import * as deepseekService from '../services/deepseekService';
import { config } from '../../config/default';

// Stockage temporaire des historiques de conversation (à remplacer par une base de données dans une version production)
const conversationHistories: Record<string, Array<{ role: string, content: string }>> = {};

/**
 * Envoie un message au chatbot et obtient une réponse
 */
export const sendMessage = async (req: Request, res: Response) => {
  try {
    const { message, userId } = req.body;
    
    if (!message) {
      return res.status(400).json({ error: 'Le message est requis' });
    }
    
    if (!userId) {
      return res.status(400).json({ error: 'L\'identifiant utilisateur est requis' });
    }
    
    // Initialiser l'historique s'il n'existe pas
    if (!conversationHistories[userId]) {
      conversationHistories[userId] = [];
    }
    
    // Vérifier si le message est approprié pour les enfants
    const isAppropriate = await isContentAppropriate(message);
    if (!isAppropriate) {
      return res.status(403).json({ 
        error: 'Message inapproprié',
        message: 'Ce message n\'est pas adapté pour les enfants. Essaie de poser une autre question !'
      });
    }
    
    // Ajouter le message de l'utilisateur à l'historique
    conversationHistories[userId].push({ role: 'user', content: message });
    
    // Limiter la taille de l'historique
    if (conversationHistories[userId].length > config.features.chatbot.maxHistoryLength * 2) {
      // Garder le premier message (instructions) et les derniers messages
      conversationHistories[userId] = [
        conversationHistories[userId][0],
        ...conversationHistories[userId].slice(-config.features.chatbot.maxHistoryLength * 2 + 1)
      ];
    }
    
    // Obtenir une réponse du service DeepSeek
    const response = await deepseekService.getChatResponse(conversationHistories[userId]);
    
    // Ajouter la réponse à l'historique
    conversationHistories[userId].push({ role: 'assistant', content: response });
    
    return res.json({ message: response });
  } catch (error: any) {
    console.error('Erreur lors de l\'envoi du message au chatbot:', error);
    return res.status(500).json({ 
      error: 'Erreur serveur', 
      message: 'Une erreur est survenue lors de la communication avec le chatbot.'
    });
  }
};

/**
 * Récupère l'historique des conversations pour un utilisateur
 */
export const getHistory = (req: Request, res: Response) => {
  const { userId } = req.params;
  
  if (!userId) {
    return res.status(400).json({ error: 'L\'identifiant utilisateur est requis' });
  }
  
  const history = conversationHistories[userId] || [];
  
  return res.json({ history });
};

/**
 * Efface l'historique des conversations pour un utilisateur
 */
export const clearHistory = (req: Request, res: Response) => {
  const { userId } = req.params;
  
  if (!userId) {
    return res.status(400).json({ error: 'L\'identifiant utilisateur est requis' });
  }
  
  // Réinitialiser l'historique
  conversationHistories[userId] = [];
  
  return res.json({ message: 'Historique effacé avec succès' });
};

/**
 * Vérifie si le contenu est approprié pour les enfants
 * Cette fonction sera améliorée avec l'API DeepSeek pour un filtrage plus sophistiqué
 */
const isContentAppropriate = async (content: string): Promise<boolean> => {
  // Liste simple de mots inappropriés (à remplacer par une solution plus robuste)
  const inappropriateWords = [
    'sexe', 'violence', 'drogue', 'alcool', 'cigarette', 'mort', 'tuer',
    'arme', 'fusil', 'pistolet', 'couteau', 'sang', 'horreur', 'peur',
    'insulte', 'gros mot', 'juron'
  ];
  
  const contentLower = content.toLowerCase();
  
  // Vérifier si le contenu contient des mots inappropriés
  for (const word of inappropriateWords) {
    if (contentLower.includes(word)) {
      return false;
    }
  }
  
  // Dans une version plus avancée, on utiliserait l'API DeepSeek pour une analyse plus sophistiquée
  
  return true;
};
