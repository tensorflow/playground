Clazz.declarePackage ("J.shapecgo");
Clazz.load (["J.shapespecial.DrawMesh", "JU.Lst"], "J.shapecgo.CGOMesh", ["java.lang.Float", "$.Number", "$.Short", "java.util.Hashtable", "JU.BS", "$.CU", "$.PT", "JU.C", "$.Logger", "$.Normix"], function () {
c$ = Clazz.decorateAsClass (function () {
this.cmds = null;
this.nList = null;
this.cList = null;
Clazz.instantialize (this, arguments);
}, J.shapecgo, "CGOMesh", J.shapespecial.DrawMesh);
Clazz.prepareFields (c$, function () {
this.nList =  new JU.Lst ();
this.cList =  new JU.Lst ();
});
c$.getSize = Clazz.defineMethod (c$, "getSize", 
function (i, is2D) {
switch (i) {
case -103:
return 13;
case -102:
return 15;
case -108:
case -109:
case -110:
return 2;
case -101:
case -100:
case -107:
return 1;
case -105:
case -106:
case -111:
case -104:
return 0;
default:
return (i >= 0 && i < J.shapecgo.CGOMesh.sizes.length ? (is2D ? J.shapecgo.CGOMesh.sizes2D : J.shapecgo.CGOMesh.sizes)[i] : -1);
}
}, "~N,~B");
c$.getKeyMap = Clazz.defineMethod (c$, "getKeyMap", 
function () {
var keyMap =  new java.util.Hashtable ();
var tokens = JU.PT.getTokens ("BEGIN:2 END:3 STOP:0 POINT:0 POINTS:0 LINES:1 LINE_LOOP:2 LINE_STRIP:3 TRIANGLES:4 TRIANGLE_STRIP:5 TRIANGLE_FAN:6 LINE:1 VERTEX:4 NORMAL:5 COLOR:6 LINEWIDTH:10 SAUSAGE:14 DIAMETER:-100 SCREEN:-101 UVMAP:-102 PS:-103 NEWPATH:-104 CLOSEPATH:-105 STROKE:-106 SETLINEWIDTH:-107 SCALE:-108 MOVETO:-109 LINETO:-110 SHOWPAGE:-111");
for (var i = tokens.length; --i >= 0; ) {
var pt = tokens[i].indexOf (":");
keyMap.put (tokens[i].substring (0, pt), Integer.$valueOf (Integer.parseInt (tokens[i].substring (pt + 1))));
}
return keyMap;
});
c$.getData = Clazz.defineMethod (c$, "getData", 
function (d) {
if (J.shapecgo.CGOMesh.keyMap == null) J.shapecgo.CGOMesh.keyMap = J.shapecgo.CGOMesh.getKeyMap ();
var st = d[0];
var ai = d[1];
var data = d[2];
var vwr = d[3];
var i = ai[0];
var slen = ai[1];
var tok = st[i].tok;
i = (tok == 268435520 ? i + 1 : i + 2);
if (i >= slen) return false;
var s = st[i].value.toString ().toUpperCase ();
var type = ";PS;BEGIN;SCREEN;UVMAP;".indexOf (";" + s + ";");
i = J.shapecgo.CGOMesh.addItems (i, st, slen, data, vwr);
if (type == 0) {
if (i + 5 >= slen || st[i + 1].tok != 134221834) return false;
if (!J.shapecgo.CGOMesh.parseEPSData (st[i + 3].value.toString (), data)) return false;
i += 5;
}ai[0] = i;
return true;
}, "~A");
c$.parseEPSData = Clazz.defineMethod (c$, "parseEPSData", 
 function (eps, data) {
var pt = eps.indexOf ("%%BoundingBox:");
if (pt < 0) return false;
var stack =  new JU.Lst ();
var next =  Clazz.newIntArray (-1, [pt + 14]);
for (var i = 0; i < 4; i++) data.addLast (Float.$valueOf (JU.PT.parseFloatNext (eps, next)));

pt = eps.indexOf ("%%EndProlog");
if (pt < 0) return false;
next[0] = pt + 11;
var len = eps.length;
while (true) {
var f = JU.PT.parseFloatChecked (eps, len, next, false);
if (next[0] >= len) break;
if (Float.isNaN (f)) {
var s = JU.PT.parseTokenChecked (eps, len, next);
if (s.startsWith ("%%")) continue;
if (!J.shapecgo.CGOMesh.addKey (data, s)) return false;
if (stack.size () > 0) {
for (var k = 0, n = stack.size (); k < n; k++) data.addLast (stack.get (k));

stack.clear ();
}} else {
stack.addLast (Float.$valueOf (f));
}}
return true;
}, "~S,JU.Lst");
c$.addItems = Clazz.defineMethod (c$, "addItems", 
 function (i, st, slen, data, vwr) {
var tok;
var t;
for (var j = i; j < slen; j++) {
switch (tok = (t = st[j]).tok) {
case 268435521:
i = j;
j = slen;
continue;
case 2:
data.addLast (Float.$valueOf (t.intValue));
break;
case 3:
data.addLast (t.value);
break;
case 8:
case 10:
var pt = (tok == 8 ? t.value : vwr.ms.getAtomSetCenter (t.value));
data.addLast (Float.$valueOf (pt.x));
data.addLast (Float.$valueOf (pt.y));
data.addLast (Float.$valueOf (pt.z));
break;
default:
if (!J.shapecgo.CGOMesh.addKey (data, st[j].value.toString ())) {
JU.Logger.error ("CGO unknown: " + st[j].value);
i = j = slen;
break;
}break;
}
}
return i;
}, "~N,~A,~N,JU.Lst,JV.Viewer");
c$.addKey = Clazz.defineMethod (c$, "addKey", 
 function (data, key) {
key = key.toUpperCase ();
var ii = J.shapecgo.CGOMesh.keyMap.get (key.toUpperCase ());
if (ii == null) return false;
data.addLast (ii);
return true;
}, "JU.Lst,~S");
Clazz.defineMethod (c$, "clear", 
function (meshType) {
Clazz.superCall (this, J.shapecgo.CGOMesh, "clear", [meshType]);
this.useColix = false;
}, "~S");
Clazz.defineMethod (c$, "set", 
function (list) {
this.width = 200;
this.diameter = 0;
this.useColix = true;
this.bsTemp =  new JU.BS ();
try {
if (Clazz.instanceOf (list.get (0), Number)) {
this.cmds = list;
} else {
this.cmds = list.get (1);
if (this.cmds == null) this.cmds = list.get (0);
this.cmds = this.cmds.get (1);
}var n = this.cmds.size ();
var is2D = false;
for (var i = 0; i < n; i++) {
var type = (this.cmds.get (i)).intValue ();
var len = J.shapecgo.CGOMesh.getSize (type, is2D);
if (len < 0) {
JU.Logger.error ("CGO unknown type: " + type);
return false;
}switch (type) {
case -101:
case -102:
is2D = true;
break;
case 1:
break;
case 0:
return true;
case 5:
this.addNormix (i + 1);
break;
case 6:
this.addColix (i + 1);
this.useColix = false;
break;
case 14:
this.addColix (i + 8);
this.addColix (i + 11);
break;
case 8:
this.addNormix (i + 10);
this.addNormix (i + 13);
this.addNormix (i + 16);
this.addColix (i + 19);
this.addColix (i + 22);
this.addColix (i + 25);
break;
}
i += len;
}
return true;
} catch (e) {
if (Clazz.exceptionOf (e, Exception)) {
JU.Logger.error ("CGOMesh error: " + e);
this.cmds = null;
return false;
} else {
throw e;
}
}
}, "JU.Lst");
Clazz.defineMethod (c$, "addColix", 
 function (i) {
this.getPoint (i, this.vTemp);
this.cList.addLast (Short.$valueOf (JU.C.getColix (JU.CU.colorPtToFFRGB (this.vTemp))));
}, "~N");
Clazz.defineMethod (c$, "addNormix", 
 function (i) {
this.getPoint (i, this.vTemp);
this.nList.addLast (Short.$valueOf (JU.Normix.get2SidedNormix (this.vTemp, this.bsTemp)));
}, "~N");
Clazz.defineMethod (c$, "getPoint", 
function (i, pt) {
pt.set (this.getFloat (i++), this.getFloat (i++), this.getFloat (i));
}, "~N,JU.T3");
Clazz.defineMethod (c$, "getInt", 
function (i) {
return (this.cmds.get (i)).intValue ();
}, "~N");
Clazz.defineMethod (c$, "getFloat", 
function (i) {
return (this.cmds.get (i)).floatValue ();
}, "~N");
Clazz.defineStatics (c$,
"GL_POINTS", 0,
"GL_LINES", 1,
"GL_LINE_LOOP", 2,
"GL_LINE_STRIP", 3,
"GL_TRIANGLES", 4,
"GL_TRIANGLE_STRIP", 5,
"GL_TRIANGLE_FAN", 6,
"STOP", 0,
"SIMPLE_LINE", 1,
"BEGIN", 2,
"END", 3,
"VERTEX", 4,
"NORMAL", 5,
"COLOR", 6,
"SPHERE", 7,
"TRICOLOR_TRIANGLE", 8,
"CYLINDER", 9,
"LINEWIDTH", 10,
"WIDTHSCALE", 11,
"ENABLE", 12,
"DISABLE", 13,
"SAUSAGE", 14,
"CUSTOM_CYLINDER", 15,
"DOTWIDTH", 16,
"ALPHA_TRIANGLE", 17,
"ELLIPSOID", 18,
"FONT", 19,
"FONT_SCALE", 20,
"FONT_VERTEX", 21,
"FONT_AXES", 22,
"CHAR", 23,
"INDENT", 24,
"ALPHA", 25,
"QUADRIC", 26,
"CONE", 27,
"RESET_NORMAL", 28,
"PICK_COLOR", 29,
"sizes",  Clazz.newIntArray (-1, [0, 8, 1, 0, 3, 3, 3, 4, 27, 13, 1, 1, 1, 1, 13, 15, 1, 35, 13, 3, 2, 3, 9, 1, 2, 1, 14, 16, 1, 2]),
"sizes2D",  Clazz.newIntArray (-1, [0, 6, 1, 0, 2, 3, 3, 4, 24, 13, 1, 1, 1, 1, 11, 15, 1, 35, 13, 3, 2, 3, 9, 1, 2, 1, 14, 16, 1, 2]),
"JMOL_DIAMETER", -100,
"JMOL_SCREEN", -101,
"JMOL_UVMAP", -102,
"JMOL_PS", -103,
"PS_NEWPATH", -104,
"PS_CLOSEPATH", -105,
"PS_STROKE", -106,
"PS_SETLINEWIDTH", -107,
"PS_SCALE", -108,
"PS_MOVETO", -109,
"PS_LINETO", -110,
"PS_SHOWPAGE", -111,
"KEY_LIST", "BEGIN:2 END:3 STOP:0 POINT:0 POINTS:0 LINES:1 LINE_LOOP:2 LINE_STRIP:3 TRIANGLES:4 TRIANGLE_STRIP:5 TRIANGLE_FAN:6 LINE:1 VERTEX:4 NORMAL:5 COLOR:6 LINEWIDTH:10 SAUSAGE:14 DIAMETER:-100 SCREEN:-101 UVMAP:-102 PS:-103 NEWPATH:-104 CLOSEPATH:-105 STROKE:-106 SETLINEWIDTH:-107 SCALE:-108 MOVETO:-109 LINETO:-110 SHOWPAGE:-111",
"keyMap", null);
});
