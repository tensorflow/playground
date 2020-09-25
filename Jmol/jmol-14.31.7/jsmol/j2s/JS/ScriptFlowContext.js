Clazz.declarePackage ("JS");
Clazz.load (null, "JS.ScriptFlowContext", ["JS.ScriptCompiler"], function () {
c$ = Clazz.decorateAsClass (function () {
this.compiler = null;
this.token = null;
this.pt0 = 0;
this.ptDefault = 0;
this.$function = null;
this.$var = null;
this.parent = null;
this.lineStart = 0;
this.commandStart = 0;
this.ptLine = 0;
this.ptCommand = 0;
this.forceEndIf = true;
this.ident = null;
this.addLine = 0;
this.tok0 = 0;
this.ichCommand = 0;
this.line0 = 0;
Clazz.instantialize (this, arguments);
}, JS, "ScriptFlowContext");
Clazz.makeConstructor (c$, 
function (compiler, token, pt0, parent, ich, line0) {
this.compiler = compiler;
this.token = token;
this.tok0 = token.tok;
this.ident = token.value;
this.pt0 = pt0;
this.line0 = line0;
this.parent = parent;
this.ichCommand = ich;
this.lineStart = this.ptLine = this.compiler.lineCurrent;
this.commandStart = this.ptCommand = this.compiler.iCommand;
}, "JS.ScriptCompiler,JS.ContextToken,~N,JS.ScriptFlowContext,~N,~N");
Clazz.defineMethod (c$, "getBreakableContext", 
function (nLevelsUp) {
var f = this;
while (f != null && (!JS.ScriptCompiler.isBreakableContext (f.token.tok) || nLevelsUp-- > 0)) f = f.parent;

return f;
}, "~N");
Clazz.defineMethod (c$, "checkForceEndIf", 
function (offset) {
if (this.ptCommand == this.compiler.iCommand && this.addLine > 0) this.addLine++;
var test = this.forceEndIf && this.ptCommand < this.compiler.iCommand && this.ptLine + (this.addLine == 0 ? 0 : this.addLine + offset) == this.compiler.lineCurrent;
if (test) this.forceEndIf = false;
return test;
}, "~N");
Clazz.defineMethod (c$, "setPt0", 
function (pt0, isDefault) {
this.pt0 = pt0;
if (isDefault) this.ptDefault = pt0;
this.setLine ();
return pt0;
}, "~N,~B");
Clazz.defineMethod (c$, "setLine", 
function () {
this.ptLine = this.compiler.lineCurrent;
this.ptCommand = this.compiler.iCommand + 1;
});
Clazz.overrideMethod (c$, "toString", 
function () {
return "ident " + this.ident + " line " + this.lineStart + " command " + this.commandStart;
});
Clazz.defineMethod (c$, "path", 
function () {
var s = "";
var f = this;
while (f != null) {
s = f.ident + "-" + s;
f = f.parent;
}
return "[" + s + "]";
});
Clazz.defineMethod (c$, "setFunction", 
function ($function) {
this.$function = $function;
}, "JS.ScriptFunction");
});
