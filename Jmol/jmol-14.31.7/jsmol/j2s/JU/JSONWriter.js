Clazz.declarePackage ("JU");
Clazz.load (null, "JU.JSONWriter", ["java.lang.Boolean", "$.Double", "$.Float", "$.Number", "java.lang.reflect.Array", "java.util.List", "$.Map", "JU.OC", "$.PT", "JS.SV"], function () {
c$ = Clazz.decorateAsClass (function () {
this.oc = null;
this.indent = 0;
this.modifiedKeys = null;
this.writeNullAsString = false;
this.whiteSpace = false;
this.ws = "";
Clazz.instantialize (this, arguments);
}, JU, "JSONWriter");
Clazz.defineMethod (c$, "setModifyKeys", 
function (mapNewToOld) {
this.modifiedKeys = mapNewToOld;
}, "java.util.Map");
Clazz.defineMethod (c$, "setWriteNullAsString", 
function (b) {
this.writeNullAsString = b;
}, "~B");
Clazz.defineMethod (c$, "append", 
function (s) {
if (s != null) if (this.whiteSpace) this.oc.append ("\t\t\t\t\t\t\t\t\t\t\t\t\t\t".substring (0, Math.min (this.indent, "\t\t\t\t\t\t\t\t\t\t\t\t\t\t".length)));
this.oc.append (s);
return this.oc;
}, "~S");
Clazz.defineMethod (c$, "setStream", 
function (os) {
this.oc =  new JU.OC ().setParams (null, null, true, os);
}, "java.io.OutputStream");
Clazz.defineMethod (c$, "closeStream", 
function () {
this.oc.append ("\n");
this.oc.closeChannel ();
return true;
});
Clazz.defineMethod (c$, "writeObject", 
function (o) {
if (o == null) {
this.writeNull ();
} else if (Clazz.instanceOf (o, java.util.Map)) {
this.writeMap (o);
} else if (Clazz.instanceOf (o, java.util.List)) {
this.writeList (o);
} else if (Clazz.instanceOf (o, String)) {
this.writeString (o);
} else if (Clazz.instanceOf (o, Boolean)) {
this.writeBoolean (o);
} else if (Clazz.instanceOf (o, Number)) {
this.writeNumber (o);
} else if (o.getClass ().isArray ()) {
this.writeArray (o);
} else if (Clazz.instanceOf (o, JS.SV)) {
this.append ((o).toJSON ());
} else {
this.writeString (o.toString ());
}}, "~O");
Clazz.defineMethod (c$, "writeNull", 
function () {
this.oc.append (this.writeNullAsString ? "\"null\"" : "null");
});
Clazz.defineMethod (c$, "writeNumber", 
function (o) {
var s = o.toString ();
if (s.equals ("NaN")) {
this.writeString (s);
} else {
this.oc.append (s);
}}, "Number");
Clazz.defineMethod (c$, "writeBoolean", 
function (o) {
this.oc.append (o.toString ());
}, "Boolean");
Clazz.defineMethod (c$, "writeString", 
function (str) {
this.oc.append (JU.PT.esc (str));
}, "~S");
Clazz.defineMethod (c$, "writeString", 
function (str, sbSym) {
sbSym.append (JU.PT.esc (str));
}, "~S,JU.SB");
Clazz.defineMethod (c$, "writeMap", 
function (map) {
if (map.isEmpty ()) {
this.append ("{}");
return;
}this.mapOpen ();
{
var sep = "";
for (var entry, $entry = map.entrySet ().iterator (); $entry.hasNext () && ((entry = $entry.next ()) || true);) {
var key = entry.getKey ();
var value = this.getAndCheckValue (map, key);
if (value == null) continue;
this.oc.append (sep);
this.mapAddKeyValue (key, value, null);
sep = "," + this.ws;
}
}this.mapClose ();
}, "java.util.Map");
Clazz.defineMethod (c$, "getAndCheckValue", 
function (map, key) {
return map.get (key);
}, "java.util.Map,~S");
Clazz.defineMethod (c$, "mapOpen", 
function () {
this.oc.append ("{" + this.ws);
this.indent++;
});
Clazz.defineMethod (c$, "mapClose", 
function () {
this.indent--;
this.oc.append (this.ws);
this.append ("}");
});
Clazz.defineMethod (c$, "mapAddKey", 
function (key) {
this.append ("");
if (this.modifiedKeys != null && this.modifiedKeys.containsKey (key)) key = this.modifiedKeys.get (key);
this.writeString (key);
this.oc.append (":");
}, "~S");
Clazz.defineMethod (c$, "mapAddKeyValue", 
function (key, value, terminator) {
this.mapAddKey (key);
this.writeObject (value);
if (terminator != null) this.oc.append (terminator);
}, "~S,~O,~S");
Clazz.defineMethod (c$, "mapAddKeyValueRaw", 
function (key, value, terminator) {
this.mapAddKey (key);
this.oc.append (value.toString ());
if (terminator != null) this.oc.append (terminator);
}, "~S,~O,~S");
Clazz.defineMethod (c$, "mapAddMapAllExcept", 
function (key, map, except) {
this.mapAddKey (key);
this.mapOpen ();
{
var sep = "";
for (var entry, $entry = map.entrySet ().iterator (); $entry.hasNext () && ((entry = $entry.next ()) || true);) {
var key1 = entry.getKey ();
if (JU.PT.isOneOf (key1, except)) continue;
this.oc.append (sep);
this.mapAddKeyValue (key1, entry.getValue (), null);
sep = "," + this.ws;
}
}this.mapClose ();
}, "~S,java.util.Map,~S");
Clazz.defineMethod (c$, "writeList", 
function (list) {
var n = list.size ();
this.arrayOpen (false);
for (var i = 0; i < n; i++) {
if (i > 0) this.oc.append (",");
this.arrayAdd (list.get (i));
}
this.arrayClose (false);
}, "java.util.List");
Clazz.defineMethod (c$, "writeArray", 
function (o) {
this.arrayOpen (false);
var n = java.lang.reflect.Array.getLength (o);
for (var i = 0; i < n; i++) {
if (i > 0) this.oc.append (",");
this.arrayAdd (java.lang.reflect.Array.get (o, i));
}
this.arrayClose (false);
}, "~O");
Clazz.defineMethod (c$, "arrayOpen", 
function (andIndent) {
this.oc.append ("[");
if (andIndent) this.indent++;
}, "~B");
Clazz.defineMethod (c$, "arrayAdd", 
function (o) {
this.writeObject (Clazz.instanceOf (o, Float) && (o).isNaN () || Clazz.instanceOf (o, Double) && (o).isNaN () ? "NaN" : o);
}, "~O");
Clazz.defineMethod (c$, "arrayClose", 
function (andIndent) {
if (andIndent) {
this.indent--;
this.append ("");
}this.oc.append ("]");
}, "~B");
Clazz.defineMethod (c$, "setWhiteSpace", 
function (b) {
this.whiteSpace = b;
this.ws = (b ? "\n" : "");
}, "~B");
Clazz.defineStatics (c$,
"SPACES", "\t\t\t\t\t\t\t\t\t\t\t\t\t\t");
});
