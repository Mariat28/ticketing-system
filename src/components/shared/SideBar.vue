<template>
   <!-- ========== Left Sidebar Start ========== -->
<div class="vertical-menu">
    <div data-simplebar data-sidebar="dark" class="h-100 sidebar">

        <!--- Sidemenu -->
        <div id="sidebar-menu"  style="margin-top:-15px"  >
            <!-- Left Menu Start -->
            <ul class="metismenu list-unstyled" id="side-menu">
                <!-- <li class="menu-title" key="t-menu">Menu</li> -->

                <li>
                    <router-link to="/home" class="waves-effect" style="height:10px; width:154px">
                    <a href="javascript: void(0);" class="waves-effect">
                        <!--<font-awesome-icon icon="house-user" class="icons" />-->
                        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 32 32" class="nav-icon" focusable="false">
                        <path d="M15.733 30.933a15.117 15.117 0 01-10.287-4.01 15.27 15.27 0 01-3.121-4.025 15.148 15.148 0 01-1.483-4.103 15.33 15.33 0 01-.187-4.997 15.132 15.132 0 011.298-4.489A15.254 15.254 0 019.73 1.764a15.063 15.063 0 012.94-.922A15.336 15.336 0 0118.422.77c1.016.181 2.013.467 2.97.852a15.245 15.245 0 017.959 7.355 15.12 15.12 0 011.405 4.442c.248 1.624.233 3.29-.046 4.909a15.103 15.103 0 01-1.36 4.16 15.267 15.267 0 01-7.196 7.024 15.14 15.14 0 01-6.13 1.418l-.294.003zm0-2.026a13.128 13.128 0 008.974-3.53 13.265 13.265 0 002.686-3.506c.577-1.094.998-2.27 1.246-3.482.297-1.45.347-2.95.151-4.417a13.141 13.141 0 00-1.113-3.805 13.229 13.229 0 00-6.742-6.54 13.168 13.168 0 00-5.03-1.065 13.199 13.199 0 00-5.075.942 13.21 13.21 0 00-6.9 6.376 13.107 13.107 0 00-1.217 3.847 13.314 13.314 0 00.054 4.341 13.1 13.1 0 001.199 3.592c.655 1.298 1.526 2.485 2.566 3.501s2.249 1.86 3.564 2.483a13.117 13.117 0 005.639 1.264zm3.737-9.398a4.368 4.368 0 01.594 3.027 4.355 4.355 0 01-.375 1.182 4.388 4.388 0 01-3.845 2.484l-.113.001a4.363 4.363 0 01-1.807-.389 4.422 4.422 0 01-2.103-2.002 4.366 4.366 0 01-.446-2.557 4.364 4.364 0 011.289-2.585 4.387 4.387 0 015.362-.601c1.449-1.491 2.948-2.933 4.419-4.403a1.039 1.039 0 01.37-.235 1.02 1.02 0 01.999.176 1.02 1.02 0 01.327 1.038 1.022 1.022 0 01-.232.422c-1.447 1.512-2.954 2.967-4.439 4.442zm-3.739 4.668c.335-.002.667-.07.972-.208a2.385 2.385 0 001.332-1.621 2.379 2.379 0 00-.148-1.507 2.387 2.387 0 00-1.211-1.196 2.364 2.364 0 10-1.008 4.53l.061.001zm8.963-11.478l-.084-.004a1.017 1.017 0 01-.714-.392c-.051-.066-.089-.139-.129-.212l-.074-.134a9.281 9.281 0 00-.714-1.084 9.177 9.177 0 00-4.206-3.065 9.194 9.194 0 00-4.255-.44 9.08 9.08 0 00-4.9 2.271 9.234 9.234 0 00-1.96 2.518l-.043.072c-.043.061-.052.078-.102.133a1.036 1.036 0 01-.827.328 1.02 1.02 0 01-.903-.757 1.016 1.016 0 01.021-.578c.024-.071.034-.087.066-.154a11.643 11.643 0 01.784-1.267 11.2 11.2 0 015.269-4.007 11.21 11.21 0 015.284-.57 11.1 11.1 0 015.718 2.535 11.233 11.233 0 012.626 3.236l.042.079c.032.067.043.083.066.154a.978.978 0 01.038.496 1.021 1.021 0 01-.756.811c-.072.018-.091.018-.165.027l-.084.003z"></path></svg>
                        <span key="t-dashboards" class="margin-left: 2px">Dashboard</span>
                    </a></router-link>
                </li>

                <li v-if="user.role_id!==1">
                     <router-link to="/NewTickets" class="waves-effect" style="height:10px; width:154px">
                    <a href="javascript: void(0);" class="waves-effect" @click="tellTopBarToUpdate">
                        <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 32 32" class="nav-icon" focusable="false"><path d="M.267 12.874V10.23a3.824 3.824 0 013.818-3.831h23.831a3.825 3.825 0 013.818 3.831v2.644l-1.018.563c-1.076.595-1.736 1.665-1.736 2.83s.66 2.235 1.736 2.83l1.018.563v2.644a3.824 3.824 0 01-3.818 3.831H4.085a3.825 3.825 0 01-3.818-3.831V19.66l1.018-.563c1.076-.595 1.736-1.665 1.736-2.83s-.66-2.235-1.736-2.83l-1.018-.563zm4.72 3.393c0 1.948-1.107 3.648-2.753 4.558v1.478c0 1.026.829 1.857 1.851 1.857h23.831a1.855 1.855 0 001.851-1.857v-1.478c-1.646-.91-2.753-2.61-2.753-4.558s1.107-3.648 2.753-4.558v-1.478a1.854 1.854 0 00-1.851-1.857H4.085a1.855 1.855 0 00-1.851 1.857v1.478c1.646.91 2.753 2.61 2.753 4.558zm5.981-5.14h10.065a3.825 3.825 0 013.818 3.831v2.6a3.824 3.824 0 01-3.818 3.831H10.968a3.825 3.825 0 01-3.818-3.831v-2.6a3.824 3.824 0 013.818-3.831zm0 1.973a1.855 1.855 0 00-1.851 1.857v2.6c0 1.026.829 1.857 1.851 1.857h10.065a1.855 1.855 0 001.851-1.857v-2.6a1.854 1.854 0 00-1.851-1.857H10.968z"></path></svg>
                        <span key="t-layouts">Tickets<!--<font-awesome-icon icon="caret-right" class="caret"/>-->
                    </span>
                    </a></router-link>
                    
                </li>

                <li v-if="user.role_id!==1">
                     <router-link to="#" class="waves-effect" style="height:10px; width:154px">
                    <a href="javascript: void(0);" class="waves-effect">
                        <!--<font-awesome-icon icon="house-user" class="icons" />-->
                        <svg xmlns="http://www.w3.org/2000/svg" data-name="Layer 2" viewBox="0 0 20 20" class="nav-icon" 
                        focusable="false"><path d="M10 3.92a3 3 0 103 3 3 3 0 00-3-3zm0 4.54a1.57 1.57 0 111.57-1.57A1.57 
                        1.57 0 0110 8.46zM16.06 1H3.94A2.94 2.94 0 001 3.94v12.12A2.94 2.94 0 003.94 19h12.12A2.94 2.94 0 
                        0019 16.06V3.94A2.94 2.94 0 0016.06 1zM5.78 17.6l.67-4A1.54 1.54 0 018 12.27h4a1.54 1.54 0 011.52 
                        1.29l.67 4zm11.82-1.54a1.54 1.54 0 01-1.54 1.54h-.42l-.71-4.27A2.93 2.93 0 0012 10.87H8a2.93 2.93 
                        0 00-2.9 2.46l-.74 4.27h-.42a1.54 1.54 0 01-1.54-1.54V3.94A1.54 1.54 0 013.94 2.4h12.12a1.54 1.54 
                        0 011.54 1.54z"></path></svg>
                        <span key="t-dashboards">Contacts</span>
                    </a></router-link>
                    
                </li>

                 <li v-if="user.role_id!==1">
                     <router-link to="#" class=" waves-effect " style="height:10px; width:154px">
                    <a href="javascript: void(0);" class=" waves-effect">
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 60 60" class="nav-icon" focusable="false"><path d="M46.5 57.2h-32C8.7 57.2 4 52.4 4 46.6v-32C4 8.8 8.7 4 14.6 4h32c5.8 0 10.6 4.8 10.6 10.6v32c-.1 5.8-4.8 10.6-10.7 10.6zM14.6 8.5c-3.4 0-6.1 2.7-6.1 6.1v32c0 3.4 2.7 6.1 6.1 6.1h32c3.4 0 6.1-2.7 6.1-6.1v-32c0-3.4-2.7-6.1-6.1-6.1h-32z"></path><path d="M17.3 46.1c-1.3 0-2.3-1-2.3-2.3V17.7c0-1.3 1-2.3 2.3-2.3 1.3 0 2.3 1 2.3 2.3v26.2c0 1.2-1.1 2.2-2.3 2.2zm12.7 0c-1.3 0-2.3-1-2.3-2.3v-9.1c0-1.3 1-2.3 2.3-2.3 1.3 0 2.3 1 2.3 2.3v9.1c0 1.3-1 2.3-2.3 2.3zm12.8 0c-1.3 0-2.3-1-2.3-2.3V21.9c0-1.3 1-2.3 2.3-2.3 1.3 0 2.3 1 2.3 2.3v21.9c0 1.3-1 2.3-2.3 2.3z"></path></svg>
                        <span key="t-layouts">Reports</span><!--<font-awesome-icon icon="caret-right" class="dash-icons"/>-->
                    </a></router-link>
                    
                </li>

                 <li v-if="user.role_id!==1">
                     <router-link to="#" class="waves-effect" style="height:10px; width:154px">
                    <a href="javascript: void(0);" class="waves-effect">
                        <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 32 32" class="nav-icon" focusable="false"><path d="M23.493 24.692a4.186 4.186 0 01.026-4.238 4.3 4.3 0 013.694-2.098h1.161v-4.361h-.851a4.56 4.56 0 01-3.959-2.295 4.584 4.584 0 01.013-4.569l.427-.737-3.76-2.165-.483.835c-.787 1.36-2.242 2.197-3.817 2.196s-3.028-.839-3.815-2.199l-.486-.839-3.786 2.18.433.748a4.57 4.57 0 01.015 4.555 4.54 4.54 0 01-3.946 2.29h-.734v4.361h1.028c1.521 0 2.929.799 3.707 2.103.78 1.308.79 2.934.027 4.252l-.518.895 3.76 2.165.483-.835c.787-1.36 2.242-2.197 3.817-2.196s3.028.839 3.815 2.199l.486.839 3.786-2.18-.524-.906zm2.37.053c.509.88.207 2.005-.675 2.512l-4.102 2.362a1.847 1.847 0 01-2.519-.673l-.577-.997a2.381 2.381 0 00-4.122-.003l-.574.992a1.846 1.846 0 01-2.519.673l-4.076-2.347a1.836 1.836 0 01-.675-2.512l.609-1.052a2.18 2.18 0 00-.014-2.208 2.288 2.288 0 00-1.965-1.115H3.443a1.842 1.842 0 01-1.844-1.839v-4.725c0-1.016.826-1.839 1.844-1.839h.916c.904 0 1.738-.484 2.184-1.268.45-.79.447-1.759-.009-2.546l-.524-.906a1.837 1.837 0 01.675-2.513l4.102-2.362a1.846 1.846 0 012.519.673l.577.997a2.381 2.381 0 004.122.003l.574-.992a1.846 1.846 0 012.519-.673l4.076 2.347a1.837 1.837 0 01.675 2.513l-.518.895a2.565 2.565 0 00-.008 2.558 2.53 2.53 0 002.198 1.274h1.034c1.018 0 1.844.823 1.844 1.839v4.725a1.842 1.842 0 01-1.844 1.839h-1.344a2.27 2.27 0 00-1.951 1.108 2.169 2.169 0 00-.013 2.196l.616 1.064zm-9.926-2.966c-3.206 0-5.807-2.587-5.807-5.779s2.6-5.779 5.807-5.779c3.206 0 5.807 2.587 5.807 5.779s-2.6 5.779-5.807 5.779zm0-2.021c2.088 0 3.78-1.683 3.78-3.758s-1.692-3.758-3.78-3.758-3.78 1.683-3.78 3.758 1.692 3.758 3.78 3.758z"></path></svg>
                        <span key="t-layouts" >Settings</span><!--<font-awesome-icon icon="caret-right" class="dash-icons"/>-->
                    </a></router-link>
                    
                </li>
                <li v-if="user.role_id===1">
                     <router-link to="/companies" class="waves-effect" style="height:10px; width:154 px">
                    <a >
                        <svg xmlns="http://www.w3.org/2000/svg" data-name="Layer 2" viewBox="0 0 20 20" class="nav-icon" focusable="false" data-identifyElement="42"><path d="M10 3.92a3 3 0 103 3 3 3 0 00-3-3zm0 4.54a1.57 1.57 0 111.57-1.57A1.57 1.57 0 0110 8.46zM16.06 1H3.94A2.94 2.94 0 001 3.94v12.12A2.94 2.94 0 003.94 19h12.12A2.94 2.94 0 0019 16.06V3.94A2.94 2.94 0 0016.06 1zM5.78 17.6l.67-4A1.54 1.54 0 018 12.27h4a1.54 1.54 0 011.52 1.29l.67 4zm11.82-1.54a1.54 1.54 0 01-1.54 1.54h-.42l-.71-4.27A2.93 2.93 0 0012 10.87H8a2.93 2.93 0 00-2.9 2.46l-.74 4.27h-.42a1.54 1.54 0 01-1.54-1.54V3.94A1.54 1.54 0 013.94 2.4h12.12a1.54 1.54 0 011.54 1.54z" data-identifyElement="43"></path></svg>
                        <span key="t-layouts" >Companies</span><!--<font-awesome-icon icon="caret-right" class="dash-icons"/>-->
                    </a></router-link>
                    
                </li>
                <li v-if="user.role_id===1">
                     <router-link to="/subscriptions" class="waves-effect" style="height:10px; width:154 px">
                    <a  class="waves-effect">
                        <svg xmlns="http://www.w3.org/2000/svg"  width="32" height="32" viewBox="0 0 2 2" class="nav-icon" data-identifyElement="107"><path  d="M1.64.14a.3.3 0 010 .26h.06a.3.3 0 01.3.28.32.32 0 01-.16.32v.72a.32.32 0 01-.08.2.28.28 0 01-.2.08H.44a.28.28 0 01-.2-.08.32.32 0 01-.08-.2V1A.33.33 0 010 .75V.7A.3.3 0 01.28.4h.11a.27.27 0 010-.26A.27.27 0 01.75 0 1 1 0 011 .4a1.11 1.11 0 01.27-.4.28.28 0 01.37.11zM.72 1h-.4v.69a.12.12 0 00.11.12h.29V1zm.56 0v.81h.28a.12.12 0 00.12-.12V1zM1.12.56H.88v1.28h.24V.56zm.16 0v.31h.42a.14.14 0 00.14-.12V.7a.13.13 0 00-.12-.14h-.44zm-.56 0H.3a.14.14 0 00-.14.12.14.14 0 00.12.19h.44V.56zm.64-.39a.39.39 0 00-.09.11l-.06.09h.13a.22.22 0 00.12 0 .11.11 0 000-.15.1.1 0 00-.14 0zm-.69 0a.1.1 0 00-.14 0 .11.11 0 000 .15.2.2 0 00.11 0h.18L.76.28A.39.39 0 00.67.17z" data-identifyElement="108"></path></svg>
                        <span key="t-layouts" >Plans</span><!--<font-awesome-icon icon="caret-right" class="dash-icons"/>-->
                    </a></router-link>
                    
                </li>

                <!-- <li class="menu-title" key="t-apps">Apps</li> -->

                <!-- <li>
                    <a href="calendar.html" class="waves-effect">
                        <i class="bx bx-calendar"></i>
                        <span key="t-calendar">Calendar</span>
                    </a>
                </li>

                <li>
                    <a href="chat.html" class="waves-effect">
                        <i class="bx bx-chat"></i>
                        <span key="t-chat">Chat</span>
                    </a>
                </li>

                <li>
                    <a href="apps-filemanager.html" class="waves-effect">
                        <i class="bx bx-file"></i>
                        <span class="badge rounded-pill bg-success float-end" key="t-new">New</span>
                        <span key="t-file-manager">File Manager</span>
                    </a>
                </li>

                <li>
                    <a href="javascript: void(0);" class="has-arrow waves-effect">
                        <i class="bx bx-store"></i>
                        <span key="t-ecommerce">Ecommerce</span>
                    </a>
                    <ul class="sub-menu" aria-expanded="false">
                        <li><a href="ecommerce-products.html" key="t-products">Products</a></li>
                        <li><a href="ecommerce-product-detail.html" key="t-product-detail">Product Detail</a></li>
                        <li><a href="ecommerce-orders.html" key="t-orders">Orders</a></li>
                        <li><a href="ecommerce-customers.html" key="t-customers">Customers</a></li>
                        <li><a href="ecommerce-cart.html" key="t-cart">Cart</a></li>
                        <li><a href="ecommerce-checkout.html" key="t-checkout">Checkout</a></li>
                        <li><a href="ecommerce-shops.html" key="t-shops">Shops</a></li>
                        <li><a href="ecommerce-add-product.html" key="t-add-product">Add Product</a></li>
                    </ul>
                </li>

                <li>
                    <a href="javascript: void(0);" class="has-arrow waves-effect">
                        <i class="bx bx-bitcoin"></i>
                        <span key="t-crypto">Crypto</span>
                    </a>
                    <ul class="sub-menu" aria-expanded="false">
                        <li><a href="crypto-wallet.html" key="t-wallet">Wallet</a></li>
                        <li><a href="crypto-buy-sell.html" key="t-buy">Buy/Sell</a></li>
                        <li><a href="crypto-exchange.html" key="t-exchange">Exchange</a></li>
                        <li><a href="crypto-lending.html" key="t-lending">Lending</a></li>
                        <li><a href="crypto-orders.html" key="t-orders">Orders</a></li>
                        <li><a href="crypto-kyc-application.html" key="t-kyc">KYC Application</a></li>
                        <li><a href="crypto-ico-landing.html" key="t-ico">ICO Landing</a></li>
                    </ul>
                </li> -->

                <!-- <li>
                    <a href="javascript: void(0);" class="has-arrow waves-effect">
                        <i class="bx bx-envelope"></i>
                        <span key="t-email">Email</span>
                    </a>
                    <ul class="sub-menu" aria-expanded="false">
                        <li><a href="email-inbox.html" key="t-inbox">Inbox</a></li>
                        <li><a href="email-read.html" key="t-read-email">Read Email</a></li>
                        <li>
                            <a href="javascript: void(0);">
                                <span class="badge rounded-pill badge-soft-success float-end" key="t-new">New</span>
                                <span key="t-email-templates">Templates</span>
                            </a>
                            <ul class="sub-menu" aria-expanded="true">
                                <li><a href="email-template-basic.html" key="t-basic-action">Basic Action</a></li>
                                <li><a href="email-template-alert.html" key="t-alert-email">Alert Email</a></li>
                                <li><a href="email-template-billing.html" key="t-bill-email">Billing Email</a></li>
                            </ul>
                        </li>
                    </ul>
                </li>

                <li>
                    <a href="javascript: void(0);" class="has-arrow waves-effect">
                        <i class="bx bx-receipt"></i>
                        <span key="t-invoices">Invoices</span>
                    </a>
                    <ul class="sub-menu" aria-expanded="false">
                        <li><a href="invoices-list.html" key="t-invoice-list">Invoice List</a></li>
                        <li><a href="invoices-detail.html" key="t-invoice-detail">Invoice Detail</a></li>
                    </ul>
                </li>

                <li>
                    <a href="javascript: void(0);" class="has-arrow waves-effect">
                        <i class="bx bx-briefcase-alt-2"></i>
                        <span key="t-projects">Projects</span>
                    </a>
                    <ul class="sub-menu" aria-expanded="false">
                        <li><a href="projects-grid.html" key="t-p-grid">Projects Grid</a></li>
                        <li><a href="projects-list.html" key="t-p-list">Projects List</a></li>
                        <li><a href="projects-overview.html" key="t-p-overview">Project Overview</a></li>
                        <li><a href="projects-create.html" key="t-create-new">Create New</a></li>
                    </ul>
                </li>

                <li>
                    <a href="javascript: void(0);" class="has-arrow waves-effect">
                        <i class="bx bx-task"></i>
                        <span key="t-tasks">Tasks</span>
                    </a>
                    <ul class="sub-menu" aria-expanded="false">
                        <li><a href="tasks-list.html" key="t-task-list">Task List</a></li>
                        <li><a href="tasks-kanban.html" key="t-kanban-board">Kanban Board</a></li>
                        <li><a href="tasks-create.html" key="t-create-task">Create Task</a></li>
                    </ul>
                </li>

                <li>
                    <a href="javascript: void(0);" class="has-arrow waves-effect">
                        <i class="bx bxs-user-detail"></i>
                        <span key="t-contacts">Contacts</span>
                    </a>
                    <ul class="sub-menu" aria-expanded="false">
                        <li><a href="contacts-grid.html" key="t-user-grid">User Grid</a></li>
                        <li><a href="contacts-list.html" key="t-user-list">User List</a></li>
                        <li><a href="contacts-profile.html" key="t-profile">Profile</a></li>
                    </ul>
                </li>

                <li>
                    <a href="javascript: void(0);" class="waves-effect">
                        <span class="badge rounded-pill bg-success float-end" key="t-new">New</span>
                        <i class="bx bx-detail"></i>
                        <span key="t-blog">Blog</span>
                    </a>
                    <ul class="sub-menu" aria-expanded="false">
                        <li><a href="blog-list.html" key="t-blog-list">Blog List</a></li>
                        <li><a href="blog-grid.html" key="t-blog-grid">Blog Grid</a></li>
                        <li><a href="blog-details.html" key="t-blog-details">Blog Details</a></li>
                    </ul>
                </li> -->

                <!-- <li class="menu-title" key="t-pages">Pages</li>

                <li>
                    <a href="javascript: void(0);" class="waves-effect">
                        <span class="badge rounded-pill bg-success float-end" key="t-new">New</span>
                        <i class="bx bx-user-circle"></i>
                        <span key="t-authentication">Authentication</span>
                    </a>
                    <ul class="sub-menu" aria-expanded="false">
                        <li><a href="auth-login.html" key="t-login">Login</a></li>
                        <li><a href="auth-login-2.html" key="t-login-2">Login 2</a></li>
                        <li><a href="auth-register.html" key="t-register">Register</a></li>
                        <li><a href="auth-register-2.html" key="t-register-2">Register 2</a></li>
                        <li><a href="auth-recoverpw.html" key="t-recover-password">Recover Password</a></li>
                        <li><a href="auth-recoverpw-2.html" key="t-recover-password-2">Recover Password 2</a></li>
                        <li><a href="auth-lock-screen.html" key="t-lock-screen">Lock Screen</a></li>
                        <li><a href="auth-lock-screen-2.html" key="t-lock-screen-2">Lock Screen 2</a></li>
                        <li><a href="auth-confirm-mail.html" key="t-confirm-mail">Confirm Mail</a></li>
                        <li><a href="auth-confirm-mail-2.html" key="t-confirm-mail-2">Confirm Mail 2</a></li>
                        <li><a href="auth-email-verification.html" key="t-email-verification">Email verification</a></li>
                        <li><a href="auth-email-verification-2.html" key="t-email-verification-2">Email verification 2</a></li>
                        <li><a href="auth-two-step-verification.html" key="t-two-step-verification">Two step verification</a></li>
                        <li><a href="auth-two-step-verification-2.html" key="t-two-step-verification-2">Two step verification 2</a></li>
                    </ul>
                </li>

                <li>
                    <a href="javascript: void(0);" class="has-arrow waves-effect">
                        <i class="bx bx-file"></i>
                        <span key="t-utility">Utility</span>
                    </a>
                    <ul class="sub-menu" aria-expanded="false">
                        <li><a href="pages-starter.html" key="t-starter-page">Starter Page</a></li>
                        <li><a href="pages-maintenance.html" key="t-maintenance">Maintenance</a></li>
                        <li><a href="pages-comingsoon.html" key="t-coming-soon">Coming Soon</a></li>
                        <li><a href="pages-timeline.html" key="t-timeline">Timeline</a></li>
                        <li><a href="pages-faqs.html" key="t-faqs">FAQs</a></li>
                        <li><a href="pages-pricing.html" key="t-pricing">Pricing</a></li>
                        <li><a href="pages-404.html" key="t-error-404">Error 404</a></li>
                        <li><a href="pages-500.html" key="t-error-500">Error 500</a></li>
                    </ul>
                </li>

                <li class="menu-title" key="t-components">Components</li>

                <li>
                    <a href="javascript: void(0);" class="has-arrow waves-effect">
                        <i class="bx bx-tone"></i>
                        <span key="t-ui-elements">UI Elements</span>
                    </a>
                    <ul class="sub-menu" aria-expanded="false">
                        <li><a href="ui-alerts.html" key="t-alerts">Alerts</a></li>
                        <li><a href="ui-buttons.html" key="t-buttons">Buttons</a></li>
                        <li><a href="ui-cards.html" key="t-cards">Cards</a></li>
                        <li><a href="ui-carousel.html" key="t-carousel">Carousel</a></li>
                        <li><a href="ui-dropdowns.html" key="t-dropdowns">Dropdowns</a></li>
                        <li><a href="ui-grid.html" key="t-grid">Grid</a></li>
                        <li><a href="ui-images.html" key="t-images">Images</a></li>
                        <li><a href="ui-lightbox.html" key="t-lightbox">Lightbox</a></li>
                        <li><a href="ui-modals.html" key="t-modals">Modals</a></li>
                        <li><a href="ui-offcanvas.html" key="t-offcanvas">Offcanvas</a></li>
                        <li><a href="ui-rangeslider.html" key="t-range-slider">Range Slider</a></li>
                        <li><a href="ui-session-timeout.html" key="t-session-timeout">Session Timeout</a></li>
                        <li><a href="ui-progressbars.html" key="t-progress-bars">Progress Bars</a></li>
                        <li><a href="ui-sweet-alert.html" key="t-sweet-alert">Sweet-Alert</a></li>
                        <li><a href="ui-tabs-accordions.html" key="t-tabs-accordions">Tabs & Accordions</a></li>
                        <li><a href="ui-typography.html" key="t-typography">Typography</a></li>
                        <li><a href="ui-video.html" key="t-video">Video</a></li>
                        <li><a href="ui-general.html" key="t-general">General</a></li>
                        <li><a href="ui-colors.html" key="t-colors">Colors</a></li>
                        <li><a href="ui-rating.html" key="t-rating">Rating</a></li>
                        <li><a href="ui-notifications.html" key="t-notifications">Notifications</a></li>
                    </ul>
                </li> -->

                <!-- <li>
                    <a href="javascript: void(0);" class="waves-effect">
                        <i class="bx bxs-eraser"></i>
                        <span class="badge rounded-pill bg-danger float-end">10</span>
                        <span key="t-forms">Forms</span>
                    </a>
                    <ul class="sub-menu" aria-expanded="false">
                        <li><a href="form-elements.html" key="t-form-elements">Form Elements</a></li>
                        <li><a href="form-layouts.html" key="t-form-layouts">Form Layouts</a></li>
                        <li><a href="form-validation.html" key="t-form-validation">Form Validation</a></li>
                        <li><a href="form-advanced.html" key="t-form-advanced">Form Advanced</a></li>
                        <li><a href="form-editors.html" key="t-form-editors">Form Editors</a></li>
                        <li><a href="form-uploads.html" key="t-form-upload">Form File Upload</a></li>
                        <li><a href="form-xeditable.html" key="t-form-xeditable">Form Xeditable</a></li>
                        <li><a href="form-repeater.html" key="t-form-repeater">Form Repeater</a></li>
                        <li><a href="form-wizard.html" key="t-form-wizard">Form Wizard</a></li>
                        <li><a href="form-mask.html" key="t-form-mask">Form Mask</a></li>
                    </ul>
                </li>

                <li>
                    <a href="javascript: void(0);" class="has-arrow waves-effect">
                        <i class="bx bx-list-ul"></i>
                        <span key="t-tables">Tables</span>
                    </a>
                    <ul class="sub-menu" aria-expanded="false">
                        <li><a href="tables-basic.html" key="t-basic-tables">Basic Tables</a></li>
                        <li><a href="tables-datatable.html" key="t-data-tables">Data Tables</a></li>
                        <li><a href="tables-responsive.html" key="t-responsive-table">Responsive Table</a></li>
                        <li><a href="tables-editable.html" key="t-editable-table">Editable Table</a></li>
                    </ul>
                </li>

                <li>
                    <a href="javascript: void(0);" class="has-arrow waves-effect">
                        <i class="bx bxs-bar-chart-alt-2"></i>
                        <span key="t-charts">Charts</span>
                    </a>
                    <ul class="sub-menu" aria-expanded="false">
                        <li><a href="charts-apex.html" key="t-apex-charts">Apex Charts</a></li>
                        <li><a href="charts-echart.html" key="t-e-charts">E Charts</a></li>
                        <li><a href="charts-chartjs.html" key="t-chartjs-charts">Chartjs Charts</a></li>
                        <li><a href="charts-flot.html" key="t-flot-charts">Flot Charts</a></li>
                        <li><a href="charts-tui.html" key="t-ui-charts">Toast UI Charts</a></li>
                        <li><a href="charts-knob.html" key="t-knob-charts">Jquery Knob Charts</a></li>
                        <li><a href="charts-sparkline.html" key="t-sparkline-charts">Sparkline Charts</a></li>
                    </ul>
                </li>

                <li>
                    <a href="javascript: void(0);" class="has-arrow waves-effect">
                        <i class="bx bx-aperture"></i>
                        <span key="t-icons">Icons</span>
                    </a>
                    <ul class="sub-menu" aria-expanded="false">
                        <li><a href="icons-boxicons.html" key="t-boxicons">Boxicons</a></li>
                        <li><a href="icons-materialdesign.html" key="t-material-design">Material Design</a></li>
                        <li><a href="icons-dripicons.html" key="t-dripicons">Dripicons</a></li>
                        <li><a href="icons-fontawesome.html" key="t-font-awesome">Font awesome</a></li>
                    </ul>
                </li>

                <li>
                    <a href="javascript: void(0);" class="has-arrow waves-effect">
                        <i class="bx bx-map"></i>
                        <span key="t-maps">Maps</span>
                    </a>
                    <ul class="sub-menu" aria-expanded="false">
                        <li><a href="maps-google.html" key="t-g-maps">Google Maps</a></li>
                        <li><a href="maps-vector.html" key="t-v-maps">Vector Maps</a></li>
                        <li><a href="maps-leaflet.html" key="t-l-maps">Leaflet Maps</a></li>
                    </ul>
                </li>

                <li>
                    <a href="javascript: void(0);" class="has-arrow waves-effect">
                        <i class="bx bx-share-alt"></i>
                        <span key="t-multi-level">Multi Level</span>
                    </a>
                    <ul class="sub-menu" aria-expanded="true">
                        <li><a href="javascript: void(0);" key="t-level-1-1">Level 1.1</a></li>
                        <li>
                            <a href="javascript: void(0);" class="has-arrow" key="t-level-1-2">Level 1.2</a>
                            <ul class="sub-menu" aria-expanded="true">
                                <li><a href="javascript: void(0);" key="t-level-2-1">Level 2.1</a></li>
                                <li><a href="javascript: void(0);" key="t-level-2-2">Level 2.2</a></li>
                            </ul>
                        </li>
                    </ul>
                </li> -->

            </ul>
        </div>
        <!-- Sidebar -->
    </div>
