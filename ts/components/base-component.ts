import Remote from "../util/remote";

/**
 * Base component for core logic for all of our components
 */
export default abstract class BaseComponent extends HTMLElement {

    /**
     * Configured properties
     *
     * @private
     */
    protected _properties: any;

    /**
     * HTML element
     *
     * @private
     */
    protected _element: HTMLElement;


    /**
     * Configure with properties or data attributes
     *
     * @param properties
     */
    constructor(properties: any = {}, elementSelector: string) {
        super();
        if (elementSelector) {
            this._element = document.querySelector(elementSelector);
        } else {
            this._element = this;
            if (!properties.apiKey){
                let apiElement:HTMLElement = this.closest("[data-dap-api-key]");
                if (apiElement){
                    properties.apiKey = apiElement.dataset.dapApiKey;
                    properties.apiSecret = apiElement.dataset.dapApiSecret;
                    properties.useStage = apiElement.dataset.dapUseStage;
                }

            }
            let theme = this.closest("[data-theme]");
        }

        // find any inline templates
        let templateProps = {};
        this._element.querySelectorAll("template[data-property]").forEach((element: HTMLElement) => {
            templateProps[element.dataset.property] = element.innerHTML;
        });

        this._properties = {...properties, ...(<HTMLElement>this).dataset, ...templateProps};

        this._element.classList.add("dap-component");

        // Call init on child component
        this.init(this._element, this._properties);
    }

    //Public Call API Connection
    protected async callApiConnection(feedPath: string, parameters = {}, properties = {}) {
        let remote = new Remote({...this._properties, ...properties});
        return await remote.callApiConnection(feedPath, parameters);
    }


    /**
     * Abstract method for intialising our components
     *
     * @param element
     * @param properties
     */
    protected abstract init(element, properties);


}