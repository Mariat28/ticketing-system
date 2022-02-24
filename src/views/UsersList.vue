<template>
  <div>
    <TopBar/>
    <SideBar/>
    <UserList/>
  </div>
</template>

<script>
import UserList from '@/components/users/UserList.vue';
import SideBar from '@/components/shared/SideBar.vue';
import TopBar from '@/components/shared/TopBar.vue';

export default {
  name: 'UsersList',
  components: {
    TopBar,
    SideBar,
    UserList
  }
}
</script>
