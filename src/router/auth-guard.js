import {store} from '../store'
// Guardian of private user data
export default (to, from, next) => {
  if (store.getters.user) {
    next()
  } else {
    next('/signin')
  }
}
