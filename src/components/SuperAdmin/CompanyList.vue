<template>
  <div class="content">
    <div id="main-content">
      <div class="page-content">
        <div class="container-fluid">
          <!-- actions -->
          <div class="actions bg-light row">
            <div class="left-subnav  col-6 float-left">
              <div style="margin-left:60px" class="left-subnav" id="leftnav">
                <input
                  type="checkbox"
                  class="form-check-input select-check mt-2"
                  id="exampleCheck1"
                  @click="toggleSelection"
                />
                <!-- <label
                    for="paginate"
                    class="text-nowrap mb-0 ml-3"
                  >Per Page: </label>
                    <select
                      class=" form-control-sm border-light ml-1 pl-0"
                      style="width:50px;"
                    >
                      <option value="10">10</option>
                      <option value="20">20</option>
                      <option value="30">30</option>

                      </select> -->
                <label for="sort" id="sort-label" class="select-span"
                  >Sort By:</label
                >

                <select
                  id="sort"
                  class="form-control-sm border-light ml-1 pl-0"
                  v-model="sort_value"
                  @change="sortCompanies"
                >
                  <option value="createdAt">Date Created</option>
                  <option value="updatedAt">Last modified</option>
                  <option value="subscription">Plan</option>
                  <option value="status">status</option>
                </select>
                
                <!-- <a class="btn btn-light border-secondary btn-sm d-none action">
                            <i class="fa fa-user-plus"></i>Assign</a> -->
                <!-- <a class="btn btn-light border-secondary btn-sm d-none action">
                            <i class="fa fa-ban"></i>Close</a> -->
                <!-- <a class="btn bg-muted border-secondary btn-sm d-none import-btn action">
                  <i class="fa fa-object-group"></i>Merge</a
                > -->
                <a class="btn btn-light border-secondary btn-sm d-none import-btn action" @click="deleteAll">
                  <i class="fa fa-trash-alt"></i>Delete</a
                >
                 <!-- <a
                  class="
                    btn btn-light
                    text-muted
                    border-secondary
                    searchicon1
                    btn-sm
                  "
                  @click="showListSearch"
                  id="search-icon"
                >
                  <i class="fa fa-search"></i>
                </a> -->
                <!-- <input
                  class="form-control form-control-sm mr-sm-2"
                  type="search"
                  id="searchbar-right"
                  placeholder="Search tickets"
                  aria-label="Search"
                  v-model="searchterm"
                /> -->
                <!-- <input
                  class="
                    form-control form-control-sm
                    mr-sm-2
                    float-right
                  "
                  type="search"
                  id="searchbar1"
                  placeholder="Search tickets"
                  aria-label="Search"
                  v-model="searchterm"
                /> -->
              </div>
            </div>
            <div class="col-6 right-subnav" style="margin-right:0px;width: 400px; display:flex; align-items: flex-end;justify-content: space-between">
            </div>
          </div>
        </div>
        <div style="margin-left:60px; margin-top:70px;">
          <div class=" mt-5 ml-3 mr-3">
            <div class="card">
              <div class="card-body">
                    <tr v-if="companies.length===0" class="text-center mt-5">No Companies have been added!</tr>

                <table class="table table-striped mt-1 table-hover mb-0" v-if="companies.length!==0">
                  <thead>
                      <tr>
                        <td></td>
                          <th>Company ID</th>
                          <th>Name</th>
                          <th>Company Email</th>
                          <th>Contact</th>
                          <th>Domain</th>
                          <th>Location</th>
                          <th>Physical Address</th>
                          <th>Softdesk Email</th>
                          <th>Plan</th>
                          <th>Status</th>
                          <th>Action</th>
                      </tr>
                  </thead>
                  <tbody>
                    <tr v-for="company in pageOfItems" :key="company.id">
                      <td ><input class="form-check-input ml-1" type="checkbox" id="select" v-model="selected" ref="rolesSelected" /></td>
                      <td @click="openCompany(company)" id="company-id">SD{{company.id}}</td>
                      <td>{{company.name}}</td>
                      <td>{{company.email}}</td>
                      <td>{{company.phone}}</td>
                      <td>{{company.website}}</td>
                      <td>{{company.city}},<br>
                          {{company.country}}
                      </td>
                      <td>{{company.street}},<br>
                      {{company.apartment}}</td>
                      <td>{{company.assigned_email}}</td>
                      <td>{{company.subscription.subscription}}</td>
                      <td id="status-cell">{{company.status.status}}</td>

                      <td>
                        <a  href="javascript: void(0);" data-bs-toggle="modal" :data-bs-target="'#editcompany'+company.id"><i class="fa fa-edit text-muted"></i></a>
                        <a  href="javascript: void(0);" @click="deleteCompany(company.id)"><i class="fa fa-trash-alt ml-3 text-danger"></i></a>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div> 
            </div>
            
            <div
              style="margin-left: 10px; bottom: 0; position: fixed"
            >
              <jw-pagination 
                :pageSize="10"
                :items="companies"
                @changePage="onChangePage"
              >
              </jw-pagination>
            </div> 
             <EditCompany :id="'editcompany'+ company.id" v-for="company in companies" :key="company.id"
                        :company="company">
              </EditCompany>
          </div>
        </div>
        
        
      </div>
      <!-- Pagination -->
     
      <div>
      </div>
    </div>
  </div>
 
