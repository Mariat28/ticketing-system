<template>
  <div>
    <TopBar/>
    <SideBar/>
    <TicketList v-bind:tickets="tickets"/>
  </div>
</template>
<script>

import TicketList from '@/components/users/TicketList.vue'
import SideBar from '@/components/shared/SideBar.vue'
import TopBar from '@/components/shared/TopBar.vue'
import store from '../store'

export default {
  name:'AllTickets',
  components: {
    TopBar,
    SideBar,
    TicketList
  },
  created(){
    let user = JSON.parse(localStorage.getItem('user'))
    //set the store working tickets to the current tickets category
    store.dispatch("setWorkingTickets", store.state.tickets.filter((ticket) => ticket.agent_assigned_id == user.id))
    //reset the active card controller and active card index to 0
    store.dispatch("resetActiveCardIndex")
  },
  computed: {
    tickets: ()=> store.state.tickets.filter((ticket) => ticket.agent_assigned_id == JSON.parse(localStorage.getItem('user')).id)
  },
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.content {
    margin-left: 100px;
}
</style>