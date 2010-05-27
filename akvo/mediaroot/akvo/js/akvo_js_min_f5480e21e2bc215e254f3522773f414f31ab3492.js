/*
 * Modernizr JavaScript library 1.1
 * http://modernizr.com/
 *
 * Copyright (c) 2009 Faruk Ates - http://farukat.es/
 * Licensed under the MIT license.
 * http://modernizr.com/license/
 *
 * Featuring major contributions by
 * Paul Irish  - http://paulirish.com
 * Ben Alman   - http://benalman.com/
 */
window.Modernizr=(function(window,doc){var version="1.1",ret={},enableHTML5=true,enableNoClasses=true,fontfaceCheckDelay=100,docElement=doc.documentElement,m=doc.createElement("modernizr"),m_style=m.style,f=doc.createElement("input"),canvas="canvas",canvastext="canvastext",rgba="rgba",hsla="hsla",multiplebgs="multiplebgs",borderimage="borderimage",borderradius="borderradius",boxshadow="boxshadow",opacity="opacity",cssanimations="cssanimations",csscolumns="csscolumns",cssgradients="cssgradients",cssreflections="cssreflections",csstransforms="csstransforms",csstransforms3d="csstransforms3d",csstransitions="csstransitions",fontface="fontface",geolocation="geolocation",video="video",audio="audio",input="input",inputtypes=input+"types",background="background",backgroundColor=background+"Color",canPlayType="canPlayType",localStorage="localstorage",sessionStorage="sessionstorage",webWorkers="webworkers",applicationCache="applicationcache",setProperties=" -o- -moz- -ms- -webkit- ".split(" "),tests={},inputs={},attrs={},elems,elem,i,feature,classes=[];function set_css(str){m_style.cssText=str;}function set_css_all(str1,str2){return set_css(setProperties.join(str1+";")+(str2||""));}function contains(str,substr){return str.indexOf(substr)!==-1;}function test_props(props,callback){for(var i in props){if(m_style[props[i]]!==undefined&&(!callback||callback(props[i]))){return true;}}}function test_props_all(prop,callback){var uc_prop=prop.charAt(0).toUpperCase()+prop.substr(1),props=[prop,"webkit"+uc_prop,"Moz"+uc_prop,"moz"+uc_prop,"o"+uc_prop,"ms"+uc_prop];return !!test_props(props,callback);}tests[canvas]=function(){return !!doc.createElement(canvas).getContext;};tests[canvastext]=function(){return !!(tests[canvas]()&&typeof doc.createElement(canvas).getContext("2d").fillText=="function");};tests[geolocation]=function(){return !!navigator.geolocation;};tests[rgba]=function(){set_css(background+"-color:rgba(150,255,150,.5)");return contains(m_style[backgroundColor],rgba);};tests[hsla]=function(){set_css(background+"-color:hsla(120,40%,100%,.5)");return contains(m_style[backgroundColor],rgba);};tests[multiplebgs]=function(){set_css(background+":url(m.png),url(a.png),#f99 url(m.png)");return/(url\s*\(.*?){3}/.test(m_style[background]);};tests[borderimage]=function(){return test_props_all("borderImage");};tests[borderradius]=function(){return test_props_all("borderRadius","",function(prop){return contains(prop,"orderRadius");});};tests[boxshadow]=function(){return test_props_all("boxShadow");};tests[opacity]=function(){set_css("opacity:.5");return contains(m_style[opacity],"0.5");};tests[cssanimations]=function(){return test_props_all("animationName");};tests[csscolumns]=function(){return test_props_all("columnCount");};tests[cssgradients]=function(){var str1=background+"-image:",str2="gradient(linear,left top,right bottom,from(#9f9),to(white));",str3="linear-gradient(left top,#9f9, white);";set_css(str1+str2+str1+"-webkit-"+str2+str1+"-moz-"+str2+str1+"-o-"+str2+str1+"-ms-"+str2+str1+str3+str1+"-webkit-"+str3+str1+"-moz-"+str3+str1+"-o-"+str3+str1+"-ms-"+str3);return contains(m_style.backgroundImage,"gradient");};tests[cssreflections]=function(){return test_props_all("boxReflect");};tests[csstransforms]=function(){return !!test_props(["transformProperty","webkitTransform","MozTransform","mozTransform","oTransform","msTransform"]);};tests[csstransforms3d]=function(){return !!test_props(["perspectiveProperty","webkitPerspective","MozPerspective","mozPerspective","oPerspective","msPerspective"]);};tests[csstransitions]=function(){return test_props_all("transitionProperty");};tests[fontface]=(function(){var fontret;if(!(!
/*@cc_on@if(@_jscript_version>=5)!@end@*/
0)){fontret=true;}else{var st=doc.createElement("style"),spn=doc.createElement("span"),wid,nwid,isFakeBody=false,body=doc.body,callback,isCallbackCalled;st.textContent="@font-face{font-family:testfont;src:url('data:font/ttf;base64,AAEAAAAMAIAAAwBAT1MvMliohmwAAADMAAAAVmNtYXCp5qrBAAABJAAAANhjdnQgACICiAAAAfwAAAAEZ2FzcP//AAMAAAIAAAAACGdseWYv5OZoAAACCAAAANxoZWFk69bnvwAAAuQAAAA2aGhlYQUJAt8AAAMcAAAAJGhtdHgGDgC4AAADQAAAABRsb2NhAIQAwgAAA1QAAAAMbWF4cABVANgAAANgAAAAIG5hbWUgXduAAAADgAAABPVwb3N03NkzmgAACHgAAAA4AAECBAEsAAUAAAKZAswAAACPApkCzAAAAesAMwEJAAACAAMDAAAAAAAAgAACbwAAAAoAAAAAAAAAAFBmRWQAAAAgqS8DM/8zAFwDMwDNAAAABQAAAAAAAAAAAAMAAAADAAAAHAABAAAAAABGAAMAAQAAAK4ABAAqAAAABgAEAAEAAgAuqQD//wAAAC6pAP///9ZXAwAAAAAAAAACAAAABgBoAAAAAAAvAAEAAAAAAAAAAAAAAAAAAAABAAIAAAAAAAAAAgAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAABAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAABAAEACoAAAAGAAQAAQACAC6pAP//AAAALqkA////1lcDAAAAAAAAAAIAAAAiAogAAAAB//8AAgACACIAAAEyAqoAAwAHAC6xAQAvPLIHBADtMrEGBdw8sgMCAO0yALEDAC88sgUEAO0ysgcGAfw8sgECAO0yMxEhESczESMiARDuzMwCqv1WIgJmAAACAFUAAAIRAc0ADwAfAAATFRQWOwEyNj0BNCYrASIGARQGKwEiJj0BNDY7ATIWFX8aIvAiGhoi8CIaAZIoN/43KCg3/jcoAWD0JB4eJPQkHh7++EY2NkbVRjY2RgAAAAABAEH/+QCdAEEACQAANjQ2MzIWFAYjIkEeEA8fHw8QDxwWFhwWAAAAAQAAAAIAAIuYbWpfDzz1AAsEAAAAAADFn9IuAAAAAMWf0i797/8zA4gDMwAAAAgAAgAAAAAAAAABAAADM/8zAFwDx/3v/98DiAABAAAAAAAAAAAAAAAAAAAABQF2ACIAAAAAAVUAAAJmAFUA3QBBAAAAKgAqACoAWgBuAAEAAAAFAFAABwBUAAQAAgAAAAEAAQAAAEAALgADAAMAAAAQAMYAAQAAAAAAAACLAAAAAQAAAAAAAQAhAIsAAQAAAAAAAgAFAKwAAQAAAAAAAwBDALEAAQAAAAAABAAnAPQAAQAAAAAABQAKARsAAQAAAAAABgAmASUAAQAAAAAADgAaAUsAAwABBAkAAAEWAWUAAwABBAkAAQBCAnsAAwABBAkAAgAKAr0AAwABBAkAAwCGAscAAwABBAkABABOA00AAwABBAkABQAUA5sAAwABBAkABgBMA68AAwABBAkADgA0A/tDb3B5cmlnaHQgMjAwOSBieSBEYW5pZWwgSm9obnNvbi4gIFJlbGVhc2VkIHVuZGVyIHRoZSB0ZXJtcyBvZiB0aGUgT3BlbiBGb250IExpY2Vuc2UuIEtheWFoIExpIGdseXBocyBhcmUgcmVsZWFzZWQgdW5kZXIgdGhlIEdQTCB2ZXJzaW9uIDMuYmFlYzJhOTJiZmZlNTAzMiAtIHN1YnNldCBvZiBKdXJhTGlnaHRiYWVjMmE5MmJmZmU1MDMyIC0gc3Vic2V0IG9mIEZvbnRGb3JnZSAyLjAgOiBKdXJhIExpZ2h0IDogMjMtMS0yMDA5YmFlYzJhOTJiZmZlNTAzMiAtIHN1YnNldCBvZiBKdXJhIExpZ2h0VmVyc2lvbiAyIGJhZWMyYTkyYmZmZTUwMzIgLSBzdWJzZXQgb2YgSnVyYUxpZ2h0aHR0cDovL3NjcmlwdHMuc2lsLm9yZy9PRkwAQwBvAHAAeQByAGkAZwBoAHQAIAAyADAAMAA5ACAAYgB5ACAARABhAG4AaQBlAGwAIABKAG8AaABuAHMAbwBuAC4AIAAgAFIAZQBsAGUAYQBzAGUAZAAgAHUAbgBkAGUAcgAgAHQAaABlACAAdABlAHIAbQBzACAAbwBmACAAdABoAGUAIABPAHAAZQBuACAARgBvAG4AdAAgAEwAaQBjAGUAbgBzAGUALgAgAEsAYQB5AGEAaAAgAEwAaQAgAGcAbAB5AHAAaABzACAAYQByAGUAIAByAGUAbABlAGEAcwBlAGQAIAB1AG4AZABlAHIAIAB0AGgAZQAgAEcAUABMACAAdgBlAHIAcwBpAG8AbgAgADMALgBiAGEAZQBjADIAYQA5ADIAYgBmAGYAZQA1ADAAMwAyACAALQAgAHMAdQBiAHMAZQB0ACAAbwBmACAASgB1AHIAYQBMAGkAZwBoAHQAYgBhAGUAYwAyAGEAOQAyAGIAZgBmAGUANQAwADMAMgAgAC0AIABzAHUAYgBzAGUAdAAgAG8AZgAgAEYAbwBuAHQARgBvAHIAZwBlACAAMgAuADAAIAA6ACAASgB1AHIAYQAgAEwAaQBnAGgAdAAgADoAIAAyADMALQAxAC0AMgAwADAAOQBiAGEAZQBjADIAYQA5ADIAYgBmAGYAZQA1ADAAMwAyACAALQAgAHMAdQBiAHMAZQB0ACAAbwBmACAASgB1AHIAYQAgAEwAaQBnAGgAdABWAGUAcgBzAGkAbwBuACAAMgAgAGIAYQBlAGMAMgBhADkAMgBiAGYAZgBlADUAMAAzADIAIAAtACAAcwB1AGIAcwBlAHQAIABvAGYAIABKAHUAcgBhAEwAaQBnAGgAdABoAHQAdABwADoALwAvAHMAYwByAGkAcAB0AHMALgBzAGkAbAAuAG8AcgBnAC8ATwBGAEwAAAAAAgAAAAAAAP+BADMAAAAAAAAAAAAAAAAAAAAAAAAAAAAFAAAAAQACAQIAEQt6ZXJva2F5YWhsaQ==')}";doc.getElementsByTagName("head")[0].appendChild(st);spn.setAttribute("style","font:99px _,serif;position:absolute;visibility:hidden");if(!body){body=docElement.appendChild(doc.createElement(fontface));isFakeBody=true;}spn.innerHTML="........";spn.id="fonttest";body.appendChild(spn);wid=spn.offsetWidth;spn.style.font="99px testfont,_,serif";fontret=wid!==spn.offsetWidth;var delayedCheck=function(){fontret=ret[fontface]=wid!==spn.offsetWidth;docElement.className=docElement.className.replace(/(no-)?font.*?\b/,"")+(fontret?" ":" no-")+fontface;callback&&(isCallbackCalled=true)&&callback(fontret);isFakeBody&&setTimeout(function(){body.parentNode.removeChild(body);},50);};setTimeout(delayedCheck,fontfaceCheckDelay);}ret._fontfaceready=function(fn){(isCallbackCalled||fontret)?fn(fontret):(callback=fn);};return function(){return fontret||wid!==spn.offsetWidth;};})();tests[video]=function(){var elem=doc.createElement(video),bool=!!elem[canPlayType];if(bool){bool=new Boolean(bool);bool.ogg=elem[canPlayType]('video/ogg; codecs="theora, vorbis"');bool.h264=elem[canPlayType]('video/mp4; codecs="avc1.42E01E, mp4a.40.2"');}return bool;};tests[audio]=function(){var elem=doc.createElement(audio),bool=!!elem[canPlayType];if(bool){bool=new Boolean(bool);bool.ogg=elem[canPlayType]('audio/ogg; codecs="vorbis"');bool.mp3=elem[canPlayType]("audio/mpeg3;");bool.wav=elem[canPlayType]('audio/wav; codecs="1"');bool.m4a=elem[canPlayType]("audio/x-m4a;");}return bool;};tests[localStorage]=function(){return"localStorage" in window;};tests[sessionStorage]=function(){return"sessionStorage" in window;};tests[webWorkers]=function(){return !!window.Worker;};tests[applicationCache]=function(){return !!window.applicationCache;};for(feature in tests){if(tests.hasOwnProperty(feature)){classes.push((!(ret[feature]=tests[feature]())&&enableNoClasses?"no-":"")+feature);}}ret.addTest=function(feature,test){if(this.hasOwnProperty(feature)){}test=!!(test());docElement.className+=" "+(!test&&enableNoClasses?"no-":"")+feature;ret[feature]=test;};ret[input]=(function(props){for(var i in props){attrs[props[i]]=!!(props[i] in f);}return attrs;})("autocomplete autofocus list placeholder max min multiple pattern required step".split(" "));ret[inputtypes]=(function(props){for(var i in props){f.setAttribute("type",props[i]);inputs[props[i]]=!!(f.type!=="text");}return inputs;})("search tel url email datetime date month week time datetime-local number range color".split(" "));set_css("");m=f=null;if(enableHTML5&&!(!
/*@cc_on!@*/
0)){elems="abbr article aside audio canvas datalist details eventsource figure footer header hgroup mark menu meter nav output progress section time video".split(" ");i=elems.length+1;while(--i){elem=doc.createElement(elems[i]);}elem=null;}ret._enableHTML5=enableHTML5;ret._enableNoClasses=enableNoClasses;ret._version=version;(function(H,C){H[C]=H[C].replace(/\bno-js\b/,"js");})(docElement,"className");docElement.className+=" "+classes.join(" ");return ret;})(this,this.document);