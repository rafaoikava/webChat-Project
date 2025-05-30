<template>
  <div class="navChatBox">
<div v-for="group in groups" :key="group.id" :class="['chatNavItem' , {active: group.id === activeGroup}]" @click="$emit('select-group', group.id)" >
{{group.name}}
</div>
  </div>
</template>

<script>
export default {
  props: {
    groups: Array,
    activeGroup: String
  }
};
</script>

<style>
.navChatBox {
  color: rgb(233, 227, 227);
  grid-column-end: 2;
  grid-row-end: span 3;
  border-right: 2px solid rgba(0, 0, 0, 0.5);
  background-color: rgb(172, 170, 170);
}

.chatNavItem {
  padding: 10px;
  cursor: pointer;
  color: black;
}
.chatNavItem.active,
.chatNavItem:hover {
  background: #bdbdbd;
  font-weight: bold;
}


</style>