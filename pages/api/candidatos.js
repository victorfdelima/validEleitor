async function handler(req, res) {
  const date = new Date();
  const url = await fetch(
    "https://divulgacandcontas.tse.jus.br/divulga/rest/v1/candidatura/buscar/2022/35157/2030402020/candidato/50000867342"
  );

  const candidato = await url;

  res.send({
    date: date.toGMTString(),
    url: url,
  });
}
export default handler;
