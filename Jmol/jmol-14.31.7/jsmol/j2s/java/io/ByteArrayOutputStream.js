Clazz.load (["java.io.OutputStream"], "java.io.ByteArrayOutputStream", ["java.lang.IllegalArgumentException", "$.IndexOutOfBoundsException", "$.OutOfMemoryError"], function () {
c$ = Clazz.decorateAsClass (function () {
this.buf = null;
this.count = 0;
Clazz.instantialize (this, arguments);
}, java.io, "ByteArrayOutputStream", java.io.OutputStream);
Clazz.makeConstructor (c$, 
function () {
this.construct (32);
});
Clazz.makeConstructor (c$, 
function (size) {
Clazz.superConstructor (this, java.io.ByteArrayOutputStream, []);
if (size < 0) {
throw  new IllegalArgumentException ("Negative initial size: " + size);
}this.buf =  Clazz.newByteArray (size, 0);
}, "~N");
Clazz.defineMethod (c$, "ensureCapacity", 
 function (minCapacity) {
if (minCapacity - this.buf.length > 0) this.grow (minCapacity);
}, "~N");
Clazz.defineMethod (c$, "grow", 
 function (minCapacity) {
var oldCapacity = this.buf.length;
var newCapacity = oldCapacity << 1;
if (newCapacity - minCapacity < 0) newCapacity = minCapacity;
if (newCapacity < 0) {
if (minCapacity < 0) throw  new OutOfMemoryError ();
newCapacity = minCapacity;
}this.buf = java.io.ByteArrayOutputStream.arrayCopyByte (this.buf, newCapacity);
}, "~N");
c$.arrayCopyByte = Clazz.defineMethod (c$, "arrayCopyByte", 
 function (array, newLength) {
var t =  Clazz.newByteArray (newLength, 0);
System.arraycopy (array, 0, t, 0, array.length < newLength ? array.length : newLength);
return t;
}, "~A,~N");
Clazz.overrideMethod (c$, "writeByteAsInt", 
function (b) {
this.ensureCapacity (this.count + 1);
this.buf[this.count] = b;
this.count += 1;
}, "~N");
Clazz.defineMethod (c$, "write", 
function (b, off, len) {
if ((off < 0) || (off > b.length) || (len < 0) || ((off + len) - b.length > 0)) {
throw  new IndexOutOfBoundsException ();
}this.ensureCapacity (this.count + len);
System.arraycopy (b, off, this.buf, this.count, len);
this.count += len;
}, "~A,~N,~N");
Clazz.defineMethod (c$, "writeTo", 
function (out) {
out.write (this.buf, 0, this.count);
}, "java.io.OutputStream");
Clazz.defineMethod (c$, "reset", 
function () {
this.count = 0;
});
Clazz.defineMethod (c$, "toByteArray", 
function () {
return (this.count == this.buf.length ? this.buf : java.io.ByteArrayOutputStream.arrayCopyByte (this.buf, this.count));
});
Clazz.defineMethod (c$, "size", 
function () {
return this.count;
});
Clazz.overrideMethod (c$, "toString", 
function () {
return  String.instantialize (this.buf, 0, this.count);
});
Clazz.overrideMethod (c$, "close", 
function () {
});
});
