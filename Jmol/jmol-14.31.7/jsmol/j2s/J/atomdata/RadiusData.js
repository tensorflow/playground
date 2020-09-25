Clazz.declarePackage ("J.atomdata");
Clazz.load (["java.lang.Enum", "J.c.VDW"], "J.atomdata.RadiusData", ["java.lang.Float", "JU.SB"], function () {
c$ = Clazz.decorateAsClass (function () {
this.info = null;
this.factorType = null;
this.vdwType = null;
this.value = NaN;
this.valueExtended = 0;
this.values = null;
Clazz.instantialize (this, arguments);
}, J.atomdata, "RadiusData");
Clazz.prepareFields (c$, function () {
this.factorType = J.atomdata.RadiusData.EnumType.ABSOLUTE;
this.vdwType = J.c.VDW.AUTO;
});
Clazz.makeConstructor (c$, 
function (values, value, factorType, vdwType) {
if (values != null) {
this.values = values;
this.value = 2147483647;
return;
}if (factorType == null) return;
this.factorType = factorType;
this.value = value;
if (vdwType != null) this.vdwType = vdwType;
}, "~A,~N,J.atomdata.RadiusData.EnumType,J.c.VDW");
Clazz.overrideMethod (c$, "toString", 
function () {
if (Float.isNaN (this.value)) return "";
var sb =  new JU.SB ();
switch (this.factorType) {
case J.atomdata.RadiusData.EnumType.ABSOLUTE:
sb.appendF (this.value);
break;
case J.atomdata.RadiusData.EnumType.OFFSET:
sb.append (this.value > 0 ? "+" : "").appendF (this.value);
break;
case J.atomdata.RadiusData.EnumType.FACTOR:
sb.appendI (Clazz.floatToInt (this.value * 100)).append ("%");
if (this.vdwType !== J.c.VDW.AUTO) sb.append (this.vdwType.getVdwLabel ());
break;
case J.atomdata.RadiusData.EnumType.SCREEN:
sb.appendI (Clazz.floatToInt (this.value));
}
return sb.toString ();
});
Clazz.pu$h(self.c$);
c$ = Clazz.declareType (J.atomdata.RadiusData, "EnumType", Enum);
Clazz.defineEnumConstant (c$, "ABSOLUTE", 0, []);
Clazz.defineEnumConstant (c$, "OFFSET", 1, []);
Clazz.defineEnumConstant (c$, "FACTOR", 2, []);
Clazz.defineEnumConstant (c$, "SCREEN", 3, []);
c$ = Clazz.p0p ();
});
