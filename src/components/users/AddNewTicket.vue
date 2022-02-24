<template>
  <div class="content">
    <div id="main-content">
      <div class="page-content">
        <div class="container-fluid">
          <div class="row" @click="clearView">
            <div class="card col-md-8 col-xxl-8 overflow-hidden">
              <div class="bg-primary bg-soft">
                <div class="text-primary p-3">
                  <h5 class="text-primary text-center">New Ticket!</h5>
                </div>
              </div>
              <div class="card-body pt-0 mt-3">
                <form
                  @submit.prevent="addTicket"
                >
                    <div style="position: relative; !important">
                        <p>All Fields marked with * are compulsory</p>
                      <div class="mb-3">
                        <div class="input-filter-container">
                          <label for="formrow-agent" class="form-label">Contact</label>
                          <div class="form-control input-area">
                            <input type="text" @input="handleKeyboardEntry($event,'contacts', 'backupContacts', 'name')" class="agent-input" @click="showOptions('isContactOptions')" v-model="selectedContact" placeholder="Any contact">
                            <svg xmlns="http://www.w3.org/2000/svg"  viewBox="0 0 32 32" class="app-icon app-icon--verysmall" data-test-dropdown="menu-sort" data-identifyElement="149"><path d="M8.626 9.744c-.875-.903-2.294-.903-3.17-.001s-.876 2.366-.001 3.268l8.959 9.244a2.195 2.195 0 003.171 0l8.959-9.244c.875-.903.874-2.366-.001-3.268s-2.295-.902-3.169.001L16 17.353 8.626 9.744z" data-identifyElement="150"></path></svg>
                          </div>
                          <div class="agent-options" v-if="isContactOptions">
                            <div class="agent-option">
                              <div class="agent-option-item" v-if="contacts.length == 0"  @click="selectContact('none')">No results found</div>
                              <div v-for="(contact, index) in contacts" :key="index" >
                                <div class="agent-option-item" @click="selectContact(contact)"               
                                >{{ contact.name }}</div>
                              </div>
                            </div>
                          </div>
                        </div>
                          <span
                          style="margin-top: 10px; background: red;"
                            class="new-contact-span text-danger d-none"
                            id="cancel-text"
                          >Cancel</span>
                            <router-link to="/addnewcontact"> <span
                              class="new-contact-span text-primary pr-3"
                              id="new-contact-text"
                            >Add New Contact</span></router-link>
                    </div>

                      <div  class="card suggestions" v-if="suggestions.isContact">
                      <div>
                        <div v-for="(contact, index) in contacts" :key="index" class="suggested" id="suggested" @click="selectContact(index)">
                          <div class="avatar">{{contact.name.split(' ')[0][0]}}{{contact.name.split(' ')[1][0] ? contact.name.split(' ')[1][0] : ""}}</div>
                          <div class="details">
                            <span class="name">{{contact.name}}</span>
                            <span class="email small">{{contact.email}}</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <!-- <div
                    class="d-none"
                    id="addcontactdiv"
                  >
                    <div class="mb-3">
                      <label
                        for="formrow-email-input"
                        class="form-label"
                      >Email
                        <font-awesome-icon
                          icon="asterisk"
                          class="required fa-2x text-danger"
                        />
                        </label>
                        <input
                          type="email"
                          class="form-control"
                          name="email"
                          id="formrow-email-input"
                          v-model="ticket.email"
                          
                        />
                    </div>
                    <div class="mb-3">
                      <label
                        for="formrow-phone-input"
                        class="form-label"
                      >Phone
                        <font-awesome-icon
                          icon="asterisk"
                          class="required fa-2x text-danger"
                        />
                        </label>
                        <input
                          type="phone"
                          class="form-control"
                          name="contact"
                          id="formrow-phone-input"
                         v-model="ticket.contact"
                        />
                    </div>
                    <div class="mb-3">
                      <label
                        for="formrow-company-input"
                        class="form-label"
                      >Company</label>
                        <input
                          type="text"
                          class="form-control"
                          name="company"
                          id="formrow-company-input"
                          v-model="ticket.company"
                        />
                    </div>
              </div> -->
              <div class="mb-3">
                <label
                  for="formrow-subject-input"
                  class="form-label"
                  required
                >Subject
                  <font-awesome-icon
                    icon="asterisk"
                    class="required fa-2x text-danger"
                  />
                  </label>
                  <input
                    @focus="hideAllOptions"
                    @click="hideAllOptions"
                    type="text"
                    class="form-control"
                    name="subject"
                    id="formrow-subject-input"
                    v-model="ticket.subject"
                    autocomplete="none"
                  />
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
                  <label for="formrow-agent" class="form-label">Source</label>
                  <div class="form-control input-area">
                    <input type="text" @input="handleKeyboardEntry($event,'sources', 'backupSources', 'source')" class="agent-input" @click="showOptions('isSourceOptions')" v-model="selectedSource" placeholder="Any source">
                    <svg xmlns="http://www.w3.org/2000/svg"  viewBox="0 0 32 32" class="app-icon app-icon--verysmall" data-test-dropdown="menu-sort" data-identifyElement="149"><path d="M8.626 9.744c-.875-.903-2.294-.903-3.17-.001s-.876 2.366-.001 3.268l8.959 9.244a2.195 2.195 0 003.171 0l8.959-9.244c.875-.903.874-2.366-.001-3.268s-2.295-.902-3.169.001L16 17.353 8.626 9.744z" data-identifyElement="150"></path></svg>
                  </div>
                  <div class="agent-options" v-if="isSourceOptions">
                    <div class="agent-option">
                      <div class="agent-option-item" v-if="sources.length == 0"  @click="selectSource('none')">No results found</div>
                        <div v-for="(source, index) in sources"
                        :key="index" class="agent-option-item" @click="selectSource(source)">{{ source.source }}</div>
                    </div>
                  </div>
              </div>

              <div class="row">
                <div class="col-lg-4">
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
                </div>
                <div class="col-lg-4">
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
                </div>

                <div class="col-lg-4">
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
                </div>
              </div>

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

              <div class="mb-3">
                <label
                  for="formrow-group"
                  class="form-label"
                >Description
                  <font-awesome-icon
                    icon="asterisk"
                    class="required fa-2x text-danger"
                  />
                  </label>
                  <div>
                    <textarea
                    @focus="hideAllOptions"
                    @click="hideAllOptions"
                      required
                      class="form-control"
                      name="description"
                      rows="8"
                      v-model="ticket.description"
                    ></textarea>
                  </div>
              </div>
              <div>
                
                  <input class="form-check-input ml-1 ticket-check" type="checkbox" value="" id="flexCheckDefault">
                  <label class="form-check-label  ml-4 ticket-check-label" for="flexCheckDefault">
                    Create Another
                  </label>
              <div class="btn-group dropdown float-right">
               
                 <a
                  @click="addTicket"
                    class="
                        btn
                        btn-sm
                        form-btn
                        float-right   
                        btn-primary
                       text-white
                        waves-effect waves-light
                        w-md
                      "
                    type="submit"
                  >Create
                </a>
                 <button type="button" class="btn-sm btn-primary btn dropdown-toggle text-white
                        waves-effect waves-light
                        w-mdwaves-effect waves-light" data-bs-toggle="dropdown" aria-expanded="false">
                  
                </button>
                <ul class="dropdown-menu">
                  <li><a class="dropdown-item close-dropdown" @click="closeTicket" >Create and set as close</a></li>
                 
                </ul>
              </div>
             
                <router-link to="/AllTickets"
                    href="javascript: void(0);"
                    class="
                        btn
                        btn-sm
                        float-right   
                        btn-light
                        mr-3
                        waves-effect waves-light delete
                        w-md
                      "
                    type="submit"
                  >
                    <i class="fa fa-times-circle p-1"></i>Cancel
                </router-link>
              </div>
              </form>
            </div>
          </div>
          <!-- col 2 -->
          <div class="card col-lg-3 contact-card  ">
            <div class="bg-light">
              <div class="mt-2">
                <i class="fa fa-info font-italic float-left ml-2 mt-1 mr-3"></i>
                <p class="text-dark">CONTACT DETAILS</p>
              </div>
            </div>
            <div class="row d-flex justify-content-center mt-5 details-div ">
              <i class="far icons text-center fa-user mb-3"></i>
              <p class="text-dark font-weight-light text-center d-none">looks like someone new!</p>
              <p class="text-dark font-weight-bold text-center">Pick a contact</p>
              <p class="text-muted font-size-10 font-weight-light text-center">Their details will appear here!</p>

              <!-- <div class="details-div col-md-9">
                  <p>Name:</p>
                  <strong>{{ ticket.contactname }}</strong>
                  <p>Email:</p>
                  <strong>{{ ticket.email }} </strong>
                  <p>Phone:</p>
                  <strong>{{ ticket.contact }}</strong>
                </div> -->
              <!-- <div class="col-md-3">
                </div> -->
            </div>
            <a
              class="text-start mt-5 d-none"
              href="#"
            >View more
              <i class="mdi mdi-arrow-right"></i>
              </a>
          </div>
        </div>
      </div>
      <!-- container-fluid -->
    </div>
  </div>
  </div>
