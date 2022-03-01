<template>
  <div class="login-container">
    <div class="container-fluid p-0 body">
      <div class="row g-0">
        <div class="col-xl-9">
          <div class="auth-full-bg pt-lg-5 p-4">
            <div class="w-100">
              <div class="bg-overlay"></div>
              <div class="d-flex h-100 flex-column">
                <div class="p-4 mt-auto">
                  <div class="row justify-content-center">
                    <div class="col-lg-7">
                      <div class="text-center">
                        <h4 class="mb-3">
                          <i
                            class="
                              bx
                              bxs-quote-alt-left
                              text-primary
                              h1
                              align-middle
                              me-3
                            "
                          ></i
                          ><span class="text-primary">5k</span>+ Satisfied
                          clients
                        </h4>

                        <div dir="ltr">
                          <div
                            class="owl-carousel owl-theme auth-review-carousel"
                            id="auth-review-carousel"
                          >
                            <div class="item">
                              <div class="py-3">
                                <p class="font-size-16 mb-4">
                                  " Fantastic theme with a ton of options. If
                                  you just want the HTML to integrate with your
                                  project, then this is the package. You can
                                  find the files in the 'dist' folder...no need
                                  to install git and all the other stuff the
                                  documentation talks about. "
                                </p>

                                <div>
                                  <h4 class="font-size-16 text-primary">
                                    Abs1981
                                  </h4>
                                  <p class="font-size-14 mb-0">- Skote User</p>
                                </div>
                              </div>
                            </div>

                            <div class="item">
                              <div class="py-3">
                                <p class="font-size-16 mb-4">
                                  " If Every Vendor on Envato are as supportive
                                  as Themesbrand, Development with be a nice
                                  experience. You guys are Wonderful. Keep us
                                  the good work. "
                                </p>

                                <div>
                                  <h4 class="font-size-16 text-primary">
                                    nezerious
                                  </h4>
                                  <p class="font-size-14 mb-0">- Skote User</p>
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
          </div>
        </div>
        <!-- end col -->

        <div class="col-xl-3">
          <div class="auth-full-page-content p-md-5 p-4">
            <div class="w-100">
              <div class="d-flex flex-column h-100">
                <div class="mb-4 mb-md-5">
                  <a href="index.html" class="d-block auth-logo">
                    <img
                      src="assets/images/logo-dark.png"
                      alt=""
                      height="18"
                      class="auth-logo-dark"
                    />
                    <img
                      src="assets/images/logo-light.png"
                      alt=""
                      height="18"
                      class="auth-logo-light"
                    />
                  </a>
                </div>
                <div class="my-auto">
                  <div>
                    <h5 class="text-primary">Welcome Back !</h5>
                    <p class="text-muted">Sign in to continue to SoftDesk.</p>
                  </div>

                  <div class="mt-4">
                    <div class="alert alert-warning alert-dismissible fade show d-none" role="alert" id="login-alert">
                      <strong>User not Found!</strong><br>Contact Admin for assistance.
                      <button type="button" class="close" data-bs-dismiss="alert" aria-label="Close">
                        <span aria-hidden="true">&times;</span>
                      </button>
                    </div>
                    <form action="/home" @submit.prevent="handleLogin">
                      <span id="errspan" class="text-danger d-none"
                        >Credentials do not match our records!</span
                      >

                      <div class="mb-3">
                        <label for="username" class="form-label"
                          >Username</label
                        >
                        <input
                          type="text"
                          class="form-control"
                          id="username"
                          placeholder="Enter username"
                          name="email"
                          v-model="email"
                        />
                        <span id="emailerrspan" class="text-danger d-none"
                          >This field is required!</span
                        >
                      </div>

                      <div class="mb-3">
                        <!-- <div class="float-end">
                                                        <a  class="text-muted">Forgot password?</a>
                                                    </div> -->
                        <label class="form-label">Password</label>
                        <div class="input-group auth-pass-inputgroup">
                          <input
                            :type="[showPassword ? 'text' : 'password']"
                            class="form-control"
                            placeholder="Enter password"
                            aria-label="Password"
                            aria-describedby="password-addon"
                            name="password"
                            v-model="password"
                          />

                          <button
                            class="btn btn-light"
                            type="button"
                            id="password-addon"
                            @click="showPassword = !showPassword"
                          >
                            <i
                              class="fa text-muted"
                              :class="[
                                showPassword ? 'fa-eye' : 'fa-eye-slash',
                              ]"
                            ></i></button
                          ><br />
                        </div>
                        <span id="passerrspan" class="text-danger d-none"
                          >This field is required!</span
                        >
                      </div>

                      <div class="form-check">
                        <input
                          class="form-check-input"
                          type="checkbox"
                          id="remember-check"
                        />
                        <label class="form-check-label" for="remember-check">
                          Remember me
                        </label>
                      </div>

                      <div class="mt-3 d-grid">
                        <button
                          @click="handleLogin"
                          @keyup.enter="handleLogin"
                          class="
                            btn btn-primary btn-block btn-sm
                            text-white
                            waves-effect waves-light
                          "
                          type="submit"
                        >
                          Log In
                        </button>
                      </div>

                      <!-- <div class="mt-4 text-center">
                                                    <h5 class="font-size-14 mb-3">Sign in with</h5>
                    
                                                    <ul class="list-inline">
                                                        <li class="list-inline-item">
                                                            <a href="javascript::void()" class="social-list-item bg-primary text-white border-primary">
                                                                <i class="mdi mdi-facebook"></i>
                                                            </a>
                                                        </li>
                                                        <li class="list-inline-item">
                                                            <a href="javascript::void()" class="social-list-item bg-info text-white border-info">
                                                                <i class="mdi mdi-twitter"></i>
                                                            </a>
                                                        </li>
                                                        <li class="list-inline-item">
                                                            <a href="javascript::void()" class="social-list-item bg-danger text-white border-danger">
                                                                <i class="mdi mdi-google"></i>
                                                            </a>
                                                        </li>
                                                    </ul>
                                                </div> -->
                    </form>
                    <!-- <div class="mt-5 text-center">
                                                <p>Don't have an account ? <a href="auth-register-2.html" class="fw-medium text-primary"> Signup now </a> </p>
                                            </div> -->
                  </div>
                </div>

                <div class="mt-0 mt-md-1 text-center">
                  <p class="mb-0">
                    ©
                    <!-- <script>
                                            document.write(new Date().getFullYear())</script>  -->
                    SoftDesk. Crafted with
                    <i class="mdi mdi-heart text-danger"></i> by ProjectCode
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
        <!-- end col -->
      </div>
      <!-- end row -->
    </div>
  </div>
