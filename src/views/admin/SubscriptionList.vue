<template>
    <div>
        <top-bar/>
        <side-bar/>
        <subscriptions/>
    </div>
</template>
<script>
import Subscriptions from "@/components/SuperAdmin/Subscriptions.vue";
import SideBar from '@/components/shared/SideBar.vue';
import TopBar from '@/components/shared/TopBar.vue';
export default {
    name:"SubscriptionList",
    components:{
        TopBar,
        SideBar,
        Subscriptions
    }
}
</script>

