Clazz.declarePackage ("JSV.js2d");
Clazz.load (["JSV.common.ColorParameters"], "JSV.js2d.JsParameters", ["JS.Color"], function () {
c$ = Clazz.declareType (JSV.js2d, "JsParameters", JSV.common.ColorParameters);
Clazz.makeConstructor (c$, 
function () {
Clazz.superConstructor (this, JSV.js2d.JsParameters, []);
});
Clazz.overrideMethod (c$, "isValidFontName", 
function (name) {
return true;
}, "~S");
Clazz.overrideMethod (c$, "getColor1", 
function (rgb) {
return JS.Color.get1 (rgb);
}, "~N");
Clazz.overrideMethod (c$, "getColor3", 
function (r, g, b) {
return JS.Color.get3 (r, g, b);
}, "~N,~N,~N");
Clazz.defineMethod (c$, "copy", 
function (newName) {
return ( new JSV.js2d.JsParameters ().setName (newName)).setElementColors (this);
}, "~S");
});
