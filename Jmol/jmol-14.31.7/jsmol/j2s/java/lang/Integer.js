Clazz.load (["java.lang.Comparable", "$.Number"], "java.lang.Integer", null, function () {
java.lang.Integer = Integer = function () {
Clazz.instantialize (this, arguments);
};
Clazz.decorateAsType (Integer, "Integer", Number, Comparable, null, true);
Integer.prototype.valueOf = function () { return 0; };
Integer.toString = Integer.prototype.toString = function () {
	if (arguments.length != 0) {
		return "" + arguments[0];
	} else if (this === Integer) {
		return "class java.lang.Integer"; // Integer.class.toString
	}
	return "" + this.valueOf ();
};
Clazz.makeConstructor (Integer, 
function () {
this.valueOf = function () {
	return 0;
};
});
Clazz.makeConstructor (Integer, 
function (value) {
var v = Math.round (value) & 0xffffffff;
this.valueOf = function () {
	return v;
};
}, "Number");
Clazz.makeConstructor (Integer, 
function (s) {
var value = Integer.parseInt (s, 10);
this.valueOf = function () {
	return value;
};
}, "String");
Integer.serialVersionUID = Integer.prototype.serialVersionUID = 1360826667806852920;
Integer.MIN_VALUE = Integer.prototype.MIN_VALUE = -0x80000000;
Integer.MAX_VALUE = Integer.prototype.MAX_VALUE = 0x7fffffff;
Integer.TYPE = Integer.prototype.TYPE = Integer;

Clazz.defineMethod (Integer, "parseInt", 
function (s, radix) {
if (s == null) {
throw new NumberFormatException ("null");
}if (radix < 2) {
throw new NumberFormatException ("radix " + radix + " less than Character.MIN_RADIX");
}if (radix > 36) {
throw new NumberFormatException ("radix " + radix + " greater than Character.MAX_RADIX");
}
var integer = parseInt (s, radix);
if(isNaN(integer)){
throw new NumberFormatException ("Not a Number : " + s);
}
return integer;
}, "String, Number");
Integer.parseInt = Integer.prototype.parseInt;
Clazz.defineMethod (Integer, "parseInt", 
function (s) {
return Integer.parseInt (s, 10);
}, "String");

Integer.parseInt = Integer.prototype.parseInt;


/*

Clazz.defineMethod (Integer, "$valueOf", 
function (s) {
return new Integer(Integer.parseInt (s, 10));
}, "String");

*/

Clazz.defineMethod (Integer, "$valueOf", 
function (s) {
return new Integer(s);
}, "Number");

Clazz.defineMethod (Integer, "$valueOf", 
function (s, r) {
return new Integer(Integer.parseInt (s, r));
}, "String, Number");

Integer.$valueOf = Integer.prototype.$valueOf;
Clazz.overrideMethod(Integer, "equals", 
function (s) {
if(s == null || ! Clazz.instanceOf(s, Integer) ){
	return false;
}
return s.valueOf()  == this.valueOf();
}, "Object");

Integer.toHexString = Integer.prototype.toHexString = function (i) {
	return i.toString (16);
};
Integer.toOctalString = Integer.prototype.toOctalString = function (i) {
	return i.toString (8);
};
Integer.toBinaryString = Integer.prototype.toBinaryString = function (i) {
	return i.toString (2);
};
Integer.decode = Clazz.defineMethod (Integer, "decode", 
function (nm) {
var radix = 10;
var index = 0;
var negative = false;
var result;
if (nm.startsWith ("-")) {
negative = true;
index++;
}if (nm.startsWith ("0x", index) || nm.startsWith ("0X", index)) {
index += 2;
radix = 16;
} else if (nm.startsWith ("#", index)) {
index++;
radix = 16;
} else if (nm.startsWith ("0", index) && nm.length > 1 + index) {
index++;
radix = 8;
}if (nm.startsWith ("-", index)) throw  new NumberFormatException ("Negative sign in wrong position");
try {
result = Integer.$valueOf (nm.substring (index), radix);
result = negative ?  new Integer (-result.intValue ()) : result;
} catch (e) {
if (Clazz.instanceOf (e, NumberFormatException)) {
var constant = negative ?  String.instantialize ("-" + nm.substring (index)) : nm.substring (index);
result = Integer.$valueOf (constant, radix);
} else {
throw e;
}
}
return result;
}, "~S");

Clazz.overrideMethod(Integer, "hashCode", 
function () {
return this.valueOf ();
});


});

