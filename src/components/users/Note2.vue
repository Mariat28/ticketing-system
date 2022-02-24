<template>
    <tr class="custom-row note">
        <td class="avatar">
            <div class="contact-avatar">
                {{note.agent.split(" ")[0][0].toUpperCase()}}
            </div>
        </td>
        <td>
        <!-- <i class="fa fa-edit float-right text-muted" style="margin-top:-20px;"></i> -->
        <div class="media mb-2">
            <!-- <img class="d-flex me-3 rounded-circle avatar-sm" src="/assets/images/users/avatar-2.jpg"
                        alt="Generic placeholder image"> -->
            <div class="media-body">
            <h5 class="font-size-14 mt-3">
                <span style="color:#556ee6">{{ note.agent }}</span> added a note
                <br>
                <span style="font-style: italic; font-size: 12px;">{{timeDifference}} ({{date}} at {{time}})</span>
            </h5>
            <!-- <small class="text-muted">{{ ticket.email }}</small> -->
            </div>
        </div>
        <div class="mb-2" v-html="note.note"> </div>
        </td>
    </tr>
</template>

<script>

export default {
    name: "Note",
    props: {
        note: Object,
    },
    data(){
        return {
            user: null,
            date: null,
            time: "",
            timeDifference: null,
        }
    },
    mounted(){
        let user = JSON.parse(sessionStorage.getItem('user'));
        this.user = user

        let date = new Date(this.note.created_at),
          time = new Date(this.note.created_at),
          now  = new Date();

        this.timeDifference = ( ( now.getTime() - date.getTime() ) / ( 1000 * 60 * 60 * 24 ) ).toFixed()  <= 0 ?  `${( ( now.getTime() - date.getTime() ) / ( 1000 * 60 * 60 ) ).toFixed()} hours ago` : `${( ( now.getTime() - date.getTime() ) / ( 1000 * 60 * 60 * 24 ) ).toFixed()} days ago`

        date = date.toDateString()

        this.date = date.replace(" ", ", ")
        
        this.time = `${time.getHours()}:${time.getMinutes()}`

        console.log(this.note)
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
.contact-avatar {
  background: rgb(179, 212, 216);
  display: flex;
  justify-content: center;
  align-items: center;
  height: 30px;
  width: 30px;
  border-radius: 6px;
  margin-top: -25px;
  margin-left: 8px;
}
td.avatar {
  height:90px !important;
  display: flex;
  align-items: center;
}
tr td:first-child {
  margin-right: 8px;
  margin-left: 5px;
  border-top-left-radius: 1px;
  border-bottom-left-radius: 1px;
}
tr td:last-child {
  border-top-right-radius: 1px;
  border-bottom-right-radius: 1px;
  padding-right: 5px !important;
}
</style>