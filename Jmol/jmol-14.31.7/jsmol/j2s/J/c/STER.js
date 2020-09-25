Clazz.declarePackage ("J.c");
Clazz.load (["java.lang.Enum"], "J.c.STER", null, function () {
c$ = Clazz.decorateAsClass (function () {
this.$$name = null;
this.$isBiColor = false;
Clazz.instantialize (this, arguments);
}, J.c, "STER", Enum);
Clazz.makeConstructor (c$, 
 function (name, isBiColor) {
this.$$name = name;
this.$isBiColor = isBiColor;
}, "~S,~B");
Clazz.defineMethod (c$, "getName", 
function () {
return this.$$name;
});
Clazz.defineMethod (c$, "isBiColor", 
function () {
return this.$isBiColor;
});
c$.getStereoMode = Clazz.defineMethod (c$, "getStereoMode", 
function (id) {
for (var item, $item = 0, $$item = J.c.STER.values (); $item < $$item.length && ((item = $$item[$item]) || true); $item++) if (item.$$name.equalsIgnoreCase (id)) return item;

return null;
}, "~S");
Clazz.defineEnumConstant (c$, "NONE", 0, ["OFF", false]);
Clazz.defineEnumConstant (c$, "DOUBLE", 1, ["", false]);
Clazz.defineEnumConstant (c$, "REDCYAN", 2, ["REDCYAN", true]);
Clazz.defineEnumConstant (c$, "REDBLUE", 3, ["REDBLUE", true]);
Clazz.defineEnumConstant (c$, "REDGREEN", 4, ["REDGREEN", true]);
Clazz.defineEnumConstant (c$, "DTI", 5, ["DTI", false]);
Clazz.defineEnumConstant (c$, "CUSTOM", 6, ["", true]);
});
