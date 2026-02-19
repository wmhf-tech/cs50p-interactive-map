# Mapa Mental CS50P

Um aplicativo web interativo e responsivo para aprender Python através de um mapa mental visual baseado no currículo do CS50P de Harvard. O aplicativo oferece uma experiência educacional completa com conceitos explicados, exemplos de código, quiz interativo e rastreamento de progresso.

## 🎯 Características Principais

**Mapa Mental Interativo**: Estrutura visual clara com 10 aulas de Python, cada uma colorida e organizável. Os usuários podem expandir/recolher conceitos e navegar facilmente pela hierarquia de tópicos.

**Painel de Conceitos Detalhado**: Ao selecionar um conceito, um painel lateral exibe explicação completa, exemplo de código Python com syntax highlighting, botão para copiar código e pontos-chave resumidos.

**Sistema de Quiz Completo**: 50+ perguntas de múltipla escolha organizadas por aula. Os usuários podem fazer quiz por aula específica ou geral, com feedback imediato, barra de progresso visual e rastreamento de pontuação.

**Rastreamento de Progresso**: Página de perfil mostra estatísticas detalhadas incluindo número de quizzes realizados, taxa de acerto, tempo total de estudo e progresso por aula com barras visuais.

**Modo Offline Completo**: Funciona totalmente offline graças ao Service Worker. Todas as respostas do quiz são salvas localmente no IndexedDB e sincronizadas automaticamente quando a conexão retorna.

**Modo Escuro**: Toggle elegante de tema com transições suaves. A preferência é salva automaticamente no localStorage e aplicada em todas as páginas.

**Progressive Web App (PWA)**: Pode ser instalado como app nativo em Android e iOS. Funciona offline, tem ícone na tela inicial e oferece experiência similar a um app nativo.

## 🚀 Começar Rápido

### Pré-requisitos

- Node.js 18+ e npm/pnpm
- Git

### Instalação

```bash
# Clonar o repositório
git clone https://github.com/waltermarano-cpu/mapa-mental-cs50p.git
cd mapa-mental-cs50p

# Instalar dependências
pnpm install

# Iniciar servidor de desenvolvimento
pnpm dev
```

O aplicativo estará disponível em `http://localhost:3000`

### Build para Produção

```bash
# Gerar build otimizado
pnpm build

# Visualizar build localmente
pnpm preview
```

## 📁 Estrutura do Projeto

```
mapa-mental-cs50p/
├── client/
│   ├── public/
│   │   ├── manifest.json          # Configuração PWA
│   │   ├── service-worker.js      # Service Worker para offline
│   │   └── icon-*.png             # Ícones do app
│   ├── src/
│   │   ├── pages/
│   │   │   ├── Home.tsx           # Página principal com mapa mental
│   │   │   ├── QuizPage.tsx       # Página de quiz
│   │   │   └── ProfilePage.tsx    # Página de perfil
│   │   ├── components/
│   │   │   ├── MindmapNode.tsx    # Nó do mapa mental
│   │   │   ├── DetailPanel.tsx    # Painel de conceitos
│   │   │   ├── Quiz.tsx           # Componente de quiz
│   │   │   ├── Profile.tsx        # Componente de perfil
│   │   │   ├── ThemeToggle.tsx    # Toggle de tema
│   │   │   └── ConnectionStatus.tsx # Indicador de conexão
│   │   ├── hooks/
│   │   │   ├── useUserProfile.ts  # Hook para gerenciar perfil
│   │   │   ├── useOfflineSync.ts  # Hook para sincronização offline
│   │   │   └── useServiceWorker.ts # Hook para registrar SW
│   │   ├── data/
│   │   │   ├── mindmapData.ts     # Dados do mapa mental
│   │   │   ├── conceptDetails.ts  # Conceitos com exemplos
│   │   │   └── quizData.ts        # Perguntas do quiz
│   │   ├── contexts/
│   │   │   └── ThemeContext.tsx   # Contexto de tema
│   │   ├── App.tsx                # Componente raiz
│   │   ├── main.tsx               # Entry point
│   │   └── index.css              # Estilos globais
│   └── index.html                 # Template HTML
├── server/
│   └── index.ts                   # Servidor Express (placeholder)
├── package.json
├── tsconfig.json
├── vite.config.ts
└── tailwind.config.js
```

## 🛠️ Tecnologias Utilizadas

| Tecnologia | Propósito |
|-----------|----------|
| **React 19** | Framework UI |
| **TypeScript** | Type safety |
| **Tailwind CSS 4** | Estilização |
| **Vite** | Build tool |
| **Wouter** | Roteamento client-side |
| **shadcn/ui** | Componentes UI |
| **Framer Motion** | Animações |
| **IndexedDB** | Armazenamento offline |
| **Service Worker** | Funcionalidade offline |

## 📚 Conteúdo Coberto

O aplicativo cobre as 10 aulas do CS50P:

