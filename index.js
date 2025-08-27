import express from'express';

const app = express();  
app.use(express.json());

let ultimoId = 1;
const usuario = 
    {ultimoId: 1,
        nome: 'Thiago', 
        email: "thiago@gmail.com",
     }
let usuarios = [usuario]

app.get('/usuarios', (req, res) => {
    res.json(usuarios).status(200);
});

app.post('/usuarios', (req, res) => {
    const {nome, email } = req.body;
    console.log(nome);
    console.log(email);
    if (!nome || !email) {
        return res.status(400).json({ error: 'Nome e email são obrigatórios.' });
    }
});

app.listen(3000);

/*
* criar uma rota para pegar todos os usuarios
* criar uma rota para cadastrar um cadastro
*  criar uma rota para deletar um cadastro
*  criar uma rota para atualizar um cadastro
*/
