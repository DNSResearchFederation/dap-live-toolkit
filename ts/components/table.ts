import BaseComponent from "./base-component";
import Mustache from 'mustache';
import TableView from "../views/table-view";
import tableView from "../views/table-view";

export default class Table extends BaseComponent {

    // Model
    private _model: any;

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

        this._model = model;

        if (properties.apiKey)
            this.populate(properties, model);


    }

    static get observedAttributes() { return ['data-dap-api-key', 'data-dap-api-secret']; }

    attributeChangedCallback(name, oldValue, newValue) {
        console.log("BINGO");
        if (name == "data-dap-api-key") {
            this._properties.apiKey = newValue;
        }
        if (name == "data-dap-api-secret") {
            this._properties.apiSecret = newValue;
        }
        if (this._properties.apiKey && this._properties.apiSecret) {
            this.populate(this._properties, this._model);
        }
    }


    private async populate(properties, model) {


        let tableColumnFormats = null;
        if (properties.tableColumnFormats)
            tableColumnFormats = properties.tableColumnFormats.split(",");


        let data = [];
        if (properties.tableConnectionPath) {
            data = await this.callApiConnection(properties.tableConnectionPath, {limit: properties.tableLimit || 50});
            model.data = [];
            if (data instanceof Array) {
                data.forEach(row => {
                    let newRow = [];
                    let rowClickUrl = null;
                    if (properties.rowClickUrl) {
                        rowClickUrl = properties.rowClickUrl.replace(/{.*?}/g, (matches => {
                            let property = matches.substring(1, matches.length - 1);
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
        }

        this._element.innerHTML = Mustache.render(TableView, model);

        //Toggle button functionality
        this._element.querySelectorAll(".toggle-message").forEach(button => {
            button.addEventListener("click", () => {
                this._element.querySelector(".message").classList.toggle("hide");
            });
        });

    }

}