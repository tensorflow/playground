Clazz.declarePackage ("JU");
Clazz.load (["J.api.JmolAudioPlayer"], "JU.JmolAudio", ["JU.Logger", "JV.Viewer"], function () {
c$ = Clazz.decorateAsClass (function () {
this.params = null;
this.myClip = null;
this.fileName = null;
this.vwr = null;
this.id = null;
this.autoClose = false;
Clazz.instantialize (this, arguments);
}, JU, "JmolAudio", null, [J.api.JmolAudioPlayer]);
Clazz.makeConstructor (c$, 
function () {
});
Clazz.defineMethod (c$, "playAudio", 
function (vwr, htParams) {
try {
this.id = htParams.get ("id");
if (this.id == null || this.id.length == 0) {
this.autoClose = true;
htParams.put ("id", this.id = "audio" + ++JU.JmolAudio.idCount);
}this.vwr = vwr;
this.params = htParams;
this.params.put ("audioPlayer", this);
this.fileName = htParams.get ("audioFile");
vwr.sm.registerAudio (this.id, htParams);
var applet = vwr.html5Applet;
var jmol = JV.Viewer.jmolObject;
if (jmol == null) this.getClip ();
 else jmol.playAudio (applet, htParams);
if (this.myClip == null) return;
if (htParams.containsKey ("action")) this.action (htParams.get ("action"));
 else if (htParams.containsKey ("loop")) {
this.action ("loop");
} else {
this.autoClose = true;
this.action ("start");
}} catch (e) {
if (Clazz.exceptionOf (e, Exception)) {
JU.Logger.info ("File " + this.fileName + " could not be opened as an audio file");
} else {
throw e;
}
}
}, "JV.Viewer,java.util.Map");
Clazz.overrideMethod (c$, "update", 
function (le) {
}, "javax.sound.sampled.LineEvent");
Clazz.defineMethod (c$, "processUpdate", 
function (type) {
JU.Logger.info ("audio id " + this.id + " " + this.fileName + " " + type);
if (type === "open" || type === "Open") {
this.params.put ("status", "open");
} else if (type === "play" || type === "Start") {
this.params.put ("status", "play");
} else if (type === "pause" || type === "Stop") {
this.params.put ("status", "pause");
if (this.autoClose) {
this.myClip.close ();
}} else if (type === "ended" || type === "Close") {
this.params.put ("status", "ended");
} else {
this.params.put ("status", type);
}this.vwr.sm.notifyAudioStatus (this.params);
}, "~S");
Clazz.overrideMethod (c$, "action", 
function (action) {
if (this.myClip == null) {
if (action === "kill") return;
this.params.put ("status", "ended");
this.vwr.sm.notifyAudioStatus (this.params);
return;
}try {
if ("start".equals (action)) {
this.myClip.setMicrosecondPosition (0);
this.myClip.loop (0);
this.myClip.start ();
} else if ("loop".equals (action)) {
this.myClip.setMicrosecondPosition (0);
this.myClip.loop (10);
this.myClip.start ();
} else if ("pause".equals (action)) {
if (this.myClip != null) this.myClip.stop ();
} else if ("play".equals (action)) {
this.myClip.stop ();
this.myClip.start ();
} else if ("close".equals (action)) {
this.myClip.close ();
}} catch (t) {
}
}, "~S");
Clazz.defineStatics (c$,
"MAX_LOOP", 10,
"idCount", 0);
});
