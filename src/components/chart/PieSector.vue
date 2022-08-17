<script>
import { Doughnut } from "vue-chartjs";
import chartjsPluginDatalabels from "chartjs-plugin-datalabels";
export default {
  extends: Doughnut,
  props: ["data", "callModal"],
  data() {
    return {
      datacollection: {
        datasets: [
          {
            data: [],
            backgroundColor: [],
            hoverOffset: 100,
          },
        ],
      },
      options: {
        hover: { mode: null },
        cutoutPercentage: 0,
        legend: {
          display: false,
        },
        tooltips: {
          enabled: false,
        },
        plugins: {
          datalabels: {
            color: [],
            font: {
              weight: 600,
              size: 16,
              family: "Montserrat",
            },
            padding: 6,
            labels: {
              title: {
                font: {
                  weight: "bold",
                },
              },
              value: {
                color: "green",
              },
            },
            formatter: function (value) {
              return value > 5 ? `${value}%` : "";
            },
          },
        },
      },
    };
  },
  watch: {
    data() {
      //높은값 순차 index 찾기
      this.datacollection.datasets[0].data = this.data;
      const origin = this.data.concat();
      const index = [];
      function calc(arr) {
        for (let i = 0; i < arr.length; i++) {
          let max = Math.max.apply(null, arr);
          let indexCalc = arr.indexOf(max);
          index.push(indexCalc);
          origin[indexCalc] = -1;
        }
      }
      calc(origin);
      this.datacollection.datasets[0].backgroundColor[index[0]] = "#ff4d56";
      this.datacollection.datasets[0].backgroundColor[index[1]] = "#FF8F95";
      this.datacollection.datasets[0].backgroundColor[index[2]] = "#f2aaac";
      this.datacollection.datasets[0].backgroundColor[index[3]] = "#f9dcde";
      this.datacollection.datasets[0].backgroundColor[index[4]] = "#F2F2F2";
      this.options.plugins.datalabels.color[index[0]] = "#fff";
      this.options.plugins.datalabels.color[index[1]] = "#fff";
      this.options.plugins.datalabels.color[index[2]] = "#fff";
      this.options.plugins.datalabels.color[index[3]] = "#fff";
      this.options.plugins.datalabels.color[index[4]] = "#000";
      this.addPlugin(chartjsPluginDatalabels);
      this.renderChart(this.datacollection, this.options);
    },
  },
  mounted() {
    //높은값 순차 index 찾기
    this.datacollection.datasets[0].data = this.data;
    const origin = this.data.concat();
    const index = [];
    function calc(arr) {
      for (let i = 0; i < arr.length; i++) {
        let max = Math.max.apply(null, arr);
        let indexCalc = arr.indexOf(max);
        index.push(indexCalc);
        origin[indexCalc] = -1;
      }
    }
    calc(origin);
    this.datacollection.datasets[0].backgroundColor[index[0]] = "#ff4d56";
    this.datacollection.datasets[0].backgroundColor[index[1]] = "#FF8F95";
    this.datacollection.datasets[0].backgroundColor[index[2]] = "#f2aaac";
    this.datacollection.datasets[0].backgroundColor[index[3]] = "#f9dcde";
    this.datacollection.datasets[0].backgroundColor[index[4]] = "#F2F2F2";
    this.options.plugins.datalabels.color[index[0]] = "#fff";
    this.options.plugins.datalabels.color[index[1]] = "#fff";
    this.options.plugins.datalabels.color[index[2]] = "#fff";
    this.options.plugins.datalabels.color[index[3]] = "#fff";
    this.options.plugins.datalabels.color[index[4]] = "#000";
    this.addPlugin(chartjsPluginDatalabels);
    this.callModal && this.renderChart(this.datacollection, this.options);
  },
};
</script>
