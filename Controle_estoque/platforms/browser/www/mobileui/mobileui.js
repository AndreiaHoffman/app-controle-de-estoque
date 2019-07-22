/*component-base*/var userAgent=navigator.userAgent||navigator.vendor||window.opera,SO={name:"unknown",code:0};/android/i.test(userAgent)&&(SO.name="Android",SO.class="platform-android",SO.code=1);/iPad|iPhone|iPod/.test(userAgent)&&!window.MSStream&&(SO.name="iOS",SO.class="platform-ios",SO.code=2);/windows phone/i.test(userAgent)&&(SO.name="Windows Phone",SO.class="platform-wp",SO.code=3);SO.class&&document.getElementsByTagName("body").length&&(document.getElementsByTagName("body")[0].className+=" "+SO.class);
/*component-button*/document.addEventListener("click",function(e){if(1!==SO.code)return!1;var t=e.target;if("button"!==t.tagName.toLowerCase())return!1;var o=t.getBoundingClientRect(),s=t.querySelector(".ripple");s||((s=document.createElement("span")).className="ripple",s.style.height=s.style.width=Math.max(o.width,o.height)+"px",t.appendChild(s)),s.classList.remove("show");var a=e.pageY-o.top-s.offsetHeight/2-document.body.scrollTop,l=e.pageX-o.left-s.offsetWidth/2-document.body.scrollLeft;return s.style.top=a+"px",s.style.left=l+"px",s.classList.add("show"),!1},!1);
/*component-popover*/window.openPopover=function(e){var t=event.target.getBoundingClientRect(),o=e,e=document.getElementById(e),n=document.createElement("div");n.className="backdrop backdrop-popover",e.parentNode.appendChild(n),n.addEventListener("click",function(e){window.closePopover(o)}),e.addEventListener("click",function(e){window.closePopover(o)});var i=document.body.offsetWidth-t.left,r=document.body.offsetWidth-i;if(i-=t.width,e.style+=r>250?";top: 110%;right: "+i+"px;transform-origin: right top 0px;transform: scale(1);":";top: 110%;left: "+r+"px;transform-origin: right top 0px;transform: scale(1);",e.classList.add("show"),2===SO.code){e.style.top=t.top+t.height+"px";var s=document.createElement("div");s.classList.add("popover-arrow"),e.parentNode.appendChild(s),s.setAttribute("style","top:"+(t.top+t.height-5)+"px;left:"+(t.left+t.width/2-7)+"px")}else{var d=e.clientHeight,a=e.clientWidth;e.style.height=0,e.style.width=0,e.style.top=t.top+"px",setTimeout(function(){var t=e.getAttribute("style");t+=" ;-webkit-transition: all 200ms ease;transition: all 200ms ease;",e.setAttribute("style",t),e.style.height=d+"px",e.style.width=a+"px"})}var p=new CustomEvent("popoverOpened");document.dispatchEvent(p)},window.closePopover=function(e){var e=document.getElementById(e),t=0;2!==SO.code&&(e.style.opacity=0,t=200),setTimeout(function(){var t=document.getElementsByClassName("popover-arrow");t.length&&t[0].parentNode.removeChild(t[0]),e.classList.remove("show");var o=e.parentNode.getElementsByClassName("backdrop-popover");o&&o.length&&(o=o[0])&&o.parentNode&&o.parentNode.removeChild(o);var n=new CustomEvent("popoverClosed");document.dispatchEvent(n)},t)};
/*component-alert*/window.alert=function(e,t){var a={};"object"==typeof e?a=e:(a.message=e,a.title=t),a.id||(a.id="ALERT"+(new Date).getTime()),a.buttons&&a.buttons.length||(a.buttons=[{label:"OK",onclick:function(){closeAlert()}}]);var n=document.getElementsByTagName("body")[0];event&&event.target&&event.target.parentNode&&event.target.parentNode.className.indexOf("body")>=0&&(n=event.target.parentNode);var d=document.createElement("div");d.className="backdrop show backdrop-alert",d.id=a.id+"_BACKDROP",n.appendChild(d);var l=document.createElement("div");l.className="alert-mobileui",l.id=a.id,d.parentNode.appendChild(l);var o=document.createElement("div");if(a.class||(a.class="white"),o.className="alert "+a.class,a.width&&(o.style.maxWidth=a.width),l.appendChild(o),a.title){var r="<h1>"+a.title+"</h1>";o.insertAdjacentHTML("beforeend",r)}if(a.message){var s="<p>"+a.message+"</p>";o.insertAdjacentHTML("beforeend",s)}a.template&&o.insertAdjacentHTML("beforeend",document.getElementById(a.template).innerHTML);var c=document.createElement("div");c.className="buttons",o.appendChild(c);for(var i in a.buttons){var m=document.createElement("button");a.buttons[i].class||(a.buttons[i].class="text-teal"),m.className=a.buttons[i].class;var p=document.createTextNode(a.buttons[i].label);m.appendChild(p),a.buttons[i].onclick||(a.buttons[i].onclick=closeAlert),m.addEventListener("click",a.buttons[i].onclick),c.appendChild(m)}var u=new CustomEvent("alertOpened");document.dispatchEvent(u)},window.closeAlert=function(e){alertId=e,alertId||(alertId=event.target.parentNode.parentNode.parentNode.id);var t=document.getElementById(alertId);t.parentNode.removeChild(t);var a=document.getElementById(alertId+"_BACKDROP");a.parentNode.removeChild(a)};
