import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios';
import createPersistedState from "vuex-persistedstate";
import  users from './modules/users';
import  companies from './modules/companies';
import router from '../router'
Vue.use(Vuex)
// const ticketsrequest=axios.get('');
// const emailrequest=axios.post('/v1/allmails',{
//   assigned_email:'projectcode@soft-desk.nl'
// },{ params: { company_id: 1 } });


const state = {
  isLoading: false,
  user: null,
  tickets: [],
  agents: [],
  contacts: [],
  workingTickets: [],
  statuses: null,
  priorities: null,
  departments: null,
  types: null,
  sources: null,
  activeCardIndex: 0,
  nextCardController: 0,
  prodEndPoint: 'http://127.0.0.1:8000/api/',
  devEndPoint: 'https://soft-desk.nl/backend/public/api/',

}
// initial state
// initial state
// const state = getDefaultState()
const actions = {
  startLoader({commit}){
    commit('SET_LOADER', true)
  },
  stopLoader({commit}){
    commit('SET_LOADER', false)
  },
  showTicket(){
    let chosenTicket = this.state.workingTickets[this.state.activeCardIndex]
    
    router.push({ name: 'Ticket Details', params: { ticketId: chosenTicket.id, nextTicketId: this.state.workingTickets[this.activeCardIndex + 1 ] } })
  },
  setWorkingTickets({commit}, tickets){
    commit("SET_WORKING_TICKETS", tickets)
  },
  changeActiveCardIndex({commit},command){
    // if the user is pressing the Arrow down key on the keyboard
    // then move to the previous ticket in the list
    // but then stop at value less than the length of the working tickets by 1
    // in order to remain on the last ticket in the working tickets list
    if(command == "Next"){
      console.log("go to the next ticket in the working ticket list")
      if(this.state.nextCardController < this.state.workingTickets.length - 1){
        commit('ADD_NEXT_CARD_CONTROLLER')
        commit('SET_ACTIVE_CARD_INDEX', this.state.nextCardController)
      }
      else {
        // console.log(this.state.nextCardController == this.state.workingTickets.length)
      }
    }
    //if the user is pressing the Arrow up key on the keyboard
    //then move to the previous ticket in the list
    else if(command == "Prev"){
      if(this.state.nextCardController > 0){
        commit('DECREASE_NEXT_CARD_CONTROLLER')
        commit('SET_ACTIVE_CARD_INDEX', this.state.nextCardController)
      }
    }
    //check if the DOM element exists and proceed
    if(document.querySelector('.active-card') != null){
      document.querySelector('.active-card').scrollIntoView({ behavior: 'smooth', block: 'center' });
    }
  },
  resetActiveCardIndex({commit}){
    commit("RESET_NEXT_CARD_CONTROLLER")
  },
  createTicket({ commit },payload){
    commit('ADD_TICKET', payload);
  },
  setTickets({commit}, tickets){
    commit('ADD_ALL_TICKETS', tickets)
    router.go()
  },
  async fetchAllTickets({commit}, companyId) {
    await axios.get(`tickets/${companyId}`)
    .then(response => {
      commit('ADD_ALL_TICKETS', response.data)
    });

    // await axios.get([ticketsrequest]).then(axios.spread((...responses) => {
    //   const response = responses[0]
    //   commit('ADD_ALL_TICKETS', response.data);
    // })
    //)

  },
  async fetchSortedTickets({commit}, companyId) {
    await axios.get(`sortedtickets/${companyId}`)
    .then(response => {
      commit('SORTED_TICKETS', response.data[8][1])
      console.log(response.data)
      return "Success"
    });
  },
  deleteAllTickets({commit}){
    commit('CLEAR_ALL_TICKETS')
  },
  async getTypes({commit}){
    axios
      .get('types')
      .then(response => {
        commit('FETCH_TYPES', response.data);
      });
  },
  async getPriorities({commit}) {
    axios
      .get('priorities')
      .then(response => {
        commit('SET_PRIORITIES', response.data);
      });
  },
  async getStatuses({commit}) {
    axios.get('statuses')
    .then(response => {
        commit('SET_STATUSES', response.data)
    });
  },
  async getDepartments({commit}, companyId) {
    axios
      .get(`departments/${companyId}`)
      .then(response => {
        commit('SET_DEPARTMENTS',response.data);
      });
  },
  async getAgents({commit},companyId) {
    await axios
      .get(`users/${companyId}`)
      .then((response) => {
        console.log("Agents")
        console.log(response.data)
        commit("SET_AGENTS", response.data)
      })
  },
  async getContacts({commit}, companyId){
    await axios.get(`allcontacts/${companyId}`)
    .then(response => {
      commit("SET_CONTACTS", response.data)
    })
    .catch(err => {
      console.log(err)
    })
  },
  async getSources({commit}) {
    axios
      .get('sources')
      .then(response => {
        commit('SET_SOURCES',response.data);
      });
  },
  logOutUser({ commit }){
    commit("LOGOUT")
      
  }
},
  mutations = {
    LOGOUT(state){

    },
    SET_LOADER(state, loading){
      state.isLoading = loading
    },
    SET_WORKING_TICKETS(state, tickets){
      state.workingTickets = tickets
    },
    ADD_NEXT_CARD_CONTROLLER(state){
      state.nextCardController = state.nextCardController + 1
    },
    DECREASE_NEXT_CARD_CONTROLLER(state){
      state.nextCardController = state.nextCardController - 1
    },
    RETAIN_ACTIVE_CARD_INDEX(state, controller){
      state.activeCardIndex = controller
    },
    RESET_NEXT_CARD_CONTROLLER(state){
      state.nextCardController = 0
      state.activeCardIndex = 0
    },
    SET_ACTIVE_CARD_INDEX(state, index){
      state.activeCardIndex = index
    },
    SET_USER(state, user) {
      state.user = user
    },
    ADD_ALL_TICKETS(state, tickets) {
        state.tickets=tickets;
    },
    CLEAR_ALL_TICKETS(state){
      state.tickets=[];
      this.$router.go();
    },
    ADD_TICKET(state, payload){
      state.tickets.unshift(payload);
    },
    FETCH_TYPES(state, types){
      state.types=types;
    },
    SET_CONTACTS(state, contacts){
      state.contacts = contacts;
    },
    SET_STATUSES(state, statuses){
      state.statuses = statuses;
    },
    SET_PRIORITIES(state, priorities){
      state.priorities = priorities;
    },
    SET_AGENTS(state, agents){
      state.agents = agents
    },
    SET_DEPARTMENTS(state, departments){
      state.departments = departments;
    },
    SET_TYPES(state, types){
      state.types = types;
    },
    SET_SOURCES(state, sources){
      state.sources = sources;
    },
    SORTED_TICKETS(state, sortedtickets) {
      state.sortedtickets=sortedtickets;
  },

  },
  getters = {
    pendingTickets(state) {
      const pendingfiltered = state.tickets.filter((ticket) => ticket.status_id === 2);
      return pendingfiltered;
    },
    openTickets(state) {
      const filtered = state.tickets.filter((ticket) => ticket.status_id === 1);
      return filtered;
    },
    closedTickets(state) {
      const filtered = state.tickets.filter((ticket) => ticket.status_id === 3);
      return filtered;
    },
    urgentTickets(state) {
      const filtered = state.tickets.filter((ticket) => ticket.priority_id == 4 );
      return filtered;
    },
    pendingSorted(state) {
      const pendingfiltered = state.sortedtickets.filter((ticket) => ticket.status_id === 2);
      return pendingfiltered;
    },
    openSorted(state) {
      const filtered = state.sortedtickets.filter((ticket) => ticket.status_id === 1);
      return filtered;
    },
    closedSorted(state) {
      const filtered = state.sortedtickets.filter((ticket) => ticket.status_id === 3);
      return filtered;
    }
  }
export default new Vuex.Store({
  plugins: [createPersistedState()],
  state,
  actions,
  mutations,
  getters,
  modules: {
    users:users,
    companies:companies,
  }

})

