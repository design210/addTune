<script>
import { Doughnut } from "vue-chartjs";
import chartjsPluginDatalabels from "chartjs-plugin-datalabels";
export default {
  extends: Doughnut,
  props: ["gender", "callModal"],
  data() {
    return {
      datacollection: {
        datasets: [
          {
            label: ["남성", "여성"],
            data: [],
            backgroundColor: ["#5ab735", "#FF8A00"],
            hoverOffset: 100,
            hoverBackgroundColor: ["#5ab735", "#FF8A00"],
          },
        ],
      },
      options: {
        cutoutPercentage: 40,
        legend: {
          display: false,
        },
        tooltips: {
          enabled: false,
        },
        plugins: {
          datalabels: {
            color: "white",
            font: {
              weight: "bold",
              size: 20,
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
            formatter: function (value, func) {
              return func.dataset.label[func.dataIndex];
            },
          },
        },
      },
    };
  },
  watch: {
    gender(data) {
      this.datacollection.datasets[0].data = [data.male.percent, data.female.percent];
      this.addPlugin(chartjsPluginDatalabels);
      this.renderChart(this.datacollection, this.options);
    },
  },
  mounted() {
    this.datacollection.datasets[0].data = [this.gender.male.percent, this.gender.female.percent];
    this.addPlugin(chartjsPluginDatalabels);
    this.callModal && this.renderChart(this.datacollection, this.options);
  },
};
</script>
