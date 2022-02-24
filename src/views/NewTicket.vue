<template>
  <div @keypress="this.$store.dispatch('changeIndex')">
    <TopBar/>
    <SideBar/>
    <CreateTicket/>
  </div>
</template>

<script>
// @ is an alias to /src
import CreateTicket from '@/components/users/AddNewTicket.vue';
import SideBar from '@/components/shared/SideBar.vue';
import TopBar from '@/components/shared/TopBar.vue';

export default {
  name: 'NewTicket',
  components: {
    TopBar,
    SideBar,
    CreateTicket
  },
  
}
</script>
