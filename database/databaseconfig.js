// 1. Importe da biblioteca 'pg'
const { Pool } = require('pg');

// 2. Config dos dados da conexão
// Trata-se de um ambiente local temporário configurado em minha rede.
// Altere o que for necessário.
const pool = new Pool({
  user: 'admin',
  host: '192.168.1.158',
  database: 'APIs',
  password: 'postdba',
  port: 5433,
});

// 3. Exportação do objeto
module.exports = {
  query: (text, params) => pool.query(text, params),
};