<template>
<div class="content">
    <div id="main-content">
      <div class="page-content">
            <div class="container-fluid">
                <div>
                    <nav aria-label="breadcrumb">
                        <ol class="breadcrumb ">
                            <li class="breadcrumb-item"><a href="#">Add User</a></li>
                            <li class="breadcrumb-item active text-primary" aria-current="page">New User</li>
                        </ol>
                       <router-link to="/users" ><a class="btn btn-sm float-right btn-primary text-white mr-1"><i class="fa fa-users mr-1"></i>View Users</a></router-link>
                    </nav>
                </div>
                <div class="row mt-5">
                    <div class="col-12">
                        <div class="card">
                            <div class="card-body">
                                <form @submit.prevent="addUser" method="POST">
                                    <div class="mb-3 row">
                                        <label for="name" class="col-md-2 col-form-label">Name</label>
                                        <div class="col-md-10">
                                            <input class="form-control" type="text" id="name" name="name" v-model="user.name" required>
                                        </div>
                                    </div>
                                    <div class="mb-3 row">
                                        <label for="example-email-input" class="col-md-2 col-form-label">Email</label>
                                        <div class="col-md-10">
                                            <input class="form-control" type="email" name="email" v-model="user.email" required
                                                id="example-email-input">
                                        </div>
                                    </div>
                                    <div class="mb-3 row">
                                                <label for="example-tel-input" class="col-md-2 col-form-label">Telephone</label>
                                                <div class="col-md-10">
                                                    <input class="form-control" type="tel" name="phonenumber" v-model="user.phonenumber" required
                                                        id="example-tel-input">
                                                </div>
                                            </div>
                                    <div class="mb-3 row">
                                        <label for="example-password-input" class="col-md-2 col-form-label">Password</label>
                                        <div class="col-md-10">
                                            <input class="form-control" type="password" name="password" v-model="user.password" required
                                                id="example-password-input">
                                        </div>
                                    </div>
                                    <div class="mb-3 row">
                                        <label class="col-md-2 col-form-label">User Role</label>
                                        <div class="col-md-10">
                                            <div class="input-filter-container">
                                                <div class="form-control input-area">
                                                <input type="text" @input="handleKeyboardEntry($event,'userRoles', 'backupUserroles', 'role')" class="agent-input" @click="showUserrolesOptions" v-model="selectedUserrole" placeholder="Any role">
                                                <svg xmlns="http://www.w3.org/2000/svg"  viewBox="0 0 32 32" class="app-icon app-icon--verysmall" data-test-dropdown="menu-sort" data-identifyElement="149"><path d="M8.626 9.744c-.875-.903-2.294-.903-3.17-.001s-.876 2.366-.001 3.268l8.959 9.244a2.195 2.195 0 003.171 0l8.959-9.244c.875-.903.874-2.366-.001-3.268s-2.295-.902-3.169.001L16 17.353 8.626 9.744z" data-identifyElement="150"></path></svg>
                                                </div>
                                                <div class="agent-options" v-if="isUserroles">
                                                <div class="agent-option">
                                                    <div v-for="(role, index) in userRoles"
                                                    :key="index" class="agent-option-item" @click="selecteUserrole(role)">{{ role.role }}</div>
                                                </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    
                                    <div class="mb-3 row">
                                        <label class="col-md-2 col-form-label">Department</label>
                                        <div class="col-md-10">
                                            <div class="input-filter-container">
                                                <div class="form-control input-area">
                                                <input type="text" @input="handleKeyboardEntry($event,'departments', 'backupDepartments', 'department')" class="agent-input" @click="showDepartmentOptions" v-model="selectedDepartment" placeholder="Any department">
                                                <svg xmlns="http://www.w3.org/2000/svg"  viewBox="0 0 32 32" class="app-icon app-icon--verysmall" data-test-dropdown="menu-sort" data-identifyElement="149"><path d="M8.626 9.744c-.875-.903-2.294-.903-3.17-.001s-.876 2.366-.001 3.268l8.959 9.244a2.195 2.195 0 003.171 0l8.959-9.244c.875-.903.874-2.366-.001-3.268s-2.295-.902-3.169.001L16 17.353 8.626 9.744z" data-identifyElement="150"></path></svg>
                                                </div>
                                                <div class="agent-options" v-if="isDepartmentOptions">
                                                <div class="agent-option">
                                                    <div class="agent-option-item"  @click="selectDepartment('none')">None</div>
                                                    <div v-for="(department, index) in departments"
                                                    :key="index" class="agent-option-item" @click="selectDepartment(department)">{{ department.department }}</div>
                                                </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div>
                                        <router-link to="/users"
                                        href=""
                                        class="
                                            btn
                                            btn-sm
                                            btn-light
                                            waves-effect waves-light delete
                                            w-md
                                        "
                                        type="submit"
                                        > <i class="fa fa-times-circle p-1"></i
                                        >Cancel</router-link>
                                        <a @click="addUser"
                                        class="
                                            btn
                                            btn-sm
                                            form-btn
                                            btn-primary
                                            text-white
                                            waves-effect waves-light
                                            w-md
                                            create-btn mr-1
                                        "
                                        type="submit"
                                        >Create<i class="mdi mdi-arrow-right ms-1 "></i
                                        ></a>
                                    </div>
                                </form>
                            </div>
                            
                        </div>
                    </div> 
                    <!-- end col -->
                </div>
            </div>
      </div>
    </div>
