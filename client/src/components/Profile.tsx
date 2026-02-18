import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { User, Mail, Trophy, BookOpen, Zap, BarChart3, Edit2, Save, X } from 'lucide-react';
import { useUserProfile } from '@/hooks/useUserProfile';

interface ProfileProps {
  onClose?: () => void;
}

export default function Profile({ onClose }: ProfileProps) {
  const { profile, updateNome, updateEmail, getStatistics, resetProfile, isLoaded } = useUserProfile();
  const [editMode, setEditMode] = useState(false);
  const [nome, setNome] = useState(profile.nome);
  const [email, setEmail] = useState(profile.email);
  const stats = getStatistics();

  // Sincronizar estados locais quando o profile for carregado ou atualizado
  useEffect(() => {
    setNome(profile.nome);
    setEmail(profile.email);
  }, [profile.nome, profile.email]);

  const handleSalvar = () => {
    if (nome.trim()) {
      updateNome(nome);
    }
    if (email.trim()) {
      updateEmail(email);
    }
    setEditMode(false);
  };

  const handleReset = () => {
    if (confirm('Tem certeza que deseja resetar seu perfil? Isso apagará todo o progresso.')) {
      resetProfile();
      setNome('Estudante');
      setEmail('');
    }
  };

  const getNivelColor = (nivel: string) => {
    switch (nivel) {
      case 'iniciante':
        return 'bg-blue-100 text-blue-800';
      case 'intermediário':
        return 'bg-purple-100 text-purple-800';
      case 'avançado':
        return 'bg-green-100 text-green-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="w-full max-w-2xl mx-auto p-6 space-y-6">
      {/* Header do Perfil */}
      <Card className="p-4 sm:p-6">
        <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4 mb-6">
          <div className="flex items-center gap-3 sm:gap-4 flex-1">
            <div className="w-14 h-14 sm:w-16 sm:h-16 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center flex-shrink-0">
              <User className="w-7 h-7 sm:w-8 sm:h-8 text-white" />
            </div>
            <div className="flex-1 min-w-0">
              {editMode ? (
                <div className="space-y-3">
                  <Input
                    value={nome}
                    onChange={(e) => setNome(e.target.value)}
                    placeholder="Seu nome"
                    className="font-semibold h-10"
                  />
                  <Input
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="seu@email.com"
                    type="email"
                    className="h-10"
                  />
                </div>
              ) : (
                <div>
                  <h2 className="text-xl sm:text-2xl font-bold truncate">{profile.nome}</h2>
                  {profile.email && (
                    <p className="text-sm text-muted-foreground flex items-center gap-2 mt-1 truncate">
                      <Mail className="w-4 h-4 flex-shrink-0" />
                      <span className="truncate">{profile.email}</span>
                    </p>
                  )}
                </div>
              )}
            </div>
          </div>

          <div className="flex gap-2 self-start sm:self-auto">
            {editMode ? (
              <>
                <Button size="sm" onClick={handleSalvar} className="gap-2 h-10 px-4">
                  <Save className="w-4 h-4" />
                  <span className="hidden sm:inline">Salvar</span>
                </Button>
                <Button
                  size="sm"
                  variant="outline"
                  onClick={() => {
                    setEditMode(false);
                    setNome(profile.nome);
                    setEmail(profile.email);
                  }}
                  className="h-10 w-10 p-0"
                >
                  <X className="w-4 h-4" />
                </Button>
              </>
            ) : (
              <Button
                size="sm"
                variant="outline"
                onClick={() => setEditMode(true)}
                className="gap-2 h-10 px-4"
              >
                <Edit2 className="w-4 h-4" />
                <span className="hidden sm:inline">Editar</span>
              </Button>
            )}
          </div>
        </div>

        {/* Nível e Pontos */}
        <div className="grid grid-cols-3 gap-2 sm:gap-4">
          <div className="text-center p-3 rounded-lg bg-muted">
            <Badge className={`${getNivelColor(profile.nivel)} mb-2 block w-fit mx-auto`}>
              {profile.nivel.charAt(0).toUpperCase() + profile.nivel.slice(1)}
            </Badge>
            <p className="text-xs text-muted-foreground">Nível</p>
          </div>
          <div className="text-center p-3 rounded-lg bg-muted">
            <p className="text-2xl font-bold text-primary">{profile.pontos_totais}</p>
            <p className="text-xs text-muted-foreground">Pontos</p>
          </div>
          <div className="text-center p-3 rounded-lg bg-muted">
            <p className="text-2xl font-bold text-green-600">{profile.melhor_pontuacao}</p>
            <p className="text-xs text-muted-foreground">Melhor Score</p>
          </div>
        </div>
      </Card>

      {/* Estatísticas */}
      <Card className="p-6">
        <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
          <BarChart3 className="w-5 h-5" />
          Estatísticas
        </h3>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4 mb-6">
          <div className="p-4 rounded-lg border">
            <p className="text-sm text-muted-foreground mb-1">Quizzes Completados</p>
            <p className="text-2xl font-bold">{profile.quizzes_completados}</p>
          </div>
          <div className="p-4 rounded-lg border">
            <p className="text-sm text-muted-foreground mb-1">Aulas Exploradas</p>
            <p className="text-2xl font-bold">{stats.aulas_exploradas}/10</p>
          </div>
          <div className="p-4 rounded-lg border">
            <p className="text-sm text-muted-foreground mb-1">Taxa de Acerto</p>
            <p className="text-2xl font-bold">{stats.taxa_acerto}%</p>
          </div>
          <div className="p-4 rounded-lg border">
            <p className="text-sm text-muted-foreground mb-1">Tempo Total</p>
            <p className="text-2xl font-bold">{stats.tempo_total_minutos}m</p>
          </div>
        </div>

        <div className="p-4 rounded-lg bg-blue-50 border border-blue-200">
          <p className="text-sm text-blue-900">
            <span className="font-semibold">Total de Perguntas:</span> {stats.total_perguntas} |{' '}
            <span className="font-semibold">Acertos:</span> {stats.total_acertos}
          </p>
        </div>
      </Card>

      {/* Aulas Exploradas */}
      {profile.aulas_exploradas.length > 0 && (
        <Card className="p-6">
          <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
            <BookOpen className="w-5 h-5" />
            Aulas Exploradas
          </h3>

          <div className="grid grid-cols-3 sm:grid-cols-5 gap-2">
            {Array.from({ length: 10 }).map((_, i) => (
              <div
                key={i}
                className={`p-3 rounded-lg text-center font-medium text-sm ${
                  profile.aulas_exploradas.includes(i)
                    ? 'bg-green-100 text-green-800 border border-green-300'
                    : 'bg-muted text-muted-foreground'
                }`}
              >
                Aula {i}
              </div>
            ))}
          </div>
        </Card>
      )}

      {/* Informações Adicionais */}
      <Card className="p-6">
        <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
          <Zap className="w-5 h-5" />
          Informações
        </h3>

        <div className="space-y-3 text-sm">
          <div className="flex justify-between">
            <span className="text-muted-foreground">Membro desde:</span>
            <span className="font-medium">
              {new Date(profile.data_criacao).toLocaleDateString('pt-BR')}
            </span>
          </div>
          <div className="flex justify-between">
            <span className="text-muted-foreground">Último acesso:</span>
            <span className="font-medium">
              {new Date(profile.ultimo_acesso).toLocaleDateString('pt-BR')}
            </span>
          </div>
        </div>
      </Card>

      {/* Botões de Ação */}
      <div className="flex gap-3">
        {onClose && (
          <Button variant="outline" onClick={onClose} className="flex-1">
            Voltar
          </Button>
        )}
        <Button
          variant="destructive"
          onClick={handleReset}
          className="flex-1"
        >
          Resetar Perfil
        </Button>
      </div>
    </div>
  );
}
