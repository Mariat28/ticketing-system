<template>
	<div id="chart">
		<apexchart type="radialBar" height="200" :options="chartOptions" :series="series"></apexchart>
	</div>
</template>

<script>
import Apexchart from "vue-apexcharts";
import { mapState, mapGetters} from 'vuex';


export default {
    name:"AdminRadialBar",
		components:{
    Apexchart
		},
    data(){
        return{
					series: [],
					chartOptions: {
						chart: {
              height: 200,
              type: 'radialBar',
              offsetY: -10
            },
						plotOptions: {
              radialBar: {
                startAngle: -135,
                endAngle: 135,
                dataLabels: {
                  name: {
                    fontSize: '10px',
                    color: undefined,
                    offsetY: 100
                  },
									track:{
										show:true,
										background:'#556ee6'
									},
                  value: {
                    offsetY: 60,
                    fontSize: '15px',
                    color: undefined,
                    formatter: function (val) {
                      return val + "%";
                    }
                  }
                }
              }
            },
						fill: {
              type: 'gradient',
              gradient: {
                  shade: 'dark',
                  shadeIntensity: 0.15,
                  inverseColors: false,
									color:'#ffffff',
                  opacityFrom: 1,
                  opacityTo: 1,
                  stops: [0, 50, 65, 91]
              },
            },
            stroke: {
              dashArray: 4
            },
            labels: ['Paid Accounts'],
					}
        }
    },
    created(){
    this.$store.dispatch('fetchCompanies')
    this.planPercentage();
    },
    methods:{
    planPercentage(){
        const paidaccounts=((Object.keys(this.pro).length)+(Object.keys(this.growth).length)+(Object.keys(this.enterprise).length));
        const percent=((paidaccounts/(Object.keys(this.companies).length))*100);
        this.series.push(Math.round(percent));
    }
    },
    computed: {
      ...mapState({
      companies: (state) => state.companies.companies,
      }),
      ...mapGetters({
          free:'freePlan',
          growth:'growthPlan',
          pro:'proPlan',
          enterprise:'enterprisePlan'
      })
     },
}
</script>

