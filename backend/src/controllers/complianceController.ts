import { Request, Response } from 'express';
import * as complianceUtils from '../utils/complianceUtils';

/**
 * Contrôleur pour la conformité RGPD et l'accessibilité
 */

/**
 * Récupère la politique de confidentialité
 */
export const getPrivacyPolicy = (req: Request, res: Response) => {
  try {
    return complianceUtils.generatePrivacyPolicy(req, res);
  } catch (error) {
    console.error('Erreur lors de la récupération de la politique de confidentialité:', error);
    return res.status(500).json({
      error: 'Erreur serveur',
      message: 'Une erreur est survenue lors de la récupération de la politique de confidentialité.'
    });
  }
};

/**
 * Récupère les conditions d'utilisation
 */
export const getTermsOfService = (req: Request, res: Response) => {
  try {
    return complianceUtils.generateTermsOfService(req, res);
  } catch (error) {
    console.error('Erreur lors de la récupération des conditions d\'utilisation:', error);
    return res.status(500).json({
      error: 'Erreur serveur',
      message: 'Une erreur est survenue lors de la récupération des conditions d\'utilisation.'
    });
  }
};

/**
 * Récupère le formulaire de consentement parental
 */
export const getParentalConsent = (req: Request, res: Response) => {
  try {
    return complianceUtils.generateParentalConsent(req, res);
  } catch (error) {
    console.error('Erreur lors de la récupération du formulaire de consentement parental:', error);
    return res.status(500).json({
      error: 'Erreur serveur',
      message: 'Une erreur est survenue lors de la récupération du formulaire de consentement parental.'
    });
  }
};

/**
 * Soumet le consentement parental
 */
export const submitParentalConsent = (req: Request, res: Response) => {
  try {
    const { parent_name, parent_email, child_name, child_age, consent } = req.body;
    
    if (!parent_name || !parent_email || !child_name || !child_age || !consent) {
      return res.status(400).json({
        error: 'Informations manquantes',
        message: 'Tous les champs du formulaire sont requis.'
      });
    }
    
    // Vérifier que l'âge est dans la plage cible
    if (child_age < 7 || child_age > 12) {
      return res.status(400).json({
        error: 'Âge non supporté',
        message: 'Ce site est conçu pour les enfants de 7 à 12 ans.'
      });
    }
    
    // Dans une version production, on sauvegarderait ces informations dans une base de données
    
    return res.json({
      message: 'Consentement parental enregistré avec succès',
      childId: `child_${Date.now()}`, // Générer un ID unique pour l'enfant
      parentId: `parent_${Date.now()}` // Générer un ID unique pour le parent
    });
  } catch (error) {
    console.error('Erreur lors de la soumission du consentement parental:', error);
    return res.status(500).json({
      error: 'Erreur serveur',
      message: 'Une erreur est survenue lors de la soumission du consentement parental.'
    });
  }
};

/**
 * Vérifie l'accessibilité d'une page
 */
export const checkPageAccessibility = (req: Request, res: Response) => {
  try {
    const { html } = req.body;
    
    if (!html) {
      return res.status(400).json({
        error: 'Contenu HTML manquant',
        message: 'Le contenu HTML à vérifier est requis.'
      });
    }
    
    const accessibilityResult = complianceUtils.checkAccessibility(html);
    
    return res.json({
      score: accessibilityResult.score,
      issues: accessibilityResult.issues,
      recommendations: [
        "Utiliser des textes suffisamment grands (minimum 16px)",
        "Assurer un contraste élevé entre le texte et l'arrière-plan",
        "Fournir des alternatives textuelles pour les images",
        "Utiliser des boutons suffisamment grands pour les interactions tactiles",
        "Structurer le contenu avec des titres hiérarchiques appropriés"
      ]
    });
  } catch (error) {
    console.error('Erreur lors de la vérification de l\'accessibilité:', error);
    return res.status(500).json({
      error: 'Erreur serveur',
      message: 'Une erreur est survenue lors de la vérification de l\'accessibilité.'
    });
  }
};
