Clazz.declarePackage ("JSV.source");
Clazz.load (null, "JSV.source.XMLParser", ["java.lang.Character", "java.util.Hashtable", "JU.SB"], function () {
c$ = Clazz.decorateAsClass (function () {
this.thisEvent = null;
this.buffer = null;
if (!Clazz.isClassDefined ("JSV.source.XMLParser.DataBuffer")) {
JSV.source.XMLParser.$XMLParser$DataBuffer$ ();
}
if (!Clazz.isClassDefined ("JSV.source.XMLParser.DataString")) {
JSV.source.XMLParser.$XMLParser$DataString$ ();
}
if (!Clazz.isClassDefined ("JSV.source.XMLParser.XmlEvent")) {
JSV.source.XMLParser.$XMLParser$XmlEvent$ ();
}
if (!Clazz.isClassDefined ("JSV.source.XMLParser.Tag")) {
JSV.source.XMLParser.$XMLParser$Tag$ ();
}
Clazz.instantialize (this, arguments);
}, JSV.source, "XMLParser");
Clazz.prepareFields (c$, function () {
this.thisEvent = Clazz.innerTypeInstance (JSV.source.XMLParser.XmlEvent, this, null, 0);
});
Clazz.makeConstructor (c$, 
function (br) {
this.buffer = Clazz.innerTypeInstance (JSV.source.XMLParser.DataBuffer, this, null, br);
}, "java.io.BufferedReader");
Clazz.defineMethod (c$, "getBufferData", 
function () {
return (this.buffer == null ? null : this.buffer.data.toString ().substring (0, this.buffer.ptr));
});
Clazz.defineMethod (c$, "thisValue", 
function () {
return this.buffer.nextEvent ().toString ().trim ();
});
Clazz.defineMethod (c$, "qualifiedValue", 
function () {
this.buffer.nextTag ();
var value = this.buffer.nextEvent ().toString ().trim ();
this.buffer.nextTag ();
return value;
});
Clazz.defineMethod (c$, "peek", 
function () {
this.thisEvent = this.buffer.peek ();
return this.thisEvent.getEventType ();
});
Clazz.defineMethod (c$, "hasNext", 
function () {
return this.buffer.hasNext ();
});
Clazz.defineMethod (c$, "nextTag", 
function () {
while ((this.thisEvent = this.buffer.nextTag ()).eventType == 6) {
}
});
Clazz.defineMethod (c$, "nextEvent", 
function () {
this.thisEvent = this.buffer.nextEvent ();
return this.thisEvent.getEventType ();
});
Clazz.defineMethod (c$, "nextStartTag", 
function () {
this.thisEvent = this.buffer.nextTag ();
while (!this.thisEvent.isStartElement ()) this.thisEvent = this.buffer.nextTag ();

});
Clazz.defineMethod (c$, "getTagName", 
function () {
return this.thisEvent.getTagName ();
});
Clazz.defineMethod (c$, "getTagType", 
function () {
return this.thisEvent.getTagType ();
});
Clazz.defineMethod (c$, "getEndTag", 
function () {
return this.thisEvent.getTagName ();
});
Clazz.defineMethod (c$, "nextValue", 
function () {
this.buffer.nextTag ();
return this.buffer.nextEvent ().toString ().trim ();
});
Clazz.defineMethod (c$, "getAttributeList", 
function () {
return this.thisEvent.toString ().toLowerCase ();
});
Clazz.defineMethod (c$, "getAttrValueLC", 
function (key) {
return this.getAttrValue (key).toLowerCase ();
}, "~S");
Clazz.defineMethod (c$, "getAttrValue", 
function (name) {
var a = this.thisEvent.getAttributeByName (name);
return (a == null ? "" : a);
}, "~S");
Clazz.defineMethod (c$, "getCharacters", 
function () {
var sb =  new JU.SB ();
this.thisEvent = this.buffer.peek ();
var eventType = this.thisEvent.getEventType ();
while (eventType != 4) this.thisEvent = this.buffer.nextEvent ();

while (eventType == 4) {
this.thisEvent = this.buffer.nextEvent ();
eventType = this.thisEvent.getEventType ();
if (eventType == 4) sb.append (this.thisEvent.toString ());
}
return sb.toString ();
});
Clazz.defineMethod (c$, "requiresEndTag", 
function () {
var tagType = this.thisEvent.getTagType ();
return tagType != 3 && tagType != 6;
});
c$.$XMLParser$DataBuffer$ = function () {
Clazz.pu$h(self.c$);
c$ = Clazz.decorateAsClass (function () {
Clazz.prepareCallback (this, arguments);
Clazz.instantialize (this, arguments);
}, JSV.source.XMLParser, "DataBuffer", JSV.source.XMLParser.DataString, null, Clazz.innerTypeInstance (JSV.source.XMLParser.DataString, this, null, Clazz.inheritArgs));
Clazz.makeConstructor (c$, 
function (a) {
Clazz.superConstructor (this, JSV.source.XMLParser.DataBuffer, []);
this.reader = a;
}, "java.io.BufferedReader");
Clazz.defineMethod (c$, "hasNext", 
function () {
if (this.ptr == this.ptEnd) try {
this.readLine ();
} catch (e) {
if (Clazz.exceptionOf (e, Exception)) {
return false;
} else {
throw e;
}
}
return this.ptr < this.ptEnd;
});
Clazz.overrideMethod (c$, "readLine", 
function () {
var a = this.reader.readLine ();
if (a == null) {
return false;
}this.data.append (a + "\n");
this.ptEnd = this.data.length ();
return true;
});
Clazz.defineMethod (c$, "peek", 
function () {
if (this.ptEnd - this.ptr < 2) try {
this.readLine ();
} catch (e) {
if (Clazz.exceptionOf (e, Exception)) {
return Clazz.innerTypeInstance (JSV.source.XMLParser.XmlEvent, this, null, 8);
} else {
throw e;
}
}
var a = this.ptr;
var b = Clazz.innerTypeInstance (JSV.source.XMLParser.XmlEvent, this, null, this);
this.ptr = a;
return b;
});
Clazz.defineMethod (c$, "nextTag", 
function () {
this.flush ();
this.skipTo ('<', false);
var a = Clazz.innerTypeInstance (JSV.source.XMLParser.XmlEvent, this, null, this);
return a;
});
Clazz.defineMethod (c$, "nextEvent", 
function () {
this.flush ();
return Clazz.innerTypeInstance (JSV.source.XMLParser.XmlEvent, this, null, this);
});
c$ = Clazz.p0p ();
};
c$.$XMLParser$DataString$ = function () {
Clazz.pu$h(self.c$);
c$ = Clazz.decorateAsClass (function () {
Clazz.prepareCallback (this, arguments);
this.data = null;
this.reader = null;
this.ptr = 0;
this.ptEnd = 0;
Clazz.instantialize (this, arguments);
}, JSV.source.XMLParser, "DataString");
Clazz.makeConstructor (c$, 
function () {
this.data =  new JU.SB ();
});
Clazz.makeConstructor (c$, 
function (a) {
this.data = a;
this.ptEnd = a.length ();
}, "JU.SB");
Clazz.defineMethod (c$, "getNCharactersRemaining", 
function () {
return this.ptEnd - this.ptr;
});
Clazz.defineMethod (c$, "flush", 
function () {
if (this.data.length () < 1000 || this.ptEnd - this.ptr > 100) return;
this.data =  new JU.SB ().append (this.data.substring (this.ptr));
this.ptr = 0;
this.ptEnd = this.data.length ();
});
Clazz.defineMethod (c$, "substring", 
function (a, b) {
return this.data.toString ().substring (a, b);
}, "~N,~N");
Clazz.defineMethod (c$, "skipOver", 
function (a, b) {
if (this.skipTo (a, b) > 0 && this.ptr != this.ptEnd) {
this.ptr++;
}return this.ptr;
}, "~S,~B");
Clazz.defineMethod (c$, "skipTo", 
function (a, b) {
if (this.data == null) return -1;
var c;
if (this.ptr == this.ptEnd) {
if (this.reader == null) return -1;
this.readLine ();
}var d = this.ptEnd - 1;
while (this.ptr < this.ptEnd && (c = this.data.charAt (this.ptr)) != a) {
if (b && c == '\\' && this.ptr < d) {
if ((c = this.data.charAt (this.ptr + 1)) == '"' || c == '\\') this.ptr++;
} else if (c == '"') {
this.ptr++;
if (this.skipTo ('"', true) < 0) return -1;
}if (++this.ptr == this.ptEnd) {
if (this.reader == null) return -1;
this.readLine ();
}}
return this.ptr;
}, "~S,~B");
Clazz.defineMethod (c$, "readLine", 
function () {
return false;
});
c$ = Clazz.p0p ();
};
c$.$XMLParser$XmlEvent$ = function () {
Clazz.pu$h(self.c$);
c$ = Clazz.decorateAsClass (function () {
Clazz.prepareCallback (this, arguments);
this.eventType = 0;
this.ptr = 0;
this.tag = null;
this.data = null;
Clazz.instantialize (this, arguments);
}, JSV.source.XMLParser, "XmlEvent");
Clazz.overrideMethod (c$, "toString", 
function () {
return (this.data != null ? this.data : this.tag != null ? this.tag.text : null);
});
Clazz.makeConstructor (c$, 
function (a) {
this.eventType = a;
}, "~N");
Clazz.makeConstructor (c$, 
function (a) {
this.ptr = a.ptr;
var b = a.getNCharactersRemaining ();
this.eventType = (b == 0 ? 8 : b == 1 || a.data.charAt (a.ptr) != '<' ? 4 : a.data.charAt (a.ptr + 1) != '/' ? 1 : 2);
if (this.eventType == 8) return;
if (this.eventType == 4) {
a.skipTo ('<', false);
this.data = a.data.toString ().substring (this.ptr, a.ptr);
} else {
a.skipOver ('>', false);
var c = a.data.toString ().substring (this.ptr, a.ptr);
if (c.startsWith ("<!--")) this.eventType = 6;
this.tag = Clazz.innerTypeInstance (JSV.source.XMLParser.Tag, this, null, c);
}}, "JSV.source.XMLParser.DataBuffer");
Clazz.defineMethod (c$, "getEventType", 
function () {
return this.eventType;
});
Clazz.defineMethod (c$, "isStartElement", 
function () {
return (this.eventType & 1) != 0;
});
Clazz.defineMethod (c$, "getTagName", 
function () {
return (this.tag == null ? null : this.tag.getName ());
});
Clazz.defineMethod (c$, "getTagType", 
function () {
return (this.tag == null ? 0 : this.tag.tagType);
});
Clazz.defineMethod (c$, "getAttributeByName", 
function (a) {
return (this.tag == null ? null : this.tag.getAttributeByName (a));
}, "~S");
c$ = Clazz.p0p ();
};
c$.$XMLParser$Tag$ = function () {
Clazz.pu$h(self.c$);
c$ = Clazz.decorateAsClass (function () {
Clazz.prepareCallback (this, arguments);
this.tagType = 0;
this.name = null;
this.text = null;
this.attributes = null;
Clazz.instantialize (this, arguments);
}, JSV.source.XMLParser, "Tag");
Clazz.makeConstructor (c$, 
function () {
});
Clazz.makeConstructor (c$, 
function (a) {
this.text = a;
this.tagType = (a.startsWith ("<!--") ? 6 : a.charAt (1) == '/' ? 2 : a.charAt (a.length - 2) == '/' ? 3 : 1);
}, "~S");
Clazz.defineMethod (c$, "getName", 
function () {
if (this.name != null) return this.name;
var a = (this.tagType == 2 ? 2 : 1);
var b = this.text.length - (this.tagType == 3 ? 2 : 1);
while (a < b && Character.isWhitespace (this.text.charAt (a))) a++;

var c = a;
while (a < b && !Character.isWhitespace (this.text.charAt (a))) a++;

return this.name = this.text.substring (c, a).toLowerCase ().trim ();
});
Clazz.defineMethod (c$, "getAttributeByName", 
function (a) {
if (this.attributes == null) this.getAttributes ();
return this.attributes.get (a.toLowerCase ());
}, "~S");
Clazz.defineMethod (c$, "getAttributes", 
 function () {
this.attributes =  new java.util.Hashtable ();
var a = Clazz.innerTypeInstance (JSV.source.XMLParser.DataString, this, null,  new JU.SB ().append (this.text));
try {
if (a.skipTo (' ', false) < 0) return;
var b;
while ((b = ++a.ptr) >= 0) {
if (a.skipTo ('=', false) < 0) return;
var c = a.substring (b, a.ptr).trim ().toLowerCase ();
a.skipTo ('"', false);
b = ++a.ptr;
a.skipTo ('"', true);
var d = a.substring (b, a.ptr);
this.attributes.put (c, d);
var e = c.indexOf (":");
if (e >= 0) {
c = c.substring (e).trim ();
this.attributes.put (c, d);
}}
} catch (e) {
if (Clazz.exceptionOf (e, Exception)) {
} else {
throw e;
}
}
});
c$ = Clazz.p0p ();
};
Clazz.defineStatics (c$,
"TAG_NONE", 0,
"START_ELEMENT", 1,
"END_ELEMENT", 2,
"START_END_ELEMENT", 3,
"CHARACTERS", 4,
"COMMENT", 6,
"EOF", 8);
});
