<template>
  <q-layout view="lHh Lpr lFf">
    <q-header elevated>
      <q-toolbar>
        <q-btn
          flat
          dense
          round
          icon="menu"
          aria-label="Menu"
          @click="toggleLeftDrawer"
        />

        <q-toolbar-title>
          Quasar App
        </q-toolbar-title>

        <div>Quasar v{{ $q.version }}</div>
      </q-toolbar>
    </q-header>

    <q-drawer
      v-model="leftDrawerOpen"
      show-if-above
      bordered
    >
      <q-list>
        <q-item-label
          header
        >
          Essential Links
        </q-item-label>

        <EssentialLinkExt
          v-bind="{
          title: 'Github do Projeto',
          caption: 'LuisGustavoFA/unr-udw-a3-quinta',
          icon: 'commit',
          link: 'https://github.com/LuisGustavoFA/unr-udw-a3-quinta'
        }"
        />

        <EssentialLink
          v-for="link in linksList"
          :key="link.title"
          v-bind="link"
        />

      </q-list>
    </q-drawer>

    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script>
import { defineComponent, watch } from 'vue'
import EssentialLink from 'components/EssentialLink.vue'
import { userStore } from 'src/stores/userStore.js'
import EssentialLinkExt from 'src/components/EssentialLinkExt.vue'

export default defineComponent({
  name: 'MainLayout',

  components: {
    EssentialLink,
    EssentialLinkExt
},

  data () {
    return {
      linksList: [

        {
          title: 'Início',
          caption: 'Página inicial',
          icon: 'home',
          link: '/'
        },
      ],
      leftDrawerOpen: false,
    }
  },

  mounted() {
    this.checkLogin()
    watch(
      () => userStore.user,
      () => this.checkLogin(),
      { immediate: false }
    )
  },

  methods: {
    toggleLeftDrawer () {
      this.leftDrawerOpen = !this.leftDrawerOpen
    },

    checkLogin() {
      this.linksList = this.linksList.filter(link =>
        !['Login', 'Minha Página'].includes(link.title)
      )
      if (userStore.user) {
        this.linksList.push({
          title: 'Minha Página',
          caption: 'Ver suas informações',
          icon: 'person',
          link: '/user'
        },
        )
      } else {
        this.linksList.push({
          title: 'Login',
          caption: 'Fazer login',
          icon: 'login',
          link: '/login'
        },
        )
      }
    }
  }
})
</script>
