<template>
  <div class="add-reply">
  <div  class="card suggestions" v-if="isMention">
    <div class="head">Suggestions</div>
    <div>
      <div v-for="(agent, index) in agents" :key="index" class="suggested" id="suggested" @click="selectSuggestion">
        <div class="avatar">{{agent.name.split(' ')[0][0]}}{{agent.name.split(' ')[1][0] ? agent.name.split(' ')[1][0] : ""}}</div>
        <div class="details">
          <span class="name">{{agent.name}}</span>
          <span class="email small">{{agent.email}}</span>
        </div>
      </div>
    </div>
  </div>
    <div class="to">
      <span class="font-size-13">Notify to:</span> <span class="font-size-12"><b class="mentionedagentsemails">{{mentionedagentsemails}}</b></span>
    </div>
    <form method='POST' @submit.prevent="addNote">
    <textarea v-model="notebody.note" @click="hideMention" @input="handleChange" class="note-message" name="note" id="textarea" cols="7" rows="4" placeholder="Add a note, @mention to invite to note"></textarea>
    <div class="send-actions">
       <div class="btn btn-sm  waves-effect delete" @click="cancelNote"><i class="fa fa-times-circle mr-1"></i>
       Cancel
      </div>
      <div class="send float-right">
        <a @click="addNote" type="submit" class="btn btn-sm btn-primary text-white waves-effect">
        <i class="fa fa-paper-plane"></i> Add note</a>
      </div>
     
    </div>
    </form>
  </div>
</template>

<script>
import axios from 'axios';
import store from '../../store'
export default {
  props: [
    'cancelNote',
    'confirmNote',
    'fetcTicketDetails',
    'agents',
  ],
   data(){
    return{
      notebody:{
        note:'',
        agent: 'Mariat Ndagire',
        agent_id:1,
        ticket_id:1,
        to:'',
      },
      mentionedagentsemails: '',
      isMention: false,
      user:'',
    }
  },
  mounted(){
    let user = JSON.parse(sessionStorage.getItem('user'));
    this.user = user
    document.querySelector('textarea').addEventListener('keypress', event => {
      if(event.key == "@"){
        this.isMention = true;
        setTimeout(function(){
          this.isMention = true
        }, 500)
      }
      else {
        this.hideMention()
      }
    });
  },
  created(){
    this.user = JSON.parse(sessionStorage.getItem(`user`));
  },
  methods: {
    handleChange(event){
      if(event.target.value == ""){
        this.hideMention()
      }
    },
    selectSuggestion(event){
      if(event.srcElement.className == 'name'){
        this.notebody.note += event.target.innerText
        this.mentionedagentsemails += `${event.srcElement.nextElementSibling.innerText}, `
      }
      else if(event.srcElement.className == 'email small'){
        this.notebody.note += event.srcElement.previousElementSibling.innerText
        this.mentionedagentsemails += `${event.target.innerText}, `
      }
      else if(event.srcElement.className == 'avatar'){
        this.notebody.note += event.srcElement.nextElementSibling.firstChild.innerText
        this.mentionedagentsemails += `${event.srcElement.nextElementSibling.lastChild.innerText}, `
      }
      else if(event.srcElement.className == 'suggested'){
        this.notebody.note += event.srcElement.firstChild.nextElementSibling.firstChild.innerText
        this.mentionedagentsemails += `${event.srcElement.firstChild.nextElementSibling.lastChild.innerText}, `
      }
      this.isMention = false;
    },
    hideMention(){
      this.isMention = false;
    },
    async addNote(){
      let user = JSON.parse(sessionStorage.getItem('user'));
      const note = {
        'note': document.querySelector('.note-message').value,
        'agent': user.name,
        'agent_id': user.id,
        'ticket_id': this.$route.params.ticketId,
        'to': this.mentionedagentsemails,
        'company_id': user.company_id,
      }
      store.dispatch("startLoader")
      const response = await axios.post(`v1/addnote`, note);

      if(response.data){
        store.dispatch("stopLoader")
        let dataObj = response.data
        if(dataObj.message == 'Email was sent'){
          let user = JSON.parse(sessionStorage.getItem('user'));
          this.$store.dispatch('fetchAllTickets', user.company_id);
          this.fetcTicketDetails()
          this.$toasted.show("Note sent!",{ });
          this.confirmNote();
        }
        else {
          store.dispatch("stopLoader")
          this.$toasted.show("Note Failed!",{ 
            type: 'error'
          });
        }
        const notification = {
        'agent_id': this.user.id,
        'response_type': 'note',
        'company_id':1,
        // 'response':this.note,
        'ticket_id': this.$route.params.ticketId,
      }
      try{
        axios.post('notifications',notification)
      } catch{
              console.log('error'+console.error());
      }
      }
    }
  },
}
</script>

<style scoped>
.suggested {
  display: flex;
  align-items: center;
  margin-bottom: 5px;
  padding: 5px 0px;
}
.suggested:hover {
  background: #eff2f7;
  cursor: pointer;
}
.head {
  margin-bottom: 10px;
  margin-left: 10px;
  color: black;
}
.suggested .avatar {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 35px;
  height: 35px;
  background: #f5f5f5;
  border-radius: 50%;
  margin-right: 10px;
}
.suggested .details {
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
}
.suggested .details span {
  margin: 0px !important;
  padding: 0px !important;
}
.suggestions {
  width: 60%; 
  max-height: 180px; 
  padding: 5px;
  position: absolute;
  z-index: 20;
  bottom: 115px;
  left: 80px;
  box-shadow: 5px 5px 10px rgba(0,0,0, .1),-5px -5px 10px rgba(0,0,0, .1);
  overflow-y: scroll;
}
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
  position: relative;
}
.to, .send-actions {
  padding: 10px 5px;
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