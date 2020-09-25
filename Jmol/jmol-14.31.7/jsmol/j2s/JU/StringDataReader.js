Clazz.declarePackage ("JU");
Clazz.load (["JU.DataReader"], "JU.StringDataReader", ["java.io.StringReader"], function () {
c$ = Clazz.declareType (JU, "StringDataReader", JU.DataReader);
Clazz.makeConstructor (c$, 
function (data) {
Clazz.superConstructor (this, JU.StringDataReader, [ new java.io.StringReader (data)]);
}, "~S");
Clazz.overrideMethod (c$, "setData", 
function (data) {
return  new JU.StringDataReader (data);
}, "~O");
});
