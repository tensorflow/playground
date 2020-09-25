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
