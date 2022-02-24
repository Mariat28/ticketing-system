<template>
	<div id="chart">
		<apexchart
			type="bar"
			height="100%"
			:options="chartOptions"
			:series="series"
			ref="chart"
		></apexchart>
	</div>
</template>
<script>
import Apexchart from "vue-apexcharts";
import { mapGetters } from "vuex";


export default {
  name: "StackedColumn",
  components: {
    Apexchart
  },
  data() {
    return {
      chartOptions: {
        chart: {
          type: "bar",
          height: 400,
          stacked: true,
          toolbar: {
            show: true
          },
          zoom: {
            enabled: true
          }
        },
        responsive: [
          {
            breakpoint: 480,
            options: {
              legend: {
                position: "bottom",
                offsetX: -10,
                offsetY: 0
              }
            }
          }
        ],
        plotOptions: {
          bar: {
            horizontal: false,
            borderRadius: 10
          }
        },
        xaxis: {
          categories: [
            "Jan",
            "Feb",
            "Mar",
            "Apr",
            "May",
            "Jun",
            "Jul",
            "Aug",
            "Sep",
            "Oct",
            "Nov",
            "Dec"
          ],
          title: {
            text: "Month"
          }
        },

        legend: {
          position: "right",
          offsetY: 40
        },
        fill: {
          opacity: 1
        },
        yaxis: {
          title: {
            text: "Ticket Volume"
          }
        }
      }
    };
  },

  created(){
    this.$store.dispatch('fetchAllTickets');
     let user = JSON.parse(sessionStorage.getItem('user'));
    this.$store.dispatch('fetchSortedTickets', user.company_id);
    console.log(this.pending);
  },

  computed: {
    ...mapGetters({
        opentickets:'openTickets',
        pendingtickets:'pendingTickets',
        closedtickets:'closedTickets',
        pending:'pendingSorted'

    }),
    series() {
      return [
        {
          name: "PENDING",
          data: [0,0, 0, 0,0, 0,0,this.pendingtickets.length,0, 0,0,0],
					color:'#556ee6'
        },
       {
        name: 'CLOSED',
        data: [0,0, 0, 0,0, 0,0,this.closedtickets.length,0, 0,0,0],
				color:'#9ACD32'

      }, {
        name: 'OPEN',
        data: [0,0, 0, 0,0, 0,0,this.opentickets.length,0, 0,0,0],
        color:'#808000'
      },
			// {
      //   name: 'UNASSIGNED',
      //   data: [0,0, 0, 0,0, 0,7,0,0, 0,0,0],
      //   color:'#800000'

      // }
      ];
    },
    
  }
};
</script>

<style>
#chart {
  height: 95%;
}
</style>