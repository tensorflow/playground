Clazz.load(["java.lang.Exception"],"java.lang.reflect.InvocationTargetException",null,function(){
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
});
