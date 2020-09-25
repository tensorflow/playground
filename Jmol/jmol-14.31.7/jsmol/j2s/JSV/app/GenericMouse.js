Clazz.declarePackage ("JSV.app");
Clazz.load (["J.api.GenericMouseInterface"], "JSV.app.GenericMouse", ["JU.Logger"], function () {
c$ = Clazz.decorateAsClass (function () {
this.pd = null;
this.jsvp = null;
this.xWhenPressed = 0;
this.yWhenPressed = 0;
this.modifiersWhenPressed10 = 0;
this.isMouseDown = false;
this.disposed = false;
Clazz.instantialize (this, arguments);
}, JSV.app, "GenericMouse", null, J.api.GenericMouseInterface);
Clazz.makeConstructor (c$, 
function (jsvp) {
this.jsvp = jsvp;
this.pd = jsvp.getPanelData ();
}, "JSV.api.JSVPanel");
Clazz.overrideMethod (c$, "clear", 
function () {
});
Clazz.overrideMethod (c$, "processEvent", 
function (id, x, y, modifiers, time) {
if (this.pd == null) {
if (!this.disposed && id == 501 && (modifiers & 4) != 0) this.jsvp.showMenu (x, y);
return true;
}if (id != 507) modifiers = JSV.app.GenericMouse.applyLeftMouse (modifiers);
switch (id) {
case 507:
this.wheeled (time, x, modifiers | 32);
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
this.entered (time, x, y);
break;
case 505:
this.exited (time, x, y);
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
Clazz.defineMethod (c$, "mouseEntered", 
function (e) {
this.entered (e.getWhen (), e.getX (), e.getY ());
}, "java.awt.event.MouseEvent");
Clazz.defineMethod (c$, "mouseExited", 
function (e) {
this.exited (e.getWhen (), e.getX (), e.getY ());
}, "java.awt.event.MouseEvent");
Clazz.defineMethod (c$, "mouseMoved", 
function (e) {
this.moved (e.getWhen (), e.getX (), e.getY (), e.getModifiers ());
}, "java.awt.event.MouseEvent");
Clazz.defineMethod (c$, "mousePressed", 
function (e) {
this.pressed (e.getWhen (), e.getX (), e.getY (), e.getModifiers (), e.isPopupTrigger ());
}, "java.awt.event.MouseEvent");
Clazz.defineMethod (c$, "mouseDragged", 
function (e) {
var modifiers = e.getModifiers ();
if ((modifiers & 28) == 0) modifiers |= 16;
this.dragged (e.getWhen (), e.getX (), e.getY (), modifiers);
}, "java.awt.event.MouseEvent");
Clazz.defineMethod (c$, "mouseReleased", 
function (e) {
this.released (e.getWhen (), e.getX (), e.getY (), e.getModifiers ());
}, "java.awt.event.MouseEvent");
Clazz.defineMethod (c$, "mouseClicked", 
function (e) {
this.clicked (e.getWhen (), e.getX (), e.getY (), e.getModifiers (), e.getClickCount ());
}, "java.awt.event.MouseEvent");
Clazz.defineMethod (c$, "mouseWheelMoved", 
function (e) {
e.consume ();
this.wheeled (e.getWhen (), e.getWheelRotation (), e.getModifiers () | 32);
}, "java.awt.event.MouseWheelEvent");
Clazz.defineMethod (c$, "keyTyped", 
function (ke) {
if (this.pd == null) return;
var ch = ke.getKeyChar ();
var modifiers = ke.getModifiers ();
if (JU.Logger.debuggingHigh || true) JU.Logger.info ("MouseManager keyTyped: " + ch + " " + (0 + ch.charCodeAt (0)) + " " + modifiers);
if (this.pd.keyTyped (ch.charCodeAt (0), modifiers)) ke.consume ();
}, "java.awt.event.KeyEvent");
Clazz.defineMethod (c$, "keyPressed", 
function (ke) {
if (this.pd != null && this.pd.keyPressed (ke.getKeyCode (), ke.getModifiers ())) ke.consume ();
}, "java.awt.event.KeyEvent");
Clazz.defineMethod (c$, "keyReleased", 
function (ke) {
if (this.pd != null) this.pd.keyReleased (ke.getKeyCode ());
}, "java.awt.event.KeyEvent");
Clazz.defineMethod (c$, "entered", 
function (time, x, y) {
if (this.pd != null) this.pd.mouseEnterExit (time, x, y, false);
}, "~N,~N,~N");
Clazz.defineMethod (c$, "exited", 
function (time, x, y) {
if (this.pd != null) this.pd.mouseEnterExit (time, x, y, true);
}, "~N,~N,~N");
Clazz.defineMethod (c$, "clicked", 
function (time, x, y, modifiers, clickCount) {
if (this.pd != null) this.pd.mouseAction (2, time, x, y, 1, modifiers);
}, "~N,~N,~N,~N,~N");
Clazz.defineMethod (c$, "moved", 
function (time, x, y, modifiers) {
if (this.pd == null) return;
if (this.isMouseDown) this.pd.mouseAction (1, time, x, y, 0, JSV.app.GenericMouse.applyLeftMouse (modifiers));
 else this.pd.mouseAction (0, time, x, y, 0, modifiers & -29);
}, "~N,~N,~N,~N");
Clazz.defineMethod (c$, "wheeled", 
function (time, rotation, modifiers) {
if (this.pd != null) this.pd.mouseAction (3, time, 0, rotation, 0, modifiers);
}, "~N,~N,~N");
Clazz.defineMethod (c$, "pressed", 
function (time, x, y, modifiers, isPopupTrigger) {
if (this.pd == null) {
if (!this.disposed) this.jsvp.showMenu (x, y);
return;
}this.isMouseDown = true;
this.pd.mouseAction (4, time, x, y, 0, modifiers);
}, "~N,~N,~N,~N,~B");
Clazz.defineMethod (c$, "released", 
function (time, x, y, modifiers) {
if (this.pd == null) return;
this.isMouseDown = false;
this.pd.mouseAction (5, time, x, y, 0, modifiers);
}, "~N,~N,~N,~N");
Clazz.defineMethod (c$, "dragged", 
function (time, x, y, modifiers) {
if (this.pd == null) return;
if ((modifiers & 20) == 20) modifiers = modifiers & -5 | 2;
this.pd.mouseAction (1, time, x, y, 0, modifiers);
}, "~N,~N,~N,~N");
c$.applyLeftMouse = Clazz.defineMethod (c$, "applyLeftMouse", 
function (modifiers) {
return ((modifiers & 28) == 0) ? (modifiers | 16) : modifiers;
}, "~N");
Clazz.overrideMethod (c$, "processTwoPointGesture", 
function (touches) {
}, "~A");
Clazz.overrideMethod (c$, "dispose", 
function () {
this.pd = null;
this.jsvp = null;
this.disposed = true;
});
});
