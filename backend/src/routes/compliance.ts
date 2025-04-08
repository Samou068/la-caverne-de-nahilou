import { Router } from 'express';
import * as complianceController from '../controllers/complianceController';

const router = Router();

// Route pour obtenir la politique de confidentialité
router.get('/privacy-policy', complianceController.getPrivacyPolicy);

// Route pour obtenir les conditions d'utilisation
router.get('/terms-of-service', complianceController.getTermsOfService);

// Route pour obtenir le formulaire de consentement parental
router.get('/parental-consent', complianceController.getParentalConsent);

// Route pour soumettre le consentement parental
router.post('/parental-consent', complianceController.submitParentalConsent);

// Route pour vérifier l'accessibilité d'une page
router.post('/check-accessibility', complianceController.checkPageAccessibility);

export default router;
