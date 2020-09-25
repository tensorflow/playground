Clazz.declarePackage ("J.c");
Clazz.load (["java.lang.Enum"], "J.c.VDW", null, function () {
c$ = Clazz.decorateAsClass (function () {
this.pt = 0;
this.type = null;
this.type2 = null;
Clazz.instantialize (this, arguments);
}, J.c, "VDW", Enum);
Clazz.makeConstructor (c$, 
 function (pt, type, type2) {
this.pt = pt;
this.type = type;
this.type2 = type2;
}, "~N,~S,~S");
Clazz.defineMethod (c$, "getVdwLabel", 
function () {
return (this.type == null ? this.type2 : this.type);
});
c$.getVdwType = Clazz.defineMethod (c$, "getVdwType", 
function (label) {
if (label != null) for (var item, $item = 0, $$item = J.c.VDW.values (); $item < $$item.length && ((item = $$item[$item]) || true); $item++) if (label.equalsIgnoreCase (item.type)) return item;

return null;
}, "~S");
c$.getVdwType2 = Clazz.defineMethod (c$, "getVdwType2", 
function (label) {
if (label != null) for (var item, $item = 0, $$item = J.c.VDW.values (); $item < $$item.length && ((item = $$item[$item]) || true); $item++) if (label.equalsIgnoreCase (item.type2)) return item;

return null;
}, "~S");
Clazz.defineEnumConstant (c$, "JMOL", 0, [0, "Jmol", null]);
Clazz.defineEnumConstant (c$, "BABEL", 1, [1, "Babel", null]);
Clazz.defineEnumConstant (c$, "RASMOL", 2, [2, "RasMol", null]);
Clazz.defineEnumConstant (c$, "BABEL21", 3, [3, "Babel21", null]);
Clazz.defineEnumConstant (c$, "AUTO_JMOL", 4, [0, null, "Jmol"]);
Clazz.defineEnumConstant (c$, "AUTO_BABEL", 5, [1, null, "Babel"]);
Clazz.defineEnumConstant (c$, "AUTO_RASMOL", 6, [2, null, "RasMol"]);
Clazz.defineEnumConstant (c$, "AUTO", 7, [0, "Auto", null]);
Clazz.defineEnumConstant (c$, "USER", 8, [-1, "User", null]);
Clazz.defineEnumConstant (c$, "ADPMAX", 9, [-1, null, "adpmax"]);
Clazz.defineEnumConstant (c$, "ADPMIN", 10, [-1, null, "adpmin"]);
Clazz.defineEnumConstant (c$, "HYDRO", 11, [-1, null, "hydrophobic"]);
Clazz.defineEnumConstant (c$, "BONDING", 12, [-1, null, "bondingradius"]);
Clazz.defineEnumConstant (c$, "TEMP", 13, [-1, null, "temperature"]);
Clazz.defineEnumConstant (c$, "NOJMOL", 14, [-1, null, null]);
Clazz.defineEnumConstant (c$, "NADA", 15, [-1, null, null]);
});
