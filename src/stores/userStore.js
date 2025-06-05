import { defineStore, acceptHMRUpdate } from 'pinia'

const store = defineStore('userStore', {
  state: () => ({
    user: null,
    jwt: null
  }),

  actions: {
    setUser(user, jwt) {
      this.user = user;
      this.jwt = jwt;
      localStorage.setItem("user", JSON.stringify(user));
      localStorage.setItem("jwt", jwt);
    },
    removeUser() {
      this.user = null
      this.jwt = null
      localStorage.removeItem("user");
      localStorage.removeItem("jwt");
    }
  }
})

if (import.meta.hot) {
  import.meta.hot.accept(acceptHMRUpdate(store, import.meta.hot))
}

const userStore = store();
let tempUser = localStorage.getItem('user')
let tempJwt = localStorage.getItem('jwt')
if (tempUser) {
  userStore.user = JSON.parse(tempUser);
}
if (tempJwt) {
  userStore.jwt = tempJwt;
}
export {userStore};
