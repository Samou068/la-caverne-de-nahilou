import { Request, Response } from 'express';

/**
 * Utilitaire pour la conformité RGPD et l'accessibilité
 */

/**
 * Génère une politique de confidentialité adaptée aux enfants
 */
export const generatePrivacyPolicy = (req: Request, res: Response) => {
  return res.json({
    title: "Politique de confidentialité - La caverne de Nahilou",
    lastUpdated: new Date().toISOString().split('T')[0],
    sections: [
      {
        title: "Qui sommes-nous ?",
        content: "La caverne de Nahilou est un site web éducatif et ludique pour les enfants de 7 à 12 ans. Notre mission est de proposer un environnement sûr et amusant pour apprendre et jouer."
      },
      {
        title: "Quelles informations collectons-nous ?",
        content: "Nous collectons uniquement les informations nécessaires pour faire fonctionner le site : prénom, âge, et les activités réalisées sur le site. Nous ne demandons jamais le nom de famille, l'adresse, le numéro de téléphone ou d'autres informations personnelles sensibles."
      },
      {
        title: "Comment utilisons-nous ces informations ?",
        content: "Nous utilisons ces informations pour personnaliser l'expérience de l'enfant, adapter le contenu à son âge, et permettre aux parents de suivre ses activités. Nous utilisons également ces données pour améliorer notre site."
      },
      {
        title: "Qui a accès à ces informations ?",
        content: "Seuls les parents ou tuteurs légaux ont accès aux informations de leur enfant via le tableau de bord parental. Nous ne partageons jamais ces informations avec des tiers sans votre consentement explicite."
      },
      {
        title: "Combien de temps conservons-nous ces informations ?",
        content: "Nous conservons les informations tant que le compte est actif. Les parents peuvent demander la suppression des données à tout moment via le tableau de bord parental."
      },
      {
        title: "Vos droits",
        content: "Conformément au RGPD, vous avez le droit d'accéder, de rectifier, de supprimer vos données ou de limiter leur traitement. Pour exercer ces droits, contactez-nous via le formulaire de contact."
      },
      {
        title: "Cookies et technologies similaires",
        content: "Nous utilisons des cookies uniquement pour maintenir votre session et vos préférences. Nous n'utilisons pas de cookies à des fins publicitaires ou de suivi."
      },
      {
        title: "Contact",
        content: "Pour toute question concernant notre politique de confidentialité, vous pouvez nous contacter à privacy@lacaverne-nahilou.com"
      }
    ],
    childFriendlyVersion: {
      title: "Comment nous protégeons tes informations",
      content: "Salut ! Chez La caverne de Nahilou, nous prenons soin de tes informations comme un trésor précieux. Nous demandons juste ton prénom et ton âge pour te proposer des jeux et des histoires qui te plairont. Seuls tes parents peuvent voir ce que tu fais sur le site. Nous ne partageons jamais tes informations avec d'autres personnes. Si tu as des questions, demande à tes parents de nous contacter !"
    }
  });
};

/**
 * Génère les conditions d'utilisation adaptées aux enfants
 */
export const generateTermsOfService = (req: Request, res: Response) => {
  return res.json({
    title: "Conditions d'utilisation - La caverne de Nahilou",
    lastUpdated: new Date().toISOString().split('T')[0],
    sections: [
      {
        title: "Bienvenue !",
        content: "Bienvenue sur La caverne de Nahilou ! En utilisant notre site, tu acceptes ces règles qui sont là pour que tout le monde s'amuse bien et en sécurité."
      },
      {
        title: "Qui peut utiliser le site ?",
        content: "La caverne de Nahilou est conçue pour les enfants de 7 à 12 ans. Si tu as moins de 7 ans, demande à un adulte de t'aider."
      },
      {
        title: "Règles de bonne conduite",
        content: "Sois gentil et respectueux envers les autres. N'utilise pas de gros mots ou de messages méchants. Ne partage pas d'informations personnelles comme ton nom de famille, ton adresse ou ton école."
      },
      {
        title: "Contenu du site",
        content: "Tous les jeux, histoires et activités sur le site appartiennent à La caverne de Nahilou. Tu peux les utiliser pour t'amuser, mais pas les copier pour les utiliser ailleurs sans notre permission."
      },
      {
        title: "Rôle des parents",
        content: "Les parents ou tuteurs sont responsables de surveiller l'utilisation du site par leurs enfants. Ils peuvent définir des limites de temps et des permissions via le tableau de bord parental."
      },
      {
        title: "Modifications des conditions",
        content: "Nous pouvons modifier ces conditions à tout moment. Les modifications seront affichées sur cette page."
      }
    ],
    childFriendlyVersion: {
      title: "Les règles du jeu",
      content: "Bienvenue dans La caverne de Nahilou ! Voici quelques règles simples pour que tout le monde s'amuse bien :\n1. Sois gentil avec les autres\n2. Ne partage pas ton nom de famille, ton adresse ou le nom de ton école\n3. Demande la permission à tes parents avant d'utiliser le site\n4. Amuse-toi bien et apprends plein de choses !"
    }
  });
};

/**
 * Génère un formulaire de consentement parental
 */
export const generateParentalConsent = (req: Request, res: Response) => {
  return res.json({
    title: "Formulaire de consentement parental - La caverne de Nahilou",
    sections: [
      {
        title: "Consentement parental",
        content: "En tant que parent ou tuteur légal, je donne mon consentement pour que mon enfant utilise le site La caverne de Nahilou. Je comprends que des informations limitées seront collectées pour personnaliser son expérience, et que je peux accéder, modifier ou supprimer ces informations à tout moment via le tableau de bord parental."
      },
      {
        title: "Informations collectées",
        content: "Je comprends que le site collectera le prénom de mon enfant, son âge, et des informations sur ses activités sur le site (histoires lues, jeux joués, scores obtenus, temps passé)."
      },
      {
        title: "Utilisation de l'IA",
        content: "Je comprends que le site utilise l'intelligence artificielle pour générer du contenu adapté à l'âge de mon enfant, et que ce contenu est filtré pour éliminer tout élément inapproprié."
      },
      {
        title: "Contrôle parental",
        content: "Je comprends que j'ai accès à un tableau de bord parental qui me permet de définir des limites de temps, de voir les activités de mon enfant, et de gérer ses permissions."
      }
    ],
    formFields: [
      {
        id: "parent_name",
        label: "Nom du parent/tuteur",
        type: "text",
        required: true
      },
      {
        id: "parent_email",
        label: "Email du parent/tuteur",
        type: "email",
        required: true
      },
      {
        id: "child_name",
        label: "Prénom de l'enfant",
        type: "text",
        required: true
      },
      {
        id: "child_age",
        label: "Âge de l'enfant",
        type: "number",
        min: 7,
        max: 12,
        required: true
      },
      {
        id: "consent",
        label: "Je donne mon consentement pour que mon enfant utilise La caverne de Nahilou",
        type: "checkbox",
        required: true
      }
    ]
  });
};

/**
 * Vérifie l'accessibilité d'une page
 */
export const checkAccessibility = (html: string): { score: number, issues: any[] } => {
  // Dans une version production, on utiliserait une bibliothèque comme axe-core
  // pour analyser l'accessibilité du HTML
  
  // Pour le développement, on retourne un score fictif
  return {
    score: 95,
    issues: [
      {
        type: "contrast",
        description: "Le contraste entre le texte et l'arrière-plan pourrait être amélioré dans certaines sections",
        severity: "warning"
      }
    ]
  };
};
