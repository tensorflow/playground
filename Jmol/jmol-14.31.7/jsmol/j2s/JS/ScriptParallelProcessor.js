Clazz.declarePackage ("JS");
Clazz.load (["J.api.JmolParallelProcessor", "JS.ScriptFunction", "JU.Lst"], "JS.ScriptParallelProcessor", ["java.util.concurrent.Executors", "JS.ScriptProcess", "$.ScriptProcessRunnable", "J.shape.MeshCollection", "JU.Logger", "JV.ShapeManager", "$.Viewer"], function () {
c$ = Clazz.decorateAsClass (function () {
this.vwr = null;
this.counter = 0;
this.error = null;
this.lock = null;
this.processes = null;
Clazz.instantialize (this, arguments);
}, JS, "ScriptParallelProcessor", JS.ScriptFunction, J.api.JmolParallelProcessor);
Clazz.prepareFields (c$, function () {
this.lock =  new Clazz._O ();
this.processes =  new JU.Lst ();
});
Clazz.makeConstructor (c$, 
function () {
Clazz.superConstructor (this, JS.ScriptParallelProcessor, []);
});
Clazz.overrideMethod (c$, "getExecutor", 
function () {
return java.util.concurrent.Executors.newCachedThreadPool ();
});
Clazz.overrideMethod (c$, "runAllProcesses", 
function (vwr) {
if (this.processes.size () == 0) return;
this.vwr = vwr;
var inParallel = !vwr.isParallel () && vwr.setParallel (true);
var vShapeManagers =  new JU.Lst ();
this.error = null;
this.counter = 0;
if (JU.Logger.debugging) JU.Logger.debug ("running " + this.processes.size () + " processes on " + JV.Viewer.nProcessors + " processesors inParallel=" + inParallel);
this.counter = this.processes.size ();
for (var i = this.processes.size (); --i >= 0; ) {
var sm = null;
if (inParallel) {
sm =  new JV.ShapeManager (vwr);
sm.setParallel ();
vShapeManagers.addLast (sm);
}this.runProcess (this.processes.removeItemAt (0), sm);
}
{
while (this.counter > 0) {
try {
this.lock.wait ();
} catch (e) {
if (Clazz.exceptionOf (e, InterruptedException)) {
} else {
throw e;
}
}
if (this.error != null) throw this.error;
}
}this.mergeResults (vShapeManagers);
vwr.setParallel (false);
}, "JV.Viewer");
Clazz.defineMethod (c$, "mergeResults", 
function (vShapeManagers) {
try {
for (var i = 0; i < vShapeManagers.size (); i++) this.mergeShapes (vShapeManagers.get (i));

} catch (e) {
if (Clazz.exceptionOf (e, Error)) {
throw e;
} else {
throw e;
}
} finally {
this.counter = -1;
vShapeManagers = null;
}
}, "JU.Lst");
Clazz.defineMethod (c$, "mergeShapes", 
 function (shapeManager) {
var newShapes = shapeManager.shapes;
if (newShapes == null) return;
if (this.vwr.shm.shapes == null) this.vwr.shm.shapes = newShapes;
 else for (var i = 0; i < newShapes.length; ++i) if (newShapes[i] != null && Clazz.instanceOf (newShapes[i], J.shape.MeshCollection)) {
if (this.vwr.shm.shapes[i] == null) this.vwr.shm.loadShape (i);
(this.vwr.shm.shapes[i]).merge (newShapes[i]);
}
}, "JV.ShapeManager");
Clazz.defineMethod (c$, "clearShapeManager", 
function (er) {
{
this.error = er;
this.notifyAll ();
}}, "Error");
Clazz.overrideMethod (c$, "addProcess", 
function (name, context) {
this.processes.addLast ( new JS.ScriptProcess (name, context));
}, "~S,JS.ScriptContext");
Clazz.defineMethod (c$, "runProcess", 
 function (process, shapeManager) {
var r =  new JS.ScriptProcessRunnable (this, process, this.lock, shapeManager);
var exec = (shapeManager == null ? null : this.getMyExecutor ());
if (exec != null) {
exec.execute (r);
} else {
r.run ();
}}, "JS.ScriptProcess,JV.ShapeManager");
Clazz.defineMethod (c$, "eval", 
function (context, shapeManager) {
this.vwr.evalParallel (context, shapeManager);
}, "JS.ScriptContext,JV.ShapeManager");
Clazz.defineMethod (c$, "getMyExecutor", 
 function () {
if (this.vwr.executor != null || JV.Viewer.nProcessors < 2) return this.vwr.executor;
try {
this.vwr.executor = this.getExecutor ();
} catch (e$$) {
if (Clazz.exceptionOf (e$$, Exception)) {
var e = e$$;
{
this.vwr.executor = null;
}
} else if (Clazz.exceptionOf (e$$, Error)) {
var er = e$$;
{
this.vwr.executor = null;
}
} else {
throw e$$;
}
}
if (this.vwr.executor == null) JU.Logger.error ("parallel processing is not available");
return this.vwr.executor;
});
});
