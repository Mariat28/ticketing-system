<template>
  <div class="ticket-item-container">
    <div class="card" :class="{'active-card': this.$store.state.activeCardIndex == cardIndex}">
        <div class="summary-div">
            <div class="avatar-div" :class="{'closed-ticket': ticket.status_id == 3}">
                <div class="form-check check-div">
                    <input class="form-check-input" type="checkbox" id="remember" />
                </div>
                <div class="avatar">
                    <span
                    class="
                        avatar-title
                        bg-light
                        text-primary
                        font-size-14
                    "
                    :style="{'color: #556ee68c !important': ticket.status_id == 3}"
                    style="width: 40px; height: 40px; align-items: center; text-transform: uppercase;"
                    >{{contactname.length > 1 ? `${contactname[0][0]}${contactname[1][0]}` : `${contactname[0][0]}`}}
                    
                    </span>
                </div>
            </div>
          <div class="card-body" :class="{'closed-ticket': ticket.status_id == 3}">
            <p
              v-if="ticket.status != 'Closed'"
              class="ticket-actions-container"
            >
              <TicketAction
              v-if="ticket.due"
                actionMessage="Overdue"
                :style="{ 'color': '#c82124', 'background-color': '#ffecf0', 'border':'.5px solid #c82124' , 'text-align': 'center'}"
              />
              <TicketAction
              v-if="ticket.customerResponse"
                actionMessage="Customer responded"
                :style="{ color: '#2c5cc5', 'background-color': '#e5f2fd','border':'.5px solid #2c5cc5' , 'text-align': 'center' }"
              />
            </p>

            <blockquote
              class="card-blockquote mb-0 mt-0"
            >
              <router-link
                :to="{
                  name: 'Ticket Details',
                  params: { ticketId: ticket.id, nextTicketId: nextTicketId },
                }"
              >
                <p
                  v-if="!ticket.isRead"
                  style="font-weight: 500; width: 100% !important"
                >
                  {{ ticket.subject }} <span style="color:#183247;">#{{ticket.id}}</span>
                </p>

                <p v-if="ticket.isRead" style="width: 100% !important">
                  {{ ticket.subject }} <span style="color:#183247;">#{{ticket.id}}</span>
                </p>
                <div class="ticket-more-details">
                  <span class="float-left  mr-1 source">
                  <i
                  v-if="ticket.source_id == 1"
                  class="fa fa-phone-alt text-info"
                  style="font-size:12px"
                ></i>
                <i
                  v-else-if="ticket.source_id == 2"
                  class="fa fa-list-alt text-secondary"
                  style="font-size: 13px"
                ></i>
                <i
                  v-else-if="ticket.source_id == 3"
                  class="fa fa-envelope text-danger"
                  style="font-size: 13px"
                ></i>
                <i
                  v-else-if="ticket.source_id == 4"
                  class="fab fa-whatsapp text-success"
                  style="font-size: 14.5px"
                ></i>
                <i
                  v-else-if="ticket.source_id == 5"
                  class="fab fa-facebook"
                  style="font-size: 13.5px"
                ></i>
                <i
                  v-else-if="ticket.source_id == 6"
                  class="fa fa-sticky-note text-warning"
                  style="font-size: 13px"
                ></i>
                <i
                  v-else
                  class="fa fa-sticky-note text-warning"
                  style="font-size: 13px"
                ></i>
                </span>
                <footer class="font-size-12 mt-0">
                  {{ ticket.contactname }}
                  <span
                    style="
                      font-weight: bold;
                      font-size: 18px;
                      position: relative;
                      bottom: 2px;
                      margin-left: 3px;
                      margin-right: 3px;
                    "
                    >.</span
                  >
                  Created on {{ticket.created_at.split('T')[0]}}
                  <span
                    style="
                      font-weight: bold;
                      font-size: 18px;
                      position: relative;
                      bottom: 2px;
                      margin-left: 3px;
                      margin-right: 3px;
                    "
                    >.</span
                  >
                  <span class="text-dark">{{ticket.due ? `Over due ${ticket.dueDays} days ago` : `Over due in ${ticket.dueDays} days`}}</span>
                </footer>
                </div>
              </router-link>
            </blockquote>
          </div>
        </div>
        <div class="item-filters">
          <div>
            <div class="drop mr-2 mt-1">
              <div>
                <div class="selection-area">
                  <div
                    style="
                      height: 100%;
                      display: flex;
                      justify-content: center;
                      align-items: center;
                      padding: 1px 3px;
                    "
                    :class="{'closed-ticket': ticket.status_id == 3}"
                  >
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
                  </div>
                  <div class="input-filter-container">
                    <div class="form-control input-area" @click="showPriorityOptions"  :class="{'closed-ticket': ticket.status_id == 3}">
                      <input type="text" class="agent-input" :value="ticket.priority_id != null ? ticket.priority.priority : '---- / ----'" readonly>
                      <svg xmlns="http://www.w3.org/2000/svg"  viewBox="0 0 32 32" class="app-icon app-icon--verysmall" data-test-dropdown="menu-sort" data-identifyElement="149"><path d="M8.626 9.744c-.875-.903-2.294-.903-3.17-.001s-.876 2.366-.001 3.268l8.959 9.244a2.195 2.195 0 003.171 0l8.959-9.244c.875-.903.874-2.366-.001-3.268s-2.295-.902-3.169.001L16 17.353 8.626 9.744z" data-identifyElement="150"></path></svg>
                    </div>
                    <div class="agent-options" v-if="isPriorityOptions">
                      <div class="agent-option">
                          <div v-for="(priority, index) in this.$store.state.priorities"
                          :key="index" class="agent-option-item"
                          @click="updateTicketPriority(priority)">
                        <div
                      v-bind:class="{
                        'bg-success': priority.id == 1,
                        'bg-info': priority.id == 2,
                        'bg-warning': priority.id == 3,
                        'bg-danger': priority.id == 4,
                        'bg-secondary': priority.id == null,
                      }"
                      style="width: 10px; height: 10px; border-radius: 2px"

                    ></div>
                        <span>{{ priority.priority }}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <div class="selection-area">
                  <i
                    class="fa fa-user-plus"
                    :class="{'closed-ticket': ticket.status_id == 3}"
                    style="
                      font-size: 10px;
                      color:#183247;
                      display: flex;
                      align-items: center;
                      padding: 1px;
                    "
                  ></i>
                  <div class="input-filter-container">
                    <div class="form-control input-area" @click="showDepartmentOptions" :class="{'closed-ticket': ticket.status_id == 3}">
                      <input type="text" class="agent-input" :value="ticket.department_id != null ? ticket.department.department : '---- / ----'" readonly>
                      <svg xmlns="http://www.w3.org/2000/svg"  viewBox="0 0 32 32" class="app-icon app-icon--verysmall" data-test-dropdown="menu-sort" data-identifyElement="149"><path d="M8.626 9.744c-.875-.903-2.294-.903-3.17-.001s-.876 2.366-.001 3.268l8.959 9.244a2.195 2.195 0 003.171 0l8.959-9.244c.875-.903.874-2.366-.001-3.268s-2.295-.902-3.169.001L16 17.353 8.626 9.744z" data-identifyElement="150"></path></svg>
                    </div>
                    <div class="agent-options" v-if="isDepartmentOptions">
                      <div class="agent-option">
                          <div 
                            v-for="(department, index) in this.$store.state.departments"
                            :key="index" class="agent-option-item"
                            @click="updateTicketDepartment(department)">
                            <span>{{ department.department }}</span>
                          </div>
                      </div>
                    </div>
                  </div>
                </div>

                <div class="selection-area">
                  <i
                    class="fa fa-tag"
                    aria-hidden="true"
                    style="
                      font-size: 10px !important;
                      color:#183247;
                      display: flex;
                      align-items: center;
                      padding: 1px;
                    "
                    :class="{'closed-ticket': ticket.status_id == 3}"
                  ></i>
                  <div class="input-filter-container">
                    <div class="form-control input-area" @click="showStatusOptions" :class="{'closed-ticket': ticket.status_id == 3}">
                      <input type="text" class="agent-input" :value="ticket.status_id != null ? ticket.status.status : '---- / ----'" readonly>
                      <svg xmlns="http://www.w3.org/2000/svg"  viewBox="0 0 32 32" class="app-icon app-icon--verysmall" data-test-dropdown="menu-sort" data-identifyElement="149"><path d="M8.626 9.744c-.875-.903-2.294-.903-3.17-.001s-.876 2.366-.001 3.268l8.959 9.244a2.195 2.195 0 003.171 0l8.959-9.244c.875-.903.874-2.366-.001-3.268s-2.295-.902-3.169.001L16 17.353 8.626 9.744z" data-identifyElement="150"></path></svg>
                    </div>
                    <div class="agent-options" v-if="isStatusOptions">
                      <div class="agent-option">
                          <div 
                            v-for="(status, index) in this.$store.state.statuses"
                            :key="index" class="agent-option-item"
                            @click="updateTicketStatus(status)">
                            <span>{{ status.status }}</span>
                          </div>
                      </div>
                    </div>
                  </div>
                </div>

              </div>
            </div>
          </div>
        </div>
    </div>
  </div>
