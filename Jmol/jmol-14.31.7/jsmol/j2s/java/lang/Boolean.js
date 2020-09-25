Clazz.load (["java.lang.Comparable", "java.io.Serializable"], "java.lang.Boolean", null, function () {
java.lang.Boolean = Boolean;
if (Clazz.supportsNativeObject) {
	for (var i = 0; i < Clazz.extendedObjectMethods.length; i++) {
		var p = Clazz.extendedObjectMethods[i];
		Boolean.prototype[p] = Clazz._O.prototype[p];
	}
}
Boolean.__CLASS_NAME__ = "Boolean";
Clazz.implementOf (Boolean, [java.io.Serializable, java.lang.Comparable]);
Boolean.equals = Clazz.innerFunctions.equals;
Boolean.getName = Clazz.innerFunctions.getName;
Boolean.serialVersionUID = Boolean.prototype.serialVersionUID = -3665804199014368530;

Clazz.makeConstructor (Boolean, 
function (value) {
this.valueOf = function () {
	return value;
};
}, "~B");
Clazz.makeConstructor (Boolean, 
function (s) {
this.valueOf = function () {
	return Boolean.toBoolean (s);
};
}, "~S");
Boolean.parseBoolean = Clazz.defineMethod (Boolean, "parseBoolean", 
function (s) {
return Boolean.toBoolean (s);
}, "~S");
Clazz.defineMethod (Boolean, "booleanValue", 
function () {
return this.value;
});
Boolean.$valueOf = Clazz.defineMethod (Boolean, "$valueOf", 
function (b) {
return (b ? Boolean.TRUE : Boolean.FALSE);
}, "~B");
Boolean.$valueOf = Clazz.defineMethod (Boolean, "$valueOf", 
function (s) {
return Boolean.toBoolean (s) ? Boolean.TRUE : Boolean.FALSE;
}, "~S");
Boolean.toString = Clazz.defineMethod (Boolean, "toString", 
function (b) {
return b ? "true" : "false";
}, "~B");
Clazz.defineMethod (Boolean, "toString", 
function () {
return this.valueOf () ? "true" : "false";
});
Clazz.overrideMethod(Boolean, "hashCode", 
function () {
return this.valueOf () ? 1231 : 1237;
});
Clazz.overrideMethod(Boolean, "equals", 
function (obj) {
if (Clazz.instanceOf (obj, Boolean)) {
return this.value == (obj).booleanValue ();
}return false;
}, "~O");
Boolean.getBoolean = Clazz.defineMethod (Boolean, "getBoolean", 
function (name) {
var result = false;
try {
result = Boolean.toBoolean (System.getProperty (name));
} catch (e) {
if (Clazz.instanceOf (e, IllegalArgumentException)) {
} else if (Clazz.instanceOf (e, NullPointerException)) {
} else {
throw e;
}
}
return result;
}, "~S");
Clazz.overrideMethod(Boolean, "compareTo", 
function (b) {
return (b.value == this.value ? 0 : (this.value ? 1 : -1));
}, "Boolean");
Boolean.toBoolean = Clazz.defineMethod (Boolean, "toBoolean", 
 function (name) {
return ((name != null) && name.equalsIgnoreCase ("true"));
}, "~S");
Boolean.TRUE = Boolean.prototype.TRUE = new Boolean (true);
Boolean.FALSE = Boolean.prototype.FALSE = new Boolean (false);
Boolean.TYPE = Boolean.prototype.TYPE = Boolean;
});
