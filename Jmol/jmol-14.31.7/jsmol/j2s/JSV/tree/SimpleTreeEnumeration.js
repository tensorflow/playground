Clazz.declarePackage ("JSV.tree");
Clazz.load (["java.util.Enumeration"], "JSV.tree.SimpleTreeEnumeration", null, function () {
c$ = Clazz.decorateAsClass (function () {
this.node = null;
this.pt = 0;
Clazz.instantialize (this, arguments);
}, JSV.tree, "SimpleTreeEnumeration", null, java.util.Enumeration);
Clazz.makeConstructor (c$, 
function (jsTreeNode) {
this.node = jsTreeNode;
}, "JSV.tree.SimpleTreeNode");
Clazz.overrideMethod (c$, "hasMoreElements", 
function () {
return (this.pt < this.node.$children.size ());
});
Clazz.overrideMethod (c$, "nextElement", 
function () {
return this.node.$children.get (this.pt++);
});
});
