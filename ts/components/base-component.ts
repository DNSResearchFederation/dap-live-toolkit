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
        this._properties = {...properties, ...(<HTMLElement>this).dataset};

        if (elementSelector) {
            this._element = document.querySelector(elementSelector);
        } else {
            this._element = this;
        }

        this._element.classList.add("dap-component");

        // Call init on child component
        this.init(this._element, this._properties);
    }

    /**
     * Abstract method for intialising our components
     *
     * @param element
     * @param properties
     */
    public abstract init(element, properties);


}