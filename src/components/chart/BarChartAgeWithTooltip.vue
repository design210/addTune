<script>
//Importing Bar class from the vue-chartjs wrapper
import { Bar } from "vue-chartjs";
import chartjsPluginDatalabels from "chartjs-plugin-datalabels";
import roundNumber from "@/utils/toFixed";
//Exporting this so it can be used in other components
export default {
  extends: Bar,
  props: ["labels", "data", "percent"],
  data() {
    return {
      datacollection: {
        //Data to be represented on x-axis
        total: 0,
        labels: [],
        datasets: [
          {
            label: "",
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
          custom: function (tooltipModel) {
            // Tooltip Element
            var tooltipEl = document.getElementById("chartjs-tooltip2");
            // Create element on first render
            if (!tooltipEl) {
              tooltipEl = document.createElement("div");
              tooltipEl.id = "chartjs-tooltip2";
              tooltipEl.innerHTML = "<table></table>";
              document.body.appendChild(tooltipEl);
            }
            // Hide if no tooltip
            if (tooltipModel.opacity === 0) {
              tooltipEl.style.opacity = 0;
              return;
            }

            // Set caret Position
            tooltipEl.classList.remove("above", "below", "no-transform");
            if (tooltipModel.yAlign) {
              tooltipEl.classList.add(tooltipModel.yAlign);
            } else {
              tooltipEl.classList.add("no-transform");
            }

            function getBody(bodyItem) {
              return bodyItem.lines;
            }
            const _this = this;
            // Set Text
            if (tooltipModel.body) {
              //var titleLines = tooltipModel.title || [];
              var bodyLines = tooltipModel.body.map(getBody);
              bodyLines = bodyLines.pop();

              var innerHtml = "<thead>";

              // titleLines.forEach(function (title) {
              // 	innerHtml += '<tr><th>' + title + '</th></tr>';
              // });
              innerHtml += "</thead><tbody>";
              bodyLines.forEach(function (body, i) {
                let total = _this._data.total;
                let originInt = parseInt(body);
                let percent = (originInt / total) * 100;
                var unit = "%";
                var colors = tooltipModel.labelColors[i];
                var style = "background:" + colors.backgroundColor;
                style += "; border-color:" + colors.borderColor;
                style += "; border-width: 2px";
                var span = '<span style="' + style + '"></span>';
                innerHtml += '<tr><td class="text">' + span + percent.toFixed(1) + ' <span class="unit">' + unit + "</span></td></tr>";
              });
              innerHtml += "</tbody>";

              var tableRoot = tooltipEl.querySelector("table");
              tableRoot.innerHTML = innerHtml;
            }
            // `this` will be the overall tooltip
            var position = this._chart.canvas.getBoundingClientRect();
            const offset = -65;
            const offsetMinus = 50;
            // Display, position, and set styles for font
            tooltipEl.style.opacity = 1;
            tooltipEl.style.position = "absolute";
            tooltipEl.style.left = position.left + window.pageXOffset + tooltipModel.caretX - offsetMinus + "px";
            tooltipEl.style.top = position.top + window.pageYOffset + tooltipModel.caretY + offset + "px";
            tooltipEl.style.fontFamily = tooltipModel._bodyFontFamily;
            tooltipEl.style.fontSize = tooltipModel.bodyFontSize + "px";
            tooltipEl.style.pointerEvents = "none";
            tooltipEl.style.background = "#FF4D56";
            tooltipEl.style.color = "#fff";
            tooltipEl.style.width = "100px";
            tooltipEl.style.borderRadius = "100px";
          },
        },
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          datalabels: {
            percent: [],
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
            offset: -5,
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
      //높은값 순차 index 찾기대
      this.datacollection.datasets[0].data = this.data;
      this.datacollection.labels = this.labels;
      const total = this.data.reduce((a, b) => {
        return a + b;
      }, 0);
      this.datacollection.total = total;
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
};
</script>
<style lang="scss">
#chartjs-tooltip2 {
  position: relative;
  padding: 4px 10px !important;
  white-space: nowrap;
  z-index: 1000;
  &:after {
    content: " ";
    position: absolute;
    top: 100%;
    left: 50%;
    margin-left: -5px;
    border-width: 5px;
    border-style: solid;
    border-color: #ff4d56 transparent transparent transparent;
  }
  & .text {
    position: relative;
    text-align: center;
    @include Montserrat(1.6, 700, #fff);
    & .unit {
      font-size: 1.1rem;
    }
  }
}
</style>
