Clazz.load(["java.util.IllegalFormatException"],"java.util.IllegalFormatWidthException",null,function(){
c$=Clazz.decorateAsClass(function(){
this.w=0;
Clazz.instantialize(this,arguments);
},java.util,"IllegalFormatWidthException",java.util.IllegalFormatException);
Clazz.makeConstructor(c$,
function(w){
Clazz.superConstructor(this,java.util.IllegalFormatWidthException,[]);
this.w=w;
},"~N");
Clazz.defineMethod(c$,"getWidth",
function(){
return this.w;
});
Clazz.overrideMethod(c$,"getMessage",
function(){
return String.valueOf(this.w);
});
});
