<template>
  <div>
    <Notification
      v-if="notify"
      v-bind:closeNotification="closeNotification"
      v-bind:confirmNotification="confirmNotification"
      v-bind:notificationTitle="notificationTitle"
      v-bind:message="notificatonMessage"
    />
    <div class="content">
      <div id="main-content">
        <div class="page-content">
          <!-- actions -->
          <div class="actions bg-light " @click="clearView">
            <div class="float-left">
              <div class="left-subnav">
                <a
                  class="btn btn-primary text-white btn-sm action"
                  @click="activateAddReply"
                  ><i class="fa fa-reply"></i>Reply</a
                >
                <a
                  class="btn btn-primary text-white btn-sm action"
                  @click="activateAddNote"
                  ><i class="fa fa-book"></i>Add note</a
                >
                <a
                  class="btn btn-primary text-white btn-sm action"
                  @click="activateForward"
                  ><i class="mdi mdi-forward"></i>Forward</a
                >
                <a class="btn btn-primary text-white btn-sm action"
                  ><i class="fa fa-user-plus"></i>Assign</a
                >
                <a 
                 class="btn btn-primary text-white btn-sm action" id="close-button"
                 @click="markClosed"
                >
                  <i class="fa fa-ban"></i>Close</a
                >
                <a class="btn btn-primary text-white btn-sm action"
                  ><i class="fa fa-object-group"></i>Merge</a
                >
                <a 
                class="btn btn-primary text-white btn-sm action" 
                @click="deleteTicket"
                  ><i class="fa fa-trash-alt"></i>Delete</a
                >
                <a class="btn btn-primary text-white btn-sm xxl-actions action">
                  <i class="mdi mdi-forward"></i>Forward</a
                >
                <a
                  class="btn btn-primary text-white btn-sm xxl-actions action"
                  data-bs-toggle="modal"
                  data-bs-target="#editTicketModal"
                  ><i class="fa fa-edit"></i>Edit Ticket Details</a
                >
                <a class="btn btn-primary text-white btn-sm xxl-actions action"
                  ><i class="fa fa-exclamation-triangle"></i>Spam</a
                >
                <div class="dropdown float-right options">
                  <a
                    class="btn btn-primary text-white btn-sm options-btn action"
                    data-bs-toggle="dropdown"
                    ><i class="fa fa-ellipsis-v ml-1"></i
                  ></a>
                  <ul
                    class="dropdown-menu"
                    aria-labelledby="dropdownMenuButton1"
                  >
                    <li>
                      <a
                        class="dropdown-item"
                        data-bs-toggle="modal"
                        href="#"
                        data-bs-target="#editTicketModal"
                        ><i class="fa fa-edit"> </i>Edit Ticket Details</a
                      >
                    </li>
                  </ul>
                </div>
              </div>
            </div>
            <div class="float-right">
              <div class="right-subnav mt-0">
                <a
                  class="btn btn-light border-secondary btn-sm mr-1 action"
                  @click="printPdf"
                  ><i class="fa fa-print"></i>Print</a
                >
                <a @click="fetctNextTicketDetails"
                  class="btn btn-light border-secondary btn-sm prev action ml-1"
                  ><i class="fa fa-angle-left"></i
                ></a>
                <a  @click="fetctNextTicketDetails"  class="btn btn-light border-secondary btn-sm action"
                  ><i class="fa fa-angle-right"></i
                ></a>
                <!-- <p class="float-right mt-3 pl-1">showing 30 - 60 of 100 </p> -->
                <!-- <a class="btn btn-light border-secondary btn-sm   float-right mr-1" ><i class="fa fa-upload"></i>Export</a> -->
              </div>
            </div>
          </div>
          <div class="container-fluid body" @click="clearView">
            <!-- details -->
            <div class="row listview">
              <div
                class="
                  details
                   col-lg-9 col-md-8 col-xxl-10
                  bg-white
                "
              >
                <div class="card-body bg-white">
                  <table>
                    <tr>
                      <td class="ticket-subject-source">
                        <i
                        v-bind:class="{
                          'fa fa-phone-alt': ticket.source_id == 1,
                          'fa fa-list-alt': ticket.source_id == 2,
                          'fa fa-envelope': ticket.source_id == 3,
                          'fab fa-whatsapp': ticket.source_id == 4,
                          'fab fa-facebook': ticket.source_id == 5,
                          'fa fa-sticky-note': ticket.source_id == 6,
                          'fa fa-sticky-note': ticket.source_id == null,
                        }"
                        style="font-size: 24px"
                      ></i>
                      </td>
                      <td>
                        <h3 style="color:#183247; font-weight: bold" class="mt-0">
                        {{ ticket.subject }}
                        <br>
                        <span><small style="font-size: 12px;font-weight: inherit">{{ticket.contact_id != null ? `Created by ` : 'Received via email'}} <span v-if="ticket.contact_id != null" style="opacity: .8;">{{ticket.created_by.name}}</span></small></span>
                      </h3>
                      </td>
                    </tr>

                    <tr>
                      <td>
                        <div class="contact-avatar bg-success">
                          {{ticket.contactname.split(" ")[0][0]}}
                        </div>
                      </td>
                      <td>
                        <!-- <i class="fa fa-edit float-right text-muted" style="margin-top:-20px;"></i> -->
                        <div class="media mb-4">
                          <!-- <img class="d-flex me-3 rounded-circle avatar-sm" src="/assets/images/users/avatar-2.jpg"
                                      alt="Generic placeholder image"> -->
                          <div class="media-body">
                            <h5 class="font-size-14 mt-3">
                              <span style="font-weight: bold;color:#556ee6">{{ ticket.contactname }}</span> reported via {{this.$store.state.sources.filter((source) => source.id == ticket.source_id)[0].source}}
                              <br>
                              <span style="font-style: italic; font-size: 12px;">{{timeDifference}} ({{date}} at {{time}})</span>
                            </h5>
                            <!-- <small class="text-muted">{{ ticket.email }}</small> -->
                          </div>
                        </div>
                      </td>
                    </tr>
                    <tr>
                      <td></td>
                      <td>
                         <p>{{ ticket.description }}</p>
                      </td>
                    </tr>

                    <template v-for="(response, index) in ticketResponses">
                      <Reply v-if="'reply' in response " v-bind:reply="response" v-bind:contact="ticket.email" :key="index" />

                      <Note v-if="'note' in response" v-bind:note="response" :key="index" />
                    </template>

                    <!--REPLY SECITON FOR THE TICKET-->
                    <tr>
                      <td colspan="2">
                        <div class="reply-sections mb-1" v-if="replySection" id="reply-section">
                        <a
                          @click="activateAddReply"
                          class="btn btn-sm btn-success text-white waves-effect mt-4"
                        >
                          <i class="fa fa-reply"></i> Reply</a
                        >

                        <a
                          @click="activateAddNote" id="note-section"
                          class="ml-3 btn btn-sm btn-secondary waves-effect mt-4"
                        >
                          <i class="fa fa-book"></i> Add Note</a
                        >

                        <a
                          @click="activateForward" id="forward-section"
                          class="ml-3 btn btn-sm btn-secondary waves-effect mt-4"
                          ><i class="mdi mdi-forward"></i> Forward</a
                        >
                      </div>
                      </td>
                    </tr>
                    <!-- END OF REPLY SECITON FOR THE TICKET-->


                    <tr>
                      <td colspan="2">
                        <AddReply
                        v-if="isAddReply"
                        v-bind:cancelReply="cancelReply"
                        v-bind:confirmReply="confirmReply"
                        v-bind:fetcTicketDetails="fetcTicketDetails"
                        v-bind:ticket="ticket"
                      />
                      <AddNote
                        v-if="isAddNote"
                        v-bind:cancelNote="cancelNote"
                        v-bind:confirmNote="confirmNote"
                        v-bind:fetcTicketDetails="fetcTicketDetails"
                        v-bind:agents="agents"
                      />

                      <Forward
                        v-if="isForward"
                        v-bind:cancelForward="cancelForward"
                        v-bind:confirmForward="confirmForward"
                        v-bind:agents="agents"
                      />
                      </td>
                    </tr>

                  </table>
                  <!-- <div class="row">
                            <div class="col-xl-2 col-6">
                                <div class="card">
                                    <img class="card-img-top img-fluid" src="{{ URL::asset('/assets/images/small/img-3.jpg') }}"
                                        alt="Card image cap">
                                    <div class="py-2 text-center">
                                        <a href="" class="fw-medium">Download</a>
                                    </div>
                                </div>
                            </div>
                            <div class="col-xl-2 col-6">
                                <div class="card">
                                    <img class="card-img-top img-fluid" src="/assets/images/small/img-4.jpg'"
                                        alt="Card image cap">
                                    <div class="py-2 text-center">
                                        <a href="" class="fw-medium">Download</a>
                                    </div>
                                </div>
                            </div>
                        </div> -->
                </div>

              </div>
              <!-- filter -->
              <div
                class="col-lg-2 col-xxl-2 bg-light filter-div"
              >
                <div class="rounded filter-container">
                  <h6
                  v-if="ticket.id != null"
                    class="ml-3 mt-3"
                    style="display: flex; align-items: center"
                  >
                  <b>Priority:</b> &nbsp;&nbsp;
                    <span
                      v-bind:class="{
                        'bg-success': ticket.priority_id == 1,
                        'bg-info': ticket.priority_id == 2,
                        'bg-warning': ticket.priority_id == 3,
                        'bg-danger': ticket.priority_id == 4,
                        'bg-secondary': ticket.priority_id == null,
                      }"
                      style="
                        width: 100%;
                        height: 2px;
                        border-radius: 2px;
                        margin-right: 5px;
                      "
                    ></span>
                  </h6>
                  <h6
                    class="ml-3 mt-3"
                    style="display: flex; align-items: center"
                  >
                    <span v-if="ticket.id != null">
                      <b>Source: </b>&nbsp;
                      <i
                        v-bind:class="{
                          'fa fa-phone-alt text-info': ticket.source_id == 1,
                          'fa fa-list-alt text-secondary': ticket.source_id == 2,
                          'fa fa-envelope text-danger': ticket.source_id == 3,
                          'fab fa-whatsapp text-success': ticket.source_id == 4,
                          'fab fa-facebook': ticket.source_id == 5,
                          'fa fa-sticky-note text-warning': ticket.source_id == 6,
                          'fa fa-sticky-note text-warning': ticket.source_id == null,
                        }"
                        style="font-size: 13px"
                      ></i>
                    </span>
                  </h6>
                  <h6 class="ml-3 mt-3"><b>Created on:</b> &nbsp; {{ ticket.created_at ? ticket.created_at.split('T')[0] :"" }}</h6>
                  <hr class="mt-1 filter-hr" />
                  <div class="card-body scroll bg-light filter">
                    <form>
                      <p class="font-weight-bold properties">PROPERTIES</p>
                      <div class="input-filter-container">
                        <label for="formrow-agent" class="form-label">Agent</label>
                        <div class="form-control input-area">
                          <input type="text" @input="handleKeyboardEntry($event,'agents', 'backupAgents', 'name')" class="agent-input" @click="showOptions('isAgentOptions')" v-model="selectedAgent" placeholder="Any agent">
                          <svg xmlns="http://www.w3.org/2000/svg"  viewBox="0 0 32 32" class="app-icon app-icon--verysmall" data-test-dropdown="menu-sort" data-identifyElement="149"><path d="M8.626 9.744c-.875-.903-2.294-.903-3.17-.001s-.876 2.366-.001 3.268l8.959 9.244a2.195 2.195 0 003.171 0l8.959-9.244c.875-.903.874-2.366-.001-3.268s-2.295-.902-3.169.001L16 17.353 8.626 9.744z" data-identifyElement="150"></path></svg>
                        </div>
                        <div class="agent-options" v-if="isAgentOptions">
                          <div class="agent-option">
                            <div class="agent-option-item" v-if="agents.length == 0"  @click="selectAgent('none')">No results found</div>
                            <div class="agent-option-item" @click="selectAgent(user)">Me</div>
                            <div v-for="(agent, index) in agents" :key="index" >
                              <div v-if="agent.id != user.id" class="agent-option-item" @click="selectAgent(agent)"               
                              >{{ agent.name }}</div>
                            </div>
                          </div>
                        </div>
                      </div>

                      <div class="input-filter-container">
                        <label for="formrow-agent" class="form-label">Priority</label>
                        <div class="form-control input-area">
                          <input type="text" @input="handleKeyboardEntry($event,'priorities', 'backupPriorities', 'priority')" class="agent-input" @click="showOptions('isPriorityOptions')" v-model="selectedPriority" placeholder="Any priority">
                          <svg xmlns="http://www.w3.org/2000/svg"  viewBox="0 0 32 32" class="app-icon app-icon--verysmall" data-test-dropdown="menu-sort" data-identifyElement="149"><path d="M8.626 9.744c-.875-.903-2.294-.903-3.17-.001s-.876 2.366-.001 3.268l8.959 9.244a2.195 2.195 0 003.171 0l8.959-9.244c.875-.903.874-2.366-.001-3.268s-2.295-.902-3.169.001L16 17.353 8.626 9.744z" data-identifyElement="150"></path></svg>
                        </div>
                        <div class="agent-options" v-if="isPriorityOptions">
                          <div class="agent-option">
                            <div class="agent-option-item" v-if="priorities.length == 0"  @click="selectPriority('none')">No results found</div>
                              <div v-for="(priority, index) in priorities"
                            :key="index" class="agent-option-item" @click="selectPriority(priority)">{{ priority.priority }}</div>
                          </div>
                        </div>
                      </div>

                      <div class="input-filter-container">
                        <label for="formrow-agent" class="form-label">Status</label>
                        <div class="form-control input-area">
                          <input type="text" @input="handleKeyboardEntry($event,'statuses', 'backupStatuses', 'status')" class="agent-input" @click="showOptions('isStatusOptions')" v-model="selectedStatus" placeholder="Any status">
                          <svg xmlns="http://www.w3.org/2000/svg"  viewBox="0 0 32 32" class="app-icon app-icon--verysmall" data-test-dropdown="menu-sort" data-identifyElement="149"><path d="M8.626 9.744c-.875-.903-2.294-.903-3.17-.001s-.876 2.366-.001 3.268l8.959 9.244a2.195 2.195 0 003.171 0l8.959-9.244c.875-.903.874-2.366-.001-3.268s-2.295-.902-3.169.001L16 17.353 8.626 9.744z" data-identifyElement="150"></path></svg>
                        </div>
                        <div class="agent-options" v-if="isStatusOptions">
                          <div class="agent-option">
                            <div class="agent-option-item" v-if="statuses.length == 0"  @click="selectStatus('none')">No results found</div>
                              <div v-for="(status, index) in statuses"
                              :key="index" class="agent-option-item" @click="selectStatus(status)">{{ status.status }}</div>
                          </div>
                        </div>
                      </div>

                      <div class="input-filter-container">
                        <label for="formrow-agent" class="form-label">Type</label>
                        <div class="form-control input-area">
                          <input type="text" @input="handleKeyboardEntry($event,'types', 'backupTypes', 'type')" class="agent-input" @click="showOptions('isTypeOptions')" v-model="selectedType" placeholder="Any type">
                          <svg xmlns="http://www.w3.org/2000/svg"  viewBox="0 0 32 32" class="app-icon app-icon--verysmall" data-test-dropdown="menu-sort" data-identifyElement="149"><path d="M8.626 9.744c-.875-.903-2.294-.903-3.17-.001s-.876 2.366-.001 3.268l8.959 9.244a2.195 2.195 0 003.171 0l8.959-9.244c.875-.903.874-2.366-.001-3.268s-2.295-.902-3.169.001L16 17.353 8.626 9.744z" data-identifyElement="150"></path></svg>
                        </div>
                        <div class="agent-options" v-if="isTypeOptions">
                          <div class="agent-option">
                            <div class="agent-option-item" v-if="types.length == 0"  @click="selectType('none')">No results found</div>
                              <div v-for="(type, index) in types"
                            :key="index" class="agent-option-item" @click="selectType(type)">{{ type.type }}</div>
                          </div>
                        </div>
                      </div>

                      <div class="input-filter-container">
                        <label for="formrow-agent" class="form-label">Department</label>
                        <div class="form-control input-area">
                          <input type="text" @input="handleKeyboardEntry($event,'departments', 'backupDepartments', 'department')" class="agent-input" @click="showOptions('isDepartmentOptions')" v-model="selectedDepartment" placeholder="Any department">
                          <svg xmlns="http://www.w3.org/2000/svg"  viewBox="0 0 32 32" class="app-icon app-icon--verysmall" data-test-dropdown="menu-sort" data-identifyElement="149"><path d="M8.626 9.744c-.875-.903-2.294-.903-3.17-.001s-.876 2.366-.001 3.268l8.959 9.244a2.195 2.195 0 003.171 0l8.959-9.244c.875-.903.874-2.366-.001-3.268s-2.295-.902-3.169.001L16 17.353 8.626 9.744z" data-identifyElement="150"></path></svg>
                        </div>
                        <div class="agent-options" v-if="isDepartmentOptions">
                          <div class="agent-option">
                            <div class="agent-option-item" v-if="departments.length == 0"  @click="selectDepartment('none')">No results found</div>
                              <div v-for="(department, index) in departments"
                            :key="index" class="agent-option-item" @click="selectDepartment(department)">{{ department.department }}</div>
                          </div>
                        </div>
                      </div>
                    </form>
                  </div>
                  <!-- <div class="card-body mb-3">
                    <button
                      style="width: 100%"
                      href="#"
                      class="btn text-white btn-danger filter-btn"
                    >
                      UPDATE
                    </button>
                  </div> -->
                </div>
                
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <!-- Edit ticket Modal -->
    <edit-ticket
    v-bind:description="ticket.description"
    v-bind:subject="ticket.subject"
    v-bind:contact="ticket.contactname"
    v-bind:ticketId="ticket.id"
    >

    </edit-ticket>
  </div>
