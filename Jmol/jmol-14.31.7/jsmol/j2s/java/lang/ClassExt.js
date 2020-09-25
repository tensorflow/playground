/******************************************************************************
 * Copyright (c) 2007 java2script.org and others.
 * All rights reserved. This program and the accompanying materials
 * are made available under the terms of the Eclipse Public License v1.0
 * which accompanies this distribution, and is available at
 * http://www.eclipse.org/legal/epl-v10.html
 *
 * Contributors:
 *     Zhou Renjian - initial API and implementation
 *****************************************************************************/
/*******
 * @author zhou renjian
 * @create March 10, 2006
 *******/

if (window["Clazz"] == null || window["Clazz"].unloadClass == null) {
/**
 * Once ClassExt.js is part of Class.js.
 * In order to make the Class.js as small as possible, part of its content
 * is moved into this ClassExt.js.
 *
 * See also http://j2s.sourceforge.net/j2sclazz/
 */
 
/**
 * Clazz.MethodNotFoundException is used to notify the developer about calling
 * methods with incorrect parameters.
 */
/* protected */
// Override the Clazz.MethodNotFoundException in Class.js to give details
Clazz.MethodNotFoundException = function (obj, clazz, method, params) {
	var paramStr = "";
	if (params != null) {
		paramStr = params.substring (1).replace (/\\/g, ",");
	}
	var leadingStr = "";
	if (method != null && method != "construct") {
		leadingStr = "Method";
	} else {
		leadingStr = "Constructor";
	}
	this.message = leadingStr + " " + Clazz.getClassName (clazz, true) + "." 
					+ method + "(" + paramStr + ") is not found!";
	this.toString = function () {
		return "MethodNotFoundException:" + this.message;
	}
};

/**
 * Prepare callback for instance of anonymous Class.
 * For example for the callback:
 *     this.callbacks.MyEditor.sayHello();
 *
 * @param objThis the host object for callback
 * @param args arguments object. args[0] will be classThisObj -- the "this"
 * object to be hooked
 * 
 * Attention: parameters should not be null!
 */
/* protected */
Clazz.prepareCallback = function (objThis, args) {
	var classThisObj = args[0];
	var cbName = "b$"; // "callbacks";
	if (objThis != null && classThisObj != null && classThisObj !== window) {
		var obs = new Array ();
		if (objThis[cbName] == null) {
			objThis[cbName] = obs;
		} else { // must make a copy!
			for (var s in objThis[cbName]) {
				if (s != "length") {
					obs[s] = objThis[cbName][s];
				}
			}
			objThis[cbName] = obs;
		}
		var className = Clazz.getClassName (classThisObj, true);
		//if (obs[className] == null) { /* == null make no sense! */
			//obs[className] = classThisObj;
			/*
			 * TODO: the following line is SWT-specific! Try to move it out!
			 */
			obs[className.replace (/org\.eclipse\.swt\./, "$wt.")] = classThisObj;
			var clazz = Clazz.getClass (classThisObj);
			while (clazz.superClazz != null) {
				clazz = clazz.superClazz;
				//obs[Clazz.getClassName (clazz)] = classThisObj;
				/*
				 * TODO: the following line is SWT-specific! Try to move it out!
				 */
				obs[Clazz.getClassName (clazz, true)
						.replace (/org\.eclipse\.swt\./, "$wt.")] = classThisObj;
			}
		//}
		var cbs = classThisObj[cbName];
		if (cbs != null && cbs instanceof Array) {
			for (var s in cbs) {
				if (s != "length") {
					obs[s] = cbs[s];
				}
			}
		}
	}
	// Shift the arguments
	for (var i = 0; i < args.length - 1; i++) {
		args[i] = args[i + 1];
	}
	args.length--;
	// arguments will be returned!
};

/**
 * Construct instance of the given inner class.
 *
 * @param classInner given inner class, alway with name like "*$*"
 * @param objThis this instance which can be used to call back.
 * @param finalVars final variables which the inner class may use
 * @return the constructed object
 *
 * @see Clazz#cloneFinals
 */
/* public */
Clazz.innerTypeInstance = function (clazzInner, objThis, finalVars) {
	if (clazzInner == null) {
		clazzInner = arguments.callee.caller;
	}
	var obj = null;
	/*if (arguments.length == 2) {
		obj = new clazzInner (objThis);
	} else */if (arguments.length == 3) {
		obj = new clazzInner (objThis);
	} else if (arguments.length == 4) {
		if (objThis.__CLASS_NAME__ == clazzInner.__CLASS_NAME__
				&& arguments[3] === Clazz.inheritArgs) {
			obj = objThis;
		} else {
			obj = new clazzInner (objThis, arguments[3]);
		}
	} else if (arguments.length == 5) {
		obj = new clazzInner (objThis, arguments[3], arguments[4]);
	} else if (arguments.length == 6) {
		obj = new clazzInner (objThis, arguments[3], arguments[4], 
				arguments[5]);
	} else if (arguments.length == 7) {
		obj = new clazzInner (objThis, arguments[3], arguments[4], 
				arguments[5], arguments[6]);
	} else if (arguments.length == 8) {
		obj = new clazzInner (objThis, arguments[3], arguments[4], 
				arguments[5], arguments[6], arguments[7]);
	} else if (arguments.length == 9) {
		obj = new clazzInner (objThis, arguments[3], arguments[4], 
				arguments[5], arguments[6], arguments[7], arguments[8]);
	} else if (arguments.length == 10) {
		obj = new clazzInner (objThis, arguments[3], arguments[4], 
				arguments[5], arguments[6], arguments[7], arguments[8],
				arguments[9]);
	} else {
		/*
		 * Should construct instance manually.
		 */
		obj = new clazzInner ();
		if (obj.construct == null) {
			throw new String ("No support anonymous class constructor with " 
					+ "more than 7 parameters.");
		}
		var args = new Array ();
		for (var i = 3; i < arguments.length; i++) {
			args[i - 3] = arguments[i];
		}
		obj.construct.apply (obj, args);
	}
	// f$ is short for the once choosen "$finals"
	if (finalVars != null && objThis.f$ == null) {
		obj.f$ = finalVars;
	} else if (finalVars == null && objThis.f$ != null) {
		obj.f$ = objThis.f$;
	} else if (finalVars != null && objThis.f$ != null) {
		var o = new Object ();
		for (var attr in objThis.f$) {
			o[attr] = objThis.f$[attr];
		}
		for (var attr in finalVars) {
			o[attr] = finalVars[attr];
		}
		obj.f$ = o;
	}
	/*
	if (finalVars != null && objThis.$finals == null) {
		obj.$finals = finalVars;
	} else if (finalVars == null && objThis.$finals != null) {
		obj.$finals = objThis.$finals;
	} else if (finalVars != null && objThis.$finals != null) {
		var o = new Object ();
		for (var attr in objThis.$finals) {
			o[attr] = objThis.$finals[attr];
		}
		for (var attr in finalVars) {
			o[attr] = finalVars[attr];
		}
		obj.$finals = o;
	}
	*/
	//Clazz.prepareCallback (obj, objThis);
	return obj;
};

/**
 * Clone variables whose modifier is "final".
 * Usage: var o = Clazz.cloneFinals ("name", name, "age", age);
 *
 * @return Object with all final variables
 */
/* protected */
Clazz.cloneFinals = function () {
	var o = new Object ();
	var length = arguments.length / 2;
	for (var i = 0; i < length; i++) {
		o[arguments[i + i]] = arguments[i + i + 1];
	}
	return o;
};

/* public */
Clazz.isClassDefined = Clazz.isDefinedClass = function (clazzName) {
	if (clazzName != null && clazzName.length != 0) {
		if (Clazz.allClasses[clazzName]) {
			return true;
		}
		var pkgFrags = clazzName.split (/\./);
		var pkg = null;
		for (var i = 0; i < pkgFrags.length; i++) {
			if (pkg == null) {
				if (Clazz.allPackage[pkgFrags[0]] == null) {
					//error (clazzName + " / " + false);
					return false;
				}
				pkg = Clazz.allPackage[pkgFrags[0]];
			} else {
				if (pkg[pkgFrags[i]] == null) {
					//error (clazzName + " / " + false);
					return false;
				}
				pkg = pkg[pkgFrags[i]]
			}
		}
		//error (clazzName + " / " + (pkg != null));
		//return pkg != null;
		if (pkg != null) {
			Clazz.allClasses[clazzName] = true;
			return true;
		} else {
			return false;
		}
	} else {
		/* consider null or empty name as non-defined class */
		return false;
	}
};
/**
 * Define the enum constant.
 * @param classEnum enum type
 * @param enumName enum constant
 * @param enumOrdinal enum ordinal
 * @param initialParams enum constant constructor parameters
 * @return return defined enum constant
 */
/* public */
Clazz.defineEnumConstant = function (clazzEnum, enumName, enumOrdinal, initialParams, clazzEnumExt) {
	var o = null;
	if (clazzEnumExt != null) {
		o = new clazzEnumExt ();
	} else {
		o = new clazzEnum ();
	}
	Clazz.superConstructor (o, clazzEnum, [enumName, enumOrdinal]);
	if (initialParams != null && initialParams.length != 0) {
		o.construct.apply (o, initialParams);
	}
	clazzEnum[enumName] = o;
	clazzEnum.prototype[enumName] = o;
	return o;
};

/**
 * Make arrays.
 *
 * @return the created Array object
 */
/* public */
Clazz.newArray  = function () {
	var args = arguments;
	if (arguments.length == 1) {
		if (arguments[0] instanceof Array) {
			args = arguments[0];
		}
	}
	if (args.length <= 1) {
		return new Array ();
	} else if (args.length == 2) {
		var dim = args[0];
		if (typeof dim == "string") {
			dim = dim.charCodeAt (0); // char
		}
		var val = args[1];
		var arr = new Array (dim);
		for (var i = 0; i < dim; i++) {
			arr[i] = val;
		}
		return arr;
	} else {
		var dim = args[0];
		if (typeof dim == "string") {
			dim = dim.charCodeAt (0); // char
		}
		var len = args.length - 1;
		var xargs = new Array (len);
		for (var i = 0; i < len; i++) {
			xargs[i] = args[i + 1];
		}
		var arr = new Array (dim);
		for (var i = 0; i < dim; i++) {
			// Call recursively!
			arr[i] = Clazz.newArray (xargs);
		}
		return arr;
	}
};

/**
 * Make the RunnableCompatiability instance as a JavaScript function.
 *
 * @param jsr Instance of RunnableCompatiability
 * @return JavaScript function instance represents the method run of jsr.
 */
/* public */
Clazz.makeFunction = function (jsr) {
	return function (e) {
		if (e == null) {
			e = window.event;
		}
		if (jsr.setEvent != null) {
			jsr.setEvent (e);
		}
		jsr.run ();
		/*
		if (e != null && jsr.isReturned != null && jsr.isReturned()) {
			// Is it correct to stopPropagation here? --Feb 19, 2006
			e.cancelBubble = true;
			if (e.stopPropagation) {
				e.stopPropagation();
			}
		}
		*/
		if (jsr.returnSet == 1) {
			return jsr.returnNumber;
		} else if (jsr.returnSet == 2) {
			return jsr.returnBoolean;
		} else if (jsr.returnSet == 3) {
			return jsr.returnObject;
		}
	};
};

/* protected */
Clazz.defineStatics = function (clazz) {
	for (var i = 0; i < (arguments.length - 1) / 2; i++) {
		var name = arguments[i + i + 1];
		clazz[name] = clazz.prototype[name] = arguments[i + i + 2];
	}
};

/* protected */
Clazz.prepareFields = function (clazz, fieldsFun) {
	var stacks = new Array ();
	if (clazz.con$truct != null) {
		var ss = clazz.con$truct.stacks;
		var idx = clazz.con$truct.index;
		for (var i = idx; i < ss.length; i++) {
			stacks[i] = ss[i];
		}
	}
	clazz.con$truct = clazz.prototype.con$truct = function () {
		var stacks = arguments.callee.stacks;
		if (stacks != null) {
			for (var i = 0; i < stacks.length; i++) {
				stacks[i].apply (this, []);
			}
		}
	};
	stacks[stacks.length] = fieldsFun;
	clazz.con$truct.stacks = stacks;
	clazz.con$truct.index = 0;
};

/*
 * Serialize those public or protected fields in class 
 * net.sf.j2s.ajax.SimpleSerializable.
 */
/* protected */
Clazz.registerSerializableFields = function (clazz) {
	var args = arguments;
	var length = args.length;
	var newArr = new Array ();
	if (clazz.declared$Fields != null) {
		for (var i = 0; i < clazz.declared$Fields.length; i++) {
			newArr[i] = clazz.declared$Fields[i];
		}
	}
	clazz.declared$Fields = newArr;
	
	if (length > 0 && length % 2 == 1) {
		var fs = clazz.declared$Fields;
		for (var i = 1; i <= (length - 1) / 2; i++) {
			var o = { name : args[i + i - 1], type : args[i + i] };
			var existed = false;
			for (var j = 0; j < fs.length; j++) {
				if (fs[j].name == o.name) { // reloaded classes
					fs[j].type = o.type; // update type
					existed = true;
					break;
				}
			}
			if (!existed) {
				fs[fs.length] = o;
			}
		}
	}
};

/*
 * Get the caller method for those methods that are wrapped by 
 * Clazz.searchAndExecuteMethod.
 *
 * @param args caller method's arguments
 * @return caller method, null if there is not wrapped by 
 * Clazz.searchAndExecuteMethod or is called directly.
 */
/* protected */
/*-# getMixedCallerMethod -> gMCM  #-*/
Clazz.getMixedCallerMethod = function (args) {
	var o = new Object ();
	var argc = args.callee.caller; // Clazz.tryToSearchAndExecute
	if (argc == null) return null;
	if (argc !== Clazz.tryToSearchAndExecute) { // inherited method's apply
		argc = argc.arguments.callee.caller;
		if (argc == null) return null;
	}
	if (argc !== Clazz.tryToSearchAndExecute) return null;
	argc = argc.arguments.callee.caller; // Clazz.searchAndExecuteMethod
	if (argc == null || argc !== Clazz.searchAndExecuteMethod) return null;
	o.claxxRef = argc.arguments[1];
	o.fxName = argc.arguments[2];
	o.paramTypes = Clazz.getParamsType (argc.arguments[3]);
	argc = argc.arguments.callee.caller; // Clazz.generateDelegatingMethod
	if (argc == null) return null;
	argc = argc.arguments.callee.caller; // the private method's caller
	if (argc == null) return null;
	o.caller = argc;
	return o;
};

/*
 * Check and return super private method.
 * In order make private methods be executed correctly, some extra javascript
 * must be inserted into the beggining of the method body of the non-private 
 * methods that with the same method signature as following:
 * <code>
 *			var $private = Clazz.checkPrivateMethod (arguments);
 *			if ($private != null) {
 *				return $private.apply (this, arguments);
 *			}
 * </code>
 * Be cautious about this. The above codes should be insert by Java2Script
 * compiler or with double checks to make sure things work correctly.
 *
 * @param args caller method's arguments
 * @return private method if there are private method fitted for the current 
 * calling environment
 */
/* public */
Clazz.checkPrivateMethod = function (args) {
	var m = Clazz.getMixedCallerMethod (args);
	if (m == null) return null;
	var callerFx = m.claxxRef.prototype[m.caller.exName];
	if (callerFx == null) return null; // may not be in the class hierarchies
	var ppFun = null;
	if (callerFx.claxxOwner != null) {
		ppFun = callerFx.claxxOwner.prototype[m.fxName];
	} else {
		var stacks = callerFx.stacks;
		for (var i = stacks.length - 1; i >= 0; i--) {
			var fx = stacks[i].prototype[m.caller.exName];
			if (fx === m.caller) {
				ppFun = stacks[i].prototype[m.fxName];
			} else if (fx != null) {
				for (var fn in fx) {
					if (fn.indexOf ('\\') == 0 && fx[fn] === m.caller) {
						ppFun = stacks[i].prototype[m.fxName];
						break;
					}
				}
			}
			if (ppFun != null) {
				break;
			}
		}
	}
	if (ppFun != null && ppFun.claxxOwner == null) {
		ppFun = ppFun["\\" + m.paramTypes];
	}
	if (ppFun != null && ppFun.isPrivate && ppFun !== args.callee) {
		return ppFun;
	}
	return null;
};
var $fz = null; // for private method declaration
//var cla$$ = null;
var c$ = null;
/*-# cla$$$tack -> cst  #-*/
Clazz.cla$$$tack = new Array ();
Clazz.pu$h = function () {
	if (c$ != null) { // if (cla$$ != null) {
		Clazz.cla$$$tack[Clazz.cla$$$tack.length] = c$; // cla$$;
	}
};
Clazz.p0p = function () {
	if (Clazz.cla$$$tack.length > 0) {
		var clazz = Clazz.cla$$$tack[Clazz.cla$$$tack.length - 1];
		Clazz.cla$$$tack.length--;
		return clazz;
	} else {
		return null;
	}
};

/*# {$no.debug.support} >>x #*/
/*
 * Option to switch on/off of stack traces.
 */
/* protect */
Clazz.tracingCalling = false;

/*
 * Use to mark that the Throwable instance is created or not.
 */
/* private */
Clazz.initializingException = false;

/* private */
Clazz.callingStack = function (caller, owner) {
	this.caller = caller;
	this.owner = owner;
};
Clazz.callingStackTraces = new Array ();
Clazz.pu$hCalling = function (stack) {
	Clazz.callingStackTraces[Clazz.callingStackTraces.length] = stack;
};
Clazz.p0pCalling = function () {
	var length = Clazz.callingStackTraces.length;
	if (length > 0) {
		var stack = Clazz.callingStackTraces[length - 1];
		Clazz.callingStackTraces.length--;
		return stack;
	} else {
		return null;
	}
};
/*# x<< #*/

/**
 * The first folder is considered as the primary folder.
 * And try to be compatiable with ClazzLoader system.
 */
/* private */
if (window["ClazzLoader"] != null && ClazzLoader.binaryFolders != null) {
	Clazz.binaryFolders = ClazzLoader.binaryFolders;
} else {
	Clazz.binaryFolders = ["bin/", "", "j2slib/"];
}

Clazz.addBinaryFolder = function (bin) {
	if (bin != null) {
		var bins = Clazz.binaryFolders;
		for (var i = 0; i < bins.length; i++) {
			if (bins[i] == bin) {
				return ;
			}
		}
		bins[bins.length] = bin;
	}
};
Clazz.removeBinaryFolder = function (bin) {
	if (bin != null) {
		var bins = Clazz.binaryFolders;
		for (var i = 0; i < bins.length; i++) {
			if (bins[i] == bin) {
				for (var j = i; j < bins.length - 1; j++) {
					bins[j] = bins[j + 1];
				}
				bins.length--;
				return bin;
			}
		}
	}
	return null;
};
Clazz.setPrimaryFolder = function (bin) {
	if (bin != null) {
		Clazz.removeBinaryFolder (bin);
		var bins = Clazz.binaryFolders;
		for (var i = bins.length - 1; i >= 0; i--) {
			bins[i + 1] = bins[i];
		}
		bins[0] = bin;
	}
};

/**
 * This is a simple implementation for Clazz#load. It just ignore dependencies
 * of the class. This will be fine for jar *.z.js file.
 * It will be overriden by ClazzLoader#load.
 * For more details, see ClazzLoader.js
 */
/* protected */
Clazz.load = function (musts, clazz, optionals, declaration) {
	if (declaration != null) {
		declaration ();
	}
};

/*
 * Invade the Object prototype!
 * TODO: make sure that invading Object prototype does not affect other
 * existed library, such as Dojo, YUI, Prototype, ...
 */
java.lang.Object = Clazz._O;

JavaObject.getName = Clazz.innerFunctions.getName;

w$ = window; // Short for browser's window object
d$ = document; // Short for browser's document object
System = {
	currentTimeMillis : function () {
		return new Date ().getTime ();
	},
	props : null, //new java.util.Properties (),
	getProperties : function () {
		return System.props;
	},
	setProperties : function (props) {
		System.props = props;
	},
	getProperty : function (key, def) {
		if (System.props != null) {
			return System.props.getProperty (key, def);
		}
		if (def != null) {
			return def;
		}
		return key;
	},
	setProperty : function (key, val) {
		if (System.props == null) {
			return ;
		}
		System.props.setProperty (key, val);
	},
	currentTimeMillis : function () {
		return new Date ().getTime ();
	},
	arraycopy : function (src, srcPos, dest, destPos, length) {
		if (src !== dest) {
			for (var i = 0; i < length; i++) {
				dest[destPos + i] = src[srcPos + i];
			}
		} else {
			var swap = [];
			for (var i = 0; i < length; i++) {
				swap[i] = src[srcPos + i];
			}
			for (var i = 0; i < length; i++) {
				dest[destPos + i] = swap[i];
			}
		}
	}
};
System.out = new Clazz._O ();
System.out.__CLASS_NAME__ = "java.io.PrintStream";
System.out.print = function () {};
System.out.printf = function () {};
System.out.println = function () {};

System.err = new Clazz._O ();
System.err.__CLASS_NAME__ = "java.io.PrintStream";
System.err.print = function () {};
System.err.printf = function () {};
System.err.println = function () {};

popup = assert = log = error = window.alert;

Thread = function () {};
Thread.J2S_THREAD = Thread.prototype.J2S_THREAD = new Thread ();
Thread.currentThread = Thread.prototype.currentThread = function () {
	return this.J2S_THREAD;
};

/* public */
Clazz.intCast = function (n) { // 32bit
	var b1 = (n & 0xff000000) >> 24;
	var b2 = (n & 0xff0000) >> 16;
	var b3 = (n & 0xff00) >> 8;
	var b4 = n & 0xff;
	if ((b1 & 0x80) != 0) {
		return -(((b1 & 0x7f) << 24) + (b2 << 16) + (b3 << 8) + b4 + 1);
	} else {
		return (b1 << 24) + (b2 << 16) + (b3 << 8) + b4;
	}
};

/* public */
Clazz.shortCast = function (s) { // 16bit
	var b1 = (n & 0xff00) >> 8;
	var b2 = n & 0xff;
	if ((b1 & 0x80) != 0) {
		return -(((b1 & 0x7f) << 8) + b2 + 1);
	} else {
		return (b1 << 8) + b4;
	}
};

/* public */
Clazz.byteCast = function (b) { // 8bit
	if ((b & 0x80) != 0) {
		return -((b & 0x7f) + 1);
	} else {
		return b & 0xff;
	}
};

/* public */
Clazz.charCast = function (c) { // 8bit
	return String.fromCharCode (c & 0xff).charAt (0);
};

/**
 * Warning: Unsafe conversion!
 */
/* public */
Clazz.floatCast = function (f) { // 32bit
	return f;
};

/*
 * Try to fix JavaScript's shift operator defects on long type numbers.
 */

Clazz.longMasks = [];

Clazz.longReverseMasks = [];

Clazz.longBits = [];

(function () {
	var arr = [1];
	for (var i = 1; i < 53; i++) {
		arr[i] = arr[i - 1] + arr[i - 1]; // * 2 or << 1
	}
	Clazz.longBits = arr;
	Clazz.longMasks[52] = arr[52];
	for (var i = 51; i >= 0; i--) {
		Clazz.longMasks[i] = Clazz.longMasks[i + 1] + arr[i];
	}
	Clazz.longReverseMasks[0] = arr[0];
	for (var i = 1; i < 52; i++) {
		Clazz.longReverseMasks[i] = Clazz.longReverseMasks[i - 1] + arr[i];
	}
}) ();

/* public */
Clazz.longLeftShift = function (l, o) { // 64bit
	if (o == 0) return l;
	if (o >= 64) return 0;
	if (o > 52) {
		error ("[Java2Script] Error : JavaScript does not support long shift!");
		return l;
	}
	if ((l & Clazz.longMasks[o - 1]) != 0) {
		error ("[Java2Script] Error : Such shift operator results in wrong calculation!");
		return l;
	}
	var high = l & Clazz.longMasks[52 - 32 + o];
	if (high != 0) {
		return high * Clazz.longBits[o] + (l & Clazz.longReverseMasks[32 - o]) << 0;
	} else {
		return l << o;
	}
};

/* public */
Clazz.intLeftShift = function (n, o) { // 32bit
	return (n << o) & 0xffffffff;
};

/* public */
Clazz.longRightShift = function (l, o) { // 64bit
	if ((l & Clazz.longMasks[52 - 32]) != 0) {
		return Math.round((l & Clazz.longMasks[52 - 32]) / Clazz.longBits[32 - o]) + (l & Clazz.longReverseMasks[o]) >> o;
	} else {
		return l >> o;
	}
};

/* public */
Clazz.intRightShift = function (n, o) { // 32bit
	return n >> o; // no needs for this shifting wrapper
};

/* public */
Clazz.long0RightShift = function (l, o) { // 64bit
	return l >>> o;
};

/* public */
Clazz.int0RightShift = function (n, o) { // 64bit
	return n >>> o; // no needs for this shifting wrapper
};

// Compress the common public API method in shorter name
$_L=Clazz.load;$_W=Clazz.declareAnonymous;$_T=Clazz.declareType;$_J=Clazz.declarePackage;$_C=Clazz.decorateAsClass;$_Z=Clazz.instantialize;$_I=Clazz.declareInterface;$_D=Clazz.isClassDefined;$_H=Clazz.pu$h;$_P=Clazz.p0p;$_B=Clazz.prepareCallback;$_N=Clazz.innerTypeInstance;$_K=Clazz.makeConstructor;$_U=Clazz.superCall;$_R=Clazz.superConstructor;$_M=Clazz.defineMethod;$_V=Clazz.overrideMethod;$_S=Clazz.defineStatics;$_E=Clazz.defineEnumConstant;$_F=Clazz.cloneFinals;$_Y=Clazz.prepareFields;$_A=Clazz.newArray;$_O=Clazz.instanceOf;$_G=Clazz.inheritArgs;$_X=Clazz.checkPrivateMethod;$_Q=Clazz.makeFunction;$_s=Clazz.registerSerializableFields;


var reflect = Clazz.declarePackage ("java.lang.reflect");
Clazz.declarePackage ("java.security");

Clazz.innerFunctionNames = Clazz.innerFunctionNames.concat (["getSuperclass",
		"isAssignableFrom", "getMethods", "getMethod", "getDeclaredMethods", 
		"getDeclaredMethod", "getConstructor", "getModifiers", "isArray", "newInstance"]);

Clazz.innerFunctions.getSuperclass = function () {
	return this.superClazz;	
};
Clazz.innerFunctions.isAssignableFrom = function (clazz) {
	return Clazz.getInheritedLevel (clazz, this) >= 0;	
};
Clazz.innerFunctions.getConstructor = function () {
	return new java.lang.reflect.Constructor (this, [], [], 
			java.lang.reflect.Modifier.PUBLIC);
};
/**
 * TODO: fix bug for polymorphic methods!
 */
Clazz.innerFunctions.getDeclaredMethods = Clazz.innerFunctions.getMethods = function () {
	var ms = new Array ();
	var p = this.prototype;
	for (var attr in p) {
		if (typeof p[attr] == "function" && p[attr].__CLASS_NAME__ == null) {
			/* there are polynormical methods. */
			ms[ms.length] = new java.lang.reflect.Method (this, attr,
					[], java.lang.Void, [], java.lang.reflect.Modifier.PUBLIC);
		}
	}
	p = this;
	for (var attr in p) {
		if (typeof p[attr] == "function" && p[attr].__CLASS_NAME__ == null) {
			ms[ms.length] = new java.lang.reflect.Method (this, attr,
					[], java.lang.Void, [], java.lang.reflect.Modifier.PUBLIC
					| java.lang.reflect.Modifier.STATIC);
		}
	}
	return ms;
};
Clazz.innerFunctions.getDeclaredMethod = Clazz.innerFunctions.getMethod = function (name, clazzes) {
	var p = this.prototype;
	for (var attr in p) {
		if (name == attr && typeof p[attr] == "function" 
				&& p[attr].__CLASS_NAME__ == null) {
			/* there are polynormical methods. */
			return new java.lang.reflect.Method (this, attr,
					[], java.lang.Void, [], java.lang.reflect.Modifier.PUBLIC);
		}
	}
	p = this;
	for (var attr in p) {
		if (name == attr && typeof p[attr] == "function" 
				&& p[attr].__CLASS_NAME__ == null) {
			return new java.lang.reflect.Method (this, attr,
					[], java.lang.Void, [], java.lang.reflect.Modifier.PUBLIC
					| java.lang.reflect.Modifier.STATIC);
		}
	}
	return null;
};
Clazz.innerFunctions.getModifiers = function () {
	return java.lang.reflect.Modifier.PUBLIC;
};
Clazz.innerFunctions.isArray = function () {
	return false;
};
Clazz.innerFunctions.newInstance = function () {
	var clz = this;
	return new clz ();
};

//Object.newInstance = Clazz.innerFunctions.newInstance;
{
	var inF = Clazz.innerFunctionNames;
	for (var i = 0; i < inF.length; i++) {
		JavaObject[inF[i]] = Clazz.innerFunctions[inF[i]];
		Array[inF[i]] = Clazz.innerFunctions[inF[i]];
	}
	Array["isArray"] = function () {
		return true;
	};
}

/* public */
Clazz.forName = function (clazzName) {
	if (Clazz.isClassDefined (clazzName)) {
		return Clazz.evalType (clazzName);
	}
	if (window["ClazzLoader"] != null) {
		ClazzLoader.setLoadingMode ("xhr.sync");
		ClazzLoader.loadClass (clazzName);
		return Clazz.evalType (clazzName);
	} else {
		alert ("[Java2Script] Error: No ClassLoader!");
	}
};

/* For hotspot and unloading */

/* private */
Clazz.cleanDelegateMethod = function (m) {
	if (m == null) return;
	if (typeof m == "function" && m.lastMethod != null
			&& m.lastParams != null && m.lastClaxxRef != null) {
		m.lastMethod = null;
		m.lastParams = null;
		m.lastClaxxRef = null;
	}
};

/* public */
Clazz.unloadClass = function (qClazzName) {
	var cc = Clazz.evalType (qClazzName);
	if (cc != null) {
		Clazz.unloadedClasses[qClazzName] = cc;
		var clazzName = qClazzName;
		var pkgFrags = clazzName.split (/\./);
		var pkg = null;
		for (var i = 0; i < pkgFrags.length - 1; i++) {
			if (pkg == null) {
				pkg = Clazz.allPackage[pkgFrags[0]];
			} else {
				pkg = pkg[pkgFrags[i]]
			}
		}
		if (pkg == null) {
			Clazz.allPackage[pkgFrags[0]] = null;
			window[pkgFrags[0]] = null;
			// also try to unload inner or anonymous classes
			for (var c in window) {
				if (c.indexOf (qClazzName + "$") == 0) {
					Clazz.unloadClass (c);
					window[c] = null;
				}
			}
		} else {
			pkg[pkgFrags[pkgFrags.length - 1]] = null;
			// also try to unload inner or anonymous classes
			for (var c in pkg) {
				if (c.indexOf (pkgFrags[pkgFrags.length - 1] + "$") == 0) {
					Clazz.unloadClass (pkg.__PKG_NAME__ + "." + c);
					pkg[c] = null;
				}
			}
		}

		if (Clazz.allClasses[qClazzName] == true) {
			Clazz.allClasses[qClazzName] = false;
			// also try to unload inner or anonymous classes
			for (var c in Clazz.allClasses) {
				if (c.indexOf (qClazzName + "$") == 0) {
					Clazz.allClasses[c] = false;
				}
			}
		}
		
		for (var m in cc) {
			Clazz.cleanDelegateMethod (cc[m]);
		}
		for (var m in cc.prototype) {
			Clazz.cleanDelegateMethod (cc.prototype[m]);
		}

		if (window["ClazzLoader"] != null) {
			ClazzLoader.unloadClassExt (qClazzName);
		}
		
		return true;
	}
	return false;
};

//written by Dean Edwards, 2005
//with input from Tino Zijdel, Matthias Miller, Diego Perini

//http://dean.edwards.name/weblog/2005/10/add-event/

// Merge Dean Edwards' addEvent for Java2Script
/* public */
Clazz.addEvent = function (element, type, handler) {
	if (element.addEventListener) {
		element.addEventListener(type, handler, false);
	} else {
		// assign each event handler a unique ID
		if (!handler.$$guid) handler.$$guid = Clazz.addEvent.guid++;
		// create a hash table of event types for the element
		if (!element.events) element.events = {};
		// create a hash table of event handlers for each element/event pair
		var handlers = element.events[type];
		if (!handlers) {
			handlers = element.events[type] = {};
			// store the existing event handler (if there is one)
			if (element["on" + type]) {
				handlers[0] = element["on" + type];
			}
		}
		// store the event handler in the hash table
		handlers[handler.$$guid] = handler;
		// assign a global event handler to do all the work
		element["on" + type] = Clazz.handleEvent;
	}
};
/* private */
//a counter used to create unique IDs
Clazz.addEvent.guid = 1;

/* public */
Clazz.removeEvent = function (element, type, handler) {
	if (element.removeEventListener) {
		element.removeEventListener(type, handler, false);
	} else {
		// delete the event handler from the hash table
		if (element.events && element.events[type]) {
			delete element.events[type][handler.$$guid];
		}
	}
};

/* private */
Clazz.isVeryOldIE = navigator.userAgent.indexOf("MSIE 6.0") != -1 || navigator.userAgent.indexOf("MSIE 5.5") != -1 || navigator.userAgent.indexOf("MSIE 5.0") != -1;

/* protected */
Clazz.handleEvent = function (event) {
	var returnValue = true;
	// grab the event object (IE uses a global event object)
	if (!Clazz.isVeryOldIE) {
		event = event || Clazz.fixEvent(((this.ownerDocument || this.document || this).parentWindow || window).event);
	} else { // The above line is buggy in IE 6.0
		if (event == null) {
			var evt = null;
			try {
				var pWindow = (this.ownerDocument || this.document || this).parentWindow;
				if (pWindow != null) {
					evt = pWindow.event;
				}
			} catch (e) {
				evt = window.event;
			}
			event = Clazz.fixEvent(evt);
		}
	}
	// get a reference to the hash table of event handlers
	var handlers = this.events[event.type];
	// execute each event handler
	for (var i in handlers) {
		if (isNaN (i)) {
			continue;
		}
		this.$$handleEvent = handlers[i];
		if (typeof this.$$handleEvent != "function") {
			continue;
		}
		if (this.$$handleEvent(event) === false) {
			returnValue = false;
		}
	}
	return returnValue;
};

/* private */
Clazz.fixEvent = function (event) {
	// add W3C standard event methods
	event.preventDefault = Clazz.fixEvent.preventDefault;
	event.stopPropagation = Clazz.fixEvent.stopPropagation;
	return event;
};
Clazz.fixEvent.preventDefault = function() {
	this.returnValue = false;
};
Clazz.fixEvent.stopPropagation = function() {
	this.cancelBubble = true;
};

}
