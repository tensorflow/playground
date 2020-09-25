Clazz.declarePackage ("JS");
Clazz.load (["JS.JMenuItem"], "JS.JMenu", null, function () {
c$ = Clazz.declareType (JS, "JMenu", JS.JMenuItem);
Clazz.makeConstructor (c$, 
function () {
Clazz.superConstructor (this, JS.JMenu, ["mnu", 4]);
});
Clazz.defineMethod (c$, "getItemCount", 
function () {
return this.getComponentCount ();
});
Clazz.defineMethod (c$, "getItem", 
function (i) {
return this.getComponent (i);
}, "~N");
Clazz.overrideMethod (c$, "getPopupMenu", 
function () {
return this;
});
Clazz.overrideMethod (c$, "toHTML", 
function () {
return this.getMenuHTML ();
});
});
