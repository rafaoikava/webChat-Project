<template>
  <div id="app">
    <ChatLogin v-if="!user" @login-success="onLoginSuccess"/>
    <ChatMainBox v-else :user="user" :socket="socket"/>
  </div>
</template>

<script>
import ChatMainBox from "./components/ChatMain.vue";
import ChatLogin from "./components/ChatLogin.vue";
export default {
  components: { ChatMainBox, ChatLogin },
  data() {
    return {
      user: null,
      socket: null
    };
  },
  methods: {
    onLoginSuccess({user, socket}) {
      this.user = user;
      this.socket = socket;
    }
    
  }
};
</script>

<style>
#app {
  display: grid;
  height: 550px;
  width: 1200px;
  box-shadow: 3px 5px 5px 2px rgba(0, 0, 0, 0.3);
  border-radius: 3px;
  overflow: hidden;
  background-color: rgba(201, 201, 201, 0.623);
}
</style>