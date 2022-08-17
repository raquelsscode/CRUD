import React, { useState, useEffect } from 'react';
import axios from "axios";
import Table from './Table';

export default function Conteiner() {
const [values, setValues ] = useState();
const [ table, setTable ] = useState();

const handleChangeValues = value => {
setValues(prevValues => ({
  ...prevValues,
       [value.target.name]: value.target.value.toUpperCase(),
}));
};

const handleClickButton = () => {
axios.post("http://localhost:3001/register", {
  cliente_nome:values.cliente_nome,
  numero_do_conteiner: values.numero_do_conteiner,
  tipo: values.tipo,
  status: values.status,
  categoria: values.categoria,
}).then((response) => {
  console.log(response);
});
};

useEffect(() => {
  axios.get("http://localhost:3001/getTable").then((response) => {
    setTable(response.data);
  })
}, []);


  return (
    <div>
    <div>
      <label>
        Cliente
      <input
      type='text'
      name='cliente_nome'
      onChange={handleChangeValues}
      />
      </label>
      <label>
        Numero do Conteiner
      <input 
      type='text'
      name='numero_do_conteiner'
      onChange={handleChangeValues}
      />
      </label>
      <label>
        Tipo
      <select
      name='tipo'
      onChange={handleChangeValues}
      >
        <option value={20}>20</option>
        <option value={40}>40</option>
      </select>
      </label>
      <label>
        Status
      <select
      name='status'
      onChange={handleChangeValues}
      >
        <option value='CHEIO'>CHEIO</option>
        <option value='VAZIO'>VAZIO</option>
      </select>
      </label>
      <label>
        Categoria
      <select
      name='categoria'
      onChange={handleChangeValues}
      >
        <option value='EXPORTAÇÃO'>EXPORTAÇÃO</option>
        <option value='IMPORTAÇÃO'>IMPORTAÇÃO</option>
      </select>
      </label>
      <button onClick={() => handleClickButton()}>Cadastrar</button>
    </div>
    <table>
      <tr>
        <td>Cliente</td>
        <td>Numero do Conteiner</td>
        <td>Tipo</td>
        <td>Status</td>
        <td>Categoria</td>
      </tr>
      {typeof table !== 'undefined' &&
      table.map((value) => (
        <Table
        table = {table}
        setTable = {setTable}
        key={value.conteiner_id}
        conteiner_id={value.conteiner_id}
        cliente_nome = {value.cliente_nome}
        numero_do_conteiner = {value.numero_do_conteiner}
        tipo = {value.tipo}
        status = {value.status}
        categoria = {value.categoria}
        />
      ))}
    </table>
    </div>
  )
}
//