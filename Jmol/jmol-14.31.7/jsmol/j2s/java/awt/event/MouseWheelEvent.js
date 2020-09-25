Clazz.declarePackage ("java.awt.event");
Clazz.load (["java.awt.event.MouseEvent"], "java.awt.event.MouseWheelEvent", null, function () {
c$ = Clazz.decorateAsClass (function () {
this.scrollType = 0;
this.scrollAmount = 0;
this.wheelRotation = 0;
Clazz.instantialize (this, arguments);
}, java.awt.event, "MouseWheelEvent", java.awt.event.MouseEvent);
Clazz.makeConstructor (c$, 
function (source, id, when, modifiers, x, y, clickCount, popupTrigger, scrollType, scrollAmount, wheelRotation) {
this.construct (source, id, when, modifiers, x, y, 0, 0, clickCount, popupTrigger, scrollType, scrollAmount, wheelRotation);
}, "java.awt.Component,~N,~N,~N,~N,~N,~N,~B,~N,~N,~N");
Clazz.makeConstructor (c$, 
function (source, id, when, modifiers, x, y, xAbs, yAbs, clickCount, popupTrigger, scrollType, scrollAmount, wheelRotation) {
Clazz.superConstructor (this, java.awt.event.MouseWheelEvent, [source, id, when, modifiers, x, y, xAbs, yAbs, clickCount, popupTrigger, 0]);
this.scrollType = scrollType;
this.scrollAmount = scrollAmount;
this.wheelRotation = wheelRotation;
}, "java.awt.Component,~N,~N,~N,~N,~N,~N,~N,~N,~B,~N,~N,~N");
Clazz.defineMethod (c$, "getScrollType", 
function () {
return this.scrollType;
});
Clazz.defineMethod (c$, "getScrollAmount", 
function () {
return this.scrollAmount;
});
Clazz.defineMethod (c$, "getWheelRotation", 
function () {
return this.wheelRotation;
});
Clazz.defineMethod (c$, "getUnitsToScroll", 
function () {
return this.scrollAmount * this.wheelRotation;
});
Clazz.defineMethod (c$, "paramString", 
function () {
var scrollTypeStr = null;
if (this.getScrollType () == 0) {
scrollTypeStr = "WHEEL_UNIT_SCROLL";
} else if (this.getScrollType () == 1) {
scrollTypeStr = "WHEEL_BLOCK_SCROLL";
} else {
scrollTypeStr = "unknown scroll type";
}return Clazz.superCall (this, java.awt.event.MouseWheelEvent, "paramString", []) + ",scrollType=" + scrollTypeStr + ",scrollAmount=" + this.getScrollAmount () + ",wheelRotation=" + this.getWheelRotation ();
});
Clazz.defineStatics (c$,
"WHEEL_UNIT_SCROLL", 0,
"WHEEL_BLOCK_SCROLL", 1);
});
