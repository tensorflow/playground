Clazz.declarePackage ("JS");
Clazz.load (["java.util.Hashtable"], "JS.SmilesParser", ["java.lang.Character", "$.Float", "JU.Lst", "$.PT", "$.SB", "JS.InvalidSmilesException", "$.SmilesAtom", "$.SmilesBond", "$.SmilesMeasure", "$.SmilesSearch", "$.SmilesStereo", "JU.Elements", "$.Logger"], function () {
c$ = Clazz.decorateAsClass (function () {
this.connections = null;
this.htMeasures = null;
this.flags = 0;
this.isSmarts = false;
this.isBioSequence = false;
this.bioType = '\0';
this.braceCount = 0;
this.branchLevel = 0;
this.componentCount = 0;
this.componentParenCount = 0;
this.ignoreStereochemistry = false;
this.bondDirectionPaired = true;
this.isTarget = false;
Clazz.instantialize (this, arguments);
}, JS, "SmilesParser");
Clazz.prepareFields (c$, function () {
this.connections =  new java.util.Hashtable ();
this.htMeasures =  new java.util.Hashtable ();
});
c$.newSearch = Clazz.defineMethod (c$, "newSearch", 
function (pattern, isSmarts, isTarget) {
return ( new JS.SmilesParser (isSmarts, isTarget)).parse (pattern);
}, "~S,~B,~B");
Clazz.makeConstructor (c$, 
function (isSmarts, isTarget) {
this.isSmarts = isSmarts;
this.isTarget = isTarget;
}, "~B,~B");
Clazz.defineMethod (c$, "parse", 
function (pattern) {
if (pattern == null) throw  new JS.InvalidSmilesException ("expression must not be null");
var search =  new JS.SmilesSearch ();
if (pattern.indexOf ("$(select") >= 0) pattern = this.parseNested (search, pattern, "select");
var ret =  Clazz.newIntArray (1, 0);
pattern = JS.SmilesParser.extractFlags (pattern, ret);
this.flags = ret[0];
search.setFlags (this.flags);
if (pattern.indexOf ("$") >= 0) pattern = this.parseVariables (pattern);
if (this.isSmarts && pattern.indexOf ("[$") >= 0) pattern = this.parseVariableLength (pattern);
if (pattern.indexOf ("||") < 0) return this.getSubsearch (search, pattern, this.flags);
var patterns = JU.PT.split (pattern, "||");
var toDo = "";
search.subSearches =  new Array (patterns.length);
for (var i = 0; i < patterns.length; i++) {
var key = "|" + patterns[i] + "|";
if (toDo.indexOf (key) < 0) {
search.subSearches[i] = this.getSubsearch (search, patterns[i], this.flags);
toDo += key;
}}
return search;
}, "~S");
Clazz.defineMethod (c$, "parseVariableLength", 
 function (pattern) {
var sout =  new JU.SB ();
var len = pattern.length - 1;
var nParen = 0;
var haveInternalOr = false;
for (var i = 0; i < len; i++) {
switch (pattern.charAt (i)) {
case '(':
nParen++;
break;
case ')':
nParen--;
break;
case '|':
if (nParen > 0) {
haveInternalOr = true;
if (pattern.charAt (i + 1) == '|') {
pattern = pattern.substring (0, i) + pattern.substring (i + 1);
len--;
}}break;
}
}
if (pattern.indexOf ("||") >= 0) {
var patterns = JU.PT.split (pattern, "||");
for (var i = 0; i < patterns.length; i++) sout.append ("||").append (this.parseVariableLength (patterns[i]));

} else {
var pt = -1;
var ret =  Clazz.newIntArray (1, 0);
var isOK = true;
var bracketed = null;
while ((pt = pattern.indexOf ("[$", pt + 1)) >= 0) {
var pt0 = pt;
var min = -2147483648;
var max = -2147483648;
pt = JS.SmilesParser.getDigits (pattern, pt + 2, ret);
min = ret[0];
if (min != -2147483648) {
if (JS.SmilesParser.getChar (pattern, pt) == '-') {
pt = JS.SmilesParser.getDigits (pattern, pt + 1, ret);
max = ret[0];
}}if (JS.SmilesParser.getChar (pattern, pt) != '(') continue;
bracketed = JS.SmilesParser.getSubPattern (pattern, pt0, '[');
if (!bracketed.endsWith (")")) continue;
var pt1 = pt0 + bracketed.length + 2;
var repeat = JS.SmilesParser.getSubPattern (pattern, pt, '(');
var pt2 = pt;
bracketed = JS.SmilesParser.getSubPattern (pattern, pt, '[');
pt += 1 + repeat.length;
if (repeat.indexOf (':') >= 0 && repeat.indexOf ('|') < 0) {
var parenCount = 0;
var n = repeat.length;
var ptColon = -1;
for (var i = 0; i < n; i++) {
switch (repeat.charAt (i)) {
case '[':
case '(':
parenCount++;
break;
case ')':
case ']':
parenCount--;
break;
case '.':
if (ptColon >= 0 && parenCount == 0) n = i;
break;
case ':':
if (ptColon < 0 && parenCount == 0) ptColon = i;
break;
}
}
if (ptColon > 0) repeat = repeat.substring (0, ptColon) + "(" + repeat.substring (ptColon, n) + ")" + repeat.substring (n);
}if (min == -2147483648) {
var ptOr = repeat.indexOf ("|");
if (ptOr >= 0) return this.parseVariableLength (pattern.substring (0, pt0) + "[$1" + pattern.substring (pt2, pt2 + ptOr + 1) + ")]" + pattern.substring (pt1) + "||" + pattern.substring (0, pt0) + "[$1(" + pattern.substring (pt2 + ptOr + 2) + pattern.substring (pt1));
continue;
}if (max == -2147483648) max = min;
if (repeat.indexOf ("|") >= 0) repeat = "[$(" + repeat + ")]";
for (var i = min; i <= max; i++) {
var sb =  new JU.SB ();
sb.append ("||").append (pattern.substring (0, pt0));
for (var j = 0; j < i; j++) sb.append (repeat);

sb.append (pattern.substring (pt1));
sout.appendSB (sb);
}
}
if (!isOK) throw  new JS.InvalidSmilesException ("bad variable expression: " + bracketed);
}return (haveInternalOr ? this.parseVariableLength (sout.substring (2)) : sout.length () < 2 ? pattern : sout.substring (2));
}, "~S");
Clazz.defineMethod (c$, "getSubsearch", 
function (parent, pattern, flags) {
this.htMeasures =  new java.util.Hashtable ();
var search =  new JS.SmilesSearch ();
search.setTop (parent);
search.isSmarts = this.isSmarts;
search.pattern = pattern;
search.setFlags (flags);
if (pattern.indexOf ("$(") >= 0) pattern = this.parseNested (search, pattern, "");
this.parseSmiles (search, pattern, null, false);
if (this.braceCount != 0) throw  new JS.InvalidSmilesException ("unmatched '{'");
if (!this.connections.isEmpty ()) throw  new JS.InvalidSmilesException ("Open connection");
search.set ();
if (this.isSmarts) for (var i = search.ac; --i >= 0; ) this.checkNested (search, search.patternAtoms[i], flags);

 else if (!this.isBioSequence) search.elementCounts[1] = search.getMissingHydrogenCount ();
if (!this.ignoreStereochemistry && !this.isTarget) this.fixChirality (search);
return search;
}, "JS.SmilesSearch,~S,~N");
Clazz.defineMethod (c$, "checkNested", 
 function (search, atom, flags) {
if (atom.iNested > 0) {
var o = search.getNested (atom.iNested);
if (Clazz.instanceOf (o, String)) {
var s = o;
if (s.startsWith ("select")) return;
if (s.charAt (0) != '~' && atom.bioType != '\0') s = "~" + atom.bioType + "~" + s;
var nested = this.getSubsearch (search, s, flags);
if (nested.ac > 0 && nested.patternAtoms[0].selected) atom.selected = true;
search.setNested (atom.iNested, nested);
}}for (var i = 0; i < atom.nSubAtoms; i++) this.checkNested (search, atom.subAtoms[i], flags);

}, "JS.SmilesSearch,JS.SmilesAtom,~N");
Clazz.defineMethod (c$, "fixChirality", 
 function (search) {
for (var i = search.ac; --i >= 0; ) {
var sAtom = search.patternAtoms[i];
if (sAtom.stereo != null) sAtom.stereo.fixStereo (sAtom);
}
}, "JS.SmilesSearch");
Clazz.defineMethod (c$, "parseSmiles", 
 function (search, pattern, currentAtom, isBranchAtom) {
var ret =  Clazz.newIntArray (1, 0);
var pt = 0;
var ch;
var bond = null;
var wasMeasure = false;
var wasBranch = false;
loop : while (pattern != null && pattern.length != 0) {
var index = 0;
if (currentAtom == null) {
index = this.checkBioType (pattern, 0);
if (index == pattern.length) pattern += "*";
if (this.isBioSequence) search.needAromatic = search.top.needAromatic = false;
}ch = JS.SmilesParser.getChar (pattern, index);
var haveOpen = this.checkBrace (search, ch, '{');
if (haveOpen) ch = JS.SmilesParser.getChar (pattern, ++index);
if (ch == '(') {
var subString = JS.SmilesParser.getSubPattern (pattern, index, '(');
var isMeasure = (JS.SmilesParser.getChar (pattern, index + 1) == '.');
if (currentAtom == null) {
if (isMeasure || !this.isSmarts) throw  new JS.InvalidSmilesException ("No previous atom for measure");
search.haveComponents = true;
do {
this.componentCount++;
this.componentParenCount++;
ch = JS.SmilesParser.getChar (pattern = pattern.substring (1), 0);
} while (ch == '(');
if (!haveOpen && (haveOpen = this.checkBrace (search, ch, '{')) == true) ch = JS.SmilesParser.getChar (pattern = pattern.substring (1), 0);
} else {
wasMeasure = wasBranch = false;
if (subString.startsWith (".")) {
this.parseMeasure (search, subString.substring (1), currentAtom);
wasMeasure = true;
} else if (subString.length == 0 && this.isBioSequence) {
currentAtom.notCrossLinked = true;
} else {
this.branchLevel++;
this.parseSmiles (search, subString, currentAtom, true);
wasBranch = true;
this.branchLevel--;
}index = subString.length + 2;
ch = JS.SmilesParser.getChar (pattern, index);
if (ch == '}' && this.checkBrace (search, ch, '}')) index++;
ch = '\0';
}}if (ch != '\0') {
pt = index;
out : while (ch != '\0') {
switch (JS.SmilesBond.isBondType (ch, this.isSmarts, this.isBioSequence)) {
case 1:
break;
case 0:
break out;
case -1:
if (!((JU.PT.isDigit (JS.SmilesParser.getChar (pattern, ++index)) && index++ > 0 ? JU.PT.isDigit (JS.SmilesParser.getChar (pattern, index++)) : true) && (ch = JS.SmilesParser.getChar (pattern, index)) == '-')) throw  new JS.InvalidSmilesException ("malformed atropisomerism bond ^nn-  or ^^nn-");
continue;
}
ch = JS.SmilesParser.getChar (pattern, ++index);
}
ch = JS.SmilesParser.getChar (pattern, index);
if (ch == ')') {
switch (ch = JS.SmilesParser.getChar (pattern, ++index)) {
case '\0':
case ')':
case '.':
pattern = pattern.substring (index);
this.componentParenCount--;
if (this.componentParenCount >= 0) continue loop;
}
throw  new JS.InvalidSmilesException ("invalid continuation after component grouping (SMARTS).(SMARTS)");
}bond = this.parseBond (search, null, pattern.substring (pt, index), null, currentAtom, false, isBranchAtom, index - pt, ret);
if (haveOpen && bond.order != -1) ch = JS.SmilesParser.getChar (pattern, index = pt);
if (this.checkBrace (search, ch, '{')) ch = JS.SmilesParser.getChar (pattern, ++index);
switch (ch) {
case '~':
if (bond.order == 0) {
index = this.checkBioType (pattern, index);
if (index == pattern.length) pattern += "*";
}break;
case '(':
do {
this.componentCount++;
this.componentParenCount++;
ch = JS.SmilesParser.getChar (pattern, ++index);
} while (ch == '(');
break;
case '\0':
if (bond.order == 0) return;
}
var isConnect = (JU.PT.isDigit (ch) || ch == '%');
var isAtom = (!isConnect && (ch == '_' || ch == '[' || ch == '*' || JU.PT.isLetter (ch)));
if (isConnect) {
if (wasMeasure || wasBranch) throw  new JS.InvalidSmilesException ("connection number must immediately follow its connecting atom");
index = JS.SmilesParser.getRingNumber (pattern, index, ch, ret);
var ringNumber = ret[0];
this.parseConnection (search, ringNumber, currentAtom, bond);
bond = null;
} else if (isAtom) {
wasMeasure = wasBranch = false;
switch (ch) {
case '[':
case '_':
var subPattern = JS.SmilesParser.getSubPattern (pattern, index, ch);
index += subPattern.length + (ch == '[' ? 2 : 0);
if (this.isBioSequence && ch == '[' && subPattern.indexOf (".") < 0 && subPattern.indexOf ("_") < 0) subPattern += ".0";
currentAtom = this.parseAtom (search, null, subPattern, currentAtom, bond, ch == '[', false, isBranchAtom);
currentAtom.hasSubpattern = true;
if (bond.order != -1 && bond.order != 0) this.setBondAtom (bond, null, currentAtom, search);
bond = null;
break;
default:
var ch2 = (!this.isBioSequence && JU.PT.isUpperCase (ch) ? JS.SmilesParser.getChar (pattern, index + 1) : '\0');
if (ch != 'X' || ch2 != 'x') if (!JU.PT.isLowerCase (ch2) || JU.Elements.elementNumberFromSymbol (pattern.substring (index, index + 2), true) == 0) ch2 = '\0';
if (ch2 != '\0' && "NA CA BA PA SC AC".indexOf (pattern.substring (index, index + 2)) >= 0) {
ch2 = '\0';
}var size = (JU.PT.isUpperCase (ch) && JU.PT.isLowerCase (ch2) ? 2 : 1);
currentAtom = this.parseAtom (search, null, pattern.substring (index, index + size), currentAtom, bond, false, false, isBranchAtom);
bond = null;
index += size;
}
} else {
throw  new JS.InvalidSmilesException ("Unexpected character: " + JS.SmilesParser.getChar (pattern, index));
}ch = JS.SmilesParser.getChar (pattern, index);
if (ch == '}' && this.checkBrace (search, ch, '}')) index++;
}pattern = pattern.substring (index);
isBranchAtom = false;
}
}, "JS.SmilesSearch,~S,JS.SmilesAtom,~B");
Clazz.defineMethod (c$, "parseConnection", 
 function (search, ringNum, currentAtom, bond) {
var r = Integer.$valueOf (ringNum);
var bond0 = this.connections.get (r);
if (bond0 == null) {
this.connections.put (r, bond);
search.top.ringCount++;
return;
}this.connections.remove (r);
switch (bond.order) {
case -1:
bond.order = (bond0.order != -1 ? bond0.order : this.isSmarts || currentAtom.isAromatic && bond0.atom1.isAromatic ? 81 : 1);
break;
case 1025:
bond.order = 1041;
break;
case 1041:
bond.order = 1025;
break;
}
if (bond0.order != -1 && bond0.order != bond.order || currentAtom === bond0.atom1 || bond0.atom1.getBondTo (currentAtom) != null) throw  new JS.InvalidSmilesException ("Bad connection type or atom");
bond0.set (bond);
currentAtom.bondCount--;
bond0.setAtom2 (currentAtom, search);
}, "JS.SmilesSearch,~N,JS.SmilesAtom,JS.SmilesBond");
Clazz.defineMethod (c$, "setBondAtom", 
 function (bond, a1, a2, search) {
bond.set2a (a1, a2);
if (search != null && bond.order == 2 && bond.atom1 != null && bond.atom2 != null && bond.atom1.isAromatic && bond.atom2.isAromatic && ((this.flags & 512) == 0)) search.setFlags (this.flags = (this.flags | 512));
}, "JS.SmilesBond,JS.SmilesAtom,JS.SmilesAtom,JS.SmilesSearch");
c$.getRingNumber = Clazz.defineMethod (c$, "getRingNumber", 
function (pattern, index, ch, ret) {
var ringNumber;
switch (ch) {
case '%':
if (JS.SmilesParser.getChar (pattern, index + 1) == '(') {
var subPattern = JS.SmilesParser.getSubPattern (pattern, index + 1, '(');
JS.SmilesParser.getDigits (subPattern, 0, ret);
index += subPattern.length + 3;
if (ret[0] < 0) throw  new JS.InvalidSmilesException ("Invalid number designation: " + subPattern);
} else {
if (index + 3 <= pattern.length) index = JS.SmilesParser.getDigits (pattern.substring (0, index + 3), index + 1, ret);
if (ret[0] < 10) throw  new JS.InvalidSmilesException ("Two digits must follow the % sign");
}ringNumber = ret[0];
break;
default:
ringNumber = ch.charCodeAt (0) - 48;
index++;
}
ret[0] = ringNumber;
return index;
}, "~S,~N,~S,~A");
Clazz.defineMethod (c$, "checkBioType", 
 function (pattern, index) {
this.isBioSequence = (pattern.charAt (index) == '~');
if (this.isBioSequence) {
index++;
this.bioType = '*';
var ch = JS.SmilesParser.getChar (pattern, 2);
if (ch == '~' && ((ch = pattern.charAt (1)) == '*' || JU.PT.isLowerCase (ch))) {
this.bioType = ch;
index = 3;
}}return index;
}, "~S,~N");
Clazz.defineMethod (c$, "parseMeasure", 
 function (search, strMeasure, currentAtom) {
var pt = strMeasure.indexOf (":");
var id = (pt < 0 ? strMeasure : strMeasure.substring (0, pt));
while (pt != 0) {
var len = id.length;
if (len == 1) id += "0";
var m = this.htMeasures.get (id);
if ((m == null) == (pt < 0) || len == 0) break;
try {
if (pt > 0) {
var type = ("__dat".indexOf (id.charAt (0)));
if (type < 2) break;
var ret =  Clazz.newIntArray (1, 0);
JS.SmilesParser.getDigits (id, 1, ret);
var index = ret[0];
strMeasure = strMeasure.substring (pt + 1);
var isNot = strMeasure.startsWith ("!");
if (isNot) strMeasure = strMeasure.substring (1);
var isNegative = (strMeasure.startsWith ("-"));
if (isNegative) strMeasure = strMeasure.substring (1);
strMeasure = JU.PT.rep (strMeasure, "-", ",");
strMeasure = JU.PT.rep (strMeasure, ",,", ",-");
if (isNegative) strMeasure = "-" + strMeasure;
var tokens = JU.PT.split (strMeasure, ",");
if (tokens.length % 2 == 1 || isNot && tokens.length != 2) break;
var vals =  Clazz.newFloatArray (tokens.length, 0);
var i = tokens.length;
for (; --i >= 0; ) if (Float.isNaN (vals[i] = Float.parseFloat (tokens[i]))) break;

if (i >= 0) break;
m =  new JS.SmilesMeasure (search, index, type, isNot, vals);
search.measures.addLast (m);
if (index > 0) this.htMeasures.put (id, m);
 else if (index == 0 && JU.Logger.debugging) JU.Logger.debug ("measure created: " + m);
} else {
if (!m.addPoint (currentAtom.index)) break;
if (m.nPoints == m.type) {
this.htMeasures.remove (id);
if (JU.Logger.debugging) JU.Logger.debug ("measure created: " + m);
}return;
}if (!m.addPoint (currentAtom.index)) break;
} catch (e) {
if (Clazz.exceptionOf (e, NumberFormatException)) {
break;
} else {
throw e;
}
}
return;
}
throw  new JS.InvalidSmilesException ("invalid measure: " + strMeasure);
}, "JS.SmilesSearch,~S,JS.SmilesAtom");
Clazz.defineMethod (c$, "checkBrace", 
 function (search, ch, type) {
switch (ch) {
case '{':
if (ch != type) break;
this.braceCount++;
search.top.haveSelected = true;
return true;
case '}':
if (ch != type) break;
if (this.braceCount > 0) {
this.braceCount--;
return true;
}break;
default:
return false;
}
throw  new JS.InvalidSmilesException ("Unmatched '}'");
}, "JS.SmilesSearch,~S,~S");
Clazz.defineMethod (c$, "parseNested", 
 function (search, pattern, prefix) {
var index;
prefix = "$(" + prefix;
while ((index = pattern.lastIndexOf (prefix)) >= 0) {
var s = JS.SmilesParser.getSubPattern (pattern, index + 1, '(');
var pt = index + s.length + 3;
var ext = pattern.substring (pt);
pattern = pattern.substring (0, index);
var op = "";
if (pattern.endsWith ("]")) throw  new JS.InvalidSmilesException ("$(...) must be enclosed in brackets: " + pattern + "$(" + s + ")");
if (index > 1 && prefix.length == 2 && ((pt = pattern.length) > 1 && ",;&![".indexOf (pattern.substring (pt - 1)) < 0)) op = "&";
if (ext.length > 1 && ",;&!)]".indexOf (ext.charAt (0)) < 0) ext = "&" + ext;
pattern = pattern + op + "_" + search.top.addNested (s) + "_" + ext;
}
return pattern;
}, "JS.SmilesSearch,~S,~S");
Clazz.defineMethod (c$, "parseVariables", 
 function (pattern) {
var keys =  new JU.Lst ();
var values =  new JU.Lst ();
var index;
var ipt = 0;
var iptLast = -1;
if (JU.Logger.debugging) JU.Logger.info (pattern);
while ((index = pattern.indexOf ("$", ipt)) >= 0) {
if (JS.SmilesParser.getChar (pattern, index + 1) == '(') break;
ipt = JS.SmilesParser.skipTo (pattern, index, '=');
if (ipt <= index + 1 || JS.SmilesParser.getChar (pattern, ipt + 1) != '\"') break;
var key = pattern.substring (index, ipt);
if (key.lastIndexOf ('$') > 0 || key.indexOf (']') > 0) throw  new JS.InvalidSmilesException ("Invalid variable name: " + key);
var s = JS.SmilesParser.getSubPattern (pattern, ipt + 1, '\"');
keys.addLast ("[" + key + "]");
values.addLast (s);
ipt += s.length + 2;
ipt = JS.SmilesParser.skipTo (pattern, ipt, ';');
iptLast = ++ipt;
}
if (iptLast < 0) return pattern;
pattern = pattern.substring (iptLast);
for (var i = keys.size (); --i >= 0; ) {
var k = keys.get (i);
var v = values.get (i);
if (!v.equals (k)) pattern = JU.PT.rep (pattern, k, v);
}
if (JU.Logger.debugging) JU.Logger.info (pattern);
return pattern;
}, "~S");
Clazz.defineMethod (c$, "parseAtom", 
 function (search, atomSet, pattern, atom, bond, isBracketed, isAND, isBranchAtom) {
if (pattern == null || pattern.length == 0) throw  new JS.InvalidSmilesException ("Empty atom definition");
var newAtom =  new JS.SmilesAtom ();
if (this.componentParenCount > 0) newAtom.component = this.componentCount;
if (atomSet == null) search.appendAtom (newAtom);
var isNewAtom = true;
if (!this.checkLogic (search, pattern, newAtom, null, atom, isAND, isBranchAtom, null)) {
var ret =  Clazz.newIntArray (1, 0);
if (this.isBioSequence && pattern.length == 1) pattern += ".0";
var ch = pattern.charAt (0);
var index = 0;
var isNot = false;
if (this.isSmarts && ch == '!') {
ch = JS.SmilesParser.getChar (pattern, ++index);
if (ch == '\0') throw  new JS.InvalidSmilesException ("invalid '!'");
newAtom.not = isNot = true;
}var biopt = pattern.indexOf ('.');
if (biopt >= 0) {
newAtom.isBioResidue = true;
var resOrName = pattern.substring (index, biopt);
pattern = pattern.substring (biopt + 1).toUpperCase ();
var len = resOrName.length;
if ((biopt = resOrName.indexOf ("^")) >= 0) {
if (biopt == len - 2) {
ch = resOrName.charAt (len - 1);
if (ch != '*') newAtom.insCode = ch;
}resOrName = resOrName.substring (0, biopt);
}if ((biopt = resOrName.indexOf ("#")) >= 0) {
JS.SmilesParser.getDigits (resOrName, biopt + 1, ret);
newAtom.residueNumber = ret[0];
resOrName = resOrName.substring (0, biopt);
}if (resOrName.length == 0) resOrName = "*";
if (resOrName.length > 1) newAtom.residueName = resOrName.toUpperCase ();
 else if (!resOrName.equals ("*")) newAtom.residueChar = resOrName;
resOrName = pattern;
if ((biopt = resOrName.indexOf ("#")) >= 0) {
JS.SmilesParser.getDigits (resOrName, biopt + 1, ret);
newAtom.elementNumber = ret[0];
resOrName = resOrName.substring (0, biopt);
}if (resOrName.length == 0) resOrName = "*";
 else if (resOrName.equals ("0")) resOrName = "\0";
if (resOrName.equals ("*")) newAtom.isBioAtomWild = true;
 else newAtom.setAtomName (resOrName);
ch = '\0';
}newAtom.setBioAtom (this.bioType);
var hydrogenCount = -2147483648;
while (ch != '\0' && isNewAtom) {
newAtom.setAtomName (this.isBioSequence ? "\0" : "");
if (JU.PT.isDigit (ch)) {
index = JS.SmilesParser.getDigits (pattern, index, ret);
var mass = ret[0];
if (mass == -2147483648) throw  new JS.InvalidSmilesException ("Non numeric atomic mass");
if (JS.SmilesParser.getChar (pattern, index) == '?') {
index++;
mass = -mass;
}if (newAtom.elementDefined) throw  new JS.InvalidSmilesException ("atom mass must precede atom symbol or be separated from it with \";\"");
newAtom.setAtomicMass (mass);
} else {
switch (ch) {
case '"':
var type = JU.PT.getQuotedStringAt (pattern, index);
index += type.length + 2;
newAtom.atomType = type;
break;
case '_':
index = JS.SmilesParser.getDigits (pattern, index + 1, ret) + 1;
if (ret[0] == -2147483648) throw  new JS.InvalidSmilesException ("Invalid SEARCH primitive: " + pattern.substring (index));
newAtom.iNested = ret[0];
if (!isBracketed) throw  new JS.InvalidSmilesException ("nesting must appear in [...]: $(" + search.getNested (ret[0]) + ")");
if (this.isBioSequence && index != pattern.length) throw  new JS.InvalidSmilesException ("invalid characters: " + pattern.substring (index));
break;
case '=':
index = JS.SmilesParser.getDigits (pattern, index + 1, ret);
newAtom.jmolIndex = ret[0];
break;
case '#':
var isAtomNo = (pattern.charAt (index + 1) == '-');
index = JS.SmilesParser.getDigits (pattern, index + (isAtomNo ? 2 : 1), ret);
if (isAtomNo) newAtom.atomNumber = ret[0];
 else newAtom.elementNumber = ret[0];
break;
case '-':
case '+':
index = this.checkCharge (pattern, index, newAtom);
break;
case '@':
if (search.stereo == null) search.stereo = JS.SmilesStereo.newStereo (search);
index = JS.SmilesStereo.checkChirality (search, pattern, index, search.patternAtoms[newAtom.index]);
break;
case ':':
index = JS.SmilesParser.getDigits (pattern, ++index, ret);
if (ret[0] == -2147483648) throw  new JS.InvalidSmilesException ("Invalid atom class");
newAtom.atomClass = ret[0];
break;
default:
var nextChar = JS.SmilesParser.getChar (pattern, index + 1);
var len = index + (JU.PT.isLowerCase (nextChar) && (!isBracketed || !JU.PT.isDigit (JS.SmilesParser.getChar (pattern, index + 2))) ? 2 : 1);
var sym2 = pattern.substring (index + 1, len);
var symbol = Character.toUpperCase (ch) + sym2;
var mustBeSymbol = true;
var checkForPrimitive = (isBracketed && JU.PT.isLetter (ch));
if (checkForPrimitive) {
if (!isNot && (isAND ? atomSet : newAtom).hasSymbol) {
mustBeSymbol = false;
} else if (ch == 'H') {
mustBeSymbol = (pattern.length == 1 || !JU.PT.isDigit (nextChar));
} else if (JU.PT.isDigit (nextChar)) {
mustBeSymbol = false;
} else if (!symbol.equals ("A") && !symbol.equals ("Xx")) {
mustBeSymbol = ((ch == 'h' ? len == 2 : true) && JU.Elements.elementNumberFromSymbol (symbol, true) > 0);
if (!mustBeSymbol && len == 2) {
sym2 = "";
symbol = symbol.substring (0, 1);
mustBeSymbol = (JU.Elements.elementNumberFromSymbol (symbol, true) > 0);
}}}if (mustBeSymbol) {
if (!isBracketed && !this.isSmarts && !this.isBioSequence && !JS.SmilesAtom.allowSmilesUnbracketed (symbol) || !newAtom.setSymbol (symbol = ch + sym2)) throw  new JS.InvalidSmilesException ("Invalid atom symbol: " + symbol);
if (isAND) atomSet.hasSymbol = true;
index += symbol.length;
} else {
index = JS.SmilesParser.getDigits (pattern, index + 1, ret);
var val = ret[0];
switch (ch) {
default:
throw  new JS.InvalidSmilesException ("Invalid SEARCH primitive: " + pattern.substring (index));
case 'D':
newAtom.setDegree (val == -2147483648 ? 1 : val);
break;
case 'd':
newAtom.setNonhydrogenDegree (val == -2147483648 ? 1 : val);
break;
case 'H':
hydrogenCount = (val == -2147483648 ? 1 : val);
break;
case 'h':
newAtom.setImplicitHydrogenCount (val == -2147483648 ? -1 : val);
break;
case 'R':
if (val == -2147483648) val = -1;
newAtom.setRingMembership (val);
search.top.needRingData = true;
break;
case 'r':
if (val == -2147483648) {
val = -1;
newAtom.setRingMembership (val);
} else {
newAtom.setRingSize (val);
switch (val) {
case 500:
val = 5;
break;
case 600:
val = 6;
break;
}
if (val > search.ringDataMax) search.ringDataMax = val;
}search.top.needRingData = true;
break;
case 'v':
newAtom.setValence (val == -2147483648 ? 1 : val);
break;
case 'X':
newAtom.setConnectivity (val == -2147483648 ? 1 : val);
break;
case 'x':
newAtom.setRingConnectivity (val == -2147483648 ? -1 : val);
search.top.needRingData = true;
break;
}
}}
}ch = JS.SmilesParser.getChar (pattern, index);
if (isNot && ch != '\0') throw  new JS.InvalidSmilesException ("'!' may only involve one primitive.");
}
if (hydrogenCount == -2147483648 && isBracketed) hydrogenCount = -2147483647;
newAtom.setExplicitHydrogenCount (hydrogenCount);
search.patternAtoms[newAtom.index].setExplicitHydrogenCount (hydrogenCount);
}if (this.braceCount > 0) newAtom.selected = true;
if (isNewAtom && atomSet != null) atomSet.addSubAtom (newAtom, isAND);
if (atom != null && bond.order == 0) {
newAtom.notBondedIndex = atom.index;
}if (atom != null && bond.order != 0) {
if (bond.order == -1) bond.order = (this.isBioSequence && isBranchAtom ? 112 : this.isSmarts || atom.isAromatic && newAtom.isAromatic ? 81 : 1);
if (!isBracketed) this.setBondAtom (bond, null, newAtom, search);
if (this.branchLevel == 0 && (bond.order == 17 || bond.order == 112)) this.branchLevel++;
}if (this.branchLevel == 0) search.lastChainAtom = newAtom;
return newAtom;
}, "JS.SmilesSearch,JS.SmilesAtom,~S,JS.SmilesAtom,JS.SmilesBond,~B,~B,~B");
Clazz.defineMethod (c$, "checkCharge", 
 function (pattern, index, newAtom) {
var len = pattern.length;
var ch = pattern.charAt (index);
var count = 1;
++index;
if (index < len) {
var nextChar = pattern.charAt (index);
if (JU.PT.isDigit (nextChar)) {
var ret =  Clazz.newIntArray (1, 0);
index = JS.SmilesParser.getDigits (pattern, index, ret);
count = ret[0];
if (count == -2147483648) throw  new JS.InvalidSmilesException ("Non numeric charge");
} else {
while (index < len && pattern.charAt (index) == ch) {
index++;
count++;
}
}}newAtom.setCharge (ch == '+' ? count : -count);
return index;
}, "~S,~N,JS.SmilesAtom");
Clazz.defineMethod (c$, "parseBond", 
 function (search, bondSet, pattern, bond, currentAtom, isAND, isBranchAtom, len, ret) {
var ch;
if (len > 0) {
switch (ch = pattern.charAt (0)) {
case '>':
if (!pattern.equals (">>")) {
len = -1;
break;
}case '.':
if (bond == null && bondSet == null) {
this.isBioSequence = (JS.SmilesParser.getChar (pattern, 1) == '~');
return  new JS.SmilesBond (null, null, 0, false);
}len = -1;
break;
case '+':
if (bondSet != null) len = -1;
break;
}
} else {
ch = '\0';
}var newBond = (bondSet == null ? (bond == null ?  new JS.SmilesBond (currentAtom, null, (this.isBioSequence && currentAtom != null ? (isBranchAtom ? 112 : 96) : -1), false) : bond) : isAND ? bondSet.addPrimitive () : bondSet.addBondOr ());
if (len > 0 && !this.checkLogic (search, pattern, null, newBond, currentAtom, isAND, false, ret)) {
var isBondNot = (ch == '!');
if (isBondNot) {
ch = JS.SmilesParser.getChar (pattern, 1);
if (ch == '\0' || ch == '!') throw  new JS.InvalidSmilesException ("invalid '!'");
}var bondType = JS.SmilesBond.getBondTypeFromCode (ch);
if (bondType == 65) search.top.needRingMemberships = true;
if (currentAtom == null && bondType != 0) throw  new JS.InvalidSmilesException ("Bond without a previous atom");
switch (bondType) {
case 65537:
case 65538:
if ((len = pattern.length) < (isBondNot ? 3 : 2) || pattern.charAt (len - 1) != '-') {
len = 0;
} else {
if (len == (isBondNot ? 3 : 2)) {
newBond.setAtropType (22);
} else {
JS.SmilesParser.getDigits (pattern, (isBondNot ? 2 : 1), ret);
newBond.setAtropType (ret[0]);
}}search.haveBondStereochemistry = true;
break;
case 1025:
case 1041:
this.bondDirectionPaired = !this.bondDirectionPaired;
search.haveBondStereochemistry = true;
break;
case 17:
break;
case 2:
search.top.nDouble++;
case 1:
if (currentAtom.isAromatic) search.top.needRingData = true;
break;
}
newBond.set2 (bondType, isBondNot);
if (this.isBioSequence && bondSet != null) bondSet.set2 (bondType, isBondNot);
}if (len == -1) throw  new JS.InvalidSmilesException ("invalid bond:" + ch);
return newBond;
}, "JS.SmilesSearch,JS.SmilesBond,~S,JS.SmilesBond,JS.SmilesAtom,~B,~B,~N,~A");
Clazz.defineMethod (c$, "checkLogic", 
 function (search, pattern, atom, bond, currentAtom, isAND, isBranchAtom, ret) {
var pt = pattern.lastIndexOf ("!");
if (atom != null) atom.pattern = pattern;
while (pt > 0) {
if (",;&!".indexOf (pattern.charAt (pt - 1)) < 0) pattern = pattern.substring (0, pt) + "&" + pattern.substring (pt);
pt = pattern.lastIndexOf ("!", pt - 1);
}
pt = pattern.indexOf (',');
var len = pattern.length;
var and = "&";
out : while (true) {
var haveOr = (pt > 0);
if (haveOr && !this.isSmarts || pt == 0) break;
pt = pattern.indexOf (';');
if (pt >= 0) {
if (!this.isSmarts || pt == 0) break;
if (haveOr) {
and = ";";
haveOr = false;
} else {
pattern = pattern.$replace (';', '&');
}}var index = 0;
if (haveOr) {
pattern += ",";
while ((pt = pattern.indexOf (',', index)) > 0 && pt <= len) {
var s = pattern.substring (index, pt);
if (s.length == 0) throw  new JS.InvalidSmilesException ("missing " + (bond == null ? "atom" : "bond") + " token");
if (bond == null) this.parseAtom (search, atom, s, null, null, true, false, isBranchAtom);
 else this.parseBond (search, bond, s, null, currentAtom, false, false, s.length, ret);
index = pt + 1;
}
} else if ((pt = pattern.indexOf (and)) >= 0 || bond != null && len > 1 && !isAND) {
if (pt == 0 || bond == null && !this.isSmarts) break;
if (bond != null && pt < 0) {
if (len > 1) {
var sNew =  new JU.SB ();
for (var i = 0; i < len; ) {
var ch = pattern.charAt (i++);
sNew.appendC (ch);
switch (ch) {
case '!':
if (!this.isSmarts) break out;
continue;
case '^':
case '`':
while ((ch = pattern.charAt (i++)) != '-' && ch != '\0') {
sNew.appendC (ch);
}
sNew.appendC ('-');
break;
}
if (i < len) {
if (!this.isSmarts) break out;
sNew.append (and);
}}
pattern = sNew.toString ();
len = pattern.length;
}}pattern += and;
while ((pt = pattern.indexOf (and, index)) > 0 && pt <= len) {
var s = pattern.substring (index, pt);
if (bond == null) this.parseAtom (search, atom, s, null, null, true, true, isBranchAtom);
 else this.parseBond (search, this.isSmarts ? bond : null, s, this.isSmarts ? null : bond, currentAtom, true, false, s.length, ret);
index = pt + 1;
}
} else {
return false;
}return true;
}
var ch = pattern.charAt (pt);
throw  new JS.InvalidSmilesException ((this.isSmarts ? "invalid placement for '" + ch + "'" : "[" + ch + "] notation only valid with SMARTS, not SMILES,") + " in " + pattern);
}, "JS.SmilesSearch,~S,JS.SmilesAtom,JS.SmilesBond,JS.SmilesAtom,~B,~B,~A");
c$.getSubPattern = Clazz.defineMethod (c$, "getSubPattern", 
function (pattern, index, ch) {
var ch2;
var margin = 1;
switch (ch) {
case '[':
ch2 = ']';
break;
case '"':
case '%':
case '/':
ch2 = ch;
break;
case '(':
ch2 = ')';
break;
default:
ch2 = ch;
margin = 0;
}
var len = pattern.length;
var pCount = 1;
for (var pt = index + 1; pt < len; pt++) {
var ch1 = pattern.charAt (pt);
if (ch1 == ch2) {
pCount--;
if (pCount == 0) return pattern.substring (index + margin, pt + 1 - margin);
} else if (ch1 == ch) {
pCount++;
}}
throw  new JS.InvalidSmilesException ("Unmatched " + ch);
}, "~S,~N,~S");
c$.getChar = Clazz.defineMethod (c$, "getChar", 
function (pattern, i) {
return (i < pattern.length ? pattern.charAt (i) : '\0');
}, "~S,~N");
c$.getDigits = Clazz.defineMethod (c$, "getDigits", 
function (pattern, index, ret) {
var pt = index;
var len = pattern.length;
while (pt < len && JU.PT.isDigit (pattern.charAt (pt))) pt++;

if (pt > index) try {
ret[0] = Integer.parseInt (pattern.substring (index, pt));
return pt;
} catch (e) {
if (Clazz.exceptionOf (e, NumberFormatException)) {
} else {
throw e;
}
}
ret[0] = -2147483648;
return pt;
}, "~S,~N,~A");
c$.skipTo = Clazz.defineMethod (c$, "skipTo", 
 function (pattern, index, ch0) {
var pt = index;
var ch;
while ((ch = JS.SmilesParser.getChar (pattern, ++pt)) != ch0 && ch != '\0') {
}
return (ch == '\0' ? -1 : pt);
}, "~S,~N,~S");
c$.cleanPattern = Clazz.defineMethod (c$, "cleanPattern", 
function (pattern) {
pattern = JU.PT.replaceAllCharacters (pattern, " \t\n\r", "");
pattern = JU.PT.rep (pattern, "^^", "`");
var i = 0;
var i2 = 0;
while ((i = pattern.indexOf ("//*")) >= 0 && (i2 = pattern.indexOf ("*//")) >= i) pattern = pattern.substring (0, i) + pattern.substring (i2 + 3);

pattern = JU.PT.rep (pattern, "//", "");
return pattern;
}, "~S");
c$.extractFlags = Clazz.defineMethod (c$, "extractFlags", 
function (pattern, ret) {
pattern = JS.SmilesParser.cleanPattern (pattern);
var flags = 0;
while (pattern.startsWith ("/")) {
var strFlags = JS.SmilesParser.getSubPattern (pattern, 0, '/').toUpperCase ();
pattern = pattern.substring (strFlags.length + 2);
flags = JS.SmilesSearch.addFlags (flags, strFlags);
}
ret[0] = flags;
return pattern;
}, "~S,~A");
c$.getFlags = Clazz.defineMethod (c$, "getFlags", 
function (pattern) {
var ret =  Clazz.newIntArray (1, 0);
JS.SmilesParser.extractFlags (pattern, ret);
return ret[0];
}, "~S");
});
