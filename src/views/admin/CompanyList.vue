<template>
  <div>
    <TopBar/>
    <SideBar/>
    <Companies/>
  </div>
</template>

<script>
import Companies from '@/components/SuperAdmin/CompanyList.vue';
import SideBar from '@/components/shared/SideBar.vue';
import TopBar from '@/components/shared/TopBar.vue';

export default {
  name: 'CompanyList',
  components: {
    TopBar,
    SideBar,
    Companies
  }
}
</script>
