<template>
  <div>
    <TopBar/>
    <SideBar/>
    <Details/>
  </div>
</template>

<script>
// @ is an alias to /src
import Details from '@/components/SuperAdmin/CompanyDetails.vue'
import SideBar from '@/components/shared/SideBar.vue'
import TopBar from '@/components/shared/TopBar.vue'
export default {
  name: 'CompanyDetailsView',
  components: {
    TopBar,
    SideBar,
    Details
  }
}
</script>
