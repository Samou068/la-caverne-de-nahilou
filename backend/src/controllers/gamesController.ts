import { Request, Response } from 'express';

// Stockage temporaire des mini-jeux (à remplacer par une base de données dans une version production)
const games: Record<string, any> = {
  '1': {
    id: '1',
    title: 'Puzzle des nombres',
    description: 'Apprends à compter en t\'amusant avec ce puzzle coloré !',
    difficulty: 'facile',
    type: 'puzzle',
    imageUrl: '/assets/games/number-puzzle.png',
    instructions: 'Place les nombres dans le bon ordre pour compléter le puzzle.',
    minAge: 7,
    maxAge: 9
  },
  '2': {
    id: '2',
    title: 'Mémoire des animaux',
    description: 'Retrouve les paires d\'animaux et améliore ta mémoire !',
    difficulty: 'moyen',
    type: 'memory',
    imageUrl: '/assets/games/animal-memory.png',
    instructions: 'Retourne les cartes deux par deux pour trouver les paires d\'animaux identiques.',
    minAge: 7,
    maxAge: 12
  },
  '3': {
    id: '3',
    title: 'Labyrinthe magique',
    description: 'Trouve ton chemin à travers ce labyrinthe enchanté !',
    difficulty: 'difficile',
    type: 'maze',
    imageUrl: '/assets/games/magic-maze.png',
    instructions: 'Guide le personnage à travers le labyrinthe en évitant les obstacles.',
    minAge: 9,
    maxAge: 12
  }
};

// Stockage temporaire des scores (à remplacer par une base de données dans une version production)
const gameScores: Record<string, Array<{ userId: string, username: string, score: number, date: Date }>> = {
  '1': [
    { userId: 'user1', username: 'Emma', score: 95, date: new Date('2025-04-01') },
    { userId: 'user2', username: 'Lucas', score: 87, date: new Date('2025-04-02') },
    { userId: 'user3', username: 'Léa', score: 92, date: new Date('2025-04-03') }
  ],
  '2': [
    { userId: 'user2', username: 'Lucas', score: 78, date: new Date('2025-04-01') },
    { userId: 'user1', username: 'Emma', score: 85, date: new Date('2025-04-02') },
    { userId: 'user4', username: 'Noah', score: 90, date: new Date('2025-04-03') }
  ],
  '3': [
    { userId: 'user3', username: 'Léa', score: 65, date: new Date('2025-04-01') },
    { userId: 'user4', username: 'Noah', score: 72, date: new Date('2025-04-02') },
    { userId: 'user2', username: 'Lucas', score: 68, date: new Date('2025-04-03') }
  ]
};

/**
 * Récupère tous les mini-jeux disponibles
 */
export const getAllGames = (req: Request, res: Response) => {
  // Filtrer par âge si spécifié
  const { age } = req.query;
  
  let gamesList = Object.values(games);
  
  if (age && !isNaN(Number(age))) {
    const userAge = Number(age);
    gamesList = gamesList.filter(game => userAge >= game.minAge && userAge <= game.maxAge);
  }
  
  return res.json({ games: gamesList });
};

/**
 * Récupère un mini-jeu spécifique par son ID
 */
export const getGameById = (req: Request, res: Response) => {
  const { id } = req.params;
  
  if (!id) {
    return res.status(400).json({ error: 'L\'identifiant du jeu est requis' });
  }
  
  const game = games[id];
  
  if (!game) {
    return res.status(404).json({ error: 'Jeu non trouvé' });
  }
  
  return res.json({ game });
};

/**
 * Sauvegarde le score d'un utilisateur pour un mini-jeu
 */
export const saveGameScore = (req: Request, res: Response) => {
  const { id } = req.params;
  const { userId, username, score } = req.body;
  
  if (!id || !userId || !username || score === undefined) {
    return res.status(400).json({ 
      error: 'Informations manquantes',
      message: 'L\'identifiant du jeu, de l\'utilisateur, le nom d\'utilisateur et le score sont requis'
    });
  }
  
  const game = games[id];
  
  if (!game) {
    return res.status(404).json({ error: 'Jeu non trouvé' });
  }
  
  // Vérifier que le score est valide
  if (isNaN(Number(score)) || Number(score) < 0) {
    return res.status(400).json({ 
      error: 'Score invalide',
      message: 'Le score doit être un nombre positif'
    });
  }
  
  // Initialiser le tableau des scores si nécessaire
  if (!gameScores[id]) {
    gameScores[id] = [];
  }
  
  // Ajouter le nouveau score
  const newScore = {
    userId,
    username,
    score: Number(score),
    date: new Date()
  };
  
  gameScores[id].push(newScore);
  
  // Trier les scores par ordre décroissant
  gameScores[id].sort((a, b) => b.score - a.score);
  
  return res.json({ 
    message: 'Score sauvegardé avec succès',
    rank: gameScores[id].findIndex(s => s.userId === userId && s.date === newScore.date) + 1
  });
};

/**
 * Récupère le classement d'un mini-jeu
 */
export const getGameLeaderboard = (req: Request, res: Response) => {
  const { id } = req.params;
  const { limit } = req.query;
  
  if (!id) {
    return res.status(400).json({ error: 'L\'identifiant du jeu est requis' });
  }
  
  const game = games[id];
  
  if (!game) {
    return res.status(404).json({ error: 'Jeu non trouvé' });
  }
  
  // Récupérer les scores pour ce jeu
  const scores = gameScores[id] || [];
  
  // Limiter le nombre de scores si spécifié
  let limitedScores = scores;
  if (limit && !isNaN(Number(limit))) {
    limitedScores = scores.slice(0, Number(limit));
  }
  
  return res.json({ 
    game: {
      id: game.id,
      title: game.title
    },
    leaderboard: limitedScores.map((score, index) => ({
      rank: index + 1,
      username: score.username,
      score: score.score,
      date: score.date
    }))
  });
};
