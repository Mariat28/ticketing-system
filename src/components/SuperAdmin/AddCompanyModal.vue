<template>
    <div class="modal right fade" id="addCompanyModal" data-backdrop="static" tabindex="-1" role="dialog" aria-labelledby="myModalLabel2">
		<div class="modal-dialog" role="document">
			<div class="modal-content">

				<div class="modal-header">
					<h4 class="modal-title" id="myModalLabel2"><i class="fa fa-building text-muted"/> New Company</h4>
					<button type="button" class="close" data-bs-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>
				</div>

				<div class="modal-body">
          <form @submit.prevent="addCompany">
            <div class="form-row">
              <div class="form-group col-md-6">
                <label for="inputname">Name</label>
                <input type="text" class="form-control" id="inputname" placeholder="Name" v-model="company.name"  required >
              </div>
              <div class="form-group col-md-6">
                <label for="inputEmail4">Email</label>
                <input type="email" class="form-control" id="inputEmail4" placeholder="Email" v-model="company.email"  required >
              </div>
              
            </div>
            <div class="form-group">
                <label for="inputPassword4">Password</label>
                <input type="password" class="form-control" id="inputPassword4" placeholder="Password" v-model="company.password"  required >
              </div>
            <div class="row">
              <div class="form-group col-md-6">
                <label for="inputphone">Telephone</label>
                <input type="text" class="form-control" id="inputphone" placeholder="0789456789" v-model="company.phone">
              </div>
              <div class="form-group col-md-6">
                <label for="inputweb">Website</label>
                <input type="text" class="form-control" id="inputweb" placeholder="https:://soft-desk.nl" v-model="company.website"  required >
              </div>
            </div>  
             <div class="form-row">
              
              <div class="form-group col-md-6">
                <label for="inputState">Country</label>
                <country-select v-model="country" :country="country" topCountry="US" :countryName="true"  class="form-select" :autocomplete="true" />
              </div>
              <div class="form-group col-md-6">
                <label for="inputState">Region</label>
                <region-select v-model="region" :country="country" :region="region" :countryName="true" :regionName="true"  class="form-select" :autocomplete="true"/>
                
              </div>
              
            </div>
            <div class="form-row">
              <div class="form-group col-md-4">
                <label for="inputCity">Apartment</label>
                <input type="text" class="form-control" id="inputCity" placeholder="Suit-TF09" v-model="company.apartment">
              </div>
              
              <div class="form-group col-md-6">
                <label for="inputStreet">Street</label>
                <input type="text" class="form-control" id="inputStreet" placeholder="1234 Main St" v-model="company.street">
              </div>
              <div class="form-group col-md-2">
                <label for="inputZip">Zip</label>
                <input type="text" class="form-control" id="inputZip" placeholder="256" v-model="company.zipcode">
              </div>
            </div>
            <div class="form-group">
              <label for="inputAddress">Softdesk Email</label>
              <input type="text" class="form-control" id="inputAddress" placeholder="projectcode@softdesk.nl" v-model="company.given_email"  required >
            </div> 
            <div class="form-group">
                <label for="subscription">Subscription</label>
                <select id="subscription" class="form-control" v-model="company.subscription_id">
                  <option v-for="(plan,index) in plans" :key="index" :value="plan.id">{{plan.subscription}}</option>
                </select>
              </div>
          </form>
					
        </div>
        <div class="modal-footer">
          
          <a href="javascript: void(0);" class="btn btn-sm btn-danger waves-effect float-left" data-bs-dismiss="modal">
          <i class="fa fa-ban"></i> Cancel</a>
          <a  class="btn btn-sm btn-primary waves-effect text-white" style="float:right" data-bs-dismiss="modal" @click="addCompany">
          <i class="fa fa-paper-plane"></i> Save</a>
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
label, h4{
  color:#183247 !important;
}
label{
  font-size:13px;
}
</style>
<script>
import axios from 'axios';
export default {
  name:'AddCompanyModal',
  data(){
    return{
      plans:[],
      user:'',
      countries:[],
      country: '',
      region: '',
      company:{
        name:'',
        email:'',
        password:'',
        phone:'',
        website:'',
        apartment:null,
        street:null,
        zipcode:null,
        status_id:1,
        given_email:'',
        subscription_id:2
      }
    }
  },
  created(){
    this.user=JSON.parse(sessionStorage.getItem('user'))
    this.fetchplans();
  },
  methods:{
    async fetchplans(){
      let data = {role_id:1, company_id:1, name:this.user.name}
      await axios.post('v1/manager/subscriptions/all', data).then((response)=>{
        this.plans=response.data.data;

      })
    },
    async addCompany(){
      await axios.post('v1/manager/companies/register', this.company, {params:{country:this.country, city:this.region}}).then((response)=>{
        this.$store.dispatch('addCompany', response.data.data);
        this.$store.dispatch('fetchCompanies');
        this.$toasted.show("Company successfully added..!");
      })
    }

  }

}
</script>
