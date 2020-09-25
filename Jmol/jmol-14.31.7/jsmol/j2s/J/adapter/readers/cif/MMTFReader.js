Clazz.declarePackage ("J.adapter.readers.cif");
Clazz.load (["J.adapter.readers.cif.MMCifReader"], "J.adapter.readers.cif.MMTFReader", ["java.lang.Boolean", "java.util.Hashtable", "JU.BS", "$.Lst", "$.M4", "$.MessagePackReader", "$.PT", "$.SB", "J.adapter.smarter.Atom", "$.Bond", "$.Structure", "JS.SV", "JU.Logger"], function () {
c$ = Clazz.decorateAsClass (function () {
this.haveStructure = false;
this.$pdbID = null;
this.map = null;
this.fileAtomCount = 0;
this.opCount = 0;
this.groupModels = null;
this.groupMap = null;
this.groupDSSP = null;
this.atomGroup = null;
this.labelAsymList = null;
this.atomMap = null;
this.entities = null;
this.groupCount = 0;
this.ac0 = 0;
this.bsStructures = null;
this.lastGroup = 0;
Clazz.instantialize (this, arguments);
}, J.adapter.readers.cif, "MMTFReader", J.adapter.readers.cif.MMCifReader);
Clazz.overrideMethod (c$, "addHeader", 
function () {
});
Clazz.overrideMethod (c$, "setup", 
function (fullPath, htParams, reader) {
this.isBinary = true;
this.isMMCIF = true;
this.iHaveFractionalCoordinates = false;
this.setupASCR (fullPath, htParams, reader);
}, "~S,java.util.Map,~O");
Clazz.overrideMethod (c$, "processBinaryDocument", 
function () {
var doDoubleBonds = (!this.isCourseGrained && !this.checkFilterKey ("NODOUBLE"));
this.isDSSP1 = !this.checkFilterKey ("DSSP2");
var mmtfImplementsDSSP2 = false;
this.applySymmetryToBonds = true;
this.map = ( new JU.MessagePackReader (this.binaryDoc, true)).readMap ();
this.entities = this.map.get ("entityList");
if (JU.Logger.debugging) {
for (var s, $s = this.map.keySet ().iterator (); $s.hasNext () && ((s = $s.next ()) || true);) JU.Logger.info (s);

}this.asc.setInfo ("noAutoBond", Boolean.TRUE);
JU.Logger.info ("MMTF version " + this.map.get ("mmtfVersion"));
JU.Logger.info ("MMTF Producer " + this.map.get ("mmtfProducer"));
var title = this.map.get ("title");
if (title != null) this.appendLoadNote (title);
this.$pdbID = this.map.get ("structureId");
if (this.$pdbID == null) this.$pdbID = this.map.get ("pdbId");
this.fileAtomCount = (this.map.get ("numAtoms")).intValue ();
var nBonds = (this.map.get ("numBonds")).intValue ();
this.groupCount = (this.map.get ("numGroups")).intValue ();
this.groupModels =  Clazz.newIntArray (this.groupCount, 0);
this.groupDSSP =  Clazz.newIntArray (this.groupCount, 0);
this.groupMap =  Clazz.newIntArray (this.groupCount, 0);
var modelCount = (this.map.get ("numModels")).intValue ();
this.appendLoadNote ("id=" + this.$pdbID + " numAtoms=" + this.fileAtomCount + " numBonds=" + nBonds + " numGroups=" + this.groupCount + " numModels=" + modelCount);
this.getMMTFAtoms (doDoubleBonds);
if (!this.isCourseGrained) {
var bo = this.decode ("bondOrderList");
var bi = this.decode ("bondAtomList");
this.addMMTFBonds (bo, bi, 0, doDoubleBonds, true);
if (this.isDSSP1 || mmtfImplementsDSSP2) this.getStructure ();
}this.setMMTFSymmetry ();
this.getMMTFBioAssembly ();
this.setModelPDB (true);
if (JU.Logger.debuggingHigh) JU.Logger.info (JS.SV.getVariable (this.map).asString ());
});
Clazz.defineMethod (c$, "applySymmetryAndSetTrajectory", 
function () {
this.ac0 = this.ac;
Clazz.superCall (this, J.adapter.readers.cif.MMTFReader, "applySymmetryAndSetTrajectory", []);
if (this.haveStructure) this.addStructureSymmetry ();
});
Clazz.defineMethod (c$, "getMMTFAtoms", 
 function (doMulti) {
var chainsPerModel = this.map.get ("chainsPerModel");
var groupsPerChain = this.map.get ("groupsPerChain");
this.labelAsymList = this.decode ("chainIdList");
var authAsymList = this.decode ("chainNameList");
var groupTypeList = this.decode ("groupTypeList");
var groupIdList = this.decode ("groupIdList");
var groupList = this.map.get ("groupList");
var insCodes = this.decode ("insCodeList");
var atomId = this.decode ("atomIdList");
var haveSerial = (atomId != null);
var altloc = this.decode ("altLocList");
var occ = this.decode ("occupancyList");
var x = this.decode ("xCoordList");
var y = this.decode ("yCoordList");
var z = this.decode ("zCoordList");
var bf = this.decode ("bFactorList");
var nameList = (this.useAuthorChainID ? authAsymList : this.labelAsymList);
var iModel = -1;
var iChain = 0;
var nChain = 0;
var iGroup = 0;
var nGroup = 0;
var chainpt = 0;
var seqNo = 0;
var iatom = 0;
var chainID = "";
var authAsym = "";
var labelAsym = "";
var insCode = '\u0000';
this.atomMap =  new Array (this.fileAtomCount);
this.atomGroup =  Clazz.newIntArray (this.fileAtomCount, 0);
for (var j = 0, thisGroup = -1; j < this.groupCount; j++) {
if (++iGroup >= nGroup) {
chainID = nameList[chainpt];
authAsym = authAsymList[chainpt];
labelAsym = this.labelAsymList[chainpt];
nGroup = groupsPerChain[chainpt++];
iGroup = 0;
if (++iChain >= nChain) {
this.groupModels[j] = ++iModel;
nChain = chainsPerModel[iModel];
iChain = 0;
this.setModelPDB (true);
this.incrementModel (iModel + 1);
this.asc.setCurrentModelInfo ("pdbID", this.$pdbID);
this.nAtoms0 = this.asc.ac;
if (this.done) return;
}}var g = groupList[groupTypeList[j]];
var atomNameList = g.get ("atomNameList");
var len = atomNameList.length;
if (this.skipping) {
iatom += len;
continue;
}var a0 = iatom;
if (insCodes != null) insCode = insCodes[j];
seqNo = groupIdList[j];
var group3 = g.get ("groupName");
var isHetero = this.vwr.getJBR ().isHetero (group3);
if (isHetero) {
var hetName = "" + g.get ("chemCompType");
if (this.htHetero == null || !this.htHetero.containsKey (group3)) {
if (this.entities != null && hetName.equals ("NON-POLYMER")) out : for (var i = this.entities.length; --i >= 0; ) {
var entity = this.entities[i];
var chainList = entity.get ("chainIndexList");
for (var k = chainList.length; --k >= 0; ) if (chainList[k] == iChain) {
hetName = "a component of the entity \"" + entity.get ("description") + "\"";
break out;
}
}
this.addHetero (group3, hetName, false, true);
}}var elementList = g.get ("elementList");
var haveAtom = false;
for (var ia = 0, pt = 0; ia < len; ia++, iatom++) {
var a =  new J.adapter.smarter.Atom ();
a.isHetero = isHetero;
if (insCode.charCodeAt (0) != 0) a.insertionCode = insCode;
this.setAtomCoordXYZ (a, x[iatom], y[iatom], z[iatom]);
a.elementSymbol = elementList[pt];
a.atomName = atomNameList[pt++];
if (seqNo >= 0) this.maxSerial = Math.max (this.maxSerial, a.sequenceNumber = seqNo);
a.group3 = group3;
this.setChainID (a, chainID);
if (bf != null) a.bfactor = bf[iatom];
if (altloc != null) a.altLoc = altloc[iatom];
if (occ != null) a.foccupancy = occ[iatom];
if (haveSerial) a.atomSerial = atomId[iatom];
if (!this.filterAtom (a, -1) || !this.processSubclassAtom (a, labelAsym, authAsym)) continue;
if (!haveAtom) {
thisGroup++;
haveAtom = true;
}if (haveSerial) {
this.asc.addAtomWithMappedSerialNumber (a);
} else {
this.asc.addAtom (a);
}this.atomMap[iatom] = a;
this.atomGroup[this.ac] = j;
this.groupMap[j] = this.lastGroup = thisGroup;
this.ac++;
}
if (!this.isCourseGrained) {
var bo = g.get ("bondOrderList");
var bi = g.get ("bondAtomList");
this.addMMTFBonds (bo, bi, a0, doMulti, false);
}}
this.asc.setCurrentModelInfo ("pdbID", this.$pdbID);
}, "~B");
Clazz.defineMethod (c$, "addMMTFBonds", 
 function (bo, bi, a0, doMulti, isInter) {
if (bi == null) return;
doMulti = new Boolean (doMulti & (bo != null)).valueOf ();
for (var bj = 0, pt = 0, nj = Clazz.doubleToInt (bi.length / 2); bj < nj; bj++) {
var a1 = this.atomMap[bi[pt++] + a0];
var a2 = this.atomMap[bi[pt++] + a0];
if (a1 != null && a2 != null) {
var bond =  new J.adapter.smarter.Bond (a1.index, a2.index, doMulti ? bo[bj] : 1);
this.asc.addBond (bond);
if (JU.Logger.debugging && isInter) {
JU.Logger.info ("inter-group (" + (a1.atomSetIndex + 1) + "." + a1.index + "/" + (a2.atomSetIndex + 1) + "." + a2.index + ") bond " + a1.group3 + a1.sequenceNumber + "." + a1.atomName + " - " + a2.group3 + a2.sequenceNumber + "." + a2.atomName + " " + bond.order);
}}}
}, "~A,~A,~N,~B,~B");
Clazz.defineMethod (c$, "setMMTFSymmetry", 
 function () {
this.setSpaceGroupName (this.map.get ("spaceGroup"));
var o = this.map.get ("unitCell");
if (o != null) for (var i = 0; i < 6; i++) this.setUnitCellItem (i, o[i]);

});
Clazz.defineMethod (c$, "getMMTFBioAssembly", 
 function () {
var o = this.map.get ("bioAssemblyList");
if (o == null) return;
if (this.vBiomolecules == null) this.vBiomolecules =  new JU.Lst ();
for (var i = o.length; --i >= 0; ) {
var info =  new java.util.Hashtable ();
this.vBiomolecules.addLast (info);
var iMolecule = i + 1;
this.checkFilterAssembly ("" + iMolecule, info);
info.put ("name", "biomolecule " + iMolecule);
info.put ("molecule", Integer.$valueOf (iMolecule));
var assemb =  new JU.Lst ();
var ops =  new JU.Lst ();
info.put ("biomts",  new JU.Lst ());
info.put ("chains",  new JU.Lst ());
info.put ("assemblies", assemb);
info.put ("operators", ops);
var m = o[i];
var tlist = m.get ("transformList");
var chlist =  new JU.SB ();
for (var j = 0, n = tlist.length; j < n; j++) {
var t = tlist[j];
chlist.setLength (0);
var chainList = t.get ("chainIndexList");
for (var k = 0, kn = chainList.length; k < kn; k++) chlist.append ("$").append (this.labelAsymList[chainList[k]]);

assemb.addLast (chlist.append ("$").toString ());
var id = "" + (++this.opCount);
this.addMatrix (id, JU.M4.newA16 (t.get ("matrix")), false);
ops.addLast (id);
}
}
});
Clazz.defineMethod (c$, "getStructure", 
 function () {
var a = this.decode ("secStructList");
if (JU.Logger.debugging) JU.Logger.info (JU.PT.toJSON ("secStructList", a));
this.bsStructures =  Clazz.newArray (-1, [ new JU.BS (), null,  new JU.BS (),  new JU.BS (),  new JU.BS (), null,  new JU.BS ()]);
var lastGroup = -1;
for (var j = 0; j < a.length; j++) {
var type = a[j];
switch (type) {
case 0:
case 2:
case 3:
case 4:
case 6:
var igroup = this.groupMap[j];
this.bsStructures[type].set (igroup);
this.groupDSSP[igroup] = type + 1;
lastGroup = j;
}
}
var n = (this.isDSSP1 ? this.asc.iSet : this.groupModels[lastGroup]);
if (lastGroup >= 0) {
this.haveStructure = true;
this.asc.addStructure ( new J.adapter.smarter.Structure (n, null, null, null, 0, 0, this.bsStructures));
}});
Clazz.defineMethod (c$, "addStructureSymmetry", 
 function () {
if (this.asc.ac == 0) return;
var atoms = this.asc.atoms;
var bsAtoms = this.asc.bsAtoms;
var ptGroup = this.lastGroup;
var mygroup = -1;
for (var i = this.ac0, n = this.asc.ac; i < n; i++) {
if (bsAtoms == null || bsAtoms.get (i)) {
var a = atoms[i];
var igroup = this.atomGroup[a.atomSite];
if (igroup != mygroup) {
mygroup = igroup;
ptGroup++;
}var dssp = this.groupDSSP[igroup];
if (dssp > 0) {
this.bsStructures[dssp - 1].set (ptGroup);
}}}
});
Clazz.defineMethod (c$, "decode", 
 function (key) {
return JU.MessagePackReader.decode (this.map.get (key));
}, "~S");
});
