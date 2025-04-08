import { Request, Response } from 'express';
import * as deepseekService from '../services/deepseekService';

// Stockage temporaire des histoires (à remplacer par une base de données dans une version production)
const stories: Record<string, any> = {
  '1': {
    id: '1',
    title: 'La forêt enchantée',
    preview: 'Découvre les secrets d\'une forêt magique où les arbres parlent et les animaux ont des pouvoirs...',
    tags: ['Aventure', 'Magie', 'Nature'],
    content: 'Il était une fois, au cœur d\'une forêt ancienne, un enfant nommé Léo qui adorait explorer la nature...',
    choices: [
      {
        id: 'choice1',
        text: 'Léo décide de suivre le renard argenté',
        nextSegment: 'segment2'
      },
      {
        id: 'choice2',
        text: 'Léo préfère grimper dans l\'arbre parlant',
        nextSegment: 'segment3'
      }
    ],
    segments: {
      'segment2': {
        content: 'Le renard argenté guide Léo à travers des sentiers cachés, jusqu\'à une clairière illuminée par des lucioles géantes...',
        choices: [
          {
            id: 'choice3',
            text: 'Léo s\'approche des lucioles',
            nextSegment: 'segment4'
          },
          {
            id: 'choice4',
            text: 'Léo cherche à communiquer avec le renard',
            nextSegment: 'segment5'
          }
        ]
      },
      'segment3': {
        content: 'En grimpant dans l\'arbre parlant, Léo découvre un passage secret dans le tronc qui mène à une cité suspendue...',
        choices: [
          {
            id: 'choice5',
            text: 'Léo explore la cité suspendue',
            nextSegment: 'segment6'
          },
          {
            id: 'choice6',
            text: 'Léo redescend et cherche un autre chemin',
            nextSegment: 'segment7'
          }
        ]
      }
    }
  },
  '2': {
    id: '2',
    title: 'Le trésor du pirate',
    preview: 'Pars à la recherche d\'un trésor caché par le célèbre pirate Barbe-Rouge...',
    tags: ['Pirates', 'Aventure', 'Océan'],
    content: 'Sur une île lointaine, une carte au trésor vient d\'être découverte par Emma, une jeune aventurière intrépide...',
    choices: [
      {
        id: 'choice1',
        text: 'Emma décide de suivre le chemin de la plage',
        nextSegment: 'segment2'
      },
      {
        id: 'choice2',
        text: 'Emma préfère traverser la jungle dense',
        nextSegment: 'segment3'
      }
    ],
    segments: {
      'segment2': {
        content: 'En suivant la plage, Emma découvre une grotte cachée derrière un rocher en forme de crâne...',
        choices: [
          {
            id: 'choice3',
            text: 'Emma entre dans la grotte mystérieuse',
            nextSegment: 'segment4'
          },
          {
            id: 'choice4',
            text: 'Emma continue le long de la plage',
            nextSegment: 'segment5'
          }
        ]
      },
      'segment3': {
        content: 'La jungle est dense et pleine de bruits étranges. Emma trouve des traces de pas qui semblent récentes...',
        choices: [
          {
            id: 'choice5',
            text: 'Emma suit les traces de pas',
            nextSegment: 'segment6'
          },
          {
            id: 'choice6',
            text: 'Emma grimpe à un arbre pour avoir une meilleure vue',
            nextSegment: 'segment7'
          }
        ]
      }
    }
  }
};

/**
 * Récupère toutes les histoires disponibles
 */
export const getAllStories = (req: Request, res: Response) => {
  // Retourner seulement les informations de base des histoires (sans le contenu complet)
  const storiesList = Object.values(stories).map(story => ({
    id: story.id,
    title: story.title,
    preview: story.preview,
    tags: story.tags
  }));
  
  return res.json({ stories: storiesList });
};

/**
 * Récupère une histoire spécifique par son ID
 */
