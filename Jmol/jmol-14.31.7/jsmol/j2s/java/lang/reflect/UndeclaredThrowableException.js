Clazz.load(["java.lang.RuntimeException"],"java.lang.reflect.UndeclaredThrowableException",null,function(){
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
});
