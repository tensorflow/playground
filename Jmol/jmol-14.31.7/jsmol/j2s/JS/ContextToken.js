Clazz.declarePackage ("JS");
Clazz.load (["JS.T"], "JS.ContextToken", ["java.util.Hashtable", "JS.SV"], function () {
c$ = Clazz.decorateAsClass (function () {
this.contextVariables = null;
this.forVars = null;
this.name0 = null;
Clazz.instantialize (this, arguments);
}, JS, "ContextToken", JS.T);
c$.newContext = Clazz.defineMethod (c$, "newContext", 
function (isOpen) {
var ct = (isOpen ? JS.ContextToken.newCmd (1275335685, "{") : JS.ContextToken.newCmd (1275334681, "}"));
ct.intValue = 0;
return ct;
}, "~B");
c$.newCmd = Clazz.defineMethod (c$, "newCmd", 
function (tok, value) {
var ct =  new JS.ContextToken ();
ct.tok = tok;
ct.value = value;
return ct;
}, "~N,~O");
Clazz.defineMethod (c$, "addName", 
function (name) {
if (this.contextVariables == null) this.contextVariables =  new java.util.Hashtable ();
this.contextVariables.put (name, JS.SV.newS ("").setName (name));
}, "~S");
});
