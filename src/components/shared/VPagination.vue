<template>
    <div>
        <div class="pagination-row">
            <!-- previous  -->
            <button class="pagination-button btn btn-primary mr-1"
            @click="pageNumber = pageNumber-1">Previous</button>
            <!-- <button class="pagination-button btn btn-primary"> &lt;- </button> -->
            <span v-for="(item,index) in new Array(10)" :key="index">
                <button class="pagination-button btn text-primary border-secondary"
                @click="pageNumber = index+1">{{index+1}}</button>
            </span>
            <button class="pagination-button btn btn-primary ml-1"
            @click="pageNumber = pageNumber+1">Next</button>
            <!-- <button class="pagination-button btn btn-primary"> -&gt; </button> -->
            
        </div>
        <slot name="data" :pageNumber="pageNumber"></slot>
    </div>
</template>
<script>
export default {
    data(){
        return{
        pageNumber: 1
        }
    }
}
</script>
<style scoped>
.pagination-button{
    padding: 8px;
    margin: 2px;
    border-radius: 3px;
    font-size: 1em;
    cursor: pointer;
}
.pagination-row{
    padding: 5px 0;
}
</style>
