# MCP Fala Gaiotto

<p align="center">
  <img src="https://img.shields.io/badge/node.js-v14+-green.svg" alt="Node.js Version">
  <img src="https://img.shields.io/badge/platform-slack-4A154B.svg" alt="Platform">
  <img src="https://img.shields.io/badge/license-MIT-blue.svg" alt="License">
</p>

**Model Context Protocol (MCP) para acesso ao conteúdo do site [falagaiotto.com.br](https://www.falagaiotto.com.br) via Slack.**

Este projeto cria um aplicativo Slack que permite que qualquer pessoa acesse facilmente o conteúdo do site Fala Gaiotto diretamente nos canais do Slack, usando comandos simples.

## 🚀 Funcionalidades

- Comando Slack `/falagaiotto` para obter o conteúdo atual do site
- Extração e formatação automática do conteúdo
- Resposta formatada com título, conteúdo principal e link para o site
- Sistema de ajuda integrado via comando "ajuda falagaiotto"
- Suporte a Socket Mode para fácil implantação sem necessidade de endpoints públicos

## 📋 Pré-requisitos

- Node.js (v14 ou superior)
- Conta no Slack com permissões para criar aplicativos
- Servidor para hospedar o aplicativo (recomendamos Render ou Heroku)

## 🔧 Instalação e Configuração

### 1. Configurar o aplicativo Slack

1. Acesse [api.slack.com/apps](https://api.slack.com/apps)
2. Clique em "Create New App" e escolha "From scratch"
3. Dê um nome ao aplicativo (ex: "Fala Gaiotto") e selecione seu workspace
4. Configure as permissões:
   - Em "OAuth & Permissions", adicione os escopos: `chat:write` e `commands`
   - Em "Socket Mode", ative esta funcionalidade e gere um App-Level Token
5. Crie um comando slash em "Slash Commands":
   - Nome do comando: `/falagaiotto`
   - Descrição: "Acessa o conteúdo do site falagaiotto.com.br"

### 2. Clonar o repositório

```bash
git clone https://github.com/sergiogaiotto/mcp_falagaiotto.git
cd mcp_falagaiotto
```

### 3. Instalar dependências

```bash
npm install
```

### 4. Configurar variáveis de ambiente

Crie um arquivo `.env` com o seguinte conteúdo:

```
SLACK_BOT_TOKEN=xoxb-seu-token-bot
SLACK_SIGNING_SECRET=seu-signing-secret
SLACK_APP_TOKEN=xapp-seu-app-token
PORT=3000
```

### 5. Iniciar o servidor localmente

```bash
node app.js
```

## 🚢 Implantação

### Opção 1: Render

1. Crie uma conta no [Render](https://render.com/)
2. Clique em "New +" e selecione "Web Service"
3. Conecte seu repositório GitHub ou escolha a opção de upload manual
4. Configure o serviço:
   - Nome: "fala-gaiotto-slack"
   - Runtime: Node
   - Build Command: `npm install`
   - Start Command: `npm start`
   - Plano: Free
5. Adicione as variáveis de ambiente
6. Clique em "Create Web Service"

### Opção 2: Heroku

1. Instale o [Heroku CLI](https://devcenter.heroku.com/articles/heroku-cli)
2. Inicialize e configure:

```bash
# Login no Heroku
heroku login

# Criar app
heroku create fala-gaiotto-slack

# Definir variáveis
heroku config:set SLACK_BOT_TOKEN=xoxb-seu-token-bot
heroku config:set SLACK_SIGNING_SECRET=seu-signing-secret
heroku config:set SLACK_APP_TOKEN=xapp-seu-app-token

# Deploy
git push heroku main
```

## 🧰 Personalização

### Ajustando os seletores HTML

Se a estrutura do site mudar, você pode precisar ajustar os seletores HTML na função `extrairConteudo()` em `app.js`:

```javascript
// Extraindo o conteúdo principal (ajuste os seletores conforme necessário)
const titulo = $('title').text();
const conteudoPrincipal = $('main, #content, .content, body').text().trim();
```

### Expandindo funcionalidades

Você pode adicionar mais comandos ou recursos modificando o arquivo `app.js`. Algumas ideias:

- Busca por palavras-chave no conteúdo
- Suporte a múltiplas páginas do site
- Notificações automáticas quando o conteúdo for atualizado

## 📝 Uso no Slack

Uma vez instalado, os usuários podem:

1. Usar o comando `/falagaiotto` em qualquer canal para obter o conteúdo mais recente
2. Digitar "ajuda falagaiotto" para ver as instruções de uso

## 🔍 Solução de Problemas

| Problema | Solução |
|----------|---------|
| Comando não responde | Verifique os logs e confirme se os tokens estão corretos |
| Conteúdo não aparece | Ajuste os seletores HTML na função `extrairConteudo()` |
| Erro de Socket Mode | Verifique se o App-Level Token está correto e tem o escopo adequado |

## 📄 Licença

Este projeto está licenciado sob a licença MIT - veja o arquivo [LICENSE](LICENSE) para detalhes.

## 👨‍💻 Autor

* **Sergio Gaiotto** - [sergiogaiotto](https://github.com/sergiogaiotto)

---

<p align="center">Desenvolvido com ❤️ para facilitar o acesso ao conteúdo de <a href="https://www.falagaiotto.com.br">falagaiotto.com.br</a></p>
