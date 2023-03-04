const html = document.getElementById('htmlSource');
const css = document.getElementById('cssSource');
const js = document.getElementById('jsSource');

let saveData = JSON.parse(localStorage.getItem('savedCode'));
let iframe = document.getElementById('targetCode');
if(!localStorage.getItem('savedCode')) {
    localStorage.setItem('savedCode', JSON.stringify({'html': `<h1>Hello!</h1>
<p>Write HTML, CSS or JavaScript code here and click 'Run Code'.</p>`, 'css': '/* CSS goes here */', 'js': '// JS code here'}))
}

function runCode() {
    var htmlCode = html.value;
    var cssCode = css.value;
    var jsCode = js.value;
    iframe = (iframe.contentWindow) ? iframe.contentWindow : (iframe.contentDocument.document) ? iframe.contentDocument.document : iframe.contentDocument;
    iframe.document.open();
    iframe.document.write(`<html><head><title>DevPad Output</title></head><body>${htmlCode}<script>${jsCode}</body></html>`);
    iframe.document.close();
    return false;
}

function clearCode() {
    sourceCode.value = '';
}

function saveCode() {
    localStorage.setItem('savedCode', {'html':html.value,'css':css.value,'js':js.value});
}

function loadCode() {
    let saveData = JSON.parse(localStorage.getItem('savedCode')); 
    html.value = saveData.html;
    css.value = saveData.css;
    js.value = saveData.js;
}

// Cleaner startup
loadCode();

runCode();