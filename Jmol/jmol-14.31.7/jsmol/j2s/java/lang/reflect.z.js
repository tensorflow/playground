/* http://j2s.sf.net/ */Clazz.load(null,"java.lang.Void",["java.lang.RuntimeException"],function(){
c$=Clazz.declareType(java.lang,"Void");
Clazz.defineStatics(c$,
"TYPE",null);
{
java.lang.Void.TYPE=java.lang.Void;
}});
Clazz.declareInterface(java.lang.reflect,"GenericDeclaration");
Clazz.declareInterface(java.lang.reflect,"AnnotatedElement");
Clazz.load(["java.lang.reflect.AnnotatedElement"],"java.lang.reflect.AccessibleObject",null,function(){
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
});
Clazz.declareInterface(java.lang.reflect,"InvocationHandler");
c$=Clazz.declareInterface(java.lang.reflect,"Member");
Clazz.defineStatics(c$,
"PUBLIC",0,
"DECLARED",1);
Clazz.load(null,"java.lang.reflect.Modifier",["java.lang.reflect.Method"],function(){
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
});
Clazz.load(["java.lang.reflect.AccessibleObject","$.GenericDeclaration","$.Member","java.lang.Void"],"java.lang.reflect.Constructor",null,function(){
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
});
Clazz.load(["java.lang.reflect.AccessibleObject","$.Member"],"java.lang.reflect.Field",null,function(){
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
});
Clazz.load(["java.lang.reflect.AccessibleObject","$.GenericDeclaration","$.Member","java.lang.Void"],"java.lang.reflect.Method",null,function(){
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
});
