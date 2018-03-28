import {store} from '../store'

export const isLoading = {
  computed: {
    isLoading:
      function () {
        return store.getters.loading
      }
  }
}
