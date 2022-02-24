import axios  from "axios";
const apiClient=axios.create({
    baseURL:'https://45.66.157.245/backend/public/api/',
    withCredentials: false,
    headers: {
        Accept: 'application/json',
    'Content-Type': 'application/json',
    },
});

export default{
    getTickets(){
        return apiClient.get('tickets/1');
    },
    postTicket(ticket){
        return apiClient.post('https://45.66.157.245/backend/public/api/tickets', ticket);
    }
}