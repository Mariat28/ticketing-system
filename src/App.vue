<template>
  <div id="app" @click="handleClick">
    <Loader v-if="this.$store.state.isLoading"/>
    <router-view/>
  </div>
</template>
<script>
// import axios from 'axios'
import store from './store'
import route from './router'
import Loader from '@/components/Loader.vue'
export default {
  props: {
    msg: String
  },
  components: {
    Loader,
  },
  data(){
    return {
      controller: 0
    }
  },
  created() {
    let ifConnected = window.navigator.onLine;
    if (ifConnected) {
      window.Echo.channel('chat')
        .listen('.message', (event) => {
          let createdTicket = event.ticket[0]
          
          let user = JSON.parse(localStorage.getItem('user'))

          if(createdTicket.company_id == user.company_id){

            store.dispatch("fetchAllTickets", user.company_id)
            .then(()=>{
              if(createdTicket.created_by.id != user.id){
              this.$toasted.show(
                `New ticket has been added to the system by ${createdTicket.created_by.name}`, 
                {
                  position: "top-center",
                  type:'info', class: ["updates-notification"],
                  duration: 10000,
                }
              );
            }
            })
          }
        })
        
      store.dispatch('getPriorities')
      store.dispatch('getStatuses')
      store.dispatch('getSources')
      store.dispatch('getTypes')

      //listen to key down and up key presses through out the application
      window.addEventListener("keydown",function(event){
      if(["ArrowUp","ArrowDown","ArrowLeft","ArrowRight", "Enter"].indexOf(event.code) > -1) {
        event.preventDefault();
        if(event.code == "ArrowDown"){
          store.dispatch('changeActiveCardIndex', "Next")
        }
        if(event.code == "ArrowUp"){
          store.dispatch('changeActiveCardIndex', "Prev")
        }
        if(event.code == "Enter"){
          if(route.currentRoute.path == "/NewTickets" || route.currentRoute.path == "/AllTickets" || route.currentRoute.path == "/OpenTickets" || route.currentRoute.path == "/PendingTickets" || route.currentRoute.path == "/ClosedTickets" || route.currentRoute.path == "/Ticketsassingedtome")
            store.dispatch('showTicket')
        }
      }
    })

    } else {
      this.$toasted.show(
        "Looks like you're offline , Please connect to the internet to continue!",
        {
          position: "top-center",
          theme: "toasted-primary",
          className: ["bg-dark"],
          icon: {
            name: "fa fa-exclamation-triangle",
            after: false
          }
        }
      );
    }
  },
  methods: {
    handleClick(event){

      let classes = event.target.classList.value

      if(
        classes.toLowerCase().indexOf("search-label") >= 0 
        || classes.toLowerCase().indexOf("fa fa-search") >= 0
        || classes.toLowerCase().indexOf("search-option-list") >= 0
        || classes.toLowerCase().indexOf("search-contents") >= 0
        || classes.toLowerCase().indexOf("search-button") >= 0
        || classes.toLowerCase().indexOf("search-option") >= 0
        || classes.toLowerCase().indexOf("search-input") >= 0
        ){
        document.querySelector(".search-contents").classList.remove("d-none")
        console.log("In Premises")
      }
      else {
        document.querySelector(".search-contents").classList.add("d-none")
      }
      
    }
  }
};
</script>
<style scoped>
#app{
font-family: sans-serif;
font-size: 14.4px;
}

</style>

