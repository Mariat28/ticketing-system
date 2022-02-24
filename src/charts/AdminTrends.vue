<template>
   <div id="chart">
        <apexchart type="line" height="350" :options="chartOptions" :series="series"></apexchart>
      </div>
</template>
<script>
import Apexchart from "vue-apexcharts";
import { mapGetters, mapState } from "vuex";
import axios from 'axios'

export default {
  name: "AdminTrends",
  components: {
    Apexchart
  },
  data() {
    return {
      freeusers:[],
      prousers:[],
      enterpriseusers:[],
      growthusers:[],
           series: [{
              name: "Growth",
              data: [0,0,0,0,0,0,0,0,0,0,0,0]
            },
            
            {
              name: 'Pro',
              data: [0,0,0,0,0,0,0,0,0,0,0,0]
            },
            {
              name: "Enterprise",
              data: [0,0,0,0,0,0,0,0,0,0,0,0]
            },
            {
              name: "Free",
              data: [0,0,0,0,0,0,0,0,0,0,0,0]
            }
          ],
        chartOptions: {
            chart: {
              height: 350,
              type: 'line',
              zoom: {
                enabled: false
              },
            },
            dataLabels: {
              enabled: false
            },
            stroke: {
              width: [5, 7, 5],
              curve: 'straight',
              dashArray: [0, 5, 3]
            },
            title: {
              text: '',
              align: 'left'
            },
            legend: {
              tooltipHoverFormatter: function(val, opts) {
                return val + ' - ' + opts.w.globals.series[opts.seriesIndex][opts.dataPointIndex] + ''
              }
            },
            markers: {
              size: 0,
              hover: {
                sizeOffset: 6
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
            },
            tooltip: {
              y: [
                {
                  title: {
                    formatter: function (val) {
                      return val 
                    }
                  }
                },
                {
                  title: {
                    formatter: function (val) {
                      return val
                    }
                  }
                },
                {
                  title: {
                    formatter: function (val) {
                      return val;
                    }
                  }
                }
              ]
            },
            grid: {
              borderColor: '#f1f1f1',
            }
          },
    };
  },

  created(){
    let user = JSON.parse(sessionStorage.getItem('user'));
    this.$store.dispatch('fetchCompanies')
    this.freeusers=this.free;
    this.growthusers=this.growth;
    this.enterpriseusers=this.enterprise;
    this.prousers=this.pro;
    this.growthCompanies();
    this.proCompanies();
    this.enterpriseCompanies();
    this.freeCompanies();
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
  methods:{
    growthCompanies(){
      const companies=this.growthusers;
      for (let i = 0; i < 12; i++) {
        let sortedCompanies=companies.filter((company)=>company.month===i+1 )
        this.series[0].data[i] = sortedCompanies.length
      }
    },
    proCompanies(){
      const companies=this.prousers;
      for (let i = 0; i < 12; i++) {
        let sortedCompanies=companies.filter((company)=>company.month===i+1 )
        this.series[1].data[i] = sortedCompanies.length
      }
    },
    enterpriseCompanies(){
      const companies=this.enterpriseusers;
      for (let i = 0; i < 12; i++) {
        let sortedCompanies=companies.filter((company)=>company.month===i+1 )
        this.series[2].data[i] = sortedCompanies.length
      }
    },
    freeCompanies(){
      const companies=this.freeusers;
      for (let i = 0; i < 12; i++) {
        let sortedCompanies=companies.filter((company)=>company.month===i+1 )
        this.series[3].data[i] = sortedCompanies.length
      }
    }
  }
};
</script>

