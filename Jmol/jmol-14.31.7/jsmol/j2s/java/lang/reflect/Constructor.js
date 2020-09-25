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
