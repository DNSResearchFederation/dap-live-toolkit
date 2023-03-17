export default class Remote {
    private _config: any;

    constructor(config: any) {
        this._config = config;

    }

    /**
     * Call API connection
     * @param feedPath
     * @param parameters
     * @param config
     */
    public async callApiConnection(feedPath: string, parameters = {}, config:any = {}) {

        let combinedProps = {...this._config, ...config};
        let endPoint = combinedProps.useStage ? "https://stage-webservices.dap.live" : "https://webservices.dap.live";

        let url = endPoint + "/feed/" + feedPath + "?apiKey=" + combinedProps.apiKey + "&apiSecret=" + combinedProps.apiSecret;
        if (Object.keys(parameters).length){
            let paramStrings = [];
            Object.keys(parameters).forEach(param => {
                  paramStrings.push(param + "=" + parameters[param]);
            });
            url += "&" + paramStrings.join("&");
        }

        let result = await fetch( url);
        return await result.json();


    }
}
