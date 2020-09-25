Clazz.declarePackage ("J.thread");
Clazz.load (["J.thread.JmolThread"], "J.thread.TimeoutThread", ["java.lang.Thread", "JU.SB"], function () {
c$ = Clazz.decorateAsClass (function () {
this.script = null;
this.status = 0;
this.triggered = true;
Clazz.instantialize (this, arguments);
}, J.thread, "TimeoutThread", J.thread.JmolThread);
Clazz.makeConstructor (c$, 
function (vwr, name, ms, script) {
this.setViewer (vwr, name);
this.$name = name;
this.set (ms, script);
}, "JV.Viewer,~S,~N,~S");
Clazz.defineMethod (c$, "set", 
 function (ms, script) {
this.sleepTime = ms;
if (script != null) this.script = script;
}, "~N,~S");
Clazz.overrideMethod (c$, "toString", 
function () {
return "timeout name=" + this.$name + " executions=" + this.status + " mSec=" + this.sleepTime + " secRemaining=" + (this.targetTime - System.currentTimeMillis ()) / 1000 + " script=" + this.script;
});
Clazz.overrideMethod (c$, "run1", 
function (mode) {
while (true) {
switch (mode) {
case -1:
if (!this.isJS) Thread.currentThread ().setPriority (1);
this.targetTime = System.currentTimeMillis () + Math.abs (this.sleepTime);
mode = 0;
break;
case 0:
if (this.checkInterrupted (null) || this.script == null || this.script.length == 0) return;
if (!this.runSleep (26, 1)) return;
mode = 1;
break;
case 1:
mode = (System.currentTimeMillis () < this.targetTime ? 0 : 2);
break;
case 2:
this.currentTime = System.currentTimeMillis ();
if (this.vwr.timeouts.get (this.$name) == null) return;
this.status++;
var continuing = (this.sleepTime < 0);
if (continuing) this.targetTime = System.currentTimeMillis () + Math.abs (this.sleepTime);
 else this.vwr.timeouts.remove (this.$name);
if (this.triggered) {
this.triggered = false;
if (this.$name.equals ("_SET_IN_MOTION_")) {
this.vwr.checkInMotion (2);
} else {
this.vwr.evalStringQuiet ((continuing ? this.script + ";\ntimeout ID \"" + this.$name + "\";" : this.script));
}}mode = (continuing ? 0 : -2);
break;
case -2:
this.vwr.timeouts.remove (this.$name);
return;
}
}
}, "~N");
c$.clear = Clazz.defineMethod (c$, "clear", 
function (timeouts) {
for (var o, $o = timeouts.values ().iterator (); $o.hasNext () && ((o = $o.next ()) || true);) {
var t = o;
if (!t.script.equals ("exitJmol")) t.interrupt ();
}
timeouts.clear ();
}, "java.util.Map");
c$.setTimeout = Clazz.defineMethod (c$, "setTimeout", 
function (vwr, timeouts, name, mSec, script) {
var t = timeouts.get (name);
if (mSec == 0) {
if (t != null) {
t.interrupt ();
timeouts.remove (name);
}return;
}if (t != null) {
t.set (mSec, script);
return;
}t =  new J.thread.TimeoutThread (vwr, name, mSec, script);
timeouts.put (name, t);
t.start ();
}, "JV.Viewer,java.util.Map,~S,~N,~S");
c$.trigger = Clazz.defineMethod (c$, "trigger", 
function (timeouts, name) {
var t = timeouts.get (name);
if (t != null) t.triggered = (t.sleepTime < 0);
}, "java.util.Map,~S");
c$.showTimeout = Clazz.defineMethod (c$, "showTimeout", 
function (timeouts, name) {
var sb =  new JU.SB ();
if (timeouts != null) {
for (var o, $o = timeouts.values ().iterator (); $o.hasNext () && ((o = $o.next ()) || true);) {
var t = o;
if (name == null || t.$name.equalsIgnoreCase (name)) sb.append (t.toString ()).append ("\n");
}
}return (sb.length () > 0 ? sb.toString () : "<no timeouts set>");
}, "java.util.Map,~S");
});
