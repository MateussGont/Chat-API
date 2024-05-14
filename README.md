# Sistema de Chat

Este é um sistema de chat simples construído com Node.js e Express.

## Funcionalidades

O sistema de chat suporta as seguintes funcionalidades:

- **Gerenciamento de Usuários:** Os usuários podem se registrar, fazer login, visualizar informações do usuário e tornar-se administradores.
- **Sessões de Chat:** Os usuários podem criar salas de chat, entrar e sair de salas de chat, e os administradores podem remover salas de chat.
- **Mensagens:** Os usuários podem enviar e receber mensagens em tempo real dentro das salas de chat. O histórico de mensagens é armazenado para cada sala.

## Rotas

Aqui estão algumas das rotas disponíveis no sistema de chat:

#### `GET /users`: Retorna todos os usuários.
- Exemplo de resposta: 
    ```json
    [
        {
            "login": "usuarioExemplo",
            "password": "senhaExemplo",
            "id": 1,
            "isAdmin": false,
            "isLoggedIn": false
        },
        {
            "login": "usuarioExemplo2",
            "password": "senhaExemplo2",
            "id": 2,
            "isAdmin": true,
            "isLoggedIn": true
        }
    ]
    ```
#### `POST /users`: Registrar um novo usuário.
- Exemplo de requisição: 
    ```json
    {
        "login": "usuarioExemplo",
        "password": "senhaExemplo"
    }
    ```
- Retorno: Retorna o usuário criado.  400 com a mensagem 'O login já está em uso.'.
    - Exemplo de resposta: 
    ```json
    {
        "login": "usuarioExemplo",
        "password": "senhaExemplo",
        "id": 1,
        "isAdmin": false,
        "isLoggedIn": false
    }
    ```
#### `POST /users/:userId/admin`: Torna um usuário administrador.
- Retorno: Retorna uma mensagem de sucesso. Se o usuário não for encontrado, retorna um erro 404.
    - Exemplo de resposta: 
    ```json
    {
        "message": "Usuário agora é um administrador."
    }
    ```
#### `GET /users/:userId`: Obter informações de um usuário específico.
- Retorno: Retorna as informações do usuário. Se o usuário não for encontrado, retorna um erro 404.
    - Exemplo de resposta: 
    ```json
    {
        "login": "usuarioExemplo",
        "password": "senhaExemplo",
        "id": 1,
        "isAdmin": false,
        "isLoggedIn": false
    }
    ```
#### `POST /users/login`: Autenticar um usuário.
- Exemplo de requisição: 
    ```json
    {
        "login": "usuarioExemplo",
        "password": "senhaExemplo"
    }
    ```
- Retorno: Se o login e a senha estiverem corretos, retorna uma mensagem de sucesso. Se o usuário não for encontrado, retorna um erro 404. Se a senha estiver incorreta, retorna um erro 401. Se o usuário já estiver logado, retorna um erro 401 com a mensagem 'Usuário Já Logado'.
    - Exemplo de resposta: 
    ```json
    {
        "message": "Login efetuado com sucesso."
    }
    ```
#### `GET /rooms`: Retorna todas as salas de chat.
- Exemplo de resposta: 
    ```json
    [
        {
            "roomName": "nomeDaSala",
            "id": 1,
            "users": []
        },
        {
            "roomName": "nomeDaSala2",
            "id": 2,
            "users": [
                {
                    "login": "usuarioExemplo",
                    "password": "senhaExemplo",
                    "id": 1,
                    "isAdmin": false,
                    "isLoggedIn": false
                }
            ]
        }
    ]
    ```
#### `POST /rooms`: Criar uma nova sala de chat.
- Exemplo de requisição: 
    ```json
    {
        "login": "usuarioExemplo",
        "isLoggedIn": true,
        "roomName": "nomeDaSala"
    }
    ```
 - Retorno: Retorna a sala de chat criada. Se o usuário não estiver autenticado, retorna um erro 401. Se o usuário não for encontrado, retorna um erro 404.
    - Exemplo de resposta: 
    ```json
    {
        "roomName": "nomeDaSala",
        "id": 1,
        "users": []
    }
    ```
