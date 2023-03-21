const TableView = `
<div>
    <div class="title-div">
        {{#properties.title}}<h4>{{.}}</h4>{{/properties.title}}
        <button class="toggle-message">
            <svg viewBox="0 0 24 24" class="i-12">
                <path fill="currentColor" d="M11,18H13V16H11V18M12,2A10,10 0 0,0 2,12A10,10 0 0,0 12,22A10,10 0 0,0 22,12A10,10 0 0,0 12,2M12,20C7.59,20 4,16.41 4,12C4,7.59 7.59,4 12,4C16.41,4 20,7.59 20,12C20,16.41 16.41,20 12,20M12,6A4,4 0 0,0 8,10H10A2,2 0 0,1 12,8A2,2 0 0,1 14,10C14,12 11,11.75 11,15H13C13,12.75 16,12.5 16,10A4,4 0 0,0 12,6Z"></path>
            </svg>
        </button>
    </div>
    {{#categories}}<div class="categories">{{.}}</div>{{/categories}}
    <time class="ql-size-xx s ql-weight-light mute-c mb1 blk" datetime="2023-03-21T15:30:40">Up to end of February 2023
    </time>
    <div class="message hide"><div class="px050 message-info py1"><div class="flex justify-between align-start">
        <div class="uppercase ql-weight-normal ql-size-xs mb050">Details</div>
            <button id="ijzclw-2-2" class="btn btnaslink mute-c toggle-message">
                <svg viewBox="0 0 24 24" class="i-12"><path fill="currentColor" d="M19,6.41L17.59,5L12,10.59L6.41,5L5,6.41L10.59,12L5,17.59L6.41,19L12,13.41L17.59,19L19,17.59L13.41,12L19,6.41Z"></path></svg>
            </button>
        </div>
            <dl class="ql-size-xs">
                <dt class="ql-weight-bold pr050 pb025">Description:</dt>
                <dd class="pb050">{{{properties.description}}}</dd>
                <dt class="ql-weight-bold pr050 pb025">Feed sources:</dt>
                <dd class="pb050">{{{properties.feedSources}}}</dd>
            </dl>
         </div>
     </div>
    <div class="table">
        <div>
            <table>
                <tr>
                    {{#headers}}<td>{{.}}</td>{{/headers}}
                </tr>
                {{#data}}<tr>{{#.}}<td>{{.}}</td>{{/.}}</tr>{{/data}}
            </table>
        </div>
    </div>
    {{#properties.tableBottomCtaTitle}}<a href="{{properties.tableBottomCtaLink}}">{{.}}</a>{{/properties.tableBottomCtaTitle}}
</div>
`;

export default TableView;
