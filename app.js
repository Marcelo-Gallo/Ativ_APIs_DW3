// 1. Import do express e rotas
const express = require('express');
const salasRoutes = require('./routes/salasRoutes');

// 2. aplicação express
const app = express();
const PORT = 4000; // porta que o servidor usa

//3. Middleware -> prepara a aplicacao para trabalhar com json
app.use(express.json());

//  4. Usa o roteador criado
app.use('/api', salasRoutes); //'/api' é o prefixo

// 5. inicia servidor e coloca pra ouvir na porta 4000
app.listen(PORT, () => {
    console.log(`Servidor Rodando na porta ${PORT}`);
    console.log(`API de GetAllSalas disponível em http://localhost:${PORT}/api/salas`);//confesso que isso só existe para usar ctrl+clique e executar
    console.log(`API de GetSalasByID disponível em http://localhost:${PORT}/api/salas/1`);
});