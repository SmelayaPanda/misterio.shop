import {store} from '../store'

export const authMixin = {
  computed: {
    // always user is anonymous or real authenticated
    // isAuthenticatedUser
    //   function () {
    //     return Boolean(store.getters.user)
    //   },
    isAdmin: function () {
      return store.getters.isAdmin
    },
    isAnonymousUser: function () {
      if (store.getters.user) {
        return store.getters.user.isAnonymous
      }
    }
  }
}
