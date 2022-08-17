import React, {useState, useEffect}from 'react'
import axios from "axios";
import Infos from './Infos';

export default function Movimentacao() {
  const [values, setValues ] = useState();
  const [ infos, setInfos ] = useState();

  const handleChangeValues = value => {
    setValues(prevValues => ({
      ...prevValues,
           [value.target.name]: value.target.value,
}));
};

const handleClickButton = () => {
  axios.post("http://localhost:3001/insert", {
    tipo_movimentacao:values.tipo_movimentacao,
    data_inicio: values.data_inicio,
    hora_inicio: values.hora_inicio,
    data_final: values.data_final,
    hora_final: values.hora_final,
  }).then((response) => {
    console.log(response);
  });
  };

  useEffect(() => {
    axios.get("http://localhost:3001/getInfos").then((response) => {
      setInfos(response.data);
    })
  }, []);

  return (
    <div>
    <div>
      <h1>Movimentação</h1>
      <label>
        Tipo de Movimentação
        <select
        name='tipo_movimentacao'
        onChange={handleChangeValues}
        >
        <option value={'EMBARQUE'}>EMBARQUE</option>
        <option value={'DESCARGA'}>DESCARGA</option>
        <option value={'GATE IN'}>GATE IN</option>
        <option value={'GATE OUT'}>GATE OUT</option>
        <option value={'REPOSICIONAMENTO'}>REPOSICIONAMENTO</option>
        <option value={'SCANNER'}>SCANNER</option>
        </select>
      </label>
      <label>
          Data Inicio
          <input 
          name='data_inicio'
          type='date'
          onChange={handleChangeValues}
           />
      </label>
      <label>
          Hora Inicio
          <input 
          name='hora_inicio'
          type='time'
          onChange={handleChangeValues}
           />
      </label>
      <label>
          Data Final
          <input 
          name='data_final'
          type='date'
          onChange={handleChangeValues}
           />
      </label>
      <label>
          Hora Inicio
          <input 
          name='hora_final'
          type='time'
          onChange={handleChangeValues}
           />
      </label>
      <button onClick={handleClickButton}  >Cadastrar</button>
    </div>
    <table>
      <tr>
        <td>Tipo de Movimentacao</td>
        <td>Data Inicio</td>
        <td>Hora Inicio</td>
        <td>Data Final</td>
        <td>Hora Final</td>
      </tr>
      {typeof infos !== 'undefined' &&
      infos.map((value) => (
        <Infos
        infos = {infos}
        setInfos = {setInfos}
        key={value.id_movimentacao}
        id_movimentacao={value.id_movimentacao}
        tipo_movimentacao = {value.tipo_movimentacao}
        data_inicio = {value.data_inicio}
        hora_inicio = {value.hora_inicio}
        data_final = {value.data_final}
        hora_final = {value.hora_final}
        />
      ))}
      </table>
    </div>
  )
}
