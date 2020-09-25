Clazz.load (["java.lang.Comparable", "$.Number"], "java.lang.Byte", null, function () {
java.lang.Byte = Byte = function () {
Clazz.instantialize (this, arguments);
};
Clazz.decorateAsType (Byte, "Byte", Number, Comparable, null, true);
Byte.prototype.valueOf = function () { return 0; };
Byte.toString = Byte.prototype.toString = function () {
	if (arguments.length != 0) {
		return "" + arguments[0];
	} else if (this === Byte) {
		return "class java.lang.Byte"; // Byte.class.toString
	}
	return "" + this.valueOf ();
};
Clazz.makeConstructor (Byte, 
function () {
this.valueOf = function () {
	return 0;
};
});
Clazz.makeConstructor (Byte, 
function (value) {
var v = Math.round (value) & 0xffffffff;
this.valueOf = function () {
	return v;
};
}, "Number");
Clazz.makeConstructor (Byte, 
function (s) {
var value = Byte.parseByte (s, 10);
this.valueOf = function () {
	return value;
};
}, "String");
Byte.serialVersionUID = Byte.prototype.serialVersionUID = -7183698231559129828;
Byte.MIN_VALUE = Byte.prototype.MIN_VALUE = -128;
Byte.MAX_VALUE = Byte.prototype.MAX_VALUE = 127;
Byte.SIZE = Byte.prototype.SIZE = 8;
Byte.TYPE = Byte.prototype.TYPE = Byte;

Clazz.defineMethod (Byte, "parseByte", 
function (s, radix) {
if (s == null) {
throw  new NumberFormatException ("null");
}if (radix < 2) {
throw  new NumberFormatException ("radix " + radix + " less than Character.MIN_RADIX");
}if (radix > 36) {
throw  new NumberFormatException ("radix " + radix + " greater than Character.MAX_RADIX");
}
var integer = parseInt (s, radix);
if(isNaN(integer)){
throw  new NumberFormatException ("Not a Number : " + s);
}
return integer;
}, "String, Number");
Byte.parseByte = Byte.prototype.parseByte;
Clazz.defineMethod (Byte, "parseByte", 
function (s) {
return Byte.parseByte (s, 10);
}, "String");

Byte.parseByte = Byte.prototype.parseByte;

Clazz.defineMethod (Byte, "$valueOf", 
function (s) {
return new Byte(Byte.parseByte (s, 10));
}, "String");

Clazz.defineMethod (Byte, "$valueOf", 
function (s) {
return new Byte(s);
}, "Number");

Clazz.defineMethod (Byte, "$valueOf", 
function (s, r) {
return new Byte(Byte.parseByte (s, r));
}, "String, Number");

Byte.$valueOf = Byte.prototype.$valueOf;
Clazz.overrideMethod(Byte, "equals", 
function (s) {
if(s == null || !Clazz.instanceOf(s, Byte) ){
	return false;
}
return s.valueOf()  == this.valueOf();
}, "Object");
Byte.toHexString = Byte.prototype.toHexString = function (i) {
	return i.toString (16);
};
Byte.toOctalString = Byte.prototype.toOctalString = function (i) {
	return i.toString (8);
};
Byte.toBinaryString = Byte.prototype.toBinaryString = function (i) {
	return i.toString (2);
};
Byte.decode = Clazz.defineMethod (Byte, "decode", 
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
result = Byte.$valueOf (nm.substring (index), radix);
result = negative ?  new Byte (-result.byteValue ()) : result;
} catch (e) {
if (Clazz.instanceOf (e, NumberFormatException)) {
var constant = negative ?  String.instantialize ("-" + nm.substring (index)) : nm.substring (index);
result = Byte.$valueOf (constant, radix);
} else {
throw e;
}
}
return result;
}, "~S");
});

