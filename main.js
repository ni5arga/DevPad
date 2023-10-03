const html = document.getElementById('htmlSource');
const css = document.getElementById('cssSource');
const js = document.getElementById('jsSource');
let timer, timeoutVal = 450;

if (!localStorage.getItem('savedCode')) {
    localStorage.setItem('savedCode', JSON.stringify({
        'html': `<h1>Hello!</h1>
<p>Write HTML, CSS or JavaScript code here and click 'Run Code'.</p>`, 'css': '/* CSS goes here */', 'js': '// JS code here'
    }))
}
let saveData = JSON.parse(localStorage.getItem('savedCode'));

function runCode() {
    var htmlCode = html.value;
    var cssCode = css.value;
    var jsCode = js.value;
    if (jsCode.includes('alert')) {
        jsCode = jsCode.replace(/alert\(/g, 'console.log(\'[Alerted Output] \'+');
    }
    if (jsCode.includes('console.log')) {
        jsCode = jsCode.replace(/console.log\(/g, 'console.log(\'[Console Output] \'+');
    }
    let iframe = document.createElement('iframe');
    let oi = document.querySelector('#targetCode')
    iframe.id = 'targetCode';
    oi.parentElement.appendChild(iframe);
    oi.remove();
    let iframecw = iframe.contentWindow;
    iframecw.document.open();
    iframecw.document.write(`<!DOCTYPE html><html><head><title>DevPad Output</title><style>${cssCode}</style></head><body>${htmlCode}<script>${jsCode}</script></body></html>`);
    iframecw.document.close();
    return false;
}

function exportCode(t) {
    var htmlCode = html.value;
    var cssCode = css.value;
    var jsCode = js.value;
    var download = document.getElementById('download');
    download.setAttribute('href', 'data:text/html;charset=utf-8,' + `<html><head><title>DevPad Output</title><style>${cssCode}</style></head><body>${htmlCode}<script>${jsCode}</script></body></html>`);
    download.setAttribute('download', 'devpadoutput-' + new Date() + '.html');
    download.click()
}

function clearCode() {
    localStorage.setItem('savedCode', JSON.stringify({
        'html': `<h1>Hello!</h1>
<p>Write HTML, CSS or JavaScript code here and click 'Run Code'.</p>`, 'css': '/* CSS goes here */', 'js': '// JS code here'
    }));
    loadCode();
}

function saveCode() {
    localStorage.setItem('savedCode',
        JSON.stringify({
            'html': html.value,
            'css': css.value,
            'js': js.value
        })
    );
}

function loadCode() {
    let saveData = JSON.parse(localStorage.getItem('savedCode'));
    html.value = saveData.html;
    css.value = saveData.css;
    js.value = saveData.js;
    update(html.value);
}

html.addEventListener('keypress', handleKeyPress);
html.addEventListener('keyup', handleKeyUp);

css.addEventListener('keypress', handleKeyPress);
css.addEventListener('keyup', handleKeyUp);

js.addEventListener('keypress', handleKeyPress);
js.addEventListener('keyup', handleKeyUp);

function handleKeyPress(e) { window.clearTimeout(timer); }

function handleKeyUp(e) {
    window.clearTimeout(timer);
    timer = window.setTimeout(() => {
        runCode();
    }, timeoutVal);
}

setInterval(function () {
    saveCode();
}, 500)

loadCode();
runCode();
update(html.value);

function update(text) {
    let result_element = document.querySelector("#highlighting-content");
    if(text[text.length-1] == "\n") {
        text += " ";
    }
    result_element.innerHTML = text.replace(new RegExp("&", "g"), "&amp;").replace(new RegExp("<", "g"), "&lt;"); /* Global RegExp */
    Prism.highlightElement(result_element);
}
  
function sync_scroll(element) {
    let result_element = document.querySelector("#highlighting");
    result_element.scrollTop = element.scrollTop;
    result_element.scrollLeft = element.scrollLeft;
}
  
function check_tab(element, event) {
    let code = element.value;
    if(event.key == "Tab") {
        event.preventDefault();
        let before_tab = code.slice(0, element.selectionStart); // text before tab
        let after_tab = code.slice(element.selectionEnd, element.value.length); // text after tab
        let cursor_pos = element.selectionStart + 1; // where cursor moves after tab - moving forward by 1 char to after tab
        element.value = before_tab + "\t" + after_tab; // add tab char
        element.selectionStart = cursor_pos;
        element.selectionEnd = cursor_pos;
        console.log(element.id)
        let text = element.value;
        if(element.id === 'htmlSource') {
            update(text);
        }else{
            if(text[text.length-1] == "\n") {
                text += " ";
            }
            element.innerHTML = text.replace(new RegExp("&", "g"), "&amp;").replace(new RegExp("<", "g"), "&lt;"); /* Global RegExp */
            Prism.highlightElement(element);
        }
    }
}