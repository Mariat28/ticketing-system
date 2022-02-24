<template>
  <div class="content ">
    <div id="main-content">
      <div class="page-content">
        <div class="container-fluid">
            <div class="row">
                <!-- col 1 -->
          <div class="card col-md-8 col-xxl-8 overflow-hidden">
            <div class="bg-primary bg-soft">
                  <div class="text-primary p-3">
                    <h5 class="text-primary text-center"> New Contact!</h5> 
                </div>
            </div>
            <div class="card-body pt-0 mt-3">
                <form method="POST" @submit.prevent="createContact">
                    <p>All Fields marked with * are compulsory</p>
                    <div class="mb-3">
                        <label for="formrow-firstname-input" class="form-label form-group-required" Required>Name
                            <font-awesome-icon icon="asterisk" class="required fa-2x"/>
                        </label>
                        <input type="text" class="form-control" name=name  id="formrow-firstname-input" v-model="contact.name" required>
                    </div>
                    <div class="mb-3">
                        <label for="formrow-email-input" class="form-label">Email</label>
                        <input type="email" class="form-control" name=email id="formrow-email-input" v-model="contact.email"  required>
                    </div>
                    <div class="mb-3">
                        <label for="formrow-phone-input" class="form-label">Phone</label>
                        <input type="text" class="form-control" name=phone id="formrow-phone-input" v-model="contact.phone">
                    </div>
                    
                    <div class="mb-3">
                        <label for="formrow-company-input" class="form-label">Company</label>
                        <input type="text" class="form-control" name="company" id="formrow-company-input" v-model="contact.company">
                    </div>
                    <div>
                      <router-link to="/addnewticket"
                            href="javascript: void(0);"
                            class="btn form-btn mr-0 btn-secondary waves-effect float-left waves-light w-md" type="submit"
                            ><i class="fa fa-times-circle p-1"></i>Cancel </router-link>
                        <a
                            href="javascript: void(0);"
                            @click="createContact"
                            class="btn  btn-primary waves-effect waves-light w-md float-right" type="submit"
                            >Create<i class="mdi mdi-arrow-right ms-1"></i></a>
                            
                    </div>
                </form>

            </div>
          </div>
               

            </div>
        </div>
        <!-- container-fluid -->
      </div>
    </div>
  </div>
</template>
<script>
import axios from 'axios'
export default {
  name: "AddNewTicket",
  data(){
    return{
      contact:{
        name:'',
        phone:'',
        email:'',
        company:'',
        company_id: 1,
        
      }
    }
  },
  methods:{
    async createContact() {
      let user = JSON.parse(sessionStorage.getItem('user'));
      this.contact.company_id = user.company_id
      console.log(user)
      await axios
        .post("contacts", this.contact).
        then(()=>{
          this.$toasted.show("Contact successfully added..!");
          this.$router.replace('/addnewticket');
          }). catch((err) => console.log(err));
               this.contact={
                    contactname:" ",
                    contact:' ',
                    description:' '
               }, 
          setTimeout(this.$toast.clear, 5000);

    },
  }
};
</script>
<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.content {
  margin-left: 120px;
}
.required{
    font-size: 9px;
}
.form-btn{
    float: right;
     margin-right: 5px;
}
</style>
