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
                                                        <p class="text-muted fw-medium">Pending</p>
                                                        <h4 class="mb-0 text-muted metric-display" v-if="pendingtickets.length==0">0</h4>
                                                        <h4 class="mb-0 text-dark metric-display" v-else>{{pendingtickets.length}}</h4>
                                                    </div>

                                                    <div class="flex-shrink-0 align-self-center">
                                                        <div class="mini-stat-icon avatar-sm rounded-circle bg-pending">
                                                            <span class="avatar-title">
                                                                <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 32 32" class="nav-icon" focusable="false"><path d="M.267 12.874V10.23a3.824 3.824 0 013.818-3.831h23.831a3.825 3.825 0 013.818 3.831v2.644l-1.018.563c-1.076.595-1.736 1.665-1.736 2.83s.66 2.235 1.736 2.83l1.018.563v2.644a3.824 3.824 0 01-3.818 3.831H4.085a3.825 3.825 0 01-3.818-3.831V19.66l1.018-.563c1.076-.595 1.736-1.665 1.736-2.83s-.66-2.235-1.736-2.83l-1.018-.563zm4.72 3.393c0 1.948-1.107 3.648-2.753 4.558v1.478c0 1.026.829 1.857 1.851 1.857h23.831a1.855 1.855 0 001.851-1.857v-1.478c-1.646-.91-2.753-2.61-2.753-4.558s1.107-3.648 2.753-4.558v-1.478a1.854 1.854 0 00-1.851-1.857H4.085a1.855 1.855 0 00-1.851 1.857v1.478c1.646.91 2.753 2.61 2.753 4.558zm5.981-5.14h10.065a3.825 3.825 0 013.818 3.831v2.6a3.824 3.824 0 01-3.818 3.831H10.968a3.825 3.825 0 01-3.818-3.831v-2.6a3.824 3.824 0 013.818-3.831zm0 1.973a1.855 1.855 0 00-1.851 1.857v2.6c0 1.026.829 1.857 1.851 1.857h10.065a1.855 1.855 0 001.851-1.857v-2.6a1.854 1.854 0 00-1.851-1.857H10.968z"></path></svg>
                                                            </span>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                </div>
                                <!-- total tickets -->
                                <div class="card">
                                    <div class="card-body">
                                        <h4 class="card-title mb-4">Total Tickets</h4>
                                        <div class="row">
                                            <div class="col-sm-6 col-lg-8">
                                                <p class="text-muted">This month</p>
                                                <h3 v-if="totalTickets.length!==undefined" class="text-primary font-size-20">{{totalTickets.length}}<span class="font-size-15 ml-2 text-muted">tickets</span></h3>
                                                <p class="text-muted"><span class="text-success me-2"> 12% <i class="mdi mdi-arrow-up"></i> </span><br> From previous period</p>

                                                <div class="mt-4">
                                                    <router-link to="/AllTickets" href="javascript: void(0);" class="btn btn-primary waves-effect waves-light btn-sm">View More <i class="mdi mdi-arrow-right ms-1"></i></router-link>
                                                </div>
                                            </div>
                                            <div class="col-sm-6">
                                                <div class="mt-4 mt-sm-0">
                                                    <div id="radialBar-chart" class="apex-charts"></div>
                                                </div>
                                            </div>
                                        </div>
                                        <p class="text-muted mb-0">This is data from all departments</p>
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
                                                        <p class="text-muted fw-medium">Due Today</p>
                                                        <h4 class="mb-0 text-muted metric-display">0</h4>
                                                    </div>

                                                    <div class="flex-shrink-0 align-self-center">
                                                        <div class="mini-stat-icon avatar-sm rounded-circle bg-due">
                                                            <span class="avatar-title">
                                                                <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 32 32" class="nav-icon" focusable="false"><path d="M.267 12.874V10.23a3.824 3.824 0 013.818-3.831h23.831a3.825 3.825 0 013.818 3.831v2.644l-1.018.563c-1.076.595-1.736 1.665-1.736 2.83s.66 2.235 1.736 2.83l1.018.563v2.644a3.824 3.824 0 01-3.818 3.831H4.085a3.825 3.825 0 01-3.818-3.831V19.66l1.018-.563c1.076-.595 1.736-1.665 1.736-2.83s-.66-2.235-1.736-2.83l-1.018-.563zm4.72 3.393c0 1.948-1.107 3.648-2.753 4.558v1.478c0 1.026.829 1.857 1.851 1.857h23.831a1.855 1.855 0 001.851-1.857v-1.478c-1.646-.91-2.753-2.61-2.753-4.558s1.107-3.648 2.753-4.558v-1.478a1.854 1.854 0 00-1.851-1.857H4.085a1.855 1.855 0 00-1.851 1.857v1.478c1.646.91 2.753 2.61 2.753 4.558zm5.981-5.14h10.065a3.825 3.825 0 013.818 3.831v2.6a3.824 3.824 0 01-3.818 3.831H10.968a3.825 3.825 0 01-3.818-3.831v-2.6a3.824 3.824 0 013.818-3.831zm0 1.973a1.855 1.855 0 00-1.851 1.857v2.6c0 1.026.829 1.857 1.851 1.857h10.065a1.855 1.855 0 001.851-1.857v-2.6a1.854 1.854 0 00-1.851-1.857H10.968z"></path></svg>
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
                                                        <p class="text-muted fw-medium">Open</p>
                                                        <h4 class="mb-0 text-muted metric-display" v-if="opentickets.length==0 && opentickets.length!==undefined">0</h4>
                                                        <h4 class="mb-0 text-dark metric-display" v-else>{{opentickets.length}}</h4>
                                                    </div>

                                                    <div class="flex-shrink-0 align-self-center ">
                                                        <div class="avatar-sm rounded-circle bg-open mini-stat-icon">
                                                            <span class="avatar-title rounded-circle">
                                                                <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 32 32" class="nav-icon" focusable="false"><path d="M.267 12.874V10.23a3.824 3.824 0 013.818-3.831h23.831a3.825 3.825 0 013.818 3.831v2.644l-1.018.563c-1.076.595-1.736 1.665-1.736 2.83s.66 2.235 1.736 2.83l1.018.563v2.644a3.824 3.824 0 01-3.818 3.831H4.085a3.825 3.825 0 01-3.818-3.831V19.66l1.018-.563c1.076-.595 1.736-1.665 1.736-2.83s-.66-2.235-1.736-2.83l-1.018-.563zm4.72 3.393c0 1.948-1.107 3.648-2.753 4.558v1.478c0 1.026.829 1.857 1.851 1.857h23.831a1.855 1.855 0 001.851-1.857v-1.478c-1.646-.91-2.753-2.61-2.753-4.558s1.107-3.648 2.753-4.558v-1.478a1.854 1.854 0 00-1.851-1.857H4.085a1.855 1.855 0 00-1.851 1.857v1.478c1.646.91 2.753 2.61 2.753 4.558zm5.981-5.14h10.065a3.825 3.825 0 013.818 3.831v2.6a3.824 3.824 0 01-3.818 3.831H10.968a3.825 3.825 0 01-3.818-3.831v-2.6a3.824 3.824 0 013.818-3.831zm0 1.973a1.855 1.855 0 00-1.851 1.857v2.6c0 1.026.829 1.857 1.851 1.857h10.065a1.855 1.855 0 001.851-1.857v-2.6a1.854 1.854 0 00-1.851-1.857H10.968z"></path></svg>
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
                                                        <p class="text-muted fw-medium">Urgent</p>
                                                        <h4 class="mb-0 text-muted metric-display" v-if="urgenttickets.length==0 && urgenttickets.length!==undefined">0</h4>
                                                        <h4 class="mb-0 text-dark metric-display" v-else>{{urgenttickets.length}}</h4>
                                                    </div>

                                                    <div class="flex-shrink-0 align-self-center">
                                                        <div class="avatar-sm rounded-circle bg-urgent mini-stat-icon">
                                                            <span class="avatar-title rounded-circle bg-primary">
                                                                <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 32 32" class="nav-icon" focusable="false"><path d="M.267 12.874V10.23a3.824 3.824 0 013.818-3.831h23.831a3.825 3.825 0 013.818 3.831v2.644l-1.018.563c-1.076.595-1.736 1.665-1.736 2.83s.66 2.235 1.736 2.83l1.018.563v2.644a3.824 3.824 0 01-3.818 3.831H4.085a3.825 3.825 0 01-3.818-3.831V19.66l1.018-.563c1.076-.595 1.736-1.665 1.736-2.83s-.66-2.235-1.736-2.83l-1.018-.563zm4.72 3.393c0 1.948-1.107 3.648-2.753 4.558v1.478c0 1.026.829 1.857 1.851 1.857h23.831a1.855 1.855 0 001.851-1.857v-1.478c-1.646-.91-2.753-2.61-2.753-4.558s1.107-3.648 2.753-4.558v-1.478a1.854 1.854 0 00-1.851-1.857H4.085a1.855 1.855 0 00-1.851 1.857v1.478c1.646.91 2.753 2.61 2.753 4.558zm5.981-5.14h10.065a3.825 3.825 0 013.818 3.831v2.6a3.824 3.824 0 01-3.818 3.831H10.968a3.825 3.825 0 01-3.818-3.831v-2.6a3.824 3.824 0 013.818-3.831zm0 1.973a1.855 1.855 0 00-1.851 1.857v2.6c0 1.026.829 1.857 1.851 1.857h10.065a1.855 1.855 0 001.851-1.857v-2.6a1.854 1.854 0 00-1.851-1.857H10.968z"></path></svg>
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
                                    <div class="card col-md-12 tickets-trend">
                                        <div class="card-body">
                                            <div class="d-sm-flex flex-wrap">
                                                <h4 class="card-title mb-4">Ticket Trends</h4>
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
                                            <div style="height: 95%">
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
import TaskList from '../users/TaskList';
import TicketChart from '@/charts/StackedColumn.vue';
// import Tickets from '@/mixins/tickets';
// import axios from 'axios';
import { mapState, mapGetters} from 'vuex';


