// JSmolJavaExt.js
 

// This library will be wrapped by an additional anonymous function using ANT in 
// build_03_tojs.xml. This task will also modify variable names. References 
// to Clazz._ will not be changed, but other Clazz.xxx will be changed to 
// (local scope) Clazz_xxx, allowing them to be further compressed using
// Google Closure Compiler in that same ANT task.

// BH 10/16/2017 6:51:20 AM fixing range error for MSIE in prepareCallback setting arguments.length < 0
// BH 10/13/2017 7:03:28 AM fix for String.initialize(bytes) applying bytes as arguments
// BH 9/18/2017 10:15:18 PM adding Integer.compare()
// BH 4/7/2017 10:48:50 AM adds Math.signum(f)
// BH 10/15/2016 9:28:13 AM adds Float.floatToIntBits(f)
// BH 3/9/2016 6:25:08 PM at least allow Error() by itself to work as before (inchi.js uses this)
// BH 12/21/2015 1:31:41 PM fixing String.instantialize for generic typed array
// BH 9/19/2015 11:05:45 PM Float.isInfinite(), Float.isNaN(), Double.isInfinite(), Double.isNaN() all not implemented
// BH 5/31/2015 5:53:04 PM Number.compareTo added
// BH 5/21/2015 5:46:30 PM Number("0xFFFFFFFF") is not -1
// BH 4/23/2015 9:08:59 AM xx.getComponentType() is nonfunctional. Array.newInstance now defines a wrapper for .getClass().getComponentType() that works  
// BH 4/12/2015 1:37:44 PM adding Math.rint = Math.round
// BH 1/16/2015 10:09:38 AM Chrome failure jqGrig due to new String("x").toString() not being a simple string
// BH 8/14/2014 6:49:22 PM Character class efficiencies
// BH 7/24/2014 9:02:18 AM most browsers do not support String.codePointAt()
// BH 7/11/2014 4:17:22 PM fix for Boolean.valueOf("false") not being false 
// BH 5/27/2014 6:29:59 AM ensure floats and doubles have decimal point in toString
// BH 4/1/2014 12:23:41 PM Encoding moved to Clazz._Encoding; 
// BH 4/1/2014 7:51:46 AM removing java.lang.B00lean
// BH 3/7/2014 9:17:10 AM removing Array.toString; moving that code here from j2sJmol.js
// BH 1/30/2014 9:04:25 AM adding Throwable.getStackTrace() as a STRING
// BH 12/4/2013 9:20:44 PM fix for reassigning Date.prototype.toString()
// BH 12/3/2013 11:43:10 AM bizarre Safari bug in reassigning Boolean (OK, I admit, we shouldn't have done that...) 
// BH 12/1/2013 6:50:16 AM evit Number.prototype.toString assignment removed!
// BH 11/30/2013 1:46:31 PM fixing Byte, Short, Long, Integer, Float, Double to reflect proper bounds and error conditions
// BH 11/29/2013 8:58:49 PM removing Boolean.toString(boolean)
// BH 11/4/2013 7:34:26 AM changing "var nativeClazz" to "var nativeClass" to avoid ANT replacement of "nativeClazz." to "nativeClazz_"
// BH 10/19/2013 1:29:27 PM fixed String.$replace()
// BH 10/18/2013 6:09:23 PM fixed (Double|Float).valueOf(NaN).valueOf(), which should return NaN, not throw an error
// BH 10/12/2013 11:18:44 AM fixed bug in Double(String) and Float(String) that was returning typeof "string"
// BH 10/10/2013 2:40:20 PM  added Math.log10   
// BH 7/23/2013 7:24:01 AM fixing Number.shortValue() and Number.byteValue() for negative values
// BH 6/16/2013 1:31:30 PM adding /| in String.replace -- thank you David Koes
// BH 3/13/2013 12:49:23 PM setting Boolean.valueOf() "@" 
// BH 3/2/2013 10:46:45 PM removed Double.valueOf(String)
// BH 11/6/2012 8:26:33 PM added instanceof Int32Array in String.instantialize
// BH 10/13/2012 11:38:07 PM corrected Integer.parseInt to allow only +-0123456789; created Integer.parseIntRadix
// BH 11/1/2012 added Short
// BH 9/10/2012 6:27:21 AM added java.net.URL... classes
// BH 1/7/2013 7:40:06 AM added Clazz.dateToString

