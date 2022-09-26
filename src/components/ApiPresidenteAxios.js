import axios from 'axios'

const apiExt = axios.create({
    baseURL: "https://resultados.tse.jus.br/oficial/ele2022/",
  });

export default apiExt