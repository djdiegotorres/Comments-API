const express = require('express');
const db = require('./db');
const app = express();
const port = 3000;

app.use(express.json());

// POST /api/comment/new
app.post('/api/comment/new', async (req, res) => {
  const { email, comment } = req.body;

  if (!email || !comment ) {
    return res.status(400).json({ error: 'Dados incompletos' });
  }

  try {
    const [id] = await db('comments').insert({
      email,
      comment
    });

    const newComment = await db('comments').where({ id }).first();
    res.status(201).json({ message: 'Comentário adicionado', comment: newComment });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Erro ao adicionar comentário' });
  }
});
// GET /api/comment/list
app.get('/api/comment/list', async (req, res) => {
  try {
    const allComments = await db('comments').orderBy('created_at', 'asc');
    res.json(allComments);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Erro ao listar todos os comentários' });
  }
});
// GET /api/comment/list/:content_id
app.get('/api/comment/list/:content_id', async (req, res) => {
  const contentId = parseInt(req.params.content_id);

  try {
    const comments = await db('comments')
      .where({ content_id: contentId })
      .orderBy('created_at', 'asc');
    res.json(comments);
  } catch (err) {
    res.status(500).json({ error: 'Erro ao buscar comentários' });
  }
});

app.listen(port, () => {
  console.log(`🚀 API rodando em http://localhost:${port}`);
});

//Rota de Healthcheck
app.get('/health', (req, res) => {
  res.status(200).json({ status: 'ok', uptime: process.uptime() });
});