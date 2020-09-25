Clazz.declarePackage ("java.net");
Clazz.load (null, "java.net.URLConnection", ["java.lang.IllegalStateException", "$.NullPointerException", "java.net.UnknownServiceException", "JU.Lst"], function () {
c$ = Clazz.decorateAsClass (function () {
this.url = null;
this.doInput = true;
this.doOutput = false;
this.connected = false;
this.requests = null;
Clazz.instantialize (this, arguments);
}, java.net, "URLConnection");
Clazz.defineMethod (c$, "setDoInput", 
function (doinput) {
if (this.connected) throw  new IllegalStateException ("Already connected");
this.doInput = doinput;
}, "~B");
Clazz.defineMethod (c$, "getDoInput", 
function () {
return this.doInput;
});
Clazz.defineMethod (c$, "setDoOutput", 
function (dooutput) {
if (this.connected) throw  new IllegalStateException ("Already connected");
this.doOutput = dooutput;
}, "~B");
Clazz.defineMethod (c$, "getDoOutput", 
function () {
return this.doOutput;
});
Clazz.makeConstructor (c$, 
function (url) {
this.url = url;
}, "java.net.URL");
Clazz.defineMethod (c$, "getURL", 
function () {
return this.url;
});
Clazz.defineMethod (c$, "getInputStream", 
function () {
throw  new java.net.UnknownServiceException ("protocol doesn't support input");
});
Clazz.defineMethod (c$, "getOutputStream", 
function () {
throw  new java.net.UnknownServiceException ("protocol doesn't support output");
});
Clazz.defineMethod (c$, "setRequestProperty", 
function (key, value) {
if (this.connected) throw  new IllegalStateException ("Already connected");
if (key == null) throw  new NullPointerException ("key is null");
if (this.requests == null) this.requests =  new JU.Lst ();
for (var i = this.requests.size (); --i >= 0; ) if (this.requests.get (i)[0].equals (key)) {
this.requests.get (i)[1] = value;
return;
}
this.requests.addLast ( Clazz.newArray (-1, [key, value]));
}, "~S,~S");
});
