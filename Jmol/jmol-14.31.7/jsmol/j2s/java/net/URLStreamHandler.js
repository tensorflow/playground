Clazz.declarePackage ("java.net");
Clazz.load (null, "java.net.URLStreamHandler", ["java.lang.IllegalArgumentException", "$.SecurityException", "$.UnsupportedOperationException"], function () {
c$ = Clazz.declareType (java.net, "URLStreamHandler");
Clazz.defineMethod (c$, "openConnectionProxy", 
function (u, p) {
throw  new UnsupportedOperationException ("Method not implemented.");
}, "java.net.URL,java.net.Proxy");
Clazz.defineMethod (c$, "parseURL", 
function (u, spec, start, limit) {
var protocol = u.getProtocol ();
var authority = u.getAuthority ();
var userInfo = u.getUserInfo ();
var host = u.getHost ();
var port = u.getPort ();
var path = u.getPath ();
var query = u.getQuery ();
var ref = u.getRef ();
var isRelPath = false;
var queryOnly = false;
if (start < limit) {
var queryStart = spec.indexOf ('?');
queryOnly = queryStart == start;
if ((queryStart != -1) && (queryStart < limit)) {
query = spec.substring (queryStart + 1, limit);
if (limit > queryStart) limit = queryStart;
spec = spec.substring (0, queryStart);
}}var i = 0;
var isUNCName = (start <= limit - 4) && (spec.charAt (start) == '/') && (spec.charAt (start + 1) == '/') && (spec.charAt (start + 2) == '/') && (spec.charAt (start + 3) == '/');
if (!isUNCName && (start <= limit - 2) && (spec.charAt (start) == '/') && (spec.charAt (start + 1) == '/')) {
start += 2;
i = spec.indexOf ('/', start);
if (i < 0) {
i = spec.indexOf ('?', start);
if (i < 0) i = limit;
}host = authority = spec.substring (start, i);
var ind = authority.indexOf ('@');
if (ind != -1) {
userInfo = authority.substring (0, ind);
host = authority.substring (ind + 1);
} else {
userInfo = null;
}if (host != null) {
if (host.length > 0 && (host.charAt (0) == '[')) {
throw  new IllegalArgumentException ("Invalid host: " + host);
}ind = host.indexOf (':');
port = -1;
if (ind >= 0) {
if (host.length > (ind + 1)) {
port = Integer.parseInt (host.substring (ind + 1));
}host = host.substring (0, ind);
}} else {
host = "";
}if (port < -1) throw  new IllegalArgumentException ("Invalid port number :" + port);
start = i;
if (authority.length > 0) path = "";
}if (host == null) {
host = "";
}if (start < limit) {
if (spec.charAt (start) == '/') {
path = spec.substring (start, limit);
} else if (path != null && path.length > 0) {
isRelPath = true;
var ind = path.lastIndexOf ('/');
var seperator = "";
if (ind == -1 && authority != null) seperator = "/";
path = path.substring (0, ind + 1) + seperator + spec.substring (start, limit);
} else {
var seperator = (authority != null) ? "/" : "";
path = seperator + spec.substring (start, limit);
}} else if (queryOnly && path != null) {
var ind = path.lastIndexOf ('/');
if (ind < 0) ind = 0;
path = path.substring (0, ind) + "/";
}if (path == null) path = "";
if (isRelPath) {
while ((i = path.indexOf ("/./")) >= 0) {
path = path.substring (0, i) + path.substring (i + 2);
}
i = 0;
while ((i = path.indexOf ("/../", i)) >= 0) {
if (i > 0 && (limit = path.lastIndexOf ('/', i - 1)) >= 0 && (path.indexOf ("/../", limit) != 0)) {
path = path.substring (0, limit) + path.substring (i + 3);
i = 0;
} else {
i = i + 3;
}}
while (path.endsWith ("/..")) {
i = path.indexOf ("/..");
if ((limit = path.lastIndexOf ('/', i - 1)) >= 0) {
path = path.substring (0, limit + 1);
} else {
break;
}}
if (path.startsWith ("./") && path.length > 2) path = path.substring (2);
if (path.endsWith ("/.")) path = path.substring (0, path.length - 1);
}this.setURL (u, protocol, host, port, authority, userInfo, path, query, ref);
}, "java.net.URL,~S,~N,~N");
Clazz.defineMethod (c$, "getDefaultPort", 
function () {
return -1;
});
Clazz.defineMethod (c$, "equals2", 
function (u1, u2) {
var ref1 = u1.getRef ();
var ref2 = u2.getRef ();
return (ref1 === ref2 || (ref1 != null && ref1.equals (ref2))) && this.sameFile (u1, u2);
}, "java.net.URL,java.net.URL");
Clazz.defineMethod (c$, "hashCode", 
function (u) {
var h = 0;
var protocol = u.getProtocol ();
if (protocol != null) h += protocol.hashCode ();
h += u.toString ().hashCode ();
var file = u.getFile ();
if (file != null) h += file.hashCode ();
if (u.getPort () == -1) h += this.getDefaultPort ();
 else h += u.getPort ();
var ref = u.getRef ();
if (ref != null) h += ref.hashCode ();
return h;
}, "java.net.URL");
Clazz.defineMethod (c$, "sameFile", 
function (u1, u2) {
if (!((u1.getProtocol () === u2.getProtocol ()) || (u1.getProtocol () != null && u1.getProtocol ().equalsIgnoreCase (u2.getProtocol ())))) return false;
if (!(u1.getFile () === u2.getFile () || (u1.getFile () != null && u1.getFile ().equals (u2.getFile ())))) return false;
var port1;
var port2;
port1 = (u1.getPort () != -1) ? u1.getPort () : u1.handler.getDefaultPort ();
port2 = (u2.getPort () != -1) ? u2.getPort () : u2.handler.getDefaultPort ();
if (port1 != port2) return false;
if (!this.hostsEqual (u1, u2)) return false;
return true;
}, "java.net.URL,java.net.URL");
Clazz.defineMethod (c$, "hostsEqual", 
function (u1, u2) {
if (u1.getHost () != null && u2.getHost () != null) return u1.getHost ().equalsIgnoreCase (u2.getHost ());
return u1.getHost () == null && u2.getHost () == null;
}, "java.net.URL,java.net.URL");
Clazz.defineMethod (c$, "toExternalForm", 
function (u) {
return "";
}, "java.net.URL");
Clazz.defineMethod (c$, "setURL", 
function (u, protocol, host, port, authority, userInfo, path, query, ref) {
if (this !== u.handler) {
throw  new SecurityException ("handler for url different from this handler");
}u.set (u.getProtocol (), host, port, authority, userInfo, path, query, ref);
}, "java.net.URL,~S,~S,~N,~S,~S,~S,~S,~S");
Clazz.defineMethod (c$, "setURLDeprecated", 
function (u, protocol, host, port, file, ref) {
var authority = null;
var userInfo = null;
if (host != null && host.length != 0) {
authority = (port == -1) ? host : host + ":" + port;
var at = host.lastIndexOf ('@');
if (at != -1) {
userInfo = host.substring (0, at);
host = host.substring (at + 1);
}}var path = null;
var query = null;
if (file != null) {
var q = file.lastIndexOf ('?');
if (q != -1) {
query = file.substring (q + 1);
path = file.substring (0, q);
} else path = file;
}this.setURL (u, protocol, host, port, authority, userInfo, path, query, ref);
}, "java.net.URL,~S,~S,~N,~S,~S");
});
