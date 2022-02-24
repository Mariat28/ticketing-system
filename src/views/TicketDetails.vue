<template>
  <div>
    <TopBar/>
    <SideBar/>
    
    <Details/>
  </div>
</template>

<script>
// @ is an alias to /src
import Details from '@/components/users/TicketDetails.vue';
import SideBar from '@/components/shared/SideBar.vue';
import TopBar from '@/components/shared/TopBar.vue';

export default {
  name: 'TicketDetails',
  components: {
    TopBar,
    SideBar,
    Details
  }
}
</script>
