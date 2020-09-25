Clazz.load(["java.util.IllegalFormatException"],"java.util.IllegalFormatPrecisionException",null,function(){
c$=Clazz.decorateAsClass(function(){
this.p=0;
Clazz.instantialize(this,arguments);
},java.util,"IllegalFormatPrecisionException",java.util.IllegalFormatException);
Clazz.makeConstructor(c$,
function(p){
Clazz.superConstructor(this,java.util.IllegalFormatPrecisionException,[]);
this.p=p;
},"~N");
Clazz.defineMethod(c$,"getPrecision",
function(){
return this.p;
});
Clazz.overrideMethod(c$,"getMessage",
function(){
return String.valueOf(this.p);
});
});
