const express = require('express');
const http = require('http');
const { Server } = require('socket.io');

const app = express();
const port = 3030;
const server = http.createServer(app);
const io = new Server(server, {
    cors: { origin: '*' }
});

const USERS = [
    { username: "comercial1", role: "comer1", groups: ["todos", "comercial"] },
    { username: "comercial2", role: "comer2", groups: ["todos", "comercial"] },
    { username: "suporte", role: "sup1", groups: ["todos", "suporte"] },
    { username: "financeiro", role: "finan1", groups: ["todos", "financeiro"] },
    { username: "adm", role: "adm", groups: ["todos", "comercial", "financeiro", "suporte"] }
];

const GROUPS = [
    {name: "Todos", id: "todos"},
    {name: "Comercial", id: "comercial"},
    {name: "Suporte", id: "suporte"},
    {name: "Financeiro", id: "financeiro"}
];

io.on('connection', (socket) => {
    console.log('Alguem conectou hein');

    socket.on('login', (username) => {
        const user = USERS.find(u => u.username === username);
        if (user) {
            socket.username = username;
            socket.role = user.role;
            socket.groups = user.groups,
            socket.emit('login success', user);
            console.log(`usuário logado: ${username}`)
        } else {
            socket.emit('login error', 'Usuário ou senha incorretos')
        }
    });


    socket.on('chat message', (data) => {
        io.emit('chat message', {
            username: socket.username || 'Anonimo',
            msg: data.msg,
            group: data.group      
        });
    });
});

server.listen(port, () => {
    console.log(`ta funcionando na porta ${port}`)
});