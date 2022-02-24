<template>
  <div >
    <header id="page-topbar" style="z-index:100">
    <div class="navbar-header">
        <div class="d-flex">
            <!-- LOGO -->
            <div class="navbar-brand-box">

                <router-link to="/home">
                <a  class="logo logo-dark">
                    <span class="logo-sm">
                        <img src="@/assets/images/logo.svg" alt="" height="22">
                    </span>
                    <span class="logo-lg">
                        <img src="@/assets/images/logo-dark.png" alt="" height="17">
                    </span>
                </a></router-link>
                <router-link to="/home">
                <a  class="logo logo-light">
                    <span class="logo-sm">
                        <img src="@/assets/images/logo-light.svg" alt="" height="22">
                    </span>
                    <span class="logo-lg">
                        <img src="@/assets/images/logo-light.png" alt="" height="19">
                    </span>
                </a>
                </router-link>
            </div>

            <!-- <button type="button" class="btn btn-sm px-3 font-size-16 header-item waves-effect" id="vertical-menu-btn">
                <svg @click="toggleSidebar" id="toggler" xmlns="http://www.w3.org/2000/svg" width="128" height="128" viewBox="0 0 128 128" class="app-icon app-icon--dark cursor-pointer"><path d="M70.4 87.9H30.3c-4 0-7.3 3.3-7.3 7.3s3.3 7.3 7.3 7.3h40.1c4 0 7.3-3.3 7.3-7.3-.1-4-3.3-7.3-7.3-7.3zm27.8-30.8h-68c-4 0-7.3 3.3-7.3 7.3s3.3 7.3 7.3 7.3h68c4 0 7.3-3.3 7.3-7.3s-3.3-7.3-7.3-7.3zM30.3 40.6h68c4 0 7.3-3.3 7.3-7.3s-3.3-7.3-7.3-7.3h-68c-4 0-7.3 3.3-7.3 7.3 0 4.1 3.3 7.3 7.3 7.3z"></path></svg>
                <i class="fa fa-fw fa-bars" @click="toggleSidebar" id="toggler"></i>
            </button> -->
            <!-- App Search-->
            <!-- <form class="app-search d-none d-lg-block">
                <div class="position-relative">
                    <input type="text" class="form-control" placeholder="Search...">
                    <span class="bx bx-search-alt"></span>
                </div>
            </form> -->
            <div class="position-relative d-flex align-items-center">
                <h5 v-if="isHome" class="m-3 text-primary">Dashboard</h5>

            </div>

            <div class="dropdown dropdown-menu-right d-none d-lg-block ms-2" v-if="!isHome">
                <button type="button" class="btn header-item waves-effect "  data-bs-toggle="dropdown" aria-haspopup="false" aria-expanded="false">
                    <span key="t-megamenu" class="font-weight-bold">{{ currentTicketCategory }}</span>
                    <i class="mdi mdi-chevron-down"></i> 
                </button>
                <div class="dropdown-menu" aria-labelledby="tickets-menu">
                <router-link to="/NewTickets">
                    <a class="dropdown-item " data-value="New Tickets" @click="fetchTickets('New Tickets')">New Tickets</a>
                </router-link>
                <router-link to="/AllTickets">
                    <a class="dropdown-item" @click="fetchTickets('All Tickets')">All Tickets</a>
                </router-link>
                <router-link to="/OpenTickets">
                    <a class="dropdown-item" data-value="Open Tickets" @click="fetchTickets('Open Tickets')">Open Tickets</a>
                </router-link>
                <router-link to="/PendingTickets">
                    <a class="dropdown-item" data-value="Pending Tickets" @click="fetchTickets('Pending Tickets')">Pending Tickets</a>
                </router-link>
                <router-link to="/ClosedTickets">
                    <a class="dropdown-item" data-value="Closed Tickets" @click="fetchTickets('Closed Tickets')">Closed Tickets</a>
                </router-link>
                <router-link to="/Ticketsassingedtome">
                    <a class="dropdown-item" data-value="Tickets assigned to me" @click="fetchTickets('Tickets assigned to me')">Tickets assigned to me</a>
                </router-link>
                </div>
            </div>
        </div>

        <div class="d-flex" style="align-items:center;">

            <!-- <div class="dropdown d-inline-block d-lg-none ms-2">
                <button type="button" class="btn header-item noti-icon waves-effect" id="page-header-search-dropdown"
                data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                    <i class="mdi mdi-magnify"></i>
                </button>
                <div class="dropdown-menu dropdown-menu-lg dropdown-menu-end p-0"
                    aria-labelledby="page-header-search-dropdown">
        
                    <form class="p-3">
                        <div class="form-group m-0">
                            <div class="input-group">
                                <input type="text" class="form-control" placeholder="Search ..." aria-label="Recipient's username">
                                <div class="input-group-append">
                                    <button class="btn btn-primary" type="submit"><i class="mdi mdi-magnify"></i></button>
                                </div>
                            </div>
                        </div>
                    </form>
                </div>
            </div> -->

            <div class="dropdown dropdown-menu-right d-none d-lg-block ms-1" id="add-new">
                <a role="button" class="btn header-item dropdown-toggle noti-icon waves-effect"
                data-bs-toggle="dropdown" aria-haspopup="true" aria-expanded="false" style="line-height:50px">
                 Add New
                </a>
                    <div class="dropdown-menu " aria-labelledby="add-new">
                <router-link to="/addnewticket" v-if="user.role_id !== 1" class="dropdown-item"><i class="fa fa-ticket-alt text-primary mr-2"></i>Ticket
                </router-link>
                <router-link to="/addnewcontact" v-if="user.role_id !== 1" class="dropdown-item"><i class="fa fa-address-book text-primary mr-2"></i>Contact
                </router-link>
               <router-link to="/addnewuser"  v-if="user.role_id == 2" class="dropdown-item">
                <i class="fa fa-user-plus text-primary mr-2"></i> User
               </router-link>
               <a v-if="user.role_id == 1" class="dropdown-item" data-bs-toggle="modal"
                  data-bs-target="#addCompanyModal">
                <i class="fa fa-building text-primary mr-2"></i>Company
               </a>
               <router-link to="/addnewuser"  v-if="user.role_id == 1" class="dropdown-item">
                <i class="fa fa-user-plus text-primary mr-2"></i> Admin
               </router-link>
                    </div>
                
            </div>

            <div class="search-container" id="search" v-if="user.role_id !== 1" >
                <div role="button" class="search-button" style="line-height:50px">
                 <i class="fa fa-search"></i>
                 <span class="search-label">Search</span>
                </div>
                <div class="search-dropdown">
                    
                <div class="search-contents d-none">
                    <div class="search-area active">
                        <i class="fa fa-search"></i>
                        <input class="search-input" type="text" placeholder="Search" v-model="searchQuery">
                    </div>
                    <div class="search-option-list">
                        <div class="search-option" @click="chooseSearchScope('all')" :class="{'active': searchScope == 'all'}">All</div>
                        <div class="search-option" @click="chooseSearchScope('tickets')" :class="{'active': searchScope == 'tickets'}">Tickets</div>
                        <div class="search-option" @click="chooseSearchScope('agents')" :class="{'active': searchScope == 'agents'}">Agents</div>
                        <div class="search-option" @click="chooseSearchScope('contacts')" :class="{'active': searchScope == 'contacts'}">Contacts</div>
                    </div>
                    <div class="search-results" v-if="ticketsResultQuery.length != 0">
                        <div class="result-header">
                            <span>Tickets</span>
                            <span>View all({{ticketsResultQuery.length}})</span>
                        </div>
                        <div class="result" v-for="(ticket, index) in ticketsResultQuery.slice(0,4)" :key="index">
                            <router-link :to="{
                                name: 'Ticket Details',
                                params: { ticketId: ticket.id, nextTicketId: 0 },
                                }"
                            >
                                <p class="ticket-result-subject">{{ticket.subject}}</p> <span class="ticket-id"> #{{ticket.id}}</span>
                            </router-link>
                        </div>
                    </div>
                    
                    <div class="search-results" v-if="agentsResultQuery.length != 0">
                        <div class="result-header">
                            <span>Agents</span>
                            <span>View all({{agentsResultQuery.length}})</span>
                        </div>
                        <div class="result" v-for="(agent, index) in agentsResultQuery.slice(0,4)" :key="index">
                            <router-link to="">
                                <p class="ticket-result-subject">{{agent.name}}</p>
                            </router-link>
                        </div>
                    </div>

                    <div class="search-results" v-if="contactsResultQuery.length != 0">
                        <div class="result-header">
                            <span>Contacts</span>
                            <span>View all({{contactsResultQuery.length}})</span>
                        </div>
                        <div class="result" v-for="(contact, index) in contactsResultQuery.slice(0,4)" :key="index">
                            <router-link to="">
                                <p class="ticket-result-subject">{{contact.name}}</p>
                            </router-link>
                        </div>
                    </div>
                </div>
                </div>
                
            </div>

            <!-- <div class="dropdown d-none d-lg-inline-block ms-1">
                <button type="button" class="btn header-item noti-icon waves-effect" data-toggle="fullscreen">
                    <i class="bx bx-fullscreen"></i>
                </button>
            </div> -->
        <!-- notifications  -->
            <div class="dropdown d-inline-block">
                <button type="button" class="btn header-item noti-icon waves-effect" id="page-header-notifications-dropdown"
                data-bs-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                    <i class="bx bx-bell bx-tada"></i>
                    <span class="badge bg-danger rounded-pill">{{notifications.length}}</span>
                </button>
                <div class="dropdown-menu dropdown-menu-lg dropdown-menu-end p-0"
                    aria-labelledby="page-header-notifications-dropdown">
                    <div class="p-3">
                        <div class="row align-items-center">
                            <div class="col" v-if="notifications.length!==0">
                                <h6 class="m-0" key="t-notifications"> Notifications </h6>
                            </div>
                            <div class="col" v-if="notifications.length===0">
                                <h6 class="m-0" key="t-notifications"> No Notifications yet! </h6>
                            </div>
                            <!-- <div class="col-auto">
                                <a href="#!" class="small text-primary" key="t-view-all"> View All</a>
                            </div> -->
                        </div>
                    </div>
                    <div data-simplebar style="max-height: 230px;"  v-for="notification in notifications" :key="notification.id">
                        <a href="javascript:void(0)" @click="openTicketDetails(notification)" class="text-reset notification-item">
                            <div class="d-flex p-1">
                                <div class="avatar-xs me-3">
                                    <span class="avatar-title rounded-circle bg-light text-white font-size-16">
                                        <!-- {{notification.contactname[0]}} -->
                                        <i
                                    v-if="notification.response_type == 'note'"
                                    class="fa fa-sticky-note text-warning"
                                    style="font-size: 13px">
                                    </i>
                                    <i
                                       v-if="notification.response_type == 'reply'"
                                        class="fa fa-envelope text-primary"
                                        style="font-size: 13px">
                                    </i>
                                    </span>
                                    
                                </div>
                                <div class="flex-grow-1">
                                    <h6 class="mb-1" key="t-your-order">New {{notification.response_type}} arrived!</h6>
                                    <div class="font-size-12 text-muted">
                                        <p><span class="text-primary">{{notification.user.name}}</span> has sent a <span class="text-primary">{{notification.response_type}}</span> to ticket <span class="text-primary">(#{{notification.ticket_id}})</span> </p>
                                        <!-- <p class="mb-1" key="t-grammer">If several languages coalesce the grammar</p> -->
                                        <!-- <p class="mb-0"><i class="mdi mdi-clock-outline"></i> <span key="t-min-ago">3 min ago</span></p> -->
                                    </div>
                                </div>
                            </div>
                        </a>
                    </div>
                    <!-- view more link -->
                    <!-- <div class="p-2 border-top d-grid">
                        <a class="btn btn-sm btn-link font-size-14 text-center text-primary" href="javascript:void(0)">
                            <i class="mdi mdi-arrow-right-circle me-1"></i> <span key="t-view-more">View More..</span> 
                        </a>
                    </div> -->
                </div>
            </div>
        <!-- profile -->
            <div class="dropdown d-inline-block">
                <button type="button" class="btn header-item waves-effect" id="page-header-user-dropdown"
                data-bs-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                    <!-- <img class="rounded-circle header-profile-user" src="assets/images/users/avatar-1.jpg"
                        alt="Header Avatar"> -->
                    <span v-if="user" class="d-none d-xl-inline-block ms-1" key="t-henry">{{user.name}}</span>
                    <i class="mdi mdi-chevron-down d-none d-xl-inline-block"></i>
                </button>
                <div class="dropdown-menu dropdown-menu-end">
                    <!-- item-->
                    <a class="dropdown-item" href="#"><i class="bx bx-user font-size-16 align-middle me-1"></i> <span key="t-profile">Profile</span></a>
                    <!-- <a class="dropdown-item" href="#"><i class="bx bx-wallet font-size-16 align-middle me-1"></i> <span key="t-my-wallet">My Wallet</span></a> -->
                    <a class="dropdown-item d-block" href="#"><span class="badge bg-success float-end">11</span><i class="bx bx-wrench font-size-16 align-middle me-1"></i> <span key="t-settings">Settings</span></a>
                    <a class="dropdown-item" href="#"><i class="bx bx-lock-open font-size-16 align-middle me-1"></i> <span key="t-lock-screen">Lock screen</span></a>
                    <div class="dropdown-divider"></div>
                    <a class="dropdown-item text-danger" href="javascript:void(0)" @click="logout"><i class="bx bx-power-off font-size-16 align-middle me-1 text-danger"></i> <span key="t-logout">Logout</span></a>
                </div>
            </div>

            <div class="dropdown d-inline-block">
                <button type="button" class="btn header-item noti-icon right-bar-toggle waves-effect">
                    <i class="bx bx-cog bx-spin"></i>
                </button>
            </div>

        </div>
    </div>
</header> 
            <AddCompany></AddCompany>

  </div>  
</template>
<script>
import AddCompany from "@/components/SuperAdmin/AddCompanyModal.vue";
import Emitter from 'tiny-emitter'
import axios from 'axios';
import store from '../../store';

export default {
    name:'TopBar',
    components:{
        AddCompany,
    },
    data(){
        return {
            currentTicketCategory: '',
            emitter: new Emitter(),
            notifications:[],
            ticketid:"", 
            user:'',
            isSearch: false,
            searchQuery: null,
            searchScope: "all",
        }
    },
    watch:{
        currentTicketCategory:function(){
        this.currentTicketCategory
        },
        $route:function(){
            if(this.$route.path=="/home"){
                document.getElementById('dashboard-div').classList.remove('d-none');
            }
        }
    },
    created() {
        this.currentTicketCategory = `New Tickets`
        this.user= JSON.parse(sessionStorage.getItem(`user`));
        this.notificationgroup();
    },
    mounted() {
        console.log("agents")
        console.log(this.searchAgents)
        this.updateDropDown()
        document.querySelector(".search-area input").addEventListener('focusin', function(){
            document.querySelector(".search-area").classList.add("active")
        })
        document.querySelector(".search-area input").addEventListener('focusout', function(){
            document.querySelector(".search-area").classList.remove("active")
        })
        this.emitter.on('updateTheDropDowns', function(){
        this.currentTicketCategory = "New Tickets"
        })
    },
    methods:{
//************* INPUT/TYPE LISTENERS FUNCTIONS *************
    handleKeyboardEntry(event){
      if(event.target.value != " " || event.target.value != null || event.target.value != ""){
        //   foundMatch = true
          this["searchTickets"] = this["backupSearchTickets"]
          this["searchTickets"] = this["searchTickets"].filter(ticket => {
            if(ticket["subject"].toLowerCase().indexOf(event.target.value.toString().toLowerCase()) >= 0){
              return ticket
            }
          })

          if(this["searchTickets"].length < 1) {
            // foundMatch = false
            // console.log(foundMatch)
          }
      }
    },
//************* END OF INPUT/TYPE LISTENERS FUNCTIONS *************
        logout(){
            this.$store.dispatch('logOutUser')
            this.$router.push('/');
        },
        toggleSidebar(){
            let toggler = document.getElementById("toggler");
            toggler.classList.add("sidebar-enable");  
            toggler.classList.add("vertical-collpsed"); 

        },
        fetchTickets(category){
            this.currentTicketCategory = category
        },
        updateDropDown(){
            if(this.$route.path == '/home' || this.$route.path == '/NewTickets'){
                this.currentTicketCategory = `New Tickets`
            }
            else{
                this.currentTicketCategory = `${this.$route.name}`
            }
        },
        async notificationgroup(){
        await axios .get('notifications',{params:{company_id:this.user.company_id, agent_id:this.user.id}})
        .then(response => {
         this.notifications=response.data
        });

     },

    async openTicketDetails(notification){
        await axios.post('deletenotification',{notificationId:notification.id}).then((response)=>{
        this.notifications.filter((notification) => notification.id !== response.data.id);
        const indexOfArrayItem = this.notifications.findIndex((i) => i.id === notification.id);
        this.notifications.splice(indexOfArrayItem, 1);
        });
        this.$router.push(`/ticketdetails/${notification.ticket_id}`);
    },
    closeAllPopups(event){
      let classes = event.target.classList.value
      
      if(classes.toString().toLowerCase().indexOf("search-contents") < 0){
        this.isSearch = false
      }
    },
    chooseSearchScope(scope){
        this.searchScope = scope
    }
    },

    computed:{
        isHome(){
            return this.$route.name === 'Home';
        },
        isAdmin(){
            return this.role === 'Admin';
        },
        tickets: {
            get: function(){
                return store.state.tickets
            }
        },
        agents: {
            get: function(){
                return store.state.agents
            }
        },
        contacts: {
            get: function(){
                return store.state.contacts
            }
        },
        ticketsResultQuery() {
            if(this.searchScope == "all" || this.searchScope == "tickets"){
                if(this.searchQuery){
                let newTickets = this.tickets.filter((ticket) => {
                    if(
                        ticket.subject.toLowerCase().indexOf(this.searchQuery.toLowerCase()) >= 0
                        || ticket.created_by.name.toLowerCase().indexOf(this.searchQuery.toLowerCase()) >= 0
                        || ticket.agent_assigned.name.toLowerCase().indexOf(this.searchQuery.toLowerCase()) >= 0
                    )
                    {
                        return ticket
                    }
                })
                return newTickets
                }
                else {
                    return this.tickets
                }
            }
            else {
                return [];
            }
        },
        agentsResultQuery() {
            if(this.searchScope == "all" || this.searchScope == "agents"){
                if(this.searchQuery){
                let newAgents = this.agents.filter((agent) => {
                    if(agent.name.toLowerCase().indexOf(this.searchQuery.toLowerCase()) >= 0){
                        return agent
                    }
                })
                return newAgents
                }
                else {
                    return this.agents
                }
            }
            else {
                return [];
            }
        },
        contactsResultQuery() {
            if(this.searchScope == "all" || this.searchScope == "contacts"){
                if(this.searchQuery){
                let newContacts = this.contacts.filter((contact) => {
                    if(contact.name.toLowerCase().indexOf(this.searchQuery.toLowerCase()) >= 0){
                        return contact
                    }
                })
                return newContacts
                }
                else {
                    return this.contacts
                }
            }
            else {
                return [];
            }
        },
        // ...mapGetters({
        //     user:'user'
        // }),
    }
}
</script>

<style scoped>
span.sample::before{
    content: "\e917";
}

/**
* Main Search Area Styling
*/
.search-container {
    position: realtive;
    width: 100px;
    margin-right: 20px;
    padding-bottom: 0px;
}
.search-contents {
    background: #fff;
    min-height: 70px;
    max-height: 85vh;
    position: absolute;
    box-shadow: 5px 5px 10px rgba(0,0,0,.1), -5px -5px 10px rgba(0,0,0,.1);
    top: 20px !important;
    right: 256px;
    padding-top: 0px;
    padding-bottom: 0px;
    width: 420px !important;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: flex-start;
}
.search-area {
    width: 100%;
    box-shadow: 5px 5px 10px rgba(0,0,0,.1), -25x -5px 10px rgba(0,0,0,.1);
    border-radius: 4px;
    border: 2px solid transparent !important;
    height: 35px;
    padding-left: 20px;
    margin-bottom: 20px;
}
.search-area.active {
    border: 2px solid #2c5cc5 !important;
}
.search-area i {
    padding-right: 5px;
}
.search-area input {
    height: 100%;
    width: Calc(100% - 19.5px);
    border-top-right-radius: 4px;
    border-bottom-right-radius: 4px;
    border: none;
    outline: none;
}
.search-area input:focus {
    border: none;
    outline: none;
}
.search-results {
    padding: 10px 0px 0px 0px;
    border-bottom: 1px solid #cfd7df;
    width: 90%;
    margin-bottom: 0px;
}
.search-results:last-child {
    border-bottom: none;
    margin-bottom: 10px;
}
.search-results .result-header {
    display: flex;
    justify-content: space-between;
    color:#183247c9;
    font-weight: 600;
}
.search-results .result-header span:last-child {
    font-weight: 500;
}
.search-results .result {
    padding: 0px 15px;
    color:#183247c9;
    display: flex;
    align-items: center;
}
/* .result .router-link-exact-active .router-link-active {
    padding: 0px;
    margin: 0px;
    width: 70px !important;
    background:palevioletred !important;
} */
.search-results .result a {
    color: inherit;
    display: flex;
    height: 100%;
    width: 100%;
    padding-bottom: 0px;
    padding-top: 0px;
}
.search-results .result:hover {
    cursor: pointer;
    background: #eef1f6;;
}
p.ticket-result-subject {
    max-width: 80% !important;
    white-space: nowrap;
    overflow: hidden;
    display: inline-block;
    text-overflow: ellipsis;
    margin-right: 5px;
    margin-top: 10px;
    padding: 0;
}
.ticket-id {
    margin-top: 10px;
}
.search-option-list {
    position: relative;
    padding: 0px 20px 10px 20px;
    margin-top: 10px;
    width: 100%;
    display: flex;
    column-gap: 20px;
    justify-content: flex-start;
    border-bottom: 1px solid #cfd7df;
}
.search-option {
    transition: 100ms ease-in-out;
    display: flex;
    justify-content: center;
    align-items: center;
    height: 30px;
    padding: 3px 10px;
    border-radius: 10px;
    box-shadow: 2px 2px 5px #2c5cc515, -2px -2px 5px #2c5cc515;
}
.search-option.active {
    background: #2c5cc5;
    color:#fff;
}
.search-option:hover {
    margin-top: -3px !important;
    cursor: pointer;
    box-shadow: 4px 4px 8px #2c5cc533;
}
.search-button {
    margin: 0px 10px;
    border: 1px solid #cfd7df;
    height: 30px;
    width: 100px;
    padding: 4px 8px;
    border-radius: 4px;
    display: flex;
    align-items: center;
    justify-content: center;
    color: #92a2b1;
}
.search-button span{
    padding-left: 8px;
}
.dropdown-item:hover {
    cursor: pointer;
}
/**
* End of Main Search Area Styling
*/
svg{
    width: 22px;
    height: 22px;
    fill: #555b6d;
}
a{
    color:black;
}
</style>