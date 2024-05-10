const express = require('express');
const app = express();
app.use(express.json());

let users = [];
let sessions = [];
let messages = {};
let roomId = 1;
let userId = 1;

// Gerenciar usuários
app.get('/users', (req, res) => {
    res.send(users);
})
//Cria novo usuário
app.post('/users', (req, res) => {
    const user = req.body;
    user.id = userId++;
    user.isAdmin = false; // por padrão os usuários não são admins

    const existingUser = users.find(u => u.login === user.login);
    if (existingUser) {
        return res.status(400).send({ message: 'O login já está em uso.' });
    }

    users.push(user);
    res.status(201).send(user);
});

//torna um user admin
app.post('/users/:userId/admin', (req, res) => {

    //Verificações
    const user = users.find(u => u.id === Number(req.params.userId));
    if (!user) {
        return res.status(404).send({ message: 'Usuário não encontrado.' });
    }

    user.isAdmin = true;
    res.status(200).send({ message: 'Usuário agora é um administrador.' });
});

//Retorna um User pelo userId
app.get('/users/:userId', (req, res) => {
    const user = users.find(u => u.id === Number(req.params.userId));
    if (!user) {
        return res.status(404).send({ message: 'Usuário não encontrado.' });
    }
    res.send(user);
});

//realiza login com um usuario existente
app.post('/users/login', (req, res) => {

    const { login, password } = req.body;

    //Verificações
    const user = users.find(u => u.login === login);
    if (!user) {
        return res.status(404).send({ message: 'Usuário não encontrado.' });
    }
    if (user.password !== password) {
        return res.status(401).send({ message: 'Senha incorreta.' });
    }

    // Se o usuário & senha = true =>
    user.isLoggedIn = true;
    res.status(200).send({ message: 'Login efetuado com sucesso.' });
});


// Gerenciar sessões de chat
app.get('/rooms', (req, res) => {
    res.send(sessions);
});

// Criar uma nova sala com id 
app.post('/rooms', (req, res) => {

    const user = req.body;
    const roomName = String(req.params.roomName);

    // Verificações
    const existingUser = users.find(u => u.login === user.login && u.isLoggedIn);
    if (!existingUser) {
        return res.status(401).send({ message: 'Usuário não está autenticado.' });
    }

    // Criar uma nova sala
    const room = { roomName: roomName, id: roomId++, users: [] };
    sessions.push(room);
    res.status(201).send(room);
});

//Apaga uma sala do array
app.delete('/rooms/:roomId', (req, res) => {

    //Verificações
    const user = users.find(u => u.login === user.login && u.isLoggedIn);
    if (!user) {
        return res.status(401).send({ message: 'Usuário não está autenticado.' });
    }
    if (!user.isAdmin) {
        return res.status(403).send({ message: 'Apenas administradores podem excluir salas.' });
    }
    const index = sessions.findIndex(room => room.id === Number(req.params.roomId));
    if (index === -1) {
        return res.status(404).send({ message: 'Sala não encontrada.' });
    }

    //Remove a sala e seu histórico
    sessions.splice(index, 1);
    messages[req.params.roomId].delete;
    res.status(200).send({ message: 'Sala removida com sucesso.' });
});

//Inclui um User numa Room
app.post('/rooms/:roomId/enter', (req, res) => {

    const roomId = Number(req.params.roomId);
    const user = req.body;

    //Verificações
    const room = sessions.find(r => r.id === roomId);
    if (!room) {
        return res.status(404).send({ message: 'Sala não encontrada.' });
    }
    if (room.users.find(u => u.id === user.id)) {
        return res.status(400).send({ message: 'Usuário já está na sala.' });
    }

    room.users.push(user);
    res.status(200).send({ message: 'Usuário entrou na sala com sucesso.' });
});

//Sai de uma sala {Id da sala,login}
app.post('/rooms/:roomId/leave', (req, res) => {

    const roomId = Number(req.params.roomId);
    const user = req.body;

    //Verificações
    const room = sessions.find(r => r.id === roomId);
    const userIndex = room.users.findIndex(u => u.id === user.id);
    if (!room) {
        return res.status(404).send({ message: 'Sala não encontrada.' });
    }
    if (userIndex === -1) {
        return res.status(400).send({ message: 'Usuário não está na sala.' });
    }

    // Remover o usuário da sala
    room.users.splice(userIndex, 1);
    res.status(200).send({ message: 'Usuário saiu da sala com sucesso.' });
});

//deleta um user do array de salas {roomId,userId}
app.delete('/rooms/:roomId/users/:userId', (req, res) => {
    // Obter o ID da sala e do usuário dos parâmetros da rota
    const roomId = Number(req.params.roomId);
    const userId = Number(req.params.userId);

    const room = sessions.find(r => r.id === roomId);
    const userIndex = room.users.findIndex(u => u.id === userId);
    if (!room) {
        return res.status(404).send({ message: 'Sala não encontrada.' });
    }
    if (userIndex === -1) {
        return res.status(400).send({ message: 'Usuário não está na sala.' });
    }

    // Remover o usuário da sala
    room.users.splice(userIndex, 1);
    res.status(200).send({ message: 'Usuário removido da sala com sucesso.' });
});

//Gerenciar Mensagens
// Enviar uma mensagem direta para outro usuário
app.post('/messages/direct/:receiverId', (req, res) => {
    const message = req.body;
    message.receiverId = req.params.receiverId;
    messages.push(message);
    res.status(201).send(message);
});

// Enviar uma mensagem para uma sala de chat
app.post('/rooms/:roomId/messages', (req, res) => {
    const roomId = req.params.roomId;
    const message = req.body;
    message.roomId = roomId;

    // Adicionar o nickname do usuário à mensagem
    const user = users.find(u => u.id === message.senderId);
    if (user) {
        message.nickname = user.login;
    }

    // Adicionar a mensagem ao histórico da sala
    if (!messages[roomId]) {
        messages[roomId] = [];
    }
    messages[roomId].push(message);

    res.status(201).send(message);
});

// Receber mensagens de uma sala de chat
app.get('/rooms/:roomId/messages', (req, res) => {
    const roomId = req.params.roomId;
    const roomMessages = messages[roomId] || [];
    res.send(roomMessages);
});

// Recebe Todas as mensagens do array
app.get('/rooms/messages', (req, res) => {

    const user = users.find(u => u.id === Number(req.body.userId));
    if (!user) {
        return res.status(404).send({ message: 'Usuário não encontrado.' });
    }
    if (!user.isAdmin) {
        return res.status(403).send({ message: 'Apenas administradores podem excluir salas.' });
    }
    res.send(messages);
})

app.listen(3000, () => console.log('Chat API is running on port 3000'));
