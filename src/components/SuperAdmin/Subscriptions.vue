<template>
	<div class="content">
		<div id="main-content">
			<div class="page-content">
				<div class="container-fluid">
					<!-- actions -->
          <div class="actions bg-light row">
            <div class="left-subnav  col-6 float-left">
              <div style="margin-left:30px; margin-top:10px;" class="left-subnav" id="leftnav">
                <!-- <input
                  type="checkbox"
                  class="form-check-input select-check mt-2"
                  id="exampleCheck1"
                  @click="toggleSelection"
                /> -->
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
                  >View:</label
                >

                <select
                  id="sort"
                  v-model="sort_value"
                >
                  <option value="plans" class="font-16">Plans</option>
                  <option value="features">Features</option>
                </select>
                
                <!-- <a class="btn btn-light border-secondary btn-sm d-none action">
                            <i class="fa fa-user-plus"></i>Assign</a> -->
                <!-- <a class="btn btn-light border-secondary btn-sm d-none action">
                            <i class="fa fa-ban"></i>Close</a> -->
                <!-- <a class="btn bg-muted border-secondary btn-sm d-none import-btn action">
                  <i class="fa fa-object-group"></i>Merge</a
                > -->
                <a class="btn btn-light border-secondary btn-sm d-none import-btn action">
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
				<div class="col-6 right-subnav" style="margin-right:0px;width: 400px; display:flex; align-items: flex-end;justify-content: space-between">
				</div>
			</div>
		</div>
				<!-- main view  -->
				<div style="margin-left:100px; margin-top:100px;" >
					<!-- plans view  -->
					<div class="table table-bordered shadow" v-if="sort_value==='plans'">
						<div class="pricing-row">
							<td class="pricing-column">
								<th style="height:103px;" class="text-center">
									<h6>Free</h6>
									<p>For getting Started</p>
									<hr style="width:250px; margin-left:-25px;">

									</th>
									<tbody>
										<div class="plan-value">
											<p class="text-center plan-price">$0</p>
											<p class="text-center">UNLIMITED agents</p>
											
										</div>
										<div class="text-center d-block">
											<a class="btn btn-sm edit-btn btn-primary text-light">EDIT PLAN</a>
										</div>
										<hr>
										<div class="pricing-plan-features">
											<div>
												<ul style="text-decoration:none;">
													<li>
														<i class="fa fa-check-circle icon-tool-tip"></i>Email and social marketing
													</li>
													<li>
														<i class="fa fa-check-circle icon-tool-tip"></i>Ticket Dispatch
													</li>
													<li>
														<i class="fa fa-check-circle icon-tool-tip"></i>Knowledge Base
													</li>
													<li>
														<i class="fa fa-check-circle icon-tool-tip"></i>Ticket Trend Report
													</li>
												</ul>
											</div>
										</div>
									</tbody>
							</td>
							<td class="pricing-column">
								<th style="height:103px;" class="text-center">
									<h6>Growth</h6>
									<p>For fast growth</p>
									<hr style="width:250px; margin-left:-25px;">
									</th>
									<tbody>
										<div class="plan-value">
											<p class="text-center plan-price">$15</p>
												<p class="text-center plan-extra-text">/agent/month billed annually</p>
											<p>$18</p>
											<p class="text-center plan-extra-text">/agent/month billed monthly</p>
										
											
										</div>
										<div class="text-center d-block">
											<a class="btn btn-sm edit-btn btn-primary text-light">EDIT PLAN</a>
										</div>
										<hr>
										<div class="pricing-plan-features">
											<div>
												<p class="font-italic font-size-12 ml-1">Everything in Free and...</p>
												<ul style="text-decoration:none;">
													<li>
														<i class="fa fa-check-circle icon-tool-tip"></i>Automation
													</li>
													<li>
														<i class="fa fa-check-circle icon-tool-tip"></i>Collision Detection
													</li>
													<li>
														<i class="fa fa-check-circle icon-tool-tip"></i>SoftDesk Report
													</li>
													<li>
														<i class="fa fa-check-circle icon-tool-tip"></i>Custom Ticket Views
													</li>
												</ul>
											</div>
										</div>
									</tbody>
							</td>
							<td class="pricing-column">
								<th style="height:103px;" class="text-center">
									<h6>Pro</h6>
									<p>For High Performance</p>
									<hr style="width:250px; margin-left:-25px;">

									</th>
									<tbody>
										<div class="plan-value">
											<p class="text-center plan-price">$49</p>
												<p class="text-center plan-extra-text">/agent/month billed annually</p>
											<p>$59</p>
											<p class="text-center plan-extra-text">/agent/month billed monthly</p>
										</div>
										<div class="text-center d-block">
											<a class="btn btn-sm edit-btn btn-primary text-light">EDIT PLAN</a>
										</div>
										<hr>
										<div class="pricing-plan-features">
											<p class="font-italic font-size-12 ml-1">Everything in Growth and...</p>
											<div>
												<ul style="text-decoration:none;">
													<li>
														<i class="fa fa-check-circle icon-tool-tip"></i>Round Robin Routing
													</li>
													<li>
														<i class="fa fa-check-circle icon-tool-tip"></i>Custom Roles
													</li>
													<li>
														<i class="fa fa-check-circle icon-tool-tip"></i>Custom Dashboard
													</li>
													<li>
														<i class="fa fa-check-circle icon-tool-tip"></i>Customer Segments
													</li>
												</ul>
											</div>
										</div>
									</tbody>
							</td>
							<td class="pricing-column">
								<th style="height:103px;" class="text-center">
									<h6>Enterprise</h6>
									<p>For Enterprise grade support</p>
									<hr style="width:250px; margin-left:-25px;">

									</th>
									<tbody>
										<div class="plan-value">
											<p class="text-center plan-price">$79</p>
											<p class="text-center plan-extra-text">/agent/month billed annually</p>
											<p>$95</p>
											<p class="text-center plan-extra-text">/agent/month billed monthly</p>
										</div>
										<div class="text-center d-block">
											<a class="btn btn-sm edit-btn btn-primary text-light">EDIT PLAN</a>
										</div>
										<hr>
										<div class="pricing-plan-features">
											
											<div>
												<ul style="text-decoration:none;">
													<li>
														<i class="fa fa-check-circle icon-tool-tip"></i>Email and social marketing
													</li>
													<li>
														<i class="fa fa-check-circle icon-tool-tip"></i>Ticket Dispatch
													</li>
													<li>
														<i class="fa fa-check-circle icon-tool-tip"></i>Knowledge Base
													</li>
													<li>
														<i class="fa fa-check-circle icon-tool-tip"></i>Ticket Trend Report
													</li>
												</ul>
											</div>
										</div>
									</tbody>
							</td>
						
						</div>
					</div>
					<!-- features list  -->
					
				</div>
				<div style="margin-left:100px; margin-top:10px;">
					<features  v-if="sort_value==='features'"></features>
				</div>
			</div>
		</div>
	</div>

