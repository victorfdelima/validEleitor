const candidatos = (req, res) => {
  const estadosEscolhidos = [
    "ac",
    "al",
    "df",
    "am",
    "ba",
    "ce",
    "df",
    "es",
    "go",
    "ma",
  ];
  const cargoEscolhido = ["0003", "0005", "0006", "0007"];

  fetch(
    `http://divulga.tse.jus.br/2018/divulgacao/oficial/297/dadosdivweb/${estadosEscolhidos}/${estadosEscolhidos}-${cargoEscolhido}-e000297-w.js"`
  );
};

export default candidatos;
