Clazz.declarePackage ("J.c");
Clazz.load (["java.lang.Enum"], "J.c.STR", null, function () {
c$ = Clazz.decorateAsClass (function () {
this.id = 0;
this.color = 0;
Clazz.instantialize (this, arguments);
}, J.c, "STR", Enum);
Clazz.makeConstructor (c$, 
 function (id, color) {
this.id = id;
this.color = color;
}, "~N,~N");
Clazz.defineMethod (c$, "getId", 
function () {
return this.id;
});
Clazz.defineMethod (c$, "getColor", 
function () {
return this.color;
});
c$.getProteinStructureType = Clazz.defineMethod (c$, "getProteinStructureType", 
function (name) {
for (var item, $item = 0, $$item = J.c.STR.values (); $item < $$item.length && ((item = $$item[$item]) || true); $item++) if (name.equalsIgnoreCase (item.name ())) return (item.isProtein () ? item : J.c.STR.NOT);

return J.c.STR.NOT;
}, "~S");
Clazz.defineMethod (c$, "getBioStructureTypeName", 
function (isGeneric) {
return (this.id < 0 ? "" : isGeneric && this.isProtein () ? "protein" : this.name ());
}, "~B");
Clazz.defineMethod (c$, "isProtein", 
 function () {
return this.id >= 0 && this.id <= 3 || this.id >= 7;
});
Clazz.defineEnumConstant (c$, "NOT", 0, [-1, 0xFF808080]);
Clazz.defineEnumConstant (c$, "NONE", 1, [0, 0xFFFFFFFF]);
Clazz.defineEnumConstant (c$, "TURN", 2, [1, 0xFF6080FF]);
Clazz.defineEnumConstant (c$, "SHEET", 3, [2, 0xFFFFC800]);
Clazz.defineEnumConstant (c$, "HELIX", 4, [3, 0xFFFF0080]);
Clazz.defineEnumConstant (c$, "DNA", 5, [4, 0xFFAE00FE]);
Clazz.defineEnumConstant (c$, "RNA", 6, [5, 0xFFFD0162]);
Clazz.defineEnumConstant (c$, "CARBOHYDRATE", 7, [6, 0xFFA6A6FA]);
Clazz.defineEnumConstant (c$, "HELIX310", 8, [7, 0xFFA00080]);
Clazz.defineEnumConstant (c$, "HELIXALPHA", 9, [8, 0xFFFF0080]);
Clazz.defineEnumConstant (c$, "HELIXPI", 10, [9, 0xFF600080]);
Clazz.defineEnumConstant (c$, "ANNOTATION", 11, [-2, 0]);
});
