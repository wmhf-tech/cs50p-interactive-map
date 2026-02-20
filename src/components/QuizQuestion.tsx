import React, { useState } from 'react';
import { CheckCircle, XCircle, ChevronRight } from 'lucide-react';
import { Question } from './quiz-core';

interface QuizQuestionProps {
  question: Question;
  onAnswer: (isCorrect: boolean, questionId: string, moduleId: string) => void;
  questionNumber: number;
  totalQuestions: number;
}

const QuizQuestion: React.FC<QuizQuestionProps> = ({ question, onAnswer, questionNumber, totalQuestions }) => {
  const [selectedOption, setSelectedOption] = useState<string | null>(null);
  const [showFeedback, setShowFeedback] = useState(false);

  const handleOptionClick = (option: string) => {
    if (!showFeedback) { // Permite selecionar apenas uma vez
      setSelectedOption(option);
      setShowFeedback(true);
      setTimeout(() => {
        onAnswer(option === question.correctAnswer, question.id, question.moduleId);
      }, 1500); // Dá um tempo para o usuário ver o feedback visual
    }
  };

  const isCorrectOption = (option: string) => option === question.correctAnswer;
  const isSelectedOption = (option: string) => option === selectedOption;

  return (
    <div className="p-6 bg-gray-800 text-white rounded-lg shadow-lg max-w-md mx-auto font-sans fade-in">
      <div className="flex justify-between items-center mb-8">
        <span className="text-xs font-bold text-gray-500 tracking-widest uppercase">Questão {questionNumber} de {totalQuestions}</span>
        <div className="flex gap-1">
          {Array.from({ length: totalQuestions }).map((_, i) => (
            <div key={i} className={`h-1 w-6 rounded-full ${i < questionNumber - 1 ? 'bg-blue-500' : i === questionNumber - 1 ? 'bg-blue-400' : 'bg-gray-700'}`}></div>
          ))}
        </div>
      </div>

      <h2 className="text-xl font-semibold mb-8 leading-relaxed">{question.questionText}</h2>

      <div className="space-y-3">
        {question.options?.map((option, index) => (
          <button
            key={index}
            onClick={() => handleOptionClick(option)}
            disabled={showFeedback}
            className={`w-full text-left p-4 rounded-xl border transition-all group flex justify-between items-center
              ${showFeedback 
                ? (isCorrectOption(option) ? 'border-green-500 bg-green-500/20' : isSelectedOption(option) ? 'border-red-500 bg-red-500/20' : 'border-gray-700 bg-gray-900/30')
                : 'border-gray-700 bg-gray-900/30 hover:bg-gray-700 hover:border-blue-500/50'}
            `}
          >
            <span>{option}</span>
            {showFeedback && isSelectedOption(option) && (
              isCorrectOption(option) 
                ? <CheckCircle className="w-5 h-5 text-green-500" /> 
                : <XCircle className="w-5 h-5 text-red-500" />
            )}
            {showFeedback && !isSelectedOption(option) && isCorrectOption(option) && (
              <CheckCircle className="w-5 h-5 text-green-500" />
            )}
            {!showFeedback && <ChevronRight className="w-4 h-4 text-gray-600 group-hover:text-blue-400" />}
          </button>
        ))}
      </div>

      {showFeedback && (
        <div className="mt-6 p-4 bg-gray-700 rounded-md fade-in">
          <h3 className="font-bold text-lg mb-2">Explicação:</h3>
          <p className="text-gray-300">{question.explanation}</p>
        </div>
      )}
    </div>
  );
};

export default QuizQuestion;
