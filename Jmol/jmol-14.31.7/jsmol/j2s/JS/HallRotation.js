Clazz.declarePackage ("JS");
Clazz.load (["JU.M4"], "JS.HallRotation", null, function () {
c$ = Clazz.decorateAsClass (function () {
this.rotCode = null;
this.seitzMatrix = null;
this.seitzMatrixInv = null;
Clazz.instantialize (this, arguments);
}, JS, "HallRotation");
Clazz.prepareFields (c$, function () {
this.seitzMatrix =  new JU.M4 ();
this.seitzMatrixInv =  new JU.M4 ();
});
Clazz.makeConstructor (c$, 
 function (code, matrixData) {
this.rotCode = code;
var data =  Clazz.newFloatArray (16, 0);
var dataInv =  Clazz.newFloatArray (16, 0);
data[15] = dataInv[15] = 1;
for (var i = 0, ipt = 0; ipt < 11; i++) {
var value = 0;
switch (matrixData.charAt (i)) {
case ' ':
ipt++;
continue;
case '+':
case '1':
value = 1;
break;
case '-':
value = -1;
break;
}
data[ipt] = value;
dataInv[ipt] = -value;
ipt++;
}
this.seitzMatrix.setA (data);
this.seitzMatrixInv.setA (dataInv);
}, "~S,~S");
c$.lookup = Clazz.defineMethod (c$, "lookup", 
function (code) {
for (var i = JS.HallRotation.getHallTerms ().length; --i >= 0; ) if (JS.HallRotation.hallRotationTerms[i].rotCode.equals (code)) return JS.HallRotation.hallRotationTerms[i];

return null;
}, "~S");
c$.getHallTerms = Clazz.defineMethod (c$, "getHallTerms", 
 function () {
return (JS.HallRotation.hallRotationTerms == null ? JS.HallRotation.hallRotationTerms =  Clazz.newArray (-1, [ new JS.HallRotation ("1_", "+00 0+0 00+"),  new JS.HallRotation ("2x", "+00 0-0 00-"),  new JS.HallRotation ("2y", "-00 0+0 00-"),  new JS.HallRotation ("2z", "-00 0-0 00+"),  new JS.HallRotation ("2'", "0-0 -00 00-"),  new JS.HallRotation ("2\"", "0+0 +00 00-"),  new JS.HallRotation ("2x'", "-00 00- 0-0"),  new JS.HallRotation ("2x\"", "-00 00+ 0+0"),  new JS.HallRotation ("2y'", "00- 0-0 -00"),  new JS.HallRotation ("2y\"", "00+ 0-0 +00"),  new JS.HallRotation ("2z'", "0-0 -00 00-"),  new JS.HallRotation ("2z\"", "0+0 +00 00-"),  new JS.HallRotation ("3x", "+00 00- 0+-"),  new JS.HallRotation ("3y", "-0+ 0+0 -00"),  new JS.HallRotation ("3z", "0-0 +-0 00+"),  new JS.HallRotation ("3*", "00+ +00 0+0"),  new JS.HallRotation ("4x", "+00 00- 0+0"),  new JS.HallRotation ("4y", "00+ 0+0 -00"),  new JS.HallRotation ("4z", "0-0 +00 00+"),  new JS.HallRotation ("6x", "+00 0+- 0+0"),  new JS.HallRotation ("6y", "00+ 0+0 -0+"),  new JS.HallRotation ("6z", "+-0 +00 00+")]) : JS.HallRotation.hallRotationTerms);
});
Clazz.defineStatics (c$,
"hallRotationTerms", null);
});
