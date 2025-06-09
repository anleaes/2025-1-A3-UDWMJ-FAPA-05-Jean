<template>
  <div class="register-content">
    <h5>Criar uma conta</h5>
    <RegisterForm @cancel="toHome()" @submit="onSubmit"/>
  </div>
</template>

<script>
import RegisterForm from 'src/components/RegisterForm.vue'
import { registerUser } from 'src/services/userServices.js'

export default {
    name: "RegisterPage",
    components: { RegisterForm },
    methods: {
        toHome() {
            this.$router.push('/');
        },
        onSubmit(user) {
          registerUser(user, this.$router)
        },
    },
}
</script>

<style>
.register-content {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 5%;
}
h5 {
  margin: 0;
}
</style>
