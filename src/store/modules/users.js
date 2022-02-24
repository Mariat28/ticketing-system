// import TicketService from '@/services/ticket-service';
import axios from 'axios';
export default {
  state: {
    users: [],
    // user: JSON.parse(sessionStorage.getItem(`user`))||{}
    user:''

  },
  actions: {
    getUser({ commit }, user){
      commit('GET_USER', user)
    },
    createUser({ commit }, payload) {
      commit('ADD_USER', payload);
    },
    deleteUser({ commit }, id) {
      commit('REMOVE_USER', id);
    },
    editUser({ commit }, user) {
      commit('UPDATE_USER', user)
    },
    async fetchAllUsers({ commit},company_id ) {
      await axios.get(`users/${company_id}`).then((response) => {
        commit('ADD_ALL_USERS', response.data);
      })
    }
  },
  mutations: {
    GET_USER(state, user){
      state.user=user;
    },
    LOGOUT(state){
      sessionStorage.removeItem('access_token');
      sessionStorage.removeItem('user');
      state.user=null;
    },
    ADD_ALL_USERS(state, users) {
      state.users = users;
    },
    ADD_USER(state, payload) {
      state.users.push(payload);
    },
    REMOVE_USER(state, payload) {
      const user_index = state.users.map(item => item.id).indexOf(payload);
      state.users.splice(user_index, 1)

    },
    UPDATE_USER(state, payload) {
      const index = state.users.map(item => item.id).indexOf(payload);
      console.log(index);
      if (index == -1) {
      state.users.slice(index,1)
      state.users
      } else {
        state.users.push(payload);
      }
    }
  },
  getters: {
    user: (state) => {
      return state.user
    }
  }

}