import React, { useState } from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import { Select } from '@mui/material';
import { InputLabel} from '@mui/material';
import { MenuItem }from '@mui/material';
import { FormControl } from '@mui/material';
import axios from "axios";
import moment from 'moment'

export default function FormDialog(props) {

const converteData = (data) => moment(data).utc().format('YYYY-MM-DD')

const [editInfos, setEditInfos] = useState({
        id_movimentacao: props.id_movimentacao,
        tipo_movimentacao: props.tipo_movimentacao,
        data_inicio: converteData(props.data_inicio),
        hora_inicio: props.hora_inicio,
        data_final: converteData(props.data_final),
        hora_final:props.hora_final,
    });

  
  const handleClose = () => {
    props.setOpen(false);
  };

const handleChange = value => {
    setEditInfos(prevValues => ({
      ...prevValues,
           [value.target.name]: value.target.value,
    }));
    };
    
    const handleEdit = () => {
        axios.put("http://localhost:3001/update", {
          id_movimentacao:editInfos.id_movimentacao,
          tipo_movimentacao: editInfos.tipo_movimentacao,
          data_inicio: editInfos.data_inicio,
          hora_inicio: editInfos.hora_inicio,
          data_final: editInfos.data_final,
          hora_final: editInfos.hora_final
        }).then((response) => {
          console.log(response);
        });
        handleClose();
        };

const handleDelete = () => {
     axios.delete(`http://localhost:3001/clear/${editInfos.id_movimentacao}`)
    handleClose();
    alert('Item deletado com sucesso');
};

  return (
    <div>
      <Dialog open={props.open} onClose={handleClose}>
        <DialogTitle>Editar</DialogTitle>
        <DialogContent>
        <FormControl fullWidth>
        <InputLabel id="tipo_movimentacao">Tipo de MOvimentação</InputLabel>
        <Select
         name='tipo_movimentacao'
        label="tipo_movimentacao"
        defaultValue = {props.tipo_movimentacao}
        onChange={handleChange}
        >
          <MenuItem value={'EMBARQUE'}>EMBARQUE</MenuItem>
          <MenuItem value={'DESCARGA'}>DESCARGA</MenuItem>
          <MenuItem value={'GATE IN'}>GATE IN</MenuItem>
          <MenuItem value={'GATE OUT'}>GATE OUT</MenuItem>
          <MenuItem value={'REPOSICIONAMENTO'}>REPOSICIONAMENTO</MenuItem>
          <MenuItem value={'SCANNER'}>SCANNER</MenuItem>
        </Select>
        <label>
          Data Inicio
          <input 
          name='data_inicio'
          type='date'
          defaultValue={converteData(props.data_inicio)}
          onChange={handleChange}
           />
      </label>
      <label>
          Hora Inicio
          <input 
          name='hora_inicio'
          type='time'
          defaultValue={props.hora_inicio}
          onChange={handleChange}
           />
      </label>
      <label>
          Data Final
          <input 
          name='data_final'
          type='date'
          defaultValue={converteData(props.data_final)}
          onChange={handleChange}
           />
      </label>
      <label>
          Hora Inicio
          <input 
          name='hora_final'
          type='time'
          defaultValue={props.hora_final}
          onChange={handleChange}
           />
      </label>
      </FormControl>
        </DialogContent>
        <DialogActions>
        <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={handleEdit}>Salvar</Button>
          <Button onClick={handleDelete}>Excluir</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
//