# Guia de Contribuição para o Projeto Mapa Mental CS50P

Bem-vindo(a) ao projeto Mapa Mental CS50P! Agradecemos o seu interesse em contribuir para tornar esta ferramenta ainda melhor. Este guia tem como objetivo fornecer todas as informações necessárias para que você possa colaborar de forma eficaz e harmoniosa.

## 1. Introdução

### Boas-vindas ao Colaborador

Seja muito bem-vindo(a) à comunidade de colaboradores do Mapa Mental CS50P! Sua ajuda é fundamental para o crescimento e aprimoramento contínuo deste projeto. Queremos que sua experiência de contribuição seja gratificante e produtiva.

### Visão Geral do Projeto

O "Mapa Mental CS50P" é uma Progressive Web App (PWA) interativa, desenvolvida com **React + Vite + TypeScript**, projetada para auxiliar no estudo do curso CS50's Introduction to Programming with Python. Ele oferece um mapa mental dinâmico, sistema de quiz, perfil de usuário com rastreamento de progresso, e suporte a modo offline. O projeto está hospedado no GitHub e preparado para futura publicação na Google Play Store.

### Objetivos da Colaboração

Nosso principal objetivo é criar uma ferramenta educacional robusta e acessível. Suas contribuições podem nos ajudar a:

- Melhorar a experiência do usuário (UX) e a interface (UI).

- Adicionar novas funcionalidades e aprimorar as existentes.

- Corrigir bugs e otimizar o desempenho.

- Expandir o conteúdo educacional e a documentação.

- Garantir a qualidade e a estabilidade do aplicativo.

## 2. Acesso ao Projeto

### Como Acessar Através do Link Compartilhado

O projeto pode ser acessado de diversas formas, dependendo do tipo de contribuição que você deseja fazer. Para colaboradores externos, o acesso pode ser facilitado através de um link compartilhado que direciona para o repositório no GitHub ou para uma instância de desenvolvimento específica.

### Diferentes Tipos de Acesso Possíveis

- **GitHub:** O repositório oficial do projeto é o ponto central para todas as contribuições de código, documentação e gerenciamento de *issues*.

- **Ambiente de Desenvolvimento:** Para testar funcionalidades ou desenvolver, você precisará configurar um ambiente local.

- **Documentação:** A documentação do projeto, incluindo este guia, está disponível no repositório.

### Requisitos Técnicos Necessários

Para contribuir com código, você precisará de:

- Uma conta no GitHub.

- Conhecimento básico de Git e GitHub.

- Conhecimento de JavaScript, TypeScript e React.

## 3. Entendendo a Estrutura

### Arquitetura do Projeto

O projeto é construído com as seguintes tecnologias principais:

- **Frontend:** React 18 com Vite

- **Linguagem:** TypeScript

- **Estilização:** Tailwind CSS (com dark mode permanente)

- **Componentes UI:** shadcn/ui

- **Ícones:** Lucide React

- **Armazenamento Offline:** IndexedDB

- **PWA:** Service Worker

### Principais Diretórios e Arquivos

Para facilitar a navegação e compreensão do projeto, apresentamos uma visão geral da estrutura de diretórios. Esta organização visa modularidade e clareza:

```python
.github/
├── workflows/ # Workflows de CI/CD (ex: GitHub Actions para testes e deploy)
public/
├── # Arquivos estáticos que são servidos diretamente (ex: index.html, manifest.json, ícones)
src/
├── assets/ # Imagens, ícones personalizados, fontes e outros recursos estáticos
├── components/ # Componentes React reutilizáveis e genéricos (ex: botões, cards, modais)
├── hooks/ # Custom Hooks do React para lógica reutilizável de estado e efeitos
├── lib/ # Utilitários e configurações específicas (ex: inicialização do shadcn/ui, funções auxiliares)
├── pages/ # Componentes de página, representando as diferentes rotas da aplicação
├── services/ # Lógica de negócio e integração com APIs externas ou IndexedDB
├── store/ # Gerenciamento de estado global da aplicação (ex: usando Zustand ou Redux)
├── types/ # Definições de tipos TypeScript para interfaces, props, estados, etc.
├── utils/ # Funções utilitárias gerais que não se encaixam em outras categorias
├── App.tsx # Componente principal da aplicação, onde as rotas e o layout global são definidos
├── main.tsx # Ponto de entrada da aplicação, responsável por renderizar o componente App
├── index.css # Estilos globais da aplicação, incluindo as diretivas do Tailwind CSS
├── vite-env.d.ts # Definições de ambiente do Vite para TypeScript
```

