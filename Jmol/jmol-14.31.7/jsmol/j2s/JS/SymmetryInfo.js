Clazz.declarePackage ("JS");
Clazz.load (null, "JS.SymmetryInfo", ["JU.PT", "JU.SimpleUnitCell"], function () {
c$ = Clazz.decorateAsClass (function () {
this.coordinatesAreFractional = false;
this.isMultiCell = false;
this.sgName = null;
this.symmetryOperations = null;
this.infoStr = null;
this.cellRange = null;
this.latticeType = "P";
this.intlTableNo = null;
Clazz.instantialize (this, arguments);
}, JS, "SymmetryInfo");
Clazz.makeConstructor (c$, 
function () {
});
Clazz.defineMethod (c$, "setSymmetryInfo", 
function (info, unitCellParams) {
this.cellRange = info.get ("unitCellRange");
this.sgName = info.get ("spaceGroup");
if (this.sgName == null || this.sgName === "") this.sgName = "spacegroup unspecified";
this.infoStr = "Spacegroup: " + this.sgName;
if ((this.latticeType = info.get ("latticeType")) == null) this.latticeType = "P";
this.intlTableNo = info.get ("intlTableNo");
var symmetryCount = info.containsKey ("symmetryCount") ? (info.get ("symmetryCount")).intValue () : 0;
this.symmetryOperations = info.remove ("symmetryOps");
if (this.symmetryOperations != null) {
var c = "";
var s = "\nNumber of symmetry operations: " + (symmetryCount == 0 ? 1 : symmetryCount) + "\nSymmetry Operations:";
for (var i = 0; i < symmetryCount; i++) {
var op = this.symmetryOperations[i];
s += "\n" + op.fixMagneticXYZ (op, op.xyz, true);
if (op.isCenteringOp) c += " (" + JU.PT.rep (JU.PT.replaceAllCharacters (op.xyz, "xyz", "0"), "0+", "") + ")";
}
if (c.length > 0) this.infoStr += "\nCentering: " + c;
this.infoStr += s;
this.infoStr += "\n";
}if (unitCellParams == null) unitCellParams = info.get ("unitCellParams");
if (!JU.SimpleUnitCell.isValid (unitCellParams)) return null;
this.coordinatesAreFractional = info.containsKey ("coordinatesAreFractional") ? (info.get ("coordinatesAreFractional")).booleanValue () : false;
this.isMultiCell = (this.coordinatesAreFractional && this.symmetryOperations != null);
return unitCellParams;
}, "java.util.Map,~A");
});
