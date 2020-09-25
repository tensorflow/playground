Clazz.declarePackage ("JS");
Clazz.load (null, "JS.ButtonGroup", ["JS.Component"], function () {
c$ = Clazz.decorateAsClass (function () {
this.id = null;
Clazz.instantialize (this, arguments);
}, JS, "ButtonGroup");
Clazz.makeConstructor (c$, 
function () {
this.id = JS.Component.newID ("bg");
});
Clazz.defineMethod (c$, "add", 
function (item) {
(item).htmlName = this.id;
}, "J.api.SC");
});
