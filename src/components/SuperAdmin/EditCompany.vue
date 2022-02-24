<template>
    <div class="modal right fade" :id="'editcompany'+ company.id"  data-backdrop="static" tabindex="-1" role="dialog" aria-labelledby="myModalLabel2">
		<div class="modal-dialog" role="document">
			<div class="modal-content">

				<div class="modal-header">
					<h4 class="modal-title" id="myModalLabel2">Edit Company Details</h4>
					<button type="button" class="close" data-bs-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>
				</div>

				<div class="modal-body">
          <form>
            <div class="mb-3">
                <div class="form-group">
                <label >Subscription</label>
    
                <select  class="form-control" v-model="plan" >
                  <option v-for="(plan,index) in plans" :key="index" :value="plan.id">{{plan.subscription}}</option>
                </select>
              </div>
            </div>
            <div class="mb-3">
                 <label >Status</label>
    
                <select class="form-control"  v-model="status">
                  <option v-for="(status,index) in statuses" :key="index" :value="status.id">{{status.status}}</option>
                </select>
            </div>
            
          </form>
					
        </div>
        <div class="modal-footer">
          
          <a href="javascript: void(0);" class="btn btn-sm btn-danger waves-effect float-left" data-bs-dismiss="modal">
          <i class="fa fa-ban"></i> Cancel</a>
          
          <a  class="btn btn-sm btn-primary waves-effect text-white" style="float:right"  data-bs-dismiss="modal" @click="editCompany()" >
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
  name:'EditCompany',
  props:{
   company:Object
  },
  data(){
    return{
        plans:[],
        statuses:[],
        user:'',
        status:this.company.status_id,
        plan:this.company.subscription_id
    }
  },
  created(){
    console.log(this.plan);
      this.user=JSON.parse(sessionStorage.getItem('user'));
      this.fetchplans();
      this.fetchStatuses();
  },
  methods:{
        async fetchplans(){
      let data = {role_id:1, company_id:1, name:this.user.name}
      await axios.post('v1/manager/subscriptions/all', data).then((response)=>{
        this.plans=response.data.data;

      })
    },
       async fetchStatuses(){
      let data = {role_id:1, company_id:1, name:this.user.name}
      await axios.post('v1/manager/companystatuses/all', data).then((response)=>{
        this.statuses=response.data.data;

      })
    },
    async editCompany(){
      let data={
        ...this.company,
      }
      data.status_id =this.status
      data.subscription_id=this.plan,
      await axios.post('v1/manager/companies/edit',data).then(()=>{
        this.$store.dispatch('editCompany', data);
        this.$toasted.show('Company details updated!')
    })
  }
}}
</script>