</template>

<script>
import EditCompany from "@/components/SuperAdmin/EditCompany.vue";
import axios from "axios";
import store from '../../store'
import { mapState } from 'vuex';
export default {
  name: "CompanyList",
  components:{
    EditCompany,
  },
  data() {
    return {
      value:'',
      sort_value:"createdAt",
      selected:false,
      pageOfItems:[],
      plans:[],
      statuses:[]
    }
  },
  mounted() {
    //get the lexical this variable for the outer functions
    let user = JSON.parse(sessionStorage.getItem("user"));
    this.user = user
  },
  created() {
    store.dispatch("stopLoader")
    let user = JSON.parse(sessionStorage.getItem("user"));
    this.user = user
    this.$store.dispatch('fetchCompanies')
    this.fetchStatuses();
  },
  methods: {
    onChangePage(pageOfItems) {
      // update page of items
      this.pageOfItems = pageOfItems;
    },
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
    openCompany(company){
      this.$router.push(`companydetails/${company.id}`)
    },
    async editStatus(company){
    //   document.getElementById('status-cell').setAttribute("contenteditable", "true")
      await axios.post('v1/manager/companies/edit',company).then(()=>{
        this.$toasted.show('Company status changed!')
      // this.$store.dispatch('deleteCompany', id);
  })
    },

   async deleteCompany(id){
       this.$swal.fire({
                title: 'Are you sure?',
                text: "You won't be able to revert this!",
                icon: 'warning',
                showCancelButton: true,
                confirmButtonColor: 'bg-primary',
                cancelButtonColor: '#d33',
                confirmButtonText: 'Continue!',
            }).then((result) => {
            if (result.isConfirmed) {
                  axios.post('v1/manager/companies/remove',{id:id}).then(()=>{
                    this.$store.dispatch('deleteCompany', id);
            })
                this.$swal.fire({
                title:'Deleted!',
                text:'Company has been deleted.',
                icon:'success',
                timer:1000
                })
            }else if (result.dismiss === this.$swal.DismissReason.cancel) {
            this.$swal.fire({
                 title:'Cancelled',
                text:'Company not deleted',
                icon:'error',
                timer:1000
            }
           
            )
        }
            })
        
   },
  
    toggleSelection(){
      if(document.getElementById('exampleCheck1').checked){
        this.selectAll();
      }
      else{
        this.deselect()
      }
    },
    selectAll() {
      let check = document.getElementsByClassName("form-check-input");
      for (let i = 0; i < check.length; i++) {
        if (check[i].type == "checkbox") {
          check[i].checked = true;
          //
        }
      }
      let actions = document.querySelectorAll(".btn.d-none");
      for (let x = 0; x <= actions.length; x++) {
        actions[x].classList.remove("d-none");
        document.getElementById("sort").classList.add("d-none");
        document.getElementById("sort-label").classList.add("d-none");

        // document.getElementById('rightnav').style.marginTop('-10px');
      }
    },
    deselect() {
      let check = document.getElementsByClassName("form-check-input");
      for (let i = 0; i < check.length; i++) {
        if (check[i].type == "checkbox") {
          check[i].checked = false;
        }
      }
      let actions = document.querySelectorAll(".action");
      for (let x = 0; x <= actions.length; x++) {
        actions[x].classList.add("d-none");
        document.getElementById("sort").classList.remove("d-none");
        document.getElementById("sort-label").classList.remove("d-none");
      }
    },
    sortCompanies(){
      let companies = this.pageOfItems;
      if(this.sort_value==="status"){
        let sorted=function compare(a, b) {
                if (a.status_id > b.status_id)
                  return 1;
                if (a.status_id < b.status_id)
                  return -1;
                return 0;
              }

        return companies.sort(sorted);
      }
      else if(this.sort_value==='createdAt'){
         let sorted=function compare(a, b) {
                if (a.created_at > b.created_at)
                  return -1;
                if (a.created_at < b.created_at)
                  return 1;
                return 0;
              }

        return companies.sort(sorted);
      }
      else if(this.sort_value==='updatedAt'){
         let sorted=function compare(a, b) {
                if (a.updated_at > b.updated_at)
                  return -1;
                if (a.updated_at < b.updated_at)
                  return 1;
                return 0;
              }

        return companies.sort(sorted);
      }
      else if(this.sort_value==='subscription'){
         let sorted=function compare(a, b) {
                if (b.subscription_id > a.subscription_id)
                  return 1;
                if (b.subscription_id < a.subscription_id)
                  return -1;
                return 0;
              }

        return companies.sort(sorted);
      }
        return this.pageOfItems;
      
    },
    deleteAll(){
      this.$swal.fire({
        title: 'Are you sure?',
        text: "Proceeding will clear all companies in the system. You won't be able to revert this!",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: 'bg-primary',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Proceed',
        showClass: {
        popup: 'animate__animated animate__fadeInDown'
        },
        hideClass: {
        popup: 'animate__animated animate__fadeOutUp'
        }
      }).then((result) => {
      if (result.isConfirmed) {
        axios.post('deleteall', this.companies).then((response)=>{
        this.$store.dispatch('deleteAllCompanies');
            })
        this.$swal.fire(
          'Done!',
          'All company data has been deleted.',
          'success'
        )
      }else if (result.dismiss === this.$swal.DismissReason.cancel) {
    this.$swal.fire(
      'Cancelled',
      'Company data still intact',
      'error'
    )
  }
      })
    }

  },
  computed: {
    ...mapState({
      companies:(state)=>state.companies.companies
    })
  },
};
</script>

