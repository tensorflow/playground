Clazz.declarePackage ("J.adapter.readers.more");
Clazz.load (["J.adapter.readers.xtal.VaspPoscarReader", "java.util.Hashtable"], "J.adapter.readers.more.AFLOWReader", ["java.lang.Float", "java.util.Arrays", "JU.BS", "$.Lst", "$.PT", "$.SB", "JU.Logger"], function () {
c$ = Clazz.decorateAsClass (function () {
this.aabb = null;
this.readPRE = false;
this.fracB = NaN;
this.compositions = null;
this.getComposition = false;
this.listKey = null;
this.listKeyCase = null;
this.fileModelNumber = 0;
this.havePRE = false;
this.titleMsg = null;
this.keyMap = null;
Clazz.instantialize (this, arguments);
}, J.adapter.readers.more, "AFLOWReader", J.adapter.readers.xtal.VaspPoscarReader);
Clazz.prepareFields (c$, function () {
this.keyMap =  new java.util.Hashtable ();
});
Clazz.overrideMethod (c$, "initializeReader", 
function () {
this.readPRE = this.checkFilterKey ("PRE");
var s;
s = this.getFilter ("CA=");
if (s != null) this.fracB = (1 - this.parseFloatStr (s));
s = this.getFilter ("CB=");
if (s != null) this.fracB = this.parseFloatStr (s);
s = this.getFilter ("LIST=");
this.listKey = (s == null ? "HF" : s);
this.listKeyCase = this.listKey;
this.getComposition = !Float.isNaN (this.fracB);
this.discardLinesUntilStartsWith ("[");
this.aabb = this.line.substring (1, this.line.indexOf ("]"));
var pt = (JU.PT.isUpperCase (this.aabb.charAt (1)) ? 1 : 2);
this.defaultLabels =  Clazz.newArray (-1, [this.aabb.substring (0, pt), this.aabb.substring (pt)]);
while (this.rd ().indexOf ("] REFERENCE:") >= 0) this.appendLoadNote (this.line);

this.compositions =  new java.util.Hashtable ();
this.quiet = true;
this.asc.bsAtoms =  new JU.BS ();
this.addJmolScript ("unitcell off;axes off;");
this.havePRE = (this.line.indexOf ("Structure PRE") >= 0);
});
Clazz.overrideMethod (c$, "checkLine", 
function () {
if (!this.havePRE) this.discardLinesUntilContains ("Structure PRE");
this.havePRE = false;
if (this.line == null) return false;
this.continuing = new Boolean (this.continuing & this.readPrePost ()).valueOf ();
return this.continuing;
});
Clazz.defineMethod (c$, "readPrePost", 
 function () {
this.fileModelNumber++;
this.titleMsg = "#" + (this.modelNumber + 1) + (this.getComposition ? "," + this.fileModelNumber + ", Cb=" + this.fracB : "");
this.elementLabel = null;
var n0 = this.asc.bsAtoms.cardinality ();
if (this.readPRE) {
this.readStructure (this.titleMsg);
} else {
this.readElementLabelsOnly ();
this.discardLinesUntilContains ("Structure POST");
this.readStructure (this.titleMsg);
}if (this.getData ()) {
this.applySymmetryAndSetTrajectory ();
} else {
this.asc.bsAtoms.clearBits (this.asc.getLastAtomSetAtomIndex (), this.asc.ac);
this.doCheckUnitCell = false;
}this.finalizeModel ();
if (n0 != this.asc.bsAtoms.cardinality ()) JU.Logger.info ("AFLOW: file#, saved#, atoms: " + this.fileModelNumber + " " + this.modelNumber + " " + (this.asc.bsAtoms.cardinality () - n0));
return !this.haveModel || this.modelNumber != this.desiredModelNumber;
});
Clazz.defineMethod (c$, "finalizeModel", 
 function () {
this.asc.removeLastUnselectedAtoms ();
});
Clazz.defineMethod (c$, "readElementLabelsOnly", 
 function () {
this.readLines (5);
this.rdline ();
var n = this.getTokens ().length;
this.elementLabel =  new Array (n);
this.rdline ();
this.line = "";
var s = null;
var last = null;
for (var i = 0; i < n; i++) {
while (s == null || s.equals (last)) {
this.rdline ();
var tokens = this.getTokens ();
if (tokens.length != 4 || (s = this.elementLabel[i] = this.getElement (tokens[3])) == null) {
i = n + 1;
break;
}}
last = s;
}
if (s == null) this.elementLabel = this.defaultLabels;
});
Clazz.defineMethod (c$, "getData", 
 function () {
this.discardLinesUntilContains ("- DATA -");
var htAFLOW =  new java.util.Hashtable ();
htAFLOW.put ("fileModelNumber", Integer.$valueOf (this.fileModelNumber));
htAFLOW.put ("modelNumber", Integer.$valueOf (this.modelNumber + 1));
htAFLOW.put ("AaBb", this.aabb);
var pt = 0;
var sb =  new JU.SB ();
var listVal = 3.4028235E38;
var strcb = "?";
var listValStr = null;
var cb = 0;
while (this.rdline () != null && (pt = this.line.indexOf (" # ")) >= 0) {
var key = this.line.substring (pt + 3).trim ();
var val = this.line.substring (0, pt).trim ();
sb.append (key).append ("=").append (val).append (" | ");
if (key.toUpperCase ().startsWith (this.listKey)) {
this.listKey = key.toUpperCase ();
this.listKeyCase = key;
listValStr = val;
listVal = this.parseFloatStr (val);
}if (key.equals ("Ca")) {
var ca = this.parseFloatStr (val);
if (this.getComposition && Math.abs ((1 - ca) - this.fracB) > 0.01) return false;
} else if (key.equals ("Cb")) {
cb = this.parseFloatStr (strcb = val);
if (this.getComposition && Math.abs (cb - this.fracB) > 0.01) return false;
} else if (key.equals ("Hf_atom [eV] (VASP)")) {
var e = this.parseFloatStr (val);
this.asc.setAtomSetEnergy (val, e);
}}
this.asc.setAtomSetName (this.titleMsg + (this.getComposition ? "" : " Cb=" + cb) + " " + this.listKey + "=" + listValStr);
var count_min = this.compositions.get (strcb);
if (!this.doGetModel (++this.modelNumber, null)) return false;
if (count_min == null) this.compositions.put (strcb, count_min =  Clazz.newFloatArray (-1, [0, 3.4028235E38, 0]));
count_min[0]++;
if (listVal < count_min[1]) {
count_min[1] = listVal;
count_min[2] = this.fileModelNumber;
}while (this.line.indexOf ("- URL -") < 0) this.rdline ();

sb.append ("URL=" + this.rdline () + "|");
while (this.line.indexOf ("aurl=") < 0) this.rdline ();

sb.append (this.line);
var pairs = JU.PT.split (sb.toString (), " | ");
for (var i = pairs.length; --i >= 0; ) {
var kv = pairs[i].$plit ("=");
if (kv.length < 2) continue;
var f = this.parseFloatStr (kv[1]);
var o = Float.isNaN (f) ? kv[1] : Float.$valueOf (f);
htAFLOW.put (kv[0], o);
var kvclean = this.cleanKey (kv[0]);
if (kvclean !== kv[0]) htAFLOW.put (kvclean, o);
}
this.asc.setCurrentModelInfo ("aflowInfo", htAFLOW);
return true;
});
Clazz.defineMethod (c$, "cleanKey", 
 function (key) {
var kclean = this.keyMap.get (key);
if (kclean != null) return kclean;
var chars = key.toCharArray ();
for (var i = chars.length; --i >= 0; ) if (!JU.PT.isLetterOrDigit (chars[i])) chars[i] = '_';

this.keyMap.put (key, kclean = JU.PT.trim (JU.PT.rep ( String.instantialize (chars), "__", "_"), "_"));
return kclean;
}, "~S");
Clazz.overrideMethod (c$, "finalizeSubclassReader", 
function () {
this.alignUnitCells ();
this.listCompositions ();
this.finalizeReaderASCR ();
});
Clazz.defineMethod (c$, "listCompositions", 
 function () {
var list =  new JU.Lst ();
for (var e, $e = this.compositions.entrySet ().iterator (); $e.hasNext () && ((e = $e.next ()) || true);) {
var count_min = e.getValue ();
list.addLast (e.getKey () + "\t" + (Clazz.floatToInt (count_min[0])) + "\t" + Clazz.floatToInt (count_min[2]) + "\t" + this.listKeyCase + "\t" + count_min[1]);
}
var a =  new Array (list.size ());
list.toArray (a);
java.util.Arrays.sort (a);
for (var i = 0, n = a.length; i < n; i++) this.appendLoadNote (this.aabb + "\t" + a[i]);

});
Clazz.defineMethod (c$, "alignUnitCells", 
 function () {
});
});
