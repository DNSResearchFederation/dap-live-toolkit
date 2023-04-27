import Chart from 'chart.js/auto';
import BaseChart from "./base-chart";
import BaseComponent from "./base-component";

export default class PieChart extends BaseChart{

    protected drawChart(rawData){
        let labels = [];
        let data = [];
        rawData.forEach(item => {
            labels.push(item[this.dataset.keyProperty]);
            data.push(item[this.dataset.valueProperty]);
        });

        // Construct the data
        const dataSet = {
            labels: labels,
            datasets: [{
                label: this.dataset.pieLabel,
                backgroundColor: [
                    '#748EA0',
                    '#654E92',
                    '#6C9BCF'
                ],
                borderColor: '#748EA0',
                hoverOffset: 4,
                data: data
            }]
        };
        console.log(dataSet);
        const config = {
            type: 'pie',
            data: dataSet,
            options: {
                animation: {
                  animateScale: true,
                  animateRotate: true,
                },
                plugins: {
                    legend: {
                        display: true
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