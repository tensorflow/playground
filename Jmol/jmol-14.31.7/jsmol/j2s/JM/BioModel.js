Clazz.declarePackage ("JM");
Clazz.load (["JM.Model"], "JM.BioModel", ["java.util.Hashtable", "JU.AU", "$.BS", "$.Lst", "$.SB", "J.api.Interface", "JM.AlphaPolymer", "$.AminoPolymer", "$.BioModelSet", "JS.SV", "JU.Escape"], function () {
c$ = Clazz.decorateAsClass (function () {
this.vwr = null;
this.bioPolymerCount = 0;
this.bioPolymers = null;
this.isMutated = false;
this.defaultStructure = null;
Clazz.instantialize (this, arguments);
}, JM, "BioModel", JM.Model);
Clazz.makeConstructor (c$, 
function (modelSet, modelIndex, trajectoryBaseIndex, jmolData, properties, auxiliaryInfo) {
Clazz.superConstructor (this, JM.BioModel, []);
this.vwr = modelSet.vwr;
this.set (modelSet, modelIndex, trajectoryBaseIndex, jmolData, properties, auxiliaryInfo);
this.isBioModel = true;
if (modelSet.bioModelset == null) modelSet.bioModelset =  new JM.BioModelSet ().set (this.vwr, this.ms);
this.clearBioPolymers ();
modelSet.am[modelIndex] = this;
this.pdbID = auxiliaryInfo.get ("name");
}, "JM.ModelSet,~N,~N,~S,java.util.Properties,java.util.Map");
Clazz.defineMethod (c$, "addBioPolymer", 
function (polymer) {
if (this.bioPolymers.length == 0) this.clearBioPolymers ();
if (this.bioPolymerCount == this.bioPolymers.length) this.bioPolymers = JU.AU.doubleLength (this.bioPolymers);
polymer.bioPolymerIndexInModel = this.bioPolymerCount;
this.bioPolymers[this.bioPolymerCount++] = polymer;
return polymer.monomerCount;
}, "JM.BioPolymer");
Clazz.defineMethod (c$, "addSecondaryStructure", 
function (type, structureID, serialID, strandCount, startChainID, startSeqcode, endChainID, endSeqcode, istart, iend, bsAssigned) {
for (var i = this.bioPolymerCount; --i >= 0; ) if (Clazz.instanceOf (this.bioPolymers[i], JM.AlphaPolymer)) (this.bioPolymers[i]).addStructure (type, structureID, serialID, strandCount, startChainID, startSeqcode, endChainID, endSeqcode, istart, iend, bsAssigned);

}, "J.c.STR,~S,~N,~N,~N,~N,~N,~N,~N,~N,JU.BS");
Clazz.defineMethod (c$, "addStructureByBS", 
function (count, dsspType, type, bs) {
for (var i = this.bioPolymerCount; --i >= 0; ) {
var b = this.bioPolymers[i];
if (Clazz.instanceOf (b, JM.AlphaPolymer)) count = (this.bioPolymers[i]).setStructureBS (++count, dsspType, type, bs, true);
}
}, "~N,~N,J.c.STR,JU.BS");
Clazz.defineMethod (c$, "calculateDssx", 
 function (vHBonds, doReport, dsspIgnoreHydrogen, setStructure, version) {
var haveProt = false;
var haveNucl = false;
for (var i = 0; i < this.bioPolymerCount && !(haveProt && haveNucl); i++) {
if (this.bioPolymers[i].isNucleic ()) haveNucl = true;
 else if (Clazz.instanceOf (this.bioPolymers[i], JM.AminoPolymer)) haveProt = true;
}
var s = "";
if (haveProt) s += (J.api.Interface.getOption ("dssx.DSSP", this.vwr, "ms")).calculateDssp (this.bioPolymers, this.bioPolymerCount, vHBonds, doReport, dsspIgnoreHydrogen, setStructure, version);
if (haveNucl && this.auxiliaryInfo.containsKey ("dssr") && vHBonds != null) s += this.vwr.getAnnotationParser (true).getHBonds (this.ms, this.modelIndex, vHBonds, doReport);
return s;
}, "JU.Lst,~B,~B,~B,~N");
Clazz.defineMethod (c$, "calculateStructures", 
function (asDSSP, doReport, dsspIgnoreHydrogen, setStructure, includeAlpha, version) {
if (this.bioPolymerCount == 0 || !setStructure && !asDSSP) return "";
this.ms.proteinStructureTainted = this.structureTainted = true;
if (setStructure) for (var i = this.bioPolymerCount; --i >= 0; ) if (!asDSSP || this.bioPolymers[i].monomers[0].getNitrogenAtom () != null) this.bioPolymers[i].clearStructures ();

if (!asDSSP || includeAlpha) for (var i = this.bioPolymerCount; --i >= 0; ) if (Clazz.instanceOf (this.bioPolymers[i], JM.AlphaPolymer)) (this.bioPolymers[i]).calculateStructures (includeAlpha);

return (asDSSP ? this.calculateDssx (null, doReport, dsspIgnoreHydrogen, setStructure, version) : "");
}, "~B,~B,~B,~B,~B,~N");
Clazz.defineMethod (c$, "clearBioPolymers", 
function () {
this.bioPolymers =  new Array (8);
this.bioPolymerCount = 0;
});
Clazz.overrideMethod (c$, "fixIndices", 
function (modelIndex, nAtomsDeleted, bsDeleted) {
this.fixIndicesM (modelIndex, nAtomsDeleted, bsDeleted);
this.recalculateLeadMidpointsAndWingVectors ();
}, "~N,~N,JU.BS");
Clazz.overrideMethod (c$, "freeze", 
function () {
this.freezeM ();
this.bioPolymers = JU.AU.arrayCopyObject (this.bioPolymers, this.bioPolymerCount);
return true;
});
Clazz.defineMethod (c$, "getBioBranches", 
function (biobranches) {
var bsBranch;
for (var j = 0; j < this.bioPolymerCount; j++) {
bsBranch =  new JU.BS ();
this.bioPolymers[j].getRange (bsBranch, this.isMutated);
var iAtom = bsBranch.nextSetBit (0);
if (iAtom >= 0) {
if (biobranches == null) biobranches =  new JU.Lst ();
biobranches.addLast (bsBranch);
}}
return biobranches;
}, "JU.Lst");
Clazz.defineMethod (c$, "getBioPolymerCount", 
function () {
return this.bioPolymerCount;
});
Clazz.defineMethod (c$, "getCachedAnnotationMap", 
function (key, ann) {
var cache = (this.dssrCache == null && ann != null ? this.dssrCache =  new java.util.Hashtable () : this.dssrCache);
if (cache == null) return null;
var annotv = cache.get (key);
if (annotv == null && ann != null) {
annotv = (Clazz.instanceOf (ann, JS.SV) || Clazz.instanceOf (ann, java.util.Hashtable) ? ann : this.vwr.parseJSONMap (ann));
cache.put (key, annotv);
}return (Clazz.instanceOf (annotv, JS.SV) || Clazz.instanceOf (annotv, java.util.Hashtable) ? annotv : null);
}, "~S,~O");
Clazz.defineMethod (c$, "getConformation", 
function (conformationIndex0, doSet, bsAtoms, bsRet) {
if (conformationIndex0 >= 0) {
var nAltLocs = this.altLocCount;
if (nAltLocs > 0) {
var atoms = this.ms.at;
var g = null;
var ch = '\u0000';
var conformationIndex = conformationIndex0;
var bsFound =  new JU.BS ();
for (var i = bsAtoms.nextSetBit (0); i >= 0; i = bsAtoms.nextSetBit (i + 1)) {
var atom = atoms[i];
var altloc = atom.altloc;
if (altloc == '\0') continue;
if (atom.group !== g) {
g = atom.group;
ch = '\0';
conformationIndex = conformationIndex0;
bsFound.clearAll ();
}if (conformationIndex >= 0 && altloc != ch && !bsFound.get (altloc.charCodeAt (0))) {
ch = altloc;
conformationIndex--;
bsFound.set (altloc.charCodeAt (0));
}if (conformationIndex >= 0 || altloc != ch) bsAtoms.clear (i);
}
}}if (bsAtoms.nextSetBit (0) >= 0) {
bsRet.or (bsAtoms);
if (doSet) for (var j = this.bioPolymerCount; --j >= 0; ) this.bioPolymers[j].setConformation (bsAtoms);

}return true;
}, "~N,~B,JU.BS,JU.BS");
Clazz.defineMethod (c$, "getDefaultLargePDBRendering", 
function (sb, maxAtoms) {
var bs =  new JU.BS ();
if (this.getBondCount () == 0) bs = this.bsAtoms;
if (bs !== this.bsAtoms) for (var i = 0; i < this.bioPolymerCount; i++) this.bioPolymers[i].getRange (bs, this.isMutated);

if (bs.nextSetBit (0) < 0) return;
var bs2 =  new JU.BS ();
if (bs === this.bsAtoms) {
bs2 = bs;
} else {
for (var i = 0; i < this.bioPolymerCount; i++) if (this.bioPolymers[i].getType () == 0) this.bioPolymers[i].getRange (bs2, this.isMutated);

}if (bs2.nextSetBit (0) >= 0) sb.append ("select ").append (JU.Escape.eBS (bs2)).append (";backbone only;");
if (this.act <= maxAtoms) return;
sb.append ("select ").append (JU.Escape.eBS (bs)).append (" & connected; wireframe only;");
if (bs !== this.bsAtoms) {
bs2.clearAll ();
bs2.or (this.bsAtoms);
bs2.andNot (bs);
if (bs2.nextSetBit (0) >= 0) sb.append ("select " + JU.Escape.eBS (bs2) + " & !connected;stars 0.5;spacefill off;");
}}, "JU.SB,~N");
Clazz.defineMethod (c$, "getFullPDBHeader", 
function () {
if (this.modelIndex < 0) return "";
var info = this.auxiliaryInfo.get ("fileHeader");
if (info != null) return info;
return this.ms.bioModelset.getBioExt ().getFullPDBHeader (this.auxiliaryInfo);
});
Clazz.defineMethod (c$, "getPdbData", 
function (type, ctype, isDraw, bsSelected, out, tokens, pdbCONECT, bsWritten) {
this.ms.bioModelset.getBioExt ().getPdbDataM (this, this.vwr, type, ctype, isDraw, bsSelected, out, tokens, pdbCONECT, bsWritten);
}, "~S,~S,~B,JU.BS,JU.OC,~A,JU.SB,JU.BS");
Clazz.defineMethod (c$, "getRasmolHydrogenBonds", 
function (bsA, bsB, vHBonds, nucleicOnly, nMax, dsspIgnoreHydrogens, bsHBonds, version) {
var doAdd = (vHBonds == null);
if (doAdd) vHBonds =  new JU.Lst ();
if (nMax < 0) nMax = 2147483647;
var asDSSX = (bsB == null);
var bp;
var bp1;
if (asDSSX && this.bioPolymerCount > 0) {
this.calculateDssx (vHBonds, false, dsspIgnoreHydrogens, false, version);
} else {
for (var i = this.bioPolymerCount; --i >= 0; ) {
bp = this.bioPolymers[i];
if (bp.monomerCount == 0) continue;
var type = bp.getType ();
var isRNA = false;
switch (type) {
case 1:
if (nucleicOnly) continue;
bp.calcRasmolHydrogenBonds (null, bsA, bsB, vHBonds, nMax, null, true, false);
break;
case 2:
isRNA = bp.monomers[0].isRna ();
break;
default:
continue;
}
for (var j = this.bioPolymerCount; --j >= 0; ) {
if ((bp1 = this.bioPolymers[j]) != null && (isRNA || i != j) && type == bp1.getType ()) {
bp1.calcRasmolHydrogenBonds (bp, bsA, bsB, vHBonds, nMax, null, true, false);
}}
}
}if (vHBonds.size () == 0 || !doAdd) return;
this.hasRasmolHBonds = true;
for (var i = 0; i < vHBonds.size (); i++) {
var bond = vHBonds.get (i);
var atom1 = bond.atom1;
var atom2 = bond.atom2;
if (atom1.isBonded (atom2)) continue;
var index = this.ms.addHBond (atom1, atom2, bond.order, bond.getEnergy ());
if (bsHBonds != null) bsHBonds.set (index);
}
}, "JU.BS,JU.BS,JU.Lst,~B,~N,~B,JU.BS,~N");
Clazz.defineMethod (c$, "getUnitID", 
function (atom, flags) {
var sb =  new JU.SB ();
var m = atom.group;
var noTrim = ((flags & 16) != 16);
var ch = ((flags & 8) == 8 ? m.getInsertionCode () : '\0');
var isAll = (ch != '\0');
if ((flags & 1) == 1 && (this.pdbID != null)) sb.append (this.pdbID);
sb.append ("|").appendO (this.ms.getInfo (this.modelIndex, "modelNumber")).append ("|").append (this.vwr.getChainIDStr (m.chain.chainID)).append ("|").append (m.getGroup3 ()).append ("|").appendI (m.getResno ());
if ((flags & 4) == 4) {
sb.append ("|").append (atom.getAtomName ());
if (atom.altloc != '\0') sb.append ("|").appendC (atom.altloc);
 else if (noTrim || isAll) sb.append ("|");
} else if (noTrim || isAll) {
sb.append ("||");
}if (isAll) sb.append ("|").appendC (ch);
 else if (noTrim) sb.append ("|");
if (noTrim) sb.append ("|");
return sb.toString ();
}, "JM.Atom,~N");
Clazz.defineMethod (c$, "recalculateLeadMidpointsAndWingVectors", 
function () {
for (var ip = 0; ip < this.bioPolymerCount; ip++) this.bioPolymers[ip].recalculateLeadMidpointsAndWingVectors ();

});
Clazz.defineMethod (c$, "resetRasmolBonds", 
function (bs, dsspVersion) {
var bsDelete =  new JU.BS ();
this.hasRasmolHBonds = false;
var am = this.ms.am;
var bo = this.ms.bo;
for (var i = this.ms.bondCount; --i >= 0; ) {
var bond = bo[i];
if ((bond.order & 28672) != 0 && am[bond.atom1.mi].trajectoryBaseIndex == this.modelIndex) bsDelete.set (i);
}
if (bsDelete.nextSetBit (0) >= 0) this.ms.deleteBonds (bsDelete, false);
this.getRasmolHydrogenBonds (bs, bs, null, false, 2147483647, false, null, dsspVersion);
}, "JU.BS,~N");
Clazz.defineMethod (c$, "getAtomicDSSRData", 
function (dssrData, dataType) {
if (this.auxiliaryInfo.containsKey ("dssr")) this.vwr.getAnnotationParser (true).getAtomicDSSRData (this.ms, this.modelIndex, dssrData, dataType);
}, "~A,~S");
});
