/**
 * Documentation Analytics
 **/

// Google Tag Manager

let gtmNoScript = document.createElement('noscript')
let gtmIframe = document.createElement('iframe')
gtmIframe.src = 'https://www.googletagmanager.com/ns.html?id=GTM-5QNBBN6'
gtmIframe.style.display = 'none'
gtmNoScript.appendChild(gtmIframe)
document.body.appendChild(gtmNoScript)

// DemandBase
//Removed until we can implement proper cookie auth for PII coverage.
//let demandBaseScript = document.createElement('script')
//var dBinlineScript = document.createTextNode("(function(d,b,a,s,e){ var t = b.createElement(a),fs = b.getElementsByTagName(a)[0]; t.async=1; t.id=e; t.src=s;fs.parentNode.insertBefore(t, fs); })(window,document,'script','https://tag.demandbase.com/oJB4Bebp.min.js','demandbase_js_lib');");
//demandBaseScript.appendChild(dBinlineScript);
//document.body.appendChild(demandBaseScript);
