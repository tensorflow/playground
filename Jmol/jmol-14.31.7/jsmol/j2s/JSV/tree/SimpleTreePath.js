Clazz.declarePackage ("JSV.tree");
Clazz.load (["JSV.api.JSVTreePath"], "JSV.tree.SimpleTreePath", null, function () {
c$ = Clazz.decorateAsClass (function () {
this.path = null;
Clazz.instantialize (this, arguments);
}, JSV.tree, "SimpleTreePath", null, JSV.api.JSVTreePath);
Clazz.makeConstructor (c$, 
function (path) {
this.path = path;
}, "~A");
Clazz.overrideMethod (c$, "getLastPathComponent", 
function () {
return (this.path == null || this.path.length == 0 ? null : this.path[this.path.length - 1]);
});
});
