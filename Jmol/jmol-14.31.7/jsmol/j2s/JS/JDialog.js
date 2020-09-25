Clazz.declarePackage ("JS");
Clazz.load (["JS.Container"], "JS.JDialog", ["JU.SB", "JS.Color", "$.JContentPane"], function () {
c$ = Clazz.decorateAsClass (function () {
this.defaultWidth = 600;
this.defaultHeight = 300;
this.contentPane = null;
this.title = null;
this.html = null;
this.zIndex = 9000;
this.loc = null;
Clazz.instantialize (this, arguments);
}, JS, "JDialog", JS.Container);
Clazz.defineMethod (c$, "setZIndex", 
function (zIndex) {
this.zIndex = zIndex;
}, "~N");
Clazz.makeConstructor (c$, 
function () {
Clazz.superConstructor (this, JS.JDialog, ["JD"]);
this.add (this.contentPane =  new JS.JContentPane ());
this.setBackground (JS.Color.get3 (210, 210, 240));
this.contentPane.setBackground (JS.Color.get3 (230, 230, 230));
});
Clazz.defineMethod (c$, "setLocation", 
function (loc) {
this.loc = loc;
}, "~A");
Clazz.defineMethod (c$, "getContentPane", 
function () {
return this.contentPane;
});
Clazz.defineMethod (c$, "setTitle", 
function (title) {
this.title = title;
}, "~S");
Clazz.defineMethod (c$, "pack", 
function () {
this.html = null;
});
Clazz.defineMethod (c$, "validate", 
function () {
this.html = null;
});
Clazz.defineMethod (c$, "setVisible", 
function (tf) {
if (tf && this.html == null) this.setDialog ();
Clazz.superCall (this, JS.JDialog, "setVisible", [tf]);
if (tf) this.toFront ();
}, "~B");
Clazz.defineMethod (c$, "dispose", 
function () {
{
{
SwingController.dispose(this);
}}});
Clazz.overrideMethod (c$, "repaint", 
function () {
this.setDialog ();
});
Clazz.defineMethod (c$, "setDialog", 
 function () {
this.html = this.toHTML ();
{
SwingController.setDialog(this);
}});
Clazz.overrideMethod (c$, "toHTML", 
function () {
this.renderWidth = Math.max (this.width, this.getSubcomponentWidth ());
if (this.renderWidth == 0) this.renderWidth = this.defaultWidth;
this.renderHeight = Math.max (this.height, this.contentPane.getSubcomponentHeight ());
if (this.renderHeight == 0) this.renderHeight = this.defaultHeight;
var h = this.renderHeight - 25;
var sb =  new JU.SB ();
sb.append ("\n<div id='" + this.id + "' class='JDialog' style='" + this.getCSSstyle (0, 0) + "z-index:" + this.zIndex + ";position:relative;top:0px;left:0px;reize:both;'>\n");
sb.append ("\n<div id='" + this.id + "_title' class='JDialogTitle' style='width:100%;height:25px;padding:5px 5px 5px 5px;height:" + 25 + "px'>" + "<span style='text-align:center;'>" + this.title + "</span><span style='position:absolute;text-align:right;right:1px;'>" + "<input type=button id='" + this.id + "_closer' onclick='SwingController.windowClosing(this)' value='x' /></span></div>\n");
sb.append ("\n<div id='" + this.id + "_body' class='JDialogBody' style='width:100%;height:" + h + "px;" + "position: relative;left:0px;top:0px'>\n");
sb.append (this.contentPane.toHTML ());
sb.append ("\n</div></div>\n");
return sb.toString ();
});
Clazz.defineMethod (c$, "toFront", 
function () {
{
SwingController.setFront(this);
}});
Clazz.defineStatics (c$,
"headerHeight", 25);
});
