/**
 * Documentation Analytics
 **/

// Google Tag Manager

let gtmNoScript = document.createElement('noscript')
let gtmIframe = document.createElement('iframe')
gtmIframe.src = 'https://www.googletagmanager.com/ns.html?id=GTM-M2STD5F'
gtmIframe.style.display = 'none'
gtmNoScript.appendChild(gtmIframe)
document.body.appendChild(gtmNoScript)

// Lead Forensics

let leadForensicsNoScript = document.createElement('noscript')
let leadForensicsImg = document.createElement('img')
leadForensicsImg.src = 'https://secure.peak2poem.com/195720.png?trk_user=195720&trk_tit=jsdisabled&trk_ref=jsdisabled&trk_loc=jsdisabled'
leadForensicsImg.style.display = 'none'
leadForensicsNoScript.appendChild(leadForensicsImg)
document.body.appendChild(leadForensicsNoScript)

// Lead Feeder

let leadFeederScript = document.createElement('script')
var inlineScript = document.createTextNode("(function(){ window.ldfdr = window.ldfdr || {}; (function(d, s, ss, fs){ fs = d.getElementsByTagName(s)[0]; function ce(src){ var cs = d.createElement(s); cs.src = src; setTimeout(function(){fs.parentNode.insertBefore(cs,fs)}, 1); } ce(ss); })(document, 'script', 'https://sc.lfeeder.com/lftracker_v1_bElvO73eWP1aZMqj.js'); })(); ");
leadFeederScript.appendChild(inlineScript); 
document.body.appendChild(leadFeederScript);

