Clazz.declarePackage ("J.export");
Clazz.load (["java.util.Hashtable"], "J.export.UseTable", null, function () {
c$ = Clazz.decorateAsClass (function () {
this.iObj = 0;
this.keyword = null;
this.term = '\0';
Clazz.instantialize (this, arguments);
}, J["export"], "UseTable", java.util.Hashtable);
Clazz.makeConstructor (c$, 
function (keyword) {
Clazz.superConstructor (this, J["export"].UseTable, []);
this.keyword = keyword;
this.term = keyword.charAt (keyword.length - 1);
}, "~S");
Clazz.defineMethod (c$, "getDef", 
function (key) {
if (this.containsKey (key)) return this.keyword + this.get (key) + this.term;
var id = "_" + (this.iObj++);
this.put (key, id);
return id;
}, "~S");
Clazz.defineMethod (c$, "getDefRet", 
function (key, ret) {
if ((ret[0] = this.get (key)) != null) return true;
this.put (key, ret[0] = "_" + key.charAt (0) + (this.iObj++));
return false;
}, "~S,~A");
});
