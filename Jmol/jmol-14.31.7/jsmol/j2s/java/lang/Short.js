Clazz.load (["java.lang.Comparable", "$.Number"], "java.lang.Short", null, function () {
java.lang.Short = Short = function () {
Clazz.instantialize (this, arguments);
};
Clazz.decorateAsType (Short, "Short", Number, Comparable, null, true);
Short.prototype.valueOf = function () { return 0; };
Short.toString = Short.prototype.toString = function () {
	if (arguments.length != 0) {
		return "" + arguments[0];
	} else if (this === Short) {
		return "class java.lang.Short"; // Short.class.toString
	}
	return "" + this.valueOf ();
};
Clazz.makeConstructor (Short, 
function () {
this.valueOf = function () {
	return 0;
};
});
Clazz.makeConstructor (Short, 
function (value) {
var v = Math.round (value) & 0xffffffff;
this.valueOf = function () {
	return v;
};
}, "Number");
Clazz.makeConstructor (Short, 
function (s) {
var value = Short.parseShort (s, 10);
this.valueOf = function () {
	return value;
};
}, "String");
Short.serialVersionUID = Short.prototype.serialVersionUID = 7515723908773894738;
Short.MIN_VALUE = Short.prototype.MIN_VALUE = -32768;
Short.MAX_VALUE = Short.prototype.MAX_VALUE = 32767;
Short.TYPE = Short.prototype.TYPE = Short;

Clazz.defineMethod (Short, "parseShort", 
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
Short.parseShort = Short.prototype.parseShort;
Clazz.defineMethod (Short, "parseShort", 
function (s) {
return Short.parseShort (s, 10);
}, "String");

Short.parseShort = Short.prototype.parseShort;

Clazz.defineMethod (Short, "$valueOf", 
function (s) {
return new Short(Short.parseShort (s, 10));
}, "String");

Clazz.defineMethod (Short, "$valueOf", 
function (s) {
return new Short(s);
}, "Number");

Clazz.defineMethod (Short, "$valueOf", 
function (s, r) {
return new Short(Short.parseShort (s, r));
}, "String, Number");

Short.$valueOf = Short.prototype.$valueOf;
Clazz.defineMethod (Short, "equals", 
function (s) {
if(s == null || !Clazz.instanceOf(s, Short) ){
	return false;
}
return s.valueOf()  == this.valueOf();
}, "Object");
Short.toHexString = Short.prototype.toHexString = function (i) {
	return i.toString (16);
};
Short.toOctalString = Short.prototype.toOctalString = function (i) {
	return i.toString (8);
};
Short.toBinaryString = Short.prototype.toBinaryString = function (i) {
	return i.toString (2);
};
Short.decode = Clazz.defineMethod (Short, "decode", 
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
result = Short.$valueOf (nm.substring (index), radix);
result = negative ?  new Short (-result.shortValue ()) : result;
} catch (e) {
if (Clazz.instanceOf (e, NumberFormatException)) {
var constant = negative ?  String.instantialize ("-" + nm.substring (index)) : nm.substring (index);
result = Short.$valueOf (constant, radix);
} else {
throw e;
}
}
return result;
}, "~S");
});
