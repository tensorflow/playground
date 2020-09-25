Clazz.declarePackage ("J.awtjs2d");
Clazz.load (["J.api.GenericMouseInterface"], "J.awtjs2d.Mouse", ["java.lang.Character", "JU.PT", "$.V3", "JU.Logger"], function () {
c$ = Clazz.decorateAsClass (function () {
this.vwr = null;
this.manager = null;
this.keyBuffer = "";
this.isMouseDown = false;
this.wheeling = false;
this.modifiersDown = 0;
this.xWhenPressed = 0;
this.yWhenPressed = 0;
this.modifiersWhenPressed10 = 0;
Clazz.instantialize (this, arguments);
}, J.awtjs2d, "Mouse", null, J.api.GenericMouseInterface);
Clazz.makeConstructor (c$, 
function (privateKey, vwr, display) {
this.vwr = vwr;
this.manager = this.vwr.acm;
}, "~N,JV.Viewer,~O");
Clazz.overrideMethod (c$, "clear", 
function () {
});
Clazz.overrideMethod (c$, "dispose", 
function () {
});
Clazz.overrideMethod (c$, "processEvent", 
function (id, x, y, modifiers, time) {
if (id != 507) modifiers = J.awtjs2d.Mouse.applyLeftMouse (modifiers);
switch (id) {
case 507:
this.wheeled (time, x, modifiers);
break;
case 501:
this.xWhenPressed = x;
this.yWhenPressed = y;
this.modifiersWhenPressed10 = modifiers;
this.pressed (time, x, y, modifiers, false);
break;
case 506:
this.dragged (time, x, y, modifiers);
break;
case 504:
this.entry (time, x, y, false);
break;
case 505:
this.entry (time, x, y, true);
break;
case 503:
this.moved (time, x, y, modifiers);
break;
case 502:
this.released (time, x, y, modifiers);
if (x == this.xWhenPressed && y == this.yWhenPressed && modifiers == this.modifiersWhenPressed10) {
this.clicked (time, x, y, modifiers, 1);
}break;
default:
return false;
}
return true;
}, "~N,~N,~N,~N,~N");
Clazz.overrideMethod (c$, "processTwoPointGesture", 
function (touches) {
if (touches[0].length < 2) return;
var t1 = touches[0];
var t2 = touches[1];
var t1first = t1[0];
var t1last = t1[t2.length - 1];
var x1first = t1first[0];
var x1last = t1last[0];
var dx1 = x1last - x1first;
var y1first = t1first[1];
var y1last = t1last[1];
var dy1 = y1last - y1first;
var v1 = JU.V3.new3 (dx1, dy1, 0);
var d1 = v1.length ();
var t2first = t2[0];
var t2last = t2[t2.length - 1];
var x2first = t2first[0];
var x2last = t2last[0];
var dx2 = x2last - x2first;
var y2first = t2first[1];
var y2last = t2last[1];
var dy2 = y2last - y2first;
var v2 = JU.V3.new3 (dx2, dy2, 0);
var d2 = v2.length ();
if (d1 < 1 || d2 < 1) return;
v1.normalize ();
v2.normalize ();
var cos12 = (v1.dot (v2));
if (cos12 > 0.8) {
var deltaX = Clazz.floatToInt (x1last - t1[t1.length - 2][0]);
var deltaY = Clazz.floatToInt (y1last - t1[t1.length - 2][1]);
this.vwr.translateXYBy (deltaX, deltaY);
} else if (cos12 < -0.8) {
v1 = JU.V3.new3 (x2first - x1first, y2first - y1first, 0);
v2 = JU.V3.new3 (x2last - x1last, y2last - y1last, 0);
var dx = v2.length () - v1.length ();
this.wheeled (System.currentTimeMillis (), dx < 0 ? -1 : 1, 32);
}}, "~A");
Clazz.defineMethod (c$, "mouseClicked", 
function (e) {
this.clicked (e.getWhen (), e.getX (), e.getY (), e.getModifiers (), e.getClickCount ());
}, "java.awt.event.MouseEvent");
Clazz.defineMethod (c$, "mouseEntered", 
function (e) {
this.entry (e.getWhen (), e.getX (), e.getY (), false);
}, "java.awt.event.MouseEvent");
Clazz.defineMethod (c$, "mouseExited", 
function (e) {
this.entry (e.getWhen (), e.getX (), e.getY (), true);
}, "java.awt.event.MouseEvent");
Clazz.defineMethod (c$, "mousePressed", 
function (e) {
this.pressed (e.getWhen (), e.getX (), e.getY (), e.getModifiers (), e.isPopupTrigger ());
}, "java.awt.event.MouseEvent");
Clazz.defineMethod (c$, "mouseReleased", 
function (e) {
this.released (e.getWhen (), e.getX (), e.getY (), e.getModifiers ());
}, "java.awt.event.MouseEvent");
Clazz.defineMethod (c$, "mouseDragged", 
function (e) {
var modifiers = e.getModifiers ();
if ((modifiers & 28) == 0) modifiers |= 16;
this.dragged (e.getWhen (), e.getX (), e.getY (), modifiers);
}, "java.awt.event.MouseEvent");
Clazz.defineMethod (c$, "mouseMoved", 
function (e) {
this.moved (e.getWhen (), e.getX (), e.getY (), e.getModifiers ());
}, "java.awt.event.MouseEvent");
Clazz.defineMethod (c$, "mouseWheelMoved", 
function (e) {
e.consume ();
this.wheeled (e.getWhen (), e.getWheelRotation (), e.getModifiers ());
}, "java.awt.event.MouseWheelEvent");
Clazz.defineMethod (c$, "keyTyped", 
function (ke) {
ke.consume ();
if (!this.vwr.menuEnabled ()) return;
var ch = ke.getKeyChar ();
var modifiers = ke.getModifiers ();
if (JU.Logger.debuggingHigh) JU.Logger.debug ("MouseManager keyTyped: " + ch + " " + (0 + ch.charCodeAt (0)) + " " + modifiers);
if (modifiers != 0 && modifiers != 1) {
switch (ch) {
case String.fromCharCode (11):
case 'k':
var isON = !this.vwr.getBooleanProperty ("allowKeyStrokes");
switch (modifiers) {
case 2:
this.vwr.setBooleanProperty ("allowKeyStrokes", isON);
this.vwr.setBooleanProperty ("showKeyStrokes", true);
break;
case 10:
case 1:
this.vwr.setBooleanProperty ("allowKeyStrokes", isON);
this.vwr.setBooleanProperty ("showKeyStrokes", false);
break;
}
this.clearKeyBuffer ();
this.vwr.refresh (3, "showkey");
break;
case 22:
case 'v':
switch (modifiers) {
case 2:
break;
}
break;
case 26:
case 'z':
switch (modifiers) {
case 2:
this.vwr.undoMoveAction (4165, 1);
break;
case 3:
this.vwr.undoMoveAction (4139, 1);
break;
}
break;
case 25:
case 'y':
switch (modifiers) {
case 2:
this.vwr.undoMoveAction (4139, 1);
break;
}
break;
}
return;
}if (!this.vwr.getBooleanProperty ("allowKeyStrokes")) return;
this.addKeyBuffer (ke.getModifiers () == 1 ? Character.toUpperCase (ch) : ch);
}, "java.awt.event.KeyEvent");
Clazz.defineMethod (c$, "keyPressed", 
function (ke) {
if (this.vwr.isApplet) ke.consume ();
this.manager.keyPressed (ke.getKeyCode (), ke.getModifiers ());
}, "java.awt.event.KeyEvent");
Clazz.defineMethod (c$, "keyReleased", 
function (ke) {
ke.consume ();
this.manager.keyReleased (ke.getKeyCode ());
}, "java.awt.event.KeyEvent");
Clazz.defineMethod (c$, "clearKeyBuffer", 
 function () {
if (this.keyBuffer.length == 0) return;
this.keyBuffer = "";
if (this.vwr.getBooleanProperty ("showKeyStrokes")) this.vwr.evalStringQuietSync ("!set echo _KEYSTROKES; set echo bottom left;echo \"\"", true, true);
});
Clazz.defineMethod (c$, "addKeyBuffer", 
 function (ch) {
if (ch.charCodeAt (0) == 10) {
this.sendKeyBuffer ();
return;
}if (ch.charCodeAt (0) == 8) {
if (this.keyBuffer.length > 0) this.keyBuffer = this.keyBuffer.substring (0, this.keyBuffer.length - 1);
} else {
this.keyBuffer += ch;
}if (this.vwr.getBooleanProperty ("showKeyStrokes")) this.vwr.evalStringQuietSync ("!set echo _KEYSTROKES; set echo bottom left;echo " + JU.PT.esc ("\1" + this.keyBuffer), true, true);
}, "~S");
Clazz.defineMethod (c$, "sendKeyBuffer", 
 function () {
var kb = this.keyBuffer;
if (this.vwr.getBooleanProperty ("showKeyStrokes")) this.vwr.evalStringQuietSync ("!set echo _KEYSTROKES; set echo bottom left;echo " + JU.PT.esc (this.keyBuffer), true, true);
this.clearKeyBuffer ();
this.vwr.evalStringQuietSync (kb, false, true);
});
Clazz.defineMethod (c$, "entry", 
 function (time, x, y, isExit) {
this.wheeling = false;
this.isMouseDown = false;
this.modifiersDown = 0;
this.manager.mouseEnterExit (time, x, y, isExit);
}, "~N,~N,~N,~B");
Clazz.defineMethod (c$, "clicked", 
 function (time, x, y, modifiers, clickCount) {
this.clearKeyBuffer ();
this.manager.mouseAction (2, time, x, y, 1, modifiers);
}, "~N,~N,~N,~N,~N");
Clazz.defineMethod (c$, "moved", 
 function (time, x, y, modifiers) {
this.clearKeyBuffer ();
if (this.isMouseDown) this.manager.mouseAction (1, time, x, y, 0, this.modifiersDown);
 else this.manager.mouseAction (0, time, x, y, 0, modifiers);
}, "~N,~N,~N,~N");
Clazz.defineMethod (c$, "wheeled", 
 function (time, rotation, modifiers) {
this.clearKeyBuffer ();
this.wheeling = true;
this.manager.mouseAction (3, time, 0, rotation, 0, modifiers & -29 | 32);
}, "~N,~N,~N");
Clazz.defineMethod (c$, "pressed", 
 function (time, x, y, modifiers, isPopupTrigger) {
this.clearKeyBuffer ();
this.isMouseDown = true;
this.modifiersDown = modifiers;
this.wheeling = false;
this.manager.mouseAction (4, time, x, y, 0, modifiers);
}, "~N,~N,~N,~N,~B");
Clazz.defineMethod (c$, "released", 
 function (time, x, y, modifiers) {
this.isMouseDown = false;
this.modifiersDown = 0;
this.wheeling = false;
this.manager.mouseAction (5, time, x, y, 0, modifiers);
}, "~N,~N,~N,~N");
Clazz.defineMethod (c$, "dragged", 
 function (time, x, y, modifiers) {
if (this.wheeling) return;
if ((this.modifiersDown & 20) == 20) this.modifiersDown = this.modifiersDown & -5 | 2;
this.manager.mouseAction (1, time, x, y, 0, this.modifiersDown);
}, "~N,~N,~N,~N");
c$.applyLeftMouse = Clazz.defineMethod (c$, "applyLeftMouse", 
 function (modifiers) {
return ((modifiers & 28) == 0) ? (modifiers | 16) : modifiers;
}, "~N");
});
