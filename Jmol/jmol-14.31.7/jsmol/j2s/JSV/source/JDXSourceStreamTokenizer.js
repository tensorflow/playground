Clazz.declarePackage ("JSV.source");
Clazz.load (null, "JSV.source.JDXSourceStreamTokenizer", ["java.lang.Character", "JU.SB", "JU.Logger"], function () {
c$ = Clazz.decorateAsClass (function () {
this.br = null;
this.rawLabel = null;
this.value = null;
this.labelLineNo = 0;
this.line = null;
this.lineNo = 0;
this.rawLine = null;
Clazz.instantialize (this, arguments);
}, JSV.source, "JDXSourceStreamTokenizer");
Clazz.makeConstructor (c$, 
function (br) {
this.br = br;
}, "java.io.BufferedReader");
Clazz.defineMethod (c$, "peakLabel", 
function () {
return this.nextLabel (false);
});
Clazz.defineMethod (c$, "getLabel", 
function () {
return this.nextLabel (true);
});
Clazz.defineMethod (c$, "nextLabel", 
 function (isGet) {
this.rawLabel = null;
this.value = null;
while (this.line == null || this.line.length == 0) {
try {
this.readLine ();
if (this.line == null) {
this.line = "";
return null;
}this.line = this.line.trim ();
} catch (e) {
if (Clazz.exceptionOf (e, java.io.IOException)) {
this.line = "";
return null;
} else {
throw e;
}
}
if (this.line.startsWith ("##")) break;
this.line = null;
}
this.rawLine = this.line;
var pt = this.line.indexOf ("=");
if (pt < 0) {
if (isGet) JU.Logger.info ("BAD JDX LINE -- no '=' (line " + this.lineNo + "): " + this.line);
this.rawLabel = this.line;
if (!isGet) this.line = "";
} else {
this.rawLabel = this.line.substring (0, pt).trim ();
if (isGet) this.line = this.line.substring (pt + 1);
}this.labelLineNo = this.lineNo;
if (JU.Logger.debugging) JU.Logger.info (this.rawLabel);
return JSV.source.JDXSourceStreamTokenizer.cleanLabel (this.rawLabel);
}, "~B");
c$.cleanLabel = Clazz.defineMethod (c$, "cleanLabel", 
function (label) {
if (label == null) return null;
var i;
var str =  new JU.SB ();
for (i = 0; i < label.length; i++) {
switch (label.charAt (i)) {
case '/':
case '\\':
case ' ':
case '-':
case '_':
break;
default:
str.appendC (label.charAt (i));
break;
}
}
return str.toString ().toUpperCase ();
}, "~S");
Clazz.defineMethod (c$, "getValue", 
function () {
if (this.value != null) return this.value;
var sb =  new JU.SB ().append (this.line);
if (sb.length () > 0) sb.appendC ('\n');
try {
while (this.readLine () != null) {
if (this.line.indexOf ("##") >= 0 && this.line.trim ().startsWith ("##")) break;
sb.append (this.line).appendC ('\n');
}
} catch (e) {
if (Clazz.exceptionOf (e, java.io.IOException)) {
JU.Logger.info (e.toString ());
} else {
throw e;
}
}
this.value = (this.rawLabel.startsWith ("##$") ? sb.toString ().trim () : JSV.source.JDXSourceStreamTokenizer.trimLines (sb));
if (JU.Logger.debugging) JU.Logger.info (this.value);
return this.value;
});
Clazz.defineMethod (c$, "readLineTrimmed", 
function () {
this.readLine ();
if (this.line == null) return null;
if (this.line.indexOf ("$$") < 0) return this.line.trim ();
var sb =  new JU.SB ().append (this.line);
return JSV.source.JDXSourceStreamTokenizer.trimLines (sb);
});
Clazz.defineMethod (c$, "flushLine", 
function () {
var sb =  new JU.SB ().append (this.line);
this.line = null;
return JSV.source.JDXSourceStreamTokenizer.trimLines (sb);
});
Clazz.defineMethod (c$, "readLine", 
 function () {
this.line = this.br.readLine ();
this.lineNo++;
return this.line;
});
c$.trimLines = Clazz.defineMethod (c$, "trimLines", 
 function (v) {
var n = v.length ();
var ilast = n - 1;
var vpt = JSV.source.JDXSourceStreamTokenizer.ptNonWhite (v, 0, n);
if (vpt >= n) return "";
var buffer =  Clazz.newCharArray (n - vpt, '\0');
var pt = 0;
for (; vpt < n; vpt++) {
var ch;
switch (ch = v.charAt (vpt)) {
case '\r':
if (vpt < ilast && v.charAt (vpt + 1) == '\n') continue;
ch = '\n';
break;
case '\n':
if (pt > 0 && buffer[pt - 1] != '\n') pt -= vpt - JSV.source.JDXSourceStreamTokenizer.ptNonSpaceRev (v, vpt) - 1;
vpt = JSV.source.JDXSourceStreamTokenizer.ptNonSpace (v, ++vpt, n) - 1;
break;
case '$':
if (vpt < ilast && v.charAt (vpt + 1) == '$') {
vpt++;
while (++vpt < n && "\n\r".indexOf (v.charAt (vpt)) < 0) {
}
continue;
}break;
}
if (ch == '\n' && pt > 0 && buffer[pt - 1] == '\n') continue;
buffer[pt++] = ch;
}
if (pt > 0 && buffer[pt - 1] == '\n') --pt;
return ( String.instantialize (buffer)).substring (0, pt).trim ();
}, "JU.SB");
c$.ptNonWhite = Clazz.defineMethod (c$, "ptNonWhite", 
 function (v, pt, n) {
while (pt < n && Character.isWhitespace (v.charAt (pt))) pt++;

return pt;
}, "JU.SB,~N,~N");
c$.ptNonSpace = Clazz.defineMethod (c$, "ptNonSpace", 
 function (v, pt, n) {
while (pt < n && (v.charAt (pt) == ' ' || v.charAt (pt) == '\t')) pt++;

return pt;
}, "JU.SB,~N,~N");
c$.ptNonSpaceRev = Clazz.defineMethod (c$, "ptNonSpaceRev", 
 function (v, pt) {
while (--pt >= 0 && (v.charAt (pt) == ' ' || v.charAt (pt) == '\t')) {
}
return pt;
}, "JU.SB,~N");
});
