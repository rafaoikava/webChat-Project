<template>
  <div class="main">
    <chatNavBox
      :groups="groups"
      :activeGroup="activeGroup"
      @select-group="selectGroup"
    />
    <chatTextBox @send-message="sendMessage" />
    <chatBoxViewer :messages="filteredMessages" />
  </div>
</template>

<script>
import chatNavBox from "../components/ChatNav.vue";
import chatTextBox from "../components/ChatText.vue";
import chatBoxViewer from "../components/ChatBox.vue";

const ALL_GROUPS = [
  { name: "Todos", id: "todos" },
  { name: "Comercial", id: "comercial" },
  { name: "Suporte", id: "suporte" },
  { name: "Financeiro", id: "financeiro" },
];

export default {
  components: { chatNavBox, chatTextBox, chatBoxViewer },
  props: {
    user: Object,
    socket: Object,
  },
  data() {
    const userGroups = this.user?.groups || ["todos"];
    const filteredGroups = ALL_GROUPS.filter((g) => userGroups.includes(g.id));
    return {
      groups: filteredGroups,
      activeGroup: filteredGroups[0]?.id || "todos",
      messages: [],
    };
  },
  computed: {
    filteredMessages() {
      return this.messages.filter((m) => m.group === this.activeGroup);
    },
  },
  mounted() {
    this.socket.on("chat history", (history) => {
      this.messages = history;
      console.log("historico", history);
      this.messages = Array.isArray(history) ? history : [];
    });
    this.socket.on("chat message", (msgObj) => {
      this.messages.push(msgObj);
    });
  },
  methods: {
    sendMessage(msg) {
      if (msg.trim()) {
        this.socket.emit("chat message", {
          msg,
          group: this.activeGroup,
        });
      }
    },
    selectGroup(groupId) {
      this.activeGroup = groupId;
    },
  },
};
</script>

<style>
.main {
  background-color: rgba(201, 201, 201, 0.623);
  display: grid;
  grid-template-columns: 200px 1fr;
  grid-template-rows: 1fr 70px;
  column-gap: 1px;
  row-gap: 1px;
  border-radius: 5px;
  overflow: hidden;
}
</style>
