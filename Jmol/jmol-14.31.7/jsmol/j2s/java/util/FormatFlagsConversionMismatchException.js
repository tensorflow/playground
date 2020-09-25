Clazz.load(["java.util.IllegalFormatException"],"java.util.FormatFlagsConversionMismatchException",["java.lang.NullPointerException"],function(){
c$=Clazz.decorateAsClass(function(){
this.f=null;
this.c=0;
Clazz.instantialize(this,arguments);
},java.util,"FormatFlagsConversionMismatchException",java.util.IllegalFormatException,java.io.Serializable);
Clazz.makeConstructor(c$,
function(f,c){
Clazz.superConstructor(this,java.util.FormatFlagsConversionMismatchException,[]);
if(null==f){
throw new NullPointerException();
}this.f=f;
this.c=c;
},"~S,~N");
Clazz.defineMethod(c$,"getFlags",
function(){
return this.f;
});
Clazz.defineMethod(c$,"getConversion",
function(){
return this.c;
});
Clazz.overrideMethod(c$,"getMessage",
function(){
return"Mismatched Convertor ="+this.c+", Flags= "+this.f;
});
});
