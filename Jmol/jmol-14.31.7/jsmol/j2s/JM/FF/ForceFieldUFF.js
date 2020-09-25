Clazz.declarePackage ("JM.FF");
Clazz.load (["JM.FF.ForceField", "JS.T"], "JM.FF.ForceFieldUFF", ["java.util.Hashtable", "JU.BS", "$.Lst", "$.PT", "JM.FF.CalculationsUFF", "$.FFParam", "JU.Elements", "$.Logger", "JV.JmolAsyncException"], function () {
c$ = Clazz.decorateAsClass (function () {
this.bsAromatic = null;
Clazz.instantialize (this, arguments);
}, JM.FF, "ForceFieldUFF", JM.FF.ForceField);
Clazz.makeConstructor (c$, 
function (minimizer) {
Clazz.superConstructor (this, JM.FF.ForceFieldUFF, []);
this.minimizer = minimizer;
this.name = "UFF";
}, "JM.Minimizer");
Clazz.overrideMethod (c$, "clear", 
function () {
this.bsAromatic = null;
});
Clazz.overrideMethod (c$, "setModel", 
function (bsElements, elemnoMax) {
this.setModelFields ();
JU.Logger.info ("minimize: setting atom types...");
if (JM.FF.ForceFieldUFF.atomTypes == null && (JM.FF.ForceFieldUFF.atomTypes = this.getAtomTypes ()) == null) return false;
if (JM.FF.ForceFieldUFF.ffParams == null && (JM.FF.ForceFieldUFF.ffParams = this.getFFParameters ()) == null) return false;
this.setAtomTypes (bsElements, elemnoMax);
this.calc =  new JM.FF.CalculationsUFF (this, JM.FF.ForceFieldUFF.ffParams, this.minAtoms, this.minBonds, this.minAngles, this.minTorsions, this.minPositions, this.minimizer.constraints);
return this.calc.setupCalculations ();
}, "JU.BS,~N");
Clazz.defineMethod (c$, "setAtomTypes", 
 function (bsElements, elemnoMax) {
var nTypes = JM.FF.ForceFieldUFF.atomTypes.size ();
bsElements.clear (0);
for (var i = 0; i < nTypes; i++) {
var data = JM.FF.ForceFieldUFF.atomTypes.get (i);
var smarts = data[0];
if (smarts == null) continue;
var search = this.getSearch (smarts, elemnoMax, bsElements);
if (bsElements.get (0)) bsElements.clear (0);
 else if (search == null) break;
 else for (var j = this.minimizer.bsAtoms.nextSetBit (0), pt = 0; j < this.minimizer.atoms.length && j >= 0; j = this.minimizer.bsAtoms.nextSetBit (j + 1), pt++) if (search.get (j)) this.minAtoms[pt].sType = data[1].intern ();

}
}, "JU.BS,~N");
Clazz.defineMethod (c$, "getSearch", 
 function (smarts, elemnoMax, bsElements) {
var search = null;
var len = smarts.length;
search = JM.FF.ForceFieldUFF.tokenTypes[0];
var n = smarts.charCodeAt (len - 2) - 48;
var elemNo = 0;
if (n >= 10) n = 0;
var isAromatic = false;
if (smarts.charAt (1) == '#') {
elemNo = JU.PT.parseInt (smarts.substring (2, len - 1));
} else {
var s = smarts.substring (1, (n > 0 ? len - 3 : len - 1));
if (s.equals (s.toLowerCase ())) {
s = s.toUpperCase ();
isAromatic = true;
}elemNo = JU.Elements.elementNumberFromSymbol (s, false);
}if (elemNo > elemnoMax) return null;
if (!bsElements.get (elemNo)) {
bsElements.set (0);
return null;
}switch (smarts.charAt (len - 3)) {
case 'D':
search = JM.FF.ForceFieldUFF.tokenTypes[2];
search[6].intValue = n;
break;
case '^':
search = JM.FF.ForceFieldUFF.tokenTypes[4 + (n - 1)];
break;
case '+':
search = JM.FF.ForceFieldUFF.tokenTypes[1];
search[5].intValue = n;
break;
case '-':
search = JM.FF.ForceFieldUFF.tokenTypes[1];
search[5].intValue = -n;
break;
case 'A':
search = JM.FF.ForceFieldUFF.tokenTypes[6];
break;
}
search[2].intValue = elemNo;
var v = this.minimizer.vwr.evaluateExpression (search);
if (!(Clazz.instanceOf (v, JU.BS))) return null;
var bs = v;
if (isAromatic && bs.nextSetBit (0) >= 0) {
if (this.bsAromatic == null) this.bsAromatic = this.minimizer.vwr.evaluateExpression (JM.FF.ForceFieldUFF.tokenTypes[3]);
bs.and (this.bsAromatic);
}if (JU.Logger.debugging && bs.nextSetBit (0) >= 0) JU.Logger.debug (smarts + " minimize atoms=" + bs);
return bs;
}, "~S,~N,JU.BS");
Clazz.defineMethod (c$, "getFFParameters", 
 function () {
var ffParam;
var temp =  new java.util.Hashtable ();
var resourceName = "UFF.txt";
var br = null;
try {
br = this.getBufferedReader (resourceName);
var line;
while ((line = br.readLine ()) != null) {
var vs = JU.PT.getTokens (line);
if (vs.length < 13) continue;
if (JU.Logger.debugging) JU.Logger.debug (line);
if (line.substring (0, 5).equals ("param")) {
ffParam =  new JM.FF.FFParam ();
temp.put (vs[1], ffParam);
ffParam.dVal =  Clazz.newDoubleArray (11, 0);
ffParam.sVal =  new Array (1);
ffParam.sVal[0] = vs[1];
ffParam.dVal[0] = JU.PT.parseFloat (vs[2]);
ffParam.dVal[1] = JU.PT.parseFloat (vs[3]) * 0.017453292519943295;
ffParam.dVal[2] = JU.PT.parseFloat (vs[4]);
ffParam.dVal[3] = JU.PT.parseFloat (vs[5]);
ffParam.dVal[4] = JU.PT.parseFloat (vs[6]);
ffParam.dVal[5] = JU.PT.parseFloat (vs[7]);
ffParam.dVal[6] = JU.PT.parseFloat (vs[8]);
ffParam.dVal[7] = JU.PT.parseFloat (vs[9]);
ffParam.dVal[8] = JU.PT.parseFloat (vs[10]);
ffParam.dVal[9] = JU.PT.parseFloat (vs[11]);
ffParam.dVal[10] = JU.PT.parseFloat (vs[12]);
ffParam.iVal =  Clazz.newIntArray (1, 0);
var coord = (vs[1].length > 2 ? vs[1].charAt (2) : '1');
switch (coord) {
case 'R':
coord = '2';
break;
default:
coord = '1';
break;
case '1':
case '2':
case '3':
case '4':
case '5':
case '6':
break;
}
ffParam.iVal[0] = coord.charCodeAt (0) - 48;
}}
br.close ();
} catch (e) {
if (Clazz.exceptionOf (e, Exception)) {
System.err.println ("Exception " + e.toString () + " in getResource " + resourceName);
try {
br.close ();
} catch (ee) {
if (Clazz.exceptionOf (ee, Exception)) {
} else {
throw ee;
}
}
return null;
} else {
throw e;
}
}
JU.Logger.info (temp.size () + " atom types read from " + resourceName);
return temp;
});
Clazz.defineMethod (c$, "getAtomTypes", 
 function () {
var types =  new JU.Lst ();
var fileName = "UFF.txt";
try {
var br = this.getBufferedReader (fileName);
var line;
while ((line = br.readLine ()) != null) {
if (line.length > 4 && line.substring (0, 4).equals ("atom")) {
var vs = JU.PT.getTokens (line);
var info =  Clazz.newArray (-1, [vs[1], vs[2]]);
types.addLast (info);
}}
br.close ();
} catch (e$$) {
if (Clazz.exceptionOf (e$$, JV.JmolAsyncException)) {
var e = e$$;
{
throw  new JV.JmolAsyncException (e.getFileName ());
}
} else if (Clazz.exceptionOf (e$$, Exception)) {
var e = e$$;
{
System.err.println ("Exception " + e.toString () + " in getResource " + fileName);
}
} else {
throw e$$;
}
}
JU.Logger.info (types.size () + " UFF parameters read");
return (types.size () > 0 ? types : null);
});
Clazz.defineStatics (c$,
"atomTypes", null,
"ffParams", null,
"TOKEN_ELEMENT_ONLY", 0,
"TOKEN_ELEMENT_CHARGED", 1,
"TOKEN_ELEMENT_CONNECTED", 2,
"TOKEN_AROMATIC", 3,
"TOKEN_ELEMENT_SP", 4,
"TOKEN_ELEMENT_ALLYLIC", 6,
"PT_ELEMENT", 2,
"PT_CHARGE", 5,
"PT_CONNECT", 6);
c$.tokenTypes = c$.prototype.tokenTypes =  Clazz.newArray (-1, [ Clazz.newArray (-1, [JS.T.tokenExpressionBegin, JS.T.n (268435860, 1094715402), JS.T.i (0), JS.T.tokenExpressionEnd]),  Clazz.newArray (-1, [JS.T.tokenExpressionBegin, JS.T.n (268435860, 1094715402), JS.T.i (0), JS.T.tokenAnd, JS.T.n (268435860, 1631586315), JS.T.i (0), JS.T.tokenExpressionEnd]),  Clazz.newArray (-1, [JS.T.tokenExpressionBegin, JS.T.n (268435860, 1094715402), JS.T.i (0), JS.T.tokenAnd, JS.T.tokenConnected, JS.T.tokenLeftParen, JS.T.i (0), JS.T.tokenRightParen, JS.T.tokenExpressionEnd]),  Clazz.newArray (-1, [JS.T.tokenExpressionBegin, JS.T.o (1073741824, "flatring"), JS.T.tokenExpressionEnd]),  Clazz.newArray (-1, [JS.T.tokenExpressionBegin, JS.T.n (268435860, 1094715402), JS.T.i (0), JS.T.tokenAnd, JS.T.tokenLeftParen, JS.T.tokenConnected, JS.T.tokenLeftParen, JS.T.i (1), JS.T.tokenComma, JS.T.o (4, "triple"), JS.T.tokenRightParen, JS.T.tokenOr, JS.T.tokenConnected, JS.T.tokenLeftParen, JS.T.i (2), JS.T.tokenComma, JS.T.o (4, "double"), JS.T.tokenRightParen, JS.T.tokenRightParen, JS.T.tokenExpressionEnd]),  Clazz.newArray (-1, [JS.T.tokenExpressionBegin, JS.T.n (268435860, 1094715402), JS.T.i (0), JS.T.tokenAnd, JS.T.o (134217736, "connected"), JS.T.tokenLeftParen, JS.T.i (1), JS.T.tokenComma, JS.T.o (4, "double"), JS.T.tokenRightParen, JS.T.tokenExpressionEnd]),  Clazz.newArray (-1, [JS.T.tokenExpressionBegin, JS.T.n (268435860, 1094715402), JS.T.i (0), JS.T.tokenAnd, JS.T.tokenConnected, JS.T.tokenLeftParen, JS.T.i (3), JS.T.tokenRightParen, JS.T.tokenAnd, JS.T.tokenConnected, JS.T.tokenLeftParen, JS.T.tokenConnected, JS.T.tokenLeftParen, JS.T.o (4, "double"), JS.T.tokenRightParen, JS.T.tokenRightParen, JS.T.tokenExpressionEnd])]);
});
