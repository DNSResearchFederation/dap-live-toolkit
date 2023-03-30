const TableView = `
<div>
    <div class="title-div">
        {{#properties.title}}<h4>{{.}}</h4>{{/properties.title}}
        <button class="toggle-message">
            <svg viewBox="0 0 24 24">
                <path fill="currentColor" d="M11,18H13V16H11V18M12,2A10,10 0 0,0 2,12A10,10 0 0,0 12,22A10,10 0 0,0 22,12A10,10 0 0,0 12,2M12,20C7.59,20 4,16.41 4,12C4,7.59 7.59,4 12,4C16.41,4 20,7.59 20,12C20,16.41 16.41,20 12,20M12,6A4,4 0 0,0 8,10H10A2,2 0 0,1 12,8A2,2 0 0,1 14,10C14,12 11,11.75 11,15H13C13,12.75 16,12.5 16,10A4,4 0 0,0 12,6Z"></path>
            </svg>
        </button>
    </div>
    <div class="category-wrapper">
        {{#categories}}<div class="categories">{{.}}</div>{{/categories}}
        <time id="table-date" class="date" >Up to end of February 2023
        </time>
    </div>
    <div class="message hide">
        <div class="message-header">
            <div class="details">Details</div>
            <button class="toggle-message mute">
                <svg viewBox="0 0 24 24">
                    <path fill="currentColor" d="M19,6.41L17.59,5L12,10.59L6.41,5L5,6.41L10.59,12L5,17.59L6.41,19L12,13.41L17.59,19L19,17.59L13.41,12L19,6.41Z"></path>
                </svg>
            </button>
        </div>
        <dl>
            <dt>Description:</dt>
            <dd>{{{properties.description}}}</dd>
            <dt>Feed sources:</dt>
            <dd>{{{properties.feedSources}}}</dd>
        </dl>
    </div>
    <div class="table">
        <div>
            <table>
                <tr>
                    {{#headers}}<td>{{.}}</td>{{/headers}}
                </tr>
                {{#data}}<tr>{{#.}}<td><span>{{.}}</span></td>{{/.}}</tr>{{/data}}
            </table>
        </div>
    </div>
    <div class="cta-wrapper">
        {{#properties.tableBottomCtaTitle}}<a class="cta-link" href="{{properties.tableBottomCtaLink}}">{{.}} →</a>{{/properties.tableBottomCtaTitle}}
    </div>
</div>
`;

export default TableView;
