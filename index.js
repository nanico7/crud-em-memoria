import express from "express";

const app = express();
app.use(express.json());


let ultimoId = 1;

let usuarios = [
  {
    id: ultimoId,
    nome: "admin",
    email: "admin@admin"
  },
  {
    id: ++ultimoId,
    nome: "postman",
    email: "post@man.com.br"
  },
  {
    id: ++ultimoId,
    nome: "ana",
    email: "ana@email.com"
  },
  {
    id: ++ultimoId,
    nome: "carlos",
    email: "carlos@email.com"
  },
  {
    id: ++ultimoId,
    nome: "maria",
    email: "maria@email.com"
  },
  {
    id: ++ultimoId,
    nome: "joao",
    email: "joao@email.com"
  },
  {
    id: ++ultimoId,
    nome: "lucas",
    email: "lucas@email.com"
  },
  {
    id: ++ultimoId,
    nome: "beatriz",
    email: "bia@email.com"
  },
  {
    id: ++ultimoId,
    nome: "fernando",
    email: "fernando@email.com"
  },
  {
    id: ++ultimoId,
    nome: "juliana",
    email: "juliana@email.com"
  },
  {
    id: ++ultimoId,
    nome: "rafael",
    email: "rafa@email.com"
  },
  {
    id: ++ultimoId,
    nome: "lais",
    email: "lais@email.com"
  }
];

app.get('/usuario', (req, res) =>{
    const limit = parseInt(req.query.limit) || usuarios.length;

    res.json(usuarios.slice(0, limit)).status(200);
});
app.post('/usuario', (req, res) =>{


    const {nome, email} = req.body;
    if(!nome || !email){
        return res.status(400).json({mensagem: "nome e email obrigatórios"});
    }

    const email_valido = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if(email_valido.test(email)){
        return res.status(400).json({mensagem: "email inválido!!"})
    }

    ultimoId++;
    const novoUsuario = { id: ultimoId, nome, email };
    usuarios.push(novoUsuario);
    return res.status(201).json({mensagem: "criado"});

    
});

app.get('/usuario/:id', (req, res) =>{
    const { id } = req.params;
    const usuario = usuarios.find(u => u.id == id)

    if(!usuario){
        return res.status(404).json({mensagem: "usuario não encontrado!!"});
    }
    res.json(usuario);
});

app.put('/usuario/:id', (req, res) =>{
    const { id } = req.params;
    const { nome, email} = req.body;

    const usuario = usuarios.find(u =>u.id == id);

    if(!usuario){
        return res.status(404).json({mensagem: "usuario não encontrado!!!"});
    };
    res.json({mensagem: `usuario ${usuario.nome}, do id ${usuario.id} foi alterado`});
    if(nome) usuario.nome = nome;
    if(email) usuario.email = email;

});

app.delete('/usuario/:id', (req, res) =>{
    const { id } = req.params;
    const idnumber = parseInt(id);
    if(isNaN(idnumber)){
      return res.status(400).json({mensagem: "o id precisa ser um número inteiro"})
    }
    let usuario_deletado = usuarios.findIndex(u => u.id == id);
    let usuario_deletado_info = usuarios.find(u => u.id == id);

    if(usuario_deletado === -1){
        return res.status(404).json({mensagem: "usuario não foi encontrado!"});
    };


    res.json({mensagem: `usuario ${usuario_deletado_info.nome}, do id ${usuario_deletado_info.id} foi deletado`});
    usuarios.splice(usuario_deletado, 1)

});

app.patch('/usuario/:id', (req, res) => {
 const id = parseInt(req.params.id);

 if(isNaN(id)) {
    return res
    .status(400)
    .json({mensagem: "ID inválido, precisa ser um número"});
 }

 const usuario = usuarios.find((usuario) => usuario.id === id);
 if(!usuario) {
    return res.status(404).json({mensagem: "usuario não encontrado"});
 }

 const{nome, email} = req.body;

 if(!nome && !email) {
    return res.status(400).json({mensagem: "pelo menos um dos dados"});
}
console.log(`USUARIO ANTES DE EU ATUALIZAR ${usuario.id}:`,);
if(email){
let email_existe = usuarios.findIndex((usuario) => usuario.email === email);

if(email_existe !== -1) {
    return res.status(409).json({mensagem: "Email ja cadastrado"});
 }
 usuario.email = email;
    console.log(`antes de atualizar EMAIL ${usuario}`);
}

    if(nome) {
        let usuario_a_atualizar = usuarios.find((usuario) => usuario.id === id);
        usuario_a_atualizar.nome = nome;
        usuario.email = email;
        console.log(`antes de atualizar NOME ${usuario}`);
    }
    res.status(200).json(usuario);
});

app.get("/usuario/:id", (req,res) => {
    return res.status(200).json(usuarios.find((usuario) => usuario.id === parseInt(req.params.id)));
})

app.listen(3000);