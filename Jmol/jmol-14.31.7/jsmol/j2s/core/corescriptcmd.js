(function(Clazz
,Clazz_getClassName
,Clazz_newLongArray
,Clazz_doubleToByte
,Clazz_doubleToInt
,Clazz_doubleToLong
,Clazz_declarePackage
,Clazz_instanceOf
,Clazz_load
,Clazz_instantialize
,Clazz_decorateAsClass
,Clazz_floatToInt
,Clazz_floatToLong
,Clazz_makeConstructor
,Clazz_defineEnumConstant
,Clazz_exceptionOf
,Clazz_newIntArray
,Clazz_defineStatics
,Clazz_newFloatArray
,Clazz_declareType
,Clazz_prepareFields
,Clazz_superConstructor
,Clazz_newByteArray
,Clazz_declareInterface
,Clazz_p0p
,Clazz_pu$h
,Clazz_newShortArray
,Clazz_innerTypeInstance
,Clazz_isClassDefined
,Clazz_prepareCallback
,Clazz_newArray
,Clazz_castNullAs
,Clazz_floatToShort
,Clazz_superCall
,Clazz_decorateAsType
,Clazz_newBooleanArray
,Clazz_newCharArray
,Clazz_implementOf
,Clazz_newDoubleArray
,Clazz_overrideConstructor
,Clazz_clone
,Clazz_doubleToShort
,Clazz_getInheritedLevel
,Clazz_getParamsType
,Clazz_isAF
,Clazz_isAB
,Clazz_isAI
,Clazz_isAS
,Clazz_isASS
,Clazz_isAP
,Clazz_isAFloat
,Clazz_isAII
,Clazz_isAFF
,Clazz_isAFFF
,Clazz_tryToSearchAndExecute
,Clazz_getStackTrace
,Clazz_inheritArgs
,Clazz_alert
,Clazz_defineMethod
,Clazz_overrideMethod
,Clazz_declareAnonymous
//,Clazz_checkPrivateMethod
,Clazz_cloneFinals
){
var $t$;
//var c$;
Clazz_declarePackage ("JS");
Clazz_load (null, "JS.ScriptExt", ["JU.AU"], function () {
c$ = Clazz_decorateAsClass (function () {
this.vwr = null;
this.e = null;
this.chk = false;
this.st = null;
this.slen = 0;
Clazz_instantialize (this, arguments);
}, JS, "ScriptExt");
Clazz_defineMethod (c$, "init", 
function (eval) {
this.e = eval;
this.vwr = this.e.vwr;
return this;
}, "~O");
Clazz_defineMethod (c$, "atomExpressionAt", 
function (i) {
return this.e.atomExpressionAt (i);
}, "~N");
Clazz_defineMethod (c$, "checkLength", 
function (i) {
this.e.checkLength (i);
}, "~N");
Clazz_defineMethod (c$, "error", 
function (err) {
this.e.error (err);
}, "~N");
Clazz_defineMethod (c$, "invArg", 
function () {
this.e.invArg ();
});
Clazz_defineMethod (c$, "invPO", 
function () {
this.error (23);
});
Clazz_defineMethod (c$, "getShapeProperty", 
function (shapeType, propertyName) {
return this.e.getShapeProperty (shapeType, propertyName);
}, "~N,~S");
Clazz_defineMethod (c$, "paramAsStr", 
function (i) {
return this.e.paramAsStr (i);
}, "~N");
Clazz_defineMethod (c$, "centerParameter", 
function (i) {
return this.e.centerParameter (i, null);
}, "~N");
Clazz_defineMethod (c$, "floatParameter", 
function (i) {
return this.e.floatParameter (i);
}, "~N");
Clazz_defineMethod (c$, "getPoint3f", 
function (i, allowFractional) {
return this.e.getPoint3f (i, allowFractional, true);
}, "~N,~B");
Clazz_defineMethod (c$, "intParameter", 
function (index) {
return this.e.intParameter (index);
}, "~N");
Clazz_defineMethod (c$, "isFloatParameter", 
function (index) {
switch (this.e.tokAt (index)) {
case 2:
case 3:
return true;
}
return false;
}, "~N");
Clazz_defineMethod (c$, "setShapeProperty", 
function (shapeType, propertyName, propertyValue) {
this.e.setShapeProperty (shapeType, propertyName, propertyValue);
}, "~N,~S,~O");
Clazz_defineMethod (c$, "showString", 
function (s) {
this.e.showString (s);
}, "~S");
Clazz_defineMethod (c$, "stringParameter", 
function (index) {
return this.e.stringParameter (index);
}, "~N");
Clazz_defineMethod (c$, "getToken", 
function (i) {
return this.e.getToken (i);
}, "~N");
Clazz_defineMethod (c$, "tokAt", 
function (i) {
return this.e.tokAt (i);
}, "~N");
Clazz_defineMethod (c$, "setShapeId", 
function (iShape, i, idSeen) {
if (idSeen) this.invArg ();
var name = this.e.setShapeNameParameter (i).toLowerCase ();
this.setShapeProperty (iShape, "thisID", name);
return name;
}, "~N,~N,~B");
Clazz_defineMethod (c$, "getColorTrans", 
function (eval, i, allowNone, ret) {
var translucentLevel = 3.4028235E38;
if (eval.theTok != 1765808134) --i;
switch (this.tokAt (i + 1)) {
case 603979967:
i++;
translucentLevel = (this.isFloatParameter (i + 1) ? eval.getTranslucentLevel (++i) : this.vwr.getFloat (570425354));
break;
case 1073742074:
i++;
translucentLevel = 0;
break;
}
if (eval.isColorParam (i + 1)) {
ret[0] = eval.getArgbParam (++i);
} else if (this.tokAt (i + 1) == 1073742333) {
ret[0] = 0;
eval.iToken = i + 1;
} else if (translucentLevel == 3.4028235E38) {
this.invArg ();
} else {
ret[0] = -2147483648;
}i = eval.iToken;
return translucentLevel;
}, "JS.ScriptEval,~N,~B,~A");
Clazz_defineMethod (c$, "finalizeObject", 
function (shapeID, colorArgb, translucentLevel, intScale, doSet, data, iptDisplayProperty, bs) {
if (doSet) {
this.setShapeProperty (shapeID, "set", data);
}if (colorArgb != -2147483648) this.e.setShapePropertyBs (shapeID, "color", Integer.$valueOf (colorArgb), bs);
if (translucentLevel != 3.4028235E38) this.e.setShapeTranslucency (shapeID, "", "translucent", translucentLevel, bs);
if (intScale != 0) {
this.setShapeProperty (shapeID, "scale", Integer.$valueOf (intScale));
}if (iptDisplayProperty > 0) {
if (!this.e.setMeshDisplayProperty (shapeID, iptDisplayProperty, 0)) this.invArg ();
}}, "~N,~N,~N,~N,~B,~O,~N,JU.BS");
Clazz_defineMethod (c$, "getIntArray2", 
function (i) {
var list = (this.e.getToken (i)).getList ();
var faces = JU.AU.newInt2 (list.size ());
for (var vi = faces.length; --vi >= 0; ) {
var face = list.get (vi).getList ();
if (face == null) this.invArg ();
faces[vi] =  Clazz_newIntArray (face.size (), 0);
for (var vii = faces[vi].length; --vii >= 0; ) faces[vi][vii] = face.get (vii).intValue;

}
return faces;
}, "~N");
Clazz_defineMethod (c$, "getAllPoints", 
function (index, nmin) {
var points = null;
var bs = null;
try {
switch (this.e.tokAt (index)) {
case 7:
points = this.e.getPointArray (index, -1, false);
break;
case 12290:
case 10:
case 1073742325:
bs = this.atomExpressionAt (index);
break;
}
if (points == null) {
if (bs == null) bs = this.vwr.getAllAtoms ();
points =  new Array (bs.cardinality ());
for (var i = bs.nextSetBit (0), pt = 0; i >= 0; i = bs.nextSetBit (i + 1)) points[pt++] = this.vwr.ms.at[i];

}} catch (e) {
if (Clazz_exceptionOf (e, Exception)) {
} else {
throw e;
}
}
if (points == null || points.length < nmin) this.invArg ();
return points;
}, "~N,~N");
});
Clazz_declarePackage ("JS");
Clazz_load (["JS.ScriptExt"], "JS.CmdExt", ["java.lang.Boolean", "$.Float", "$.Long", "java.util.Hashtable", "$.Map", "JU.AU", "$.BS", "$.Base64", "$.Lst", "$.M3", "$.M4", "$.Measure", "$.P3", "$.P4", "$.PT", "$.Quat", "$.SB", "$.V3", "J.api.Interface", "J.atomdata.RadiusData", "J.c.STER", "$.VDW", "J.i18n.GT", "JM.Atom", "$.AtomCollection", "$.BondSet", "$.LabelToken", "$.Measurement", "JS.SV", "$.ScriptCompiler", "$.ScriptError", "$.ScriptEval", "$.ScriptInterruption", "$.ScriptMathProcessor", "$.ScriptParam", "$.T", "JU.BSUtil", "$.BoxInfo", "$.C", "$.Edge", "$.Elements", "$.Escape", "$.Logger", "$.Parser", "$.Point3fi", "$.SimpleUnitCell", "JV.FileManager", "$.StateManager", "$.Viewer"], function () {
c$ = Clazz_declareType (JS, "CmdExt", JS.ScriptExt);
Clazz_makeConstructor (c$, 
function () {
Clazz_superConstructor (this, JS.CmdExt, []);
});
Clazz_overrideMethod (c$, "dispatch", 
function (iTok, b, st) {
this.chk = this.e.chk;
this.slen = this.e.slen;
this.st = st;
switch (iTok) {
case 1073741866:
st[0].value = this.prepareBinaryOutput (st[0]);
return null;
case 4098:
this.assign (1);
break;
case 134221829:
this.cache ();
break;
case 4102:
this.calculate ();
break;
case 4103:
this.capture ();
break;
case 4105:
this.centerAt ();
break;
case 134221831:
this.compare ();
break;
case 528395:
this.console ();
break;
case 4106:
this.connect (1);
break;
case 1094717448:
this.configuration ();
break;
case 134221834:
this.data ();
break;
case 1613238294:
this.connect (0);
break;
case 4120:
this.image ();
break;
case 4122:
this.invertSelected ();
break;
case 4124:
this.macro ();
break;
case 4125:
this.mapProperty ();
break;
case 4126:
this.minimize ();
break;
case 603983903:
this.modelkit ();
break;
case 1275072532:
this.modulation ();
break;
case 4130:
this.mutate ();
break;
case 4131:
this.navigate ();
break;
case 4133:
case 134221850:
case 4138:
this.plot (st);
break;
case 134222350:
this.show ();
break;
case 528443:
this.stereo ();
break;
case 1814695966:
this.unitcell (b ? 2 : 1);
break;
case 134221856:
return this.write (b ? st : null);
case 6:
this.measure ();
break;
case 21:
this.polyhedra ();
break;
case 20:
this.ellipsoid ();
break;
case 4:
this.struts ();
break;
}
return null;
}, "~N,~B,~A");
Clazz_defineMethod (c$, "modelkit", 
 function () {
var isOn = true;
var i = 0;
switch (this.tokAt (1)) {
case 1073742334:
isOn = false;
case 0:
case 1073742335:
if (!this.chk) this.vwr.setBooleanProperty ("modelkitmode", isOn);
return;
case 528432:
this.e.cmdRotate (false, false);
return;
case 4145:
this.e.cmdRotate (false, true);
return;
case 4098:
this.assign (2);
return;
}
var kit = this.vwr.getModelkit (false);
var tok = 0;
while ((tok = this.tokAt (++i)) != 0) {
var key = this.paramAsStr (i).toLowerCase ();
var value = null;
switch (tok) {
case 36867:
key = this.paramAsStr (++i);
value = this.paramAsStr (++i);
break;
case 1073742024:
value = this.paramAsStr (++i).toLowerCase ();
if (!JU.PT.isOneOf (value, ";view;edit;molecular;")) this.invArg ();
break;
case 1814695966:
value = this.paramAsStr (++i).toLowerCase ();
if (!JU.PT.isOneOf (value, ";packed;extend;")) this.invArg ();
break;
case 1296041986:
switch (this.tokAt (++i)) {
case 4:
case 1073742333:
value = this.paramAsStr (i);
break;
case 12:
value = this.getToken (i).value;
break;
case 2:
value = Integer.$valueOf (this.getToken (i).intValue);
break;
default:
if (this.e.isCenterParameter (i)) {
key = "center";
value = this.e.centerParameter (i, null);
i = this.e.iToken;
} else {
this.invArg ();
}break;
}
break;
case 1088421903:
value = this.paramAsStr (++i).toLowerCase ();
if (!JU.PT.isOneOf (value, ";none;applylocal;retainlocal;applyfull;")) this.invArg ();
break;
case 1073742066:
value = this.paramAsStr (i + 1);
if (value.equals ("none")) {
++i;
break;
}case 12289:
case 134217751:
value = this.e.atomCenterOrCoordinateParameter (++i, null);
i = this.e.iToken;
break;
default:
if (JU.PT.isOneOf (key, ";showsymopinfo;clicktosetelement;addhydrogen;addhydrogens;")) {
isOn = (tok == 0 || this.tokAt (++i) == 1073742335);
value = Boolean.$valueOf (isOn);
break;
}if (JU.PT.isOneOf (key, ";view;edit;molecular;")) {
value = key;
key = "mode";
break;
}if (JU.PT.isOneOf (key, ";packed;extend;")) {
value = key;
key = "unitcell";
break;
}this.invArg ();
}
if (value != null && !this.chk) kit.setProperty (key, value);
}
});
Clazz_defineMethod (c$, "macro", 
 function () {
if (this.chk) return;
var key = this.e.optParameterAsString (1);
if (key.length == 0) {
this.showString (this.vwr.getMacro (null));
return;
}var macro = this.vwr.getMacro (key);
if (macro == null) {
this.showString ("macro " + key + " could not be found. Current macros include:\n" + this.vwr.getMacro (null));
return;
}this.showString ("running " + macro);
this.e.cmdScript (4124, macro, null);
});
Clazz_defineMethod (c$, "evalParallel", 
function (context, shapeManager) {
this.chk = this.e.chk;
this.slen = this.e.slen;
var se =  new JS.ScriptEval ().setViewer (this.vwr);
se.historyDisabled = true;
se.compiler =  new JS.ScriptCompiler (this.vwr);
se.sm = shapeManager;
try {
se.restoreScriptContext (context, true, false, false);
se.setAllowJSThreads (false);
se.dispatchCommands (false, false, false);
} catch (ex) {
if (Clazz_exceptionOf (ex, Exception)) {
this.e.vwr.setStringProperty ("_errormessage", "" + ex);
if (se.thisContext == null) {
JU.Logger.error ("Error evaluating context " + ex);
ex.printStackTrace ();
}return false;
} else {
throw ex;
}
}
return true;
}, "JS.ScriptContext,JV.ShapeManager");
Clazz_defineMethod (c$, "getBitsetIdent", 
function (bs, label, tokenValue, useAtomMap, index, isExplicitlyAll) {
var isAtoms = !(Clazz_instanceOf (tokenValue, JM.BondSet));
if (isAtoms) {
if (label == null) label = this.vwr.getStandardLabelFormat (0);
 else if (label.length == 0) label = "%[label]";
}var pt = (label == null ? -1 : label.indexOf ("%"));
var haveIndex = (index != 2147483647);
if (bs == null || this.chk || isAtoms && pt < 0) {
if (label == null) label = "";
return isExplicitlyAll ?  Clazz_newArray (-1, [label]) : label;
}var modelSet = this.vwr.ms;
var n = 0;
var labeler = modelSet.getLabeler ();
var indices = (isAtoms || !useAtomMap ? null : (tokenValue).associatedAtoms);
if (indices == null && label != null && label.indexOf ("%D") > 0) indices = this.vwr.ms.getAtomIndices (bs);
var asIdentity = (label == null || label.length == 0);
var htValues = (isAtoms || asIdentity ? null : JM.LabelToken.getBondLabelValues ());
var tokens = (asIdentity ? null : isAtoms ? labeler.compile (this.vwr, label, '\0', null) : labeler.compile (this.vwr, label, '\1', htValues));
var nmax = (haveIndex ? 1 : bs.cardinality ());
var sout =  new Array (nmax);
var ptTemp =  new JU.P3 ();
for (var j = (haveIndex ? index : bs.nextSetBit (0)); j >= 0; j = bs.nextSetBit (j + 1)) {
var str;
if (isAtoms) {
if (asIdentity) str = modelSet.at[j].getInfo ();
 else str = labeler.formatLabelAtomArray (this.vwr, modelSet.at[j], tokens, '\0', indices, ptTemp);
} else {
var bond = modelSet.bo[j];
if (asIdentity) str = bond.getIdentity ();
 else str = labeler.formatLabelBond (this.vwr, bond, tokens, htValues, indices, ptTemp);
}str = JU.PT.formatStringI (str, "#", (n + 1));
sout[n++] = str;
if (haveIndex) break;
}
return nmax == 1 && !isExplicitlyAll ? sout[0] : sout;
}, "JU.BS,~S,~O,~B,~N,~B");
Clazz_defineMethod (c$, "getLoadSymmetryParams", 
function (i, sOptions, htParams) {
var eval = this.e;
this.chk = eval.chk;
this.slen = eval.slen;
var lattice = null;
var tok = this.tokAt (i);
if (tok == 1073742332 || tok == 8) {
lattice = eval.getPointOrPlane (i, false, true, false, true, 3, 3, true);
tok = this.tokAt (i = eval.iToken + 1);
}switch (tok) {
case 1073741938:
case 1073742080:
case 1094713350:
case 1073742163:
case 1073742114:
case 134217764:
case 1814695966:
if (lattice == null) lattice = JU.P3.new3 (555, 555, -1);
eval.iToken = i - 1;
}
var offset = null;
if (lattice != null) {
htParams.put ("lattice", lattice);
i = eval.iToken + 1;
sOptions.append (" " + JU.SimpleUnitCell.escapeMultiplier (lattice));
i = this.checkPacked (i, htParams, sOptions);
if (this.tokAt (i) == 1094713350) {
htParams.put ("centroid", Boolean.TRUE);
sOptions.append (" CENTROID");
i = this.checkPacked (++i, htParams, sOptions);
}if (this.tokAt (i) == 1073742163) {
var supercell;
sOptions.append (" SUPERCELL ");
if (eval.isPoint3f (++i)) {
var pt = this.getPoint3f (i, false);
if (pt.x != Clazz_floatToInt (pt.x) || pt.y != Clazz_floatToInt (pt.y) || pt.z != Clazz_floatToInt (pt.z) || pt.x < 1 || pt.y < 1 || pt.z < 1) {
eval.iToken = i;
this.invArg ();
}supercell = pt;
i = eval.iToken;
} else {
supercell = this.stringParameter (i);
}sOptions.append (JU.Escape.e (supercell));
htParams.put ("supercell", supercell);
i = this.checkPacked (++i, htParams, sOptions);
}var distance = 0;
if (this.tokAt (i) == 1073742114) {
i++;
distance = this.floatParameter (i++);
sOptions.append (" range " + distance);
}htParams.put ("symmetryRange", Float.$valueOf (distance));
var spacegroup = null;
var sg;
var iGroup = -2147483648;
if (this.tokAt (i) == 134217764) {
++i;
spacegroup = JU.PT.rep (this.paramAsStr (i++), "''", "\"");
sOptions.append (" spacegroup " + JU.PT.esc (spacegroup));
if (spacegroup.equalsIgnoreCase ("ignoreOperators")) {
iGroup = -999;
} else {
if (spacegroup.length == 0) {
sg = this.vwr.getCurrentUnitCell ();
if (sg != null) spacegroup = sg.getSpaceGroupName ();
} else {
if (spacegroup.indexOf (",") >= 0) if ((lattice.x < 9 && lattice.y < 9 && lattice.z == 0)) spacegroup += "#doNormalize=0";
}htParams.put ("spaceGroupName", spacegroup);
iGroup = -2;
}}var fparams = null;
if (this.tokAt (i) == 1814695966) {
++i;
var s = eval.optParameterAsString (i);
if (s.length == 0) {
sg = this.vwr.getCurrentUnitCell ();
if (sg != null) {
fparams = sg.getUnitCellAsArray (true);
offset = sg.getCartesianOffset ();
}} else {
if (this.tokAt (i) == 4) {
fparams =  Clazz_newFloatArray (6, 0);
JU.SimpleUnitCell.setOabc (s, fparams, null);
} else {
fparams = eval.floatParameterSet (i, 6, 9);
}}if (fparams == null || fparams.length != 6 && fparams.length != 9) this.invArg ();
sOptions.append (" unitcell [");
for (var j = 0; j < fparams.length; j++) sOptions.append ((j == 0 ? "" : " ") + fparams[j]);

sOptions.append ("]");
htParams.put ("unitcell", fparams);
if (iGroup == -2147483648) iGroup = -1;
i = eval.iToken + 1;
}if (iGroup != -2147483648) htParams.put ("spaceGroupIndex", Integer.$valueOf (iGroup));
}if (offset != null) eval.coordinatesAreFractional = false;
 else if (this.tokAt (i) == 1073742066) offset = this.getPoint3f (++i, true);
if (offset != null) {
if (eval.coordinatesAreFractional) {
offset.setT (eval.fractionalPoint);
htParams.put ("unitCellOffsetFractional", (eval.coordinatesAreFractional ? Boolean.TRUE : Boolean.FALSE));
sOptions.append (" offset {" + offset.x + " " + offset.y + " " + offset.z + "/1}");
} else {
sOptions.append (" offset " + JU.Escape.eP (offset));
}htParams.put ("unitCellOffset", offset);
i = eval.iToken + 1;
}return i;
}, "~N,JU.SB,java.util.Map");
Clazz_defineMethod (c$, "checkPacked", 
 function (i, htParams, sOptions) {
switch (this.tokAt (i)) {
case 1073741938:
htParams.put ("packed", Boolean.TRUE);
var oabc = null;
var tok = this.tokAt (++i);
switch (tok) {
case 1814695966:
case 1678381065:
break;
default:
if (this.e.isArrayParameter (i)) {
oabc = this.e.getPointArray (i, -1, false);
i = this.e.iToken;
} else if (this.isFloatParameter (i)) {
var d = this.floatParameter (i);
oabc =  Clazz_newArray (-1, [ new JU.P3 (), JU.P3.new3 (d, d, d)]);
} else {
oabc =  new Array (0);
--i;
}}
i++;
if (this.e.chk) return i;
switch (tok) {
case 1814695966:
var type = this.e.optParameterAsString (i++).toLowerCase ();
if (JU.PT.isOneOf (type, ";conventional;primitive;")) {
htParams.put ("fillRange", type);
sOptions.append (" FILL UNITCELL \"" + type + "\"");
return i;
}var unitCell = this.vwr.getCurrentUnitCell ();
if (unitCell != null) {
oabc = JU.BoxInfo.toOABC (unitCell.getUnitCellVerticesNoOffset (), unitCell.getCartesianOffset ());
break;
}case 1678381065:
oabc = JU.BoxInfo.toOABC (this.vwr.ms.getBBoxVertices (), null);
break;
}
switch (oabc.length) {
case 2:
var a = oabc[1];
oabc =  Clazz_newArray (-1, [oabc[0], JU.P3.newP (oabc[0]),  new JU.P3 (),  new JU.P3 ()]);
oabc[1].x = a.x;
oabc[2].y = a.y;
oabc[3].z = a.z;
break;
case 3:
oabc =  Clazz_newArray (-1, [ new JU.P3 (), oabc[0], oabc[1], oabc[2]]);
break;
case 4:
break;
default:
oabc =  Clazz_newArray (-1, [ new JU.P3 (), JU.P3.new3 (10, 0, 0), JU.P3.new3 (0, 10, 0), JU.P3.new3 (0, 0, 10)]);
}
htParams.put ("fillRange", oabc);
sOptions.append (" FILL [" + oabc[0] + oabc[1] + oabc[2] + oabc[3] + "]");
break;
case 1073742080:
var f = NaN;
if (this.isFloatParameter (++i)) f = this.floatParameter (i++);
if (!this.e.chk) {
htParams.put ("packed", Boolean.TRUE);
sOptions.append (" PACKED");
if (!Float.isNaN (f)) {
htParams.put ("packingError", Float.$valueOf (f));
sOptions.append (" " + f);
}}break;
}
return i;
}, "~N,java.util.Map,JU.SB");
Clazz_defineMethod (c$, "cache", 
 function () {
var tok = this.tokAt (1);
var fileName = null;
var n = 2;
switch (tok) {
case 1275069441:
case 1073742119:
fileName = this.e.optParameterAsString (n++);
case 1073741882:
this.checkLength (n);
if (!this.chk) {
if ("all".equals (fileName)) fileName = null;
var nBytes = this.vwr.cacheFileByName (fileName, tok == 1275069441);
this.showString (nBytes < 0 ? "cache cleared" : nBytes + " bytes " + (tok == 1275069441 ? " cached" : " removed"));
}break;
default:
this.invArg ();
}
});
Clazz_defineMethod (c$, "calculate", 
 function () {
var isSurface = false;
var asDSSP = false;
var bs1 = null;
var bs2 = null;
var eval = this.e;
var n = -2147483648;
var version = 2;
if ((eval.iToken = eval.slen) >= 2) {
eval.clearDefinedVariableAtomSets ();
switch (this.getToken (1).tok) {
case 1073741824:
this.checkLength (2);
break;
case 1086324752:
eval.iToken = 1;
bs1 = (this.slen == 2 ? null : this.atomExpressionAt (2));
eval.checkLast (eval.iToken);
if (!this.chk) eval.showString (this.vwr.calculateChirality (bs1));
return;
case 1631586315:
this.checkLength (2);
if (this.chk) return;
n = this.vwr.calculateFormalCharges (null);
this.showString (J.i18n.GT.i (J.i18n.GT.$ ("{0} charges modified"), n));
return;
case 1075838996:
this.checkLength (2);
if (!this.chk) this.vwr.ms.assignAromaticBondsBs (true, null);
return;
case 1613238294:
if (eval.slen != 2) {
asDSSP = (this.tokAt (++eval.iToken) == 1639976963);
if (asDSSP) bs1 = this.vwr.bsA ();
 else bs1 = this.atomExpressionAt (eval.iToken);
if (!asDSSP && !(asDSSP = (this.tokAt (++eval.iToken) == 1639976963))) bs2 = this.atomExpressionAt (eval.iToken);
}if (this.chk) return;
n = this.vwr.autoHbond (bs1, bs2, false);
if (n != -2147483648) eval.report (J.i18n.GT.i (J.i18n.GT.$ ("{0} hydrogen bonds"), Math.abs (n)), false);
return;
case 1612709900:
var andBond = (this.tokAt (2) == 1073742335);
if (andBond) eval.iToken++;
bs1 = (this.slen == (andBond ? 3 : 2) ? null : this.atomExpressionAt (andBond ? 3 : 2));
eval.checkLast (eval.iToken);
if (!this.chk) {
this.vwr.addHydrogens (bs1, false, false);
if (andBond) {
if (bs1 == null) bs1 = this.vwr.bsA ();
this.vwr.makeConnections (0.1, 1e8, 515, 1073742025, bs1, bs1, null, false, false, 0);
this.vwr.ms.assignAromaticBondsBs (true, null);
}}return;
case 1111492619:
eval.iToken = 1;
bs1 = (this.slen == 2 ? null : this.atomExpressionAt (2));
eval.checkLast (eval.iToken);
if (!this.chk) eval.getPartialCharges (bs1);
return;
case 1088421903:
case 134217762:
if (!this.chk) {
if (this.tokAt (2) == 1275203608) {
var id = (this.tokAt (3) == 4 ? this.stringParameter (3) : null);
bs1 = (id != null || this.slen == 3 ? null : this.atomExpressionAt (3));
var data =  Clazz_newArray (-1, [id, null, bs1]);
this.showString (eval.getShapePropertyData (21, "symmetry", data) ? data[1] : "");
} else {
this.showString (this.vwr.ms.calculatePointGroup (this.vwr.bsA ()));
}}return;
case 1111490574:
this.checkLength (2);
if (!this.chk) {
this.vwr.calculateStraightness ();
this.vwr.addStateScript ("set quaternionFrame '" + this.vwr.getQuaternionFrame () + "'; calculate straightness", false, true);
}return;
case 1639976963:
bs1 = (this.slen < 4 || this.isFloatParameter (3) ? null : this.atomExpressionAt (2));
switch (this.tokAt (++eval.iToken)) {
case 4138:
break;
case 1111490587:
if (this.chk) return;
eval.showString (this.vwr.getAnnotationParser (true).calculateDSSRStructure (this.vwr, bs1));
return;
case 1073741915:
asDSSP = true;
version = (this.slen == eval.iToken + 1 ? 2 : Clazz_floatToInt (this.floatParameter (++eval.iToken)));
break;
case 0:
asDSSP = this.vwr.getBoolean (603979826);
break;
default:
this.invArg ();
}
if (!this.chk) this.showString (this.vwr.calculateStructures (bs1, asDSSP, true, version));
return;
case 659482:
bs1 = (eval.iToken + 1 < this.slen ? this.atomExpressionAt (++eval.iToken) : null);
bs2 = (eval.iToken + 1 < this.slen ? this.atomExpressionAt (++eval.iToken) : null);
this.checkLength (++eval.iToken);
if (!this.chk) {
n = this.vwr.calculateStruts (bs1, bs2);
if (n > 0) {
this.setShapeProperty (1, "type", Integer.$valueOf (32768));
eval.setShapePropertyBs (1, "color", Integer.$valueOf (0x0FFFFFF), null);
eval.setShapeTranslucency (1, "", "translucent", 0.5, null);
this.setShapeProperty (1, "type", Integer.$valueOf (1023));
}this.showString (J.i18n.GT.i (J.i18n.GT.$ ("{0} struts added"), n));
}return;
case 2097180:
isSurface = true;
case 1111490575:
var isFrom = false;
switch (this.tokAt (2)) {
case 134217759:
eval.iToken++;
break;
case 0:
isFrom = !isSurface;
break;
case 1073741952:
isFrom = true;
eval.iToken++;
break;
default:
isFrom = true;
}
bs1 = (eval.iToken + 1 < this.slen ? this.atomExpressionAt (++eval.iToken) : this.vwr.bsA ());
this.checkLength (++eval.iToken);
if (!this.chk) this.vwr.calculateSurface (bs1, (isFrom ? 3.4028235E38 : -1));
return;
}
}eval.errorStr2 (53, "CALCULATE", "aromatic? hbonds? hydrogen? formalCharge? partialCharge? pointgroup? straightness? structure? struts? surfaceDistance FROM? surfaceDistance WITHIN?");
});
Clazz_defineMethod (c$, "capture", 
 function () {
if (!this.chk && !this.vwr.allowCapture ()) {
this.showString ("Cannot capture on this platform");
return;
}var params = this.vwr.captureParams;
var type = (params == null ? "GIF" : params.get ("type"));
var endTime = 0;
var mode = 0;
var slen = this.e.slen;
var fileName = "";
var looping = (this.vwr.am.animationReplayMode != 1073742070);
var i = 1;
var tok = this.tokAt (i);
var isTransparent = (tok == 603979967);
if (isTransparent) tok = this.tokAt (++i);
var s = null;
switch (tok == 0 ? (tok = 102409) : tok) {
case 4:
fileName = this.e.optParameterAsString (i++);
if (fileName.length == 0) {
mode = 102409;
break;
}var lc = fileName.toLowerCase ();
if (lc.endsWith (".gift") || lc.endsWith (".pngt")) {
isTransparent = true;
fileName = fileName.substring (0, fileName.length - 1);
lc = fileName.toLowerCase ();
} else if (!lc.endsWith (".gif") && !lc.contains (".png")) {
fileName += ".gif";
}if (lc.endsWith (".png")) {
if (!lc.endsWith ("0.png")) fileName = fileName.substring (0, fileName.length - 4) + "0000.png";
type = "PNG";
} else {
type = "GIF";
}if (isTransparent) type += "T";
var pt = fileName.indexOf ("0000.");
var streaming = (pt < 0 || pt != fileName.lastIndexOf (".") - 4);
var isRock = false;
if (this.tokAt (i) == 528411) {
looping = true;
tok = this.tokAt (++i);
}switch (this.tokAt (i)) {
case 134222850:
s = this.stringParameter (++i);
break;
case 1073742129:
isRock = true;
case 1611141175:
var axis = "y";
looping = true;
i++;
if (isRock) {
if (i < slen && this.tokAt (i) != 2) axis = this.e.optParameterAsString (i++).toLowerCase ();
s = "rotate Y 10 10;rotate Y -10 -10;rotate Y -10 -10;rotate Y 10 10";
var n = (i < slen ? this.intParameter (i++) : 5);
if (n < 0) {
s = JU.PT.rep (s, "10;", "" + (-n) + ";");
} else {
s = JU.PT.rep (s, "10", "" + n);
}} else {
if (i < slen) axis = this.e.optParameterAsString (i++).toLowerCase ();
s = "rotate Y 360 30;";
}if (this.chk) return;
this.vwr.setNavigationMode (false);
if (axis === "" || "xyz".indexOf (axis) < 0) axis = "y";
s = JU.PT.rep (s, "Y", axis);
break;
case 3:
case 2:
endTime = this.floatParameter (i++);
break;
}
if (this.chk) return;
if (s != null) {
var wf = this.vwr.g.waitForMoveTo;
s = "set waitformoveto true;" + s + ";set waitformoveto " + wf;
s = "capture " + (isTransparent ? "transparent " : "") + JU.PT.esc (fileName) + (looping ? " LOOP;" : ";") + s + ";capture end;";
this.e.cmdScript (0, null, s);
return;
}mode = 1073742031;
params =  new java.util.Hashtable ();
var fps = this.vwr.getInt (553648132);
if (streaming) {
params.put ("streaming", Boolean.TRUE);
if (!looping) this.showString (J.i18n.GT.o (J.i18n.GT.$ ("Note: Enable looping using the LOOP keyword just after the file name or {0}"),  Clazz_newArray (-1, ["ANIMATION MODE LOOP"])));
this.showString (J.i18n.GT.o (J.i18n.GT.$ ("Animation delay based on: {0}"),  Clazz_newArray (-1, ["ANIMATION FPS " + fps])));
}params.put ("captureFps", Integer.$valueOf (fps));
break;
case 102409:
case 1073741874:
if (params != null) params.put ("captureSilent", Boolean.TRUE);
case 1073742335:
case 1073742334:
this.checkLength (-2);
mode = tok;
break;
default:
this.invArg ();
}
if (this.chk || params == null) return;
params.put ("type", type);
var c = Integer.$valueOf (this.vwr.getBackgroundArgb ());
params.put ("backgroundColor", c);
params.put ("fileName", fileName);
params.put ("quality", Integer.$valueOf (-1));
params.put ("endTime", Long.$valueOf (endTime <= 0 ? -1 : System.currentTimeMillis () + Clazz_floatToLong (endTime * 1000)));
params.put ("captureMode", JS.T.nameOf (mode).toLowerCase ());
params.put ("captureLooping", looping ? Boolean.TRUE : Boolean.FALSE);
var msg = this.vwr.processWriteOrCapture (params);
if (msg == null) msg = "canceled";
JU.Logger.info (msg);
});
Clazz_defineMethod (c$, "centerAt", 
 function () {
var tok = this.getToken (1).tok;
switch (tok) {
case 1073741826:
case 96:
case 1678381065:
break;
default:
this.invArg ();
}
var pt = JU.P3.new3 (0, 0, 0);
if (this.slen == 5) {
pt.x = this.floatParameter (2);
pt.y = this.floatParameter (3);
pt.z = this.floatParameter (4);
} else if (this.e.isCenterParameter (2)) {
pt = this.centerParameter (2);
this.e.checkLast (this.e.iToken);
} else {
this.checkLength (2);
}if (!this.chk && !this.vwr.isJmolDataFrame ()) this.vwr.tm.setCenterAt (tok, pt);
});
Clazz_defineMethod (c$, "compare", 
 function () {
var eval = this.e;
var isQuaternion = false;
var doRotate = false;
var doTranslate = false;
var doAnimate = false;
var isFlexFit = false;
var data1 = null;
var data2 = null;
var bsAtoms1 = null;
var bsAtoms2 = null;
var vAtomSets = null;
var vQuatSets = null;
eval.iToken = 0;
var nSeconds = (this.isFloatParameter (1) ? this.floatParameter (++eval.iToken) : NaN);
var bsFrom = this.atomExpressionAt (++eval.iToken);
var coordTo = null;
var bsTo = null;
if (eval.isArrayParameter (++eval.iToken)) {
coordTo = eval.getPointArray (eval.iToken, -1, false);
} else if (this.tokAt (eval.iToken) != 1140850689) {
bsTo = this.atomExpressionAt (eval.iToken);
}var bsSubset = null;
var isSmiles = false;
var strSmiles = null;
var bs = JU.BSUtil.copy (bsFrom);
if (bsTo != null) bs.or (bsTo);
var isToSubsetOfFrom = (coordTo == null && bsTo != null && bs.equals (bsFrom));
var isFrames = isToSubsetOfFrom;
for (var i = eval.iToken + 1; i < this.slen; ++i) {
switch (this.getToken (i).tok) {
case 4115:
isFrames = true;
break;
case 134218757:
isSmiles = true;
if (this.tokAt (i + 1) != 4) {
strSmiles = "*";
break;
}case 134218756:
strSmiles = this.stringParameter (++i);
break;
case 1677721602:
isFlexFit = true;
doRotate = true;
strSmiles = this.paramAsStr (++i);
if (strSmiles.equalsIgnoreCase ("SMILES")) {
isSmiles = true;
strSmiles = "*";
}break;
case 3:
case 2:
nSeconds = Math.abs (this.floatParameter (i));
if (nSeconds > 0) doAnimate = true;
break;
case 268435504:
break;
case 2109448:
bsSubset = this.atomExpressionAt (++i);
i = eval.iToken;
break;
case 10:
case 1073742325:
if (vQuatSets != null) this.invArg ();
bsAtoms1 = this.atomExpressionAt (eval.iToken);
var tok = (isToSubsetOfFrom ? 0 : this.tokAt (eval.iToken + 1));
bsAtoms2 = (coordTo == null && eval.isArrayParameter (eval.iToken + 1) ? null : (tok == 10 || tok == 1073742325 ? this.atomExpressionAt (++eval.iToken) : JU.BSUtil.copy (bsAtoms1)));
if (bsSubset != null) {
bsAtoms1.and (bsSubset);
if (bsAtoms2 != null) bsAtoms2.and (bsSubset);
}if (bsAtoms2 == null) coordTo = eval.getPointArray (++eval.iToken, -1, false);
 else if (bsTo != null) bsAtoms2.and (bsTo);
if (vAtomSets == null) vAtomSets =  new JU.Lst ();
vAtomSets.addLast ( Clazz_newArray (-1, [bsAtoms1, bsAtoms2]));
i = eval.iToken;
break;
case 7:
if (vAtomSets != null) this.invArg ();
isQuaternion = true;
data1 = eval.getQuaternionArray ((eval.theToken).getList (), 1073742001);
this.getToken (++i);
data2 = eval.getQuaternionArray ((eval.theToken).getList (), 1073742001);
if (vQuatSets == null) vQuatSets =  new JU.Lst ();
vQuatSets.addLast ( Clazz_newArray (-1, [data1, data2]));
break;
case 1073742077:
isQuaternion = true;
break;
case 134217751:
case 1140850689:
isQuaternion = false;
break;
case 528432:
doRotate = true;
break;
case 4160:
doTranslate = true;
break;
default:
this.invArg ();
}
}
if (this.chk) return;
if (isFrames) nSeconds = 0;
if (Float.isNaN (nSeconds) || nSeconds < 0) nSeconds = 1;
 else if (!doRotate && !doTranslate) doRotate = doTranslate = true;
doAnimate = (nSeconds != 0);
var isAtoms = (!isQuaternion && strSmiles == null || coordTo != null);
if (isAtoms) J.api.Interface.getInterface ("JU.Eigen", this.vwr, "script");
if (vAtomSets == null && vQuatSets == null) {
if (bsSubset == null) {
bsAtoms1 = (isAtoms ? this.vwr.getAtomBitSet ("spine") :  new JU.BS ());
if (bsAtoms1.nextSetBit (0) < 0) {
bsAtoms1 = bsFrom;
bsAtoms2 = bsTo;
} else {
bsAtoms2 = JU.BSUtil.copy (bsAtoms1);
bsAtoms1.and (bsFrom);
bsAtoms2.and (bsTo);
}} else {
bsAtoms1 = JU.BSUtil.copy (bsFrom);
bsAtoms2 = JU.BSUtil.copy (bsTo);
bsAtoms1.and (bsSubset);
bsAtoms1.and (bsFrom);
if (bsAtoms2 != null) {
bsAtoms2.and (bsSubset);
bsAtoms2.and (bsTo);
}}vAtomSets =  new JU.Lst ();
vAtomSets.addLast ( Clazz_newArray (-1, [bsAtoms1, bsAtoms2]));
}var bsFrames;
if (isFrames) {
var bsModels = this.vwr.ms.getModelBS (bsFrom, false);
bsFrames =  new Array (bsModels.cardinality ());
for (var i = 0, iModel = bsModels.nextSetBit (0); iModel >= 0; iModel = bsModels.nextSetBit (iModel + 1), i++) bsFrames[i] = this.vwr.getModelUndeletedAtomsBitSet (iModel);

} else {
bsFrames =  Clazz_newArray (-1, [bsFrom]);
}for (var iFrame = 0; iFrame < bsFrames.length; iFrame++) {
bsFrom = bsFrames[iFrame];
var retStddev =  Clazz_newFloatArray (2, 0);
var q = null;
var vQ =  new JU.Lst ();
var centerAndPoints = null;
var vAtomSets2 = (isFrames ?  new JU.Lst () : vAtomSets);
for (var i = 0; i < vAtomSets.size (); ++i) {
var bss = vAtomSets.get (i);
if (isFrames) vAtomSets2.addLast (bss =  Clazz_newArray (-1, [JU.BSUtil.copy (bss[0]), bss[1]]));
bss[0].and (bsFrom);
}
var center = null;
var translation = null;
if (isAtoms) {
if (coordTo != null) {
vAtomSets2.clear ();
vAtomSets2.addLast ( Clazz_newArray (-1, [bsAtoms1, coordTo]));
}try {
centerAndPoints = this.vwr.getCenterAndPoints (vAtomSets2, true);
} catch (ex) {
if (Clazz_exceptionOf (ex, Exception)) {
this.invArg ();
} else {
throw ex;
}
}
var n = centerAndPoints[0].length - 1;
for (var i = 1; i <= n; i++) {
var aij = centerAndPoints[0][i];
var bij = centerAndPoints[1][i];
if (!(Clazz_instanceOf (aij, JM.Atom)) || !(Clazz_instanceOf (bij, JM.Atom))) break;
JU.Logger.info (" atom 1 " + (aij).getInfo () + "\tatom 2 " + (bij).getInfo ());
}
q = JU.Measure.calculateQuaternionRotation (centerAndPoints, retStddev);
var r0 = (Float.isNaN (retStddev[1]) ? NaN : Math.round (retStddev[0] * 100) / 100);
var r1 = (Float.isNaN (retStddev[1]) ? NaN : Math.round (retStddev[1] * 100) / 100);
this.showString ("RMSD " + r0 + " --> " + r1 + " Angstroms");
} else if (isQuaternion) {
if (vQuatSets == null) {
for (var i = 0; i < vAtomSets2.size (); i++) {
var bss = vAtomSets2.get (i);
data1 = this.vwr.getAtomGroupQuaternions (bss[0], 2147483647);
data2 = this.vwr.getAtomGroupQuaternions (bss[1], 2147483647);
for (var j = 0; j < data1.length && j < data2.length; j++) {
vQ.addLast (data2[j].div (data1[j]));
}
}
} else {
for (var j = 0; j < data1.length && j < data2.length; j++) {
vQ.addLast (data2[j].div (data1[j]));
}
}retStddev[0] = 0;
data1 = vQ.toArray ( new Array (vQ.size ()));
q = JU.Quat.sphereMean (data1, retStddev, 0.0001);
this.showString ("RMSD = " + retStddev[0] + " degrees");
} else {
var m4 =  new JU.M4 ();
center =  new JU.P3 ();
if (("*".equals (strSmiles) || "".equals (strSmiles)) && bsFrom != null) try {
strSmiles = this.vwr.getSmiles (bsFrom);
} catch (ex) {
if (Clazz_exceptionOf (ex, Exception)) {
eval.evalError (ex.getMessage (), null);
} else {
throw ex;
}
}
if (isFlexFit) {
var list;
if (bsFrom == null || bsTo == null || (list = eval.getSmilesExt ().getFlexFitList (bsFrom, bsTo, strSmiles, !isSmiles)) == null) return;
this.vwr.setDihedrals (list, null, 1);
}var stddev = eval.getSmilesExt ().getSmilesCorrelation (bsFrom, bsTo, strSmiles, null, null, m4, null, false, null, center, false, 32 | (isSmiles ? 1 : 2));
if (Float.isNaN (stddev)) {
this.showString ("structures do not match");
return;
}if (doTranslate) {
translation =  new JU.V3 ();
m4.getTranslation (translation);
}if (doRotate) {
var m3 =  new JU.M3 ();
m4.getRotationScale (m3);
q = JU.Quat.newM (m3);
}this.showString ("RMSD = " + stddev + " Angstroms");
}if (centerAndPoints != null) center = centerAndPoints[0][0];
if (center == null) {
centerAndPoints = this.vwr.getCenterAndPoints (vAtomSets2, true);
center = centerAndPoints[0][0];
}var pt1 =  new JU.P3 ();
var endDegrees = NaN;
if (doTranslate) {
if (translation == null) translation = JU.V3.newVsub (centerAndPoints[1][0], center);
endDegrees = 1e10;
}if (doRotate) {
if (q == null) eval.evalError ("option not implemented", null);
pt1.add2 (center, q.getNormal ());
endDegrees = q.getTheta ();
if (endDegrees == 0 && doTranslate) {
if (translation.length () > 0.01) endDegrees = 1e10;
 else doRotate = doTranslate = doAnimate = false;
}}if (Float.isNaN (endDegrees) || Float.isNaN (pt1.x)) continue;
var ptsB = null;
if (doRotate && doTranslate && nSeconds != 0) {
var ptsA = this.vwr.ms.getAtomPointVector (bsFrom);
var m4 = JS.ScriptMathProcessor.getMatrix4f (q.getMatrix (), translation);
ptsB = JU.Measure.transformPoints (ptsA, m4, center);
}if (!eval.useThreads ()) doAnimate = false;
if (this.vwr.rotateAboutPointsInternal (eval, center, pt1, endDegrees / nSeconds, endDegrees, doAnimate, bsFrom, translation, ptsB, null, null) && doAnimate && eval.isJS) throw  new JS.ScriptInterruption (eval, "compare", 1);
}
});
Clazz_defineMethod (c$, "configuration", 
 function () {
var bsAtoms = null;
var bsSelected = this.vwr.bsA ();
if (this.slen == 1) {
if (this.chk) return;
bsAtoms = this.vwr.ms.setConformation (bsSelected);
this.vwr.ms.addStateScript ("select", null, bsSelected, null, "configuration", true, false);
} else {
var n;
if (this.isFloatParameter (1)) {
n = this.intParameter (this.e.checkLast (1));
if (this.chk) return;
bsAtoms = this.vwr.ms.getConformation (this.vwr.am.cmi, n - 1, true, null);
this.vwr.addStateScript ("configuration " + n + ";", true, false);
} else {
bsAtoms = this.atomExpressionAt (1);
if (this.chk) return;
n = this.intParameter (this.e.checkLast (this.e.iToken + 1));
this.vwr.addStateScript ("configuration " + JU.Escape.eBS (bsAtoms) + " " + n + ";", true, false);
bsAtoms = this.vwr.ms.getConformation (this.vwr.am.cmi, n - 1, true, bsAtoms);
}}this.setShapeProperty (1, "type", Integer.$valueOf (30720));
this.e.setShapeSizeBs (1, 0, bsAtoms);
this.vwr.autoHbond (bsAtoms, bsAtoms, true);
this.vwr.select (bsAtoms, false, 0, this.e.tQuiet);
});
Clazz_defineMethod (c$, "measure", 
 function () {
var eval = this.e;
var id = null;
var pt = 1;
var colix = 0;
var offset = null;
if (this.slen == 2) switch (this.tokAt (1)) {
case 1073742334:
this.setShapeProperty (6, "hideAll", Boolean.TRUE);
return;
case 12291:
if (!this.chk) this.vwr.clearAllMeasurements ();
return;
}
this.vwr.shm.loadShape (6);
switch (this.tokAt (1)) {
case 134218756:
var smarts = this.stringParameter (this.slen == 3 ? 2 : 4);
if (this.chk) return;
var atoms = this.vwr.ms.at;
var ac = this.vwr.ms.ac;
var maps = null;
try {
maps = this.vwr.getSmilesMatcher ().getCorrelationMaps (smarts, atoms, ac, this.vwr.bsA (), 2);
} catch (ex) {
if (Clazz_exceptionOf (ex, Exception)) {
eval.evalError (ex.getMessage (), null);
} else {
throw ex;
}
}
if (maps == null) return;
this.setShapeProperty (6, "maps", maps);
return;
}
switch (this.slen) {
case 2:
switch (this.getToken (pt).tok) {
case 0:
case 1073742335:
this.vwr.shm.loadShape (6);
this.setShapeProperty (6, "hideAll", Boolean.FALSE);
return;
case 1073742001:
if (!this.chk) eval.showStringPrint (this.vwr.getMeasurementInfoAsString (), false);
return;
case 4:
this.setShapeProperty (6, "setFormats", this.stringParameter (1));
return;
}
eval.errorStr (24, "ON, OFF, DELETE");
break;
case 3:
switch (this.getToken (1).tok) {
case 12291:
if (this.getToken (2).tok == 1073742327) {
if (!this.chk) this.vwr.clearAllMeasurements ();
} else {
var i = this.intParameter (2) - 1;
if (!this.chk) this.vwr.deleteMeasurement (i);
}return;
}
}
var nAtoms = 0;
var expressionCount = 0;
var modelIndex = -1;
var atomIndex = -1;
var ptFloat = -1;
var countPlusIndexes =  Clazz_newIntArray (5, 0);
var rangeMinMax =  Clazz_newFloatArray (-1, [3.4028235E38, 3.4028235E38]);
var isAll = false;
var isAllConnected = false;
var isNotConnected = false;
var isRange = true;
var rd = null;
var intramolecular = null;
var tokAction = 268435538;
var strFormat = null;
var property = null;
var units = null;
var font = null;
var points =  new JU.Lst ();
var bs =  new JU.BS ();
var target = null;
var tickInfo = null;
var nBitSets = 0;
var mad = 0;
var value = NaN;
var alignment = null;
for (var i = 1; i < this.slen; ++i) {
switch (this.getToken (i).tok) {
case 1073741974:
if (i != 1) this.invArg ();
id = eval.optParameterAsString (++i);
continue;
case 1073741824:
eval.errorStr (24, "ALL, ALLCONNECTED, DELETE");
break;
default:
this.error (15);
break;
case 268435568:
if (this.tokAt (i + 1) != 134217736) this.invArg ();
i++;
isNotConnected = true;
break;
case 1073741832:
alignment = this.paramAsStr (++i).toLowerCase ();
break;
case 134217736:
case 1073741834:
case 1073742327:
isAllConnected = (eval.theTok == 1073741834);
atomIndex = -1;
isAll = true;
if (isAllConnected && isNotConnected) this.invArg ();
break;
case 1765808134:
colix = JU.C.getColix (eval.getArgbParam (++i));
i = eval.iToken;
break;
case 1073742066:
if (eval.isPoint3f (++i)) {
var p = this.getPoint3f (i, false);
offset =  Clazz_newFloatArray (-1, [1, p.x, p.y, p.z, 0, 0, 0]);
} else {
offset = eval.floatParameterSet (i, 7, 7);
}i = eval.iToken;
break;
case 1665140738:
case 1073741917:
mad = Clazz_floatToInt ((eval.theTok == 1665140738 ? 2000 : 1000) * this.floatParameter (++i));
if (id != null && mad <= 0) mad = -1;
break;
case 3:
if (rd != null) this.invArg ();
isAll = true;
isRange = true;
ptFloat = (ptFloat + 1) % 2;
rangeMinMax[ptFloat] = this.floatParameter (i);
break;
case 12291:
if (tokAction != 268435538) this.invArg ();
tokAction = 12291;
break;
case 4114:
var fontsize = this.floatParameter (++i);
var fontface = this.paramAsStr (++i);
var fontstyle = this.paramAsStr (++i);
if (!this.chk) font = this.vwr.getFont3D (fontface, fontstyle, fontsize);
break;
case 2:
var iParam = this.intParameter (i);
if (isAll) {
isRange = true;
ptFloat = (ptFloat + 1) % 2;
rangeMinMax[ptFloat] = iParam;
} else {
atomIndex = this.vwr.ms.getFirstAtomIndexFromAtomNumber (iParam, this.vwr.getVisibleFramesBitSet ());
if (!this.chk && atomIndex < 0) return;
if (target != null) this.invArg ();
if ((countPlusIndexes[0] = ++nAtoms) > 4) eval.bad ();
countPlusIndexes[nAtoms] = atomIndex;
}break;
case 1094713359:
modelIndex = this.intParameter (++i);
break;
case 1073742334:
if (tokAction != 268435538) this.invArg ();
tokAction = 1073742334;
break;
case 1073742335:
if (tokAction != 268435538) this.invArg ();
tokAction = 1073742335;
break;
case 1073742114:
isAll = true;
isRange = true;
atomIndex = -1;
break;
case 1073741989:
case 1073741990:
intramolecular = Boolean.$valueOf (eval.theTok == 1073741989);
isAll = true;
isNotConnected = (eval.theTok == 1073741990);
break;
case 1648363544:
if (ptFloat >= 0) this.invArg ();
rd = eval.encodeRadiusParameter (i, false, true);
if (rd == null) return;
rd.values = rangeMinMax;
i = eval.iToken;
isNotConnected = true;
isAll = true;
intramolecular = Boolean.$valueOf (false);
if (nBitSets == 1) {
nBitSets++;
nAtoms++;
var bs2 = JU.BSUtil.copy (bs);
JU.BSUtil.invertInPlace (bs2, this.vwr.ms.ac);
bs2.and (this.vwr.ms.getAtomsWithinRadius (5, bs, false, null));
points.addLast (bs2);
}break;
case 12290:
case 10:
case 1073742325:
nBitSets++;
case 1073742332:
case 8:
case 1073742330:
if (atomIndex >= 0) this.invArg ();
var ret =  new Array (1);
target = eval.centerParameter (i, ret);
if (Clazz_instanceOf (ret[0], JU.BS)) {
target = bs = ret[0];
if (!this.chk && bs.length () == 0) return;
}if (Clazz_instanceOf (target, JU.P3)) {
var v =  new JU.Point3fi ();
v.setT (target);
v.mi = modelIndex;
target = v;
}if ((nAtoms = ++expressionCount) > 4) eval.bad ();
i = eval.iToken;
points.addLast (target);
break;
case 1715472409:
property = this.paramAsStr (i);
break;
case 1073742188:
value = this.floatParameter (++i);
break;
case 4:
var s = this.stringParameter (i);
if (JM.Measurement.isUnits (s)) {
units = s;
} else {
strFormat = s;
}break;
case 1073742164:
tickInfo = eval.tickParamAsStr (i, false, true, true);
i = eval.iToken;
tokAction = 12290;
break;
}
}
if (rd != null && (ptFloat >= 0 || nAtoms != 2) || nAtoms < 2 && id == null && (tickInfo == null || nAtoms == 1)) eval.bad ();
if (strFormat != null && strFormat.indexOf (nAtoms + ":") != 0) strFormat = nAtoms + ":" + strFormat;
if (isRange) {
if (rangeMinMax[1] < rangeMinMax[0]) {
rangeMinMax[1] = rangeMinMax[0];
rangeMinMax[0] = (rangeMinMax[1] == 3.4028235E38 ? 3.4028235E38 : -200);
}}if (this.chk) return;
var isRefreshID = (id != null && target == null && tokAction == 268435538);
if (target != null || tickInfo != null || isRefreshID) {
if (rd == null) rd =  new J.atomdata.RadiusData (rangeMinMax, 0, null, null);
if (tickInfo != null) tickInfo.id = "default";
if (isRefreshID) {
tokAction = 266284;
} else if (target != null && (property != null || strFormat != null) && tokAction == 268435538) {
tokAction = 12290;
}var text = null;
if (font != null || alignment != null || colix != 0 || strFormat != null && (isRefreshID || strFormat.indexOf ('\n') >= 0)) text = (J.api.Interface.getInterface ("JM.Text", this.vwr, "script")).newMeasure (this.vwr, font, colix);
if (text != null) {
text.pymolOffset = offset;
text.setAlignmentLCR (alignment);
}this.setShapeProperty (6, "measure", this.vwr.newMeasurementData (id, points).set (tokAction, null, rd, property, strFormat, units, tickInfo, isAllConnected, isNotConnected, intramolecular, isAll, mad, colix, text, value));
return;
}var propertyValue = (id == null ? countPlusIndexes : id);
switch (tokAction) {
case 12291:
this.setShapeProperty (6, "delete", propertyValue);
break;
case 1073742335:
this.setShapeProperty (6, "show", propertyValue);
break;
case 1073742334:
this.setShapeProperty (6, "hide", propertyValue);
break;
default:
this.setShapeProperty (6, (strFormat == null ? "toggle" : "toggleOn"), propertyValue);
if (strFormat != null) this.setShapeProperty (6, "setFormats", strFormat);
}
});
Clazz_defineMethod (c$, "connect", 
 function (index) {
var eval = this.e;
var distances =  Clazz_newFloatArray (2, 0);
var atomSets =  new Array (2);
atomSets[0] = atomSets[1] = this.vwr.bsA ();
var radius = NaN;
var colorArgb =  Clazz_newIntArray (-1, [-2147483648]);
var distanceCount = 0;
var bondOrder = 131071;
var bo;
var operation = 1073742026;
var isDelete = false;
var haveType = false;
var haveOperation = false;
var translucentLevel = 3.4028235E38;
var isColorOrRadius = false;
var nAtomSets = 0;
var nDistances = 0;
var bsBonds =  new JU.BS ();
var isBonds = false;
var expression2 = 0;
var ptColor = 0;
var energy = 0;
var addGroup = false;
if (this.slen == 1) {
if (!this.chk) this.vwr.rebondState (eval.$isStateScript);
return;
}if (this.tokAt (1) == 1073877011) {
if (!this.chk) this.vwr.connectNBO (this.e.optParameterAsString (2));
return;
}for (var i = index; i < this.slen; ++i) {
switch (this.getToken (i).tok) {
case 1073742335:
case 1073742334:
this.checkLength (2);
if (!this.chk) this.vwr.rebondState (eval.$isStateScript);
return;
case 2:
case 3:
if (nAtomSets > 0) {
if (haveType || isColorOrRadius) eval.error (23);
bo = JU.Edge.getBondOrderFromFloat (this.floatParameter (i));
if (bo == 131071) this.invArg ();
bondOrder = bo;
haveType = true;
break;
}if (++nDistances > 2) eval.bad ();
var dist = this.floatParameter (i);
if (this.tokAt (i + 1) == 268435634) {
dist = -dist / 100;
i++;
}distances[distanceCount++] = dist;
break;
case 12290:
case 10:
case 1073742325:
if (nAtomSets > 2 || isBonds && nAtomSets > 0) eval.bad ();
if (haveType || isColorOrRadius) this.invArg ();
atomSets[nAtomSets++] = this.atomExpressionAt (i);
isBonds = eval.isBondSet;
if (nAtomSets == 2) {
var pt = eval.iToken;
for (var j = i; j < pt; j++) if (this.tokAt (j) == 1073741824 && this.paramAsStr (j).equals ("_1")) {
expression2 = i;
break;
}
eval.iToken = pt;
}i = eval.iToken;
break;
case 1086324742:
addGroup = true;
break;
case 1765808134:
case 603979967:
case 1073742074:
isColorOrRadius = true;
translucentLevel = this.getColorTrans (eval, i, false, colorArgb);
i = eval.iToken;
break;
case 1073742086:
var isAuto = (this.tokAt (2) == 1073741852);
this.checkLength (isAuto ? 3 : 2);
if (this.chk) return;
this.vwr.clearModelDependentObjects ();
this.vwr.ms.deleteAllBonds ();
var bsExclude =  new JU.BS ();
this.vwr.ms.setPdbConectBonding (0, 0, bsExclude);
if (isAuto) {
var isLegacy = eval.$isStateScript && this.vwr.getBoolean (603979872);
this.vwr.ms.autoBondBs4 (null, null, bsExclude, null, this.vwr.getMadBond (), isLegacy);
this.vwr.addStateScript ((isLegacy ? "set legacyAutoBonding TRUE;connect PDB AUTO;set legacyAutoBonding FALSE;" : "connect PDB auto;"), false, true);
return;
}this.vwr.addStateScript ("connect PDB;", false, true);
return;
case 1073741830:
case 1073741852:
case 1073741904:
case 1073742025:
case 1073742026:
haveOperation = true;
if (++i != this.slen) this.invArg ();
operation = eval.theTok;
if (operation == 1073741852 && !(bondOrder == 131071 || bondOrder == 2048 || bondOrder == 515)) this.invArg ();
break;
case 659482:
if (!isColorOrRadius) {
colorArgb[0] = 0xFFFFFF;
translucentLevel = 0.5;
radius = this.vwr.getFloat (570425406);
isColorOrRadius = true;
}if (!haveOperation) {
operation = 1073742026;
haveOperation = true;
}case 1073741824:
if (eval.isColorParam (i)) {
ptColor = -i;
break;
}case 1075838996:
case 1613238294:
var cmd = this.paramAsStr (i);
if ((bo = JS.ScriptParam.getBondOrderFromString (cmd)) == 131071) this.invArg ();
if (haveType) eval.error (18);
haveType = true;
switch (bo) {
case 33:
switch (this.tokAt (i + 1)) {
case 3:
bo = JS.ScriptParam.getPartialBondOrderFromFloatEncodedInt (this.st[++i].intValue);
break;
case 2:
bo = this.intParameter (++i);
break;
}
break;
case 2048:
if (this.tokAt (i + 1) == 2) {
bo = (this.intParameter (++i) << 11);
energy = this.floatParameter (++i);
}break;
case 65537:
if (!haveOperation) {
operation = 1073742025;
haveOperation = true;
}break;
}
bondOrder = bo;
break;
case 1665140738:
radius = this.floatParameter (++i);
isColorOrRadius = true;
break;
case 1073742333:
case 12291:
if (++i != this.slen) this.invArg ();
operation = 12291;
isDelete = true;
isColorOrRadius = false;
break;
default:
ptColor = i;
break;
}
if (i > 0) {
if (ptColor == -i || ptColor == i && eval.isColorParam (i)) {
isColorOrRadius = true;
colorArgb[0] = eval.getArgbParam (i);
i = eval.iToken;
} else if (ptColor == i) {
this.invArg ();
}}}
if (this.chk) return;
if (distanceCount < 2) {
if (distanceCount == 0) distances[0] = 1.0E8;
distances[1] = distances[0];
distances[0] = 0.1;
}if (isColorOrRadius) {
if (!haveType) bondOrder = 65535;
if (!haveOperation) operation = 1073742025;
}var nNew = 0;
var nModified = 0;
var result;
if (expression2 > 0) {
var bs =  new JU.BS ();
this.vwr.definedAtomSets.put ("_1", bs);
var bs0 = atomSets[0];
for (var atom1 = bs0.nextSetBit (0); atom1 >= 0; atom1 = bs0.nextSetBit (atom1 + 1)) {
bs.set (atom1);
result = this.vwr.makeConnections (distances[0], distances[1], bondOrder, operation, bs, this.atomExpressionAt (expression2), bsBonds, isBonds, false, 0);
nNew += Math.abs (result[0]);
nModified += result[1];
bs.clear (atom1);
}
} else {
result = this.vwr.makeConnections (distances[0], distances[1], bondOrder, operation, atomSets[0], atomSets[1], bsBonds, isBonds, addGroup, energy);
nNew += Math.abs (result[0]);
nModified += result[1];
}var report = eval.doReport ();
if (isDelete) {
if (report) eval.report (J.i18n.GT.i (J.i18n.GT.$ ("{0} connections deleted"), nModified), false);
return;
}if (isColorOrRadius) {
this.vwr.selectBonds (bsBonds);
if (!Float.isNaN (radius)) eval.setShapeSizeBs (1, Math.round (radius * 2000), null);
this.finalizeObject (1, colorArgb[0], translucentLevel, 0, false, null, 0, bsBonds);
this.vwr.selectBonds (null);
}if (report) eval.report (J.i18n.GT.o (J.i18n.GT.$ ("{0} new bonds; {1} modified"),  Clazz_newArray (-1, [Integer.$valueOf (nNew), Integer.$valueOf (nModified)])), false);
}, "~N");
Clazz_defineMethod (c$, "console", 
 function () {
switch (this.getToken (1).tok) {
case 1073742334:
if (!this.chk) this.vwr.showConsole (false);
break;
case 1073742335:
if (!this.chk) this.vwr.showConsole (true);
break;
case 1073741882:
if (!this.chk) this.vwr.sm.clearConsole ();
break;
case 134221856:
this.showString (this.stringParameter (2));
break;
default:
this.invArg ();
}
});
Clazz_defineMethod (c$, "data", 
 function () {
var eval = this.e;
var dataString = null;
var dataLabel = null;
var isOneValue = false;
var i;
switch (eval.iToken = this.slen) {
case 5:
dataString = this.paramAsStr (2);
case 4:
case 2:
dataLabel = this.paramAsStr (1);
if (dataLabel.equalsIgnoreCase ("clear")) {
if (!this.chk) this.vwr.setData (null, null, 0, 0, 0, 0, 0);
return;
}if ((i = dataLabel.indexOf ("@")) >= 0) {
dataString = "" + eval.getParameter (dataLabel.substring (i + 1), 4, true);
dataLabel = dataLabel.substring (0, i).trim ();
} else if (dataString == null && (i = dataLabel.indexOf (" ")) >= 0) {
dataString = dataLabel.substring (i + 1).trim ();
dataLabel = dataLabel.substring (0, i).trim ();
isOneValue = true;
}break;
default:
eval.bad ();
}
var dataType = dataLabel.substring (0, (dataLabel + " ").indexOf (" ")).toLowerCase ();
if (dataType.equals ("model") || dataType.equals ("append")) {
eval.cmdLoad ();
return;
}if (this.chk) return;
var isDefault = (dataLabel.toLowerCase ().indexOf ("(default)") >= 0);
if (dataType.equals ("connect_atoms")) {
this.vwr.ms.connect (this.parseDataArray (dataString, false));
return;
}if (dataType.indexOf ("ligand_") == 0) {
this.vwr.setLigandModel (dataLabel.substring (7).toUpperCase () + "_data", dataString.trim ());
return;
}if (dataType.indexOf ("file_") == 0) {
this.vwr.setLigandModel (dataLabel.substring (5) + "_file", dataString.trim ());
return;
}var d =  new Array (4);
if (dataType.equals ("element_vdw")) {
d[0] = dataType;
d[1] = dataString.$replace (';', '\n');
var n = JU.Elements.elementNumberMax;
var eArray =  Clazz_newIntArray (n + 1, 0);
for (var ie = 1; ie <= n; ie++) eArray[ie] = ie;

d[2] = eArray;
d[3] = Integer.$valueOf (0);
this.vwr.setData ("element_vdw", d, n, 0, 0, 0, 0);
return;
}if (dataType.indexOf ("data2d_") == 0) {
d[0] = dataLabel;
d[1] = this.parseDataArray (dataString, false);
d[3] = Integer.$valueOf (2);
this.vwr.setData (dataLabel, d, 0, 0, 0, 0, 0);
return;
}if (dataType.indexOf ("data3d_") == 0) {
d[0] = dataLabel;
d[1] = this.parseDataArray (dataString, true);
d[3] = Integer.$valueOf (3);
this.vwr.setData (dataLabel, d, 0, 0, 0, 0, 0);
return;
}var tokens = JU.PT.getTokens (dataLabel);
if (dataType.indexOf ("property_") == 0 && !(tokens.length == 2 && tokens[1].equals ("set"))) {
var bs = this.vwr.bsA ();
d[0] = dataType;
var atomNumberField = (isOneValue ? 0 : (this.vwr.getP ("propertyAtomNumberField")).intValue ());
var atomNumberFieldColumnCount = (isOneValue ? 0 : (this.vwr.getP ("propertyAtomNumberColumnCount")).intValue ());
var propertyField = (isOneValue ? -2147483648 : (this.vwr.getP ("propertyDataField")).intValue ());
var propertyFieldColumnCount = (isOneValue ? 0 : (this.vwr.getP ("propertyDataColumnCount")).intValue ());
if (!isOneValue && dataLabel.indexOf (" ") >= 0) {
if (tokens.length == 3) {
dataLabel = tokens[0];
atomNumberField = JU.PT.parseInt (tokens[1]);
propertyField = JU.PT.parseInt (tokens[2]);
}if (tokens.length == 5) {
dataLabel = tokens[0];
atomNumberField = JU.PT.parseInt (tokens[1]);
atomNumberFieldColumnCount = JU.PT.parseInt (tokens[2]);
propertyField = JU.PT.parseInt (tokens[3]);
propertyFieldColumnCount = JU.PT.parseInt (tokens[4]);
}}if (atomNumberField < 0) atomNumberField = 0;
if (propertyField < 0) propertyField = 0;
var ac = this.vwr.ms.ac;
var atomMap = null;
var bsTemp = JU.BS.newN (ac);
if (atomNumberField > 0) {
atomMap =  Clazz_newIntArray (ac + 2, 0);
for (var j = 0; j <= ac; j++) atomMap[j] = -1;

for (var j = bs.nextSetBit (0); j >= 0; j = bs.nextSetBit (j + 1)) {
var atomNo = this.vwr.ms.at[j].getAtomNumber ();
if (atomNo > ac + 1 || atomNo < 0 || bsTemp.get (atomNo)) continue;
bsTemp.set (atomNo);
atomMap[atomNo] = j;
}
d[2] = atomMap;
} else {
d[2] = JU.BSUtil.copy (bs);
}d[1] = dataString;
d[3] = Integer.$valueOf (0);
this.vwr.setData (dataType, d, ac, atomNumberField, atomNumberFieldColumnCount, propertyField, propertyFieldColumnCount);
return;
}if ("occupany".equals (dataType)) dataType = "occupancy";
var userType = JM.AtomCollection.getUserSettableType (dataType);
if (userType > -1) {
this.vwr.setAtomData (userType, dataType, dataString, isDefault);
return;
}d[0] = dataLabel;
d[1] = dataString;
d[3] = Integer.$valueOf (0);
this.vwr.setData (dataType, d, 0, 0, 0, 0, 0);
});
Clazz_defineMethod (c$, "ellipsoid", 
 function () {
var eval = this.e;
var mad = 0;
var i = 1;
var translucentLevel = 3.4028235E38;
var checkMore = false;
var isSet = false;
this.setShapeProperty (20, "thisID", null);
switch (this.getToken (1).tok) {
case 1073742335:
mad = 2147483647;
break;
case 1073742334:
break;
case 2:
mad = this.intParameter (1);
break;
case 36867:
this.e.sm.loadShape (20);
this.setShapeProperty (20, "select", this.paramAsStr (2));
i = eval.iToken;
checkMore = true;
isSet = true;
break;
case 1073741974:
case 268435633:
case 1073741824:
this.e.sm.loadShape (20);
if (eval.theTok == 1073741974) i++;
this.setShapeId (20, i, false);
i = eval.iToken;
checkMore = true;
break;
default:
this.invArg ();
}
if (!checkMore) {
eval.setShapeSizeBs (20, mad, null);
return;
}var colorArgb =  Clazz_newIntArray (-1, [-2147483648]);
while (++i < this.slen) {
var key = this.paramAsStr (i);
var value = null;
this.getToken (i);
if (!isSet) switch (eval.theTok) {
case 1073742330:
key = "points";
var data =  new Array (3);
data[0] = eval.objectNameParameter (++i);
if (this.chk) continue;
eval.getShapePropertyData (24, "getVertices", data);
value = data;
break;
case 1825200146:
value = this.e.optParameterAsString (++i);
if ((value).length == 0) continue;
break;
case 1611272194:
var axes =  new Array (3);
var l = null;
switch (this.getToken (i + 1).tok) {
case 11:
i++;
var m = eval.theToken.value;
for (var im = 3; --im >= 0; ) m.getColumnV (im, axes[im] =  new JU.V3 ());

break;
case 1073742195:
i += 2;
case 268435520:
l =  new JU.Lst ();
for (var i1 = 3; --i1 >= 0; ) {
switch (this.tokAt (++i)) {
case 268435520:
break;
default:
if (eval.isCenterParameter (i)) {
l.addLast (JS.SV.newV (8, this.centerParameter (i)));
} else if (this.tokAt (i) == 268435520) {
} else {
l.addLast (this.getToken (i));
}}
i = eval.iToken;
}
if (this.getToken (++i).tok != 268435521) this.invArg ();
break;
case 7:
l = (eval.theToken).getList ();
switch (l.size ()) {
case 1:
var l1 =  new JU.Lst ();
for (var il = 3; --il >= 0; ) l1.addLast (this.getToken (++i));

l = l1;
break;
case 3:
break;
default:
this.invArg ();
break;
}
break;
default:
for (var j = 0; j < 3; j++) {
axes[j] =  new JU.V3 ();
axes[j].setT (this.centerParameter (++i));
i = eval.iToken;
}
break;
}
if (l != null) {
for (var k = 3; --k >= 0; ) {
var v = l.get (k);
switch (v.tok) {
case 7:
axes[k] = JU.V3.new3 (JS.SV.fValue (v.getList ().get (0)), JS.SV.fValue (v.getList ().get (1)), JS.SV.fValue (v.getList ().get (2)));
break;
case 8:
axes[k] = JU.V3.newV (v.value);
break;
}
}
}i = eval.iToken;
value = axes;
break;
case 12289:
value = this.centerParameter (++i);
i = eval.iToken;
break;
case 1094713359:
value = Integer.$valueOf (this.intParameter (++i));
break;
case 12291:
value = Boolean.TRUE;
this.checkLength (i + 1);
break;
}
if (value == null) switch (eval.theTok) {
case 1073742335:
key = "on";
value = Boolean.TRUE;
break;
case 1073742334:
key = "on";
value = Boolean.FALSE;
break;
case 1073742138:
if (this.isFloatParameter (i + 1)) {
value = Float.$valueOf (this.floatParameter (++i));
} else if (eval.isCenterParameter (i)) {
var p = this.centerParameter (i);
value =  Clazz_newFloatArray (-1, [p.x, p.y, p.z]);
} else {
value = eval.floatParameterSet (++i, 3, 3);
}i = eval.iToken;
break;
case 12290:
case 10:
case 1073742325:
key = "atoms";
value = this.atomExpressionAt (i);
i = eval.iToken;
break;
case 1765808134:
case 603979967:
case 1073742074:
translucentLevel = this.getColorTrans (eval, i, true, colorArgb);
i = eval.iToken;
continue;
case 1073742075:
value = this.paramAsStr (++i);
break;
}
if (value == null) this.invArg ();
this.setShapeProperty (20, key.toLowerCase (), value);
}
this.finalizeObject (20, colorArgb[0], translucentLevel, 0, false, null, 0, null);
this.setShapeProperty (20, "thisID", null);
});
Clazz_defineMethod (c$, "image", 
 function () {
if (!this.chk) this.vwr.getConsole ();
var pt = 1;
var id = null;
if (this.tokAt (1) == 1073741974) {
id = this.e.optParameterAsString (++pt);
pt++;
}var fileName = this.e.optParameterAsString (pt);
var isClose = this.e.optParameterAsString (this.slen - 1).equalsIgnoreCase ("close");
if (!isClose && (this.slen == pt || this.slen == pt + 2)) {
var width = (this.slen == pt + 2 ? this.intParameter (pt++) : -1);
var height = (width < 0 ? -1 : this.intParameter (pt));
var params =  new java.util.Hashtable ();
params.put ("fileName", "\1\1" + id);
params.put ("backgroundColor", Integer.$valueOf (this.vwr.getBackgroundArgb ()));
params.put ("type", "png");
params.put ("quality", Integer.$valueOf (-1));
params.put ("width", Integer.$valueOf (width));
params.put ("height", Integer.$valueOf (height));
if (!this.chk) this.vwr.processWriteOrCapture (params);
return;
}pt++;
if (isClose) {
switch (this.slen) {
case 2:
fileName = "closeall";
break;
case 3:
case 4:
break;
default:
this.checkLength (0);
}
}if (!this.chk) this.vwr.fm.loadImage (isClose ? "\1close" : fileName, "\1" + fileName + "\1" + ("".equals (id) || id == null ? null : id), false);
});
Clazz_defineMethod (c$, "invertSelected", 
 function () {
var eval = this.e;
var pt = null;
var plane = null;
var bs = null;
var iAtom = -2147483648;
var ipt = 1;
switch (this.tokAt (1)) {
case 0:
if (this.chk) return;
bs = this.vwr.bsA ();
pt = this.vwr.ms.getAtomSetCenter (bs);
this.vwr.invertAtomCoordPt (pt, bs);
return;
case 528443:
case 1140850689:
ipt++;
case 10:
case 1073742325:
case 12290:
bs = this.atomExpressionAt (ipt);
if (!eval.isAtomExpression (eval.iToken + 1)) {
eval.checkLengthErrorPt (eval.iToken + 1, eval.iToken + 1);
if (!this.chk) {
for (var i = bs.nextSetBit (0); i >= 0; i = bs.nextSetBit (i + 1)) {
this.vwr.invertRingAt (i, false);
}
}return;
}iAtom = bs.nextSetBit (0);
bs = this.atomExpressionAt (eval.iToken + 1);
break;
case 134217751:
pt = eval.centerParameter (2, null);
break;
case 134217750:
plane = eval.planeParameter (1);
break;
case 134219265:
plane = eval.hklParameter (2);
break;
}
eval.checkLengthErrorPt (eval.iToken + 1, 1);
if (plane == null && pt == null && iAtom == -2147483648) this.invArg ();
if (this.chk) return;
if (iAtom == -1) return;
this.vwr.invertSelected (pt, plane, iAtom, bs);
});
Clazz_defineMethod (c$, "mapProperty", 
 function () {
var bsFrom;
var bsTo;
var property1;
var property2;
var mapKey;
var tokProp1 = 0;
var tokProp2 = 0;
var tokKey = 0;
var eval = this.e;
while (true) {
if (this.tokAt (1) == 1113589787) {
bsFrom = this.vwr.bsA ();
bsTo = this.atomExpressionAt (2);
property1 = property2 = "selected";
} else {
bsFrom = this.atomExpressionAt (1);
if (this.tokAt (++eval.iToken) != 1073742336 || !JS.T.tokAttr (tokProp1 = this.tokAt (++eval.iToken), 1077936128)) break;
property1 = this.paramAsStr (eval.iToken);
bsTo = this.atomExpressionAt (++eval.iToken);
if (this.tokAt (++eval.iToken) != 1073742336 || !JS.T.tokAttr (tokProp2 = this.tokAt (++eval.iToken), 2048)) break;
property2 = this.paramAsStr (eval.iToken);
}if (JS.T.tokAttr (tokKey = this.tokAt (eval.iToken + 1), 1077936128)) mapKey = this.paramAsStr (++eval.iToken);
 else mapKey = JS.T.nameOf (tokKey = 1094715393);
eval.checkLast (eval.iToken);
if (this.chk) return;
var bsOut = null;
this.showString ("mapping " + property1.toUpperCase () + " for " + bsFrom.cardinality () + " atoms to " + property2.toUpperCase () + " for " + bsTo.cardinality () + " atoms using " + mapKey.toUpperCase ());
if (JS.T.tokAttrOr (tokProp1, 1094713344, 1111490560) && JS.T.tokAttrOr (tokProp2, 1094713344, 1111490560) && JS.T.tokAttrOr (tokKey, 1094713344, 1111490560)) {
var data1 = this.getBitsetPropertyFloat (bsFrom, tokProp1 | 224, null, NaN, NaN);
var data2 = this.getBitsetPropertyFloat (bsFrom, tokKey | 224, null, NaN, NaN);
var data3 = this.getBitsetPropertyFloat (bsTo, tokKey | 224, null, NaN, NaN);
var isProperty = (tokProp2 == 1715472409);
var dataOut =  Clazz_newFloatArray (isProperty ? this.vwr.ms.ac : data3.length, 0);
bsOut =  new JU.BS ();
if (data1.length == data2.length) {
var ht =  new java.util.Hashtable ();
for (var i = 0; i < data1.length; i++) {
ht.put (Float.$valueOf (data2[i]), Float.$valueOf (data1[i]));
}
var pt = -1;
var nOut = 0;
for (var i = 0; i < data3.length; i++) {
pt = bsTo.nextSetBit (pt + 1);
var F = ht.get (Float.$valueOf (data3[i]));
if (F == null) continue;
bsOut.set (pt);
dataOut[(isProperty ? pt : nOut)] = F.floatValue ();
nOut++;
}
if (isProperty) this.vwr.setData (property2,  Clazz_newArray (-1, [property2, dataOut, bsOut, Integer.$valueOf (1), Boolean.TRUE]), this.vwr.ms.ac, 0, 0, 2147483647, 0);
 else if (!JS.T.tokAttr (tokProp2, 2048)) this.error (56);
 else this.vwr.setAtomProperty (bsOut, tokProp2, 0, 0, null, dataOut, null);
}}if (bsOut == null) {
var format = "{" + mapKey + "=%[" + mapKey + "]}." + property2 + " = %[" + property1 + "]";
var data = this.getBitsetIdent (bsFrom, format, null, false, 2147483647, false);
var sb =  new JU.SB ();
for (var i = 0; i < data.length; i++) if (data[i].indexOf ("null") < 0) sb.append (data[i]).appendC ('\n');

if (JU.Logger.debugging) JU.Logger.debug (sb.toString ());
var bsSubset = JU.BSUtil.copy (this.vwr.slm.bsSubset);
this.vwr.slm.setSelectionSubset (bsTo);
try {
eval.runScript (sb.toString ());
} catch (e$$) {
if (Clazz_exceptionOf (e$$, Exception)) {
var ex = e$$;
{
this.vwr.slm.setSelectionSubset (bsSubset);
eval.errorStr (-1, "Error: " + ex.getMessage ());
}
} else if (Clazz_exceptionOf (e$$, Error)) {
var er = e$$;
{
this.vwr.slm.setSelectionSubset (bsSubset);
eval.errorStr (-1, "Error: " + er.toString ());
}
} else {
throw e$$;
}
}
this.vwr.slm.setSelectionSubset (bsSubset);
}this.showString ("DONE");
return;
}
this.invArg ();
});
Clazz_defineMethod (c$, "minimize", 
 function () {
var bsSelected = null;
var steps = 2147483647;
var crit = 0;
var addHydrogen = false;
var isSilent = false;
var bsFixed = null;
var isOnly = false;
var minimizer = this.vwr.getMinimizer (false);
for (var i = 1; i < this.slen; i++) switch (this.getToken (i).tok) {
case 1073741828:
addHydrogen = true;
continue;
case 1073741874:
case 1073742162:
this.checkLength (2);
if (this.chk || minimizer == null) return;
minimizer.setProperty (this.paramAsStr (i), null);
return;
case 1073741882:
this.checkLength (2);
if (this.chk || minimizer == null) return;
minimizer.setProperty ("clear", null);
return;
case 1073741894:
if (i != 1) this.invArg ();
var n = 0;
var targetValue = 0;
var aList =  Clazz_newIntArray (5, 0);
if (this.tokAt (++i) == 1073741882) {
this.checkLength (3);
} else {
while (n < 4 && !this.isFloatParameter (i)) {
aList[++n] = this.atomExpressionAt (i).nextSetBit (0);
i = this.e.iToken + 1;
}
aList[0] = n;
if (n == 1) this.invArg ();
targetValue = this.floatParameter (this.e.checkLast (i));
}if (!this.chk) this.vwr.getMinimizer (true).setProperty ("constraint",  Clazz_newArray (-1, [aList, Float.$valueOf (targetValue)]));
return;
case 1073741905:
crit = this.floatParameter (++i);
continue;
case 1073741935:
steps = 0;
continue;
case 12293:
if (i != 1) this.invArg ();
bsFixed = this.atomExpressionAt (++i);
if (bsFixed.nextSetBit (0) < 0) bsFixed = null;
i = this.e.iToken;
if (!this.chk) this.vwr.getMinimizer (true).setProperty ("fixed", bsFixed);
if (i + 1 == this.slen) return;
continue;
case 10:
case 1073742325:
isOnly = true;
case 1275082245:
if (this.e.theTok == 1275082245) i++;
bsSelected = this.atomExpressionAt (i);
i = this.e.iToken;
if (this.tokAt (i + 1) == 1073742072) {
i++;
isOnly = true;
}continue;
case 1073742148:
isSilent = true;
break;
case 266298:
steps = this.intParameter (++i);
continue;
default:
this.invArg ();
break;
}

if (!this.chk) try {
this.vwr.minimize (this.e, steps, crit, bsSelected, bsFixed, 0, addHydrogen, isOnly, isSilent, false);
} catch (e1) {
if (Clazz_exceptionOf (e1, Exception)) {
throw  new JS.ScriptInterruption (this.e, "minimize", 1);
} else {
throw e1;
}
}
});
Clazz_defineMethod (c$, "modulation", 
 function () {
var qtOffset = null;
var eval = this.e;
var mod = true;
var isQ = false;
var bs = null;
var i = 1;
switch (this.getToken (i).tok) {
case 1073742334:
mod = false;
case 0:
case 1073742335:
break;
case 12290:
case 10:
case 1073742325:
bs = this.atomExpressionAt (1);
switch (this.tokAt (eval.iToken + 1)) {
case 0:
break;
case 1073742334:
mod = false;
case 1073742335:
eval.iToken++;
break;
}
eval.checkLast (eval.iToken);
break;
case 1073742332:
case 8:
qtOffset = eval.getPoint3f (1, false, true);
isQ = (this.tokAt (eval.iToken + 1) == 1073742335);
break;
default:
var s = eval.theToken.value.toString ();
i++;
if (s.equalsIgnoreCase ("t")) {
eval.theTok = 3;
} else if (s.equalsIgnoreCase ("m") || s.equalsIgnoreCase ("q")) {
eval.theTok = 2;
} else {
this.invArg ();
}case 3:
case 2:
switch (eval.theTok) {
case 3:
if (this.isFloatParameter (i)) {
var t1 = this.floatParameter (i);
qtOffset = JU.P3.new3 (t1, t1, t1);
} else {
qtOffset = eval.getPoint3f (i, false, true);
}break;
case 2:
if (this.tokAt (i) == 2) {
var t = this.intParameter (i);
qtOffset = JU.P3.new3 (t, t, t);
} else {
qtOffset = eval.getPoint3f (i, false, true);
}isQ = true;
break;
}
break;
case 1073742138:
var scale = this.floatParameter (2);
if (!this.chk) this.vwr.setFloatProperty ("modulationScale", scale);
return;
}
if (!this.chk) {
this.vwr.tm.setVibrationPeriod (0);
this.vwr.setModulation (bs, mod, qtOffset, isQ);
}});
Clazz_defineMethod (c$, "mutate", 
 function () {
var bs;
var i;
switch (this.tokAt (1)) {
case 2:
this.st[1] = JS.T.o (4, "" + this.st[1].value);
default:
bs = this.atomExpressionAt (1);
i = ++this.e.iToken;
break;
case 268435633:
bs = this.vwr.getAllAtoms ();
i = 2;
break;
}
bs.and (this.vwr.getModelUndeletedAtomsBitSet (this.vwr.ms.mc - 1));
var iatom = bs.length () - 1;
var imodel = 0;
if (iatom < 0 || (imodel = this.vwr.ms.at[iatom].mi) != this.vwr.ms.mc - 1 || this.vwr.ms.isTrajectory (imodel)) return;
var group = this.e.optParameterAsString (i);
this.e.checkLast (i);
if (this.chk || !this.vwr.ms.am[imodel].isBioModel) return;
var isFile = (this.tokAt (i) == 4 && !group.startsWith ("~"));
var list = null;
if (isFile) {
list =  Clazz_newArray (-1, [group]);
group = null;
} else {
group = JU.PT.replaceAllCharacters (group, ",; \t\n", " ").trim ().toUpperCase ();
var isOneLetter = group.startsWith ("~");
if (isOneLetter || group.length != 3 || !this.vwr.getJBR ().isKnownPDBGroup (group, 20)) group = this.vwr.getJBR ().toStdAmino3 (isOneLetter ? group.substring (1) : group);
list = JU.PT.getTokens (group);
}if (list.length > 0) this.vwr.ms.bioModelset.mutate (bs, group, list);
});
Clazz_defineMethod (c$, "navigate", 
 function () {
var eval = this.e;
if (this.slen == 1) {
eval.setBooleanProperty ("navigationMode", true);
return;
}var rotAxis = JU.V3.new3 (0, 1, 0);
var list =  new JU.Lst ();
var pt;
if (this.slen == 2) {
switch (this.getToken (1).tok) {
case 1073742335:
case 1073742334:
if (this.chk) return;
eval.setObjectMad10 (34, "axes", 10);
this.setShapeProperty (34, "position", JU.P3.new3 (50, 50, 3.4028235E38));
eval.setBooleanProperty ("navigationMode", true);
this.vwr.tm.setNavOn (eval.theTok == 1073742335);
return;
case 1073742162:
if (!this.chk) this.vwr.tm.setNavXYZ (0, 0, 0);
return;
case 8:
case 1112152078:
break;
default:
this.invArg ();
}
}if (!this.chk && !this.vwr.getBoolean (603979889)) eval.setBooleanProperty ("navigationMode", true);
for (var i = 1; i < this.slen; i++) {
var timeSec = (this.isFloatParameter (i) ? this.floatParameter (i++) : 2);
if (timeSec < 0) this.invArg ();
if (!this.chk && timeSec > 0) eval.refresh (false);
switch (this.getToken (i).tok) {
case 8:
case 1073742332:
pt = this.getPoint3f (i, true);
eval.iToken++;
if (eval.iToken != this.slen) this.invArg ();
if (!this.chk) this.vwr.tm.setNavXYZ (pt.x, pt.y, pt.z);
return;
case 554176526:
var depth = this.floatParameter (++i);
if (!this.chk) list.addLast ( Clazz_newArray (-1, [Integer.$valueOf (554176526), Float.$valueOf (timeSec), Float.$valueOf (depth)]));
continue;
case 12289:
pt = this.centerParameter (++i);
i = eval.iToken;
if (!this.chk) list.addLast ( Clazz_newArray (-1, [Integer.$valueOf (134217751), Float.$valueOf (timeSec), pt]));
continue;
case 528432:
switch (this.getToken (++i).tok) {
case 1111492629:
rotAxis.set (1, 0, 0);
i++;
break;
case 1111492630:
rotAxis.set (0, 1, 0);
i++;
break;
case 1111492631:
rotAxis.set (0, 0, 1);
i++;
break;
case 8:
case 1073742332:
rotAxis.setT (this.getPoint3f (i, true));
i = eval.iToken + 1;
break;
case 1073741824:
this.invArg ();
break;
}
var degrees = this.floatParameter (i);
if (!this.chk) list.addLast ( Clazz_newArray (-1, [Integer.$valueOf (528432), Float.$valueOf (timeSec), rotAxis, Float.$valueOf (degrees)]));
continue;
case 4160:
var x = NaN;
var y = NaN;
if (this.isFloatParameter (++i)) {
x = this.floatParameter (i);
y = this.floatParameter (++i);
} else {
switch (this.tokAt (i)) {
case 1111492629:
x = this.floatParameter (++i);
break;
case 1111492630:
y = this.floatParameter (++i);
break;
default:
pt = this.centerParameter (i);
i = eval.iToken;
if (!this.chk) list.addLast ( Clazz_newArray (-1, [Integer.$valueOf (4160), Float.$valueOf (timeSec), pt]));
continue;
}
}if (!this.chk) list.addLast ( Clazz_newArray (-1, [Integer.$valueOf (268435634), Float.$valueOf (timeSec), Float.$valueOf (x), Float.$valueOf (y)]));
continue;
case 268435632:
continue;
case 1112152078:
var pathGuide;
var vp =  new JU.Lst ();
var bs;
if (eval.isAtomExpression (i + 1)) {
bs = this.atomExpressionAt (++i);
i = eval.iToken;
} else {
bs = this.vwr.bsA ();
}if (this.chk) return;
this.vwr.getPolymerPointsAndVectors (bs, vp);
var n;
if ((n = vp.size ()) > 0) {
pathGuide =  new Array (n);
for (var j = 0; j < n; j++) {
pathGuide[j] = vp.get (j);
}
list.addLast ( Clazz_newArray (-1, [Integer.$valueOf (1112152078), Float.$valueOf (timeSec), pathGuide]));
continue;
}break;
case 1073742084:
var path;
var theta = null;
if (this.getToken (i + 1).tok == 1073742330) {
i++;
var pathID = eval.objectNameParameter (++i);
if (this.chk) return;
this.setShapeProperty (22, "thisID", pathID);
path = this.getShapeProperty (22, "vertices");
eval.refresh (false);
if (path == null) this.invArg ();
var indexStart = Clazz_floatToInt (this.isFloatParameter (i + 1) ? this.floatParameter (++i) : 0);
var indexEnd = Clazz_floatToInt (this.isFloatParameter (i + 1) ? this.floatParameter (++i) : 2147483647);
list.addLast ( Clazz_newArray (-1, [Integer.$valueOf (1073742084), Float.$valueOf (timeSec), path, theta,  Clazz_newIntArray (-1, [indexStart, indexEnd])]));
continue;
}var v =  new JU.Lst ();
while (eval.isCenterParameter (i + 1)) {
v.addLast (this.centerParameter (++i));
i = eval.iToken;
}
if (v.size () > 0) {
path = v.toArray ( new Array (v.size ()));
if (!this.chk) list.addLast ( Clazz_newArray (-1, [Integer.$valueOf (1073742084), Float.$valueOf (timeSec), path, theta,  Clazz_newIntArray (-1, [0, 2147483647])]));
continue;
}default:
this.invArg ();
}
}
if (!this.chk && !this.vwr.isJmolDataFrame ()) this.vwr.tm.navigateList (eval, list);
});
Clazz_defineMethod (c$, "plot", 
 function (args) {
var eval = this.e;
var modelIndex = this.vwr.am.cmi;
if (modelIndex < 0) eval.errorStr (30, "plot");
modelIndex = this.vwr.ms.getJmolDataSourceFrame (modelIndex);
var pt = args.length - 1;
var isReturnOnly = (args !== this.st);
var pdbFormat = true;
var statementSave = this.st;
if (isReturnOnly) eval.st = this.st = args;
var tokCmd = (isReturnOnly ? 134222350 : args[0].tok);
var pt0 = (isReturnOnly || tokCmd == 134221850 || tokCmd == 4138 ? 0 : 1);
var filename = null;
var makeNewFrame = true;
var isDraw = false;
switch (tokCmd) {
case 4133:
case 134221850:
case 4138:
break;
case 135176:
makeNewFrame = false;
isDraw = true;
break;
case 134222350:
makeNewFrame = false;
pdbFormat = false;
break;
case 134221856:
makeNewFrame = false;
if (JS.CmdExt.tokAtArray (pt, args) == 4) {
filename = this.stringParameter (pt--);
} else if (JS.CmdExt.tokAtArray (pt - 1, args) == 1073742336) {
filename = this.paramAsStr (pt - 2) + "." + this.paramAsStr (pt);
pt -= 3;
} else {
eval.st = this.st = statementSave;
eval.iToken = this.st.length;
this.error (13);
}eval.slen = this.slen = pt + 1;
break;
}
var qFrame = "";
var parameters = null;
var stateScript = "";
var isQuaternion = false;
var isDerivative = false;
var isSecondDerivative = false;
var isRamachandranRelative = false;
var props =  new Array (3);
var propToks =  Clazz_newIntArray (3, 0);
var bs = JU.BSUtil.copy (this.vwr.bsA ());
var preSelected = "; select " + JU.Escape.eBS (bs) + ";\n ";
var type = eval.optParameterAsString (pt).toLowerCase ();
var minXYZ = null;
var maxXYZ = null;
var format = null;
var tok = JS.CmdExt.tokAtArray (pt0, args);
if (tok == 4) tok = JS.T.getTokFromName (args[pt0].value);
switch (tok) {
default:
eval.iToken = 1;
this.invArg ();
break;
case 134221834:
eval.iToken = 1;
type = "data";
preSelected = "";
break;
case 1715472409:
eval.iToken = pt0 + 1;
for (var i = 0; i < 3; i++) {
switch (this.tokAt (eval.iToken)) {
case 4:
propToks[i] = JS.T.getTokFromName (eval.getToken (eval.iToken).value);
break;
default:
propToks[i] = this.tokAt (eval.iToken);
break;
case 0:
if (i == 0) this.invArg ();
case 1287653388:
case 32:
case 64:
i = 2;
continue;
}
if (propToks[i] != 1715472409 && !JS.T.tokAttr (propToks[i], 1077936128)) this.invArg ();
props[i] = this.getToken (eval.iToken).value.toString ();
eval.iToken++;
}
if (this.tokAt (eval.iToken) == 1287653388) {
format = this.stringParameter (++eval.iToken);
pdbFormat = false;
eval.iToken++;
}if (this.tokAt (eval.iToken) == 32) {
minXYZ = this.getPoint3f (++eval.iToken, false);
eval.iToken++;
}if (this.tokAt (eval.iToken) == 64) {
maxXYZ = this.getPoint3f (++eval.iToken, false);
eval.iToken++;
}type = "property " + props[0] + (props[1] == null ? "" : " " + props[1]) + (props[2] == null ? "" : " " + props[2]);
if (bs.nextSetBit (0) < 0) bs = this.vwr.getModelUndeletedAtomsBitSet (modelIndex);
stateScript = "select " + JU.Escape.eBS (bs) + ";\n ";
break;
case 4138:
if (type.equalsIgnoreCase ("draw")) {
isDraw = true;
type = eval.optParameterAsString (--pt).toLowerCase ();
}isRamachandranRelative = (pt > pt0 && type.startsWith ("r"));
type = "ramachandran" + (isRamachandranRelative ? " r" : "") + (tokCmd == 135176 ? " draw" : "");
break;
case 134221850:
case 136314895:
qFrame = " \"" + this.vwr.getQuaternionFrame () + "\"";
stateScript = "set quaternionFrame" + qFrame + ";\n  ";
isQuaternion = true;
if (type.equalsIgnoreCase ("draw")) {
isDraw = true;
type = eval.optParameterAsString (--pt).toLowerCase ();
}isDerivative = (type.startsWith ("deriv") || type.startsWith ("diff"));
isSecondDerivative = (isDerivative && type.indexOf ("2") > 0);
if (isDerivative) pt--;
if (type.equalsIgnoreCase ("helix") || type.equalsIgnoreCase ("axis")) {
isDraw = true;
isDerivative = true;
pt = -1;
}type = ((pt <= pt0 ? "" : eval.optParameterAsString (pt)) + "w").substring (0, 1);
if (type.equals ("a") || type.equals ("r")) isDerivative = true;
if (!JU.PT.isOneOf (type, ";w;x;y;z;r;a;")) eval.evalError ("QUATERNION [w,x,y,z,a,r] [difference][2]", null);
type = "quaternion " + type + (isDerivative ? " difference" : "") + (isSecondDerivative ? "2" : "") + (isDraw ? " draw" : "");
break;
}
this.st = statementSave;
if (this.chk) return "";
if (makeNewFrame) {
stateScript += "plot " + type;
var ptDataFrame = this.vwr.ms.getJmolDataFrameIndex (modelIndex, stateScript);
if (ptDataFrame > 0 && tokCmd != 134221856 && tokCmd != 134222350) {
this.vwr.setCurrentModelIndexClear (ptDataFrame, true);
return "";
}}var dataX = null;
var dataY = null;
var dataZ = null;
var propData =  new Array (3);
if (tok == 1715472409) {
dataX = this.getBitsetPropertyFloat (bs, propToks[0] | 224, propToks[0] == 1715472409 ? props[0] : null, (minXYZ == null ? NaN : minXYZ.x), (maxXYZ == null ? NaN : maxXYZ.x));
propData[0] = props[0] + " " + JU.Escape.eAF (dataX);
if (props[1] != null) {
dataY = this.getBitsetPropertyFloat (bs, propToks[1] | 224, propToks[1] == 1715472409 ? props[1] : null, (minXYZ == null ? NaN : minXYZ.y), (maxXYZ == null ? NaN : maxXYZ.y));
propData[1] = props[1] + " " + JU.Escape.eAF (dataY);
}if (props[2] != null) {
dataZ = this.getBitsetPropertyFloat (bs, propToks[2] | 224, propToks[2] == 1715472409 ? props[2] : null, (minXYZ == null ? NaN : minXYZ.z), (maxXYZ == null ? NaN : maxXYZ.z));
propData[2] = props[2] + " " + JU.Escape.eAF (dataZ);
}if (minXYZ == null) minXYZ = JU.P3.new3 (this.getPlotMinMax (dataX, false, propToks[0]), this.getPlotMinMax (dataY, false, propToks[1]), this.getPlotMinMax (dataZ, false, propToks[2]));
if (maxXYZ == null) maxXYZ = JU.P3.new3 (this.getPlotMinMax (dataX, true, propToks[0]), this.getPlotMinMax (dataY, true, propToks[1]), this.getPlotMinMax (dataZ, true, propToks[2]));
JU.Logger.info ("plot min/max: " + minXYZ + " " + maxXYZ);
var center = null;
var factors = null;
if (pdbFormat) {
factors = JU.P3.new3 (1, 1, 1);
center =  new JU.P3 ();
center.ave (maxXYZ, minXYZ);
factors.sub2 (maxXYZ, minXYZ);
factors.set (factors.x / 200, factors.y / 200, factors.z / 200);
if (JS.T.tokAttr (propToks[0], 1094713344)) {
factors.x = 1;
center.x = 0;
} else if (factors.x > 0.1 && factors.x <= 10) {
factors.x = 1;
}if (JS.T.tokAttr (propToks[1], 1094713344)) {
factors.y = 1;
center.y = 0;
} else if (factors.y > 0.1 && factors.y <= 10) {
factors.y = 1;
}if (JS.T.tokAttr (propToks[2], 1094713344)) {
factors.z = 1;
center.z = 0;
} else if (factors.z > 0.1 && factors.z <= 10) {
factors.z = 1;
}if (props[2] == null || props[1] == null) center.z = minXYZ.z = maxXYZ.z = factors.z = 0;
for (var i = 0; i < dataX.length; i++) dataX[i] = (dataX[i] - center.x) / factors.x;

if (props[1] != null) for (var i = 0; i < dataY.length; i++) dataY[i] = (dataY[i] - center.y) / factors.y;

if (props[2] != null) for (var i = 0; i < dataZ.length; i++) dataZ[i] = (dataZ[i] - center.z) / factors.z;

}parameters =  Clazz_newArray (-1, [bs, dataX, dataY, dataZ, minXYZ, maxXYZ, factors, center, format, propData]);
}if (tokCmd == 134221856) return this.vwr.writeFileData (filename, "PLOT_" + type, modelIndex, parameters);
var data = (type.equals ("data") ? "1 0 H 0 0 0 # Jmol PDB-encoded data" : this.vwr.getPdbData (modelIndex, type, null, parameters, null, true));
if (tokCmd == 134222350) return data;
if (JU.Logger.debugging) JU.Logger.debug (data);
if (tokCmd == 135176) {
eval.runScript (data);
return "";
}var savedFileInfo = this.vwr.fm.getFileInfo ();
var oldAppendNew = this.vwr.getBoolean (603979792);
this.vwr.g.appendNew = true;
var isOK = (data != null && this.vwr.openStringInlineParamsAppend (data, null, true) == null);
this.vwr.g.appendNew = oldAppendNew;
this.vwr.fm.setFileInfo (savedFileInfo);
if (!isOK) return "";
var modelCount = this.vwr.ms.mc;
this.vwr.ms.setJmolDataFrame (stateScript, modelIndex, modelCount - 1);
if (tok != 1715472409) stateScript += ";\n" + preSelected;
var ss = this.vwr.addStateScript (stateScript, true, false);
var radius = 150;
var script;
switch (tok) {
default:
script = "frame 0.0; frame last; reset;select visible;wireframe only;";
radius = 10;
break;
case 1715472409:
this.vwr.setFrameTitle (modelCount - 1, type + " plot for model " + this.vwr.getModelNumberDotted (modelIndex));
script = "frame 0.0; frame last; reset;select visible; spacefill 3.0; wireframe 0;draw plotAxisX" + modelCount + " {100 -100 -100} {-100 -100 -100} \"" + props[0] + "\";" + "draw plotAxisY" + modelCount + " {-100 100 -100} {-100 -100 -100} \"" + props[1] + "\";";
if (props[2] != null) script += "draw plotAxisZ" + modelCount + " {-100 -100 100} {-100 -100 -100} \"" + props[2] + "\";";
break;
case 4138:
this.vwr.setFrameTitle (modelCount - 1, "ramachandran plot for model " + this.vwr.getModelNumberDotted (modelIndex));
script = "frame 0.0; frame last; reset;select visible; color structure; spacefill 3.0; wireframe 0;draw ramaAxisX" + modelCount + " {100 0 0} {-100 0 0} \"phi\";" + "draw ramaAxisY" + modelCount + " {0 100 0} {0 -100 0} \"psi\";";
break;
case 134221850:
case 136314895:
this.vwr.setFrameTitle (modelCount - 1, type.$replace ('w', ' ') + qFrame + " for model " + this.vwr.getModelNumberDotted (modelIndex));
var color = (JU.C.getHexCode (this.vwr.cm.colixBackgroundContrast));
script = "frame 0.0; frame last; reset;select visible; wireframe 0; spacefill 3.0; isosurface quatSphere" + modelCount + " color " + color + " sphere 100.0 mesh nofill frontonly translucent 0.8;" + "draw quatAxis" + modelCount + "X {100 0 0} {-100 0 0} color red \"x\";" + "draw quatAxis" + modelCount + "Y {0 100 0} {0 -100 0} color green \"y\";" + "draw quatAxis" + modelCount + "Z {0 0 100} {0 0 -100} color blue \"z\";" + "color structure;" + "draw quatCenter" + modelCount + "{0 0 0} scale 0.02;";
break;
}
eval.runScript (script + preSelected);
ss.setModelIndex (this.vwr.am.cmi);
this.vwr.setRotationRadius (radius, true);
eval.sm.loadShape (31);
this.showString ("frame " + this.vwr.getModelNumberDotted (modelCount - 1) + (type.length > 0 ? " created: " + type + (isQuaternion ? qFrame : "") : ""));
return "";
}, "~A");
Clazz_defineMethod (c$, "polyhedra", 
 function () {
var eval = this.e;
var haveBonds = (this.slen == 1);
var haveCenter = false;
var needsGenerating = haveBonds;
var onOffDelete = false;
var typeSeen = false;
var edgeParameterSeen = false;
var scale = NaN;
var nAtomSets = 0;
eval.sm.loadShape (21);
this.setShapeProperty (21, "init", Boolean.TRUE);
var translucentLevel = 3.4028235E38;
var radius = -1;
var colorArgb =  Clazz_newIntArray (-1, [-2147483648]);
var noToParam = -1;
var offset = null;
var id = null;
var ok = false;
var faces = null;
var points = null;
for (var i = 1; i < this.slen; ++i) {
var propertyName = null;
var propertyValue = null;
switch (this.getToken (i).tok) {
case 1073742197:
scale = NaN;
case 1073741872:
var index = (this.e.theTok == 1073742197 ? -1 : (this.tokAt (i + 1) == 2 ? this.intParameter (++i) : 1));
if (!this.chk) (J.api.Interface.getInterface ("JU.BZone", this.vwr, "script")).setViewer (this.vwr).createBZ (index, null, false, id, scale);
this.setShapeProperty (21, "init", Boolean.FALSE);
return;
case 6:
propertyName = "info";
propertyValue = this.e.theToken.value;
needsGenerating = true;
break;
case 134217751:
propertyName = "points";
propertyValue = Float.$valueOf (this.tokAt (++i) == 1073742334 ? 0 : this.e.floatParameter (i));
ok = true;
break;
case 1073742138:
scale = this.floatParameter (++i);
ok = true;
continue;
case 1814695966:
if (id != null) this.invArg ();
propertyName = "unitCell";
propertyValue = Boolean.TRUE;
needsGenerating = true;
break;
case 1073742072:
this.e.restrictSelected (false, false);
eval.theTok = 1073742335;
case 1073742335:
case 12291:
case 1073742334:
if (i + 1 != this.slen || needsGenerating || nAtomSets > 1) this.error (18);
propertyName = (eval.theTok == 1073742334 ? "off" : eval.theTok == 1073742335 ? "on" : "delete");
onOffDelete = true;
break;
case 7:
if (id == null || needsGenerating) this.invArg ();
needsGenerating = true;
faces = this.getIntArray2 (i);
points = this.getAllPoints (eval.iToken + 1, 3);
i = eval.iToken;
if (Clazz_instanceOf (points[0], JM.Atom)) this.setShapeProperty (21, "model", Integer.$valueOf ((points[0]).getModelIndex ()));
propertyName = "definedFaces";
propertyValue =  Clazz_newArray (-1, [faces, points]);
break;
case 1073741961:
propertyName = "full";
break;
case 2:
if (id != null) this.invArg ();
propertyName = "nVertices";
propertyValue = Integer.$valueOf (this.intParameter (i));
needsGenerating = true;
if (this.tokAt (i + 1) == 268435504) i++;
break;
case 1677721602:
if (id != null) this.invArg ();
if (nAtomSets > 0) this.invPO ();
needsGenerating = true;
propertyName = "bonds";
haveBonds = true;
break;
case 1073741852:
if (radius != -1) this.invArg ();
radius = 0;
i--;
case 1665140738:
i++;
case 3:
if (id != null) this.invArg ();
if (nAtomSets > 0) this.invPO ();
propertyName = (radius <= 0 ? "radius" : "radius1");
propertyValue = Float.$valueOf (radius = (radius == 0 ? 0 : this.floatParameter (i)));
needsGenerating = true;
break;
case 1073742066:
if (!this.isFloatParameter (i + 1)) {
offset = this.e.centerParameter (++i, null);
i = eval.iToken;
ok = true;
continue;
}case 1073741937:
this.setShapeProperty (21, "collapsed", null);
case 1073742099:
case 1073741924:
propertyName = JS.T.nameOf (eval.theTok);
switch (this.tokAt (i + 1)) {
case 268435860:
case 268435504:
i++;
break;
}
propertyValue = Float.$valueOf (this.floatParameter (++i));
break;
case 1094717454:
if (id == null) this.invArg ();
propertyName = "model";
propertyValue = Integer.$valueOf (this.intParameter (++i));
break;
case 1073742170:
if (nAtomSets > 1 || id != null && !haveCenter || noToParam == i) this.invPO ();
nAtomSets = 3;
if (eval.isAtomExpression (++i)) {
propertyName = (needsGenerating || haveCenter ? "to" : "toBitSet");
propertyValue = this.atomExpressionAt (i);
} else if (eval.isArrayParameter (i)) {
propertyName = "toVertices";
propertyValue = eval.getPointArray (i, -1, false);
} else {
this.error (19);
}i = eval.iToken;
needsGenerating = true;
break;
case 12290:
case 10:
case 1073742325:
if (typeSeen) this.invPO ();
switch (++nAtomSets) {
case 1:
if (id != null) this.invArg ();
propertyName = "centers";
break;
case 2:
propertyName = "to";
needsGenerating = true;
break;
default:
eval.bad ();
}
propertyValue = this.atomExpressionAt (i);
i = eval.iToken;
needsGenerating = new Boolean (needsGenerating | (i + 1 == this.slen)).valueOf ();
break;
case 1765808134:
case 603979967:
case 1073742074:
translucentLevel = this.getColorTrans (eval, i, true, colorArgb);
i = eval.iToken;
continue;
case 1073741948:
case 1073741886:
if (typeSeen) this.error (18);
typeSeen = true;
if (this.isFloatParameter (i + 1)) this.setShapeProperty (21, "faceCenterOffset", Float.$valueOf (this.floatParameter (++i)));
propertyName = (this.e.theTok == 1073741886 ? "collapsed" : null);
break;
case 1073742044:
case 1073741933:
case 1073741956:
case 1073741934:
if (edgeParameterSeen) this.error (18);
edgeParameterSeen = true;
ok = true;
propertyName = JS.T.nameOf (eval.theTok);
break;
case 1073742182:
case 1073742060:
case 1073741861:
case 1073741958:
case 1073741964:
continue;
case 1073741974:
case 268435633:
case 1073741824:
case 4:
if (!eval.isColorParam (i)) {
if (i != 1) this.invPO ();
id = (eval.theTok == 1073741974 ? this.stringParameter (++i) : eval.optParameterAsString (i));
this.setShapeProperty (21, "thisID", id);
this.setShapeProperty (21, "model", Integer.$valueOf (this.vwr.am.cmi));
if (!eval.isCenterParameter (i + 1)) continue;
propertyName = "center";
propertyValue = this.centerParameter (++i);
i = eval.iToken;
haveCenter = true;
break;
}default:
if (eval.isColorParam (i)) {
colorArgb[0] = eval.getArgbParam (i);
if (eval.isCenterParameter (i)) noToParam = eval.iToken + 1;
i = eval.iToken;
continue;
}this.invArg ();
}
if (propertyName != null) this.setShapeProperty (21, propertyName, propertyValue);
if (onOffDelete) return;
}
if (needsGenerating) {
if (!typeSeen && haveBonds) this.setShapeProperty (21, "bonds", null);
this.setShapeProperty (21, "generate", null);
} else if (!ok) {
this.error (19);
}if (offset != null) this.setShapeProperty (21, "offset", offset);
if (!Float.isNaN (scale)) this.setShapeProperty (21, "scale", Float.$valueOf (scale));
if (colorArgb[0] != -2147483648) this.setShapeProperty (21, "colorThis", Integer.$valueOf (colorArgb[0]));
if (translucentLevel != 3.4028235E38) eval.setShapeTranslucency (21, "", "translucentThis", translucentLevel, null);
this.setShapeProperty (21, "init", Boolean.FALSE);
});
Clazz_defineMethod (c$, "write", 
 function (args) {
var eval = this.e;
var pt = 1;
var pt0 = 1;
var scripts = null;
var msg = null;
var localPath = null;
var remotePath = null;
var type = "SPT";
var isCommand = true;
var showOnly = false;
var isContact = false;
if (args == null) {
args = this.st;
showOnly = (this.vwr.isApplet && !this.vwr.isSignedApplet || !this.vwr.haveAccess (JV.Viewer.ACCESS.ALL) || this.vwr.fm.getPathForAllFiles ().length > 0);
} else {
pt = pt0 = 0;
isCommand = false;
showOnly = !isCommand;
}var tok = JS.CmdExt.tokAtArray (pt, args);
if (tok == 4 && !isCommand) {
var t0 = JS.T.getTokenFromName (JS.SV.sValue (args[0]).toLowerCase ());
if (t0 != null) tok = t0.tok;
}switch (tok) {
case 0:
break;
case 134221850:
case 4138:
case 1715472409:
msg = this.plot (args);
return (showOnly ? msg : this.writeMsg (msg));
case 134222850:
if (eval.isArrayParameter (pt + 1)) {
scripts = eval.stringParameterSet (++pt);
localPath = ".";
remotePath = ".";
pt0 = pt = eval.iToken + 1;
tok = this.tokAt (pt);
}break;
default:
type = JS.SV.sValue (this.tokenAt (pt, args)).toUpperCase ();
}
var driverList = this.vwr.getExportDriverList ();
var data = null;
var argCount = (isCommand ? this.slen : args.length);
var type2 = "";
var val = null;
var is2D = false;
var tVar = null;
var nVibes = 0;
var sceneType = null;
var isCoord = false;
var bsFrames = null;
var width = -1;
var height = -1;
var isExport = false;
var fileName = null;
var quality = -2147483648;
if (tok != 0 && isCommand && this.slen > 1 && this.tokAt (this.slen - 2) == 1073741848) {
type = this.paramAsStr (this.slen - 1).toUpperCase ();
pt0 = argCount;
argCount -= 2;
tok = 0;
}switch (tok) {
case 0:
break;
case 15:
case 6:
type = "VAR";
tVar = this.tokenAt (pt++, args);
break;
case 1073741984:
type = "INLINE";
data = JS.SV.sValue (this.tokenAt (++pt, args));
pt++;
break;
case 134217762:
type = "PGRP";
pt++;
type2 = JS.SV.sValue (this.tokenAt (pt, args)).toLowerCase ();
if (type2.equals ("draw")) pt++;
break;
case 1073742329:
pt++;
isCoord = true;
break;
case 1073742158:
case 134222850:
val = JS.SV.sValue (this.tokenAt (++pt, args)).toLowerCase ();
while (val.equals ("localpath") || val.equals ("remotepath")) {
if (val.equals ("localpath")) localPath = JS.SV.sValue (this.tokenAt (++pt, args));
 else remotePath = JS.SV.sValue (this.tokenAt (++pt, args));
val = JS.SV.sValue (this.tokenAt (++pt, args)).toLowerCase ();
}
type = "SPT";
break;
case 1228935687:
case 134320141:
case 1610616855:
case 135180:
case 1073742015:
case 1073742018:
case 1073877011:
case 1073877010:
case 135188:
pt++;
break;
case 1073741991:
type = "ZIPALL";
pt++;
break;
case 36868:
type = "VAR";
pt += 2;
break;
case 1073741929:
case 4115:
case 4120:
case 1073742139:
case 4166:
case 1073741824:
case 4:
switch (tok) {
case 4115:
var bsAtoms;
if (pt + 1 < argCount && args[++pt].tok == 1073742325 || args[pt].tok == 10) {
bsAtoms = eval.atomExpression (args, pt, 0, true, false, null, true);
pt = eval.iToken + 1;
} else {
bsAtoms = this.vwr.getAllAtoms ();
}if (!this.chk) bsFrames = this.vwr.ms.getModelBS (bsAtoms, true);
break;
case 1073741929:
tok = 4120;
is2D = true;
case 4120:
type = "IMAGE";
pt++;
break;
case 1073742139:
val = JS.SV.sValue (this.tokenAt (++pt, args)).toUpperCase ();
if (JU.PT.isOneOf (val, ";PNG;PNGJ;")) {
sceneType = val;
pt++;
} else {
sceneType = "PNG";
}break;
case 4166:
nVibes = eval.intParameterRange (++pt, 1, 10);
if (nVibes == 2147483647) return "";
if (!this.chk) {
this.vwr.tm.setVibrationPeriod (0);
if (!eval.isJS) eval.delayScript (100);
}pt++;
break;
default:
tok = 4120;
break;
}
if (tok == 4120 && pt < args.length) {
var t = JS.T.getTokenFromName (JS.SV.sValue (args[pt]).toLowerCase ());
if (t != null) type = JS.SV.sValue (t).toUpperCase ();
if (JU.PT.isOneOf (type, driverList.toUpperCase ())) {
pt++;
type = type.substring (0, 1).toUpperCase () + type.substring (1).toLowerCase ();
isExport = true;
if (isCommand) fileName = "Jmol." + type.toLowerCase ();
break;
} else if (JU.PT.isOneOf (type, ";ZIP;ZIPALL;SPT;STATE;")) {
pt++;
break;
} else {
type = "IMAGE";
}}if (JS.CmdExt.tokAtArray (pt, args) == 2) {
width = JS.SV.iValue (this.tokenAt (pt++, args));
if (width <= 0) this.invArg ();
height = JS.SV.iValue (this.tokenAt (pt++, args));
if (height <= 0) this.invArg ();
}break;
}
if (pt0 < argCount) {
val = JS.SV.sValue (this.tokenAt (pt, args));
if (val.equalsIgnoreCase ("clipboard")) {
if (this.chk) return "";
} else if (JU.PT.isOneOf (val.toLowerCase (), ";jpg;jpeg;jpg64;jpeg64;gif;gift;pdf;ppm;png;pngj;pngt;")) {
if (JS.CmdExt.tokAtArray (pt + 1, args) == 2 && JS.CmdExt.tokAtArray (pt + 2, args) == 2) {
width = JS.SV.iValue (this.tokenAt (++pt, args));
if (width <= 0) this.invArg ();
height = JS.SV.iValue (this.tokenAt (++pt, args));
if (height <= 0) this.invArg ();
}if (JS.CmdExt.tokAtArray (pt + 1, args) == 2) quality = JS.SV.iValue (this.tokenAt (++pt, args));
} else if (JU.PT.isOneOf (val.toLowerCase (), ";xyz;xyzrn;xyzvib;mol;mol67;sdf;v2000;v3000;json;pdb;pqr;cml;cif;qcjson;")) {
type = val.toUpperCase ();
if (pt + 1 == argCount) pt++;
}if (type.equals ("IMAGE") && JU.PT.isOneOf (val.toLowerCase (), ";jpg;jpeg;jpg64;jpeg64;gif;gift;pdf;ppm;png;pngj;pngt;scene;")) {
type = val.toUpperCase ();
quality = -2147483648;
pt++;
}}if (pt + 2 == argCount) {
JS.SV.sValue (this.tokenAt (++pt, args));
}switch (JS.CmdExt.tokAtArray (pt, args)) {
case 0:
showOnly = true;
break;
case 1073741884:
break;
case 805306401:
fileName = (type.equals ("IMAGE") ? "?jmol.png" : "?jmol." + type.toLowerCase ());
break;
case 1073741824:
case 4:
fileName = JS.SV.sValue (this.tokenAt (pt, args));
if (fileName.equalsIgnoreCase ("clipboard") || !this.vwr.haveAccess (JV.Viewer.ACCESS.ALL)) fileName = null;
break;
default:
this.invArg ();
}
if (type.equals ("IMAGE") || type.equals ("FRAME") || type.equals ("VIBRATION")) {
type = (fileName != null && fileName.indexOf (".") >= 0 ? fileName.substring (fileName.lastIndexOf (".") + 1).toUpperCase () : "JPG");
}if (type.equals ("ISOSURFACE") || type.equals ("CONTACT")) {
isContact = type.equals ("CONTACT");
type = (fileName != null && fileName.indexOf (".") >= 0 ? fileName.substring (fileName.lastIndexOf (".") + 1).toUpperCase () : "JVXL");
if (type.equals ("PMESH")) type = "ISOMESH";
 else if (type.equals ("PMB")) type = "ISOMESHBIN";
}var isImage = JU.PT.isOneOf (type.toLowerCase (), ";jpg;jpeg;jpg64;jpeg64;gif;gift;pdf;ppm;png;pngj;pngt;scene;");
if (!isImage) {
if (type.equals ("MNU")) {
type = "MENU";
} else if (type.equals ("WRL") || type.equals ("VRML")) {
type = "Vrml";
isExport = true;
} else if (type.equals ("X3D")) {
type = "X3d";
isExport = true;
} else if (type.equals ("STL")) {
type = "Stl";
isExport = true;
} else if (type.equals ("IDTF")) {
type = "Idtf";
isExport = true;
} else if (type.equals ("MA")) {
type = "Maya";
isExport = true;
} else if (type.equals ("JS")) {
type = "Js";
isExport = true;
} else if (type.equals ("OBJ")) {
type = "Obj";
isExport = true;
} else if (type.equals ("JVXL")) {
type = "ISOSURFACE";
} else if (type.equals ("XJVXL")) {
type = "ISOSURFACE";
} else if (type.equals ("JMOL")) {
type = "ZIPALL";
} else if (type.equals ("HIS")) {
type = "HISTORY";
}if (type.equals ("COORD") || type.equals ("COORDS")) type = (fileName != null && fileName.indexOf (".") >= 0 ? fileName.substring (fileName.lastIndexOf (".") + 1).toUpperCase () : "XYZ");
}if (scripts != null) {
if (type.equals ("PNG")) type = "PNGJ";
if (!type.equals ("PNGJ") && !type.equals ("ZIPALL") && !type.equals ("ZIP")) this.invArg ();
}if (!isImage && !isExport && !JU.PT.isOneOf (type, ";SCENE;JMOL;ZIP;ZIPALL;SPT;HISTORY;MO;NBO;ISOSURFACE;MESH;PMESH;PMB;ISOMESHBIN;ISOMESH;VAR;FILE;FUNCTION;CFI;CIF;CML;JSON;XYZ;XYZRN;XYZVIB;MENU;MOL;MOL67;PDB;PGRP;PQR;QUAT;RAMA;SDF;V2000;V3000;QCJSON;INLINE;")) eval.errorStr2 (54, "COORDS|FILE|FUNCTIONS|HISTORY|IMAGE|INLINE|ISOSURFACE|JMOL|MENU|MO|NBO|POINTGROUP|QUATERNION [w,x,y,z] [derivative]|RAMACHANDRAN|SPT|STATE|VAR x|ZIP|ZIPALL  CLIPBOARD", "CIF|CML|CFI|GIF|GIFT|JPG|JPG64|JMOL|JVXL|MESH|MOL|PDB|PMESH|PNG|PNGJ|PNGT|PPM|PQR|SDF|CD|JSON|QCJSON|V2000|V3000|SPT|XJVXL|XYZ|XYZRN|XYZVIB|ZIP" + driverList.toUpperCase ().$replace (';', '|'));
if (this.chk) return "";
var fullPath =  new Array (1);
var params;
var timeMsg = this.vwr.getBoolean (603979934);
if (isExport) {
if (timeMsg) JU.Logger.startTimer ("export");
var eparams =  new java.util.Hashtable ();
eparams.put ("type", type);
if (fileName != null) eparams.put ("fileName", fileName);
if (isCommand || fileName != null) eparams.put ("fullPath", fullPath);
eparams.put ("width", Integer.$valueOf (width));
eparams.put ("height", Integer.$valueOf (height));
data = this.vwr.generateOutputForExport (eparams);
if (data == null || data.length == 0) return "";
if (showOnly) return data;
if (!type.equals ("Povray") && !type.equals ("Idtf") || fullPath[0] == null) return this.writeMsg (data);
var ext = (type.equals ("Idtf") ? ".tex" : ".ini");
fileName = fullPath[0] + ext;
params =  new java.util.Hashtable ();
params.put ("fileName", fileName);
params.put ("type", ext);
params.put ("text", data);
params.put ("fullPath", fullPath);
msg = this.vwr.processWriteOrCapture (params);
if (type.equals ("Idtf")) data = data.substring (0, data.indexOf ("\\begin{comment}"));
data = "Created " + fullPath[0] + ":\n\n" + data;
if (timeMsg) this.showString (JU.Logger.getTimerMsg ("export", 0));
if (msg != null) {
var isError = !msg.startsWith ("OK");
if (isError) eval.evalError (msg, null);
eval.report (data, isError);
}return "";
}var bytes = null;
var writeFileData = false;
if (data == null) {
var len = 0;
data = type.intern ();
if (data === "MENU") {
data = this.vwr.getMenu ("");
} else if (data === "PGRP") {
data = this.vwr.ms.getPointGroupAsString (this.vwr.bsA (), null, 0, 1.0, null, null, type2.equals ("draw") ? "" : null);
} else if (data === "PDB" || data === "PQR") {
if (showOnly) {
data = this.vwr.getPdbAtomData (null, null, (data === "PQR"), isCoord);
} else {
writeFileData = true;
type = "PDB_" + data + "-coord " + isCoord;
}} else if (data === "FILE") {
if ("?".equals (fileName)) fileName = "?Jmol." + this.vwr.getP ("_fileType");
if (showOnly) data = this.vwr.getCurrentFileAsString ("script");
 else writeFileData = true;
} else if (data === "CIF" || data === "SDF" || data === "MOL" || data === "MOL67" || data === "V2000" || data === "V3000" || data === "CD" || data === "JSON" || data === "XYZ" || data === "XYZRN" || data === "XYZVIB" || data === "CML" || data === "QCJSON") {
var selected = this.vwr.bsA ();
var bsModel;
msg = " (" + selected.cardinality () + " atoms)";
if (this.vwr.am.cmi >= 0 && !selected.equals (bsModel = this.vwr.getModelUndeletedAtomsBitSet (this.vwr.am.cmi))) msg += "\nNote! Selected atom set " + selected + " is not the same as the current model " + bsModel;
data = this.vwr.getModelExtract (selected, isCoord, false, data);
if (data.startsWith ("ERROR:")) bytes = data;
} else if (data === "CFI") {
data = this.vwr.getModelFileData ("selected", "cfi", false);
} else if (data === "FUNCTION") {
data = this.vwr.getFunctionCalls (null);
type = "TXT";
} else if (data === "VAR") {
if (tVar == null) {
tVar = eval.getParameter (JS.SV.sValue (this.tokenAt (isCommand ? 2 : 1, args)), 1073742190, true);
}var v = null;
if (tVar.tok == 15) {
v =  new JU.Lst ();
v.addLast ((tVar.value).data);
} else if (tVar.tok == 6) {
v = (fileName == null ?  new JU.Lst () : this.prepareBinaryOutput (tVar));
}if (v == null) {
data = tVar.asString ();
type = "TXT";
} else {
if (fileName != null) {
params =  new java.util.Hashtable ();
params.put ("data", v);
if ((bytes = data = this.vwr.createZip (fileName, v.size () == 1 || fileName.endsWith (".png") || fileName.endsWith (".pngj") ? "BINARY" : "ZIPDATA", params)) == null) eval.evalError ("#CANCELED#", null);
}}} else if (data === "SPT") {
if (isCoord) {
var tainted = this.vwr.ms.getTaintedAtoms (2);
this.vwr.setAtomCoordsRelative (JU.P3.new3 (0, 0, 0), null);
data = this.vwr.getStateInfo ();
this.vwr.ms.setTaintedAtoms (tainted, 2);
} else {
data = this.vwr.getStateInfo ();
if (localPath != null || remotePath != null) data = JV.FileManager.setScriptFileReferences (data, localPath, remotePath, null);
}} else if (data === "ZIP" || data === "ZIPALL") {
if (fileName != null) {
params =  new java.util.Hashtable ();
if (scripts != null) params.put ("data", scripts);
if ((bytes = data = this.vwr.createZip (fileName, type, params)) == null) eval.evalError ("#CANCELED#", null);
}} else if (data === "HISTORY") {
data = this.vwr.getSetHistory (2147483647);
type = "SPT";
} else if (data === "MO" || data === "NBO") {
data = this.getMoJvxl (2147483647, data === "NBO");
type = "XJVXL";
} else if (data === "PMESH" || data === "PMB") {
if ((data = this.getIsosurfaceJvxl (29, data)) == null) this.error (31);
type = "XJVXL";
} else if (data === "ISOMESH") {
if ((data = this.getIsosurfaceJvxl (24, data)) == null) this.error (31);
type = "PMESH";
} else if (data === "ISOMESHBIN") {
if ((bytes = this.getIsosurfaceJvxl (24, "ISOMESHBIN")) == null) this.error (31);
type = "PMB";
} else if (data === "ISOSURFACE" || data === "MESH") {
if ((data = this.getIsosurfaceJvxl (isContact ? 25 : 24, data)) == null) this.error (31);
type = (data.indexOf ("<?xml") >= 0 ? "XJVXL" : "JVXL");
if (!showOnly) this.showString (this.getShapeProperty (isContact ? 25 : 24, "jvxlFileInfo"));
} else {
if (isCommand && showOnly && fileName == null) {
showOnly = false;
fileName = "\1";
}len = -1;
if (sceneType == null && quality < 0) quality = -1;
}if (data == null) data = "";
if (len == 0) len = (bytes == null ? data.length : Clazz_instanceOf (bytes, String) ? (bytes).length : (bytes).length);
}if (!isCommand) return data;
if (showOnly) {
eval.showStringPrint (data, true);
return "";
}if (bytes != null && Clazz_instanceOf (bytes, String)) return this.writeMsg (bytes);
if (writeFileData) return this.writeMsg (this.vwr.writeFileData (fileName, type, 0, null));
if (type.equals ("SCENE")) bytes = sceneType;
 else if (bytes == null && (!isImage || fileName != null)) bytes = data;
if (timeMsg) JU.Logger.startTimer ("write");
if (isImage) {
eval.refresh (false);
if (width < 0) width = (is2D ? 250 : this.vwr.getScreenWidth ());
if (height < 0) height = (is2D ? 250 : this.vwr.getScreenHeight ());
}params =  new java.util.Hashtable ();
if (fileName != null) params.put ("fileName", fileName);
params.put ("backgroundColor", Integer.$valueOf (this.vwr.getBackgroundArgb ()));
params.put ("type", type);
if (is2D) {
params.put ("is2D", Boolean.TRUE);
var smiles;
var ret = "smiles could not be generated";
try {
smiles = this.vwr.getOpenSmiles (null);
if (smiles.length > 0) {
var fname = this.vwr.setLoadFormat ("_" + smiles, '2', false);
fname += "?width=" + width + "&height=" + height + "&format=" + type.toLowerCase ();
this.showString (fname);
ret = this.vwr.fm.getFileAsBytes (fname, null);
}} catch (e1) {
if (Clazz_exceptionOf (e1, Exception)) {
} else {
throw e1;
}
}
if (Clazz_instanceOf (ret, String)) {
this.showString (ret);
return null;
}bytes = ret;
}if (Clazz_instanceOf (bytes, String) && quality == -2147483648) params.put ("text", bytes);
 else if (Clazz_instanceOf (bytes, Array)) params.put ("bytes", bytes);
if (scripts != null) params.put ("scripts", scripts);
if (bsFrames != null) params.put ("bsFrames", bsFrames);
params.put ("fullPath", fullPath);
params.put ("quality", Integer.$valueOf (quality));
params.put ("width", Integer.$valueOf (width));
params.put ("height", Integer.$valueOf (height));
params.put ("nVibes", Integer.$valueOf (nVibes));
var ret = this.vwr.processWriteOrCapture (params);
if (ret == null) ret = "canceled";
if (isImage && ret.startsWith ("OK")) ret += "; width=" + width + "; height=" + height;
if (timeMsg) this.showString (JU.Logger.getTimerMsg ("write", 0));
return this.writeMsg (ret + (msg == null ? "" : msg));
}, "~A");
Clazz_defineMethod (c$, "prepareBinaryOutput", 
function (tvar) {
var m = tvar.getMap ();
if (m == null || !m.containsKey ("$_BINARY_$")) return null;
var v =  new JU.Lst ();
for (var e, $e = m.entrySet ().iterator (); $e.hasNext () && ((e = $e.next ()) || true);) {
var key = e.getKey ();
if (key.equals ("$_BINARY_$")) continue;
var o = e.getValue ();
var bytes = (o.tok == 15 ? (o.value).data : null);
if (bytes == null) {
var s = o.asString ();
bytes = (s.startsWith (";base64,") ? JU.Base64.decodeBase64 (s) : s.getBytes ());
}if (key.equals ("_DATA_")) {
v =  new JU.Lst ();
v.addLast (bytes);
return v;
} else if (key.equals ("_IMAGE_")) {
v.add (0, key);
v.add (1, null);
v.add (2, bytes);
} else {
v.addLast (key);
v.addLast (null);
v.addLast (bytes);
}}
return v;
}, "JS.SV");
Clazz_defineMethod (c$, "writeMsg", 
 function (msg) {
if (this.chk || msg == null) return "";
var isError = !msg.startsWith ("OK");
if (isError) {
this.e.evalError (msg, null);
{
alert(msg);
}}this.e.report (msg, isError);
return msg;
}, "~S");
Clazz_defineMethod (c$, "show", 
 function () {
var eval = this.e;
var value = null;
var str = this.paramAsStr (1);
var filter = null;
var filterLen = 0;
if (this.slen > 3 && this.tokAt (this.slen - 3) == 268435632 && this.tokAt (this.slen - 2) == 268435568) {
filter = "!/" + this.paramAsStr (this.slen - 1);
this.slen -= 3;
filterLen = 3;
} else if (this.slen > 2 && this.tokAt (this.slen - 2) == 268435632) {
filter = "/" + this.paramAsStr (this.slen - 1);
this.slen -= 2;
filterLen = 2;
} else if ((filter = this.paramAsStr (this.slen - 1)).lastIndexOf ("/") == 0) {
this.slen--;
filterLen = 1;
} else {
filter = null;
}var msg = null;
var name = null;
var len = 2;
var token = this.getToken (1);
var tok = (Clazz_instanceOf (token, JS.SV) && token.tok != 1073741824 ? 0 : token.tok);
if (tok == 4) {
token = JS.T.getTokenFromName (str.toLowerCase ());
if (token != null) tok = token.tok;
}if (tok != 1296041986 && tok != 1073742158 && tok != 1715472409 && tok != 1228935687) this.checkLength (-3);
if (this.slen == 2 && str.indexOf ("?") >= 0) {
msg = this.vwr.getAllSettings (str.substring (0, str.indexOf ("?")));
tok = -1;
}switch (tok) {
case -1:
break;
case 0:
if (!this.chk) msg = (eval.theToken).escape ();
break;
case 1073741925:
eval.checkLength23 ();
len = this.st.length;
if (!this.chk) {
var d = this.vwr.getModelInfo ("domains");
if (Clazz_instanceOf (d, JS.SV)) msg = this.vwr.getAnnotationInfo (d, eval.optParameterAsString (2), 1073741925);
 else msg = "domain information has not been loaded";
}break;
case 1715472409:
msg = this.plot (this.st);
len = this.st.length;
break;
case 1073742189:
eval.checkLength23 ();
len = this.st.length;
if (!this.chk) {
var d = this.vwr.getModelInfo ("validation");
if (Clazz_instanceOf (d, JS.SV)) msg = this.vwr.getAnnotationInfo (d, eval.optParameterAsString (2), 1073742189);
 else msg = "validation information has not been loaded";
}break;
case 134221829:
if (!this.chk) msg = JU.Escape.e (this.vwr.fm.cacheList ());
break;
case 1111490587:
eval.checkLength23 ();
len = this.st.length;
if (!this.chk) {
var d = this.vwr.getModelInfo ("dssr");
msg = (d == null ? "no DSSR information has been read" : len > 2 ? JS.SV.getVariable (this.vwr.extractProperty (d, this.stringParameter (2), -1)).asString () : "" + JS.SV.getVariable (d).asString ());
}break;
case 1073741915:
var version = 2;
if (this.slen == 3) version = (Clazz_floatToInt (this.floatParameter ((len = 3) - 1)));
 else this.checkLength (2 + filterLen);
if (!this.chk) msg = this.vwr.calculateStructures (null, true, false, version);
break;
case 545259572:
this.checkLength (2 + filterLen);
if (!this.chk) msg = this.vwr.fm.getPathForAllFiles ();
break;
case 1275203608:
if (!this.chk) {
var info =  new Array (2);
this.vwr.shm.getShapePropertyData (21, "allInfo", info);
msg = JS.SV.getVariable (info[1]).asString ();
}break;
case 1073742038:
{
if (!this.chk) this.vwr.getNMRPredict (eval.optParameterAsString (2));
return;
}case 1073741929:
case 1073741879:
case 134218757:
this.checkLength ((tok == 1073741879 || tok == 134218757 && this.tokAt (2) == 1073742335 ? len = 3 : 2) + filterLen);
if (this.chk) return;
var param2 = eval.optParameterAsString (2);
if (tok == 1073741879) {
if ("mf".equals (param2)) param2 = "formula";
if ("formula".equals (param2)) {
msg = this.vwr.getModelInfo ("formula");
if (msg != null) msg = JU.PT.rep (msg, " ", "");
}}if (msg == null) {
try {
if (tok != 134218757) {
msg = this.vwr.ms.getModelDataBaseName (this.vwr.bsA ());
if (msg != null && (msg.startsWith ("$") || msg.startsWith (":"))) {
msg = msg.substring (1);
} else {
msg = null;
}} else if (param2.equalsIgnoreCase ("true")) {
msg = this.vwr.getBioSmiles (null);
filter = null;
} else if (filter != null) {
msg = this.vwr.getSmilesOpt (null, -1, -1, 1, filter + "///");
filter = null;
}if (msg == null) {
var level = JU.Logger.getLogLevel ();
JU.Logger.setLogLevel (4);
msg = (tok == 134218757 ? this.vwr.getSmiles (null) : this.vwr.getOpenSmiles (null));
JU.Logger.setLogLevel (level);
}} catch (ex) {
if (Clazz_exceptionOf (ex, Exception)) {
msg = ex.getMessage ();
if (msg == null) {
msg = "";
}ex.printStackTrace ();
} else {
throw ex;
}
}
switch (tok) {
case 134218757:
break;
case 1073741929:
if (msg.length > 0) {
this.vwr.fm.loadImage (this.vwr.setLoadFormat ("_" + msg, '2', false), "\1" + msg, false);
return;
}msg = "Could not show drawing -- Either insufficient atoms are selected or the model is a PDB file.";
break;
case 1073741879:
len = 3;
if (msg.length > 0) {
msg = this.vwr.getChemicalInfo (msg, param2, this.vwr.bsA ());
if (msg.indexOf ("FileNotFound") >= 0) msg = "?";
} else {
msg = "Could not show name -- Either insufficient atoms are selected or the model is a PDB file.";
}}
}break;
case 134217764:
case 1296041986:
msg = "";
var info = null;
if ((len = this.slen) == 2) {
if (this.chk) break;
info = this.vwr.getSymTemp ().getSpaceGroupInfo (this.vwr.ms, null, -1, false, null);
} else if (tok == 134217764) {
var sg = this.paramAsStr (2);
len = 3;
if (this.chk) break;
info = this.vwr.getSymTemp ().getSpaceGroupInfo (this.vwr.ms, JU.PT.rep (sg, "''", "\""), -1, false, null);
}if (info != null) {
msg = (tok == 134217764 ? "" + info.get ("spaceGroupInfo") + info.get ("spaceGroupNote") : "") + info.get ("symmetryInfo");
break;
}var iop = (this.tokAt (2) == 2 ? this.intParameter (2) : 0);
var xyz = (this.tokAt (2) == 4 ? this.paramAsStr (2) : null);
var pt1 = null;
var pt2 = null;
var nth = -1;
if (this.slen > 3 && this.tokAt (3) != 4) {
var ret =  Clazz_newArray (-1, [null, this.vwr.getFrameAtoms ()]);
pt1 = eval.centerParameter (2 + (iop == 0 ? 0 : 1), ret);
if (ret[0] != null && ret[0].cardinality () == 0) {
len = this.slen;
break;
}ret[0] = null;
if (iop == 0) {
pt2 = eval.centerParameter (++eval.iToken, ret);
if (ret[0] != null && ret[0].cardinality () == 0) {
len = this.slen;
break;
}}if (this.tokAt (eval.iToken + 1) == 2) nth = eval.getToken (++eval.iToken).intValue;
}var type = (eval.iToken > 1 && this.tokAt (eval.iToken + 1) == 4 ? this.stringParameter (++eval.iToken) : null);
this.checkLength ((len = ++eval.iToken) + filterLen);
if (!this.chk) {
var o = this.vwr.getSymmetryInfo (this.vwr.getAllAtoms ().nextSetBit (0), xyz, iop, pt1, pt2, 0, type, 0, nth, 0);
msg = (Clazz_instanceOf (o, java.util.Map) ? JS.SV.getVariable (o).asString () : o.toString ());
}break;
case 1648363544:
var vdwType = null;
if (this.slen > 2) {
len = this.slen;
vdwType = J.c.VDW.getVdwType (this.paramAsStr (2));
if (vdwType == null) this.invArg ();
}if (!this.chk) msg = this.vwr.getDefaultVdwNameOrData (0, vdwType, null);
break;
case 134320141:
eval.checkLength23 ();
len = this.slen;
var s = eval.optParameterAsString (2);
var pt;
if (filter == null && (pt = s.indexOf ('/')) >= 0) {
filter = s.substring (pt + 1);
s = s.substring (0, pt);
}if (!this.chk) msg = this.vwr.getFunctionCalls (s);
break;
case 36867:
this.checkLength (2 + filterLen);
if (!this.chk) msg = this.vwr.getAllSettings (null);
break;
case 1073742166:
msg = this.vwr.getFrameTitle ();
break;
case 1073742184:
if ((len = this.slen) == 2) {
if (!this.chk) this.vwr.showUrl (eval.getFullPathName ());
} else {
name = this.paramAsStr (2);
if (!this.chk) this.vwr.showUrl (name);
}return;
case 1765808134:
str = "defaultColorScheme";
break;
case 1610612740:
str = "scaleAngstromsPerInch";
break;
case 134221850:
case 4138:
if (this.chk) return;
var modelIndex = this.vwr.am.cmi;
if (modelIndex < 0) eval.errorStr (30, "show " + eval.theToken.value);
msg = this.plot (this.st);
len = this.slen;
break;
case 14:
case 1112152078:
if (!this.chk) msg = this.getContext (false);
break;
case 1073741888:
name = eval.optParameterAsString (2);
if (name.length > 0) len = 3;
if (!this.chk) value = this.vwr.cm.getColorSchemeList (name);
break;
case 1073742192:
if (!this.chk) msg = this.vwr.getAtomDefs (this.vwr.definedAtomSets) + this.vwr.g.getVariableList () + this.getContext (true);
break;
case 536870926:
if (!this.chk) msg = this.vwr.getTrajectoryState ();
break;
case 553648146:
value = "" + JS.ScriptEval.commandHistoryLevelMax;
break;
case 553648149:
value = "" + JU.Logger.getLogLevel ();
break;
case 603979825:
value = "" + this.vwr.getBoolean (603979825);
break;
case 553648178:
msg = "set strandCountForStrands " + this.vwr.getStrandCount (12) + "; set strandCountForMeshRibbon " + this.vwr.getStrandCount (13);
break;
case 536875070:
msg = this.vwr.showTimeout ((len = this.slen) == 2 ? null : this.paramAsStr (2));
break;
case 536870918:
value = JU.Escape.eP (this.vwr.getDefaultLattice ());
break;
case 4126:
if (!this.chk) msg = this.vwr.getMinimizationInfo ();
break;
case 1611272194:
switch (this.vwr.g.axesMode) {
case 603979808:
msg = "set axesUnitcell";
break;
case 603979804:
msg = "set axesMolecular";
break;
default:
msg = "set axesWindow";
}
break;
case 1610612737:
msg = "set bondMode " + (this.vwr.getBoolean (603979812) ? "OR" : "AND");
break;
case 1649022989:
if (!this.chk) msg = "set strandCountForStrands " + this.vwr.getStrandCount (12) + "; set strandCountForMeshRibbon " + this.vwr.getStrandCount (13);
break;
case 1613238294:
msg = "set hbondsBackbone " + this.vwr.getBoolean (603979852) + ";set hbondsSolid " + this.vwr.getBoolean (603979854);
break;
case 1611141175:
if (!this.chk) msg = this.vwr.getSpinState ();
break;
case 1611141176:
msg = "set ssbondsBackbone " + this.vwr.getBoolean (603979952);
break;
case 1610625028:
case 1611141171:
msg = "selectionHalos " + (this.vwr.getSelectionHalosEnabled () ? "ON" : "OFF");
break;
case 1612709894:
msg = "set selectHetero " + this.vwr.getBoolean (1612709894);
break;
case 1073741828:
msg = JU.Escape.eAP (this.vwr.getAdditionalHydrogens (null, true, true, null));
break;
case 1612709900:
msg = "set selectHydrogens " + this.vwr.getBoolean (1612709900);
break;
case 553648130:
case 553648140:
case 536870924:
case 553648176:
case 553648172:
case 1073741995:
if (!this.chk) msg = this.vwr.getLightingState ();
break;
case 1073742136:
case 4146:
if (!this.chk) msg = this.vwr.stm.listSavedStates ();
break;
case 1814695966:
if (!this.chk) msg = this.vwr.getUnitCellInfoText ();
break;
case 1073742329:
if ((len = this.slen) == 2) {
if (!this.chk) msg = this.vwr.getCoordinateState (this.vwr.bsA ());
break;
}var nameC = this.paramAsStr (2);
if (!this.chk) msg = this.vwr.stm.getSavedCoordinates (nameC);
break;
case 1073742158:
if (!this.chk && eval.outputBuffer == null) this.vwr.sm.clearConsole ();
if ((len = this.slen) == 2) {
if (!this.chk) msg = this.vwr.getStateInfo ();
break;
}if (filter != null && this.slen == 3) {
if (!this.chk) msg = this.vwr.getStateInfo ();
break;
} else if (this.tokAt (2) == 1228935687 && (len = this.slen) == 4) {
if (!this.chk) msg = this.vwr.fm.getEmbeddedFileState (this.paramAsStr (3), true, "state.spt");
break;
}len = 3;
name = this.paramAsStr (2);
if (!this.chk) msg = this.vwr.stm.getSavedState (name);
break;
case 1639976963:
if ((len = this.slen) == 2) {
if (!this.chk) msg = this.vwr.ms.getProteinStructureState (this.vwr.bsA (), 134222350);
break;
}var shape = this.paramAsStr (2);
if (!this.chk) msg = this.vwr.stm.getSavedStructure (shape);
break;
case 134221834:
var dtype = ((len = this.slen) == 3 ? this.paramAsStr (2) : null);
if (!this.chk) {
var data = this.vwr.getDataObj (dtype, null, -2);
msg = (data == null ? "no data" : JU.Escape.encapsulateData (data[0], data[1], (data[3]).intValue ()));
}break;
case 1073742330:
len = 3;
msg = eval.setObjectProperty ();
break;
case 1678381065:
if (!this.chk) {
msg = this.vwr.ms.getBoundBoxCommand (true);
}break;
case 12289:
if (!this.chk) msg = "center " + JU.Escape.eP (this.vwr.tm.fixedRotationCenter);
break;
case 135176:
if (!this.chk) msg = this.getShapeProperty (22, "command");
break;
case 1228935687:
if (this.slen == 2) {
if (!this.chk) {
if (filter == null) this.vwr.sm.clearConsole ();
msg = this.vwr.getCurrentFileAsString ("script");
}if (msg == null) msg = "<unavailable>";
break;
}len = 3;
value = this.paramAsStr (2);
if (!this.chk) {
if (filter == null) this.vwr.sm.clearConsole ();
msg = this.vwr.getFileAsString3 (value, true, null);
}break;
case 4115:
if (this.tokAt (2) == 1073742327 && (len = 3) > 0) msg = this.vwr.getModelFileInfoAll ();
 else msg = this.vwr.getModelFileInfo ();
break;
case 1610616855:
var n = ((len = this.slen) == 2 ? 2147483647 : this.intParameter (2));
if (n < 1) this.invArg ();
if (!this.chk) {
this.vwr.sm.clearConsole ();
if (eval.scriptLevel == 0) this.vwr.removeCommand ();
msg = this.vwr.getSetHistory (n);
}break;
case 135180:
if (!this.chk) msg = this.getShapeProperty (24, "jvxlDataXml");
break;
case 1073877011:
case 1073877010:
if (eval.optParameterAsString (2).equalsIgnoreCase ("list")) {
this.e.sm.loadShape (27);
msg = (this.chk ? "" : this.getShapeProperty (27, "list -1"));
len = 3;
} else {
var ptMO = ((len = this.slen) == 2 ? -2147483648 : this.intParameter (2));
if (!this.chk) msg = this.getMoJvxl (ptMO, tok == 1073877011);
}break;
case 1094717454:
if (!this.chk) msg = this.vwr.ms.getModelInfoAsString ();
break;
case 537006096:
if (!this.chk) msg = this.vwr.getMeasurementInfoAsString ();
break;
case 1073741864:
len = 3;
if (!this.chk && this.slen == len) {
msg = this.paramAsStr (2);
msg = this.vwr.getOrientationText (JS.T.getTokFromName (msg.equals ("box") ? "volume" : msg.equals ("rotation") ? "best" : msg), "best", null).toString ();
}break;
case 1073742132:
tok = this.tokAt (2);
if (tok == 0) tok = 1073742132;
 else len = 3;
case 1073742178:
case 4129:
if (!this.chk) msg = this.vwr.getOrientationText (tok, null, null).toString ();
break;
case 1073742077:
len = 2;
if (this.slen > 3) break;
switch (tok = this.tokAt (2)) {
case 1073742178:
case 1073742132:
case 4129:
case 0:
if (!this.chk) msg = this.vwr.getOrientationText (tok, null, null).toString ();
break;
default:
name = eval.optParameterAsString (2);
msg = this.vwr.getOrientationText (1073742034, name, null).toString ();
}
len = this.slen;
break;
case 1073742088:
if (!this.chk) msg = this.vwr.ms.getPDBHeader (this.vwr.am.cmi);
break;
case 134217762:
var typ = eval.optParameterAsString (2);
if (typ.length == 0) typ = null;
len = this.slen;
if (!this.chk) msg = this.vwr.ms.getPointGroupAsString (this.vwr.bsA (), "show:" + typ, 0, 0, null, null, null);
break;
case 1088421903:
if (!this.chk) msg = this.vwr.ms.getSymmetryInfoAsString ();
break;
case 1073742176:
if (!this.chk) msg = "transform:\n" + this.vwr.tm.matrixRotate.toString ();
break;
case 4168:
msg = "zoom " + (this.vwr.tm.zoomEnabled ? ("" + this.vwr.tm.getZoomSetting ()) : "off");
break;
case 1611272202:
msg = (this.vwr.getShowFrank () ? "frank ON" : "frank OFF");
break;
case 1665140738:
str = "solventProbeRadius";
break;
case 1086324744:
if ((len = this.slen) == 3 && this.tokAt (2) == 1073742334) tok = 1086324743;
case 1073741863:
case 1086326788:
case 1073742120:
case 1113589787:
case 1086324742:
case 1140850689:
case 1073741982:
if (!this.chk) msg = this.vwr.getChimeInfo (tok);
break;
case 537022465:
case 1610612738:
case 20482:
case 1612709912:
value = "?";
break;
case 1073742030:
var qualifiers = ((len = this.slen) == 2 ? null : this.paramAsStr (2));
if (!this.chk) msg = this.vwr.getBindingInfo (qualifiers);
break;
case 1073742015:
if (!this.chk) value = this.vwr.getMenu ("");
break;
case 1073741824:
if (str.equalsIgnoreCase ("fileHeader")) {
if (!this.chk) msg = this.vwr.ms.getPDBHeader (this.vwr.am.cmi);
}break;
case 1073741992:
case 36868:
str = this.paramAsStr (len++);
var v = eval.getParameter (str, 1073742190, true);
if (!this.chk) if (tok == 1073741992) {
msg = v.toJSON ();
} else {
msg = v.escape ();
}break;
}
this.checkLength (len + filterLen);
if (this.chk) return;
if (msg != null) this.showString (this.filterShow (msg, filter));
 else if (value != null) this.showString (str + " = " + value);
 else if (str != null) {
if (str.indexOf (" ") >= 0) this.showString (str);
 else this.showString (str + " = " + (eval.getParameter (str, 1073742190, true)).escape ());
}});
Clazz_defineMethod (c$, "filterShow", 
 function (msg, name) {
if (name == null) return msg;
var isNot = name.startsWith ("!/");
name = name.substring (isNot ? 2 : 1).toLowerCase ();
var info = JU.PT.split (msg, "\n");
var sb =  new JU.SB ();
for (var i = 0; i < info.length; i++) if ((info[i].toLowerCase ().indexOf (name) < 0) == isNot) sb.append (info[i]).appendC ('\n');

return sb.toString ();
}, "~S,~S");
Clazz_defineMethod (c$, "stereo", 
 function () {
var stereoMode = J.c.STER.DOUBLE;
var degrees = -5;
var degreesSeen = false;
var colors = null;
var colorpt = 0;
for (var i = 1; i < this.slen; ++i) {
if (this.e.isColorParam (i)) {
if (colorpt > 1) this.e.bad ();
if (colorpt == 0) colors =  Clazz_newIntArray (2, 0);
if (!degreesSeen) degrees = 3;
colors[colorpt] = this.e.getArgbParam (i);
if (colorpt++ == 0) colors[1] = ~colors[0];
i = this.e.iToken;
continue;
}switch (this.getToken (i).tok) {
case 1073742335:
this.e.checkLast (this.e.iToken = 1);
this.e.iToken = 1;
break;
case 1073742334:
this.e.checkLast (this.e.iToken = 1);
stereoMode = J.c.STER.NONE;
break;
case 2:
case 3:
degrees = this.floatParameter (i);
degreesSeen = true;
break;
case 1073741824:
if (!degreesSeen) degrees = 3;
stereoMode = J.c.STER.getStereoMode (this.paramAsStr (i));
if (stereoMode != null) break;
default:
this.invArg ();
}
}
if (this.chk) return;
this.vwr.setStereoMode (colors, stereoMode, degrees);
});
Clazz_defineMethod (c$, "struts", 
 function () {
var eval = this.e;
var defOn = (this.tokAt (1) == 1073742072 || this.tokAt (1) == 1073742335 || this.slen == 1);
var mad = eval.getMadParameter ();
if (mad == 2147483647) return false;
if (defOn) mad = Math.round (this.vwr.getFloat (570425406) * 2000);
this.setShapeProperty (1, "type", Integer.$valueOf (32768));
eval.setShapeSizeBs (1, mad, null);
this.setShapeProperty (1, "type", Integer.$valueOf (1023));
return true;
});
Clazz_defineMethod (c$, "unitcell", 
 function (i) {
var eval = this.e;
var icell = 2147483647;
var mad10 = 2147483647;
var pt = null;
var tickInfo = eval.tickParamAsStr (i, true, false, false);
i = eval.iToken;
var id = null;
var oabc = null;
var newUC = null;
var ucname = null;
var isOffset = false;
var isReset = false;
var tok = this.tokAt (++i);
switch (tok) {
case 4142:
case 4141:
isReset = true;
pt = JU.P4.new4 (0, 0, 0, -1);
eval.iToken++;
break;
case 4:
case 1073741824:
var s = this.paramAsStr (i).toLowerCase ();
ucname = s;
if (s.indexOf (",") >= 0 || this.chk) {
newUC = s;
break;
}var stype = null;
eval.setCurrentCagePts (null, null);
newUC = this.vwr.getModelInfo ("unitcell_conventional");
if (JU.PT.isOneOf (ucname, ";parent;standard;primitive;")) {
if (newUC == null && this.vwr.getModelInfo ("isprimitive") != null) {
this.showString ("Cannot convert unit cell when file data is primitive and have no lattice information");
return;
}if (ucname.equals ("primitive") && this.tokAt (i + 1) == 4) stype = this.paramAsStr (++i).toUpperCase ();
}if (Clazz_instanceOf (newUC, Array)) {
oabc = newUC;
}if (stype == null) stype = this.vwr.getModelInfo ("latticeType");
if (newUC != null) eval.setCurrentCagePts (this.vwr.getV0abc (newUC), "" + newUC);
if (!ucname.equals ("conventional")) {
s = this.vwr.getModelInfo ("unitcell_" + ucname);
if (s == null) {
var isPrimitive = ucname.equals ("primitive");
if (isPrimitive || ucname.equals ("reciprocal")) {
var scale = (this.slen == i + 1 ? 1 : this.tokAt (i + 1) == 2 ? this.intParameter (++i) * 3.141592653589793 : this.floatParameter (++i));
var u = this.vwr.getCurrentUnitCell ();
ucname = (u == null ? "" : u.getSpaceGroupName () + " ") + ucname;
oabc = (u == null ?  Clazz_newArray (-1, [JU.P3.new3 (0, 0, 0), JU.P3.new3 (1, 0, 0), JU.P3.new3 (0, 1, 0), JU.P3.new3 (0, 0, 1)]) : u.getUnitCellVectors ());
if (stype == null) stype = this.vwr.getSymmetryInfo (this.vwr.getFrameAtoms ().nextSetBit (0), null, 0, null, null, 1073741994, null, 0, -1, 0);
if (u == null) u = this.vwr.getSymTemp ();
u.toFromPrimitive (true, stype.length == 0 ? 'P' : stype.charAt (0), oabc, this.vwr.getCurrentModelAuxInfo ().get ("primitiveToCrystal"));
if (!isPrimitive) {
JU.SimpleUnitCell.getReciprocal (oabc, oabc, scale);
}break;
}} else {
ucname = s;
if (s.indexOf (",") >= 0) newUC = s;
}this.showString (ucname);
}break;
case 135180:
case 1073742330:
id = eval.objectNameParameter (++i);
break;
case 1678381065:
var o = JU.P3.newP (this.vwr.getBoundBoxCenter ());
pt = this.vwr.getBoundBoxCornerVector ();
o.sub (pt);
oabc =  Clazz_newArray (-1, [o, JU.P3.new3 (pt.x * 2, 0, 0), JU.P3.new3 (0, pt.y * 2, 0), JU.P3.new3 (0, 0, pt.z * 2)]);
pt = null;
eval.iToken = i;
break;
case 1073742176:
if (this.tokAt (++i) != 12) this.invArg ();
newUC =  Clazz_newArray (-1, [this.getToken (i).value]);
break;
case 11:
case 12:
newUC = this.getToken (i).value;
break;
case 12289:
switch (this.tokAt (++i)) {
case 12290:
case 10:
case 1073742325:
pt = this.vwr.ms.getAtomSetCenter (this.atomExpressionAt (i));
this.vwr.toFractional (pt, true);
i = eval.iToken;
break;
default:
if (eval.isCenterParameter (i)) {
pt = this.centerParameter (i);
i = eval.iToken;
break;
}this.invArg ();
}
pt.x -= 0.5;
pt.y -= 0.5;
pt.z -= 0.5;
break;
case 12290:
case 10:
case 1073742325:
var iAtom = this.atomExpressionAt (i).nextSetBit (0);
if (!this.chk) this.vwr.am.cai = iAtom;
if (iAtom < 0) return;
i = eval.iToken;
break;
case 1073742066:
isOffset = true;
case 1073742114:
pt = eval.getPointOrPlane (++i, false, true, false, true, 3, 3, true);
pt = JU.P4.new4 (pt.x, pt.y, pt.z, (isOffset ? 1 : 0));
i = eval.iToken;
break;
case 3:
case 2:
var f = this.floatParameter (i);
if (f < 111) {
i--;
break;
}icell = this.intParameter (i);
break;
default:
if (eval.isArrayParameter (i)) {
oabc = eval.getPointArray (i, 4, false);
i = eval.iToken;
} else if (this.slen > i + 1) {
pt = eval.getPointOrPlane (i, false, true, false, true, 3, 3, true);
i = eval.iToken;
} else {
i--;
}}
mad10 = eval.getSetAxesTypeMad10 (++i);
eval.checkLast (eval.iToken);
if (this.chk || mad10 == 2147483647) return;
if (mad10 == 2147483647) this.vwr.am.cai = -1;
if (oabc == null && newUC != null) oabc = this.vwr.getV0abc (newUC);
if (icell != 2147483647) this.vwr.ms.setUnitCellOffset (this.vwr.getCurrentUnitCell (), null, icell);
 else if (id != null) this.vwr.setCurrentCage (id);
 else if (isReset || oabc != null) eval.setCurrentCagePts (oabc, ucname);
eval.setObjectMad10 (33, "unitCell", mad10);
if (pt != null) this.vwr.ms.setUnitCellOffset (this.vwr.getCurrentUnitCell (), pt, 0);
if (tickInfo != null) this.setShapeProperty (33, "tickInfo", tickInfo);
}, "~N");
Clazz_defineMethod (c$, "assign", 
 function (i) {
var atomsOrBonds = this.tokAt (i++);
var index = -1;
var index2 = -1;
if (atomsOrBonds == 1140850689 && this.tokAt (i) == 4) {
this.e.iToken++;
} else {
index = this.atomExpressionAt (i).nextSetBit (0);
if (index < 0) {
return;
}}var type = null;
if (atomsOrBonds == 4106) {
index2 = this.atomExpressionAt (++this.e.iToken).nextSetBit (0);
} else {
type = this.paramAsStr (++this.e.iToken);
}var pt = (++this.e.iToken < this.slen ? this.centerParameter (this.e.iToken) : null);
if (this.chk) return;
this.vwr.pushState ();
switch (atomsOrBonds) {
case 1140850689:
this.e.clearDefinedVariableAtomSets ();
this.assignAtom (index, pt, type);
break;
case 1677721602:
this.assignBond (index, (type + "p").charAt (0));
break;
case 4106:
this.assignConnect (index, index2);
}
}, "~N");
Clazz_defineMethod (c$, "assignAtom", 
 function (atomIndex, pt, type) {
if (type.equals ("X")) this.vwr.setModelKitRotateBondIndex (-1);
if (atomIndex >= 0 && this.vwr.ms.at[atomIndex].mi != this.vwr.ms.mc - 1) return;
this.vwr.clearModelDependentObjects ();
var ac = this.vwr.ms.ac;
if (pt == null) {
if (atomIndex < 0) return;
this.vwr.sm.modifySend (atomIndex, this.vwr.ms.at[atomIndex].mi, 1, this.e.fullCommand);
this.vwr.setModelkitProperty ("assignAtom",  Clazz_newArray (-1, [type,  Clazz_newIntArray (-1, [atomIndex, 1, 1])]));
if (!JU.PT.isOneOf (type, ";Mi;Pl;X;")) this.vwr.ms.setAtomNamesAndNumbers (atomIndex, -ac, null);
this.vwr.sm.modifySend (atomIndex, this.vwr.ms.at[atomIndex].mi, -1, "OK");
this.vwr.refresh (3, "assignAtom");
return;
}var atom = (atomIndex < 0 ? null : this.vwr.ms.at[atomIndex]);
var bs = (atomIndex < 0 ?  new JU.BS () : JU.BSUtil.newAndSetBit (atomIndex));
var pts =  Clazz_newArray (-1, [pt]);
var vConnections =  new JU.Lst ();
var modelIndex = -1;
if (atom != null) {
vConnections.addLast (atom);
modelIndex = atom.mi;
this.vwr.sm.modifySend (atomIndex, modelIndex, 3, this.e.fullCommand);
}try {
bs = this.vwr.addHydrogensInline (bs, vConnections, pts);
var atomIndex2 = bs.nextSetBit (0);
this.vwr.setModelkitProperty ("assignAtom",  Clazz_newArray (-1, [type,  Clazz_newIntArray (-1, [atomIndex2, -1, atomIndex])]));
atomIndex = atomIndex2;
} catch (ex) {
if (Clazz_exceptionOf (ex, Exception)) {
} else {
throw ex;
}
}
this.vwr.ms.setAtomNamesAndNumbers (atomIndex, -ac, null);
this.vwr.sm.modifySend (atomIndex, modelIndex, -3, "OK");
}, "~N,JU.P3,~S");
Clazz_defineMethod (c$, "assignBond", 
 function (bondIndex, type) {
var modelIndex = -1;
try {
modelIndex = this.vwr.ms.bo[bondIndex].atom1.mi;
this.vwr.sm.modifySend (bondIndex, modelIndex, 2, this.e.fullCommand);
var bsAtoms = this.vwr.setModelkitProperty ("assignBond",  Clazz_newIntArray (-1, [bondIndex, type]));
if (bsAtoms == null || type == '0') this.vwr.refresh (3, "setBondOrder");
this.vwr.sm.modifySend (bondIndex, modelIndex, -2, "" + type);
} catch (ex) {
if (Clazz_exceptionOf (ex, Exception)) {
JU.Logger.error ("assignBond failed");
this.vwr.sm.modifySend (bondIndex, modelIndex, -2, "ERROR " + ex);
} else {
throw ex;
}
}
}, "~N,~S");
Clazz_defineMethod (c$, "assignConnect", 
 function (index, index2) {
this.vwr.clearModelDependentObjects ();
var connections = JU.AU.newFloat2 (1);
connections[0] =  Clazz_newFloatArray (-1, [index, index2]);
var modelIndex = this.vwr.ms.at[index].mi;
this.vwr.sm.modifySend (index, modelIndex, 2, this.e.fullCommand);
this.vwr.ms.connect (connections);
this.vwr.setModelkitProperty ("assignAtom",  Clazz_newArray (-1, [".",  Clazz_newIntArray (-1, [index, 1, 1])]));
this.vwr.setModelkitProperty ("assignAtom",  Clazz_newArray (-1, [".",  Clazz_newIntArray (-1, [index2, 1, 1])]));
this.vwr.sm.modifySend (index, modelIndex, -2, "OK");
this.vwr.refresh (3, "assignConnect");
}, "~N,~N");
Clazz_defineMethod (c$, "getContext", 
 function (withVariables) {
var sb =  new JU.SB ();
var context = this.e.thisContext;
while (context != null) {
if (withVariables) {
if (context.vars != null) {
sb.append (this.getScriptID (context));
sb.append (JV.StateManager.getVariableList (context.vars, 80, true, false));
}} else {
sb.append (JS.ScriptError.getErrorLineMessage (context.functionName, context.scriptFileName, this.e.getLinenumber (context), context.pc, JS.ScriptEval.statementAsString (this.vwr, context.statement, -9999, this.e.debugHigh)));
}context = context.parentContext;
}
if (withVariables) {
if (this.e.contextVariables != null) {
sb.append (this.getScriptID (null));
sb.append (JV.StateManager.getVariableList (this.e.contextVariables, 80, true, false));
}} else {
sb.append (this.e.getErrorLineMessage2 ());
}return sb.toString ();
}, "~B");
Clazz_defineMethod (c$, "getIsosurfaceJvxl", 
 function (iShape, type) {
type = (type === "PMESH" || type === "MESH" ? "jvxlMeshX" : type === "ISOMESH" ? "pmesh" : type === "ISOMESHBIN" || type === "PMB" ? "pmeshbin" : "jvxlDataXml");
return (this.chk ? "" : this.getShapeProperty (iShape, type));
}, "~N,~S");
Clazz_defineMethod (c$, "getMoJvxl", 
 function (ptMO, isNBO) {
var iShape = (isNBO ? 28 : 27);
this.e.sm.loadShape (iShape);
var modelIndex = this.vwr.am.cmi;
if (modelIndex < 0) this.e.errorStr (30, "show/write MO/NBO");
var moData = this.vwr.ms.getInfo (modelIndex, "moData");
if (moData == null) this.error (27);
var n = this.getShapeProperty (iShape, "moNumber");
if (n == null || n.intValue () == 0) this.setShapeProperty (iShape, "init", Integer.$valueOf (modelIndex));
this.setShapeProperty (iShape, "moData", moData);
return this.e.sm.getShapePropertyIndex (iShape, "showMO", ptMO);
}, "~N,~B");
Clazz_defineMethod (c$, "getScriptID", 
 function (context) {
var fuName = (context == null ? this.e.functionName : "function " + context.functionName);
var fiName = (context == null ? this.e.scriptFileName : context.scriptFileName);
return "\n# " + fuName + " (file " + fiName + (context == null ? "" : " context " + context.id) + ")\n";
}, "JS.ScriptContext");
Clazz_defineMethod (c$, "tokenAt", 
 function (i, args) {
return (i < args.length ? args[i] : null);
}, "~N,~A");
c$.tokAtArray = Clazz_defineMethod (c$, "tokAtArray", 
 function (i, args) {
return (i < args.length && args[i] != null ? args[i].tok : 0);
}, "~N,~A");
Clazz_defineMethod (c$, "getPlotMinMax", 
 function (data, isMax, tok) {
if (data == null) return 0;
switch (tok) {
case 1111490568:
case 1111490569:
case 1111490570:
return (isMax ? 180 : -180);
case 1111490565:
case 1111490576:
return (isMax ? 360 : 0);
case 1111490574:
return (isMax ? 1 : -1);
}
var fmax = (isMax ? -1.0E10 : 1E10);
for (var i = data.length; --i >= 0; ) {
var f = data[i];
if (Float.isNaN (f)) continue;
if (isMax == (f > fmax)) fmax = f;
}
return fmax;
}, "~A,~B,~N");
Clazz_defineMethod (c$, "parseDataArray", 
 function (str, is3D) {
str = JU.Parser.fixDataString (str);
var lines = JU.Parser.markLines (str, '\n');
var nLines = lines.length;
if (!is3D) {
var data = JU.AU.newFloat2 (nLines);
for (var iLine = 0, pt = 0; iLine < nLines; pt = lines[iLine++]) {
var tokens = JU.PT.getTokens (str.substring (pt, lines[iLine]));
JU.PT.parseFloatArrayData (tokens, data[iLine] =  Clazz_newFloatArray (tokens.length, 0));
}
return data;
}var tokens = JU.PT.getTokens (str.substring (0, lines[0]));
if (tokens.length != 3) return  Clazz_newFloatArray (0, 0, 0, 0);
var nX = JU.PT.parseInt (tokens[0]);
var nY = JU.PT.parseInt (tokens[1]);
var nZ = JU.PT.parseInt (tokens[2]);
if (nX < 1 || nY < 1 || nZ < 1) return  Clazz_newFloatArray (1, 1, 1, 0);
var data = JU.AU.newFloat3 (nX, nY);
var iX = 0;
var iY = 0;
for (var iLine = 1, pt = lines[0]; iLine < nLines && iX < nX; pt = lines[iLine++]) {
tokens = JU.PT.getTokens (str.substring (pt, lines[iLine]));
if (tokens.length < nZ) continue;
JU.PT.parseFloatArrayData (tokens, data[iX][iY] =  Clazz_newFloatArray (tokens.length, 0));
if (++iY == nY) {
iX++;
iY = 0;
}}
if (iX != nX) {
System.out.println ("Error reading 3D data -- nX = " + nX + ", but only " + iX + " blocks read");
return  Clazz_newFloatArray (1, 1, 1, 0);
}return data;
}, "~S,~B");
Clazz_defineMethod (c$, "getBitsetPropertyFloat", 
function (bs, tok, property, min, max) {
var odata = (property == null || tok == (1111490843) ? this.e.getBitsetProperty (bs, null, tok, null, null, property, null, false, 2147483647, false) : this.vwr.getDataObj (property, bs, 1));
if (odata == null || !JU.AU.isAF (odata)) return (bs == null ? null :  Clazz_newFloatArray (bs.cardinality (), 0));
var data = odata;
if (!Float.isNaN (min)) for (var i = 0; i < data.length; i++) if (data[i] < min) data[i] = NaN;

if (!Float.isNaN (max)) for (var i = 0; i < data.length; i++) if (data[i] > max) data[i] = NaN;

return data;
}, "JU.BS,~N,~S,~N,~N");
Clazz_defineStatics (c$,
"ERROR_invalidArgument", 22);
});
})(Clazz
,Clazz.getClassName
,Clazz.newLongArray
,Clazz.doubleToByte
,Clazz.doubleToInt
,Clazz.doubleToLong
,Clazz.declarePackage
,Clazz.instanceOf
,Clazz.load
,Clazz.instantialize
,Clazz.decorateAsClass
,Clazz.floatToInt
,Clazz.floatToLong
,Clazz.makeConstructor
,Clazz.defineEnumConstant
,Clazz.exceptionOf
,Clazz.newIntArray
,Clazz.defineStatics
,Clazz.newFloatArray
,Clazz.declareType
,Clazz.prepareFields
,Clazz.superConstructor
,Clazz.newByteArray
,Clazz.declareInterface
,Clazz.p0p
,Clazz.pu$h
,Clazz.newShortArray
,Clazz.innerTypeInstance
,Clazz.isClassDefined
,Clazz.prepareCallback
,Clazz.newArray
,Clazz.castNullAs
,Clazz.floatToShort
,Clazz.superCall
,Clazz.decorateAsType
,Clazz.newBooleanArray
,Clazz.newCharArray
,Clazz.implementOf
,Clazz.newDoubleArray
,Clazz.overrideConstructor
,Clazz.clone
,Clazz.doubleToShort
,Clazz.getInheritedLevel
,Clazz.getParamsType
,Clazz.isAF
,Clazz.isAB
,Clazz.isAI
,Clazz.isAS
,Clazz.isASS
,Clazz.isAP
,Clazz.isAFloat
,Clazz.isAII
,Clazz.isAFF
,Clazz.isAFFF
,Clazz.tryToSearchAndExecute
,Clazz.getStackTrace
,Clazz.inheritArgs
,Clazz.alert
,Clazz.defineMethod
,Clazz.overrideMethod
,Clazz.declareAnonymous
//,Clazz.checkPrivateMethod
,Clazz.cloneFinals
);
