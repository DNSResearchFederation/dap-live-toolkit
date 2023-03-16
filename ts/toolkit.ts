/* Main wrapper class */

import Table from "./components/table";

export default class DAPLiveToolkit {
    public static createTable(elementSelector, properties: any) {
        new Table(properties, elementSelector);
    }
}

// Add our components as custom elements
customElements.define("dap-table", Table);