Clazz.declarePackage ("JSV.tree");
Clazz.load (["JSV.api.JSVTree"], "JSV.tree.SimpleTree", ["JSV.common.JSVFileManager", "$.PanelNode", "JSV.tree.SimpleTreeModel", "$.SimpleTreeNode", "$.SimpleTreePath"], function () {
c$ = Clazz.decorateAsClass (function () {
this.si = null;
this.rootNode = null;
this.spectraTreeModel = null;
this.vwr = null;
this.selectedPath = null;
Clazz.instantialize (this, arguments);
}, JSV.tree, "SimpleTree", null, JSV.api.JSVTree);
Clazz.overrideMethod (c$, "getRootNode", 
function () {
return this.rootNode;
});
Clazz.makeConstructor (c$, 
function (viewer) {
this.vwr = viewer;
this.rootNode =  new JSV.tree.SimpleTreeNode ("Spectra", null);
this.spectraTreeModel =  new JSV.tree.SimpleTreeModel (this.rootNode);
}, "JSV.common.JSViewer");
Clazz.defineMethod (c$, "valueChanged", 
function () {
this.vwr.selectedTreeNode (this.getLastSelectedPathComponent ());
});
Clazz.defineMethod (c$, "getLastSelectedPathComponent", 
 function () {
return (this.selectedPath == null ? null : this.selectedPath.getLastPathComponent ());
});
Clazz.overrideMethod (c$, "setSelectedPanel", 
function (si, jsvp) {
if (jsvp != null) {
var treeNode = JSV.common.PanelNode.findNode (jsvp, this.vwr.panelNodes).treeNode;
this.setSelectionPath (this.vwr.spectraTree.newTreePath (treeNode.getPath ()));
}}, "JSV.api.ScriptInterface,JSV.api.JSVPanel");
Clazz.defineMethod (c$, "setSelectionPath", 
 function (newTreePath) {
this.selectedPath = newTreePath;
this.valueChanged ();
}, "JSV.api.JSVTreePath");
Clazz.overrideMethod (c$, "createTree", 
function (fileCount, source, panels) {
var tree = this.vwr.spectraTree;
var rootNode = tree.getRootNode ();
var panelNodes = this.vwr.panelNodes;
var fileName = JSV.common.JSVFileManager.getTagName (source.getFilePath ());
var panelNode =  new JSV.common.PanelNode (null, fileName, source, null);
var fileNode =  new JSV.tree.SimpleTreeNode (fileName, panelNode);
panelNode.setTreeNode (fileNode);
tree.spectraTreeModel.insertNodeInto (fileNode, rootNode, rootNode.getChildCount ());
for (var i = 0; i < panels.length; i++) {
var jsvp = panels[i];
var id = fileCount + "." + (i + 1);
panelNode =  new JSV.common.PanelNode (id, fileName, source, jsvp);
var treeNode =  new JSV.tree.SimpleTreeNode (panelNode.toString (), panelNode);
panelNode.setTreeNode (treeNode);
panelNodes.addLast (panelNode);
tree.spectraTreeModel.insertNodeInto (treeNode, fileNode, fileNode.getChildCount ());
}
this.vwr.selectFrameNode (panels[0]);
return fileNode;
}, "~N,JSV.source.JDXSource,~A");
Clazz.overrideMethod (c$, "setPath", 
function (path) {
this.setSelectionPath (path);
}, "JSV.api.JSVTreePath");
Clazz.defineMethod (c$, "newTreePath", 
function (path) {
return  new JSV.tree.SimpleTreePath (path);
}, "~A");
Clazz.overrideMethod (c$, "deleteNodes", 
function (toDelete) {
for (var i = 0; i < toDelete.size (); i++) {
this.spectraTreeModel.removeNodeFromParent (toDelete.get (i));
}
}, "JU.Lst");
});
