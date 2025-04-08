import { Request, Response } from 'express';
import * as deepseekService from '../services/deepseekService';
import { config } from '../../config/default';

/**
 * Utilitaire pour la sécurité et le filtrage de contenu
 */

/**
 * Vérifie si une clé API est valide
 * @param apiKey Clé API à vérifier
 * @returns true si la clé est valide, false sinon
 */
export const isValidApiKey = (apiKey: string): boolean => {
  // Vérifier que la clé API est au bon format (commence par "sk-" et a une longueur suffisante)
  if (!apiKey || !apiKey.startsWith('sk-') || apiKey.length < 20) {
    return false;
  }
  
  // Vérifier que la clé API correspond à celle configurée
  return apiKey === config.deepseek.apiKey;
};

/**
 * Filtre le contenu inapproprié d'un texte
 * @param text Texte à filtrer
 * @returns Texte filtré
 */
export const filterInappropriateContent = async (text: string): Promise<string> => {
  try {
    // Vérifier si le contenu est approprié
    const isAppropriate = await deepseekService.isContentAppropriate(text);
    
    if (isAppropriate) {
      return text;
    } else {
      // Remplacer le contenu inapproprié par un message adapté
      return "Ce contenu n'est pas adapté pour les enfants. Essaie de poser une autre question ou de parler d'un sujet plus amusant !";
    }
  } catch (error) {
    console.error('Erreur lors du filtrage de contenu:', error);
    return text; // En cas d'erreur, retourner le texte original
  }
};

/**
 * Limite le nombre de requêtes par utilisateur
 * @param userId ID de l'utilisateur
 * @param requestType Type de requête
 * @returns true si la requête est autorisée, false sinon
 */
export const rateLimitRequest = (userId: string, requestType: string): boolean => {
  // Implémentation simple de rate limiting (à améliorer avec Redis dans une version production)
  const requestsPerMinute = config.security.maxRequestsPerMinute;
  
  // Dans une version production, on utiliserait un système de cache comme Redis
  // pour stocker et vérifier les limites de requêtes
  
  // Pour le développement, on autorise toutes les requêtes
  return true;
};

/**
 * Middleware pour vérifier l'âge de l'utilisateur et adapter le contenu
 */
export const ageAppropriateContent = (req: Request, res: Response, next: Function) => {
  const { age } = req.query;
  
  if (age && !isNaN(Number(age))) {
    const userAge = Number(age);
    
    // Stocker l'âge dans la requête pour une utilisation ultérieure
    req.body.userAge = userAge;
    
    // Vérifier que l'âge est dans la plage cible
    if (userAge < 7 || userAge > 12) {
      return res.status(400).json({
        error: 'Âge non supporté',
        message: 'Ce contenu est conçu pour les enfants de 7 à 12 ans.'
      });
    }
  }
  
  next();
};
