import express from 'express';
import fs from 'fs';
import path from 'path';
import cors from 'cors';

const app = express();
const PORT = 3000;

app.use(cors());


app.get('/cidades', (req, res) => {
  const filePath = path.join(__dirname, 'cidades.json');

  try {
    const cidadesData = fs.readFileSync(filePath, 'utf-8');
    const cidades = JSON.parse(cidadesData);
    res.json(cidades);
  } catch (err) {
    console.error('Erro ao ler o arquivo cidades.json:', err);
    res.status(500).send('Erro ao buscar cidades');
  }
});

app.listen(PORT, () => {
  console.log(`Servidor rodando em http://localhost:${PORT}`);
});
