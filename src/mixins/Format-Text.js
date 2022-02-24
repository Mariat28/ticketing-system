export default{
    methods:{
        formatDate(date){
            // Split timestamp into [ Y, M, D, h, m, s ]
            let created_at = date.split(/[- :]/);
            let formatted_date = new Date(Date.UTC(created_at));
            return formatted_date;

        }
        
    }
}