import BaseComponent from "./base-component";
import Mustache from 'mustache';
import TableView from "../views/table-view";
import tableView from "../views/table-view";

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

        if (properties.tableClassKeys)
            model["classKeys"] = properties.tableClassKeys.split(",");

        let tableColumnFormats = null;
        if (properties.tableColumnFormats)
            tableColumnFormats = properties.tableColumnFormats.split(",");


        let data = [];
        if (properties.tableConnectionPath) {
            data = await this.callApiConnection(properties.tableConnectionPath, {limit: properties.tableLimit || 50});
            model.data = [];
            data.forEach(row => {
                let newRow = [];
                let rowClickUrl = null;
                if (properties.rowClickUrl) {
                    rowClickUrl = properties.rowClickUrl.replace(/{.*?}/g, (matches => {
                        let property = matches.substring(1, matches.length-1);
                        return row[property];
                    }));
                }

                model.dataKeys.forEach((key: string, index: number) => {
                    let value = row[key];

                    if (tableColumnFormats && tableColumnFormats[index]) {
                        switch (tableColumnFormats[index]) {
                            case "commasepthousands":
                                value = Number(value).toLocaleString("en-US");
                                break;
                            case "change":
                            case "changepercent":
                                if (value > 0) {
                                    value = '<span class="success no-bg">' + '&#x2191;' + value + (tableColumnFormats[index] == "changepercent" ? "%" : "") + '</span>';
                                } else if (value < 0) {
                                    value = '<span class="danger no-bg">' + '&#x2193;' + value + (tableColumnFormats[index] == "changepercent" ? "%" : "") + '</span>';
                                }
                                break;
                        }

                    }
                    //Derive the class
                    let classProperty = model.classKeys ? model.classKeys[index] : null;
                    let className = classProperty ? row[classProperty] : "";
                    newRow.push({value, className, rowClickUrl});
                });
                model.data.push(newRow);
            });
        }

        element.innerHTML = Mustache.render(TableView, model);

        //Toggle button functionality
        element.querySelectorAll(".toggle-message").forEach(button => {
            button.addEventListener("click", () => {
                element.querySelector(".message").classList.toggle("hide");
            });
        });

    }
}