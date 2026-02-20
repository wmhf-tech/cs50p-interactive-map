import React, { useState, useEffect, useCallback } from 'react';
import QuizProgressUI from '../components/QuizProgressUI'; // Reutilizamos o componente de progresso, talvez adaptado ou um novo
import {
  allQuizModules,
  selectGeneralQuizQuestions,
  loadUserProgress,
  saveUserProgress,
  Question,
  UserModuleProgress,
  UserQuizProgressData,
  UserQuestionProgress
} from '../utils/quiz-core';
import { CheckCircle, XCircle, ChevronRight, RefreshCw, Globe } from 'lucide-react';

import QuizQuestion from '../components/QuizQuestion';

// Novo componente para exibir o progresso geral
interface QuizProgressOverviewProps {
  allUserProgress: UserQuizProgressData;
  allQuizModules: Question[];
}

const QuizProgressOverview: React.FC<QuizProgressOverviewProps> = ({ allUserProgress, allQuizModules }) => {
  let totalQuestionsAcrossAllModules = 0;
  let totalMasteredQuestions = 0;

  allQuizModules.forEach(module => {
    totalQuestionsAcrossAllModules += module.questions.length;
    const userProgress = allUserProgress[module.moduleId];
    if (userProgress) {
      totalMasteredQuestions += userProgress.completedQuestions.length;
    }
  });

  const overallProgressPercentage = totalQuestionsAcrossAllModules > 0 
    ? (totalMasteredQuestions / totalQuestionsAcrossAllModules) * 100 
    : 0;

  return (
    <div className="p-6 bg-gray-800 text-white rounded-lg shadow-lg max-w-md mx-auto font-sans">
      <h2 className="text-2xl font-bold mb-4 text-center flex items-center justify-center gap-2">
        <Globe className="w-6 h-6 text-purple-400" />
        Progresso Geral dos Quizzes
      </h2>

      <div className="mb-6">
        <div className="flex justify-between items-center mb-2">
          <span className="text-lg font-medium">Questões Dominadas Globalmente</span>
          <span className="text-xl font-bold">{totalMasteredQuestions} / {totalQuestionsAcrossAllModules}</span>
        </div>
        <div className="w-full bg-gray-700 rounded-full h-3">
          <div
            className="bg-purple-500 h-3 rounded-full transition-all duration-500 ease-out"
            style={{ width: `${overallProgressPercentage}%` }}
          ></div>
        </div>
        <p className="text-sm text-gray-400 mt-1">Você dominou {overallProgressPercentage.toFixed(0)}% de todas as questões.</p>
      </div>

      <h3 className="text-xl font-semibold mb-3">Progresso por Módulo:</h3>
      <ul className="space-y-2">
        {allQuizModules.map(module => {
          const userModuleProgress = allUserProgress[module.moduleId];
          const mastered = userModuleProgress?.completedQuestions.length || 0;
          const total = module.questions.length;
          const percent = total > 0 ? (mastered / total) * 100 : 0;
          return (
            <li key={module.moduleId} className="flex justify-between items-center bg-gray-700 p-3 rounded-md">
              <span className="font-medium">{module.moduleTitle}</span>
              <span className="text-blue-400">{percent.toFixed(0)}% ({mastered}/{total})</span>
            </li>
          );
        })}
      </ul>
    </div>
  );
};

// Componente principal do Quiz Geral
const GeneralQuizContainer: React.FC = () => {
  const [allUserProgress, setAllUserProgress] = useState<UserQuizProgressData>(() => {
    const progressData: UserQuizProgressData = {};
    allQuizModules.forEach(module => {
      progressData[module.moduleId] = loadUserProgress(module.moduleId);
    });
    return progressData;
  });

  const [currentQuizQuestions, setCurrentQuizQuestions] = useState<Question[]>([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [showQuiz, setShowQuiz] = useState(false);
  const [quizAttemptResults, setQuizAttemptResults] = useState<{ questionId: string; correct: boolean; moduleId: string }[]>([]);

  // Salva o progresso sempre que ele muda
  useEffect(() => {
    Object.values(allUserProgress).forEach(progress => {
      saveUserProgress(progress);
    });
  }, [allUserProgress]);

  const startNewGeneralQuizAttempt = useCallback(() => {
    const selectedQuestions = selectGeneralQuizQuestions(allQuizModules, allUserProgress, 10); // 10 questões para o quiz geral
    setCurrentQuizQuestions(selectedQuestions);
    setCurrentQuestionIndex(0);
    setQuizAttemptResults([]);
    setShowQuiz(true);
  }, [allUserProgress]);

  const handleAnswer = useCallback((isCorrect: boolean, questionId: string, moduleId: string) => {
    setQuizAttemptResults(prev => [...prev, { questionId, correct: isCorrect, moduleId }]);

    setAllUserProgress(prevAllProgress => {
      const prevModuleProgress = prevAllProgress[moduleId];
      const newAttempt: UserQuestionProgress = {
        questionId,
        answeredCorrectly: isCorrect,
        attempts: (prevModuleProgress?.attemptedQuestions.find(q => q.questionId === questionId)?.attempts || 0) + 1,
        lastAttemptDate: new Date(),
      };

      const updatedAttemptedQuestions = prevModuleProgress?.attemptedQuestions.filter(q => q.questionId !== questionId) || [];
      updatedAttemptedQuestions.push(newAttempt);

      const updatedCompletedQuestions = isCorrect && !(prevModuleProgress?.completedQuestions.includes(questionId))
        ? [...(prevModuleProgress?.completedQuestions || []), questionId]
        : (prevModuleProgress?.completedQuestions || []);

      return {
        ...prevAllProgress,
        [moduleId]: {
          moduleId: moduleId,
          completedQuestions: updatedCompletedQuestions,
          attemptedQuestions: updatedAttemptedQuestions,
        },
      };
    });

    // Avança para a próxima questão ou finaliza o quiz
    if (currentQuestionIndex < currentQuizQuestions.length - 1) {
      setCurrentQuestionIndex(prev => prev + 1);
    } else {
      // Quiz finalizado
      setShowQuiz(false);
      // Aqui você pode exibir um resumo do quiz geral
    }
  }, [currentQuestionIndex, currentQuizQuestions.length]);

  const currentQuestion = currentQuizQuestions[currentQuestionIndex];

  return (
    <div className="min-h-screen bg-gray-900 flex items-center justify-center p-4">
      {!showQuiz ? (
        <div className="space-y-6 w-full max-w-md">
          <QuizProgressOverview allUserProgress={allUserProgress} allQuizModules={allQuizModules} />
          <div className="text-center">
            <button
              onClick={startNewGeneralQuizAttempt}
              className="px-6 py-3 bg-purple-600 hover:bg-purple-700 text-white font-bold rounded-lg shadow-md transition-colors duration-200 flex items-center justify-center gap-2 mx-auto"
            >
              <Globe className="w-5 h-5" />
              Iniciar Quiz Geral
            </button>
          </div>
        </div>
      ) : (
        currentQuestion ? (
          <QuizQuestion
            question={currentQuestion}
            onAnswer={handleAnswer}
            questionNumber={currentQuestionIndex + 1}
            totalQuestions={currentQuizQuestions.length}
          />
        ) : (
          <div className="text-center text-gray-400">Carregando questões do quiz...</div>
        )
      )}
    </div>
  );
};

export default GeneralQuizContainer;
