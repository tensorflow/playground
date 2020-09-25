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
