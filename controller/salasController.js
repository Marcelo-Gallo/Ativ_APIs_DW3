// 1. Import da condiguração do banco de dados.
const db = require('../database/databaseconfig');

// 2. Criação das funcoes da API
const getAllSalasDeAula = async(req, res) => {
    // 3. bloco try/catch para tratar os erros
    try {
        // 4. execucao da consulsa
        const { rows } = await db.query('Select * FROM salasdeaula WHERE removido = FALSE ORDER BY descricao ASC');

        // 5. envio da resposta com os dados em JSON
        res.status(200).json(rows); // é enviado como 200

    } catch (error) {
        // 6. Em caso de erro, envia uma resposta de erro
        console.error('Erro ao buscar salas de aula: ', error); //Gera o log do lado do backend
        res.status(500).json({error: 'Ocorreu um erro ao buscar as salas de aula.'}); //Retorna o erro para a aplicacao que tentou consumir a API (frontend), enviado como 500
    }
};

const getSalaDeAulaById = async (req, res) => {
  // 2.1. Pega o ID que foi enviado na URL da requisição
  const { id } = req.params;

  try {
    // 2.2. Executa a consulta, filtrando pelo ID e por 'removido = FALSE'
    const { rows } = await db.query('SELECT * FROM salasdeaula WHERE salasdeaulaid = $1 AND removido = FALSE', [id]);

    // 2.3. Verifica se encontra a sala
    if (rows.length > 0) {
      // Se encontrou, retorna a sala (só deve haver uma)
      res.status(200).json(rows[0]);
    } else {
      // Se não encontrou, retorna um erro 404 (Not Found)
      res.status(404).json({ error: 'Sala de aula não encontrada.' });
    }
  } catch (error) {
    console.error('Erro ao buscar sala de aula por ID:', error);
    res.status(500).json({ error: 'Ocorreu um erro ao buscar a sala de aula.' });
  }
};

const insertSalaDeAula = async (req, res) => {
  // 2.4. Extraí os dados do corpo da requisição (req.body)
  const { descricao, localizacao, capacidade } = req.body;

  try {
    // 2.5. Cria a query SQL para inserir os dados
    const novaSala = await db.query(
      'INSERT INTO salasdeaula (descricao, localizacao, capacidade) VALUES ($1, $2, $3) RETURNING *',
      [descricao, localizacao, capacidade]
    );

    // 2.6. Retorna o status 201 (Created) e o objeto da sala criada
    res.status(201).json(novaSala.rows[0]);

  } catch (error) {
    console.error('Erro ao inserir sala de aula:', error);
    res.status(500).json({ error: 'Ocorreu um erro ao inserir a sala de aula.' });
  }
};

const updateSalaDeAula = async (req, res) => {
  // 2.7. Pega o ID dos parâmetros da rota
  const { id } = req.params;
  // 2.8. Pega os novos dados do corpo da requisição
  const { descricao, localizacao, capacidade } = req.body;

  try {
    // 2.9. Cria a query SQL para atualizar os dados
    const salaAtualizada = await db.query(
      'UPDATE salasdeaula SET descricao = $1, localizacao = $2, capacidade = $3 WHERE salasdeaulaid = $4 RETURNING *',
      [descricao, localizacao, capacidade, id]
    );

    // 2.10. Verifica se a atualização realmente aconteceu
    if (salaAtualizada.rows.length > 0) {
      // Se retornou a linha atualizada, envia como resposta
      res.status(200).json(salaAtualizada.rows[0]);
    } else {
      // Se não retornou nada, é porque o ID não foi encontrado
      res.status(404).json({ error: 'Sala de aula não encontrada para atualização.' });
    }
  } catch (error) {
    console.error('Erro ao atualizar sala de aula:', error);
    res.status(500).json({ error: 'Ocorreu um erro ao atualizar a sala de aula.' });
  }
};

const deleteSalaDeAula = async (req, res) => {
  // 2.11. Pega o ID dos parâmetros da rota
  const { id } = req.params;

  try {
    // 2.12. Executa um UPDATE para marcar a sala como removida
    const resultado = await db.query(
      'UPDATE salasdeaula SET removido = TRUE WHERE salasdeaulaid = $1 RETURNING *',
      [id]
    );

    // 2.13. Verifica se a operação afetou alguma linha
    if (resultado.rows.length > 0) {
      // Se sim, envia uma mensagem de sucesso
      res.status(200).json({ message: 'Sala de aula removida com sucesso.', sala: resultado.rows[0] });
    } else {
      // Se não, é porque o ID não foi encontrado
      res.status(404).json({ error: 'Sala de aula não encontrada para remoção.' });
    }
  } catch (error) {
    console.error('Erro ao remover sala de aula:', error);
    res.status(500).json({ error: 'Ocorreu um erro ao remover a sala de aula.' });
  }
};

// 7. Exporta a função para que possa ser usada nas rotas
module.exports = {
    getAllSalasDeAula,
    getSalaDeAulaById,
    insertSalaDeAula,
    updateSalaDeAula,
    deleteSalaDeAula,
};