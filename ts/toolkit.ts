/* Main wrapper class */

import Table from "./components/table";
import Remote from "./util/remote";

export default class DAPLiveToolkit {

    private _config: any;

    constructor(config: any) {
        this._config = config;

    }

    //Public Call API Connection
    public async callApiConnection(feedPath: string, parameters = {}, config = {}) {
        let remote = new Remote({...this._config, ...config});
        return await remote.callApiConnection(feedPath, parameters);
    }

    public createTable(elementSelector, properties: any) {
        new Table({...this._config, ...properties}, elementSelector);
    }
}

// Add our components as custom elements
customElements.define("dap-table", Table);