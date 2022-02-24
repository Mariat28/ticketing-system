<template>
  <div>
    <TopBar/>
    <SideBar/>
    <Dashboard/>
  </div>
</template>

<script>
// @ is an alias to /src
import Dashboard from '@/components/SuperAdmin/Dashboard.vue'
import SideBar from '@/components/shared/SideBar.vue'
import TopBar from '@/components/shared/TopBar.vue'
export default {
  name: 'AdminDashboard',
  components: {
    TopBar,
    SideBar,
    Dashboard
  }
}
</script>
