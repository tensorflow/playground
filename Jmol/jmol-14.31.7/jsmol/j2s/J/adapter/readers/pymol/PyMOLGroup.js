Clazz.declarePackage ("J.adapter.readers.pymol");
Clazz.load (["java.util.Hashtable", "JU.BS"], "J.adapter.readers.pymol.PyMOLGroup", null, function () {
c$ = Clazz.decorateAsClass (function () {
this.name = null;
this.objectNameID = null;
this.list = null;
this.object = null;
this.visible = true;
this.occluded = false;
this.bsAtoms = null;
this.firstAtom = 0;
this.type = 0;
this.parent = null;
Clazz.instantialize (this, arguments);
}, J.adapter.readers.pymol, "PyMOLGroup");
Clazz.prepareFields (c$, function () {
this.list =  new java.util.Hashtable ();
this.bsAtoms =  new JU.BS ();
});
Clazz.makeConstructor (c$, 
function (name) {
this.name = name;
}, "~S");
Clazz.defineMethod (c$, "addList", 
function (child) {
var group = this.list.get (child.name);
if (group != null) return;
this.list.put (child.name, child);
child.parent = this;
}, "J.adapter.readers.pymol.PyMOLGroup");
Clazz.defineMethod (c$, "set", 
function () {
if (this.parent != null) return;
});
Clazz.defineMethod (c$, "addGroupAtoms", 
function (bs) {
this.bsAtoms.or (bs);
if (this.parent != null) this.parent.addGroupAtoms (this.bsAtoms);
}, "JU.BS");
Clazz.overrideMethod (c$, "toString", 
function () {
return this.name;
});
});