</template>
<style scoped>
#emailerrspan,
#passerrspan {
  font-size: 11px;
}
.login-container {
  position: fixed;
  overflow-y: hidden;
  max-width: 100%;
  max-height: 100%;
}
</style>
<script>
import axios from "axios";
import store from '../../store'

export default {
  name: "LoginPage",
  data() {
    return {
      email: "",
      password: "",
      showPassword: false,
    };
  },


  methods: {
    async handleLogin() {
      if (this.email === "") {
        document.getElementById("emailerrspan").classList.remove("d-none");
      } else if (this.password === "") {
        document.getElementById("passerrspan").classList.remove("d-none");
      } 
    else {
        document.getElementById("passerrspan").classList.add("d-none");
        document.getElementById("emailerrspan").classList.add("d-none");

        store.dispatch("startLoader")
        await axios
          .post('login', {
            email: this.email,
            password: this.password,
          })
          .then((response) => {
            store.dispatch("stopLoader")
            sessionStorage.setItem("access_token", response.data.access_token);
            // localStorage.setItem("access_token", response.data.access_token);
            sessionStorage.setItem("user", JSON.stringify(response.data.user));
            console.log('current user', sessionStorage.getItem('user'));
            // localStorage.setItem("user", JSON.stringify(response.data.user));

            this.$router.push("/home").catch(err => err);
            store.dispatch("getDepartments", response.data.user.company_id)
            store.dispatch("getAgents", response.data.user.company_id)
            store.dispatch("getContacts", response.data.user.company_id)
          })
          .catch((error,a,b) => {
            store.dispatch("stopLoader")
            this.$toasted.show("Please check your credentials  or network!", {
              position: "top-right",
              theme: "toasted-primary",
              className: ["bg-success"],
              icon: {
                name: "fa fa-check-circle",
                after: false,
              },
            });
            if (error.response.status === 400) {
              document.getElementById("errspan").classList.remove("d-none");
            } else if (error.response.status === 401) {
              document.getElementById("login-alert").classList.remove("d-none");
            }
            console.log(error,a,b)
          });
    }
      
    },
  },
};
</script>