</div>
</template>

<script>
import axios from 'axios';
export default {
    name:'AddUser',
    data(){
        return{
            user:{
                name:'',
                username: null,
                email:'',
                password:'',
                phonenumber:'',
                role_id:'',
                department_id: null,
                company_id:'',
            },
            authuser:'',
            departments: null,
            isDepartmentOptions: false,
            backupDepartments: null,
            selectedDepartment: '',
            isUserroles: false,
            userRoles: null,
            backupUserroles: null,
            selectedUserrole:'',

        }
    },
    created(){
    this.$store.dispatch('getDepartments');
    let user = JSON.parse(sessionStorage.getItem(`user`));

    this.authuser = user

    this.getDepartments(user.company_id)

    this.getRoles()
    },
    mounted(){
    this.$store.dispatch('getDepartments');
    let user = JSON.parse(sessionStorage.getItem(`user`));

    this.authuser = user

    this.user.company_id = user.company_id

    this.getDepartments(user.company_id)

    this.getRoles()
    },
    methods:{
//************* INPUT/TYPE LISTENERS FUNCTIONS *************
    handleKeyboardEntry(event, primary, backup, name){
      let foundMatch = false;
      if(event.target.value != " " || event.target.value != null || event.target.value != ""){
          foundMatch = true
          this[primary] = this[backup]
          this[primary] = this[primary].filter(item => {
            if(item[name].toLowerCase().indexOf(event.target.value.toString().toLowerCase()) >= 0){
              return item
            }
          }).slice(0, 5)

          if(this[primary].length < 1) {
            foundMatch = false
            console.log(foundMatch)
          }
      }
    },
//************* END OF INPUT/TYPE LISTENERS FUNCTIONS *************

    hideAllOptions(){
        this.isDepartmentOptions = false
        this.isUserroles = false
    },
    selectDepartment(department){
      this.isDepartmentOptions = false
      this.user.department_id = department.id
      this.selectedDepartment = department.department
      this.user.department = department.department
    },
    selecteUserrole(role){
      this.isUserroles = false
      this.user.role_id = role.id
      this.selectedUserrole = role.role
    },
    showDepartmentOptions(){
      this.hideAllOptions()
      this.isDepartmentOptions = true
    },
    showUserrolesOptions(){
      this.hideAllOptions()
      this.isUserroles = true
    },

//************* FETCH FUNCTIONS *************
    async getDepartments(company) {
      console.log("inside the get departments functions")
      axios
        .get(`departments/${company}`)
        .then((response) => {
          this.departments = response.data;
          this.backupDepartments = response.data
          console.log(this.departments)
        });
    },
    async getRoles() {
      axios
        .get(`v1/roles`)
        .then((response) => {
          this.userRoles = response.data;
          this.backupUserroles = response.data
        });
    },
//************* END OF FETCH FUNCTIONS *************

    async addUser(){
        this.user.company_id=this.authuser.company_id;
        try{
            await axios.post('users', this.user).then((response)=>{
                this.$store.dispatch('createUser', response.data);
                this.$swal.fire({
                    title:'Done',
                    text:'User added successfully',
                    icon:'success',
                    timer:1500});
                this.$router.push({ name: 'Users' });
            })
        }catch{
            console.error();
        }

    },
}
}
</script>

<style scoped>
/** 
**new filters  styles 
**
*/
.input-filter-container {
  position: relative;
  margin-bottom: 15px;
}
.input-filter-container label {
  color:#183247cb !important;
  font-size: 12px;
  font-weight: 600 !important;
}
.input-area {
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 32px;
  padding-left: 2px;
  padding-top: 0px;
  padding-bottom: 0px;
}
.input-area.active {
  border: 2px solid #556ee6;
  z-index: 11;
}
.input-area input {
  width: 95%;
  border: none;
  outline: none;
  padding-left: 7px;
}
.input-area svg {
  width: 11px;
}
.input-area svg.active {
  animation: lookUp 300ms ease-in-out 0ms forwards;
}
.input-area svg.roll-back {
  animation: lookUp 300ms ease-in-out 0ms forwards reverse;
}
/* 0700338291 - Alosious */
.agent-options {
  animation: slideDownFilterOptions 250ms ease-in-out 0ms;
  position: absolute;
  top: 32px;
  width: 100%;
  min-height: 50px;
  max-height: 200px;
  border-radius: 6px;
  background: #fff;
  box-shadow: 2px 2px 10px rgba(0, 0, 0, 0.2);
  z-index: 10;
  padding: 5px 7px;
  overflow-y: scroll;
}
.agent-option-item {
  border-radius: 4px !important;
  width: 100% !important;
  margin: 8px 0px !important;
  padding: 5px;
}
.agent-option-item:hover {
  cursor: pointer;
  background: #f5f7f9;
}
@keyframes slideDownFilterOptions {
  0% {
    top: 20px;
  }
  100% {
    top: 32px;
  }
}
@keyframes lookUp {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(180deg);
  }
}
/** 
** End of new filters  styles 
**
*/
.content {
  margin-left: 80px;
}
.create-btn{
    float: right;
}
.delete {
  transition: 300ms ease-out;
 
}
.delete:hover {
  background: #f46a6a;
  color: white;
  cursor: pointer;
}
label{
    font-size:12px;
}
</style>
