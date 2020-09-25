Clazz.declarePackage ("JSV.js2d");
Clazz.load (["J.api.GenericGraphics"], "JSV.js2d.JsG2D", ["JU.CU", "JSV.common.JSViewer", "JS.Color"], function () {
c$ = Clazz.decorateAsClass (function () {
this.windowWidth = 0;
this.windowHeight = 0;
this.isShifted = false;
this.inPath = false;
Clazz.instantialize (this, arguments);
}, JSV.js2d, "JsG2D", null, J.api.GenericGraphics);
Clazz.makeConstructor (c$, 
function () {
});
Clazz.overrideMethod (c$, "getColor4", 
function (r, g, b, a) {
return JS.Color.get4 (r, g, b, a);
}, "~N,~N,~N,~N");
Clazz.overrideMethod (c$, "getColor3", 
function (r, g, b) {
return JS.Color.get3 (r, g, b);
}, "~N,~N,~N");
Clazz.overrideMethod (c$, "getColor1", 
function (rgb) {
return JS.Color.get1 (rgb);
}, "~N");
Clazz.overrideMethod (c$, "newGrayScaleImage", 
function (context, image, width, height, grayBuffer) {
return JSV.common.JSViewer.jmolObject.newGrayScaleImage (context, image, width, height, grayBuffer);
}, "~O,~O,~N,~N,~A");
Clazz.overrideMethod (c$, "drawGrayScaleImage", 
function (g, image, destX0, destY0, destX1, destY1, srcX0, srcY0, srcX1, srcY1) {
var iw;
var ih;
{
iw = image.w;
ih = image.h;
}var dw = (destX1 - destX0 + 1);
var dh = (destY1 - destY0 + 1);
var sw = (srcX1 - srcX0 + 1);
var sh = (srcY1 - srcY0 + 1);
var x = -srcX0 * dw / sw;
var w = iw * dw / sw;
var y = -srcY0 * dh / sh;
var h = ih * dh / sh;
{
image.width = w;
image.height = h;
var div = image.div;
var layer = image.layer;
layer.style.left = destX0 + "px";
layer.style.top = destY0 + "px";
layer.style.width = dw + "px";
layer.style.height = dh+ "px";
div.style.left= x + "px";
div.style.top = y + "px";
div.style.width = w + "px";
div.style.height = h + "px";
}}, "~O,~O,~N,~N,~N,~N,~N,~N,~N,~N");
Clazz.overrideMethod (c$, "drawLine", 
function (g, x0, y0, x1, y1) {
var inPath = this.inPath;
{
if (!inPath) g.beginPath();
g.moveTo(x0, y0);
g.lineTo(x1, y1);
if (!inPath) g.stroke();
}}, "~O,~N,~N,~N,~N");
Clazz.overrideMethod (c$, "drawCircle", 
function (g, x, y, diameter) {
{
var r = diameter/2;
g.beginPath();
g.arc(x + r, y + r, r, 0, 2 * Math.PI, false);
g.stroke();
}}, "~O,~N,~N,~N");
Clazz.overrideMethod (c$, "drawPolygon", 
function (g, ayPoints, axPoints, nPoints) {
this.doPoly (g, ayPoints, axPoints, nPoints, false);
}, "~O,~A,~A,~N");
Clazz.defineMethod (c$, "doPoly", 
 function (g, axPoints, ayPoints, nPoints, doFill) {
{
g.beginPath();
g.moveTo(axPoints[0], ayPoints[0]);
for (var i = 1; i < nPoints; i++)
g.lineTo(axPoints[i], ayPoints[i]);
if (doFill)
g.fill();
else
g.stroke();
}}, "~O,~A,~A,~N,~B");
Clazz.overrideMethod (c$, "drawRect", 
function (g, x, y, width, height) {
{
g.beginPath();
g.rect(x ,y, width, height);
g.stroke();
}}, "~O,~N,~N,~N,~N");
Clazz.overrideMethod (c$, "drawString", 
function (g, s, x, y) {
{
g.fillText(s,x,y);
}}, "~O,~S,~N,~N");
Clazz.overrideMethod (c$, "drawStringRotated", 
function (g, s, x, y, angle) {
}, "~O,~S,~N,~N,~N");
Clazz.overrideMethod (c$, "fillBackground", 
function (g, bgcolor) {
if (bgcolor == null) {
{
if (!this.isShifted) {
g.translate(-0.5, -0.5);
this.isShifted = true;
}
g.clearRect(0,0, this.windowWidth, this.windowHeight);
return;
}}this.setGraphicsColor (g, bgcolor);
this.fillRect (g, 0, 0, this.windowWidth, this.windowHeight);
}, "~O,javajs.api.GenericColor");
Clazz.overrideMethod (c$, "fillCircle", 
function (g, x, y, diameter) {
{
var r = diameter/2;
g.beginPath();
g.arc(x + r, y + r, r, 0, 2 * Math.PI, false);
g.fill();
}}, "~O,~N,~N,~N");
Clazz.overrideMethod (c$, "fillPolygon", 
function (g, ayPoints, axPoints, nPoints) {
this.doPoly (g, ayPoints, axPoints, nPoints, true);
}, "~O,~A,~A,~N");
Clazz.overrideMethod (c$, "fillRect", 
function (g, x, y, width, height) {
{
g.fillRect(x, y, width, height);
}}, "~O,~N,~N,~N,~N");
Clazz.overrideMethod (c$, "setGraphicsColor", 
function (g, c) {
var s = JU.CU.toCSSString (c);
{
g.fillStyle = g.strokeStyle = s;
}}, "~O,javajs.api.GenericColor");
Clazz.overrideMethod (c$, "setFont", 
function (g, font) {
var s = font.getInfo ();
var pt = s.indexOf (" ");
s = s.substring (0, pt) + "px" + s.substring (pt);
{
g.font = s;
}return font;
}, "~O,JU.Font");
Clazz.overrideMethod (c$, "setStrokeBold", 
function (g, tf) {
{
g.lineWidth = (tf ? 2 : 1);
}}, "~O,~B");
Clazz.overrideMethod (c$, "setWindowParameters", 
function (width, height) {
this.windowWidth = width;
this.windowHeight = height;
}, "~N,~N");
Clazz.overrideMethod (c$, "translateScale", 
function (g, x, y, scale) {
}, "~O,~N,~N,~N");
Clazz.overrideMethod (c$, "canDoLineTo", 
function () {
return true;
});
Clazz.overrideMethod (c$, "doStroke", 
function (g, isBegin) {
this.inPath = isBegin;
{
if (isBegin) {
g.beginPath();
} else {
g.stroke();
}
}}, "~O,~B");
Clazz.overrideMethod (c$, "lineTo", 
function (g, x2, y2) {
{
g.lineTo(x2, y2);
}}, "~O,~N,~N");
});
