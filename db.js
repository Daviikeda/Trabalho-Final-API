const Database = require('better-sqlite3');
// Isso cria o arquivo na raiz do seu projeto automaticamente
const db = new Database('figurinhas.db'); 

// Cria a tabela caso ela não exista
db.exec(`
  CREATE TABLE IF NOT EXISTS figurinhas (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    nome TEXT NOT NULL,
    preco REAL NOT NULL,
    categoria TEXT NOT NULL,
    estoque INTEGER NOT NULL
  )
`);

module.exports = db;