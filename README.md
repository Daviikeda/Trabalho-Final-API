# API Figurinhas - Gerenciamento de Inventário
Este repositório contém o código-fonte de uma API REST desenvolvida para o controle de figurinhas colecionáveis. O projeto foi construído utilizando Node.js e Express, com persistência de dados em SQLite para garantir que as informações sejam mantidas localmente de forma leve e eficiente.

## Estrutura Técnica
- Runtime: Node.js

- Framework: Express

- Banco de Dados: SQLite (via better-sqlite3)

- Porta do Servidor: 2000

## Configuração e Instalação
Para rodar o projeto localmente, siga os comandos abaixo:

Instale as dependências necessárias:

- Bash
- npm install express better-sqlite3
Inicie a aplicação:
- Bash
- node index.js

## Documentação das Rotas
1. Cadastro de Figurinhas (POST)
- Endpoint: http://localhost:2000/api/figurinhas

Utilize os objetos abaixo no corpo da requisição para popular o banco de dados. Envie uma entrada por vez através do Postman:

- {"nome": "Neymar Jr", "preco": 50.0, "categoria": "Brasil", "estoque": 10}

- {"nome": "Lionel Messi", "preco": 48.0, "categoria": "Argentina", "estoque": 5}

- {"nome": "Cristiano Ronaldo", "preco": 45.0, "categoria": "Portugal", "estoque": 7}

- {"nome": "Kylian Mbappé", "preco": 40.0, "categoria": "França", "estoque": 12}

- {"nome": "Vinícius Jr", "preco": 25.0, "categoria": "Brasil", "estoque": 30}

- {"nome": "Luka Modric", "preco": 20.0, "categoria": "Croácia", "estoque": 15}

- {"nome": "Kevin De Bruyne", "preco": 22.0, "categoria": "Bélgica", "estoque": 14}

- {"nome": "Erling Haaland", "preco": 38.0, "categoria": "Noruega", "estoque": 8}

- {"nome": "Robert Lewandowski", "preco": 20.0, "categoria": "Polônia", "estoque": 10}

- {"nome": "Harry Kane", "preco": 18.0, "categoria": "Inglaterra", "estoque": 20}

- {"nome": "Escudo CBF", "preco": 100.0, "categoria": "Especial", "estoque": 3}

- {"nome": "Escudo AFA", "preco": 80.0, "categoria": "Especial", "estoque": 4}

- {"nome": "Al Rihla (Bola)", "preco": 150.0, "categoria": "Especial", "estoque": 2}

- {"nome": "Casemiro", "preco": 15.0, "categoria": "Brasil", "estoque": 40}

- {"nome": "Alisson Becker", "preco": 12.0, "categoria": "Brasil", "estoque": 50}

- {"nome": "Son Heung-min", "preco": 15.0, "categoria": "Coreia do Sul", "estoque": 18}

- {"nome": "Mohamed Salah", "preco": 20.0, "categoria": "Egito", "estoque": 11}

- {"nome": "Pedri", "preco": 15.0, "categoria": "Espanha", "estoque": 25}

- {"nome": "Phil Foden", "preco": 15.0, "categoria": "Inglaterra", "estoque": 22}

- {"nome": "Jude Bellingham", "preco": 30.0, "categoria": "Inglaterra", "estoque": 10}

2. Consulta e Filtros (GET)
A rota de listagem aceita diversos parâmetros para facilitar a busca:

- Listagem Geral: GET /api/figurinhas

- Busca por Categoria: GET /api/figurinhas?categoria=Brasil

- Limite de Preço: GET /api/figurinhas?preco_max=30

- Ordenação de Estoque: GET /api/figurinhas?ordem=estoque&direcao=desc

- Paginação de Resultados: GET /api/figurinhas?page=1&limit=5

3. Edição de Registros (PUT)
Para atualizar os dados de uma figurinha, informe o ID na URL e os novos campos no corpo:

- Exemplo: PUT http://localhost:2000/api/figurinhas/1

JSON
{
  "nome": "Neymar Jr - Versão Ouro",
  "preco": 150.0,
  "categoria": "Brasil",
  "estoque": 1
}
4. Remoção de Registros (DELETE)
Para excluir permanentemente uma figurinha:

- Exemplo: DELETE http://localhost:2000/api/figurinhas/15

Tratamento de Erros
A API foi configurada para validar as entradas e retornar mensagens claras:

- 400 (Bad Request): Enviado quando campos obrigatórios estão ausentes.

- 404 (Not Found): Quando o ID informado não existe na base de dados.

- 500 (Internal Error): Falhas inesperadas no processamento ou conexão com o banco.
