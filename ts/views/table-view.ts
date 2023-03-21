const TableView = `
<div>
{{#properties.title}}<h4>{{.}}</h4>{{/properties.title}}
{{#properties.categories}}<div><div>{{properties.categories}}</div></div>{{/properties.categories}}
<div class="table">
<table>

<tr>
    {{#headers}}<td>{{.}}</td>{{/headers}}
</tr>
{{#data}}<tr>{{#.}}<td>{{.}}</td>{{/.}}</tr>{{/data}}
</table>
</div>
</div>
`;

export default TableView;
