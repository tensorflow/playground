Clazz.declarePackage ("JU");
Clazz.load (null, "JU.Parser", ["java.lang.Float", "JU.PT"], function () {
c$ = Clazz.declareType (JU, "Parser");
c$.parseStringInfestedFloatArray = Clazz.defineMethod (c$, "parseStringInfestedFloatArray", 
function (str, bs, data) {
return JU.Parser.parseFloatArrayBsData (JU.PT.getTokens (str), bs, data);
}, "~S,JU.BS,~A");
c$.parseFloatArrayBsData = Clazz.defineMethod (c$, "parseFloatArrayBsData", 
function (tokens, bs, data) {
var len = data.length;
var nTokens = tokens.length;
var n = 0;
var max = 0;
var haveBitSet = (bs != null);
for (var i = (haveBitSet ? bs.nextSetBit (0) : 0); i >= 0 && i < len && n < nTokens; i = (haveBitSet ? bs.nextSetBit (i + 1) : i + 1)) {
var f;
while (Float.isNaN (f = JU.PT.parseFloat (tokens[n++])) && n < nTokens) {
}
if (!Float.isNaN (f)) data[(max = i)] = f;
if (n == nTokens) break;
}
return max + 1;
}, "~A,JU.BS,~A");
c$.parseFloatArrayFromMatchAndField = Clazz.defineMethod (c$, "parseFloatArrayFromMatchAndField", 
function (str, bs, fieldMatch, fieldMatchColumnCount, matchData, field, fieldColumnCount, data, firstLine) {
var f;
var i = -1;
var isMatch = (matchData != null);
var lines = JU.Parser.markLines (str, (str.indexOf ('\n') >= 0 ? '\n' : ';'));
var iLine = (firstLine <= 1 || firstLine >= lines.length ? 0 : firstLine - 1);
var pt = (iLine == 0 ? 0 : lines[iLine - 1]);
var nLines = lines.length;
if (data == null) data =  Clazz.newFloatArray (nLines - iLine, 0);
var len = data.length;
var minLen = (fieldColumnCount <= 0 ? Math.max (field, fieldMatch) : Math.max (field + fieldColumnCount, fieldMatch + fieldMatchColumnCount) - 1);
var haveBitSet = (bs != null);
for (; iLine < nLines; iLine++) {
var line = str.substring (pt, lines[iLine]).trim ();
pt = lines[iLine];
var tokens = (fieldColumnCount <= 0 ? JU.PT.getTokens (line) : null);
if (fieldColumnCount <= 0) {
if (tokens.length < minLen || Float.isNaN (f = JU.PT.parseFloat (tokens[field - 1]))) continue;
} else {
if (line.length < minLen || Float.isNaN (f = JU.PT.parseFloat (line.substring (field - 1, field + fieldColumnCount - 1)))) continue;
}var iData;
if (isMatch) {
iData = JU.PT.parseInt (tokens == null ? line.substring (fieldMatch - 1, fieldMatch + fieldMatchColumnCount - 1) : tokens[fieldMatch - 1]);
if (iData == -2147483648 || iData < 0 || iData >= len || (iData = matchData[iData]) < 0) continue;
if (haveBitSet) bs.set (iData);
} else {
if (haveBitSet) i = bs.nextSetBit (i + 1);
 else i++;
if (i < 0 || i >= len) return data;
iData = i;
}data[iData] = f;
}
return data;
}, "~S,JU.BS,~N,~N,~A,~N,~N,~A,~N");
c$.fixDataString = Clazz.defineMethod (c$, "fixDataString", 
function (str) {
str = str.$replace (';', str.indexOf ('\n') < 0 ? '\n' : ' ');
str = JU.PT.trim (str, "\n \t");
str = JU.PT.rep (str, "\n ", "\n");
str = JU.PT.rep (str, "\n\n", "\n");
return str;
}, "~S");
c$.markLines = Clazz.defineMethod (c$, "markLines", 
function (data, eol) {
var nLines = 0;
for (var i = data.length; --i >= 0; ) if (data.charAt (i) == eol) nLines++;

var lines =  Clazz.newIntArray (nLines + 1, 0);
nLines = 0;
var pt = 0;
while ((pt = data.indexOf (eol, pt)) >= 0) lines[nLines++] = ++pt;

lines[nLines] = data.length;
return lines;
}, "~S,~S");
});
