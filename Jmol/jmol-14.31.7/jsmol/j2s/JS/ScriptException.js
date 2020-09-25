Clazz.declarePackage ("JS");
Clazz.load (["java.lang.Exception"], "JS.ScriptException", null, function () {
c$ = Clazz.decorateAsClass (function () {
this.eval = null;
this.message = null;
this.untranslated = null;
this.isError = false;
Clazz.instantialize (this, arguments);
}, JS, "ScriptException", Exception);
Clazz.makeConstructor (c$, 
function (se, msg, untranslated, isError) {
this.eval = se;
this.message = msg;
this.isError = isError;
if (!isError) return;
this.eval.setException (this, msg, untranslated);
}, "JS.ScriptError,~S,~S,~B");
Clazz.defineMethod (c$, "getErrorMessageUntranslated", 
function () {
return this.untranslated;
});
Clazz.overrideMethod (c$, "getMessage", 
function () {
return this.message;
});
Clazz.overrideMethod (c$, "toString", 
function () {
return this.message;
});
});
