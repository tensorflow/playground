Clazz.load(["java.lang.RuntimeException"],"java.lang.TypeNotPresentException",null,function(){
c$=Clazz.decorateAsClass(function(){
this.$typeName=null;
Clazz.instantialize(this,arguments);
},java.lang,"TypeNotPresentException",RuntimeException);
Clazz.makeConstructor(c$,
function(typeName,cause){
Clazz.superConstructor(this,TypeNotPresentException,["Type "+typeName+" not present",cause]);
this.$typeName=typeName;
},"~S,Throwable");
Clazz.defineMethod(c$,"typeName",
function(){
return this.$typeName;
});
});
