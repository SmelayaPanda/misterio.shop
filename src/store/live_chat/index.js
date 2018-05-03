import * as firebase from 'firebase'
import {Message} from 'element-ui'

export default {
  state: {
    chat: {
      props: {
        id: '',
        lastOnline: 0, // timestamp (0 - online)
        onlineFrom: 0, // timestamp (0 - offline)
        isTypingUser: 0,
        isTypingAdmin: 0,
        isCollapsedUser: 1,
        isCollapsedAdmin: 1,
        unreadByUser: 0,
        unreadByAdmin: 0,
        userEmail: null
      },
      messages: {
        cursor: '',
        isAllLoaded: true,
        data: []
      },
      events: { // user action on site
        cursor: '',
        isAllLoaded: true,
        data: []
      }
    },
    isOnlineAdmin: 0,
    liveChats: {} // for admin
    // chatId -> msgId: { msg: "", date: "", creator: 1/0 }
    //
    // 1. chatId equals to userId
    // 2. creator: 1 - user, 0 - admin
    // 3. date in timestamp format ( new Date().getTime() )
  },
  mutations: {
    setLiveChats:
      (state, payload) => { // TODO: fetched all database! how fix it?
        state.liveChats = payload
      },
    setAdminOnline:
      (state, payload) => {
        state.isOnlineAdmin = payload
      },
    setChatMessages:
      (state, payload) => {
        state.chat.messages.data = payload
      },
    setUserEvents:
      (state, payload) => {
        state.chat.events.data = payload
      },
    setCursor:
      (state, payload) => {
        state.chat[payload.name].cursor = payload.value
      },
    setIsAllLoaded:
      (state, payload) => { // payload.name = 'messages' | 'events'
        state.chat[payload.name].isAllLoaded = payload.value
      },
    setChatProp:
      (state, payload) => {
        state.chat.props[payload.name] = payload.value
      },
    setAllChatPros:
      (state, payload) => {
        state.chat.props = payload
      }
  },
  actions: {
    observeUserConnection:
      ({commit}, payload) => {
        let chatRef = firebase.database().ref(`liveChats/${payload}/props`)
        firebase.database().ref('.info/connected').on('value', snap => {
          if (snap.val() === true) {
            // online
            chatRef.update({
              lastOnline: 0,
              onlineFrom: firebase.database.ServerValue.TIMESTAMP
            })
            // offline
            chatRef.onDisconnect().update({
              lastOnline: firebase.database.ServerValue.TIMESTAMP,
              onlineFrom: 0
            })
          }
        })
      },
    observeAdminConnection:
      () => {
        // TODO: every new admin sign in detected as new device
        // since admin connect from multiple devices or browser tabs,
        // we store each connection instance separately
        // any time that connectionsRef's value is null (i.e. has no children) - admin offline
        firebase.database().ref('.info/connected').on('value', snap => {
          if (snap.val() === true) {
            // Admin connected (or reconnected)
            let con = firebase.database().ref('admin').child('connections').push()
            // When admin disconnect, remove this device
            con.onDisconnect().remove()
            // Add this device to connections list,
            // this value could contain info about the device or a timestamp too
            con.set(true)
          }
        })
      },
    fetchAllChats: // for admin
      ({commit, dispatch}) => {
        firebase.database().ref('liveChats').once('value')
          .then(snapshot => {
            commit('setLiveChats', snapshot.val())
            console.log('Fetched: live chat messages')
          })
          .then(() => {
            dispatch('subscribeToAllChats')
            dispatch('observeAdminConnection')
          })
          .catch(err => dispatch('LOG', err))
      },
    notifyAdminAboutNewMessage:
      ({commit, getters}, payload) => {
        let chat = getters.liveChats[payload.key]
        if (chat) {
          if (chat.props.unreadByAdmin !== payload.val().props.unreadByAdmin &&
            chat.props.isCollapsedAdmin) {
            let userName
            if (chat.props.userEmail) {
              userName = chat.props.userEmail
            } else {
              userName = `Anonymous ( ${payload.key.substring(0, 5)} )`
            }
            Message({
              type: 'success',
              showClose: true,
              message: `New message from ${userName}`,
              duration: 10000
            })
            let audio = new Audio(require('@/assets/sounds/iphone_notification.mp3'))
            audio.setAttribute('crossorigin', 'anonymous')
            audio.play()
          }
        }
      },
    subscribeToAllChats: // for admin
      ({commit, getters, dispatch}) => {
        commit('setAdminOnline', 1)
        firebase.database().ref('liveChats').on('child_changed',
          data => {
            let liveChats = {...getters.liveChats}
            liveChats[data.key] = data.val()
            dispatch('notifyAdminAboutNewMessage', data)
            commit('setLiveChats', liveChats)
          })
      },
    async subscribeToChat ({commit, getters, dispatch}, payload) {
      let chatRef = firebase.database().ref(`liveChats/${payload}`)
      await Promise.all([
        chatRef.child('messages').limitToLast(1).on('child_added', data => {
          if (data.exists()) {
            let chatMessages = getters.chatMessages ? getters.chatMessages : []
            chatMessages.push(data.val())
            commit('setChatMessages', chatMessages)
          }
        }),
        chatRef.child('events').limitToLast(1).on('child_added', data => {
          if (data.exists()) {
            let userEvents = getters.userEvents ? getters.userEvents : []
            userEvents.push(data.val())
            commit('setUserEvents', userEvents)
          }
        }),
        chatRef.child('props').on('child_changed', data => {
          commit('setChatProp', {name: data.key, value: data.val()})
        }),
        dispatch('subscribeToAdminConnectionDevices')
      ])
    },
    subscribeToAdminConnectionDevices: // for users to detect online admin
      ({commit}) => {
        let adminConn = firebase.database().ref('admin').child('connections')
        adminConn.on('child_added', () => {
          commit('setAdminOnline', 1)
        })
        adminConn.on('child_removed', () => {
          adminConn.once('value').then(snap => {
            if (!snap.exists()) {
              commit('setAdminOnline', 0)
            }
          })
        })
      },
    async unsubscribeFromChat ({commit, getters}, payload) {
      let chatRef = firebase.database().ref(`liveChats/${payload}`)
      await Promise.all([ // await make promise if it is not a promise
        chatRef.child('messages').off(),
        chatRef.child('events').off(),
        chatRef.child('props').off()
      ])
    },
    async initializeChat ({commit, getters, dispatch}, payload) {
      if (!payload.uid) return
      let chatProps = firebase.database().ref(`liveChats/${payload.uid}`).child('props')
      chatProps
        .once('value')
        .then(snap => {
          if (!snap.exists()) {
            console.log('Chat: new initialization')
            return chatProps.set({
              id: payload.uid,
              lastOnline: 0,
              onlineFrom: 0,
              isTypingUser: 0,
              isTypingAdmin: 0,
              isCollapsedUser: 1,
              isCollapsedAdmin: 1,
              unreadByUser: 0,
              unreadByAdmin: 0,
              userEmail: payload.email
            })
          } else {
            console.log('Chat: old initialized')
            commit('setAllChatPros', snap.val())
            return dispatch('openChat', payload.uid)
          }
        })
        .then(() => {
          dispatch('observeUserConnection', payload.uid)
        })
        .catch(err => dispatch('LOG', err))
    },
    async openChat ({commit, dispatch, getters}, payload) {
      let limit = 15
      await Promise.all([
        firebase.database().ref(`liveChats/${payload}/events`).orderByKey().limitToLast(limit).once('value')
          .then((snap) => {
            if (snap.exists()) {
              let events = Object.values(snap.val())
              let cursor = Object.keys(snap.val())[0]
              events.splice(snap.numChildren() - 1, 1) // because subscribe give the last element
              commit('setCursor', {name: 'events', value: cursor})
              commit('setUserEvents', events)
            }
            commit('setIsAllLoaded', {name: 'events', value: snap.numChildren() < limit})
          }),
        firebase.database().ref(`liveChats/${payload}/messages`).orderByKey().limitToLast(limit).once('value')
          .then((snap) => {
            if (snap.exists()) {
              let messages = Object.values(snap.val())
              let cursor = Object.keys(snap.val())[0]
              messages.splice(snap.numChildren() - 1, 1)
              commit('setCursor', {name: 'messages', value: cursor})
              commit('setChatMessages', messages)
            }
            commit('setIsAllLoaded', {name: 'messages', value: snap.numChildren() < limit})
          }),
        firebase.database().ref(`liveChats/${payload}/props`).once('value')
          .then((snap) => {
            commit('setAllChatPros', snap.val())
          })
      ])
        .then(() => {
          commit('setChatProp', {name: 'id', value: payload}) // TODO: remove
          dispatch('subscribeToChat', payload)
        })
        .catch(err => dispatch('LOG', err))
    },
    async loadPreviousUserEvents ({commit, getters}) {
      let limit = 50
      let chatId = getters.chatPropByName('id')
      let cursor = getters.cursor('events')
      await firebase.database().ref(`liveChats/${chatId}/events`).orderByKey().endAt(cursor).limitToLast(limit).once('value')
        .then((snap) => {
          if (snap.exists()) {
            let events = Object.values(getters.userEvents)
            events.shift()
            commit('setCursor', {name: 'events', value: Object.keys(snap.val())[0]})
            commit('setUserEvents', Object.values(snap.val()).concat(events))
          }
          commit('setIsAllLoaded', {name: 'events', value: snap.numChildren() < limit})
        })
    },
    async loadPreviousChatMessages ({commit, getters}) {
      let limit = 30
      let chatId = getters.chatPropByName('id')
      let cursor = getters.cursor('messages')
      await firebase.database().ref(`liveChats/${chatId}/messages`).orderByKey().endAt(cursor).limitToLast(limit).once('value')
        .then((snap) => {
          if (snap.exists()) {
            let messages = Object.values(getters.chatMessages)
            messages.shift()
            commit('setCursor', {name: 'messages', value: Object.keys(snap.val())[0]})
            commit('setChatMessages', Object.values(snap.val()).concat(messages))
          }
          commit('setIsAllLoaded', {name: 'messages', value: snap.numChildren() < limit})
        })
    },
    sendChatMessage:
      ({commit, getters, dispatch}, payload) => {
        if (!payload.chatId) return
        let newMsg = {
          msg: payload.msg,
          creator: payload.creator,
          date: new Date().getTime()
        }
        firebase.database().ref(`liveChats/${payload.chatId}/messages`).push(newMsg)
          .then((data) => {
            // for send email to offline admin through cloud function
            // TODO: to http trigger
            if (!getters.isOnlineAdmin) {
              firebase.database().ref('unreadLiveChat').push({
                from: getters.user.email ? getters.user.email : `Anonymous ( ${data.key.substring(0, 5)} )`,
                msg: payload.msg
              })
            }
          })
          .catch(err => dispatch('LOG', err))
      },
    USER_EVENT:
      ({commit, getters, dispatch}, payload) => {
        if (!getters.user.uid) return
        let newEvent = {
          name: payload,
          date: new Date().getTime()
        }
        firebase.database().ref(`liveChats/${getters.user.uid}/events`).push(newEvent)
          .then((data) => {
            let userEvents = getters.userEvents ? getters.userEvents : []
            userEvents[data.key] = newEvent
            commit('setUserEvents', userEvents)
          })
          .catch(err => dispatch('LOG', err))
      },
    async setChatProp ({commit, getters, dispatch}, payload) {
      if (!payload.chatId) return
      await firebase.database().ref(`liveChats/${payload.chatId}/props`).update({[payload.props]: payload.value})
        .then(() => {
          commit('setChatProp', {name: payload.props, value: payload.value})
        })
        .catch(err => dispatch('LOG', err))
    },
    async setIsAllLoaded ({commit}, payload) {
      commit('setIsAllLoaded', {name: payload.name, value: payload.value})
    },
    async setChatMessages ({commit}, payload) {
      commit('setChatMessages', payload)
    },
    async setUserEvents ({commit}, payload) {
      commit('setUserEvents', payload)
    }
  },
  getters: {
    chatMessages:
      state => {
        return state.chat.messages.data
      },
    userEvents:
      state => {
        return state.chat.events.data
      },
    cursor:
      state => (name) => {
        return state.chat[name].cursor
      },
    isAllLoaded:
      state => (name) => {
        return state.chat[name].isAllLoaded
      },
    chatPropByName:
      state => (name) => {
        return state.chat.props[name]
      },
    liveChats:
      state => {
        return state.liveChats
      },
    isOnlineAdmin:
      state => {
        return state.isOnlineAdmin
      }
  }
}
