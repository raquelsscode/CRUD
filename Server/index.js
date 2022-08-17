const express = require("express");
const app = express();
const mysql = require('mysql');
const cors = require("cors");

const db = mysql.createPool({
    host: "localhost",
    user: "root",
    password: "password",
    database: "conteiner",
});

app.use(cors());
app.use(express.json());

//CONTEINERs
app.post("/register", (req,res) => {
    const { cliente_nome, numero_do_conteiner, tipo, status, categoria } = req.body;

    const SQL = "INSERT INTO conteiner.clientes ( cliente_nome, numero_do_conteiner, tipo, status, categoria) VALUES ( ?,?,?,?,?)";
    db.query(SQL, [cliente_nome, numero_do_conteiner, tipo, status, categoria], (err, result) => {
        if(err) console.log(err);
        else res.send(result);
    });
});

app.get("/getTable", (req,res) => {
    const SQL = "SELECT * FROM conteiner.clientes";

    db.query(SQL, (err, result) => {
        if(err) console.log(err);
        else res.send(result);
    });
});

app.put("/edit", (req,res) => {
const { conteiner_id, cliente_nome, numero_do_conteiner, tipo, status, categoria } = req.body

const SQL = "UPDATE conteiner.clientes SET cliente_nome=?, numero_do_conteiner=?, tipo=?, status=?, categoria=? WHERE conteiner_id= ?";

db.query(SQL, [cliente_nome, numero_do_conteiner, tipo, status, categoria, conteiner_id], (err, result) => {
    if(err) console.log(err);
    else res.send(result);
});
});

app.delete("/delete/:conteiner_id", (req, res) => {
    const { conteiner_id } = req.params

    const SQL = "DELETE FROM conteiner.clientes WHERE conteiner_id = ?";
    db.query(SQL, [conteiner_id], (err, result) => {
        if(err) console.log(err);
        else res.send(result);
    });
});

// MOVIMENTAÇÃO

app.post("/insert", (req,res) => {
    const { tipo_movimentacao, data_inicio, hora_inicio, data_final, hora_final } = req.body;

    const SQL = "INSERT INTO conteiner.movimentacao ( tipo_movimentacao, data_inicio, hora_inicio, data_final, hora_final) VALUES ( ?,?,?,?,?)";
    db.query(SQL, [tipo_movimentacao, data_inicio, hora_inicio, data_final, hora_final], (err, result) => {
        if(err) console.log(err);
        else res.send(result);
    });
});

app.get("/getInfos", (req,res) => {
    const SQL = "SELECT * FROM conteiner.movimentacao";

    db.query(SQL, (err, result) => {
        if(err) console.log(err);
        else res.send(result);
    });
});

app.put("/update", (req,res) => {
    const { id_movimentacao, tipo_movimentacao, data_inicio, hora_inicio, data_final, hora_final } = req.body
    
    const SQL = "UPDATE conteiner.movimentacao SET tipo_movimentacao=?, data_inicio=?, hora_inicio=?, data_final=?, hora_final=? WHERE id_movimentacao= ?";
    
    db.query(SQL, [tipo_movimentacao, data_inicio, hora_inicio, data_final, hora_final, id_movimentacao], (err, result) => {
        if(err) console.log(err);
        else res.send(result);
    });
    });
    
    app.delete("/clear/:id_movimentacao", (req, res) => {
        const { id_movimentacao } = req.params
    
        const SQL = "DELETE FROM conteiner.movimentacao WHERE id_movimentacao= ?";
        db.query(SQL, [id_movimentacao], (err, result) => {
            if(err) console.log(err);
            else res.send(result);
        });
    });

// RELATORIO

app.get("/getClientes", (req, res) => {
    const SQL = "SELECT COUNT(conteiner_id) AS quantidade_conteiner, cliente_nome FROM conteiner.clientes GROUP BY cliente_nome"
    db.query(SQL, (err, result) => {
        if(err) console.log(err);
        else res.send(result);
    });
})

app.get("/getMov", (req, res) => {
    const SQL = "SELECT COUNT(id_movimentacao) AS quantidade_movimentacao, tipo_movimentacao FROM conteiner.movimentacao GROUP BY tipo_movimentacao"
    db.query(SQL, (err, result) => {
        if(err) console.log(err);
        else res.send(result);
    });
})

app.get("/getTotal", (req,res) => {
    const SQL = `SELECT
    (SELECT COUNT(categoria) FROM conteiner.clientes WHERE categoria = 'IMPORTAÇÃO') AS total_importacoes,
    (SELECT COUNT(categoria) FROM conteiner.clientes WHERE categoria = 'EXPORTAÇÃO') AS total_exportacoes;`;
    
    db.query(SQL, (err, result) => {
        if(err) console.log(err);
        else res.send(result);
    });
})

app.listen(3001, () => {
    console.log('Open on PORT 3001');
})