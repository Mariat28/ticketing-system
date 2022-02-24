<template>
    <div class="card-body">
    <div class="media mb-4">
        <!-- <img class="d-flex me-3 rounded-circle avatar-sm" src="/assets/images/users/avatar-2.jpg"
            alt="Generic placeholder image"> -->
        <table>
            <tr>
                <td>
                    <div class="avatar light bg-warning" style="width: 30px; height: 30px; display: flex; justify-content: center;align-items: center; border-radius: 4px">
                        {{ reply.agent.split(' ')[0][0] }}
                    </div>
                </td>
                <td>
                    <div class="media-body ml-2">
                        <h5 class="font-size-14 mt-3">{{ reply.agent_id != user.id ? reply.agent : "You" }} 
                            <span><small class="text-muted">replied</small></span> 
                        </h5>
                        <em><small class="text-muted">2 hours ago</small></em>
                    </div>
                </td>
            </tr>
            <!-- <tr>
                <td style="width: 30px; height: 18px;display: flex; justify-content: center; align-items: flex-end">
                    <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 32 32" class="app-icon app-icon-convo app-icon--small app-icon--topalign"><path d="M2.56 5.333h26.347c1.119 0 2.027.912 2.027 2.036v18.327a2.03 2.03 0 01-2.027 2.036H2.56a2.032 2.032 0 01-2.027-2.036V7.369A2.03 2.03 0 012.56 5.333zm.405 2.444V25.29h25.536V7.777H2.965zm4.323 3.667l8.445 5.657 8.445-5.657c.559-.374 1.314-.223 1.686.339s.222 1.32-.337 1.694l-9.12 6.109a1.21 1.21 0 01-1.349 0l-9.12-6.109c-.559-.374-.71-1.133-.337-1.694s1.128-.713 1.686-.339z"></path></svg>
                </td>
                <td>
                    <div class="media-body ml-2">
                        <div><b>To:</b> <span><small>{{reply.to}}</small></span></div>
                    </div>
                </td>
            </tr> -->
        </table>
    </div>


    <p v-html="reply.reply"> </p>
</div>
</template>

<script>

export default {
    name: "Reply",
    props: {
        reply: Object,
    },
    data(){
        return {
            user: null,
        }
    },
    mounted(){
        let user = JSON.parse(sessionStorage.getItem('user'));
        this.user = user
    },
    created(){
        let user = JSON.parse(sessionStorage.getItem('user'));
        this.user = user
    },
    methods:{
     delHtmlTag(str){
        return str.replace(/<[^>]+>/g,"");
        }
    }
}
</script>

<style scoped>
.card-body {
    background: #f8f8fb !important;
    margin-bottom: 4px;
}
svg {
    width: 12px;
    height: 12px;
}
td {
    margin-right: 5px !important;
}
</style>