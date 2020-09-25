Clazz.load(["java.util.IllegalFormatException"],"java.util.IllegalFormatCodePointException",null,function(){
c$=Clazz.decorateAsClass(function(){
this.c=0;
Clazz.instantialize(this,arguments);
},java.util,"IllegalFormatCodePointException",java.util.IllegalFormatException,java.io.Serializable);
Clazz.makeConstructor(c$,
function(c){
Clazz.superConstructor(this,java.util.IllegalFormatCodePointException,[]);
this.c=c;
},"~N");
Clazz.defineMethod(c$,"getCodePoint",
function(){
return this.c;
});
Clazz.overrideMethod(c$,"getMessage",
function(){
return"Code point is "+this.c;
});
});