*Onde seriam úteis capturas de tela/diagramas:* Um diagrama de componentes ou um mapa visual da estrutura de pastas seria muito útil aqui para colaboradores visuais.

### Tecnologias Utilizadas

Uma lista detalhada das principais tecnologias que compõem o Mapa Mental CS50P:

- **React 18:** Biblioteca JavaScript declarativa e eficiente para construção de interfaces de usuário interativas.

- **Vite:** Ferramenta de *build* de próxima geração que oferece uma experiência de desenvolvimento extremamente rápida para projetos web modernos.

- **TypeScript:** Um *superset* do JavaScript que adiciona tipagem estática opcional, melhorando a robustez do código e a produtividade do desenvolvedor.

- **Tailwind CSS:** Um *framework* CSS utilitário que permite construir designs personalizados rapidamente, com foco em responsividade e manutenção. O projeto utiliza **dark mode permanente**.

- **Lucide React:** Uma biblioteca de ícones de código aberto, leve e altamente personalizável, integrada diretamente aos componentes React.

- **shadcn/ui:** Uma coleção de componentes de UI reutilizáveis, acessíveis e com estilo personalizável, construídos com Tailwind CSS e Radix UI.

- **IndexedDB:** Uma API de baixo nível para armazenamento de dados estruturados no lado do cliente, essencial para o funcionamento offline do PWA.

- **Service Worker:** Um *script* que o navegador executa em segundo plano, separado da página web, permitindo funcionalidades como *caching* de recursos para modo offline e notificações *push*, características cruciais para PWAs.

### Funcionalidades Implementadas

O Mapa Mental CS50P já conta com as seguintes funcionalidades:

- **Mapa Mental Interativo:** Uma representação visual dinâmica do conteúdo do curso CS50P, permitindo navegação e exploração dos tópicos.

- **Sistema de Quiz:** Módulos de perguntas e respostas para testar o conhecimento do usuário sobre os conceitos do curso.

- **Perfil de Usuário:** Funcionalidade para rastrear o progresso do usuário, salvar preferências e personalizar a experiência.

- **Modo Offline:** Capacidade de acessar o conteúdo e algumas funcionalidades mesmo sem conexão com a internet, graças ao *Service Worker* e *IndexedDB*.

- **Progressive Web App (PWA):** Oferece uma experiência de aplicativo nativo diretamente no navegador, com instalação na tela inicial e acesso offline.

## 4. Configuração do Ambiente Local

Para começar a desenvolver e testar suas contribuições, siga estes passos para configurar seu ambiente local:

### Pré-requisitos

Certifique-se de ter as seguintes ferramentas instaladas em sua máquina. Elas são essenciais para o desenvolvimento com React, Vite e TypeScript:

