import quizDataAula0 from '../data/quiz/quiz-data-aula0.json';
import quizDataAula1 from '../data/quiz/quiz-data-aula1.json';
import quizDataAula2 from '../data/quiz/quiz-data-aula2.json';
import quizDataAula3 from '../data/quiz/quiz-data-aula3.json';
import quizDataAula4 from '../data/quiz/quiz-data-aula4.json';
import quizDataAula5 from '../data/quiz/quiz-data-aula5.json';
import quizDataAula6 from '../data/quiz/quiz-data-aula6.json';
import quizDataAula7 from '../data/quiz/quiz-data-aula7.json';
import quizDataAula8 from '../data/quiz/quiz-data-aula8.json';
import quizDataAula9 from '../data/quiz/quiz-data-aula9.json';
import quizDataAula10 from '../data/quiz/quiz-data-aula10.json';

export type QuestionType = 'multiple_choice' | 'true_false';

export interface Question {
  id: string;
  type: QuestionType;
  questionText: string;
  options?: string[];
  correctAnswer: string;
  explanation: string;
  difficulty: 'easy' | 'medium' | 'hard';
  tags: string[];
}

export interface QuizModule {
  moduleId: string;
  moduleTitle: string;
  questions: Question[];
}

export interface UserQuestionProgress {
  questionId: string;
  answeredCorrectly: boolean;
  attempts: number;
  lastAttemptDate: Date;
}

export interface UserModuleProgress {
  moduleId: string;
  completedQuestions: string[];
  attemptedQuestions: UserQuestionProgress[];
}

export interface UserQuizProgressData {
  [moduleId: string]: UserModuleProgress;
}

/**
 * Função utilitária para embaralhar um array (Fisher-Yates shuffle).
 * @param array O array a ser embaralhado.
 * @returns O array embaralhado.
 */
function shuffleArray<T>(array: T[]): T[] {
  const newArray = [...array];
  for (let i = newArray.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [newArray[i], newArray[j]] = [newArray[j], newArray[i]];
  }
  return newArray;
}

/**
 * Seleciona um conjunto de questões únicas para um quiz, considerando o progresso do usuário.
 * Prioriza questões não respondidas ou respondidas incorretamente.
 * @param quizModule O módulo de quiz completo com todas as questões.
 * @param userProgress O progresso atual do usuário para este módulo.
 * @param numQuestions O número desejado de questões para o quiz.
 * @returns Um array de questões selecionadas.
 */
export function selectUniqueQuizQuestions(
  quizModule: QuizModule,
  userProgress: UserModuleProgress | undefined,
  numQuestions: number = 5
): Question[] {
  const allQuestions = quizModule.questions;
  const completedQuestionIds = new Set(userProgress?.completedQuestions || []);
  const attemptedQuestionIds = new Set(
    userProgress?.attemptedQuestions.map(p => p.questionId) || []
  );

  let availableQuestions: Question[] = [];

  // 1. Priorizar questões que o usuário nunca viu ou errou
  const unseenOrIncorrectQuestions = allQuestions.filter(q => {
    const hasAttempted = attemptedQuestionIds.has(q.id);
    
    if (!hasAttempted) { // Nunca tentou
      return true;
    }

    // Tentou, mas não completou (errou ou não finalizou)
    const progress = userProgress?.attemptedQuestions.find(p => p.questionId === q.id);
    return progress && !progress.answeredCorrectly;
  });

  // Embaralha as questões para garantir aleatoriedade
  const shuffledUnseenOrIncorrect = shuffleArray(unseenOrIncorrectQuestions);
  availableQuestions = shuffledUnseenOrIncorrect;

  // Se não houver questões suficientes, adiciona questões já respondidas corretamente (mas ainda as embaralha)
  if (availableQuestions.length < numQuestions) {
    const seenAndCorrectQuestions = allQuestions.filter(q => completedQuestionIds.has(q.id));
    const shuffledSeenAndCorrect = shuffleArray(seenAndCorrectQuestions);
    availableQuestions = [...availableQuestions, ...shuffledSeenAndCorrect];
  }

  // Garante que não exceda o número desejado e que as questões sejam únicas (caso haja duplicação por algum erro lógico)
  const finalSelection = Array.from(new Set(availableQuestions.map(q => q.id)))
    .map(id => allQuestions.find(q => q.id === id)!)
    .slice(0, numQuestions);

  return finalSelection;
}

/**
 * Seleciona um conjunto de questões para o Quiz Geral, considerando o progresso do usuário em todos os módulos.
 * Prioriza questões não respondidas ou respondidas incorretamente de qualquer módulo.
 * @param allQuizModules Todos os módulos de quiz disponíveis.
 * @param allUserProgress O progresso do usuário para todos os módulos.
 * @param numQuestions O número desejado de questões para o quiz geral.
 * @returns Um array de questões selecionadas.
 */