</div>
</template>
<script>
import Emitter from 'tiny-emitter'

export default {
    name:'SideBar',
    data(){
        return {
            emitter: new Emitter(),
            user:''
        }
    },
    created(){
            this.user = JSON.parse(sessionStorage.getItem('user'));

    },
    mounted(){
        document.querySelectorAll('.waves-effect svg').forEach(element =>{
            element.addEventListener('mouseover', function(){
                element.nextElementSibling.classList.add('increase-width')
            })
        })
    },
    methods:{
        tellTopBarToUpdate(){
            this.emitter.emit('updateTheDropDowns', 'nodata')
        }
    },
}
</script>
<style scoped>

.dash-icons{
    margin-left: 60px;
}
.caret{
    margin-left: 70px;
}
.router-link-active span{
    color: white;
}
.router-link-active .icons{
    color: white;
}
.icons{
  margin-right: 10px !important;
  margin-left: -20px;
    font-size: 20px;
}
svg {
    fill: #a6b0cf;
    width: 20px;
    height: 20px;
}
svg:hover {
    fill: rgba(255,255,255,.72)
}
#dashboard-icon, svg{
    position: relative;
    margin-left: -20px !important;
    color: #a6b0cf !important;
}
#dashboard-icon:hover, svg {
    color: white !important;
}
.router-link-active .bx{
color: white;
}
.sidebar{
    position: fixed;
}
.metismenu li {
    width: 50px !important;
    padding: 0px !important;
}
.metismenu li span {
    margin-right: 0px !important;
    margin-left: 0px !important;
    padding: 0px;
}
.metismenu li:hover {
    background: transparent !important;
}
a.waves-effect:hover {
    background: transparent !important;
    padding: 0;
    margin-top: 0px 
}
.metismenu li:hover .waves-effect {
    background: transparent;
    padding-top: 0px;
    padding-bottom: 0px;
    width: 130px !important;
}
.metismenu li:hover span {
    margin-right: 0px !important;
    margin-left: 10px !important;
    padding: 0px !important;
    background: #2a3042;
    padding: 8px 5px !important;
}
.waves-effect{
    width: 60px !important;
}
/* #sidebar-menu li{
    min-height: 10px !important;
    width: 150px !important;
    padding-top: 10px !important;
} */

</style>