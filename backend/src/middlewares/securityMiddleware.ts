import { Request, Response } from 'express';
import * as deepseekService from '../services/deepseekService';
import * as securityUtils from '../utils/securityUtils';

/**
 * Middleware pour vérifier et filtrer le contenu
 */
export const contentFilter = async (req: Request, res: Response, next: Function) => {
  try {
    // Vérifier si le corps de la requête contient du texte à filtrer
    if (req.body.message) {
      req.body.message = await securityUtils.filterInappropriateContent(req.body.message);
    }
    
    if (req.body.content) {
      req.body.content = await securityUtils.filterInappropriateContent(req.body.content);
    }
    
    next();
  } catch (error) {
    console.error('Erreur lors du filtrage de contenu:', error);
    next();
  }
};

/**
 * Middleware pour limiter le nombre de requêtes
 */
export const rateLimit = (req: Request, res: Response, next: Function) => {
  try {
    const userId = req.body.userId || req.query.userId || 'anonymous';
    const requestType = req.path;
    
    if (!securityUtils.rateLimitRequest(userId, requestType)) {
      return res.status(429).json({
        error: 'Trop de requêtes',
        message: 'Tu as fait trop de demandes en peu de temps. Attends un peu avant d\'essayer à nouveau.'
      });
    }
    
    next();
  } catch (error) {
    console.error('Erreur lors de la limitation de requêtes:', error);
    next();
  }
};

/**
 * Middleware pour vérifier l'API key
 */
export const apiKeyAuth = (req: Request, res: Response, next: Function) => {
  try {
    const apiKey = req.headers['x-api-key'] as string;
    
    if (!apiKey || !securityUtils.isValidApiKey(apiKey)) {
      return res.status(401).json({
        error: 'Clé API invalide',
        message: 'La clé API fournie est invalide ou manquante.'
      });
    }
    
    next();
  } catch (error) {
    console.error('Erreur lors de la vérification de la clé API:', error);
    return res.status(500).json({
      error: 'Erreur serveur',
      message: 'Une erreur est survenue lors de la vérification de l\'authentification.'
    });
  }
};
