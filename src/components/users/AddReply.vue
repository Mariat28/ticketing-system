<template>
<div>
  <div class="add-reply">
    <div class="to">
      <span class="to-text">to: </span> <span>{{ticket.email}}</span>
    </div>
    <editor class="reply-message" name="reply" cols="30" rows="3" v-model="reply.reply"
      api-key="n8zu1squxwieigpeix0o23ri83fgsap9u11ct412hpqqndc5"
        :init="{
          height: 300,
          menubar: true,
          branding: false,
          plugins: [
            'advlist autolink lists link image charmap print preview anchor',
            'searchreplace visualblocks code fullscreen',
            'insertdatetime media table paste code help wordcount'
          ],
          toolbar:
            'undo redo | formatselect | bold italic backcolor | \
            alignleft aligncenter alignright alignjustify | \
            bullist numlist outdent indent | removeformat | help'
        }"
    />
    <!-- <textarea id="elm1" name="area"></textarea> -->
    <div class="send-actions">
      <div class="delete" @click="cancelReply">
        <a><i class="fa fa-times-circle mr-1 float-left"></i> </a>Cancel</div>
      <div class="send"  @click="addReply">
        <a class="btn btn-sm btn-primary waves-effect float-right text-white">
         <i class="fa fa-paper-plane"></i> Send</a>
      </div>
      
    </div>

  </div>
</div>
</template>

<script>
import axios from 'axios'
import store from '../../store'
import Editor from '@tinymce/tinymce-vue'

export default {
  name:'AddReply',
  props: {
    cancelReply: Function,
    confirmReply: Function,
    fetcTicketDetails: Function,
    contact: String,
    ticket: Object,
  },
  components:{
    editor: Editor,
  },
  data(){
    return{
        reply:{
          reply:'',
          to: this.ticket.email,
          agent: this.ticket.agent,
          agent_id: 1,
          company_id: 1,
          ticket_id: this.$route.params.ticketId,
        },
            user:'',
        
    }
  },
  created(){
    this.user= JSON.parse(sessionStorage.getItem(`user`));
  },
  methods: {
    async addReply(){
      let user = JSON.parse(sessionStorage.getItem('user'));

      store.dispatch("startLoader")
      const response = await axios.post('v1/sendreply', {
        'company_id': user.company_id,
        'to': this.ticket.email,
        'reply': this.reply.reply,
        'ticket_id': this.ticket.id,
        'ticket_body': this.ticket.description,
        'agent_id': user.id,
        'agent': user.name,
      });

      const notification = {
        'agent_id': this.user.id,
        'response_type': 'reply',
        'company_id':this.user.company_id,
        'ticket_id': this.$route.params.ticketId,
      }

      if(response.data){
        let dataObj = response.data
        store.dispatch("stopLoader")
        if(dataObj.message == 'Email was sent'){
          this.$toasted.show("Reply sent!");
          this.fetcTicketDetails()
          this.confirmReply()
        }
        else {
          this.$toasted.show("Reply Failed!",{type: "error"});
        }
      }else{
        store.dispatch("stopLoader")
      }


      try{
        axios.post('notifications',notification)
      } catch{
        console.log('error'+console.error());
      }
    }
  },
}
</script>


<style scoped>
svg {
  width: 11px;
  height: 11px;
  fill: inherit;
}
.add-reply {
  margin-top: 10px;
  border-radius: 6px;
  width: 100%;
  background: #f8f8fb;
  border: 0.1px solid rgba(0,0,0, .15);
}
.to, .send-actions {
  padding: 10px 5px;
}
.to-text{
  font-weight: bold;
  opacity:0.7;
}

.send-actions {
  background: #f8f8fb;
  border-top: 0.1px solid rgba(0,0,0, .09);
  border-bottom-left-radius: 6px;
  border-bottom-right-radius: 6px;
  display: flex;
  justify-content: space-between;
}
.delete {
  transition: 300ms ease-out;
  border: 1px solid rgba(0,0,0, .15);
  border-radius: 4px;
  display: flex;
  justify-content: center;
  align-items: center;
  padding:5px;
}
.delete:hover {
  background: #f46a6a;
  color: white;
  cursor: pointer;
}
.delete:hover svg {
  fill: white;
}
textarea {
  width: 100%;
  border-top: 0.1px solid rgba(0,0,0, .1);
  border-bottom: none;
  border-left: none;
  border-right: none;
  padding: 5px 10px;
  font-size: 12px;
  outline: none;
  resize: none;
}
textarea:focus {
  border-top: 0.1px solid rgba(0,0,0, .15);
  outline: none;
}
</style>