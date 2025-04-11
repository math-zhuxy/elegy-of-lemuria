<template>
  <div id="app-header" v-if="IsPressBtn === true">
    <h1 id="app-main-title">ELEGT OF LEMURA</h1>
    <div id="app-router">
      <router-link to="/">Home</router-link>
      <router-link to="/about">About</router-link>
      <router-link to="/game">Game</router-link>
      <router-link to="/login">Login</router-link>
    </div>
  </div>
  <!-- <button @click="Click">登录</button> -->
  <router-view></router-view>
</template>
<script setup lang="ts">
import { ref } from 'vue';
const IsPressBtn = ref(true);
function Click() {
  IsPressBtn.value = !IsPressBtn.value;
}
</script>
<style scoped>
#app-header {
  justify-content: center;
  display: flex;
  gap: 20px;
  align-items: center;
}

#app-main-title {
  text-align: center;
}

#app-router {
  display: flex;
  gap: 20px;
  padding: 15px;
  border: 3px solid black;
  border-radius: 25px;
  font-size: 20px;
  justify-content: center;
  align-items: center;
  font-weight: bold;
}

#app-router a {
  padding: 3px 12px;
  text-decoration: none;
  color: rgba(74, 58, 8, 0.703);
}

#app-router a:hover {
  background-color: rgb(33, 209, 63);
}

#app-router a.router-link-exact-active {
  border-bottom: 3px solid #0f3b27;
  color: black;
}
</style>