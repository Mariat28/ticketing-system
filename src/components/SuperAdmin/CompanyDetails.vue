<template>
    <div id="main-content">
        <div class="page-content">
            <div class="container content">
                <div class="row">
                    <div class="col-xl-3">
                        <div class="card shadow card-employees mini-stats-wid">
                            <div class="card-body">
                                <div class="d-flex">
                                    <div class="flex-grow-1">
                                        <p class="text-dark fw-medium font-weight-bold">Users</p>
                                        <h4 class="mb-0 text-muted" v-if="company.employees.length===0">0</h4>
                                        <h4 class="mb-0 text-success" v-else>{{company.employees.length}}</h4>
                                    </div>

                                    <div class="flex-shrink-0 align-self-center">
                                        <div class="mini-stat-icon  avatar-sm rounded-circle">
                                            <span class="avatar-title bg-success ">
                                                <i class="fa fa-users font-size-24 "></i>
                                            </span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="col-xl-3">
                        <div class="card shadow card-tickets mini-stats-wid">
                            <div class="card-body">
                                <div class="d-flex">
                                    <div class="flex-grow-1">
                                        <p class="text-dark fw-medium font-weight-bold">Status</p>
                                        <h4 class="mb-0 text-muted">{{company.status.status}}</h4>
                                        <!-- <h4 class="mb-0 text-dark">{{free.length}}</h4> -->
                                    </div>

                                    <div class="flex-shrink-0 align-self-center">
                                        <div class="mini-stat-icon avatar-sm rounded-circle bg-primary">
                                            <span class="avatar-title bg-warning">
                                                <i class="fa fa-power-off font-size-18"></i>
                                            </span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="col-xl-3">
                        <div class="card shadow card-plan mini-stats-wid">
                            <div class="card-body">
                                <div class="d-flex">
                                    <div class="flex-grow-1">
                                        <p class="text-dark fw-medium font-weight-bold">Plan</p>
                                        <h4 class="mb-0 text-muted">{{company.subscription.subscription}}</h4>
                                        <!-- <h4 class="mb-0 text-dark">{{free.length}}</h4> -->
                                    </div>

                                    <div class="flex-shrink-0 align-self-center">
                                        <div class="mini-stat-icon avatar-sm rounded-circle">
                                            <span class="avatar-title bg-primary">
                                                <i class="fa fa-tasks font-size-24"></i>
                                            </span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="col-xl-3">
                        <div class="card card-nextbilling mini-stats-wid">
                            <div class="card-body">
                                <div class="d-flex">
                                    <div class="flex-grow-1">
                                        <p class="text-dark fw-medium font-weight-bold">Next Billing Date</p>
                                        <h4 class="mb-0 text-muted">13/04/20</h4>
                                        <!-- <h4 class="mb-0 text-dark">{{free.length}}</h4> -->
                                    </div>

                                    <div class="flex-shrink-0 align-self-center">
                                        <div class="mini-stat-icon avatar-sm rounded-circle bg-primary">
                                            <span class="avatar-title bg-danger">
                                                <i class="fa fa-money-check-alt font-size-24"></i>
                                            </span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <h5>Transaction History</h5>
                <div class="mt-3">
                <div class="card shadow">
                    <div class="card-body">
                        <table class="table table-striped mt-1 table-hover mb-0">
                        <thead>
                            <tr>
                                <th>Transaction ID</th>
                                <th>Account name</th>
                                <th>Type</th>
                                <th>Amount</th>
                                <th>Duration</th>
                                <th>Status</th>
                                <th>Date</th>
                            </tr>
                        </thead>
                        <tbody>
                            
                        </tbody>
                        </table>
                    </div> 
                </div>
                </div>
            </div>
        </div>
    </div>


</template>
<script>
import axios from 'axios';
export default {
    name:'CompanyDetails',
    data(){
        return{
            company:{}
        }
    },
    created(){
        this.fetchCompanyDetails();
    },
    methods:{
        async fetchCompanyDetails(){
            const company_id= this.$route.params.companyId;
            await axios.post('v1/manager/companies/details', {id:company_id}).then((response)=>{
                this.company=response.data[0]
            })

        }
    }
}
</script>
<style scoped>
.content{
    margin-left: 70px;
}
.card-employees{
    border-left: 2px solid green;

}
.card-tickets{
    border-left: 2px solid goldenrod;

}
.card-plan{
    border-left: 2px solid blue;

}
.card-nextbilling{
    border-left: 2px solid red;
}
.users-icon{
    background-color: aquamarine !important;
}

</style>


