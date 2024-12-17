## Login

**POST** `/funcionarios/login`

**POST** `/gestores/login`
## Entrada

![Print tela de Inicio](https:/media.discordapp.net/attachments/851146326326116404/1318707309366743050/Captura_de_tela_2024-12-17_193103.png?ex=67634d62&is=6761fbe2&hm=55251432b04e1bc9846d5f5c425a74cf5e60f4278184e5b793d76fcabb6b8db6&=&format=webp&quality=lossless&width=761&height=425)
![Print tela de login](https://media.discordapp.net/attachments/851146326326116404/1318707309668597780/Captura_de_tela_2024-12-17_193117.png?ex=67634d63&is=6761fbe3&hm=518358058880a477dfb0d127045aa8626517bf697868bbd2a95038d5ce33fcc3&=&format=webp&quality=lossless&width=718&height=425)

```Json
{
  "email": "carlos.pereira12@example.com",
  "senha": "12345678"
}
```

## Resposta



```Json

   {
    "message": "Login bem-sucedido",
    "usuario": {
        "_id": "6761f6932871de188b91095f",
        "nome": "Carlos Pereira",
        "cpf": "322.654.987-10",
        "dataNascimento": "1988-03-22T00:00:00.000Z",
        "idade": 36,
        "email": "carlos.pereira12@example.com",
        "cargo": "Analista de Sistemas",
        "status": "ativo",
        "tipo": "funcionario",
        "imagemPerfil": "caminho/para/imagem.jpg",
        "__v": 0
    }
   }

```




## Cadastrar Usuário
**POST** `/gestores/usuarios`

### Entrada:


![Print da Tela de Cadastro]( https:/media.discordapp.net/attachments/851146326326116404/1318684804627042417/Captura_de_tela_2024-12-17_171335.png?ex=6763386d&is=6761e6ed&hm=c1bda8a3d71e2f4155941db44b89b78caf4ea18a6ae903985626feaa32595a7e&=&format=webp&quality=lossless&width=758&height=425 )

```json
{
  "nome": "João Silva",
  "cpf": "123.456.789-00",
  "dataNascimento": "1990-01-01",
  "idade": 32,
  "email": "joao.silva@example.com",
  "senha": "senha123",
  "cargo": "Analista",
  "tipo": "funcionario"
}
```

### Exemplo de Entrada:
```json
{
  "nome": "Maria Oliveira",
  "cpf": "987.654.321-00",
  "dataNascimento": "1985-05-15T00:00:00.000Z",
  "idade": 37,
  "email": "maria.oliveira@example.com",
  "senha": "senha456",
  "cargo": "Gerente",
  "tipo": "gestor"
}
```

### Resposta:
```json
{
  "nome": "Maria Oliveira",
  "cpf": "987.654.321-00",
  "dataNascimento": "1985-05-15T00:00:00.000Z",
  "idade": 37,
  "email": "maria.oliveira@example.com",
  "senha": "senha456",
  "cargo": "Gerente",
  "tipo": "gestor",
  "_id": "6761b09e8926070cba7b6af3",
  "__v": 0
}
```
---

## Listar Usuários
**GET** `/gestores/usuarios`

### Resposta:


![Print Tela de  Funcionarios](https:/media.discordapp.net/attachments/851146326326116404/1318684804920901662/Captura_de_tela_2024-12-17_171440.png?ex=6763386d&is=6761e6ed&hm=9b6bbcb4d225b16e14230d7b2ee6089b3e54d37883e4ba363b386a974d507154&=&format=webp&quality=lossless&width=769&height=425)

```json

[{
    "_id": "675f7554fdb3817a5f9c924c",
    "nome": "João Silva",
    "cpf": "123.456.789-00",
    "dataNascimento": "1990-01-01T00:00:00.000Z",
    "idade": 32,
    "email": "joao.silva@novoemail.com",
    "senha": "senha123",
    "cargo": "Gerente",
    "tipo": "funcionario",
    "__v": 0
}, {
    "_id": "6761b09e8926070cba7b6af3",
    "nome": "Maria Oliveira",
    "cpf": "987.654.321-00",
    "dataNascimento": "1985-05-15T00:00:00.000Z",
    "idade": 37,
    "email": "maria.oliveira@example.com",
    "senha": "senha456",
    "cargo": "Gerente",
    "tipo": "gestor",
    "__v": 0
}]
```
---

## Listar Usuários por Cargo
**GET** `/gestores/usuarios/cargo/Gerente`

### Resposta:
```json
[{
    "_id": "675f7554fdb3817a5f9c924c",
    "nome": "João Silva",
    "cpf": "123.456.789-00",
    "dataNascimento": "1990-01-01T00:00:00.000Z",
    "idade": 32,
    "email": "joao.silva@novoemail.com",
    "senha": "senha123",
    "cargo": "Gerente",
    "tipo": "funcionario",
    "__v": 0
}, {
    "_id": "6761b09e8926070cba7b6af3",
    "nome": "Maria Oliveira",
    "cpf": "987.654.321-00",
    "dataNascimento": "1985-05-15T00:00:00.000Z",
    "idade": 37,
    "email": "maria.oliveira@example.com",
    "senha": "senha456",
    "cargo": "Gerente",
    "tipo": "gestor",
    "__v": 0
}]
```
---

## Editar Usuário
**PUT** `/gestores/usuarios/editar/675f7554fdb3817a5f9c924c`

### Entrada:


![Print tela de configurações ](https:/media.discordapp.net/attachments/851146326326116404/1318692869103685632/Captura_de_tela_2024-12-17_183423.png?ex=67633ff0&is=6761ee70&hm=b40676d2463687ff3d60d17adbd800cd36fde64d76fcd4f2a6594442deb2e6a1&=&format=webp&quality=lossless&width=742&height=425)

```json

{
  "nome": "João Silva",
  "email": "joao.silva@novoemail.com",
  "cargo": "Gerente"
}
```

### Resposta:
```json
{
    "_id": "675f7554fdb3817a5f9c924c",
    "nome": "João Silva",
    "cpf": "123.456.789-00",
    "dataNascimento": "1990-01-01T00:00:00.000Z",
    "idade": 32,
    "email": "joao.silva@novoemail.com",
    "senha": "senha123",
    "cargo": "Gerente",
    "tipo": "funcionario",
    "__v": 0
}
```
---

## Deletar Usuário
**DELETE** `/gestores/usuarios/deletar/675f7554fdb3817a5f9c924c`

### Resposta:
```json
{
    "messagem": "Usuário deletado com sucesso"
}
```
---

## Enviar Mensagem
**POST** `/gestores/mensagens/funcionario/6761cab88ff8425106b8e83e`

### Entrada:


![Print Tela de Enviar Mensagem](https:/media.discordapp.net/attachments/851146326326116404/1318684805256314920/Captura_de_tela_2024-12-17_171652.png?ex=6763386d&is=6761e6ed&hm=4ca88a022a69be1df81f96f7728703ddd7d20e41cbeab33e7db344f8ee6864a4&=&format=webp&quality=lossless&width=767&height=425)

```json

{
  "conteudo": "Olá, você tem uma nova tarefa."
}
```

### Resposta:
```json
{
    "usuario": "6761cab88ff8425106b8e83e",
    "conteudo": "Olá, você tem uma nova tarefa.",
    "tipo": "funcionario",
    "_id": "6761ccbffcc277f47bd97f90",
    "dataHora": "2024-12-17T19:10:55.231Z",
    "__v": 0
}
```
---

## Listar Notificações
**GET** `/funcionarios/notificacoes/:id`

### Resposta:

![Print Notificações](https:/media.discordapp.net/attachments/851146326326116404/1318684805558435921/Captura_de_tela_2024-12-17_171745.png?ex=6763386d&is=6761e6ed&hm=5c2f5b920fdcdac27331d2a9742c27c8ccedee13f306cb2867bdab015d97ada7&=&format=webp&quality=lossless&width=745&height=425)

```json
[{
    "_id": "6761ccbffcc277f47bd97f92",
    "usuario": "6761cab88ff8425106b8e83e",
    "evento": "Nova Mensagem",
    "dataHora": "2024-12-17T19:10:55.421Z",
    "detalhes": "Olá, você tem uma nova tarefa.",
    "__v": 0
}]
```
---

## Deletar Mensagem
**DELETE** `/gestores/mensagem/deletar/:id`

### Resposta:

![Print de Tela de lista de mensagens com opção de deletar](https:/media.discordapp.net/attachments/851146326326116404/1318684805990453258/Captura_de_tela_2024-12-17_172018.png?ex=6763386d&is=6761e6ed&hm=60fd69d4723ecb45cbeea8d4a2f1cd965ea651d119f31d065ab491196d26b73e&=&format=webp&quality=lossless&width=768&height=425)

```json

{
    "message": "Mensagem deletada com sucesso"
}
```
---

## Listar Mensagens
**GET** `/gestores/mensagens/exibir`

### Exemplo de Saída:
```json
[{
    "_id": "6761dcb100f6c155230eeb67",
    "usuario": "6761cab88ff8425106b8e83e",
    "conteudo": "Olá, você tem uma nova tarefa.",
    "tipo": "funcionario",
    "dataHora": "2024-12-17T20:18:57.939Z",
    "__v": 0
}, {
    "_id": "6761dccb00f6c155230eeb6c",
    "usuario": "6761b09e8926070cba7b6af3",
    "conteudo": "Olá, você tem uma nova tarefa.",
    "tipo": "gestor",
    "dataHora": "2024-12-17T20:19:23.304Z",
    "__v": 0
}]
``` 
---

### Exemplo Rotas  Perfil:

**GET** `/funcionarios/perfil/:id`

**GET** `/gestores/perfil/:id`

## Resposta :


```Json
{
"nome": "Carlos Pereira",
"cpf": "322.654.987-10",
"dataNascimento": "1988-03-22T00:00:00.000Z",
"email": "carlos.pereira12@example.com",
"cargo": "Analista de Sistemas",
"status": "ativo",
"tipo": "funcionario",
"imagemPerfil": "caminho/para/imagem.jpg"
}
```
![Print tela de Perfil](https:/media.discordapp.net/attachments/851146326326116404/1318707310033633341/Captura_de_tela_2024-12-17_193129.png?ex=67634d63&is=6761fbe3&hm=1a92a9821d1da07e4f257b4c1c88139607873116e1a133841d6f5cde7bca6b21&=&format=webp&quality=lossless&width=767&height=425)
