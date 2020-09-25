Clazz.declarePackage ("javajs.img");
Clazz.load (["javajs.img.JpgEncoder"], "javajs.img.Jpg64Encoder", ["JU.Base64"], function () {
c$ = Clazz.decorateAsClass (function () {
this.outTemp = null;
Clazz.instantialize (this, arguments);
}, javajs.img, "Jpg64Encoder", javajs.img.JpgEncoder);
Clazz.defineMethod (c$, "setParams", 
function (params) {
this.defaultQuality = 75;
this.outTemp = params.remove ("outputChannelTemp");
Clazz.superCall (this, javajs.img.Jpg64Encoder, "setParams", [params]);
}, "java.util.Map");
Clazz.defineMethod (c$, "generate", 
function () {
var out0 = this.out;
this.out = this.outTemp;
Clazz.superCall (this, javajs.img.Jpg64Encoder, "generate", []);
var bytes = JU.Base64.getBytes64 (this.out.toByteArray ());
this.outTemp = null;
this.out = out0;
this.out.write (bytes, 0, bytes.length);
});
});
