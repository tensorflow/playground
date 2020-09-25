Clazz.load(["java.io.ObjectStreamException"],"java.io.WriteAbortedException",null,function(){
c$=Clazz.decorateAsClass(function(){
this.detail=null;
Clazz.instantialize(this,arguments);
},java.io,"WriteAbortedException",java.io.ObjectStreamException);
Clazz.makeConstructor(c$,
function(detailMessage,rootCause){
Clazz.superConstructor(this,java.io.WriteAbortedException,[detailMessage]);
this.detail=rootCause;
this.initCause(rootCause);
},"~S,Exception");
Clazz.defineMethod(c$,"getMessage",
function(){
var msg=Clazz.superCall(this,java.io.WriteAbortedException,"getMessage",[]);
if(this.detail!=null){
msg=msg+"; "+this.detail.toString();
}return msg;
});
Clazz.overrideMethod(c$,"getCause",
function(){
return this.detail;
});
});
