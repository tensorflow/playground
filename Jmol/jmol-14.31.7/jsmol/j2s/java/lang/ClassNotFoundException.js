Clazz.load(["java.lang.Exception"],"java.lang.ClassNotFoundException",null,function(){
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
});
