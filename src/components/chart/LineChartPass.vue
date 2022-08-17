<script>
import { Line } from "vue-chartjs";
import roundNumber from "@/utils/toFixed";
export default {
  extends: Line,
  props: ["date", "before", "current", "callModal"],
  data() {
    return {
      datacollection: {
        //Data to be represented on x-axis
        labels: ["11/1", "11/2"],
        datasets: [
          {
            label: "",
            fill: false,
            borderWidth: 3,
            borderColor: "rgba(255,77,86,1)",
            data: [10, 1],
            borderJoinStyle: "round",
            tension: 0,
          },
          {
            label: "",
            fill: false,
            borderWidth: 3,
            borderColor: "rgba(255,217,219,1)",
            data: [8, 5],
            tension: 0,
          },
        ],
      },
      //Chart.js options that controls the appearance of the chart
      options: {
        layout: {
          padding: {
            right: 30,
          },
        },

        elements: {
          point: {
            radius: 0,
            hitRadius: 10,
            hoverRadius: 0,
          },
        },
        scales: {
          xAxes: [
            {
              gridLines: {
                drawOnChartArea: false,
                drawTicks: false,
              },
              ticks: {
                fontSize: 16,
                padding: 10,
                labelOffset: 10,
                maxRotation: 0,
                fontFamily: "Montserrat",
                fontColor: "#828282",
              },
            },
          ],
          yAxes: [
            {
              gridLines: {
                borderDash: [8, 4],
                drawTicks: false,
                zeroLineColor: "rgba(0,0,0,0.01)",
              },
              ticks: {
                beginAtZero: true,
                fontSize: 16,
                padding: 10,
                fontFamily: "Montserrat",
                fontColor: "#828282",
              },
            },
          ],
        },

        legend: {
          display: false,
        },
        responsive: true,
        maintainAspectRatio: false,
        tooltips: {
          enabled: false,
          custom: function (tooltipModel) {
            // Tooltip Element
            var tooltipEl = document.getElementById("chartjs-tooltip");
            // Create element on first render
            if (!tooltipEl) {
              tooltipEl = document.createElement("div");
              tooltipEl.id = "chartjs-tooltip";
              tooltipEl.innerHTML = '<span class="line"></span><table></table>';
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
                let originInt = parseInt(body);
                body = parseInt(body).toLocaleString(); //int 타입 변경
                var unit = "명";
                //단위 변경
                if (originInt > 10000) {
                  body = roundNumber(originInt / 10000, 2);
                  unit = "만명";
                }
                var colors = tooltipModel.labelColors[i];
                var style = "background:" + colors.backgroundColor;
                style += "; border-color:" + colors.borderColor;
                style += "; border-width: 2px";
                var span = '<span style="' + style + '"></span>';
                innerHtml += '<tr><td class="text">' + span + body + ' <span class="unit">' + unit + "</span></td></tr>";
              });
              innerHtml += "</tbody>";

              var tableRoot = tooltipEl.querySelector("table");
              tableRoot.innerHTML = innerHtml;
            }
            // `this` will be the overall tooltip
            var position = this._chart.canvas.getBoundingClientRect();

            const offset = -60;
            const offsetMinus = 50;
            // Display, position, and set styles for font
            tooltipEl.style.opacity = 1;
            tooltipEl.style.position = "absolute";
            tooltipEl.style.left = position.left + window.pageXOffset + tooltipModel.caretX - offsetMinus + "px";
            tooltipEl.style.top = position.top + window.pageYOffset + offset + "px";
            tooltipEl.style.fontFamily = tooltipModel._bodyFontFamily;
            tooltipEl.style.fontSize = tooltipModel.bodyFontSize + "px";
            tooltipEl.style.pointerEvents = "none";
            tooltipEl.style.background = "#FF4D56";
            tooltipEl.style.color = "#fff";
            tooltipEl.style.width = "100px";
            tooltipEl.style.borderRadius = "100px";
          },
        },
      },
    };
  },
  watch: {
    current() {
      this.datacollection.datasets[0].data = this.current;
      this.datacollection.datasets[1].data = this.before;
      this.datacollection.labels = this.date;
      this.renderChart(this.datacollection, this.options);
    },
  },
  mounted() {
    this.datacollection.datasets[0].data = this.current;
    this.datacollection.datasets[1].data = this.before;
    this.datacollection.labels = this.date;
    this.callModal && this.renderChart(this.datacollection, this.options);
  },
};
</script>
<style lang="scss">
#chartjs-tooltip {
  position: relative;
  padding: 4px 10px !important;
  white-space: nowrap;
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
  .line {
    height: 289px;
    border-left: 1px solid #bdbdbd;
    position: absolute;
    top: 100%;
    left: calc(50% - 1px);
  }
}
</style>
