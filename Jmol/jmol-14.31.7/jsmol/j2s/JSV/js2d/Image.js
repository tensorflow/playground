Clazz.declarePackage ("JSV.js2d");
c$ = Clazz.declareType (JSV.js2d, "Image");
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
if (context._buf32) return context._buf32; // non-canvas internal buffer for image writing
data = context.getImageData(0, 0, width, height).data;
}return JSV.js2d.Image.toIntARGB (data);
}, "~O,~N,~N");
c$.toIntARGB = Clazz.defineMethod (c$, "toIntARGB", 
function (imgData) {
var n = Clazz.doubleToInt (imgData.length / 4);
var iData =  Clazz.newIntArray (n, 0);
for (var i = 0, j = 0; i < n; j++) {
iData[i++] = (imgData[j++] << 16) | (imgData[j++] << 8) | imgData[j++] | 0xFF000000;
}
return iData;
}, "~A");
c$.fromIntARGB = Clazz.defineMethod (c$, "fromIntARGB", 
function (buf32, buf8) {
var n = buf8.length >> 2;
for (var i = 0, j = 0; i < n; i++) {
buf8[j++] = (buf32[i] >> 16) & 0xFF;
buf8[j++] = (buf32[i] >> 8) & 0xFF;
buf8[j++] = buf32[i] & 0xFF;
buf8[j++] = 0xFF;
}
}, "~A,~A");
c$.getTextPixels = Clazz.defineMethod (c$, "getTextPixels", 
function (text, font3d, context, width, height, ascent) {
{
context.fillStyle = "#000000";
context.fillRect(0, 0, width, height);
context.fillStyle = "#FFFFFF";
context.font = font3d.font;
context.fillText(text, 0, ascent);
}return JSV.js2d.Image.grabPixels (context, width, height);
}, "~S,JU.Font,~O,~N,~N,~N");
c$.allocateRgbImage = Clazz.defineMethod (c$, "allocateRgbImage", 
function (windowWidth, windowHeight, pBuffer, windowSize, backgroundTransparent, canvas) {
{
if (canvas == null)
canvas = {width:windowWidth,height:windowHeight};
canvas.buf32 = pBuffer;
}}, "~N,~N,~A,~N,~B,~O");
c$.getStaticGraphics = Clazz.defineMethod (c$, "getStaticGraphics", 
function (canvas, backgroundTransparent) {
return JSV.js2d.Image.getGraphics (canvas);
}, "~O,~B");
c$.getGraphics = Clazz.defineMethod (c$, "getGraphics", 
function (canvas) {
{
return canvas.getContext("2d");
}}, "~O");
c$.drawImage = Clazz.defineMethod (c$, "drawImage", 
function (context, canvas, x, y, width, height) {
{
this.fromIntARGB(canvas.buf32, canvas.buf8);
context.putImageData(canvas.imgdata,x,y);
}}, "~O,~O,~N,~N,~N,~N");