;(function(Clazz) {

// moved here from package.js
// these classes will be created as objects prior to any others
// and are then available immediately

	Clazz._Loader.registerPackages("java", [ "io", "lang", "lang.reflect", "util" ]);

  var sJU = "java.util";

  //var sJU = "JU";  
	//Clazz._Loader.registerPackages (sJU, ["regex", "zip"]);
	//var javautil = JU;

  var javautil = java.util;

	Clazz._Loader.ignore([
		"net.sf.j2s.ajax.HttpRequest",
		sJU + ".MapEntry.Type",
		"java.net.UnknownServiceException", // unnecessary for Jmol
		"java.lang.Runtime",
		"java.security.AccessController",
		"java.security.PrivilegedExceptionAction",
		"java.io.File",
		"java.io.FileInputStream",
		"java.io.FileWriter",
		"java.io.OutputStreamWriter",
//		sJU + ".Calendar", // bypassed in ModelCollection
//		"java.text.SimpleDateFormat", // not used
//		"java.text.DateFormat", // not used
		sJU + ".concurrent.Executors"
	])

Math.rint = Math.round;

Math.log10||(Math.log10=function(a){return Math.log(a)/2.302585092994046});

Math.signum||(Math.signum=function(d){return(d==0.0||isNaN(d))?d:d < 0 ? -1 : 1});

if(Clazz._supportsNativeObject){
	// Number and Array are special -- do not override prototype.toString -- "length - 2" here
	for(var i=0;i<Clazz._extendedObjectMethods.length - 2;i++){
		var p=Clazz._extendedObjectMethods[i];
		Array.prototype[p] = Clazz._O.prototype[p];
		Number.prototype[p] = Clazz._O.prototype[p];
	}
}

java.lang.Number=Number;
Number.__CLASS_NAME__="Number";
Clazz.implementOf(Number,java.io.Serializable);
Number.equals=Clazz._innerFunctions.equals;
Number.getName=Clazz._innerFunctions.getName;
Number.prototype.compareTo = function(x) { var a = this.value, b = x.value; return (a < b ? -1 : a == b ? 0 : 1) };

Clazz.defineMethod(Number,"shortValue",
function(){
var x = Math.round(this)&0xffff;
return (this < 0 && x > 0 ? x - 0x10000 : x);
});

Clazz.defineMethod(Number,"byteValue",
function(){
var x = Math.round(this)&0xff;
return (this < 0 && x > 0 ? x - 0x100 : x);
});

Clazz.defineMethod(Number,"intValue",
function(){
return Math.round(this)&0xffffffff;
});

Clazz.defineMethod(Number,"longValue",
function(){
return Math.round(this);
});

Clazz.defineMethod(Number,"floatValue",
function(){
return this.valueOf();
});
Clazz.defineMethod(Number,"doubleValue",
function(){
return parseFloat(this.valueOf());
});

Clazz.overrideMethod(Number,"hashCode",
function(){
return this.valueOf();
});

java.lang.Integer=Integer=function(){
Clazz.instantialize(this,arguments);
};
Clazz.decorateAsType(Integer,"Integer",Number,Comparable,null,true);
Integer.prototype.valueOf=function(){return 0;};
Integer.toString=Integer.prototype.toString=function(){
if(arguments.length!=0){
return""+arguments[0];
} else if(this===Integer){
return"class java.lang.Integer";
}
return""+this.valueOf();
};

/*

Clazz.makeConstructor(Integer,
function(){
this.valueOf=function(){
return 0;
};
});
*/


Clazz.overrideConstructor(Integer, function(v){
 v == null && (v = 0);
 if (typeof v != "number")
	v = Integer.parseIntRadix(v, 10);
 this.valueOf=function(){return v;};
}); //BH
/*
Clazz.makeConstructor(Integer,
function(s){
var value=Integer.parseInt(s,10);
this.valueOf=function(){
return value;
};
},"String");
*/
Integer.MIN_VALUE=Integer.prototype.MIN_VALUE=-0x80000000;
Integer.MAX_VALUE=Integer.prototype.MAX_VALUE=0x7fffffff;
Integer.TYPE=Integer.prototype.TYPE=Integer;


Integer.compare = Clazz.defineMethod(Integer,"compare",
function(i,j) {
  return (i < j ? -1 : i > j ? 1 : 0);
},"Number,Number");

Clazz.defineMethod(Integer,"bitCount",
function(i) {
	i = i - ((i >>> 1) & 0x55555555);
	i = (i & 0x33333333) + ((i >>> 2) & 0x33333333);
	i = (i + (i >>> 4)) & 0x0f0f0f0f;
	i = i + (i >>> 8);
	i = i + (i >>> 16);
	return i & 0x3f;
},"Number");
Integer.bitCount=Integer.prototype.bitCount;

Clazz.defineMethod(Integer,"numberOfLeadingZeros",
function(i) {
 if (i == 0) return 32;
 var n = 1;
 if (i >>> 16 == 0) { n += 16; i <<= 16; }
 if (i >>> 24 == 0) { n +=  8; i <<=  8; }
 if (i >>> 28 == 0) { n +=  4; i <<=  4; }
 if (i >>> 30 == 0) { n +=  2; i <<=  2; }
 n -= i >>> 31;
 return n;
},"Number");
Integer.numberOfLeadingZeros=Integer.prototype.numberOfLeadingZeros;

Clazz.defineMethod(Integer,"numberOfTrailingZeros",
function(i) {
	if (i == 0) return 32;
	var n = 31;
	var y = i <<16; if (y != 0) { n = n -16; i = y; }
	y = i << 8; if (y != 0) { n = n - 8; i = y; }
	y = i << 4; if (y != 0) { n = n - 4; i = y; }
	y = i << 2; if (y != 0) { n = n - 2; i = y; }
	return n - ((i << 1) >>> 31);
},"Number");
Integer.numberOfTrailingZeros=Integer.prototype.numberOfTrailingZeros;

Clazz.defineMethod(Integer,"parseIntRadix",
function(s,radix){
if(s==null){
throw new NumberFormatException("null");
}if(radix<2){
throw new NumberFormatException("radix "+radix+" less than Character.MIN_RADIX");
}if(radix>36){
throw new NumberFormatException("radix "+radix+" greater than Character.MAX_RADIX");
}
if (radix == 10) {
	for (var i = s.length; --i >= 0;) {
		var c = s.charCodeAt(i);
		if (c >= 48 && c <= 57) continue;
		if (i > 0 || c != 43 && c != 45)
			throw new NumberFormatException("Not a Number : "+s);

	}
}
var i=parseInt(s,radix);
if(isNaN(i)){
throw new NumberFormatException("Not a Number : "+s);
}
return i;
},"String, Number");
Integer.parseIntRadix=Integer.prototype.parseIntRadix;

Clazz.defineMethod(Integer,"parseInt",
function(s){
return Integer.parseIntRadix(s,10);
},"String");
Integer.parseInt=Integer.prototype.parseInt;

/*
Clazz.defineMethod(Integer,"$valueOf",
function(s){
return new Integer(Integer.parseIntRadix(s,10));
},"String");
*/

Clazz.overrideMethod(Integer,"$valueOf",
function(s){
return new Integer(s);
});

/*
Clazz.defineMethod(Integer,"$valueOf",
function(s,r){
return new Integer(Integer.parseIntRadix(s,r));
},"String, Number");
*/

Integer.$valueOf=Integer.prototype.$valueOf;


Clazz.overrideMethod(Integer,"equals",
function(s){
if(s==null||!Clazz.instanceOf(s,Integer)){
return false;
}
return s.valueOf()==this.valueOf();
},"Object");
Integer.toHexString=Integer.prototype.toHexString=function(d){
if(d.valueOf)d=d.valueOf();
if (d < 0) {
var b = d & 0xFFFFFF;
var c = ((d>>24)&0xFF);
return c._numberToString(16) + (b = "000000" + b._numberToString(16)).substring(b.length - 6);
}
return d._numberToString(16);};
Integer.toOctalString=Integer.prototype.toOctalString=function(d){if(d.valueOf)d=d.valueOf();return d._numberToString(8);};
Integer.toBinaryString=Integer.prototype.toBinaryString=function(d){if(d.valueOf)d=d.valueOf();return d._numberToString(2);};

Integer.decodeRaw=Clazz.defineMethod(Integer,"decodeRaw", function(n){
if (n.indexOf(".") >= 0)n = "";
var i = (n.startsWith("-") ? 1 : 0);
n = n.replace(/\#/, "0x").toLowerCase();
var radix=(n.startsWith("0x", i) ? 16 : n.startsWith("0", i) ? 8 : 10);
// The general problem with parseInt is that is not strict -- ParseInt("10whatever") == 10.
// Number is strict, but Number("055") does not work, though ParseInt("055", 8) does.
// need to make sure negative numbers are negative
n = Number(n) & 0xFFFFFFFF;
return (radix == 8 ? parseInt(n, 8) : n);
},"~S");

Integer.decode=Clazz.defineMethod(Integer,"decode", function(n){
	n = Integer.decodeRaw(n);
	if (isNaN(n) || n < Integer.MIN_VALUE|| n > Integer.MAX_VALUE)
	throw new NumberFormatException("Invalid Integer");
	return new Integer(n);
},"~S");

Clazz.overrideMethod(Integer,"hashCode",
function(){
return this.valueOf();
});

// Note that Long is problematic in JavaScript 

java.lang.Long=Long=function(){
Clazz.instantialize(this,arguments);
};
Clazz.decorateAsType(Long,"Long",Number,Comparable,null,true);
Long.prototype.valueOf=function(){return 0;};
Long.toString=Long.prototype.toString=function(){
if(arguments.length!=0){
return""+arguments[0];
}else if(this===Long){
return"class java.lang.Long";
}
return""+this.valueOf();
};

Clazz.overrideConstructor(Long, function(v){
 v == null && (v = 0);
 v = (typeof v == "number" ? Math.round(v) : Integer.parseIntRadix(v, 10));
this.valueOf=function(){return v;};
});

//Long.MIN_VALUE=Long.prototype.MIN_VALUE=-0x8000000000000000;
//Long.MAX_VALUE=Long.prototype.MAX_VALUE=0x7fffffffffffffff;
Long.TYPE=Long.prototype.TYPE=Long;

Clazz.defineMethod(Long,"parseLong",
function(s,radix){
 return Integer.parseInt(s, radix || 10);
});

Long.parseLong=Long.prototype.parseLong;

Clazz.overrideMethod(Long,"$valueOf",
function(s){
return new Long(s);
});
/*
Clazz.defineMethod(Long,"$valueOf",
function(s){
return new Long(s);
},"Number");

Clazz.defineMethod(Long,"$valueOf",
function(s,r){
return new Long(Long.parseLong(s,r));
},"String, Number");
*/
Long.$valueOf=Long.prototype.$valueOf;
Clazz.overrideMethod(Long,"equals",
function(s){
if(s==null||!Clazz.instanceOf(s,Long)){
return false;
}
return s.valueOf()==this.valueOf();
},"Object");
Long.toHexString=Long.prototype.toHexString=function(i){
return i.toString(16);
};
Long.toOctalString=Long.prototype.toOctalString=function(i){
return i.toString(8);
};
Long.toBinaryString=Long.prototype.toBinaryString=function(i){
return i.toString(2);
};


Long.decode=Clazz.defineMethod(Long,"decode",
function(n){
	n = Integer.decodeRaw(n);
	if (isNaN(n))
		throw new NumberFormatException("Invalid Long");
	return new Long(n);
},"~S");

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

Clazz.overrideConstructor(Short,
function (v) {
 v == null && (v = 0);
 if (typeof v != "number")
	v = Integer.parseIntRadix(v, 10);
 v = v.shortValue();
 this.valueOf = function () {return v;};
});


Short.MIN_VALUE = Short.prototype.MIN_VALUE = -32768;
Short.MAX_VALUE = Short.prototype.MAX_VALUE = 32767;
Short.TYPE = Short.prototype.TYPE = Short;

Clazz.defineMethod(Short, "parseShortRadix",
function (s, radix) {
return Integer.parseIntRadix(s, radix).shortValue();
}, "String, Number");
Short.parseShortRadix = Short.prototype.parseShortRadix;

Clazz.defineMethod(Short, "parseShort",
function (s) {
return Short.parseShortRadix (s, 10);
}, "String");

Short.parseShort = Short.prototype.parseShort;

/*
Clazz.defineMethod(Short, "$valueOf",
function (s) {
return new Short(Short.parseShort (s, 10));
}, "String");
	*/

Clazz.overrideMethod(Short, "$valueOf",
function (s) {
return new Short(s);
});

/*
Clazz.defineMethod(Short, "$valueOf",
function (s, r) {
return new Short(Short.parseShort (s, r));
}, "String, Number");
	*/

Short.$valueOf = Short.prototype.$valueOf;
Clazz.overrideMethod(Short, "equals",
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
Short.decode = Clazz.defineMethod(Short, "decode",
function(n){
	n = Integer.decodeRaw(n);
	if (isNaN(n) || n < -32768|| n > 32767)
		throw new NumberFormatException("Invalid Short");
	return new Short(n);
}, "~S");

java.lang.Byte=Byte=function(){
Clazz.instantialize(this,arguments);
};
Clazz.decorateAsType(Byte,"Byte",Number,Comparable,null,true);
Byte.prototype.valueOf=function(){return 0;};
Byte.toString=Byte.prototype.toString=function(){
if(arguments.length!=0){
return""+arguments[0];
}else if(this===Byte){
return"class java.lang.Byte";
}
return""+this.valueOf();
};
Clazz.makeConstructor(Byte,
function(v){
 if (typeof v != "number")
	 v = Integer.parseIntRadix(v, 10);
 v = v.byteValue();
this.valueOf=function(){
return v;
};
});

Byte.serialVersionUID=Byte.prototype.serialVersionUID=-7183698231559129828;
Byte.MIN_VALUE=Byte.prototype.MIN_VALUE=-128;
Byte.MAX_VALUE=Byte.prototype.MAX_VALUE=127;
Byte.SIZE=Byte.prototype.SIZE=8;
Byte.TYPE=Byte.prototype.TYPE=Byte;

Clazz.defineMethod(Byte,"parseByteRadix",
function(s,radix){
 return Integer.parseIntRadix(s, radix).byteValue();
},"String, Number");
Byte.parseByteRadix=Byte.prototype.parseByteRadix;

Clazz.defineMethod(Byte,"parseByte",
function(s){
return Byte.parseByte(s,10);
},"String");

Byte.parseByte=Byte.prototype.parseByte;

Clazz.overrideMethod(Byte, "$valueOf",
function (s) {
return new Byte(s);
});

Byte.$valueOf=Byte.prototype.$valueOf;
Clazz.overrideMethod(Byte,"equals",
function(s){
if(s==null||!Clazz.instanceOf(s,Byte)){
return false;
}
return s.valueOf()==this.valueOf();
},"Object");
Byte.toHexString=Byte.prototype.toHexString=function(i){
return i.toString(16);
};
Byte.toOctalString=Byte.prototype.toOctalString=function(i){
return i.toString(8);
};
Byte.toBinaryString=Byte.prototype.toBinaryString=function(i){
return i.toString(2);
};
Byte.decode=Clazz.defineMethod(Byte,"decode",
function(n){
	n = Integer.decodeRaw(n);
	if (isNaN(n) || n < -128|| n > 127)
		throw new NumberFormatException("Invalid Byte");
return new Byte(n);
},"~S");

Clazz._floatToString = function(f) {
 var s = ""+f
 if (s.indexOf(".") < 0 && s.indexOf("e") < 0)
 	 s += ".0";
 return s;
}

java.lang.Float=Float=function(){
Clazz.instantialize(this,arguments);
};
Clazz.decorateAsType(Float,"Float",Number,Comparable,null,true);
Float.prototype.valueOf=function(){return 0;};
Float.toString=Float.prototype.toString=function(){
if(arguments.length!=0){
return Clazz._floatToString(arguments[0]);
}else if(this===Float){
return"class java.lang.Float";
}
return Clazz._floatToString(this.valueOf());
};

Clazz._a32 = null;

Float.floatToIntBits = function(f) {
var a = Clazz._a32 || (Clazz._a32 = new Float32Array(1));
a[0] = f;
return new Int32Array(a.buffer)[0]; 
}

Clazz.overrideConstructor(Float, function(v){
 v == null && (v = 0);
 if (typeof v != "number") 
	v = Number(v);
 this.valueOf=function(){return v;}
});

Float.serialVersionUID=Float.prototype.serialVersionUID=-2671257302660747028;
Float.MIN_VALUE=Float.prototype.MIN_VALUE=1.4e-45;
Float.MAX_VALUE=Float.prototype.MAX_VALUE=3.4028235e+38;
Float.NEGATIVE_INFINITY=Number.NEGATIVE_INFINITY;
Float.POSITIVE_INFINITY=Number.POSITIVE_INFINITY;
Float.NaN=Number.NaN;
Float.TYPE=Float.prototype.TYPE=Float;

Clazz.defineMethod(Float,"parseFloat",
function(s){
if(s==null){
throw new NumberFormatException("null");
}
if (typeof s == "number")return s;  // important -- typeof NaN is "number" and is OK here
var floatVal=Number(s);
if(isNaN(floatVal)){
throw new NumberFormatException("Not a Number : "+s);
}
return floatVal;
},"String");
Float.parseFloat=Float.prototype.parseFloat;

Clazz.overrideMethod(Float,"$valueOf",
function(s){
return new Float(s);
});

Float.$valueOf=Float.prototype.$valueOf;

Clazz.defineMethod(Float,"isNaN",
function(num){
return isNaN(arguments.length == 1 ? num : this.valueOf());
},"Number");
Float.isNaN=Float.prototype.isNaN;
Clazz.defineMethod(Float,"isInfinite",
function(num){
return!isFinite(arguments.length == 1 ? num : this.valueOf());
},"Number");
Float.isInfinite=Float.prototype.isInfinite;

Clazz.overrideMethod(Float,"equals",
function(s){
if(s==null||!Clazz.instanceOf(s,Float)){
return false;
}
return s.valueOf()==this.valueOf();
},"Object");

java.lang.Double=Double=function(){
Clazz.instantialize(this,arguments);
};
Clazz.decorateAsType(Double,"Double",Number,Comparable,null,true);
Double.prototype.valueOf=function(){return 0;};
Double.toString=Double.prototype.toString=function(){
if(arguments.length!=0){
return Clazz._floatToString(arguments[0]);
}else if(this===Double){
return"class java.lang.Double";
}
return Clazz._floatToString(this.valueOf());
};

Clazz.overrideConstructor(Double, function(v){
 v == null && (v = 0);
 if (typeof v != "number") 
	v = Double.parseDouble(v);
 this.valueOf=function(){return v;};
}); // BH

Double.serialVersionUID=Double.prototype.serialVersionUID=-9172774392245257468;
Double.MIN_VALUE=Double.prototype.MIN_VALUE=4.9e-324;
Double.MAX_VALUE=Double.prototype.MAX_VALUE=1.7976931348623157e+308;
Double.NEGATIVE_INFINITY=Number.NEGATIVE_INFINITY;
Double.POSITIVE_INFINITY=Number.POSITIVE_INFINITY;
Double.NaN=Number.NaN;
Double.TYPE=Double.prototype.TYPE=Double;

Clazz.defineMethod(Double,"isNaN",
function(num){
return isNaN(arguments.length == 1 ? num : this.valueOf());
},"Number");
Double.isNaN=Double.prototype.isNaN;
Clazz.defineMethod(Double,"isInfinite",
function(num){
return!isFinite(arguments.length == 1 ? num : this.valueOf());
},"Number");
Double.isInfinite=Double.prototype.isInfinite;

Clazz.defineMethod(Double,"parseDouble",
function(s){
if(s==null){
throw new NumberFormatException("null");
}
if (typeof s == "number")return s;  // important -- typeof NaN is "number" and is OK here
var doubleVal=Number(s);
if(isNaN(doubleVal)){
throw new NumberFormatException("Not a Number : "+s);
}
return doubleVal;
},"String");
Double.parseDouble=Double.prototype.parseDouble;

/*
Clazz.defineMethod(Double,"$valueOf",
function(s){
return new Double(this.parseDouble(s));
},"String");
*/

Clazz.defineMethod(Double,"$valueOf",
function(v){
return new Double(v);
},"Number");

Double.$valueOf=Double.prototype.$valueOf;

Clazz.overrideMethod(Double,"equals",
function(s){
if(s==null||!Clazz.instanceOf(s,Double)){
return false;
}
return s.valueOf()==this.valueOf();
},"Object");


//java.lang.B00lean = Boolean; ?? BH why this?
Boolean = java.lang.Boolean = Boolean || function () {Clazz.instantialize (this, arguments);};
if (Clazz._supportsNativeObject) {
	for (var i = 0; i < Clazz._extendedObjectMethods.length; i++) {
		var p = Clazz._extendedObjectMethods[i];
		Boolean.prototype[p] = Clazz._O.prototype[p];
	}
}
Boolean.__CLASS_NAME__="Boolean";
Clazz.implementOf(Boolean,[java.io.Serializable,java.lang.Comparable]);
Boolean.equals=Clazz._innerFunctions.equals;
Boolean.getName=Clazz._innerFunctions.getName;
Boolean.serialVersionUID=Boolean.prototype.serialVersionUID=-3665804199014368530;

//Clazz.makeConstructor(Boolean,
//function(value){
//this.valueOf=function(){
//return value;
//};
//},"~B");

Clazz.overrideConstructor(Boolean,
function(s){
	var b = ((typeof s == "string" ? Boolean.toBoolean(s) : s) ? true : false);
	this.valueOf=function(){return b;};
},"~O");

Boolean.parseBoolean=Clazz.defineMethod(Boolean,"parseBoolean",
function(s){
return Boolean.toBoolean(s);
},"~S");
Clazz.defineMethod(Boolean,"booleanValue",
function(){
return this.valueOf();
});
Boolean.$valueOf=Clazz.overrideMethod(Boolean,"$valueOf",
function(b){
return((typeof b == "string"? "true".equalsIgnoreCase(b) : b)?Boolean.TRUE:Boolean.FALSE);
});

/*
Boolean.toString=Clazz.defineMethod(Boolean,"toString",
function(b){
return b?"true":"false";
},"~B");
*/

Clazz.overrideMethod(Boolean,"toString",
function(){
return this.valueOf()?"true":"false";
});
Clazz.overrideMethod(Boolean,"hashCode",
function(){
return this.valueOf()?1231:1237;
});
Clazz.overrideMethod(Boolean,"equals",
function(obj){
if(Clazz.instanceOf(obj,Boolean)){
return this.booleanValue()==obj.booleanValue();
}return false;
},"~O");
Boolean.getBoolean=Clazz.defineMethod(Boolean,"getBoolean",
function(name){
var result=false;
try{
result=Boolean.toBoolean(System.getProperty(name));
}catch(e){
if(Clazz.instanceOf(e,IllegalArgumentException)){
}else if(Clazz.instanceOf(e,NullPointerException)){
}else{
throw e;
}
}
return result;
},"~S");
Clazz.overrideMethod(Boolean,"compareTo",
function(b){
return(b.value==this.value?0:(this.value?1:-1));
},"Boolean");
Boolean.toBoolean=Clazz.defineMethod(Boolean,"toBoolean",
($fz=function(name){
return((name!=null)&&name.equalsIgnoreCase("true"));
},$fz.isPrivate=true,$fz),"~S");
Boolean.TRUE=Boolean.prototype.TRUE=new Boolean(true);
Boolean.FALSE=Boolean.prototype.FALSE=new Boolean(false);
Boolean.TYPE=Boolean.prototype.TYPE=Boolean;


Clazz._Encoding=new Object();

(function(Encoding) {

Encoding.UTF8="utf-8";
Encoding.UTF16="utf-16";
Encoding.ASCII="ascii";


Encoding.guessEncoding=function(str){
if(str.charCodeAt(0)==0xEF&&str.charCodeAt(1)==0xBB&&str.charCodeAt(2)==0xBF){
return Encoding.UTF8;
}else if(str.charCodeAt(0)==0xFF&&str.charCodeAt(1)==0xFE){
return Encoding.UTF16;
}else{
return Encoding.ASCII;
}
};

Encoding.guessEncodingArray=function(a){
if(a[0]==0xEF&&a[1]==0xBB&&a[2]==0xBF){
return Encoding.UTF8;
}else if(a[0]==0xFF&&a[1]==0xFE){
return Encoding.UTF16;
}else{
return Encoding.ASCII;
}
};

Encoding.readUTF8=function(str){
if (typeof str != "string") return Encoding.readUTF8Array(str);
var encoding=Encoding.guessEncoding(str);
var startIdx=0;
if(encoding==Encoding.UTF8){
startIdx=3;
}else if(encoding==Encoding.UTF16){
startIdx=2;
}
var arrs=new Array();
for(var i=startIdx;i<str.length;i++){
var charCode=str.charCodeAt(i);
if(charCode<0x80){
arrs[arrs.length]=str.charAt(i);
}else if(charCode>0xc0&&charCode<0xe0){
var c1=charCode&0x1f;
i++;
var c2=str.charCodeAt(i)&0x3f;
var c=(c1<<6)+c2;
arrs[arrs.length]=String.fromCharCode(c);
}else if(charCode>=0xe0){
var c1=charCode&0x0f;
i++;
var c2=str.charCodeAt(i)&0x3f;
i++;
var c3=str.charCodeAt(i)&0x3f;
var c=(c1<<12)+(c2<<6)+c3;
arrs[arrs.length]=String.fromCharCode(c);
}
}
return arrs.join('');
};

Encoding.readUTF8Array=function(a){
var encoding=Encoding.guessEncodingArray(a);
var startIdx=0;
if(encoding==Encoding.UTF8){
startIdx=3;
}else if(encoding==Encoding.UTF16){
startIdx=2;
}
var arrs=new Array();
for(var i=startIdx;i<a.length;i++){
var charCode=a[i];
if(charCode<0x80){
arrs[arrs.length]=String.fromCharCode(charCode);
}else if(charCode>0xc0&&charCode<0xe0){
var c1=charCode&0x1f;
var c2=a[++i]&0x3f;
var c=(c1<<6)+c2;
arrs[arrs.length]=String.fromCharCode(c);
}else if(charCode>=0xe0){
var c1=charCode&0x0f;
var c2=a[++i]&0x3f;
var c3=a[++i]&0x3f;
var c=(c1<<12)+(c2<<6)+c3;
arrs[arrs.length]=String.fromCharCode(c);
}
}
return arrs.join('');
};

Encoding.convert2UTF8=function(str){
var encoding=this.guessEncoding(str);
var startIdx=0;
if(encoding==Encoding.UTF8){
return str;
}else if(encoding==Encoding.UTF16){
startIdx=2;
}

var offset=0;
var arrs=new Array(offset+str.length-startIdx);

for(var i=startIdx;i<str.length;i++){
var charCode=str.charCodeAt(i);
if(charCode<0x80){
arrs[offset+i-startIdx]=str.charAt(i);
}else if(charCode<=0x07ff){
var c1=0xc0+((charCode&0x07c0)>>6);
var c2=0x80+(charCode&0x003f);
arrs[offset+i-startIdx]=String.fromCharCode(c1)+String.fromCharCode(c2);
}else{
var c1=0xe0+((charCode&0xf000)>>12);
var c2=0x80+((charCode&0x0fc0)>>6);
var c3=0x80+(charCode&0x003f);
arrs[offset+i-startIdx]=String.fromCharCode(c1)+String.fromCharCode(c2)+String.fromCharCode(c3);
}
}
return arrs.join('');
};
Encoding.base64Chars=new Array(
'A','B','C','D','E','F','G','H',
'I','J','K','L','M','N','O','P',
'Q','R','S','T','U','V','W','X',
'Y','Z','a','b','c','d','e','f',
'g','h','i','j','k','l','m','n',
'o','p','q','r','s','t','u','v',
'w','x','y','z','0','1','2','3',
'4','5','6','7','8','9','+','/'
);
Encoding.encodeBase64=function(str){
if(str==null||str.length==0)return str;
var b64=Encoding.base64Chars;
var length=str.length;
var index=0;
var buf=[];
var c0,c1,c2;
while(index<length){
c0=str.charCodeAt(index++);
buf[buf.length]=b64[c0>>2];
if(index<length){
c1=str.charCodeAt(index++);
buf[buf.length]=b64[((c0<<4)&0x30)|(c1>>4)];
if(index<length){
c2=str.charCodeAt(index++);
buf[buf.length]=b64[((c1<<2)&0x3c)|(c2>>6)];
buf[buf.length]=b64[c2&0x3F];
}else{
buf[buf.length]=b64[((c1<<2)&0x3c)];
buf[buf.length]='=';
}
}else{
buf[buf.length]=b64[(c0<<4)&0x30];
buf[buf.length]='=';
buf[buf.length]='=';
}
}
return buf.join('');
};
Encoding.decodeBase64=function(str){
if(str==null||str.length==0)return str;
var b64=Encoding.base64Chars;
var xb64=Encoding.xBase64Chars;
if(Encoding.xBase64Chars==null){
xb64=new Object();
for(var i=0;i<b64.length;i++){
xb64[b64[i]]=i;
}
Encoding.xBase64Chars=xb64;
}
var length=str.length;
var index=0;
var buf=[];
var c0,c1,c2,c3;
var c=0;
while(index<length&&c++<60000){
c0=xb64[str.charAt(index++)];
c1=xb64[str.charAt(index++)];
c2=xb64[str.charAt(index++)];
c3=xb64[str.charAt(index++)];
buf[buf.length]=String.fromCharCode(((c0<<2)&0xff)|c1>>4);
if(c2!=null){
buf[buf.length]=String.fromCharCode(((c1<<4)&0xff)|c2>>2);
if(c3!=null){
buf[buf.length]=String.fromCharCode(((c2<<6)&0xff)|c3);
}
}
}
return buf.join('');
};

if(String.prototype.$replace==null){
java.lang.String=String;
if(Clazz._supportsNativeObject){
for(var i=0;i<Clazz._extendedObjectMethods.length;i++){
var p=Clazz._extendedObjectMethods[i];
if("to$tring"==p||"toString"==p||"equals"==p||"hashCode"==p){
continue;
}
String.prototype[p]=Clazz._O.prototype[p];
}
}

Clazz.implementOf(String,[java.io.Serializable,CharSequence,Comparable]);

String.getName=Clazz._innerFunctions.getName;

String.serialVersionUID=String.prototype.serialVersionUID=-6849794470754667710;


;(function(sp) {

sp.$replace=function(c1,c2){
	if (c1 == c2 || this.indexOf (c1) < 0) return "" + this;
	if (c1.length == 1) {
		if ("\\$.*+|?^{}()[]".indexOf(c1) >= 0) 	c1 = "\\" + c1;
	} else {    
		c1=c1.replace(/([\\\$\.\*\+\|\?\^\{\}\(\)\[\]])/g,function($0,$1){return"\\"+$1;});
	}
	return this.replace(new RegExp(c1,"gm"),c2);
};
sp.$generateExpFunction=function(str){
var arr=[];
var orders=[];
var idx=0;
arr[0]="";
var i=0;
for(;i<str.length;i++){
var ch=str.charAt(i);
if(i!=str.length-1&&ch=='\\'){
i++;
var c=str.charAt(i);
if(c=='\\'){
arr[idx]+='\\';
}
arr[idx]+=c;
}else if(i!=str.length-1&&ch=='$'){
i++;
orders[idx]=parseInt(str.charAt(i));
idx++;
arr[idx]="";
}else if(ch=='\r'){
arr[idx]+="\\r";
}else if(ch=='\n'){
arr[idx]+="\\n";
}else if(ch=='\t'){
arr[idx]+="\\t";
}else if(ch=='\"'){
arr[idx]+="\\\"";
}else{
arr[idx]+=ch;
}
}
var funStr="f = function (";
var max=Math.max.apply({},orders);
for(i=0;i<=max;i++){
funStr+="$"+i;
if(i!=max){
funStr+=", ";
}
}
funStr+=") { return ";
for(i=0;i<arr.length-1;i++){
funStr+="\""+arr[i]+"\" + $"+orders[i]+" + ";
}
funStr+="\""+arr[i]+"\"; }";
var f=null;
eval(funStr)
return f;
};

sp.replaceAll=function(exp,str){
var regExp=new RegExp(exp,"gm");
return this.replace(regExp,this.$generateExpFunction(str));
};
sp.replaceFirst=function(exp,str){
var regExp=new RegExp(exp,"m");
return this.replace(regExp,this.$generateExpFunction(str));
};
sp.matches=function(exp){
if(exp!=null){
exp="^("+exp+")$";
}
var regExp=new RegExp(exp,"gm");
var m=this.match(regExp);
return m!=null&&m.length!=0;
};
sp.regionMatches=function(ignoreCase,toffset,
other,ooffset,len){

if(typeof ignoreCase=="number"
||(ignoreCase!=true&&ignoreCase!=false)){
len=ooffset;
ooffset=other;
other=toffset;
toffset=ignoreCase;
ignoreCase=false;
}
var to=toffset;
var po=ooffset;

if((ooffset<0)||(toffset<0)||(toffset>this.length-len)||
(ooffset>other.length-len)){
return false;
}
var s1=this.substring(toffset,toffset+len);
var s2=other.substring(ooffset,ooffset+len);
if(ignoreCase){
s1=s1.toLowerCase();
s2=s2.toLowerCase();
}
return s1==s2;
};



sp.$plit=function(regex,limit){
if (!limit && regex == " ")
	return this.split(regex);

if(limit!=null&&limit>0){
if(limit==1){
return this;
}
var regExp=new RegExp("("+regex+")","gm");
var count=1;
var s=this.replace(regExp,function($0,$1){
count++;
if(count==limit){
return"@@_@@";
}else if(count>limit){
return $0;
}else{
return $0;
}
});
regExp=new RegExp(regex,"gm");
var arr=this.split(regExp);
if(arr.length>limit){
arr[limit-1]=s.substring(s.indexOf("@@_@@")+5);
arr.length=limit;
}
return arr;
}else{
var regExp=new RegExp(regex,"gm");
return this.split(regExp);
}
};
/*
sp.trim=function(){
var len=this.length;
var st=0;

while((st<len)&&(this.charAt(st)<=' ')){
st++;
}
while((st<len)&&(this.charAt(len-1)<=' ')){
len--;
}
return((st>0)||(len<len))?this.substring(st,len):this;
};


*/

if (!sp.trim)
sp.trim=function(){
return this.replace(/^\s+/g,'').replace(/\s+$/g,'');
};

if (!sp.startsWith || !sp.endsWith) {
var sn=function(s, prefix,toffset){
var to=toffset;
var po=0;
var pc=prefix.length;

if((toffset<0)||(toffset>s.length-pc)){
return false;
}
while(--pc>=0){
if(s.charAt(to++)!=prefix.charAt(po++)){
return false;
}
}
return true;
};

sp.startsWith=function(prefix){
if(arguments.length==1){
return sn(this,arguments[0],0);
}else if(arguments.length==2){
return sn(this,arguments[0],arguments[1]);
}else{
return false;
}
};

sp.endsWith=function(suffix){
return sn(this, suffix,this.length-suffix.length);
};

}

sp.equals=function(anObject){
return this.valueOf()==anObject;
};

sp.equalsIgnoreCase=function(anotherString){
return(anotherString==null)?false:(this==anotherString
||this.toLowerCase()==anotherString.toLowerCase());
};


sp.hash=0;

sp.hashCode=function(){
var h=this.hash;
if(h==0){
var off=0;
var len=this.length;
for(var i=0;i<len;i++){
h=31*h+this.charCodeAt(off++);
h&=0xffffffff;
}
this.hash=h;
}
return h;
};

sp.getBytes=function(){
if(arguments.length==4){
return this.getChars(arguments[0],arguments[1],arguments[2],arguments[3]);
}
var s=this;
if(arguments.length==1){
var cs=arguments[0].toString().toLowerCase();
var charset=[
"utf-8","UTF8","us-ascii","iso-8859-1","8859_1","gb2312","gb18030","gbk"
];
var existed=false;
for(var i=0;i<charset.length;i++){
if(charset[i]==cs){
existed=true;
break;
}
}
if(!existed){
throw new java.io.UnsupportedEncodingException();
}
if(cs=="utf-8"||cs=="utf8"){
s=Encoding.convert2UTF8(this);
}
}
var arrs=new Array(s.length);
var c=0,ii=0;
for(var i=0;i<s.length;i++){
c=s.charCodeAt(i);
if(c>255){
arrs[ii]=0x1a;
arrs[ii+1]=c&0xff;
arrs[ii+2]=(c&0xff00)>>8;
ii+=2;
}else{
arrs[ii]=c;
}
ii++;
}
return Clazz.newByteArray(arrs);
};

/*
sp.compareTo=function(anotherString){
if(anotherString==null){
throw new java.lang.NullPointerException();
}
var len1=this.length;
var len2=anotherString.length;
var n=Math.min(len1,len2);
var k=0;
while(k<n){
var c1=this.charCodeAt(k);
var c2=anotherString.charCodeAt(k);
if(c1!=c2){
return c1-c2;
}
k++;
}
return len1-len2;
};

*/

sp.contains = function(a) {return this.indexOf(a) >= 0}  // bh added
sp.compareTo = function(a){return this > a ? 1 : this < a ? -1 : 0} // bh added



sp.toCharArray=function(){
var result=new Array(this.length);
for(var i=0;i<this.length;i++){
result[i]=this.charAt(i);
}
return result;
};
String.value0f=String.valueOf;
String.valueOf=function(o){
if(o=="undefined"){
return String.value0f();
}
if(o instanceof Array){
if(arguments.length==1){
return o.join('');
}else{
var off=arguments[1];
var len=arguments[2];
var oo=new Array(len);
for(var i=0;i<len;i++){
oo[i]=o[off+i];
}
return oo.join('');
}
}
return""+o;
};

sp.subSequence=function(beginIndex,endIndex){
return this.substring(beginIndex,endIndex);
};

sp.compareToIgnoreCase=function(str){
if(str==null){
throw new NullPointerException();
}
var s1=this.toUpperCase();
var s2=str.toUpperCase();
if(s1==s2){
return 0;
}else{
var s1=this.toLowerCase();
var s2=str.toLowerCase();
if(s1==s2){
return 0;
}else if(s1>s2){
return 1;
}else{
return-1;
}
}
};

sp.contentEquals=function(sb){
if(this.length!=sb.length()){
return false;
}
var v=sb.getValue();
var i=0;
var j=0;
var n=this.length;
while(n--!=0){
if(this.charCodeAt(i++)!=v[j++]){
return false;
}
}
return true;
};

sp.getChars=function(srcBegin,srcEnd,dst,dstBegin){
if(srcBegin<0){
throw new StringIndexOutOfBoundsException(srcBegin);
}
if(srcEnd>this.length){
throw new StringIndexOutOfBoundsException(srcEnd);
}
if(srcBegin>srcEnd){
throw new StringIndexOutOfBoundsException(srcEnd-srcBegin);
}
if(dst==null){
throw new NullPointerException();
}
for(var i=0;i<srcEnd-srcBegin;i++){
dst[dstBegin+i]=this.charAt(srcBegin+i);
}
};
sp.$concat=sp.concat;
sp.concat=function(s){
if(s==null){
throw new NullPointerException();
}
return this.$concat(s);
};

sp.$lastIndexOf=sp.lastIndexOf;
sp.lastIndexOf=function(s,last){
if(last!=null&&last+this.length<=0){
return-1;
}
if(last!=null){
return this.$lastIndexOf(s,last);
}else{
return this.$lastIndexOf(s);
}
};

sp.intern=function(){
return this.valueOf();
};
String.copyValueOf=sp.copyValueOf=function(){
if(arguments.length==1){
return String.instantialize(arguments[0]);
}else{
return String.instantialize(arguments[0],arguments[1],arguments[2]);
}
};

sp.codePointAt || (sp.codePointAt = sp.charCodeAt); // Firefox only


})(String.prototype);

String.instantialize=function(){
switch (arguments.length) {
case 0:
	return new String();
case 1:
	var x=arguments[0];
  if (x.BYTES_PER_ELEMENT || x instanceof Array){
		return (x.length == 0 ? "" : typeof x[0]=="number" ? Encoding.readUTF8Array(x) : x.join(''));
  }
	if(typeof x=="string"||x instanceof String){
		return new String(x);
	}
	if(x.__CLASS_NAME__=="StringBuffer"||x.__CLASS_NAME__=="java.lang.StringBuffer"){
		var value=x.shareValue();
		var length=x.length();
		var valueCopy=new Array(length);
		for(var i=0;i<length;i++){
			valueCopy[i]=value[i];
		}
		return valueCopy.join('')
	}
	return""+x;
case 2:	
	var x=arguments[0];
	var hibyte=arguments[1];
	if(typeof hibyte=="string"){
		return String.instantialize(x,0,x.length,hibyte);
	}
	return String.instantialize(x,hibyte,0,x.length);
case 3:
	var bytes=arguments[0];
	var offset=arguments[1];
	var length=arguments[2];
	if(arguments[2]instanceof Array){
		bytes=arguments[2];
		offset=arguments[0];
		length=arguments[1];
	}
	var arr=new Array(length);
	if(offset<0||length+offset>bytes.length){
		throw new IndexOutOfBoundsException();
	}
	if(length>0){
		var isChar=(bytes[offset].length!=null);
		if(isChar){
			for(var i=0;i<length;i++){
				arr[i]=bytes[offset+i];
			}
		}else{
			for(var i=0;i<length;i++){
				arr[i]=String.fromCharCode(bytes[offset+i]);
			}
		}
	}
	return arr.join('');
case 4:
	var bytes=arguments[0];
	var y=arguments[3];
	if(typeof y=="string"||y instanceof String){
		var offset=arguments[1];
		var length=arguments[2];
		var arr=new Array(length);
		for(var i=0;i<length;i++){
			arr[i]=bytes[offset+i];
		}
		return Encoding.readUTF8Array(arr);
	}
	var count=arguments[3];
	var offset=arguments[2];
	var hibyte=arguments[1];
	var value=new Array(count);
	if(hibyte==0){
		for(var i=count;i-->0;){
			value[i]=String.fromCharCode(bytes[i+offset]&0xff);
		}
	}else{
		hibyte<<=8;
		for(var i=count;i-->0;){
			value[i]=String.fromCharCode(hibyte|(bytes[i+offset]&0xff));
		}
	}
	return value.join('');
default:
	var s="";
	for(var i=0;i<arguments.length;i++){
		s+=arguments[i];
	}
	return s;
}
};

if(navigator.userAgent.toLowerCase().indexOf("chrome")!=-1){
	String.prototype.toString=function(){return this.valueOf();};
}

}

})(Clazz._Encoding);



c$=Clazz.decorateAsClass(function(){
this.value=0;
Clazz.instantialize(this,arguments);
},java.lang,"Character",null,[java.io.Serializable,Comparable]);
Clazz.makeConstructor(c$,
function(value){
this.value=value;
},"~N");
Clazz.defineMethod(c$,"charValue",
function(){
return this.value;
});
Clazz.overrideMethod(c$,"hashCode",
function(){
return(this.value).charCodeAt(0);
});
Clazz.overrideMethod(c$,"equals",
function(obj){
if(Clazz.instanceOf(obj,Character)){
return(this.value).charCodeAt(0)==((obj).charValue()).charCodeAt(0);
}return false;
},"~O");
Clazz.overrideMethod(c$,"compareTo",
function(c){
return(this.value).charCodeAt(0)-(c.value).charCodeAt(0);
},"Character");
c$.toLowerCase=Clazz.defineMethod(c$,"toLowerCase",
function(c){
return(""+c).toLowerCase().charAt(0);
},"~N");
c$.toUpperCase=Clazz.defineMethod(c$,"toUpperCase",
function(c){
return(""+c).toUpperCase().charAt(0);
},"~N");
c$.isDigit=Clazz.defineMethod(c$,"isDigit",
function(c){
c = c.charCodeAt(0);
return (48 <= c && c <= 57);
},"~N");
c$.isUpperCase=Clazz.defineMethod(c$,"isUpperCase",
function(c){
c = c.charCodeAt(0);
return (65 <= c && c <= 90);
},"~N");
c$.isLowerCase=Clazz.defineMethod(c$,"isLowerCase",
function(c){
c = c.charCodeAt(0);
return (97 <= c && c <= 122);
},"~N");
c$.isWhitespace=Clazz.defineMethod(c$,"isWhitespace",
function(c){
c = (c).charCodeAt(0);
return (c >= 0x1c && c <= 0x20 || c >= 0x9 && c <= 0xd || c == 0x1680
	|| c >= 0x2000 && c != 0x2007 && (c <= 0x200b || c == 0x2028 || c == 0x2029 || c == 0x3000));
},"~N");
c$.isLetter=Clazz.defineMethod(c$,"isLetter",
function(c){
c = c.charCodeAt(0);
return (65 <= c && c <= 90 || 97 <= c && c <= 122);
},"~N");
c$.isLetterOrDigit=Clazz.defineMethod(c$,"isLetterOrDigit",
function(c){
c = c.charCodeAt(0);
return (65 <= c && c <= 90 || 97 <= c && c <= 122 || 48 <= c && c <= 57);
},"~N");
c$.isSpaceChar=Clazz.defineMethod(c$,"isSpaceChar",
function(c){
 var i = c.charCodeAt(0);
if(i==0x20||i==0xa0||i==0x1680)return true;
if(i<0x2000)return false;
return i<=0x200b||i==0x2028||i==0x2029||i==0x202f||i==0x3000;
},"~N");
c$.digit=Clazz.defineMethod(c$,"digit",
function(c,radix){
var i = c.charCodeAt(0);
if(radix >= 2 && radix <= 36){
	if(i < 128){
		var result = -1;
		if(48 <= i && i <= 57){
		result = i - 48;
		}else if(97 <= i && i <= 122){
		result = i - 87;
		}else if(65 <= i && i <= 90){
		result=i-(55);
		}
		return (result < radix ? result : -1);
	}
}
return -1;
},"~N,~N");
Clazz.overrideMethod(c$,"toString",
function(){
var buf=[this.value];
return String.valueOf(buf);
});
c$.toString=Clazz.overrideMethod(c$,"toString",
function(c){
{
if(this===Character){
return"class java.lang.Character";
}
}return String.valueOf(c);
},"~N");
Clazz.defineStatics(c$,
"MIN_VALUE",'\u0000',
"MAX_VALUE",'\uffff',
"MIN_RADIX",2,
"MAX_RADIX",36,
"TYPE",null);

java.lang.Character.TYPE=java.lang.Character.prototype.TYPE=java.lang.Character;



Clazz._ArrayWrapper = function(a, type) {
 return {
   a: a,
   __CLASS_NAME__:"Array",
   superClazz: Array,
   getComponentType: function() {return type},
   instanceOf: function(o) { return  Clazz.instanceOf(type, o) },
   getName: function() { return this.__CLASS_NAME__ }
 };
}
c$=Clazz_declareType(java.lang.reflect,"Array");
c$.newInstance=Clazz_defineMethod(c$,"newInstance",
function(componentType,size){
var a = Clazz_newArray(size);
 a.getClass = function() { return new Clazz._ArrayWrapper(this, componentType);};
return a;
},"Class,~N");

javautil.Date=Date;
Date.TYPE="javautil.Date";
Date.__CLASS_NAME__="Date";
Clazz.implementOf(Date,[java.io.Serializable,java.lang.Comparable]);

Clazz.defineMethod(javautil.Date,"clone",
function(){
return new Date(this.getTime());
});

Clazz.defineMethod(javautil.Date,"before",
function(when){
return this.getTime()<when.getTime();
},"javautil.Date");
Clazz.defineMethod(javautil.Date,"after",
function(when){
return this.getTime()>when.getTime();
},"javautil.Date");
Clazz.defineMethod(javautil.Date,"equals",
function(obj){
return Clazz.instanceOf(obj,javautil.Date)&&this.getTime()==(obj).getTime();
},"Object");
Clazz.defineMethod(javautil.Date,"compareTo",
function(anotherDate){
var thisTime=this.getTime();
var anotherTime=anotherDate.getTime();
return(thisTime<anotherTime?-1:(thisTime==anotherTime?0:1));
},"javautil.Date");
Clazz.defineMethod(javautil.Date,"compareTo",
function(o){
return this.compareTo(o);
},"Object");
Clazz.overrideMethod(javautil.Date,"hashCode",
function(){
var ht=this.getTime();
return parseInt(ht)^parseInt((ht>>32));
});

c$=Clazz.decorateAsClass(function(){
this.source=null;
Clazz.instantialize(this,arguments);
},javautil,"EventObject",null,java.io.Serializable);
Clazz.makeConstructor(c$,
function(source){
if(source!=null)this.source=source;
else throw new IllegalArgumentException();
},"~O");
Clazz.defineMethod(c$,"getSource",
function(){
return this.source;
});
Clazz.overrideMethod(c$,"toString",
function(){
return this.getClass().getName()+"[source="+String.valueOf(this.source)+']';
});
Clazz.declareInterface(javautil,"EventListener");

c$=Clazz.decorateAsClass(function(){
this.listener=null;
Clazz.instantialize(this,arguments);
},javautil,"EventListenerProxy",null,javautil.EventListener);
Clazz.makeConstructor(c$,
function(listener){
this.listener=listener;
},"javautil.EventListener");
Clazz.defineMethod(c$,"getListener",
function(){
return this.listener;
});
Clazz.declareInterface(javautil,"Iterator");

Clazz.declareInterface(javautil,"ListIterator",javautil.Iterator);
Clazz.declareInterface(javautil,"Enumeration");
Clazz.declareInterface(javautil,"Collection",Iterable);

Clazz.declareInterface(javautil,"Set",javautil.Collection);
Clazz.declareInterface(javautil,"Map");
Clazz.declareInterface(javautil.Map,"Entry");

Clazz.declareInterface(javautil,"List",javautil.Collection);

Clazz.declareInterface(javautil,"Queue",javautil.Collection);
Clazz.declareInterface(javautil,"RandomAccess");
c$=Clazz.decorateAsClass(function(){
this.detailMessage=null;
this.cause=null;
this.stackTrace=null;
Clazz.instantialize(this,arguments);
},java.lang,"Throwable",null,java.io.Serializable);
Clazz.prepareFields(c$,function(){
this.cause=this;
//alert("e0 "+ arguments.callee.caller.caller.caller.caller.caller)
});
Clazz.makeConstructor(c$,
function(){
this.fillInStackTrace();
});
Clazz.makeConstructor(c$,
function(message){
this.fillInStackTrace();
this.detailMessage=message;
},"~S");
Clazz.makeConstructor(c$,
function(message,cause){
this.fillInStackTrace();
this.detailMessage=message;
this.cause=cause;
},"~S,Throwable");
Clazz.makeConstructor(c$,
function(cause){
this.fillInStackTrace();
this.detailMessage=(cause==null?null:cause.toString());
this.cause=cause;
},"Throwable");
Clazz.defineMethod(c$,"getMessage",
function(){
return (this.message || this.detailMessage || this.toString());
});
Clazz.defineMethod(c$,"getLocalizedMessage",
function(){
return this.getMessage();
});
Clazz.defineMethod(c$,"getCause",
function(){
return(this.cause===this?null:this.cause);
});
Clazz.defineMethod(c$,"initCause",
function(cause){
if(this.cause!==this)throw new IllegalStateException("Can't overwrite cause");
if(cause===this)throw new IllegalArgumentException("Self-causation not permitted");
this.cause=cause;
return this;
},"Throwable");
Clazz.overrideMethod(c$,"toString",
function(){
var s=this.getClass().getName();
var message=this.message || this.detailMessage;
return(message ? s+": "+message : s);
});
Clazz.defineMethod(c$,"printStackTrace",
function(){
System.err.println(this.getStackTrace ? this.getStackTrace() : this.message + " " + Clazz.getStackTrace());
});

Clazz.defineMethod(c$,"getStackTrace",
function(){
var s = "" + this + "\n";
for(var i=0;i<this.stackTrace.length;i++){
 var t=this.stackTrace[i];
	var x=t.methodName.indexOf("(");
	var n=t.methodName.substring(0,x).replace(/\s+/g,"");
	if(n!="construct"||t.nativeClazz==null
		 ||Clazz.getInheritedLevel(t.nativeClazz,Throwable)<0){
				s += t + "\n";
	}
}
return s;
});


Clazz.defineMethod(c$,"printStackTrace",
function(s){
this.printStackTrace();
},"java.io.PrintStream");
Clazz.defineMethod(c$,"printStackTrace",
function(s){
this.printStackTrace();
},"java.io.PrintWriter");
Clazz.defineMethod(c$,"fillInStackTrace",
function(){
this.stackTrace=new Array();
var caller=arguments.callee.caller;
var superCaller=null;
var callerList=new Array();
var index=Clazz._callingStackTraces.length-1;
var noLooping=true;
while(index>-1||caller!=null){
var clazzName=null;
var nativeClass=null;
if(!noLooping||caller==Clazz.tryToSearchAndExecute||caller==Clazz.superCall||caller==null){
if(index<0){
break;
}
noLooping=true;
superCaller=Clazz._callingStackTraces[index].caller;
nativeClass=Clazz._callingStackTraces[index].owner;
index--;
}else{
superCaller=caller;
if(superCaller.claxxOwner!=null){
nativeClass=superCaller.claxxOwner;
}else if(superCaller.exClazz!=null){
nativeClass=superCaller.exClazz;
}
}
var st=new StackTraceElement(
((nativeClass!=null&&nativeClass.__CLASS_NAME__.length!=0)?
nativeClass.__CLASS_NAME__:"anonymous"),
((superCaller.exName==null)?"anonymous":superCaller.exName)
+" ("+Clazz.getParamsType(superCaller.arguments)+")",
null,-1);
st.nativeClazz=nativeClass;
this.stackTrace[this.stackTrace.length]=st;
for(var i=0;i<callerList.length;i++){
if(callerList[i]==superCaller){

var st=new StackTraceElement("lost","missing",null,-3);
st.nativeClazz=null;
this.stackTrace[this.stackTrace.length]=st;
noLooping=false;

}
}
if(superCaller!=null){
callerList[callerList.length]=superCaller;
}
caller=superCaller.arguments.callee.caller;
}
Clazz._initializingException=false;
return this;
});
Clazz.defineMethod(c$,"setStackTrace",
function(stackTrace){
var defensiveCopy=stackTrace.clone();
for(var i=0;i<defensiveCopy.length;i++)if(defensiveCopy[i]==null)throw new NullPointerException("stackTrace["+i+"]");

this.stackTrace=defensiveCopy;
},"~A");

c$=Clazz.decorateAsClass(function(){
this.declaringClass=null;
this.methodName=null;
this.fileName=null;
this.lineNumber=0;
Clazz.instantialize(this,arguments);
},java.lang,"StackTraceElement",null,java.io.Serializable);
Clazz.makeConstructor(c$,
function(cls,method,file,line){
if(cls==null||method==null){
throw new NullPointerException();
}this.declaringClass=cls;
this.methodName=method;
this.fileName=file;
this.lineNumber=line;
},"~S,~S,~S,~N");
Clazz.overrideMethod(c$,"equals",
function(obj){
if(!(Clazz.instanceOf(obj,StackTraceElement))){
return false;
}var castObj=obj;
if((this.methodName==null)||(castObj.methodName==null)){
return false;
}if(!this.getMethodName().equals(castObj.getMethodName())){
return false;
}if(!this.getClassName().equals(castObj.getClassName())){
return false;
}var localFileName=this.getFileName();
if(localFileName==null){
if(castObj.getFileName()!=null){
return false;
}}else{
if(!localFileName.equals(castObj.getFileName())){
return false;
}}if(this.getLineNumber()!=castObj.getLineNumber()){
return false;
}return true;
},"~O");
Clazz.defineMethod(c$,"getClassName",
function(){
return(this.declaringClass==null)?"<unknown class>":this.declaringClass;
});
Clazz.defineMethod(c$,"getFileName",
function(){
return this.fileName;
});
Clazz.defineMethod(c$,"getLineNumber",
function(){
return this.lineNumber;
});
Clazz.defineMethod(c$,"getMethodName",
function(){
return(this.methodName==null)?"<unknown method>":this.methodName;
});
Clazz.overrideMethod(c$,"hashCode",
function(){
if(this.methodName==null){
return 0;
}return this.methodName.hashCode()^this.declaringClass.hashCode();
});
Clazz.defineMethod(c$,"isNativeMethod",
function(){
return this.lineNumber==-2;
});
Clazz.overrideMethod(c$,"toString",
function(){
var buf=new StringBuilder(80);
buf.append(this.getClassName());
buf.append('.');
buf.append(this.getMethodName());
if(this.isNativeMethod()){
buf.append("(Native Method)");
}else{
var fName=this.getFileName();
if(fName==null){
buf.append("(Unknown Source)");
}else{
var lineNum=this.getLineNumber();
buf.append('(');
buf.append(fName);
if(lineNum>=0){
buf.append(':');
buf.append(lineNum);
}buf.append(')');
}}return buf.toString();
});
TypeError.prototype.getMessage || (TypeError.prototype.getMessage = function(){ return (this.message || this.toString()) + (this.getStackTrace ? this.getStackTrace() : Clazz.getStackTrace())});


Clazz.Error = Error;

Clazz.declareTypeError = function (prefix, name, clazzParent, interfacez, 
		parentClazzInstance, _declareType) {
	var f = function () {
		Clazz.instantialize (this, arguments);
    return Clazz.Error();
	};
	return Clazz.decorateAsClass (f, prefix, name, clazzParent, interfacez, 
			parentClazzInstance);
};

// at least allow Error() by itself to work as before
Clazz._Error || (Clazz._Error = Error);
Clazz.decorateAsClass (function (){Clazz.instantialize(this, arguments);return Clazz._Error();}, java.lang, "Error", Throwable);

//c$=Clazz.declareTypeError(java.lang,"Error",Throwable);


c$=Clazz.declareType(java.lang,"LinkageError",Error);

c$=Clazz.declareType(java.lang,"IncompatibleClassChangeError",LinkageError);

c$=Clazz.declareType(java.lang,"AbstractMethodError",IncompatibleClassChangeError);

c$=Clazz.declareType(java.lang,"AssertionError",Error);
Clazz.makeConstructor(c$,
function(detailMessage){
Clazz.superConstructor(this,AssertionError,[String.valueOf(detailMessage),(Clazz.instanceOf(detailMessage,Throwable)?detailMessage:null)]);
},"~O");
Clazz.makeConstructor(c$,
function(detailMessage){
this.construct("" + detailMessage);
},"~B");
Clazz.makeConstructor(c$,
function(detailMessage){
this.construct("" + detailMessage);
},"~N");

c$=Clazz.declareType(java.lang,"ClassCircularityError",LinkageError);

c$=Clazz.declareType(java.lang,"ClassFormatError",LinkageError);

c$=Clazz.decorateAsClass(function(){
this.exception=null;
Clazz.instantialize(this,arguments);
},java.lang,"ExceptionInInitializerError",LinkageError);
Clazz.makeConstructor(c$,
function(){
Clazz.superConstructor(this,ExceptionInInitializerError);
this.initCause(null);
});
Clazz.makeConstructor(c$,
function(detailMessage){
Clazz.superConstructor(this,ExceptionInInitializerError,[detailMessage]);
this.initCause(null);
},"~S");
Clazz.makeConstructor(c$,
function(exception){
Clazz.superConstructor(this,ExceptionInInitializerError);
this.exception=exception;
this.initCause(exception);
},"Throwable");
Clazz.defineMethod(c$,"getException",
function(){
return this.exception;
});
Clazz.overrideMethod(c$,"getCause",
function(){
return this.exception;
});

c$=Clazz.declareType(java.lang,"IllegalAccessError",IncompatibleClassChangeError);

c$=Clazz.declareType(java.lang,"InstantiationError",IncompatibleClassChangeError);

c$=Clazz.declareType(java.lang,"VirtualMachineError",Error);

c$=Clazz.declareType(java.lang,"InternalError",VirtualMachineError);

c$=Clazz.declareType(java.lang,"NoClassDefFoundError",LinkageError);

c$=Clazz.declareType(java.lang,"NoSuchFieldError",IncompatibleClassChangeError);

c$=Clazz.declareType(java.lang,"NoSuchMethodError",IncompatibleClassChangeError);

c$=Clazz.declareType(java.lang,"OutOfMemoryError",VirtualMachineError);

c$=Clazz.declareType(java.lang,"StackOverflowError",VirtualMachineError);

c$=Clazz.declareType(java.lang,"UnknownError",VirtualMachineError);

c$=Clazz.declareType(java.lang,"UnsatisfiedLinkError",LinkageError);

c$=Clazz.declareType(java.lang,"UnsupportedClassVersionError",ClassFormatError);

c$=Clazz.declareType(java.lang,"VerifyError",LinkageError);

c$=Clazz.declareType(java.lang,"ThreadDeath",Error);
Clazz.makeConstructor(c$,
function(){
Clazz.superConstructor(this,ThreadDeath,[]);
});

c$=Clazz.declareType(java.lang,"Exception",Throwable);

c$=Clazz.declareType(java.lang,"RuntimeException",Exception);

c$=Clazz.declareType(java.lang,"ArithmeticException",RuntimeException);

c$=Clazz.declareType(java.lang,"IndexOutOfBoundsException",RuntimeException);

c$=Clazz.declareType(java.lang,"ArrayIndexOutOfBoundsException",IndexOutOfBoundsException);
Clazz.makeConstructor(c$,
function(index){
Clazz.superConstructor(this,ArrayIndexOutOfBoundsException,["Array index out of range: "+index]);
},"~N");

c$=Clazz.declareType(java.lang,"ArrayStoreException",RuntimeException);

c$=Clazz.declareType(java.lang,"ClassCastException",RuntimeException);

c$=Clazz.decorateAsClass(function(){
this.ex=null;
Clazz.instantialize(this,arguments);
},java.lang,"ClassNotFoundException",Exception);
Clazz.makeConstructor(c$,
function(){
Clazz.superConstructor(this,ClassNotFoundException,[Clazz.castNullAs("Throwable")]);
});
Clazz.makeConstructor(c$,
function(detailMessage){
Clazz.superConstructor(this,ClassNotFoundException,[detailMessage,null]);
},"~S");
Clazz.makeConstructor(c$,
function(detailMessage,exception){
Clazz.superConstructor(this,ClassNotFoundException,[detailMessage]);
this.ex=exception;
},"~S,Throwable");
Clazz.defineMethod(c$,"getException",
function(){
return this.ex;
});
Clazz.overrideMethod(c$,"getCause",
function(){
return this.ex;
});

c$=Clazz.declareType(java.lang,"CloneNotSupportedException",Exception);

c$=Clazz.declareType(java.lang,"IllegalAccessException",Exception);

c$=Clazz.declareType(java.lang,"IllegalArgumentException",RuntimeException);
Clazz.makeConstructor(c$,
function(cause){
Clazz.superConstructor(this,IllegalArgumentException,[(cause==null?null:cause.toString()),cause]);
},"Throwable");

c$=Clazz.declareType(java.lang,"IllegalMonitorStateException",RuntimeException);

c$=Clazz.declareType(java.lang,"IllegalStateException",RuntimeException);
Clazz.makeConstructor(c$,
function(cause){
Clazz.superConstructor(this,IllegalStateException,[(cause==null?null:cause.toString()),cause]);
},"Throwable");

c$=Clazz.declareType(java.lang,"IllegalThreadStateException",IllegalArgumentException);

c$=Clazz.declareType(java.lang,"InstantiationException",Exception);

c$=Clazz.declareType(java.lang,"InterruptedException",Exception);

c$=Clazz.declareType(java.lang,"NegativeArraySizeException",RuntimeException);

c$=Clazz.declareType(java.lang,"NoSuchFieldException",Exception);

c$=Clazz.declareType(java.lang,"NoSuchMethodException",Exception);

c$=Clazz.declareType(java.lang,"NullPointerException",RuntimeException);

c$=Clazz.declareType(java.lang,"NumberFormatException",IllegalArgumentException);

c$=Clazz.declareType(java.lang,"SecurityException",RuntimeException);
Clazz.makeConstructor(c$,
function(cause){
Clazz.superConstructor(this,SecurityException,[(cause==null?null:cause.toString()),cause]);
},"Throwable");

c$=Clazz.declareType(java.lang,"StringIndexOutOfBoundsException",IndexOutOfBoundsException);
Clazz.makeConstructor(c$,
function(index){
Clazz.superConstructor(this,StringIndexOutOfBoundsException,["String index out of range: "+index]);
},"~N");

c$=Clazz.declareType(java.lang,"UnsupportedOperationException",RuntimeException);
Clazz.makeConstructor(c$,
function(){
Clazz.superConstructor(this,UnsupportedOperationException,[]);
});
Clazz.makeConstructor(c$,
function(cause){
Clazz.superConstructor(this,UnsupportedOperationException,[(cause==null?null:cause.toString()),cause]);
},"Throwable");

c$=Clazz.decorateAsClass(function(){
this.target=null;
Clazz.instantialize(this,arguments);
},java.lang.reflect,"InvocationTargetException",Exception);
Clazz.makeConstructor(c$,
function(){
Clazz.superConstructor(this,java.lang.reflect.InvocationTargetException,[Clazz.castNullAs("Throwable")]);
});
Clazz.makeConstructor(c$,
function(exception){
Clazz.superConstructor(this,java.lang.reflect.InvocationTargetException,[null,exception]);
this.target=exception;
},"Throwable");
Clazz.makeConstructor(c$,
function(exception,detailMessage){
Clazz.superConstructor(this,java.lang.reflect.InvocationTargetException,[detailMessage,exception]);
this.target=exception;
},"Throwable,~S");
Clazz.defineMethod(c$,"getTargetException",
function(){
return this.target;
});
Clazz.overrideMethod(c$,"getCause",
function(){
return this.target;
});

c$=Clazz.decorateAsClass(function(){
this.undeclaredThrowable=null;
Clazz.instantialize(this,arguments);
},java.lang.reflect,"UndeclaredThrowableException",RuntimeException);
Clazz.makeConstructor(c$,
function(exception){
Clazz.superConstructor(this,java.lang.reflect.UndeclaredThrowableException);
this.undeclaredThrowable=exception;
this.initCause(exception);
},"Throwable");
Clazz.makeConstructor(c$,
function(exception,detailMessage){
Clazz.superConstructor(this,java.lang.reflect.UndeclaredThrowableException,[detailMessage]);
this.undeclaredThrowable=exception;
this.initCause(exception);
},"Throwable,~S");
Clazz.defineMethod(c$,"getUndeclaredThrowable",
function(){
return this.undeclaredThrowable;
});
Clazz.overrideMethod(c$,"getCause",
function(){
return this.undeclaredThrowable;
});

c$=Clazz.declareType(java.io,"IOException",Exception);


c$=Clazz.declareType(java.io,"CharConversionException",java.io.IOException);

c$=Clazz.declareType(java.io,"EOFException",java.io.IOException);

c$=Clazz.declareType(java.io,"FileNotFoundException",java.io.IOException);

c$=Clazz.decorateAsClass(function(){
this.bytesTransferred=0;
Clazz.instantialize(this,arguments);
},java.io,"InterruptedIOException",java.io.IOException);

c$=Clazz.declareType(java.io,"ObjectStreamException",java.io.IOException);

c$=Clazz.decorateAsClass(function(){
this.classname=null;
Clazz.instantialize(this,arguments);
},java.io,"InvalidClassException",java.io.ObjectStreamException);
Clazz.makeConstructor(c$,
function(className,detailMessage){
Clazz.superConstructor(this,java.io.InvalidClassException,[detailMessage]);
this.classname=className;
},"~S,~S");
Clazz.defineMethod(c$,"getMessage",
function(){
var msg=Clazz.superCall(this,java.io.InvalidClassException,"getMessage",[]);
if(this.classname!=null){
msg=this.classname+';' + ' '+msg;
}return msg;
});

c$=Clazz.declareType(java.io,"InvalidObjectException",java.io.ObjectStreamException);

c$=Clazz.declareType(java.io,"NotActiveException",java.io.ObjectStreamException);

c$=Clazz.declareType(java.io,"NotSerializableException",java.io.ObjectStreamException);

c$=Clazz.decorateAsClass(function(){
this.eof=false;
this.length=0;
Clazz.instantialize(this,arguments);
},java.io,"OptionalDataException",java.io.ObjectStreamException);

c$=Clazz.declareType(java.io,"StreamCorruptedException",java.io.ObjectStreamException);

c$=Clazz.declareType(java.io,"SyncFailedException",java.io.IOException);

c$=Clazz.declareType(java.io,"UnsupportedEncodingException",java.io.IOException);

c$=Clazz.declareType(java.io,"UTFDataFormatException",java.io.IOException);

c$=Clazz.decorateAsClass(function(){
this.detail=null;
Clazz.instantialize(this,arguments);
},java.io,"WriteAbortedException",java.io.ObjectStreamException);
Clazz.makeConstructor(c$,
function(detailMessage,rootCause){
Clazz.superConstructor(this,java.io.WriteAbortedException,[detailMessage]);
this.detail=rootCause;
this.initCause(rootCause);
},"~S,Exception");
Clazz.defineMethod(c$,"getMessage",
function(){
var msg=Clazz.superCall(this,java.io.WriteAbortedException,"getMessage",[]);
return (this.detail ? msg + "; "+this.detail.toString() : msg);
});
Clazz.overrideMethod(c$,"getCause",
function(){
return this.detail;
});

c$=Clazz.declareType(javautil,"ConcurrentModificationException",RuntimeException);
Clazz.makeConstructor(c$,
function(){
Clazz.superConstructor(this,javautil.ConcurrentModificationException,[]);
});

c$=Clazz.declareType(javautil,"EmptyStackException",RuntimeException);

c$=Clazz.decorateAsClass(function(){
this.className=null;
this.key=null;
Clazz.instantialize(this,arguments);
},javautil,"MissingResourceException",RuntimeException);
Clazz.makeConstructor(c$,
function(detailMessage,className,resourceName){
Clazz.superConstructor(this,javautil.MissingResourceException,[detailMessage]);
this.className=className;
this.key=resourceName;
},"~S,~S,~S");
Clazz.defineMethod(c$,"getClassName",
function(){
return this.className;
});
Clazz.defineMethod(c$,"getKey",
function(){
return this.key;
});

c$=Clazz.declareType(javautil,"NoSuchElementException",RuntimeException);

c$=Clazz.declareType(javautil,"TooManyListenersException",Exception);

c$=Clazz.declareType(java.lang,"Void");
Clazz.defineStatics(c$,
"TYPE",null);
{
java.lang.Void.TYPE=java.lang.Void;
}Clazz.declareInterface(java.lang.reflect,"GenericDeclaration");
Clazz.declareInterface(java.lang.reflect,"AnnotatedElement");

c$=Clazz.declareType(java.lang.reflect,"AccessibleObject",null,java.lang.reflect.AnnotatedElement);
Clazz.makeConstructor(c$,
function(){
});
Clazz.defineMethod(c$,"isAccessible",
function(){
return false;
});
c$.setAccessible=Clazz.defineMethod(c$,"setAccessible",
function(objects,flag){
return;
},"~A,~B");
Clazz.defineMethod(c$,"setAccessible",
function(flag){
return;
},"~B");
Clazz.overrideMethod(c$,"isAnnotationPresent",
function(annotationType){
return false;
},"Class");
Clazz.overrideMethod(c$,"getDeclaredAnnotations",
function(){
return new Array(0);
});
Clazz.overrideMethod(c$,"getAnnotations",
function(){
return new Array(0);
});
Clazz.overrideMethod(c$,"getAnnotation",
function(annotationType){
return null;
},"Class");
c$.marshallArguments=Clazz.defineMethod(c$,"marshallArguments",
function(parameterTypes,args){
return null;
},"~A,~A");
Clazz.defineMethod(c$,"invokeV",
function(receiver,args){
return;
},"~O,~A");
Clazz.defineMethod(c$,"invokeL",
function(receiver,args){
return null;
},"~O,~A");
Clazz.defineMethod(c$,"invokeI",
function(receiver,args){
return 0;
},"~O,~A");
Clazz.defineMethod(c$,"invokeJ",
function(receiver,args){
return 0;
},"~O,~A");
Clazz.defineMethod(c$,"invokeF",
function(receiver,args){
return 0.0;
},"~O,~A");
Clazz.defineMethod(c$,"invokeD",
function(receiver,args){
return 0.0;
},"~O,~A");
c$.emptyArgs=c$.prototype.emptyArgs=new Array(0);
Clazz.declareInterface(java.lang.reflect,"InvocationHandler");
c$=Clazz.declareInterface(java.lang.reflect,"Member");
Clazz.defineStatics(c$,
"PUBLIC",0,
"DECLARED",1);

c$=Clazz.declareType(java.lang.reflect,"Modifier");
Clazz.makeConstructor(c$,
function(){
});
c$.isAbstract=Clazz.defineMethod(c$,"isAbstract",
function(modifiers){
return((modifiers&1024)!=0);
},"~N");
c$.isFinal=Clazz.defineMethod(c$,"isFinal",
function(modifiers){
return((modifiers&16)!=0);
},"~N");
c$.isInterface=Clazz.defineMethod(c$,"isInterface",
function(modifiers){
return((modifiers&512)!=0);
},"~N");
c$.isNative=Clazz.defineMethod(c$,"isNative",
function(modifiers){
return((modifiers&256)!=0);
},"~N");
c$.isPrivate=Clazz.defineMethod(c$,"isPrivate",
function(modifiers){
return((modifiers&2)!=0);
},"~N");
c$.isProtected=Clazz.defineMethod(c$,"isProtected",
function(modifiers){
return((modifiers&4)!=0);
},"~N");
c$.isPublic=Clazz.defineMethod(c$,"isPublic",
function(modifiers){
return((modifiers&1)!=0);
},"~N");
c$.isStatic=Clazz.defineMethod(c$,"isStatic",
function(modifiers){
return((modifiers&8)!=0);
},"~N");
c$.isStrict=Clazz.defineMethod(c$,"isStrict",
function(modifiers){
return((modifiers&2048)!=0);
},"~N");
c$.isSynchronized=Clazz.defineMethod(c$,"isSynchronized",
function(modifiers){
return((modifiers&32)!=0);
},"~N");
c$.isTransient=Clazz.defineMethod(c$,"isTransient",
function(modifiers){
return((modifiers&128)!=0);
},"~N");
c$.isVolatile=Clazz.defineMethod(c$,"isVolatile",
function(modifiers){
return((modifiers&64)!=0);
},"~N");
c$.toString=Clazz.defineMethod(c$,"toString",
function(modifiers){
var sb=new Array(0);
if(java.lang.reflect.Modifier.isPublic(modifiers))sb[sb.length]="public";
if(java.lang.reflect.Modifier.isProtected(modifiers))sb[sb.length]="protected";
if(java.lang.reflect.Modifier.isPrivate(modifiers))sb[sb.length]="private";
if(java.lang.reflect.Modifier.isAbstract(modifiers))sb[sb.length]="abstract";
if(java.lang.reflect.Modifier.isStatic(modifiers))sb[sb.length]="static";
if(java.lang.reflect.Modifier.isFinal(modifiers))sb[sb.length]="final";
if(java.lang.reflect.Modifier.isTransient(modifiers))sb[sb.length]="transient";
if(java.lang.reflect.Modifier.isVolatile(modifiers))sb[sb.length]="volatile";
if(java.lang.reflect.Modifier.isSynchronized(modifiers))sb[sb.length]="synchronized";
if(java.lang.reflect.Modifier.isNative(modifiers))sb[sb.length]="native";
if(java.lang.reflect.Modifier.isStrict(modifiers))sb[sb.length]="strictfp";
if(java.lang.reflect.Modifier.isInterface(modifiers))sb[sb.length]="interface";
if(sb.length>0){
return sb.join(" ");
}return"";
},"~N");
Clazz.defineStatics(c$,
"PUBLIC",0x1,
"PRIVATE",0x2,
"PROTECTED",0x4,
"STATIC",0x8,
"FINAL",0x10,
"SYNCHRONIZED",0x20,
"VOLATILE",0x40,
"TRANSIENT",0x80,
"NATIVE",0x100,
"INTERFACE",0x200,
"ABSTRACT",0x400,
"STRICT",0x800,
"BRIDGE",0x40,
"VARARGS",0x80,
"SYNTHETIC",0x1000,
"ANNOTATION",0x2000,
"ENUM",0x4000);

c$=Clazz.decorateAsClass(function(){
this.clazz=null;
this.parameterTypes=null;
this.exceptionTypes=null;
this.modifiers=0;
Clazz.instantialize(this,arguments);
},java.lang.reflect,"Constructor",java.lang.reflect.AccessibleObject,[java.lang.reflect.GenericDeclaration,java.lang.reflect.Member]);
Clazz.makeConstructor(c$,
function(declaringClass,parameterTypes,checkedExceptions,modifiers){
Clazz.superConstructor(this,java.lang.reflect.Constructor,[]);
this.clazz=declaringClass;
this.parameterTypes=parameterTypes;
this.exceptionTypes=checkedExceptions;
this.modifiers=modifiers;
},"Class,~A,~A,~N");
Clazz.overrideMethod(c$,"getTypeParameters",
function(){
return null;
});
Clazz.defineMethod(c$,"toGenericString",
function(){
return null;
});
Clazz.defineMethod(c$,"getGenericParameterTypes",
function(){
return null;
});
Clazz.defineMethod(c$,"getGenericExceptionTypes",
function(){
return null;
});
Clazz.defineMethod(c$,"getParameterAnnotations",
function(){
return null;
});
Clazz.defineMethod(c$,"isVarArgs",
function(){
return false;
});
Clazz.overrideMethod(c$,"isSynthetic",
function(){
return false;
});
Clazz.overrideMethod(c$,"equals",
function(object){
if(object!=null&&Clazz.instanceOf(object,java.lang.reflect.Constructor)){
var other=object;
if(this.getDeclaringClass()===other.getDeclaringClass()){
var params1=this.parameterTypes;
var params2=other.parameterTypes;
if(params1.length==params2.length){
for(var i=0;i<params1.length;i++){
if(params1[i]!==params2[i])return false;
}
return true;
}}}return false;
},"~O");
Clazz.overrideMethod(c$,"getDeclaringClass",
function(){
return this.clazz;
});
Clazz.defineMethod(c$,"getExceptionTypes",
function(){
return this.exceptionTypes;
});
Clazz.overrideMethod(c$,"getModifiers",
function(){
return this.modifiers;
});
Clazz.overrideMethod(c$,"getName",
function(){
return this.getDeclaringClass().getName();
});
Clazz.defineMethod(c$,"getParameterTypes",
function(){
return this.parameterTypes;
});
Clazz.overrideMethod(c$,"hashCode",
function(){
return this.getDeclaringClass().getName().hashCode();
});
Clazz.defineMethod(c$,"newInstance",
function(args){
var instance=new this.clazz(Clazz.inheritArgs);
Clazz.instantialize(instance,args);
return instance;
},"~A");
Clazz.overrideMethod(c$,"toString",
function(){
return null;
});

c$=Clazz.declareType(java.lang.reflect,"Field",java.lang.reflect.AccessibleObject,java.lang.reflect.Member);
Clazz.overrideMethod(c$,"isSynthetic",
function(){
return false;
});
Clazz.defineMethod(c$,"toGenericString",
function(){
return null;
});
Clazz.defineMethod(c$,"isEnumConstant",
function(){
return false;
});
Clazz.defineMethod(c$,"getGenericType",
function(){
return null;
});
Clazz.overrideMethod(c$,"equals",
function(object){
return false;
},"~O");
Clazz.overrideMethod(c$,"getDeclaringClass",
function(){
return null;
});
Clazz.overrideMethod(c$,"getName",
function(){
return null;
});
Clazz.defineMethod(c$,"getType",
function(){
return null;
});
Clazz.overrideMethod(c$,"hashCode",
function(){
return 0;
});
Clazz.overrideMethod(c$,"toString",
function(){
return null;
});

c$=Clazz.decorateAsClass(function(){
this.clazz=null;
this.name=null;
this.returnType=null;
this.parameterTypes=null;
this.exceptionTypes=null;
this.modifiers=0;
Clazz.instantialize(this,arguments);
},java.lang.reflect,"Method",java.lang.reflect.AccessibleObject,[java.lang.reflect.GenericDeclaration,java.lang.reflect.Member]);
Clazz.makeConstructor(c$,
function(declaringClass,name,parameterTypes,returnType,checkedExceptions,modifiers){
Clazz.superConstructor(this,java.lang.reflect.Method,[]);
this.clazz=declaringClass;
this.name=name;
this.parameterTypes=parameterTypes;
this.returnType=returnType;
this.exceptionTypes=checkedExceptions;
this.modifiers=modifiers;
},"Class,~S,~A,Class,~A,~N");
Clazz.overrideMethod(c$,"getTypeParameters",
function(){
return null;
});
Clazz.defineMethod(c$,"toGenericString",
function(){
return null;
});
Clazz.defineMethod(c$,"getGenericParameterTypes",
function(){
return null;
});
Clazz.defineMethod(c$,"getGenericExceptionTypes",
function(){
return null;
});
Clazz.defineMethod(c$,"getGenericReturnType",
function(){
return null;
});
Clazz.defineMethod(c$,"getParameterAnnotations",
function(){
return null;
});
Clazz.defineMethod(c$,"isVarArgs",
function(){
return false;
});
Clazz.defineMethod(c$,"isBridge",
function(){
return false;
});
Clazz.overrideMethod(c$,"isSynthetic",
function(){
return false;
});
Clazz.defineMethod(c$,"getDefaultValue",
function(){
return null;
});
Clazz.overrideMethod(c$,"equals",
function(object){
if(object!=null&&Clazz.instanceOf(object,java.lang.reflect.Method)){
var other=object;
if((this.getDeclaringClass()===other.getDeclaringClass())&&(this.getName()===other.getName())){
var params1=this.parameterTypes;
var params2=other.parameterTypes;
if(params1.length==params2.length){
for(var i=0;i<params1.length;i++){
if(params1[i]!==params2[i])return false;
}
return true;
}}}return false;
},"~O");
Clazz.overrideMethod(c$,"getDeclaringClass",
function(){
return this.clazz;
});
Clazz.defineMethod(c$,"getExceptionTypes",
function(){
return this.exceptionTypes;
});
Clazz.overrideMethod(c$,"getModifiers",
function(){
return this.modifiers;
});
Clazz.overrideMethod(c$,"getName",
function(){
return this.name;
});
Clazz.defineMethod(c$,"getParameterTypes",
function(){
return this.parameterTypes; 
});
Clazz.defineMethod(c$,"getReturnType",
function(){
return this.returnType;
});
Clazz.overrideMethod(c$,"hashCode",
function(){
return this.getDeclaringClass().getName().hashCode()^this.getName().hashCode();
});
Clazz.defineMethod(c$,"invoke",
function(receiver,args){
var m=this.clazz.prototype[this.getName()];
if(m==null){
m=this.clazz[this.getName()];
}
if(m!=null){
m.apply(receiver,args);
}else{

}
},"~O,~A");
Clazz.overrideMethod(c$,"toString",
function(){
return null;
});

})(Clazz);
