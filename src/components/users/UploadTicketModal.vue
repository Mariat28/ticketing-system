<template>
    <!-- Modal -->
    <div
        id="uploadModal"
        class="modal fade"
        role="dialog"
    >
        <div class="modal-dialog  modal-dialog-centered">

            <!-- Modal content-->
            <div class="modal-content">
                <div class="modal-header">
                    <h4 class="modal-title font-size-17">Import Tickets<span class="text-muted font-size-12 ml-1">(xlsx,xls formats only)</span></h4>
                    <button
                        type="button"
                        class="close"
                        data-dismiss="modal"
                    >&times;</button>

                </div>
                <div class="modal-body">
                    <!-- Form -->
                    <form
                        id="mainformTickets"
                        enctype="multipart/form-data"
                        method="post"
                    >
                        Select file :
                        <input
                            type='file'
                            name='import_file'
                            id='file'
                            class='form-control'
                        ><br>
                            <a
                                class='btn btn-primary text-white btn-sm float-right'
                                id='btn_upload'
                                type="submit"
                                name="upload"
                                @click.prevent="saveExcelTickets"
                                data-dismiss="modal"
                            ><i class="fa fa-upload mr-1"></i>Upload</a>
                               <a 
                                    class='btn btn-light delete  btn-sm float-left'
                                    value='Cancel'
                                    id='btn_cancel'
                                    data-dismiss="modal"> <i class="fa fa-times-circle"></i>
                                    
                               Cancel</a>

                                    </form>
                </div>

            </div>

        </div>
        </div>
</template>

<script>
import axios from "axios";
export default {
  name: "UploadTicketModal",

  methods: {
    async saveExcelTickets() {
      const data = new FormData(document.getElementById("mainformTickets"));
          this.$refs.topProgress.start();
      await axios
        .post("https://soft-desk.nl/backend/public/api/tickets/import", data)
        .then(res => {
          console.log(res.data);
          this.$toasted.show("Import Successful!!", {
            position: "top-right",
            theme: "toasted-primary",
            className: ["bg-success"],
            icon: {
              name: "fa fa-check-circle",
              after: false
            }
          });
          this.$refs.topProgress.done();
        })
        .catch(error => {
          if (error.response) {
            if(error.response.status===500 || error.response.status===422){
          this.$toasted.show("Unsupported file type", {
              position: "top-center",
              theme: "toasted-primary",
              className: ["bg-danger"],
              icon: {
                name: "fa fa-times-circle",
                after: false
              }
            });
            }else{
              this.$toasted.show("Import Failed, Please Try Again", {
              position: "bottom-right",
              theme: "toasted-primary",
              className: ["bg-danger"],
              icon: {
                name: "fa fa-times-circle",
                after: false
              }
            });
            }
            
          }
        });
    }
  }
};
</script>
<style scoped>
.delete {
  transition: 300ms ease-out;
  border: 1px solid rgba(0,0,0, .15);
  border-radius: 4px;
  display: flex;
  justify-content: center;
  align-items: center;
  padding:5px;
}
.delete:hover {
  background: #f46a6a;
  color: white;
  cursor: pointer;
}
</style>