export const getStoryById = (req: Request, res: Response) => {
  const { id } = req.params;
  
  if (!id) {
    return res.status(400).json({ error: 'L\'identifiant de l\'histoire est requis' });
  }
  
  const story = stories[id];
  
  if (!story) {
    return res.status(404).json({ error: 'Histoire non trouvée' });
  }
  
  return res.json({ story });
};

/**
 * Génère une nouvelle histoire interactive basée sur les préférences de l'utilisateur
 */
export const generateStory = async (req: Request, res: Response) => {
  try {
    const { theme, protagonist, setting } = req.body;
    
    if (!theme || !protagonist || !setting) {
      return res.status(400).json({ 
        error: 'Informations manquantes',
        message: 'Le thème, le protagoniste et le cadre sont requis pour générer une histoire'
      });
    }
    
    // Dans une version de production, nous utiliserions l'API DeepSeek pour générer une histoire
    // Pour le développement, nous retournons une histoire prédéfinie
    
    const newStoryId = String(Object.keys(stories).length + 1);
    
    const newStory = {
      id: newStoryId,
      title: `L'aventure de ${protagonist} dans ${setting}`,
      preview: `Une histoire passionnante sur le thème de ${theme}, avec ${protagonist} dans un univers de ${setting}...`,
      tags: [theme, setting],
      content: `Il était une fois, dans un monde de ${setting}, un héros nommé ${protagonist} qui partait à l'aventure...`,
      choices: [
        {
          id: 'choice1',
          text: `${protagonist} décide d'explorer la mystérieuse caverne`,
          nextSegment: 'segment2'
        },
        {
          id: 'choice2',
          text: `${protagonist} préfère suivre le sentier lumineux`,
          nextSegment: 'segment3'
        }
      ],
      segments: {
        'segment2': {
          content: `En entrant dans la caverne, ${protagonist} découvre des cristaux brillants qui illuminent les parois...`,
          choices: [
            {
              id: 'choice3',
              text: `${protagonist} touche l'un des cristaux`,
              nextSegment: 'segment4'
            },
            {
              id: 'choice4',
              text: `${protagonist} continue plus profondément dans la caverne`,
              nextSegment: 'segment5'
            }
          ]
        },
        'segment3': {
          content: `Le sentier lumineux mène ${protagonist} à une clairière magique où des créatures fantastiques dansent...`,
          choices: [
            {
              id: 'choice5',
              text: `${protagonist} se joint à la danse`,
              nextSegment: 'segment6'
            },
            {
              id: 'choice6',
              text: `${protagonist} observe discrètement depuis les buissons`,
              nextSegment: 'segment7'
            }
          ]
        }
      }
    };
    
    // Ajouter la nouvelle histoire à notre "base de données"
    stories[newStoryId] = newStory;
    
    return res.json({ 
      message: 'Histoire générée avec succès',
      story: {
        id: newStory.id,
        title: newStory.title,
        preview: newStory.preview,
        tags: newStory.tags
      }
    });
  } catch (error: any) {
    console.error('Erreur lors de la génération de l\'histoire:', error);
    return res.status(500).json({ 
      error: 'Erreur serveur', 
      message: 'Une erreur est survenue lors de la génération de l\'histoire.'
    });
  }
};

/**
 * Sauvegarde le choix d'un utilisateur dans une histoire interactive
 */
export const saveStoryChoice = (req: Request, res: Response) => {
  const { id } = req.params;
  const { userId, choiceId } = req.body;
  
  if (!id || !userId || !choiceId) {
    return res.status(400).json({ 
      error: 'Informations manquantes',
      message: 'L\'identifiant de l\'histoire, de l\'utilisateur et du choix sont requis'
    });
  }
  
  const story = stories[id];
  
  if (!story) {
    return res.status(404).json({ error: 'Histoire non trouvée' });
  }
  
  // Dans une version de production, nous sauvegarderions le choix dans une base de données
  // Pour le développement, nous simulons simplement une réponse réussie
  
  return res.json({ 
    message: 'Choix sauvegardé avec succès',
    nextSegment: 'segment2' // Simulé pour le développement
  });
};
