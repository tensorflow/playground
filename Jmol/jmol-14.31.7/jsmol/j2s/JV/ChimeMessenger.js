Clazz.declarePackage ("JV");
Clazz.load (["JV.JmolChimeMessenger"], "JV.ChimeMessenger", ["java.lang.Boolean", "java.util.Hashtable", "J.c.CBK", "$.STR", "JU.Logger"], function () {
c$ = Clazz.decorateAsClass (function () {
this.vwr = null;
Clazz.instantialize (this, arguments);
}, JV, "ChimeMessenger", null, JV.JmolChimeMessenger);
Clazz.makeConstructor (c$, 
function () {
});
Clazz.overrideMethod (c$, "set", 
function (vwr) {
this.vwr = vwr;
return this;
}, "JV.Viewer");
Clazz.overrideMethod (c$, "getInfoXYZ", 
function (a) {
var group3 = a.getGroup3 (true);
var chainID = a.group.chain.chainID;
return "Atom: " + (group3 == null ? a.getElementSymbol () : a.getAtomName ()) + " " + a.getAtomNumber () + (group3 != null && group3.length > 0 ? (a.isHetero () ? " Hetero: " : " Group: ") + group3 + " " + a.getResno () + (chainID != 0 && chainID != 32 ? " Chain: " + a.group.chain.getIDStr () : "") : "") + " Model: " + a.getModelNumber () + " Coordinates: " + a.x + " " + a.y + " " + a.z;
}, "JM.Atom");
Clazz.overrideMethod (c$, "showHash", 
function (outputBuffer, s) {
if (s == null) return;
if (outputBuffer == null) {
if (!this.vwr.isPrintOnly) JU.Logger.warn (s);
this.vwr.scriptStatus (s);
} else {
outputBuffer.append (s).appendC ('\n');
}}, "JU.SB,~S");
Clazz.overrideMethod (c$, "reportSelection", 
function (n) {
this.vwr.reportSelection ((n == 0 ? "No atoms" : n == 1 ? "1 atom" : n + " atoms") + " selected!");
}, "~N");
Clazz.overrideMethod (c$, "update", 
function (msg) {
if (msg == null) msg = "script <exiting>";
 else msg = "Requesting " + msg;
this.vwr.scriptStatus (msg);
}, "~S");
Clazz.overrideMethod (c$, "scriptCompleted", 
function (sm, statusMessage, strErrorMessageUntranslated) {
var data =  Clazz.newArray (-1, [null, "script <exiting>", statusMessage, Integer.$valueOf (-1), strErrorMessageUntranslated]);
if (sm.notifyEnabled (J.c.CBK.SCRIPT)) sm.cbl.notifyCallback (J.c.CBK.SCRIPT, data);
sm.processScript (data);
return "Jmol script completed.";
}, "JV.StatusManager,~S,~S");
Clazz.overrideMethod (c$, "getAllChimeInfo", 
function (sb) {
var nHetero = 0;
var nH = -1;
var nS = 0;
var nT = 0;
var ms = this.vwr.ms;
if (ms.haveBioModels) {
var n = 0;
var models = ms.am;
var modelCount = ms.mc;
var ac = ms.ac;
var atoms = ms.at;
sb.append ("\nMolecule name ....... " + ms.getInfoM ("COMPND"));
sb.append ("\nSecondary Structure . PDB Data Records");
sb.append ("\nBrookhaven Code ..... " + ms.modelSetName);
for (var i = modelCount; --i >= 0; ) n += models[i].getChainCount (false);

sb.append ("\nNumber of Chains .... " + n);
var ng = 0;
var ngHetero = 0;
var map =  new java.util.Hashtable ();
var id;
var lastid = -1;
nH = 0;
for (var i = ac; --i >= 0; ) {
var isHetero = atoms[i].isHetero ();
if (isHetero) nHetero++;
var g = atoms[i].group;
if (!map.containsKey (g)) {
map.put (g, Boolean.TRUE);
if (isHetero) ngHetero++;
 else ng++;
}if (atoms[i].mi == 0) {
if ((id = g.getStrucNo ()) != lastid && id != 0) {
lastid = id;
switch (g.getProteinStructureType ()) {
case J.c.STR.HELIX:
nH++;
break;
case J.c.STR.SHEET:
nS++;
break;
case J.c.STR.TURN:
nT++;
break;
}
}}}
sb.append ("\nNumber of Groups .... " + ng);
if (ngHetero > 0) sb.append (" (" + ngHetero + ")");
}sb.append ("\nNumber of Atoms ..... " + (ms.ac - nHetero));
if (nHetero > 0) sb.append (" (" + nHetero + ")");
sb.append ("\nNumber of Bonds ..... " + ms.bondCount);
sb.append ("\nNumber of Models ...... " + ms.mc);
if (nH >= 0) {
sb.append ("\nNumber of Helices ... " + nH);
sb.append ("\nNumber of Strands ... " + nS);
sb.append ("\nNumber of Turns ..... " + nT);
}}, "JU.SB");
});
