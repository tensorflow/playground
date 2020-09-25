Clazz.declarePackage ("J.adapter.readers.cif");
Clazz.load (["JU.CifDataParser"], "J.adapter.readers.cif.Cif2DataParser", ["java.lang.Float", "java.util.Hashtable", "JU.Lst", "$.PT"], function () {
c$ = Clazz.declareType (J.adapter.readers.cif, "Cif2DataParser", JU.CifDataParser);
Clazz.overrideMethod (c$, "getVersion", 
function () {
return 2;
});
Clazz.overrideMethod (c$, "toUnicode", 
function (data) {
return data;
}, "~S");
Clazz.overrideMethod (c$, "isQuote", 
function (ch) {
switch (ch) {
case '\1':
case '\'':
case '\"':
case '[':
case ']':
case '{':
case '}':
case ';':
return true;
}
return false;
}, "~S");
Clazz.overrideMethod (c$, "getQuotedStringOrObject", 
function (ch) {
return this.processQuotedString ();
}, "~S");
Clazz.overrideMethod (c$, "preprocessString", 
function () {
this.line = (this.ich == 0 ? this.str : this.str.substring (this.ich));
return this.setString (this.processSemiString ());
});
Clazz.defineMethod (c$, "processQuotedString", 
 function () {
var str = null;
var quoteChar = this.str.charAt (this.ich);
var tripleChar = null;
try {
switch (quoteChar) {
case '\1':
str = this.str.substring (1, (this.ich = this.str.indexOf ("\1", this.ich + 1)));
this.ich++;
break;
case '[':
return this.readList ();
case ']':
this.ich++;
return "]";
case '{':
return this.readTable ();
case '}':
this.ich++;
return "}";
case '\'':
case '"':
if (this.str.indexOf ("'''") == this.ich) tripleChar = "'''";
 else if (this.str.indexOf ("\"\"\"") == this.ich) tripleChar = "\"\"\"";
var nchar = (tripleChar == null ? 1 : 3);
var pt = this.ich + nchar;
var pt1 = 0;
while ((pt1 = (tripleChar == null ? this.str.indexOf (quoteChar, pt) : this.str.indexOf (tripleChar, pt))) < 0) {
if (this.readLine () == null) break;
this.str += this.line;
}
this.ich = pt1 + nchar;
this.cch = this.str.length;
str = this.str.substring (pt, pt1);
break;
}
} catch (e) {
if (Clazz.exceptionOf (e, Exception)) {
System.out.println ("exception in Cif2DataParser ; " + e);
} else {
throw e;
}
}
return (this.cterm == '\0' || this.asObject ? str : JU.PT.esc (str));
});
Clazz.defineMethod (c$, "processSemiString", 
function () {
var pt1;
var pt2;
var str = this.preprocessSemiString ();
if (str.indexOf (';') != 1 && (pt1 = str.indexOf ('\\')) > 1 && ((pt2 = str.indexOf ('\n')) > pt1 || pt2 < 0)) {
var prefix = str.substring (1, pt1);
str = JU.PT.rep (str, "\n" + prefix, "\n");
str = "\1" + str.substring (str.charAt (pt1 + 1) == '\\' ? pt1 + 1 : pt2 < 0 ? str.length - 1 : pt2 + 1);
}this.ich = 0;
return this.fixLineFolding (str);
});
Clazz.defineMethod (c$, "readList", 
function () {
this.ich++;
var cterm0 = this.cterm;
this.cterm = ']';
var ns = this.nullString;
this.nullString = null;
var lst = (this.asObject ?  new JU.Lst () : null);
var n = 0;
var str = "";
while (true) {
var value = (this.asObject ? this.getNextTokenObject () : this.getNextToken ());
if (value == null || value.equals ("]")) break;
if (this.asObject) {
lst.addLast (value);
} else {
if (n++ > 0) str += ",";
str += value;
}}
this.cterm = cterm0;
this.nullString = ns;
return (this.asObject ? lst : "[" + str + "]");
});
Clazz.defineMethod (c$, "readTable", 
function () {
this.ich++;
var cterm0 = this.cterm;
this.cterm = '}';
var ns = this.nullString;
this.nullString = null;
var map = (this.asObject ?  new java.util.Hashtable () : null);
var n = 0;
var str = "";
while (true) {
var key = this.getNextToken ();
if (key == null || key.equals ("}")) break;
while (this.isSpaceOrColon (this.ich)) this.ich++;

if (this.asObject) {
map.put (key, this.getNextTokenObject ());
} else {
if (n++ > 0) str += ",";
str += key + " : " + this.getNextToken ();
}}
this.cterm = cterm0;
this.nullString = ns;
return (this.asObject ? map : "{" + str + "}");
});
Clazz.defineMethod (c$, "isSpaceOrColon", 
 function (ich) {
if (ich < this.cch) switch (this.line.charAt (ich)) {
case ' ':
case '\t':
case '\n':
case ':':
return true;
}
return false;
}, "~N");
Clazz.overrideMethod (c$, "unquoted", 
function (s) {
if (this.cterm == '\0' && !this.asObject) return s;
var n = s.length;
if (n > 0) {
var c = s.charAt (0);
if (JU.PT.isDigit (c) || c == '-' || c == '.' && n > 1) {
var pt = s.indexOf ('(');
var isFloat = (s.indexOf (".") >= 0);
if (n > 1 && pt > 0 && s.indexOf (')', pt + 1) == n - 1) s = s.substring (0, pt);
try {
if (isFloat) {
var f = Float.parseFloat (s);
if (this.asObject) return Float.$valueOf (f);
s = "" + f;
if (s.indexOf (".") < 0 && s.indexOf ("E") < 0) s += ".0";
return s;
}var i = Integer.parseInt (s);
return (this.asObject ? Integer.$valueOf (i) : "" + i);
} catch (e) {
}
}}return (this.asObject ? s : JU.PT.esc (s));
}, "~S");
Clazz.defineMethod (c$, "fixLineFolding", 
 function (str) {
if (str.indexOf ('\\') < 0) return str;
var n = str.length;
if (str.endsWith ("\\\1")) str = str.substring (0, n - 1) + "\n\1";
var pt = 0;
while ((pt = str.indexOf ('\\', pt + 1)) >= 0) {
var eol = str.indexOf ('\n', pt);
if (eol < 0) break;
for (var i = eol; --i > pt; ) {
var ch = str.charAt (i);
if (!JU.PT.isWhitespace (ch)) {
if (ch == '\\') {
pt = i;
break;
}pt = eol;
break;
}}
if (pt < eol) str = str.substring (0, pt) + str.substring (eol + 1);
}
return str;
}, "~S");
c$.getArrayFromStringList = Clazz.defineMethod (c$, "getArrayFromStringList", 
function (s, n) {
var f =  Clazz.newFloatArray (n, 0);
JU.PT.parseFloatArrayInfested (JU.PT.getTokens (s.$replace (',', ' ').$replace ('[', ' ')), f);
var d =  Clazz.newDoubleArray (n, 0);
for (var i = 0; i < n; i++) d[i] = f[i];

return d;
}, "~S,~N");
});
