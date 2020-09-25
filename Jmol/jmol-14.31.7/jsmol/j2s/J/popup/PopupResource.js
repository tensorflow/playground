Clazz.declarePackage ("J.popup");
Clazz.load (null, "J.popup.PopupResource", ["java.io.BufferedReader", "$.StringReader", "java.util.Properties", "JU.SB"], function () {
c$ = Clazz.decorateAsClass (function () {
this.structure = null;
this.words = null;
Clazz.instantialize (this, arguments);
}, J.popup, "PopupResource");
Clazz.makeConstructor (c$, 
function (menuStructure, menuText) {
this.structure =  new java.util.Properties ();
this.words =  new java.util.Properties ();
this.buildStructure (menuStructure);
this.localize (menuStructure != null, menuText);
}, "~S,java.util.Properties");
Clazz.defineMethod (c$, "getStructure", 
function (key) {
return this.structure.getProperty (key);
}, "~S");
Clazz.defineMethod (c$, "getWord", 
function (key) {
var str = this.words.getProperty (key);
return (str == null ? key : str);
}, "~S");
Clazz.defineMethod (c$, "setStructure", 
function (slist, gt) {
var br =  new java.io.BufferedReader ( new java.io.StringReader (slist));
var line;
var pt;
try {
while ((line = br.readLine ()) != null) {
if (line.length == 0 || line.charAt (0) == '#') continue;
pt = line.indexOf ("=");
if (pt < 0) {
pt = line.length;
line += "=";
}var name = line.substring (0, pt).trim ();
var value = line.substring (pt + 1).trim ();
var label = null;
if ((pt = name.indexOf ("|")) >= 0) {
label = name.substring (pt + 1).trim ();
name = name.substring (0, pt).trim ();
}if (name.length == 0) continue;
if (value.length > 0) this.structure.setProperty (name, value);
if (label != null && label.length > 0) this.words.setProperty (name, (gt == null ? label : gt.translate (label)));
}
} catch (e) {
if (Clazz.exceptionOf (e, Exception)) {
} else {
throw e;
}
}
try {
br.close ();
} catch (e) {
if (Clazz.exceptionOf (e, Exception)) {
} else {
throw e;
}
}
}, "~S,J.api.Translator");
Clazz.defineMethod (c$, "addItems", 
function (itemPairs) {
var previous = "";
for (var i = 0; i < itemPairs.length; i++) {
var pair = itemPairs[i];
var str = pair[1];
if (str == null) str = previous;
previous = str;
this.structure.setProperty (pair[0], str);
}
}, "~A");
Clazz.defineMethod (c$, "localize", 
 function (haveUserMenu, menuText) {
var wordContents = this.getWordContents ();
for (var i = 0; i < wordContents.length; i++) {
var item = wordContents[i++];
var word = this.words.getProperty (item);
if (word == null) word = wordContents[i];
this.words.setProperty (item, word);
if (menuText != null && item.indexOf ("Text") >= 0) menuText.setProperty (item, word);
}
}, "~B,java.util.Properties");
Clazz.defineMethod (c$, "getStuctureAsText", 
function (title, menuContents, structureContents) {
return "# " + this.getMenuName () + ".mnu " + title + "\n\n" + "# Part I -- Menu Structure\n" + "# ------------------------\n\n" + this.dumpStructure (menuContents) + "\n\n" + "# Part II -- Key Definitions\n" + "# --------------------------\n\n" + this.dumpStructure (structureContents) + "\n\n" + "# Part III -- Word Translations\n" + "# -----------------------------\n\n" + this.dumpWords ();
}, "~S,~A,~A");
Clazz.defineMethod (c$, "dumpWords", 
 function () {
var wordContents = this.getWordContents ();
var s =  new JU.SB ();
for (var i = 0; i < wordContents.length; i++) {
var key = wordContents[i++];
if (this.structure.getProperty (key) == null) s.append (key).append (" | ").append (wordContents[i]).appendC ('\n');
}
return s.toString ();
});
Clazz.defineMethod (c$, "dumpStructure", 
 function (items) {
var previous = "";
var s =  new JU.SB ();
for (var i = 0; i < items.length; i++) {
var key = items[i][0];
var label = this.words.getProperty (key);
if (label != null) key += " | " + label;
s.append (key).append (" = ").append (items[i][1] == null ? previous : (previous = items[i][1])).appendC ('\n');
}
return s.toString ();
}, "~A");
});
