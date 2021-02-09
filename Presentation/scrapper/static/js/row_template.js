let count = 0;
let component_replace = [];
function FindComponent(datatype, cln) {
    let components = cln.querySelectorAll('[data-type="' + datatype + '"]')
    components.forEach(function (i, v) {
        ChangeTemplate(datatype, i);
    })
}
function ChangeTemplate(name, row) {
    replaceData = "#####O" + count++ + "#####C";
    console.log(replaceData);
    switch (name.toLowerCase()) {
        case 'image':
        case 'image link':
            row.querySelector('img').src = replaceData;
            component_replace.push(name);
            break;
        case 'text':
            row.querySelector('.editor-para').innerHTML = replaceData;
            component_replace.push(name);
            break;
        case 'heading':
            row.querySelector('.editor-para').innerHTML = replaceData;
            component_replace.push(name);
            break;
        case 'button':
            row.querySelector('.com-button-text').innerHTML = replaceData;
            component_replace.push(name);
            break;
        default:
            count = count - 1;
            break;
    }    
}

function row_template(row, components) {
    let cln = row.cloneNode(true);
    // { ==> {{
    // } ==> }}
    console.log()
    components.forEach(function (i, v) {
        FindComponent(i, cln);
    })    
    let html = cln.outerHTML
    let regex = /{/gi;
    html = html.replaceAll(regex,'{{')
    regex = /}/gi;
    html = html.replaceAll(regex,'}}')
    regex = /#####O/gi;
    html = html.replaceAll(regex,'{')
    regex = /#####C/gi;
    html = html.replaceAll(regex,'}')
    row.parentNode.insertBefore(cln, row.nextSibling);
    return html;
}
return {
    'template': row_template(arguments[0], arguments[1]),
    'componentOrderJson': component_replace
}
//console.log(row_template(document.querySelectorAll('.cRow')[2],['image','image link','text','heading']));