export function selectGeneralQuizQuestions(
  allQuizModules: QuizModule[],
  allUserProgress: UserQuizProgressData,
  numQuestions: number = 10
): Question[] {
  let allAvailableQuestions: Question[] = [];

  allQuizModules.forEach(module => {
    const userProgress = allUserProgress[module.moduleId];
    const completedQuestionIds = new Set(userProgress?.completedQuestions || []);
    const attemptedQuestionIds = new Set(
      userProgress?.attemptedQuestions.map(p => p.questionId) || []
    );

    // Priorizar questões que o usuário nunca viu ou errou neste módulo
    const unseenOrIncorrectQuestions = module.questions.filter(q => {
      const hasAttempted = attemptedQuestionIds.has(q.id);
      
      if (!hasAttempted) { // Nunca tentou
        return true;
      }

      // Tentou, mas não completou (errou ou não finalizou)
      const progress = userProgress?.attemptedQuestions.find(p => p.questionId === q.id);
      return progress && !progress.answeredCorrectly;
    });
    allAvailableQuestions = [...allAvailableQuestions, ...unseenOrIncorrectQuestions];
  });

  // Se não houver questões suficientes de inéditas/erradas, adiciona questões já respondidas corretamente
  if (allAvailableQuestions.length < numQuestions) {
    allQuizModules.forEach(module => {
      const userProgress = allUserProgress[module.moduleId];
      const completedQuestionIds = new Set(userProgress?.completedQuestions || []);
      const seenAndCorrectQuestions = module.questions.filter(q => completedQuestionIds.has(q.id));
      allAvailableQuestions = [...allAvailableQuestions, ...seenAndCorrectQuestions];
    });
  }

  // Embaralha todas as questões disponíveis e seleciona o número desejado
  const shuffledQuestions = shuffleArray(allAvailableQuestions);
  const finalSelection = Array.from(new Set(shuffledQuestions.map(q => q.id)))
    .map(id => {
      // Encontra a questão original em qualquer módulo
      for (const module of allQuizModules) {
        const question = module.questions.find(q => q.id === id);
        if (question) return question;
      }
      return undefined; // Não deveria acontecer se os IDs forem únicos
    })
    .filter((q): q is Question => q !== undefined)
    .slice(0, numQuestions);

  return finalSelection;
}

// Função para carregar o progresso do usuário do localStorage
export function loadUserProgress(moduleId: string): UserModuleProgress {
  const storedProgress = localStorage.getItem(`quizProgress-${moduleId}`);
  if (storedProgress) {
    const parsedProgress: UserModuleProgress = JSON.parse(storedProgress);
    // Converte lastAttemptDate de string para Date
    parsedProgress.attemptedQuestions = parsedProgress.attemptedQuestions.map(attempt => ({
      ...attempt,
      lastAttemptDate: new Date(attempt.lastAttemptDate),
    }));
    return parsedProgress;
  }
  return {
    moduleId: moduleId,
    completedQuestions: [],
    attemptedQuestions: [],
  };
}

// Função para salvar o progresso do usuário no localStorage
export function saveUserProgress(progress: UserModuleProgress): void {
  localStorage.setItem(`quizProgress-${progress.moduleId}`, JSON.stringify(progress));
}

// Exporta todos os módulos de quiz
export const allQuizModules: QuizModule[] = [
  quizDataAula0 as QuizModule,
  quizDataAula1 as QuizModule,
  quizDataAula2 as QuizModule,
  quizDataAula3 as QuizModule,
  quizDataAula4 as QuizModule,
  quizDataAula5 as QuizModule,
  quizDataAula6 as QuizModule,
  quizDataAula7 as QuizModule,
  quizDataAula8 as QuizModule,
  quizDataAula9 as QuizModule,
  quizDataAula10 as QuizModule,
];

// Exporta cada módulo de aula para compatibilidade com os containers existentes
export const aula0QuizModule: QuizModule = quizDataAula0 as QuizModule;
export const aula1QuizModule: QuizModule = quizDataAula1 as QuizModule;
export const aula2QuizModule: QuizModule = quizDataAula2 as QuizModule;
export const aula3QuizModule: QuizModule = quizDataAula3 as QuizModule;
export const aula4QuizModule: QuizModule = quizDataAula4 as QuizModule;
export const aula5QuizModule: QuizModule = quizDataAula5 as QuizModule;
export const aula6QuizModule: QuizModule = quizDataAula6 as QuizModule;
export const aula7QuizModule: QuizModule = quizDataAula7 as QuizModule;
export const aula8QuizModule: QuizModule = quizDataAula8 as QuizModule;
export const aula9QuizModule: QuizModule = quizDataAula9 as QuizModule;
export const aula10QuizModule: QuizModule = quizDataAula10 as QuizModule;
