Clazz.declarePackage ("JS");
Clazz.load (null, "JS.ScriptProcessRunnable", ["JU.Logger"], function () {
c$ = Clazz.decorateAsClass (function () {
this.parallelProcessor = null;
this.process = null;
this.processLock = null;
this.shapeManager = null;
Clazz.instantialize (this, arguments);
}, JS, "ScriptProcessRunnable", null, Runnable);
Clazz.makeConstructor (c$, 
function (parallelProcessor, process, lock, shapeManager) {
this.parallelProcessor = parallelProcessor;
this.process = process;
this.processLock = lock;
this.shapeManager = shapeManager;
}, "JS.ScriptParallelProcessor,JS.ScriptProcess,~O,JV.ShapeManager");
Clazz.overrideMethod (c$, "run", 
function () {
try {
if (this.parallelProcessor.error == null) {
if (JU.Logger.debugging) JU.Logger.debug ("Running process " + this.process.processName + " " + this.process.context.pc + " - " + (this.process.context.pcEnd - 1));
this.parallelProcessor.eval (this.process.context, this.shapeManager);
if (JU.Logger.debugging) JU.Logger.debug ("Process " + this.process.processName + " complete");
}} catch (e$$) {
if (Clazz.exceptionOf (e$$, Exception)) {
var e = e$$;
{
e.printStackTrace ();
}
} else if (Clazz.exceptionOf (e$$, Error)) {
var er = e$$;
{
this.parallelProcessor.clearShapeManager (er);
}
} else {
throw e$$;
}
} finally {
{
--this.parallelProcessor.counter;
this.processLock.notifyAll ();
}}
});
});
