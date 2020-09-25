Clazz.declarePackage ("J.jvxl.readers");
Clazz.load (["J.jvxl.readers.BCifDensityReader"], "J.jvxl.readers.CifDensityReader", ["java.lang.Float", "$.Number", "JU.P3", "$.PT"], function () {
c$ = Clazz.declareType (J.jvxl.readers, "CifDensityReader", J.jvxl.readers.BCifDensityReader);
Clazz.makeConstructor (c$, 
function () {
Clazz.superConstructor (this, J.jvxl.readers.CifDensityReader, []);
});
Clazz.overrideMethod (c$, "getCifData", 
function (fileName, data) {
this.cifData = this.sg.atomDataServer.readCifData (fileName, data, "CIF");
}, "~S,~O");
Clazz.overrideMethod (c$, "readCifP3", 
function (key, p3) {
if (p3 == null) p3 =  new JU.P3 ();
var x = this.getCifFloat (key + "[0]");
if (Float.isNaN (x)) {
p3.x = NaN;
} else {
p3.x = x;
p3.y = this.getCifFloat (key + "[1]");
p3.z = this.getCifFloat (key + "[2]");
}return p3;
}, "~S,JU.P3");
Clazz.overrideMethod (c$, "getCifMap", 
function (type) {
type = "data_" + type;
var list = this.cifData.get ("models");
for (var i = 0; i < list.size (); i++) {
var map = list.get (i);
if (type.equalsIgnoreCase (map.get ("name").toString ())) return this.thisData = map;
}
return null;
}, "~S");
Clazz.overrideMethod (c$, "getCifFloat", 
function (key) {
var o = this.thisData.get (key);
var x = NaN;
if (o != null) {
if (Clazz.instanceOf (o, String)) {
x = JU.PT.parseFloat (o);
} else if (Clazz.instanceOf (o, Number)) {
x = (o).floatValue ();
}}return x;
}, "~S");
Clazz.overrideMethod (c$, "readCifFloats", 
function (key, values) {
var list = this.thisData.get (key);
for (var i = 0, n = values.length; i < n; i++) values[i] = JU.PT.parseFloat (list.get (i));

return values;
}, "~S,~A");
});
