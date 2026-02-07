# Runas e Ferro Studio (SaaS)

Plataforma full-stack em pt-BR para jogar **Runas e Ferro** dentro do site, com campanhas, fichas completas, sessões e combate por turnos. Inclui sala em tempo real, IA copiloto, modo IA mestre e voz opcional (STT/TTS).

## Stack

- **Next.js (App Router) + TypeScript**
- **UI**: Tailwind + componentes utilitários
- **DB**: Postgres (Neon/Supabase/local)
- **Auth**: NextAuth (email, Google opcional)
- **Realtime**: WebSockets via Pusher (configurável)
- **Storage**: S3/R2
- **Observabilidade**: logs estruturados (Sentry opcional)
- **Testes**: Playwright (fluxo Demo)

> Escolhas técnicas: Pusher para realtime (baixa latência e escalabilidade) e S3/R2 para arquivos (compatível com Next.js + upload seguro). RAG usa conteúdo do livro básico indexado no banco (RulePage/RuleIndex).

## Requisitos atendidos (MVP real)

- Campanhas, personagens e sessões com permissões (Mestre/Jogador).
- Sala em tempo real com chat, logs, rolagens e turn tracker.
- IA com guardrails + protocolo de turno para IA mestre.
- Voz opcional com Web Speech API (STT/TTS) e fallback para texto.
- Resumos automáticos (curto, longo e narrado).
- Viewer de regras com conteúdo do PDF ingerido em Markdown.

## Setup local

1) Instale dependências:

```bash
npm install
```

2) Copie o `.env.example`:

```bash
cp .env.example .env
```

3) Suba Postgres local (exemplo com Docker):

```bash
docker run --name runas-ferro-db -e POSTGRES_PASSWORD=postgres -p 5432:5432 -d postgres:15
```

4) Aplique as migrações:

```bash
npm run prisma:migrate
```

5) Seed de dados de exemplo (1 campanha, 3 personagens, 1 sessão e 1 combate):

```bash
npm run prisma:seed
```

6) Rode o app:

```bash
npm run dev
```

Acesse `http://localhost:3000` e use a página **Demo** para navegar pelo fluxo completo.

## Deploy (Vercel + Supabase/Neon)

1) Crie um banco Postgres no Supabase ou Neon.
2) Configure as variáveis de ambiente no Vercel (baseadas no `.env.example`).
3) Rode as migrações:

```bash
npx prisma migrate deploy
```

4) Opcional: rode o seed em ambiente de staging para demo.

## Fluxo Demo

A página `/demo` contém o roteiro de fluxo completo:

1. Criar campanha
2. Criar personagens
3. Abrir sala em tempo real
4. Iniciar combate por turnos com rolagens
5. Encerrar sessão e gerar resumo automático

## Ingestão do PDF e viewer de regras

- Conteúdo está em `data/rules/runas-e-ferro.md`.
- Para indexar (full-text/embeddings), use `RulePage` e `RuleIndex` no Prisma.
- O viewer é exibido em `/regras` e pode ser aberto como painel lateral na sala.

## IA e guardrails

- Respostas em pt-BR.
- Sem gore explícito, sem conteúdo sexual explícito.
- Sem inventar regra: se não achar no livro, responder **"não achei"** e sugerir regra da mesa.

## Testes

```bash
npm run test:e2e
```

## Estrutura de dados mínima (tabelas)

- users
- campaigns
- campaign_members (role)
- characters
- sessions
- session_participants
- room_messages
- dice_rolls
- combat_state
- character_state
- handouts
- rule_pages
- rule_index
- ai_summaries
