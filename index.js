const express = require('express');
const app = express();
app.use(express.json());

let users = [];
let sessions = [];
let messages = [];

// Gerenciar usuários
let userId = 1;

app.post('/users', (req, res) => {
    const user = req.body;
    user.id = userId++;

    const existingUser = users.find(u => u.login === user.login);
    if (existingUser) {
        return res.status(400).send({ message: 'O login já está em uso.' });
    }

    users.push(user);
    res.status(201).send(user);
});

app.get('/users/:userId', (req, res) => {
    const user = users.find(u => u.id === Number(req.params.userId));
    if (!user) {
        return res.status(404).send({ message: 'Usuário não encontrado.' });
    }
    res.send(user);
});


app.post('/users/login', (req, res) => {
    // Implementar lógica de autenticação
});


// Gerenciar sessões de chat
app.post('/rooms', (req, res) => {
    // Criar uma nova sala com um ID único
    const room = { id: roomId++, users: [] };

    // Adicionar a sala ao array de salas
    sessions.push(room);

    // Enviar uma resposta com a sala criada
    res.status(201).send(room);
});

app.delete('/rooms/:roomId', (req, res) => {
    // Encontrar a sala no array de salas
    const index = sessions.findIndex(room => room.id === Number(req.params.roomId));

    // Verificar se a sala existe
    if (index === -1) {
        return res.status(404).send({ message: 'Sala não encontrada.' });
    }

    // Remover a sala do array de salas
    sessions.splice(index, 1);

    // Enviar uma resposta de sucesso
    res.status(200).send({ message: 'Sala removida com sucesso.' });
});

app.post('/rooms/:roomId/enter', (req, res) => {
    // Implementar lógica para entrar em uma sala de chat
});

app.post('/rooms/:roomId/leave', (req, res) => {
    // Implementar lógica para sair de uma sala de chat
});

app.delete('/rooms/:roomId/users/:userId', (req, res) => {
    // Implementar lógica para remover um usuário de uma sala específica
});

// Gerenciar mensagens
app.post('/messages/direct/:receiverId', (req, res) => {
    const message = req.body;
    messages.push(message);
    res.status(201).send(message);
});

app.post('/rooms/:roomId/messages', (req, res) => {
    const message = req.body;
    messages.push(message);
    res.status(201).send(message);
});

app.get('/rooms/:roomId/messages', (req, res) => {
    const roomMessages = messages.filter(message => message.roomId === req.params.roomId);
    res.send(roomMessages);
});

app.listen(3000, () => console.log('Chat API is running on port 3000'));
