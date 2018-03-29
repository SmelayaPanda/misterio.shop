import {store} from '../store'

export const appError = {
  computed: {
    appError:
      function () {
        return store.getters.error
      }
  }
}
