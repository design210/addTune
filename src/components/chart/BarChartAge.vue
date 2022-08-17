<script>
//Importing Bar class from the vue-chartjs wrapper
import { Bar } from "vue-chartjs";
import chartjsPluginDatalabels from "chartjs-plugin-datalabels";
//Exporting this so it can be used in other components
export default {
  extends: Bar,
  props: ["labels", "data", "callModal"],
  data() {
    return {
      datacollection: {
        //Data to be represented on x-axis
        labels: [],
        datasets: [
          {
            label: "Data One",
            backgroundColor: [],
            borderWidth: 0,
            data: [],
            barThickness: 60,
          },
        ],
      },
      //Chart.js options that controls the appearance of the chart
      options: {
        hover: { mode: null },
        layout: {
          padding: {
            top: 30,
          },
        },
        scales: {
          xAxes: [
            {
              gridLines: {
                display: false,
              },
              ticks: {
                fontSize: 16,
                fontFamily: "Montserrat",
                fontColor: "#828282",
              },
            },
          ],
          yAxes: [
            {
              ticks: {
                beginAtZero: true,
                fontColor: "white",
              },
              gridLines: {
                color: "white",
                zeroLineColor: "rgba(0,0,0,0.1)",
              },
            },
          ],
        },
        legend: {
          display: false,
        },
        tooltips: {
          enabled: false,
        },
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          datalabels: {
            borderColor: "white",
            borderRadius: 25,
            color: [],
            display: true,
            font: {
              weight: 500,
              size: 17,
              family: "Montserrat",
            },
            padding: 6,
            align: "end",
            anchor: "end",
            offset: 0,
            formatter: function (value) {
              return value.toLocaleString();
            },
          },
        },
      },
    };
  },
  watch: {
    data() {
      //renderChart function renders the chart with the datacollection and options object.
      //높은값 순차 index 찾기대			;
      this.datacollection.datasets[0].data = this.data;
      this.datacollection.labels = this.labels;
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
      this.datacollection.datasets[0].backgroundColor[index[0]] = "#FF4D56";
      this.datacollection.datasets[0].backgroundColor[index[1]] = "#828282";
      this.options.plugins.datalabels.color[index[0]] = "#FF4D56";
      this.options.plugins.datalabels.color[index[1]] = "#828282";
      for (let i = 2; i < index.length; i++) {
        this.datacollection.datasets[0].backgroundColor[index[i]] = "#E0E0E0";
        this.options.plugins.datalabels.color[index[i]] = "#828282";
      }
      this.addPlugin(chartjsPluginDatalabels);
      this.renderChart(this.datacollection, this.options);
    },
  },
  mounted() {
    //renderChart function renders the chart with the datacollection and options object.
    //높은값 순차 index 찾기대			;
    this.datacollection.datasets[0].data = this.data;
    this.datacollection.labels = this.labels;
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
    this.datacollection.datasets[0].backgroundColor[index[0]] = "#FF4D56";
    this.datacollection.datasets[0].backgroundColor[index[1]] = "#828282";
    this.options.plugins.datalabels.color[index[0]] = "#FF4D56";
    this.options.plugins.datalabels.color[index[1]] = "#828282";
    for (let i = 2; i < index.length; i++) {
      this.datacollection.datasets[0].backgroundColor[index[i]] = "#E0E0E0";
      this.options.plugins.datalabels.color[index[i]] = "#828282";
    }
    this.addPlugin(chartjsPluginDatalabels);
    this.callModal && this.renderChart(this.datacollection, this.options);
  },
};
</script>
