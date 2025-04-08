import axios from 'axios';
import { config } from '../../config/default';

/**
 * Service pour interagir avec l'API DeepSeek
 */

// URL de l'API DeepSeek
const DEEPSEEK_API_URL = 'https://api.deepseek.com/v1/chat/completions';

// Clé API DeepSeek
const DEEPSEEK_API_KEY = process.env.DEEPSEEK_API_KEY || config.deepseek.apiKey;

// Modèle DeepSeek à utiliser
const DEEPSEEK_MODEL = process.env.DEEPSEEK_MODEL || config.deepseek.model;

/**
 * Obtient une réponse du chatbot DeepSeek
 * @param messages Historique des messages
 * @returns Réponse du chatbot
 */
export const getChatResponse = async (messages: Array<{ role: string, content: string }>): Promise<string> => {
  try {
    // Ajouter un message système pour guider le modèle à répondre de manière adaptée aux enfants
    const systemMessage = {
      role: 'system',
      content: `Tu es un assistant amical nommé Nahilou qui s'adresse à des enfants de 7 à 12 ans. 
      Utilise un langage simple et adapté à leur âge. 
      Sois encourageant, positif et bienveillant. 
      Évite tout contenu inapproprié ou effrayant.
      Réponds de manière éducative et ludique.
      Limite tes réponses à 3-4 phrases courtes.
      N'hésite pas à utiliser des émojis adaptés pour rendre tes réponses plus vivantes.`
    };

    // Préparer les messages pour l'API DeepSeek
    const apiMessages = [systemMessage, ...messages];

    // Appel à l'API DeepSeek
    try {
      const response = await axios.post(
        DEEPSEEK_API_URL,
        {
          model: DEEPSEEK_MODEL,
          messages: apiMessages,
          max_tokens: config.security.maxTokensPerRequest,
          temperature: 0.7,
        },
        {
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${DEEPSEEK_API_KEY}`
          }
        }
      );

      return response.data.choices[0].message.content;
    } catch (apiError) {
      console.error('Erreur API DeepSeek:', apiError);
      
      // En cas d'erreur avec l'API, utiliser la simulation de réponse
      return getSimulatedResponse(messages);
    }
  } catch (error) {
    console.error('Erreur lors de la communication avec DeepSeek:', error);
    throw new Error('Erreur lors de la communication avec le service de chatbot');
  }
};

/**
 * Génère une histoire interactive basée sur les préférences de l'utilisateur
 * @param theme Thème de l'histoire
 * @param protagonist Protagoniste de l'histoire
 * @param setting Cadre de l'histoire
 * @returns Histoire générée
 */
export const generateStory = async (theme: string, protagonist: string, setting: string): Promise<any> => {
  try {
    const prompt = `Génère une histoire interactive pour enfants de 7 à 12 ans avec les éléments suivants:
    - Thème: ${theme}
    - Protagoniste: ${protagonist}
    - Cadre: ${setting}
    
    L'histoire doit être structurée avec:
    1. Un titre accrocheur
    2. Une introduction qui présente le personnage et le cadre
    3. Deux choix possibles pour continuer l'histoire
    4. Pour chaque choix, une suite d'histoire avec deux nouveaux choix
    
    Utilise un langage simple, adapté aux enfants. L'histoire doit être positive, éducative et sans contenu inapproprié.
    
    Réponds au format JSON avec la structure suivante:
    {
      "title": "Titre de l'histoire",
      "preview": "Court résumé de l'histoire",
      "tags": ["tag1", "tag2", "tag3"],
      "content": "Introduction de l'histoire...",
      "choices": [
        {
          "id": "choice1",
          "text": "Premier choix",
          "nextSegment": "segment2"
        },
        {
          "id": "choice2",
          "text": "Deuxième choix",
          "nextSegment": "segment3"
        }
      ],
      "segments": {
        "segment2": {
          "content": "Suite de l'histoire après le premier choix...",
          "choices": [...]
        },
        "segment3": {
          "content": "Suite de l'histoire après le deuxième choix...",
          "choices": [...]
        }
      }
    }`;

    try {
      const response = await axios.post(
        DEEPSEEK_API_URL,
        {
          model: DEEPSEEK_MODEL,
          messages: [
            {
              role: 'system',
              content: 'Tu es un générateur d\'histoires interactives pour enfants. Tu réponds uniquement au format JSON.'
            },
            {
              role: 'user',
              content: prompt
            }
          ],
          max_tokens: 2000,
          temperature: 0.8,
        },
        {
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${DEEPSEEK_API_KEY}`
          }
        }
      );

      // Extraire et parser le JSON de la réponse
      const content = response.data.choices[0].message.content;
      const jsonMatch = content.match(/```json\n([\s\S]*)\n```/) || content.match(/({[\s\S]*})/);
      
      if (jsonMatch && jsonMatch[1]) {
        return JSON.parse(jsonMatch[1]);
      } else {
        try {
          return JSON.parse(content);
        } catch (parseError) {
          console.error('Erreur de parsing JSON:', parseError);
          return getSimulatedStory(theme, protagonist, setting);
        }
      }
    } catch (apiError) {
      console.error('Erreur API DeepSeek pour la génération d\'histoire:', apiError);
      return getSimulatedStory(theme, protagonist, setting);
    }
  } catch (error) {
    console.error('Erreur lors de la génération d\'histoire:', error);
    throw new Error('Erreur lors de la génération d\'histoire');
  }
};

