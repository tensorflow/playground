Clazz.declarePackage ("java.net");
c$ = Clazz.decorateAsClass (function () {
this.path = null;
this.query = null;
this.ref = null;
Clazz.instantialize (this, arguments);
}, java.net, "Parts");
Clazz.makeConstructor (c$, 
function (file) {
var ind = file.indexOf ('#');
this.ref = ind < 0 ? null : file.substring (ind + 1);
file = ind < 0 ? file : file.substring (0, ind);
var q = file.lastIndexOf ('?');
if (q != -1) {
this.query = file.substring (q + 1);
this.path = file.substring (0, q);
} else {
this.path = file;
}}, "~S");
Clazz.defineMethod (c$, "getPath", 
function () {
return this.path;
});
Clazz.defineMethod (c$, "getQuery", 
function () {
return this.query;
});
Clazz.defineMethod (c$, "getRef", 
function () {
return this.ref;
});
