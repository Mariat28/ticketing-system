import Vue from 'vue'
import VueRouter from 'vue-router'
import Login from '../views/LoginPage.vue'
import Companies from '../views/admin/CompanyList.vue';

let authenticatedUser=JSON.parse(sessionStorage.getItem('user'));
const routes = [
  {
    path: '/',
    name: 'LoginPage',
    component: Login  
  },
  {

    path: '/home',
    name: 'Home',
    component: () => import('../views/Home.vue'),
    meta:{
      requiresAuth: true
    }
  },
  {

    path: '/admin',
    name: 'AdminDashboard',
    component: () => import( '../views/admin/Dashboard.vue'),
    meta:{
      requiresAuth: true
    }
 
  },
  {

    path: '/companies',
    name: 'Companies',
    component:Companies,
    meta:{
      requiresAuth: true
    }
  },
  {
    path: '/subscriptions',
    name: 'Subscription List',
    // lazy loading
    component: () => import( '../views/admin/SubscriptionList.vue'),
    meta:{
      requiresAuth:true
    }
  },
  {
    path: '/companydetails/:companyId',
    name: 'Company Details',
    // lazy loading
    component: () => import( '../views/admin/CompanyDetailsView.vue'),
    meta:{
      requiresAuth:true
    }
  },
  {
    path: '/AllTickets',
    name: 'All Tickets',
    component: () => import( '../views/Tickets.vue'),
    meta:{
      requiresAuth:true
    }
  },
  {
    path: '/ticketdetails/:ticketId',
    name: 'Ticket Details',
    component: () => import('../views/TicketDetails.vue'),
    meta:{
      requiresAuth:true
    }
  },
  {
    path: '/NewTickets',
    name: 'New Tickets',
    component: () => import('../views/NewTickets.vue'),
    meta:{
      requiresAuth:true
    }
  },
  {
    path: '/OpenTickets',
    name: 'Open Tickets',
    component: () => import('../views/OpenTickets.vue'),
    meta:{
      requiresAuth:true
    }
  },
  {
    path: '/PendingTickets',
    name: 'Pending Tickets',
    component: () => import( '../views/PendingTickets.vue'),
    meta:{
      requiresAuth:true
    }
  },
  {
    path: '/Ticketsassingedtome',
    name: 'Tickets assigned to me',
    component: () => import('../views/MyAssignedTickets.vue'),
    meta:{
      requiresAuth:true
    }
  },
  {
    path: '/ClosedTickets',
    name: 'Closed Tickets',
    component: () => import( '../views/ClosedTickets.vue'),
    meta:{
      requiresAuth:true
    }
  },
  {
    path: '/addnewticket',
    name: 'Add New Ticket',
    // lazy loading
    component: () => import( '../views/NewTicket.vue'),
    meta:{
      requiresAuth:true
    }
  },
  {
    path: '/addnewuser',
    name: 'Add New User',
    component: () => import( '../views/NewUser.vue'),
    meta:{
      requiresAuth:true
    },
  //   beforeEnter:(to, from, next)=>{
  //     let role=authenticatedUser.role
  //     if(role==='Admin'){
  //       next()
  //     }else{
  //       localStorage.removeItem('token');
  //       localStorage.removeItem('user');
  //       next('/')
  //     }
  // }
  },
  {
    path: '/users',
    name: 'Users',
    // lazy loading
    component: () => import( '../views/UsersList.vue'),
    meta:{
      requiresAuth:true
    },
    // beforeEnter:(to, from, next)=>{
    //     let role=authenticatedUser.role
    //     if(role==='Admin'){
    //       next()
    //     }else{
    //       localStorage.removeItem('token');
    //       localStorage.removeItem('user');
    //       next('/')
    //     }
    // }
  },
  {
    path: '/addnewcontact',
    name: 'Add New Contact',
    // lazy loading
    component: () => import( '../views/NewContact.vue'),
    meta:{
      requiresAuth:true
    }
  },
  //manager routes
 
]
Vue.use(VueRouter)

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})
router.beforeEach((to, from, next)=>{
  const requiresAuth = to.matched.some(record => record.meta.requiresAuth);

    // Check for protected route
    if (requiresAuth && ! authenticatedUser) {next('/')}
    else {
        next()
    }
});

  // if(to.name!== 'LoginPage' && isAuthenticated===false){
  //   next({name:'LoginPage'})
  // }
  // else{
  //   next();
  // }
//})
export default router
