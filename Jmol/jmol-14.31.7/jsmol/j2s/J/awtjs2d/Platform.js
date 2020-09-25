Clazz.declarePackage ("J.awtjs2d");
Clazz.load (["J.api.GenericPlatform"], "J.awtjs2d.Platform", ["java.net.URL", "JU.AjaxURLStreamHandlerFactory", "$.Rdr", "$.SB", "J.api.Interface", "J.awtjs2d.Display", "$.Image", "$.JSFile", "$.JSFont", "$.Mouse"], function () {
c$ = Clazz.decorateAsClass (function () {
this.canvas = null;
this.vwr = null;
this.context = null;
Clazz.instantialize (this, arguments);
}, J.awtjs2d, "Platform", null, J.api.GenericPlatform);
Clazz.overrideMethod (c$, "setViewer", 
function (vwr, canvas) {
{
this.vwr = vwr;
if (canvas == null) {
canvas = document.createElement('canvas');
this.context = canvas.getContext("2d");
} else {
this.context = canvas.getContext("2d");
canvas.imgdata = this.context.getImageData(0, 0, canvas.width, canvas.height);
canvas.buf8 = canvas.imgdata.data;
}
}this.canvas = canvas;
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
function (privateKey, display) {
return  new J.awtjs2d.Mouse (privateKey, this.vwr, display);
}, "~N,~O");
Clazz.overrideMethod (c$, "convertPointFromScreen", 
function (canvas, ptTemp) {
J.awtjs2d.Display.convertPointFromScreen (canvas, ptTemp);
}, "~O,JU.P3");
Clazz.overrideMethod (c$, "getFullScreenDimensions", 
function (canvas, widthHeight) {
J.awtjs2d.Display.getFullScreenDimensions (canvas, widthHeight);
}, "~O,~A");
Clazz.overrideMethod (c$, "getMenuPopup", 
function (menuStructure, type) {
var c = (type == 'j' ? "awtjs2d.JSJmolPopup" : "awtjs2d.JSModelKitPopup");
var jmolpopup = J.api.Interface.getOption (c, this.vwr, "popup");
try {
if (jmolpopup != null) jmolpopup.jpiInitialize (this.vwr, menuStructure);
} catch (e) {
if (Clazz.exceptionOf (e, Exception)) {
c = "Exception creating " + c + ":" + e;
System.out.println (c);
return null;
} else {
throw e;
}
}
return jmolpopup;
}, "~S,~S");
Clazz.overrideMethod (c$, "hasFocus", 
function (canvas) {
return J.awtjs2d.Display.hasFocus (canvas);
}, "~O");
Clazz.overrideMethod (c$, "prompt", 
function (label, data, list, asButtons) {
return J.awtjs2d.Display.prompt (label, data, list, asButtons);
}, "~S,~S,~A,~B");
Clazz.overrideMethod (c$, "renderScreenImage", 
function (context, size) {
J.awtjs2d.Display.renderScreenImage (this.vwr, context, size);
}, "~O,~O");
Clazz.overrideMethod (c$, "drawImage", 
function (context, canvas, x, y, width, height, isDTI) {
J.awtjs2d.Display.drawImage (context, canvas, x, y, width, height, isDTI);
}, "~O,~O,~N,~N,~N,~N,~B");
Clazz.overrideMethod (c$, "requestFocusInWindow", 
function (canvas) {
J.awtjs2d.Display.requestFocusInWindow (canvas);
}, "~O");
Clazz.overrideMethod (c$, "repaint", 
function (canvas) {
var jmol = null;
{
jmol = (self.Jmol && Jmol.repaint ? Jmol : null);
}if (jmol != null) jmol.repaint ((this.vwr).html5Applet, true);
}, "~O");
Clazz.overrideMethod (c$, "setTransparentCursor", 
function (canvas) {
}, "~O");
Clazz.overrideMethod (c$, "setCursor", 
function (c, canvas) {
J.awtjs2d.Platform.Jmol ().setCursor ((this.vwr).html5Applet, c);
}, "~N,~O");
Clazz.overrideMethod (c$, "allocateRgbImage", 
function (windowWidth, windowHeight, pBuffer, windowSize, backgroundTransparent, isImageWrite) {
if (pBuffer == null) {
pBuffer = this.grabPixels (null, 0, 0, null, 0, 0);
{
windowWidth = this.canvas.width;
windowHeight = this.canvas.height;
}}return J.awtjs2d.Image.allocateRgbImage (windowWidth, windowHeight, pBuffer, windowSize, backgroundTransparent, (isImageWrite ? null : this.canvas));
}, "~N,~N,~A,~N,~B,~B");
Clazz.overrideMethod (c$, "notifyEndOfRendering", 
function () {
});
Clazz.overrideMethod (c$, "disposeGraphics", 
function (gOffscreen) {
}, "~O");
Clazz.overrideMethod (c$, "grabPixels", 
function (canvas, width, height, pixels, startRow, nRows) {
var context2d = null;
var isWebGL = (canvas == null);
{
if(isWebGL) { this.canvas = canvas =
Jmol.loadImage(this,"webgl",""
+System.currentTimeMillis(),this
.vwr.html5Applet._canvas.toDataURL(),null,null); width =
canvas.imageWidth; height = canvas.imageHeight;
canvas.imageWidth = 0; }
if (canvas.image && (width != canvas.width || height !=
canvas.height)) Jmol.setCanvasImage(canvas, width, height);
if (canvas.buf32) return canvas.buf32; context2d =
canvas.getContext('2d');
}var buf = J.awtjs2d.Image.grabPixels (context2d, width, height);
{
canvas.buf32 = buf;
}if (isWebGL) for (var i = buf.length; --i >= 0; ) if (buf[i] == 0) buf[i] = -1;

return buf;
}, "~O,~N,~N,~A,~N,~N");
Clazz.overrideMethod (c$, "drawImageToBuffer", 
function (gOffscreen, imageOffscreen, canvas, width, height, bgcolor) {
return this.grabPixels (canvas, width, height, null, 0, 0);
}, "~O,~O,~O,~N,~N,~N");
Clazz.overrideMethod (c$, "getTextPixels", 
function (text, font3d, context, image, width, height, ascent) {
return J.awtjs2d.Image.getTextPixels (text, font3d, context, width, height, ascent);
}, "~S,JU.Font,~O,~O,~N,~N,~N");
Clazz.overrideMethod (c$, "flushImage", 
function (imagePixelBuffer) {
}, "~O");
Clazz.overrideMethod (c$, "getGraphics", 
function (canvas) {
{
return (canvas == null ? this.context : canvas.getContext("2d"));
}}, "~O");
Clazz.overrideMethod (c$, "getImageHeight", 
function (canvas) {
return (canvas == null ? -1 : J.awtjs2d.Image.getHeight (canvas));
}, "~O");
Clazz.overrideMethod (c$, "getImageWidth", 
function (canvas) {
return (canvas == null ? -1 : J.awtjs2d.Image.getWidth (canvas));
}, "~O");
Clazz.overrideMethod (c$, "getStaticGraphics", 
function (image, backgroundTransparent) {
return this.getGraphics (image);
}, "~O,~B");
Clazz.overrideMethod (c$, "newBufferedImage", 
function (image, w, h) {
return J.awtjs2d.Platform.Jmol ().getHiddenCanvas ((this.vwr).html5Applet, "stereoImage", w, h);
}, "~O,~N,~N");
Clazz.overrideMethod (c$, "newOffScreenImage", 
function (w, h) {
return J.awtjs2d.Platform.Jmol ().getHiddenCanvas ((this.vwr).html5Applet, "textImage", w, h);
}, "~N,~N");
Clazz.overrideMethod (c$, "waitForDisplay", 
function (echoNameAndPath, zipBytes) {
return false;
}, "~O,~O");
Clazz.overrideMethod (c$, "createImage", 
function (name_path_bytes) {
var echoName = (name_path_bytes)[0];
var path = (name_path_bytes)[1];
var bytes = (name_path_bytes)[2];
var vwr = this.vwr;
var sc = (bytes == null ? vwr.getEvalContextAndHoldQueue (vwr.eval) : null);
var f = null;
{
f = function(canvas, pathOrError) { vwr.loadImageData(canvas, pathOrError, echoName, sc) };
}return J.awtjs2d.Platform.Jmol ().loadImage (this, echoName, path, bytes, f);
}, "~O");
Clazz.overrideMethod (c$, "fontStringWidth", 
function (font, text) {
return J.awtjs2d.JSFont.stringWidth (font, this.context, text);
}, "JU.Font,~S");
Clazz.overrideMethod (c$, "getFontAscent", 
function (context) {
return J.awtjs2d.JSFont.getAscent (context);
}, "~O");
Clazz.overrideMethod (c$, "getFontDescent", 
function (context) {
return J.awtjs2d.JSFont.getDescent (context);
}, "~O");
Clazz.overrideMethod (c$, "getFontMetrics", 
function (font, context) {
return J.awtjs2d.JSFont.getFontMetrics (font, context == null ? this.context : context);
}, "JU.Font,~O");
Clazz.overrideMethod (c$, "newFont", 
function (fontFace, isBold, isItalic, fontSize) {
return J.awtjs2d.JSFont.newFont (fontFace, isBold, isItalic, fontSize, "px");
}, "~S,~B,~B,~N");
Clazz.overrideMethod (c$, "getDateFormat", 
function (isoType) {
{
if (isoType == null) {
} else if (isoType.indexOf("8824") >= 0) {
var d = new Date();
var x = d.toString().split(" ");
var MM = "0" + (1 + d.getMonth()); MM = MM.substring(MM.length - 2);
var dd = "0" + d.getDate(); dd = dd.substring(dd.length - 2);
return x[3] + MM + dd + x[4].replace(/\:/g,"") + x[5].substring(3,6) + "'" + x[5].substring(6,8) + "'"
} else if (isoType.indexOf("8601") >= 0){
var d = new Date();
var x = d.toString().split(" ");
// Firefox now doing this?
if (x.length == 1)
return x;
var MM = "0" + (1 + d.getMonth()); MM = MM.substring(MM.length - 2);
var dd = "0" + d.getDate(); dd = dd.substring(dd.length - 2);
return x[3] + '-' + MM + '-' + dd + 'T' + x[4]
}
return ("" + (new Date())).split(" (")[0];
}}, "~S");
Clazz.overrideMethod (c$, "newFile", 
function (name) {
return  new J.awtjs2d.JSFile (name);
}, "~S");
Clazz.overrideMethod (c$, "getBufferedFileInputStream", 
function (name) {
return null;
}, "~S");
Clazz.overrideMethod (c$, "getURLContents", 
function (url, outputBytes, post, asString) {
return J.awtjs2d.Platform.getURLContentsStatic (url, outputBytes, post, asString);
}, "java.net.URL,~A,~S,~B");
c$.getURLContentsStatic = Clazz.defineMethod (c$, "getURLContentsStatic", 
function (url, outputBytes, post, asString) {
var ret = J.awtjs2d.JSFile.getURLContents (url, outputBytes, post);
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
return J.awtjs2d.Image.getImageDialog (this.vwr, title, imageMap);
}, "~S,java.util.Map");
c$.Jmol = Clazz.defineMethod (c$, "Jmol", 
function () {
{
return Jmol;
}});
Clazz.overrideMethod (c$, "forceAsyncLoad", 
function (filename) {
return J.awtjs2d.Platform.Jmol ().isBinaryUrl (filename);
}, "~S");
});
