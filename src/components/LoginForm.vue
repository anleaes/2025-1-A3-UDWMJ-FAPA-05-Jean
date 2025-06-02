<template>
  <div class="q-pa-md" style="max-width: 600px; width: 100%;">
    <q-form @submit="onSubmit" @reset="onReset" class="q-gutter-md">
      <q-input
        filled
        v-model="user.email"
        label="Seu e-mail *"
        hint="e-mail completo"
        lazy-rules
        :rules="[ val => val && val.length > 0 || 'Digite seu e-mail completo']"
      />

      <q-input
        filled
        v-model="user.password"
        label="Sua senha *"
        hint="Senha completa"
        lazy-rules
        :rules="[ val => val && val.length > 0 || 'Digite sua senha completa']"
      />

      <div>
        <q-btn :label="type" type="submit" color="primary"/>
        <q-btn label="APAGAR" @click="onCancel" color="primary" flat class="q-ml-sm" />
      </div>
    </q-form>
  </div>
</template>

<script>
    export default {
        emits: ["cancel", "submit"],
        name: "LoginForm",
        data() {
          return {
            user: {
              email: "",
              password: "",
            }
          }
        },
        methods: {
          onSubmit() {
            this.$emit('submit', this.user);
          },
          onCancel() {
            this.$emit('cancel');
          }
        },
        props: {
          type: String,
        }
    }
</script>

<style>

</style>
