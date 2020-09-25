Clazz.declarePackage ("java.awt.event");
Clazz.load (["java.awt.event.InputEvent"], "java.awt.event.MouseEvent", ["java.lang.IllegalArgumentException", "$.StringBuilder"], function () {
c$ = Clazz.decorateAsClass (function () {
this.x = 0;
this.y = 0;
this.xAbs = 0;
this.yAbs = 0;
this.clickCount = 0;
this.button = 0;
this.popupTrigger = false;
Clazz.instantialize (this, arguments);
}, java.awt.event, "MouseEvent", java.awt.event.InputEvent);
Clazz.defineMethod (c$, "getXOnScreen", 
function () {
return this.xAbs;
});
Clazz.defineMethod (c$, "getYOnScreen", 
function () {
return this.yAbs;
});
Clazz.makeConstructor (c$, 
function (source, id, when, modifiers, x, y, clickCount, popupTrigger, button) {
this.construct (source, id, when, modifiers, x, y, 0, 0, clickCount, popupTrigger, button);
}, "~O,~N,~N,~N,~N,~N,~N,~B,~N");
Clazz.makeConstructor (c$, 
function (source, id, when, modifiers, x, y, clickCount, popupTrigger) {
this.construct (source, id, when, modifiers, x, y, clickCount, popupTrigger, 0);
}, "~O,~N,~N,~N,~N,~N,~N,~B");
Clazz.makeConstructor (c$, 
function (source, id, when, modifiers, x, y, xAbs, yAbs, clickCount, popupTrigger, button) {
Clazz.superConstructor (this, java.awt.event.MouseEvent, [source, id, when, modifiers]);
this.x = x;
this.y = y;
this.xAbs = xAbs;
this.yAbs = yAbs;
this.clickCount = clickCount;
this.popupTrigger = popupTrigger;
if (button < 0 || button > 3) {
throw  new IllegalArgumentException ("Invalid button value");
}this.button = button;
if ((this.getModifiers () != 0) && (this.getModifiersEx () == 0)) {
this.setNewModifiers ();
} else if ((this.getModifiers () == 0) && (this.getModifiersEx () != 0 || button != 0)) {
this.setOldModifiers ();
}}, "~O,~N,~N,~N,~N,~N,~N,~N,~N,~B,~N");
Clazz.defineMethod (c$, "getX", 
function () {
return this.x;
});
Clazz.defineMethod (c$, "getY", 
function () {
return this.y;
});
Clazz.defineMethod (c$, "translatePoint", 
function (x, y) {
this.x += x;
this.y += y;
}, "~N,~N");
Clazz.defineMethod (c$, "getClickCount", 
function () {
return this.clickCount;
});
Clazz.defineMethod (c$, "getButton", 
function () {
return this.button;
});
Clazz.defineMethod (c$, "isPopupTrigger", 
function () {
return this.popupTrigger;
});
c$.getMouseModifiersText = Clazz.defineMethod (c$, "getMouseModifiersText", 
function (modifiers) {
return "[" + modifiers + "]";
}, "~N");
Clazz.defineMethod (c$, "paramString", 
function () {
var str =  new StringBuilder (80);
switch (this.id) {
case 501:
str.append ("MOUSE_PRESSED");
break;
case 502:
str.append ("MOUSE_RELEASED");
break;
case 500:
str.append ("MOUSE_CLICKED");
break;
case 504:
str.append ("MOUSE_ENTERED");
break;
case 505:
str.append ("MOUSE_EXITED");
break;
case 503:
str.append ("MOUSE_MOVED");
break;
case 506:
str.append ("MOUSE_DRAGGED");
break;
case 507:
str.append ("MOUSE_WHEEL");
break;
default:
str.append ("unknown type");
}
str.append (",(").append (this.x).append (",").append (this.y).append (")");
str.append (",absolute(").append (this.xAbs).append (",").append (this.yAbs).append (")");
str.append (",button=").append (this.getButton ());
if (this.getModifiers () != 0) {
str.append (",modifiers=").append (java.awt.event.MouseEvent.getMouseModifiersText (this.modifiers));
}if (this.getModifiersEx () != 0) {
str.append (",extModifiers=").append (java.awt.event.InputEvent.getModifiersExText (this.modifiers));
}str.append (",clickCount=").append (this.clickCount);
return str.toString ();
});
Clazz.defineMethod (c$, "setNewModifiers", 
 function () {
if ((this.modifiers & 16) != 0) {
this.modifiers |= 1024;
}if ((this.modifiers & 8) != 0) {
this.modifiers |= 2048;
}if ((this.modifiers & 4) != 0) {
this.modifiers |= 4096;
}if (this.id == 501 || this.id == 502 || this.id == 500) {
if ((this.modifiers & 16) != 0) {
this.button = 1;
this.modifiers &= -13;
if (this.id != 501) {
this.modifiers &= -1025;
}} else if ((this.modifiers & 8) != 0) {
this.button = 2;
this.modifiers &= -21;
if (this.id != 501) {
this.modifiers &= -2049;
}} else if ((this.modifiers & 4) != 0) {
this.button = 3;
this.modifiers &= -25;
if (this.id != 501) {
this.modifiers &= -4097;
}}}if ((this.modifiers & 8) != 0) {
this.modifiers |= 512;
}if ((this.modifiers & 4) != 0) {
this.modifiers |= 256;
}if ((this.modifiers & 1) != 0) {
this.modifiers |= 64;
}if ((this.modifiers & 2) != 0) {
this.modifiers |= 128;
}if ((this.modifiers & 32) != 0) {
this.modifiers |= 8192;
}});
Clazz.defineMethod (c$, "setOldModifiers", 
 function () {
if (this.id == 501 || this.id == 502 || this.id == 500) {
switch (this.button) {
case 1:
this.modifiers |= 16;
break;
case 2:
this.modifiers |= 8;
break;
case 3:
this.modifiers |= 4;
break;
}
} else {
if ((this.modifiers & 1024) != 0) {
this.modifiers |= 16;
}if ((this.modifiers & 2048) != 0) {
this.modifiers |= 8;
}if ((this.modifiers & 4096) != 0) {
this.modifiers |= 4;
}}if ((this.modifiers & 512) != 0) {
this.modifiers |= 8;
}if ((this.modifiers & 256) != 0) {
this.modifiers |= 4;
}if ((this.modifiers & 64) != 0) {
this.modifiers |= 1;
}if ((this.modifiers & 128) != 0) {
this.modifiers |= 2;
}if ((this.modifiers & 8192) != 0) {
this.modifiers |= 32;
}});
Clazz.defineStatics (c$,
"MOUSE_FIRST", 500,
"MOUSE_LAST", 507,
"MOUSE_CLICKED", 500,
"MOUSE_PRESSED", 501,
"MOUSE_RELEASED", 502,
"MOUSE_MOVED", 503,
"MOUSE_ENTERED", 504,
"MOUSE_EXITED", 505,
"MOUSE_DRAGGED", 506,
"MOUSE_WHEEL", 507,
"NOBUTTON", 0,
"BUTTON1", 1,
"BUTTON2", 2,
"BUTTON3", 3);
});
