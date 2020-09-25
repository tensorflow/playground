Clazz.declarePackage ("JU");
Clazz.load (["javajs.api.GenericCifDataParser", "java.util.Hashtable", "JU.SB"], "JU.CifDataParser", ["JU.Lst", "$.PT"], function () {
c$ = Clazz.decorateAsClass (function () {
this.reader = null;
this.br = null;
this.line = null;
this.str = null;
this.ich = 0;
this.cch = 0;
this.wasUnquoted = false;
this.cterm = '\0';
this.nullString = "\0";
this.asObject = false;
this.debugging = false;
this.strPeeked = null;
this.ichPeeked = 0;
this.columnCount = 0;
this.columnNames = null;
this.columnData = null;
this.isLoop = false;
this.haveData = false;
this.fileHeader = null;
this.isHeader = true;
Clazz.instantialize (this, arguments);
}, JU, "CifDataParser", null, javajs.api.GenericCifDataParser);
Clazz.prepareFields (c$, function () {
this.columnData =  new Array (100);
this.fileHeader =  new JU.SB ();
});
Clazz.defineMethod (c$, "getVersion", 
function () {
return 1;
});
Clazz.defineMethod (c$, "setNullValue", 
function (nullString) {
this.nullString = nullString;
}, "~S");
Clazz.makeConstructor (c$, 
function () {
});
Clazz.overrideMethod (c$, "getColumnData", 
function (i) {
return this.columnData[i];
}, "~N");
Clazz.overrideMethod (c$, "getColumnCount", 
function () {
return this.columnCount;
});
Clazz.overrideMethod (c$, "getColumnName", 
function (i) {
return this.columnNames[i];
}, "~N");
Clazz.overrideMethod (c$, "set", 
function (reader, br, debugging) {
this.reader = reader;
this.br = br;
this.debugging = debugging;
return this;
}, "javajs.api.GenericLineReader,java.io.BufferedReader,~B");
Clazz.overrideMethod (c$, "getFileHeader", 
function () {
return this.fileHeader.toString ();
});
Clazz.overrideMethod (c$, "getAllCifData", 
function () {
this.line = "";
var key;
var data = null;
var data0 = null;
var allData =  new java.util.Hashtable ();
var models =  new JU.Lst ();
allData.put ("models", models);
this.asObject = (this.getVersion () >= 2);
this.nullString = null;
var saveFrames =  new JU.Lst ();
try {
while ((key = this.getNextToken ()) != null) {
if (key.startsWith ("global_") || key.startsWith ("data_")) {
models.addLast (data0 = data =  new java.util.Hashtable ());
data.put ("name", key);
continue;
}if (key.startsWith ("loop_")) {
this.getAllCifLoopData (data);
continue;
}if (key.startsWith ("save_")) {
if (key.equals ("save_")) {
var n = saveFrames.size ();
if (n == 0) {
System.out.println ("CIF ERROR ? save_ without corresponding save_xxxx");
data = data0;
} else {
data = saveFrames.removeItemAt (n - 1);
}} else {
saveFrames.addLast (data);
var d = data;
data =  new java.util.Hashtable ();
d.put (key, data);
}continue;
}if (key.charAt (0) != '_') {
System.out.println ("CIF ERROR ? should be an underscore: " + key);
} else {
var value = (this.asObject ? this.getNextTokenObject () : this.getNextToken ());
if (value == null) {
System.out.println ("CIF ERROR ? end of file; data missing: " + key);
} else {
data.put (this.fixKey (key), value);
}}}
} catch (e) {
if (Clazz.exceptionOf (e, Exception)) {
} else {
throw e;
}
}
this.asObject = false;
try {
if (this.br != null) this.br.close ();
} catch (e) {
if (Clazz.exceptionOf (e, Exception)) {
} else {
throw e;
}
}
this.nullString = "\0";
return allData;
});
Clazz.defineMethod (c$, "getAllCifLoopData", 
 function (data) {
var key;
var keyWords =  new JU.Lst ();
var o;
while ((o = this.peekToken ()) != null && Clazz.instanceOf (o, String) && (o).charAt (0) == '_') {
key = this.fixKey (this.getTokenPeeked ());
keyWords.addLast (key);
data.put (key,  new JU.Lst ());
}
this.columnCount = keyWords.size ();
if (this.columnCount == 0) return;
this.isLoop = true;
while (this.getData ()) for (var i = 0; i < this.columnCount; i++) (data.get (keyWords.get (i))).addLast (this.columnData[i]);


this.isLoop = false;
}, "java.util.Map");
Clazz.overrideMethod (c$, "readLine", 
function () {
try {
this.line = (this.reader == null ? this.br.readLine () : this.reader.readNextLine ());
if (this.line == null) return null;
if (this.isHeader) {
if (this.line.startsWith ("#")) this.fileHeader.append (this.line).appendC ('\n');
 else this.isHeader = false;
}return this.line;
} catch (e) {
if (Clazz.exceptionOf (e, Exception)) {
return null;
} else {
throw e;
}
}
});
Clazz.overrideMethod (c$, "getData", 
function () {
if (this.isLoop) {
for (var i = 0; i < this.columnCount; ++i) if ((this.columnData[i] = this.getNextDataToken ()) == null) return false;

} else if (this.haveData) {
this.haveData = false;
} else {
return false;
}return (this.columnCount > 0);
});
Clazz.overrideMethod (c$, "skipLoop", 
function (doReport) {
var str;
var ret = (doReport ?  new JU.SB () : null);
var n = 0;
while ((str = this.peekToken ()) != null && str.charAt (0) == '_') {
if (ret != null) ret.append (str).append ("\n");
this.getTokenPeeked ();
n++;
}
if (n == 0) n = this.columnCount;
var m = 0;
while ((str = this.getNextDataToken ()) != null) {
if (ret == null) continue;
ret.append (str).append (" ");
if ((++m % n) == 0) ret.append ("\n");
}
return (ret == null ? null : ret.toString ());
}, "~B");
Clazz.overrideMethod (c$, "getNextToken", 
function () {
this.wasUnquoted = true;
return this.getNextTokenProtected ();
});
Clazz.defineMethod (c$, "getNextTokenObject", 
function () {
this.wasUnquoted = true;
return this.getNextTokenProtected ();
});
Clazz.defineMethod (c$, "getNextTokenProtected", 
function () {
return (this.getNextLine () ? this.nextStrToken () : null);
});
Clazz.overrideMethod (c$, "getNextDataToken", 
function () {
var o = this.peekToken ();
if (o == null) return null;
if (this.wasUnquoted && Clazz.instanceOf (o, String)) {
var str = o;
if (str.charAt (0) == '_' || str.startsWith ("loop_") || str.startsWith ("data_") || str.startsWith ("save_") || str.startsWith ("stop_") || str.startsWith ("global_")) return null;
}return this.getTokenPeeked ();
});
Clazz.overrideMethod (c$, "peekToken", 
function () {
if (!this.getNextLine ()) return null;
var ich = this.ich;
this.strPeeked = this.nextStrToken ();
this.ichPeeked = this.ich;
this.ich = ich;
return this.strPeeked;
});
Clazz.defineMethod (c$, "getNextLine", 
 function () {
while (!this.strHasMoreTokens ()) if (this.prepareNextLine () == null) return false;

return true;
});
Clazz.overrideMethod (c$, "getTokenPeeked", 
function () {
this.ich = this.ichPeeked;
return this.strPeeked;
});
Clazz.overrideMethod (c$, "fullTrim", 
function (str) {
var pt0 = -1;
var pt1 = str.length;
while (++pt0 < pt1 && JU.PT.isWhitespace (str.charAt (pt0))) {
}
while (--pt1 > pt0 && JU.PT.isWhitespace (str.charAt (pt1))) {
}
return str.substring (pt0, pt1 + 1);
}, "~S");
Clazz.overrideMethod (c$, "toUnicode", 
function (data) {
var pt;
try {
while ((pt = data.indexOf ('\\')) >= 0) {
var c = data.charCodeAt (pt + 1);
var ch = (c >= 65 && c <= 90 ? "ABX\u0394E\u03a6\u0393HI_K\u039bMNO\u03a0\u0398P\u03a3TY_\u03a9\u039e\u03a5Z".substring (c - 65, c - 64) : c >= 97 && c <= 122 ? "\u03b1\u03b2\u03c7\u03a4\u03a5\u03c6\u03b3\u03b7\u03b9_\u03ba\u03bb\u03bc\u03bd\u03bf\u03c0\u03b8\u03c1\u03c3\u03c4\u03c5_\u03c9\u03be\u03c5\u03b6".substring (c - 97, c - 96) : "_");
data = data.substring (0, pt) + ch + data.substring (pt + 2);
}
} catch (e) {
if (Clazz.exceptionOf (e, Exception)) {
} else {
throw e;
}
}
return data;
}, "~S");
Clazz.overrideMethod (c$, "parseDataBlockParameters", 
function (fields, key, data, key2col, col2key) {
this.isLoop = (key == null);
var o;
var s;
if (fields == null) {
this.columnNames =  new Array (100);
} else {
if (!JU.CifDataParser.htFields.containsKey (fields[0])) for (var i = fields.length; --i >= 0; ) JU.CifDataParser.htFields.put (fields[i], Integer.$valueOf (i));

for (var i = fields.length; --i >= 0; ) key2col[i] = -1;

}this.columnCount = 0;
var pt;
var i;
if (this.isLoop) {
while (true) {
o = this.peekToken ();
if (o == null) {
this.columnCount = 0;
break;
}if (!(Clazz.instanceOf (o, String)) || (o).charAt (0) != '_') break;
pt = this.columnCount++;
s = this.fixKey (this.getTokenPeeked ());
if (fields == null) {
this.columnNames[col2key[pt] = key2col[pt] = pt] = s;
continue;
}var iField = JU.CifDataParser.htFields.get (s);
i = (iField == null ? -1 : iField.intValue ());
if ((col2key[pt] = i) != -1) key2col[i] = pt;
}
} else {
pt = key.indexOf (".");
var str0 = (pt < 0 ? key : key.substring (0, pt + 1));
while (true) {
pt = this.columnCount++;
if (key == null) {
key = this.getTokenPeeked ();
data = this.getNextToken ();
}var iField = JU.CifDataParser.htFields.get (this.fixKey (key));
i = (iField == null ? -1 : iField.intValue ());
if ((col2key[pt] = i) != -1) this.columnData[key2col[i] = pt] = data;
if ((o = this.peekToken ()) == null || !(Clazz.instanceOf (o, String)) || !(o).startsWith (str0)) break;
key = null;
}
this.haveData = (this.columnCount > 0);
}}, "~A,~S,~S,~A,~A");
Clazz.overrideMethod (c$, "fixKey", 
function (key) {
return (key.startsWith ("_magnetic") ? key.substring (9) : key.startsWith ("_jana") ? key.substring (5) : key).$replace ('.', '_').toLowerCase ();
}, "~S");
Clazz.defineMethod (c$, "setString", 
function (str) {
this.str = this.line = str;
this.cch = (str == null ? 0 : str.length);
this.ich = 0;
return str;
}, "~S");
Clazz.defineMethod (c$, "prepareNextLine", 
function () {
this.setString (this.readLine ());
if (this.line == null || this.line.length == 0) return this.line;
if (this.line.charAt (0) == ';') return this.preprocessString ();
if (this.str.startsWith ("###non-st#")) this.ich = 10;
return this.line;
});
Clazz.defineMethod (c$, "preprocessString", 
function () {
return this.setString (this.preprocessSemiString ());
});
Clazz.defineMethod (c$, "preprocessSemiString", 
function () {
this.ich = 1;
var str = '\1' + this.line.substring (1) + '\n';
while (this.readLine () != null) {
if (this.line.startsWith (";")) {
str = str.substring (0, str.length - 1) + '\1' + this.line.substring (1);
break;
}str += this.line + '\n';
}
return str;
});
Clazz.defineMethod (c$, "strHasMoreTokens", 
 function () {
if (this.str == null) return false;
var ch = '#';
while (this.ich < this.cch && ((ch = this.str.charAt (this.ich)) == ' ' || ch == '\t')) ++this.ich;

return (this.ich < this.cch && ch != '#');
});
Clazz.defineMethod (c$, "nextStrToken", 
 function () {
if (this.ich == this.cch) return null;
var ch = this.str.charAt (this.ich);
if (this.isQuote (ch)) {
this.wasUnquoted = false;
return this.getQuotedStringOrObject (ch);
}var ichStart = this.ich;
this.wasUnquoted = true;
while (this.ich < this.cch && !this.isTerminator (ch = this.str.charAt (this.ich))) ++this.ich;

if (this.ich == ichStart + 1) if (this.nullString != null && (this.str.charAt (ichStart) == '.' || this.str.charAt (ichStart) == '?')) return this.nullString;
var s = this.str.substring (ichStart, this.ich);
return this.unquoted (s);
});
Clazz.defineMethod (c$, "unquoted", 
function (s) {
return s;
}, "~S");
Clazz.defineMethod (c$, "isTerminator", 
function (c) {
return c == ' ' || c == '\t' || c == this.cterm;
}, "~S");
Clazz.defineMethod (c$, "isQuote", 
function (ch) {
switch (ch) {
case '\'':
case '\"':
case '\1':
return true;
}
return false;
}, "~S");
Clazz.defineMethod (c$, "getQuotedStringOrObject", 
function (ch) {
var ichStart = this.ich;
var chClosingQuote = ch;
var wasQuote = false;
while (++this.ich < this.cch) {
ch = this.str.charAt (this.ich);
if (wasQuote && (ch == ' ' || ch == '\t')) break;
wasQuote = (ch == chClosingQuote);
}
var pt1 = ichStart + 1;
var pt2 = this.ich - 1;
if (this.ich == this.cch && !wasQuote) {
pt1--;
pt2++;
} else {
++this.ich;
}return this.str.substring (pt1, pt2);
}, "~S");
Clazz.defineStatics (c$,
"KEY_MAX", 100);
c$.htFields = c$.prototype.htFields =  new java.util.Hashtable ();
Clazz.defineStatics (c$,
"grABC", "ABX\u0394E\u03a6\u0393HI_K\u039bMNO\u03a0\u0398P\u03a3TY_\u03a9\u039e\u03a5Z",
"grabc", "\u03b1\u03b2\u03c7\u03a4\u03a5\u03c6\u03b3\u03b7\u03b9_\u03ba\u03bb\u03bc\u03bd\u03bf\u03c0\u03b8\u03c1\u03c3\u03c4\u03c5_\u03c9\u03be\u03c5\u03b6");
});
