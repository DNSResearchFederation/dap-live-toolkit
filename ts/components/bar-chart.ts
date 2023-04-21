import Chart from 'chart.js/auto';
import BaseChart from "./base-chart";

export default class BarChart extends BaseChart{

    protected drawChart(rawData){
        let labels = [];
        let data = [];
        let showYAxis = this.dataset.showYAxis ? this.dataset.showYAxis : false;
        rawData.forEach(item => {
            labels.push(item[this.dataset.xAxis]);
            data.push(item[this.dataset.yAxis]);
        });


        // Construct the data
        const dataSet = {
            labels: labels,
            datasets: [{
                label: this.dataset.yAxisLabel,
                backgroundColor: '#748EA0',
                borderColor: '#748EA0',
                data: data
            }]
        };

        const config = {
            type: 'bar',
            data: dataSet,
            options: {
                plugins: {
                    legend: {
                        display: false
                    }
                },
                scales: {
                    x: {
                        grid: {
                            display: false
                        }
                    },
                    y: {
                        grid: {
                            display: false
                        },
                        ticks: {display: showYAxis}
                    }
                }
            }
        };

        // Crate the canvas element
        let canvasElement = this.querySelector("canvas");

        // Create the chart
        new Chart(
            canvasElement,
            <any>config
        );
    }
}