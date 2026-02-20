
import React from 'react';
import { CheckCircle, XCircle, HelpCircle, BarChart2 } from 'lucide-react';

// Reutilizando as interfaces definidas anteriormente em quiz-logic.ts
import { QuizModule, UserModuleProgress, Question } from '../utils/quiz-core'; // Importa interfaces do arquivo centralizado

interface QuizProgressUIProps {
  quizModule: QuizModule;
  userProgress: UserModuleProgress;
}

const QuizProgressUI: React.FC<QuizProgressUIProps> = ({ quizModule, userProgress }) => {
  const totalQuestions = quizModule.questions.length;
  const masteredQuestions = userProgress.completedQuestions.length;
  const progressPercentage = totalQuestions > 0 ? (masteredQuestions / totalQuestions) * 100 : 0;

  const attemptedQuestionIds = new Set(userProgress.attemptedQuestions.map(p => p.questionId));
  const unseenQuestions = quizModule.questions.filter(q => !attemptedQuestionIds.has(q.id)).length;

  // Para o histórico de desempenho, vamos pegar as últimas 5 tentativas
  const latestAttempts = userProgress.attemptedQuestions
    .sort((a, b) => b.lastAttemptDate.getTime() - a.lastAttemptDate.getTime())
    .slice(0, 5);

  return (
    <div className="p-6 bg-gray-800 text-white rounded-lg shadow-lg max-w-md mx-auto font-sans">
      <h2 className="text-2xl font-bold mb-4 text-center">Progresso do Quiz: {quizModule.moduleTitle}</h2>

      {/* Barra de Domínio da Aula */}
      <div className="mb-6">
        <div className="flex justify-between items-center mb-2">
          <span className="text-lg font-medium">Questões Dominadas</span>
          <span className="text-xl font-bold">{masteredQuestions} / {totalQuestions}</span>
        </div>
        <div className="w-full bg-gray-700 rounded-full h-3">
          <div
            className="bg-green-500 h-3 rounded-full transition-all duration-500 ease-out"
            style={{ width: `${progressPercentage}%` }}
          ></div>
        </div>
        <p className="text-sm text-gray-400 mt-1">Você dominou {progressPercentage.toFixed(0)}% das questões desta aula.</p>
      </div>

      {/* Status de Descoberta */}
      <div className="mb-6 flex items-center justify-between bg-gray-700 p-3 rounded-md">
        <div className="flex items-center">
          <HelpCircle className="w-5 h-5 text-blue-400 mr-2" />
          <span className="text-lg font-medium">Questões a Descobrir</span>
        </div>
        <span className="text-xl font-bold">{unseenQuestions}</span>
      </div>

      {/* Histórico de Desempenho Recente */}
      <div className="mb-4">
        <h3 className="text-xl font-semibold mb-3 flex items-center">
          <BarChart2 className="w-5 h-5 text-purple-400 mr-2" />
          Últimas Tentativas
        </h3>
        {latestAttempts.length > 0 ? (
          <ul className="space-y-2">
            {latestAttempts.map((attempt, index) => (
              <li key={index} className="flex items-center justify-between bg-gray-700 p-3 rounded-md">
                <span className="text-gray-300">Questão {attempt.questionId}</span>
                {attempt.answeredCorrectly ? (
                  <CheckCircle className="w-5 h-5 text-green-500" title="Acertou" />
                ) : (
                  <XCircle className="w-5 h-5 text-red-500" title="Errou" />
                )}
              </li>
            ))}
          </ul>
        ) : (
          <p className="text-gray-400 text-center">Nenhuma tentativa registrada ainda.</p>
        )}
      </div>

      <p className="text-sm text-gray-500 text-center mt-6">
        Continue praticando para dominar todas as questões e descobrir novos desafios!
      </p>
    </div>
  );
};

export default QuizProgressUI;