</template>
<script>
import axios from "axios";
import store from "../../store"
// let show = true;
export default {
  name: "AddNewTicket",
  data() {
    return {
      suggestions: {
        isContact: false,
        isAgent: false,
      },
      // DATA BUCKETS
      user: null,
      // END OF DATA BUCKETS
      ticket: {
        contact_id: null,
        contactname: "SoftDesk",
        email: "bewavamuno@projectcode.ug",
        phone: "0753659098",
        subject: "",
        created_by: null,
        type_id: null,
        source_id: null,
        status_id: null,
        priority_id: null,
        department_id: null,
        agent_assigned_id: null,
        company_id: 1,
        description: " ",
        duedays: 2,
      },
      //OPTION VARIABLES
      isContactOptions: false,
      selectedContact: '',
      isAgentOptions: false,
      selectedAgent: '',
      isTypeOptions: false,
      selectedType: '',
      isSourceOptions: false,
      selectedSource: '',
      isDepartmentOptions: false,
      selectedDepartment: '',
      isStatusOptions: false,
      selectedStatus: '',
      isPriorityOptions: false,
      selectedPriority: '',
      //END OF OPTION VARIABLES
      contact: null,
      agent: null,
    };
  },
  mounted(){
    let user = JSON.parse(sessionStorage.getItem('user'));
    this.user = user
    this.ticket.created_by = user.id
    this.ticket.company_id = user.company_id
  },
  computed: {
    contacts(){
      return store.state.contacts
    },
    backupContacts(){
      return store.state.contacts
    },
    componentContacts(){
      return store.state.contacts
    },
    agents(){
      return store.state.agents
    },
    backupAgents(){
      return store.state.agents
    },
    componentAgents(){
      return store.state.agents
    },
    statuses(){
      return store.state.statuses
    },
    backupStatuses(){
      return store.state.statuses
    },
    sources(){
      return store.state.sources
    },
    backupSources(){
      return store.state.sources
    },
    priorities(){
      return store.state.priorities
    },
    backupPriorities(){
      return store.state.priorities
    },
    types(){
      return store.state.types
    },
    backupTypes(){
      return store.state.types
    },
    departments(){
      return store.state.departments
    },
    backupDepartments(){
      return store.state.departments
    },
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
    selectType(type){
      this.isTypeOptions = false
      this.ticket.type_id = type.id
      this.selectedType = type.type
    },
    selectSource(source){
      this.isSourceOptions = false
      this.ticket.source_id = source.id
      this.selectedSource = source.source
    },
    selectDepartment(department){
      this.isDepartmentOptions = false
      this.ticket.department_id = department.id
      this.selectedDepartment = department.department
    },
    selectStatus(status){
      this.isStatusOptions = false
      this.ticket.status_id = status.id
      this.selectedStatus = status.status
    },
    selectPriority(priority){
      this.isPriorityOptions = false
      this.ticket.priority_id = priority.id
      this.selectedPriority = priority.priority
    },
    selectAgent(agent){
      this.isAgentOptions = false
      this.ticket.agent_assigned_id = agent.id
      this.selectedAgent = `${agent.name} <${agent.email}>`
    },
    selectContact(contact){
      this.isContactOptions = false
      this.ticket.contact_id = contact.id
      this.ticket.contactname = contact.name
      this.ticket.email = contact.email
      this.ticket.phone = contact.phone
      this.selectedContact = `${contact.name} <${contact.email}>`
    },
//************** END OF OPTION FUNCITONS *************


//************* INPUT/TYPE LISTENERS FUNCTIONS *************
    handleKeyboardEntry(event, primary, backup, name){
      let foundMatch = false;
      if(event.target.value != " " || event.target.value != null || event.target.value != ""){
          foundMatch = true
          this[primary] = this[backup]
          this[primary] = this[primary].filter(item => {
            if(item[name].toLowerCase().indexOf(event.target.value.toString().toLowerCase()) >= 0){
              return item
            }
          }).slice(0, 5)

          if(this[primary].length < 1) {
            foundMatch = false
            console.log(foundMatch)
          }
      }
    },
//************* END OF INPUT/TYPE LISTENERS FUNCTIONS *************
    validateTicket(){
        if (this.ticket.priority_id == 3) {
                this.ticket.duedays = 3;
              } else if (this.ticket.priority_id == 1) {
                this.ticket.duedays = 7;
              } else if (this.ticket.priority_id == 4) {
                this.ticket.duedays = 2;
              } else {
                this.ticket.duedays = 4;
              }
              let user = JSON.parse(sessionStorage.getItem('user'));

              this.ticket.company_id = user.company_id
    },
    resetModeledData(){
      //reset all the modeled data
            this.selectedAgent = ''
            this.selectedType = ""
            this.selectedSource = ""
            this.selectedStatus = ""
            this.selectedPriority = ""
            this.selectedDepartment = ""
            this.selectContact = ""
            //reset the ticket bucket
            this.ticket = {
              contact_id: null,
              contactname: "SoftDesk",
              email: "bewavamuno@projectcode.ug",
              phone: "0753659098",
              subject: "",
              type_id: null,
              source_id: null,
              status_id: null,
              priority_id: null,
              department_id: null,
              agent_assigned_id: null,
              company_id: 1,
              description: " ",
              duedays: 2,
            }
    },
    async addTicket() {
      this.validateTicket();
      await axios.post('tickets', this.ticket)
        .then(response => {
          this.$store.dispatch("createTicket", response.data);

          if(document.getElementById('flexCheckDefault').checked){
            this.$toasted.show("Ticket successfully added..!");
            this.resetModeledData()
          }else{
          this.$toasted.show("Ticket successfully added..!");
          this.resetModeledData()
          
          this.$router.push(`/ticketdetails/${response.data.id}`);
          }

        })
        .catch(err => console.log(err));
          this.ticket = {
            contactname: " ",
            contact: " ",
            description: " "
          };
    },
    async closeTicket(){
      this.validateTicket();
      await axios.post('tickets', this.ticket)
        .then(response => {
          this.$store.dispatch("createTicket", response.data);
          let info = {
              ticketId: response.data.id,
              statusId: 3,
            }
            axios.post(`closeticket`, info )
            .then((response)=>{
              response.data
              this.$toasted.show("Ticket created and closed successfully", {
                position: "bottom-right",
                theme: "toasted-primary",
                className: ["bg-success"],
                icon: {
                  name: "fa fa-check-circle",
                  after: false,
                },
              });
            });
          if(document.getElementById('flexCheckDefault').checked){
            this.agent = null
            this.contact = null
            document.querySelector('.agent-input').value = ""
            document.querySelector('.contact-input').value = ""
          }
          else{
          this.agent = null
          this.contact = null
          document.querySelector('.agent-input').value = ""
          document.querySelector('.contact-input').value = ""
          this.$router.push(`/ticketdetails/${response.data.id}`);
          } 
        })
        .catch(err => console.log(err));
          this.ticket = {
            contactname: " ",
            contact: " ",
            description: " "
          };

    },
    dueDate(dateObj, numDays) {
      dateObj.setDate(dateObj.getDate() + numDays);
      return dateObj;
    },
    
  }
};
</script>
<!-- Add "scoped" attribute to limit CSS to this component only -->
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
.suggested {
  display: flex;
  align-items: center;
  margin-bottom: 5px;
  padding: 5px 0px 5px 10px;
  font-size: 14.5px;
}
.suggested:hover {
  background: #eff2f7;
  cursor: pointer;
}
.head {
  margin-bottom: 10px;
  margin-left: 10px;
  color: rgb(14, 28, 49);
}
.ticket-check-label{
margin-top:5px;
font-size:14px;
color: rgb(5, 32, 73);
}
.ticket-check{
  margin-top: 6px;
}
.close-dropdown{
  margin-left:5px;
  border-radius: 8px;
  background-color: rgb(238, 239, 241) !important;
  cursor: pointer;
}
.close-dropdown:hover{
  background-color: rgb(238, 239, 241) !important;
  cursor: pointer;
}
.suggested .avatar {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 35px;
  height: 35px;
  background: #f5f5f5;
  border-radius: 50%;
  margin-right: 10px;
}
.suggested .details {
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
}
.suggested .details span {
  margin: 0px !important;
  padding: 0px !important;
}
.suggestions {
  position: absolute;
  min-width: 300px; 
  min-height: 50px; 
  padding: 5px;
  position: absolute;
  z-index: 20;
  top: 108px;
  left: 0px;
  box-shadow: 5px 5px 10px rgba(0,0,0, .1),-5px -5px 10px rgba(0,0,0, .1);
}
.suggestions.agents {
  top: 69px !important;
}
.suggestions.hide {
  display: none !important;
}
.content {
  margin-left: 120px;
}
.required {
  font-size: 9px;
}
.form-btn {
  float: right;
  /* margin-right: 5px; */
}
.new-contact-span {
  float: right;
  margin-top: 5px;
}
.new-contact-span:hover {
  cursor: pointer;
}
.icons {
  font-size: 55px;
  float: right;
  margin-top: 30px;
}
.details-div {
  position: absolute;
  bottom: 0;
}
label {
  font-size: 11px;
}
.contact-div {
  margin-top: 30px;
}
.contact-card {
  border-radius: 8px;
  /* width: 330px; */
  position: fixed;
  border: 1px solid rgba(133, 130, 130, 0.281);
  right: 1%;
  height: 260px;
  width: 260px;
  /* margin-left: 30px; */
}
.delete {
  transition: 300ms ease-out;
}
.delete:hover {
  background: #f46a6a;
  color: white;
  cursor: pointer;
}
</style>
