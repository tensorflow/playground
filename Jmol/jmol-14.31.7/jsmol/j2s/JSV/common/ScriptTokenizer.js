Clazz.declarePackage ("JSV.common");
Clazz.load (null, "JSV.common.ScriptTokenizer", ["JU.PT"], function () {
c$ = Clazz.decorateAsClass (function () {
this.str = null;
this.pt = -1;
this.len = 0;
this.isCmd = false;
this.doCheck = true;
Clazz.instantialize (this, arguments);
}, JSV.common, "ScriptTokenizer");
Clazz.makeConstructor (c$, 
function (str, isCmd) {
this.str = str;
this.len = str.length;
this.isCmd = isCmd;
}, "~S,~B");
c$.nextStringToken = Clazz.defineMethod (c$, "nextStringToken", 
function (eachParam, removeQuotes) {
var s = eachParam.nextToken ();
return (removeQuotes && s.charAt (0) == '"' && s.endsWith ("\"") && s.length > 1 ? JU.PT.trimQuotes (s) : s);
}, "JSV.common.ScriptTokenizer,~B");
Clazz.defineMethod (c$, "nextToken", 
function () {
if (this.doCheck) this.hasMoreTokens ();
var pt0 = this.pt;
var inQuote = (this.str.charAt (this.pt) == '"');
while (++this.pt < this.len) {
switch (this.str.charAt (this.pt)) {
case '"':
if (inQuote) {
if (this.isCmd) {
inQuote = false;
continue;
}this.pt++;
break;
}if (this.isCmd) inQuote = true;
continue;
case ' ':
if (!this.isCmd && !inQuote) break;
continue;
case ';':
case '\n':
if (this.isCmd && !inQuote) break;
continue;
default:
continue;
}
break;
}
this.doCheck = true;
return this.str.substring (pt0, this.pt);
});
Clazz.defineMethod (c$, "hasMoreTokens", 
function () {
while (++this.pt < this.len) {
switch (this.str.charAt (this.pt)) {
case ' ':
case ';':
case '\n':
continue;
}
break;
}
this.doCheck = false;
return (this.pt < this.len);
});
Clazz.defineMethod (c$, "getRemainingScript", 
function () {
return this.str.substring (this.pt);
});
});
