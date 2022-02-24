<template>
<keep-alive>
  <div>
    <div class="content">
    <Admindashboard v-if="user.role_id=='1'"/>
    <Content v-else/>
    </div>
  </div>
</keep-alive>
</template>

<script>
import Content from '@/components/users/DashboardContent.vue'
import Admindashboard from '@/components/SuperAdmin/Dashboard.vue'




export default {
  name: 'Dashboard',
  components:{
// SideBar,
  Admindashboard,
  Content,
  },

  data(){
    return {
      user:''
    }
  },
  created(){
    this.user = JSON.parse(sessionStorage.getItem('user'));
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.content{
  margin-left: 70px;
}
</style>
