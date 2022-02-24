<template>
  <div>
    <TopBar/>
    <SideBar/>
    <CreateContact/>
  </div>
</template>

<script>
// @ is an alias to /src
import CreateContact from '@/components/users/AddNewContact.vue'
import SideBar from '@/components/shared/SideBar.vue'
import TopBar from '@/components/shared/TopBar.vue'
export default {
  name: 'NewContact',
  components: {
    SideBar,
    TopBar,
    CreateContact,
  }
}
</script>
