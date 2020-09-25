Clazz.declarePackage ("J.c");
Clazz.load (["java.lang.Enum"], "J.c.FIL", null, function () {
c$ = Clazz.decorateAsClass (function () {
this.code = 0;
Clazz.instantialize (this, arguments);
}, J.c, "FIL", Enum);
Clazz.defineMethod (c$, "getCode", 
function () {
return this.code;
});
Clazz.makeConstructor (c$, 
 function (code) {
this.code = code;
}, "~N");
Clazz.defineEnumConstant (c$, "DELETED", 0, [5]);
Clazz.defineEnumConstant (c$, "CREATED", 1, [3]);
Clazz.defineEnumConstant (c$, "CREATING_MODELSET", 2, [2]);
Clazz.defineEnumConstant (c$, "ZAPPED", 3, [0]);
Clazz.defineEnumConstant (c$, "NOT_LOADED", 4, [-1]);
});
