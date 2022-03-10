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

// Lead Forensics
// Giving 404 errors and likely not used anymore. 3/10/2022
//let leadForensicsNoScript = document.createElement('noscript')
//let leadForensicsImg = document.createElement('img')
//leadForensicsImg.src = 'https://secure.peak2poem.com/195720.png?trk_user=195720&trk_tit=jsdisabled&trk_ref=jsdisabled&trk_loc=jsdisabled'
//leadForensicsImg.style.display = 'none'
//leadForensicsNoScript.appendChild(leadForensicsImg)
//document.body.appendChild(leadForensicsNoScript)

// Lead Feeder
// Commented out per chat with Marketing Ops on 3/10/2022
//let leadFeederScript = document.createElement('script')
//var inlineScript = document.createTextNode("(function(){ window.ldfdr = window.ldfdr || {}; (function(d, s, ss, fs){ fs = d.getElementsByTagName(s)[0]; function ce(src){ var cs = d.createElement(s); cs.src = src; setTimeout(function(){fs.parentNode.insertBefore(cs,fs)}, 1); } ce(ss); })(document, 'script', 'https://sc.lfeeder.com/lftracker_v1_bElvO73eWP1aZMqj.js'); })(); ");
//leadFeederScript.appendChild(inlineScript);
//document.body.appendChild(leadFeederScript);

// DemandBase

let demandBaseScript = document.createElement('script')
var dBinlineScript = document.createTextNode("(function(d,b,a,s,e){ var t = b.createElement(a),fs = b.getElementsByTagName(a)[0]; t.async=1; t.id=e; t.src=s;fs.parentNode.insertBefore(t, fs); })(window,document,'script','https://tag.demandbase.com/oJB4Bebp.min.js','demandbase_js_lib');");
demandBaseScript.appendChild(dBinlineScript);
document.body.appendChild(demandBaseScript);

// HotJar
// No longer used 3/10/22
//let hotJarScript = document.createElement('script')
//var hotJarInlineScript = document.createTextNode("(function(h,o,t,j,a,r){h.hj=h.hj||function(){(h.hj.q=h.hj.q||[]).push(arguments)};h._hjSettings={hjid:1950198,hjsv:6};a=o.getElementsByTagName('head')[0];r=o.createElement('script');r.async=1;r.src=t+h._hjSettings.hjid+j+h._hjSettings.hjsv;a.appendChild(r);})(window,document,'https://static.hotjar.com/c/hotjar-','.js?sv=');");
//hotJarScript.appendChild(hotJarInlineScript);
//document.body.appendChild(hotJarScript);
