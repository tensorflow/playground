Clazz.declarePackage ("JS");
Clazz.load (["JS.JMenuItem"], "JS.JRadioButtonMenuItem", null, function () {
c$ = Clazz.decorateAsClass (function () {
this.isRadio = true;
Clazz.instantialize (this, arguments);
}, JS, "JRadioButtonMenuItem", JS.JMenuItem);
Clazz.makeConstructor (c$, 
function () {
Clazz.superConstructor (this, JS.JRadioButtonMenuItem, ["rad", 3]);
});
});
