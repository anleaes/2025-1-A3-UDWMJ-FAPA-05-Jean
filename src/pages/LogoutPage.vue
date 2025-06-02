<template>
  <div class="logout-content">
    <h5>Deseja sair da sua conta?</h5>
    Conta ativa: {{ user }}
    <div class="logout-content-buttons">
      <q-btn label="SIM" color="primary" @click="onExit"/>
      <q-btn label="NÃO" color="primary" flat @click="toHome"/>
    </div>
  </div>
</template>

<script>
import { userStore } from 'src/stores/userStore.js'
import { logoutUser } from 'src/services/userServices.js'

export default {
    name: "LogoutPage",
    data() {
      return {
        user: userStore.user
      }
    },
    methods: {
      toHome() {
        this.$router.push('/');
      },
      onExit() {
        logoutUser(this.$router);
      }
    },
}
</script>

<style>
.logout-content {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 10%;
  gap: 16px;
}
.logout-content-buttons {
  display: flex;
  gap: 8px;
}
h5 {
  margin: 0;
}
</style>
