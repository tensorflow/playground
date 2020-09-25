Clazz.declarePackage ("J.adapter.readers.cif");
Clazz.load (["J.adapter.readers.cif.CifReader"], "J.adapter.readers.cif.MMCifReader", ["java.lang.Boolean", "java.util.Hashtable", "JU.BS", "$.Lst", "$.M4", "$.P3", "$.PT", "$.SB", "J.adapter.smarter.Atom", "$.Structure", "J.c.STR", "JU.BSUtil", "$.Logger"], function () {
c$ = Clazz.decorateAsClass (function () {
this.isBiomolecule = false;
this.byChain = false;
this.bySymop = false;
this.chainAtomMap = null;
this.chainAtomCounts = null;
this.vBiomolecules = null;
this.htBiomts = null;
this.htSites = null;
this.htHetero = null;
this.htBondMap = null;
this.assemblyIdAtoms = null;
this.thisChain = -1;
this.modelIndex = 0;
this.chainSum = null;
this.chainAtomCount = null;
this.isLigandBondBug = false;
this.mident = null;
this.requiresSorting = false;
this.structConnMap = null;
this.structConnList = "";
this.doSetBonds = false;
this.modelStrings = "";
this.done = false;
Clazz.instantialize (this, arguments);
}, J.adapter.readers.cif, "MMCifReader", J.adapter.readers.cif.CifReader);
Clazz.overrideMethod (c$, "initSubclass", 
function () {
this.setIsPDB ();
this.mident = JU.M4.newM4 (null);
this.isMMCIF = true;
if (this.isDSSP1) this.asc.setInfo ("isDSSP1", Boolean.TRUE);
if (this.htParams.containsKey ("isMutate")) this.asc.setInfo ("isMutate", Boolean.TRUE);
this.doSetBonds = this.checkFilterKey ("ADDBONDS");
this.byChain = this.checkFilterKey ("BYCHAIN");
if (this.checkFilterKey ("BIOMOLECULE")) this.filter = JU.PT.rep (this.filter, "BIOMOLECULE", "ASSEMBLY");
this.isBiomolecule = this.checkFilterKey ("ASSEMBLY");
if (this.isBiomolecule) {
this.filter = this.filter.$replace (':', ' ');
this.bySymop = this.checkFilterKey ("BYSYMOP");
}this.isCourseGrained = this.byChain || this.bySymop;
if (this.isCourseGrained) {
this.chainAtomMap =  new java.util.Hashtable ();
this.chainAtomCounts =  new java.util.Hashtable ();
}this.isLigandBondBug = (this.stateScriptVersionInt >= 140204 && this.stateScriptVersionInt <= 140208 || this.stateScriptVersionInt >= 140304 && this.stateScriptVersionInt <= 140308);
});
Clazz.overrideMethod (c$, "processSubclassEntry", 
function () {
if (this.key0.startsWith ("_pdbx_struct_assembly_gen.") || this.key0.startsWith ("_struct_conn.") || this.key0.startsWith ("_struct_ref_seq_dif.") || this.key0.startsWith ("_struct_conf.") || this.key0.startsWith ("_struct_sheet_range.")) this.processSubclassLoopBlock ();
 else if (this.key.equals ("_rna3d")) {
this.addedData = this.data;
this.addedDataKey = this.key;
} else if (this.key.equals ("_dssr")) {
this.dssr = this.vwr.parseJSONMap (this.reader.readLine ());
this.reader.readLine ();
}});
Clazz.overrideMethod (c$, "processSubclassLoopBlock", 
function () {
if (this.key0.startsWith ("_struct_ncs_oper.")) return this.processStructOperListBlock (true);
if (this.key0.startsWith ("_pdbx_struct_oper_list.")) return this.processStructOperListBlock (false);
if (this.key0.startsWith ("_pdbx_struct_assembly_gen.")) return this.processAssemblyGenBlock ();
if (this.key0.startsWith ("_struct_ref_seq_dif.")) return this.processSequence ();
if (this.isCourseGrained) return false;
if (this.key0.startsWith ("_struct_site_gen.")) return this.processStructSiteBlock ();
if (this.key0.startsWith ("_chem_comp.")) return this.processChemCompLoopBlock ();
if (this.key0.startsWith ("_struct_conf.")) return this.processStructConfLoopBlock ();
if (this.key0.startsWith ("_struct_sheet_range.")) return this.processStructSheetRangeLoopBlock ();
if (this.isLigandBondBug) return false;
if (this.key0.startsWith ("_chem_comp_bond.")) return this.processCompBondLoopBlock ();
if (this.key0.startsWith ("_struct_conn.")) return this.processStructConnLoopBlock ();
return false;
});
Clazz.defineMethod (c$, "sortAssemblyModels", 
function () {
var natoms = this.asc.ac;
var lastSet = -1;
var atoms = this.asc.atoms;
var newAtoms =  new Array (natoms);
var ids = JU.PT.split ("," + this.modelStrings + ",", ",,");
var bsAtomsNew = (this.asc.bsAtoms == null ? null : JU.BS.newN (this.asc.bsAtoms.size ()));
for (var im = 1, n = 0; im < ids.length; im++) {
var sModel = ids[im];
var modelIndex = -1;
for (var is = 0; is < this.asc.atomSetCount; is++) {
var ia0 = this.asc.getAtomSetAtomIndex (is);
var ia1 = ia0 + this.asc.getAtomSetAtomCount (is);
var am = "" + this.modelMap.get ("_" + is);
if (am.equals (sModel)) {
if (modelIndex < 0 && (modelIndex = is) > lastSet) lastSet = is;
for (var i = ia0; i < ia1; i++) {
if (bsAtomsNew == null || this.asc.bsAtoms.get (i)) {
if (bsAtomsNew != null) bsAtomsNew.set (n);
atoms[i].atomSetIndex = modelIndex;
newAtoms[n++] = atoms[i];
}}
}}
}
this.asc.atoms = newAtoms;
this.asc.bsAtoms = bsAtomsNew;
if (++lastSet < this.asc.atomSetCount) this.asc.atomSetCount = lastSet;
});
Clazz.overrideMethod (c$, "finalizeSubclass", 
function () {
if (this.byChain && !this.isBiomolecule) for (var id, $id = this.chainAtomMap.keySet ().iterator (); $id.hasNext () && ((id = $id.next ()) || true);) this.createParticle (id);

var haveBiomolecule = (this.isBiomolecule && this.vBiomolecules != null && this.vBiomolecules.size () > 0);
if (!this.isCourseGrained && this.asc.ac == this.nAtoms) {
this.asc.removeCurrentAtomSet ();
} else {
if ((this.dssr != null || this.validation != null || this.addedData != null) && !this.isCourseGrained && !this.requiresSorting) {
var vs = (this.getInterface ("J.adapter.readers.cif.MMCifValidationParser")).set (this);
var note = null;
if (this.addedData == null) {
if (this.validation != null || this.dssr != null) note = vs.finalizeValidations (this.vwr, this.modelMap);
} else if (this.addedDataKey.equals ("_rna3d")) {
note = vs.finalizeRna3d (this.modelMap);
}if (note != null) this.appendLoadNote (note);
}this.setHetero ();
if (this.doSetBonds) this.setBonds ();
}if (this.asc.ac == 0 && !this.isCourseGrained) return false;
var spaceGroup = this.sgName;
if (this.htSites != null) this.addSites (this.htSites);
if (haveBiomolecule) {
this.asc.setCurrentModelInfo ("biomolecules", this.vBiomolecules);
this.setBiomolecules ();
if (this.thisBiomolecule != null) {
if (this.iHaveFractionalCoordinates) this.fractionalizeCoordinates (false);
this.asc.getXSymmetry ().applySymmetryBio (this.thisBiomolecule, this.applySymmetryToBonds, this.filter);
this.asc.xtalSymmetry = null;
}this.doCheckUnitCell = new Boolean (this.doCheckUnitCell & (this.iHaveUnitCell && this.doApplySymmetry)).valueOf ();
if (this.doCheckUnitCell) {
this.ignoreFileSpaceGroupName = true;
this.sgName = spaceGroup;
this.fractionalizeCoordinates (true);
this.asc.setCurrentModelInfo ("biosymmetry", null);
this.asc.setCurrentModelInfo ("biosymmetryCount", null);
this.asc.checkSpecial = false;
if (this.byChain) return true;
}}if (this.latticeCells != null && this.latticeCells[0] != 0) this.addJmolScript ("unitcell;axes on;axes unitcell;");
if (this.requiresSorting) this.sortAssemblyModels ();
return true;
});
Clazz.overrideMethod (c$, "checkSubclassSymmetry", 
function () {
this.asc.checkSpecial = false;
var modelIndex = this.asc.iSet;
this.asc.setCurrentModelInfo ("PDB_CONECT_firstAtom_count_max",  Clazz.newIntArray (-1, [this.asc.getAtomSetAtomIndex (modelIndex), this.asc.getAtomSetAtomCount (modelIndex), this.maxSerial]));
return false;
});
Clazz.defineMethod (c$, "setBonds", 
 function () {
if (this.htBondMap == null) return;
var bsAtoms = this.asc.bsAtoms;
if (bsAtoms == null) bsAtoms = JU.BSUtil.newBitSet2 (0, this.asc.ac);
var atoms = this.asc.atoms;
var seqid = -1;
var comp = null;
var map = null;
for (var i = bsAtoms.nextSetBit (0); i >= 0; i = bsAtoms.nextSetBit (i + 1)) {
var a = atoms[i];
var pt = (a.vib == null ? a.sequenceNumber : a.vib.x);
if (pt != seqid) {
seqid = pt;
if (comp != null) this.processBonds (this.htBondMap.get (comp), map, false);
map =  new java.util.Hashtable ();
comp = atoms[i].group3;
if (!this.htBondMap.containsKey (comp)) {
comp = null;
continue;
}}if (comp == null) continue;
map.put (a.atomName, Integer.$valueOf (a.index));
}
if (comp != null) this.processBonds (this.htBondMap.get (comp), map, false);
if (this.structConnMap != null) {
map =  new java.util.Hashtable ();
seqid = -1;
comp = null;
for (var i = bsAtoms.nextSetBit (0); i >= 0; i = bsAtoms.nextSetBit (i + 1)) {
var a = atoms[i];
var pt = (a.vib == null ? a.sequenceNumber : a.vib.x);
if (pt != seqid) {
seqid = pt;
var ckey = a.chainID + a.group3 + seqid;
if (this.structConnList.indexOf (ckey) < 0) {
comp = null;
continue;
}comp = ckey;
}if (comp == null) continue;
map.put (comp + a.atomName + a.altLoc, Integer.$valueOf (a.index));
}
this.processBonds (this.structConnMap, map, true);
}this.appendLoadNote (this.asc.bondCount + " bonds added");
});
Clazz.defineMethod (c$, "processBonds", 
 function (cmap, map, isStructConn) {
var i1;
var i2;
for (var i = 0, n = cmap.size (); i < n; i++) {
var o = cmap.get (i);
if ((i1 = map.get (o[0])) == null || (i2 = map.get (o[1])) == null) continue;
if (this.debugging) JU.Logger.debug ((isStructConn ? "_struct_conn" : "_comp_bond") + " adding bond " + i1 + " " + i2 + " order=" + o[2]);
this.asc.addNewBondWithOrder (i1.intValue (), i2.intValue (), (o[2]).intValue ());
}
}, "JU.Lst,java.util.Map,~B");
Clazz.defineMethod (c$, "processSequence", 
 function () {
this.parseLoopParameters (J.adapter.readers.cif.MMCifReader.structRefFields);
var g1;
var g3;
while (this.parser.getData ()) {
if (this.isNull (g1 = this.getField (1).toLowerCase ()) || g1.length != 1 || this.isNull (g3 = this.getField (0))) continue;
if (this.htGroup1 == null) this.asc.setInfo ("htGroup1", this.htGroup1 =  new java.util.Hashtable ());
this.htGroup1.put (g3, g1);
}
return true;
});
Clazz.defineMethod (c$, "processAssemblyGenBlock", 
 function () {
this.parseLoopParameters (J.adapter.readers.cif.MMCifReader.assemblyFields);
while (this.parser.getData ()) {
var assem =  new Array (3);
var count = 0;
var p;
var n = this.parser.getColumnCount ();
for (var i = 0; i < n; ++i) {
switch (p = this.fieldProperty (i)) {
case 0:
case 1:
case 2:
count++;
assem[p] = this.field;
break;
}
}
if (count == 3) this.addAssembly (assem);
}
return true;
});
Clazz.defineMethod (c$, "addAssembly", 
function (assem) {
var id = assem[0];
var list = assem[2];
var operators = assem[1];
var name = "biomolecule " + id;
JU.Logger.info (name + " operators " + operators + " ASYM_IDs " + list);
this.appendLoadNote ("found " + name + ": " + list);
if (this.vBiomolecules == null) this.vBiomolecules =  new JU.Lst ();
var info = null;
for (var i = this.vBiomolecules.size (); --i >= 0; ) if (this.vBiomolecules.get (i).get ("name").equals (name)) {
info = this.vBiomolecules.get (i);
break;
}
if (info == null) {
info =  new java.util.Hashtable ();
info.put ("name", name);
var iMolecule = this.parseIntStr (id);
info.put ("molecule", iMolecule == -2147483648 ? id : Integer.$valueOf (iMolecule));
info.put ("biomts",  new JU.Lst ());
info.put ("chains",  new JU.Lst ());
info.put ("assemblies",  new JU.Lst ());
info.put ("operators",  new JU.Lst ());
this.vBiomolecules.addLast (info);
}(info.get ("assemblies")).addLast ("$" + list.$replace (',', '$'));
(info.get ("operators")).addLast (this.decodeAssemblyOperators (operators));
this.checkFilterAssembly (id, info);
}, "~A");
Clazz.defineMethod (c$, "checkFilterAssembly", 
function (id, info) {
if (this.checkFilterKey ("ASSEMBLY " + id + ";") || this.checkFilterKey ("ASSEMBLY=" + id + ";")) this.thisBiomolecule = info;
}, "~S,java.util.Map");
Clazz.defineMethod (c$, "decodeAssemblyOperators", 
 function (ops) {
var pt = ops.indexOf (")(");
if (pt >= 0) return this.crossBinary (this.decodeAssemblyOperators (ops.substring (0, pt + 1)), this.decodeAssemblyOperators (ops.substring (pt + 1)));
if (ops.startsWith ("(")) {
if (ops.indexOf ("-") >= 0) ops = JU.BS.unescape ("({" + ops.substring (1, ops.length - 1).$replace ('-', ':').$replace (',', ' ') + "})").toJSON ();
ops = JU.PT.rep (ops, " ", "");
ops = ops.substring (1, ops.length - 1);
}return ops;
}, "~S");
Clazz.defineMethod (c$, "crossBinary", 
 function (ops1, ops2) {
var sb =  new JU.SB ();
var opsLeft = JU.PT.split (ops1, ",");
var opsRight = JU.PT.split (ops2, ",");
for (var i = 0; i < opsLeft.length; i++) for (var j = 0; j < opsRight.length; j++) sb.append (",").append (opsLeft[i]).append ("|").append (opsRight[j]);


return sb.toString ().substring (1);
}, "~S,~S");
Clazz.defineMethod (c$, "processStructOperListBlock", 
 function (isNCS) {
this.parseLoopParametersFor ((isNCS ? "_struct_ncs_oper" : "_pdbx_struct_oper_list"), isNCS ? J.adapter.readers.cif.MMCifReader.ncsoperFields : J.adapter.readers.cif.MMCifReader.operFields);
var m =  Clazz.newFloatArray (16, 0);
m[15] = 1;
while (this.parser.getData ()) {
var count = 0;
var id = null;
var xyz = null;
var n = this.parser.getColumnCount ();
for (var i = 0; i < n; ++i) {
var p = this.fieldProperty (i);
switch (p) {
case -1:
break;
case 12:
id = this.field;
break;
case 13:
xyz = this.field;
break;
default:
m[p] = this.parseFloatStr (this.field);
++count;
}
}
if (id != null && (count == 12 || xyz != null && this.symmetry != null)) {
JU.Logger.info ((isNCS ? "noncrystallographic symmetry operator " : "assembly operator ") + id + " " + xyz);
var m4 =  new JU.M4 ();
if (count != 12) {
this.symmetry.getMatrixFromString (xyz, m, false, 0);
m[3] *= this.symmetry.getUnitCellInfoType (0) / 12;
m[7] *= this.symmetry.getUnitCellInfoType (1) / 12;
m[11] *= this.symmetry.getUnitCellInfoType (2) / 12;
}m4.setA (m);
this.addMatrix (id, m4, isNCS);
}}
return true;
}, "~B");
Clazz.defineMethod (c$, "addMatrix", 
function (id, m4, isNCS) {
if (isNCS) {
if (m4.equals (this.mident)) return;
m4.m33 = 0;
if (this.lstNCS == null) this.lstNCS =  new JU.Lst ();
this.lstNCS.addLast (m4);
} else {
if (this.htBiomts == null) this.htBiomts =  new java.util.Hashtable ();
this.htBiomts.put (id, m4);
}}, "~S,JU.M4,~B");
Clazz.defineMethod (c$, "processChemCompLoopBlock", 
 function () {
this.parseLoopParameters (J.adapter.readers.cif.MMCifReader.chemCompFields);
var groupName;
var hetName;
while (this.parser.getData ()) if (!this.isNull (groupName = this.getField (0)) && !this.isNull (hetName = this.getField (1))) this.addHetero (groupName, hetName, true, true);

return true;
});
Clazz.defineMethod (c$, "addHetero", 
function (groupName, hetName, doCheck, addNote) {
if (doCheck && !this.vwr.getJBR ().isHetero (groupName)) return;
if (this.htHetero == null) this.htHetero =  new java.util.Hashtable ();
if (doCheck && this.htHetero.containsKey (groupName)) return;
this.htHetero.put (groupName, hetName);
if (addNote) this.appendLoadNote (groupName + " = " + hetName);
}, "~S,~S,~B,~B");
Clazz.defineMethod (c$, "processStructConfLoopBlock", 
 function () {
if (this.ignoreStructure) {
this.parser.skipLoop (false);
return false;
}this.parseLoopParametersFor ("_struct_conf", J.adapter.readers.cif.MMCifReader.structConfFields);
if (!this.checkAllFieldsPresent (J.adapter.readers.cif.MMCifReader.structConfFields, -1, true)) {
this.parser.skipLoop (true);
return false;
}while (this.parser.getData ()) {
var structure =  new J.adapter.smarter.Structure (-1, J.c.STR.HELIX, J.c.STR.HELIX, null, 0, 0, null);
var type = this.getField (0);
if (type.startsWith ("TURN")) structure.structureType = structure.substructureType = J.c.STR.TURN;
 else if (!type.startsWith ("HELX")) structure.structureType = structure.substructureType = J.c.STR.NONE;
 else structure.substructureType = J.adapter.smarter.Structure.getHelixType (this.parseIntStr (this.getField (9)));
structure.serialID = this.parseIntStr (this.getField (8));
structure.structureID = this.getField (7);
this.addStructure (structure);
}
return true;
});
Clazz.defineMethod (c$, "addStructure", 
 function (structure) {
structure.startChainID = this.vwr.getChainID (structure.startChainStr = this.getField (1), true);
structure.startSequenceNumber = this.parseIntStr (this.getField (2));
structure.startInsertionCode = this.getField (3).charAt (0);
structure.endChainID = this.vwr.getChainID (structure.endChainStr = this.getField (4), true);
structure.endSequenceNumber = this.parseIntStr (this.getField (5));
structure.endInsertionCode = this.getField (6).charAt (0);
this.asc.addStructure (structure);
}, "J.adapter.smarter.Structure");
Clazz.defineMethod (c$, "processStructSheetRangeLoopBlock", 
 function () {
if (this.ignoreStructure) {
this.parser.skipLoop (false);
return false;
}this.parseLoopParametersFor ("_struct_sheet_range", J.adapter.readers.cif.MMCifReader.structSheetRangeFields);
if (!this.checkAllFieldsPresent (J.adapter.readers.cif.MMCifReader.structSheetRangeFields, -1, true)) {
this.parser.skipLoop (true);
return false;
}while (this.parser.getData ()) this.addStructure ( new J.adapter.smarter.Structure (-1, J.c.STR.SHEET, J.c.STR.SHEET, this.getField (0), this.parseIntStr (this.getField (7)), 1, null));

return true;
});
Clazz.defineMethod (c$, "processStructSiteBlock", 
 function () {
this.parseLoopParametersFor ("_struct_site_gen", J.adapter.readers.cif.MMCifReader.structSiteFields);
var htSite = null;
this.htSites =  new java.util.Hashtable ();
var seqNum;
var resID;
while (this.parser.getData ()) {
if (this.isNull (seqNum = this.getField (3)) || this.isNull (resID = this.getField (1))) continue;
var siteID = this.getField (0);
htSite = this.htSites.get (siteID);
if (htSite == null) {
htSite =  new java.util.Hashtable ();
htSite.put ("groups", "");
this.htSites.put (siteID, htSite);
}var insCode = this.getField (4);
var chainID = this.getField (2);
var group = "[" + resID + "]" + seqNum + (this.isNull (insCode) ? "" : "^" + insCode) + (this.isNull (chainID) ? "" : ":" + chainID);
var groups = htSite.get ("groups");
groups += (groups.length == 0 ? "" : ",") + group;
htSite.put ("groups", groups);
}
return true;
});
Clazz.defineMethod (c$, "setBiomolecules", 
 function () {
if (this.assemblyIdAtoms == null && this.chainAtomCounts == null) return;
var bsAll =  new JU.BS ();
for (var i = this.vBiomolecules.size (); --i >= 0; ) {
var biomolecule = this.vBiomolecules.get (i);
this.setBiomolecule (biomolecule, (biomolecule === this.thisBiomolecule ? bsAll : null));
}
if (this.isBiomolecule && bsAll.cardinality () < this.asc.ac) {
if (this.asc.bsAtoms != null) this.asc.bsAtoms.and (bsAll);
 else if (!this.isCourseGrained) this.asc.bsAtoms = bsAll;
}});
Clazz.defineMethod (c$, "setBiomolecule", 
 function (biomolecule, bsAll) {
var biomtchains = biomolecule.get ("chains");
var biomts = biomolecule.get ("biomts");
var operators = biomolecule.get ("operators");
var assemblies = biomolecule.get ("assemblies");
var sum =  new JU.P3 ();
var count = 0;
var bsAtoms =  new JU.BS ();
var nAtomsTotal = 0;
var isBioCourse = (this.isBiomolecule && this.isCourseGrained);
for (var i = operators.size (); --i >= 0; ) {
var ops = JU.PT.split (operators.get (i), ",");
var ids = JU.PT.split (assemblies.get (i), "$");
var chainlist = "";
var nAtoms = 0;
for (var j = 1; j < ids.length; j++) {
var id = ids[j];
chainlist += ":" + id + ";";
if (this.assemblyIdAtoms != null) {
biomolecule.put ("asemblyIdAtoms", this.assemblyIdAtoms);
var bs = this.assemblyIdAtoms.get (id);
if (bs != null) {
bsAtoms.or (bs);
if (bsAll != null) bsAll.or (bs);
nAtoms += bs.cardinality ();
}} else if (isBioCourse) {
var asum = this.chainAtomMap.get (id);
if (asum != null) {
if (this.bySymop) {
sum.add (asum);
count += this.chainAtomCounts.get (id)[0];
} else {
this.createParticle (id);
nAtoms++;
}}}}
if (!this.isBiomolecule) continue;
for (var j = 0; j < ops.length; j++) {
var m = this.getOpMatrix (ops[j]);
if (m == null) return 0;
if (m.equals (this.mident)) {
biomts.add (0, this.mident);
biomtchains.add (0, chainlist);
} else {
biomts.addLast (m);
biomtchains.addLast (chainlist);
}}
if (this.bySymop && bsAll != null) {
nAtoms = 1;
var a1 =  new J.adapter.smarter.Atom ();
a1.setT (sum);
a1.scale (1 / count);
a1.radius = 16;
this.asc.addAtom (a1);
}nAtoms *= ops.length;
nAtomsTotal += nAtoms;
}
biomolecule.put ("atomCount", Integer.$valueOf (nAtomsTotal));
return nAtomsTotal;
}, "java.util.Map,JU.BS");
Clazz.defineMethod (c$, "createParticle", 
 function (id) {
var asum = this.chainAtomMap.get (id);
var c = this.chainAtomCounts.get (id)[0];
var a =  new J.adapter.smarter.Atom ();
a.setT (asum);
a.scale (1 / c);
a.elementSymbol = "Pt";
this.setChainID (a, id);
a.radius = 16;
this.asc.addAtom (a);
}, "~S");
Clazz.defineMethod (c$, "getOpMatrix", 
 function (ops) {
if (this.htBiomts == null) return JU.M4.newM4 (null);
var pt = ops.indexOf ("|");
if (pt >= 0) {
var m = JU.M4.newM4 (this.htBiomts.get (ops.substring (0, pt)));
m.mul (this.htBiomts.get (ops.substring (pt + 1)));
return m;
}return this.htBiomts.get (ops);
}, "~S");
Clazz.defineMethod (c$, "processStructConnLoopBlock", 
 function () {
this.parseLoopParametersFor ("_struct_conn", J.adapter.readers.cif.MMCifReader.structConnFields);
while (this.parser.getData ()) {
var sym1 = this.getField (5);
var sym2 = this.getField (11);
if (!sym1.equals (sym2) || !this.isNull (sym1) && !sym1.equals ("1_555")) continue;
var type = this.getField (12);
if (!type.startsWith ("covale") && !type.equals ("disulf") && !type.equals ("metalc")) continue;
if (this.htBondMap == null) this.htBondMap =  new java.util.Hashtable ();
var key1 = this.vwr.getChainID (this.getField (0), true) + this.getField (2) + this.parseFloatStr (this.getField (1)) + this.getField (3) + this.getField (4);
var key2 = this.vwr.getChainID (this.getField (6), true) + this.getField (8) + this.parseFloatStr (this.getField (7)) + this.getField (9) + this.getField (10);
var order = this.getBondOrder (this.getField (13));
if (this.structConnMap == null) this.structConnMap =  new JU.Lst ();
this.structConnMap.addLast ( Clazz.newArray (-1, [key1, key2, Integer.$valueOf (order)]));
if (this.structConnList.indexOf (key1) < 0) this.structConnList += key1;
if (this.structConnList.indexOf (key2) < 0) this.structConnList += key2;
}
return true;
});
Clazz.defineMethod (c$, "processCompBondLoopBlock", 
 function () {
this.doSetBonds = true;
this.parseLoopParametersFor ("_chem_comp_bond", J.adapter.readers.cif.MMCifReader.chemCompBondFields);
while (this.parser.getData ()) {
var comp = this.getField (0);
var atom1 = this.getField (1);
var atom2 = this.getField (2);
var order = this.getBondOrder (this.getField (3));
if ((this.getField (4).charAt (0) == 'Y')) switch (order) {
case 1:
order = 513;
break;
case 2:
order = 514;
break;
}
if (this.isLigand) {
this.asc.addNewBondWithOrderA (this.asc.getAtomFromName (atom1), this.asc.getAtomFromName (atom2), order);
} else if (this.haveHAtoms || this.htHetero != null && this.htHetero.containsKey (comp)) {
if (this.htBondMap == null) this.htBondMap =  new java.util.Hashtable ();
var cmap = this.htBondMap.get (comp);
if (cmap == null) this.htBondMap.put (comp, cmap =  new JU.Lst ());
cmap.addLast ( Clazz.newArray (-1, [atom1, atom2, Integer.$valueOf (this.haveHAtoms ? order : 1)]));
}}
return true;
});
Clazz.overrideMethod (c$, "processSubclassAtom", 
function (atom, assemblyId, strChain) {
if (this.isBiomolecule) {
if (this.isCourseGrained) {
var sum = this.chainAtomMap.get (assemblyId);
if (sum == null) {
this.chainAtomMap.put (assemblyId, sum =  new JU.P3 ());
this.chainAtomCounts.put (assemblyId,  Clazz.newIntArray (1, 0));
}this.chainAtomCounts.get (assemblyId)[0]++;
sum.add (atom);
return false;
}} else if (this.byChain) {
if (this.thisChain != atom.chainID) {
this.thisChain = atom.chainID;
this.chainSum = this.chainAtomMap.get (strChain);
if (this.chainSum == null) {
this.chainAtomMap.put (strChain, this.chainSum =  new JU.P3 ());
this.chainAtomCounts.put (strChain, this.chainAtomCount =  Clazz.newIntArray (1, 0));
}}this.chainSum.add (atom);
this.chainAtomCount[0]++;
return false;
}if (assemblyId != null) {
if (this.assemblyIdAtoms == null) this.assemblyIdAtoms =  new java.util.Hashtable ();
var bs = this.assemblyIdAtoms.get (assemblyId);
if (bs == null) this.assemblyIdAtoms.put (assemblyId, bs =  new JU.BS ());
bs.set (this.ac);
}return true;
}, "J.adapter.smarter.Atom,~S,~S");
Clazz.overrideMethod (c$, "checkPDBModelField", 
function (modelField, currentModelNo) {
this.fieldProperty (modelField);
var modelNo = this.parseIntStr (this.field);
return (modelNo == currentModelNo ? modelNo : this.incrementModel (modelNo));
}, "~N,~N");
Clazz.defineMethod (c$, "incrementModel", 
function (modelNo) {
var isAssembly = (this.thisDataSetName != null && this.thisDataSetName.indexOf ("-assembly-") >= 0);
if (isAssembly) {
this.useFileModelNumbers = true;
var key = "," + modelNo + ",";
if (this.modelStrings.indexOf (key) >= 0) {
this.requiresSorting = true;
} else {
this.modelStrings += key;
}}if (this.iHaveDesiredModel && this.asc.atomSetCount > 0 && !isAssembly) {
this.done = true;
if (this.parser != null) {
this.parser.skipLoop (false);
this.skipping = false;
}this.continuing = true;
return -2147483648;
}var modelNumberToUse = (this.useFileModelNumbers ? modelNo : ++this.modelIndex);
this.setHetero ();
this.newModel (modelNumberToUse);
if (!this.skipping) {
this.nextAtomSet ();
if (this.modelMap == null || this.asc.ac == 0) this.modelMap =  new java.util.Hashtable ();
this.modelMap.put ("" + modelNo, Integer.$valueOf (Math.max (0, this.asc.iSet)));
this.modelMap.put ("_" + Math.max (0, this.asc.iSet), Integer.$valueOf (modelNo));
}return modelNo;
}, "~N");
Clazz.defineMethod (c$, "setHetero", 
 function () {
if (this.htHetero != null) {
this.asc.setCurrentModelInfo ("hetNames", this.htHetero);
this.asc.setInfo ("hetNames", this.htHetero);
}});
Clazz.defineStatics (c$,
"OPER_ID", 12,
"OPER_XYZ", 13,
"FAMILY_NCS_CAT", "_struct_ncs_oper.",
"FAMILY_NCS", "_struct_ncs_oper",
"ncsoperFields",  Clazz.newArray (-1, ["*_matrix[1][1]", "*_matrix[1][2]", "*_matrix[1][3]", "*_vector[1]", "*_matrix[2][1]", "*_matrix[2][2]", "*_matrix[2][3]", "*_vector[2]", "*_matrix[3][1]", "*_matrix[3][2]", "*_matrix[3][3]", "*_vector[3]", "*_id", "*_symmetry_operation"]),
"FAMILY_OPER_CAT", "_pdbx_struct_oper_list.",
"FAMILY_OPER", "_pdbx_struct_oper_list",
"operFields",  Clazz.newArray (-1, ["*_matrix[1][1]", "*_matrix[1][2]", "*_matrix[1][3]", "*_vector[1]", "*_matrix[2][1]", "*_matrix[2][2]", "*_matrix[2][3]", "*_vector[2]", "*_matrix[3][1]", "*_matrix[3][2]", "*_matrix[3][3]", "*_vector[3]", "*_id", "*_symmetry_operation"]),
"ASSEM_ID", 0,
"ASSEM_OPERS", 1,
"ASSEM_LIST", 2,
"FAMILY_ASSEM_CAT", "_pdbx_struct_assembly_gen.",
"assemblyFields",  Clazz.newArray (-1, ["_pdbx_struct_assembly_gen_assembly_id", "_pdbx_struct_assembly_gen_oper_expression", "_pdbx_struct_assembly_gen_asym_id_list"]),
"FAMILY_SEQUENCEDIF_CAT", "_struct_ref_seq_dif.",
"STRUCT_REF_G3", 0,
"STRUCT_REF_G1", 1,
"structRefFields",  Clazz.newArray (-1, ["_struct_ref_seq_dif_mon_id", "_struct_ref_seq_dif_db_mon_id"]),
"CHEM_COMP_ID", 0,
"CHEM_COMP_NAME", 1,
"FAMILY_CHEMCOMP_CAT", "_chem_comp.",
"chemCompFields",  Clazz.newArray (-1, ["_chem_comp_id", "_chem_comp_name"]),
"CONF_TYPE_ID", 0,
"BEG_ASYM_ID", 1,
"BEG_SEQ_ID", 2,
"BEG_INS_CODE", 3,
"END_ASYM_ID", 4,
"END_SEQ_ID", 5,
"END_INS_CODE", 6,
"STRUCT_ID", 7,
"SERIAL_NO", 8,
"HELIX_CLASS", 9,
"FAMILY_STRUCTCONF_CAT", "_struct_conf.",
"FAMILY_STRUCTCONF", "_struct_conf",
"structConfFields",  Clazz.newArray (-1, ["*_conf_type_id", "*_beg_auth_asym_id", "*_beg_auth_seq_id", "*_pdbx_beg_pdb_ins_code", "*_end_auth_asym_id", "*_end_auth_seq_id", "*_pdbx_end_pdb_ins_code", "*_id", "*_pdbx_pdb_helix_id", "*_pdbx_pdb_helix_class"]),
"SHEET_ID", 0,
"STRAND_ID", 7,
"FAMILY_SHEET_CAT", "_struct_sheet_range.",
"FAMILY_SHEET", "_struct_sheet_range",
"structSheetRangeFields",  Clazz.newArray (-1, ["*_sheet_id", "*_beg_auth_asym_id", "*_beg_auth_seq_id", "*_pdbx_beg_pdb_ins_code", "*_end_auth_asym_id", "*_end_auth_seq_id", "*_pdbx_end_pdb_ins_code", "*_id"]),
"SITE_ID", 0,
"SITE_COMP_ID", 1,
"SITE_ASYM_ID", 2,
"SITE_SEQ_ID", 3,
"SITE_INS_CODE", 4,
"FAMILY_STRUCSITE_CAT", "_struct_site_gen.",
"FAMILY_STRUCSITE", "_struct_site_gen",
"structSiteFields",  Clazz.newArray (-1, ["*_site_id", "*_auth_comp_id", "*_auth_asym_id", "*_auth_seq_id", "*_label_alt_id"]),
"STRUCT_CONN_ASYM1", 0,
"STRUCT_CONN_SEQ1", 1,
"STRUCT_CONN_COMP1", 2,
"STRUCT_CONN_ATOM1", 3,
"STRUCT_CONN_ALT1", 4,
"STRUCT_CONN_SYMM1", 5,
"STRUCT_CONN_ASYM2", 6,
"STRUCT_CONN_SEQ2", 7,
"STRUCT_CONN_COMP2", 8,
"STRUCT_CONN_ATOM2", 9,
"STRUCT_CONN_ALT2", 10,
"STRUCT_CONN_SYMM2", 11,
"STRUCT_CONN_TYPE", 12,
"STRUCT_CONN_ORDER", 13,
"FAMILY_STRUCTCONN_CAT", "_struct_conn.",
"FAMILY_STRUCTCONN", "_struct_conn",
"structConnFields",  Clazz.newArray (-1, ["*_ptnr1_auth_asym_id", "*_ptnr1_auth_seq_id", "*_ptnr1_auth_comp_id", "*_ptnr1_label_atom_id", "*_pdbx_ptnr1_label_alt_id", "*_ptnr1_symmetry", "*_ptnr2_auth_asym_id", "*_ptnr2_auth_seq_id", "*_ptnr2_auth_comp_id", "*_ptnr2_label_atom_id", "*_pdbx_ptnr2_label_alt_id", "*_ptnr2_symmetry", "*_conn_type_id", "*_pdbx_value_order"]),
"CHEM_COMP_BOND_ID", 0,
"CHEM_COMP_BOND_ATOM_ID_1", 1,
"CHEM_COMP_BOND_ATOM_ID_2", 2,
"CHEM_COMP_BOND_VALUE_ORDER", 3,
"CHEM_COMP_BOND_AROMATIC_FLAG", 4,
"FAMILY_COMPBOND_CAT", "_chem_comp_bond.",
"FAMILY_COMPBOND", "_chem_comp_bond",
"chemCompBondFields",  Clazz.newArray (-1, ["*_comp_id", "*_atom_id_1", "*_atom_id_2", "*_value_order", "*_pdbx_aromatic_flag"]));
});
