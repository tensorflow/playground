Clazz.declarePackage ("javajs.img");
Clazz.load (["javajs.img.ImageEncoder"], "javajs.img.PpmEncoder", null, function () {
c$ = Clazz.declareType (javajs.img, "PpmEncoder", javajs.img.ImageEncoder);
Clazz.overrideMethod (c$, "setParams", 
function (params) {
}, "java.util.Map");
Clazz.overrideMethod (c$, "generate", 
function () {
this.putString ("P6\n");
this.putString (this.width + " " + this.height + "\n");
this.putString ("255\n");
var ppmPixels =  Clazz.newByteArray (this.width * 3, 0);
for (var pt = 0, row = 0; row < this.height; ++row) {
for (var col = 0, j = 0; col < this.width; ++col, pt++) {
var p = this.pixels[pt];
ppmPixels[j++] = ((p >> 16) & 0xff);
ppmPixels[j++] = ((p >> 8) & 0xff);
ppmPixels[j++] = (p & 0xff);
}
this.out.write (ppmPixels, 0, ppmPixels.length);
}
});
});
