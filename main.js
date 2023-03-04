const sourceCode = document.getElementById('sourceCode')
if(!localStorage.getItem('savedCode')) {
    localStorage.setItem('savedCode', `<html>
<head>
<title>DevPad</title>
</head>
<body>
<h1>Hello!</h1>
<p>Write HTML, CSS or JavaScript code here and click 'Run Code'.</p>
</body>
</html>`)
}

function runCode() {
    var content = sourceCode.value;
    var iframe = document.getElementById('targetCode');
    iframe = (iframe.contentWindow) ? iframe.contentWindow : (iframe.contentDocument.document) ? iframe.contentDocument.document : iframe.contentDocument;
    iframe.document.open();
    iframe.document.write(content);
    iframe.document.close();
    return false;
}

function clearCode() {
    sourceCode.value = '';
}

function saveCode() {
    localStorage.setItem('savedCode', sourceCode.value);
}

function loadCode() {
    sourceCode.value = localStorage.getItem('savedCode');
}

// Cleaner startup
sourceCode.value = localStorage.getItem('savedCode');

runCode();