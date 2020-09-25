Clazz.declarePackage ("J.shapespecial");
Clazz.load (["J.shape.AtomShape"], "J.shapespecial.Vectors", ["J.atomdata.RadiusData"], function () {
c$ = Clazz.declareType (J.shapespecial, "Vectors", J.shape.AtomShape);
Clazz.defineMethod (c$, "initModelSet", 
function () {
if (!!(this.isActive = this.ms.modelSetHasVibrationVectors ())) Clazz.superCall (this, J.shapespecial.Vectors, "initModelSet", []);
});
Clazz.overrideMethod (c$, "setProperty", 
function (propertyName, value, bsSelected) {
if (!this.isActive) return;
this.setPropAS (propertyName, value, bsSelected);
}, "~S,~O,JU.BS");
Clazz.overrideMethod (c$, "getProperty", 
function (propertyName, param) {
if (propertyName === "mad") return Integer.$valueOf (this.mads == null || param < 0 || this.mads.length <= param ? 0 : this.mads[param]);
return null;
}, "~S,~N");
Clazz.defineMethod (c$, "setSizeRD2", 
function (i, rd, isVisible) {
Clazz.superCall (this, J.shapespecial.Vectors, "setSizeRD2", [i, rd, isVisible]);
if (rd != null && rd.factorType === J.atomdata.RadiusData.EnumType.SCREEN) this.mads[i] = -this.mads[i];
}, "~N,J.atomdata.RadiusData,~B");
});
