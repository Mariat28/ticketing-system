<template>
  <div>
    <TopBar/>
    <SideBar/>
    <create-user/>
  </div>
</template>

<script>
import CreateUser from '@/components/users/AddNewUser.vue';
import SideBar from '@/components/shared/SideBar.vue';
import TopBar from '@/components/shared/TopBar.vue';

export default {
  name: 'NewUser',
  components: {
    TopBar,
    SideBar,
    CreateUser,
  }
}
</script>
