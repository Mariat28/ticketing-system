<template>
    <div id="main-content">
        <div class="page-content">
            <div class="container-fluid content">
                <!-- first row start  -->
                <div class="row">
                    <div class="col-xl-4">
                        <div class="card mini-stats-wid">
                                    <div class="card-body">
                                        <div class="d-flex">
                                            <div class="flex-grow-1">
                                                <p class="text-muted fw-medium">Free</p>
                                                <h4 class="mb-0 text-muted" v-if="free.length==0">0</h4>
                                                <h4 class="mb-0 text-dark" v-else>{{free.length}}</h4>
                                            </div>

                                            <div class="flex-shrink-0 align-self-center">
                                                <div class="mini-stat-icon avatar-sm rounded-circle bg-primary">
                                                    <span class="avatar-title">
                                                        <i class="fa fa-hand-holding-usd font-size-24"></i>
                                                    </span>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                        </div>
                        <!-- total companies -->
                        <div class="card">
                            <div class="card-body">
                                <h4 class="card-title mb-4">Total Accounts</h4>
                                <div class="row">
                                    <div class="col-sm-6">
                                        <p class="text-muted">This month</p>
                                        <h3 v-if="companies.length!==undefined" class="text-primary font-size-20">{{companies.length}}<span class="font-size-15 ml-2 text-muted">companies</span></h3>
                                        <p class="text-muted"><span class="text-success me-2"> 12% <i class="mdi mdi-arrow-up"></i> </span><br> From previous period</p>

                                        <div class="mt-4">
                                            <router-link to="/companies" href="javascript: void(0);" class="btn btn-primary waves-effect waves-light btn-sm">View More <i class="mdi mdi-arrow-right ms-1"></i></router-link>
                                        </div>
                                    </div>
                                    <div class="col-sm-6">
                                        <div class="mt-4 mt-sm-0">
                                            <div id="radialBar-chart" class="apex-charts">
                                                <RadialBar
                                                ></RadialBar>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <p class="text-muted mb-0">This is data for all accounts</p>
                            </div>
                        </div>
                        <!-- task list  -->
                        <task-list/>
                        
                    </div>
                    <div class="col-xl-8">
                        <div class="row">
                            <div class="col-md-4">
                                <div class="card mini-stats-wid">
                                    <div class="card-body">
                                        <div class="d-flex">
                                            <div class="flex-grow-1">
                                                <p class="text-muted fw-medium">Growth</p>
                                                <h4 class="mb-0 text-muted" v-if="growth.length==0">0</h4>
                                                <h4 class="mb-0 text-dark" v-else>{{growth.length}}</h4>
                                            </div>

                                            <div class="flex-shrink-0 align-self-center">
                                                <div class="mini-stat-icon avatar-sm rounded-circle bg-primary">
                                                    <span class="avatar-title">
                                                        <i class="fa fa-chart-line font-size-24"></i>
                                                    </span>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div class="col-md-4">
                                <div class="card mini-stats-wid">
                                    <div class="card-body">
                                        <div class="d-flex">
                                            <div class="flex-grow-1">
                                                <p class="text-muted fw-medium">Pro</p>
                                                <h4 class="mb-0 text-muted" v-if="pro.length==0">0</h4>
                                                <h4 class="mb-0 text-dark" v-else>{{pro.length}}</h4>
                                            </div>

                                            <div class="flex-shrink-0 align-self-center ">
                                                <div class="avatar-sm rounded-circle bg-primary mini-stat-icon">
                                                    <span class="avatar-title rounded-circle bg-primary">
                                                        <i class="fa fa-funnel-dollar font-size-24"></i>
                                                    </span>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div class="col-md-4">
                                <div class="card mini-stats-wid">
                                    <div class="card-body">
                                        <div class="d-flex">
                                            <div class="flex-grow-1">
                                                <p class="text-muted fw-medium">Enterprise</p>
                                                <h4 class="mb-0 text-muted" v-if="enterprise.length==0">0</h4>
                                                <h4 class="mb-0 text-dark" v-else>{{enterprise.length}}</h4>
                                            </div>

                                            <div class="flex-shrink-0 align-self-center">
                                                <div class="avatar-sm rounded-circle bg-primary mini-stat-icon">
                                                    <span class="avatar-title rounded-circle bg-primary">
                                                        <i class="fa fa-gem font-size-24"></i>
                                                    </span>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <!-- end row -->
                        <div class="row">
                            <div class="card col-md-12">
                                <div class="card-body">
                                    <div class="d-sm-flex flex-wrap">
                                        <h4 class="card-title mb-4">Account Statistics</h4>
                                        <!-- <div class="ms-auto dropdown">
                                            <i class="fa fa-fw fa-bars"  id="toggler" data-toggle="dropdown" ></i>
                                            <div class="dropdown-menu dropdown-menu-right ">
                                                <a class="dropdown-item">Download SVG</a>
                                                <a class="dropdown-item">Download PNG</a>
                                                <a class="dropdown-item">Download CSV</a>


                                            </div>
                                        </div> -->
                                    
                                    </div>
                                    <!-- tickets list -->
                                    <div>
                                        <ticket-chart/>
                                    </div>
                                    
                                </div>
                            </div>
                            <!-- pie chart  -->
                            
                            
                        </div>

                    </div>
                </div>
                <!-- end first row -->
                
            </div>
                    <!-- container-fluid -->
        </div>

    </div>

</template>
<script>
import TaskList from '@/components/users/TaskList.vue';
import TicketChart from '@/charts/AdminTrends.vue';
import RadialBar from '@/charts/AdminRadialBar.vue';
import { mapState, mapGetters} from 'vuex';


export default {
    name:'CompanyList',
    components:{
        TaskList,
        TicketChart,
        RadialBar,
    },
    data(){
        return{

        }
    },

    created(){
        this.$store.dispatch('fetchCompanies')
    },
    methods:{
    },
     computed: {
        ...mapState({
        companies: (state) => state.companies.companies,
        }),
        ...mapGetters({
            free:'freePlan',
            growth:'growthPlan',
            pro:'proPlan',
            enterprise:'enterprisePlan'
        })
     },

}
</script>


<style scoped>
.content{
    max-height: 100%;
}
.metric-row{
    position: fixed;
    width: inherit;
}

hr {
  height: 0.7px;
  margin-top: 0px;
}
.notifications{
    overflow-y: scroll;
    overflow-x: hidden;
}
.todo-list{
    max-width:100%;
}

.scroll{
    overflow-y: scroll;
}
</style>