/**
 * Génère un quiz basé sur les préférences de l'utilisateur
 * @param category Catégorie du quiz
 * @param difficulty Difficulté du quiz
 * @param questionCount Nombre de questions
 * @returns Quiz généré
 */
export const generateQuiz = async (category: string, difficulty: string, questionCount: number): Promise<any> => {
  try {
    const prompt = `Génère un quiz éducatif pour enfants de 7 à 12 ans avec les paramètres suivants:
    - Catégorie: ${category}
    - Difficulté: ${difficulty}
    - Nombre de questions: ${questionCount}
    
    Chaque question doit avoir 4 options de réponse, dont une seule est correcte.
    Les questions doivent être adaptées à l'âge des enfants et être éducatives.
    
    Réponds au format JSON avec la structure suivante:
    {
      "title": "Titre du quiz",
      "category": "${category}",
      "difficulty": "${difficulty}",
      "questions": [
        {
          "id": "1",
          "question": "Texte de la question",
          "options": ["Option A", "Option B", "Option C", "Option D"],
          "correctAnswer": 0 // Index de la bonne réponse (0-3)
        },
        ...
      ]
    }`;

    try {
      const response = await axios.post(
        DEEPSEEK_API_URL,
        {
          model: DEEPSEEK_MODEL,
          messages: [
            {
              role: 'system',
              content: 'Tu es un générateur de quiz éducatifs pour enfants. Tu réponds uniquement au format JSON.'
            },
            {
              role: 'user',
              content: prompt
            }
          ],
          max_tokens: 1500,
          temperature: 0.5,
        },
        {
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${DEEPSEEK_API_KEY}`
          }
        }
      );

      // Extraire et parser le JSON de la réponse
      const content = response.data.choices[0].message.content;
      const jsonMatch = content.match(/```json\n([\s\S]*)\n```/) || content.match(/({[\s\S]*})/);
      
      if (jsonMatch && jsonMatch[1]) {
        return JSON.parse(jsonMatch[1]);
      } else {
        try {
          return JSON.parse(content);
        } catch (parseError) {
          console.error('Erreur de parsing JSON:', parseError);
          return getSimulatedQuiz(category, difficulty, questionCount);
        }
      }
    } catch (apiError) {
      console.error('Erreur API DeepSeek pour la génération de quiz:', apiError);
      return getSimulatedQuiz(category, difficulty, questionCount);
    }
  } catch (error) {
    console.error('Erreur lors de la génération de quiz:', error);
    throw new Error('Erreur lors de la génération de quiz');
  }
};

/**
 * Génère une histoire basée sur un dessin
 * @param drawingDescription Description du dessin ou prompt
 * @returns Histoire générée
 */
export const generateStoryFromDrawing = async (drawingDescription: string): Promise<any> => {
  try {
    const prompt = `Génère une courte histoire pour enfants basée sur cette description de dessin:
    "${drawingDescription}"
    
    L'histoire doit être adaptée aux enfants de 7 à 12 ans, positive et encourageante.
    Utilise ton imagination pour créer une histoire magique et captivante.
    
    Réponds au format JSON avec la structure suivante:
    {
      "title": "Titre de l'histoire",
      "content": "Contenu de l'histoire (environ 200-300 mots)"
    }`;

    try {
      const response = await axios.post(
        DEEPSEEK_API_URL,
        {
          model: DEEPSEEK_MODEL,
          messages: [
            {
              role: 'system',
              content: 'Tu es un générateur d\'histoires pour enfants basées sur leurs dessins. Tu réponds uniquement au format JSON.'
            },
            {
              role: 'user',
              content: prompt
            }
          ],
          max_tokens: 1000,
          temperature: 0.8,
        },
        {
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${DEEPSEEK_API_KEY}`
          }
        }
      );

      // Extraire et parser le JSON de la réponse
      const content = response.data.choices[0].message.content;
      const jsonMatch = content.match(/```json\n([\s\S]*)\n```/) || content.match(/({[\s\S]*})/);
      
      if (jsonMatch && jsonMatch[1]) {
        return JSON.parse(jsonMatch[1]);
      } else {
        try {
          return JSON.parse(content);
        } catch (parseError) {
          console.error('Erreur de parsing JSON:', parseError);
          return getSimulatedDrawingStory(drawingDescription);
        }
      }
    } catch (apiError) {
      console.error('Erreur API DeepSeek pour la génération d\'histoire depuis dessin:', apiError);
      return getSimulatedDrawingStory(drawingDescription);
    }
  } catch (error) {
    console.error('Erreur lors de la génération d\'histoire depuis dessin:', error);
    throw new Error('Erreur lors de la génération d\'histoire depuis dessin');
  }
};

