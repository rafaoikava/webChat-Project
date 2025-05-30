<template>
  <div class="chatTextBox">
    <input type="text" class="textbox" v-model="message" @keyup.enter="emitMessage" placeholder="digite sua mensagem"/>
    
    <button class="textbutton" @click="emitMessage">
      enviar
    </button>
  </div>
</template>

<script>
export default {
  data(){
    return {
      message: ""
    }
  },
  methods: {
    emitMessage() {
      if (this.message.trim()){
        this.$emit("send-message", this.message);
        this.message = "";
      }
    }
  }
};
</script>

<style>
.chatTextBox {
  background-color: rgb(172, 170, 170);
  color: white;
  grid-column-start: 2;
  grid-row-start: 2;
  border-top: 1px solid rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: space-between;
}

.textbutton,
.textbox {
  margin: 10px;
  border-radius: 5px 5px 5px 5px;
}

.textbox {
  width: 900px;
}
</style>