Clazz.declarePackage ("JSV.common");
c$ = Clazz.declareType (JSV.common, "CoordComparator", null, java.util.Comparator);
Clazz.overrideMethod (c$, "compare", 
function (c1, c2) {
return (c1.getXVal () > c2.getXVal () ? 1 : c1.getXVal () < c2.getXVal () ? -1 : 0);
}, "JSV.common.Coordinate,JSV.common.Coordinate");
