Clazz.declarePackage ("JU");
c$ = Clazz.decorateAsClass (function () {
this.sb = null;
this.s = null;
Clazz.instantialize (this, arguments);
}, JU, "SB");
Clazz.makeConstructor (c$, 
function () {
{
this.s = "";
}});
c$.newN = Clazz.defineMethod (c$, "newN", 
function (n) {
{
return new JU.SB();
}}, "~N");
c$.newS = Clazz.defineMethod (c$, "newS", 
function (s) {
{
var sb = new JU.SB();
sb.s = s;
return sb;
}}, "~S");
Clazz.defineMethod (c$, "append", 
function (s) {
{
this.s += s
}return this;
}, "~S");
Clazz.defineMethod (c$, "appendC", 
function (c) {
{
this.s += c;
}return this;
}, "~S");
Clazz.defineMethod (c$, "appendI", 
function (i) {
{
this.s += i
}return this;
}, "~N");
Clazz.defineMethod (c$, "appendB", 
function (b) {
{
this.s += b
}return this;
}, "~B");
Clazz.defineMethod (c$, "appendF", 
function (f) {
{
var sf = "" + f;
if (sf.indexOf(".") < 0 && sf.indexOf("e") < 0)
sf += ".0" ;
this.s += sf;
}return this;
}, "~N");
Clazz.defineMethod (c$, "appendD", 
function (d) {
{
var sf = "" + d;
if (sf.indexOf(".") < 0 && sf.indexOf("e") < 0)
sf += ".0" ;
this.s += sf;
}return this;
}, "~N");
Clazz.defineMethod (c$, "appendSB", 
function (buf) {
{
this.s += buf.s;
}return this;
}, "JU.SB");
Clazz.defineMethod (c$, "appendO", 
function (data) {
if (data != null) {
{
this.s += data.toString();
}}return this;
}, "~O");
Clazz.defineMethod (c$, "appendCB", 
function (cb, off, len) {
{
this.s += cb.slice(off,off+len).join("");
}}, "~A,~N,~N");
Clazz.overrideMethod (c$, "toString", 
function () {
{
return this.s;
}});
Clazz.defineMethod (c$, "length", 
function () {
{
return this.s.length;
}});
Clazz.defineMethod (c$, "indexOf", 
function (s) {
{
return this.s.indexOf(s);
}}, "~S");
Clazz.defineMethod (c$, "charAt", 
function (i) {
{
return this.s.charAt(i);
}}, "~N");
Clazz.defineMethod (c$, "charCodeAt", 
function (i) {
{
return this.s.charCodeAt(i);
}}, "~N");
Clazz.defineMethod (c$, "setLength", 
function (n) {
{
this.s = this.s.substring(0, n);
}}, "~N");
Clazz.defineMethod (c$, "lastIndexOf", 
function (s) {
{
return this.s.lastIndexOf(s);
}}, "~S");
Clazz.defineMethod (c$, "indexOf2", 
function (s, i) {
{
return this.s.indexOf(s, i);
}}, "~S,~N");
Clazz.defineMethod (c$, "substring", 
function (i) {
{
return this.s.substring(i);
}}, "~N");
Clazz.defineMethod (c$, "substring2", 
function (i, j) {
{
return this.s.substring(i, j);
}}, "~N,~N");
Clazz.defineMethod (c$, "toBytes", 
function (off, len) {
if (len == 0) return  Clazz.newByteArray (0, 0);
var cs;
{
cs = "UTF-8";
}return (len > 0 ? this.substring2 (off, off + len) : off == 0 ? this.toString () : this.substring2 (off, this.length () - off)).getBytes (cs);
}, "~N,~N");
Clazz.defineMethod (c$, "replace", 
function (start, end, str) {
{
this.s = this.s.substring(0, start) + str + this.s.substring(end);
}}, "~N,~N,~S");
Clazz.defineMethod (c$, "insert", 
function (offset, str) {
this.replace (offset, offset, str);
}, "~N,~S");
