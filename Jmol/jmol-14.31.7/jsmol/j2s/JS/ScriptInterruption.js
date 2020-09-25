Clazz.declarePackage ("JS");
Clazz.load (["JS.ScriptException"], "JS.ScriptInterruption", null, function () {
c$ = Clazz.declareType (JS, "ScriptInterruption", JS.ScriptException);
Clazz.makeConstructor (c$, 
function (eval, why, millis) {
Clazz.superConstructor (this, JS.ScriptInterruption, [eval, why, "!", millis == -2147483648 || eval.vwr.autoExit]);
if (why.equals ("delay")) eval.delayScript (millis);
}, "JS.ScriptEval,~S,~N");
});
