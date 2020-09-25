Clazz.declarePackage ("JSV.common");
Clazz.load (["JSV.common.Coordinate", "$.ScriptToken"], "JSV.common.PlotWidget", null, function () {
c$ = Clazz.decorateAsClass (function () {
this.xPixel0 = 0;
this.yPixel0 = 0;
this.xPixel1 = 0;
this.yPixel1 = 0;
this.isPin = false;
this.isPinOrCursor = false;
this.isXtype = false;
this.is2D = false;
this.is2Donly = false;
this.isEnabled = true;
this.isVisible = false;
this.name = null;
this.color = null;
Clazz.instantialize (this, arguments);
}, JSV.common, "PlotWidget", JSV.common.Coordinate);
Clazz.prepareFields (c$, function () {
this.color = JSV.common.ScriptToken.PLOTCOLOR;
});
Clazz.overrideMethod (c$, "toString", 
function () {
return this.name + (!this.isPinOrCursor ? "" + this.xPixel0 + " " + this.yPixel0 + " / " + this.xPixel1 + " " + this.yPixel1 : " x=" + this.getXVal () + "/" + this.xPixel0 + " y=" + this.getYVal () + "/" + this.yPixel0);
});
Clazz.makeConstructor (c$, 
function (name) {
Clazz.superConstructor (this, JSV.common.PlotWidget, []);
this.name = name;
this.isPin = (name.charAt (0) == 'p');
this.isPinOrCursor = (name.charAt (0) != 'z');
this.isXtype = (name.indexOf ("x") >= 0);
this.is2D = (name.indexOf ("2D") >= 0);
this.is2Donly = (this.is2D && name.charAt (0) == 'p');
}, "~S");
Clazz.defineMethod (c$, "selected", 
function (xPixel, yPixel) {
return (this.isVisible && Math.abs (xPixel - this.xPixel0) < 5 && Math.abs (yPixel - this.yPixel0) < 5);
}, "~N,~N");
Clazz.defineMethod (c$, "setX", 
function (x, xPixel) {
this.setXVal (x);
this.xPixel0 = this.xPixel1 = xPixel;
}, "~N,~N");
Clazz.defineMethod (c$, "setY", 
function (y, yPixel) {
this.setYVal (y);
this.yPixel0 = this.yPixel1 = yPixel;
}, "~N,~N");
Clazz.defineMethod (c$, "getValue", 
function () {
return (this.isXtype ? this.getXVal () : this.getYVal ());
});
Clazz.defineMethod (c$, "setEnabled", 
function (enabled) {
this.isEnabled = enabled;
}, "~B");
});
