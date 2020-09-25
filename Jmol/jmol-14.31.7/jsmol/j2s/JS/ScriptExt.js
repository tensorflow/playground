Clazz.declarePackage ("JS");
Clazz.load (null, "JS.ScriptExt", ["JU.AU"], function () {
c$ = Clazz.decorateAsClass (function () {
this.vwr = null;
this.e = null;
this.chk = false;
this.st = null;
this.slen = 0;
Clazz.instantialize (this, arguments);
}, JS, "ScriptExt");
Clazz.defineMethod (c$, "init", 
function (eval) {
this.e = eval;
this.vwr = this.e.vwr;
return this;
}, "~O");
Clazz.defineMethod (c$, "atomExpressionAt", 
function (i) {
return this.e.atomExpressionAt (i);
}, "~N");
Clazz.defineMethod (c$, "checkLength", 
function (i) {
this.e.checkLength (i);
}, "~N");
Clazz.defineMethod (c$, "error", 
function (err) {
this.e.error (err);
}, "~N");
Clazz.defineMethod (c$, "invArg", 
function () {
this.e.invArg ();
});
Clazz.defineMethod (c$, "invPO", 
function () {
this.error (23);
});
Clazz.defineMethod (c$, "getShapeProperty", 
function (shapeType, propertyName) {
return this.e.getShapeProperty (shapeType, propertyName);
}, "~N,~S");
Clazz.defineMethod (c$, "paramAsStr", 
function (i) {
return this.e.paramAsStr (i);
}, "~N");
Clazz.defineMethod (c$, "centerParameter", 
function (i) {
return this.e.centerParameter (i, null);
}, "~N");
Clazz.defineMethod (c$, "floatParameter", 
function (i) {
return this.e.floatParameter (i);
}, "~N");
Clazz.defineMethod (c$, "getPoint3f", 
function (i, allowFractional) {
return this.e.getPoint3f (i, allowFractional, true);
}, "~N,~B");
Clazz.defineMethod (c$, "intParameter", 
function (index) {
return this.e.intParameter (index);
}, "~N");
Clazz.defineMethod (c$, "isFloatParameter", 
function (index) {
switch (this.e.tokAt (index)) {
case 2:
case 3:
return true;
}
return false;
}, "~N");
Clazz.defineMethod (c$, "setShapeProperty", 
function (shapeType, propertyName, propertyValue) {
this.e.setShapeProperty (shapeType, propertyName, propertyValue);
}, "~N,~S,~O");
Clazz.defineMethod (c$, "showString", 
function (s) {
this.e.showString (s);
}, "~S");
Clazz.defineMethod (c$, "stringParameter", 
function (index) {
return this.e.stringParameter (index);
}, "~N");
Clazz.defineMethod (c$, "getToken", 
function (i) {
return this.e.getToken (i);
}, "~N");
Clazz.defineMethod (c$, "tokAt", 
function (i) {
return this.e.tokAt (i);
}, "~N");
Clazz.defineMethod (c$, "setShapeId", 
function (iShape, i, idSeen) {
if (idSeen) this.invArg ();
var name = this.e.setShapeNameParameter (i).toLowerCase ();
this.setShapeProperty (iShape, "thisID", name);
return name;
}, "~N,~N,~B");
Clazz.defineMethod (c$, "getColorTrans", 
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
Clazz.defineMethod (c$, "finalizeObject", 
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
Clazz.defineMethod (c$, "getIntArray2", 
function (i) {
var list = (this.e.getToken (i)).getList ();
var faces = JU.AU.newInt2 (list.size ());
for (var vi = faces.length; --vi >= 0; ) {
var face = list.get (vi).getList ();
if (face == null) this.invArg ();
faces[vi] =  Clazz.newIntArray (face.size (), 0);
for (var vii = faces[vi].length; --vii >= 0; ) faces[vi][vii] = face.get (vii).intValue;

}
return faces;
}, "~N");
Clazz.defineMethod (c$, "getAllPoints", 
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
if (Clazz.exceptionOf (e, Exception)) {
} else {
throw e;
}
}
if (points == null || points.length < nmin) this.invArg ();
return points;
}, "~N,~N");
});
