<template>
  <div class="q-pa-md" style="max-width: 600px; width: 100%;">
    <q-form @submit="onSubmit" class="q-gutter-md">
      <q-input
        filled
        v-model="user.OCI.EMAIL"
        label="E-mail *"
        hint="e-mail completo"
        lazy-rules
        :rules="[ val => val && val.length > 0 || 'Digite seu e-mail completo']"
      />

      <q-input
        filled
        v-model="user.OCI.FIRST_NAME"
        label="Primeiro nome *"
        hint="Primeiro nome completo"
        lazy-rules
        :rules="[ val => val && val.length > 0 || 'Digite seu primeiro nome']"
      />

      <q-input
        filled
        v-model="user.OCI.LAST_NAME"
        label="Ultimo nome *"
        hint="Ultimo nome completo"
        lazy-rules
        :rules="[ val => val && val.length > 0 || 'Digite seu ultimo nome']"
      />

      <q-input
        filled
        v-model="user.OCI.CELL_PHONE"
        label="Celular *"
        hint="Numero de celular"
        lazy-rules
        :rules="[ val => val && val.length > 0 || 'Digite seu numero de celular']"
      />

      <q-input
        filled
        v-model="user.OCI.ADDRESS"
        label="Endereco *"
        hint="Endereco completo"
        lazy-rules
        :rules="[ val => val && val.length > 0 || 'Digite seu Endereco completo']"
      />

      <q-select filled v-model="user.OCI.GENDER" :options="options" label="Genero" hint="Escolha seu genero" />

      <q-input
        filled
        v-model="user.password"
        label="Sua senha *"
        hint="Senha completa"
        lazy-rules
        :rules="[ val => val && val.length > 0 || 'Digite sua senha completa']"
      />

      <div>
        <q-btn label="CRIAR CONTA" type="submit" color="primary"/>
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
              OCI: {
                EMAIL: "",
                FIRST_NAME: "",
                LAST_NAME: "",
                CELL_PHONE: "",
                GENDER: "",
                ADDRESS: "",
              },
              password: "",
            },
            options: ['M', 'F', 'O']
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
