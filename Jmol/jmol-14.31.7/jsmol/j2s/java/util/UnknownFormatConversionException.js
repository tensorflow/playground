Clazz.load(["java.util.IllegalFormatException"],"java.util.UnknownFormatConversionException",null,function(){
c$=Clazz.decorateAsClass(function(){
this.s=null;
Clazz.instantialize(this,arguments);
},java.util,"UnknownFormatConversionException",java.util.IllegalFormatException);
Clazz.makeConstructor(c$,
function(s){
Clazz.superConstructor(this,java.util.UnknownFormatConversionException,[]);
this.s=s;
},"~S");
Clazz.defineMethod(c$,"getConversion",
function(){
return this.s;
});
Clazz.overrideMethod(c$,"getMessage",
function(){
return"Conversion = '"+this.s+"'";
});
});
