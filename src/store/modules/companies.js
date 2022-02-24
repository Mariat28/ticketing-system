// import TicketService from '@/services/ticket-service';
import axios from 'axios';
import router from '../../router';
export default {
  state: {
    companies: [],
    // user: JSON.parse(sessionStorage.getItem(`user`))||{}
    user:''

  },
  actions:{
    async fetchCompanies({commit}){
      let data = {role_id:1, company_id:1, name:JSON.parse(sessionStorage.getItem('user'))["name"]}
      await axios.post('v1/manager/companies/all',data).then((response)=>{
        console.log(response.data.data)
        commit('ADD_COMPANIES', response.data.data);
      })
    },
    addCompany({ commit }, payload) {
      commit('ADD_COMPANY', payload);
    },
    editCompany({ commit }, payload){
      commit ('EDIT_COMPANY', payload);
    },
    deleteCompany({ commit }, id) {
      commit('REMOVE_COMPANY', id);
    },
    deleteAllCompanies({commit}){
      commit('CLEAR_ALL_COMPANIES')
    },
  },
  mutations:{
    ADD_COMPANIES(state, companies) {
      state.companies = companies;
    },
    ADD_COMPANY(state, payload) {
      state.companies.unshift(payload);
    },
    EDIT_COMPANY(state, payload){
      const indexOfArrayItem = state.companies.findIndex((i) => i.id === payload.id);
      state.companies.splice(indexOfArrayItem, 1, payload);
      router.go();
    },
    REMOVE_COMPANY(state, payload) {
      const company_index = state.companies.map(item => item.id).indexOf(payload);
      state.companies.splice(company_index, 1)

    },
       
    CLEAR_ALL_COMPANIES(state){
      state.coompanies===[];
      router.go();
    },
  },
  getters:{
    freePlan(state){
      const companies=state.companies.filter((company)=>company.subscription.id===2)
      return companies

    },
    growthPlan(state){
      const companies=state.companies.filter((company)=>company.subscription.id===3)
      return companies

    },
    proPlan(state){
      const companies=state.companies.filter((company)=>company.subscription.id===4)
      return companies

    },
    enterprisePlan(state){
      const companies=state.companies.filter((company)=>company.subscription.id===5)
      return companies

    }
  }



}