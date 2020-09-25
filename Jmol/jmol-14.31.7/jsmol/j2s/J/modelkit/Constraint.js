Clazz.declarePackage ("J.modelkit");
Clazz.load (null, "J.modelkit.Constraint", ["java.lang.IllegalArgumentException"], function () {
c$ = Clazz.decorateAsClass (function () {
this.type = 0;
this.symop = null;
this.points = null;
this.offset = null;
this.value = 0;
Clazz.instantialize (this, arguments);
}, J.modelkit, "Constraint");
Clazz.makeConstructor (c$, 
function (type, params) {
this.type = type;
switch (type) {
case 0:
this.symop = params[0];
this.points =  new Array (1);
this.offset = params[1];
break;
case 1:
this.value = (params[0]).doubleValue ();
this.points =  Clazz.newArray (-1, [params[1], null]);
break;
case 2:
this.value = (params[0]).doubleValue ();
this.points =  Clazz.newArray (-1, [params[1], params[2], null]);
break;
case 3:
this.value = (params[0]).doubleValue ();
this.points =  Clazz.newArray (-1, [params[1], params[2], params[3], null]);
break;
default:
throw  new IllegalArgumentException ();
}
}, "~N,~A");
Clazz.defineStatics (c$,
"TYPE_SYMMETRY", 0,
"TYPE_DISTANCE", 1,
"TYPE_ANGLE", 2,
"TYPE_DIHEDRAL", 3);
});
