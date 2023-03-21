import BaseComponent from "./base-component";
import Mustache from 'mustache';
import TableView from "../views/table-view";

export default class Table extends BaseComponent {

    /**
     * Call initialiser
     *
     * @param element
     * @param properties
     */
    protected async init(element: HTMLElement, properties: any) {
        let model: any = {properties};


        // Handle the comma separated attributes
        if (properties.categories)
            model["categories"] = properties.categories.split(",");

        if (properties.tableHeaders)
            model["headers"] = properties.tableHeaders.split(",");

        if (properties.tableDataKeys)
            model["dataKeys"] = properties.tableDataKeys.split(",");


        let data = [];
        if (properties.tableConnectionPath) {
            data = await this.callApiConnection(properties.tableConnectionPath, {limit: properties.tableLimit || 50});
            model.data = [];
            data.forEach(row => {
                let newRow = [];
               model.dataKeys.forEach(key =>{
                   newRow.push(row[key]);
               });
               model.data.push(newRow);
            });
        }

        element.innerHTML = Mustache.render(TableView, model);

        //Toggle button functionality
        element.querySelectorAll(".toggle-message").forEach(button=>{
            button.addEventListener("click",()=>{
                element.querySelector(".message").classList.toggle("hide");
            });
        });
    }
}