</template>

<script>
import TicketAction from "@/components/users/TicketAction.vue";
import axios from "axios";
import store from '../../store'

export default {
  name: "TicketListItem",
  components: {
    TicketAction,
  },
  props: {
    ticket: Object,
    priorities: Array,
    statuses: Array,
    departments: Array,
    nextTicketId: Object,
    activeCardIndex: Number,
    cardIndex: Number,
  },
  data() {
    return {
      isDepartmentOptions: false,
      isStatusOptions: false,
      isPriorityOptions: false,
      contactname:this.ticket.contactname.split(' '),
      lastname:'',
      //
    };
  },
  methods: {
    hideAllOptionsPops(){
      this.isPriorityOptions = false;
      this.isStatusOptions = false;
      this.isDepartmentOptions = false;
    },
    async refreshWithNewData(){
      let user = JSON.parse(sessionStorage.getItem('user'));
        // let result = store.dispatch('fetchAllTickets', user.company_id);
        await axios.get(`tickets/${user.company_id}`)
        .then(response => {
          store.dispatch('setTickets',response.data)
        })
    },
    showPriorityOptions(){
      this.hideAllOptionsPops()
      this.isPriorityOptions = true
    },
    async updateTicketPriority(priority) {
      this.isPriorityOptions = false
      let info = {
        ticketId: this.ticket.id,
        priorityId: priority.id,
      };

      const response = await axios.post(
        `updateticketpriority`,
        info
      );

      let data = response.data;

      if (data) {
        this.$toasted.show("Priority updated", {
          position: "top-center",
          theme: "toasted-primary",
          className: ["bg-success"],
          icon: {
            name: "fa fa-check-circle",
            after: false,
          },
        });
        this.refreshWithNewData()
      }
    },
    showStatusOptions(){
      this.hideAllOptionsPops()
      this.isStatusOptions = true
    },
    async updateTicketStatus(status) {
      this.isStatusOptions = false

      let info = {
        ticketId: this.ticket.id,
        statusId: status.id,
      };

      const response = await axios.post(
        `updateticketstatus`,
        info
      );

      let data = response.data;

      if (data) {
        // this.$emit("change", this.ticket.status_id);
        this.$toasted.show("Status updated", {
          position: "top-center",
          theme: "toasted-primary",
          className: ["bg-success"],
          icon: {
            name: "fa fa-check-circle",
            after: false,
          },
        });

        this.refreshWithNewData()
      }
    },
    showDepartmentOptions(){
      this.hideAllOptionsPops()
      this.isDepartmentOptions = true
    },
    async updateTicketDepartment(department) {
      this.isDepartmentOptions = false

      let info = {
        ticketId: this.ticket.id,
        departmentId: department.id,
      };
      const response = await axios.post(
        `updateticketdepartment`,
        info
      );

      let data = response.data;

      if (data) {
        this.$toasted.show("Department updated", {
          position: "top-center",
          theme: "toasted-primary",
          className: ["bg-success"],
          icon: {
            name: "fa fa-check-circle",
            after: false,
          },
        });

        this.refreshWithNewData()
        }
    },

  },
};
</script>

