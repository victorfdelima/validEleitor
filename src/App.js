import React, { useEffect, useState } from 'react';
import axios from 'axios';

function App() {
  const [candidatos, setCand] = useState();

  useEffect(() => {
    axios.get('https://resultados.tse.jus.br/oficial/ele2022/544/dados-simplificados/br/br-c0001-e000544-r.json')
    .then(response => {
      setCand(response.data.cand)
      console.log(response.data.cand)
     }     )
  },[])

  return (
    <div className="App">
      <h1>
        TSE RESULTADOS
      </h1>
      <ul>
        {candidatos&&candidatos.map((can,i) => {
          return (
            <div key={i} style={{marginBottom:'5px',padding:'6px',width:'400px'}}>
              <li>Número: {can.n}</li>
              <li>Canditado: {can.nm}</li>
              <li>Partido: {can.cc}</li>
              <hr />
            </div>)})
        }
      </ul>       
    </div>
  );
}

export default App;
