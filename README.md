# Sistema de Chat

Este é um sistema de chat simples construído com Node.js e Express.

## Funcionalidades

O sistema de chat suporta as seguintes funcionalidades:

- **Gerenciamento de Usuários:** Os usuários podem se registrar, fazer login e visualizar informações do usuário.
- **Sessões de Chat:** Os usuários podem criar salas de chat, entrar e sair de salas de chat, e os administradores podem remover salas de chat.
- **Mensagens:** Os usuários podem enviar e receber mensagens em tempo real dentro das salas de chat. O histórico de mensagens é armazenado para cada sala.

## Rotas

Aqui estão algumas das rotas disponíveis no sistema de chat:

- `POST /users`: Registrar um novo usuário.
    - Exemplo de requisição: 
    ```json
    {
        "login": "usuarioExemplo",
        "password": "senhaExemplo"
    }
    ```
- `POST /users/login`: Autenticar um usuário.
    - Exemplo de requisição: 
    ```json
    {
        "login": "usuarioExemplo",
        "password": "senhaExemplo"
    }
    ```
- `GET /users/{userId}`: Obter informações de um usuário específico.
- `POST /rooms`: Criar uma nova sala de chat.
    - Exemplo de requisição: 
    ```json
    {
        "login": "usuarioExemplo",
        "isLoggedIn": true
    }
    ```
- `DELETE /rooms/{roomId}`: Remover uma sala de chat.
- `POST /rooms/{roomId}/enter`: Entrar em uma sala de chat.
    - Exemplo de requisição: 
    ```json
    {
        "id": 1,
        "login": "usuarioExemplo",
        "isLoggedIn": true
    }
    ```
- `POST /rooms/{roomId}/leave`: Sair de uma sala de chat.
    - Exemplo de requisição: 
    ```json
    {
        "id": 1,
        "login": "usuarioExemplo",
        "isLoggedIn": true
    }
    ```
- `DELETE /rooms/{roomId}/users/{userId}`: Remover um usuário de uma sala específica.
- `POST /messages/direct/{receiverId}`: Enviar uma mensagem direta para outro usuário.
    - Exemplo de requisição: 
    ```json
    {
        "senderId": 1,
        "receiverId": 2,
        "message": "Olá, tudo bem?"
    }
    ```
- `POST /rooms/{roomId}/messages`: Enviar uma mensagem para uma sala de chat.
    - Exemplo de requisição: 
    ```json
    {
        "senderId": 1,
        "roomId": 1,
        "message": "Olá, pessoal!"
    }
    ```
- `GET /rooms/{roomId}/messages`: Receber mensagens de uma sala de chat.

## Como executar

1. Clone este repositório.
2. Navegue até a pasta do repositório no terminal.
3. Execute `npm install` para instalar as dependências.
4. Execute `node app.js` para iniciar o servidor.
5. O servidor estará rodando em `http://localhost:3000`.

## Contribuições

Contribuições são bem-vindas! Por favor, leia as diretrizes de contribuição antes de enviar uma pull request.

## Licença

Este projeto está licenciado sob a licença MIT.
