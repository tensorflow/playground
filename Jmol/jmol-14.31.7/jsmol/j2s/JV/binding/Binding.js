Clazz.declarePackage ("JV.binding");
Clazz.load (["java.util.Hashtable"], "JV.binding.Binding", ["java.lang.Boolean", "java.util.Arrays", "JU.AU", "$.Lst", "$.PT", "$.SB", "J.api.Interface", "JU.Escape", "$.Logger"], function () {
c$ = Clazz.decorateAsClass (function () {
this.name = null;
this.bindings = null;
Clazz.instantialize (this, arguments);
}, JV.binding, "Binding");
Clazz.prepareFields (c$, function () {
this.bindings =  new java.util.Hashtable ();
});
c$.getMouseAction = Clazz.defineMethod (c$, "getMouseAction", 
function (clickCount, modifiers, mode) {
if (clickCount > 2) clickCount = 2;
switch (clickCount) {
case 0:
break;
case 1:
clickCount = 256;
break;
default:
clickCount = 512;
}
switch (mode) {
case 4:
mode = 4096;
break;
case 1:
mode = 8192;
break;
case 5:
mode = 16384;
break;
case 2:
mode = 32768;
break;
case 3:
mode = 32;
}
return (modifiers & 63) | clickCount | mode;
}, "~N,~N,~N");
c$.getMouseActionStr = Clazz.defineMethod (c$, "getMouseActionStr", 
function (desc) {
if (desc == null) return 0;
var mouseAction = 0;
desc = desc.toUpperCase ();
if (desc.indexOf ("MIDDLE") >= 0) mouseAction = 8;
 else if (desc.indexOf ("RIGHT") >= 0) mouseAction = 4;
 else if (desc.indexOf ("WHEEL") >= 0) mouseAction = 32;
 else mouseAction = 16;
if (desc.indexOf ("DOWN") >= 0) mouseAction |= 4096;
 else if (desc.indexOf ("DRAG") >= 0) mouseAction |= 8192;
 else if (desc.indexOf ("UP") >= 0) mouseAction |= 16384;
 else if (mouseAction != 32) mouseAction |= 32768;
if (mouseAction != 32 && desc.indexOf ("DOUBLE") >= 0) mouseAction |= 512;
 else if (mouseAction > 0) mouseAction |= 256;
if (mouseAction != (288) && desc.indexOf ("ALT") >= 0) mouseAction |= 8;
if (desc.indexOf ("CTRL") >= 0) mouseAction |= 2;
if (desc.indexOf ("SHIFT") >= 0) mouseAction |= 1;
return mouseAction;
}, "~S");
c$.getButtonMods = Clazz.defineMethod (c$, "getButtonMods", 
function (mouseAction) {
return mouseAction & 63;
}, "~N");
c$.getClickCount = Clazz.defineMethod (c$, "getClickCount", 
function (mouseAction) {
return (mouseAction & 768) >> 8;
}, "~N");
c$.getMouseActionName = Clazz.defineMethod (c$, "getMouseActionName", 
function (mouseAction, addSortCode) {
var sb =  new JU.SB ();
if (mouseAction == 0) return "";
var isMiddle = (JV.binding.Binding.includes (mouseAction, 8) && !JV.binding.Binding.includes (mouseAction, 16) && !JV.binding.Binding.includes (mouseAction, 4));
var code = "      ".toCharArray ();
if (JV.binding.Binding.includes (mouseAction, 2)) {
sb.append ("CTRL+");
code[5] = 'C';
}if (!isMiddle && JV.binding.Binding.includes (mouseAction, 8)) {
sb.append ("ALT+");
code[4] = 'A';
}if (JV.binding.Binding.includes (mouseAction, 1)) {
sb.append ("SHIFT+");
code[3] = 'S';
}if (JV.binding.Binding.includes (mouseAction, 16)) {
code[2] = 'L';
sb.append ("LEFT");
} else if (JV.binding.Binding.includes (mouseAction, 4)) {
code[2] = 'R';
sb.append ("RIGHT");
} else if (isMiddle) {
code[2] = 'M';
sb.append ("MIDDLE");
} else if (JV.binding.Binding.includes (mouseAction, 32)) {
code[2] = 'W';
sb.append ("WHEEL");
}if (JV.binding.Binding.includes (mouseAction, 512)) {
sb.append ("+double");
code[1] = '2';
}if (JV.binding.Binding.includes (mouseAction, 4096)) {
sb.append ("+down");
code[0] = '1';
} else if (JV.binding.Binding.includes (mouseAction, 8192)) {
sb.append ("+drag");
code[0] = '2';
} else if (JV.binding.Binding.includes (mouseAction, 16384)) {
sb.append ("+up");
code[0] = '3';
} else if (JV.binding.Binding.includes (mouseAction, 32768)) {
sb.append ("+click");
code[0] = '4';
}return (addSortCode ?  String.instantialize (code) + ":" + sb.toString () : sb.toString ());
}, "~N,~B");
Clazz.defineMethod (c$, "getBindings", 
function () {
return this.bindings;
});
Clazz.makeConstructor (c$, 
function () {
});
Clazz.defineMethod (c$, "bindAction", 
function (mouseAction, jmolAction) {
this.addBinding (mouseAction + "\t" + jmolAction,  Clazz.newIntArray (-1, [mouseAction, jmolAction]));
}, "~N,~N");
Clazz.defineMethod (c$, "bindName", 
function (mouseAction, name) {
this.addBinding (mouseAction + "\t", Boolean.TRUE);
this.addBinding (mouseAction + "\t" + name,  Clazz.newArray (-1, [JV.binding.Binding.getMouseActionName (mouseAction, false), name]));
}, "~N,~S");
Clazz.defineMethod (c$, "unbindAction", 
function (mouseAction, jmolAction) {
if (mouseAction == 0) this.unbindJmolAction (jmolAction);
 else this.removeBinding (null, mouseAction + "\t" + jmolAction);
}, "~N,~N");
Clazz.defineMethod (c$, "unbindName", 
function (mouseAction, name) {
if (name == null) this.unbindMouseAction (mouseAction);
 else this.removeBinding (null, mouseAction + "\t" + name);
}, "~N,~S");
Clazz.defineMethod (c$, "unbindJmolAction", 
function (jmolAction) {
var e = this.bindings.keySet ().iterator ();
var skey = "\t" + jmolAction;
while (e.hasNext ()) {
var key = e.next ();
if (key.endsWith (skey)) this.removeBinding (e, key);
}
}, "~N");
Clazz.defineMethod (c$, "addBinding", 
 function (key, value) {
if (JU.Logger.debugging) JU.Logger.debug ("adding binding " + key + "\t==\t" + JU.Escape.e (value));
this.bindings.put (key, value);
}, "~S,~O");
Clazz.defineMethod (c$, "removeBinding", 
 function (e, key) {
if (JU.Logger.debugging) JU.Logger.debug ("removing binding " + key);
if (e == null) this.bindings.remove (key);
 else e.remove ();
}, "java.util.Iterator,~S");
Clazz.defineMethod (c$, "unbindUserAction", 
function (script) {
var e = this.bindings.keySet ().iterator ();
var skey = "\t" + script;
while (e.hasNext ()) {
var key = e.next ();
if (key.endsWith (skey)) this.removeBinding (e, key);
}
}, "~S");
Clazz.defineMethod (c$, "unbindMouseAction", 
function (mouseAction) {
var e = this.bindings.keySet ().iterator ();
var skey = mouseAction + "\t";
while (e.hasNext ()) {
var key = e.next ();
if (key.startsWith (skey)) this.removeBinding (e, key);
}
}, "~N");
Clazz.defineMethod (c$, "isBound", 
function (mouseAction, jmolAction) {
return this.bindings.containsKey (mouseAction + "\t" + jmolAction);
}, "~N,~N");
Clazz.defineMethod (c$, "isUserAction", 
function (mouseAction) {
return this.bindings.containsKey (mouseAction + "\t");
}, "~N");
Clazz.defineMethod (c$, "getBindingInfo", 
function (actionInfo, actionNames, qualifiers) {
var sb =  new JU.SB ();
var qlow = (qualifiers == null || qualifiers.equalsIgnoreCase ("all") ? null : qualifiers.toLowerCase ());
var names =  new Array (actionInfo.length);
var user =  new JU.Lst ();
for (var obj, $obj = this.bindings.values ().iterator (); $obj.hasNext () && ((obj = $obj.next ()) || true);) {
if (Clazz.instanceOf (obj, Boolean)) {
} else if (JU.AU.isAS (obj)) {
var action = (obj)[0];
var script = (obj)[1];
if (qlow == null || qlow.indexOf ("user") >= 0 || action.indexOf (qlow) >= 0 || script.indexOf (qlow) >= 0) user.addLast (obj);
} else {
var info = obj;
var i = info[1];
if (names[i] == null) names[i] =  new JU.Lst ();
var name = JV.binding.Binding.getMouseActionName (info[0], true);
if (qlow == null || (actionNames[i] + ";" + actionInfo[i] + ";" + name).toLowerCase ().indexOf (qlow) >= 0) names[i].addLast (name);
}}
for (var i = 0; i < actionInfo.length; i++) {
var n;
if (names[i] == null || (n = names[i].size ()) == 0) continue;
this.addInfo (sb, names[i].toArray ( new Array (n)), actionNames[i], actionInfo[i]);
}
for (var i = 0; i < user.size (); i++) {
var info = user.get (i);
this.addInfo (sb,  Clazz.newArray (-1, ["USER:::" + info[0]]), "user-defined", info[1]);
}
return sb.toString ();
}, "~A,~A,~S");
Clazz.defineMethod (c$, "addInfo", 
 function (sb, list, name, info) {
java.util.Arrays.sort (list);
JU.PT.leftJustify (sb, "                      ", name);
sb.append ("\t");
var sep = "";
var len = sb.length ();
for (var j = 0; j < list.length; j++) {
sb.append (sep).append (list[j].substring (7));
sep = ", ";
}
len = sb.length () - len;
if (len < 20) sb.append ("                 ".substring (0, 20 - len));
sb.append ("\t").append (info).appendC ('\n');
}, "JU.SB,~A,~S,~S");
c$.includes = Clazz.defineMethod (c$, "includes", 
 function (mouseAction, mod) {
return ((mouseAction & mod) == mod);
}, "~N,~N");
c$.newBinding = Clazz.defineMethod (c$, "newBinding", 
function (vwr, name) {
return J.api.Interface.getInterface ("JV.binding." + name + "Binding", vwr, "script");
}, "JV.Viewer,~S");
Clazz.defineStatics (c$,
"LEFT", 16,
"MIDDLE", 8,
"RIGHT", 4,
"WHEEL", 32,
"ALT", 8,
"CTRL", 2,
"SHIFT", 1,
"CTRL_ALT", 10,
"CTRL_SHIFT", 3,
"MAC_COMMAND", 20,
"BUTTON_MASK", 28,
"BUTTON_MODIFIER_MASK", 63,
"SINGLE", 256,
"DOUBLE", 512,
"COUNT_MASK", 768,
"DOWN", 4096,
"DRAG", 8192,
"UP", 16384,
"CLICK", 32768,
"MODE_MASK", 61440);
});
