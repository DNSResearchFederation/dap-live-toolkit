import BaseComponent from "./base-component";
import Mustache from 'mustache';
import Chart from 'chart.js/auto';
import ChartView from "../views/chart-view";

export default abstract class BaseChart extends BaseComponent{
    /**
     * Call initializer
     *
     * @param element
     * @param properties
     */
    protected async init(element: HTMLElement, properties: any) {
        let model: any = {properties};

        // Handle the comma separated attributes
        if (properties.categories)
            model["categories"] = properties.categories.split(",");

        let data = [];
        let metricData = [];
        if (properties.metricConnectionPath) {
            metricData = await this.callApiConnection(properties.metricConnectionPath)
            if (metricData && metricData[0]) {
                model.metricData = metricData[0][properties.metricProperty];
                model.metricChange = metricData[0][properties.metricChangeProperty];
                model.metricChangeIsPercentage = properties.metricChangeIsPercentage;

                if (model.metricChangeIsPercentage === "true") {
                    model.metricChangeIsPercentage = true;
                } else if (model.metricChangeIsPercentage === "false") {
                    model.metricChangeIsPercentage = false;
                }

                if (model.metricChange > 0) {
                    model.metricChangeClass = properties.metricIncreaseIsBad === "true" ? "danger" : "success";
                    model.metricIncrease = true;
                } else if (model.metricChange < 0) {
                    model.metricChangeClass = properties.metricIncreaseIsBad === "true" ? "success" : "danger";
                    model.metricIncrease = false;
                }
            }
        }
        if (properties.chartConnectionPath) {
            data = await this.callApiConnection(properties.chartConnectionPath, {limit: properties.lineChartLimit || 6});
        }
        element.innerHTML = Mustache.render(ChartView, model);
        //Toggle button functionality
        element.querySelectorAll(".toggle-message").forEach(button => {
            button.addEventListener("click", () => {
                element.querySelector(".message").classList.toggle("hide");
            });
        });

        const elements = document.querySelectorAll('.metric-number');
        // Loop through each element and add commas to the number inside
        elements.forEach((element: HTMLElement) => {
            const value = element.innerHTML.replace(/\B(?=(\d{3})+(?!\d))/g, ",");
            element.innerHTML = value;
        });
        this.drawChart(data);
    }


    protected abstract drawChart(data);

}