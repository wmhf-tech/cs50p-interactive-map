import React, { useState, useEffect, useCallback } from 'react';
import QuizModuleProgress from "../components/QuizModuleProgress";
import {
  aula0QuizModule,
  selectUniqueQuizQuestions,
  loadUserProgress,
  saveUserProgress,
  Question,
  UserModuleProgress,
  UserQuestionProgress
} from '../utils/quiz-core';
import { RefreshCw } from 'lucide-react';
import QuizQuestion from '../components/QuizQuestion'; // Importa o componente QuizQuestion

// Componente principal do Quiz da Aula 0
const Aula0QuizContainer: React.FC = () => {
  const moduleId = aula0QuizModule.moduleId;
  const [userProgress, setUserProgress] = useState<UserModuleProgress>(() => loadUserProgress(moduleId));
  const [currentQuizQuestions, setCurrentQuizQuestions] = useState<Question[]>([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [showQuiz, setShowQuiz] = useState(false);
  const [quizAttemptResults, setQuizAttemptResults] = useState<{ questionId: string; correct: boolean }[]>([]);

  // Salva o progresso sempre que ele muda
  useEffect(() => {
    saveUserProgress(userProgress);
  }, [userProgress]);

  const startNewQuizAttempt = useCallback(() => {
    const selectedQuestions = selectUniqueQuizQuestions(aula0QuizModule, userProgress, 5); // 5 questões por tentativa
    setCurrentQuizQuestions(selectedQuestions);
    setCurrentQuestionIndex(0);
    setQuizAttemptResults([]);
    setShowQuiz(true);
  }, [userProgress]);

  const handleAnswer = useCallback((isCorrect: boolean, questionId: string, moduleId: string) => {
    setQuizAttemptResults(prev => [...prev, { questionId, correct: isCorrect }]);

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

    // Avança para a próxima questão ou finaliza o quiz
    if (currentQuestionIndex < currentQuizQuestions.length - 1) {
      setCurrentQuestionIndex(prev => prev + 1);
    } else {
      // Quiz finalizado
      setShowQuiz(false);
      // Aqui você pode exibir um resumo do quiz ou voltar para a tela de progresso
    }
  }, [currentQuestionIndex, currentQuizQuestions.length]);

  const currentQuestion = currentQuizQuestions[currentQuestionIndex];

  return (
    <div className="min-h-screen bg-gray-900 flex items-center justify-center p-4">
      {!showQuiz ? (
        <div className="space-y-6 w-full max-w-md">
          <QuizModuleProgress quizModule={aula0QuizModule} userProgress={userProgress} />
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

export default Aula0QuizContainer;