- **Node.js:** Versão 18 ou superior. É o ambiente de execução JavaScript que permite rodar o servidor de desenvolvimento e as ferramentas de *build*. Você pode baixá-lo em [nodejs.org](https://nodejs.org/).

- **pnpm:** Um gerenciador de pacotes rápido e eficiente que otimiza o uso de espaço em disco e a instalação de dependências. Instale-o globalmente com `npm install -g pnpm`.

- **Git:** O sistema de controle de versão distribuído padrão da indústria. É fundamental para clonar o repositório, gerenciar branches e enviar suas contribuições. Baixe em [git-scm.com](https://git-scm.com/).

### Clonagem do Repositório

Primeiro, faça um *fork* do repositório principal do Mapa Mental CS50P no GitHub para sua conta pessoal. Em seguida, clone o seu *fork* para sua máquina local usando o comando `git clone`:

```bash
git clone https://github.com/SEU_USUARIO/mapa-mental-cs50p.git
cd mapa-mental-cs50p
```

*Substitua **`SEU_USUARIO`** pelo seu nome de usuário no GitHub.*

### Instalação de Dependências

Após navegar até o diretório do projeto, instale todas as dependências necessárias usando o `pnpm`. Este comando lerá o arquivo `package.json` e instalará todos os pacotes listados:

```bash
pnpm install
```

*Troubleshooting Comum:* Se você encontrar erros durante a instalação, verifique se o Node.js e o pnpm estão instalados corretamente e em suas versões recomendadas. Tente limpar o cache do pnpm com `pnpm store prune` e tente `pnpm install` novamente.

### Como Rodar o Projeto Localmente

Para iniciar o servidor de desenvolvimento e visualizar o aplicativo em seu navegador, execute o seguinte comando:

```bash
pnpm dev
```

O aplicativo estará disponível em `http://localhost:5173` (ou outra porta, se a 5173 estiver em uso e o Vite automaticamente selecionar outra ). O Vite oferece *Hot Module Replacement (HMR)*, o que significa que suas alterações no código serão refletidas instantaneamente no navegador sem a necessidade de recarregar a página.

### Como Testar as Funcionalidades

Após rodar o projeto localmente, dedique um tempo para explorar todas as funcionalidades no navegador. Isso inclui:

- Navegar pelo mapa mental interativo.

- Participar dos quizzes e verificar as respostas.

- Criar e gerenciar um perfil de usuário.

- Testar o modo offline: para isso, carregue a aplicação, depois desconecte sua internet e veja se o conteúdo ainda está acessível. (Uma captura de tela mostrando o aplicativo funcionando offline seria útil aqui).

## 5. Formas de Contribuição

Existem diversas maneiras de contribuir para o projeto, mesmo que você não seja um desenvolvedor. Valorizamos todas as formas de ajuda!

- **Reportar Bugs e Problemas:** Encontrou um comportamento inesperado, um erro visual ou uma falha? Abra uma [Issue no GitHub](https://github.com/SEU_USUARIO/mapa-mental-cs50p/issues) descrevendo-o detalhadamente. Inclua passos para reproduzir, o comportamento esperado e o comportamento observado.

- **Sugerir Melhorias e Novas Funcionalidades:** Tem uma ideia para tornar o projeto mais útil, intuitivo ou completo? Compartilhe-a abrindo uma Issue com a tag `enhancement` ou `feature request`.

- **Contribuir com Código:** Desenvolva novas funcionalidades, corrija bugs, otimize o código existente ou melhore a infraestrutura. Veja a seção 6 para mais detalhes sobre o processo de contribuição de código.

- **Melhorar Documentação:** Ajude a manter este guia, o `README.md` e outras documentações técnicas claras, precisas e atualizadas. Uma boa documentação é crucial para a comunidade.

- **Traduzir Conteúdo:** Contribua com a internacionalização do aplicativo para outros idiomas. Atualmente, estamos focando na tradução para PT/EN, mas outras línguas são bem-vindas.

- **Criar Conteúdo Educacional:** Ajude a expandir o banco de perguntas do quiz, adicione novos conceitos ao mapa mental, refine as explicações existentes ou crie novos módulos de aprendizado.

## 6. Processo de Contribuição com Código

Para contribuições que envolvem alterações no código-fonte, siga o fluxo de trabalho padrão do GitHub. Isso garante que as alterações sejam revisadas, testadas e integradas de forma organizada.

### Fork do Repositório

1. Acesse o repositório principal do projeto no GitHub: `https://github.com/SEU_USUARIO/mapa-mental-cs50p`.

1. Clique no botão **"Fork"** no canto superior direito da página para criar uma cópia do repositório em sua conta pessoal do GitHub. (Uma captura de tela do botão "Fork" seria útil aqui ).

### Criação de Branches

É uma boa prática trabalhar em uma *branch* separada para cada nova funcionalidade ou correção de bug, em vez de trabalhar diretamente na branch `main`. Isso facilita a revisão e a integração do código.

```bash
# Certifique-se de estar na branch principal e atualizado
git checkout main
git pull origin main

# Crie uma nova branch com um nome descritivo
git checkout -b feature/minha-nova-funcionalidade
# ou
git checkout -b bugfix/correcao-de-login
# ou
git checkout -b docs/atualizar-contribuicao
```

Use prefixos como `feature/`, `bugfix/`, `docs/`, `refactor/` para nomear suas branches, indicando o propósito da alteração.

### Padrões de Código e Estilo

Para manter a consistência e a legibilidade do código, seguimos alguns padrões:

- **Formatação:** Utilizamos **ESLint** e **Prettier** para formatação automática do código. Certifique-se de que seu editor de código esteja configurado para usá-los ou execute `pnpm format` antes de commitar para garantir que seu código esteja formatado corretamente.

- **Qualidade:** Escreva código limpo, legível, modular e bem comentado. Priorize a clareza e a manutenibilidade.

- **TypeScript:** Utilize os recursos do TypeScript para tipagem forte, garantindo a segurança e a previsibilidade do código.

### Como Fazer Commits Significativos

Adotamos o padrão [**Conventional Commits**](https://www.conventionalcommits.org/en/v1.0.0/) para mensagens de commit. Este padrão ajuda a manter um histórico de projeto claro, facilita a rastreabilidade das mudanças e pode ser usado para gerar automaticamente *changelogs*.

**Estrutura de um commit:**

```
<tipo>(<escopo>): <descrição curta>

[corpo opcional]

[rodapé opcional]
```

**Tipos comuns:**

- `feat`: Uma nova funcionalidade.

- `fix`: Uma correção de bug.

- `docs`: Alterações na documentação.

- `style`: Alterações que não afetam o significado do código (espaços em branco, formatação, ponto e vírgula ausente, etc.).

- `refactor`: Uma mudança de código que não adiciona uma funcionalidade nem corrige um bug.

- `perf`: Uma mudança de código que melhora o desempenho.

- `test`: Adição de testes ausentes ou correção de testes existentes.

- `build`: Alterações que afetam o sistema de *build* ou dependências externas.

- `ci`: Alterações nos arquivos e *scripts* de configuração de CI.

- `chore`: Outras alterações que não modificam o código-fonte ou arquivos de teste.

- `revert`: Reverte um commit anterior.

**Exemplos de commits:**

- `feat: adiciona nova funcionalidade de quiz para o módulo de funções`

- `fix(auth): corrige bug de carregamento de perfil após login`

- `docs: atualiza guia de contribuição com seção de Conventional Commits`

### Criação de Pull Requests (PRs)

Depois de commitar suas alterações e enviá-las para o seu *fork* no GitHub, você estará pronto para abrir um Pull Request (PR):

1. Envie sua branch para o seu *fork* remoto: `git push origin feature/minha-nova-funcionalidade`.

1. Vá para o repositório original do projeto no GitHub. Você verá um botão ou uma notificação para **"Compare & pull request"** ou **"New Pull Request"**. Clique nele. (Uma captura de tela do processo de criação de PR seria útil aqui).

1. Certifique-se de que você está comparando sua branch (`feature/minha-nova-funcionalidade`) com a branch `main` do repositório original.

1. Forneça um título claro e uma descrição detalhada do seu PR. Utilize o template de PR (se houver) e explique:
  - **O que** foi feito (resumo das mudanças).
  - **Por que** foi feito (a motivação, qual problema resolve ou qual funcionalidade adiciona).
  - **Como** foi feito (uma breve explicação da abordagem técnica).
  - **Como testar** (passos claros para que os revisores possam testar suas mudanças).
  - **Screenshots/Vídeos:** Se aplicável, inclua capturas de tela ou vídeos para demonstrar mudanças visuais ou novas funcionalidades.

### Processo de Revisão

Seu Pull Request será revisado por um dos mantenedores do projeto. Esteja aberto(a) a *feedback* e pronto(a) para fazer ajustes, se necessário. O objetivo da revisão é garantir a qualidade, a consistência e a conformidade do código com os padrões do projeto. Responda aos comentários de forma construtiva e faça as alterações solicitadas.

## 7. Diretrizes e Boas Práticas

Para garantir um ambiente de colaboração eficiente e um código de alta qualidade, siga estas diretrizes:

### Padrões de Nomenclatura

- **Variáveis e Funções:** Utilize `camelCase` (ex: `minhaVariavel`, `calcularTotal`).

- **Componentes React:** Utilize `PascalCase` (ex: `MeuComponente`, `BotaoPrimario`).

- **Arquivos e Pastas:** Utilize `kebab-case` (ex: `meu-componente.tsx`, `util-functions.ts`).

### Estrutura de Commits (Conventional Commits)

Conforme detalhado na seção 6, siga rigorosamente o padrão [Conventional Commits](https://www.conventionalcommits.org/en/v1.0.0/). Isso é fundamental para a organização do histórico do projeto.

### Como Escrever Boas Descrições de PR

Uma descrição de Pull Request bem elaborada é crucial para um processo de revisão eficiente. Além dos pontos mencionados na seção 6, considere:

- **Contexto:** Explique o problema que você está resolvendo ou a funcionalidade que está implementando.

- **Alternativas:** Se você considerou outras abordagens, mencione-as e explique por que a escolhida foi a melhor.

- **Impacto:** Descreva qualquer impacto potencial nas áreas existentes do projeto.

- **Referências:** Linke para *issues* relacionadas, documentação externa ou discussões relevantes.

### Testes e Validação

- **Testes Locais:** Sempre teste suas alterações minuciosamente em seu ambiente local antes de enviar um PR. Verifique diferentes cenários de uso.

- **Testes Automatizados:** Se possível, adicione testes unitários ou de integração para novas funcionalidades ou correções de bugs. Isso ajuda a prevenir regressões e garante a estabilidade a longo prazo.

### Responsividade e Acessibilidade

- **Responsividade:** Certifique-se de que suas contribuições sejam responsivas e funcionem perfeitamente em diferentes tamanhos de tela (desktops, tablets, celulares). Utilize as classes do Tailwind CSS para isso.

- **Acessibilidade (A11y):** Priorize a acessibilidade, garantindo que o aplicativo possa ser usado por pessoas com deficiência. Utilize atributos ARIA, garanta contraste de cores adequado e navegação por teclado. (Uma ferramenta de auditoria de acessibilidade como o Lighthouse seria útil aqui).

## 8. Áreas Prioritárias para Contribuição

Estamos buscando ativamente contribuições nas seguintes áreas, que representam as maiores necessidades e oportunidades de impacto no projeto:

- **Internacionalização PT/EN:** Ajude a traduzir o aplicativo para português e inglês, garantindo que o conteúdo seja culturalmente apropriado e que a estrutura de internacionalização seja robusta. Esta é uma área em andamento.

-*   **Expansão e Dinamização do Sistema de Quiz (Alta Prioridade):** A funcionalidade de Quiz é central para a experiência de aprendizado, mas atualmente é estática e limitada. Buscamos contribuições para transformá-la em uma ferramenta de estudo verdadeiramente dinâmica e engajadora. As principais necessidades são:
    *   **Criação de um Banco de Questões Robusto:** Contribua com a criação de um vasto banco de dados de perguntas para cada aula. O objetivo é permitir que, a cada nova tentativa, o usuário registrado encontre questões inéditas.
    *   **Implementação da Lógica de Sorteio:** Desenvolver a lógica no *backend* para sortear aleatoriamente um número fixo de perguntas (ex: 5) do banco de dados da aula correspondente, garantindo que as perguntas não se repitam nas últimas tentativas.
    *   **Aprimoramento do Quiz Geral:** Com um banco de questões maior, o "Quiz Geral" se tornará mais desafiador e valioso, testando o conhecimento do usuário de forma abrangente e imprevisível. **Melhorias de UX/UI:** Sugestões e implementações para tornar a interface mais intuitiva, agradável e eficiente. Isso inclui refinar fluxos de usuário, melhorar a navegação e a estética geral.

- **Otimizações de Performance:** Identificar e resolver gargalos de desempenho, como carregamento lento de dados, renderização excessiva ou uso ineficiente de recursos, para um aplicativo mais rápido e fluido.

- **Testes Automatizados:** Adicionar testes unitários para componentes e funções, testes de integração para fluxos de usuário e testes *end-to-end* para garantir a estabilidade e a funcionalidade completa do aplicativo.

- **Documentação:** Melhorar a clareza e a abrangência de toda a documentação do projeto, incluindo o `README.md`, guias de uso e documentação técnica interna.

## 9. Comunicação e Suporte

Uma comunicação eficaz é a chave para uma colaboração bem-sucedida. Utilize os canais apropriados para suas interações:

### Canais de Comunicação

- **GitHub Issues:** Para reportar bugs, sugerir funcionalidades, discutir ideias específicas e acompanhar o progresso de tarefas. Utilize as *labels* apropriadas para categorizar suas *issues*.

- **GitHub Discussions (se habilitado):** Para conversas mais gerais, perguntas abertas, troca de conhecimentos e *brainstorming* que não se encaixam diretamente em uma *issue*.

### Como Pedir Ajuda

Se você tiver dúvidas, encontrar dificuldades ou precisar de ajuda, sinta-se à vontade para:

- Abrir uma Issue no GitHub com a tag `question` ou `help wanted`.

- Comentar em um PR ou Issue existente, pedindo esclarecimentos ou assistência.

- Entrar em contato com os mantenedores do projeto através dos canais de comunicação disponíveis.

### Onde Reportar Problemas

Todos os bugs e problemas devem ser reportados através das [Issues do GitHub](https://github.com/SEU_USUARIO/mapa-mental-cs50p/issues). Ao abrir uma *issue*, preencha o template de bug (se houver) com o máximo de detalhes possível.

### Etiqueta de Colaboração

Para manter um ambiente positivo e produtivo:

- Seja respeitoso(a) e acolhedor(a) com todos os membros da comunidade, independentemente do nível de experiência.

- Mantenha as discussões focadas, construtivas e profissionais.

- Forneça *feedback* de forma clara, útil e empática.

- Assuma boas intenções e seja paciente.

## 10. Recursos Úteis

Para aprofundar seus conhecimentos e auxiliar em suas contribuições, consulte os seguintes recursos:

- [Documentação React](https://react.dev/): Guia oficial para aprender e usar React.

- [Documentação Vite](https://vitejs.dev/): Documentação completa sobre a ferramenta de *build* Vite.

- [Documentação TypeScript](https://www.typescriptlang.org/docs/): Referência oficial para a linguagem TypeScript.

- [Documentação Tailwind CSS](https://tailwindcss.com/docs): Guia abrangente para o *framework* CSS Tailwind.

- [Documentação Lucide React](https://lucide.dev/icons/): Biblioteca de ícones para React.

- [Documentação shadcn/ui](https://ui.shadcn.com/docs): Componentes de UI construídos com Radix UI e Tailwind CSS.

- [Conventional Commits](https://www.conventionalcommits.org/en/v1.0.0/): Especificação para mensagens de commit padronizadas.

- [Guia de Markdown](https://www.markdownguide.org/): Aprenda a usar a sintaxe Markdown para documentação.

- [Git Handbook](https://guides.github.com/introduction/git-handbook/): Um guia prático para começar com Git.

- [GitHub Flow](https://docs.github.com/pt/get-started/quickstart/github-flow): O fluxo de trabalho recomendado para colaboração no GitHub.

## FAQ - Perguntas Frequentes

**P: Preciso ser um desenvolvedor para contribuir?**

R: Não! Existem muitas formas valiosas de contribuir, como reportar bugs, sugerir melhorias, traduzir conteúdo, criar material educacional ou testar funcionalidades. Sua perspectiva é sempre bem-vinda.

**P: Onde posso encontrar tarefas para começar?**

R: Verifique as [Issues no GitHub](https://github.com/SEU_USUARIO/mapa-mental-cs50p/issues) com as tags `good first issue` (boas para iniciantes) ou `help wanted` (precisa de ajuda). Elas são um ótimo ponto de partida.

**P: Qual é a licença do projeto?**

R: O projeto é distribuído sob a [Licença MIT](https://opensource.org/licenses/MIT). Isso significa que você pode usá-lo, modificá-lo e distribuí-lo livremente, desde que inclua a licença original e o aviso de direitos autorais.

**P: Como minhas contribuições são reconhecidas?**

R: Todas as contribuições são valorizadas! Seu nome/usuário do GitHub será adicionado à seção de contribuidores no arquivo `README.md` do projeto (se aplicável), seus commits e Pull Requests farão parte do histórico oficial do projeto no Git.

## Checklist para a Primeira Contribuição

Este checklist rápido pode ajudar você a garantir que sua primeira contribuição de código siga os passos recomendados:

- [ ] Fiz um *fork* do repositório principal para minha conta do GitHub.

- [ ] Clonei o meu *fork* localmente para minha máquina.

- [ ] Instalei todas as dependências do projeto com `pnpm install`.

- [ ] Rodei o projeto localmente com `pnpm dev` e verifiquei se tudo funciona.

- [ ] Criei uma nova *branch* com um nome descritivo para minhas alterações (ex: `feature/nova-funcionalidade`).

- [ ] Fiz commits significativos, seguindo o padrão [Conventional Commits](https://www.conventionalcommits.org/en/v1.0.0/).

- [ ] Testei minhas alterações localmente em diferentes cenários.

- [ ] Abri um Pull Request com um título claro e uma descrição detalhada, incluindo como testar as mudanças.

## Exemplos de Boas Contribuições

Para inspirar suas contribuições, aqui estão alguns exemplos do que consideramos uma boa contribuição:

- Um Pull Request que corrige um bug específico, inclui um teste para ele e uma descrição clara do problema e da solução.

- Uma Issue que descreve detalhadamente um problema de UX, sugere uma solução e, se possível, inclui *mockups* ou *wireframes*.

- Uma tradução completa e revisada de uma seção do aplicativo ou da documentação.

- A adição de 10 novas perguntas de quiz bem formuladas, com explicações claras para as respostas.

- Um PR que otimiza o desempenho de um componente, com métricas antes e depois da otimização.

## Como o Projeto Está Organizado no GitHub

Utilizamos os recursos do GitHub para gerenciar o fluxo de trabalho e a colaboração:

- **Issues:** São usadas para rastrear bugs, melhorias, novas funcionalidades e discussões. Cada *issue* pode ter *labels* para categorização (ex: `bug`, `enhancement`, `documentation`, `good first issue`).

- **Projects:** Utilizamos os GitHub Projects para organizar o trabalho em andamento, planejar futuras iterações e visualizar o progresso das tarefas em quadros Kanban ou *roadmaps*.

- **Milestones:** São usadas para definir metas e prazos para conjuntos de funcionalidades ou para o lançamento de novas versões do aplicativo.

## Reconhecimento das Contribuições

Todas as contribuições, grandes ou pequenas, são extremamente valorizadas e reconhecidas. Acreditamos que cada esforço contribui para o sucesso do projeto. As formas de reconhecimento incluem:

- **Lista de Contribuidores:** Seu nome/usuário do GitHub será adicionado à seção de contribuidores no arquivo `README.md` do projeto (se aplicável), seus commits e Pull Requests farão parte do histórico oficial do projeto no Git.

- **Menções:** Contribuidores significativos podem ser mencionados em anúncios de novas versões, posts de blog ou outras comunicações do projeto.

## Código de Conduta

Para garantir um ambiente acolhedor, inclusivo e respeitoso para todos os colaboradores, esperamos que todos sigam nosso [Código de Conduta](CODE_OF_CONDUCT.md). Este documento estabelece as expectativas de comportamento e as consequências para comportamentos inaceitáveis. Em resumo, seja gentil, inclusivo, profissional e respeitoso em todas as suas interações.

