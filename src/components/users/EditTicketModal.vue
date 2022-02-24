<template>
    <div class="modal right fade" id="editTicketModal" data-backdrop="static" tabindex="-1" role="dialog" aria-labelledby="myModalLabel2">
		<div class="modal-dialog" role="document">
			<div class="modal-content">

				<div class="modal-header">
					<h4 class="modal-title" id="myModalLabel2">Edit Ticket Details</h4>
					<button type="button" class="close" data-bs-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>
				</div>

				<div class="modal-body">
          <form>
            <div class="mb-3">
                <label for="formrow-firstname-input" class="form-label form-group-required" Required>Contact
                    <font-awesome-icon icon="asterisk" class="required fa-xs text-danger" style="padding-top:-30px;"/>
                </label>
                <input type="text" class="form-control" v-model="contact" id="formrow-firstname-input">
            </div>
            <div class="mb-3">
                <label for="formrow-subject" class="form-label">Subject</label>
                <input type="text" class="form-control" v-model="subject" id="formrow-subject">
            </div>
            <div class="form-group mb-3">
                <label for="exampleFormControlTextarea1">Description</label>
                <textarea class="form-control" id="exampleFormControlTextarea1" v-model="description"  cols="5" rows="12"><span>
                </textarea>
            </div> 
          </form>
					
        </div>
        <div class="modal-footer">
          
          <a href="javascript: void(0);" class="btn btn-sm btn-danger waves-effect float-left" data-bs-dismiss="modal">
          <i class="fa fa-ban"></i> Cancel</a>
          
          <a  class="btn btn-sm btn-primary waves-effect text-white" style="float:right" @click="editTicket" data-dismiss="modal">
          <i class="fa fa-paper-plane"></i> Update</a>
          
                            
        </div>

			</div><!-- modal-content -->
		</div><!-- modal-dialog -->
	</div>
</template>
<style scoped>
.modal.fade:not(.in).right .modal-dialog {
  -webkit-transform: translate3d(-25%, 0, 0);
  transform: translate3d(75%, 0, 0);
}
</style>
<script>
import axios from 'axios';
export default {
  name:'EditTicketModal',
  props:{
    description:String,
    subject:String,
    contact:String,
    ticketId:Number
  },
  data(){
    return{
        ticketdescription:this.description,
        ticketsubject:this.subject,
        contactname:this.contact,
    }
  },
  methods:{
    editTicket(){
      axios.post('editticket',{ticketId:this.ticketId, subject:this.subject, contactname:this.contact, description:this.description}).
      then(()=>{
        //   response.data
        this.$router.go();
        
      })
      this.$toasted.show("Ticket edited successfully", {
          position: "bottom-right",
          theme: "toasted-primary",
          className: ["bg-success"],
          icon: {
            name: "fa fa-check-circle",
            after: false,
          },
        },100000);
    }
  }
}
</script>
