import { Request, Response } from 'express';

// Stockage temporaire des données parentales (à remplacer par une base de données dans une version production)
const childrenData: Record<string, {
  name: string;
  age: number;
  timeSpent: Record<string, number>; // en minutes par jour
  timeLimits: Record<string, number>; // en minutes par jour
  permissions: Record<string, boolean>;
  activityHistory: Array<{
    date: Date;
    activity: string;
    duration: number;
    category: string;
  }>;
}> = {
  'child1': {
    name: 'Emma',
    age: 8,
    timeSpent: {
      'games': 45,
      'stories': 30,
      'creative': 20,
      'quiz': 15,
      'chatbot': 10
    },
    timeLimits: {
      'games': 60,
      'stories': 60,
      'creative': 60,
      'quiz': 60,
      'chatbot': 30,
      'total': 120
    },
    permissions: {
      'games': true,
      'stories': true,
      'creative': true,
      'quiz': true,
      'chatbot': true
    },
    activityHistory: [
      {
        date: new Date('2025-04-06T14:30:00'),
        activity: 'Puzzle des nombres',
        duration: 15,
        category: 'games'
      },
      {
        date: new Date('2025-04-06T15:00:00'),
        activity: 'La forêt enchantée',
        duration: 20,
        category: 'stories'
      },
      {
        date: new Date('2025-04-06T16:00:00'),
        activity: 'Dessin',
        duration: 25,
        category: 'creative'
      }
    ]
  },
  'child2': {
    name: 'Lucas',
    age: 10,
    timeSpent: {
      'games': 60,
      'stories': 15,
      'creative': 10,
      'quiz': 30,
      'chatbot': 5
    },
    timeLimits: {
      'games': 45,
      'stories': 60,
      'creative': 60,
      'quiz': 60,
      'chatbot': 30,
      'total': 120
    },
    permissions: {
      'games': true,
      'stories': true,
      'creative': true,
      'quiz': true,
      'chatbot': true
    },
    activityHistory: [
      {
        date: new Date('2025-04-06T13:00:00'),
        activity: 'Mémoire des animaux',
        duration: 30,
        category: 'games'
      },
      {
        date: new Date('2025-04-06T14:00:00'),
        activity: 'Quiz sur l\'espace',
        duration: 20,
        category: 'quiz'
      },
      {
        date: new Date('2025-04-06T15:30:00'),
        activity: 'Labyrinthe magique',
        duration: 25,
        category: 'games'
      }
    ]
  }
};

/**
 * Récupère les statistiques d'utilisation d'un enfant
 */
export const getChildStats = (req: Request, res: Response) => {
  const { childId } = req.params;
  
  if (!childId) {
    return res.status(400).json({ error: 'L\'identifiant de l\'enfant est requis' });
  }
  
  const childData = childrenData[childId];
  
  if (!childData) {
    return res.status(404).json({ error: 'Enfant non trouvé' });
  }
  
  // Calculer le temps total passé
  const totalTimeSpent = Object.values(childData.timeSpent).reduce((sum, time) => sum + time, 0);
  
  // Calculer le pourcentage d'utilisation par rapport aux limites
  const usagePercentage: Record<string, number> = {};
  for (const [category, time] of Object.entries(childData.timeSpent)) {
    const limit = childData.timeLimits[category] || 0;
    usagePercentage[category] = limit > 0 ? Math.round((time / limit) * 100) : 0;
  }
  
  return res.json({
    child: {
      id: childId,
      name: childData.name,
      age: childData.age
    },
    stats: {
      timeSpent: childData.timeSpent,
      totalTimeSpent,
      timeLimits: childData.timeLimits,
      usagePercentage
    },
    permissions: childData.permissions
  });
};

/**
 * Définit des limites de temps pour un enfant
 */
export const setTimeLimit = (req: Request, res: Response) => {
  const { childId } = req.params;
  const { category, limit } = req.body;
  
  if (!childId) {
    return res.status(400).json({ error: 'L\'identifiant de l\'enfant est requis' });
  }
  
  if (!category || limit === undefined || isNaN(Number(limit)) || Number(limit) < 0) {
    return res.status(400).json({ 
      error: 'Informations invalides',
      message: 'La catégorie et une limite de temps valide (en minutes) sont requises'
    });
  }
  
  const childData = childrenData[childId];
  
  if (!childData) {
    return res.status(404).json({ error: 'Enfant non trouvé' });
  }
  
  // Mettre à jour la limite de temps
  childData.timeLimits[category] = Number(limit);
  
  return res.json({ 
    message: 'Limite de temps mise à jour avec succès',
    category,
    limit: Number(limit)
  });
};

/**
 * Récupère l'historique d'activité d'un enfant
 */
export const getActivityHistory = (req: Request, res: Response) => {
  const { childId } = req.params;
  const { startDate, endDate } = req.query;
  
  if (!childId) {
    return res.status(400).json({ error: 'L\'identifiant de l\'enfant est requis' });
  }
  
  const childData = childrenData[childId];
  
  if (!childData) {
    return res.status(404).json({ error: 'Enfant non trouvé' });
  }
  
  let filteredHistory = [...childData.activityHistory];
  
  // Filtrer par date si spécifié
  if (startDate && !isNaN(Date.parse(startDate as string))) {
    const start = new Date(startDate as string);
    filteredHistory = filteredHistory.filter(activity => activity.date >= start);
  }
  
  if (endDate && !isNaN(Date.parse(endDate as string))) {
    const end = new Date(endDate as string);
    filteredHistory = filteredHistory.filter(activity => activity.date <= end);
  }
  
  // Trier par date (du plus récent au plus ancien)
  filteredHistory.sort((a, b) => b.date.getTime() - a.date.getTime());
  
  return res.json({
    child: {
      id: childId,
      name: childData.name
    },
    activityHistory: filteredHistory
  });
};

/**
 * Gère les permissions d'accès aux fonctionnalités
 */
export const setPermissions = (req: Request, res: Response) => {
  const { childId } = req.params;
  const { permissions } = req.body;
  
  if (!childId) {
    return res.status(400).json({ error: 'L\'identifiant de l\'enfant est requis' });
  }
  
  if (!permissions || typeof permissions !== 'object') {
    return res.status(400).json({ 
      error: 'Informations invalides',
      message: 'Les permissions doivent être fournies sous forme d\'objet'
    });
  }
  
  const childData = childrenData[childId];
  
  if (!childData) {
    return res.status(404).json({ error: 'Enfant non trouvé' });
  }
  
  // Mettre à jour les permissions
  for (const [category, allowed] of Object.entries(permissions)) {
    if (typeof allowed === 'boolean') {
      childData.permissions[category] = allowed;
    }
  }
  
  return res.json({ 
    message: 'Permissions mises à jour avec succès',
    permissions: childData.permissions
  });
};
