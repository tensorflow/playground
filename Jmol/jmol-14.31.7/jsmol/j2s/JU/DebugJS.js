Clazz.declarePackage ("JU");
c$ = Clazz.declareType (JU, "DebugJS");
c$._ = Clazz.defineMethod (c$, "_", 
function (msg) {
{
if (Clazz._debugging) {
debugger;
}
}}, "~S");
