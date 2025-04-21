import express from 'express';
import fs from 'fs';
import cors from 'cors';

const app = express();
const PORT = 3000;

app.use(cors());


const rawData = fs.readFileSync('src/data/states.json', 'utf8');
const dados = JSON.parse(rawData);


const todasCidades = dados.estados.flatMap(estado =>
  estado.cidades.map(cidade => ({
    cidade,
    estado: estado.nome,
    sigla: estado.sigla,
  }))
);


app.get('/cidades', (req, res) => {
  const query = req.query.query?.toLowerCase();

  if (!query || query.length < 2) {
    return res.json([]);
  }

  const resultado = todasCidades.filter(item =>
    item.cidade.toLowerCase().includes(query)
  );

  res.json(resultado);
});

app.listen(PORT, () => {
  console.log(`Servidor rodando em http://localhost:${PORT}`);
});
