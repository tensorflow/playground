Clazz.load (["java.lang.Comparable", "$.Number"], "java.lang.Double", null, function () {
java.lang.Double = Double = function () {
Clazz.instantialize (this, arguments);
};
Clazz.decorateAsType (Double, "Double", Number, Comparable, null, true);
Double.prototype.valueOf = function () { return 0; };
Double.toString = Double.prototype.toString = function () {
	if (arguments.length != 0) {
		return "" + arguments[0];
	} else if (this === Double) {
		return "class java.lang.Double"; // Double.class.toString
	}
	return "" + this.valueOf ();
};
Clazz.makeConstructor (Double, 
function () {
this.valueOf = function () {
	return 0.0;
};
});
Clazz.makeConstructor (Double, 
function (value) {
this.valueOf = function () {
	return value;
};
}, "Number");
Clazz.makeConstructor (Double, 
function (s) {
var value = Double.parseDouble (s);
this.valueOf = function () {
	return value;
};
}, "String");

Double.serialVersionUID = Double.prototype.serialVersionUID = -9172774392245257468;
Double.MIN_VALUE = Double.prototype.MIN_VALUE = 4.9e-324;
Double.MAX_VALUE = Double.prototype.MAX_VALUE = 1.7976931348623157e+308;
Double.NEGATIVE_INFINITY = Number.NEGATIVE_INFINITY;
Double.POSITIVE_INFINITY = Number.POSITIVE_INFINITY;
Double.NaN = Number.NaN;
Double.TYPE = Double.prototype.TYPE = Double;

Clazz.defineMethod (Double, "isNaN", 
function (num) {
return isNaN (num);
}, "Number");
Double.isNaN = Double.prototype.isNaN;
Clazz.defineMethod (Double, "isInfinite", 
function (num) {
return !isFinite (num);
}, "Number");
Double.isInfinite = Double.prototype.isInfinite;

Clazz.defineMethod (Double, "parseDouble", 
function (s) {
if (s == null) {
throw  new NumberFormatException ("null");
}
var doubleVal = parseFloat (s);
if(isNaN(doubleVal)){
throw  new NumberFormatException ("Not a Number : " + s);
}
return doubleVal;
}, "String");
Double.parseDouble = Double.prototype.parseDouble;

Clazz.defineMethod (Double, "$valueOf", 
function (s) {
return new Double(this.parseDouble(s));
}, "String");

Clazz.defineMethod (Double, "$valueOf", 
function (v) {
return new Double(v);
}, "Number");

Double.$valueOf = Double.prototype.$valueOf;

Clazz.overrideMethod(Double, "equals", 
function (s) {
if(s == null || ! Clazz.instanceOf(s, Double) ){
	return false;
}
return s.valueOf()  == this.valueOf();
}, "Object");
});

