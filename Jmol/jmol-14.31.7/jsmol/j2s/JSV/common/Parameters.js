Clazz.declarePackage ("JSV.common");
Clazz.load (null, "JSV.common.Parameters", ["java.lang.Boolean", "java.util.Hashtable", "JSV.common.ScriptToken"], function () {
c$ = Clazz.decorateAsClass (function () {
this.name = null;
this.integralMinY = 0.1;
this.integralRange = 50.0;
this.integralOffset = 30.0;
this.integralDrawAll = false;
this.viewOffset = 0;
this.peakListThreshold = NaN;
this.peakListInterpolation = "parabolic";
this.precision = 2;
this.htBooleans = null;
Clazz.instantialize (this, arguments);
}, JSV.common, "Parameters");
Clazz.makeConstructor (c$, 
function () {
this.htBooleans =  new java.util.Hashtable ();
this.setBoolean (JSV.common.ScriptToken.TITLEON, true);
this.setBoolean (JSV.common.ScriptToken.ENABLEZOOM, true);
this.setBoolean (JSV.common.ScriptToken.DISPLAY2D, true);
this.setBoolean (JSV.common.ScriptToken.COORDINATESON, true);
this.setBoolean (JSV.common.ScriptToken.PEAKTABSON, true);
this.setBoolean (JSV.common.ScriptToken.POINTSONLY, false);
this.setBoolean (JSV.common.ScriptToken.GRIDON, true);
this.setBoolean (JSV.common.ScriptToken.XSCALEON, true);
this.setBoolean (JSV.common.ScriptToken.YSCALEON, true);
this.setBoolean (JSV.common.ScriptToken.XUNITSON, true);
this.setBoolean (JSV.common.ScriptToken.YUNITSON, true);
});
Clazz.defineMethod (c$, "setName", 
function (name) {
this.name = name;
return this;
}, "~S");
Clazz.defineMethod (c$, "getBooleans", 
function () {
return this.htBooleans;
});
Clazz.defineMethod (c$, "setBoolean", 
function (st, val) {
this.htBooleans.put (st, Boolean.$valueOf (val));
return val;
}, "JSV.common.ScriptToken,~B");
Clazz.defineMethod (c$, "getBoolean", 
function (t) {
return Boolean.TRUE === this.htBooleans.get (t);
}, "JSV.common.ScriptToken");
c$.isTrue = Clazz.defineMethod (c$, "isTrue", 
function (value) {
return (value.length == 0 || Boolean.parseBoolean (value));
}, "~S");
c$.getTFToggle = Clazz.defineMethod (c$, "getTFToggle", 
function (value) {
return (value.equalsIgnoreCase ("TOGGLE") ? null : JSV.common.Parameters.isTrue (value) ? Boolean.TRUE : Boolean.FALSE);
}, "~S");
Clazz.defineMethod (c$, "setP", 
function (pd, st, value) {
switch (st) {
default:
return;
case JSV.common.ScriptToken.COORDINATESON:
case JSV.common.ScriptToken.DISPLAY1D:
case JSV.common.ScriptToken.DISPLAY2D:
case JSV.common.ScriptToken.ENABLEZOOM:
case JSV.common.ScriptToken.GRIDON:
case JSV.common.ScriptToken.POINTSONLY:
case JSV.common.ScriptToken.PEAKTABSON:
case JSV.common.ScriptToken.REVERSEPLOT:
case JSV.common.ScriptToken.TITLEON:
case JSV.common.ScriptToken.TITLEBOLDON:
case JSV.common.ScriptToken.XSCALEON:
case JSV.common.ScriptToken.XUNITSON:
case JSV.common.ScriptToken.YSCALEON:
case JSV.common.ScriptToken.YUNITSON:
var tfToggle = JSV.common.Parameters.getTFToggle (value);
if (tfToggle != null) {
this.setBoolean (st, tfToggle.booleanValue ());
break;
}if (pd == null) return;
var b = !pd.getBoolean (st);
switch (st) {
default:
break;
case JSV.common.ScriptToken.XSCALEON:
this.setBoolean (JSV.common.ScriptToken.XUNITSON, b);
pd.setBoolean (JSV.common.ScriptToken.XUNITSON, b);
break;
case JSV.common.ScriptToken.YSCALEON:
this.setBoolean (JSV.common.ScriptToken.YUNITSON, b);
pd.setBoolean (JSV.common.ScriptToken.YUNITSON, b);
break;
}
this.setBoolean (st, b);
break;
}
if (pd == null) return;
pd.setBooleans (this, st);
}, "JSV.common.PanelData,JSV.common.ScriptToken,~S");
c$.isMatch = Clazz.defineMethod (c$, "isMatch", 
function (match, key) {
return match == null || key.equalsIgnoreCase (match);
}, "~S,~S");
c$.putInfo = Clazz.defineMethod (c$, "putInfo", 
function (match, info, key, value) {
if (value != null && JSV.common.Parameters.isMatch (match, key)) info.put (match == null ? key : match, value);
}, "~S,java.util.Map,~S,~O");
});
