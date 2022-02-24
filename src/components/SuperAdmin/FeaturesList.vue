<template>
    <div class="content">
        <div id="main-content">
            <div class="page-content">
                <div style="margin-left:-20px; margin-top:-120px">
                    <div>
                        <div class="card">
                            <div class="card-body">
                                <table class="table table-striped mt-1 table-hover mb-0">
                                    <thead>
                                        <tr>
                                            <!-- <td><input class="form-check-input" type="checkbox" id="exampleCheck1" @click="toggleSelection" /></td> -->
                                            <th>Feature ID</th>
                                            <th>Name</th>
                                            <th>Plan</th>
                                            <th>Action</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <tr>
                                            <td>1</td>
                                            <td>Email and social marketing</td>
                                            <td>Growth</td>
                                            <td>
                                                 <a  href="javascript: void(0);" data-bs-toggle="modal" data-bs-target=" "><i class="fa fa-edit text-muted"></i></a>
                                                <a  href="javascript: void(0);"><i class="fa fa-trash-alt ml-3 text-danger"></i></a>
                       
                                            </td>


                                            </tr>
                                    </tbody>
                                </table>
                            </div> 
                        </div>
                    </div>
                </div>
            </div>
        </div> 
    </div>
</template>
<script>
export default {
    name:'FeaturesList',
    data(){
        return{

        }
    }
}
</script>
<style scoped>

</style>

