import { Request, Response } from 'express';
import * as deepseekService from '../services/deepseekService';
import { config } from '../../config/default';
import path from 'path';
import fs from 'fs';

// Stockage temporaire des dessins (à remplacer par une base de données dans une version production)
const userDrawings: Record<string, Array<{ id: string, title: string, imageData: string, date: Date }>> = {};

/**
 * Sauvegarde un dessin créé par un utilisateur
 */
export const saveDrawing = (req: Request, res: Response) => {
  try {
    const { userId, title, imageData } = req.body;
    
    if (!userId || !imageData) {
      return res.status(400).json({ 
        error: 'Informations manquantes',
        message: 'L\'identifiant utilisateur et les données de l\'image sont requis'
      });
    }
    
    // Vérifier la taille des données de l'image
    if (imageData.length > config.features.creative.maxImageSize) {
      return res.status(400).json({ 
        error: 'Image trop volumineuse',
        message: 'L\'image est trop volumineuse. Veuillez réduire sa taille.'
      });
    }
    
    // Initialiser le tableau des dessins pour cet utilisateur si nécessaire
    if (!userDrawings[userId]) {
      userDrawings[userId] = [];
    }
    
    // Générer un ID unique pour le dessin
    const drawingId = `drawing_${Date.now()}_${Math.floor(Math.random() * 1000)}`;
    
    // Ajouter le nouveau dessin
    const newDrawing = {
      id: drawingId,
      title: title || `Dessin du ${new Date().toLocaleDateString()}`,
      imageData,
      date: new Date()
    };
    
    userDrawings[userId].push(newDrawing);
    
    return res.json({ 
      message: 'Dessin sauvegardé avec succès',
      drawing: {
        id: newDrawing.id,
        title: newDrawing.title,
        date: newDrawing.date
      }
    });
  } catch (error: any) {
    console.error('Erreur lors de la sauvegarde du dessin:', error);
    return res.status(500).json({ 
      error: 'Erreur serveur', 
      message: 'Une erreur est survenue lors de la sauvegarde du dessin.'
    });
  }
};

/**
 * Récupère tous les dessins d'un utilisateur
 */
export const getUserDrawings = (req: Request, res: Response) => {
  const { userId } = req.params;
  
  if (!userId) {
    return res.status(400).json({ error: 'L\'identifiant utilisateur est requis' });
  }
  
  // Récupérer les dessins pour cet utilisateur
  const drawings = userDrawings[userId] || [];
  
  // Retourner seulement les métadonnées des dessins (sans les données d'image complètes)
  const drawingsMetadata = drawings.map(drawing => ({
    id: drawing.id,
    title: drawing.title,
    thumbnailUrl: `/api/creative/drawings/${userId}/${drawing.id}/thumbnail`,
    date: drawing.date
  }));
  
  return res.json({ drawings: drawingsMetadata });
};

/**
 * Génère une histoire basée sur un dessin
 */
export const generateStoryFromDrawing = async (req: Request, res: Response) => {
  try {
    const { userId, drawingId, prompt } = req.body;
    
    if (!userId || !drawingId) {
      return res.status(400).json({ 
        error: 'Informations manquantes',
        message: 'L\'identifiant utilisateur et l\'identifiant du dessin sont requis'
      });
    }
    
    // Vérifier que l'utilisateur et le dessin existent
    if (!userDrawings[userId]) {
      return res.status(404).json({ error: 'Utilisateur non trouvé' });
    }
    
    const drawing = userDrawings[userId].find(d => d.id === drawingId);
    
    if (!drawing) {
      return res.status(404).json({ error: 'Dessin non trouvé' });
    }
    
    // Dans une version de production, nous utiliserions l'API DeepSeek pour générer une histoire
    // basée sur l'image et éventuellement un prompt fourni par l'utilisateur
    
    // Simuler une génération d'histoire pour le développement
    const storyTitle = prompt 
      ? `L'histoire de ${prompt}`
      : `L'aventure du dessin magique`;
    
    const storyContent = prompt
      ? `Il était une fois, dans un monde merveilleux, ${prompt} qui vivait d'incroyables aventures. Un jour, en se promenant dans la forêt enchantée, ${prompt} découvrit un trésor caché sous un arbre centenaire. Ce trésor n'était pas fait d'or ou de pierres précieuses, mais de quelque chose de bien plus précieux : des graines magiques qui, une fois plantées, exauçaient les vœux les plus chers. ${prompt} décida alors de planter ces graines dans son jardin et attendit avec impatience de voir ce qui allait se passer...`
      : `Il était une fois, dans un monde coloré comme ton dessin, un petit personnage qui adorait explorer et découvrir de nouveaux endroits. Un jour, en se promenant dans une forêt aux arbres multicolores, il trouva une clé dorée brillant sous un rayon de soleil. Cette clé, disait-on, ouvrait la porte d'un château magique où tous les rêves devenaient réalité. Notre héros décida de partir à la recherche de ce château, traversant des rivières scintillantes et des montagnes majestueuses. Après un long voyage rempli d'aventures et de rencontres avec des créatures fantastiques, il arriva enfin devant une immense porte ornée de symboles mystérieux...`;
    
    return res.json({ 
      message: 'Histoire générée avec succès',
      story: {
        title: storyTitle,
        content: storyContent,
        basedOn: drawing.title
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
