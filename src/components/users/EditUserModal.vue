<template>
    <div class="modal fade"  role="dialog" aria-hidden="true">
        <div class="modal-dialog modal-dialog-centered" role="document">
            <div class="modal-content">
                <div class="modal-header">
                    <h5 class="modal-title" >Edit {{name}}'s Details </h5>
                    <button type="button" class="close" data-bs-dismiss="modal" aria-label="Close">
                    <span aria-hidden="true">&times;</span>
                    </button>
                </div>
                <div class="modal-body">
                    <div class="mb-3 row">
                        <label class="col-md-2 col-form-label">Edit Department</label>
                        <div class="col-md-10">
                            <select class="form-select" v-model="newdepartment">
                                <option v-for="department in departments" :key="department.id" :value="department.department">{{department.department}}</option>
                            </select>
                        </div>
                    </div>
                    <div class="mb-3 row">
                        <label class="col-md-2 col-form-label">Edit User Role</label>
                        <div class="col-md-10">
                            <select class="form-select" v-model="newrole">
                                <option value="Agent">Agent</option>
                                <option value="Supervisor">Supervisor</option>
                                <option value="Admin">Admin</option>

                            </select>
                        </div>
                    </div>
                </div>
                <div class="modal-footer">
                    <button type='button' class="btn btn-secondary btn-sm" data-bs-dismiss="modal">Cancel</button>
                    <button @click="editUser" type='submit' class="btn btn-primary btn-sm" data-bs-dismiss="modal">Save changes</button>
                </div>
                
            </div>
        </div>

    </div>
</template>
<script>
import { mapState } from 'vuex';
import axios from 'axios';
export default {
    name:'EditUserModal',
    props:{
            role: Object,
            department: Object,
            name: String,
            userid: Number,
            },
    data(){
        return{
            newrole: this.role,
            newdepartment: this.department
        }
    },
    created(){
        this.$store.dispatch('getDepartments');
        console.log(this.role)
    },
    methods:{
        async editUser(){
                try{
                    await axios.post('edituser', {user_id:this.userid, role: this.newrole, department:this.newdepartment}).
                    then((response)=>{
                        this.$swal.fire({
                        title:'Done',
                        text:'Details have been Updated.',
                        icon:'success',
                        timer:1000
                        })
                        // console.log(response.data);
                         this.$store.dispatch('editUser', response.data);

                    })
                }catch{
                    console.error
                }
        }
    },
    computed:{
        ...mapState({
            departments:(state)=>state.departments,
        })
    }
}
</script>
