Clazz.declarePackage ("JU");
Clazz.load (null, "JU.Txt", ["JU.P3", "$.PT", "JU.Escape"], function () {
c$ = Clazz.declareType (JU, "Txt");
c$.formatText = Clazz.defineMethod (c$, "formatText", 
function (vwr, text0) {
var i;
if ((i = text0.indexOf ("@{")) < 0 && (i = text0.indexOf ("%{")) < 0) return text0;
var text = text0;
var isEscaped = (text.indexOf ("\\") >= 0);
if (isEscaped) {
text = JU.PT.rep (text, "\\%", "\1");
text = JU.PT.rep (text, "\\@", "\2");
isEscaped = !text.equals (text0);
}text = JU.PT.rep (text, "%{", "@{");
var name;
while ((i = text.indexOf ("@{")) >= 0) {
i++;
var i0 = i + 1;
var len = text.length;
var nP = 1;
var chFirst = '\u0000';
var chLast = '\u0000';
while (nP > 0 && ++i < len) {
var ch = text.charAt (i);
if (chFirst != '\0') {
if (chLast == '\\') {
ch = '\0';
} else if (ch == chFirst) {
chFirst = '\0';
}chLast = ch;
continue;
}switch (ch) {
case '\'':
case '"':
chFirst = ch;
break;
case '{':
nP++;
break;
case '}':
nP--;
break;
}
}
if (i >= len) return text;
name = text.substring (i0, i);
if (name.length == 0) return text;
var v = vwr.evaluateExpression (name);
if (Clazz.instanceOf (v, JU.P3)) v = JU.Escape.eP (v);
text = text.substring (0, i0 - 2) + v.toString () + text.substring (i + 1);
}
if (isEscaped) {
text = JU.PT.rep (text, "\2", "@");
text = JU.PT.rep (text, "\1", "%");
}return text;
}, "J.api.JmolViewer,~S");
});
