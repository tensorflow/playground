Clazz.declarePackage ("JM");
c$ = Clazz.decorateAsClass (function () {
this.data = null;
this.type = 0;
this.key = null;
this.ddata = null;
Clazz.instantialize (this, arguments);
}, JM, "MinObject");
Clazz.overrideMethod (c$, "toString", 
function () {
return this.type + " " + this.data[0] + "," + this.data[1] + (this.data.length > 2 ? "," + this.data[2] + "," + this.data[3] : "") + " " + JM.MinObject.decodeKey (this.key);
});
c$.getKey = Clazz.defineMethod (c$, "getKey", 
function (type, a1, a2, a3, a4) {
return Integer.$valueOf ((((((((a4 << 7) + a3) << 7) + a2) << 7) + a1) << 4) + type);
}, "~N,~N,~N,~N,~N");
c$.decodeKey = Clazz.defineMethod (c$, "decodeKey", 
function (key) {
if (key == null) return null;
var i = key.intValue ();
var type = i & 0xF;
i >>= 4;
var a = i & 0x7F;
i >>= 7;
var b = i & 0x7F;
i >>= 7;
var c = i & 0x7F;
i >>= 7;
var d = i & 0x7F;
return (type < 0 ? type + ": " : "") + (a < 10 ? "  " : " ") + a + (b < 10 ? "  " : " ") + b + (c < 10 ? "  " : " ") + c + (d > 120 ? "" : (d < 10 ? "  " : " ") + d);
}, "Integer");
