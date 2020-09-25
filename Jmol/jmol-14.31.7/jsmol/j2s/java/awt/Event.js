Clazz.declarePackage ("java.awt");
c$ = Clazz.decorateAsClass (function () {
this.target = null;
this.when = 0;
this.id = 0;
this.x = 0;
this.y = 0;
this.key = 0;
this.modifiers = 0;
this.clickCount = 0;
this.arg = null;
this.evt = null;
this.consumed = false;
Clazz.instantialize (this, arguments);
}, java.awt, "Event");
Clazz.makeConstructor (c$, 
function (target, when, id, x, y, key, modifiers, arg) {
this.target = target;
this.when = when;
this.id = id;
this.x = x;
this.y = y;
this.key = key;
this.modifiers = modifiers;
this.arg = arg;
this.clickCount = 0;
switch (id) {
case 1001:
case 201:
case 203:
case 204:
case 205:
case 601:
case 602:
case 603:
case 604:
case 605:
case 606:
case 607:
case 701:
case 702:
this.consumed = true;
break;
default:
}
}, "~O,~N,~N,~N,~N,~N,~N,~O");
Clazz.makeConstructor (c$, 
function (target, when, id, x, y, key, modifiers) {
this.construct (target, when, id, x, y, key, modifiers, null);
}, "~O,~N,~N,~N,~N,~N,~N");
Clazz.makeConstructor (c$, 
function (target, id, arg) {
this.construct (target, 0, id, 0, 0, 0, 0, arg);
}, "~O,~N,~O");
Clazz.defineMethod (c$, "translate", 
function (dx, dy) {
this.x += dx;
this.y += dy;
}, "~N,~N");
Clazz.defineMethod (c$, "shiftDown", 
function () {
return (this.modifiers & 1) != 0;
});
Clazz.defineMethod (c$, "controlDown", 
function () {
return (this.modifiers & 2) != 0;
});
Clazz.defineMethod (c$, "metaDown", 
function () {
return (this.modifiers & 4) != 0;
});
Clazz.defineMethod (c$, "consume", 
function () {
switch (this.id) {
case 401:
case 402:
case 403:
case 404:
this.consumed = true;
break;
default:
}
});
Clazz.defineMethod (c$, "isConsumed", 
function () {
return this.consumed;
});
c$.getOldEventKey = Clazz.defineMethod (c$, "getOldEventKey", 
function (e) {
var keyCode = e.getKeyCode ();
for (var i = 0; i < java.awt.Event.actionKeyCodes.length; i++) {
if (java.awt.Event.actionKeyCodes[i][0] == keyCode) {
return java.awt.Event.actionKeyCodes[i][1];
}}
return e.getKeyChar ();
}, "java.awt.event.KeyEvent");
Clazz.defineMethod (c$, "getKeyEventChar", 
function () {
for (var i = 0; i < java.awt.Event.actionKeyCodes.length; i++) {
if (java.awt.Event.actionKeyCodes[i][1] == this.key) {
return '\uffff';
}}
return String.fromCharCode (this.key);
});
Clazz.defineMethod (c$, "paramString", 
function () {
var str = "id=" + this.id + ",x=" + this.x + ",y=" + this.y;
if (this.key != 0) {
str += ",key=" + this.key;
}if (this.shiftDown ()) {
str += ",shift";
}if (this.controlDown ()) {
str += ",control";
}if (this.metaDown ()) {
str += ",meta";
}if (this.target != null) {
str += ",target=" + this.target;
}if (this.arg != null) {
str += ",arg=" + this.arg;
}return str;
});
Clazz.overrideMethod(c$, "toString", 
function () {
return this.getClass ().getName () + "[" + this.paramString () + "]";
});
Clazz.defineStatics (c$,
"SHIFT_MASK", 1,
"CTRL_MASK", 2,
"META_MASK", 4,
"ALT_MASK", 8,
"HOME", 1000,
"END", 1001,
"PGUP", 1002,
"PGDN", 1003,
"UP", 1004,
"DOWN", 1005,
"LEFT", 1006,
"RIGHT", 1007,
"F1", 1008,
"F2", 1009,
"F3", 1010,
"F4", 1011,
"F5", 1012,
"F6", 1013,
"F7", 1014,
"F8", 1015,
"F9", 1016,
"F10", 1017,
"F11", 1018,
"F12", 1019,
"PRINT_SCREEN", 1020,
"SCROLL_LOCK", 1021,
"CAPS_LOCK", 1022,
"NUM_LOCK", 1023,
"PAUSE", 1024,
"INSERT", 1025,
"ENTER", '\n',
"BACK_SPACE", '\b',
"TAB", '\t',
"ESCAPE", 27,
"DELETE", 127,
"WINDOW_EVENT", 200,
"WINDOW_DESTROY", 201,
"WINDOW_EXPOSE", 202,
"WINDOW_ICONIFY", 203,
"WINDOW_DEICONIFY", 204,
"WINDOW_MOVED", 205,
"KEY_EVENT", 400,
"KEY_PRESS", 401,
"KEY_RELEASE", 402,
"KEY_ACTION", 403,
"KEY_ACTION_RELEASE", 404,
"MOUSE_EVENT", 500,
"MOUSE_DOWN", 501,
"MOUSE_UP", 502,
"MOUSE_MOVE", 503,
"MOUSE_ENTER", 504,
"MOUSE_EXIT", 505,
"MOUSE_DRAG", 506,
"SCROLL_EVENT", 600,
"SCROLL_LINE_UP", 601,
"SCROLL_LINE_DOWN", 602,
"SCROLL_PAGE_UP", 603,
"SCROLL_PAGE_DOWN", 604,
"SCROLL_ABSOLUTE", 605,
"SCROLL_BEGIN", 606,
"SCROLL_END", 607,
"LIST_EVENT", 700,
"LIST_SELECT", 701,
"LIST_DESELECT", 702,
"MISC_EVENT", 1000,
"ACTION_EVENT", 1001,
"LOAD_FILE", 1002,
"SAVE_FILE", 1003,
"GOT_FOCUS", 1004,
"LOST_FOCUS", 1005,
"actionKeyCodes", [[36, 1000], [35, 1001], [33, 1002], [34, 1003], [38, 1004], [40, 1005], [37, 1006], [39, 1007], [112, 1008], [113, 1009], [114, 1010], [115, 1011], [116, 1012], [117, 1013], [118, 1014], [119, 1015], [120, 1016], [121, 1017], [122, 1018], [123, 1019], [154, 1020], [145, 1021], [20, 1022], [144, 1023], [19, 1024], [155, 1025]]);
