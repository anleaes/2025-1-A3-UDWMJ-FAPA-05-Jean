<template>
  <div class="q-pa-md row items-start q-gutter-md">
    <q-card class="my-card" flat bordered>
      <q-skeleton height="220px" square />

      <q-card-section>
        <div class="row justify-between items-center">
          <q-skeleton type="text" class="text-h6" width="65%" />
          <q-skeleton type="text" class="text-h6" width="30%" />
        </div>
      </q-card-section>

      <q-card-section class="q-pt-none">
        <q-skeleton type="text" width="70%" />
        <q-skeleton type="text" width="40%" />
      </q-card-section>

      <q-separator />

      <q-card-actions>
        <q-skeleton type="text" width="120px" height="36px" />
      </q-card-actions>
    </q-card>
  </div>
</template>

<script>
export default {
  name: 'BookCardSkeleton'
}
</script>

<style>
.my-card {
  width: 20vw;
  min-width: 200px;
}
</style>
