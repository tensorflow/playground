Clazz.declarePackage ("J.consolejs");
Clazz.load (["J.console.GenericConsole"], "J.consolejs.AppletConsole", null, function () {
c$ = Clazz.decorateAsClass (function () {
this.jsConsole = null;
Clazz.instantialize (this, arguments);
}, J.consolejs, "AppletConsole", J.console.GenericConsole);
Clazz.makeConstructor (c$, 
function () {
Clazz.superConstructor (this, J.consolejs.AppletConsole, []);
});
Clazz.overrideMethod (c$, "start", 
function (vwr) {
this.setViewer (vwr);
this.setLabels ();
this.displayConsole ();
}, "JV.Viewer");
Clazz.overrideMethod (c$, "layoutWindow", 
function (enabledButtons) {
{
this.jsConsole = new Jmol.Console.JSConsole(this);
}this.setTitle ();
}, "~S");
Clazz.overrideMethod (c$, "setTitle", 
function () {
if (this.jsConsole != null) this.jsConsole.setTitle (J.console.GenericConsole.getLabel ("title"));
});
Clazz.overrideMethod (c$, "setVisible", 
function (visible) {
this.jsConsole.setVisible (visible);
}, "~B");
Clazz.overrideMethod (c$, "setButton", 
function (text) {
{
return new Jmol.Console.Button(text);
}}, "~S");
Clazz.overrideMethod (c$, "dispose", 
function () {
this.setVisible (false);
});
Clazz.overrideMethod (c$, "isMenuItem", 
function (source) {
return false;
}, "~O");
Clazz.overrideMethod (c$, "getScriptEditor", 
function () {
return null;
});
Clazz.overrideMethod (c$, "nextFileName", 
function (stub, nTab) {
return null;
}, "~S,~N");
Clazz.overrideMethod (c$, "newJMenu", 
function (key) {
return null;
}, "~S");
Clazz.overrideMethod (c$, "newJMenuItem", 
function (key) {
return null;
}, "~S");
});