#### `DELETE /rooms/{roomId}`: Remover uma sala de chat.
- Exemplo de requisição: 
    ```json
    {
        "login": "usuarioExemplo"
    }
    ```
- Retorno: Retorna uma mensagem de sucesso. Se a sala não for encontrada, retorna um erro 404. Se o usuário não for um administrador, retorna um erro 403. Se o usuário não estiver autenticado, retorna um erro 401. Se o usuário não for encontrado, retorna um erro 404.
    - Exemplo de resposta: 
    ```json
    {
        "message": "Sala removida com sucesso."
    }
    ```
#### `POST /rooms/{roomId}/enter`: Entrar em uma sala de chat.
- Exemplo de requisição: 
    ```json
    {
        "id": 1,
        "login": "usuarioExemplo",
        "isLoggedIn": true
    }
    ```
    - Retorno: Retorna uma mensagem de sucesso. Se a sala não for encontrada, retorna um erro 404. Se o usuário já estiver na sala, retorna um erro 400. Se o usuário não estiver autenticado, retorna um erro 401. Se o usuário não for encontrado, retorna um erro 404.
    - Exemplo de resposta: 
    ```json
    {
        "message": "Usuário entrou na sala com sucesso."
    }
    ```
#### `POST /rooms/{roomId}/leave`: Sair de uma sala de chat.
- Exemplo de requisição: 
    ```json
    {
        "id": 1,
        "login": "usuarioExemplo",
        "isLoggedIn": true
    }
    ```
- Retorno: Retorna uma mensagem de sucesso. Se a sala não for encontrada, retorna um erro 404. Se o usuário não estiver na sala, retorna um erro 400.
    - Exemplo de resposta: 
    ```json
    {
        "message": "Usuário saiu da sala com sucesso."
    }
    ```
#### `DELETE /rooms/{roomId}/users/{userId}`: Remover um usuário de uma sala específica.
- Retorno: Retorna uma mensagem de sucesso. Se a sala não for encontrada, retorna um erro 404. Se o usuário não estiver na sala, retorna um erro 400.
    - Exemplo de resposta: 
    ```json
    {
        "message": "Usuário removido da sala com sucesso."
    }
    ```
#### `POST /messages/direct/{receiverId}`: Enviar uma mensagem direta para outro usuário.
- Exemplo de requisição: 
    ```json
    {
        "senderId": 1,
        "message": "Olá, tudo bem?"
    }
    ```
    - Retorno: Retorna a mensagem enviada. Se o usuário não for encontrado, retorna um erro 404. Se o usuário não estiver autenticado, retorna um erro 401. Se o destinatário não for encontrado, retorna um erro 404.
    - Exemplo de resposta: 
    ```json
    {
        "senderId": 1,
        "receiverId": 2,
        "message": "Olá, tudo bem?"
    }
    ```
#### `POST /rooms/{roomId}/messages`: Enviar uma mensagem para uma sala de chat.
- Exemplo de requisição: 
    ```json
    {
        "senderId": 1,
        "message": "Olá, pessoal!"
    }
    ```
- Retorno: Retorna a mensagem enviada.
    - Exemplo de resposta: 
    ```json
    {
        "senderId": 1,
        "roomId": 1,
        "message": "Olá, pessoal!"
    }
    ```
#### `GET /rooms/{roomId}/messages`: Receber mensagens de uma sala de chat.
 - Exemplo de requisição: 
    ```json
    {
        "userId": 1
    }
    ```
- Retorno: Retorna todas as mensagens da sala de chat. Se o usuário não estiver autenticado, retorna um erro 403. Se o usuário não estiver na sala, retorna um erro 403.
    - Exemplo de resposta: 
    ```json
    [
        {
            "senderId": 1,
            "roomId": 1,
            "message": "Olá, pessoal!"
        },
        {
            "senderId": 2,
            "roomId": 1,
            "message": "Olá, como vocês estão?"
        }
    ]
    ```

## Como executar

1. Clone este repositório.
2. Navegue até a pasta do repositório no terminal.
3. Execute `npm install` para instalar as dependências.
4. Execute `node index.js` para iniciar o servidor.
5. O servidor estará rodando em `http://localhost:3000`.


## Licença

Este projeto está licenciado sob a licença MIT.
