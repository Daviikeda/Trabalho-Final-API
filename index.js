const express = require('express');
const db = require('./db');

const app = express();
const PORT = 2000;

app.use(express.json());

// --- GET COM FILTROS, ORDENAÇÃO E PAGINAÇÃO ---
app.get('/api/figurinhas', (req, res) => {
    try {
        const { categoria, preco_max, preco_min, estoque, ordem, direcao, page = 1, limit = 10 } = req.query;
        
        let sql = "SELECT * FROM figurinhas WHERE 1=1";
        const params = [];

        if (categoria) {
            sql += " AND categoria = ?";
            params.push(categoria);
        }
        if (preco_max) {
            sql += " AND preco <= ?";
            params.push(preco_max);
        }
        if (preco_min) {
            sql += " AND preco >= ?";
            params.push(preco_min);
        }
        if (estoque) {
            sql += " AND estoque >= ?";
            params.push(parseInt(estoque));
        }

        // Ordenação
        const camposValidos = ['nome', 'preco', 'estoque'];
        const sortField = camposValidos.includes(ordem) ? ordem : 'id';
        const sortDir = direcao?.toLowerCase() === 'desc' ? 'DESC' : 'ASC';
        sql += ` ORDER BY ${sortField} ${sortDir}`;

        // Paginação
        const offset = (parseInt(page) - 1) * parseInt(limit);
        sql += " LIMIT ? OFFSET ?";
        params.push(parseInt(limit), offset);

        const rows = db.prepare(sql).all(params);
        res.json(rows);
    } catch (err) {
        console.error(err);
        res.status(500).json({ erro: "Erro ao buscar dados no SQLite." });
    }
});

// --- POST ---
app.post('/api/figurinhas', (req, res) => {
    const { nome, preco, categoria, estoque } = req.body;
    if (!nome || !preco || !categoria || estoque === undefined) {
        return res.status(400).json({ erro: "Dados incompletos!" });
    }

    const stmt = db.prepare('INSERT INTO figurinhas (nome, preco, categoria, estoque) VALUES (?, ?, ?, ?)');
    const info = stmt.run(nome, preco, categoria, estoque);

    res.status(201).json({ id: info.lastInsertRowid, nome, preco, categoria, estoque });
});

// --- PUT ---
app.put('/api/figurinhas/:id', (req, res) => {
    const { id } = req.params;
    const { nome, preco, categoria, estoque } = req.body;

    const stmt = db.prepare('UPDATE figurinhas SET nome = ?, preco = ?, categoria = ?, estoque = ? WHERE id = ?');
    const result = stmt.run(nome, preco, categoria, estoque, id);

    if (result.changes === 0) return res.status(404).json({ erro: "Não encontrado." });
    res.json({ mensagem: "Atualizado com sucesso!" });
});

// --- DELETE ---
app.delete('/api/figurinhas/:id', (req, res) => {
    const { id } = req.params;
    const result = db.prepare('DELETE FROM figurinhas WHERE id = ?').run(id);

    if (result.changes === 0) return res.status(404).json({ erro: "Não encontrado." });
    res.json({ mensagem: "Removido!" });
});

app.listen(PORT, () => console.log(`🚀 Agora sim! SQLite rodando em http://localhost:${PORT}`));