/**
 * Vérifie si le contenu est approprié pour les enfants
 * @param content Contenu à vérifier
 * @returns true si le contenu est approprié, false sinon
 */
export const isContentAppropriate = async (content: string): Promise<boolean> => {
  try {
    const prompt = `Analyse le texte suivant et détermine s'il est approprié pour des enfants de 7 à 12 ans:
    "${content}"
    
    Réponds uniquement par "APPROPRIATE" ou "INAPPROPRIATE".
    
    Un contenu est inapproprié s'il contient:
    - Des références sexuelles
    - De la violence graphique
    - Des insultes ou langage grossier
    - Des thèmes adultes (drogue, alcool, etc.)
    - Des contenus effrayants ou traumatisants
    - Des incitations à des comportements dangereux`;

    try {
      const response = await axios.post(
        DEEPSEEK_API_URL,
        {
          model: DEEPSEEK_MODEL,
          messages: [
            {
              role: 'system',
              content: 'Tu es un système de modération de contenu pour une plateforme destinée aux enfants.'
            },
            {
              role: 'user',
              content: prompt
            }
          ],
          max_tokens: 50,
          temperature: 0.1,
        },
        {
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${DEEPSEEK_API_KEY}`
          }
        }
      );

      const responseText = response.data.choices[0].message.content.trim().toUpperCase();
      return responseText.includes('APPROPRIATE') && !responseText.includes('INAPPROPRIATE');
    } catch (apiError) {
      console.error('Erreur API DeepSeek pour la vérification de contenu:', apiError);
      
      // En cas d'erreur, utiliser une vérification basique
      return isContentAppropriateBasic(content);
    }
  } catch (error) {
    console.error('Erreur lors de la vérification de contenu:', error);
    return isContentAppropriateBasic(content);
  }
};

// Fonctions de simulation pour le développement et les cas de fallback

/**
 * Simulation de réponse du chatbot (utilisée en cas d'erreur API)
 */
const getSimulatedResponse = (messages: Array<{ role: string, content: string }>): string => {
  const lastUserMessage = messages[messages.length - 1].content.toLowerCase();
  
  if (lastUserMessage.includes('bonjour') || lastUserMessage.includes('salut')) {
    return "Bonjour ! 👋 Je suis Nahilou, ton ami de la caverne magique. Comment puis-je t'aider aujourd'hui ? Tu veux une histoire, un jeu ou tu as une question ?";
  } else if (lastUserMessage.includes('histoire')) {
    return "J'adore les histoires ! 📚 Veux-tu une histoire sur des pirates, des dragons, ou des explorateurs de l'espace ? Dis-moi ce que tu préfères et je te raconterai une aventure passionnante !";
  } else if (lastUserMessage.includes('jeu')) {
    return "Les jeux sont super amusants ! 🎮 Tu peux essayer notre jeu de mémoire avec les animaux ou le puzzle des nombres. Qu'est-ce qui te tente le plus ?";
  } else if (lastUserMessage.includes('animal')) {
    return "Les animaux sont fascinants ! 🦁 Savais-tu que les éléphants peuvent communiquer sur de longues distances avec des sons que nous ne pouvons pas entendre ? Quel est ton animal préféré ?";
  } else if (lastUserMessage.includes('dessin')) {
    return "J'adore dessiner ! 🎨 Dans notre espace créatif, tu peux créer des dessins magnifiques avec plein de couleurs. Qu'aimerais-tu dessiner aujourd'hui ?";
  } else {
    return "C'est une super question ! 🌟 J'apprends encore plein de choses. Veux-tu explorer nos jeux, nos histoires interactives ou notre espace créatif ? Je suis là pour t'aider à t'amuser !";
  }
};

/**
 * Simulation de génération d'histoire (utilisée en cas d'erreur API)
 */
const getSimulatedStory = (theme: string, protagonist: string, setting: string): any => {
  return {
    id: `story_${Date.now()}`,
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
};

/**
 * Simulation de génération de quiz (utilisée en cas d'erreur API)
 */
const getSimulatedQuiz = (category: string, difficulty: string, questionCount: number): any => {
  return {
    id: `quiz_${Date.now()}`,
    title: `Quiz sur ${category}`,
    category,
    difficulty,
    questions: [
      {
        id: '1',
        question: `Première question sur ${category} (${difficulty})`,
        options: ['Option A', 'Option B', 'Option C', 'Option D'],
        correctAnswer: 0
      },
      {
        id: '2',
        question: `Deuxième question sur ${category} (${difficulty})`,
        options: ['Option A', 'Option B', 'Option C', 'Option D'],
        correctAnswer: 1
      },
      {
        id: '3',
        question: `Troisième question sur ${category} (${difficulty})`,
        options: ['Option A', 'Option B', 'Option C', 'Option D'],
        correctAnswer: 2
      }
    ].slice(0, questionCount)
  };
};

/**
 * Simulation de génération d'histoire basée sur un dessin (utilisée en cas d'erreur API)
 */
const getSimulatedDrawingStory = (drawingDescription: string): any => {
  const storyTitle = drawingDescription 
    ? `L'histoire de ${drawingDescription}`
    : `L'aventure du dessin magique`;
  
  const storyContent = drawingDescription
    ? `Il était une fois, dans un monde merveilleux, ${drawingDescription} qui vivait d'incroyables aventures. Un jour, en se promenant dans la forêt enchantée, ${drawingDescription} découvrit un trésor caché sous un arbre centenaire. Ce trésor n'était pas fait d'or ou de pierres précieuses, mais de quelque chose de bien plus précieux : des graines magiques qui, une fois plantées, exauçaient les vœux les plus chers. ${drawingDescription} décida alors de planter ces graines dans son jardin et attendit avec impatience de voir ce qui allait se passer...`
    : `Il était une fois, dans un monde coloré comme ton dessin, un petit personnage qui adorait explorer et découvrir de nouveaux endroits. Un jour, en se promenant dans une forêt aux arbres multicolores, il trouva une clé dorée brillant sous un rayon de soleil. Cette clé, disait-on, ouvrait la porte d'un château magique où tous les rêves devenaient réalité. Notre héros décida de partir à la recherche de ce château, traversant des rivières scintillantes et des montagnes majestueuses. Après un long voyage rempli d'aventures et de rencontres avec des créatures fantastiques, il arriva enfin devant une immense porte ornée de symboles mystérieux...`;
  
  return {
    title: storyTitle,
    content: storyContent
  };
};

/**
 * Vérification basique du contenu (utilisée en cas d'erreur API)
 */
const isContentAppropriateBasic = (content: string): boolean => {
  const inappropriateWords = [
    'sexe', 'violence', 'drogue', 'alcool', 'cigarette', 'mort', 'tuer',
    'arme', 'fusil', 'pistolet', 'couteau', 'sang', 'horreur', 'peur',
    'insulte', 'gros mot', 'juron'
  ];
  
  const contentLower = content.toLowerCase();
  
  for (const word of inappropriateWords) {
    if (contentLower.includes(word)) {
      return false;
    }
  }
  
  return true;
};
