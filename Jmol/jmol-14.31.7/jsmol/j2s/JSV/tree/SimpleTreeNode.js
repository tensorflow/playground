Clazz.declarePackage ("JSV.tree");
Clazz.load (["JSV.api.JSVTreeNode"], "JSV.tree.SimpleTreeNode", ["JU.Lst", "JSV.tree.SimpleTreeEnumeration"], function () {
c$ = Clazz.decorateAsClass (function () {
this.panelNode = null;
this.index = 0;
this.prevNode = null;
this.$children = null;
this.text = null;
Clazz.instantialize (this, arguments);
}, JSV.tree, "SimpleTreeNode", null, JSV.api.JSVTreeNode);
Clazz.makeConstructor (c$, 
function (text, panelNode) {
this.text = text;
this.panelNode = panelNode;
this.$children =  new JU.Lst ();
}, "~S,JSV.common.PanelNode");
Clazz.overrideMethod (c$, "getPanelNode", 
function () {
return this.panelNode;
});
Clazz.overrideMethod (c$, "getIndex", 
function () {
return this.index;
});
Clazz.overrideMethod (c$, "setIndex", 
function (index) {
this.index = index;
}, "~N");
Clazz.overrideMethod (c$, "children", 
function () {
return  new JSV.tree.SimpleTreeEnumeration (this);
});
Clazz.overrideMethod (c$, "getChildCount", 
function () {
return this.$children.size ();
});
Clazz.overrideMethod (c$, "getPath", 
function () {
var o =  new JU.Lst ();
var node = this;
o.addLast (node);
while ((node = node.prevNode) != null) o.add (0, node);

return o.toArray ();
});
Clazz.overrideMethod (c$, "isLeaf", 
function () {
return (this.prevNode != null && this.prevNode.prevNode != null);
});
Clazz.overrideMethod (c$, "toString", 
function () {
return this.text;
});
});
