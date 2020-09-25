Clazz.declarePackage ("J.jvxl.readers");
Clazz.load (null, "J.jvxl.readers.XmlReader", ["JU.P3", "$.PT", "$.SB", "JU.Escape"], function () {
c$ = Clazz.decorateAsClass (function () {
this.br = null;
this.line = null;
Clazz.instantialize (this, arguments);
}, J.jvxl.readers, "XmlReader");
Clazz.defineMethod (c$, "getLine", 
function () {
return this.line;
});
Clazz.makeConstructor (c$, 
function (br) {
this.br = br;
}, "java.io.BufferedReader");
Clazz.defineMethod (c$, "toTag", 
function (name) {
this.skipTo ("<" + name);
if (this.line == null) return "";
var i = this.line.indexOf ("<" + name) + name.length + 1;
if (i == this.line.length) return this.line;
if (this.line.charAt (i) == ' ' || this.line.charAt (i) == '>') return this.line;
this.line = null;
return this.toTag (name);
}, "~S");
Clazz.defineMethod (c$, "skipTag", 
function (name) {
this.skipTo ("</" + name + ">");
}, "~S");
Clazz.defineMethod (c$, "getXmlData", 
function (name, data, withTag, allowSelfCloseOption) {
var closer = "</" + name + ">";
var tag = "<" + name;
if (data == null) {
var sb =  new JU.SB ();
try {
if (this.line == null) this.line = this.br.readLine ();
while (this.line.indexOf (tag) < 0) {
this.line = this.br.readLine ();
}
} catch (e) {
if (Clazz.exceptionOf (e, Exception)) {
return null;
} else {
throw e;
}
}
sb.append (this.line);
var selfClosed = false;
var pt = this.line.indexOf ("/>");
var pt1 = this.line.indexOf (">");
if (pt1 < 0 || pt == pt1 - 1) selfClosed = allowSelfCloseOption;
while (this.line.indexOf (closer) < 0 && (!selfClosed || this.line.indexOf ("/>") < 0)) sb.append (this.line = this.br.readLine ());

data = sb.toString ();
}return J.jvxl.readers.XmlReader.extractTag (data, tag, closer, withTag);
}, "~S,~S,~B,~B");
c$.extractTagOnly = Clazz.defineMethod (c$, "extractTagOnly", 
function (data, tag) {
return J.jvxl.readers.XmlReader.extractTag (data, "<" + tag + ">", "</" + tag + ">", false);
}, "~S,~S");
c$.extractTag = Clazz.defineMethod (c$, "extractTag", 
 function (data, tag, closer, withTag) {
var pt1 = data.indexOf (tag);
if (pt1 < 0) return "";
var pt2 = data.indexOf (closer, pt1);
if (pt2 < 0) {
pt2 = data.indexOf ("/>", pt1);
closer = "/>";
}if (pt2 < 0) return "";
if (withTag) {
pt2 += closer.length;
return data.substring (pt1, pt2);
}var quoted = false;
for (; pt1 < pt2; pt1++) {
var ch;
if ((ch = data.charAt (pt1)) == '"') quoted = !quoted;
 else if (quoted && ch == '\\') pt1++;
 else if (!quoted && (ch == '>' || ch == '/')) break;
}
if (pt1 >= pt2) return "";
while (JU.PT.isWhitespace (data.charAt (++pt1))) {
}
return J.jvxl.readers.XmlReader.unwrapCdata (data.substring (pt1, pt2));
}, "~S,~S,~S,~B");
c$.unwrapCdata = Clazz.defineMethod (c$, "unwrapCdata", 
function (s) {
return (s.startsWith ("<![CDATA[") && s.endsWith ("]]>") ? JU.PT.rep (s.substring (9, s.length - 3), "]]]]><![CDATA[>", "]]>") : s);
}, "~S");
c$.getXmlAttrib = Clazz.defineMethod (c$, "getXmlAttrib", 
function (data, what) {
var nexta =  Clazz.newIntArray (1, 0);
var pt = J.jvxl.readers.XmlReader.setNext (data, what, nexta, 1);
if (pt < 2 || (pt = J.jvxl.readers.XmlReader.setNext (data, "\"", nexta, 0)) < 2) return "";
var pt1 = J.jvxl.readers.XmlReader.setNext (data, "\"", nexta, -1);
return (pt1 <= 0 ? "" : data.substring (pt, pt1));
}, "~S,~S");
Clazz.defineMethod (c$, "getXmlPoint", 
function (data, key) {
var spt = J.jvxl.readers.XmlReader.getXmlAttrib (data, key).$replace ('(', '{').$replace (')', '}');
var value = JU.Escape.uP (spt);
if (Clazz.instanceOf (value, JU.P3)) return value;
return  new JU.P3 ();
}, "~S,~S");
c$.setNext = Clazz.defineMethod (c$, "setNext", 
 function (data, what, next, offset) {
var ipt = next[0];
if (ipt < 0 || (ipt = data.indexOf (what, next[0])) < 0) return -1;
ipt += what.length;
next[0] = ipt + offset;
if (offset > 0 && ipt < data.length && data.charAt (ipt) != '=') return J.jvxl.readers.XmlReader.setNext (data, what, next, offset);
return next[0];
}, "~S,~S,~A,~N");
Clazz.defineMethod (c$, "skipTo", 
 function (key) {
if (this.line == null) this.line = this.br.readLine ();
while (this.line != null && this.line.indexOf (key) < 0) this.line = this.br.readLine ();

}, "~S");
Clazz.defineMethod (c$, "isNext", 
function (name) {
if (this.line == null || this.line.indexOf ("</") >= 0 && this.line.indexOf ("</") == this.line.indexOf ("<")) this.line = this.br.readLine ();
return (this.line.indexOf ("<" + name) >= 0);
}, "~S");
});
