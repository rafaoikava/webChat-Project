<template>
  <div class="chatLogin">
    <div class="chatLoginText">
      <h1>Realize o seu acesso com o usuário e senha disponivel</h1>
    </div>
    <div class="accessLogin">
      <form @submit.prevent="login">
        <h2>Usuário:</h2>
        <input v-model="username" placeholder="usuário" />
        <h2>Senha:</h2>
        <input type="password" placeholder="Senha" v-model="password" />

        <button class="enterLogin" type="submit">ENTRAR</button>

        <div class="errorLogin" v-if="error">
          Usuário ou senha incorretos. Verifique e tente novamente!
        </div>
      </form>
    </div>
  </div>
</template>

<script>
import { io } from "socket.io-client";
const socket = io("http://localhost:3030");

export default {
  data() {
    return {
      username: "",
      password: "",
      error: "",
    };
  },
  created() {
    const savedUser = localStorage.getItem("username");
    const savedPass = localStorage.getItem("password");

    if (savedUser && savedPass) {
      this.username = savedUser;
      this.password = savedPass;
      socket.emit("login", savedUser, savedPass);
      socket.once("login success", (user) => {
        this.$emit("login-success", { user, socket });
      });
      socket.once("login error", (msg) => {
        this.error = msg;
        localStorage.removeItem("username");
        localStorage.removeItem("password");
      });
    }

    socket.on("connect", () => {
      const username = localStorage.getItem("username");
      const password = localStorage.getItem("password");
      if (username && password) {
        socket.emit("login", username, password);
      }
    });
  },
  methods: {
    login() {
      socket.emit("login", this.username, this.password);
      socket.once("login success", (user) => {
        localStorage.setItem("username", this.username);
        localStorage.setItem("password", this.password);
        this.$emit("login-success", { user, socket });
      });
      socket.once("login error", (msg) => {
        this.error = msg;
        localStorage.removeItem("username");
        localStorage.removeItem("password");
      });
    },
  },
};
</script>

<style>
.chatLogin {
  display: flex;
  flex-direction: column;
  background-color: rgb(172, 170, 170);
  box-shadow: 3px 5px 5px 2px rgba(0, 0, 0, 0.5);
  height: 350px;
  width: 600px;
  text-align: center;
  margin: auto;
  align-self: center;
  justify-self: center;
  overflow: hidden;
  border-radius: 3px;
}

.errorLogin {
  display: flex;
  flex-direction: column;
  margin: 15px;
  font-weight: bolder;
  color: orangered;
  text-decoration: black underline;
}

.enterLogin {
  display: flex;
  flex-direction: column;
  margin: auto;
}

.accessLogin h2 {
  font-size: 17px;
}

.chatLoginText h1 {
  font-size: 30px;
}
</style>
