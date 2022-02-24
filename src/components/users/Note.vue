<template>
    <div class="card-body">
    <div class="media mb-2">
        <!-- <img class="d-flex me-3 rounded-circle avatar-sm" src="/assets/images/users/avatar-2.jpg"
            alt="Generic placeholder image"> -->
        <table>
            <tr>
                <td>
                    <div class="avatar light bg-warning" style="width: 30px; height: 30px; display: flex; justify-content: center;align-items: center; border-radius: 4px">
                        {{ note.agent.split(' ')[0][0] }}</div>
                </td>
                <td>
                    <div class="media-body ml-2">
                        <h5 class="font-size-14 mt-3">{{ note.agent_id != user.id ? note.agent : "You" }} 
                            <span><small class="text-muted">added a note</small></span> 
                        </h5>
                        <em><small class="text-muted">2 hours ago</small></em>
                    </div>
                </td>
            </tr>
            <tr>
                <td style="width: 30px; height: 18px;display: flex; justify-content: center; align-items: flex-end">
                    <svg xmlns="http://www.w3.org/2000/svg" width="60" height="60" viewBox="0 0 60 60" class="app-icon app-icon-convo app-icon--small app-icon--topalign"><g fill="none" fill-rule="evenodd"><path fill="#DADFE3" d="M2.8 9.74h34.6a2 2 0 012 2v9.52H.8v-9.52a2 2 0 012-2zm54.781 14.85a3.5 3.5 0 010 4.95l-19.02 19.02-7.85 2.9 2.9-7.85 19.02-19.02a3.5 3.5 0 014.95 0z"></path><path fill="#6F7C87" fill-rule="nonzero" d="M41.6 18.9H5.4V51A2.6 2.6 0 008 53.6h31a2.6 2.6 0 002.6-2.6v-4a1.4 1.4 0 012.8 0v4a5.4 5.4 0 01-5.4 5.4H8A5.4 5.4 0 012.6 51V9A5.4 5.4 0 018 3.6h31A5.4 5.4 0 0144.4 9v13.5a1.4 1.4 0 01-2.8 0v-3.6zm0-2.8V9A2.6 2.6 0 0039 6.4H8A2.6 2.6 0 005.4 9v7.1h36.2zM13.5 30.8a1.4 1.4 0 010-2.8h19a1.4 1.4 0 010 2.8h-19zm0 10a1.4 1.4 0 010-2.8h12a1.4 1.4 0 010 2.8h-12zm44.142-21.15a5 5 0 010 7.072L38.55 45.814l-9.192 2.121 2.121-9.192L50.571 19.65a5 5 0 017.071 0zm-9.4 6.289L34.028 40.155l-.933 4.044 4.044-.933L51.354 29.05l-3.111-3.111zm1.98-1.98l3.112 3.111 2.328-2.328a2.2 2.2 0 10-3.111-3.111l-2.328 2.328z"></path></g></svg>
                </td>
                <td>
                    <div class="media-body ml-2">
                        <div>Notified to: <span><b>{{ note.to }}</b></span></div>
                    </div>
                </td>
            </tr>
        </table>
    </div>
    <p> {{ note.note }} </p>
</div>
</template>

<script>

export default {
    name: "Note",
    props: {
        note: Object
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
}
</script>

<style scoped>
.card-body {
    background: #ffc10757 !important;
    margin-bottom: 4px;
    padding: 0px 20px 0.02px 20px;
}
svg {
    width: 12px;
    height: 12px;
}
td {
    margin-right: 5px !important;
}
</style>