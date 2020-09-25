Clazz.declarePackage ("JU");
Clazz.load (["JU.ZStream"], "JU.Deflater", ["JU.Deflate"], function () {
c$ = Clazz.decorateAsClass (function () {
this.$finished = false;
Clazz.instantialize (this, arguments);
}, JU, "Deflater", JU.ZStream);
Clazz.defineMethod (c$, "init", 
function (level, bits, nowrap) {
if (bits == 0) bits = 15;
this.$finished = false;
this.setAdler32 ();
this.dstate =  new JU.Deflate (this);
this.dstate.deflateInit2 (level, nowrap ? -bits : bits);
return this;
}, "~N,~N,~B");
Clazz.overrideMethod (c$, "deflate", 
function (flush) {
if (this.dstate == null) {
return -2;
}var ret = this.dstate.deflate (flush);
if (ret == 1) this.$finished = true;
return ret;
}, "~N");
Clazz.overrideMethod (c$, "end", 
function () {
this.$finished = true;
if (this.dstate == null) return -2;
var ret = this.dstate.deflateEnd ();
this.dstate = null;
this.free ();
return ret;
});
Clazz.defineMethod (c$, "params", 
function (level, strategy) {
if (this.dstate == null) return -2;
return this.dstate.deflateParams (level, strategy);
}, "~N,~N");
Clazz.defineMethod (c$, "setDictionary", 
function (dictionary, dictLength) {
if (this.dstate == null) return -2;
return this.dstate.deflateSetDictionary (dictionary, dictLength);
}, "~A,~N");
Clazz.overrideMethod (c$, "finished", 
function () {
return this.$finished;
});
Clazz.defineMethod (c$, "finish", 
function () {
});
Clazz.defineMethod (c$, "getBytesRead", 
function () {
return this.dstate.getBytesRead ();
});
Clazz.defineMethod (c$, "getBytesWritten", 
function () {
return this.dstate.getBytesWritten ();
});
Clazz.defineStatics (c$,
"MAX_WBITS", 15,
"Z_STREAM_END", 1,
"$Z_STREAM_ERROR", -2);
});
