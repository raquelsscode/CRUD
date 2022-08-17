import React, {useState, useEffect} from 'react';
import axios from 'axios';

export default function Relatorio() {
const [clientes, setClientes ] = useState();
const [movimentacaoes, setMovimentacoes ] = useState();
const [totalImpExp, setTotalImpExp ] = useState();


useEffect(() => {
axios.get("http://localhost:3001/getClientes").then((response) => {
  setClientes(response.data)
})

axios.get("http://localhost:3001/getMov").then((response) => {
  setMovimentacoes(response.data)
})

axios.get("http://localhost:3001/getTotal").then((response) => {
  setTotalImpExp(response.data)
})

});



  return (
    <div>
      <table>
        <tr>
          <td>Quantidade</td>
          <td>Cliente</td>
        </tr>
        {typeof clientes !== 'undefined' &&
        clientes.map((value, index) => (
      <tr key={index}>  
        <td>{value.quantidade_conteiner}</td>
        <td>{value.cliente_nome}</td>
      </tr>
      ))}
      </table>
      <table>
        <tr>
          <td>Quantidade</td>
          <td>Movimentações</td>
        </tr>
        {typeof movimentacaoes !== 'undefined' &&
        movimentacaoes.map((value, index) => (
      <tr key={index}>  
        <td>{value.quantidade_movimentacao}</td>
        <td>{value.tipo_movimentacao}</td>
      </tr>
      ))}
      </table>
      <table>
        <h4>Total de Importaçoes e Exportações</h4>
        <tr>
          <td>Importação</td>
          <td>Exportação</td>
        </tr>
        {typeof totalImpExp !== 'undefined' &&
        totalImpExp.map((value, index) => (
      <tr key={index}>  
        <td>{value.total_importacoes}</td>
        <td>{value.total_exportacoes}</td>
      </tr>
      ))}
      </table>
    </div>
  )
}
//