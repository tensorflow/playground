Clazz.load (["java.lang.Comparable", "$.Number"], "java.lang.Long", null, function () {
java.lang.Long = Long = function () {
Clazz.instantialize (this, arguments);
};
Clazz.decorateAsType (Long, "Long", Number, Comparable, null, true);
Long.prototype.valueOf = function () { return 0; };
Long.toString = Long.prototype.toString = function () {
	if (arguments.length != 0) {
		return "" + arguments[0];
	} else if (this === Long) {
		return "class java.lang.Long"; // Long.class.toString
	}
	return "" + this.valueOf ();
};
Clazz.makeConstructor (Long, 
function () {
this.valueOf = function () {
	return 0;
};
});
Clazz.makeConstructor (Long, 
function (value) {
var v = Math.round (value);
this.valueOf = function () {
	return v;
};
}, "Number");
Clazz.makeConstructor (Long, 
function (s) {
var value = Long.parseLong (s, 10);
this.valueOf = function () {
	return value;
};
}, "String");
Long.serialVersionUID = Long.prototype.serialVersionUID = 4290774380558885855;
Long.MIN_VALUE = Long.prototype.MIN_VALUE = -0x8000000000000000;
Long.MAX_VALUE = Long.prototype.MAX_VALUE = 0x7fffffffffffffff;
Long.TYPE = Long.prototype.TYPE = Long;

Clazz.defineMethod (Long, "parseLong", 
function (s, radix) {
if (s == null) {
throw  new NumberFormatException ("null");
}if (radix < 2) {
throw  new NumberFormatException ("radix " + radix + " less than Character.MIN_RADIX");
}if (radix > 36) {
throw  new NumberFormatException ("radix " + radix + " greater than Character.MAX_RADIX");
}
var longVal = parseInt (s, radix);
if(isNaN(longVal)){
throw  new NumberFormatException ("Not a Number : " + s);
}
return longVal;
}, "String, Number");

Clazz.defineMethod (Long, "parseLong", 
function (s) {
return Long.parseLong (s, 10);
}, "String");

Long.parseLong = Long.prototype.parseLong;

Clazz.defineMethod (Long, "$valueOf", 
function (s) {
return new Long(Long.parseLong (s, 10));
}, "String");

Clazz.defineMethod (Long, "$valueOf", 
function (s) {
return new Long(s);
}, "Number");

Clazz.defineMethod (Long, "$valueOf", 
function (s, r) {
return new Long(Long.parseLong (s, r));
}, "String, Number");

Long.$valueOf = Long.prototype.$valueOf;
Clazz.defineMethod (Long, "equals", 
function (s) {
if(s == null || !Clazz.instanceOf(s, Long) ){
	return false;
}
return s.valueOf()  == this.valueOf();
}, "Object");
Long.toHexString = Long.prototype.toHexString = function (i) {
	return i.toString (16);
};
Long.toOctalString = Long.prototype.toOctalString = function (i) {
	return i.toString (8);
};
Long.toBinaryString = Long.prototype.toBinaryString = function (i) {
	return i.toString (2);
};
Long.decode = Clazz.defineMethod (Long, "decode", 
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
result = Long.$valueOf (nm.substring (index), radix);
result = negative ?  new Long (-result.longValue ()) : result;
} catch (e) {
if (Clazz.instanceOf (e, NumberFormatException)) {
var constant = negative ?  String.instantialize ("-" + nm.substring (index)) : nm.substring (index);
result = Long.$valueOf (constant, radix);
} else {
throw e;
}
}
return result;
}, "~S");
});

