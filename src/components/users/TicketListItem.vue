<template>
  <div class="ticket-item-container">
    <div class="card">
      <div class="row" style="margin-top:0px;">
        <!-- checkbox -->
        <div style="" class="col-lg-2">
          <div class="avatar-div">
            <div class="form-check check-div">
              <input class="form-check-input" type="checkbox" id="remember" />
            </div>
            <div class="avatar-xs">
              <span
                class="
                  avatar-title
                  rounded-circle
                  bg-light
                  text-primary
                  font-size-14
                  ml-1
                "
                :style="{'color: #556ee68c !important': ticket.status_id == 3}"
                style="width: 40px; height: 40px; align-items: center; text-transform: uppercase;"
              >{{contactname.length > 1 ? `${contactname[0][0]}${contactname[1][0]}` : `${contactname[0][0]}`}}
                
              </span>
            </div>
          </div>
        </div>
        <div class="summary-div col-lg-9 ">
          <div class="card-body">
            <p
              v-if="ticket.status != 'Closed'"
              class="ticket-actions-container"
            >
              <TicketAction
              v-if="ticket.due"
                actionMessage="Overdue"
                :style="{ color: '#c82124', 'background-color': '#ffecf0' }"
              />
              <TicketAction
              v-if="ticket.customerResponse"
                actionMessage="Customer responded"
                :style="{ color: '#2c5cc5', 'background-color': '#e5f2fd' }"
              />
            </p>

            <blockquote
              v-if="ticket.status_id !=  3"
              class="card-blockquote mb-0"
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
                  {{ ticket.subject }}
                </p>

                <p v-if="ticket.isRead" style="width: 100% !important">
                  {{ ticket.subject }}
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

            <!--Only if the ticket is marked as closed-->
            <blockquote
              v-if="ticket.status_id == 3"
              class="card-blockquote mb-0"
            >
              <p
                  style="font-weight: 500; width: 100% !important;color: #556ee68c !important"
                >
                  {{ ticket.subject }}
                </p>
              <footer class="font-size-12 mt-0" style="color: #74788d59 !important">
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
                  {{ ticket.daysAgo }} 2 days ago
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
                  <span>Resolved on 22nd/06/2021</span>
                </footer>
            </blockquote>
          </div>
        </div>
        <div class="col-lg-2">
          <div>
            <div class="drop mr-4 mt-3">
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
                  >
                    <div
                      v-bind:class="{
                        'bg-info': ticket.priority_id == 1,
                        'bg-warning': ticket.priority_id == 2,
                        'bg-danger': ticket.priority_id == 3,
                        'bg-urgent': ticket.priority_id == 4,
                        'bg-secondary': ticket.priority_id == null,
                      }"
                      style="width: 10px; height: 10px; border-radius: 2px"
                    ></div>
                  </div>
                  <select
                    @change="updateTicketPriority"
                    style="
                      width: 120px;
                      outline: none;
                      border: none;
                      margin: 5px 0px;
                      font-size: 13px;
                      color:#183247 !important;
                    "
                  >
                  <option>-- / --</option>
                    <option
                      v-for="(priority, index) in this.$store.state.priorities"
                      :key="index"
                      v-bind:value="priority.id"
                      v-bind:selected="
                        priority.id == ticket.priority_id ? true : false
                      "
                    >
                      {{ priority.priority }}
                    </option>
                  </select>
                </div>
                <div class="selection-area">
                  <i
                    class="fa fa-user-plus"
                    style="
                      font-size: 10px;
                      color:#183247;
                      display: flex;
                      align-items: center;
                      padding: 1px;
                    "
                  ></i>
                  <select
                    @change="updateTicketDepartment"
                    style="
                      width: 120px;
                      outline: none;
                      border: none;
                      margin: 5px 0px;
                      font-size: 13px;
                      color:#183247 !important;
                    "
                  >
                    <option>-- / --</option>
                    <option
                      v-for="(department, index) in this.$store.state.departments"
                      :key="index"
                      v-bind:value="department.id"
                      v-bind:selected="
                        department.id == ticket.department_id ? true : false
                      "
                    >
                      {{ department.department }}
                    </option>
                  </select>
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
                  ></i>
                  <select
                    @change="updateTicketStatus"
                    style="
                      width: 120px;
                      outline: none;
                      border: none;
                      margin: 5px 0px;
                      font-size: 13px;
                      color:#183247 !important;
                    "
                  >
                    <option>-- / --</option>
                    <option
                      v-for="(status, index) in this.$store.state.statuses"
                      :key="index"
                      v-bind:value="status.id"
                      v-bind:selected="status.id === ticket.status_id ? true : false
                      "
                    >
                      {{ status.status }}
                    </option>
                  </select>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div class="card details hide-details">
      <div
        class="card-title"
        style="border-bottom: 1px solid #74788d21; padding: 0px 20px"
      >
        <div class="agent" style="font-size: 12px; font-weight: 600">
          {{ ticket.createdBy }}
          <span style="font-weight: 300; font-size: 11px">
            submitted a new ticket
          </span>
        </div>
        <div
          style="
            font-weight: 400;
            font-size: 11px;
            colro: #74788d;
            padding: 5px 0px 10px 0px;
          "
          class="timestamp"
        >
          {{ ticket.daysAgo }} days ago (Sunday, 20 Jun 2021 at 2:45 PM)
        </div>
      </div>
      <div
        style="
          margin-bottom: 10px !important;
          border-bottom: 1px solid #74788d21;
        "
        class="details-body"
      >
        <p style="padding: 0px 20px !important; font-size: 12px">
          If you don't see the Sign in another way link, it means that you
          haven't set up any other verification methods. You'll have to contact
          your administrator for help signing into your account.
        </p>
      </div>
      <div class="details-action" style="padding: 0px 10px">
        <div class="reply">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="32"
            height="32"
            viewBox="0 0 32 32"
            class="nucleus-icon nucleus-icon--small nucleus-icon--primary"
            aria-hidden="true"
            role="img"
          >
            <path
              d="M6.313 12.929l9.442-9.246c.478-.468.488-1.236.022-1.716s-1.231-.49-1.709-.022L2.499 13.273c-.226.22-.366.529-.366.87s.14.649.366.87l11.569 11.328c.478.468 1.243.458 1.709-.022s.456-1.248-.022-1.716l-9.442-9.246h15.769c2.67 0 4.834 2.174 4.834 4.855v9.508c0 .67.541 1.214 1.209 1.214s1.209-.543 1.209-1.214v-9.508c0-4.022-3.247-7.283-7.252-7.283H6.313z"
            ></path>
          </svg>
          Reply
        </div>
        <div class="add-note">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="32"
            height="32"
            viewBox="0 0 32 32"
            class="nucleus-icon nucleus-icon--small nucleus-icon--primary"
            aria-hidden="true"
            role="img"
          >
            <path
              d="M7.822 1.6h16.356c2.258 0 4.089 1.808 4.089 4.038v20.19c0 2.23-1.831 4.038-4.089 4.038H7.822c-2.258 0-4.089-1.808-4.089-4.038V5.638c0-2.23 1.831-4.038 4.089-4.038zm0 2.423c-.903 0-1.636.723-1.636 1.615v20.19c0 .892.732 1.615 1.636 1.615h16.356c.903 0 1.636-.723 1.636-1.615V5.638c0-.892-.732-1.615-1.636-1.615H7.822zm2.234 3.634h11.888a1.21 1.21 0 110 2.422H10.056a1.21 1.21 0 110-2.422zm0 6.865h11.888a1.21 1.21 0 110 2.422H10.056a1.21 1.21 0 110-2.422zm0 6.865h11.888a1.21 1.21 0 110 2.422H10.056a1.21 1.21 0 110-2.422z"
            ></path>
          </svg>
          Add note
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import TicketAction from "@/components/users/TicketAction.vue";
import axios from "axios";

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
  },

  data() {
    return {
      priorityId: this.ticket.priority_id,
      contactname:this.ticket.contactname.split(' '),
      lastname:'',
    };
  },
  methods: {
    async updateTicketPriority(event) {
      let info = {
        ticketId: this.ticket.id,
        priorityId: event.target.value == "none" ? null : event.target.value,
      };

      const response = await axios.post(
        `updateticketpriority`,
        info
      );

      let data = response.data;

      if (data) {
        this.priorityId = event.target.value;
        this.$toasted.show("Priority updated", {
          position: "top-center",
          theme: "toasted-primary",
          className: ["bg-success"],
          icon: {
            name: "fa fa-check-circle",
            after: false,
          },
        });
        let user = JSON.parse(sessionStorage.getItem('user'));
        this.$store.dispatch('fetchAllTickets', user.company_id);
      }
    },
    async updateTicketStatus(event) {
      let info = {
        ticketId: this.ticket.id,
        statusId: event.target.value == "none" ? null : event.target.value,
      };

      const response = await axios.post(
        `updateticketstatus`,
        info
      );

      let data = response.data;

      if (data) {
        this.ticket.status_id = event.target.value;
        this.$emit("change", this.ticket.status_id);
        this.$toasted.show("Status updated", {
          position: "top-center",
          theme: "toasted-primary",
          className: ["bg-success"],
          icon: {
            name: "fa fa-check-circle",
            after: false,
          },
        });
        let user = JSON.parse(sessionStorage.getItem('user'));
        this.$store.dispatch('fetchAllTickets', user.company_id);
      }
    },
    async updateTicketDepartment(event) {
      let info = {
        ticketId: this.ticket.id,
        departmentId: event.target.value == "none" ? null : event.target.value,
      };
      const response = await axios.post(
        `updateticketdepartment`,
        info
      );

      let data = response.data;

      if (data) {
        this.ticket.department_id = event.target.value
        this.$toasted.show("Department updated", {
          position: "top-center",
          theme: "toasted-primary",
          className: ["bg-success"],
          icon: {
            name: "fa fa-check-circle",
            after: false,
          },
        });
        let user = JSON.parse(window.localStorage.getItem('user'));
        this.$store.dispatch('fetchAllTickets', user.company_id);
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
};
</script>

<style scoped>
.card {
  margin-bottom: 7px;
  border-radius: 0px;
  box-shadow: 2px 2px 2px rgba(0,0,0,.15);
}
.card:hover {
  margin-bottom: 8px;
  box-shadow: 3px 3px 5px rgba(0,0,0,.15);
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
  margin-left: 5px;
  margin-right: 10px;
}
.summary-div{
  margin-left:-30px
}
.source{
  margin-top: 5.5px;
}
.selection-area {
  height: 30px;
  display: flex;
  justify-content: center !important;
  align-items: center !important;
  /* margin-right: 40px; */
}
select:hover {
  cursor: pointer;
}
.avatar-div {
  display: flex;
  width: 100%;
  height: 100%;
  align-items: center;
  justify-content: start;
}
@media screen and (min-width: 2000px) {
  .avatar-div {
    width: 40%;
  }
  .summary-div{
  margin-left:-200px
}
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
  margin-bottom: 2px;
}
select,
option {
  color: #74788d !important;
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
}
.ticket-item-container .details {
  position: absolute;
  width: 100%;
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