Clazz.declarePackage ("J.shape");
Clazz.load (["J.shape.AtomShape"], "J.shape.Stars", null, function () {
c$ = Clazz.declareType (J.shape, "Stars", J.shape.AtomShape);
Clazz.overrideMethod (c$, "setProperty", 
function (propertyName, value, bs) {
this.setPropAS (propertyName, value, bs);
}, "~S,~O,JU.BS");
});
