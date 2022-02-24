<template>
<div class="content">
    <div id="main-content">
      <div class="page-content">
            <div class="container-fluid">
                <div class="row">
                    <nav aria-label="breadcrumb">
                        <ol class="breadcrumb ">
                            <li class="breadcrumb-item"><a href="#">View Users</a></li>
                            <li class="breadcrumb-item active text-primary" aria-current="page">Users</li>
                        </ol>
                        <div>
                        <div class="col-md-6">
                        <input class="mt-1 col-md-6 form-control form-control-sm" id="search-input" type="search" placeholder="Search Users" aria-label="Search" v-model="searchterm">
                        </div>
                        <div class="bg-danger " style="margin-top:-25px;">
                        <router-link to="/addnewuser"><a class="btn btn-sm float-right btn-primary text-white "><i class="fa fa-plus mr-1"></i>Add User</a></router-link>
                        </div>
                        </div>
                    </nav>
                </div>
                <div class="table-responsive table-hover table-condensed table-striped mt-4">
                    <table class="table mb-0">
                        <thead>
                            <tr>
                                <th># User ID</th>
                                <th>Name<i class="fas fa-sort-alpha-down ml-1 mt-1"></i></th>
                                <th>Email Address<i class="fas fa-sort-alpha-down ml-1 mt-1"></i></th>
                                <th>Phone Number</th>
                                <th>Department <i class="fas fa-sort-alpha-down ml-1 mt-1"></i></th>
                                <th>Role <i class="fas fa-sort-alpha-down ml-1 mt-1"></i></th>
                                <th>Action</th>
                            </tr>
                        </thead>
                        <tr v-if="users.length===0" class="text-center mt-5">No users have been added!</tr>
                        <tr v-if="filteredUsers.length===0 && users.length>0" class="text-center mt-5">No user details match search term !</tr>
                        <tbody>
                            <tr v-for="user in pageOfItems" :key="user.id" :id="user.id">
                                <th scope="row">{{user.id}}</th>
                                <td>{{user.name}}</td>
                                <td>{{user.email}}</td>
                                <td>{{user.phonenumber}}</td>
                                <td>{{user.department.id != null ? user.department.department : 'No department yet'}}</td>
                                <td>{{user.role.role}}</td>
                                <td>
                                    <i  class="fa fa-edit text-primary mr-3" data-bs-toggle="modal" :data-bs-target="'#editusermodal'+ user.id" ></i>
                                    <i @click="deleteUser(user.id)" class="fa fa-trash-alt text-muted" id="delete-btn"></i>

                                </td>
                            </tr>
                        </tbody>
                    </table>
                        <edit-user :id="'editusermodal'+ user.id" v-for="user in filteredUsers" :key="user.id"
                        :name="user.name"
                        :department="user.department"
                        :role="user.role"
                        :userid="user.id">
                        </edit-user>
                </div>
                <div class="d-flex justify-content-end">
                <div style=" bottom:0; position:fixed;" v-if="users.length!==0" >
                    <jw-pagination :pageSize=10 :items="filteredUsers" @changePage="onChangePage"></jw-pagination>
                </div>
                </div>
            </div>
      </div>
    </div>
</div>
</template>

<script>

import { mapState } from 'vuex';
import axios from 'axios';
import EditUser from './EditUserModal';

export default {
    name:'UserList',
    components:{
        EditUser,
    },
    data(){
        return{
            searchterm:'',
            pageOfItems: [],
            user:''
        }
    },
    created(){
    this.$store.dispatch('getDepartments');
    this.user= JSON.parse(sessionStorage.getItem(`user`));
    this.$store.dispatch('fetchAllUsers', this.user.company_id);
    },

    computed:{
        ...mapState({
           departments:(state)=> state.departments,
           users:(state)=> state.users.users,
        }),
        filteredUsers(){
            let userlist=this.users;
            if (this.searchterm !== " " && this.searchterm) {
            userlist = userlist.filter(
            item =>
                item.role.role
                .toUpperCase()
                .includes(this.searchterm.toUpperCase()) ||
                item.email.toUpperCase().includes(this.searchterm.toUpperCase()) ||
                item.name
                .toUpperCase()
                .includes(this.searchterm.toUpperCase()) ||
                item.email.toUpperCase().includes(this.searchterm.toUpperCase())

            );
      }
      return userlist;
        }
    },
    methods:{
            onChangePage(pageOfItems) {
            console.log(pageOfItems)
            // update page of items
            this.pageOfItems = pageOfItems;
        },
        deleteUser(id){
             this.$swal.fire({
                title: 'Are you sure?',
                text: "You won't be able to revert this!",
                icon: 'warning',
                showCancelButton: true,
                confirmButtonColor: 'bg-primary',
                cancelButtonColor: '#d33',
                confirmButtonText: 'Yes, delete user!',
            }).then((result) => {
            if (result.isConfirmed) {
                axios.post(
                'deleteuser',
                {user_id: id}
                
            ).then(()=>{
                    this.$store.dispatch('deleteUser', id);
            })
                this.$swal.fire({
                title:'Deleted!',
                text:'User has been deleted.',
                icon:'success',
                timer:1000
                })
            }else if (result.dismiss === this.$swal.DismissReason.cancel) {
            this.$swal.fire({
                 title:'Cancelled',
                text:'User not deleted',
                icon:'error',
                timer:1000
            }
           
            )
        }
            })
        }
    }
}
</script>

<style scoped>
.content {
  margin-left: 80px;
}
#search-input{
    margin-left:-15px;
}
#delete-btn:hover{
    color:#f46a6a;
    cursor: pointer;
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
tr{
    font-size:14px;
}
</style>
