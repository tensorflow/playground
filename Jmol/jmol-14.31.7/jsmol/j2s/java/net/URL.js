Clazz.declarePackage ("java.net");
Clazz.load (["java.util.Hashtable"], "java.net.URL", ["java.lang.Character", "$.Error", "java.net.MalformedURLException"], function () {
c$ = Clazz.decorateAsClass (function () {
this.protocol = null;
this.host = null;
this.port = -1;
this.file = null;
this.query = null;
this.authority = null;
this.path = null;
this.userInfo = null;
this.ref = null;
this.handler = null;
this.$hashCode = -1;
Clazz.instantialize (this, arguments);
}, java.net, "URL");
Clazz.makeConstructor (c$, 
function (context, spec, handler) {
{
switch (arguments.length) {
case 1:
spec = context;context = handler = null;
break;
case 2:
handler = null;
break;
case 3:
if (context == null || Clazz.instanceOf(context, java.net.URL))
break;
default:
alert("java.net.URL constructor format not supported");
break;
}
context && context.valueOf && context.valueOf() == null && (context = null);
}var original = spec;
var i;
var limit;
var c;
var start = 0;
var newProtocol = null;
var aRef = false;
var isRelative = false;
try {
limit = spec.length;
while ((limit > 0) && (spec.charAt (limit - 1) <= ' ')) {
limit--;
}
while ((start < limit) && (spec.charAt (start) <= ' ')) {
start++;
}
if (spec.regionMatches (true, start, "url:", 0, 4)) {
start += 4;
}if (start < spec.length && spec.charAt (start) == '#') {
aRef = true;
}for (i = start; !aRef && (i < limit) && ((c = spec.charCodeAt (i)) != 47); i++) {
if (c == 58) {
var s = spec.substring (start, i).toLowerCase ();
if (this.isValidProtocol (s)) {
newProtocol = s;
start = i + 1;
}break;
}}
this.protocol = newProtocol;
if ((context != null) && ((newProtocol == null) || newProtocol.equalsIgnoreCase (context.protocol))) {
if (handler == null) {
handler = context.handler;
}if (context.path != null && context.path.startsWith ("/")) newProtocol = null;
if (newProtocol == null) {
this.protocol = context.protocol;
this.authority = context.authority;
this.userInfo = context.userInfo;
this.host = context.host;
this.port = context.port;
this.file = context.file;
this.path = context.path;
isRelative = true;
}}if (this.protocol == null) {
throw  new java.net.MalformedURLException ("no protocol: " + original);
}if (handler == null && (handler = java.net.URL.getURLStreamHandler (this.protocol)) == null) {
throw  new java.net.MalformedURLException ("unknown protocol: " + this.protocol);
}this.handler = handler;
i = spec.indexOf ('#', start);
if (i >= 0) {
this.ref = spec.substring (i + 1, limit);
limit = i;
}if (isRelative && start == limit) {
this.query = context.query;
if (this.ref == null) {
this.ref = context.ref;
}}handler.parseURL (this, spec, start, limit);
} catch (e$$) {
if (Clazz.exceptionOf (e$$, java.net.MalformedURLException)) {
var e = e$$;
{
throw e;
}
} else if (Clazz.exceptionOf (e$$, Exception)) {
var e = e$$;
{
var exception =  new java.net.MalformedURLException (e.getMessage ());
exception.initCause (e);
throw exception;
}
} else {
throw e$$;
}
}
}, "java.net.URL,~S,java.net.URLStreamHandler");
Clazz.defineMethod (c$, "isValidProtocol", 
 function (protocol) {
var len = protocol.length;
if (len < 1) return false;
var c = protocol.charAt (0);
if (!Character.isLetter (c)) return false;
for (var i = 1; i < len; i++) {
c = protocol.charAt (i);
if (!Character.isLetterOrDigit (c) && c != '.' && c != '+' && c != '-') {
return false;
}}
return true;
}, "~S");
Clazz.defineMethod (c$, "set5", 
function (protocol, host, port, file, ref) {
{
this.protocol = protocol;
this.host = host;
this.authority = port == -1 ? host : host + ":" + port;
this.port = port;
this.file = file;
this.ref = ref;
this.$hashCode = -1;
var q = file.lastIndexOf ('?');
if (q != -1) {
this.query = file.substring (q + 1);
this.path = file.substring (0, q);
} else this.path = file;
}}, "~S,~S,~N,~S,~S");
Clazz.defineMethod (c$, "set", 
function (protocol, host, port, authority, userInfo, path, query, ref) {
{
this.protocol = protocol;
this.host = host;
this.port = port;
this.file = query == null ? path : path + "?" + query;
this.userInfo = userInfo;
this.path = path;
this.ref = ref;
this.$hashCode = -1;
this.query = query;
this.authority = authority;
}}, "~S,~S,~N,~S,~S,~S,~S,~S");
Clazz.defineMethod (c$, "getQuery", 
function () {
return this.query;
});
Clazz.defineMethod (c$, "getPath", 
function () {
return this.path;
});
Clazz.defineMethod (c$, "getUserInfo", 
function () {
return this.userInfo;
});
Clazz.defineMethod (c$, "getAuthority", 
function () {
return this.authority;
});
Clazz.defineMethod (c$, "getPort", 
function () {
return this.port;
});
Clazz.defineMethod (c$, "getDefaultPort", 
function () {
return this.handler.getDefaultPort ();
});
Clazz.defineMethod (c$, "getProtocol", 
function () {
return this.protocol;
});
Clazz.defineMethod (c$, "getHost", 
function () {
return this.host;
});
Clazz.defineMethod (c$, "getFile", 
function () {
return this.file;
});
Clazz.defineMethod (c$, "getRef", 
function () {
return this.ref;
});
Clazz.overrideMethod (c$, "equals", 
function (obj) {
if (!(Clazz.instanceOf (obj, java.net.URL))) return false;
var u2 = obj;
return this.handler.equals2 (this, u2);
}, "~O");
Clazz.overrideMethod (c$, "hashCode", 
function () {
if (this.$hashCode != -1) return this.$hashCode;
this.$hashCode = this.handler.hashCode (this);
return this.$hashCode;
});
Clazz.defineMethod (c$, "sameFile", 
function (other) {
return this.handler.sameFile (this, other);
}, "java.net.URL");
Clazz.overrideMethod (c$, "toString", 
function () {
return this.toExternalForm ();
});
Clazz.defineMethod (c$, "toExternalForm", 
function () {
return this.handler.toExternalForm (this);
});
Clazz.defineMethod (c$, "openConnection", 
function () {
return this.handler.openConnection (this);
});
Clazz.defineMethod (c$, "openStream", 
function () {
return this.openConnection ().getInputStream ();
});
Clazz.defineMethod (c$, "getContent", 
function () {
return this.openConnection ().getInputStream ();
});
c$.setURLStreamHandlerFactory = Clazz.defineMethod (c$, "setURLStreamHandlerFactory", 
function (fac) {
{
if (java.net.URL.factory != null) {
throw  new Error ("factory already defined");
}var security = System.getSecurityManager ();
if (security != null) {
security.checkSetFactory ();
}java.net.URL.handlers.clear ();
java.net.URL.factory = fac;
}}, "java.net.URLStreamHandlerFactory");
c$.getURLStreamHandler = Clazz.defineMethod (c$, "getURLStreamHandler", 
function (protocol) {
var handler = java.net.URL.handlers.get (protocol);
if (handler == null) {
if (java.net.URL.factory != null) {
handler = java.net.URL.factory.createURLStreamHandler (protocol);
}}return handler;
}, "~S");
Clazz.defineStatics (c$,
"factory", null);
c$.handlers = c$.prototype.handlers =  new java.util.Hashtable ();
c$.streamHandlerLock = c$.prototype.streamHandlerLock =  new Clazz._O ();
});
