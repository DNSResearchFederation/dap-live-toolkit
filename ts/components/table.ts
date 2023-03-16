import BaseComponent from "./base-component";

export default class Table extends BaseComponent {

    /**
     * Call initialiser
     *
     * @param element
     * @param properties
     */
    init(element: HTMLElement, properties: any) {

        let html = `
            <div>`;
        if (properties.title) html += `
                <h4>${properties.title}</h4>`;

        if (properties.categories || properties.time) {
            html += '<div>';

            if (properties.categories) {
                let splitCategories = properties.categories.split(",");
                splitCategories.forEach(category => html += `<div><div>${category}</div></div>`)
            }

            if (properties.time) {
                html += `<time>up to ${properties.time}</time>`;
            }
            html += '</div>';
        }

        html += `
                <div class="table">
                    <table>
                        <tr>
                            <th>Domain Name</th>
                            <th>Tranco Rank</th>
                            <th>CrUX Rank</th>
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