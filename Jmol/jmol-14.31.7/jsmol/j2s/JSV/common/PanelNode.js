Clazz.declarePackage ("JSV.common");
Clazz.load (null, "JSV.common.PanelNode", ["JU.SB", "JSV.common.Parameters"], function () {
c$ = Clazz.decorateAsClass (function () {
this.treeNode = null;
this.source = null;
this.fileName = null;
this.jsvp = null;
this.id = null;
this.legend = null;
this.isSelected = false;
this.isView = false;
this.isSimulation = false;
this.frameTitle = null;
Clazz.instantialize (this, arguments);
}, JSV.common, "PanelNode");
Clazz.makeConstructor (c$, 
function (id, fileName, source, jsvp) {
this.id = id;
this.source = source;
this.fileName = fileName;
this.isSimulation = (source.getFilePath ().indexOf ("http://SIMULATION/") >= 0);
this.jsvp = jsvp;
if (jsvp != null) {
this.pd ().getSpectrumAt (0).setId (id);
this.frameTitle = jsvp.getTitle ();
}}, "~S,~S,JSV.source.JDXSource,JSV.api.JSVPanel");
Clazz.defineMethod (c$, "setTreeNode", 
function (node) {
this.treeNode = node;
}, "JSV.api.JSVTreeNode");
Clazz.defineMethod (c$, "getTreeNode", 
function () {
return this.treeNode;
});
Clazz.defineMethod (c$, "dispose", 
function () {
this.source.dispose ();
if (this.jsvp != null) this.jsvp.dispose ();
this.source = null;
this.jsvp = null;
this.legend = null;
});
Clazz.defineMethod (c$, "pd", 
function () {
return this.jsvp.getPanelData ();
});
Clazz.defineMethod (c$, "getSpectrum", 
function () {
return this.pd ().getSpectrum ();
});
Clazz.defineMethod (c$, "setLegend", 
function (legend) {
if (this.legend != null) this.legend.dispose ();
this.legend = legend;
return legend;
}, "JSV.dialog.JSVDialog");
Clazz.overrideMethod (c$, "toString", 
function () {
return ((this.id == null ? "" : this.id + ": ") + (this.frameTitle == null ? this.fileName : this.frameTitle));
});
c$.findSourceByNameOrId = Clazz.defineMethod (c$, "findSourceByNameOrId", 
function (id, panelNodes) {
for (var i = panelNodes.size (); --i >= 0; ) {
var node = panelNodes.get (i);
if (id.equals (node.id) || id.equals (node.source.getSpectra ().get (0).sourceID) || node.source.matchesFilePath (id)) return node.source;
}
for (var i = panelNodes.size (); --i >= 0; ) {
var node = panelNodes.get (i);
if (id.equals (node.fileName)) return node.source;
}
return null;
}, "~S,JU.Lst");
c$.findNodeById = Clazz.defineMethod (c$, "findNodeById", 
function (id, panelNodes) {
if (id != null) for (var i = panelNodes.size (); --i >= 0; ) if (id.equals (panelNodes.get (i).id) || id.equals (panelNodes.get (i).frameTitle)) return panelNodes.get (i);

return null;
}, "~S,JU.Lst");
c$.findNode = Clazz.defineMethod (c$, "findNode", 
function (jsvp, panelNodes) {
for (var i = panelNodes.size (); --i >= 0; ) if (panelNodes.get (i).jsvp === jsvp) return panelNodes.get (i);

return null;
}, "JSV.api.JSVPanel,JU.Lst");
c$.getSpectrumListAsString = Clazz.defineMethod (c$, "getSpectrumListAsString", 
function (panelNodes) {
var sb =  new JU.SB ();
for (var i = 0; i < panelNodes.size (); i++) {
var node = panelNodes.get (i);
if (!node.isView) sb.append (" ").append (node.id);
}
return sb.toString ().trim ();
}, "JU.Lst");
c$.isOpen = Clazz.defineMethod (c$, "isOpen", 
function (panelNodes, filePath) {
var pt = -1;
if (filePath != null) for (var i = panelNodes.size (); --i >= 0; ) {
if (panelNodes.get (i).source.matchesFilePath (filePath) || filePath.equals (panelNodes.get (i).frameTitle)) return pt;
}
return -1;
}, "JU.Lst,~S");
Clazz.defineMethod (c$, "setFrameTitle", 
function (name) {
this.frameTitle = name;
}, "~S");
c$.getLastFileFirstNode = Clazz.defineMethod (c$, "getLastFileFirstNode", 
function (panelNodes) {
var n = panelNodes.size ();
var node = (n == 0 ? null : panelNodes.get (n - 1));
for (var i = n - 1; --i >= 0; ) {
if (panelNodes.get (i).source !== node.source) break;
node = panelNodes.get (i);
}
return (node == null ? null : node.jsvp);
}, "JU.Lst");
Clazz.defineMethod (c$, "getInfo", 
function (key) {
var info = this.pd ().getInfo (false, key);
JSV.common.Parameters.putInfo (key, info, "panelId", this.id);
JSV.common.Parameters.putInfo (key, info, "panelFileName", this.fileName);
JSV.common.Parameters.putInfo (key, info, "panelSource", this.source.getFilePath ());
return info;
}, "~S");
});
