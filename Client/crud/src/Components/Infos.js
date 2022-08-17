import React from 'react';
import moment from 'moment';
import FormDialog from './Edit';

export default function Infos(props) {
const [open, setOpen] = React.useState(false);

const convertDate = (data) => moment(data).utc().format('DD-MM-YYYY')

const handleClickButton = () => {
    setOpen(true)
}

  return (
    <>
    <FormDialog open={open} setOpen={setOpen} 
    tipo_movimentacao={props.tipo_movimentacao} 
    data_inicio={props.data_inicio}
    hora_inicio={props.hora_inicio}
    data_final = {props.data_final}
    hora_final = {props.hora_final}
    id_movimentacao = {props.id_movimentacao}
     />
    <tr>
    <td>{props.tipo_movimentacao}</td>
    <td>{convertDate(props.data_inicio)}</td>
    <td>{props.hora_inicio}</td>
    <td>{convertDate(props.data_final)}</td>
    <td>{props.hora_final}</td>
    <td>
        <button onClick={handleClickButton}>Editar/Excluir</button>
    </td>
</tr>
</>
  )
}
//