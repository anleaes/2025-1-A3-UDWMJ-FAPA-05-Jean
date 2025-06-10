<template>
  <div class="q-pa-lg">
    <div class="row items-center q-gutter-md q-mb-md">
      <q-avatar size="56px" color="primary" text-color="white">
        <q-icon name="person" />
      </q-avatar>
      <div>
        <div class="text-h5">{{ author.NAME }}</div>
        <div class="text-subtitle2 text-grey">Autor N° {{ author.ID }}</div>
      </div>
    </div>
    <q-list bordered class="rounded-borders bg-white">
      <q-item>
        <q-item-section avatar><q-icon name="email" /></q-item-section>
        <q-item-section>
          <q-item-label>Idade</q-item-label>
          <q-item-label caption>{{ author.AGE }}</q-item-label>
        </q-item-section>
      </q-item>
    </q-list>
  </div>
</template>

<script>
export default {
  name: 'ClientCard',

  props: {
    author: {
      type: Object
    },
    books: {
      type: Array
    }
  }
}
</script>