<style scoped>
/** 
**new filters  styles 
**
*/
.selection-area {
  height: 30px;
  min-width: 140px !important;
  display: flex;
  justify-content: center !important;
  align-items: center !important;
  /* margin-right: 40px; */
}
.input-filter-container, .form-control{
  position: relative;
  border: none;
  outline: none;
}
.form-control:focus {
  border: none;
  outline: none;
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
  padding-left: 0px;
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
  border: none;
}
.input-area input:focus {
  border: none;
  outline: none;
}
.input-area input:hover {
  cursor: pointer;
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
  top: 22px;
  width: 100%;
  min-height: 50px;
  /* max-height: 200px; */
  border-radius: 2px;
  background: #fff;
  box-shadow: 2px 2px 10px rgba(0, 0, 0, 0.2);
  z-index: 50;
  padding: 5px 7px;
}
.agent-option-item {
  border-radius: 4px !important;
  width: 100% !important;
  margin: 8px 0px !important;
  padding: 5px;
  display: flex;
  align-items: center;
}
.agent-option-item:hover {
  cursor: pointer;
  background: #f5f7f9;
}
.agent-option-item span {
  margin-left: 5px;
  font-size: 13px;
}
@keyframes slideDownFilterOptions {
  0% {
    top: 10px;
  }
  100% {
    top: 22px;
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
.closed-ticket {
  opacity: .4;
  z-index: 40;
}
.avatar-div .avatar {
    width: 44px;
    height: 44px;
    border-bottom-left-radius: 4px !important;
    border-top-left-radius: 4px !important;
}
.avatar-div {
  display: flex;
  width: 105px !important;
  min-height: 92px;
  align-items: center;
  justify-content: flex-start !important;
}
.summary-div{
    display: flex;
    width: 100%;
    height: 100% !important;
    margin-left: 0px
}
.item-filters {
    min-width: 140px !important;
    max-width: 170px !important;
}
.card-body {
    width: Calc(100% - 110px);
    padding-left: 0px;
    display: flex !important;
    flex-direction: column !important;
    justify-content: center;

}
.card {
    position: relative;
    width: 100%;
    min-height: 92px;
    margin-left: 0px;
    margin-right: 0px !important;
    margin-bottom: 7px;
    border-radius: 0px;
    box-shadow: 2px 2px 2px rgba(0,0,0,.15);
    display: flex !important;
    flex-direction: row !important;
    align-items: center;
    justify-content: space-between;
    border-left:2.5px solid #fff;
    border-bottom-left-radius: 3px;
    border-top-left-radius: 3px;
}
.card.active-card {
  border-left:2.5px solid tan !important;
}
.card:hover {
  margin-bottom: 8px;
  box-shadow: 3px 3px 5px rgba(0,0,0,.15);
}
blockquote footer{
    margin-top: 0px;
}
.ticket-more-details, .ticket-more-details footer {
  display: flex;
  align-items: center;
  justify-content: flex-start;
}

.ticket-more-details > span {
  height: 100% !important;
  margin-top: 0px;
  margin-bottom: 0px;
}
.check-div {
  margin-left: 15px;
  margin-right: 15px;
}
.source{
  margin-top: 5.5px;
}
.bg-urgent {
  background: red;
}
#remember {
  width: 16px;
  height: 16px;
}
.card-body blockquote footer {
  color: #74788d !important;
  font-size: 10px;
}
.ticket-actions-container {
  margin-bottom: 1px;
}
select,
option {
  color: #74788d !important;
  background: white;
}
.customer-avatar {
  background: #f3f1f1;
  width: 40px !important;
  height: 40px !important;
  display: flex;
  justify-content: center;
  align-items: center;
  margin-left: 0px;
}
.form-check {
  height: 40px;
  display: flex;
  justify-content: center;
  align-items: center;
}
.ticket-item-container {
  position: relative;
  display: flex !important;
  justify-content: center !important;
  align-items: center !important;
  width: 100% !important;
  padding: 0px !important;
  margin: 0px !important;
  min-height: 92px;
  /* background: chartreuse; */
}
blockquote:hover {
  cursor: pointer;
  opacity: 0.8;
}
.details {
  width: 65% !important;
  left: 10%;
  padding: 10px 0px 0px 0px;
  background: #fff;
  top: 60px;
  border-radius: 0 5px 5px 5px;
  border: 1px solid #74788d41;
  z-index: 5;
}
.details-action {
  display: flex;
  justify-content: flex-end;
}
.reply,
.add-note {
  padding: 10px 10px;
}
.reply:hover,
.add-note:hover {
  cursor: pointer;
  opacity: 0.9;
}
.hide-details {
  display: none;
}
svg {
  width: 10px;
  height: 10px;
}
.drop {
  float: right;
}
</style>