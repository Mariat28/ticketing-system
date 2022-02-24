<template>
<div>
<div class="pr-3 card rounded shadow-lg ticket-item-container  " id="container">

<div class="table-responsive table-hover table-condensed">
    <table class="table mb-0">
        <thead class="bg-light">
            <tr><th></th>
                <th>Contact</th>
                <th>Subject</th>
                <th>Department</th>
                <th>Agent</th>

                <th>Status</th>
                <th>Priority </th>

            </tr>
        </thead>
        <tbody>

            <tr v-for="(ticket, index) in pageOfItems" :key="index" id="ticket-row" :class="{'closed-ticket': ticket.status_id == 3}">
              <td ><input class="form-check-input ml-1" type="checkbox" id="select" v-model="ticketselected" ref="rolesSelected" /></td>
                <td class=" avatar-div">
                  <span
                    class="
                      avatar-title
                      bg-light
                      float-left
                      text-primary
                      font-size-14
                      ml-1
                    "
                    :style="{'color: #556ee68c !important': ticket.status_id == 3}"
                    style="width: 40px; height: 40px; align-items:center; text-transform: uppercase;"
                  >{{ticket.contactname[0][0]}}
                    
                  </span>
              
                  <span class="ml-4 contact">{{ticket.contactname}}</span></td>
                <td @click="openTicket(ticket)" id="subject">{{ticket.subject}} <span class="text-primary">#{{ticket.id}}</span></td>
                <td>
                  <i
                    class="fa fa-user-plus text-muted"
                    style="
                      font-size: 10px;
                      display: flex;
                       margin-top:5px;
                      float:left;
                      align-items: center;
                      padding: 1px;
                    "
                  ></i>
                  <select
                    @change="updateTicketDepartment(ticket)"
                    style="
                      
                      outline: none;
                      border: none;
                      margin-top:-17px;
                      font-size: 13px;
                      color:#183247 !important;
                    "
                  >
                    <option>-- / --</option>
                    <option
                      v-for="(department, index) in departments"
                      :key="index"
                      v-bind:value="department.id"
                      v-bind:selected="
                        department.id == ticket.department_id ? true : false
                      "
                    >
                      {{ department.department }}
                    </option>
                  </select>
                </td>
                <td>{{ticket.user.name}}</td>

                <td>
                  <i v-if="ticket.status_id === 2"
                    class="fa fa-tag icon text-muted"
                    aria-hidden="true"
                    style="
                      width: 0px;
                      outline: none;
                      border: none;
                      margin-top:-17px;
                      font-size: 10px;
                    "
                  ></i>
                  <i v-else-if="ticket.status_id === 1"
                    class="fa fa-lock-open icon text-muted"
                    aria-hidden="true"
                    style="
                       width: 0px;
                      outline: none;
                      border: none;
                      margin-top:-17px;
                      font-size: 10px;
                    "
                  ></i>
                  <i v-else
                    class="fa fa-lock icon text-muted"
                    aria-hidden="true"
                    style="
                       width: 0px;
                      outline: none;
                      border: none;
                      margin-top:-17px;
                      font-size: 10px;
                    "
                  ></i>
                  <select 
                    @change="updateTicketStatus(ticket)"
                    style="
                      width: 75px;
                      outline: none;
                      border: none;
                      font-size: 13px;
                      color:#183247 !important;
                    "
                    id="status-select"
                  >
                    <option>-- / --</option>
                    <option
                      v-for="(status, index) in statuses"
                      :key="index"
                      v-bind:value="status.id"
                     v-bind:selected="status.id === ticket.status_id ? true : false
                      "
                    >
                      {{ status.status }}
                    </option>
                  </select>
                </td>

                <td class="pr-3">
                        <div
                        v-bind:class="{
                            'bg-success': ticket.priority_id == 1,
                            'bg-info': ticket.priority_id == 2,
                            'bg-warning': ticket.priority_id == 3,
                            'bg-danger': ticket.priority_id == 4,
                            'bg-secondary': ticket.priority_id == null,
                        }"
                        style="width: 10px; height: 10px; border-radius: 2px"
                        ></div>
                  
                  <select
                    @change="updateTicketPriority(ticket)"
                    id="priority-select"
                    style="
                      
                      outline: none;
                      border: none;
                      margin-top: -13px;
                      font-size: 13px;
                      float:right;
                      color:#183247 !important;
                    "
                    
                  >
                  <option>-- / --</option>
                    <option
                      v-for="(priority, index) in priorities"
                      :key="index"
                      v-bind:value="priority.id"
                      v-bind:selected="
                        priority.id == ticket.priority_id ? true : false
                      "
                      
                    >
                      {{ priority.priority }}
                    </option>
                  </select>
                </td>
                
            </tr>
   
        </tbody>
    </table>
