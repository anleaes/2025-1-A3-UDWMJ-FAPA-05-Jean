<template>
  <div class="login-content">
    <div class="login-content-log">
      <h5>FAZER LOGIN</h5>
      <LoginForm @cancel="toHome()" @submit="onSubmit"/>
    </div>
  </div>
  <div class="login-content-new">
    <h5>OU</h5>
    <q-btn outline @click="this.$router.push('/register')" color="primary" icon="add" label="CRIAR UMA CONTA" />
  </div>
</template>

<script>
import LoginForm from 'src/components/LoginForm.vue'
import { loginUser } from 'src/services/userServices.js'

export default {
    name: "LoginPage",
    components: { LoginForm },
    methods: {
        toHome() {
            this.$router.push('/');
        },
        onSubmit(user) {
          loginUser(user, this.$router)
        },
    },
}
</script>

<style>
.login-content {
  display: flex;
  align-items: center;
  flex-direction: column;
}

.login-content-log {
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  padding: 5%;
}

.login-content-new {
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  gap: 8px;
}

h5 {
  margin: 0;
}
</style>
