<template>
  <div class="content">
    <div id="main-content">
      <div class="page-content">
        <div class="container-fluid">
          <!-- actions -->
          <div class="actions bg-light row">
            <div class="left-subnav  col-6 float-left">
              <div style="margin-left: 40px" class="left-subnav" id="leftnav">
                <input
                
                  type="checkbox"
                  class="form-check-input select-check mt-2"
                  id="exampleCheck1"
                  @click="toggleSelection"
                />
                <!-- <label
                    for="paginate"
                    class="text-nowrap mb-0 ml-3"
                  >Per Page: </label>
                    <select
                      class=" form-control-sm border-light ml-1 pl-0"
                      style="width:50px;"
                    >
                      <option value="10">10</option>
                      <option value="20">20</option>
                      <option value="30">30</option>

                      </select> -->
                <label for="sort" id="sort-label" class="select-span"
                  >Sort By:</label
                >

                <select
                  id="sort"
                  class="form-control-sm border-light ml-1 pl-0"
                  v-model="sort_value"
                >
                  <option value="createdAt">Date Created</option>
                  <option value="updatedAt">Last modified</option>
                  <option value="priority">Priority</option>
                  <option value="status">Status</option>
                </select>
                
                <!-- <a class="btn btn-light border-secondary btn-sm d-none action">
                            <i class="fa fa-user-plus"></i>Assign</a> -->
                <!-- <a class="btn btn-light border-secondary btn-sm d-none action">
                            <i class="fa fa-ban"></i>Close</a> -->
                <!-- <a class="btn bg-muted border-secondary btn-sm d-none import-btn action">
                  <i class="fa fa-object-group"></i>Merge</a
                > -->
                <a class="btn btn-light border-secondary btn-sm d-none import-btn action" @click="deleteAllTickets">
                  <i class="fa fa-trash-alt"></i>Delete</a
                >
                 <!-- <a
                  class="
                    btn btn-light
                    text-muted
                    border-secondary
                    searchicon1
                    btn-sm
                  "
                  @click="showListSearch"
                  id="search-icon"
                >
                  <i class="fa fa-search"></i>
                </a> -->
                <!-- <input
                  class="form-control form-control-sm mr-sm-2"
                  type="search"
                  id="searchbar-right"
                  placeholder="Search tickets"
                  aria-label="Search"
                  v-model="searchterm"
                /> -->
                <!-- <input
                  class="
                    form-control form-control-sm
                    mr-sm-2
                    float-right
                  "
                  type="search"
                  id="searchbar1"
                  placeholder="Search tickets"
                  aria-label="Search"
                  v-model="searchterm"
                /> -->
              </div>
            </div>
            <div class="col-6 right-subnav" style="margin-right: 0px;width: 400px; display:flex; align-items: flex-end;justify-content: space-between">
               <div style="display:flex; align-items: flex-end; margin-left: 4px; position: relative;">
                 <label
                    for="paginate"
                    class="text-nowrap mb-0 ml-3"
                    style="font-size: 13px;font-weight: 600; color: #6f7c87;"
                >Layout: </label>
                <div class="view-types" style="font-size: 13px;color:#183247 !important;" @click="toggleLayoutOptions"> 
                  <input type="text" :value="layout == 'cardview' ? 'Card view' : 'Table view'" readonly >
                  <svg xmlns="http://www.w3.org/2000/svg"  viewBox="0 0 32 32" class="app-icon app-icon--verysmall" data-test-dropdown="menu-sort" data-identifyElement="149"><path d="M8.626 9.744c-.875-.903-2.294-.903-3.17-.001s-.876 2.366-.001 3.268l8.959 9.244a2.195 2.195 0 003.171 0l8.959-9.244c.875-.903.874-2.366-.001-3.268s-2.295-.902-3.169.001L16 17.353 8.626 9.744z" data-identifyElement="150"></path></svg>
                  </div>

                  <div class="view-options" v-if="isLayoutOptions">
                    <div class="view-option" @click="changeLayout('cardview')">
                      <span class="view-option-label" :class="{'active': layout == 'cardview'}">Card view </span>
                      <span>
                        <svg v-if="layout == 'cardview'" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 128 128" class="app-icon app-icon--small selectedtick"><path d="M110.6 27.5c-3.2-2.4-7.8-1.7-10.6 1.2L52.2 78.2c-1.7 1.8-4.6 1.8-6.3 0L28 59.7c-2.8-2.9-7.4-3.6-10.6-1.2-4.1 3.1-4.5 9.1-1 12.6l29.5 30.5c1.8 1.8 4.6 1.8 6.4 0L111.8 40c3.3-3.5 3-9.5-1.2-12.5z"></path></svg>
                      </span>
                    </div>
                    <div class="view-option" @click="changeLayout('tableview')">
                      <span class="view-option-label" :class="{'active': layout == 'tableview'}">Table view </span>
                      <span>
                        <svg v-if="layout == 'tableview'" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 128 128" class="app-icon app-icon--small selectedtick"><path d="M110.6 27.5c-3.2-2.4-7.8-1.7-10.6 1.2L52.2 78.2c-1.7 1.8-4.6 1.8-6.3 0L28 59.7c-2.8-2.9-7.4-3.6-10.6-1.2-4.1 3.1-4.5 9.1-1 12.6l29.5 30.5c1.8 1.8 4.6 1.8 6.4 0L111.8 40c3.3-3.5 3-9.5-1.2-12.5z"></path></svg>
                      </span>
                    </div>
                  </div>
               </div>
                <!-- <select
                  class="form-control-sm bg-light border-light ml-1 pl-0"
                  v-model="layout" 
                  
                >
                  <option value="cardview">card view</option>
                  <option value="tableview">Table View</option>

                  </select> -->
                  
                <!-- <a 
                  class="btn btn-light border-secondary btn-sm ml-1 float-right"
                  @click="page++"
                  v-if="page < pages.length"
                >
                  <i class="fa fa-angle-right"></i>
                </a>
                <a
                  class="
                    btn btn-light
                    border-secondary
                    btn-sm
                    prev
                    ml-1
                    float-right
                  "
                  v-if="page != 1"
                  @click="page--"
                >
                  <i class="fa fa-angle-left"></i>
                </a> -->
                <!-- <p
                  class="float-right mt-1 pl-1 mr-1"
                  v-if="tickets != undefined && tickets.length >= 10"
                >
                  showing 1 - {{ perPage }} of {{ tickets.length }}
                </p> -->
                <!-- <p
                    class="float-right mt-1 pl-1 mr-1"
                    v-else-if="tickets!=undefined && tickets.length < 10"
                  >showing All </p> -->
                <div class="dropdown float-right options">
                  <a
                    class="btn btn-light border-secondary btn-sm mr-1 import-btn"
                    data-toggle="modal"
                    data-target="#uploadModal"
                  >
                    <i class="fa fa-download"></i>Import</a
                  >
                  <a
                    class="btn btn-light border-secondary btn-sm mr-1 import-btn"
                    data-bs-toggle="dropdown"
                  >
                    <i class="fa fa-upload"></i>Export</a
                  >
                  <ul
                    class="dropdown-menu"
                    aria-labelledby="dropdownMenuButton1"
                  >
                    <export-excel :data="tickets" name="ticketlist.xls">
                      <li>
                        <a class="dropdown-item">
                          <i class="fa fa-file-excel text-success"> </i>to
                          Excel</a
                        >
                      </li>
                    </export-excel>
                    <export-excel
                      :data="tickets"
                      name="ticketlist.csv"
                      type="csv"
                    >
                      <li>
                        <a class="dropdown-item">
                          <i class="fa fa-file text-danger"></i>to CSV</a
                        >
                      </li>
                    </export-excel>
                  </ul>
                </div>
            </div>
          </div>
        </div>
        <div @click="closeAllPopups" class="row" style="width: 100%;margin-left; 0px; margin-right:0px">
          <empty-view v-if="tickets.length==0" ></empty-view>
          <div  class="d-none" id="searchfeedback"> No search results found</div>
          
          <div class="col-lg-9 col-md-8 col-xxl-11 listview" >
                <div class="outer-ticket-item-container" v-for="(ticket, index) in sortTicketsArray"
                  :key="index">
                <ticketlistitem  class="ticketlist-item" v-if="layout==='cardview'"
                    v-bind:ticket="ticket"
                    v-bind:statuses="statuses"
                    v-bind:priorities="priorities"
                    v-bind:departments="departments"
                    v-bind:nextTicketId="filteredTickets[index+1]"
                    v-bind:activeCardIndex="2"
                    v-bind:cardIndex="index"
                  />
              </div>
              <div>
              <ticket-table v-if="layout==='tableview' && pageOfItems.length>0" class="col-md-11"
                    v-bind:tickets="pageOfItems"></ticket-table>
                </div>
          </div>


            <!-- <div class="col-lg-9 col-md-8 col-xxl-10 listview">
              <div
                style="position: relative"
                v-for="(ticket, index) in pageOfItems"
                :key="index"
              >
                <ticketlistitem
                  class="ticketlist-item"
                  v-bind:ticket="ticket"
                  v-bind:statuses="statuses"
                  v-bind:priorities="priorities"
                  v-bind:departments="departments"
                  v-bind:nextTicketId="filteredTickets[index + 1]"
                />
              </div>
            </div> -->

            <div class="col-lg-2 col-xxl-2 bg-light
                card
                border-primary
                filter
                fixed
                p-1">
              
              <h6 class="ml-3 mt-4 mb-3 pt-2">FILTERS</h6>
              <div style="width: 240px; margin-left: 19px">
              </div>
              <div class="card-body scroll">
                <form>

                  <div class="input-filter-container">
                    <label for="formrow-agent" class="form-label">Created</label>
                    <div class="form-control input-area">
                      <input type="text" class="agent-input" @click="showDateTimeRangeOptions" v-model="selectedDateTimeRange" placeholder="Any date range">
                      <svg xmlns="http://www.w3.org/2000/svg"  viewBox="0 0 32 32" class="app-icon app-icon--verysmall" data-test-dropdown="menu-sort" data-identifyElement="149"><path d="M8.626 9.744c-.875-.903-2.294-.903-3.17-.001s-.876 2.366-.001 3.268l8.959 9.244a2.195 2.195 0 003.171 0l8.959-9.244c.875-.903.874-2.366-.001-3.268s-2.295-.902-3.169.001L16 17.353 8.626 9.744z" data-identifyElement="150"></path></svg>
                    </div>
                    <div class="agent-options" v-if="isDatetimeRangeOptions">
                      <div class="agent-option">
                          <div v-for="(range, index) in dateTimeOptionsList"
                        :key="index" class="agent-option-item" @click="filterByDateTimeCreated(range)">{{ range.label }}</div>
                      </div>
                    </div>
                  </div>

                  <div class="input-filter-container">
                    <label for="formrow-agent" class="form-label">Agents</label>
                    <div class="form-control input-area">
                      <input type="text" @input="handleKeyboardEntry($event,'agents', 'backupAgents', 'name')" class="agent-input" v-model="selectedAgent" placeholder="Any agent" @click="showAgentOptions">
                      <svg xmlns="http://www.w3.org/2000/svg"  viewBox="0 0 32 32" class="app-icon app-icon--verysmall" data-test-dropdown="menu-sort" data-identifyElement="149"><path d="M8.626 9.744c-.875-.903-2.294-.903-3.17-.001s-.876 2.366-.001 3.268l8.959 9.244a2.195 2.195 0 003.171 0l8.959-9.244c.875-.903.874-2.366-.001-3.268s-2.295-.902-3.169.001L16 17.353 8.626 9.744z" data-identifyElement="150"></path></svg>
                    </div>
                    <div class="agent-options" v-if="isAgentOptions">
                      <div class="agent-option">
                        <div class="agent-option-item"  @click="filterByAgent('none')">None</div>
                        <div class="agent-option-item"  @click="filterByAgent(user)">Me</div>
                          <div v-for="(agent, index) in agents"
                        :key="index" :class="{'d-none': agent.id == user.id}" class="agent-option-item" @click="filterByAgent(agent)">{{ agent.name }}</div>
                      </div>
                    </div>
                  </div>

                  <div class="input-filter-container">
                    <label for="formrow-agent" class="form-label">Priority</label>
                    <div class="form-control input-area">
                      <input type="text" @input="handleKeyboardEntry($event,'priorities', 'backupPriorities', 'priority')" class="agent-input" @click="showPriorityOptions" v-model="selectedPriority" placeholder="Any priority">
                      <svg xmlns="http://www.w3.org/2000/svg"  viewBox="0 0 32 32" class="app-icon app-icon--verysmall" data-test-dropdown="menu-sort" data-identifyElement="149"><path d="M8.626 9.744c-.875-.903-2.294-.903-3.17-.001s-.876 2.366-.001 3.268l8.959 9.244a2.195 2.195 0 003.171 0l8.959-9.244c.875-.903.874-2.366-.001-3.268s-2.295-.902-3.169.001L16 17.353 8.626 9.744z" data-identifyElement="150"></path></svg>
                    </div>
                    <div class="agent-options" v-if="isPriorityOptions">
                      <div class="agent-option">
                        <div class="agent-option-item"  @click="filterByPriority('none')">None</div>
                          <div v-for="(priority, index) in priorities"
                        :key="index" class="agent-option-item" @click="filterByPriority(priority)">{{ priority.priority }}</div>
                      </div>
                    </div>
                  </div>

                  <div class="input-filter-container">
                    <label for="formrow-agent" class="form-label">Status</label>
                    <div class="form-control input-area">
                      <input type="text" @input="handleKeyboardEntry($event,'statuses', 'backupStatuses', 'status')" class="agent-input" @click="showStatusOptions" v-model="selectedStatus" placeholder="Any status">
                      <svg xmlns="http://www.w3.org/2000/svg"  viewBox="0 0 32 32" class="app-icon app-icon--verysmall" data-test-dropdown="menu-sort" data-identifyElement="149"><path d="M8.626 9.744c-.875-.903-2.294-.903-3.17-.001s-.876 2.366-.001 3.268l8.959 9.244a2.195 2.195 0 003.171 0l8.959-9.244c.875-.903.874-2.366-.001-3.268s-2.295-.902-3.169.001L16 17.353 8.626 9.744z" data-identifyElement="150"></path></svg>
                    </div>
                    <div class="agent-options" v-if="isStatusOptions">
                      <div class="agent-option">
                        <div class="agent-option-item"  @click="filterByStatus('none')">None</div>
                          <div v-for="(status, index) in statuses"
                        :key="index" class="agent-option-item" @click="filterByStatus(status)">{{ status.status }}</div>
                      </div>
                    </div>
                  </div>

                  <div class="input-filter-container">
                    <label for="formrow-agent" class="form-label">Type</label>
                    <div class="form-control input-area">
                      <input type="text" @input="handleKeyboardEntry($event,'types', 'backupTypes', 'type')" class="agent-input" @click="showTypeOptions" v-model="selectedType" placeholder="Any type">
                      <svg xmlns="http://www.w3.org/2000/svg"  viewBox="0 0 32 32" class="app-icon app-icon--verysmall" data-test-dropdown="menu-sort" data-identifyElement="149"><path d="M8.626 9.744c-.875-.903-2.294-.903-3.17-.001s-.876 2.366-.001 3.268l8.959 9.244a2.195 2.195 0 003.171 0l8.959-9.244c.875-.903.874-2.366-.001-3.268s-2.295-.902-3.169.001L16 17.353 8.626 9.744z" data-identifyElement="150"></path></svg>
                    </div>
                    <div class="agent-options" v-if="isTypeOptions">
                      <div class="agent-option">
                        <div class="agent-option-item"  @click="filterByType('none')">None</div>
                          <div v-for="(type, index) in this.$store.state
                          .types"
                        :key="index" class="agent-option-item" @click="filterByType(type)">{{ type.type }}</div>
                      </div>
                    </div>
                  </div>

                  <div class="input-filter-container">
                    <label for="formrow-agent" class="form-label">Department</label>
                    <div class="form-control input-area">
                      <input type="text" @input="handleKeyboardEntry($event,'departments', 'backupDepartments', 'department')" class="agent-input" @click="showDepartmentOptions" v-model="selectedDepartment" placeholder="Any department">
                      <svg xmlns="http://www.w3.org/2000/svg"  viewBox="0 0 32 32" class="app-icon app-icon--verysmall" data-test-dropdown="menu-sort" data-identifyElement="149"><path d="M8.626 9.744c-.875-.903-2.294-.903-3.17-.001s-.876 2.366-.001 3.268l8.959 9.244a2.195 2.195 0 003.171 0l8.959-9.244c.875-.903.874-2.366-.001-3.268s-2.295-.902-3.169.001L16 17.353 8.626 9.744z" data-identifyElement="150"></path></svg>
                    </div>
                    <div class="agent-options" v-if="isDepartmentOptions">
                      <div class="agent-option">
                        <div class="agent-option-item"  @click="filterByDepartment('none')">None</div>
                          <div v-for="(department, index) in departments"
                        :key="index" class="agent-option-item" @click="filterByDepartment(department)">{{ department.department }}</div>
                      </div>
                    </div>
                  </div>

                  <div class="input-filter-container">
                    <label for="formrow-agent" class="form-label">Source</label>
                    <div class="form-control input-area">
                      <input type="text" @input="handleKeyboardEntry($event,'sources', 'backupSources', 'source')" class="agent-input" @click="showSourceOptions" v-model="selectedSource" placeholder="Any source">
                      <svg xmlns="http://www.w3.org/2000/svg"  viewBox="0 0 32 32" class="app-icon app-icon--verysmall" data-test-dropdown="menu-sort" data-identifyElement="149"><path d="M8.626 9.744c-.875-.903-2.294-.903-3.17-.001s-.876 2.366-.001 3.268l8.959 9.244a2.195 2.195 0 003.171 0l8.959-9.244c.875-.903.874-2.366-.001-3.268s-2.295-.902-3.169.001L16 17.353 8.626 9.744z" data-identifyElement="150"></path></svg>
                    </div>
                    <div class="agent-options" v-if="isSourceOptions">
                      <div class="agent-option">
                        <div class="agent-option-item"  @click="filterBySource('none')">None</div>
                          <div v-for="(source, index) in sources"
                        :key="index" class="agent-option-item" @click="filterBySource(source)">{{ source.source }}</div>
                      </div>
                    </div>
                  </div>
                </form>
                
              </div>
              
            </div>

          </div>
        </div>
      </div>
      <!-- Pagination -->
     
      <div>
        <!-- Upload Modal -->
        <uploadmodal></uploadmodal>
        <div
          style="margin-left: 10px; bottom: 0; position: fixed"
          v-if="filteredTickets.length !== 0 && layout==='cardview'"
        >
          <jw-pagination 
            :pageSize="10"
            :items="componentTickets"
            @changePage="onChangePage"
          ></jw-pagination>
        </div>
      </div>
    </div>
 