export default {
    name:'DashboardContent',
    components:{
        TaskList,
        TicketChart,
    },
    mounted(){
        let user = JSON.parse(sessionStorage.getItem('user'));
        this.$store.dispatch('fetchAllTickets', user.company_id);
    },
    created(){
        let user = JSON.parse(sessionStorage.getItem('user'));
        this.$store.dispatch('fetchAllTickets', user.company_id);
        //this.dueDate();
    },
     computed: {
        ...mapState({
        totalTickets: (state) => state.tickets,
        }),
        ...mapGetters({
            pendingtickets:'pendingTickets',
            opentickets:'openTickets',
            urgenttickets:'urgentTickets',
            user:'user'
        })
     },

}
</script>


<style scoped>
.tickets-trend {
    height: 700px;
}
.avatar-title svg {
    width: 20px;
}
.bg-pending .avatar-title{
    background: rgba(112, 136, 255, 0.699) !important;
}
.bg-pending svg {
    fill: #3553e6;
}
.bg-due .avatar-title{
    background: rgb(241, 180, 76, 0.699) !important;
}
.bg-due svg{
    fill: rgb(241, 163, 28);
}
.bg-urgent .avatar-title{
    background: rgba(255, 99, 71, 0.699) !important;
}
.bg-urgent svg {
    fill: rgb(255, 51, 15);
}
.bg-open .avatar-title{
    background: rgba(128, 128, 4, 0.699) !important;
}
.bg-open svg {
    fill: rgb(95, 95, 1);
}
.metric-display {
    font-size: 24px;
}
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
