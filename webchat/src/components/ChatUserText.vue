<template>
  <div class="chatUser">
    <span class="imgUser"> imgUser</span><p class="nameUser">nameUser</p>
  </div>
</template>

<script>
export default {};
</script>

<style>
.chatUser {
  display: flex;
  flex-direction: row;
  align-items: center;
  height: 70px;
  background-color: rgba(0, 0, 0, 0.303);
  justify-content: center;
  margin: 5px 0px 5px 0px;
}

.imgUser{

margin: 10px;

}

.chatUser:hover{
     background-color: rgba(0, 0, 0, 0.114);

}
</style>