</template>

<script>
import ticketlistitem from "@/components/users/TicketListItem2.vue";
import uploadmodal from "@/components/users/UploadTicketModal.vue";
import ticketTable from "@/components/users/TicketTable.vue";
import axios from "axios";
import EmptyView from "@/components/users/EmptyList.vue";
import store from '../../store'
import moment from "moment"
import customDate from "date.js"

export default {
  name: "AllTicketList",
  props: {
    tickets: Array,
  },
  components: {
    ticketlistitem,
    uploadmodal,
    EmptyView,
    ticketTable
  },
  data() {
    return {
      ticketListKey: 1,
      //LAYOUT VARIABLES
      layout:'cardview',
      layoutLabel: 'Card view',
      isLayoutOptions: false,
      //END OF LAYOUT VARIABLES
      checked: false,
      //SORT VARIABLES
      sort_value:"createdAt",
      //PAGINATION VARIABLES
      page: 1,
      perPage: 10,
      pages: [],
      pageOfItems: [],
      //END OF PAGINATION VARIABLES

      //DATA BUCKETS
      user: JSON.parse(sessionStorage.getItem('user')),
      //END OF DATA BUCKETS

      //FILTER VARIABLES
      ticketFilters: [],
      isAgentOptions: false,
      selectedAgent: "",
      isPriorityOptions: false,
      selectedPriority: "",
      selectedStatus: "",
      isStatusOptions: false,
      selectedType: "",
      isTypeOptions: false,
      selectedDepartment: "",
      isDepartmentOptions: false,
      selectedSource: "",
      isSourceOptions: false,
      selectedDateTimeRange: "All",
      isDatetimeRangeOptions: false,
      dateTimeOptionsList: [
        {
          label: 'All',
        },
        {
          label: "Last 15 minutes",
        },
        {
          label: "Last 30 minutes",
        },
        {
          label: "Last 1 hour",
        },
        {
          label: "Last 3 hours",
        },
        {
          label: "Last 6 hours",
        },
        {
          label: "Last 12 hours",
        },
        {
          label: "Last 24 hours",
        },
        {
          label: "Today",
        },
        {
          label: "Yesterday",
        },
        {
          label: "This week",
        },
        {
          label: "Last 2 weeks",
        },
        {
          label: "This month",
        },
        {
          label: "Last 3 months",
        },
        {
          label: "Last 6 months",
        },
        {
          label: "This year",
        },
        {
          label: "Last year",
        },
      ],
      //END OF FILTER VARIABLES

      filterPriority: null,
      componentTickets: this.tickets,
      customFilteredTickets: [],
      searchterm: "",
      selected: "",
      import_file: "",
      loading: false,
      json_fields: {
        subject: "subject",
        "Contact name": "contactname",
        id: "id",
      },
      json_meta: [
        [
          {
            key: "charset",
            value: "utf-8",
          },
        ],
      ],
    };
  },
  watch: {
    deep: true,
    immediate: true,
    tickets() {
      this.customUpdate()
    }
  },
  // watch: {
  //   tickets: function() {
  //     this.setPages();
  //   }
  // },
  mounted(){
    this.dateRange()
  },
  methods: {
    dateRange(){
      console.log(moment())
    },
    customUpdate(){
      this.ticketListKey++
    },
    onChangePage(pageOfItems) {
      // update page of items
      this.pageOfItems = pageOfItems;
    },
    hideLayoutOptions(){
      this.isLayoutOptions = false
    },
    toggleLayoutOptions(){
      if(this.isLayoutOptions == true){
        this.isLayoutOptions = false
      }
      else {
        this.isLayoutOptions = true
      }
    },
    changeLayout(view){
      if(view == "tableview"){
        this.layout = view
        this.isLayoutOptions = false
        //make sure that the DOM element is already created before proceeding
        if(document.getElementById('tableview') != null){
          document.getElementById('tableview').classList.remove("d-none");
        }
        //make sure that the DOM element is already created before proceeding
        if(document.getElementById('cardview') != null){
          document.getElementById('cardview').classList.add("d-none");
        }
      }else{
        this.layout = view
        this.isLayoutOptions = false
        //make sure that the DOM element is already created before proceeding
        if(document.getElementById('tableview') != null){
          document.getElementById('tableview').classList.add("d-none");
        }
        //make sure that the DOM element is already created before proceeding
        if(document.getElementById('cardview') != null){
          document.getElementById('cardview').classList.remove("d-none");
        }
      }
    },
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

// FILTER FUNCTIONS OF THE COMPONENT
    runFilters(){
      if (this.ticketFilters.length > 0 ) {
        this.pageOfItems = this.tickets;
        this.ticketFilters.forEach((filter) => {
          if ("agent_assigned_id" in filter) {
            this.pageOfItems = this.pageOfItems.filter(
              (ticket) => ticket.agent_assigned_id == filter.agent_assigned_id
            );
          }
          if ("priority_id" in filter) {
            this.pageOfItems = this.pageOfItems.filter(
              (ticket) => ticket.priority_id == filter.priority_id
            );
          }
          if ("status_id" in filter) {
            this.pageOfItems = this.pageOfItems.filter(
              (ticket) => ticket.status_id == filter.status_id
            );
          }

          if ("department_id" in filter) {
            this.pageOfItems = this.pageOfItems.filter(
              (ticket) => ticket.department_id == filter.department_id
            );
          }

          if ("source_id" in filter) {
            
            this.pageOfItems = this.pageOfItems.filter(

              (ticket) => ticket.source_id == filter.source_id

            );
          }

          if ("type_id" in filter) {

            this.pageOfItems = this.pageOfItems.filter(

              (ticket) => ticket.type_id == filter.type_id
            );
          }

          if ("date_range" in filter) {

            let now = moment()

            if(filter.date_range.toUpperCase() == "Last 15 minutes".toUpperCase()){

              this.pageOfItems = this.pageOfItems.filter((ticket) =>{

                let createdDate = moment(ticket.created_at).fromNow(true)

                createdDate.toString()
                
                if(createdDate.indexOf("minutes") >= 0){

                  createdDate = createdDate.split(" ")
                  
                  if(parseInt(createdDate[0]) <= 15){

                    return ticket
                  }
                }
              });
            }
            else if(filter.date_range.toUpperCase() == "Last 30 minutes".toUpperCase()){

              this.pageOfItems = this.pageOfItems.filter((ticket) =>{

                let createdDate = moment(ticket.created_at).fromNow(true)

                createdDate.toString()
                
                if(createdDate.indexOf("minutes") >= 0){

                  createdDate = createdDate.split(" ")
                  
                  if(parseInt(createdDate[0]) <= 30){

                    return ticket
                  }
                }
              });
            }
            else if(filter.date_range.toUpperCase() == "Last 1 hour".toUpperCase()){

              this.pageOfItems = this.pageOfItems.filter((ticket) =>{

                let createdDate = moment(ticket.created_at).fromNow(true)

                createdDate.toString()
                           
                if(createdDate.indexOf("hour") >= 0){

                  createdDate = createdDate.split(" ")

                  if(createdDate[0] == "an"){

                    return ticket
                  }
                }
              });
            }
            else if(filter.date_range.toUpperCase() == "Last 3 hours".toUpperCase()){

              this.pageOfItems = this.pageOfItems.filter((ticket) =>{

                let createdDate = moment(ticket.created_at).fromNow(true)

                createdDate.toString()

                if(createdDate.indexOf("hour") >= 0){

                  createdDate = createdDate.split(" ")

                  if(parseInt(createdDate[0]) <= 3){

                    return ticket
                  }
                }
              });
            }
            else if(filter.date_range.toUpperCase() == "Last 6 hours".toUpperCase()){

              this.pageOfItems = this.pageOfItems.filter((ticket) =>{

                let createdDate = moment(ticket.created_at).fromNow(true)

                if(createdDate.indexOf("hour") >= 0){

                  createdDate = createdDate.split(" ")
                  
                  if(parseInt(createdDate[0]) <= 6){

                    return ticket
                  }
                }
              });
            }
            else if(filter.date_range.toUpperCase() == "Last 12 hours".toUpperCase()){

              this.pageOfItems = this.pageOfItems.filter((ticket) =>{

                let createdDate = moment(ticket.created_at).fromNow(true)
                
                createdDate.toString()
                
                if(createdDate.indexOf("hour") >= 0){

                  createdDate = createdDate.split(" ")

                  if(parseInt(createdDate[0]) <= 12){

                    return ticket
                  }
                }
              });
            }
            else if(filter.date_range.toUpperCase() == "Last 24 hours".toUpperCase()){

              this.pageOfItems = this.pageOfItems.filter((ticket) =>{

                let createdDate = moment(ticket.created_at).fromNow(true)
                
                createdDate.toString()
                
                if(createdDate.indexOf("hour") >= 0){

                  createdDate = createdDate.split(" ")

                  if(parseInt(createdDate[0]) <= 23){

                    return ticket
                  }
                }
              });
            }
            else if(filter.date_range.toUpperCase() == "Today".toUpperCase()){

              this.pageOfItems = this.pageOfItems.filter((ticket) =>{

                  if(now.format('YYYY MM DD') == moment(ticket.created_at).format('YYYY MM DD')){

                    return ticket
                  }
                }
              );
            }
            else if(filter.date_range.toUpperCase() == "Yesterday".toUpperCase()){

              let yesterdayDate = customDate("yesterday");
              
              yesterdayDate = moment(yesterdayDate).format('YYYY MM DD');

              this.pageOfItems = this.pageOfItems.filter((ticket) => {

                  let creationDate  = moment(ticket.created_at).format('YYYY MM DD');

                  if(creationDate == yesterdayDate) {

                    return ticket
                  }
                } 
              );
            }
             else if(filter.date_range.toUpperCase() == "This week".toUpperCase()){

               let weekStartDate = moment().day("Sunday").subtract(1, "days"),
                   weekEndDate   = moment().day("Saturday").add(1, "days");

              this.pageOfItems = this.pageOfItems.filter((ticket) => {

                  let creationDate  = moment(ticket.created_at)

                  if(creationDate.isBetween(weekStartDate, weekEndDate)) {

                    return ticket
                  }
                } 
              );
            }
            else if(filter.date_range.toUpperCase() == "Last 2 weeks".toUpperCase()){

              let startDate = moment().subtract({weeks: 2, days: 1}),
                  endDate   = moment().add(1, "days");

              this.pageOfItems = this.pageOfItems.filter((ticket) => {

                  let creationDate  = moment(ticket.created_at)

                  if(creationDate.isBetween(startDate, endDate)) {

                    return ticket
                  }
                } 
              );
            }
            else if(filter.date_range.toUpperCase() == "This month".toUpperCase()){

              let stringNowDate   = now.format('YYYY MM DD'),
                  splitStringDate = stringNowDate.split(" "),
                  month           = splitStringDate[1],
                  year            = splitStringDate[0],
                  firstDateMonth  = moment(`${year}-${month}-1`).subtract(1, "days"),
                  endDate         = moment().add(1, "days");

              this.pageOfItems = this.pageOfItems.filter((ticket) => {

                  let creationDate = moment(ticket.created_at);

                  if(creationDate.isBetween(firstDateMonth, endDate)) {

                    return ticket
                  }
                } 
              );
            }
            else if(filter.date_range.toUpperCase() == "Last 3 months".toUpperCase()){

              let stringNowDate   = now.format('YYYY MM DD'),
                      splitStringDate = stringNowDate.split(" "),
                      month           = splitStringDate[1],
                      year            = splitStringDate[0],
                      firstDateMonth  = moment(`${year}-${month}-1`),
                      threeMonthsBack = firstDateMonth.subtract({months: 2, days: 1}),
                      endDate         = moment().add(1, "days");

              this.pageOfItems = this.pageOfItems.filter((ticket) => {

                  let creationDate    = moment(ticket.created_at);

                  if(creationDate.isBetween(threeMonthsBack, endDate)) {

                    return ticket
                  }
                } 
              );
            }
            else if(filter.date_range.toUpperCase() == "Last 6 months".toUpperCase()){

              let stringNowDate   = now.format('YYYY MM DD'),
                  splitStringDate = stringNowDate.split(" "),
                  month           = splitStringDate[1],
                  year            = splitStringDate[0],
                  firstDateMonth  = moment(`${year}-${month}-1`),
                  fiveMonthsBack = firstDateMonth.subtract({months: 5, days: 1}),
                  endDate         = moment().add(1, "days");

              this.pageOfItems = this.pageOfItems.filter((ticket) => {

                  let creationDate    = moment(ticket.created_at);

                  if(creationDate.isBetween(fiveMonthsBack, endDate)) {

                    return ticket
                  }
                }
              );
            }
            else if(filter.date_range.toUpperCase() == "This year".toUpperCase()){

              let stringNowDate   = now.format('YYYY MM DD'),
                  splitStringDate = stringNowDate.split(" "),
                  year            = splitStringDate[0],
                  firstDateYear   = moment(`${year}-01-1`).subtract(1, "days"),
                  endDate         = moment().add(1, "days");

              this.pageOfItems = this.pageOfItems.filter((ticket) => {

                  let creationDate = moment(ticket.created_at);

                  if(creationDate.isBetween(firstDateYear, endDate)) {

                    return ticket
                  }
                } 
              );
            }
            else if(filter.date_range.toUpperCase() == "Last year".toUpperCase()){

              let stringNowDate   = now.format('YYYY MM DD'),
                  splitStringDate = stringNowDate.split(" "),
                  year            = parseInt(splitStringDate[0]),
                  firstDateYear   = moment(`${(year - 1)}-01-1`).subtract(1, "days"),
                  endDate         = moment(`${(year - 1)}-12-31`).add(1, "days");

              this.pageOfItems = this.pageOfItems.filter((ticket) => {

                  let creationDate = moment(ticket.created_at);

                  if(creationDate.isBetween(firstDateYear, endDate)) {
                    
                    return ticket
                  }
                } 
              );
            }
          }
          
        });
      }

      //set the store working tickets to the current tickets category
      store.dispatch("setWorkingTickets", this.pageOfItems)
      //reset the active card controller and active card index to 0
      store.dispatch("resetActiveCardIndex")
    },
    closeAllPopups(event){
      let classes = event.target.classList.value
      
      if(classes.toString().toLowerCase().indexOf("agent-input") < 0){
        this.hideAllFilterOptions()
      }
      if(classes.toString().toLowerCase().indexOf("view-options") < 0){
        this.hideLayoutOptions()
      }
    },
    hideAllFilterOptions(){
      this.isDatetimeRangeOptions = false
      this.isAgentOptions = false
      this.isPriorityOptions = false
      this.isStatusOptions  = false
      this.isTypeOptions = false
      this.isDepartmentOptions = false
      this.isSourceOptions = false
    },
    showDateTimeRangeOptions(){
      this.hideAllFilterOptions()
      this.isDatetimeRangeOptions = true
    },
    filterByDateTimeCreated(range){

      this.selectedDateTimeRange = range.label
      this.isDatetimeRangeOptions = false

      if (range.label == "All") {
        for (let i = 0; i < this.ticketFilters.length; i++) {
          if ("date_range" in this.ticketFilters[i]) {
            this.ticketFilters.splice(i, 1);
            break;
          }
        }
        this.pageOfItems = this.tickets;
      } 
      else {
        let exists = false;
        for (let i = 0; i < this.ticketFilters.length; i++) {
          if ("date_range" in this.ticketFilters[i]) {
            this.ticketFilters[i].date_range = range.label;
            exists = true;
            break;
          }
        }
        if (exists == false) {
          this.ticketFilters.push({ date_range: range.label });
        }
        this.runFilters()
      }
    },
    showAgentOptions(){
      this.hideAllFilterOptions()
      this.isAgentOptions = true
    },
    filterByAgent(agent) {
      this.isAgentOptions = false
      //if there are no filters existing
      if (agent == "none" ) {
        this.selectedAgent = ""
        for (let i = 0; i < this.ticketFilters.length; i++) {
          if ("agent_assigned_id" in this.ticketFilters[i]) {
            this.ticketFilters.splice(i, 1);
            break;
          }
        }
        this.pageOfItems= this.tickets;
      } else {
        if(this.user.id == agent.id){
          this.selectedAgent = "Me"
        }
        else {
          this.selectedAgent = agent.name
        }
        let exists = false;
        for (let i = 0; i < this.ticketFilters.length; i++) {
          if ("agent_assigned_id" in this.ticketFilters[i]) {
            this.ticketFilters[i].agent_assigned_id = agent.id;
            exists = true;
            break;
          }
        }
        if (exists == false) {
          this.ticketFilters.push({ agent_assigned_id: agent.id });
        }
      }

      this.runFilters()
      
    },
    showPriorityOptions(){
      this.hideAllFilterOptions()
      this.isPriorityOptions = true
    },
    filterByPriority(priority) {
      this.isPriorityOptions = false
      //if there are no filters existing
      if (priority == "none") {
        this.selectedPriority = ""
        for (let i = 0; i < this.ticketFilters.length; i++) {
          if ("priority_id" in this.ticketFilters[i]) {
            this.ticketFilters.splice(i, 1);
            break;
          }
        }
        this.pageOfItems= this.tickets;
      } else {
        this.selectedPriority = priority.priority
        let exists = false;
        for (let i = 0; i < this.ticketFilters.length; i++) {
          if ("priority_id" in this.ticketFilters[i]) {
            this.ticketFilters[i].priority_id = priority.id;
            exists = true;
            break;
          }
        }
        if (exists == false) {
          this.ticketFilters.push({ priority_id: priority.id });
        }
      }

      this.runFilters()
    },
    showStatusOptions(){
      this.hideAllFilterOptions()
      this.isStatusOptions = true
    },
    filterByStatus(status) {
      this.isStatusOptions = false
      //if there are no filters existing
      if (status == "none") {
        this.selectedStatus = ""
        for (let i = 0; i < this.ticketFilters.length; i++) {
          if ("status_id" in this.ticketFilters[i]) {
            this.ticketFilters.splice(i, 1);
            break;
          }
        }
        this.pageOfItems = this.tickets;
      } else {
        this.selectedStatus = status.status
        let exists = false;
        for (let i = 0; i < this.ticketFilters.length; i++) {
          if ("status_id" in this.ticketFilters[i]) {
            this.ticketFilters[i].status_id = status.id;
            exists = true;
            break;
          }
        }
        if (exists == false) {
          this.ticketFilters.push({ status_id: status.id });
        }
      }

      this.runFilters()
    },
    showTypeOptions(){
      this.hideAllFilterOptions()
      this.isTypeOptions = true
    },
    filterByType(type) {
      this.isTypeOptions = false
      //if there are no filters existing
      if (type == "none") {
        this.selectedType = ""
        for (let i = 0; i < this.ticketFilters.length; i++) {
          if ("type_id" in this.ticketFilters[i]) {
            this.ticketFilters.splice(i, 1);
            break;
          }
        }
        this.pageOfItems = this.tickets;
      } else {
        this.selectedType = type.type
        let exists = false;
        for (let i = 0; i < this.ticketFilters.length; i++) {
          if ("type_id" in this.ticketFilters[i]) {
            this.ticketFilters[i].type_id = type.id;
            exists = true;
            break;
          }
        }
        if (exists == false) {
          this.ticketFilters.push({ type_id: type.id });
        }
      }

      this.runFilters()
    },
    showDepartmentOptions(){
      this.hideAllFilterOptions()
      this.isDepartmentOptions = true
    },
    filterByDepartment(department) {
      this.isDepartmentOptions = false
      //if there are no filters existing
      if (department == "none") {
       
        this.selectedDepartment = ""
        for (let i = 0; i < this.ticketFilters.length; i++) {
          if ("department_id" in this.ticketFilters[i]) {
            this.ticketFilters.splice(i, 1);
            break;
          }
        }
      } else {
        this.selectedDepartment = department.department
        let exists = false;
        for (let i = 0; i < this.ticketFilters.length; i++) {
          if ("department_id" in this.ticketFilters[i]) {
            this.ticketFilters[i].department_id = department.id;
            exists = true;
            break;
          }
        }
        if (exists == false) {
          this.ticketFilters.push({ department_id: department.id });
        }
      }

      this.runFilters()
    },
    showSourceOptions(){
      this.hideAllFilterOptions()
      this.isSourceOptions = true
    },
    filterBySource(source) {
      this.isSourceOptions = false
      //if there are no filters existing
      if (source == "none") {
        this.selectedSource = ""
        for (let i = 0; i < this.ticketFilters.length; i++) {
          if ("source_id" in this.ticketFilters[i]) {
            this.ticketFilters.splice(i, 1);
            break;
          }
        }
        this.pageOfItems = this.tickets;
      } else {
        this.selectedSource = source.source
        let exists = false;
        for (let i = 0; i < this.ticketFilters.length; i++) {
          if ("source_id" in this.ticketFilters[i]) {
            this.ticketFilters[i].source_id = source.id;
            exists = true;
            break;
          }
        }
        if (exists == false) {
          this.ticketFilters.push({ source_id: source.id });
        }
      }

      this.runFilters()
    },
// END OF FILTER FUNCTIONS OF THE COMPONENT


    savePdf() {
      this.$PDFSave(this.$refs.exportPdf, "Documents");
    },
    toggleSelection(){
      if(document.getElementById('exampleCheck1').checked){
        this.selectAll();
      }
      else{
        this.deselect()
      }
    },
    selectAll() {
      let check = document.getElementsByClassName("form-check-input");
      for (let i = 0; i < check.length; i++) {
        if (check[i].type == "checkbox") {
          check[i].checked = true;
          //
        }
      }
      let actions = document.querySelectorAll(".btn.d-none");
      for (let x = 0; x <= actions.length; x++) {
        actions[x].classList.remove("d-none");
        document.getElementById("sort").classList.add("d-none");
        document.getElementById("sort-label").classList.add("d-none");

        // document.getElementById('rightnav').style.marginTop('-10px');
      }
    },
    deselect() {
      let check = document.getElementsByClassName("form-check-input");
      for (let i = 0; i < check.length; i++) {
        if (check[i].type == "checkbox") {
          check[i].checked = false;
        }
      }
      let actions = document.querySelectorAll(".action");
      for (let x = 0; x <= actions.length; x++) {
        actions[x].classList.add("d-none");
        document.getElementById("sort").classList.remove("d-none");
        document.getElementById("sort-label").classList.remove("d-none");
      }
    },
    async deleteAllTickets(){
      this.$swal.fire({
        title: 'Are you sure?',
        text: "Proceeding will clear all tickets in the system. You won't be able to revert this!",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: 'bg-primary',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Proceed',
        showClass: {
        popup: 'animate__animated animate__fadeInDown'
        },
        hideClass: {
        popup: 'animate__animated animate__fadeOutUp'
        }
      }).then((result) => {
      if (result.isConfirmed) {
        axios.post('deleteall', this.pageOfItems).then((response)=>{
          console.log(response.data);
        this.$store.dispatch('deleteAllTickets');
            })
        this.$swal.fire(
          'Done!',
          'All tickets have been deleted.',
          'success'
        )
      }else if (result.dismiss === this.$swal.DismissReason.cancel) {
    this.$swal.fire(
      'Cancelled',
      'Ticket data still intact',
      'error'
    )
  }
      })
            
    },
    setPages() {
      let numberOfPages = Math.ceil(
        this.componentTickets.length / this.perPage
      );
      for (let index = 1; index <= numberOfPages; index++) {
        this.pages.push(index);
      }
    },
    paginate(tickets) {
      let page = this.page;
      let perPage = this.perPage;
      let from = page * perPage - perPage;
      let to = page * perPage;
      return tickets.slice(from, to);
    },
  },
  computed: {
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
    filteredTickets: function () {
      let alltickets = this.componentTickets;
      if (this.searchterm !== " " && this.searchterm) {
        alltickets = alltickets.filter(
          (item) =>
            item.subject
              .toUpperCase()
              .includes(this.searchterm.toUpperCase()) ||
            //item.status.toUpperCase().includes(this.searchterm.toUpperCase()) ||
            item.contactname
              .toUpperCase()
              .includes(this.searchterm.toUpperCase()) ||
            item.email.toUpperCase().includes(this.searchterm.toUpperCase())
        );
      }
      return alltickets;
    },

    sortTicketsArray(){
      let tickets = this.pageOfItems;
      if(this.sort_value==="priority"){
        let sorted=function compare(a, b) {
                if (a.priority_id > b.priority_id)
                  return -1;
                if (a.priority_id < b.priority_id)
                  return 1;
                return 0;
              }

        return tickets.sort(sorted);
      }
      else if(this.sort_value==='createdAt'){
         let sorted=function compare(a, b) {
                if (a.created_at > b.created_at)
                  return -1;
                if (a.created_at < b.created_at)
                  return 1;
                return 0;
              }

        return tickets.sort(sorted);
      }
      else if(this.sort_value==='updatedAt'){
         let sorted=function compare(a, b) {
                if (a.updated_at > b.updated_at)
                  return -1;
                if (a.updated_at < b.updated_at)
                  return 1;
                return 0;
              }

        return tickets.sort(sorted);
      }
      else if(this.sort_value==='status'){
         let sorted=function compare(a, b) {
                if (b.status_id > a.status_id)
                  return -1;
                if (b.status_id < a.status_id)
                  return 1;
                return 0;
              }

        return tickets.sort(sorted);
      }
        return this.pageOfItems;
      
    }
  },
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
  overflow-y: scroll;
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

/** 
**layout options styles 
**
*/
.view-types {
  margin-left: 4px;
  border: 1px solid transparent;
  border-radius: 4px;
}
.view-types input {
  padding: 5px 1px 4px 4px;
  width: 70px;
  height: 20px;
  border:none;
  outline: none;
  background: transparent;
}
.view-types input:hover {
  cursor: pointer;
}
.view-types svg{
  width: 11px;
  padding-right: 3px;
}
.view-types:hover {
  cursor: pointer;
}
.view-types.active {
  border: 1px solid #556ee6;
  border-radius: 4px;
}
.view-options {
  animation: slideDown 250ms ease-in-out 0ms;
  position: absolute;
  background: #fff;
  box-shadow: 2px 2px 10px rgba(0, 0, 0, 0.3), -2px -2px 10px rgba(0, 0, 0, 0.08);
  width: 127px;
  height: 90px;
  top: 25px;
  right: 0px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-evenly;
  overflow: hidden;
}
.view-option {
  display: flex;
  align-items: center;
  width: 80%;
  padding: 3px 6px;
  border-radius: 6px;
}
.view-option:hover {
  cursor: pointer;
  background: #f5f7f9;
}
.view-option svg {
  width: 12.5px;
  fill: #556ee6;
  margin-left: 8px;
  margin-bottom: 3px;
}
.view-option-label.active {
  color: #556ee6;
}
@keyframes slideDown {
  0% {
    top: 10px;
    opacity: .1;
    z-index: -4;
  }
  100% {
    top: 25px;
    opacity: 1;
    z-index: initial;
  }
}
/** 
**End of layout options styles 
**
*/
.outer-ticket-item-container {
  margin-left: 27px;
  margin-right: 2.5%;
}
#searchfeedback{
display:block; 
margin:auto; 
width:50%;
}
#actual-btn {
  width: 0px;
  display: none;
}
button.page-link {
  display: inline-block;
  margin-left: 20px;
}
button.page-link {
  font-size: 14px;
  font-weight: 400;
}
.offset {
  width: 500px !important;
  margin: 20px auto;
}
.searchicon1 {
  margin-right: 20px;
}
label {
  font-size: 12px;
  font-weight: 500;
  color: #475867;
}
a:hover {
  cursor: pointer;
}
/* #searchbar {
  max-width: 78%;
  margin-left: 20px;
} */
#searchbar1 {
  max-width: 50%;
}
#searchbar-right {
  display: none;
}
/* .search {
  width: 30px;
  height: 27px;
  float: right;
  margin-top: 0px;
  margin-right: 10px;
} */
.right-subnav {
  width:35%;
  position:fixed;
  right:0
}
.listview {
  padding: 10px;
  padding-right: 5%;
  margin-top: 55px;
  right: 3%;
}
.action {
  margin-left: 30px;
  margin-bottom: 10px;
}
i {
  padding-right: 5px;
}
.select-span {
  margin-left: 0px;
  padding-left: 10px;
  margin-top: 5px;
}
.select-check {
  margin-top: -3px;
  width: 15px;
  /* margin-right: 40px; */
  height: 15px;
}
#cancel-link {
  margin-left: 10px;
}
#cancel-link:hover {
  cursor: pointer;
}
.actions {
  margin-left: -58px;
  margin-top: -25px;
  height: 70px;
  position: fixed;
  z-index: 2;
  align-items: center;
  min-width: 100%;
  box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2);
}
.prev {
  margin-right: 10px;
}
.import-btn:hover{
 color: white;
 background-color: #d6d4d4;
border-color: #6f7983;
}
.filter {
  margin-top: 36px;
  width: 310px;
  height: 100%;
  right: 0;
  position: fixed;
  border-left: 1px solid rgba(0, 0, 0, 0.2) !important;
  background: #f5f7f9;
}
.bg-light {
  background: #f5f7f9 !important;
}
.scroll {
  overflow-y: scroll;
}
.filter-btn {
  margin-bottom: 5px;
  width: 100%;
  height: 30px;
}
/* .filter-btn:hover {
  cursor: no-drop;
} */
#sort {
  outline: none;
  border: none;
  background-color: inherit;
  font-weight: normal;
  width: 120px;
  padding-left: 5px;
}
.left-subnav {
  /* max-width: 50vw; */
  margin-left: 15px;
}
@media screen and (min-width: 2000px) {
  .actions {
    min-width: 100%;
  }
  .listview {
    right: 2%;
  }
  .right-subnav {
   width:25%;

  }
  .ticketlist-item {
    margin-left: 10px;
  }
  .searchicon1 {
    display: none;
  }
  #searchbar-right {
    display: block;
    width: 500px;
    float: right;
  }

  .card-body.scroll {
    -ms-overflow-style: none !important; /* Internet Explorer 10+ */
  }
  .card-body.scroll::-webkit-scrollbar {
    display: none !important;
  }
  .filter-btn {
    margin-bottom: 5px;
    width: 100%;
    /* margin-top: 10px; */
    /* margin-left: 20px; */
  }
  .filter {
    margin-top: 55px;
    max-height: 100vh;
    right: 0;
    position: fixed;
  }
}
</style>