Clazz.load(null,"java.lang.reflect.Proxy",["java.lang.IllegalArgumentException","$.NullPointerException"],function(){
c$=Clazz.decorateAsClass(function(){
this.h=null;
Clazz.instantialize(this,arguments);
},java.lang.reflect,"Proxy",null,java.io.Serializable);
Clazz.makeConstructor(c$,
function(h){
this.h=h;
},"java.lang.reflect.InvocationHandler");
c$.getProxyClass=Clazz.defineMethod(c$,"getProxyClass",
function(loader,interfaces){
if(interfaces==null){
throw new NullPointerException();
}return null;
},"ClassLoader,~A");
c$.newProxyInstance=Clazz.defineMethod(c$,"newProxyInstance",
function(loader,interfaces,h){
if(h!=null){
}throw new NullPointerException();
},"ClassLoader,~A,java.lang.reflect.InvocationHandler");
c$.isProxyClass=Clazz.defineMethod(c$,"isProxyClass",
function(cl){
if(cl!=null){
}throw new NullPointerException();
},"Class");
c$.getInvocationHandler=Clazz.defineMethod(c$,"getInvocationHandler",
function(proxy){
if(java.lang.reflect.Proxy.isProxyClass(proxy.getClass())){
return(proxy).h;
}throw new IllegalArgumentException(("K00f1"));
},"~O");
});