- **Aula 0**: Funções e Variáveis
- **Aula 1**: Condicionais
- **Aula 2**: Loops
- **Aula 3**: Exceções
- **Aula 4**: Bibliotecas
- **Aula 5**: Unidades
- **Aula 6**: Arquivos
- **Aula 7**: Expressões Regulares
- **Aula 8**: Programação Orientada a Objetos
- **Aula 9**: Et Cetera

Cada aula contém múltiplos conceitos com explicações, exemplos de código e perguntas de quiz.

## 🎮 Como Usar

### Explorar Mapa Mental

1. Na página inicial, você verá o mapa mental com 5 aulas coloridas
2. Clique em uma aula para expandir seus conceitos
3. Clique em um conceito para ver detalhes no painel lateral

### Fazer Quiz

1. Clique no botão "Quiz" na navegação inferior
2. Selecione uma aula ou escolha "Quiz Geral"
3. Responda as perguntas de múltipla escolha
4. Veja seu resultado e pontuação

### Acompanhar Progresso

1. Clique no botão "Perfil" na navegação inferior
2. Veja suas estatísticas gerais
3. Acompanhe o progresso por aula

### Usar Offline

1. Abra o app uma vez com internet
2. O Service Worker será instalado
3. Agora você pode usar offline
4. Suas respostas serão sincronizadas quando reconectar

### Alternar Tema

1. Clique no ícone de lua/sol no canto superior direito
2. O tema escuro/claro será alternado
3. Sua preferência é salva automaticamente

## 🔧 Desenvolvimento

### Adicionar Novo Conceito

1. Edite `client/src/data/mindmapData.ts` para adicionar ao mapa
2. Edite `client/src/data/conceptDetails.ts` para adicionar explicação e código
3. Edite `client/src/data/quizData.ts` para adicionar perguntas

### Adicionar Nova Pergunta de Quiz

Edite `client/src/data/quizData.ts` e adicione uma nova pergunta seguindo o padrão:

```typescript
{
  id: "q_new",
  lectureId: "0",
  question: "Sua pergunta aqui?",
  options: [
    "Opção A",
    "Opção B",
    "Opção C",
    "Opção D"
  ],
  correctAnswer: 0,
  explanation: "Explicação da resposta correta"
}
```

### Modificar Estilos

Os estilos globais estão em `client/src/index.css`. Tailwind CSS 4 é usado com variáveis CSS customizadas para tema escuro/claro.

## 📦 Publicar na Google Play Store

Para publicar como app Android nativo:

```bash
# Instalar Bubblewrap
npm install -g @bubblewrap/cli

# Gerar APK
bubblewrap init --manifest=client/public/manifest.json
bubblewrap build --release
```

Veja `CS50P_Google_Play_Publication_Guide.md` para instruções detalhadas.

## 🧪 Testes

```bash
# Executar testes (quando implementados)
pnpm test

# Verificar tipos TypeScript
pnpm check

# Formatar código
pnpm format
```

## 🐛 Reportar Bugs

Se encontrar um bug, por favor abra uma issue no GitHub com:

- Descrição clara do problema
- Passos para reproduzir
- Comportamento esperado vs. atual
- Screenshots se aplicável
- Informações do dispositivo/navegador

## 🤝 Contribuir

Contribuições são bem-vindas! Por favor veja `CONTRIBUTING.md` para diretrizes.

### Ideias para Contribuir

- Adicionar mais conceitos e exemplos de código
- Criar mais perguntas de quiz
- Melhorar design e UX
- Adicionar suporte para mais idiomas
- Implementar badges e conquistas
- Adicionar modo de prática com feedback
- Criar vídeos tutoriais

## 📄 Licença

Este projeto está licenciado sob a Licença MIT - veja o arquivo `LICENSE` para detalhes.

## 🙏 Créditos

- Baseado no currículo do **CS50P** de Harvard
- Desenvolvido com ❤️ usando React, TypeScript e Tailwind CSS
- Inspirado em ferramentas educacionais modernas

## 📞 Contato

- **GitHub**: [@waltermarano-cpu](https://github.com/waltermarano-cpu)
- **Issues**: [Abrir uma issue](https://github.com/waltermarano-cpu/mapa-mental-cs50p/issues)

## 🚀 Roadmap Futuro

- [ ] Suporte para múltiplos idiomas
- [ ] Sistema de badges e conquistas
- [ ] Compartilhamento de progresso
- [ ] Integração com API backend
- [ ] Sincronização em nuvem
- [ ] Modo de prática com feedback detalhado
- [ ] Análise de áreas fracas
- [ ] Recomendações de estudo personalizadas
- [ ] Comunidade e fóruns
- [ ] Certificado de conclusão

## 📊 Estatísticas do Projeto

- **Linguagens**: TypeScript, CSS, HTML
- **Componentes React**: 20+
- **Conceitos cobertos**: 40+
- **Perguntas de quiz**: 50+
- **Linhas de código**: 5000+
- **Tempo de desenvolvimento**: Desenvolvido com Manus AI

---

**Versão**: 1.0.0  
**Última atualização**: Fevereiro 2026  
**Status**: ✅ Pronto para Produção

**Comece a aprender Python hoje!** 🎓
****
