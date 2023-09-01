const express = require('express')
const axios = require('axios')
const cheerio = require('cheerio')

const app = express()

app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
    next();
  });
  
  const url_goal = 'https://www.goal.com/br/listas/futebol-programacao-jogos-tv-aberta-fechada-onde-assistir-online-app/bltc0a7361374657315';
  
  app.get('/', (req, res) => {
    axios.get(url_goal)
      .then((response) => {
        const html = response.data;
        const $ = cheerio.load(html);
        const jsontexto = $('script[id="__NEXT_DATA__"]').text();
        const jsonfim = JSON.parse(jsontexto);
        const x = jsonfim.props.pageProps.content.slideList.slides;

        const tables = x.map((slide, index) => {
          const tableHtml = slide.body.body;
          const diaJogo = slide.headline
          const table = cheerio.load(tableHtml)('table');

           // Remover linhas que contêm a frase "TEMPO REAL"
          table.find('th:contains("TEMPO REAL")').remove();
          table.find('td:contains("Tempo real")').remove();

          return {
            title: `Table ${index + 1}`,
            diaJogo: diaJogo,
            content: `<table>${table.html()}</table>`,
          };
        });
        res.json(tables);
      })
      .catch((error) => {
        console.error('Erro ao fazer a requisição:', error);
        res.status(500).json({ error: 'Erro ao buscar as tabelas.' });
      });
  });
  
  const port = 3000;
  app.listen(port, () => {
    console.log(`Servidor rodando em http://0.0.0.0:${port}`);
  });