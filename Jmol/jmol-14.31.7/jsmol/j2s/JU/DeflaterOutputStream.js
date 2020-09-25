Clazz.declarePackage ("JU");
Clazz.load (["java.io.FilterOutputStream"], "JU.DeflaterOutputStream", ["java.io.IOException", "java.lang.IndexOutOfBoundsException"], function () {
c$ = Clazz.decorateAsClass (function () {
this.deflater = null;
this.buffer = null;
this.closed = false;
this.syncFlush = false;
this.buf1 = null;
this.mydeflater = false;
this.close_out = true;
Clazz.instantialize (this, arguments);
}, JU, "DeflaterOutputStream", java.io.FilterOutputStream);
Clazz.prepareFields (c$, function () {
this.buf1 =  Clazz.newByteArray (1, 0);
});
Clazz.defineMethod (c$, "jzSetDOS", 
function (out, deflater, size, close_out) {
this.jzSetFOS (out);
if (size == 0) size = 512;
this.deflater = deflater;
this.buffer =  Clazz.newByteArray (size, 0);
this.close_out = close_out;
}, "java.io.OutputStream,JU.Deflater,~N,~B");
Clazz.overrideMethod (c$, "writeByteAsInt", 
function (b) {
this.buf1[0] = (b & 0xff);
this.write (this.buf1, 0, 1);
}, "~N");
Clazz.defineMethod (c$, "write", 
function (b, off, len) {
if (this.deflater.finished ()) throw  new java.io.IOException ("finished");
if ( new Boolean ( new Boolean (off < 0 | len < 0).valueOf () | off + len > b.length).valueOf ()) throw  new IndexOutOfBoundsException ();
if (len == 0) return;
var flush = this.syncFlush ? 2 : 0;
this.deflater.setInput (b, off, len, true);
while (this.deflater.avail_in > 0) {
var err = this.deflate (flush);
if (err == 1) break;
}
}, "~A,~N,~N");
Clazz.defineMethod (c$, "finish", 
function () {
while (!this.deflater.finished ()) {
this.deflate (4);
}
});
Clazz.overrideMethod (c$, "close", 
function () {
if (!this.closed) {
this.finish ();
if (this.mydeflater) {
this.deflater.end ();
}if (this.close_out) this.out.close ();
this.closed = true;
}});
Clazz.defineMethod (c$, "deflate", 
function (flush) {
this.deflater.setOutput (this.buffer, 0, this.buffer.length);
var err = this.deflater.deflate (flush);
switch (err) {
case 0:
case 1:
break;
case -5:
if (this.deflater.avail_in <= 0 && flush != 4) {
break;
}default:
throw  new java.io.IOException ("failed to deflate");
}
var len = this.deflater.next_out_index;
if (len > 0) {
this.out.write (this.buffer, 0, len);
}return err;
}, "~N");
Clazz.overrideMethod (c$, "flush", 
function () {
if (this.syncFlush && !this.deflater.finished ()) {
while (true) {
var err = this.deflate (2);
if (this.deflater.next_out_index < this.buffer.length) break;
if (err == 1) break;
}
}this.out.flush ();
});
Clazz.defineMethod (c$, "getTotalIn", 
function () {
return this.deflater.getTotalIn ();
});
Clazz.defineMethod (c$, "getTotalOut", 
function () {
return this.deflater.getTotalOut ();
});
Clazz.defineMethod (c$, "setSyncFlush", 
function (syncFlush) {
this.syncFlush = syncFlush;
}, "~B");
Clazz.defineMethod (c$, "getSyncFlush", 
function () {
return this.syncFlush;
});
Clazz.defineMethod (c$, "getDeflater", 
function () {
return this.deflater;
});
Clazz.defineStatics (c$,
"DEFAULT_BUFSIZE", 512);
});
