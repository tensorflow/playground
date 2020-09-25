(function(Clazz
,Clazz_getClassName
,Clazz_newLongArray
,Clazz_doubleToByte
,Clazz_doubleToInt
,Clazz_doubleToLong
,Clazz_declarePackage
,Clazz_instanceOf
,Clazz_load
,Clazz_instantialize
,Clazz_decorateAsClass
,Clazz_floatToInt
,Clazz_floatToLong
,Clazz_makeConstructor
,Clazz_defineEnumConstant
,Clazz_exceptionOf
,Clazz_newIntArray
,Clazz_defineStatics
,Clazz_newFloatArray
,Clazz_declareType
,Clazz_prepareFields
,Clazz_superConstructor
,Clazz_newByteArray
,Clazz_declareInterface
,Clazz_p0p
,Clazz_pu$h
,Clazz_newShortArray
,Clazz_innerTypeInstance
,Clazz_isClassDefined
,Clazz_prepareCallback
,Clazz_newArray
,Clazz_castNullAs
,Clazz_floatToShort
,Clazz_superCall
,Clazz_decorateAsType
,Clazz_newBooleanArray
,Clazz_newCharArray
,Clazz_implementOf
,Clazz_newDoubleArray
,Clazz_overrideConstructor
,Clazz_clone
,Clazz_doubleToShort
,Clazz_getInheritedLevel
,Clazz_getParamsType
,Clazz_isAF
,Clazz_isAB
,Clazz_isAI
,Clazz_isAS
,Clazz_isASS
,Clazz_isAP
,Clazz_isAFloat
,Clazz_isAII
,Clazz_isAFF
,Clazz_isAFFF
,Clazz_tryToSearchAndExecute
,Clazz_getStackTrace
,Clazz_inheritArgs
,Clazz_alert
,Clazz_defineMethod
,Clazz_overrideMethod
,Clazz_declareAnonymous
//,Clazz_checkPrivateMethod
,Clazz_cloneFinals
){
var $t$;
//var c$;
Jmol.___JmolDate="$Date: 2020-09-22 08:42:29 -0500 (Tue, 22 Sep 2020) $"
Jmol.___fullJmolProperties="src/org/jmol/viewer/Jmol.properties"
Jmol.___JmolVersion="14.31.7"
// JSmolJavaExt.js
 

// This library will be wrapped by an additional anonymous function using ANT in 
// build_03_tojs.xml. This task will also modify variable names. References 
// to Clazz._ will not be changed, but other Clazz_xxx will be changed to 
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
// BH 11/4/2013 7:34:26 AM changing "var nativeClazz" to "var nativeClass" to avoid ANT replacement of "nativeClazz_" to "nativeClazz_"
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
// BH 1/7/2013 7:40:06 AM added Clazz_dateToString

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
Clazz_implementOf(Number,java.io.Serializable);
Number.equals=Clazz._innerFunctions.equals;
Number.getName=Clazz._innerFunctions.getName;
Number.prototype.compareTo = function(x) { var a = this.value, b = x.value; return (a < b ? -1 : a == b ? 0 : 1) };

Clazz_defineMethod(Number,"shortValue",
function(){
var x = Math.round(this)&0xffff;
return (this < 0 && x > 0 ? x - 0x10000 : x);
});

Clazz_defineMethod(Number,"byteValue",
function(){
var x = Math.round(this)&0xff;
return (this < 0 && x > 0 ? x - 0x100 : x);
});

Clazz_defineMethod(Number,"intValue",
function(){
return Math.round(this)&0xffffffff;
});

Clazz_defineMethod(Number,"longValue",
function(){
return Math.round(this);
});

Clazz_defineMethod(Number,"floatValue",
function(){
return this.valueOf();
});
Clazz_defineMethod(Number,"doubleValue",
function(){
return parseFloat(this.valueOf());
});

Clazz_overrideMethod(Number,"hashCode",
function(){
return this.valueOf();
});

java.lang.Integer=Integer=function(){
Clazz_instantialize(this,arguments);
};
Clazz_decorateAsType(Integer,"Integer",Number,Comparable,null,true);
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

Clazz_makeConstructor(Integer,
function(){
this.valueOf=function(){
return 0;
};
});
*/


Clazz_overrideConstructor(Integer, function(v){
 v == null && (v = 0);
 if (typeof v != "number")
	v = Integer.parseIntRadix(v, 10);
 this.valueOf=function(){return v;};
}); //BH
/*
Clazz_makeConstructor(Integer,
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


Integer.compare = Clazz_defineMethod(Integer,"compare",
function(i,j) {
  return (i < j ? -1 : i > j ? 1 : 0);
},"Number,Number");

Clazz_defineMethod(Integer,"bitCount",
function(i) {
	i = i - ((i >>> 1) & 0x55555555);
	i = (i & 0x33333333) + ((i >>> 2) & 0x33333333);
	i = (i + (i >>> 4)) & 0x0f0f0f0f;
	i = i + (i >>> 8);
	i = i + (i >>> 16);
	return i & 0x3f;
},"Number");
Integer.bitCount=Integer.prototype.bitCount;

Clazz_defineMethod(Integer,"numberOfLeadingZeros",
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

Clazz_defineMethod(Integer,"numberOfTrailingZeros",
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

Clazz_defineMethod(Integer,"parseIntRadix",
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

Clazz_defineMethod(Integer,"parseInt",
function(s){
return Integer.parseIntRadix(s,10);
},"String");
Integer.parseInt=Integer.prototype.parseInt;

/*
Clazz_defineMethod(Integer,"$valueOf",
function(s){
return new Integer(Integer.parseIntRadix(s,10));
},"String");
*/

Clazz_overrideMethod(Integer,"$valueOf",
function(s){
return new Integer(s);
});

/*
Clazz_defineMethod(Integer,"$valueOf",
function(s,r){
return new Integer(Integer.parseIntRadix(s,r));
},"String, Number");
*/

Integer.$valueOf=Integer.prototype.$valueOf;


Clazz_overrideMethod(Integer,"equals",
function(s){
if(s==null||!Clazz_instanceOf(s,Integer)){
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

Integer.decodeRaw=Clazz_defineMethod(Integer,"decodeRaw", function(n){
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

Integer.decode=Clazz_defineMethod(Integer,"decode", function(n){
	n = Integer.decodeRaw(n);
	if (isNaN(n) || n < Integer.MIN_VALUE|| n > Integer.MAX_VALUE)
	throw new NumberFormatException("Invalid Integer");
	return new Integer(n);
},"~S");

Clazz_overrideMethod(Integer,"hashCode",
function(){
return this.valueOf();
});

// Note that Long is problematic in JavaScript 

java.lang.Long=Long=function(){
Clazz_instantialize(this,arguments);
};
Clazz_decorateAsType(Long,"Long",Number,Comparable,null,true);
Long.prototype.valueOf=function(){return 0;};
Long.toString=Long.prototype.toString=function(){
if(arguments.length!=0){
return""+arguments[0];
}else if(this===Long){
return"class java.lang.Long";
}
return""+this.valueOf();
};

Clazz_overrideConstructor(Long, function(v){
 v == null && (v = 0);
 v = (typeof v == "number" ? Math.round(v) : Integer.parseIntRadix(v, 10));
this.valueOf=function(){return v;};
});

//Long.MIN_VALUE=Long.prototype.MIN_VALUE=-0x8000000000000000;
//Long.MAX_VALUE=Long.prototype.MAX_VALUE=0x7fffffffffffffff;
Long.TYPE=Long.prototype.TYPE=Long;

Clazz_defineMethod(Long,"parseLong",
function(s,radix){
 return Integer.parseInt(s, radix || 10);
});

Long.parseLong=Long.prototype.parseLong;

Clazz_overrideMethod(Long,"$valueOf",
function(s){
return new Long(s);
});
/*
Clazz_defineMethod(Long,"$valueOf",
function(s){
return new Long(s);
},"Number");

Clazz_defineMethod(Long,"$valueOf",
function(s,r){
return new Long(Long.parseLong(s,r));
},"String, Number");
*/
Long.$valueOf=Long.prototype.$valueOf;
Clazz_overrideMethod(Long,"equals",
function(s){
if(s==null||!Clazz_instanceOf(s,Long)){
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


Long.decode=Clazz_defineMethod(Long,"decode",
function(n){
	n = Integer.decodeRaw(n);
	if (isNaN(n))
		throw new NumberFormatException("Invalid Long");
	return new Long(n);
},"~S");

java.lang.Short = Short = function () {
Clazz_instantialize (this, arguments);
};
Clazz_decorateAsType (Short, "Short", Number, Comparable, null, true);
Short.prototype.valueOf = function () { return 0; };
Short.toString = Short.prototype.toString = function () {
	if (arguments.length != 0) {
		return "" + arguments[0];
	} else if (this === Short) {
		return "class java.lang.Short"; // Short.class.toString
	}
	return "" + this.valueOf ();
};

Clazz_overrideConstructor(Short,
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

Clazz_defineMethod(Short, "parseShortRadix",
function (s, radix) {
return Integer.parseIntRadix(s, radix).shortValue();
}, "String, Number");
Short.parseShortRadix = Short.prototype.parseShortRadix;

Clazz_defineMethod(Short, "parseShort",
function (s) {
return Short.parseShortRadix (s, 10);
}, "String");

Short.parseShort = Short.prototype.parseShort;

/*
Clazz_defineMethod(Short, "$valueOf",
function (s) {
return new Short(Short.parseShort (s, 10));
}, "String");
	*/

Clazz_overrideMethod(Short, "$valueOf",
function (s) {
return new Short(s);
});

/*
Clazz_defineMethod(Short, "$valueOf",
function (s, r) {
return new Short(Short.parseShort (s, r));
}, "String, Number");
	*/

Short.$valueOf = Short.prototype.$valueOf;
Clazz_overrideMethod(Short, "equals",
function (s) {
if(s == null || !Clazz_instanceOf(s, Short) ){
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
Short.decode = Clazz_defineMethod(Short, "decode",
function(n){
	n = Integer.decodeRaw(n);
	if (isNaN(n) || n < -32768|| n > 32767)
		throw new NumberFormatException("Invalid Short");
	return new Short(n);
}, "~S");

java.lang.Byte=Byte=function(){
Clazz_instantialize(this,arguments);
};
Clazz_decorateAsType(Byte,"Byte",Number,Comparable,null,true);
Byte.prototype.valueOf=function(){return 0;};
Byte.toString=Byte.prototype.toString=function(){
if(arguments.length!=0){
return""+arguments[0];
}else if(this===Byte){
return"class java.lang.Byte";
}
return""+this.valueOf();
};
Clazz_makeConstructor(Byte,
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

Clazz_defineMethod(Byte,"parseByteRadix",
function(s,radix){
 return Integer.parseIntRadix(s, radix).byteValue();
},"String, Number");
Byte.parseByteRadix=Byte.prototype.parseByteRadix;

Clazz_defineMethod(Byte,"parseByte",
function(s){
return Byte.parseByte(s,10);
},"String");

Byte.parseByte=Byte.prototype.parseByte;

Clazz_overrideMethod(Byte, "$valueOf",
function (s) {
return new Byte(s);
});

Byte.$valueOf=Byte.prototype.$valueOf;
Clazz_overrideMethod(Byte,"equals",
function(s){
if(s==null||!Clazz_instanceOf(s,Byte)){
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
Byte.decode=Clazz_defineMethod(Byte,"decode",
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
Clazz_instantialize(this,arguments);
};
Clazz_decorateAsType(Float,"Float",Number,Comparable,null,true);
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

Clazz_overrideConstructor(Float, function(v){
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

Clazz_defineMethod(Float,"parseFloat",
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

Clazz_overrideMethod(Float,"$valueOf",
function(s){
return new Float(s);
});

Float.$valueOf=Float.prototype.$valueOf;

Clazz_defineMethod(Float,"isNaN",
function(num){
return isNaN(arguments.length == 1 ? num : this.valueOf());
},"Number");
Float.isNaN=Float.prototype.isNaN;
Clazz_defineMethod(Float,"isInfinite",
function(num){
return!isFinite(arguments.length == 1 ? num : this.valueOf());
},"Number");
Float.isInfinite=Float.prototype.isInfinite;

Clazz_overrideMethod(Float,"equals",
function(s){
if(s==null||!Clazz_instanceOf(s,Float)){
return false;
}
return s.valueOf()==this.valueOf();
},"Object");

java.lang.Double=Double=function(){
Clazz_instantialize(this,arguments);
};
Clazz_decorateAsType(Double,"Double",Number,Comparable,null,true);
Double.prototype.valueOf=function(){return 0;};
Double.toString=Double.prototype.toString=function(){
if(arguments.length!=0){
return Clazz._floatToString(arguments[0]);
}else if(this===Double){
return"class java.lang.Double";
}
return Clazz._floatToString(this.valueOf());
};

Clazz_overrideConstructor(Double, function(v){
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

Clazz_defineMethod(Double,"isNaN",
function(num){
return isNaN(arguments.length == 1 ? num : this.valueOf());
},"Number");
Double.isNaN=Double.prototype.isNaN;
Clazz_defineMethod(Double,"isInfinite",
function(num){
return!isFinite(arguments.length == 1 ? num : this.valueOf());
},"Number");
Double.isInfinite=Double.prototype.isInfinite;

Clazz_defineMethod(Double,"parseDouble",
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
Clazz_defineMethod(Double,"$valueOf",
function(s){
return new Double(this.parseDouble(s));
},"String");
*/

Clazz_defineMethod(Double,"$valueOf",
function(v){
return new Double(v);
},"Number");

Double.$valueOf=Double.prototype.$valueOf;

Clazz_overrideMethod(Double,"equals",
function(s){
if(s==null||!Clazz_instanceOf(s,Double)){
return false;
}
return s.valueOf()==this.valueOf();
},"Object");


//java.lang.B00lean = Boolean; ?? BH why this?
Boolean = java.lang.Boolean = Boolean || function () {Clazz_instantialize (this, arguments);};
if (Clazz._supportsNativeObject) {
	for (var i = 0; i < Clazz._extendedObjectMethods.length; i++) {
		var p = Clazz._extendedObjectMethods[i];
		Boolean.prototype[p] = Clazz._O.prototype[p];
	}
}
Boolean.__CLASS_NAME__="Boolean";
Clazz_implementOf(Boolean,[java.io.Serializable,java.lang.Comparable]);
Boolean.equals=Clazz._innerFunctions.equals;
Boolean.getName=Clazz._innerFunctions.getName;
Boolean.serialVersionUID=Boolean.prototype.serialVersionUID=-3665804199014368530;

//Clazz_makeConstructor(Boolean,
//function(value){
//this.valueOf=function(){
//return value;
//};
//},"~B");

Clazz_overrideConstructor(Boolean,
function(s){
	var b = ((typeof s == "string" ? Boolean.toBoolean(s) : s) ? true : false);
	this.valueOf=function(){return b;};
},"~O");

Boolean.parseBoolean=Clazz_defineMethod(Boolean,"parseBoolean",
function(s){
return Boolean.toBoolean(s);
},"~S");
Clazz_defineMethod(Boolean,"booleanValue",
function(){
return this.valueOf();
});
Boolean.$valueOf=Clazz_overrideMethod(Boolean,"$valueOf",
function(b){
return((typeof b == "string"? "true".equalsIgnoreCase(b) : b)?Boolean.TRUE:Boolean.FALSE);
});

/*
Boolean.toString=Clazz_defineMethod(Boolean,"toString",
function(b){
return b?"true":"false";
},"~B");
*/

Clazz_overrideMethod(Boolean,"toString",
function(){
return this.valueOf()?"true":"false";
});
Clazz_overrideMethod(Boolean,"hashCode",
function(){
return this.valueOf()?1231:1237;
});
Clazz_overrideMethod(Boolean,"equals",
function(obj){
if(Clazz_instanceOf(obj,Boolean)){
return this.booleanValue()==obj.booleanValue();
}return false;
},"~O");
Boolean.getBoolean=Clazz_defineMethod(Boolean,"getBoolean",
function(name){
var result=false;
try{
result=Boolean.toBoolean(System.getProperty(name));
}catch(e){
if(Clazz_instanceOf(e,IllegalArgumentException)){
}else if(Clazz_instanceOf(e,NullPointerException)){
}else{
throw e;
}
}
return result;
},"~S");
Clazz_overrideMethod(Boolean,"compareTo",
function(b){
return(b.value==this.value?0:(this.value?1:-1));
},"Boolean");
Boolean.toBoolean=Clazz_defineMethod(Boolean,"toBoolean",
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

Clazz_implementOf(String,[java.io.Serializable,CharSequence,Comparable]);

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
return Clazz_newByteArray(arrs);
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



c$=Clazz_decorateAsClass(function(){
this.value=0;
Clazz_instantialize(this,arguments);
},java.lang,"Character",null,[java.io.Serializable,Comparable]);
Clazz_makeConstructor(c$,
function(value){
this.value=value;
},"~N");
Clazz_defineMethod(c$,"charValue",
function(){
return this.value;
});
Clazz_overrideMethod(c$,"hashCode",
function(){
return(this.value).charCodeAt(0);
});
Clazz_overrideMethod(c$,"equals",
function(obj){
if(Clazz_instanceOf(obj,Character)){
return(this.value).charCodeAt(0)==((obj).charValue()).charCodeAt(0);
}return false;
},"~O");
Clazz_overrideMethod(c$,"compareTo",
function(c){
return(this.value).charCodeAt(0)-(c.value).charCodeAt(0);
},"Character");
c$.toLowerCase=Clazz_defineMethod(c$,"toLowerCase",
function(c){
return(""+c).toLowerCase().charAt(0);
},"~N");
c$.toUpperCase=Clazz_defineMethod(c$,"toUpperCase",
function(c){
return(""+c).toUpperCase().charAt(0);
},"~N");
c$.isDigit=Clazz_defineMethod(c$,"isDigit",
function(c){
c = c.charCodeAt(0);
return (48 <= c && c <= 57);
},"~N");
c$.isUpperCase=Clazz_defineMethod(c$,"isUpperCase",
function(c){
c = c.charCodeAt(0);
return (65 <= c && c <= 90);
},"~N");
c$.isLowerCase=Clazz_defineMethod(c$,"isLowerCase",
function(c){
c = c.charCodeAt(0);
return (97 <= c && c <= 122);
},"~N");
c$.isWhitespace=Clazz_defineMethod(c$,"isWhitespace",
function(c){
c = (c).charCodeAt(0);
return (c >= 0x1c && c <= 0x20 || c >= 0x9 && c <= 0xd || c == 0x1680
	|| c >= 0x2000 && c != 0x2007 && (c <= 0x200b || c == 0x2028 || c == 0x2029 || c == 0x3000));
},"~N");
c$.isLetter=Clazz_defineMethod(c$,"isLetter",
function(c){
c = c.charCodeAt(0);
return (65 <= c && c <= 90 || 97 <= c && c <= 122);
},"~N");
c$.isLetterOrDigit=Clazz_defineMethod(c$,"isLetterOrDigit",
function(c){
c = c.charCodeAt(0);
return (65 <= c && c <= 90 || 97 <= c && c <= 122 || 48 <= c && c <= 57);
},"~N");
c$.isSpaceChar=Clazz_defineMethod(c$,"isSpaceChar",
function(c){
 var i = c.charCodeAt(0);
if(i==0x20||i==0xa0||i==0x1680)return true;
if(i<0x2000)return false;
return i<=0x200b||i==0x2028||i==0x2029||i==0x202f||i==0x3000;
},"~N");
c$.digit=Clazz_defineMethod(c$,"digit",
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
Clazz_overrideMethod(c$,"toString",
function(){
var buf=[this.value];
return String.valueOf(buf);
});
c$.toString=Clazz_overrideMethod(c$,"toString",
function(c){
{
if(this===Character){
return"class java.lang.Character";
}
}return String.valueOf(c);
},"~N");
Clazz_defineStatics(c$,
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
   instanceOf: function(o) { return  Clazz_instanceOf(type, o) },
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
Clazz_implementOf(Date,[java.io.Serializable,java.lang.Comparable]);

Clazz_defineMethod(javautil.Date,"clone",
function(){
return new Date(this.getTime());
});

Clazz_defineMethod(javautil.Date,"before",
function(when){
return this.getTime()<when.getTime();
},"javautil.Date");
Clazz_defineMethod(javautil.Date,"after",
function(when){
return this.getTime()>when.getTime();
},"javautil.Date");
Clazz_defineMethod(javautil.Date,"equals",
function(obj){
return Clazz_instanceOf(obj,javautil.Date)&&this.getTime()==(obj).getTime();
},"Object");
Clazz_defineMethod(javautil.Date,"compareTo",
function(anotherDate){
var thisTime=this.getTime();
var anotherTime=anotherDate.getTime();
return(thisTime<anotherTime?-1:(thisTime==anotherTime?0:1));
},"javautil.Date");
Clazz_defineMethod(javautil.Date,"compareTo",
function(o){
return this.compareTo(o);
},"Object");
Clazz_overrideMethod(javautil.Date,"hashCode",
function(){
var ht=this.getTime();
return parseInt(ht)^parseInt((ht>>32));
});

c$=Clazz_decorateAsClass(function(){
this.source=null;
Clazz_instantialize(this,arguments);
},javautil,"EventObject",null,java.io.Serializable);
Clazz_makeConstructor(c$,
function(source){
if(source!=null)this.source=source;
else throw new IllegalArgumentException();
},"~O");
Clazz_defineMethod(c$,"getSource",
function(){
return this.source;
});
Clazz_overrideMethod(c$,"toString",
function(){
return this.getClass().getName()+"[source="+String.valueOf(this.source)+']';
});
Clazz_declareInterface(javautil,"EventListener");

c$=Clazz_decorateAsClass(function(){
this.listener=null;
Clazz_instantialize(this,arguments);
},javautil,"EventListenerProxy",null,javautil.EventListener);
Clazz_makeConstructor(c$,
function(listener){
this.listener=listener;
},"javautil.EventListener");
Clazz_defineMethod(c$,"getListener",
function(){
return this.listener;
});
Clazz_declareInterface(javautil,"Iterator");

Clazz_declareInterface(javautil,"ListIterator",javautil.Iterator);
Clazz_declareInterface(javautil,"Enumeration");
Clazz_declareInterface(javautil,"Collection",Iterable);

Clazz_declareInterface(javautil,"Set",javautil.Collection);
Clazz_declareInterface(javautil,"Map");
Clazz_declareInterface(javautil.Map,"Entry");

Clazz_declareInterface(javautil,"List",javautil.Collection);

Clazz_declareInterface(javautil,"Queue",javautil.Collection);
Clazz_declareInterface(javautil,"RandomAccess");
c$=Clazz_decorateAsClass(function(){
this.detailMessage=null;
this.cause=null;
this.stackTrace=null;
Clazz_instantialize(this,arguments);
},java.lang,"Throwable",null,java.io.Serializable);
Clazz_prepareFields(c$,function(){
this.cause=this;
//alert("e0 "+ arguments.callee.caller.caller.caller.caller.caller)
});
Clazz_makeConstructor(c$,
function(){
this.fillInStackTrace();
});
Clazz_makeConstructor(c$,
function(message){
this.fillInStackTrace();
this.detailMessage=message;
},"~S");
Clazz_makeConstructor(c$,
function(message,cause){
this.fillInStackTrace();
this.detailMessage=message;
this.cause=cause;
},"~S,Throwable");
Clazz_makeConstructor(c$,
function(cause){
this.fillInStackTrace();
this.detailMessage=(cause==null?null:cause.toString());
this.cause=cause;
},"Throwable");
Clazz_defineMethod(c$,"getMessage",
function(){
return (this.message || this.detailMessage || this.toString());
});
Clazz_defineMethod(c$,"getLocalizedMessage",
function(){
return this.getMessage();
});
Clazz_defineMethod(c$,"getCause",
function(){
return(this.cause===this?null:this.cause);
});
Clazz_defineMethod(c$,"initCause",
function(cause){
if(this.cause!==this)throw new IllegalStateException("Can't overwrite cause");
if(cause===this)throw new IllegalArgumentException("Self-causation not permitted");
this.cause=cause;
return this;
},"Throwable");
Clazz_overrideMethod(c$,"toString",
function(){
var s=this.getClass().getName();
var message=this.message || this.detailMessage;
return(message ? s+": "+message : s);
});
Clazz_defineMethod(c$,"printStackTrace",
function(){
System.err.println(this.getStackTrace ? this.getStackTrace() : this.message + " " + Clazz_getStackTrace());
});

Clazz_defineMethod(c$,"getStackTrace",
function(){
var s = "" + this + "\n";
for(var i=0;i<this.stackTrace.length;i++){
 var t=this.stackTrace[i];
	var x=t.methodName.indexOf("(");
	var n=t.methodName.substring(0,x).replace(/\s+/g,"");
	if(n!="construct"||t.nativeClazz==null
		 ||Clazz_getInheritedLevel(t.nativeClazz,Throwable)<0){
				s += t + "\n";
	}
}
return s;
});


Clazz_defineMethod(c$,"printStackTrace",
function(s){
this.printStackTrace();
},"java.io.PrintStream");
Clazz_defineMethod(c$,"printStackTrace",
function(s){
this.printStackTrace();
},"java.io.PrintWriter");
Clazz_defineMethod(c$,"fillInStackTrace",
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
if(!noLooping||caller==Clazz_tryToSearchAndExecute||caller==Clazz_superCall||caller==null){
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
+" ("+Clazz_getParamsType(superCaller.arguments)+")",
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
Clazz_defineMethod(c$,"setStackTrace",
function(stackTrace){
var defensiveCopy=stackTrace.clone();
for(var i=0;i<defensiveCopy.length;i++)if(defensiveCopy[i]==null)throw new NullPointerException("stackTrace["+i+"]");

this.stackTrace=defensiveCopy;
},"~A");

c$=Clazz_decorateAsClass(function(){
this.declaringClass=null;
this.methodName=null;
this.fileName=null;
this.lineNumber=0;
Clazz_instantialize(this,arguments);
},java.lang,"StackTraceElement",null,java.io.Serializable);
Clazz_makeConstructor(c$,
function(cls,method,file,line){
if(cls==null||method==null){
throw new NullPointerException();
}this.declaringClass=cls;
this.methodName=method;
this.fileName=file;
this.lineNumber=line;
},"~S,~S,~S,~N");
Clazz_overrideMethod(c$,"equals",
function(obj){
if(!(Clazz_instanceOf(obj,StackTraceElement))){
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
Clazz_defineMethod(c$,"getClassName",
function(){
return(this.declaringClass==null)?"<unknown class>":this.declaringClass;
});
Clazz_defineMethod(c$,"getFileName",
function(){
return this.fileName;
});
Clazz_defineMethod(c$,"getLineNumber",
function(){
return this.lineNumber;
});
Clazz_defineMethod(c$,"getMethodName",
function(){
return(this.methodName==null)?"<unknown method>":this.methodName;
});
Clazz_overrideMethod(c$,"hashCode",
function(){
if(this.methodName==null){
return 0;
}return this.methodName.hashCode()^this.declaringClass.hashCode();
});
Clazz_defineMethod(c$,"isNativeMethod",
function(){
return this.lineNumber==-2;
});
Clazz_overrideMethod(c$,"toString",
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
TypeError.prototype.getMessage || (TypeError.prototype.getMessage = function(){ return (this.message || this.toString()) + (this.getStackTrace ? this.getStackTrace() : Clazz_getStackTrace())});


Clazz_Error = Error;

Clazz_declareTypeError = function (prefix, name, clazzParent, interfacez, 
		parentClazzInstance, _declareType) {
	var f = function () {
		Clazz_instantialize (this, arguments);
    return Clazz_Error();
	};
	return Clazz_decorateAsClass (f, prefix, name, clazzParent, interfacez, 
			parentClazzInstance);
};

// at least allow Error() by itself to work as before
Clazz._Error || (Clazz._Error = Error);
Clazz_decorateAsClass (function (){Clazz_instantialize(this, arguments);return Clazz._Error();}, java.lang, "Error", Throwable);

//c$=Clazz_declareTypeError(java.lang,"Error",Throwable);


c$=Clazz_declareType(java.lang,"LinkageError",Error);

c$=Clazz_declareType(java.lang,"IncompatibleClassChangeError",LinkageError);

c$=Clazz_declareType(java.lang,"AbstractMethodError",IncompatibleClassChangeError);

c$=Clazz_declareType(java.lang,"AssertionError",Error);
Clazz_makeConstructor(c$,
function(detailMessage){
Clazz_superConstructor(this,AssertionError,[String.valueOf(detailMessage),(Clazz_instanceOf(detailMessage,Throwable)?detailMessage:null)]);
},"~O");
Clazz_makeConstructor(c$,
function(detailMessage){
this.construct("" + detailMessage);
},"~B");
Clazz_makeConstructor(c$,
function(detailMessage){
this.construct("" + detailMessage);
},"~N");

c$=Clazz_declareType(java.lang,"ClassCircularityError",LinkageError);

c$=Clazz_declareType(java.lang,"ClassFormatError",LinkageError);

c$=Clazz_decorateAsClass(function(){
this.exception=null;
Clazz_instantialize(this,arguments);
},java.lang,"ExceptionInInitializerError",LinkageError);
Clazz_makeConstructor(c$,
function(){
Clazz_superConstructor(this,ExceptionInInitializerError);
this.initCause(null);
});
Clazz_makeConstructor(c$,
function(detailMessage){
Clazz_superConstructor(this,ExceptionInInitializerError,[detailMessage]);
this.initCause(null);
},"~S");
Clazz_makeConstructor(c$,
function(exception){
Clazz_superConstructor(this,ExceptionInInitializerError);
this.exception=exception;
this.initCause(exception);
},"Throwable");
Clazz_defineMethod(c$,"getException",
function(){
return this.exception;
});
Clazz_overrideMethod(c$,"getCause",
function(){
return this.exception;
});

c$=Clazz_declareType(java.lang,"IllegalAccessError",IncompatibleClassChangeError);

c$=Clazz_declareType(java.lang,"InstantiationError",IncompatibleClassChangeError);

c$=Clazz_declareType(java.lang,"VirtualMachineError",Error);

c$=Clazz_declareType(java.lang,"InternalError",VirtualMachineError);

c$=Clazz_declareType(java.lang,"NoClassDefFoundError",LinkageError);

c$=Clazz_declareType(java.lang,"NoSuchFieldError",IncompatibleClassChangeError);

c$=Clazz_declareType(java.lang,"NoSuchMethodError",IncompatibleClassChangeError);

c$=Clazz_declareType(java.lang,"OutOfMemoryError",VirtualMachineError);

c$=Clazz_declareType(java.lang,"StackOverflowError",VirtualMachineError);

c$=Clazz_declareType(java.lang,"UnknownError",VirtualMachineError);

c$=Clazz_declareType(java.lang,"UnsatisfiedLinkError",LinkageError);

c$=Clazz_declareType(java.lang,"UnsupportedClassVersionError",ClassFormatError);

c$=Clazz_declareType(java.lang,"VerifyError",LinkageError);

c$=Clazz_declareType(java.lang,"ThreadDeath",Error);
Clazz_makeConstructor(c$,
function(){
Clazz_superConstructor(this,ThreadDeath,[]);
});

c$=Clazz_declareType(java.lang,"Exception",Throwable);

c$=Clazz_declareType(java.lang,"RuntimeException",Exception);

c$=Clazz_declareType(java.lang,"ArithmeticException",RuntimeException);

c$=Clazz_declareType(java.lang,"IndexOutOfBoundsException",RuntimeException);

c$=Clazz_declareType(java.lang,"ArrayIndexOutOfBoundsException",IndexOutOfBoundsException);
Clazz_makeConstructor(c$,
function(index){
Clazz_superConstructor(this,ArrayIndexOutOfBoundsException,["Array index out of range: "+index]);
},"~N");

c$=Clazz_declareType(java.lang,"ArrayStoreException",RuntimeException);

c$=Clazz_declareType(java.lang,"ClassCastException",RuntimeException);

c$=Clazz_decorateAsClass(function(){
this.ex=null;
Clazz_instantialize(this,arguments);
},java.lang,"ClassNotFoundException",Exception);
Clazz_makeConstructor(c$,
function(){
Clazz_superConstructor(this,ClassNotFoundException,[Clazz_castNullAs("Throwable")]);
});
Clazz_makeConstructor(c$,
function(detailMessage){
Clazz_superConstructor(this,ClassNotFoundException,[detailMessage,null]);
},"~S");
Clazz_makeConstructor(c$,
function(detailMessage,exception){
Clazz_superConstructor(this,ClassNotFoundException,[detailMessage]);
this.ex=exception;
},"~S,Throwable");
Clazz_defineMethod(c$,"getException",
function(){
return this.ex;
});
Clazz_overrideMethod(c$,"getCause",
function(){
return this.ex;
});

c$=Clazz_declareType(java.lang,"CloneNotSupportedException",Exception);

c$=Clazz_declareType(java.lang,"IllegalAccessException",Exception);

c$=Clazz_declareType(java.lang,"IllegalArgumentException",RuntimeException);
Clazz_makeConstructor(c$,
function(cause){
Clazz_superConstructor(this,IllegalArgumentException,[(cause==null?null:cause.toString()),cause]);
},"Throwable");

c$=Clazz_declareType(java.lang,"IllegalMonitorStateException",RuntimeException);

c$=Clazz_declareType(java.lang,"IllegalStateException",RuntimeException);
Clazz_makeConstructor(c$,
function(cause){
Clazz_superConstructor(this,IllegalStateException,[(cause==null?null:cause.toString()),cause]);
},"Throwable");

c$=Clazz_declareType(java.lang,"IllegalThreadStateException",IllegalArgumentException);

c$=Clazz_declareType(java.lang,"InstantiationException",Exception);

c$=Clazz_declareType(java.lang,"InterruptedException",Exception);

c$=Clazz_declareType(java.lang,"NegativeArraySizeException",RuntimeException);

c$=Clazz_declareType(java.lang,"NoSuchFieldException",Exception);

c$=Clazz_declareType(java.lang,"NoSuchMethodException",Exception);

c$=Clazz_declareType(java.lang,"NullPointerException",RuntimeException);

c$=Clazz_declareType(java.lang,"NumberFormatException",IllegalArgumentException);

c$=Clazz_declareType(java.lang,"SecurityException",RuntimeException);
Clazz_makeConstructor(c$,
function(cause){
Clazz_superConstructor(this,SecurityException,[(cause==null?null:cause.toString()),cause]);
},"Throwable");

c$=Clazz_declareType(java.lang,"StringIndexOutOfBoundsException",IndexOutOfBoundsException);
Clazz_makeConstructor(c$,
function(index){
Clazz_superConstructor(this,StringIndexOutOfBoundsException,["String index out of range: "+index]);
},"~N");

c$=Clazz_declareType(java.lang,"UnsupportedOperationException",RuntimeException);
Clazz_makeConstructor(c$,
function(){
Clazz_superConstructor(this,UnsupportedOperationException,[]);
});
Clazz_makeConstructor(c$,
function(cause){
Clazz_superConstructor(this,UnsupportedOperationException,[(cause==null?null:cause.toString()),cause]);
},"Throwable");

c$=Clazz_decorateAsClass(function(){
this.target=null;
Clazz_instantialize(this,arguments);
},java.lang.reflect,"InvocationTargetException",Exception);
Clazz_makeConstructor(c$,
function(){
Clazz_superConstructor(this,java.lang.reflect.InvocationTargetException,[Clazz_castNullAs("Throwable")]);
});
Clazz_makeConstructor(c$,
function(exception){
Clazz_superConstructor(this,java.lang.reflect.InvocationTargetException,[null,exception]);
this.target=exception;
},"Throwable");
Clazz_makeConstructor(c$,
function(exception,detailMessage){
Clazz_superConstructor(this,java.lang.reflect.InvocationTargetException,[detailMessage,exception]);
this.target=exception;
},"Throwable,~S");
Clazz_defineMethod(c$,"getTargetException",
function(){
return this.target;
});
Clazz_overrideMethod(c$,"getCause",
function(){
return this.target;
});

c$=Clazz_decorateAsClass(function(){
this.undeclaredThrowable=null;
Clazz_instantialize(this,arguments);
},java.lang.reflect,"UndeclaredThrowableException",RuntimeException);
Clazz_makeConstructor(c$,
function(exception){
Clazz_superConstructor(this,java.lang.reflect.UndeclaredThrowableException);
this.undeclaredThrowable=exception;
this.initCause(exception);
},"Throwable");
Clazz_makeConstructor(c$,
function(exception,detailMessage){
Clazz_superConstructor(this,java.lang.reflect.UndeclaredThrowableException,[detailMessage]);
this.undeclaredThrowable=exception;
this.initCause(exception);
},"Throwable,~S");
Clazz_defineMethod(c$,"getUndeclaredThrowable",
function(){
return this.undeclaredThrowable;
});
Clazz_overrideMethod(c$,"getCause",
function(){
return this.undeclaredThrowable;
});

c$=Clazz_declareType(java.io,"IOException",Exception);


c$=Clazz_declareType(java.io,"CharConversionException",java.io.IOException);

c$=Clazz_declareType(java.io,"EOFException",java.io.IOException);

c$=Clazz_declareType(java.io,"FileNotFoundException",java.io.IOException);

c$=Clazz_decorateAsClass(function(){
this.bytesTransferred=0;
Clazz_instantialize(this,arguments);
},java.io,"InterruptedIOException",java.io.IOException);

c$=Clazz_declareType(java.io,"ObjectStreamException",java.io.IOException);

c$=Clazz_decorateAsClass(function(){
this.classname=null;
Clazz_instantialize(this,arguments);
},java.io,"InvalidClassException",java.io.ObjectStreamException);
Clazz_makeConstructor(c$,
function(className,detailMessage){
Clazz_superConstructor(this,java.io.InvalidClassException,[detailMessage]);
this.classname=className;
},"~S,~S");
Clazz_defineMethod(c$,"getMessage",
function(){
var msg=Clazz_superCall(this,java.io.InvalidClassException,"getMessage",[]);
if(this.classname!=null){
msg=this.classname+';' + ' '+msg;
}return msg;
});

c$=Clazz_declareType(java.io,"InvalidObjectException",java.io.ObjectStreamException);

c$=Clazz_declareType(java.io,"NotActiveException",java.io.ObjectStreamException);

c$=Clazz_declareType(java.io,"NotSerializableException",java.io.ObjectStreamException);

c$=Clazz_decorateAsClass(function(){
this.eof=false;
this.length=0;
Clazz_instantialize(this,arguments);
},java.io,"OptionalDataException",java.io.ObjectStreamException);

c$=Clazz_declareType(java.io,"StreamCorruptedException",java.io.ObjectStreamException);

c$=Clazz_declareType(java.io,"SyncFailedException",java.io.IOException);

c$=Clazz_declareType(java.io,"UnsupportedEncodingException",java.io.IOException);

c$=Clazz_declareType(java.io,"UTFDataFormatException",java.io.IOException);

c$=Clazz_decorateAsClass(function(){
this.detail=null;
Clazz_instantialize(this,arguments);
},java.io,"WriteAbortedException",java.io.ObjectStreamException);
Clazz_makeConstructor(c$,
function(detailMessage,rootCause){
Clazz_superConstructor(this,java.io.WriteAbortedException,[detailMessage]);
this.detail=rootCause;
this.initCause(rootCause);
},"~S,Exception");
Clazz_defineMethod(c$,"getMessage",
function(){
var msg=Clazz_superCall(this,java.io.WriteAbortedException,"getMessage",[]);
return (this.detail ? msg + "; "+this.detail.toString() : msg);
});
Clazz_overrideMethod(c$,"getCause",
function(){
return this.detail;
});

c$=Clazz_declareType(javautil,"ConcurrentModificationException",RuntimeException);
Clazz_makeConstructor(c$,
function(){
Clazz_superConstructor(this,javautil.ConcurrentModificationException,[]);
});

c$=Clazz_declareType(javautil,"EmptyStackException",RuntimeException);

c$=Clazz_decorateAsClass(function(){
this.className=null;
this.key=null;
Clazz_instantialize(this,arguments);
},javautil,"MissingResourceException",RuntimeException);
Clazz_makeConstructor(c$,
function(detailMessage,className,resourceName){
Clazz_superConstructor(this,javautil.MissingResourceException,[detailMessage]);
this.className=className;
this.key=resourceName;
},"~S,~S,~S");
Clazz_defineMethod(c$,"getClassName",
function(){
return this.className;
});
Clazz_defineMethod(c$,"getKey",
function(){
return this.key;
});

c$=Clazz_declareType(javautil,"NoSuchElementException",RuntimeException);

c$=Clazz_declareType(javautil,"TooManyListenersException",Exception);

c$=Clazz_declareType(java.lang,"Void");
Clazz_defineStatics(c$,
"TYPE",null);
{
java.lang.Void.TYPE=java.lang.Void;
}Clazz_declareInterface(java.lang.reflect,"GenericDeclaration");
Clazz_declareInterface(java.lang.reflect,"AnnotatedElement");

c$=Clazz_declareType(java.lang.reflect,"AccessibleObject",null,java.lang.reflect.AnnotatedElement);
Clazz_makeConstructor(c$,
function(){
});
Clazz_defineMethod(c$,"isAccessible",
function(){
return false;
});
c$.setAccessible=Clazz_defineMethod(c$,"setAccessible",
function(objects,flag){
return;
},"~A,~B");
Clazz_defineMethod(c$,"setAccessible",
function(flag){
return;
},"~B");
Clazz_overrideMethod(c$,"isAnnotationPresent",
function(annotationType){
return false;
},"Class");
Clazz_overrideMethod(c$,"getDeclaredAnnotations",
function(){
return new Array(0);
});
Clazz_overrideMethod(c$,"getAnnotations",
function(){
return new Array(0);
});
Clazz_overrideMethod(c$,"getAnnotation",
function(annotationType){
return null;
},"Class");
c$.marshallArguments=Clazz_defineMethod(c$,"marshallArguments",
function(parameterTypes,args){
return null;
},"~A,~A");
Clazz_defineMethod(c$,"invokeV",
function(receiver,args){
return;
},"~O,~A");
Clazz_defineMethod(c$,"invokeL",
function(receiver,args){
return null;
},"~O,~A");
Clazz_defineMethod(c$,"invokeI",
function(receiver,args){
return 0;
},"~O,~A");
Clazz_defineMethod(c$,"invokeJ",
function(receiver,args){
return 0;
},"~O,~A");
Clazz_defineMethod(c$,"invokeF",
function(receiver,args){
return 0.0;
},"~O,~A");
Clazz_defineMethod(c$,"invokeD",
function(receiver,args){
return 0.0;
},"~O,~A");
c$.emptyArgs=c$.prototype.emptyArgs=new Array(0);
Clazz_declareInterface(java.lang.reflect,"InvocationHandler");
c$=Clazz_declareInterface(java.lang.reflect,"Member");
Clazz_defineStatics(c$,
"PUBLIC",0,
"DECLARED",1);

c$=Clazz_declareType(java.lang.reflect,"Modifier");
Clazz_makeConstructor(c$,
function(){
});
c$.isAbstract=Clazz_defineMethod(c$,"isAbstract",
function(modifiers){
return((modifiers&1024)!=0);
},"~N");
c$.isFinal=Clazz_defineMethod(c$,"isFinal",
function(modifiers){
return((modifiers&16)!=0);
},"~N");
c$.isInterface=Clazz_defineMethod(c$,"isInterface",
function(modifiers){
return((modifiers&512)!=0);
},"~N");
c$.isNative=Clazz_defineMethod(c$,"isNative",
function(modifiers){
return((modifiers&256)!=0);
},"~N");
c$.isPrivate=Clazz_defineMethod(c$,"isPrivate",
function(modifiers){
return((modifiers&2)!=0);
},"~N");
c$.isProtected=Clazz_defineMethod(c$,"isProtected",
function(modifiers){
return((modifiers&4)!=0);
},"~N");
c$.isPublic=Clazz_defineMethod(c$,"isPublic",
function(modifiers){
return((modifiers&1)!=0);
},"~N");
c$.isStatic=Clazz_defineMethod(c$,"isStatic",
function(modifiers){
return((modifiers&8)!=0);
},"~N");
c$.isStrict=Clazz_defineMethod(c$,"isStrict",
function(modifiers){
return((modifiers&2048)!=0);
},"~N");
c$.isSynchronized=Clazz_defineMethod(c$,"isSynchronized",
function(modifiers){
return((modifiers&32)!=0);
},"~N");
c$.isTransient=Clazz_defineMethod(c$,"isTransient",
function(modifiers){
return((modifiers&128)!=0);
},"~N");
c$.isVolatile=Clazz_defineMethod(c$,"isVolatile",
function(modifiers){
return((modifiers&64)!=0);
},"~N");
c$.toString=Clazz_defineMethod(c$,"toString",
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
Clazz_defineStatics(c$,
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

c$=Clazz_decorateAsClass(function(){
this.clazz=null;
this.parameterTypes=null;
this.exceptionTypes=null;
this.modifiers=0;
Clazz_instantialize(this,arguments);
},java.lang.reflect,"Constructor",java.lang.reflect.AccessibleObject,[java.lang.reflect.GenericDeclaration,java.lang.reflect.Member]);
Clazz_makeConstructor(c$,
function(declaringClass,parameterTypes,checkedExceptions,modifiers){
Clazz_superConstructor(this,java.lang.reflect.Constructor,[]);
this.clazz=declaringClass;
this.parameterTypes=parameterTypes;
this.exceptionTypes=checkedExceptions;
this.modifiers=modifiers;
},"Class,~A,~A,~N");
Clazz_overrideMethod(c$,"getTypeParameters",
function(){
return null;
});
Clazz_defineMethod(c$,"toGenericString",
function(){
return null;
});
Clazz_defineMethod(c$,"getGenericParameterTypes",
function(){
return null;
});
Clazz_defineMethod(c$,"getGenericExceptionTypes",
function(){
return null;
});
Clazz_defineMethod(c$,"getParameterAnnotations",
function(){
return null;
});
Clazz_defineMethod(c$,"isVarArgs",
function(){
return false;
});
Clazz_overrideMethod(c$,"isSynthetic",
function(){
return false;
});
Clazz_overrideMethod(c$,"equals",
function(object){
if(object!=null&&Clazz_instanceOf(object,java.lang.reflect.Constructor)){
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
Clazz_overrideMethod(c$,"getDeclaringClass",
function(){
return this.clazz;
});
Clazz_defineMethod(c$,"getExceptionTypes",
function(){
return this.exceptionTypes;
});
Clazz_overrideMethod(c$,"getModifiers",
function(){
return this.modifiers;
});
Clazz_overrideMethod(c$,"getName",
function(){
return this.getDeclaringClass().getName();
});
Clazz_defineMethod(c$,"getParameterTypes",
function(){
return this.parameterTypes;
});
Clazz_overrideMethod(c$,"hashCode",
function(){
return this.getDeclaringClass().getName().hashCode();
});
Clazz_defineMethod(c$,"newInstance",
function(args){
var instance=new this.clazz(Clazz_inheritArgs);
Clazz_instantialize(instance,args);
return instance;
},"~A");
Clazz_overrideMethod(c$,"toString",
function(){
return null;
});

c$=Clazz_declareType(java.lang.reflect,"Field",java.lang.reflect.AccessibleObject,java.lang.reflect.Member);
Clazz_overrideMethod(c$,"isSynthetic",
function(){
return false;
});
Clazz_defineMethod(c$,"toGenericString",
function(){
return null;
});
Clazz_defineMethod(c$,"isEnumConstant",
function(){
return false;
});
Clazz_defineMethod(c$,"getGenericType",
function(){
return null;
});
Clazz_overrideMethod(c$,"equals",
function(object){
return false;
},"~O");
Clazz_overrideMethod(c$,"getDeclaringClass",
function(){
return null;
});
Clazz_overrideMethod(c$,"getName",
function(){
return null;
});
Clazz_defineMethod(c$,"getType",
function(){
return null;
});
Clazz_overrideMethod(c$,"hashCode",
function(){
return 0;
});
Clazz_overrideMethod(c$,"toString",
function(){
return null;
});

c$=Clazz_decorateAsClass(function(){
this.clazz=null;
this.name=null;
this.returnType=null;
this.parameterTypes=null;
this.exceptionTypes=null;
this.modifiers=0;
Clazz_instantialize(this,arguments);
},java.lang.reflect,"Method",java.lang.reflect.AccessibleObject,[java.lang.reflect.GenericDeclaration,java.lang.reflect.Member]);
Clazz_makeConstructor(c$,
function(declaringClass,name,parameterTypes,returnType,checkedExceptions,modifiers){
Clazz_superConstructor(this,java.lang.reflect.Method,[]);
this.clazz=declaringClass;
this.name=name;
this.parameterTypes=parameterTypes;
this.returnType=returnType;
this.exceptionTypes=checkedExceptions;
this.modifiers=modifiers;
},"Class,~S,~A,Class,~A,~N");
Clazz_overrideMethod(c$,"getTypeParameters",
function(){
return null;
});
Clazz_defineMethod(c$,"toGenericString",
function(){
return null;
});
Clazz_defineMethod(c$,"getGenericParameterTypes",
function(){
return null;
});
Clazz_defineMethod(c$,"getGenericExceptionTypes",
function(){
return null;
});
Clazz_defineMethod(c$,"getGenericReturnType",
function(){
return null;
});
Clazz_defineMethod(c$,"getParameterAnnotations",
function(){
return null;
});
Clazz_defineMethod(c$,"isVarArgs",
function(){
return false;
});
Clazz_defineMethod(c$,"isBridge",
function(){
return false;
});
Clazz_overrideMethod(c$,"isSynthetic",
function(){
return false;
});
Clazz_defineMethod(c$,"getDefaultValue",
function(){
return null;
});
Clazz_overrideMethod(c$,"equals",
function(object){
if(object!=null&&Clazz_instanceOf(object,java.lang.reflect.Method)){
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
Clazz_overrideMethod(c$,"getDeclaringClass",
function(){
return this.clazz;
});
Clazz_defineMethod(c$,"getExceptionTypes",
function(){
return this.exceptionTypes;
});
Clazz_overrideMethod(c$,"getModifiers",
function(){
return this.modifiers;
});
Clazz_overrideMethod(c$,"getName",
function(){
return this.name;
});
Clazz_defineMethod(c$,"getParameterTypes",
function(){
return this.parameterTypes; 
});
Clazz_defineMethod(c$,"getReturnType",
function(){
return this.returnType;
});
Clazz_overrideMethod(c$,"hashCode",
function(){
return this.getDeclaringClass().getName().hashCode()^this.getName().hashCode();
});
Clazz_defineMethod(c$,"invoke",
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
Clazz_overrideMethod(c$,"toString",
function(){
return null;
});

})(Clazz);
;(function() {

if (Jmol._debugCode)return;

Clazz_load(null,"java.lang.AbstractStringBuilder",["java.io.InvalidObjectException","java.lang.ArrayIndexOutOfBoundsException","$.IndexOutOfBoundsException","$.NegativeArraySizeException","$.NullPointerException","$.StringIndexOutOfBoundsException"],function(){
c$=Clazz_decorateAsClass(function(){
this.value=null;
this.count=0;
this.shared=false;
Clazz_instantialize(this,arguments);
},java.lang,"AbstractStringBuilder");
Clazz_defineMethod(c$,"getValue",
function(){
return this.value;
});
Clazz_defineMethod(c$,"shareValue",
function(){
this.shared=true;
return this.value;
});
Clazz_defineMethod(c$,"set",
function(val,len){
if(val==null)val=Clazz_newArray(0,'\0');
if(val.length<len)throw new java.io.InvalidObjectException(("K0199"));
this.shared=false;
this.value=val;
this.count=len;
},"~A,~N");
Clazz_makeConstructor(c$,
function(){
this.value=Clazz_newArray(16,'\0');
});
Clazz_makeConstructor(c$,
function(capacity){
if(capacity<0)throw new NegativeArraySizeException();
this.value=Clazz_newArray(capacity,'\0');
},"~N");
Clazz_makeConstructor(c$,
function(string){
this.count=string.length;
this.shared=false;
this.value=Clazz_newArray(this.count+16,'\0');
string.getChars(0,this.count,this.value,0);
},"~S");
Clazz_defineMethod(c$,"enlargeBuffer",
($fz=function(min){
var twice=(this.value.length<<1)+2;
var newData=Clazz_newArray(min>twice?min:twice,'\0');
System.arraycopy(this.value,0,newData,0,this.count);
this.value=newData;
this.shared=false;
},$fz.isPrivate=true,$fz),"~N");
Clazz_defineMethod(c$,"appendNull",
function(){
var newSize=this.count+4;
if(newSize>this.value.length){
this.enlargeBuffer(newSize);
}else if(this.shared){
this.value=this.value.clone();
this.shared=false;
}this.value[this.count++]='n';
this.value[this.count++]='u';
this.value[this.count++]='l';
this.value[this.count++]='l';
});
Clazz_defineMethod(c$,"append0",
function(chars){
var newSize=this.count+chars.length;
if(newSize>this.value.length){
this.enlargeBuffer(newSize);
}else if(this.shared){
this.value=this.value.clone();
this.shared=false;
}System.arraycopy(chars,0,this.value,this.count,chars.length);
this.count=newSize;
},"~A");
Clazz_defineMethod(c$,"append0",
function(chars,start,length){
if(chars==null){
throw new NullPointerException();
}if(start>=0&&0<=length&&length<=chars.length-start){
var newSize=this.count+length;
if(newSize>this.value.length){
this.enlargeBuffer(newSize);
}else if(this.shared){
this.value=this.value.clone();
this.shared=false;
}System.arraycopy(chars,start,this.value,this.count,length);
this.count=newSize;
}else{
throw new ArrayIndexOutOfBoundsException();
}},"~A,~N,~N");
Clazz_defineMethod(c$,"append0",
function(ch){
if(this.count==this.value.length){
this.enlargeBuffer(this.count+1);
}if(this.shared){
this.value=this.value.clone();
this.shared=false;
}this.value[this.count++]=ch;
},"~N");
Clazz_defineMethod(c$,"append0",
function(string){
if(string==null){
this.appendNull();
return;
}var adding=string.length;
var newSize=this.count+adding;
if(newSize>this.value.length){
this.enlargeBuffer(newSize);
}else if(this.shared){
this.value=this.value.clone();
this.shared=false;
}string.getChars(0,adding,this.value,this.count);
this.count=newSize;
},"~S");
Clazz_defineMethod(c$,"append0",
function(s,start,end){
if(s==null)s="null";
if(start<0||end<0||start>end||end>s.length())throw new IndexOutOfBoundsException();
this.append0(s.subSequence(start,end).toString());
},"CharSequence,~N,~N");
Clazz_defineMethod(c$,"capacity",
function(){
return this.value.length;
});
Clazz_defineMethod(c$,"charAt",
function(index){
if(index<0||index>=this.count)throw new StringIndexOutOfBoundsException(index);
return this.value[index];
},"~N");
Clazz_defineMethod(c$,"delete0",
function(start,end){
if(start>=0){
if(end>this.count){
end=this.count;
}if(end==start){
return;
}if(end>start){
var length=this.count-end;
if(length>0){
if(!this.shared){
System.arraycopy(this.value,end,this.value,start,length);
}else{
var newData=Clazz_newArray(this.value.length,'\0');
System.arraycopy(this.value,0,newData,0,start);
System.arraycopy(this.value,end,newData,start,length);
this.value=newData;
this.shared=false;
}}this.count-=end-start;
return;
}}throw new StringIndexOutOfBoundsException();
},"~N,~N");
Clazz_defineMethod(c$,"deleteCharAt0",
function(location){
if(0>location||location>=this.count)throw new StringIndexOutOfBoundsException(location);
var length=this.count-location-1;
if(length>0){
if(!this.shared){
System.arraycopy(this.value,location+1,this.value,location,length);
}else{
var newData=Clazz_newArray(this.value.length,'\0');
System.arraycopy(this.value,0,newData,0,location);
System.arraycopy(this.value,location+1,newData,location,length);
this.value=newData;
this.shared=false;
}}this.count--;
},"~N");
Clazz_defineMethod(c$,"ensureCapacity",
function(min){
if(min>this.value.length){
this.enlargeBuffer(min);
}},"~N");
Clazz_defineMethod(c$,"getChars",
function(start,end,dest,destStart){
if(start>this.count||end>this.count||start>end){
throw new StringIndexOutOfBoundsException();
}System.arraycopy(this.value,start,dest,destStart,end-start);
},"~N,~N,~A,~N");
Clazz_defineMethod(c$,"insert0",
function(index,chars){
if(0>index||index>this.count){
throw new StringIndexOutOfBoundsException(index);
}if(chars.length!=0){
this.move(chars.length,index);
System.arraycopy(chars,0,this.value,index,chars.length);
this.count+=chars.length;
}},"~N,~A");
Clazz_defineMethod(c$,"insert0",
function(index,chars,start,length){
if(0<=index&&index<=this.count){
if(start>=0&&0<=length&&length<=chars.length-start){
if(length!=0){
this.move(length,index);
System.arraycopy(chars,start,this.value,index,length);
this.count+=length;
}return;
}throw new StringIndexOutOfBoundsException("offset "+start+", len "+length+", array.length "+chars.length);
}throw new StringIndexOutOfBoundsException(index);
},"~N,~A,~N,~N");
Clazz_defineMethod(c$,"insert0",
function(index,ch){
if(0>index||index>this.count){
throw new ArrayIndexOutOfBoundsException(index);
}this.move(1,index);
this.value[index]=ch;
this.count++;
},"~N,~N");
Clazz_defineMethod(c$,"insert0",
function(index,string){
if(0<=index&&index<=this.count){
if(string==null)string="null";
var min=string.length;
if(min!=0){
this.move(min,index);
string.getChars(0,min,this.value,index);
this.count+=min;
}}else{
throw new StringIndexOutOfBoundsException(index);
}},"~N,~S");
Clazz_defineMethod(c$,"insert0",
function(index,s,start,end){
if(s==null)s="null";
if(index<0||index>this.count||start<0||end<0||start>end||end>s.length())throw new IndexOutOfBoundsException();
this.insert0(index,s.subSequence(start,end).toString());
},"~N,CharSequence,~N,~N");
Clazz_defineMethod(c$,"length",
function(){
return this.count;
});
Clazz_defineMethod(c$,"move",
($fz=function(size,index){
var newSize;
if(this.value.length-this.count>=size){
if(!this.shared){
System.arraycopy(this.value,index,this.value,index+size,this.count-index);
return;
}newSize=this.value.length;
}else{
var a=this.count+size;
var b=(this.value.length<<1)+2;
newSize=a>b?a:b;
}var newData=Clazz_newArray(newSize,'\0');
System.arraycopy(this.value,0,newData,0,index);
System.arraycopy(this.value,index,newData,index+size,this.count-index);
this.value=newData;
this.shared=false;
},$fz.isPrivate=true,$fz),"~N,~N");
Clazz_defineMethod(c$,"replace0",
function(start,end,string){
if(start>=0){
if(end>this.count)end=this.count;
if(end>start){
var stringLength=string.length;
var diff=end-start-stringLength;
if(diff>0){
if(!this.shared){
System.arraycopy(this.value,end,this.value,start+stringLength,this.count-end);
}else{
var newData=Clazz_newArray(this.value.length,'\0');
System.arraycopy(this.value,0,newData,0,start);
System.arraycopy(this.value,end,newData,start+stringLength,this.count-end);
this.value=newData;
this.shared=false;
}}else if(diff<0){
this.move(-diff,end);
}else if(this.shared){
this.value=this.value.clone();
this.shared=false;
}string.getChars(0,stringLength,this.value,start);
this.count-=diff;
return;
}if(start==end){
if(string==null)throw new NullPointerException();
this.insert0(start,string);
return;
}}throw new StringIndexOutOfBoundsException();
},"~N,~N,~S");
Clazz_defineMethod(c$,"reverse0",
function(){
if(this.count<2){
return;
}if(!this.shared){
for(var i=0,end=this.count,mid=Math.floor(this.count/2);i<mid;i++){
var temp=this.value[--end];
this.value[end]=this.value[i];
this.value[i]=temp;
}
}else{
var newData=Clazz_newArray(this.value.length,'\0');
for(var i=0,end=this.count;i<this.count;i++){
newData[--end]=this.value[i];
}
this.value=newData;
this.shared=false;
}});
Clazz_defineMethod(c$,"setCharAt",
function(index,ch){
if(0>index||index>=this.count){
throw new StringIndexOutOfBoundsException(index);
}if(this.shared){
this.value=this.value.clone();
this.shared=false;
}this.value[index]=ch;
},"~N,~N");
Clazz_defineMethod(c$,"setLength",
function(length){
if(length<0)throw new StringIndexOutOfBoundsException(length);
if(this.count<length){
if(length>this.value.length){
this.enlargeBuffer(length);
}else{
if(this.shared){
var newData=Clazz_newArray(this.value.length,'\0');
System.arraycopy(this.value,0,newData,0,this.count);
this.value=newData;
this.shared=false;
}else{
for(var i=this.count;i<length;i++){
this.value[i]=String.fromCharCode(0);
}
}}}this.count=length;
},"~N");
Clazz_defineMethod(c$,"substring",
function(start){
if(0<=start&&start<=this.count){
if(start==this.count)return"";
this.shared=true;
return String.instantialize(start,this.count-start,this.value);
}throw new StringIndexOutOfBoundsException(start);
},"~N");
Clazz_defineMethod(c$,"substring",
function(start,end){
if(0<=start&&start<=end&&end<=this.count){
if(start==end)return"";
this.shared=true;
return String.instantialize(this.value,start,end-start);
}throw new StringIndexOutOfBoundsException();
},"~N,~N");
Clazz_overrideMethod(c$,"toString",
function(){
if(this.count==0)return"";
if(this.count>=256&&this.count<=(this.value.length>>1))return String.instantialize(this.value,0,this.count);
this.shared=true;
return String.instantialize(0,this.count,this.value);
});
Clazz_defineMethod(c$,"subSequence",
function(start,end){
return this.substring(start,end);
},"~N,~N");
Clazz_defineMethod(c$,"indexOf",
function(string){
return this.indexOf(string,0);
},"~S");
Clazz_defineMethod(c$,"indexOf",
function(subString,start){
if(start<0)start=0;
var subCount=subString.length;
if(subCount>0){
if(subCount+start>this.count)return-1;
var firstChar=subString.charAt(0);
while(true){
var i=start;
var found=false;
for(;i<this.count;i++)if((this.value[i]).charCodeAt(0)==(firstChar).charCodeAt(0)){
found=true;
break;
}
if(!found||subCount+i>this.count)return-1;
var o1=i;
var o2=0;
while(++o2<subCount&&(this.value[++o1]).charCodeAt(0)==(subString.charAt(o2)).charCodeAt(0)){
}
if(o2==subCount)return i;
start=i+1;
}
}return(start<this.count||start==0)?start:this.count;
},"~S,~N");
Clazz_defineMethod(c$,"lastIndexOf",
function(string){
return this.lastIndexOf(string,this.count);
},"~S");
Clazz_defineMethod(c$,"lastIndexOf",
function(subString,start){
var subCount=subString.length;
if(subCount<=this.count&&start>=0){
if(subCount>0){
if(start>this.count-subCount)start=this.count-subCount;
var firstChar=subString.charAt(0);
while(true){
var i=start;
var found=false;
for(;i>=0;--i)if((this.value[i]).charCodeAt(0)==(firstChar).charCodeAt(0)){
found=true;
break;
}
if(!found)return-1;
var o1=i;
var o2=0;
while(++o2<subCount&&(this.value[++o1]).charCodeAt(0)==(subString.charAt(o2)).charCodeAt(0)){
}
if(o2==subCount)return i;
start=i-1;
}
}return start<this.count?start:this.count;
}return-1;
},"~S,~N");
Clazz_defineMethod(c$,"trimToSize",
function(){
if(this.count<this.value.length){
var newValue=Clazz_newArray(this.count,'\0');
System.arraycopy(this.value,0,newValue,0,this.count);
this.value=newValue;
this.shared=false;
}});
Clazz_defineStatics(c$,
"INITIAL_CAPACITY",16);
});
// BH removed inner class 
Clazz_load(null,"java.lang.Enum",["java.lang.CloneNotSupportedException","$.IllegalArgumentException","$.NullPointerException"],function(){
c$=Clazz_decorateAsClass(function(){
this.$name=null;
this.$ordinal=0;
Clazz_instantialize(this,arguments);
},java.lang,"Enum",null,[java.io.Serializable,Comparable]);
Clazz_makeConstructor(c$,
function(name,ordinal){
this.$name=name;
this.$ordinal=ordinal;
},"~S,~N");
Clazz_defineMethod(c$,"name",
function(){
return this.$name;
});
Clazz_defineMethod(c$,"ordinal",
function(){
return this.$ordinal;
});
Clazz_overrideMethod(c$,"toString",
function(){
return this.$name;
});
Clazz_overrideMethod(c$,"equals",
function(other){
return this===other;
},"~O");
Clazz_overrideMethod(c$,"hashCode",
function(){
return this.$ordinal+(this.$name==null?0:this.$name.hashCode());
});
Clazz_overrideMethod(c$,"clone",
function(){
throw new CloneNotSupportedException(("KA004"));
});
Clazz_overrideMethod(c$,"compareTo",
function(o){
return this.$ordinal-o.$ordinal;
},"~O");
Clazz_defineMethod(c$,"getDeclaringClass",
function(){
var myClass=this.getClass();
var mySuperClass=myClass.getSuperclass();
if(Enum===mySuperClass){
return myClass;
}return mySuperClass;
});
c$.$valueOf=Clazz_defineMethod(c$,"$valueOf",
function(enumType,name){
if((enumType==null)||(name==null)){
throw new NullPointerException(("KA001"));
}var values=Enum.getValues(enumType);
if(values==null){
throw new IllegalArgumentException(("KA005"));
}for(var enumConst,$enumConst=0,$$enumConst=values;$enumConst<$$enumConst.length&&((enumConst=$$enumConst[$enumConst])||true);$enumConst++){
if(enumConst.$name.equals(name)){
return enumConst;
}}
throw new IllegalArgumentException(("KA006"));
},"Class,~S");
c$.getValues=Clazz_defineMethod(c$,"getValues",
function(enumType){
return enumType.values();
},"Class");

//c$.$Enum$1$=function(){
//Clazz_pu$h(self.c$);

//c$=Clazz_declareAnonymous(null,"Enum$1",null,java.security.PrivilegedExceptionAction);
//Clazz_overrideMethod(c$,"run",
//function(){
//var valsMethod=this.f$.enumType.getMethod("values",null);
//valsMethod.setAccessible(true);
//return valsMethod;
//});
//c$=Clazz_p0p();
//};


});
Clazz_load(["java.lang.AbstractStringBuilder","$.Appendable"],"java.lang.StringBuffer",["java.lang.Character","$.Double","$.Float","$.Long"],function(){
c$=Clazz_declareType(java.lang,"StringBuffer",AbstractStringBuilder,[Appendable,java.io.Serializable,CharSequence]);
Clazz_makeConstructor(c$,
function(cs){
if(cs==null){
throw new NullPointerException();
}
Clazz_superConstructor(this,StringBuffer,[cs.toString()]);
},"CharSequence");
Clazz_defineMethod(c$,"append",
function(b){
return this.append(b?"true":"false");
},"~B");
Clazz_defineMethod(c$,"append",
function(ch){
this.append0(ch);
return this;
},"~N");
Clazz_defineMethod(c$,"append",
function(d){
return this.append(Double.toString(d));
},"~N");
Clazz_defineMethod(c$,"append",
function(obj){
if(obj==null){
this.appendNull();
}else{
this.append0(obj.toString());
}return this;
},"~O");
Clazz_defineMethod(c$,"append",
function(string){
this.append0(string);
return this;
},"~S");
Clazz_defineMethod(c$,"append",
function(sb){
if(sb==null){
this.appendNull();
}else{
{
this.append0(sb.getValue(),0,sb.length());
}}return this;
},"StringBuffer");
Clazz_defineMethod(c$,"append",
function(chars){
this.append0(chars);
return this;
},"~A");
Clazz_defineMethod(c$,"append",
function(chars,start,length){
this.append0(chars,start,length);
return this;
},"~A,~N,~N");
Clazz_defineMethod(c$,"append",
function(s){
if(s==null){
this.appendNull();
}else{
this.append0(s.toString());
}return this;
},"CharSequence");
Clazz_defineMethod(c$,"append",
function(s,start,end){
this.append0(s,start,end);
return this;
},"CharSequence,~N,~N");
Clazz_defineMethod(c$,"appendCodePoint",
function(codePoint){
return this.append(Character.toChars(codePoint));
},"~N");
Clazz_defineMethod(c$,"$delete",
function(start,end){
this.delete0(start,end);
return this;
},"~N,~N");
Clazz_defineMethod(c$,"deleteCharAt",
function(location){
this.deleteCharAt0(location);
return this;
},"~N");
Clazz_defineMethod(c$,"insert",
function(index,ch){
this.insert0(index,ch);
return this;
},"~N,~N");
Clazz_defineMethod(c$,"insert",
function(index,b){
return this.insert(index,b?"true":"false");
},"~N,~B");
Clazz_defineMethod(c$,"insert",
function(index,i){
return this.insert(index,Integer.toString(i));
},"~N,~N");
Clazz_defineMethod(c$,"insert",
function(index,l){
return this.insert(index,Long.toString(l));
},"~N,~N");
Clazz_defineMethod(c$,"insert",
function(index,d){
return this.insert(index,Double.toString(d));
},"~N,~N");
Clazz_defineMethod(c$,"insert",
function(index,f){
return this.insert(index,Float.toString(f));
},"~N,~N");
Clazz_defineMethod(c$,"insert",
function(index,obj){
return this.insert(index,obj==null?"null":obj.toString());
},"~N,~O");
Clazz_defineMethod(c$,"insert",
function(index,string){
this.insert0(index,string);
return this;
},"~N,~S");
Clazz_defineMethod(c$,"insert",
function(index,chars){
this.insert0(index,chars);
return this;
},"~N,~A");
Clazz_defineMethod(c$,"insert",
function(index,chars,start,length){
this.insert0(index,chars,start,length);
return this;
},"~N,~A,~N,~N");
Clazz_defineMethod(c$,"insert",
function(index,s){
this.insert0(index,s==null?"null":s.toString());
return this;
},"~N,CharSequence");
Clazz_defineMethod(c$,"insert",
function(index,s,start,end){
this.insert0(index,s,start,end);
return this;
},"~N,CharSequence,~N,~N");
Clazz_defineMethod(c$,"replace",
function(start,end,string){
this.replace0(start,end,string);
return this;
},"~N,~N,~S");
Clazz_defineMethod(c$,"reverse",
function(){
this.reverse0();
return this;
});
Clazz_overrideMethod(c$,"subSequence",
function(start,end){
return Clazz_superCall(this,StringBuffer,"substring",[start,end]);
},"~N,~N");
});
Clazz_load(["java.lang.AbstractStringBuilder","$.Appendable"],"java.lang.StringBuilder",["java.lang.Double","$.Float","$.Long"],function(){
c$=Clazz_declareType(java.lang,"StringBuilder",AbstractStringBuilder,[Appendable,CharSequence,java.io.Serializable]);
Clazz_makeConstructor(c$,
function(seq){
Clazz_superConstructor(this,StringBuilder,[seq.toString()]);
},"CharSequence");
Clazz_defineMethod(c$,"append",
function(b){
this.append0(b?"true":"false");
return this;
},"~B");
Clazz_defineMethod(c$,"append",
function(c){
this.append0(c);
return this;
},"~N");
Clazz_defineMethod(c$,"append",
function(i){
this.append0(Integer.toString(i));
return this;
},"~N");
Clazz_defineMethod(c$,"append",
function(lng){
this.append0(Long.toString(lng));
return this;
},"~N");
Clazz_defineMethod(c$,"append",
function(f){
this.append0(Float.toString(f));
return this;
},"~N");
Clazz_defineMethod(c$,"append",
function(d){
this.append0(Double.toString(d));
return this;
},"~N");
Clazz_defineMethod(c$,"append",
function(obj){
if(obj==null){
this.appendNull();
}else{
this.append0(obj.toString());
}return this;
},"~O");
Clazz_defineMethod(c$,"append",
function(str){
this.append0(str);
return this;
},"~S");
Clazz_defineMethod(c$,"append",
function(sb){
if(sb==null){
this.appendNull();
}else{
this.append0(sb.getValue(),0,sb.length());
}return this;
},"StringBuffer");
Clazz_defineMethod(c$,"append",
function(ch){
this.append0(ch);
return this;
},"~A");
Clazz_defineMethod(c$,"append",
function(str,offset,len){
this.append0(str,offset,len);
return this;
},"~A,~N,~N");
Clazz_defineMethod(c$,"append",
function(csq){
if(csq==null){
this.appendNull();
}else{
this.append0(csq.toString());
}return this;
},"CharSequence");
Clazz_defineMethod(c$,"append",
function(csq,start,end){
this.append0(csq,start,end);
return this;
},"CharSequence,~N,~N");
Clazz_defineMethod(c$,"$delete",
function(start,end){
this.delete0(start,end);
return this;
},"~N,~N");
Clazz_defineMethod(c$,"deleteCharAt",
function(index){
this.deleteCharAt0(index);
return this;
},"~N");
Clazz_defineMethod(c$,"insert",
function(offset,b){
this.insert0(offset,b?"true":"false");
return this;
},"~N,~B");
Clazz_defineMethod(c$,"insert",
function(offset,c){
this.insert0(offset,c);
return this;
},"~N,~N");
Clazz_defineMethod(c$,"insert",
function(offset,i){
this.insert0(offset,Integer.toString(i));
return this;
},"~N,~N");
Clazz_defineMethod(c$,"insert",
function(offset,l){
this.insert0(offset,Long.toString(l));
return this;
},"~N,~N");
Clazz_defineMethod(c$,"insert",
function(offset,f){
this.insert0(offset,Float.toString(f));
return this;
},"~N,~N");
Clazz_defineMethod(c$,"insert",
function(offset,d){
this.insert0(offset,Double.toString(d));
return this;
},"~N,~N");
Clazz_defineMethod(c$,"insert",
function(offset,obj){
this.insert0(offset,obj==null?"null":obj.toString());
return this;
},"~N,~O");
Clazz_defineMethod(c$,"insert",
function(offset,str){
this.insert0(offset,str);
return this;
},"~N,~S");
Clazz_defineMethod(c$,"insert",
function(offset,ch){
this.insert0(offset,ch);
return this;
},"~N,~A");
Clazz_defineMethod(c$,"insert",
function(offset,str,strOffset,strLen){
this.insert0(offset,str,strOffset,strLen);
return this;
},"~N,~A,~N,~N");
Clazz_defineMethod(c$,"insert",
function(offset,s){
this.insert0(offset,s==null?"null":s.toString());
return this;
},"~N,CharSequence");
Clazz_defineMethod(c$,"insert",
function(offset,s,start,end){
this.insert0(offset,s,start,end);
return this;
},"~N,CharSequence,~N,~N");
Clazz_defineMethod(c$,"replace",
function(start,end,str){
this.replace0(start,end,str);
return this;
},"~N,~N,~S");
Clazz_defineMethod(c$,"reverse",
function(){
this.reverse0();
return this;
});
});
Clazz_load(null,"java.lang.Thread",["java.lang.IllegalArgumentException","$.ThreadGroup","java.util.Date"],function(){
c$=Clazz_decorateAsClass(function(){
this.target=null;
this.group=null;
this.name=null;
this.priority=0;
Clazz_instantialize(this,arguments);
},java.lang,"Thread",null,Runnable);
c$.currentThread=Clazz_defineMethod(c$,"currentThread",
function(){
if(Thread.J2S_THREAD==null){
(Thread.J2S_THREAD=new Thread(),Thread.prototype.J2S_THREAD=Thread.J2S_THREAD);
}return Thread.J2S_THREAD;
});
c$.sleep=Clazz_defineMethod(c$,"sleep",
function(millis){
Clazz_alert("Thread.sleep is not implemented in Java2Script!");
},"~N");
Clazz_makeConstructor(c$,
function(){
});
Clazz_makeConstructor(c$,
function(target){
this.init(null,target,"Thread-"+new java.util.Date().getTime()+Math.random(),0);
},"Runnable");
Clazz_makeConstructor(c$,
function(group,target){
this.init(group,target,"Thread-"+new java.util.Date().getTime()+Math.random(),0);
},"ThreadGroup,Runnable");
Clazz_makeConstructor(c$,
function(name){
this.init(null,null,name,0);
},"~S");
Clazz_makeConstructor(c$,
function(group,name){
this.init(group,null,name,0);
},"ThreadGroup,~S");
Clazz_makeConstructor(c$,
function(target,name){
this.init(null,target,name,0);
},"Runnable,~S");
Clazz_makeConstructor(c$,
function(group,target,name){
this.init(group,target,name,0);
},"ThreadGroup,Runnable,~S");
Clazz_makeConstructor(c$,
function(group,target,name,stackSize){
this.init(group,target,name,stackSize);
},"ThreadGroup,Runnable,~S,~N");
Clazz_defineMethod(c$,"init",
($fz=function(g,target,name,stackSize){
if(g==null){
g=new ThreadGroup();
}this.group=g;
this.target=target;
this.name=name;
this.priority=5;
},$fz.isPrivate=true,$fz),"ThreadGroup,Runnable,~S,~N");
Clazz_defineMethod(c$,"start",
function(){
window.setTimeout((function(runnable){
return function(){
runnable.run();
};
})(this),0);
});
Clazz_defineMethod(c$,"run",
function(){
if(this.target!=null){
this.target.run();
}});
Clazz_defineMethod(c$,"setPriority",
function(newPriority){
if(newPriority>10||newPriority<1){
throw new IllegalArgumentException();
}this.priority=newPriority;
},"~N");
Clazz_defineMethod(c$,"getPriority",
function(){
return this.priority;
});


Clazz_defineMethod(c$,"interrupt",
function(){
 //not implemented
});

Clazz_defineMethod(c$,"setName",
function(name){
this.name=name;
},"~S");
Clazz_defineMethod(c$,"getName",
function(){
return String.valueOf(this.name);
});
Clazz_defineMethod(c$,"getThreadGroup",
function(){
return this.group;
});
Clazz_overrideMethod(c$,"toString",
function(){
var group=this.getThreadGroup();
if(group!=null){
return"Thread["+this.getName()+","+this.getPriority()+","+group.getName()+"]";
}else{
return"Thread["+this.getName()+","+this.getPriority()+","+""+"]";
}});
Clazz_defineStatics(c$,
"MIN_PRIORITY",1,
"NORM_PRIORITY",5,
"MAX_PRIORITY",10,
"J2S_THREAD",null);
});
Clazz_load(null,"java.lang.ThreadGroup",["java.lang.NullPointerException","$.Thread"],function(){
c$=Clazz_decorateAsClass(function(){
this.parent=null;
this.name=null;
this.maxPriority=0;
Clazz_instantialize(this,arguments);
},java.lang,"ThreadGroup");
Clazz_makeConstructor(c$,
function(){
this.name="system";
this.maxPriority=10;
});
Clazz_makeConstructor(c$,
function(name){
this.construct(Thread.currentThread().getThreadGroup(),name);
},"~S");
Clazz_makeConstructor(c$,
function(parent,name){
if(parent==null){
throw new NullPointerException();
}this.name=name;
this.parent=parent;
this.maxPriority=10;
},"ThreadGroup,~S");
Clazz_defineMethod(c$,"getName",
function(){
return this.name;
});
Clazz_defineMethod(c$,"getParent",
function(){
return this.parent;
});
Clazz_defineMethod(c$,"getMaxPriority",
function(){
return this.maxPriority;
});
});
Clazz_load (["java.io.FilterInputStream"], "java.io.BufferedInputStream", ["java.io.IOException", "java.lang.IndexOutOfBoundsException"], function () {
c$ = Clazz_decorateAsClass (function () {
this.buf = null;
this.count = 0;
this.pos = 0;
this.markpos = -1;
this.marklimit = 0;
Clazz_instantialize (this, arguments);
}, java.io, "BufferedInputStream", java.io.FilterInputStream);
Clazz_defineMethod (c$, "getInIfOpen", 
 function () {
var input = this.$in;
if (input == null) throw  new java.io.IOException ("Stream closed");
return input;
});
Clazz_defineMethod (c$, "getBufIfOpen", 
 function () {
var buffer = this.buf;
if (buffer == null) throw  new java.io.IOException ("Stream closed");
return buffer;
});
Clazz_overrideMethod (c$, "resetStream", 
function () {
});
Clazz_makeConstructor (c$, 
function ($in) {
Clazz_superConstructor (this, java.io.BufferedInputStream, [$in]);
this.buf =  Clazz_newByteArray (8192, 0);
}, "java.io.InputStream");
Clazz_defineMethod (c$, "fill", 
 function () {
var buffer = this.getBufIfOpen ();
if (this.markpos < 0) this.pos = 0;
 else if (this.pos >= buffer.length) if (this.markpos > 0) {
var sz = this.pos - this.markpos;
System.arraycopy (buffer, this.markpos, buffer, 0, sz);
this.pos = sz;
this.markpos = 0;
} else if (buffer.length >= this.marklimit) {
this.markpos = -1;
this.pos = 0;
} else {
var nsz = this.pos * 2;
if (nsz > this.marklimit) nsz = this.marklimit;
var nbuf =  Clazz_newByteArray (nsz, 0);
System.arraycopy (buffer, 0, nbuf, 0, this.pos);
buffer = this.buf = nbuf;
}this.count = this.pos;
var n = this.getInIfOpen ().read (buffer, this.pos, buffer.length - this.pos);
if (n > 0) this.count = n + this.pos;
});
Clazz_overrideMethod (c$, "readByteAsInt", 
function () {
if (this.pos >= this.count) {
this.fill ();
if (this.pos >= this.count) return -1;
}return this.getBufIfOpen ()[this.pos++] & 0xff;
});
Clazz_defineMethod (c$, "read1", 
 function (b, off, len) {
var avail = this.count - this.pos;
if (avail <= 0) {
if (len >= this.getBufIfOpen ().length && this.markpos < 0) {
return this.getInIfOpen ().read (b, off, len);
}this.fill ();
avail = this.count - this.pos;
if (avail <= 0) return -1;
}var cnt = (avail < len) ? avail : len;
System.arraycopy (this.getBufIfOpen (), this.pos, b, off, cnt);
this.pos += cnt;
return cnt;
}, "~A,~N,~N");
Clazz_defineMethod (c$, "read", 
function (b, off, len) {
this.getBufIfOpen ();
if ((off | len | (off + len) | (b.length - (off + len))) < 0) {
throw  new IndexOutOfBoundsException ();
} else if (len == 0) {
return 0;
}var n = 0;
for (; ; ) {
var nread = this.read1 (b, off + n, len - n);
if (nread <= 0) return (n == 0) ? nread : n;
n += nread;
if (n >= len) return n;
var input = this.$in;
if (input != null && input.available () <= 0) return n;
}
}, "~A,~N,~N");
Clazz_overrideMethod (c$, "skip", 
function (n) {
this.getBufIfOpen ();
if (n <= 0) {
return 0;
}var avail = this.count - this.pos;
if (avail <= 0) {
if (this.markpos < 0) return this.getInIfOpen ().skip (n);
this.fill ();
avail = this.count - this.pos;
if (avail <= 0) return 0;
}var skipped = (avail < n) ? avail : n;
this.pos += skipped;
return skipped;
}, "~N");
Clazz_overrideMethod (c$, "available", 
function () {
var n = this.count - this.pos;
var avail = this.getInIfOpen ().available ();
return n > (2147483647 - avail) ? 2147483647 : n + avail;
});
Clazz_overrideMethod (c$, "mark", 
function (readlimit) {
this.marklimit = readlimit;
this.markpos = this.pos;
}, "~N");
Clazz_overrideMethod (c$, "reset", 
function () {
this.getBufIfOpen ();
if (this.markpos < 0) throw  new java.io.IOException ("Resetting to invalid mark");
this.pos = this.markpos;
});
Clazz_overrideMethod (c$, "markSupported", 
function () {
return true;
});
Clazz_overrideMethod (c$, "close", 
function () {
var input = this.$in;
this.$in = null;
if (input != null) input.close ();
return;
});
Clazz_defineStatics (c$,
"DEFAULT_BUFFER_SIZE", 8192);
});
Clazz_load (["java.io.Reader"], "java.io.BufferedReader", ["java.io.IOException", "java.lang.IllegalArgumentException", "$.IndexOutOfBoundsException", "JU.SB"], function () {
c$ = Clazz_decorateAsClass (function () {
this.$in = null;
this.cb = null;
this.nChars = 0;
this.nextChar = 0;
this.markedChar = -1;
this.readAheadLimit = 0;
this.skipLF = false;
this.markedSkipLF = false;
Clazz_instantialize (this, arguments);
}, java.io, "BufferedReader", java.io.Reader);
Clazz_defineMethod (c$, "setSize", 
 function (sz) {
if (sz <= 0) throw  new IllegalArgumentException ("Buffer size <= 0");
this.cb =  Clazz_newCharArray (sz, '\0');
this.nextChar = this.nChars = 0;
}, "~N");
Clazz_makeConstructor (c$, 
function ($in) {
Clazz_superConstructor (this, java.io.BufferedReader, [$in]);
this.$in = $in;
this.setSize (8192);
}, "java.io.Reader");
Clazz_defineMethod (c$, "ensureOpen", 
 function () {
if (this.$in == null) throw  new java.io.IOException ("Stream closed");
});
Clazz_defineMethod (c$, "fill", 
 function () {
var dst;
if (this.markedChar <= -1) {
dst = 0;
} else {
var delta = this.nextChar - this.markedChar;
if (delta >= this.readAheadLimit) {
this.markedChar = -2;
this.readAheadLimit = 0;
dst = 0;
} else {
if (this.readAheadLimit <= this.cb.length) {
System.arraycopy (this.cb, this.markedChar, this.cb, 0, delta);
this.markedChar = 0;
dst = delta;
} else {
var ncb =  Clazz_newCharArray (this.readAheadLimit, '\0');
System.arraycopy (this.cb, this.markedChar, ncb, 0, delta);
this.cb = ncb;
this.markedChar = 0;
dst = delta;
}this.nextChar = this.nChars = delta;
}}var n;
do {
n = this.$in.read (this.cb, dst, this.cb.length - dst);
} while (n == 0);
if (n > 0) {
this.nChars = dst + n;
this.nextChar = dst;
}});
Clazz_defineMethod (c$, "read1", 
 function (cbuf, off, len) {
if (this.nextChar >= this.nChars) {
if (len >= this.cb.length && this.markedChar <= -1 && !this.skipLF) {
return this.$in.read (cbuf, off, len);
}this.fill ();
}if (this.nextChar >= this.nChars) return -1;
if (this.skipLF) {
this.skipLF = false;
if (this.cb[this.nextChar] == '\n') {
this.nextChar++;
if (this.nextChar >= this.nChars) this.fill ();
if (this.nextChar >= this.nChars) return -1;
}}var n = Math.min (len, this.nChars - this.nextChar);
System.arraycopy (this.cb, this.nextChar, cbuf, off, n);
this.nextChar += n;
return n;
}, "~A,~N,~N");
Clazz_defineMethod (c$, "read", 
function (cbuf, off, len) {
{
this.ensureOpen ();
if ((off < 0) || (off > cbuf.length) || (len < 0) || ((off + len) > cbuf.length) || ((off + len) < 0)) {
throw  new IndexOutOfBoundsException ();
} else if (len == 0) {
return 0;
}var n = this.read1 (cbuf, off, len);
if (n <= 0) return n;
while ((n < len) && this.$in.ready ()) {
var n1 = this.read1 (cbuf, off + n, len - n);
if (n1 <= 0) break;
n += n1;
}
return n;
}}, "~A,~N,~N");
Clazz_defineMethod (c$, "readLine1", 
 function (ignoreLF) {
var s = null;
var startChar;
{
this.ensureOpen ();
var omitLF = ignoreLF || this.skipLF;
for (; ; ) {
if (this.nextChar >= this.nChars) this.fill ();
if (this.nextChar >= this.nChars) {
if (s != null && s.length () > 0) return s.toString ();
return null;
}var eol = false;
var c = String.fromCharCode (0);
var i;
if (omitLF && (this.cb[this.nextChar] == '\n')) this.nextChar++;
this.skipLF = false;
omitLF = false;
charLoop : for (i = this.nextChar; i < this.nChars; i++) {
c = this.cb[i];
if ((c == '\n') || (c == '\r')) {
eol = true;
break charLoop;
}}
startChar = this.nextChar;
this.nextChar = i;
if (eol) {
var str;
if (s == null) {
str =  String.instantialize (this.cb, startChar, i - startChar);
} else {
s.appendCB (this.cb, startChar, i - startChar);
str = s.toString ();
}this.nextChar++;
if (c == '\r') {
this.skipLF = true;
}return str;
}if (s == null) s = JU.SB.newN (80);
s.appendCB (this.cb, startChar, i - startChar);
}
}}, "~B");
Clazz_defineMethod (c$, "readLine", 
function () {
return this.readLine1 (false);
});
Clazz_overrideMethod (c$, "skip", 
function (n) {
if (n < 0) {
throw  new IllegalArgumentException ("skip value is negative");
}{
this.ensureOpen ();
var r = n;
while (r > 0) {
if (this.nextChar >= this.nChars) this.fill ();
if (this.nextChar >= this.nChars) break;
if (this.skipLF) {
this.skipLF = false;
if (this.cb[this.nextChar] == '\n') {
this.nextChar++;
}}var d = this.nChars - this.nextChar;
if (r <= d) {
this.nextChar += r;
r = 0;
break;
}r -= d;
this.nextChar = this.nChars;
}
return n - r;
}}, "~N");
Clazz_defineMethod (c$, "ready", 
function () {
{
this.ensureOpen ();
if (this.skipLF) {
if (this.nextChar >= this.nChars && this.$in.ready ()) {
this.fill ();
}if (this.nextChar < this.nChars) {
if (this.cb[this.nextChar] == '\n') this.nextChar++;
this.skipLF = false;
}}return (this.nextChar < this.nChars) || this.$in.ready ();
}});
Clazz_overrideMethod (c$, "markSupported", 
function () {
return true;
});
Clazz_overrideMethod (c$, "mark", 
function (readAheadLimit) {
if (readAheadLimit < 0) {
throw  new IllegalArgumentException ("Read-ahead limit < 0");
}{
this.ensureOpen ();
this.readAheadLimit = readAheadLimit;
this.markedChar = this.nextChar;
this.markedSkipLF = this.skipLF;
}}, "~N");
Clazz_overrideMethod (c$, "reset", 
function () {
{
this.ensureOpen ();
if (this.markedChar < 0) throw  new java.io.IOException ((this.markedChar == -2) ? "Mark invalid" : "Stream not marked");
this.nextChar = this.markedChar;
this.skipLF = this.markedSkipLF;
}});
Clazz_defineMethod (c$, "close", 
function () {
{
if (this.$in == null) return;
this.$in.close ();
this.$in = null;
this.cb = null;
}});
Clazz_defineStatics (c$,
"INVALIDATED", -2,
"UNMARKED", -1,
"DEFAULT_CHAR_BUFFER_SIZE", 8192,
"DEFAULT_EXPECTED_LINE_LENGTH", 80);
});
Clazz_load(["java.io.Writer"],"java.io.BufferedWriter",["java.io.IOException","java.lang.IllegalArgumentException","$.IndexOutOfBoundsException","$.StringIndexOutOfBoundsException"],function(){
c$=Clazz_decorateAsClass(function(){
this.out=null;
this.buf=null;
this.pos=0;
this.lineSeparator="\r\n";
Clazz_instantialize(this,arguments);
},java.io,"BufferedWriter",java.io.Writer);
Clazz_makeConstructor(c$,
function(out){
Clazz_superConstructor(this,java.io.BufferedWriter,[out]);
this.out=out;
this.buf=Clazz_newArray(8192,'\0');
},"java.io.Writer");
Clazz_makeConstructor(c$,
function(out,size){
Clazz_superConstructor(this,java.io.BufferedWriter,[out]);
if(size>0){
this.out=out;
this.buf=Clazz_newArray(size,'\0');
}else{
throw new IllegalArgumentException(("K0058"));
}},"java.io.Writer,~N");
Clazz_defineMethod(c$,"close",
function(){
{
if(this.isOpen()){
this.flush();
this.out.close();
this.buf=null;
this.out=null;
}}});
Clazz_defineMethod(c$,"flush",
function(){
{
if(this.isOpen()){
if(this.pos>0){
this.out.write(this.buf,0,this.pos);
}this.pos=0;
this.out.flush();
}else{
throw new java.io.IOException(("K005d"));
}}});
Clazz_defineMethod(c$,"isOpen",
($fz=function(){
return this.out!=null;
},$fz.isPrivate=true,$fz));
Clazz_defineMethod(c$,"newLine",
function(){
this.write("\r\n",0,"\r\n".length);
});
Clazz_defineMethod(c$,"write",
function(cbuf,offset,count){
{
if(!this.isOpen()){
throw new java.io.IOException(("K005d"));
}if(offset<0||offset>cbuf.length-count||count<0){
throw new IndexOutOfBoundsException();
}if(this.pos==0&&count>=this.buf.length){
this.out.write(cbuf,offset,count);
return;
}var available=this.buf.length-this.pos;
if(count<available){
available=count;
}if(available>0){
System.arraycopy(cbuf,offset,this.buf,this.pos,available);
this.pos+=available;
}if(this.pos==this.buf.length){
this.out.write(this.buf,0,this.buf.length);
this.pos=0;
if(count>available){
offset+=available;
available=count-available;
if(available>=this.buf.length){
this.out.write(cbuf,offset,available);
return;
}System.arraycopy(cbuf,offset,this.buf,this.pos,available);
this.pos+=available;
}}}},"~A,~N,~N");
Clazz_defineMethod(c$,"write",
function(oneChar){
{
if(this.isOpen()){
if(this.pos>=this.buf.length){
this.out.write(this.buf,0,this.buf.length);
this.pos=0;
}this.buf[this.pos++]=String.fromCharCode(oneChar);
}else{
throw new java.io.IOException(("K005d"));
}}},"~N");
Clazz_defineMethod(c$,"write",
function(str,offset,count){
{
if(!this.isOpen()){
throw new java.io.IOException(("K005d"));
}if(count<=0){
return;
}if(offset>str.length-count||offset<0){
throw new StringIndexOutOfBoundsException();
}if(this.pos==0&&count>=this.buf.length){
var chars=Clazz_newArray(count,'\0');
str.getChars(offset,offset+count,chars,0);
this.out.write(chars,0,count);
return;
}var available=this.buf.length-this.pos;
if(count<available){
available=count;
}if(available>0){
str.getChars(offset,offset+available,this.buf,this.pos);
this.pos+=available;
}if(this.pos==this.buf.length){
this.out.write(this.buf,0,this.buf.length);
this.pos=0;
if(count>available){
offset+=available;
available=count-available;
if(available>=this.buf.length){
var chars=Clazz_newArray(count,'\0');
str.getChars(offset,offset+available,chars,0);
this.out.write(chars,0,available);
return;
}str.getChars(offset,offset+available,this.buf,this.pos);
this.pos+=available;
}}}},"~S,~N,~N");
});
Clazz_load (["java.io.InputStream"], "java.io.ByteArrayInputStream", ["java.lang.IndexOutOfBoundsException", "$.NullPointerException"], function () {
c$ = Clazz_decorateAsClass (function () {
this.buf = null;
this.pos = 0;
this.$mark = 0;
this.count = 0;
Clazz_instantialize (this, arguments);
}, java.io, "ByteArrayInputStream", java.io.InputStream);
Clazz_makeConstructor (c$, 
function (buf) {
Clazz_superConstructor (this, java.io.ByteArrayInputStream, []);
this.buf = buf;
this.pos = 0;
this.count = buf.length;
}, "~A");
Clazz_overrideMethod (c$, "readByteAsInt", 
function () {
return (this.pos < this.count) ? (this.buf[this.pos++] & 0xff) : -1;
});
Clazz_defineMethod (c$, "read", 
function (b, off, len) {
if (b == null) {
throw  new NullPointerException ();
} else if (off < 0 || len < 0 || len > b.length - off) {
throw  new IndexOutOfBoundsException ();
}if (this.pos >= this.count) {
return -1;
}var avail = this.count - this.pos;
if (len > avail) {
len = avail;
}if (len <= 0) {
return 0;
}System.arraycopy (this.buf, this.pos, b, off, len);
this.pos += len;
return len;
}, "~A,~N,~N");
Clazz_overrideMethod (c$, "skip", 
function (n) {
var k = this.count - this.pos;
if (n < k) {
k = n < 0 ? 0 : n;
}this.pos += k;
return k;
}, "~N");
Clazz_overrideMethod (c$, "available", 
function () {
return this.count - this.pos;
});
Clazz_overrideMethod (c$, "markSupported", 
function () {
return true;
});
Clazz_overrideMethod (c$, "mark", 
function (readAheadLimit) {
this.$mark = this.pos;
}, "~N");
Clazz_overrideMethod (c$, "resetStream", 
function () {
});
Clazz_overrideMethod (c$, "reset", 
function () {
this.pos = this.$mark;
});
Clazz_overrideMethod (c$, "close", 
function () {
});
});
Clazz_load (["java.io.OutputStream"], "java.io.ByteArrayOutputStream", ["java.lang.IllegalArgumentException", "$.IndexOutOfBoundsException", "$.OutOfMemoryError"], function () {
c$ = Clazz_decorateAsClass (function () {
this.buf = null;
this.count = 0;
Clazz_instantialize (this, arguments);
}, java.io, "ByteArrayOutputStream", java.io.OutputStream);
Clazz_makeConstructor (c$, 
function () {
this.construct (32);
});
Clazz_makeConstructor (c$, 
function (size) {
Clazz_superConstructor (this, java.io.ByteArrayOutputStream, []);
if (size < 0) {
throw  new IllegalArgumentException ("Negative initial size: " + size);
}this.buf =  Clazz_newByteArray (size, 0);
}, "~N");
Clazz_defineMethod (c$, "ensureCapacity", 
 function (minCapacity) {
if (minCapacity - this.buf.length > 0) this.grow (minCapacity);
}, "~N");
Clazz_defineMethod (c$, "grow", 
 function (minCapacity) {
var oldCapacity = this.buf.length;
var newCapacity = oldCapacity << 1;
if (newCapacity - minCapacity < 0) newCapacity = minCapacity;
if (newCapacity < 0) {
if (minCapacity < 0) throw  new OutOfMemoryError ();
newCapacity = minCapacity;
}this.buf = java.io.ByteArrayOutputStream.arrayCopyByte (this.buf, newCapacity);
}, "~N");
c$.arrayCopyByte = Clazz_defineMethod (c$, "arrayCopyByte", 
 function (array, newLength) {
var t =  Clazz_newByteArray (newLength, 0);
System.arraycopy (array, 0, t, 0, array.length < newLength ? array.length : newLength);
return t;
}, "~A,~N");
Clazz_overrideMethod (c$, "writeByteAsInt", 
function (b) {
this.ensureCapacity (this.count + 1);
this.buf[this.count] = b;
this.count += 1;
}, "~N");
Clazz_defineMethod (c$, "write", 
function (b, off, len) {
if ((off < 0) || (off > b.length) || (len < 0) || ((off + len) - b.length > 0)) {
throw  new IndexOutOfBoundsException ();
}this.ensureCapacity (this.count + len);
System.arraycopy (b, off, this.buf, this.count, len);
this.count += len;
}, "~A,~N,~N");
Clazz_defineMethod (c$, "writeTo", 
function (out) {
out.write (this.buf, 0, this.count);
}, "java.io.OutputStream");
Clazz_defineMethod (c$, "reset", 
function () {
this.count = 0;
});
Clazz_defineMethod (c$, "toByteArray", 
function () {
return (this.count == this.buf.length ? this.buf : java.io.ByteArrayOutputStream.arrayCopyByte (this.buf, this.count));
});
Clazz_defineMethod (c$, "size", 
function () {
return this.count;
});
Clazz_overrideMethod (c$, "toString", 
function () {
return  String.instantialize (this.buf, 0, this.count);
});
Clazz_overrideMethod (c$, "close", 
function () {
});
});
Clazz_load (["java.io.InputStream"], "java.io.FilterInputStream", null, function () {
c$ = Clazz_decorateAsClass (function () {
this.$in = null;
Clazz_instantialize (this, arguments);
}, java.io, "FilterInputStream", java.io.InputStream);
Clazz_makeConstructor (c$, 
function ($in) {
Clazz_superConstructor (this, java.io.FilterInputStream, []);
this.$in = $in;
}, "java.io.InputStream");
Clazz_defineMethod (c$, "readByteAsInt", 
function () {
return this.$in.readByteAsInt ();
});
Clazz_defineMethod (c$, "read", 
function (b, off, len) {
return this.$in.read (b, off, len);
}, "~A,~N,~N");
Clazz_defineMethod (c$, "skip", 
function (n) {
return this.$in.skip (n);
}, "~N");
Clazz_defineMethod (c$, "available", 
function () {
return this.$in.available ();
});
Clazz_defineMethod (c$, "close", 
function () {
this.$in.close ();
});
Clazz_defineMethod (c$, "mark", 
function (readlimit) {
this.$in.mark (readlimit);
}, "~N");
Clazz_defineMethod (c$, "reset", 
function () {
this.$in.reset ();
});
Clazz_defineMethod (c$, "markSupported", 
function () {
return this.$in.markSupported ();
});
});
Clazz_load (null, "java.io.InputStream", ["java.io.IOException", "java.lang.IndexOutOfBoundsException", "$.NullPointerException"], function () {
c$ = Clazz_declareType (java.io, "InputStream");
Clazz_defineMethod (c$, "read", 
function (b, off, len) {
if (b == null) {
throw  new NullPointerException ();
} else if (off < 0 || len < 0 || len > b.length - off) {
throw  new IndexOutOfBoundsException ();
} else if (len == 0) {
return 0;
}var c = this.readByteAsInt ();
if (c == -1) {
return -1;
}b[off] = c;
var i = 1;
try {
for (; i < len; i++) {
c = this.readByteAsInt ();
if (c == -1) {
break;
}b[off + i] = c;
}
} catch (ee) {
if (Clazz_exceptionOf (ee, java.io.IOException)) {
} else {
throw ee;
}
}
return i;
}, "~A,~N,~N");
Clazz_defineMethod (c$, "skip", 
function (n) {
var remaining = n;
var nr;
if (java.io.InputStream.skipBuffer == null) java.io.InputStream.skipBuffer =  Clazz_newByteArray (2048, 0);
var localSkipBuffer = java.io.InputStream.skipBuffer;
if (n <= 0) {
return 0;
}while (remaining > 0) {
nr = this.read (localSkipBuffer, 0, Math.min (2048, remaining));
if (nr < 0) {
break;
}remaining -= nr;
}
return n - remaining;
}, "~N");
Clazz_defineMethod (c$, "available", 
function () {
return 0;
});
Clazz_defineMethod (c$, "close", 
function () {
});
Clazz_defineMethod (c$, "mark", 
function (readlimit) {
}, "~N");
Clazz_defineMethod (c$, "reset", 
function () {
throw  new java.io.IOException ("mark/reset not supported");
});
Clazz_defineMethod (c$, "markSupported", 
function () {
return false;
});
Clazz_defineMethod (c$, "resetStream", 
function () {
});
Clazz_defineStatics (c$,
"SKIP_BUFFER_SIZE", 2048,
"skipBuffer", null);
});
Clazz_load (["java.io.Reader"], "java.io.InputStreamReader", ["java.lang.NullPointerException"], function () {
c$ = Clazz_decorateAsClass (function () {
this.$in = null;
this.isOpen = true;
this.charsetName = null;
this.isUTF8 = false;
this.bytearr = null;
this.pos = 0;
Clazz_instantialize (this, arguments);
}, java.io, "InputStreamReader", java.io.Reader);
Clazz_makeConstructor (c$, 
function ($in, charsetName) {
Clazz_superConstructor (this, java.io.InputStreamReader, [$in]);
this.$in = $in;
this.charsetName = charsetName;
if (!(this.isUTF8 = "UTF-8".equals (charsetName)) && !"ISO-8859-1".equals (charsetName)) throw  new NullPointerException ("charsetName");
}, "java.io.InputStream,~S");
Clazz_defineMethod (c$, "getEncoding", 
function () {
return this.charsetName;
});
Clazz_overrideMethod (c$, "read", 
function (cbuf, offset, length) {
if (this.bytearr == null || this.bytearr.length < length) this.bytearr =  Clazz_newByteArray (length, 0);
var c;
var char2;
var char3;
var byteCount = 0;
var charCount = offset;
var byteLen = this.$in.read (this.bytearr, this.pos, length - this.pos);
var nAvail = this.$in.available ();
if (byteLen < 0) return -1;
var nMax = byteLen;
while (byteCount < nMax) {
c = this.bytearr[byteCount] & 0xff;
if (this.isUTF8) switch (c >> 4) {
case 0xC:
case 0xD:
if (byteCount + 1 >= byteLen) {
if (nAvail >= 1) {
nMax = byteCount;
continue;
}} else if (((char2 = this.bytearr[byteCount + 1]) & 0xC0) == 0x80) {
cbuf[charCount++] = String.fromCharCode (((c & 0x1F) << 6) | (char2 & 0x3F));
byteCount += 2;
continue;
}this.isUTF8 = false;
break;
case 0xE:
if (byteCount + 2 >= byteLen) {
if (nAvail >= 2) {
nMax = byteCount;
continue;
}} else if (((char2 = this.bytearr[byteCount + 1]) & 0xC0) == 0x80 && ((char3 = this.bytearr[byteCount + 2]) & 0xC0) == 0x80) {
cbuf[charCount++] = String.fromCharCode (((c & 0x0F) << 12) | ((char2 & 0x3F) << 6) | (char3 & 0x3F));
byteCount += 3;
continue;
}this.isUTF8 = false;
break;
}
byteCount++;
cbuf[charCount++] = String.fromCharCode (c);
}
this.pos = byteLen - byteCount;
for (var i = 0; i < this.pos; i++) {
this.bytearr[i] = this.bytearr[byteCount++];
}
return charCount - offset;
}, "~A,~N,~N");
Clazz_overrideMethod (c$, "ready", 
function () {
return this.isOpen;
});
Clazz_overrideMethod (c$, "close", 
function () {
this.$in.close ();
this.isOpen = false;
});
});
Clazz_load (["java.io.Closeable", "$.Flushable"], "java.io.OutputStream", ["java.lang.IndexOutOfBoundsException", "$.NullPointerException"], function () {
c$ = Clazz_declareType (java.io, "OutputStream", null, [java.io.Closeable, java.io.Flushable]);
Clazz_defineMethod (c$, "write", 
function (b, off, len) {
if (b == null) {
throw  new NullPointerException ();
} else if ((off < 0) || (off > b.length) || (len < 0) || ((off + len) > b.length) || ((off + len) < 0)) {
throw  new IndexOutOfBoundsException ();
} else if (len == 0) {
return;
}for (var i = 0; i < len; i++) {
this.writeByteAsInt (b[off + i]);
}
}, "~A,~N,~N");
Clazz_overrideMethod (c$, "flush", 
function () {
});
Clazz_overrideMethod (c$, "close", 
function () {
});
});
Clazz_load (["java.io.Closeable"], "java.io.Reader", ["java.io.IOException", "java.lang.IllegalArgumentException", "$.NullPointerException"], function () {
c$ = Clazz_decorateAsClass (function () {
this.lock = null;
this.skipBuffer = null;
Clazz_instantialize (this, arguments);
}, java.io, "Reader", null, java.io.Closeable);
Clazz_makeConstructor (c$, 
function (lock) {
if (lock == null) {
throw  new NullPointerException ();
}this.lock = lock;
}, "~O");
Clazz_defineMethod (c$, "skip", 
function (n) {
if (n < 0) throw  new IllegalArgumentException ("skip value is negative");
var nn = Math.min (n, 8192);
{
if ((this.skipBuffer == null) || (this.skipBuffer.length < nn)) this.skipBuffer =  Clazz_newCharArray (nn, '\0');
var r = n;
while (r > 0) {
var nc = this.read (this.skipBuffer, 0, Math.min (r, nn));
if (nc == -1) break;
r -= nc;
}
return n - r;
}}, "~N");
Clazz_defineMethod (c$, "ready", 
function () {
return false;
});
Clazz_defineMethod (c$, "markSupported", 
function () {
return false;
});
Clazz_defineMethod (c$, "mark", 
function (readAheadLimit) {
throw  new java.io.IOException ("mark() not supported");
}, "~N");
Clazz_defineMethod (c$, "reset", 
function () {
throw  new java.io.IOException ("reset() not supported");
});
Clazz_defineStatics (c$,
"MAX_SKIP_BUFFE_SIZE", 8192);
});
Clazz_load (["java.io.Reader"], "java.io.StringReader", ["java.io.IOException", "java.lang.IllegalArgumentException", "$.IndexOutOfBoundsException"], function () {
c$ = Clazz_decorateAsClass (function () {
this.str = null;
this.length = 0;
this.next = 0;
this.$mark = 0;
Clazz_instantialize (this, arguments);
}, java.io, "StringReader", java.io.Reader);
Clazz_makeConstructor (c$, 
function (s) {
Clazz_superConstructor (this, java.io.StringReader, [s]);
this.str = s;
this.length = s.length;
}, "~S");
Clazz_defineMethod (c$, "ensureOpen", 
 function () {
if (this.str == null) throw  new java.io.IOException ("Stream closed");
});
Clazz_overrideMethod (c$, "read", 
function (cbuf, off, len) {
{
this.ensureOpen ();
if ((off < 0) || (off > cbuf.length) || (len < 0) || ((off + len) > cbuf.length) || ((off + len) < 0)) {
throw  new IndexOutOfBoundsException ();
} else if (len == 0) {
return 0;
}if (this.next >= this.length) return -1;
var n = Math.min (this.length - this.next, len);
this.str.getChars (this.next, this.next + n, cbuf, off);
this.next += n;
return n;
}}, "~A,~N,~N");
Clazz_overrideMethod (c$, "skip", 
function (ns) {
{
this.ensureOpen ();
if (this.next >= this.length) return 0;
var n = Math.min (this.length - this.next, ns);
n = Math.max (-this.next, n);
this.next += n;
return n;
}}, "~N");
Clazz_overrideMethod (c$, "ready", 
function () {
{
this.ensureOpen ();
return true;
}});
Clazz_overrideMethod (c$, "markSupported", 
function () {
return true;
});
Clazz_overrideMethod (c$, "mark", 
function (readAheadLimit) {
if (readAheadLimit < 0) {
throw  new IllegalArgumentException ("Read-ahead limit < 0");
}{
this.ensureOpen ();
this.$mark = this.next;
}}, "~N");
Clazz_overrideMethod (c$, "reset", 
function () {
{
this.ensureOpen ();
this.next = this.$mark;
}});
Clazz_overrideMethod (c$, "close", 
function () {
this.str = null;
});
});
Clazz_load(["java.io.Closeable","$.Flushable","java.lang.Appendable"],"java.io.Writer",["java.lang.NullPointerException","$.StringIndexOutOfBoundsException"],function(){
c$=Clazz_decorateAsClass(function(){
this.lock=null;
Clazz_instantialize(this,arguments);
},java.io,"Writer",null,[Appendable,java.io.Closeable,java.io.Flushable]);
Clazz_makeConstructor(c$,
function(){
this.lock=this;
});
Clazz_makeConstructor(c$,
function(lock){
if(lock!=null){
this.lock=lock;
}else{
throw new NullPointerException();
}},"~O");
Clazz_defineMethod(c$,"write",
function(buf){
this.write(buf,0,buf.length);
},"~A");
Clazz_defineMethod(c$,"write",
function(oneChar){
{
var oneCharArray=Clazz_newArray(1,'\0');
oneCharArray[0]=String.fromCharCode(oneChar);
this.write(oneCharArray);
}},"~N");
Clazz_defineMethod(c$,"write",
function(str){
var buf=Clazz_newArray(str.length,'\0');
str.getChars(0,buf.length,buf,0);
{
this.write(buf);
}},"~S");
Clazz_defineMethod(c$,"write",
function(str,offset,count){
if(count>=0){
var buf=Clazz_newArray(count,'\0');
str.getChars(offset,offset+count,buf,0);
{
this.write(buf);
}}else{
throw new StringIndexOutOfBoundsException();
}},"~S,~N,~N");
Clazz_defineMethod(c$,"append",
function(c){
this.write(c.charCodeAt(0));
return this;
},"~N");
Clazz_defineMethod(c$,"append",
function(csq){
if(null==csq){
this.write("null");
}else{
this.write(csq.toString());
}return this;
},"CharSequence");
Clazz_defineMethod(c$,"append",
function(csq,start,end){
if(null==csq){
this.write("null".substring(start,end));
}else{
this.write(csq.subSequence(start,end).toString());
}return this;
},"CharSequence,~N,~N");
Clazz_defineStatics(c$,
"TOKEN_NULL","null");
});
Clazz_declarePackage ("java.net");
Clazz_load (["java.io.IOException"], "java.net.MalformedURLException", null, function () {
c$ = Clazz_declareType (java.net, "MalformedURLException", java.io.IOException);
Clazz_makeConstructor (c$, 
function () {
Clazz_superConstructor (this, java.net.MalformedURLException, []);
});
});
Clazz_declarePackage ("java.net");
Clazz_load (["java.io.IOException"], "java.net.UnknownServiceException", null, function () {
c$ = Clazz_declareType (java.net, "UnknownServiceException", java.io.IOException);
Clazz_makeConstructor (c$, 
function () {
Clazz_superConstructor (this, java.net.UnknownServiceException, []);
});
});
Clazz_declarePackage ("java.net");
Clazz_load (["java.util.Hashtable"], "java.net.URL", ["java.lang.Character", "$.Error", "java.net.MalformedURLException"], function () {
c$ = Clazz_decorateAsClass (function () {
this.protocol = null;
this.host = null;
this.port = -1;
this.file = null;
this.query = null;
this.authority = null;
this.path = null;
this.userInfo = null;
this.ref = null;
this.handler = null;
this.$hashCode = -1;
Clazz_instantialize (this, arguments);
}, java.net, "URL");
Clazz_makeConstructor (c$, 
function (context, spec, handler) {
{
switch (arguments.length) {
case 1:
spec = context;context = handler = null;
break;
case 2:
handler = null;
break;
case 3:
if (context == null || Clazz_instanceOf(context, java.net.URL))
break;
default:
alert("java.net.URL constructor format not supported");
break;
}
context && context.valueOf && context.valueOf() == null && (context = null);
}var original = spec;
var i;
var limit;
var c;
var start = 0;
var newProtocol = null;
var aRef = false;
var isRelative = false;
try {
limit = spec.length;
while ((limit > 0) && (spec.charAt (limit - 1) <= ' ')) {
limit--;
}
while ((start < limit) && (spec.charAt (start) <= ' ')) {
start++;
}
if (spec.regionMatches (true, start, "url:", 0, 4)) {
start += 4;
}if (start < spec.length && spec.charAt (start) == '#') {
aRef = true;
}for (i = start; !aRef && (i < limit) && ((c = spec.charCodeAt (i)) != 47); i++) {
if (c == 58) {
var s = spec.substring (start, i).toLowerCase ();
if (this.isValidProtocol (s)) {
newProtocol = s;
start = i + 1;
}break;
}}
this.protocol = newProtocol;
if ((context != null) && ((newProtocol == null) || newProtocol.equalsIgnoreCase (context.protocol))) {
if (handler == null) {
handler = context.handler;
}if (context.path != null && context.path.startsWith ("/")) newProtocol = null;
if (newProtocol == null) {
this.protocol = context.protocol;
this.authority = context.authority;
this.userInfo = context.userInfo;
this.host = context.host;
this.port = context.port;
this.file = context.file;
this.path = context.path;
isRelative = true;
}}if (this.protocol == null) {
throw  new java.net.MalformedURLException ("no protocol: " + original);
}if (handler == null && (handler = java.net.URL.getURLStreamHandler (this.protocol)) == null) {
throw  new java.net.MalformedURLException ("unknown protocol: " + this.protocol);
}this.handler = handler;
i = spec.indexOf ('#', start);
if (i >= 0) {
this.ref = spec.substring (i + 1, limit);
limit = i;
}if (isRelative && start == limit) {
this.query = context.query;
if (this.ref == null) {
this.ref = context.ref;
}}handler.parseURL (this, spec, start, limit);
} catch (e$$) {
if (Clazz_exceptionOf (e$$, java.net.MalformedURLException)) {
var e = e$$;
{
throw e;
}
} else if (Clazz_exceptionOf (e$$, Exception)) {
var e = e$$;
{
var exception =  new java.net.MalformedURLException (e.getMessage ());
exception.initCause (e);
throw exception;
}
} else {
throw e$$;
}
}
}, "java.net.URL,~S,java.net.URLStreamHandler");
Clazz_defineMethod (c$, "isValidProtocol", 
 function (protocol) {
var len = protocol.length;
if (len < 1) return false;
var c = protocol.charAt (0);
if (!Character.isLetter (c)) return false;
for (var i = 1; i < len; i++) {
c = protocol.charAt (i);
if (!Character.isLetterOrDigit (c) && c != '.' && c != '+' && c != '-') {
return false;
}}
return true;
}, "~S");
Clazz_defineMethod (c$, "set5", 
function (protocol, host, port, file, ref) {
{
this.protocol = protocol;
this.host = host;
this.authority = port == -1 ? host : host + ":" + port;
this.port = port;
this.file = file;
this.ref = ref;
this.$hashCode = -1;
var q = file.lastIndexOf ('?');
if (q != -1) {
this.query = file.substring (q + 1);
this.path = file.substring (0, q);
} else this.path = file;
}}, "~S,~S,~N,~S,~S");
Clazz_defineMethod (c$, "set", 
function (protocol, host, port, authority, userInfo, path, query, ref) {
{
this.protocol = protocol;
this.host = host;
this.port = port;
this.file = query == null ? path : path + "?" + query;
this.userInfo = userInfo;
this.path = path;
this.ref = ref;
this.$hashCode = -1;
this.query = query;
this.authority = authority;
}}, "~S,~S,~N,~S,~S,~S,~S,~S");
Clazz_defineMethod (c$, "getQuery", 
function () {
return this.query;
});
Clazz_defineMethod (c$, "getPath", 
function () {
return this.path;
});
Clazz_defineMethod (c$, "getUserInfo", 
function () {
return this.userInfo;
});
Clazz_defineMethod (c$, "getAuthority", 
function () {
return this.authority;
});
Clazz_defineMethod (c$, "getPort", 
function () {
return this.port;
});
Clazz_defineMethod (c$, "getDefaultPort", 
function () {
return this.handler.getDefaultPort ();
});
Clazz_defineMethod (c$, "getProtocol", 
function () {
return this.protocol;
});
Clazz_defineMethod (c$, "getHost", 
function () {
return this.host;
});
Clazz_defineMethod (c$, "getFile", 
function () {
return this.file;
});
Clazz_defineMethod (c$, "getRef", 
function () {
return this.ref;
});
Clazz_overrideMethod (c$, "equals", 
function (obj) {
if (!(Clazz_instanceOf (obj, java.net.URL))) return false;
var u2 = obj;
return this.handler.equals2 (this, u2);
}, "~O");
Clazz_overrideMethod (c$, "hashCode", 
function () {
if (this.$hashCode != -1) return this.$hashCode;
this.$hashCode = this.handler.hashCode (this);
return this.$hashCode;
});
Clazz_defineMethod (c$, "sameFile", 
function (other) {
return this.handler.sameFile (this, other);
}, "java.net.URL");
Clazz_overrideMethod (c$, "toString", 
function () {
return this.toExternalForm ();
});
Clazz_defineMethod (c$, "toExternalForm", 
function () {
return this.handler.toExternalForm (this);
});
Clazz_defineMethod (c$, "openConnection", 
function () {
return this.handler.openConnection (this);
});
Clazz_defineMethod (c$, "openStream", 
function () {
return this.openConnection ().getInputStream ();
});
Clazz_defineMethod (c$, "getContent", 
function () {
return this.openConnection ().getInputStream ();
});
c$.setURLStreamHandlerFactory = Clazz_defineMethod (c$, "setURLStreamHandlerFactory", 
function (fac) {
{
if (java.net.URL.factory != null) {
throw  new Error ("factory already defined");
}var security = System.getSecurityManager ();
if (security != null) {
security.checkSetFactory ();
}java.net.URL.handlers.clear ();
java.net.URL.factory = fac;
}}, "java.net.URLStreamHandlerFactory");
c$.getURLStreamHandler = Clazz_defineMethod (c$, "getURLStreamHandler", 
function (protocol) {
var handler = java.net.URL.handlers.get (protocol);
if (handler == null) {
if (java.net.URL.factory != null) {
handler = java.net.URL.factory.createURLStreamHandler (protocol);
}}return handler;
}, "~S");
Clazz_defineStatics (c$,
"factory", null);
c$.handlers = c$.prototype.handlers =  new java.util.Hashtable ();
c$.streamHandlerLock = c$.prototype.streamHandlerLock =  new Clazz._O ();
});
Clazz_declarePackage ("java.net");
Clazz_load (null, "java.net.URLConnection", ["java.lang.IllegalStateException", "$.NullPointerException", "java.net.UnknownServiceException", "JU.Lst"], function () {
c$ = Clazz_decorateAsClass (function () {
this.url = null;
this.doInput = true;
this.doOutput = false;
this.connected = false;
this.requests = null;
Clazz_instantialize (this, arguments);
}, java.net, "URLConnection");
Clazz_defineMethod (c$, "setDoInput", 
function (doinput) {
if (this.connected) throw  new IllegalStateException ("Already connected");
this.doInput = doinput;
}, "~B");
Clazz_defineMethod (c$, "getDoInput", 
function () {
return this.doInput;
});
Clazz_defineMethod (c$, "setDoOutput", 
function (dooutput) {
if (this.connected) throw  new IllegalStateException ("Already connected");
this.doOutput = dooutput;
}, "~B");
Clazz_defineMethod (c$, "getDoOutput", 
function () {
return this.doOutput;
});
Clazz_makeConstructor (c$, 
function (url) {
this.url = url;
}, "java.net.URL");
Clazz_defineMethod (c$, "getURL", 
function () {
return this.url;
});
Clazz_defineMethod (c$, "getInputStream", 
function () {
throw  new java.net.UnknownServiceException ("protocol doesn't support input");
});
Clazz_defineMethod (c$, "getOutputStream", 
function () {
throw  new java.net.UnknownServiceException ("protocol doesn't support output");
});
Clazz_defineMethod (c$, "setRequestProperty", 
function (key, value) {
if (this.connected) throw  new IllegalStateException ("Already connected");
if (key == null) throw  new NullPointerException ("key is null");
if (this.requests == null) this.requests =  new JU.Lst ();
for (var i = this.requests.size (); --i >= 0; ) if (this.requests.get (i)[0].equals (key)) {
this.requests.get (i)[1] = value;
return;
}
this.requests.addLast ( Clazz_newArray (-1, [key, value]));
}, "~S,~S");
});
Clazz_declarePackage("java.net");
c$=Clazz_declareType(java.net,"URLEncoder");
c$.encode=Clazz_defineMethod(c$,"encode",
function(s){
return encodeURIComponent(arguments[0]);
},"~S");
c$.encode=Clazz_defineMethod(c$,"encode",
function(s,enc){
return encodeURIComponent(arguments[0]);
},"~S,~S");
Clazz_defineStatics(c$,
"digits","0123456789ABCDEF");
Clazz_declarePackage ("java.net");
Clazz_load (null, "java.net.URLStreamHandler", ["java.lang.IllegalArgumentException", "$.SecurityException", "$.UnsupportedOperationException"], function () {
c$ = Clazz_declareType (java.net, "URLStreamHandler");
Clazz_defineMethod (c$, "openConnectionProxy", 
function (u, p) {
throw  new UnsupportedOperationException ("Method not implemented.");
}, "java.net.URL,java.net.Proxy");
Clazz_defineMethod (c$, "parseURL", 
function (u, spec, start, limit) {
var protocol = u.getProtocol ();
var authority = u.getAuthority ();
var userInfo = u.getUserInfo ();
var host = u.getHost ();
var port = u.getPort ();
var path = u.getPath ();
var query = u.getQuery ();
var ref = u.getRef ();
var isRelPath = false;
var queryOnly = false;
if (start < limit) {
var queryStart = spec.indexOf ('?');
queryOnly = queryStart == start;
if ((queryStart != -1) && (queryStart < limit)) {
query = spec.substring (queryStart + 1, limit);
if (limit > queryStart) limit = queryStart;
spec = spec.substring (0, queryStart);
}}var i = 0;
var isUNCName = (start <= limit - 4) && (spec.charAt (start) == '/') && (spec.charAt (start + 1) == '/') && (spec.charAt (start + 2) == '/') && (spec.charAt (start + 3) == '/');
if (!isUNCName && (start <= limit - 2) && (spec.charAt (start) == '/') && (spec.charAt (start + 1) == '/')) {
start += 2;
i = spec.indexOf ('/', start);
if (i < 0) {
i = spec.indexOf ('?', start);
if (i < 0) i = limit;
}host = authority = spec.substring (start, i);
var ind = authority.indexOf ('@');
if (ind != -1) {
userInfo = authority.substring (0, ind);
host = authority.substring (ind + 1);
} else {
userInfo = null;
}if (host != null) {
if (host.length > 0 && (host.charAt (0) == '[')) {
throw  new IllegalArgumentException ("Invalid host: " + host);
}ind = host.indexOf (':');
port = -1;
if (ind >= 0) {
if (host.length > (ind + 1)) {
port = Integer.parseInt (host.substring (ind + 1));
}host = host.substring (0, ind);
}} else {
host = "";
}if (port < -1) throw  new IllegalArgumentException ("Invalid port number :" + port);
start = i;
if (authority.length > 0) path = "";
}if (host == null) {
host = "";
}if (start < limit) {
if (spec.charAt (start) == '/') {
path = spec.substring (start, limit);
} else if (path != null && path.length > 0) {
isRelPath = true;
var ind = path.lastIndexOf ('/');
var seperator = "";
if (ind == -1 && authority != null) seperator = "/";
path = path.substring (0, ind + 1) + seperator + spec.substring (start, limit);
} else {
var seperator = (authority != null) ? "/" : "";
path = seperator + spec.substring (start, limit);
}} else if (queryOnly && path != null) {
var ind = path.lastIndexOf ('/');
if (ind < 0) ind = 0;
path = path.substring (0, ind) + "/";
}if (path == null) path = "";
if (isRelPath) {
while ((i = path.indexOf ("/./")) >= 0) {
path = path.substring (0, i) + path.substring (i + 2);
}
i = 0;
while ((i = path.indexOf ("/../", i)) >= 0) {
if (i > 0 && (limit = path.lastIndexOf ('/', i - 1)) >= 0 && (path.indexOf ("/../", limit) != 0)) {
path = path.substring (0, limit) + path.substring (i + 3);
i = 0;
} else {
i = i + 3;
}}
while (path.endsWith ("/..")) {
i = path.indexOf ("/..");
if ((limit = path.lastIndexOf ('/', i - 1)) >= 0) {
path = path.substring (0, limit + 1);
} else {
break;
}}
if (path.startsWith ("./") && path.length > 2) path = path.substring (2);
if (path.endsWith ("/.")) path = path.substring (0, path.length - 1);
}this.setURL (u, protocol, host, port, authority, userInfo, path, query, ref);
}, "java.net.URL,~S,~N,~N");
Clazz_defineMethod (c$, "getDefaultPort", 
function () {
return -1;
});
Clazz_defineMethod (c$, "equals2", 
function (u1, u2) {
var ref1 = u1.getRef ();
var ref2 = u2.getRef ();
return (ref1 === ref2 || (ref1 != null && ref1.equals (ref2))) && this.sameFile (u1, u2);
}, "java.net.URL,java.net.URL");
Clazz_defineMethod (c$, "hashCode", 
function (u) {
var h = 0;
var protocol = u.getProtocol ();
if (protocol != null) h += protocol.hashCode ();
h += u.toString ().hashCode ();
var file = u.getFile ();
if (file != null) h += file.hashCode ();
if (u.getPort () == -1) h += this.getDefaultPort ();
 else h += u.getPort ();
var ref = u.getRef ();
if (ref != null) h += ref.hashCode ();
return h;
}, "java.net.URL");
Clazz_defineMethod (c$, "sameFile", 
function (u1, u2) {
if (!((u1.getProtocol () === u2.getProtocol ()) || (u1.getProtocol () != null && u1.getProtocol ().equalsIgnoreCase (u2.getProtocol ())))) return false;
if (!(u1.getFile () === u2.getFile () || (u1.getFile () != null && u1.getFile ().equals (u2.getFile ())))) return false;
var port1;
var port2;
port1 = (u1.getPort () != -1) ? u1.getPort () : u1.handler.getDefaultPort ();
port2 = (u2.getPort () != -1) ? u2.getPort () : u2.handler.getDefaultPort ();
if (port1 != port2) return false;
if (!this.hostsEqual (u1, u2)) return false;
return true;
}, "java.net.URL,java.net.URL");
Clazz_defineMethod (c$, "hostsEqual", 
function (u1, u2) {
if (u1.getHost () != null && u2.getHost () != null) return u1.getHost ().equalsIgnoreCase (u2.getHost ());
return u1.getHost () == null && u2.getHost () == null;
}, "java.net.URL,java.net.URL");
Clazz_defineMethod (c$, "toExternalForm", 
function (u) {
return "";
}, "java.net.URL");
Clazz_defineMethod (c$, "setURL", 
function (u, protocol, host, port, authority, userInfo, path, query, ref) {
if (this !== u.handler) {
throw  new SecurityException ("handler for url different from this handler");
}u.set (u.getProtocol (), host, port, authority, userInfo, path, query, ref);
}, "java.net.URL,~S,~S,~N,~S,~S,~S,~S,~S");
Clazz_defineMethod (c$, "setURLDeprecated", 
function (u, protocol, host, port, file, ref) {
var authority = null;
var userInfo = null;
if (host != null && host.length != 0) {
authority = (port == -1) ? host : host + ":" + port;
var at = host.lastIndexOf ('@');
if (at != -1) {
userInfo = host.substring (0, at);
host = host.substring (at + 1);
}}var path = null;
var query = null;
if (file != null) {
var q = file.lastIndexOf ('?');
if (q != -1) {
query = file.substring (q + 1);
path = file.substring (0, q);
} else path = file;
}this.setURL (u, protocol, host, port, authority, userInfo, path, query, ref);
}, "java.net.URL,~S,~S,~N,~S,~S");
});
Clazz_declarePackage ("java.net");
Clazz_declareInterface (java.net, "URLStreamHandlerFactory");
Clazz_declarePackage("java.text");
c$=Clazz_decorateAsClass(function(){
this.pattern=null;
Clazz_instantialize(this,arguments);
},java.text,"MessageFormat");
Clazz_makeConstructor(c$,
function(pattern){
this.pattern=pattern;
},"~S");
Clazz_makeConstructor(c$,
function(pattern,locale){
this.pattern=pattern;
},"~S,java.util.Locale");
c$.format=Clazz_defineMethod(c$,"format",
function(pattern,args){
return pattern.replace(/\{(\d+)\}/g,function($0,$1){
var i=parseInt($1);
if(args==null)return null;
return args[i];
});
},"~S,~A");
Clazz_defineMethod(c$,"format",
function(obj){
return java.text.MessageFormat.format(this.pattern,[obj]);
},"~O");
Clazz_load(null,"java.util.Random",["java.lang.IllegalArgumentException"],function(){
c$=Clazz_decorateAsClass(function(){
this.haveNextNextGaussian=false;
this.seed=0;
this.nextNextGaussian=0;
Clazz_instantialize(this,arguments);
},java.util,"Random",null,java.io.Serializable);
Clazz_makeConstructor(c$,
function(){
this.setSeed(System.currentTimeMillis());
});
Clazz_makeConstructor(c$,
function(seed){
this.setSeed(seed);
},"~N");
Clazz_defineMethod(c$,"next",
function(bits){
this.seed=(this.seed*25214903917+0xb)&(281474976710655);
return(this.seed>>>(48-bits));
},"~N");
Clazz_defineMethod(c$,"nextBoolean",
function(){
return Math.random()>0.5;
});
Clazz_defineMethod(c$,"nextBytes",
function(buf){
for(var i=0;i<bytes.length;i++){
bytes[i]=Math.round(0x100*Math.random());
}
},"~A");
Clazz_defineMethod(c$,"nextDouble",
function(){
return Math.random();
});
Clazz_defineMethod(c$,"nextFloat",
function(){
return Math.random();
});
Clazz_defineMethod(c$,"nextGaussian",
function(){
if(this.haveNextNextGaussian){
this.haveNextNextGaussian=false;
return this.nextNextGaussian;
}var v1;
var v2;
var s;
do{
v1=2*this.nextDouble()-1;
v2=2*this.nextDouble()-1;
s=v1*v1+v2*v2;
}while(s>=1);
var norm=Math.sqrt(-2*Math.log(s)/s);
this.nextNextGaussian=v2*norm;
this.haveNextNextGaussian=true;
return v1*norm;
});
Clazz_defineMethod(c$,"nextInt",
function(){
return Math.ceil(0xffff*Math.random())-0x8000;
});
Clazz_defineMethod(c$,"nextInt",
function(n){
if(n>0){
n = Math.min(n, 31);
return Math.floor((2 << (n - 1)) * Math.random())

/*
if((n&-n)==n){
return((n*this.next(31))>>31);
}var bits;
var val;
do{
bits=this.next(31);
val=bits%n;
}while(bits-val+(n-1)<0);


return val;

*/
}
throw new IllegalArgumentException();
},"~N");
Clazz_defineMethod(c$,"nextLong",
function(){
return Math.ceil(0xffffffff*Math.random())-0x80000000;
});
Clazz_defineMethod(c$,"setSeed",
function(seed){
Math.seedrandom(seed);
//this.seed=(seed^25214903917)&(281474976710655);
//this.haveNextNextGaussian=false;
},"~N");
Clazz_defineStatics(c$,
"multiplier",0x5deece66d);
});

// seedrandom.js
// Author: David Bau 3/11/2010
//
// Defines a method Math.seedrandom() that, when called, substitutes
// an explicitly seeded RC4-based algorithm for Math.random().  Also
// supports automatic seeding from local or network sources of entropy.
//
// Usage:
//
//   <script src=http://davidbau.com/encode/seedrandom-min.js></script>
//
//   Math.seedrandom('yipee'); Sets Math.random to a function that is
//                             initialized using the given explicit seed.
//
//   Math.seedrandom();        Sets Math.random to a function that is
//                             seeded using the current time, dom state,
//                             and other accumulated local entropy.
//                             The generated seed string is returned.
//
//   Math.seedrandom('yowza', true);
//                             Seeds using the given explicit seed mixed
//                             together with accumulated entropy.
//
//   <script src="http://bit.ly/srandom-512"></script>
//                             Seeds using physical random bits downloaded
//                             from random.org.
//
// Examples:
//
//   Math.seedrandom("hello");            // Use "hello" as the seed.
//   document.write(Math.random());       // Always 0.5463663768140734
//   document.write(Math.random());       // Always 0.43973793770592234
//   var rng1 = Math.random;              // Remember the current prng.
//
//   var autoseed = Math.seedrandom();    // New prng with an automatic seed.
//   document.write(Math.random());       // Pretty much unpredictable.
//
//   Math.random = rng1;                  // Continue "hello" prng sequence.
//   document.write(Math.random());       // Always 0.554769432473455
//
//   Math.seedrandom(autoseed);           // Restart at the previous seed.
//   document.write(Math.random());       // Repeat the 'unpredictable' value.
//
// Notes:
//
// Each time seedrandom('arg') is called, entropy from the passed seed
// is accumulated in a pool to help generate future seeds for the
// zero-argument form of Math.seedrandom, so entropy can be injected over
// time by calling seedrandom with explicit data repeatedly.
//
// On speed - This javascript implementation of Math.random() is about
// 3-10x slower than the built-in Math.random() because it is not native
// code, but this is typically fast enough anyway.  Seeding is more expensive,
// especially if you use auto-seeding.  Some details (timings on Chrome 4):
//
// Our Math.random()            - avg less than 0.002 milliseconds per call
// seedrandom('explicit')       - avg less than 0.5 milliseconds per call
// seedrandom('explicit', true) - avg less than 2 milliseconds per call
// seedrandom()                 - avg about 38 milliseconds per call
//
// LICENSE (BSD):
//
// Copyright 2010 David Bau, all rights reserved.
//
// Redistribution and use in source and binary forms, with or without
// modification, are permitted provided that the following conditions are met:
//
//   1. Redistributions of source code must retain the above copyright
//      notice, this list of conditions and the following disclaimer.
//
//   2. Redistributions in binary form must reproduce the above copyright
//      notice, this list of conditions and the following disclaimer in the
//      documentation and/or other materials provided with the distribution.
//
//   3. Neither the name of this module nor the names of its contributors may
//      be used to endorse or promote products derived from this software
//      without specific prior written permission.
//
// THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS
// "AS IS" AND ANY EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT
// LIMITED TO, THE IMPLIED WARRANTIES OF MERCHANTABILITY AND FITNESS FOR
// A PARTICULAR PURPOSE ARE DISCLAIMED. IN NO EVENT SHALL THE COPYRIGHT
// OWNER OR CONTRIBUTORS BE LIABLE FOR ANY DIRECT, INDIRECT, INCIDENTAL,
// SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES (INCLUDING, BUT NOT
// LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES; LOSS OF USE,
// DATA, OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND ON ANY
// THEORY OF LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT
// (INCLUDING NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE
// OF THIS SOFTWARE, EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.
//
/**
 * All code is in an anonymous closure to keep the global namespace clean.
 *
 * @param {number=} overflow
 * @param {number=} startdenom
 */
(function (pool, math, width, chunks, significance, overflow, startdenom) {

var copyright = "Copyright 2010 David Bau, all rights reserved. (BSD)"
//
// seedrandom()
// This is the seedrandom function described above.
//
math['seedrandom'] = function seedrandom(seed, use_entropy) {
  var key = [];
  var arc4;

  // Flatten the seed string or build one from local entropy if needed.
  seed = mixkey(flatten(
    use_entropy ? [seed, pool] :
    arguments.length ? seed :
    [new Date().getTime(), pool, window], 3), key);

  // Use the seed to initialize an ARC4 generator.
  arc4 = new ARC4(key);

  // Mix the randomness into accumulated entropy.
  mixkey(arc4.S, pool);

  // Override Math.random

  // This function returns a random double in [0, 1) that contains
  // randomness in every bit of the mantissa of the IEEE 754 value.

  math['random'] = function random() {  // Closure to return a random double:
    var n = arc4.g(chunks);             // Start with a numerator n < 2 ^ 48
    var d = startdenom;                 //   and denominator d = 2 ^ 48.
    var x = 0;                          //   and no 'extra last byte'.
    while (n < significance) {          // Fill up all significant digits by
      n = (n + x) * width;              //   shifting numerator and
      d *= width;                       //   denominator and generating a
      x = arc4.g(1);                    //   new least-significant-byte.
    }
    while (n >= overflow) {             // To avoid rounding up, before adding
      n /= 2;                           //   last byte, shift everything
      d /= 2;                           //   right using integer math until
      x >>>= 1;                         //   we have exactly the desired bits.
    }
    return (n + x) / d;                 // Form the number within [0, 1).
  };

  // Return the seed that was used
  return seed;
};

//
// ARC4
//
// An ARC4 implementation.  The constructor takes a key in the form of
// an array of at most (width) integers that should be 0 <= x < (width).
//
// The g(count) method returns a pseudorandom integer that concatenates
// the next (count) outputs from ARC4.  Its return value is a number x
// that is in the range 0 <= x < (width ^ count).
//
/** @constructor */
function ARC4(key) {
  var t, u, me = this, keylen = key.length;
  var i = 0, j = me.i = me.j = me.m = 0;
  me.S = [];
  me.c = [];

  // The empty key [] is treated as [0].
  if (!keylen) { key = [keylen++]; }

  // Set up S using the standard key scheduling algorithm.
  while (i < width) { me.S[i] = i++; }
  for (i = 0; i < width; i++) {
    t = me.S[i];
    j = lowbits(j + t + key[i % keylen]);
    u = me.S[j];
    me.S[i] = u;
    me.S[j] = t;
  }

  // The "g" method returns the next (count) outputs as one number.
  me.g = function getnext(count) {
    var s = me.S;
    var i = lowbits(me.i + 1); var t = s[i];
    var j = lowbits(me.j + t); var u = s[j];
    s[i] = u;
    s[j] = t;
    var r = s[lowbits(t + u)];
    while (--count) {
      i = lowbits(i + 1); t = s[i];
      j = lowbits(j + t); u = s[j];
      s[i] = u;
      s[j] = t;
      r = r * width + s[lowbits(t + u)];
    }
    me.i = i;
    me.j = j;
    return r;
  };
  // For robust unpredictability discard an initial batch of values.
  // See http://www.rsa.com/rsalabs/node.asp?id=2009
  me.g(width);
}

//
// flatten()
// Converts an object tree to nested arrays of strings.
//
/** @param {Object=} result
  * @param {string=} prop */
function flatten(obj, depth, result, prop) {
  result = [];
  if (depth && typeof(obj) == 'object') {
    for (prop in obj) {
      if (prop.indexOf('S') < 5) {    // Avoid FF3 bug (local/sessionStorage)
        try { result.push(flatten(obj[prop], depth - 1)); } catch (e) {}
      }
    }
  }
  return result.length ? result : '' + obj;
}

//
// mixkey()
// Mixes a string seed into a key that is an array of integers, and
// returns a shortened string seed that is equivalent to the result key.
//
/** @param {number=} smear
  * @param {number=} j */
function mixkey(seed, key, smear, j) {
  seed += '';                         // Ensure the seed is a string
  smear = 0;
  for (j = 0; j < seed.length; j++) {
    key[lowbits(j)] =
      lowbits((smear ^= key[lowbits(j)] * 19) + seed.charCodeAt(j));
  }
  seed = '';
  for (j in key) { seed += String.fromCharCode(key[j]); }
  return seed;
}

//
// lowbits()
// A quick "n mod width" for width a power of 2.
//
function lowbits(n) { return n & (width - 1); }

//
// The following constants are related to IEEE 754 limits.
//
startdenom = math.pow(width, chunks);
significance = math.pow(2, significance);
overflow = significance * 2;

//
// When seedrandom.js is loaded, we immediately mix a few bits
// from the built-in RNG into the entropy pool.  Because we do
// not want to intefere with determinstic PRNG state later,
// seedrandom will not call math.random on its own again after
// initialization.
//
mixkey(math.random(), pool);

// End anonymous scope, and pass initial values.
})(
  [],   // pool: entropy pool starts empty
  Math, // math: package containing random, pow, and seedrandom
  256,  // width: each RC4 output is 0 <= x < 256
  6,    // chunks: at least six RC4 outputs for each double
  52    // significance: there are 52 significant digits in a double
);

Clazz_load(["java.util.Collection"],"java.util.AbstractCollection",["java.lang.StringBuilder","$.UnsupportedOperationException","java.lang.reflect.Array"],function(){
c$=Clazz_declareType(java.util,"AbstractCollection",null,java.util.Collection);
Clazz_makeConstructor(c$,
function(){
});
Clazz_overrideMethod(c$,"add",
function(object){
throw new UnsupportedOperationException();
},"~O");
Clazz_overrideMethod(c$,"addAll",
function(collection){
var result=false;
var it=collection.iterator();
while(it.hasNext()){
if(this.add(it.next())){
result=true;
}}
return result;
},"java.util.Collection");
Clazz_overrideMethod(c$,"clear",
function(){
var it=this.iterator();
while(it.hasNext()){
it.next();
it.remove();
}
});
Clazz_overrideMethod(c$,"contains",
function(object){
var it=this.iterator();
if(object!=null){
while(it.hasNext()){
if(object.equals(it.next())){
return true;
}}
}else{
while(it.hasNext()){
if(it.next()==null){
return true;
}}
}return false;
},"~O");
Clazz_overrideMethod(c$,"containsAll",
function(collection){
var it=collection.iterator();
while(it.hasNext()){
if(!this.contains(it.next())){
return false;
}}
return true;
},"java.util.Collection");
Clazz_overrideMethod(c$,"isEmpty",
function(){
return this.size()==0;
});
Clazz_overrideMethod(c$,"remove",
function(object){
var it=this.iterator();
if(object!=null){
while(it.hasNext()){
if(object.equals(it.next())){
it.remove();
return true;
}}
}else{
while(it.hasNext()){
if(it.next()==null){
it.remove();
return true;
}}
}return false;
},"~O");
Clazz_overrideMethod(c$,"removeAll",
function(collection){
var result=false;
var it=this.iterator();
while(it.hasNext()){
if(collection.contains(it.next())){
it.remove();
result=true;
}}
return result;
},"java.util.Collection");
Clazz_overrideMethod(c$,"retainAll",
function(collection){
var result=false;
var it=this.iterator();
while(it.hasNext()){
if(!collection.contains(it.next())){
it.remove();
result=true;
}}
return result;
},"java.util.Collection");
Clazz_defineMethod(c$,"toArray",
function(){
var size=this.size();
var index=0;
var it=this.iterator();
var array=new Array(size);
while(index<size){
array[index++]=it.next();
}
return array;
});
Clazz_defineMethod(c$,"toArray",
function(contents){
var size=this.size();
var index=0;
if(size>contents.length){
var ct=contents.getClass().getComponentType();
contents=java.lang.reflect.Array.newInstance(ct,size);
}for(var entry,$entry=this.iterator();$entry.hasNext()&&((entry=$entry.next())||true);){
contents[index++]=entry;
}
if(index<contents.length){
contents[index]=null;
}return contents;
},"~A");
Clazz_overrideMethod(c$,"toString",
function(){
if(this.isEmpty()){
return"[]";
}var buffer=new StringBuilder(this.size()*16);
buffer.append('[');
var it=this.iterator();
while(it.hasNext()){
var next=it.next();
if(next!==this){
buffer.append(next);
}else{
buffer.append("(this Collection)");
}if(it.hasNext()){
buffer.append(", ");
}}
buffer.append(']');
return buffer.toString();
});
});
// BH 8/25/2014 1:10:59 AM  - removed indirect access/inner class business.

Clazz_load(["java.util.AbstractCollection","$.Iterator","$.List","$.ListIterator","$.RandomAccess","$.NoSuchElementException"],"java.util.AbstractList",["java.lang.IllegalArgumentException","$.IllegalStateException","$.IndexOutOfBoundsException","$.UnsupportedOperationException","java.util.ConcurrentModificationException"],function(){
c$=Clazz_decorateAsClass(function(){
this.modCount=0;



//if(!Clazz_isClassDefined("java.util.AbstractList.SimpleListIterator")){
//java.util.AbstractList.$AbstractList$SimpleListIterator$();
//}
//if(!Clazz_isClassDefined("java.util.AbstractList.FullListIterator")){
//java.util.AbstractList.$AbstractList$FullListIterator$();
//}



Clazz_instantialize(this,arguments);
},java.util,"AbstractList",java.util.AbstractCollection,java.util.List);
Clazz_defineMethod(c$,"add",
function(location,object){
throw new UnsupportedOperationException();
},"~N,~O");
Clazz_defineMethod(c$,"add",
function(object){
this.add(this.size(),object);
return true;
},"~O");
Clazz_defineMethod(c$,"addAll",
function(location,collection){
var it=collection.iterator();
while(it.hasNext()){
this.add(location++,it.next());
}
return!collection.isEmpty();
},"~N,java.util.Collection");
Clazz_overrideMethod(c$,"clear",
function(){
this.removeRange(0,this.size());
});
Clazz_overrideMethod(c$,"equals",
function(object){
if(this===object){
return true;
}if(Clazz_instanceOf(object,java.util.List)){
var list=object;
if(list.size()!=this.size()){
return false;
}var it1=this.iterator();
var it2=list.iterator();
while(it1.hasNext()){
var e1=it1.next();
var e2=it2.next();
if(!(e1==null?e2==null:e1.equals(e2))){
return false;
}}
return true;
}return false;
},"~O");
Clazz_overrideMethod(c$,"hashCode",
function(){
var result=1;
var it=this.iterator();
while(it.hasNext()){
var object=it.next();
result=(31*result)+(object==null?0:object.hashCode());
}
return result;
});
Clazz_overrideMethod(c$,"indexOf",
function(object){
var it=this.listIterator();
if(object!=null){
while(it.hasNext()){
if(object.equals(it.next())){
return it.previousIndex();
}}
}else{
while(it.hasNext()){
if(it.next()==null){
return it.previousIndex();
}}
}return-1;
},"~O");
Clazz_overrideMethod(c$,"iterator",
function(){
return new java.util.AbstractListSimpleListIterator(this); // Clazz_innerTypeInstance(java.util.AbstractList.SimpleListIterator,this,null);
});
Clazz_overrideMethod(c$,"lastIndexOf",
function(object){
var it=this.listIterator(this.size());
if(object!=null){
while(it.hasPrevious()){
if(object.equals(it.previous())){
return it.nextIndex();
}}
}else{
while(it.hasPrevious()){
if(it.previous()==null){
return it.nextIndex();
}}
}return-1;
},"~O");
//Clazz_defineMethod(c$,"listIterator",
//function(){
//return this.listIterator(0);
//});
Clazz_defineMethod(c$,"listIterator",
function(location){
location || (location = 0);
return new java.util.AbstractListFullListIterator(this, location);//Clazz_innerTypeInstance(java.util.AbstractList.FullListIterator,this,null,location);
},"~N");
Clazz_defineMethod(c$,"remove",
function(location){
throw new UnsupportedOperationException();
},"~N");
Clazz_defineMethod(c$,"removeRange",
function(start,end){
var it=this.listIterator(start);
for(var i=start;i<end;i++){
it.next();
it.remove();
}
},"~N,~N");
Clazz_overrideMethod(c$,"set",
function(location,object){
throw new UnsupportedOperationException();
},"~N,~O");
Clazz_overrideMethod(c$,"subList",
function(start,end){
if(0<=start&&end<=this.size()){
if(start<=end){
if(Clazz_instanceOf(this,java.util.RandomAccess)){
return new java.util.AbstractList.SubAbstractListRandomAccess(this,start,end);
}return new java.util.AbstractList.SubAbstractList(this,start,end);
}throw new IllegalArgumentException();
}throw new IndexOutOfBoundsException();
},"~N,~N");



//c$.$AbstractList$SimpleListIterator$=function(){

Clazz_pu$h(self.c$);

c$=Clazz_decorateAsClass(function(){
//Clazz_prepareCallback(this,arguments);
this.pos=-1;
this.expectedModCount=0;
this.lastPosition=-1;
Clazz_instantialize(this,arguments);
},java.util,"AbstractListSimpleListIterator",null,java.util.Iterator);


Clazz_makeConstructor(c$,
function(a){
this._list = a;
this.expectedModCount=a.modCount;
}, "java.util.AbstractList");

Clazz_overrideMethod(c$,"hasNext",
function(){
return this.pos+1<this._list.size();
});
Clazz_overrideMethod(c$,"next",
function(){
if(this.expectedModCount==this._list.modCount){
try{
var a=this._list.get(this.pos+1);
this.lastPosition=++this.pos;
return a;
}catch(e){
if(Clazz_instanceOf(e,IndexOutOfBoundsException)){
throw new java.util.NoSuchElementException();
}else{
throw e;
}
}
}throw new java.util.ConcurrentModificationException();
});
Clazz_overrideMethod(c$,"remove",
function(){
if(this.expectedModCount==this._list.modCount){
try{
this._list.remove(this.lastPosition);
}catch(e){
if(Clazz_instanceOf(e,IndexOutOfBoundsException)){
throw new IllegalStateException();
}else{
throw e;
}
}
if(this._list.modCount!=this.expectedModCount){
this.expectedModCount++;
}if(this.pos==this.lastPosition){
this.pos--;
}this.lastPosition=-1;
}else{
throw new java.util.ConcurrentModificationException();
}});

c$=Clazz_p0p();
//};


//c$.$AbstractList$FullListIterator$=function(){
Clazz_pu$h(self.c$);
c$=Clazz_decorateAsClass(function(){
//Clazz_prepareCallback(this,arguments);
Clazz_instantialize(this,arguments);
},java.util,"AbstractListFullListIterator",java.util.AbstractListSimpleListIterator,java.util.ListIterator);

//,Clazz_innerTypeInstance(java.util.AbstractList.SimpleListIterator,this,null,Clazz_inheritArgs));

Clazz_makeConstructor(c$,
function(a,b){
Clazz_superConstructor(this,java.util.AbstractListFullListIterator,[a]);
if(0<=b&&b<=this._list.size()){
this.pos=b-1;
}else{
throw new IndexOutOfBoundsException();
}},"java.util.AbstractList,~N");
Clazz_overrideMethod(c$,"add",
function(a){
if(this.expectedModCount==this._list.modCount){
try{
this._list.add(this.pos+1,a);
}catch(e){
if(Clazz_instanceOf(e,IndexOutOfBoundsException)){
throw new java.util.NoSuchElementException();
}else{
throw e;
}
}
this.pos++;
this.lastPosition=-1;
if(this._list.modCount!=this.expectedModCount){
this.expectedModCount++;
}}else{
throw new java.util.ConcurrentModificationException();
}},"~O");
Clazz_overrideMethod(c$,"hasPrevious",
function(){
return this.pos>=0;
});
Clazz_overrideMethod(c$,"nextIndex",
function(){
return this.pos+1;
});
Clazz_overrideMethod(c$,"previous",
function(){
if(this.expectedModCount==this._list.modCount){
try{
var a=this._list.get(this.pos);
this.lastPosition=this.pos;
this.pos--;
return a;
}catch(e){
if(Clazz_instanceOf(e,IndexOutOfBoundsException)){
throw new java.util.NoSuchElementException();
}else{
throw e;
}
}
}throw new java.util.ConcurrentModificationException();
});
Clazz_overrideMethod(c$,"previousIndex",
function(){
return this.pos;
});
Clazz_overrideMethod(c$,"set",
function(a){
if(this.expectedModCount==this._list.modCount){
try{
this._list.set(this.lastPosition,a);
}catch(e){
if(Clazz_instanceOf(e,IndexOutOfBoundsException)){
throw new IllegalStateException();
}else{
throw e;
}
}
}else{
throw new java.util.ConcurrentModificationException();
}},"~O");
c$=Clazz_p0p();
//};




Clazz_pu$h(self.c$);
c$=Clazz_declareType(java.util.AbstractList,"SubAbstractListRandomAccess",java.util.AbstractList.SubAbstractList,java.util.RandomAccess);
c$=Clazz_p0p();




Clazz_pu$h(self.c$);
c$=Clazz_decorateAsClass(function(){
this.fullList=null;
this.offset=0;
this.$size=0;
Clazz_instantialize(this,arguments);
},java.util.AbstractList,"SubAbstractList",java.util.AbstractList);
Clazz_makeConstructor(c$,
function(a,b,c){
Clazz_superConstructor(this,java.util.AbstractList.SubAbstractList);
this.fullList=a;
this.modCount=this.fullList.modCount;
this.offset=b;
this.$size=c-b;
},"java.util.AbstractList,~N,~N");
Clazz_defineMethod(c$,"add",
function(a,b){
if(this.modCount==this.fullList.modCount){
if(0<=a&&a<=this.$size){
this.fullList.add(a+this.offset,b);
this.$size++;
this.modCount=this.fullList.modCount;
}else{
throw new IndexOutOfBoundsException();
}}else{
throw new java.util.ConcurrentModificationException();
}},"~N,~O");
Clazz_defineMethod(c$,"addAll",
function(a,b){
if(this.modCount==this.fullList.modCount){
if(0<=a&&a<=this.$size){
var c=this.fullList.addAll(a+this.offset,b);
if(c){
this.$size+=b.size();
this.modCount=this.fullList.modCount;
}return c;
}throw new IndexOutOfBoundsException();
}throw new java.util.ConcurrentModificationException();
},"~N,java.util.Collection");
Clazz_defineMethod(c$,"addAll",
function(a){
if(this.modCount==this.fullList.modCount){
var b=this.fullList.addAll(this.offset+this.$size,a);
if(b){
this.$size+=a.size();
this.modCount=this.fullList.modCount;
}return b;
}throw new java.util.ConcurrentModificationException();
},"java.util.Collection");
Clazz_defineMethod(c$,"get",
function(a){
if(this.modCount==this.fullList.modCount){
if(0<=a&&a<this.$size){
return this.fullList.get(a+this.offset);
}throw new IndexOutOfBoundsException();
}throw new java.util.ConcurrentModificationException();
},"~N");
Clazz_overrideMethod(c$,"iterator",
function(){
return this.listIterator(0);
});
Clazz_defineMethod(c$,"listIterator",
function(a){
if(this.modCount==this.fullList.modCount){
if(0<=a&&a<=this.$size){
return new java.util.AbstractList.SubAbstractList.SubAbstractListIterator(this.fullList.listIterator(a+this.offset),this,this.offset,this.$size);
}throw new IndexOutOfBoundsException();
}throw new java.util.ConcurrentModificationException();
},"~N");
Clazz_defineMethod(c$,"remove",
function(a){
if(this.modCount==this.fullList.modCount){
if(0<=a&&a<this.$size){
var b=this.fullList.remove(a+this.offset);
this.$size--;
this.modCount=this.fullList.modCount;
return b;
}throw new IndexOutOfBoundsException();
}throw new java.util.ConcurrentModificationException();
},"~N");
Clazz_defineMethod(c$,"removeRange",
function(a,b){
if(a!=b){
if(this.modCount==this.fullList.modCount){
this.fullList.removeRange(a+this.offset,b+this.offset);
this.$size-=b-a;
this.modCount=this.fullList.modCount;
}else{
throw new java.util.ConcurrentModificationException();
}}},"~N,~N");
Clazz_defineMethod(c$,"set",
function(a,b){
if(this.modCount==this.fullList.modCount){
if(0<=a&&a<this.$size){
return this.fullList.set(a+this.offset,b);
}throw new IndexOutOfBoundsException();
}throw new java.util.ConcurrentModificationException();
},"~N,~O");
Clazz_overrideMethod(c$,"size",
function(){
return this.$size;
});
Clazz_defineMethod(c$,"sizeChanged",
function(a){
if(a){
this.$size++;
}else{
this.$size--;
}this.modCount=this.fullList.modCount;
},"~B");
Clazz_pu$h(self.c$);
c$=Clazz_decorateAsClass(function(){
this.subList=null;
this.iterator=null;
this.start=0;
this.end=0;
Clazz_instantialize(this,arguments);
},java.util.AbstractList.SubAbstractList,"SubAbstractListIterator",null,java.util.ListIterator);
Clazz_makeConstructor(c$,
function(a,b,c,d){
this.iterator=a;
this.subList=b;
this.start=c;
this.end=this.start+d;
},"java.util.ListIterator,java.util.AbstractList.SubAbstractList,~N,~N");
Clazz_defineMethod(c$,"add",
function(a){
this.iterator.add(a);
this.subList.sizeChanged(true);
this.end++;
},"~O");
Clazz_overrideMethod(c$,"hasNext",
function(){
return this.iterator.nextIndex()<this.end;
});
Clazz_overrideMethod(c$,"hasPrevious",
function(){
return this.iterator.previousIndex()>=this.start;
});
Clazz_defineMethod(c$,"next",
function(){
if(this.iterator.nextIndex()<this.end){
return this.iterator.next();
}throw new java.util.NoSuchElementException();
});
Clazz_defineMethod(c$,"nextIndex",
function(){
return this.iterator.nextIndex()-this.start;
});
Clazz_defineMethod(c$,"previous",
function(){
if(this.iterator.previousIndex()>=this.start){
return this.iterator.previous();
}throw new java.util.NoSuchElementException();
});
Clazz_defineMethod(c$,"previousIndex",
function(){
var a=this.iterator.previousIndex();
if(a>=this.start){
return a-this.start;
}return-1;
});
Clazz_defineMethod(c$,"remove",
function(){
this.iterator.remove();
this.subList.sizeChanged(false);
this.end--;
});
Clazz_defineMethod(c$,"set",
function(a){
this.iterator.set(a);
},"~O");
c$=Clazz_p0p();
c$=Clazz_p0p();
});
Clazz_load(["java.util.Map"],"java.util.AbstractMap",["java.lang.StringBuilder","$.UnsupportedOperationException","java.util.AbstractCollection","$.AbstractSet","$.Iterator"],function(){
c$=Clazz_decorateAsClass(function(){
this.$keySet=null;
this.valuesCollection=null;
Clazz_instantialize(this,arguments);
},java.util,"AbstractMap",null,java.util.Map);
Clazz_makeConstructor(c$,
function(){
});
Clazz_overrideMethod(c$,"clear",
function(){
this.entrySet().clear();
});
Clazz_overrideMethod(c$,"containsKey",
function(key){
var it=this.entrySet().iterator();
if(key!=null){
while(it.hasNext()){
if(key.equals(it.next().getKey())){
return true;
}}
}else{
while(it.hasNext()){
if(it.next().getKey()==null){
return true;
}}
}return false;
},"~O");
Clazz_overrideMethod(c$,"containsValue",
function(value){
var it=this.entrySet().iterator();
if(value!=null){
while(it.hasNext()){
if(value.equals(it.next().getValue())){
return true;
}}
}else{
while(it.hasNext()){
if(it.next().getValue()==null){
return true;
}}
}return false;
},"~O");
Clazz_overrideMethod(c$,"equals",
function(object){
if(this===object){
return true;
}if(Clazz_instanceOf(object,java.util.Map)){
var map=object;
if(this.size()!=map.size()){
return false;
}var objectSet=map.entrySet();
var it=this.entrySet().iterator();
while(it.hasNext()){
if(!objectSet.contains(it.next())){
return false;
}}
return true;
}return false;
},"~O");
Clazz_overrideMethod(c$,"get",
function(key){
var it=this.entrySet().iterator();
if(key!=null){
while(it.hasNext()){
var entry=it.next();
if(key.equals(entry.getKey())){
return entry.getValue();
}}
}else{
while(it.hasNext()){
var entry=it.next();
if(entry.getKey()==null){
return entry.getValue();
}}
}return null;
},"~O");
Clazz_overrideMethod(c$,"hashCode",
function(){
var result=0;
var it=this.entrySet().iterator();
while(it.hasNext()){
result+=it.next().hashCode();
}
return result;
});
Clazz_overrideMethod(c$,"isEmpty",
function(){
return this.size()==0;
});
Clazz_overrideMethod(c$,"keySet",
function(){
if(this.$keySet==null){
this.$keySet=((Clazz_isClassDefined("java.util.AbstractMap$1")?0:java.util.AbstractMap.$AbstractMap$1$()),Clazz_innerTypeInstance(java.util.AbstractMap$1,this,null));
}return this.$keySet;
});
Clazz_overrideMethod(c$,"put",
function(key,value){
throw new UnsupportedOperationException();
},"~O,~O");
Clazz_overrideMethod(c$,"putAll",
function(map){
  this.putAllAM(map);
},"java.util.Map");

Clazz_overrideMethod(c$,"putAllAM",
function(map){
for(var entry,$entry=map.entrySet().iterator();$entry.hasNext()&&((entry=$entry.next())||true);){
this.put(entry.getKey(),entry.getValue());
}
},"java.util.Map");

Clazz_overrideMethod(c$,"remove",
function(key){
var it=this.entrySet().iterator();
if(key!=null){
while(it.hasNext()){
var entry=it.next();
if(key.equals(entry.getKey())){
it.remove();
return entry.getValue();
}}
}else{
while(it.hasNext()){
var entry=it.next();
if(entry.getKey()==null){
it.remove();
return entry.getValue();
}}
}return null;
},"~O");
Clazz_overrideMethod(c$,"size",
function(){
return this.entrySet().size();
});
Clazz_overrideMethod(c$,"toString",
function(){
if(this.isEmpty()){
return"{}";
}var buffer=new StringBuilder(this.size()*28);
buffer.append('{');
var it=this.entrySet().iterator();
while(it.hasNext()){
var entry=it.next();
var key=entry.getKey();
if(key!==this){
buffer.append(key);
}else{
buffer.append("(this Map)");
}buffer.append('=');
var value=entry.getValue();
if(value!==this){
buffer.append(value);
}else{
buffer.append("(this Map)");
}if(it.hasNext()){
buffer.append(", ");
}}
buffer.append('}');
return buffer.toString();
});
Clazz_overrideMethod(c$,"values",
function(){
if(this.valuesCollection==null){
this.valuesCollection=((Clazz_isClassDefined("java.util.AbstractMap$2")?0:java.util.AbstractMap.$AbstractMap$2$()),Clazz_innerTypeInstance(java.util.AbstractMap$2,this,null));
}return this.valuesCollection;
});
Clazz_defineMethod(c$,"clone",
function(){
return  this.cloneAM();
});

Clazz_defineMethod(c$,"cloneAM",
function(){
var result = Clazz_clone(this);
result.$keySet=null;
result.valuesCollection=null;
return result;
});

c$.$AbstractMap$1$=function(){
Clazz_pu$h(self.c$);
c$=Clazz_declareAnonymous(java.util,"AbstractMap$1",java.util.AbstractSet);
Clazz_overrideMethod(c$,"contains",
function(object){
return this.b$["java.util.AbstractMap"].containsKey(object);
},"~O");
Clazz_overrideMethod(c$,"size",
function(){
return this.b$["java.util.AbstractMap"].size();
});
Clazz_overrideMethod(c$,"iterator",
function(){
return((Clazz_isClassDefined("java.util.AbstractMap$1$1")?0:java.util.AbstractMap.$AbstractMap$1$1$()),Clazz_innerTypeInstance(java.util.AbstractMap$1$1,this,null));
});
c$=Clazz_p0p();
};
c$.$AbstractMap$1$1$=function(){
Clazz_pu$h(self.c$);
c$=Clazz_decorateAsClass(function(){
Clazz_prepareCallback(this,arguments);
this.setIterator=null;
Clazz_instantialize(this,arguments);
},java.util,"AbstractMap$1$1",null,java.util.Iterator);
Clazz_prepareFields(c$,function(){
this.setIterator=this.b$["java.util.AbstractMap"].entrySet().iterator();
});
Clazz_overrideMethod(c$,"hasNext",
function(){
return this.setIterator.hasNext();
});
Clazz_overrideMethod(c$,"next",
function(){
return this.setIterator.next().getKey();
});
Clazz_overrideMethod(c$,"remove",
function(){
this.setIterator.remove();
});
c$=Clazz_p0p();
};
c$.$AbstractMap$2$=function(){
Clazz_pu$h(self.c$);
c$=Clazz_declareAnonymous(java.util,"AbstractMap$2",java.util.AbstractCollection);
Clazz_overrideMethod(c$,"size",
function(){
return this.b$["java.util.AbstractMap"].size();
});
Clazz_overrideMethod(c$,"contains",
function(object){
return this.b$["java.util.AbstractMap"].containsValue(object);
},"~O");
Clazz_overrideMethod(c$,"iterator",
function(){
return((Clazz_isClassDefined("java.util.AbstractMap$2$1")?0:java.util.AbstractMap.$AbstractMap$2$1$()),Clazz_innerTypeInstance(java.util.AbstractMap$2$1,this,null));
});
c$=Clazz_p0p();
};
c$.$AbstractMap$2$1$=function(){
Clazz_pu$h(self.c$);
c$=Clazz_decorateAsClass(function(){
Clazz_prepareCallback(this,arguments);
this.setIterator=null;
Clazz_instantialize(this,arguments);
},java.util,"AbstractMap$2$1",null,java.util.Iterator);
Clazz_prepareFields(c$,function(){
this.setIterator=this.b$["java.util.AbstractMap"].entrySet().iterator();
});
Clazz_overrideMethod(c$,"hasNext",
function(){
return this.setIterator.hasNext();
});
Clazz_overrideMethod(c$,"next",
function(){
return this.setIterator.next().getValue();
});
Clazz_overrideMethod(c$,"remove",
function(){
this.setIterator.remove();
});
c$=Clazz_p0p();
};
});
Clazz_load(["java.util.AbstractCollection","$.Set"],"java.util.AbstractSet",null,function(){
c$=Clazz_declareType(java.util,"AbstractSet",java.util.AbstractCollection,java.util.Set);
Clazz_overrideMethod(c$,"equals",
function(object){
if(this===object){
return true;
}if(Clazz_instanceOf(object,java.util.Set)){
var s=object;
return this.size()==s.size()&&this.containsAll(s);
}return false;
},"~O");
Clazz_overrideMethod(c$,"hashCode",
function(){
var result=0;
var it=this.iterator();
while(it.hasNext()){
var next=it.next();
result+=next==null?0:next.hashCode();
}
return result;
});
Clazz_overrideMethod(c$,"removeAll",
function(collection){
var result=false;
if(this.size()<=collection.size()){
var it=this.iterator();
while(it.hasNext()){
if(collection.contains(it.next())){
it.remove();
result=true;
}}
}else{
var it=collection.iterator();
while(it.hasNext()){
result=this.remove(it.next())||result;
}
}return result;
},"java.util.Collection");
});
//BH 12/18/2015 7:30:28 AM using slice for toArray()
//BH 7/4/2016 3:16:31 PM adding _removeItemAt and _removeObject

Clazz_load(["java.util.AbstractList","$.List","$.RandomAccess"],"java.util.ArrayList",["java.lang.IllegalArgumentException","$.IndexOutOfBoundsException","java.lang.reflect.Array","java.util.Arrays"],function(){
c$=Clazz_decorateAsClass(function(){
this.firstIndex=0;
this.lastIndex=0;
this.array=null;
Clazz_instantialize(this,arguments);
},java.util,"ArrayList",java.util.AbstractList,[java.util.List,Cloneable,java.io.Serializable,java.util.RandomAccess]);

Clazz_overrideConstructor(c$,
function(){
this.setup(0);
});

Clazz_defineMethod(c$, "setup",
function(capacity){
//Clazz_superConstructor(this,java.util.ArrayList,[]);
this.firstIndex=this.lastIndex=0;
try{
this.array=this.newElementArray(capacity);
}catch(e){
if(Clazz_instanceOf(e,NegativeArraySizeException)){
throw new IllegalArgumentException();
}else{
throw e;
}
}
},"~N");
/*
Clazz_makeConstructor(c$,
function(collection){
Clazz_superConstructor(this,java.util.ArrayList,[]);
var size=collection.size();
this.firstIndex=this.lastIndex=0;
this.array=this.newElementArray(size+(Math.floor(size/10)));
this.addAll(collection);
},"java.util.Collection");

*/

Clazz_defineMethod(c$,"newElementArray",
($fz=function(size){
return new Array(size);
},$fz.isPrivate=true,$fz),"~N");

Clazz_overrideMethod(c$,"add",
function(location,object){

if (arguments.length == 1) {
	// coming from Java methods, e.g. Collections.list()
	// location is actually the object
	return this.add1(location);
}
var size=this.size();
if(0<location&&location<size){
if(this.firstIndex==0&&this.lastIndex==this.array.length){
this.growForInsert(location,1);
}else if((location<Math.floor(size/2)&&this.firstIndex>0)||this.lastIndex==this.array.length){
System.arraycopy(this.array,this.firstIndex,this.array,--this.firstIndex,location);
}else{
var index=location+this.firstIndex;
System.arraycopy(this.array,index,this.array,index+1,size-location);
this.lastIndex++;
}this.array[location+this.firstIndex]=object;
}else if(location==0){
if(this.firstIndex==0){
this.growAtFront(1);
}this.array[--this.firstIndex]=object;
}else if(location==size){
if(this.lastIndex==this.array.length){
this.growAtEnd(1);
}this.array[this.lastIndex++]=object;
}else{
throw new IndexOutOfBoundsException();
}this.modCount++;
},"~N,~O");

Clazz_overrideMethod(c$,"add1",
function(object){
if(this.lastIndex==this.array.length){
this.growAtEnd(1);
}this.array[this.lastIndex++]=object;
this.modCount++;
return true;
},"~O");

/* BH disallow addAll(int,List)
 * 
Clazz_defineMethod(c$,"addAll",
function(location,collection){
var size=this.size();
if(location<0||location>size){
throw new IndexOutOfBoundsException();
}var growSize=collection.size();
if(0<location&&location<size){
if(this.array.length-size<growSize){
this.growForInsert(location,growSize);
}else if((location<Math.floor(size/2)&&this.firstIndex>0)||this.lastIndex>this.array.length-growSize){
var newFirst=this.firstIndex-growSize;
if(newFirst<0){
var index=location+this.firstIndex;
System.arraycopy(this.array,index,this.array,index-newFirst,size-location);
this.lastIndex-=newFirst;
newFirst=0;
}System.arraycopy(this.array,this.firstIndex,this.array,newFirst,location);
this.firstIndex=newFirst;
}else{
var index=location+this.firstIndex;
System.arraycopy(this.array,index,this.array,index+growSize,size-location);
this.lastIndex+=growSize;
}}else if(location==0){
this.growAtFront(growSize);
this.firstIndex-=growSize;
}else if(location==size){
if(this.lastIndex>this.array.length-growSize){
this.growAtEnd(growSize);
}this.lastIndex+=growSize;
}if(growSize>0){
var it=collection.iterator();
var index=location+this.firstIndex;
var end=index+growSize;
while(index<end){
this.array[index++]=it.next();
}
this.modCount++;
return true;
}return false;
},"~N,java.util.Collection");

 */

Clazz_overrideMethod(c$,"addAll",
function(collection){
var growSize=collection.size();
if(growSize>0){
	if(this.lastIndex>this.array.length-growSize){
		this.growAtEnd(growSize);
}
var it=collection.iterator();
var end=this.lastIndex+growSize;
while(this.lastIndex<end){
	this.array[this.lastIndex++]=it.next();
}
this.modCount++;
return true;
}return false;
},"java.util.Collection");

Clazz_overrideMethod(c$,"clear",
function(){
if(this.firstIndex!=this.lastIndex){
this.fill(this.firstIndex,this.lastIndex);
this.firstIndex=this.lastIndex=0;
this.modCount++;
}});

Clazz_defineMethod(c$,"fill", function(i1, i2) { // BH
for (var i = i2; --i >= i1;)
this.array[i] = null;
},"~N,~N");

Clazz_defineMethod(c$,"clone",
function(){
try{
var newList=Clazz_superCall(this,java.util.ArrayList,"clone",[]);
newList.array=this.array.clone();
return newList;
}catch(e){
if(Clazz_instanceOf(e,CloneNotSupportedException)){
return null;
}else{
throw e;
}
}
});
Clazz_overrideMethod(c$,"contains",
function(object){
if(object!=null){
for(var i=this.firstIndex;i<this.lastIndex;i++){
if(object.equals(this.array[i])){
return true;
}}
}else{
for(var i=this.firstIndex;i<this.lastIndex;i++){
if(this.array[i]==null){
return true;
}}
}return false;
},"~O");
Clazz_defineMethod(c$,"ensureCapacity",
function(minimumCapacity){
if(this.array.length<minimumCapacity){
if(this.firstIndex>0){
this.growAtFront(minimumCapacity-this.array.length);
}else{
this.growAtEnd(minimumCapacity-this.array.length);
}}},"~N");
Clazz_overrideMethod(c$,"get",
function(location){
if(0<=location&&location<this.size()){
return this.array[this.firstIndex+location];
}throw new IndexOutOfBoundsException();
},"~N");


Clazz_defineMethod(c$,"growAtEnd",
($fz=function(required){
var size=this.size();
if(this.firstIndex>=required-(this.array.length-this.lastIndex)){
	var newLast=this.lastIndex-this.firstIndex;
	if(size>0){
		System.arraycopy(this.array,this.firstIndex,this.array,0,size);
		var start=newLast<this.firstIndex?this.firstIndex:newLast;
		this.fill(start,this.array.length);
	}
	this.firstIndex=0;
	this.lastIndex=newLast;
}else{
	var increment=Math.floor(size/2);
	if(required>increment){
		increment=required;
	}
	if(increment<12){
		increment=12;
	}
	var newArray=this.newElementArray(size+increment);
	if(size>0){
		System.arraycopy(this.array,this.firstIndex,newArray,this.firstIndex,size);
	}
	this.array=newArray;
}

},$fz.isPrivate=true,$fz),"~N");
Clazz_defineMethod(c$,"growAtFront",
($fz=function(required){
var size=this.size();
if(this.array.length-this.lastIndex>=required){
var newFirst=this.array.length-size;
if(size>0){
System.arraycopy(this.array,this.firstIndex,this.array,newFirst,size);
var length=this.firstIndex+size>newFirst?newFirst:this.firstIndex+size;
this.fill(this.firstIndex,length);
}this.firstIndex=newFirst;
this.lastIndex=this.array.length;
}else{
var increment=Math.floor(size/2);
if(required>increment){
increment=required;
}if(increment<12){
increment=12;
}var newArray=this.newElementArray(size+increment);
if(size>0){
System.arraycopy(this.array,this.firstIndex,newArray,newArray.length-size,size);
}this.firstIndex=newArray.length-size;
this.lastIndex=newArray.length;
this.array=newArray;
}},$fz.isPrivate=true,$fz),"~N");
Clazz_defineMethod(c$,"growForInsert",
($fz=function(location,required){
var size=this.size();
var increment=Math.floor(size/2);
if(required>increment){
increment=required;
}if(increment<12){
increment=12;
}var newArray=this.newElementArray(size+increment);
if(location<Math.floor(size/2)){
var newFirst=newArray.length-(size+required);
System.arraycopy(this.array,location,newArray,location+increment,size-location);
System.arraycopy(this.array,this.firstIndex,newArray,newFirst,location);
this.firstIndex=newFirst;
this.lastIndex=newArray.length;
}else{
System.arraycopy(this.array,this.firstIndex,newArray,0,location);
System.arraycopy(this.array,location,newArray,location+required,size-location);
this.firstIndex=0;
this.lastIndex+=required;
}this.array=newArray;
},$fz.isPrivate=true,$fz),"~N,~N");
Clazz_overrideMethod(c$,"indexOf",
function(object){
if(object!=null){
for(var i=this.firstIndex;i<this.lastIndex;i++){
if(object.equals(this.array[i])){
return i-this.firstIndex;
}}
}else{
for(var i=this.firstIndex;i<this.lastIndex;i++){
if(this.array[i]==null){
return i-this.firstIndex;
}}
}return-1;
},"~O");
Clazz_overrideMethod(c$,"isEmpty",
function(){
return this.lastIndex==this.firstIndex;
});
Clazz_overrideMethod(c$,"lastIndexOf",
function(object){
if(object!=null){
for(var i=this.lastIndex-1;i>=this.firstIndex;i--){
if(object.equals(this.array[i])){
return i-this.firstIndex;
}}
}else{
for(var i=this.lastIndex-1;i>=this.firstIndex;i--){
if(this.array[i]==null){
return i-this.firstIndex;
}}
}return-1;
},"~O");
Clazz_overrideMethod(c$,"remove",
function(location){
return (typeof location == "number" ? this._removeItemAt(location) : this._removeObject(location));
},"~N"); 

Clazz_overrideMethod(c$,"_removeItemAt",
function(location){
var result;
var size=this.size();
if(0<=location&&location<size){
if(location==size-1){
result=this.array[--this.lastIndex];
this.array[this.lastIndex]=null;
}else if(location==0){
result=this.array[this.firstIndex];
this.array[this.firstIndex++]=null;
}else{
var elementIndex=this.firstIndex+location;
result=this.array[elementIndex];
if(location<Math.floor(size/2)){
System.arraycopy(this.array,this.firstIndex,this.array,this.firstIndex+1,location);
this.array[this.firstIndex++]=null;
}else{
System.arraycopy(this.array,elementIndex+1,this.array,elementIndex,size-location-1);
this.array[--this.lastIndex]=null;
}}}else{
throw new IndexOutOfBoundsException();
}this.modCount++;
return result;
},"~N"); 

Clazz_defineMethod(c$, "_removeObject", function(o) {
	var i = this.indexOf(o);
	if (i < 0)return null;
	return this._removeItemAt(i);
}, "~O");

Clazz_overrideMethod(c$,"removeRange",
function(start,end){
if(start>=0&&start<=end&&end<=this.size()){
if(start==end){
return;
}var size=this.size();
if(end==size){
	this.fill(this.firstIndex+start,this.lastIndex);
this.lastIndex=this.firstIndex+start;
}else if(start==0){
	this.fill(this.firstIndex,this.firstIndex+end);
this.firstIndex+=end;
}else{
System.arraycopy(this.array,this.firstIndex+end,this.array,this.firstIndex+start,size-end);
var newLast=this.lastIndex+start-end;
this.fill(newLast,this.lastIndex);
this.lastIndex=newLast;
}this.modCount++;
}else{
throw new IndexOutOfBoundsException();
}},"~N,~N");
Clazz_overrideMethod(c$,"set",
function(location,object){
if(0<=location&&location<this.size()){
var result=this.array[this.firstIndex+location];
this.array[this.firstIndex+location]=object;
return result;
}throw new IndexOutOfBoundsException();
},"~N,~O");
Clazz_overrideMethod(c$,"size",
function(){
return this.lastIndex-this.firstIndex;
});
/*
Clazz_defineMethod(c$,"toArray",
function(){
var size=this.size();
var result=new Array(size);
System.arraycopy(this.array,this.firstIndex,result,0,size);
return result;
});
*/

Clazz_overrideMethod(c$,"toArray",
function(contents){
var size=this.size();
if(!contents || size>contents.length) {
  return this.array.slice(this.firstIndex, this.firstIndex + size);
}
System.arraycopy(this.array,this.firstIndex,contents,0,size);
if(size<contents.length){
contents[size]=null;
}
return contents;
},"~O");
Clazz_defineMethod(c$,"trimToSize",
function(){
var size=this.size();
var newArray=this.newElementArray(size);
System.arraycopy(this.array,this.firstIndex,newArray,0,size);
this.array=newArray;
this.firstIndex=0;
this.lastIndex=this.array.length;
});
});
// BH adjusted to have only one sort method.
// BH 4/7/2017 1:49:45 PM fixing "instanceof Comparable"
// BH adding copyOf 7/12/2016 10:35:01 AM
Clazz_load(["java.util.AbstractList","$.RandomAccess"],"java.util.Arrays",["java.lang.ArrayIndexOutOfBoundsException","$.IllegalArgumentException","$.NullPointerException"],function(){
c$=Clazz_declareType(java.util,"Arrays");

c$.sort=Clazz_overrideMethod(c$,"sort",
function(a,c,d,e){
  switch (arguments.length) {
  case 1:
    var aux=a.sort(function(o1,o2){
      if(typeof o1=="string"||Clazz_instanceOf(o1, Comparable)){
        return o1.compareTo(o2);
      }
      return o1-o2;
      });
    for(var i=0;i<a.length;i++){
      a[i]=aux[i];
    }
    return;
  case 2:
    var aux=a.sort(function(o1,o2){
      if(c!=null){
        return c.compare(o1,o2);
      }else if(typeof o1=="string"||Clazz_instanceOf(o1, Comparable)){
        return o1.compareTo(o2);
      }
      return o1-o2;
      });
    for(var i=0;i<a.length;i++){
      a[i]=aux[i];
    }
    return;
  case 3:
    var fromIndex = c;
    var toIndex = d;
    this.rangeCheck(a.length,fromIndex,toIndex);
    var aux=new Array();
    for(var i=fromIndex;i<toIndex;i++){
      aux[i-fromIndex]=a[i];
    }
    aux=aux.sort(function(o1,o2){
      if(typeof o1=="string"||Clazz_instanceOf(o1, Comparable)){
        return o1.compareTo(o2);
      }
      return o1-o2;
      });
    for(var i=fromIndex;i<toIndex;i++){
      a[i]=aux[i-fromIndex];
    }
    return;
  case 4:  
    var fromIndex = c;
    var toIndex = d;
    c = e;
    this.rangeCheck(a.length,fromIndex,toIndex);
    var aux=new Array();
    for(var i=fromIndex;i<toIndex;i++){
      aux[i-fromIndex]=a[i];
    }
    aux=aux.sort(function(o1,o2){
      if(c!=null){
        return c.compare(o1,o2);
      }else if(typeof o1=="string"||Clazz_instanceOf(o1, Comparable)){
        return o1.compareTo(o2);
      }
      return o1-o2;
      });
    for(var i=fromIndex;i<toIndex;i++){
      a[i]=aux[i-fromIndex];
    }
  }
});

c$.rangeCheck=Clazz_defineMethod(c$,"rangeCheck",
($fz=function(arrayLen,fromIndex,toIndex){
if(fromIndex>toIndex)throw new IllegalArgumentException("fromIndex("+fromIndex+") > toIndex("+toIndex+")");
if(fromIndex<0)throw new ArrayIndexOutOfBoundsException(fromIndex);
if(toIndex>arrayLen)throw new ArrayIndexOutOfBoundsException(toIndex);
},$fz.isPrivate=true,$fz),"~N,~N,~N");
c$.binarySearch=Clazz_defineMethod(c$,"binarySearch",
function(a,key){
var low=0;
var high=a.length-1;
while(low<=high){
var mid=(low+high)>>1;
var midVal=a[mid];
if(midVal<key)low=mid+1;
else if(midVal>key)high=mid-1;
else return mid;
}
return-(low+1);
},"~A,~N");
c$.binarySearch=Clazz_defineMethod(c$,"binarySearch",
function(a,key){
var low=0;
var high=a.length-1;
while(low<=high){
var mid=(low+high)>>1;
var midVal=a[mid];
var cmp=(midVal).compareTo(key);
if(cmp<0)low=mid+1;
else if(cmp>0)high=mid-1;
else return mid;
}
return-(low+1);
},"~A,~O");
c$.binarySearch=Clazz_defineMethod(c$,"binarySearch",
function(a,key,c){
if(c==null)return java.util.Arrays.binarySearch(a,key);
var low=0;
var high=a.length-1;
while(low<=high){
var mid=(low+high)>>1;
var midVal=a[mid];
var cmp=c.compare(midVal,key);
if(cmp<0)low=mid+1;
else if(cmp>0)high=mid-1;
else return mid;
}
return-(low+1);
},"~A,~O,java.util.Comparator");
c$.equals=Clazz_defineMethod(c$,"equals",
function(a,a2){
if(a===a2)return true;
if(a==null||a2==null)return false;
var length=a.length;
if(a2.length!=length)return false;
for(var i=0;i<length;i++){
var o1=a[i];
var o2=a2[i];
{
if(!(o1==null?o2==null:(o1.equals==null?o1==o2:o1.equals(o2))))return false;
}}
return true;
},"~A,~A");

c$.fill=Clazz_overrideMethod(c$,"fill",
function(a,fromIndex,toIndex,val){
if (arguments.length == 2) {
		val = fromIndex;
		fromIndex = 0;
		toIndex = a.length;
	}	
	java.util.Arrays.rangeCheck(a.length,fromIndex,toIndex);
	for(var i=fromIndex;i<toIndex;i++)a[i]=val;
});

c$.copyOf=Clazz_overrideMethod(c$,"copyOf",
function(a,len){
  var b = Clazz_newArray(len,null)
  for(var i=Math.min(a.length, len);--i >= 0;)b[i]=a[i];
  return b;
});

c$.asList=Clazz_defineMethod(c$,"asList",
function(a){
return new java.util.Arrays.ArrayList(arguments.length == 1 && Clazz_getClassName(a) == "Array" ? a : arguments); // BH must be T...
},"~A");
Clazz_pu$h(self.c$);
c$=Clazz_decorateAsClass(function(){
this.a=null;
Clazz_instantialize(this,arguments);
},java.util.Arrays,"ArrayList",java.util.AbstractList,[java.util.RandomAccess,java.io.Serializable]);
Clazz_makeConstructor(c$,
function(a){
Clazz_superConstructor(this,java.util.Arrays.ArrayList,[]);
if(a==null)throw new NullPointerException();
this.a=a;
},"~A");
Clazz_overrideMethod(c$,"size",
function(){
return this.a.length;
});
Clazz_defineMethod(c$,"toArray",
function(){
return this.a.clone();
});
Clazz_overrideMethod(c$,"get",
function(a){
return this.a[a];
},"~N");
Clazz_overrideMethod(c$,"set",
function(a,b){
var c=this.a[a];
this.a[a]=b;
return c;
},"~N,~O");
Clazz_overrideMethod(c$,"indexOf",
function(a){
if(a==null){
for(var b=0;b<this.a.length;b++)if(this.a[b]==null)return b;

}else{
for(var b=0;b<this.a.length;b++)if(a.equals(this.a[b]))return b;

}return-1;
},"~O");
Clazz_overrideMethod(c$,"contains",
function(a){
return this.indexOf(a)!=-1;
},"~O");
c$=Clazz_p0p();
Clazz_defineStatics(c$,
"INSERTIONSORT_THRESHOLD",7);
});
//BH note: a declared static superclass must come before a static class referencing it

Clazz_load(["java.util.AbstractList","$.AbstractMap","$.AbstractSet","$.Collection","$.Iterator","$.List","$.ListIterator","$.Map","$.RandomAccess","$.Set","$.SortedMap","$.SortedSet","java.lang.NullPointerException","$.UnsupportedOperationException","java.lang.reflect.Array"],"java.util.Collections",["java.lang.ArrayIndexOutOfBoundsException","$.ClassCastException","$.IllegalArgumentException","$.IndexOutOfBoundsException","java.util.ArrayList","$.Arrays","$.Enumeration","java.util.Map.Entry","java.util.NoSuchElementException","$.Random"],function(){
c$=Clazz_declareType(java.util,"Collections");
c$.binarySearch=Clazz_defineMethod(c$,"binarySearch",
function(list,object){
if(list==null){
throw new NullPointerException();
}if(list.isEmpty()){
return-1;
}var key=object;
if(!(Clazz_instanceOf(list,java.util.RandomAccess))){
var it=list.listIterator();
while(it.hasNext()){
var result;
if((result=key.compareTo(it.next()))<=0){
if(result==0){
return it.previousIndex();
}return-it.previousIndex()-1;
}}
return-list.size()-1;
}var low=0;
var mid=list.size();
var high=mid-1;
var result=-1;
while(low<=high){
mid=(low+high)>>1;
if((result=key.compareTo(list.get(mid)))>0){
low=mid+1;
}else if(result==0){
return mid;
}else{
high=mid-1;
}}
return-mid-(result<0?1:2);
},"java.util.List,~O");
c$.binarySearch=Clazz_defineMethod(c$,"binarySearch",
function(list,object,comparator){
if(comparator==null){
return java.util.Collections.binarySearch(list,object);
}if(!(Clazz_instanceOf(list,java.util.RandomAccess))){
var it=list.listIterator();
while(it.hasNext()){
var result;
if((result=comparator.compare(object,it.next()))<=0){
if(result==0){
return it.previousIndex();
}return-it.previousIndex()-1;
}}
return-list.size()-1;
}var low=0;
var mid=list.size();
var high=mid-1;
var result=-1;
while(low<=high){
mid=(low+high)>>1;
if((result=comparator.compare(object,list.get(mid)))>0){
low=mid+1;
}else if(result==0){
return mid;
}else{
high=mid-1;
}}
return-mid-(result<0?1:2);
},"java.util.List,~O,java.util.Comparator");
c$.copy=Clazz_defineMethod(c$,"copy",
function(destination,source){
if(destination.size()<source.size()){
throw new ArrayIndexOutOfBoundsException();
}var srcIt=source.iterator();
var destIt=destination.listIterator();
while(srcIt.hasNext()){
try{
destIt.next();
}catch(e){
if(Clazz_instanceOf(e,java.util.NoSuchElementException)){
throw new ArrayIndexOutOfBoundsException();
}else{
throw e;
}
}
destIt.set(srcIt.next());
}
},"java.util.List,java.util.List");
c$.enumeration=Clazz_defineMethod(c$,"enumeration",
function(collection){
var c=collection;

if (!Clazz_isClassDefined("java.util.Collections$1"))
	java.util.Collections.$Collections$1$(c);

var x = Clazz_innerTypeInstance(java.util.Collections$1,this,null);

return x;
},"java.util.Collection");

c$.fill=Clazz_defineMethod(c$,"fill",
function(list,object){
var it=list.listIterator();
while(it.hasNext()){
it.next();
it.set(object);
}
},"java.util.List,~O");
c$.max=Clazz_defineMethod(c$,"max",
function(collection){
var it=collection.iterator();
var max=it.next();
while(it.hasNext()){
var next=it.next();
if(max.compareTo(next)<0){
max=next;
}}
return max;
},"java.util.Collection");
c$.max=Clazz_defineMethod(c$,"max",
function(collection,comparator){
var it=collection.iterator();
var max=it.next();
while(it.hasNext()){
var next=it.next();
if(comparator.compare(max,next)<0){
max=next;
}}
return max;
},"java.util.Collection,java.util.Comparator");
c$.min=Clazz_defineMethod(c$,"min",
function(collection){
var it=collection.iterator();
var min=it.next();
while(it.hasNext()){
var next=it.next();
if(min.compareTo(next)>0){
min=next;
}}
return min;
},"java.util.Collection");
c$.min=Clazz_defineMethod(c$,"min",
function(collection,comparator){
var it=collection.iterator();
var min=it.next();
while(it.hasNext()){
var next=it.next();
if(comparator.compare(min,next)>0){
min=next;
}}
return min;
},"java.util.Collection,java.util.Comparator");
c$.nCopies=Clazz_defineMethod(c$,"nCopies",
function(length,object){
return new java.util.Collections.CopiesList(length,object);
},"~N,~O");
c$.reverse=Clazz_defineMethod(c$,"reverse",
function(list){
var size=list.size();
var front=list.listIterator();
var back=list.listIterator(size);
for(var i=0;i<Math.floor(size/2);i++){
var frontNext=front.next();
var backPrev=back.previous();
front.set(backPrev);
back.set(frontNext);
}
},"java.util.List");
c$.reverseOrder=Clazz_defineMethod(c$,"reverseOrder",
function(){
return new java.util.Collections.ReverseComparator();
});
c$.reverseOrder=Clazz_defineMethod(c$,"reverseOrder",
function(c){
if(c==null){
return java.util.Collections.reverseOrder();
}return new java.util.Collections.ReverseComparatorWithComparator(c);
},"java.util.Comparator");
c$.shuffle=Clazz_defineMethod(c$,"shuffle",
function(list){
java.util.Collections.shuffle(list,new java.util.Random());
},"java.util.List");
c$.shuffle=Clazz_defineMethod(c$,"shuffle",
function(list,random){
if(!(Clazz_instanceOf(list,java.util.RandomAccess))){
var array=list.toArray();
for(var i=array.length-1;i>0;i--){
var index=random.nextInt()%(i+1);
if(index<0){
index=-index;
}var temp=array[i];
array[i]=array[index];
array[index]=temp;
}
var i=0;
var it=list.listIterator();
while(it.hasNext()){
it.next();
it.set(array[i++]);
}
}else{
var rawList=list;
for(var i=rawList.size()-1;i>0;i--){
var index=random.nextInt()%(i+1);
if(index<0){
index=-index;
}rawList.set(index,rawList.set(i,rawList.get(index)));
}
}},"java.util.List,java.util.Random");
c$.singleton=Clazz_defineMethod(c$,"singleton",
function(object){
return new java.util.Collections.SingletonSet(object);
},"~O");
c$.singletonList=Clazz_defineMethod(c$,"singletonList",
function(object){
return new java.util.Collections.SingletonList(object);
},"~O");
c$.singletonMap=Clazz_defineMethod(c$,"singletonMap",
function(key,value){
return new java.util.Collections.SingletonMap(key,value);
},"~O,~O");
c$.sort=Clazz_defineMethod(c$,"sort",
function(list){
var array=list.toArray();
java.util.Arrays.sort(array);
var i=0;
var it=list.listIterator();
while(it.hasNext()){
it.next();
it.set(array[i++]);
}
},"java.util.List");
c$.sort=Clazz_defineMethod(c$,"sort",
function(list,comparator){
var array=list.toArray(new Array(list.size()));
java.util.Arrays.sort(array,comparator);
var i=0;
var it=list.listIterator();
while(it.hasNext()){
it.next();
it.set(array[i++]);
}
},"java.util.List,java.util.Comparator");
c$.swap=Clazz_defineMethod(c$,"swap",
function(list,index1,index2){
if(list==null){
throw new NullPointerException();
}if(index1==index2){
return;
}var rawList=list;
rawList.set(index2,rawList.set(index1,rawList.get(index2)));
},"java.util.List,~N,~N");
c$.replaceAll=Clazz_defineMethod(c$,"replaceAll",
function(list,obj,obj2){
var index;
var found=false;
while((index=list.indexOf(obj))>-1){
found=true;
list.set(index,obj2);
}
return found;
},"java.util.List,~O,~O");
c$.rotate=Clazz_defineMethod(c$,"rotate",
function(lst,dist){
var list=lst;
var size=list.size();
if(size==0){
return;
}var normdist;
if(dist>0){
normdist=dist%size;
}else{
normdist=size-((dist%size)*(-1));
}if(normdist==0||normdist==size){
return;
}if(Clazz_instanceOf(list,java.util.RandomAccess)){
var temp=list.get(0);
var index=0;
var beginIndex=0;
for(var i=0;i<size;i++){
index=(index+normdist)%size;
temp=list.set(index,temp);
if(index==beginIndex){
index=++beginIndex;
temp=list.get(beginIndex);
}}
}else{
var divideIndex=(size-normdist)%size;
var sublist1=list.subList(0,divideIndex);
var sublist2=list.subList(divideIndex,size);
java.util.Collections.reverse(sublist1);
java.util.Collections.reverse(sublist2);
java.util.Collections.reverse(list);
}},"java.util.List,~N");
c$.indexOfSubList=Clazz_defineMethod(c$,"indexOfSubList",
function(list,sublist){
var size=list.size();
var sublistSize=sublist.size();
if(sublistSize>size){
return-1;
}if(sublistSize==0){
return 0;
}var firstObj=sublist.get(0);
var index=list.indexOf(firstObj);
if(index==-1){
return-1;
}while(index<size&&(size-index>=sublistSize)){
var listIt=list.listIterator(index);
if((firstObj==null)?listIt.next()==null:firstObj.equals(listIt.next())){
var sublistIt=sublist.listIterator(1);
var difFound=false;
while(sublistIt.hasNext()){
var element=sublistIt.next();
if(!listIt.hasNext()){
return-1;
}if((element==null)?listIt.next()!=null:!element.equals(listIt.next())){
difFound=true;
break;
}}
if(!difFound){
return index;
}}index++;
}
return-1;
},"java.util.List,java.util.List");
c$.lastIndexOfSubList=Clazz_defineMethod(c$,"lastIndexOfSubList",
function(list,sublist){
var sublistSize=sublist.size();
var size=list.size();
if(sublistSize>size){
return-1;
}if(sublistSize==0){
return size;
}var lastObj=sublist.get(sublistSize-1);
var index=list.lastIndexOf(lastObj);
while((index>-1)&&(index+1>=sublistSize)){
var listIt=list.listIterator(index+1);
if((lastObj==null)?listIt.previous()==null:lastObj.equals(listIt.previous())){
var sublistIt=sublist.listIterator(sublistSize-1);
var difFound=false;
while(sublistIt.hasPrevious()){
var element=sublistIt.previous();
if(!listIt.hasPrevious()){
return-1;
}if((element==null)?listIt.previous()!=null:!element.equals(listIt.previous())){
difFound=true;
break;
}}
if(!difFound){
return listIt.nextIndex();
}}index--;
}
return-1;
},"java.util.List,java.util.List");
c$.list=Clazz_defineMethod(c$,"list",
function(enumeration){
var list=new java.util.ArrayList();
while(enumeration.hasMoreElements()){
list.add(enumeration.nextElement());
}
return list;
},"java.util.Enumeration");
c$.synchronizedCollection=Clazz_defineMethod(c$,"synchronizedCollection",
function(collection){
if(collection==null){
throw new NullPointerException();
}return new java.util.Collections.SynchronizedCollection(collection);
},"java.util.Collection");
c$.synchronizedList=Clazz_defineMethod(c$,"synchronizedList",
function(list){
if(list==null){
throw new NullPointerException();
}if(Clazz_instanceOf(list,java.util.RandomAccess)){
return new java.util.Collections.SynchronizedRandomAccessList(list);
}return new java.util.Collections.SynchronizedList(list);
},"java.util.List");
c$.synchronizedMap=Clazz_defineMethod(c$,"synchronizedMap",
function(map){
if(map==null){
throw new NullPointerException();
}return new java.util.Collections.SynchronizedMap(map);
},"java.util.Map");
c$.synchronizedSet=Clazz_defineMethod(c$,"synchronizedSet",
function(set){
if(set==null){
throw new NullPointerException();
}return new java.util.Collections.SynchronizedSet(set);
},"java.util.Set");
c$.synchronizedSortedMap=Clazz_defineMethod(c$,"synchronizedSortedMap",
function(map){
if(map==null){
throw new NullPointerException();
}return new java.util.Collections.SynchronizedSortedMap(map);
},"java.util.SortedMap");
c$.synchronizedSortedSet=Clazz_defineMethod(c$,"synchronizedSortedSet",
function(set){
if(set==null){
throw new NullPointerException();
}return new java.util.Collections.SynchronizedSortedSet(set);
},"java.util.SortedSet");
c$.unmodifiableCollection=Clazz_defineMethod(c$,"unmodifiableCollection",
function(collection){
if(collection==null){
throw new NullPointerException();
}return new java.util.Collections.UnmodifiableCollection(collection);
},"java.util.Collection");
c$.unmodifiableList=Clazz_defineMethod(c$,"unmodifiableList",
function(list){
if(list==null){
throw new NullPointerException();
}if(Clazz_instanceOf(list,java.util.RandomAccess)){
return new java.util.Collections.UnmodifiableRandomAccessList(list);
}return new java.util.Collections.UnmodifiableList(list);
},"java.util.List");
c$.unmodifiableMap=Clazz_defineMethod(c$,"unmodifiableMap",
function(map){
if(map==null){
throw new NullPointerException();
}return new java.util.Collections.UnmodifiableMap(map);
},"java.util.Map");
c$.unmodifiableSet=Clazz_defineMethod(c$,"unmodifiableSet",
function(set){
if(set==null){
throw new NullPointerException();
}return new java.util.Collections.UnmodifiableSet(set);
},"java.util.Set");
c$.unmodifiableSortedMap=Clazz_defineMethod(c$,"unmodifiableSortedMap",
function(map){
if(map==null){
throw new NullPointerException();
}return new java.util.Collections.UnmodifiableSortedMap(map);
},"java.util.SortedMap");
c$.unmodifiableSortedSet=Clazz_defineMethod(c$,"unmodifiableSortedSet",
function(set){
if(set==null){
throw new NullPointerException();
}return new java.util.Collections.UnmodifiableSortedSet(set);
},"java.util.SortedSet");
c$.frequency=Clazz_defineMethod(c$,"frequency",
function(c,o){
if(c==null){
throw new NullPointerException();
}if(c.isEmpty()){
return 0;
}
var result=0;
var itr=c.iterator();
while(itr.hasNext()){
var e=itr.next();
if(o==null?e==null:o.equals(e)){
result++;
}}
return result;
},"java.util.Collection,~O");

c$.emptyList=Clazz_defineMethod(c$,"emptyList",
function(){
return java.util.Collections.EMPTY_LIST;
});
c$.emptySet=Clazz_defineMethod(c$,"emptySet",
function(){
return java.util.Collections.EMPTY_SET;
});
c$.emptyMap=Clazz_defineMethod(c$,"emptyMap",
function(){
return java.util.Collections.EMPTY_MAP;
});
c$.checkedCollection=Clazz_defineMethod(c$,"checkedCollection",
function(c,type){
return new java.util.Collections.CheckedCollection(c,type);
},"java.util.Collection,Class");
c$.checkedMap=Clazz_defineMethod(c$,"checkedMap",
function(m,keyType,valueType){
return new java.util.Collections.CheckedMap(m,keyType,valueType);
},"java.util.Map,Class,Class");
c$.checkedList=Clazz_defineMethod(c$,"checkedList",
function(list,type){
if(Clazz_instanceOf(list,java.util.RandomAccess)){
return new java.util.Collections.CheckedRandomAccessList(list,type);
}return new java.util.Collections.CheckedList(list,type);
},"java.util.List,Class");
c$.checkedSet=Clazz_defineMethod(c$,"checkedSet",
function(s,type){
return new java.util.Collections.CheckedSet(s,type);
},"java.util.Set,Class");
c$.checkedSortedMap=Clazz_defineMethod(c$,"checkedSortedMap",
function(m,keyType,valueType){
return new java.util.Collections.CheckedSortedMap(m,keyType,valueType);
},"java.util.SortedMap,Class,Class");
c$.checkedSortedSet=Clazz_defineMethod(c$,"checkedSortedSet",
function(s,type){
return new java.util.Collections.CheckedSortedSet(s,type);
},"java.util.SortedSet,Class");
c$.addAll=Clazz_defineMethod(c$,"addAll",
function(c,a){
var modified=false;
for(var i=0;i<a.length;i++){
modified=new Boolean(modified|c.add(a[i])).valueOf();
}
return modified;
},"java.util.Collection,~A");
c$.disjoint=Clazz_defineMethod(c$,"disjoint",
function(c1,c2){
if((Clazz_instanceOf(c1,java.util.Set))&&!(Clazz_instanceOf(c2,java.util.Set))||(c2.size())>c1.size()){
var tmp=c1;
c1=c2;
c2=tmp;
}var it=c1.iterator();
while(it.hasNext()){
if(c2.contains(it.next())){
return false;
}}
return true;
},"java.util.Collection,java.util.Collection");
c$.checkType=Clazz_defineMethod(c$,"checkType",
function(obj,type){
if(!type.isInstance(obj)){
throw new ClassCastException("Attempt to insert "+obj.getClass()+" element into collection with element type "+type);
}return obj;
},"~O,Class");

c$.$Collections$1$=function(c){
Clazz_pu$h(self.c$);
c$=Clazz_decorateAsClass(function(){
Clazz_prepareCallback(this,arguments);
this.it=null;
Clazz_instantialize(this,arguments);
},java.util,"Collections$1",null,java.util.Enumeration);

Clazz_prepareFields(c$,function(){
this.it=c.iterator();
});

Clazz_defineMethod(c$,"hasMoreElements",
function(){
return this.it.hasNext();
});
Clazz_defineMethod(c$,"nextElement",
function(){
return this.it.next();
});
c$=Clazz_p0p();
};

Clazz_pu$h(self.c$);
c$=Clazz_decorateAsClass(function(){
this.n=0;
this.element=null;
Clazz_instantialize(this,arguments);
},java.util.Collections,"CopiesList",java.util.AbstractList,java.io.Serializable);
Clazz_makeConstructor(c$,
function(a,b){
Clazz_superConstructor(this,java.util.Collections.CopiesList,[]);
if(a<0){
throw new IllegalArgumentException();
}this.n=a;
this.element=b;
},"~N,~O");
Clazz_overrideMethod(c$,"contains",
function(a){
return this.element==null?a==null:this.element.equals(a);
},"~O");
Clazz_overrideMethod(c$,"size",
function(){
return this.n;
});
Clazz_overrideMethod(c$,"get",
function(a){
if(0<=a&&a<this.n){
return this.element;
}throw new IndexOutOfBoundsException();
},"~N");
c$=Clazz_p0p();
Clazz_pu$h(self.c$);
c$=Clazz_declareType(java.util.Collections,"EmptyList",java.util.AbstractList,java.io.Serializable);
Clazz_overrideMethod(c$,"contains",
function(a){
return false;
},"~O");
Clazz_overrideMethod(c$,"size",
function(){
return 0;
});
Clazz_overrideMethod(c$,"get",
function(a){
throw new IndexOutOfBoundsException();
},"~N");
c$=Clazz_p0p();
Clazz_pu$h(self.c$);
c$=Clazz_declareType(java.util.Collections,"EmptySet",java.util.AbstractSet,java.io.Serializable);
Clazz_overrideMethod(c$,"contains",
function(a){
return false;
},"~O");
Clazz_overrideMethod(c$,"size",
function(){
return 0;
});
Clazz_overrideMethod(c$,"iterator",
function(){
return((Clazz_isClassDefined("java.util.Collections$EmptySet$1")?0:java.util.Collections.EmptySet.$Collections$EmptySet$1$()),Clazz_innerTypeInstance(java.util.Collections$EmptySet$1,this,null));
});
c$.$Collections$EmptySet$1$=function(){
Clazz_pu$h(self.c$);
c$=Clazz_declareAnonymous(java.util,"Collections$EmptySet$1",null,java.util.Iterator);
Clazz_overrideMethod(c$,"hasNext",
function(){
return false;
});
Clazz_overrideMethod(c$,"next",
function(){
throw new java.util.NoSuchElementException();
});
Clazz_overrideMethod(c$,"remove",
function(){
throw new UnsupportedOperationException();
});
c$=Clazz_p0p();
};
c$=Clazz_p0p();
Clazz_pu$h(self.c$);
c$=Clazz_declareType(java.util.Collections,"EmptyMap",java.util.AbstractMap,java.io.Serializable);
Clazz_overrideMethod(c$,"containsKey",
function(a){
return false;
},"~O");
Clazz_overrideMethod(c$,"containsValue",
function(a){
return false;
},"~O");
Clazz_overrideMethod(c$,"entrySet",
function(){
return java.util.Collections.EMPTY_SET;
});
Clazz_overrideMethod(c$,"get",
function(a){
return null;
},"~O");
Clazz_overrideMethod(c$,"keySet",
function(){
return java.util.Collections.EMPTY_SET;
});
Clazz_overrideMethod(c$,"values",
function(){
return java.util.Collections.EMPTY_LIST;
});
c$=Clazz_p0p();
Clazz_pu$h(self.c$);
c$=Clazz_declareType(java.util.Collections,"ReverseComparator",null,[java.util.Comparator,java.io.Serializable]);
Clazz_overrideMethod(c$,"compare",
function(a,b){
var c=b;
return c.compareTo(a);
},"~O,~O");
c$=Clazz_p0p();
Clazz_pu$h(self.c$);
c$=Clazz_decorateAsClass(function(){
this.comparator=null;
Clazz_instantialize(this,arguments);
},java.util.Collections,"ReverseComparatorWithComparator",null,[java.util.Comparator,java.io.Serializable]);
Clazz_makeConstructor(c$,
function(a){
this.comparator=a;
},"java.util.Comparator");
Clazz_defineMethod(c$,"compare",
function(a,b){
return this.comparator.compare(b,a);
},"~O,~O");
c$=Clazz_p0p();
Clazz_pu$h(self.c$);
c$=Clazz_decorateAsClass(function(){
this.element=null;
Clazz_instantialize(this,arguments);
},java.util.Collections,"SingletonSet",java.util.AbstractSet,java.io.Serializable);
Clazz_makeConstructor(c$,
function(a){
Clazz_superConstructor(this,java.util.Collections.SingletonSet,[]);
this.element=a;
},"~O");
Clazz_overrideMethod(c$,"contains",
function(a){
return this.element==null?a==null:this.element.equals(a);
},"~O");
Clazz_overrideMethod(c$,"size",
function(){
return 1;
});
Clazz_overrideMethod(c$,"iterator",
function(){
return((Clazz_isClassDefined("java.util.Collections$SingletonSet$1")?0:java.util.Collections.SingletonSet.$Collections$SingletonSet$1$()),Clazz_innerTypeInstance(java.util.Collections$SingletonSet$1,this,null));
});
c$.$Collections$SingletonSet$1$=function(){
Clazz_pu$h(self.c$);
c$=Clazz_decorateAsClass(function(){
Clazz_prepareCallback(this,arguments);
this.$hasNext=true;
Clazz_instantialize(this,arguments);
},java.util,"Collections$SingletonSet$1",null,java.util.Iterator);
Clazz_overrideMethod(c$,"hasNext",
function(){
return this.$hasNext;
});
Clazz_overrideMethod(c$,"next",
function(){
if(this.$hasNext){
this.$hasNext=false;
return this.b$["java.util.Collections.SingletonSet"].element;
}throw new java.util.NoSuchElementException();
});
Clazz_overrideMethod(c$,"remove",
function(){
throw new UnsupportedOperationException();
});
c$=Clazz_p0p();
};
c$=Clazz_p0p();
Clazz_pu$h(self.c$);
c$=Clazz_decorateAsClass(function(){
this.element=null;
Clazz_instantialize(this,arguments);
},java.util.Collections,"SingletonList",java.util.AbstractList,java.io.Serializable);
Clazz_makeConstructor(c$,
function(a){
Clazz_superConstructor(this,java.util.Collections.SingletonList,[]);
this.element=a;
},"~O");
Clazz_overrideMethod(c$,"contains",
function(a){
return this.element==null?a==null:this.element.equals(a);
},"~O");
Clazz_overrideMethod(c$,"get",
function(a){
if(a==0){
return this.element;
}throw new IndexOutOfBoundsException();
},"~N");
Clazz_overrideMethod(c$,"size",
function(){
return 1;
});
c$=Clazz_p0p();
Clazz_pu$h(self.c$);
c$=Clazz_decorateAsClass(function(){
this.k=null;
this.v=null;
Clazz_instantialize(this,arguments);
},java.util.Collections,"SingletonMap",java.util.AbstractMap,java.io.Serializable);
Clazz_makeConstructor(c$,
function(a,b){
Clazz_superConstructor(this,java.util.Collections.SingletonMap,[]);
this.k=a;
this.v=b;
},"~O,~O");
Clazz_overrideMethod(c$,"containsKey",
function(a){
return this.k==null?a==null:this.k.equals(a);
},"~O");
Clazz_overrideMethod(c$,"containsValue",
function(a){
return this.v==null?a==null:this.v.equals(a);
},"~O");
Clazz_overrideMethod(c$,"get",
function(a){
if(this.containsKey(a)){
return this.v;
}return null;
},"~O");
Clazz_overrideMethod(c$,"size",
function(){
return 1;
});
Clazz_overrideMethod(c$,"entrySet",
function(){
return((Clazz_isClassDefined("java.util.Collections$SingletonMap$1")?0:java.util.Collections.SingletonMap.$Collections$SingletonMap$1$()),Clazz_innerTypeInstance(java.util.Collections$SingletonMap$1,this,null));
});
c$.$Collections$SingletonMap$1$=function(){
Clazz_pu$h(self.c$);
c$=Clazz_declareAnonymous(java.util,"Collections$SingletonMap$1",java.util.AbstractSet);
Clazz_overrideMethod(c$,"contains",
function(a){
if(Clazz_instanceOf(a,java.util.Map.Entry)){
var b=a;
return this.b$["java.util.Collections.SingletonMap"].containsKey(b.getKey())&&this.b$["java.util.Collections.SingletonMap"].containsValue(b.getValue());
}return false;
},"~O");
Clazz_overrideMethod(c$,"size",
function(){
return 1;
});
Clazz_overrideMethod(c$,"iterator",
function(){
return((Clazz_isClassDefined("java.util.Collections$SingletonMap$1$1")?0:java.util.Collections.$Collections$SingletonMap$1$1$()),Clazz_innerTypeInstance(java.util.Collections$SingletonMap$1$1,this,null));
});
c$=Clazz_p0p();
};
c$.$Collections$SingletonMap$1$1$=function(){
Clazz_pu$h(self.c$);
c$=Clazz_decorateAsClass(function(){
Clazz_prepareCallback(this,arguments);
this.$hasNext=true;
Clazz_instantialize(this,arguments);
},java.util,"Collections$SingletonMap$1$1",null,java.util.Iterator);
Clazz_overrideMethod(c$,"hasNext",
function(){
return this.$hasNext;
});
Clazz_overrideMethod(c$,"next",
function(){
if(this.$hasNext){
this.$hasNext=false;
return((Clazz_isClassDefined("java.util.Collections$SingletonMap$1$1$1")?0:java.util.Collections.$Collections$SingletonMap$1$1$1$()),Clazz_innerTypeInstance(java.util.Collections$SingletonMap$1$1$1,this,null));
}throw new java.util.NoSuchElementException();
});
Clazz_overrideMethod(c$,"remove",
function(){
throw new UnsupportedOperationException();
});
c$=Clazz_p0p();
};
c$.$Collections$SingletonMap$1$1$1$=function(){
Clazz_pu$h(self.c$);
c$=Clazz_declareAnonymous(java.util,"Collections$SingletonMap$1$1$1",null,java.util.Map.Entry);
Clazz_overrideMethod(c$,"equals",
function(a){
return this.b$["java.util.Collections$SingletonMap$1"].contains(a);
},"~O");
Clazz_overrideMethod(c$,"getKey",
function(){
return this.b$["java.util.Collections.SingletonMap"].k;
});
Clazz_overrideMethod(c$,"getValue",
function(){
return this.b$["java.util.Collections.SingletonMap"].v;
});
Clazz_overrideMethod(c$,"hashCode",
function(){
return(this.b$["java.util.Collections.SingletonMap"].k==null?0:this.b$["java.util.Collections.SingletonMap"].k.hashCode())^(this.b$["java.util.Collections.SingletonMap"].v==null?0:this.b$["java.util.Collections.SingletonMap"].v.hashCode());
});
Clazz_overrideMethod(c$,"setValue",
function(a){
throw new UnsupportedOperationException();
},"~O");
c$=Clazz_p0p();
};
c$=Clazz_p0p();
Clazz_pu$h(self.c$);
c$=Clazz_decorateAsClass(function(){
this.c=null;
this.mutex=null;
Clazz_instantialize(this,arguments);
},java.util.Collections,"SynchronizedCollection",null,[java.util.Collection,java.io.Serializable]);
Clazz_makeConstructor(c$,
function(a){
this.c=a;
this.mutex=this;
},"java.util.Collection");
Clazz_makeConstructor(c$,
function(a,b){
this.c=a;
this.mutex=b;
},"java.util.Collection,~O");
Clazz_defineMethod(c$,"add",
function(a){
{
return this.c.add(a);
}},"~O");
Clazz_defineMethod(c$,"addAll",
function(a){
{
return this.c.addAll(a);
}},"java.util.Collection");
Clazz_defineMethod(c$,"clear",
function(){
{
this.c.clear();
}});
Clazz_defineMethod(c$,"contains",
function(a){
{
return this.c.contains(a);
}},"~O");
Clazz_defineMethod(c$,"containsAll",
function(a){
{
return this.c.containsAll(a);
}},"java.util.Collection");
Clazz_defineMethod(c$,"isEmpty",
function(){
{
return this.c.isEmpty();
}});
Clazz_defineMethod(c$,"iterator",
function(){
{
return this.c.iterator();
}});
Clazz_defineMethod(c$,"remove",
function(a){
{
return this.c.remove(a);
}},"~O");
Clazz_defineMethod(c$,"removeAll",
function(a){
{
return this.c.removeAll(a);
}},"java.util.Collection");
Clazz_defineMethod(c$,"retainAll",
function(a){
{
return this.c.retainAll(a);
}},"java.util.Collection");
Clazz_defineMethod(c$,"size",
function(){
{
return this.c.size();
}});
Clazz_defineMethod(c$,"toArray",
function(){
{
return this.c.toArray();
}});
Clazz_defineMethod(c$,"toString",
function(){
{
return this.c.toString();
}});
Clazz_defineMethod(c$,"toArray",
function(a){
{
return this.c.toArray(a);
}},"~A");
c$=Clazz_p0p();


Clazz_pu$h(self.c$);
c$=Clazz_decorateAsClass(function(){
this.list=null;
Clazz_instantialize(this,arguments);
},java.util.Collections,"SynchronizedList",java.util.Collections.SynchronizedCollection,java.util.List);
Clazz_makeConstructor(c$,
function(a){
Clazz_superConstructor(this,java.util.Collections.SynchronizedList,[a]);
this.list=a;
},"java.util.List");
Clazz_makeConstructor(c$,
function(a,b){
Clazz_superConstructor(this,java.util.Collections.SynchronizedList,[a,b]);
this.list=a;
},"java.util.List,~O");
Clazz_defineMethod(c$,"add",
function(a,b){
{
this.list.add(a,b);
}},"~N,~O");
Clazz_defineMethod(c$,"addAll",
function(a,b){
{
return this.list.addAll(a,b);
}},"~N,java.util.Collection");
Clazz_overrideMethod(c$,"equals",
function(a){
{
return this.list.equals(a);
}},"~O");
Clazz_defineMethod(c$,"get",
function(a){
{
return this.list.get(a);
}},"~N");
Clazz_overrideMethod(c$,"hashCode",
function(){
{
return this.list.hashCode();
}});
Clazz_defineMethod(c$,"indexOf",
function(a){
{
return this.list.indexOf(a);
}},"~O");
Clazz_defineMethod(c$,"lastIndexOf",
function(a){
{
return this.list.lastIndexOf(a);
}},"~O");
//Clazz_defineMethod(c$,"listIterator",
//function(){
//{
//return this.list.listIterator();
//}});
Clazz_defineMethod(c$,"listIterator",
function(a){
{
a || (a = 0);
return this.list.listIterator(a);
}},"~N");
Clazz_defineMethod(c$,"remove",
function(a){
{
return this.list.remove(a);
}},"~N");
Clazz_defineMethod(c$,"set",
function(a,b){
{
return this.list.set(a,b);
}},"~N,~O");
Clazz_defineMethod(c$,"subList",
function(a,b){
{
return new java.util.Collections.SynchronizedList(this.list.subList(a,b),this.mutex);
}},"~N,~N");
c$=Clazz_p0p();



Clazz_pu$h(self.c$);
c$=Clazz_declareType(java.util.Collections,"SynchronizedRandomAccessList",java.util.Collections.SynchronizedList,java.util.RandomAccess);
Clazz_overrideMethod(c$,"subList",
function(a,b){
{
return new java.util.Collections.SynchronizedRandomAccessList(this.list.subList(a,b),this.mutex);
}},"~N,~N");
c$=Clazz_p0p();




Clazz_pu$h(self.c$);
c$=Clazz_decorateAsClass(function(){
this.m=null;
this.mutex=null;
Clazz_instantialize(this,arguments);
},java.util.Collections,"SynchronizedMap",null,[java.util.Map,java.io.Serializable]);
Clazz_makeConstructor(c$,
function(a){
this.m=a;
this.mutex=this;
},"java.util.Map");
Clazz_makeConstructor(c$,
function(a,b){
this.m=a;
this.mutex=b;
},"java.util.Map,~O");
Clazz_defineMethod(c$,"clear",
function(){
{
this.m.clear();
}});
Clazz_defineMethod(c$,"containsKey",
function(a){
{
return this.m.containsKey(a);
}},"~O");
Clazz_defineMethod(c$,"containsValue",
function(a){
{
return this.m.containsValue(a);
}},"~O");
Clazz_defineMethod(c$,"entrySet",
function(){
{
return new java.util.Collections.SynchronizedSet(this.m.entrySet(),this.mutex);
}});
Clazz_overrideMethod(c$,"equals",
function(a){
{
return this.m.equals(a);
}},"~O");
Clazz_defineMethod(c$,"get",
function(a){
{
return this.m.get(a);
}},"~O");
Clazz_overrideMethod(c$,"hashCode",
function(){
{
return this.m.hashCode();
}});
Clazz_defineMethod(c$,"isEmpty",
function(){
{
return this.m.isEmpty();
}});
Clazz_defineMethod(c$,"keySet",
function(){
{
return new java.util.Collections.SynchronizedSet(this.m.keySet(),this.mutex);
}});
Clazz_defineMethod(c$,"put",
function(a,b){
{
return this.m.put(a,b);
}},"~O,~O");
Clazz_defineMethod(c$,"putAll",
function(a){
{
this.m.putAll(a);
}},"java.util.Map");
Clazz_defineMethod(c$,"remove",
function(a){
{
return this.m.remove(a);
}},"~O");
Clazz_defineMethod(c$,"size",
function(){
{
return this.m.size();
}});
Clazz_defineMethod(c$,"values",
function(){
{
return new java.util.Collections.SynchronizedCollection(this.m.values(),this.mutex);
}});
Clazz_defineMethod(c$,"toString",
function(){
{
return this.m.toString();
}});
c$=Clazz_p0p();
Clazz_pu$h(self.c$);
c$=Clazz_declareType(java.util.Collections,"SynchronizedSet",java.util.Collections.SynchronizedCollection,java.util.Set);
Clazz_overrideMethod(c$,"equals",
function(a){
{
return this.c.equals(a);
}},"~O");
Clazz_overrideMethod(c$,"hashCode",
function(){
{
return this.c.hashCode();
}});
c$=Clazz_p0p();
Clazz_pu$h(self.c$);
c$=Clazz_decorateAsClass(function(){
this.sm=null;
Clazz_instantialize(this,arguments);
},java.util.Collections,"SynchronizedSortedMap",java.util.Collections.SynchronizedMap,java.util.SortedMap);
Clazz_makeConstructor(c$,
function(a){
Clazz_superConstructor(this,java.util.Collections.SynchronizedSortedMap,[a]);
this.sm=a;
},"java.util.SortedMap");
Clazz_makeConstructor(c$,
function(a,b){
Clazz_superConstructor(this,java.util.Collections.SynchronizedSortedMap,[a,b]);
this.sm=a;
},"java.util.SortedMap,~O");
Clazz_defineMethod(c$,"comparator",
function(){
{
return this.sm.comparator();
}});
Clazz_defineMethod(c$,"firstKey",
function(){
{
return this.sm.firstKey();
}});
Clazz_defineMethod(c$,"headMap",
function(a){
{
return new java.util.Collections.SynchronizedSortedMap(this.sm.headMap(a),this.mutex);
}},"~O");
Clazz_defineMethod(c$,"lastKey",
function(){
{
return this.sm.lastKey();
}});
Clazz_defineMethod(c$,"subMap",
function(a,b){
{
return new java.util.Collections.SynchronizedSortedMap(this.sm.subMap(a,b),this.mutex);
}},"~O,~O");
Clazz_defineMethod(c$,"tailMap",
function(a){
{
return new java.util.Collections.SynchronizedSortedMap(this.sm.tailMap(a),this.mutex);
}},"~O");
c$=Clazz_p0p();
Clazz_pu$h(self.c$);
c$=Clazz_decorateAsClass(function(){
this.ss=null;
Clazz_instantialize(this,arguments);
},java.util.Collections,"SynchronizedSortedSet",java.util.Collections.SynchronizedSet,java.util.SortedSet);
Clazz_makeConstructor(c$,
function(a){
Clazz_superConstructor(this,java.util.Collections.SynchronizedSortedSet,[a]);
this.ss=a;
},"java.util.SortedSet");
Clazz_makeConstructor(c$,
function(a,b){
Clazz_superConstructor(this,java.util.Collections.SynchronizedSortedSet,[a,b]);
this.ss=a;
},"java.util.SortedSet,~O");
Clazz_defineMethod(c$,"comparator",
function(){
{
return this.ss.comparator();
}});
Clazz_defineMethod(c$,"first",
function(){
{
return this.ss.first();
}});
Clazz_defineMethod(c$,"headSet",
function(a){
{
return new java.util.Collections.SynchronizedSortedSet(this.ss.headSet(a),this.mutex);
}},"~O");
Clazz_defineMethod(c$,"last",
function(){
{
return this.ss.last();
}});
Clazz_defineMethod(c$,"subSet",
function(a,b){
{
return new java.util.Collections.SynchronizedSortedSet(this.ss.subSet(a,b),this.mutex);
}},"~O,~O");
Clazz_defineMethod(c$,"tailSet",
function(a){
{
return new java.util.Collections.SynchronizedSortedSet(this.ss.tailSet(a),this.mutex);
}},"~O");
c$=Clazz_p0p();
Clazz_pu$h(self.c$);
c$=Clazz_decorateAsClass(function(){
this.c=null;
Clazz_instantialize(this,arguments);
},java.util.Collections,"UnmodifiableCollection",null,[java.util.Collection,java.io.Serializable]);
Clazz_makeConstructor(c$,
function(a){
this.c=a;
},"java.util.Collection");
Clazz_overrideMethod(c$,"add",
function(a){
throw new UnsupportedOperationException();
},"~O");
Clazz_overrideMethod(c$,"addAll",
function(a){
throw new UnsupportedOperationException();
},"java.util.Collection");
Clazz_overrideMethod(c$,"clear",
function(){
throw new UnsupportedOperationException();
});
Clazz_defineMethod(c$,"contains",
function(a){
return this.c.contains(a);
},"~O");
Clazz_defineMethod(c$,"containsAll",
function(a){
return this.c.containsAll(a);
},"java.util.Collection");
Clazz_defineMethod(c$,"isEmpty",
function(){
return this.c.isEmpty();
});
Clazz_defineMethod(c$,"iterator",
function(){
return((Clazz_isClassDefined("java.util.Collections$UnmodifiableCollection$1")?0:java.util.Collections.UnmodifiableCollection.$Collections$UnmodifiableCollection$1$()),Clazz_innerTypeInstance(java.util.Collections$UnmodifiableCollection$1,this,null));
});
Clazz_overrideMethod(c$,"remove",
function(a){
throw new UnsupportedOperationException();
},"~O");
Clazz_overrideMethod(c$,"removeAll",
function(a){
throw new UnsupportedOperationException();
},"java.util.Collection");
Clazz_overrideMethod(c$,"retainAll",
function(a){
throw new UnsupportedOperationException();
},"java.util.Collection");
Clazz_defineMethod(c$,"size",
function(){
return this.c.size();
});
Clazz_defineMethod(c$,"toArray",
function(){
return this.c.toArray();
});
Clazz_defineMethod(c$,"toArray",
function(a){
return this.c.toArray(a);
},"~A");
Clazz_defineMethod(c$,"toString",
function(){
return this.c.toString();
});
c$.$Collections$UnmodifiableCollection$1$=function(){
Clazz_pu$h(self.c$);
c$=Clazz_decorateAsClass(function(){
Clazz_prepareCallback(this,arguments);
this.iterator=null;
Clazz_instantialize(this,arguments);
},java.util,"Collections$UnmodifiableCollection$1",null,java.util.Iterator);
Clazz_prepareFields(c$,function(){
this.iterator=this.b$["java.util.Collections.UnmodifiableCollection"].c.iterator();
});
Clazz_defineMethod(c$,"hasNext",
function(){
return this.iterator.hasNext();
});
Clazz_defineMethod(c$,"next",
function(){
return this.iterator.next();
});
Clazz_overrideMethod(c$,"remove",
function(){
throw new UnsupportedOperationException();
});
c$=Clazz_p0p();
};
c$=Clazz_p0p();

//BH note: a declared static superclass must come before a static class referencing it

Clazz_pu$h(self.c$);
c$=Clazz_decorateAsClass(function(){
this.list=null;
Clazz_instantialize(this,arguments);
},java.util.Collections,"UnmodifiableList",java.util.Collections.UnmodifiableCollection,java.util.List);
Clazz_makeConstructor(c$,
function(a){
Clazz_superConstructor(this,java.util.Collections.UnmodifiableList,[a]);
this.list=a;
},"java.util.List");
Clazz_defineMethod(c$,"add",
function(a,b){
throw new UnsupportedOperationException();
},"~N,~O");
Clazz_defineMethod(c$,"addAll",
function(a,b){
throw new UnsupportedOperationException();
},"~N,java.util.Collection");
Clazz_overrideMethod(c$,"equals",
function(a){
return this.list.equals(a);
},"~O");
Clazz_defineMethod(c$,"get",
function(a){
return this.list.get(a);
},"~N");
Clazz_overrideMethod(c$,"hashcode",
function(){
return this.list.hashCode();
});
Clazz_defineMethod(c$,"indexOf",
function(a){
return this.list.indexOf(a);
},"~O");
Clazz_defineMethod(c$,"lastIndexOf",
function(a){
return this.list.lastIndexOf(a);
},"~O");
//Clazz_defineMethod(c$,"listIterator",
//function(){
//return this.listIterator(0);
//});
Clazz_defineMethod(c$,"listIterator",
function(a){
a || (a = 0);
return((Clazz_isClassDefined("java.util.Collections$UnmodifiableList$1")?0:java.util.Collections.UnmodifiableList.$Collections$UnmodifiableList$1$()),Clazz_innerTypeInstance(java.util.Collections$UnmodifiableList$1,this,null));
},"~N");
Clazz_defineMethod(c$,"remove",
function(a){
throw new UnsupportedOperationException();
},"~N");
Clazz_overrideMethod(c$,"set",
function(a,b){
throw new UnsupportedOperationException();
},"~N,~O");
Clazz_defineMethod(c$,"subList",
function(a,b){
return new java.util.Collections.UnmodifiableList(this.list.subList(a,b));
},"~N,~N");
c$.$Collections$UnmodifiableList$1$=function(){
Clazz_pu$h(self.c$);
c$=Clazz_decorateAsClass(function(){
Clazz_prepareCallback(this,arguments);
this.iterator=null;
Clazz_instantialize(this,arguments);
},java.util,"Collections$UnmodifiableList$1",null,java.util.ListIterator);
Clazz_prepareFields(c$,function(){
this.iterator=this.b$["java.util.Collections.UnmodifiableList"].list.listIterator(location);
});
Clazz_overrideMethod(c$,"add",
function(b){
throw new UnsupportedOperationException();
},"~O");
Clazz_defineMethod(c$,"hasNext",
function(){
return this.iterator.hasNext();
});
Clazz_defineMethod(c$,"hasPrevious",
function(){
return this.iterator.hasPrevious();
});
Clazz_defineMethod(c$,"next",
function(){
return this.iterator.next();
});
Clazz_defineMethod(c$,"nextIndex",
function(){
return this.iterator.nextIndex();
});
Clazz_defineMethod(c$,"previous",
function(){
return this.iterator.previous();
});
Clazz_defineMethod(c$,"previousIndex",
function(){
return this.iterator.previousIndex();
});
Clazz_overrideMethod(c$,"remove",
function(){
throw new UnsupportedOperationException();
});
Clazz_overrideMethod(c$,"set",
function(b){
throw new UnsupportedOperationException();
},"~O");
c$=Clazz_p0p();
};
c$=Clazz_p0p();




Clazz_pu$h(self.c$);
c$=Clazz_declareType(java.util.Collections,"UnmodifiableRandomAccessList",java.util.Collections.UnmodifiableList,java.util.RandomAccess);
Clazz_overrideMethod(c$,"subList",
function(a,b){
return new java.util.Collections.UnmodifiableRandomAccessList(this.list.subList(a,b));
},"~N,~N");
c$=Clazz_p0p();


Clazz_pu$h(self.c$);
c$=Clazz_declareType(java.util.Collections,"UnmodifiableSet",java.util.Collections.UnmodifiableCollection,java.util.Set);
Clazz_overrideMethod(c$,"equals",
function(a){
return this.c.equals(a);
},"~O");
Clazz_overrideMethod(c$,"hashCode",
function(){
return this.c.hashCode();
});
c$=Clazz_p0p();


Clazz_pu$h(self.c$);
c$=Clazz_decorateAsClass(function(){
this.m=null;
Clazz_instantialize(this,arguments);
},java.util.Collections,"UnmodifiableMap",null,[java.util.Map,java.io.Serializable]);
Clazz_makeConstructor(c$,
function(a){
this.m=a;
},"java.util.Map");
Clazz_overrideMethod(c$,"clear",
function(){
throw new UnsupportedOperationException();
});
Clazz_defineMethod(c$,"containsKey",
function(a){
return this.m.containsKey(a);
},"~O");
Clazz_defineMethod(c$,"containsValue",
function(a){
return this.m.containsValue(a);
},"~O");
Clazz_defineMethod(c$,"entrySet",
function(){
return new java.util.Collections.UnmodifiableMap.UnmodifiableEntrySet(this.m.entrySet());
});
Clazz_overrideMethod(c$,"equals",
function(a){
return this.m.equals(a);
},"~O");
Clazz_defineMethod(c$,"get",
function(a){
return this.m.get(a);
},"~O");
Clazz_overrideMethod(c$,"hashcode",
function(){
return this.m.hashCode();
});
Clazz_defineMethod(c$,"isEmpty",
function(){
return this.m.isEmpty();
});
Clazz_defineMethod(c$,"keySet",
function(){
return new java.util.Collections.UnmodifiableSet(this.m.keySet());
});
Clazz_overrideMethod(c$,"put",
function(a,b){
throw new UnsupportedOperationException();
},"~O,~O");
Clazz_overrideMethod(c$,"putAll",
function(a){
throw new UnsupportedOperationException();
},"java.util.Map");
Clazz_overrideMethod(c$,"remove",
function(a){
throw new UnsupportedOperationException();
},"~O");
Clazz_defineMethod(c$,"size",
function(){
return this.m.size();
});
Clazz_defineMethod(c$,"values",
function(){
return new java.util.Collections.UnmodifiableCollection(this.m.values());
});
Clazz_defineMethod(c$,"toString",
function(){
return this.m.toString();
});







Clazz_pu$h(self.c$);
c$=Clazz_declareType(java.util.Collections.UnmodifiableMap,"UnmodifiableEntrySet",java.util.Collections.UnmodifiableSet);
Clazz_overrideMethod(c$,"iterator",
function(){
return((Clazz_isClassDefined("java.util.Collections$UnmodifiableMap$UnmodifiableEntrySet$1")?0:java.util.Collections.UnmodifiableMap.UnmodifiableEntrySet.$Collections$UnmodifiableMap$UnmodifiableEntrySet$1$()),Clazz_innerTypeInstance(java.util.Collections$UnmodifiableMap$UnmodifiableEntrySet$1,this,null));
});
Clazz_defineMethod(c$,"toArray",
function(){
var a=this.c.size();
var b=new Array(a);
var c=this.iterator();
for(var d=a;--d>=0;){
b[d]=c.next();
}
return b;
});
Clazz_defineMethod(c$,"toArray",
function(a){
var b=this.c.size();
var c=0;
var d=this.iterator();
if(b>a.length){
var e=a.getClass().getComponentType();
a=java.lang.reflect.Array.newInstance(e,b);
}while(c<b){
a[c++]=d.next();
}
if(c<a.length){
a[c]=null;
}return a;
},"~A");
c$.$Collections$UnmodifiableMap$UnmodifiableEntrySet$1$=function(){
Clazz_pu$h(self.c$);
c$=Clazz_decorateAsClass(function(){
Clazz_prepareCallback(this,arguments);
this.iterator=null;
Clazz_instantialize(this,arguments);
},java.util,"Collections$UnmodifiableMap$UnmodifiableEntrySet$1",null,java.util.Iterator);
Clazz_prepareFields(c$,function(){
this.iterator=this.b$["java.util.Collections.UnmodifiableMap.UnmodifiableEntrySet"].c.iterator();
});
Clazz_defineMethod(c$,"hasNext",
function(){
return this.iterator.hasNext();
});
Clazz_defineMethod(c$,"next",
function(){
return new java.util.Collections.UnmodifiableMap.UnmodifiableEntrySet.UnmodifiableMapEntry(this.iterator.next());
});
Clazz_overrideMethod(c$,"remove",
function(){
throw new UnsupportedOperationException();
});
c$=Clazz_p0p();
};
Clazz_pu$h(self.c$);
c$=Clazz_decorateAsClass(function(){
this.mapEntry=null;
Clazz_instantialize(this,arguments);
},java.util.Collections.UnmodifiableMap.UnmodifiableEntrySet,"UnmodifiableMapEntry",null,java.util.Map.Entry);
Clazz_makeConstructor(c$,
function(a){
this.mapEntry=a;
},"java.util.Map.Entry");
Clazz_overrideMethod(c$,"equals",
function(a){
return this.mapEntry.equals(a);
},"~O");
Clazz_defineMethod(c$,"getKey",
function(){
return this.mapEntry.getKey();
});
Clazz_defineMethod(c$,"getValue",
function(){
return this.mapEntry.getValue();
});
Clazz_overrideMethod(c$,"hashcode",
function(){
return this.mapEntry.hashCode();
});
Clazz_overrideMethod(c$,"setValue",
function(a){
throw new UnsupportedOperationException();
},"~O");
Clazz_defineMethod(c$,"toString",
function(){
return this.mapEntry.toString();
});
c$=Clazz_p0p();
c$=Clazz_p0p();
c$=Clazz_p0p();



Clazz_pu$h(self.c$);
c$=Clazz_decorateAsClass(function(){
this.sm=null;
Clazz_instantialize(this,arguments);
},java.util.Collections,"UnmodifiableSortedMap",java.util.Collections.UnmodifiableMap,java.util.SortedMap);
Clazz_makeConstructor(c$,
function(a){
Clazz_superConstructor(this,java.util.Collections.UnmodifiableSortedMap,[a]);
this.sm=a;
},"java.util.SortedMap");
Clazz_defineMethod(c$,"comparator",
function(){
return this.sm.comparator();
});
Clazz_defineMethod(c$,"firstKey",
function(){
return this.sm.firstKey();
});
Clazz_defineMethod(c$,"headMap",
function(a){
return new java.util.Collections.UnmodifiableSortedMap(this.sm.headMap(a));
},"~O");
Clazz_defineMethod(c$,"lastKey",
function(){
return this.sm.lastKey();
});
Clazz_defineMethod(c$,"subMap",
function(a,b){
return new java.util.Collections.UnmodifiableSortedMap(this.sm.subMap(a,b));
},"~O,~O");
Clazz_defineMethod(c$,"tailMap",
function(a){
return new java.util.Collections.UnmodifiableSortedMap(this.sm.tailMap(a));
},"~O");
c$=Clazz_p0p();
Clazz_pu$h(self.c$);
c$=Clazz_decorateAsClass(function(){
this.ss=null;
Clazz_instantialize(this,arguments);
},java.util.Collections,"UnmodifiableSortedSet",java.util.Collections.UnmodifiableSet,java.util.SortedSet);
Clazz_makeConstructor(c$,
function(a){
Clazz_superConstructor(this,java.util.Collections.UnmodifiableSortedSet,[a]);
this.ss=a;
},"java.util.SortedSet");
Clazz_defineMethod(c$,"comparator",
function(){
return this.ss.comparator();
});
Clazz_defineMethod(c$,"first",
function(){
return this.ss.first();
});
Clazz_defineMethod(c$,"headSet",
function(a){
return new java.util.Collections.UnmodifiableSortedSet(this.ss.headSet(a));
},"~O");
Clazz_defineMethod(c$,"last",
function(){
return this.ss.last();
});
Clazz_defineMethod(c$,"subSet",
function(a,b){
return new java.util.Collections.UnmodifiableSortedSet(this.ss.subSet(a,b));
},"~O,~O");
Clazz_defineMethod(c$,"tailSet",
function(a){
return new java.util.Collections.UnmodifiableSortedSet(this.ss.tailSet(a));
},"~O");
c$=Clazz_p0p();
Clazz_pu$h(self.c$);
c$=Clazz_decorateAsClass(function(){
this.c=null;
this.type=null;
Clazz_instantialize(this,arguments);
},java.util.Collections,"CheckedCollection",null,[java.util.Collection,java.io.Serializable]);
Clazz_makeConstructor(c$,
function(a,b){
if(a==null||b==null){
throw new NullPointerException();
}this.c=a;
this.type=b;
},"java.util.Collection,Class");
Clazz_defineMethod(c$,"size",
function(){
return this.c.size();
});
Clazz_defineMethod(c$,"isEmpty",
function(){
return this.c.isEmpty();
});
Clazz_defineMethod(c$,"contains",
function(a){
return this.c.contains(a);
},"~O");
Clazz_defineMethod(c$,"iterator",
function(){
var a=this.c.iterator();
if(Clazz_instanceOf(a,java.util.ListIterator)){
a=new java.util.Collections.CheckedListIterator(a,this.type);
}return a;
});
Clazz_defineMethod(c$,"toArray",
function(){
return this.c.toArray();
});
Clazz_defineMethod(c$,"toArray",
function(a){
return this.c.toArray(a);
},"~A");
Clazz_defineMethod(c$,"add",
function(a){
return this.c.add(java.util.Collections.checkType(a,this.type));
},"~O");
Clazz_defineMethod(c$,"remove",
function(a){
return this.c.remove(a);
},"~O");
Clazz_defineMethod(c$,"containsAll",
function(a){
return this.c.containsAll(a);
},"java.util.Collection");
Clazz_overrideMethod(c$,"addAll",
function(a){
var b=a.size();
if(b==0){
return false;
}var c=new Array(b);
var d=a.iterator();
for(var e=0;e<b;e++){
c[e]=java.util.Collections.checkType(d.next(),this.type);
}
var f=false;
for(var g=0;g<b;g++){
f=new Boolean(f|this.c.add(c[g])).valueOf();
}
return f;
},"java.util.Collection");
Clazz_defineMethod(c$,"removeAll",
function(a){
return this.c.removeAll(a);
},"java.util.Collection");
Clazz_defineMethod(c$,"retainAll",
function(a){
return this.c.retainAll(a);
},"java.util.Collection");
Clazz_defineMethod(c$,"clear",
function(){
this.c.clear();
});
Clazz_defineMethod(c$,"toString",
function(){
return this.c.toString();
});
c$=Clazz_p0p();
Clazz_pu$h(self.c$);
c$=Clazz_decorateAsClass(function(){
this.i=null;
this.type=null;
Clazz_instantialize(this,arguments);
},java.util.Collections,"CheckedListIterator",null,java.util.ListIterator);
Clazz_makeConstructor(c$,
function(a,b){
this.i=a;
this.type=b;
},"java.util.ListIterator,Class");
Clazz_defineMethod(c$,"hasNext",
function(){
return this.i.hasNext();
});
Clazz_defineMethod(c$,"next",
function(){
return this.i.next();
});
Clazz_defineMethod(c$,"remove",
function(){
this.i.remove();
});
Clazz_defineMethod(c$,"hasPrevious",
function(){
return this.i.hasPrevious();
});
Clazz_defineMethod(c$,"previous",
function(){
return this.i.previous();
});
Clazz_defineMethod(c$,"nextIndex",
function(){
return this.i.nextIndex();
});
Clazz_defineMethod(c$,"previousIndex",
function(){
return this.i.previousIndex();
});
Clazz_defineMethod(c$,"set",
function(a){
this.i.set(java.util.Collections.checkType(a,this.type));
},"~O");
Clazz_defineMethod(c$,"add",
function(a){
this.i.add(java.util.Collections.checkType(a,this.type));
},"~O");
c$=Clazz_p0p();


Clazz_pu$h(self.c$);
c$=Clazz_decorateAsClass(function(){
this.l=null;
Clazz_instantialize(this,arguments);
},java.util.Collections,"CheckedList",java.util.Collections.CheckedCollection,java.util.List);
Clazz_makeConstructor(c$,
function(a,b){
Clazz_superConstructor(this,java.util.Collections.CheckedList,[a,b]);
this.l=a;
},"java.util.List,Class");
Clazz_defineMethod(c$,"addAll",
function(a,b){
var c=b.size();
if(c==0){
return false;
}var d=new Array(c);
var e=b.iterator();
for(var f=0;f<c;f++){
d[f]=java.util.Collections.checkType(e.next(),this.type);
}
return this.l.addAll(a,java.util.Arrays.asList(d));
},"~N,java.util.Collection");
Clazz_defineMethod(c$,"get",
function(a){
return this.l.get(a);
},"~N");
Clazz_defineMethod(c$,"set",
function(a,b){
return this.l.set(a,java.util.Collections.checkType(b,this.type));
},"~N,~O");
Clazz_defineMethod(c$,"add",
function(a,b){
this.l.add(a,java.util.Collections.checkType(b,this.type));
},"~N,~O");
Clazz_defineMethod(c$,"remove",
function(a){
return this.l.remove(a);
},"~N");
Clazz_defineMethod(c$,"indexOf",
function(a){
return this.l.indexOf(a);
},"~O");
Clazz_defineMethod(c$,"lastIndexOf",
function(a){
return this.l.lastIndexOf(a);
},"~O");
//Clazz_defineMethod(c$,"listIterator",
//function(){
//return new java.util.Collections.CheckedListIterator(this.l.listIterator(),this.type);
//});
Clazz_defineMethod(c$,"listIterator",
function(a){
a || (a = 0);
return new java.util.Collections.CheckedListIterator(this.l.listIterator(a),this.type);
},"~N");
Clazz_defineMethod(c$,"subList",
function(a,b){
return java.util.Collections.checkedList(this.l.subList(a,b),this.type);
},"~N,~N");
Clazz_overrideMethod(c$,"equals",
function(a){
return this.l.equals(a);
},"~O");
Clazz_overrideMethod(c$,"hashcode",
function(){
return this.l.hashCode();
});
c$=Clazz_p0p();


Clazz_pu$h(self.c$);
c$=Clazz_declareType(java.util.Collections,"CheckedRandomAccessList",java.util.Collections.CheckedList,java.util.RandomAccess);
c$=Clazz_p0p();


Clazz_pu$h(self.c$);
c$=Clazz_declareType(java.util.Collections,"CheckedSet",java.util.Collections.CheckedCollection,java.util.Set);
Clazz_overrideMethod(c$,"equals",
function(a){
return this.c.equals(a);
},"~O");
Clazz_overrideMethod(c$,"hashCode",
function(){
return this.c.hashCode();
});
c$=Clazz_p0p();
Clazz_pu$h(self.c$);
c$=Clazz_decorateAsClass(function(){
this.m=null;
this.keyType=null;
this.valueType=null;
Clazz_instantialize(this,arguments);
},java.util.Collections,"CheckedMap",null,[java.util.Map,java.io.Serializable]);
Clazz_makeConstructor(c$,
($fz=function(a,b,c){
if(a==null||b==null||c==null){
throw new NullPointerException();
}this.m=a;
this.keyType=b;
this.valueType=c;
},$fz.isPrivate=true,$fz),"java.util.Map,Class,Class");
Clazz_defineMethod(c$,"size",
function(){
return this.m.size();
});
Clazz_defineMethod(c$,"isEmpty",
function(){
return this.m.isEmpty();
});
Clazz_defineMethod(c$,"containsKey",
function(a){
return this.m.containsKey(a);
},"~O");
Clazz_defineMethod(c$,"containsValue",
function(a){
return this.m.containsValue(a);
},"~O");
Clazz_defineMethod(c$,"get",
function(a){
return this.m.get(a);
},"~O");
Clazz_defineMethod(c$,"put",
function(a,b){
return this.m.put(java.util.Collections.checkType(a,this.keyType),java.util.Collections.checkType(b,this.valueType));
},"~O,~O");
Clazz_defineMethod(c$,"remove",
function(a){
return this.m.remove(a);
},"~O");
Clazz_overrideMethod(c$,"putAll",
function(a){
var b=a.size();
if(b==0){
return;
}var c=new Array(b);
var d=a.entrySet().iterator();
for(var e=0;e<b;e++){
var f=d.next();
java.util.Collections.checkType(f.getKey(),this.keyType);
java.util.Collections.checkType(f.getValue(),this.valueType);
c[e]=f;
}
for(var f=0;f<b;f++){
this.m.put(c[f].getKey(),c[f].getValue());
}
},"java.util.Map");
Clazz_defineMethod(c$,"clear",
function(){
this.m.clear();
});
Clazz_defineMethod(c$,"keySet",
function(){
return this.m.keySet();
});
Clazz_defineMethod(c$,"values",
function(){
return this.m.values();
});
Clazz_defineMethod(c$,"entrySet",
function(){
return new java.util.Collections.CheckedMap.CheckedEntrySet(this.m.entrySet(),this.valueType);
});
Clazz_overrideMethod(c$,"equals",
function(a){
return this.m.equals(a);
},"~O");
Clazz_overrideMethod(c$,"hashcode",
function(){
return this.m.hashCode();
});
Clazz_defineMethod(c$,"toString",
function(){
return this.m.toString();
});
Clazz_pu$h(self.c$);
c$=Clazz_decorateAsClass(function(){
this.e=null;
this.valueType=null;
Clazz_instantialize(this,arguments);
},java.util.Collections.CheckedMap,"CheckedEntry",null,java.util.Map.Entry);
Clazz_makeConstructor(c$,
function(a,b){
if(a==null){
throw new NullPointerException();
}this.e=a;
this.valueType=b;
},"java.util.Map.Entry,Class");
Clazz_defineMethod(c$,"getKey",
function(){
return this.e.getKey();
});
Clazz_defineMethod(c$,"getValue",
function(){
return this.e.getValue();
});
Clazz_defineMethod(c$,"setValue",
function(a){
return this.e.setValue(java.util.Collections.checkType(a,this.valueType));
},"~O");
Clazz_overrideMethod(c$,"equals",
function(a){
return this.e.equals(a);
},"~O");
Clazz_overrideMethod(c$,"hashcode",
function(){
return this.e.hashCode();
});
c$=Clazz_p0p();
Clazz_pu$h(self.c$);
c$=Clazz_decorateAsClass(function(){
this.s=null;
this.valueType=null;
Clazz_instantialize(this,arguments);
},java.util.Collections.CheckedMap,"CheckedEntrySet",null,java.util.Set);
Clazz_makeConstructor(c$,
function(a,b){
this.s=a;
this.valueType=b;
},"java.util.Set,Class");
Clazz_defineMethod(c$,"iterator",
function(){
return new java.util.Collections.CheckedMap.CheckedEntrySet.CheckedEntryIterator(this.s.iterator(),this.valueType);
});
Clazz_defineMethod(c$,"toArray",
function(){
var a=this.size();
var b=new Array(a);
var c=this.iterator();
for(var d=0;d<a;d++){
b[d]=c.next();
}
return b;
});
Clazz_defineMethod(c$,"toArray",
function(a){
var b=this.size();
if(a.length<b){
var c=a.getClass().getComponentType();
a=java.lang.reflect.Array.newInstance(c,b);
}var c=this.iterator();
for(var d=0;d<b;d++){
a[d]=c.next();
}
if(b<a.length){
a[b]=null;
}return a;
},"~A");
Clazz_defineMethod(c$,"retainAll",
function(a){
return this.s.retainAll(a);
},"java.util.Collection");
Clazz_defineMethod(c$,"removeAll",
function(a){
return this.s.removeAll(a);
},"java.util.Collection");
Clazz_defineMethod(c$,"containsAll",
function(a){
return this.s.containsAll(a);
},"java.util.Collection");
Clazz_overrideMethod(c$,"addAll",
function(a){
throw new UnsupportedOperationException();
},"java.util.Collection");
Clazz_defineMethod(c$,"remove",
function(a){
return this.s.remove(a);
},"~O");
Clazz_defineMethod(c$,"contains",
function(a){
return this.s.contains(a);
},"~O");
Clazz_overrideMethod(c$,"add",
function(a){
throw new UnsupportedOperationException();
},"java.util.Map.Entry");
Clazz_defineMethod(c$,"isEmpty",
function(){
return this.s.isEmpty();
});
Clazz_defineMethod(c$,"clear",
function(){
this.s.clear();
});
Clazz_defineMethod(c$,"size",
function(){
return this.s.size();
});
Clazz_overrideMethod(c$,"hashcode",
function(){
return this.s.hashCode();
});
Clazz_overrideMethod(c$,"equals",
function(a){
return this.s.equals(a);
},"~O");
Clazz_pu$h(self.c$);
c$=Clazz_decorateAsClass(function(){
this.i=null;
this.valueType=null;
Clazz_instantialize(this,arguments);
},java.util.Collections.CheckedMap.CheckedEntrySet,"CheckedEntryIterator",null,java.util.Iterator);
Clazz_makeConstructor(c$,
function(a,b){
this.i=a;
this.valueType=b;
},"java.util.Iterator,Class");
Clazz_defineMethod(c$,"hasNext",
function(){
return this.i.hasNext();
});
Clazz_defineMethod(c$,"remove",
function(){
this.i.remove();
});
Clazz_defineMethod(c$,"next",
function(){
return new java.util.Collections.CheckedMap.CheckedEntry(this.i.next(),this.valueType);
});
c$=Clazz_p0p();
c$=Clazz_p0p();
c$=Clazz_p0p();
Clazz_pu$h(self.c$);
c$=Clazz_decorateAsClass(function(){
this.ss=null;
Clazz_instantialize(this,arguments);
},java.util.Collections,"CheckedSortedSet",java.util.Collections.CheckedSet,java.util.SortedSet);
Clazz_makeConstructor(c$,
function(a,b){
Clazz_superConstructor(this,java.util.Collections.CheckedSortedSet,[a,b]);
this.ss=a;
},"java.util.SortedSet,Class");
Clazz_defineMethod(c$,"comparator",
function(){
return this.ss.comparator();
});
Clazz_defineMethod(c$,"subSet",
function(a,b){
return new java.util.Collections.CheckedSortedSet(this.ss.subSet(a,b),this.type);
},"~O,~O");
Clazz_defineMethod(c$,"headSet",
function(a){
return new java.util.Collections.CheckedSortedSet(this.ss.headSet(a),this.type);
},"~O");
Clazz_defineMethod(c$,"tailSet",
function(a){
return new java.util.Collections.CheckedSortedSet(this.ss.tailSet(a),this.type);
},"~O");
Clazz_defineMethod(c$,"first",
function(){
return this.ss.first();
});
Clazz_defineMethod(c$,"last",
function(){
return this.ss.last();
});
c$=Clazz_p0p();
Clazz_pu$h(self.c$);
c$=Clazz_decorateAsClass(function(){
this.sm=null;
Clazz_instantialize(this,arguments);
},java.util.Collections,"CheckedSortedMap",java.util.Collections.CheckedMap,java.util.SortedMap);
Clazz_makeConstructor(c$,
function(a,b,c){
Clazz_superConstructor(this,java.util.Collections.CheckedSortedMap,[a,b,c]);
this.sm=a;
},"java.util.SortedMap,Class,Class");
Clazz_defineMethod(c$,"comparator",
function(){
return this.sm.comparator();
});
Clazz_defineMethod(c$,"subMap",
function(a,b){
return new java.util.Collections.CheckedSortedMap(this.sm.subMap(a,b),this.keyType,this.valueType);
},"~O,~O");
Clazz_defineMethod(c$,"headMap",
function(a){
return new java.util.Collections.CheckedSortedMap(this.sm.headMap(a),this.keyType,this.valueType);
},"~O");
Clazz_defineMethod(c$,"tailMap",
function(a){
return new java.util.Collections.CheckedSortedMap(this.sm.tailMap(a),this.keyType,this.valueType);
},"~O");
Clazz_defineMethod(c$,"firstKey",
function(){
return this.sm.firstKey();
});
Clazz_defineMethod(c$,"lastKey",
function(){
return this.sm.lastKey();
});
c$=Clazz_p0p();
c$.EMPTY_LIST=c$.prototype.EMPTY_LIST=new java.util.Collections.EmptyList();
c$.EMPTY_SET=c$.prototype.EMPTY_SET=new java.util.Collections.EmptySet();
c$.EMPTY_MAP=c$.prototype.EMPTY_MAP=new java.util.Collections.EmptyMap();
});
c$=Clazz_declareType(java.util,"Dictionary");
Clazz_makeConstructor(c$,
function(){
});
// BH 7/7/2017 7:10:39 AM fixes Clazz_clone for arrays
// BH 3/30/2015 11:01:35 PM incorrect constructor for HashtableKeySet and HashtableEntrySet (extends, not implements)
// BH 8/24/2014 8:48:58 PM all synchronization and inner classes removed
// BH 3/21/2014 6:44:21 AM  to reduce this.b$[....] phrases to simply this.h$
// BH added ability to use a non-Java key for HTML elements, for example.


Clazz_load([],"java.util.HashtableIterator",[],function(){
c$=Clazz_decorateAsClass(function(){
this.position=0;
this.expectedModCount=0;
this.type=null;
this.lastEntry=null;
this.lastPosition=0;
this.canRemove=false;
Clazz_instantialize(this,arguments);
},java.util,"HashtableIterator",null,java.util.Iterator);
Clazz_makeConstructor(c$,
function(a){
this.type=a;
this.h$ = a.h$;
this.position=this.h$.lastSlot;
this.expectedModCount=this.h$.modCount;
},"java.util.AbstractSet");
Clazz_overrideMethod(c$,"hasNext",
function(){
if(this.lastEntry&&this.lastEntry.next){
return true;
}while(this.position>=this.h$.firstSlot){
if(this.h$.elementData[this.position]==null){
this.position--;
}else{
return true;
}}
return false;
});
Clazz_overrideMethod(c$,"next",
function(){
if(this.expectedModCount==this.h$.modCount){
if(this.lastEntry){
this.lastEntry=this.lastEntry.next;
}if(this.lastEntry==null){
while(this.position>=this.h$.firstSlot&&(this.lastEntry=this.h$.elementData[this.position])==null){
this.position--;
}
if(this.lastEntry){
this.lastPosition=this.position;
this.position--;
}}if(this.lastEntry){
this.canRemove=true;
return this.type.get(this.lastEntry);
}throw new java.util.NoSuchElementException();
}throw new java.util.ConcurrentModificationException();
});
Clazz_overrideMethod(c$,"remove",
function(){
if(this.expectedModCount==this.h$.modCount){
if(this.canRemove){
this.canRemove=false;
{
var a=false;
var b=this.h$.elementData[this.lastPosition];
if(b===this.lastEntry){
this.h$.elementData[this.lastPosition]=b.next;
a=true;
}else{
while(b&&b.next!==this.lastEntry){
b=b.next;
}
if(b){
b.next=this.lastEntry.next;
a=true;
}}if(a){
this.h$.modCount++;
this.h$.elementCount--;
this.expectedModCount++;
return;
}}}else{
throw new IllegalStateException();
}}throw new java.util.ConcurrentModificationException();
});
});



////////////////////////////


Clazz_load([],"java.util.HashtableEnumerator",[],function(){
c$=Clazz_decorateAsClass(function(){
this.key=false;
this.start=0;
this.entry=null;
Clazz_instantialize(this,arguments);
},java.util,"HashtableEnumerator",null,java.util.Enumeration);

Clazz_makeConstructor(c$,
function(a, b){
this.key = a;
this.h$ = b;
if (this.h$)this.start=this.h$.lastSlot+1;
},"~B,java.util.Hashtable");
Clazz_overrideMethod(c$,"hasMoreElements",
function(){
if (!this.h$)return false;
if(this.entry)return true;

while(--this.start>=this.h$.firstSlot){
if(this.h$.elementData[this.start]){
this.entry=this.h$.elementData[this.start];
return true;
}}
return false;
});
Clazz_overrideMethod(c$,"nextElement",
function(){
if(this.hasMoreElements()){
var a=this.key?this.entry.key:this.entry.value;
this.entry=this.entry.next;
return a;
}
throw new java.util.NoSuchElementException();
});
});

////////////////////////////

Clazz_load(["java.util.AbstractSet"],"java.util.HashtableEntrySet",[],function(){
c$=Clazz_decorateAsClass(function(){
Clazz_instantialize(this,arguments);
},java.util,"HashtableEntrySet",java.util.AbstractSet,null);

Clazz_makeConstructor(c$,
function(a){
this.h$ = a;
},"java.util.Hashtable");
Clazz_overrideMethod(c$,"size",
function(){
return this.h$.elementCount;
});
Clazz_overrideMethod(c$,"clear",
function(){
this.h$.clear();
});
Clazz_overrideMethod(c$,"remove",
function(object){
if(this.contains(object)){
this.h$.remove((object).getKey());
return true;
}return false;
},"~O");
Clazz_defineMethod(c$,"contains",
function(object){
var entry=this.h$.getEntry((object).getKey());
return object.equals(entry);
},"~O");

Clazz_overrideMethod(c$,"get",
function(entry){
return entry;
},"java.util.MapEntry");

Clazz_defineMethod(c$,"iterator",
function(){
return new java.util.HashtableIterator(this);
});
});


////////////////////////////

Clazz_load(["java.util.AbstractSet"],"java.util.HashtableKeySet",[],function(){
c$=Clazz_decorateAsClass(function(){
Clazz_instantialize(this,arguments);
},java.util,"HashtableKeySet",java.util.AbstractSet,null);

Clazz_makeConstructor(c$,
function(a){
this.h$ = a;
},"java.util.Hashtable");

Clazz_overrideMethod(c$,"contains",
function(object){
return this.h$.containsKey(object);
},"~O");
Clazz_overrideMethod(c$,"size",
function(){
return this.h$.elementCount;
});
Clazz_overrideMethod(c$,"clear",
function(){
this.h$.clear();
});
Clazz_overrideMethod(c$,"remove",
function(key){
if(this.h$.containsKey(key)){
this.h$.remove(key);
return true;
}return false;
},"~O");

Clazz_overrideMethod(c$,"get",
function(entry){
return entry.key;
},"java.util.MapEntry");

Clazz_overrideMethod(c$,"iterator",
function(){
return new java.util.HashtableIterator(this);
});
});

////////////////////////////

Clazz_load(["java.util.AbstractCollection"],"java.util.HashtableValueCollection",[],function(){
c$=Clazz_decorateAsClass(function(){
Clazz_instantialize(this,arguments);
},java.util,"HashtableValueCollection",java.util.AbstractCollection,null);

Clazz_makeConstructor(c$,
function(a){
this.h$ = a;
},"java.util.Hashtable");
Clazz_overrideMethod(c$,"contains",
function(object){
return this.h$.contains(object);
},"~O");
Clazz_overrideMethod(c$,"size",
function(){
return this.h$.elementCount;
});
Clazz_overrideMethod(c$,"clear",
function(){
this.h$.clear();
});

Clazz_overrideMethod(c$,"get",
function(entry){
return entry.value;
},"java.util.MapEntry");

Clazz_overrideMethod(c$,"iterator",
function(){
return new java.util.HashtableIterator(this);
});
});
////////////////////////////


Clazz_load(["java.util.MapEntry"],"java.util.HashtableEntry",[],function(){
c$=Clazz_decorateAsClass(function(){
this.next=null;
this.hashcode=0;
Clazz_instantialize(this,arguments);
},java.util,"HashtableEntry",java.util.MapEntry);
Clazz_overrideConstructor(c$,
function(a,b){
this.key = a;
this.value = b;
this.hashcode=a.hashCode();
});
Clazz_defineMethod(c$,"clone",
function(){
var a=Clazz_superCall(this,java.util.HashtableEntry,"clone",[]);
if(this.next!=null){
a.next=this.next.clone();
}
return a;
});
Clazz_overrideMethod(c$,"setValue",
function(a){
if(a==null){
throw new NullPointerException();
}var b=this.value;
this.value=a;
return b;
},"~O");
Clazz_defineMethod(c$,"getKeyHash",
function(){
return this.key.hashCode();
});
Clazz_defineMethod(c$,"equalsKey",
function(a,b){
return this.hashcode==(!a.hashCode || a.hashCode())&&this.key.equals(a);
},"~O,~N");
Clazz_overrideMethod(c$,"toString",
function(){
return this.key+"="+this.value;
});
});



////////////////////////////


Clazz_load(["java.util.Dictionary","$.Enumeration","$.HashtableEnumerator","$.Iterator","$.Map","$.MapEntry","$.NoSuchElementException"],"java.util.Hashtable",["java.lang.IllegalArgumentException","$.IllegalStateException","$.NullPointerException","$.StringBuilder","java.util.AbstractCollection","$.AbstractSet","$.Arrays","$.Collections","$.ConcurrentModificationException","java.util.MapEntry.Type","java.util.HashtableEntry"],function(){
c$=Clazz_decorateAsClass(function(){
this.elementCount=0;
this.elementData=null;
this.loadFactor=0;
this.threshold=0;
this.firstSlot=0;
this.lastSlot=-1;
this.modCount=0;
Clazz_instantialize(this,arguments);
},java.util,"Hashtable",java.util.Dictionary,[java.util.Map,Cloneable,java.io.Serializable]);	
c$.newEntry=Clazz_defineMethod(c$,"newEntry",
($fz=function(key,value,hash){
return new java.util.HashtableEntry(key,value);
},$fz.isPrivate=true,$fz),"~O,~O,~N");
Clazz_overrideConstructor(c$,
function(){
this.elementCount=0;
this.elementData=this.newElementArray(11);
this.firstSlot=this.elementData.length;
this.loadFactor=0.75;
this.computeMaxSize();
});
Clazz_defineMethod(c$,"newElementArray",
($fz=function(size){
return new Array(size);
},$fz.isPrivate=true,$fz),"~N");
Clazz_overrideMethod(c$,"clear",
function(){
this.elementCount=0;
for (var i = this.elementData.length; --i >= 0;)
	  this.elementData[i] = null;
this.modCount++;
});
Clazz_defineMethod(c$,"clone",
function(){
try{
var hashtable=Clazz_superCall(this,java.util.Hashtable,"clone",[]);
hashtable.elementData=new Array(this.elementData.length);
for(var i = this.elementData.length; --i >= 0;)
 if (this.elementData[i] != null)
  hashtable.elementData[i]=this.elementData[i].clone();
return hashtable;
}catch(e){
if(Clazz_instanceOf(e,CloneNotSupportedException)){
return null;
}else{
throw e;
}
}
});
Clazz_defineMethod(c$,"computeMaxSize",
($fz=function(){
this.threshold=Math.round((this.elementData.length*this.loadFactor));
},$fz.isPrivate=true,$fz));
Clazz_defineMethod(c$,"contains",
function(value){
if(value==null){
throw new NullPointerException();
}for(var i=this.elementData.length;--i>=0;){
var entry=this.elementData[i];
while(entry){
if(value.equals(entry.value)){
return true;
}entry=entry.next;
}
}
return false;
},"~O");
Clazz_overrideMethod(c$,"containsKey",
function(key){
	if(!key.hashCode)  {
	  key.hashCode = function(){return 1};
	  if (!key.equals)
	  	key.equals = function(a) {return this == a};
	}
return this.getEntry(key)!=null	;
},"~O");
Clazz_overrideMethod(c$,"containsValue",
function(value){
return this.contains(value);
},"~O");
Clazz_overrideMethod(c$,"elements",
function(){
if(this.elementCount==0){
return java.util.Hashtable.EMPTY_ENUMERATION;
}
return new java.util.HashtableEnumerator(false, this);
});
Clazz_overrideMethod(c$,"entrySet",
function(){
return new java.util.HashtableEntrySet(this);
});
Clazz_overrideMethod(c$,"equals",
function(object){
if(this===object){
return true;
}if(Clazz_instanceOf(object,java.util.Map)){
var map=object;
if(this.size()!=map.size()){
return false;
}var entries=this.entrySet();
for(var e,$e=map.entrySet().iterator();$e.hasNext()&&((e=$e.next())||true);){
if(!entries.contains(e)){
return false;
}}
return true;
}return false;
},"~O");
Clazz_overrideMethod(c$,"get",
function(key){
	if(!key.hashCode) { 
	  key.hashCode = function(){return 1};
  	if (!key.equals)
  		key.equals = function(a) {return this == a};
	}
var hash=key.hashCode();
var index=(hash&0x7FFFFFFF)%this.elementData.length;
var entry=this.elementData[index];
while(entry){
if(entry.equalsKey(key,hash)){
return entry.value;
}entry=entry.next;
}
return null;
},"~O");
Clazz_defineMethod(c$,"getEntry",
function(key){
var hash=key.hashCode();
var index=(hash&0x7FFFFFFF)%this.elementData.length;
var entry=this.elementData[index];
while(entry){
if(entry.equalsKey(key,hash)){
return entry;
}entry=entry.next;
}
return null;
},"~O");
Clazz_overrideMethod(c$,"hashCode",
function(){
var result=0;
var it=this.entrySet().iterator();
while(it.hasNext()){
var entry=it.next();
var key=entry.getKey();
var value=entry.getValue();
var hash=(key!==this?key.hashCode():0)^(value!==this?(value!=null?value.hashCode():0):0);
result+=hash;
}
return result;
});
Clazz_overrideMethod(c$,"isEmpty",
function(){
return this.elementCount==0;
});
Clazz_overrideMethod(c$,"keys",
function(){
if(this.elementCount==0){
return java.util.Hashtable.EMPTY_ENUMERATION;
}
return new java.util.HashtableEnumerator(true, this); 
});
Clazz_overrideMethod(c$,"keySet",
function(){
return new java.util.HashtableKeySet(this);
});
Clazz_overrideMethod(c$,"put",
function(key,value){
if(key!=null&&value!=null){
	if(!key.hashCode)  {
	  key.hashCode = function(){return 1};
	  if (!key.equals)
	  	key.equals = function(a) {return this == a};
	}
	var hash=key.hashCode();
	var index=(hash&0x7FFFFFFF)%this.elementData.length;
	var entry=this.elementData[index];
	while(entry!=null&&!entry.equalsKey(key,hash)){
	entry=entry.next;
}
if(entry==null){
this.modCount++;
if(++this.elementCount>this.threshold){
this.rehash();
index=(hash&0x7FFFFFFF)%this.elementData.length;
}if(index<this.firstSlot){
this.firstSlot=index;
}if(index>this.lastSlot){
this.lastSlot=index;
}

entry=java.util.Hashtable.newEntry(key,value,hash);
entry.next=this.elementData[index];
this.elementData[index]=entry;
return null;
}var result=entry.value;
entry.value=value;
return result;
}throw new NullPointerException();
},"~O,~O");
Clazz_overrideMethod(c$,"putAll",
function(map){
for(var entry,$entry=map.entrySet().iterator();$entry.hasNext()&&((entry=$entry.next())||true);){
this.put(entry.getKey(),entry.getValue());
}
},"java.util.Map");

Clazz_defineMethod(c$,"rehash",
function(){
var length=(this.elementData.length<<1)+1;
if(length==0){
length=1;
}var newFirst=length;
var newLast=-1;
var newData=this.newElementArray(length);
for(var i=this.lastSlot+1;--i>=this.firstSlot;){
var entry=this.elementData[i];
while(entry!=null){
var index=(entry.getKeyHash()&0x7FFFFFFF)%length;
if(index<newFirst){
newFirst=index;
}if(index>newLast){
newLast=index;
}var next=entry.next;
entry.next=newData[index];
newData[index]=entry;
entry=next;
}
}
this.firstSlot=newFirst;
this.lastSlot=newLast;
this.elementData=newData;
this.computeMaxSize();
});
Clazz_overrideMethod(c$,"remove",
function(key){
var hash=key.hashCode();
var index=(hash&0x7FFFFFFF)%this.elementData.length;
var last=null;
var entry=this.elementData[index];
while(entry!=null&&!entry.equalsKey(key,hash)){
last=entry;
entry=entry.next;
}
if(entry!=null){
this.modCount++;
if(last==null){
this.elementData[index]=entry.next;
}else{
last.next=entry.next;
}this.elementCount--;
var result=entry.value;
entry.value=null;
return result;
}return null;
},"~O");
Clazz_overrideMethod(c$,"size",
function(){
return this.elementCount;
});
Clazz_overrideMethod(c$,"toString",
function(){
if(this.isEmpty()){
return"{}";
}var buffer=new StringBuilder(this.size()*28);
buffer.append('{');
for(var i=this.lastSlot;i>=this.firstSlot;i--){
var entry=this.elementData[i];
while(entry!=null){
if(entry.key!==this){
buffer.append(entry.key);
}else{
buffer.append("(this Map)");
}buffer.append('=');
if(entry.value!==this){
buffer.append(entry.value);
}else{
buffer.append("(this Map)");
}buffer.append(", ");
entry=entry.next;
}
}
if(this.elementCount>0){
buffer.setLength(buffer.length()-2);
}buffer.append('}');
return buffer.toString();
});
Clazz_overrideMethod(c$,"values",
function(){
return new java.util.HashtableValueCollection(this);
});
java.util.Hashtable.EMPTY_ENUMERATION = new java.util.HashtableEnumerator();
});
Clazz_load(["java.util.Map"],"java.util.MapEntry",null,function(){
c$=Clazz_decorateAsClass(function(){
this.key=null;
this.value=null;
Clazz_instantialize(this,arguments);
},java.util,"MapEntry",null,[java.util.Map.Entry,Cloneable]);
Clazz_makeConstructor(c$,
function(theKey){
this.key=theKey;
},"~O");
Clazz_makeConstructor(c$,
function(theKey,theValue){
this.key=theKey;
this.value=theValue;
},"~O,~O");
Clazz_defineMethod(c$,"clone",
function(){
try{
return Clazz_superCall(this,java.util.MapEntry,"clone",[]);
}catch(e){
if(Clazz_instanceOf(e,CloneNotSupportedException)){
return null;
}else{
throw e;
}
}
});
Clazz_overrideMethod(c$,"equals",
function(object){
if(this===object){
return true;
}if(Clazz_instanceOf(object,java.util.Map.Entry)){
var entry=object;
return(this.key==null?entry.getKey()==null:this.key.equals(entry.getKey()))&&(this.value==null?entry.getValue()==null:this.value.equals(entry.getValue()));
}return false;
},"~O");
Clazz_overrideMethod(c$,"getKey",
function(){
return this.key;
});
Clazz_overrideMethod(c$,"getValue",
function(){
return this.value;
});
Clazz_overrideMethod(c$,"hashCode",
function(){
return(this.key==null?0:this.key.hashCode())^(this.value==null?0:this.value.hashCode());
});
Clazz_overrideMethod(c$,"setValue",
function(object){
var result=this.value;
this.value=object;
return result;
},"~O");
Clazz_overrideMethod(c$,"toString",
function(){
return this.key+"="+this.value;
});
Clazz_declareInterface(java.util.MapEntry,"Type");
});
Clazz_load(["java.util.Hashtable"],"java.util.Properties",["java.lang.NullPointerException","$.StringBuffer"],function(){
c$=Clazz_decorateAsClass(function(){
this.builder=null;
this.defaults=null;
Clazz_instantialize(this,arguments);
},java.util,"Properties",java.util.Hashtable);

Clazz_makeConstructor(c$,
function(properties){
Clazz_superConstructor(this,java.util.Properties,[]);
this.defaults=properties;
},"java.util.Properties");
Clazz_defineMethod(c$,"dumpString",
($fz=function(buffer,string,key){
var i=0;
if(!key&&i<string.length&&(string.charAt(i)).charCodeAt(0)==(' ').charCodeAt(0)){
buffer.append("\\ ");
i++;
}for(;i<string.length;i++){
var ch=string.charAt(i);
switch(ch){
case'\t':
buffer.append("\\t");
break;
case'\n':
buffer.append("\\n");
break;
case'\f':
buffer.append("\\f");
break;
case'\r':
buffer.append("\\r");
break;
default:
if("\\#!=:".indexOf(ch)>=0||(key&&(ch).charCodeAt(0)==(' ').charCodeAt(0))){
buffer.append('\\');
}if((ch).charCodeAt(0)>=(' ').charCodeAt (0) && (ch).charCodeAt (0) <= ('~').charCodeAt(0)){
buffer.append(ch);
}else{
var hex=Integer.toHexString(ch.charCodeAt(0));
buffer.append("\\u");
for(var j=0;j<4-hex.length;j++){
buffer.append("0");
}
buffer.append(hex);
}}
}
},$fz.isPrivate=true,$fz),"StringBuilder,~S,~B");
Clazz_defineMethod(c$,"getProperty",
function(name){
var result=this.get(name);
var property=Clazz_instanceOf(result,String)?result:null;
if(property==null&&this.defaults!=null){
property=this.defaults.getProperty(name);
}return property;
},"~S");
Clazz_defineMethod(c$,"getProperty",
function(name,defaultValue){
var result=this.get(name);
var property=Clazz_instanceOf(result,String)?result:null;
if(property==null&&this.defaults!=null){
property=this.defaults.getProperty(name);
}if(property==null){
return defaultValue;
}return property;
},"~S,~S");
Clazz_defineMethod(c$,"list",
function(out){
if(out==null){
throw new NullPointerException();
}var buffer=new StringBuffer(80);
var keys=this.propertyNames();
while(keys.hasMoreElements()){
var key=keys.nextElement();
buffer.append(key);
buffer.append('=');
var property=this.get(key);
var def=this.defaults;
while(property==null){
property=def.get(key);
def=def.defaults;
}
if(property.length>40){
buffer.append(property.substring(0,37));
buffer.append("...");
}else{
buffer.append(property);
}out.println(buffer.toString());
buffer.setLength(0);
}
},"java.io.PrintStream");
Clazz_defineMethod(c$,"list",
function(writer){
if(writer==null){
throw new NullPointerException();
}var buffer=new StringBuffer(80);
var keys=this.propertyNames();
while(keys.hasMoreElements()){
var key=keys.nextElement();
buffer.append(key);
buffer.append('=');
var property=this.get(key);
var def=this.defaults;
while(property==null){
property=def.get(key);
def=def.defaults;
}
if(property.length>40){
buffer.append(property.substring(0,37));
buffer.append("...");
}else{
buffer.append(property);
}writer.println(buffer.toString());
buffer.setLength(0);
}
},"java.io.PrintWriter");
Clazz_defineMethod(c$,"load",
function($in){

},"java.io.InputStream");
Clazz_defineMethod(c$,"propertyNames",
function(){
if(this.defaults==null){
return this.keys();
}var set=new java.util.Hashtable(this.defaults.size()+this.size());
var keys=this.defaults.propertyNames();
while(keys.hasMoreElements()){
set.put(keys.nextElement(),set);
}
keys=this.keys();
while(keys.hasMoreElements()){
set.put(keys.nextElement(),set);
}
return set.keys();
});
Clazz_defineMethod(c$,"save",
function(out,comment){
try{
this.store(out,comment);
}catch(e){
if(Clazz_instanceOf(e,java.io.IOException)){
}else{
throw e;
}
}
},"java.io.OutputStream,~S");
Clazz_defineMethod(c$,"setProperty",
function(name,value){
return this.put(name,value);
},"~S,~S");
Clazz_defineMethod(c$,"store",
function(out,comment){

},"java.io.OutputStream,~S");
Clazz_defineMethod(c$,"loadFromXML",
function($in){

},"java.io.InputStream");
Clazz_defineMethod(c$,"storeToXML",
function(os,comment){

},"java.io.OutputStream,~S");
Clazz_defineMethod(c$,"storeToXML",
function(os,comment,encoding){

},"java.io.OutputStream,~S,~S");
Clazz_defineMethod(c$,"substitutePredefinedEntries",
($fz=function(s){
return s.replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll("\u0027","&apos;").replaceAll("\"","&quot;");
},$fz.isPrivate=true,$fz),"~S");
Clazz_defineStatics(c$,
"PROP_DTD_NAME","http://java.sun.com/dtd/properties.dtd",
"PROP_DTD","<?xml version=\"1.0\" encoding=\"UTF-8\"?>    <!ELEMENT properties (comment?, entry*) >    <!ATTLIST properties version CDATA #FIXED \"1.0\" >    <!ELEMENT comment (#PCDATA) >    <!ELEMENT entry (#PCDATA) >    <!ATTLIST entry key CDATA #REQUIRED >",
"NONE",0,
"SLASH",1,
"UNICODE",2,
"CONTINUE",3,
"KEY_DONE",4,
"IGNORE",5,
"lineSeparator",null);

});
Clazz_load(["java.util.Map"],"java.util.SortedMap",null,function(){
Clazz_declareInterface(java.util,"SortedMap",java.util.Map);
});
Clazz_load(["java.util.Set"],"java.util.SortedSet",null,function(){
Clazz_declareInterface(java.util,"SortedSet",java.util.Set);
});
Clazz_load(["java.util.Enumeration"],"java.util.StringTokenizer",["java.lang.NullPointerException","java.util.NoSuchElementException"],function(){
c$=Clazz_decorateAsClass(function(){
this.string=null;
this.delimiters=null;
this.returnDelimiters=false;
this.position=0;
Clazz_instantialize(this,arguments);
},java.util,"StringTokenizer",null,java.util.Enumeration);
Clazz_makeConstructor(c$,
function(string){
this.construct(string," \t\n\r\f",false);
},"~S");
Clazz_makeConstructor(c$,
function(string,delimiters){
this.construct(string,delimiters,false);
},"~S,~S");
Clazz_makeConstructor(c$,
function(string,delimiters,returnDelimiters){
if(string!=null){
this.string=string;
this.delimiters=delimiters;
this.returnDelimiters=returnDelimiters;
this.position=0;
}else throw new NullPointerException();
},"~S,~S,~B");
Clazz_defineMethod(c$,"countTokens",
function(){
var count=0;
var inToken=false;
for(var i=this.position,length=this.string.length;i<length;i++){
if(this.delimiters.indexOf(this.string.charAt(i),0)>=0){
if(this.returnDelimiters)count++;
if(inToken){
count++;
inToken=false;
}}else{
inToken=true;
}}
if(inToken)count++;
return count;
});
Clazz_overrideMethod(c$,"hasMoreElements",
function(){
return this.hasMoreTokens();
});
Clazz_defineMethod(c$,"hasMoreTokens",
function(){
var length=this.string.length;
if(this.position<length){
if(this.returnDelimiters)return true;
for(var i=this.position;i<length;i++)if(this.delimiters.indexOf(this.string.charAt(i),0)==-1)return true;

}return false;
});
Clazz_overrideMethod(c$,"nextElement",
function(){
return this.nextToken();
});
Clazz_defineMethod(c$,"nextToken",
function(){
var i=this.position;
var length=this.string.length;
if(i<length){
if(this.returnDelimiters){
if(this.delimiters.indexOf(this.string.charAt(this.position),0)>=0)return String.valueOf(this.string.charAt(this.position++));
for(this.position++;this.position<length;this.position++)if(this.delimiters.indexOf(this.string.charAt(this.position),0)>=0)return this.string.substring(i,this.position);

return this.string.substring(i);
}while(i<length&&this.delimiters.indexOf(this.string.charAt(i),0)>=0)i++;

this.position=i;
if(i<length){
for(this.position++;this.position<length;this.position++)if(this.delimiters.indexOf(this.string.charAt(this.position),0)>=0)return this.string.substring(i,this.position);

return this.string.substring(i);
}}throw new java.util.NoSuchElementException();
});
Clazz_defineMethod(c$,"nextToken",
function(delims){
this.delimiters=delims;
return this.nextToken();
},"~S");
});
Clazz_declarePackage ("javajs.api");
Clazz_declareInterface (javajs.api, "BytePoster");
Clazz_declarePackage ("javajs.api");
Clazz_declareInterface (javajs.api, "GenericColor");
Clazz_declarePackage ("J.api");
Clazz_declareInterface (J.api, "GenericFileInterface");
Clazz_declarePackage ("javajs.api");
Clazz_declareInterface (javajs.api, "GenericOutputChannel");
Clazz_declarePackage ("javajs.api");
Clazz_declareInterface (javajs.api, "JSInterface");
Clazz_declarePackage ("javajs.api");
Clazz_declareInterface (javajs.api, "JSONEncodable");
Clazz_declarePackage ("javajs.api");
Clazz_declareInterface (javajs.api, "ZInputStream");
Clazz_declarePackage ("javajs.api.js");
Clazz_declareInterface (javajs.api.js, "J2SObjectInterface");
Clazz_declarePackage ("J.api");
Clazz_declareInterface (J.api, "GenericMouseInterface");
Clazz_declarePackage ("J.api");
Clazz_load (["J.api.FontManager"], "J.api.GenericPlatform", null, function () {
c$ = Clazz_declareInterface (J.api, "GenericPlatform", J.api.FontManager);
Clazz_defineStatics (c$,
"CURSOR_DEFAULT", 0,
"CURSOR_CROSSHAIR", 1,
"CURSOR_WAIT", 3,
"CURSOR_ZOOM", 8,
"CURSOR_HAND", 12,
"CURSOR_MOVE", 13);
});
Clazz_declarePackage ("J.api");
Clazz_declareInterface (J.api, "PlatformViewer");
Clazz_declarePackage ("J.api");
Clazz_declareInterface (J.api, "EventManager");
Clazz_declarePackage ("J.api");
Clazz_declareInterface (J.api, "FontManager");
Clazz_declarePackage ("JU");
Clazz_load (null, "JU.Font", ["JU.AU"], function () {
c$ = Clazz_decorateAsClass (function () {
this.fid = 0;
this.fontFace = null;
this.fontStyle = null;
this.fontSizeNominal = 0;
this.idFontFace = 0;
this.idFontStyle = 0;
this.fontSize = 0;
this.font = null;
this.fontMetrics = null;
this.manager = null;
this.ascent = 0;
this.descent = 0;
this.isBold = false;
this.isItalic = false;
Clazz_instantialize (this, arguments);
}, JU, "Font");
Clazz_makeConstructor (c$, 
 function (manager, fid, idFontFace, idFontStyle, fontSize, fontSizeNominal, graphics) {
this.manager = manager;
this.fid = fid;
this.fontFace = JU.Font.fontFaces[idFontFace];
this.fontStyle = JU.Font.fontStyles[idFontStyle];
this.idFontFace = idFontFace;
this.idFontStyle = idFontStyle;
this.fontSize = fontSize;
this.isBold = (idFontStyle & 1) == 1;
this.isItalic = (idFontStyle & 2) == 2;
this.fontSizeNominal = fontSizeNominal;
this.font = manager.newFont (JU.Font.fontFaces[idFontFace], this.isBold, this.isItalic, fontSize);
this.fontMetrics = manager.getFontMetrics (this, graphics);
this.descent = manager.getFontDescent (this.fontMetrics);
this.ascent = manager.getFontAscent (this.fontMetrics);
}, "J.api.FontManager,~N,~N,~N,~N,~N,~O");
c$.getFont3D = Clazz_defineMethod (c$, "getFont3D", 
function (fontID) {
return JU.Font.font3ds[fontID & 0xFF];
}, "~N");
c$.createFont3D = Clazz_defineMethod (c$, "createFont3D", 
function (fontface, fontstyle, fontsize, fontsizeNominal, manager, graphicsForMetrics) {
if (fontsize > 0xFF) fontsize = 0xFF;
var fontsizeX16 = (Clazz_floatToInt (fontsize)) << 4;
var fontkey = ((fontface & 3) | ((fontstyle & 3) << 2) | (fontsizeX16 << 4));
for (var i = JU.Font.fontkeyCount; --i > 0; ) if (fontkey == JU.Font.fontkeys[i] && JU.Font.font3ds[i].fontSizeNominal == fontsizeNominal) return JU.Font.font3ds[i];

var fontIndexNext = JU.Font.fontkeyCount++;
if (fontIndexNext == JU.Font.fontkeys.length) JU.Font.fontkeys = JU.AU.arrayCopyI (JU.Font.fontkeys, fontIndexNext + 8);
JU.Font.font3ds = JU.AU.arrayCopyObject (JU.Font.font3ds, fontIndexNext + 8);
var font3d =  new JU.Font (manager, fontIndexNext, fontface, fontstyle, fontsize, fontsizeNominal, graphicsForMetrics);
JU.Font.font3ds[fontIndexNext] = font3d;
JU.Font.fontkeys[fontIndexNext] = fontkey;
return font3d;
}, "~N,~N,~N,~N,J.api.FontManager,~O");
c$.getFontFaceID = Clazz_defineMethod (c$, "getFontFaceID", 
function (fontface) {
return ("Monospaced".equalsIgnoreCase (fontface) ? 2 : "Serif".equalsIgnoreCase (fontface) ? 1 : 0);
}, "~S");
c$.getFontStyleID = Clazz_defineMethod (c$, "getFontStyleID", 
function (fontstyle) {
for (var i = 4; --i >= 0; ) if (JU.Font.fontStyles[i].equalsIgnoreCase (fontstyle)) return i;

return -1;
}, "~S");
Clazz_defineMethod (c$, "getAscent", 
function () {
return this.ascent;
});
Clazz_defineMethod (c$, "getDescent", 
function () {
return this.descent;
});
Clazz_defineMethod (c$, "getHeight", 
function () {
return this.getAscent () + this.getDescent ();
});
Clazz_defineMethod (c$, "getFontMetrics", 
function () {
return this.fontMetrics;
});
Clazz_defineMethod (c$, "stringWidth", 
function (text) {
return this.manager.fontStringWidth (this, text);
}, "~S");
Clazz_defineMethod (c$, "getInfo", 
function () {
return this.fontSizeNominal + " " + this.fontFace + " " + this.fontStyle;
});
Clazz_overrideMethod (c$, "toString", 
function () {
return "[" + this.getInfo () + "]";
});
Clazz_defineStatics (c$,
"FONT_ALLOCATION_UNIT", 8,
"fontkeyCount", 1,
"fontkeys",  Clazz_newIntArray (8, 0));
c$.font3ds = c$.prototype.font3ds =  new Array (8);
Clazz_defineStatics (c$,
"FONT_FACE_SANS", 0,
"FONT_FACE_SERIF", 1,
"FONT_FACE_MONO", 2,
"fontFaces",  Clazz_newArray (-1, ["SansSerif", "Serif", "Monospaced", ""]),
"FONT_STYLE_PLAIN", 0,
"FONT_STYLE_BOLD", 1,
"FONT_STYLE_ITALIC", 2,
"FONT_STYLE_BOLDITALIC", 3,
"fontStyles",  Clazz_newArray (-1, ["Plain", "Bold", "Italic", "BoldItalic"]));
});
Clazz_declarePackage ("JS");
Clazz_load (["javajs.api.GenericColor"], "JS.Color", null, function () {
c$ = Clazz_decorateAsClass (function () {
this.argb = 0;
Clazz_instantialize (this, arguments);
}, JS, "Color", null, javajs.api.GenericColor);
Clazz_overrideMethod (c$, "getRGB", 
function () {
return this.argb & 0x00FFFFFF;
});
Clazz_overrideMethod (c$, "getOpacity255", 
function () {
return ((this.argb >> 24) & 0xFF);
});
Clazz_overrideMethod (c$, "setOpacity255", 
function (a) {
this.argb = this.argb & 0xFFFFFF | ((a & 0xFF) << 24);
}, "~N");
c$.get1 = Clazz_defineMethod (c$, "get1", 
function (rgb) {
var c =  new JS.Color ();
c.argb = rgb | 0xFF000000;
return c;
}, "~N");
c$.get3 = Clazz_defineMethod (c$, "get3", 
function (r, g, b) {
return  new JS.Color ().set4 (r, g, b, 0xFF);
}, "~N,~N,~N");
c$.get4 = Clazz_defineMethod (c$, "get4", 
function (r, g, b, a) {
return  new JS.Color ().set4 (r, g, b, a);
}, "~N,~N,~N,~N");
Clazz_defineMethod (c$, "set4", 
 function (r, g, b, a) {
this.argb = ((a << 24) | (r << 16) | (g << 8) | b) & 0xFFFFFFFF;
return this;
}, "~N,~N,~N,~N");
Clazz_overrideMethod (c$, "toString", 
function () {
var s = ("00000000" + Integer.toHexString (this.argb));
return "[0x" + s.substring (s.length - 8, s.length) + "]";
});
});
Clazz_declarePackage ("JS");
c$ = Clazz_decorateAsClass (function () {
this.width = 0;
this.height = 0;
Clazz_instantialize (this, arguments);
}, JS, "Dimension");
Clazz_makeConstructor (c$, 
function (w, h) {
this.set (w, h);
}, "~N,~N");
Clazz_defineMethod (c$, "set", 
function (w, h) {
this.width = w;
this.height = h;
return this;
}, "~N,~N");
Clazz_declarePackage ("J.awtjs");
c$ = Clazz_declareType (J.awtjs, "Event");
Clazz_defineStatics (c$,
"MOUSE_LEFT", 16,
"MOUSE_MIDDLE", 8,
"MOUSE_RIGHT", 4,
"MOUSE_WHEEL", 32,
"MAC_COMMAND", 20,
"BUTTON_MASK", 28,
"MOUSE_DOWN", 501,
"MOUSE_UP", 502,
"MOUSE_MOVE", 503,
"MOUSE_ENTER", 504,
"MOUSE_EXIT", 505,
"MOUSE_DRAG", 506,
"SHIFT_MASK", 1,
"ALT_MASK", 8,
"CTRL_MASK", 2,
"CTRL_ALT", 10,
"CTRL_SHIFT", 3,
"META_MASK", 4,
"VK_SHIFT", 16,
"VK_ALT", 18,
"VK_CONTROL", 17,
"VK_META", 157,
"VK_LEFT", 37,
"VK_RIGHT", 39,
"VK_PERIOD", 46,
"VK_SPACE", 32,
"VK_DOWN", 40,
"VK_UP", 38,
"VK_ESCAPE", 27,
"VK_DELETE", 127,
"VK_BACK_SPACE", 8,
"VK_PAGE_DOWN", 34,
"VK_PAGE_UP", 33,
"MOVED", 0,
"DRAGGED", 1,
"CLICKED", 2,
"WHEELED", 3,
"PRESSED", 4,
"RELEASED", 5);
Clazz_declarePackage ("J.api");
Clazz_declareInterface (J.api, "GenericMenuInterface");
Clazz_declarePackage ("JU");
Clazz_load (["javajs.api.JSONEncodable"], "JU.A4", ["JU.T3"], function () {
c$ = Clazz_decorateAsClass (function () {
this.x = 0;
this.y = 0;
this.z = 0;
this.angle = 0;
Clazz_instantialize (this, arguments);
}, JU, "A4", null, [javajs.api.JSONEncodable, java.io.Serializable]);
Clazz_makeConstructor (c$, 
function () {
this.z = 1.0;
});
c$.new4 = Clazz_defineMethod (c$, "new4", 
function (x, y, z, angle) {
var a =  new JU.A4 ();
a.set4 (x, y, z, angle);
return a;
}, "~N,~N,~N,~N");
c$.newAA = Clazz_defineMethod (c$, "newAA", 
function (a1) {
var a =  new JU.A4 ();
a.set4 (a1.x, a1.y, a1.z, a1.angle);
return a;
}, "JU.A4");
c$.newVA = Clazz_defineMethod (c$, "newVA", 
function (axis, angle) {
var a =  new JU.A4 ();
a.setVA (axis, angle);
return a;
}, "JU.V3,~N");
Clazz_defineMethod (c$, "setVA", 
function (axis, angle) {
this.x = axis.x;
this.y = axis.y;
this.z = axis.z;
this.angle = angle;
}, "JU.V3,~N");
Clazz_defineMethod (c$, "set4", 
function (x, y, z, angle) {
this.x = x;
this.y = y;
this.z = z;
this.angle = angle;
}, "~N,~N,~N,~N");
Clazz_defineMethod (c$, "setAA", 
function (a) {
this.x = a.x;
this.y = a.y;
this.z = a.z;
this.angle = a.angle;
}, "JU.A4");
Clazz_defineMethod (c$, "setM", 
function (m1) {
this.setFromMat (m1.m00, m1.m01, m1.m02, m1.m10, m1.m11, m1.m12, m1.m20, m1.m21, m1.m22);
}, "JU.M3");
Clazz_defineMethod (c$, "setFromMat", 
 function (m00, m01, m02, m10, m11, m12, m20, m21, m22) {
var cos = (m00 + m11 + m22 - 1.0) * 0.5;
this.x = (m21 - m12);
this.y = (m02 - m20);
this.z = (m10 - m01);
var sin = 0.5 * Math.sqrt (this.x * this.x + this.y * this.y + this.z * this.z);
if (sin == 0 && cos == 1) {
this.x = this.y = 0;
this.z = 1;
this.angle = 0;
} else {
this.angle = Math.atan2 (sin, cos);
}}, "~N,~N,~N,~N,~N,~N,~N,~N,~N");
Clazz_overrideMethod (c$, "hashCode", 
function () {
return JU.T3.floatToIntBits (this.x) ^ JU.T3.floatToIntBits (this.y) ^ JU.T3.floatToIntBits (this.z) ^ JU.T3.floatToIntBits (this.angle);
});
Clazz_overrideMethod (c$, "equals", 
function (o) {
if (!(Clazz_instanceOf (o, JU.A4))) return false;
var a1 = o;
return this.x == a1.x && this.y == a1.y && this.z == a1.z && this.angle == a1.angle;
}, "~O");
Clazz_overrideMethod (c$, "toString", 
function () {
return "(" + this.x + ", " + this.y + ", " + this.z + ", " + this.angle + ")";
});
Clazz_overrideMethod (c$, "toJSON", 
function () {
return "[" + this.x + "," + this.y + "," + this.z + "," + (this.angle * 180.0 / 3.141592653589793) + "]";
});
});
Clazz_declarePackage ("JU");
Clazz_load (["java.net.URLConnection"], "JU.AjaxURLConnection", ["JU.AU", "$.Rdr", "$.SB"], function () {
c$ = Clazz_decorateAsClass (function () {
this.bytesOut = null;
this.postOut = "";
Clazz_instantialize (this, arguments);
}, JU, "AjaxURLConnection", java.net.URLConnection);
Clazz_defineMethod (c$, "doAjax", 
 function () {
var jmol = null;
{
jmol = Jmol;
}return jmol.doAjax (this.url, this.postOut, this.bytesOut, false);
});
Clazz_overrideMethod (c$, "connect", 
function () {
});
Clazz_defineMethod (c$, "outputBytes", 
function (bytes) {
this.bytesOut = bytes;
}, "~A");
Clazz_defineMethod (c$, "outputString", 
function (post) {
this.postOut = post;
}, "~S");
Clazz_overrideMethod (c$, "getInputStream", 
function () {
var is = null;
var o = this.doAjax ();
if (JU.AU.isAB (o)) is = JU.Rdr.getBIS (o);
 else if (Clazz_instanceOf (o, JU.SB)) is = JU.Rdr.getBIS (JU.Rdr.getBytesFromSB (o));
 else if (Clazz_instanceOf (o, String)) is = JU.Rdr.getBIS ((o).getBytes ());
return is;
});
Clazz_defineMethod (c$, "getContents", 
function () {
return this.doAjax ();
});
});
Clazz_declarePackage ("JU");
Clazz_load (["java.net.URLStreamHandler"], "JU.AjaxURLStreamHandler", ["JU.AjaxURLConnection", "$.SB"], function () {
c$ = Clazz_decorateAsClass (function () {
this.protocol = null;
Clazz_instantialize (this, arguments);
}, JU, "AjaxURLStreamHandler", java.net.URLStreamHandler);
Clazz_makeConstructor (c$, 
function (protocol) {
Clazz_superConstructor (this, JU.AjaxURLStreamHandler, []);
this.protocol = protocol;
}, "~S");
Clazz_overrideMethod (c$, "openConnection", 
function (url) {
return  new JU.AjaxURLConnection (url);
}, "java.net.URL");
Clazz_overrideMethod (c$, "toExternalForm", 
function (u) {
var result =  new JU.SB ();
result.append (u.getProtocol ());
result.append (":");
if (u.getAuthority () != null && u.getAuthority ().length > 0) {
result.append ("//");
result.append (u.getAuthority ());
}if (u.getPath () != null) {
result.append (u.getPath ());
}if (u.getQuery () != null) {
result.append ("?");
result.append (u.getQuery ());
}if (u.getRef () != null) {
result.append ("#");
result.append (u.getRef ());
}return result.toString ();
}, "java.net.URL");
});
Clazz_declarePackage ("JU");
Clazz_load (["java.net.URLStreamHandlerFactory", "java.util.Hashtable"], "JU.AjaxURLStreamHandlerFactory", ["JU.AjaxURLStreamHandler"], function () {
c$ = Clazz_decorateAsClass (function () {
this.htFactories = null;
Clazz_instantialize (this, arguments);
}, JU, "AjaxURLStreamHandlerFactory", null, java.net.URLStreamHandlerFactory);
Clazz_prepareFields (c$, function () {
this.htFactories =  new java.util.Hashtable ();
});
Clazz_overrideMethod (c$, "createURLStreamHandler", 
function (protocol) {
var fac = this.htFactories.get (protocol);
if (fac == null) this.htFactories.put (protocol, fac =  new JU.AjaxURLStreamHandler (protocol));
return (fac.protocol == null ? null : fac);
}, "~S");
});
Clazz_declarePackage ("JU");
Clazz_load (null, "JU.AU", ["java.lang.reflect.Array", "java.util.Arrays", "JU.Lst"], function () {
c$ = Clazz_declareType (JU, "AU");
c$.ensureLength = Clazz_defineMethod (c$, "ensureLength", 
function (array, minimumLength) {
return (array != null && JU.AU.getLength (array) >= minimumLength ? array : JU.AU.arrayCopyObject (array, minimumLength));
}, "~O,~N");
c$.ensureLengthS = Clazz_defineMethod (c$, "ensureLengthS", 
function (array, minimumLength) {
return (array != null && array.length >= minimumLength ? array : JU.AU.arrayCopyS (array, minimumLength));
}, "~A,~N");
c$.ensureLengthA = Clazz_defineMethod (c$, "ensureLengthA", 
function (array, minimumLength) {
return (array != null && array.length >= minimumLength ? array : JU.AU.arrayCopyF (array, minimumLength));
}, "~A,~N");
c$.ensureLengthI = Clazz_defineMethod (c$, "ensureLengthI", 
function (array, minimumLength) {
return (array != null && array.length >= minimumLength ? array : JU.AU.arrayCopyI (array, minimumLength));
}, "~A,~N");
c$.ensureLengthShort = Clazz_defineMethod (c$, "ensureLengthShort", 
function (array, minimumLength) {
return (array != null && array.length >= minimumLength ? array : JU.AU.arrayCopyShort (array, minimumLength));
}, "~A,~N");
c$.ensureLengthByte = Clazz_defineMethod (c$, "ensureLengthByte", 
function (array, minimumLength) {
return (array != null && array.length >= minimumLength ? array : JU.AU.arrayCopyByte (array, minimumLength));
}, "~A,~N");
c$.doubleLength = Clazz_defineMethod (c$, "doubleLength", 
function (array) {
return JU.AU.arrayCopyObject (array, (array == null ? 16 : 2 * JU.AU.getLength (array)));
}, "~O");
c$.doubleLengthS = Clazz_defineMethod (c$, "doubleLengthS", 
function (array) {
return JU.AU.arrayCopyS (array, (array == null ? 16 : 2 * array.length));
}, "~A");
c$.doubleLengthF = Clazz_defineMethod (c$, "doubleLengthF", 
function (array) {
return JU.AU.arrayCopyF (array, (array == null ? 16 : 2 * array.length));
}, "~A");
c$.doubleLengthI = Clazz_defineMethod (c$, "doubleLengthI", 
function (array) {
return JU.AU.arrayCopyI (array, (array == null ? 16 : 2 * array.length));
}, "~A");
c$.doubleLengthShort = Clazz_defineMethod (c$, "doubleLengthShort", 
function (array) {
return JU.AU.arrayCopyShort (array, (array == null ? 16 : 2 * array.length));
}, "~A");
c$.doubleLengthByte = Clazz_defineMethod (c$, "doubleLengthByte", 
function (array) {
return JU.AU.arrayCopyByte (array, (array == null ? 16 : 2 * array.length));
}, "~A");
c$.doubleLengthBool = Clazz_defineMethod (c$, "doubleLengthBool", 
function (array) {
return JU.AU.arrayCopyBool (array, (array == null ? 16 : 2 * array.length));
}, "~A");
c$.deleteElements = Clazz_defineMethod (c$, "deleteElements", 
function (array, firstElement, nElements) {
if (nElements == 0 || array == null) return array;
var oldLength = JU.AU.getLength (array);
if (firstElement >= oldLength) return array;
var n = oldLength - (firstElement + nElements);
if (n < 0) n = 0;
var t = JU.AU.newInstanceO (array, firstElement + n);
if (firstElement > 0) System.arraycopy (array, 0, t, 0, firstElement);
if (n > 0) System.arraycopy (array, firstElement + nElements, t, firstElement, n);
return t;
}, "~O,~N,~N");
c$.arrayCopyObject = Clazz_defineMethod (c$, "arrayCopyObject", 
function (array, newLength) {
var oldLength = (array == null ? -1 : JU.AU.getLength (array));
if (newLength < 0) newLength = oldLength;
if (newLength == oldLength) return array;
{
if (newLength < oldLength) return Clazz_newArray(-1, array, 0, newLength);
}var t = JU.AU.newInstanceO (array, newLength);
if (oldLength > 0) System.arraycopy (array, 0, t, 0, oldLength < newLength ? oldLength : newLength);
return t;
}, "~O,~N");
c$.newInstanceO = Clazz_defineMethod (c$, "newInstanceO", 
 function (array, n) {
if (JU.AU.isAI (array)) return  Clazz_newIntArray (n, 0);
{
if (!array.getClass || !array.getClass().getComponentType)
return new Array(n);
}return java.lang.reflect.Array.newInstance (array.getClass ().getComponentType (), n);
}, "~O,~N");
c$.getLength = Clazz_defineMethod (c$, "getLength", 
function (array) {
{
return array.length
}}, "~O");
c$.arrayCopyS = Clazz_defineMethod (c$, "arrayCopyS", 
function (array, newLength) {
var oldLength = (array == null ? -1 : array.length);
if (newLength < 0) newLength = oldLength;
{
if (newLength < oldLength) return Clazz_newArray(-1, array, 0, newLength);
}var t =  new Array (newLength);
if (array != null) {
System.arraycopy (array, 0, t, 0, oldLength < newLength ? oldLength : newLength);
}return t;
}, "~A,~N");
c$.arrayCopyII = Clazz_defineMethod (c$, "arrayCopyII", 
function (array, newLength) {
var t = JU.AU.newInt2 (newLength);
if (array != null) {
var oldLength = array.length;
System.arraycopy (array, 0, t, 0, oldLength < newLength ? oldLength : newLength);
}return t;
}, "~A,~N");
c$.arrayCopyPt = Clazz_defineMethod (c$, "arrayCopyPt", 
function (array, newLength) {
if (newLength < 0) newLength = array.length;
var t =  new Array (newLength);
if (array != null) {
var oldLength = array.length;
System.arraycopy (array, 0, t, 0, oldLength < newLength ? oldLength : newLength);
}return t;
}, "~A,~N");
c$.arrayCopyF = Clazz_defineMethod (c$, "arrayCopyF", 
function (array, newLength) {
var oldLength = (array == null ? -1 : array.length);
if (newLength < 0) newLength = oldLength;
{
if (newLength < oldLength) return Clazz_newArray(-1, array, 0, newLength);
}var t =  Clazz_newFloatArray (newLength, 0);
if (array != null) {
System.arraycopy (array, 0, t, 0, oldLength < newLength ? oldLength : newLength);
}return t;
}, "~A,~N");
c$.arrayCopyI = Clazz_defineMethod (c$, "arrayCopyI", 
function (array, newLength) {
var oldLength = (array == null ? -1 : array.length);
if (newLength < 0) newLength = oldLength;
{
if (newLength < oldLength) return Clazz_newArray(-1, array, 0, newLength);
}var t =  Clazz_newIntArray (newLength, 0);
if (array != null) {
System.arraycopy (array, 0, t, 0, oldLength < newLength ? oldLength : newLength);
}return t;
}, "~A,~N");
c$.arrayCopyRangeI = Clazz_defineMethod (c$, "arrayCopyRangeI", 
function (array, i0, n) {
if (array == null) return null;
var oldLength = array.length;
if (n == -1) n = oldLength;
if (n == -2) n = Clazz_doubleToInt (oldLength / 2);
{
return Clazz_newArray(-1, array, i0, n);
}}, "~A,~N,~N");
c$.arrayCopyRangeRevI = Clazz_defineMethod (c$, "arrayCopyRangeRevI", 
function (array, i0, n) {
if (array == null) return null;
{
return Clazz_newArray(-1, array, i0, n).reverse();
}}, "~A,~N,~N");
c$.arrayCopyShort = Clazz_defineMethod (c$, "arrayCopyShort", 
function (array, newLength) {
var oldLength = (array == null ? -1 : array.length);
if (newLength < 0) newLength = oldLength;
{
if (newLength < oldLength) return Clazz_newArray(-1, array, 0, newLength);
}var t =  Clazz_newShortArray (newLength, 0);
if (array != null) {
System.arraycopy (array, 0, t, 0, oldLength < newLength ? oldLength : newLength);
}return t;
}, "~A,~N");
c$.arrayCopyByte = Clazz_defineMethod (c$, "arrayCopyByte", 
function (array, newLength) {
var oldLength = (array == null ? -1 : array.length);
if (newLength < 0) newLength = oldLength;
{
if (newLength < oldLength) return Clazz_newArray(-1, array, 0, newLength);
}var t =  Clazz_newByteArray (newLength, 0);
if (array != null) {
System.arraycopy (array, 0, t, 0, oldLength < newLength ? oldLength : newLength);
}return t;
}, "~A,~N");
c$.arrayCopyBool = Clazz_defineMethod (c$, "arrayCopyBool", 
function (array, newLength) {
var oldLength = (array == null ? -1 : array.length);
if (newLength < 0) newLength = oldLength;
{
if (newLength < oldLength) return Clazz_newArray(-1, array, 0, newLength);
}var t =  Clazz_newBooleanArray (newLength, false);
if (array != null) {
System.arraycopy (array, 0, t, 0, oldLength < newLength ? oldLength : newLength);
}return t;
}, "~A,~N");
c$.swapInt = Clazz_defineMethod (c$, "swapInt", 
function (array, indexA, indexB) {
var t = array[indexA];
array[indexA] = array[indexB];
array[indexB] = t;
}, "~A,~N,~N");
c$.dumpArray = Clazz_defineMethod (c$, "dumpArray", 
function (msg, A, x1, x2, y1, y2) {
var s = "dumpArray: " + msg + "\n";
for (var x = x1; x <= x2; x++) s += "\t*" + x + "*";

for (var y = y2; y >= y1; y--) {
s += "\n*" + y + "*";
for (var x = x1; x <= x2; x++) s += "\t" + (x < A.length && y < A[x].length ? A[x][y] : NaN);

}
return s;
}, "~S,~A,~N,~N,~N,~N");
c$.dumpIntArray = Clazz_defineMethod (c$, "dumpIntArray", 
function (A, n) {
var str = "";
for (var i = 0; i < n; i++) str += " " + A[i];

return str;
}, "~A,~N");
c$.sortedItem = Clazz_defineMethod (c$, "sortedItem", 
function (v, n) {
if (v.size () == 0) return null;
if (v.size () == 1) return v.get (0);
var keys = v.toArray ( new Array (v.size ()));
java.util.Arrays.sort (keys);
return keys[n % keys.length];
}, "JU.Lst,~N");
c$.createArrayOfArrayList = Clazz_defineMethod (c$, "createArrayOfArrayList", 
function (size) {
return  new Array (size);
}, "~N");
c$.createArrayOfHashtable = Clazz_defineMethod (c$, "createArrayOfHashtable", 
function (size) {
return  new Array (size);
}, "~N");
c$.swap = Clazz_defineMethod (c$, "swap", 
function (o, i, j) {
var oi = o[i];
o[i] = o[j];
o[j] = oi;
}, "~A,~N,~N");
c$.newFloat2 = Clazz_defineMethod (c$, "newFloat2", 
function (n) {
{
return Clazz_newArray(n, null);
}}, "~N");
c$.newInt2 = Clazz_defineMethod (c$, "newInt2", 
function (n) {
{
return Clazz_newArray(n, null);
}}, "~N");
c$.newInt3 = Clazz_defineMethod (c$, "newInt3", 
function (nx, ny) {
{
return Clazz_newArray(nx, null);
}}, "~N,~N");
c$.newFloat3 = Clazz_defineMethod (c$, "newFloat3", 
function (nx, ny) {
{
return Clazz_newArray(nx, null);
}}, "~N,~N");
c$.newInt4 = Clazz_defineMethod (c$, "newInt4", 
function (n) {
{
return Clazz_newArray(n, null);
}}, "~N");
c$.newShort2 = Clazz_defineMethod (c$, "newShort2", 
function (n) {
{
return Clazz_newArray(n, null);
}}, "~N");
c$.newByte2 = Clazz_defineMethod (c$, "newByte2", 
function (n) {
{
return Clazz_newArray(n, null);
}}, "~N");
c$.newDouble2 = Clazz_defineMethod (c$, "newDouble2", 
function (n) {
{
return Clazz_newArray(n, null);
}}, "~N");
c$.removeMapKeys = Clazz_defineMethod (c$, "removeMapKeys", 
function (map, root) {
var list =  new JU.Lst ();
for (var key, $key = map.keySet ().iterator (); $key.hasNext () && ((key = $key.next ()) || true);) if (key.startsWith (root)) list.addLast (key);

for (var i = list.size (); --i >= 0; ) map.remove (list.get (i));

return list.size ();
}, "java.util.Map,~S");
c$.isAS = Clazz_defineMethod (c$, "isAS", 
function (x) {
{
return Clazz_isAS(x);
}}, "~O");
c$.isASS = Clazz_defineMethod (c$, "isASS", 
function (x) {
{
return Clazz_isASS(x);
}}, "~O");
c$.isAP = Clazz_defineMethod (c$, "isAP", 
function (x) {
{
return Clazz_isAP(x);
}}, "~O");
c$.isAF = Clazz_defineMethod (c$, "isAF", 
function (x) {
{
return Clazz_isAF(x);
}}, "~O");
c$.isAFloat = Clazz_defineMethod (c$, "isAFloat", 
function (x) {
{
return Clazz_isAFloat(x);
}}, "~O");
c$.isAD = Clazz_defineMethod (c$, "isAD", 
function (x) {
{
return Clazz_isAF(x);
}}, "~O");
c$.isADD = Clazz_defineMethod (c$, "isADD", 
function (x) {
{
return Clazz_isAFF(x);
}}, "~O");
c$.isAB = Clazz_defineMethod (c$, "isAB", 
function (x) {
{
return Clazz_isAB(x);
}}, "~O");
c$.isAI = Clazz_defineMethod (c$, "isAI", 
function (x) {
{
return Clazz_isAI(x);
}}, "~O");
c$.isAII = Clazz_defineMethod (c$, "isAII", 
function (x) {
{
return Clazz_isAII(x);
}}, "~O");
c$.isAFF = Clazz_defineMethod (c$, "isAFF", 
function (x) {
{
return Clazz_isAFF(x);
}}, "~O");
c$.isAFFF = Clazz_defineMethod (c$, "isAFFF", 
function (x) {
{
return Clazz_isAFFF(x);
}}, "~O");
c$.ensureSignedBytes = Clazz_defineMethod (c$, "ensureSignedBytes", 
function (b) {
if (b != null) {
{
for (var i = b.length; --i >= 0;) { var j = b[i] & 0xFF; if
(j >= 0x80) j -= 0x100; b[i] = j; }
}}return b;
}, "~A");
});
Clazz_declarePackage ("JU");
Clazz_load (null, "JU.Base64", ["JU.SB"], function () {
c$ = Clazz_declareType (JU, "Base64");
c$.getBytes64 = Clazz_defineMethod (c$, "getBytes64", 
function (bytes) {
return JU.Base64.getBase64 (bytes).toBytes (0, -1);
}, "~A");
c$.getBase64 = Clazz_defineMethod (c$, "getBase64", 
function (bytes) {
var nBytes = bytes.length;
var sout =  new JU.SB ();
if (nBytes == 0) return sout;
for (var i = 0, nPad = 0; i < nBytes && nPad == 0; ) {
if (i % 75 == 0 && i != 0) sout.append ("\r\n");
nPad = (i + 2 == nBytes ? 1 : i + 1 == nBytes ? 2 : 0);
var outbytes = ((bytes[i++] << 16) & 0xFF0000) | ((nPad == 2 ? 0 : bytes[i++] << 8) & 0x00FF00) | ((nPad >= 1 ? 0 : bytes[i++]) & 0x0000FF);
sout.appendC (JU.Base64.base64.charAt ((outbytes >> 18) & 0x3F));
sout.appendC (JU.Base64.base64.charAt ((outbytes >> 12) & 0x3F));
sout.appendC (nPad == 2 ? '=' : JU.Base64.base64.charAt ((outbytes >> 6) & 0x3F));
sout.appendC (nPad >= 1 ? '=' : JU.Base64.base64.charAt (outbytes & 0x3F));
}
return sout;
}, "~A");
c$.decodeBase64 = Clazz_defineMethod (c$, "decodeBase64", 
function (strBase64) {
var nBytes = 0;
var ch;
var pt0 = strBase64.indexOf (";base64,") + 1;
if (pt0 > 0) pt0 += 7;
var chars64 = strBase64.toCharArray ();
var len64 = chars64.length;
if (len64 == 0) return  Clazz_newByteArray (0, 0);
for (var i = len64; --i >= pt0; ) nBytes += ((ch = (chars64[i]).charCodeAt (0) & 0x7F) == 65 || JU.Base64.decode64[ch] > 0 ? 3 : 0);

nBytes = nBytes >> 2;
var bytes =  Clazz_newByteArray (nBytes, 0);
var offset = 18;
for (var i = pt0, pt = 0, b = 0; i < len64; i++) {
if (JU.Base64.decode64[ch = (chars64[i]).charCodeAt (0) & 0x7F] > 0 || ch == 65 || ch == 61) {
b |= JU.Base64.decode64[ch] << offset;
offset -= 6;
if (offset < 0) {
bytes[pt++] = ((b & 0xFF0000) >> 16);
if (pt < nBytes) bytes[pt++] = ((b & 0xFF00) >> 8);
if (pt < nBytes) bytes[pt++] = (b & 0xFF);
offset = 18;
b = 0;
}}}
return bytes;
}, "~S");
Clazz_defineStatics (c$,
"base64", "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/",
"decode64",  Clazz_newIntArray (-1, [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 62, 0, 62, 0, 63, 52, 53, 54, 55, 56, 57, 58, 59, 60, 61, 0, 0, 0, 0, 0, 0, 0, 0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 0, 0, 0, 0, 63, 0, 26, 27, 28, 29, 30, 31, 32, 33, 34, 35, 36, 37, 38, 39, 40, 41, 42, 43, 44, 45, 46, 47, 48, 49, 50, 51, 0, 0, 0, 0, 0]));
});
Clazz_declarePackage ("JU");
Clazz_load (["javajs.api.JSONEncodable"], "JU.BS", ["java.lang.IndexOutOfBoundsException", "$.NegativeArraySizeException", "JU.PT", "$.SB"], function () {
c$ = Clazz_decorateAsClass (function () {
this.words = null;
this.wordsInUse = 0;
this.sizeIsSticky = false;
Clazz_instantialize (this, arguments);
}, JU, "BS", null, [Cloneable, javajs.api.JSONEncodable]);
c$.wordIndex = Clazz_defineMethod (c$, "wordIndex", 
 function (bitIndex) {
return bitIndex >> 5;
}, "~N");
Clazz_defineMethod (c$, "recalculateWordsInUse", 
 function () {
var i;
for (i = this.wordsInUse - 1; i >= 0; i--) if (this.words[i] != 0) break;

this.wordsInUse = i + 1;
});
Clazz_makeConstructor (c$, 
function () {
this.initWords (32);
this.sizeIsSticky = false;
});
c$.newN = Clazz_defineMethod (c$, "newN", 
function (nbits) {
var bs =  new JU.BS ();
bs.init (nbits);
return bs;
}, "~N");
Clazz_defineMethod (c$, "init", 
 function (nbits) {
if (nbits < 0) throw  new NegativeArraySizeException ("nbits < 0: " + nbits);
this.initWords (nbits);
this.sizeIsSticky = true;
}, "~N");
Clazz_defineMethod (c$, "initWords", 
 function (nbits) {
this.words =  Clazz_newIntArray (JU.BS.wordIndex (nbits - 1) + 1, 0);
}, "~N");
Clazz_defineMethod (c$, "ensureCapacity", 
 function (wordsRequired) {
if (this.words.length < wordsRequired) {
var request = Math.max (2 * this.words.length, wordsRequired);
this.setLength (request);
this.sizeIsSticky = false;
}}, "~N");
Clazz_defineMethod (c$, "expandTo", 
 function (wordIndex) {
var wordsRequired = wordIndex + 1;
if (this.wordsInUse < wordsRequired) {
this.ensureCapacity (wordsRequired);
this.wordsInUse = wordsRequired;
}}, "~N");
Clazz_defineMethod (c$, "set", 
function (bitIndex) {
if (bitIndex < 0) throw  new IndexOutOfBoundsException ("bitIndex < 0: " + bitIndex);
var wordIndex = JU.BS.wordIndex (bitIndex);
this.expandTo (wordIndex);
this.words[wordIndex] |= (1 << bitIndex);
}, "~N");
Clazz_defineMethod (c$, "setBitTo", 
function (bitIndex, value) {
if (value) this.set (bitIndex);
 else this.clear (bitIndex);
}, "~N,~B");
Clazz_defineMethod (c$, "setBits", 
function (fromIndex, toIndex) {
if (fromIndex == toIndex) return;
var startWordIndex = JU.BS.wordIndex (fromIndex);
var endWordIndex = JU.BS.wordIndex (toIndex - 1);
this.expandTo (endWordIndex);
var firstWordMask = -1 << fromIndex;
var lastWordMask = -1 >>> -toIndex;
if (startWordIndex == endWordIndex) {
this.words[startWordIndex] |= (firstWordMask & lastWordMask);
} else {
this.words[startWordIndex] |= firstWordMask;
for (var i = startWordIndex + 1; i < endWordIndex; i++) this.words[i] = -1;

this.words[endWordIndex] |= lastWordMask;
}}, "~N,~N");
Clazz_defineMethod (c$, "clear", 
function (bitIndex) {
if (bitIndex < 0) throw  new IndexOutOfBoundsException ("bitIndex < 0: " + bitIndex);
var wordIndex = JU.BS.wordIndex (bitIndex);
if (wordIndex >= this.wordsInUse) return;
this.words[wordIndex] &= ~(1 << bitIndex);
this.recalculateWordsInUse ();
}, "~N");
Clazz_defineMethod (c$, "clearBits", 
function (fromIndex, toIndex) {
if (fromIndex == toIndex) return;
var startWordIndex = JU.BS.wordIndex (fromIndex);
if (startWordIndex >= this.wordsInUse) return;
var endWordIndex = JU.BS.wordIndex (toIndex - 1);
if (endWordIndex >= this.wordsInUse) {
toIndex = this.length ();
endWordIndex = this.wordsInUse - 1;
}var firstWordMask = -1 << fromIndex;
var lastWordMask = -1 >>> -toIndex;
if (startWordIndex == endWordIndex) {
this.words[startWordIndex] &= ~(firstWordMask & lastWordMask);
} else {
this.words[startWordIndex] &= ~firstWordMask;
for (var i = startWordIndex + 1; i < endWordIndex; i++) this.words[i] = 0;

this.words[endWordIndex] &= ~lastWordMask;
}this.recalculateWordsInUse ();
}, "~N,~N");
Clazz_defineMethod (c$, "clearAll", 
function () {
while (this.wordsInUse > 0) this.words[--this.wordsInUse] = 0;

});
Clazz_defineMethod (c$, "get", 
function (bitIndex) {
if (bitIndex < 0) throw  new IndexOutOfBoundsException ("bitIndex < 0: " + bitIndex);
var wordIndex = JU.BS.wordIndex (bitIndex);
return (wordIndex < this.wordsInUse) && ((this.words[wordIndex] & (1 << bitIndex)) != 0);
}, "~N");
Clazz_defineMethod (c$, "nextSetBit", 
function (fromIndex) {
if (fromIndex < 0) throw  new IndexOutOfBoundsException ("fromIndex < 0: " + fromIndex);
var u = JU.BS.wordIndex (fromIndex);
if (u >= this.wordsInUse) return -1;
var word = this.words[u] & (-1 << fromIndex);
while (true) {
if (word != 0) return (u * 32) + Integer.numberOfTrailingZeros (word);
if (++u == this.wordsInUse) return -1;
word = this.words[u];
}
}, "~N");
Clazz_defineMethod (c$, "nextClearBit", 
function (fromIndex) {
if (fromIndex < 0) throw  new IndexOutOfBoundsException ("fromIndex < 0: " + fromIndex);
var u = JU.BS.wordIndex (fromIndex);
if (u >= this.wordsInUse) return fromIndex;
var word = ~this.words[u] & (-1 << fromIndex);
while (true) {
if (word != 0) return (u * 32) + Integer.numberOfTrailingZeros (word);
if (++u == this.wordsInUse) return this.wordsInUse * 32;
word = ~this.words[u];
}
}, "~N");
Clazz_defineMethod (c$, "length", 
function () {
if (this.wordsInUse == 0) return 0;
return 32 * (this.wordsInUse - 1) + (32 - Integer.numberOfLeadingZeros (this.words[this.wordsInUse - 1]));
});
Clazz_defineMethod (c$, "isEmpty", 
function () {
return this.wordsInUse == 0;
});
Clazz_defineMethod (c$, "intersects", 
function (set) {
for (var i = Math.min (this.wordsInUse, set.wordsInUse) - 1; i >= 0; i--) if ((this.words[i] & set.words[i]) != 0) return true;

return false;
}, "JU.BS");
Clazz_defineMethod (c$, "cardinality", 
function () {
var sum = 0;
for (var i = 0; i < this.wordsInUse; i++) sum += Integer.bitCount (this.words[i]);

return sum;
});
Clazz_defineMethod (c$, "and", 
function (set) {
if (this === set) return;
while (this.wordsInUse > set.wordsInUse) this.words[--this.wordsInUse] = 0;

for (var i = 0; i < this.wordsInUse; i++) this.words[i] &= set.words[i];

this.recalculateWordsInUse ();
}, "JU.BS");
Clazz_defineMethod (c$, "or", 
function (set) {
if (this === set) return;
var wordsInCommon = Math.min (this.wordsInUse, set.wordsInUse);
if (this.wordsInUse < set.wordsInUse) {
this.ensureCapacity (set.wordsInUse);
this.wordsInUse = set.wordsInUse;
}for (var i = 0; i < wordsInCommon; i++) this.words[i] |= set.words[i];

if (wordsInCommon < set.wordsInUse) System.arraycopy (set.words, wordsInCommon, this.words, wordsInCommon, this.wordsInUse - wordsInCommon);
}, "JU.BS");
Clazz_defineMethod (c$, "xor", 
function (set) {
var wordsInCommon = Math.min (this.wordsInUse, set.wordsInUse);
if (this.wordsInUse < set.wordsInUse) {
this.ensureCapacity (set.wordsInUse);
this.wordsInUse = set.wordsInUse;
}for (var i = 0; i < wordsInCommon; i++) this.words[i] ^= set.words[i];

if (wordsInCommon < set.wordsInUse) System.arraycopy (set.words, wordsInCommon, this.words, wordsInCommon, set.wordsInUse - wordsInCommon);
this.recalculateWordsInUse ();
}, "JU.BS");
Clazz_defineMethod (c$, "andNot", 
function (set) {
for (var i = Math.min (this.wordsInUse, set.wordsInUse) - 1; i >= 0; i--) this.words[i] &= ~set.words[i];

this.recalculateWordsInUse ();
}, "JU.BS");
Clazz_overrideMethod (c$, "hashCode", 
function () {
var h = 1234;
for (var i = this.wordsInUse; --i >= 0; ) h ^= this.words[i] * (i + 1);

return ((h >> 32) ^ h);
});
Clazz_defineMethod (c$, "size", 
function () {
return this.words.length * 32;
});
Clazz_overrideMethod (c$, "equals", 
function (obj) {
if (!(Clazz_instanceOf (obj, JU.BS))) return false;
if (this === obj) return true;
var set = obj;
if (this.wordsInUse != set.wordsInUse) return false;
for (var i = 0; i < this.wordsInUse; i++) if (this.words[i] != set.words[i]) return false;

return true;
}, "~O");
Clazz_overrideMethod (c$, "clone", 
function () {
if (!this.sizeIsSticky && this.wordsInUse != this.words.length) this.setLength (this.wordsInUse);
return JU.BS.copy (this);
});
Clazz_defineMethod (c$, "setLength", 
 function (n) {
{
if (n == this.words.length) return;
if (n == this.wordsInUse) {
this.words = Clazz_newArray(-1, this.words, 0, n);
return;
}
}var a =  Clazz_newIntArray (n, 0);
System.arraycopy (this.words, 0, a, 0, this.wordsInUse);
this.words = a;
}, "~N");
Clazz_overrideMethod (c$, "toString", 
function () {
return JU.BS.escape (this, '(', ')');
});
c$.copy = Clazz_defineMethod (c$, "copy", 
function (bitsetToCopy) {
var bs;
{
bs = Clazz_clone(bitsetToCopy);
}var wordCount = bitsetToCopy.wordsInUse;
if (wordCount == 0) {
bs.words = JU.BS.emptyBitmap;
} else {
{
bs.words = Clazz_newArray(-1, bitsetToCopy.words, 0, bs.wordsInUse = wordCount);
}}return bs;
}, "JU.BS");
Clazz_defineMethod (c$, "cardinalityN", 
function (max) {
var n = this.cardinality ();
for (var i = this.length (); --i >= max; ) if (this.get (i)) n--;

return n;
}, "~N");
Clazz_overrideMethod (c$, "toJSON", 
function () {
var numBits = (this.wordsInUse > 128 ? this.cardinality () : this.wordsInUse * 32);
var b = JU.SB.newN (6 * numBits + 2);
b.appendC ('[');
var i = this.nextSetBit (0);
if (i != -1) {
b.appendI (i);
for (i = this.nextSetBit (i + 1); i >= 0; i = this.nextSetBit (i + 1)) {
var endOfRun = this.nextClearBit (i);
do {
b.append (", ").appendI (i);
} while (++i < endOfRun);
}
}b.appendC (']');
return b.toString ();
});
c$.escape = Clazz_defineMethod (c$, "escape", 
function (bs, chOpen, chClose) {
if (bs == null) return chOpen + "{}" + chClose;
var s =  new JU.SB ();
s.append (chOpen + "{");
var imax = bs.length ();
var iLast = -1;
var iFirst = -2;
var i = -1;
while (++i <= imax) {
var isSet = bs.get (i);
if (i == imax || iLast >= 0 && !isSet) {
if (iLast >= 0 && iFirst != iLast) s.append ((iFirst == iLast - 1 ? " " : ":") + iLast);
if (i == imax) break;
iLast = -1;
}if (bs.get (i)) {
if (iLast < 0) {
s.append ((iFirst == -2 ? "" : " ") + i);
iFirst = i;
}iLast = i;
}}
s.append ("}").appendC (chClose);
return s.toString ();
}, "JU.BS,~S,~S");
c$.unescape = Clazz_defineMethod (c$, "unescape", 
function (str) {
var ch;
var len;
if (str == null || (len = (str = str.trim ()).length) < 4 || str.equalsIgnoreCase ("({null})") || (ch = str.charAt (0)) != '(' && ch != '[' || str.charAt (len - 1) != (ch == '(' ? ')' : ']') || str.charAt (1) != '{' || str.indexOf ('}') != len - 2) return null;
len -= 2;
for (var i = len; --i >= 2; ) if (!JU.PT.isDigit (ch = str.charAt (i)) && ch != ' ' && ch != '\t' && ch != ':') return null;

var lastN = len;
while (JU.PT.isDigit (str.charAt (--lastN))) {
}
if (++lastN == len) lastN = 0;
 else try {
lastN = Integer.parseInt (str.substring (lastN, len));
} catch (e) {
if (Clazz_exceptionOf (e, NumberFormatException)) {
return null;
} else {
throw e;
}
}
var bs = JU.BS.newN (lastN);
lastN = -1;
var iPrev = -1;
var iThis = -2;
for (var i = 2; i <= len; i++) {
switch (ch = str.charAt (i)) {
case '\t':
case ' ':
case '}':
if (iThis < 0) break;
if (iThis < lastN) return null;
lastN = iThis;
if (iPrev < 0) iPrev = iThis;
bs.setBits (iPrev, iThis + 1);
iPrev = -1;
iThis = -2;
break;
case ':':
iPrev = lastN = iThis;
iThis = -2;
break;
default:
if (JU.PT.isDigit (ch)) {
if (iThis < 0) iThis = 0;
iThis = (iThis * 10) + (ch.charCodeAt (0) - 48);
}}
}
return (iPrev >= 0 ? null : bs);
}, "~S");
Clazz_defineStatics (c$,
"ADDRESS_BITS_PER_WORD", 5,
"BITS_PER_WORD", 32,
"WORD_MASK", 0xffffffff,
"emptyBitmap",  Clazz_newIntArray (0, 0));
});
Clazz_declarePackage ("JU");
Clazz_load (["java.util.Hashtable"], "JU.CU", ["JU.P3", "$.PT"], function () {
c$ = Clazz_declareType (JU, "CU");
c$.toRGBHexString = Clazz_defineMethod (c$, "toRGBHexString", 
function (c) {
var rgb = c.getRGB ();
if (rgb == 0) return "000000";
var r = "00" + Integer.toHexString ((rgb >> 16) & 0xFF);
r = r.substring (r.length - 2);
var g = "00" + Integer.toHexString ((rgb >> 8) & 0xFF);
g = g.substring (g.length - 2);
var b = "00" + Integer.toHexString (rgb & 0xFF);
b = b.substring (b.length - 2);
return r + g + b;
}, "javajs.api.GenericColor");
c$.toCSSString = Clazz_defineMethod (c$, "toCSSString", 
function (c) {
var opacity = c.getOpacity255 ();
if (opacity == 255) return "#" + JU.CU.toRGBHexString (c);
var rgb = c.getRGB ();
return "rgba(" + ((rgb >> 16) & 0xFF) + "," + ((rgb >> 8) & 0xff) + "," + (rgb & 0xff) + "," + opacity / 255 + ")";
}, "javajs.api.GenericColor");
c$.getArgbFromString = Clazz_defineMethod (c$, "getArgbFromString", 
function (strColor) {
var len = 0;
if (strColor == null || (len = strColor.length) == 0) return 0;
strColor = strColor.toLowerCase ();
if (strColor.charAt (0) == '[' && strColor.charAt (len - 1) == ']') {
var check;
if (strColor.indexOf (",") >= 0) {
var tokens = JU.PT.split (strColor.substring (1, strColor.length - 1), ",");
if (tokens.length != 3) return 0;
var red = JU.PT.parseFloat (tokens[0]);
var grn = JU.PT.parseFloat (tokens[1]);
var blu = JU.PT.parseFloat (tokens[2]);
return JU.CU.colorTriadToFFRGB (red, grn, blu);
}switch (len) {
case 9:
check = "x";
break;
case 10:
check = "0x";
break;
default:
return 0;
}
if (strColor.indexOf (check) != 1) return 0;
strColor = "#" + strColor.substring (len - 7, len - 1);
len = 7;
}if (len == 7 && strColor.charAt (0) == '#') {
try {
return JU.PT.parseIntRadix (strColor.substring (1, 7), 16) | 0xFF000000;
} catch (e) {
if (Clazz_exceptionOf (e, Exception)) {
return 0;
} else {
throw e;
}
}
}var boxedArgb = JU.CU.mapJavaScriptColors.get (strColor);
return (boxedArgb == null ? 0 : boxedArgb.intValue ());
}, "~S");
c$.colorTriadToFFRGB = Clazz_defineMethod (c$, "colorTriadToFFRGB", 
function (x, y, z) {
if (x <= 1 && y <= 1 && z <= 1) {
if (x > 0) x = x * 256 - 1;
if (y > 0) y = y * 256 - 1;
if (z > 0) z = z * 256 - 1;
}return JU.CU.rgb (Clazz_floatToInt (x), Clazz_floatToInt (y), Clazz_floatToInt (z));
}, "~N,~N,~N");
c$.rgb = Clazz_defineMethod (c$, "rgb", 
function (red, grn, blu) {
return 0xFF000000 | (red << 16) | (grn << 8) | blu;
}, "~N,~N,~N");
c$.colorPtFromString = Clazz_defineMethod (c$, "colorPtFromString", 
function (colorName) {
return JU.CU.colorPtFromInt (JU.CU.getArgbFromString (colorName), null);
}, "~S");
c$.colorPtFromInt = Clazz_defineMethod (c$, "colorPtFromInt", 
function (color, pt) {
if (pt == null) pt =  new JU.P3 ();
pt.set ((color >> 16) & 0xFF, (color >> 8) & 0xFF, color & 0xFF);
return pt;
}, "~N,JU.P3");
c$.colorPtToFFRGB = Clazz_defineMethod (c$, "colorPtToFFRGB", 
function (pt) {
return JU.CU.colorTriadToFFRGB (pt.x, pt.y, pt.z);
}, "JU.T3");
c$.toRGB3f = Clazz_defineMethod (c$, "toRGB3f", 
function (c, f) {
f[0] = ((c >> 16) & 0xFF) / 255;
f[1] = ((c >> 8) & 0xFF) / 255;
f[2] = (c & 0xFF) / 255;
}, "~N,~A");
c$.toFFGGGfromRGB = Clazz_defineMethod (c$, "toFFGGGfromRGB", 
function (rgb) {
var grey = (Clazz_doubleToInt (((2989 * ((rgb >> 16) & 0xFF)) + (5870 * ((rgb >> 8) & 0xFF)) + (1140 * (rgb & 0xFF)) + 5000) / 10000)) & 0xFFFFFF;
return JU.CU.rgb (grey, grey, grey);
}, "~N");
c$.rgbToHSL = Clazz_defineMethod (c$, "rgbToHSL", 
function (rgb, doRound) {
var r = rgb.x / 255;
var g = rgb.y / 255;
var b = rgb.z / 255;
var min = Math.min (r, Math.min (g, b));
var max = Math.max (r, Math.max (g, b));
var p = (max + min);
var q = (max - min);
var h = (60 * ((q == 0 ? 0 : max == r ? ((g - b) / q + 6) : max == g ? (b - r) / q + 2 : (r - g) / q + 4))) % 360;
var s = q / (q == 0 ? 1 : p <= 1 ? p : 2 - p);
return (doRound ? JU.P3.new3 (Math.round (h * 10) / 10, Math.round (s * 1000) / 10, Math.round (p * 500) / 10) : JU.P3.new3 (h, s * 100, p * 50));
}, "JU.P3,~B");
c$.hslToRGB = Clazz_defineMethod (c$, "hslToRGB", 
function (hsl) {
var h = Math.max (0, Math.min (360, hsl.x)) / 60;
var s = Math.max (0, Math.min (100, hsl.y)) / 100;
var l = Math.max (0, Math.min (100, hsl.z)) / 100;
var p = l - (l < 0.5 ? l : 1 - l) * s;
var q = 2 * (l - p);
var r = JU.CU.toRGB (p, q, h + 2);
var g = JU.CU.toRGB (p, q, h);
var b = JU.CU.toRGB (p, q, h - 2);
return JU.P3.new3 (Math.round (r * 255), Math.round (g * 255), Math.round (b * 255));
}, "JU.P3");
c$.toRGB = Clazz_defineMethod (c$, "toRGB", 
 function (p, q, h) {
return ((h = (h + (h < 0 ? 6 : h > 6 ? -6 : 0))) < 1 ? p + q * h : h < 3 ? p + q : h < 4 ? p + q * (4 - h) : p);
}, "~N,~N,~N");
Clazz_defineStatics (c$,
"colorNames",  Clazz_newArray (-1, ["black", "pewhite", "pecyan", "pepurple", "pegreen", "peblue", "peviolet", "pebrown", "pepink", "peyellow", "pedarkgreen", "peorange", "pelightblue", "pedarkcyan", "pedarkgray", "aliceblue", "antiquewhite", "aqua", "aquamarine", "azure", "beige", "bisque", "blanchedalmond", "blue", "blueviolet", "brown", "burlywood", "cadetblue", "chartreuse", "chocolate", "coral", "cornflowerblue", "cornsilk", "crimson", "cyan", "darkblue", "darkcyan", "darkgoldenrod", "darkgray", "darkgreen", "darkkhaki", "darkmagenta", "darkolivegreen", "darkorange", "darkorchid", "darkred", "darksalmon", "darkseagreen", "darkslateblue", "darkslategray", "darkturquoise", "darkviolet", "deeppink", "deepskyblue", "dimgray", "dodgerblue", "firebrick", "floralwhite", "forestgreen", "fuchsia", "gainsboro", "ghostwhite", "gold", "goldenrod", "gray", "green", "greenyellow", "honeydew", "hotpink", "indianred", "indigo", "ivory", "khaki", "lavender", "lavenderblush", "lawngreen", "lemonchiffon", "lightblue", "lightcoral", "lightcyan", "lightgoldenrodyellow", "lightgreen", "lightgrey", "lightgray", "lightpink", "lightsalmon", "lightseagreen", "lightskyblue", "lightslategray", "lightsteelblue", "lightyellow", "lime", "limegreen", "linen", "magenta", "maroon", "mediumaquamarine", "mediumblue", "mediumorchid", "mediumpurple", "mediumseagreen", "mediumslateblue", "mediumspringgreen", "mediumturquoise", "mediumvioletred", "midnightblue", "mintcream", "mistyrose", "moccasin", "navajowhite", "navy", "oldlace", "olive", "olivedrab", "orange", "orangered", "orchid", "palegoldenrod", "palegreen", "paleturquoise", "palevioletred", "papayawhip", "peachpuff", "peru", "pink", "plum", "powderblue", "purple", "red", "rosybrown", "royalblue", "saddlebrown", "salmon", "sandybrown", "seagreen", "seashell", "sienna", "silver", "skyblue", "slateblue", "slategray", "snow", "springgreen", "steelblue", "tan", "teal", "thistle", "tomato", "turquoise", "violet", "wheat", "white", "whitesmoke", "yellow", "yellowgreen", "bluetint", "greenblue", "greentint", "grey", "gray", "pinktint", "redorange", "yellowtint"]),
"colorArgbs",  Clazz_newIntArray (-1, [0xFF000000, 0xFFffffff, 0xFF00ffff, 0xFFd020ff, 0xFF00ff00, 0xFF6060ff, 0xFFff80c0, 0xFFa42028, 0xFFffd8d8, 0xFFffff00, 0xFF00c000, 0xFFffb000, 0xFFb0b0ff, 0xFF00a0a0, 0xFF606060, 0xFFF0F8FF, 0xFFFAEBD7, 0xFF00FFFF, 0xFF7FFFD4, 0xFFF0FFFF, 0xFFF5F5DC, 0xFFFFE4C4, 0xFFFFEBCD, 0xFF0000FF, 0xFF8A2BE2, 0xFFA52A2A, 0xFFDEB887, 0xFF5F9EA0, 0xFF7FFF00, 0xFFD2691E, 0xFFFF7F50, 0xFF6495ED, 0xFFFFF8DC, 0xFFDC143C, 0xFF00FFFF, 0xFF00008B, 0xFF008B8B, 0xFFB8860B, 0xFFA9A9A9, 0xFF006400, 0xFFBDB76B, 0xFF8B008B, 0xFF556B2F, 0xFFFF8C00, 0xFF9932CC, 0xFF8B0000, 0xFFE9967A, 0xFF8FBC8F, 0xFF483D8B, 0xFF2F4F4F, 0xFF00CED1, 0xFF9400D3, 0xFFFF1493, 0xFF00BFFF, 0xFF696969, 0xFF1E90FF, 0xFFB22222, 0xFFFFFAF0, 0xFF228B22, 0xFFFF00FF, 0xFFDCDCDC, 0xFFF8F8FF, 0xFFFFD700, 0xFFDAA520, 0xFF808080, 0xFF008000, 0xFFADFF2F, 0xFFF0FFF0, 0xFFFF69B4, 0xFFCD5C5C, 0xFF4B0082, 0xFFFFFFF0, 0xFFF0E68C, 0xFFE6E6FA, 0xFFFFF0F5, 0xFF7CFC00, 0xFFFFFACD, 0xFFADD8E6, 0xFFF08080, 0xFFE0FFFF, 0xFFFAFAD2, 0xFF90EE90, 0xFFD3D3D3, 0xFFD3D3D3, 0xFFFFB6C1, 0xFFFFA07A, 0xFF20B2AA, 0xFF87CEFA, 0xFF778899, 0xFFB0C4DE, 0xFFFFFFE0, 0xFF00FF00, 0xFF32CD32, 0xFFFAF0E6, 0xFFFF00FF, 0xFF800000, 0xFF66CDAA, 0xFF0000CD, 0xFFBA55D3, 0xFF9370DB, 0xFF3CB371, 0xFF7B68EE, 0xFF00FA9A, 0xFF48D1CC, 0xFFC71585, 0xFF191970, 0xFFF5FFFA, 0xFFFFE4E1, 0xFFFFE4B5, 0xFFFFDEAD, 0xFF000080, 0xFFFDF5E6, 0xFF808000, 0xFF6B8E23, 0xFFFFA500, 0xFFFF4500, 0xFFDA70D6, 0xFFEEE8AA, 0xFF98FB98, 0xFFAFEEEE, 0xFFDB7093, 0xFFFFEFD5, 0xFFFFDAB9, 0xFFCD853F, 0xFFFFC0CB, 0xFFDDA0DD, 0xFFB0E0E6, 0xFF800080, 0xFFFF0000, 0xFFBC8F8F, 0xFF4169E1, 0xFF8B4513, 0xFFFA8072, 0xFFF4A460, 0xFF2E8B57, 0xFFFFF5EE, 0xFFA0522D, 0xFFC0C0C0, 0xFF87CEEB, 0xFF6A5ACD, 0xFF708090, 0xFFFFFAFA, 0xFF00FF7F, 0xFF4682B4, 0xFFD2B48C, 0xFF008080, 0xFFD8BFD8, 0xFFFF6347, 0xFF40E0D0, 0xFFEE82EE, 0xFFF5DEB3, 0xFFFFFFFF, 0xFFF5F5F5, 0xFFFFFF00, 0xFF9ACD32, 0xFFAFD7FF, 0xFF2E8B57, 0xFF98FFB3, 0xFF808080, 0xFF808080, 0xFFFFABBB, 0xFFFF4500, 0xFFF6F675]));
c$.mapJavaScriptColors = c$.prototype.mapJavaScriptColors =  new java.util.Hashtable ();
{
for (var i = JU.CU.colorNames.length; --i >= 0; ) JU.CU.mapJavaScriptColors.put (JU.CU.colorNames[i], Integer.$valueOf (JU.CU.colorArgbs[i]));

}});
Clazz_declarePackage ("JU");
Clazz_load (["java.lang.Boolean"], "JU.DF", ["java.lang.Double", "$.Float", "JU.PT", "$.SB"], function () {
c$ = Clazz_declareType (JU, "DF");
c$.setUseNumberLocalization = Clazz_defineMethod (c$, "setUseNumberLocalization", 
function (TF) {
JU.DF.useNumberLocalization[0] = (TF ? Boolean.TRUE : Boolean.FALSE);
}, "~B");
c$.formatDecimalDbl = Clazz_defineMethod (c$, "formatDecimalDbl", 
function (value, decimalDigits) {
if (decimalDigits == 2147483647 || value == -Infinity || value == Infinity || Double.isNaN (value)) return "" + value;
return JU.DF.formatDecimal (value, decimalDigits);
}, "~N,~N");
c$.formatDecimal = Clazz_defineMethod (c$, "formatDecimal", 
function (value, decimalDigits) {
if (decimalDigits == 2147483647 || value == -Infinity || value == Infinity || Float.isNaN (value)) return "" + value;
var n;
if (decimalDigits < 0) {
decimalDigits = -decimalDigits;
if (decimalDigits > JU.DF.formattingStrings.length) decimalDigits = JU.DF.formattingStrings.length;
if (value == 0) return JU.DF.formattingStrings[decimalDigits - 1] + "E+0";
n = 0;
var d;
if (Math.abs (value) < 1) {
n = 10;
d = value * 1e-10;
} else {
n = -10;
d = value * 1e10;
}var s = ("" + d).toUpperCase ();
var i = s.indexOf ("E");
n = JU.PT.parseInt (s.substring (i + 1)) + n;
var sf;
if (i < 0) {
sf = "" + value;
} else {
var f = JU.PT.parseFloat (s.substring (0, i));
if (f == 10 || f == -10) {
f /= 10;
n += (n < 0 ? 1 : -1);
}sf = JU.DF.formatDecimal (f, decimalDigits - 1);
}return sf + "E" + (n >= 0 ? "+" : "") + n;
}if (decimalDigits >= JU.DF.formattingStrings.length) decimalDigits = JU.DF.formattingStrings.length - 1;
var s1 = ("" + value).toUpperCase ();
var pt = s1.indexOf (".");
if (pt < 0) return s1 + JU.DF.formattingStrings[decimalDigits].substring (1);
var isNeg = s1.startsWith ("-");
if (isNeg) {
s1 = s1.substring (1);
pt--;
}var pt1 = s1.indexOf ("E-");
if (pt1 > 0) {
n = JU.PT.parseInt (s1.substring (pt1 + 1));
s1 = "0." + "0000000000000000000000000000000000000000".substring (0, -n - 1) + s1.substring (0, 1) + s1.substring (2, pt1);
pt = 1;
}pt1 = s1.indexOf ("E");
if (pt1 > 0) {
n = JU.PT.parseInt (s1.substring (pt1 + 1));
s1 = s1.substring (0, 1) + s1.substring (2, pt1) + "0000000000000000000000000000000000000000";
s1 = s1.substring (0, n + 1) + "." + s1.substring (n + 1);
pt = s1.indexOf (".");
}var len = s1.length;
var pt2 = decimalDigits + pt + 1;
if (pt2 < len && s1.charAt (pt2) >= '5') {
return JU.DF.formatDecimal (value + (isNeg ? -1 : 1) * JU.DF.formatAdds[decimalDigits], decimalDigits);
}var s0 = s1.substring (0, (decimalDigits == 0 ? pt : ++pt));
var sb = JU.SB.newS (s0);
if (isNeg && s0.equals ("0.") && decimalDigits + 2 <= len && s1.substring (2, 2 + decimalDigits).equals ("0000000000000000000000000000000000000000".substring (0, decimalDigits))) isNeg = false;
for (var i = 0; i < decimalDigits; i++, pt++) {
if (pt < len) sb.appendC (s1.charAt (pt));
 else sb.appendC ('0');
}
s1 = (isNeg ? "-" : "") + sb;
return (Boolean.TRUE.equals (JU.DF.useNumberLocalization[0]) ? s1 : s1.$replace (',', '.'));
}, "~N,~N");
c$.formatDecimalTrimmed = Clazz_defineMethod (c$, "formatDecimalTrimmed", 
function (x, precision) {
var str = JU.DF.formatDecimalDbl (x, precision);
var m = str.length - 1;
var zero = '0';
while (m >= 0 && str.charAt (m) == zero) m--;

return str.substring (0, m + 1);
}, "~N,~N");
Clazz_defineStatics (c$,
"formattingStrings",  Clazz_newArray (-1, ["0", "0.0", "0.00", "0.000", "0.0000", "0.00000", "0.000000", "0.0000000", "0.00000000", "0.000000000"]),
"zeros", "0000000000000000000000000000000000000000",
"formatAdds",  Clazz_newFloatArray (-1, [0.5, 0.05, 0.005, 0.0005, 0.00005, 0.000005, 0.0000005, 0.00000005, 0.000000005, 0.0000000005]));
c$.useNumberLocalization = c$.prototype.useNumberLocalization =  Clazz_newArray (-1, [Boolean.TRUE]);
});
Clazz_declarePackage ("JU");
Clazz_load (["java.lang.Enum"], "JU.Encoding", null, function () {
c$ = Clazz_declareType (JU, "Encoding", Enum);
Clazz_defineEnumConstant (c$, "NONE", 0, []);
Clazz_defineEnumConstant (c$, "UTF8", 1, []);
Clazz_defineEnumConstant (c$, "UTF_16BE", 2, []);
Clazz_defineEnumConstant (c$, "UTF_16LE", 3, []);
Clazz_defineEnumConstant (c$, "UTF_32BE", 4, []);
Clazz_defineEnumConstant (c$, "UTF_32LE", 5, []);
});
Clazz_declarePackage ("JU");
Clazz_load (["java.util.ArrayList"], "JU.Lst", null, function () {
c$ = Clazz_declareType (JU, "Lst", java.util.ArrayList);
Clazz_defineMethod (c$, "addLast", 
function (v) {
{
return this.add1(v);
}}, "~O");
Clazz_defineMethod (c$, "removeItemAt", 
function (location) {
{
return this._removeItemAt(location);
}}, "~N");
Clazz_defineMethod (c$, "removeObj", 
function (v) {
{
return this._removeObject(v);
}}, "~O");
});
Clazz_declarePackage ("JU");
Clazz_load (null, "JU.M34", ["java.lang.ArrayIndexOutOfBoundsException"], function () {
c$ = Clazz_decorateAsClass (function () {
this.m00 = 0;
this.m01 = 0;
this.m02 = 0;
this.m10 = 0;
this.m11 = 0;
this.m12 = 0;
this.m20 = 0;
this.m21 = 0;
this.m22 = 0;
Clazz_instantialize (this, arguments);
}, JU, "M34");
Clazz_defineMethod (c$, "setAA33", 
function (a) {
var x = a.x;
var y = a.y;
var z = a.z;
var angle = a.angle;
var n = Math.sqrt (x * x + y * y + z * z);
n = 1 / n;
x *= n;
y *= n;
z *= n;
var c = Math.cos (angle);
var s = Math.sin (angle);
var omc = 1.0 - c;
this.m00 = (c + x * x * omc);
this.m11 = (c + y * y * omc);
this.m22 = (c + z * z * omc);
var tmp1 = x * y * omc;
var tmp2 = z * s;
this.m01 = (tmp1 - tmp2);
this.m10 = (tmp1 + tmp2);
tmp1 = x * z * omc;
tmp2 = y * s;
this.m02 = (tmp1 + tmp2);
this.m20 = (tmp1 - tmp2);
tmp1 = y * z * omc;
tmp2 = x * s;
this.m12 = (tmp1 - tmp2);
this.m21 = (tmp1 + tmp2);
}, "JU.A4");
Clazz_defineMethod (c$, "rotate", 
function (t) {
this.rotate2 (t, t);
}, "JU.T3");
Clazz_defineMethod (c$, "rotate2", 
function (t, result) {
result.set (this.m00 * t.x + this.m01 * t.y + this.m02 * t.z, this.m10 * t.x + this.m11 * t.y + this.m12 * t.z, this.m20 * t.x + this.m21 * t.y + this.m22 * t.z);
}, "JU.T3,JU.T3");
Clazz_defineMethod (c$, "setM33", 
function (m1) {
this.m00 = m1.m00;
this.m01 = m1.m01;
this.m02 = m1.m02;
this.m10 = m1.m10;
this.m11 = m1.m11;
this.m12 = m1.m12;
this.m20 = m1.m20;
this.m21 = m1.m21;
this.m22 = m1.m22;
}, "JU.M34");
Clazz_defineMethod (c$, "clear33", 
function () {
this.m00 = this.m01 = this.m02 = this.m10 = this.m11 = this.m12 = this.m20 = this.m21 = this.m22 = 0.0;
});
Clazz_defineMethod (c$, "set33", 
function (row, col, v) {
switch (row) {
case 0:
switch (col) {
case 0:
this.m00 = v;
return;
case 1:
this.m01 = v;
return;
case 2:
this.m02 = v;
return;
}
break;
case 1:
switch (col) {
case 0:
this.m10 = v;
return;
case 1:
this.m11 = v;
return;
case 2:
this.m12 = v;
return;
}
break;
case 2:
switch (col) {
case 0:
this.m20 = v;
return;
case 1:
this.m21 = v;
return;
case 2:
this.m22 = v;
return;
}
break;
}
this.err ();
}, "~N,~N,~N");
Clazz_defineMethod (c$, "get33", 
function (row, col) {
switch (row) {
case 0:
switch (col) {
case 0:
return this.m00;
case 1:
return this.m01;
case 2:
return this.m02;
}
break;
case 1:
switch (col) {
case 0:
return this.m10;
case 1:
return this.m11;
case 2:
return this.m12;
}
break;
case 2:
switch (col) {
case 0:
return this.m20;
case 1:
return this.m21;
case 2:
return this.m22;
}
break;
}
this.err ();
return 0;
}, "~N,~N");
Clazz_defineMethod (c$, "setRow33", 
function (row, v) {
switch (row) {
case 0:
this.m00 = v[0];
this.m01 = v[1];
this.m02 = v[2];
return;
case 1:
this.m10 = v[0];
this.m11 = v[1];
this.m12 = v[2];
return;
case 2:
this.m20 = v[0];
this.m21 = v[1];
this.m22 = v[2];
return;
default:
this.err ();
}
}, "~N,~A");
Clazz_defineMethod (c$, "getRow33", 
function (row, v) {
switch (row) {
case 0:
v[0] = this.m00;
v[1] = this.m01;
v[2] = this.m02;
return;
case 1:
v[0] = this.m10;
v[1] = this.m11;
v[2] = this.m12;
return;
case 2:
v[0] = this.m20;
v[1] = this.m21;
v[2] = this.m22;
return;
}
this.err ();
}, "~N,~A");
Clazz_defineMethod (c$, "setColumn33", 
function (column, v) {
switch (column) {
case 0:
this.m00 = v[0];
this.m10 = v[1];
this.m20 = v[2];
break;
case 1:
this.m01 = v[0];
this.m11 = v[1];
this.m21 = v[2];
break;
case 2:
this.m02 = v[0];
this.m12 = v[1];
this.m22 = v[2];
break;
default:
this.err ();
}
}, "~N,~A");
Clazz_defineMethod (c$, "getColumn33", 
function (column, v) {
switch (column) {
case 0:
v[0] = this.m00;
v[1] = this.m10;
v[2] = this.m20;
break;
case 1:
v[0] = this.m01;
v[1] = this.m11;
v[2] = this.m21;
break;
case 2:
v[0] = this.m02;
v[1] = this.m12;
v[2] = this.m22;
break;
default:
this.err ();
}
}, "~N,~A");
Clazz_defineMethod (c$, "add33", 
function (m1) {
this.m00 += m1.m00;
this.m01 += m1.m01;
this.m02 += m1.m02;
this.m10 += m1.m10;
this.m11 += m1.m11;
this.m12 += m1.m12;
this.m20 += m1.m20;
this.m21 += m1.m21;
this.m22 += m1.m22;
}, "JU.M34");
Clazz_defineMethod (c$, "sub33", 
function (m1) {
this.m00 -= m1.m00;
this.m01 -= m1.m01;
this.m02 -= m1.m02;
this.m10 -= m1.m10;
this.m11 -= m1.m11;
this.m12 -= m1.m12;
this.m20 -= m1.m20;
this.m21 -= m1.m21;
this.m22 -= m1.m22;
}, "JU.M34");
Clazz_defineMethod (c$, "mul33", 
function (x) {
this.m00 *= x;
this.m01 *= x;
this.m02 *= x;
this.m10 *= x;
this.m11 *= x;
this.m12 *= x;
this.m20 *= x;
this.m21 *= x;
this.m22 *= x;
}, "~N");
Clazz_defineMethod (c$, "transpose33", 
function () {
var tmp = this.m01;
this.m01 = this.m10;
this.m10 = tmp;
tmp = this.m02;
this.m02 = this.m20;
this.m20 = tmp;
tmp = this.m12;
this.m12 = this.m21;
this.m21 = tmp;
});
Clazz_defineMethod (c$, "setXRot", 
function (angle) {
var c = Math.cos (angle);
var s = Math.sin (angle);
this.m00 = 1.0;
this.m01 = 0.0;
this.m02 = 0.0;
this.m10 = 0.0;
this.m11 = c;
this.m12 = -s;
this.m20 = 0.0;
this.m21 = s;
this.m22 = c;
}, "~N");
Clazz_defineMethod (c$, "setYRot", 
function (angle) {
var c = Math.cos (angle);
var s = Math.sin (angle);
this.m00 = c;
this.m01 = 0.0;
this.m02 = s;
this.m10 = 0.0;
this.m11 = 1.0;
this.m12 = 0.0;
this.m20 = -s;
this.m21 = 0.0;
this.m22 = c;
}, "~N");
Clazz_defineMethod (c$, "setZRot", 
function (angle) {
var c = Math.cos (angle);
var s = Math.sin (angle);
this.m00 = c;
this.m01 = -s;
this.m02 = 0.0;
this.m10 = s;
this.m11 = c;
this.m12 = 0.0;
this.m20 = 0.0;
this.m21 = 0.0;
this.m22 = 1.0;
}, "~N");
Clazz_defineMethod (c$, "determinant3", 
function () {
return this.m00 * (this.m11 * this.m22 - this.m21 * this.m12) - this.m01 * (this.m10 * this.m22 - this.m20 * this.m12) + this.m02 * (this.m10 * this.m21 - this.m20 * this.m11);
});
Clazz_defineMethod (c$, "err", 
function () {
throw  new ArrayIndexOutOfBoundsException ("matrix column/row out of bounds");
});
});
Clazz_declarePackage ("JU");
Clazz_load (["JU.M34"], "JU.M3", ["JU.T3"], function () {
c$ = Clazz_declareType (JU, "M3", JU.M34, java.io.Serializable);
c$.newA9 = Clazz_defineMethod (c$, "newA9", 
function (v) {
var m =  new JU.M3 ();
m.setA (v);
return m;
}, "~A");
c$.newM3 = Clazz_defineMethod (c$, "newM3", 
function (m1) {
var m =  new JU.M3 ();
if (m1 == null) {
m.setScale (1);
return m;
}m.m00 = m1.m00;
m.m01 = m1.m01;
m.m02 = m1.m02;
m.m10 = m1.m10;
m.m11 = m1.m11;
m.m12 = m1.m12;
m.m20 = m1.m20;
m.m21 = m1.m21;
m.m22 = m1.m22;
return m;
}, "JU.M3");
Clazz_defineMethod (c$, "setScale", 
function (scale) {
this.clear33 ();
this.m00 = this.m11 = this.m22 = scale;
}, "~N");
Clazz_defineMethod (c$, "setM3", 
function (m1) {
this.setM33 (m1);
}, "JU.M34");
Clazz_defineMethod (c$, "setA", 
function (m) {
this.m00 = m[0];
this.m01 = m[1];
this.m02 = m[2];
this.m10 = m[3];
this.m11 = m[4];
this.m12 = m[5];
this.m20 = m[6];
this.m21 = m[7];
this.m22 = m[8];
}, "~A");
Clazz_defineMethod (c$, "setElement", 
function (row, col, v) {
this.set33 (row, col, v);
}, "~N,~N,~N");
Clazz_defineMethod (c$, "getElement", 
function (row, col) {
return this.get33 (row, col);
}, "~N,~N");
Clazz_defineMethod (c$, "setRow", 
function (row, x, y, z) {
switch (row) {
case 0:
this.m00 = x;
this.m01 = y;
this.m02 = z;
return;
case 1:
this.m10 = x;
this.m11 = y;
this.m12 = z;
return;
case 2:
this.m20 = x;
this.m21 = y;
this.m22 = z;
return;
default:
this.err ();
}
}, "~N,~N,~N,~N");
Clazz_defineMethod (c$, "setRowV", 
function (row, v) {
switch (row) {
case 0:
this.m00 = v.x;
this.m01 = v.y;
this.m02 = v.z;
return;
case 1:
this.m10 = v.x;
this.m11 = v.y;
this.m12 = v.z;
return;
case 2:
this.m20 = v.x;
this.m21 = v.y;
this.m22 = v.z;
return;
default:
this.err ();
}
}, "~N,JU.T3");
Clazz_defineMethod (c$, "setRowA", 
function (row, v) {
this.setRow33 (row, v);
}, "~N,~A");
Clazz_overrideMethod (c$, "getRow", 
function (row, v) {
this.getRow33 (row, v);
}, "~N,~A");
Clazz_defineMethod (c$, "setColumn3", 
function (column, x, y, z) {
switch (column) {
case 0:
this.m00 = x;
this.m10 = y;
this.m20 = z;
break;
case 1:
this.m01 = x;
this.m11 = y;
this.m21 = z;
break;
case 2:
this.m02 = x;
this.m12 = y;
this.m22 = z;
break;
default:
this.err ();
}
}, "~N,~N,~N,~N");
Clazz_defineMethod (c$, "setColumnV", 
function (column, v) {
switch (column) {
case 0:
this.m00 = v.x;
this.m10 = v.y;
this.m20 = v.z;
break;
case 1:
this.m01 = v.x;
this.m11 = v.y;
this.m21 = v.z;
break;
case 2:
this.m02 = v.x;
this.m12 = v.y;
this.m22 = v.z;
break;
default:
this.err ();
}
}, "~N,JU.T3");
Clazz_defineMethod (c$, "getColumnV", 
function (column, v) {
switch (column) {
case 0:
v.x = this.m00;
v.y = this.m10;
v.z = this.m20;
break;
case 1:
v.x = this.m01;
v.y = this.m11;
v.z = this.m21;
break;
case 2:
v.x = this.m02;
v.y = this.m12;
v.z = this.m22;
break;
default:
this.err ();
}
}, "~N,JU.T3");
Clazz_defineMethod (c$, "setColumnA", 
function (column, v) {
this.setColumn33 (column, v);
}, "~N,~A");
Clazz_defineMethod (c$, "getColumn", 
function (column, v) {
this.getColumn33 (column, v);
}, "~N,~A");
Clazz_defineMethod (c$, "add", 
function (m1) {
this.add33 (m1);
}, "JU.M3");
Clazz_defineMethod (c$, "sub", 
function (m1) {
this.sub33 (m1);
}, "JU.M3");
Clazz_defineMethod (c$, "transpose", 
function () {
this.transpose33 ();
});
Clazz_defineMethod (c$, "transposeM", 
function (m1) {
this.setM33 (m1);
this.transpose33 ();
}, "JU.M3");
Clazz_defineMethod (c$, "invertM", 
function (m1) {
this.setM33 (m1);
this.invert ();
}, "JU.M3");
Clazz_defineMethod (c$, "invert", 
function () {
var s = this.determinant3 ();
if (s == 0.0) return;
s = 1 / s;
this.set9 (this.m11 * this.m22 - this.m12 * this.m21, this.m02 * this.m21 - this.m01 * this.m22, this.m01 * this.m12 - this.m02 * this.m11, this.m12 * this.m20 - this.m10 * this.m22, this.m00 * this.m22 - this.m02 * this.m20, this.m02 * this.m10 - this.m00 * this.m12, this.m10 * this.m21 - this.m11 * this.m20, this.m01 * this.m20 - this.m00 * this.m21, this.m00 * this.m11 - this.m01 * this.m10);
this.scale (s);
});
Clazz_defineMethod (c$, "setAsXRotation", 
function (angle) {
this.setXRot (angle);
return this;
}, "~N");
Clazz_defineMethod (c$, "setAsYRotation", 
function (angle) {
this.setYRot (angle);
return this;
}, "~N");
Clazz_defineMethod (c$, "setAsZRotation", 
function (angle) {
this.setZRot (angle);
return this;
}, "~N");
Clazz_defineMethod (c$, "scale", 
function (scalar) {
this.mul33 (scalar);
}, "~N");
Clazz_defineMethod (c$, "mul", 
function (m1) {
this.mul2 (this, m1);
}, "JU.M3");
Clazz_defineMethod (c$, "mul2", 
function (m1, m2) {
this.set9 (m1.m00 * m2.m00 + m1.m01 * m2.m10 + m1.m02 * m2.m20, m1.m00 * m2.m01 + m1.m01 * m2.m11 + m1.m02 * m2.m21, m1.m00 * m2.m02 + m1.m01 * m2.m12 + m1.m02 * m2.m22, m1.m10 * m2.m00 + m1.m11 * m2.m10 + m1.m12 * m2.m20, m1.m10 * m2.m01 + m1.m11 * m2.m11 + m1.m12 * m2.m21, m1.m10 * m2.m02 + m1.m11 * m2.m12 + m1.m12 * m2.m22, m1.m20 * m2.m00 + m1.m21 * m2.m10 + m1.m22 * m2.m20, m1.m20 * m2.m01 + m1.m21 * m2.m11 + m1.m22 * m2.m21, m1.m20 * m2.m02 + m1.m21 * m2.m12 + m1.m22 * m2.m22);
}, "JU.M3,JU.M3");
Clazz_overrideMethod (c$, "equals", 
function (o) {
if (!(Clazz_instanceOf (o, JU.M3))) return false;
var m = o;
return this.m00 == m.m00 && this.m01 == m.m01 && this.m02 == m.m02 && this.m10 == m.m10 && this.m11 == m.m11 && this.m12 == m.m12 && this.m20 == m.m20 && this.m21 == m.m21 && this.m22 == m.m22;
}, "~O");
Clazz_overrideMethod (c$, "hashCode", 
function () {
return JU.T3.floatToIntBits (this.m00) ^ JU.T3.floatToIntBits (this.m01) ^ JU.T3.floatToIntBits (this.m02) ^ JU.T3.floatToIntBits (this.m10) ^ JU.T3.floatToIntBits (this.m11) ^ JU.T3.floatToIntBits (this.m12) ^ JU.T3.floatToIntBits (this.m20) ^ JU.T3.floatToIntBits (this.m21) ^ JU.T3.floatToIntBits (this.m22);
});
Clazz_defineMethod (c$, "setZero", 
function () {
this.clear33 ();
});
Clazz_defineMethod (c$, "set9", 
 function (m00, m01, m02, m10, m11, m12, m20, m21, m22) {
this.m00 = m00;
this.m01 = m01;
this.m02 = m02;
this.m10 = m10;
this.m11 = m11;
this.m12 = m12;
this.m20 = m20;
this.m21 = m21;
this.m22 = m22;
}, "~N,~N,~N,~N,~N,~N,~N,~N,~N");
Clazz_overrideMethod (c$, "toString", 
function () {
return "[\n  [" + this.m00 + "\t" + this.m01 + "\t" + this.m02 + "]" + "\n  [" + this.m10 + "\t" + this.m11 + "\t" + this.m12 + "]" + "\n  [" + this.m20 + "\t" + this.m21 + "\t" + this.m22 + "] ]";
});
Clazz_defineMethod (c$, "setAA", 
function (a) {
this.setAA33 (a);
return this;
}, "JU.A4");
Clazz_defineMethod (c$, "setAsBallRotation", 
function (responseFactor, dx, dy) {
var r = Math.sqrt (dx * dx + dy * dy);
var th = r * responseFactor;
if (th == 0) {
this.setScale (1);
return false;
}var c = Math.cos (th);
var s = Math.sin (th);
var nx = -dy / r;
var ny = dx / r;
var c1 = c - 1;
this.m00 = 1 + c1 * nx * nx;
this.m01 = this.m10 = c1 * nx * ny;
this.m20 = -(this.m02 = s * nx);
this.m11 = 1 + c1 * ny * ny;
this.m21 = -(this.m12 = s * ny);
this.m22 = c;
return true;
}, "~N,~N,~N");
Clazz_defineMethod (c$, "isRotation", 
function () {
return (Math.abs (this.determinant3 () - 1) < 0.001);
});
});
Clazz_declarePackage ("JU");
Clazz_load (["JU.M34"], "JU.M4", ["JU.T3"], function () {
c$ = Clazz_decorateAsClass (function () {
this.m03 = 0;
this.m13 = 0;
this.m23 = 0;
this.m30 = 0;
this.m31 = 0;
this.m32 = 0;
this.m33 = 0;
Clazz_instantialize (this, arguments);
}, JU, "M4", JU.M34);
c$.newA16 = Clazz_defineMethod (c$, "newA16", 
function (v) {
var m =  new JU.M4 ();
m.m00 = v[0];
m.m01 = v[1];
m.m02 = v[2];
m.m03 = v[3];
m.m10 = v[4];
m.m11 = v[5];
m.m12 = v[6];
m.m13 = v[7];
m.m20 = v[8];
m.m21 = v[9];
m.m22 = v[10];
m.m23 = v[11];
m.m30 = v[12];
m.m31 = v[13];
m.m32 = v[14];
m.m33 = v[15];
return m;
}, "~A");
c$.newM4 = Clazz_defineMethod (c$, "newM4", 
function (m1) {
var m =  new JU.M4 ();
if (m1 == null) {
m.setIdentity ();
return m;
}m.setToM3 (m1);
m.m03 = m1.m03;
m.m13 = m1.m13;
m.m23 = m1.m23;
m.m30 = m1.m30;
m.m31 = m1.m31;
m.m32 = m1.m32;
m.m33 = m1.m33;
return m;
}, "JU.M4");
c$.newMV = Clazz_defineMethod (c$, "newMV", 
function (m1, t) {
var m =  new JU.M4 ();
m.setMV (m1, t);
return m;
}, "JU.M3,JU.T3");
Clazz_defineMethod (c$, "setZero", 
function () {
this.clear33 ();
this.m03 = this.m13 = this.m23 = this.m30 = this.m31 = this.m32 = this.m33 = 0.0;
});
Clazz_defineMethod (c$, "setIdentity", 
function () {
this.setZero ();
this.m00 = this.m11 = this.m22 = this.m33 = 1.0;
});
Clazz_defineMethod (c$, "setM4", 
function (m1) {
this.setM33 (m1);
this.m03 = m1.m03;
this.m13 = m1.m13;
this.m23 = m1.m23;
this.m30 = m1.m30;
this.m31 = m1.m31;
this.m32 = m1.m32;
this.m33 = m1.m33;
return this;
}, "JU.M4");
Clazz_defineMethod (c$, "setMV", 
function (m1, t) {
this.setM33 (m1);
this.setTranslation (t);
this.m33 = 1;
}, "JU.M3,JU.T3");
Clazz_defineMethod (c$, "setToM3", 
function (m1) {
this.setM33 (m1);
this.m03 = this.m13 = this.m23 = this.m30 = this.m31 = this.m32 = 0.0;
this.m33 = 1.0;
}, "JU.M34");
Clazz_defineMethod (c$, "setToAA", 
function (a) {
this.setIdentity ();
this.setAA33 (a);
}, "JU.A4");
Clazz_defineMethod (c$, "setA", 
function (m) {
this.m00 = m[0];
this.m01 = m[1];
this.m02 = m[2];
this.m03 = m[3];
this.m10 = m[4];
this.m11 = m[5];
this.m12 = m[6];
this.m13 = m[7];
this.m20 = m[8];
this.m21 = m[9];
this.m22 = m[10];
this.m23 = m[11];
this.m30 = m[12];
this.m31 = m[13];
this.m32 = m[14];
this.m33 = m[15];
}, "~A");
Clazz_defineMethod (c$, "setTranslation", 
function (trans) {
this.m03 = trans.x;
this.m13 = trans.y;
this.m23 = trans.z;
}, "JU.T3");
Clazz_defineMethod (c$, "setElement", 
function (row, col, v) {
if (row < 3 && col < 3) {
this.set33 (row, col, v);
return;
}if (row > 3 || col > 3) this.err ();
switch (row) {
case 0:
this.m03 = v;
return;
case 1:
this.m13 = v;
return;
case 2:
this.m23 = v;
return;
}
switch (col) {
case 0:
this.m30 = v;
return;
case 1:
this.m31 = v;
return;
case 2:
this.m32 = v;
return;
case 3:
this.m33 = v;
return;
}
}, "~N,~N,~N");
Clazz_defineMethod (c$, "getElement", 
function (row, col) {
if (row < 3 && col < 3) return this.get33 (row, col);
if (row > 3 || col > 3) {
this.err ();
return 0;
}switch (row) {
case 0:
return this.m03;
case 1:
return this.m13;
case 2:
return this.m23;
default:
switch (col) {
case 0:
return this.m30;
case 1:
return this.m31;
case 2:
return this.m32;
default:
return this.m33;
}
}
}, "~N,~N");
Clazz_defineMethod (c$, "getTranslation", 
function (trans) {
trans.x = this.m03;
trans.y = this.m13;
trans.z = this.m23;
}, "JU.T3");
Clazz_defineMethod (c$, "getRotationScale", 
function (m1) {
m1.m00 = this.m00;
m1.m01 = this.m01;
m1.m02 = this.m02;
m1.m10 = this.m10;
m1.m11 = this.m11;
m1.m12 = this.m12;
m1.m20 = this.m20;
m1.m21 = this.m21;
m1.m22 = this.m22;
}, "JU.M3");
Clazz_defineMethod (c$, "setRotationScale", 
function (m1) {
this.m00 = m1.m00;
this.m01 = m1.m01;
this.m02 = m1.m02;
this.m10 = m1.m10;
this.m11 = m1.m11;
this.m12 = m1.m12;
this.m20 = m1.m20;
this.m21 = m1.m21;
this.m22 = m1.m22;
}, "JU.M3");
Clazz_defineMethod (c$, "setRowA", 
function (row, v) {
if (row < 3) this.setRow33 (row, v);
switch (row) {
case 0:
this.m03 = v[3];
return;
case 1:
this.m13 = v[3];
return;
case 2:
this.m23 = v[3];
return;
case 3:
this.m30 = v[0];
this.m31 = v[1];
this.m32 = v[2];
this.m33 = v[3];
return;
}
this.err ();
}, "~N,~A");
Clazz_overrideMethod (c$, "getRow", 
function (row, v) {
if (row < 3) this.getRow33 (row, v);
switch (row) {
case 0:
v[3] = this.m03;
return;
case 1:
v[3] = this.m13;
return;
case 2:
v[3] = this.m23;
return;
case 3:
v[0] = this.m30;
v[1] = this.m31;
v[2] = this.m32;
v[3] = this.m33;
return;
}
this.err ();
}, "~N,~A");
Clazz_defineMethod (c$, "setColumn4", 
function (column, x, y, z, w) {
if (column == 0) {
this.m00 = x;
this.m10 = y;
this.m20 = z;
this.m30 = w;
} else if (column == 1) {
this.m01 = x;
this.m11 = y;
this.m21 = z;
this.m31 = w;
} else if (column == 2) {
this.m02 = x;
this.m12 = y;
this.m22 = z;
this.m32 = w;
} else if (column == 3) {
this.m03 = x;
this.m13 = y;
this.m23 = z;
this.m33 = w;
} else {
this.err ();
}}, "~N,~N,~N,~N,~N");
Clazz_defineMethod (c$, "setColumnA", 
function (column, v) {
if (column < 3) this.setColumn33 (column, v);
switch (column) {
case 0:
this.m30 = v[3];
return;
case 1:
this.m31 = v[3];
return;
case 2:
this.m32 = v[3];
return;
case 3:
this.m03 = v[0];
this.m13 = v[1];
this.m23 = v[2];
this.m33 = v[3];
return;
default:
this.err ();
}
}, "~N,~A");
Clazz_defineMethod (c$, "getColumn", 
function (column, v) {
if (column < 3) this.getColumn33 (column, v);
switch (column) {
case 0:
v[3] = this.m30;
return;
case 1:
v[3] = this.m31;
return;
case 2:
v[3] = this.m32;
return;
case 3:
v[0] = this.m03;
v[1] = this.m13;
v[2] = this.m23;
v[3] = this.m33;
return;
default:
this.err ();
}
}, "~N,~A");
Clazz_defineMethod (c$, "sub", 
function (m1) {
this.sub33 (m1);
this.m03 -= m1.m03;
this.m13 -= m1.m13;
this.m23 -= m1.m23;
this.m30 -= m1.m30;
this.m31 -= m1.m31;
this.m32 -= m1.m32;
this.m33 -= m1.m33;
}, "JU.M4");
Clazz_defineMethod (c$, "transpose", 
function () {
this.transpose33 ();
var tmp = this.m03;
this.m03 = this.m30;
this.m30 = tmp;
tmp = this.m13;
this.m13 = this.m31;
this.m31 = tmp;
tmp = this.m23;
this.m23 = this.m32;
this.m32 = tmp;
});
Clazz_defineMethod (c$, "invert", 
function () {
var s = this.determinant4 ();
if (s == 0.0) return this;
s = 1 / s;
this.set (this.m11 * (this.m22 * this.m33 - this.m23 * this.m32) + this.m12 * (this.m23 * this.m31 - this.m21 * this.m33) + this.m13 * (this.m21 * this.m32 - this.m22 * this.m31), this.m21 * (this.m02 * this.m33 - this.m03 * this.m32) + this.m22 * (this.m03 * this.m31 - this.m01 * this.m33) + this.m23 * (this.m01 * this.m32 - this.m02 * this.m31), this.m31 * (this.m02 * this.m13 - this.m03 * this.m12) + this.m32 * (this.m03 * this.m11 - this.m01 * this.m13) + this.m33 * (this.m01 * this.m12 - this.m02 * this.m11), this.m01 * (this.m13 * this.m22 - this.m12 * this.m23) + this.m02 * (this.m11 * this.m23 - this.m13 * this.m21) + this.m03 * (this.m12 * this.m21 - this.m11 * this.m22), this.m12 * (this.m20 * this.m33 - this.m23 * this.m30) + this.m13 * (this.m22 * this.m30 - this.m20 * this.m32) + this.m10 * (this.m23 * this.m32 - this.m22 * this.m33), this.m22 * (this.m00 * this.m33 - this.m03 * this.m30) + this.m23 * (this.m02 * this.m30 - this.m00 * this.m32) + this.m20 * (this.m03 * this.m32 - this.m02 * this.m33), this.m32 * (this.m00 * this.m13 - this.m03 * this.m10) + this.m33 * (this.m02 * this.m10 - this.m00 * this.m12) + this.m30 * (this.m03 * this.m12 - this.m02 * this.m13), this.m02 * (this.m13 * this.m20 - this.m10 * this.m23) + this.m03 * (this.m10 * this.m22 - this.m12 * this.m20) + this.m00 * (this.m12 * this.m23 - this.m13 * this.m22), this.m13 * (this.m20 * this.m31 - this.m21 * this.m30) + this.m10 * (this.m21 * this.m33 - this.m23 * this.m31) + this.m11 * (this.m23 * this.m30 - this.m20 * this.m33), this.m23 * (this.m00 * this.m31 - this.m01 * this.m30) + this.m20 * (this.m01 * this.m33 - this.m03 * this.m31) + this.m21 * (this.m03 * this.m30 - this.m00 * this.m33), this.m33 * (this.m00 * this.m11 - this.m01 * this.m10) + this.m30 * (this.m01 * this.m13 - this.m03 * this.m11) + this.m31 * (this.m03 * this.m10 - this.m00 * this.m13), this.m03 * (this.m11 * this.m20 - this.m10 * this.m21) + this.m00 * (this.m13 * this.m21 - this.m11 * this.m23) + this.m01 * (this.m10 * this.m23 - this.m13 * this.m20), this.m10 * (this.m22 * this.m31 - this.m21 * this.m32) + this.m11 * (this.m20 * this.m32 - this.m22 * this.m30) + this.m12 * (this.m21 * this.m30 - this.m20 * this.m31), this.m20 * (this.m02 * this.m31 - this.m01 * this.m32) + this.m21 * (this.m00 * this.m32 - this.m02 * this.m30) + this.m22 * (this.m01 * this.m30 - this.m00 * this.m31), this.m30 * (this.m02 * this.m11 - this.m01 * this.m12) + this.m31 * (this.m00 * this.m12 - this.m02 * this.m10) + this.m32 * (this.m01 * this.m10 - this.m00 * this.m11), this.m00 * (this.m11 * this.m22 - this.m12 * this.m21) + this.m01 * (this.m12 * this.m20 - this.m10 * this.m22) + this.m02 * (this.m10 * this.m21 - this.m11 * this.m20));
this.scale (s);
return this;
});
Clazz_defineMethod (c$, "set", 
 function (m00, m01, m02, m03, m10, m11, m12, m13, m20, m21, m22, m23, m30, m31, m32, m33) {
this.m00 = m00;
this.m01 = m01;
this.m02 = m02;
this.m03 = m03;
this.m10 = m10;
this.m11 = m11;
this.m12 = m12;
this.m13 = m13;
this.m20 = m20;
this.m21 = m21;
this.m22 = m22;
this.m23 = m23;
this.m30 = m30;
this.m31 = m31;
this.m32 = m32;
this.m33 = m33;
}, "~N,~N,~N,~N,~N,~N,~N,~N,~N,~N,~N,~N,~N,~N,~N,~N");
Clazz_defineMethod (c$, "determinant4", 
function () {
return (this.m00 * this.m11 - this.m01 * this.m10) * (this.m22 * this.m33 - this.m23 * this.m32) - (this.m00 * this.m12 - this.m02 * this.m10) * (this.m21 * this.m33 - this.m23 * this.m31) + (this.m00 * this.m13 - this.m03 * this.m10) * (this.m21 * this.m32 - this.m22 * this.m31) + (this.m01 * this.m12 - this.m02 * this.m11) * (this.m20 * this.m33 - this.m23 * this.m30) - (this.m01 * this.m13 - this.m03 * this.m11) * (this.m20 * this.m32 - this.m22 * this.m30) + (this.m02 * this.m13 - this.m03 * this.m12) * (this.m20 * this.m31 - this.m21 * this.m30);
});
Clazz_defineMethod (c$, "scale", 
function (scalar) {
this.mul33 (scalar);
this.m03 *= scalar;
this.m13 *= scalar;
this.m23 *= scalar;
this.m30 *= scalar;
this.m31 *= scalar;
this.m32 *= scalar;
this.m33 *= scalar;
}, "~N");
Clazz_defineMethod (c$, "mul", 
function (m1) {
this.mul2 (this, m1);
}, "JU.M4");
Clazz_defineMethod (c$, "mul2", 
function (m1, m2) {
this.set (m1.m00 * m2.m00 + m1.m01 * m2.m10 + m1.m02 * m2.m20 + m1.m03 * m2.m30, m1.m00 * m2.m01 + m1.m01 * m2.m11 + m1.m02 * m2.m21 + m1.m03 * m2.m31, m1.m00 * m2.m02 + m1.m01 * m2.m12 + m1.m02 * m2.m22 + m1.m03 * m2.m32, m1.m00 * m2.m03 + m1.m01 * m2.m13 + m1.m02 * m2.m23 + m1.m03 * m2.m33, m1.m10 * m2.m00 + m1.m11 * m2.m10 + m1.m12 * m2.m20 + m1.m13 * m2.m30, m1.m10 * m2.m01 + m1.m11 * m2.m11 + m1.m12 * m2.m21 + m1.m13 * m2.m31, m1.m10 * m2.m02 + m1.m11 * m2.m12 + m1.m12 * m2.m22 + m1.m13 * m2.m32, m1.m10 * m2.m03 + m1.m11 * m2.m13 + m1.m12 * m2.m23 + m1.m13 * m2.m33, m1.m20 * m2.m00 + m1.m21 * m2.m10 + m1.m22 * m2.m20 + m1.m23 * m2.m30, m1.m20 * m2.m01 + m1.m21 * m2.m11 + m1.m22 * m2.m21 + m1.m23 * m2.m31, m1.m20 * m2.m02 + m1.m21 * m2.m12 + m1.m22 * m2.m22 + m1.m23 * m2.m32, m1.m20 * m2.m03 + m1.m21 * m2.m13 + m1.m22 * m2.m23 + m1.m23 * m2.m33, m1.m30 * m2.m00 + m1.m31 * m2.m10 + m1.m32 * m2.m20 + m1.m33 * m2.m30, m1.m30 * m2.m01 + m1.m31 * m2.m11 + m1.m32 * m2.m21 + m1.m33 * m2.m31, m1.m30 * m2.m02 + m1.m31 * m2.m12 + m1.m32 * m2.m22 + m1.m33 * m2.m32, m1.m30 * m2.m03 + m1.m31 * m2.m13 + m1.m32 * m2.m23 + m1.m33 * m2.m33);
}, "JU.M4,JU.M4");
Clazz_defineMethod (c$, "transform", 
function (vec) {
this.transform2 (vec, vec);
}, "JU.T4");
Clazz_defineMethod (c$, "transform2", 
function (vec, vecOut) {
vecOut.set4 (this.m00 * vec.x + this.m01 * vec.y + this.m02 * vec.z + this.m03 * vec.w, this.m10 * vec.x + this.m11 * vec.y + this.m12 * vec.z + this.m13 * vec.w, this.m20 * vec.x + this.m21 * vec.y + this.m22 * vec.z + this.m23 * vec.w, this.m30 * vec.x + this.m31 * vec.y + this.m32 * vec.z + this.m33 * vec.w);
}, "JU.T4,JU.T4");
Clazz_defineMethod (c$, "rotTrans", 
function (point) {
this.rotTrans2 (point, point);
}, "JU.T3");
Clazz_defineMethod (c$, "rotTrans2", 
function (point, pointOut) {
pointOut.set (this.m00 * point.x + this.m01 * point.y + this.m02 * point.z + this.m03, this.m10 * point.x + this.m11 * point.y + this.m12 * point.z + this.m13, this.m20 * point.x + this.m21 * point.y + this.m22 * point.z + this.m23);
return pointOut;
}, "JU.T3,JU.T3");
Clazz_defineMethod (c$, "setAsXYRotation", 
function (angle) {
this.setIdentity ();
var c = Math.cos (angle);
var s = Math.sin (angle);
this.m22 = c;
this.m23 = -s;
this.m32 = s;
this.m33 = c;
return this;
}, "~N");
Clazz_defineMethod (c$, "setAsYZRotation", 
function (angle) {
this.setIdentity ();
var c = Math.cos (angle);
var s = Math.sin (angle);
this.m00 = c;
this.m03 = -s;
this.m30 = s;
this.m33 = c;
return this;
}, "~N");
Clazz_defineMethod (c$, "setAsXZRotation", 
function (angle) {
this.setIdentity ();
var c = Math.cos (angle);
var s = Math.sin (angle);
this.m11 = c;
this.m13 = -s;
this.m31 = s;
this.m33 = c;
return this;
}, "~N");
Clazz_overrideMethod (c$, "equals", 
function (o) {
if (!(Clazz_instanceOf (o, JU.M4))) return false;
var m = o;
return (this.m00 == m.m00 && this.m01 == m.m01 && this.m02 == m.m02 && this.m03 == m.m03 && this.m10 == m.m10 && this.m11 == m.m11 && this.m12 == m.m12 && this.m13 == m.m13 && this.m20 == m.m20 && this.m21 == m.m21 && this.m22 == m.m22 && this.m23 == m.m23 && this.m30 == m.m30 && this.m31 == m.m31 && this.m32 == m.m32 && this.m33 == m.m33);
}, "~O");
Clazz_overrideMethod (c$, "hashCode", 
function () {
return JU.T3.floatToIntBits (this.m00) ^ JU.T3.floatToIntBits (this.m01) ^ JU.T3.floatToIntBits (this.m02) ^ JU.T3.floatToIntBits (this.m03) ^ JU.T3.floatToIntBits (this.m10) ^ JU.T3.floatToIntBits (this.m11) ^ JU.T3.floatToIntBits (this.m12) ^ JU.T3.floatToIntBits (this.m13) ^ JU.T3.floatToIntBits (this.m20) ^ JU.T3.floatToIntBits (this.m21) ^ JU.T3.floatToIntBits (this.m22) ^ JU.T3.floatToIntBits (this.m23) ^ JU.T3.floatToIntBits (this.m30) ^ JU.T3.floatToIntBits (this.m31) ^ JU.T3.floatToIntBits (this.m32) ^ JU.T3.floatToIntBits (this.m33);
});
Clazz_overrideMethod (c$, "toString", 
function () {
return "[\n  [" + this.m00 + "\t" + this.m01 + "\t" + this.m02 + "\t" + this.m03 + "]" + "\n  [" + this.m10 + "\t" + this.m11 + "\t" + this.m12 + "\t" + this.m13 + "]" + "\n  [" + this.m20 + "\t" + this.m21 + "\t" + this.m22 + "\t" + this.m23 + "]" + "\n  [" + this.m30 + "\t" + this.m31 + "\t" + this.m32 + "\t" + this.m33 + "] ]";
});
Clazz_defineMethod (c$, "round", 
function (f) {
this.m00 = this.rnd (this.m00, f);
this.m01 = this.rnd (this.m01, f);
this.m02 = this.rnd (this.m02, f);
this.m03 = this.rnd (this.m03, f);
this.m10 = this.rnd (this.m10, f);
this.m11 = this.rnd (this.m11, f);
this.m12 = this.rnd (this.m12, f);
this.m13 = this.rnd (this.m13, f);
this.m20 = this.rnd (this.m20, f);
this.m21 = this.rnd (this.m21, f);
this.m22 = this.rnd (this.m22, f);
this.m23 = this.rnd (this.m23, f);
this.m30 = this.rnd (this.m30, f);
this.m31 = this.rnd (this.m31, f);
this.m32 = this.rnd (this.m32, f);
this.m33 = this.rnd (this.m33, f);
return this;
}, "~N");
Clazz_defineMethod (c$, "rnd", 
 function (n, f) {
return (Math.abs (n) < f ? 0 : n);
}, "~N,~N");
});
Clazz_declarePackage ("JU");
Clazz_load (["java.io.OutputStream", "javajs.api.GenericOutputChannel"], "JU.OC", ["java.io.BufferedWriter", "$.ByteArrayOutputStream", "$.OutputStreamWriter", "java.lang.Float", "JU.Base64", "$.SB"], function () {
c$ = Clazz_decorateAsClass (function () {
this.bytePoster = null;
this.fileName = null;
this.bw = null;
this.isLocalFile = false;
this.byteCount = 0;
this.isCanceled = false;
this.closed = false;
this.os = null;
this.sb = null;
this.type = null;
this.$isBase64 = false;
this.os0 = null;
this.bytes = null;
this.bigEndian = true;
Clazz_instantialize (this, arguments);
}, JU, "OC", java.io.OutputStream, javajs.api.GenericOutputChannel);
Clazz_overrideMethod (c$, "isBigEndian", 
function () {
return this.bigEndian;
});
Clazz_defineMethod (c$, "setBigEndian", 
function (TF) {
this.bigEndian = TF;
}, "~B");
Clazz_defineMethod (c$, "setParams", 
function (bytePoster, fileName, asWriter, os) {
this.bytePoster = bytePoster;
this.fileName = fileName;
this.$isBase64 = ";base64,".equals (fileName);
if (this.$isBase64) {
fileName = null;
this.os0 = os;
os = null;
}this.os = os;
this.isLocalFile = (fileName != null && !JU.OC.isRemote (fileName));
if (asWriter && !this.$isBase64 && os != null) this.bw =  new java.io.BufferedWriter ( new java.io.OutputStreamWriter (os));
return this;
}, "javajs.api.BytePoster,~S,~B,java.io.OutputStream");
Clazz_defineMethod (c$, "setBytes", 
function (b) {
this.bytes = b;
return this;
}, "~A");
Clazz_defineMethod (c$, "getFileName", 
function () {
return this.fileName;
});
Clazz_defineMethod (c$, "getName", 
function () {
return (this.fileName == null ? null : this.fileName.substring (this.fileName.lastIndexOf ("/") + 1));
});
Clazz_defineMethod (c$, "getByteCount", 
function () {
return this.byteCount;
});
Clazz_defineMethod (c$, "setType", 
function (type) {
this.type = type;
}, "~S");
Clazz_defineMethod (c$, "getType", 
function () {
return this.type;
});
Clazz_defineMethod (c$, "append", 
function (s) {
try {
if (this.bw != null) {
this.bw.write (s);
} else if (this.os == null) {
if (this.sb == null) this.sb =  new JU.SB ();
this.sb.append (s);
} else {
var b = s.getBytes ();
this.os.write (b, 0, b.length);
this.byteCount += b.length;
return this;
}} catch (e) {
if (Clazz_exceptionOf (e, java.io.IOException)) {
} else {
throw e;
}
}
this.byteCount += s.length;
return this;
}, "~S");
Clazz_overrideMethod (c$, "reset", 
function () {
this.sb = null;
this.initOS ();
});
Clazz_defineMethod (c$, "initOS", 
 function () {
if (this.sb != null) {
var s = this.sb.toString ();
this.reset ();
this.append (s);
return;
}try {
{
this.os = null;
}if (this.os == null) this.os =  new java.io.ByteArrayOutputStream ();
if (this.bw != null) {
this.bw.close ();
this.bw =  new java.io.BufferedWriter ( new java.io.OutputStreamWriter (this.os));
}} catch (e) {
if (Clazz_exceptionOf (e, Exception)) {
System.out.println (e.toString ());
} else {
throw e;
}
}
this.byteCount = 0;
});
Clazz_overrideMethod (c$, "writeByteAsInt", 
function (b) {
if (this.os == null) this.initOS ();
{
this.os.writeByteAsInt(b);
}this.byteCount++;
}, "~N");
Clazz_overrideMethod (c$, "write", 
function (buf, i, len) {
if (this.os == null) this.initOS ();
if (len < 0) len = buf.length - i;
try {
this.os.write (buf, i, len);
} catch (e) {
if (Clazz_exceptionOf (e, java.io.IOException)) {
} else {
throw e;
}
}
this.byteCount += len;
}, "~A,~N,~N");
Clazz_overrideMethod (c$, "writeShort", 
function (i) {
if (this.isBigEndian ()) {
this.writeByteAsInt (i >> 8);
this.writeByteAsInt (i);
} else {
this.writeByteAsInt (i);
this.writeByteAsInt (i >> 8);
}}, "~N");
Clazz_overrideMethod (c$, "writeLong", 
function (b) {
if (this.isBigEndian ()) {
this.writeInt (((b >> 32) & 0xFFFFFFFF));
this.writeInt ((b & 0xFFFFFFFF));
} else {
this.writeByteAsInt ((b >> 56));
this.writeByteAsInt ((b >> 48));
this.writeByteAsInt ((b >> 40));
this.writeByteAsInt ((b >> 32));
this.writeByteAsInt ((b >> 24));
this.writeByteAsInt ((b >> 16));
this.writeByteAsInt ((b >> 8));
this.writeByteAsInt (b);
}}, "~N");
Clazz_defineMethod (c$, "cancel", 
function () {
this.isCanceled = true;
this.closeChannel ();
});
Clazz_overrideMethod (c$, "closeChannel", 
function () {
if (this.closed) return null;
try {
if (this.bw != null) {
this.bw.flush ();
this.bw.close ();
} else if (this.os != null) {
this.os.flush ();
this.os.close ();
}if (this.os0 != null && this.isCanceled) {
this.os0.flush ();
this.os0.close ();
}} catch (e) {
if (Clazz_exceptionOf (e, Exception)) {
} else {
throw e;
}
}
if (this.isCanceled) {
this.closed = true;
return null;
}if (this.fileName == null) {
if (this.$isBase64) {
var s = this.getBase64 ();
if (this.os0 != null) {
this.os = this.os0;
this.append (s);
}this.sb =  new JU.SB ();
this.sb.append (s);
this.$isBase64 = false;
return this.closeChannel ();
}return (this.sb == null ? null : this.sb.toString ());
}this.closed = true;
if (!this.isLocalFile) {
var ret = this.postByteArray ();
if (ret == null || ret.startsWith ("java.net")) this.byteCount = -1;
return ret;
}var jmol = null;
var _function = null;
{
jmol = self.J2S || Jmol; _function = (typeof this.fileName == "function" ?
this.fileName : null);
}if (jmol != null) {
var data = (this.sb == null ? this.toByteArray () : this.sb.toString ());
if (_function == null) jmol.doAjax (this.fileName, null, data, this.sb == null);
 else jmol.applyFunc (this.fileName, data);
}return null;
});
Clazz_defineMethod (c$, "isBase64", 
function () {
return this.$isBase64;
});
Clazz_defineMethod (c$, "getBase64", 
function () {
return JU.Base64.getBase64 (this.toByteArray ()).toString ();
});
Clazz_defineMethod (c$, "toByteArray", 
function () {
return (this.bytes != null ? this.bytes : Clazz_instanceOf (this.os, java.io.ByteArrayOutputStream) ? (this.os).toByteArray () : null);
});
Clazz_defineMethod (c$, "close", 
function () {
this.closeChannel ();
});
Clazz_overrideMethod (c$, "toString", 
function () {
if (this.bw != null) try {
this.bw.flush ();
} catch (e) {
if (Clazz_exceptionOf (e, java.io.IOException)) {
} else {
throw e;
}
}
if (this.sb != null) return this.closeChannel ();
return this.byteCount + " bytes";
});
Clazz_defineMethod (c$, "postByteArray", 
 function () {
var bytes = (this.sb == null ? this.toByteArray () : this.sb.toString ().getBytes ());
return this.bytePoster.postByteArray (this.fileName, bytes);
});
c$.isRemote = Clazz_defineMethod (c$, "isRemote", 
function (fileName) {
if (fileName == null) return false;
var itype = JU.OC.urlTypeIndex (fileName);
return (itype >= 0 && itype != 5);
}, "~S");
c$.isLocal = Clazz_defineMethod (c$, "isLocal", 
function (fileName) {
if (fileName == null) return false;
var itype = JU.OC.urlTypeIndex (fileName);
return (itype < 0 || itype == 5);
}, "~S");
c$.urlTypeIndex = Clazz_defineMethod (c$, "urlTypeIndex", 
function (name) {
if (name == null) return -2;
for (var i = 0; i < JU.OC.urlPrefixes.length; ++i) {
if (name.startsWith (JU.OC.urlPrefixes[i])) {
return i;
}}
return -1;
}, "~S");
Clazz_overrideMethod (c$, "writeInt", 
function (i) {
if (this.bigEndian) {
this.writeByteAsInt (i >> 24);
this.writeByteAsInt (i >> 16);
this.writeByteAsInt (i >> 8);
this.writeByteAsInt (i);
} else {
this.writeByteAsInt (i);
this.writeByteAsInt (i >> 8);
this.writeByteAsInt (i >> 16);
this.writeByteAsInt (i >> 24);
}}, "~N");
Clazz_defineMethod (c$, "writeFloat", 
function (x) {
this.writeInt (x == 0 ? 0 : Float.floatToIntBits (x));
}, "~N");
Clazz_defineStatics (c$,
"urlPrefixes",  Clazz_newArray (-1, ["http:", "https:", "sftp:", "ftp:", "cache://", "file:"]),
"URL_LOCAL", 5);
});
Clazz_declarePackage ("JU");
Clazz_load (["JU.T3"], "JU.P3", null, function () {
c$ = Clazz_declareType (JU, "P3", JU.T3);
c$.newP = Clazz_defineMethod (c$, "newP", 
function (t) {
var p =  new JU.P3 ();
p.x = t.x;
p.y = t.y;
p.z = t.z;
return p;
}, "JU.T3");
c$.getUnlikely = Clazz_defineMethod (c$, "getUnlikely", 
function () {
return (JU.P3.unlikely == null ? JU.P3.unlikely = JU.P3.new3 (3.141592653589793, 2.718281828459045, (8.539734222673566)) : JU.P3.unlikely);
});
c$.new3 = Clazz_defineMethod (c$, "new3", 
function (x, y, z) {
var p =  new JU.P3 ();
p.x = x;
p.y = y;
p.z = z;
return p;
}, "~N,~N,~N");
Clazz_defineStatics (c$,
"unlikely", null);
});
Clazz_declarePackage ("JU");
Clazz_load (["JU.T3i"], "JU.P3i", null, function () {
c$ = Clazz_declareType (JU, "P3i", JU.T3i);
c$.new3 = Clazz_defineMethod (c$, "new3", 
function (x, y, z) {
var pt =  new JU.P3i ();
pt.x = x;
pt.y = y;
pt.z = z;
return pt;
}, "~N,~N,~N");
});
Clazz_declarePackage ("JU");
Clazz_load (["JU.T4"], "JU.P4", null, function () {
c$ = Clazz_declareType (JU, "P4", JU.T4);
c$.new4 = Clazz_defineMethod (c$, "new4", 
function (x, y, z, w) {
var pt =  new JU.P4 ();
pt.set4 (x, y, z, w);
return pt;
}, "~N,~N,~N,~N");
c$.newPt = Clazz_defineMethod (c$, "newPt", 
function (value) {
var pt =  new JU.P4 ();
pt.set4 (value.x, value.y, value.z, value.w);
return pt;
}, "JU.P4");
Clazz_defineMethod (c$, "distance4", 
function (p1) {
var dx = this.x - p1.x;
var dy = this.y - p1.y;
var dz = this.z - p1.z;
var dw = this.w - p1.w;
return Math.sqrt (dx * dx + dy * dy + dz * dz + dw * dw);
}, "JU.P4");
});
Clazz_declarePackage ("JU");
Clazz_load (null, "JU.PT", ["java.lang.Boolean", "$.Double", "$.Float", "$.Number", "java.util.Map", "javajs.api.JSONEncodable", "JU.AU", "$.DF", "$.Lst", "$.M34", "$.M4", "$.SB"], function () {
c$ = Clazz_declareType (JU, "PT");
c$.parseInt = Clazz_defineMethod (c$, "parseInt", 
function (str) {
return JU.PT.parseIntNext (str,  Clazz_newIntArray (-1, [0]));
}, "~S");
c$.parseIntNext = Clazz_defineMethod (c$, "parseIntNext", 
function (str, next) {
var cch = str.length;
if (next[0] < 0 || next[0] >= cch) return -2147483648;
return JU.PT.parseIntChecked (str, cch, next);
}, "~S,~A");
c$.parseIntChecked = Clazz_defineMethod (c$, "parseIntChecked", 
function (str, ichMax, next) {
var digitSeen = false;
var value = 0;
var ich = next[0];
if (ich < 0) return -2147483648;
var ch;
while (ich < ichMax && JU.PT.isWhiteSpace (str, ich)) ++ich;

var negative = false;
if (ich < ichMax && str.charCodeAt (ich) == 45) {
negative = true;
++ich;
}while (ich < ichMax && (ch = str.charCodeAt (ich)) >= 48 && ch <= 57) {
value = value * 10 + (ch - 48);
digitSeen = true;
++ich;
}
if (!digitSeen) value = -2147483648;
 else if (negative) value = -value;
next[0] = ich;
return value;
}, "~S,~N,~A");
c$.isWhiteSpace = Clazz_defineMethod (c$, "isWhiteSpace", 
function (str, ich) {
var ch;
return (ich >= 0 && ((ch = str.charAt (ich)) == ' ' || ch == '\t' || ch == '\n'));
}, "~S,~N");
c$.parseFloatChecked = Clazz_defineMethod (c$, "parseFloatChecked", 
function (str, ichMax, next, isStrict) {
var digitSeen = false;
var ich = next[0];
if (isStrict && str.indexOf ('\n') != str.lastIndexOf ('\n')) return NaN;
while (ich < ichMax && JU.PT.isWhiteSpace (str, ich)) ++ich;

var negative = false;
if (ich < ichMax && str.charAt (ich) == '-') {
++ich;
negative = true;
}var ch = 0;
var ival = 0;
var ival2 = 0;
while (ich < ichMax && (ch = str.charCodeAt (ich)) >= 48 && ch <= 57) {
ival = (ival * 10) + (ch - 48) * 1;
++ich;
digitSeen = true;
}
var isDecimal = false;
var iscale = 0;
var nzero = (ival == 0 ? -1 : 0);
if (ch == 46) {
isDecimal = true;
while (++ich < ichMax && (ch = str.charCodeAt (ich)) >= 48 && ch <= 57) {
digitSeen = true;
if (nzero < 0) {
if (ch == 48) {
nzero--;
continue;
}nzero = -nzero;
}if (iscale < JU.PT.decimalScale.length) {
ival2 = (ival2 * 10) + (ch - 48) * 1;
iscale++;
}}
}var value;
if (!digitSeen) {
value = NaN;
} else if (ival2 > 0) {
value = ival2 * JU.PT.decimalScale[iscale - 1];
if (nzero > 1) {
if (nzero - 2 < JU.PT.decimalScale.length) {
value *= JU.PT.decimalScale[nzero - 2];
} else {
value *= Math.pow (10, 1 - nzero);
}} else {
value += ival;
}} else {
value = ival;
}var isExponent = false;
if (ich < ichMax && (ch == 69 || ch == 101 || ch == 68)) {
isExponent = true;
if (++ich >= ichMax) return NaN;
ch = str.charCodeAt (ich);
if ((ch == 43) && (++ich >= ichMax)) return NaN;
next[0] = ich;
var exponent = JU.PT.parseIntChecked (str, ichMax, next);
if (exponent == -2147483648) return NaN;
if (exponent > 0 && exponent <= JU.PT.tensScale.length) value *= JU.PT.tensScale[exponent - 1];
 else if (exponent < 0 && -exponent <= JU.PT.decimalScale.length) value *= JU.PT.decimalScale[-exponent - 1];
 else if (exponent != 0) value *= Math.pow (10, exponent);
} else {
next[0] = ich;
}if (negative) value = -value;
if (value == Infinity) value = 3.4028235E38;
return (!isStrict || (!isExponent || isDecimal) && JU.PT.checkTrailingText (str, next[0], ichMax) ? value : NaN);
}, "~S,~N,~A,~B");
c$.checkTrailingText = Clazz_defineMethod (c$, "checkTrailingText", 
function (str, ich, ichMax) {
var ch;
while (ich < ichMax && (JU.PT.isWhitespace (ch = str.charAt (ich)) || ch == ';')) ++ich;

return (ich == ichMax);
}, "~S,~N,~N");
c$.parseFloatArray = Clazz_defineMethod (c$, "parseFloatArray", 
function (str) {
return JU.PT.parseFloatArrayNext (str,  Clazz_newIntArray (1, 0), null, null, null);
}, "~S");
c$.parseFloatArrayInfested = Clazz_defineMethod (c$, "parseFloatArrayInfested", 
function (tokens, data) {
var len = data.length;
var nTokens = tokens.length;
var n = 0;
var max = 0;
for (var i = 0; i >= 0 && i < len && n < nTokens; i++) {
var f;
while (Float.isNaN (f = JU.PT.parseFloat (tokens[n++])) && n < nTokens) {
}
if (!Float.isNaN (f)) data[(max = i)] = f;
if (n == nTokens) break;
}
return max + 1;
}, "~A,~A");
c$.parseFloatArrayNext = Clazz_defineMethod (c$, "parseFloatArrayNext", 
function (str, next, f, strStart, strEnd) {
var n = 0;
var pt = next[0];
if (pt >= 0) {
if (strStart != null) {
var p = str.indexOf (strStart, pt);
if (p >= 0) next[0] = p + strStart.length;
}str = str.substring (next[0]);
pt = (strEnd == null ? -1 : str.indexOf (strEnd));
if (pt < 0) pt = str.length;
 else str = str.substring (0, pt);
next[0] += pt + 1;
var tokens = JU.PT.getTokens (str);
if (f == null) f =  Clazz_newFloatArray (tokens.length, 0);
n = JU.PT.parseFloatArrayInfested (tokens, f);
}if (f == null) return  Clazz_newFloatArray (0, 0);
for (var i = n; i < f.length; i++) f[i] = NaN;

return f;
}, "~S,~A,~A,~S,~S");
c$.parseFloatRange = Clazz_defineMethod (c$, "parseFloatRange", 
function (str, ichMax, next) {
var cch = str.length;
if (ichMax > cch) ichMax = cch;
if (next[0] < 0 || next[0] >= ichMax) return NaN;
return JU.PT.parseFloatChecked (str, ichMax, next, false);
}, "~S,~N,~A");
c$.parseFloatNext = Clazz_defineMethod (c$, "parseFloatNext", 
function (str, next) {
var cch = (str == null ? -1 : str.length);
return (next[0] < 0 || next[0] >= cch ? NaN : JU.PT.parseFloatChecked (str, cch, next, false));
}, "~S,~A");
c$.parseFloatStrict = Clazz_defineMethod (c$, "parseFloatStrict", 
function (str) {
var cch = str.length;
if (cch == 0) return NaN;
return JU.PT.parseFloatChecked (str, cch,  Clazz_newIntArray (-1, [0]), true);
}, "~S");
c$.parseFloat = Clazz_defineMethod (c$, "parseFloat", 
function (str) {
return JU.PT.parseFloatNext (str,  Clazz_newIntArray (-1, [0]));
}, "~S");
c$.parseIntRadix = Clazz_defineMethod (c$, "parseIntRadix", 
function (s, i) {
{
return Integer.parseIntRadix(s, i);
}}, "~S,~N");
c$.getTokens = Clazz_defineMethod (c$, "getTokens", 
function (line) {
return JU.PT.getTokensAt (line, 0);
}, "~S");
c$.parseToken = Clazz_defineMethod (c$, "parseToken", 
function (str) {
return JU.PT.parseTokenNext (str,  Clazz_newIntArray (-1, [0]));
}, "~S");
c$.parseTrimmed = Clazz_defineMethod (c$, "parseTrimmed", 
function (str) {
return JU.PT.parseTrimmedRange (str, 0, str.length);
}, "~S");
c$.parseTrimmedAt = Clazz_defineMethod (c$, "parseTrimmedAt", 
function (str, ichStart) {
return JU.PT.parseTrimmedRange (str, ichStart, str.length);
}, "~S,~N");
c$.parseTrimmedRange = Clazz_defineMethod (c$, "parseTrimmedRange", 
function (str, ichStart, ichMax) {
var cch = str.length;
if (ichMax < cch) cch = ichMax;
if (cch < ichStart) return "";
return JU.PT.parseTrimmedChecked (str, ichStart, cch);
}, "~S,~N,~N");
c$.getTokensAt = Clazz_defineMethod (c$, "getTokensAt", 
function (line, ich) {
if (line == null) return null;
var cchLine = line.length;
if (ich < 0 || ich > cchLine) return null;
var tokenCount = JU.PT.countTokens (line, ich);
var tokens =  new Array (tokenCount);
var next =  Clazz_newIntArray (1, 0);
next[0] = ich;
for (var i = 0; i < tokenCount; ++i) tokens[i] = JU.PT.parseTokenChecked (line, cchLine, next);

return tokens;
}, "~S,~N");
c$.countChar = Clazz_defineMethod (c$, "countChar", 
function (line, c) {
var n = 0;
for (var i = line.lastIndexOf (c) + 1; --i >= 0; ) if (line.charAt (i) == c) n++;

return n;
}, "~S,~S");
c$.countTokens = Clazz_defineMethod (c$, "countTokens", 
function (line, ich) {
var tokenCount = 0;
if (line != null) {
var ichMax = line.length;
while (true) {
while (ich < ichMax && JU.PT.isWhiteSpace (line, ich)) ++ich;

if (ich == ichMax) break;
++tokenCount;
do {
++ich;
} while (ich < ichMax && !JU.PT.isWhiteSpace (line, ich));
}
}return tokenCount;
}, "~S,~N");
c$.parseTokenNext = Clazz_defineMethod (c$, "parseTokenNext", 
function (str, next) {
var cch = str.length;
return (next[0] < 0 || next[0] >= cch ? null : JU.PT.parseTokenChecked (str, cch, next));
}, "~S,~A");
c$.parseTokenRange = Clazz_defineMethod (c$, "parseTokenRange", 
function (str, ichMax, next) {
var cch = str.length;
if (ichMax > cch) ichMax = cch;
return (next[0] < 0 || next[0] >= ichMax ? null : JU.PT.parseTokenChecked (str, ichMax, next));
}, "~S,~N,~A");
c$.parseTokenChecked = Clazz_defineMethod (c$, "parseTokenChecked", 
function (str, ichMax, next) {
var ich = next[0];
while (ich < ichMax && JU.PT.isWhiteSpace (str, ich)) ++ich;

var ichNonWhite = ich;
while (ich < ichMax && !JU.PT.isWhiteSpace (str, ich)) ++ich;

next[0] = ich;
return (ichNonWhite == ich ? null : str.substring (ichNonWhite, ich));
}, "~S,~N,~A");
c$.parseTrimmedChecked = Clazz_defineMethod (c$, "parseTrimmedChecked", 
function (str, ich, ichMax) {
while (ich < ichMax && JU.PT.isWhiteSpace (str, ich)) ++ich;

var ichLast = ichMax - 1;
while (ichLast >= ich && JU.PT.isWhiteSpace (str, ichLast)) --ichLast;

return (ichLast < ich ? "" : str.substring (ich, ichLast + 1));
}, "~S,~N,~N");
c$.dVal = Clazz_defineMethod (c$, "dVal", 
function (s) {
{
if(s==null)
throw new NumberFormatException("null");
var d=parseFloat(s);
if(isNaN(d))
throw new NumberFormatException("Not a Number : "+s);
return d
}}, "~S");
c$.fVal = Clazz_defineMethod (c$, "fVal", 
function (s) {
{
return this.dVal(s);
}}, "~S");
c$.parseIntRange = Clazz_defineMethod (c$, "parseIntRange", 
function (str, ichMax, next) {
var cch = str.length;
if (ichMax > cch) ichMax = cch;
return (next[0] < 0 || next[0] >= ichMax ? -2147483648 : JU.PT.parseIntChecked (str, ichMax, next));
}, "~S,~N,~A");
c$.parseFloatArrayData = Clazz_defineMethod (c$, "parseFloatArrayData", 
function (tokens, data) {
JU.PT.parseFloatArrayDataN (tokens, data, data.length);
}, "~A,~A");
c$.parseFloatArrayDataN = Clazz_defineMethod (c$, "parseFloatArrayDataN", 
function (tokens, data, nData) {
for (var i = nData; --i >= 0; ) data[i] = (i >= tokens.length ? NaN : JU.PT.parseFloat (tokens[i]));

}, "~A,~A,~N");
c$.split = Clazz_defineMethod (c$, "split", 
function (text, run) {
if (text.length == 0) return  new Array (0);
var n = 1;
var i = text.indexOf (run);
var lines;
var runLen = run.length;
if (i < 0 || runLen == 0) {
lines =  new Array (1);
lines[0] = text;
return lines;
}var len = text.length - runLen;
for (; i >= 0 && i < len; n++) i = text.indexOf (run, i + runLen);

lines =  new Array (n);
i = 0;
var ipt = 0;
var pt = 0;
for (; (ipt = text.indexOf (run, i)) >= 0 && pt + 1 < n; ) {
lines[pt++] = text.substring (i, ipt);
i = ipt + runLen;
}
if (text.indexOf (run, len) != len) len += runLen;
lines[pt] = text.substring (i, len);
return lines;
}, "~S,~S");
c$.getQuotedStringAt = Clazz_defineMethod (c$, "getQuotedStringAt", 
function (line, ipt0) {
var next =  Clazz_newIntArray (-1, [ipt0]);
return JU.PT.getQuotedStringNext (line, next);
}, "~S,~N");
c$.getQuotedStringNext = Clazz_defineMethod (c$, "getQuotedStringNext", 
function (line, next) {
var i = next[0];
if (i < 0 || (i = line.indexOf ("\"", i)) < 0) return "";
var pt = i + 1;
var len = line.length;
while (++i < len && line.charAt (i) != '"') if (line.charAt (i) == '\\') i++;

next[0] = i + 1;
return line.substring (pt, i);
}, "~S,~A");
c$.getQuotedOrUnquotedAttribute = Clazz_defineMethod (c$, "getQuotedOrUnquotedAttribute", 
function (line, key) {
if (line == null || key == null) return null;
var pt = line.toLowerCase ().indexOf (key.toLowerCase () + "=");
if (pt < 0 || (pt = pt + key.length + 1) >= line.length) return "";
var c = line.charAt (pt);
switch (c) {
case '\'':
case '"':
pt++;
break;
default:
c = ' ';
line += " ";
}
var pt1 = line.indexOf (c, pt);
return (pt1 < 0 ? null : line.substring (pt, pt1));
}, "~S,~S");
c$.getCSVString = Clazz_defineMethod (c$, "getCSVString", 
function (line, next) {
var i = next[1];
if (i < 0 || (i = line.indexOf ("\"", i)) < 0) return null;
var pt = next[0] = i;
var len = line.length;
var escaped = false;
var haveEscape = false;
while (++i < len && (line.charAt (i) != '"' || (escaped = (i + 1 < len && line.charAt (i + 1) == '"')))) if (escaped) {
escaped = false;
haveEscape = true;
i++;
}
if (i >= len) {
next[1] = -1;
return null;
}next[1] = i + 1;
var s = line.substring (pt + 1, i);
return (haveEscape ? JU.PT.rep (JU.PT.rep (s, "\"\"", "\0"), "\0", "\"") : s);
}, "~S,~A");
c$.isOneOf = Clazz_defineMethod (c$, "isOneOf", 
function (key, semiList) {
if (semiList.length == 0) return false;
if (semiList.charAt (0) != ';') semiList = ";" + semiList + ";";
return key.indexOf (";") < 0 && semiList.indexOf (';' + key + ';') >= 0;
}, "~S,~S");
c$.getQuotedAttribute = Clazz_defineMethod (c$, "getQuotedAttribute", 
function (info, name) {
var i = info.indexOf (name + "=");
return (i < 0 ? null : JU.PT.getQuotedStringAt (info, i));
}, "~S,~S");
c$.approx = Clazz_defineMethod (c$, "approx", 
function (f, n) {
return Math.round (f * n) / n;
}, "~N,~N");
c$.rep = Clazz_defineMethod (c$, "rep", 
function (str, strFrom, strTo) {
if (str == null || strFrom.length == 0 || str.indexOf (strFrom) < 0) return str;
var isOnce = (strTo.indexOf (strFrom) >= 0);
do {
str = str.$replace (strFrom, strTo);
} while (!isOnce && str.indexOf (strFrom) >= 0);
return str;
}, "~S,~S,~S");
c$.formatF = Clazz_defineMethod (c$, "formatF", 
function (value, width, precision, alignLeft, zeroPad) {
return JU.PT.formatS (JU.DF.formatDecimal (value, precision), width, 0, alignLeft, zeroPad);
}, "~N,~N,~N,~B,~B");
c$.formatD = Clazz_defineMethod (c$, "formatD", 
function (value, width, precision, alignLeft, zeroPad, allowOverflow) {
return JU.PT.formatS (JU.DF.formatDecimal (value, -1 - precision), width, 0, alignLeft, zeroPad);
}, "~N,~N,~N,~B,~B,~B");
c$.formatS = Clazz_defineMethod (c$, "formatS", 
function (value, width, precision, alignLeft, zeroPad) {
if (value == null) return "";
var len = value.length;
if (precision != 2147483647 && precision > 0 && precision < len) value = value.substring (0, precision);
 else if (precision < 0 && len + precision >= 0) value = value.substring (len + precision + 1);
var padLength = width - value.length;
if (padLength <= 0) return value;
var isNeg = (zeroPad && !alignLeft && value.charAt (0) == '-');
var padChar = (zeroPad ? '0' : ' ');
var padChar0 = (isNeg ? '-' : padChar);
var sb =  new JU.SB ();
if (alignLeft) sb.append (value);
sb.appendC (padChar0);
for (var i = padLength; --i > 0; ) sb.appendC (padChar);

if (!alignLeft) sb.append (isNeg ? padChar + value.substring (1) : value);
return sb.toString ();
}, "~S,~N,~N,~B,~B");
c$.replaceWithCharacter = Clazz_defineMethod (c$, "replaceWithCharacter", 
function (str, strFrom, chTo) {
if (str == null) return null;
for (var i = strFrom.length; --i >= 0; ) str = str.$replace (strFrom.charAt (i), chTo);

return str;
}, "~S,~S,~S");
c$.replaceAllCharacters = Clazz_defineMethod (c$, "replaceAllCharacters", 
function (str, strFrom, strTo) {
for (var i = strFrom.length; --i >= 0; ) {
var chFrom = strFrom.substring (i, i + 1);
str = JU.PT.rep (str, chFrom, strTo);
}
return str;
}, "~S,~S,~S");
c$.trim = Clazz_defineMethod (c$, "trim", 
function (str, chars) {
if (str == null || str.length == 0) return str;
if (chars.length == 0) return str.trim ();
var len = str.length;
var k = 0;
while (k < len && chars.indexOf (str.charAt (k)) >= 0) k++;

var m = str.length - 1;
while (m > k && chars.indexOf (str.charAt (m)) >= 0) m--;

return str.substring (k, m + 1);
}, "~S,~S");
c$.trimQuotes = Clazz_defineMethod (c$, "trimQuotes", 
function (value) {
return (value != null && value.length > 1 && value.startsWith ("\"") && value.endsWith ("\"") ? value.substring (1, value.length - 1) : value);
}, "~S");
c$.isNonStringPrimitive = Clazz_defineMethod (c$, "isNonStringPrimitive", 
function (info) {
return Clazz_instanceOf (info, Number) || Clazz_instanceOf (info, Boolean);
}, "~O");
c$.arrayGet = Clazz_defineMethod (c$, "arrayGet", 
 function (info, i) {
{
return info[i];
}}, "~O,~N");
c$.toJSON = Clazz_defineMethod (c$, "toJSON", 
function (infoType, info) {
if (info == null) return JU.PT.packageJSON (infoType, null);
if (JU.PT.isNonStringPrimitive (info)) return JU.PT.packageJSON (infoType, info.toString ());
var s = null;
var sb = null;
while (true) {
if (Clazz_instanceOf (info, String)) {
s = info;
{
if (typeof s == "undefined") s = "null"
}if (s.indexOf ("{\"") != 0) {
s = JU.PT.esc (s);
}break;
}if (Clazz_instanceOf (info, javajs.api.JSONEncodable)) {
if ((s = (info).toJSON ()) == null) s = "null";
break;
}sb =  new JU.SB ();
if (Clazz_instanceOf (info, java.util.Map)) {
sb.append ("{ ");
var sep = "";
for (var key, $key = (info).keySet ().iterator (); $key.hasNext () && ((key = $key.next ()) || true);) {
sb.append (sep).append (JU.PT.packageJSON (key, JU.PT.toJSON (null, (info).get (key))));
sep = ",";
}
sb.append (" }");
break;
}if (Clazz_instanceOf (info, JU.Lst)) {
sb.append ("[ ");
var n = (info).size ();
for (var i = 0; i < n; i++) {
if (i > 0) sb.appendC (',');
sb.append (JU.PT.toJSON (null, (info).get (i)));
}
sb.append (" ]");
break;
}if (Clazz_instanceOf (info, JU.M34)) {
var len = (Clazz_instanceOf (info, JU.M4) ? 4 : 3);
var x =  Clazz_newFloatArray (len, 0);
var m = info;
sb.appendC ('[');
for (var i = 0; i < len; i++) {
if (i > 0) sb.appendC (',');
m.getRow (i, x);
sb.append (JU.PT.toJSON (null, x));
}
sb.appendC (']');
break;
}s = JU.PT.nonArrayString (info);
if (s == null) {
sb.append ("[");
var n = JU.AU.getLength (info);
for (var i = 0; i < n; i++) {
if (i > 0) sb.appendC (',');
sb.append (JU.PT.toJSON (null, JU.PT.arrayGet (info, i)));
}
sb.append ("]");
break;
}info = info.toString ();
}
return JU.PT.packageJSON (infoType, (s == null ? sb.toString () : s));
}, "~S,~O");
c$.nonArrayString = Clazz_defineMethod (c$, "nonArrayString", 
function (x) {
{
return (x.constructor == Array || x.BYTES_PER_ELEMENT ? null : x.toString());
}}, "~O");
c$.byteArrayToJSON = Clazz_defineMethod (c$, "byteArrayToJSON", 
function (data) {
var sb =  new JU.SB ();
sb.append ("[");
var n = data.length;
for (var i = 0; i < n; i++) {
if (i > 0) sb.appendC (',');
sb.appendI (data[i] & 0xFF);
}
sb.append ("]");
return sb.toString ();
}, "~A");
c$.packageJSON = Clazz_defineMethod (c$, "packageJSON", 
function (infoType, info) {
return (infoType == null ? info : "\"" + infoType + "\": " + info);
}, "~S,~S");
c$.escapeUrl = Clazz_defineMethod (c$, "escapeUrl", 
function (url) {
url = JU.PT.rep (url, "\n", "");
url = JU.PT.rep (url, "%", "%25");
url = JU.PT.rep (url, "#", "%23");
url = JU.PT.rep (url, "[", "%5B");
url = JU.PT.rep (url, "\\", "%5C");
url = JU.PT.rep (url, "]", "%5D");
url = JU.PT.rep (url, " ", "%20");
return url;
}, "~S");
c$.esc = Clazz_defineMethod (c$, "esc", 
function (str) {
if (str == null || str.length == 0) return "\"\"";
var haveEscape = false;
var i = 0;
for (; i < "\\\\\tt\rr\nn\"\"".length; i += 2) if (str.indexOf ("\\\\\tt\rr\nn\"\"".charAt (i)) >= 0) {
haveEscape = true;
break;
}
if (haveEscape) while (i < "\\\\\tt\rr\nn\"\"".length) {
var pt = -1;
var ch = "\\\\\tt\rr\nn\"\"".charAt (i++);
var ch2 = "\\\\\tt\rr\nn\"\"".charAt (i++);
var sb =  new JU.SB ();
var pt0 = 0;
while ((pt = str.indexOf (ch, pt + 1)) >= 0) {
sb.append (str.substring (pt0, pt)).appendC ('\\').appendC (ch2);
pt0 = pt + 1;
}
sb.append (str.substring (pt0, str.length));
str = sb.toString ();
}
return "\"" + JU.PT.escUnicode (str) + "\"";
}, "~S");
c$.escUnicode = Clazz_defineMethod (c$, "escUnicode", 
function (str) {
for (var i = str.length; --i >= 0; ) if (str.charCodeAt (i) > 0x7F) {
var s = "0000" + Integer.toHexString (str.charCodeAt (i));
str = str.substring (0, i) + "\\u" + s.substring (s.length - 4) + str.substring (i + 1);
}
return str;
}, "~S");
c$.escF = Clazz_defineMethod (c$, "escF", 
function (f) {
var sf = "" + f;
{
if (sf.indexOf(".") < 0 && sf.indexOf("e") < 0)
sf += ".0";
}return sf;
}, "~N");
c$.join = Clazz_defineMethod (c$, "join", 
function (s, c, i0) {
if (s.length < i0) return null;
var sb =  new JU.SB ();
sb.append (s[i0++]);
for (var i = i0; i < s.length; i++) sb.appendC (c).append (s[i]);

return sb.toString ();
}, "~A,~S,~N");
c$.isLike = Clazz_defineMethod (c$, "isLike", 
function (a, b) {
var areEqual = a.equals (b);
if (areEqual) return true;
var isStart = b.startsWith ("*");
var isEnd = b.endsWith ("*");
return (!isStart && !isEnd) ? areEqual : isStart && isEnd ? b.length == 1 || a.contains (b.substring (1, b.length - 1)) : isStart ? a.endsWith (b.substring (1)) : a.startsWith (b.substring (0, b.length - 1));
}, "~S,~S");
c$.getMapValueNoCase = Clazz_defineMethod (c$, "getMapValueNoCase", 
function (h, key) {
if ("this".equals (key)) return h;
var val = h.get (key);
if (val == null) for (var e, $e = h.entrySet ().iterator (); $e.hasNext () && ((e = $e.next ()) || true);) if (e.getKey ().equalsIgnoreCase (key)) return e.getValue ();

return val;
}, "java.util.Map,~S");
c$.clean = Clazz_defineMethod (c$, "clean", 
function (s) {
return JU.PT.rep (JU.PT.replaceAllCharacters (s, " \t\n\r", " "), "  ", " ").trim ();
}, "~S");
c$.fdup = Clazz_defineMethod (c$, "fdup", 
function (f, pt, n) {
var ch;
var count = 0;
for (var i = pt; --i >= 1; ) {
if (JU.PT.isDigit (ch = f.charAt (i))) continue;
switch (ch) {
case '.':
if (count++ != 0) return f;
continue;
case '-':
if (i != 1 && f.charAt (i - 1) != '.') return f;
continue;
default:
return f;
}
}
var s = f.substring (0, pt + 1);
var sb =  new JU.SB ();
for (var i = 0; i < n; i++) sb.append (s);

sb.append (f.substring (pt + 1));
return sb.toString ();
}, "~S,~N,~N");
c$.formatString = Clazz_defineMethod (c$, "formatString", 
 function (strFormat, key, strT, floatT, doubleT, doOne) {
if (strFormat == null) return null;
if ("".equals (strFormat)) return "";
var len = key.length;
if (strFormat.indexOf ("%") < 0 || len == 0 || strFormat.indexOf (key) < 0) return strFormat;
var strLabel = "";
var ich;
var ichPercent;
var ichKey;
for (ich = 0; (ichPercent = strFormat.indexOf ('%', ich)) >= 0 && (ichKey = strFormat.indexOf (key, ichPercent + 1)) >= 0; ) {
if (ich != ichPercent) strLabel += strFormat.substring (ich, ichPercent);
ich = ichPercent + 1;
if (ichKey > ichPercent + 6) {
strLabel += '%';
continue;
}try {
var alignLeft = false;
if (strFormat.charAt (ich) == '-') {
alignLeft = true;
++ich;
}var zeroPad = false;
if (strFormat.charAt (ich) == '0') {
zeroPad = true;
++ich;
}var ch;
var width = 0;
while ((ch = strFormat.charAt (ich)) >= '0' && (ch <= '9')) {
width = (10 * width) + (ch.charCodeAt (0) - 48);
++ich;
}
var precision = 2147483647;
var isExponential = false;
if (strFormat.charAt (ich) == '.') {
++ich;
if ((ch = strFormat.charAt (ich)) == '-') {
isExponential = (strT == null);
++ich;
}if ((ch = strFormat.charAt (ich)) >= '0' && ch <= '9') {
precision = ch.charCodeAt (0) - 48;
++ich;
}if (isExponential) precision = -precision;
}var st = strFormat.substring (ich, ich + len);
if (!st.equals (key)) {
ich = ichPercent + 1;
strLabel += '%';
continue;
}ich += len;
if (!Float.isNaN (floatT)) strLabel += JU.PT.formatF (floatT, width, precision, alignLeft, zeroPad);
 else if (strT != null) strLabel += JU.PT.formatS (strT, width, precision, alignLeft, zeroPad);
 else if (!Double.isNaN (doubleT)) strLabel += JU.PT.formatD (doubleT, width, precision - 1, alignLeft, zeroPad, true);
if (doOne) break;
} catch (ioobe) {
if (Clazz_exceptionOf (ioobe, IndexOutOfBoundsException)) {
ich = ichPercent;
break;
} else {
throw ioobe;
}
}
}
strLabel += strFormat.substring (ich);
return strLabel;
}, "~S,~S,~S,~N,~N,~B");
c$.formatStringS = Clazz_defineMethod (c$, "formatStringS", 
function (strFormat, key, strT) {
return JU.PT.formatString (strFormat, key, strT, NaN, NaN, false);
}, "~S,~S,~S");
c$.formatStringF = Clazz_defineMethod (c$, "formatStringF", 
function (strFormat, key, floatT) {
return JU.PT.formatString (strFormat, key, null, floatT, NaN, false);
}, "~S,~S,~N");
c$.formatStringI = Clazz_defineMethod (c$, "formatStringI", 
function (strFormat, key, intT) {
return JU.PT.formatString (strFormat, key, "" + intT, NaN, NaN, false);
}, "~S,~S,~N");
c$.sprintf = Clazz_defineMethod (c$, "sprintf", 
function (strFormat, list, values) {
if (values == null) return strFormat;
var n = list.length;
if (n == values.length) try {
for (var o = 0; o < n; o++) {
if (values[o] == null) continue;
switch (list.charAt (o)) {
case 's':
strFormat = JU.PT.formatString (strFormat, "s", values[o], NaN, NaN, true);
break;
case 'f':
strFormat = JU.PT.formatString (strFormat, "f", null, (values[o]).floatValue (), NaN, true);
break;
case 'i':
strFormat = JU.PT.formatString (strFormat, "d", "" + values[o], NaN, NaN, true);
strFormat = JU.PT.formatString (strFormat, "i", "" + values[o], NaN, NaN, true);
break;
case 'd':
strFormat = JU.PT.formatString (strFormat, "e", null, NaN, (values[o]).doubleValue (), true);
break;
case 'p':
var pVal = values[o];
strFormat = JU.PT.formatString (strFormat, "p", null, pVal.x, NaN, true);
strFormat = JU.PT.formatString (strFormat, "p", null, pVal.y, NaN, true);
strFormat = JU.PT.formatString (strFormat, "p", null, pVal.z, NaN, true);
break;
case 'q':
var qVal = values[o];
strFormat = JU.PT.formatString (strFormat, "q", null, qVal.x, NaN, true);
strFormat = JU.PT.formatString (strFormat, "q", null, qVal.y, NaN, true);
strFormat = JU.PT.formatString (strFormat, "q", null, qVal.z, NaN, true);
strFormat = JU.PT.formatString (strFormat, "q", null, qVal.w, NaN, true);
break;
case 'S':
var sVal = values[o];
for (var i = 0; i < sVal.length; i++) strFormat = JU.PT.formatString (strFormat, "s", sVal[i], NaN, NaN, true);

break;
case 'F':
var fVal = values[o];
for (var i = 0; i < fVal.length; i++) strFormat = JU.PT.formatString (strFormat, "f", null, fVal[i], NaN, true);

break;
case 'I':
var iVal = values[o];
for (var i = 0; i < iVal.length; i++) strFormat = JU.PT.formatString (strFormat, "d", "" + iVal[i], NaN, NaN, true);

for (var i = 0; i < iVal.length; i++) strFormat = JU.PT.formatString (strFormat, "i", "" + iVal[i], NaN, NaN, true);

break;
case 'D':
var dVal = values[o];
for (var i = 0; i < dVal.length; i++) strFormat = JU.PT.formatString (strFormat, "e", null, NaN, dVal[i], true);

}
}
return JU.PT.rep (strFormat, "%%", "%");
} catch (e) {
if (Clazz_exceptionOf (e, Exception)) {
} else {
throw e;
}
}
System.out.println ("TextFormat.sprintf error " + list + " " + strFormat);
return JU.PT.rep (strFormat, "%", "?");
}, "~S,~S,~A");
c$.formatCheck = Clazz_defineMethod (c$, "formatCheck", 
function (strFormat) {
if (strFormat == null || strFormat.indexOf ('p') < 0 && strFormat.indexOf ('q') < 0) return strFormat;
strFormat = JU.PT.rep (strFormat, "%%", "\1");
strFormat = JU.PT.rep (strFormat, "%p", "%6.2p");
strFormat = JU.PT.rep (strFormat, "%q", "%6.2q");
var format = JU.PT.split (strFormat, "%");
var sb =  new JU.SB ();
sb.append (format[0]);
for (var i = 1; i < format.length; i++) {
var f = "%" + format[i];
var pt;
if (f.length >= 3) {
if ((pt = f.indexOf ('p')) >= 0) f = JU.PT.fdup (f, pt, 3);
if ((pt = f.indexOf ('q')) >= 0) f = JU.PT.fdup (f, pt, 4);
}sb.append (f);
}
return sb.toString ().$replace ('\1', '%');
}, "~S");
c$.leftJustify = Clazz_defineMethod (c$, "leftJustify", 
function (s, s1, s2) {
s.append (s2);
var n = s1.length - s2.length;
if (n > 0) s.append (s1.substring (0, n));
}, "JU.SB,~S,~S");
c$.rightJustify = Clazz_defineMethod (c$, "rightJustify", 
function (s, s1, s2) {
var n = s1.length - s2.length;
if (n > 0) s.append (s1.substring (0, n));
s.append (s2);
}, "JU.SB,~S,~S");
c$.safeTruncate = Clazz_defineMethod (c$, "safeTruncate", 
function (f, n) {
if (f > -0.001 && f < 0.001) f = 0;
return (f + "         ").substring (0, n);
}, "~N,~N");
c$.isWild = Clazz_defineMethod (c$, "isWild", 
function (s) {
return s != null && (s.indexOf ("*") >= 0 || s.indexOf ("?") >= 0);
}, "~S");
c$.isMatch = Clazz_defineMethod (c$, "isMatch", 
function (search, match, checkStar, allowInitialStar) {
if (search.equals (match)) return true;
var mLen = match.length;
if (mLen == 0) return false;
var isStar0 = (checkStar && allowInitialStar ? match.charAt (0) == '*' : false);
if (mLen == 1 && isStar0) return true;
var isStar1 = (checkStar && match.endsWith ("*"));
var haveQ = (match.indexOf ('?') >= 0);
if (!haveQ) {
if (isStar0) return (isStar1 ? (mLen < 3 || search.indexOf (match.substring (1, mLen - 1)) >= 0) : search.endsWith (match.substring (1)));
 else if (isStar1) return search.startsWith (match.substring (0, mLen - 1));
}var sLen = search.length;
var qqqq = "????";
var nq = 4;
while (nq < sLen) {
qqqq += qqqq;
nq += 4;
}
if (checkStar) {
if (isStar0) {
match = qqqq + match.substring (1);
mLen += nq - 1;
}if (isStar1) {
match = match.substring (0, mLen - 1) + qqqq;
mLen += nq - 1;
}}if (mLen < sLen) return false;
var ich = 0;
while (mLen > sLen) {
if (allowInitialStar && match.charAt (ich) == '?') {
++ich;
} else if (match.charAt (ich + mLen - 1) != '?') {
return false;
}--mLen;
}
for (var i = sLen; --i >= 0; ) {
var chm = match.charAt (ich + i);
if (chm == '?') continue;
var chs = search.charAt (i);
if (chm != chs && (chm != '\1' || chs != '?')) return false;
}
return true;
}, "~S,~S,~B,~B");
c$.replaceQuotedStrings = Clazz_defineMethod (c$, "replaceQuotedStrings", 
function (s, list, newList) {
var n = list.size ();
for (var i = 0; i < n; i++) {
var name = list.get (i);
var newName = newList.get (i);
if (!newName.equals (name)) s = JU.PT.rep (s, "\"" + name + "\"", "\"" + newName + "\"");
}
return s;
}, "~S,JU.Lst,JU.Lst");
c$.replaceStrings = Clazz_defineMethod (c$, "replaceStrings", 
function (s, list, newList) {
var n = list.size ();
for (var i = 0; i < n; i++) {
var name = list.get (i);
var newName = newList.get (i);
if (!newName.equals (name)) s = JU.PT.rep (s, name, newName);
}
return s;
}, "~S,JU.Lst,JU.Lst");
c$.isDigit = Clazz_defineMethod (c$, "isDigit", 
function (ch) {
var c = (ch).charCodeAt (0);
return (48 <= c && c <= 57);
}, "~S");
c$.isUpperCase = Clazz_defineMethod (c$, "isUpperCase", 
function (ch) {
var c = (ch).charCodeAt (0);
return (65 <= c && c <= 90);
}, "~S");
c$.isLowerCase = Clazz_defineMethod (c$, "isLowerCase", 
function (ch) {
var c = (ch).charCodeAt (0);
return (97 <= c && c <= 122);
}, "~S");
c$.isLetter = Clazz_defineMethod (c$, "isLetter", 
function (ch) {
var c = (ch).charCodeAt (0);
return (65 <= c && c <= 90 || 97 <= c && c <= 122);
}, "~S");
c$.isLetterOrDigit = Clazz_defineMethod (c$, "isLetterOrDigit", 
function (ch) {
var c = (ch).charCodeAt (0);
return (65 <= c && c <= 90 || 97 <= c && c <= 122 || 48 <= c && c <= 57);
}, "~S");
c$.isWhitespace = Clazz_defineMethod (c$, "isWhitespace", 
function (ch) {
var c = (ch).charCodeAt (0);
return (c >= 0x1c && c <= 0x20 || c >= 0x9 && c <= 0xd);
}, "~S");
c$.fixPtFloats = Clazz_defineMethod (c$, "fixPtFloats", 
function (pt, f) {
pt.x = Math.round (pt.x * f) / f;
pt.y = Math.round (pt.y * f) / f;
pt.z = Math.round (pt.z * f) / f;
}, "JU.T3,~N");
c$.fixDouble = Clazz_defineMethod (c$, "fixDouble", 
function (d, f) {
return Math.round (d * f) / f;
}, "~N,~N");
c$.parseFloatFraction = Clazz_defineMethod (c$, "parseFloatFraction", 
function (s) {
var pt = s.indexOf ("/");
return (pt < 0 ? JU.PT.parseFloat (s) : JU.PT.parseFloat (s.substring (0, pt)) / JU.PT.parseFloat (s.substring (pt + 1)));
}, "~S");
Clazz_defineStatics (c$,
"tensScale",  Clazz_newFloatArray (-1, [10, 100, 1000, 10000, 100000, 1000000]),
"decimalScale",  Clazz_newFloatArray (-1, [0.1, 0.01, 0.001, 0.0001, 0.00001, 0.000001, 0.0000001, 0.00000001, 0.000000001]),
"FLOAT_MIN_SAFE", 2E-45,
"escapable", "\\\\\tt\rr\nn\"\"",
"FRACTIONAL_PRECISION", 100000,
"CARTESIAN_PRECISION", 10000);
});
Clazz_declarePackage ("JU");
c$ = Clazz_decorateAsClass (function () {
this.sb = null;
this.s = null;
Clazz_instantialize (this, arguments);
}, JU, "SB");
Clazz_makeConstructor (c$, 
function () {
{
this.s = "";
}});
c$.newN = Clazz_defineMethod (c$, "newN", 
function (n) {
{
return new JU.SB();
}}, "~N");
c$.newS = Clazz_defineMethod (c$, "newS", 
function (s) {
{
var sb = new JU.SB();
sb.s = s;
return sb;
}}, "~S");
Clazz_defineMethod (c$, "append", 
function (s) {
{
this.s += s
}return this;
}, "~S");
Clazz_defineMethod (c$, "appendC", 
function (c) {
{
this.s += c;
}return this;
}, "~S");
Clazz_defineMethod (c$, "appendI", 
function (i) {
{
this.s += i
}return this;
}, "~N");
Clazz_defineMethod (c$, "appendB", 
function (b) {
{
this.s += b
}return this;
}, "~B");
Clazz_defineMethod (c$, "appendF", 
function (f) {
{
var sf = "" + f;
if (sf.indexOf(".") < 0 && sf.indexOf("e") < 0)
sf += ".0" ;
this.s += sf;
}return this;
}, "~N");
Clazz_defineMethod (c$, "appendD", 
function (d) {
{
var sf = "" + d;
if (sf.indexOf(".") < 0 && sf.indexOf("e") < 0)
sf += ".0" ;
this.s += sf;
}return this;
}, "~N");
Clazz_defineMethod (c$, "appendSB", 
function (buf) {
{
this.s += buf.s;
}return this;
}, "JU.SB");
Clazz_defineMethod (c$, "appendO", 
function (data) {
if (data != null) {
{
this.s += data.toString();
}}return this;
}, "~O");
Clazz_defineMethod (c$, "appendCB", 
function (cb, off, len) {
{
this.s += cb.slice(off,off+len).join("");
}}, "~A,~N,~N");
Clazz_overrideMethod (c$, "toString", 
function () {
{
return this.s;
}});
Clazz_defineMethod (c$, "length", 
function () {
{
return this.s.length;
}});
Clazz_defineMethod (c$, "indexOf", 
function (s) {
{
return this.s.indexOf(s);
}}, "~S");
Clazz_defineMethod (c$, "charAt", 
function (i) {
{
return this.s.charAt(i);
}}, "~N");
Clazz_defineMethod (c$, "charCodeAt", 
function (i) {
{
return this.s.charCodeAt(i);
}}, "~N");
Clazz_defineMethod (c$, "setLength", 
function (n) {
{
this.s = this.s.substring(0, n);
}}, "~N");
Clazz_defineMethod (c$, "lastIndexOf", 
function (s) {
{
return this.s.lastIndexOf(s);
}}, "~S");
Clazz_defineMethod (c$, "indexOf2", 
function (s, i) {
{
return this.s.indexOf(s, i);
}}, "~S,~N");
Clazz_defineMethod (c$, "substring", 
function (i) {
{
return this.s.substring(i);
}}, "~N");
Clazz_defineMethod (c$, "substring2", 
function (i, j) {
{
return this.s.substring(i, j);
}}, "~N,~N");
Clazz_defineMethod (c$, "toBytes", 
function (off, len) {
if (len == 0) return  Clazz_newByteArray (0, 0);
var cs;
{
cs = "UTF-8";
}return (len > 0 ? this.substring2 (off, off + len) : off == 0 ? this.toString () : this.substring2 (off, this.length () - off)).getBytes (cs);
}, "~N,~N");
Clazz_defineMethod (c$, "replace", 
function (start, end, str) {
{
this.s = this.s.substring(0, start) + str + this.s.substring(end);
}}, "~N,~N,~S");
Clazz_defineMethod (c$, "insert", 
function (offset, str) {
this.replace (offset, offset, str);
}, "~N,~S");
Clazz_declarePackage ("JU");
Clazz_load (["javajs.api.JSONEncodable"], "JU.T3", ["java.lang.Float"], function () {
c$ = Clazz_decorateAsClass (function () {
this.x = 0;
this.y = 0;
this.z = 0;
Clazz_instantialize (this, arguments);
}, JU, "T3", null, [javajs.api.JSONEncodable, java.io.Serializable]);
Clazz_defineMethod (c$, "set", 
function (x, y, z) {
this.x = x;
this.y = y;
this.z = z;
}, "~N,~N,~N");
Clazz_defineMethod (c$, "setA", 
function (t) {
this.x = t[0];
this.y = t[1];
this.z = t[2];
}, "~A");
Clazz_defineMethod (c$, "setT", 
function (t1) {
this.x = t1.x;
this.y = t1.y;
this.z = t1.z;
}, "JU.T3");
Clazz_defineMethod (c$, "add2", 
function (t1, t2) {
this.x = t1.x + t2.x;
this.y = t1.y + t2.y;
this.z = t1.z + t2.z;
}, "JU.T3,JU.T3");
Clazz_defineMethod (c$, "add", 
function (t1) {
this.x += t1.x;
this.y += t1.y;
this.z += t1.z;
}, "JU.T3");
Clazz_defineMethod (c$, "distanceSquared", 
function (p1) {
var dx = this.x - p1.x;
var dy = this.y - p1.y;
var dz = this.z - p1.z;
return (dx * dx + dy * dy + dz * dz);
}, "JU.T3");
Clazz_defineMethod (c$, "distance", 
function (p1) {
return Math.sqrt (this.distanceSquared (p1));
}, "JU.T3");
Clazz_defineMethod (c$, "sub2", 
function (t1, t2) {
this.x = t1.x - t2.x;
this.y = t1.y - t2.y;
this.z = t1.z - t2.z;
}, "JU.T3,JU.T3");
Clazz_defineMethod (c$, "sub", 
function (t1) {
this.x -= t1.x;
this.y -= t1.y;
this.z -= t1.z;
}, "JU.T3");
Clazz_defineMethod (c$, "scale", 
function (s) {
this.x *= s;
this.y *= s;
this.z *= s;
}, "~N");
Clazz_defineMethod (c$, "add3", 
function (a, b, c) {
this.x += a;
this.y += b;
this.z += c;
}, "~N,~N,~N");
Clazz_defineMethod (c$, "scaleT", 
function (p) {
this.x *= p.x;
this.y *= p.y;
this.z *= p.z;
}, "JU.T3");
Clazz_defineMethod (c$, "scaleAdd2", 
function (s, t1, t2) {
this.x = s * t1.x + t2.x;
this.y = s * t1.y + t2.y;
this.z = s * t1.z + t2.z;
}, "~N,JU.T3,JU.T3");
Clazz_defineMethod (c$, "ave", 
function (a, b) {
this.x = (a.x + b.x) / 2;
this.y = (a.y + b.y) / 2;
this.z = (a.z + b.z) / 2;
}, "JU.T3,JU.T3");
Clazz_defineMethod (c$, "dot", 
function (v) {
return this.x * v.x + this.y * v.y + this.z * v.z;
}, "JU.T3");
Clazz_defineMethod (c$, "lengthSquared", 
function () {
return this.x * this.x + this.y * this.y + this.z * this.z;
});
Clazz_defineMethod (c$, "length", 
function () {
return Math.sqrt (this.lengthSquared ());
});
Clazz_defineMethod (c$, "normalize", 
function () {
var d = this.length ();
this.x /= d;
this.y /= d;
this.z /= d;
});
Clazz_defineMethod (c$, "cross", 
function (v1, v2) {
this.set (v1.y * v2.z - v1.z * v2.y, v1.z * v2.x - v1.x * v2.z, v1.x * v2.y - v1.y * v2.x);
}, "JU.T3,JU.T3");
Clazz_overrideMethod (c$, "hashCode", 
function () {
var bits = 1;
bits = 31 * bits + JU.T3.floatToIntBits (this.x);
bits = 31 * bits + JU.T3.floatToIntBits (this.y);
bits = 31 * bits + JU.T3.floatToIntBits (this.z);
return (bits ^ (bits >> 32));
});
c$.floatToIntBits = Clazz_defineMethod (c$, "floatToIntBits", 
function (x) {
return (x == 0 ? 0 : Float.floatToIntBits (x));
}, "~N");
Clazz_overrideMethod (c$, "equals", 
function (t1) {
if (!(Clazz_instanceOf (t1, JU.T3))) return false;
var t2 = t1;
return (this.x == t2.x && this.y == t2.y && this.z == t2.z);
}, "~O");
Clazz_overrideMethod (c$, "toString", 
function () {
return "{" + this.x + ", " + this.y + ", " + this.z + "}";
});
Clazz_overrideMethod (c$, "toJSON", 
function () {
return "[" + this.x + "," + this.y + "," + this.z + "]";
});
});
Clazz_declarePackage ("JU");
c$ = Clazz_decorateAsClass (function () {
this.x = 0;
this.y = 0;
this.z = 0;
Clazz_instantialize (this, arguments);
}, JU, "T3i", null, java.io.Serializable);
Clazz_makeConstructor (c$, 
function () {
});
Clazz_defineMethod (c$, "set", 
function (x, y, z) {
this.x = x;
this.y = y;
this.z = z;
}, "~N,~N,~N");
Clazz_defineMethod (c$, "setT", 
function (t1) {
this.x = t1.x;
this.y = t1.y;
this.z = t1.z;
}, "JU.T3i");
Clazz_defineMethod (c$, "add", 
function (t) {
this.x += t.x;
this.y += t.y;
this.z += t.z;
}, "JU.T3i");
Clazz_defineMethod (c$, "scaleAdd", 
function (s, t1, t2) {
this.x = s * t1.x + t2.x;
this.y = s * t1.y + t2.y;
this.z = s * t1.z + t2.z;
}, "~N,JU.T3i,JU.T3i");
Clazz_overrideMethod (c$, "hashCode", 
function () {
return this.x ^ this.y ^ this.z;
});
Clazz_overrideMethod (c$, "equals", 
function (o) {
if (!(Clazz_instanceOf (o, JU.T3i))) return false;
var t = o;
return (this.x == t.x && this.y == t.y && this.z == t.z);
}, "~O");
Clazz_overrideMethod (c$, "toString", 
function () {
return "(" + this.x + ", " + this.y + ", " + this.z + ")";
});
Clazz_declarePackage ("JU");
Clazz_load (["JU.T3"], "JU.T4", null, function () {
c$ = Clazz_decorateAsClass (function () {
this.w = 0;
Clazz_instantialize (this, arguments);
}, JU, "T4", JU.T3);
Clazz_defineMethod (c$, "set4", 
function (x, y, z, w) {
this.x = x;
this.y = y;
this.z = z;
this.w = w;
}, "~N,~N,~N,~N");
Clazz_defineMethod (c$, "scale4", 
function (s) {
this.scale (s);
this.w *= s;
}, "~N");
Clazz_overrideMethod (c$, "hashCode", 
function () {
return JU.T3.floatToIntBits (this.x) ^ JU.T3.floatToIntBits (this.y) ^ JU.T3.floatToIntBits (this.z) ^ JU.T3.floatToIntBits (this.w);
});
Clazz_overrideMethod (c$, "equals", 
function (o) {
if (!(Clazz_instanceOf (o, JU.T4))) return false;
var t = o;
return (this.x == t.x && this.y == t.y && this.z == t.z && this.w == t.w);
}, "~O");
Clazz_overrideMethod (c$, "toString", 
function () {
return "(" + this.x + ", " + this.y + ", " + this.z + ", " + this.w + ")";
});
Clazz_overrideMethod (c$, "toJSON", 
function () {
return "[" + this.x + ", " + this.y + ", " + this.z + ", " + this.w + "]";
});
});
Clazz_declarePackage ("JU");
Clazz_load (["JU.T3"], "JU.V3", null, function () {
c$ = Clazz_declareType (JU, "V3", JU.T3);
Clazz_makeConstructor (c$, 
function () {
});
c$.newV = Clazz_defineMethod (c$, "newV", 
function (t) {
return JU.V3.new3 (t.x, t.y, t.z);
}, "JU.T3");
c$.newVsub = Clazz_defineMethod (c$, "newVsub", 
function (t1, t2) {
return JU.V3.new3 (t1.x - t2.x, t1.y - t2.y, t1.z - t2.z);
}, "JU.T3,JU.T3");
c$.new3 = Clazz_defineMethod (c$, "new3", 
function (x, y, z) {
var v =  new JU.V3 ();
v.x = x;
v.y = y;
v.z = z;
return v;
}, "~N,~N,~N");
Clazz_defineMethod (c$, "angle", 
function (v1) {
var xx = this.y * v1.z - this.z * v1.y;
var yy = this.z * v1.x - this.x * v1.z;
var zz = this.x * v1.y - this.y * v1.x;
var cross = Math.sqrt (xx * xx + yy * yy + zz * zz);
return Math.abs (Math.atan2 (cross, this.dot (v1)));
}, "JU.V3");
});
Clazz_declarePackage ("JU");
Clazz_load (["JU.LoggerInterface"], "JU.DefaultLogger", ["JU.Logger"], function () {
c$ = Clazz_declareType (JU, "DefaultLogger", null, JU.LoggerInterface);
Clazz_defineMethod (c$, "log", 
function (out, level, txt, e) {
if (out === System.err) System.out.flush ();
if ((out != null) && ((txt != null) || (e != null))) {
txt = (txt != null ? txt : "");
out.println ((JU.Logger.logLevel () ? "[" + JU.Logger.getLevel (level) + "] " : "") + txt + (e != null ? ": " + e.toString () : ""));
if (e != null) {
var elements = e.getStackTrace ();
if (elements != null) {
for (var i = 0; i < elements.length; i++) {
out.println (elements[i].getClassName () + " - " + elements[i].getLineNumber () + " - " + elements[i].getMethodName ());
}
}}}if (out === System.err) System.err.flush ();
}, "java.io.PrintStream,~N,~S,Throwable");
Clazz_overrideMethod (c$, "debug", 
function (txt) {
this.log (System.out, 5, txt, null);
}, "~S");
Clazz_overrideMethod (c$, "info", 
function (txt) {
this.log (System.out, 4, txt, null);
}, "~S");
Clazz_overrideMethod (c$, "warn", 
function (txt) {
this.log (System.out, 3, txt, null);
}, "~S");
Clazz_overrideMethod (c$, "warnEx", 
function (txt, e) {
this.log (System.out, 3, txt, e);
}, "~S,Throwable");
Clazz_overrideMethod (c$, "error", 
function (txt) {
this.log (System.err, 2, txt, null);
}, "~S");
Clazz_overrideMethod (c$, "errorEx", 
function (txt, e) {
this.log (System.err, 2, txt, e);
}, "~S,Throwable");
Clazz_overrideMethod (c$, "fatal", 
function (txt) {
this.log (System.err, 1, txt, null);
}, "~S");
Clazz_overrideMethod (c$, "fatalEx", 
function (txt, e) {
this.log (System.err, 1, txt, e);
}, "~S,Throwable");
});
Clazz_declarePackage ("JU");
Clazz_load (["java.util.Hashtable", "JU.DefaultLogger"], "JU.Logger", ["java.lang.Long"], function () {
c$ = Clazz_declareType (JU, "Logger");
c$.getProperty = Clazz_defineMethod (c$, "getProperty", 
 function (level, defaultValue) {
try {
var property = System.getProperty ("jmol.logger." + level, null);
if (property != null) {
return (property.equalsIgnoreCase ("true"));
}} catch (e) {
if (Clazz_exceptionOf (e, Exception)) {
} else {
throw e;
}
}
return defaultValue;
}, "~S,~B");
c$.setLogger = Clazz_defineMethod (c$, "setLogger", 
function (logger) {
JU.Logger._logger = logger;
JU.Logger.debugging = JU.Logger.isActiveLevel (5) || JU.Logger.isActiveLevel (6);
JU.Logger.debuggingHigh = (JU.Logger.debugging && JU.Logger._activeLevels[6]);
}, "JU.LoggerInterface");
c$.isActiveLevel = Clazz_defineMethod (c$, "isActiveLevel", 
function (level) {
return JU.Logger._logger != null && level >= 0 && level < 7 && JU.Logger._activeLevels[level];
}, "~N");
c$.setActiveLevel = Clazz_defineMethod (c$, "setActiveLevel", 
function (level, active) {
if (level < 0) level = 0;
if (level >= 7) level = 6;
JU.Logger._activeLevels[level] = active;
JU.Logger.debugging = JU.Logger.isActiveLevel (5) || JU.Logger.isActiveLevel (6);
JU.Logger.debuggingHigh = (JU.Logger.debugging && JU.Logger._activeLevels[6]);
}, "~N,~B");
c$.setLogLevel = Clazz_defineMethod (c$, "setLogLevel", 
function (level) {
for (var i = 7; --i >= 0; ) JU.Logger.setActiveLevel (i, i <= level);

}, "~N");
c$.getLevel = Clazz_defineMethod (c$, "getLevel", 
function (level) {
switch (level) {
case 6:
return "DEBUGHIGH";
case 5:
return "DEBUG";
case 4:
return "INFO";
case 3:
return "WARN";
case 2:
return "ERROR";
case 1:
return "FATAL";
}
return "????";
}, "~N");
c$.logLevel = Clazz_defineMethod (c$, "logLevel", 
function () {
return JU.Logger._logLevel;
});
c$.doLogLevel = Clazz_defineMethod (c$, "doLogLevel", 
function (log) {
JU.Logger._logLevel = log;
}, "~B");
c$.debug = Clazz_defineMethod (c$, "debug", 
function (txt) {
if (!JU.Logger.debugging) return;
try {
JU.Logger._logger.debug (txt);
} catch (t) {
}
}, "~S");
c$.info = Clazz_defineMethod (c$, "info", 
function (txt) {
try {
if (JU.Logger.isActiveLevel (4)) {
JU.Logger._logger.info (txt);
}} catch (t) {
}
}, "~S");
c$.warn = Clazz_defineMethod (c$, "warn", 
function (txt) {
try {
if (JU.Logger.isActiveLevel (3)) {
JU.Logger._logger.warn (txt);
}} catch (t) {
}
}, "~S");
c$.warnEx = Clazz_defineMethod (c$, "warnEx", 
function (txt, e) {
try {
if (JU.Logger.isActiveLevel (3)) {
JU.Logger._logger.warnEx (txt, e);
}} catch (t) {
}
}, "~S,Throwable");
c$.error = Clazz_defineMethod (c$, "error", 
function (txt) {
try {
if (JU.Logger.isActiveLevel (2)) {
JU.Logger._logger.error (txt);
}} catch (t) {
}
}, "~S");
c$.errorEx = Clazz_defineMethod (c$, "errorEx", 
function (txt, e) {
try {
if (JU.Logger.isActiveLevel (2)) {
JU.Logger._logger.errorEx (txt, e);
}} catch (t) {
}
}, "~S,Throwable");
c$.getLogLevel = Clazz_defineMethod (c$, "getLogLevel", 
function () {
for (var i = 7; --i >= 0; ) if (JU.Logger.isActiveLevel (i)) return i;

return 0;
});
c$.fatal = Clazz_defineMethod (c$, "fatal", 
function (txt) {
try {
if (JU.Logger.isActiveLevel (1)) {
JU.Logger._logger.fatal (txt);
}} catch (t) {
}
}, "~S");
c$.fatalEx = Clazz_defineMethod (c$, "fatalEx", 
function (txt, e) {
try {
if (JU.Logger.isActiveLevel (1)) {
JU.Logger._logger.fatalEx (txt, e);
}} catch (t) {
}
}, "~S,Throwable");
c$.startTimer = Clazz_defineMethod (c$, "startTimer", 
function (msg) {
if (msg != null) JU.Logger.htTiming.put (msg, Long.$valueOf (System.currentTimeMillis ()));
}, "~S");
c$.getTimerMsg = Clazz_defineMethod (c$, "getTimerMsg", 
function (msg, time) {
if (time == 0) time = JU.Logger.getTimeFrom (msg);
return "Time for " + msg + ": " + (time) + " ms";
}, "~S,~N");
c$.getTimeFrom = Clazz_defineMethod (c$, "getTimeFrom", 
 function (msg) {
var t;
return (msg == null || (t = JU.Logger.htTiming.get (msg)) == null ? -1 : System.currentTimeMillis () - t.longValue ());
}, "~S");
c$.checkTimer = Clazz_defineMethod (c$, "checkTimer", 
function (msg, andReset) {
var time = JU.Logger.getTimeFrom (msg);
if (time >= 0 && !msg.startsWith ("(")) JU.Logger.info (JU.Logger.getTimerMsg (msg, time));
if (andReset) JU.Logger.startTimer (msg);
return time;
}, "~S,~B");
c$.checkMemory = Clazz_defineMethod (c$, "checkMemory", 
function () {
var bTotal = 0;
var bFree = 0;
var bMax = 0;
{
}JU.Logger.info ("Memory: Total-Free=" + (bTotal - bFree) + "; Total=" + bTotal + "; Free=" + bFree + "; Max=" + bMax);
});
c$._logger = c$.prototype._logger =  new JU.DefaultLogger ();
Clazz_defineStatics (c$,
"LEVEL_FATAL", 1,
"LEVEL_ERROR", 2,
"LEVEL_WARN", 3,
"LEVEL_INFO", 4,
"LEVEL_DEBUG", 5,
"LEVEL_DEBUGHIGH", 6,
"LEVEL_MAX", 7,
"_activeLevels",  Clazz_newBooleanArray (7, false),
"_logLevel", false,
"debugging", false,
"debuggingHigh", false);
{
JU.Logger._activeLevels[6] = JU.Logger.getProperty ("debugHigh", false);
JU.Logger._activeLevels[5] = JU.Logger.getProperty ("debug", false);
JU.Logger._activeLevels[4] = JU.Logger.getProperty ("info", true);
JU.Logger._activeLevels[3] = JU.Logger.getProperty ("warn", true);
JU.Logger._activeLevels[2] = JU.Logger.getProperty ("error", true);
JU.Logger._activeLevels[1] = JU.Logger.getProperty ("fatal", true);
JU.Logger._logLevel = JU.Logger.getProperty ("logLevel", false);
JU.Logger.debugging = (JU.Logger._logger != null && (JU.Logger._activeLevels[5] || JU.Logger._activeLevels[6]));
JU.Logger.debuggingHigh = (JU.Logger.debugging && JU.Logger._activeLevels[6]);
}c$.htTiming = c$.prototype.htTiming =  new java.util.Hashtable ();
});
Clazz_declarePackage ("JU");
Clazz_declareInterface (JU, "LoggerInterface");
Clazz_declarePackage ("J.api");
Clazz_declareInterface (J.api, "JmolJDXMOLParser");
Clazz_declarePackage ("J.api");
Clazz_declareInterface (J.api, "JmolJDXMOLReader");
Clazz_declarePackage ("J.jsv");
Clazz_load (["J.api.JmolJDXMOLParser"], "J.jsv.JDXMOLParser", ["java.util.Hashtable", "JU.BS", "$.Lst", "$.PT", "$.SB", "JU.Logger"], function () {
c$ = Clazz_decorateAsClass (function () {
this.line = null;
this.lastModel = "";
this.thisModelID = null;
this.baseModel = null;
this.vibScale = 0;
this.piUnitsX = null;
this.piUnitsY = null;
this.loader = null;
this.modelIdList = "";
this.peakIndex = null;
this.peakFilePath = null;
Clazz_instantialize (this, arguments);
}, J.jsv, "JDXMOLParser", null, J.api.JmolJDXMOLParser);
Clazz_makeConstructor (c$, 
function () {
});
Clazz_overrideMethod (c$, "set", 
function (loader, filePath, htParams) {
this.loader = loader;
this.peakFilePath = filePath;
this.peakIndex =  Clazz_newIntArray (1, 0);
if (htParams != null) {
htParams.remove ("modelNumber");
if (htParams.containsKey ("zipSet")) {
this.peakIndex = htParams.get ("peakIndex");
if (this.peakIndex == null) {
this.peakIndex =  Clazz_newIntArray (1, 0);
htParams.put ("peakIndex", this.peakIndex);
}if (!htParams.containsKey ("subFileName")) this.peakFilePath = JU.PT.split (filePath, "|")[0];
}}return this;
}, "J.api.JmolJDXMOLReader,~S,java.util.Map");
Clazz_overrideMethod (c$, "getAttribute", 
function (line, tag) {
var attr = JU.PT.getQuotedAttribute (line, tag);
return (attr == null ? "" : attr);
}, "~S,~S");
Clazz_overrideMethod (c$, "getRecord", 
function (key) {
if (this.line == null || this.line.indexOf (key) < 0) return null;
var s = this.line;
while (s.indexOf (">") < 0) s += " " + this.readLine ();

return this.line = s;
}, "~S");
Clazz_overrideMethod (c$, "readModels", 
function () {
if (!this.findRecord ("Models")) return false;
this.line = "";
this.thisModelID = "";
var isFirst = true;
while (true) {
this.line = this.loader.discardLinesUntilNonBlank ();
if (this.getRecord ("<ModelData") == null) break;
this.getModelData (isFirst);
isFirst = false;
}
return true;
});
Clazz_overrideMethod (c$, "readACDMolFile", 
function () {
var sb =  new JU.SB ();
sb.append (this.line.substring (this.line.indexOf ("=") + 1)).appendC ('\n');
while (this.readLine () != null && !this.line.contains ("$$$$")) sb.append (this.line).appendC ('\n');

return JU.PT.rep (sb.toString (), "  $$ Empty String", "");
});
Clazz_overrideMethod (c$, "readACDAssignments", 
function (nPoints, isPeakAssignment) {
var list =  new JU.Lst ();
try {
this.readLine ();
if (nPoints < 0) nPoints = 2147483647;
for (var i = 0; i < nPoints; i++) {
var s = this.readLine ();
if (s == null || s.indexOf ("#") == 0) break;
if (isPeakAssignment) {
while (s.indexOf (">") < 0) s += " " + this.readLine ();

s = s.trim ();
}s = JU.PT.replaceAllCharacters (s, "()<>", " ").trim ();
if (s.length == 0) break;
var pt = s.indexOf ("'");
if (pt >= 0) {
var pt2 = s.indexOf ("'", pt + 1);
s = s.substring (0, pt) + JU.PT.rep (s.substring (pt + 1, pt2), ",", ";") + s.substring (pt2 + 1);
}JU.Logger.info ("Peak Assignment: " + s);
var tokens = JU.PT.split (s, ",");
list.addLast (tokens);
}
} catch (e) {
if (Clazz_exceptionOf (e, Exception)) {
JU.Logger.error ("Error reading peak assignments at " + this.line + ": " + e);
} else {
throw e;
}
}
return list;
}, "~N,~B");
Clazz_overrideMethod (c$, "setACDAssignments", 
function (model, mytype, peakCount, acdlist, molFile) {
try {
if (peakCount >= 0) this.peakIndex =  Clazz_newIntArray (-1, [peakCount]);
var isMS = (mytype.indexOf ("MASS") == 0);
var file = " file=" + JU.PT.esc (this.peakFilePath.$replace ('\\', '/'));
model = " model=" + JU.PT.esc (model + " (assigned)");
this.piUnitsX = "";
this.piUnitsY = "";
var dx = this.getACDPeakWidth (mytype) / 2;
var htSets =  new java.util.Hashtable ();
var list =  new JU.Lst ();
var zzcMap = null;
var ptx;
var pta;
var nAtoms = 0;
if (isMS) {
zzcMap =  new java.util.Hashtable ();
var tokens = JU.PT.split (molFile, "M  ZZC");
for (var i = tokens.length; --i >= 1; ) {
var ab = JU.PT.getTokens (tokens[i]);
nAtoms = Math.max (nAtoms, JU.PT.parseInt (ab[0]));
zzcMap.put (ab[1], ab[0]);
}
ptx = 4;
pta = 0;
} else if (mytype.indexOf ("NMR") >= 0) {
ptx = 0;
pta = 3;
} else {
ptx = 0;
pta = 2;
}var nPeaks = acdlist.size ();
for (var i = 0; i < nPeaks; i++) {
var data = acdlist.get (i);
var x = JU.PT.parseFloat (data[ptx]);
var a = data[pta];
if (isMS) a = this.fixACDAtomList (a, zzcMap, nAtoms);
 else a = a.$replace (';', ',');
if (a.indexOf ("select") >= 0) {
var pt = a.indexOf ("select atomno=");
if (pt < 0) continue;
a = JU.PT.split (a.substring (pt + 14), " ")[0];
}var title = (isMS ? "m/z=" + Math.round (x) + ": " + data[2] + " (" + data[1] + ")" : pta == 2 ? "" + (Math.round (x * 10) / 10) : null);
this.getStringInfo (file, title, mytype, model, a, htSets, "" + x, list, " atoms=\"%ATOMS%\" xMin=\"" + (x - dx) + "\" xMax=\"" + (x + dx) + "\">");
}
return this.setPeakData (list, 0);
} catch (e) {
if (Clazz_exceptionOf (e, Exception)) {
return 0;
} else {
throw e;
}
}
}, "~S,~S,~N,JU.Lst,~S");
Clazz_defineMethod (c$, "fixACDAtomList", 
 function (atoms, zzcMap, nAtoms) {
atoms = atoms.trim ();
var tokens = JU.PT.getTokens (atoms.$replace (';', ' '));
var bs =  new JU.BS ();
var isM = false;
for (var i = 0; i < tokens.length; i++) {
var a = tokens[i];
isM = (a.indexOf ("M") >= 0);
if (isM) a = "1-" + nAtoms;
var pt = a.indexOf ('-');
if (pt >= 0) {
var i1 = JU.PT.parseInt (a.substring (0, pt));
var i2 = JU.PT.parseInt (a.substring (pt + 1)) + 1;
for (var k = i1; k < i2; k++) bs.set (isM ? k : JU.PT.parseInt (zzcMap.get ("" + k)));

} else {
bs.set (JU.PT.parseInt (zzcMap.get (a)));
}}
var s = bs.toJSON ();
return s.substring (1, s.length - 1);
}, "~S,java.util.Map,~N");
Clazz_defineMethod (c$, "getACDPeakWidth", 
 function (type) {
return (type.indexOf ("HNMR") >= 0 ? 0.05 : type.indexOf ("CNMR") >= 0 ? 1 : type.indexOf ("MASS") >= 0 ? 1 : 10);
}, "~S");
Clazz_overrideMethod (c$, "readPeaks", 
function (isSignals, peakCount) {
try {
if (peakCount >= 0) this.peakIndex =  Clazz_newIntArray (-1, [peakCount]);
var offset = (isSignals ? 1 : 0);
var tag1 = (isSignals ? "Signals" : "Peaks");
var tag2 = (isSignals ? "<Signal" : "<PeakData");
if (!this.findRecord (tag1)) return 0;
var file = " file=" + JU.PT.esc (this.peakFilePath.$replace ('\\', '/'));
var model = JU.PT.getQuotedAttribute (this.line, "model");
model = " model=" + JU.PT.esc (model == null ? this.thisModelID : model);
var mytype = JU.PT.getQuotedAttribute (this.line, "type");
this.piUnitsX = JU.PT.getQuotedAttribute (this.line, "xLabel");
this.piUnitsY = JU.PT.getQuotedAttribute (this.line, "yLabel");
var htSets =  new java.util.Hashtable ();
var list =  new JU.Lst ();
while (this.readLine () != null && !(this.line = this.line.trim ()).startsWith ("</" + tag1)) {
if (this.line.startsWith (tag2)) {
this.getRecord (tag2);
JU.Logger.info (this.line);
var title = JU.PT.getQuotedAttribute (this.line, "title");
if (mytype == null) mytype = JU.PT.getQuotedAttribute (this.line, "type");
var atoms = JU.PT.getQuotedAttribute (this.line, "atoms");
var key = (Clazz_floatToInt (JU.PT.parseFloat (JU.PT.getQuotedAttribute (this.line, "xMin")) * 100)) + "_" + (Clazz_floatToInt (JU.PT.parseFloat (JU.PT.getQuotedAttribute (this.line, "xMax")) * 100));
this.getStringInfo (file, title, mytype, (JU.PT.getQuotedAttribute (this.line, "model") == null ? model : ""), atoms, htSets, key, list, this.line.substring (tag2.length).trim ());
}}
return this.setPeakData (list, offset);
} catch (e) {
if (Clazz_exceptionOf (e, Exception)) {
return 0;
} else {
throw e;
}
}
}, "~B,~N");
Clazz_defineMethod (c$, "setPeakData", 
 function (list, offset) {
var nH = 0;
var n = list.size ();
for (var i = 0; i < n; i++) {
var o = list.get (i);
var info = JU.PT.rep (o[0], "%INDEX%", "" + (++this.peakIndex[0]));
var bs = o[1];
if (bs != null) {
var s = "";
for (var j = bs.nextSetBit (0); j >= 0; j = bs.nextSetBit (j + 1)) s += "," + (j + offset);

var na = bs.cardinality ();
nH += na;
info = JU.PT.rep (info, "%ATOMS%", s.substring (1));
info = JU.PT.rep (info, "%S%", (na == 1 ? "" : "s"));
info = JU.PT.rep (info, "%NATOMS%", "" + na);
}JU.Logger.info ("adding PeakData " + info);
this.loader.addPeakData (info);
}
this.loader.setSpectrumPeaks (nH, this.piUnitsX, this.piUnitsY);
return n;
}, "JU.Lst,~N");
Clazz_defineMethod (c$, "getStringInfo", 
 function (file, title, mytype, model, atoms, htSets, key, list, more) {
if ("HNMR".equals (mytype)) mytype = "1HNMR";
 else if ("CNMR".equals (mytype)) mytype = "13CNMR";
var type = (mytype == null ? "" : " type=" + JU.PT.esc (mytype));
if (title == null) title = ("1HNMR".equals (mytype) ? "atom%S%: %ATOMS%; integration: %NATOMS%" : "");
title = " title=" + JU.PT.esc (title);
var stringInfo = "<PeakData " + file + " index=\"%INDEX%\"" + title + type + model + " " + more;
if (atoms != null) stringInfo = JU.PT.rep (stringInfo, "atoms=\"" + atoms + "\"", "atoms=\"%ATOMS%\"");
var o = htSets.get (key);
if (o == null) {
o =  Clazz_newArray (-1, [stringInfo, (atoms == null ? null :  new JU.BS ())]);
htSets.put (key, o);
list.addLast (o);
}if (atoms != null) {
var bs = o[1];
atoms = atoms.$replace (',', ' ');
if (atoms.equals ("*")) atoms = "0:1000";
bs.or (JU.BS.unescape ("({" + atoms + "})"));
}}, "~S,~S,~S,~S,~S,java.util.Map,~S,JU.Lst,~S");
Clazz_defineMethod (c$, "getModelData", 
 function (isFirst) {
this.lastModel = this.thisModelID;
this.thisModelID = this.getAttribute (this.line, "id");
var key = ";" + this.thisModelID + ";";
if (this.modelIdList.indexOf (key) >= 0) {
this.line = this.loader.discardLinesUntilContains ("</ModelData>");
return;
}this.modelIdList += key;
this.baseModel = this.getAttribute (this.line, "baseModel");
while (this.line.indexOf (">") < 0 && this.line.indexOf ("type") < 0) this.readLine ();

var modelType = this.getAttribute (this.line, "type").toLowerCase ();
this.vibScale = JU.PT.parseFloat (this.getAttribute (this.line, "vibrationScale"));
if (modelType.equals ("xyzvib")) modelType = "xyz";
 else if (modelType.length == 0) modelType = null;
var sb =  new JU.SB ();
while (this.readLine () != null && !this.line.contains ("</ModelData>")) sb.append (this.line).appendC ('\n');

this.loader.processModelData (sb.toString (), this.thisModelID, modelType, this.baseModel, this.lastModel, NaN, this.vibScale, isFirst);
}, "~B");
Clazz_defineMethod (c$, "findRecord", 
 function (tag) {
if (this.line == null) this.readLine ();
if (this.line.indexOf ("<" + tag) < 0) this.line = this.loader.discardLinesUntilContains2 ("<" + tag, "##");
return (this.line != null && this.line.indexOf ("<" + tag) >= 0);
}, "~S");
Clazz_defineMethod (c$, "readLine", 
 function () {
return this.line = this.loader.rd ();
});
Clazz_overrideMethod (c$, "setLine", 
function (s) {
this.line = s;
}, "~S");
});
Clazz_declarePackage ("JSV.api");
Clazz_declareInterface (JSV.api, "AnnotationData");
Clazz_declarePackage ("JSV.api");
Clazz_declareInterface (JSV.api, "AppletFrame");
Clazz_declarePackage ("JSV.api");
Clazz_load (["JSV.api.JSVAppletInterface", "$.ScriptInterface"], "JSV.api.JSVAppInterface", null, function () {
Clazz_declareInterface (JSV.api, "JSVAppInterface", [JSV.api.JSVAppletInterface, JSV.api.ScriptInterface]);
});
Clazz_declarePackage ("JSV.api");
Clazz_declareInterface (JSV.api, "JSVAppletInterface");
Clazz_declarePackage ("JSV.api");
Clazz_declareInterface (JSV.api, "JSVFileHelper");
Clazz_declarePackage ("JSV.api");
Clazz_load (["JSV.api.JSVViewPanel"], "JSV.api.JSVMainPanel", null, function () {
Clazz_declareInterface (JSV.api, "JSVMainPanel", JSV.api.JSVViewPanel);
});
Clazz_declarePackage ("JSV.api");
Clazz_load (["JSV.api.JSVViewPanel"], "JSV.api.JSVPanel", null, function () {
Clazz_declareInterface (JSV.api, "JSVPanel", JSV.api.JSVViewPanel);
});
Clazz_declarePackage ("JSV.api");
Clazz_declareInterface (JSV.api, "JSVTree");
Clazz_declarePackage ("JSV.api");
Clazz_declareInterface (JSV.api, "JSVTreeNode");
Clazz_declarePackage ("JSV.api");
Clazz_declareInterface (JSV.api, "JSVTreePath");
Clazz_declarePackage ("JSV.api");
Clazz_declareInterface (JSV.api, "JSVViewPanel");
Clazz_declarePackage ("JSV.api");
Clazz_declareInterface (JSV.api, "JSVZipReader");
Clazz_declarePackage ("JSV.api");
Clazz_declareInterface (JSV.api, "PanelListener");
Clazz_declarePackage ("JSV.api");
Clazz_declareInterface (JSV.api, "ScriptInterface");
Clazz_declarePackage ("JSV.app");
Clazz_load (["JSV.api.JSVAppInterface", "$.PanelListener"], "JSV.app.JSVApp", ["java.lang.Double", "JU.Lst", "$.PT", "JSV.common.Coordinate", "$.JSVFileManager", "$.JSVersion", "$.JSViewer", "$.PeakPickEvent", "$.ScriptToken", "$.SubSpecChangeEvent", "$.ZoomEvent", "JU.Logger"], function () {
c$ = Clazz_decorateAsClass (function () {
this.appletFrame = null;
this.isNewWindow = false;
this.appletReadyCallbackFunctionName = null;
this.coordCallbackFunctionName = null;
this.loadFileCallbackFunctionName = null;
this.peakCallbackFunctionName = null;
this.syncCallbackFunctionName = null;
this.vwr = null;
this.prevPanel = null;
Clazz_instantialize (this, arguments);
}, JSV.app, "JSVApp", null, [JSV.api.PanelListener, JSV.api.JSVAppInterface]);
Clazz_makeConstructor (c$, 
function (appletFrame, isJS) {
this.appletFrame = appletFrame;
this.initViewer (isJS);
this.initParams (appletFrame.getParameter ("script"));
}, "JSV.api.AppletFrame,~B");
Clazz_defineMethod (c$, "initViewer", 
 function (isJS) {
this.vwr =  new JSV.common.JSViewer (this, true, isJS);
this.appletFrame.setDropTargetListener (this.isSigned (), this.vwr);
var path = this.appletFrame.getDocumentBase ();
JSV.common.JSVFileManager.setDocumentBase (this.vwr, path);
}, "~B");
Clazz_overrideMethod (c$, "isPro", 
function () {
return this.isSigned ();
});
Clazz_overrideMethod (c$, "isSigned", 
function () {
{
return true;
}});
Clazz_defineMethod (c$, "getAppletFrame", 
function () {
return this.appletFrame;
});
Clazz_defineMethod (c$, "dispose", 
function () {
try {
this.vwr.dispose ();
} catch (e) {
if (Clazz_exceptionOf (e, Exception)) {
e.printStackTrace ();
} else {
throw e;
}
}
});
Clazz_overrideMethod (c$, "getPropertyAsJavaObject", 
function (key) {
return this.vwr.getPropertyAsJavaObject (key);
}, "~S");
Clazz_overrideMethod (c$, "getPropertyAsJSON", 
function (key) {
return JU.PT.toJSON (null, this.getPropertyAsJavaObject (key));
}, "~S");
Clazz_overrideMethod (c$, "getCoordinate", 
function () {
return this.vwr.getCoordinate ();
});
Clazz_overrideMethod (c$, "loadInline", 
function (data) {
this.siOpenDataOrFile (data, "[inline]", null, null, -1, -1, true, null, null);
this.appletFrame.validateContent (3);
}, "~S");
Clazz_overrideMethod (c$, "exportSpectrum", 
function (type, n) {
return this.vwr.$export (type, n);
}, "~S,~N");
Clazz_overrideMethod (c$, "setFilePath", 
function (tmpFilePath) {
this.runScript ("load " + JU.PT.esc (tmpFilePath));
}, "~S");
Clazz_overrideMethod (c$, "setSpectrumNumber", 
function (n) {
this.runScript (JSV.common.ScriptToken.SPECTRUMNUMBER + " " + n);
}, "~N");
Clazz_overrideMethod (c$, "reversePlot", 
function () {
this.toggle (JSV.common.ScriptToken.REVERSEPLOT);
});
Clazz_overrideMethod (c$, "toggleGrid", 
function () {
this.toggle (JSV.common.ScriptToken.GRIDON);
});
Clazz_overrideMethod (c$, "toggleCoordinate", 
function () {
this.toggle (JSV.common.ScriptToken.COORDINATESON);
});
Clazz_overrideMethod (c$, "togglePointsOnly", 
function () {
this.toggle (JSV.common.ScriptToken.POINTSONLY);
});
Clazz_overrideMethod (c$, "toggleIntegration", 
function () {
this.toggle (JSV.common.ScriptToken.INTEGRATE);
});
Clazz_defineMethod (c$, "toggle", 
 function (st) {
if (this.vwr.selectedPanel != null) this.runScript (st + " TOGGLE");
}, "JSV.common.ScriptToken");
Clazz_overrideMethod (c$, "addHighlight", 
function (x1, x2, r, g, b, a) {
this.runScript ("HIGHLIGHT " + x1 + " " + x2 + " " + r + " " + g + " " + b + " " + a);
}, "~N,~N,~N,~N,~N,~N");
Clazz_overrideMethod (c$, "removeHighlight", 
function (x1, x2) {
this.runScript ("HIGHLIGHT " + x1 + " " + x2 + " OFF");
}, "~N,~N");
Clazz_overrideMethod (c$, "removeAllHighlights", 
function () {
this.runScript ("HIGHLIGHT OFF");
});
Clazz_overrideMethod (c$, "syncScript", 
function (peakScript) {
this.vwr.syncScript (peakScript);
}, "~S");
Clazz_overrideMethod (c$, "writeStatus", 
function (msg) {
JU.Logger.info (msg);
}, "~S");
Clazz_defineMethod (c$, "initParams", 
function (params) {
this.vwr.parseInitScript (params);
this.newAppletPanel ();
this.vwr.setPopupMenu (this.vwr.allowMenu, this.vwr.parameters.getBoolean (JSV.common.ScriptToken.ENABLEZOOM));
if (this.vwr.allowMenu) {
this.vwr.closeSource (null);
}this.runScriptNow (params);
}, "~S");
Clazz_defineMethod (c$, "newAppletPanel", 
 function () {
JU.Logger.info ("newAppletPanel");
this.appletFrame.createMainPanel (this.vwr);
});
Clazz_overrideMethod (c$, "repaint", 
function () {
var applet = (this.vwr == null ? null : this.vwr.html5Applet);
if (JSV.common.JSViewer.jmolObject == null) {
this.appletFrame.repaint ();
} else if (applet != null) {
JSV.common.JSViewer.jmolObject.repaint (applet, true);
}});
Clazz_defineMethod (c$, "updateJS", 
function (width, height) {
}, "~N,~N");
Clazz_overrideMethod (c$, "runScriptNow", 
function (params) {
return this.vwr.runScriptNow (params);
}, "~S");
Clazz_defineMethod (c$, "checkCallbacks", 
 function () {
if (this.coordCallbackFunctionName == null && this.peakCallbackFunctionName == null) return;
var coord =  new JSV.common.Coordinate ();
var actualCoord = (this.peakCallbackFunctionName == null ? null :  new JSV.common.Coordinate ());
if (!this.vwr.pd ().getPickedCoordinates (coord, actualCoord)) return;
var iSpec = this.vwr.mainPanel.getCurrentPanelIndex ();
if (actualCoord == null) this.appletFrame.callToJavaScript (this.coordCallbackFunctionName,  Clazz_newArray (-1, [Double.$valueOf (coord.getXVal ()), Double.$valueOf (coord.getYVal ()), Integer.$valueOf (iSpec + 1)]));
 else this.appletFrame.callToJavaScript (this.peakCallbackFunctionName,  Clazz_newArray (-1, [Double.$valueOf (coord.getXVal ()), Double.$valueOf (coord.getYVal ()), Double.$valueOf (actualCoord.getXVal ()), Double.$valueOf (actualCoord.getYVal ()), Integer.$valueOf (iSpec + 1)]));
});
Clazz_defineMethod (c$, "doAdvanced", 
function (filePath) {
}, "~S");
Clazz_overrideMethod (c$, "panelEvent", 
function (eventObj) {
if (Clazz_instanceOf (eventObj, JSV.common.PeakPickEvent)) {
this.vwr.processPeakPickEvent (eventObj, false);
} else if (Clazz_instanceOf (eventObj, JSV.common.ZoomEvent)) {
} else if (Clazz_instanceOf (eventObj, JSV.common.SubSpecChangeEvent)) {
}}, "~O");
Clazz_overrideMethod (c$, "getSolnColour", 
function () {
return this.vwr.getSolutionColorStr (true);
});
Clazz_defineMethod (c$, "updateJSView", 
 function (msg) {
var applet = this.vwr.html5Applet;
var panel = (applet == null ? null : this.vwr.selectedPanel);
{
applet && applet._viewSet != null && applet._updateView(panel, msg);
}applet._updateView (panel, msg);
}, "~S");
Clazz_overrideMethod (c$, "syncToJmol", 
function (msg) {
this.updateJSView (msg);
if (this.syncCallbackFunctionName == null) return;
JU.Logger.info ("JSVApp.syncToJmol JSV>Jmol " + msg);
this.appletFrame.callToJavaScript (this.syncCallbackFunctionName,  Clazz_newArray (-1, [this.vwr.fullName, msg]));
}, "~S");
Clazz_overrideMethod (c$, "setVisible", 
function (b) {
this.appletFrame.setPanelVisible (b);
}, "~B");
Clazz_overrideMethod (c$, "setCursor", 
function (id) {
this.vwr.apiPlatform.setCursor (id, this.appletFrame);
}, "~N");
Clazz_overrideMethod (c$, "runScript", 
function (script) {
this.vwr.runScript (script);
}, "~S");
Clazz_overrideMethod (c$, "getScriptQueue", 
function () {
return this.vwr.scriptQueue;
});
Clazz_overrideMethod (c$, "siSetCurrentSource", 
function (source) {
this.vwr.currentSource = source;
}, "JSV.source.JDXSource");
Clazz_overrideMethod (c$, "siSendPanelChange", 
function () {
if (this.vwr.selectedPanel === this.prevPanel) return;
this.prevPanel = this.vwr.selectedPanel;
this.vwr.sendPanelChange ();
});
Clazz_overrideMethod (c$, "siNewWindow", 
function (isSelected, fromFrame) {
this.isNewWindow = isSelected;
if (fromFrame) {
if (this.vwr.jsvpPopupMenu != null) this.vwr.jsvpPopupMenu.setSelected ("Window", false);
} else {
this.appletFrame.newWindow (isSelected);
}}, "~B,~B");
Clazz_overrideMethod (c$, "siValidateAndRepaint", 
function (isAll) {
var pd = this.vwr.pd ();
if (pd != null) pd.setTaintedAll ();
this.appletFrame.validate ();
this.repaint ();
}, "~B");
Clazz_overrideMethod (c$, "siSyncLoad", 
function (filePath) {
this.newAppletPanel ();
JU.Logger.info ("JSVP syncLoad reading " + filePath);
this.siOpenDataOrFile (null, null, null, filePath, -1, -1, false, null, null);
this.appletFrame.validateContent (3);
}, "~S");
Clazz_overrideMethod (c$, "siOpenDataOrFile", 
function (data, name, specs, url, firstSpec, lastSpec, isAppend, script, id) {
switch (this.vwr.openDataOrFile (data, name, specs, url, firstSpec, lastSpec, isAppend, id)) {
case 0:
if (script != null) this.runScript (script);
break;
case -1:
return;
default:
this.siSetSelectedPanel (null);
return;
}
JU.Logger.info (this.appletFrame.getAppletInfo () + " File " + this.vwr.currentSource.getFilePath () + " Loaded Successfully");
}, "~O,~S,JU.Lst,~S,~N,~N,~B,~S,~S");
Clazz_overrideMethod (c$, "siProcessCommand", 
function (scriptItem) {
this.vwr.runScriptNow (scriptItem);
}, "~S");
Clazz_overrideMethod (c$, "siSetSelectedPanel", 
function (jsvp) {
this.vwr.mainPanel.setSelectedPanel (this.vwr, jsvp, this.vwr.panelNodes);
this.vwr.selectedPanel = jsvp;
this.vwr.spectraTree.setSelectedPanel (this, jsvp);
if (jsvp == null) {
this.vwr.selectedPanel = jsvp = this.appletFrame.getJSVPanel (this.vwr, null);
this.vwr.mainPanel.setSelectedPanel (this.vwr, jsvp, null);
}this.appletFrame.validate ();
if (jsvp != null) {
jsvp.setEnabled (true);
jsvp.setFocusable (true);
}}, "JSV.api.JSVPanel");
Clazz_overrideMethod (c$, "siExecSetCallback", 
function (st, value) {
switch (st) {
case JSV.common.ScriptToken.APPLETREADYCALLBACKFUNCTIONNAME:
this.appletReadyCallbackFunctionName = value;
break;
case JSV.common.ScriptToken.LOADFILECALLBACKFUNCTIONNAME:
this.loadFileCallbackFunctionName = value;
break;
case JSV.common.ScriptToken.PEAKCALLBACKFUNCTIONNAME:
this.peakCallbackFunctionName = value;
break;
case JSV.common.ScriptToken.SYNCCALLBACKFUNCTIONNAME:
this.syncCallbackFunctionName = value;
break;
case JSV.common.ScriptToken.COORDCALLBACKFUNCTIONNAME:
this.coordCallbackFunctionName = value;
break;
}
}, "JSV.common.ScriptToken,~S");
Clazz_overrideMethod (c$, "siLoaded", 
function (value) {
if (this.loadFileCallbackFunctionName != null) this.appletFrame.callToJavaScript (this.loadFileCallbackFunctionName,  Clazz_newArray (-1, [this.vwr.appletName, value]));
this.updateJSView (null);
return null;
}, "~S");
Clazz_overrideMethod (c$, "siExecHidden", 
function (b) {
}, "~B");
Clazz_overrideMethod (c$, "siExecScriptComplete", 
function (msg, isOK) {
if (!isOK) this.vwr.showMessage (msg);
this.siValidateAndRepaint (false);
}, "~S,~B");
Clazz_overrideMethod (c$, "siUpdateBoolean", 
function (st, TF) {
}, "JSV.common.ScriptToken,~B");
Clazz_overrideMethod (c$, "siCheckCallbacks", 
function (title) {
this.checkCallbacks ();
}, "~S");
Clazz_overrideMethod (c$, "siNodeSet", 
function (panelNode) {
this.appletFrame.validateContent (2);
this.siValidateAndRepaint (false);
}, "JSV.common.PanelNode");
Clazz_overrideMethod (c$, "siSourceClosed", 
function (source) {
}, "JSV.source.JDXSource");
Clazz_overrideMethod (c$, "siGetNewJSVPanel", 
function (spec) {
if (spec == null) {
this.vwr.initialEndIndex = this.vwr.initialStartIndex = -1;
return null;
}var specs =  new JU.Lst ();
specs.addLast (spec);
var jsvp = this.appletFrame.getJSVPanel (this.vwr, specs);
jsvp.getPanelData ().addListener (this);
this.vwr.parameters.setFor (jsvp, null, true);
return jsvp;
}, "JSV.common.Spectrum");
Clazz_overrideMethod (c$, "siGetNewJSVPanel2", 
function (specs) {
if (specs == null) {
this.vwr.initialEndIndex = this.vwr.initialStartIndex = -1;
return this.appletFrame.getJSVPanel (this.vwr, null);
}var jsvp = this.appletFrame.getJSVPanel (this.vwr, specs);
this.vwr.initialEndIndex = this.vwr.initialStartIndex = -1;
jsvp.getPanelData ().addListener (this);
this.vwr.parameters.setFor (jsvp, null, true);
return jsvp;
}, "JU.Lst");
Clazz_overrideMethod (c$, "siSetPropertiesFromPreferences", 
function (jsvp, includeMeasures) {
this.vwr.checkAutoIntegrate ();
}, "JSV.api.JSVPanel,~B");
Clazz_overrideMethod (c$, "siSetLoaded", 
function (fileName, filePath) {
}, "~S,~S");
Clazz_overrideMethod (c$, "siSetMenuEnables", 
function (node, isSplit) {
}, "JSV.common.PanelNode,~B");
Clazz_overrideMethod (c$, "siUpdateRecentMenus", 
function (filePath) {
}, "~S");
Clazz_overrideMethod (c$, "siExecTest", 
function (value) {
var data = "";
this.loadInline (data);
}, "~S");
Clazz_overrideMethod (c$, "print", 
function (fileName) {
return this.vwr.print (fileName);
}, "~S");
Clazz_overrideMethod (c$, "checkScript", 
function (script) {
return this.vwr.checkScript (script);
}, "~S");
c$.getAppletInfo = Clazz_defineMethod (c$, "getAppletInfo", 
function () {
return "JSpecView Applet " + JSV.common.JSVersion.VERSION + "\n\n" + "Authors:\nProf. Robert M. Hanson,\nD. Facey, K. Bryan, C. Walters, Prof. Robert J. Lancashire and\nvolunteer developers through sourceforge.";
});
Clazz_defineStatics (c$,
"CREDITS", "Authors:\nProf. Robert M. Hanson,\nD. Facey, K. Bryan, C. Walters, Prof. Robert J. Lancashire and\nvolunteer developers through sourceforge.");
});
Clazz_declarePackage ("JSV.app");
Clazz_load (["J.api.GenericMouseInterface"], "JSV.app.GenericMouse", ["JU.Logger"], function () {
c$ = Clazz_decorateAsClass (function () {
this.pd = null;
this.jsvp = null;
this.xWhenPressed = 0;
this.yWhenPressed = 0;
this.modifiersWhenPressed10 = 0;
this.isMouseDown = false;
this.disposed = false;
Clazz_instantialize (this, arguments);
}, JSV.app, "GenericMouse", null, J.api.GenericMouseInterface);
Clazz_makeConstructor (c$, 
function (jsvp) {
this.jsvp = jsvp;
this.pd = jsvp.getPanelData ();
}, "JSV.api.JSVPanel");
Clazz_overrideMethod (c$, "clear", 
function () {
});
Clazz_overrideMethod (c$, "processEvent", 
function (id, x, y, modifiers, time) {
if (this.pd == null) {
if (!this.disposed && id == 501 && (modifiers & 4) != 0) this.jsvp.showMenu (x, y);
return true;
}if (id != 507) modifiers = JSV.app.GenericMouse.applyLeftMouse (modifiers);
switch (id) {
case 507:
this.wheeled (time, x, modifiers | 32);
break;
case 501:
this.xWhenPressed = x;
this.yWhenPressed = y;
this.modifiersWhenPressed10 = modifiers;
this.pressed (time, x, y, modifiers, false);
break;
case 506:
this.dragged (time, x, y, modifiers);
break;
case 504:
this.entered (time, x, y);
break;
case 505:
this.exited (time, x, y);
break;
case 503:
this.moved (time, x, y, modifiers);
break;
case 502:
this.released (time, x, y, modifiers);
if (x == this.xWhenPressed && y == this.yWhenPressed && modifiers == this.modifiersWhenPressed10) {
this.clicked (time, x, y, modifiers, 1);
}break;
default:
return false;
}
return true;
}, "~N,~N,~N,~N,~N");
Clazz_defineMethod (c$, "mouseEntered", 
function (e) {
this.entered (e.getWhen (), e.getX (), e.getY ());
}, "java.awt.event.MouseEvent");
Clazz_defineMethod (c$, "mouseExited", 
function (e) {
this.exited (e.getWhen (), e.getX (), e.getY ());
}, "java.awt.event.MouseEvent");
Clazz_defineMethod (c$, "mouseMoved", 
function (e) {
this.moved (e.getWhen (), e.getX (), e.getY (), e.getModifiers ());
}, "java.awt.event.MouseEvent");
Clazz_defineMethod (c$, "mousePressed", 
function (e) {
this.pressed (e.getWhen (), e.getX (), e.getY (), e.getModifiers (), e.isPopupTrigger ());
}, "java.awt.event.MouseEvent");
Clazz_defineMethod (c$, "mouseDragged", 
function (e) {
var modifiers = e.getModifiers ();
if ((modifiers & 28) == 0) modifiers |= 16;
this.dragged (e.getWhen (), e.getX (), e.getY (), modifiers);
}, "java.awt.event.MouseEvent");
Clazz_defineMethod (c$, "mouseReleased", 
function (e) {
this.released (e.getWhen (), e.getX (), e.getY (), e.getModifiers ());
}, "java.awt.event.MouseEvent");
Clazz_defineMethod (c$, "mouseClicked", 
function (e) {
this.clicked (e.getWhen (), e.getX (), e.getY (), e.getModifiers (), e.getClickCount ());
}, "java.awt.event.MouseEvent");
Clazz_defineMethod (c$, "mouseWheelMoved", 
function (e) {
e.consume ();
this.wheeled (e.getWhen (), e.getWheelRotation (), e.getModifiers () | 32);
}, "java.awt.event.MouseWheelEvent");
Clazz_defineMethod (c$, "keyTyped", 
function (ke) {
if (this.pd == null) return;
var ch = ke.getKeyChar ();
var modifiers = ke.getModifiers ();
if (JU.Logger.debuggingHigh || true) JU.Logger.info ("MouseManager keyTyped: " + ch + " " + (0 + ch.charCodeAt (0)) + " " + modifiers);
if (this.pd.keyTyped (ch.charCodeAt (0), modifiers)) ke.consume ();
}, "java.awt.event.KeyEvent");
Clazz_defineMethod (c$, "keyPressed", 
function (ke) {
if (this.pd != null && this.pd.keyPressed (ke.getKeyCode (), ke.getModifiers ())) ke.consume ();
}, "java.awt.event.KeyEvent");
Clazz_defineMethod (c$, "keyReleased", 
function (ke) {
if (this.pd != null) this.pd.keyReleased (ke.getKeyCode ());
}, "java.awt.event.KeyEvent");
Clazz_defineMethod (c$, "entered", 
function (time, x, y) {
if (this.pd != null) this.pd.mouseEnterExit (time, x, y, false);
}, "~N,~N,~N");
Clazz_defineMethod (c$, "exited", 
function (time, x, y) {
if (this.pd != null) this.pd.mouseEnterExit (time, x, y, true);
}, "~N,~N,~N");
Clazz_defineMethod (c$, "clicked", 
function (time, x, y, modifiers, clickCount) {
if (this.pd != null) this.pd.mouseAction (2, time, x, y, 1, modifiers);
}, "~N,~N,~N,~N,~N");
Clazz_defineMethod (c$, "moved", 
function (time, x, y, modifiers) {
if (this.pd == null) return;
if (this.isMouseDown) this.pd.mouseAction (1, time, x, y, 0, JSV.app.GenericMouse.applyLeftMouse (modifiers));
 else this.pd.mouseAction (0, time, x, y, 0, modifiers & -29);
}, "~N,~N,~N,~N");
Clazz_defineMethod (c$, "wheeled", 
function (time, rotation, modifiers) {
if (this.pd != null) this.pd.mouseAction (3, time, 0, rotation, 0, modifiers);
}, "~N,~N,~N");
Clazz_defineMethod (c$, "pressed", 
function (time, x, y, modifiers, isPopupTrigger) {
if (this.pd == null) {
if (!this.disposed) this.jsvp.showMenu (x, y);
return;
}this.isMouseDown = true;
this.pd.mouseAction (4, time, x, y, 0, modifiers);
}, "~N,~N,~N,~N,~B");
Clazz_defineMethod (c$, "released", 
function (time, x, y, modifiers) {
if (this.pd == null) return;
this.isMouseDown = false;
this.pd.mouseAction (5, time, x, y, 0, modifiers);
}, "~N,~N,~N,~N");
Clazz_defineMethod (c$, "dragged", 
function (time, x, y, modifiers) {
if (this.pd == null) return;
if ((modifiers & 20) == 20) modifiers = modifiers & -5 | 2;
this.pd.mouseAction (1, time, x, y, 0, modifiers);
}, "~N,~N,~N,~N");
c$.applyLeftMouse = Clazz_defineMethod (c$, "applyLeftMouse", 
function (modifiers) {
return ((modifiers & 28) == 0) ? (modifiers | 16) : modifiers;
}, "~N");
Clazz_overrideMethod (c$, "processTwoPointGesture", 
function (touches) {
}, "~A");
Clazz_overrideMethod (c$, "dispose", 
function () {
this.pd = null;
this.jsvp = null;
this.disposed = true;
});
});
Clazz_declarePackage ("JSV.appletjs");
Clazz_load (["javajs.api.JSInterface", "JSV.api.AppletFrame", "$.JSVAppletInterface"], "JSV.appletjs.JSVApplet", ["java.lang.Boolean", "java.net.URL", "java.util.Hashtable", "JU.PT", "JSV.app.JSVApp", "JSV.js2d.JsMainPanel", "$.JsPanel", "JU.Logger"], function () {
c$ = Clazz_decorateAsClass (function () {
this.app = null;
this.viewer = null;
this.isStandalone = false;
this.viewerOptions = null;
this.htParams = null;
Clazz_instantialize (this, arguments);
}, JSV.appletjs, "JSVApplet", null, [JSV.api.JSVAppletInterface, JSV.api.AppletFrame, javajs.api.JSInterface]);
Clazz_makeConstructor (c$, 
function (viewerOptions) {
if (viewerOptions == null) viewerOptions =  new java.util.Hashtable ();
this.viewerOptions = viewerOptions;
this.htParams =  new java.util.Hashtable ();
for (var entry, $entry = viewerOptions.entrySet ().iterator (); $entry.hasNext () && ((entry = $entry.next ()) || true);) this.htParams.put (entry.getKey ().toLowerCase (), entry.getValue ());

this.init ();
}, "java.util.Map");
Clazz_defineMethod (c$, "init", 
function () {
this.app =  new JSV.app.JSVApp (this, true);
this.initViewer ();
if (this.app.appletReadyCallbackFunctionName != null && this.viewer.fullName != null) this.callToJavaScript (this.app.appletReadyCallbackFunctionName,  Clazz_newArray (-1, [this.viewer.appletName, this.viewer.fullName, Boolean.TRUE, this]));
});
Clazz_defineMethod (c$, "initViewer", 
function () {
this.viewer = this.app.vwr;
this.setLogging ();
this.viewerOptions.remove ("debug");
var o = this.viewerOptions.get ("display");
{
o = document.getElementById(o);
}this.viewer.setDisplay (o);
JU.Logger.info (this.getAppletInfo ());
});
Clazz_defineMethod (c$, "setLogging", 
 function () {
var iLevel = (this.getValue ("logLevel", (this.getBooleanValue ("debug", false) ? "5" : "4"))).charCodeAt (0) - 48;
if (iLevel != 4) System.out.println ("setting logLevel=" + iLevel + " -- To change, use script \"set logLevel [0-5]\"");
JU.Logger.setLogLevel (iLevel);
});
Clazz_defineMethod (c$, "getParameter", 
function (paramName) {
var o = this.htParams.get (paramName.toLowerCase ());
return (o == null ? null :  String.instantialize (o.toString ()));
}, "~S");
Clazz_defineMethod (c$, "getBooleanValue", 
 function (propertyName, defaultValue) {
var value = this.getValue (propertyName, defaultValue ? "true" : "");
return (value.equalsIgnoreCase ("true") || value.equalsIgnoreCase ("on") || value.equalsIgnoreCase ("yes"));
}, "~S,~B");
Clazz_defineMethod (c$, "getValue", 
 function (propertyName, defaultValue) {
var stringValue = this.getParameter (propertyName);
System.out.println ("getValue " + propertyName + " = " + stringValue);
if (stringValue != null) return stringValue;
return defaultValue;
}, "~S,~S");
Clazz_overrideMethod (c$, "isPro", 
function () {
return this.app.isPro ();
});
Clazz_overrideMethod (c$, "isSigned", 
function () {
return this.app.isSigned ();
});
Clazz_overrideMethod (c$, "finalize", 
function () {
System.out.println ("JSpecView " + this + " finalized");
});
Clazz_overrideMethod (c$, "destroy", 
function () {
this.app.dispose ();
this.app = null;
});
Clazz_defineMethod (c$, "getParameter", 
function (key, def) {
return this.isStandalone ? System.getProperty (key, def) : (this.getParameter (key) != null ? this.getParameter (key) : def);
}, "~S,~S");
Clazz_overrideMethod (c$, "getAppletInfo", 
function () {
return JSV.app.JSVApp.getAppletInfo ();
});
Clazz_overrideMethod (c$, "getSolnColour", 
function () {
return this.app.getSolnColour ();
});
Clazz_overrideMethod (c$, "getCoordinate", 
function () {
return this.app.getCoordinate ();
});
Clazz_overrideMethod (c$, "loadInline", 
function (data) {
this.app.loadInline (data);
}, "~S");
Clazz_defineMethod (c$, "$export", 
function (type, n) {
return this.app.exportSpectrum (type, n);
}, "~S,~N");
Clazz_overrideMethod (c$, "exportSpectrum", 
function (type, n) {
return this.app.exportSpectrum (type, n);
}, "~S,~N");
Clazz_overrideMethod (c$, "setFilePath", 
function (tmpFilePath) {
this.app.setFilePath (tmpFilePath);
}, "~S");
Clazz_overrideMethod (c$, "setSpectrumNumber", 
function (i) {
this.app.setSpectrumNumber (i);
}, "~N");
Clazz_overrideMethod (c$, "toggleGrid", 
function () {
this.app.toggleGrid ();
});
Clazz_overrideMethod (c$, "toggleCoordinate", 
function () {
this.app.toggleCoordinate ();
});
Clazz_overrideMethod (c$, "togglePointsOnly", 
function () {
this.app.togglePointsOnly ();
});
Clazz_overrideMethod (c$, "toggleIntegration", 
function () {
this.app.toggleIntegration ();
});
Clazz_overrideMethod (c$, "addHighlight", 
function (x1, x2, r, g, b, a) {
this.app.addHighlight (x1, x2, r, g, b, a);
}, "~N,~N,~N,~N,~N,~N");
Clazz_overrideMethod (c$, "removeAllHighlights", 
function () {
this.app.removeAllHighlights ();
});
Clazz_overrideMethod (c$, "removeHighlight", 
function (x1, x2) {
this.app.removeHighlight (x1, x2);
}, "~N,~N");
Clazz_overrideMethod (c$, "reversePlot", 
function () {
this.app.reversePlot ();
});
Clazz_defineMethod (c$, "script", 
function (script) {
this.app.initParams (script);
}, "~S");
Clazz_overrideMethod (c$, "runScript", 
function (script) {
this.app.runScript (script);
}, "~S");
Clazz_overrideMethod (c$, "syncScript", 
function (peakScript) {
this.app.syncScript (peakScript);
}, "~S");
Clazz_overrideMethod (c$, "writeStatus", 
function (msg) {
this.app.writeStatus (msg);
}, "~S");
Clazz_overrideMethod (c$, "getPropertyAsJavaObject", 
function (key) {
return this.app.getPropertyAsJavaObject (key);
}, "~S");
Clazz_overrideMethod (c$, "getPropertyAsJSON", 
function (key) {
return this.app.getPropertyAsJSON (key);
}, "~S");
Clazz_overrideMethod (c$, "runScriptNow", 
function (script) {
return this.app.runScriptNow (script);
}, "~S");
Clazz_overrideMethod (c$, "print", 
function (fileName) {
return this.app.print (fileName);
}, "~S");
Clazz_overrideMethod (c$, "setDropTargetListener", 
function (isSigned, viewer) {
}, "~B,JSV.common.JSViewer");
Clazz_overrideMethod (c$, "validateContent", 
function (mode) {
}, "~N");
Clazz_overrideMethod (c$, "createMainPanel", 
function (viewer) {
viewer.mainPanel =  new JSV.js2d.JsMainPanel ();
}, "JSV.common.JSViewer");
Clazz_overrideMethod (c$, "newWindow", 
function (isSelected) {
}, "~B");
Clazz_overrideMethod (c$, "callToJavaScript", 
function (callback, data) {
var tokens = JU.PT.split (callback, ".");
{
try{
var o = window[tokens[0]]
for (var i = 1; i < tokens.length; i++){
o = o[tokens[i]]
}
return o(data[0],data[1],data[2],data[3],data[4],data[5],data[6],data[7],data[8],data[9]);
} catch (e) {
System.out.println(callback + " failed " + e);
}
}}, "~S,~A");
Clazz_overrideMethod (c$, "setPanelVisible", 
function (b) {
}, "~B");
Clazz_overrideMethod (c$, "getJSVPanel", 
function (viewer, specs) {
return (specs == null ? JSV.js2d.JsPanel.getEmptyPanel (viewer) : JSV.js2d.JsPanel.getPanelMany (viewer, specs));
}, "JSV.common.JSViewer,JU.Lst");
Clazz_overrideMethod (c$, "setVisible", 
function (b) {
}, "~B");
Clazz_overrideMethod (c$, "getDocumentBase", 
function () {
try {
return  new java.net.URL (Clazz_castNullAs ("java.net.URL"), this.viewerOptions.get ("documentBase"), null);
} catch (e) {
if (Clazz_exceptionOf (e, java.net.MalformedURLException)) {
return null;
} else {
throw e;
}
}
});
Clazz_overrideMethod (c$, "repaint", 
function () {
});
Clazz_overrideMethod (c$, "validate", 
function () {
});
Clazz_overrideMethod (c$, "doExitJmol", 
function () {
});
Clazz_overrideMethod (c$, "getApp", 
function () {
return this.app;
});
Clazz_overrideMethod (c$, "setStatusDragDropped", 
function (mode, x, y, fileName) {
return true;
}, "~N,~N,~N,~S");
Clazz_overrideMethod (c$, "cacheFileByName", 
function (fileName, isAdd) {
return 0;
}, "~S,~B");
Clazz_overrideMethod (c$, "cachePut", 
function (key, data) {
}, "~S,~O");
Clazz_overrideMethod (c$, "getFullName", 
function () {
return this.app.vwr.fullName;
});
Clazz_overrideMethod (c$, "processMouseEvent", 
function (id, x, y, modifiers, time) {
return this.app.vwr.processMouseEvent (id, x, y, modifiers, time);
}, "~N,~N,~N,~N,~N");
Clazz_overrideMethod (c$, "setDisplay", 
function (canvas) {
this.app.vwr.setDisplay (canvas);
}, "~O");
Clazz_overrideMethod (c$, "startHoverWatcher", 
function (enable) {
}, "~B");
Clazz_overrideMethod (c$, "update", 
function () {
this.app.vwr.updateJS ();
});
Clazz_defineMethod (c$, "openFile", 
function (fileName) {
this.app.vwr.openFile (fileName, true);
return null;
}, "~S");
Clazz_overrideMethod (c$, "openFileAsyncSpecial", 
function (fileName, flags) {
this.app.vwr.openFileAsyncSpecial (fileName, flags);
}, "~S,~N");
Clazz_overrideMethod (c$, "processTwoPointGesture", 
function (touches) {
this.app.vwr.processTwoPointGesture (touches);
}, "~A");
Clazz_overrideMethod (c$, "setScreenDimension", 
function (width, height) {
this.app.vwr.setScreenDimension (width, height);
}, "~N,~N");
Clazz_overrideMethod (c$, "checkScript", 
function (script) {
var s = this.app.checkScript (script);
if (s != null) System.out.println (s);
return s;
}, "~S");
});
Clazz_declarePackage ("JSV.common");
Clazz_load (["java.lang.Enum", "JSV.common.Coordinate"], "JSV.common.Annotation", ["java.lang.Double", "JU.CU"], function () {
c$ = Clazz_decorateAsClass (function () {
this.text = "";
this.$isPixels = false;
this.is2D = false;
this.offsetX = 0;
this.offsetY = 0;
this.spec = null;
Clazz_instantialize (this, arguments);
}, JSV.common, "Annotation", JSV.common.Coordinate);
Clazz_defineMethod (c$, "setA", 
function (x, y, spec, text, isPixels, is2D, offsetX, offsetY) {
this.set (x, y);
this.spec = spec;
this.text = text;
this.$isPixels = isPixels;
this.is2D = is2D;
this.offsetX = offsetX;
this.offsetY = offsetY;
return this;
}, "~N,~N,JSV.common.Spectrum,~S,~B,~B,~N,~N");
Clazz_defineMethod (c$, "setSpec", 
function (spec) {
this.spec = spec;
return this;
}, "JSV.common.Spectrum");
Clazz_defineMethod (c$, "addSpecShift", 
function (dx) {
this.setXVal (this.getXVal () + dx);
}, "~N");
Clazz_defineMethod (c$, "isPixels", 
function () {
return this.$isPixels;
});
Clazz_overrideMethod (c$, "toString", 
function () {
return "[" + this.getXVal () + ", " + this.getYVal () + "," + this.text + "]";
});
c$.getColoredAnnotation = Clazz_defineMethod (c$, "getColoredAnnotation", 
function (g2d, spec, args, lastAnnotation) {
var arg;
var xPt = 0;
var yPt = 1;
var colorPt = 2;
var textPt = 3;
var nArgs = args.size ();
try {
switch (nArgs) {
default:
return null;
case 1:
arg = args.get (0);
xPt = yPt = -1;
if (arg.charAt (0) == '\"') {
textPt = 0;
colorPt = -1;
} else {
colorPt = 0;
textPt = -1;
}break;
case 2:
xPt = yPt = -1;
arg = args.get (0);
if (arg.charAt (0) == '\"') {
textPt = 0;
colorPt = 1;
} else {
colorPt = 0;
textPt = 1;
}break;
case 3:
case 4:
arg = args.get (2);
if (arg.charAt (0) == '\"') {
textPt = 2;
colorPt = (nArgs == 4 ? 3 : -1);
} else {
colorPt = 2;
textPt = (nArgs == 4 ? 3 : -1);
}arg = args.get (2);
if (arg.charAt (0) == '\"') {
textPt = 2;
colorPt = -1;
} else {
colorPt = 2;
textPt = -1;
}}
if (lastAnnotation == null && (xPt < 0 || yPt < 0 || textPt < 0 || colorPt < 0)) return null;
var x = (xPt < 0 ? lastAnnotation.getXVal () : Double.$valueOf (args.get (xPt)).doubleValue ());
var y = (yPt < 0 ? lastAnnotation.getYVal () : Double.$valueOf (args.get (yPt)).doubleValue ());
var color = (colorPt < 0 ? (lastAnnotation).getColor () : g2d.getColor1 (JU.CU.getArgbFromString (args.get (colorPt))));
var text;
if (textPt < 0) {
text = lastAnnotation.text;
} else {
text = args.get (textPt);
if (text.charAt (0) == '\"') text = text.substring (1, text.length - 1);
}return  new JSV.common.ColoredAnnotation ().setCA (x, y, spec, text, color, false, false, 0, 0);
} catch (e) {
if (Clazz_exceptionOf (e, Exception)) {
return null;
} else {
throw e;
}
}
}, "J.api.GenericGraphics,JSV.common.Spectrum,JU.Lst,JSV.common.Annotation");
Clazz_pu$h(self.c$);
c$ = Clazz_declareType (JSV.common.Annotation, "AType", Enum);
Clazz_defineEnumConstant (c$, "Integration", 0, []);
Clazz_defineEnumConstant (c$, "PeakList", 1, []);
Clazz_defineEnumConstant (c$, "Measurements", 2, []);
Clazz_defineEnumConstant (c$, "OverlayLegend", 3, []);
Clazz_defineEnumConstant (c$, "Views", 4, []);
Clazz_defineEnumConstant (c$, "NONE", 5, []);
c$ = Clazz_p0p ();
});
Clazz_declarePackage ("JSV.common");
Clazz_load (["JSV.common.Annotation"], "JSV.common.ColoredAnnotation", null, function () {
c$ = Clazz_decorateAsClass (function () {
this.color = null;
Clazz_instantialize (this, arguments);
}, JSV.common, "ColoredAnnotation", JSV.common.Annotation);
Clazz_defineMethod (c$, "getColor", 
function () {
return this.color;
});
Clazz_makeConstructor (c$, 
function () {
Clazz_superConstructor (this, JSV.common.ColoredAnnotation, []);
});
Clazz_defineMethod (c$, "setCA", 
function (x, y, spec, text, color, isPixels, is2D, offsetX, offsetY) {
this.setA (x, y, spec, text, isPixels, is2D, offsetX, offsetY);
this.color = color;
return this;
}, "~N,~N,JSV.common.Spectrum,~S,javajs.api.GenericColor,~B,~B,~N,~N");
});
Clazz_declarePackage ("JSV.common");
Clazz_load (["JSV.common.Parameters"], "JSV.common.ColorParameters", ["java.util.Hashtable", "$.StringTokenizer", "JU.CU", "$.Lst", "JSV.common.ScriptToken"], function () {
c$ = Clazz_decorateAsClass (function () {
this.titleFontName = null;
this.displayFontName = null;
this.elementColors = null;
this.plotColors = null;
this.isDefault = false;
Clazz_instantialize (this, arguments);
}, JSV.common, "ColorParameters", JSV.common.Parameters);
Clazz_makeConstructor (c$, 
function () {
Clazz_superConstructor (this, JSV.common.ColorParameters, []);
JSV.common.ColorParameters.BLACK = this.getColor3 (0, 0, 0);
JSV.common.ColorParameters.RED = this.getColor3 (255, 0, 0);
JSV.common.ColorParameters.LIGHT_GRAY = this.getColor3 (200, 200, 200);
JSV.common.ColorParameters.DARK_GRAY = this.getColor3 (80, 80, 80);
JSV.common.ColorParameters.BLUE = this.getColor3 (0, 0, 255);
JSV.common.ColorParameters.WHITE = this.getColor3 (255, 255, 255);
this.elementColors =  new java.util.Hashtable ();
this.setColor (JSV.common.ScriptToken.TITLECOLOR, JSV.common.ColorParameters.BLACK);
this.setColor (JSV.common.ScriptToken.UNITSCOLOR, JSV.common.ColorParameters.RED);
this.setColor (JSV.common.ScriptToken.SCALECOLOR, JSV.common.ColorParameters.BLACK);
this.setColor (JSV.common.ScriptToken.COORDINATESCOLOR, JSV.common.ColorParameters.RED);
this.setColor (JSV.common.ScriptToken.GRIDCOLOR, JSV.common.ColorParameters.LIGHT_GRAY);
this.setColor (JSV.common.ScriptToken.PLOTCOLOR, JSV.common.ColorParameters.BLUE);
this.setColor (JSV.common.ScriptToken.PLOTAREACOLOR, JSV.common.ColorParameters.WHITE);
this.setColor (JSV.common.ScriptToken.BACKGROUNDCOLOR, this.getColor3 (192, 192, 192));
this.setColor (JSV.common.ScriptToken.INTEGRALPLOTCOLOR, JSV.common.ColorParameters.RED);
this.setColor (JSV.common.ScriptToken.PEAKTABCOLOR, JSV.common.ColorParameters.RED);
this.setColor (JSV.common.ScriptToken.HIGHLIGHTCOLOR, JSV.common.ColorParameters.DARK_GRAY);
for (var i = 0; i < 8; i++) JSV.common.ColorParameters.defaultPlotColors[i] = this.getColorFromString (JSV.common.ColorParameters.defaultPlotColorNames[i]);

this.plotColors =  new Array (8);
System.arraycopy (JSV.common.ColorParameters.defaultPlotColors, 0, this.plotColors, 0, 8);
});
Clazz_defineMethod (c$, "setFor", 
function (jsvp, ds, includeMeasures) {
if (ds == null) ds = this;
if (includeMeasures) jsvp.getPanelData ().setBooleans (ds, null);
var pd = jsvp.getPanelData ();
if (pd.getCurrentPlotColor (1) != null) pd.setPlotColors (this.plotColors);
pd.setColorOrFont (ds, null);
}, "JSV.api.JSVPanel,JSV.common.ColorParameters,~B");
Clazz_defineMethod (c$, "set", 
function (pd, st, value) {
var param = null;
switch (st) {
default:
this.setP (pd, st, value);
return;
case JSV.common.ScriptToken.PLOTCOLORS:
if (pd == null) this.getPlotColors (value);
 else pd.setPlotColors (this.getPlotColors (value));
return;
case JSV.common.ScriptToken.BACKGROUNDCOLOR:
case JSV.common.ScriptToken.COORDINATESCOLOR:
case JSV.common.ScriptToken.GRIDCOLOR:
case JSV.common.ScriptToken.HIGHLIGHTCOLOR:
case JSV.common.ScriptToken.INTEGRALPLOTCOLOR:
case JSV.common.ScriptToken.PEAKTABCOLOR:
case JSV.common.ScriptToken.PLOTAREACOLOR:
case JSV.common.ScriptToken.PLOTCOLOR:
case JSV.common.ScriptToken.SCALECOLOR:
case JSV.common.ScriptToken.TITLECOLOR:
case JSV.common.ScriptToken.UNITSCOLOR:
param = this.setColorFromString (st, value);
break;
case JSV.common.ScriptToken.TITLEFONTNAME:
case JSV.common.ScriptToken.DISPLAYFONTNAME:
param = this.getFontName (st, value);
break;
}
if (pd == null) return;
if (param != null) pd.setColorOrFont (this, st);
}, "JSV.common.PanelData,JSV.common.ScriptToken,~S");
Clazz_defineMethod (c$, "getElementColor", 
function (st) {
return this.elementColors.get (st);
}, "JSV.common.ScriptToken");
Clazz_defineMethod (c$, "setColor", 
function (st, color) {
if (color != null) this.elementColors.put (st, color);
return color;
}, "JSV.common.ScriptToken,javajs.api.GenericColor");
Clazz_defineMethod (c$, "copy", 
function () {
return this.copy (this.name);
});
Clazz_defineMethod (c$, "setElementColors", 
function (p) {
this.displayFontName = p.displayFontName;
for (var entry, $entry = p.elementColors.entrySet ().iterator (); $entry.hasNext () && ((entry = $entry.next ()) || true);) this.setColor (entry.getKey (), entry.getValue ());

return this;
}, "JSV.common.ColorParameters");
Clazz_defineMethod (c$, "getColorFromString", 
function (name) {
return this.getColor1 (JU.CU.getArgbFromString (name));
}, "~S");
Clazz_defineMethod (c$, "getPlotColors", 
function (plotColorsStr) {
if (plotColorsStr == null) {
this.plotColors[0] = this.getElementColor (JSV.common.ScriptToken.PLOTCOLOR);
return this.plotColors;
}var st =  new java.util.StringTokenizer (plotColorsStr, ",;.- ");
var colors =  new JU.Lst ();
try {
while (st.hasMoreTokens ()) colors.addLast (this.getColorFromString (st.nextToken ()));

} catch (e) {
if (Clazz_exceptionOf (e, Exception)) {
return null;
} else {
throw e;
}
}
return colors.toArray ( new Array (colors.size ()));
}, "~S");
Clazz_defineMethod (c$, "setColorFromString", 
function (st, value) {
return this.setColor (st, this.getColorFromString (value));
}, "JSV.common.ScriptToken,~S");
Clazz_defineMethod (c$, "getFontName", 
function (st, value) {
var isValid = this.isValidFontName (value);
switch (st) {
case JSV.common.ScriptToken.TITLEFONTNAME:
return (isValid ? this.titleFontName = value : this.titleFontName);
case JSV.common.ScriptToken.DISPLAYFONTNAME:
return (isValid ? this.displayFontName = value : this.displayFontName);
}
return null;
}, "JSV.common.ScriptToken,~S");
Clazz_defineStatics (c$,
"BLACK", null,
"RED", null,
"LIGHT_GRAY", null,
"DARK_GRAY", null,
"BLUE", null,
"WHITE", null);
c$.defaultPlotColors = c$.prototype.defaultPlotColors =  new Array (8);
c$.defaultPlotColorNames = c$.prototype.defaultPlotColorNames =  Clazz_newArray (-1, ["black", "darkGreen", "darkred", "orange", "magenta", "cyan", "maroon", "darkGray"]);
});
Clazz_declarePackage ("JSV.common");
c$ = Clazz_declareType (JSV.common, "CoordComparator", null, java.util.Comparator);
Clazz_overrideMethod (c$, "compare", 
function (c1, c2) {
return (c1.getXVal () > c2.getXVal () ? 1 : c1.getXVal () < c2.getXVal () ? -1 : 0);
}, "JSV.common.Coordinate,JSV.common.Coordinate");
Clazz_declarePackage ("JSV.common");
Clazz_load (["JSV.common.CoordComparator"], "JSV.common.Coordinate", ["java.lang.Double", "java.util.Arrays", "$.StringTokenizer", "JU.DF", "$.Lst"], function () {
c$ = Clazz_decorateAsClass (function () {
this.xVal = 0;
this.yVal = 0;
Clazz_instantialize (this, arguments);
}, JSV.common, "Coordinate");
Clazz_makeConstructor (c$, 
function () {
});
Clazz_defineMethod (c$, "set", 
function (x, y) {
this.xVal = x;
this.yVal = y;
return this;
}, "~N,~N");
Clazz_defineMethod (c$, "getXVal", 
function () {
return this.xVal;
});
Clazz_defineMethod (c$, "getYVal", 
function () {
return this.yVal;
});
Clazz_defineMethod (c$, "getXString", 
function () {
return JU.DF.formatDecimalTrimmed (this.xVal, 8);
});
Clazz_defineMethod (c$, "getYString", 
function () {
return JU.DF.formatDecimalTrimmed (this.yVal, 8);
});
Clazz_defineMethod (c$, "setXVal", 
function (val) {
this.xVal = val;
}, "~N");
Clazz_defineMethod (c$, "setYVal", 
function (val) {
this.yVal = val;
}, "~N");
Clazz_defineMethod (c$, "copy", 
function () {
return  new JSV.common.Coordinate ().set (this.xVal, this.yVal);
});
Clazz_defineMethod (c$, "equals", 
function (coord) {
return (coord.xVal == this.xVal && coord.yVal == this.yVal);
}, "JSV.common.Coordinate");
Clazz_overrideMethod (c$, "toString", 
function () {
return "[" + this.xVal + ", " + this.yVal + "]";
});
c$.isYInRange = Clazz_defineMethod (c$, "isYInRange", 
function (xyCoords, min, max) {
return (JSV.common.Coordinate.getMinY (xyCoords, 0, xyCoords.length - 1) >= min && JSV.common.Coordinate.getMaxY (xyCoords, 0, xyCoords.length - 1) >= max);
}, "~A,~N,~N");
c$.normalise = Clazz_defineMethod (c$, "normalise", 
function (xyCoords, min, max) {
var newXYCoords =  new Array (xyCoords.length);
var minY = JSV.common.Coordinate.getMinY (xyCoords, 0, xyCoords.length - 1);
var maxY = JSV.common.Coordinate.getMaxY (xyCoords, 0, xyCoords.length - 1);
var factor = (maxY - minY) / (max - min);
for (var i = 0; i < xyCoords.length; i++) newXYCoords[i] =  new JSV.common.Coordinate ().set (xyCoords[i].getXVal (), ((xyCoords[i].getYVal () - minY) / factor) - min);

return newXYCoords;
}, "~A,~N,~N");
c$.reverse = Clazz_defineMethod (c$, "reverse", 
function (x) {
var n = x.length;
for (var i = 0; i < n; i++) {
var v = x[i];
x[i] = x[--n];
x[n] = v;
}
return x;
}, "~A");
c$.parseDSV = Clazz_defineMethod (c$, "parseDSV", 
function (dataPoints, xFactor, yFactor) {
var point;
var xval = 0;
var yval = 0;
var xyCoords =  new JU.Lst ();
var delim = " \t\n\r\f,;";
var st =  new java.util.StringTokenizer (dataPoints, delim);
var tmp1;
var tmp2;
while (st.hasMoreTokens ()) {
tmp1 = st.nextToken ().trim ();
tmp2 = st.nextToken ().trim ();
xval = Double.parseDouble (tmp1);
yval = Double.parseDouble (tmp2);
point =  new JSV.common.Coordinate ().set (xval * xFactor, yval * yFactor);
xyCoords.addLast (point);
}
var coord =  new Array (xyCoords.size ());
return xyCoords.toArray (coord);
}, "~S,~N,~N");
c$.deltaX = Clazz_defineMethod (c$, "deltaX", 
function (last, first, numPoints) {
var test = (last - first) / (numPoints - 1);
return test;
}, "~N,~N,~N");
c$.removeScale = Clazz_defineMethod (c$, "removeScale", 
function (xyCoords, xScale, yScale) {
JSV.common.Coordinate.applyScale (xyCoords, (1 / xScale), (1 / yScale));
}, "~A,~N,~N");
c$.applyScale = Clazz_defineMethod (c$, "applyScale", 
function (xyCoords, xScale, yScale) {
if (xScale != 1 || yScale != 1) {
for (var i = 0; i < xyCoords.length; i++) {
xyCoords[i].setXVal (xyCoords[i].getXVal () * xScale);
xyCoords[i].setYVal (xyCoords[i].getYVal () * yScale);
}
}}, "~A,~N,~N");
c$.applyShiftReference = Clazz_defineMethod (c$, "applyShiftReference", 
function (xyCoords, dataPointNum, firstX, lastX, offset, observedFreq, shiftRefType) {
if (dataPointNum > xyCoords.length || dataPointNum < 0) return;
var coord;
switch (shiftRefType) {
case 0:
offset = xyCoords[xyCoords.length - dataPointNum].getXVal () - offset * observedFreq;
break;
case 1:
offset = firstX - offset * observedFreq;
break;
case 2:
offset = lastX + offset;
break;
}
for (var index = 0; index < xyCoords.length; index++) {
coord = xyCoords[index];
coord.setXVal (coord.getXVal () - offset);
xyCoords[index] = coord;
}
firstX -= offset;
lastX -= offset;
}, "~A,~N,~N,~N,~N,~N,~N");
c$.getMinX = Clazz_defineMethod (c$, "getMinX", 
function (coords, start, end) {
var min = 1.7976931348623157E308;
for (var index = start; index <= end; index++) {
var tmp = coords[index].getXVal ();
if (tmp < min) min = tmp;
}
return min;
}, "~A,~N,~N");
c$.getMinX = Clazz_defineMethod (c$, "getMinX", 
function (spectra, vd) {
var min = 1.7976931348623157E308;
for (var i = 0; i < spectra.size (); i++) {
var xyCoords = spectra.get (i).getXYCoords ();
var tmp = JSV.common.Coordinate.getMinX (xyCoords, vd.getStartingPointIndex (i), vd.getEndingPointIndex (i));
if (tmp < min) min = tmp;
}
return min;
}, "JU.Lst,JSV.common.ViewData");
c$.getMaxX = Clazz_defineMethod (c$, "getMaxX", 
function (coords, start, end) {
var max = -1.7976931348623157E308;
for (var index = start; index <= end; index++) {
var tmp = coords[index].getXVal ();
if (tmp > max) max = tmp;
}
return max;
}, "~A,~N,~N");
c$.getMaxX = Clazz_defineMethod (c$, "getMaxX", 
function (spectra, vd) {
var max = -1.7976931348623157E308;
for (var i = 0; i < spectra.size (); i++) {
var xyCoords = spectra.get (i).getXYCoords ();
var tmp = JSV.common.Coordinate.getMaxX (xyCoords, vd.getStartingPointIndex (i), vd.getEndingPointIndex (i));
if (tmp > max) max = tmp;
}
return max;
}, "JU.Lst,JSV.common.ViewData");
c$.getMinY = Clazz_defineMethod (c$, "getMinY", 
function (coords, start, end) {
var min = 1.7976931348623157E308;
for (var index = start; index <= end; index++) {
var tmp = coords[index].getYVal ();
if (tmp < min) min = tmp;
}
return min;
}, "~A,~N,~N");
c$.getMinYUser = Clazz_defineMethod (c$, "getMinYUser", 
function (spectra, vd) {
var min = 1.7976931348623157E308;
for (var i = 0; i < spectra.size (); i++) {
var u = spectra.get (i).getUserYFactor ();
var yref = spectra.get (i).getYRef ();
var xyCoords = spectra.get (i).getXYCoords ();
var tmp = (JSV.common.Coordinate.getMinY (xyCoords, vd.getStartingPointIndex (i), vd.getEndingPointIndex (i)) - yref) * u + yref;
if (tmp < min) min = tmp;
}
return min;
}, "JU.Lst,JSV.common.ViewData");
c$.getMaxY = Clazz_defineMethod (c$, "getMaxY", 
function (coords, start, end) {
var max = -1.7976931348623157E308;
for (var index = start; index <= end; index++) {
var tmp = coords[index].getYVal ();
if (tmp > max) max = tmp;
}
return max;
}, "~A,~N,~N");
c$.getMaxYUser = Clazz_defineMethod (c$, "getMaxYUser", 
function (spectra, vd) {
var max = -1.7976931348623157E308;
for (var i = 0; i < spectra.size (); i++) {
var u = spectra.get (i).getUserYFactor ();
var yref = spectra.get (i).getYRef ();
var xyCoords = spectra.get (i).getXYCoords ();
var tmp = (JSV.common.Coordinate.getMaxY (xyCoords, vd.getStartingPointIndex (i), vd.getEndingPointIndex (i)) - yref) * u + yref;
if (tmp > max) max = tmp;
}
return max;
}, "JU.Lst,JSV.common.ViewData");
c$.getYValueAt = Clazz_defineMethod (c$, "getYValueAt", 
function (xyCoords, xPt) {
var i = JSV.common.Coordinate.getNearestIndexForX (xyCoords, xPt);
if (i == 0 || i == xyCoords.length) return NaN;
var x1 = xyCoords[i].getXVal ();
var x0 = xyCoords[i - 1].getXVal ();
var y1 = xyCoords[i].getYVal ();
var y0 = xyCoords[i - 1].getYVal ();
if (x1 == x0) return y1;
return y0 + (y1 - y0) / (x1 - x0) * (xPt - x0);
}, "~A,~N");
c$.intoRange = Clazz_defineMethod (c$, "intoRange", 
function (i, i0, i1) {
return Math.max (Math.min (i, i1), i0);
}, "~N,~N,~N");
c$.getNearestIndexForX = Clazz_defineMethod (c$, "getNearestIndexForX", 
function (xyCoords, xPt) {
var x =  new JSV.common.Coordinate ().set (xPt, 0);
var i = java.util.Arrays.binarySearch (xyCoords, x, JSV.common.Coordinate.c);
if (i < 0) i = -1 - i;
if (i < 0) return 0;
if (i > xyCoords.length - 1) return xyCoords.length - 1;
return i;
}, "~A,~N");
c$.findXForPeakNearest = Clazz_defineMethod (c$, "findXForPeakNearest", 
function (xyCoords, x, isMin) {
var pt = JSV.common.Coordinate.getNearestIndexForX (xyCoords, x);
var f = (isMin ? -1 : 1);
while (pt < xyCoords.length - 1 && f * (xyCoords[pt + 1].yVal - xyCoords[pt].yVal) > 0) pt++;

while (pt >= 1 && f * (xyCoords[pt - 1].yVal - xyCoords[pt].yVal) > 0) pt--;

if (pt == 0 || pt == xyCoords.length - 1) return xyCoords[pt].xVal;
return JSV.common.Coordinate.parabolicInterpolation (xyCoords, pt);
}, "~A,~N,~B");
c$.parabolicInterpolation = Clazz_defineMethod (c$, "parabolicInterpolation", 
function (xyCoords, pt) {
var alpha = xyCoords[pt - 1].yVal;
var beta = xyCoords[pt].yVal;
var gamma = xyCoords[pt + 1].yVal;
var p = (alpha - gamma) / 2 / (alpha - 2 * beta + gamma);
return xyCoords[pt].xVal + p * (xyCoords[pt + 1].xVal - xyCoords[pt].xVal);
}, "~A,~N");
c$.getPickedCoordinates = Clazz_defineMethod (c$, "getPickedCoordinates", 
function (coordsClicked, coordClicked, coord, actualCoord) {
if (coordClicked == null) return false;
var x = coordClicked.getXVal ();
coord.setXVal (x);
coord.setYVal (coordClicked.getYVal ());
if (actualCoord == null) return true;
var pt = JSV.common.Coordinate.getNearestIndexForX (coordsClicked, x);
actualCoord.setXVal (coordsClicked[pt].getXVal ());
actualCoord.setYVal (coordsClicked[pt].getYVal ());
return true;
}, "~A,JSV.common.Coordinate,JSV.common.Coordinate,JSV.common.Coordinate");
c$.shiftX = Clazz_defineMethod (c$, "shiftX", 
function (xyCoords, dx) {
for (var i = xyCoords.length; --i >= 0; ) xyCoords[i].xVal += dx;

}, "~A,~N");
c$.getNearestXWithYAbove = Clazz_defineMethod (c$, "getNearestXWithYAbove", 
function (xyCoords, x, y, inverted, andGreaterThanX) {
var pt = JSV.common.Coordinate.getNearestIndexForX (xyCoords, x);
var f = (inverted ? -1 : 1);
if (andGreaterThanX) while (pt < xyCoords.length && f * (xyCoords[pt].yVal - y) < 0) pt++;

 else while (pt >= 0 && f * (xyCoords[pt].yVal - y) < 0) pt--;

if (pt == -1 || pt == xyCoords.length) return NaN;
return JSV.common.Coordinate.findXForPeakNearest (xyCoords, xyCoords[pt].getXVal (), inverted);
}, "~A,~N,~N,~B,~B");
c$.c = c$.prototype.c =  new JSV.common.CoordComparator ();
});
Clazz_declarePackage ("JSV.common");
Clazz_load (["java.lang.Enum"], "JSV.common.ExportType", null, function () {
c$ = Clazz_declareType (JSV.common, "ExportType", Enum);
c$.getType = Clazz_defineMethod (c$, "getType", 
function (type) {
type = type.toUpperCase ();
if (type.equalsIgnoreCase ("Original...")) return JSV.common.ExportType.SOURCE;
if (type.startsWith ("XML")) return JSV.common.ExportType.AML;
for (var mode, $mode = 0, $$mode = JSV.common.ExportType.values (); $mode < $$mode.length && ((mode = $$mode[$mode]) || true); $mode++) if (mode.name ().equals (type)) return mode;

return JSV.common.ExportType.UNK;
}, "~S");
c$.isExportMode = Clazz_defineMethod (c$, "isExportMode", 
function (ext) {
return (JSV.common.ExportType.getType (ext) !== JSV.common.ExportType.UNK);
}, "~S");
Clazz_defineEnumConstant (c$, "UNK", 0, []);
Clazz_defineEnumConstant (c$, "SOURCE", 1, []);
Clazz_defineEnumConstant (c$, "DIF", 2, []);
Clazz_defineEnumConstant (c$, "FIX", 3, []);
Clazz_defineEnumConstant (c$, "SQZ", 4, []);
Clazz_defineEnumConstant (c$, "PAC", 5, []);
Clazz_defineEnumConstant (c$, "XY", 6, []);
Clazz_defineEnumConstant (c$, "DIFDUP", 7, []);
Clazz_defineEnumConstant (c$, "PNG", 8, []);
Clazz_defineEnumConstant (c$, "JPG", 9, []);
Clazz_defineEnumConstant (c$, "SVG", 10, []);
Clazz_defineEnumConstant (c$, "SVGI", 11, []);
Clazz_defineEnumConstant (c$, "CML", 12, []);
Clazz_defineEnumConstant (c$, "AML", 13, []);
Clazz_defineEnumConstant (c$, "PDF", 14, []);
});
Clazz_declarePackage ("JSV.common");
Clazz_load (["JSV.common.XYScaleConverter", "java.util.Hashtable", "JU.BS", "$.Lst", "JSV.common.Coordinate"], "JSV.common.GraphSet", ["java.lang.Boolean", "$.Double", "$.Float", "JU.DF", "$.PT", "JSV.common.Annotation", "$.ColorParameters", "$.ColoredAnnotation", "$.ImageView", "$.Integral", "$.IntegralData", "$.Measurement", "$.MeasurementData", "$.PanelData", "$.Parameters", "$.PeakData", "$.PeakPickEvent", "$.PlotWidget", "$.ScaleData", "$.ScriptToken", "$.Spectrum", "$.ViewData", "JU.Logger"], function () {
c$ = Clazz_decorateAsClass (function () {
this.gs2dLinkedX = null;
this.gs2dLinkedY = null;
this.cur1D2Locked = false;
this.highlights = null;
this.spectra = null;
this.isSplittable = true;
this.allowStacking = true;
this.annotations = null;
this.selectedSpectrumMeasurements = null;
this.selectedSpectrumIntegrals = null;
this.lastAnnotation = null;
this.pendingMeasurement = null;
this.pendingIntegral = null;
this.graphsTemp = null;
this.widgets = null;
this.isLinked = false;
this.haveSingleYScale = false;
this.iSpectrumMovedTo = 0;
this.iSpectrumClicked = 0;
this.iSpectrumSelected = -1;
this.stackSelected = false;
this.bsSelected = null;
this.viewData = null;
this.reversePlot = false;
this.nSplit = 1;
this.yStackOffsetPercent = 0;
this.showAllStacked = true;
this.viewList = null;
this.imageView = null;
this.pd = null;
this.sticky2Dcursor = false;
this.nSpectra = 0;
this.fracX = 1;
this.fracY = 1;
this.fX0 = 0;
this.fY0 = 0;
this.zoomBox1D = null;
this.zoomBox2D = null;
this.pin1Dx0 = null;
this.pin1Dx1 = null;
this.pin1Dy0 = null;
this.pin1Dy1 = null;
this.pin1Dx01 = null;
this.pin1Dy01 = null;
this.pin2Dx0 = null;
this.pin2Dx1 = null;
this.pin2Dy0 = null;
this.pin2Dy1 = null;
this.pin2Dx01 = null;
this.pin2Dy01 = null;
this.cur2Dx0 = null;
this.cur2Dx1 = null;
this.cur1D2x1 = null;
this.cur1D2x2 = null;
this.cur2Dy = null;
this.xPixel0 = 0;
this.yPixel0 = 0;
this.xPixel1 = 0;
this.yPixel1 = 0;
this.xVArrows = 0;
this.xHArrows = 0;
this.yHArrows = 0;
this.xPixel00 = 0;
this.yPixel00 = 0;
this.xPixel11 = 0;
this.yPixel11 = 0;
this.yPixel000 = 0;
this.xPixels = 0;
this.yPixels = 0;
this.xPixel10 = 0;
this.xPixels0 = 0;
this.allowStackedYScale = true;
this.drawXAxisLeftToRight = false;
this.xAxisLeftToRight = true;
this.iPreviousSpectrumClicked = -1;
this.$haveSelectedSpectrum = false;
this.zoomEnabled = false;
this.currentZoomIndex = 0;
this.lastClickX = NaN;
this.lastPixelX = 2147483647;
this.height = 0;
this.width = 0;
this.right = 0;
this.top = 0;
this.left = 0;
this.bottom = 0;
this.piMouseOver = null;
this.coordTemp = null;
this.FONT_PLAIN = 0;
this.FONT_BOLD = 1;
this.FONT_ITALIC = 2;
this.is2DSpectrum = false;
this.selectedMeasurement = null;
this.selectedIntegral = null;
this.lastXMax = NaN;
this.lastSpecClicked = -1;
this.inPlotMove = false;
this.xPixelMovedTo = -1;
this.xPixelMovedTo2 = -1;
this.yValueMovedTo = 0;
this.xValueMovedTo = 0;
this.haveLeftRightArrows = false;
this.xPixelPlot1 = 0;
this.xPixelPlot0 = 0;
this.yPixelPlot0 = 0;
this.yPixelPlot1 = 0;
this.nextClickForSetPeak = null;
this.closerX = 0;
this.closerY = 0;
this.splitterX = 0;
this.splitterY = 0;
this.mapX = null;
if (!Clazz_isClassDefined ("JSV.common.GraphSet.Highlight")) {
JSV.common.GraphSet.$GraphSet$Highlight$ ();
}
this.widgetsAreSet = true;
this.lastIntDragX = 0;
this.nextClickMode = 0;
this.dialogs = null;
this.aIntegrationRatios = null;
this.jsvp = null;
this.image2D = null;
this.plotColors = null;
this.g2d = null;
this.gMain = null;
this.COLOR_GREY = -3;
this.COLOR_BLACK = -2;
this.COLOR_INTEGRAL = -1;
Clazz_instantialize (this, arguments);
}, JSV.common, "GraphSet", null, JSV.common.XYScaleConverter);
Clazz_prepareFields (c$, function () {
this.highlights =  new JU.Lst ();
this.spectra =  new JU.Lst ();
this.graphsTemp =  new JU.Lst ();
this.bsSelected =  new JU.BS ();
this.coordTemp =  new JSV.common.Coordinate ();
this.mapX =  new java.util.Hashtable ();
});
Clazz_makeConstructor (c$, 
function (pd) {
this.pd = pd;
this.jsvp = pd.jsvp;
this.g2d = pd.g2d;
}, "JSV.common.PanelData");
Clazz_defineMethod (c$, "setSpectrumMovedTo", 
 function (i) {
return this.iSpectrumMovedTo = i;
}, "~N");
Clazz_defineMethod (c$, "setSpectrumClicked", 
 function (i) {
this.stackSelected = this.showAllStacked;
if (i < 0 || this.iSpectrumClicked != i) {
this.lastClickX = NaN;
this.lastPixelX = 2147483647;
}this.iSpectrumClicked = this.setSpectrumSelected (this.setSpectrumMovedTo (i));
}, "~N");
Clazz_defineMethod (c$, "setSpectrumSelected", 
 function (i) {
var isNew = (i != this.iSpectrumSelected);
this.iSpectrumSelected = i;
if (isNew) {
this.getCurrentView ();
}return this.iSpectrumSelected;
}, "~N");
Clazz_defineMethod (c$, "closeDialogsExcept", 
function (type) {
if (this.dialogs != null) for (var e, $e = this.dialogs.entrySet ().iterator (); $e.hasNext () && ((e = $e.next ()) || true);) {
var ad = e.getValue ();
if (ad.isDialog () && (type === JSV.common.Annotation.AType.NONE || ad.getAType () !== type)) (ad).setVisible (false);
}
}, "JSV.common.Annotation.AType");
Clazz_defineMethod (c$, "dispose", 
function () {
this.spectra = null;
this.viewData = null;
this.viewList = null;
this.annotations = null;
this.lastAnnotation = null;
this.pendingMeasurement = null;
this.imageView = null;
this.graphsTemp = null;
this.widgets = null;
this.disposeImage ();
if (this.dialogs != null) for (var e, $e = this.dialogs.entrySet ().iterator (); $e.hasNext () && ((e = $e.next ()) || true);) {
var ad = e.getValue ();
if (ad.isDialog ()) (ad).dispose ();
}
this.dialogs = null;
});
Clazz_defineMethod (c$, "isDrawNoSpectra", 
 function () {
return (this.iSpectrumSelected == -2147483648);
});
Clazz_defineMethod (c$, "getFixedSelectedSpectrumIndex", 
 function () {
return Math.max (this.iSpectrumSelected, 0);
});
Clazz_defineMethod (c$, "getSpectrum", 
function () {
return this.getSpectrumAt (this.getFixedSelectedSpectrumIndex ()).getCurrentSubSpectrum ();
});
Clazz_defineMethod (c$, "getSpectrumAt", 
function (index) {
return this.spectra.get (index);
}, "~N");
Clazz_defineMethod (c$, "getSpectrumIndex", 
function (spec) {
for (var i = this.spectra.size (); --i >= 0; ) if (this.spectra.get (i) === spec) return i;

return -1;
}, "JSV.common.Spectrum");
Clazz_defineMethod (c$, "addSpec", 
 function (spec) {
this.spectra.addLast (spec);
this.nSpectra++;
}, "JSV.common.Spectrum");
Clazz_defineMethod (c$, "splitStack", 
function (doSplit) {
if (doSplit && this.isSplittable) {
this.nSplit = this.nSpectra;
this.showAllStacked = false;
this.setSpectrumClicked (this.iSpectrumSelected);
this.pd.currentSplitPoint = this.iSpectrumSelected;
} else {
this.nSplit = 1;
this.showAllStacked = this.allowStacking && !doSplit;
this.setSpectrumClicked (this.iSpectrumSelected);
}this.stackSelected = false;
JSV.common.GraphSet.setFractionalPositions (this.pd, this.pd.graphSets, JSV.common.PanelData.LinkMode.NONE);
this.pd.setTaintedAll ();
}, "~B");
Clazz_defineMethod (c$, "setPositionForFrame", 
 function (iSplit) {
if (iSplit < 0) iSplit = 0;
var marginalHeight = this.height - 50;
this.xPixel00 = Clazz_doubleToInt (this.width * this.fX0);
this.xPixel11 = Clazz_doubleToInt (this.xPixel00 + this.width * this.fracX - 1);
this.xHArrows = this.xPixel00 + 25;
this.xVArrows = this.xPixel11 - Clazz_doubleToInt (this.right / 2);
this.xPixel0 = this.xPixel00 + Clazz_doubleToInt (this.left * (1 - this.fX0));
this.xPixel10 = this.xPixel1 = this.xPixel11 - this.right;
this.xPixels0 = this.xPixels = this.xPixel1 - this.xPixel0 + 1;
this.yPixel000 = (this.fY0 == 0 ? 25 : 0) + Clazz_doubleToInt (this.height * this.fY0);
this.yPixel00 = this.yPixel000 + Clazz_doubleToInt (marginalHeight * this.fracY * iSplit);
this.yPixel11 = this.yPixel00 + Clazz_doubleToInt (marginalHeight * this.fracY) - 1;
this.yHArrows = this.yPixel11 - 12;
this.yPixel0 = this.yPixel00 + Clazz_doubleToInt (this.top / 2);
this.yPixel1 = this.yPixel11 - Clazz_doubleToInt (this.bottom / 2);
this.yPixels = this.yPixel1 - this.yPixel0 + 1;
if (this.imageView != null && this.is2DSpectrum) {
this.setImageWindow ();
if (this.pd.display1D) {
var widthRatio = (this.pd.display1D ? 1.0 * (this.xPixels0 - this.imageView.xPixels) / this.xPixels0 : 1);
this.xPixels = Clazz_doubleToInt (Math.floor (widthRatio * this.xPixels0 * 0.8));
this.xPixel1 = this.xPixel0 + this.xPixels - 1;
} else {
this.xPixels = 0;
this.xPixel1 = this.imageView.xPixel0 - 30;
}}}, "~N");
Clazz_defineMethod (c$, "hasPoint", 
 function (xPixel, yPixel) {
return (xPixel >= this.xPixel00 && xPixel <= this.xPixel11 && yPixel >= this.yPixel000 && yPixel <= this.yPixel11 * this.nSplit);
}, "~N,~N");
Clazz_defineMethod (c$, "isInPlotRegion", 
 function (xPixel, yPixel) {
return (xPixel >= this.xPixel0 && xPixel <= this.xPixel1 && yPixel >= this.yPixel0 && yPixel <= this.yPixel1);
}, "~N,~N");
Clazz_defineMethod (c$, "getSplitPoint", 
function (yPixel) {
return Math.max (0, Math.min ((Clazz_doubleToInt ((yPixel - this.yPixel000) / (this.yPixel11 - this.yPixel00))), this.nSplit - 1));
}, "~N");
Clazz_defineMethod (c$, "isSplitWidget", 
 function (xPixel, yPixel) {
return this.isFrameBox (xPixel, yPixel, this.splitterX, this.splitterY);
}, "~N,~N");
Clazz_defineMethod (c$, "isCloserWidget", 
 function (xPixel, yPixel) {
return this.isFrameBox (xPixel, yPixel, this.closerX, this.closerY);
}, "~N,~N");
Clazz_defineMethod (c$, "initGraphSet", 
 function (startIndex, endIndex) {
if (JSV.common.GraphSet.veryLightGrey == null) JSV.common.GraphSet.veryLightGrey = this.g2d.getColor3 (200, 200, 200);
this.setPlotColors (JSV.common.ColorParameters.defaultPlotColors);
this.xAxisLeftToRight = this.getSpectrumAt (0).shouldDisplayXAxisIncreasing ();
this.setDrawXAxis ();
var startIndices =  Clazz_newIntArray (this.nSpectra, 0);
var endIndices =  Clazz_newIntArray (this.nSpectra, 0);
this.bsSelected.setBits (0, this.nSpectra);
this.allowStackedYScale = true;
if (endIndex <= 0) endIndex = 2147483647;
this.isSplittable = (this.nSpectra > 1);
this.allowStacking = (this.spectra.get (0).isStackable ());
this.showAllStacked = this.allowStacking && (this.nSpectra > 1);
for (var i = 0; i < this.nSpectra; i++) {
var iLast = this.spectra.get (i).getXYCoords ().length - 1;
startIndices[i] = JSV.common.Coordinate.intoRange (startIndex, 0, iLast);
endIndices[i] = JSV.common.Coordinate.intoRange (endIndex, 0, iLast);
this.allowStackedYScale = new Boolean (this.allowStackedYScale & (this.spectra.get (i).getYUnits ().equals (this.spectra.get (0).getYUnits ()) && this.spectra.get (i).getUserYFactor () == this.spectra.get (0).getUserYFactor ())).valueOf ();
}
this.getView (0, 0, 0, 0, startIndices, endIndices, null, null);
this.viewList =  new JU.Lst ();
this.viewList.addLast (this.viewData);
}, "~N,~N");
Clazz_defineMethod (c$, "getView", 
 function (x1, x2, y1, y2, startIndices, endIndices, viewScales, yScales) {
var graphs = (this.graphsTemp.size () == 0 ? this.spectra : this.graphsTemp);
var subspecs = this.getSpectrumAt (0).getSubSpectra ();
var dontUseSubspecs = (subspecs == null || subspecs.size () == 2 && subspecs.get (1).isImaginary ());
var is2D = !this.getSpectrumAt (0).is1D ();
var useFirstSubSpecOnly = false;
if (is2D && useFirstSubSpecOnly || dontUseSubspecs && y1 == y2) {
graphs = this.spectra;
} else if (y1 == y2) {
this.viewData =  new JSV.common.ViewData (subspecs, y1, y2, this.getSpectrum ().isContinuous ());
graphs = null;
}if (graphs != null) {
this.viewData =  new JSV.common.ViewData (graphs, y1, y2, startIndices, endIndices, this.getSpectrumAt (0).isContinuous (), is2D);
if (x1 != x2) this.getScale ().setXRange (x1, x2);
}if (viewScales != null) {
JSV.common.ScaleData.copyScaleFactors (viewScales, this.viewData.getScaleData ());
if (yScales != null) JSV.common.ScaleData.copyYScales (yScales, this.viewData.getScaleData ());
this.getCurrentView ();
}}, "~N,~N,~N,~N,~A,~A,~A,~A");
Clazz_defineMethod (c$, "isNearby", 
 function (a1, a2, c, range) {
var x = a1.getXVal ();
var xp1 = c.toPixelX (x);
var yp1 = this.toPixelY (a1.getYVal ());
x = a2.getXVal ();
var xp2 = c.toPixelX (x);
var yp2 = this.toPixelY (a2.getYVal ());
return (Math.abs (xp1 - xp2) + Math.abs (yp1 - yp2) < range);
}, "JSV.common.Coordinate,JSV.common.Coordinate,JSV.common.XYScaleConverter,~N");
Clazz_defineMethod (c$, "setReversePlot", 
function (val) {
this.reversePlot = val;
if (this.reversePlot) this.closeDialogsExcept (JSV.common.Annotation.AType.NONE);
this.setDrawXAxis ();
}, "~B");
Clazz_defineMethod (c$, "setDrawXAxis", 
 function () {
this.drawXAxisLeftToRight =  new Boolean (this.xAxisLeftToRight ^ this.reversePlot).valueOf ();
for (var i = 0; i < this.spectra.size (); i++) (this.spectra.get (i)).setExportXAxisDirection (this.drawXAxisLeftToRight);

});
Clazz_defineMethod (c$, "isInTopBar", 
 function (xPixel, yPixel) {
return (xPixel == this.fixX (xPixel) && yPixel > this.pin1Dx0.yPixel0 - 2 && yPixel < this.pin1Dx0.yPixel1);
}, "~N,~N");
Clazz_defineMethod (c$, "isInTopBar2D", 
 function (xPixel, yPixel) {
return (this.imageView != null && xPixel == this.imageView.fixX (xPixel) && yPixel > this.pin2Dx0.yPixel0 - 2 && yPixel < this.pin2Dx0.yPixel1);
}, "~N,~N");
Clazz_defineMethod (c$, "isInRightBar", 
 function (xPixel, yPixel) {
return (yPixel == this.fixY (yPixel) && xPixel > this.pin1Dy0.xPixel1 && xPixel < this.pin1Dy0.xPixel0 + 2);
}, "~N,~N");
Clazz_defineMethod (c$, "isInRightBar2D", 
 function (xPixel, yPixel) {
return (this.imageView != null && yPixel == this.fixY (yPixel) && xPixel > this.pin2Dy0.xPixel1 && xPixel < this.pin2Dy0.xPixel0 + 2);
}, "~N,~N");
Clazz_defineMethod (c$, "toX0", 
 function (xPixel) {
return this.viewList.get (0).getScale ().toX0 (this.fixX (xPixel), this.xPixel0, this.xPixel1, this.drawXAxisLeftToRight);
}, "~N");
Clazz_defineMethod (c$, "toY0", 
 function (yPixel) {
return this.viewList.get (0).getScale ().toY0 (this.fixY (yPixel), this.yPixel0, this.yPixel1);
}, "~N");
Clazz_overrideMethod (c$, "toX", 
function (xPixel) {
if (this.imageView != null && this.imageView.isXWithinRange (xPixel)) return this.imageView.toX (xPixel);
return this.getScale ().toX (this.fixX (xPixel), this.xPixel1, this.drawXAxisLeftToRight);
}, "~N");
Clazz_overrideMethod (c$, "toY", 
function (yPixel) {
return this.getScale ().toY (yPixel, this.yPixel0);
}, "~N");
Clazz_defineMethod (c$, "toPixelX", 
function (dx) {
return this.getScale ().toPixelX (dx, this.xPixel0, this.xPixel1, this.drawXAxisLeftToRight);
}, "~N");
Clazz_defineMethod (c$, "toPixelY", 
function (yVal) {
return this.getScale ().toPixelY (yVal, this.yPixel1);
}, "~N");
Clazz_defineMethod (c$, "toPixelX0", 
 function (x) {
return this.viewList.get (0).getScale ().toPixelX0 (x, this.xPixel0, this.xPixel1, this.drawXAxisLeftToRight);
}, "~N");
Clazz_defineMethod (c$, "toPixelY0", 
 function (y) {
return this.fixY (this.viewList.get (0).getScale ().toPixelY0 (y, this.yPixel0, this.yPixel1));
}, "~N");
Clazz_defineMethod (c$, "fixX", 
function (xPixel) {
return JSV.common.Coordinate.intoRange (xPixel, this.xPixel0, this.xPixel1);
}, "~N");
Clazz_defineMethod (c$, "fixY", 
function (yPixel) {
return JSV.common.Coordinate.intoRange (yPixel, this.yPixel0, this.yPixel1);
}, "~N");
Clazz_defineMethod (c$, "getXPixel0", 
function () {
return this.xPixel0;
});
Clazz_defineMethod (c$, "getXPixels", 
function () {
return this.xPixels;
});
Clazz_overrideMethod (c$, "getYPixels", 
function () {
return this.yPixels;
});
Clazz_defineMethod (c$, "getScale", 
function () {
return this.viewData.getScale ();
});
Clazz_defineMethod (c$, "toPixelYint", 
 function (yVal) {
return this.yPixel1 - Clazz_doubleToInt (Double.isNaN (yVal) ? -2147483648 : this.yPixels * yVal);
}, "~N");
Clazz_defineMethod (c$, "findAnnotation2D", 
 function (xy) {
for (var i = this.annotations.size (); --i >= 0; ) {
var a = this.annotations.get (i);
if (this.isNearby (a, xy, this.imageView, 10)) return a;
}
return null;
}, "JSV.common.Coordinate");
Clazz_defineMethod (c$, "addAnnotation", 
 function (annotation, isToggle) {
if (this.annotations == null) this.annotations =  new JU.Lst ();
var removed = false;
for (var i = this.annotations.size (); --i >= 0; ) if (annotation.is2D ? this.isNearby (this.annotations.get (i), annotation, this.imageView, 10) : annotation.equals (this.annotations.get (i))) {
removed = true;
this.annotations.removeItemAt (i);
}
if (annotation.text.length > 0 && (!removed || !isToggle)) this.annotations.addLast (annotation);
}, "JSV.common.Annotation,~B");
Clazz_defineMethod (c$, "setImageWindow", 
 function () {
this.imageView.setPixelWidthHeight (Clazz_doubleToInt ((this.pd.display1D ? 0.6 : 1) * this.xPixels0), this.yPixels);
this.imageView.setXY0 (this.getSpectrumAt (0), Clazz_doubleToInt (Math.floor (this.xPixel10 - this.imageView.xPixels)), this.yPixel0);
});
Clazz_defineMethod (c$, "findNearestMaxMin", 
 function () {
if (this.nSpectra > 1 && this.iSpectrumClicked < 0) return false;
this.xValueMovedTo = this.getSpectrum ().findXForPeakNearest (this.xValueMovedTo);
this.setXPixelMovedTo (this.xValueMovedTo, 1.7976931348623157E308, 0, 0);
return !Double.isNaN (this.xValueMovedTo);
});
Clazz_defineMethod (c$, "setXPixelMovedTo", 
function (x1, x2, xPixel1, xPixel2) {
if (x1 == 1.7976931348623157E308 && x2 == 1.7976931348623157E308) {
this.xPixelMovedTo = xPixel1;
this.xPixelMovedTo2 = xPixel2;
if (this.isLinked && this.sticky2Dcursor) {
this.pd.setlinkedXMove (this, this.toX (this.xPixelMovedTo), false);
}return;
}if (x1 != 1.7976931348623157E308) {
this.xPixelMovedTo = this.toPixelX (x1);
if (this.fixX (this.xPixelMovedTo) != this.xPixelMovedTo) this.xPixelMovedTo = -1;
this.xPixelMovedTo2 = -1;
if (x1 != 1e10) this.setSpectrumClicked (this.getFixedSelectedSpectrumIndex ());
}if (x2 != 1.7976931348623157E308) {
this.xPixelMovedTo2 = this.toPixelX (x2);
}}, "~N,~N,~N,~N");
Clazz_defineMethod (c$, "processPendingMeasurement", 
 function (xPixel, yPixel, clickCount) {
if (!this.isInPlotRegion (xPixel, yPixel) || this.is2dClick (xPixel, yPixel)) {
this.pendingMeasurement = null;
return;
}var x = this.toX (xPixel);
var y = this.toY (yPixel);
var x0 = x;
var m;
switch (clickCount) {
case 0:
this.pendingMeasurement.setPt2 (this.toX (xPixel), this.toY (yPixel));
break;
case 3:
case 2:
if (this.iSpectrumClicked < 0) return;
var spec = this.spectra.get (this.iSpectrumClicked);
this.setScale (this.iSpectrumClicked);
if (clickCount == 3) {
} else {
m = this.findMeasurement (this.selectedSpectrumMeasurements, xPixel, yPixel, 1);
if (m != null) {
x = m.getXVal ();
y = m.getYVal ();
} else if ((m = this.findMeasurement (this.selectedSpectrumMeasurements, xPixel, yPixel, 2)) != null) {
x = m.getXVal2 ();
y = m.getYVal2 ();
} else {
x = this.getNearestPeak (spec, x, y);
}}this.pendingMeasurement =  new JSV.common.Measurement ().setM1 (x, y, spec);
this.pendingMeasurement.setPt2 (x0, y);
this.pd.setTaintedAll ();
this.pd.repaint ();
break;
case 1:
case -2:
case -3:
var isOK = (this.pendingMeasurement != null && this.isVisible (this.getDialog (JSV.common.Annotation.AType.Measurements, -1)));
while (isOK) {
this.setScale (this.getSpectrumIndex (this.pendingMeasurement.spec));
if (clickCount != 3) {
if (!this.findNearestMaxMin ()) {
isOK = false;
break;
}xPixel = this.xPixelMovedTo;
}x = this.toX (xPixel);
y = this.toY (yPixel);
this.pendingMeasurement.setPt2 (x, y);
if (this.pendingMeasurement.text.length == 0) {
isOK = false;
break;
}this.setMeasurement (this.pendingMeasurement);
if (clickCount != 1) {
isOK = false;
break;
}this.setSpectrumClicked (this.getSpectrumIndex (this.pendingMeasurement.spec));
this.pendingMeasurement =  new JSV.common.Measurement ().setM1 (x, y, this.pendingMeasurement.spec);
break;
}
if (!isOK) this.pendingMeasurement = null;
this.pd.setTaintedAll ();
this.pd.repaint ();
break;
case 5:
if (this.findNearestMaxMin ()) {
var iSpec = this.getFixedSelectedSpectrumIndex ();
if (Double.isNaN (this.lastXMax) || this.lastSpecClicked != iSpec || this.pendingMeasurement == null) {
this.lastXMax = this.xValueMovedTo;
this.lastSpecClicked = iSpec;
this.pendingMeasurement =  new JSV.common.Measurement ().setM1 (this.xValueMovedTo, this.yValueMovedTo, this.spectra.get (iSpec));
} else {
this.pendingMeasurement.setPt2 (this.xValueMovedTo, this.yValueMovedTo);
if (this.pendingMeasurement.text.length > 0) this.setMeasurement (this.pendingMeasurement);
this.pendingMeasurement = null;
this.lastXMax = NaN;
}} else {
this.lastXMax = NaN;
}break;
}
}, "~N,~N,~N");
Clazz_defineMethod (c$, "checkIntegralNormalizationClick", 
 function (xPixel, yPixel) {
if (this.selectedSpectrumIntegrals == null) return false;
var integral = this.findMeasurement (this.selectedSpectrumIntegrals, xPixel, yPixel, -5);
if (integral == null) return false;
this.selectedIntegral = integral;
this.pd.normalizeIntegral ();
this.updateDialog (JSV.common.Annotation.AType.Integration, -1);
this.setSpectrumClicked (this.getSpectrumIndex (integral.spec));
return true;
}, "~N,~N");
Clazz_defineMethod (c$, "getNearestPeak", 
 function (spec, x, y) {
var x0 = JSV.common.Coordinate.getNearestXWithYAbove (spec.getXYCoords (), x, y, spec.isInverted (), false);
var x1 = JSV.common.Coordinate.getNearestXWithYAbove (spec.getXYCoords (), x, y, spec.isInverted (), true);
return (Double.isNaN (x0) ? x1 : Double.isNaN (x1) ? x0 : Math.abs (x0 - x) < Math.abs (x1 - x) ? x0 : x1);
}, "JSV.common.Spectrum,~N,~N");
Clazz_defineMethod (c$, "findMeasurement", 
 function (measurements, xPixel, yPixel, iPt) {
if (measurements == null || measurements.size () == 0) return null;
if (iPt == 0) {
var m = this.findMeasurement (measurements, xPixel, yPixel, -1);
if (m != null || Clazz_instanceOf (measurements.get (0), JSV.common.Integral)) return m;
return this.findMeasurement (measurements, xPixel, yPixel, -2);
}for (var i = measurements.size (); --i >= 0; ) {
var m = measurements.get (i);
var x1;
var x2;
var y1;
var y2;
if (Clazz_instanceOf (m, JSV.common.Integral)) {
x1 = x2 = this.toPixelX (m.getXVal2 ());
y1 = this.toPixelYint (m.getYVal ());
y2 = this.toPixelYint (m.getYVal2 ());
} else {
x1 = this.toPixelX (m.getXVal ());
x2 = this.toPixelX (m.getXVal2 ());
y1 = y2 = (iPt == -2 ? this.yPixel1 - 2 : this.toPixelY (m.getYVal ()));
}switch (iPt) {
case 1:
if (Math.abs (xPixel - x1) + Math.abs (yPixel - y1) < 4) return m;
break;
case 2:
if (Math.abs (xPixel - x2) + Math.abs (yPixel - y2) < 4) return m;
break;
case -5:
y1 = y2 = Clazz_doubleToInt ((y1 + y2) / 2);
x2 = x1 + 20;
default:
case -1:
case -2:
if (JSV.common.GraphSet.isOnLine (xPixel, yPixel, x1, y1, x2, y2)) return m;
break;
}
}
return null;
}, "JSV.common.MeasurementData,~N,~N,~N");
Clazz_defineMethod (c$, "setMeasurement", 
 function (m) {
var iSpec = this.getSpectrumIndex (m.spec);
var ad = this.getDialog (JSV.common.Annotation.AType.Measurements, iSpec);
if (ad == null) this.addDialog (iSpec, JSV.common.Annotation.AType.Measurements, ad =  new JSV.common.MeasurementData (JSV.common.Annotation.AType.Measurements, m.spec));
ad.getData ().addLast (m.copyM ());
this.updateDialog (JSV.common.Annotation.AType.Measurements, -1);
}, "JSV.common.Measurement");
Clazz_defineMethod (c$, "checkArrowUpDownClick", 
 function (xPixel, yPixel) {
var ok = false;
var f = (this.isArrowClick (xPixel, yPixel, 3) ? JSV.common.GraphSet.RT2 : this.isArrowClick (xPixel, yPixel, 4) ? 1 / JSV.common.GraphSet.RT2 : 0);
if (f != 0) {
if (this.nSplit > 1) this.setSpectrumSelected (this.iSpectrumMovedTo);
if ((this.nSpectra == 1 || this.iSpectrumSelected >= 0) && this.spectra.get (this.getFixedSelectedSpectrumIndex ()).isTransmittance ()) f = 1 / f;
this.viewData.scaleSpectrum (this.imageView == null ? this.iSpectrumSelected : -2, f);
ok = true;
} else if (this.isArrowClick (xPixel, yPixel, -1)) {
this.resetViewCompletely ();
ok = true;
}if (ok) {
if (this.imageView != null) {
this.update2dImage (false);
this.resetPinsFromView ();
}this.pd.setTaintedAll ();
}return ok;
}, "~N,~N");
Clazz_defineMethod (c$, "resetViewCompletely", 
function () {
this.clearViews ();
if (this.showAllStacked && !this.stackSelected) this.closeDialogsExcept (JSV.common.Annotation.AType.NONE);
this.viewData.resetScaleFactors ();
this.updateDialogs ();
});
Clazz_defineMethod (c$, "checkArrowLeftRightClick", 
 function (xPixel, yPixel) {
if (this.haveLeftRightArrows) {
var dx = (this.isArrowClick (xPixel, yPixel, 1) ? -1 : this.isArrowClick (xPixel, yPixel, 2) ? 1 : 0);
if (dx != 0) {
var i = this.iSpectrumSelected + dx;
if (i < 0) i = this.nSpectra - 1;
this.setSpectrumClicked (i % this.nSpectra);
return true;
}if (this.isArrowClick (xPixel, yPixel, 0)) {
if (this.showAllStacked) {
this.showAllStacked = false;
this.setSpectrumClicked (this.getFixedSelectedSpectrumIndex ());
return true;
}this.showAllStacked = this.allowStacking;
this.setSpectrumSelected (-1);
this.stackSelected = false;
}}return false;
}, "~N,~N");
Clazz_defineMethod (c$, "isArrowClick", 
 function (xPixel, yPixel, type) {
var pt;
switch (type) {
case 3:
case 4:
case -1:
pt = Clazz_doubleToInt ((this.yPixel00 + this.yPixel11) / 2) + (type == 3 ? -1 : type == 4 ? 1 : 0) * 15;
return (Math.abs (this.xVArrows - xPixel) < 10 && Math.abs (pt - yPixel) < 10);
case 1:
case 2:
case 0:
pt = this.xHArrows + (type == 1 ? -1 : type == 2 ? 1 : 0) * 15;
return (Math.abs (pt - xPixel) < 10 && Math.abs (this.yHArrows - yPixel) < 10);
}
return false;
}, "~N,~N,~N");
Clazz_defineMethod (c$, "setWidgetValueByUser", 
 function (pw) {
var sval;
if (pw === this.cur2Dy) sval = "" + this.imageView.toSubspectrumIndex (pw.yPixel0);
 else if (pw === this.pin1Dx01) sval = "" + Math.min (this.pin1Dx0.getXVal (), this.pin1Dx1.getXVal ()) + " - " + Math.max (this.pin1Dx0.getXVal (), this.pin1Dx1.getXVal ());
 else if (pw === this.pin1Dy01) sval = "" + Math.min (this.pin1Dy0.getYVal (), this.pin1Dy1.getYVal ()) + " - " + Math.max (this.pin1Dy0.getYVal (), this.pin1Dy1.getYVal ());
 else if (pw === this.pin2Dx01) sval = "" + Math.min (this.pin2Dx0.getXVal (), this.pin2Dx1.getXVal ()) + " - " + Math.max (this.pin2Dx0.getXVal (), this.pin2Dx1.getXVal ());
 else if (pw === this.pin2Dy01) sval = "" + Clazz_doubleToInt (Math.min (this.pin2Dy0.getYVal (), this.pin2Dy1.getYVal ())) + " - " + Clazz_doubleToInt (Math.max (this.pin2Dy0.getYVal (), this.pin2Dy1.getYVal ()));
 else sval = "" + pw.getValue ();
sval = this.pd.getInput ("New value?", "Set Slider", sval);
if (sval == null) return;
sval = sval.trim ();
try {
if (pw === this.pin1Dx01 || pw === this.pin1Dy01 || pw === this.pin2Dx01 || pw === this.pin2Dy01) {
var pt = sval.indexOf ("-", 1);
if (pt < 0) return;
var val1 = Double.$valueOf (sval.substring (0, pt)).doubleValue ();
var val2 = Double.$valueOf (sval.substring (pt + 1)).doubleValue ();
if (pw === this.pin1Dx01) {
this.doZoom (val1, this.pin1Dy0.getYVal (), val2, this.pin1Dy1.getYVal (), true, false, false, true, true);
} else if (pw === this.pin1Dy01) {
this.doZoom (this.pin1Dx0.getXVal (), val1, this.pin1Dx1.getXVal (), val2, this.imageView == null, this.imageView == null, false, false, true);
} else if (pw === this.pin2Dx01) {
this.imageView.setView0 (this.imageView.toPixelX0 (val1), this.pin2Dy0.yPixel0, this.imageView.toPixelX0 (val2), this.pin2Dy1.yPixel0);
this.doZoom (val1, this.pin1Dy0.getYVal (), val2, this.pin1Dy1.getYVal (), false, false, false, true, true);
} else if (pw === this.pin2Dy01) {
this.imageView.setView0 (this.pin2Dx0.xPixel0, this.imageView.toPixelY0 (val1), this.pin2Dx1.xPixel0, this.imageView.toPixelY0 (val2));
this.doZoom (this.imageView.toX (this.imageView.xPixel0), this.getScale ().minY, this.imageView.toX (this.imageView.xPixel0 + this.imageView.xPixels - 1), this.getScale ().maxY, false, false, false, false, true);
}} else {
var val = Double.$valueOf (sval).doubleValue ();
if (pw.isXtype) {
var val2 = (pw === this.pin1Dx0 || pw === this.cur2Dx0 || pw === this.pin2Dx0 ? this.pin1Dx1.getXVal () : this.pin1Dx0.getXVal ());
this.doZoom (val, 0, val2, 0, !pw.is2D, false, false, true, true);
} else if (pw === this.cur2Dy) {
this.setCurrentSubSpectrum (Clazz_doubleToInt (val));
} else if (pw === this.pin2Dy0 || pw === this.pin2Dy1) {
var val2 = (pw === this.pin2Dy0 ? this.pin2Dy1.yPixel0 : this.pin2Dy0.yPixel0);
this.imageView.setView0 (this.pin2Dx0.xPixel0, this.imageView.subIndexToPixelY (Clazz_doubleToInt (val)), this.pin2Dx1.xPixel0, val2);
} else {
var val2 = (pw === this.pin1Dy0 ? this.pin1Dy1.getYVal () : this.pin1Dy0.getYVal ());
this.doZoom (this.pin1Dx0.getXVal (), val, this.pin1Dx1.getXVal (), val2, this.imageView == null, this.imageView == null, false, false, true);
}}} catch (e) {
if (Clazz_exceptionOf (e, Exception)) {
} else {
throw e;
}
}
}, "JSV.common.PlotWidget");
Clazz_defineMethod (c$, "removeAllHighlights", 
 function (spec) {
if (spec == null) this.highlights.clear ();
 else for (var i = this.highlights.size (); --i >= 0; ) if (this.highlights.get (i).spectrum === spec) this.highlights.removeItemAt (i);

}, "JSV.common.Spectrum");
Clazz_defineMethod (c$, "setCoordClicked", 
 function (xPixel, x, y) {
if (y == 0) this.nextClickForSetPeak = null;
if (Double.isNaN (x)) {
this.pd.coordClicked = null;
this.pd.coordsClicked = null;
return null;
}this.pd.coordClicked =  new JSV.common.Coordinate ().set (this.lastClickX = x, y);
this.pd.coordsClicked = this.getSpectrum ().getXYCoords ();
this.pd.xPixelClicked = (this.lastPixelX = xPixel);
return this.pd.coordClicked;
}, "~N,~N,~N");
Clazz_defineMethod (c$, "setWidgets", 
 function (needNewPins, subIndex, doDraw1DObjects) {
if (needNewPins || this.pin1Dx0 == null) {
if (this.zoomBox1D == null) this.newPins ();
 else this.resetPinPositions ();
}this.setDerivedPins (subIndex);
this.setPinSliderPositions (doDraw1DObjects);
}, "~B,~N,~B");
Clazz_defineMethod (c$, "newPins", 
 function () {
this.zoomBox1D =  new JSV.common.PlotWidget ("zoomBox1D");
this.pin1Dx0 =  new JSV.common.PlotWidget ("pin1Dx0");
this.pin1Dx1 =  new JSV.common.PlotWidget ("pin1Dx1");
this.pin1Dy0 =  new JSV.common.PlotWidget ("pin1Dy0");
this.pin1Dy1 =  new JSV.common.PlotWidget ("pin1Dy1");
this.pin1Dx01 =  new JSV.common.PlotWidget ("pin1Dx01");
this.pin1Dy01 =  new JSV.common.PlotWidget ("pin1Dy01");
this.cur1D2x1 =  new JSV.common.PlotWidget ("cur1D2x1");
this.cur1D2x1.color = JSV.common.ScriptToken.PEAKTABCOLOR;
this.cur1D2x2 =  new JSV.common.PlotWidget ("cur1D2x2");
this.cur1D2x2.color = JSV.common.ScriptToken.PEAKTABCOLOR;
if (this.imageView != null) {
this.zoomBox2D =  new JSV.common.PlotWidget ("zoomBox2D");
this.pin2Dx0 =  new JSV.common.PlotWidget ("pin2Dx0");
this.pin2Dx1 =  new JSV.common.PlotWidget ("pin2Dx1");
this.pin2Dy0 =  new JSV.common.PlotWidget ("pin2Dy0");
this.pin2Dy1 =  new JSV.common.PlotWidget ("pin2Dy1");
this.pin2Dx01 =  new JSV.common.PlotWidget ("pin2Dx01");
this.pin2Dy01 =  new JSV.common.PlotWidget ("pin2Dy01");
this.cur2Dx0 =  new JSV.common.PlotWidget ("cur2Dx0");
this.cur2Dx1 =  new JSV.common.PlotWidget ("cur2Dx1");
this.cur2Dy =  new JSV.common.PlotWidget ("cur2Dy");
this.pin2Dy0.setY (0, this.imageView.toPixelY0 (0));
var n = this.getSpectrumAt (0).getSubSpectra ().size ();
this.pin2Dy1.setY (n, this.imageView.toPixelY0 (n));
}this.setWidgetX (this.pin1Dx0, this.getScale ().minX);
this.setWidgetX (this.pin1Dx1, this.getScale ().maxX);
this.setWidgetY (this.pin1Dy0, this.getScale ().minY);
this.setWidgetY (this.pin1Dy1, this.getScale ().maxY);
this.widgets =  Clazz_newArray (-1, [this.zoomBox1D, this.zoomBox2D, this.pin1Dx0, this.pin1Dx01, this.pin1Dx1, this.pin1Dy0, this.pin1Dy01, this.pin1Dy1, this.pin2Dx0, this.pin2Dx01, this.pin2Dx1, this.pin2Dy0, this.pin2Dy01, this.pin2Dy1, this.cur2Dx0, this.cur2Dx1, this.cur2Dy, this.cur1D2x1, this.cur1D2x2]);
});
Clazz_defineMethod (c$, "setWidgetX", 
 function (pw, x) {
pw.setX (x, this.toPixelX0 (x));
}, "JSV.common.PlotWidget,~N");
Clazz_defineMethod (c$, "setWidgetY", 
 function (pw, y) {
pw.setY (y, this.toPixelY0 (y));
}, "JSV.common.PlotWidget,~N");
Clazz_defineMethod (c$, "resetPinsFromView", 
 function () {
if (this.pin1Dx0 == null) return;
this.setWidgetX (this.pin1Dx0, this.getScale ().minXOnScale);
this.setWidgetX (this.pin1Dx1, this.getScale ().maxXOnScale);
this.setWidgetY (this.pin1Dy0, this.getScale ().minYOnScale);
this.setWidgetY (this.pin1Dy1, this.getScale ().maxYOnScale);
});
Clazz_defineMethod (c$, "resetPinPositions", 
 function () {
this.resetX (this.pin1Dx0);
this.resetY (this.pin1Dy0);
this.resetY (this.pin1Dy1);
if (this.imageView == null) {
if (this.gs2dLinkedX != null) this.resetX (this.cur1D2x1);
if (this.gs2dLinkedY != null) this.resetX (this.cur1D2x2);
} else {
this.pin2Dy0.setY (this.pin2Dy0.getYVal (), this.imageView.toPixelY0 (this.pin2Dy0.getYVal ()));
this.pin2Dy1.setY (this.pin2Dy1.getYVal (), this.imageView.toPixelY0 (this.pin2Dy1.getYVal ()));
}});
Clazz_defineMethod (c$, "resetX", 
 function (p) {
this.setWidgetX (p, p.getXVal ());
}, "JSV.common.PlotWidget");
Clazz_defineMethod (c$, "resetY", 
 function (p) {
this.setWidgetY (p, p.getYVal ());
}, "JSV.common.PlotWidget");
Clazz_defineMethod (c$, "setPinSliderPositions", 
 function (doDraw1DObjects) {
this.pin1Dx0.yPixel0 = this.pin1Dx1.yPixel0 = this.pin1Dx01.yPixel0 = this.yPixel0 - 5;
this.pin1Dx0.yPixel1 = this.pin1Dx1.yPixel1 = this.pin1Dx01.yPixel1 = this.yPixel0;
this.cur1D2x1.yPixel1 = this.cur1D2x2.yPixel1 = this.yPixel0 - 5;
this.cur1D2x1.yPixel0 = this.cur1D2x2.yPixel0 = this.yPixel1 + 6;
if (this.imageView == null) {
this.pin1Dy0.xPixel0 = this.pin1Dy1.xPixel0 = this.pin1Dy01.xPixel0 = this.xPixel1 + 5;
this.pin1Dy0.xPixel1 = this.pin1Dy1.xPixel1 = this.pin1Dy01.xPixel1 = this.xPixel1;
} else {
this.pin1Dy0.xPixel0 = this.pin1Dy1.xPixel0 = this.pin1Dy01.xPixel0 = this.imageView.xPixel1 + 15;
this.pin1Dy0.xPixel1 = this.pin1Dy1.xPixel1 = this.pin1Dy01.xPixel1 = this.imageView.xPixel1 + 10;
this.pin2Dx0.yPixel0 = this.pin2Dx1.yPixel0 = this.pin2Dx01.yPixel0 = this.yPixel0 - 5;
this.pin2Dx0.yPixel1 = this.pin2Dx1.yPixel1 = this.pin2Dx01.yPixel1 = this.yPixel0;
this.pin2Dy0.xPixel0 = this.pin2Dy1.xPixel0 = this.pin2Dy01.xPixel0 = this.imageView.xPixel1 + 5;
this.pin2Dy0.xPixel1 = this.pin2Dy1.xPixel1 = this.pin2Dy01.xPixel1 = this.imageView.xPixel1;
this.cur2Dx0.yPixel0 = this.cur2Dx1.yPixel0 = this.yPixel1 + 6;
this.cur2Dx0.yPixel1 = this.cur2Dx1.yPixel1 = this.yPixel0 - 5;
this.cur2Dx0.yPixel0 = this.cur2Dx1.yPixel0 = this.yPixel1 + 6;
this.cur2Dx1.yPixel1 = this.cur2Dx1.yPixel1 = this.yPixel0 - 5;
this.cur2Dy.xPixel0 = (doDraw1DObjects ? Clazz_doubleToInt ((this.xPixel1 + this.imageView.xPixel0) / 2) : this.imageView.xPixel0 - 6);
this.cur2Dy.xPixel1 = this.imageView.xPixel1 + 5;
}}, "~B");
Clazz_defineMethod (c$, "setDerivedPins", 
 function (subIndex) {
this.widgetsAreSet = true;
if (this.gs2dLinkedX != null) this.cur1D2x1.setX (this.cur1D2x1.getXVal (), this.toPixelX (this.cur1D2x1.getXVal ()));
if (this.gs2dLinkedY != null) this.cur1D2x2.setX (this.cur1D2x2.getXVal (), this.toPixelX (this.cur1D2x2.getXVal ()));
this.pin1Dx01.setX (0, Clazz_doubleToInt ((this.pin1Dx0.xPixel0 + this.pin1Dx1.xPixel0) / 2));
this.pin1Dy01.setY (0, Clazz_doubleToInt ((this.pin1Dy0.yPixel0 + this.pin1Dy1.yPixel0) / 2));
this.pin1Dx01.setEnabled (Math.min (this.pin1Dx0.xPixel0, this.pin1Dx1.xPixel0) > this.xPixel0 || Math.max (this.pin1Dx0.xPixel0, this.pin1Dx1.xPixel0) < this.xPixel1);
this.pin1Dy01.setEnabled (Math.min (this.pin1Dy0.yPixel0, this.pin1Dy1.yPixel0) > Math.min (this.toPixelY (this.getScale ().minY), this.toPixelY (this.getScale ().maxY)) || Math.max (this.pin1Dy0.yPixel0, this.pin1Dy1.yPixel0) < Math.max (this.toPixelY (this.getScale ().minY), this.toPixelY (this.getScale ().maxY)));
if (this.imageView == null) return;
var x = this.pin1Dx0.getXVal ();
this.cur2Dx0.setX (x, this.imageView.toPixelX (x));
x = this.pin1Dx1.getXVal ();
this.cur2Dx1.setX (x, this.imageView.toPixelX (x));
x = this.imageView.toX (this.imageView.xPixel0);
this.pin2Dx0.setX (x, this.imageView.toPixelX0 (x));
x = this.imageView.toX (this.imageView.xPixel1);
this.pin2Dx1.setX (x, this.imageView.toPixelX0 (x));
this.pin2Dx01.setX (0, Clazz_doubleToInt ((this.pin2Dx0.xPixel0 + this.pin2Dx1.xPixel0) / 2));
var y = this.imageView.imageHeight - 1 - this.imageView.yView1;
this.pin2Dy0.setY (y, this.imageView.toPixelY0 (y));
y = this.imageView.imageHeight - 1 - this.imageView.yView2;
this.pin2Dy1.setY (y, this.imageView.toPixelY0 (y));
this.pin2Dy01.setY (0, Clazz_doubleToInt ((this.pin2Dy0.yPixel0 + this.pin2Dy1.yPixel0) / 2));
this.cur2Dy.yPixel0 = this.cur2Dy.yPixel1 = this.imageView.subIndexToPixelY (subIndex);
this.pin2Dx01.setEnabled (Math.min (this.pin2Dx0.xPixel0, this.pin2Dx1.xPixel0) != this.imageView.xPixel0 || Math.max (this.pin2Dx0.xPixel0, this.pin2Dx1.xPixel1) != this.imageView.xPixel1);
this.pin2Dy01.setEnabled (Math.min (this.pin2Dy0.yPixel0, this.pin2Dy1.yPixel0) != this.yPixel0 || Math.max (this.pin2Dy0.yPixel0, this.pin2Dy1.yPixel1) != this.yPixel1);
}, "~N");
Clazz_defineMethod (c$, "doZoom", 
function (initX, initY, finalX, finalY, is1D, is1DY, checkRange, checkLinked, addZoom) {
if (initX == finalX) {
initX = this.getScale ().minXOnScale;
finalX = this.getScale ().maxXOnScale;
} else if (this.isLinked && checkLinked) this.pd.doZoomLinked (this, initX, finalX, addZoom, checkRange, is1D);
if (initX > finalX) {
var tempX = initX;
initX = finalX;
finalX = tempX;
}if (initY > finalY) {
var tempY = initY;
initY = finalY;
finalY = tempY;
}var is2DGrayScaleChange = (!is1D && this.imageView != null && (this.imageView.minZ != initY || this.imageView.maxZ != finalY));
if (!this.zoomEnabled && !is2DGrayScaleChange) return;
if (checkRange) {
if (!this.getScale ().isInRangeX (initX) && !this.getScale ().isInRangeX (finalX)) return;
if (!this.getScale ().isInRangeX (initX)) {
initX = this.getScale ().minX;
} else if (!this.getScale ().isInRangeX (finalX)) {
finalX = this.getScale ().maxX;
}} else {
}this.pd.setTaintedAll ();
var viewScales = this.viewData.getScaleData ();
var startIndices =  Clazz_newIntArray (this.nSpectra, 0);
var endIndices =  Clazz_newIntArray (this.nSpectra, 0);
this.graphsTemp.clear ();
var subspecs = this.getSpectrumAt (0).getSubSpectra ();
var dontUseSubspecs = (subspecs == null || subspecs.size () == 2);
var is2D = !this.getSpectrumAt (0).is1D ();
if (!is2D && !dontUseSubspecs) {
this.graphsTemp.addLast (this.getSpectrum ());
if (!JSV.common.ScaleData.setDataPointIndices (this.graphsTemp, initX, finalX, 3, startIndices, endIndices)) return;
} else {
if (!JSV.common.ScaleData.setDataPointIndices (this.spectra, initX, finalX, 3, startIndices, endIndices)) return;
}var y1 = initY;
var y2 = finalY;
var isXOnly = (y1 == y2);
if (isXOnly) {
var f = (!is2DGrayScaleChange && is1D ? f = this.getScale ().spectrumScaleFactor : 1);
if (Math.abs (f - 1) < 0.0001) {
y1 = this.getScale ().minYOnScale;
y2 = this.getScale ().maxYOnScale;
}}var yScales = null;
if (isXOnly || is1DY) {
this.getCurrentView ();
yScales = this.viewData.getNewScales (this.iSpectrumSelected, isXOnly, y1, y2);
}this.getView (initX, finalX, y1, y2, startIndices, endIndices, viewScales, yScales);
this.setXPixelMovedTo (1E10, 1.7976931348623157E308, 0, 0);
this.setWidgetX (this.pin1Dx0, initX);
this.setWidgetX (this.pin1Dx1, finalX);
this.setWidgetY (this.pin1Dy0, y1);
this.setWidgetY (this.pin1Dy1, y2);
if (this.imageView == null) {
this.updateDialogs ();
} else {
var isub = this.getSpectrumAt (0).getSubIndex ();
var ifix = this.imageView.fixSubIndex (isub);
if (ifix != isub) this.setCurrentSubSpectrum (ifix);
if (is2DGrayScaleChange) this.update2dImage (false);
}if (addZoom) this.addCurrentZoom ();
}, "~N,~N,~N,~N,~B,~B,~B,~B,~B");
Clazz_defineMethod (c$, "updateDialogs", 
 function () {
this.updateDialog (JSV.common.Annotation.AType.PeakList, -1);
this.updateDialog (JSV.common.Annotation.AType.Measurements, -1);
});
Clazz_defineMethod (c$, "setCurrentSubSpectrum", 
 function (i) {
var spec0 = this.getSpectrumAt (0);
i = spec0.setCurrentSubSpectrum (i);
if (spec0.isForcedSubset ()) this.viewData.setXRangeForSubSpectrum (this.getSpectrum ().getXYCoords ());
this.pd.notifySubSpectrumChange (i, this.getSpectrum ());
}, "~N");
Clazz_defineMethod (c$, "addCurrentZoom", 
 function () {
if (this.viewList.size () > this.currentZoomIndex + 1) for (var i = this.viewList.size () - 1; i > this.currentZoomIndex; i--) this.viewList.removeItemAt (i);

this.viewList.addLast (this.viewData);
this.currentZoomIndex++;
});
Clazz_defineMethod (c$, "setZoomTo", 
 function (i) {
this.currentZoomIndex = i;
this.viewData = this.viewList.get (i);
this.resetPinsFromView ();
}, "~N");
Clazz_defineMethod (c$, "clearViews", 
function () {
if (this.isLinked) {
this.pd.clearLinkViews (this);
}this.setZoom (0, 0, 0, 0);
for (var i = this.viewList.size (); --i >= 1; ) this.viewList.removeItemAt (i);

});
Clazz_defineMethod (c$, "drawAll", 
 function (gMain, gFront, gBack, iSplit, needNewPins, doAll, pointsOnly) {
this.g2d = this.pd.g2d;
this.gMain = gMain;
var spec0 = this.getSpectrumAt (0);
var subIndex = spec0.getSubIndex ();
this.is2DSpectrum = (!spec0.is1D () && (this.isLinked || this.pd.getBoolean (JSV.common.ScriptToken.DISPLAY2D)) && (this.imageView != null || this.get2DImage (spec0)));
if (this.imageView != null && doAll) {
if (this.pd.isPrinting && this.g2d !== this.pd.g2d0) this.g2d.newGrayScaleImage (gMain, this.image2D, this.imageView.imageWidth, this.imageView.imageHeight, this.imageView.getBuffer ());
if (this.is2DSpectrum) this.setPositionForFrame (iSplit);
this.draw2DImage ();
}var iSelected = (this.stackSelected || !this.showAllStacked ? this.iSpectrumSelected : -1);
var doYScale = (!this.showAllStacked || this.nSpectra == 1 || iSelected >= 0);
var doDraw1DObjects = (this.imageView == null || this.pd.display1D);
var n = (iSelected >= 0 ? 1 : 0);
var iSpectrumForScale = this.getFixedSelectedSpectrumIndex ();
if (doDraw1DObjects && doAll) {
this.fillBox (gMain, this.xPixel0, this.yPixel0, this.xPixel1, this.yPixel1, JSV.common.ScriptToken.PLOTAREACOLOR);
if (iSelected < 0) {
doYScale = true;
for (var i = 0; i < this.nSpectra; i++) if (this.doPlot (i, iSplit)) {
if (n++ == 0) continue;
doYScale = new Boolean (doYScale & this.viewData.areYScalesSame (i - 1, i)).valueOf ();
}
}}var iSpecForFrame = (this.nSpectra == 1 ? 0 : !this.showAllStacked ? this.iSpectrumMovedTo : this.iSpectrumSelected);
var g2 = (gBack === gMain ? gFront : gBack);
if (doAll) {
var addCurrentBox = (this.pd.getCurrentGraphSet () === this && !this.isLinked && (!this.isSplittable || (this.nSplit == 1 || this.pd.currentSplitPoint == iSplit)));
var drawUpDownArrows = (this.zoomEnabled && !this.isDrawNoSpectra () && this.pd.isCurrentGraphSet (this) && this.spectra.get (0).isScalable () && (addCurrentBox || this.nSpectra == 1) && (this.nSplit == 1 || this.pd.currentSplitPoint == this.iSpectrumMovedTo));
var addSplitBox = this.isSplittable;
this.drawFrame (gMain, iSpecForFrame, addCurrentBox, addSplitBox, drawUpDownArrows);
}if (this.pd.isCurrentGraphSet (this) && iSplit == this.pd.currentSplitPoint && (n < 2 || this.iSpectrumSelected >= 0)) this.$haveSelectedSpectrum = true;
this.haveSingleYScale = (this.showAllStacked && this.nSpectra > 1 ? this.allowStackedYScale && doYScale : true);
if (doDraw1DObjects) {
var yOffsetPixels = Clazz_floatToInt (this.yPixels * (this.yStackOffsetPercent / 100));
this.haveLeftRightArrows = false;
for (var i = 0, offset = 0; i < this.nSpectra; i++) {
if (!this.doPlot (i, iSplit)) continue;
var isGrey = (this.stackSelected && this.iSpectrumSelected >= 0 && this.iSpectrumSelected != i);
var ig = (!this.reversePlot && this.getShowAnnotation (JSV.common.Annotation.AType.Integration, i) && (!this.showAllStacked || this.iSpectrumSelected == i) ? this.getDialog (JSV.common.Annotation.AType.Integration, i).getData () : null);
this.setScale (i);
var spec = this.spectra.get (i);
if (this.nSplit > 1) {
iSpectrumForScale = i;
}var doDrawWidgets = !isGrey && (this.nSplit == 1 || this.showAllStacked || this.iSpectrumSelected == iSplit);
var doDraw1DY = (doDrawWidgets && this.$haveSelectedSpectrum && i == iSpectrumForScale);
if (doDrawWidgets) {
this.resetPinsFromView ();
this.drawWidgets (gFront, g2, subIndex, needNewPins, doDraw1DObjects, doDraw1DY, false);
}if (this.haveSingleYScale && i == iSpectrumForScale && doAll) {
this.drawGrid (gMain);
if (this.pd.isPrinting && this.nSplit > 1) this.drawSpectrumSource (gMain, i);
}if (doDrawWidgets) this.drawWidgets (gFront, g2, subIndex, false, doDraw1DObjects, doDraw1DY, true);
if (!this.isDrawNoSpectra () && (this.nSpectra == 1 || this.iSpectrumSelected >= 0) && (this.haveSingleYScale && i == iSpectrumForScale || this.showAllStacked && this.stackSelected && i == this.iSpectrumSelected)) this.drawHighlightsAndPeakTabs (gFront, g2, i);
if (doAll) {
if (n == 1 && this.iSpectrumSelected < 0 || this.iSpectrumSelected == i && this.pd.isCurrentGraphSet (this)) {
if (this.pd.titleOn && !this.pd.titleDrawn) {
this.pd.drawTitle (gMain, this.height, this.width, this.pd.getDrawTitle (this.pd.isPrinting));
this.pd.titleDrawn = true;
}}if (this.haveSingleYScale && i == iSpectrumForScale) {
if (this.pd.getBoolean (JSV.common.ScriptToken.YSCALEON)) this.drawYScale (gMain, this);
if (this.pd.getBoolean (JSV.common.ScriptToken.YUNITSON)) this.drawYUnits (gMain);
}}var isContinuous = spec.isContinuous ();
var onSpectrum = ((this.nSplit > 1 ? i == this.iSpectrumMovedTo : this.isLinked || i == iSpectrumForScale) && !this.pd.isPrinting && isContinuous);
var hasPendingIntegral = (!isGrey && this.pendingIntegral != null && spec === this.pendingIntegral.spec);
if (doAll || hasPendingIntegral) {
this.drawPlot (hasPendingIntegral && !doAll ? gFront : gMain, i, spec, isContinuous, offset, isGrey, null, onSpectrum, hasPendingIntegral, pointsOnly);
}this.drawIntegration (gFront, i, offset, isGrey, ig, isContinuous, onSpectrum);
this.drawMeasurements (gFront, i);
if (this.pendingMeasurement != null && this.pendingMeasurement.spec === spec) this.drawMeasurement (gFront, this.pendingMeasurement);
if (onSpectrum && this.xPixelMovedTo >= 0) {
this.drawSpectrumPointer (gFront, spec, offset, ig);
}if (this.nSpectra > 1 && this.nSplit == 1 && this.pd.isCurrentGraphSet (this) && doAll) {
this.haveLeftRightArrows = true;
if (!this.pd.isPrinting) {
this.setScale (0);
iSpecForFrame = (this.iSpectrumSelected);
if (this.nSpectra != 2) {
this.setPlotColor (gMain, (iSpecForFrame + this.nSpectra - 1) % this.nSpectra);
this.fillArrow (gMain, 1, this.yHArrows, this.xHArrows - 9, true);
this.setCurrentBoxColor (gMain);
this.fillArrow (gMain, 1, this.yHArrows, this.xHArrows - 9, false);
}if (iSpecForFrame >= 0) {
this.setPlotColor (gMain, iSpecForFrame);
this.fillCircle (gMain, this.xHArrows, this.yHArrows, true);
}this.setCurrentBoxColor (gMain);
this.fillCircle (gMain, this.xHArrows, this.yHArrows, false);
this.setPlotColor (gMain, (iSpecForFrame + 1) % this.nSpectra);
this.fillArrow (gMain, 2, this.yHArrows, this.xHArrows + 9, true);
this.setCurrentBoxColor (gMain);
this.fillArrow (gMain, 2, this.yHArrows, this.xHArrows + 9, false);
}}offset -= yOffsetPixels;
}
if (doAll) {
if (this.pd.getBoolean (JSV.common.ScriptToken.XSCALEON)) this.drawXScale (gMain, this);
if (this.pd.getBoolean (JSV.common.ScriptToken.XUNITSON)) this.drawXUnits (gMain);
}} else {
if (doAll) {
if (this.pd.getBoolean (JSV.common.ScriptToken.XSCALEON)) this.drawXScale (gMain, this.imageView);
if (this.pd.getBoolean (JSV.common.ScriptToken.YSCALEON)) this.drawYScale (gMain, this.imageView);
if (subIndex >= 0) this.draw2DUnits (gMain);
}this.drawWidgets (gFront, g2, subIndex, needNewPins, doDraw1DObjects, true, false);
this.drawWidgets (gFront, g2, subIndex, needNewPins, doDraw1DObjects, true, true);
}if (this.annotations != null) this.drawAnnotations (gFront, this.annotations, null);
}, "~O,~O,~O,~N,~B,~B,~B");
Clazz_defineMethod (c$, "drawSpectrumSource", 
 function (g, i) {
this.pd.printFilePath (g, this.pd.thisWidth - this.pd.right, this.yPixel0, this.spectra.get (i).getFilePath ());
}, "~O,~N");
Clazz_defineMethod (c$, "doPlot", 
 function (i, iSplit) {
var isGrey = (this.stackSelected && this.iSpectrumSelected >= 0 && this.iSpectrumSelected != i);
var ok = (this.showAllStacked || this.iSpectrumSelected == -1 || this.iSpectrumSelected == i);
return (this.nSplit > 1 ? i == iSplit : ok && (!this.pd.isPrinting || !isGrey));
}, "~N,~N");
Clazz_defineMethod (c$, "drawSpectrumPointer", 
 function (gFront, spec, yOffset, ig) {
this.setColorFromToken (gFront, JSV.common.ScriptToken.PEAKTABCOLOR);
var iHandle = this.pd.integralShiftMode;
if (ig != null) {
if ((!this.pd.ctrlPressed || this.pd.isIntegralDrag) && !this.isOnSpectrum (this.pd.mouseX, this.pd.mouseY, -1)) {
ig = null;
} else if (iHandle == 0) {
iHandle = this.getShiftMode (this.pd.mouseX, this.pd.mouseY);
if (iHandle == 0) iHandle = 2147483647;
}}var y0 = this.yValueMovedTo;
this.yValueMovedTo = (ig == null ? spec.getYValueAt (this.xValueMovedTo) : ig.getPercentYValueAt (this.xValueMovedTo));
this.setCoordStr (this.xValueMovedTo, this.yValueMovedTo);
if (iHandle != 0) {
this.setPlotColor (gFront, iHandle == 2147483647 ? -1 : 0);
if (iHandle < 0 || iHandle == 2147483647) {
this.drawHandle (gFront, this.xPixelPlot1, this.yPixelPlot0, 3, false);
}if (iHandle > 0) {
this.drawHandle (gFront, this.xPixelPlot0, this.yPixelPlot1, 3, false);
}if (iHandle != 2147483647) return;
}if (ig != null) this.g2d.setStrokeBold (gFront, true);
if (Double.isNaN (y0) || this.pendingMeasurement != null) {
this.g2d.drawLine (gFront, this.xPixelMovedTo, this.yPixel0, this.xPixelMovedTo, this.yPixel1);
if (this.xPixelMovedTo2 >= 0) this.g2d.drawLine (gFront, this.xPixelMovedTo2, this.yPixel0, this.xPixelMovedTo2, this.yPixel1);
this.yValueMovedTo = NaN;
} else {
var y = (ig == null ? yOffset + this.toPixelY (this.yValueMovedTo) : this.toPixelYint (this.yValueMovedTo / 100));
if (y == this.fixY (y)) this.g2d.drawLine (gFront, this.xPixelMovedTo, y - 10, this.xPixelMovedTo, y + 10);
}if (ig != null) this.g2d.setStrokeBold (gFront, false);
}, "~O,JSV.common.Spectrum,~N,JSV.common.IntegralData");
Clazz_defineMethod (c$, "setScale", 
function (i) {
this.viewData.setScale (i, this.xPixels, this.yPixels, this.spectra.get (i).isInverted ());
}, "~N");
Clazz_defineMethod (c$, "draw2DUnits", 
 function (g) {
var nucleusX = this.getSpectrumAt (0).nucleusX;
var nucleusY = this.getSpectrumAt (0).nucleusY;
this.setColorFromToken (g, JSV.common.ScriptToken.PLOTCOLOR);
this.drawUnits (g, nucleusX, this.imageView.xPixel1 + 5 * this.pd.scalingFactor, this.yPixel1, 1, 1.0);
this.drawUnits (g, nucleusY, this.imageView.xPixel0 - 5 * this.pd.scalingFactor, this.yPixel0, 1, 0);
}, "~O");
Clazz_defineMethod (c$, "drawPeakTabs", 
 function (gFront, g2, spec) {
var list = (this.nSpectra == 1 || this.iSpectrumSelected >= 0 ? spec.getPeakList () : null);
if (list != null && list.size () > 0) {
if (this.piMouseOver != null && this.piMouseOver.spectrum === spec && this.pd.isMouseUp ()) {
this.g2d.setGraphicsColor (g2, this.g2d.getColor4 (240, 240, 240, 140));
this.drawPeak (g2, this.piMouseOver, 0);
spec.setHighlightedPeak (this.piMouseOver);
} else {
spec.setHighlightedPeak (null);
}this.setColorFromToken (gFront, JSV.common.ScriptToken.PEAKTABCOLOR);
for (var i = list.size (); --i >= 0; ) {
var p = list.get (i);
this.drawPeak (gFront, p, p === spec.getSelectedPeak () ? 14 : 7);
}
}}, "~O,~O,JSV.common.Spectrum");
Clazz_defineMethod (c$, "drawPeak", 
 function (g, pi, tickSize) {
if (this.pd.isPrinting) return;
var xMin = pi.getXMin ();
var xMax = pi.getXMax ();
if (xMin == xMax) return;
this.drawBar (g, pi, xMin, xMax, null, tickSize);
}, "~O,JSV.common.PeakInfo,~N");
Clazz_defineMethod (c$, "drawWidgets", 
 function (gFront, gBack, subIndex, needNewPins, doDraw1DObjects, doDraw1DY, postGrid) {
this.setWidgets (needNewPins, subIndex, doDraw1DObjects);
if (this.pd.isPrinting && (this.imageView == null ? !this.cur1D2Locked : this.sticky2Dcursor)) return;
if (!this.pd.isPrinting && !postGrid) {
if (doDraw1DObjects) {
this.fillBox (gFront, this.xPixel0, this.pin1Dx0.yPixel1, this.xPixel1, this.pin1Dx1.yPixel1 + 2, JSV.common.ScriptToken.GRIDCOLOR);
this.fillBox (gFront, this.pin1Dx0.xPixel0, this.pin1Dx0.yPixel1, this.pin1Dx1.xPixel0, this.pin1Dx1.yPixel1 + 2, JSV.common.ScriptToken.PLOTCOLOR);
} else {
this.fillBox (gFront, this.imageView.xPixel0, this.pin2Dx0.yPixel1, this.imageView.xPixel1, this.pin2Dx0.yPixel1 + 2, JSV.common.ScriptToken.GRIDCOLOR);
this.fillBox (gFront, this.pin2Dx0.xPixel0, this.pin2Dx0.yPixel1, this.pin2Dx1.xPixel0, this.pin2Dx1.yPixel1 + 2, JSV.common.ScriptToken.PLOTCOLOR);
this.fillBox (gFront, this.pin2Dy0.xPixel1, this.yPixel1, this.pin2Dy1.xPixel1 + 2, this.yPixel0, JSV.common.ScriptToken.GRIDCOLOR);
this.fillBox (gFront, this.pin2Dy0.xPixel1, this.pin2Dy0.yPixel1, this.pin2Dy1.xPixel1 + 2, this.pin2Dy1.yPixel0, JSV.common.ScriptToken.PLOTCOLOR);
}this.fillBox (gFront, this.pin1Dy0.xPixel1, this.yPixel1, this.pin1Dy1.xPixel1 + 2, this.yPixel0, JSV.common.ScriptToken.GRIDCOLOR);
if (doDraw1DY) this.fillBox (gFront, this.pin1Dy0.xPixel1, this.pin1Dy0.yPixel1, this.pin1Dy1.xPixel1 + 2, this.pin1Dy1.yPixel0, JSV.common.ScriptToken.PLOTCOLOR);
}for (var i = 0; i < this.widgets.length; i++) {
var pw = this.widgets[i];
if (pw == null || !pw.isPinOrCursor && !this.zoomEnabled) continue;
var isLockedCursor = (pw === this.cur1D2x1 || pw === this.cur1D2x2 || pw === this.cur2Dx0 || pw === this.cur2Dx1 || pw === this.cur2Dy);
if ((pw.isPin || !pw.isPinOrCursor) == postGrid) continue;
if (pw.is2D) {
if (pw === this.cur2Dx0 && !doDraw1DObjects) continue;
} else {
var isPin1Dy = (pw === this.pin1Dy0 || pw === this.pin1Dy1 || pw === this.pin1Dy01);
if ((this.imageView != null && doDraw1DObjects == isPin1Dy) || isPin1Dy && !doDraw1DY || pw === this.cur1D2x1 && this.gs2dLinkedX == null || pw === this.cur1D2x2 && this.gs2dLinkedY == null || pw === this.zoomBox1D && (this.pd.isIntegralDrag || this.pd.integralShiftMode != 0)) {
if (!this.isLinked || this.imageView != null) continue;
}}if (this.pd.isPrinting && !isLockedCursor) continue;
if (pw.isPinOrCursor) {
this.setColorFromToken (gFront, pw.color);
this.g2d.drawLine (gFront, pw.xPixel0, pw.yPixel0, pw.xPixel1, pw.yPixel1);
pw.isVisible = true;
if (pw.isPin) this.drawHandle (gFront, pw.xPixel0, pw.yPixel0, 2, !pw.isEnabled);
} else if (pw.xPixel1 != pw.xPixel0) {
this.fillBox (gBack, pw.xPixel0, pw.yPixel0, pw.xPixel1, pw.yPixel1, pw === this.zoomBox1D && this.pd.shiftPressed ? JSV.common.ScriptToken.ZOOMBOXCOLOR2 : JSV.common.ScriptToken.ZOOMBOXCOLOR);
}}
}, "~O,~O,~N,~B,~B,~B,~B");
Clazz_defineMethod (c$, "drawBar", 
 function (g, pi, xMin, xMax, whatColor, tickSize) {
var r = xMax + xMin;
var d = Math.abs (xMax - xMin);
var range = Math.abs (this.toX (this.xPixel1) - this.toX (this.xPixel0));
if (false && tickSize > 0 && d > range / 20) {
d = range / 20;
xMin = r / 2 - d / 2;
xMax = r / 2 + d / 2;
}var x1 = this.toPixelX (xMin);
var x2 = this.toPixelX (xMax);
if (x1 > x2) {
var tmp = x1;
x1 = x2;
x2 = tmp;
}x1 = this.fixX (x1);
x2 = this.fixX (x2);
if (x2 - x1 < 3) {
x1 -= 2;
x2 += 2;
}if (pi != null) pi.setPixelRange (x1, x2);
if (tickSize == 0) {
this.fillBox (g, x1, this.yPixel0, x2, this.yPixel0 + this.yPixels, whatColor);
} else {
this.fillBox (g, x1, this.yPixel0 + 2, x2, this.yPixel0 + 5, whatColor);
if (pi != null) {
x1 = Clazz_doubleToInt ((x1 + x2) / 2);
this.fillBox (g, x1 - 1, this.yPixel0 + 2, x1 + 1, this.yPixel0 + 2 + tickSize, whatColor);
}}}, "~O,JSV.common.PeakInfo,~N,~N,JSV.common.ScriptToken,~N");
Clazz_defineMethod (c$, "drawIntegration", 
 function (gFront, index, yOffset, isGrey, iData, isContinuous, isSelected) {
if (iData != null) {
if (this.haveIntegralDisplayed (index)) this.drawPlot (gFront, index, this.spectra.get (index), true, yOffset, false, iData, true, false, false);
this.drawIntegralValues (gFront, index, yOffset);
}var ratios = this.getIntegrationRatios (index);
if (ratios != null) this.drawAnnotations (gFront, ratios, JSV.common.ScriptToken.INTEGRALPLOTCOLOR);
}, "~O,~N,~N,~B,JSV.common.IntegralData,~B,~B");
Clazz_defineMethod (c$, "getMeasurements", 
 function (type, iSpec) {
var ad = this.getDialog (type, iSpec);
return (ad == null || ad.getData ().size () == 0 || !ad.getState () ? null : ad.getData ());
}, "JSV.common.Annotation.AType,~N");
Clazz_defineMethod (c$, "drawPlot", 
 function (g, index, spec, isContinuous, yOffset, isGrey, ig, isSelected, hasPendingIntegral, pointsOnly) {
var xyCoords = (ig == null ? spec.getXYCoords () : this.getIntegrationGraph (index).getXYCoords ());
var isIntegral = (ig != null);
var bsDraw = (isIntegral ? ig.getBitSet () : null);
var fillPeaks = (hasPendingIntegral || spec.fillColor != null && isSelected);
var iColor = (isGrey ? -2 : isIntegral ? -1 : !this.allowStacking ? 0 : index);
this.setPlotColor (g, iColor);
var plotOn = true;
var y0 = this.toPixelY (0);
if (isIntegral) fillPeaks = new Boolean (fillPeaks & (y0 == this.fixY (y0))).valueOf ();
 else y0 = this.fixY (y0);
var cInt = (isIntegral || fillPeaks ? this.pd.getColor (JSV.common.ScriptToken.INTEGRALPLOTCOLOR) : null);
var cFill = (cInt == null || spec.fillColor == null ? cInt : spec.fillColor);
var iFirst = this.viewData.getStartingPointIndex (index);
var iLast = this.viewData.getEndingPointIndex (index);
if (isContinuous && !pointsOnly) {
iLast--;
var doLineTo = (isIntegral || this.pendingIntegral != null) && this.g2d.canDoLineTo ();
if (doLineTo) this.g2d.doStroke (g, true);
var isDown = false;
for (var i = iFirst; i <= iLast; i++) {
var point1 = xyCoords[i];
var point2 = xyCoords[i + 1];
var y1 = (isIntegral ? this.toPixelYint (point1.getYVal ()) : this.toPixelY (point1.getYVal ()));
if (y1 == -2147483648) continue;
var y2 = (isIntegral ? this.toPixelYint (point2.getYVal ()) : this.toPixelY (point2.getYVal ()));
if (y2 == -2147483648) continue;
var xv1 = point1.getXVal ();
var xv2 = point2.getXVal ();
var x1 = this.toPixelX (xv1);
var x2 = this.toPixelX (xv2);
y1 = this.fixY (yOffset + y1);
y2 = this.fixY (yOffset + y2);
if (isIntegral) {
if (i == iFirst) {
this.xPixelPlot1 = x1;
this.yPixelPlot0 = y1;
}this.xPixelPlot0 = x2;
this.yPixelPlot1 = y2;
}if (x2 == x1 && y1 == y2) continue;
if (fillPeaks && hasPendingIntegral && this.pendingIntegral.overlaps (xv1, xv2)) {
if (cFill != null) {
this.g2d.doStroke (g, false);
this.g2d.setGraphicsColor (g, cFill);
}this.g2d.fillRect (g, Math.min (x1, x2), Math.min (y0, y1), Math.max (1, Math.abs (x2 - x1)), Math.abs (y0 - y1));
if (cFill != null) {
this.g2d.doStroke (g, false);
this.g2d.doStroke (g, true);
isDown = false;
this.setPlotColor (g, iColor);
}continue;
}if (y1 == y2 && (y1 == this.yPixel0)) {
continue;
}if (bsDraw != null && bsDraw.get (i) != plotOn) {
plotOn = bsDraw.get (i);
if (doLineTo && isDown) {
this.g2d.doStroke (g, false);
this.g2d.doStroke (g, true);
isDown = false;
}if (!this.pd.isPrinting && this.pd.integralShiftMode != 0) this.setPlotColor (g, 0);
 else if (plotOn) this.setColorFromToken (g, JSV.common.ScriptToken.INTEGRALPLOTCOLOR);
 else this.setPlotColor (g, -3);
}if (this.pd.isPrinting && !plotOn) continue;
if (isDown) {
this.g2d.lineTo (g, x2, y2);
} else {
this.g2d.drawLine (g, x1, y1, x2, y2);
isDown = doLineTo;
}}
if (doLineTo) this.g2d.doStroke (g, false);
} else {
for (var i = iFirst; i <= iLast; i++) {
var point = xyCoords[i];
var y2 = this.toPixelY (point.getYVal ());
if (y2 == -2147483648) continue;
var x1 = this.toPixelX (point.getXVal ());
var y1 = this.toPixelY (Math.max (this.getScale ().minYOnScale, 0));
y1 = this.fixY (yOffset + y1);
y2 = this.fixY (yOffset + y2);
if (y1 == y2 && (y1 == this.yPixel0 || y1 == this.yPixel1)) continue;
if (pointsOnly) this.g2d.fillRect (g, x1 - 1, y2 - 1, 3, 3);
 else this.g2d.drawLine (g, x1, y1, x1, y2);
}
if (!pointsOnly && this.getScale ().isYZeroOnScale ()) {
var y = yOffset + this.toPixelY (this.getScale ().spectrumYRef);
if (y == this.fixY (y)) this.g2d.drawLine (g, this.xPixel1, y, this.xPixel0, y);
}}}, "~O,~N,JSV.common.Spectrum,~B,~N,~B,JSV.common.IntegralData,~B,~B,~B");
Clazz_defineMethod (c$, "drawFrame", 
 function (g, iSpec, addCurrentBox, addSplitBox, drawUpDownArrows) {
if (!this.pd.gridOn || this.pd.isPrinting) {
this.setColorFromToken (g, JSV.common.ScriptToken.GRIDCOLOR);
this.g2d.drawRect (g, this.xPixel0, this.yPixel0, this.xPixels, this.yPixels);
if (this.pd.isPrinting) return;
}this.setCurrentBoxColor (g);
if (drawUpDownArrows) {
if (iSpec >= 0) {
this.setPlotColor (g, iSpec);
this.fillArrow (g, 3, this.xVArrows, Clazz_doubleToInt ((this.yPixel00 + this.yPixel11) / 2) - 9, true);
this.fillArrow (g, 4, this.xVArrows, Clazz_doubleToInt ((this.yPixel00 + this.yPixel11) / 2) + 9, true);
this.setCurrentBoxColor (g);
}this.fillArrow (g, 3, this.xVArrows, Clazz_doubleToInt ((this.yPixel00 + this.yPixel11) / 2) - 9, false);
this.fillCircle (g, this.xVArrows, Clazz_doubleToInt ((this.yPixel00 + this.yPixel11) / 2), false);
this.fillArrow (g, 4, this.xVArrows, Clazz_doubleToInt ((this.yPixel00 + this.yPixel11) / 2) + 9, false);
}if (this.imageView != null) return;
if (addCurrentBox) {
var x1 = this.xPixel00 + 10;
var x2 = this.xPixel11 - 10;
var y1 = this.yPixel00 + 1;
var y2 = this.yPixel11 - 2;
this.g2d.drawLine (g, x1, y1, x2, y1);
this.g2d.drawLine (g, x2, y1, x2, y2);
this.g2d.drawLine (g, x1, y2, x2, y2);
this.splitterX = this.closerX = -2147483648;
this.drawBox (g, x2 - 10, y1, x2, y1 + 10, null);
this.g2d.drawLine (g, x2 - 10, y1 + 10, x2, y1);
this.g2d.drawLine (g, x2, y1 + 10, x2 - 10, y1);
this.closerX = x2 - 10;
this.closerY = y1;
if (addSplitBox) {
x2 -= 10;
this.fillBox (g, x2 - 10, y1, x2, y1 + 10, null);
this.splitterX = x2 - 10;
this.splitterY = y1;
}}}, "~O,~N,~B,~B,~B");
Clazz_defineMethod (c$, "drawGrid", 
 function (g) {
if (!this.pd.gridOn || this.imageView != null) return;
this.setColorFromToken (g, JSV.common.ScriptToken.GRIDCOLOR);
var lastX;
if (Double.isNaN (this.getScale ().firstX)) {
lastX = this.getScale ().maxXOnScale + this.getScale ().steps[0] / 2;
for (var val = this.getScale ().minXOnScale; val < lastX; val += this.getScale ().steps[0]) {
var x = this.toPixelX (val);
this.g2d.drawLine (g, x, this.yPixel0, x, this.yPixel1);
}
} else {
lastX = this.getScale ().maxXOnScale * 1.0001;
for (var val = this.getScale ().firstX; val <= lastX; val += this.getScale ().steps[0]) {
var x = this.toPixelX (val);
this.g2d.drawLine (g, x, this.yPixel0, x, this.yPixel1);
}
}for (var val = this.getScale ().firstY; val < this.getScale ().maxYOnScale + this.getScale ().steps[1] / 2; val += this.getScale ().steps[1]) {
var y = this.toPixelY (val);
if (y == this.fixY (y)) this.g2d.drawLine (g, this.xPixel0, y, this.xPixel1, y);
}
}, "~O");
Clazz_defineMethod (c$, "drawXScale", 
 function (g, c) {
this.setColorFromToken (g, JSV.common.ScriptToken.SCALECOLOR);
if (this.pd.isPrinting) this.g2d.drawLine (g, c.getXPixel0 (), this.yPixel1, c.getXPixel0 () + c.getXPixels () - 1, this.yPixel1);
var precision = this.getScale ().precision[0];
var font = this.pd.setFont (g, c.getXPixels (), 0, this.pd.isPrinting ? 10 : 12, false);
var y1 = this.yPixel1;
var y2 = this.yPixel1 + 4 * this.pd.scalingFactor;
var y3 = this.yPixel1 + 2 * this.pd.scalingFactor;
var h = font.getHeight ();
var dx = c.toPixelX (this.getScale ().steps[0]) - c.toPixelX (0);
var maxWidth = Math.abs (dx * 0.95);
var firstX = this.getScale ().firstX - this.getScale ().steps[0];
var lastX = (this.getScale ().maxXOnScale + this.getScale ().steps[0]) * 1.0001;
for (var pass = 0; pass < 2; pass++) {
if (pass == 1) JSV.common.ScaleData.fixScale (this.mapX);
var prevX = 1e10;
for (var val = firstX; val <= lastX; val += this.getScale ().steps[0]) {
var x = c.toPixelX (val);
var d = Double.$valueOf (val);
var s;
switch (pass) {
case 0:
s = JU.DF.formatDecimalDbl (val, precision);
this.mapX.put (d, s);
this.drawTick (g, x, y1, y2, c);
dx = Math.abs (prevX - val);
var ntick = this.getScale ().minorTickCounts[0];
if (ntick != 0) {
var step = dx / ntick;
for (var i = 1; i < ntick; i++) {
var x1 = val - i * step;
this.drawTick (g, c.toPixelX (x1), y1, y3, c);
}
}prevX = val;
continue;
case 1:
s = this.mapX.get (d);
if (s == null || x != c.fixX (x)) continue;
var w = this.pd.getStringWidth (s);
var n = (x + Clazz_doubleToInt (w / 2) == c.fixX (x + Clazz_doubleToInt (w / 2)) ? 2 : 0);
if (n > 0) this.g2d.drawString (g, s, x - Clazz_doubleToInt (w / n), y2 + h);
val += Math.floor (w / maxWidth) * this.getScale ().steps[0];
break;
}
}
}
this.mapX.clear ();
}, "~O,JSV.common.XYScaleConverter");
Clazz_defineMethod (c$, "drawTick", 
 function (g, x, y1, y2, c) {
if (x == c.fixX (x)) this.g2d.drawLine (g, x, y1, x, y2);
}, "~O,~N,~N,~N,JSV.common.XYScaleConverter");
Clazz_defineMethod (c$, "drawYScale", 
 function (g, c) {
var sd = c.getScale ();
var precision = sd.precision[1];
var font = this.pd.setFont (g, c.getXPixels (), 0, this.pd.isPrinting ? 10 : 12, false);
var h = font.getHeight ();
var max = sd.maxYOnScale + sd.steps[1] / 2;
var yLast = -2147483648;
this.setColorFromToken (g, JSV.common.ScriptToken.SCALECOLOR);
for (var pass = 0; pass < 2; pass++) {
if (pass == 1) JSV.common.ScaleData.fixScale (this.mapX);
for (var val = sd.firstY; val < max; val += sd.steps[1]) {
var d = Double.$valueOf (val);
var x1 = c.getXPixel0 ();
var y = c.toPixelY (val);
if (y != c.fixY (y)) continue;
var s;
if (pass == 0) this.g2d.drawLine (g, x1, y, x1 - 3 * this.pd.scalingFactor, y);
if (Math.abs (y - yLast) <= h) continue;
yLast = y;
switch (pass) {
case 0:
s = JU.DF.formatDecimalDbl (val, precision);
this.mapX.put (d, s);
break;
case 1:
s = this.mapX.get (d);
if (s == null) continue;
if (s.startsWith ("0") && s.contains ("E")) s = "0";
this.g2d.drawString (g, s, (x1 - 4 * this.pd.scalingFactor - this.pd.getStringWidth (s)), y + Clazz_doubleToInt (h / 3));
break;
}
}
}
this.mapX.clear ();
}, "~O,JSV.common.XYScaleConverter");
Clazz_defineMethod (c$, "drawXUnits", 
 function (g) {
var units = this.spectra.get (0).getAxisLabel (true);
if (units != null) this.drawUnits (g, units, this.xPixel1 + 25 * this.pd.scalingFactor, this.yPixel1 + 5 * this.pd.scalingFactor, 1, 1);
}, "~O");
Clazz_defineMethod (c$, "drawUnits", 
 function (g, s, x, y, hOff, vOff) {
this.setColorFromToken (g, JSV.common.ScriptToken.UNITSCOLOR);
this.pd.setFont (g, (this.imageView == null ? this : this.imageView).getXPixels (), 3, 10, false);
this.g2d.drawString (g, s, Clazz_doubleToInt (x - this.pd.getStringWidth (s) * hOff), Clazz_doubleToInt (y + this.pd.getFontHeight () * vOff));
}, "~O,~S,~N,~N,~N,~N");
Clazz_defineMethod (c$, "drawYUnits", 
 function (g) {
var units = this.spectra.get (0).getAxisLabel (false);
if (units != null) this.drawUnits (g, units, (this.pd.isPrinting ? 30 : 5) * this.pd.scalingFactor, this.yPixel0 + (this.pd.isPrinting ? 0 : 5) * this.pd.scalingFactor, 0, -1);
}, "~O");
Clazz_defineMethod (c$, "drawHighlightsAndPeakTabs", 
 function (gFront, gBack, iSpec) {
var md = this.getMeasurements (JSV.common.Annotation.AType.PeakList, iSpec);
var spec = this.spectra.get (iSpec);
if (this.pd.isPrinting) {
if (md != null) {
this.setColorFromToken (gFront, JSV.common.ScriptToken.PEAKTABCOLOR);
this.printPeakList (gFront, spec, md);
}return;
}if (md == null) {
for (var i = 0; i < this.highlights.size (); i++) {
var hl = this.highlights.get (i);
if (hl.spectrum === spec) {
this.pd.setHighlightColor (hl.color);
this.drawBar (gBack, null, hl.x1, hl.x2, JSV.common.ScriptToken.HIGHLIGHTCOLOR, 0);
}}
if (this.pd.peakTabsOn) this.drawPeakTabs (gFront, gBack, spec);
}var y;
if (md != null) {
y = (spec.isInverted () ? this.yPixel1 - 10 * this.pd.scalingFactor : this.yPixel0);
this.setColorFromToken (gFront, JSV.common.ScriptToken.PEAKTABCOLOR);
for (var i = md.size (); --i >= 0; ) {
var m = md.get (i);
var x = this.toPixelX (m.getXVal ());
this.g2d.drawLine (gFront, x, y, x, y + 10 * this.pd.scalingFactor);
}
if (this.isVisible (this.getDialog (JSV.common.Annotation.AType.PeakList, iSpec))) {
y = this.toPixelY ((md).getThresh ());
if (y == this.fixY (y) && !this.pd.isPrinting) this.g2d.drawLine (gFront, this.xPixel0, y, this.xPixel1, y);
}}}, "~O,~O,~N");
Clazz_defineMethod (c$, "printPeakList", 
 function (g, spec, data) {
var sdata = data.getMeasurementListArray (null);
if (sdata.length == 0) return;
this.pd.setFont (g, this.xPixels, 0, 8, false);
var h = this.pd.getFontHeight ();
var xs =  Clazz_newIntArray (data.size (), 0);
var xs0 =  Clazz_newIntArray (data.size (), 0);
var dx = 0;
var s5 = 5 * this.pd.scalingFactor;
var s10 = 10 * this.pd.scalingFactor;
var s15 = 15 * this.pd.scalingFactor;
var s25 = 25 * this.pd.scalingFactor;
for (var i = 0; i < sdata.length; i++) {
xs0[i] = this.toPixelX (Double.parseDouble (sdata[i][1]));
if (i == 0) {
xs[i] = xs0[i];
continue;
}xs[i] = Math.max (xs[i - 1] + h, xs0[i] + h);
dx += (xs[i] - xs0[i]);
}
dx /= 2 * sdata.length;
if (xs[0] - dx < this.xPixel0 + s25) dx = xs[0] - (this.xPixel0 + s25);
for (var i = 0; i < sdata.length; i++) xs[i] -= dx;

var inverted = spec.isInverted ();
var y4 = this.pd.getStringWidth ("99.9999");
var y2 = (sdata[0].length >= 6 ? this.pd.getStringWidth ("99.99") : 0);
var f = (inverted ? -1 : 1);
var y = (inverted ? this.yPixel1 : this.yPixel0) + f * (y2 + y4 + s15);
for (var i = 0; i < sdata.length; i++) {
this.g2d.drawLine (g, xs[i], y, xs[i], y + s5 * f);
this.g2d.drawLine (g, xs[i], y + s5 * f, xs0[i], y + s10 * f);
this.g2d.drawLine (g, xs0[i], y + s10 * f, xs0[i], y + s15 * f);
if (y2 > 0 && sdata[i][4].length > 0) this.g2d.drawLine (g, Clazz_doubleToInt ((xs[i] + xs[i - 1]) / 2), y - y4 + s5, Clazz_doubleToInt ((xs[i] + xs[i - 1]) / 2), y - y4 - s5);
}
y -= f * 2 * this.pd.scalingFactor;
if (y2 > 0) {
this.drawStringRotated (g, -90, xs[0] - s15, y, "  ppm");
this.drawStringRotated (g, -90, xs[0] - s15, y - y4 - s5, " Hz");
}for (var i = data.size (); --i >= 0; ) {
this.drawStringRotated (g, -90 * f, xs[i] + Clazz_doubleToInt (f * h / 3), y, sdata[i][1]);
if (y2 > 0 && sdata[i][4].length > 0) {
var x = Clazz_doubleToInt ((xs[i] + xs[i - 1]) / 2) + Clazz_doubleToInt (h / 3);
this.drawStringRotated (g, -90, x, y - y4 - s5, sdata[i][4]);
}}
}, "~O,JSV.common.Spectrum,JSV.common.PeakData");
Clazz_defineMethod (c$, "drawStringRotated", 
 function (g, angle, x, y, s) {
this.g2d.drawStringRotated (g, s, x, y, angle);
}, "~O,~N,~N,~N,~S");
Clazz_defineMethod (c$, "drawAnnotations", 
 function (g, annotations, whatColor) {
this.pd.setFont (g, this.xPixels, 1, 18, false);
for (var i = annotations.size (); --i >= 0; ) {
var note = annotations.get (i);
this.setAnnotationColor (g, note, whatColor);
var c = (note.is2D ? this.imageView : this);
var x = c.toPixelX (note.getXVal ());
var y = (note.isPixels () ? Clazz_doubleToInt (this.yPixel0 + 10 + 10 * this.pd.scalingFactor - note.getYVal ()) : note.is2D ? this.imageView.subIndexToPixelY (Clazz_doubleToInt (note.getYVal ())) : this.toPixelY (note.getYVal ()));
this.g2d.drawString (g, note.text, x + note.offsetX * this.pd.scalingFactor, y - note.offsetY * this.pd.scalingFactor);
}
}, "~O,JU.Lst,JSV.common.ScriptToken");
Clazz_defineMethod (c$, "drawIntegralValues", 
 function (g, iSpec, yOffset) {
var integrals = this.getMeasurements (JSV.common.Annotation.AType.Integration, iSpec);
if (integrals != null) {
if (this.pd.isPrinting) this.pd.setFont (g, this.xPixels, 0, 8, false);
 else this.pd.setFont (g, this.xPixels, 1, 12, false);
this.setColorFromToken (g, JSV.common.ScriptToken.INTEGRALPLOTCOLOR);
var h = this.pd.getFontHeight ();
this.g2d.setStrokeBold (g, true);
for (var i = integrals.size (); --i >= 0; ) {
var $in = integrals.get (i);
if ($in.getValue () == 0) continue;
var x = this.toPixelX ($in.getXVal2 ());
var y1 = yOffset * this.pd.scalingFactor + this.toPixelYint ($in.getYVal ());
var y2 = yOffset * this.pd.scalingFactor + this.toPixelYint ($in.getYVal2 ());
if (x != this.fixX (x) || y1 != this.fixY (y1) || y2 != this.fixY (y2)) continue;
if (!this.pd.isPrinting) this.g2d.drawLine (g, x, y1, x, y2);
var s = "  " + $in.text;
this.g2d.drawString (g, s, x, Clazz_doubleToInt ((y1 + y2) / 2) + Clazz_doubleToInt (h / 3));
}
this.g2d.setStrokeBold (g, false);
}if (iSpec == this.getFixedSelectedSpectrumIndex ()) this.selectedSpectrumIntegrals = integrals;
}, "~O,~N,~N");
Clazz_defineMethod (c$, "drawMeasurements", 
 function (g, iSpec) {
var md = this.getMeasurements (JSV.common.Annotation.AType.Measurements, iSpec);
if (md != null) for (var i = md.size (); --i >= 0; ) this.drawMeasurement (g, md.get (i));

if (iSpec == this.getFixedSelectedSpectrumIndex ()) this.selectedSpectrumMeasurements = md;
}, "~O,~N");
Clazz_defineMethod (c$, "drawMeasurement", 
 function (g, m) {
if (m.text.length == 0 && m !== this.pendingMeasurement) return;
this.pd.setFont (g, this.xPixels, 1, 12, false);
this.g2d.setGraphicsColor (g, (m === this.pendingMeasurement ? this.pd.getColor (JSV.common.ScriptToken.PEAKTABCOLOR) : this.pd.BLACK));
var x1 = this.toPixelX (m.getXVal ());
var y1 = this.toPixelY (m.getYVal ());
var x2 = this.toPixelX (m.getXVal2 ());
if (Double.isNaN (m.getXVal ()) || x1 != this.fixX (x1) || x2 != this.fixX (x2)) return;
var drawString = (Math.abs (x1 - x2) >= 2);
var drawBaseLine = this.getScale ().isYZeroOnScale () && m.spec.isHNMR ();
var x = Clazz_doubleToInt ((x1 + x2) / 2);
this.g2d.setStrokeBold (g, true);
if (drawString) this.g2d.drawLine (g, x1, y1, x2, y1);
if (drawBaseLine) this.g2d.drawLine (g, x1 + 1, this.yPixel1 - 1, x2, this.yPixel1 - 1);
this.g2d.setStrokeBold (g, false);
if (drawString) this.g2d.drawString (g, m.text, x + m.offsetX, y1 - m.offsetY);
if (drawBaseLine) {
this.g2d.drawLine (g, x1, this.yPixel1, x1, this.yPixel1 - 6 * this.pd.scalingFactor);
this.g2d.drawLine (g, x2, this.yPixel1, x2, this.yPixel1 - 6 * this.pd.scalingFactor);
}}, "~O,JSV.common.Measurement");
Clazz_defineMethod (c$, "getPinSelected", 
 function (xPixel, yPixel) {
if (this.widgets != null) for (var i = 0; i < this.widgets.length; i++) {
if (this.widgets[i] != null && this.widgets[i].isPinOrCursor && this.widgets[i].selected (xPixel, yPixel)) {
return this.widgets[i];
}}
return null;
}, "~N,~N");
Clazz_defineMethod (c$, "set2DCrossHairs", 
function (xPixel, yPixel) {
var x;
if (xPixel == this.imageView.fixX (xPixel) && yPixel == this.fixY (yPixel)) {
this.pin1Dx1.setX (x = this.imageView.toX (xPixel), this.toPixelX (x));
this.cur2Dx1.setX (x, xPixel);
this.setCurrentSubSpectrum (this.imageView.toSubspectrumIndex (yPixel));
if (this.isLinked) {
var y = this.imageView.toY (yPixel);
this.pd.set2DCrossHairsLinked (this, x, y, !this.sticky2Dcursor);
}}}, "~N,~N");
Clazz_defineMethod (c$, "reset2D", 
 function (isX) {
if (isX) {
this.imageView.setView0 (this.imageView.xPixel0, this.pin2Dy0.yPixel0, this.imageView.xPixel1, this.pin2Dy1.yPixel0);
this.doZoom (0, this.getScale ().minY, 0, this.getScale ().maxY, true, false, false, false, true);
} else {
this.imageView.setView0 (this.pin2Dx0.xPixel0, this.imageView.yPixel0, this.pin2Dx1.xPixel0, this.imageView.yPixel1);
}}, "~B");
Clazz_defineMethod (c$, "setAnnotationText", 
 function (a) {
var sval = this.pd.getInput ("New text?", "Set Label", a.text);
if (sval == null) return false;
if (sval.length == 0) this.annotations.removeObj (a);
 else a.text = sval;
return true;
}, "JSV.common.Annotation");
Clazz_defineMethod (c$, "checkIntegral", 
 function (x1, x2, isFinal) {
var ad = this.getDialog (JSV.common.Annotation.AType.Integration, -1);
if (ad == null) return false;
var integral = (ad.getData ()).addIntegralRegion (x1, x2);
if (isFinal && ad.isDialog ()) (ad).update (null, 0, 0);
if (Double.isNaN (x2)) return false;
this.pendingIntegral = (isFinal ? null : integral);
this.pd.isIntegralDrag = !isFinal;
this.selectedSpectrumIntegrals = null;
return true;
}, "~N,~N,~B");
Clazz_defineMethod (c$, "setToolTipForPixels", 
 function (xPixel, yPixel) {
if (this.iSpectrumMovedTo != this.iSpectrumClicked || this.pd.getCurrentGraphSet () !== this) {
this.pd.setToolTipText ("click spectrum to activate");
return;
}if (this.isSplitWidget (xPixel, yPixel)) {
this.pd.setToolTipText ("click to " + (this.nSplit > 1 ? "combine" : "split"));
return;
}if (this.isCloserWidget (xPixel, yPixel)) {
this.pd.setToolTipText ("click to close");
return;
}var pw = this.getPinSelected (xPixel, yPixel);
var precisionX = this.getScale ().precision[0];
var precisionY = this.getScale ().precision[1];
if (pw != null) {
if (this.setStartupPinTip ()) return;
var s;
if (pw === this.pin1Dx01 || pw === this.pin2Dx01) {
s = JU.DF.formatDecimalDbl (Math.min (this.pin1Dx0.getXVal (), this.pin1Dx1.getXVal ()), precisionX) + " - " + JU.DF.formatDecimalDbl (Math.max (this.pin1Dx0.getXVal (), this.pin1Dx1.getXVal ()), precisionX);
} else if (pw === this.pin1Dy01) {
s = JU.DF.formatDecimalDbl (Math.min (this.pin1Dy0.getYVal (), this.pin1Dy1.getYVal ()), precisionY) + " - " + JU.DF.formatDecimalDbl (Math.max (this.pin1Dy0.getYVal (), this.pin1Dy1.getYVal ()), precisionY);
} else if (pw === this.cur2Dy) {
var isub = this.imageView.toSubspectrumIndex (pw.yPixel0);
s = this.get2DYLabel (isub, precisionX);
} else if (pw === this.pin2Dy01) {
s = "" + Clazz_doubleToInt (Math.min (this.pin2Dy0.getYVal (), this.pin2Dy1.getYVal ())) + " - " + Clazz_doubleToInt (Math.max (this.pin2Dy0.getYVal (), this.pin2Dy1.getYVal ()));
} else if (pw.isXtype) {
s = JU.DF.formatDecimalDbl (pw.getXVal (), precisionX);
} else if (pw.is2D) {
s = "" + Clazz_doubleToInt (pw.getYVal ());
} else {
s = JU.DF.formatDecimalDbl (pw.getYVal (), precisionY);
}this.pd.setToolTipText (s);
return;
}var yPt;
if (this.imageView != null) {
if (this.imageView.fixX (xPixel) == xPixel && this.fixY (yPixel) == yPixel) {
var isub = this.imageView.toSubspectrumIndex (yPixel);
var s = "y=" + this.get2DYLabel (isub, precisionX) + " / x=" + JU.DF.formatDecimalDbl (this.imageView.toX (xPixel), precisionX) + " " + this.getSpectrum ().getAxisLabel (true);
this.pd.setToolTipText (s);
this.pd.coordStr = s;
return;
}if (!this.pd.display1D) {
this.pd.setToolTipText ("");
this.pd.coordStr = "";
return;
}}var xPt = this.toX (this.fixX (xPixel));
yPt = (this.imageView != null && this.imageView.isXWithinRange (xPixel) ? this.imageView.toSubspectrumIndex (this.fixY (yPixel)) : this.toY (this.fixY (yPixel)));
var xx = this.setCoordStr (xPt, yPt);
var iSpec = this.getFixedSelectedSpectrumIndex ();
if (!this.isInPlotRegion (xPixel, yPixel)) {
yPt = NaN;
} else if (this.nSpectra == 1) {
} else if (this.haveIntegralDisplayed (iSpec)) {
yPt = this.getIntegrationGraph (iSpec).getPercentYValueAt (xPt);
xx += ", " + JU.DF.formatDecimalDbl (yPt, 1);
}this.pd.setToolTipText ((this.selectedIntegral != null ? "click to set value" : this.pendingMeasurement != null || this.selectedMeasurement != null ? (this.pd.hasFocus () ? "Press ESC to delete " + (this.selectedIntegral != null ? "integral, DEL to delete all visible, or N to normalize" : this.pendingMeasurement == null ? "\"" + this.selectedMeasurement.text + "\" or DEL to delete all visible" : "measurement") : "") : Double.isNaN (yPt) ? null : xx));
}, "~N,~N");
Clazz_defineMethod (c$, "isFrameBox", 
 function (xPixel, yPixel, boxX, boxY) {
return Math.abs (xPixel - (boxX + 5)) < 5 && Math.abs (yPixel - (boxY + 5)) < 5;
}, "~N,~N,~N,~N");
Clazz_defineMethod (c$, "setCoordStr", 
 function (xPt, yPt) {
var xx = JU.DF.formatDecimalDbl (xPt, this.getScale ().precision[0]);
this.pd.coordStr = "(" + xx + (this.haveSingleYScale || this.iSpectrumSelected >= 0 ? ", " + JU.DF.formatDecimalDbl (yPt, this.getScale ().precision[1]) : "") + ")";
return xx;
}, "~N,~N");
Clazz_defineMethod (c$, "setStartupPinTip", 
 function () {
if (this.pd.startupPinTip == null) return false;
this.pd.setToolTipText (this.pd.startupPinTip);
this.pd.startupPinTip = null;
return true;
});
Clazz_defineMethod (c$, "get2DYLabel", 
 function (isub, precision) {
var spec = this.getSpectrumAt (0).getSubSpectra ().get (isub);
return JU.DF.formatDecimalDbl (spec.getY2DPPM (), precision) + " PPM" + (spec.y2DUnits.equals ("HZ") ? " (" + JU.DF.formatDecimalDbl (spec.getY2D (), precision) + " HZ) " : "");
}, "~N,~N");
Clazz_defineMethod (c$, "isOnSpectrum", 
 function (xPixel, yPixel, index) {
var xyCoords = null;
var isContinuous = true;
var isIntegral = (index < 0);
if (isIntegral) {
var ad = this.getDialog (JSV.common.Annotation.AType.Integration, -1);
if (ad == null) return false;
xyCoords = (ad.getData ()).getXYCoords ();
index = this.getFixedSelectedSpectrumIndex ();
} else {
this.setScale (index);
var spec = this.spectra.get (index);
xyCoords = spec.xyCoords;
isContinuous = spec.isContinuous ();
}var yOffset = index * Clazz_floatToInt (this.yPixels * (this.yStackOffsetPercent / 100));
var ix0 = this.viewData.getStartingPointIndex (index);
var ix1 = this.viewData.getEndingPointIndex (index);
if (isContinuous) {
for (var i = ix0; i < ix1; i++) {
var point1 = xyCoords[i];
var point2 = xyCoords[i + 1];
var x1 = this.toPixelX (point1.getXVal ());
var x2 = this.toPixelX (point2.getXVal ());
var y1 = (isIntegral ? this.toPixelYint (point1.getYVal ()) : this.toPixelY (point1.getYVal ()));
var y2 = (isIntegral ? this.toPixelYint (point2.getYVal ()) : this.toPixelY (point2.getYVal ()));
if (y1 == -2147483648 || y2 == -2147483648) continue;
y1 = this.fixY (y1) - yOffset;
y2 = this.fixY (y2) - yOffset;
if (JSV.common.GraphSet.isOnLine (xPixel, yPixel, x1, y1, x2, y2)) return true;
}
} else {
for (var i = ix0; i <= ix1; i++) {
var point = xyCoords[i];
var y2 = this.toPixelY (point.getYVal ());
if (y2 == -2147483648) continue;
var x1 = this.toPixelX (point.getXVal ());
var y1 = this.toPixelY (Math.max (this.getScale ().minYOnScale, 0));
y1 = this.fixY (y1);
y2 = this.fixY (y2);
if (y1 == y2 && (y1 == this.yPixel0 || y1 == this.yPixel1)) continue;
if (JSV.common.GraphSet.isOnLine (xPixel, yPixel, x1, y1, x1, y2)) return true;
}
}return false;
}, "~N,~N,~N");
c$.distance = Clazz_defineMethod (c$, "distance", 
 function (dx, dy) {
return Math.sqrt (dx * dx + dy * dy);
}, "~N,~N");
c$.findCompatibleGraphSet = Clazz_defineMethod (c$, "findCompatibleGraphSet", 
 function (graphSets, spec) {
for (var i = 0; i < graphSets.size (); i++) if (JSV.common.Spectrum.areXScalesCompatible (spec, graphSets.get (i).getSpectrum (), false, false)) return graphSets.get (i);

return null;
}, "JU.Lst,JSV.common.Spectrum");
c$.isGoodEvent = Clazz_defineMethod (c$, "isGoodEvent", 
 function (zOrP, p, asX) {
return (p == null ? (Math.abs (zOrP.xPixel1 - zOrP.xPixel0) > 5 && Math.abs (zOrP.yPixel1 - zOrP.yPixel0) > 5) : asX ? Math.abs (zOrP.xPixel0 - p.xPixel0) > 5 : Math.abs (zOrP.yPixel0 - p.yPixel0) > 5);
}, "JSV.common.PlotWidget,JSV.common.PlotWidget,~B");
c$.isOnLine = Clazz_defineMethod (c$, "isOnLine", 
 function (xPixel, yPixel, x1, y1, x2, y2) {
var dx1 = Math.abs (x1 - xPixel);
if (dx1 < 2 && Math.abs (y1 - yPixel) < 2) return true;
var dx2 = x2 - xPixel;
if (Math.abs (dx2) < 2 && Math.abs (y2 - yPixel) < 2) return true;
var dy12 = y1 - y2;
if (Math.abs (dy12) > 2 && (y1 < yPixel) == (y2 < yPixel)) return false;
var dx12 = x1 - x2;
if (Math.abs (dx12) > 2 && (x1 < xPixel) == (x2 < xPixel)) return false;
return (JSV.common.GraphSet.distance (dx1, y1 - yPixel) + JSV.common.GraphSet.distance (dx2, yPixel - y2) < JSV.common.GraphSet.distance (dx12, dy12) + 2);
}, "~N,~N,~N,~N,~N,~N");
c$.setFractionalPositions = Clazz_defineMethod (c$, "setFractionalPositions", 
 function (pd, graphSets, linkMode) {
var n = graphSets.size ();
var f = 0;
var n2d = 1;
var gs;
var y = 0;
pd.isLinked = (linkMode !== JSV.common.PanelData.LinkMode.NONE);
if (linkMode === JSV.common.PanelData.LinkMode.NONE) {
for (var i = 0; i < n; i++) {
gs = graphSets.get (i);
f += (gs.getSpectrumAt (0).is1D () ? 1 : n2d) * gs.nSplit;
}
f = 1 / f;
for (var i = 0; i < n; i++) {
gs = graphSets.get (i);
gs.isLinked = false;
var g = (gs.getSpectrumAt (0).is1D () ? f : n2d * f);
gs.fX0 = 0;
gs.fY0 = y;
gs.fracX = 1;
gs.fracY = g;
y += g * gs.nSplit;
}
} else {
var gs2d = null;
var i2d = -1;
if (n == 2 || n == 3) for (var i = 0; i < n; i++) {
gs = graphSets.get (i);
if (!gs.getSpectrum ().is1D ()) {
gs2d = gs;
if (i2d >= 0) i = -2;
i2d = i;
break;
}}
if (i2d == -2 || i2d == -1 && n != 2) {
JSV.common.GraphSet.setFractionalPositions (pd, graphSets, JSV.common.PanelData.LinkMode.NONE);
return;
}for (var i = 0; i < n; i++) {
gs = graphSets.get (i);
gs.isLinked = true;
var s1 = gs.getSpectrumAt (0);
var is1D = s1.is1D ();
if (is1D) {
if (gs2d != null) {
var s2 = gs2d.getSpectrumAt (0);
if (JSV.common.Spectrum.areLinkableX (s1, s2)) gs.gs2dLinkedX = gs2d;
if (JSV.common.Spectrum.areLinkableY (s1, s2)) gs.gs2dLinkedY = gs2d;
}gs.fX0 = 0;
gs.fY0 = y;
gs.fracX = (gs2d == null ? 1 : 0.5);
gs.fracY = (n == 3 || gs2d == null ? 0.5 : 1);
y += 0.5;
} else {
gs.fX0 = 0.5;
gs.fY0 = 0;
gs.fracX = 0.5;
gs.fracY = 1;
}}
}}, "JSV.common.PanelData,JU.Lst,JSV.common.PanelData.LinkMode");
Clazz_defineMethod (c$, "addAnnotation", 
function (args, title) {
if (args.size () == 0 || args.size () == 1 && args.get (0).equalsIgnoreCase ("none")) {
this.annotations = null;
this.lastAnnotation = null;
return null;
}if (args.size () < 4 && this.lastAnnotation == null) this.lastAnnotation = this.getAnnotation ((this.getScale ().maxXOnScale + this.getScale ().minXOnScale) / 2, (this.getScale ().maxYOnScale + this.getScale ().minYOnScale) / 2, title, false, false, 0, 0);
var annotation = this.getAnnotation (args, this.lastAnnotation);
if (annotation == null) return null;
if (this.annotations == null && args.size () == 1 && args.get (0).charAt (0) == '\"') {
var s = annotation.text;
this.getSpectrum ().setTitle (s);
return s;
}this.lastAnnotation = annotation;
this.addAnnotation (annotation, false);
return null;
}, "JU.Lst,~S");
Clazz_defineMethod (c$, "addHighlight", 
function (x1, x2, spec, color) {
if (spec == null) spec = this.getSpectrumAt (0);
var hl = Clazz_innerTypeInstance (JSV.common.GraphSet.Highlight, this, null, x1, x2, spec, (color == null ? this.pd.getColor (JSV.common.ScriptToken.HIGHLIGHTCOLOR) : color));
if (!this.highlights.contains (hl)) this.highlights.addLast (hl);
}, "~N,~N,JSV.common.Spectrum,javajs.api.GenericColor");
Clazz_defineMethod (c$, "addPeakHighlight", 
function (peakInfo) {
for (var i = this.spectra.size (); --i >= 0; ) {
var spec = this.spectra.get (i);
this.removeAllHighlights (spec);
if (peakInfo == null || peakInfo.isClearAll () || spec !== peakInfo.spectrum) continue;
var peak = peakInfo.toString ();
if (peak == null) {
continue;
}var xMin = JU.PT.getQuotedAttribute (peak, "xMin");
var xMax = JU.PT.getQuotedAttribute (peak, "xMax");
if (xMin == null || xMax == null) return;
var x1 = JU.PT.parseFloat (xMin);
var x2 = JU.PT.parseFloat (xMax);
if (Float.isNaN (x1) || Float.isNaN (x2)) return;
this.pd.addHighlight (this, x1, x2, spec, 200, 140, 140, 100);
spec.setSelectedPeak (peakInfo);
if (this.getScale ().isInRangeX (x1) || this.getScale ().isInRangeX (x2) || x1 < this.getScale ().minX && this.getScale ().maxX < x2) {
} else {
this.setZoomTo (0);
}}
}, "JSV.common.PeakInfo");
Clazz_defineMethod (c$, "advanceSubSpectrum", 
function (dir) {
var spec0 = this.getSpectrumAt (0);
var i = spec0.advanceSubSpectrum (dir);
if (spec0.isForcedSubset ()) this.viewData.setXRangeForSubSpectrum (this.getSpectrum ().getXYCoords ());
this.pd.notifySubSpectrumChange (i, this.getSpectrum ());
}, "~N");
Clazz_defineMethod (c$, "checkSpectrumClickedEvent", 
function (xPixel, yPixel, clickCount) {
if (this.nextClickForSetPeak != null) return false;
if (clickCount > 1 || this.pendingMeasurement != null || !this.isInPlotRegion (xPixel, yPixel)) return false;
if (clickCount == 0) {
var isOnIntegral = this.isOnSpectrum (xPixel, yPixel, -1);
this.pd.integralShiftMode = (isOnIntegral ? this.getShiftMode (xPixel, yPixel) : 0);
this.pd.isIntegralDrag = (this.pd.integralShiftMode == 0 && (isOnIntegral || this.haveIntegralDisplayed (-1) && this.findMeasurement (this.getIntegrationGraph (-1), xPixel, yPixel, 0) != null));
if (this.pd.integralShiftMode != 0) return false;
}if (!this.showAllStacked) return false;
this.stackSelected = false;
for (var i = 0; i < this.nSpectra; i++) {
if (!this.isOnSpectrum (xPixel, yPixel, i)) continue;
this.setSpectrumClicked (this.iPreviousSpectrumClicked = i);
return false;
}
if (this.isDialogOpen ()) return false;
this.setSpectrumClicked (-1);
return this.stackSelected = false;
}, "~N,~N,~N");
Clazz_defineMethod (c$, "getShiftMode", 
 function (xPixel, yPixel) {
return (this.isStartEndIntegral (xPixel, false) ? yPixel : this.isStartEndIntegral (xPixel, true) ? -yPixel : 0);
}, "~N,~N");
Clazz_defineMethod (c$, "isDialogOpen", 
 function () {
return (this.isVisible (this.getDialog (JSV.common.Annotation.AType.Integration, -1)) || this.isVisible (this.getDialog (JSV.common.Annotation.AType.Measurements, -1)) || this.isVisible (this.getDialog (JSV.common.Annotation.AType.PeakList, -1)));
});
Clazz_defineMethod (c$, "isStartEndIntegral", 
 function (xPixel, isEnd) {
return (isEnd ? this.xPixelPlot1 - xPixel < 20 : xPixel - this.xPixelPlot0 < 20);
}, "~N,~B");
Clazz_defineMethod (c$, "checkWidgetEvent", 
function (xPixel, yPixel, isPress) {
if (!this.widgetsAreSet) return false;
this.widgetsAreSet = false;
var widget;
if (isPress) {
if (this.pd.clickCount == 2 && this.lastIntDragX != xPixel && !this.is2dClick (xPixel, yPixel)) {
if (this.pendingMeasurement == null) {
if (this.iSpectrumClicked == -1 && this.iPreviousSpectrumClicked >= 0) {
this.setSpectrumClicked (this.iPreviousSpectrumClicked);
}this.processPendingMeasurement (xPixel, yPixel, 2);
return true;
}} else if (!this.is2dClick (xPixel, yPixel)) {
if (this.isOnSpectrum (xPixel, yPixel, -1)) {
this.checkIntegral (this.toX (xPixel), NaN, false);
}if (this.lastIntDragX == xPixel) {
this.pd.isIntegralDrag = true;
if (!this.checkIntegral (this.toX (xPixel), this.toX (xPixel), false)) return false;
}}if (this.pendingMeasurement != null) return true;
widget = this.getPinSelected (xPixel, yPixel);
if (widget == null) {
yPixel = this.fixY (yPixel);
if (xPixel < this.xPixel1) {
if (this.pd.shiftPressed) this.setSpectrumClicked (this.iPreviousSpectrumClicked);
xPixel = this.fixX (xPixel);
if (this.zoomBox1D == null) this.newPins ();
this.zoomBox1D.setX (this.toX (xPixel), xPixel);
this.zoomBox1D.yPixel0 = yPixel;
widget = this.zoomBox1D;
} else if (this.imageView != null && xPixel < this.imageView.xPixel1) {
this.zoomBox2D.setX (this.imageView.toX (xPixel), this.imageView.fixX (xPixel));
this.zoomBox2D.yPixel0 = yPixel;
widget = this.zoomBox2D;
}}this.pd.thisWidget = widget;
return false;
}this.nextClickForSetPeak = null;
widget = this.pd.thisWidget;
if (widget == null) return false;
if (widget === this.zoomBox1D) {
this.zoomBox1D.xPixel1 = this.fixX (xPixel);
this.zoomBox1D.yPixel1 = this.fixY (yPixel);
if (this.pd.isIntegralDrag && this.zoomBox1D.xPixel0 != this.zoomBox1D.xPixel1) {
if ((this.lastIntDragX <= xPixel) != (this.zoomBox1D.xPixel0 <= xPixel)) {
this.zoomBox1D.xPixel0 = this.lastIntDragX;
this.zoomBox1D.xPixel1 = xPixel;
this.zoomBox1D.setXVal (this.toX (this.zoomBox1D.xPixel0));
}this.lastIntDragX = xPixel;
this.checkIntegral (this.zoomBox1D.getXVal (), this.toX (this.zoomBox1D.xPixel1), false);
}return false;
}if (!this.zoomEnabled) return false;
if (widget === this.zoomBox2D) {
this.zoomBox2D.xPixel1 = this.imageView.fixX (xPixel);
this.zoomBox2D.yPixel1 = this.fixY (yPixel);
return true;
}if (widget === this.cur2Dy) {
yPixel = this.fixY (yPixel);
this.cur2Dy.yPixel0 = this.cur2Dy.yPixel1 = yPixel;
this.setCurrentSubSpectrum (this.imageView.toSubspectrumIndex (yPixel));
return true;
}if (widget === this.cur2Dx0 || widget === this.cur2Dx1) {
return false;
}if (widget === this.pin1Dx0 || widget === this.pin1Dx1 || widget === this.pin1Dx01) {
xPixel = this.fixX (xPixel);
widget.setX (this.toX0 (xPixel), xPixel);
if (widget === this.pin1Dx01) {
var dp = xPixel - (Clazz_doubleToInt ((this.pin1Dx0.xPixel0 + this.pin1Dx1.xPixel0) / 2));
var dp1 = (dp < 0 ? dp : dp);
var dp2 = (dp < 0 ? dp : dp);
xPixel = this.pin1Dx0.xPixel0 + dp2;
var xPixel1 = this.pin1Dx1.xPixel0 + dp1;
if (dp == 0 || this.fixX (xPixel) != xPixel || this.fixX (xPixel1) != xPixel1) return true;
this.pin1Dx0.setX (this.toX0 (xPixel), xPixel);
this.pin1Dx1.setX (this.toX0 (xPixel1), xPixel1);
}this.doZoom (this.pin1Dx0.getXVal (), 0, this.pin1Dx1.getXVal (), 0, true, false, false, true, false);
return true;
}if (widget === this.pin1Dy0 || widget === this.pin1Dy1 || widget === this.pin1Dy01) {
yPixel = this.fixY (yPixel);
widget.setY (this.toY0 (yPixel), yPixel);
if (widget === this.pin1Dy01) {
var dp = yPixel - Clazz_doubleToInt ((this.pin1Dy0.yPixel0 + this.pin1Dy1.yPixel0) / 2) + 1;
yPixel = this.pin1Dy0.yPixel0 + dp;
var yPixel1 = this.pin1Dy1.yPixel0 + dp;
var y0 = this.toY0 (yPixel);
var y1 = this.toY0 (yPixel1);
if (Math.min (y0, y1) == this.getScale ().minY || Math.max (y0, y1) == this.getScale ().maxY) return true;
this.pin1Dy0.setY (y0, yPixel);
this.pin1Dy1.setY (y1, yPixel1);
}this.doZoom (0, this.pin1Dy0.getYVal (), 0, this.pin1Dy1.getYVal (), this.imageView == null, this.imageView == null, false, false, false);
return true;
}if (widget === this.pin2Dx0 || widget === this.pin2Dx1 || widget === this.pin2Dx01) {
xPixel = this.imageView.fixX (xPixel);
widget.setX (this.imageView.toX0 (xPixel), xPixel);
if (widget === this.pin2Dx01) {
var dp = xPixel - Clazz_doubleToInt ((this.pin2Dx0.xPixel0 + this.pin2Dx1.xPixel0) / 2) + 1;
xPixel = this.pin2Dx0.xPixel0 + dp;
var xPixel1 = this.pin2Dx1.xPixel0 + dp;
if (this.imageView.fixX (xPixel) != xPixel || this.imageView.fixX (xPixel1) != xPixel1) return true;
this.pin2Dx0.setX (this.imageView.toX0 (xPixel), xPixel);
this.pin2Dx1.setX (this.imageView.toX0 (xPixel1), xPixel1);
}if (!JSV.common.GraphSet.isGoodEvent (this.pin2Dx0, this.pin2Dx1, true)) {
this.reset2D (true);
return true;
}this.imageView.setView0 (this.pin2Dx0.xPixel0, this.pin2Dy0.yPixel0, this.pin2Dx1.xPixel0, this.pin2Dy1.yPixel0);
this.doZoom (this.pin2Dx0.getXVal (), this.getScale ().minY, this.pin2Dx1.getXVal (), this.getScale ().maxY, false, false, false, true, false);
return true;
}if (widget === this.pin2Dy0 || widget === this.pin2Dy1 || widget === this.pin2Dy01) {
yPixel = this.fixY (yPixel);
widget.setY (this.imageView.toSubspectrumIndex (yPixel), yPixel);
if (widget === this.pin2Dy01) {
var dp = yPixel - Clazz_doubleToInt ((this.pin2Dy0.yPixel0 + this.pin2Dy1.yPixel0) / 2) + 1;
yPixel = this.pin2Dy0.yPixel0 + dp;
var yPixel1 = this.pin2Dy1.yPixel0 + dp;
if (yPixel != this.fixY (yPixel) || yPixel1 != this.fixY (yPixel1)) return true;
this.pin2Dy0.setY (this.imageView.toSubspectrumIndex (yPixel), yPixel);
this.pin2Dy1.setY (this.imageView.toSubspectrumIndex (yPixel1), yPixel1);
}if (!JSV.common.GraphSet.isGoodEvent (this.pin2Dy0, this.pin2Dy1, false)) {
this.reset2D (false);
return true;
}this.imageView.setView0 (this.pin2Dx0.xPixel0, this.pin2Dy0.yPixel0, this.pin2Dx1.xPixel1, this.pin2Dy1.yPixel1);
return true;
}return false;
}, "~N,~N,~B");
Clazz_defineMethod (c$, "clearIntegrals", 
function () {
this.checkIntegral (NaN, 0, false);
});
Clazz_defineMethod (c$, "clearMeasurements", 
function () {
this.removeDialog (this.getFixedSelectedSpectrumIndex (), JSV.common.Annotation.AType.Measurements);
});
c$.createGraphSetsAndSetLinkMode = Clazz_defineMethod (c$, "createGraphSetsAndSetLinkMode", 
function (pd, jsvp, spectra, startIndex, endIndex, linkMode) {
var graphSets =  new JU.Lst ();
for (var i = 0; i < spectra.size (); i++) {
var spec = spectra.get (i);
var graphSet = (linkMode === JSV.common.PanelData.LinkMode.NONE ? JSV.common.GraphSet.findCompatibleGraphSet (graphSets, spec) : null);
if (graphSet == null) graphSets.addLast (graphSet =  new JSV.common.GraphSet (jsvp.getPanelData ()));
graphSet.addSpec (spec);
}
JSV.common.GraphSet.setFractionalPositions (pd, graphSets, linkMode);
for (var i = graphSets.size (); --i >= 0; ) {
graphSets.get (i).initGraphSet (startIndex, endIndex);
JU.Logger.info ("JSVGraphSet " + (i + 1) + " nSpectra = " + graphSets.get (i).nSpectra);
}
return graphSets;
}, "JSV.common.PanelData,JSV.api.JSVPanel,JU.Lst,~N,~N,JSV.common.PanelData.LinkMode");
Clazz_defineMethod (c$, "drawGraphSet", 
function (gMain, gFront, gBack, width, height, left, right, top, bottom, isResized, taintedAll, pointsOnly) {
this.zoomEnabled = this.pd.getBoolean (JSV.common.ScriptToken.ENABLEZOOM);
this.height = height * this.pd.scalingFactor;
this.width = width * this.pd.scalingFactor;
this.left = left * this.pd.scalingFactor;
this.right = right * this.pd.scalingFactor;
this.top = top * this.pd.scalingFactor;
this.bottom = bottom * this.pd.scalingFactor;
this.$haveSelectedSpectrum = false;
this.selectedSpectrumIntegrals = null;
this.selectedSpectrumMeasurements = null;
if (!this.pd.isPrinting && this.widgets != null) for (var j = 0; j < this.widgets.length; j++) if (this.widgets[j] != null) this.widgets[j].isVisible = false;

for (var iSplit = 0; iSplit < this.nSplit; iSplit++) {
this.setPositionForFrame (iSplit);
this.drawAll (gMain, gFront, gBack, iSplit, isResized || this.nSplit > 1, taintedAll, pointsOnly);
}
this.setPositionForFrame (this.nSplit > 1 ? this.pd.currentSplitPoint : 0);
if (this.pd.isPrinting) return;
}, "~O,~O,~O,~N,~N,~N,~N,~N,~N,~B,~B,~B");
Clazz_defineMethod (c$, "escapeKeyPressed", 
function (isDEL) {
if (this.zoomBox1D != null) this.zoomBox1D.xPixel0 = this.zoomBox1D.xPixel1 = 0;
if (this.zoomBox2D != null) this.zoomBox2D.xPixel0 = this.zoomBox2D.xPixel1 = 0;
if (!this.inPlotMove) return;
if (this.pendingMeasurement != null) {
this.pendingMeasurement = null;
return;
}this.pd.thisWidget = null;
this.pendingMeasurement = null;
if (this.selectedSpectrumMeasurements != null && this.selectedMeasurement != null) {
if (isDEL) this.selectedSpectrumMeasurements.clear (this.getScale ().minXOnScale, this.getScale ().maxXOnScale);
 else this.selectedSpectrumMeasurements.removeObj (this.selectedMeasurement);
this.selectedMeasurement = null;
this.updateDialog (JSV.common.Annotation.AType.Measurements, -1);
}if (this.selectedSpectrumIntegrals != null && this.selectedIntegral != null) {
if (isDEL) this.selectedSpectrumIntegrals.clear (this.getScale ().minXOnScale, this.getScale ().maxXOnScale);
 else this.selectedSpectrumIntegrals.removeObj (this.selectedIntegral);
this.selectedIntegral = null;
this.updateDialog (JSV.common.Annotation.AType.Integration, -1);
}}, "~B");
c$.findGraphSet = Clazz_defineMethod (c$, "findGraphSet", 
function (graphSets, xPixel, yPixel) {
for (var i = graphSets.size (); --i >= 0; ) if (graphSets.get (i).hasPoint (xPixel, yPixel)) return graphSets.get (i);

return null;
}, "JU.Lst,~N,~N");
Clazz_defineMethod (c$, "findMatchingPeakInfo", 
function (pi) {
var pi2 = null;
for (var i = 0; i < this.spectra.size (); i++) if ((pi2 = (this.spectra.get (i)).findMatchingPeakInfo (pi)) != null) break;

return pi2;
}, "JSV.common.PeakInfo");
Clazz_defineMethod (c$, "getCurrentSpectrumIndex", 
function () {
return (this.nSpectra == 1 ? 0 : this.iSpectrumSelected);
});
Clazz_defineMethod (c$, "getSelectedIntegral", 
function () {
return this.selectedIntegral;
});
Clazz_defineMethod (c$, "getShowAnnotation", 
function (type, i) {
var id = this.getDialog (type, i);
return (id != null && id.getState ());
}, "JSV.common.Annotation.AType,~N");
Clazz_defineMethod (c$, "hasFileLoaded", 
function (filePath) {
for (var i = this.spectra.size (); --i >= 0; ) if (this.spectra.get (i).getFilePathForwardSlash ().equals (filePath)) return true;

return false;
}, "~S");
Clazz_defineMethod (c$, "haveSelectedSpectrum", 
function () {
return this.$haveSelectedSpectrum;
});
Clazz_defineMethod (c$, "mouseClickedEvent", 
function (xPixel, yPixel, clickCount, isControlDown) {
this.selectedMeasurement = null;
this.selectedIntegral = null;
var isNextClick = this.nextClickForSetPeak;
this.nextClickForSetPeak = null;
if (this.checkArrowUpDownClick (xPixel, yPixel) || this.checkArrowLeftRightClick (xPixel, yPixel)) return;
this.lastClickX = NaN;
this.lastPixelX = 2147483647;
if (this.isSplitWidget (xPixel, yPixel)) {
this.splitStack (this.nSplit == 1);
return;
}if (this.isCloserWidget (xPixel, yPixel)) {
this.pd.closeSpectrum ();
return;
}var pw = this.getPinSelected (xPixel, yPixel);
if (pw != null) {
this.setWidgetValueByUser (pw);
return;
}var is2D = this.is2dClick (xPixel, yPixel);
if (clickCount == 2 && this.iSpectrumClicked == -1 && this.iPreviousSpectrumClicked >= 0) {
this.setSpectrumClicked (this.iPreviousSpectrumClicked);
}if (!is2D && isControlDown) {
this.setSpectrumClicked (this.iPreviousSpectrumClicked);
if (this.pendingMeasurement != null) {
this.processPendingMeasurement (xPixel, yPixel, -3);
} else if (this.iSpectrumClicked >= 0) {
this.processPendingMeasurement (xPixel, yPixel, 3);
}return;
}this.lastXMax = NaN;
if (clickCount == 2) {
if (is2D) {
if (this.sticky2Dcursor) {
this.addAnnotation (this.getAnnotation (this.imageView.toX (xPixel), this.imageView.toSubspectrumIndex (yPixel), this.pd.coordStr, false, true, 5, 5), true);
}this.sticky2Dcursor = true;
this.set2DCrossHairs (xPixel, yPixel);
return;
}if (this.isInTopBar (xPixel, yPixel)) {
this.doZoom (this.toX0 (this.xPixel0), 0, this.toX0 (this.xPixel1), 0, true, false, false, true, true);
} else if (this.isInRightBar (xPixel, yPixel)) {
this.doZoom (this.getScale ().minXOnScale, this.viewList.get (0).getScale ().minYOnScale, this.getScale ().maxXOnScale, this.viewList.get (0).getScale ().maxYOnScale, true, true, false, false, false);
} else if (this.isInTopBar2D (xPixel, yPixel)) {
this.reset2D (true);
} else if (this.isInRightBar2D (xPixel, yPixel)) {
this.reset2D (false);
} else if (this.pendingMeasurement != null) {
this.processPendingMeasurement (xPixel, yPixel, -2);
} else if (this.iSpectrumClicked >= 0) {
this.processPendingMeasurement (xPixel, yPixel, 2);
}return;
}if (is2D) {
if (this.annotations != null) {
var xy =  new JSV.common.Coordinate ().set (this.imageView.toX (xPixel), this.imageView.toSubspectrumIndex (yPixel));
var a = this.findAnnotation2D (xy);
if (a != null && this.setAnnotationText (a)) {
return;
}}if (clickCount == 1) this.sticky2Dcursor = false;
this.set2DCrossHairs (xPixel, yPixel);
return;
}if (this.isInPlotRegion (xPixel, yPixel)) {
if (this.selectedSpectrumIntegrals != null && this.checkIntegralNormalizationClick (xPixel, yPixel)) return;
if (this.pendingMeasurement != null) {
this.processPendingMeasurement (xPixel, yPixel, 1);
return;
}this.setCoordClicked (xPixel, this.toX (xPixel), this.toY (yPixel));
this.updateDialog (JSV.common.Annotation.AType.PeakList, -1);
if (isNextClick != null) {
this.nextClickForSetPeak = isNextClick;
this.shiftSpectrum (4, NaN, NaN);
this.nextClickForSetPeak = null;
return;
}} else {
this.setCoordClicked (0, NaN, 0);
}this.pd.notifyPeakPickedListeners (null);
}, "~N,~N,~N,~B");
Clazz_defineMethod (c$, "is2dClick", 
 function (xPixel, yPixel) {
return (this.imageView != null && xPixel == this.imageView.fixX (xPixel) && yPixel == this.fixY (yPixel));
}, "~N,~N");
Clazz_defineMethod (c$, "updateDialog", 
 function (type, iSpec) {
var ad = this.getDialog (type, iSpec);
if (ad == null || !this.isVisible (ad)) return;
var xRange = this.toX (this.xPixel1) - this.toX (this.xPixel0);
var yOffset = (this.getSpectrum ().isInverted () ? this.yPixel1 - this.pd.mouseY : this.pd.mouseY - this.yPixel0);
(ad).update (this.pd.coordClicked, xRange, yOffset);
}, "JSV.common.Annotation.AType,~N");
Clazz_defineMethod (c$, "isVisible", 
 function (ad) {
return ad != null && (ad.isDialog () && ad.isVisible ());
}, "JSV.api.AnnotationData");
Clazz_defineMethod (c$, "mousePressedEvent", 
function (xPixel, yPixel, clickCount) {
this.checkWidgetEvent (xPixel, yPixel, true);
}, "~N,~N,~N");
Clazz_defineMethod (c$, "mouseReleasedEvent", 
function (xPixel, yPixel) {
if (this.pendingMeasurement != null) {
if (Math.abs (this.toPixelX (this.pendingMeasurement.getXVal ()) - xPixel) < 2) this.pendingMeasurement = null;
this.processPendingMeasurement (xPixel, yPixel, -2);
this.setToolTipForPixels (xPixel, yPixel);
return;
}if (this.pd.integralShiftMode != 0) {
this.pd.integralShiftMode = 0;
this.zoomBox1D.xPixel1 = this.zoomBox1D.xPixel0;
return;
}if (this.iSpectrumMovedTo >= 0) this.setScale (this.iSpectrumMovedTo);
var thisWidget = this.pd.thisWidget;
if (this.pd.isIntegralDrag) {
if (JSV.common.GraphSet.isGoodEvent (this.zoomBox1D, null, true)) {
this.checkIntegral (this.toX (this.zoomBox1D.xPixel0), this.toX (this.zoomBox1D.xPixel1), true);
}this.zoomBox1D.xPixel1 = this.zoomBox1D.xPixel0 = 0;
this.pendingIntegral = null;
this.pd.isIntegralDrag = false;
} else if (thisWidget === this.zoomBox2D) {
if (!JSV.common.GraphSet.isGoodEvent (this.zoomBox2D, null, true)) return;
this.imageView.setZoom (this.zoomBox2D.xPixel0, this.zoomBox2D.yPixel0, this.zoomBox2D.xPixel1, this.zoomBox2D.yPixel1);
this.zoomBox2D.xPixel1 = this.zoomBox2D.xPixel0;
this.doZoom (this.imageView.toX (this.imageView.xPixel0), this.getScale ().minY, this.imageView.toX (this.imageView.xPixel0 + this.imageView.xPixels - 1), this.getScale ().maxY, false, false, false, true, true);
} else if (thisWidget === this.zoomBox1D) {
if (!JSV.common.GraphSet.isGoodEvent (this.zoomBox1D, null, true)) return;
var x1 = this.zoomBox1D.xPixel1;
var doY = (this.pd.shiftPressed);
this.doZoom (this.toX (this.zoomBox1D.xPixel0), (doY ? this.toY (this.zoomBox1D.yPixel0) : 0), this.toX (x1), (doY ? this.toY (this.zoomBox1D.yPixel1) : 0), true, doY, true, true, true);
this.zoomBox1D.xPixel1 = this.zoomBox1D.xPixel0;
} else if (thisWidget === this.pin1Dx0 || thisWidget === this.pin1Dx1 || thisWidget === this.cur2Dx0 || thisWidget === this.cur2Dx1) {
this.addCurrentZoom ();
}}, "~N,~N");
Clazz_defineMethod (c$, "mouseMovedEvent", 
function (xPixel, yPixel) {
if (this.nSpectra > 1) {
var iFrame = this.getSplitPoint (yPixel);
this.setPositionForFrame (iFrame);
this.setSpectrumMovedTo (this.nSplit > 1 ? iFrame : this.iSpectrumSelected);
if (this.iSpectrumMovedTo >= 0) this.setScale (this.iSpectrumMovedTo);
}this.inPlotMove = this.isInPlotRegion (xPixel, yPixel);
this.setXPixelMovedTo (1.7976931348623157E308, 1.7976931348623157E308, (this.inPlotMove ? xPixel : -1), -1);
if (this.inPlotMove) {
this.xValueMovedTo = this.toX (this.xPixelMovedTo);
this.yValueMovedTo = this.getSpectrum ().getYValueAt (this.xValueMovedTo);
}if (this.pd.integralShiftMode != 0) {
var ad = this.getDialog (JSV.common.Annotation.AType.Integration, -1);
var xy = (ad.getData ()).getXYCoords ();
var y = xy[this.pd.integralShiftMode > 0 ? xy.length - 1 : 0].getYVal ();
(ad.getData ()).shiftY (this.pd.integralShiftMode, this.toPixelYint (y) + yPixel - (this.pd.integralShiftMode > 0 ? this.yPixelPlot1 : this.yPixelPlot0), this.yPixel0, this.yPixels);
} else if (this.pd.isIntegralDrag) {
} else if (this.pendingMeasurement != null) {
this.processPendingMeasurement (xPixel, yPixel, 0);
this.setToolTipForPixels (xPixel, yPixel);
} else {
this.selectedMeasurement = (this.inPlotMove && this.selectedSpectrumMeasurements != null ? this.findMeasurement (this.selectedSpectrumMeasurements, xPixel, yPixel, 0) : null);
this.selectedIntegral = null;
if (this.inPlotMove && this.selectedSpectrumIntegrals != null && this.selectedMeasurement == null) {
this.selectedIntegral = this.findMeasurement (this.selectedSpectrumIntegrals, xPixel, yPixel, 0);
if (this.selectedIntegral == null) this.selectedIntegral = this.findMeasurement (this.selectedSpectrumIntegrals, xPixel, yPixel, -5);
}this.setToolTipForPixels (xPixel, yPixel);
if (this.imageView == null) {
this.piMouseOver = null;
var iSpec = (this.nSplit > 1 ? this.iSpectrumMovedTo : this.iSpectrumClicked);
if (!this.isDrawNoSpectra () && iSpec >= 0) {
var spec = this.spectra.get (iSpec);
if (spec.getPeakList () != null) {
this.coordTemp.setXVal (this.toX (xPixel));
this.coordTemp.setYVal (this.toY (yPixel));
this.piMouseOver = spec.findPeakByCoord (xPixel, this.coordTemp);
}}} else {
if (!this.pd.display1D && this.sticky2Dcursor) {
this.set2DCrossHairs (xPixel, yPixel);
}}}}, "~N,~N");
Clazz_defineMethod (c$, "nextView", 
function () {
if (this.currentZoomIndex + 1 < this.viewList.size ()) this.setZoomTo (this.currentZoomIndex + 1);
});
Clazz_defineMethod (c$, "previousView", 
function () {
if (this.currentZoomIndex > 0) this.setZoomTo (this.currentZoomIndex - 1);
});
Clazz_defineMethod (c$, "resetView", 
function () {
this.setZoomTo (0);
});
Clazz_defineMethod (c$, "removeAllHighlights", 
function () {
this.removeAllHighlights (null);
});
Clazz_defineMethod (c$, "removeHighlight", 
function (index) {
this.highlights.removeItemAt (index);
}, "~N");
Clazz_defineMethod (c$, "removeHighlight", 
function (x1, x2) {
for (var i = this.highlights.size (); --i >= 0; ) {
var h = this.highlights.get (i);
if (h.x1 == x1 && h.x2 == x2) this.highlights.removeItemAt (i);
}
}, "~N,~N");
Clazz_defineMethod (c$, "scaleYBy", 
function (factor) {
if (this.imageView == null && !this.zoomEnabled) return;
this.viewData.scaleSpectrum (this.imageView == null ? this.iSpectrumSelected : -2, factor);
if (this.imageView != null) {
this.update2dImage (false);
this.resetPinsFromView ();
}this.pd.refresh ();
}, "~N");
Clazz_defineMethod (c$, "selectSpectrum", 
function (filePath, type, model) {
var haveFound = false;
for (var i = this.spectra.size (); --i >= 0; ) if ((filePath == null || this.getSpectrumAt (i).getFilePathForwardSlash ().equals (filePath)) && (this.getSpectrumAt (i).matchesPeakTypeModel (type, model))) {
this.setSpectrumSelected (i);
if (this.nSplit > 1) this.splitStack (true);
haveFound = true;
}
if (this.nSpectra > 1 && !haveFound && this.iSpectrumSelected >= 0 && !this.pd.isCurrentGraphSet (this)) this.setSpectrumSelected (-2147483648);
return haveFound;
}, "~S,~S,~S");
Clazz_defineMethod (c$, "selectPeakByFileIndex", 
function (filePath, index, atomKey) {
var pi;
for (var i = this.spectra.size (); --i >= 0; ) if ((pi = this.getSpectrumAt (i).selectPeakByFileIndex (filePath, index, atomKey)) != null) return pi;

return null;
}, "~S,~S,~S");
Clazz_defineMethod (c$, "setSelected", 
function (i) {
if (i < 0) {
this.bsSelected.clearAll ();
this.setSpectrumClicked (-1);
return;
}this.bsSelected.set (i);
this.setSpectrumClicked ((this.bsSelected.cardinality () == 1 ? i : -1));
if (this.nSplit > 1 && i >= 0) this.pd.currentSplitPoint = i;
}, "~N");
Clazz_defineMethod (c$, "setSelectedIntegral", 
function (val) {
var spec = this.selectedIntegral.getSpectrum ();
this.getIntegrationGraph (this.getSpectrumIndex (spec)).setSelectedIntegral (this.selectedIntegral, val);
}, "~N");
Clazz_defineMethod (c$, "setShowAnnotation", 
function (type, tfToggle) {
var id = this.getDialog (type, -1);
if (id == null) {
if (tfToggle != null && tfToggle !== Boolean.TRUE) return;
if (type === JSV.common.Annotation.AType.PeakList || type === JSV.common.Annotation.AType.Integration || type === JSV.common.Annotation.AType.Measurements) this.pd.showDialog (type);
return;
}if (tfToggle == null) {
if (id.isDialog ()) (id).setVisible (!(id).isVisible ());
 else this.pd.showDialog (type);
return;
}var isON = tfToggle.booleanValue ();
if (isON) id.setState (isON);
if (isON || id.isDialog ()) this.pd.showDialog (type);
if (!isON && id.isDialog ()) (id).setVisible (false);
}, "JSV.common.Annotation.AType,Boolean");
Clazz_defineMethod (c$, "checkIntegralParams", 
function (parameters, value) {
var spec = this.getSpectrum ();
if (!spec.canIntegrate () || this.reversePlot) return false;
var iSpec = this.getFixedSelectedSpectrumIndex ();
var ad = this.getDialog (JSV.common.Annotation.AType.Integration, -1);
if (value == null) return true;
switch (JSV.common.IntegralData.IntMode.getMode (value.toUpperCase ())) {
case JSV.common.IntegralData.IntMode.NA:
return false;
case JSV.common.IntegralData.IntMode.CLEAR:
this.integrate (iSpec, null);
this.integrate (iSpec, parameters);
break;
case JSV.common.IntegralData.IntMode.ON:
if (ad == null) this.integrate (iSpec, parameters);
 else ad.setState (true);
break;
case JSV.common.IntegralData.IntMode.OFF:
if (ad != null) ad.setState (false);
break;
case JSV.common.IntegralData.IntMode.TOGGLE:
if (ad == null) this.integrate (iSpec, parameters);
 else ad.setState (!ad.getState ());
break;
case JSV.common.IntegralData.IntMode.AUTO:
if (ad == null) {
this.checkIntegralParams (parameters, "ON");
ad = this.getDialog (JSV.common.Annotation.AType.Integration, -1);
}if (ad != null) (ad.getData ()).autoIntegrate ();
break;
case JSV.common.IntegralData.IntMode.LIST:
this.pd.showDialog (JSV.common.Annotation.AType.Integration);
break;
case JSV.common.IntegralData.IntMode.MARK:
if (ad == null) {
this.checkIntegralParams (parameters, "ON");
ad = this.getDialog (JSV.common.Annotation.AType.Integration, -1);
}if (ad != null) (ad.getData ()).addMarks (value.substring (4).trim ());
break;
case JSV.common.IntegralData.IntMode.MIN:
if (ad != null) {
try {
var val = Double.parseDouble (JSV.common.ScriptToken.getTokens (value).get (1));
(ad.getData ()).setMinimumIntegral (val);
} catch (e) {
if (Clazz_exceptionOf (e, Exception)) {
} else {
throw e;
}
}
}break;
case JSV.common.IntegralData.IntMode.UPDATE:
if (ad != null) (ad.getData ()).update (parameters);
}
this.updateDialog (JSV.common.Annotation.AType.Integration, -1);
return true;
}, "JSV.common.Parameters,~S");
Clazz_defineMethod (c$, "setSpectrum", 
function (iSpec, fromSplit) {
if (fromSplit && this.nSplit > 1) {
if (this.nSplit > 1) this.setSpectrumClicked (iSpec);
} else {
this.setSpectrumClicked (iSpec);
this.stackSelected = false;
this.showAllStacked = false;
}if (iSpec >= 0) this.dialogsToFront (this.getSpectrum ());
}, "~N,~B");
Clazz_defineMethod (c$, "setSpectrumJDX", 
function (spec) {
var pt = this.getFixedSelectedSpectrumIndex ();
this.spectra.removeItemAt (pt);
this.spectra.add (pt, spec);
this.pendingMeasurement = null;
this.clearViews ();
this.viewData.newSpectrum (this.spectra);
}, "JSV.common.Spectrum");
Clazz_defineMethod (c$, "setZoom", 
function (x1, y1, x2, y2) {
this.setZoomTo (0);
if (x1 == 0 && x2 == 0 && y1 == 0 && y2 == 0) {
this.newPins ();
this.imageView = null;
x1 = this.getScale ().minXOnScale;
x2 = this.getScale ().maxXOnScale;
} else {
this.doZoom (x1, y1, x2, y2, true, (y1 != y2), false, true, true);
}}, "~N,~N,~N,~N");
Clazz_defineMethod (c$, "shiftSpectrum", 
function (mode, xOld, xNew) {
var spec = this.getSpectrum ();
if (!spec.isNMR () || !spec.is1D ()) return false;
var ok = null;
var dx = 0;
if (xNew == 1.7976931348623157E308) {
dx = -spec.addSpecShift (0);
} else {
switch (mode) {
case 3:
dx = xNew;
break;
case 1:
case 2:
this.nextClickMode = mode;
if (Double.isNaN (xOld)) {
ok = this.pd.getInput ("Click on " + (mode == 1 ? "or beside a peak to set its chemical shift" : "the spectrum set the chemical shift at that point") + (xNew == -2147483648 ? "" : " to " + xNew) + ".", "Set Reference " + (mode == 1 ? "for Peak" : "at Point"), "OK");
this.nextClickForSetPeak = ("OK".equals (ok) ? Double.$valueOf (xNew) : null);
return false;
}this.nextClickForSetPeak = null;
case 4:
if (this.nextClickForSetPeak != null) {
xNew = this.nextClickForSetPeak.doubleValue ();
this.nextClickForSetPeak = null;
}if (Double.isNaN (xOld)) xOld = this.lastClickX;
if (this.nextClickMode == 1) xOld = this.getNearestPeak (spec, xOld, this.toY (this.pd.mouseY));
if (Double.isNaN (xNew)) try {
var s = this.pd.getInput ("New chemical shift (set blank to reset)", "Set Reference", JU.DF.formatDecimalDbl (xOld, this.getScale ().precision[0])).trim ();
if (s.length == 0) xNew = xOld - spec.addSpecShift (0);
 else xNew = Double.parseDouble (s);
} catch (e) {
if (Clazz_exceptionOf (e, Exception)) {
return false;
} else {
throw e;
}
}
dx = xNew - xOld;
break;
}
}if (dx == 0) return false;
spec.addSpecShift (dx);
if (this.annotations != null) for (var i = this.annotations.size (); --i >= 0; ) if (this.annotations.get (i).spec === spec) this.annotations.get (i).addSpecShift (dx);

if (this.dialogs != null) for (var e, $e = this.dialogs.entrySet ().iterator (); $e.hasNext () && ((e = $e.next ()) || true);) if (e.getValue ().getSpectrum () === spec) e.getValue ().setSpecShift (dx);

this.getScale ().addSpecShift (dx);
if (!Double.isNaN (this.lastClickX)) this.lastClickX += dx;
this.updateDialogs ();
this.doZoom (0, this.getScale ().minYOnScale, 0, this.getScale ().maxYOnScale, true, true, false, true, false);
this.pd.setTaintedAll ();
this.pd.repaint ();
return true;
}, "~N,~N,~N");
Clazz_defineMethod (c$, "toPeak", 
function (istep) {
istep *= (this.drawXAxisLeftToRight ? 1 : -1);
if (Double.isNaN (this.lastClickX)) this.lastClickX = this.lastPixelX = 0;
var spec = this.getSpectrum ();
var coord = this.setCoordClicked (this.lastPixelX, this.lastClickX, 0);
var iPeak = spec.setNextPeak (coord, istep);
if (iPeak < 0) return;
var peak = spec.getPeakList ().get (iPeak);
spec.setSelectedPeak (peak);
this.setCoordClicked (peak.getXPixel (), peak.getX (), 0);
this.pd.notifyPeakPickedListeners ( new JSV.common.PeakPickEvent (this.jsvp, this.pd.coordClicked, peak));
}, "~N");
Clazz_defineMethod (c$, "scaleSelectedBy", 
function (f) {
for (var i = this.bsSelected.nextSetBit (0); i >= 0; i = this.bsSelected.nextSetBit (i + 1)) this.viewData.scaleSpectrum (i, f);

}, "~N");
Clazz_overrideMethod (c$, "toString", 
function () {
return "gs: " + this.nSpectra + " " + this.spectra + " " + this.spectra.get (0).getFilePath ();
});
Clazz_defineMethod (c$, "setXPointer", 
function (spec, x) {
if (spec != null) this.setSpectrumClicked (this.getSpectrumIndex (spec));
this.xValueMovedTo = this.lastClickX = x;
this.lastPixelX = this.toPixelX (x);
this.setXPixelMovedTo (x, 1.7976931348623157E308, 0, 0);
this.yValueMovedTo = NaN;
}, "JSV.common.Spectrum,~N");
Clazz_defineMethod (c$, "setXPointer2", 
function (spec, x) {
if (spec != null) this.setSpectrumClicked (this.getSpectrumIndex (spec));
this.setXPixelMovedTo (1.7976931348623157E308, x, 0, 0);
}, "JSV.common.Spectrum,~N");
Clazz_defineMethod (c$, "hasCurrentMeasurement", 
function (type) {
return ((type === JSV.common.Annotation.AType.Integration ? this.selectedSpectrumIntegrals : this.selectedSpectrumMeasurements) != null);
}, "JSV.common.Annotation.AType");
Clazz_defineMethod (c$, "getDialog", 
function (type, iSpec) {
if (iSpec == -1) iSpec = this.getCurrentSpectrumIndex ();
return (this.dialogs == null || iSpec < 0 ? null : this.dialogs.get (type + "_" + iSpec));
}, "JSV.common.Annotation.AType,~N");
Clazz_defineMethod (c$, "removeDialog", 
function (iSpec, type) {
if (this.dialogs != null && iSpec >= 0) this.dialogs.remove (type + "_" + iSpec);
}, "~N,JSV.common.Annotation.AType");
Clazz_defineMethod (c$, "addDialog", 
function (iSpec, type, dialog) {
if (this.dialogs == null) this.dialogs =  new java.util.Hashtable ();
var key = type + "_" + iSpec;
dialog.setGraphSetKey (key);
this.dialogs.put (key, dialog);
return dialog;
}, "~N,JSV.common.Annotation.AType,JSV.api.AnnotationData");
Clazz_defineMethod (c$, "removeDialog", 
function (dialog) {
var key = dialog.getGraphSetKey ();
this.dialogs.remove (key);
var data = dialog.getData ();
if (data != null) this.dialogs.put (key, data);
}, "JSV.dialog.JSVDialog");
Clazz_defineMethod (c$, "getPeakListing", 
function (iSpec, p, forceNew) {
if (iSpec < 0) iSpec = this.getCurrentSpectrumIndex ();
if (iSpec < 0) return null;
var dialog = this.getDialog (JSV.common.Annotation.AType.PeakList, -1);
if (dialog == null) {
if (!forceNew) return null;
this.addDialog (iSpec, JSV.common.Annotation.AType.PeakList, dialog =  new JSV.common.PeakData (JSV.common.Annotation.AType.PeakList, this.getSpectrum ()));
}(dialog.getData ()).setPeakList (p, -2147483648, this.viewData.getScale ());
if (dialog.isDialog ()) (dialog).setFields ();
return dialog.getData ();
}, "~N,JSV.common.Parameters,~B");
Clazz_defineMethod (c$, "setPeakListing", 
function (tfToggle) {
var dialog = this.getDialog (JSV.common.Annotation.AType.PeakList, -1);
var ad = (dialog != null && dialog.isDialog () ? dialog : null);
var isON = (tfToggle == null ? ad == null || !ad.isVisible () : tfToggle.booleanValue ());
if (isON) {
this.pd.showDialog (JSV.common.Annotation.AType.PeakList);
} else {
if (dialog.isDialog ()) (dialog).setVisible (false);
}}, "Boolean");
Clazz_defineMethod (c$, "haveIntegralDisplayed", 
function (i) {
var ad = this.getDialog (JSV.common.Annotation.AType.Integration, i);
return (ad != null && ad.getState ());
}, "~N");
Clazz_defineMethod (c$, "getIntegrationGraph", 
function (i) {
var ad = this.getDialog (JSV.common.Annotation.AType.Integration, i);
return (ad == null ? null : ad.getData ());
}, "~N");
Clazz_defineMethod (c$, "setIntegrationRatios", 
function (value) {
var iSpec = this.getFixedSelectedSpectrumIndex ();
if (this.aIntegrationRatios == null) this.aIntegrationRatios =  new Array (this.nSpectra);
this.aIntegrationRatios[iSpec] = JSV.common.IntegralData.getIntegrationRatiosFromString (this.getSpectrum (), value);
}, "~S");
Clazz_defineMethod (c$, "getIntegrationRatios", 
function (i) {
return (this.aIntegrationRatios == null ? null : this.aIntegrationRatios[i]);
}, "~N");
Clazz_defineMethod (c$, "integrate", 
function (iSpec, parameters) {
var spec = this.getSpectrumAt (iSpec);
if (parameters == null || !spec.canIntegrate ()) {
this.removeDialog (iSpec, JSV.common.Annotation.AType.Integration);
return false;
}this.addDialog (iSpec, JSV.common.Annotation.AType.Integration,  new JSV.common.IntegralData (spec, parameters));
return true;
}, "~N,JSV.common.Parameters");
Clazz_defineMethod (c$, "getIntegration", 
function (iSpec, p, forceNew) {
if (iSpec < 0) iSpec = this.getCurrentSpectrumIndex ();
if (iSpec < 0) return null;
var dialog = this.getDialog (JSV.common.Annotation.AType.Integration, -1);
if (dialog == null) {
if (!forceNew) return null;
dialog = this.addDialog (iSpec, JSV.common.Annotation.AType.Integration,  new JSV.common.IntegralData (this.getSpectrum (), p));
}return dialog.getData ();
}, "~N,JSV.common.Parameters,~B");
Clazz_defineMethod (c$, "getMeasurementInfo", 
function (type, iSpec) {
var md;
switch (type) {
case JSV.common.Annotation.AType.PeakList:
md = this.getPeakListing (iSpec, null, false);
break;
case JSV.common.Annotation.AType.Integration:
md = this.getIntegration (iSpec, null, false);
break;
default:
return null;
}
if (md == null) return null;
var info =  new java.util.Hashtable ();
md.getInfo (info);
return info;
}, "JSV.common.Annotation.AType,~N");
Clazz_defineMethod (c$, "getInfo", 
function (key, iSpec) {
var spectraInfo =  new java.util.Hashtable ();
if ("".equals (key)) {
spectraInfo.put ("KEYS", "viewInfo spectra");
} else if ("viewInfo".equalsIgnoreCase (key)) return this.getScale ().getInfo (spectraInfo);
var specInfo =  new JU.Lst ();
spectraInfo.put ("spectra", specInfo);
for (var i = 0; i < this.nSpectra; i++) {
if (iSpec >= 0 && i != iSpec) continue;
var spec = this.spectra.get (i);
var info = spec.getInfo (key);
if (iSpec >= 0 && key != null && (info.size () == 2 || key.equalsIgnoreCase ("id"))) {
if (info.size () == 2) info.remove ("id");
return info;
}JSV.common.Parameters.putInfo (key, info, "type", spec.getDataType ());
JSV.common.Parameters.putInfo (key, info, "titleLabel", spec.getTitleLabel ());
JSV.common.Parameters.putInfo (key, info, "filePath", spec.getFilePath ().$replace ('\\', '/'));
JSV.common.Parameters.putInfo (key, info, "PeakList", (JSV.common.Parameters.isMatch (key, "PeakList") ? this.getMeasurementInfo (JSV.common.Annotation.AType.PeakList, i) : null));
JSV.common.Parameters.putInfo (key, info, "Integration", (JSV.common.Parameters.isMatch (key, "Integration") ? this.getMeasurementInfo (JSV.common.Annotation.AType.Integration, i) : null));
if (iSpec >= 0) return info;
specInfo.addLast (info);
}
return spectraInfo;
}, "~S,~N");
Clazz_defineMethod (c$, "getTitle", 
function (forPrinting) {
return (this.nSpectra == 1 || this.iSpectrumSelected >= 0 && (!forPrinting || this.nSplit == 1) ? this.getSpectrum ().getTitle () : null);
}, "~B");
Clazz_defineMethod (c$, "getCurrentView", 
function () {
this.setScale (this.getFixedSelectedSpectrumIndex ());
return this.viewData.getScale ();
});
Clazz_defineMethod (c$, "set2DXY", 
function (x, y, isLocked) {
var p;
if (this.gs2dLinkedX != null) {
p = this.toPixelX (x);
if (p != this.fixX (p)) {
p = -2147483648;
x = 1.7976931348623157E308;
}this.cur1D2x1.setX (x, p);
}if (this.gs2dLinkedY != null) {
p = this.toPixelX (y);
if (p != this.fixX (p)) {
p = -2147483648;
y = 1.7976931348623157E308;
}this.cur1D2x2.setX (y, p);
}this.cur1D2Locked = isLocked;
}, "~N,~N,~B");
Clazz_defineMethod (c$, "dialogsToFront", 
function (spec) {
if (this.dialogs == null) return;
if (spec == null) spec = this.getSpectrum ();
for (var e, $e = this.dialogs.entrySet ().iterator (); $e.hasNext () && ((e = $e.next ()) || true);) {
var ad = e.getValue ();
if (this.isVisible (ad)) {
if (spec == null) (ad).setVisible (true);
 else (ad).setFocus (ad.getSpectrum () === spec);
}}
}, "JSV.common.Spectrum");
Clazz_defineMethod (c$, "setPlotColors", 
function (oColors) {
var colors = oColors;
if (colors.length > this.nSpectra) {
var tmpPlotColors =  new Array (this.nSpectra);
System.arraycopy (colors, 0, tmpPlotColors, 0, this.nSpectra);
colors = tmpPlotColors;
} else if (this.nSpectra > colors.length) {
var tmpPlotColors =  new Array (this.nSpectra);
var numAdditionColors = this.nSpectra - colors.length;
System.arraycopy (colors, 0, tmpPlotColors, 0, colors.length);
for (var i = 0, j = colors.length; i < numAdditionColors; i++, j++) tmpPlotColors[j] = this.generateRandomColor ();

colors = tmpPlotColors;
}this.plotColors = colors;
}, "~O");
Clazz_defineMethod (c$, "disposeImage", 
 function () {
{
if (this.image2D != null)
this.image2D.parentNode.removeChild(this.image2D);
}this.image2D = null;
this.jsvp = null;
this.pd = null;
this.highlights = null;
this.plotColors = null;
});
Clazz_defineMethod (c$, "generateRandomColor", 
 function () {
while (true) {
var red = Clazz_doubleToInt (Math.random () * 255);
var green = Clazz_doubleToInt (Math.random () * 255);
var blue = Clazz_doubleToInt (Math.random () * 255);
var randomColor = this.g2d.getColor3 (red, green, blue);
if (randomColor.getRGB () != 0) return randomColor;
}
});
Clazz_defineMethod (c$, "setPlotColor0", 
function (oColor) {
this.plotColors[0] = oColor;
}, "~O");
Clazz_defineMethod (c$, "getPlotColor", 
function (index) {
if (index >= this.plotColors.length) return null;
return this.plotColors[index];
}, "~N");
Clazz_defineMethod (c$, "setColorFromToken", 
 function (og, whatColor) {
if (whatColor != null) this.g2d.setGraphicsColor (og, whatColor === JSV.common.ScriptToken.PLOTCOLOR ? this.plotColors[0] : this.pd.getColor (whatColor));
}, "~O,JSV.common.ScriptToken");
Clazz_defineMethod (c$, "setPlotColor", 
 function (og, i) {
var c;
switch (i) {
case -3:
c = JSV.common.GraphSet.veryLightGrey;
break;
case -2:
c = this.pd.BLACK;
break;
case -1:
c = this.pd.getColor (JSV.common.ScriptToken.INTEGRALPLOTCOLOR);
break;
default:
c = this.plotColors[i];
break;
}
this.g2d.setGraphicsColor (og, c);
}, "~O,~N");
Clazz_defineMethod (c$, "draw2DImage", 
 function () {
if (this.imageView != null) this.g2d.drawGrayScaleImage (this.gMain, this.image2D, this.imageView.xPixel0, this.imageView.yPixel0, this.imageView.xPixel0 + this.imageView.xPixels - 1, this.imageView.yPixel0 + this.imageView.yPixels - 1, this.imageView.xView1, this.imageView.yView1, this.imageView.xView2, this.imageView.yView2);
});
Clazz_defineMethod (c$, "get2DImage", 
 function (spec0) {
this.imageView =  new JSV.common.ImageView ();
this.imageView.set (this.viewList.get (0).getScale ());
if (!this.update2dImage (true)) return false;
this.imageView.resetZoom ();
this.sticky2Dcursor = true;
return true;
}, "JSV.common.Spectrum");
Clazz_defineMethod (c$, "update2dImage", 
 function (isCreation) {
this.imageView.set (this.viewData.getScale ());
var spec = this.getSpectrumAt (0);
var buffer = this.imageView.get2dBuffer (spec, !isCreation);
if (buffer == null) {
this.image2D = null;
this.imageView = null;
return false;
}if (isCreation) {
buffer = this.imageView.adjustView (spec, this.viewData);
this.imageView.resetView ();
}this.image2D = this.g2d.newGrayScaleImage (this.gMain, this.image2D, this.imageView.imageWidth, this.imageView.imageHeight, buffer);
this.setImageWindow ();
return true;
}, "~B");
Clazz_defineMethod (c$, "getAnnotation", 
 function (x, y, text, isPixels, is2d, offsetX, offsetY) {
return  new JSV.common.ColoredAnnotation ().setCA (x, y, this.getSpectrum (), text, this.pd.BLACK, isPixels, is2d, offsetX, offsetY);
}, "~N,~N,~S,~B,~B,~N,~N");
Clazz_defineMethod (c$, "getAnnotation", 
 function (args, lastAnnotation) {
return JSV.common.Annotation.getColoredAnnotation (this.g2d, this.getSpectrum (), args, lastAnnotation);
}, "JU.Lst,JSV.common.Annotation");
Clazz_defineMethod (c$, "fillBox", 
 function (g, x0, y0, x1, y1, whatColor) {
this.setColorFromToken (g, whatColor);
this.g2d.fillRect (g, Math.min (x0, x1), Math.min (y0, y1), Math.abs (x0 - x1), Math.abs (y0 - y1));
}, "~O,~N,~N,~N,~N,JSV.common.ScriptToken");
Clazz_defineMethod (c$, "drawBox", 
 function (g, x0, y0, x1, y1, whatColor) {
this.setColorFromToken (g, whatColor);
this.g2d.drawRect (g, Math.min (x0, x1), Math.min (y0, y1), Math.abs (x0 - x1) - 1, Math.abs (y0 - y1) - 1);
}, "~O,~N,~N,~N,~N,JSV.common.ScriptToken");
Clazz_defineMethod (c$, "drawHandle", 
 function (g, x, y, size, outlineOnly) {
if (outlineOnly) this.g2d.drawRect (g, x - size, y - size, size * 2, size * 2);
 else this.g2d.fillRect (g, x - size, y - size, size * 2 + 1, size * 2 + 1);
}, "~O,~N,~N,~N,~B");
Clazz_defineMethod (c$, "setCurrentBoxColor", 
 function (g) {
this.g2d.setGraphicsColor (g, this.pd.BLACK);
}, "~O");
Clazz_defineMethod (c$, "fillArrow", 
 function (g, type, x, y, doFill) {
var f = 1;
switch (type) {
case 1:
case 3:
f = -1;
break;
}
var axPoints =  Clazz_newIntArray (-1, [x - 5, x - 5, x + 5, x + 5, x + 8, x, x - 8]);
var ayPoints =  Clazz_newIntArray (-1, [y + 5 * f, y - f, y - f, y + 5 * f, y + 5 * f, y + 10 * f, y + 5 * f]);
switch (type) {
case 1:
case 2:
if (doFill) this.g2d.fillPolygon (g, ayPoints, axPoints, 7);
 else this.g2d.drawPolygon (g, ayPoints, axPoints, 7);
break;
case 3:
case 4:
if (doFill) this.g2d.fillPolygon (g, axPoints, ayPoints, 7);
 else this.g2d.drawPolygon (g, axPoints, ayPoints, 7);
}
}, "~O,~N,~N,~N,~B");
Clazz_defineMethod (c$, "fillCircle", 
 function (g, x, y, doFill) {
if (doFill) this.g2d.fillCircle (g, x - 4, y - 4, 8);
 else this.g2d.drawCircle (g, x - 4, y - 4, 8);
}, "~O,~N,~N,~B");
Clazz_defineMethod (c$, "setAnnotationColor", 
function (g, note, whatColor) {
if (whatColor != null) {
this.setColorFromToken (g, whatColor);
return;
}var color = null;
if (Clazz_instanceOf (note, JSV.common.ColoredAnnotation)) color = (note).getColor ();
if (color == null) color = this.pd.BLACK;
this.g2d.setGraphicsColor (g, color);
}, "~O,JSV.common.Annotation,JSV.common.ScriptToken");
Clazz_defineMethod (c$, "setSolutionColor", 
function (vi, isNone, asFitted) {
for (var i = 0; i < this.nSpectra; i++) {
var spec = this.spectra.get (i);
var color = (isNone || !spec.canShowSolutionColor () ? -1 : vi.getColour (spec, asFitted));
spec.setFillColor (color == -1 ? null : this.pd.vwr.parameters.getColor1 (color));
}
}, "JSV.api.VisibleInterface,~B,~B");
Clazz_defineMethod (c$, "setIRMode", 
function (mode, type) {
for (var i = 0; i < this.nSpectra; i++) {
var spec = this.spectra.get (i);
if (!spec.dataType.equals (type)) continue;
var spec2 = JSV.common.Spectrum.taConvert (spec, mode);
if (spec2 !== spec) this.pd.setSpecForIRMode (spec2);
}
}, "JSV.common.Spectrum.IRMode,~S");
Clazz_defineMethod (c$, "getSpectrumCount", 
function () {
return 0;
});
Clazz_defineMethod (c$, "invertYAxis", 
function () {
this.viewList.get (0).init (null, 0, 0, this.getSpectrum ().invertYAxis ().isContinuous ());
this.resetViewCompletely ();
});
c$.$GraphSet$Highlight$ = function () {
Clazz_pu$h(self.c$);
c$ = Clazz_decorateAsClass (function () {
Clazz_prepareCallback (this, arguments);
this.x1 = 0;
this.x2 = 0;
this.color = null;
this.spectrum = null;
Clazz_instantialize (this, arguments);
}, JSV.common.GraphSet, "Highlight");
Clazz_overrideMethod (c$, "toString", 
function () {
return "highlight " + this.x1 + " " + this.x2 + " " + this.spectrum;
});
Clazz_makeConstructor (c$, 
function (a, b, c, d) {
this.x1 = a;
this.x2 = b;
this.color = d;
this.spectrum = c;
}, "~N,~N,JSV.common.Spectrum,javajs.api.GenericColor");
Clazz_overrideMethod (c$, "equals", 
function (a) {
if (!(Clazz_instanceOf (a, JSV.common.GraphSet.Highlight))) return false;
var b = a;
return ((b.x1 == this.x1) && (b.x2 == this.x2));
}, "~O");
c$ = Clazz_p0p ();
};
Clazz_defineStatics (c$,
"ARROW_RESET", -1,
"ARROW_HOME", 0,
"ARROW_LEFT", 1,
"ARROW_RIGHT", 2,
"ARROW_UP", 3,
"ARROW_DOWN", 4);
c$.RT2 = c$.prototype.RT2 = Math.sqrt (2.0);
Clazz_defineStatics (c$,
"veryLightGrey", null,
"minNumOfPointsForZoom", 3,
"MIN_DRAG_PIXELS", 5,
"ONLINE_CUTOFF", 2,
"SHIFT_PEAK", 1,
"SHIFT_SETX", 2,
"SHIFT_X", 3,
"SHIFT_CLICKED", 4);
});
Clazz_declarePackage ("JSV.common");
Clazz_load (["JSV.common.XYScaleConverter"], "JSV.common.ImageView", ["java.lang.Double", "JSV.common.Coordinate", "$.ScaleData"], function () {
c$ = Clazz_decorateAsClass (function () {
this.buf2d = null;
this.grayFactorLast = 0;
this.averageGray = 0;
this.xPixel0 = 0;
this.yPixel0 = 0;
this.xPixel1 = 0;
this.yPixel1 = 0;
this.imageWidth = 0;
this.imageHeight = 0;
this.xPixels = 0;
this.yPixels = 0;
this.xPixelZoom1 = 0;
this.yPixelZoom1 = 0;
this.xPixelZoom2 = 0;
this.yPixelZoom2 = 0;
this.xView1 = 0;
this.yView1 = 0;
this.xView2 = 0;
this.yView2 = 0;
this.minX = NaN;
this.maxX = 0;
this.minY = 0;
this.maxY = 0;
this.minZ = 0;
this.maxZ = 0;
this.scaleData = null;
Clazz_instantialize (this, arguments);
}, JSV.common, "ImageView", null, JSV.common.XYScaleConverter);
Clazz_defineMethod (c$, "set", 
function (view) {
if (Double.isNaN (this.minX)) {
this.minX = view.minX;
this.maxX = view.maxX;
}this.minZ = view.minY;
this.maxZ = view.maxY;
this.scaleData =  new JSV.common.ScaleData ();
}, "JSV.common.ScaleData");
Clazz_defineMethod (c$, "setZoom", 
function (xPixel1, yPixel1, xPixel2, yPixel2) {
this.xPixelZoom1 = Math.min (xPixel1, xPixel2);
this.yPixelZoom1 = Math.min (yPixel1, yPixel2);
this.xPixelZoom2 = Math.max (xPixel1, xPixel2);
this.yPixelZoom2 = Math.max (yPixel1, yPixel2);
this.setView ();
}, "~N,~N,~N,~N");
Clazz_defineMethod (c$, "setXY0", 
function (spec, xPixel, yPixel) {
this.xPixel0 = xPixel;
this.yPixel0 = yPixel;
this.xPixel1 = this.xPixel0 + this.xPixels - 1;
this.yPixel1 = this.yPixel0 + this.yPixels - 1;
this.setMinMaxY (spec);
}, "JSV.common.Spectrum,~N,~N");
Clazz_defineMethod (c$, "setPixelWidthHeight", 
function (xPixels, yPixels) {
this.xPixels = xPixels;
this.yPixels = yPixels;
}, "~N,~N");
Clazz_defineMethod (c$, "resetView", 
function () {
this.xView1 = 0;
this.yView1 = 0;
this.xView2 = this.imageWidth - 1;
this.yView2 = this.imageHeight - 1;
});
Clazz_defineMethod (c$, "setView", 
function () {
if (this.xPixelZoom1 == 0) this.resetZoom ();
var x1 = this.toImageX (this.xPixelZoom1);
var y1 = this.toImageY (this.yPixelZoom1);
var x2 = this.toImageX (this.xPixelZoom2);
var y2 = this.toImageY (this.yPixelZoom2);
this.xView1 = Math.min (x1, x2);
this.yView1 = Math.min (y1, y2);
this.xView2 = Math.max (x1, x2);
this.yView2 = Math.max (y1, y2);
this.setScaleData ();
this.resetZoom ();
});
Clazz_defineMethod (c$, "resetZoom", 
function () {
this.xPixelZoom1 = this.xPixel0;
this.yPixelZoom1 = this.yPixel0;
this.xPixelZoom2 = this.xPixel1;
this.yPixelZoom2 = this.yPixel1;
});
Clazz_defineMethod (c$, "toImageX", 
function (xPixel) {
return this.xView1 + Clazz_doubleToInt (Math.floor ((xPixel - this.xPixel0) / (this.xPixels - 1.0) * (this.xView2 - this.xView1)));
}, "~N");
Clazz_defineMethod (c$, "toImageY", 
function (yPixel) {
return this.yView1 + Clazz_doubleToInt (Math.floor ((yPixel - this.yPixel0) / (this.yPixels - 1.0) * (this.yView2 - this.yView1)));
}, "~N");
Clazz_defineMethod (c$, "toImageX0", 
function (xPixel) {
return JSV.common.Coordinate.intoRange (Clazz_doubleToInt ((1.0 * xPixel - this.xPixel0) / (this.xPixels - 1) * (this.imageWidth - 1)), 0, this.imageWidth - 1);
}, "~N");
Clazz_defineMethod (c$, "toImageY0", 
function (yPixel) {
return JSV.common.Coordinate.intoRange (Clazz_doubleToInt ((1.0 * yPixel - this.yPixel0) / (this.yPixels - 1) * (this.imageHeight - 1)), 0, this.imageHeight - 1);
}, "~N");
Clazz_defineMethod (c$, "isXWithinRange", 
function (xPixel) {
return (xPixel >= this.xPixel0 - 5 && xPixel < this.xPixel0 + this.xPixels + 5);
}, "~N");
Clazz_defineMethod (c$, "toSubspectrumIndex", 
function (yPixel) {
return JSV.common.Coordinate.intoRange (this.imageHeight - 1 - this.toImageY (yPixel), 0, this.imageHeight - 1);
}, "~N");
Clazz_defineMethod (c$, "toX0", 
function (xPixel) {
return this.maxX + (this.minX - this.maxX) * (this.fixX (xPixel) - this.xPixel0) / (this.xPixels - 1);
}, "~N");
Clazz_defineMethod (c$, "toPixelX0", 
function (x) {
return this.xPixel1 - Clazz_doubleToInt ((x - this.minX) / (this.maxX - this.minX) * (this.xPixels - 1));
}, "~N");
Clazz_defineMethod (c$, "toPixelY0", 
function (ysub) {
return this.yPixel1 - Clazz_doubleToInt (ysub / (this.imageHeight - 1) * (this.yPixels - 1));
}, "~N");
Clazz_defineMethod (c$, "subIndexToPixelY", 
function (subIndex) {
var f = 1.0 * (this.imageHeight - 1 - subIndex - this.yView1) / (this.yView2 - this.yView1);
var y = this.yPixel0 + Clazz_doubleToInt (f * (this.yPixels - 1));
return y;
}, "~N");
Clazz_defineMethod (c$, "fixSubIndex", 
function (subIndex) {
return JSV.common.Coordinate.intoRange (subIndex, this.imageHeight - 1 - this.yView2, this.imageHeight - 1 - this.yView1);
}, "~N");
Clazz_defineMethod (c$, "setView0", 
function (xp1, yp1, xp2, yp2) {
var x1 = this.toImageX0 (xp1);
var y1 = this.toImageY0 (yp1);
var x2 = this.toImageX0 (xp2);
var y2 = this.toImageY0 (yp2);
this.xView1 = Math.min (x1, x2);
this.yView1 = Math.min (y1, y2);
this.xView2 = Math.max (x1, x2);
this.yView2 = Math.max (y1, y2);
this.resetZoom ();
}, "~N,~N,~N,~N");
Clazz_defineMethod (c$, "get2dBuffer", 
function (spec, forceNew) {
var subSpectra = spec.getSubSpectra ();
if (subSpectra == null || !subSpectra.get (0).isContinuous ()) return null;
var xyCoords = spec.getXYCoords ();
var nSpec = subSpectra.size ();
this.imageWidth = xyCoords.length;
this.imageHeight = nSpec;
var grayFactor = 255 / (this.maxZ - this.minZ);
if (!forceNew && this.buf2d != null && grayFactor == this.grayFactorLast) return this.buf2d;
this.grayFactorLast = grayFactor;
var pt = this.imageWidth * this.imageHeight;
var buf = (this.buf2d == null || this.buf2d.length != pt ?  Clazz_newIntArray (pt, 0) : this.buf2d);
var totalGray = 0;
for (var i = 0; i < nSpec; i++) {
var points = subSpectra.get (i).xyCoords;
if (points.length != xyCoords.length) return null;
for (var j = 0; j < xyCoords.length; j++) {
var y = points[j].getYVal ();
var gray = 255 - JSV.common.Coordinate.intoRange (Clazz_doubleToInt ((y - this.minZ) * grayFactor), 0, 255);
buf[--pt] = gray;
totalGray += gray;
}
}
this.averageGray = (1 - totalGray / (this.imageWidth * this.imageHeight) / 255);
System.out.println ("Average gray = " + this.averageGray);
return (this.buf2d = buf);
}, "JSV.common.Spectrum,~B");
Clazz_defineMethod (c$, "adjustView", 
function (spec, view) {
var i = 0;
var isLow = false;
while (((isLow = (this.averageGray < 0.05)) || this.averageGray > 0.3) && i++ < 10) {
view.scaleSpectrum (-2, isLow ? 2 : 0.5);
this.set (view.getScale ());
this.get2dBuffer (spec, false);
}
return this.buf2d;
}, "JSV.common.Spectrum,JSV.common.ViewData");
Clazz_defineMethod (c$, "getBuffer", 
function () {
return this.buf2d;
});
Clazz_defineMethod (c$, "setMinMaxY", 
function (spec) {
var subSpectra = spec.getSubSpectra ();
var spec0 = subSpectra.get (0);
this.maxY = spec0.getY2D ();
this.minY = subSpectra.get (subSpectra.size () - 1).getY2D ();
if (spec0.y2DUnits.equalsIgnoreCase ("Hz")) {
this.maxY /= spec0.freq2dY;
this.minY /= spec0.freq2dY;
}this.setScaleData ();
}, "JSV.common.Spectrum");
Clazz_defineMethod (c$, "setScaleData", 
 function () {
this.scaleData.minY = this.minY;
this.scaleData.maxY = this.maxY;
this.scaleData.setYScale (this.toY (this.yPixel0), this.toY (this.yPixel1), false, false);
});
Clazz_overrideMethod (c$, "fixX", 
function (xPixel) {
return (xPixel < this.xPixel0 ? this.xPixel0 : xPixel > this.xPixel1 ? this.xPixel1 : xPixel);
}, "~N");
Clazz_overrideMethod (c$, "fixY", 
function (yPixel) {
return JSV.common.Coordinate.intoRange (yPixel, this.yPixel0, this.yPixel1);
}, "~N");
Clazz_overrideMethod (c$, "getScale", 
function () {
return this.scaleData;
});
Clazz_overrideMethod (c$, "toX", 
function (xPixel) {
return this.maxX + (this.minX - this.maxX) * this.toImageX (this.fixX (xPixel)) / (this.imageWidth - 1);
}, "~N");
Clazz_overrideMethod (c$, "toY", 
function (yPixel) {
var isub = this.toSubspectrumIndex (yPixel);
return this.maxY + (this.minY - this.maxY) * isub / (this.imageHeight - 1);
}, "~N");
Clazz_overrideMethod (c$, "toPixelX", 
function (x) {
var x0 = this.toX (this.xPixel0);
var x1 = this.toX (this.xPixel1);
return this.xPixel0 + Clazz_doubleToInt ((x - x0) / (x1 - x0) * (this.xPixels - 1));
}, "~N");
Clazz_overrideMethod (c$, "toPixelY", 
function (y) {
var f = (y - this.scaleData.minYOnScale) / (this.scaleData.maxYOnScale - this.scaleData.minYOnScale);
return Clazz_doubleToInt (this.yPixel0 + f * this.yPixels);
}, "~N");
Clazz_overrideMethod (c$, "getXPixels", 
function () {
return this.xPixels;
});
Clazz_overrideMethod (c$, "getYPixels", 
function () {
return this.yPixels;
});
Clazz_overrideMethod (c$, "getXPixel0", 
function () {
return this.xPixel0;
});
Clazz_defineStatics (c$,
"DEFAULT_MIN_GRAY", 0.05,
"DEFAULT_MAX_GRAY", 0.30);
});
Clazz_declarePackage ("JSV.common");
Clazz_load (["JSV.common.Measurement"], "JSV.common.Integral", null, function () {
c$ = Clazz_declareType (JSV.common, "Integral", JSV.common.Measurement);
Clazz_defineMethod (c$, "setInt", 
function (x1, y1, spec, value, x2, y2) {
this.setA (x1, y1, spec, "", false, false, 0, 6);
this.setPt2 (x2, y2);
this.setValue (value);
return this;
}, "~N,~N,JSV.common.Spectrum,~N,~N,~N");
});
Clazz_declarePackage ("JSV.common");
c$ = Clazz_declareType (JSV.common, "IntegralComparator", null, java.util.Comparator);
Clazz_overrideMethod (c$, "compare", 
function (m1, m2) {
return (m1.getXVal () < m2.getXVal () ? -1 : m1.getXVal () > m2.getXVal () ? 1 : 0);
}, "JSV.common.Measurement,JSV.common.Measurement");
Clazz_declarePackage ("JSV.common");
Clazz_load (["java.lang.Enum", "JSV.common.MeasurementData", "$.IntegralComparator"], "JSV.common.IntegralData", ["java.lang.Double", "java.util.Collections", "$.StringTokenizer", "JU.AU", "$.BS", "$.DF", "$.Lst", "$.PT", "JSV.common.Annotation", "$.Coordinate", "$.Integral", "$.ScriptToken"], function () {
c$ = Clazz_decorateAsClass (function () {
this.percentMinY = 0;
this.percentOffset = 0;
this.intRange = 0;
this.normalizationFactor = 1;
this.percentRange = 0;
this.offset = 0;
this.integralTotal = 0;
this.haveRegions = false;
this.xyCoords = null;
Clazz_instantialize (this, arguments);
}, JSV.common, "IntegralData", JSV.common.MeasurementData);
Clazz_defineMethod (c$, "getPercentMinimumY", 
function () {
return this.percentMinY;
});
Clazz_defineMethod (c$, "getPercentOffset", 
function () {
return this.percentOffset;
});
Clazz_defineMethod (c$, "getIntegralFactor", 
function () {
return this.intRange;
});
Clazz_makeConstructor (c$, 
function (integralMinY, integralOffset, integralRange, spec) {
Clazz_superConstructor (this, JSV.common.IntegralData, [JSV.common.Annotation.AType.Integration, spec]);
this.percentMinY = integralMinY;
this.percentOffset = integralOffset;
this.percentRange = integralRange;
this.calculateIntegral ();
}, "~N,~N,~N,JSV.common.Spectrum");
Clazz_makeConstructor (c$, 
function (spec, p) {
Clazz_superConstructor (this, JSV.common.IntegralData, [JSV.common.Annotation.AType.Integration, spec]);
if (p == null) {
this.autoIntegrate ();
return;
}this.percentOffset = p.integralOffset;
this.percentRange = p.integralRange;
this.calculateIntegral ();
}, "JSV.common.Spectrum,JSV.common.Parameters");
Clazz_defineMethod (c$, "update", 
function (parameters) {
this.update (parameters.integralMinY, parameters.integralOffset, parameters.integralRange);
}, "JSV.common.Parameters");
Clazz_defineMethod (c$, "update", 
function (integralMinY, integralOffset, integralRange) {
var percentRange0 = this.percentRange;
if (integralRange <= 0 || integralRange == this.percentRange && integralOffset == this.percentOffset) return;
this.percentOffset = integralOffset;
this.percentRange = integralRange;
this.checkRange ();
var intRangeNew = integralRange / 100 / this.integralTotal;
var offsetNew = integralOffset / 100;
for (var i = 0; i < this.xyCoords.length; i++) {
var y = this.xyCoords[i].getYVal ();
y = (y - this.offset) / this.intRange;
this.xyCoords[i].setYVal (y * intRangeNew + offsetNew);
}
if (this.normalizationFactor != 1) this.normalizationFactor *= percentRange0 / integralRange;
if (this.haveRegions) {
for (var i = this.size (); --i >= 0; ) {
var ir = this.get (i);
var y1 = this.getYValueAt (ir.getXVal ());
var y2 = this.getYValueAt (ir.getXVal2 ());
ir.setYVal (y1);
ir.setYVal2 (y2);
ir.setValue (Math.abs (y2 - y1) * 100 * this.normalizationFactor);
}
}this.intRange = intRangeNew;
this.offset = offsetNew;
}, "~N,~N,~N");
Clazz_defineMethod (c$, "getYValueAt", 
function (x) {
return JSV.common.Coordinate.getYValueAt (this.xyCoords, x);
}, "~N");
Clazz_defineMethod (c$, "addIntegralRegion", 
function (x1, x2) {
if (Double.isNaN (x1)) {
this.haveRegions = false;
this.clear ();
return null;
}if (Double.isNaN (x2)) {
return this.splitIntegral (x1);
}if (x1 == x2) return null;
if (x1 < x2) {
this.clear (x1, x2);
return null;
}var y1 = this.getYValueAt (x1);
var y2 = this.getYValueAt (x2);
this.haveRegions = true;
var $in =  new JSV.common.Integral ().setInt (x1, y1, this.spec, Math.abs (y2 - y1) * 100 * this.normalizationFactor, x2, y2);
this.clear (x1, x2);
this.addLast ($in);
java.util.Collections.sort (this, JSV.common.IntegralData.c);
return $in;
}, "~N,~N");
Clazz_defineMethod (c$, "splitIntegral", 
 function (x) {
var i = this.find (x);
if (i < 0) return null;
var integral = this.removeItemAt (i);
var x0 = integral.getXVal ();
var x2 = integral.getXVal2 ();
this.addIntegralRegion (x0, x);
return this.addIntegralRegion (x, x2);
}, "~N");
Clazz_overrideMethod (c$, "setSpecShift", 
function (dx) {
JSV.common.Coordinate.shiftX (this.xyCoords, dx);
for (var i = this.size (); --i >= 1; ) {
this.get (i).addSpecShift (dx);
}
}, "~N");
Clazz_defineMethod (c$, "addMarks", 
function (ppms) {
ppms = JU.PT.rep (" " + ppms, ",", " ");
ppms = JU.PT.rep (ppms, " -", " #");
ppms = JU.PT.rep (ppms, "--", "-#");
ppms = ppms.$replace ('-', '^');
ppms = ppms.$replace ('#', '-');
var tokens = JSV.common.ScriptToken.getTokens (ppms);
for (var i = 0; i < tokens.size (); i++) {
try {
var s = tokens.get (i);
var norm = 0;
var pt = s.indexOf ('^');
if (pt < 0) continue;
var pt2 = s.indexOf (':');
if (pt2 > pt) {
norm = Double.$valueOf (s.substring (pt2 + 1).trim ()).doubleValue ();
s = s.substring (0, pt2).trim ();
}var x2 = Double.$valueOf (s.substring (0, pt).trim ()).doubleValue ();
var x1 = Double.$valueOf (s.substring (pt + 1).trim ()).doubleValue ();
if (x1 == 0 && x2 == 0) this.clear ();
if (x1 == x2) continue;
var m = this.addIntegralRegion (Math.max (x1, x2), Math.min (x1, x2));
if (m != null && norm > 0) this.setSelectedIntegral (m, norm);
} catch (e) {
if (Clazz_exceptionOf (e, Exception)) {
continue;
} else {
throw e;
}
}
}
}, "~S");
Clazz_defineMethod (c$, "calculateIntegral", 
function () {
var specXyCoords = this.spec.getXYCoords ();
this.xyCoords =  new Array (specXyCoords.length);
this.integralTotal = 0;
this.checkRange ();
var minY = 1E100;
for (var i = 0; i < specXyCoords.length; i++) {
var y = specXyCoords[i].getYVal ();
if (y < minY && y >= 0) minY = y;
}
var minI = 1E100;
var maxI = -1.0E100;
for (var i = 0; i < specXyCoords.length; i++) {
var y = specXyCoords[i].getYVal ();
this.integralTotal += (y - minY);
if (this.integralTotal < minI) minI = this.integralTotal;
if (this.integralTotal > maxI) maxI = this.integralTotal;
}
this.integralTotal = maxI - minI;
this.intRange = (this.percentRange / 100) / this.integralTotal;
this.offset = (this.percentOffset / 100);
var integral = 0;
for (var i = specXyCoords.length; --i >= 0; ) {
var y = specXyCoords[i].getYVal ();
integral += (y - minY);
this.xyCoords[i] =  new JSV.common.Coordinate ().set (specXyCoords[i].getXVal (), integral * this.intRange + this.offset);
}
return this.xyCoords;
});
Clazz_defineMethod (c$, "checkRange", 
 function () {
this.percentOffset = Math.max (5, this.percentOffset);
this.percentRange = Math.max (10, this.percentRange);
});
c$.getIntegrationRatiosFromString = Clazz_defineMethod (c$, "getIntegrationRatiosFromString", 
function (spec, key_values) {
var ratios =  new JU.Lst ();
var allParamTokens =  new java.util.StringTokenizer (key_values, ",");
while (allParamTokens.hasMoreTokens ()) {
var token = allParamTokens.nextToken ();
var eachParam =  new java.util.StringTokenizer (token, ":");
var ratio =  new JSV.common.Annotation ().setA (Double.parseDouble (eachParam.nextToken ()), 0.0, spec, eachParam.nextToken (), true, false, 0, 0);
ratios.addLast (ratio);
}
return ratios;
}, "JSV.common.Spectrum,~S");
Clazz_defineMethod (c$, "getXYCoords", 
function () {
return this.xyCoords;
});
Clazz_defineMethod (c$, "getPercentYValueAt", 
function (x) {
return this.getYValueAt (x) * 100;
}, "~N");
Clazz_defineMethod (c$, "dispose", 
function () {
this.spec = null;
this.xyCoords = null;
});
Clazz_defineMethod (c$, "setSelectedIntegral", 
function (integral, val) {
var val0 = integral.getValue ();
var factor = (val <= 0 ? 1 / this.normalizationFactor : val / val0);
this.factorAllIntegrals (factor, val <= 0);
}, "JSV.common.Measurement,~N");
Clazz_defineMethod (c$, "factorAllIntegrals", 
 function (factor, isReset) {
for (var i = 0; i < this.size (); i++) {
var m = this.get (i);
m.setValue (factor * m.getValue ());
}
this.normalizationFactor = (isReset ? 1 : this.normalizationFactor * factor);
}, "~N,~B");
Clazz_defineMethod (c$, "remove", 
function (i) {
return this.removeItemAt (i);
}, "~N");
Clazz_defineMethod (c$, "getBitSet", 
function () {
var bs = JU.BS.newN (this.xyCoords.length);
if (this.size () == 0) {
bs.setBits (0, this.xyCoords.length);
return bs;
}for (var i = this.size (); --i >= 0; ) {
var m = this.get (i);
var x1 = JSV.common.Coordinate.getNearestIndexForX (this.xyCoords, m.getXVal ());
var x2 = JSV.common.Coordinate.getNearestIndexForX (this.xyCoords, m.getXVal2 ());
bs.setBits (Math.min (x1, x2), Math.max (x1, x2));
}
return bs;
});
Clazz_overrideMethod (c$, "getMeasurementListArray", 
function (units) {
var data =  new Array (this.size ());
for (var pt = 0, i = this.size (); --i >= 0; ) data[pt++] =  Clazz_newArray (-1, ["" + pt, JU.DF.formatDecimalDbl (this.get (i).getXVal (), 2), JU.DF.formatDecimalDbl (this.get (i).getXVal2 (), 2), this.get (i).text]);

return data;
}, "~S");
Clazz_overrideMethod (c$, "getMeasurementListArrayReal", 
function (units) {
var data = JU.AU.newDouble2 (this.size ());
for (var pt = 0, i = this.size (); --i >= 0; pt++) data[pt] =  Clazz_newDoubleArray (-1, [this.get (i).getXVal (), this.get (i).getXVal2 (), this.get (i).getValue ()]);

return data;
}, "~S");
Clazz_overrideMethod (c$, "getDataHeader", 
function () {
return JSV.common.IntegralData.$HEADER;
});
Clazz_defineMethod (c$, "shiftY", 
function (yOld, yNew, yPixel0, yPixels) {
var pt = Clazz_doubleToInt (100.0 * (yPixel0 + yPixels - yNew) / yPixels);
if (yOld < 0) pt -= this.percentOffset;
if (yOld < 0) {
this.update (0, this.percentOffset, pt);
} else {
this.update (0, pt, this.percentRange);
}}, "~N,~N,~N,~N");
Clazz_defineMethod (c$, "autoIntegrate", 
function () {
if (this.xyCoords == null) this.calculateIntegral ();
if (this.xyCoords.length == 0) return;
this.clear ();
var iStart = -1;
var cutoff = 0.0001;
var nCount = 0;
var nMin = 20;
var y0 = this.xyCoords[this.xyCoords.length - 1].getYVal ();
for (var i = this.xyCoords.length - 1; --i >= 0; ) {
var y = this.xyCoords[i].getYVal ();
nCount++;
if ((y - y0) < cutoff && iStart < 0) {
if (y < y0) {
y0 = y;
nCount = 0;
}continue;
}if (iStart < 0) {
iStart = i + Math.min (nCount, nMin);
y0 = y;
nCount = 0;
continue;
}if ((y - y0) < cutoff) {
if (nCount == 1) y0 = y;
if (nCount >= nMin) {
this.addIntegralRegion (this.xyCoords[iStart].getXVal (), this.xyCoords[i].getXVal ());
iStart = -1;
y0 = y;
nCount = 0;
}} else {
nCount = 0;
y0 = y;
}}
if (this.spec.nH > 0) this.factorAllIntegrals (this.spec.nH / this.percentRange, false);
});
Clazz_defineMethod (c$, "getInfo", 
function (info) {
info.put ("offset", Double.$valueOf (this.myParams.integralOffset));
info.put ("range", Double.$valueOf (this.myParams.integralRange));
info.put ("normalizationFactor", Double.$valueOf (this.normalizationFactor));
info.put ("integralTotal", Double.$valueOf (this.integralTotal));
Clazz_superCall (this, JSV.common.IntegralData, "getInfo", [info]);
}, "java.util.Map");
Clazz_defineMethod (c$, "setMinimumIntegral", 
function (val) {
for (var i = this.size (); --i >= 0; ) if (this.get (i).getValue () < val) this.removeItemAt (i);

}, "~N");
Clazz_pu$h(self.c$);
c$ = Clazz_declareType (JSV.common.IntegralData, "IntMode", Enum);
c$.getMode = Clazz_defineMethod (c$, "getMode", 
function (a) {
for (var mode, $mode = 0, $$mode = JSV.common.IntegralData.IntMode.values (); $mode < $$mode.length && ((mode = $$mode[$mode]) || true); $mode++) if (a.startsWith (mode.name ())) return mode;

return JSV.common.IntegralData.IntMode.NA;
}, "~S");
Clazz_defineEnumConstant (c$, "OFF", 0, []);
Clazz_defineEnumConstant (c$, "ON", 1, []);
Clazz_defineEnumConstant (c$, "TOGGLE", 2, []);
Clazz_defineEnumConstant (c$, "AUTO", 3, []);
Clazz_defineEnumConstant (c$, "LIST", 4, []);
Clazz_defineEnumConstant (c$, "MARK", 5, []);
Clazz_defineEnumConstant (c$, "MIN", 6, []);
Clazz_defineEnumConstant (c$, "UPDATE", 7, []);
Clazz_defineEnumConstant (c$, "CLEAR", 8, []);
Clazz_defineEnumConstant (c$, "NA", 9, []);
c$ = Clazz_p0p ();
Clazz_defineStatics (c$,
"DEFAULT_OFFSET", 30,
"DEFAULT_RANGE", 50,
"DEFAULT_MINY", 0.1);
c$.c = c$.prototype.c =  new JSV.common.IntegralComparator ();
c$.$HEADER = c$.prototype.$HEADER =  Clazz_newArray (-1, ["peak", "start/ppm", "end/ppm", "value"]);
});
Clazz_declarePackage ("JSV.common");
Clazz_load (["java.lang.Enum", "JSV.source.JDXDataObject", "JU.Lst"], "JSV.common.Spectrum", ["java.lang.Boolean", "$.Double", "java.util.Hashtable", "JU.PT", "JSV.common.Coordinate", "$.Parameters", "$.PeakInfo", "JSV.source.JDXSourceStreamTokenizer", "JU.Logger"], function () {
c$ = Clazz_decorateAsClass (function () {
this.subSpectra = null;
this.peakList = null;
this.piUnitsX = null;
this.piUnitsY = null;
this.selectedPeak = null;
this.highlightedPeak = null;
this.specShift = 0;
this.currentSubSpectrumIndex = 0;
this.$isForcedSubset = false;
this.id = "";
this.convertedSpectrum = null;
this.userYFactor = 1;
this.exportXAxisLeftToRight = false;
this.fillColor = null;
Clazz_instantialize (this, arguments);
}, JSV.common, "Spectrum", JSV.source.JDXDataObject);
Clazz_prepareFields (c$, function () {
this.peakList =  new JU.Lst ();
});
Clazz_overrideMethod (c$, "finalize", 
function () {
System.out.println ("JDXSpectrum " + this + " finalized " + this.title);
});
Clazz_defineMethod (c$, "dispose", 
function () {
});
Clazz_defineMethod (c$, "isForcedSubset", 
function () {
return this.$isForcedSubset;
});
Clazz_defineMethod (c$, "setId", 
function (id) {
this.id = id;
}, "~S");
Clazz_makeConstructor (c$, 
function () {
Clazz_superConstructor (this, JSV.common.Spectrum, []);
this.headerTable =  new JU.Lst ();
this.xyCoords =  new Array (0);
this.parent = this;
});
Clazz_defineMethod (c$, "copy", 
function () {
var newSpectrum =  new JSV.common.Spectrum ();
this.copyTo (newSpectrum);
newSpectrum.setPeakList (this.peakList, this.piUnitsX, null);
newSpectrum.fillColor = this.fillColor;
return newSpectrum;
});
Clazz_defineMethod (c$, "getXYCoords", 
function () {
return this.getCurrentSubSpectrum ().xyCoords;
});
Clazz_defineMethod (c$, "getPeakList", 
function () {
return this.peakList;
});
Clazz_defineMethod (c$, "setPeakList", 
function (list, piUnitsX, piUnitsY) {
this.peakList = list;
this.piUnitsX = piUnitsX;
this.piUnitsY = piUnitsY;
for (var i = list.size (); --i >= 0; ) this.peakList.get (i).spectrum = this;

if (JU.Logger.debugging) JU.Logger.info ("Spectrum " + this.getTitle () + " peaks: " + list.size ());
return list.size ();
}, "JU.Lst,~S,~S");
Clazz_defineMethod (c$, "selectPeakByFileIndex", 
function (filePath, index, atomKey) {
if (this.peakList != null && this.peakList.size () > 0 && (atomKey == null || this.sourceID.equals (index))) for (var i = 0; i < this.peakList.size (); i++) if (this.peakList.get (i).checkFileIndex (filePath, index, atomKey)) {
System.out.println ("selecting peak by FileIndex " + this + " " + this.peakList.get (i));
return (this.selectedPeak = this.peakList.get (i));
}
return null;
}, "~S,~S,~S");
Clazz_defineMethod (c$, "selectPeakByFilePathTypeModel", 
function (filePath, type, model) {
if (this.peakList != null && this.peakList.size () > 0) for (var i = 0; i < this.peakList.size (); i++) if (this.peakList.get (i).checkFileTypeModel (filePath, type, model)) {
System.out.println ("selecting peak byFilePathTypeModel " + this + " " + this.peakList.get (i));
return (this.selectedPeak = this.peakList.get (i));
}
return null;
}, "~S,~S,~S");
Clazz_defineMethod (c$, "matchesPeakTypeModel", 
function (type, model) {
if (type.equals ("ID")) return (this.sourceID.equalsIgnoreCase (model));
if (this.peakList != null && this.peakList.size () > 0) for (var i = 0; i < this.peakList.size (); i++) if (this.peakList.get (i).checkTypeModel (type, model)) return true;

return false;
}, "~S,~S");
Clazz_defineMethod (c$, "setSelectedPeak", 
function (peak) {
this.selectedPeak = peak;
}, "JSV.common.PeakInfo");
Clazz_defineMethod (c$, "setHighlightedPeak", 
function (peak) {
this.highlightedPeak = peak;
}, "JSV.common.PeakInfo");
Clazz_defineMethod (c$, "getSelectedPeak", 
function () {
return this.selectedPeak;
});
Clazz_defineMethod (c$, "getModelPeakInfoForAutoSelectOnLoad", 
function () {
if (this.peakList != null) for (var i = 0; i < this.peakList.size (); i++) if (this.peakList.get (i).autoSelectOnLoad ()) return this.peakList.get (i);

return null;
});
Clazz_defineMethod (c$, "getAssociatedPeakInfo", 
function (xPixel, coord) {
this.selectedPeak = this.findPeakByCoord (xPixel, coord);
return (this.selectedPeak == null ? this.getBasePeakInfo () : this.selectedPeak);
}, "~N,JSV.common.Coordinate");
Clazz_defineMethod (c$, "findPeakByCoord", 
function (xPixel, coord) {
if (coord != null && this.peakList != null && this.peakList.size () > 0) {
var xVal = coord.getXVal ();
var iBest = -1;
var dBest = 1e100;
for (var i = 0; i < this.peakList.size (); i++) {
var d = this.peakList.get (i).checkRange (xPixel, xVal);
if (d < dBest) {
dBest = d;
iBest = i;
}}
if (iBest >= 0) return this.peakList.get (iBest);
}return null;
}, "~N,JSV.common.Coordinate");
Clazz_defineMethod (c$, "getPeakTitle", 
function () {
return (this.selectedPeak != null ? this.selectedPeak.getTitle () : this.highlightedPeak != null ? this.highlightedPeak.getTitle () : this.getTitleLabel ());
});
Clazz_defineMethod (c$, "getTitleLabel", 
function () {
var type = (this.peakList == null || this.peakList.size () == 0 ? this.getQualifiedDataType () : this.peakList.get (0).getType ());
if (type != null && type.startsWith ("NMR")) {
if (this.nucleusY != null && !this.nucleusY.equals ("?")) {
type = "2D" + type;
} else {
type = this.nucleusX + type;
}}return (type != null && type.length > 0 ? type + " " : "") + this.getTitle ();
});
Clazz_defineMethod (c$, "setNextPeak", 
function (coord, istep) {
if (this.peakList == null || this.peakList.size () == 0) return -1;
var x0 = coord.getXVal () + istep * 0.000001;
var ipt1 = -1;
var ipt2 = -1;
var dmin1 = 1.7976931348623157E308 * istep;
var dmin2 = 0;
for (var i = this.peakList.size (); --i >= 0; ) {
var x = this.peakList.get (i).getX ();
if (istep > 0) {
if (x > x0 && x < dmin1) {
ipt1 = i;
dmin1 = x;
} else if (x < x0 && x - x0 < dmin2) {
ipt2 = i;
dmin2 = x - x0;
}} else {
if (x < x0 && x > dmin1) {
ipt1 = i;
dmin1 = x;
} else if (x > x0 && x - x0 > dmin2) {
ipt2 = i;
dmin2 = x - x0;
}}}
if (ipt1 < 0) {
if (ipt2 < 0) return -1;
ipt1 = ipt2;
}return ipt1;
}, "JSV.common.Coordinate,~N");
Clazz_defineMethod (c$, "getPercentYValueAt", 
function (x) {
if (!this.isContinuous ()) return NaN;
return this.getYValueAt (x);
}, "~N");
Clazz_defineMethod (c$, "getYValueAt", 
function (x) {
return JSV.common.Coordinate.getYValueAt (this.xyCoords, x);
}, "~N");
Clazz_defineMethod (c$, "setUserYFactor", 
function (userYFactor) {
this.userYFactor = userYFactor;
}, "~N");
Clazz_defineMethod (c$, "getUserYFactor", 
function () {
return this.userYFactor;
});
Clazz_defineMethod (c$, "getConvertedSpectrum", 
function () {
return this.convertedSpectrum;
});
Clazz_defineMethod (c$, "setConvertedSpectrum", 
function (spectrum) {
this.convertedSpectrum = spectrum;
}, "JSV.common.Spectrum");
c$.taConvert = Clazz_defineMethod (c$, "taConvert", 
function (spectrum, mode) {
if (!spectrum.isContinuous ()) return spectrum;
switch (mode) {
case JSV.common.Spectrum.IRMode.NO_CONVERT:
return spectrum;
case JSV.common.Spectrum.IRMode.TO_ABS:
if (!spectrum.isTransmittance ()) return spectrum;
break;
case JSV.common.Spectrum.IRMode.TO_TRANS:
if (!spectrum.isAbsorbance ()) return spectrum;
break;
case JSV.common.Spectrum.IRMode.TOGGLE:
break;
}
var spec = spectrum.getConvertedSpectrum ();
return (spec != null ? spec : spectrum.isAbsorbance () ? JSV.common.Spectrum.toT (spectrum) : JSV.common.Spectrum.toA (spectrum));
}, "JSV.common.Spectrum,JSV.common.Spectrum.IRMode");
c$.toT = Clazz_defineMethod (c$, "toT", 
 function (spectrum) {
if (!spectrum.isAbsorbance ()) return null;
var xyCoords = spectrum.getXYCoords ();
var newXYCoords =  new Array (xyCoords.length);
if (!JSV.common.Coordinate.isYInRange (xyCoords, 0, 4.0)) xyCoords = JSV.common.Coordinate.normalise (xyCoords, 0, 4.0);
for (var i = 0; i < xyCoords.length; i++) newXYCoords[i] =  new JSV.common.Coordinate ().set (xyCoords[i].getXVal (), JSV.common.Spectrum.toTransmittance (xyCoords[i].getYVal ()));

return JSV.common.Spectrum.newSpectrum (spectrum, newXYCoords, "TRANSMITTANCE");
}, "JSV.common.Spectrum");
c$.toA = Clazz_defineMethod (c$, "toA", 
 function (spectrum) {
if (!spectrum.isTransmittance ()) return null;
var xyCoords = spectrum.getXYCoords ();
var newXYCoords =  new Array (xyCoords.length);
var isPercent = JSV.common.Coordinate.isYInRange (xyCoords, -2, 2);
for (var i = 0; i < xyCoords.length; i++) newXYCoords[i] =  new JSV.common.Coordinate ().set (xyCoords[i].getXVal (), JSV.common.Spectrum.toAbsorbance (xyCoords[i].getYVal (), isPercent));

return JSV.common.Spectrum.newSpectrum (spectrum, newXYCoords, "ABSORBANCE");
}, "JSV.common.Spectrum");
c$.newSpectrum = Clazz_defineMethod (c$, "newSpectrum", 
function (spectrum, newXYCoords, units) {
var specNew = spectrum.copy ();
specNew.setOrigin ("JSpecView Converted");
specNew.setOwner ("JSpecView Generated");
specNew.setXYCoords (newXYCoords);
specNew.setYUnits (units);
spectrum.setConvertedSpectrum (specNew);
specNew.setConvertedSpectrum (spectrum);
return specNew;
}, "JSV.common.Spectrum,~A,~S");
c$.toAbsorbance = Clazz_defineMethod (c$, "toAbsorbance", 
 function (x, isPercent) {
return (Math.min (4.0, isPercent ? 2 - JSV.common.Spectrum.log10 (x) : -JSV.common.Spectrum.log10 (x)));
}, "~N,~B");
c$.toTransmittance = Clazz_defineMethod (c$, "toTransmittance", 
 function (x) {
return (x <= 0 ? 1 : Math.pow (10, -x));
}, "~N");
c$.log10 = Clazz_defineMethod (c$, "log10", 
 function (value) {
return Math.log (value) / Math.log (10);
}, "~N");
c$.process = Clazz_defineMethod (c$, "process", 
function (specs, irMode) {
if (irMode === JSV.common.Spectrum.IRMode.TO_ABS || irMode === JSV.common.Spectrum.IRMode.TO_TRANS) for (var i = 0; i < specs.size (); i++) specs.set (i, JSV.common.Spectrum.taConvert (specs.get (i), irMode));

return true;
}, "JU.Lst,JSV.common.Spectrum.IRMode");
Clazz_defineMethod (c$, "getSubSpectra", 
function () {
return this.subSpectra;
});
Clazz_defineMethod (c$, "getCurrentSubSpectrum", 
function () {
return (this.subSpectra == null ? this : this.subSpectra.get (this.currentSubSpectrumIndex));
});
Clazz_defineMethod (c$, "advanceSubSpectrum", 
function (dir) {
return this.setCurrentSubSpectrum (this.currentSubSpectrumIndex + dir);
}, "~N");
Clazz_defineMethod (c$, "setCurrentSubSpectrum", 
function (n) {
return (this.currentSubSpectrumIndex = JSV.common.Coordinate.intoRange (n, 0, this.subSpectra.size () - 1));
}, "~N");
Clazz_defineMethod (c$, "addSubSpectrum", 
function (spectrum, forceSub) {
if (!forceSub && (this.numDim < 2 || this.blockID != spectrum.blockID) || !JSV.common.Spectrum.allowSubSpec (this, spectrum)) return false;
this.$isForcedSubset = forceSub;
if (this.subSpectra == null) {
this.subSpectra =  new JU.Lst ();
this.addSubSpectrum (this, true);
}this.subSpectra.addLast (spectrum);
spectrum.parent = this;
return true;
}, "JSV.common.Spectrum,~B");
Clazz_defineMethod (c$, "getSubIndex", 
function () {
return (this.subSpectra == null ? -1 : this.currentSubSpectrumIndex);
});
Clazz_defineMethod (c$, "setExportXAxisDirection", 
function (leftToRight) {
this.exportXAxisLeftToRight = leftToRight;
}, "~B");
Clazz_defineMethod (c$, "isExportXAxisLeftToRight", 
function () {
return this.exportXAxisLeftToRight;
});
Clazz_defineMethod (c$, "getInfo", 
function (key) {
var info =  new java.util.Hashtable ();
if ("id".equalsIgnoreCase (key)) {
info.put (key, this.id);
return info;
}var keys = null;
if ("".equals (key)) {
keys = "id specShift header";
}info.put ("id", this.id);
JSV.common.Parameters.putInfo (key, info, "specShift", Double.$valueOf (this.specShift));
var justHeader = ("header".equals (key));
if (!justHeader && key != null && keys == null) {
for (var i = this.headerTable.size (); --i >= 0; ) {
var entry = this.headerTable.get (i);
if (entry[0].equalsIgnoreCase (key) || entry[2].equalsIgnoreCase (key)) {
info.put (key, entry[1]);
return info;
}}
}var head =  new java.util.Hashtable ();
var list = this.getHeaderRowDataAsArray ();
for (var i = 0; i < list.length; i++) {
var label = JSV.source.JDXSourceStreamTokenizer.cleanLabel (list[i][0]);
if (keys != null) {
keys += " " + label;
continue;
}if (key != null && !justHeader && !label.equals (key)) continue;
var val = JSV.common.Spectrum.fixInfoValue (list[i][1]);
if (key == null) {
var data =  new java.util.Hashtable ();
data.put ("value", val);
data.put ("index", Integer.$valueOf (i + 1));
info.put (label, data);
} else {
info.put (label, val);
}}
if (head.size () > 0) info.put ("header", head);
if (!justHeader) {
if (keys != null) {
keys += "  titleLabel type isHZToPPM subSpectrumCount";
} else {
JSV.common.Parameters.putInfo (key, info, "titleLabel", this.getTitleLabel ());
JSV.common.Parameters.putInfo (key, info, "type", this.getDataType ());
JSV.common.Parameters.putInfo (key, info, "isHZToPPM", Boolean.$valueOf (this.$isHZtoPPM));
JSV.common.Parameters.putInfo (key, info, "subSpectrumCount", Integer.$valueOf (this.subSpectra == null ? 0 : this.subSpectra.size ()));
}}if (keys != null) info.put ("KEYS", keys);
return info;
}, "~S");
c$.fixInfoValue = Clazz_defineMethod (c$, "fixInfoValue", 
 function (info) {
try {
return (Integer.$valueOf (info));
} catch (e) {
if (Clazz_exceptionOf (e, Exception)) {
} else {
throw e;
}
}
try {
return (Double.$valueOf (info));
} catch (e) {
if (Clazz_exceptionOf (e, Exception)) {
} else {
throw e;
}
}
return info;
}, "~S");
Clazz_overrideMethod (c$, "toString", 
function () {
return this.getTitleLabel ();
});
Clazz_defineMethod (c$, "findMatchingPeakInfo", 
function (pi) {
for (var i = 0; i < this.peakList.size (); i++) if (this.peakList.get (i).checkTypeMatch (pi)) return this.peakList.get (i);

return null;
}, "JSV.common.PeakInfo");
Clazz_defineMethod (c$, "getBasePeakInfo", 
function () {
return (this.peakList.size () == 0 ?  new JSV.common.PeakInfo () :  new JSV.common.PeakInfo (" baseModel=\"\" " + this.peakList.get (0)));
});
Clazz_defineMethod (c$, "getAxisLabel", 
function (isX) {
var units = (isX ? this.piUnitsX : this.piUnitsY);
if (units == null) units = (isX ? this.xLabel : this.yLabel);
if (units == null) units = (isX ? this.xUnits : this.yUnits);
return (units == null ? "" : units.equalsIgnoreCase ("WAVENUMBERS") ? "1/cm" : units.equalsIgnoreCase ("nanometers") ? "nm" : units);
}, "~B");
Clazz_defineMethod (c$, "findXForPeakNearest", 
function (x) {
return JSV.common.Coordinate.findXForPeakNearest (this.xyCoords, x, this.isInverted ());
}, "~N");
Clazz_defineMethod (c$, "addSpecShift", 
function (dx) {
if (dx != 0) {
this.specShift += dx;
JSV.common.Coordinate.shiftX (this.xyCoords, dx);
if (this.subSpectra != null) for (var i = this.subSpectra.size (); --i >= 0; ) {
var spec = this.subSpectra.get (i);
if (spec !== this && spec !== this.parent) spec.addSpecShift (dx);
}
}return this.specShift;
}, "~N");
c$.allowSubSpec = Clazz_defineMethod (c$, "allowSubSpec", 
function (s1, s2) {
return (s1.is1D () == s2.is1D () && s1.xUnits.equalsIgnoreCase (s2.xUnits) && s1.isHNMR () == s2.isHNMR ());
}, "JSV.common.Spectrum,JSV.common.Spectrum");
c$.areXScalesCompatible = Clazz_defineMethod (c$, "areXScalesCompatible", 
function (s1, s2, isSubspecCheck, isLinkCheck) {
var isNMR1 = s1.isNMR ();
if (isNMR1 != s2.isNMR () || s1.isContinuous () != s2.isContinuous () || !isLinkCheck && !JSV.common.Spectrum.areUnitsCompatible (s1.xUnits, s2.xUnits)) return false;
if (isSubspecCheck) {
if (s1.is1D () != s2.is1D ()) return false;
} else if (isLinkCheck) {
if (!isNMR1) return true;
} else if (!s1.is1D () || !s2.is1D ()) {
return false;
}return (!isNMR1 || s2.is1D () && s1.parent.nucleusX.equals (s2.parent.nucleusX));
}, "JSV.common.Spectrum,JSV.common.Spectrum,~B,~B");
c$.areUnitsCompatible = Clazz_defineMethod (c$, "areUnitsCompatible", 
 function (u1, u2) {
if (u1.equalsIgnoreCase (u2)) return true;
u1 = u1.toUpperCase ();
u2 = u2.toUpperCase ();
return (u1.equals ("HZ") && u2.equals ("PPM") || u1.equals ("PPM") && u2.equals ("HZ"));
}, "~S,~S");
c$.areLinkableX = Clazz_defineMethod (c$, "areLinkableX", 
function (s1, s2) {
return (s1.isNMR () && s2.isNMR () && s1.nucleusX.equals (s2.nucleusX));
}, "JSV.common.Spectrum,JSV.common.Spectrum");
c$.areLinkableY = Clazz_defineMethod (c$, "areLinkableY", 
function (s1, s2) {
return (s1.isNMR () && s2.isNMR () && s1.nucleusX.equals (s2.nucleusY));
}, "JSV.common.Spectrum,JSV.common.Spectrum");
Clazz_defineMethod (c$, "setNHydrogens", 
function (nH) {
this.nH = nH;
}, "~N");
Clazz_defineMethod (c$, "getPeakWidth", 
function () {
var w = this.getLastX () - this.getFirstX ();
return (w / 100);
});
Clazz_defineMethod (c$, "setSimulated", 
function (filePath) {
this.isSimulation = true;
var s = this.sourceID;
if (s.length == 0) s = JU.PT.rep (filePath, "http://SIMULATION/", "");
if (s.indexOf ("MOL=") >= 0) s = "";
this.title = "SIMULATED " + JU.PT.rep (s, "$", "");
}, "~S");
Clazz_defineMethod (c$, "setFillColor", 
function (color) {
this.fillColor = color;
if (this.convertedSpectrum != null) this.convertedSpectrum.fillColor = color;
}, "javajs.api.GenericColor");
Clazz_pu$h(self.c$);
c$ = Clazz_declareType (JSV.common.Spectrum, "IRMode", Enum);
c$.getMode = Clazz_defineMethod (c$, "getMode", 
function (a) {
switch (a == null ? 'I' : a.toUpperCase ().charAt (0)) {
case 'A':
return JSV.common.Spectrum.IRMode.TO_ABS;
case 'T':
return (a.equalsIgnoreCase ("TOGGLE") ? JSV.common.Spectrum.IRMode.TOGGLE : JSV.common.Spectrum.IRMode.TO_TRANS);
case 'N':
return JSV.common.Spectrum.IRMode.NO_CONVERT;
default:
return JSV.common.Spectrum.IRMode.TOGGLE;
}
}, "~S");
Clazz_defineEnumConstant (c$, "NO_CONVERT", 0, []);
Clazz_defineEnumConstant (c$, "TO_TRANS", 1, []);
Clazz_defineEnumConstant (c$, "TO_ABS", 2, []);
Clazz_defineEnumConstant (c$, "TOGGLE", 3, []);
c$ = Clazz_p0p ();
Clazz_defineStatics (c$,
"MAXABS", 4);
});
Jmol.___JSVDate="$Date: 2020-09-16 10:02:04 -0500 (Wed, 16 Sep 2020) $"
Jmol.___JSVSvnRev="$LastChangedRevision: 22031 $"
Jmol.___JSVVersion="14.31.6"
Clazz_declarePackage ("JSV.common");
c$ = Clazz_declareType (JSV.common, "JSVersion");
Clazz_defineStatics (c$,
"VERSION", null,
"VERSION_SHORT", null);
{
var tmpVersion = null;
var tmpDate = null;
var tmpSVN = null;
{
tmpVersion = Jmol.___JSVVersion; tmpDate = Jmol.___JSVDate;
tmpSVN =  Jmol.___JSVSvnRev;
}if (tmpDate != null) tmpDate = tmpDate.substring (7, 23);
tmpSVN = (tmpSVN == null ? "" : "/SVN" + tmpSVN.substring (22, 27));
JSV.common.JSVersion.VERSION_SHORT = (tmpVersion != null ? tmpVersion : "(Unknown version)");
JSV.common.JSVersion.VERSION = JSV.common.JSVersion.VERSION_SHORT + tmpSVN + "/" + (tmpDate != null ? tmpDate : "(Unknown date)");
}Clazz_declarePackage ("JSV.common");
Clazz_load (["java.util.Hashtable"], "JSV.common.JSVFileManager", ["java.io.BufferedInputStream", "$.BufferedReader", "$.InputStreamReader", "$.StringReader", "java.net.URL", "JU.AU", "$.BS", "$.Encoding", "$.JSJSONParser", "$.P3", "$.PT", "$.SB", "JSV.common.JSVersion", "$.JSViewer", "JSV.exception.JSVException", "JU.Logger"], function () {
c$ = Clazz_declareType (JSV.common, "JSVFileManager");
Clazz_defineMethod (c$, "isApplet", 
function () {
return (JSV.common.JSVFileManager.appletDocumentBase != null);
});
c$.getFileAsString = Clazz_defineMethod (c$, "getFileAsString", 
function (name) {
if (name == null) return null;
var br;
var sb =  new JU.SB ();
try {
br = JSV.common.JSVFileManager.getBufferedReaderFromName (name, null);
var line;
while ((line = br.readLine ()) != null) {
sb.append (line);
sb.appendC ('\n');
}
br.close ();
} catch (e) {
if (Clazz_exceptionOf (e, Exception)) {
return null;
} else {
throw e;
}
}
return sb.toString ();
}, "~S");
c$.getBufferedReaderForInputStream = Clazz_defineMethod (c$, "getBufferedReaderForInputStream", 
function ($in) {
try {
return  new java.io.BufferedReader ( new java.io.InputStreamReader ($in, "UTF-8"));
} catch (e) {
if (Clazz_exceptionOf (e, Exception)) {
return null;
} else {
throw e;
}
}
}, "java.io.InputStream");
c$.getBufferedReaderForStringOrBytes = Clazz_defineMethod (c$, "getBufferedReaderForStringOrBytes", 
function (stringOrBytes) {
return (stringOrBytes == null ? null :  new java.io.BufferedReader ( new java.io.StringReader (Clazz_instanceOf (stringOrBytes, String) ? stringOrBytes :  String.instantialize (stringOrBytes))));
}, "~O");
c$.getBufferedReaderFromName = Clazz_defineMethod (c$, "getBufferedReaderFromName", 
function (name, startCode) {
if (name == null) throw  new JSV.exception.JSVException ("Cannot find " + name);
JU.Logger.info ("JSVFileManager getBufferedReaderFromName " + name);
var path = JSV.common.JSVFileManager.getFullPathName (name);
if (!path.equals (name)) JU.Logger.info ("JSVFileManager getBufferedReaderFromName " + path);
return JSV.common.JSVFileManager.getUnzippedBufferedReaderFromName (path, startCode);
}, "~S,~S");
c$.getFullPathName = Clazz_defineMethod (c$, "getFullPathName", 
function (name) {
try {
if (JSV.common.JSVFileManager.appletDocumentBase == null) {
if (JSV.common.JSVFileManager.isURL (name)) {
var url =  new java.net.URL (Clazz_castNullAs ("java.net.URL"), name, null);
return url.toString ();
}return JSV.common.JSVFileManager.viewer.apiPlatform.newFile (name).getFullPath ();
}if (name.indexOf (":\\") == 1 || name.indexOf (":/") == 1) name = "file:///" + name;
 else if (name.startsWith ("cache://")) return name;
var url =  new java.net.URL (JSV.common.JSVFileManager.appletDocumentBase, name, null);
return url.toString ();
} catch (e) {
if (Clazz_exceptionOf (e, Exception)) {
throw  new JSV.exception.JSVException ("Cannot create path for " + name);
} else {
throw e;
}
}
}, "~S");
c$.isURL = Clazz_defineMethod (c$, "isURL", 
function (name) {
for (var i = JSV.common.JSVFileManager.urlPrefixes.length; --i >= 0; ) if (name.startsWith (JSV.common.JSVFileManager.urlPrefixes[i])) return true;

return false;
}, "~S");
c$.urlTypeIndex = Clazz_defineMethod (c$, "urlTypeIndex", 
function (name) {
for (var i = 0; i < JSV.common.JSVFileManager.urlPrefixes.length; ++i) {
if (name.startsWith (JSV.common.JSVFileManager.urlPrefixes[i])) {
return i;
}}
return -1;
}, "~S");
c$.isLocal = Clazz_defineMethod (c$, "isLocal", 
function (fileName) {
if (fileName == null) return false;
var itype = JSV.common.JSVFileManager.urlTypeIndex (fileName);
return (itype < 0 || itype == 4);
}, "~S");
c$.getUnzippedBufferedReaderFromName = Clazz_defineMethod (c$, "getUnzippedBufferedReaderFromName", 
 function (name, startCode) {
var subFileList = null;
if (name.indexOf ("|") >= 0) {
subFileList = JU.PT.split (name, "|");
if (subFileList != null && subFileList.length > 0) name = subFileList[0];
}if (name.startsWith ("http://SIMULATION/")) return JSV.common.JSVFileManager.getSimulationReader (name);
try {
var ret = JSV.common.JSVFileManager.getInputStream (name, true, null);
if (Clazz_instanceOf (ret, JU.SB) || Clazz_instanceOf (ret, String)) return  new java.io.BufferedReader ( new java.io.StringReader (ret.toString ()));
if (JSV.common.JSVFileManager.isAB (ret)) return  new java.io.BufferedReader ( new java.io.StringReader ( String.instantialize (ret)));
var bis =  new java.io.BufferedInputStream (ret);
var $in = bis;
if (JSV.common.JSVFileManager.isZipFile (bis)) return (JSV.common.JSViewer.getInterface ("JSV.common.JSVZipUtil")).newJSVZipFileSequentialReader ($in, subFileList, startCode);
if (JSV.common.JSVFileManager.isGzip (bis)) $in = (JSV.common.JSViewer.getInterface ("JSV.common.JSVZipUtil")).newGZIPInputStream ($in);
return  new java.io.BufferedReader ( new java.io.InputStreamReader ($in, "UTF-8"));
} catch (e) {
if (Clazz_exceptionOf (e, Exception)) {
throw  new JSV.exception.JSVException ("Cannot read file " + name + " " + e);
} else {
throw e;
}
}
}, "~S,~S");
c$.getAbbrSimulationFileName = Clazz_defineMethod (c$, "getAbbrSimulationFileName", 
function (name) {
var type = JSV.common.JSVFileManager.getSimulationType (name);
var filename = JSV.common.JSVFileManager.getAbbreviatedSimulationName (name, type, true);
return filename;
}, "~S");
c$.getAbbreviatedSimulationName = Clazz_defineMethod (c$, "getAbbreviatedSimulationName", 
function (name, type, addProtocol) {
return (name.indexOf ("MOL=") >= 0 ? (addProtocol ? "http://SIMULATION/" : "") + "MOL=" + JSV.common.JSVFileManager.getSimulationHash (name, type) : name);
}, "~S,~S,~B");
c$.getSimulationHash = Clazz_defineMethod (c$, "getSimulationHash", 
 function (name, type) {
var code = type + Math.abs (name.substring (name.indexOf ("V2000") + 1).hashCode ());
if (JU.Logger.debugging) System.out.println ("JSVFileManager hash for " + name + " = " + code);
return code;
}, "~S,~S");
c$.getSimulationFileData = Clazz_defineMethod (c$, "getSimulationFileData", 
function (name, type) {
return JSV.common.JSVFileManager.cacheGet (name.startsWith ("MOL=") ? name.substring (4) : JSV.common.JSVFileManager.getAbbreviatedSimulationName (name, type, false));
}, "~S,~S");
c$.cachePut = Clazz_defineMethod (c$, "cachePut", 
function (name, data) {
if (JU.Logger.debugging) JU.Logger.debug ("JSVFileManager cachePut " + data + " for " + name);
if (data != null) JSV.common.JSVFileManager.htCorrelationCache.put (name, data);
}, "~S,~S");
c$.cacheGet = Clazz_defineMethod (c$, "cacheGet", 
function (key) {
var data = JSV.common.JSVFileManager.htCorrelationCache.get (key);
if (JU.Logger.debugging) JU.Logger.info ("JSVFileManager cacheGet " + data + " for " + key);
return data;
}, "~S");
c$.getSimulationReader = Clazz_defineMethod (c$, "getSimulationReader", 
 function (name) {
var data = JSV.common.JSVFileManager.cacheGet (name);
if (data == null) JSV.common.JSVFileManager.cachePut (name, data = JSV.common.JSVFileManager.getNMRSimulationJCampDX (name.substring ("http://SIMULATION/".length)));
return JSV.common.JSVFileManager.getBufferedReaderForStringOrBytes (data);
}, "~S");
c$.isAB = Clazz_defineMethod (c$, "isAB", 
function (x) {
{
return Clazz_isAB(x);
}}, "~O");
c$.isZipFile = Clazz_defineMethod (c$, "isZipFile", 
function (is) {
try {
var abMagic =  Clazz_newByteArray (4, 0);
is.mark (5);
var countRead = is.read (abMagic, 0, 4);
is.reset ();
return (countRead == 4 && abMagic[0] == 0x50 && abMagic[1] == 0x4B && abMagic[2] == 0x03 && abMagic[3] == 0x04);
} catch (e) {
if (Clazz_exceptionOf (e, Exception)) {
throw  new JSV.exception.JSVException (e.toString ());
} else {
throw e;
}
}
}, "java.io.InputStream");
c$.isGzip = Clazz_defineMethod (c$, "isGzip", 
 function (is) {
try {
var abMagic =  Clazz_newByteArray (4, 0);
is.mark (5);
var countRead = is.read (abMagic, 0, 4);
is.reset ();
return (countRead == 4 && abMagic[0] == 0x1F && abMagic[1] == 0x8B);
} catch (e) {
if (Clazz_exceptionOf (e, Exception)) {
throw  new JSV.exception.JSVException (e.toString ());
} else {
throw e;
}
}
}, "java.io.InputStream");
c$.getStreamAsBytes = Clazz_defineMethod (c$, "getStreamAsBytes", 
function (bis, out) {
try {
var buf =  Clazz_newByteArray (1024, 0);
var bytes = (out == null ?  Clazz_newByteArray (4096, 0) : null);
var len = 0;
var totalLen = 0;
while ((len = bis.read (buf, 0, 1024)) > 0) {
totalLen += len;
if (out == null) {
if (totalLen >= bytes.length) bytes = JU.AU.ensureLengthByte (bytes, totalLen * 2);
System.arraycopy (buf, 0, bytes, totalLen - len, len);
} else {
out.write (buf, 0, len);
}}
bis.close ();
if (out == null) {
return JU.AU.arrayCopyByte (bytes, totalLen);
}return totalLen + " bytes";
} catch (e) {
if (Clazz_exceptionOf (e, Exception)) {
throw  new JSV.exception.JSVException (e.toString ());
} else {
throw e;
}
}
}, "java.io.BufferedInputStream,JU.OC");
c$.postByteArray = Clazz_defineMethod (c$, "postByteArray", 
function (fileName, bytes) {
var ret = null;
try {
ret = JSV.common.JSVFileManager.getInputStream (fileName, false, bytes);
} catch (e) {
if (Clazz_exceptionOf (e, Exception)) {
ret = e.toString ();
} else {
throw e;
}
}
if (Clazz_instanceOf (ret, String)) return ret;
try {
ret = JSV.common.JSVFileManager.getStreamAsBytes (ret, null);
} catch (e) {
if (Clazz_exceptionOf (e, JSV.exception.JSVException)) {
try {
(ret).close ();
} catch (e1) {
if (Clazz_exceptionOf (e1, Exception)) {
} else {
throw e1;
}
}
} else {
throw e;
}
}
return (ret == null ? "" : JSV.common.JSVFileManager.fixUTF (ret));
}, "~S,~A");
c$.getUTFEncoding = Clazz_defineMethod (c$, "getUTFEncoding", 
 function (bytes) {
if (bytes.length >= 3 && bytes[0] == 0xEF && bytes[1] == 0xBB && bytes[2] == 0xBF) return JU.Encoding.UTF8;
if (bytes.length >= 4 && bytes[0] == 0 && bytes[1] == 0 && bytes[2] == 0xFE && bytes[3] == 0xFF) return JU.Encoding.UTF_32BE;
if (bytes.length >= 4 && bytes[0] == 0xFF && bytes[1] == 0xFE && bytes[2] == 0 && bytes[3] == 0) return JU.Encoding.UTF_32LE;
if (bytes.length >= 2 && bytes[0] == 0xFF && bytes[1] == 0xFE) return JU.Encoding.UTF_16LE;
if (bytes.length >= 2 && bytes[0] == 0xFE && bytes[1] == 0xFF) return JU.Encoding.UTF_16BE;
return JU.Encoding.NONE;
}, "~A");
c$.fixUTF = Clazz_defineMethod (c$, "fixUTF", 
function (bytes) {
var encoding = JSV.common.JSVFileManager.getUTFEncoding (bytes);
if (encoding !== JU.Encoding.NONE) try {
var s =  String.instantialize (bytes, encoding.name ().$replace ('_', '-'));
switch (encoding) {
case JU.Encoding.UTF8:
case JU.Encoding.UTF_16BE:
case JU.Encoding.UTF_16LE:
s = s.substring (1);
break;
default:
break;
}
return s;
} catch (e) {
if (Clazz_exceptionOf (e, java.io.IOException)) {
JU.Logger.error ("fixUTF error " + e);
} else {
throw e;
}
}
return  String.instantialize (bytes);
}, "~A");
c$.getInputStream = Clazz_defineMethod (c$, "getInputStream", 
function (name, showMsg, postBytes) {
var isURL = JSV.common.JSVFileManager.isURL (name);
var isApplet = (JSV.common.JSVFileManager.appletDocumentBase != null);
var $in = null;
var post = null;
var iurl;
if (isURL && (iurl = name.indexOf ("?POST?")) >= 0) {
post = name.substring (iurl + 6);
name = name.substring (0, iurl);
}if (isApplet || isURL) {
var url;
try {
url =  new java.net.URL (JSV.common.JSVFileManager.appletDocumentBase, name, null);
} catch (e) {
if (Clazz_exceptionOf (e, Exception)) {
throw  new JSV.exception.JSVException ("Cannot read " + name);
} else {
throw e;
}
}
JU.Logger.info ("JSVFileManager opening URL " + url + (post == null ? "" : " with POST of " + post.length + " bytes"));
$in = JSV.common.JSVFileManager.viewer.apiPlatform.getURLContents (url, postBytes, post, false);
} else {
if (showMsg) JU.Logger.info ("JSVFileManager opening file " + name);
$in = JSV.common.JSVFileManager.viewer.apiPlatform.getBufferedFileInputStream (name);
}if (Clazz_instanceOf ($in, String)) throw  new JSV.exception.JSVException ($in);
return $in;
}, "~S,~B,~A");
c$.getNMRSimulationJCampDX = Clazz_defineMethod (c$, "getNMRSimulationJCampDX", 
 function (name) {
var pt = 0;
var molFile = null;
var type = JSV.common.JSVFileManager.getSimulationType (name);
if (name.startsWith (type)) name = name.substring (type.length + 1);
var isInline = name.startsWith ("MOL=");
if (isInline) {
name = name.substring (4);
pt = name.indexOf ("/n__Jmol");
if (pt > 0) name = name.substring (0, pt) + JU.PT.rep (name.substring (pt), "/n", "\n");
molFile = name = JU.PT.rep (name, "\\n", "\n");
}var key = "" + JSV.common.JSVFileManager.getSimulationHash (name, type);
if (JU.Logger.debugging) JU.Logger.info ("JSVFileManager type=" + type + " key=" + key + " name=" + name);
var jcamp = JSV.common.JSVFileManager.cacheGet (key);
if (jcamp != null) return jcamp;
var src = (isInline ? null : JU.PT.rep (JSV.common.JSVFileManager.nciResolver, "%FILE", JU.PT.escapeUrl (name)));
if (!isInline && (molFile = JSV.common.JSVFileManager.getFileAsString (src)) == null || molFile.indexOf ("<html") >= 0) {
JU.Logger.error ("no MOL data returned by NCI");
return null;
}var is13C = type.equals ("C13");
var url = (is13C ? JSV.common.JSVFileManager.nmrdbServerC13 : JSV.common.JSVFileManager.nmrdbServerH1);
var json = JSV.common.JSVFileManager.getFileAsString (url + molFile);
var map = ( new JU.JSJSONParser ()).parseMap (json, true);
JSV.common.JSVFileManager.cachePut ("json", json);
if (is13C) map = map.get ("result");
var jsonMolFile = map.get ("molfile");
if (jsonMolFile == null) {
System.out.println ("JSVFileManager: no MOL file returned from EPFL");
jsonMolFile = molFile;
} else {
System.out.println ("JSVFileManager: MOL file hash=" + jsonMolFile.hashCode ());
}var atomMap = JSV.common.JSVFileManager.getAtomMap (jsonMolFile, molFile);
JSV.common.JSVFileManager.cachePut ("mol", molFile);
{
if (!isInline) Jmol.Cache.put("http://SIMULATION/" + type +
"/" + name + "#molfile", molFile.getBytes());
}var xml = "<Signals src=" + JU.PT.esc (JU.PT.rep (is13C ? JSV.common.JSVFileManager.nmrdbServerC13 : JSV.common.JSVFileManager.nmrdbServerH1, "?POST?molfile=", "")) + ">\n";
if (is13C) {
var spec = map.get ("spectrum13C");
jcamp = (spec.get ("jcamp")).get ("value");
var lst = spec.get ("predCSNuc");
var sb =  new JU.SB ();
for (var i = lst.size (); --i >= 0; ) {
map = lst.get (i);
sb.append ("<Signal ");
JSV.common.JSVFileManager.setAttr (sb, "type", "nucleus", map);
if (atomMap == null) JSV.common.JSVFileManager.setAttr (sb, "atoms", "assignment", map);
 else sb.append ("atoms=\"").appendI (atomMap[JU.PT.parseInt (map.get ("assignment"))]).append ("\" ");
JSV.common.JSVFileManager.setAttr (sb, "multiplicity", "multiplicity", map);
map = map.get ("integralData");
JSV.common.JSVFileManager.setAttr (sb, "xMin", "from", map);
JSV.common.JSVFileManager.setAttr (sb, "xMax", "to", map);
JSV.common.JSVFileManager.setAttr (sb, "integral", "value", map);
sb.append ("></Signal>\n");
}
sb.append ("</Signals>");
xml += sb.toString ();
} else {
xml = JU.PT.rep (map.get ("xml"), "<Signals>", xml);
if (atomMap != null) {
var sb =  new JU.SB ();
var signals = JU.PT.split (xml, " atoms=\"");
sb.append (signals[0]);
for (var i = 1; i < signals.length; i++) {
var s = signals[i];
var a = JU.PT.parseInt (s);
sb.append (" atoms=\"").appendI (atomMap[a]).append (s.substring (s.indexOf ("\"")));
}
xml = sb.toString ();
}xml = JU.PT.rep (xml, "</", "\n</");
xml = JU.PT.rep (xml, "><", ">\n<");
xml = JU.PT.rep (xml, "\\\"", "\"");
jcamp = map.get ("jcamp");
}if (JU.Logger.debugging) JU.Logger.info (xml);
JSV.common.JSVFileManager.cachePut ("xml", xml);
jcamp = "##TITLE=" + (isInline ? "JMOL SIMULATION/" + type : name) + "\n" + jcamp.substring (jcamp.indexOf ("\n##") + 1);
pt = molFile.indexOf ("\n");
pt = molFile.indexOf ("\n", pt + 1);
if (pt > 0 && pt == molFile.indexOf ("\n \n")) molFile = molFile.substring (0, pt + 1) + "Created " + JSV.common.JSVFileManager.viewer.apiPlatform.getDateFormat ("8824") + " by JSpecView " + JSV.common.JSVersion.VERSION + molFile.substring (pt + 1);
pt = 0;
pt = jcamp.indexOf ("##.");
var id = JSV.common.JSVFileManager.getAbbreviatedSimulationName (name, type, false);
var pt1 = id.indexOf ("id='");
if (isInline && pt1 > 0) id = id.substring (pt1 + 4, (id + "'").indexOf ("'", pt1 + 4));
jcamp = jcamp.substring (0, pt) + "##$MODELS=\n<Models>\n" + "<ModelData id=" + JU.PT.esc (id) + " type=\"MOL\" src=" + JU.PT.esc (src) + ">\n" + molFile + "</ModelData>\n</Models>\n" + "##$SIGNALS=\n" + xml + "\n" + jcamp.substring (pt);
JSV.common.JSVFileManager.cachePut ("jcamp", jcamp);
JSV.common.JSVFileManager.cachePut (key, jcamp);
return jcamp;
}, "~S");
c$.getAtomMap = Clazz_defineMethod (c$, "getAtomMap", 
 function (jsonMolFile, jmolMolFile) {
var acJson = JSV.common.JSVFileManager.getCoord (jsonMolFile);
var acJmol = JSV.common.JSVFileManager.getCoord (jmolMolFile);
var n = acJson.length;
if (n != acJmol.length) return null;
var map =  Clazz_newIntArray (n, 0);
var bs =  new JU.BS ();
bs.setBits (0, n);
var haveMap = false;
for (var i = 0; i < n; i++) {
var a = acJson[i];
for (var j = bs.nextSetBit (0); j >= 0; j = bs.nextSetBit (j + 1)) {
if (a.distanceSquared (acJmol[j]) < 0.1) {
bs.clear (j);
map[i] = j;
if (i != j) haveMap = true;
break;
}}
}
return (haveMap ? map : null);
}, "~S,~S");
c$.getCoord = Clazz_defineMethod (c$, "getCoord", 
 function (mol) {
var lines = JU.PT.split (mol, "\n");
var data =  Clazz_newFloatArray (3, 0);
var n = Integer.parseInt (lines[3].substring (0, 3).trim ());
var pts =  new Array (n);
for (var i = 0; i < n; i++) {
var line = lines[4 + i];
JU.PT.parseFloatArrayInfested (JU.PT.getTokens (line.substring (0, 31)), data);
pts[i] = JU.P3.new3 (data[0], data[1], data[2]);
}
return pts;
}, "~S");
c$.setAttr = Clazz_defineMethod (c$, "setAttr", 
 function (sb, mykey, lucsKey, map) {
sb.append (mykey + "=\"").appendO (map.get (lucsKey)).append ("\" ");
}, "JU.SB,~S,~S,java.util.Map");
c$.getResource = Clazz_defineMethod (c$, "getResource", 
 function (object, fileName, error) {
var url = null;
try {
if ((url = object.getClass ().getResource (fileName)) == null) error[0] = "Couldn't find file: " + fileName;
} catch (e) {
if (Clazz_exceptionOf (e, Exception)) {
error[0] = "Exception " + e + " in getResource " + fileName;
} else {
throw e;
}
}
return url;
}, "~O,~S,~A");
c$.getResourceString = Clazz_defineMethod (c$, "getResourceString", 
function (object, name, error) {
var url = JSV.common.JSVFileManager.getResource (object, name, error);
if (url == null) {
error[0] = "Error loading resource " + name;
return null;
}if (Clazz_instanceOf (url, String)) {
return JSV.common.JSVFileManager.getFileAsString (url);
}var sb =  new JU.SB ();
try {
var br =  new java.io.BufferedReader ( new java.io.InputStreamReader ((url).getContent (), "UTF-8"));
var line;
while ((line = br.readLine ()) != null) sb.append (line).append ("\n");

br.close ();
} catch (e) {
if (Clazz_exceptionOf (e, Exception)) {
error[0] = e.toString ();
} else {
throw e;
}
}
return sb.toString ();
}, "~O,~S,~A");
c$.getJmolFilePath = Clazz_defineMethod (c$, "getJmolFilePath", 
function (filePath) {
try {
filePath = JSV.common.JSVFileManager.getFullPathName (filePath);
} catch (e) {
if (Clazz_exceptionOf (e, JSV.exception.JSVException)) {
return null;
} else {
throw e;
}
}
return (JSV.common.JSVFileManager.appletDocumentBase == null ? filePath.$replace ('\\', '/') : filePath);
}, "~S");
c$.getTagName = Clazz_defineMethod (c$, "getTagName", 
function (fileName) {
if (fileName == null) return "String" + (++JSV.common.JSVFileManager.stringCount);
if (JSV.common.JSVFileManager.isURL (fileName)) {
try {
if (fileName.startsWith ("http://SIMULATION/")) return JSV.common.JSVFileManager.getAbbrSimulationFileName (fileName);
var name = ( new java.net.URL (Clazz_castNullAs ("java.net.URL"), fileName, null)).getFile ();
return name.substring (name.lastIndexOf ('/') + 1);
} catch (e) {
if (Clazz_exceptionOf (e, java.io.IOException)) {
return null;
} else {
throw e;
}
}
}return JSV.common.JSVFileManager.viewer.apiPlatform.newFile (fileName).getName ();
}, "~S");
c$.setDocumentBase = Clazz_defineMethod (c$, "setDocumentBase", 
function (v, documentBase) {
JSV.common.JSVFileManager.viewer = v;
JSV.common.JSVFileManager.appletDocumentBase = documentBase;
}, "JSV.common.JSViewer,java.net.URL");
c$.getSimulationType = Clazz_defineMethod (c$, "getSimulationType", 
function (filePath) {
return (filePath.indexOf ("C13/") >= 0 ? "C13" : "H1");
}, "~S");
Clazz_defineStatics (c$,
"SIMULATION_PROTOCOL", "http://SIMULATION/",
"appletDocumentBase", null,
"viewer", null,
"jsDocumentBase", "");
c$.urlPrefixes = c$.prototype.urlPrefixes =  Clazz_newArray (-1, ["http:", "https:", "ftp:", "http://SIMULATION/", "file:"]);
Clazz_defineStatics (c$,
"URL_LOCAL", 4);
c$.htCorrelationCache = c$.prototype.htCorrelationCache =  new java.util.Hashtable ();
Clazz_defineStatics (c$,
"nciResolver", "https://cactus.nci.nih.gov/chemical/structure/%FILE/file?format=sdf&get3d=True",
"nmrdbServerH1", "https://www.nmrdb.org/tools/jmol/predict.php?POST?molfile=",
"nmrdbServerC13", "https://www.nmrdb.org/service/jsmol13c?POST?molfile=",
"stringCount", 0);
});
Clazz_declarePackage ("JSV.common");
Clazz_load (["javajs.api.BytePoster", "J.api.PlatformViewer", "JSV.common.Spectrum"], "JSV.common.JSViewer", ["java.io.File", "java.lang.Boolean", "$.Character", "$.Double", "$.Float", "$.Thread", "java.net.URL", "java.util.Arrays", "$.Hashtable", "JU.CU", "$.Lst", "$.OC", "$.PT", "$.SB", "JSV.common.Annotation", "$.ExportType", "$.JSVFileManager", "$.PanelData", "$.PanelNode", "$.Parameters", "$.PeakInfo", "$.PrintLayout", "$.RepaintManager", "$.ScriptToken", "$.ScriptTokenizer", "JSV.source.JDXReader", "$.JDXSource", "JSV.tree.SimpleTree", "JU.Logger"], function () {
c$ = Clazz_decorateAsClass (function () {
this.si = null;
this.g2d = null;
this.spectraTree = null;
this.currentSource = null;
this.panelNodes = null;
this.parameters = null;
this.repaintManager = null;
this.selectedPanel = null;
this.mainPanel = null;
this.properties = null;
this.scriptQueue = null;
this.fileHelper = null;
this.jsvpPopupMenu = null;
this.dialogManager = null;
this.viewDialog = null;
this.overlayLegendDialog = null;
this.irMode = null;
this.loadImaginary = false;
this.interfaceOverlaid = false;
this.autoIntegrate = false;
this.autoShowLegend = false;
this.obscureTitleFromUser = null;
this.allowMenu = true;
this.initialStartIndex = -1;
this.initialEndIndex = -1;
this.isSingleThreaded = false;
this.isApplet = false;
this.isSigned = false;
this.recentScript = "";
this.appletName = null;
this.fullName = null;
this.syncID = null;
this.html5Applet = null;
this.display = null;
this.maximumSize = 2147483647;
this.screenHeight = 0;
this.screenWidth = 0;
this.fileCount = 0;
this.nViews = 0;
this.scriptLevelCount = 0;
this.returnFromJmolModel = null;
this.integrationRatios = null;
this.apiPlatform = null;
this.popupAllowMenu = true;
this.popupZoomEnabled = true;
this.defaultLoadScript = null;
this.nmrMaxY = NaN;
this.overlayLegendVisible = false;
this.recentStackPercent = 5;
this.lastPrintLayout = null;
this.offWindowFrame = null;
this.recentOpenURL = "http://";
this.recentURL = null;
this.recentSimulation = "tylenol";
Clazz_instantialize (this, arguments);
}, JSV.common, "JSViewer", null, [J.api.PlatformViewer, javajs.api.BytePoster]);
Clazz_prepareFields (c$, function () {
this.irMode = JSV.common.Spectrum.IRMode.NO_CONVERT;
});
Clazz_defineMethod (c$, "setProperty", 
function (key, value) {
if (this.properties != null) this.properties.setProperty (key, value);
}, "~S,~S");
Clazz_defineMethod (c$, "setNode", 
function (node) {
if (node.jsvp !== this.selectedPanel) this.si.siSetSelectedPanel (node.jsvp);
this.si.siSendPanelChange ();
this.si.siNodeSet (node);
}, "JSV.common.PanelNode");
Clazz_makeConstructor (c$, 
function (si, isApplet, isJSApplet) {
this.si = si;
this.isApplet = isApplet;
JSV.common.JSViewer.isJS = isApplet && isJSApplet;
var jmol = null;
{
self.Jmol && (jmol = Jmol);
}JSV.common.JSViewer.jmolObject = jmol;
this.isSigned = si.isSigned ();
this.apiPlatform = this.getPlatformInterface ("Platform");
this.apiPlatform.setViewer (this, this.display);
this.g2d = this.getPlatformInterface ("G2D");
this.spectraTree =  new JSV.tree.SimpleTree (this);
this.parameters = this.getPlatformInterface ("Parameters");
this.parameters.setName ("applet");
this.fileHelper = (this.getPlatformInterface ("FileHelper")).set (this);
this.isSingleThreaded = this.apiPlatform.isSingleThreaded ();
this.panelNodes =  new JU.Lst ();
this.repaintManager =  new JSV.common.RepaintManager (this);
if (!isApplet) this.setPopupMenu (true, true);
}, "JSV.api.ScriptInterface,~B,~B");
Clazz_defineMethod (c$, "setPopupMenu", 
function (allowMenu, zoomEnabled) {
this.popupAllowMenu = allowMenu;
this.popupZoomEnabled = zoomEnabled;
}, "~B,~B");
Clazz_defineMethod (c$, "showMenu", 
function (x, y) {
if (!this.popupAllowMenu) return;
if (this.jsvpPopupMenu == null) {
try {
this.jsvpPopupMenu = this.getPlatformInterface ("Popup");
this.jsvpPopupMenu.jpiInitialize (this, this.isApplet ? "appletMenu" : "appMenu");
this.jsvpPopupMenu.setEnabled (this.popupAllowMenu, this.popupZoomEnabled);
} catch (e) {
if (Clazz_exceptionOf (e, Exception)) {
JU.Logger.error (e + " initializing popup menu");
return;
} else {
throw e;
}
}
}this.jsvpPopupMenu.jpiShow (x, y);
}, "~N,~N");
Clazz_defineMethod (c$, "runScriptNow", 
function (script) {
System.out.println (this.checkScript (script));
this.scriptLevelCount++;
if (script == null) script = "";
script = script.trim ();
if (script.startsWith ("!")) script = script.substring (1).trim ();
 else if (script.startsWith (">")) {
JU.Logger.error (script);
return true;
}if (script.indexOf ("<PeakData") >= 0) {
this.syncScript (script);
return true;
}JU.Logger.info ("RUNSCRIPT " + script);
var isOK = true;
var nErrorsLeft = 10;
var commandTokens =  new JSV.common.ScriptTokenizer (script, true);
var msg = null;
while (commandTokens != null && commandTokens.hasMoreTokens () && nErrorsLeft > 0 && isOK) {
var token = commandTokens.nextToken ();
var eachParam =  new JSV.common.ScriptTokenizer (token, false);
var key = JSV.common.ScriptToken.getKey (eachParam);
if (key == null) continue;
var st = JSV.common.ScriptToken.getScriptToken (key);
var value = JSV.common.ScriptToken.getValue (st, eachParam, token);
try {
switch (st) {
case JSV.common.ScriptToken.UNKNOWN:
JU.Logger.info ("Unrecognized parameter: " + key);
--nErrorsLeft;
break;
default:
if (this.selectedPanel == null) break;
this.parameters.set (this.pd (), st, value);
this.si.siUpdateBoolean (st, JSV.common.Parameters.isTrue (value));
break;
case JSV.common.ScriptToken.PEAKCALLBACKFUNCTIONNAME:
case JSV.common.ScriptToken.SYNCCALLBACKFUNCTIONNAME:
case JSV.common.ScriptToken.COORDCALLBACKFUNCTIONNAME:
case JSV.common.ScriptToken.LOADFILECALLBACKFUNCTIONNAME:
this.si.siExecSetCallback (st, value);
break;
case JSV.common.ScriptToken.DEFAULTLOADSCRIPT:
value = JU.PT.rep (value, "''", "\"");
this.defaultLoadScript = (value.length > 0 ? value : null);
break;
case JSV.common.ScriptToken.DEFAULTNMRNORMALIZATION:
this.nmrMaxY = JU.PT.parseFloat (value);
break;
case JSV.common.ScriptToken.AUTOINTEGRATE:
this.autoIntegrate = JSV.common.Parameters.isTrue (value);
break;
case JSV.common.ScriptToken.CLOSE:
this.execClose (value);
break;
case JSV.common.ScriptToken.DEBUG:
JU.Logger.setLogLevel (value.toLowerCase ().equals ("high") ? 6 : JSV.common.Parameters.isTrue (value) ? 5 : 4);
break;
case JSV.common.ScriptToken.GETPROPERTY:
var info = (this.selectedPanel == null ? null : this.getPropertyAsJavaObject (value));
if (info != null) this.selectedPanel.showMessage (JU.PT.toJSON (null, info), value);
break;
case JSV.common.ScriptToken.HELP:
this.execHelp (value);
break;
case JSV.common.ScriptToken.HIDDEN:
this.si.siExecHidden (JSV.common.Parameters.isTrue (value));
break;
case JSV.common.ScriptToken.INTEGRATIONRATIOS:
this.integrationRatios = value;
this.execIntegrate (null);
break;
case JSV.common.ScriptToken.INTERFACE:
this.interfaceOverlaid = this.checkOvelayInterface (value);
break;
case JSV.common.ScriptToken.INTEGRALOFFSET:
case JSV.common.ScriptToken.INTEGRALRANGE:
this.execSetIntegralParameter (st, Double.parseDouble (value));
break;
case JSV.common.ScriptToken.INVERTY:
this.execZoom ("invertY");
break;
case JSV.common.ScriptToken.JMOL:
this.si.syncToJmol (value);
break;
case JSV.common.ScriptToken.JSV:
this.syncScript (JU.PT.trimQuotes (value));
break;
case JSV.common.ScriptToken.LOAD:
if (value.length == 0) {
if (this.defaultLoadScript != null) this.runScriptNow (this.defaultLoadScript);
break;
}this.execLoad (value, (this.defaultLoadScript == null ? "" : this.defaultLoadScript + ";") + commandTokens.getRemainingScript ());
msg = (this.selectedPanel == null ? null : this.si.siLoaded (value));
commandTokens = null;
break;
case JSV.common.ScriptToken.LOADIMAGINARY:
this.loadImaginary = JSV.common.Parameters.isTrue (value);
break;
case JSV.common.ScriptToken.PEAK:
this.execPeak (value);
break;
case JSV.common.ScriptToken.PEAKLIST:
this.execPeakList (value);
break;
case JSV.common.ScriptToken.SCALEBY:
this.scaleSelectedBy (this.panelNodes, value);
break;
case JSV.common.ScriptToken.SCRIPT:
if (value.equals ("") || value.toLowerCase ().startsWith ("inline")) {
this.execScriptInline (value);
} else {
var s = JSV.common.JSVFileManager.getFileAsString (value);
if (s != null && this.scriptLevelCount < 100) this.runScriptNow (s);
}break;
case JSV.common.ScriptToken.SELECT:
this.execSelect (value);
break;
case JSV.common.ScriptToken.SPECTRUM:
case JSV.common.ScriptToken.SPECTRUMNUMBER:
if (!this.setSpectrum (value)) isOK = false;
break;
case JSV.common.ScriptToken.STACKOFFSETY:
this.execOverlayOffsetY (JU.PT.parseInt ("" + JU.PT.parseFloat (value)));
break;
case JSV.common.ScriptToken.TEST:
this.si.siExecTest (value);
break;
case JSV.common.ScriptToken.OVERLAY:
case JSV.common.ScriptToken.VIEW:
this.execView (value, true);
break;
case JSV.common.ScriptToken.HIGHLIGHT:
isOK = this.highlight (token);
break;
case JSV.common.ScriptToken.FINDX:
case JSV.common.ScriptToken.GETSOLUTIONCOLOR:
case JSV.common.ScriptToken.INTEGRATION:
case JSV.common.ScriptToken.INTEGRATE:
case JSV.common.ScriptToken.IRMODE:
case JSV.common.ScriptToken.LABEL:
case JSV.common.ScriptToken.LINK:
case JSV.common.ScriptToken.OVERLAYSTACKED:
case JSV.common.ScriptToken.PRINT:
case JSV.common.ScriptToken.SETPEAK:
case JSV.common.ScriptToken.SETX:
case JSV.common.ScriptToken.SHIFTX:
case JSV.common.ScriptToken.SHOWERRORS:
case JSV.common.ScriptToken.SHOWMEASUREMENTS:
case JSV.common.ScriptToken.SHOWMENU:
case JSV.common.ScriptToken.SHOWKEY:
case JSV.common.ScriptToken.SHOWPEAKLIST:
case JSV.common.ScriptToken.SHOWINTEGRATION:
case JSV.common.ScriptToken.SHOWPROPERTIES:
case JSV.common.ScriptToken.SHOWSOURCE:
case JSV.common.ScriptToken.YSCALE:
case JSV.common.ScriptToken.WRITE:
case JSV.common.ScriptToken.ZOOM:
if (this.isClosed ()) {
isOK = false;
break;
}switch (st) {
default:
break;
case JSV.common.ScriptToken.FINDX:
this.pd ().findX (null, Double.parseDouble (value));
break;
case JSV.common.ScriptToken.GETSOLUTIONCOLOR:
this.show ("solutioncolor" + value.toLowerCase ());
break;
case JSV.common.ScriptToken.INTEGRATION:
case JSV.common.ScriptToken.INTEGRATE:
this.execIntegrate (value);
break;
case JSV.common.ScriptToken.IRMODE:
this.execIRMode (value);
break;
case JSV.common.ScriptToken.LABEL:
this.pd ().addAnnotation (JSV.common.ScriptToken.getTokens (value));
break;
case JSV.common.ScriptToken.LINK:
this.pd ().linkSpectra (JSV.common.PanelData.LinkMode.getMode (value));
break;
case JSV.common.ScriptToken.OVERLAYSTACKED:
this.pd ().splitStack (!JSV.common.Parameters.isTrue (value));
break;
case JSV.common.ScriptToken.PRINT:
msg = this.execWrite (null);
break;
case JSV.common.ScriptToken.SETPEAK:
case JSV.common.ScriptToken.SETX:
case JSV.common.ScriptToken.SHIFTX:
this.execShiftSpectrum (st, token);
break;
case JSV.common.ScriptToken.SHOWERRORS:
this.show ("errors");
break;
case JSV.common.ScriptToken.SHOWINTEGRATION:
this.pd ().showAnnotation (JSV.common.Annotation.AType.Integration, JSV.common.Parameters.getTFToggle (value));
break;
case JSV.common.ScriptToken.SHOWKEY:
this.setOverlayLegendVisibility (JSV.common.Parameters.getTFToggle (value), true);
break;
case JSV.common.ScriptToken.SHOWMEASUREMENTS:
this.pd ().showAnnotation (JSV.common.Annotation.AType.Measurements, JSV.common.Parameters.getTFToggle (value));
break;
case JSV.common.ScriptToken.SHOWMENU:
this.showMenu (-2147483648, 0);
break;
case JSV.common.ScriptToken.SHOWPEAKLIST:
this.pd ().showAnnotation (JSV.common.Annotation.AType.PeakList, JSV.common.Parameters.getTFToggle (value));
break;
case JSV.common.ScriptToken.SHOWPROPERTIES:
this.show ("properties");
break;
case JSV.common.ScriptToken.SHOWSOURCE:
this.show ("source");
break;
case JSV.common.ScriptToken.YSCALE:
this.setYScale (value);
break;
case JSV.common.ScriptToken.WINDOW:
this.si.siNewWindow (JSV.common.Parameters.isTrue (value), false);
break;
case JSV.common.ScriptToken.WRITE:
msg = this.execWrite (value);
break;
case JSV.common.ScriptToken.ZOOM:
isOK = this.execZoom (value);
break;
}
break;
}
} catch (e) {
if (Clazz_exceptionOf (e, Exception)) {
msg = e.toString ();
JU.Logger.error (e.toString ());
isOK = false;
--nErrorsLeft;
} else {
throw e;
}
}
}
this.scriptLevelCount--;
this.si.siExecScriptComplete (msg, true);
return isOK;
}, "~S");
Clazz_defineMethod (c$, "execShiftSpectrum", 
 function (st, script) {
var tokens = JSV.common.ScriptToken.getTokens (script);
var xOld = NaN;
var xNew = NaN;
switch (tokens.size ()) {
case 2:
var value = tokens.get (1);
if (value.equals ("")) value = "?";
xNew = value.equalsIgnoreCase ("NONE") ? 1.7976931348623157E308 : value.equalsIgnoreCase ("?") ? NaN : Double.parseDouble (value);
break;
case 3:
xOld = Double.parseDouble (tokens.get (1));
xNew = Double.parseDouble (tokens.get (2));
break;
default:
Double.parseDouble ("");
}
var mode = 0;
switch (st) {
case JSV.common.ScriptToken.SETPEAK:
mode = 1;
break;
case JSV.common.ScriptToken.SETX:
mode = 2;
break;
case JSV.common.ScriptToken.SHIFTX:
mode = 3;
if (Double.isNaN (xNew)) Double.parseDouble ("");
break;
default:
return;
}
this.pd ().shiftSpectrum (mode, xOld, xNew);
}, "JSV.common.ScriptToken,~S");
Clazz_defineMethod (c$, "execClose", 
 function (value) {
var fromScript = (!value.startsWith ("!"));
if (!fromScript) value = value.substring (1);
this.close (JU.PT.trimQuotes (value));
if (!fromScript || this.panelNodes.size () == 0) this.si.siValidateAndRepaint (true);
}, "~S");
Clazz_defineMethod (c$, "checkOvelayInterface", 
function (value) {
return (value.equalsIgnoreCase ("single") || value.equalsIgnoreCase ("overlay"));
}, "~S");
Clazz_defineMethod (c$, "execPeak", 
 function (value) {
try {
var tokens = JSV.common.ScriptToken.getTokens (JU.PT.rep (value, "#", "INDEX="));
value = " type=\"" + tokens.get (0).toUpperCase () + "\" _match=\"" + JU.PT.trimQuotes (tokens.get (1).toUpperCase ()) + "\"";
if (tokens.size () > 2 && tokens.get (2).equalsIgnoreCase ("all")) value += " title=\"ALL\"";
this.processPeakPickEvent ( new JSV.common.PeakInfo (value), false);
} catch (e) {
if (Clazz_exceptionOf (e, Exception)) {
} else {
throw e;
}
}
}, "~S");
Clazz_defineMethod (c$, "execPeakList", 
 function (value) {
var p = this.parameters;
var b = JSV.common.Parameters.getTFToggle (value);
if (value.indexOf ("=") < 0) {
if (!this.isClosed ()) this.pd ().getPeakListing (null, b);
} else {
var tokens = JSV.common.ScriptToken.getTokens (value);
var threshold = p.peakListThreshold;
var interp = p.peakListInterpolation;
try {
for (var i = tokens.size (); --i >= 0; ) {
var token = tokens.get (i);
var pt = token.indexOf ("=");
if (pt <= 0) continue;
var key = token.substring (0, pt);
value = token.substring (pt + 1);
if (key.startsWith ("thr")) {
threshold = Double.$valueOf (value).doubleValue ();
} else if (key.startsWith ("int")) {
interp = (value.equalsIgnoreCase ("none") ? "NONE" : "parabolic");
}}
p.peakListThreshold = threshold;
p.peakListInterpolation = interp;
if (!this.isClosed ()) this.pd ().getPeakListing (p, Boolean.TRUE);
} catch (e) {
if (Clazz_exceptionOf (e, Exception)) {
} else {
throw e;
}
}
}}, "~S");
Clazz_defineMethod (c$, "highlight", 
 function (value) {
var tokens = JSV.common.ScriptToken.getTokens (value);
var n = tokens.size ();
switch (n) {
case 3:
case 5:
case 6:
case 7:
break;
case 2:
case 4:
if (tokens.get (n - 1).equalsIgnoreCase ("OFF")) break;
default:
return false;
}
if (!this.isClosed ()) {
var x1 = JU.PT.parseFloat (n > 1 ? tokens.get (1) : "");
var x2 = JU.PT.parseFloat (n > 2 ? tokens.get (2) : "");
var r = this.getRGB (n > 3 ? tokens.get (3) : "100");
var g = this.getRGB (n > 4 ? tokens.get (4) : "100");
var b = this.getRGB (n > 5 ? tokens.get (5) : "100");
var a = this.getRGB (n > 6 ? tokens.get (6) : "100");
if (Float.isNaN (x1) || Float.isNaN (x2)) {
this.pd ().removeAllHighlights ();
} else {
this.pd ().removeHighlight (x1, x2);
if (a < 0) a = 150;
if (r >= 0 && g >= 0 && b >= 0) this.pd ().addHighlight (null, x1, x2, null, r, g, b, a);
}this.repaint (true);
}return true;
}, "~S");
Clazz_defineMethod (c$, "getRGB", 
 function (s) {
var f = JU.PT.parseFloat (s);
return Clazz_floatToInt (Float.isNaN (f) ? -1 : f > 1 ? f : f * 255);
}, "~S");
Clazz_defineMethod (c$, "execZoom", 
 function (value) {
var x1 = 0;
var x2 = 0;
var y1 = 0;
var y2 = 0;
value = JU.PT.rep (value, " - ", " ").$replace (',', ' ');
var tokens = JSV.common.ScriptToken.getTokens (value);
switch (tokens.size ()) {
default:
return false;
case 0:
var v = this.pd ().getCurrentGraphSet ().getCurrentView ();
value = Math.round (v.minXOnScale * 100) / 100 + "," + Math.round (v.maxXOnScale * 100) / 100;
value = this.selectedPanel.getInput ("Enter zoom range x1 x2", "Zoom", value);
return (value == null || this.execZoom (value));
case 1:
value = tokens.get (0);
if (value.equalsIgnoreCase ("next")) {
this.pd ().nextView ();
} else if (value.toLowerCase ().startsWith ("prev")) {
this.pd ().previousView ();
} else if (value.equalsIgnoreCase ("out")) {
this.pd ().resetView ();
} else if (value.equalsIgnoreCase ("clear")) {
this.pd ().clearAllView ();
} else if (value.equalsIgnoreCase ("invertY")) {
this.pd ().getCurrentGraphSet ().invertYAxis ();
}return true;
case 2:
x1 = Double.parseDouble (tokens.get (0));
x2 = Double.parseDouble (tokens.get (1));
break;
case 3:
var xy = tokens.get (0);
if (xy.equalsIgnoreCase ("X")) {
x1 = Double.parseDouble (tokens.get (1));
x2 = Double.parseDouble (tokens.get (2));
} else if (xy.equalsIgnoreCase ("Y")) {
y1 = Double.parseDouble (tokens.get (1));
y2 = Double.parseDouble (tokens.get (2));
}break;
case 4:
x1 = Double.parseDouble (tokens.get (0));
y1 = Double.parseDouble (tokens.get (1));
x2 = Double.parseDouble (tokens.get (2));
y2 = Double.parseDouble (tokens.get (3));
}
this.pd ().setZoom (x1, y1, x2, y2);
return true;
}, "~S");
Clazz_defineMethod (c$, "scaleSelectedBy", 
 function (nodes, value) {
try {
var f = Double.parseDouble (value);
for (var i = nodes.size (); --i >= 0; ) nodes.get (i).pd ().scaleSelectedBy (f);

} catch (e) {
if (Clazz_exceptionOf (e, Exception)) {
} else {
throw e;
}
}
}, "JU.Lst,~S");
Clazz_defineMethod (c$, "pd", 
function () {
return (this.selectedPanel == null ? null : this.selectedPanel.getPanelData ());
});
Clazz_defineMethod (c$, "isClosed", 
 function () {
return (this.pd () == null);
});
Clazz_defineMethod (c$, "execSelect", 
 function (value) {
if (value.startsWith ("ID ")) {
if (!this.isClosed ()) try {
this.pd ().selectSpectrum (null, "ID", JU.PT.trimQuotes (value.substring (3)), true);
} catch (e) {
if (Clazz_exceptionOf (e, Exception)) {
} else {
throw e;
}
}
return;
}var nodes = this.panelNodes;
for (var i = nodes.size (); --i >= 0; ) nodes.get (i).pd ().selectFromEntireSet (-2147483648);

var speclist =  new JU.Lst ();
this.fillSpecList (value, speclist, false);
}, "~S");
Clazz_defineMethod (c$, "execView", 
function (value, fromScript) {
if (value.equals ("")) {
this.checkOverlay ();
return;
}var speclist =  new JU.Lst ();
var strlist = this.fillSpecList (value, speclist, true);
if (speclist.size () > 0) this.si.siOpenDataOrFile (null, strlist, speclist, strlist, -1, -1, false, null, null);
if (!fromScript) {
this.si.siValidateAndRepaint (false);
}}, "~S,~B");
Clazz_defineMethod (c$, "execIRMode", 
 function (value) {
var mode = JSV.common.Spectrum.IRMode.getMode (value);
var type = this.pd ().getSpectrum ().dataType;
for (var i = this.panelNodes.size (); --i >= 0; ) this.panelNodes.get (i).pd ().setIRMode (mode, type);

this.setIRmode (value);
}, "~S");
Clazz_defineMethod (c$, "execIntegrate", 
 function (value) {
if (this.isClosed ()) return;
this.pd ().checkIntegral (this.parameters, value);
if (this.integrationRatios != null) this.pd ().setIntegrationRatios (this.integrationRatios);
this.integrationRatios = null;
this.repaint (true);
}, "~S");
Clazz_defineMethod (c$, "repaint", 
 function (andTaintAll) {
this.selectedPanel.doRepaint (andTaintAll);
}, "~B");
Clazz_defineMethod (c$, "execSetIntegralParameter", 
 function (st, value) {
var p = this.parameters;
switch (st) {
case JSV.common.ScriptToken.INTEGRALRANGE:
p.integralRange = value;
break;
case JSV.common.ScriptToken.INTEGRALOFFSET:
p.integralOffset = value;
break;
}
if (!this.isClosed ()) this.pd ().checkIntegral (this.parameters, "update");
}, "JSV.common.ScriptToken,~N");
Clazz_defineMethod (c$, "setYScale", 
 function (value) {
var tokens = JSV.common.ScriptToken.getTokens (value);
var pt = 0;
var isAll = false;
if (tokens.size () > 1 && tokens.get (0).equalsIgnoreCase ("ALL")) {
isAll = true;
pt++;
}var y1 = Double.parseDouble (tokens.get (pt++));
var y2 = Double.parseDouble (tokens.get (pt));
if (isAll) {
var spec = this.pd ().getSpectrum ();
for (var i = this.panelNodes.size (); --i >= 0; ) {
var node = this.panelNodes.get (i);
if (node.source !== this.currentSource) continue;
if (JSV.common.Spectrum.areXScalesCompatible (spec, node.getSpectrum (), false, false)) node.pd ().setZoom (0, y1, 0, y2);
}
} else {
this.pd ().setZoom (0, y1, 0, y2);
}}, "~S");
Clazz_defineMethod (c$, "setOverlayLegendVisibility", 
 function (tftoggle, doSet) {
if (doSet) this.overlayLegendVisible = (tftoggle == null ? !this.overlayLegendVisible : tftoggle === Boolean.TRUE);
var node = JSV.common.PanelNode.findNode (this.selectedPanel, this.panelNodes);
for (var i = this.panelNodes.size (); --i >= 0; ) this.showOverlayLegend (this.panelNodes.get (i), this.panelNodes.get (i) === node && this.overlayLegendVisible);

}, "Boolean,~B");
Clazz_defineMethod (c$, "showOverlayLegend", 
 function (node, visible) {
var legend = node.legend;
if (legend == null && visible) {
legend = node.setLegend (node.pd ().getNumberOfSpectraInCurrentSet () > 1 && node.pd ().getNumberOfGraphSets () == 1 ? this.getDialog (JSV.common.Annotation.AType.OverlayLegend, null) : null);
}if (legend != null) legend.setVisible (visible);
}, "JSV.common.PanelNode,~B");
Clazz_defineMethod (c$, "syncScript", 
function (peakScript) {
if (peakScript.equals ("TEST")) peakScript = JSV.common.JSViewer.testScript;
JU.Logger.info ("JSViewer.syncScript Jmol>JSV " + peakScript);
if (peakScript.indexOf ("<PeakData") < 0) {
if (peakScript.startsWith ("JSVSTR:")) {
this.si.syncToJmol (peakScript);
return;
}this.runScriptNow (peakScript);
if (peakScript.indexOf ("#SYNC_PEAKS") >= 0) this.syncPeaksAfterSyncScript ();
return;
}JU.Logger.info (">>toJSV>> " + peakScript);
var sourceID = JU.PT.getQuotedAttribute (peakScript, "sourceID");
var type;
var model;
var file;
var jmolSource;
var index;
var atomKey;
if (sourceID == null) {
file = JU.PT.getQuotedAttribute (peakScript, "file");
index = JU.PT.getQuotedAttribute (peakScript, "index");
if (file == null || index == null) return;
file = JU.PT.rep (file, "#molfile", "");
model = JU.PT.getQuotedAttribute (peakScript, "model");
jmolSource = JU.PT.getQuotedAttribute (peakScript, "src");
var modelSent = (jmolSource != null && jmolSource.startsWith ("Jmol") ? null : this.returnFromJmolModel);
if (model != null && modelSent != null && !model.equals (modelSent)) {
JU.Logger.info ("JSV ignoring model " + model + "; should be " + modelSent);
return;
}this.returnFromJmolModel = null;
if (this.panelNodes.size () == 0 || !this.checkFileAlreadyLoaded (file)) {
JU.Logger.info ("file " + file + " not found -- JSViewer closing all and reopening");
this.si.siSyncLoad (file);
}type = JU.PT.getQuotedAttribute (peakScript, "type");
atomKey = null;
} else {
file = null;
index = model = sourceID;
atomKey = "," + JU.PT.getQuotedAttribute (peakScript, "atom") + ",";
type = "ID";
jmolSource = sourceID;
}var pi = this.selectPanelByPeak (file, index, atomKey);
var pd = this.pd ();
pd.selectSpectrum (file, type, model, true);
this.si.siSendPanelChange ();
pd.addPeakHighlight (pi);
this.repaint (true);
if (jmolSource == null || (pi != null && pi.getAtoms () != null)) this.si.syncToJmol (this.jmolSelect (pi));
}, "~S");
Clazz_defineMethod (c$, "syncPeaksAfterSyncScript", 
 function () {
var source = this.currentSource;
if (source == null) return;
try {
var file = "file=" + JU.PT.esc (source.getFilePath ());
var peaks = source.getSpectra ().get (0).getPeakList ();
var sb =  new JU.SB ();
sb.append ("[");
var n = peaks.size ();
for (var i = 0; i < n; i++) {
var s = peaks.get (i).toString ();
s = s + " " + file;
sb.append (JU.PT.esc (s));
if (i > 0) sb.append (",");
}
sb.append ("]");
this.si.syncToJmol ("Peaks: " + sb);
} catch (e) {
if (Clazz_exceptionOf (e, Exception)) {
} else {
throw e;
}
}
});
Clazz_defineMethod (c$, "checkFileAlreadyLoaded", 
 function (fileName) {
if (this.isClosed ()) return false;
if (this.pd ().hasFileLoaded (fileName)) return true;
for (var i = this.panelNodes.size (); --i >= 0; ) if (this.panelNodes.get (i).pd ().hasFileLoaded (fileName)) {
this.si.siSetSelectedPanel (this.panelNodes.get (i).jsvp);
return true;
}
return false;
}, "~S");
Clazz_defineMethod (c$, "selectPanelByPeak", 
 function (file, index, atomKey) {
if (this.panelNodes == null) return null;
var pi = null;
for (var i = this.panelNodes.size (); --i >= 0; ) this.panelNodes.get (i).pd ().addPeakHighlight (null);

pi = this.pd ().selectPeakByFileIndex (file, index, atomKey);
if (pi != null) {
this.setNode (JSV.common.PanelNode.findNode (this.selectedPanel, this.panelNodes));
} else {
for (var i = this.panelNodes.size (); --i >= 0; ) {
var node = this.panelNodes.get (i);
if ((pi = node.pd ().selectPeakByFileIndex (file, index, atomKey)) != null) {
this.setNode (node);
break;
}}
}return pi;
}, "~S,~S,~S");
Clazz_defineMethod (c$, "processPeakPickEvent", 
function (eventObj, isApp) {
var pi;
if (Clazz_instanceOf (eventObj, JSV.common.PeakInfo)) {
pi = eventObj;
var pi2 = this.pd ().findMatchingPeakInfo (pi);
if (pi2 == null) {
if (!"ALL".equals (pi.getTitle ())) return;
var node = null;
for (var i = 0; i < this.panelNodes.size (); i++) if ((pi2 = this.panelNodes.get (i).pd ().findMatchingPeakInfo (pi)) != null) {
node = this.panelNodes.get (i);
break;
}
if (node == null) return;
this.setNode (node);
}pi = pi2;
} else {
var e = (eventObj);
this.si.siSetSelectedPanel (e.getSource ());
pi = e.getPeakInfo ();
}this.pd ().addPeakHighlight (pi);
this.syncToJmol (pi);
if (pi.isClearAll ()) this.repaint (false);
 else this.pd ().selectSpectrum (pi.getFilePath (), pi.getType (), pi.getModel (), true);
this.si.siCheckCallbacks (pi.getTitle ());
}, "~O,~B");
Clazz_defineMethod (c$, "newStructToJmol", 
function (data) {
JU.Logger.info ("sending new structure to Jmol:\n" + data);
this.si.syncToJmol ("struct:" + data);
}, "~S");
Clazz_defineMethod (c$, "syncToJmol", 
 function (pi) {
this.repaint (true);
this.returnFromJmolModel = pi.getModel ();
this.si.syncToJmol (this.jmolSelect (pi));
}, "JSV.common.PeakInfo");
Clazz_defineMethod (c$, "sendPanelChange", 
function () {
var pd = this.pd ();
var spec = pd.getSpectrum ();
var pi = spec.getSelectedPeak ();
if (pi == null) pi = spec.getModelPeakInfoForAutoSelectOnLoad ();
if (pi == null) pi = spec.getBasePeakInfo ();
pd.addPeakHighlight (pi);
JU.Logger.info (Thread.currentThread () + "JSViewer sendFrameChange " + this.selectedPanel);
this.syncToJmol (pi);
});
Clazz_defineMethod (c$, "jmolSelect", 
 function (pi) {
var script = ("IR".equals (pi.getType ()) || "RAMAN".equals (pi.getType ()) ? "vibration ON; selectionHalos OFF;" : "vibration OFF; selectionhalos " + (pi.getAtoms () == null ? "OFF" : "ON"));
return "Select: " + pi + " script=\"" + script + " \" sourceID=\"" + this.pd ().getSpectrum ().sourceID + "\"";
}, "JSV.common.PeakInfo");
Clazz_defineMethod (c$, "getPropertyAsJavaObject", 
function (key) {
var map =  new java.util.Hashtable ();
if ("SOURCEID".equalsIgnoreCase (key)) {
map.put (key, (this.pd () == null ? "" : this.pd ().getSpectrum ().sourceID));
return map;
}if (key != null && key.startsWith ("DATA_")) {
map.put (key, "" + JSV.common.JSVFileManager.cacheGet (key.substring (5)));
return map;
}var isAll = false;
if (key != null && key.toUpperCase ().startsWith ("ALL ") || "all".equalsIgnoreCase (key)) {
key = key.substring (3).trim ();
isAll = true;
}if ("".equals (key)) key = null;
if ("NAMES".equalsIgnoreCase (key) || "KEYS".equalsIgnoreCase (key)) key = "";
var map0 = this.pd ().getInfo (true, key);
if (!isAll && map0 != null) return map0;
if (map0 != null) map.put ("current", map0);
var info =  new JU.Lst ();
for (var i = 0; i < this.panelNodes.size (); i++) {
var jsvp = this.panelNodes.get (i).jsvp;
if (jsvp == null) continue;
info.addLast (this.panelNodes.get (i).getInfo (key));
}
map.put ("items", info);
return map;
}, "~S");
Clazz_defineMethod (c$, "getCoordinate", 
function () {
if (!this.isClosed ()) {
var coord = this.pd ().getClickedCoordinate ();
if (coord != null) return coord.getXVal () + " " + coord.getYVal ();
}return "";
});
Clazz_defineMethod (c$, "fillSpecList", 
 function (value, speclist, isView) {
var prefix = "1.";
var list;
var list0 = null;
var isNone = (value.equalsIgnoreCase ("NONE"));
if (isNone || value.equalsIgnoreCase ("all")) value = "*";
if (value.indexOf ("*") < 0) {
var tokens = value.$plit (" ");
var sb =  new JU.SB ();
for (var i = 0; i < tokens.length; i++) {
var pt = tokens[i].indexOf ('.');
if (pt != tokens[i].lastIndexOf ('.')) tokens[i] = tokens[i].substring (0, pt + 1) + tokens[i].substring (pt + 1).$replace ('.', '_');
sb.append (tokens[i]).append (" ");
}
value = sb.toString ().trim ();
}if (value.equals ("*")) {
list = JSV.common.ScriptToken.getTokens (JSV.common.PanelNode.getSpectrumListAsString (this.panelNodes));
} else if (value.startsWith ("\"") || value.startsWith ("'")) {
list = JSV.common.ScriptToken.getTokens (value);
} else {
value = JU.PT.rep (value, "_", " _ ");
value = JU.PT.rep (value, "-", " - ");
list = JSV.common.ScriptToken.getTokens (value);
list0 = JSV.common.ScriptToken.getTokens (JSV.common.PanelNode.getSpectrumListAsString (this.panelNodes));
if (list0.size () == 0) return null;
}var id0 = (this.isClosed () ? prefix : JSV.common.PanelNode.findNode (this.selectedPanel, this.panelNodes).id);
id0 = id0.substring (0, id0.indexOf (".") + 1);
var sb =  new JU.SB ();
var n = list.size ();
var idLast = null;
for (var i = 0; i < n; i++) {
var id = list.get (i);
var userYFactor = NaN;
var isubspec = -1;
if (i + 1 < n && list.get (i + 1).equals ("*")) {
i += 2;
userYFactor = Double.parseDouble (list.get (i));
} else if (i + 1 < n && list.get (i + 1).equals ("_")) {
i += 2;
isubspec = Integer.parseInt (list.get (i));
}if (id.equals ("-")) {
if (idLast == null) idLast = list0.get (0);
id = (i + 1 == n ? list0.get (list0.size () - 1) : list.get (++i));
if (!id.contains (".")) id = id0 + id;
var pt = 0;
while (pt < list0.size () && !list0.get (pt).equals (idLast)) pt++;

pt++;
while (pt < list0.size () && !idLast.equals (id)) {
var node = JSV.common.PanelNode.findNodeById ((idLast = list0.get (pt++)), this.panelNodes);
speclist.addLast (node.pd ().getSpectrumAt (0));
sb.append (",").append (idLast);
}
continue;
}var node;
if (id.startsWith ("'") && id.endsWith ("'")) id = "\"" + JU.PT.trim (id, "'") + "\"";
if (id.startsWith ("\"")) {
id = JU.PT.trim (id, "\"");
var pn = this.panelNodes.size ();
for (var j = 0; j < pn; j++) {
node = this.panelNodes.get (j);
if (node.fileName != null && node.fileName.startsWith (id) || node.frameTitle != null && node.frameTitle.startsWith (id)) {
this.addSpecToList (node.pd (), userYFactor, -1, speclist, isView);
sb.append (",").append (node.id);
}}
continue;
}if (!id.contains (".")) id = id0 + id;
node = JSV.common.PanelNode.findNodeById (id, this.panelNodes);
if (node == null) continue;
idLast = id;
this.addSpecToList (node.pd (), userYFactor, isubspec, speclist, isView);
sb.append (",").append (id);
if (isubspec > 0) sb.append (".").appendI (isubspec);
}
if (isView && speclist.size () > 0) {
var node = JSV.common.PanelNode.findNodeById (sb.substring (1), this.panelNodes);
if (node != null) {
this.setNode (node);
speclist.clear ();
}}return (isNone ? "NONE" : sb.length () > 0 ? sb.toString ().substring (1) : null);
}, "~S,JU.Lst,~B");
Clazz_defineMethod (c$, "addSpecToList", 
 function (pd, userYFactor, isubspec, list, isView) {
if (isView) {
var spec = pd.getSpectrumAt (0);
spec.setUserYFactor (Double.isNaN (userYFactor) ? 1 : userYFactor);
pd.addToList (isubspec - 1, list);
} else {
pd.selectFromEntireSet (isubspec - 1);
}}, "JSV.common.PanelData,~N,~N,JU.Lst,~B");
Clazz_defineMethod (c$, "getSolutionColor", 
function (asFitted) {
var spectrum = this.pd ().getSpectrum ();
var vi = (spectrum.canShowSolutionColor () ? JSV.common.JSViewer.getInterface ("JSV.common.Visible") : null);
return (vi == null ? -1 : vi.getColour (spectrum, asFitted));
}, "~B");
Clazz_defineMethod (c$, "openDataOrFile", 
function (data, name, specs, strUrl, firstSpec, lastSpec, isAppend, id) {
if ("NONE".equals (name)) {
this.close ("View*");
return 0;
}this.si.writeStatus ("");
var filePath = null;
var newPath = null;
var fileName = null;
var isView = false;
if (strUrl != null && strUrl.startsWith ("cache://")) {
{
data = Jmol.Cache.get(name = strUrl);
}}if (data != null) {
try {
fileName = name;
newPath = filePath = JSV.common.JSVFileManager.getFullPathName (name);
} catch (e) {
if (Clazz_exceptionOf (e, JSV.exception.JSVException)) {
} else {
throw e;
}
}
} else if (specs != null) {
isView = true;
newPath = fileName = filePath = "View" + (++this.nViews);
} else if (strUrl != null) {
try {
var u =  new java.net.URL (JSV.common.JSVFileManager.appletDocumentBase, strUrl, null);
filePath = u.toString ();
this.recentURL = filePath;
fileName = JSV.common.JSVFileManager.getTagName (filePath);
} catch (e) {
if (Clazz_exceptionOf (e, java.net.MalformedURLException)) {
var file = this.apiPlatform.newFile (strUrl);
fileName = file.getName ();
newPath = filePath = file.getFullPath ();
this.recentURL = null;
} else {
throw e;
}
}
}var pt = -1;
if ((pt = JSV.common.PanelNode.isOpen (this.panelNodes, filePath)) >= 0 || (pt = JSV.common.PanelNode.isOpen (this.panelNodes, strUrl)) >= 0) {
if (isView) {
--this.nViews;
this.setNode (this.panelNodes.get (pt));
} else {
this.si.writeStatus (filePath + " is already open");
}return -1;
}if (!isAppend && !isView) this.close ("all");
this.si.setCursor (3);
try {
this.si.siSetCurrentSource (isView ? JSV.source.JDXSource.createView (specs) : JSV.source.JDXReader.createJDXSource (data, filePath, this.obscureTitleFromUser === Boolean.TRUE, this.loadImaginary, firstSpec, lastSpec, this.nmrMaxY));
} catch (e) {
if (Clazz_exceptionOf (e, Exception)) {
{
alert(e.toString())
}this.si.setCursor (0);
if (this.isApplet) {
this.selectedPanel.showMessage (e.toString (), "Error Opening File");
}return -3;
} else {
throw e;
}
}
this.si.setCursor (0);
System.gc ();
if (newPath == null) {
newPath = this.currentSource.getFilePath ();
if (newPath != null) fileName = newPath.substring (newPath.lastIndexOf ("/") + 1);
} else {
this.currentSource.setFilePath (newPath);
}if (id == null && !isView) id = newPath;
if (id != null) this.currentSource.setID (id);
this.si.siSetLoaded (fileName, newPath);
var spec = this.currentSource.getJDXSpectrum (0);
if (spec == null) {
return -4;
}specs = this.currentSource.getSpectra ();
JSV.common.Spectrum.process (specs, this.irMode);
var autoOverlay = this.interfaceOverlaid || spec.isAutoOverlayFromJmolClick ();
var combine = isView || autoOverlay && this.currentSource.isCompoundSource;
if (combine) {
this.combineSpectra ((isView ? strUrl : null));
} else {
this.splitSpectra ();
}this.pd ().setTaintedAll ();
if (!isView) this.si.siUpdateRecentMenus (filePath);
return 0;
}, "~O,~S,JU.Lst,~S,~N,~N,~B,~S");
Clazz_defineMethod (c$, "close", 
function (value) {
var n0 = 0;
var pt = (value == null ? -2 : value.indexOf (">"));
if (pt > 0) {
n0 = JU.PT.parseInt (value.substring (pt + 1).trim ());
value = value.substring (0, pt).trim ();
}if ("*".equals (value)) value = "all";
var isAll = (value === "all");
if (value == null || n0 == 0 && value.equalsIgnoreCase ("all")) {
this.closeSource (null);
return;
}var isViews = value.equalsIgnoreCase ("views");
var list =  new JU.Lst ();
var source;
value = value.$replace ('\\', '/');
var n = this.panelNodes.size ();
var nMax = n - n0;
if (value.endsWith ("*")) {
value = value.substring (0, value.length - 1);
for (var i = n; --i >= 0; ) if (this.panelNodes.get (i).fileName.startsWith (value)) list.addLast (this.panelNodes.get (i).source);

} else if (value.equalsIgnoreCase ("selected")) {
var lastSource = null;
for (var i = n; --i >= 0; ) {
source = this.panelNodes.get (i).source;
if (this.panelNodes.get (i).isSelected && (lastSource == null || lastSource !== source)) list.addLast (source);
lastSource = source;
}
} else if (isAll || isViews || value.equalsIgnoreCase ("simulations")) {
for (var n1 = 0, i = n; --i >= 0 && n1 < nMax; ) if (isAll ? true : isViews ? this.panelNodes.get (i).isView : this.panelNodes.get (i).isSimulation) {
list.addLast (this.panelNodes.get (i).source);
n1++;
}
} else {
source = (value.length == 0 ? this.currentSource : JSV.common.PanelNode.findSourceByNameOrId (value, this.panelNodes));
if (source != null) list.addLast (source);
}for (var i = list.size (); --i >= 0; ) this.closeSource (list.get (i));

if (this.selectedPanel == null && this.panelNodes.size () > 0) this.si.siSetSelectedPanel (JSV.common.PanelNode.getLastFileFirstNode (this.panelNodes));
}, "~S");
Clazz_defineMethod (c$, "execLoad", 
function (value, script) {
var applet = this.html5Applet;
var isID = false;
if (isID) {
applet._search (value);
return;
}var tokens = JSV.common.ScriptToken.getTokens (value);
var filename = tokens.get (0);
var id = null;
var pt = 0;
if (filename.equalsIgnoreCase ("ID")) {
id = JU.PT.trimQuotes (tokens.get (1));
filename = tokens.get (2);
pt = 2;
}var isAppend = filename.equalsIgnoreCase ("APPEND");
var isCheck = filename.equalsIgnoreCase ("CHECK");
if (isAppend || isCheck) pt++;
if (pt > 0) filename = tokens.get (pt);
if (script == null) script = this.defaultLoadScript;
if (filename.equals ("?")) {
this.openFileFromDialog (isAppend, false, null, script);
return;
}if (filename.equals ("http://?")) {
this.openFileFromDialog (isAppend, true, null, null);
return;
}if (filename.equals ("$?") || filename.equals ("$H1?")) {
this.openFileFromDialog (isAppend, true, "H1", null);
return;
}if (filename.equals ("$C13?")) {
this.openFileFromDialog (isAppend, true, "C13", null);
return;
}var isH1 = filename.equalsIgnoreCase ("MOL") || filename.equalsIgnoreCase ("H1");
var isC13 = filename.equalsIgnoreCase ("C13");
if (isH1 || isC13) filename = "http://SIMULATION/" + (isH1 ? "H1/" : "C13/") + "MOL=" + JU.PT.trimQuotes (tokens.get (++pt));
if (!isCheck && !isAppend) {
if (filename.equals ("\"\"") && this.currentSource != null) filename = this.currentSource.getFilePath ();
this.close ("all");
}filename = JU.PT.trimQuotes (filename);
var isSimulation = filename.startsWith ("$");
if (isSimulation) {
if (!filename.startsWith ("$H1") && !filename.startsWith ("$C13")) filename = "$H1/" + filename.substring (1);
filename = "http://SIMULATION/" + filename.substring (1);
}var firstSpec = (pt + 1 < tokens.size () ? Integer.$valueOf (tokens.get (++pt)).intValue () : -1);
var lastSpec = (pt + 1 < tokens.size () ? Integer.$valueOf (tokens.get (++pt)).intValue () : firstSpec);
this.si.siOpenDataOrFile (null, null, null, filename, firstSpec, lastSpec, isAppend, script, id);
if (isSimulation) {
this.close ("views");
this.execView ("*", true);
}}, "~S,~S");
Clazz_defineMethod (c$, "combineSpectra", 
function (name) {
var source = this.currentSource;
var specs = source.getSpectra ();
var haveSimulation = false;
for (var i = specs.size (); --i >= 0; ) if (specs.get (i).isSimulation) {
haveSimulation = true;
break;
}
var jsvp = this.si.siGetNewJSVPanel2 (specs);
jsvp.setTitle (source.getTitle ());
if (jsvp.getTitle ().equals ("")) {
jsvp.getPanelData ().setViewTitle (source.getFilePath ());
jsvp.setTitle (name);
}this.si.siSetPropertiesFromPreferences (jsvp, true);
this.spectraTree.createTree (++this.fileCount, source,  Clazz_newArray (-1, [jsvp])).getPanelNode ().isView = true;
var node = JSV.common.PanelNode.findNode (this.selectedPanel, this.panelNodes);
node.setFrameTitle (name);
node.isView = true;
if (this.autoShowLegend && this.pd ().getNumberOfGraphSets () == 1) node.setLegend (this.getDialog (JSV.common.Annotation.AType.OverlayLegend, null));
this.si.siSetMenuEnables (node, false);
if (haveSimulation) this.pd ().splitStack (true);
}, "~S");
Clazz_defineMethod (c$, "closeSource", 
function (source) {
var rootNode = this.spectraTree.getRootNode ();
var fileName = (source == null ? null : source.getFilePath ());
var toDelete =  new JU.Lst ();
var enume = rootNode.children ();
while (enume.hasMoreElements ()) {
var node = enume.nextElement ();
if (fileName == null || node.getPanelNode ().source.matchesFilePath (fileName)) {
JU.Logger.info ("Closing " + node.getPanelNode ().source.getFilePath ());
for (var e = node.children (); e.hasMoreElements (); ) {
var childNode = e.nextElement ();
toDelete.addLast (childNode);
this.panelNodes.removeObj (childNode.getPanelNode ());
}
toDelete.addLast (node);
if (fileName != null) break;
}}
this.spectraTree.deleteNodes (toDelete);
if (source == null) {
if (this.currentSource != null) this.currentSource.dispose ();
this.currentSource = null;
if (this.selectedPanel != null) this.selectedPanel.dispose ();
} else {
}if (this.currentSource === source) {
this.si.siSetSelectedPanel (null);
this.si.siSetCurrentSource (null);
}var max = 0;
for (var i = 0; i < this.panelNodes.size (); i++) {
var f = JU.PT.parseFloat (this.panelNodes.get (i).id);
if (f >= max + 1) max = Clazz_doubleToInt (Math.floor (f));
}
this.fileCount = max;
System.gc ();
if (JU.Logger.debugging) JU.Logger.checkMemory ();
this.si.siSourceClosed (source);
}, "JSV.source.JDXSource");
Clazz_defineMethod (c$, "setFrameAndTreeNode", 
function (i) {
if (this.panelNodes == null || i < 0 || i >= this.panelNodes.size ()) return;
this.setNode (this.panelNodes.get (i));
}, "~N");
Clazz_defineMethod (c$, "selectFrameNode", 
function (jsvp) {
var node = JSV.common.PanelNode.findNode (jsvp, this.panelNodes);
if (node == null) return null;
this.spectraTree.setPath (this.spectraTree.newTreePath (node.treeNode.getPath ()));
this.setOverlayLegendVisibility (null, false);
return node;
}, "JSV.api.JSVPanel");
Clazz_defineMethod (c$, "setSpectrum", 
 function (value) {
if (value.indexOf ('.') >= 0) {
var node = JSV.common.PanelNode.findNodeById (value, this.panelNodes);
if (node == null) return false;
this.setNode (node);
} else {
var n = JU.PT.parseInt (value);
if (n <= 0) {
this.checkOverlay ();
return false;
}this.setFrameAndTreeNode (n - 1);
}return true;
}, "~S");
Clazz_defineMethod (c$, "splitSpectra", 
function () {
var source = this.currentSource;
var specs = source.getSpectra ();
var panels =  new Array (specs.size ());
var jsvp = null;
for (var i = 0; i < specs.size (); i++) {
var spec = specs.get (i);
jsvp = this.si.siGetNewJSVPanel (spec);
this.si.siSetPropertiesFromPreferences (jsvp, true);
panels[i] = jsvp;
}
this.spectraTree.createTree (++this.fileCount, source, panels);
this.si.siGetNewJSVPanel (null);
var node = JSV.common.PanelNode.findNode (this.selectedPanel, this.panelNodes);
this.si.siSetMenuEnables (node, true);
});
Clazz_defineMethod (c$, "selectedTreeNode", 
function (node) {
if (node == null) {
return;
}if (node.isLeaf ()) {
this.setNode (node.getPanelNode ());
} else {
System.out.println ("not a leaf");
}this.si.siSetCurrentSource (node.getPanelNode ().source);
}, "JSV.api.JSVTreeNode");
Clazz_defineMethod (c$, "dispose", 
function () {
this.fileHelper = null;
if (this.viewDialog != null) this.viewDialog.dispose ();
this.viewDialog = null;
if (this.overlayLegendDialog != null) this.overlayLegendDialog.dispose ();
this.overlayLegendDialog = null;
if (this.jsvpPopupMenu != null) {
this.jsvpPopupMenu.jpiDispose ();
this.jsvpPopupMenu = null;
}if (this.panelNodes != null) for (var i = this.panelNodes.size (); --i >= 0; ) {
this.panelNodes.get (i).dispose ();
this.panelNodes.removeItemAt (i);
}
});
Clazz_defineMethod (c$, "runScript", 
function (script) {
if (this.scriptQueue == null) this.si.siProcessCommand (script);
 else this.scriptQueue.addLast (script);
}, "~S");
Clazz_defineMethod (c$, "requestRepaint", 
function () {
if (this.selectedPanel != null) this.repaintManager.refresh ();
});
Clazz_defineMethod (c$, "repaintDone", 
function () {
this.repaintManager.repaintDone ();
});
Clazz_defineMethod (c$, "checkOverlay", 
function () {
if (this.mainPanel != null) this.markSelectedPanels (this.panelNodes, this.mainPanel.getCurrentPanelIndex ());
this.viewDialog = this.getDialog (JSV.common.Annotation.AType.Views, null);
});
Clazz_defineMethod (c$, "markSelectedPanels", 
 function (panelNodes, ip) {
for (var i = panelNodes.size (); --i >= 0; ) panelNodes.get (i).isSelected = (ip == i);

}, "JU.Lst,~N");
Clazz_defineMethod (c$, "execOverlayOffsetY", 
 function (offset) {
if (offset == -2147483648) {
if (this.selectedPanel == null) return;
var soffset = this.selectedPanel.getInput ("Enter a vertical offset in percent for stacked plots", "Overlay", "" + this.recentStackPercent);
var f = JU.PT.parseFloat (soffset);
if (Float.isNaN (f)) return;
offset = Clazz_floatToInt (f);
}this.recentStackPercent = offset;
this.parameters.viewOffset = offset;
if (this.isClosed ()) this.pd ().setYStackOffsetPercent (offset);
}, "~N");
Clazz_defineMethod (c$, "execScriptInline", 
 function (script) {
if (script.length > 0) script = script.substring (6).trim ();
if (script.length == 0) script = this.selectedPanel.getInput ("Enter a JSpecView script", "Script", this.recentScript);
if (script == null) return;
this.recentScript = script;
this.runScriptNow (script);
}, "~S");
Clazz_defineMethod (c$, "setDisplay", 
function (canvas) {
this.apiPlatform.setViewer (this, this.display = canvas);
var wh =  Clazz_newIntArray (2, 0);
this.apiPlatform.getFullScreenDimensions (canvas, wh);
this.setScreenDimension (wh[0], wh[1]);
}, "~O");
Clazz_defineMethod (c$, "setScreenDimension", 
function (width, height) {
height = Math.min (height, this.maximumSize);
width = Math.min (width, this.maximumSize);
if (this.screenWidth == width && this.screenHeight == height) return;
this.resizeImage (width, height);
}, "~N,~N");
Clazz_defineMethod (c$, "resizeImage", 
function (width, height) {
if (width > 0) {
this.screenWidth = width;
this.screenHeight = height;
} else {
width = (this.screenWidth == 0 ? this.screenWidth = 500 : this.screenWidth);
height = (this.screenHeight == 0 ? this.screenHeight = 500 : this.screenHeight);
}this.g2d.setWindowParameters (width, height);
}, "~N,~N");
Clazz_defineMethod (c$, "updateJS", 
function () {
if (this.selectedPanel != null) this.selectedPanel.paintComponent (this.apiPlatform.getGraphics (null));
});
Clazz_defineMethod (c$, "processMouseEvent", 
function (id, x, y, modifiers, time) {
return (this.selectedPanel != null && this.selectedPanel.processMouseEvent (id, x, y, modifiers, time));
}, "~N,~N,~N,~N,~N");
Clazz_defineMethod (c$, "processTwoPointGesture", 
function (touches) {
if (!this.isClosed ()) this.selectedPanel.processTwoPointGesture (touches);
}, "~A");
Clazz_defineMethod (c$, "getApplet", 
function () {
return this.html5Applet;
});
Clazz_defineMethod (c$, "openFileAsyncSpecial", 
function (fileName, flags) {
var ans = (this.currentSource == null ? "NO" : this.getDialogManager ().getDialogInput (this, "Do you want to append this file? (Answer NO to replace.)", "Drag/Drop Action", 3, null, null, "YES"));
if (ans == null) return;
var pre = (ans.toLowerCase ().startsWith ("y") ? "append" : "");
var post = (pre === "" ? "" : "; view *");
this.runScript ("load " + pre + " \"" + fileName + "\"" + post);
}, "~S,~N");
Clazz_defineMethod (c$, "getHeight", 
function () {
return this.screenHeight;
});
Clazz_defineMethod (c$, "getWidth", 
function () {
return this.screenWidth;
});
Clazz_defineMethod (c$, "getPlatformInterface", 
function (type) {
return JSV.common.JSViewer.getInterface ("JSV." + (JSV.common.JSViewer.isJS ? "js2d.Js" : "java.Awt") + type);
}, "~S");
Clazz_defineMethod (c$, "getDialogManager", 
function () {
if (this.dialogManager != null) return this.dialogManager;
this.dialogManager = this.getPlatformInterface ("DialogManager");
return this.dialogManager.set (this);
});
Clazz_defineMethod (c$, "getDialog", 
function (type, spec) {
var root = "JSV.dialog.";
switch (type) {
case JSV.common.Annotation.AType.Integration:
return (JSV.common.JSViewer.getInterface (root + "IntegrationDialog")).setParams ("Integration for " + spec, this, spec);
case JSV.common.Annotation.AType.Measurements:
return (JSV.common.JSViewer.getInterface (root + "MeasurementsDialog")).setParams ("Measurements for " + spec, this, spec);
case JSV.common.Annotation.AType.PeakList:
return (JSV.common.JSViewer.getInterface (root + "PeakListDialog")).setParams ("Peak List for " + spec, this, spec);
case JSV.common.Annotation.AType.OverlayLegend:
return this.overlayLegendDialog = (JSV.common.JSViewer.getInterface (root + "OverlayLegendDialog")).setParams (this.pd ().getViewTitle (), this, null);
case JSV.common.Annotation.AType.Views:
return this.viewDialog = (JSV.common.JSViewer.getInterface (root + "ViewsDialog")).setParams ("View/Combine/Close Spectra", this, null);
default:
return null;
}
}, "JSV.common.Annotation.AType,JSV.common.Spectrum");
Clazz_defineMethod (c$, "show", 
 function (what) {
this.getDialogManager ();
if (what.equals ("properties")) {
this.dialogManager.showProperties (null, this.pd ().getSpectrum ());
} else if (what.equals ("errors")) {
this.dialogManager.showSourceErrors (null, this.currentSource);
} else if (what.equals ("source")) {
if (this.currentSource == null) {
if (this.panelNodes.size () > 0) this.dialogManager.showMessageDialog (null, "Please Select a Spectrum", "Select Spectrum", 0);
return;
}this.dialogManager.showSource (this, this.pd ().getSpectrum ());
} else if (what.startsWith ("solutioncolorfill")) {
if (what.indexOf ("all") >= 0) {
for (var i = this.panelNodes.size (); --i >= 0; ) this.panelNodes.get (i).pd ().setSolutionColor (what);

} else {
this.pd ().setSolutionColor (what);
}} else if (what.startsWith ("solutioncolor")) {
var msg = this.getSolutionColorStr (what.indexOf ("false") < 0);
msg = "background-color:rgb(" + msg + ")'><br />Predicted Solution Colour- RGB(" + msg + ")<br /><br />";
if (JSV.common.JSViewer.isJS) {
this.dialogManager.showMessage (this, "<div style='width:100%;height:100%;" + msg + "</div>", "Predicted Colour");
} else {
this.selectedPanel.showMessage ("<html><body style='" + msg + "</body></html>", "Predicted Colour");
}}}, "~S");
Clazz_defineMethod (c$, "getDialogPrint", 
function (isJob) {
if (!JSV.common.JSViewer.isJS) try {
var pl = (this.getPlatformInterface ("PrintDialog")).set (this.offWindowFrame, this.lastPrintLayout, isJob).getPrintLayout ();
if (pl != null) this.lastPrintLayout = pl;
return pl;
} catch (e) {
if (Clazz_exceptionOf (e, Exception)) {
} else {
throw e;
}
}
return  new JSV.common.PrintLayout (this.pd ());
}, "~B");
Clazz_defineMethod (c$, "setIRmode", 
function (mode) {
if (mode.equals ("AtoT")) {
this.irMode = JSV.common.Spectrum.IRMode.TO_TRANS;
} else if (mode.equals ("TtoA")) {
this.irMode = JSV.common.Spectrum.IRMode.TO_ABS;
} else {
this.irMode = JSV.common.Spectrum.IRMode.getMode (mode);
}}, "~S");
Clazz_defineMethod (c$, "getOptionFromDialog", 
function (items, title, label) {
return this.getDialogManager ().getOptionFromDialog (null, items, this.selectedPanel, title, label);
}, "~A,~S,~S");
Clazz_defineMethod (c$, "print", 
function (fileName) {
return this.execWrite ("PDF \"" + fileName + "\"");
}, "~S");
Clazz_defineMethod (c$, "execWrite", 
 function (value) {
if (JSV.common.JSViewer.isJS && value == null) value = "PDF";
var msg = (JSV.common.JSViewer.getInterface ("JSV.export.Exporter")).write (this, value == null ? null : JSV.common.ScriptToken.getTokens (value), false);
this.si.writeStatus (msg);
return msg;
}, "~S");
Clazz_defineMethod (c$, "$export", 
function (type, n) {
if (type == null) type = "XY";
var pd = this.pd ();
var nMax = pd.getNumberOfSpectraInCurrentSet ();
if (n < -1 || n >= nMax) return "Maximum spectrum index (0-based) is " + (nMax - 1) + ".";
var spec = (n < 0 ? pd.getSpectrum () : pd.getSpectrumAt (n));
try {
return (JSV.common.JSViewer.getInterface ("JSV.export.Exporter")).exportTheSpectrum (this, JSV.common.ExportType.getType (type), null, spec, 0, spec.getXYCoords ().length - 1, null, type.equalsIgnoreCase ("PDF"));
} catch (e) {
if (Clazz_exceptionOf (e, Exception)) {
JU.Logger.error (e.toString ());
return null;
} else {
throw e;
}
}
}, "~S,~N");
Clazz_overrideMethod (c$, "postByteArray", 
function (fileName, bytes) {
return JSV.common.JSVFileManager.postByteArray (fileName, bytes);
}, "~S,~A");
Clazz_defineMethod (c$, "getOutputChannel", 
function (fileName, isBinary) {
var os = null;
{
while (fileName.startsWith("/")) fileName =
fileName.substring(1);
}return  new JU.OC ().setParams (this, fileName, !isBinary, os);
}, "~S,~B");
c$.getInterface = Clazz_defineMethod (c$, "getInterface", 
function (name) {
try {
var x = Clazz._4Name (name);
return (x == null ? null : x.newInstance ());
} catch (e) {
if (Clazz_exceptionOf (e, Exception)) {
JU.Logger.error ("Interface.java Error creating instance for " + name + ": \n" + e);
return null;
} else {
throw e;
}
}
}, "~S");
Clazz_defineMethod (c$, "showMessage", 
function (msg) {
if (this.selectedPanel != null && msg != null) this.selectedPanel.showMessage (msg, null);
}, "~S");
Clazz_defineMethod (c$, "openFileFromDialog", 
function (isAppend, isURL, simulationType, script) {
var url = null;
if (simulationType != null) {
url = this.fileHelper.getUrlFromDialog ("Enter the name or identifier of a compound", this.recentSimulation);
if (url == null) return;
this.recentSimulation = url;
url = "$" + simulationType + "/" + url;
} else if (isURL) {
url = this.fileHelper.getUrlFromDialog ("Enter the URL of a JCAMP-DX File", this.recentURL == null ? this.recentOpenURL : this.recentURL);
if (url == null) return;
this.recentOpenURL = url;
} else {
var userData =  Clazz_newArray (-1, [Boolean.$valueOf (isAppend), script]);
var file = this.fileHelper.showFileOpenDialog (this.mainPanel, userData);
if (file != null) url = file.getFullPath ();
}if (url != null) this.runScriptNow ("load " + (isAppend ? "APPEND " : "") + "\"" + url + "\"" + (script == null ? "" : ";" + script));
}, "~B,~B,~S,~S");
Clazz_defineMethod (c$, "openFile", 
function (fileName, closeFirst) {
if (closeFirst && this.panelNodes != null) {
var source = JSV.common.PanelNode.findSourceByNameOrId (( new java.io.File (fileName)).getAbsolutePath (), this.panelNodes);
if (source != null) this.closeSource (source);
}this.si.siOpenDataOrFile (null, null, null, fileName, -1, -1, true, this.defaultLoadScript, null);
}, "~S,~B");
Clazz_defineMethod (c$, "selectPanel", 
function (jsvp, panelNodes) {
var iPanel = -1;
if (panelNodes != null) {
for (var i = panelNodes.size (); --i >= 0; ) {
var j = panelNodes.get (i).jsvp;
if (j === jsvp) {
iPanel = i;
} else {
j.setEnabled (false);
j.setFocusable (false);
j.getPanelData ().closeAllDialogsExcept (JSV.common.Annotation.AType.NONE);
}}
this.markSelectedPanels (panelNodes, iPanel);
}return iPanel;
}, "JSV.api.JSVPanel,JU.Lst");
Clazz_defineMethod (c$, "checkAutoIntegrate", 
function () {
if (this.autoIntegrate) this.pd ().integrateAll (this.parameters);
});
Clazz_defineMethod (c$, "parseInitScript", 
function (params) {
if (params == null) params = "";
var allParamTokens =  new JSV.common.ScriptTokenizer (params, true);
if (JU.Logger.debugging) {
JU.Logger.info ("Running in DEBUG mode");
}while (allParamTokens.hasMoreTokens ()) {
var token = allParamTokens.nextToken ();
var eachParam =  new JSV.common.ScriptTokenizer (token, false);
var key = eachParam.nextToken ();
if (key.equalsIgnoreCase ("SET")) key = eachParam.nextToken ();
key = key.toUpperCase ();
var st = JSV.common.ScriptToken.getScriptToken (key);
var value = JSV.common.ScriptToken.getValue (st, eachParam, token);
JU.Logger.info ("KEY-> " + key + " VALUE-> " + value + " : " + st);
try {
switch (st) {
default:
this.parameters.set (null, st, value);
break;
case JSV.common.ScriptToken.UNKNOWN:
break;
case JSV.common.ScriptToken.APPLETID:
this.fullName = this.appletName + "__" + (this.appletName = value) + "__";
var applet = null;
{
self.Jmol && (applet = Jmol._applets[value]);
}this.html5Applet = applet;
break;
case JSV.common.ScriptToken.AUTOINTEGRATE:
this.autoIntegrate = JSV.common.Parameters.isTrue (value);
break;
case JSV.common.ScriptToken.COMPOUNDMENUON:
break;
case JSV.common.ScriptToken.APPLETREADYCALLBACKFUNCTIONNAME:
case JSV.common.ScriptToken.COORDCALLBACKFUNCTIONNAME:
case JSV.common.ScriptToken.LOADFILECALLBACKFUNCTIONNAME:
case JSV.common.ScriptToken.PEAKCALLBACKFUNCTIONNAME:
case JSV.common.ScriptToken.SYNCCALLBACKFUNCTIONNAME:
this.si.siExecSetCallback (st, value);
break;
case JSV.common.ScriptToken.ENDINDEX:
this.initialEndIndex = Integer.parseInt (value);
break;
case JSV.common.ScriptToken.INTERFACE:
this.checkOvelayInterface (value);
break;
case JSV.common.ScriptToken.IRMODE:
this.setIRmode (value);
break;
case JSV.common.ScriptToken.MENUON:
this.allowMenu = Boolean.parseBoolean (value);
break;
case JSV.common.ScriptToken.OBSCURE:
if (this.obscureTitleFromUser == null) this.obscureTitleFromUser = Boolean.$valueOf (value);
break;
case JSV.common.ScriptToken.STARTINDEX:
this.initialStartIndex = Integer.parseInt (value);
break;
case JSV.common.ScriptToken.SYNCID:
this.fullName = this.appletName + "__" + (this.syncID = value) + "__";
break;
}
} catch (e) {
if (Clazz_exceptionOf (e, Exception)) {
} else {
throw e;
}
}
}
}, "~S");
Clazz_defineMethod (c$, "getSolutionColorStr", 
function (asFit) {
var pt = JU.CU.colorPtFromInt (this.getSolutionColor (asFit), null);
return Clazz_floatToInt (pt.x) + "," + Clazz_floatToInt (pt.y) + "," + Clazz_floatToInt (pt.z);
}, "~B");
Clazz_defineMethod (c$, "checkCommandLineForTip", 
function (c, cmd, oneLineOnly) {
var isHelp = (c == '\1');
if (!isHelp && c != '\0') {
if (c != '\t' && (c == '\n' || c.charCodeAt (0) < 32 || c.charCodeAt (0) > 126)) return null;
cmd += (Character.isISOControl (c) ? "" : "" + c);
}var tip;
if (cmd.indexOf (";") >= 0) cmd = cmd.substring (cmd.lastIndexOf (";") + 1);
var ret = null;
while (cmd.startsWith (" ")) cmd = cmd.substring (1);

if (cmd.length == 0 && !isHelp) {
tip = "";
} else {
var tokens = JSV.common.ScriptToken.getTokens (cmd);
if (tokens.size () == 0 && !isHelp) return "";
var isExact = (cmd.endsWith (" ") || tokens.size () > 1 && oneLineOnly);
var list = JSV.common.ScriptToken.getScriptTokenList (tokens.size () == 0 ? null : tokens.get (0), isExact);
switch (list.size ()) {
case 0:
tip = "?";
break;
case 1:
var st = list.get (0);
tip = st.getTip ();
try {
if (tip.indexOf ("TRUE") >= 0) tip = " (" + this.parameters.getBoolean (st) + ")";
 else if (st.name ().indexOf ("COLOR") >= 0) tip = " (" + JU.CU.toRGBHexString (this.parameters.getElementColor (st)) + ")";
 else tip = "";
} catch (e) {
if (Clazz_exceptionOf (e, Exception)) {
return null;
} else {
throw e;
}
}
if (c == '\t' || isExact || !oneLineOnly) {
tip = st.name () + " " + st.getTip () + tip + " " + st.getDescription ();
if (c == '\t') ret = st.name () + " ";
break;
}tip = st.name () + " " + tip;
break;
default:
tip = JSV.common.ScriptToken.getNameList (list);
}
}if (oneLineOnly) {
this.si.writeStatus (tip);
} else {
ret = tip;
}return ret;
}, "~S,~S,~B");
Clazz_defineMethod (c$, "checkScript", 
function (script) {
return this.checkCommandLineForTip ('\0', script, false);
}, "~S");
Clazz_defineMethod (c$, "execHelp", 
 function (value) {
var s = this.checkCommandLineForTip ('\1', value, false);
if (s.indexOf (" ") < 0 && s.indexOf (",") > 0) {
var tokens = JU.PT.split (s, ",");
java.util.Arrays.sort (tokens);
s = "";
for (var i = 0; i < tokens.length; i++) {
var st = JSV.common.ScriptToken.getScriptToken (tokens[i]);
s += tokens[i] + " " + st.getTip () + "\n  " + st.getDescription () + "\n\n";
}
this.getDialogManager ().showMessage (null, s, "HELP " + value);
} else {
this.selectedPanel.showMessage (s, "Help " + value);
}System.out.println (s);
}, "~S");
Clazz_defineStatics (c$,
"sourceLabel", "Original...",
"FILE_OPEN_OK", 0,
"FILE_OPEN_ALREADY", -1,
"FILE_OPEN_ERROR", -3,
"FILE_OPEN_NO_DATA", -4,
"OVERLAY_DIALOG", -1,
"OVERLAY_OFFSET", 99,
"PORTRAIT", 1,
"PAGE_EXISTS", 0,
"NO_SUCH_PAGE", 1,
"testScript", "<PeakData  index=\"1\" title=\"\" model=\"~1.1\" type=\"1HNMR\" xMin=\"3.2915\" xMax=\"3.2965\" atoms=\"15,16,17,18,19,20\" multiplicity=\"\" integral=\"1\"> src=\"JPECVIEW\" file=\"http://SIMULATION/$caffeine\"",
"NLEVEL_MAX", 100,
"isJS", false,
"isSwingJS", false,
"jmolObject", null);
});
Clazz_declarePackage ("JSV.common");
Clazz_load (["JSV.common.Annotation", "$.Coordinate"], "JSV.common.Measurement", null, function () {
c$ = Clazz_decorateAsClass (function () {
this.pt2 = null;
this.value = 0;
Clazz_instantialize (this, arguments);
}, JSV.common, "Measurement", JSV.common.Annotation);
Clazz_prepareFields (c$, function () {
this.pt2 =  new JSV.common.Coordinate ();
});
Clazz_defineMethod (c$, "setM1", 
function (x, y, spec) {
this.setA (x, y, spec, "", false, false, 0, 6);
this.setPt2 (this.getXVal (), this.getYVal ());
return this;
}, "~N,~N,JSV.common.Spectrum");
Clazz_defineMethod (c$, "copyM", 
function () {
var m =  new JSV.common.Measurement ();
m.setA (this.getXVal (), this.getYVal (), this.spec, this.text, false, false, this.offsetX, this.offsetY);
m.setPt2 (this.pt2.getXVal (), this.pt2.getYVal ());
return m;
});
Clazz_defineMethod (c$, "setPt2", 
function (spec, doSetPt2) {
this.spec = spec;
if (doSetPt2) this.setPt2 (this.getXVal (), this.getYVal ());
return this;
}, "JSV.common.Spectrum,~B");
Clazz_defineMethod (c$, "setPt2", 
function (x, y) {
this.pt2.setXVal (x);
this.pt2.setYVal (y);
this.value = Math.abs (x - this.getXVal ());
this.text = this.spec.setMeasurementText (this);
}, "~N,~N");
Clazz_defineMethod (c$, "getSpectrum", 
function () {
return this.spec;
});
Clazz_defineMethod (c$, "setValue", 
function (value) {
this.value = value;
this.text = this.spec.setMeasurementText (this);
}, "~N");
Clazz_defineMethod (c$, "getValue", 
function () {
return this.value;
});
Clazz_defineMethod (c$, "getXVal2", 
function () {
return this.pt2.getXVal ();
});
Clazz_defineMethod (c$, "getYVal2", 
function () {
return this.pt2.getYVal ();
});
Clazz_overrideMethod (c$, "addSpecShift", 
function (dx) {
this.setXVal (this.getXVal () + dx);
this.pt2.setXVal (this.pt2.getXVal () + dx);
}, "~N");
Clazz_defineMethod (c$, "setYVal2", 
function (y2) {
this.pt2.setYVal (y2);
}, "~N");
Clazz_defineMethod (c$, "overlaps", 
function (x1, x2) {
return (Math.min (this.getXVal (), this.getXVal2 ()) < Math.max (x1, x2) && Math.max (this.getXVal (), this.getXVal2 ()) > Math.min (x1, x2));
}, "~N,~N");
Clazz_overrideMethod (c$, "toString", 
function () {
return "[" + this.getXVal () + "," + this.pt2.getXVal () + "]";
});
Clazz_defineStatics (c$,
"PT_XY1", 1,
"PT_XY2", 2,
"PT_INT_LABEL", -5,
"PT_ON_LINE1", -1,
"PT_ON_LINE2", -2,
"PT_ON_LINE", 0);
});
Clazz_declarePackage ("JSV.common");
Clazz_load (["JU.Lst", "JSV.api.AnnotationData"], "JSV.common.MeasurementData", ["JU.AU", "$.DF", "JSV.common.Annotation", "$.Parameters"], function () {
c$ = Clazz_decorateAsClass (function () {
this.type = null;
this.spec = null;
this.units = null;
this.precision = 0;
this.myParams = null;
this.isON = true;
this.key = null;
Clazz_instantialize (this, arguments);
}, JSV.common, "MeasurementData", JU.Lst, JSV.api.AnnotationData);
Clazz_makeConstructor (c$, 
function (type, spec) {
Clazz_superConstructor (this, JSV.common.MeasurementData, []);
this.type = type;
this.spec = spec;
this.myParams =  new JSV.common.Parameters ().setName ("MeasurementData");
}, "JSV.common.Annotation.AType,JSV.common.Spectrum");
Clazz_defineMethod (c$, "getMeasurements", 
function () {
return this;
});
Clazz_overrideMethod (c$, "getAType", 
function () {
return this.type;
});
Clazz_overrideMethod (c$, "getState", 
function () {
return this.isON;
});
Clazz_overrideMethod (c$, "setState", 
function (b) {
this.isON = b;
}, "~B");
Clazz_defineMethod (c$, "setMeasurements", 
function (measurements) {
}, "JU.Lst");
Clazz_overrideMethod (c$, "getParameters", 
function () {
return this.myParams;
});
Clazz_defineMethod (c$, "getDataHeader", 
function () {
return JSV.common.MeasurementData.HEADER;
});
Clazz_defineMethod (c$, "getMeasurementListArray", 
function (units) {
this.units = units;
var ddata = this.getMeasurementListArrayReal (units);
var precisionX = (this.spec.isNMR () ? 4 : 2);
var precisionDX = (this.spec.isHNMR () && units.equals ("ppm") ? 4 : 2);
var data =  new Array (this.size ());
for (var i = this.size (); --i >= 0; ) data[i] =  Clazz_newArray (-1, ["" + (i + 1), JU.DF.formatDecimalDbl (ddata[i][0], precisionX), JU.DF.formatDecimalDbl (ddata[i][1], precisionX), JU.DF.formatDecimalDbl (ddata[i][2], precisionDX)]);

return data;
}, "~S");
Clazz_defineMethod (c$, "getMeasurementListArrayReal", 
function (units) {
var toHz = this.spec.isNMR () && units.equalsIgnoreCase ("HZ");
var data = JU.AU.newDouble2 (this.size ());
for (var pt = 0, i = this.size (); --i >= 0; ) {
var y = this.get (i).getValue ();
if (toHz) y *= this.spec.observedFreq;
data[pt++] =  Clazz_newDoubleArray (-1, [this.get (i).getXVal (), this.get (i).getXVal2 (), y]);
}
return data;
}, "~S");
c$.checkParameters = Clazz_defineMethod (c$, "checkParameters", 
function (md, p) {
if (md.size () == 0) return false;
var myParams = md.getParameters ();
switch (md.getAType ()) {
case JSV.common.Annotation.AType.Integration:
break;
case JSV.common.Annotation.AType.PeakList:
return (p.peakListInterpolation.equals (myParams.peakListInterpolation) && p.peakListThreshold == myParams.peakListThreshold);
case JSV.common.Annotation.AType.Measurements:
break;
case JSV.common.Annotation.AType.NONE:
}
return false;
}, "JSV.common.MeasurementData,JSV.common.ColorParameters");
Clazz_overrideMethod (c$, "getSpectrum", 
function () {
return this.spec;
});
Clazz_overrideMethod (c$, "getData", 
function () {
return this;
});
Clazz_defineMethod (c$, "clear", 
function (x1, x2) {
for (var i = this.size (); --i >= 0; ) {
var $in = this.get (i);
if ($in.text.length == 0 || $in.overlaps (x1, x2)) {
this.removeItemAt (i);
}}
}, "~N,~N");
Clazz_defineMethod (c$, "find", 
function (x) {
for (var i = this.size (); --i >= 0; ) {
var $in = this.get (i);
if ($in.overlaps (x, x)) {
return i;
}}
return -1;
}, "~N");
Clazz_overrideMethod (c$, "setSpecShift", 
function (dx) {
for (var i = this.size (); --i >= 0; ) {
var m = this.get (i);
var x = m.getXVal () + dx;
m.setXVal (x);
m.setValue (x);
m.text = JU.DF.formatDecimalDbl (x, this.precision);
}
}, "~N");
Clazz_overrideMethod (c$, "getGraphSetKey", 
function () {
return this.key;
});
Clazz_overrideMethod (c$, "setGraphSetKey", 
function (key) {
this.key = key;
}, "~S");
Clazz_overrideMethod (c$, "isVisible", 
function () {
return true;
});
Clazz_defineMethod (c$, "getInfo", 
function (info) {
info.put ("header", this.getDataHeader ());
info.put ("table", this.getMeasurementListArrayReal ("ppm"));
if (this.units != null) info.put ("units", this.units);
}, "java.util.Map");
Clazz_overrideMethod (c$, "isDialog", 
function () {
return false;
});
c$.HEADER = c$.prototype.HEADER =  Clazz_newArray (-1, ["", "start", "end", "value"]);
});
Clazz_declarePackage ("JSV.common");
Clazz_load (["java.lang.Enum", "J.api.EventManager", "java.util.Hashtable", "JU.Lst"], "JSV.common.PanelData", ["java.lang.Boolean", "$.Double", "JU.CU", "JSV.common.Annotation", "$.Coordinate", "$.GraphSet", "$.JSVFileManager", "$.JSVersion", "$.JSViewer", "$.MeasurementData", "$.Parameters", "$.PeakPickEvent", "$.ScriptToken", "$.Spectrum", "$.SubSpecChangeEvent", "$.ZoomEvent", "JSV.dialog.JSVDialog", "J.api.GenericGraphics", "JU.Font", "$.Logger"], function () {
c$ = Clazz_decorateAsClass (function () {
this.g2d = null;
this.g2d0 = null;
this.vwr = null;
this.listeners = null;
this.currentGraphSet = null;
this.options = null;
this.jsvp = null;
this.graphSets = null;
this.currentSplitPoint = 0;
this.thisWidget = null;
this.coordClicked = null;
this.coordsClicked = null;
this.ctrlPressed = false;
this.shiftPressed = false;
this.drawXAxisLeftToRight = false;
this.isIntegralDrag = false;
this.xAxisLeftToRight = true;
this.scalingFactor = 1;
this.integralShiftMode = 0;
this.left = 60;
this.right = 50;
this.coordStr = "";
this.startupPinTip = "Click to set.";
this.title = null;
this.clickCount = 0;
this.nSpectra = 0;
this.thisWidth = 0;
this.thisHeight = 0;
this.startIndex = 0;
this.endIndex = 0;
this.commonFilePath = null;
this.viewTitle = null;
this.displayFontName = null;
this.titleFontName = null;
this.isPrinting = false;
this.doReset = true;
this.printingFontName = null;
this.printGraphPosition = "default";
this.titleDrawn = false;
this.display1D = false;
this.isLinked = false;
this.printJobTitle = null;
this.spectra = null;
this.taintedAll = true;
this.testingJavaScript = false;
this.currentFont = null;
this.mouseState = null;
this.gridOn = false;
this.titleOn = false;
this.peakTabsOn = false;
this.mouseX = 0;
this.mouseY = 0;
this.linking = false;
this.xPixelClicked = 0;
this.coordinatesColor = null;
this.gridColor = null;
this.integralPlotColor = null;
this.peakTabColor = null;
this.plotAreaColor = null;
this.scaleColor = null;
this.titleColor = null;
this.unitsColor = null;
this.highlightColor = null;
this.zoomBoxColor = null;
this.zoomBoxColor2 = null;
this.BLACK = null;
this.bgcolor = null;
this.optionsSaved = null;
this.gMain = null;
Clazz_instantialize (this, arguments);
}, JSV.common, "PanelData", null, J.api.EventManager);
Clazz_prepareFields (c$, function () {
this.listeners =  new JU.Lst ();
this.options =  new java.util.Hashtable ();
});
Clazz_makeConstructor (c$, 
function (panel, viewer) {
this.vwr = viewer;
this.jsvp = panel;
this.g2d = this.g2d0 = viewer.g2d;
this.BLACK = this.g2d.getColor1 (0);
this.highlightColor = this.g2d.getColor4 (255, 0, 0, 200);
this.zoomBoxColor = this.g2d.getColor4 (150, 150, 100, 130);
this.zoomBoxColor2 = this.g2d.getColor4 (150, 100, 100, 130);
}, "JSV.api.JSVPanel,JSV.common.JSViewer");
Clazz_defineMethod (c$, "addListener", 
function (listener) {
if (!this.listeners.contains (listener)) {
this.listeners.addLast (listener);
}}, "JSV.api.PanelListener");
Clazz_defineMethod (c$, "getCurrentGraphSet", 
function () {
return this.currentGraphSet;
});
Clazz_defineMethod (c$, "dispose", 
function () {
this.jsvp = null;
for (var i = 0; i < this.graphSets.size (); i++) this.graphSets.get (i).dispose ();

this.graphSets = null;
this.currentFont = null;
this.currentGraphSet = null;
this.coordClicked = null;
this.coordsClicked = null;
this.thisWidget = null;
this.options = null;
this.listeners = null;
});
Clazz_defineMethod (c$, "setViewTitle", 
function (title) {
this.viewTitle = title;
}, "~S");
Clazz_defineMethod (c$, "getViewTitle", 
function () {
return (this.viewTitle == null ? this.getTitle () : this.viewTitle);
});
Clazz_defineMethod (c$, "getInfo", 
function (selectedOnly, key) {
var info =  new java.util.Hashtable ();
var sets = null;
if (selectedOnly) return this.currentGraphSet.getInfo (key, this.getCurrentSpectrumIndex ());
var entries = this.options.entrySet ();
if ("".equals (key)) {
var val = "type title nSets ";
for (var entry, $entry = entries.iterator (); $entry.hasNext () && ((entry = $entry.next ()) || true);) val += entry.getKey ().name () + " ";

info.put ("KEYS", val);
} else {
for (var entry, $entry = entries.iterator (); $entry.hasNext () && ((entry = $entry.next ()) || true);) JSV.common.Parameters.putInfo (key, info, entry.getKey ().name (), entry.getValue ());

JSV.common.Parameters.putInfo (key, info, "type", this.getSpectrumAt (0).getDataType ());
JSV.common.Parameters.putInfo (key, info, "title", this.title);
JSV.common.Parameters.putInfo (key, info, "nSets", Integer.$valueOf (this.graphSets.size ()));
}sets =  new JU.Lst ();
for (var i = this.graphSets.size (); --i >= 0; ) sets.addLast (this.graphSets.get (i).getInfo (key, -1));

info.put ("sets", sets);
return info;
}, "~B,~S");
Clazz_defineMethod (c$, "setBooleans", 
function (parameters, st) {
if (st == null) {
var booleans = parameters.getBooleans ();
for (var entry, $entry = booleans.entrySet ().iterator (); $entry.hasNext () && ((entry = $entry.next ()) || true);) this.setBooleans (parameters, entry.getKey ());

return;
}this.setBoolean (st, parameters.getBoolean (st));
}, "JSV.common.Parameters,JSV.common.ScriptToken");
Clazz_defineMethod (c$, "setBoolean", 
function (st, isTrue) {
this.setTaintedAll ();
if (st === JSV.common.ScriptToken.REVERSEPLOT) {
this.currentGraphSet.setReversePlot (isTrue);
return;
}this.options.put (st, Boolean.$valueOf (isTrue));
switch (st) {
case JSV.common.ScriptToken.DISPLAY1D:
case JSV.common.ScriptToken.DISPLAY2D:
this.doReset = true;
break;
}
}, "JSV.common.ScriptToken,~B");
Clazz_defineMethod (c$, "getBoolean", 
function (st) {
if (st === JSV.common.ScriptToken.REVERSEPLOT) return this.currentGraphSet.reversePlot;
if (this.options == null) return false;
var b = this.options.get (st);
return (b != null && (Clazz_instanceOf (b, Boolean)) && (b) === Boolean.TRUE);
}, "JSV.common.ScriptToken");
Clazz_defineMethod (c$, "setFontName", 
function (st, fontName) {
switch (st) {
case JSV.common.ScriptToken.DISPLAYFONTNAME:
this.displayFontName = fontName;
break;
case JSV.common.ScriptToken.TITLEFONTNAME:
this.titleFontName = fontName;
break;
}
if (fontName != null) this.options.put (st, fontName);
}, "JSV.common.ScriptToken,~S");
Clazz_defineMethod (c$, "getDisplay1D", 
function () {
return this.display1D;
});
Clazz_defineMethod (c$, "setTaintedAll", 
function () {
this.taintedAll = true;
});
Clazz_defineMethod (c$, "initOne", 
function (spectrum) {
this.spectra =  new JU.Lst ();
this.spectra.addLast (spectrum);
this.initMany (this.spectra, 0, 0);
}, "JSV.common.Spectrum");
Clazz_defineMethod (c$, "initMany", 
function (spectra, startIndex, endIndex) {
this.startIndex = startIndex;
this.endIndex = endIndex;
this.nSpectra = spectra.size ();
this.spectra = spectra;
this.commonFilePath = spectra.get (0).getFilePath ();
for (var i = 0; i < this.nSpectra; i++) if (!this.commonFilePath.equalsIgnoreCase (spectra.get (i).getFilePath ())) {
this.commonFilePath = null;
break;
}
this.setGraphSets (JSV.common.PanelData.LinkMode.NONE);
}, "JU.Lst,~N,~N");
Clazz_defineMethod (c$, "setGraphSets", 
 function (linkMode) {
this.graphSets = JSV.common.GraphSet.createGraphSetsAndSetLinkMode (this, this.jsvp, this.spectra, this.startIndex, this.endIndex, linkMode);
this.currentGraphSet = this.graphSets.get (0);
this.title = this.getSpectrum ().getTitleLabel ();
}, "JSV.common.PanelData.LinkMode");
Clazz_defineMethod (c$, "findMatchingPeakInfo", 
function (pi) {
var pi2 = null;
for (var i = 0; i < this.graphSets.size (); i++) if ((pi2 = this.graphSets.get (i).findMatchingPeakInfo (pi)) != null) break;

return pi2;
}, "JSV.common.PeakInfo");
Clazz_defineMethod (c$, "integrateAll", 
function (parameters) {
for (var i = this.graphSets.size (); --i >= 0; ) this.graphSets.get (i).integrate (-1, parameters);

}, "JSV.common.ColorParameters");
Clazz_defineMethod (c$, "getNumberOfGraphSets", 
function () {
return this.graphSets.size ();
});
Clazz_defineMethod (c$, "getTitle", 
function () {
return this.title;
});
Clazz_defineMethod (c$, "refresh", 
function () {
this.doReset = true;
});
Clazz_defineMethod (c$, "addAnnotation", 
function (tokens) {
var title = this.currentGraphSet.addAnnotation (tokens, this.getTitle ());
if (title != null) this.title = title;
}, "JU.Lst");
Clazz_defineMethod (c$, "addPeakHighlight", 
function (peakInfo) {
for (var i = 0; i < this.graphSets.size (); i++) this.graphSets.get (i).addPeakHighlight (peakInfo);

}, "JSV.common.PeakInfo");
Clazz_defineMethod (c$, "selectPeakByFileIndex", 
function (filePath, index, atomKey) {
var pi = this.currentGraphSet.selectPeakByFileIndex (filePath, index, atomKey);
if (pi == null) for (var i = this.graphSets.size (); --i >= 0; ) if (this.graphSets.get (i) !== this.currentGraphSet && (pi = this.graphSets.get (i).selectPeakByFileIndex (filePath, index, atomKey)) != null) break;

return pi;
}, "~S,~S,~S");
Clazz_defineMethod (c$, "setPlotColors", 
function (colors) {
for (var i = this.graphSets.size (); --i >= 0; ) this.graphSets.get (i).setPlotColors (colors);

}, "~A");
Clazz_defineMethod (c$, "selectSpectrum", 
function (filePath, type, model, andCurrent) {
if (andCurrent) this.currentGraphSet.selectSpectrum (filePath, type, model);
if ("ID".equals (type)) {
this.jumpToSpectrumIndex (this.getCurrentSpectrumIndex (), true);
return;
}for (var i = 0; i < this.graphSets.size (); i++) if (this.graphSets.get (i) !== this.currentGraphSet) this.graphSets.get (i).selectSpectrum (filePath, type, model);

}, "~S,~S,~S,~B");
Clazz_defineMethod (c$, "hasFileLoaded", 
function (filePath) {
for (var i = this.graphSets.size (); --i >= 0; ) if (this.graphSets.get (i).hasFileLoaded (filePath)) return true;

return false;
}, "~S");
Clazz_defineMethod (c$, "clearAllView", 
function () {
for (var i = this.graphSets.size (); --i >= 0; ) this.graphSets.get (i).resetViewCompletely ();

});
Clazz_defineMethod (c$, "drawGraph", 
function (gMain, gFront, gRear, width, height, addFilePath) {
var withCoords;
this.gMain = gMain;
this.display1D = !this.isLinked && this.getBoolean (JSV.common.ScriptToken.DISPLAY1D);
var top = 40;
var bottom = 50;
var isResized = (this.isPrinting || this.doReset || this.thisWidth != width || this.thisHeight != height);
if (isResized) this.setTaintedAll ();
if (this.taintedAll) this.g2d.fillBackground (gRear, this.bgcolor);
if (gFront !== gMain) {
this.g2d.fillBackground (gFront, null);
if (gMain !== gRear) this.g2d.fillBackground (gMain, null);
this.g2d.setStrokeBold (gMain, false);
}if (this.isPrinting) {
top *= 3;
bottom *= 3;
this.scalingFactor = 10;
withCoords = false;
} else {
this.scalingFactor = 1;
withCoords = this.getBoolean (JSV.common.ScriptToken.COORDINATESON);
this.titleOn = this.getBoolean (JSV.common.ScriptToken.TITLEON);
this.gridOn = this.getBoolean (JSV.common.ScriptToken.GRIDON);
this.peakTabsOn = this.getBoolean (JSV.common.ScriptToken.PEAKTABSON);
}var pointsOnly = this.getBoolean (JSV.common.ScriptToken.POINTSONLY);
this.doReset = false;
this.titleDrawn = false;
this.thisWidth = width;
this.thisHeight = height;
for (var i = this.graphSets.size (); --i >= 0; ) this.graphSets.get (i).drawGraphSet (gMain, gFront, gRear, width, height, this.left, this.right, top, bottom, isResized, this.taintedAll, pointsOnly);

if (this.titleOn && !this.titleDrawn && this.taintedAll) this.drawTitle (gMain, height * this.scalingFactor, width * this.scalingFactor, this.getDrawTitle (this.isPrinting));
if (withCoords && this.coordStr != null) this.drawCoordinates (gFront, top, this.thisWidth - this.right, top - 20);
if (addFilePath && this.taintedAll) {
this.printFilePath (gMain, this.left, height, this.commonFilePath != null ? this.commonFilePath : this.graphSets.size () == 1 && this.currentGraphSet.getTitle (true) != null ? this.getSpectrum ().getFilePath () : null);
}if (this.isPrinting) {
this.printVersion (gMain, height);
}if (!this.testingJavaScript && (this.isPrinting || gMain === gFront)) this.setTaintedAll ();
 else this.taintedAll = false;
}, "~O,~O,~O,~N,~N,~B");
Clazz_defineMethod (c$, "drawCoordinates", 
function (g, top, x, y) {
this.g2d.setGraphicsColor (g, this.coordinatesColor);
var font = this.setFont (g, this.jsvp.getWidth (), 1, 14, true);
this.g2d.drawString (g, this.coordStr, x - font.stringWidth (this.coordStr), y);
}, "~O,~N,~N,~N");
Clazz_defineMethod (c$, "setFont", 
function (g, width, style, size, isLabel) {
return this.g2d.setFont (g, this.getFont (g, width, style, size, isLabel));
}, "~O,~N,~N,~N,~B");
Clazz_defineMethod (c$, "printFilePath", 
function (g, x, y, s) {
if (s == null) return;
x *= this.scalingFactor;
y *= this.scalingFactor;
if (s.indexOf ("?") > 0) s = s.substring (s.indexOf ("?") + 1);
s = s.substring (s.lastIndexOf ("/") + 1);
s = s.substring (s.lastIndexOf ("\\") + 1);
this.g2d.setGraphicsColor (g, this.BLACK);
var font = this.setFont (g, 1000, 0, 9, true);
if (x != this.left * this.scalingFactor) x -= font.stringWidth (s);
this.g2d.drawString (g, s, x, y - font.getHeight ());
}, "~O,~N,~N,~S");
Clazz_defineMethod (c$, "printVersion", 
function (g, pageHeight) {
this.g2d.setGraphicsColor (g, this.BLACK);
var font = this.setFont (g, 100, 0, 12, true);
var s = this.jsvp.getApiPlatform ().getDateFormat (null) + " JSpecView " + JSV.common.JSVersion.VERSION_SHORT;
var w = font.stringWidth (s);
this.g2d.drawString (g, s, (this.thisWidth - this.right) * this.scalingFactor - w, pageHeight * this.scalingFactor - font.getHeight () * 3);
}, "~O,~N");
Clazz_defineMethod (c$, "drawTitle", 
function (g, pageHeight, pageWidth, title) {
title = title.$replace ('\n', ' ');
var font = this.getFont (g, pageWidth, this.isPrinting || this.getBoolean (JSV.common.ScriptToken.TITLEBOLDON) ? 1 : 0, 14, true);
var nPixels = font.stringWidth (title);
if (nPixels > pageWidth) {
var size = Clazz_doubleToInt (14.0 * pageWidth / nPixels);
if (size < 10) size = 10;
font = this.getFont (g, pageWidth, this.isPrinting || this.getBoolean (JSV.common.ScriptToken.TITLEBOLDON) ? 1 : 0, size, true);
}this.g2d.setGraphicsColor (g, this.titleColor);
this.setCurrentFont (this.g2d.setFont (g, font));
this.g2d.drawString (g, title, (this.isPrinting ? this.left * this.scalingFactor : 5), pageHeight - Clazz_doubleToInt (font.getHeight () * (this.isPrinting ? 2 : 0.5)));
}, "~O,~N,~N,~S");
Clazz_defineMethod (c$, "setCurrentFont", 
 function (font) {
this.currentFont = font;
}, "JU.Font");
Clazz_defineMethod (c$, "getFontHeight", 
function () {
return this.currentFont.getAscent ();
});
Clazz_defineMethod (c$, "getStringWidth", 
function (s) {
return this.currentFont.stringWidth (s);
}, "~S");
Clazz_defineMethod (c$, "selectFromEntireSet", 
function (iSpec) {
for (var i = 0, pt = 0; i < this.graphSets.size (); i++) {
if (iSpec == -2147483648) {
this.graphSets.get (i).setSelected (-1);
continue;
}var specs = this.graphSets.get (i).spectra;
for (var j = 0; j < specs.size (); j++, pt++) if (iSpec < 0 || iSpec == pt) this.graphSets.get (i).setSelected (j);

}
}, "~N");
Clazz_defineMethod (c$, "addToList", 
function (iSpec, list) {
for (var i = 0; i < this.spectra.size (); i++) if (iSpec < 0 || i == iSpec) list.addLast (this.spectra.get (i));

}, "~N,JU.Lst");
Clazz_defineMethod (c$, "scaleSelectedBy", 
function (f) {
for (var i = this.graphSets.size (); --i >= 0; ) this.graphSets.get (i).scaleSelectedBy (f);

}, "~N");
Clazz_defineMethod (c$, "setCurrentGraphSet", 
 function (gs, yPixel) {
var splitPoint = (gs.nSplit > 1 ? gs.getSplitPoint (yPixel) : gs.getCurrentSpectrumIndex ());
var isNewSet = (this.currentGraphSet !== gs);
var isNewSplitPoint = (isNewSet || this.currentSplitPoint != splitPoint);
this.currentGraphSet = gs;
this.currentSplitPoint = splitPoint;
if (isNewSet || gs.nSplit > 1 && isNewSplitPoint) this.setSpectrum (splitPoint, true);
if (!isNewSet) {
isNewSet = gs.checkSpectrumClickedEvent (this.mouseX, this.mouseY, this.clickCount);
if (!isNewSet) return false;
this.currentSplitPoint = splitPoint = gs.getCurrentSpectrumIndex ();
this.setSpectrum (splitPoint, true);
}this.jumpToSpectrumIndex (splitPoint, isNewSet || gs.nSplit > 1 && isNewSplitPoint);
return isNewSet;
}, "JSV.common.GraphSet,~N");
Clazz_defineMethod (c$, "jumpToSpectrum", 
function (spec) {
var index = this.currentGraphSet.getSpectrumIndex (spec);
this.jumpToSpectrumIndex (index, true);
}, "JSV.common.Spectrum");
Clazz_defineMethod (c$, "jumpToSpectrumIndex", 
function (index, doSetSpec) {
if (index < 0 || index >= this.currentGraphSet.nSpectra) return;
this.currentSplitPoint = index;
if (doSetSpec) this.setSpectrum (this.currentSplitPoint, this.currentGraphSet.nSplit > 1);
var spec = this.getSpectrum ();
this.notifySubSpectrumChange (spec.getSubIndex (), spec);
}, "~N,~B");
Clazz_defineMethod (c$, "splitStack", 
function (doSplit) {
this.currentGraphSet.splitStack (doSplit);
}, "~B");
Clazz_defineMethod (c$, "getNumberOfSpectraInCurrentSet", 
function () {
return this.currentGraphSet.nSpectra;
});
Clazz_defineMethod (c$, "getSourceID", 
function () {
var id = this.getSpectrum ().sourceID;
return (id == null ? this.getSpectrumAt (0).sourceID : id);
});
Clazz_defineMethod (c$, "getStartingPointIndex", 
function (index) {
return this.currentGraphSet.viewData.getStartingPointIndex (index);
}, "~N");
Clazz_defineMethod (c$, "getEndingPointIndex", 
function (index) {
return this.currentGraphSet.viewData.getEndingPointIndex (index);
}, "~N");
Clazz_defineMethod (c$, "haveSelectedSpectrum", 
function () {
return this.currentGraphSet.haveSelectedSpectrum ();
});
Clazz_defineMethod (c$, "getShowAnnotation", 
function (type) {
return this.currentGraphSet.getShowAnnotation (type, -1);
}, "JSV.common.Annotation.AType");
Clazz_defineMethod (c$, "showAnnotation", 
function (type, tfToggle) {
this.currentGraphSet.setShowAnnotation (type, tfToggle);
}, "JSV.common.Annotation.AType,Boolean");
Clazz_defineMethod (c$, "setYStackOffsetPercent", 
function (offset) {
this.currentGraphSet.yStackOffsetPercent = offset;
}, "~N");
Clazz_defineMethod (c$, "setSpectrum", 
function (iSpec, isSplit) {
this.currentGraphSet.setSpectrum (iSpec, isSplit);
}, "~N,~B");
Clazz_defineMethod (c$, "getSpectrum", 
function () {
return this.currentGraphSet.getSpectrum ();
});
Clazz_defineMethod (c$, "setSpecForIRMode", 
function (spec) {
this.setTaintedAll ();
var spec0 = this.currentGraphSet.getSpectrum ();
this.currentGraphSet.setSpectrumJDX (spec);
for (var i = 0; i < this.spectra.size (); i++) if (this.spectra.get (i) === spec0) this.spectra.set (i, spec);

}, "JSV.common.Spectrum");
Clazz_defineMethod (c$, "isShowAllStacked", 
function () {
return this.currentGraphSet.showAllStacked;
});
Clazz_defineMethod (c$, "getCurrentSpectrumIndex", 
function () {
return this.currentGraphSet.getCurrentSpectrumIndex ();
});
Clazz_defineMethod (c$, "getSpectrumAt", 
function (index) {
if (this.currentGraphSet == null) return null;
return this.currentGraphSet.getSpectrumAt (index);
}, "~N");
Clazz_defineMethod (c$, "addHighlight", 
function (gs, x1, x2, spec, r, g, b, a) {
(gs == null ? this.currentGraphSet : gs).addHighlight (x1, x2, spec, this.g2d.getColor4 (r, g, b, a));
}, "JSV.common.GraphSet,~N,~N,JSV.common.Spectrum,~N,~N,~N,~N");
Clazz_defineMethod (c$, "removeHighlight", 
function (x1, x2) {
this.currentGraphSet.removeHighlight (x1, x2);
}, "~N,~N");
Clazz_defineMethod (c$, "removeAllHighlights", 
function () {
this.currentGraphSet.removeAllHighlights ();
});
Clazz_defineMethod (c$, "setZoom", 
function (x1, y1, x2, y2) {
this.currentGraphSet.setZoom (x1, y1, x2, y2);
this.doReset = true;
this.setTaintedAll ();
this.notifyListeners ( new JSV.common.ZoomEvent ());
}, "~N,~N,~N,~N");
Clazz_defineMethod (c$, "resetView", 
function () {
this.currentGraphSet.resetView ();
});
Clazz_defineMethod (c$, "previousView", 
function () {
this.currentGraphSet.previousView ();
});
Clazz_defineMethod (c$, "nextView", 
function () {
this.currentGraphSet.nextView ();
});
Clazz_defineMethod (c$, "getSelectedIntegral", 
function () {
return this.currentGraphSet.getSelectedIntegral ();
});
Clazz_defineMethod (c$, "advanceSubSpectrum", 
function (dir) {
this.currentGraphSet.advanceSubSpectrum (dir);
}, "~N");
Clazz_defineMethod (c$, "setSelectedIntegral", 
function (val) {
this.currentGraphSet.setSelectedIntegral (val);
}, "~N");
Clazz_defineMethod (c$, "scaleYBy", 
function (f) {
this.currentGraphSet.scaleYBy (f);
}, "~N");
Clazz_defineMethod (c$, "toPeak", 
function (i) {
this.currentGraphSet.toPeak (i);
}, "~N");
Clazz_defineMethod (c$, "getClickedCoordinate", 
function () {
return this.coordClicked;
});
Clazz_defineMethod (c$, "getPickedCoordinates", 
function (coord, actualCoord) {
return JSV.common.Coordinate.getPickedCoordinates (this.coordsClicked, this.coordClicked, coord, actualCoord);
}, "JSV.common.Coordinate,JSV.common.Coordinate");
Clazz_defineMethod (c$, "shiftSpectrum", 
function (mode, xOld, xNew) {
return this.currentGraphSet.shiftSpectrum (mode, xOld, xNew);
}, "~N,~N,~N");
Clazz_defineMethod (c$, "findX", 
function (spec, d) {
this.currentGraphSet.setXPointer (spec, d);
}, "JSV.common.Spectrum,~N");
Clazz_defineMethod (c$, "setXPointers", 
function (spec, x1, spec2, x2) {
this.currentGraphSet.setXPointer (spec, x1);
this.currentGraphSet.setXPointer2 (spec2, x2);
}, "JSV.common.Spectrum,~N,JSV.common.Spectrum,~N");
Clazz_defineMethod (c$, "isCurrentGraphSet", 
function (graphSet) {
return graphSet === this.currentGraphSet;
}, "JSV.common.GraphSet");
Clazz_defineMethod (c$, "repaint", 
function () {
this.jsvp.doRepaint (false);
});
Clazz_defineMethod (c$, "setToolTipText", 
function (s) {
this.jsvp.setToolTipText (s);
}, "~S");
Clazz_defineMethod (c$, "setHighlightColor", 
function (color) {
this.setColor (JSV.common.ScriptToken.HIGHLIGHTCOLOR, color);
}, "javajs.api.GenericColor");
Clazz_defineMethod (c$, "getInput", 
function (message, title, sval) {
return this.jsvp.getInput (message, title, sval);
}, "~S,~S,~S");
Clazz_defineMethod (c$, "getFont", 
 function (g, width, style, size, isLabel) {
size *= this.scalingFactor;
if (isLabel) {
if (width < 400) size = ((width * size) / 400);
} else {
if (width < 250) size = ((width * size) / 250);
}var face = this.jsvp.getFontFaceID (this.isPrinting ? this.printingFontName : this.displayFontName);
return this.currentFont = JU.Font.createFont3D (face, style, size, size, this.jsvp.getApiPlatform (), g);
}, "~O,~N,~N,~N,~B");
Clazz_defineMethod (c$, "notifySubSpectrumChange", 
function (isub, spec) {
this.notifyListeners ( new JSV.common.SubSpecChangeEvent (isub, (spec == null ? null : spec.getTitleLabel ())));
}, "~N,JSV.common.Spectrum");
Clazz_defineMethod (c$, "notifyPeakPickedListeners", 
function (p) {
if (p == null) {
p =  new JSV.common.PeakPickEvent (this.jsvp, this.coordClicked, this.getSpectrum ().getAssociatedPeakInfo (this.xPixelClicked, this.coordClicked));
}this.notifyListeners (p);
}, "JSV.common.PeakPickEvent");
Clazz_defineMethod (c$, "notifyListeners", 
function (eventObj) {
for (var i = 0; i < this.listeners.size (); i++) if (this.listeners.get (i) != null) this.listeners.get (i).panelEvent (eventObj);

}, "~O");
Clazz_defineMethod (c$, "escapeKeyPressed", 
function (isDEL) {
this.currentGraphSet.escapeKeyPressed (isDEL);
}, "~B");
Clazz_defineMethod (c$, "hasFocus", 
function () {
return this.jsvp.hasFocus ();
});
Clazz_defineMethod (c$, "isMouseUp", 
function () {
return (this.mouseState === JSV.common.PanelData.Mouse.UP);
});
Clazz_defineMethod (c$, "doMouseMoved", 
function (xPixel, yPixel) {
this.mouseX = xPixel;
this.mouseY = yPixel;
this.mouseState = JSV.common.PanelData.Mouse.UP;
this.clickCount = 0;
var gs = JSV.common.GraphSet.findGraphSet (this.graphSets, xPixel, yPixel);
if (gs == null) return;
gs.mouseMovedEvent (xPixel, yPixel);
}, "~N,~N");
Clazz_defineMethod (c$, "doMousePressed", 
function (xPixel, yPixel) {
this.mouseState = JSV.common.PanelData.Mouse.DOWN;
var gs = JSV.common.GraphSet.findGraphSet (this.graphSets, xPixel, yPixel);
if (gs == null) return;
this.setCurrentGraphSet (gs, yPixel);
this.clickCount = (++this.clickCount % 3);
this.currentGraphSet.mousePressedEvent (xPixel, yPixel, this.clickCount);
}, "~N,~N");
Clazz_defineMethod (c$, "doMouseDragged", 
function (xPixel, yPixel) {
this.isIntegralDrag = new Boolean (this.isIntegralDrag | this.ctrlPressed).valueOf ();
this.mouseState = JSV.common.PanelData.Mouse.DOWN;
if (JSV.common.GraphSet.findGraphSet (this.graphSets, xPixel, yPixel) !== this.currentGraphSet) return;
if (this.currentGraphSet.checkWidgetEvent (xPixel, yPixel, false)) this.setTaintedAll ();
this.currentGraphSet.mouseMovedEvent (xPixel, yPixel);
}, "~N,~N");
Clazz_defineMethod (c$, "doMouseReleased", 
function (xPixel, yPixel, isButton1) {
this.mouseState = JSV.common.PanelData.Mouse.UP;
if (this.thisWidget == null && this.currentGraphSet.pendingMeasurement == null || !isButton1) return;
this.currentGraphSet.mouseReleasedEvent (xPixel, yPixel);
this.thisWidget = null;
this.isIntegralDrag = false;
this.integralShiftMode = 0;
}, "~N,~N,~B");
Clazz_defineMethod (c$, "doMouseClicked", 
function (xPixel, yPixel, isControlDown) {
var gs = JSV.common.GraphSet.findGraphSet (this.graphSets, xPixel, yPixel);
if (gs == null) return;
this.setCurrentGraphSet (gs, yPixel);
gs.mouseClickedEvent (xPixel, yPixel, this.clickCount, isControlDown);
this.setTaintedAll ();
this.repaint ();
}, "~N,~N,~B");
Clazz_defineMethod (c$, "hasCurrentMeasurements", 
function (type) {
return this.currentGraphSet.hasCurrentMeasurement (type);
}, "JSV.common.Annotation.AType");
Clazz_defineMethod (c$, "getDialog", 
function (type) {
return this.currentGraphSet.getDialog (type, -1);
}, "JSV.common.Annotation.AType");
Clazz_defineMethod (c$, "addDialog", 
function (iSpec, type, dialog) {
this.currentGraphSet.addDialog (iSpec, type, dialog);
}, "~N,JSV.common.Annotation.AType,JSV.api.AnnotationData");
Clazz_defineMethod (c$, "getPeakListing", 
function (p, tfToggle) {
if (p != null) this.currentGraphSet.getPeakListing (-1, p, true);
this.currentGraphSet.setPeakListing (tfToggle);
}, "JSV.common.Parameters,Boolean");
Clazz_defineMethod (c$, "checkIntegral", 
function (parameters, value) {
this.currentGraphSet.checkIntegralParams (parameters, value);
}, "JSV.common.Parameters,~S");
Clazz_defineMethod (c$, "setIntegrationRatios", 
function (value) {
this.currentGraphSet.setIntegrationRatios (value);
}, "~S");
Clazz_defineMethod (c$, "getView", 
function () {
return this.currentGraphSet.getCurrentView ();
});
Clazz_defineMethod (c$, "closeAllDialogsExcept", 
function (type) {
for (var i = this.graphSets.size (); --i >= 0; ) this.graphSets.get (i).closeDialogsExcept (type);

}, "JSV.common.Annotation.AType");
Clazz_defineMethod (c$, "removeDialog", 
function (dialog) {
this.currentGraphSet.removeDialog (dialog);
}, "JSV.dialog.JSVDialog");
Clazz_defineMethod (c$, "normalizeIntegral", 
function () {
var integral = this.getSelectedIntegral ();
if (integral == null) return;
var sValue = integral.text;
if (sValue.length == 0) sValue = "" + integral.getValue ();
var newValue = this.getInput ("Enter a new value for this integral", "Normalize Integral", sValue);
try {
this.setSelectedIntegral (Double.parseDouble (newValue));
} catch (e) {
if (Clazz_exceptionOf (e, Exception)) {
} else {
throw e;
}
}
});
Clazz_defineMethod (c$, "getDrawTitle", 
function (isPrinting) {
var title = null;
if (isPrinting) title = this.printJobTitle;
 else if (this.nSpectra == 1) {
title = this.getSpectrum ().getPeakTitle ();
} else if (this.viewTitle != null) {
if (this.currentGraphSet.getTitle (false) != null) title = this.getSpectrum ().getPeakTitle ();
if (title == null) title = this.viewTitle;
} else {
title = this.jsvp.getTitle ().trim ();
}if (title.indexOf ("\n") >= 0) title = title.substring (0, title.indexOf ("\n")).trim ();
return title;
}, "~B");
Clazz_defineMethod (c$, "getPrintJobTitle", 
function (isPrinting) {
var title = null;
if (this.nSpectra == 1) {
title = this.getSpectrum ().getTitle ();
} else if (this.viewTitle != null) {
if (this.graphSets.size () == 1) title = this.currentGraphSet.getTitle (isPrinting);
if (title == null) title = this.viewTitle;
} else {
title = this.jsvp.getTitle ().trim ();
}if (title.indexOf ("\n") >= 0) title = title.substring (0, title.indexOf ("\n")).trim ();
 else if (title.startsWith ("$")) title = title.substring (1);
return title;
}, "~B");
Clazz_defineMethod (c$, "linkSpectra", 
function (mode) {
if (mode === JSV.common.PanelData.LinkMode.ALL) mode = (this.nSpectra == 2 ? JSV.common.PanelData.LinkMode.AB : this.nSpectra == 3 ? JSV.common.PanelData.LinkMode.ABC : JSV.common.PanelData.LinkMode.NONE);
if (mode !== JSV.common.PanelData.LinkMode.NONE && mode.toString ().length != this.nSpectra) return;
this.setGraphSets (mode);
}, "JSV.common.PanelData.LinkMode");
Clazz_defineMethod (c$, "doZoomLinked", 
function (graphSet, initX, finalX, addZoom, checkRange, is1d) {
if (this.linking) return;
this.linking = true;
var spec = graphSet.getSpectrumAt (0);
for (var i = this.graphSets.size (); --i >= 0; ) {
var gs = this.graphSets.get (i);
if (gs !== graphSet && JSV.common.Spectrum.areXScalesCompatible (spec, this.graphSets.get (i).getSpectrumAt (0), false, true)) gs.doZoom (initX, 0, finalX, 0, is1d, false, checkRange, false, addZoom);
}
this.linking = false;
}, "JSV.common.GraphSet,~N,~N,~B,~B,~B");
Clazz_defineMethod (c$, "clearLinkViews", 
function (graphSet) {
if (this.linking) return;
this.linking = true;
var spec = graphSet.getSpectrum ();
for (var i = this.graphSets.size (); --i >= 0; ) {
var gs = this.graphSets.get (i);
if (gs !== graphSet && JSV.common.Spectrum.areXScalesCompatible (spec, this.graphSets.get (i).getSpectrum (), false, true)) gs.clearViews ();
}
this.linking = false;
}, "JSV.common.GraphSet");
Clazz_defineMethod (c$, "setlinkedXMove", 
function (graphSet, x, isX2) {
if (this.linking) return;
this.linking = true;
var spec = graphSet.getSpectrum ();
for (var i = this.graphSets.size (); --i >= 0; ) {
var gs = this.graphSets.get (i);
if (gs !== graphSet && JSV.common.Spectrum.areXScalesCompatible (spec, this.graphSets.get (i).getSpectrum (), false, true)) {
if (gs.imageView == null) if (isX2) {
gs.setXPixelMovedTo (1.7976931348623157E308, x, 0, 0);
} else {
gs.setXPixelMovedTo (x, 1.7976931348623157E308, 0, 0);
}}}
this.linking = false;
}, "JSV.common.GraphSet,~N,~B");
Clazz_defineMethod (c$, "set2DCrossHairsLinked", 
function (graphSet, x, y, isLocked) {
for (var i = this.graphSets.size (); --i >= 0; ) {
var gs = this.graphSets.get (i);
if (gs !== graphSet) gs.set2DXY (x, y, isLocked);
}
}, "JSV.common.GraphSet,~N,~N,~B");
Clazz_defineMethod (c$, "dialogsToFront", 
function (spec) {
this.currentGraphSet.dialogsToFront (spec);
}, "JSV.common.Spectrum");
Clazz_defineMethod (c$, "setColor", 
function (st, color) {
if (color != null) this.options.put (st, JU.CU.toRGBHexString (color));
switch (st) {
case JSV.common.ScriptToken.COORDINATESCOLOR:
this.coordinatesColor = color;
return;
case JSV.common.ScriptToken.HIGHLIGHTCOLOR:
this.highlightColor = color;
if (this.highlightColor.getOpacity255 () == 255) this.highlightColor.setOpacity255 (150);
return;
case JSV.common.ScriptToken.ZOOMBOXCOLOR:
this.zoomBoxColor = color;
return;
case JSV.common.ScriptToken.ZOOMBOXCOLOR2:
this.zoomBoxColor2 = color;
return;
case JSV.common.ScriptToken.BACKGROUNDCOLOR:
this.jsvp.setBackgroundColor (this.bgcolor = color);
break;
case JSV.common.ScriptToken.GRIDCOLOR:
this.gridColor = color;
break;
case JSV.common.ScriptToken.INTEGRALPLOTCOLOR:
this.integralPlotColor = color;
break;
case JSV.common.ScriptToken.PEAKTABCOLOR:
this.peakTabColor = color;
break;
case JSV.common.ScriptToken.PLOTCOLOR:
for (var i = this.graphSets.size (); --i >= 0; ) this.graphSets.get (i).setPlotColor0 (color);

break;
case JSV.common.ScriptToken.PLOTAREACOLOR:
this.plotAreaColor = color;
break;
case JSV.common.ScriptToken.SCALECOLOR:
this.scaleColor = color;
break;
case JSV.common.ScriptToken.TITLECOLOR:
this.titleColor = color;
break;
case JSV.common.ScriptToken.UNITSCOLOR:
this.unitsColor = color;
break;
default:
JU.Logger.warn ("AwtPanel --- unrecognized color: " + st);
return;
}
this.taintedAll = true;
}, "JSV.common.ScriptToken,javajs.api.GenericColor");
Clazz_defineMethod (c$, "getColor", 
function (whatColor) {
switch (whatColor) {
default:
JU.Logger.error ("awtgraphset missing color " + whatColor);
return this.BLACK;
case JSV.common.ScriptToken.ZOOMBOXCOLOR2:
return this.zoomBoxColor2;
case JSV.common.ScriptToken.ZOOMBOXCOLOR:
return this.zoomBoxColor;
case JSV.common.ScriptToken.HIGHLIGHTCOLOR:
return this.highlightColor;
case JSV.common.ScriptToken.INTEGRALPLOTCOLOR:
return this.integralPlotColor;
case JSV.common.ScriptToken.GRIDCOLOR:
return this.gridColor;
case JSV.common.ScriptToken.PEAKTABCOLOR:
return this.peakTabColor;
case JSV.common.ScriptToken.PLOTAREACOLOR:
return this.plotAreaColor;
case JSV.common.ScriptToken.SCALECOLOR:
return this.scaleColor;
case JSV.common.ScriptToken.TITLECOLOR:
return this.titleColor;
case JSV.common.ScriptToken.UNITSCOLOR:
return this.unitsColor;
}
}, "JSV.common.ScriptToken");
Clazz_defineMethod (c$, "getOverlayLegendData", 
function () {
var numSpectra = this.currentGraphSet.nSpectra;
var data =  new Array (numSpectra);
var f1 = this.getSpectrumAt (0).getFilePath ();
var f2 = this.getSpectrumAt (numSpectra - 1).getFilePath ();
var useFileName = f1 != null && f2 != null && !f1.equals (f2);
for (var index = 0; index < numSpectra; index++) {
var cols =  new Array (3);
var spectrum = this.getSpectrumAt (index);
this.title = spectrum.getTitle ();
if (useFileName) this.title = JSV.common.JSVFileManager.getTagName (spectrum.getFilePath ()) + " - " + this.title;
var plotColor = this.getCurrentPlotColor (index);
cols[0] =  new Integer (index + 1);
cols[1] = plotColor;
cols[2] = " " + this.title;
data[index] = cols;
}
return data;
});
Clazz_defineMethod (c$, "setColorOrFont", 
function (params, st) {
if (st == null) {
var colors = params.elementColors;
for (var entry, $entry = colors.entrySet ().iterator (); $entry.hasNext () && ((entry = $entry.next ()) || true);) this.setColorOrFont (params, entry.getKey ());

this.setColorOrFont (params, JSV.common.ScriptToken.DISPLAYFONTNAME);
this.setColorOrFont (params, JSV.common.ScriptToken.TITLEFONTNAME);
return;
}switch (st) {
case JSV.common.ScriptToken.DISPLAYFONTNAME:
this.setFontName (st, params.displayFontName);
return;
case JSV.common.ScriptToken.TITLEFONTNAME:
this.setFontName (st, params.titleFontName);
return;
}
this.setColor (st, params.getElementColor (st));
}, "JSV.common.ColorParameters,JSV.common.ScriptToken");
Clazz_defineMethod (c$, "getCurrentPlotColor", 
function (i) {
return this.currentGraphSet.getPlotColor (i);
}, "~N");
Clazz_defineMethod (c$, "setPrint", 
function (pl, fontName) {
if (pl == null) {
this.options.putAll (this.optionsSaved);
this.optionsSaved = null;
return;
}this.printJobTitle = pl.title;
this.printingFontName = fontName;
this.printGraphPosition = pl.position;
this.optionsSaved =  new java.util.Hashtable ();
this.optionsSaved.putAll (this.options);
this.gridOn = pl.showGrid;
this.titleOn = pl.showTitle;
this.setBoolean (JSV.common.ScriptToken.XSCALEON, pl.showXScale);
this.setBoolean (JSV.common.ScriptToken.XUNITSON, pl.showXScale);
this.setBoolean (JSV.common.ScriptToken.YSCALEON, pl.showYScale);
this.setBoolean (JSV.common.ScriptToken.YUNITSON, pl.showYScale);
}, "JSV.common.PrintLayout,~S");
Clazz_defineMethod (c$, "setDefaultPrintOptions", 
function (pl) {
pl.showGrid = this.gridOn;
pl.showXScale = this.getBoolean (JSV.common.ScriptToken.XSCALEON);
pl.showYScale = this.getBoolean (JSV.common.ScriptToken.YSCALEON);
pl.showTitle = this.titleOn;
}, "JSV.common.PrintLayout");
Clazz_defineMethod (c$, "showDialog", 
function (type) {
var ad = this.getDialog (type);
this.closeAllDialogsExcept (type);
if (ad != null && Clazz_instanceOf (ad, JSV.dialog.JSVDialog)) return (ad).reEnable ();
var iSpec = this.getCurrentSpectrumIndex ();
if (iSpec < 0) {
this.jsvp.showMessage ("To enable " + type + " first select a spectrum by clicking on it.", "" + type);
return null;
}var spec = this.getSpectrum ();
var dialog = this.vwr.getDialog (type, spec);
if (ad == null && type === JSV.common.Annotation.AType.Measurements) ad =  new JSV.common.MeasurementData (JSV.common.Annotation.AType.Measurements, spec);
if (ad != null) dialog.setData (ad);
this.addDialog (iSpec, type, dialog);
dialog.reEnable ();
return dialog;
}, "JSV.common.Annotation.AType");
Clazz_defineMethod (c$, "printPdf", 
function (pdfCreator, pl) {
var isPortrait = !pl.layout.equals ("landscape");
this.print (pdfCreator, (isPortrait ? pl.imageableHeight : pl.imageableWidth), (isPortrait ? pl.imageableWidth : pl.imageableHeight), pl.imageableX, pl.imageableY, pl.paperHeight, pl.paperWidth, isPortrait, 0);
}, "J.api.GenericGraphics,JSV.common.PrintLayout");
Clazz_defineMethod (c$, "print", 
function (g, height, width, x, y, paperHeight, paperWidth, isPortrait, pi) {
this.g2d = this.g2d0;
if (pi == 0) {
this.isPrinting = true;
var addFilePath = false;
if (Clazz_instanceOf (g, J.api.GenericGraphics)) {
this.g2d = g;
g = this.gMain;
}if (this.printGraphPosition.equals ("default")) {
if (isPortrait) {
height = 450;
width = 280;
} else {
height = 280;
width = 450;
}} else if (this.printGraphPosition.equals ("fit to page")) {
addFilePath = true;
} else {
if (isPortrait) {
height = 450;
width = 280;
x = Clazz_doubleToInt (Clazz_doubleToInt (paperWidth - width) / 2);
y = Clazz_doubleToInt (Clazz_doubleToInt (paperHeight - height) / 2);
} else {
height = 280;
width = 450;
y = Clazz_doubleToInt (Clazz_doubleToInt (paperWidth - 280) / 2);
x = Clazz_doubleToInt (Clazz_doubleToInt (paperHeight - 450) / 2);
}}this.g2d.translateScale (g, x, y, 0.1);
this.setTaintedAll ();
this.drawGraph (g, g, g, Clazz_doubleToInt (width), Clazz_doubleToInt (height), addFilePath);
this.isPrinting = false;
return 0;
}this.isPrinting = false;
return 1;
}, "~O,~N,~N,~N,~N,~N,~N,~B,~N");
Clazz_overrideMethod (c$, "keyPressed", 
function (code, modifiers) {
if (this.isPrinting) return false;
this.checkKeyControl (code, true);
switch (code) {
case 27:
case 127:
case 8:
this.escapeKeyPressed (code != 27);
this.isIntegralDrag = false;
this.setTaintedAll ();
this.repaint ();
return true;
}
var scaleFactor = 0;
var doConsume = false;
if (modifiers == 0) {
switch (code) {
case 37:
case 39:
this.doMouseMoved ((code == 39 ? ++this.mouseX : --this.mouseX), this.mouseY);
this.repaint ();
doConsume = true;
break;
case 33:
case 34:
scaleFactor = (code == 33 ? JSV.common.GraphSet.RT2 : 1 / JSV.common.GraphSet.RT2);
doConsume = true;
break;
case 40:
case 38:
var dir = (code == 40 ? -1 : 1);
if (this.getSpectrumAt (0).getSubSpectra () == null) {
this.notifySubSpectrumChange (dir, null);
} else {
this.advanceSubSpectrum (dir);
this.setTaintedAll ();
this.repaint ();
}doConsume = true;
break;
}
} else if (this.checkMod (code, 2)) {
switch (code) {
case 40:
case 38:
case 45:
case 61:
scaleFactor = (code == 61 || code == 38 ? JSV.common.GraphSet.RT2 : 1 / JSV.common.GraphSet.RT2);
doConsume = true;
break;
case 37:
case 39:
this.toPeak (code == 39 ? 1 : -1);
doConsume = true;
break;
}
}if (scaleFactor != 0) {
this.scaleYBy (scaleFactor);
this.setTaintedAll ();
this.repaint ();
}return doConsume;
}, "~N,~N");
Clazz_overrideMethod (c$, "keyReleased", 
function (keyCode) {
if (this.isPrinting) return;
this.checkKeyControl (keyCode, false);
}, "~N");
Clazz_overrideMethod (c$, "keyTyped", 
function (ch, mods) {
if (this.isPrinting) return false;
switch (ch) {
case 'n':
if (mods != 0) break;
this.normalizeIntegral ();
return true;
case 26:
if (mods != 2) break;
this.previousView ();
this.setTaintedAll ();
this.repaint ();
return true;
case 25:
if (mods != 2) break;
this.nextView ();
this.setTaintedAll ();
this.repaint ();
return true;
}
return false;
}, "~N,~N");
Clazz_overrideMethod (c$, "mouseAction", 
function (mode, time, x, y, countIgnored, buttonMods) {
if (this.isPrinting) return;
switch (mode) {
case 4:
if (!this.checkMod (buttonMods, 16)) return;
this.doMousePressed (x, y);
break;
case 5:
this.doMouseReleased (x, y, this.checkMod (buttonMods, 16));
this.setTaintedAll ();
this.repaint ();
break;
case 1:
this.doMouseDragged (x, y);
this.repaint ();
break;
case 0:
this.jsvp.getFocusNow (false);
if ((buttonMods & 28) != 0) {
this.doMouseDragged (x, y);
this.repaint ();
return;
}this.doMouseMoved (x, y);
if (this.coordStr != null) this.repaint ();
break;
case 2:
if (this.checkMod (buttonMods, 4)) {
this.jsvp.showMenu (x, y);
return;
}this.ctrlPressed = false;
this.doMouseClicked (x, y, this.updateControlPressed (buttonMods));
break;
}
}, "~N,~N,~N,~N,~N,~N");
Clazz_defineMethod (c$, "checkMod", 
function (buttonMods, mask) {
return ((buttonMods & mask) == mask);
}, "~N,~N");
Clazz_defineMethod (c$, "checkKeyControl", 
function (keyCode, isPressed) {
switch (keyCode) {
case 17:
case 157:
this.ctrlPressed = isPressed;
break;
case 16:
this.shiftPressed = isPressed;
break;
}
}, "~N,~B");
Clazz_defineMethod (c$, "updateControlPressed", 
function (mods) {
return (this.ctrlPressed = new Boolean (this.ctrlPressed | (this.checkMod (mods, 2) || this.checkMod (mods, 20))).valueOf ());
}, "~N");
Clazz_overrideMethod (c$, "mouseEnterExit", 
function (time, x, y, isExit) {
if (isExit) {
this.thisWidget = null;
this.isIntegralDrag = false;
this.integralShiftMode = 0;
} else {
try {
this.jsvp.getFocusNow (false);
} catch (e) {
if (Clazz_exceptionOf (e, Exception)) {
System.out.println ("pd " + this + " cannot focus");
} else {
throw e;
}
}
}}, "~N,~N,~N,~B");
Clazz_defineMethod (c$, "setSolutionColor", 
function (what) {
var isNone = (what.indexOf ("none") >= 0);
var asFitted = (what.indexOf ("false") < 0);
if (what.indexOf ("all") < 0) {
var color = (isNone ? -1 : this.vwr.getSolutionColor (asFitted));
this.getSpectrum ().setFillColor (color == -1 ? null : this.vwr.parameters.getColor1 (color));
} else {
var vi = JSV.common.JSViewer.getInterface ("JSV.common.Visible");
for (var i = this.graphSets.size (); --i >= 0; ) this.graphSets.get (i).setSolutionColor (vi, isNone, asFitted);

}}, "~S");
Clazz_defineMethod (c$, "setIRMode", 
function (mode, type) {
for (var i = this.graphSets.size (); --i >= 0; ) this.graphSets.get (i).setIRMode (mode, type);

}, "JSV.common.Spectrum.IRMode,~S");
Clazz_defineMethod (c$, "closeSpectrum", 
function () {
this.vwr.close ("views");
this.vwr.close (this.getSourceID ());
this.vwr.execView ("*", true);
});
Clazz_pu$h(self.c$);
c$ = Clazz_declareType (JSV.common.PanelData, "LinkMode", Enum);
c$.getMode = Clazz_defineMethod (c$, "getMode", 
function (a) {
if (a.equals ("*")) return JSV.common.PanelData.LinkMode.ALL;
for (var mode, $mode = 0, $$mode = JSV.common.PanelData.LinkMode.values (); $mode < $$mode.length && ((mode = $$mode[$mode]) || true); $mode++) if (mode.name ().equalsIgnoreCase (a)) return mode;

return JSV.common.PanelData.LinkMode.NONE;
}, "~S");
Clazz_defineEnumConstant (c$, "ALL", 0, []);
Clazz_defineEnumConstant (c$, "NONE", 1, []);
Clazz_defineEnumConstant (c$, "AB", 2, []);
Clazz_defineEnumConstant (c$, "ABC", 3, []);
c$ = Clazz_p0p ();
Clazz_pu$h(self.c$);
c$ = Clazz_declareType (JSV.common.PanelData, "Mouse", Enum);
Clazz_defineEnumConstant (c$, "UP", 0, []);
Clazz_defineEnumConstant (c$, "DOWN", 1, []);
c$ = Clazz_p0p ();
Clazz_defineStatics (c$,
"defaultPrintHeight", 450,
"defaultPrintWidth", 280,
"topMargin", 40,
"bottomMargin", 50,
"leftMargin", 60,
"rightMargin", 50);
});
Clazz_declarePackage ("JSV.common");
Clazz_load (null, "JSV.common.PanelNode", ["JU.SB", "JSV.common.Parameters"], function () {
c$ = Clazz_decorateAsClass (function () {
this.treeNode = null;
this.source = null;
this.fileName = null;
this.jsvp = null;
this.id = null;
this.legend = null;
this.isSelected = false;
this.isView = false;
this.isSimulation = false;
this.frameTitle = null;
Clazz_instantialize (this, arguments);
}, JSV.common, "PanelNode");
Clazz_makeConstructor (c$, 
function (id, fileName, source, jsvp) {
this.id = id;
this.source = source;
this.fileName = fileName;
this.isSimulation = (source.getFilePath ().indexOf ("http://SIMULATION/") >= 0);
this.jsvp = jsvp;
if (jsvp != null) {
this.pd ().getSpectrumAt (0).setId (id);
this.frameTitle = jsvp.getTitle ();
}}, "~S,~S,JSV.source.JDXSource,JSV.api.JSVPanel");
Clazz_defineMethod (c$, "setTreeNode", 
function (node) {
this.treeNode = node;
}, "JSV.api.JSVTreeNode");
Clazz_defineMethod (c$, "getTreeNode", 
function () {
return this.treeNode;
});
Clazz_defineMethod (c$, "dispose", 
function () {
this.source.dispose ();
if (this.jsvp != null) this.jsvp.dispose ();
this.source = null;
this.jsvp = null;
this.legend = null;
});
Clazz_defineMethod (c$, "pd", 
function () {
return this.jsvp.getPanelData ();
});
Clazz_defineMethod (c$, "getSpectrum", 
function () {
return this.pd ().getSpectrum ();
});
Clazz_defineMethod (c$, "setLegend", 
function (legend) {
if (this.legend != null) this.legend.dispose ();
this.legend = legend;
return legend;
}, "JSV.dialog.JSVDialog");
Clazz_overrideMethod (c$, "toString", 
function () {
return ((this.id == null ? "" : this.id + ": ") + (this.frameTitle == null ? this.fileName : this.frameTitle));
});
c$.findSourceByNameOrId = Clazz_defineMethod (c$, "findSourceByNameOrId", 
function (id, panelNodes) {
for (var i = panelNodes.size (); --i >= 0; ) {
var node = panelNodes.get (i);
if (id.equals (node.id) || id.equals (node.source.getSpectra ().get (0).sourceID) || node.source.matchesFilePath (id)) return node.source;
}
for (var i = panelNodes.size (); --i >= 0; ) {
var node = panelNodes.get (i);
if (id.equals (node.fileName)) return node.source;
}
return null;
}, "~S,JU.Lst");
c$.findNodeById = Clazz_defineMethod (c$, "findNodeById", 
function (id, panelNodes) {
if (id != null) for (var i = panelNodes.size (); --i >= 0; ) if (id.equals (panelNodes.get (i).id) || id.equals (panelNodes.get (i).frameTitle)) return panelNodes.get (i);

return null;
}, "~S,JU.Lst");
c$.findNode = Clazz_defineMethod (c$, "findNode", 
function (jsvp, panelNodes) {
for (var i = panelNodes.size (); --i >= 0; ) if (panelNodes.get (i).jsvp === jsvp) return panelNodes.get (i);

return null;
}, "JSV.api.JSVPanel,JU.Lst");
c$.getSpectrumListAsString = Clazz_defineMethod (c$, "getSpectrumListAsString", 
function (panelNodes) {
var sb =  new JU.SB ();
for (var i = 0; i < panelNodes.size (); i++) {
var node = panelNodes.get (i);
if (!node.isView) sb.append (" ").append (node.id);
}
return sb.toString ().trim ();
}, "JU.Lst");
c$.isOpen = Clazz_defineMethod (c$, "isOpen", 
function (panelNodes, filePath) {
var pt = -1;
if (filePath != null) for (var i = panelNodes.size (); --i >= 0; ) {
if (panelNodes.get (i).source.matchesFilePath (filePath) || filePath.equals (panelNodes.get (i).frameTitle)) return pt;
}
return -1;
}, "JU.Lst,~S");
Clazz_defineMethod (c$, "setFrameTitle", 
function (name) {
this.frameTitle = name;
}, "~S");
c$.getLastFileFirstNode = Clazz_defineMethod (c$, "getLastFileFirstNode", 
function (panelNodes) {
var n = panelNodes.size ();
var node = (n == 0 ? null : panelNodes.get (n - 1));
for (var i = n - 1; --i >= 0; ) {
if (panelNodes.get (i).source !== node.source) break;
node = panelNodes.get (i);
}
return (node == null ? null : node.jsvp);
}, "JU.Lst");
Clazz_defineMethod (c$, "getInfo", 
function (key) {
var info = this.pd ().getInfo (false, key);
JSV.common.Parameters.putInfo (key, info, "panelId", this.id);
JSV.common.Parameters.putInfo (key, info, "panelFileName", this.fileName);
JSV.common.Parameters.putInfo (key, info, "panelSource", this.source.getFilePath ());
return info;
}, "~S");
});
Clazz_declarePackage ("JSV.common");
Clazz_load (null, "JSV.common.Parameters", ["java.lang.Boolean", "java.util.Hashtable", "JSV.common.ScriptToken"], function () {
c$ = Clazz_decorateAsClass (function () {
this.name = null;
this.integralMinY = 0.1;
this.integralRange = 50.0;
this.integralOffset = 30.0;
this.integralDrawAll = false;
this.viewOffset = 0;
this.peakListThreshold = NaN;
this.peakListInterpolation = "parabolic";
this.precision = 2;
this.htBooleans = null;
Clazz_instantialize (this, arguments);
}, JSV.common, "Parameters");
Clazz_makeConstructor (c$, 
function () {
this.htBooleans =  new java.util.Hashtable ();
this.setBoolean (JSV.common.ScriptToken.TITLEON, true);
this.setBoolean (JSV.common.ScriptToken.ENABLEZOOM, true);
this.setBoolean (JSV.common.ScriptToken.DISPLAY2D, true);
this.setBoolean (JSV.common.ScriptToken.COORDINATESON, true);
this.setBoolean (JSV.common.ScriptToken.PEAKTABSON, true);
this.setBoolean (JSV.common.ScriptToken.POINTSONLY, false);
this.setBoolean (JSV.common.ScriptToken.GRIDON, true);
this.setBoolean (JSV.common.ScriptToken.XSCALEON, true);
this.setBoolean (JSV.common.ScriptToken.YSCALEON, true);
this.setBoolean (JSV.common.ScriptToken.XUNITSON, true);
this.setBoolean (JSV.common.ScriptToken.YUNITSON, true);
});
Clazz_defineMethod (c$, "setName", 
function (name) {
this.name = name;
return this;
}, "~S");
Clazz_defineMethod (c$, "getBooleans", 
function () {
return this.htBooleans;
});
Clazz_defineMethod (c$, "setBoolean", 
function (st, val) {
this.htBooleans.put (st, Boolean.$valueOf (val));
return val;
}, "JSV.common.ScriptToken,~B");
Clazz_defineMethod (c$, "getBoolean", 
function (t) {
return Boolean.TRUE === this.htBooleans.get (t);
}, "JSV.common.ScriptToken");
c$.isTrue = Clazz_defineMethod (c$, "isTrue", 
function (value) {
return (value.length == 0 || Boolean.parseBoolean (value));
}, "~S");
c$.getTFToggle = Clazz_defineMethod (c$, "getTFToggle", 
function (value) {
return (value.equalsIgnoreCase ("TOGGLE") ? null : JSV.common.Parameters.isTrue (value) ? Boolean.TRUE : Boolean.FALSE);
}, "~S");
Clazz_defineMethod (c$, "setP", 
function (pd, st, value) {
switch (st) {
default:
return;
case JSV.common.ScriptToken.COORDINATESON:
case JSV.common.ScriptToken.DISPLAY1D:
case JSV.common.ScriptToken.DISPLAY2D:
case JSV.common.ScriptToken.ENABLEZOOM:
case JSV.common.ScriptToken.GRIDON:
case JSV.common.ScriptToken.POINTSONLY:
case JSV.common.ScriptToken.PEAKTABSON:
case JSV.common.ScriptToken.REVERSEPLOT:
case JSV.common.ScriptToken.TITLEON:
case JSV.common.ScriptToken.TITLEBOLDON:
case JSV.common.ScriptToken.XSCALEON:
case JSV.common.ScriptToken.XUNITSON:
case JSV.common.ScriptToken.YSCALEON:
case JSV.common.ScriptToken.YUNITSON:
var tfToggle = JSV.common.Parameters.getTFToggle (value);
if (tfToggle != null) {
this.setBoolean (st, tfToggle.booleanValue ());
break;
}if (pd == null) return;
var b = !pd.getBoolean (st);
switch (st) {
default:
break;
case JSV.common.ScriptToken.XSCALEON:
this.setBoolean (JSV.common.ScriptToken.XUNITSON, b);
pd.setBoolean (JSV.common.ScriptToken.XUNITSON, b);
break;
case JSV.common.ScriptToken.YSCALEON:
this.setBoolean (JSV.common.ScriptToken.YUNITSON, b);
pd.setBoolean (JSV.common.ScriptToken.YUNITSON, b);
break;
}
this.setBoolean (st, b);
break;
}
if (pd == null) return;
pd.setBooleans (this, st);
}, "JSV.common.PanelData,JSV.common.ScriptToken,~S");
c$.isMatch = Clazz_defineMethod (c$, "isMatch", 
function (match, key) {
return match == null || key.equalsIgnoreCase (match);
}, "~S,~S");
c$.putInfo = Clazz_defineMethod (c$, "putInfo", 
function (match, info, key, value) {
if (value != null && JSV.common.Parameters.isMatch (match, key)) info.put (match == null ? key : match, value);
}, "~S,java.util.Map,~S,~O");
});
Clazz_declarePackage ("JSV.common");
Clazz_load (["JSV.common.MeasurementData"], "JSV.common.PeakData", ["java.lang.Double", "JU.DF", "JSV.common.Coordinate", "$.PeakPick"], function () {
c$ = Clazz_decorateAsClass (function () {
this.thresh = 0;
this.minY = 0;
this.maxY = 0;
Clazz_instantialize (this, arguments);
}, JSV.common, "PeakData", JSV.common.MeasurementData);
Clazz_defineMethod (c$, "getThresh", 
function () {
return this.thresh;
});
Clazz_overrideMethod (c$, "getDataHeader", 
function () {
return (this.spec.isHNMR () ? JSV.common.PeakData.HNMR_HEADER :  Clazz_newArray (-1, ["peak", this.spec.getXUnits (), this.spec.getYUnits ()]));
});
Clazz_overrideMethod (c$, "getMeasurementListArray", 
function (units) {
var data =  new Array (this.size ());
var last =  Clazz_newDoubleArray (-1, [-1.0E100, 1e100, 1e100]);
var ddata;
for (var pt = 0, i = this.size (); --i >= 0; pt++) {
ddata = this.spec.getPeakListArray (this.get (i), last, this.maxY);
if (ddata.length == 2) data[pt] =  Clazz_newArray (-1, ["" + (pt + 1), JU.DF.formatDecimalDbl (ddata[0], 2), JU.DF.formatDecimalDbl (ddata[1], 4)]);
 else data[pt] =  Clazz_newArray (-1, ["" + (pt + 1), JU.DF.formatDecimalDbl (ddata[0], 4), JU.DF.formatDecimalDbl (ddata[1], 4), JU.DF.formatDecimalDbl (ddata[2], 2), (ddata[3] == 0 ? "" : JU.DF.formatDecimalDbl (ddata[3], 2)), (ddata[4] == 0 ? "" : JU.DF.formatDecimalDbl (ddata[4], 2)), (ddata[5] == 0 ? "" : JU.DF.formatDecimalDbl (ddata[5], 2))]);
}
return data;
}, "~S");
Clazz_overrideMethod (c$, "getMeasurementListArrayReal", 
function (units) {
var data =  Clazz_newDoubleArray (this.size (), 0);
var last =  Clazz_newDoubleArray (-1, [-1.0E100, 1e100, 1e100]);
for (var pt = 0, i = this.size (); --i >= 0; pt++) data[pt] = this.spec.getPeakListArray (this.get (i), last, this.maxY);

return data;
}, "~S");
Clazz_defineMethod (c$, "getInfo", 
function (info) {
info.put ("interpolation", this.myParams.peakListInterpolation);
info.put ("threshold", Double.$valueOf (this.myParams.peakListThreshold));
Clazz_superCall (this, JSV.common.PeakData, "getInfo", [info]);
}, "java.util.Map");
Clazz_defineMethod (c$, "setPeakList", 
function (p, precision, view) {
this.precision = (precision == -2147483648 ? this.spec.getDefaultUnitPrecision () : precision);
var xyCoords = this.spec.getXYCoords ();
if (xyCoords.length < 3) return;
this.clear ();
if (p != null) {
this.myParams.peakListInterpolation = p.peakListInterpolation;
this.myParams.peakListThreshold = p.peakListThreshold;
}var doInterpolate = (this.myParams.peakListInterpolation.equals ("parabolic"));
var isInverted = this.spec.isInverted ();
this.minY = view.minYOnScale;
this.maxY = view.maxYOnScale;
var minX = view.minXOnScale;
var maxX = view.maxXOnScale;
this.thresh = this.myParams.peakListThreshold;
if (Double.isNaN (this.thresh)) this.thresh = this.myParams.peakListThreshold = (this.minY + this.maxY) / 2;
var yLast = 0;
var y3 =  Clazz_newDoubleArray (-1, [xyCoords[0].getYVal (), yLast = xyCoords[1].getYVal (), 0]);
var n = 0;
if (isInverted) for (var i = 2; i < xyCoords.length; i++) {
var y = y3[i % 3] = xyCoords[i].getYVal ();
if (yLast < this.thresh && y3[(i - 2) % 3] > yLast && yLast < y) {
var x = (doInterpolate ? JSV.common.Coordinate.parabolicInterpolation (xyCoords, i - 1) : xyCoords[i - 1].getXVal ());
if (x >= minX || x <= maxX) {
var m =  new JSV.common.PeakPick ().setValue (x, y, this.spec, null, 0);
this.addLast (m);
if (++n == 100) break;
}}yLast = y;
}
 else for (var i = 2; i < xyCoords.length; i++) {
var y = y3[i % 3] = xyCoords[i].getYVal ();
if (yLast > this.thresh && y3[(i - 2) % 3] < yLast && yLast > y) {
var x = (doInterpolate ? JSV.common.Coordinate.parabolicInterpolation (xyCoords, i - 1) : xyCoords[i - 1].getXVal ());
if (x >= minX && x <= maxX) {
var m =  new JSV.common.PeakPick ().setValue (x, y, this.spec, JU.DF.formatDecimalDbl (x, precision), x);
this.addLast (m);
if (++n == 100) break;
}}yLast = y;
}
}, "JSV.common.Parameters,~N,JSV.common.ScaleData");
c$.HNMR_HEADER = c$.prototype.HNMR_HEADER =  Clazz_newArray (-1, ["peak", "shift/ppm", "intens", "shift/hz", "diff/hz", "2-diff", "3-diff"]);
});
Clazz_declarePackage ("JSV.common");
Clazz_load (null, "JSV.common.PeakInfo", ["JU.PT"], function () {
c$ = Clazz_decorateAsClass (function () {
this.xMin = 0;
this.xMax = 0;
this.yMin = 0;
this.yMax = 0;
this.px0 = 0;
this.px1 = 0;
this.stringInfo = null;
this.type = null;
this.type2 = null;
this.index = null;
this.file = null;
this.filePathForwardSlash = null;
this.title = null;
this.model = null;
this.atoms = null;
this.id = null;
this.spectrum = null;
this._match = null;
this.atomKey = null;
Clazz_instantialize (this, arguments);
}, JSV.common, "PeakInfo");
Clazz_makeConstructor (c$, 
function () {
});
Clazz_makeConstructor (c$, 
function (s) {
this.stringInfo = s;
this.type = JU.PT.getQuotedAttribute (s, "type");
if (this.type == null) this.type = "";
this.type = this.type.toUpperCase ();
var pt = this.type.indexOf ('/');
this.type2 = (pt < 0 ? "" : JSV.common.PeakInfo.fixType (this.type.substring (this.type.indexOf ('/') + 1)));
if (pt >= 0) this.type = JSV.common.PeakInfo.fixType (this.type.substring (0, pt)) + "/" + this.type2;
 else this.type = JSV.common.PeakInfo.fixType (this.type);
this.id = JU.PT.getQuotedAttribute (s, "id");
this.index = JU.PT.getQuotedAttribute (s, "index");
this.file = JU.PT.getQuotedAttribute (s, "file");
System.out.println ("pi file=" + this.file);
this.filePathForwardSlash = (this.file == null ? null : this.file.$replace ('\\', '/'));
this.model = JU.PT.getQuotedAttribute (s, "model");
var isBaseModel = s.contains ("baseModel=\"\"");
if (!isBaseModel) this.atoms = JU.PT.getQuotedAttribute (s, "atoms");
this.atomKey = "," + this.atoms + ",";
this.title = JU.PT.getQuotedAttribute (s, "title");
this._match = JU.PT.getQuotedAttribute (s, "_match");
this.xMax = JU.PT.parseFloat (JU.PT.getQuotedAttribute (s, "xMax"));
this.xMin = JU.PT.parseFloat (JU.PT.getQuotedAttribute (s, "xMin"));
this.yMax = JU.PT.parseFloat (JU.PT.getQuotedAttribute (s, "yMax"));
this.yMin = JU.PT.parseFloat (JU.PT.getQuotedAttribute (s, "yMin"));
}, "~S");
Clazz_defineMethod (c$, "isClearAll", 
function () {
return (this.spectrum == null);
});
Clazz_defineMethod (c$, "getType", 
function () {
return this.type;
});
Clazz_defineMethod (c$, "getAtoms", 
function () {
return this.atoms;
});
Clazz_defineMethod (c$, "getXMax", 
function () {
return this.xMax;
});
Clazz_defineMethod (c$, "getXMin", 
function () {
return this.xMin;
});
Clazz_defineMethod (c$, "getYMin", 
function () {
return this.yMin;
});
Clazz_defineMethod (c$, "getYMax", 
function () {
return this.yMax;
});
Clazz_defineMethod (c$, "getX", 
function () {
return (this.xMax + this.xMin) / 2;
});
Clazz_defineMethod (c$, "getMatch", 
function () {
return this._match;
});
c$.fixType = Clazz_defineMethod (c$, "fixType", 
 function (type) {
return (type.equals ("HNMR") ? "1HNMR" : type.equals ("CNMR") ? "13CNMR" : type);
}, "~S");
Clazz_overrideMethod (c$, "toString", 
function () {
return this.stringInfo;
});
Clazz_defineMethod (c$, "getIndex", 
function () {
return this.index;
});
Clazz_defineMethod (c$, "getTitle", 
function () {
return this.title;
});
Clazz_defineMethod (c$, "checkFileIndex", 
function (filePath, sIndex, sAtomKey) {
return (sAtomKey != null ? this.atomKey.indexOf (sAtomKey) >= 0 : sIndex.equals (this.index) && (filePath.equals (this.file) || filePath.equals (this.filePathForwardSlash)));
}, "~S,~S,~S");
Clazz_defineMethod (c$, "checkFileTypeModel", 
function (filePath, type, model) {
return filePath.equals (this.file) && this.checkModel (model) && this.type.endsWith (type);
}, "~S,~S,~S");
Clazz_defineMethod (c$, "checkTypeModel", 
function (type, model) {
return this.checkType (type) && this.checkModel (model);
}, "~S,~S");
Clazz_defineMethod (c$, "checkModel", 
 function (model) {
return (model != null && model.equals (this.model));
}, "~S");
Clazz_defineMethod (c$, "checkType", 
 function (type) {
return (type.endsWith (this.type));
}, "~S");
Clazz_defineMethod (c$, "checkTypeMatch", 
function (pi) {
return (this.checkType (pi.type) && (this.checkId (pi._match) || this.checkModel (pi._match) || this.title.toUpperCase ().indexOf (pi._match) >= 0));
}, "JSV.common.PeakInfo");
Clazz_defineMethod (c$, "checkId", 
 function (match) {
if (match == null) return false;
return (this.id != null && match.toUpperCase ().startsWith ("ID=") && match.substring (3).equals (this.id) || (match = match.toUpperCase ()).startsWith ("INDEX=") && match.equals ("INDEX=" + this.index) || match.startsWith ("#=") && match.equals ("#=" + this.index));
}, "~S");
Clazz_defineMethod (c$, "getModel", 
function () {
return this.model;
});
Clazz_defineMethod (c$, "getFilePath", 
function () {
return this.file;
});
Clazz_defineMethod (c$, "autoSelectOnLoad", 
function () {
return (this.type.startsWith ("GC"));
});
Clazz_defineMethod (c$, "setPixelRange", 
function (x0, x1) {
this.px0 = x0;
this.px1 = x1;
}, "~N,~N");
Clazz_defineMethod (c$, "checkRange", 
function (xPixel, xVal) {
if (xPixel != 2147483647 ? (this.px0 <= xPixel && this.px1 >= xPixel) : xVal >= this.xMin && xVal <= this.xMax) {
return Math.abs (xVal - this.getX ());
}return 1e100;
}, "~N,~N");
Clazz_defineMethod (c$, "getXPixel", 
function () {
return Clazz_doubleToInt ((this.px0 + this.px1) / 2);
});
c$.nullPeakInfo = c$.prototype.nullPeakInfo =  new JSV.common.PeakInfo ();
});
Clazz_declarePackage ("JSV.common");
Clazz_load (["JSV.common.Measurement"], "JSV.common.PeakPick", null, function () {
c$ = Clazz_declareType (JSV.common, "PeakPick", JSV.common.Measurement);
Clazz_defineMethod (c$, "setValue", 
function (x, y, spec, text, value) {
if (text == null) {
this.set (x, y);
this.setPt2 (spec, false);
} else {
this.setA (x, y, spec, text, false, false, 0, 6);
this.value = value;
this.setPt2 (this.getXVal (), this.getYVal ());
}return this;
}, "~N,~N,JSV.common.Spectrum,~S,~N");
});
Clazz_declarePackage ("JSV.common");
Clazz_load (["java.util.EventObject"], "JSV.common.PeakPickEvent", null, function () {
c$ = Clazz_decorateAsClass (function () {
this.coord = null;
this.peakInfo = null;
Clazz_instantialize (this, arguments);
}, JSV.common, "PeakPickEvent", java.util.EventObject);
Clazz_makeConstructor (c$, 
function (source, coord, peakInfo) {
Clazz_superConstructor (this, JSV.common.PeakPickEvent, [source]);
this.coord = coord;
this.peakInfo = (peakInfo == null ? null : peakInfo);
}, "~O,JSV.common.Coordinate,JSV.common.PeakInfo");
Clazz_defineMethod (c$, "getCoord", 
function () {
return this.coord;
});
Clazz_defineMethod (c$, "getPeakInfo", 
function () {
return this.peakInfo;
});
Clazz_overrideMethod (c$, "toString", 
function () {
return (this.peakInfo == null ? null : this.peakInfo.toString ());
});
});
Clazz_declarePackage ("JSV.common");
Clazz_load (["JSV.common.Coordinate", "$.ScriptToken"], "JSV.common.PlotWidget", null, function () {
c$ = Clazz_decorateAsClass (function () {
this.xPixel0 = 0;
this.yPixel0 = 0;
this.xPixel1 = 0;
this.yPixel1 = 0;
this.isPin = false;
this.isPinOrCursor = false;
this.isXtype = false;
this.is2D = false;
this.is2Donly = false;
this.isEnabled = true;
this.isVisible = false;
this.name = null;
this.color = null;
Clazz_instantialize (this, arguments);
}, JSV.common, "PlotWidget", JSV.common.Coordinate);
Clazz_prepareFields (c$, function () {
this.color = JSV.common.ScriptToken.PLOTCOLOR;
});
Clazz_overrideMethod (c$, "toString", 
function () {
return this.name + (!this.isPinOrCursor ? "" + this.xPixel0 + " " + this.yPixel0 + " / " + this.xPixel1 + " " + this.yPixel1 : " x=" + this.getXVal () + "/" + this.xPixel0 + " y=" + this.getYVal () + "/" + this.yPixel0);
});
Clazz_makeConstructor (c$, 
function (name) {
Clazz_superConstructor (this, JSV.common.PlotWidget, []);
this.name = name;
this.isPin = (name.charAt (0) == 'p');
this.isPinOrCursor = (name.charAt (0) != 'z');
this.isXtype = (name.indexOf ("x") >= 0);
this.is2D = (name.indexOf ("2D") >= 0);
this.is2Donly = (this.is2D && name.charAt (0) == 'p');
}, "~S");
Clazz_defineMethod (c$, "selected", 
function (xPixel, yPixel) {
return (this.isVisible && Math.abs (xPixel - this.xPixel0) < 5 && Math.abs (yPixel - this.yPixel0) < 5);
}, "~N,~N");
Clazz_defineMethod (c$, "setX", 
function (x, xPixel) {
this.setXVal (x);
this.xPixel0 = this.xPixel1 = xPixel;
}, "~N,~N");
Clazz_defineMethod (c$, "setY", 
function (y, yPixel) {
this.setYVal (y);
this.yPixel0 = this.yPixel1 = yPixel;
}, "~N,~N");
Clazz_defineMethod (c$, "getValue", 
function () {
return (this.isXtype ? this.getXVal () : this.getYVal ());
});
Clazz_defineMethod (c$, "setEnabled", 
function (enabled) {
this.isEnabled = enabled;
}, "~B");
});
Clazz_declarePackage ("JSV.common");
c$ = Clazz_decorateAsClass (function () {
this.imageableX = 0;
this.imageableY = 0;
this.paperHeight = 0;
this.paperWidth = 0;
this.imageableHeight = 0;
this.imageableWidth = 0;
this.layout = "landscape";
this.position = "fit to page";
this.showGrid = true;
this.showXScale = true;
this.showYScale = true;
this.showTitle = true;
this.font = "Helvetica";
this.paper = null;
this.asPDF = true;
this.title = null;
this.date = null;
Clazz_instantialize (this, arguments);
}, JSV.common, "PrintLayout");
Clazz_prepareFields (c$, function () {
this.paperHeight = Clazz_floatToInt (Math.min (11, 11.69) * 72);
this.paperWidth = Clazz_floatToInt (Math.min (8.5, 8.27) * 72);
this.imageableHeight = this.paperHeight;
this.imageableWidth = this.paperWidth;
});
Clazz_makeConstructor (c$, 
function (pd) {
if (pd != null) {
this.asPDF = true;
pd.setDefaultPrintOptions (this);
}}, "JSV.common.PanelData");
Clazz_declarePackage ("JSV.common");
Clazz_load (null, "JSV.common.RepaintManager", ["JSV.common.JSViewer"], function () {
c$ = Clazz_decorateAsClass (function () {
this.repaintPending = false;
this.vwr = null;
Clazz_instantialize (this, arguments);
}, JSV.common, "RepaintManager");
Clazz_makeConstructor (c$, 
function (viewer) {
this.vwr = viewer;
}, "JSV.common.JSViewer");
Clazz_defineMethod (c$, "refresh", 
function () {
if (this.repaintPending) {
return false;
}this.repaintPending = true;
var applet = this.vwr.html5Applet;
var jmol = (JSV.common.JSViewer.isJS && !JSV.common.JSViewer.isSwingJS ? JSV.common.JSViewer.jmolObject : null);
if (jmol == null) {
this.vwr.selectedPanel.repaint ();
} else {
jmol.repaint (applet, false);
this.repaintDone ();
}return true;
});
Clazz_defineMethod (c$, "repaintDone", 
function () {
this.repaintPending = false;
this.notify ();
});
});
Clazz_declarePackage ("JSV.common");
Clazz_load (null, "JSV.common.ScaleData", ["java.lang.Double", "JSV.common.Coordinate"], function () {
c$ = Clazz_decorateAsClass (function () {
this.initMinYOnScale = 0;
this.initMaxYOnScale = 0;
this.initMinY = 0;
this.initMaxY = 0;
this.startDataPointIndex = 0;
this.endDataPointIndex = 0;
this.pointCount = 0;
this.minX = 0;
this.maxX = 0;
this.firstX = NaN;
this.minXOnScale = 0;
this.maxXOnScale = 0;
this.specShift = 0;
this.precision = null;
this.exportPrecision = null;
this.steps = null;
this.minorTickCounts = null;
this.minYOnScale = 0;
this.maxYOnScale = 0;
this.minY = 0;
this.maxY = 0;
this.isShiftZoomedY = false;
this.spectrumScaleFactor = 1;
this.spectrumYRef = 0;
this.userYFactor = 1;
this.firstY = 0;
this.minY2D = 0;
this.maxY2D = 0;
this.xFactorForScale = 0;
this.yFactorForScale = 0;
Clazz_instantialize (this, arguments);
}, JSV.common, "ScaleData");
Clazz_prepareFields (c$, function () {
this.precision =  Clazz_newIntArray (2, 0);
this.exportPrecision =  Clazz_newIntArray (2, 0);
this.steps =  Clazz_newDoubleArray (2, 0);
this.minorTickCounts =  Clazz_newIntArray (2, 0);
});
Clazz_makeConstructor (c$, 
function () {
});
Clazz_makeConstructor (c$, 
function (iStart, iEnd) {
this.startDataPointIndex = iStart;
this.endDataPointIndex = iEnd;
this.pointCount = this.endDataPointIndex - this.startDataPointIndex + 1;
}, "~N,~N");
Clazz_makeConstructor (c$, 
function (coords, start, end, isContinuous, isInverted) {
this.minX = JSV.common.Coordinate.getMinX (coords, start, end);
this.maxX = JSV.common.Coordinate.getMaxX (coords, start, end);
this.minY = JSV.common.Coordinate.getMinY (coords, start, end);
if (this.minY > 0 && !isContinuous) this.minY = 0;
this.maxY = JSV.common.Coordinate.getMaxY (coords, start, end);
this.setScale (isContinuous, isInverted);
}, "~A,~N,~N,~B,~B");
Clazz_defineMethod (c$, "setScale", 
function (isContinuous, isInverted) {
this.setXScale ();
if (!isContinuous) this.maxXOnScale += this.steps[0] / 2;
this.setYScale (this.minY, this.maxY, true, isInverted);
}, "~B,~B");
Clazz_defineMethod (c$, "setXScale", 
 function () {
var xStep = this.setScaleParams (this.minX, this.maxX, 0);
this.firstX = Math.floor (this.minX / xStep) * xStep;
if (Math.abs ((this.minX - this.firstX) / xStep) > 0.0001) this.firstX += xStep;
this.minXOnScale = this.minX;
this.maxXOnScale = this.maxX;
});
Clazz_defineMethod (c$, "isYZeroOnScale", 
function () {
return (this.minYOnScale < this.spectrumYRef && this.maxYOnScale > this.spectrumYRef);
});
Clazz_defineMethod (c$, "setYScale", 
function (minY, maxY, setScaleMinMax, isInverted) {
if (minY == 0 && maxY == 0) maxY = 1;
if (this.isShiftZoomedY) {
minY = this.minYOnScale;
maxY = this.maxYOnScale;
}var yStep = this.setScaleParams (minY, maxY, 1);
var dy = (isInverted ? yStep / 2 : yStep / 4);
var dy2 = (isInverted ? yStep / 4 : yStep / 2);
if (!this.isShiftZoomedY) {
this.minYOnScale = (minY == 0 ? 0 : setScaleMinMax ? dy * Math.floor (minY / dy) : minY);
this.maxYOnScale = (setScaleMinMax ? dy2 * Math.ceil (maxY * 1.05 / dy2) : maxY);
}this.firstY = (minY == 0 ? 0 : Math.floor (minY / dy) * dy);
if (this.minYOnScale < 0 && this.maxYOnScale > 0) {
this.firstY = 0;
while (this.firstY - yStep > this.minYOnScale) this.firstY -= yStep;

} else if (this.minYOnScale != 0 && Math.abs ((minY - this.firstY) / dy) > 0.0001) {
this.firstY += dy;
}if (setScaleMinMax) {
this.initMinYOnScale = this.minYOnScale;
this.initMaxYOnScale = this.maxYOnScale;
this.initMinY = minY;
this.initMaxY = maxY;
}}, "~N,~N,~B,~B");
Clazz_defineMethod (c$, "scale2D", 
function (f) {
var dy = this.maxY - this.minY;
if (f == 1) {
this.maxY = this.initMaxY;
this.minY = this.initMinY;
return;
}this.maxY = this.minY + dy / f;
}, "~N");
Clazz_defineMethod (c$, "setXRange", 
function (x1, x2) {
this.minX = x1;
this.maxX = x2;
this.setXScale ();
}, "~N,~N");
c$.getXRange = Clazz_defineMethod (c$, "getXRange", 
 function (i, xyCoords, initX, finalX, iStart, iEnd, startIndices, endIndices) {
var index = 0;
var ptCount = 0;
for (index = iStart; index <= iEnd; index++) {
if (xyCoords[index].getXVal () >= initX) {
startIndices[i] = index;
ptCount = 1;
break;
}}
while (++index <= iEnd && xyCoords[index].getXVal () <= finalX) {
ptCount++;
}
endIndices[i] = startIndices[i] + ptCount - 1;
return ptCount;
}, "~N,~A,~N,~N,~N,~N,~A,~A");
Clazz_defineMethod (c$, "setScaleParams", 
 function (min, max, i) {
var dx = (max == min ? 1 : Math.abs (max - min) / 14);
var log = Math.log10 (Math.abs (dx));
var exp = Clazz_doubleToInt (Math.floor (log));
this.exportPrecision[i] = exp;
this.precision[i] = (exp <= 0 ? Math.min (8, 1 - exp) : exp > 3 ? -2 : 0);
var j = 0;
var dec = Math.pow (10, log - exp);
while (dec > JSV.common.ScaleData.NTICKS[j]) {
j++;
}
this.steps[i] = Math.pow (10, exp) * JSV.common.ScaleData.NTICKS[j];
log = Math.log10 (Math.abs (this.steps[i] * 1.0001e5));
var mantissa = log - Math.floor (log);
var n = 0;
for (j = 0; j < JSV.common.ScaleData.NTICKS.length; j++) if (Math.abs (mantissa - JSV.common.ScaleData.LOGTICKS[j]) < 0.001) {
n = JSV.common.ScaleData.NTICKS[j];
break;
}
this.minorTickCounts[i] = n;
return this.steps[i];
}, "~N,~N,~N");
Clazz_defineMethod (c$, "isInRangeX", 
function (x) {
return (x >= this.minX && x <= this.maxX);
}, "~N");
Clazz_defineMethod (c$, "addSpecShift", 
function (dx) {
this.specShift += dx;
this.minX += dx;
this.maxX += dx;
this.minXOnScale += dx;
this.maxXOnScale += dx;
this.firstX += dx;
}, "~N");
Clazz_defineMethod (c$, "getInfo", 
function (info) {
info.put ("specShift", Double.$valueOf (this.specShift));
info.put ("minX", Double.$valueOf (this.minX));
info.put ("maxX", Double.$valueOf (this.maxX));
info.put ("minXOnScale", Double.$valueOf (this.minXOnScale));
info.put ("maxXOnScale", Double.$valueOf (this.maxXOnScale));
info.put ("minY", Double.$valueOf (this.minY));
info.put ("maxY", Double.$valueOf (this.maxY));
info.put ("minYOnScale", Double.$valueOf (this.minYOnScale));
info.put ("maxYOnScale", Double.$valueOf (this.maxYOnScale));
info.put ("minorTickCountX", Integer.$valueOf (this.minorTickCounts[0]));
info.put ("xStep", Double.$valueOf (this.steps[0]));
return info;
}, "java.util.Map");
Clazz_defineMethod (c$, "setMinMax", 
function (minX, maxX, minY, maxY) {
this.minX = minX;
this.maxX = maxX;
this.minY = minY;
this.maxY = maxY;
}, "~N,~N,~N,~N");
Clazz_defineMethod (c$, "toX", 
function (xPixel, xPixel1, drawXAxisLeftToRight) {
return this.toXScaled (xPixel, xPixel1, drawXAxisLeftToRight, this.xFactorForScale);
}, "~N,~N,~B");
Clazz_defineMethod (c$, "toX0", 
function (xPixel, xPixel0, xPixel1, drawXAxisLeftToRight) {
return this.toXScaled (xPixel, xPixel1, drawXAxisLeftToRight, (this.maxXOnScale - this.minXOnScale) / (xPixel1 - xPixel0));
}, "~N,~N,~N,~B");
Clazz_defineMethod (c$, "toXScaled", 
 function (xPixel, xPixel1, drawXAxisLeftToRight, factor) {
return (drawXAxisLeftToRight ? this.maxXOnScale - (xPixel1 - xPixel) * factor : this.minXOnScale + (xPixel1 - xPixel) * factor);
}, "~N,~N,~B,~N");
Clazz_defineMethod (c$, "toPixelX", 
function (dx, xPixel0, xPixel1, drawXAxisLeftToRight) {
return this.toPixelXScaled (dx, xPixel0, xPixel1, drawXAxisLeftToRight, this.xFactorForScale);
}, "~N,~N,~N,~B");
Clazz_defineMethod (c$, "toPixelX0", 
function (dx, xPixel0, xPixel1, drawXAxisLeftToRight) {
return this.toPixelXScaled (dx, xPixel0, xPixel1, drawXAxisLeftToRight, (this.maxXOnScale - this.minXOnScale) / (xPixel1 - xPixel0));
}, "~N,~N,~N,~B");
Clazz_defineMethod (c$, "toPixelXScaled", 
 function (dx, xPixel0, xPixel1, drawXAxisLeftToRight, factor) {
var x = Clazz_doubleToInt ((dx - this.minXOnScale) / factor);
return (drawXAxisLeftToRight ? xPixel0 + x : xPixel1 - x);
}, "~N,~N,~N,~B,~N");
Clazz_defineMethod (c$, "toY", 
function (yPixel, yPixel0) {
return this.maxYOnScale + (yPixel0 - yPixel) * this.yFactorForScale;
}, "~N,~N");
Clazz_defineMethod (c$, "toY0", 
function (yPixel, yPixel0, yPixel1) {
var factor = (this.maxYOnScale - this.minYOnScale) / (yPixel1 - yPixel0);
var y = this.maxYOnScale + (yPixel0 - yPixel) * factor;
return Math.max (this.minYOnScale, Math.min (y, this.maxYOnScale));
}, "~N,~N,~N");
Clazz_defineMethod (c$, "toPixelY", 
function (yVal, yPixel1) {
return (Double.isNaN (yVal) ? -2147483648 : yPixel1 - Clazz_doubleToInt (((yVal - this.spectrumYRef) * this.userYFactor + this.spectrumYRef - this.minYOnScale) / this.yFactorForScale));
}, "~N,~N");
Clazz_defineMethod (c$, "toPixelY0", 
function (y, yPixel0, yPixel1) {
var factor = (this.maxYOnScale - this.minYOnScale) / (yPixel1 - yPixel0);
return Clazz_doubleToInt (yPixel0 + (this.maxYOnScale - y) / factor);
}, "~N,~N,~N");
Clazz_defineMethod (c$, "setXYScale", 
function (xPixels, yPixels, isInverted) {
var yRef = this.spectrumYRef;
var f = this.spectrumScaleFactor;
var useInit = (f != 1 || this.isShiftZoomedY);
var minY = (useInit ? this.initMinYOnScale : this.minY);
var maxY = (useInit ? this.initMaxYOnScale : this.maxY);
if (useInit && yRef < minY) yRef = minY;
if (useInit && yRef > maxY) yRef = maxY;
this.setYScale ((minY - yRef) / f + yRef, (maxY - yRef) / f + yRef, f == 1, isInverted);
this.xFactorForScale = (this.maxXOnScale - this.minXOnScale) / (xPixels - 1);
this.yFactorForScale = (this.maxYOnScale - this.minYOnScale) / (yPixels - 1);
}, "~N,~N,~B");
c$.copyScaleFactors = Clazz_defineMethod (c$, "copyScaleFactors", 
function (sdFrom, sdTo) {
for (var i = 0; i < sdFrom.length; i++) {
sdTo[i].spectrumScaleFactor = sdFrom[i].spectrumScaleFactor;
sdTo[i].spectrumYRef = sdFrom[i].spectrumYRef;
sdTo[i].userYFactor = sdFrom[i].userYFactor;
sdTo[i].specShift = sdFrom[i].specShift;
sdTo[i].isShiftZoomedY = sdFrom[i].isShiftZoomedY;
}
}, "~A,~A");
c$.copyYScales = Clazz_defineMethod (c$, "copyYScales", 
function (sdFrom, sdTo) {
for (var i = 0; i < sdFrom.length; i++) {
sdTo[i].initMinYOnScale = sdFrom[i].initMinYOnScale;
sdTo[i].initMaxYOnScale = sdFrom[i].initMaxYOnScale;
sdTo[i].minY = sdFrom[i].minY;
sdTo[i].maxY = sdFrom[i].maxY;
if (sdFrom[i].isShiftZoomedY) {
sdTo[i].isShiftZoomedY = true;
sdTo[i].minYOnScale = sdFrom[i].minYOnScale;
sdTo[i].maxYOnScale = sdFrom[i].maxYOnScale;
}}
}, "~A,~A");
c$.setDataPointIndices = Clazz_defineMethod (c$, "setDataPointIndices", 
function (graphsTemp, initX, finalX, minPoints, startIndices, endIndices) {
var nSpectraOK = 0;
var nSpectra = graphsTemp.size ();
for (var i = 0; i < nSpectra; i++) {
var xyCoords = graphsTemp.get (i).getXYCoords ();
if (JSV.common.ScaleData.getXRange (i, xyCoords, initX, finalX, 0, xyCoords.length - 1, startIndices, endIndices) >= minPoints) nSpectraOK++;
}
return (nSpectraOK == nSpectra);
}, "JU.Lst,~N,~N,~N,~A,~A");
c$.fixScale = Clazz_defineMethod (c$, "fixScale", 
function (map) {
if (map.isEmpty ()) return;
while (true) {
for (var entry, $entry = map.entrySet ().iterator (); $entry.hasNext () && ((entry = $entry.next ()) || true);) {
var s = entry.getValue ();
var pt = s.indexOf ("E");
if (pt >= 0) s = s.substring (0, pt);
if (s.indexOf (".") < 0) return;
if (!s.endsWith ("0") && !s.endsWith (".")) return;
}
for (var entry, $entry = map.entrySet ().iterator (); $entry.hasNext () && ((entry = $entry.next ()) || true);) {
var s = entry.getValue ();
var pt = s.indexOf ("E");
if (pt >= 0) entry.setValue (s.substring (0, pt - 1) + s.substring (pt));
 else entry.setValue (s.substring (0, s.length - 1));
}
}
}, "java.util.Map");
Clazz_defineMethod (c$, "scaleBy", 
function (f) {
if (this.isShiftZoomedY) {
var center = (this.isYZeroOnScale () ? this.spectrumYRef : (this.minYOnScale + this.maxYOnScale) / 2);
this.minYOnScale = center - (center - this.minYOnScale) / f;
this.maxYOnScale = center - (center - this.maxYOnScale) / f;
} else {
this.spectrumScaleFactor *= f;
}}, "~N");
Clazz_defineStatics (c$,
"NTICKS",  Clazz_newIntArray (-1, [2, 5, 10, 10]));
c$.LOGTICKS = c$.prototype.LOGTICKS =  Clazz_newDoubleArray (-1, [Math.log10 (2), Math.log10 (5), 0, 1]);
});
Clazz_declarePackage ("JSV.common");
Clazz_load (["java.lang.Enum"], "JSV.common.ScriptToken", ["java.util.Hashtable", "JU.Lst", "$.PT", "$.SB", "JSV.common.ScriptTokenizer"], function () {
c$ = Clazz_decorateAsClass (function () {
this.tip = null;
this.description = null;
Clazz_instantialize (this, arguments);
}, JSV.common, "ScriptToken", Enum);
Clazz_defineMethod (c$, "getTip", 
function () {
return "  " + (this.tip === "T" ? "TRUE/FALSE/TOGGLE" : this.tip === "TF" ? "TRUE or FALSE" : this.tip === "C" ? "COLOR" : this.tip);
});
Clazz_makeConstructor (c$, 
 function () {
});
Clazz_makeConstructor (c$, 
 function (tip) {
this.tip = tip;
this.description = "";
}, "~S");
Clazz_makeConstructor (c$, 
 function (tip, description) {
this.tip = tip;
this.description = "-- " + description;
}, "~S,~S");
c$.getParams = Clazz_defineMethod (c$, "getParams", 
 function () {
if (JSV.common.ScriptToken.htParams == null) {
JSV.common.ScriptToken.htParams =  new java.util.Hashtable ();
for (var item, $item = 0, $$item = JSV.common.ScriptToken.values (); $item < $$item.length && ((item = $$item[$item]) || true); $item++) JSV.common.ScriptToken.htParams.put (item.name (), item);

}return JSV.common.ScriptToken.htParams;
});
c$.getScriptToken = Clazz_defineMethod (c$, "getScriptToken", 
function (name) {
var st = JSV.common.ScriptToken.getParams ().get (name.toUpperCase ());
return (st == null ? JSV.common.ScriptToken.UNKNOWN : st);
}, "~S");
c$.getScriptTokenList = Clazz_defineMethod (c$, "getScriptTokenList", 
function (name, isExact) {
if (name != null) name = name.toUpperCase ();
var list =  new JU.Lst ();
if (isExact) {
var st = JSV.common.ScriptToken.getScriptToken (name);
if (st != null) list.addLast (st);
} else {
for (var entry, $entry = JSV.common.ScriptToken.getParams ().entrySet ().iterator (); $entry.hasNext () && ((entry = $entry.next ()) || true);) if ((name == null || entry.getKey ().startsWith (name)) && entry.getValue ().tip != null) list.addLast (entry.getValue ());

}return list;
}, "~S,~B");
c$.getValue = Clazz_defineMethod (c$, "getValue", 
function (st, params, cmd) {
if (!params.hasMoreTokens ()) return "";
switch (st) {
default:
return JSV.common.ScriptTokenizer.nextStringToken (params, true);
case JSV.common.ScriptToken.CLOSE:
case JSV.common.ScriptToken.GETPROPERTY:
case JSV.common.ScriptToken.INTEGRATION:
case JSV.common.ScriptToken.INTEGRATE:
case JSV.common.ScriptToken.JMOL:
case JSV.common.ScriptToken.LABEL:
case JSV.common.ScriptToken.LOAD:
case JSV.common.ScriptToken.PEAK:
case JSV.common.ScriptToken.PLOTCOLORS:
case JSV.common.ScriptToken.YSCALE:
case JSV.common.ScriptToken.WRITE:
return JSV.common.ScriptToken.removeCommandName (cmd);
case JSV.common.ScriptToken.SELECT:
case JSV.common.ScriptToken.OVERLAY:
case JSV.common.ScriptToken.VIEW:
case JSV.common.ScriptToken.ZOOM:
return JSV.common.ScriptToken.removeCommandName (cmd).$replace (',', ' ').trim ();
}
}, "JSV.common.ScriptToken,JSV.common.ScriptTokenizer,~S");
c$.removeCommandName = Clazz_defineMethod (c$, "removeCommandName", 
 function (cmd) {
var pt = cmd.indexOf (" ");
if (pt < 0) return "";
return cmd.substring (pt).trim ();
}, "~S");
c$.getKey = Clazz_defineMethod (c$, "getKey", 
function (eachParam) {
var key = eachParam.nextToken ();
if (key.startsWith ("#") || key.startsWith ("//")) return null;
if (key.equalsIgnoreCase ("SET")) key = eachParam.nextToken ();
return key.toUpperCase ();
}, "JSV.common.ScriptTokenizer");
c$.getTokens = Clazz_defineMethod (c$, "getTokens", 
function (value) {
if (value.startsWith ("'") && value.endsWith ("'")) value = "\"" + JU.PT.trim (value, "'") + "\"";
var tokens =  new JU.Lst ();
var st =  new JSV.common.ScriptTokenizer (value, false);
while (st.hasMoreTokens ()) {
var s = JSV.common.ScriptTokenizer.nextStringToken (st, false);
if (s.startsWith ("//") || s.startsWith ("#")) break;
tokens.addLast (s);
}
return tokens;
}, "~S");
c$.getNameList = Clazz_defineMethod (c$, "getNameList", 
function (list) {
if (list.size () == 0) return "";
var sb =  new JU.SB ();
for (var i = 0; i < list.size (); i++) sb.append (",").append (list.get (i).toString ());

return sb.toString ().substring (1);
}, "JU.Lst");
Clazz_defineMethod (c$, "getDescription", 
function () {
return this.description;
});
c$.htParams = null;
Clazz_defineEnumConstant (c$, "UNKNOWN", 0, []);
Clazz_defineEnumConstant (c$, "APPLETID", 1, []);
Clazz_defineEnumConstant (c$, "APPLETREADYCALLBACKFUNCTIONNAME", 2, []);
Clazz_defineEnumConstant (c$, "AUTOINTEGRATE", 3, ["TF", "automatically integrate an NMR spectrum"]);
Clazz_defineEnumConstant (c$, "BACKGROUNDCOLOR", 4, ["C", "set the background color"]);
Clazz_defineEnumConstant (c$, "CLOSE", 5, ["spectrumId or fileName or ALL or VIEWS or SIMULATIONS", "close one or more views or simulations"]);
Clazz_defineEnumConstant (c$, "COMPOUNDMENUON", 6, []);
Clazz_defineEnumConstant (c$, "COORDCALLBACKFUNCTIONNAME", 7, []);
Clazz_defineEnumConstant (c$, "COORDINATESCOLOR", 8, ["C", "set the color of the coordinates shown in the upper right-hand corner"]);
Clazz_defineEnumConstant (c$, "COORDINATESON", 9, ["T", "turn on or off the coordinates shown in the upper right-hand corner"]);
Clazz_defineEnumConstant (c$, "DEBUG", 10, ["TF", "turn debugging on and off"]);
Clazz_defineEnumConstant (c$, "DEFAULTLOADSCRIPT", 11, ["\"script...\"", "set the script to be run after each file is loaded"]);
Clazz_defineEnumConstant (c$, "DEFAULTNMRNORMALIZATION", 12, ["maxYvalue", "set the value to be given the largest peak in an HMR spectrum"]);
Clazz_defineEnumConstant (c$, "DISPLAYFONTNAME", 13, []);
Clazz_defineEnumConstant (c$, "DISPLAY1D", 14, ["T", "turn on or off display of 1D spectra when 1D and 2D spectra are loaded"]);
Clazz_defineEnumConstant (c$, "DISPLAY2D", 15, ["T", "turn on or off display of the 2D spectrum when 1D and 2D spectra are loaded"]);
Clazz_defineEnumConstant (c$, "ENABLEZOOM", 16, ["T", "allow or disallow zooming"]);
Clazz_defineEnumConstant (c$, "ENDINDEX", 17, []);
Clazz_defineEnumConstant (c$, "FINDX", 18, ["value", "move the vertical-line cursor to a specific x-axis value"]);
Clazz_defineEnumConstant (c$, "GETPROPERTY", 19, ["[propertyName] or ALL or NAMES", "get a property value or all property values as key/value pairs, or a list of names"]);
Clazz_defineEnumConstant (c$, "GETSOLUTIONCOLOR", 20, [" FILL or FILLNONE or FILLALL or FILLALLNONE", "estimate the solution color for UV/VIS spectra"]);
Clazz_defineEnumConstant (c$, "GRIDCOLOR", 21, ["C", "color of the grid"]);
Clazz_defineEnumConstant (c$, "GRIDON", 22, ["T", "turn the grid lines on or off"]);
Clazz_defineEnumConstant (c$, "HELP", 23, ["[command]", "get this listing or help for a specific command"]);
Clazz_defineEnumConstant (c$, "HIDDEN", 24, []);
Clazz_defineEnumConstant (c$, "HIGHLIGHTCOLOR", 25, ["C", "set the highlight color"]);
Clazz_defineEnumConstant (c$, "HIGHLIGHT", 26, ["OFF or X1 X2 [OFF] or X1 X2 r g b [a]", "turns on or off a highlight color, possibily setting its color, where r g b a are 0-255 or 0.0-1.0"]);
Clazz_defineEnumConstant (c$, "INTEGRALOFFSET", 27, ["percent", "sets the integral offset from baseline"]);
Clazz_defineEnumConstant (c$, "INTEGRALRANGE", 28, ["percent", "sets the height of the total integration"]);
Clazz_defineEnumConstant (c$, "INTEGRATE", 29, ["", "see INTEGRATION"]);
Clazz_defineEnumConstant (c$, "INTEGRATION", 30, ["ON/OFF/TOGGLE/AUTO/CLEAR/MIN value/MARK ppm1-ppm2:norm,ppm3-ppm4,...", "show/hide integration or set integrals (1D 1H NMR only)"]);
Clazz_defineEnumConstant (c$, "INTEGRALPLOTCOLOR", 31, ["C", "color of the integration line"]);
Clazz_defineEnumConstant (c$, "INTEGRATIONRATIOS", 32, ["'x:value,x:value,..'", "annotate the spectrum with numbers or text at specific x values"]);
Clazz_defineEnumConstant (c$, "INTERFACE", 33, ["SINGLE or OVERLAY", "set how multiple spectra are displayed"]);
Clazz_defineEnumConstant (c$, "INVERTY", 34, ["", "invert the Y axis"]);
Clazz_defineEnumConstant (c$, "IRMODE", 35, ["A or T or TOGGLE", "set the IR mode to absorption or transmission"]);
Clazz_defineEnumConstant (c$, "JMOL", 36, ["...Jmol command...", "send a command to Jmol (if present)"]);
Clazz_defineEnumConstant (c$, "JSV", 37, []);
Clazz_defineEnumConstant (c$, "LABEL", 38, ["x y [color and/or \"text\"]", "add a text label"]);
Clazz_defineEnumConstant (c$, "LINK", 39, ["AB or ABC or NONE or ALL", "synchronize the crosshair of a 2D spectrum with 1D cursors"]);
Clazz_defineEnumConstant (c$, "LOAD", 40, ["[APPEND] \"fileName\" [first] [last]; use \"\" for current file; $H1/name or $C13/name for simulation", "load a specturm"]);
Clazz_defineEnumConstant (c$, "LOADFILECALLBACKFUNCTIONNAME", 41, []);
Clazz_defineEnumConstant (c$, "LOADIMAGINARY", 42, ["TF", "set TRUE to load imaginary NMR component"]);
Clazz_defineEnumConstant (c$, "MENUON", 43, []);
Clazz_defineEnumConstant (c$, "OBSCURE", 44, []);
Clazz_defineEnumConstant (c$, "OVERLAY", 45, []);
Clazz_defineEnumConstant (c$, "OVERLAYSTACKED", 46, ["TF", "whether viewed spectra are shown separately, in a stack"]);
Clazz_defineEnumConstant (c$, "PEAK", 47, ["[IR,CNMR,HNMR,MS] [#nnn or ID=xxx or text] [ALL], for example: PEAK HNMR #3", "highlights a peak based on its number or title text, optionally checking all loade spectra"]);
Clazz_defineEnumConstant (c$, "PEAKCALLBACKFUNCTIONNAME", 48, []);
Clazz_defineEnumConstant (c$, "PEAKLIST", 49, ["[THRESHOLD=n] [INTERPOLATE=PARABOLIC or NONE]", "creates a peak list based on a threshold value and parabolic or no interpolation"]);
Clazz_defineEnumConstant (c$, "PEAKTABCOLOR", 50, ["C", "sets the color of peak marks for a peak listing"]);
Clazz_defineEnumConstant (c$, "PEAKTABSON", 51, ["T", "show peak tabs for simulated spectra"]);
Clazz_defineEnumConstant (c$, "PLOTAREACOLOR", 52, ["C", "sets the color of the plot background"]);
Clazz_defineEnumConstant (c$, "PLOTCOLOR", 53, ["C", "sets the color of the graph line"]);
Clazz_defineEnumConstant (c$, "PLOTCOLORS", 54, ["color,color,color,...", "sets the colors of multiple plots"]);
Clazz_defineEnumConstant (c$, "POINTSONLY", 55, ["TF", "show points only for all data"]);
Clazz_defineEnumConstant (c$, "PRINT", 56, ["", "prints the current spectrum"]);
Clazz_defineEnumConstant (c$, "REVERSEPLOT", 57, ["T", "reverses the x-axis of a spectrum"]);
Clazz_defineEnumConstant (c$, "SCALEBY", 58, ["factor", "multiplies the y-scale of the spectrum by a factor"]);
Clazz_defineEnumConstant (c$, "SCALECOLOR", 59, ["C", "sets the color of the x-axis and y-axis scales"]);
Clazz_defineEnumConstant (c$, "SCRIPT", 60, ["filename.jsv", "runs a script from a file"]);
Clazz_defineEnumConstant (c$, "SELECT", 61, ["spectrumID, spectrumID,...", "selects one or more spectra based on IDs"]);
Clazz_defineEnumConstant (c$, "SETPEAK", 62, ["xNew, xOld xNew, ?, or NONE", "sets nearest peak to xOld ppm to a new value; NONE resets (1D NMR only)"]);
Clazz_defineEnumConstant (c$, "SETX", 63, ["xNew, xOld xNew, ?, or NONE", "sets an old ppm position in the spectrum to a new value; NONE resets (1D NMR only)"]);
Clazz_defineEnumConstant (c$, "SHIFTX", 64, ["dx or NONE", "shifts the x-axis of a 1D NMR spectrum by the given ppm; NONE resets (1D NMR only)"]);
Clazz_defineEnumConstant (c$, "SHOWERRORS", 65, ["shows recent errors"]);
Clazz_defineEnumConstant (c$, "SHOWINTEGRATION", 66, ["T", "shows an integration listing"]);
Clazz_defineEnumConstant (c$, "SHOWKEY", 67, ["T", "shows a color key when multiple spectra are displayed"]);
Clazz_defineEnumConstant (c$, "SHOWMEASUREMENTS", 68, ["T", "shows a listing of measurements"]);
Clazz_defineEnumConstant (c$, "SHOWMENU", 69, ["displays the popup menu"]);
Clazz_defineEnumConstant (c$, "SHOWPEAKLIST", 70, ["T", "shows a listing for peak picking"]);
Clazz_defineEnumConstant (c$, "SHOWPROPERTIES", 71, ["displays the header information of a JDX file"]);
Clazz_defineEnumConstant (c$, "SHOWSOURCE", 72, ["displays the source JDX file associated with the selected data"]);
Clazz_defineEnumConstant (c$, "SPECTRUM", 73, ["id", "displays a specific spectrum, where id is a number 1, 2, 3... or a file.spectrum number such as 2.1"]);
Clazz_defineEnumConstant (c$, "SPECTRUMNUMBER", 74, ["n", "displays the nth spectrum loaded"]);
Clazz_defineEnumConstant (c$, "STACKOFFSETY", 75, ["percent", "sets the y-axis offset of stacked spectra"]);
Clazz_defineEnumConstant (c$, "STARTINDEX", 76, []);
Clazz_defineEnumConstant (c$, "SYNCCALLBACKFUNCTIONNAME", 77, []);
Clazz_defineEnumConstant (c$, "SYNCID", 78, []);
Clazz_defineEnumConstant (c$, "TEST", 79, []);
Clazz_defineEnumConstant (c$, "TITLEON", 80, ["T", "turns the title in the bottom left corner on or off"]);
Clazz_defineEnumConstant (c$, "TITLEBOLDON", 81, ["T", "makes the title bold"]);
Clazz_defineEnumConstant (c$, "TITLECOLOR", 82, ["C", "sets the color of the title"]);
Clazz_defineEnumConstant (c$, "TITLEFONTNAME", 83, ["fontName", "sets the title font"]);
Clazz_defineEnumConstant (c$, "UNITSCOLOR", 84, ["C", "sets the color of the x-axis and y-axis units"]);
Clazz_defineEnumConstant (c$, "VERSION", 85, []);
Clazz_defineEnumConstant (c$, "VIEW", 86, ["spectrumID, spectrumID, ... Example: VIEW 3.1, 3.2  or  VIEW \"acetophenone\"", "creates a view of one or more spectra"]);
Clazz_defineEnumConstant (c$, "XSCALEON", 87, ["T", "set FALSE to turn off the x-axis scale"]);
Clazz_defineEnumConstant (c$, "XUNITSON", 88, ["T", "set FALSE to turn off the x-axis units"]);
Clazz_defineEnumConstant (c$, "YSCALE", 89, ["[ALL] lowValue highValue"]);
Clazz_defineEnumConstant (c$, "YSCALEON", 90, ["T", "set FALSE to turn off the y-axis scale"]);
Clazz_defineEnumConstant (c$, "YUNITSON", 91, ["T", "set FALSE to turn off the y-axis units"]);
Clazz_defineEnumConstant (c$, "WINDOW", 92, []);
Clazz_defineEnumConstant (c$, "WRITE", 93, ["[XY,DIF,DIFDUP,PAC,FIX,SQZ,AML,CML,JPG,PDF,PNG,SVG] \"filename\"", "writes a file in the specified format"]);
Clazz_defineEnumConstant (c$, "ZOOM", 94, ["OUT or PREVIOUS or NEXT or x1,x2 or x1,y1 x2,y2", "sets the zoom"]);
Clazz_defineEnumConstant (c$, "ZOOMBOXCOLOR", 95, []);
Clazz_defineEnumConstant (c$, "ZOOMBOXCOLOR2", 96, []);
});
Clazz_declarePackage ("JSV.common");
Clazz_load (null, "JSV.common.ScriptTokenizer", ["JU.PT"], function () {
c$ = Clazz_decorateAsClass (function () {
this.str = null;
this.pt = -1;
this.len = 0;
this.isCmd = false;
this.doCheck = true;
Clazz_instantialize (this, arguments);
}, JSV.common, "ScriptTokenizer");
Clazz_makeConstructor (c$, 
function (str, isCmd) {
this.str = str;
this.len = str.length;
this.isCmd = isCmd;
}, "~S,~B");
c$.nextStringToken = Clazz_defineMethod (c$, "nextStringToken", 
function (eachParam, removeQuotes) {
var s = eachParam.nextToken ();
return (removeQuotes && s.charAt (0) == '"' && s.endsWith ("\"") && s.length > 1 ? JU.PT.trimQuotes (s) : s);
}, "JSV.common.ScriptTokenizer,~B");
Clazz_defineMethod (c$, "nextToken", 
function () {
if (this.doCheck) this.hasMoreTokens ();
var pt0 = this.pt;
var inQuote = (this.str.charAt (this.pt) == '"');
while (++this.pt < this.len) {
switch (this.str.charAt (this.pt)) {
case '"':
if (inQuote) {
if (this.isCmd) {
inQuote = false;
continue;
}this.pt++;
break;
}if (this.isCmd) inQuote = true;
continue;
case ' ':
if (!this.isCmd && !inQuote) break;
continue;
case ';':
case '\n':
if (this.isCmd && !inQuote) break;
continue;
default:
continue;
}
break;
}
this.doCheck = true;
return this.str.substring (pt0, this.pt);
});
Clazz_defineMethod (c$, "hasMoreTokens", 
function () {
while (++this.pt < this.len) {
switch (this.str.charAt (this.pt)) {
case ' ':
case ';':
case '\n':
continue;
}
break;
}
this.doCheck = false;
return (this.pt < this.len);
});
Clazz_defineMethod (c$, "getRemainingScript", 
function () {
return this.str.substring (this.pt);
});
});
Clazz_declarePackage ("JSV.common");
c$ = Clazz_decorateAsClass (function () {
this.isub = 0;
this.title = null;
Clazz_instantialize (this, arguments);
}, JSV.common, "SubSpecChangeEvent");
Clazz_makeConstructor (c$, 
function (isub, title) {
this.isub = isub;
this.title = title;
}, "~N,~S");
Clazz_defineMethod (c$, "isValid", 
function () {
return (this.title != null);
});
Clazz_defineMethod (c$, "getSubIndex", 
function () {
return this.isub;
});
Clazz_overrideMethod (c$, "toString", 
function () {
return this.title;
});
Clazz_declarePackage ("JSV.common");
Clazz_load (null, "JSV.common.ViewData", ["JSV.common.Coordinate", "$.ScaleData"], function () {
c$ = Clazz_decorateAsClass (function () {
this.scaleData = null;
this.thisScale = null;
this.nSpectra = 0;
this.iThisScale = 0;
this.spectra = null;
Clazz_instantialize (this, arguments);
}, JSV.common, "ViewData");
Clazz_defineMethod (c$, "getScaleData", 
function () {
return this.scaleData;
});
Clazz_defineMethod (c$, "getScale", 
function () {
return this.thisScale;
});
Clazz_makeConstructor (c$, 
function (spectra, yPt1, yPt2, startList, endList, isContinuous, is2D) {
this.nSpectra = (is2D ? 1 : spectra.size ());
this.scaleData =  new Array (this.nSpectra);
for (var j = 0; j < this.nSpectra; j++) this.scaleData[j] =  new JSV.common.ScaleData (startList[j], endList[j]);

this.init (spectra, yPt1, yPt2, isContinuous);
}, "JU.Lst,~N,~N,~A,~A,~B,~B");
Clazz_makeConstructor (c$, 
function (spectra, yPt1, yPt2, isContinuous) {
this.nSpectra = spectra.size ();
var n = spectra.get (0).getXYCoords ().length;
this.scaleData =  new Array (1);
this.scaleData[0] =  new JSV.common.ScaleData (0, n - 1);
this.init (spectra, yPt1, yPt2, isContinuous);
}, "JU.Lst,~N,~N,~B");
Clazz_defineMethod (c$, "init", 
function (spectra, yPt1, yPt2, isContinuous) {
if (spectra == null) spectra = this.spectra;
 else this.spectra = spectra;
this.thisScale = this.scaleData[this.iThisScale = 0];
for (var i = 0; i < this.scaleData.length; i++) {
this.scaleData[i].userYFactor = spectra.get (i).getUserYFactor ();
this.scaleData[i].spectrumYRef = spectra.get (i).getYRef ();
}
this.resetScaleFactors ();
var minX = JSV.common.Coordinate.getMinX (spectra, this);
var maxX = JSV.common.Coordinate.getMaxX (spectra, this);
var minY = JSV.common.Coordinate.getMinYUser (spectra, this);
var maxY = JSV.common.Coordinate.getMaxYUser (spectra, this);
if (yPt1 != yPt2) {
minY = yPt1;
maxY = yPt2;
if (minY > maxY) {
var t = minY;
minY = maxY;
maxY = t;
}}var isInverted = spectra.get (0).isInverted ();
for (var i = 0; i < this.scaleData.length; i++) {
this.scaleData[i].setMinMax (minX, maxX, minY, maxY);
this.scaleData[i].setScale (isContinuous, isInverted);
}
}, "JU.Lst,~N,~N,~B");
Clazz_defineMethod (c$, "newSpectrum", 
function (spectra) {
this.init (spectra, 0, 0, false);
}, "JU.Lst");
Clazz_defineMethod (c$, "setXRangeForSubSpectrum", 
function (xyCoords) {
this.setXRange (0, xyCoords, this.scaleData[0].minX, this.scaleData[0].maxX, 0, xyCoords.length - 1);
}, "~A");
Clazz_defineMethod (c$, "setXRange", 
 function (i, xyCoords, initX, finalX, iStart, iEnd) {
var index = 0;
var ptCount = 0;
for (index = iStart; index <= iEnd; index++) {
var x = xyCoords[index].getXVal ();
if (x >= initX) {
this.scaleData[i % this.scaleData.length].startDataPointIndex = index;
break;
}}
for (; index <= iEnd; index++) {
var x = xyCoords[index].getXVal ();
ptCount++;
if (x >= finalX) {
break;
}}
this.scaleData[i % this.scaleData.length].endDataPointIndex = index;
return ptCount;
}, "~N,~A,~N,~N,~N,~N");
Clazz_defineMethod (c$, "getStartingPointIndex", 
function (i) {
return this.scaleData[i % this.scaleData.length].startDataPointIndex;
}, "~N");
Clazz_defineMethod (c$, "getEndingPointIndex", 
function (i) {
return this.scaleData[i % this.scaleData.length].endDataPointIndex;
}, "~N");
Clazz_defineMethod (c$, "areYScalesSame", 
function (i, j) {
i %= this.scaleData.length;
j %= this.scaleData.length;
return (this.scaleData[i].minYOnScale == this.scaleData[j].minYOnScale && this.scaleData[i].maxYOnScale == this.scaleData[j].maxYOnScale);
}, "~N,~N");
Clazz_defineMethod (c$, "setScale", 
function (i, xPixels, yPixels, isInverted) {
this.iThisScale = i % this.scaleData.length;
this.thisScale = this.scaleData[this.iThisScale];
this.thisScale.setXYScale (xPixels, yPixels, isInverted);
}, "~N,~N,~N,~B");
Clazz_defineMethod (c$, "resetScaleFactors", 
function () {
for (var i = 0; i < this.scaleData.length; i++) this.scaleData[i].spectrumScaleFactor = 1;

});
Clazz_defineMethod (c$, "scaleSpectrum", 
function (i, f) {
if (f <= 0 || i >= this.nSpectra) return;
if (i == -2) {
this.thisScale.scale2D (f);
return;
}if (i < 0) for (i = 0; i < this.scaleData.length; i++) this.scaleData[i].scaleBy (f);

 else this.scaleData[i % this.scaleData.length].scaleBy (f);
}, "~N,~N");
Clazz_defineMethod (c$, "getNewScales", 
function (iSelected, isXOnly, y1, y2) {
if (isXOnly) return this.scaleData;
iSelected %= this.scaleData.length;
var f1 = (y1 - this.thisScale.minYOnScale) / (this.thisScale.maxYOnScale - this.thisScale.minYOnScale);
var f2 = (y2 - this.thisScale.minYOnScale) / (this.thisScale.maxYOnScale - this.thisScale.minYOnScale);
var sd =  new Array (this.scaleData.length);
for (var i = 0; i < this.scaleData.length; i++) sd[i] = (iSelected >= 0 && i != iSelected ? this.scaleData[i] :  new JSV.common.ScaleData ());

JSV.common.ScaleData.copyScaleFactors (this.scaleData, sd);
JSV.common.ScaleData.copyYScales (this.scaleData, sd);
for (var i = 0; i < this.scaleData.length; i++) {
if (iSelected >= 0 && i != iSelected) continue;
sd[i].isShiftZoomedY = true;
sd[i].minYOnScale = this.scaleData[i].minYOnScale * (1 - f1) + f1 * this.scaleData[i].maxYOnScale;
sd[i].maxYOnScale = this.scaleData[i].minYOnScale * (1 - f2) + f2 * this.scaleData[i].maxYOnScale;
}
return sd;
}, "~N,~B,~N,~N");
});
Clazz_declarePackage ("JSV.common");
Clazz_declareInterface (JSV.common, "XYScaleConverter");
Clazz_declarePackage ("JSV.common");
c$ = Clazz_declareType (JSV.common, "ZoomEvent");
Clazz_makeConstructor (c$, 
function () {
});
Clazz_declarePackage ("JSV.dialog");
Clazz_load (["JSV.api.AnnotationData", "JSV.common.Annotation"], "JSV.dialog.JSVDialog", ["java.lang.Double", "JU.DF", "$.PT", "JSV.common.IntegralData", "$.PeakData", "JSV.dialog.DialogManager"], function () {
c$ = Clazz_decorateAsClass (function () {
this.optionKey = null;
this.options = null;
this.type = null;
this.title = null;
this.vwr = null;
this.$spec = null;
this.manager = null;
this.dialog = null;
this.jsvp = null;
this.txt1 = null;
this.txt2 = null;
this.txt3 = null;
this.combo1 = null;
this.xyData = null;
this.myParams = null;
this.precision = 1;
this.loc = null;
this.showHideButton = null;
this.addClearBtn = false;
this.addCombo1 = false;
this.addApplyBtn = false;
this.isNumeric = false;
this.defaultVisible = false;
this.subType = null;
this.graphSetKey = null;
this.tableData = null;
this.addUnits = false;
this.unitOptions = null;
this.formatOptions = null;
this.unitPtr = null;
this.isON = true;
this.lastNorm = 1;
this.iRowColSelected = -1;
this.iSelected = -1;
this.skipCreate = false;
this.iRowSelected = -1;
this.iColSelected = -1;
Clazz_instantialize (this, arguments);
}, JSV.dialog, "JSVDialog", JSV.common.Annotation, JSV.api.AnnotationData);
Clazz_overrideMethod (c$, "isDialog", 
function () {
return true;
});
Clazz_defineMethod (c$, "setParams", 
function (title, viewer, spec) {
title = JSV.dialog.DialogManager.fixTitle (title);
this.title = title;
this.vwr = viewer;
this.$spec = spec;
this.manager = viewer.getDialogManager ();
this.jsvp = viewer.selectedPanel;
this.myParams = (viewer.getPlatformInterface ("Parameters")).setName ("dialogParams");
this.subType = (spec == null ? "!" : spec.getTypeLabel ());
this.optionKey = this.type + "_" + this.subType;
this.options = this.manager.getDialogOptions ();
if (spec != null) {
var specOptions = spec.getDefaultAnnotationInfo (this.type);
this.options.put (this.optionKey, specOptions);
this.unitOptions = specOptions[0];
this.formatOptions = specOptions[1];
this.unitPtr = this.options.get (this.optionKey + "_unitPtr");
if (this.unitPtr == null) this.unitPtr = specOptions[2];
}switch (this.type) {
case JSV.common.Annotation.AType.Integration:
this.isNumeric = true;
this.addClearBtn = true;
this.defaultVisible = true;
this.addApplyBtn = true;
break;
case JSV.common.Annotation.AType.Measurements:
this.isNumeric = true;
this.addClearBtn = true;
this.addCombo1 = true;
this.defaultVisible = true;
break;
case JSV.common.Annotation.AType.OverlayLegend:
break;
case JSV.common.Annotation.AType.PeakList:
this.isNumeric = true;
this.addApplyBtn = true;
this.defaultVisible = true;
break;
case JSV.common.Annotation.AType.Views:
this.defaultVisible = true;
break;
case JSV.common.Annotation.AType.NONE:
break;
}
this.initDialog ();
return this;
}, "~S,JSV.common.JSViewer,JSV.common.Spectrum");
Clazz_defineMethod (c$, "initDialog", 
 function () {
this.dialog = this.manager.getDialog (this);
this.restoreDialogPosition (this.jsvp, this.getPosXY ());
this.dialog.setTitle (this.title);
this.layoutDialog ();
});
Clazz_defineMethod (c$, "layoutDialog", 
function () {
this.dialog.startLayout ();
this.addUniqueControls ();
if (this.isNumeric) {
this.getUnitOptions ();
if (this.addCombo1) this.combo1 = this.dialog.addSelectOption ("cmbUnits", "Units", this.unitOptions, this.unitPtr.intValue (), this.addUnits);
if (this.addApplyBtn) this.dialog.addButton ("btnApply", "Apply");
this.showHideButton = this.dialog.addButton ("btnShow", "Show");
if (this.addClearBtn) this.dialog.addButton ("btnClear", "Clear");
}this.dialog.endLayout ();
this.checkEnables ();
this.dialog.setVisible (this.defaultVisible);
});
Clazz_defineMethod (c$, "callbackAD", 
function (id, msg) {
if (id.equals ("FOCUS")) {
this.eventFocus ();
} else if (id.equals ("tableSelect")) {
this.tableSelect (msg);
} else if (id.equals ("btnClear")) {
this.clear ();
} else if (id.equals ("btnApply")) {
this.eventApply ();
} else if (id.equals ("btnShow")) {
var label = this.dialog.getText (this.showHideButton);
this.eventShowHide (label.equals ("Show"));
} else if (id.equals ("cmbUnits")) {
this.setPrecision (this.dialog.getSelectedIndex (this.combo1));
} else if (id.startsWith ("txt")) {
this.eventApply ();
} else if (id.equals ("windowClosing")) {
this.done ();
return true;
}if (this.jsvp != null) this.jsvp.doRepaint (true);
return true;
}, "~S,~S");
Clazz_defineMethod (c$, "addUniqueControls", 
function (dialogHelper) {
}, "JSV.dialog.DialogManager");
Clazz_overrideMethod (c$, "getAType", 
function () {
return this.type;
});
Clazz_overrideMethod (c$, "getGraphSetKey", 
function () {
return this.graphSetKey;
});
Clazz_overrideMethod (c$, "setGraphSetKey", 
function (key) {
this.graphSetKey = key;
}, "~S");
Clazz_overrideMethod (c$, "getSpectrum", 
function () {
return this.$spec;
});
Clazz_overrideMethod (c$, "getState", 
function () {
return this.isON;
});
Clazz_overrideMethod (c$, "setState", 
function (b) {
this.isON = b;
}, "~B");
Clazz_defineMethod (c$, "checkEnables", 
function () {
var isShow = this.checkVisible ();
this.dialog.setText (this.showHideButton, isShow ? "Hide" : "Show");
});
Clazz_defineMethod (c$, "createTable", 
function (data, header, widths) {
this.tableData = data;
this.dialog.createTable (data, header, widths);
}, "~A,~A,~A");
Clazz_defineMethod (c$, "setTableSelectionEnabled", 
function (enabled) {
this.dialog.setCellSelectionEnabled (enabled);
}, "~B");
Clazz_defineMethod (c$, "getParameters", 
function () {
return this.myParams;
});
Clazz_defineMethod (c$, "showMessage", 
function (msg, title, msgType) {
this.manager.showMessageDialog (this.dialog, msg, title, msgType);
}, "~S,~S,~N");
Clazz_defineMethod (c$, "setThreshold", 
function (y) {
this.dialog.setText (this.txt1, this.getThreasholdText (y));
}, "~N");
Clazz_defineMethod (c$, "setComboSelected", 
function (i) {
this.dialog.setSelectedIndex (this.combo1, i);
}, "~N");
Clazz_defineMethod (c$, "applyFromFields", 
function () {
this.apply (null);
});
Clazz_defineMethod (c$, "reEnable", 
function () {
this.paramsReEnable ();
return this;
});
Clazz_defineMethod (c$, "dispose", 
function () {
this.dialog.dispose ();
});
Clazz_defineMethod (c$, "setVisible", 
function (visible) {
this.dialog.setVisible (visible);
}, "~B");
Clazz_overrideMethod (c$, "isVisible", 
function () {
return this.dialog.isVisible ();
});
Clazz_defineMethod (c$, "selectTableRow", 
function (i) {
this.dialog.selectTableRow (i);
}, "~N");
Clazz_defineMethod (c$, "repaint", 
function () {
this.dialog.repaint ();
});
Clazz_defineMethod (c$, "setFields", 
function () {
switch (this.type) {
case JSV.common.Annotation.AType.Integration:
break;
case JSV.common.Annotation.AType.Measurements:
break;
case JSV.common.Annotation.AType.NONE:
break;
case JSV.common.Annotation.AType.PeakList:
this.myParams = this.xyData.getParameters ();
this.setThreshold (this.myParams.peakListThreshold);
this.setComboSelected (this.myParams.peakListInterpolation.equals ("none") ? 1 : 0);
this.createData ();
break;
case JSV.common.Annotation.AType.OverlayLegend:
break;
case JSV.common.Annotation.AType.Views:
break;
}
});
Clazz_defineMethod (c$, "setFocus", 
function (tf) {
this.dialog.setFocus (tf);
}, "~B");
Clazz_defineMethod (c$, "update", 
function (clicked, xRange, yOffset) {
this.selectTableRow (-1);
switch (this.type) {
case JSV.common.Annotation.AType.Integration:
this.loadData ();
this.checkEnables ();
break;
case JSV.common.Annotation.AType.Measurements:
this.loadData ();
this.checkEnables ();
break;
case JSV.common.Annotation.AType.NONE:
break;
case JSV.common.Annotation.AType.PeakList:
if (yOffset > 20) this.applyFromFields ();
if (this.xyData == null || clicked == null || yOffset > 20) return;
var ipt = 0;
var dx0 = 1e100;
var xval = clicked.getXVal ();
var md = this.xyData;
var min = Math.abs (xRange / 20);
for (var i = md.size (); --i >= 0; ) {
var dx = Math.abs (xval - md.get (i).getXVal ());
if (dx < dx0) {
dx0 = dx;
ipt = i;
}}
if (dx0 < min) {
this.selectTableRow (md.size () - 2 - ipt);
this.repaint ();
}break;
case JSV.common.Annotation.AType.OverlayLegend:
break;
case JSV.common.Annotation.AType.Views:
break;
}
}, "JSV.common.Coordinate,~N,~N");
Clazz_defineMethod (c$, "getPeakData", 
function () {
var md =  new JSV.common.PeakData (JSV.common.Annotation.AType.PeakList, this.$spec);
md.setPeakList (this.myParams, this.precision, this.jsvp.getPanelData ().getView ());
this.xyData = md;
return null;
});
Clazz_overrideMethod (c$, "getData", 
function () {
if (this.xyData == null) this.createData ();
return this.xyData;
});
Clazz_defineMethod (c$, "setData", 
function (data) {
this.myParams = data.getParameters ();
this.xyData = data;
}, "JSV.api.AnnotationData");
Clazz_overrideMethod (c$, "setSpecShift", 
function (dx) {
if (this.xyData != null) this.xyData.setSpecShift (dx);
}, "~N");
Clazz_defineMethod (c$, "setType", 
function (type) {
this.type = type;
switch (type) {
case JSV.common.Annotation.AType.Measurements:
this.addUnits = true;
break;
case JSV.common.Annotation.AType.Integration:
break;
case JSV.common.Annotation.AType.PeakList:
break;
case JSV.common.Annotation.AType.OverlayLegend:
break;
case JSV.common.Annotation.AType.Views:
break;
case JSV.common.Annotation.AType.NONE:
break;
}
}, "JSV.common.Annotation.AType");
Clazz_defineMethod (c$, "apply", 
function (objects) {
try {
switch (this.type) {
case JSV.common.Annotation.AType.Integration:
var offset = Double.parseDouble (objects[0]);
var scale = Double.parseDouble (objects[1]);
this.myParams.integralOffset = offset;
this.myParams.integralRange = scale;
this.myParams.integralDrawAll = false;
(this.getData ()).update (this.myParams);
break;
case JSV.common.Annotation.AType.Measurements:
break;
case JSV.common.Annotation.AType.NONE:
return;
case JSV.common.Annotation.AType.PeakList:
if (!this.skipCreate) {
this.setThreshold (NaN);
this.createData ();
}this.skipCreate = false;
break;
case JSV.common.Annotation.AType.OverlayLegend:
break;
case JSV.common.Annotation.AType.Views:
this.vwr.parameters.viewOffset = Double.parseDouble (objects[0]);
break;
}
this.loadData ();
this.checkEnables ();
this.jsvp.doRepaint (true);
} catch (e) {
if (Clazz_exceptionOf (e, Exception)) {
} else {
throw e;
}
}
}, "~A");
Clazz_defineMethod (c$, "done", 
function () {
if (this.jsvp != null && this.$spec != null) this.jsvp.getPanelData ().removeDialog (this);
if (this.xyData != null) this.xyData.setState (this.isON);
this.saveDialogPosition (this.getPosXY ());
this.dispose ();
this.jsvp.doRepaint (true);
});
Clazz_defineMethod (c$, "restoreDialogPosition", 
 function (panel, posXY) {
if (panel != null) {
if (posXY[0] == -2147483648) {
posXY[0] = 0;
posXY[1] = -20;
}var pt = this.manager.getLocationOnScreen (panel);
var height = panel.getHeight ();
this.loc =  Clazz_newIntArray (-1, [Math.max (0, pt[0] + posXY[0]), Math.max (0, pt[1] + height + posXY[1])]);
this.dialog.setIntLocation (this.loc);
}}, "JSV.api.JSVPanel,~A");
Clazz_defineMethod (c$, "saveDialogPosition", 
 function (posXY) {
try {
var pt = this.manager.getLocationOnScreen (this.dialog);
posXY[0] += pt[0] - this.loc[0];
posXY[1] += pt[1] - this.loc[1];
} catch (e) {
if (Clazz_exceptionOf (e, Exception)) {
} else {
throw e;
}
}
}, "~A");
Clazz_defineMethod (c$, "getThreasholdText", 
 function (y) {
if (Double.isNaN (y)) {
var pd = this.jsvp.getPanelData ();
var f = (pd.getSpectrum ().isInverted () ? 0.1 : 0.9);
var c = pd.getClickedCoordinate ();
y = (c == null ? (pd.getView ().minYOnScale * f + pd.getView ().maxYOnScale) * (1 - f) : c.getYVal ());
}var sy = JU.DF.formatDecimalDbl (y, y < 1000 ? 2 : -2);
return " " + sy;
}, "~N");
Clazz_defineMethod (c$, "checkVisible", 
 function () {
return this.vwr.pd ().getShowAnnotation (this.type);
});
Clazz_defineMethod (c$, "getUnitOptions", 
 function () {
var key = this.optionKey + "_format";
var format = this.options.get (key);
if (format == null) this.options.put (key, format = Integer.$valueOf (this.formatOptions[this.unitPtr == null ? 0 : this.unitPtr.intValue ()]));
});
Clazz_defineMethod (c$, "eventFocus", 
function () {
if (this.$spec != null) this.jsvp.getPanelData ().jumpToSpectrum (this.$spec);
switch (this.type) {
case JSV.common.Annotation.AType.Integration:
if (this.iRowSelected >= 0) {
this.iRowSelected++;
this.tableCellSelect (-1, -1);
}break;
case JSV.common.Annotation.AType.Measurements:
break;
case JSV.common.Annotation.AType.NONE:
break;
case JSV.common.Annotation.AType.PeakList:
this.createData ();
this.skipCreate = true;
break;
case JSV.common.Annotation.AType.OverlayLegend:
break;
case JSV.common.Annotation.AType.Views:
break;
}
});
Clazz_defineMethod (c$, "eventApply", 
function () {
switch (this.type) {
case JSV.common.Annotation.AType.Integration:
break;
case JSV.common.Annotation.AType.Measurements:
break;
case JSV.common.Annotation.AType.NONE:
break;
case JSV.common.Annotation.AType.PeakList:
this.createData ();
this.skipCreate = true;
break;
case JSV.common.Annotation.AType.OverlayLegend:
break;
case JSV.common.Annotation.AType.Views:
break;
}
this.applyFromFields ();
});
Clazz_defineMethod (c$, "eventShowHide", 
 function (isShow) {
this.isON = isShow;
if (isShow) this.eventApply ();
this.jsvp.doRepaint (true);
this.checkEnables ();
}, "~B");
Clazz_defineMethod (c$, "clear", 
 function () {
this.setState (true);
if (this.xyData != null) {
this.xyData.clear ();
this.applyFromFields ();
}});
Clazz_defineMethod (c$, "paramsReEnable", 
 function () {
switch (this.type) {
case JSV.common.Annotation.AType.Integration:
break;
case JSV.common.Annotation.AType.Measurements:
break;
case JSV.common.Annotation.AType.NONE:
break;
case JSV.common.Annotation.AType.PeakList:
this.skipCreate = true;
break;
case JSV.common.Annotation.AType.OverlayLegend:
break;
case JSV.common.Annotation.AType.Views:
break;
}
this.setVisible (true);
this.isON = true;
this.applyFromFields ();
});
Clazz_defineMethod (c$, "tableCellSelect", 
 function (iRow, iCol) {
System.out.println (iRow + " jSVDial " + iCol);
if (iRow < 0) {
iRow = Clazz_doubleToInt (this.iRowColSelected / 1000);
iCol = this.iRowColSelected % 1000;
this.iRowColSelected = -1;
}var value = this.tableData[iRow][1];
var icolrow = iRow * 1000 + iCol;
if (icolrow == this.iRowColSelected) return;
this.iRowColSelected = icolrow;
System.out.println ("Setting rc = " + this.iRowColSelected + " " + this.$spec);
this.selectTableRow (this.iRowSelected);
try {
switch (this.type) {
case JSV.common.Annotation.AType.Integration:
this.callback ("SHOWSELECTION", value.toString ());
this.checkEnables ();
break;
case JSV.common.Annotation.AType.Measurements:
break;
case JSV.common.Annotation.AType.NONE:
break;
case JSV.common.Annotation.AType.PeakList:
try {
switch (iCol) {
case 6:
case 5:
case 4:
var x1 = Double.parseDouble (value);
var x2 = Double.parseDouble (this.tableData[iRow + 3 - iCol][1]);
this.jsvp.getPanelData ().setXPointers (this.$spec, x1, this.$spec, x2);
break;
default:
this.jsvp.getPanelData ().findX (this.$spec, Double.parseDouble (value));
}
} catch (e) {
if (Clazz_exceptionOf (e, Exception)) {
this.jsvp.getPanelData ().findX (this.$spec, 1E100);
} else {
throw e;
}
}
this.jsvp.doRepaint (false);
break;
case JSV.common.Annotation.AType.OverlayLegend:
this.jsvp.getPanelData ().setSpectrum (iRow, false);
break;
case JSV.common.Annotation.AType.Views:
break;
}
} catch (e) {
if (Clazz_exceptionOf (e, Exception)) {
} else {
throw e;
}
}
}, "~N,~N");
Clazz_defineMethod (c$, "loadData", 
function () {
var data;
var header;
var widths;
switch (this.type) {
case JSV.common.Annotation.AType.Integration:
if (this.xyData == null) this.createData ();
this.iSelected = -1;
data = (this.xyData).getMeasurementListArray (null);
header = this.xyData.getDataHeader ();
widths =  Clazz_newIntArray (-1, [40, 65, 65, 50]);
this.createTable (data, header, widths);
break;
case JSV.common.Annotation.AType.Measurements:
if (this.xyData == null) return;
data = this.xyData.getMeasurementListArray (this.dialog.getSelectedItem (this.combo1).toString ());
header = this.xyData.getDataHeader ();
widths =  Clazz_newIntArray (-1, [40, 65, 65, 50]);
this.createTable (data, header, widths);
break;
case JSV.common.Annotation.AType.NONE:
break;
case JSV.common.Annotation.AType.PeakList:
if (this.xyData == null) this.createData ();
data = (this.xyData).getMeasurementListArray (null);
header = (this.xyData).getDataHeader ();
widths =  Clazz_newIntArray (-1, [40, 65, 50, 50, 50, 50, 50]);
this.createTable (data, header, widths);
this.setTableSelectionEnabled (true);
break;
case JSV.common.Annotation.AType.OverlayLegend:
header =  Clazz_newArray (-1, ["No.", "Plot Color", "Title"]);
data = this.vwr.selectedPanel.getPanelData ().getOverlayLegendData ();
widths =  Clazz_newIntArray (-1, [30, 60, 250]);
this.createTable (data, header, widths);
this.setTableSelectionEnabled (true);
break;
case JSV.common.Annotation.AType.Views:
break;
}
});
Clazz_defineMethod (c$, "createData", 
 function () {
switch (this.type) {
case JSV.common.Annotation.AType.Integration:
this.xyData =  new JSV.common.IntegralData (this.$spec, this.myParams);
this.iSelected = -1;
break;
case JSV.common.Annotation.AType.Measurements:
break;
case JSV.common.Annotation.AType.NONE:
break;
case JSV.common.Annotation.AType.PeakList:
try {
var thresh = Double.parseDouble (this.dialog.getText (this.txt1));
this.myParams.peakListThreshold = thresh;
this.myParams.peakListInterpolation = this.dialog.getSelectedItem (this.combo1).toString ();
this.myParams.precision = this.precision;
var md =  new JSV.common.PeakData (JSV.common.Annotation.AType.PeakList, this.$spec);
md.setPeakList (this.myParams, this.precision, this.jsvp.getPanelData ().getView ());
this.xyData = md;
this.loadData ();
} catch (e) {
if (Clazz_exceptionOf (e, Exception)) {
} else {
throw e;
}
}
break;
case JSV.common.Annotation.AType.OverlayLegend:
break;
case JSV.common.Annotation.AType.Views:
break;
}
});
Clazz_defineMethod (c$, "setPrecision", 
 function (i) {
this.precision = this.formatOptions[i];
}, "~N");
Clazz_defineMethod (c$, "tableSelect", 
 function (url) {
var isAdjusting = "true".equals (this.getField (url, "adjusting"));
if (isAdjusting) {
this.iColSelected = this.iRowSelected = -1;
System.out.println ("adjusting" + url);
return;
}var index = JU.PT.parseInt (this.getField (url, "index"));
switch ("ROW COL ROWCOL".indexOf (this.getField (url, "selector"))) {
case 8:
this.iColSelected = JU.PT.parseInt (this.getField (url, "index2"));
case 0:
this.iRowSelected = index;
System.out.println ("r set to " + index);
break;
case 4:
this.iColSelected = index;
System.out.println ("c set to " + index);
break;
}
if (this.iColSelected >= 0 && this.iRowSelected >= 0) {
this.tableCellSelect (this.iRowSelected, this.iColSelected);
}}, "~S");
Clazz_defineMethod (c$, "getField", 
 function (url, name) {
url += "&";
var key = "&" + name + "=";
var pt = url.indexOf (key);
return (pt < 0 ? null : url.substring (pt + key.length, url.indexOf ("&", pt + 1)));
}, "~S,~S");
});
Clazz_declarePackage ("JSV.exception");
Clazz_load (["java.lang.Exception"], "JSV.exception.JSVException", null, function () {
c$ = Clazz_declareType (JSV.exception, "JSVException", Exception);
});
Clazz_declarePackage ("JSV.js2d");
c$ = Clazz_declareType (JSV.js2d, "Display");
c$.getFullScreenDimensions = Clazz_defineMethod (c$, "getFullScreenDimensions", 
function (canvas, widthHeight) {
{
widthHeight[0] = canvas.width;
widthHeight[1] = canvas.height;
}}, "~O,~A");
c$.hasFocus = Clazz_defineMethod (c$, "hasFocus", 
function (canvas) {
return true;
}, "~O");
c$.requestFocusInWindow = Clazz_defineMethod (c$, "requestFocusInWindow", 
function (canvas) {
}, "~O");
c$.repaint = Clazz_defineMethod (c$, "repaint", 
function (canvas) {
}, "~O");
c$.renderScreenImage = Clazz_defineMethod (c$, "renderScreenImage", 
function (viewer, g, size) {
{
}}, "J.api.PlatformViewer,~O,~O");
c$.setTransparentCursor = Clazz_defineMethod (c$, "setTransparentCursor", 
function (canvas) {
}, "~O");
c$.setCursor = Clazz_defineMethod (c$, "setCursor", 
function (c, canvas) {
}, "~N,~O");
c$.prompt = Clazz_defineMethod (c$, "prompt", 
function (label, data, list, asButtons) {
{
var s = prompt(label, data);
if (s != null)return s;
}return "null";
}, "~S,~S,~A,~B");
c$.convertPointFromScreen = Clazz_defineMethod (c$, "convertPointFromScreen", 
function (canvas, ptTemp) {
}, "~O,JU.P3");
Clazz_declarePackage ("JSV.js2d");
c$ = Clazz_declareType (JSV.js2d, "Image");
c$.getWidth = Clazz_defineMethod (c$, "getWidth", 
function (canvas) {
{
return (canvas.imageWidth ? canvas.imageWidth : canvas.width);
}}, "~O");
c$.getHeight = Clazz_defineMethod (c$, "getHeight", 
function (canvas) {
{
return (canvas.imageHeight ? canvas.imageHeight : canvas.height);
}}, "~O");
c$.grabPixels = Clazz_defineMethod (c$, "grabPixels", 
function (context, width, height) {
var data = null;
{
if (context._buf32) return context._buf32; // non-canvas internal buffer for image writing
data = context.getImageData(0, 0, width, height).data;
}return JSV.js2d.Image.toIntARGB (data);
}, "~O,~N,~N");
c$.toIntARGB = Clazz_defineMethod (c$, "toIntARGB", 
function (imgData) {
var n = Clazz_doubleToInt (imgData.length / 4);
var iData =  Clazz_newIntArray (n, 0);
for (var i = 0, j = 0; i < n; j++) {
iData[i++] = (imgData[j++] << 16) | (imgData[j++] << 8) | imgData[j++] | 0xFF000000;
}
return iData;
}, "~A");
c$.fromIntARGB = Clazz_defineMethod (c$, "fromIntARGB", 
function (buf32, buf8) {
var n = buf8.length >> 2;
for (var i = 0, j = 0; i < n; i++) {
buf8[j++] = (buf32[i] >> 16) & 0xFF;
buf8[j++] = (buf32[i] >> 8) & 0xFF;
buf8[j++] = buf32[i] & 0xFF;
buf8[j++] = 0xFF;
}
}, "~A,~A");
c$.getTextPixels = Clazz_defineMethod (c$, "getTextPixels", 
function (text, font3d, context, width, height, ascent) {
{
context.fillStyle = "#000000";
context.fillRect(0, 0, width, height);
context.fillStyle = "#FFFFFF";
context.font = font3d.font;
context.fillText(text, 0, ascent);
}return JSV.js2d.Image.grabPixels (context, width, height);
}, "~S,JU.Font,~O,~N,~N,~N");
c$.allocateRgbImage = Clazz_defineMethod (c$, "allocateRgbImage", 
function (windowWidth, windowHeight, pBuffer, windowSize, backgroundTransparent, canvas) {
{
if (canvas == null)
canvas = {width:windowWidth,height:windowHeight};
canvas.buf32 = pBuffer;
}}, "~N,~N,~A,~N,~B,~O");
c$.getStaticGraphics = Clazz_defineMethod (c$, "getStaticGraphics", 
function (canvas, backgroundTransparent) {
return JSV.js2d.Image.getGraphics (canvas);
}, "~O,~B");
c$.getGraphics = Clazz_defineMethod (c$, "getGraphics", 
function (canvas) {
{
return canvas.getContext("2d");
}}, "~O");
c$.drawImage = Clazz_defineMethod (c$, "drawImage", 
function (context, canvas, x, y, width, height) {
{
this.fromIntARGB(canvas.buf32, canvas.buf8);
context.putImageData(canvas.imgdata,x,y);
}}, "~O,~O,~N,~N,~N,~N");
Clazz_declarePackage ("JSV.js2d");
Clazz_load (["J.api.GenericFileInterface"], "JSV.js2d.JsFile", ["JU.PT", "JSV.common.JSVFileManager"], function () {
c$ = Clazz_decorateAsClass (function () {
this.name = null;
this.fullName = null;
Clazz_instantialize (this, arguments);
}, JSV.js2d, "JsFile", null, J.api.GenericFileInterface);
c$.newFile = Clazz_defineMethod (c$, "newFile", 
function (name) {
return  new JSV.js2d.JsFile (name);
}, "~S");
Clazz_makeConstructor (c$, 
function (name) {
this.name = name.$replace ('\\', '/');
this.fullName = name;
if (!this.fullName.startsWith ("/") && JSV.common.JSVFileManager.urlTypeIndex (name) < 0) this.fullName = JSV.common.JSVFileManager.jsDocumentBase + "/" + this.fullName;
this.fullName = JU.PT.rep (this.fullName, "/./", "/");
name = name.substring (name.lastIndexOf ("/") + 1);
}, "~S");
Clazz_overrideMethod (c$, "getParentAsFile", 
function () {
var pt = this.fullName.lastIndexOf ("/");
return (pt < 0 ? null :  new JSV.js2d.JsFile (this.fullName.substring (0, pt)));
});
Clazz_overrideMethod (c$, "getFullPath", 
function () {
return this.fullName;
});
Clazz_overrideMethod (c$, "getName", 
function () {
return this.name;
});
Clazz_overrideMethod (c$, "isDirectory", 
function () {
return this.fullName.endsWith ("/");
});
Clazz_overrideMethod (c$, "length", 
function () {
return 0;
});
c$.getURLContents = Clazz_defineMethod (c$, "getURLContents", 
function (url, outputBytes, post) {
try {
var conn = url.openConnection ();
if (outputBytes != null) conn.outputBytes (outputBytes);
 else if (post != null) conn.outputString (post);
return conn.getContents ();
} catch (e) {
if (Clazz_exceptionOf (e, Exception)) {
return e.toString ();
} else {
throw e;
}
}
}, "java.net.URL,~A,~S");
});
Clazz_declarePackage ("JSV.js2d");
Clazz_load (["JSV.api.JSVFileHelper"], "JSV.js2d.JsFileHelper", ["JU.PT", "JSV.common.JSViewer", "JSV.js2d.JsFile"], function () {
c$ = Clazz_decorateAsClass (function () {
this.vwr = null;
Clazz_instantialize (this, arguments);
}, JSV.js2d, "JsFileHelper", null, JSV.api.JSVFileHelper);
Clazz_makeConstructor (c$, 
function () {
});
Clazz_overrideMethod (c$, "set", 
function (viewer) {
this.vwr = viewer;
return this;
}, "JSV.common.JSViewer");
Clazz_overrideMethod (c$, "getFile", 
function (fileName, panelOrFrame, isSave) {
var f = null;
fileName = JU.PT.rep (fileName, "=", "_");
{
f = prompt("Enter a file name:", fileName);
}return (f == null ? null :  new JSV.js2d.JsFile (f));
}, "~S,~O,~B");
Clazz_overrideMethod (c$, "setDirLastExported", 
function (name) {
return name;
}, "~S");
Clazz_overrideMethod (c$, "setFileChooser", 
function (pdf) {
}, "JSV.common.ExportType");
Clazz_overrideMethod (c$, "showFileOpenDialog", 
function (panelOrFrame, userData) {
JSV.common.JSViewer.jmolObject.loadFileAsynchronously (this, this.vwr.html5Applet, "?", userData);
return null;
}, "~O,~A");
Clazz_defineMethod (c$, "setData", 
function (fileName, data, userInfo) {
if (fileName == null) return;
if (data == null) {
this.vwr.selectedPanel.showMessage (fileName, "File Open Error");
return;
}var script = (userInfo == null ? null : "");
var isAppend = false;
{
isAppend = userInfo[0];
script = userInfo[1];
}this.vwr.si.siOpenDataOrFile ( String.instantialize (data), "cache://" + fileName, null, null, -1, -1, isAppend, null, null);
if (script != null) this.vwr.runScript (script);
}, "~S,~O,~A");
Clazz_overrideMethod (c$, "getUrlFromDialog", 
function (info, msg) {
{
return prompt(info, msg);
}}, "~S,~S");
});
Clazz_declarePackage ("JSV.js2d");
c$ = Clazz_declareType (JSV.js2d, "JsFont");
c$.newFont = Clazz_defineMethod (c$, "newFont", 
function (fontFace, isBold, isItalic, fontSize, type) {
fontFace = (fontFace.equals ("Monospaced") ? "Courier" : fontFace.startsWith ("Sans") ? "Sans-Serif" : "Serif");
return (isBold ? "bold " : "") + (isItalic ? "italic " : "") + fontSize + type + " " + fontFace;
}, "~S,~B,~B,~N,~S");
c$.getFontMetrics = Clazz_defineMethod (c$, "getFontMetrics", 
function (font, context) {
{
if (context.font != font.font) {
context.font = font.font;
font.font = context.font;
context._fontAscent = Math.ceil(font.fontSize); //pt, not px
// the descent is actually (px - pt)
// but I know of no way of getting access to the drawn height
context._fontDescent = Math.ceil(font.fontSize * 0.25);//approx
}
}return context;
}, "JU.Font,~O");
c$.getAscent = Clazz_defineMethod (c$, "getAscent", 
function (context) {
{
return Math.ceil(context._fontAscent);
}}, "~O");
c$.getDescent = Clazz_defineMethod (c$, "getDescent", 
function (context) {
{
return Math.ceil(context._fontDescent);
}}, "~O");
c$.stringWidth = Clazz_defineMethod (c$, "stringWidth", 
function (font, text) {
{
font.fontMetrics.font = font.font;
return Math.ceil(font.fontMetrics.measureText(text).width);
}}, "JU.Font,~S");
Clazz_declarePackage ("JSV.js2d");
Clazz_load (["J.api.GenericGraphics"], "JSV.js2d.JsG2D", ["JU.CU", "JSV.common.JSViewer", "JS.Color"], function () {
c$ = Clazz_decorateAsClass (function () {
this.windowWidth = 0;
this.windowHeight = 0;
this.isShifted = false;
this.inPath = false;
Clazz_instantialize (this, arguments);
}, JSV.js2d, "JsG2D", null, J.api.GenericGraphics);
Clazz_makeConstructor (c$, 
function () {
});
Clazz_overrideMethod (c$, "getColor4", 
function (r, g, b, a) {
return JS.Color.get4 (r, g, b, a);
}, "~N,~N,~N,~N");
Clazz_overrideMethod (c$, "getColor3", 
function (r, g, b) {
return JS.Color.get3 (r, g, b);
}, "~N,~N,~N");
Clazz_overrideMethod (c$, "getColor1", 
function (rgb) {
return JS.Color.get1 (rgb);
}, "~N");
Clazz_overrideMethod (c$, "newGrayScaleImage", 
function (context, image, width, height, grayBuffer) {
return JSV.common.JSViewer.jmolObject.newGrayScaleImage (context, image, width, height, grayBuffer);
}, "~O,~O,~N,~N,~A");
Clazz_overrideMethod (c$, "drawGrayScaleImage", 
function (g, image, destX0, destY0, destX1, destY1, srcX0, srcY0, srcX1, srcY1) {
var iw;
var ih;
{
iw = image.w;
ih = image.h;
}var dw = (destX1 - destX0 + 1);
var dh = (destY1 - destY0 + 1);
var sw = (srcX1 - srcX0 + 1);
var sh = (srcY1 - srcY0 + 1);
var x = -srcX0 * dw / sw;
var w = iw * dw / sw;
var y = -srcY0 * dh / sh;
var h = ih * dh / sh;
{
image.width = w;
image.height = h;
var div = image.div;
var layer = image.layer;
layer.style.left = destX0 + "px";
layer.style.top = destY0 + "px";
layer.style.width = dw + "px";
layer.style.height = dh+ "px";
div.style.left= x + "px";
div.style.top = y + "px";
div.style.width = w + "px";
div.style.height = h + "px";
}}, "~O,~O,~N,~N,~N,~N,~N,~N,~N,~N");
Clazz_overrideMethod (c$, "drawLine", 
function (g, x0, y0, x1, y1) {
var inPath = this.inPath;
{
if (!inPath) g.beginPath();
g.moveTo(x0, y0);
g.lineTo(x1, y1);
if (!inPath) g.stroke();
}}, "~O,~N,~N,~N,~N");
Clazz_overrideMethod (c$, "drawCircle", 
function (g, x, y, diameter) {
{
var r = diameter/2;
g.beginPath();
g.arc(x + r, y + r, r, 0, 2 * Math.PI, false);
g.stroke();
}}, "~O,~N,~N,~N");
Clazz_overrideMethod (c$, "drawPolygon", 
function (g, ayPoints, axPoints, nPoints) {
this.doPoly (g, ayPoints, axPoints, nPoints, false);
}, "~O,~A,~A,~N");
Clazz_defineMethod (c$, "doPoly", 
 function (g, axPoints, ayPoints, nPoints, doFill) {
{
g.beginPath();
g.moveTo(axPoints[0], ayPoints[0]);
for (var i = 1; i < nPoints; i++)
g.lineTo(axPoints[i], ayPoints[i]);
if (doFill)
g.fill();
else
g.stroke();
}}, "~O,~A,~A,~N,~B");
Clazz_overrideMethod (c$, "drawRect", 
function (g, x, y, width, height) {
{
g.beginPath();
g.rect(x ,y, width, height);
g.stroke();
}}, "~O,~N,~N,~N,~N");
Clazz_overrideMethod (c$, "drawString", 
function (g, s, x, y) {
{
g.fillText(s,x,y);
}}, "~O,~S,~N,~N");
Clazz_overrideMethod (c$, "drawStringRotated", 
function (g, s, x, y, angle) {
}, "~O,~S,~N,~N,~N");
Clazz_overrideMethod (c$, "fillBackground", 
function (g, bgcolor) {
if (bgcolor == null) {
{
if (!this.isShifted) {
g.translate(-0.5, -0.5);
this.isShifted = true;
}
g.clearRect(0,0, this.windowWidth, this.windowHeight);
return;
}}this.setGraphicsColor (g, bgcolor);
this.fillRect (g, 0, 0, this.windowWidth, this.windowHeight);
}, "~O,javajs.api.GenericColor");
Clazz_overrideMethod (c$, "fillCircle", 
function (g, x, y, diameter) {
{
var r = diameter/2;
g.beginPath();
g.arc(x + r, y + r, r, 0, 2 * Math.PI, false);
g.fill();
}}, "~O,~N,~N,~N");
Clazz_overrideMethod (c$, "fillPolygon", 
function (g, ayPoints, axPoints, nPoints) {
this.doPoly (g, ayPoints, axPoints, nPoints, true);
}, "~O,~A,~A,~N");
Clazz_overrideMethod (c$, "fillRect", 
function (g, x, y, width, height) {
{
g.fillRect(x, y, width, height);
}}, "~O,~N,~N,~N,~N");
Clazz_overrideMethod (c$, "setGraphicsColor", 
function (g, c) {
var s = JU.CU.toCSSString (c);
{
g.fillStyle = g.strokeStyle = s;
}}, "~O,javajs.api.GenericColor");
Clazz_overrideMethod (c$, "setFont", 
function (g, font) {
var s = font.getInfo ();
var pt = s.indexOf (" ");
s = s.substring (0, pt) + "px" + s.substring (pt);
{
g.font = s;
}return font;
}, "~O,JU.Font");
Clazz_overrideMethod (c$, "setStrokeBold", 
function (g, tf) {
{
g.lineWidth = (tf ? 2 : 1);
}}, "~O,~B");
Clazz_overrideMethod (c$, "setWindowParameters", 
function (width, height) {
this.windowWidth = width;
this.windowHeight = height;
}, "~N,~N");
Clazz_overrideMethod (c$, "translateScale", 
function (g, x, y, scale) {
}, "~O,~N,~N,~N");
Clazz_overrideMethod (c$, "canDoLineTo", 
function () {
return true;
});
Clazz_overrideMethod (c$, "doStroke", 
function (g, isBegin) {
this.inPath = isBegin;
{
if (isBegin) {
g.beginPath();
} else {
g.stroke();
}
}}, "~O,~B");
Clazz_overrideMethod (c$, "lineTo", 
function (g, x2, y2) {
{
g.lineTo(x2, y2);
}}, "~O,~N,~N");
});
Clazz_declarePackage ("JSV.js2d");
Clazz_load (["JSV.api.JSVPanel"], "JSV.js2d.JsPanel", ["JSV.common.JSViewer", "$.PanelData", "JU.Font", "$.Logger"], function () {
c$ = Clazz_decorateAsClass (function () {
this.apiPlatform = null;
this.pd = null;
this.mouse = null;
this.vwr = null;
this.name = null;
this.bgcolor = null;
Clazz_instantialize (this, arguments);
}, JSV.js2d, "JsPanel", null, JSV.api.JSVPanel);
Clazz_overrideMethod (c$, "finalize", 
function () {
JU.Logger.info ("JSVPanel " + this + " finalized");
});
Clazz_overrideMethod (c$, "getApiPlatform", 
function () {
return this.apiPlatform;
});
Clazz_overrideMethod (c$, "getPanelData", 
function () {
return this.pd;
});
c$.getEmptyPanel = Clazz_defineMethod (c$, "getEmptyPanel", 
function (viewer) {
var p =  new JSV.js2d.JsPanel (viewer, false);
p.pd = null;
return p;
}, "JSV.common.JSViewer");
c$.getPanelMany = Clazz_defineMethod (c$, "getPanelMany", 
function (viewer, spectra) {
var p =  new JSV.js2d.JsPanel (viewer, true);
p.pd.initMany (spectra, viewer.initialStartIndex, viewer.initialEndIndex);
return p;
}, "JSV.common.JSViewer,JU.Lst");
Clazz_makeConstructor (c$, 
 function (viewer, withPd) {
this.vwr = viewer;
this.pd = (withPd ?  new JSV.common.PanelData (this, viewer) : null);
this.apiPlatform = viewer.apiPlatform;
this.mouse = this.apiPlatform.getMouseManager (0, this);
}, "JSV.common.JSViewer,~B");
Clazz_overrideMethod (c$, "getTitle", 
function () {
return this.pd.getTitle ();
});
Clazz_overrideMethod (c$, "dispose", 
function () {
if (this.pd != null) this.pd.dispose ();
this.pd = null;
this.mouse.dispose ();
this.mouse = null;
});
Clazz_overrideMethod (c$, "setTitle", 
function (title) {
this.pd.title = title;
this.name = title;
}, "~S");
Clazz_defineMethod (c$, "setColorOrFont", 
function (ds, st) {
this.pd.setColorOrFont (ds, st);
}, "JSV.common.ColorParameters,JSV.common.ScriptToken");
Clazz_overrideMethod (c$, "setBackgroundColor", 
function (color) {
this.bgcolor = color;
}, "javajs.api.GenericColor");
Clazz_overrideMethod (c$, "getInput", 
function (message, title, sval) {
var ret = null;
{
ret = prompt(message, sval);
}this.getFocusNow (true);
return ret;
}, "~S,~S,~S");
Clazz_overrideMethod (c$, "showMessage", 
function (msg, title) {
JU.Logger.info (msg);
var applet = this.vwr.html5Applet;
{
applet._showStatus(msg, title);
}this.getFocusNow (true);
}, "~S,~S");
Clazz_overrideMethod (c$, "getFocusNow", 
function (asThread) {
if (this.pd != null) this.pd.dialogsToFront (null);
}, "~B");
Clazz_overrideMethod (c$, "getFontFaceID", 
function (name) {
return JU.Font.getFontFaceID ("SansSerif");
}, "~S");
Clazz_overrideMethod (c$, "doRepaint", 
function (andTaintAll) {
if (this.pd == null) return;
if (andTaintAll) this.pd.setTaintedAll ();
if (!this.pd.isPrinting) this.vwr.requestRepaint ();
}, "~B");
Clazz_overrideMethod (c$, "paintComponent", 
function (context) {
var contextFront = null;
var contextRear = null;
{
contextFront = context.canvas.frontLayer.getContext("2d");
contextRear = context;
}if (this.vwr == null) return;
if (this.pd == null) {
if (this.bgcolor == null) this.bgcolor = this.vwr.g2d.getColor1 (-1);
this.vwr.g2d.fillBackground (context, this.bgcolor);
this.vwr.g2d.fillBackground (contextRear, this.bgcolor);
this.vwr.g2d.fillBackground (contextFront, this.bgcolor);
return;
}if (this.pd.graphSets == null || this.pd.isPrinting) return;
this.pd.g2d = this.pd.g2d0;
this.pd.drawGraph (context, contextFront, contextRear, this.getWidth (), this.getHeight (), false);
this.vwr.repaintDone ();
}, "~O");
Clazz_overrideMethod (c$, "printPanel", 
function (pl, os, title) {
pl.title = title;
pl.date = this.apiPlatform.getDateFormat ("8824");
this.pd.setPrint (pl, "Helvetica");
try {
(JSV.common.JSViewer.getInterface ("JSV.common.PDFWriter")).createPdfDocument (this, pl, os);
} catch (ex) {
if (Clazz_exceptionOf (ex, Exception)) {
this.showMessage (ex.toString (), "creating PDF");
} else {
throw ex;
}
} finally {
this.pd.setPrint (null, null);
}
}, "JSV.common.PrintLayout,java.io.OutputStream,~S");
Clazz_overrideMethod (c$, "saveImage", 
function (type, file, out) {
var fname = file.getName ();
if (out != null) out.cancel ();
JSV.common.JSViewer.jmolObject.saveImage (this.vwr.html5Applet, "png", fname);
return "OK";
}, "~S,J.api.GenericFileInterface,JU.OC");
Clazz_overrideMethod (c$, "hasFocus", 
function () {
return false;
});
Clazz_overrideMethod (c$, "repaint", 
function () {
});
Clazz_overrideMethod (c$, "setToolTipText", 
function (s) {
var x = this.pd.mouseX;
var y = this.pd.mouseY;
var applet = this.vwr.html5Applet;
{
applet._showTooltip && applet._showTooltip(s, x, y);
}}, "~S");
Clazz_overrideMethod (c$, "getHeight", 
function () {
return this.vwr.getHeight ();
});
Clazz_overrideMethod (c$, "getWidth", 
function () {
return this.vwr.getWidth ();
});
Clazz_overrideMethod (c$, "isEnabled", 
function () {
return false;
});
Clazz_overrideMethod (c$, "isFocusable", 
function () {
return false;
});
Clazz_overrideMethod (c$, "isVisible", 
function () {
return false;
});
Clazz_overrideMethod (c$, "setEnabled", 
function (b) {
}, "~B");
Clazz_overrideMethod (c$, "setFocusable", 
function (b) {
}, "~B");
Clazz_overrideMethod (c$, "toString", 
function () {
return (this.pd == null ? "<closed>" : "" + this.pd.getSpectrumAt (0));
});
Clazz_overrideMethod (c$, "processMouseEvent", 
function (id, x, y, modifiers, time) {
return this.mouse != null && this.mouse.processEvent (id, x, y, modifiers, time);
}, "~N,~N,~N,~N,~N");
Clazz_overrideMethod (c$, "processTwoPointGesture", 
function (touches) {
if (this.mouse != null) this.mouse.processTwoPointGesture (touches);
}, "~A");
Clazz_overrideMethod (c$, "showMenu", 
function (x, y) {
this.vwr.showMenu (x, y);
}, "~N,~N");
});
Clazz_declarePackage ("JSV.js2d");
Clazz_load (["JSV.common.ColorParameters"], "JSV.js2d.JsParameters", ["JS.Color"], function () {
c$ = Clazz_declareType (JSV.js2d, "JsParameters", JSV.common.ColorParameters);
Clazz_makeConstructor (c$, 
function () {
Clazz_superConstructor (this, JSV.js2d.JsParameters, []);
});
Clazz_overrideMethod (c$, "isValidFontName", 
function (name) {
return true;
}, "~S");
Clazz_overrideMethod (c$, "getColor1", 
function (rgb) {
return JS.Color.get1 (rgb);
}, "~N");
Clazz_overrideMethod (c$, "getColor3", 
function (r, g, b) {
return JS.Color.get3 (r, g, b);
}, "~N,~N,~N");
Clazz_defineMethod (c$, "copy", 
function (newName) {
return ( new JSV.js2d.JsParameters ().setName (newName)).setElementColors (this);
}, "~S");
});
Clazz_declarePackage ("JSV.js2d");
Clazz_load (["J.api.GenericPlatform"], "JSV.js2d.JsPlatform", ["java.net.URL", "JU.AjaxURLStreamHandlerFactory", "$.Rdr", "$.SB", "JSV.app.GenericMouse", "JSV.js2d.Display", "$.Image", "$.JsFile", "$.JsFont"], function () {
c$ = Clazz_decorateAsClass (function () {
this.canvas = null;
this.viewer = null;
this.context = null;
Clazz_instantialize (this, arguments);
}, JSV.js2d, "JsPlatform", null, J.api.GenericPlatform);
Clazz_overrideMethod (c$, "setViewer", 
function (viewer, canvas) {
var context = "";
this.viewer = viewer;
this.canvas = canvas;
{
if (canvas != null) {
context = canvas.getContext("2d");
canvas.imgdata = context.getImageData(0, 0, canvas.width, canvas.height);
canvas.buf8 = canvas.imgdata.data;
}
}if (context !== "") this.context = context;
try {
java.net.URL.setURLStreamHandlerFactory ( new JU.AjaxURLStreamHandlerFactory ());
} catch (e) {
}
}, "J.api.PlatformViewer,~O");
Clazz_overrideMethod (c$, "isSingleThreaded", 
function () {
return true;
});
Clazz_overrideMethod (c$, "getJsObjectInfo", 
function (jsObject, method, args) {
{
return (method == null ? null : method == "localName" ? jsObject[0]["nodeName"] : args == null ? jsObject[0][method] : jsObject[0][method](args[0]));
}}, "~A,~S,~A");
Clazz_overrideMethod (c$, "isHeadless", 
function () {
return false;
});
Clazz_overrideMethod (c$, "getMouseManager", 
function (privateKey, jsvp) {
return  new JSV.app.GenericMouse (jsvp);
}, "~N,~O");
Clazz_overrideMethod (c$, "convertPointFromScreen", 
function (canvas, ptTemp) {
JSV.js2d.Display.convertPointFromScreen (canvas, ptTemp);
}, "~O,JU.P3");
Clazz_overrideMethod (c$, "getFullScreenDimensions", 
function (canvas, widthHeight) {
JSV.js2d.Display.getFullScreenDimensions (canvas, widthHeight);
}, "~O,~A");
Clazz_overrideMethod (c$, "getMenuPopup", 
function (menuStructure, type) {
return null;
}, "~S,~S");
Clazz_overrideMethod (c$, "hasFocus", 
function (canvas) {
return JSV.js2d.Display.hasFocus (canvas);
}, "~O");
Clazz_overrideMethod (c$, "prompt", 
function (label, data, list, asButtons) {
return JSV.js2d.Display.prompt (label, data, list, asButtons);
}, "~S,~S,~A,~B");
Clazz_overrideMethod (c$, "renderScreenImage", 
function (context, size) {
JSV.js2d.Display.renderScreenImage (this.viewer, context, size);
}, "~O,~O");
Clazz_overrideMethod (c$, "drawImage", 
function (context, canvas, x, y, width, height, isDTI) {
JSV.js2d.Image.drawImage (context, canvas, x, y, width, height);
}, "~O,~O,~N,~N,~N,~N,~B");
Clazz_overrideMethod (c$, "requestFocusInWindow", 
function (canvas) {
JSV.js2d.Display.requestFocusInWindow (canvas);
}, "~O");
Clazz_overrideMethod (c$, "repaint", 
function (canvas) {
JSV.js2d.Display.repaint (canvas);
}, "~O");
Clazz_overrideMethod (c$, "setTransparentCursor", 
function (canvas) {
JSV.js2d.Display.setTransparentCursor (canvas);
}, "~O");
Clazz_overrideMethod (c$, "setCursor", 
function (c, canvas) {
JSV.js2d.Display.setCursor (c, canvas);
}, "~N,~O");
Clazz_overrideMethod (c$, "allocateRgbImage", 
function (windowWidth, windowHeight, pBuffer, windowSize, backgroundTransparent, isImageWrite) {
return JSV.js2d.Image.allocateRgbImage (windowWidth, windowHeight, pBuffer, windowSize, backgroundTransparent, (isImageWrite ? null : this.canvas));
}, "~N,~N,~A,~N,~B,~B");
Clazz_overrideMethod (c$, "notifyEndOfRendering", 
function () {
});
Clazz_overrideMethod (c$, "createImage", 
function (data) {
return null;
}, "~O");
Clazz_overrideMethod (c$, "disposeGraphics", 
function (gOffscreen) {
}, "~O");
Clazz_overrideMethod (c$, "grabPixels", 
function (canvas, width, height, pixels, startRow, nRows) {
{
if (canvas.image && (width != canvas.width || height != canvas.height))
Jmol._setCanvasImage(canvas, width, height);
if (canvas.buf32) return canvas.buf32;
}var buf = JSV.js2d.Image.grabPixels (JSV.js2d.Image.getGraphics (canvas), width, height);
{
canvas.buf32 = buf;
}return buf;
}, "~O,~N,~N,~A,~N,~N");
Clazz_overrideMethod (c$, "drawImageToBuffer", 
function (gOffscreen, imageOffscreen, canvas, width, height, bgcolor) {
return this.grabPixels (canvas, width, height, null, 0, 0);
}, "~O,~O,~O,~N,~N,~N");
Clazz_overrideMethod (c$, "getTextPixels", 
function (text, font3d, context, image, width, height, ascent) {
return JSV.js2d.Image.getTextPixels (text, font3d, context, width, height, ascent);
}, "~S,JU.Font,~O,~O,~N,~N,~N");
Clazz_overrideMethod (c$, "flushImage", 
function (imagePixelBuffer) {
}, "~O");
Clazz_overrideMethod (c$, "getGraphics", 
function (canvas) {
return (canvas == null ? this.context : (this.context = JSV.js2d.Image.getGraphics (this.canvas = canvas)));
}, "~O");
Clazz_overrideMethod (c$, "getImageHeight", 
function (canvas) {
return (canvas == null ? -1 : JSV.js2d.Image.getHeight (canvas));
}, "~O");
Clazz_overrideMethod (c$, "getImageWidth", 
function (canvas) {
return (canvas == null ? -1 : JSV.js2d.Image.getWidth (canvas));
}, "~O");
Clazz_overrideMethod (c$, "getStaticGraphics", 
function (image, backgroundTransparent) {
return JSV.js2d.Image.getStaticGraphics (image, backgroundTransparent);
}, "~O,~B");
Clazz_overrideMethod (c$, "newBufferedImage", 
function (image, w, h) {
{
if (self.Jmol && Jmol._getHiddenCanvas)
return Jmol._getHiddenCanvas(this.vwr.html5Applet, "stereoImage", w, h);
}return null;
}, "~O,~N,~N");
Clazz_overrideMethod (c$, "newOffScreenImage", 
function (w, h) {
{
if (self.Jmol && Jmol._getHiddenCanvas)
return Jmol._getHiddenCanvas(this.vwr.html5Applet, "textImage", w, h);
}return null;
}, "~N,~N");
Clazz_overrideMethod (c$, "waitForDisplay", 
function (echoNameAndPath, zipBytes) {
return false;
}, "~O,~O");
Clazz_overrideMethod (c$, "fontStringWidth", 
function (font, text) {
return JSV.js2d.JsFont.stringWidth (font, text);
}, "JU.Font,~S");
Clazz_overrideMethod (c$, "getFontAscent", 
function (context) {
return JSV.js2d.JsFont.getAscent (context);
}, "~O");
Clazz_overrideMethod (c$, "getFontDescent", 
function (context) {
return JSV.js2d.JsFont.getDescent (context);
}, "~O");
Clazz_overrideMethod (c$, "getFontMetrics", 
function (font, context) {
return JSV.js2d.JsFont.getFontMetrics (font, context);
}, "JU.Font,~O");
Clazz_overrideMethod (c$, "newFont", 
function (fontFace, isBold, isItalic, fontSize) {
return JSV.js2d.JsFont.newFont (fontFace, isBold, isItalic, fontSize, "px");
}, "~S,~B,~B,~N");
Clazz_overrideMethod (c$, "getDateFormat", 
function (isoType) {
{
if (isoType == null) {
} else if (isoType.indexOf("8824") >= 0) {
var d = new Date();
var x = d.toString().split(" ");
var MM = "0" + d.getMonth(); MM = MM.substring(MM.length - 2);
var dd = "0" + d.getDate(); dd = dd.substring(dd.length - 2);
return x[3] + MM + dd + x[4].replace(/\:/g,"") + x[5].substring(3,6) + "'" + x[5].substring(6,8) + "'"
} else if (isoType.indexOf("8601") >= 0){
var d = new Date();
var x = d.toString().split(" ");
var MM = "0" + d.getMonth(); MM = MM.substring(MM.length - 2);
var dd = "0" + d.getDate(); dd = dd.substring(dd.length - 2);
return x[3] + MM + dd + x[4].replace(/\:/g,"") + x[5].substring(3,6) + "'" + x[5].substring(6,8) + "'"
}
return ("" + (new Date())).split(" (")[0];
}}, "~S");
Clazz_overrideMethod (c$, "newFile", 
function (name) {
return  new JSV.js2d.JsFile (name);
}, "~S");
Clazz_overrideMethod (c$, "getBufferedFileInputStream", 
function (name) {
return null;
}, "~S");
Clazz_overrideMethod (c$, "getURLContents", 
function (url, outputBytes, post, asString) {
var ret = JSV.js2d.JsFile.getURLContents (url, outputBytes, post);
try {
return (!asString ? ret : Clazz_instanceOf (ret, String) ? ret : Clazz_instanceOf (ret, JU.SB) ? (ret).toString () : Clazz_instanceOf (ret, Array) ?  String.instantialize (ret) :  String.instantialize (JU.Rdr.getStreamAsBytes (ret, null)));
} catch (e) {
if (Clazz_exceptionOf (e, Exception)) {
return "" + e;
} else {
throw e;
}
}
}, "java.net.URL,~A,~S,~B");
Clazz_overrideMethod (c$, "getLocalUrl", 
function (fileName) {
return null;
}, "~S");
Clazz_overrideMethod (c$, "getImageDialog", 
function (title, imageMap) {
return null;
}, "~S,java.util.Map");
Clazz_overrideMethod (c$, "forceAsyncLoad", 
function (filename) {
return false;
}, "~S");
});
Clazz_declarePackage ("JSV.js2d");
Clazz_load (["JSV.api.JSVMainPanel"], "JSV.js2d.JsMainPanel", null, function () {
c$ = Clazz_decorateAsClass (function () {
this.selectedPanel = null;
this.currentPanelIndex = 0;
this.title = null;
this.visible = false;
this.focusable = false;
this.enabled = false;
Clazz_instantialize (this, arguments);
}, JSV.js2d, "JsMainPanel", null, JSV.api.JSVMainPanel);
Clazz_overrideMethod (c$, "getCurrentPanelIndex", 
function () {
return this.currentPanelIndex;
});
Clazz_overrideMethod (c$, "dispose", 
function () {
});
Clazz_overrideMethod (c$, "getTitle", 
function () {
return this.title;
});
Clazz_overrideMethod (c$, "setTitle", 
function (title) {
this.title = title;
}, "~S");
Clazz_overrideMethod (c$, "setSelectedPanel", 
function (viewer, jsvp, panelNodes) {
if (jsvp !== this.selectedPanel) this.selectedPanel = jsvp;
var i = viewer.selectPanel (jsvp, panelNodes);
if (i >= 0) this.currentPanelIndex = i;
this.visible = true;
}, "JSV.common.JSViewer,JSV.api.JSVPanel,JU.Lst");
Clazz_defineMethod (c$, "getHeight", 
function () {
return (this.selectedPanel == null ? 0 : this.selectedPanel.getHeight ());
});
Clazz_defineMethod (c$, "getWidth", 
function () {
return (this.selectedPanel == null ? 0 : this.selectedPanel.getWidth ());
});
Clazz_overrideMethod (c$, "isEnabled", 
function () {
return this.enabled;
});
Clazz_overrideMethod (c$, "isFocusable", 
function () {
return this.focusable;
});
Clazz_overrideMethod (c$, "isVisible", 
function () {
return this.visible;
});
Clazz_overrideMethod (c$, "setEnabled", 
function (b) {
this.enabled = b;
}, "~B");
Clazz_overrideMethod (c$, "setFocusable", 
function (b) {
this.focusable = b;
}, "~B");
});
Clazz_declarePackage ("JSV.source");
Clazz_load (["JSV.source.JDXHeader"], "JSV.source.JDXDataObject", ["java.lang.Character", "$.Double", "JU.DF", "$.PT", "JSV.common.Annotation", "$.Coordinate", "$.Integral", "JSV.exception.JSVException", "JU.Logger"], function () {
c$ = Clazz_decorateAsClass (function () {
this.filePath = null;
this.filePathForwardSlash = null;
this.isSimulation = false;
this.inlineData = null;
this.sourceID = "";
this.blockID = 0;
this.fileFirstX = 1.7976931348623157E308;
this.fileLastX = 1.7976931348623157E308;
this.nPointsFile = -1;
this.xFactor = 1.7976931348623157E308;
this.yFactor = 1.7976931348623157E308;
this.varName = "";
this.xUnits = "";
this.yUnits = "";
this.xLabel = null;
this.yLabel = null;
this.nH = 0;
this.observedNucl = "";
this.observedFreq = 1.7976931348623157E308;
this.parent = null;
this.offset = 1.7976931348623157E308;
this.shiftRefType = -1;
this.dataPointNum = -1;
this.numDim = 1;
this.nucleusX = null;
this.nucleusY = "?";
this.freq2dX = NaN;
this.freq2dY = NaN;
this.y2D = NaN;
this.y2DUnits = "";
this.$isHZtoPPM = false;
this.xIncreases = true;
this.continuous = false;
this.xyCoords = null;
this.minX = NaN;
this.minY = NaN;
this.maxX = NaN;
this.maxY = NaN;
this.deltaX = NaN;
this.normalizationFactor = 1;
Clazz_instantialize (this, arguments);
}, JSV.source, "JDXDataObject", JSV.source.JDXHeader);
Clazz_defineMethod (c$, "setInlineData", 
function (data) {
this.inlineData = data;
}, "~S");
Clazz_defineMethod (c$, "getInlineData", 
function () {
return this.inlineData;
});
Clazz_defineMethod (c$, "setFilePath", 
function (filePath) {
if (filePath != null) this.filePathForwardSlash = (this.filePath = filePath.trim ()).$replace ('\\', '/');
}, "~S");
Clazz_defineMethod (c$, "getFilePath", 
function () {
return this.filePath;
});
Clazz_defineMethod (c$, "getFilePathForwardSlash", 
function () {
return this.filePathForwardSlash;
});
Clazz_defineMethod (c$, "setBlockID", 
function (id) {
this.blockID = id;
}, "~N");
Clazz_defineMethod (c$, "isImaginary", 
function () {
return this.varName.contains ("IMAG");
});
Clazz_defineMethod (c$, "setXFactor", 
function (xFactor) {
this.xFactor = xFactor;
}, "~N");
Clazz_defineMethod (c$, "getXFactor", 
function () {
return this.xFactor;
});
Clazz_defineMethod (c$, "setYFactor", 
function (yFactor) {
this.yFactor = yFactor;
}, "~N");
Clazz_defineMethod (c$, "getYFactor", 
function () {
return this.yFactor;
});
Clazz_defineMethod (c$, "checkRequiredTokens", 
function () {
var err = (this.fileFirstX == 1.7976931348623157E308 ? "##FIRSTX" : this.fileLastX == 1.7976931348623157E308 ? "##LASTX" : this.nPointsFile == -1 ? "##NPOINTS" : this.xFactor == 1.7976931348623157E308 ? "##XFACTOR" : this.yFactor == 1.7976931348623157E308 ? "##YFACTOR" : null);
if (err != null) throw  new JSV.exception.JSVException ("Error Reading Data Set: " + err + " not found");
});
Clazz_defineMethod (c$, "setXUnits", 
function (xUnits) {
this.xUnits = xUnits;
}, "~S");
Clazz_defineMethod (c$, "getXUnits", 
function () {
return this.xUnits;
});
Clazz_defineMethod (c$, "setYUnits", 
function (yUnits) {
if (yUnits.equals ("PPM")) yUnits = "ARBITRARY UNITS";
this.yUnits = yUnits;
}, "~S");
Clazz_defineMethod (c$, "getYUnits", 
function () {
return this.yUnits;
});
Clazz_defineMethod (c$, "setXLabel", 
function (value) {
this.xLabel = value;
}, "~S");
Clazz_defineMethod (c$, "setYLabel", 
function (value) {
this.yLabel = value;
}, "~S");
Clazz_defineMethod (c$, "setObservedNucleus", 
function (value) {
this.observedNucl = value;
if (this.numDim == 1) this.parent.nucleusX = this.nucleusX = this.fixNucleus (value);
}, "~S");
Clazz_defineMethod (c$, "setObservedFreq", 
function (observedFreq) {
this.observedFreq = observedFreq;
}, "~N");
Clazz_defineMethod (c$, "getObservedFreq", 
function () {
return this.observedFreq;
});
Clazz_defineMethod (c$, "is1D", 
function () {
return this.numDim == 1;
});
Clazz_defineMethod (c$, "setY2D", 
function (d) {
this.y2D = d;
}, "~N");
Clazz_defineMethod (c$, "getY2D", 
function () {
return this.y2D;
});
Clazz_defineMethod (c$, "setY2DUnits", 
function (units) {
this.y2DUnits = units;
}, "~S");
Clazz_defineMethod (c$, "getY2DPPM", 
function () {
var d = this.y2D;
if (this.y2DUnits.equals ("HZ")) d /= this.freq2dY;
return d;
});
Clazz_defineMethod (c$, "setNucleusAndFreq", 
function (nuc, isX) {
nuc = this.fixNucleus (nuc);
if (isX) this.nucleusX = nuc;
 else this.nucleusY = nuc;
var freq;
if (this.observedNucl.indexOf (nuc) >= 0) {
freq = this.observedFreq;
} else {
var g1 = JSV.source.JDXDataObject.getGyroMagneticRatio (this.observedNucl);
var g2 = JSV.source.JDXDataObject.getGyroMagneticRatio (nuc);
freq = this.observedFreq * g2 / g1;
}if (isX) this.freq2dX = freq;
 else this.freq2dY = freq;
JU.Logger.info ("Freq for " + nuc + " = " + freq);
}, "~S,~B");
Clazz_defineMethod (c$, "fixNucleus", 
 function (nuc) {
return JU.PT.rep (JU.PT.trim (nuc, "[]^<>"), "NUC_", "");
}, "~S");
c$.getGyroMagneticRatio = Clazz_defineMethod (c$, "getGyroMagneticRatio", 
 function (nuc) {
var pt = 0;
while (pt < nuc.length && !Character.isDigit (nuc.charAt (pt))) pt++;

pt = JU.PT.parseInt (nuc.substring (pt));
var i = 0;
for (; i < JSV.source.JDXDataObject.gyroData.length; i += 2) if (JSV.source.JDXDataObject.gyroData[i] >= pt) break;

return (JSV.source.JDXDataObject.gyroData[i] == pt ? JSV.source.JDXDataObject.gyroData[i + 1] : NaN);
}, "~S");
Clazz_defineMethod (c$, "isTransmittance", 
function () {
var s = this.yUnits.toLowerCase ();
return (s.equals ("transmittance") || s.contains ("trans") || s.equals ("t"));
});
Clazz_defineMethod (c$, "isAbsorbance", 
function () {
var s = this.yUnits.toLowerCase ();
return (s.equals ("absorbance") || s.contains ("abs") || s.equals ("a"));
});
Clazz_defineMethod (c$, "canSaveAsJDX", 
function () {
return this.getDataClass ().equals ("XYDATA");
});
Clazz_defineMethod (c$, "canIntegrate", 
function () {
return (this.continuous && (this.isHNMR () || this.isGC ()) && this.is1D ());
});
Clazz_defineMethod (c$, "isAutoOverlayFromJmolClick", 
function () {
return (this.isGC ());
});
Clazz_defineMethod (c$, "isGC", 
function () {
return this.dataType.startsWith ("GC") || this.dataType.startsWith ("GAS");
});
Clazz_defineMethod (c$, "isMS", 
function () {
return this.dataType.startsWith ("MASS") || this.dataType.startsWith ("MS");
});
Clazz_defineMethod (c$, "isStackable", 
function () {
return !this.isMS ();
});
Clazz_defineMethod (c$, "isScalable", 
function () {
return true;
});
Clazz_defineMethod (c$, "getYRef", 
function () {
return (!this.isTransmittance () ? 0.0 : JSV.common.Coordinate.getMaxY (this.xyCoords, 0, this.xyCoords.length - 1) < 2 ? 1.0 : 100.0);
});
Clazz_defineMethod (c$, "isInverted", 
function () {
return this.isTransmittance ();
});
Clazz_defineMethod (c$, "canConvertTransAbs", 
function () {
return (this.continuous && (this.yUnits.toLowerCase ().contains ("abs")) || this.yUnits.toLowerCase ().contains ("trans"));
});
Clazz_defineMethod (c$, "canShowSolutionColor", 
function () {
return (this.isContinuous () && this.canConvertTransAbs () && (this.xUnits.toLowerCase ().contains ("nanometer") || this.xUnits.equalsIgnoreCase ("nm")) && this.getFirstX () < 401 && this.getLastX () > 699 && this.xyCoords.length >= 30);
});
Clazz_defineMethod (c$, "isHZtoPPM", 
function () {
return this.$isHZtoPPM;
});
Clazz_defineMethod (c$, "setHZtoPPM", 
function (val) {
this.$isHZtoPPM = val;
}, "~B");
Clazz_defineMethod (c$, "setIncreasing", 
function (val) {
this.xIncreases = val;
}, "~B");
Clazz_defineMethod (c$, "isXIncreasing", 
function () {
return this.xIncreases;
});
Clazz_defineMethod (c$, "shouldDisplayXAxisIncreasing", 
function () {
var dt = this.dataType.toUpperCase ();
var xu = this.xUnits.toUpperCase ();
if (dt.contains ("NMR") && !(dt.contains ("FID"))) {
return false;
} else if (dt.contains ("LINK") && xu.contains ("CM")) {
return false;
} else if (dt.startsWith ("IR") || dt.contains ("INFRA") && xu.contains ("CM")) {
return false;
} else if (dt.contains ("RAMAN") && xu.contains ("CM")) {
return false;
} else if (dt.contains ("VIS") && xu.contains ("NANOMETERS")) {
return true;
}return this.xIncreases;
});
Clazz_defineMethod (c$, "setContinuous", 
function (val) {
this.continuous = val;
}, "~B");
Clazz_defineMethod (c$, "isContinuous", 
function () {
return this.continuous;
});
Clazz_defineMethod (c$, "getHeaderRowDataAsArray", 
function () {
var n = 8;
if (this.observedFreq != 1.7976931348623157E308) n++;
if (this.observedNucl !== "") n++;
var rowData = this.getHeaderRowDataAsArray (true, n);
var i = rowData.length - n;
if (this.observedFreq != 1.7976931348623157E308) rowData[i++] =  Clazz_newArray (-1, ["##.OBSERVE FREQUENCY", "" + this.observedFreq]);
if (this.observedNucl !== "") rowData[i++] =  Clazz_newArray (-1, ["##.OBSERVE NUCLEUS", this.observedNucl]);
rowData[i++] =  Clazz_newArray (-1, ["##XUNITS", this.$isHZtoPPM ? "HZ" : this.xUnits]);
rowData[i++] =  Clazz_newArray (-1, ["##YUNITS", this.yUnits]);
var x = (this.xIncreases ? this.getFirstX () : this.getLastX ());
rowData[i++] =  Clazz_newArray (-1, ["##FIRSTX", String.valueOf (this.isHZtoPPM () ? x * this.observedFreq : x)]);
x = (this.xIncreases ? this.getLastX () : this.getFirstX ());
rowData[i++] =  Clazz_newArray (-1, ["##FIRSTY", String.valueOf (this.xIncreases ? this.getFirstY () : this.getLastY ())]);
rowData[i++] =  Clazz_newArray (-1, ["##LASTX", String.valueOf (this.isHZtoPPM () ? x * this.observedFreq : x)]);
rowData[i++] =  Clazz_newArray (-1, ["##XFACTOR", String.valueOf (this.getXFactor ())]);
rowData[i++] =  Clazz_newArray (-1, ["##YFACTOR", String.valueOf (this.getYFactor ())]);
rowData[i++] =  Clazz_newArray (-1, ["##NPOINTS", String.valueOf (this.xyCoords.length)]);
return rowData;
});
Clazz_defineMethod (c$, "getDefaultUnitPrecision", 
function () {
return 2;
});
Clazz_defineMethod (c$, "setMeasurementText", 
function (m) {
var dx = m.getValue ();
if (Double.isNaN (dx)) return "";
var precision = 1;
var units = "";
if (this.isNMR ()) {
if (this.numDim == 1) {
var isIntegral = (Clazz_instanceOf (m, JSV.common.Integral));
if (this.isHNMR () || isIntegral) {
if (!isIntegral) {
dx *= this.observedFreq;
units = " Hz";
}} else {
units = " ppm";
precision = 2;
}} else {
return "";
}}return (dx < 0.1 ? "" : JU.DF.formatDecimalDbl (dx, precision) + units);
}, "JSV.common.Measurement");
Clazz_defineMethod (c$, "isNMR", 
function () {
return (this.dataType.toUpperCase ().indexOf ("NMR") >= 0);
});
Clazz_defineMethod (c$, "isHNMR", 
function () {
return (this.isNMR () && this.observedNucl.toUpperCase ().indexOf ("H") >= 0);
});
Clazz_defineMethod (c$, "setXYCoords", 
function (coords) {
this.xyCoords = coords;
}, "~A");
Clazz_defineMethod (c$, "invertYAxis", 
function () {
for (var i = this.xyCoords.length; --i >= 0; ) {
this.xyCoords[i].setYVal (-this.xyCoords[i].getYVal ());
}
var d = this.minY;
this.minY = -this.maxY;
this.maxY = -d;
return this;
});
Clazz_defineMethod (c$, "getFirstX", 
function () {
return this.xyCoords[0].getXVal ();
});
Clazz_defineMethod (c$, "getFirstY", 
function () {
return this.xyCoords[0].getYVal ();
});
Clazz_defineMethod (c$, "getLastX", 
function () {
return this.xyCoords[this.xyCoords.length - 1].getXVal ();
});
Clazz_defineMethod (c$, "getLastY", 
function () {
return this.xyCoords[this.xyCoords.length - 1].getYVal ();
});
Clazz_defineMethod (c$, "getMinX", 
function () {
return (Double.isNaN (this.minX) ? (this.minX = JSV.common.Coordinate.getMinX (this.xyCoords, 0, this.xyCoords.length - 1)) : this.minX);
});
Clazz_defineMethod (c$, "getMinY", 
function () {
return (Double.isNaN (this.minY) ? (this.minY = JSV.common.Coordinate.getMinY (this.xyCoords, 0, this.xyCoords.length - 1)) : this.minY);
});
Clazz_defineMethod (c$, "getMaxX", 
function () {
return (Double.isNaN (this.maxX) ? (this.maxX = JSV.common.Coordinate.getMaxX (this.xyCoords, 0, this.xyCoords.length - 1)) : this.maxX);
});
Clazz_defineMethod (c$, "getMaxY", 
function () {
return (Double.isNaN (this.maxY) ? (this.maxY = JSV.common.Coordinate.getMaxY (this.xyCoords, 0, this.xyCoords.length - 1)) : this.maxY);
});
Clazz_defineMethod (c$, "doNormalize", 
function (max) {
if (!this.isNMR () || !this.is1D ()) return;
this.normalizationFactor = max / this.getMaxY ();
this.maxY = NaN;
JSV.common.Coordinate.applyScale (this.xyCoords, 1, this.normalizationFactor);
JU.Logger.info ("Y values have been scaled by a factor of " + this.normalizationFactor);
}, "~N");
Clazz_defineMethod (c$, "getDeltaX", 
function () {
return (Double.isNaN (this.deltaX) ? (this.deltaX = JSV.common.Coordinate.deltaX (this.getLastX (), this.getFirstX (), this.xyCoords.length)) : this.deltaX);
});
Clazz_defineMethod (c$, "copyTo", 
function (newObj) {
newObj.setTitle (this.title);
newObj.setJcampdx (this.jcampdx);
newObj.setOrigin (this.origin);
newObj.setOwner (this.owner);
newObj.setDataClass (this.dataClass);
newObj.setDataType (this.dataType);
newObj.setHeaderTable (this.headerTable);
newObj.setXFactor (this.xFactor);
newObj.setYFactor (this.yFactor);
newObj.setXUnits (this.xUnits);
newObj.setYUnits (this.yUnits);
newObj.setXLabel (this.xLabel);
newObj.setYLabel (this.yLabel);
newObj.setXYCoords (this.xyCoords);
newObj.setContinuous (this.continuous);
newObj.setIncreasing (this.xIncreases);
newObj.observedFreq = this.observedFreq;
newObj.observedNucl = this.observedNucl;
newObj.offset = this.offset;
newObj.dataPointNum = this.dataPointNum;
newObj.shiftRefType = this.shiftRefType;
newObj.$isHZtoPPM = this.$isHZtoPPM;
newObj.numDim = this.numDim;
newObj.nucleusX = this.nucleusX;
newObj.nucleusY = this.nucleusY;
newObj.freq2dX = this.freq2dX;
newObj.freq2dY = this.freq2dY;
newObj.setFilePath (this.filePath);
newObj.nH = this.nH;
}, "JSV.source.JDXDataObject");
Clazz_defineMethod (c$, "getTypeLabel", 
function () {
return (this.isNMR () ? this.nucleusX + "NMR" : this.dataType);
});
Clazz_defineMethod (c$, "getDefaultAnnotationInfo", 
function (type) {
var s1;
var s2;
var isNMR = this.isNMR ();
switch (type) {
case JSV.common.Annotation.AType.Integration:
return  Clazz_newArray (-1, [null,  Clazz_newIntArray (-1, [1]), null]);
case JSV.common.Annotation.AType.Measurements:
s1 = (isNMR ?  Clazz_newArray (-1, ["Hz", "ppm"]) :  Clazz_newArray (-1, [""]));
s2 = (this.isHNMR () ?  Clazz_newIntArray (-1, [1, 4]) :  Clazz_newIntArray (-1, [1, 3]));
return  Clazz_newArray (-1, [s1, s2, Integer.$valueOf (0)]);
case JSV.common.Annotation.AType.PeakList:
s1 = (isNMR ?  Clazz_newArray (-1, ["Hz", "ppm"]) :  Clazz_newArray (-1, [""]));
s2 = (this.isHNMR () ?  Clazz_newIntArray (-1, [1, 2]) :  Clazz_newIntArray (-1, [1, 1]));
return  Clazz_newArray (-1, [s1, s2, Integer.$valueOf (isNMR ? 1 : 0)]);
case JSV.common.Annotation.AType.NONE:
case JSV.common.Annotation.AType.OverlayLegend:
break;
case JSV.common.Annotation.AType.Views:
break;
}
return null;
}, "JSV.common.Annotation.AType");
Clazz_defineMethod (c$, "getPeakListArray", 
function (m, last, maxY) {
var x = m.getXVal ();
var y = m.getYVal ();
if (this.isNMR ()) y /= maxY;
var dx = Math.abs (x - last[0]);
last[0] = x;
var ddx = dx + last[1];
last[1] = dx;
var dddx = ddx + last[2];
last[2] = ddx;
if (this.isNMR ()) {
return  Clazz_newDoubleArray (-1, [x, y, x * this.observedFreq, (dx * this.observedFreq > 20 ? 0 : dx * this.observedFreq), (ddx * this.observedFreq > 20 ? 0 : ddx * this.observedFreq), (dddx * this.observedFreq > 20 ? 0 : dddx * this.observedFreq)]);
}return  Clazz_newDoubleArray (-1, [x, y]);
}, "JSV.common.Measurement,~A,~N");
Clazz_defineStatics (c$,
"ERROR", 1.7976931348623157E308,
"SCALE_NONE", 0,
"SCALE_TOP", 1,
"SCALE_BOTTOM", 2,
"SCALE_TOP_BOTTOM", 3,
"gyroData",  Clazz_newDoubleArray (-1, [1, 42.5774806, 2, 6.53590131, 3, 45.4148, 3, 32.436, 6, 6.2661, 7, 16.5483, 9, 5.9842, 10, 4.5752, 11, 13.663, 13, 10.70839657, 14, 3.07770646, 15, 4.31726570, 17, 5.7742, 19, 40.07757016, 21, 3.3631, 23, 11.26952167, 25, 2.6083, 27, 11.1031, 29, 8.4655, 31, 17.25144090, 33, 3.2717, 35, 4.1765, 37, 3.4765, 37, 5.819, 39, 3.46, 39, 1.9893, 40, 2.4737, 41, 1.0919, 43, 2.8688, 45, 10.3591, 47, 2.4041, 49, 2.4048, 50, 4.2505, 51, 11.2133, 53, 2.4115, 55, 10.5763, 57, 1.3816, 59, 10.077, 61, 3.8114, 63, 11.2982, 65, 12.103, 67, 2.6694, 69, 10.2478, 71, 13.0208, 73, 1.4897, 75, 7.315, 77, 8.1571, 79, 10.7042, 81, 11.5384, 83, 1.6442, 85, 4.1254, 87, 13.9811, 87, 1.8525, 89, 2.0949, 91, 3.9748, 93, 10.4523, 95, 2.7874, 97, 2.8463, 99, 9.6294, 99, 1.9553, 101, 2.1916, 103, 1.3477, 105, 1.957, 107, 1.7331, 109, 1.9924, 111, 9.0692, 113, 9.4871, 113, 9.3655, 115, 9.3856, 115, 14.0077, 117, 15.261, 119, 15.966, 121, 10.2551, 123, 5.5532, 123, 11.2349, 125, 13.5454, 127, 8.5778, 129, 11.8604, 131, 3.5159, 133, 5.6234, 135, 4.2582, 137, 4.7634, 138, 5.6615, 139, 6.0612, 137, 4.88, 139, 5.39, 141, 2.37, 141, 13.0359, 143, 2.319, 145, 1.429, 143, 11.59, 147, 5.62, 147, 1.7748, 149, 14631, 151, 10.5856, 153, 4.6745, 155, 1.312, 157, 1.72, 159, 10.23, 161, 1.4654, 163, 2.0508, 165, 9.0883, 167, 1.2281, 169, 3.531, 171, 7.5261, 173, 2.073, 175, 4.8626, 176, 3.451, 177, 1.7282, 179, 1.0856, 180, 4.087, 181, 5.1627, 183, 1.7957, 185, 9.7176, 187, 9.817, 187, 0.9856, 189, 3.3536, 191, 0.7658, 191, 0.8319, 195, 9.2922, 197, 0.7406, 199, 7.7123, 201, 2.8469, 203, 24.7316, 205, 24.9749, 207, 9.034, 209, 6.963, 209, 11.7, 211, 9.16, 223, 5.95, 223, 1.3746, 225, 11.187, 227, 5.6, 229, 1.4, 231, 10.2, 235, 0.83, 237, 9.57, 239, 3.09, 243, 4.6, 1E100]));
});
Clazz_declarePackage ("JSV.source");
Clazz_load (null, "JSV.source.JDXDecompressor", ["java.lang.Double", "JSV.common.Coordinate", "JU.Logger"], function () {
c$ = Clazz_decorateAsClass (function () {
this.xFactor = 0;
this.yFactor = 0;
this.deltaX = 0;
this.nPoints = 0;
this.ich = 0;
this.lineNumber = 0;
this.t = null;
this.firstX = 0;
this.dx = 0;
this.maxY = 4.9E-324;
this.minY = 1.7976931348623157E308;
this.debugging = false;
this.xyCoords = null;
this.ipt = 0;
this.line = null;
this.lastLine = null;
this.lineLen = 0;
this.errorLog = null;
this.difVal = -2147483648;
this.lastDif = -2147483648;
this.dupCount = 0;
this.xval = 0;
this.yval = 0;
this.firstLastX = null;
Clazz_instantialize (this, arguments);
}, JSV.source, "JDXDecompressor");
Clazz_defineMethod (c$, "getMinY", 
function () {
return this.minY;
});
Clazz_defineMethod (c$, "getMaxY", 
function () {
return this.maxY;
});
Clazz_makeConstructor (c$, 
function (t, firstX, xFactor, yFactor, deltaX, nPoints) {
this.t = t;
this.firstX = firstX;
this.xFactor = xFactor;
this.yFactor = yFactor;
this.deltaX = deltaX;
this.nPoints = nPoints;
this.lineNumber = t.labelLineNo;
this.debugging = JU.Logger.isActiveLevel (6);
}, "JSV.source.JDXSourceStreamTokenizer,~N,~N,~N,~N,~N");
Clazz_defineMethod (c$, "addPoint", 
 function (pt) {
if (this.ipt == this.xyCoords.length) {
var t =  new Array (this.ipt * 2);
System.arraycopy (this.xyCoords, 0, t, 0, this.ipt);
this.xyCoords = t;
}var d = pt.getYVal ();
if (d > this.maxY) this.maxY = d;
 else if (d < this.minY) this.minY = d;
if (this.debugging) this.logError ("Coord: " + this.ipt + pt);
this.xyCoords[this.ipt++] = pt;
this.firstLastX[1] = pt.getXVal ();
}, "JSV.common.Coordinate");
Clazz_defineMethod (c$, "decompressData", 
function (errorLog, firstLastX) {
this.errorLog = errorLog;
this.firstLastX = firstLastX;
if (this.debugging) this.logError ("firstX=" + this.firstX + " xFactor=" + this.xFactor + " yFactor=" + this.yFactor + " deltaX=" + this.deltaX + " nPoints=" + this.nPoints);
this.testAlgorithm ();
this.xyCoords =  new Array (this.nPoints);
var difMax = Math.abs (0.35 * this.deltaX);
var dif14 = Math.abs (1.4 * this.deltaX);
var dif06 = Math.abs (0.6 * this.deltaX);
try {
while ((this.line = this.t.readLineTrimmed ()) != null && this.line.indexOf ("##") < 0) {
this.lineNumber++;
if (this.debugging) this.logError (this.lineNumber + "\t" + this.line);
if ((this.lineLen = this.line.length) == 0) continue;
this.ich = 0;
var isCheckPoint = (this.lastDif != -2147483648);
this.xval = this.getValueDelim () * this.xFactor;
if (this.ipt == 0) {
firstLastX[0] = this.xval;
this.dx = this.firstX - this.xval;
}this.xval += this.dx;
var point =  new JSV.common.Coordinate ().set (this.xval, (this.yval = this.getYValue ()) * this.yFactor);
if (this.ipt == 0) {
this.addPoint (point);
} else {
var lastPoint = this.xyCoords[this.ipt - 1];
var xdif = Math.abs (lastPoint.getXVal () - point.getXVal ());
if (isCheckPoint && xdif < difMax) {
this.xyCoords[this.ipt - 1] = point;
var y = lastPoint.getYVal ();
var y1 = point.getYVal ();
if (y1 != y) this.logError (this.lastLine + "\n" + this.line + "\nY-value Checkpoint Error! Line " + this.lineNumber + " for y1=" + y1 + " y0=" + y);
} else {
this.addPoint (point);
if (xdif < dif06 || xdif > dif14) this.logError (this.lastLine + "\n" + this.line + "\nX-sequence Checkpoint Error! Line " + this.lineNumber + " |x1-x0|=" + xdif + " instead of " + Math.abs (this.deltaX) + " for x1=" + point.getXVal () + " x0=" + lastPoint.getXVal ());
}}while (this.ich < this.lineLen || this.difVal != -2147483648 || this.dupCount > 0) {
this.xval += this.deltaX;
if (!Double.isNaN (this.yval = this.getYValue ())) this.addPoint ( new JSV.common.Coordinate ().set (this.xval, this.yval * this.yFactor));
}
this.lastLine = this.line;
}
} catch (ioe) {
if (Clazz_exceptionOf (ioe, java.io.IOException)) {
} else {
throw ioe;
}
}
if (this.nPoints != this.ipt) {
this.logError ("Decompressor did not find " + this.nPoints + " points -- instead " + this.ipt);
var temp =  new Array (this.ipt);
System.arraycopy (this.xyCoords, 0, temp, 0, this.ipt);
this.xyCoords = temp;
}return (this.deltaX > 0 ? this.xyCoords : JSV.common.Coordinate.reverse (this.xyCoords));
}, "JU.SB,~A");
Clazz_defineMethod (c$, "logError", 
 function (s) {
if (this.debugging) JU.Logger.debug (s);
this.errorLog.append (s).appendC ('\n');
}, "~S");
Clazz_defineMethod (c$, "getYValue", 
 function () {
if (this.dupCount > 0) {
--this.dupCount;
this.yval = (this.lastDif == -2147483648 ? this.yval : this.yval + this.lastDif);
return this.yval;
}if (this.difVal != -2147483648) {
this.yval += this.difVal;
this.lastDif = this.difVal;
this.difVal = -2147483648;
return this.yval;
}if (this.ich == this.lineLen) return NaN;
var ch = this.line.charAt (this.ich);
if (this.debugging) JU.Logger.info ("" + ch);
switch (ch) {
case '%':
this.difVal = 0;
break;
case 'J':
case 'K':
case 'L':
case 'M':
case 'N':
case 'O':
case 'P':
case 'Q':
case 'R':
this.difVal = ch.charCodeAt (0) - 73;
break;
case 'j':
case 'k':
case 'l':
case 'm':
case 'n':
case 'o':
case 'p':
case 'q':
case 'r':
this.difVal = 105 - ch.charCodeAt (0);
break;
case 'S':
case 'T':
case 'U':
case 'V':
case 'W':
case 'X':
case 'Y':
case 'Z':
this.dupCount = ch.charCodeAt (0) - 82;
break;
case 's':
this.dupCount = 9;
break;
case '+':
case '-':
case '.':
case '0':
case '1':
case '2':
case '3':
case '4':
case '5':
case '6':
case '7':
case '8':
case '9':
case '@':
case 'A':
case 'B':
case 'C':
case 'D':
case 'E':
case 'F':
case 'G':
case 'H':
case 'I':
case 'a':
case 'b':
case 'c':
case 'd':
case 'e':
case 'f':
case 'g':
case 'h':
case 'i':
this.lastDif = -2147483648;
return this.getValue ();
case '?':
this.lastDif = -2147483648;
return NaN;
default:
this.ich++;
this.lastDif = -2147483648;
return this.getYValue ();
}
this.ich++;
if (this.difVal != -2147483648) this.difVal = this.getDifDup (this.difVal);
 else this.dupCount = this.getDifDup (this.dupCount) - 1;
return this.getYValue ();
});
Clazz_defineMethod (c$, "getDifDup", 
 function (i) {
var ich0 = this.ich;
this.next ();
var s = i + this.line.substring (ich0, this.ich);
return (ich0 == this.ich ? i : Integer.$valueOf (s).intValue ());
}, "~N");
Clazz_defineMethod (c$, "getValue", 
 function () {
var ich0 = this.ich;
if (this.ich == this.lineLen) return NaN;
var ch = this.line.charAt (this.ich);
var leader = 0;
switch (ch) {
case '+':
case '-':
case '.':
case '0':
case '1':
case '2':
case '3':
case '4':
case '5':
case '6':
case '7':
case '8':
case '9':
return this.getValueDelim ();
case '@':
case 'A':
case 'B':
case 'C':
case 'D':
case 'E':
case 'F':
case 'G':
case 'H':
case 'I':
leader = ch.charCodeAt (0) - 64;
ich0 = ++this.ich;
break;
case 'a':
case 'b':
case 'c':
case 'd':
case 'e':
case 'f':
case 'g':
case 'h':
case 'i':
leader = 96 - ch.charCodeAt (0);
ich0 = ++this.ich;
break;
default:
this.ich++;
return this.getValue ();
}
this.next ();
return Double.$valueOf (leader + this.line.substring (ich0, this.ich)).doubleValue ();
});
Clazz_defineMethod (c$, "getValueDelim", 
 function () {
var ich0 = this.ich;
var ch = '\u0000';
while (this.ich < this.lineLen && " ,\t\n".indexOf (ch = this.line.charAt (this.ich)) >= 0) this.ich++;

var factor = 1;
switch (ch) {
case '-':
factor = -1;
case '+':
ich0 = ++this.ich;
break;
}
ch = this.next ();
if (ch == 'E' && this.ich + 3 < this.lineLen) switch (this.line.charAt (this.ich + 1)) {
case '-':
case '+':
this.ich += 4;
if (this.ich < this.lineLen && (ch = this.line.charAt (this.ich)) >= '0' && ch <= '9') this.ich++;
break;
}
return factor * ((Double.$valueOf (this.line.substring (ich0, this.ich))).doubleValue ());
});
Clazz_defineMethod (c$, "next", 
 function () {
while (this.ich < this.lineLen && "+-%@ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrs? ,\t\n".indexOf (this.line.charAt (this.ich)) < 0) this.ich++;

return (this.ich == this.lineLen ? '\0' : this.line.charAt (this.ich));
});
Clazz_defineMethod (c$, "testAlgorithm", 
 function () {
});
Clazz_defineStatics (c$,
"allDelim", "+-%@ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrs? ,\t\n",
"WHITE_SPACE", " ,\t\n");
});
Clazz_declarePackage ("JSV.source");
Clazz_load (["JU.Lst"], "JSV.source.JDXHeader", null, function () {
c$ = Clazz_decorateAsClass (function () {
this.title = "";
this.jcampdx = "5.01";
this.dataType = "";
this.dataClass = "";
this.origin = "";
this.owner = "PUBLIC DOMAIN";
this.longDate = "";
this.date = "";
this.time = "";
this.qualifiedType = null;
this.headerTable = null;
Clazz_instantialize (this, arguments);
}, JSV.source, "JDXHeader");
Clazz_prepareFields (c$, function () {
this.headerTable =  new JU.Lst ();
});
Clazz_defineMethod (c$, "setTitle", 
function (title) {
this.title = title;
}, "~S");
Clazz_defineMethod (c$, "setJcampdx", 
function (versionNum) {
this.jcampdx = versionNum;
}, "~S");
Clazz_defineMethod (c$, "setDataType", 
function (dataType) {
this.dataType = dataType;
}, "~S");
Clazz_defineMethod (c$, "setDataClass", 
function (dataClass) {
this.dataClass = dataClass;
}, "~S");
Clazz_defineMethod (c$, "setOrigin", 
function (origin) {
this.origin = origin;
}, "~S");
Clazz_defineMethod (c$, "setOwner", 
function (owner) {
this.owner = owner;
}, "~S");
Clazz_defineMethod (c$, "setLongDate", 
function (longDate) {
this.longDate = longDate;
}, "~S");
Clazz_defineMethod (c$, "setDate", 
function (date) {
this.date = date;
}, "~S");
Clazz_defineMethod (c$, "setTime", 
function (time) {
this.time = time;
}, "~S");
Clazz_defineMethod (c$, "getTitle", 
function () {
return this.title;
});
c$.getTypeName = Clazz_defineMethod (c$, "getTypeName", 
function (type) {
type = type.toUpperCase ();
for (var i = 0; i < JSV.source.JDXHeader.typeNames.length; i++) if (JSV.source.JDXHeader.typeNames[i].startsWith (type)) {
return JSV.source.JDXHeader.typeNames[i].substring (18);
}
return type;
}, "~S");
Clazz_defineMethod (c$, "getQualifiedDataType", 
function () {
return (this.qualifiedType == null ? (this.qualifiedType = JSV.source.JDXHeader.getTypeName (this.dataType)) : this.qualifiedType);
});
Clazz_defineMethod (c$, "getJcampdx", 
function () {
return this.jcampdx;
});
Clazz_defineMethod (c$, "getDataType", 
function () {
return this.dataType;
});
Clazz_defineMethod (c$, "getOrigin", 
function () {
return this.origin;
});
Clazz_defineMethod (c$, "getOwner", 
function () {
return this.owner;
});
Clazz_defineMethod (c$, "getLongDate", 
function () {
return this.longDate;
});
Clazz_defineMethod (c$, "getDate", 
function () {
return this.date;
});
Clazz_defineMethod (c$, "getTime", 
function () {
return this.time;
});
Clazz_defineMethod (c$, "getDataClass", 
function () {
return this.dataClass;
});
Clazz_defineMethod (c$, "setHeaderTable", 
function (table) {
this.headerTable = table;
}, "JU.Lst");
Clazz_defineMethod (c$, "getHeaderTable", 
function () {
return this.headerTable;
});
Clazz_defineMethod (c$, "getHeaderRowDataAsArray", 
function (addDataClass, nMore) {
var rowData =  new Array ((addDataClass ? 6 : 5) + this.headerTable.size () + nMore);
var i = 0;
rowData[i++] =  Clazz_newArray (-1, ["##TITLE", this.title]);
rowData[i++] =  Clazz_newArray (-1, ["##JCAMP-DX", this.jcampdx]);
rowData[i++] =  Clazz_newArray (-1, ["##DATA TYPE", this.dataType]);
if (addDataClass) rowData[i++] =  Clazz_newArray (-1, ["##DATA CLASS", this.dataClass]);
rowData[i++] =  Clazz_newArray (-1, ["##ORIGIN", this.origin]);
rowData[i++] =  Clazz_newArray (-1, ["##OWNER", this.owner]);
for (var j = 0; j < this.headerTable.size (); j++) rowData[i++] = this.getRow (j);

return rowData;
}, "~B,~N");
Clazz_defineMethod (c$, "getRow", 
 function (j) {
var s = this.headerTable.get (j);
{
return [s[0], JU.PT.rep(s[1], "<", "&lt;")];
}}, "~N");
Clazz_defineStatics (c$,
"typeNames",  Clazz_newArray (-1, ["ND NMR SPECTRUM   NMR", "NMR SPECTRUM      NMR", "INFRARED SPECTRUM IR", "MASS SPECTRUM     MS", "RAMAN SPECTRUM    RAMAN", "GAS CHROMATOGRAM  GC", "UV/VIS SPECTRUM   UV/VIS"]));
});
Clazz_declarePackage ("JSV.source");
Clazz_load (["J.api.JmolJDXMOLReader"], "JSV.source.JDXReader", ["java.io.BufferedReader", "$.InputStream", "$.StringReader", "java.lang.Double", "$.Float", "java.util.Hashtable", "$.StringTokenizer", "JU.AU", "$.Lst", "$.PT", "$.SB", "JSV.api.JSVZipReader", "JSV.common.Coordinate", "$.JSVFileManager", "$.JSViewer", "$.PeakInfo", "$.Spectrum", "JSV.exception.JSVException", "JSV.source.JDXDecompressor", "$.JDXSource", "$.JDXSourceStreamTokenizer", "JU.Logger"], function () {
c$ = Clazz_decorateAsClass (function () {
this.nmrMaxY = NaN;
this.source = null;
this.t = null;
this.errorLog = null;
this.obscure = false;
this.done = false;
this.isZipFile = false;
this.filePath = null;
this.loadImaginary = true;
this.isSimulation = false;
this.ignoreShiftReference = false;
this.isTabularData = false;
this.firstSpec = 0;
this.lastSpec = 0;
this.nSpec = 0;
this.blockID = 0;
this.mpr = null;
this.reader = null;
this.modelSpectrum = null;
this.acdAssignments = null;
this.acdMolFile = null;
this.peakData = null;
Clazz_instantialize (this, arguments);
}, JSV.source, "JDXReader", null, J.api.JmolJDXMOLReader);
c$.getVarList = Clazz_defineMethod (c$, "getVarList", 
function (dataClass) {
var index = JSV.source.JDXReader.VAR_LIST_TABLE[0].indexOf (dataClass);
return JSV.source.JDXReader.VAR_LIST_TABLE[1].substring (index + 1, index + 12).trim ();
}, "~S");
Clazz_makeConstructor (c$, 
 function (filePath, obscure, loadImaginary, iSpecFirst, iSpecLast, nmrNormalization) {
filePath = JU.PT.trimQuotes (filePath);
this.isSimulation = (filePath != null && filePath.startsWith ("http://SIMULATION/"));
if (this.isSimulation) {
this.nmrMaxY = (Float.isNaN (nmrNormalization) ? 10000 : nmrNormalization);
}this.filePath = filePath;
this.obscure = obscure;
this.firstSpec = iSpecFirst;
this.lastSpec = iSpecLast;
this.loadImaginary = loadImaginary;
}, "~S,~B,~B,~N,~N,~N");
c$.createJDXSourceFromStream = Clazz_defineMethod (c$, "createJDXSourceFromStream", 
function ($in, obscure, loadImaginary, nmrMaxY) {
return JSV.source.JDXReader.createJDXSource ($in, "stream", obscure, loadImaginary, -1, -1, nmrMaxY);
}, "java.io.InputStream,~B,~B,~N");
c$.createJDXSource = Clazz_defineMethod (c$, "createJDXSource", 
function ($in, filePath, obscure, loadImaginary, iSpecFirst, iSpecLast, nmrMaxY) {
var data = null;
var br;
if (Clazz_instanceOf ($in, String) || JU.AU.isAB ($in)) {
if (Clazz_instanceOf ($in, String)) data = $in;
br = JSV.common.JSVFileManager.getBufferedReaderForStringOrBytes ($in);
} else if (Clazz_instanceOf ($in, java.io.InputStream)) {
br = JSV.common.JSVFileManager.getBufferedReaderForInputStream ($in);
} else {
br = $in;
}var header = null;
try {
if (br == null) br = JSV.common.JSVFileManager.getBufferedReaderFromName (filePath, "##TITLE");
br.mark (400);
var chs =  Clazz_newCharArray (400, '\0');
br.read (chs, 0, 400);
br.reset ();
header =  String.instantialize (chs);
var source = null;
var pt1 = header.indexOf ('#');
var pt2 = header.indexOf ('<');
if (pt1 < 0 || pt2 >= 0 && pt2 < pt1) {
var xmlType = header.toLowerCase ();
xmlType = (xmlType.contains ("<animl") || xmlType.contains ("<!doctype technique") ? "AnIML" : xmlType.contains ("xml-cml") ? "CML" : null);
if (xmlType != null) source = (JSV.common.JSViewer.getInterface ("JSV.source." + xmlType + "Reader")).getSource (filePath, br);
br.close ();
if (source == null) {
JU.Logger.error (header + "...");
throw  new JSV.exception.JSVException ("File type not recognized");
}} else {
source = ( new JSV.source.JDXReader (filePath, obscure, loadImaginary, iSpecFirst, iSpecLast, nmrMaxY)).getJDXSource (br);
}if (data != null) source.setInlineData (data);
return source;
} catch (e) {
if (Clazz_exceptionOf (e, Exception)) {
if (br != null) br.close ();
if (header != null) JU.Logger.error (header + "...");
var s = e.getMessage ();
{
}throw  new JSV.exception.JSVException ("Error reading data: " + s);
} else {
throw e;
}
}
}, "~O,~S,~B,~B,~N,~N,~N");
Clazz_defineMethod (c$, "getJDXSource", 
 function (reader) {
this.source =  new JSV.source.JDXSource (0, this.filePath);
this.isZipFile = (Clazz_instanceOf (reader, JSV.api.JSVZipReader));
this.t =  new JSV.source.JDXSourceStreamTokenizer (reader);
this.errorLog =  new JU.SB ();
var label = null;
var value = null;
var isOK = false;
while (!this.done && "##TITLE".equals (this.t.peakLabel ())) {
isOK = true;
if (label != null && !this.isZipFile) this.errorLog.append ("Warning - file is a concatenation without LINK record -- does not conform to IUPAC standards!\n");
var spectrum =  new JSV.common.Spectrum ();
var dataLDRTable =  new JU.Lst ();
while (!this.done && (label = this.t.getLabel ()) != null && (value = this.getValue (label)) != null) {
if (this.isTabularData) {
this.setTabularDataType (spectrum, label);
if (!this.processTabularData (spectrum, dataLDRTable)) throw  new JSV.exception.JSVException ("Unable to read JDX file");
this.addSpectrum (spectrum, false);
if (this.isSimulation && spectrum.getXUnits ().equals ("PPM")) spectrum.setHZtoPPM (true);
spectrum = null;
continue;
}if (label.equals ("##DATATYPE") && value.toUpperCase ().equals ("LINK")) {
this.getBlockSpectra (dataLDRTable);
spectrum = null;
continue;
}if (label.equals ("##NTUPLES") || label.equals ("##VARNAME")) {
this.getNTupleSpectra (dataLDRTable, spectrum, label);
spectrum = null;
continue;
}if (label.equals ("##JCAMPDX")) {
this.setVenderSpecificValues (this.t.rawLine);
}if (spectrum == null) spectrum =  new JSV.common.Spectrum ();
if (this.readDataLabel (spectrum, label, value, this.errorLog, this.obscure)) continue;
JSV.source.JDXReader.addHeader (dataLDRTable, this.t.rawLabel, value);
if (this.checkCustomTags (spectrum, label, value)) continue;
}
}
if (!isOK) throw  new JSV.exception.JSVException ("##TITLE record not found");
this.source.setErrorLog (this.errorLog.toString ());
return this.source;
}, "~O");
Clazz_defineMethod (c$, "setVenderSpecificValues", 
 function (rawLine) {
if (rawLine.indexOf ("JEOL") >= 0) {
System.out.println ("Skipping ##SHIFTREFERENCE for JEOL " + rawLine);
this.ignoreShiftReference = true;
}}, "~S");
Clazz_defineMethod (c$, "getValue", 
 function (label) {
var value = (this.isTabularDataLabel (label) ? "" : this.t.getValue ());
return ("##END".equals (label) ? null : value);
}, "~S");
Clazz_defineMethod (c$, "isTabularDataLabel", 
 function (label) {
return (this.isTabularData = ("##DATATABLE##PEAKTABLE##XYDATA##XYPOINTS#".indexOf (label + "#") >= 0));
}, "~S");
Clazz_defineMethod (c$, "addSpectrum", 
 function (spectrum, forceSub) {
if (!this.loadImaginary && spectrum.isImaginary ()) {
JU.Logger.info ("FileReader skipping imaginary spectrum -- use LOADIMAGINARY TRUE to load this spectrum.");
return true;
}if (this.acdAssignments != null) {
if (!spectrum.dataType.equals ("MASS SPECTRUM") && !spectrum.isContinuous ()) {
JU.Logger.info ("Skipping ACD Labs line spectrum for " + spectrum);
return true;
}if (this.acdAssignments.size () > 0) {
try {
this.mpr.setACDAssignments (spectrum.title, spectrum.getTypeLabel (), this.source.peakCount, this.acdAssignments, this.acdMolFile);
} catch (e) {
if (Clazz_exceptionOf (e, Exception)) {
JU.Logger.info ("Failed to create peak data: " + e);
} else {
throw e;
}
}
}if (this.acdMolFile != null) JSV.common.JSVFileManager.cachePut ("mol", this.acdMolFile);
}if (!Float.isNaN (this.nmrMaxY)) spectrum.doNormalize (this.nmrMaxY);
 else if (spectrum.getMaxY () >= 10000) spectrum.doNormalize (1000);
if (this.isSimulation) spectrum.setSimulated (this.filePath);
this.nSpec++;
if (this.firstSpec > 0 && this.nSpec < this.firstSpec) return true;
if (this.lastSpec > 0 && this.nSpec > this.lastSpec) return !(this.done = true);
spectrum.setBlockID (this.blockID);
this.source.addJDXSpectrum (null, spectrum, forceSub);
return true;
}, "JSV.common.Spectrum,~B");
Clazz_defineMethod (c$, "getBlockSpectra", 
 function (sourceLDRTable) {
JU.Logger.debug ("--JDX block start--");
var label = "";
var value = null;
var isNew = (this.source.type == 0);
var forceSub = false;
while ((label = this.t.getLabel ()) != null && !label.equals ("##TITLE")) {
value = this.getValue (label);
if (isNew && !JSV.source.JDXReader.readHeaderLabel (this.source, label, value, this.errorLog, this.obscure)) JSV.source.JDXReader.addHeader (sourceLDRTable, this.t.rawLabel, value);
if (label.equals ("##BLOCKS")) {
var nBlocks = JU.PT.parseInt (value);
if (nBlocks > 100 && this.firstSpec <= 0) forceSub = true;
}}
value = this.getValue (label);
if (!"##TITLE".equals (label)) throw  new JSV.exception.JSVException ("Unable to read block source");
if (isNew) this.source.setHeaderTable (sourceLDRTable);
this.source.type = 1;
this.source.isCompoundSource = true;
var dataLDRTable;
var spectrum =  new JSV.common.Spectrum ();
dataLDRTable =  new JU.Lst ();
this.readDataLabel (spectrum, label, value, this.errorLog, this.obscure);
try {
var tmp;
while ((tmp = this.t.getLabel ()) != null) {
if ((value = this.getValue (tmp)) == null && "##END".equals (label)) {
JU.Logger.debug ("##END= " + this.t.getValue ());
break;
}label = tmp;
if (this.isTabularData) {
this.setTabularDataType (spectrum, label);
if (!this.processTabularData (spectrum, dataLDRTable)) throw  new JSV.exception.JSVException ("Unable to read Block Source");
continue;
}if (label.equals ("##DATATYPE") && value.toUpperCase ().equals ("LINK")) {
this.getBlockSpectra (dataLDRTable);
spectrum = null;
label = null;
} else if (label.equals ("##NTUPLES") || label.equals ("##VARNAME")) {
this.getNTupleSpectra (dataLDRTable, spectrum, label);
spectrum = null;
label = "";
}if (this.done) break;
if (spectrum == null) {
spectrum =  new JSV.common.Spectrum ();
dataLDRTable =  new JU.Lst ();
if (label === "") continue;
if (label == null) {
label = "##END";
continue;
}}if (value == null) {
if (spectrum.getXYCoords ().length > 0 && !this.addSpectrum (spectrum, forceSub)) return this.source;
spectrum =  new JSV.common.Spectrum ();
dataLDRTable =  new JU.Lst ();
continue;
}if (this.readDataLabel (spectrum, label, value, this.errorLog, this.obscure)) continue;
JSV.source.JDXReader.addHeader (dataLDRTable, this.t.rawLabel, value);
if (this.checkCustomTags (spectrum, label, value)) continue;
}
} catch (e) {
if (Clazz_exceptionOf (e, Exception)) {
throw  new JSV.exception.JSVException (e.getMessage ());
} else {
throw e;
}
}
this.addErrorLogSeparator ();
this.source.setErrorLog (this.errorLog.toString ());
JU.Logger.debug ("--JDX block end--");
return this.source;
}, "JU.Lst");
Clazz_defineMethod (c$, "addErrorLogSeparator", 
 function () {
if (this.errorLog.length () > 0 && this.errorLog.lastIndexOf ("=====================\n") != this.errorLog.length () - "=====================\n".length) this.errorLog.append ("=====================\n");
});
Clazz_defineMethod (c$, "getNTupleSpectra", 
 function (sourceLDRTable, spectrum0, label) {
var minMaxY =  Clazz_newDoubleArray (-1, [1.7976931348623157E308, 4.9E-324]);
this.blockID = Math.random ();
var isOK = true;
if (this.firstSpec > 0) spectrum0.numDim = 1;
var isVARNAME = label.equals ("##VARNAME");
if (!isVARNAME) {
label = "";
}var nTupleTable =  new java.util.Hashtable ();
var plotSymbols =  new Array (2);
var isNew = (this.source.type == 0);
if (isNew) {
this.source.type = 2;
this.source.isCompoundSource = true;
this.source.setHeaderTable (sourceLDRTable);
}while (!(label = (isVARNAME ? label : this.t.getLabel ())).equals ("##PAGE")) {
isVARNAME = false;
var st =  new java.util.StringTokenizer (this.t.getValue (), ",");
var attrList =  new JU.Lst ();
while (st.hasMoreTokens ()) attrList.addLast (st.nextToken ().trim ());

nTupleTable.put (label, attrList);
}
var symbols = nTupleTable.get ("##SYMBOL");
if (!label.equals ("##PAGE")) throw  new JSV.exception.JSVException ("Error Reading NTuple Source");
var page = this.t.getValue ();
var spectrum = null;
var isFirst = true;
while (!this.done) {
if ((label = this.t.getLabel ()).equals ("##ENDNTUPLES")) {
this.t.getValue ();
break;
}if (label.equals ("##PAGE")) {
page = this.t.getValue ();
continue;
}if (spectrum == null) {
spectrum =  new JSV.common.Spectrum ();
spectrum0.copyTo (spectrum);
spectrum.setTitle (spectrum0.getTitle ());
if (!spectrum.is1D ()) {
var pt = page.indexOf ('=');
if (pt >= 0) try {
spectrum.setY2D (Double.parseDouble (page.substring (pt + 1).trim ()));
var y2dUnits = page.substring (0, pt).trim ();
var i = symbols.indexOf (y2dUnits);
if (i >= 0) spectrum.setY2DUnits (nTupleTable.get ("##UNITS").get (i));
} catch (e) {
if (Clazz_exceptionOf (e, Exception)) {
} else {
throw e;
}
}
}}var dataLDRTable =  new JU.Lst ();
spectrum.setHeaderTable (dataLDRTable);
while (!label.equals ("##DATATABLE")) {
JSV.source.JDXReader.addHeader (dataLDRTable, this.t.rawLabel, this.t.getValue ());
label = this.t.getLabel ();
}
var continuous = true;
var line = this.t.flushLine ();
if (line.trim ().indexOf ("PEAKS") > 0) continuous = false;
var index1 = line.indexOf ('(');
var index2 = line.lastIndexOf (')');
if (index1 == -1 || index2 == -1) throw  new JSV.exception.JSVException ("Variable List not Found");
var varList = line.substring (index1, index2 + 1);
var countSyms = 0;
for (var i = 0; i < symbols.size (); i++) {
var sym = symbols.get (i).trim ();
if (varList.indexOf (sym) != -1) {
plotSymbols[countSyms++] = sym;
}if (countSyms == 2) break;
}
this.setTabularDataType (spectrum, "##" + (continuous ? "XYDATA" : "PEAKTABLE"));
if (!this.readNTUPLECoords (spectrum, nTupleTable, plotSymbols, minMaxY)) throw  new JSV.exception.JSVException ("Unable to read Ntuple Source");
if (!spectrum.nucleusX.equals ("?")) spectrum0.nucleusX = spectrum.nucleusX;
spectrum0.nucleusY = spectrum.nucleusY;
spectrum0.freq2dX = spectrum.freq2dX;
spectrum0.freq2dY = spectrum.freq2dY;
spectrum0.y2DUnits = spectrum.y2DUnits;
for (var i = 0; i < sourceLDRTable.size (); i++) {
var entry = sourceLDRTable.get (i);
var key = JSV.source.JDXSourceStreamTokenizer.cleanLabel (entry[0]);
if (!key.equals ("##TITLE") && !key.equals ("##DATACLASS") && !key.equals ("##NTUPLES")) dataLDRTable.addLast (entry);
}
if (isOK) this.addSpectrum (spectrum, !isFirst);
isFirst = false;
spectrum = null;
}
this.addErrorLogSeparator ();
this.source.setErrorLog (this.errorLog.toString ());
JU.Logger.info ("NTUPLE MIN/MAX Y = " + minMaxY[0] + " " + minMaxY[1]);
return this.source;
}, "JU.Lst,JSV.source.JDXDataObject,~S");
Clazz_defineMethod (c$, "readDataLabel", 
 function (spectrum, label, value, errorLog, obscure) {
if (JSV.source.JDXReader.readHeaderLabel (spectrum, label, value, errorLog, obscure)) return true;
label += " ";
if (("##MINX ##MINY ##MAXX ##MAXY ##FIRSTY ##DELTAX ##DATACLASS ").indexOf (label) >= 0) return true;
switch (("##FIRSTX  ##LASTX   ##NPOINTS ##XFACTOR ##YFACTOR ##XUNITS  ##YUNITS  ##XLABEL  ##YLABEL  ##NUMDIM  ##OFFSET  ").indexOf (label)) {
case 0:
spectrum.fileFirstX = Double.parseDouble (value);
return true;
case 10:
spectrum.fileLastX = Double.parseDouble (value);
return true;
case 20:
spectrum.nPointsFile = Integer.parseInt (value);
return true;
case 30:
spectrum.xFactor = Double.parseDouble (value);
return true;
case 40:
spectrum.yFactor = Double.parseDouble (value);
return true;
case 50:
spectrum.setXUnits (value);
return true;
case 60:
spectrum.setYUnits (value);
return true;
case 70:
spectrum.setXLabel (value);
return false;
case 80:
spectrum.setYLabel (value);
return false;
case 90:
spectrum.numDim = Integer.parseInt (value);
return true;
case 100:
if (spectrum.shiftRefType != 0) {
if (spectrum.offset == 1.7976931348623157E308) spectrum.offset = Double.parseDouble (value);
spectrum.dataPointNum = 1;
spectrum.shiftRefType = 1;
}return false;
default:
if (label.length < 17) return false;
if (label.equals ("##.OBSERVEFREQUENCY ")) {
spectrum.observedFreq = Double.parseDouble (value);
return true;
}if (label.equals ("##.OBSERVENUCLEUS ")) {
spectrum.setObservedNucleus (value);
return true;
}if ((label.equals ("##$REFERENCEPOINT ")) && (spectrum.shiftRefType != 0)) {
spectrum.offset = Double.parseDouble (value);
spectrum.dataPointNum = 1;
spectrum.shiftRefType = 2;
return false;
}if (label.equals ("##.SHIFTREFERENCE ")) {
if (this.ignoreShiftReference || !(spectrum.dataType.toUpperCase ().contains ("SPECTRUM"))) return true;
value = JU.PT.replaceAllCharacters (value, ")(", "");
var srt =  new java.util.StringTokenizer (value, ",");
if (srt.countTokens () != 4) return true;
try {
srt.nextToken ();
srt.nextToken ();
spectrum.dataPointNum = Integer.parseInt (srt.nextToken ().trim ());
spectrum.offset = Double.parseDouble (srt.nextToken ().trim ());
} catch (e) {
if (Clazz_exceptionOf (e, Exception)) {
return true;
} else {
throw e;
}
}
if (spectrum.dataPointNum <= 0) spectrum.dataPointNum = 1;
spectrum.shiftRefType = 0;
return true;
}}
return false;
}, "JSV.source.JDXDataObject,~S,~S,JU.SB,~B");
c$.readHeaderLabel = Clazz_defineMethod (c$, "readHeaderLabel", 
 function (jdxHeader, label, value, errorLog, obscure) {
switch (("##TITLE#####JCAMPDX###ORIGIN####OWNER#####DATATYPE##LONGDATE##DATE######TIME####").indexOf (label + "#")) {
case 0:
jdxHeader.setTitle (obscure || value == null || value.equals ("") ? "Unknown" : value);
return true;
case 10:
jdxHeader.jcampdx = value;
var version = JU.PT.parseFloat (value);
if (version >= 6.0 || Float.isNaN (version)) {
if (errorLog != null) errorLog.append ("Warning: JCAMP-DX version may not be fully supported: " + value + "\n");
}return true;
case 20:
jdxHeader.origin = (value != null && !value.equals ("") ? value : "Unknown");
return true;
case 30:
jdxHeader.owner = (value != null && !value.equals ("") ? value : "Unknown");
return true;
case 40:
jdxHeader.dataType = value;
return true;
case 50:
jdxHeader.longDate = value;
return true;
case 60:
jdxHeader.date = value;
return true;
case 70:
jdxHeader.time = value;
return true;
}
return false;
}, "JSV.source.JDXHeader,~S,~S,JU.SB,~B");
Clazz_defineMethod (c$, "setTabularDataType", 
 function (spectrum, label) {
if (label.equals ("##PEAKASSIGNMENTS")) spectrum.setDataClass ("PEAKASSIGNMENTS");
 else if (label.equals ("##PEAKTABLE")) spectrum.setDataClass ("PEAKTABLE");
 else if (label.equals ("##XYDATA")) spectrum.setDataClass ("XYDATA");
 else if (label.equals ("##XYPOINTS")) spectrum.setDataClass ("XYPOINTS");
}, "JSV.source.JDXDataObject,~S");
Clazz_defineMethod (c$, "processTabularData", 
 function (spec, table) {
spec.setHeaderTable (table);
if (spec.dataClass.equals ("XYDATA")) {
spec.checkRequiredTokens ();
this.decompressData (spec, null);
return true;
}if (spec.dataClass.equals ("PEAKTABLE") || spec.dataClass.equals ("XYPOINTS")) {
spec.setContinuous (spec.dataClass.equals ("XYPOINTS"));
try {
this.t.readLineTrimmed ();
} catch (e) {
if (Clazz_exceptionOf (e, java.io.IOException)) {
} else {
throw e;
}
}
var xyCoords;
if (spec.xFactor != 1.7976931348623157E308 && spec.yFactor != 1.7976931348623157E308) xyCoords = JSV.common.Coordinate.parseDSV (this.t.getValue (), spec.xFactor, spec.yFactor);
 else xyCoords = JSV.common.Coordinate.parseDSV (this.t.getValue (), 1, 1);
spec.setXYCoords (xyCoords);
var fileDeltaX = JSV.common.Coordinate.deltaX (xyCoords[xyCoords.length - 1].getXVal (), xyCoords[0].getXVal (), xyCoords.length);
spec.setIncreasing (fileDeltaX > 0);
return true;
}return false;
}, "JSV.source.JDXDataObject,JU.Lst");
Clazz_defineMethod (c$, "readNTUPLECoords", 
 function (spec, nTupleTable, plotSymbols, minMaxY) {
var list;
if (spec.dataClass.equals ("XYDATA")) {
list = nTupleTable.get ("##SYMBOL");
var index1 = list.indexOf (plotSymbols[0]);
var index2 = list.indexOf (plotSymbols[1]);
list = nTupleTable.get ("##VARNAME");
spec.varName = list.get (index2).toUpperCase ();
list = nTupleTable.get ("##FACTOR");
spec.xFactor = Double.parseDouble (list.get (index1));
spec.yFactor = Double.parseDouble (list.get (index2));
list = nTupleTable.get ("##LAST");
spec.fileLastX = Double.parseDouble (list.get (index1));
list = nTupleTable.get ("##FIRST");
spec.fileFirstX = Double.parseDouble (list.get (index1));
list = nTupleTable.get ("##VARDIM");
spec.nPointsFile = Integer.parseInt (list.get (index1));
list = nTupleTable.get ("##UNITS");
spec.setXUnits (list.get (index1));
spec.setYUnits (list.get (index2));
if (spec.nucleusX == null && (list = nTupleTable.get ("##.NUCLEUS")) != null) {
spec.setNucleusAndFreq (list.get (0), false);
spec.setNucleusAndFreq (list.get (index1), true);
} else {
if (spec.nucleusX == null) spec.nucleusX = "?";
}this.decompressData (spec, minMaxY);
return true;
}if (spec.dataClass.equals ("PEAKTABLE") || spec.dataClass.equals ("XYPOINTS")) {
spec.setContinuous (spec.dataClass.equals ("XYPOINTS"));
list = nTupleTable.get ("##SYMBOL");
var index1 = list.indexOf (plotSymbols[0]);
var index2 = list.indexOf (plotSymbols[1]);
list = nTupleTable.get ("##UNITS");
spec.setXUnits (list.get (index1));
spec.setYUnits (list.get (index2));
spec.setXYCoords (JSV.common.Coordinate.parseDSV (this.t.getValue (), spec.xFactor, spec.yFactor));
return true;
}return false;
}, "JSV.source.JDXDataObject,java.util.Map,~A,~A");
Clazz_defineMethod (c$, "decompressData", 
 function (spec, minMaxY) {
var errPt = this.errorLog.length ();
var fileDeltaX = JSV.common.Coordinate.deltaX (spec.fileLastX, spec.fileFirstX, spec.nPointsFile);
spec.setIncreasing (fileDeltaX > 0);
spec.setContinuous (true);
var decompressor =  new JSV.source.JDXDecompressor (this.t, spec.fileFirstX, spec.xFactor, spec.yFactor, fileDeltaX, spec.nPointsFile);
var firstLastX =  Clazz_newDoubleArray (2, 0);
var t = System.currentTimeMillis ();
var xyCoords = decompressor.decompressData (this.errorLog, firstLastX);
if (JU.Logger.debugging) JU.Logger.debug ("decompression time = " + (System.currentTimeMillis () - t) + " ms");
spec.setXYCoords (xyCoords);
var d = decompressor.getMinY ();
if (minMaxY != null) {
if (d < minMaxY[0]) minMaxY[0] = d;
d = decompressor.getMaxY ();
if (d > minMaxY[1]) minMaxY[1] = d;
}var freq = (Double.isNaN (spec.freq2dX) ? spec.observedFreq : spec.freq2dX);
var isHz = freq != 1.7976931348623157E308 && spec.getXUnits ().toUpperCase ().equals ("HZ");
if (spec.offset != 1.7976931348623157E308 && freq != 1.7976931348623157E308 && spec.dataType.toUpperCase ().contains ("SPECTRUM") && spec.jcampdx.indexOf ("JEOL") < 0) {
JSV.common.Coordinate.applyShiftReference (xyCoords, spec.dataPointNum, spec.fileFirstX, spec.fileLastX, spec.offset, isHz ? freq : 1, spec.shiftRefType);
}if (isHz) {
JSV.common.Coordinate.applyScale (xyCoords, (1.0 / freq), 1);
spec.setXUnits ("PPM");
spec.setHZtoPPM (true);
}if (this.errorLog.length () != errPt) {
this.errorLog.append (spec.getTitle ()).append ("\n");
this.errorLog.append ("firstX: " + spec.fileFirstX + " Found " + firstLastX[0] + "\n");
this.errorLog.append ("lastX from Header " + spec.fileLastX + " Found " + firstLastX[1] + "\n");
this.errorLog.append ("deltaX from Header " + fileDeltaX + "\n");
this.errorLog.append ("Number of points in Header " + spec.nPointsFile + " Found " + xyCoords.length + "\n");
} else {
}if (JU.Logger.debugging) {
System.err.println (this.errorLog.toString ());
}}, "JSV.source.JDXDataObject,~A");
c$.addHeader = Clazz_defineMethod (c$, "addHeader", 
function (table, label, value) {
var entry;
for (var i = 0; i < table.size (); i++) if ((entry = table.get (i))[0].equals (label)) {
entry[1] = value;
return;
}
table.addLast ( Clazz_newArray (-1, [label, value, JSV.source.JDXSourceStreamTokenizer.cleanLabel (label)]));
}, "JU.Lst,~S,~S");
Clazz_defineMethod (c$, "checkCustomTags", 
 function (spectrum, label, value) {
if (label.length > 10) label = label.substring (0, 10);
if (spectrum == null) System.out.println (label);
 else this.modelSpectrum = spectrum;
var pt = "##$MODELS ##$PEAKS  ##$SIGNALS##$MOLFILE##PEAKASSI##$UVIRASS##$MSFRAGM".indexOf (label);
if (pt < 0) return false;
this.getMpr ().set (this, this.filePath, null);
try {
this.reader =  new java.io.BufferedReader ( new java.io.StringReader (value));
switch (pt) {
case 0:
this.mpr.readModels ();
break;
case 10:
case 20:
this.peakData =  new JU.Lst ();
this.source.peakCount += this.mpr.readPeaks (pt == 20, this.source.peakCount);
break;
case 30:
this.acdAssignments =  new JU.Lst ();
this.acdMolFile = JU.PT.rep (value, "$$ Empty String", "");
break;
case 40:
case 50:
case 60:
this.acdAssignments = this.mpr.readACDAssignments (spectrum.nPointsFile, pt == 40);
break;
}
} catch (e) {
if (Clazz_exceptionOf (e, Exception)) {
throw  new JSV.exception.JSVException (e.getMessage ());
} else {
throw e;
}
} finally {
this.reader = null;
}
return true;
}, "JSV.common.Spectrum,~S,~S");
Clazz_defineMethod (c$, "getMpr", 
 function () {
return (this.mpr == null ? this.mpr = JSV.common.JSViewer.getInterface ("J.jsv.JDXMOLParser") : this.mpr);
});
Clazz_overrideMethod (c$, "rd", 
function () {
return this.reader.readLine ();
});
Clazz_overrideMethod (c$, "setSpectrumPeaks", 
function (nH, piUnitsX, piUnitsY) {
this.modelSpectrum.setPeakList (this.peakData, piUnitsX, piUnitsY);
if (this.modelSpectrum.isNMR ()) this.modelSpectrum.setNHydrogens (nH);
}, "~N,~S,~S");
Clazz_overrideMethod (c$, "addPeakData", 
function (info) {
if (this.peakData == null) this.peakData =  new JU.Lst ();
this.peakData.addLast ( new JSV.common.PeakInfo (info));
}, "~S");
Clazz_overrideMethod (c$, "processModelData", 
function (id, data, type, base, last, modelScale, vibScale, isFirst) {
}, "~S,~S,~S,~S,~S,~N,~N,~B");
Clazz_overrideMethod (c$, "discardLinesUntilContains", 
function (containsMatch) {
var line;
while ((line = this.rd ()) != null && line.indexOf (containsMatch) < 0) {
}
return line;
}, "~S");
Clazz_overrideMethod (c$, "discardLinesUntilContains2", 
function (s1, s2) {
var line;
while ((line = this.rd ()) != null && line.indexOf (s1) < 0 && line.indexOf (s2) < 0) {
}
return line;
}, "~S,~S");
Clazz_overrideMethod (c$, "discardLinesUntilNonBlank", 
function () {
var line;
while ((line = this.rd ()) != null && line.trim ().length == 0) {
}
return line;
});
Clazz_defineStatics (c$,
"VAR_LIST_TABLE",  Clazz_newArray (-1, ["PEAKTABLE   XYDATA      XYPOINTS", " (XY..XY)    (X++(Y..Y)) (XY..XY)    "]),
"ERROR_SEPARATOR", "=====================\n");
});
Clazz_declarePackage ("JSV.source");
Clazz_load (["JSV.source.JDXHeader"], "JSV.source.JDXSource", ["JU.Lst"], function () {
c$ = Clazz_decorateAsClass (function () {
this.type = 0;
this.isCompoundSource = false;
this.jdxSpectra = null;
this.errors = "";
this.filePath = null;
this.peakCount = 0;
this.isView = false;
this.inlineData = null;
Clazz_instantialize (this, arguments);
}, JSV.source, "JDXSource", JSV.source.JDXHeader);
Clazz_defineMethod (c$, "dispose", 
function () {
this.headerTable = null;
this.jdxSpectra = null;
});
Clazz_makeConstructor (c$, 
function (type, filePath) {
Clazz_superConstructor (this, JSV.source.JDXSource, []);
this.type = type;
this.setFilePath (filePath);
this.headerTable =  new JU.Lst ();
this.jdxSpectra =  new JU.Lst ();
this.isCompoundSource = (type != 0);
}, "~N,~S");
Clazz_defineMethod (c$, "getJDXSpectrum", 
function (index) {
return (this.jdxSpectra.size () <= index ? null : this.jdxSpectra.get (index));
}, "~N");
Clazz_defineMethod (c$, "addJDXSpectrum", 
function (filePath, spectrum, forceSub) {
if (filePath == null) filePath = this.filePath;
spectrum.setFilePath (filePath);
if (this.inlineData != null) spectrum.setInlineData (this.inlineData);
var n = this.jdxSpectra.size ();
if (n == 0 || !this.jdxSpectra.get (n - 1).addSubSpectrum (spectrum, forceSub)) this.jdxSpectra.addLast (spectrum);
}, "~S,JSV.common.Spectrum,~B");
Clazz_defineMethod (c$, "getNumberOfSpectra", 
function () {
return this.jdxSpectra.size ();
});
Clazz_defineMethod (c$, "getSpectra", 
function () {
return this.jdxSpectra;
});
Clazz_defineMethod (c$, "getSpectraAsArray", 
function () {
return (this.jdxSpectra == null ? null : this.jdxSpectra.toArray ());
});
Clazz_defineMethod (c$, "getErrorLog", 
function () {
return this.errors;
});
Clazz_defineMethod (c$, "setErrorLog", 
function (errors) {
this.errors = errors;
}, "~S");
Clazz_defineMethod (c$, "setFilePath", 
function (filePath) {
this.filePath = filePath;
}, "~S");
Clazz_defineMethod (c$, "getFilePath", 
function () {
return this.filePath;
});
c$.createView = Clazz_defineMethod (c$, "createView", 
function (specs) {
var source =  new JSV.source.JDXSource (-2, "view");
source.isView = true;
for (var i = 0; i < specs.size (); i++) source.addJDXSpectrum (specs.get (i).getFilePath (), specs.get (i), false);

return source;
}, "JU.Lst");
Clazz_defineMethod (c$, "getHeaderRowDataAsArray", 
function (addDataClass, rowData) {
if (rowData == null) rowData =  Clazz_newArray (0, 0, null);
var data = this.getHeaderRowDataAsArray (addDataClass, rowData.length);
for (var i = rowData.length; --i >= 0; ) data[data.length - rowData.length + i] = rowData[i];

return data;
}, "~B,~A");
Clazz_defineMethod (c$, "setID", 
function (id) {
this.jdxSpectra.get (0).sourceID = id;
}, "~S");
Clazz_defineMethod (c$, "matchesFilePath", 
function (filePath) {
return this.filePath.equals (filePath) || this.filePath.$replace ('\\', '/').equals (filePath);
}, "~S");
Clazz_defineMethod (c$, "setInlineData", 
function (data) {
this.inlineData = data;
if (this.jdxSpectra != null) for (var i = this.jdxSpectra.size (); --i >= 0; ) this.jdxSpectra.get (i).setInlineData (data);

}, "~S");
Clazz_defineStatics (c$,
"TYPE_VIEW", -2,
"TYPE_UNKNOWN", -1,
"TYPE_SIMPLE", 0,
"TYPE_BLOCK", 1,
"TYPE_NTUPLE", 2);
});
Clazz_declarePackage ("JSV.source");
Clazz_load (null, "JSV.source.JDXSourceStreamTokenizer", ["java.lang.Character", "JU.SB", "JU.Logger"], function () {
c$ = Clazz_decorateAsClass (function () {
this.br = null;
this.rawLabel = null;
this.value = null;
this.labelLineNo = 0;
this.line = null;
this.lineNo = 0;
this.rawLine = null;
Clazz_instantialize (this, arguments);
}, JSV.source, "JDXSourceStreamTokenizer");
Clazz_makeConstructor (c$, 
function (br) {
this.br = br;
}, "java.io.BufferedReader");
Clazz_defineMethod (c$, "peakLabel", 
function () {
return this.nextLabel (false);
});
Clazz_defineMethod (c$, "getLabel", 
function () {
return this.nextLabel (true);
});
Clazz_defineMethod (c$, "nextLabel", 
 function (isGet) {
this.rawLabel = null;
this.value = null;
while (this.line == null || this.line.length == 0) {
try {
this.readLine ();
if (this.line == null) {
this.line = "";
return null;
}this.line = this.line.trim ();
} catch (e) {
if (Clazz_exceptionOf (e, java.io.IOException)) {
this.line = "";
return null;
} else {
throw e;
}
}
if (this.line.startsWith ("##")) break;
this.line = null;
}
this.rawLine = this.line;
var pt = this.line.indexOf ("=");
if (pt < 0) {
if (isGet) JU.Logger.info ("BAD JDX LINE -- no '=' (line " + this.lineNo + "): " + this.line);
this.rawLabel = this.line;
if (!isGet) this.line = "";
} else {
this.rawLabel = this.line.substring (0, pt).trim ();
if (isGet) this.line = this.line.substring (pt + 1);
}this.labelLineNo = this.lineNo;
if (JU.Logger.debugging) JU.Logger.info (this.rawLabel);
return JSV.source.JDXSourceStreamTokenizer.cleanLabel (this.rawLabel);
}, "~B");
c$.cleanLabel = Clazz_defineMethod (c$, "cleanLabel", 
function (label) {
if (label == null) return null;
var i;
var str =  new JU.SB ();
for (i = 0; i < label.length; i++) {
switch (label.charAt (i)) {
case '/':
case '\\':
case ' ':
case '-':
case '_':
break;
default:
str.appendC (label.charAt (i));
break;
}
}
return str.toString ().toUpperCase ();
}, "~S");
Clazz_defineMethod (c$, "getValue", 
function () {
if (this.value != null) return this.value;
var sb =  new JU.SB ().append (this.line);
if (sb.length () > 0) sb.appendC ('\n');
try {
while (this.readLine () != null) {
if (this.line.indexOf ("##") >= 0 && this.line.trim ().startsWith ("##")) break;
sb.append (this.line).appendC ('\n');
}
} catch (e) {
if (Clazz_exceptionOf (e, java.io.IOException)) {
JU.Logger.info (e.toString ());
} else {
throw e;
}
}
this.value = (this.rawLabel.startsWith ("##$") ? sb.toString ().trim () : JSV.source.JDXSourceStreamTokenizer.trimLines (sb));
if (JU.Logger.debugging) JU.Logger.info (this.value);
return this.value;
});
Clazz_defineMethod (c$, "readLineTrimmed", 
function () {
this.readLine ();
if (this.line == null) return null;
if (this.line.indexOf ("$$") < 0) return this.line.trim ();
var sb =  new JU.SB ().append (this.line);
return JSV.source.JDXSourceStreamTokenizer.trimLines (sb);
});
Clazz_defineMethod (c$, "flushLine", 
function () {
var sb =  new JU.SB ().append (this.line);
this.line = null;
return JSV.source.JDXSourceStreamTokenizer.trimLines (sb);
});
Clazz_defineMethod (c$, "readLine", 
 function () {
this.line = this.br.readLine ();
this.lineNo++;
return this.line;
});
c$.trimLines = Clazz_defineMethod (c$, "trimLines", 
 function (v) {
var n = v.length ();
var ilast = n - 1;
var vpt = JSV.source.JDXSourceStreamTokenizer.ptNonWhite (v, 0, n);
if (vpt >= n) return "";
var buffer =  Clazz_newCharArray (n - vpt, '\0');
var pt = 0;
for (; vpt < n; vpt++) {
var ch;
switch (ch = v.charAt (vpt)) {
case '\r':
if (vpt < ilast && v.charAt (vpt + 1) == '\n') continue;
ch = '\n';
break;
case '\n':
if (pt > 0 && buffer[pt - 1] != '\n') pt -= vpt - JSV.source.JDXSourceStreamTokenizer.ptNonSpaceRev (v, vpt) - 1;
vpt = JSV.source.JDXSourceStreamTokenizer.ptNonSpace (v, ++vpt, n) - 1;
break;
case '$':
if (vpt < ilast && v.charAt (vpt + 1) == '$') {
vpt++;
while (++vpt < n && "\n\r".indexOf (v.charAt (vpt)) < 0) {
}
continue;
}break;
}
if (ch == '\n' && pt > 0 && buffer[pt - 1] == '\n') continue;
buffer[pt++] = ch;
}
if (pt > 0 && buffer[pt - 1] == '\n') --pt;
return ( String.instantialize (buffer)).substring (0, pt).trim ();
}, "JU.SB");
c$.ptNonWhite = Clazz_defineMethod (c$, "ptNonWhite", 
 function (v, pt, n) {
while (pt < n && Character.isWhitespace (v.charAt (pt))) pt++;

return pt;
}, "JU.SB,~N,~N");
c$.ptNonSpace = Clazz_defineMethod (c$, "ptNonSpace", 
 function (v, pt, n) {
while (pt < n && (v.charAt (pt) == ' ' || v.charAt (pt) == '\t')) pt++;

return pt;
}, "JU.SB,~N,~N");
c$.ptNonSpaceRev = Clazz_defineMethod (c$, "ptNonSpaceRev", 
 function (v, pt) {
while (--pt >= 0 && (v.charAt (pt) == ' ' || v.charAt (pt) == '\t')) {
}
return pt;
}, "JU.SB,~N");
});
Clazz_declarePackage ("JSV.tree");
Clazz_load (["JSV.api.JSVTree"], "JSV.tree.SimpleTree", ["JSV.common.JSVFileManager", "$.PanelNode", "JSV.tree.SimpleTreeModel", "$.SimpleTreeNode", "$.SimpleTreePath"], function () {
c$ = Clazz_decorateAsClass (function () {
this.si = null;
this.rootNode = null;
this.spectraTreeModel = null;
this.vwr = null;
this.selectedPath = null;
Clazz_instantialize (this, arguments);
}, JSV.tree, "SimpleTree", null, JSV.api.JSVTree);
Clazz_overrideMethod (c$, "getRootNode", 
function () {
return this.rootNode;
});
Clazz_makeConstructor (c$, 
function (viewer) {
this.vwr = viewer;
this.rootNode =  new JSV.tree.SimpleTreeNode ("Spectra", null);
this.spectraTreeModel =  new JSV.tree.SimpleTreeModel (this.rootNode);
}, "JSV.common.JSViewer");
Clazz_defineMethod (c$, "valueChanged", 
function () {
this.vwr.selectedTreeNode (this.getLastSelectedPathComponent ());
});
Clazz_defineMethod (c$, "getLastSelectedPathComponent", 
 function () {
return (this.selectedPath == null ? null : this.selectedPath.getLastPathComponent ());
});
Clazz_overrideMethod (c$, "setSelectedPanel", 
function (si, jsvp) {
if (jsvp != null) {
var treeNode = JSV.common.PanelNode.findNode (jsvp, this.vwr.panelNodes).treeNode;
this.setSelectionPath (this.vwr.spectraTree.newTreePath (treeNode.getPath ()));
}}, "JSV.api.ScriptInterface,JSV.api.JSVPanel");
Clazz_defineMethod (c$, "setSelectionPath", 
 function (newTreePath) {
this.selectedPath = newTreePath;
this.valueChanged ();
}, "JSV.api.JSVTreePath");
Clazz_overrideMethod (c$, "createTree", 
function (fileCount, source, panels) {
var tree = this.vwr.spectraTree;
var rootNode = tree.getRootNode ();
var panelNodes = this.vwr.panelNodes;
var fileName = JSV.common.JSVFileManager.getTagName (source.getFilePath ());
var panelNode =  new JSV.common.PanelNode (null, fileName, source, null);
var fileNode =  new JSV.tree.SimpleTreeNode (fileName, panelNode);
panelNode.setTreeNode (fileNode);
tree.spectraTreeModel.insertNodeInto (fileNode, rootNode, rootNode.getChildCount ());
for (var i = 0; i < panels.length; i++) {
var jsvp = panels[i];
var id = fileCount + "." + (i + 1);
panelNode =  new JSV.common.PanelNode (id, fileName, source, jsvp);
var treeNode =  new JSV.tree.SimpleTreeNode (panelNode.toString (), panelNode);
panelNode.setTreeNode (treeNode);
panelNodes.addLast (panelNode);
tree.spectraTreeModel.insertNodeInto (treeNode, fileNode, fileNode.getChildCount ());
}
this.vwr.selectFrameNode (panels[0]);
return fileNode;
}, "~N,JSV.source.JDXSource,~A");
Clazz_overrideMethod (c$, "setPath", 
function (path) {
this.setSelectionPath (path);
}, "JSV.api.JSVTreePath");
Clazz_defineMethod (c$, "newTreePath", 
function (path) {
return  new JSV.tree.SimpleTreePath (path);
}, "~A");
Clazz_overrideMethod (c$, "deleteNodes", 
function (toDelete) {
for (var i = 0; i < toDelete.size (); i++) {
this.spectraTreeModel.removeNodeFromParent (toDelete.get (i));
}
}, "JU.Lst");
});
Clazz_declarePackage ("JSV.tree");
Clazz_load (["java.util.Enumeration"], "JSV.tree.SimpleTreeEnumeration", null, function () {
c$ = Clazz_decorateAsClass (function () {
this.node = null;
this.pt = 0;
Clazz_instantialize (this, arguments);
}, JSV.tree, "SimpleTreeEnumeration", null, java.util.Enumeration);
Clazz_makeConstructor (c$, 
function (jsTreeNode) {
this.node = jsTreeNode;
}, "JSV.tree.SimpleTreeNode");
Clazz_overrideMethod (c$, "hasMoreElements", 
function () {
return (this.pt < this.node.$children.size ());
});
Clazz_overrideMethod (c$, "nextElement", 
function () {
return this.node.$children.get (this.pt++);
});
});
Clazz_declarePackage ("JSV.tree");
c$ = Clazz_decorateAsClass (function () {
this.rootNode = null;
Clazz_instantialize (this, arguments);
}, JSV.tree, "SimpleTreeModel");
Clazz_makeConstructor (c$, 
function (rootNode) {
this.rootNode = rootNode;
}, "JSV.api.JSVTreeNode");
Clazz_defineMethod (c$, "insertNodeInto", 
function (fileNode, rootNode, i) {
var node = rootNode;
node.$children.add (i, fileNode);
(fileNode).prevNode = node;
}, "JSV.api.JSVTreeNode,JSV.api.JSVTreeNode,~N");
Clazz_defineMethod (c$, "removeNodeFromParent", 
function (node) {
(node).prevNode.$children.removeObj (node);
}, "JSV.api.JSVTreeNode");
Clazz_declarePackage ("JSV.tree");
Clazz_load (["JSV.api.JSVTreeNode"], "JSV.tree.SimpleTreeNode", ["JU.Lst", "JSV.tree.SimpleTreeEnumeration"], function () {
c$ = Clazz_decorateAsClass (function () {
this.panelNode = null;
this.index = 0;
this.prevNode = null;
this.$children = null;
this.text = null;
Clazz_instantialize (this, arguments);
}, JSV.tree, "SimpleTreeNode", null, JSV.api.JSVTreeNode);
Clazz_makeConstructor (c$, 
function (text, panelNode) {
this.text = text;
this.panelNode = panelNode;
this.$children =  new JU.Lst ();
}, "~S,JSV.common.PanelNode");
Clazz_overrideMethod (c$, "getPanelNode", 
function () {
return this.panelNode;
});
Clazz_overrideMethod (c$, "getIndex", 
function () {
return this.index;
});
Clazz_overrideMethod (c$, "setIndex", 
function (index) {
this.index = index;
}, "~N");
Clazz_overrideMethod (c$, "children", 
function () {
return  new JSV.tree.SimpleTreeEnumeration (this);
});
Clazz_overrideMethod (c$, "getChildCount", 
function () {
return this.$children.size ();
});
Clazz_overrideMethod (c$, "getPath", 
function () {
var o =  new JU.Lst ();
var node = this;
o.addLast (node);
while ((node = node.prevNode) != null) o.add (0, node);

return o.toArray ();
});
Clazz_overrideMethod (c$, "isLeaf", 
function () {
return (this.prevNode != null && this.prevNode.prevNode != null);
});
Clazz_overrideMethod (c$, "toString", 
function () {
return this.text;
});
});
Clazz_declarePackage ("JSV.tree");
Clazz_load (["JSV.api.JSVTreePath"], "JSV.tree.SimpleTreePath", null, function () {
c$ = Clazz_decorateAsClass (function () {
this.path = null;
Clazz_instantialize (this, arguments);
}, JSV.tree, "SimpleTreePath", null, JSV.api.JSVTreePath);
Clazz_makeConstructor (c$, 
function (path) {
this.path = path;
}, "~A");
Clazz_overrideMethod (c$, "getLastPathComponent", 
function () {
return (this.path == null || this.path.length == 0 ? null : this.path[this.path.length - 1]);
});
});

})();

Clazz._coreLoaded = true;



})(Clazz
,Clazz.getClassName
,Clazz.newLongArray
,Clazz.doubleToByte
,Clazz.doubleToInt
,Clazz.doubleToLong
,Clazz.declarePackage
,Clazz.instanceOf
,Clazz.load
,Clazz.instantialize
,Clazz.decorateAsClass
,Clazz.floatToInt
,Clazz.floatToLong
,Clazz.makeConstructor
,Clazz.defineEnumConstant
,Clazz.exceptionOf
,Clazz.newIntArray
,Clazz.defineStatics
,Clazz.newFloatArray
,Clazz.declareType
,Clazz.prepareFields
,Clazz.superConstructor
,Clazz.newByteArray
,Clazz.declareInterface
,Clazz.p0p
,Clazz.pu$h
,Clazz.newShortArray
,Clazz.innerTypeInstance
,Clazz.isClassDefined
,Clazz.prepareCallback
,Clazz.newArray
,Clazz.castNullAs
,Clazz.floatToShort
,Clazz.superCall
,Clazz.decorateAsType
,Clazz.newBooleanArray
,Clazz.newCharArray
,Clazz.implementOf
,Clazz.newDoubleArray
,Clazz.overrideConstructor
,Clazz.clone
,Clazz.doubleToShort
,Clazz.getInheritedLevel
,Clazz.getParamsType
,Clazz.isAF
,Clazz.isAB
,Clazz.isAI
,Clazz.isAS
,Clazz.isASS
,Clazz.isAP
,Clazz.isAFloat
,Clazz.isAII
,Clazz.isAFF
,Clazz.isAFFF
,Clazz.tryToSearchAndExecute
,Clazz.getStackTrace
,Clazz.inheritArgs
,Clazz.alert
,Clazz.defineMethod
,Clazz.overrideMethod
,Clazz.declareAnonymous
//,Clazz.checkPrivateMethod
,Clazz.cloneFinals
);
