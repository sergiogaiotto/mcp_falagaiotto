// Protocolo para Acesso ao Conteúdo de falagaiotto.com.br via Slack
// Este código cria um aplicativo Slack que busca e formata o conteúdo do site

const { App } = require('@slack/bolt');
const axios = require('axios');
const cheerio = require('cheerio');
const dotenv = require('dotenv');

// Carregando variáveis de ambiente
dotenv.config();

// Inicializando o aplicativo Slack com as credenciais de segurança
const app = new App({
  token: process.env.SLACK_BOT_TOKEN,
  signingSecret: process.env.SLACK_SIGNING_SECRET,
  socketMode: true,
  appToken: process.env.SLACK_APP_TOKEN
});

// URL base do site
const siteUrl = 'https://www.falagaiotto.com.br/default.htm';

// Função para extrair o conteúdo da página
async function extrairConteudo() {
  try {
    // Fazendo a requisição HTTP para o site
    const response = await axios.get(siteUrl);
    
    // Carregando o HTML no Cheerio para manipulação
    const $ = cheerio.load(response.data);
    
    // Extraindo o conteúdo principal (ajuste os seletores conforme a estrutura do seu site)
    const titulo = $('title').text();
    const conteudoPrincipal = $('main, #content, .content, body').text().trim();
    
    // Formatando o resultado
    const resultado = {
      titulo: titulo,
      conteudo: conteudoPrincipal,
      url: siteUrl,
      acessadoEm: new Date().toLocaleString('pt-BR')
    };
    
    return resultado;
  } catch (error) {
    console.error('Erro ao extrair conteúdo:', error);
    throw new Error('Não foi possível acessar o conteúdo do site.');
  }
}

// Comando para acesso ao conteúdo do site
app.command('/gaiotto', async ({ command, ack, say }) => {
  // Confirmando o recebimento do comando
  await ack();
  
  try {
    // Informando ao usuário que a requisição está sendo processada
    await say({
      text: 'Buscando o conteúdo mais recente de falagaiotto.com.br...'
    });
    
    // Extraindo o conteúdo
    const conteudo = await extrairConteudo();
    
    // Enviando o conteúdo formatado
    await say({
      blocks: [
        {
          type: 'header',
          text: {
            type: 'plain_text',
            text: conteudo.titulo,
            emoji: true
          }
        },
        {
          type: 'divider'
        },
        {
          type: 'section',
          text: {
            type: 'mrkdwn',
            text: conteudo.conteudo.substring(0, 2900) + 
                  (conteudo.conteudo.length > 2900 ? '... (conteúdo truncado)' : '')
          }
        },
        {
          type: 'context',
          elements: [
            {
              type: 'mrkdwn',
              text: `*Fonte:* <${conteudo.url}|falagaiotto.com.br> • Acessado em ${conteudo.acessadoEm}`
            }
          ]
        },
        {
          type: 'actions',
          elements: [
            {
              type: 'button',
              text: {
                type: 'plain_text',
                text: 'Visitar o site',
                emoji: true
              },
              url: conteudo.url
            }
          ]
        }
      ]
    });
  } catch (error) {
    await say({
      text: `Erro ao processar a solicitação: ${error.message}`
    });
  }
});

// Mensagem de ajuda sobre o comando
app.message('ajuda gaiotto', async ({ message, say }) => {
  await say({
    blocks: [
      {
        type: 'section',
        text: {
          type: 'mrkdwn',
          text: '*Comando /gaiotto*'
        }
      },
      {
        type: 'section',
        text: {
          type: 'mrkdwn',
          text: 'Use o comando `/gaiotto` para ver o conteúdo mais recente do site falagaiotto.com.br diretamente no Slack.'
        }
      },
      {
        type: 'section',
        text: {
          type: 'mrkdwn',
          text: 'Exemplo: `/gaiotto`'
        }
      }
    ]
  });
});

// Inicializando o aplicativo
(async () => {
  await app.start(process.env.PORT || 3000);
  console.log('⚡️ Aplicativo Slack está rodando!');
})();
