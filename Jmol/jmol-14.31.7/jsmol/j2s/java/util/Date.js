Clazz.load (null, "java.util.Date", null, function () {
java.util.Date = Date;
Clazz.decorateAsType (java.util.Date, "java.util.Date", null, [java.io.Serializable, Cloneable, Comparable]);

Clazz.defineMethod (java.util.Date, "clone", 
function () {
return new Date (this.getTime ());
});

Clazz.defineMethod (java.util.Date, "before", 
function (when) {
return this.getTime () < when.getTime ();
}, "java.util.Date");
Clazz.defineMethod (java.util.Date, "after", 
function (when) {
return this.getTime () > when.getTime ();
}, "java.util.Date");
Clazz.defineMethod (java.util.Date, "equals", 
function (obj) {
return Clazz.instanceOf (obj, java.util.Date) && this.getTime () == (obj).getTime ();
}, "Object");
Clazz.defineMethod (java.util.Date, "compareTo", 
function (anotherDate) {
var thisTime = this.getTime ();
var anotherTime = anotherDate.getTime ();
return (thisTime < anotherTime ? -1 : (thisTime == anotherTime ? 0 : 1));
}, "java.util.Date");
Clazz.defineMethod (java.util.Date, "compareTo", 
function (o) {
return this.compareTo (o);
}, "Object");
Clazz.defineMethod (java.util.Date, "hashCode", 
function () {
var ht = this.getTime ();
return parseInt (ht) ^ parseInt ((ht >> 32));
});
});