const fs = require('fs');
const path = require('path');

const rawData = fs.readFileSync(path.join(__dirname, '../data/states.json'), 'utf8');
const dados = JSON.parse(rawData);

const todasCidades = dados.estados.flatMap((estado) =>
  estado.cidades.map((cidade) => ({
    cidade,
    estado: estado.nome,
    sigla: estado.sigla,
  }))
);

const buscarCidades = (req, res) => {
  const query = req.query.query ? String(req.query.query).toLowerCase() : null;

  if (!query || query.length < 2) {
    return res.json([]);
  }

  const resultado = todasCidades.filter((item) =>
    item.cidade.toLowerCase().includes(query)
  );

  res.json(resultado);
};

module.exports = {
  buscarCidades,
};
