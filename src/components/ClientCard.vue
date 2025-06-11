<template>
  <div class="q-pa-lg">
    <div class="q-gutter-md q-mb-md profile-header">
      <div class="profile-header-left">
        <q-avatar size="56px" color="primary" text-color="white">
          <q-icon name="person" />
        </q-avatar>
        <div>
          <div class="text-h5">{{ client.FIRST_NAME }} {{ client.LAST_NAME }}</div>
          <div class="text-subtitle2 text-grey">Cliente N° {{ client.ID }}</div>
        </div>
      </div>
      <q-btn @click="this.$router.push('/logout')" flat color="red" icon="logout" label="SAIR DA CONTA" />
    </div>
    <q-list bordered class="rounded-borders bg-white">
      <q-item>
        <q-item-section avatar><q-icon name="email" /></q-item-section>
        <q-item-section>
          <q-item-label>Email</q-item-label>
          <q-item-label caption>{{ client.EMAIL }}</q-item-label>
        </q-item-section>
      </q-item>
      <q-separator/>
      <q-item>
        <q-item-section avatar><q-icon name="phone" /></q-item-section>
        <q-item-section>
          <q-item-label>Celular</q-item-label>
          <q-item-label caption>{{ client.CELL_PHONE }}</q-item-label>
        </q-item-section>
      </q-item>
      <q-separator/>
      <q-item>
        <q-item-section avatar><q-icon name="home" /></q-item-section>
        <q-item-section>
          <q-item-label>Endereço</q-item-label>
          <q-item-label caption>{{ client.ADDRESS }}</q-item-label>
        </q-item-section>
      </q-item>
      <q-separator/>
      <q-item>
        <q-item-section avatar><q-icon name="wc" /></q-item-section>
        <q-item-section>
          <q-item-label>Gênero</q-item-label>
          <q-item-label caption>{{ client.GENDER }}</q-item-label>
        </q-item-section>
      </q-item>
    </q-list>
  </div>
</template>

<script>
export default {
  name: 'ClientCard',

  props: {
    client: {
      type: Object
    }
  }
}
</script>

<style>
.profile-header {
  display: flex;
  justify-content: space-between;
}

.profile-header-left {
  display: flex;
  gap: 16px;
}
</style>
