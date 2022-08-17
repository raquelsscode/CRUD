import React from 'react';
import FormDialog from './Dialog';

export default function Table(props) {
const [open, setOpen] = React.useState(false);

const handleClick = () => {
    setOpen(true);
}

  return (
    <>
    <FormDialog open={open} setOpen={setOpen} 
    conteiner_id={props.conteiner_id} 
    cliente_nome={props.cliente_nome}
    numero_do_conteiner={props.numero_do_conteiner}
    tipo = {props.tipo}
    status = {props.status}
    categoria = {props.categoria}
     />
    <tr>
        <td>{props.cliente_nome}</td>
        <td>{props.numero_do_conteiner}</td>
        <td>{props.tipo}</td>
        <td>{props.status}</td>
        <td>{props.categoria}</td>
        <td>
            <button onClick={() => handleClick()}>Editar/Excluir</button>
        </td>
    </tr>
    </>
  );
};
//