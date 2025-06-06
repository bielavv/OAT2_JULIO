const express = require('express');
const app = express();
const PORT = 3000;

app.use(express.json());

let items = [];

// Create
app.post('/items', (req, res) => {
  const item = req.body;
  // Verifica se já existe um item com esse id
  if (items.some(i => i.id === item.id)) {
    return res.status(400).json({ error: 'ID já existe' });
  }
  items.push(item);
  res.status(201).json(item);
});

// Read all
app.get('/items', (req, res) => {
  res.json(items);
});

// Read one
app.get('/items/:id', (req, res) => {
  const item = items.find(i => i.id == req.params.id);
  if (item) {
    res.json(item);
  } else {
    res.status(404).json({ error: 'Item não encontrado' });
  }
});

// Update
app.put('/items/:id', (req, res) => {
  const id = req.params.id;
  const index = items.findIndex(i => i.id == id);
  if (index !== -1) {
    items[index] = req.body;
    res.json(items[index]);
  } else {
    res.status(404).json({ error: 'Item não encontrado' });
  }
});

// Delete
app.delete('/items/:id', (req, res) => {
  const id = req.params.id;
  const index = items.findIndex(i => i.id == id);
  if (index !== -1) {
    const deleted = items.splice(index, 1);
    res.json(deleted[0]);
  } else {
    res.status(404).json({ error: 'Item não encontrado' });
  }
});

app.listen(PORT, () => {
  console.log(`Servidor rodando em http://localhost:${PORT}`);
});
