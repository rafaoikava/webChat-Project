const express = require("express");
const http = require("http");
const { Server } = require("socket.io");
const {
  readHistory,
  writeHistory,
  addMessageToHistory,
} = require("./src/historyUtilities.js");
const { USERS, GROUPS } = require("./src/data.js");
const fs = require("fs");
const { timeStamp, group } = require("console");

const app = express();
const port = 3030;
const server = http.createServer(app);
const io = new Server(server, {
  cors: { origin: "*" },
});

io.on("connection", (socket) => {
  console.log("Alguem conectou hein");

  socket.on("login", (username, password) => {
    const user = USERS.find(
      (u) => u.username === username && u.password === password
    );
    if (user) {
      socket.username = username;
      socket.role = user.role;
      (socket.groups = user.groups), socket.emit("login success", user);
      socket.emit("chat history", readHistory());
      console.log(`usuário logado: ${username}`);
    } else {
      socket.emit("login error", "Usuário ou senha incorretos");
    }
  });

  socket.on("chat message", (data) => {
    if (!socket.username) {
      socket.emit("chat message", {
        username: "Sistema",
        msg: "Você precisa estar logado para enviar mensagens",
        group: data.group,
        timeStamp: Date.now(),
      });
      return;
    }
    const msgObj = {
      username: socket.username,
      msg: data.msg,
      group: data.group,
      timeStamp: Date.now(),
    };
    io.emit("chat message", msgObj);
    addMessageToHistory(msgObj);
  });
});

server.listen(port, () => {
  console.log(`ta funcionando na porta ${port}`);
});
