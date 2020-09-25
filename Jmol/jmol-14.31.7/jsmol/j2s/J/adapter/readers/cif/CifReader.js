Clazz.declarePackage ("J.adapter.readers.cif");
Clazz.load (["J.adapter.smarter.AtomSetCollectionReader", "JU.Lst", "$.P3"], "J.adapter.readers.cif.CifReader", ["java.lang.Boolean", "$.Character", "$.Float", "java.util.Hashtable", "JU.BS", "$.CifDataParser", "$.PT", "$.Rdr", "$.V3", "J.adapter.smarter.Atom", "J.api.JmolAdapter", "JU.Logger", "$.Vibration"], function () {
c$ = Clazz.decorateAsClass (function () {
this.modr = null;
this.parser = null;
this.isAFLOW = false;
this.filterAssembly = false;
this.allowRotations = true;
this.readIdeal = true;
this.configurationPtr = -2147483648;
this.useAuthorChainID = true;
this.thisDataSetName = "";
this.lastDataSetName = null;
this.chemicalName = "";
this.thisStructuralFormula = "";
this.thisFormula = "";
this.iHaveDesiredModel = false;
this.isMMCIF = false;
this.isLigand = false;
this.isMagCIF = false;
this.haveHAtoms = false;
this.molecularType = "GEOM_BOND default";
this.lastAltLoc = '\0';
this.haveAromatic = false;
this.conformationIndex = 0;
this.nMolecular = 0;
this.appendedData = null;
this.skipping = false;
this.nAtoms = 0;
this.ac = 0;
this.auditBlockCode = null;
this.lastSpaceGroupName = null;
this.modulated = false;
this.isCourseGrained = false;
this.haveCellWaveVector = false;
this.$latticeType = null;
this.htGroup1 = null;
this.nAtoms0 = 0;
this.titleAtomSet = 1;
this.intTableNo = 0;
this.htCellTypes = null;
this.modelMap = null;
this.htAudit = null;
this.symops = null;
this.pdbID = null;
this.key = null;
this.key0 = null;
this.data = null;
this.isLoop = false;
this.col2key = null;
this.key2col = null;
this.field = null;
this.firstChar = '\0';
this.htOxStates = null;
this.bondTypes = null;
this.disorderAssembly = ".";
this.lastDisorderAssembly = null;
this.lattvecs = null;
this.magCenterings = null;
this.maxSerial = 0;
this.atomRadius = null;
this.bsConnected = null;
this.bsSets = null;
this.ptOffset = null;
this.bsMolecule = null;
this.bsExclude = null;
this.firstAtom = 0;
this.atoms = null;
this.bsBondDuplicates = null;
Clazz.instantialize (this, arguments);
}, J.adapter.readers.cif, "CifReader", J.adapter.smarter.AtomSetCollectionReader);
Clazz.prepareFields (c$, function () {
this.col2key =  Clazz.newIntArray (100, 0);
this.key2col =  Clazz.newIntArray (100, 0);
this.bondTypes =  new JU.Lst ();
this.ptOffset =  new JU.P3 ();
});
Clazz.overrideMethod (c$, "initializeReader", 
function () {
this.initSubclass ();
this.allowPDBFilter = true;
this.appendedData = this.htParams.get ("appendedData");
var conf = this.getFilter ("CONF ");
if (conf != null) this.configurationPtr = this.parseIntStr (conf);
this.isMolecular = this.checkFilterKey ("MOLECUL") && !this.checkFilterKey ("BIOMOLECULE");
this.isPrimitive = this.checkFilterKey ("PRIMITIVE");
this.readIdeal = !this.checkFilterKey ("NOIDEAL");
this.filterAssembly = this.checkFilterKey ("$");
this.useAuthorChainID = !this.checkFilterKey ("NOAUTHORCHAINS");
if (this.isMolecular) {
this.forceSymmetry (false);
this.molecularType = "filter \"MOLECULAR\"";
}this.asc.checkSpecial = !this.checkFilterKey ("NOSPECIAL");
this.allowRotations = !this.checkFilterKey ("NOSYM");
if (this.strSupercell != null && this.strSupercell.indexOf (",") >= 0) this.addCellType ("conventional", this.strSupercell, true);
if (this.binaryDoc != null) return;
this.readCifData ();
this.continuing = false;
});
Clazz.defineMethod (c$, "initSubclass", 
function () {
});
Clazz.defineMethod (c$, "readCifData", 
 function () {
this.parser = this.getCifDataParser ();
this.line = "";
while (this.continueWith (this.key = this.parser.peekToken ())) if (!this.readAllData ()) break;

if (this.appendedData != null) {
this.parser = (this.getInterface ("JU.CifDataParser")).set (null, JU.Rdr.getBR (this.appendedData), this.debugging);
while ((this.key = this.parser.peekToken ()) != null) if (!this.readAllData ()) break;

}});
Clazz.defineMethod (c$, "continueWith", 
 function (key) {
var ret = (key != null && !key.equals ("_shelx_hkl_file"));
return ret;
}, "~S");
Clazz.defineMethod (c$, "getCifDataParser", 
function () {
return  new JU.CifDataParser ().set (this, null, this.debugging);
});
Clazz.defineMethod (c$, "readAllData", 
 function () {
if (this.key.startsWith ("data_")) {
this.isLigand = false;
if (this.asc.atomSetCount == 0) this.iHaveDesiredModel = false;
if (this.iHaveDesiredModel) return false;
if (this.desiredModelNumber != -2147483648) this.appendLoadNote (null);
this.newModel (++this.modelNumber);
this.haveCellWaveVector = false;
if (this.auditBlockCode == null) this.modulated = false;
if (!this.skipping) {
this.nAtoms0 = this.asc.ac;
this.processDataParameter ();
this.nAtoms = this.asc.ac;
}return true;
}if (this.skipping && this.key.equals ("_audit_block_code")) {
this.iHaveDesiredModel = false;
this.skipping = false;
}this.isLoop = this.key.startsWith ("loop_");
if (this.isLoop) {
if (this.skipping && !this.isMMCIF) {
this.parser.getTokenPeeked ();
this.parser.skipLoop (false);
} else {
this.processLoopBlock ();
}return true;
}if (this.key.indexOf ("_") != 0) {
JU.Logger.warn (this.key.startsWith ("save_") ? "CIF reader ignoring save_" : "CIF ERROR ? should be an underscore: " + this.key);
this.parser.getTokenPeeked ();
} else if (!this.getData ()) {
return true;
}if (!this.skipping) {
this.key = this.parser.fixKey (this.key0 = this.key);
if (this.key.startsWith ("_chemical_name") || this.key.equals ("_chem_comp_name")) {
this.processChemicalInfo ("name");
} else if (this.key.startsWith ("_chemical_formula_structural")) {
this.processChemicalInfo ("structuralFormula");
} else if (this.key.startsWith ("_chemical_formula_sum") || this.key.equals ("_chem_comp_formula")) {
this.processChemicalInfo ("formula");
} else if (this.key.equals ("_cell_modulation_dimension")) {
this.modDim = this.parseIntStr (this.data);
} else if (this.key.startsWith ("_cell_") && this.key.indexOf ("_commen_") < 0) {
this.processCellParameter ();
} else if (this.key.startsWith ("_atom_sites_fract_tran")) {
this.processUnitCellTransformMatrix ();
} else if (this.key.startsWith ("_audit")) {
if (this.key.equals ("_audit_block_code")) {
this.auditBlockCode = this.parser.fullTrim (this.data).toUpperCase ();
this.appendLoadNote (this.auditBlockCode);
if (this.htAudit != null && this.auditBlockCode.contains ("_MOD_")) {
var key = JU.PT.rep (this.auditBlockCode, "_MOD_", "_REFRNCE_");
if (this.asc.setSymmetry (this.htAudit.get (key)) != null) {
this.unitCellParams = this.asc.getSymmetry ().getUnitCellParams ();
this.iHaveUnitCell = true;
}} else if (this.htAudit != null) {
if (this.symops != null) for (var i = 0; i < this.symops.size (); i++) this.setSymmetryOperator (this.symops.get (i));

}if (this.lastSpaceGroupName != null) this.setSpaceGroupName (this.lastSpaceGroupName);
} else if (this.key.equals ("_audit_creation_date")) {
this.symmetry = null;
}} else if (this.key.equals (J.adapter.readers.cif.CifReader.singleAtomID)) {
this.readSingleAtom ();
} else if (this.key.startsWith ("_symmetry_space_group_name_h-m") || this.key.startsWith ("_symmetry_space_group_name_hall") || this.key.startsWith ("_space_group_name") || this.key.contains ("_ssg_name") || this.key.contains ("_magn_name") || this.key.contains ("_bns_name")) {
this.processSymmetrySpaceGroupName ();
} else if (this.key.startsWith ("_space_group_transform") || this.key.startsWith ("_parent_space_group") || this.key.startsWith ("_space_group_magn_transform")) {
this.processUnitCellTransform ();
} else if (this.key.contains ("_database_code")) {
this.addModelTitle ("ID");
} else if ("__citation_title__publ_section_title__active_magnetic_irreps_details__".contains ("_" + this.key + "__")) {
this.addModelTitle ("TITLE");
} else if (this.key.startsWith ("_aflow_")) {
this.isAFLOW = true;
} else if (this.key.equals ("_symmetry_int_tables_number")) {
this.intTableNo = this.parseIntStr (this.data);
this.rotateHexCell = (this.isAFLOW && (this.intTableNo >= 143 && this.intTableNo <= 194));
} else if (this.key.equals ("_entry_id")) {
this.pdbID = this.data;
} else {
this.processSubclassEntry ();
}}return true;
});
Clazz.defineMethod (c$, "addModelTitle", 
 function (key) {
if (this.asc.atomSetCount > this.titleAtomSet) this.appendLoadNote ("\nMODEL: " + (this.titleAtomSet = this.asc.atomSetCount));
this.appendLoadNote (key + ": " + this.parser.fullTrim (this.data));
}, "~S");
Clazz.defineMethod (c$, "processSubclassEntry", 
function () {
if (this.modDim > 0) this.getModulationReader ().processEntry ();
});
Clazz.defineMethod (c$, "processUnitCellTransform", 
 function () {
this.data = JU.PT.replaceAllCharacters (this.data, " ", "");
if (this.key.contains ("_from_parent") || this.key.contains ("child_transform")) this.addCellType ("parent", this.data, true);
 else if (this.key.contains ("_to_standard") || this.key.contains ("transform_bns_pp_abc")) this.addCellType ("standard", this.data, false);
this.appendLoadNote (this.key + ": " + this.data);
});
Clazz.defineMethod (c$, "addCellType", 
 function (type, data, isFrom) {
if (this.htCellTypes == null) this.htCellTypes =  new java.util.Hashtable ();
if (data.startsWith ("!")) {
data = data.substring (1);
isFrom = !isFrom;
}var cell = (isFrom ? "!" : "") + data;
this.htCellTypes.put (type, cell);
if (type.equalsIgnoreCase (this.strSupercell)) {
this.strSupercell = cell;
this.htCellTypes.put ("conventional", (isFrom ? "" : "!") + data);
}}, "~S,~S,~B");
Clazz.defineMethod (c$, "readSingleAtom", 
 function () {
var atom =  new J.adapter.smarter.Atom ();
atom.set (0, 0, 0);
atom.atomName = this.parser.fullTrim (this.data);
atom.getElementSymbol ();
this.asc.addAtom (atom);
});
Clazz.defineMethod (c$, "getModulationReader", 
 function () {
return (this.modr == null ? this.initializeMSCIF () : this.modr);
});
Clazz.defineMethod (c$, "initializeMSCIF", 
 function () {
if (this.modr == null) this.ms = this.modr = this.getInterface ("J.adapter.readers.cif.MSCifParser");
this.modulated = (this.modr.initialize (this, this.modDim) > 0);
return this.modr;
});
Clazz.defineMethod (c$, "newModel", 
function (modelNo) {
this.skipping = !this.doGetModel (this.modelNumber = modelNo, null);
if (this.skipping) {
if (!this.isMMCIF) this.parser.getTokenPeeked ();
return;
}this.chemicalName = "";
this.thisStructuralFormula = "";
this.thisFormula = "";
this.iHaveDesiredModel = this.isLastModel (this.modelNumber);
if (this.isCourseGrained) this.asc.setCurrentModelInfo ("courseGrained", Boolean.TRUE);
if (this.nAtoms0 == this.asc.ac) {
this.modelNumber--;
this.haveModel = false;
this.asc.removeCurrentAtomSet ();
} else {
this.applySymmetryAndSetTrajectory ();
}}, "~N");
Clazz.overrideMethod (c$, "finalizeSubclassReader", 
function () {
if (this.asc.iSet > 0 && this.asc.getAtomSetAtomCount (this.asc.iSet) == 0) this.asc.atomSetCount--;
 else if (!this.isMMCIF || !this.finalizeSubclass ()) this.applySymmetryAndSetTrajectory ();
var n = this.asc.atomSetCount;
if (n > 1) this.asc.setCollectionName ("<collection of " + n + " models>");
if (this.pdbID != null) this.asc.setCurrentModelInfo ("pdbID", this.pdbID);
this.finalizeReaderASCR ();
this.addHeader ();
if (this.haveAromatic) this.addJmolScript ("calculate aromatic");
});
Clazz.defineMethod (c$, "addHeader", 
function () {
var header = this.parser.getFileHeader ();
if (header.length > 0) {
var s = this.setLoadNote ();
this.appendLoadNote (null);
this.appendLoadNote (header);
this.appendLoadNote (s);
this.setLoadNote ();
this.asc.setInfo ("fileHeader", header);
}});
Clazz.defineMethod (c$, "finalizeSubclass", 
function () {
return false;
});
Clazz.overrideMethod (c$, "doPreSymmetry", 
function () {
if (this.magCenterings != null) this.addLatticeVectors ();
if (this.modDim > 0) this.getModulationReader ().setModulation (false, null);
if (this.isMagCIF) {
this.asc.getXSymmetry ().scaleFractionalVibs ();
this.vibsFractional = true;
}});
Clazz.overrideMethod (c$, "applySymmetryAndSetTrajectory", 
function () {
if (this.isMMCIF) this.asc.checkSpecial = false;
var doCheckBonding = this.doCheckUnitCell && !this.isMMCIF;
if (this.isMMCIF) {
var modelIndex = this.asc.iSet;
this.asc.setCurrentModelInfo ("PDB_CONECT_firstAtom_count_max",  Clazz.newIntArray (-1, [this.asc.getAtomSetAtomIndex (modelIndex), this.asc.getAtomSetAtomCount (modelIndex), this.maxSerial]));
}if (this.htCellTypes != null) {
for (var e, $e = this.htCellTypes.entrySet ().iterator (); $e.hasNext () && ((e = $e.next ()) || true);) this.asc.setCurrentModelInfo ("unitcell_" + e.getKey (), e.getValue ());

this.htCellTypes = null;
}if (!this.haveCellWaveVector) this.modDim = 0;
if (this.doApplySymmetry && !this.iHaveFractionalCoordinates) this.fractionalizeCoordinates (true);
this.applySymTrajASCR ();
if (doCheckBonding && (this.bondTypes.size () > 0 || this.isMolecular)) this.setBondingAndMolecules ();
this.asc.setCurrentModelInfo ("fileHasUnitCell", Boolean.TRUE);
this.asc.xtalSymmetry = null;
});
Clazz.overrideMethod (c$, "finalizeSubclassSymmetry", 
function (haveSymmetry) {
var sym = (haveSymmetry ? this.asc.getXSymmetry ().getBaseSymmetry () : null);
if (sym != null && sym.getSpaceGroup () == null) {
this.appendLoadNote ("Invalid or missing space group operations!");
sym = null;
}if (this.modDim > 0 && sym != null) {
this.addLatticeVectors ();
this.asc.setTensors ();
this.getModulationReader ().setModulation (true, sym);
this.modr.finalizeModulation ();
}if (this.isMagCIF) {
this.asc.setNoAutoBond ();
if (sym != null) {
this.addJmolScript ("vectors on;vectors 0.15;");
var n = this.asc.getXSymmetry ().setSpinVectors ();
this.appendLoadNote (n + " magnetic moments - use VECTORS ON/OFF or VECTOR MAX x.x or SELECT VXYZ>0");
}}if (sym != null && this.auditBlockCode != null && this.auditBlockCode.contains ("REFRNCE")) {
if (this.htAudit == null) this.htAudit =  new java.util.Hashtable ();
this.htAudit.put (this.auditBlockCode, sym);
}}, "~B");
Clazz.defineMethod (c$, "processDataParameter", 
 function () {
this.bondTypes.clear ();
this.parser.getTokenPeeked ();
this.thisDataSetName = (this.key.length < 6 ? "" : this.key.substring (5));
if (this.thisDataSetName.length > 0) this.nextAtomSet ();
if (this.debugging) JU.Logger.debug (this.key);
});
Clazz.defineMethod (c$, "nextAtomSet", 
function () {
this.asc.setCurrentModelInfo ("isCIF", Boolean.TRUE);
if (this.asc.iSet >= 0) {
if (this.isMMCIF) {
this.setModelPDB (true);
if (this.pdbID != null) this.asc.setCurrentModelInfo ("pdbID", this.pdbID);
}this.asc.newAtomSet ();
if (this.isMMCIF) {
this.setModelPDB (true);
if (this.pdbID != null) this.asc.setCurrentModelInfo ("pdbID", this.pdbID);
}} else {
this.asc.setCollectionName (this.thisDataSetName);
}});
Clazz.defineMethod (c$, "processChemicalInfo", 
 function (type) {
if (type.equals ("name")) {
this.chemicalName = this.data = this.parser.fullTrim (this.data);
this.appendLoadNote (this.chemicalName);
if (!this.data.equals ("?")) this.asc.setInfo ("modelLoadNote", this.data);
} else if (type.equals ("structuralFormula")) {
this.thisStructuralFormula = this.data = this.parser.fullTrim (this.data);
} else if (type.equals ("formula")) {
this.thisFormula = this.data = this.parser.fullTrim (this.data);
if (this.thisFormula.length > 1) this.appendLoadNote (this.thisFormula);
}if (this.debugging) {
JU.Logger.debug (type + " = " + this.data);
}return this.data;
}, "~S");
Clazz.defineMethod (c$, "processSymmetrySpaceGroupName", 
 function () {
if (this.key.indexOf ("_ssg_name") >= 0) {
this.modulated = true;
this.$latticeType = this.data.substring (0, 1);
} else if (this.modulated) {
return;
}this.data = this.parser.toUnicode (this.data);
this.setSpaceGroupName (this.lastSpaceGroupName = (this.key.indexOf ("h-m") > 0 ? "HM:" : this.modulated ? "SSG:" : this.key.indexOf ("bns") >= 0 ? "BNS:" : this.key.indexOf ("hall") >= 0 ? "Hall:" : "") + this.data);
});
Clazz.defineMethod (c$, "addLatticeVectors", 
 function () {
this.lattvecs = null;
if (this.magCenterings != null) {
this.$latticeType = "Magnetic";
this.lattvecs =  new JU.Lst ();
for (var i = 0; i < this.magCenterings.size (); i++) {
var s = this.magCenterings.get (i);
var f =  Clazz.newFloatArray (this.modDim + 4, 0);
if (s.indexOf ("x1") >= 0) for (var j = 1; j <= this.modDim + 3; j++) s = JU.PT.rep (s, "x" + j, "");

var tokens = JU.PT.split (JU.PT.replaceAllCharacters (s, "xyz+", ""), ",");
var n = 0;
for (var j = 0; j < tokens.length; j++) {
s = tokens[j].trim ();
if (s.length == 0) continue;
if ((f[j] = JU.PT.parseFloatFraction (s)) != 0) n++;
}
if (n >= 2) this.lattvecs.addLast (f);
}
this.magCenterings = null;
} else if (this.$latticeType != null && "ABCFI".indexOf (this.$latticeType) >= 0) {
this.lattvecs =  new JU.Lst ();
try {
this.ms.addLatticeVector (this.lattvecs, this.$latticeType);
} catch (e) {
if (Clazz.exceptionOf (e, Exception)) {
} else {
throw e;
}
}
}if (this.lattvecs != null && this.lattvecs.size () > 0 && this.asc.getSymmetry ().addLatticeVectors (this.lattvecs)) {
this.appendLoadNote ("Note! " + this.lattvecs.size () + " symmetry operators added for lattice centering " + this.$latticeType);
for (var i = 0; i < this.lattvecs.size (); i++) this.appendLoadNote (JU.PT.toJSON (null, this.lattvecs.get (i)));

}this.$latticeType = null;
});
Clazz.defineMethod (c$, "processCellParameter", 
 function () {
for (var i = J.api.JmolAdapter.cellParamNames.length; --i >= 0; ) if (this.key.equals (J.api.JmolAdapter.cellParamNames[i])) {
var p = this.parseFloatStr (this.data);
if (this.rotateHexCell && i == 5 && p == 120) p = -1;
this.setUnitCellItem (i, p);
return;
}
});
Clazz.defineMethod (c$, "processUnitCellTransformMatrix", 
 function () {
var v = this.parseFloatStr (this.data);
if (Float.isNaN (v)) return;
for (var i = 0; i < J.adapter.readers.cif.CifReader.TransformFields.length; i++) {
if (this.key.indexOf (J.adapter.readers.cif.CifReader.TransformFields[i]) >= 0) {
this.setUnitCellItem (6 + i, v);
return;
}}
});
Clazz.defineMethod (c$, "getData", 
 function () {
this.key = this.parser.getTokenPeeked ();
if (!this.continueWith (this.key)) return false;
this.data = this.parser.getNextToken ();
if (this.debugging && this.data != null && this.data.length > 0 && this.data.charAt (0) != '\0') JU.Logger.debug (">> " + this.key + " " + this.data);
if (this.data == null) {
JU.Logger.warn ("CIF ERROR ? end of file; data missing: " + this.key);
return false;
}return (this.data.length == 0 || this.data.charAt (0) != '\0');
});
Clazz.defineMethod (c$, "processLoopBlock", 
function () {
this.parser.getTokenPeeked ();
this.key = this.parser.peekToken ();
if (this.key == null) return;
this.key = this.parser.fixKey (this.key0 = this.key);
if (this.modDim > 0) switch (this.getModulationReader ().processLoopBlock ()) {
case 0:
break;
case -1:
this.parser.skipLoop (false);
case 1:
return;
}
var isLigand = false;
if (this.key.startsWith ("_atom_site") || (isLigand = this.key.equals ("_chem_comp_atom_comp_id"))) {
if (!this.processAtomSiteLoopBlock (isLigand)) return;
if (this.thisDataSetName.equals ("global")) this.asc.setCollectionName (this.thisDataSetName = this.chemicalName);
if (!this.thisDataSetName.equals (this.lastDataSetName)) {
this.asc.setAtomSetName (this.thisDataSetName);
this.lastDataSetName = this.thisDataSetName;
}this.asc.setCurrentModelInfo ("chemicalName", this.chemicalName);
this.asc.setCurrentModelInfo ("structuralFormula", this.thisStructuralFormula);
this.asc.setCurrentModelInfo ("formula", this.thisFormula);
return;
}if (this.key.startsWith ("_space_group_symop") || this.key.startsWith ("_symmetry_equiv_pos") || this.key.startsWith ("_symmetry_ssg_equiv")) {
if (this.ignoreFileSymmetryOperators) {
JU.Logger.warn ("ignoring file-based symmetry operators");
this.parser.skipLoop (false);
} else {
this.processSymmetryOperationsLoopBlock ();
}return;
}if (this.key.startsWith ("_citation")) {
this.processCitationListBlock ();
return;
}if (this.key.startsWith ("_atom_type")) {
this.processAtomTypeLoopBlock ();
return;
}if ((this.isMolecular || !this.doApplySymmetry) && this.key.startsWith ("_geom_bond")) {
this.processGeomBondLoopBlock ();
return;
}if (this.processSubclassLoopBlock ()) return;
if (this.key.equals ("_propagation_vector_seq_id")) {
this.addMore ();
return;
}this.parser.skipLoop (false);
});
Clazz.defineMethod (c$, "processSubclassLoopBlock", 
function () {
return false;
});
Clazz.defineMethod (c$, "addMore", 
 function () {
var str;
var n = 0;
try {
while ((str = this.parser.peekToken ()) != null && str.charAt (0) == '_') {
this.parser.getTokenPeeked ();
n++;
}
var m = 0;
var s = "";
while ((str = this.parser.getNextDataToken ()) != null) {
s += str + (m % n == 0 ? "=" : " ");
if (++m % n == 0) {
this.appendUunitCellInfo (s.trim ());
s = "";
}}
} catch (e) {
if (Clazz.exceptionOf (e, Exception)) {
} else {
throw e;
}
}
});
Clazz.defineMethod (c$, "fieldProperty", 
function (i) {
return (i >= 0 && (this.field = this.parser.getColumnData (i)).length > 0 && (this.firstChar = this.field.charAt (0)) != '\0' ? this.col2key[i] : -1);
}, "~N");
Clazz.defineMethod (c$, "parseLoopParameters", 
function (fields) {
this.parser.parseDataBlockParameters (fields, this.isLoop ? null : this.key0, this.data, this.key2col, this.col2key);
}, "~A");
Clazz.defineMethod (c$, "parseLoopParametersFor", 
function (key, fields) {
if (fields[0].charAt (0) == '*') for (var i = fields.length; --i >= 0; ) if (fields[i].charAt (0) == '*') fields[i] = key + fields[i].substring (1);

this.parseLoopParameters (fields);
}, "~S,~A");
Clazz.defineMethod (c$, "disableField", 
 function (fieldIndex) {
var i = this.key2col[fieldIndex];
if (i != -1) this.col2key[i] = -1;
}, "~N");
Clazz.defineMethod (c$, "processAtomTypeLoopBlock", 
 function () {
this.parseLoopParameters (J.adapter.readers.cif.CifReader.atomTypeFields);
if (!this.checkAllFieldsPresent (J.adapter.readers.cif.CifReader.atomTypeFields, -1, false)) {
this.parser.skipLoop (false);
return;
}var atomTypeSymbol;
var oxidationNumber = 0;
while (this.parser.getData ()) {
if (this.isNull (atomTypeSymbol = this.getField (0)) || Float.isNaN (oxidationNumber = this.parseFloatStr (this.getField (1)))) continue;
if (this.htOxStates == null) this.htOxStates =  new java.util.Hashtable ();
this.htOxStates.put (atomTypeSymbol, Float.$valueOf (oxidationNumber));
}
});
Clazz.defineMethod (c$, "processAtomSiteLoopBlock", 
function (isLigand) {
this.isLigand = isLigand;
var pdbModelNo = -1;
var haveCoord = true;
this.parseLoopParametersFor ("_atom_site", J.adapter.readers.cif.CifReader.atomFields);
if (this.key2col[55] != -1) {
this.setFractionalCoordinates (false);
} else if (this.key2col[6] != -1 || this.key2col[52] != -1) {
this.setFractionalCoordinates (false);
this.disableField (3);
this.disableField (4);
this.disableField (5);
if (this.key2col[16] != -1 && !this.isMMCIF) {
this.setIsPDB ();
this.isMMCIF = true;
}} else if (this.key2col[3] != -1) {
this.setFractionalCoordinates (true);
this.disableField (6);
this.disableField (7);
this.disableField (8);
} else if (this.key2col[20] != -1 || this.key2col[21] != -1 || this.key2col[63] != -1) {
haveCoord = false;
} else {
this.parser.skipLoop (false);
return false;
}var modelField = this.key2col[17];
var siteMult = 0;
while (this.parser.getData ()) {
if (modelField >= 0) {
pdbModelNo = this.checkPDBModelField (modelField, pdbModelNo);
if (pdbModelNo < 0) break;
if (this.skipping) continue;
}var atom = null;
if (haveCoord) {
atom =  new J.adapter.smarter.Atom ();
} else {
if (this.fieldProperty (this.key2col[20]) != -1 || this.fieldProperty (this.key2col[21]) != -1 || this.fieldProperty (this.key2col[63]) != -1) {
if ((atom = this.asc.getAtomFromName (this.field)) == null) continue;
} else {
continue;
}}var componentId = null;
var strChain = null;
var id = null;
var seqID = 0;
var n = this.parser.getColumnCount ();
for (var i = 0; i < n; ++i) {
var tok = this.fieldProperty (i);
switch (tok) {
case -1:
break;
case 71:
seqID = this.parseIntStr (this.field);
break;
case 70:
id = this.field;
break;
case 50:
case 0:
var elementSymbol;
if (this.field.length < 2) {
elementSymbol = this.field;
} else {
var ch1 = Character.toLowerCase (this.field.charAt (1));
if (J.adapter.smarter.Atom.isValidSym2 (this.firstChar, ch1)) {
elementSymbol = "" + this.firstChar + ch1;
} else {
elementSymbol = "" + this.firstChar;
if (!this.haveHAtoms && this.firstChar == 'H') this.haveHAtoms = true;
}}atom.elementSymbol = elementSymbol;
if (this.htOxStates != null && this.htOxStates.containsKey (this.field)) {
var charge = this.htOxStates.get (this.field).floatValue ();
atom.formalCharge = Math.round (charge);
if (Math.abs (atom.formalCharge - charge) > 0.1) if (this.debugging) {
JU.Logger.debug ("CIF charge on " + this.field + " was " + charge + "; rounded to " + atom.formalCharge);
}}break;
case 49:
case 1:
case 2:
atom.atomName = this.field;
break;
case 55:
var x = this.parseFloatStr (this.field);
if (this.readIdeal && !Float.isNaN (x)) atom.x = x;
break;
case 56:
var y = this.parseFloatStr (this.field);
if (this.readIdeal && !Float.isNaN (y)) atom.y = y;
break;
case 57:
var z = this.parseFloatStr (this.field);
if (this.readIdeal && !Float.isNaN (z)) atom.z = z;
break;
case 52:
case 6:
case 3:
atom.x = this.parseFloatStr (this.field);
break;
case 53:
case 7:
case 4:
atom.y = this.parseFloatStr (this.field);
break;
case 54:
case 8:
case 5:
atom.z = this.parseFloatStr (this.field);
break;
case 51:
atom.formalCharge = this.parseIntStr (this.field);
break;
case 9:
var floatOccupancy = this.parseFloatStr (this.field);
if (!Float.isNaN (floatOccupancy)) atom.foccupancy = floatOccupancy;
break;
case 10:
atom.bfactor = this.parseFloatStr (this.field) * (this.isMMCIF ? 1 : 100);
break;
case 48:
case 11:
atom.group3 = this.field;
break;
case 59:
componentId = this.field;
if (!this.useAuthorChainID) this.setChainID (atom, strChain = this.field);
break;
case 12:
if (this.useAuthorChainID) this.setChainID (atom, strChain = this.field);
break;
case 13:
this.maxSerial = Math.max (this.maxSerial, atom.sequenceNumber = this.parseIntStr (this.field));
break;
case 14:
atom.insertionCode = this.firstChar;
break;
case 15:
case 60:
atom.altLoc = this.firstChar;
break;
case 58:
this.disorderAssembly = this.field;
break;
case 19:
if (this.firstChar == '-' && this.field.length > 1) {
atom.altLoc = this.field.charAt (1);
atom.ignoreSymmetry = true;
} else {
atom.altLoc = this.firstChar;
}break;
case 16:
if ("HETATM".equals (this.field)) atom.isHetero = true;
break;
case 18:
if ("dum".equals (this.field)) {
atom.x = NaN;
continue;
}break;
case 61:
if (this.modulated) siteMult = this.parseIntStr (this.field);
break;
case 62:
case 47:
if (this.field.equalsIgnoreCase ("Uiso")) {
var j = this.key2col[34];
if (j != -1) this.asc.setU (atom, 7, this.parseFloatStr (this.parser.getColumnData (j)));
}break;
case 22:
case 23:
case 24:
case 25:
case 26:
case 27:
case 28:
case 29:
case 30:
case 31:
case 32:
case 33:
this.asc.setU (atom, (this.col2key[i] - 22) % 6, this.parseFloatStr (this.field));
break;
case 35:
case 36:
case 37:
case 38:
case 39:
case 40:
this.asc.setU (atom, 6, 4);
this.asc.setU (atom, (this.col2key[i] - 35) % 6, this.parseFloatStr (this.field));
break;
case 41:
case 42:
case 43:
case 44:
case 45:
case 46:
this.asc.setU (atom, 6, 0);
this.asc.setU (atom, (this.col2key[i] - 41) % 6, this.parseFloatStr (this.field));
break;
case 64:
case 65:
case 66:
case 67:
case 68:
case 69:
this.isMagCIF = true;
var pt = atom.vib;
if (pt == null) atom.vib = pt =  new JU.Vibration ().setType (-2);
var v = this.parseFloatStr (this.field);
switch (tok) {
case 64:
case 67:
pt.x = v;
this.appendLoadNote ("magnetic moment: " + this.line);
break;
case 65:
case 68:
pt.y = v;
break;
case 66:
case 69:
pt.z = v;
break;
}
break;
}
}
if (!haveCoord) continue;
if (Float.isNaN (atom.x) || Float.isNaN (atom.y) || Float.isNaN (atom.z)) {
JU.Logger.warn ("atom " + atom.atomName + " has invalid/unknown coordinates");
continue;
}if (atom.elementSymbol == null && atom.atomName != null) atom.getElementSymbol ();
if (!this.filterCIFAtom (atom, componentId)) continue;
this.setAtomCoord (atom);
if (this.isMMCIF && !this.processSubclassAtom (atom, componentId, strChain)) continue;
if (this.asc.iSet < 0) this.nextAtomSet ();
this.asc.addAtomWithMappedName (atom);
if (id != null) {
this.asc.atomSymbolicMap.put (id, atom);
if (seqID > 0) {
var pt = atom.vib;
if (pt == null) pt = this.asc.addVibrationVector (atom.index, 0, NaN, 1094713365);
pt.x = seqID;
}}this.ac++;
if (this.modDim > 0 && siteMult != 0) atom.vib = JU.V3.new3 (siteMult, 0, NaN);
}
this.asc.setCurrentModelInfo ("isCIF", Boolean.TRUE);
if (this.isMMCIF) this.setModelPDB (true);
if (this.isMMCIF && this.skipping) this.skipping = false;
return true;
}, "~B");
Clazz.defineMethod (c$, "checkPDBModelField", 
function (modelField, currentModelNo) {
return 0;
}, "~N,~N");
Clazz.defineMethod (c$, "processSubclassAtom", 
function (atom, assemblyId, strChain) {
return true;
}, "J.adapter.smarter.Atom,~S,~S");
Clazz.defineMethod (c$, "filterCIFAtom", 
function (atom, componentId) {
if (!this.filterAtom (atom, -1)) return false;
if (this.filterAssembly && this.filterReject (this.filter, "$", componentId)) return false;
if (this.configurationPtr > 0) {
if (!this.disorderAssembly.equals (this.lastDisorderAssembly)) {
this.lastDisorderAssembly = this.disorderAssembly;
this.lastAltLoc = '\0';
this.conformationIndex = this.configurationPtr;
}if (atom.altLoc != '\0') {
if (this.conformationIndex >= 0 && atom.altLoc != this.lastAltLoc) {
this.lastAltLoc = atom.altLoc;
this.conformationIndex--;
}if (this.conformationIndex != 0) {
JU.Logger.info ("ignoring " + atom.atomName);
return false;
}}}return true;
}, "J.adapter.smarter.Atom,~S");
Clazz.defineMethod (c$, "processCitationListBlock", 
 function () {
this.parseLoopParameters (J.adapter.readers.cif.CifReader.citationFields);
while (this.parser.getData ()) {
var title = this.getField (0);
if (!this.isNull (title)) this.appendLoadNote ("TITLE: " + this.parser.toUnicode (title));
}
});
Clazz.defineMethod (c$, "processSymmetryOperationsLoopBlock", 
 function () {
this.parseLoopParametersFor ("_space_group_symop", J.adapter.readers.cif.CifReader.symmetryOperationsFields);
var n;
this.symops =  new JU.Lst ();
for (n = J.adapter.readers.cif.CifReader.symmetryOperationsFields.length; --n >= 0; ) if (this.key2col[n] != -1) break;

if (n < 0) {
JU.Logger.warn ("required _space_group_symop key not found");
this.parser.skipLoop (false);
return;
}n = 0;
var isMag = false;
while (this.parser.getData ()) {
var ssgop = false;
var nn = this.parser.getColumnCount ();
var timeRev = (this.fieldProperty (this.key2col[7]) == -1 && this.fieldProperty (this.key2col[8]) == -1 && this.fieldProperty (this.key2col[6]) == -1 ? 0 : this.field.equals ("-1") ? -1 : 1);
for (var i = 0, tok; i < nn; ++i) {
switch (tok = this.fieldProperty (i)) {
case 5:
if (this.field.indexOf ('~') >= 0) this.field = JU.PT.rep (this.field, "~", "");
case 2:
case 3:
this.modulated = true;
ssgop = true;
case 0:
case 4:
case 1:
if (this.allowRotations || timeRev != 0 || ++n == 1) if (!this.modulated || ssgop) {
if (tok == 1 || tok == 3) {
isMag = true;
timeRev = (this.field.endsWith (",+1") || this.field.endsWith (",1") ? 1 : this.field.endsWith (",-1") ? -1 : 0);
if (timeRev != 0) this.field = this.field.substring (0, this.field.lastIndexOf (','));
}if (timeRev != 0) this.field += "," + (timeRev == 1 ? "m" : "-m");
this.field = this.field.$replace (';', ' ');
this.symops.addLast (this.field);
this.setSymmetryOperator (this.field);
}break;
case 9:
case 10:
case 11:
isMag = true;
if (this.magCenterings == null) this.magCenterings =  new JU.Lst ();
this.magCenterings.addLast (this.field);
break;
}
}
}
if (this.ms != null && !isMag) this.addLatticeVectors ();
});
Clazz.defineMethod (c$, "getBondOrder", 
function (field) {
switch (field.toUpperCase ().charAt (0)) {
default:
JU.Logger.warn ("unknown CIF bond order: " + field);
case '\0':
case 'S':
return 1;
case 'D':
return 2;
case 'T':
return 3;
case 'Q':
return 4;
case 'A':
this.haveAromatic = true;
return 515;
}
}, "~S");
Clazz.defineMethod (c$, "processGeomBondLoopBlock", 
 function () {
var bondLoopBug = (this.stateScriptVersionInt >= 130304 && this.stateScriptVersionInt < 140403 || this.stateScriptVersionInt >= 150000 && this.stateScriptVersionInt < 150403);
this.parseLoopParameters (J.adapter.readers.cif.CifReader.geomBondFields);
if (bondLoopBug || !this.checkAllFieldsPresent (J.adapter.readers.cif.CifReader.geomBondFields, 2, true)) {
this.parser.skipLoop (false);
return;
}var bondCount = 0;
var name1;
var name2 = null;
while (this.parser.getData ()) {
name2 = null;
if (this.asc.getAtomIndex (name1 = this.getField (0)) < 0 || this.asc.getAtomIndex (name2 = this.getField (1)) < 0) {
if (name2 == null && this.asc.getAtomIndex (name1 = name1.toUpperCase ()) < 0 || this.asc.getAtomIndex (name2 = name2.toUpperCase ()) < 0) continue;
}var order = this.getBondOrder (this.getField (3));
var sdist = this.getField (2);
var distance = this.parseFloatStr (sdist);
if (distance == 0 || Float.isNaN (distance)) {
if (!this.iHaveFractionalCoordinates) {
var a = this.asc.getAtomFromName (name1);
var b = this.asc.getAtomFromName (name2);
if (a != null && b != null) this.asc.addNewBondWithOrder (a.index, b.index, order);
}continue;
}var dx = 0;
var pt = sdist.indexOf ('(');
if (pt >= 0) {
var data = sdist.toCharArray ();
var sdx = sdist.substring (pt + 1, sdist.length - 1);
var n = sdx.length;
for (var j = pt; --j >= 0; ) {
if (data[j] == '.' && --j < 0) break;
data[j] = (--n < 0 ? '0' : sdx.charAt (n));
}
dx = this.parseFloatStr (String.valueOf (data));
if (Float.isNaN (dx)) {
JU.Logger.info ("error reading uncertainty for " + this.line);
dx = 0.015;
}} else {
dx = 0.015;
}bondCount++;
this.bondTypes.addLast ( Clazz.newArray (-1, [name1, name2, Float.$valueOf (distance), Float.$valueOf (dx), Integer.$valueOf (order)]));
}
if (bondCount > 0) {
JU.Logger.info (bondCount + " bonds read");
if (!this.doApplySymmetry) {
this.isMolecular = true;
this.forceSymmetry (false);
}}});
Clazz.defineMethod (c$, "setBondingAndMolecules", 
 function () {
this.atoms = this.asc.atoms;
this.firstAtom = this.asc.getLastAtomSetAtomIndex ();
var nat = this.asc.getLastAtomSetAtomCount ();
this.ac = this.firstAtom + nat;
JU.Logger.info ("CIF creating molecule for " + nat + " atoms " + (this.bondTypes.size () > 0 ? " using GEOM_BOND records" : ""));
this.bsSets =  new Array (nat);
this.symmetry = this.asc.getSymmetry ();
for (var i = this.firstAtom; i < this.ac; i++) {
var ipt = this.asc.getAtomFromName (this.atoms[i].atomName).index - this.firstAtom;
if (this.bsSets[ipt] == null) this.bsSets[ipt] =  new JU.BS ();
this.bsSets[ipt].set (i - this.firstAtom);
}
if (this.isMolecular) {
this.atomRadius =  Clazz.newFloatArray (this.ac, 0);
for (var i = this.firstAtom; i < this.ac; i++) {
var elemnoWithIsotope = J.api.JmolAdapter.getElementNumber (this.atoms[i].getElementSymbol ());
this.atoms[i].elementNumber = elemnoWithIsotope;
var charge = (this.atoms[i].formalCharge == -2147483648 ? 0 : this.atoms[i].formalCharge);
if (elemnoWithIsotope > 0) this.atomRadius[i] = J.api.JmolAdapter.getBondingRadius (elemnoWithIsotope, charge);
}
this.bsConnected =  new Array (this.ac);
for (var i = this.firstAtom; i < this.ac; i++) this.bsConnected[i] =  new JU.BS ();

this.bsMolecule =  new JU.BS ();
this.bsExclude =  new JU.BS ();
}var isFirst = true;
this.bsBondDuplicates =  new JU.BS ();
while (this.createBonds (isFirst)) {
isFirst = false;
}
if (this.isMolecular && this.iHaveFractionalCoordinates && !this.bsMolecule.isEmpty ()) {
if (this.asc.bsAtoms == null) this.asc.bsAtoms =  new JU.BS ();
this.asc.bsAtoms.clearBits (this.firstAtom, this.ac);
this.asc.bsAtoms.or (this.bsMolecule);
this.asc.bsAtoms.andNot (this.bsExclude);
for (var i = this.firstAtom; i < this.ac; i++) {
if (this.asc.bsAtoms.get (i)) this.symmetry.toCartesian (this.atoms[i], true);
 else if (this.debugging) JU.Logger.debug (this.molecularType + " removing " + i + " " + this.atoms[i].atomName + " " + this.atoms[i]);
}
this.asc.setCurrentModelInfo ("unitCellParams", null);
if (this.nMolecular++ == this.asc.iSet) {
this.asc.clearGlobalBoolean (0);
this.asc.clearGlobalBoolean (1);
this.asc.clearGlobalBoolean (2);
}}if (this.bondTypes.size () > 0) this.asc.setCurrentModelInfo ("hasBonds", Boolean.TRUE);
this.bondTypes.clear ();
this.atomRadius = null;
this.bsSets = null;
this.bsConnected = null;
this.bsMolecule = null;
this.bsExclude = null;
});
Clazz.defineMethod (c$, "fixAtomForBonding", 
 function (pt, i) {
pt.setT (this.atoms[i]);
if (this.iHaveFractionalCoordinates) this.symmetry.toCartesian (pt, true);
}, "JU.P3,~N");
Clazz.defineMethod (c$, "createBonds", 
 function (doInit) {
var list = "";
var haveH = false;
for (var i = this.bondTypes.size (); --i >= 0; ) {
if (this.bsBondDuplicates.get (i)) continue;
var o = this.bondTypes.get (i);
var distance = (o[2]).floatValue ();
var dx = (o[3]).floatValue ();
var order = (o[4]).intValue ();
var iatom1 = this.asc.getAtomIndex (o[0]);
var iatom2 = this.asc.getAtomIndex (o[1]);
if (doInit) {
var key = ";" + iatom1 + ";" + iatom2 + ";" + distance;
if (list.indexOf (key) >= 0) {
this.bsBondDuplicates.set (i);
continue;
}list += key;
}var bs1 = this.bsSets[iatom1 - this.firstAtom];
var bs2 = this.bsSets[iatom2 - this.firstAtom];
if (bs1 == null || bs2 == null) continue;
if (this.atoms[iatom1].elementNumber == 1 || this.atoms[iatom2].elementNumber == 1) haveH = true;
for (var j = bs1.nextSetBit (0); j >= 0; j = bs1.nextSetBit (j + 1)) {
for (var k = bs2.nextSetBit (0); k >= 0; k = bs2.nextSetBit (k + 1)) {
if ((!this.isMolecular || !this.bsConnected[j + this.firstAtom].get (k)) && this.checkBondDistance (this.atoms[j + this.firstAtom], this.atoms[k + this.firstAtom], distance, dx)) this.addNewBond (j + this.firstAtom, k + this.firstAtom, order);
}
}
}
if (!this.iHaveFractionalCoordinates) return false;
if (this.bondTypes.size () > 0 && !haveH) for (var i = this.firstAtom; i < this.ac; i++) if (this.atoms[i].elementNumber == 1) {
var checkAltLoc = (this.atoms[i].altLoc != '\0');
for (var k = this.firstAtom; k < this.ac; k++) if (k != i && this.atoms[k].elementNumber != 1 && (!checkAltLoc || this.atoms[k].altLoc == '\0' || this.atoms[k].altLoc == this.atoms[i].altLoc)) {
if (!this.bsConnected[i].get (k) && this.checkBondDistance (this.atoms[i], this.atoms[k], 1.1, 0)) this.addNewBond (i, k, 1);
}
}
if (!this.isMolecular) return false;
if (doInit) for (var i = this.firstAtom; i < this.ac; i++) if (this.atoms[i].atomSite + this.firstAtom == i && !this.bsMolecule.get (i)) this.setBs (this.atoms, i, this.bsConnected, this.bsMolecule);

var bondTolerance = this.vwr.getFloat (570425348);
var bsBranch =  new JU.BS ();
var cart1 =  new JU.P3 ();
var cart2 =  new JU.P3 ();
var nFactor = 2;
for (var i = this.firstAtom; i < this.ac; i++) if (!this.bsMolecule.get (i) && !this.bsExclude.get (i)) for (var j = this.bsMolecule.nextSetBit (0); j >= 0; j = this.bsMolecule.nextSetBit (j + 1)) if (this.symmetry.checkDistance (this.atoms[j], this.atoms[i], this.atomRadius[i] + this.atomRadius[j] + bondTolerance, 0, nFactor, nFactor, nFactor, this.ptOffset)) {
this.setBs (this.atoms, i, this.bsConnected, bsBranch);
for (var k = bsBranch.nextSetBit (0); k >= 0; k = bsBranch.nextSetBit (k + 1)) {
this.atoms[k].add (this.ptOffset);
this.fixAtomForBonding (cart1, k);
var bs = this.bsSets[this.asc.getAtomIndex (this.atoms[k].atomName) - this.firstAtom];
if (bs != null) for (var ii = bs.nextSetBit (0); ii >= 0; ii = bs.nextSetBit (ii + 1)) {
if (ii + this.firstAtom == k) continue;
this.fixAtomForBonding (cart2, ii + this.firstAtom);
if (cart2.distance (cart1) < 0.1) {
this.bsExclude.set (k);
break;
}}
this.bsMolecule.set (k);
}
return true;
}

return false;
}, "~B");
Clazz.defineMethod (c$, "checkBondDistance", 
 function (a, b, distance, dx) {
if (this.iHaveFractionalCoordinates) return this.symmetry.checkDistance (a, b, distance, dx, 0, 0, 0, this.ptOffset);
var d = a.distance (b);
return (dx > 0 ? Math.abs (d - distance) <= dx : d <= distance && d > 0.1);
}, "J.adapter.smarter.Atom,J.adapter.smarter.Atom,~N,~N");
Clazz.defineMethod (c$, "addNewBond", 
 function (i, j, order) {
this.asc.addNewBondWithOrder (i, j, order);
if (!this.isMolecular) return;
this.bsConnected[i].set (j);
this.bsConnected[j].set (i);
}, "~N,~N,~N");
Clazz.defineMethod (c$, "setBs", 
 function (atoms, iatom, bsBonds, bs) {
var bsBond = bsBonds[iatom];
bs.set (iatom);
for (var i = bsBond.nextSetBit (0); i >= 0; i = bsBond.nextSetBit (i + 1)) {
if (!bs.get (i)) this.setBs (atoms, i, bsBonds, bs);
}
}, "~A,~N,~A,JU.BS");
Clazz.defineMethod (c$, "checkSubclassSymmetry", 
function () {
return this.doCheckUnitCell;
});
Clazz.defineMethod (c$, "checkAllFieldsPresent", 
function (keys, lastKey, critical) {
for (var i = (lastKey < 0 ? keys.length : lastKey); --i >= 0; ) if (this.key2col[i] == -1) {
if (critical) JU.Logger.warn ("CIF reader missing property: " + keys[i]);
return false;
}
return true;
}, "~A,~N,~B");
Clazz.defineMethod (c$, "getField", 
function (type) {
var i = this.key2col[type];
return (i == -1 ? "\0" : this.parser.getColumnData (i));
}, "~N");
Clazz.defineMethod (c$, "isNull", 
function (key) {
return key.equals ("\0");
}, "~S");
Clazz.defineStatics (c$,
"titleRecords", "__citation_title__publ_section_title__active_magnetic_irreps_details__",
"TransformFields",  Clazz.newArray (-1, ["x[1][1]", "x[1][2]", "x[1][3]", "r[1]", "x[2][1]", "x[2][2]", "x[2][3]", "r[2]", "x[3][1]", "x[3][2]", "x[3][3]", "r[3]"]),
"ATOM_TYPE_SYMBOL", 0,
"ATOM_TYPE_OXIDATION_NUMBER", 1,
"atomTypeFields",  Clazz.newArray (-1, ["_atom_type_symbol", "_atom_type_oxidation_number"]),
"NONE", -1,
"TYPE_SYMBOL", 0,
"LABEL", 1,
"AUTH_ATOM", 2,
"FRACT_X", 3,
"FRACT_Y", 4,
"FRACT_Z", 5,
"CARTN_X", 6,
"CARTN_Y", 7,
"CARTN_Z", 8,
"OCCUPANCY", 9,
"B_ISO", 10,
"COMP_ID", 11,
"AUTH_ASYM_ID", 12,
"AUTH_SEQ_ID", 13,
"INS_CODE", 14,
"ALT_ID", 15,
"GROUP_PDB", 16,
"MODEL_NO", 17,
"DUMMY_ATOM", 18,
"DISORDER_GROUP", 19,
"ANISO_LABEL", 20,
"ANISO_MMCIF_ID", 21,
"ANISO_U11", 22,
"ANISO_U22", 23,
"ANISO_U33", 24,
"ANISO_U12", 25,
"ANISO_U13", 26,
"ANISO_U23", 27,
"ANISO_MMCIF_U11", 28,
"ANISO_MMCIF_U22", 29,
"ANISO_MMCIF_U33", 30,
"ANISO_MMCIF_U12", 31,
"ANISO_MMCIF_U13", 32,
"ANISO_MMCIF_U23", 33,
"U_ISO_OR_EQUIV", 34,
"ANISO_B11", 35,
"ANISO_B22", 36,
"ANISO_B33", 37,
"ANISO_B12", 38,
"ANISO_B13", 39,
"ANISO_B23", 40,
"ANISO_BETA_11", 41,
"ANISO_BETA_22", 42,
"ANISO_BETA_33", 43,
"ANISO_BETA_12", 44,
"ANISO_BETA_13", 45,
"ANISO_BETA_23", 46,
"ADP_TYPE", 47,
"CC_COMP_ID", 48,
"CC_ATOM_ID", 49,
"CC_ATOM_SYM", 50,
"CC_ATOM_CHARGE", 51,
"CC_ATOM_X", 52,
"CC_ATOM_Y", 53,
"CC_ATOM_Z", 54,
"CC_ATOM_X_IDEAL", 55,
"CC_ATOM_Y_IDEAL", 56,
"CC_ATOM_Z_IDEAL", 57,
"DISORDER_ASSEMBLY", 58,
"ASYM_ID", 59,
"SUBSYS_ID", 60,
"SITE_MULT", 61,
"THERMAL_TYPE", 62,
"MOMENT_LABEL", 63,
"MOMENT_PRELIM_X", 64,
"MOMENT_PRELIM_Y", 65,
"MOMENT_PRELIM_Z", 66,
"MOMENT_X", 67,
"MOMENT_Y", 68,
"MOMENT_Z", 69,
"ATOM_ID", 70,
"SEQ_ID", 71,
"FAMILY_ATOM", "_atom_site",
"atomFields",  Clazz.newArray (-1, ["*_type_symbol", "*_label", "*_auth_atom_id", "*_fract_x", "*_fract_y", "*_fract_z", "*_cartn_x", "*_cartn_y", "*_cartn_z", "*_occupancy", "*_b_iso_or_equiv", "*_auth_comp_id", "*_auth_asym_id", "*_auth_seq_id", "*_pdbx_pdb_ins_code", "*_label_alt_id", "*_group_pdb", "*_pdbx_pdb_model_num", "*_calc_flag", "*_disorder_group", "*_aniso_label", "*_anisotrop_id", "*_aniso_u_11", "*_aniso_u_22", "*_aniso_u_33", "*_aniso_u_12", "*_aniso_u_13", "*_aniso_u_23", "*_anisotrop_u[1][1]", "*_anisotrop_u[2][2]", "*_anisotrop_u[3][3]", "*_anisotrop_u[1][2]", "*_anisotrop_u[1][3]", "*_anisotrop_u[2][3]", "*_u_iso_or_equiv", "*_aniso_b_11", "*_aniso_b_22", "*_aniso_b_33", "*_aniso_b_12", "*_aniso_b_13", "*_aniso_b_23", "*_aniso_beta_11", "*_aniso_beta_22", "*_aniso_beta_33", "*_aniso_beta_12", "*_aniso_beta_13", "*_aniso_beta_23", "*_adp_type", "_chem_comp_atom_comp_id", "_chem_comp_atom_atom_id", "_chem_comp_atom_type_symbol", "_chem_comp_atom_charge", "_chem_comp_atom_model_cartn_x", "_chem_comp_atom_model_cartn_y", "_chem_comp_atom_model_cartn_z", "_chem_comp_atom_pdbx_model_cartn_x_ideal", "_chem_comp_atom_pdbx_model_cartn_y_ideal", "_chem_comp_atom_pdbx_model_cartn_z_ideal", "*_disorder_assembly", "*_label_asym_id", "*_subsystem_code", "*_symmetry_multiplicity", "*_thermal_displace_type", "*_moment_label", "*_moment_crystalaxis_mx", "*_moment_crystalaxis_my", "*_moment_crystalaxis_mz", "*_moment_crystalaxis_x", "*_moment_crystalaxis_y", "*_moment_crystalaxis_z", "*_id", "*_label_seq_id"]));
c$.singleAtomID = c$.prototype.singleAtomID = J.adapter.readers.cif.CifReader.atomFields[48];
Clazz.defineStatics (c$,
"CITATION_TITLE", 0,
"citationFields",  Clazz.newArray (-1, ["_citation_title"]),
"SYM_XYZ", 0,
"SYM_MAGN_XYZ", 1,
"SYM_SSG_ALG", 2,
"SYM_MAGN_SSG_ALG", 3,
"SYM_EQ_XYZ", 4,
"SYM_SSG_EQ_XYZ", 5,
"SYM_MAGN_REV", 7,
"SYM_MAGN_SSG_REV", 8,
"SYM_MAGN_REV_PRELIM", 6,
"SYM_MAGN_CENTERING", 9,
"SYM_MAGN_SSG_CENTERING", 10,
"SYM_MAGN_SSG_CENT_XYZ", 11,
"FAMILY_SGOP", "_space_group_symop",
"symmetryOperationsFields",  Clazz.newArray (-1, ["*_operation_xyz", "*_magn_operation_xyz", "*_ssg_operation_algebraic", "*_magn_ssg_operation_algebraic", "_symmetry_equiv_pos_as_xyz", "_symmetry_ssg_equiv_pos_as_xyz", "*_magn_operation_timereversal", "*_magn_ssg_operation_timereversal", "*_operation_timereversal", "*_magn_centering_xyz", "*_magn_ssg_centering_algebraic", "*_magn_ssg_centering_xyz"]),
"GEOM_BOND_ATOM_SITE_LABEL_1", 0,
"GEOM_BOND_ATOM_SITE_LABEL_2", 1,
"GEOM_BOND_DISTANCE", 2,
"CCDC_GEOM_BOND_TYPE", 3,
"geomBondFields",  Clazz.newArray (-1, ["_geom_bond_atom_site_label_1", "_geom_bond_atom_site_label_2", "_geom_bond_distance", "_ccdc_geom_bond_type"]));
});