</div>

</div>
<div  style="margin-left: 10px; bottom: 0; position: fixed">
       <jw-pagination 
            :pageSize="10"
            :items="ticketList"
            @changePage="onChangePage"
          ></jw-pagination>   
</div>
</div>
</template>

<script>

import axios from 'axios';
import { mapState } from 'vuex';
export default {
    name:'TicketTable',

  props: {
    tickets: Array,
    nextTicketId: Object,
  },

  data() {
    return {
      priorityId: this.tickets.priority_id,
      contactname:'',
     ticketselected:'',
      pageOfItems:[],
      lastname:'',
      colorIndex: 0,
      colorList: [
        '#ADD8E6',
        '#FF6666',
        '#000080',
        '#000080',

      ],
      user:''
    };
  },
  created(){
        this.$store.dispatch('getPriorities');
        this.user= JSON.parse(sessionStorage.getItem(`user`));
        this.$store.dispatch('fetchAllUsers', this.user.company_id);
        this.tickets.forEach(ticket => {
          this.contactname=ticket.contactname.split(' ')
          this.lastname=this.contactname[1][0];
          this.selecteddept=ticket.department.department
        });
        
  },

  methods: {
    addRowColor(){
      // if(event.target.checked === true){
      //   document.getElementById('ticket-row').classList.add('tr-selected');

      // }

    },
    addBgColor(index) {
      if (index <= 3) {
        const color = this.colorList[this.colorIndex];
        this.colorIndex += 1;
        return color;
      }
      if (index % 4 === 0) {
        this.colorIndex = 0;
      }
      const color = this.colorList[this.colorIndex];
      this.colorIndex += 1;
      return color;
    },
    formatTicketList(tickets) {
      const data = tickets.map((ticket, index) => {
        const color = this.addBgColor(index);
        return { ...ticket, color };
      });
      this.colorIndex = 0;
      return data;
    },

    onChangePage(pageOfItems) {
      // update page of items
      this.pageOfItems = pageOfItems;
    },
    openTicket(ticket){
        this.$router.push(`ticketdetails/${ticket.id}`)
    },
    async refreshWithNewData(){
      let user = JSON.parse(window.sessionStorage.getItem('user'));
        // let result = store.dispatch('fetchAllTickets', user.company_id);
        await axios.get(`tickets/${user.company_id}`)
        .then(response => {
          this.$store.dispatch('setTickets',response.data)
         
        })
    },
    async updateTicketPriority(ticket) {
      let info = {
        ticketId: ticket.id,
        priorityId: event.target.value == "none" ? null : event.target.value,
      };
      const response = await axios.post(
        `updateticketpriority`,
        info
      );

      let data = response.data;

      if (data) {
        ticket.priorityId = event.target.value;
        this.$toasted.show("Priority updated", {
          position: "top-center",
          theme: "toasted-primary",
          className: ["bg-success"],
          icon: {
            name: "fa fa-check-circle",
            after: false,
          },
        });
        // let user = JSON.parse(window.localStorage.getItem('user'));
        // this.$store.dispatch('fetchAllTickets', user.company_id);
       this.refreshWithNewData()

      }
    },
    async updateTicketStatus(ticket) {
      let info = {
        ticketId: ticket.id,
        statusId: event.target.value,
      };

      const response = await axios.post(
        `updateticketstatus`,
        info
      );

      let data = response.data;

      if (data) {
       ticket.status_id = event.target.value;
        this.$emit("change", ticket.status_id);
        this.$toasted.show("Status updated", {
          position: "top-center",
          theme: "toasted-primary",
          className: ["bg-success"],
          icon: {
            name: "fa fa-check-circle",
            after: false,
          },
        });
        // let user = JSON.parse(window.localStorage.getItem('user'));
        // this.$store.dispatch('fetchAllTickets', user.company_id);
        this.refreshWithNewData();
      }
    },
    async updateTicketDepartment(ticket) {
      console.log("department:", ticket)
      let info = {
        ticketId: ticket.id,
        departmentId: event.target.value
      };
      const response = await axios.post(
        `updateticketdepartment`,
        info
      );

      let data = response.data;

      if (data) {
        
        ticket.department_id = event.target.value
        this.$toasted.show("Department updated", {
          position: "top-center",
          theme: "toasted-primary",
          className: ["bg-success"],
          icon: {
            name: "fa fa-check-circle",
            after: false,
          },
        });
        // let user = JSON.parse(window.localStorage.getItem('user'));
        // this.$store.dispatch('fetchAllTickets', user.company_id);
        this.refreshWithNewData();
      }
    },
    showTicketDetails(e) {
      e.srcElement.parentElement.parentElement.parentElement.parentElement.parentElement.nextSibling.classList.toggle(
        "hide-details"
      );
    },
    hideDetails(e) {
      e.srcElement.parentElement.parentElement.parentElement.parentElement.parentElement.nextSibling.classList.add(
        "hide-details"
      );
    },
    disableDetails(e) {
      if ("hide-details" in e.srcElement.nextSibling.classList) {
        //do nothin
      } else {
        e.srcElement.nextSibling.classList.add("hide-details");
      }
    },
    hideTicketDetails(e) {
      e.srcElement.classList.add("hide-details");
    },

  },
  computed:{
      ...mapState({
          priorities:(state)=>state.priorities,
          statuses:(state)=>state.statuses,
          departments:(state)=>state.departments,
          users:(state)=>state.users.users,


      }),
       ticketList() {
      return this.formatTicketList(this.tickets);
    },
  }
}
</script>

