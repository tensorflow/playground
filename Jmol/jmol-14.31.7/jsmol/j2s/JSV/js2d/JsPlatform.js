Clazz.declarePackage ("JSV.js2d");
Clazz.load (["J.api.GenericPlatform"], "JSV.js2d.JsPlatform", ["java.net.URL", "JU.AjaxURLStreamHandlerFactory", "$.Rdr", "$.SB", "JSV.app.GenericMouse", "JSV.js2d.Display", "$.Image", "$.JsFile", "$.JsFont"], function () {
c$ = Clazz.decorateAsClass (function () {
this.canvas = null;
this.viewer = null;
this.context = null;
Clazz.instantialize (this, arguments);
}, JSV.js2d, "JsPlatform", null, J.api.GenericPlatform);
Clazz.overrideMethod (c$, "setViewer", 
function (viewer, canvas) {
var context = "";
this.viewer = viewer;
this.canvas = canvas;
{
if (canvas != null) {
context = canvas.getContext("2d");
canvas.imgdata = context.getImageData(0, 0, canvas.width, canvas.height);
canvas.buf8 = canvas.imgdata.data;
}
}if (context !== "") this.context = context;
try {
java.net.URL.setURLStreamHandlerFactory ( new JU.AjaxURLStreamHandlerFactory ());
} catch (e) {
}
}, "J.api.PlatformViewer,~O");
Clazz.overrideMethod (c$, "isSingleThreaded", 
function () {
return true;
});
Clazz.overrideMethod (c$, "getJsObjectInfo", 
function (jsObject, method, args) {
{
return (method == null ? null : method == "localName" ? jsObject[0]["nodeName"] : args == null ? jsObject[0][method] : jsObject[0][method](args[0]));
}}, "~A,~S,~A");
Clazz.overrideMethod (c$, "isHeadless", 
function () {
return false;
});
Clazz.overrideMethod (c$, "getMouseManager", 
function (privateKey, jsvp) {
return  new JSV.app.GenericMouse (jsvp);
}, "~N,~O");
Clazz.overrideMethod (c$, "convertPointFromScreen", 
function (canvas, ptTemp) {
JSV.js2d.Display.convertPointFromScreen (canvas, ptTemp);
}, "~O,JU.P3");
Clazz.overrideMethod (c$, "getFullScreenDimensions", 
function (canvas, widthHeight) {
JSV.js2d.Display.getFullScreenDimensions (canvas, widthHeight);
}, "~O,~A");
Clazz.overrideMethod (c$, "getMenuPopup", 
function (menuStructure, type) {
return null;
}, "~S,~S");
Clazz.overrideMethod (c$, "hasFocus", 
function (canvas) {
return JSV.js2d.Display.hasFocus (canvas);
}, "~O");
Clazz.overrideMethod (c$, "prompt", 
function (label, data, list, asButtons) {
return JSV.js2d.Display.prompt (label, data, list, asButtons);
}, "~S,~S,~A,~B");
Clazz.overrideMethod (c$, "renderScreenImage", 
function (context, size) {
JSV.js2d.Display.renderScreenImage (this.viewer, context, size);
}, "~O,~O");
Clazz.overrideMethod (c$, "drawImage", 
function (context, canvas, x, y, width, height, isDTI) {
JSV.js2d.Image.drawImage (context, canvas, x, y, width, height);
}, "~O,~O,~N,~N,~N,~N,~B");
Clazz.overrideMethod (c$, "requestFocusInWindow", 
function (canvas) {
JSV.js2d.Display.requestFocusInWindow (canvas);
}, "~O");
Clazz.overrideMethod (c$, "repaint", 
function (canvas) {
JSV.js2d.Display.repaint (canvas);
}, "~O");
Clazz.overrideMethod (c$, "setTransparentCursor", 
function (canvas) {
JSV.js2d.Display.setTransparentCursor (canvas);
}, "~O");
Clazz.overrideMethod (c$, "setCursor", 
function (c, canvas) {
JSV.js2d.Display.setCursor (c, canvas);
}, "~N,~O");
Clazz.overrideMethod (c$, "allocateRgbImage", 
function (windowWidth, windowHeight, pBuffer, windowSize, backgroundTransparent, isImageWrite) {
return JSV.js2d.Image.allocateRgbImage (windowWidth, windowHeight, pBuffer, windowSize, backgroundTransparent, (isImageWrite ? null : this.canvas));
}, "~N,~N,~A,~N,~B,~B");
Clazz.overrideMethod (c$, "notifyEndOfRendering", 
function () {
});
Clazz.overrideMethod (c$, "createImage", 
function (data) {
return null;
}, "~O");
Clazz.overrideMethod (c$, "disposeGraphics", 
function (gOffscreen) {
}, "~O");
Clazz.overrideMethod (c$, "grabPixels", 
function (canvas, width, height, pixels, startRow, nRows) {
{
if (canvas.image && (width != canvas.width || height != canvas.height))
Jmol._setCanvasImage(canvas, width, height);
if (canvas.buf32) return canvas.buf32;
}var buf = JSV.js2d.Image.grabPixels (JSV.js2d.Image.getGraphics (canvas), width, height);
{
canvas.buf32 = buf;
}return buf;
}, "~O,~N,~N,~A,~N,~N");
Clazz.overrideMethod (c$, "drawImageToBuffer", 
function (gOffscreen, imageOffscreen, canvas, width, height, bgcolor) {
return this.grabPixels (canvas, width, height, null, 0, 0);
}, "~O,~O,~O,~N,~N,~N");
Clazz.overrideMethod (c$, "getTextPixels", 
function (text, font3d, context, image, width, height, ascent) {
return JSV.js2d.Image.getTextPixels (text, font3d, context, width, height, ascent);
}, "~S,JU.Font,~O,~O,~N,~N,~N");
Clazz.overrideMethod (c$, "flushImage", 
function (imagePixelBuffer) {
}, "~O");
Clazz.overrideMethod (c$, "getGraphics", 
function (canvas) {
return (canvas == null ? this.context : (this.context = JSV.js2d.Image.getGraphics (this.canvas = canvas)));
}, "~O");
Clazz.overrideMethod (c$, "getImageHeight", 
function (canvas) {
return (canvas == null ? -1 : JSV.js2d.Image.getHeight (canvas));
}, "~O");
Clazz.overrideMethod (c$, "getImageWidth", 
function (canvas) {
return (canvas == null ? -1 : JSV.js2d.Image.getWidth (canvas));
}, "~O");
Clazz.overrideMethod (c$, "getStaticGraphics", 
function (image, backgroundTransparent) {
return JSV.js2d.Image.getStaticGraphics (image, backgroundTransparent);
}, "~O,~B");
Clazz.overrideMethod (c$, "newBufferedImage", 
function (image, w, h) {
{
if (self.Jmol && Jmol._getHiddenCanvas)
return Jmol._getHiddenCanvas(this.vwr.html5Applet, "stereoImage", w, h);
}return null;
}, "~O,~N,~N");
Clazz.overrideMethod (c$, "newOffScreenImage", 
function (w, h) {
{
if (self.Jmol && Jmol._getHiddenCanvas)
return Jmol._getHiddenCanvas(this.vwr.html5Applet, "textImage", w, h);
}return null;
}, "~N,~N");
Clazz.overrideMethod (c$, "waitForDisplay", 
function (echoNameAndPath, zipBytes) {
return false;
}, "~O,~O");
Clazz.overrideMethod (c$, "fontStringWidth", 
function (font, text) {
return JSV.js2d.JsFont.stringWidth (font, text);
}, "JU.Font,~S");
Clazz.overrideMethod (c$, "getFontAscent", 
function (context) {
return JSV.js2d.JsFont.getAscent (context);
}, "~O");
Clazz.overrideMethod (c$, "getFontDescent", 
function (context) {
return JSV.js2d.JsFont.getDescent (context);
}, "~O");
Clazz.overrideMethod (c$, "getFontMetrics", 
function (font, context) {
return JSV.js2d.JsFont.getFontMetrics (font, context);
}, "JU.Font,~O");
Clazz.overrideMethod (c$, "newFont", 
function (fontFace, isBold, isItalic, fontSize) {
return JSV.js2d.JsFont.newFont (fontFace, isBold, isItalic, fontSize, "px");
}, "~S,~B,~B,~N");
Clazz.overrideMethod (c$, "getDateFormat", 
function (isoType) {
{
if (isoType == null) {
} else if (isoType.indexOf("8824") >= 0) {
var d = new Date();
var x = d.toString().split(" ");
var MM = "0" + d.getMonth(); MM = MM.substring(MM.length - 2);
var dd = "0" + d.getDate(); dd = dd.substring(dd.length - 2);
return x[3] + MM + dd + x[4].replace(/\:/g,"") + x[5].substring(3,6) + "'" + x[5].substring(6,8) + "'"
} else if (isoType.indexOf("8601") >= 0){
var d = new Date();
var x = d.toString().split(" ");
var MM = "0" + d.getMonth(); MM = MM.substring(MM.length - 2);
var dd = "0" + d.getDate(); dd = dd.substring(dd.length - 2);
return x[3] + MM + dd + x[4].replace(/\:/g,"") + x[5].substring(3,6) + "'" + x[5].substring(6,8) + "'"
}
return ("" + (new Date())).split(" (")[0];
}}, "~S");
Clazz.overrideMethod (c$, "newFile", 
function (name) {
return  new JSV.js2d.JsFile (name);
}, "~S");
Clazz.overrideMethod (c$, "getBufferedFileInputStream", 
function (name) {
return null;
}, "~S");
Clazz.overrideMethod (c$, "getURLContents", 
function (url, outputBytes, post, asString) {
var ret = JSV.js2d.JsFile.getURLContents (url, outputBytes, post);
try {
return (!asString ? ret : Clazz.instanceOf (ret, String) ? ret : Clazz.instanceOf (ret, JU.SB) ? (ret).toString () : Clazz.instanceOf (ret, Array) ?  String.instantialize (ret) :  String.instantialize (JU.Rdr.getStreamAsBytes (ret, null)));
} catch (e) {
if (Clazz.exceptionOf (e, Exception)) {
return "" + e;
} else {
throw e;
}
}
}, "java.net.URL,~A,~S,~B");
Clazz.overrideMethod (c$, "getLocalUrl", 
function (fileName) {
return null;
}, "~S");
Clazz.overrideMethod (c$, "getImageDialog", 
function (title, imageMap) {
return null;
}, "~S,java.util.Map");
Clazz.overrideMethod (c$, "forceAsyncLoad", 
function (filename) {
return false;
}, "~S");
});
