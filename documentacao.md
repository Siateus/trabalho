# Documentação Rotas
## Login

**POST** `api/funcionarios/login`

**POST** `api/gestores/login`
## Entrada

![Print tela de Inicio](/imagens/inicio.png)
![Print tela de login](/imagens/login.png)

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
**POST** `api/gestores/usuarios`

### Entrada:


![Print da Tela de Cadastro]( /imagens/cadastro.png )

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
**GET** `api/gestores/usuarios`

### Resposta:


![Print Tela de  Funcionarios](/imagens/funcionarios.png)

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
**GET** `api/gestores/usuarios/cargo/Gerente`

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
**PUT** `api/gestores/usuarios/editar/675f7554fdb3817a5f9c924c`

### Entrada:


![Print tela de configurações ](/imagens/cadastro.png)

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
**DELETE** `api/gestores/usuarios/deletar/675f7554fdb3817a5f9c924c`

### Resposta:
```json
{
  "messagem": "Usuário deletado com sucesso"
}
```
---

## Enviar Mensagem
**POST** `api/gestores/mensagens/funcionario/6761cab88ff8425106b8e83e`

### Entrada:


![Print Tela de Enviar Mensagem](/imagens/mensagens.png)

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
**GET** `api/funcionarios/notificacoes/:id`

### Resposta:

![Print Notificações](/imagens/notificações.png)

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
**DELETE** `api/gestores/mensagem/deletar/:id`

### Resposta:

![Print de Tela de lista de mensagens com opção de deletar](/imagens/funcionarios.png)

```json

{
  "message": "Mensagem deletada com sucesso"
}
```
---

## Listar Mensagens
**GET** `api/gestores/mensagens/exibir`

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

**GET** `api/funcionarios/perfil/:id`

**GET** `api/gestores/perfil/:id`

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
![Print tela de Perfil](/imagens/perfil.png)
