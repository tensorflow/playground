Clazz.declarePackage ("JSV.dialog");
Clazz.load (["JSV.dialog.JSVDialog"], "JSV.dialog.ViewsDialog", ["JU.Lst", "$.PT", "$.SB", "JSV.common.Annotation"], function () {
c$ = Clazz.decorateAsClass (function () {
this.treeNodes = null;
this.checkBoxes = null;
this.closeSelectedButton = null;
this.combineSelectedButton = null;
this.viewSelectedButton = null;
this.checking = false;
Clazz.instantialize (this, arguments);
}, JSV.dialog, "ViewsDialog", JSV.dialog.JSVDialog);
Clazz.makeConstructor (c$, 
function () {
Clazz.superConstructor (this, JSV.dialog.ViewsDialog, []);
this.type = JSV.common.Annotation.AType.Views;
});
Clazz.overrideMethod (c$, "getPosXY", 
function () {
return JSV.dialog.ViewsDialog.posXY;
});
Clazz.defineMethod (c$, "addUniqueControls", 
function () {
this.checkBoxes =  new JU.Lst ();
this.treeNodes =  new JU.Lst ();
this.dialog.addButton ("btnSelectAll", "Select All");
this.dialog.addButton ("btnSelectNone", "Select None");
this.txt2 = this.dialog.addTextField ("txtOffset", "Offset", "" + this.vwr.parameters.viewOffset, "%", null, true);
this.viewSelectedButton = this.dialog.addButton ("btnViewSelected", "View Selected");
this.combineSelectedButton = this.dialog.addButton ("btnCombineSelected", "Combine Selected");
this.closeSelectedButton = this.dialog.addButton ("btnCloseSelected", "Close Selected");
this.dialog.addButton ("btnDone", "Done");
this.dialog.setPreferredSize (800, 350);
this.txt1 = this.dialog.addCheckBox (null, null, 0, false);
this.addCheckBoxes (this.vwr.spectraTree.getRootNode (), 0, true);
this.addCheckBoxes (this.vwr.spectraTree.getRootNode (), 0, false);
});
Clazz.defineMethod (c$, "addCheckBoxes", 
 function (rootNode, level, isViews) {
var enume = rootNode.children ();
while (enume.hasMoreElements ()) {
var treeNode = enume.nextElement ();
var node = treeNode.getPanelNode ();
if (node.isView != isViews) continue;
var title = node.toString ();
if (title.indexOf ("\n") >= 0) title = title.substring (0, title.indexOf ('\n'));
var name = "chkBox" + this.treeNodes.size ();
var cb = this.dialog.addCheckBox (name, title, level, node.isSelected);
treeNode.setIndex (this.treeNodes.size ());
this.treeNodes.addLast (treeNode);
this.checkBoxes.addLast (cb);
this.addCheckBoxes (treeNode, level + 1, isViews);
}
}, "JSV.api.JSVTreeNode,~N,~B");
Clazz.overrideMethod (c$, "checkEnables", 
function () {
var n = 0;
for (var i = 0; i < this.checkBoxes.size (); i++) {
if (this.dialog.isSelected (this.checkBoxes.get (i)) && this.treeNodes.get (i).getPanelNode ().jsvp != null) {
n++;
}}
System.out.println ("viewsdialog n=" + n);
this.dialog.setEnabled (this.closeSelectedButton, n > 0);
this.dialog.setEnabled (this.combineSelectedButton, n > 1);
this.dialog.setEnabled (this.viewSelectedButton, n == 1);
});
Clazz.defineMethod (c$, "check", 
function (name) {
var i = JU.PT.parseInt (name.substring (name.indexOf ("_") + 1));
var node = this.treeNodes.get (i);
var cb = this.checkBoxes.get (i);
var isSelected = this.dialog.isSelected (cb);
if (node.getPanelNode ().jsvp == null) {
if (!this.checking && isSelected && this.dialog.getText (cb).startsWith ("Overlay")) {
this.checking = true;
this.selectAll (false);
this.dialog.setSelected (cb, true);
node.getPanelNode ().isSelected = true;
this.checking = false;
}var enume = node.children ();
while (enume.hasMoreElements ()) {
var treeNode = enume.nextElement ();
this.dialog.setSelected (this.checkBoxes.get (treeNode.getIndex ()), isSelected);
treeNode.getPanelNode ().isSelected = isSelected;
node.getPanelNode ().isSelected = isSelected;
}
} else {
node.getPanelNode ().isSelected = isSelected;
}if (isSelected) for (i = this.treeNodes.size (); --i >= 0; ) if (this.treeNodes.get (i).getPanelNode ().isView != node.getPanelNode ().isView) {
this.dialog.setSelected (this.checkBoxes.get (this.treeNodes.get (i).getIndex ()), false);
this.treeNodes.get (i).getPanelNode ().isSelected = false;
}
this.checkEnables ();
}, "~S");
Clazz.defineMethod (c$, "selectAll", 
function (mode) {
for (var i = this.checkBoxes.size (); --i >= 0; ) {
this.dialog.setSelected (this.checkBoxes.get (i), mode);
this.treeNodes.get (i).getPanelNode ().isSelected = mode;
}
this.checkEnables ();
}, "~B");
Clazz.defineMethod (c$, "combineSelected", 
function () {
});
Clazz.defineMethod (c$, "viewSelected", 
function () {
var sb =  new JU.SB ();
var thisNode = null;
var n = 0;
for (var i = 0; i < this.checkBoxes.size (); i++) {
var cb = this.checkBoxes.get (i);
var node = this.treeNodes.get (i).getPanelNode ();
if (this.dialog.isSelected (cb) && node.jsvp != null) {
if (node.isView) {
thisNode = node;
n = 2;
break;
}n++;
var label = this.dialog.getText (cb);
sb.append (" ").append (label.substring (0, label.indexOf (":")));
}}
var script = null;
if (n > 1) {
this.eventApply ();
script = "STACKOFFSETY " + this.vwr.parameters.viewOffset;
}if (thisNode == null) {
this.vwr.execView (sb.toString ().trim (), false);
this.layoutDialog ();
} else {
this.vwr.setNode (thisNode);
}if (script != null) this.vwr.runScript (script);
});
Clazz.defineMethod (c$, "closeSelected", 
function () {
this.vwr.runScript ("close !selected");
this.layoutDialog ();
});
Clazz.overrideMethod (c$, "callback", 
function (id, msg) {
if (id.equals ("btnSelectAll")) {
this.selectAll (true);
} else if (id.equals ("btnSelectNone")) {
this.selectAll (false);
} else if (id.equals ("btnViewSelected")) {
this.viewSelected ();
} else if (id.equals ("btnCombineSelected")) {
this.viewSelected ();
} else if (id.equals ("btnCloseSelected")) {
this.closeSelected ();
} else if (id.equals ("btnDone")) {
this.viewSelected ();
this.dispose ();
this.done ();
} else if (id.equals ("txtOffset")) {
this.eventApply ();
this.viewSelected ();
} else if (id.startsWith ("chk")) {
this.checkEnables ();
} else {
return this.callbackAD (id, msg);
}return true;
}, "~S,~S");
Clazz.overrideMethod (c$, "applyFromFields", 
function () {
this.apply ( Clazz.newArray (-1, [this.dialog.getText (this.txt2)]));
});
Clazz.defineStatics (c$,
"posXY",  Clazz.newIntArray (-1, [-2147483648, 0]));
});
