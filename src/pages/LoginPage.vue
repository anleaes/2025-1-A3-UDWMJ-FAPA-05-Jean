<template>
  <div class="login-content">
    <h5>Fazer login</h5>
    <LoginForm :type="'LOGIN'" @cancel="toHome()" @submit="onSubmit"/>
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
  flex-direction: column;
  align-items: center;
  padding: 10%;
}
h5 {
  margin: 0;
}
</style>
