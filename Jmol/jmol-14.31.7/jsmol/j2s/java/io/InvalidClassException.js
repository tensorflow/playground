Clazz.load(["java.io.ObjectStreamException"],"java.io.InvalidClassException",null,function(){
c$=Clazz.decorateAsClass(function(){
this.classname=null;
Clazz.instantialize(this,arguments);
},java.io,"InvalidClassException",java.io.ObjectStreamException);
Clazz.makeConstructor(c$,
function(className,detailMessage){
Clazz.superConstructor(this,java.io.InvalidClassException,[detailMessage]);
this.classname=className;
},"~S,~S");
Clazz.defineMethod(c$,"getMessage",
function(){
var msg=Clazz.superCall(this,java.io.InvalidClassException,"getMessage",[]);
if(this.classname!=null){
msg=this.classname+';' + ' '+msg;
}return msg;
});
});
