(function(Clazz
,Clazz_getClassName
,Clazz_newLongArray
,Clazz_doubleToByte
,Clazz_doubleToInt
,Clazz_doubleToLong
,Clazz_declarePackage
,Clazz_instanceOf
,Clazz_load
,Clazz_instantialize
,Clazz_decorateAsClass
,Clazz_floatToInt
,Clazz_floatToLong
,Clazz_makeConstructor
,Clazz_defineEnumConstant
,Clazz_exceptionOf
,Clazz_newIntArray
,Clazz_defineStatics
,Clazz_newFloatArray
,Clazz_declareType
,Clazz_prepareFields
,Clazz_superConstructor
,Clazz_newByteArray
,Clazz_declareInterface
,Clazz_p0p
,Clazz_pu$h
,Clazz_newShortArray
,Clazz_innerTypeInstance
,Clazz_isClassDefined
,Clazz_prepareCallback
,Clazz_newArray
,Clazz_castNullAs
,Clazz_floatToShort
,Clazz_superCall
,Clazz_decorateAsType
,Clazz_newBooleanArray
,Clazz_newCharArray
,Clazz_implementOf
,Clazz_newDoubleArray
,Clazz_overrideConstructor
,Clazz_clone
,Clazz_doubleToShort
,Clazz_getInheritedLevel
,Clazz_getParamsType
,Clazz_isAF
,Clazz_isAB
,Clazz_isAI
,Clazz_isAS
,Clazz_isASS
,Clazz_isAP
,Clazz_isAFloat
,Clazz_isAII
,Clazz_isAFF
,Clazz_isAFFF
,Clazz_tryToSearchAndExecute
,Clazz_getStackTrace
,Clazz_inheritArgs
,Clazz_alert
,Clazz_defineMethod
,Clazz_overrideMethod
,Clazz_declareAnonymous
//,Clazz_checkPrivateMethod
,Clazz_cloneFinals
){
var $t$;
//var c$;
// JSmolMenu.js
// author: Bob Hanson, hansonr@stolaf.edu

// BH 10/17/2015 6:18:38 PM wraps with Jmol.__$ to use same version of jQuery as Jmol is using
// BH 5/27/2014 11:01:46 PM frank menu fix; better event handling
// BH 5/26/2014 allow for a user callback for customization of menu
//    using Jmol._showMenuCallback(menu, x, y);

// BH 2/17/2014 7:52:18 AM Jmol.Menu folded into Jmol.Swing

// BH 1/16/2014 9:20:15 AM allowing second attempt to initiate this library to gracefully skip processing

/*! jQuery UI - v1.9.2 - 2012-12-17
* http://jqueryui.com
* Includes: jquery.ui.core.js, jquery.ui.widget.js, jquery.ui.mouse.js, jquery.ui.position.js, jquery.ui.menu.js
* Copyright (c) 2012 jQuery Foundation and other contributors Licensed MIT */

(function(jQuery) {

if (!jQuery.ui)
try{
 (function(e,t){function i(t,n){var r,i,o,u=t.nodeName.toLowerCase();return"area"===u?(r=t.parentNode,i=r.name,!t.href||!i||r.nodeName.toLowerCase()!=="map"?!1:(o=e("img[usemap=#"+i+"]")[0],!!o&&s(o))):(/input|select|textarea|button|object/.test(u)?!t.disabled:"a"===u?t.href||n:n)&&s(t)}function s(t){return e.expr.filters.visible(t)&&!e(t).parents().andSelf().filter(function(){return e.css(this,"visibility")==="hidden"}).length}var n=0,r=/^ui-id-\d+$/;e.ui=e.ui||{};if(e.ui.version)return;e.extend(e.ui,{version:"1.9.2",keyCode:{BACKSPACE:8,COMMA:188,DELETE:46,DOWN:40,END:35,ENTER:13,ESCAPE:27,HOME:36,LEFT:37,NUMPAD_ADD:107,NUMPAD_DECIMAL:110,NUMPAD_DIVIDE:111,NUMPAD_ENTER:108,NUMPAD_MULTIPLY:106,NUMPAD_SUBTRACT:109,PAGE_DOWN:34,PAGE_UP:33,PERIOD:190,RIGHT:39,SPACE:32,TAB:9,UP:38}}),e.fn.extend({_focus:e.fn.focus,focus:function(t,n){return typeof t=="number"?this.each(function(){var r=this;setTimeout(function(){e(r).focus(),n&&n.call(r)},t)}):this._focus.apply(this,arguments)},scrollParent:function(){var t;return e.ui.ie&&/(static|relative)/.test(this.css("position"))||/absolute/.test(this.css("position"))?t=this.parents().filter(function(){return/(relative|absolute|fixed)/.test(e.css(this,"position"))&&/(auto|scroll)/.test(e.css(this,"overflow")+e.css(this,"overflow-y")+e.css(this,"overflow-x"))}).eq(0):t=this.parents().filter(function(){return/(auto|scroll)/.test(e.css(this,"overflow")+e.css(this,"overflow-y")+e.css(this,"overflow-x"))}).eq(0),/fixed/.test(this.css("position"))||!t.length?e(document):t},zIndex:function(n){if(n!==t)return this.css("zIndex",n);if(this.length){var r=e(this[0]),i,s;while(r.length&&r[0]!==document){i=r.css("position");if(i==="absolute"||i==="relative"||i==="fixed"){s=parseInt(r.css("zIndex"),10);if(!isNaN(s)&&s!==0)return s}r=r.parent()}}return 0},uniqueId:function(){return this.each(function(){this.id||(this.id="ui-id-"+ ++n)})},removeUniqueId:function(){return this.each(function(){r.test(this.id)&&e(this).removeAttr("id")})}}),e.extend(e.expr[":"],{data:e.expr.createPseudo?e.expr.createPseudo(function(t){return function(n){return!!e.data(n,t)}}):function(t,n,r){return!!e.data(t,r[3])},focusable:function(t){return i(t,!isNaN(e.attr(t,"tabindex")))},tabbable:function(t){var n=e.attr(t,"tabindex"),r=isNaN(n);return(r||n>=0)&&i(t,!r)}}),e(function(){var t=document.body,n=t.appendChild(n=document.createElement("div"));n.offsetHeight,e.extend(n.style,{minHeight:"100px",height:"auto",padding:0,borderWidth:0}),e.support.minHeight=n.offsetHeight===100,e.support.selectstart="onselectstart"in n,t.removeChild(n).style.display="none"}),e("<a>").outerWidth(1).jquery||e.each(["Width","Height"],function(n,r){function u(t,n,r,s){return e.each(i,function(){n-=parseFloat(e.css(t,"padding"+this))||0,r&&(n-=parseFloat(e.css(t,"border"+this+"Width"))||0),s&&(n-=parseFloat(e.css(t,"margin"+this))||0)}),n}var i=r==="Width"?["Left","Right"]:["Top","Bottom"],s=r.toLowerCase(),o={innerWidth:e.fn.innerWidth,innerHeight:e.fn.innerHeight,outerWidth:e.fn.outerWidth,outerHeight:e.fn.outerHeight};e.fn["inner"+r]=function(n){return n===t?o["inner"+r].call(this):this.each(function(){e(this).css(s,u(this,n)+"px")})},e.fn["outer"+r]=function(t,n){return typeof t!="number"?o["outer"+r].call(this,t):this.each(function(){e(this).css(s,u(this,t,!0,n)+"px")})}}),e("<a>").data("a-b","a").removeData("a-b").data("a-b")&&(e.fn.removeData=function(t){return function(n){return arguments.length?t.call(this,e.camelCase(n)):t.call(this)}}(e.fn.removeData)),function(){var t=/msie ([\w.]+)/.exec(navigator.userAgent.toLowerCase())||[];e.ui.ie=t.length?!0:!1,e.ui.ie6=parseFloat(t[1],10)===6}(),e.fn.extend({disableSelection:function(){return this.bind((e.support.selectstart?"selectstart":"mousedown")+".ui-disableSelection",function(e){e.preventDefault()})},enableSelection:function(){return this.unbind(".ui-disableSelection")}}),e.extend(e.ui,{plugin:{add:function(t,n,r){var i,s=e.ui[t].prototype;for(i in r)s.plugins[i]=s.plugins[i]||[],s.plugins[i].push([n,r[i]])},call:function(e,t,n){var r,i=e.plugins[t];if(!i||!e.element[0].parentNode||e.element[0].parentNode.nodeType===11)return;for(r=0;r<i.length;r++)e.options[i[r][0]]&&i[r][1].apply(e.element,n)}},contains:e.contains,hasScroll:function(t,n){if(e(t).css("overflow")==="hidden")return!1;var r=n&&n==="left"?"scrollLeft":"scrollTop",i=!1;return t[r]>0?!0:(t[r]=1,i=t[r]>0,t[r]=0,i)},isOverAxis:function(e,t,n){return e>t&&e<t+n},isOver:function(t,n,r,i,s,o){return e.ui.isOverAxis(t,r,s)&&e.ui.isOverAxis(n,i,o)}})
 })(jQuery);
}catch (e) {
	System.out.println("coremenu failed to load jQuery.ui.core -- jQuery version conflict?");
}
if (!jQuery.ui.widget)
try{
 (function(e,t){var n=0,r=Array.prototype.slice,i=e.cleanData;e.cleanData=function(t){for(var n=0,r;(r=t[n])!=null;n++)try{e(r).triggerHandler("remove")}catch(s){}i(t)},e.widget=function(t,n,r){var i,s,o,u,a=t.split(".")[0];t=t.split(".")[1],i=a+"-"+t,r||(r=n,n=e.Widget),e.expr[":"][i.toLowerCase()]=function(t){return!!e.data(t,i)},e[a]=e[a]||{},s=e[a][t],o=e[a][t]=function(e,t){if(!this._createWidget)return new o(e,t);arguments.length&&this._createWidget(e,t)},e.extend(o,s,{version:r.version,_proto:e.extend({},r),_childConstructors:[]}),u=new n,u.options=e.widget.extend({},u.options),e.each(r,function(t,i){e.isFunction(i)&&(r[t]=function(){var e=function(){return n.prototype[t].apply(this,arguments)},r=function(e){return n.prototype[t].apply(this,e)};return function(){var t=this._super,n=this._superApply,s;return this._super=e,this._superApply=r,s=i.apply(this,arguments),this._super=t,this._superApply=n,s}}())}),o.prototype=e.widget.extend(u,{widgetEventPrefix:s?u.widgetEventPrefix:t},r,{constructor:o,namespace:a,widgetName:t,widgetBaseClass:i,widgetFullName:i}),s?(e.each(s._childConstructors,function(t,n){var r=n.prototype;e.widget(r.namespace+"."+r.widgetName,o,n._proto)}),delete s._childConstructors):n._childConstructors.push(o),e.widget.bridge(t,o)},e.widget.extend=function(n){var i=r.call(arguments,1),s=0,o=i.length,u,a;for(;s<o;s++)for(u in i[s])a=i[s][u],i[s].hasOwnProperty(u)&&a!==t&&(e.isPlainObject(a)?n[u]=e.isPlainObject(n[u])?e.widget.extend({},n[u],a):e.widget.extend({},a):n[u]=a);return n},e.widget.bridge=function(n,i){var s=i.prototype.widgetFullName||n;e.fn[n]=function(o){var u=typeof o=="string",a=r.call(arguments,1),f=this;return o=!u&&a.length?e.widget.extend.apply(null,[o].concat(a)):o,u?this.each(function(){var r,i=e.data(this,s);if(!i)return e.error("cannot call methods on "+n+" prior to initialization; "+"attempted to call method '"+o+"'");if(!e.isFunction(i[o])||o.charAt(0)==="_")return e.error("no such method '"+o+"' for "+n+" widget instance");r=i[o].apply(i,a);if(r!==i&&r!==t)return f=r&&r.jquery?f.pushStack(r.get()):r,!1}):this.each(function(){var t=e.data(this,s);t?t.option(o||{})._init():e.data(this,s,new i(o,this))}),f}},e.Widget=function(){},e.Widget._childConstructors=[],e.Widget.prototype={widgetName:"widget",widgetEventPrefix:"",defaultElement:"<div>",options:{disabled:!1,create:null},_createWidget:function(t,r){r=e(r||this.defaultElement||this)[0],this.element=e(r),this.uuid=n++,this.eventNamespace="."+this.widgetName+this.uuid,this.options=e.widget.extend({},this.options,this._getCreateOptions(),t),this.bindings=e(),this.hoverable=e(),this.focusable=e(),r!==this&&(e.data(r,this.widgetName,this),e.data(r,this.widgetFullName,this),this._on(!0,this.element,{remove:function(e){e.target===r&&this.destroy()}}),this.document=e(r.style?r.ownerDocument:r.document||r),this.window=e(this.document[0].defaultView||this.document[0].parentWindow)),this._create(),this._trigger("create",null,this._getCreateEventData()),this._init()},_getCreateOptions:e.noop,_getCreateEventData:e.noop,_create:e.noop,_init:e.noop,destroy:function(){this._destroy(),this.element.unbind(this.eventNamespace).removeData(this.widgetName).removeData(this.widgetFullName).removeData(e.camelCase(this.widgetFullName)),this.widget().unbind(this.eventNamespace).removeAttr("aria-disabled").removeClass(this.widgetFullName+"-disabled "+"ui-state-disabled"),this.bindings.unbind(this.eventNamespace),this.hoverable.removeClass("ui-state-hover"),this.focusable.removeClass("ui-state-focus")},_destroy:e.noop,widget:function(){return this.element},option:function(n,r){var i=n,s,o,u;if(arguments.length===0)return e.widget.extend({},this.options);if(typeof n=="string"){i={},s=n.split("."),n=s.shift();if(s.length){o=i[n]=e.widget.extend({},this.options[n]);for(u=0;u<s.length-1;u++)o[s[u]]=o[s[u]]||{},o=o[s[u]];n=s.pop();if(r===t)return o[n]===t?null:o[n];o[n]=r}else{if(r===t)return this.options[n]===t?null:this.options[n];i[n]=r}}return this._setOptions(i),this},_setOptions:function(e){var t;for(t in e)this._setOption(t,e[t]);return this},_setOption:function(e,t){return this.options[e]=t,e==="disabled"&&(this.widget().toggleClass(this.widgetFullName+"-disabled ui-state-disabled",!!t).attr("aria-disabled",t),this.hoverable.removeClass("ui-state-hover"),this.focusable.removeClass("ui-state-focus")),this},enable:function(){return this._setOption("disabled",!1)},disable:function(){return this._setOption("disabled",!0)},_on:function(t,n,r){var i,s=this;typeof t!="boolean"&&(r=n,n=t,t=!1),r?(n=i=e(n),this.bindings=this.bindings.add(n)):(r=n,n=this.element,i=this.widget()),e.each(r,function(r,o){function u(){if(!t&&(s.options.disabled===!0||e(this).hasClass("ui-state-disabled")))return;return(typeof o=="string"?s[o]:o).apply(s,arguments)}typeof o!="string"&&(u.guid=o.guid=o.guid||u.guid||e.guid++);var a=r.match(/^(\w+)\s*(.*)$/),f=a[1]+s.eventNamespace,l=a[2];l?i.delegate(l,f,u):n.bind(f,u)})},_off:function(e,t){t=(t||"").split(" ").join(this.eventNamespace+" ")+this.eventNamespace,e.unbind(t).undelegate(t)},_delay:function(e,t){function n(){return(typeof e=="string"?r[e]:e).apply(r,arguments)}var r=this;return setTimeout(n,t||0)},_hoverable:function(t){this.hoverable=this.hoverable.add(t),this._on(t,{mouseenter:function(t){e(t.currentTarget).addClass("ui-state-hover")},mouseleave:function(t){e(t.currentTarget).removeClass("ui-state-hover")}})},_focusable:function(t){this.focusable=this.focusable.add(t),this._on(t,{focusin:function(t){e(t.currentTarget).addClass("ui-state-focus")},focusout:function(t){e(t.currentTarget).removeClass("ui-state-focus")}})},_trigger:function(t,n,r){var i,s,o=this.options[t];r=r||{},n=e.Event(n),n.type=(t===this.widgetEventPrefix?t:this.widgetEventPrefix+t).toLowerCase(),n.target=this.element[0],s=n.originalEvent;if(s)for(i in s)i in n||(n[i]=s[i]);return this.element.trigger(n,r),!(e.isFunction(o)&&o.apply(this.element[0],[n].concat(r))===!1||n.isDefaultPrevented())}},e.each({show:"fadeIn",hide:"fadeOut"},function(t,n){e.Widget.prototype["_"+t]=function(r,i,s){typeof i=="string"&&(i={effect:i});var o,u=i?i===!0||typeof i=="number"?n:i.effect||n:t;i=i||{},typeof i=="number"&&(i={duration:i}),o=!e.isEmptyObject(i),i.complete=s,i.delay&&r.delay(i.delay),o&&e.effects&&(e.effects.effect[u]||e.uiBackCompat!==!1&&e.effects[u])?r[t](i):u!==t&&r[u]?r[u](i.duration,i.easing,s):r.queue(function(n){e(this)[t](),s&&s.call(r[0]),n()})}}),e.uiBackCompat!==!1&&(e.Widget.prototype._getCreateOptions=function(){return e.metadata&&e.metadata.get(this.element[0])[this.widgetName]})
 })(jQuery);
}catch (e) {
	System.out.println("coremenu failed to load jQuery.ui.widget -- jQuery version conflict?");
}
if (!jQuery.ui.mouse)
try{
 (function(e,t){var n=!1;e(document).mouseup(function(e){n=!1}),e.widget("ui.mouse",{version:"1.9.2",options:{cancel:"input,textarea,button,select,option",distance:1,delay:0},_mouseInit:function(){var t=this;this.element.bind("mousedown."+this.widgetName,function(e){return t._mouseDown(e)}).bind("click."+this.widgetName,function(n){if(!0===e.data(n.target,t.widgetName+".preventClickEvent"))return e.removeData(n.target,t.widgetName+".preventClickEvent"),n.stopImmediatePropagation(),!1}),this.started=!1},_mouseDestroy:function(){this.element.unbind("."+this.widgetName),this._mouseMoveDelegate&&e(document).unbind("mousemove."+this.widgetName,this._mouseMoveDelegate).unbind("mouseup."+this.widgetName,this._mouseUpDelegate)},_mouseDown:function(t){if(n)return;this._mouseStarted&&this._mouseUp(t),this._mouseDownEvent=t;var r=this,i=t.which===1,s=typeof this.options.cancel=="string"&&t.target.nodeName?e(t.target).closest(this.options.cancel).length:!1;if(!i||s||!this._mouseCapture(t))return!0;this.mouseDelayMet=!this.options.delay,this.mouseDelayMet||(this._mouseDelayTimer=setTimeout(function(){r.mouseDelayMet=!0},this.options.delay));if(this._mouseDistanceMet(t)&&this._mouseDelayMet(t)){this._mouseStarted=this._mouseStart(t)!==!1;if(!this._mouseStarted)return t.preventDefault(),!0}return!0===e.data(t.target,this.widgetName+".preventClickEvent")&&e.removeData(t.target,this.widgetName+".preventClickEvent"),this._mouseMoveDelegate=function(e){return r._mouseMove(e)},this._mouseUpDelegate=function(e){return r._mouseUp(e)},e(document).bind("mousemove."+this.widgetName,this._mouseMoveDelegate).bind("mouseup."+this.widgetName,this._mouseUpDelegate),t.preventDefault(),n=!0,!0},_mouseMove:function(t){return!e.ui.ie||document.documentMode>=9||!!t.button?this._mouseStarted?(this._mouseDrag(t),t.preventDefault()):(this._mouseDistanceMet(t)&&this._mouseDelayMet(t)&&(this._mouseStarted=this._mouseStart(this._mouseDownEvent,t)!==!1,this._mouseStarted?this._mouseDrag(t):this._mouseUp(t)),!this._mouseStarted):this._mouseUp(t)},_mouseUp:function(t){return e(document).unbind("mousemove."+this.widgetName,this._mouseMoveDelegate).unbind("mouseup."+this.widgetName,this._mouseUpDelegate),this._mouseStarted&&(this._mouseStarted=!1,t.target===this._mouseDownEvent.target&&e.data(t.target,this.widgetName+".preventClickEvent",!0),this._mouseStop(t)),!1},_mouseDistanceMet:function(e){return Math.max(Math.abs(this._mouseDownEvent.pageX-e.pageX),Math.abs(this._mouseDownEvent.pageY-e.pageY))>=this.options.distance},_mouseDelayMet:function(e){return this.mouseDelayMet},_mouseStart:function(e){},_mouseDrag:function(e){},_mouseStop:function(e){},_mouseCapture:function(e){return!0}})
 })(jQuery);
}catch (e) {
	System.out.println("coremenu failed to load jQuery.ui.mouse -- jQuery version conflict?");
}
if (!jQuery.ui.position)
try{
 (function(e,t){function h(e,t,n){return[parseInt(e[0],10)*(l.test(e[0])?t/100:1),parseInt(e[1],10)*(l.test(e[1])?n/100:1)]}function p(t,n){return parseInt(e.css(t,n),10)||0}e.ui=e.ui||{};var n,r=Math.max,i=Math.abs,s=Math.round,o=/left|center|right/,u=/top|center|bottom/,a=/[\+\-]\d+%?/,f=/^\w+/,l=/%$/,c=e.fn.position;e.position={scrollbarWidth:function(){if(n!==t)return n;var r,i,s=e("<div style='display:block;width:50px;height:50px;overflow:hidden;'><div style='height:100px;width:auto;'></div></div>"),o=s.children()[0];return e("body").append(s),r=o.offsetWidth,s.css("overflow","scroll"),i=o.offsetWidth,r===i&&(i=s[0].clientWidth),s.remove(),n=r-i},getScrollInfo:function(t){var n=t.isWindow?"":t.element.css("overflow-x"),r=t.isWindow?"":t.element.css("overflow-y"),i=n==="scroll"||n==="auto"&&t.width<t.element[0].scrollWidth,s=r==="scroll"||r==="auto"&&t.height<t.element[0].scrollHeight;return{width:i?e.position.scrollbarWidth():0,height:s?e.position.scrollbarWidth():0}},getWithinInfo:function(t){var n=e(t||window),r=e.isWindow(n[0]);return{element:n,isWindow:r,offset:n.offset()||{left:0,top:0},scrollLeft:n.scrollLeft(),scrollTop:n.scrollTop(),width:r?n.width():n.outerWidth(),height:r?n.height():n.outerHeight()}}},e.fn.position=function(t){if(!t||!t.of)return c.apply(this,arguments);t=e.extend({},t);var n,l,d,v,m,g=e(t.of),y=e.position.getWithinInfo(t.within),b=e.position.getScrollInfo(y),w=g[0],E=(t.collision||"flip").split(" "),S={};return w.nodeType===9?(l=g.width(),d=g.height(),v={top:0,left:0}):e.isWindow(w)?(l=g.width(),d=g.height(),v={top:g.scrollTop(),left:g.scrollLeft()}):w.preventDefault?(t.at="left top",l=d=0,v={top:w.pageY,left:w.pageX}):(l=g.outerWidth(),d=g.outerHeight(),v=g.offset()),m=e.extend({},v),e.each(["my","at"],function(){var e=(t[this]||"").split(" "),n,r;e.length===1&&(e=o.test(e[0])?e.concat(["center"]):u.test(e[0])?["center"].concat(e):["center","center"]),e[0]=o.test(e[0])?e[0]:"center",e[1]=u.test(e[1])?e[1]:"center",n=a.exec(e[0]),r=a.exec(e[1]),S[this]=[n?n[0]:0,r?r[0]:0],t[this]=[f.exec(e[0])[0],f.exec(e[1])[0]]}),E.length===1&&(E[1]=E[0]),t.at[0]==="right"?m.left+=l:t.at[0]==="center"&&(m.left+=l/2),t.at[1]==="bottom"?m.top+=d:t.at[1]==="center"&&(m.top+=d/2),n=h(S.at,l,d),m.left+=n[0],m.top+=n[1],this.each(function(){var o,u,a=e(this),f=a.outerWidth(),c=a.outerHeight(),w=p(this,"marginLeft"),x=p(this,"marginTop"),T=f+w+p(this,"marginRight")+b.width,N=c+x+p(this,"marginBottom")+b.height,C=e.extend({},m),k=h(S.my,a.outerWidth(),a.outerHeight());t.my[0]==="right"?C.left-=f:t.my[0]==="center"&&(C.left-=f/2),t.my[1]==="bottom"?C.top-=c:t.my[1]==="center"&&(C.top-=c/2),C.left+=k[0],C.top+=k[1],e.support.offsetFractions||(C.left=s(C.left),C.top=s(C.top)),o={marginLeft:w,marginTop:x},e.each(["left","top"],function(r,i){e.ui.position[E[r]]&&e.ui.position[E[r]][i](C,{targetWidth:l,targetHeight:d,elemWidth:f,elemHeight:c,collisionPosition:o,collisionWidth:T,collisionHeight:N,offset:[n[0]+k[0],n[1]+k[1]],my:t.my,at:t.at,within:y,elem:a})}),e.fn.bgiframe&&a.bgiframe(),t.using&&(u=function(e){var n=v.left-C.left,s=n+l-f,o=v.top-C.top,u=o+d-c,h={target:{element:g,left:v.left,top:v.top,width:l,height:d},element:{element:a,left:C.left,top:C.top,width:f,height:c},horizontal:s<0?"left":n>0?"right":"center",vertical:u<0?"top":o>0?"bottom":"middle"};l<f&&i(n+s)<l&&(h.horizontal="center"),d<c&&i(o+u)<d&&(h.vertical="middle"),r(i(n),i(s))>r(i(o),i(u))?h.important="horizontal":h.important="vertical",t.using.call(this,e,h)}),a.offset(e.extend(C,{using:u}))})},e.ui.position={fit:{left:function(e,t){var n=t.within,i=n.isWindow?n.scrollLeft:n.offset.left,s=n.width,o=e.left-t.collisionPosition.marginLeft,u=i-o,a=o+t.collisionWidth-s-i,f;t.collisionWidth>s?u>0&&a<=0?(f=e.left+u+t.collisionWidth-s-i,e.left+=u-f):a>0&&u<=0?e.left=i:u>a?e.left=i+s-t.collisionWidth:e.left=i:u>0?e.left+=u:a>0?e.left-=a:e.left=r(e.left-o,e.left)},top:function(e,t){var n=t.within,i=n.isWindow?n.scrollTop:n.offset.top,s=t.within.height,o=e.top-t.collisionPosition.marginTop,u=i-o,a=o+t.collisionHeight-s-i,f;t.collisionHeight>s?u>0&&a<=0?(f=e.top+u+t.collisionHeight-s-i,e.top+=u-f):a>0&&u<=0?e.top=i:u>a?e.top=i+s-t.collisionHeight:e.top=i:u>0?e.top+=u:a>0?e.top-=a:e.top=r(e.top-o,e.top)}},flip:{left:function(e,t){var n=t.within,r=n.offset.left+n.scrollLeft,s=n.width,o=n.isWindow?n.scrollLeft:n.offset.left,u=e.left-t.collisionPosition.marginLeft,a=u-o,f=u+t.collisionWidth-s-o,l=t.my[0]==="left"?-t.elemWidth:t.my[0]==="right"?t.elemWidth:0,c=t.at[0]==="left"?t.targetWidth:t.at[0]==="right"?-t.targetWidth:0,h=-2*t.offset[0],p,d;if(a<0){p=e.left+l+c+h+t.collisionWidth-s-r;if(p<0||p<i(a))e.left+=l+c+h}else if(f>0){d=e.left-t.collisionPosition.marginLeft+l+c+h-o;if(d>0||i(d)<f)e.left+=l+c+h}},top:function(e,t){var n=t.within,r=n.offset.top+n.scrollTop,s=n.height,o=n.isWindow?n.scrollTop:n.offset.top,u=e.top-t.collisionPosition.marginTop,a=u-o,f=u+t.collisionHeight-s-o,l=t.my[1]==="top",c=l?-t.elemHeight:t.my[1]==="bottom"?t.elemHeight:0,h=t.at[1]==="top"?t.targetHeight:t.at[1]==="bottom"?-t.targetHeight:0,p=-2*t.offset[1],d,v;a<0?(v=e.top+c+h+p+t.collisionHeight-s-r,e.top+c+h+p>a&&(v<0||v<i(a))&&(e.top+=c+h+p)):f>0&&(d=e.top-t.collisionPosition.marginTop+c+h+p-o,e.top+c+h+p>f&&(d>0||i(d)<f)&&(e.top+=c+h+p))}},flipfit:{left:function(){e.ui.position.flip.left.apply(this,arguments),e.ui.position.fit.left.apply(this,arguments)},top:function(){e.ui.position.flip.top.apply(this,arguments),e.ui.position.fit.top.apply(this,arguments)}}},function(){var t,n,r,i,s,o=document.getElementsByTagName("body")[0],u=document.createElement("div");t=document.createElement(o?"div":"body"),r={visibility:"hidden",width:0,height:0,border:0,margin:0,background:"none"},o&&e.extend(r,{position:"absolute",left:"-1000px",top:"-1000px"});for(s in r)t.style[s]=r[s];t.appendChild(u),n=o||document.documentElement,n.insertBefore(t,n.firstChild),u.style.cssText="position: absolute; left: 10.7432222px;",i=e(u).offset().left,e.support.offsetFractions=i>10&&i<11,t.innerHTML="",n.removeChild(t)}(),e.uiBackCompat!==!1&&function(e){var n=e.fn.position;e.fn.position=function(r){if(!r||!r.offset)return n.call(this,r);var i=r.offset.split(" "),s=r.at.split(" ");return i.length===1&&(i[1]=i[0]),/^\d/.test(i[0])&&(i[0]="+"+i[0]),/^\d/.test(i[1])&&(i[1]="+"+i[1]),s.length===1&&(/left|center|right/.test(s[0])?s[1]="center":(s[1]=s[0],s[0]="center")),n.call(this,e.extend(r,{at:s[0]+i[0]+" "+s[1]+i[1],offset:t}))}}(jQuery)
 })(jQuery);
}catch (e) {
	System.out.println("coremenu failed to load jQuery.ui.position -- jQuery version conflict?");
}

/*! jQuery UI - v1.9.2 - 2012-12-17
* http://jqueryui.com
* Includes: jquery.ui.core.css, jquery.ui.menu.css
* To view and modify this theme, visit http://jqueryui.com/themeroller/?ffDefault=Lucida%20Grande%2CLucida%20Sans%2CArial%2Csans-serif&fwDefault=bold&fsDefault=1.1em&cornerRadius=5px&bgColorHeader=5c9ccc&bgTextureHeader=12_gloss_wave.png&bgImgOpacityHeader=55&borderColorHeader=4297d7&fcHeader=ffffff&iconColorHeader=d8e7f3&bgColorContent=fcfdfd&bgTextureContent=06_inset_hard.png&bgImgOpacityContent=100&borderColorContent=a6c9e2&fcContent=222222&iconColorContent=469bdd&bgColorDefault=dfeffc&bgTextureDefault=03_highlight_soft.png&bgImgOpacityDefault=85&borderColorDefault=c5dbec&fcDefault=2e6e9e&iconColorDefault=6da8d5&bgColorHover=d0e5f5&bgTextureHover=03_highlight_soft.png&bgImgOpacityHover=75&borderColorHover=79b7e7&fcHover=1d5987&iconColorHover=217bc0&bgColorActive=f5f8f9&bgTextureActive=06_inset_hard.png&bgImgOpacityActive=100&borderColorActive=79b7e7&fcActive=e17009&iconColorActive=f9bd01&bgColorHighlight=fbec88&bgTextureHighlight=01_flat.png&bgImgOpacityHighlight=55&borderColorHighlight=fad42e&fcHighlight=363636&iconColorHighlight=2e83ff&bgColorError=fef1ec&bgTextureError=02_glass.png&bgImgOpacityError=95&borderColorError=cd0a0a&fcError=cd0a0a&iconColorError=cd0a0a&bgColorOverlay=aaaaaa&bgTextureOverlay=01_flat.png&bgImgOpacityOverlay=0&opacityOverlay=30&bgColorShadow=aaaaaa&bgTextureShadow=01_flat.png&bgImgOpacityShadow=0&opacityShadow=30&thicknessShadow=8px&offsetTopShadow=-8px&offsetLeftShadow=-8px&cornerRadiusShadow=8px
* Copyright (c) 2012 jQuery Foundation and other contributors Licensed MIT */

if (!jQuery.ui.menu)
try{
 (function(e,t){var n=!1;e.widget("ui.menu",{version:"1.9.2",defaultElement:"<ul>",delay:300,options:{icons:{submenu:"ui-icon-carat-1-e"},menus:"ul",position:{my:"left top",at:"right top"},role:"menu",blur:null,focus:null,select:null},_create:function(){this.activeMenu=this.element,this.element.uniqueId().addClass("ui-menu ui-widget ui-widget-content ui-corner-all").toggleClass("ui-menu-icons",!!this.element.find(".ui-icon").length).attr({role:this.options.role,tabIndex:0}).bind("click"+this.eventNamespace,e.proxy(function(e){this.options.disabled&&e.preventDefault()},this)),this.options.disabled&&this.element.addClass("ui-state-disabled").attr("aria-disabled","true"),this._on({"mousedown .ui-menu-item > a":function(e){e.preventDefault()},"click .ui-state-disabled > a":function(e){e.preventDefault()},"click .ui-menu-item:has(a)":function(t){var r=e(t.target).closest(".ui-menu-item");!n&&r.not(".ui-state-disabled").length&&(n=!0,this.select(t),r.has(".ui-menu").length?this.expand(t):this.element.is(":focus")||(this.element.trigger("focus",[!0]),this.active&&this.active.parents(".ui-menu").length===1&&clearTimeout(this.timer)))},"mouseenter .ui-menu-item":function(t){var n=e(t.currentTarget);n.siblings().children(".ui-state-active").removeClass("ui-state-active"),this.focus(t,n)},mouseleave:"collapseAll","mouseleave .ui-menu":"collapseAll",focus:function(e,t){var n=this.active||this.element.children(".ui-menu-item").eq(0);t||this.focus(e,n)},blur:function(t){this._delay(function(){e.contains(this.element[0],this.document[0].activeElement)||this.collapseAll(t)})},keydown:"_keydown"}),this.refresh(),this._on(this.document,{click:function(t){e(t.target).closest(".ui-menu").length||this.collapseAll(t),n=!1}})},_destroy:function(){this.element.removeAttr("aria-activedescendant").find(".ui-menu").andSelf().removeClass("ui-menu ui-widget ui-widget-content ui-corner-all ui-menu-icons").removeAttr("role").removeAttr("tabIndex").removeAttr("aria-labelledby").removeAttr("aria-expanded").removeAttr("aria-hidden").removeAttr("aria-disabled").removeUniqueId().show(),this.element.find(".ui-menu-item").removeClass("ui-menu-item").removeAttr("role").removeAttr("aria-disabled").children("a").removeUniqueId().removeClass("ui-corner-all ui-state-hover").removeAttr("tabIndex").removeAttr("role").removeAttr("aria-haspopup").children().each(function(){var t=e(this);t.data("ui-menu-submenu-carat")&&t.remove()}),this.element.find(".ui-menu-divider").removeClass("ui-menu-divider ui-widget-content")},_keydown:function(t){function a(e){return e.replace(/[\-\[\]{}()*+?.,\\\^$|#\s]/g,"\\$&")}var n,r,i,s,o,u=!0;switch(t.keyCode){case e.ui.keyCode.PAGE_UP:this.previousPage(t);break;case e.ui.keyCode.PAGE_DOWN:this.nextPage(t);break;case e.ui.keyCode.HOME:this._move("first","first",t);break;case e.ui.keyCode.END:this._move("last","last",t);break;case e.ui.keyCode.UP:this.previous(t);break;case e.ui.keyCode.DOWN:this.next(t);break;case e.ui.keyCode.LEFT:this.collapse(t);break;case e.ui.keyCode.RIGHT:this.active&&!this.active.is(".ui-state-disabled")&&this.expand(t);break;case e.ui.keyCode.ENTER:case e.ui.keyCode.SPACE:this._activate(t);break;case e.ui.keyCode.ESCAPE:this.collapse(t);break;default:u=!1,r=this.previousFilter||"",i=String.fromCharCode(t.keyCode),s=!1,clearTimeout(this.filterTimer),i===r?s=!0:i=r+i,o=new RegExp("^"+a(i),"i"),n=this.activeMenu.children(".ui-menu-item").filter(function(){return o.test(e(this).children("a").text())}),n=s&&n.index(this.active.next())!==-1?this.active.nextAll(".ui-menu-item"):n,n.length||(i=String.fromCharCode(t.keyCode),o=new RegExp("^"+a(i),"i"),n=this.activeMenu.children(".ui-menu-item").filter(function(){return o.test(e(this).children("a").text())})),n.length?(this.focus(t,n),n.length>1?(this.previousFilter=i,this.filterTimer=this._delay(function(){delete this.previousFilter},1e3)):delete this.previousFilter):delete this.previousFilter}u&&t.preventDefault()},_activate:function(e){this.active.is(".ui-state-disabled")||(this.active.children("a[aria-haspopup='true']").length?this.expand(e):this.select(e))},refresh:function(){var t,n=this.options.icons.submenu,r=this.element.find(this.options.menus);r.filter(":not(.ui-menu)").addClass("ui-menu ui-widget ui-widget-content ui-corner-all").hide().attr({role:this.options.role,"aria-hidden":"true","aria-expanded":"false"}).each(function(){var t=e(this),r=t.prev("a"),i=e("<span>").addClass("ui-menu-icon ui-icon "+n).data("ui-menu-submenu-carat",!0);r.attr("aria-haspopup","true").prepend(i),t.attr("aria-labelledby",r.attr("id"))}),t=r.add(this.element),t.children(":not(.ui-menu-item):has(a)").addClass("ui-menu-item").attr("role","presentation").children("a").uniqueId().addClass("ui-corner-all").attr({tabIndex:-1,role:this._itemRole()}),t.children(":not(.ui-menu-item)").each(function(){var t=e(this);/[^\-+�G��G��+�G��G��\s]/.test(t.text())||t.addClass("ui-widget-content ui-menu-divider")}),t.children(".ui-state-disabled").attr("aria-disabled","true"),this.active&&!e.contains(this.element[0],this.active[0])&&this.blur()},_itemRole:function(){return{menu:"menuitem",listbox:"option"}[this.options.role]},focus:function(e,t){var n,r;this.blur(e,e&&e.type==="focus"),this._scrollIntoView(t),this.active=t.first(),r=this.active.children("a").addClass("ui-state-focus"),this.options.role&&this.element.attr("aria-activedescendant",r.attr("id")),this.active.parent().closest(".ui-menu-item").children("a:first").addClass("ui-state-active"),e&&e.type==="keydown"?this._close():this.timer=this._delay(function(){this._close()},this.delay),n=t.children(".ui-menu"),n.length&&/^mouse/.test(e.type)&&this._startOpening(n),this.activeMenu=t.parent(),this._trigger("focus",e,{item:t})},_scrollIntoView:function(t){var n,r,i,s,o,u;this._hasScroll()&&(n=parseFloat(e.css(this.activeMenu[0],"borderTopWidth"))||0,r=parseFloat(e.css(this.activeMenu[0],"paddingTop"))||0,i=t.offset().top-this.activeMenu.offset().top-n-r,s=this.activeMenu.scrollTop(),o=this.activeMenu.height(),u=t.height(),i<0?this.activeMenu.scrollTop(s+i):i+u>o&&this.activeMenu.scrollTop(s+i-o+u))},blur:function(e,t){t||clearTimeout(this.timer);if(!this.active)return;this.active.children("a").removeClass("ui-state-focus"),this.active=null,this._trigger("blur",e,{item:this.active})},
 
 _startOpening:function(e){
 
 if (e.hasClass("ui-state-disabled"))return // BH
 
 clearTimeout(this.timer);if(e.attr("aria-hidden")!=="true")return;this.timer=this._delay(function(){this._close(),this._open(e)},this.delay)},_open:function(t){var n=e.extend({of:this.active},this.options.position);clearTimeout(this.timer),this.element.find(".ui-menu").not(t.parents(".ui-menu")).hide().attr("aria-hidden","true"),t.show().removeAttr("aria-hidden").attr("aria-expanded","true").position(n)},collapseAll:function(t,n){clearTimeout(this.timer),this.timer=this._delay(function(){var r=n?this.element:e(t&&t.target).closest(this.element.find(".ui-menu"));r.length||(r=this.element),this._close(r),this.blur(t),this.activeMenu=r},this.delay)},_close:function(e){e||(e=this.active?this.active.parent():this.element),e.find(".ui-menu").hide().attr("aria-hidden","true").attr("aria-expanded","false").end().find("a.ui-state-active").removeClass("ui-state-active")},collapse:function(e){var t=this.active&&this.active.parent().closest(".ui-menu-item",this.element);t&&t.length&&(this._close(),this.focus(e,t))},expand:function(e){var t=this.active&&this.active.children(".ui-menu ").children(".ui-menu-item").first();t&&t.length&&(this._open(t.parent()),this._delay(function(){this.focus(e,t)}))},next:function(e){this._move("next","first",e)},previous:function(e){this._move("prev","last",e)},isFirstItem:function(){return this.active&&!this.active.prevAll(".ui-menu-item").length},isLastItem:function(){return this.active&&!this.active.nextAll(".ui-menu-item").length},_move:function(e,t,n){var r;this.active&&(e==="first"||e==="last"?r=this.active[e==="first"?"prevAll":"nextAll"](".ui-menu-item").eq(-1):r=this.active[e+"All"](".ui-menu-item").eq(0));if(!r||!r.length||!this.active)r=this.activeMenu.children(".ui-menu-item")[t]();this.focus(n,r)},nextPage:function(t){var n,r,i;if(!this.active){this.next(t);return}if(this.isLastItem())return;this._hasScroll()?(r=this.active.offset().top,i=this.element.height(),this.active.nextAll(".ui-menu-item").each(function(){return n=e(this),n.offset().top-r-i<0}),this.focus(t,n)):this.focus(t,this.activeMenu.children(".ui-menu-item")[this.active?"last":"first"]())},previousPage:function(t){var n,r,i;if(!this.active){this.next(t);return}if(this.isFirstItem())return;this._hasScroll()?(r=this.active.offset().top,i=this.element.height(),this.active.prevAll(".ui-menu-item").each(function(){return n=e(this),n.offset().top-r+i>0}),this.focus(t,n)):this.focus(t,this.activeMenu.children(".ui-menu-item").first())},_hasScroll:function(){return this.element.outerHeight()<this.element.prop("scrollHeight")},select:function(t){this.active=this.active||e(t.target).closest(".ui-menu-item");var n={item:this.active};this.active.has(".ui-menu").length||this.collapseAll(t,!0),this._trigger("select",t,n)}})
 })(jQuery);
}catch (e) {
	System.out.println("JSmolMenu failed to load jQuery.ui.menu -- jQuery version conflict?");
}

;(function(Swing) {

/*

Jmol.Swing methods to coordinate with org.jmol.awtjs.swing.JPopupMenu && org.jmol.awtjs.swing.AbstractButton
classes, which call SwingController (aka Jmol.Swing in this case)
@author: Bob Hanson 2/17/2014 8:21:10 AM

*/

if (Swing.menuInitialized)return;
Swing.menuCounter = 0;
Swing.menuInitialized = 1;

Swing.__getMenuStyle = function(applet) { return '\
	.jmolPopupMenu{font-family:Arial,sans-serif;font-size:11px;position:absolute;z-index:'+Jmol._getZ(applet, "menu")+'}\
	.jmolPopupMenu,.jmolPopupMenu .ui-corner-all{border-radius:5px}\
	.jmolPopupMenu,.jmolPopupMenu .ui-widget-content{border:1px solid #a6c9e2;background-color:#fcfdfd;color:#222}\
	.jmolPopupMenu a{color:#222;font-size:10px;}\
	.jmolPopupMenu input[type="checkbox"]{vertical-align:middle;}\
	.jmolPopupMenu,.jmolPopupMenu .ui-menu{list-style:none;padding:2px;margin:0;display:block;outline:none;box-shadow:1px 1px 5px rgba(50,50,50,0.75)}\
	.jmolPopupMenu .ui-menu{margin-top:-3px;position:absolute}\
	.jmolPopupMenu .ui-menu-item{cursor:pointer;margin:0 2ex 0 0;padding:0;width:100%}\
	.jmolPopupMenu .ui-menu-divider{margin:3px 1px;height:0;font-size:0;line-height:0;border-width:1px 0 0 0}\
	.jmolPopupMenu .ui-menu-item a{text-decoration:none;display:block;padding:0.05em 0.4em;white-space:nowrap;border:1px solid transparent}\
	.jmolPopupMenu .ui-menu-icons{position:relative}\
	.jmolPopupMenu .ui-menu-icons .ui-menu-item a{position:relative;padding-left:2em}\
	.jmolPopupMenu .ui-icon{display:block;text-indent:-99999px;overflow:hidden;background-repeat:no-repeat;position:absolute;top:.2em;left:.2em}\
	.jmolPopupMenu .ui-menu-icon{position:static;float:right}\
	.jmolPopupMenu .ui-icon-carat-1-e{min-width:2ex;text-align:right;background-image:none;background-position:0 0}\
	.jmolPopupMenu .ui-icon-carat-1-e:after{content:"\\25B8"}\
	.jmolPopupMenu .ui-state-default{border:1px solid #c5dbec;background:#dfeffc;color:#2e6e9e}\
	.jmolPopupMenu .ui-state-default a{color:#2e6e9e;text-decoration:none}\
	.jmolPopupMenu .ui-state-hover,.jmolPopupMenu .ui-state-focus{border:1px solid #79b7e7;background:#d0e5f5;color:#1d5987}\
	.jmolPopupMenu .ui-state-hover a{color:#1d5987;text-decoration:none}\
	.jmolPopupMenu .ui-state-active{border:1px solid #79b7e7;background:#f5f8f9;color:#e17009}\
	.jmolPopupMenu .ui-state-active a{color:#e17009;text-decoration:none}\
	.jmolPopupMenu .ui-state-highlight{border:1px solid #fad42e;background:#fbec88;color:#363636}\
	.jmolPopupMenu .ui-state-highlight a{color:#363636}\
	.jmolPopupMenu .ui-state-disabled *{background:grey!important,color:#d6d6d6!important;font-weight:normal;cursor:default}\
	.jmolPopupMenu .ui-state-disabled a:hover{background-color:transparent!important;border-color:transparent!important}\
	.jmolPopupMenu .ui-state-disabled .ui-icon{filter:Alpha(Opacity=35)}'};

Swing.setMenu = function(menu) {
  // called by org.jmol.awtjs.swing.JPopupMenu
  // note that the z-index is only set by the FIRST applet accessing this method
	Swing.__getMenuStyle && Jmol.$after("head", '<style>'+Swing.__getMenuStyle(menu.applet)+'</style>');  
	Swing.__getStyle = null; // once only
	menu.tainted = true;
	menu.popupMenu = menu;
	menu.id = "top";
	menu.id = Swing.getMenuID(menu);
	menu.applet._menus || (menu.applet._menus = {});
	menu.applet._menus[menu.name] = menu;
	Jmol.$after("body",'<ul id="' + menu.id + '" class="jmolPopupMenu"></ul>');
	menu.setContainer(Jmol.$('#' + menu.id));
}

Swing.showMenu = function(menu, x, y) {
  // called by org.jmol.awtjs.swing.JPopupMenu
  // allow for a user callback for customization of menu
  if (Jmol._showMenuCallback)
		Jmol._showMenuCallback(menu, x, y);
	if (menu.tainted) {
		menu.container.html(menu.toHTML());
		menu.tainted = false;
		Swing.bindMenuActionCommands(menu, true);
	}
	menu.setPosition();
	menu.container.hide().menu().menu('refresh').show();
	menu._visible = true;
	menu.timestamp = System.currentTimeMillis();
	menu.dragBind(true);
	menu.container.unbind('clickoutjsmol');
  if (!Jmol._persistentMenu)
	menu.container.bind('clickoutjsmol mousemoveoutjsmol', function(evspecial, target, ev) {
	  if (System.currentTimeMillis() - menu.timestamp > 1000)
		  Swing.hideMenu(menu);
	});
	menu.container.bind("contextmenu", function() {return false;})
}

Swing.disposeMenu = function(menu) {
  // called by org.jmol.awtjs.swing.JPopupMenu
  if (Jmol._persistentMenu)
  	return
  Swing.hideMenu(menu);
	Swing.bindMenuActionCommands(menu, false);
	delete menu.applet._menus[menu.name];
}

Swing.initMenuItem = function(item) {
  // called by org.jmol.awtjs.swing.AbstractButton
  item.applet = item.popupMenu.applet;
  item.id = Swing.getMenuID(item);
  item.icon && (item.icon = '<img src="' + item.applet._j2sPath + '/' + item.icon + '" style="max-height: 20px;" />')
}

Swing.getMenuID = function(item) {
  // called internally
  var popup = item.popupMenu;
	return popup.applet._id + '_' + popup.name + "_" + item.id + '_' + (++Swing.menuCounter);
}

Swing.hideMenu = function(menu) {
  // called internally
	if (!menu._visible)return;
	//menu.container.unbind('clickoutjsmol');
	menu.dragBind(false);
	menu.container.hide();
	menu._visible = menu.isDragging = false;
};

var delayHide = function(menu, f) {
	setTimeout(function(){Swing.hideMenus(menu.applet);f();},500);			
}

Swing.bindMenuActionCommands = function(menu, isBind) {
  // called internally
	var n = menu.getComponentCount();
	for(var i = 0; i < n; i++)
		Swing.bindMenuActionCommands(menu.getComponent(i), isBind);
	Jmol.$documentOff('click mouseup mouseover mousedown touchstart touchend mouseenter mouseleave', menu.id);
	if (isBind) {
		Jmol.$documentOn('click', menu.id, function(event) {	
			var name= "" + menu.name;
			var dohide = (name.indexOf("Persist") < 0 || name.indexOf("!Persist") >= 0);
			if (menu.itemListener) {
				menu.selected = (menu.btnType == 2/*J.awtjs.swing.JMenuItem.TYPE_CHECKBOX*/ ? Jmol.$prop(menu.id + "-cb", "checked") : true); 
				if (dohide)			
					delayHide(menu, function() {menu.itemListener.itemStateChanged({getSource:function(){return menu}})});
			}	else if (menu.actionListener) {
				if (dohide)			
					delayHide(menu, function() {menu.actionListener.actionPerformed({getSource:function(){return menu},getActionCommand:function(){return menu.actionCommand}})});
			}
		});
		Jmol.$documentOn('mouseup mouseover mousedown touchstart touchend mouseenter mouseleave', menu.id, function(event) {	
			if (menu.mouseListener && menu.mouseListener.handleEvent) {
				menu.mouseListener.handleEvent({jqevent:event,getID:function(){return event.type},getSource:function(){return menu}});
			}
		});
	}
}

})(Jmol.Swing);

})(Jmol.__$);Clazz_declarePackage ("J.popup");
Clazz_load (["J.api.GenericMenuInterface", "java.util.Hashtable", "JU.Lst"], "J.popup.GenericPopup", ["java.util.StringTokenizer", "JU.PT", "$.SB", "JU.Logger"], function () {
c$ = Clazz_decorateAsClass (function () {
this.helper = null;
this.strMenuStructure = null;
this.allowSignedFeatures = false;
this.isJS = false;
this.isApplet = false;
this.isSigned = false;
this.isWebGL = false;
this.thisx = 0;
this.thisy = 0;
this.isTainted = true;
this.menuName = null;
this.popupMenu = null;
this.thisPopup = null;
this.htCheckbox = null;
this.buttonGroup = null;
this.currentMenuItemId = null;
this.htMenus = null;
this.SignedOnly = null;
this.updatingForShow = false;
Clazz_instantialize (this, arguments);
}, J.popup, "GenericPopup", null, J.api.GenericMenuInterface);
Clazz_prepareFields (c$, function () {
this.htCheckbox =  new java.util.Hashtable ();
this.htMenus =  new java.util.Hashtable ();
this.SignedOnly =  new JU.Lst ();
});
Clazz_defineMethod (c$, "appCheckItem", 
function (item, newMenu) {
}, "~S,J.api.SC");
Clazz_defineMethod (c$, "appCheckSpecialMenu", 
function (item, subMenu, word) {
}, "~S,J.api.SC,~S");
Clazz_defineMethod (c$, "initSwing", 
function (title, bundle, applet, isJS, isSigned, isWebGL) {
this.isJS = isJS;
this.isApplet = (applet != null);
this.isSigned = isSigned;
this.isWebGL = isWebGL;
this.allowSignedFeatures = (!this.isApplet || isSigned);
this.menuName = title;
this.popupMenu = this.helper.menuCreatePopup (title, applet);
this.thisPopup = this.popupMenu;
this.htMenus.put (title, this.popupMenu);
this.addMenuItems ("", title, this.popupMenu, bundle);
try {
this.jpiUpdateComputedMenus ();
} catch (e) {
if (Clazz_exceptionOf (e, NullPointerException)) {
} else {
throw e;
}
}
}, "~S,J.popup.PopupResource,~O,~B,~B,~B");
Clazz_defineMethod (c$, "addMenuItems", 
function (parentId, key, menu, popupResourceBundle) {
var id = parentId + "." + key;
var value = popupResourceBundle.getStructure (key);
if (JU.Logger.debugging) JU.Logger.debug (id + " --- " + value);
if (value == null) {
this.menuCreateItem (menu, "#" + key, "", "");
return;
}var st =  new java.util.StringTokenizer (value);
var item;
while (value.indexOf ("@") >= 0) {
var s = "";
while (st.hasMoreTokens ()) s += " " + ((item = st.nextToken ()).startsWith ("@") ? popupResourceBundle.getStructure (item) : item);

value = s.substring (1);
st =  new java.util.StringTokenizer (value);
}
while (st.hasMoreTokens ()) {
item = st.nextToken ();
if (!this.checkKey (item)) continue;
if ("-".equals (item)) {
this.menuAddSeparator (menu);
this.helper.menuAddButtonGroup (null);
continue;
}var label = popupResourceBundle.getWord (item);
var newItem = null;
var script = "";
var isCB = false;
label = this.appFixLabel (label == null ? item : label);
if (label.equals ("null")) {
continue;
}if (item.indexOf ("Menu") >= 0) {
if (item.indexOf ("more") < 0) this.helper.menuAddButtonGroup (null);
var subMenu = this.menuNewSubMenu (label, id + "." + item);
this.menuAddSubMenu (menu, subMenu);
if (item.indexOf ("Computed") < 0) this.addMenuItems (id, item, subMenu, popupResourceBundle);
this.appCheckSpecialMenu (item, subMenu, label);
newItem = subMenu;
} else if (item.endsWith ("Checkbox") || (isCB = (item.endsWith ("CB") || item.endsWith ("RD")))) {
script = popupResourceBundle.getStructure (item);
var basename = item.substring (0, item.length - (!isCB ? 8 : 2));
var isRadio = (isCB && item.endsWith ("RD"));
if (script == null || script.length == 0 && !isRadio) script = "set " + basename + " T/F";
newItem = this.menuCreateCheckboxItem (menu, label, basename + ":" + script, id + "." + item, false, isRadio);
this.rememberCheckbox (basename, newItem);
if (isRadio) this.helper.menuAddButtonGroup (newItem);
} else {
script = popupResourceBundle.getStructure (item);
if (script == null) script = item;
newItem = this.menuCreateItem (menu, label, script, id + "." + item);
}this.htMenus.put (item, newItem);
if (item.startsWith ("SIGNED")) {
this.SignedOnly.addLast (newItem);
if (!this.allowSignedFeatures) this.menuEnable (newItem, false);
}this.appCheckItem (item, newItem);
}
}, "~S,~S,J.api.SC,J.popup.PopupResource");
Clazz_defineMethod (c$, "updateSignedAppletItems", 
function () {
for (var i = this.SignedOnly.size (); --i >= 0; ) this.menuEnable (this.SignedOnly.get (i), this.allowSignedFeatures);

});
Clazz_defineMethod (c$, "checkKey", 
 function (key) {
return (key.indexOf (this.isApplet ? "JAVA" : "APPLET") < 0 && (!this.isWebGL || key.indexOf ("NOGL") < 0));
}, "~S");
Clazz_defineMethod (c$, "rememberCheckbox", 
 function (key, checkboxMenuItem) {
this.htCheckbox.put (key + "::" + this.htCheckbox.size (), checkboxMenuItem);
}, "~S,J.api.SC");
Clazz_defineMethod (c$, "updateButton", 
function (b, entry, script) {
var ret =  Clazz_newArray (-1, [entry]);
var icon = this.getEntryIcon (ret);
entry = ret[0];
b.init (entry, icon, script, this.thisPopup);
this.isTainted = true;
}, "J.api.SC,~S,~S");
Clazz_defineMethod (c$, "getEntryIcon", 
function (ret) {
var entry = ret[0];
if (!entry.startsWith ("<")) return null;
var pt = entry.indexOf (">");
ret[0] = entry.substring (pt + 1);
var fileName = entry.substring (1, pt);
return this.getImageIcon (fileName);
}, "~A");
Clazz_defineMethod (c$, "addMenuItem", 
function (menuItem, entry) {
return this.menuCreateItem (menuItem, entry, "", null);
}, "J.api.SC,~S");
Clazz_defineMethod (c$, "menuSetLabel", 
function (m, entry) {
m.setText (entry);
this.isTainted = true;
}, "J.api.SC,~S");
Clazz_defineMethod (c$, "menuClickCallback", 
function (source, script) {
this.doMenuClickCallback (source, script);
}, "J.api.SC,~S");
Clazz_defineMethod (c$, "doMenuClickCallback", 
function (source, script) {
this.appRestorePopupMenu ();
if (script == null || script.length == 0) return;
if (script.equals ("MAIN")) {
this.show (this.thisx, this.thisy, true);
return;
}var id = this.menuGetId (source);
if (id != null) {
script = this.getScriptForCallback (source, id, script);
this.currentMenuItemId = id;
}if (script != null) this.appRunScript (script);
}, "J.api.SC,~S");
Clazz_defineMethod (c$, "menuCheckBoxCallback", 
function (source) {
this.doMenuCheckBoxCallback (source);
}, "J.api.SC");
Clazz_defineMethod (c$, "doMenuCheckBoxCallback", 
function (source) {
this.appRestorePopupMenu ();
var isSelected = source.isSelected ();
var what = source.getActionCommand ();
this.runCheckBoxScript (source, what, isSelected);
this.appUpdateSpecialCheckBoxValue (source, what, isSelected);
this.isTainted = true;
var id = this.menuGetId (source);
if (id != null) {
this.currentMenuItemId = id;
}}, "J.api.SC");
Clazz_defineMethod (c$, "runCheckBoxScript", 
 function (item, what, TF) {
if (!item.isEnabled ()) return;
if (what.indexOf ("##") < 0) {
var pt = what.indexOf (":");
if (pt < 0) {
JU.Logger.error ("check box " + item + " IS " + what);
return;
}var basename = what.substring (0, pt);
if (this.appRunSpecialCheckBox (item, basename, what, TF)) return;
what = what.substring (pt + 1);
if ((pt = what.indexOf ("|")) >= 0) what = (TF ? what.substring (0, pt) : what.substring (pt + 1)).trim ();
what = JU.PT.rep (what, "T/F", (TF ? " TRUE" : " FALSE"));
}this.appRunScript (what);
}, "J.api.SC,~S,~B");
Clazz_defineMethod (c$, "menuCreateItem", 
function (menu, entry, script, id) {
var item = this.helper.getMenuItem (entry);
item.addActionListener (this.helper);
return this.newMenuItem (item, menu, entry, script, id);
}, "J.api.SC,~S,~S,~S");
Clazz_defineMethod (c$, "menuCreateCheckboxItem", 
function (menu, entry, basename, id, state, isRadio) {
var jmi = (isRadio ? this.helper.getRadio (entry) : this.helper.getCheckBox (entry));
jmi.setSelected (state);
jmi.addItemListener (this.helper);
return this.newMenuItem (jmi, menu, entry, basename, id);
}, "J.api.SC,~S,~S,~S,~B,~B");
Clazz_defineMethod (c$, "menuAddSeparator", 
function (menu) {
menu.add (this.helper.getMenuItem (null));
this.isTainted = true;
}, "J.api.SC");
Clazz_defineMethod (c$, "menuNewSubMenu", 
function (entry, id) {
var jm = this.helper.getMenu (entry);
jm.addMouseListener (this.helper);
this.updateButton (jm, entry, null);
jm.setName (id);
jm.setAutoscrolls (true);
return jm;
}, "~S,~S");
Clazz_defineMethod (c$, "menuRemoveAll", 
function (menu, indexFrom) {
if (indexFrom <= 0) menu.removeAll ();
 else for (var i = menu.getComponentCount (); --i >= indexFrom; ) menu.remove (i);

this.isTainted = true;
}, "J.api.SC,~N");
Clazz_defineMethod (c$, "newMenuItem", 
 function (item, menu, text, script, id) {
this.updateButton (item, text, script);
item.addMouseListener (this.helper);
item.setName (id == null ? menu.getName () + "." : id);
this.menuAddItem (menu, item);
return item;
}, "J.api.SC,J.api.SC,~S,~S,~S");
Clazz_defineMethod (c$, "setText", 
function (item, text) {
var m = this.htMenus.get (item);
if (m != null) m.setText (text);
return m;
}, "~S,~S");
Clazz_defineMethod (c$, "menuAddItem", 
 function (menu, item) {
menu.add (item);
this.isTainted = true;
}, "J.api.SC,J.api.SC");
Clazz_defineMethod (c$, "menuAddSubMenu", 
function (menu, subMenu) {
subMenu.addMouseListener (this.helper);
this.menuAddItem (menu, subMenu);
}, "J.api.SC,J.api.SC");
Clazz_defineMethod (c$, "menuEnable", 
function (component, enable) {
if (component == null || component.isEnabled () == enable) return;
component.setEnabled (enable);
}, "J.api.SC,~B");
Clazz_defineMethod (c$, "menuGetId", 
function (menu) {
return menu.getName ();
}, "J.api.SC");
Clazz_defineMethod (c$, "menuSetAutoscrolls", 
function (menu) {
menu.setAutoscrolls (true);
this.isTainted = true;
}, "J.api.SC");
Clazz_defineMethod (c$, "menuGetListPosition", 
function (item) {
var p = item.getParent ();
var i;
for (i = p.getComponentCount (); --i >= 0; ) if (this.helper.getSwingComponent (p.getComponent (i)) === item) break;

return i;
}, "J.api.SC");
Clazz_defineMethod (c$, "show", 
function (x, y, doPopup) {
this.appUpdateForShow ();
this.updateCheckBoxesForShow ();
if (doPopup) this.menuShowPopup (this.popupMenu, this.thisx, this.thisy);
}, "~N,~N,~B");
Clazz_defineMethod (c$, "updateCheckBoxesForShow", 
 function () {
for (var entry, $entry = this.htCheckbox.entrySet ().iterator (); $entry.hasNext () && ((entry = $entry.next ()) || true);) {
var key = entry.getKey ();
var item = entry.getValue ();
var basename = key.substring (0, key.indexOf (":"));
var b = this.appGetBooleanProperty (basename);
this.updatingForShow = true;
if (item.isSelected () != b) {
item.setSelected (b);
this.isTainted = true;
}this.updatingForShow = false;
}
});
Clazz_overrideMethod (c$, "jpiGetMenuAsString", 
function (title) {
this.appUpdateForShow ();
var pt = title.indexOf ("|");
if (pt >= 0) {
var type = title.substring (pt);
title = title.substring (0, pt);
if (type.indexOf ("current") >= 0) {
var sb =  new JU.SB ();
var menu = this.htMenus.get (this.menuName);
this.menuGetAsText (sb, 0, menu, "PopupMenu");
return sb.toString ();
}}return this.appGetMenuAsString (title);
}, "~S");
Clazz_defineMethod (c$, "appGetMenuAsString", 
function (title) {
return null;
}, "~S");
Clazz_defineMethod (c$, "menuGetAsText", 
 function (sb, level, menu, menuName) {
var name = menuName;
var subMenus = menu.getComponents ();
var flags = null;
var script = null;
var text = null;
var key = 'S';
for (var i = 0; i < subMenus.length; i++) {
var source = this.helper.getSwingComponent (subMenus[i]);
var type = this.helper.getItemType (source);
switch (type) {
case 4:
key = 'M';
name = source.getName ();
flags = "enabled:" + source.isEnabled ();
text = source.getText ();
script = null;
break;
case 0:
key = 'S';
flags = script = text = null;
break;
default:
key = 'I';
flags = "enabled:" + source.isEnabled ();
if (type == 2 || type == 3) flags += ";checked:" + source.isSelected ();
script = this.getScriptForCallback (source, source.getName (), source.getActionCommand ());
name = source.getName ();
text = source.getText ();
break;
}
J.popup.GenericPopup.addItemText (sb, key, level, name, text, script, flags);
if (type == 2) this.menuGetAsText (sb, level + 1, this.helper.getSwingComponent (source.getPopupMenu ()), name);
}
}, "JU.SB,~N,J.api.SC,~S");
c$.addItemText = Clazz_defineMethod (c$, "addItemText", 
 function (sb, type, level, name, label, script, flags) {
sb.appendC (type).appendI (level).appendC ('\t').append (name);
if (label == null) {
sb.append (".\n");
return;
}sb.append ("\t").append (label).append ("\t").append (script == null || script.length == 0 ? "-" : script).append ("\t").append (flags).append ("\n");
}, "JU.SB,~S,~N,~S,~S,~S,~S");
c$.convertToMegabytes = Clazz_defineMethod (c$, "convertToMegabytes", 
function (num) {
if (num <= 9223372036854251519) num += 524288;
return (Clazz_doubleToInt (num / (1048576)));
}, "~N");
});
Clazz_declarePackage ("J.popup");
Clazz_load (["J.popup.GenericPopup", "java.util.Properties"], "J.popup.JmolGenericPopup", ["J.i18n.GT", "JV.Viewer"], function () {
c$ = Clazz_decorateAsClass (function () {
this.frankPopup = null;
this.nFrankList = 0;
this.vwr = null;
this.menuText = null;
Clazz_instantialize (this, arguments);
}, J.popup, "JmolGenericPopup", J.popup.GenericPopup);
Clazz_prepareFields (c$, function () {
this.menuText =  new java.util.Properties ();
});
Clazz_overrideMethod (c$, "jpiInitialize", 
function (vwr, menu) {
var doTranslate = J.i18n.GT.setDoTranslate (true);
var bundle = this.getBundle (menu);
this.initialize (vwr, bundle, bundle.getMenuName ());
J.i18n.GT.setDoTranslate (doTranslate);
}, "J.api.PlatformViewer,~S");
Clazz_defineMethod (c$, "initialize", 
function (vwr, bundle, title) {
this.vwr = vwr;
this.initSwing (title, bundle, vwr.html5Applet, JV.Viewer.isJSNoAWT, vwr.getBooleanProperty ("_signedApplet"), JV.Viewer.isWebGL);
}, "JV.Viewer,J.popup.PopupResource,~S");
Clazz_overrideMethod (c$, "jpiShow", 
function (x, y) {
if (!this.vwr.haveDisplay) return;
this.thisx = x;
this.thisy = y;
this.show (x, y, false);
if (x < 0 && this.showFrankMenu ()) return;
this.appRestorePopupMenu ();
this.menuShowPopup (this.popupMenu, this.thisx, this.thisy);
}, "~N,~N");
Clazz_defineMethod (c$, "showFrankMenu", 
function () {
return true;
});
Clazz_overrideMethod (c$, "jpiDispose", 
function () {
this.helper.menuClearListeners (this.popupMenu);
this.popupMenu = this.thisPopup = null;
});
Clazz_overrideMethod (c$, "jpiGetMenuAsObject", 
function () {
return this.popupMenu;
});
Clazz_overrideMethod (c$, "appFixLabel", 
function (label) {
return label;
}, "~S");
Clazz_overrideMethod (c$, "appGetBooleanProperty", 
function (name) {
return this.vwr.getBooleanProperty (name);
}, "~S");
Clazz_overrideMethod (c$, "appRunSpecialCheckBox", 
function (item, basename, script, TF) {
if (this.appGetBooleanProperty (basename) == TF) return true;
if (basename.indexOf ("mk") < 0 && !basename.endsWith ("P!")) return false;
if (basename.indexOf ("mk") >= 0 || basename.indexOf ("??") >= 0) {
script = this.getUnknownCheckBoxScriptToRun (item, basename, script, TF);
} else {
if (!TF) return true;
script = "set picking " + basename.substring (0, basename.length - 2);
}if (script != null) this.appRunScript (script);
return true;
}, "J.api.SC,~S,~S,~B");
Clazz_overrideMethod (c$, "appRestorePopupMenu", 
function () {
this.thisPopup = this.popupMenu;
});
Clazz_overrideMethod (c$, "appRunScript", 
function (script) {
this.vwr.evalStringQuiet (script);
}, "~S");
});
Clazz_declarePackage ("J.popup");
Clazz_load (["J.popup.JmolGenericPopup", "JU.Lst"], "J.popup.JmolPopup", ["java.lang.Boolean", "java.util.Arrays", "$.Hashtable", "JU.PT", "J.i18n.GT", "JM.Group", "J.popup.MainPopupResourceBundle", "JU.Elements", "JV.Viewer"], function () {
c$ = Clazz_decorateAsClass (function () {
this.updateMode = 0;
this.titleWidthMax = 20;
this.nullModelSetName = null;
this.modelSetName = null;
this.modelSetFileName = null;
this.modelSetRoot = null;
this.currentFrankId = null;
this.configurationSelected = "";
this.altlocs = null;
this.frankList = null;
this.modelSetInfo = null;
this.modelInfo = null;
this.NotPDB = null;
this.PDBOnly = null;
this.FileUnitOnly = null;
this.FileMolOnly = null;
this.UnitcellOnly = null;
this.SingleModelOnly = null;
this.FramesOnly = null;
this.VibrationOnly = null;
this.Special = null;
this.SymmetryOnly = null;
this.ChargesOnly = null;
this.TemperatureOnly = null;
this.fileHasUnitCell = false;
this.haveBFactors = false;
this.haveCharges = false;
this.isLastFrame = false;
this.isMultiConfiguration = false;
this.isMultiFrame = false;
this.isPDB = false;
this.hasSymmetry = false;
this.isUnitCell = false;
this.isVibration = false;
this.isZapped = false;
this.modelIndex = 0;
this.modelCount = 0;
this.ac = 0;
this.group3List = null;
this.group3Counts = null;
this.cnmrPeaks = null;
this.hnmrPeaks = null;
this.noZapped = null;
Clazz_instantialize (this, arguments);
}, J.popup, "JmolPopup", J.popup.JmolGenericPopup);
Clazz_prepareFields (c$, function () {
this.frankList =  new Array (10);
this.NotPDB =  new JU.Lst ();
this.PDBOnly =  new JU.Lst ();
this.FileUnitOnly =  new JU.Lst ();
this.FileMolOnly =  new JU.Lst ();
this.UnitcellOnly =  new JU.Lst ();
this.SingleModelOnly =  new JU.Lst ();
this.FramesOnly =  new JU.Lst ();
this.VibrationOnly =  new JU.Lst ();
this.Special =  new JU.Lst ();
this.SymmetryOnly =  new JU.Lst ();
this.ChargesOnly =  new JU.Lst ();
this.TemperatureOnly =  new JU.Lst ();
this.noZapped =  Clazz_newArray (-1, ["surfaceMenu", "measureMenu", "pickingMenu", "computationMenu", "SIGNEDJAVAcaptureMenuSPECIAL"]);
});
Clazz_defineMethod (c$, "jpiDispose", 
function () {
Clazz_superCall (this, J.popup.JmolPopup, "jpiDispose", []);
this.helper.menuClearListeners (this.frankPopup);
this.frankPopup = null;
});
Clazz_overrideMethod (c$, "getBundle", 
function (menu) {
return  new J.popup.MainPopupResourceBundle (this.strMenuStructure = menu, this.menuText);
}, "~S");
Clazz_overrideMethod (c$, "showFrankMenu", 
function () {
this.getViewerData ();
this.setFrankMenu (this.currentMenuItemId);
this.thisx = -this.thisx - 50;
if (this.nFrankList > 1) {
this.thisy -= this.nFrankList * 20;
this.menuShowPopup (this.frankPopup, this.thisx, this.thisy);
return false;
}return true;
});
Clazz_overrideMethod (c$, "jpiUpdateComputedMenus", 
function () {
if (this.updateMode == -1) return;
this.isTainted = true;
this.updateMode = 0;
this.getViewerData ();
this.updateSelectMenu ();
this.updateFileMenu ();
this.updateElementsComputedMenu (this.vwr.getElementsPresentBitSet (this.modelIndex));
this.updateHeteroComputedMenu (this.vwr.ms.getHeteroList (this.modelIndex));
this.updateSurfMoComputedMenu (this.modelInfo.get ("moData"));
this.updateFileTypeDependentMenus ();
this.updatePDBComputedMenus ();
this.updateMode = 1;
this.updateConfigurationComputedMenu ();
this.updateSYMMETRYComputedMenus ();
this.updateFRAMESbyModelComputedMenu ();
this.updateModelSetComputedMenu ();
this.updateLanguageSubmenu ();
this.updateAboutSubmenu ();
});
Clazz_overrideMethod (c$, "appCheckItem", 
function (item, newMenu) {
if (item.indexOf ("!PDB") >= 0) {
this.NotPDB.addLast (newMenu);
} else if (item.indexOf ("PDB") >= 0) {
this.PDBOnly.addLast (newMenu);
}if (item.indexOf ("CHARGE") >= 0) {
this.ChargesOnly.addLast (newMenu);
} else if (item.indexOf ("BFACTORS") >= 0) {
this.TemperatureOnly.addLast (newMenu);
} else if (item.indexOf ("UNITCELL") >= 0) {
this.UnitcellOnly.addLast (newMenu);
} else if (item.indexOf ("FILEUNIT") >= 0) {
this.FileUnitOnly.addLast (newMenu);
} else if (item.indexOf ("FILEMOL") >= 0) {
this.FileMolOnly.addLast (newMenu);
}if (item.indexOf ("!FRAMES") >= 0) {
this.SingleModelOnly.addLast (newMenu);
} else if (item.indexOf ("FRAMES") >= 0) {
this.FramesOnly.addLast (newMenu);
}if (item.indexOf ("VIBRATION") >= 0) {
this.VibrationOnly.addLast (newMenu);
} else if (item.indexOf ("SYMMETRY") >= 0) {
this.SymmetryOnly.addLast (newMenu);
}if (item.indexOf ("SPECIAL") >= 0) this.Special.addLast (newMenu);
}, "~S,J.api.SC");
Clazz_overrideMethod (c$, "appGetMenuAsString", 
function (title) {
return ( new J.popup.MainPopupResourceBundle (this.strMenuStructure, null)).getMenuAsText (title);
}, "~S");
Clazz_overrideMethod (c$, "getScriptForCallback", 
function (source, id, script) {
var pt;
if (script === "" || id.endsWith ("Checkbox")) return script;
if (script.indexOf ("SELECT") == 0) {
return "select thisModel and (" + script.substring (6) + ")";
}if ((pt = id.lastIndexOf ("[")) >= 0) {
id = id.substring (pt + 1);
if ((pt = id.indexOf ("]")) >= 0) id = id.substring (0, pt);
id = id.$replace ('_', ' ');
if (script.indexOf ("[]") < 0) script = "[] " + script;
script = script.$replace ('_', ' ');
return JU.PT.rep (script, "[]", id);
} else if (script.indexOf ("?FILEROOT?") >= 0) {
script = JU.PT.rep (script, "FILEROOT?", this.modelSetRoot);
} else if (script.indexOf ("?FILE?") >= 0) {
script = JU.PT.rep (script, "FILE?", this.modelSetFileName);
} else if (script.indexOf ("?PdbId?") >= 0) {
script = JU.PT.rep (script, "PdbId?", "=xxxx");
}return script;
}, "J.api.SC,~S,~S");
Clazz_overrideMethod (c$, "appRestorePopupMenu", 
function () {
this.thisPopup = this.popupMenu;
if (JV.Viewer.isJSNoAWT || this.nFrankList < 2) return;
for (var i = this.nFrankList; --i > 0; ) {
var f = this.frankList[i];
this.helper.menuInsertSubMenu (f[0], f[1], (f[2]).intValue ());
}
this.nFrankList = 1;
});
Clazz_overrideMethod (c$, "appUpdateSpecialCheckBoxValue", 
function (item, what, TF) {
if (!this.updatingForShow && what.indexOf ("#CONFIG") >= 0) {
this.configurationSelected = what;
this.updateConfigurationComputedMenu ();
this.updateModelSetComputedMenu ();
}}, "J.api.SC,~S,~B");
Clazz_defineMethod (c$, "setFrankMenu", 
 function (id) {
if (this.currentFrankId != null && this.currentFrankId === id && this.nFrankList > 0) return;
if (this.frankPopup == null) this.frankPopup = this.helper.menuCreatePopup ("Frank", this.vwr.html5Applet);
this.thisPopup = this.frankPopup;
this.menuRemoveAll (this.frankPopup, 0);
this.menuCreateItem (this.frankPopup, this.getMenuText ("mainMenuText"), "MAIN", "");
this.currentFrankId = id;
this.nFrankList = 0;
this.frankList[this.nFrankList++] =  Clazz_newArray (-1, [null, null, null]);
if (id != null) for (var i = id.indexOf (".", 2) + 1; ; ) {
var iNew = id.indexOf (".", i);
if (iNew < 0) break;
var menu = this.htMenus.get (id.substring (i, iNew));
this.frankList[this.nFrankList++] =  Clazz_newArray (-1, [menu.getParent (), menu, Integer.$valueOf (JV.Viewer.isJSNoAWT ? 0 : this.menuGetListPosition (menu))]);
this.menuAddSubMenu (this.frankPopup, menu);
i = iNew + 1;
}
this.thisPopup = this.popupMenu;
}, "~S");
Clazz_defineMethod (c$, "checkBoolean", 
 function (key) {
return (this.modelSetInfo != null && this.modelSetInfo.get (key) === Boolean.TRUE);
}, "~S");
Clazz_defineMethod (c$, "getViewerData", 
 function () {
this.modelSetName = this.vwr.ms.modelSetName;
this.modelSetFileName = this.vwr.getModelSetFileName ();
var i = this.modelSetFileName.lastIndexOf (".");
this.isZapped = ("zapped".equals (this.modelSetName));
if (this.isZapped || "string".equals (this.modelSetFileName) || "String[]".equals (this.modelSetFileName)) this.modelSetFileName = "";
this.modelSetRoot = this.modelSetFileName.substring (0, i < 0 ? this.modelSetFileName.length : i);
if (this.modelSetRoot.length == 0) this.modelSetRoot = "Jmol";
this.modelIndex = this.vwr.am.cmi;
this.modelCount = this.vwr.ms.mc;
this.ac = this.vwr.ms.getAtomCountInModel (this.modelIndex);
this.modelSetInfo = this.vwr.getModelSetAuxiliaryInfo ();
this.modelInfo = this.vwr.ms.getModelAuxiliaryInfo (this.modelIndex);
if (this.modelInfo == null) this.modelInfo =  new java.util.Hashtable ();
this.isPDB = this.checkBoolean ("isPDB");
this.isMultiFrame = (this.modelCount > 1);
this.hasSymmetry = this.modelInfo.containsKey ("hasSymmetry");
this.isUnitCell = this.modelInfo.containsKey ("unitCellParams");
this.fileHasUnitCell = (this.isPDB && this.isUnitCell || this.checkBoolean ("fileHasUnitCell"));
this.isLastFrame = (this.modelIndex == this.modelCount - 1);
this.altlocs = this.vwr.ms.getAltLocListInModel (this.modelIndex);
this.isMultiConfiguration = (this.altlocs.length > 0);
this.isVibration = (this.vwr.modelHasVibrationVectors (this.modelIndex));
this.haveCharges = (this.vwr.ms.getPartialCharges () != null);
this.haveBFactors = (this.vwr.getBooleanProperty ("haveBFactors"));
this.cnmrPeaks = this.modelInfo.get ("jdxAtomSelect_13CNMR");
this.hnmrPeaks = this.modelInfo.get ("jdxAtomSelect_1HNMR");
});
Clazz_overrideMethod (c$, "appCheckSpecialMenu", 
function (item, subMenu, word) {
if ("modelSetMenu".equals (item)) {
this.nullModelSetName = word;
this.menuEnable (subMenu, false);
}}, "~S,J.api.SC,~S");
Clazz_overrideMethod (c$, "appUpdateForShow", 
function () {
if (this.updateMode == -1) return;
this.isTainted = true;
this.getViewerData ();
this.updateMode = 2;
this.updateSelectMenu ();
this.updateSpectraMenu ();
this.updateFRAMESbyModelComputedMenu ();
this.updateSceneComputedMenu ();
this.updateModelSetComputedMenu ();
this.updateAboutSubmenu ();
for (var i = this.Special.size (); --i >= 0; ) this.updateSpecialMenuItem (this.Special.get (i));

});
Clazz_defineMethod (c$, "updateFileMenu", 
 function () {
var menu = this.htMenus.get ("fileMenu");
if (menu == null) return;
var text = this.getMenuText ("writeFileTextVARIABLE");
menu = this.htMenus.get ("writeFileTextVARIABLE");
var ignore = (this.modelSetFileName.equals ("zapped") || this.modelSetFileName.equals (""));
if (ignore) {
this.menuSetLabel (menu, "");
this.menuEnable (menu, false);
} else {
this.menuSetLabel (menu, J.i18n.GT.o (J.i18n.GT.$ (text), this.modelSetFileName));
this.menuEnable (menu, true);
}});
Clazz_defineMethod (c$, "getMenuText", 
 function (key) {
var str = this.menuText.getProperty (key);
return (str == null ? key : str);
}, "~S");
Clazz_defineMethod (c$, "updateSelectMenu", 
 function () {
var menu = this.htMenus.get ("selectMenuText");
if (menu == null) return;
this.menuEnable (menu, this.ac != 0);
this.menuSetLabel (menu, this.gti ("selectMenuText", this.vwr.slm.getSelectionCount ()));
});
Clazz_defineMethod (c$, "updateElementsComputedMenu", 
 function (elementsPresentBitSet) {
var menu = this.htMenus.get ("elementsComputedMenu");
if (menu == null) return;
this.menuRemoveAll (menu, 0);
this.menuEnable (menu, false);
if (elementsPresentBitSet == null) return;
for (var i = elementsPresentBitSet.nextSetBit (0); i >= 0; i = elementsPresentBitSet.nextSetBit (i + 1)) {
var elementName = JU.Elements.elementNameFromNumber (i);
var elementSymbol = JU.Elements.elementSymbolFromNumber (i);
var entryName = elementSymbol + " - " + elementName;
this.menuCreateItem (menu, entryName, "SELECT " + elementName, null);
}
for (var i = 4; i < JU.Elements.altElementMax; ++i) {
var n = JU.Elements.elementNumberMax + i;
if (elementsPresentBitSet.get (n)) {
n = JU.Elements.altElementNumberFromIndex (i);
var elementName = JU.Elements.elementNameFromNumber (n);
var elementSymbol = JU.Elements.elementSymbolFromNumber (n);
var entryName = elementSymbol + " - " + elementName;
this.menuCreateItem (menu, entryName, "SELECT " + elementName, null);
}}
this.menuEnable (menu, true);
}, "JU.BS");
Clazz_defineMethod (c$, "updateSpectraMenu", 
 function () {
var menuh = this.htMenus.get ("hnmrMenu");
var menuc = this.htMenus.get ("cnmrMenu");
if (menuh != null) this.menuRemoveAll (menuh, 0);
if (menuc != null) this.menuRemoveAll (menuc, 0);
var menu = this.htMenus.get ("spectraMenu");
if (menu == null) return;
this.menuRemoveAll (menu, 0);
var isOK =  new Boolean (this.setSpectraMenu (menuh, this.hnmrPeaks) | this.setSpectraMenu (menuc, this.cnmrPeaks)).valueOf ();
if (isOK) {
if (menuh != null) this.menuAddSubMenu (menu, menuh);
if (menuc != null) this.menuAddSubMenu (menu, menuc);
}this.menuEnable (menu, isOK);
});
Clazz_defineMethod (c$, "setSpectraMenu", 
 function (menu, peaks) {
if (menu == null) return false;
this.menuEnable (menu, false);
var n = (peaks == null ? 0 : peaks.size ());
if (n == 0) return false;
for (var i = 0; i < n; i++) {
var peak = peaks.get (i);
var title = JU.PT.getQuotedAttribute (peak, "title");
var atoms = JU.PT.getQuotedAttribute (peak, "atoms");
if (atoms != null) this.menuCreateItem (menu, title, "select visible & (@" + JU.PT.rep (atoms, ",", " or @") + ")", "Focus" + i);
}
this.menuEnable (menu, true);
return true;
}, "J.api.SC,JU.Lst");
Clazz_defineMethod (c$, "updateHeteroComputedMenu", 
 function (htHetero) {
var menu = this.htMenus.get ("PDBheteroComputedMenu");
if (menu == null) return;
this.menuRemoveAll (menu, 0);
this.menuEnable (menu, false);
if (htHetero == null) return;
var n = 0;
for (var hetero, $hetero = htHetero.entrySet ().iterator (); $hetero.hasNext () && ((hetero = $hetero.next ()) || true);) {
var heteroCode = hetero.getKey ();
var heteroName = hetero.getValue ();
if (heteroName.length > 20) heteroName = heteroName.substring (0, 20) + "...";
var entryName = heteroCode + " - " + heteroName;
this.menuCreateItem (menu, entryName, "SELECT [" + heteroCode + "]", null);
n++;
}
this.menuEnable (menu, (n > 0));
}, "java.util.Map");
Clazz_defineMethod (c$, "updateSurfMoComputedMenu", 
 function (moData) {
var menu = this.htMenus.get ("surfMoComputedMenuText");
if (menu == null) return;
this.menuRemoveAll (menu, 0);
var mos = (moData == null ? null : (moData.get ("mos")));
var nOrb = (mos == null ? 0 : mos.size ());
var text = this.getMenuText ("surfMoComputedMenuText");
if (nOrb == 0) {
this.menuSetLabel (menu, J.i18n.GT.o (J.i18n.GT.$ (text), ""));
this.menuEnable (menu, false);
return;
}this.menuSetLabel (menu, J.i18n.GT.i (J.i18n.GT.$ (text), nOrb));
this.menuEnable (menu, true);
var subMenu = menu;
var nmod = (nOrb % 25);
if (nmod == 0) nmod = 25;
var pt = (nOrb > 25 ? 0 : -2147483648);
for (var i = nOrb; --i >= 0; ) {
if (pt >= 0 && (pt++ % nmod) == 0) {
if (pt == nmod + 1) nmod = 25;
var id = "mo" + pt + "Menu";
subMenu = this.menuNewSubMenu (Math.max (i + 2 - nmod, 1) + "..." + (i + 1), this.menuGetId (menu) + "." + id);
this.menuAddSubMenu (menu, subMenu);
this.htMenus.put (id, subMenu);
pt = 1;
}var mo = mos.get (i);
var entryName = "#" + (i + 1) + " " + (mo.containsKey ("type") ? mo.get ("type") + " " : "") + (mo.containsKey ("symmetry") ? mo.get ("symmetry") + " " : "") + (mo.containsKey ("occupancy") ? "(" + mo.get ("occupancy") + ") " : "") + (mo.containsKey ("energy") ? mo.get ("energy") : "");
var script = "mo " + (i + 1);
this.menuCreateItem (subMenu, entryName, script, null);
}
}, "java.util.Map");
Clazz_defineMethod (c$, "updateFileTypeDependentMenus", 
 function () {
for (var i = this.NotPDB.size (); --i >= 0; ) this.menuEnable (this.NotPDB.get (i), !this.isPDB);

for (var i = this.PDBOnly.size (); --i >= 0; ) this.menuEnable (this.PDBOnly.get (i), this.isPDB);

for (var i = this.UnitcellOnly.size (); --i >= 0; ) this.menuEnable (this.UnitcellOnly.get (i), this.isUnitCell);

for (var i = this.FileUnitOnly.size (); --i >= 0; ) this.menuEnable (this.FileUnitOnly.get (i), this.isUnitCell || this.fileHasUnitCell);

for (var i = this.FileMolOnly.size (); --i >= 0; ) this.menuEnable (this.FileMolOnly.get (i), this.isUnitCell || this.fileHasUnitCell);

for (var i = this.SingleModelOnly.size (); --i >= 0; ) this.menuEnable (this.SingleModelOnly.get (i), this.isLastFrame);

for (var i = this.FramesOnly.size (); --i >= 0; ) this.menuEnable (this.FramesOnly.get (i), this.isMultiFrame);

for (var i = this.VibrationOnly.size (); --i >= 0; ) this.menuEnable (this.VibrationOnly.get (i), this.isVibration);

for (var i = this.SymmetryOnly.size (); --i >= 0; ) this.menuEnable (this.SymmetryOnly.get (i), this.hasSymmetry && this.isUnitCell);

for (var i = this.ChargesOnly.size (); --i >= 0; ) this.menuEnable (this.ChargesOnly.get (i), this.haveCharges);

for (var i = this.TemperatureOnly.size (); --i >= 0; ) this.menuEnable (this.TemperatureOnly.get (i), this.haveBFactors);

this.updateSignedAppletItems ();
});
Clazz_defineMethod (c$, "updateSceneComputedMenu", 
 function () {
var menu = this.htMenus.get ("sceneComputedMenu");
if (menu == null) return;
this.menuRemoveAll (menu, 0);
this.menuEnable (menu, false);
var scenes = this.vwr.ms.getInfoM ("scenes");
if (scenes == null) return;
for (var i = 0; i < scenes.length; i++) this.menuCreateItem (menu, scenes[i], "restore scene " + JU.PT.esc (scenes[i]) + " 1.0", null);

this.menuEnable (menu, true);
});
Clazz_defineMethod (c$, "updatePDBComputedMenus", 
 function () {
var menu = this.htMenus.get ("PDBaaResiduesComputedMenu");
if (menu == null) return;
this.menuRemoveAll (menu, 0);
this.menuEnable (menu, false);
var menu1 = this.htMenus.get ("PDBnucleicResiduesComputedMenu");
if (menu1 == null) return;
this.menuRemoveAll (menu1, 0);
this.menuEnable (menu1, false);
var menu2 = this.htMenus.get ("PDBcarboResiduesComputedMenu");
if (menu2 == null) return;
this.menuRemoveAll (menu2, 0);
this.menuEnable (menu2, false);
if (this.modelSetInfo == null) return;
var n = (this.modelIndex < 0 ? 0 : this.modelIndex + 1);
var lists = (this.modelSetInfo.get ("group3Lists"));
this.group3List = (lists == null ? null : lists[n]);
this.group3Counts = (lists == null ? null : (this.modelSetInfo.get ("group3Counts"))[n]);
if (this.group3List == null) return;
var nItems = 0;
var groupList = JM.Group.standardGroupList;
for (var i = 1; i < 24; ++i) nItems += this.updateGroup3List (menu, groupList.substring (i * 6 - 4, i * 6 - 1).trim ());

nItems += this.augmentGroup3List (menu, "p>", true);
this.menuEnable (menu, (nItems > 0));
this.menuEnable (this.htMenus.get ("PDBproteinMenu"), (nItems > 0));
nItems = this.augmentGroup3List (menu1, "n>", false);
this.menuEnable (menu1, nItems > 0);
this.menuEnable (this.htMenus.get ("PDBnucleicMenu"), (nItems > 0));
var dssr = (nItems > 0 && this.modelIndex >= 0 ? this.vwr.ms.getInfo (this.modelIndex, "dssr") : null);
if (dssr != null) this.setSecStrucMenu (this.htMenus.get ("aaStructureMenu"), dssr);
nItems = this.augmentGroup3List (menu2, "c>", false);
this.menuEnable (menu2, nItems > 0);
this.menuEnable (this.htMenus.get ("PDBcarboMenu"), (nItems > 0));
});
Clazz_defineMethod (c$, "setSecStrucMenu", 
 function (menu, dssr) {
var counts = dssr.get ("counts");
if (counts == null) return false;
var keys =  new Array (counts.size ());
counts.keySet ().toArray (keys);
java.util.Arrays.sort (keys);
if (keys.length == 0) return false;
menu.removeAll ();
for (var i = 0; i < keys.length; i++) this.menuCreateItem (menu, keys[i] + " (" + counts.get (keys[i]) + ")", "select modelIndex=" + this.modelIndex + " && within('dssr', '" + keys[i] + "');", null);

return true;
}, "J.api.SC,java.util.Map");
Clazz_defineMethod (c$, "updateGroup3List", 
 function (menu, name) {
var nItems = 0;
var n = this.group3Counts[Clazz_doubleToInt (this.group3List.indexOf (name) / 6)];
name = name.trim ();
var script = null;
if (n > 0) {
script = "SELECT " + name;
name += "  (" + n + ")";
nItems++;
}var item = this.menuCreateItem (menu, name, script, this.menuGetId (menu) + "." + name);
if (n == 0) this.menuEnable (item, false);
return nItems;
}, "J.api.SC,~S");
Clazz_defineMethod (c$, "augmentGroup3List", 
 function (menu, type, addSeparator) {
var pt = 138;
var nItems = 0;
while (true) {
pt = this.group3List.indexOf (type, pt);
if (pt < 0) break;
if (nItems++ == 0 && addSeparator) this.menuAddSeparator (menu);
var n = this.group3Counts[Clazz_doubleToInt (pt / 6)];
var heteroCode = this.group3List.substring (pt + 2, pt + 5);
var name = heteroCode + "  (" + n + ")";
this.menuCreateItem (menu, name, "SELECT [" + heteroCode + "]", this.menuGetId (menu) + "." + name);
pt++;
}
return nItems;
}, "J.api.SC,~S,~B");
Clazz_defineMethod (c$, "updateSYMMETRYComputedMenus", 
 function () {
this.updateSYMMETRYSelectComputedMenu ();
this.updateSYMMETRYShowComputedMenu ();
});
Clazz_defineMethod (c$, "updateSYMMETRYShowComputedMenu", 
 function () {
var menu = this.htMenus.get ("SYMMETRYShowComputedMenu");
if (menu == null) return;
this.menuRemoveAll (menu, 0);
this.menuEnable (menu, false);
if (!this.hasSymmetry || this.modelIndex < 0) return;
var info = this.vwr.getProperty ("DATA_API", "spaceGroupInfo", null);
if (info == null) return;
var infolist = info.get ("operations");
if (infolist == null) return;
var name = info.get ("spaceGroupName");
this.menuSetLabel (menu, name == null ? J.i18n.GT.$ ("Space Group") : name);
var subMenu = menu;
var pt = (infolist.length > 25 ? 0 : -2147483648);
for (var i = 0; i < infolist.length; i++) {
if (pt >= 0 && (pt++ % 25) == 0) {
var id = "drawsymop" + pt + "Menu";
subMenu = this.menuNewSubMenu ((i + 1) + "..." + Math.min (i + 25, infolist.length), this.menuGetId (menu) + "." + id);
this.menuAddSubMenu (menu, subMenu);
this.htMenus.put (id, subMenu);
pt = 1;
}if (i == 0) this.menuEnable (this.menuCreateItem (subMenu, J.i18n.GT.$ ("none"), "draw sym_* delete", null), true);
var sym = infolist[i][1];
if (sym.indexOf ("x1") < 0) sym = infolist[i][0];
var entryName = (i + 1) + " " + infolist[i][2] + " (" + sym + ")";
this.menuEnable (this.menuCreateItem (subMenu, entryName, "draw SYMOP " + (i + 1), null), true);
}
this.menuEnable (menu, true);
});
Clazz_defineMethod (c$, "updateSYMMETRYSelectComputedMenu", 
 function () {
var menu = this.htMenus.get ("SYMMETRYSelectComputedMenu");
if (menu == null) return;
this.menuRemoveAll (menu, 0);
this.menuEnable (menu, false);
if (!this.hasSymmetry || this.modelIndex < 0) return;
var list = this.modelInfo.get ("symmetryOperations");
if (list == null) return;
var cellRange = this.modelInfo.get ("unitCellRange");
var haveUnitCellRange = (cellRange != null);
var subMenu = menu;
var nmod = 25;
var pt = (list.length > 25 ? 0 : -2147483648);
for (var i = 0; i < list.length; i++) {
if (pt >= 0 && (pt++ % nmod) == 0) {
var id = "symop" + pt + "Menu";
subMenu = this.menuNewSubMenu ((i + 1) + "..." + Math.min (i + 25, list.length), this.menuGetId (menu) + "." + id);
this.menuAddSubMenu (menu, subMenu);
this.htMenus.put (id, subMenu);
pt = 1;
}var entryName = "symop=" + (i + 1) + " # " + list[i];
this.menuEnable (this.menuCreateItem (subMenu, entryName, "SELECT symop=" + (i + 1), null), haveUnitCellRange);
}
this.menuEnable (menu, true);
});
Clazz_defineMethod (c$, "updateFRAMESbyModelComputedMenu", 
 function () {
var menu = this.htMenus.get ("FRAMESbyModelComputedMenu");
if (menu == null) return;
this.menuEnable (menu, (this.modelCount > 0));
this.menuSetLabel (menu, (this.modelIndex < 0 ? this.gti ("allModelsText", this.modelCount) : this.gto ("modelMenuText", (this.modelIndex + 1) + "/" + this.modelCount)));
this.menuRemoveAll (menu, 0);
if (this.modelCount < 1) return;
if (this.modelCount > 1) this.menuCreateCheckboxItem (menu, J.i18n.GT.$ ("All"), "frame 0 ##", null, (this.modelIndex < 0), false);
var subMenu = menu;
var pt = (this.modelCount > 25 ? 0 : -2147483648);
for (var i = 0; i < this.modelCount; i++) {
if (pt >= 0 && (pt++ % 25) == 0) {
var id = "model" + pt + "Menu";
subMenu = this.menuNewSubMenu ((i + 1) + "..." + Math.min (i + 25, this.modelCount), this.menuGetId (menu) + "." + id);
this.menuAddSubMenu (menu, subMenu);
this.htMenus.put (id, subMenu);
pt = 1;
}var script = "" + this.vwr.getModelNumberDotted (i);
var entryName = this.vwr.getModelName (i);
var spectrumTypes = this.vwr.ms.getInfo (i, "spectrumTypes");
if (spectrumTypes != null && entryName.startsWith (spectrumTypes)) spectrumTypes = null;
if (!entryName.equals (script)) {
var ipt = entryName.indexOf (";PATH");
if (ipt >= 0) entryName = entryName.substring (0, ipt);
if (entryName.indexOf ("Model[") == 0 && (ipt = entryName.indexOf ("]:")) >= 0) entryName = entryName.substring (ipt + 2);
entryName = script + ": " + entryName;
}if (entryName.length > 60) entryName = entryName.substring (0, 55) + "...";
if (spectrumTypes != null) entryName += " (" + spectrumTypes + ")";
this.menuCreateCheckboxItem (subMenu, entryName, "model " + script + " ##", null, (this.modelIndex == i), false);
}
});
Clazz_defineMethod (c$, "updateConfigurationComputedMenu", 
 function () {
var menu = this.htMenus.get ("configurationComputedMenu");
if (menu == null) return;
this.menuEnable (menu, this.isMultiConfiguration);
if (!this.isMultiConfiguration) return;
var nAltLocs = this.altlocs.length;
this.menuSetLabel (menu, this.gti ("configurationMenuText", nAltLocs));
this.menuRemoveAll (menu, 0);
var script = "hide none ##CONFIG";
this.menuCreateCheckboxItem (menu, J.i18n.GT.$ ("All"), script, null, (this.updateMode == 1 && this.configurationSelected.equals (script)), false);
for (var i = 0; i < nAltLocs; i++) {
script = "configuration " + (i + 1) + "; hide thisModel and not selected ##CONFIG";
var entryName = "" + (i + 1) + " -- \"" + this.altlocs.charAt (i) + "\"";
this.menuCreateCheckboxItem (menu, entryName, script, null, (this.updateMode == 1 && this.configurationSelected.equals (script)), false);
}
});
Clazz_defineMethod (c$, "updateModelSetComputedMenu", 
 function () {
var menu = this.htMenus.get ("modelSetMenu");
if (menu == null) return;
this.menuRemoveAll (menu, 0);
this.menuSetLabel (menu, this.nullModelSetName);
this.menuEnable (menu, false);
for (var i = this.noZapped.length; --i >= 0; ) this.menuEnable (this.htMenus.get (this.noZapped[i]), !this.isZapped);

if (this.modelSetName == null || this.isZapped) return;
if (this.isMultiFrame) {
this.modelSetName = this.gti ("modelSetCollectionText", this.modelCount);
if (this.modelSetName.length > this.titleWidthMax) this.modelSetName = this.modelSetName.substring (0, this.titleWidthMax) + "...";
} else if (this.vwr.getBooleanProperty ("hideNameInPopup")) {
this.modelSetName = this.getMenuText ("hiddenModelSetText");
} else if (this.modelSetName.length > this.titleWidthMax) {
this.modelSetName = this.modelSetName.substring (0, this.titleWidthMax) + "...";
}this.menuSetLabel (menu, this.modelSetName);
this.menuEnable (menu, true);
this.menuEnable (this.htMenus.get ("computationMenu"), this.ac <= 100);
this.addMenuItem (menu, this.gti ("atomsText", this.ac));
this.addMenuItem (menu, this.gti ("bondsText", this.vwr.ms.getBondCountInModel (this.modelIndex)));
if (this.isPDB) {
this.menuAddSeparator (menu);
this.addMenuItem (menu, this.gti ("groupsText", this.vwr.ms.getGroupCountInModel (this.modelIndex)));
this.addMenuItem (menu, this.gti ("chainsText", this.vwr.ms.getChainCountInModelWater (this.modelIndex, false)));
this.addMenuItem (menu, this.gti ("polymersText", this.vwr.ms.getBioPolymerCountInModel (this.modelIndex)));
var submenu = this.htMenus.get ("BiomoleculesMenu");
if (submenu == null) {
submenu = this.menuNewSubMenu (J.i18n.GT.$ (this.getMenuText ("biomoleculesMenuText")), this.menuGetId (menu) + ".biomolecules");
this.menuAddSubMenu (menu, submenu);
}this.menuRemoveAll (submenu, 0);
this.menuEnable (submenu, false);
var biomolecules;
if (this.modelIndex >= 0 && (biomolecules = this.vwr.ms.getInfo (this.modelIndex, "biomolecules")) != null) {
this.menuEnable (submenu, true);
var nBiomolecules = biomolecules.size ();
for (var i = 0; i < nBiomolecules; i++) {
var script = (this.isMultiFrame ? "" : "save orientation;load \"\" FILTER \"biomolecule " + (i + 1) + "\";restore orientation;");
var nAtoms = (biomolecules.get (i).get ("atomCount")).intValue ();
var entryName = this.gto (this.isMultiFrame ? "biomoleculeText" : "loadBiomoleculeText",  Clazz_newArray (-1, [Integer.$valueOf (i + 1), Integer.$valueOf (nAtoms)]));
this.menuCreateItem (submenu, entryName, script, null);
}
}}if (this.isApplet && !this.vwr.getBooleanProperty ("hideNameInPopup")) {
this.menuAddSeparator (menu);
this.menuCreateItem (menu, this.gto ("viewMenuText", this.modelSetFileName), "show url", null);
}});
Clazz_defineMethod (c$, "gti", 
 function (s, n) {
return J.i18n.GT.i (J.i18n.GT.$ (this.getMenuText (s)), n);
}, "~S,~N");
Clazz_defineMethod (c$, "gto", 
 function (s, o) {
return J.i18n.GT.o (J.i18n.GT.$ (this.getMenuText (s)), o);
}, "~S,~O");
Clazz_defineMethod (c$, "updateAboutSubmenu", 
 function () {
if (this.isApplet) this.setText ("APPLETid", this.vwr.appletName);
{
}});
Clazz_defineMethod (c$, "updateLanguageSubmenu", 
 function () {
var menu = this.htMenus.get ("languageComputedMenu");
if (menu == null) return;
this.menuRemoveAll (menu, 0);
var language = J.i18n.GT.getLanguage ();
var id = this.menuGetId (menu);
var languages = J.i18n.GT.getLanguageList (null);
for (var i = 0, p = 0; i < languages.length; i++) {
if (language.equals (languages[i].code)) languages[i].display = true;
if (languages[i].display) {
var code = languages[i].code;
var name = languages[i].language;
var nativeName = languages[i].nativeLanguage;
var menuLabel = code + " - " + J.i18n.GT.$ (name);
if ((nativeName != null) && (!nativeName.equals (J.i18n.GT.$ (name)))) {
menuLabel += " - " + nativeName;
}if (p++ > 0 && (p % 4 == 1)) this.menuAddSeparator (menu);
this.menuCreateCheckboxItem (menu, menuLabel, "language = \"" + code + "\" ##" + name, id + "." + code, language.equals (code), false);
}}
});
Clazz_defineMethod (c$, "updateSpecialMenuItem", 
 function (m) {
m.setText (this.getSpecialLabel (m.getName (), m.getText ()));
}, "J.api.SC");
Clazz_defineMethod (c$, "getSpecialLabel", 
function (name, text) {
var pt = text.indexOf (" (");
if (pt < 0) pt = text.length;
var info = null;
if (name.indexOf ("captureLooping") >= 0) info = (this.vwr.am.animationReplayMode == 1073742070 ? "ONCE" : "LOOP");
 else if (name.indexOf ("captureFps") >= 0) info = "" + this.vwr.getInt (553648132);
 else if (name.indexOf ("captureMenu") >= 0) info = (this.vwr.captureParams == null ? J.i18n.GT.$ ("not capturing") : this.vwr.fm.getFilePath (this.vwr.captureParams.get ("captureFileName"), false, true) + " " + this.vwr.captureParams.get ("captureCount"));
return (info == null ? text : text.substring (0, pt) + " (" + info + ")");
}, "~S,~S");
Clazz_defineStatics (c$,
"UPDATE_NEVER", -1,
"UPDATE_ALL", 0,
"UPDATE_CONFIG", 1,
"UPDATE_SHOW", 2,
"itemMax", 25,
"MENUITEM_HEIGHT", 20);
});
Clazz_declarePackage ("J.popup");
Clazz_load (["J.popup.PopupResource"], "J.popup.MainPopupResourceBundle", ["JU.PT", "J.i18n.GT", "JV.JC", "$.Viewer"], function () {
c$ = Clazz_declareType (J.popup, "MainPopupResourceBundle", J.popup.PopupResource);
Clazz_overrideMethod (c$, "getMenuName", 
function () {
return "popupMenu";
});
Clazz_overrideMethod (c$, "buildStructure", 
function (menuStructure) {
this.addItems (J.popup.MainPopupResourceBundle.menuContents);
this.addItems (J.popup.MainPopupResourceBundle.structureContents);
if (menuStructure != null) this.setStructure (menuStructure,  new J.i18n.GT ());
}, "~S");
c$.Box = Clazz_defineMethod (c$, "Box", 
 function (cmd) {
return "if (showBoundBox or showUnitcell) {" + cmd + "} else {boundbox on;" + cmd + ";boundbox off}";
}, "~S");
Clazz_overrideMethod (c$, "getWordContents", 
function () {
var wasTranslating = J.i18n.GT.setDoTranslate (true);
var vdw = J.i18n.GT.$ ("{0}% van der Waals");
var exm = J.i18n.GT.$ ("Export {0} 3D model");
var exi = J.i18n.GT.$ ("Export {0} image");
var rld = J.i18n.GT.$ ("Reload {0}");
var scl = J.i18n.GT.$ ("Scale {0}");
var ang = J.i18n.GT.$ ("{0} \u00C5");
var pxl = J.i18n.GT.$ ("{0} px");
var words =  Clazz_newArray (-1, ["cnmrMenu", J.i18n.GT.$ ("13C-NMR"), "hnmrMenu", J.i18n.GT.$ ("1H-NMR"), "aboutMenu", J.i18n.GT.$ ("About..."), "negativeCharge", J.i18n.GT.$ ("Acidic Residues (-)"), "allModelsText", J.i18n.GT.$ ("All {0} models"), "allHetero", J.i18n.GT.$ ("All PDB \"HETATM\""), "Solvent", J.i18n.GT.$ ("All Solvent"), "Water", J.i18n.GT.$ ("All Water"), "selectAll", J.i18n.GT.$ ("All"), "allProtein", null, "allNucleic", null, "allCarbo", null, "altloc#PDB", J.i18n.GT.$ ("Alternative Location"), "amino#PDB", J.i18n.GT.$ ("Amino Acid"), "byAngstromMenu", J.i18n.GT.$ ("Angstrom Width"), "animModeMenu", J.i18n.GT.$ ("Animation Mode"), "FRAMESanimateMenu", J.i18n.GT.$ ("Animation"), "atPairs", J.i18n.GT.$ ("AT pairs"), "atomMenu", J.i18n.GT.$ ("Atoms"), "[color_atoms]Menu", null, "atomsText", J.i18n.GT.$ ("atoms: {0}"), "auPairs", J.i18n.GT.$ ("AU pairs"), "[color_axes]Menu", J.i18n.GT.$ ("Axes"), "showAxesCB", null, "[set_axes]Menu", null, "axisA", J.i18n.GT.$ ("Axis a"), "axisB", J.i18n.GT.$ ("Axis b"), "axisC", J.i18n.GT.$ ("Axis c"), "axisX", J.i18n.GT.$ ("Axis x"), "axisY", J.i18n.GT.$ ("Axis y"), "axisZ", J.i18n.GT.$ ("Axis z"), "back", J.i18n.GT.$ ("Back"), "proteinBackbone", J.i18n.GT.$ ("Backbone"), "nucleicBackbone", null, "backbone", null, "[color_backbone]Menu", null, "[color_background]Menu", J.i18n.GT.$ ("Background"), "renderBallAndStick", J.i18n.GT.$ ("Ball and Stick"), "nucleicBases", J.i18n.GT.$ ("Bases"), "positiveCharge", J.i18n.GT.$ ("Basic Residues (+)"), "best", J.i18n.GT.$ ("Best"), "biomoleculeText", J.i18n.GT.$ ("biomolecule {0} ({1} atoms)"), "biomoleculesMenuText", J.i18n.GT.$ ("Biomolecules"), "black", J.i18n.GT.$ ("Black"), "blue", J.i18n.GT.$ ("Blue"), "bondMenu", J.i18n.GT.$ ("Bonds"), "[color_bonds]Menu", null, "bondsText", J.i18n.GT.$ ("bonds: {0}"), "bottom", J.i18n.GT.$ ("Bottom"), "[color_boundbox]Menu", J.i18n.GT.$ ("Boundbox"), "[set_boundbox]Menu", null, "showBoundBoxCB", null, "PDBheteroComputedMenu", J.i18n.GT.$ ("By HETATM"), "PDBaaResiduesComputedMenu", J.i18n.GT.$ ("By Residue Name"), "PDBnucleicResiduesComputedMenu", null, "PDBcarboResiduesComputedMenu", null, "schemeMenu", J.i18n.GT.$ ("By Scheme"), "[color_]schemeMenu", null, "hbondCalc", J.i18n.GT.$ ("Calculate"), "SIGNEDJAVAcaptureRock", J.i18n.GT.$ ("Capture rock"), "SIGNEDJAVAcaptureSpin", J.i18n.GT.$ ("Capture spin"), "SIGNEDJAVAcaptureMenuSPECIAL", J.i18n.GT.$ ("Capture"), "PDBcarboMenu", J.i18n.GT.$ ("Carbohydrate"), "cartoonRockets", J.i18n.GT.$ ("Cartoon Rockets"), "PDBrenderCartoonsOnly", J.i18n.GT.$ ("Cartoon"), "cartoon", null, "[color_cartoon]sMenu", null, "pickCenter", J.i18n.GT.$ ("Center"), "labelCentered", J.i18n.GT.$ ("Centered"), "chain#PDB", J.i18n.GT.$ ("Chain"), "chainsText", J.i18n.GT.$ ("chains: {0}"), "colorChargeMenu", J.i18n.GT.$ ("Charge"), "measureAngle", J.i18n.GT.$ ("Click for angle measurement"), "measureDistance", J.i18n.GT.$ ("Click for distance measurement"), "measureTorsion", J.i18n.GT.$ ("Click for torsion (dihedral) measurement"), "PDBmeasureSequence", J.i18n.GT.$ ("Click two atoms to display a sequence in the console"), "modelSetCollectionText", J.i18n.GT.$ ("Collection of {0} models"), "colorMenu", J.i18n.GT.$ ("Color"), "computationMenu", J.i18n.GT.$ ("Computation"), "configurationMenuText", J.i18n.GT.$ ("Configurations ({0})"), "configurationComputedMenu", J.i18n.GT.$ ("Configurations"), "showConsole", J.i18n.GT.$ ("Console"), "renderCpkSpacefill", J.i18n.GT.$ ("CPK Spacefill"), "stereoCrossEyed", J.i18n.GT.$ ("Cross-eyed viewing"), "showState", J.i18n.GT.$ ("Current state"), "cyan", J.i18n.GT.$ ("Cyan"), "darkgray", J.i18n.GT.$ ("Dark Gray"), "measureDelete", J.i18n.GT.$ ("Delete measurements"), "SIGNEDJAVAcaptureOff", J.i18n.GT.$ ("Disable capturing"), "hideNotSelectedCB", J.i18n.GT.$ ("Display Selected Only"), "distanceAngstroms", J.i18n.GT.$ ("Distance units Angstroms"), "distanceNanometers", J.i18n.GT.$ ("Distance units nanometers"), "distancePicometers", J.i18n.GT.$ ("Distance units picometers"), "distanceHz", J.i18n.GT.$ ("Distance units hz (NMR J-coupling)"), "ssbondMenu", J.i18n.GT.$ ("Disulfide Bonds"), "[color_ssbonds]Menu", null, "DNA", J.i18n.GT.$ ("DNA"), "surfDots", J.i18n.GT.$ ("Dot Surface"), "dotted", J.i18n.GT.$ ("Dotted"), "measureOff", J.i18n.GT.$ ("Double-Click begins and ends all measurements"), "cpk", J.i18n.GT.$ ("Element (CPK)"), "elementsComputedMenu", J.i18n.GT.$ ("Element"), "SIGNEDJAVAcaptureEnd", J.i18n.GT.$ ("End capturing"), "exportMenu", J.i18n.GT.$ ("Export"), "extractMOL", J.i18n.GT.$ ("Extract MOL data"), "showFile", J.i18n.GT.$ ("File Contents"), "showFileHeader", J.i18n.GT.$ ("File Header"), "fileMenu", J.i18n.GT.$ ("File"), "formalcharge", J.i18n.GT.$ ("Formal Charge"), "front", J.i18n.GT.$ ("Front"), "gcPairs", J.i18n.GT.$ ("GC pairs"), "gold", J.i18n.GT.$ ("Gold"), "gray", J.i18n.GT.$ ("Gray"), "green", J.i18n.GT.$ ("Green"), "group#PDB", J.i18n.GT.$ ("Group"), "groupsText", J.i18n.GT.$ ("groups: {0}"), "PDBheteroMenu", J.i18n.GT.$ ("Hetero"), "off#axes", J.i18n.GT.$ ("Hide"), "showHistory", J.i18n.GT.$ ("History"), "hbondMenu", J.i18n.GT.$ ("Hydrogen Bonds"), "[color_hbonds]Menu", null, "pickIdent", J.i18n.GT.$ ("Identity"), "indigo", J.i18n.GT.$ ("Indigo"), "none", J.i18n.GT.$ ("Inherit"), "invertSelection", J.i18n.GT.$ ("Invert Selection"), "showIsosurface", J.i18n.GT.$ ("Isosurface JVXL data"), "help", J.i18n.GT.$ ("Jmol Script Commands"), "pickLabel", J.i18n.GT.$ ("Label"), "labelMenu", J.i18n.GT.$ ("Labels"), "[color_labels]Menu", null, "languageComputedMenu", J.i18n.GT.$ ("Language"), "left", J.i18n.GT.$ ("Left"), "Ligand", J.i18n.GT.$ ("Ligand"), "lightgray", J.i18n.GT.$ ("Light Gray"), "measureList", J.i18n.GT.$ ("List measurements"), "loadBiomoleculeText", J.i18n.GT.$ ("load biomolecule {0} ({1} atoms)"), "SIGNEDloadFileUnitCell", J.i18n.GT.$ ("Load full unit cell"), "loadMenu", J.i18n.GT.$ ("Load"), "loop", J.i18n.GT.$ ("Loop"), "labelLowerLeft", J.i18n.GT.$ ("Lower Left"), "labelLowerRight", J.i18n.GT.$ ("Lower Right"), "mainMenuText", J.i18n.GT.$ ("Main Menu"), "opaque", J.i18n.GT.$ ("Make Opaque"), "surfOpaque", null, "translucent", J.i18n.GT.$ ("Make Translucent"), "surfTranslucent", null, "maroon", J.i18n.GT.$ ("Maroon"), "measureMenu", J.i18n.GT.$ ("Measurements"), "showMeasure", null, "modelMenuText", J.i18n.GT.$ ("model {0}"), "hiddenModelSetText", J.i18n.GT.$ ("Model information"), "modelkit", J.i18n.GT.$ ("Model kit"), "showModel", J.i18n.GT.$ ("Model"), "FRAMESbyModelComputedMenu", J.i18n.GT.$ ("Model/Frame"), "modelKitMode", J.i18n.GT.$ ("modelKitMode"), "surf2MEP", J.i18n.GT.$ ("Molecular Electrostatic Potential (range -0.1 0.1)"), "surfMEP", J.i18n.GT.$ ("Molecular Electrostatic Potential (range ALL)"), "showMo", J.i18n.GT.$ ("Molecular orbital JVXL data"), "surfMoComputedMenuText", J.i18n.GT.$ ("Molecular Orbitals ({0})"), "surfMolecular", J.i18n.GT.$ ("Molecular Surface"), "molecule", J.i18n.GT.$ ("Molecule"), "monomer#PDB", J.i18n.GT.$ ("Monomer"), "mouse", J.i18n.GT.$ ("Mouse Manual"), "nextframe", J.i18n.GT.$ ("Next Frame"), "modelSetMenu", J.i18n.GT.$ ("No atoms loaded"), "exceptWater", J.i18n.GT.$ ("Nonaqueous HETATM") + " (hetero and not water)", "nonWaterSolvent", J.i18n.GT.$ ("Nonaqueous Solvent") + " (solvent and not water)", "PDBnoneOfTheAbove", J.i18n.GT.$ ("None of the above"), "selectNone", J.i18n.GT.$ ("None"), "stereoNone", null, "labelNone", null, "nonpolar", J.i18n.GT.$ ("Nonpolar Residues"), "PDBnucleicMenu", J.i18n.GT.$ ("Nucleic"), "atomNone", J.i18n.GT.$ ("Off"), "bondNone", null, "hbondNone", null, "ssbondNone", null, "structureNone", null, "vibrationOff", null, "vectorOff", null, "spinOff", null, "pickOff", null, "surfOff", null, "olive", J.i18n.GT.$ ("Olive"), "bondWireframe", J.i18n.GT.$ ("On"), "hbondWireframe", null, "ssbondWireframe", null, "vibrationOn", null, "vectorOn", null, "spinOn", null, "on", null, "SIGNEDloadPdb", J.i18n.GT.$ ("Open from PDB"), "SIGNEDloadFile", J.i18n.GT.$ ("Open local file"), "SIGNEDloadScript", J.i18n.GT.$ ("Open script"), "SIGNEDloadUrl", J.i18n.GT.$ ("Open URL"), "minimize", J.i18n.GT.$ ("Optimize structure"), "orange", J.i18n.GT.$ ("Orange"), "orchid", J.i18n.GT.$ ("Orchid"), "showOrient", J.i18n.GT.$ ("Orientation"), "palindrome", J.i18n.GT.$ ("Palindrome"), "partialcharge", J.i18n.GT.$ ("Partial Charge"), "pause", J.i18n.GT.$ ("Pause"), "perspectiveDepthCB", J.i18n.GT.$ ("Perspective Depth"), "byPixelMenu", J.i18n.GT.$ ("Pixel Width"), "onceThrough", J.i18n.GT.$ ("Play Once"), "play", J.i18n.GT.$ ("Play"), "polar", J.i18n.GT.$ ("Polar Residues"), "polymersText", J.i18n.GT.$ ("polymers: {0}"), "labelPositionMenu", J.i18n.GT.$ ("Position Label on Atom"), "prevframe", J.i18n.GT.$ ("Previous Frame"), "PDBproteinMenu", J.i18n.GT.$ ("Protein"), "colorrasmolCB", J.i18n.GT.$ ("RasMol Colors"), "red", J.i18n.GT.$ ("Red"), "stereoRedBlue", J.i18n.GT.$ ("Red+Blue glasses"), "stereoRedCyan", J.i18n.GT.$ ("Red+Cyan glasses"), "stereoRedGreen", J.i18n.GT.$ ("Red+Green glasses"), "SIGNEDJAVAcaptureOn", J.i18n.GT.$ ("Re-enable capturing"), "FILEUNITninePoly", J.i18n.GT.$ ("Reload + Polyhedra"), "reload", J.i18n.GT.$ ("Reload"), "restart", J.i18n.GT.$ ("Restart"), "resume", J.i18n.GT.$ ("Resume"), "playrev", J.i18n.GT.$ ("Reverse"), "rewind", J.i18n.GT.$ ("Rewind"), "ribbons", J.i18n.GT.$ ("Ribbons"), "[color_ribbon]sMenu", null, "right", J.i18n.GT.$ ("Right"), "RNA", J.i18n.GT.$ ("RNA"), "rockets", J.i18n.GT.$ ("Rockets"), "[color_rockets]Menu", null, "salmon", J.i18n.GT.$ ("Salmon"), "writeFileTextVARIABLE", J.i18n.GT.$ ("Save a copy of {0}"), "SIGNEDwriteJmol", J.i18n.GT.$ ("Save as PNG/JMOL (image+zip)"), "SIGNEDwriteIsosurface", J.i18n.GT.$ ("Save JVXL isosurface"), "writeHistory", J.i18n.GT.$ ("Save script with history"), "writeState", J.i18n.GT.$ ("Save script with state"), "saveMenu", J.i18n.GT.$ ("Save"), "sceneComputedMenu", J.i18n.GT.$ ("Scenes"), "renderSchemeMenu", J.i18n.GT.$ ("Scheme"), "aaStructureMenu", J.i18n.GT.$ ("Secondary Structure"), "structure#PDB", null, "selectMenuText", J.i18n.GT.$ ("Select ({0})"), "pickAtom", J.i18n.GT.$ ("Select atom"), "PDBpickChain", J.i18n.GT.$ ("Select chain"), "pickElement", J.i18n.GT.$ ("Select element"), "PDBpickGroup", J.i18n.GT.$ ("Select group"), "pickMolecule", J.i18n.GT.$ ("Select molecule"), "SYMMETRYpickSite", J.i18n.GT.$ ("Select site"), "showSelectionsCB", J.i18n.GT.$ ("Selection Halos"), "SIGNEDJAVAcaptureFpsSPECIAL", J.i18n.GT.$ ("Set capture replay rate"), "[set_spin_FPS]Menu", J.i18n.GT.$ ("Set FPS"), "FRAMESanimFpsMenu", null, "PDBhbondBackbone", J.i18n.GT.$ ("Set H-Bonds Backbone"), "PDBhbondSidechain", J.i18n.GT.$ ("Set H-Bonds Side Chain"), "pickingMenu", J.i18n.GT.$ ("Set picking"), "PDBssbondBackbone", J.i18n.GT.$ ("Set SS-Bonds Backbone"), "PDBssbondSidechain", J.i18n.GT.$ ("Set SS-Bonds Side Chain"), "[set_spin_X]Menu", J.i18n.GT.$ ("Set X Rate"), "[set_spin_Y]Menu", J.i18n.GT.$ ("Set Y Rate"), "[set_spin_Z]Menu", J.i18n.GT.$ ("Set Z Rate"), "shapely#PDB", J.i18n.GT.$ ("Shapely"), "showHydrogensCB", J.i18n.GT.$ ("Show Hydrogens"), "showMeasurementsCB", J.i18n.GT.$ ("Show Measurements"), "SYMMETRYpickSymmetry", J.i18n.GT.$ ("Show symmetry operation"), "showMenu", J.i18n.GT.$ ("Show"), "proteinSideChains", J.i18n.GT.$ ("Side Chains"), "slateblue", J.i18n.GT.$ ("Slate Blue"), "SYMMETRYShowComputedMenu", J.i18n.GT.$ ("Space Group"), "showSpacegroup", null, "spectraMenu", J.i18n.GT.$ ("Spectra"), "spinMenu", J.i18n.GT.$ ("Spin"), "pickSpin", null, "SIGNEDJAVAcaptureBegin", J.i18n.GT.$ ("Start capturing"), "stereoMenu", J.i18n.GT.$ ("Stereographic"), "renderSticks", J.i18n.GT.$ ("Sticks"), "stop", J.i18n.GT.$ ("Stop"), "strands", J.i18n.GT.$ ("Strands"), "[color_strands]Menu", null, "PDBstructureMenu", J.i18n.GT.$ ("Structures"), "colorPDBStructuresMenu", null, "renderMenu", J.i18n.GT.$ ("Style"), "[color_isosurface]Menu", J.i18n.GT.$ ("Surfaces"), "surfaceMenu", null, "SYMMETRYSelectComputedMenu", J.i18n.GT.$ ("Symmetry"), "SYMMETRYshowSymmetry", null, "FILEUNITMenu", null, "systemMenu", J.i18n.GT.$ ("System"), "relativeTemperature#BFACTORS", J.i18n.GT.$ ("Temperature (Relative)"), "fixedTemperature#BFACTORS", J.i18n.GT.$ ("Temperature (Fixed)"), "SIGNEDJAVAcaptureLoopingSPECIAL", J.i18n.GT.$ ("Toggle capture looping"), "top", JU.PT.split (J.i18n.GT.$ ("Top[as in \"view from the top, from above\" - (translators: remove this bracketed part]"), "[")[0], "PDBrenderTraceOnly", J.i18n.GT.$ ("Trace"), "trace", null, "[color_trace]Menu", null, "translations", J.i18n.GT.$ ("Translations"), "noCharge", J.i18n.GT.$ ("Uncharged Residues"), "[color_UNITCELL]Menu", J.i18n.GT.$ ("Unit cell"), "UNITCELLshow", null, "[set_UNITCELL]Menu", null, "showUNITCELLCB", null, "labelUpperLeft", J.i18n.GT.$ ("Upper Left"), "labelUpperRight", J.i18n.GT.$ ("Upper Right"), "surfVDW", J.i18n.GT.$ ("van der Waals Surface"), "VIBRATIONvectorMenu", J.i18n.GT.$ ("Vectors"), "property_vxyz#VIBRATION", null, "[color_vectors]Menu", null, "VIBRATIONMenu", J.i18n.GT.$ ("Vibration"), "viewMenuText", J.i18n.GT.$ ("View {0}"), "viewMenu", J.i18n.GT.$ ("View"), "violet", J.i18n.GT.$ ("Violet"), "stereoWallEyed", J.i18n.GT.$ ("Wall-eyed viewing"), "white", J.i18n.GT.$ ("White"), "renderWireframe", J.i18n.GT.$ ("Wireframe"), "labelName", J.i18n.GT.$ ("With Atom Name"), "labelNumber", J.i18n.GT.$ ("With Atom Number"), "labelSymbol", J.i18n.GT.$ ("With Element Symbol"), "yellow", J.i18n.GT.$ ("Yellow"), "zoomIn", J.i18n.GT.$ ("Zoom In"), "zoomOut", J.i18n.GT.$ ("Zoom Out"), "zoomMenu", J.i18n.GT.$ ("Zoom"), "vector005", J.i18n.GT.o (ang, "0.05"), "bond100", J.i18n.GT.o (ang, "0.10"), "hbond100", null, "ssbond100", null, "vector01", null, "10a", null, "bond150", J.i18n.GT.o (ang, "0.15"), "hbond150", null, "ssbond150", null, "bond200", J.i18n.GT.o (ang, "0.20"), "hbond200", null, "ssbond200", null, "20a", null, "bond250", J.i18n.GT.o (ang, "0.25"), "hbond250", null, "ssbond250", null, "25a", null, "bond300", J.i18n.GT.o (ang, "0.30"), "hbond300", null, "ssbond300", null, "50a", J.i18n.GT.o (ang, "0.50"), "100a", J.i18n.GT.o (ang, "1.0"), "1p", J.i18n.GT.i (pxl, 1), "10p", J.i18n.GT.i (pxl, 10), "3p", J.i18n.GT.i (pxl, 3), "vector3", null, "5p", J.i18n.GT.i (pxl, 5), "atom100", J.i18n.GT.i (vdw, 100), "atom15", J.i18n.GT.i (vdw, 15), "atom20", J.i18n.GT.i (vdw, 20), "atom25", J.i18n.GT.i (vdw, 25), "atom50", J.i18n.GT.i (vdw, 50), "atom75", J.i18n.GT.i (vdw, 75), "SIGNEDNOGLwriteIdtf", J.i18n.GT.o (exm, "IDTF"), "SIGNEDNOGLwriteMaya", J.i18n.GT.o (exm, "Maya"), "SIGNEDNOGLwriteVrml", J.i18n.GT.o (exm, "VRML"), "SIGNEDNOGLwriteX3d", J.i18n.GT.o (exm, "X3D"), "SIGNEDNOGLwriteSTL", J.i18n.GT.o (exm, "STL"), "SIGNEDNOGLwriteGif", J.i18n.GT.o (exi, "GIF"), "SIGNEDNOGLwriteJpg", J.i18n.GT.o (exi, "JPG"), "SIGNEDNOGLwritePng", J.i18n.GT.o (exi, "PNG"), "SIGNEDNOGLwritePngJmol", J.i18n.GT.o (exi, "PNG+JMOL"), "SIGNEDNOGLwritePovray", J.i18n.GT.o (exi, "POV-Ray"), "FILEUNITnineRestricted", J.i18n.GT.o (J.i18n.GT.$ ("Reload {0} + Display {1}"),  Clazz_newArray (-1, ["{444 666 1}", "555"])), "FILEMOLload", J.i18n.GT.o (rld, "(molecular)"), "FILEUNITone", J.i18n.GT.o (rld, "{1 1 1}"), "FILEUNITnine", J.i18n.GT.o (rld, "{444 666 1}"), "vectorScale02", J.i18n.GT.o (scl, "0.2"), "vectorScale05", J.i18n.GT.o (scl, "0.5"), "vectorScale1", J.i18n.GT.o (scl, "1"), "vectorScale2", J.i18n.GT.o (scl, "2"), "vectorScale5", J.i18n.GT.o (scl, "5"), "surfSolvent14", J.i18n.GT.o (J.i18n.GT.$ ("Solvent Surface ({0}-Angstrom probe)"), "1.4"), "surfSolventAccessible14", J.i18n.GT.o (J.i18n.GT.$ ("Solvent-Accessible Surface (VDW + {0} Angstrom)"), "1.4"), "vibration20", "*2", "vibration05", "/2", "JAVAmemTotal", "?", "JAVAmemMax", null, "JAVAprocessors", null, "s0", "0", "animfps10", "10", "s10", null, "zoom100", "100%", "zoom150", "150%", "animfps20", "20", "s20", null, "zoom200", "200%", "animfps30", "30", "s30", null, "s40", "40", "zoom400", "400%", "animfps5", "5", "s5", null, "animfps50", "50", "s50", null, "zoom50", "50%", "zoom800", "800%", "JSConsole", "JavaScript Console", "jmolMenu", "Jmol", "date", JV.JC.date, "version", JV.JC.version, "javaVender", JV.Viewer.strJavaVendor, "javaVersion", JV.Viewer.strJavaVersion, "os", JV.Viewer.strOSName, "jmolorg", "http://www.jmol.org"]);
J.i18n.GT.setDoTranslate (wasTranslating);
for (var i = 1, n = words.length; i < n; i += 2) if (words[i] == null) words[i] = words[i - 2];

return words;
});
Clazz_overrideMethod (c$, "getMenuAsText", 
function (title) {
return this.getStuctureAsText (title, J.popup.MainPopupResourceBundle.menuContents, J.popup.MainPopupResourceBundle.structureContents);
}, "~S");
Clazz_defineStatics (c$,
"MENU_NAME", "popupMenu");
c$.menuContents = c$.prototype.menuContents =  Clazz_newArray (-1, [ Clazz_newArray (-1, ["@COLOR", "black darkgray lightgray white - red orange yellow green cyan blue indigo violet"]),  Clazz_newArray (-1, ["@AXESCOLOR", "gray salmon maroon olive slateblue gold orchid"]),  Clazz_newArray (-1, ["popupMenu", "fileMenu modelSetMenu FRAMESbyModelComputedMenu configurationComputedMenu - selectMenuText viewMenu renderMenu colorMenu - surfaceMenu FILEUNITMenu - sceneComputedMenu zoomMenu spinMenu VIBRATIONMenu spectraMenu FRAMESanimateMenu - measureMenu pickingMenu - showConsole JSConsole showMenu computationMenu - languageComputedMenu aboutMenu"]),  Clazz_newArray (-1, ["fileMenu", "loadMenu saveMenu exportMenu SIGNEDJAVAcaptureMenuSPECIAL "]),  Clazz_newArray (-1, ["loadMenu", "SIGNEDloadFile SIGNEDloadUrl SIGNEDloadPdb SIGNEDloadScript - reload SIGNEDloadFileUnitCell"]),  Clazz_newArray (-1, ["saveMenu", "writeFileTextVARIABLE writeState writeHistory SIGNEDwriteJmol SIGNEDwriteIsosurface "]),  Clazz_newArray (-1, ["exportMenu", "SIGNEDNOGLwriteGif SIGNEDNOGLwriteJpg SIGNEDNOGLwritePng SIGNEDNOGLwritePngJmol SIGNEDNOGLwritePovray - SIGNEDNOGLwriteVrml SIGNEDNOGLwriteX3d SIGNEDNOGLwriteSTL"]),  Clazz_newArray (-1, ["selectMenuText", "hideNotSelectedCB showSelectionsCB - selectAll selectNone invertSelection - elementsComputedMenu SYMMETRYSelectComputedMenu - PDBproteinMenu PDBnucleicMenu PDBheteroMenu PDBcarboMenu PDBnoneOfTheAbove"]),  Clazz_newArray (-1, ["PDBproteinMenu", "PDBaaResiduesComputedMenu - allProtein proteinBackbone proteinSideChains - polar nonpolar - positiveCharge negativeCharge noCharge"]),  Clazz_newArray (-1, ["PDBcarboMenu", "PDBcarboResiduesComputedMenu - allCarbo"]),  Clazz_newArray (-1, ["PDBnucleicMenu", "PDBnucleicResiduesComputedMenu - allNucleic nucleicBackbone nucleicBases - DNA RNA - atPairs auPairs gcPairs - aaStructureMenu"]),  Clazz_newArray (-1, ["PDBheteroMenu", "PDBheteroComputedMenu - allHetero Solvent Water - Ligand exceptWater nonWaterSolvent"]),  Clazz_newArray (-1, ["viewMenu", "best front left right top bottom back - axisX axisY axisZ - axisA axisB axisC"]),  Clazz_newArray (-1, ["renderMenu", "renderSchemeMenu - atomMenu labelMenu bondMenu hbondMenu ssbondMenu - PDBstructureMenu - [set_axes]Menu [set_boundbox]Menu [set_UNITCELL]Menu - perspectiveDepthCB stereoMenu"]),  Clazz_newArray (-1, ["renderSchemeMenu", "renderCpkSpacefill renderBallAndStick renderSticks renderWireframe PDBrenderCartoonsOnly PDBrenderTraceOnly"]),  Clazz_newArray (-1, ["atomMenu", "showHydrogensCB - atomNone - atom15 atom20 atom25 atom50 atom75 atom100"]),  Clazz_newArray (-1, ["bondMenu", "bondNone bondWireframe - bond100 bond150 bond200 bond250 bond300"]),  Clazz_newArray (-1, ["hbondMenu", "hbondCalc hbondNone hbondWireframe - PDBhbondSidechain PDBhbondBackbone - hbond100 hbond150 hbond200 hbond250 hbond300"]),  Clazz_newArray (-1, ["ssbondMenu", "ssbondNone ssbondWireframe - PDBssbondSidechain PDBssbondBackbone - ssbond100 ssbond150 ssbond200 ssbond250 ssbond300"]),  Clazz_newArray (-1, ["PDBstructureMenu", "structureNone - backbone cartoon cartoonRockets ribbons rockets strands trace"]),  Clazz_newArray (-1, ["VIBRATIONvectorMenu", "vectorOff vectorOn vibScale20 vibScale05 vector3 vector005 vector01 - vectorScale02 vectorScale05 vectorScale1 vectorScale2 vectorScale5"]),  Clazz_newArray (-1, ["stereoMenu", "stereoNone stereoRedCyan stereoRedBlue stereoRedGreen stereoCrossEyed stereoWallEyed"]),  Clazz_newArray (-1, ["labelMenu", "labelNone - labelSymbol labelName labelNumber - labelPositionMenu"]),  Clazz_newArray (-1, ["labelPositionMenu", "labelCentered labelUpperRight labelLowerRight labelUpperLeft labelLowerLeft"]),  Clazz_newArray (-1, ["colorMenu", "colorrasmolCB [color_]schemeMenu - [color_atoms]Menu [color_bonds]Menu [color_hbonds]Menu [color_ssbonds]Menu colorPDBStructuresMenu [color_isosurface]Menu - [color_labels]Menu [color_vectors]Menu - [color_axes]Menu [color_boundbox]Menu [color_UNITCELL]Menu [color_background]Menu"]),  Clazz_newArray (-1, ["[color_atoms]Menu", "schemeMenu - @COLOR - opaque translucent"]),  Clazz_newArray (-1, ["[color_bonds]Menu", "none - @COLOR - opaque translucent"]),  Clazz_newArray (-1, ["[color_hbonds]Menu", null]),  Clazz_newArray (-1, ["[color_ssbonds]Menu", null]),  Clazz_newArray (-1, ["[color_labels]Menu", null]),  Clazz_newArray (-1, ["[color_vectors]Menu", null]),  Clazz_newArray (-1, ["[color_backbone]Menu", "none - schemeMenu - @COLOR - opaque translucent"]),  Clazz_newArray (-1, ["[color_cartoon]sMenu", null]),  Clazz_newArray (-1, ["[color_ribbon]sMenu", null]),  Clazz_newArray (-1, ["[color_rockets]Menu", null]),  Clazz_newArray (-1, ["[color_strands]Menu", null]),  Clazz_newArray (-1, ["[color_trace]Menu", null]),  Clazz_newArray (-1, ["[color_background]Menu", "@COLOR"]),  Clazz_newArray (-1, ["[color_isosurface]Menu", "@COLOR - opaque translucent"]),  Clazz_newArray (-1, ["[color_axes]Menu", "@AXESCOLOR"]),  Clazz_newArray (-1, ["[color_boundbox]Menu", null]),  Clazz_newArray (-1, ["[color_UNITCELL]Menu", null]),  Clazz_newArray (-1, ["colorPDBStructuresMenu", "[color_backbone]Menu [color_cartoon]sMenu [color_ribbon]sMenu [color_rockets]Menu [color_strands]Menu [color_trace]Menu"]),  Clazz_newArray (-1, ["schemeMenu", "cpk molecule formalcharge partialcharge - altloc#PDB amino#PDB chain#PDB group#PDB monomer#PDB shapely#PDB structure#PDB relativeTemperature#BFACTORS fixedTemperature#BFACTORS property_vxyz#VIBRATION"]),  Clazz_newArray (-1, ["[color_]schemeMenu", null]),  Clazz_newArray (-1, ["zoomMenu", "zoom50 zoom100 zoom150 zoom200 zoom400 zoom800 - zoomIn zoomOut"]),  Clazz_newArray (-1, ["spinMenu", "spinOn spinOff - [set_spin_X]Menu [set_spin_Y]Menu [set_spin_Z]Menu - [set_spin_FPS]Menu"]),  Clazz_newArray (-1, ["VIBRATIONMenu", "vibrationOff vibrationOn vibration20 vibration05 VIBRATIONvectorMenu"]),  Clazz_newArray (-1, ["spectraMenu", "hnmrMenu cnmrMenu"]),  Clazz_newArray (-1, ["FRAMESanimateMenu", "animModeMenu - play pause resume stop - nextframe prevframe rewind - playrev restart - FRAMESanimFpsMenu"]),  Clazz_newArray (-1, ["FRAMESanimFpsMenu", "animfps5 animfps10 animfps20 animfps30 animfps50"]),  Clazz_newArray (-1, ["measureMenu", "showMeasurementsCB - measureOff measureDistance measureAngle measureTorsion PDBmeasureSequence - measureDelete measureList - distanceNanometers distanceAngstroms distancePicometers distanceHz"]),  Clazz_newArray (-1, ["pickingMenu", "pickOff pickCenter pickIdent pickLabel pickAtom pickMolecule pickElement - pickSpin - modelKitMode - PDBpickChain PDBpickGroup SYMMETRYpickSite"]),  Clazz_newArray (-1, ["computationMenu", "minimize modelkit"]),  Clazz_newArray (-1, ["showMenu", "showHistory showFile showFileHeader - showOrient showMeasure - showSpacegroup showState SYMMETRYshowSymmetry UNITCELLshow - showIsosurface showMo - extractMOL"]),  Clazz_newArray (-1, ["SIGNEDJAVAcaptureMenuSPECIAL", "SIGNEDJAVAcaptureRock SIGNEDJAVAcaptureSpin - SIGNEDJAVAcaptureBegin SIGNEDJAVAcaptureEnd SIGNEDJAVAcaptureOff SIGNEDJAVAcaptureOn SIGNEDJAVAcaptureFpsSPECIAL SIGNEDJAVAcaptureLoopingSPECIAL"]),  Clazz_newArray (-1, ["[set_spin_X]Menu", "s0 s5 s10 s20 s30 s40 s50"]),  Clazz_newArray (-1, ["[set_spin_Y]Menu", null]),  Clazz_newArray (-1, ["[set_spin_Z]Menu", null]),  Clazz_newArray (-1, ["[set_spin_FPS]Menu", null]),  Clazz_newArray (-1, ["animModeMenu", "onceThrough palindrome loop"]),  Clazz_newArray (-1, ["surfaceMenu", "surfDots surfVDW surfSolventAccessible14 surfSolvent14 surfMolecular surf2MEP surfMEP surfMoComputedMenuText - surfOpaque surfTranslucent surfOff"]),  Clazz_newArray (-1, ["FILEUNITMenu", "SYMMETRYShowComputedMenu FILEMOLload FILEUNITone FILEUNITnine FILEUNITnineRestricted FILEUNITninePoly"]),  Clazz_newArray (-1, ["[set_axes]Menu", "on off#axes dotted - byPixelMenu byAngstromMenu"]),  Clazz_newArray (-1, ["[set_boundbox]Menu", null]),  Clazz_newArray (-1, ["[set_UNITCELL]Menu", null]),  Clazz_newArray (-1, ["byPixelMenu", "1p 3p 5p 10p"]),  Clazz_newArray (-1, ["byAngstromMenu", "10a 20a 25a 50a 100a"]),  Clazz_newArray (-1, ["aboutMenu", "jmolMenu systemMenu"]),  Clazz_newArray (-1, ["jmolMenu", "APPLETid version date - help - mouse translations jmolorg"]),  Clazz_newArray (-1, ["systemMenu", "os javaVender javaVersion JAVAprocessors JAVAmemMax JAVAmemTotal"])]);
c$.structureContents = c$.prototype.structureContents =  Clazz_newArray (-1, [ Clazz_newArray (-1, ["jmolorg", "show url \"http://www.jmol.org\""]),  Clazz_newArray (-1, ["help", "help"]),  Clazz_newArray (-1, ["mouse", "show url \"http://wiki.jmol.org/index.php/Mouse_Manual\""]),  Clazz_newArray (-1, ["translations", "show url \"http://wiki.jmol.org/index.php/Internationalisation\""]),  Clazz_newArray (-1, ["colorrasmolCB", ""]),  Clazz_newArray (-1, ["hideNotSelectedCB", "set hideNotSelected true | set hideNotSelected false; hide(none)"]),  Clazz_newArray (-1, ["perspectiveDepthCB", ""]),  Clazz_newArray (-1, ["showAxesCB", "set showAxes true | set showAxes false;set axesMolecular"]),  Clazz_newArray (-1, ["showBoundBoxCB", ""]),  Clazz_newArray (-1, ["showHydrogensCB", ""]),  Clazz_newArray (-1, ["showMeasurementsCB", ""]),  Clazz_newArray (-1, ["showSelectionsCB", ""]),  Clazz_newArray (-1, ["showUNITCELLCB", ""]),  Clazz_newArray (-1, ["selectAll", "SELECT all"]),  Clazz_newArray (-1, ["selectNone", "SELECT none"]),  Clazz_newArray (-1, ["invertSelection", "SELECT not selected"]),  Clazz_newArray (-1, ["allProtein", "SELECT protein"]),  Clazz_newArray (-1, ["proteinBackbone", "SELECT protein and backbone"]),  Clazz_newArray (-1, ["proteinSideChains", "SELECT protein and not backbone"]),  Clazz_newArray (-1, ["polar", "SELECT protein and polar"]),  Clazz_newArray (-1, ["nonpolar", "SELECT protein and not polar"]),  Clazz_newArray (-1, ["positiveCharge", "SELECT protein and basic"]),  Clazz_newArray (-1, ["negativeCharge", "SELECT protein and acidic"]),  Clazz_newArray (-1, ["noCharge", "SELECT protein and not (acidic,basic)"]),  Clazz_newArray (-1, ["allCarbo", "SELECT carbohydrate"]),  Clazz_newArray (-1, ["allNucleic", "SELECT nucleic"]),  Clazz_newArray (-1, ["DNA", "SELECT dna"]),  Clazz_newArray (-1, ["RNA", "SELECT rna"]),  Clazz_newArray (-1, ["nucleicBackbone", "SELECT nucleic and backbone"]),  Clazz_newArray (-1, ["nucleicBases", "SELECT nucleic and not backbone"]),  Clazz_newArray (-1, ["atPairs", "SELECT a,t"]),  Clazz_newArray (-1, ["gcPairs", "SELECT g,c"]),  Clazz_newArray (-1, ["auPairs", "SELECT a,u"]),  Clazz_newArray (-1, ["A", "SELECT a"]),  Clazz_newArray (-1, ["C", "SELECT c"]),  Clazz_newArray (-1, ["G", "SELECT g"]),  Clazz_newArray (-1, ["T", "SELECT t"]),  Clazz_newArray (-1, ["U", "SELECT u"]),  Clazz_newArray (-1, ["allHetero", "SELECT hetero"]),  Clazz_newArray (-1, ["Solvent", "SELECT solvent"]),  Clazz_newArray (-1, ["Water", "SELECT water"]),  Clazz_newArray (-1, ["nonWaterSolvent", "SELECT solvent and not water"]),  Clazz_newArray (-1, ["exceptWater", "SELECT hetero and not water"]),  Clazz_newArray (-1, ["Ligand", "SELECT ligand"]),  Clazz_newArray (-1, ["PDBnoneOfTheAbove", "SELECT not(hetero,protein,nucleic,carbohydrate)"]),  Clazz_newArray (-1, ["best", "rotate best -1.0"]),  Clazz_newArray (-1, ["front", J.popup.MainPopupResourceBundle.Box ("moveto 2.0 front;delay 1")]),  Clazz_newArray (-1, ["left", J.popup.MainPopupResourceBundle.Box ("moveto 1.0 front;moveto 2.0 left;delay 1")]),  Clazz_newArray (-1, ["right", J.popup.MainPopupResourceBundle.Box ("moveto 1.0 front;moveto 2.0 right;delay 1")]),  Clazz_newArray (-1, ["top", J.popup.MainPopupResourceBundle.Box ("moveto 1.0 front;moveto 2.0 top;delay 1")]),  Clazz_newArray (-1, ["bottom", J.popup.MainPopupResourceBundle.Box ("moveto 1.0 front;moveto 2.0 bottom;delay 1")]),  Clazz_newArray (-1, ["back", J.popup.MainPopupResourceBundle.Box ("moveto 1.0 front;moveto 2.0 back;delay 1")]),  Clazz_newArray (-1, ["axisA", "moveto axis a"]),  Clazz_newArray (-1, ["axisB", "moveto axis b"]),  Clazz_newArray (-1, ["axisC", "moveto axis c"]),  Clazz_newArray (-1, ["axisX", "moveto axis x"]),  Clazz_newArray (-1, ["axisY", "moveto axis y"]),  Clazz_newArray (-1, ["axisZ", "moveto axis z"]),  Clazz_newArray (-1, ["renderCpkSpacefill", "restrict bonds not selected;select not selected;spacefill 100%;color cpk"]),  Clazz_newArray (-1, ["renderBallAndStick", "restrict bonds not selected;select not selected;spacefill 23%AUTO;wireframe 0.15;color cpk"]),  Clazz_newArray (-1, ["renderSticks", "restrict bonds not selected;select not selected;wireframe 0.3;color cpk"]),  Clazz_newArray (-1, ["renderWireframe", "restrict bonds not selected;select not selected;wireframe on;color cpk"]),  Clazz_newArray (-1, ["PDBrenderCartoonsOnly", "restrict bonds not selected;select not selected;cartoons on;color structure"]),  Clazz_newArray (-1, ["PDBrenderTraceOnly", "restrict bonds not selected;select not selected;trace on;color structure"]),  Clazz_newArray (-1, ["atomNone", "cpk off"]),  Clazz_newArray (-1, ["atom15", "cpk 15%"]),  Clazz_newArray (-1, ["atom20", "cpk 20%"]),  Clazz_newArray (-1, ["atom25", "cpk 25%"]),  Clazz_newArray (-1, ["atom50", "cpk 50%"]),  Clazz_newArray (-1, ["atom75", "cpk 75%"]),  Clazz_newArray (-1, ["atom100", "cpk on"]),  Clazz_newArray (-1, ["bondNone", "wireframe off"]),  Clazz_newArray (-1, ["bondWireframe", "wireframe on"]),  Clazz_newArray (-1, ["bond100", "wireframe .1"]),  Clazz_newArray (-1, ["bond150", "wireframe .15"]),  Clazz_newArray (-1, ["bond200", "wireframe .2"]),  Clazz_newArray (-1, ["bond250", "wireframe .25"]),  Clazz_newArray (-1, ["bond300", "wireframe .3"]),  Clazz_newArray (-1, ["hbondCalc", "hbonds calculate"]),  Clazz_newArray (-1, ["hbondNone", "hbonds off"]),  Clazz_newArray (-1, ["hbondWireframe", "hbonds on"]),  Clazz_newArray (-1, ["PDBhbondSidechain", "set hbonds sidechain"]),  Clazz_newArray (-1, ["PDBhbondBackbone", "set hbonds backbone"]),  Clazz_newArray (-1, ["hbond100", "hbonds .1"]),  Clazz_newArray (-1, ["hbond150", "hbonds .15"]),  Clazz_newArray (-1, ["hbond200", "hbonds .2"]),  Clazz_newArray (-1, ["hbond250", "hbonds .25"]),  Clazz_newArray (-1, ["hbond300", "hbonds .3"]),  Clazz_newArray (-1, ["ssbondNone", "ssbonds off"]),  Clazz_newArray (-1, ["ssbondWireframe", "ssbonds on"]),  Clazz_newArray (-1, ["PDBssbondSidechain", "set ssbonds sidechain"]),  Clazz_newArray (-1, ["PDBssbondBackbone", "set ssbonds backbone"]),  Clazz_newArray (-1, ["ssbond100", "ssbonds .1"]),  Clazz_newArray (-1, ["ssbond150", "ssbonds .15"]),  Clazz_newArray (-1, ["ssbond200", "ssbonds .2"]),  Clazz_newArray (-1, ["ssbond250", "ssbonds .25"]),  Clazz_newArray (-1, ["ssbond300", "ssbonds .3"]),  Clazz_newArray (-1, ["structureNone", "backbone off;cartoons off;ribbons off;rockets off;strands off;trace off;"]),  Clazz_newArray (-1, ["backbone", "restrict not selected;select not selected;backbone 0.3"]),  Clazz_newArray (-1, ["cartoon", "restrict not selected;select not selected;set cartoonRockets false;cartoons on"]),  Clazz_newArray (-1, ["cartoonRockets", "restrict not selected;select not selected;set cartoonRockets;cartoons on"]),  Clazz_newArray (-1, ["ribbons", "restrict not selected;select not selected;ribbons on"]),  Clazz_newArray (-1, ["rockets", "restrict not selected;select not selected;rockets on"]),  Clazz_newArray (-1, ["strands", "restrict not selected;select not selected;strands on"]),  Clazz_newArray (-1, ["trace", "restrict not selected;select not selected;trace 0.3"]),  Clazz_newArray (-1, ["vibrationOff", "vibration off"]),  Clazz_newArray (-1, ["vibrationOn", "vibration on"]),  Clazz_newArray (-1, ["vibration20", "vibrationScale *= 2"]),  Clazz_newArray (-1, ["vibration05", "vibrationScale /= 2"]),  Clazz_newArray (-1, ["vectorOff", "vectors off"]),  Clazz_newArray (-1, ["vectorOn", "vectors on"]),  Clazz_newArray (-1, ["vector3", "vectors 3"]),  Clazz_newArray (-1, ["vector005", "vectors 0.05"]),  Clazz_newArray (-1, ["vector01", "vectors 0.1"]),  Clazz_newArray (-1, ["vectorScale02", "vector scale 0.2"]),  Clazz_newArray (-1, ["vectorScale05", "vector scale 0.5"]),  Clazz_newArray (-1, ["vectorScale1", "vector scale 1"]),  Clazz_newArray (-1, ["vectorScale2", "vector scale 2"]),  Clazz_newArray (-1, ["vectorScale5", "vector scale 5"]),  Clazz_newArray (-1, ["stereoNone", "stereo off"]),  Clazz_newArray (-1, ["stereoRedCyan", "stereo redcyan 3"]),  Clazz_newArray (-1, ["stereoRedBlue", "stereo redblue 3"]),  Clazz_newArray (-1, ["stereoRedGreen", "stereo redgreen 3"]),  Clazz_newArray (-1, ["stereoCrossEyed", "stereo -5"]),  Clazz_newArray (-1, ["stereoWallEyed", "stereo 5"]),  Clazz_newArray (-1, ["labelNone", "label off"]),  Clazz_newArray (-1, ["labelSymbol", "label %e"]),  Clazz_newArray (-1, ["labelName", "label %a"]),  Clazz_newArray (-1, ["labelNumber", "label %i"]),  Clazz_newArray (-1, ["labelCentered", "set labeloffset 0 0"]),  Clazz_newArray (-1, ["labelUpperRight", "set labeloffset 4 4"]),  Clazz_newArray (-1, ["labelLowerRight", "set labeloffset 4 -4"]),  Clazz_newArray (-1, ["labelUpperLeft", "set labeloffset -4 4"]),  Clazz_newArray (-1, ["labelLowerLeft", "set labeloffset -4 -4"]),  Clazz_newArray (-1, ["zoom50", "zoom 50"]),  Clazz_newArray (-1, ["zoom100", "zoom 100"]),  Clazz_newArray (-1, ["zoom150", "zoom 150"]),  Clazz_newArray (-1, ["zoom200", "zoom 200"]),  Clazz_newArray (-1, ["zoom400", "zoom 400"]),  Clazz_newArray (-1, ["zoom800", "zoom 800"]),  Clazz_newArray (-1, ["zoomIn", "move 0 0 0 40 0 0 0 0 1"]),  Clazz_newArray (-1, ["zoomOut", "move 0 0 0 -40 0 0 0 0 1"]),  Clazz_newArray (-1, ["spinOn", "spin on"]),  Clazz_newArray (-1, ["spinOff", "spin off"]),  Clazz_newArray (-1, ["s0", "0"]),  Clazz_newArray (-1, ["s5", "5"]),  Clazz_newArray (-1, ["s10", "10"]),  Clazz_newArray (-1, ["s20", "20"]),  Clazz_newArray (-1, ["s30", "30"]),  Clazz_newArray (-1, ["s40", "40"]),  Clazz_newArray (-1, ["s50", "50"]),  Clazz_newArray (-1, ["onceThrough", "anim mode once#"]),  Clazz_newArray (-1, ["palindrome", "anim mode palindrome#"]),  Clazz_newArray (-1, ["loop", "anim mode loop#"]),  Clazz_newArray (-1, ["play", "anim play#"]),  Clazz_newArray (-1, ["pause", "anim pause#"]),  Clazz_newArray (-1, ["resume", "anim resume#"]),  Clazz_newArray (-1, ["stop", "anim off#"]),  Clazz_newArray (-1, ["nextframe", "frame next#"]),  Clazz_newArray (-1, ["prevframe", "frame prev#"]),  Clazz_newArray (-1, ["playrev", "anim playrev#"]),  Clazz_newArray (-1, ["rewind", "anim rewind#"]),  Clazz_newArray (-1, ["restart", "anim on#"]),  Clazz_newArray (-1, ["animfps5", "anim fps 5#"]),  Clazz_newArray (-1, ["animfps10", "anim fps 10#"]),  Clazz_newArray (-1, ["animfps20", "anim fps 20#"]),  Clazz_newArray (-1, ["animfps30", "anim fps 30#"]),  Clazz_newArray (-1, ["animfps50", "anim fps 50#"]),  Clazz_newArray (-1, ["measureOff", "set pickingstyle MEASURE OFF; set picking OFF"]),  Clazz_newArray (-1, ["measureDistance", "set pickingstyle MEASURE; set picking MEASURE DISTANCE"]),  Clazz_newArray (-1, ["measureAngle", "set pickingstyle MEASURE; set picking MEASURE ANGLE"]),  Clazz_newArray (-1, ["measureTorsion", "set pickingstyle MEASURE; set picking MEASURE TORSION"]),  Clazz_newArray (-1, ["PDBmeasureSequence", "set pickingstyle MEASURE; set picking MEASURE SEQUENCE"]),  Clazz_newArray (-1, ["measureDelete", "measure delete"]),  Clazz_newArray (-1, ["measureList", "console on;show measurements"]),  Clazz_newArray (-1, ["distanceNanometers", "select *; set measure nanometers"]),  Clazz_newArray (-1, ["distanceAngstroms", "select *; set measure angstroms"]),  Clazz_newArray (-1, ["distancePicometers", "select *; set measure picometers"]),  Clazz_newArray (-1, ["distanceHz", "select *; set measure hz"]),  Clazz_newArray (-1, ["pickOff", "set picking off"]),  Clazz_newArray (-1, ["pickCenter", "set picking center"]),  Clazz_newArray (-1, ["pickIdent", "set picking ident"]),  Clazz_newArray (-1, ["pickLabel", "set picking label"]),  Clazz_newArray (-1, ["pickAtom", "set picking atom"]),  Clazz_newArray (-1, ["PDBpickChain", "set picking chain"]),  Clazz_newArray (-1, ["pickElement", "set picking element"]),  Clazz_newArray (-1, ["modelKitMode", "set modelKitMode"]),  Clazz_newArray (-1, ["PDBpickGroup", "set picking group"]),  Clazz_newArray (-1, ["pickMolecule", "set picking molecule"]),  Clazz_newArray (-1, ["SYMMETRYpickSite", "set picking site"]),  Clazz_newArray (-1, ["pickSpin", "set picking spin"]),  Clazz_newArray (-1, ["SYMMETRYpickSymmetry", "set picking symmetry"]),  Clazz_newArray (-1, ["showConsole", "console"]),  Clazz_newArray (-1, ["JSConsole", "JSCONSOLE"]),  Clazz_newArray (-1, ["showFile", "console on;show file"]),  Clazz_newArray (-1, ["showFileHeader", "console on;getProperty FileHeader"]),  Clazz_newArray (-1, ["showHistory", "console on;show history"]),  Clazz_newArray (-1, ["showIsosurface", "console on;show isosurface"]),  Clazz_newArray (-1, ["showMeasure", "console on;show measure"]),  Clazz_newArray (-1, ["showMo", "console on;show mo"]),  Clazz_newArray (-1, ["showModel", "console on;show model"]),  Clazz_newArray (-1, ["showOrient", "console on;show orientation"]),  Clazz_newArray (-1, ["showSpacegroup", "console on;show spacegroup"]),  Clazz_newArray (-1, ["showState", "console on;show state"]),  Clazz_newArray (-1, ["reload", "load \"\""]),  Clazz_newArray (-1, ["SIGNEDloadPdb", "load ?PdbId?"]),  Clazz_newArray (-1, ["SIGNEDloadFile", "load ?"]),  Clazz_newArray (-1, ["SIGNEDloadUrl", "load http://?"]),  Clazz_newArray (-1, ["SIGNEDloadFileUnitCell", "load ? {1 1 1}"]),  Clazz_newArray (-1, ["SIGNEDloadScript", "script ?.spt"]),  Clazz_newArray (-1, ["SIGNEDJAVAcaptureRock", "animation mode loop;capture '?Jmol.gif' rock y 10"]),  Clazz_newArray (-1, ["SIGNEDJAVAcaptureSpin", "animation mode loop;capture '?Jmol.gif' spin y"]),  Clazz_newArray (-1, ["SIGNEDJAVAcaptureBegin", "capture '?Jmol.gif'"]),  Clazz_newArray (-1, ["SIGNEDJAVAcaptureEnd", "capture ''"]),  Clazz_newArray (-1, ["SIGNEDJAVAcaptureOff", "capture off"]),  Clazz_newArray (-1, ["SIGNEDJAVAcaptureOn", "capture on"]),  Clazz_newArray (-1, ["SIGNEDJAVAcaptureFpsSPECIAL", "animation fps @{0+prompt('Capture replay frames per second?', animationFPS)};prompt 'animation FPS ' + animationFPS"]),  Clazz_newArray (-1, ["SIGNEDJAVAcaptureLoopingSPECIAL", "animation mode @{(animationMode=='ONCE' ? 'LOOP':'ONCE')};prompt 'animation MODE ' + animationMode"]),  Clazz_newArray (-1, ["writeFileTextVARIABLE", "if (_applet && !_signedApplet) { console;show file } else { write file \"?FILE?\"}"]),  Clazz_newArray (-1, ["writeState", "if (_applet && !_signedApplet) { console;show state } else { write state \"?FILEROOT?.spt\"}"]),  Clazz_newArray (-1, ["writeHistory", "if (_applet && !_signedApplet) { console;show history } else { write history \"?FILEROOT?.his\"}"]),  Clazz_newArray (-1, ["SIGNEDwriteJmol", "write PNGJ \"?FILEROOT?.png\""]),  Clazz_newArray (-1, ["SIGNEDwriteIsosurface", "write isosurface \"?FILEROOT?.jvxl\""]),  Clazz_newArray (-1, ["SIGNEDNOGLwriteGif", "write image \"?FILEROOT?.gif\""]),  Clazz_newArray (-1, ["SIGNEDNOGLwriteJpg", "write image \"?FILEROOT?.jpg\""]),  Clazz_newArray (-1, ["SIGNEDNOGLwritePng", "write image \"?FILEROOT?.png\""]),  Clazz_newArray (-1, ["SIGNEDNOGLwritePngJmol", "write PNGJ \"?FILEROOT?.png\""]),  Clazz_newArray (-1, ["SIGNEDNOGLwritePovray", "write POVRAY \"?FILEROOT?.pov\""]),  Clazz_newArray (-1, ["SIGNEDNOGLwriteVrml", "write VRML \"?FILEROOT?.wrl\""]),  Clazz_newArray (-1, ["SIGNEDNOGLwriteX3d", "write X3D \"?FILEROOT?.x3d\""]),  Clazz_newArray (-1, ["SIGNEDNOGLwriteSTL", "write STL \"?FILEROOT?.stl\""]),  Clazz_newArray (-1, ["SIGNEDNOGLwriteIdtf", "write IDTF \"?FILEROOT?.idtf\""]),  Clazz_newArray (-1, ["SIGNEDNOGLwriteMaya", "write MAYA \"?FILEROOT?.ma\""]),  Clazz_newArray (-1, ["SYMMETRYshowSymmetry", "console on;show symmetry"]),  Clazz_newArray (-1, ["UNITCELLshow", "console on;show unitcell"]),  Clazz_newArray (-1, ["extractMOL", "console on;getproperty extractModel \"visible\" "]),  Clazz_newArray (-1, ["minimize", "minimize"]),  Clazz_newArray (-1, ["modelkit", "set modelkitmode"]),  Clazz_newArray (-1, ["surfDots", "dots on"]),  Clazz_newArray (-1, ["surfVDW", "isosurface delete resolution 0 solvent 0 translucent"]),  Clazz_newArray (-1, ["surfMolecular", "isosurface delete resolution 0 molecular translucent"]),  Clazz_newArray (-1, ["surfSolvent14", "isosurface delete resolution 0 solvent 1.4 translucent"]),  Clazz_newArray (-1, ["surfSolventAccessible14", "isosurface delete resolution 0 sasurface 1.4 translucent"]),  Clazz_newArray (-1, ["surfMEP", "isosurface delete resolution 0 vdw color range all map MEP translucent"]),  Clazz_newArray (-1, ["surf2MEP", "isosurface delete resolution 0 vdw color range -0.1 0.1 map MEP translucent"]),  Clazz_newArray (-1, ["surfOpaque", "mo opaque;isosurface opaque"]),  Clazz_newArray (-1, ["surfTranslucent", "mo translucent;isosurface translucent"]),  Clazz_newArray (-1, ["surfOff", "mo delete;isosurface delete;var ~~sel = {selected};select *;dots off;select ~~sel"]),  Clazz_newArray (-1, ["FILEMOLload", "save orientation;load \"\";restore orientation;center"]),  Clazz_newArray (-1, ["FILEUNITone", "save orientation;load \"\" {1 1 1} ;restore orientation;center"]),  Clazz_newArray (-1, ["FILEUNITnine", "save orientation;load \"\" {444 666 1} ;restore orientation;center"]),  Clazz_newArray (-1, ["FILEUNITnineRestricted", "save orientation;load \"\" {444 666 1} ;restore orientation; unitcell on; display cell=555;center visible;zoom 200"]),  Clazz_newArray (-1, ["FILEUNITninePoly", "save orientation;load \"\" {444 666 1} ;restore orientation; unitcell on; display cell=555; polyhedra 4,6 (displayed);center (visible);zoom 200"]),  Clazz_newArray (-1, ["1p", "on"]),  Clazz_newArray (-1, ["3p", "3"]),  Clazz_newArray (-1, ["5p", "5"]),  Clazz_newArray (-1, ["10p", "10"]),  Clazz_newArray (-1, ["10a", "0.1"]),  Clazz_newArray (-1, ["20a", "0.20"]),  Clazz_newArray (-1, ["25a", "0.25"]),  Clazz_newArray (-1, ["50a", "0.50"]),  Clazz_newArray (-1, ["100a", "1.0"])]);
});
Clazz_declarePackage ("J.popup");
Clazz_declareInterface (J.popup, "PopupHelper");
Clazz_declarePackage ("J.popup");
Clazz_load (null, "J.popup.PopupResource", ["java.io.BufferedReader", "$.StringReader", "java.util.Properties", "JU.SB"], function () {
c$ = Clazz_decorateAsClass (function () {
this.structure = null;
this.words = null;
Clazz_instantialize (this, arguments);
}, J.popup, "PopupResource");
Clazz_makeConstructor (c$, 
function (menuStructure, menuText) {
this.structure =  new java.util.Properties ();
this.words =  new java.util.Properties ();
this.buildStructure (menuStructure);
this.localize (menuStructure != null, menuText);
}, "~S,java.util.Properties");
Clazz_defineMethod (c$, "getStructure", 
function (key) {
return this.structure.getProperty (key);
}, "~S");
Clazz_defineMethod (c$, "getWord", 
function (key) {
var str = this.words.getProperty (key);
return (str == null ? key : str);
}, "~S");
Clazz_defineMethod (c$, "setStructure", 
function (slist, gt) {
var br =  new java.io.BufferedReader ( new java.io.StringReader (slist));
var line;
var pt;
try {
while ((line = br.readLine ()) != null) {
if (line.length == 0 || line.charAt (0) == '#') continue;
pt = line.indexOf ("=");
if (pt < 0) {
pt = line.length;
line += "=";
}var name = line.substring (0, pt).trim ();
var value = line.substring (pt + 1).trim ();
var label = null;
if ((pt = name.indexOf ("|")) >= 0) {
label = name.substring (pt + 1).trim ();
name = name.substring (0, pt).trim ();
}if (name.length == 0) continue;
if (value.length > 0) this.structure.setProperty (name, value);
if (label != null && label.length > 0) this.words.setProperty (name, (gt == null ? label : gt.translate (label)));
}
} catch (e) {
if (Clazz_exceptionOf (e, Exception)) {
} else {
throw e;
}
}
try {
br.close ();
} catch (e) {
if (Clazz_exceptionOf (e, Exception)) {
} else {
throw e;
}
}
}, "~S,J.api.Translator");
Clazz_defineMethod (c$, "addItems", 
function (itemPairs) {
var previous = "";
for (var i = 0; i < itemPairs.length; i++) {
var pair = itemPairs[i];
var str = pair[1];
if (str == null) str = previous;
previous = str;
this.structure.setProperty (pair[0], str);
}
}, "~A");
Clazz_defineMethod (c$, "localize", 
 function (haveUserMenu, menuText) {
var wordContents = this.getWordContents ();
for (var i = 0; i < wordContents.length; i++) {
var item = wordContents[i++];
var word = this.words.getProperty (item);
if (word == null) word = wordContents[i];
this.words.setProperty (item, word);
if (menuText != null && item.indexOf ("Text") >= 0) menuText.setProperty (item, word);
}
}, "~B,java.util.Properties");
Clazz_defineMethod (c$, "getStuctureAsText", 
function (title, menuContents, structureContents) {
return "# " + this.getMenuName () + ".mnu " + title + "\n\n" + "# Part I -- Menu Structure\n" + "# ------------------------\n\n" + this.dumpStructure (menuContents) + "\n\n" + "# Part II -- Key Definitions\n" + "# --------------------------\n\n" + this.dumpStructure (structureContents) + "\n\n" + "# Part III -- Word Translations\n" + "# -----------------------------\n\n" + this.dumpWords ();
}, "~S,~A,~A");
Clazz_defineMethod (c$, "dumpWords", 
 function () {
var wordContents = this.getWordContents ();
var s =  new JU.SB ();
for (var i = 0; i < wordContents.length; i++) {
var key = wordContents[i++];
if (this.structure.getProperty (key) == null) s.append (key).append (" | ").append (wordContents[i]).appendC ('\n');
}
return s.toString ();
});
Clazz_defineMethod (c$, "dumpStructure", 
 function (items) {
var previous = "";
var s =  new JU.SB ();
for (var i = 0; i < items.length; i++) {
var key = items[i][0];
var label = this.words.getProperty (key);
if (label != null) key += " | " + label;
s.append (key).append (" = ").append (items[i][1] == null ? previous : (previous = items[i][1])).appendC ('\n');
}
return s.toString ();
}, "~A");
});
Clazz_declarePackage ("J.awtjs2d");
Clazz_load (["J.popup.JmolPopup"], "J.awtjs2d.JSJmolPopup", ["J.awtjs2d.JSPopupHelper"], function () {
c$ = Clazz_declareType (J.awtjs2d, "JSJmolPopup", J.popup.JmolPopup);
Clazz_makeConstructor (c$, 
function () {
Clazz_superConstructor (this, J.awtjs2d.JSJmolPopup, []);
this.helper =  new J.awtjs2d.JSPopupHelper (this);
});
Clazz_overrideMethod (c$, "menuShowPopup", 
function (popup, x, y) {
try {
(popup).show (this.isTainted ? this.vwr.html5Applet : null, x, y);
} catch (e) {
if (Clazz_exceptionOf (e, Exception)) {
} else {
throw e;
}
}
this.isTainted = false;
}, "J.api.SC,~N,~N");
Clazz_overrideMethod (c$, "getUnknownCheckBoxScriptToRun", 
function (item, name, what, TF) {
return null;
}, "J.api.SC,~S,~S,~B");
Clazz_overrideMethod (c$, "getImageIcon", 
function (fileName) {
return null;
}, "~S");
Clazz_overrideMethod (c$, "menuFocusCallback", 
function (name, actionCommand, b) {
}, "~S,~S,~B");
});
Clazz_declarePackage ("J.awtjs2d");
Clazz_load (["J.popup.PopupHelper"], "J.awtjs2d.JSPopupHelper", ["JS.ButtonGroup", "$.JCheckBoxMenuItem", "$.JMenu", "$.JMenuItem", "$.JPopupMenu", "$.JRadioButtonMenuItem"], function () {
c$ = Clazz_decorateAsClass (function () {
this.popup = null;
this.buttonGroup = null;
Clazz_instantialize (this, arguments);
}, J.awtjs2d, "JSPopupHelper", null, J.popup.PopupHelper);
Clazz_makeConstructor (c$, 
function (popup) {
this.popup = popup;
}, "J.popup.GenericPopup");
Clazz_overrideMethod (c$, "menuCreatePopup", 
function (name, applet) {
var j =  new JS.JPopupMenu (name);
j.setInvoker (applet);
return j;
}, "~S,~O");
Clazz_overrideMethod (c$, "getMenu", 
function (name) {
var jm =  new JS.JMenu ();
jm.setName (name);
return jm;
}, "~S");
Clazz_overrideMethod (c$, "getMenuItem", 
function (text) {
return  new JS.JMenuItem (text);
}, "~S");
Clazz_overrideMethod (c$, "getRadio", 
function (name) {
return  new JS.JRadioButtonMenuItem ();
}, "~S");
Clazz_overrideMethod (c$, "getCheckBox", 
function (name) {
return  new JS.JCheckBoxMenuItem ();
}, "~S");
Clazz_overrideMethod (c$, "menuAddButtonGroup", 
function (item) {
if (item == null) {
this.buttonGroup = null;
return;
}if (this.buttonGroup == null) this.buttonGroup =  new JS.ButtonGroup ();
this.buttonGroup.add (item);
}, "J.api.SC");
Clazz_overrideMethod (c$, "getItemType", 
function (m) {
return (m).btnType;
}, "J.api.SC");
Clazz_overrideMethod (c$, "menuInsertSubMenu", 
function (menu, subMenu, index) {
(subMenu).setParent (menu);
}, "J.api.SC,J.api.SC,~N");
Clazz_overrideMethod (c$, "getSwingComponent", 
function (component) {
return component;
}, "~O");
Clazz_overrideMethod (c$, "menuClearListeners", 
function (menu) {
if (menu != null) (menu).disposeMenu ();
}, "J.api.SC");
Clazz_defineMethod (c$, "itemStateChanged", 
function (e) {
this.popup.menuCheckBoxCallback (e.getSource ());
}, "java.awt.event.ItemEvent");
Clazz_defineMethod (c$, "actionPerformed", 
function (e) {
this.popup.menuClickCallback (e.getSource (), e.getActionCommand ());
}, "java.awt.event.ActionEvent");
Clazz_overrideMethod (c$, "getButtonGroup", 
function () {
return this.buttonGroup;
});
Clazz_defineMethod (c$, "handleEvent", 
function (e) {
var type = "" + e.getID ();
if (type === "mouseenter") this.mouseEntered (e);
 else if (type === "mouseleave") this.mouseExited (e);
}, "java.awt.event.MouseEvent");
Clazz_defineMethod (c$, "mouseEntered", 
function (e) {
var jmi = e.getSource ();
this.popup.menuFocusCallback (jmi.getName (), jmi.getActionCommand (), true);
}, "java.awt.event.MouseEvent");
Clazz_defineMethod (c$, "mouseExited", 
function (e) {
var jmi = e.getSource ();
this.popup.menuFocusCallback (jmi.getName (), jmi.getActionCommand (), false);
}, "java.awt.event.MouseEvent");
});
})(Clazz
,Clazz.getClassName
,Clazz.newLongArray
,Clazz.doubleToByte
,Clazz.doubleToInt
,Clazz.doubleToLong
,Clazz.declarePackage
,Clazz.instanceOf
,Clazz.load
,Clazz.instantialize
,Clazz.decorateAsClass
,Clazz.floatToInt
,Clazz.floatToLong
,Clazz.makeConstructor
,Clazz.defineEnumConstant
,Clazz.exceptionOf
,Clazz.newIntArray
,Clazz.defineStatics
,Clazz.newFloatArray
,Clazz.declareType
,Clazz.prepareFields
,Clazz.superConstructor
,Clazz.newByteArray
,Clazz.declareInterface
,Clazz.p0p
,Clazz.pu$h
,Clazz.newShortArray
,Clazz.innerTypeInstance
,Clazz.isClassDefined
,Clazz.prepareCallback
,Clazz.newArray
,Clazz.castNullAs
,Clazz.floatToShort
,Clazz.superCall
,Clazz.decorateAsType
,Clazz.newBooleanArray
,Clazz.newCharArray
,Clazz.implementOf
,Clazz.newDoubleArray
,Clazz.overrideConstructor
,Clazz.clone
,Clazz.doubleToShort
,Clazz.getInheritedLevel
,Clazz.getParamsType
,Clazz.isAF
,Clazz.isAB
,Clazz.isAI
,Clazz.isAS
,Clazz.isASS
,Clazz.isAP
,Clazz.isAFloat
,Clazz.isAII
,Clazz.isAFF
,Clazz.isAFFF
,Clazz.tryToSearchAndExecute
,Clazz.getStackTrace
,Clazz.inheritArgs
,Clazz.alert
,Clazz.defineMethod
,Clazz.overrideMethod
,Clazz.declareAnonymous
//,Clazz.checkPrivateMethod
,Clazz.cloneFinals
);
