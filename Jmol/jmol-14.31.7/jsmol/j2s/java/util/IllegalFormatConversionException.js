Clazz.load(["java.util.IllegalFormatException"],"java.util.IllegalFormatConversionException",["java.lang.NullPointerException"],function(){
c$=Clazz.decorateAsClass(function(){
this.c=0;
this.arg=null;
Clazz.instantialize(this,arguments);
},java.util,"IllegalFormatConversionException",java.util.IllegalFormatException,java.io.Serializable);
Clazz.makeConstructor(c$,
function(c,arg){
Clazz.superConstructor(this,java.util.IllegalFormatConversionException,[]);
this.c=c;
if(arg==null){
throw new NullPointerException();
}this.arg=arg;
},"~N,Class");
Clazz.defineMethod(c$,"getArgumentClass",
function(){
return this.arg;
});
Clazz.defineMethod(c$,"getConversion",
function(){
return this.c;
});
Clazz.overrideMethod(c$,"getMessage",
function(){
return""+this.c+" is incompatible with "+this.arg.getName();
});
});
