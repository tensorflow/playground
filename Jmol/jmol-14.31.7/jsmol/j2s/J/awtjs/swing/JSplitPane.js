Clazz.declarePackage ("JS");
Clazz.load (["JS.JComponent"], "JS.JSplitPane", ["JU.SB", "JS.JComponentImp"], function () {
c$ = Clazz.decorateAsClass (function () {
this.isH = true;
this.split = 1;
this.right = null;
this.left = null;
Clazz.instantialize (this, arguments);
}, JS, "JSplitPane", JS.JComponent);
Clazz.makeConstructor (c$, 
function (split) {
Clazz.superConstructor (this, JS.JSplitPane, ["JSpP"]);
this.split = split;
this.isH = (split == 1);
}, "~N");
Clazz.defineMethod (c$, "setRightComponent", 
function (r) {
this.right =  new JS.JComponentImp (null);
this.right.add (r);
}, "JS.JComponent");
Clazz.defineMethod (c$, "setLeftComponent", 
function (l) {
this.left =  new JS.JComponentImp (null);
this.left.add (l);
}, "JS.JComponent");
Clazz.defineMethod (c$, "getSubcomponentWidth", 
function () {
var w = this.width;
if (w == 0) {
var wleft = this.left.getSubcomponentWidth ();
var wright = this.right.getSubcomponentWidth ();
if (wleft > 0 && wright > 0) {
if (this.isH) w = wleft + wright;
 else w = Math.max (wleft, wright);
}}return w;
});
Clazz.defineMethod (c$, "getSubcomponentHeight", 
function () {
var h = this.height;
if (h == 0) {
var hleft = this.left.getSubcomponentHeight ();
var hright = this.right.getSubcomponentHeight ();
if (hleft > 0 && hright > 0) {
if (this.isH) h = Math.max (hleft, hright);
 else h = hleft + hright;
}}return h;
});
Clazz.defineMethod (c$, "toHTML", 
function () {
if (this.left == null || this.right == null) return "";
var isH = (this.split == 1);
if (this.width == 0) this.width = this.getSubcomponentWidth ();
if (this.height == 0) this.height = this.getSubcomponentHeight ();
var sb =  new JU.SB ();
sb.append ("<div id='" + this.id + "' class='JSplitPane' style='" + this.getCSSstyle (100, 100) + "'>");
if (isH) sb.append ("<div id='" + this.id + "_left' style='width:50%;height:100%;position:absolute;top:0%;left:0%'>");
 else sb.append ("<div id='" + this.id + "_top' style='width:100%;height:50%;position:absolute;top:0%;left:0%'>");
sb.append (this.left.getComponents ()[0].toHTML ());
if (isH) sb.append ("</div><div id='" + this.id + "_right' style='width:50%;height:100%;position:absolute;top:0%;left:50%'>");
 else sb.append ("</div><div id='" + this.id + "_bottom' style='width:100%;height:50%;position:absolute;top:50%;left:0%'>");
sb.append (this.right.getComponents ()[0].toHTML ());
sb.append ("</div></div>\n");
return sb.toString ();
});
Clazz.defineStatics (c$,
"HORIZONTAL_SPLIT", 1);
});
