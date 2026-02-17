import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { CheckCircle, XCircle, Clock } from 'lucide-react';
import { getRandomQuestions, QuizQuestion } from '@/data/quizData';
import { useUserProfile } from '@/hooks/useUserProfile';
import { useOfflineSync } from '@/hooks/useOfflineSync';
import { toast } from 'sonner';

interface QuizProps {
  aula?: number;
  onComplete?: (pontuacao: number, total: number) => void;
  onClose?: () => void;
}

export default function Quiz({ aula, onComplete, onClose }: QuizProps) {
  const [questions, setQuestions] = useState<QuizQuestion[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [respostas, setRespostas] = useState<number[]>([]);
  const [mostrarResultado, setMostrarResultado] = useState(false);
  const [tempoInicio, setTempoInicio] = useState<number>(Date.now());
  const [tempoDecorrido, setTempoDecorrido] = useState(0);
  const { addQuizResult } = useUserProfile();
  const { saveForSync, isOnline } = useOfflineSync();

  useEffect(() => {
    // Carregar perguntas
    const perguntas = aula !== undefined ? getRandomQuestions(5, aula) : getRandomQuestions(10);
    setQuestions(perguntas);
  }, [aula]);

  useEffect(() => {
    if (mostrarResultado) return;

    const interval = setInterval(() => {
      setTempoDecorrido(Math.floor((Date.now() - tempoInicio) / 1000));
    }, 1000);

    return () => clearInterval(interval);
  }, [mostrarResultado, tempoInicio]);

  if (questions.length === 0) {
    return (
      <div className="flex items-center justify-center p-8">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
          <p className="text-muted-foreground">Carregando perguntas...</p>
        </div>
      </div>
    );
  }

  const perguntaAtual = questions[currentIndex];
  const progresso = ((currentIndex + 1) / questions.length) * 100;

  const handleResposta = (indice: number) => {
    const novasRespostas = [...respostas];
    novasRespostas[currentIndex] = indice;
    setRespostas(novasRespostas);
  };

  const handleProxima = () => {
    if (respostas[currentIndex] === undefined) {
      toast.error('Por favor, selecione uma resposta');
      return;
    }

    if (currentIndex < questions.length - 1) {
      setCurrentIndex(currentIndex + 1);
    } else {
      finalizarQuiz();
    }
  };

  const handleAnterior = () => {
    if (currentIndex > 0) {
      setCurrentIndex(currentIndex - 1);
    }
  };

  const finalizarQuiz = async () => {
    let acertos = 0;
    questions.forEach((q, i) => {
      if (respostas[i] === q.resposta_correta) {
        acertos++;
      }
    });

    setMostrarResultado(true);

    const resultData = {
      aula,
      pontuacao: acertos,
      total_perguntas: questions.length,
      data: new Date().toISOString(),
      tempo_decorrido: tempoDecorrido,
      respostas: respostas,
    };

    try {
      await saveForSync('quiz_response', resultData);
      
      if (!isOnline) {
        toast.success('Quiz salvo offline. Sera sincronizado quando conectado!');
      }
    } catch (error) {
      console.error('Erro ao salvar quiz offline:', error);
    }

    if (aula !== undefined) {
      addQuizResult({
        aula,
        pontuacao: acertos,
        total_perguntas: questions.length,
        data: new Date().toISOString(),
        tempo_decorrido: tempoDecorrido,
      });
    }

    if (onComplete) {
      onComplete(acertos, questions.length);
    }
  };

  if (mostrarResultado) {
    const acertos = respostas.filter((r, i) => r === questions[i].resposta_correta).length;
    const percentual = ((acertos / questions.length) * 100).toFixed(0);

    return (
      <div className="w-full max-w-2xl mx-auto p-6">
        <Card className="p-8 text-center">
          <div className="mb-6">
            {parseInt(percentual) >= 70 ? (
              <CheckCircle className="w-16 h-16 text-green-500 mx-auto mb-4" />
            ) : (
              <XCircle className="w-16 h-16 text-orange-500 mx-auto mb-4" />
            )}
          </div>

          <h2 className="text-2xl font-bold mb-2">Quiz Concluído!</h2>
          <p className="text-muted-foreground mb-6">
            Você acertou {acertos} de {questions.length} perguntas
          </p>

          <div className="mb-8">
            <div className="text-5xl font-bold text-primary mb-2">{percentual}%</div>
            <div className="flex items-center justify-center gap-2 text-muted-foreground">
              <Clock className="w-4 h-4" />
              <span>Tempo: {Math.floor(tempoDecorrido / 60)}m {tempoDecorrido % 60}s</span>
            </div>
          </div>

          <div className="space-y-3 mb-8 max-h-96 overflow-y-auto">
            {questions.map((q, i) => {
              const acertou = respostas[i] === q.resposta_correta;
              return (
                <div key={q.id} className={`p-4 rounded-lg border text-left ${acertou ? 'bg-green-50 border-green-200' : 'bg-red-50 border-red-200'}`}>
                  <div className="flex items-start gap-3">
                    {acertou ? (
                      <CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0 mt-1" />
                    ) : (
                      <XCircle className="w-5 h-5 text-red-500 flex-shrink-0 mt-1" />
                    )}
                    <div className="flex-1">
                      <p className="font-medium text-sm mb-2">{q.pergunta}</p>
                      <p className="text-xs text-muted-foreground">
                        Sua resposta: <span className={acertou ? 'text-green-600' : 'text-red-600'}>{q.opcoes[respostas[i]]}</span>
                      </p>
                      {!acertou && (
                        <p className="text-xs text-green-600 mt-1">
                          Resposta correta: {q.opcoes[q.resposta_correta]}
                        </p>
                      )}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          <div className="flex gap-3">
            <Button variant="outline" onClick={onClose} className="flex-1">
              Voltar
            </Button>
            <Button onClick={() => window.location.reload()} className="flex-1">
              Fazer Outro Quiz
            </Button>
          </div>
        </Card>
      </div>
    );
  }

  return (
    <div className="w-full max-w-2xl mx-auto p-6">
      <Card className="p-6">
        {/* Header */}
        <div className="mb-6">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-lg font-semibold">
              Pergunta {currentIndex + 1} de {questions.length}
            </h2>
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <Clock className="w-4 h-4" />
              <span>{Math.floor(tempoDecorrido / 60)}m {tempoDecorrido % 60}s</span>
            </div>
          </div>
          <Progress value={progresso} className="h-2" />
        </div>

        {/* Pergunta */}
        <div className="mb-8">
          <div className="inline-block px-3 py-1 rounded-full bg-primary/10 text-primary text-xs font-medium mb-4">
            Aula {perguntaAtual.aula} • {perguntaAtual.dificuldade}
          </div>
          <h3 className="text-xl font-semibold mb-6">{perguntaAtual.pergunta}</h3>

          {/* Opções */}
          <div className="space-y-3">
            {perguntaAtual.opcoes.map((opcao, i) => (
              <button
                key={i}
                onClick={() => handleResposta(i)}
                className={`w-full p-4 text-left rounded-lg border-2 transition-all ${
                  respostas[currentIndex] === i
                    ? 'border-primary bg-primary/5'
                    : 'border-border hover:border-primary/50'
                }`}
              >
                <div className="flex items-center gap-3">
                  <div
                    className={`w-6 h-6 rounded-full border-2 flex items-center justify-center ${
                      respostas[currentIndex] === i
                        ? 'border-primary bg-primary'
                        : 'border-border'
                    }`}
                  >
                    {respostas[currentIndex] === i && (
                      <div className="w-2 h-2 bg-white rounded-full"></div>
                    )}
                  </div>
                  <span className="font-medium">{opcao}</span>
                </div>
              </button>
            ))}
          </div>
        </div>

        {/* Explicação (se resposta foi selecionada) */}
        {respostas[currentIndex] !== undefined && (
          <div className="mb-8 p-4 rounded-lg bg-blue-50 border border-blue-200">
            <p className="text-sm font-medium text-blue-900 mb-2">💡 Explicação:</p>
            <p className="text-sm text-blue-800">{perguntaAtual.explicacao}</p>
          </div>
        )}

        {/* Botões de Navegação */}
        <div className="flex gap-3">
          <Button
            variant="outline"
            onClick={handleAnterior}
            disabled={currentIndex === 0}
            className="flex-1"
          >
            Anterior
          </Button>
          <Button
            onClick={handleProxima}
            className="flex-1"
          >
            {currentIndex === questions.length - 1 ? 'Finalizar' : 'Próxima'}
          </Button>
        </div>
      </Card>
    </div>
  );
}
