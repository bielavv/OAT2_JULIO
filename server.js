const express = require('express');
const app = express();
const PORT = 3000;

app.use(express.json());

let filmes = [];

// Create
app.post('/filmes', (req, res) => {
  const filme = req.body;
  // Verifica se já existe um item com esse id
  if (filmes.some(i => i.id === filme.id)) {
    return res.status(400).json({ error: 'ID já existe' });
  }
  filmes.push(filme);
  res.status(201).json(filme);
});

// Read all
app.get('/filmes', (req, res) => {
  res.json(filmes);
});

// Read one
app.get('/filmes/:id', (req, res) => {
  const filme = filmes.find(i => i.id == req.params.id);
  if (filme) {
    res.json(filme);
  } else {
    res.status(404).json({ error: 'Filme não encontrado' });
  }
});

// Update
app.put('/filmes/:id', (req, res) => {
  const id = req.params.id;
  const index = filmes.findIndex(i => i.id == id);
  if (index !== -1) {
    filmes[index] = req.body;
    res.json(filmes[index]);
  } else {
    res.status(404).json({ error: 'Filme não encontrado' });
  }
});

// Delete
app.delete('/filmes/:id', (req, res) => {
  const id = req.params.id;
  const index = filmes.findIndex(i => i.id == id);
  if (index !== -1) {
    const deleted = filmes.splice(index, 1);
    res.json(deleted[0]);
  } else {
    res.status(404).json({ error: 'Filme não encontrado' });
  }
});

app.listen(PORT, () => {
  console.log(`Servidor rodando em http://localhost:${PORT}`);
});
