Clazz.load(["java.util.IllegalFormatException"],"java.util.MissingFormatWidthException",["java.lang.NullPointerException"],function(){
c$=Clazz.decorateAsClass(function(){
this.s=null;
Clazz.instantialize(this,arguments);
},java.util,"MissingFormatWidthException",java.util.IllegalFormatException);
Clazz.makeConstructor(c$,
function(s){
Clazz.superConstructor(this,java.util.MissingFormatWidthException,[]);
if(null==s){
throw new NullPointerException();
}this.s=s;
},"~S");
Clazz.defineMethod(c$,"getFormatSpecifier",
function(){
return this.s;
});
Clazz.overrideMethod(c$,"getMessage",
function(){
return this.s;
});
});
