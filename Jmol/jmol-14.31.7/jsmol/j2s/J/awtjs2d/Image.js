Clazz.declarePackage ("J.awtjs2d");
Clazz.load (null, "J.awtjs2d.Image", ["J.awtjs2d.Platform"], function () {
c$ = Clazz.declareType (J.awtjs2d, "Image");
c$.getWidth = Clazz.defineMethod (c$, "getWidth", 
function (canvas) {
{
return (canvas.imageWidth ? canvas.imageWidth : canvas.width);
}}, "~O");
c$.getHeight = Clazz.defineMethod (c$, "getHeight", 
function (canvas) {
{
return (canvas.imageHeight ? canvas.imageHeight : canvas.height);
}}, "~O");
c$.grabPixels = Clazz.defineMethod (c$, "grabPixels", 
function (context, width, height) {
var data = null;
{
data = context.getImageData(0, 0, width, height).data;
}return J.awtjs2d.Image.toIntARGB (data);
}, "~O,~N,~N");
c$.toIntARGB = Clazz.defineMethod (c$, "toIntARGB", 
function (imgData) {
var n = Clazz.doubleToInt (imgData.length / 4);
var iData =  Clazz.newIntArray (n, 0);
for (var i = 0, j = 0; i < n; ) {
iData[i++] = (imgData[j++] << 16) | (imgData[j++] << 8) | imgData[j++] | (imgData[j++] << 24);
}
return iData;
}, "~A");
c$.getTextPixels = Clazz.defineMethod (c$, "getTextPixels", 
function (text, font3d, context, width, height, ascent) {
{
context.fillStyle = "#000000";
context.fillRect(0, 0, width, height);
context.fillStyle = "#FFFFFF";
context.font = font3d.font;
context.fillText(text, 0, ascent);
}return J.awtjs2d.Image.grabPixels (context, width, height);
}, "~S,JU.Font,~O,~N,~N,~N");
c$.allocateRgbImage = Clazz.defineMethod (c$, "allocateRgbImage", 
function (windowWidth, windowHeight, pBuffer, windowSize, backgroundTransparent, canvas) {
{
if (canvas == null)
canvas = {width:windowWidth,height:windowHeight};
canvas.buf32 = pBuffer;
}return canvas;
}, "~N,~N,~A,~N,~B,~O");
c$.getImageDialog = Clazz.defineMethod (c$, "getImageDialog", 
function (vwr, title, imageMap) {
return J.awtjs2d.Platform.Jmol ().consoleGetImageDialog (vwr, title, imageMap);
}, "JV.Viewer,~S,java.util.Map");
});
