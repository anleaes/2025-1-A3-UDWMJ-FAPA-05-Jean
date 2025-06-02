import { defineStore, acceptHMRUpdate } from 'pinia'

const store = defineStore('userStore', {
  state: () => ({
    user: null
  }),

  actions: {
    setUser(user) {
      this.user = user;
      localStorage.setItem("user", JSON.stringify(user));
    },
    removeUser() {
      this.user = null
      localStorage.removeItem("user");
    }
  }
})

if (import.meta.hot) {
  import.meta.hot.accept(acceptHMRUpdate(store, import.meta.hot))
}

const userStore = store();
let tempUser = localStorage.getItem('user')
if (tempUser) {
  userStore.user = JSON.parse(tempUser);
}
export {userStore};
