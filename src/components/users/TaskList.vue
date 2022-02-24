<template>
    <div class="card todo-list">
        <div class="card-body">
            <h4 class="card-title mb-4">To Do List</h4>
            <span
                class="text-success me-2 mt-0 add"
                @click="showTaskInput"
                id="addtask"
            >
                <i class="mdi mdi-plus-circle font-size-16"></i> Add to do </span>
                <hr>
                <!-- <div v-for="task in tasks" :key="task.id" class="todo-item">
                    <div>
                        {{task.name}}
                    </div>
                    <div class="remove-task">
                    <i class="fa fa-edit float-right text-primary mr-4 task-icons font-size-10"></i>
                    <i class="fa fa-times-circle float-right text-muted task-icons" @click="removeTask" ></i>
                    </div>
                </div> -->
                <div id="tasklist" v-for="(task,index) in tasks" :key="task.id">
                <ul v-if="!task.editing">
                    <input class="form-check-input" type="checkbox" value="" id="taskcheck" @change="completedTask" />
                    <li class="text-start" id="taskname">{{task.task.name}}</li>
                    <i class="fa fa-edit float-right text-primary mr-4 task-icons font-size-10" @click="editTask(task)"></i>
                    <i class="fa fa-times-circle float-right text-muted task-icons" @click="removeTask(index,task)" ></i>
                </ul>
                 <input  v-else
                    type=text
                    class="form-control form-control-sm border-primary"
                    id="edittask"
                    name="name"
                    v-model="task.task.name"
                    @blur="doneEdit(task)"

                    @keyup.enter="doneEdit(task)"
                />
                </div>
                
                <input
                    type=text
                    class="form-control form-control-sm d-none"
                    placeholder="Task name"
                    id="task"
                    name="name"
                    v-model="taskname"
                    @keyup.enter="addTask"
                />
                <a
                    @click="addTask"
                    class="btn btn-primary btn-sm text-white float-right mt-1 d-none"
                    id="task-btn" type="submit" 
                >SAVE</a>
                    <p class="text-muted mt-3 d-none" v-if="tasks.length===0">You have no pending tasks</p>
        </div>
    </div>
</template>
<script>
import axios from 'axios';

export default {
  name: "TaskList",
  data(){
      return{
          taskname: ' ',
          tasks:[],
          task_id:0,
          user:''
      }
  },
  mounted(){
// //Get cached list
// if (localStorage.getItem("tasklist")) {
//     this.tasks = JSON.parse(localStorage.getItem("tasklist"));
// } else {
//     // No data, start with an empty array
//     this.tasks = [];
// }
  },
  created(){
    this.user= JSON.parse(sessionStorage.getItem(`user`));
    this.getTasks();
  },
  methods: {
    showTaskInput() {
      let taskinput = document.getElementById("task");
      let taskbtn = document.getElementById("task-btn");
      taskinput.classList.toggle("d-none");
      taskbtn.classList.toggle("d-none");
    },
    addTask(){
        this.showTaskInput();
        let task={
            name:this.taskname,
            company_id:this.user.company_id,
            agent_id:this.user.id,
        }
        try
        {
         if(this.taskname.trim().length==0){
            return
        }
            axios.post('tasks',task).then((response)=>{
                let task=response.data
                const newtask={
                    task,
                    completed:false,
                    editing:false
                }
            this.tasks.push(newtask);
            })
        //   this.tasks.push({
        //       name:this.taskname,
        //       completed:false,
        //       id:task.id,
        //       editing:false 
        //   });
          
        //   localStorage.setItem("tasklist", JSON.stringify(this.tasks));
        //   this.$toasted.show("task saved..!");

        }catch{
            console.error;
        }
        this.taskname=''
        this.task_id++
        console.log(this.task_id);

    },
    async getTasks(){
        await axios.get('tasks',{params:{company_id:this.user.company_id, agent_id:this.user.id}}).then((response)=>{
            let data=response.data
            data.forEach(task => {
                this.tasks.push({task, completed:false, editing:false})
            });
             
        });

    },
    completedTask(){
        document.getElementById("taskname").classList.add('completed');
        console.log('checked')
    },
    removeTask(index,task){
        axios.post('deletetask',{taskId:task.task.id}).then(()=>{
        const indexOfArrayItem = this.tasks.findIndex((i) => i.id === task.id);
        this.tasks.splice(indexOfArrayItem, 1);
        })
    },
    editTask(task){
        task.editing=true;
    },
    doneEdit(task){
        task.editing=false;
        

    }
  }
};
</script>
<style scoped>
.todo-list {
    height: 400px;
    overflow-y: scroll;
}
.add:hover {
  cursor: pointer;
}
.task-icons{
    margin-top:-16px;
}
.task-icons:hover{
    cursor: pointer;
}
hr{
    margin-top: 0px;
}
.completed{
text-decoration:line-through;
}
 
</style>


