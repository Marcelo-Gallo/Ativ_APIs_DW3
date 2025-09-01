### Tabela "salasdeaula"

|salasdeaulaid(pk)|descricao(string)|localizacao(string)|capacidade(integer)|removido(boolean)|
|-----------------|-----------------|-------------------|-------------------|-----------------|

--- 

TODO:
- [x] GetAllSalasDeAula
    - retorna todos os campos da tabela salasdeaula. Vai trazer somente os registros que não foram apagados, isto é, aqueles cujo campo removido seja igual a false;
- [X] GetSalasDeAulaByID
    - retorna todos os campos da tabela salasdeaula de acordo com o ID informado. Vai trazer somente o registro que não foi apagado, isto é, aquele cujo campo removido seja igual a false;
- [X] InsertSalasDeAula
    -  insere um novo registro na tabela salasdeaula;
- [X] UpdateSalasDeAula
    - atualiza um registro na tabela salasdeaula de acordo com o ID informado;
- [X] DeleteSalasDeAula
    - efetua um soft delete e um registro na tabela salasdeaula de acordo com o ID informado. O registro não é apagado fisicamente, apenas o campo removido é passado para true.