Clazz.declarePackage ("org.qcschema");
Clazz.load (["java.util.Hashtable", "JV.Viewer"], "org.qcschema.QCSchemaUnits", ["java.lang.Double", "java.util.Map"], function () {
c$ = Clazz.declareType (org.qcschema, "QCSchemaUnits");
c$.getFactorToAU = Clazz.defineMethod (c$, "getFactorToAU", 
function (units) {
switch ("cm cm^-1 cm-1 angstroms au atomic units fractional bohrs hartrees ev kj_mol kcal_mol".indexOf (units.toLowerCase ())) {
case 0:
return 1.8897261254578283E8;
case 1:
return 1.889726125457828E10;
case 3:
case 9:
return 4.55633590401805E-6;
case 14:
return 1.8897261254578281;
case 24:
case 27:
return 1;
case 40:
return 0;
case 51:
return 1.0;
case 57:
return 1.0;
case 66:
return 0.0367498438131638;
case 69:
return 0.0015936254980079682;
case 76:
return 3.7943464238284955E-4;
default:
return NaN;
}
}, "~S");
c$.getUnitConversion = Clazz.defineMethod (c$, "getUnitConversion", 
function (fromUnits, toUnits) {
if (fromUnits.equalsIgnoreCase (toUnits)) return 1;
var key = "" + fromUnits + toUnits;
var d = org.qcschema.QCSchemaUnits.htConvert.get (key);
if (d != null) return d.doubleValue ();
var val = NaN;
try {
var toAUDesired = org.qcschema.QCSchemaUnits.getFactorToAU (toUnits);
var toAUActual = org.qcschema.QCSchemaUnits.getFactorToAU (fromUnits);
val = toAUActual / toAUDesired;
} catch (e) {
if (Clazz.exceptionOf (e, Exception)) {
} else {
throw e;
}
}
org.qcschema.QCSchemaUnits.htConvert.put (key, Double.$valueOf (val));
return val;
}, "~S,~S");
c$.getConversionFactorTo = Clazz.defineMethod (c$, "getConversionFactorTo", 
function (unitsFactor, unitsDesired) {
try {
var toAUDesired = org.qcschema.QCSchemaUnits.getFactorToAU (unitsDesired);
var toAUActual = org.qcschema.QCSchemaUnits.getFactorToAU (unitsFactor == null ? "au" : unitsFactor.get (0).toString ());
if (Double.isNaN (toAUActual)) toAUActual = Double.parseDouble (unitsFactor.get (1).toString ());
return toAUActual / toAUDesired;
} catch (e) {
if (Clazz.exceptionOf (e, Exception)) {
return NaN;
} else {
throw e;
}
}
}, "java.util.ArrayList,~S");
c$.convertValue = Clazz.defineMethod (c$, "convertValue", 
function (valueUnits, toUnits) {
return org.qcschema.QCSchemaUnits.getDouble (valueUnits, "value", null) * org.qcschema.QCSchemaUnits.getConversionFactor (valueUnits, "units", toUnits);
}, "java.util.Map,~S");
c$.getUnitsJSON = Clazz.defineMethod (c$, "getUnitsJSON", 
function (name, asArray) {
var d = org.qcschema.QCSchemaUnits.getFactorToAU (name);
var toAU = (!Double.isNaN (d) ? "" + d : asArray ? "?" : "\"?\"");
return (asArray ?  Clazz.newArray (-1, [name, toAU]) : "[\"" + name + "\"," + toAU + "]");
}, "~S,~B");
c$.getConversionFactor = Clazz.defineMethod (c$, "getConversionFactor", 
function (map, key, toUnits) {
var list = org.qcschema.QCSchemaUnits.getList (map, key + "_units");
var units = (list == null ? null : list.get (0).toString ());
var f = org.qcschema.QCSchemaUnits.getConversionFactorTo (list, toUnits);
if (Double.isNaN (f)) {
System.out.println ("units for " + units + "? " + units);
f = 1;
}return f;
}, "java.util.Map,~S,~S");
c$.getDouble = Clazz.defineMethod (c$, "getDouble", 
function (map, key, toUnits) {
var o = map.get (key);
var conv = 1;
if (toUnits != null) if (Clazz.instanceOf (o, java.util.Map)) {
return org.qcschema.QCSchemaUnits.convertValue (o, toUnits);
} else if (map.containsKey (key + "_units")) {
conv = org.qcschema.QCSchemaUnits.getConversionFactor (map, key, toUnits);
}return (o == null ? NaN : (o).doubleValue () * conv);
}, "java.util.Map,~S,~S");
c$.getList = Clazz.defineMethod (c$, "getList", 
function (mapOrList, key) {
var list = (key == null ? mapOrList : (mapOrList).get (key));
if (list == null) return null;
var n = list.size ();
if (n == 0 || !"_RLE_".equals (list.get (0))) return list;
var list1 = org.qcschema.QCSchemaUnits.newList ();
for (var i = 1; i < n; i++) {
var count = (list.get (i)).intValue ();
var value = list.get (++i);
for (var j = 0; j < count; j++) {
list1.addLast(value);
}
}
return list1;
}, "~O,~S");
c$.newList = Clazz.defineMethod (c$, "newList", 
function () {
return new JU  .Lst();
});
c$.getDoubleArray = Clazz.defineMethod (c$, "getDoubleArray", 
function (mapOrList, key) {
var list = org.qcschema.QCSchemaUnits.getList (mapOrList, key);
if (list == null) return null;
var a =  Clazz.newDoubleArray (list.size (), 0);
for (var i = a.length; --i >= 0; ) {
try {
a[i] = (list.get (i)).doubleValue ();
} catch (e) {
if (Clazz.exceptionOf (e, Exception)) {
a[i] = NaN;
} else {
throw e;
}
}
}
return a;
}, "~O,~S");
c$.getIntArray = Clazz.defineMethod (c$, "getIntArray", 
function (mapOrList, key) {
var list = org.qcschema.QCSchemaUnits.getList (mapOrList, key);
if (list != null) {
try {
var a =  Clazz.newIntArray (list.size (), 0);
for (var i = a.length; --i >= 0; ) a[i] = (list.get (i)).intValue ();

return a;
} catch (e) {
if (Clazz.exceptionOf (e, Exception)) {
} else {
throw e;
}
}
}return null;
}, "~O,~S");
c$.getStringArray = Clazz.defineMethod (c$, "getStringArray", 
function (mapOrList, key) {
var list = org.qcschema.QCSchemaUnits.getList (mapOrList, key);
if (list == null) return null;
var a =  new Array (list.size ());
for (var i = a.length; --i >= 0; ) {
var o = list.get (i);
a[i] = (o == null ? null : list.get (i).toString ());
}
return a;
}, "~O,~S");
c$.version = c$.prototype.version = "QCJSON 0-0-0.Jmol_" + JV.Viewer.getJmolVersion ().$replace (' ', '_');
Clazz.defineStatics (c$,
"UNITS_FRACTIONAL", "fractional",
"UNITS_AU", "au",
"TOAU_AU", 1,
"UNITS_CM", "cm",
"TOAU_CM", 1.8897261254578283E8,
"UNITS_M", "m",
"TOAU_M", 1.889726125457828E10,
"UNITS_ANGSTROMS", "angstroms",
"TOAU_ANGSTROMS", 1.8897261254578281,
"UNITS_BOHR", "bohr",
"TOAU_BOHR", 1,
"UNITS_HARTREE", "hartree",
"TOAU_HARTREE", 1,
"UNITS_EV", "ev",
"TOAU_EV", 0.0367498438131638,
"UNITS_CM_1", "cm-1",
"TOAU_CM_1", 4.55633590401805E-6,
"UNITS_KJ_MOL", "kj/mol",
"TOAU_KJ_MOL", 3.7943464238284955E-4,
"UNITS_KCAL_MOL", "kcal/mol",
"TOAU_KCAL_MOL", 0.0015936254980079682,
"knownUnits", "cm cm^-1 cm-1 angstroms au atomic units fractional bohrs hartrees ev kj_mol kcal_mol");
c$.htConvert = c$.prototype.htConvert =  new java.util.Hashtable ();
});
