Clazz.load(["java.util.IllegalFormatException"],"java.util.UnknownFormatFlagsException",["java.lang.NullPointerException"],function(){
c$=Clazz.decorateAsClass(function(){
this.flags=null;
Clazz.instantialize(this,arguments);
},java.util,"UnknownFormatFlagsException",java.util.IllegalFormatException);
Clazz.makeConstructor(c$,
function(f){
Clazz.superConstructor(this,java.util.UnknownFormatFlagsException,[]);
if(null==f){
throw new NullPointerException();
}this.flags=f;
},"~S");
Clazz.defineMethod(c$,"getFlags",
function(){
return this.flags;
});
Clazz.overrideMethod(c$,"getMessage",
function(){
return"The flags are "+this.flags;
});
});