</template>
<script>
import EditTicket from "@/components/users/EditTicketModal.vue";
import Reply from "@/components/users/Reply2.vue";
import AddReply from "@/components/users/AddReply.vue";
import Note from "@/components/users/Note2.vue";
import AddNote from "@/components/users/AddNote.vue";
import Forward from "@/components/users/Forward.vue";
import store from "../../store"
import route from "../../router"
// import Notification from "@/components/ModalNotification.vue";
import axios from "axios";

export default {
  components: {
    Reply,
    EditTicket,
    AddReply,
    Note,
    AddNote,
    // Notification,
    Forward,
  },
  data() {
    return {
      ticket: null,
      replySection: true,
      isAddNote: false,
      isAddReply: false,
      isForward: false,
      notify: false,
      notificatonMessage: "",
      notificationTitle: "",
      notificationActivator: null,
      user: null,
      //OPTION VARIABLES
      isAgentOptions: false,
      isTypeOptions: false,
      isSourceOptions: false,
      isDepartmentOptions: false,
      isStatusOptions: false,
      isPriorityOptions: false,
      //END OF OPTION VARIABLES
    };
  },
  created(){
    this.ticket = store.state.tickets.filter((ticket) => ticket.id == route.currentRoute.params.ticketId)[0]
    console.log("Caught Ticket")
    console.log(this.ticket)
    if(this.ticket.status_id === 3){
      document.getElementById('close-button').classList.add('d-none');
    }
  },
  methods: {
//************* OPTION FUNCTIONS *************
    clearView(event){
      let classes = event.target.classList.value
      
      if(classes.toString().toLowerCase().indexOf("agent-input") >= 0){
        console.log("On Premises")
      }
      else {
        console.log("remove all the popups")
        this.hideAllOptions()
      }
    },
    hideAllOptions(){
      this.isContactOptions = false
      this.isAgentOptions = false
      this.isTypeOptions = false
      this.isSourceOptions = false
      this.isDepartmentOptions = false
      this.isStatusOptions = false
      this.isPriorityOptions = false
    },
    showOptions(optionActivator){
      this.hideAllOptions()
      this[optionActivator] = true
    },
    selectCategoryOption(categoryActivator,optionCategory, option, name){
      this[categoryActivator] = false
      this.ticket[`${optionCategory}_id`] = option.id
      this[`selected${name}`] = option[name.toLowerCase()]
    },
    async selectType(type){
      this.isTypeOptions = false
      this.ticket.type_id = type.id
      this.selectedType = type.type

      store.dispatch("startLoader")
      const response = await axios.post(
        `updatetickettype`,
        {
          ticketId: this.ticket.id,
          typeId: type.id,
        }
      );

      let data = response.data;

      if (data) {
        store.dispatch("stopLoader")
        this.$toasted.show("Ticket Type updated", {
          position: "top-right",
          theme: "toasted-primary",
          className: ["bg-success"],
          icon: {
            name: "fa fa-check-circle",
            after: false,
          },
        });
        let user = JSON.parse(sessionStorage.getItem('user'));
        this.$store.dispatch('fetchAllTickets', user.company_id);
      }else {
        store.dispatch("stopLoader")
      }
    },
    selectSource(source){
      this.isSourceOptions = false
      this.ticket.source_id = source.id
      this.selectedSource = source.source
    },
    async selectDepartment(department){
      this.isDepartmentOptions = false
      this.ticket.department_id = department.id
      this.selectedDepartment = department.department
      
      store.dispatch("startLoader")
      const response = await axios.post(
        `updateticketdepartment`,
        {
          ticketId: this.ticket.id,
          departmentId: department.id,
        }
      );

      let data = response.data;

      if (data) {
        store.dispatch("stopLoader")
        this.$toasted.show("Department updated", {
          position: "top-right",
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
      else {
        store.dispatch("stopLoader")
      }
    },
    async selectStatus(status){
      this.isStatusOptions = false
      this.ticket.status_id = status.id
      this.selectedStatus = status.status

      store.dispatch("startLoader")
      const response = await axios.post(
        `updateticketstatus`,
        {
        ticketId: this.ticket.id,
        statusId: status.id,
      }
      );

      let data = response.data;

      if (data) {
        store.dispatch("stopLoader")
        this.$emit("change", this.ticket.status_id);
        this.$toasted.show("Status updated", {
          position: "top-right",
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
      else {
        store.dispatch("stopLoader")
      }
    },
    async selectPriority(priority){
      this.isPriorityOptions = false
      this.ticket.priority_id = priority.id
      this.selectedPriority = priority.priority

      store.dispatch("startLoader")
      const response = await axios.post(
        `updateticketpriority`,
        {
          ticketId: this.ticket.id,
          priorityId: priority.id,
        }
      );

      let data = response.data;

      if (data) {
        store.dispatch("stopLoader")
        this.$toasted.show("Priority updated", {
          position: "top-right",
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
      else {
        store.dispatch("stopLoader")
      }
    },
    selectAgent(agent){
      this.isAgentOptions = false
      this.ticket.agent_assigned_id = agent.id
      this.selectedAgent = `${agent.name}`
    },
//************** END OF OPTION FUNCITONS *************

//************* INPUT/TYPE LISTENERS FUNCTIONS *************
    handleKeyboardEntry(event, primary, backup, name){
      // let foundMatch = false;
      if(event.target.value != " " || event.target.value != null || event.target.value != ""){
          // foundMatch = true
          this[primary] = this[backup]
          this[primary] = this[primary].filter(item => {
            if(item[name].toLowerCase().indexOf(event.target.value.toString().toLowerCase()) >= 0){
              return item
            }
          }).slice(0, 5)

          if(this[primary].length < 1) {
            // foundMatch = false
          }
      }
    },
//************* END OF INPUT/TYPE LISTENERS FUNCTIONS *************

//************* FETCH  FUNCTIONS *************
    // async fetcTicketDetails() {
    //   const response = await axios.get(
    //     `ticketdetails/${this.$route.params.ticketId}`
    //   );

    //   let data = response.data;
      
    //   console.log(data)

    //   let date = new Date(data.ticket.created_at),
    //       time = new Date(data.ticket.created_at),
    //       now  = new Date();

    //   this.timeDifference = ( ( now.getTime() - date.getTime() ) / ( 1000 * 60 * 60 * 24 ) ).toFixed()  <= 0 ?  
    //   `${( ( now.getTime() - date.getTime() ) / ( 1000 * 60 * 60 ) ).toFixed()} hours ago` : 
    //   `${( ( now.getTime() - date.getTime() ) / ( 1000 * 60 * 60 * 24 ) ).toFixed()} days ago`;

    //   date = date.toDateString()

    //   this.date = date.replace(" ", ", ")

    //   this.ticket = data.ticket;
      
    //   this.time = `${time.getHours()}:${time.getMinutes()}`

    //   this.ticketResponses = data.responses;

    //   console.log("ticket")
    //   console.log(data.ticket)

    //   this.selectedAgent = data.ticket.agent_assigned.name
    //   this.selectedType = this.types.filter((type)=> type.id == this.ticket.type_id)[0].type
    //   this.selectedDepartment =  this.departments.filter((department) => department.id == this.ticket.department_id)[0].department
    //   this.selectedStatus = this.statuses.filter((status) => status.id == this.ticket.status_id)[0].status
    //   this.selectedPriority = this.priorities.filter((priority) => priority.id == this.ticket.priority_id)[0].priority
    // },
    async fetctNextTicketDetails(ticketId) {
      const response = await axios.get(
        `ticketdetails/${ticketId}`
      );

      let data = response.data;

      this.ticket = data.ticket;

      this.ticketResponses = data.responses;
    },
//************* END OF FETCH FUNCTIONS *************

     deleteTicket(){
      this.$swal.fire({
        title: 'Are you sure?',
        text: "You won't be able to revert this!",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: 'bg-primary',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Yes, delete it!',
        showClass: {
        popup: 'animate__animated animate__fadeInDown'
        },
        hideClass: {
        popup: 'animate__animated animate__fadeOutUp'
        }
      }).then((result) => {
      if (result.isConfirmed) {
        axios.post(
        `deleteticket`,
        {ticketId: this.ticket.id}
        
      );
        this.fetctNextTicketDetails(this.$route.params.nextTicketId.id)
        this.$swal.fire(
          'Deleted!',
          'Ticket has been deleted.',
          'success'
        )
      }else if (result.dismiss === this.$swal.DismissReason.cancel) {
    this.$swal.fire(
      'Cancelled',
      'Ticket details still intact',
      'error'
    )
  }
      })
 
    },
    async markClosed(){
      let info = {
        ticketId: this.ticket.id,
        statusId: 3,
      };
      await axios.post(`closeticket`, info )
      .then((response)=>{
        response.data
        this.$toasted.show("Ticket closed successfully", {
          position: "top-right",
          theme: "toasted-primary",
          className: ["bg-success"],
          icon: {
            name: "fa fa-check-circle",
            after: false,
          },
        });
      })

    },
    activateAddReply() {
      this.replySection = false;
      this.isAddNote = false;
      this.isForward = false;
      this.isAddReply = true;
      document.getElementById('reply-section').scrollIntoView();
    },
    confirmReply() {
      this.notify = false;
      this.isAddReply = false;
      this.replySection = true;
      // this.ticketResponses.push(reply);
    },
    cancelReply() {
       this.$swal.fire({
        title: 'Are you sure?',
        text: "Your changes will be lost!",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: 'bg-primary',
        cancelButtonColor: '#d33',
        cancelButtonText:'DISMISS ',
        confirmButtonText: 'YES, CANCEL',
      }).then((result)=>{
        if (result.isConfirmed) {
          this.isAddReply = false;
          this.notify = false;
          this.replySection = true;
        }else{
          this.isAddReply = true;

        }

      })
    },
    activateAddNote() {
      // document.getElementById('note-section').scrollIntoView();
      this.replySection = false;
      this.isAddReply = false;
      this.isForward = false;
      this.isAddNote = true;
      document.getElementById('note-section').scrollIntoView();
    },
    confirmNote() {
      this.notify = false;
      this.isAddNote = false;
      this.replySection = true;
      // this.ticketResponses.push(note);
    },
    printPdf() {
      this.$easyPrint("exportPdf", "Documents", "portrait");
    },
    cancelNote() {
      this.$swal.fire({
        title: 'Are you sure?',
        text: "Your changes will be lost!",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: 'bg-primary',
        cancelButtonColor: '#d33',
        cancelButtonText:'DISMISS ',
        confirmButtonText: 'YES, CANCEL',
      }).then((result)=>{
        if (result.isConfirmed) {
          this.isAddNote = false;
          this.notify = false;
          this.replySection = true;
        }else{
          this.isAddNote = true;

        }

      })

      // this.notify = true;
      // this.notificationTitle = "Cancel Note!";
      // this.notificatonMessage = "Are you sure you want to cancel note?";
      // this.notificationActivator = "note";
    },
    confirmForward() {
      this.isAddNote = false;
      this.isForward = false;
      this.replySection = true;
    },
    activateForward() {
      this.replySection = false;
      this.isAddNote = false;
      this.isAddReply = false;
      this.isForward = true;
      document.getElementById('forward-section').scrollIntoView();
    },
    cancelForward() {
        this.$swal.fire({
        title: 'Are you sure?',
        text: "Your changes will be lost!",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: 'bg-primary',
        cancelButtonColor: '#d33',
        cancelButtonText:'DISMISS ',
        confirmButtonText: 'YES, CANCEL',
      }).then((result)=>{
        if (result.isConfirmed) {
          this.isForward = false;
          this.notify = false;
          this.replySection = true;
        }else{
          this.isForward = true;

        }
      })
    },
    closeNotification() {
      this.notify = false;
    },
    confirmNotification() {
      if (this.notificationActivator == "reply") {
        //do something
      } else if (this.notificationActivator == "note") {
        //do something
      }
      this.replySection = true;
      this.isAddNote = false;
      this.isAddReply = false;
      this.isForward = false;
      this.notify = false;
    },
    savePdf() {
      this.$PDFSave(this.$refs.exportPdf, "Documents");
    },    
  },
  computed:{
    selectedAgent: function(){
      return this.ticket.agent_assigned.name
    },
    selectedType: function(){
      return this.ticket.type.type
    },
    selectedDepartment: function(){
      return this.ticket.department.department
    },
    selectedStatus: function(){
      return this.ticket.status.status
    },
    selectedPriority: function(){
      return this.ticket.priority.priority
    },
    ticketResponses: function() {
      return [
        ...this.ticket.notes,
        ...this.ticket.replies
      ]
    },
    time: function() {
      let time = new Date(this.ticket.created_at)
      return `${time.getHours()}:${time.getMinutes()}`
    },
    date: function() {
      let date = new Date(this.ticket.created_at)

      date = date.toDateString()

      return date.replace(" ", ", ")
    },
    timeDifference: function() {
      let date = new Date(this.ticket.created_at),
          now  = new Date(),
          diff = "";

      console.log(now)
      console.log(date)
      if(( ( now.getTime() - date.getTime() ) / ( 1000 * 60 * 60 * 24 ) ).toFixed() <= 0) {
        if(( ( now.getTime() - date.getTime() ) / ( 1000 * 60 * 60 ) ).toFixed() <= 0){
          diff = `${( ( now.getTime() - date.getTime() ) / ( 1000 * 60 * 60 * 60 ) ).toFixed()} minutes ago`
        }
        else {
          diff = `${( ( now.getTime() - date.getTime() ) / ( 1000 * 60 * 60 ) ).toFixed()} hours ago`
        }
      }
      else {
        diff = `${( ( now.getTime() - date.getTime() ) / ( 1000 * 60 * 60 * 24 ) ).toFixed()} days ago`
      }
      return diff
    },
    agents: ()=> store.state.agents,
    backupAgents: ()=> store.state.agents,
    statuses: ()=> store.state.statuses,
    backupStatuses: ()=> store.state.statuses,
    priorities: ()=> store.state.priorities,
    backupPriorities: ()=> store.state.priorities,
    departments: ()=> store.state.departments,
    backupDepartments: ()=> store.state.departments,
    sources: ()=> store.state.sources,
    backupSources: ()=> store.state.sources,
    types: ()=> store.state.types,
    backupTypes: ()=> store.state.types,
  }
};
</script>
<style scoped>
/** 
**new filters  styles 
**
*/
.input-filter-container {
  position: relative;
  margin-bottom: 15px;
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
  height: 32px;
  padding-left: 2px;
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
  top: 62px;
  width: 100%;
  min-height: 50px;
  max-height: 200px;
  border-radius: 6px;
  background: #fff;
  box-shadow: 2px 2px 10px rgba(0, 0, 0, 0.2);
  z-index: 10;
  padding: 5px 7px;
  overflow-y: hidden;
}
.agent-option-item {
  border-radius: 4px !important;
  width: 100% !important;
  margin: 8px 0px !important;
  padding: 5px;
}
.agent-option-item:hover {
  cursor: pointer;
  background: #f5f7f9;
}
@keyframes slideDownFilterOptions {
  0% {
    top: 50px;
  }
  100% {
    top: 62px;
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
table { 
    border-collapse: separate; 
    border-spacing: 0 10px; 
    margin-top: -10px; /* correct offset on first border spacing if desired */
}
.contact-avatar {
  background: rgb(197, 248, 94);
  display: flex;
  justify-content: center;
  align-items: center;
  height: 30px;
  width: 30px;
  border-radius: 6px;
  margin-top: -15px;
  margin-left: 8px;
}
tr td:first-child {
  margin-right: 8px;
  margin-left: 5px;
  border-top-left-radius: 1px;
  border-bottom-left-radius: 1px;
}
tr td:last-child {
  border-top-right-radius: 1px;
  border-bottom-right-radius: 1px;
  width: 100%;
  padding-right: 5px !important;
}
.custom-row {
  border-radius: 8px !important;
  background: #f6f7f9;
  padding-left: 5px;
}
.custom-row.note {
  background: #fef1e1;
}
.ticket-subject-source {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%;
  padding: 2px 0px 5px 10px;
}
.animate__animated.animate__fadeInDown {
  --animate-duration: 2s;
}
.bg-urgent {
  background: red !important;
}
.content {
  margin-left: 120px;
}
.right-nav {
  margin-left: 350px;
}
.right-subnav {
  float: right;
  margin-right: 140px;
  /* margin-top: -40px; */
  padding-top: 10px;
}
.listview {
  margin-top: 70px;
  margin-left: -70px;
}
.prev {
  margin-right: 10px;
}
.options-btn {
  display: inline-block;
}
.left-subnav {
  max-width: 70vw;
  margin-left: 0px;
  align-items: center;
  margin-top: 8px;
}
.options {
  margin-right: 100px;
}
.actions {
  margin-top: -25px;
  height: 60px;
  margin-left: -60px;
  position: fixed;
  z-index: 2;
  min-width: 100%;
  box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2);
}
.xxl-actions {
  display: inline-block;
}
.body {
  margin-top: 20px;
}
.action {
  margin-left: 10px;
  margin-top: 10px;
}
i {
  margin-right: 5px;
}
h4 i {
  font-size: 15px;
}
.details {
  margin-top: -20px;
}
.details-div {
  margin-left: 5px;
}
.filter-div {
  margin-top: -30px;
  position: fixed;
  right: 0;
  width: 300px;
  max-height: 100%;
}
.filter {
  margin-top: 0px;
  height: 58vh;
  /* height: 360px; */
  max-height: 100%;
}
.filter-container {
  width: 100%;
}
.card-body button {
  width: 100%;
}
.properties {
  font-size: 12px;
  color: hsla(0, 9%, 13%, 0.412);
  margin-top: -20px;
}
hr {
  width: 230px;
  margin-left: 10px;
  height: 0.7px;
}
.icons {
  font-size: 30px;
  margin-left: -30px;
  margin-top: -30px;
}
.scroll {
  overflow-y: scroll;
}
.filter-btn {
  height: 30px;
  max-width: 100%;
}
.contact-div {
  margin-top: -30px;
  right: -20px;
  position: fixed;
}
.contact-card {
  height: 300px;
  overflow: hidden;
}
.more-text {
  margin-top: 25px;
  font-size: 13px;
}
.modal.fade:not(.in).right .modal-dialog {
  -webkit-transform: translate3d(-25%, 0, 0);
  transform: translate3d(75%, 0, 0);
}
.xxl-actions {
  display: none;
}
@media screen and (min-width: 2000px) {
  .xxl-actions {
    display: inline-block;
  }
  .options {
    display: none;
  }
  .actions {
    min-width: 100%;
  }
  .right-subnav {
    margin-right: 160px;
  }
  .filter-div {
    max-height: 100vh;
    right: 0;
    position: fixed;
  }
  .filter {
    max-height: 100%;
    height: 100%;
  }
  .contact-div {
    position: fixed;
    right: 0;
    width: 290px;
  
  }
  .filter-btn {
    position: relative;
    margin-top: 10px;
  }
  .filter-hr {
    min-width: 100%;
  }
  /* .xxl-actions{
  display: none;
} */
}
</style>

