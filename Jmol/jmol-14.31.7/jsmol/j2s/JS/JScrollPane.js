Clazz.declarePackage ("JS");
Clazz.load (["JS.JComponent"], "JS.JScrollPane", ["JU.SB"], function () {
c$ = Clazz.declareType (JS, "JScrollPane", JS.JComponent);
Clazz.makeConstructor (c$, 
function (component) {
Clazz.superConstructor (this, JS.JScrollPane, ["JScP"]);
this.add (component);
}, "JS.JComponent");
Clazz.defineMethod (c$, "toHTML", 
function () {
var sb =  new JU.SB ();
sb.append ("\n<div id='" + this.id + "' class='JScrollPane' style='" + this.getCSSstyle (98, 98) + "overflow:auto'>\n");
if (this.list != null) {
var c = this.list.get (0);
sb.append (c.toHTML ());
}sb.append ("\n</div>\n");
return sb.toString ();
});
Clazz.overrideMethod (c$, "setMinimumSize", 
function (dimension) {
}, "JS.Dimension");
});
