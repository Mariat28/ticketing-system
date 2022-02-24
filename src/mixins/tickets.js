import axios from 'axios';

export default {
    data(){
        return{
            tickets:[],
            opentickets:[],
            pendingtickets:[],
            urgenttickets:[],
        }
    },
    created(){
        this.openTickets();
        this.urgentTickets();
        this.pendingTickets();
    },
    methods:{
        async fetctAllTickets() {
            const response = await axios.get(
              `${this.$store.state.prodEndPoint}tickets/1`
            );
            let data = response.data;
            this.tickets = data;
            this.$refs.topProgress.done();
            console.log(`Tickets ${this.tickets}`);
          },
        openTickets(){
            const open= (this.tickets).filter((ticket)=>ticket.status==='Open');
            this.opentickets.push(open)
    
        },
        pendingTickets(){
            const pending= (this.tickets).filter((ticket)=>ticket.status==='Pending');
            this.pendingtickets.push(pending)
    
        },
        urgentTickets(){
            const urgent= (this.tickets).filter((ticket)=>ticket.priority==='Urgent');
            this.urgenttickets.push(urgent)
    
        },

    }
}