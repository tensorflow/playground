Clazz.declarePackage ("JS");
Clazz.load (["JS.ScriptParam"], "JS.ScriptExpr", ["java.lang.Boolean", "$.Float", "java.util.Hashtable", "$.Map", "JU.BArray", "$.BS", "$.CU", "$.Lst", "$.M34", "$.M4", "$.Measure", "$.P3", "$.P4", "$.PT", "$.SB", "J.api.Interface", "JM.BondSet", "$.Group", "$.ModelSet", "JS.SV", "$.ScriptContext", "$.ScriptMathProcessor", "$.T", "JU.BSUtil", "$.Elements", "$.Escape"], function () {
c$ = Clazz.decorateAsClass (function () {
this.debugHigh = false;
this.cmdExt = null;
this.isoExt = null;
this.mathExt = null;
this.smilesExt = null;
this.tempStatement = null;
this.ptTemp = null;
Clazz.instantialize (this, arguments);
}, JS, "ScriptExpr", JS.ScriptParam);
Clazz.defineMethod (c$, "getCmdExt", 
function () {
return (this.cmdExt == null ? this.cmdExt = (this.getExt ("Cmd")).init (this) : this.cmdExt);
});
Clazz.defineMethod (c$, "getIsoExt", 
function () {
return (this.isoExt == null ? this.isoExt = (this.getExt ("Iso")).init (this) : this.isoExt);
});
Clazz.defineMethod (c$, "getMathExt", 
function () {
return (this.mathExt == null ? (this.mathExt = this.getExt ("Math")).init (this) : this.mathExt);
});
Clazz.defineMethod (c$, "getSmilesExt", 
function () {
return (this.smilesExt == null ? (this.smilesExt = this.getExt ("Smiles")).init (this) : this.smilesExt);
});
Clazz.defineMethod (c$, "getExt", 
 function (type) {
return J.api.Interface.getInterface ("JS." + type + "Ext", this.vwr, "script");
}, "~S");
Clazz.defineMethod (c$, "parameterExpressionList", 
function (pt, ptAtom, isArrayItem) {
return this.parameterExpression (pt, -1, null, true, true, ptAtom, isArrayItem, null, null, false);
}, "~N,~N,~B");
Clazz.defineMethod (c$, "parameterExpressionString", 
function (pt, ptMax) {
return this.parameterExpression (pt, ptMax, "", true, false, -1, false, null, null, false);
}, "~N,~N");
Clazz.defineMethod (c$, "parameterExpressionBoolean", 
function (pt, ptMax) {
return (this.parameterExpression (pt, ptMax, null, true, false, -1, false, null, null, false)).booleanValue ();
}, "~N,~N");
Clazz.defineMethod (c$, "parameterExpressionToken", 
function (pt) {
var result = this.parameterExpressionList (pt, -1, false);
return (result.size () > 0 ? result.get (0) : JS.SV.newS (""));
}, "~N");
Clazz.defineMethod (c$, "parameterExpressionSelect", 
function (h, where) {
this.st = where;
this.slen = this.st.length;
return (this.parameterExpression (2, -2147483648, null, true, false, -1, false, h, null, false)).booleanValue ();
}, "java.util.Map,~A");
Clazz.defineMethod (c$, "parameterExpression", 
 function (pt, ptMax, key, ignoreComma, asVector, ptAtom, isArrayItem, localVars, localVar, isSpecialAssignment) {
var isImplicitAtomProperty = (localVar != null);
var isWhere = (localVar == null && localVars != null);
var isOneExpressionOnly = (pt < 0);
var returnBoolean = (!asVector && key == null);
var returnString = (!asVector && key != null && key.length == 0);
if (isOneExpressionOnly) pt = -pt;
var allContext = (localVars == null || ptMax != -2147483648);
if (ptMax < pt) ptMax = this.slen;
var ptEq = (isSpecialAssignment ? 0 : 1);
var ptWithin = -1;
var rpn =  new JS.ScriptMathProcessor (this, isSpecialAssignment, isArrayItem, asVector, false, false, key);
var v;
var res;
var nSquare = 0;
var nParen = 0;
var topLevel = true;
out : for (var i = pt; i < ptMax; i++) {
v = null;
var tok = this.getToken (i).tok;
if (isImplicitAtomProperty && this.tokAt (i + 1) != 1073742336) {
var token = (localVars != null && localVars.containsKey (this.theToken.value) ? null : this.getBitsetPropertySelector (i, 10));
if (token != null) {
rpn.addX (localVars.get (localVar));
if (!rpn.addOpAllowMath (token, (this.tokAt (i + 1) == 268435472), 0)) this.invArg ();
if ((token.intValue == 134320141 || token.intValue == 102436) && this.tokAt (this.iToken + 1) != 268435472) {
rpn.addOp (JS.T.tokenLeftParen);
rpn.addOp (JS.T.tokenRightParen);
}i = this.iToken;
continue;
}}switch (tok) {
case 268435521:
case 1073742338:
if (!ignoreComma && topLevel) break out;
if (tok == 1073742338) this.invArg ();
if (isSpecialAssignment && nSquare == 1 && this.tokAt (i + 1) == 268435860) isSpecialAssignment = rpn.endAssignment ();
}
switch (tok) {
case 12290:
if ((tok = this.tokAt (++i)) == 1073742325) {
v = this.parameterExpressionToken (++i);
i = this.iToken;
} else if (tok == 2) {
v = this.vwr.ms.getAtoms (1094715393, Integer.$valueOf (this.st[i].intValue));
break;
} else if (tok == 12290 && this.tokAt (i + 1) == 2) {
v = this.vwr.ms.getAtomsFromAtomNumberInFrame (this.st[++i].intValue);
break;
} else {
v = this.getParameter (JS.SV.sValue (this.st[i]), 1073742190, true);
}v = this.getParameter ((v).asString (), 1073742190, true);
break;
case 134320649:
if (this.getToken (++i).tok != 268435472) this.invArg ();
if (localVars == null) localVars =  new java.util.Hashtable ();
res = this.parameterExpression (++i, -1, null, ignoreComma, false, -1, false, localVars, localVar, false);
var TF = (res).booleanValue ();
var iT = this.iToken;
if (this.getToken (iT++).tok != 1073742339) this.invArg ();
this.parameterExpressionBoolean (iT, -1);
var iF = this.iToken;
if (this.tokAt (iF++) != 1073742339) this.invArg ();
this.parameterExpression (-iF, -1, null, ignoreComma, false, 1, false, localVars, localVar, false);
var iEnd = this.iToken;
if (this.tokAt (iEnd) != 268435473) this.invArg ();
v = this.parameterExpression (TF ? iT : iF, TF ? iF : iEnd, "XXX", ignoreComma, false, 1, false, localVars, localVar, false);
i = this.iToken = iEnd;
break;
case 134320648:
case 1275082245:
var isFunctionOfX = (pt > 0);
var isFor = (isFunctionOfX && tok == 134320648);
var dummy;
if (isFunctionOfX) {
if (this.getToken (++i).tok != 268435472 || !JS.T.tokAttr (this.getToken (++i).tok, 1073741824)) this.invArg ();
dummy = this.paramAsStr (i);
if (this.getToken (++i).tok != 1073742339) this.invArg ();
} else {
dummy = "_x";
}v = this.parameterExpressionToken (-(++i)).value;
if (!(Clazz.instanceOf (v, JU.BS))) this.invArg ();
var bsAtoms = v;
i = this.iToken;
if (isFunctionOfX && this.getToken (i++).tok != 1073742339) this.invArg ();
var bsSelect =  new JU.BS ();
var bsX =  new JU.BS ();
var sout = (isFor ?  new Array (bsAtoms.cardinality ()) : null);
if (localVars == null) localVars =  new java.util.Hashtable ();
bsX.set (0);
var t = JS.SV.newV (10, bsX);
t.index = 0;
localVars.put (dummy, t.setName (dummy));
var pt2 = -1;
if (isFunctionOfX) {
pt2 = i - 1;
var np = 0;
var tok2;
while (np >= 0 && ++pt2 < ptMax) {
if ((tok2 = this.tokAt (pt2)) == 268435473) np--;
 else if (tok2 == 268435472) np++;
}
}var p = 0;
var jlast = 0;
var j = bsAtoms.nextSetBit (0);
if (j < 0 || this.chk) {
this.iToken = pt2 - 1;
} else {
for (; j >= 0; j = bsAtoms.nextSetBit (j + 1)) {
if (jlast >= 0) bsX.clear (jlast);
jlast = j;
bsX.set (j);
t.index = j;
res = this.parameterExpression (i, pt2, (isFor ? "XXX" : null), ignoreComma, isFor, j, false, localVars, isFunctionOfX ? null : dummy, false);
if (isFor) {
if (res == null || (res).size () == 0) this.invArg ();
sout[p++] = ((res).get (0)).asString ();
} else if ((res).booleanValue ()) {
bsSelect.set (j);
}}
}if (isFor) {
v = sout;
} else if (isFunctionOfX) {
v = bsSelect;
} else {
return this.listBS (bsSelect);
}i = this.iToken + 1;
break;
case 1073742339:
break out;
case 2:
if (this.tokAt (this.iToken + 1) == 1073742336 && ((tok = this.tokAt (this.iToken + 2)) == 805306401 || tok == 268435633)) {
this.theToken.value = Float.$valueOf (this.theToken.intValue);
this.theToken.tok = 3;
this.theToken.intValue = 2147483647;
i++;
}case 3:
case 1073742362:
rpn.addXNum (this.theToken);
break;
case 134217750:
if (this.tokAt (this.iToken + 1) == 268435472) {
if (!rpn.addOpAllowMath (this.theToken, true, 0)) this.invArg ();
break;
}case 1073742335:
case 1073742334:
case 4:
case 8:
case 9:
case 11:
case 12:
case 7:
case 10:
case 6:
case 14:
rpn.addX (JS.SV.newT (this.theToken));
break;
case 1073742330:
if (this.tokAt (i + 2) == 1073742336 && this.tokAt (i + 3) == 1275072526) {
rpn.addXStr ("$" + this.paramAsStr (++i));
} else {
this.ignoreError = true;
var ptc;
try {
ptc = this.centerParameter (i, null);
rpn.addX (JS.SV.newV (8, ptc));
} catch (e) {
if (Clazz.exceptionOf (e, Exception)) {
rpn.addXStr ("");
} else {
throw e;
}
}
this.ignoreError = false;
i = this.iToken;
}break;
case 1073742332:
if (this.tokAt (i + 1) == 4) {
if (this.tokAt (i + 2) == 1073742338) {
v = (this.chk ?  new JU.BS () : this.getAtomBitSet (this.stringParameter (i + 1)));
i += 2;
break;
}v = this.getAssocArray (i);
} else {
v = this.getPointOrPlane (i, false, true, true, false, 3, 4, true);
}i = this.iToken;
break;
case 1073742325:
if (this.tokAt (i + 1) == 1073742326) {
v =  new java.util.Hashtable ();
i++;
break;
} else if (this.tokAt (i + 1) == 1073742327 && this.tokAt (i + 2) == 1073742326) {
tok = 1073742327;
this.iToken += 2;
}case 1073742327:
if (tok == 1073742327) v = this.vwr.getAllAtoms ();
 else v = this.atomExpression (this.st, i, 0, true, true, null, true);
i = this.iToken;
if (nParen == 0 && isOneExpressionOnly) {
this.iToken++;
return this.listBS (v);
}break;
case 1073742195:
rpn.addOp (this.theToken);
continue;
case 1073742326:
i++;
break out;
case 268435504:
if (!ignoreComma && topLevel) break out;
if (!rpn.addOp (this.theToken)) this.invArg ();
break;
case 1073742337:
case 1073742336:
if (isSpecialAssignment && topLevel && this.tokAt (i + 2) == 268435860) isSpecialAssignment = rpn.endAssignment ();
if (ptEq == 0 && topLevel) {
switch (this.tokAt (i + 1)) {
case 0:
break;
case 1275335685:
case 1275334681:
case 1140850694:
case 1140850706:
case 1140850696:
case 1275068418:
if (tok == 1073742336) break;
default:
rpn.addOp (JS.T.tokenArrayOpen);
rpn.addXStr (this.optParameterAsString (++i));
rpn.addOp (JS.T.tokenArrayClose);
continue;
}
}var $var = this.getBitsetPropertySelector (i + 1, rpn.getXTok ());
var isUserFunction = ($var.intValue == 134320141);
var allowMathFunc = true;
var tok2 = this.tokAt (this.iToken + 2);
if (this.tokAt (this.iToken + 1) == 1073742336) {
switch (tok2) {
case 1073742327:
tok2 = 480;
if (this.tokAt (this.iToken + 3) == 1073742336 && this.tokAt (this.iToken + 4) == 1275068420) tok2 = 224;
case 32:
case 64:
case 192:
case 128:
case 160:
case 96:
allowMathFunc = (isUserFunction || $var.intValue == 1275069443 || tok2 == 480 || tok2 == 224);
$var.intValue |= tok2;
this.getToken (this.iToken + 2);
}
}var tokNext = this.tokAt (this.iToken + 1);
allowMathFunc = new Boolean (allowMathFunc & (tokNext == 268435472 || isUserFunction)).valueOf ();
if (!rpn.addOpAllowMath ($var, allowMathFunc, isUserFunction ? tokNext : 0)) this.invArg ();
i = this.iToken;
if ($var.intValue == 134320141 && tokNext != 268435472) {
rpn.addOp (JS.T.tokenLeftParen);
rpn.addOp (JS.T.tokenRightParen);
}break;
case 1086326786:
case 1086326785:
case 1073742328:
case 1678381065:
case 1086326788:
case 1073742329:
case 1111490587:
case 1086326789:
case 1086324742:
case 1094717454:
case 1094713360:
case 1073742128:
case 134218756:
case 1086324744:
case 1094713366:
case 134218757:
case 1237320707:
case 1639976963:
if (!isWhere && i == ptWithin && this.tokAt (i + 1) == 268435504) {
rpn.addX (JS.SV.newT (this.theToken));
break;
}default:
if (this.theTok == 268435520 && this.tokAt (i + 2) == 268435490) {
v = this.getAssocArray (i);
i = this.iToken;
break;
}if (JS.T.tokAttr (this.theTok, 268435456) || JS.T.tokAttr (this.theTok, 134217728) && this.tokAt (this.iToken + 1) == 268435472) {
if (!rpn.addOp (this.theToken)) {
if (ptAtom >= 0) {
break out;
}this.invArg ();
}switch (this.theTok) {
case 134217759:
ptWithin = i + 2;
break;
case 268435860:
if (topLevel) ptEq = i;
break;
case 268435472:
nParen++;
topLevel = false;
break;
case 268435473:
if (--nParen <= 0 && nSquare == 0) {
if (isOneExpressionOnly) {
this.iToken++;
break out;
}topLevel = true;
}break;
case 268435520:
nSquare++;
topLevel = false;
break;
case 268435521:
if (--nSquare == 0 && nParen == 0) {
if (isOneExpressionOnly) {
this.iToken++;
break out;
}topLevel = true;
}break;
}
} else {
var name = this.paramAsStr (i).toLowerCase ();
var haveParens = (this.tokAt (i + 1) == 268435472);
if (!haveParens) if (this.chk) {
v = name;
} else if (localVars == null || (v = JU.PT.getMapValueNoCase (localVars, name)) == null && allContext) {
if (name.startsWith ("_")) {
v = (name.equals ("_") ? this.vwr.ms.getAuxiliaryInfo (null) : name.equals ("_m") ? this.vwr.getCurrentModelAuxInfo () : null);
}if (v == null) v = this.getContextVariableAsVariable (name, false);
 else if (ptEq == 0) this.invArg ();
}if (v == null) {
if (JS.T.tokAttr (this.theTok, 1073741824) && this.vwr.isFunction (name)) {
if (!rpn.addOp (JS.SV.newV (134320141, this.theToken.value))) this.invArg ();
if (!haveParens) {
rpn.addOp (JS.T.tokenLeftParen);
rpn.addOp (JS.T.tokenRightParen);
}} else {
$var = this.vwr.g.getAndSetNewVariable (name, false);
switch ($var.tok) {
case 2:
case 3:
if (this.noCopy (i, -1) || this.noCopy (i, 1)) break;
rpn.addXCopy ($var);
continue;
default:
}
rpn.addX ($var);
}}}}
if (v != null) {
if (Clazz.instanceOf (v, JU.BS)) rpn.addXBs (v);
 else rpn.addXObj (v);
}}
var result = rpn.getResult ();
if (result == null) {
if (!this.chk) rpn.dumpStacks ("null result");
this.error (13);
}if (result.tok == 135198) {
if (isSpecialAssignment && ptEq == 0) {
var rv =  new JU.Lst ();
rv.addLast ( new JS.SV ());
return rv;
}return result.value;
}if (this.chk) {
if (returnBoolean) return Boolean.TRUE;
if (returnString) return "";
} else {
if (returnBoolean) return Boolean.$valueOf (result.asBoolean ());
if (returnString) {
if (result.tok == 4) result.intValue = 2147483647;
return result.asString ();
}}switch (result.tok) {
case 1073742335:
case 1073742334:
return Boolean.$valueOf (result.intValue == 1);
case 2:
return Integer.$valueOf (result.intValue);
case 10:
case 3:
case 4:
case 8:
default:
return result.value;
}
}, "~N,~N,~S,~B,~B,~N,~B,java.util.Map,~S,~B");
Clazz.defineMethod (c$, "atomExpressionAt", 
function (index) {
if (!this.checkToken (index)) {
this.iToken = index;
this.bad ();
}return this.atomExpression (this.st, index, 0, true, false, null, true);
}, "~N");
Clazz.defineMethod (c$, "atomExpression", 
function (code, pcStart, pcStop, allowRefresh, allowUnderflow, ret, andNotDeleted) {
this.isBondSet = false;
if (code !== this.st) {
this.tempStatement = this.st;
this.st = code;
}var rpn =  new JS.ScriptMathProcessor (this, false, false, false, ret == null, allowUnderflow, null);
var val;
var refreshed = false;
this.iToken = 1000;
var ignoreSubset = (pcStart < 0);
var isInMath = false;
var bs;
var nExpress = 0;
var ac = this.vwr.ms.ac;
var ptWithin = -10;
if (ignoreSubset) pcStart = -pcStart;
ignoreSubset = new Boolean (ignoreSubset | this.chk).valueOf ();
if (pcStop == 0 && code.length > pcStart) pcStop = pcStart + 1;
expression_loop : for (var pc = pcStart; pc < pcStop; ++pc) {
this.iToken = pc;
var instruction = code[pc];
if (instruction == null) break;
var value = instruction.value;
switch (instruction.tok) {
case 1073742325:
pcStart = pc;
pcStop = code.length;
nExpress++;
break;
case 1073742326:
nExpress--;
if (nExpress > 0) continue;
break expression_loop;
case 1073742332:
if (this.isPoint3f (pc)) {
var pt = this.getPoint3f (pc, true, true);
if (pt != null) {
rpn.addXPt (pt);
pc = this.iToken;
break;
}}break;
case 1073742338:
if (pc > 0 && code[pc - 1].tok == 1073742332) rpn.addXBs ( new JU.BS ());
break;
case 268435520:
isInMath = true;
rpn.addOp (instruction);
break;
case 268435521:
isInMath = false;
rpn.addOp (instruction);
break;
case 12290:
rpn.addXBs (this.getAtomBitSet (value));
break;
case 7:
bs = JS.SV.getBitSet (instruction, false);
if (bs != null) {
rpn.addXBs (bs);
break;
}case 6:
rpn.addXBs (this.vwr.ms.getAtoms (1086324744, (instruction).asString ()));
break;
case 134219265:
rpn.addX (JS.SV.newT (instruction));
rpn.addX (JS.SV.newV (9, this.hklParameter (pc + 2)));
pc = this.iToken;
break;
case 134217750:
rpn.addX (JS.SV.newT (instruction));
rpn.addX (JS.SV.newV (9, this.planeParameter (pc + 2)));
pc = this.iToken;
break;
case 1073742329:
rpn.addX (JS.SV.newT (instruction));
rpn.addXPt (this.getPoint3f (pc + 2, true, true));
pc = this.iToken;
break;
case 4:
var s = value;
if (s.indexOf ("({") == 0) {
bs = JU.BS.unescape (s);
if (bs != null) {
rpn.addXBs (bs);
break;
}} else if (s.indexOf ("|") >= 0 && ptWithin != pc - 4) {
rpn.addXBs (this.vwr.ms.getAtoms (1086324744, s));
break;
}rpn.addX (JS.SV.newT (instruction));
if (s.equals ("hkl")) {
rpn.addX (JS.SV.newV (9, this.hklParameter (pc + 2)));
pc = this.iToken;
}break;
case 134217759:
ptWithin = pc;
case 134218757:
case 134218756:
case 1237320707:
case 134353926:
case 134217736:
case 268435504:
case 1275203608:
rpn.addOp (instruction);
break;
case 1073742327:
rpn.addXBs (this.vwr.getAllAtoms ());
break;
case 1073742333:
rpn.addXBs ( new JU.BS ());
break;
case 1073742335:
case 1073742334:
rpn.addX (JS.SV.newT (instruction));
break;
case 1113589787:
rpn.addXBs (JU.BSUtil.copy (this.vwr.bsA ()));
break;
case 2097194:
rpn.addXBs (JU.BSUtil.copy (this.vwr.slm.getHiddenSet ()));
break;
case 12293:
rpn.addXBs (JU.BSUtil.copy (this.vwr.getMotionFixedAtoms ()));
break;
case 2097192:
rpn.addXBs (JU.BSUtil.copyInvert (this.vwr.slm.getHiddenSet (), ac));
break;
case 2097200:
rpn.addXBs (this.vwr.getBaseModelBitSet ());
break;
case 2097198:
rpn.addXBs (this.chk ?  new JU.BS () : JU.BSUtil.copy (this.vwr.ms.getVisibleSet (!refreshed)));
refreshed = true;
break;
case 2097190:
if (!this.chk && allowRefresh) (this).refresh (false);
rpn.addXBs (this.chk ?  new JU.BS () : this.vwr.ms.getClickableSet (!allowRefresh));
allowRefresh = false;
break;
case 1073742356:
if (this.vwr.ms.mc != 1 || this.vwr.ms.haveBioModels) {
var atomID = instruction.intValue;
if (atomID > 0) {
bs = this.compareInt (1094713346, 268435860, atomID);
if (atomID == 2) bs.or (this.compareInt (1086326789, 268435860, 20));
rpn.addXBs (bs);
} else {
rpn.addXBs (this.getAtomBits (instruction.tok, value));
}} else {
rpn.addXBs ((this).lookupIdentifierValue ("_" + value));
}break;
case 2097155:
case 2097188:
case 2097156:
case 1612709894:
case 1073742331:
case 2097166:
case 2097165:
case 2097168:
case 2097170:
case 2097172:
case 2097174:
case 1073742360:
case 1073742355:
case 2097196:
case 1088421903:
case 1814695966:
rpn.addXBs (this.getAtomBits (instruction.tok, value));
break;
case 1073742358:
case 1073742359:
var iModel = instruction.intValue;
if (iModel == 2147483647 && Clazz.instanceOf (value, Integer)) {
iModel = (value).intValue ();
if (!this.vwr.haveFileSet ()) {
rpn.addXBs (this.getAtomBits (1073742358, Integer.$valueOf (iModel)));
break;
}if (iModel <= 2147) iModel = iModel * 1000000;
}rpn.addXBs (this.bitSetForModelFileNumber (iModel));
break;
case 1073742361:
case 1073742357:
rpn.addXBs (this.getAtomBits (instruction.tok, Integer.$valueOf (instruction.intValue)));
break;
case 1073742362:
if (isInMath) rpn.addXNum (instruction);
 else rpn.addXBs (this.getAtomBits (1073742362, Integer.$valueOf (JS.ScriptExpr.getSeqCode (instruction))));
break;
case 1073742363:
if (isInMath) {
rpn.addXNum (instruction);
rpn.addOp (JS.T.tokenMinus);
rpn.addXNum (code[++pc]);
break;
}var chainID = (pc + 3 < code.length && code[pc + 2].tok == 268435584 && code[pc + 3].tok == 1073742357 ? code[pc + 3].intValue : -1);
rpn.addXBs (this.getAtomBits (1073742363,  Clazz.newIntArray (-1, [JS.ScriptExpr.getSeqCode (instruction), JS.ScriptExpr.getSeqCode (code[++pc]), chainID])));
if (chainID != -1) pc += 2;
break;
case 1094713350:
case 1094713349:
var pt = value;
rpn.addXBs (this.getAtomBits (instruction.tok,  Clazz.newIntArray (-1, [Clazz.doubleToInt (Math.floor (pt.x * 1000)), Clazz.doubleToInt (Math.floor (pt.y * 1000)), Clazz.doubleToInt (Math.floor (pt.z * 1000))])));
break;
case 2097182:
rpn.addXBs (this.vwr.am.cmi < 0 ? this.vwr.getFrameAtoms () : this.vwr.getModelUndeletedAtomsBitSet (this.vwr.am.cmi));
break;
case 1612709900:
case 2097154:
case 1114249217:
case 1612709912:
case 136314895:
case 2097159:
case 2097160:
case 2097162:
case 2097178:
case 2097180:
rpn.addXBs ((this).lookupIdentifierValue (value));
break;
case 268435859:
case 268435858:
case 268435857:
case 268435856:
case 268435860:
case 268435861:
case 268435862:
var tok = instruction.tok;
var tokWhat = instruction.intValue;
if ((tokWhat == 1094717448) && tok != 268435860) this.invArg ();
var data = null;
if (tokWhat == 1715472409) {
if (pc + 2 == code.length) this.invArg ();
if (!this.chk) data = this.vwr.getDataObj (code[++pc].value, null, 1);
}if (++pc == code.length) this.invArg ();
rpn.addXBs (this.chk ?  new JU.BS () : this.getComparison (code[pc], tokWhat, tok, value, data));
break;
case 3:
case 2:
rpn.addXNum (instruction);
break;
case 10:
var bs1 = JU.BSUtil.copy (value);
rpn.addXBs (bs1);
break;
case 8:
rpn.addXPt (value);
break;
default:
if (JS.T.tokAttr (instruction.tok, 268435456)) {
if (!rpn.addOp (instruction)) this.invArg ();
break;
}if (!(Clazz.instanceOf (value, String))) {
rpn.addXObj (value);
break;
}val = this.getParameter (value, 0, true);
if (isInMath) {
rpn.addXObj (val);
break;
}if (Clazz.instanceOf (val, String) || Clazz.instanceOf (val, JU.Lst)) val = this.getStringObjectAsVariable (val);
if (Clazz.instanceOf (val, String)) val = (this).lookupIdentifierValue (value);
rpn.addXObj (val);
break;
}
}
var expressionResult = rpn.getResult ();
if (expressionResult == null) {
if (allowUnderflow) return null;
if (!this.chk) rpn.dumpStacks ("after getResult");
this.error (13);
}var exp = expressionResult.value;
if (Clazz.instanceOf (exp, String) && (ret == null || (exp).startsWith ("({"))) {
exp = (this.chk ?  new JU.BS () : this.getAtomBitSet (exp));
}if (ret != null && !(Clazz.instanceOf (exp, JU.BS))) {
ret[0] = exp;
return null;
}bs = (Clazz.instanceOf (exp, JU.BS) ? exp :  new JU.BS ());
this.isBondSet = (Clazz.instanceOf (exp, JM.BondSet));
if (!this.isBondSet && (bs = this.vwr.slm.excludeAtoms (bs, ignoreSubset)).length () > this.vwr.ms.ac) bs.clearAll ();
if (this.tempStatement != null) {
this.st = this.tempStatement;
this.tempStatement = null;
}return bs;
}, "~A,~N,~N,~B,~B,~A,~B");
Clazz.defineMethod (c$, "getComparison", 
 function (t, tokWhat, tokOp, strOp, data) {
var tokValue = t.tok;
if (tokValue == 7) {
var bs =  new JU.BS ();
if (tokOp != 268435860) bs.setBits (0, this.vwr.ms.ac);
var lst = (t).getList ();
for (var i = lst.size (); --i >= 0; ) {
var res = this.getComparison (lst.get (i), tokWhat, tokOp, strOp, data);
if (tokOp == 268435860) bs.or (res);
 else bs.and (res);
}
return bs;
}var comparisonInt = t.intValue;
var comparisonFloat = NaN;
var isModel = (tokWhat == 1094717454);
var isIntProperty = JS.T.tokAttr (tokWhat, 1094713344);
var isFloatProperty = (JS.T.tokAttr (tokWhat, 1111490560) || (tokWhat & 1136656384) == 1077936128);
var isIntOrFloat = isIntProperty && isFloatProperty;
var isStringProperty = !isIntProperty && JS.T.tokAttr (tokWhat, 1086324736);
if (tokWhat == 1086326789) isIntProperty = !(isStringProperty = false);
var val = t.value;
if (JS.T.tokAttr (tokValue, 1073741824)) {
if ("_modelNumber".equalsIgnoreCase (val)) {
var modelIndex = this.vwr.am.cmi;
val = Integer.$valueOf (comparisonInt = (modelIndex < 0 ? 0 : this.vwr.getModelFileNumber (modelIndex)));
} else {
var v = this.getParameter (val, 1073742190, false);
if (v != null) {
if (v.tok == 7) return this.getComparison (v, tokWhat, tokOp, strOp, data);
comparisonInt = v.intValue;
val = (isStringProperty ? JS.SV.sValue (v) : JS.SV.nValue (v));
}}}if (Clazz.instanceOf (val, JU.P3)) {
if (tokWhat == 1765808134) {
comparisonInt = JU.CU.colorPtToFFRGB (val);
tokValue = 2;
isIntProperty = true;
}} else if (Clazz.instanceOf (val, String)) {
if (tokWhat == 1765808134) {
comparisonInt = JU.CU.getArgbFromString (val);
if (comparisonInt == 0 && JS.T.tokAttr (tokValue, 1073741824)) {
val = this.getVarParameter (val, true);
if ((val).startsWith ("{")) {
val = JU.Escape.uP (val);
if (Clazz.instanceOf (val, JU.P3)) comparisonInt = JU.CU.colorPtToFFRGB (val);
 else comparisonInt = 0;
} else {
comparisonInt = JU.CU.getArgbFromString (val);
}}tokValue = 2;
isIntProperty = true;
} else if (!isStringProperty) {
if (tokWhat == 1639976963 || tokWhat == 1237320707 || tokWhat == 1086326789) isStringProperty = !(isIntProperty = (comparisonInt != 2147483647));
 else val = JS.SV.nValue (t);
if (Clazz.instanceOf (val, Integer)) comparisonFloat = comparisonInt = (val).intValue ();
 else if (Clazz.instanceOf (val, Float) && isModel) comparisonInt = JM.ModelSet.modelFileNumberFromFloat ((val).floatValue ());
}}if (isStringProperty && !(Clazz.instanceOf (val, String))) {
val = "" + val;
}if (Clazz.instanceOf (val, Integer) || tokValue == 2) {
if (isModel) {
if (comparisonInt >= 1000000) tokWhat = -1094717454;
} else if (isIntOrFloat) {
isFloatProperty = false;
} else if (isFloatProperty) {
comparisonFloat = comparisonInt;
}} else if (Clazz.instanceOf (val, Float)) {
if (isModel) {
tokWhat = -1094717454;
} else {
comparisonFloat = (val).floatValue ();
if (isIntOrFloat) {
isIntProperty = false;
} else if (isIntProperty) {
comparisonInt = Clazz.floatToInt (comparisonFloat);
}}} else if (!isStringProperty) {
this.iToken++;
this.invArg ();
}if (isModel && comparisonInt >= 1000000 && comparisonInt % 1000000 == 0) {
comparisonInt /= 1000000;
tokWhat = 1228935687;
isModel = false;
}if (tokWhat == -1094717454 && tokOp == 268435860) {
return this.bitSetForModelFileNumber (comparisonInt);
}if (strOp != null && strOp.indexOf ("-") >= 0) {
if (isIntProperty) comparisonInt = -comparisonInt;
 else if (!Float.isNaN (comparisonFloat)) comparisonFloat = -comparisonFloat;
}return (isIntProperty ? this.compareInt (tokWhat, tokOp, comparisonInt) : isStringProperty ? this.compareString (tokWhat, tokOp, val) : this.compareFloatData (tokWhat, data, tokOp, comparisonFloat));
}, "JS.T,~N,~N,~S,~A");
Clazz.defineMethod (c$, "noCopy", 
function (i, dir) {
switch (this.tokAt (i + dir)) {
case 268435650:
case 268435649:
return ((this.st[i + dir].intValue == -1) == (dir == -1));
default:
return false;
}
}, "~N,~N");
Clazz.defineMethod (c$, "getAssocArray", 
function (i) {
var ht =  new java.util.Hashtable ();
var closer = (this.tokAt (i) == 1073742332 ? 1073742338 : 268435521);
for (i = i + 1; i < this.slen; i++) {
var tok = this.tokAt (i);
if (tok == closer) break;
var key = null;
if (Clazz.instanceOf (this.st[i], JS.SV)) key = (this.st[i]).myName;
if (key == null) key = JS.SV.sValue (this.st[i]);
i++;
if (this.tokAt (i++) != 268435490) this.invArg ();
var v = this.parameterExpression (i, 0, null, false, true, -1, false, null, null, false);
if (v.size () == 0) this.invArg ();
ht.put (key, v.get (0));
i = this.iToken;
if (this.tokAt (i) != 268435504) break;
}
this.iToken = i;
if (this.tokAt (i) != closer) this.invArg ();
return ht;
}, "~N");
Clazz.defineMethod (c$, "listBS", 
function (bs) {
var l =  new JU.Lst ();
l.addLast (JS.SV.newV (10, bs));
return l;
}, "JU.BS");
Clazz.defineMethod (c$, "compareFloatData", 
function (tokWhat, data, tokOperator, comparisonFloat) {
var bs =  new JU.BS ();
var ac = this.vwr.ms.ac;
var modelSet = this.vwr.ms;
var atoms = modelSet.at;
var propertyFloat = 0;
this.vwr.autoCalculate (tokWhat, null);
var isProp = (tokWhat == 1715472409);
if (!isProp && this.ptTemp == null) this.ptTemp =  new JU.P3 ();
for (var i = ac; --i >= 0; ) {
var match = false;
var atom = atoms[i];
if (isProp) {
if (data == null || data.length <= i) continue;
propertyFloat = data[i];
} else {
propertyFloat = atom.atomPropertyFloat (this.vwr, tokWhat, this.ptTemp);
}match = this.compareFloat (tokOperator, propertyFloat, comparisonFloat);
if (match) bs.set (i);
}
return bs;
}, "~N,~A,~N,~N");
Clazz.defineMethod (c$, "compareFloat", 
function (tokOperator, a, b) {
switch (tokOperator) {
case 268435859:
return a < b;
case 268435858:
return a <= b;
case 268435857:
return a >= b;
case 268435856:
return a > b;
case 268435860:
return a == b;
case 268435861:
return a != b && !Float.isNaN (a);
}
return false;
}, "~N,~N,~N");
Clazz.defineMethod (c$, "compareString", 
 function (tokWhat, tokOperator, comparisonString) {
var bs =  new JU.BS ();
var atoms = this.vwr.ms.at;
var ac = this.vwr.ms.ac;
var isCaseSensitive = (tokOperator == 268435862 || tokWhat == 1086326788 && this.vwr.getBoolean (603979822));
if (!isCaseSensitive) comparisonString = comparisonString.toLowerCase ();
for (var i = ac; --i >= 0; ) {
var propertyString = atoms[i].atomPropertyString (this.vwr, tokWhat);
if (!isCaseSensitive) propertyString = propertyString.toLowerCase ();
if (this.compareStringValues (tokOperator, propertyString, comparisonString)) bs.set (i);
}
return bs;
}, "~N,~N,~S");
Clazz.defineMethod (c$, "compareStringValues", 
 function (tokOperator, propertyValue, comparisonValue) {
switch (tokOperator) {
case 268435860:
case 268435861:
return (JU.PT.isMatch (propertyValue, comparisonValue, true, true) == (tokOperator == 268435860));
case 268435862:
return JU.PT.isLike (propertyValue, comparisonValue);
default:
this.invArg ();
}
return false;
}, "~N,~S,~S");
Clazz.defineMethod (c$, "compareInt", 
 function (tokWhat, tokOperator, ival) {
var ia = 2147483647;
var propertyBitSet = null;
var bitsetComparator = tokOperator;
var bitsetBaseValue = ival;
var modelSet = this.vwr.ms;
var atoms = modelSet.at;
var ac = modelSet.ac;
var imax = -1;
var imin = 0;
var iModel = -1;
var cellRange = null;
var nOps = 0;
var bs;
switch (tokWhat) {
case 1296041986:
switch (bitsetComparator) {
case 268435857:
case 268435856:
imax = 2147483647;
break;
}
break;
case 1094713347:
try {
switch (tokOperator) {
case 268435859:
return JU.BSUtil.newBitSet2 (0, ival);
case 268435858:
return JU.BSUtil.newBitSet2 (0, ival + 1);
case 268435857:
return JU.BSUtil.newBitSet2 (ival, ac);
case 268435856:
return JU.BSUtil.newBitSet2 (ival + 1, ac);
case 268435860:
return (ival < ac ? JU.BSUtil.newBitSet2 (ival, ival + 1) :  new JU.BS ());
case 268435861:
default:
bs = JU.BSUtil.setAll (ac);
if (ival >= 0) bs.clear (ival);
return bs;
}
} catch (e) {
if (Clazz.exceptionOf (e, Exception)) {
return  new JU.BS ();
} else {
throw e;
}
}
}
bs = JU.BS.newN (ac);
for (var i = 0; i < ac; ++i) {
var match = false;
var atom = atoms[i];
switch (tokWhat) {
default:
ia = atom.atomPropertyInt (tokWhat);
break;
case 1094713368:
case 1094717448:
return JU.BSUtil.copy (this.vwr.ms.getConformation (-1, ival - 1, false, null));
case 1296041986:
propertyBitSet = atom.atomSymmetry;
if (propertyBitSet == null) continue;
if (atom.mi != iModel) {
iModel = atom.mi;
cellRange = modelSet.getModelCellRange (iModel);
nOps = modelSet.getModelSymmetryCount (iModel);
}if (bitsetBaseValue >= 200) {
if (cellRange == null) continue;
ival = bitsetBaseValue % 1000;
var symop = Clazz.doubleToInt (bitsetBaseValue / 1000) - 1;
if (symop < 0) {
match = true;
} else if (nOps == 0 || symop >= 0 && !(match = propertyBitSet.get (symop))) {
continue;
}bitsetComparator = 1073742333;
if (symop < 0) ia = atom.getCellTranslation (ival, cellRange, nOps);
 else ia = atom.getSymmetryTranslation (symop, cellRange, nOps);
} else if (nOps > 0) {
if (ival > nOps) {
if (bitsetComparator != 268435859 && bitsetComparator != 268435858) continue;
}if (bitsetComparator == 268435861) {
if (ival > 0 && ival <= nOps && !propertyBitSet.get (ival)) {
bs.set (i);
}continue;
}var bs1 = JU.BSUtil.copy (propertyBitSet);
bs1.clearBits (nOps, bs1.length ());
propertyBitSet = bs1;
}switch (bitsetComparator) {
case 268435859:
imax = ival - 1;
break;
case 268435858:
imax = ival;
break;
case 268435857:
imin = ival - 1;
break;
case 268435856:
imin = ival;
break;
case 268435860:
imax = ival;
imin = ival - 1;
break;
case 268435861:
match = !propertyBitSet.get (ival);
break;
}
if (imin < 0) imin = 0;
if (imin < imax) {
var pt = propertyBitSet.nextSetBit (imin);
if (pt >= 0 && pt < imax) match = true;
}if (!match || ia == 2147483647) tokOperator = 1073742333;
}
switch (tokOperator) {
case 1073742333:
break;
case 268435859:
match = (ia < ival);
break;
case 268435858:
match = (ia <= ival);
break;
case 268435857:
match = (ia >= ival);
break;
case 268435856:
match = (ia > ival);
break;
case 268435860:
match = (ia == ival);
break;
case 268435861:
match = (ia != ival);
break;
}
if (match) bs.set (i);
}
return bs;
}, "~N,~N,~N");
Clazz.defineMethod (c$, "getBitsetPropertySelector", 
 function (i, xTok) {
var tok = this.getToken (i).tok;
switch (tok) {
case 32:
case 64:
case 96:
case 192:
case 128:
case 160:
case 1715472409:
break;
default:
if (JS.T.tokAttrOr (tok, 1077936128, 1140850688) || xTok == 6) break;
if (tok != 805306401 && !JS.T.tokAttr (tok, 1073741824)) break;
var name = this.paramAsStr (i);
if (this.vwr.isFunction (name.toLowerCase ())) {
tok = 134320141;
break;
}}
return JS.SV.newSV (268435665, tok, this.paramAsStr (i));
}, "~N,~N");
Clazz.defineMethod (c$, "getBitsetProperty", 
function (bs, pts, tok, ptRef, planeRef, tokenValue, opValue, useAtomMap, index, asVectorIfAll) {
var haveIndex = (index != 2147483647);
var isAtoms = haveIndex || !(Clazz.instanceOf (tokenValue, JM.BondSet));
var minmaxtype = tok & 480;
var selectedFloat = (minmaxtype == 224);
var ac = this.vwr.ms.ac;
var fout = (minmaxtype == 256 ?  Clazz.newFloatArray (ac, 0) : null);
var isExplicitlyAll = (minmaxtype == 480 || selectedFloat);
tok &= -481;
var info = null;
if (tok == 0) tok = (isAtoms ? 1140850689 : 1677721602);
var isPt = false;
var isHash = false;
var isInt = false;
var isString = false;
switch (tok) {
case 1275068449:
return (this.vwr.getAuxiliaryInfoForAtoms (bs)).get ("models");
case 1145047050:
case 1145047055:
case 1145047051:
case 1145047053:
case 1145045008:
case 1145045006:
case 1765808134:
case 1145047052:
isPt = true;
break;
case 1275203608:
isHash = true;
info =  Clazz.newArray (-1, [null, null]);
break;
case 134320141:
case 1275069443:
break;
default:
isInt = JS.T.tokAttr (tok, 1094713344) && !JS.T.tokAttr (tok, 1111490560);
isString = !isInt && JS.T.tokAttr (tok, 1086324736);
}
var pt = (isPt || !isAtoms ?  new JU.P3 () : null);
if (isExplicitlyAll || isString && !haveIndex && minmaxtype != 256 && minmaxtype != 32) minmaxtype = 1073742327;
var vout = (minmaxtype == 1073742327 ?  new JU.Lst () : null);
var bsNew = null;
var userFunction = null;
var params = null;
var bsAtom = null;
var tokenAtom = null;
var ptT = null;
var data = null;
var ffdata = null;
switch (tok) {
case 1140850689:
case 1677721602:
if (this.chk) return bs;
bsNew = (tok == 1140850689 ? (isAtoms ? bs : this.vwr.ms.getAtoms (1677721602, bs)) : (isAtoms ? JM.BondSet.newBS (this.vwr.getBondsForSelectedAtoms (bs), null) : bs));
var i;
switch (minmaxtype) {
case 32:
i = bsNew.nextSetBit (0);
break;
case 64:
i = bsNew.length () - 1;
break;
case 192:
case 128:
case 160:
return Float.$valueOf (NaN);
default:
return bsNew;
}
bsNew.clearAll ();
if (i >= 0) bsNew.set (i);
return bsNew;
case 1086324745:
switch (minmaxtype) {
case 0:
case 1073742327:
return this.getCmdExt ().getBitsetIdent (bs, null, tokenValue, useAtomMap, index, isExplicitlyAll);
}
return "";
case 134320141:
userFunction = (opValue)[0];
params = (opValue)[1];
bsAtom = JU.BS.newN (ac);
tokenAtom = JS.SV.newV (10, bsAtom);
break;
case 1111490587:
for (var j = fout.length; --j >= 0; ) fout[j] = NaN;

case 1111490574:
case 1111490575:
this.vwr.autoCalculate (tok, tokenValue);
break;
case 1275069443:
if (ptRef == null && planeRef == null) return  new JU.P3 ();
break;
case 1765808134:
ptT =  new JU.P3 ();
break;
case 1715472409:
data = this.vwr.getDataObj (opValue, null, 1);
if (data == null) ffdata = this.vwr.getDataObj (opValue, null, 2);
if (ffdata != null) {
minmaxtype = 1073742327;
vout =  new JU.Lst ();
}break;
}
var n = 0;
var ivMinMax = 0;
var fvMinMax = 0;
var sum = 0;
var sum2 = 0;
switch (minmaxtype) {
case 32:
ivMinMax = 2147483647;
fvMinMax = 3.4028235E38;
break;
case 64:
ivMinMax = -2147483648;
fvMinMax = -3.4028235E38;
break;
}
var modelSet = this.vwr.ms;
var mode = (ffdata != null ? 5 : isHash ? 4 : isPt ? 3 : isString ? 2 : isInt ? 1 : 0);
if (isAtoms) {
var haveBitSet = (bs != null);
var i0;
var i1;
if (pts != null) {
i0 = 0;
i1 = pts.size ();
} else if (haveIndex) {
i0 = index;
i1 = index + 1;
} else if (haveBitSet) {
i0 = bs.nextSetBit (0);
i1 = Math.min (ac, bs.length ());
} else {
i0 = 0;
i1 = ac;
}if (this.chk) i1 = 0;
for (var i = i0; i >= 0 && i < i1; i = (haveBitSet ? bs.nextSetBit (i + 1) : i + 1)) {
n++;
var atom = (pts == null ? modelSet.at[i] : null);
switch (mode) {
case 0:
var fv = 3.4028235E38;
switch (tok) {
case 134320141:
bsAtom.set (i);
fv = JS.SV.fValue ((this).getUserFunctionResult (userFunction, params, tokenAtom));
bsAtom.clear (i);
break;
case 1715472409:
fv = (data == null ? 0 : data[i]);
break;
case 1275069443:
if (planeRef != null) fv = JU.Measure.distanceToPlane (planeRef, atom);
 else fv = (pts != null ? JS.SV.ptValue (pts.get (i)).distance (ptRef) : atom !== ptRef || minmaxtype != 32 ? atom.distance (ptRef) : NaN);
break;
default:
fv = atom.atomPropertyFloat (this.vwr, tok, this.ptTemp);
}
if (fv == 3.4028235E38 || Float.isNaN (fv) && minmaxtype != 1073742327) {
n--;
continue;
}switch (minmaxtype) {
case 32:
if (fv < fvMinMax) fvMinMax = fv;
break;
case 64:
if (fv > fvMinMax) fvMinMax = fv;
break;
case 256:
fout[i] = fv;
break;
case 1073742327:
vout.addLast (Float.$valueOf (fv));
break;
case 160:
case 192:
sum2 += (fv) * fv;
case 128:
default:
sum += fv;
}
break;
case 1:
var iv = 0;
switch (tok) {
case 1094717448:
case 1094713349:
this.errorStr (45, JS.T.nameOf (tok));
break;
default:
iv = atom.atomPropertyInt (tok);
}
switch (minmaxtype) {
case 32:
if (iv < ivMinMax) ivMinMax = iv;
break;
case 64:
if (iv > ivMinMax) ivMinMax = iv;
break;
case 256:
fout[i] = iv;
break;
case 1073742327:
vout.addLast (Integer.$valueOf (iv));
break;
case 160:
case 192:
sum2 += (iv) * iv;
case 128:
default:
sum += iv;
}
break;
case 2:
var s = atom.atomPropertyString (this.vwr, tok);
switch (minmaxtype) {
case 256:
fout[i] = JU.PT.parseFloat (s);
break;
default:
if (vout == null) return s;
vout.addLast (s);
}
break;
case 3:
var t = atom.atomPropertyTuple (this.vwr, tok, this.ptTemp);
switch (minmaxtype) {
case 256:
fout[i] = (pt == null ? -1 : t == null ? 0 : t.length ());
break;
case 1073742327:
vout.addLast (t == null ? Integer.$valueOf (-1) : JU.P3.newP (t));
break;
default:
if (t == null) n--;
 else pt.add (t);
}
break;
case 4:
switch (tok) {
case 1275203608:
info[0] = Integer.$valueOf (i);
info[1] = "";
this.vwr.shm.getShapePropertyData (21, "info", info);
if (info[1] != null) {
if (vout == null) return info[1];
vout.addLast (info[1]);
}break;
}
break;
case 5:
vout.addLast (ffdata[i]);
break;
}
if (haveIndex) break;
}
} else {
var isAll = (bs == null);
var i0 = (isAll ? 0 : bs.nextSetBit (0));
var i1 = this.vwr.ms.bondCount;
for (var i = i0; i >= 0 && i < i1; i = (isAll ? i + 1 : bs.nextSetBit (i + 1))) {
n++;
var bond = modelSet.bo[i];
switch (tok) {
case 1140850691:
var fv = bond.atom1.distance (bond.atom2);
switch (minmaxtype) {
case 32:
if (fv < fvMinMax) fvMinMax = fv;
break;
case 64:
if (fv > fvMinMax) fvMinMax = fv;
break;
case 1073742327:
vout.addLast (Float.$valueOf (fv));
break;
case 160:
case 192:
sum2 += fv * fv;
case 128:
default:
sum += fv;
}
break;
case 1145047050:
switch (minmaxtype) {
case 1073742327:
pt.ave (bond.atom1, bond.atom2);
vout.addLast (JU.P3.newP (pt));
break;
default:
pt.add (bond.atom1);
pt.add (bond.atom2);
n++;
}
break;
case 1765808134:
JU.CU.colorPtFromInt (this.vwr.gdata.getColorArgbOrGray (bond.colix), ptT);
switch (minmaxtype) {
case 1073742327:
vout.addLast (JU.P3.newP (ptT));
break;
default:
pt.add (ptT);
}
break;
default:
this.errorStr (46, JS.T.nameOf (tok));
}
}
}if (minmaxtype == 256) return fout;
if (minmaxtype == 1073742327) {
if (asVectorIfAll) return vout;
var len = vout.size ();
if ((isString || isHash) && !isExplicitlyAll && len == 1) return vout.get (0);
if (selectedFloat) {
fout =  Clazz.newFloatArray (len, 0);
for (var i = len; --i >= 0; ) {
var v = vout.get (i);
switch (mode) {
case 0:
fout[i] = (v).floatValue ();
break;
case 1:
fout[i] = (v).floatValue ();
break;
case 2:
fout[i] = JU.PT.parseFloat (v);
break;
case 3:
fout[i] = (v == null ? -1 : (v).length ());
break;
}
}
return fout;
}if (tok == 1086324744) {
var sb =  new JU.SB ();
for (var i = 0; i < len; i++) sb.append (vout.get (i));

return sb.toString ();
}var sout =  new Array (len);
for (var i = len; --i >= 0; ) {
var v = vout.get (i);
if (Clazz.instanceOf (v, JU.P3)) sout[i] = JU.Escape.eP (v);
 else sout[i] = "" + vout.get (i);
}
return sout;
}if (isPt) return (n == 0 ? Integer.$valueOf (-1) : JU.P3.new3 (pt.x / n, pt.y / n, pt.z / n));
if (isHash) return  new java.util.Hashtable ();
if (n == 0 || n == 1 && minmaxtype == 192) return Float.$valueOf (NaN);
if (isInt) {
switch (minmaxtype) {
case 32:
case 64:
return Integer.$valueOf (ivMinMax);
case 160:
case 192:
break;
case 128:
return Integer.$valueOf (Clazz.doubleToInt (sum));
default:
if (sum / n == Clazz.doubleToInt (sum / n)) return Integer.$valueOf (Clazz.doubleToInt (sum / n));
return Float.$valueOf ((sum / n));
}
}switch (minmaxtype) {
case 32:
case 64:
sum = fvMinMax;
break;
case 128:
break;
case 160:
sum = sum2;
break;
case 192:
sum = Math.sqrt ((sum2 - sum * sum / n) / (n - 1));
break;
default:
sum /= n;
break;
}
return Float.$valueOf (sum);
}, "JU.BS,JU.Lst,~N,JU.P3,JU.P4,~O,~O,~B,~N,~B");
Clazz.defineMethod (c$, "bitSetForModelFileNumber", 
 function (m) {
var bs = JU.BS.newN (this.vwr.ms.ac);
if (this.chk) return bs;
var modelCount = this.vwr.ms.mc;
var haveFileSet = this.vwr.haveFileSet ();
if (m < 1000000 && haveFileSet) m *= 1000000;
var pt = m % 1000000;
if (pt == 0) {
var model1 = this.vwr.ms.getModelNumberIndex (m + 1, false, false);
if (model1 < 0) return bs;
var model2 = (m == 0 ? modelCount : this.vwr.ms.getModelNumberIndex (m + 1000001, false, false));
if (model1 < 0) model1 = 0;
if (model2 < 0) model2 = modelCount;
if (this.vwr.ms.isTrajectory (model1)) model2 = model1 + 1;
for (var j = model1; j < model2; j++) bs.or (this.vwr.getModelUndeletedAtomsBitSet (j));

} else {
var modelIndex = this.vwr.ms.getModelNumberIndex (m, false, true);
if (modelIndex >= 0) bs.or (this.vwr.getModelUndeletedAtomsBitSet (modelIndex));
}return bs;
}, "~N");
Clazz.defineMethod (c$, "getStringObjectAsVariable", 
 function (obj) {
if (obj == null) return obj;
if (Clazz.instanceOf (obj, String)) {
var s = obj;
if (s.length == 0) return s;
return JS.SV.unescapePointOrBitsetAsVariable (s);
}var lst = obj;
if (lst.size () == 0) return "";
if (lst.get (0).asString ().contains ("|")) return this.vwr.ms.getAtoms (1086324744, JS.SV.newV (7, lst).asString ());
var bs = JS.SV.unEscapeBitSetArray (lst, true);
return (bs == null ? "" : bs);
}, "~O");
Clazz.defineMethod (c$, "getAtomBits", 
function (tokType, specInfo) {
return (this.chk ?  new JU.BS () : this.vwr.ms.getAtoms (tokType, specInfo));
}, "~N,~O");
c$.getSeqCode = Clazz.defineMethod (c$, "getSeqCode", 
function (instruction) {
return (instruction.intValue == 2147483647 ? (instruction.value).intValue () : JM.Group.getSeqcodeFor (instruction.intValue, ' '));
}, "JS.T");
Clazz.defineMethod (c$, "setVariable", 
function (pt, ptMax, key, isSet) {
var bs = null;
var propertyName = "";
var settingData = key.startsWith ("property_");
var isThrown = key.equals ("thrown_value");
var isExpression = (this.tokAt (1) == 1073742325 || this.tokAt (1) == 268435472);
var t = (settingData ? null : key.length == 0 ?  new JS.SV () : this.getContextVariableAsVariable (key, false));
if (isSet && !isExpression) {
switch (this.tokAt (2)) {
default:
pt = 2;
break;
case 268435860:
pt = 3;
break;
case 1073742195:
case 268435520:
if (this.st[0].intValue == 61) {
pt = 2;
break;
}case 1073742336:
case 1073742337:
key = null;
break;
}
}var nv = 0;
var v = this.parameterExpression (pt, ptMax, key, true, true, -1, false, null, null, isSet && pt == 1);
nv = v.size ();
if (nv == 0) this.invArg ();
if (this.chk || v.get (0).tok == 0) return null;
var tv = JS.SV.selectItemVar (JS.SV.newS ("").setv (v.get (nv - 1)));
if (nv > 1) {
var sel = (nv > 2 ? v.get (1) : null);
t = v.get (0);
var selectOne = false;
switch (t.tok) {
case 6:
case 14:
if (nv > 3) this.invArg ();
t.mapPut (sel.asString (), tv);
break;
case 7:
if (nv > 2 + (sel == null ? 0 : 1)) this.invArg ();
if (sel == null) {
sel = t;
} else {
t = JS.SV.selectItemVar (t);
}selectOne = true;
break;
case 4:
if (sel.tok != 2) {
t.value = JU.PT.rep (t.asString (), sel.asString (), tv.asString ());
t.intValue = 2147483647;
break;
}case 11:
case 12:
if (t.intValue == 2147483647) selectOne = true;
 else t.setSelectedValue (t.intValue, sel.asInt (), tv);
break;
case 8:
var p = (t.value = JU.P3.newP (t.value));
var f = tv.asFloat ();
switch (JS.T.getTokFromName (sel.asString ())) {
case 1111492629:
p.x = f;
break;
case 1111492630:
p.y = f;
break;
case 1111492631:
p.z = f;
break;
}
break;
case 10:
bs = JS.SV.getBitSet (t, true);
var nAtoms = this.vwr.ms.ac;
var nbs = bs.cardinality ();
propertyName = sel.asString ();
var tok = JS.T.getTokFromName (propertyName);
switch (tok) {
case 0:
if (propertyName.startsWith ("property_")) {
var obj;
if (tv.tok == 7) {
var nmin = (tv.getList ().size () == nbs ? nbs : nAtoms);
obj = (JS.SV.getArrayDepth (tv) > 1 ? JS.SV.fflistValue (tv, nmin) : JS.SV.flistValue (tv, nmin));
} else {
obj = tv.asString ();
}this.vwr.setData (propertyName,  Clazz.newArray (-1, [propertyName, obj, JU.BSUtil.copy (bs), Integer.$valueOf (-1)]), nAtoms, 0, 0, tv.tok == 7 ? 2147483647 : -2147483648, 0);
break;
}this.iToken = pt;
this.error (56);
break;
case 1825200146:
case 1287653388:
this.vwr.shm.loadShape (5);
default:
this.setBitsetProperty (bs, tok, tv.asInt (), tv.asFloat (), tv);
break;
}
break;
}
if (selectOne) t.setSelectedValue (sel.intValue, 2147483647, tv);
return null;
}var needVariable = (!settingData && t == null && (isThrown || !(Clazz.instanceOf (tv.value, String) || tv.tok == 2 || Clazz.instanceOf (tv.value, Integer) || Clazz.instanceOf (tv.value, Float) || Clazz.instanceOf (tv.value, Boolean))));
if (needVariable && key != null) {
if (key.startsWith ("_") || (t = this.vwr.g.getAndSetNewVariable (key, true)) == null) this.errorStr (22, key);
}if (t != null) return t.setv (tv);
var vv = JS.SV.oValue (tv);
if (settingData) {
if (tv.tok == 7) vv = tv.asString ();
this.vwr.setData (key,  Clazz.newArray (-1, [key, "" + vv, JU.BSUtil.copy (this.vwr.bsA ()), Integer.$valueOf (0)]), this.vwr.ms.ac, 0, 0, -2147483648, 0);
return null;
}if (Clazz.instanceOf (vv, Boolean)) {
this.setBooleanProperty (key, (vv).booleanValue ());
} else if (Clazz.instanceOf (vv, Integer)) {
this.setIntProperty (key, (vv).intValue ());
} else if (Clazz.instanceOf (vv, Float)) {
this.setFloatProperty (key, (vv).floatValue ());
} else if (Clazz.instanceOf (vv, String)) {
this.setStringProperty (key, vv);
} else {
}return tv;
}, "~N,~N,~S,~B");
Clazz.defineMethod (c$, "setBitsetProperty", 
 function (bs, tok, iValue, fValue, tokenValue) {
if (this.chk || bs.cardinality () == 0) return;
var list = null;
var sValue = null;
var fvalues = null;
var pt;
var sv = null;
var nValues = 0;
var isStrProperty = JS.T.tokAttr (tok, 1086324736);
if (tokenValue.tok == 7) {
sv = (tokenValue).getList ();
if ((nValues = sv.size ()) == 0) return;
}switch (tok) {
case 1145047050:
case 1145047051:
case 1145047053:
case 1145047055:
switch (tokenValue.tok) {
case 8:
this.vwr.setAtomCoords (bs, tok, tokenValue.value);
break;
case 7:
this.theToken = tokenValue;
this.vwr.setAtomCoords (bs, tok, this.getPointArray (-1, nValues, true));
break;
}
return;
case 1765808134:
var value = null;
var prop = "color";
switch (tokenValue.tok) {
case 7:
var values =  Clazz.newIntArray (nValues, 0);
for (var i = nValues; --i >= 0; ) {
var svi = sv.get (i);
pt = JS.SV.ptValue (svi);
if (pt != null) {
values[i] = JU.CU.colorPtToFFRGB (pt);
} else if (svi.tok == 2) {
values[i] = svi.intValue;
} else {
values[i] = JU.CU.getArgbFromString (svi.asString ());
if (values[i] == 0) values[i] = svi.asInt ();
}if (values[i] == 0) this.errorStr2 (50, "ARRAY", svi.asString ());
}
value = values;
prop = "colorValues";
break;
case 8:
value = Integer.$valueOf (JU.CU.colorPtToFFRGB (tokenValue.value));
break;
case 4:
value = tokenValue.value;
break;
default:
value = Integer.$valueOf (JS.SV.iValue (tokenValue));
break;
}
(this).setAtomProp (prop, value, bs);
return;
case 1825200146:
case 1287653388:
if (tokenValue.tok != 7) sValue = JS.SV.sValue (tokenValue);
break;
case 1086326789:
case 1094715402:
(this).clearDefinedVariableAtomSets ();
isStrProperty = false;
break;
}
switch (tokenValue.tok) {
case 7:
if (isStrProperty) list = JS.SV.strListValue (tokenValue);
 else fvalues = JS.SV.flistValue (tokenValue, nValues);
break;
case 4:
if (sValue == null) list = JU.PT.getTokens (JS.SV.sValue (tokenValue));
break;
}
if (list != null) {
nValues = list.length;
if (!isStrProperty) {
fvalues =  Clazz.newFloatArray (nValues, 0);
for (var i = nValues; --i >= 0; ) fvalues[i] = (tok == 1086326789 ? JU.Elements.elementNumberFromSymbol (list[i], false) : JU.PT.parseFloat (list[i]));

}if (tokenValue.tok != 7 && nValues == 1) {
if (isStrProperty) sValue = list[0];
 else fValue = fvalues[0];
iValue = Clazz.floatToInt (fValue);
list = null;
fvalues = null;
}}if (!JS.T.tokAttr (tok, 2048)) this.error (56);
this.vwr.setAtomProperty (bs, tok, iValue, fValue, sValue, fvalues, list);
}, "JU.BS,~N,~N,~N,JS.T");
Clazz.defineMethod (c$, "setStatement", 
function (st0, pt0) {
this.st = st0;
this.slen = this.st.length;
if (this.slen == 0) return true;
var fixed;
var i;
var tok;
for (i = pt0; i < this.slen; i++) {
if (this.st[i] == null) {
this.slen = i;
return true;
}if (this.st[i].tok == 12290) break;
}
if (i == this.slen) return i == this.slen;
switch (this.st[0].tok) {
case 102436:
case 134320141:
case 1073741824:
if (this.tokAt (1) == 268435472) return true;
}
fixed =  new Array (this.slen);
fixed[0] = this.st[0];
var isExpression = false;
var j = pt0;
for (i = pt0; i < this.slen; i++) {
if (this.st[i] == null) continue;
switch (tok = this.getToken (i).tok) {
default:
fixed[j] = this.st[i];
break;
case 1073742325:
case 1073742326:
isExpression = (tok == 1073742325);
fixed[j] = this.st[i];
break;
case 12290:
if (++i == this.slen) this.invArg ();
var v;
var forceString = (this.theToken.intValue == 4);
var s;
var $var = this.paramAsStr (i);
var isClauseDefine = (this.tokAt (i) == 1073742325);
var isSetAt = (pt0 == 1 && j == 1 && this.st[0] === JS.T.tokenSetCmd);
if (isClauseDefine) {
var vt = this.parameterExpressionToken (++i);
if (this.chk) {
v = null;
} else if (vt.tok != 7) {
v = JS.SV.oValue (vt);
} else if (!isExpression) {
v = vt;
} else {
var bs = JS.SV.getBitSet (vt, true);
if (bs == null) {
var sv = JS.SV.sValue (vt);
v = (sv.indexOf ("|") < 0 ? this.getAtomBitSet (sv) : sv);
} else {
v = bs;
}}i = this.iToken;
} else if (this.chk) {
v =  new JU.BS ();
} else {
if (this.tokAt (i) == 2) {
v = this.vwr.ms.getAtoms (1094715393, Integer.$valueOf (this.st[i].intValue));
} else if (this.tokAt (i) == 12290 && this.tokAt (i + 1) == 2) {
v = this.vwr.ms.getAtomsFromAtomNumberInFrame (this.st[++i].intValue);
} else {
v = this.getParameter ($var, 0, true);
}if (!isExpression && !isSetAt) isClauseDefine = true;
}tok = this.tokAt (0);
forceString = new Boolean (forceString | (JS.T.tokAttr (tok, 20480) || tok == 134222850)).valueOf ();
if (v == null) {
fixed[j] = JS.T.tokenAll;
} else if (Clazz.instanceOf (v, JS.SV)) {
fixed[j] = v;
} else if (Clazz.instanceOf (v, Boolean)) {
fixed[j] = ((v).booleanValue () ? JS.T.tokenOn : JS.T.tokenOff);
} else if (Clazz.instanceOf (v, Integer)) {
fixed[j] = JS.T.tv (2, (v).intValue (), v);
} else if (Clazz.instanceOf (v, Float)) {
fixed[j] = JS.T.tv (3, JS.ScriptParam.getFloatEncodedInt ("" + v), v);
} else if (Clazz.instanceOf (v, String)) {
if (!forceString && !isExpression) {
if ((tok != 36867 || j > 1 && this.st[1].tok != 537022465 && !"labelfor".equalsIgnoreCase (this.st[1].value.toString ())) && JS.T.tokAttr (tok, 36864)) {
v = this.getParameter (v, 1073742190, true);
}if (Clazz.instanceOf (v, String)) {
v = this.getStringObjectAsVariable (v);
}}if (Clazz.instanceOf (v, JS.SV)) {
fixed[j] = v;
} else {
s = v;
if (isExpression && !forceString) {
fixed[j] = (s.indexOf ("|") >= 0 || JS.T.tokAttr (fixed[j - 1].tok, 268435712) ? JS.T.o (4, s) : JS.T.o (10, this.getAtomBitSet (s)));
} else {
tok = (isSetAt ? JS.T.getTokFromName (s) : isClauseDefine || forceString || s.length == 0 || s.indexOf (".") >= 0 || s.indexOf (" ") >= 0 || s.indexOf ("=") >= 0 || s.indexOf (";") >= 0 || s.indexOf ("[") >= 0 || s.indexOf ("{") >= 0 ? 4 : 1073741824);
fixed[j] = JS.T.o (tok, v);
}}} else if (Clazz.instanceOf (v, JU.BArray)) {
fixed[j] = JS.SV.newV (15, v);
} else if (Clazz.instanceOf (v, JU.BS)) {
fixed[j] = JS.SV.newV (10, v);
} else if (Clazz.instanceOf (v, JU.P3)) {
fixed[j] = JS.SV.newV (8, v);
} else if (Clazz.instanceOf (v, JU.P4)) {
fixed[j] = JS.SV.newV (9, v);
} else if (Clazz.instanceOf (v, JU.M34)) {
fixed[j] = JS.SV.newV (Clazz.instanceOf (v, JU.M4) ? 12 : 11, v);
} else if (Clazz.instanceOf (v, java.util.Map) || Clazz.instanceOf (v, JS.ScriptContext) && (v = (v).getFullMap ()) != null) {
fixed[j] = JS.SV.newV (6, (isExpression ? v : JS.SV.deepCopy (v, true, true)));
} else if (Clazz.instanceOf (v, JU.Lst)) {
if (!isExpression) {
fixed[j] = JS.SV.newV (7, JS.SV.deepCopy (v, false, true));
break;
}var sv = v;
var bs = null;
for (var k = 0; k < sv.size (); k++) {
var svk = sv.get (k);
if (svk.tok != 10) {
bs = null;
break;
}if (bs == null) bs =  new JU.BS ();
bs.or (svk.value);
}
fixed[j] = (bs == null ? JS.SV.getVariable (v) : JS.T.o (10, bs));
} else {
var center = (this).getObjectCenter ($var, -2147483648, -2147483648);
if (center == null) this.invArg ();
fixed[j] = JS.T.o (8, center);
}if (isSetAt && !JS.T.tokAttr (fixed[j].tok, 536870912)) this.invArg ();
break;
}
j++;
}
this.st = fixed;
for (i = j; i < this.st.length; i++) this.st[i] = null;

this.slen = j;
return true;
}, "~A,~N");
});