<style scoped>

.content {
  margin-left: 80px;
}

tr{
    font-size:15px;
}

.avatar-div {
  display: flex;
  width: 100%;
  height: 100%;
  align-items: center;
  justify-content: start;
}

/* table{
  table-layout: fixed;
    border-collapse: collapse;
} */
th,td{
  font-size: 13px;
}
td{
  vertical-align: middle;
  color:#192841;
}
.tr-selected{
background-color: rgb(250, 227, 192);
}
.contact{
  font-weight: 15px;
}
#subject{
   font-weight: bold;
   font-size: 14.4px;
}
#subject:hover{
  color:#556ee6;
  cursor: pointer;
}
#priority-select{
  margin-left:10px;
}
#status-select{
margin-left:15px;
}
.icon{
  margin-top: 5px;
}
#selectAll{
  margin-top: -5px;
}
#select{
  margin-top: -8px;
}
.closed-ticket {
  opacity: .4;
  z-index: 40;
}

.ticket-item-container {
  position: relative;
  display: flex !important;
  justify-content: center !important;
  align-items: center !important;
  width: 100% !important;
  padding: 0px !important;
  min-height: 92px;
  margin-left: 15px;
  /* background: chartreuse; */
}
@media screen and (min-width: 2000px) {
  #priority-select{
  margin-left:-30px;
}
#status-select{
margin-top:-17px;

}
.icon{
 margin-top:5px;

}
}

</style>
