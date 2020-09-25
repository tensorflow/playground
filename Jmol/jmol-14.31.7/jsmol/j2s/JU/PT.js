Clazz.declarePackage ("JU");
Clazz.load (null, "JU.PT", ["java.lang.Boolean", "$.Double", "$.Float", "$.Number", "java.util.Map", "javajs.api.JSONEncodable", "JU.AU", "$.DF", "$.Lst", "$.M34", "$.M4", "$.SB"], function () {
c$ = Clazz.declareType (JU, "PT");
c$.parseInt = Clazz.defineMethod (c$, "parseInt", 
function (str) {
return JU.PT.parseIntNext (str,  Clazz.newIntArray (-1, [0]));
}, "~S");
c$.parseIntNext = Clazz.defineMethod (c$, "parseIntNext", 
function (str, next) {
var cch = str.length;
if (next[0] < 0 || next[0] >= cch) return -2147483648;
return JU.PT.parseIntChecked (str, cch, next);
}, "~S,~A");
c$.parseIntChecked = Clazz.defineMethod (c$, "parseIntChecked", 
function (str, ichMax, next) {
var digitSeen = false;
var value = 0;
var ich = next[0];
if (ich < 0) return -2147483648;
var ch;
while (ich < ichMax && JU.PT.isWhiteSpace (str, ich)) ++ich;

var negative = false;
if (ich < ichMax && str.charCodeAt (ich) == 45) {
negative = true;
++ich;
}while (ich < ichMax && (ch = str.charCodeAt (ich)) >= 48 && ch <= 57) {
value = value * 10 + (ch - 48);
digitSeen = true;
++ich;
}
if (!digitSeen) value = -2147483648;
 else if (negative) value = -value;
next[0] = ich;
return value;
}, "~S,~N,~A");
c$.isWhiteSpace = Clazz.defineMethod (c$, "isWhiteSpace", 
function (str, ich) {
var ch;
return (ich >= 0 && ((ch = str.charAt (ich)) == ' ' || ch == '\t' || ch == '\n'));
}, "~S,~N");
c$.parseFloatChecked = Clazz.defineMethod (c$, "parseFloatChecked", 
function (str, ichMax, next, isStrict) {
var digitSeen = false;
var ich = next[0];
if (isStrict && str.indexOf ('\n') != str.lastIndexOf ('\n')) return NaN;
while (ich < ichMax && JU.PT.isWhiteSpace (str, ich)) ++ich;

var negative = false;
if (ich < ichMax && str.charAt (ich) == '-') {
++ich;
negative = true;
}var ch = 0;
var ival = 0;
var ival2 = 0;
while (ich < ichMax && (ch = str.charCodeAt (ich)) >= 48 && ch <= 57) {
ival = (ival * 10) + (ch - 48) * 1;
++ich;
digitSeen = true;
}
var isDecimal = false;
var iscale = 0;
var nzero = (ival == 0 ? -1 : 0);
if (ch == 46) {
isDecimal = true;
while (++ich < ichMax && (ch = str.charCodeAt (ich)) >= 48 && ch <= 57) {
digitSeen = true;
if (nzero < 0) {
if (ch == 48) {
nzero--;
continue;
}nzero = -nzero;
}if (iscale < JU.PT.decimalScale.length) {
ival2 = (ival2 * 10) + (ch - 48) * 1;
iscale++;
}}
}var value;
if (!digitSeen) {
value = NaN;
} else if (ival2 > 0) {
value = ival2 * JU.PT.decimalScale[iscale - 1];
if (nzero > 1) {
if (nzero - 2 < JU.PT.decimalScale.length) {
value *= JU.PT.decimalScale[nzero - 2];
} else {
value *= Math.pow (10, 1 - nzero);
}} else {
value += ival;
}} else {
value = ival;
}var isExponent = false;
if (ich < ichMax && (ch == 69 || ch == 101 || ch == 68)) {
isExponent = true;
if (++ich >= ichMax) return NaN;
ch = str.charCodeAt (ich);
if ((ch == 43) && (++ich >= ichMax)) return NaN;
next[0] = ich;
var exponent = JU.PT.parseIntChecked (str, ichMax, next);
if (exponent == -2147483648) return NaN;
if (exponent > 0 && exponent <= JU.PT.tensScale.length) value *= JU.PT.tensScale[exponent - 1];
 else if (exponent < 0 && -exponent <= JU.PT.decimalScale.length) value *= JU.PT.decimalScale[-exponent - 1];
 else if (exponent != 0) value *= Math.pow (10, exponent);
} else {
next[0] = ich;
}if (negative) value = -value;
if (value == Infinity) value = 3.4028235E38;
return (!isStrict || (!isExponent || isDecimal) && JU.PT.checkTrailingText (str, next[0], ichMax) ? value : NaN);
}, "~S,~N,~A,~B");
c$.checkTrailingText = Clazz.defineMethod (c$, "checkTrailingText", 
function (str, ich, ichMax) {
var ch;
while (ich < ichMax && (JU.PT.isWhitespace (ch = str.charAt (ich)) || ch == ';')) ++ich;

return (ich == ichMax);
}, "~S,~N,~N");
c$.parseFloatArray = Clazz.defineMethod (c$, "parseFloatArray", 
function (str) {
return JU.PT.parseFloatArrayNext (str,  Clazz.newIntArray (1, 0), null, null, null);
}, "~S");
c$.parseFloatArrayInfested = Clazz.defineMethod (c$, "parseFloatArrayInfested", 
function (tokens, data) {
var len = data.length;
var nTokens = tokens.length;
var n = 0;
var max = 0;
for (var i = 0; i >= 0 && i < len && n < nTokens; i++) {
var f;
while (Float.isNaN (f = JU.PT.parseFloat (tokens[n++])) && n < nTokens) {
}
if (!Float.isNaN (f)) data[(max = i)] = f;
if (n == nTokens) break;
}
return max + 1;
}, "~A,~A");
c$.parseFloatArrayNext = Clazz.defineMethod (c$, "parseFloatArrayNext", 
function (str, next, f, strStart, strEnd) {
var n = 0;
var pt = next[0];
if (pt >= 0) {
if (strStart != null) {
var p = str.indexOf (strStart, pt);
if (p >= 0) next[0] = p + strStart.length;
}str = str.substring (next[0]);
pt = (strEnd == null ? -1 : str.indexOf (strEnd));
if (pt < 0) pt = str.length;
 else str = str.substring (0, pt);
next[0] += pt + 1;
var tokens = JU.PT.getTokens (str);
if (f == null) f =  Clazz.newFloatArray (tokens.length, 0);
n = JU.PT.parseFloatArrayInfested (tokens, f);
}if (f == null) return  Clazz.newFloatArray (0, 0);
for (var i = n; i < f.length; i++) f[i] = NaN;

return f;
}, "~S,~A,~A,~S,~S");
c$.parseFloatRange = Clazz.defineMethod (c$, "parseFloatRange", 
function (str, ichMax, next) {
var cch = str.length;
if (ichMax > cch) ichMax = cch;
if (next[0] < 0 || next[0] >= ichMax) return NaN;
return JU.PT.parseFloatChecked (str, ichMax, next, false);
}, "~S,~N,~A");
c$.parseFloatNext = Clazz.defineMethod (c$, "parseFloatNext", 
function (str, next) {
var cch = (str == null ? -1 : str.length);
return (next[0] < 0 || next[0] >= cch ? NaN : JU.PT.parseFloatChecked (str, cch, next, false));
}, "~S,~A");
c$.parseFloatStrict = Clazz.defineMethod (c$, "parseFloatStrict", 
function (str) {
var cch = str.length;
if (cch == 0) return NaN;
return JU.PT.parseFloatChecked (str, cch,  Clazz.newIntArray (-1, [0]), true);
}, "~S");
c$.parseFloat = Clazz.defineMethod (c$, "parseFloat", 
function (str) {
return JU.PT.parseFloatNext (str,  Clazz.newIntArray (-1, [0]));
}, "~S");
c$.parseIntRadix = Clazz.defineMethod (c$, "parseIntRadix", 
function (s, i) {
{
return Integer.parseIntRadix(s, i);
}}, "~S,~N");
c$.getTokens = Clazz.defineMethod (c$, "getTokens", 
function (line) {
return JU.PT.getTokensAt (line, 0);
}, "~S");
c$.parseToken = Clazz.defineMethod (c$, "parseToken", 
function (str) {
return JU.PT.parseTokenNext (str,  Clazz.newIntArray (-1, [0]));
}, "~S");
c$.parseTrimmed = Clazz.defineMethod (c$, "parseTrimmed", 
function (str) {
return JU.PT.parseTrimmedRange (str, 0, str.length);
}, "~S");
c$.parseTrimmedAt = Clazz.defineMethod (c$, "parseTrimmedAt", 
function (str, ichStart) {
return JU.PT.parseTrimmedRange (str, ichStart, str.length);
}, "~S,~N");
c$.parseTrimmedRange = Clazz.defineMethod (c$, "parseTrimmedRange", 
function (str, ichStart, ichMax) {
var cch = str.length;
if (ichMax < cch) cch = ichMax;
if (cch < ichStart) return "";
return JU.PT.parseTrimmedChecked (str, ichStart, cch);
}, "~S,~N,~N");
c$.getTokensAt = Clazz.defineMethod (c$, "getTokensAt", 
function (line, ich) {
if (line == null) return null;
var cchLine = line.length;
if (ich < 0 || ich > cchLine) return null;
var tokenCount = JU.PT.countTokens (line, ich);
var tokens =  new Array (tokenCount);
var next =  Clazz.newIntArray (1, 0);
next[0] = ich;
for (var i = 0; i < tokenCount; ++i) tokens[i] = JU.PT.parseTokenChecked (line, cchLine, next);

return tokens;
}, "~S,~N");
c$.countChar = Clazz.defineMethod (c$, "countChar", 
function (line, c) {
var n = 0;
for (var i = line.lastIndexOf (c) + 1; --i >= 0; ) if (line.charAt (i) == c) n++;

return n;
}, "~S,~S");
c$.countTokens = Clazz.defineMethod (c$, "countTokens", 
function (line, ich) {
var tokenCount = 0;
if (line != null) {
var ichMax = line.length;
while (true) {
while (ich < ichMax && JU.PT.isWhiteSpace (line, ich)) ++ich;

if (ich == ichMax) break;
++tokenCount;
do {
++ich;
} while (ich < ichMax && !JU.PT.isWhiteSpace (line, ich));
}
}return tokenCount;
}, "~S,~N");
c$.parseTokenNext = Clazz.defineMethod (c$, "parseTokenNext", 
function (str, next) {
var cch = str.length;
return (next[0] < 0 || next[0] >= cch ? null : JU.PT.parseTokenChecked (str, cch, next));
}, "~S,~A");
c$.parseTokenRange = Clazz.defineMethod (c$, "parseTokenRange", 
function (str, ichMax, next) {
var cch = str.length;
if (ichMax > cch) ichMax = cch;
return (next[0] < 0 || next[0] >= ichMax ? null : JU.PT.parseTokenChecked (str, ichMax, next));
}, "~S,~N,~A");
c$.parseTokenChecked = Clazz.defineMethod (c$, "parseTokenChecked", 
function (str, ichMax, next) {
var ich = next[0];
while (ich < ichMax && JU.PT.isWhiteSpace (str, ich)) ++ich;

var ichNonWhite = ich;
while (ich < ichMax && !JU.PT.isWhiteSpace (str, ich)) ++ich;

next[0] = ich;
return (ichNonWhite == ich ? null : str.substring (ichNonWhite, ich));
}, "~S,~N,~A");
c$.parseTrimmedChecked = Clazz.defineMethod (c$, "parseTrimmedChecked", 
function (str, ich, ichMax) {
while (ich < ichMax && JU.PT.isWhiteSpace (str, ich)) ++ich;

var ichLast = ichMax - 1;
while (ichLast >= ich && JU.PT.isWhiteSpace (str, ichLast)) --ichLast;

return (ichLast < ich ? "" : str.substring (ich, ichLast + 1));
}, "~S,~N,~N");
c$.dVal = Clazz.defineMethod (c$, "dVal", 
function (s) {
{
if(s==null)
throw new NumberFormatException("null");
var d=parseFloat(s);
if(isNaN(d))
throw new NumberFormatException("Not a Number : "+s);
return d
}}, "~S");
c$.fVal = Clazz.defineMethod (c$, "fVal", 
function (s) {
{
return this.dVal(s);
}}, "~S");
c$.parseIntRange = Clazz.defineMethod (c$, "parseIntRange", 
function (str, ichMax, next) {
var cch = str.length;
if (ichMax > cch) ichMax = cch;
return (next[0] < 0 || next[0] >= ichMax ? -2147483648 : JU.PT.parseIntChecked (str, ichMax, next));
}, "~S,~N,~A");
c$.parseFloatArrayData = Clazz.defineMethod (c$, "parseFloatArrayData", 
function (tokens, data) {
JU.PT.parseFloatArrayDataN (tokens, data, data.length);
}, "~A,~A");
c$.parseFloatArrayDataN = Clazz.defineMethod (c$, "parseFloatArrayDataN", 
function (tokens, data, nData) {
for (var i = nData; --i >= 0; ) data[i] = (i >= tokens.length ? NaN : JU.PT.parseFloat (tokens[i]));

}, "~A,~A,~N");
c$.split = Clazz.defineMethod (c$, "split", 
function (text, run) {
if (text.length == 0) return  new Array (0);
var n = 1;
var i = text.indexOf (run);
var lines;
var runLen = run.length;
if (i < 0 || runLen == 0) {
lines =  new Array (1);
lines[0] = text;
return lines;
}var len = text.length - runLen;
for (; i >= 0 && i < len; n++) i = text.indexOf (run, i + runLen);

lines =  new Array (n);
i = 0;
var ipt = 0;
var pt = 0;
for (; (ipt = text.indexOf (run, i)) >= 0 && pt + 1 < n; ) {
lines[pt++] = text.substring (i, ipt);
i = ipt + runLen;
}
if (text.indexOf (run, len) != len) len += runLen;
lines[pt] = text.substring (i, len);
return lines;
}, "~S,~S");
c$.getQuotedStringAt = Clazz.defineMethod (c$, "getQuotedStringAt", 
function (line, ipt0) {
var next =  Clazz.newIntArray (-1, [ipt0]);
return JU.PT.getQuotedStringNext (line, next);
}, "~S,~N");
c$.getQuotedStringNext = Clazz.defineMethod (c$, "getQuotedStringNext", 
function (line, next) {
var i = next[0];
if (i < 0 || (i = line.indexOf ("\"", i)) < 0) return "";
var pt = i + 1;
var len = line.length;
while (++i < len && line.charAt (i) != '"') if (line.charAt (i) == '\\') i++;

next[0] = i + 1;
return line.substring (pt, i);
}, "~S,~A");
c$.getQuotedOrUnquotedAttribute = Clazz.defineMethod (c$, "getQuotedOrUnquotedAttribute", 
function (line, key) {
if (line == null || key == null) return null;
var pt = line.toLowerCase ().indexOf (key.toLowerCase () + "=");
if (pt < 0 || (pt = pt + key.length + 1) >= line.length) return "";
var c = line.charAt (pt);
switch (c) {
case '\'':
case '"':
pt++;
break;
default:
c = ' ';
line += " ";
}
var pt1 = line.indexOf (c, pt);
return (pt1 < 0 ? null : line.substring (pt, pt1));
}, "~S,~S");
c$.getCSVString = Clazz.defineMethod (c$, "getCSVString", 
function (line, next) {
var i = next[1];
if (i < 0 || (i = line.indexOf ("\"", i)) < 0) return null;
var pt = next[0] = i;
var len = line.length;
var escaped = false;
var haveEscape = false;
while (++i < len && (line.charAt (i) != '"' || (escaped = (i + 1 < len && line.charAt (i + 1) == '"')))) if (escaped) {
escaped = false;
haveEscape = true;
i++;
}
if (i >= len) {
next[1] = -1;
return null;
}next[1] = i + 1;
var s = line.substring (pt + 1, i);
return (haveEscape ? JU.PT.rep (JU.PT.rep (s, "\"\"", "\0"), "\0", "\"") : s);
}, "~S,~A");
c$.isOneOf = Clazz.defineMethod (c$, "isOneOf", 
function (key, semiList) {
if (semiList.length == 0) return false;
if (semiList.charAt (0) != ';') semiList = ";" + semiList + ";";
return key.indexOf (";") < 0 && semiList.indexOf (';' + key + ';') >= 0;
}, "~S,~S");
c$.getQuotedAttribute = Clazz.defineMethod (c$, "getQuotedAttribute", 
function (info, name) {
var i = info.indexOf (name + "=");
return (i < 0 ? null : JU.PT.getQuotedStringAt (info, i));
}, "~S,~S");
c$.approx = Clazz.defineMethod (c$, "approx", 
function (f, n) {
return Math.round (f * n) / n;
}, "~N,~N");
c$.rep = Clazz.defineMethod (c$, "rep", 
function (str, strFrom, strTo) {
if (str == null || strFrom.length == 0 || str.indexOf (strFrom) < 0) return str;
var isOnce = (strTo.indexOf (strFrom) >= 0);
do {
str = str.$replace (strFrom, strTo);
} while (!isOnce && str.indexOf (strFrom) >= 0);
return str;
}, "~S,~S,~S");
c$.formatF = Clazz.defineMethod (c$, "formatF", 
function (value, width, precision, alignLeft, zeroPad) {
return JU.PT.formatS (JU.DF.formatDecimal (value, precision), width, 0, alignLeft, zeroPad);
}, "~N,~N,~N,~B,~B");
c$.formatD = Clazz.defineMethod (c$, "formatD", 
function (value, width, precision, alignLeft, zeroPad, allowOverflow) {
return JU.PT.formatS (JU.DF.formatDecimal (value, -1 - precision), width, 0, alignLeft, zeroPad);
}, "~N,~N,~N,~B,~B,~B");
c$.formatS = Clazz.defineMethod (c$, "formatS", 
function (value, width, precision, alignLeft, zeroPad) {
if (value == null) return "";
var len = value.length;
if (precision != 2147483647 && precision > 0 && precision < len) value = value.substring (0, precision);
 else if (precision < 0 && len + precision >= 0) value = value.substring (len + precision + 1);
var padLength = width - value.length;
if (padLength <= 0) return value;
var isNeg = (zeroPad && !alignLeft && value.charAt (0) == '-');
var padChar = (zeroPad ? '0' : ' ');
var padChar0 = (isNeg ? '-' : padChar);
var sb =  new JU.SB ();
if (alignLeft) sb.append (value);
sb.appendC (padChar0);
for (var i = padLength; --i > 0; ) sb.appendC (padChar);

if (!alignLeft) sb.append (isNeg ? padChar + value.substring (1) : value);
return sb.toString ();
}, "~S,~N,~N,~B,~B");
c$.replaceWithCharacter = Clazz.defineMethod (c$, "replaceWithCharacter", 
function (str, strFrom, chTo) {
if (str == null) return null;
for (var i = strFrom.length; --i >= 0; ) str = str.$replace (strFrom.charAt (i), chTo);

return str;
}, "~S,~S,~S");
c$.replaceAllCharacters = Clazz.defineMethod (c$, "replaceAllCharacters", 
function (str, strFrom, strTo) {
for (var i = strFrom.length; --i >= 0; ) {
var chFrom = strFrom.substring (i, i + 1);
str = JU.PT.rep (str, chFrom, strTo);
}
return str;
}, "~S,~S,~S");
c$.trim = Clazz.defineMethod (c$, "trim", 
function (str, chars) {
if (str == null || str.length == 0) return str;
if (chars.length == 0) return str.trim ();
var len = str.length;
var k = 0;
while (k < len && chars.indexOf (str.charAt (k)) >= 0) k++;

var m = str.length - 1;
while (m > k && chars.indexOf (str.charAt (m)) >= 0) m--;

return str.substring (k, m + 1);
}, "~S,~S");
c$.trimQuotes = Clazz.defineMethod (c$, "trimQuotes", 
function (value) {
return (value != null && value.length > 1 && value.startsWith ("\"") && value.endsWith ("\"") ? value.substring (1, value.length - 1) : value);
}, "~S");
c$.isNonStringPrimitive = Clazz.defineMethod (c$, "isNonStringPrimitive", 
function (info) {
return Clazz.instanceOf (info, Number) || Clazz.instanceOf (info, Boolean);
}, "~O");
c$.arrayGet = Clazz.defineMethod (c$, "arrayGet", 
 function (info, i) {
{
return info[i];
}}, "~O,~N");
c$.toJSON = Clazz.defineMethod (c$, "toJSON", 
function (infoType, info) {
if (info == null) return JU.PT.packageJSON (infoType, null);
if (JU.PT.isNonStringPrimitive (info)) return JU.PT.packageJSON (infoType, info.toString ());
var s = null;
var sb = null;
while (true) {
if (Clazz.instanceOf (info, String)) {
s = info;
{
if (typeof s == "undefined") s = "null"
}if (s.indexOf ("{\"") != 0) {
s = JU.PT.esc (s);
}break;
}if (Clazz.instanceOf (info, javajs.api.JSONEncodable)) {
if ((s = (info).toJSON ()) == null) s = "null";
break;
}sb =  new JU.SB ();
if (Clazz.instanceOf (info, java.util.Map)) {
sb.append ("{ ");
var sep = "";
for (var key, $key = (info).keySet ().iterator (); $key.hasNext () && ((key = $key.next ()) || true);) {
sb.append (sep).append (JU.PT.packageJSON (key, JU.PT.toJSON (null, (info).get (key))));
sep = ",";
}
sb.append (" }");
break;
}if (Clazz.instanceOf (info, JU.Lst)) {
sb.append ("[ ");
var n = (info).size ();
for (var i = 0; i < n; i++) {
if (i > 0) sb.appendC (',');
sb.append (JU.PT.toJSON (null, (info).get (i)));
}
sb.append (" ]");
break;
}if (Clazz.instanceOf (info, JU.M34)) {
var len = (Clazz.instanceOf (info, JU.M4) ? 4 : 3);
var x =  Clazz.newFloatArray (len, 0);
var m = info;
sb.appendC ('[');
for (var i = 0; i < len; i++) {
if (i > 0) sb.appendC (',');
m.getRow (i, x);
sb.append (JU.PT.toJSON (null, x));
}
sb.appendC (']');
break;
}s = JU.PT.nonArrayString (info);
if (s == null) {
sb.append ("[");
var n = JU.AU.getLength (info);
for (var i = 0; i < n; i++) {
if (i > 0) sb.appendC (',');
sb.append (JU.PT.toJSON (null, JU.PT.arrayGet (info, i)));
}
sb.append ("]");
break;
}info = info.toString ();
}
return JU.PT.packageJSON (infoType, (s == null ? sb.toString () : s));
}, "~S,~O");
c$.nonArrayString = Clazz.defineMethod (c$, "nonArrayString", 
function (x) {
{
return (x.constructor == Array || x.BYTES_PER_ELEMENT ? null : x.toString());
}}, "~O");
c$.byteArrayToJSON = Clazz.defineMethod (c$, "byteArrayToJSON", 
function (data) {
var sb =  new JU.SB ();
sb.append ("[");
var n = data.length;
for (var i = 0; i < n; i++) {
if (i > 0) sb.appendC (',');
sb.appendI (data[i] & 0xFF);
}
sb.append ("]");
return sb.toString ();
}, "~A");
c$.packageJSON = Clazz.defineMethod (c$, "packageJSON", 
function (infoType, info) {
return (infoType == null ? info : "\"" + infoType + "\": " + info);
}, "~S,~S");
c$.escapeUrl = Clazz.defineMethod (c$, "escapeUrl", 
function (url) {
url = JU.PT.rep (url, "\n", "");
url = JU.PT.rep (url, "%", "%25");
url = JU.PT.rep (url, "#", "%23");
url = JU.PT.rep (url, "[", "%5B");
url = JU.PT.rep (url, "\\", "%5C");
url = JU.PT.rep (url, "]", "%5D");
url = JU.PT.rep (url, " ", "%20");
return url;
}, "~S");
c$.esc = Clazz.defineMethod (c$, "esc", 
function (str) {
if (str == null || str.length == 0) return "\"\"";
var haveEscape = false;
var i = 0;
for (; i < "\\\\\tt\rr\nn\"\"".length; i += 2) if (str.indexOf ("\\\\\tt\rr\nn\"\"".charAt (i)) >= 0) {
haveEscape = true;
break;
}
if (haveEscape) while (i < "\\\\\tt\rr\nn\"\"".length) {
var pt = -1;
var ch = "\\\\\tt\rr\nn\"\"".charAt (i++);
var ch2 = "\\\\\tt\rr\nn\"\"".charAt (i++);
var sb =  new JU.SB ();
var pt0 = 0;
while ((pt = str.indexOf (ch, pt + 1)) >= 0) {
sb.append (str.substring (pt0, pt)).appendC ('\\').appendC (ch2);
pt0 = pt + 1;
}
sb.append (str.substring (pt0, str.length));
str = sb.toString ();
}
return "\"" + JU.PT.escUnicode (str) + "\"";
}, "~S");
c$.escUnicode = Clazz.defineMethod (c$, "escUnicode", 
function (str) {
for (var i = str.length; --i >= 0; ) if (str.charCodeAt (i) > 0x7F) {
var s = "0000" + Integer.toHexString (str.charCodeAt (i));
str = str.substring (0, i) + "\\u" + s.substring (s.length - 4) + str.substring (i + 1);
}
return str;
}, "~S");
c$.escF = Clazz.defineMethod (c$, "escF", 
function (f) {
var sf = "" + f;
{
if (sf.indexOf(".") < 0 && sf.indexOf("e") < 0)
sf += ".0";
}return sf;
}, "~N");
c$.join = Clazz.defineMethod (c$, "join", 
function (s, c, i0) {
if (s.length < i0) return null;
var sb =  new JU.SB ();
sb.append (s[i0++]);
for (var i = i0; i < s.length; i++) sb.appendC (c).append (s[i]);

return sb.toString ();
}, "~A,~S,~N");
c$.isLike = Clazz.defineMethod (c$, "isLike", 
function (a, b) {
var areEqual = a.equals (b);
if (areEqual) return true;
var isStart = b.startsWith ("*");
var isEnd = b.endsWith ("*");
return (!isStart && !isEnd) ? areEqual : isStart && isEnd ? b.length == 1 || a.contains (b.substring (1, b.length - 1)) : isStart ? a.endsWith (b.substring (1)) : a.startsWith (b.substring (0, b.length - 1));
}, "~S,~S");
c$.getMapValueNoCase = Clazz.defineMethod (c$, "getMapValueNoCase", 
function (h, key) {
if ("this".equals (key)) return h;
var val = h.get (key);
if (val == null) for (var e, $e = h.entrySet ().iterator (); $e.hasNext () && ((e = $e.next ()) || true);) if (e.getKey ().equalsIgnoreCase (key)) return e.getValue ();

return val;
}, "java.util.Map,~S");
c$.clean = Clazz.defineMethod (c$, "clean", 
function (s) {
return JU.PT.rep (JU.PT.replaceAllCharacters (s, " \t\n\r", " "), "  ", " ").trim ();
}, "~S");
c$.fdup = Clazz.defineMethod (c$, "fdup", 
function (f, pt, n) {
var ch;
var count = 0;
for (var i = pt; --i >= 1; ) {
if (JU.PT.isDigit (ch = f.charAt (i))) continue;
switch (ch) {
case '.':
if (count++ != 0) return f;
continue;
case '-':
if (i != 1 && f.charAt (i - 1) != '.') return f;
continue;
default:
return f;
}
}
var s = f.substring (0, pt + 1);
var sb =  new JU.SB ();
for (var i = 0; i < n; i++) sb.append (s);

sb.append (f.substring (pt + 1));
return sb.toString ();
}, "~S,~N,~N");
c$.formatString = Clazz.defineMethod (c$, "formatString", 
 function (strFormat, key, strT, floatT, doubleT, doOne) {
if (strFormat == null) return null;
if ("".equals (strFormat)) return "";
var len = key.length;
if (strFormat.indexOf ("%") < 0 || len == 0 || strFormat.indexOf (key) < 0) return strFormat;
var strLabel = "";
var ich;
var ichPercent;
var ichKey;
for (ich = 0; (ichPercent = strFormat.indexOf ('%', ich)) >= 0 && (ichKey = strFormat.indexOf (key, ichPercent + 1)) >= 0; ) {
if (ich != ichPercent) strLabel += strFormat.substring (ich, ichPercent);
ich = ichPercent + 1;
if (ichKey > ichPercent + 6) {
strLabel += '%';
continue;
}try {
var alignLeft = false;
if (strFormat.charAt (ich) == '-') {
alignLeft = true;
++ich;
}var zeroPad = false;
if (strFormat.charAt (ich) == '0') {
zeroPad = true;
++ich;
}var ch;
var width = 0;
while ((ch = strFormat.charAt (ich)) >= '0' && (ch <= '9')) {
width = (10 * width) + (ch.charCodeAt (0) - 48);
++ich;
}
var precision = 2147483647;
var isExponential = false;
if (strFormat.charAt (ich) == '.') {
++ich;
if ((ch = strFormat.charAt (ich)) == '-') {
isExponential = (strT == null);
++ich;
}if ((ch = strFormat.charAt (ich)) >= '0' && ch <= '9') {
precision = ch.charCodeAt (0) - 48;
++ich;
}if (isExponential) precision = -precision;
}var st = strFormat.substring (ich, ich + len);
if (!st.equals (key)) {
ich = ichPercent + 1;
strLabel += '%';
continue;
}ich += len;
if (!Float.isNaN (floatT)) strLabel += JU.PT.formatF (floatT, width, precision, alignLeft, zeroPad);
 else if (strT != null) strLabel += JU.PT.formatS (strT, width, precision, alignLeft, zeroPad);
 else if (!Double.isNaN (doubleT)) strLabel += JU.PT.formatD (doubleT, width, precision - 1, alignLeft, zeroPad, true);
if (doOne) break;
} catch (ioobe) {
if (Clazz.exceptionOf (ioobe, IndexOutOfBoundsException)) {
ich = ichPercent;
break;
} else {
throw ioobe;
}
}
}
strLabel += strFormat.substring (ich);
return strLabel;
}, "~S,~S,~S,~N,~N,~B");
c$.formatStringS = Clazz.defineMethod (c$, "formatStringS", 
function (strFormat, key, strT) {
return JU.PT.formatString (strFormat, key, strT, NaN, NaN, false);
}, "~S,~S,~S");
c$.formatStringF = Clazz.defineMethod (c$, "formatStringF", 
function (strFormat, key, floatT) {
return JU.PT.formatString (strFormat, key, null, floatT, NaN, false);
}, "~S,~S,~N");
c$.formatStringI = Clazz.defineMethod (c$, "formatStringI", 
function (strFormat, key, intT) {
return JU.PT.formatString (strFormat, key, "" + intT, NaN, NaN, false);
}, "~S,~S,~N");
c$.sprintf = Clazz.defineMethod (c$, "sprintf", 
function (strFormat, list, values) {
if (values == null) return strFormat;
var n = list.length;
if (n == values.length) try {
for (var o = 0; o < n; o++) {
if (values[o] == null) continue;
switch (list.charAt (o)) {
case 's':
strFormat = JU.PT.formatString (strFormat, "s", values[o], NaN, NaN, true);
break;
case 'f':
strFormat = JU.PT.formatString (strFormat, "f", null, (values[o]).floatValue (), NaN, true);
break;
case 'i':
strFormat = JU.PT.formatString (strFormat, "d", "" + values[o], NaN, NaN, true);
strFormat = JU.PT.formatString (strFormat, "i", "" + values[o], NaN, NaN, true);
break;
case 'd':
strFormat = JU.PT.formatString (strFormat, "e", null, NaN, (values[o]).doubleValue (), true);
break;
case 'p':
var pVal = values[o];
strFormat = JU.PT.formatString (strFormat, "p", null, pVal.x, NaN, true);
strFormat = JU.PT.formatString (strFormat, "p", null, pVal.y, NaN, true);
strFormat = JU.PT.formatString (strFormat, "p", null, pVal.z, NaN, true);
break;
case 'q':
var qVal = values[o];
strFormat = JU.PT.formatString (strFormat, "q", null, qVal.x, NaN, true);
strFormat = JU.PT.formatString (strFormat, "q", null, qVal.y, NaN, true);
strFormat = JU.PT.formatString (strFormat, "q", null, qVal.z, NaN, true);
strFormat = JU.PT.formatString (strFormat, "q", null, qVal.w, NaN, true);
break;
case 'S':
var sVal = values[o];
for (var i = 0; i < sVal.length; i++) strFormat = JU.PT.formatString (strFormat, "s", sVal[i], NaN, NaN, true);

break;
case 'F':
var fVal = values[o];
for (var i = 0; i < fVal.length; i++) strFormat = JU.PT.formatString (strFormat, "f", null, fVal[i], NaN, true);

break;
case 'I':
var iVal = values[o];
for (var i = 0; i < iVal.length; i++) strFormat = JU.PT.formatString (strFormat, "d", "" + iVal[i], NaN, NaN, true);

for (var i = 0; i < iVal.length; i++) strFormat = JU.PT.formatString (strFormat, "i", "" + iVal[i], NaN, NaN, true);

break;
case 'D':
var dVal = values[o];
for (var i = 0; i < dVal.length; i++) strFormat = JU.PT.formatString (strFormat, "e", null, NaN, dVal[i], true);

}
}
return JU.PT.rep (strFormat, "%%", "%");
} catch (e) {
if (Clazz.exceptionOf (e, Exception)) {
} else {
throw e;
}
}
System.out.println ("TextFormat.sprintf error " + list + " " + strFormat);
return JU.PT.rep (strFormat, "%", "?");
}, "~S,~S,~A");
c$.formatCheck = Clazz.defineMethod (c$, "formatCheck", 
function (strFormat) {
if (strFormat == null || strFormat.indexOf ('p') < 0 && strFormat.indexOf ('q') < 0) return strFormat;
strFormat = JU.PT.rep (strFormat, "%%", "\1");
strFormat = JU.PT.rep (strFormat, "%p", "%6.2p");
strFormat = JU.PT.rep (strFormat, "%q", "%6.2q");
var format = JU.PT.split (strFormat, "%");
var sb =  new JU.SB ();
sb.append (format[0]);
for (var i = 1; i < format.length; i++) {
var f = "%" + format[i];
var pt;
if (f.length >= 3) {
if ((pt = f.indexOf ('p')) >= 0) f = JU.PT.fdup (f, pt, 3);
if ((pt = f.indexOf ('q')) >= 0) f = JU.PT.fdup (f, pt, 4);
}sb.append (f);
}
return sb.toString ().$replace ('\1', '%');
}, "~S");
c$.leftJustify = Clazz.defineMethod (c$, "leftJustify", 
function (s, s1, s2) {
s.append (s2);
var n = s1.length - s2.length;
if (n > 0) s.append (s1.substring (0, n));
}, "JU.SB,~S,~S");
c$.rightJustify = Clazz.defineMethod (c$, "rightJustify", 
function (s, s1, s2) {
var n = s1.length - s2.length;
if (n > 0) s.append (s1.substring (0, n));
s.append (s2);
}, "JU.SB,~S,~S");
c$.safeTruncate = Clazz.defineMethod (c$, "safeTruncate", 
function (f, n) {
if (f > -0.001 && f < 0.001) f = 0;
return (f + "         ").substring (0, n);
}, "~N,~N");
c$.isWild = Clazz.defineMethod (c$, "isWild", 
function (s) {
return s != null && (s.indexOf ("*") >= 0 || s.indexOf ("?") >= 0);
}, "~S");
c$.isMatch = Clazz.defineMethod (c$, "isMatch", 
function (search, match, checkStar, allowInitialStar) {
if (search.equals (match)) return true;
var mLen = match.length;
if (mLen == 0) return false;
var isStar0 = (checkStar && allowInitialStar ? match.charAt (0) == '*' : false);
if (mLen == 1 && isStar0) return true;
var isStar1 = (checkStar && match.endsWith ("*"));
var haveQ = (match.indexOf ('?') >= 0);
if (!haveQ) {
if (isStar0) return (isStar1 ? (mLen < 3 || search.indexOf (match.substring (1, mLen - 1)) >= 0) : search.endsWith (match.substring (1)));
 else if (isStar1) return search.startsWith (match.substring (0, mLen - 1));
}var sLen = search.length;
var qqqq = "????";
var nq = 4;
while (nq < sLen) {
qqqq += qqqq;
nq += 4;
}
if (checkStar) {
if (isStar0) {
match = qqqq + match.substring (1);
mLen += nq - 1;
}if (isStar1) {
match = match.substring (0, mLen - 1) + qqqq;
mLen += nq - 1;
}}if (mLen < sLen) return false;
var ich = 0;
while (mLen > sLen) {
if (allowInitialStar && match.charAt (ich) == '?') {
++ich;
} else if (match.charAt (ich + mLen - 1) != '?') {
return false;
}--mLen;
}
for (var i = sLen; --i >= 0; ) {
var chm = match.charAt (ich + i);
if (chm == '?') continue;
var chs = search.charAt (i);
if (chm != chs && (chm != '\1' || chs != '?')) return false;
}
return true;
}, "~S,~S,~B,~B");
c$.replaceQuotedStrings = Clazz.defineMethod (c$, "replaceQuotedStrings", 
function (s, list, newList) {
var n = list.size ();
for (var i = 0; i < n; i++) {
var name = list.get (i);
var newName = newList.get (i);
if (!newName.equals (name)) s = JU.PT.rep (s, "\"" + name + "\"", "\"" + newName + "\"");
}
return s;
}, "~S,JU.Lst,JU.Lst");
c$.replaceStrings = Clazz.defineMethod (c$, "replaceStrings", 
function (s, list, newList) {
var n = list.size ();
for (var i = 0; i < n; i++) {
var name = list.get (i);
var newName = newList.get (i);
if (!newName.equals (name)) s = JU.PT.rep (s, name, newName);
}
return s;
}, "~S,JU.Lst,JU.Lst");
c$.isDigit = Clazz.defineMethod (c$, "isDigit", 
function (ch) {
var c = (ch).charCodeAt (0);
return (48 <= c && c <= 57);
}, "~S");
c$.isUpperCase = Clazz.defineMethod (c$, "isUpperCase", 
function (ch) {
var c = (ch).charCodeAt (0);
return (65 <= c && c <= 90);
}, "~S");
c$.isLowerCase = Clazz.defineMethod (c$, "isLowerCase", 
function (ch) {
var c = (ch).charCodeAt (0);
return (97 <= c && c <= 122);
}, "~S");
c$.isLetter = Clazz.defineMethod (c$, "isLetter", 
function (ch) {
var c = (ch).charCodeAt (0);
return (65 <= c && c <= 90 || 97 <= c && c <= 122);
}, "~S");
c$.isLetterOrDigit = Clazz.defineMethod (c$, "isLetterOrDigit", 
function (ch) {
var c = (ch).charCodeAt (0);
return (65 <= c && c <= 90 || 97 <= c && c <= 122 || 48 <= c && c <= 57);
}, "~S");
c$.isWhitespace = Clazz.defineMethod (c$, "isWhitespace", 
function (ch) {
var c = (ch).charCodeAt (0);
return (c >= 0x1c && c <= 0x20 || c >= 0x9 && c <= 0xd);
}, "~S");
c$.fixPtFloats = Clazz.defineMethod (c$, "fixPtFloats", 
function (pt, f) {
pt.x = Math.round (pt.x * f) / f;
pt.y = Math.round (pt.y * f) / f;
pt.z = Math.round (pt.z * f) / f;
}, "JU.T3,~N");
c$.fixDouble = Clazz.defineMethod (c$, "fixDouble", 
function (d, f) {
return Math.round (d * f) / f;
}, "~N,~N");
c$.parseFloatFraction = Clazz.defineMethod (c$, "parseFloatFraction", 
function (s) {
var pt = s.indexOf ("/");
return (pt < 0 ? JU.PT.parseFloat (s) : JU.PT.parseFloat (s.substring (0, pt)) / JU.PT.parseFloat (s.substring (pt + 1)));
}, "~S");
Clazz.defineStatics (c$,
"tensScale",  Clazz.newFloatArray (-1, [10, 100, 1000, 10000, 100000, 1000000]),
"decimalScale",  Clazz.newFloatArray (-1, [0.1, 0.01, 0.001, 0.0001, 0.00001, 0.000001, 0.0000001, 0.00000001, 0.000000001]),
"FLOAT_MIN_SAFE", 2E-45,
"escapable", "\\\\\tt\rr\nn\"\"",
"FRACTIONAL_PRECISION", 100000,
"CARTESIAN_PRECISION", 10000);
});
