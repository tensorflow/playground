Clazz.declarePackage ("JSV.common");
Clazz.load (["JSV.common.Parameters"], "JSV.common.ColorParameters", ["java.util.Hashtable", "$.StringTokenizer", "JU.CU", "$.Lst", "JSV.common.ScriptToken"], function () {
c$ = Clazz.decorateAsClass (function () {
this.titleFontName = null;
this.displayFontName = null;
this.elementColors = null;
this.plotColors = null;
this.isDefault = false;
Clazz.instantialize (this, arguments);
}, JSV.common, "ColorParameters", JSV.common.Parameters);
Clazz.makeConstructor (c$, 
function () {
Clazz.superConstructor (this, JSV.common.ColorParameters, []);
JSV.common.ColorParameters.BLACK = this.getColor3 (0, 0, 0);
JSV.common.ColorParameters.RED = this.getColor3 (255, 0, 0);
JSV.common.ColorParameters.LIGHT_GRAY = this.getColor3 (200, 200, 200);
JSV.common.ColorParameters.DARK_GRAY = this.getColor3 (80, 80, 80);
JSV.common.ColorParameters.BLUE = this.getColor3 (0, 0, 255);
JSV.common.ColorParameters.WHITE = this.getColor3 (255, 255, 255);
this.elementColors =  new java.util.Hashtable ();
this.setColor (JSV.common.ScriptToken.TITLECOLOR, JSV.common.ColorParameters.BLACK);
this.setColor (JSV.common.ScriptToken.UNITSCOLOR, JSV.common.ColorParameters.RED);
this.setColor (JSV.common.ScriptToken.SCALECOLOR, JSV.common.ColorParameters.BLACK);
this.setColor (JSV.common.ScriptToken.COORDINATESCOLOR, JSV.common.ColorParameters.RED);
this.setColor (JSV.common.ScriptToken.GRIDCOLOR, JSV.common.ColorParameters.LIGHT_GRAY);
this.setColor (JSV.common.ScriptToken.PLOTCOLOR, JSV.common.ColorParameters.BLUE);
this.setColor (JSV.common.ScriptToken.PLOTAREACOLOR, JSV.common.ColorParameters.WHITE);
this.setColor (JSV.common.ScriptToken.BACKGROUNDCOLOR, this.getColor3 (192, 192, 192));
this.setColor (JSV.common.ScriptToken.INTEGRALPLOTCOLOR, JSV.common.ColorParameters.RED);
this.setColor (JSV.common.ScriptToken.PEAKTABCOLOR, JSV.common.ColorParameters.RED);
this.setColor (JSV.common.ScriptToken.HIGHLIGHTCOLOR, JSV.common.ColorParameters.DARK_GRAY);
for (var i = 0; i < 8; i++) JSV.common.ColorParameters.defaultPlotColors[i] = this.getColorFromString (JSV.common.ColorParameters.defaultPlotColorNames[i]);

this.plotColors =  new Array (8);
System.arraycopy (JSV.common.ColorParameters.defaultPlotColors, 0, this.plotColors, 0, 8);
});
Clazz.defineMethod (c$, "setFor", 
function (jsvp, ds, includeMeasures) {
if (ds == null) ds = this;
if (includeMeasures) jsvp.getPanelData ().setBooleans (ds, null);
var pd = jsvp.getPanelData ();
if (pd.getCurrentPlotColor (1) != null) pd.setPlotColors (this.plotColors);
pd.setColorOrFont (ds, null);
}, "JSV.api.JSVPanel,JSV.common.ColorParameters,~B");
Clazz.defineMethod (c$, "set", 
function (pd, st, value) {
var param = null;
switch (st) {
default:
this.setP (pd, st, value);
return;
case JSV.common.ScriptToken.PLOTCOLORS:
if (pd == null) this.getPlotColors (value);
 else pd.setPlotColors (this.getPlotColors (value));
return;
case JSV.common.ScriptToken.BACKGROUNDCOLOR:
case JSV.common.ScriptToken.COORDINATESCOLOR:
case JSV.common.ScriptToken.GRIDCOLOR:
case JSV.common.ScriptToken.HIGHLIGHTCOLOR:
case JSV.common.ScriptToken.INTEGRALPLOTCOLOR:
case JSV.common.ScriptToken.PEAKTABCOLOR:
case JSV.common.ScriptToken.PLOTAREACOLOR:
case JSV.common.ScriptToken.PLOTCOLOR:
case JSV.common.ScriptToken.SCALECOLOR:
case JSV.common.ScriptToken.TITLECOLOR:
case JSV.common.ScriptToken.UNITSCOLOR:
param = this.setColorFromString (st, value);
break;
case JSV.common.ScriptToken.TITLEFONTNAME:
case JSV.common.ScriptToken.DISPLAYFONTNAME:
param = this.getFontName (st, value);
break;
}
if (pd == null) return;
if (param != null) pd.setColorOrFont (this, st);
}, "JSV.common.PanelData,JSV.common.ScriptToken,~S");
Clazz.defineMethod (c$, "getElementColor", 
function (st) {
return this.elementColors.get (st);
}, "JSV.common.ScriptToken");
Clazz.defineMethod (c$, "setColor", 
function (st, color) {
if (color != null) this.elementColors.put (st, color);
return color;
}, "JSV.common.ScriptToken,javajs.api.GenericColor");
Clazz.defineMethod (c$, "copy", 
function () {
return this.copy (this.name);
});
Clazz.defineMethod (c$, "setElementColors", 
function (p) {
this.displayFontName = p.displayFontName;
for (var entry, $entry = p.elementColors.entrySet ().iterator (); $entry.hasNext () && ((entry = $entry.next ()) || true);) this.setColor (entry.getKey (), entry.getValue ());

return this;
}, "JSV.common.ColorParameters");
Clazz.defineMethod (c$, "getColorFromString", 
function (name) {
return this.getColor1 (JU.CU.getArgbFromString (name));
}, "~S");
Clazz.defineMethod (c$, "getPlotColors", 
function (plotColorsStr) {
if (plotColorsStr == null) {
this.plotColors[0] = this.getElementColor (JSV.common.ScriptToken.PLOTCOLOR);
return this.plotColors;
}var st =  new java.util.StringTokenizer (plotColorsStr, ",;.- ");
var colors =  new JU.Lst ();
try {
while (st.hasMoreTokens ()) colors.addLast (this.getColorFromString (st.nextToken ()));

} catch (e) {
if (Clazz.exceptionOf (e, Exception)) {
return null;
} else {
throw e;
}
}
return colors.toArray ( new Array (colors.size ()));
}, "~S");
Clazz.defineMethod (c$, "setColorFromString", 
function (st, value) {
return this.setColor (st, this.getColorFromString (value));
}, "JSV.common.ScriptToken,~S");
Clazz.defineMethod (c$, "getFontName", 
function (st, value) {
var isValid = this.isValidFontName (value);
switch (st) {
case JSV.common.ScriptToken.TITLEFONTNAME:
return (isValid ? this.titleFontName = value : this.titleFontName);
case JSV.common.ScriptToken.DISPLAYFONTNAME:
return (isValid ? this.displayFontName = value : this.displayFontName);
}
return null;
}, "JSV.common.ScriptToken,~S");
Clazz.defineStatics (c$,
"BLACK", null,
"RED", null,
"LIGHT_GRAY", null,
"DARK_GRAY", null,
"BLUE", null,
"WHITE", null);
c$.defaultPlotColors = c$.prototype.defaultPlotColors =  new Array (8);
c$.defaultPlotColorNames = c$.prototype.defaultPlotColorNames =  Clazz.newArray (-1, ["black", "darkGreen", "darkred", "orange", "magenta", "cyan", "maroon", "darkGray"]);
});
