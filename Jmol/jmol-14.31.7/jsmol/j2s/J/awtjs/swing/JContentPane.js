Clazz.declarePackage ("JS");
Clazz.load (["JS.JComponent"], "JS.JContentPane", ["JU.SB"], function () {
c$ = Clazz.declareType (JS, "JContentPane", JS.JComponent);
Clazz.makeConstructor (c$, 
function () {
Clazz.superConstructor (this, JS.JContentPane, ["JCP"]);
});
Clazz.defineMethod (c$, "toHTML", 
function () {
var sb =  new JU.SB ();
sb.append ("\n<div id='" + this.id + "' class='JContentPane' style='" + this.getCSSstyle (100, 100) + "'>\n");
if (this.list != null) for (var i = 0; i < this.list.size (); i++) sb.append (this.list.get (i).toHTML ());

sb.append ("\n</div>\n");
return sb.toString ();
});
});
