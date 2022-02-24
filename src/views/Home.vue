<template>
  <div>
    <TopBar/>
    <SideBar/>
    <keep-alive>
    <Dashboard/>
    </keep-alive>
  </div>
</template>

<script>
// @ is an alias to /src
import Dashboard from '@/components/users/Dashboard.vue'
import SideBar from '@/components/shared/SideBar.vue'
import TopBar from '@/components/shared/TopBar.vue'
export default {
  name: 'Home',
  components: {
    TopBar,
    SideBar,
    Dashboard,
  },
  data(){
    return {
      removeSearch: false,
    }
  },
  methods: {
    hideSearch(){
      this.removeSearch = false
    },
    handleClick(event){
      console.log("handle the click")

      let classes = event.target.classList.value

      if(
        classes.toLowerCase().indexOf("search-label") >= 0 
        || classes.toLowerCase().indexOf("fa fa-search") >= 0
        || classes.toLowerCase().indexOf("search-option-list") >= 0
        || classes.toLowerCase().indexOf("search-contents") >= 0
        || classes.toLowerCase().indexOf("search-button") >= 0
        ){
        document.querySelector(".search-contents").classList.remove("d-none")
        console.log("In Premises")
      }
      else {
        document.querySelector(".search-contents").classList.add("d-none")
      }
      
      console.log(classes)
    }
  }
}
</script>