<style scoped>
.card {
 border: none;
 box-shadow: 0 7px 8px rgba(0, 0, 0, 0.12);
 border-radius: 7px;
}
tr{
    font-size:13px;
    font-weight: 400;
}
tr, th, a{
  color:#183247 !important;
}

#company-id{
  cursor: pointer;
  color:#556ee6;
}
/* #searchbar {
  max-width: 78%;
  margin-left: 20px;
} */
#searchbar1 {
  max-width: 50%;
}
#searchbar-right {
  display: none;
}
/* .search {
  width: 30px;
  height: 27px;
  float: right;
  margin-top: 0px;
  margin-right: 10px;
} */
.right-subnav {
  width:35%;
  position:fixed;
  right:0
}
.listview {
  padding: 10px;
  padding-right: 5%;
  margin-top: 55px;
  right: 3%;
}
.action {
  margin-left: 30px;
  margin-bottom: 10px;
}
i {
  padding-right: 5px;
}
.select-span {
  margin-left: 0px;
  padding-left: 10px;
  margin-top: 5px;
}
.select-check {
  margin-top: -3px;
  width: 15px;
  /* margin-right: 40px; */
  height: 15px;
}
.actions {
  margin-left: 0px;
  margin-top: -30px;
  height: 70px;
  position: fixed;
  z-index: 2;
  align-items: center;
  min-width: 100%;
  box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2);
}
.prev {
  margin-right: 10px;
}

.bg-light {
  background: #f5f7f9 !important;
}
.scroll {
  overflow-y: scroll;
}
.filter-btn {
  margin-bottom: 5px;
  width: 100%;
  height: 30px;
}
/* .filter-btn:hover {
  cursor: no-drop;
} */
#sort {
  outline: none;
  border: none;
  background-color: inherit;
  font-weight: normal;
  width: 120px;
  padding-left: 5px;
}
.left-subnav {
  /* max-width: 50vw; */
  margin-left: 25px;
}
@media screen and (min-width: 2000px) {
  .actions {
    min-width: 100%;
  }
  .listview {
    right: 2%;
  }
  .right-subnav {
   width:25%;

  }
  .ticketlist-item {
    margin-left: 10px;
  }
  .searchicon1 {
    display: none;
  }
  #searchbar-right {
    display: block;
    width: 500px;
    float: right;
  }

  .card-body.scroll {
    -ms-overflow-style: none !important; /* Internet Explorer 10+ */
  }
  .card-body.scroll::-webkit-scrollbar {
    display: none !important;
  }
 
}
</style>