</template>
<script>
import Features from '@/components/SuperAdmin/FeaturesList.vue';
export default {
  name: "Subscriptions",
  components:{
	  Features,
  },
	data(){
		return{
			sort_value:"plans",

		}
	}
};
</script>
<style scoped>
.pricing-row{
	display: table-row;
	border-color: #4d4d4d;

}
.pricing-column{
	border-color: #4d4d4d;
	padding-bottom: 35px;
}

.plan-value{
	font-size:18px;
	color: #4d4d4d;
	text-align: center;
	margin-top: -3px;
	/* line-height: 42px; */
}
.plan-extra-text{
	font-size:13px;

}
.edit-btn{
	color: white;
}
.fa-check-circle{
	width: 20px;
	height:20px;
	color: royalblue;
	line-break: 20px;

}
ul{
	list-style-type: none;
}
li{
/* margin: 0 0 7px 26px; */
padding-top: 5px;
font-size: 13px;
}
.card {
 border: none;
 box-shadow: 0 7px 8px rgba(0, 0, 0, 0.12);
 border-radius: 7px;
}
.table-container{
  margin-top: 30px;
}

tr, th{
  color:#183247 !important;
}

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
  margin-left: 0px;
  margin-top: -30px;
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
  margin-left: 25px;
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
 
}
</style>
