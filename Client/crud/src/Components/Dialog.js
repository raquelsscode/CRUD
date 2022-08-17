import React, {useState} from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import { Select } from '@mui/material';
import { InputLabel} from '@mui/material';
import { MenuItem }from '@mui/material';
import { FormControl } from '@mui/material';
import axios from "axios";

export default function FormDialog(props) {
const [editValues, setEditValues] = useState({
    conteiner_id: props.conteiner_id,
    cliente_nome: props.cliente_nome,
    numero_do_conteiner:props.numero_do_conteiner,
    tipo: props.tipo,
    status:props.status,
    categoria: props.categoria,
});

const handleEdit = () => {
axios.put("http://localhost:3001/edit", {
    conteiner_id: editValues.conteiner_id,
    cliente_nome: editValues.cliente_nome,
    numero_do_conteiner:editValues.numero_do_conteiner,
    tipo: editValues.tipo,
    status:editValues.status,
    categoria: editValues.categoria,
});
handleClose();
};

const handleDelete = () => {
    axios.delete(`http://localhost:3001/delete/${editValues.conteiner_id}`)
    handleClose();
    alert('Item deletado com sucesso');
}


  const handleClose = () => {
    props.setOpen(false);
  };

  const handleChange = (value) => {
    setEditValues((prevValues) => ({
    ...prevValues,
    [value.target.name]: value.target.value,
    }))
  }

  return (
    <div>
      <Dialog open={props.open} onClose={handleClose}>
        <DialogTitle>Editar</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            defaultValue = {props.cliente_nome}
            onChange={handleChange}
            margin="dense"
            name='cliente_nome'
            label="Cliente"
            type="text"
            fullWidth
            variant="standard"
          />
          <TextField
            autoFocus
            defaultValue = {props.numero_do_conteiner}
            onChange={handleChange}
            margin="dense"
            name='numero_do_conteiner'
            label="Numero do Conteiner"
            type="text"
            fullWidth
            variant="standard"
          />
          <FormControl fullWidth>
        <InputLabel id="tipo">Tipo</InputLabel>
        <Select
         name='tipo'
        label="Tipo"
        defaultValue = {props.tipo}
        onChange={handleChange}
        >
          <MenuItem value={20}>20</MenuItem>
          <MenuItem value={40}>40</MenuItem>
        </Select>
      </FormControl>
        <FormControl fullWidth>
        <InputLabel id="status">Status</InputLabel>
        <Select
         name='status'
        label="Status"
        defaultValue = {props.status}
        onChange={handleChange}
        >
          <MenuItem value={'CHEIO'}>CHEIO</MenuItem>
          <MenuItem value={'VAZIO'}>VAZIO</MenuItem>
        </Select>
      </FormControl>
      <FormControl fullWidth>
        <InputLabel id="categoria">Categoria</InputLabel>
        <Select
         name='categoria'
        label="Categoria"
        defaultValue = {props.categoria}
        onChange={handleChange}
        >
          <MenuItem value={'EXPORTAÇÃO'}>EXPORTAÇÃO</MenuItem>
          <MenuItem value={'IMPORTAÇÃO'}>IMPORTAÇÃO</MenuItem>
        </Select>
      </FormControl>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={handleEdit}>Salvar</Button>
          <Button onClick={handleDelete}>Excluir</Button>
        </DialogActions>
        </DialogContent>
      </Dialog>
    </div>
  );
}
//
