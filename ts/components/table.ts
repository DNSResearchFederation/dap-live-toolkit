import BaseComponent from "./base-component";

export default class Table extends BaseComponent {

    /**
     * Call initialiser
     *
     * @param element
     * @param properties
     */
    protected async init(element: HTMLElement, properties: any) {
        if (properties.tableConnectionPath) {
            let data = await this.callApiConnection(properties.tableConnectionPath, {limit: properties.tableLimit || 50});
            console.log(data);
        }

        let html = `
            <div>`;
        if (properties.title) html += `
                <h4>${properties.title}</h4>`;

        if (properties.categories || properties.time) {
            html += '<div>';

            if (properties.categories) {
                let splitCategories = properties.categories.split(",");
                splitCategories.forEach(category => html += `<div><div>${category}</div></div>`);
            }

            if (properties.time) {
                html += `<time>up to ${properties.time}</time>`;
            }
            html += '</div>';
        }
        if (properties.description) {
            html += `<div class="description">
               ${properties.description}
               </div>
            `;
        }
        html += `
          <div class="table">
                    <table>
                        <tr>`

        if (properties.tableHeaders) {
            let splitHeaders = properties.tableHeaders.split(",");
            splitHeaders.forEach(tableHeader => html += `<th>${tableHeader}</th>`)

        }

        html += `
                        </tr>
                        <tr>
                            <td>google.com</td>
                            <td>1</td>
                            <td>Top 1k</td>
                        </tr>
                    </table>
                </div>
            </div>
        `;

        element.innerHTML = html;

    }


}