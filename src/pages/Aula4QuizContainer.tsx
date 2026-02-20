import React, { useState, useEffect, useCallback } from 'react';
import QuizProgressUI from '../components/QuizProgressUI';
import QuizQuestion from '../components/QuizQuestion';
import {
  aula4QuizModule, // Importa o módulo específico da Aula 4
  selectUniqueQuizQuestions,
  loadUserProgress,
  saveUserProgress,
  Question,
  UserModuleProgress,
} from '../utils/quiz-core';
import { RefreshCw } from 'lucide-react';

const Aula4QuizContainer: React.FC = () => {
  const moduleId = aula4QuizModule.moduleId;
  const [userProgress, setUserProgress] = useState<UserModuleProgress>(() => loadUserProgress(moduleId));
  const [currentQuizQuestions, setCurrentQuizQuestions] = useState<Question[]>([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [showQuiz, setShowQuiz] = useState(false);

  useEffect(() => {
    saveUserProgress(userProgress);
  }, [userProgress]);

  const startNewQuizAttempt = useCallback(() => {
    const selectedQuestions = selectUniqueQuizQuestions(aula4QuizModule, userProgress, 5);
    setCurrentQuizQuestions(selectedQuestions);
    setCurrentQuestionIndex(0);
    setShowQuiz(true);
  }, [userProgress]);

  const handleAnswer = useCallback((isCorrect: boolean, questionId: string, answeredModuleId: string) => {
    setUserProgress(prevProgress => {
      const newAttempt: UserQuestionProgress = {
        questionId,
        answeredCorrectly: isCorrect,
        attempts: (prevProgress.attemptedQuestions.find(q => q.questionId === questionId)?.attempts || 0) + 1,
        lastAttemptDate: new Date(),
      };

      const updatedAttemptedQuestions = prevProgress.attemptedQuestions.filter(q => q.questionId !== questionId);
      updatedAttemptedQuestions.push(newAttempt);

      const updatedCompletedQuestions = isCorrect && !prevProgress.completedQuestions.includes(questionId)
        ? [...prevProgress.completedQuestions, questionId]
        : prevProgress.completedQuestions;

      return {
        ...prevProgress,
        completedQuestions: updatedCompletedQuestions,
        attemptedQuestions: updatedAttemptedQuestions,
      };
    });

    if (currentQuestionIndex < currentQuizQuestions.length - 1) {
      setCurrentQuestionIndex(prev => prev + 1);
    } else {
      setShowQuiz(false);
    }
  }, [currentQuestionIndex, currentQuizQuestions.length]);

  const currentQuestion = currentQuizQuestions[currentQuestionIndex];

  return (
    <div className="min-h-screen bg-gray-900 flex items-center justify-center p-4">
      {!showQuiz ? (
        <div className="space-y-6 w-full max-w-md">
          <QuizProgressUI quizModule={aula4QuizModule} userProgress={userProgress} />
          <div className="text-center">
            <button
              onClick={startNewQuizAttempt}
              className="px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-lg shadow-md transition-colors duration-200 flex items-center justify-center gap-2 mx-auto"
            >
              <RefreshCw className="w-5 h-5" />
              Iniciar Nova Tentativa
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

export default Aula4QuizContainer;
