Clazz.declarePackage ("javajs.img");
Clazz.load (["javajs.api.GenericImageEncoder"], "javajs.img.ImageEncoder", ["java.lang.Boolean"], function () {
c$ = Clazz.decorateAsClass (function () {
this.out = null;
this.width = -1;
this.height = -1;
this.quality = -1;
this.date = null;
this.logging = false;
this.doClose = true;
this.pixels = null;
Clazz.instantialize (this, arguments);
}, javajs.img, "ImageEncoder", null, javajs.api.GenericImageEncoder);
Clazz.overrideMethod (c$, "createImage", 
function (type, out, params) {
this.out = out;
this.logging = (Boolean.TRUE === params.get ("logging"));
this.width = (params.get ("imageWidth")).intValue ();
this.height = (params.get ("imageHeight")).intValue ();
System.out.println ("ImageEncoder width height " + this.width + " " + this.height);
this.pixels = params.get ("imagePixels");
this.date = params.get ("date");
var q = params.get ("quality");
this.quality = (q == null ? -1 : q.intValue ());
this.setParams (params);
this.generate ();
this.close ();
return this.doClose;
}, "~S,JU.OC,java.util.Map");
Clazz.defineMethod (c$, "putString", 
function (s) {
var b = s.getBytes ();
this.out.write (b, 0, b.length);
}, "~S");
Clazz.defineMethod (c$, "putByte", 
function (b) {
this.out.writeByteAsInt (b);
}, "~N");
Clazz.defineMethod (c$, "close", 
function () {
});
});
