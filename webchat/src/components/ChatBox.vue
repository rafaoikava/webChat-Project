<template>
  <div class="chatBoxViewer">
    <div class="boxViewer" ref="boxViewer">
      <div v-for="(msg, idx) in messages" :key="idx">{{ msg .username}}: {{msg.msg}}</div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    messages: {
      type: Array,
      default: () => [],
    },
  },
  watch: {
    messages(){
      this.$nextTick(() => {
        const el = this.$refs.boxViewer;
        if (el) el.scrollTop = el.scrollHeight;
      })
    }
  }
};
</script>

<style>
.chatBoxViewer {
  background-color: rgb(172, 170, 170);
  color: black;
  font-weight: 500;
  font-size: 18px;
}

.boxViewer {
  padding: 10px;
  margin: 5px;
  height: 450px;
  border-radius: 5px;
  background-color: rgba(0, 0, 0, 0.15);
  overflow: auto;
}
</style>