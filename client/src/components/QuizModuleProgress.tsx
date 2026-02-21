import { useTranslation } from 'react-i18next';
import { Card } from '@/components/ui/card';
import { Trophy, TrendingUp, BookOpen } from 'lucide-react';
import { QuizModule, UserModuleProgress } from '@/utils/quiz-core';

interface QuizModuleProgressProps {
  quizModule: QuizModule;
  userProgress: UserModuleProgress;
}

export default function QuizModuleProgress({
  quizModule,
  userProgress,
}: QuizModuleProgressProps) {
  const { t } = useTranslation();
  
  const totalQuestions = quizModule.questions.length;
  const completedQuestions = userProgress.completedQuestions.length;
  const accuracy = totalQuestions > 0 ? Math.round((completedQuestions / totalQuestions) * 100) : 0;

  return (
    <Card className="p-4 bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-slate-800 dark:to-slate-900 border-blue-200 dark:border-slate-700 transition-colors duration-300">
      {/* Título do módulo */}
      <div className="flex items-center gap-2 mb-4">
        <BookOpen className="w-5 h-5 text-blue-600 dark:text-blue-400" />
        <h3 className="text-lg font-semibold text-slate-900 dark:text-slate-100">
          {quizModule.moduleTitle}
        </h3>
      </div>

      {/* Barra de progresso */}
      <div className="mb-4">
        <div className="flex justify-between items-center mb-2">
          <span className="text-sm font-semibold text-slate-700 dark:text-slate-300">
            {t('quiz.progress')}
          </span>
          <span className="text-sm font-bold text-blue-600 dark:text-blue-400">
            {accuracy}%
          </span>
        </div>
        <div className="w-full bg-slate-200 dark:bg-slate-700 rounded-full h-2 overflow-hidden">
          <div
            className="bg-gradient-to-r from-blue-500 to-indigo-500 h-full transition-all duration-300"
            style={{ width: `${accuracy}%` }}
          />
        </div>
      </div>

      {/* Estatísticas */}
      <div className="grid grid-cols-2 gap-3">
        {/* Questões Dominadas */}
        <div className="text-center p-3 bg-white dark:bg-slate-800 rounded-lg border border-slate-200 dark:border-slate-700">
          <div className="flex items-center justify-center mb-1">
            <Trophy className="w-4 h-4 text-yellow-600 dark:text-yellow-400" />
          </div>
          <p className="text-2xl font-bold text-slate-900 dark:text-slate-100">
            {completedQuestions}/{totalQuestions}
          </p>
          <p className="text-xs text-slate-600 dark:text-slate-400">{t('quiz.correct')}</p>
        </div>

        {/* Total de Questões */}
        <div className="text-center p-3 bg-white dark:bg-slate-800 rounded-lg border border-slate-200 dark:border-slate-700">
          <div className="flex items-center justify-center mb-1">
            <TrendingUp className="w-4 h-4 text-blue-600 dark:text-blue-400" />
          </div>
          <p className="text-2xl font-bold text-slate-900 dark:text-slate-100">
            {totalQuestions}
          </p>
          <p className="text-xs text-slate-600 dark:text-slate-400">{t('quiz.totalQuestions')}</p>
        </div>
      </div>
    </Card>
  );
}
