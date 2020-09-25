Clazz.load(["java.util.Map"],"java.util.MapEntry",null,function(){
c$=Clazz.decorateAsClass(function(){
this.key=null;
this.value=null;
Clazz.instantialize(this,arguments);
},java.util,"MapEntry",null,[java.util.Map.Entry,Cloneable]);
Clazz.makeConstructor(c$,
function(theKey){
this.key=theKey;
},"~O");
Clazz.makeConstructor(c$,
function(theKey,theValue){
this.key=theKey;
this.value=theValue;
},"~O,~O");
Clazz.defineMethod(c$,"clone",
function(){
try{
return Clazz.superCall(this,java.util.MapEntry,"clone",[]);
}catch(e){
if(Clazz.instanceOf(e,CloneNotSupportedException)){
return null;
}else{
throw e;
}
}
});
Clazz.overrideMethod(c$,"equals",
function(object){
if(this===object){
return true;
}if(Clazz.instanceOf(object,java.util.Map.Entry)){
var entry=object;
return(this.key==null?entry.getKey()==null:this.key.equals(entry.getKey()))&&(this.value==null?entry.getValue()==null:this.value.equals(entry.getValue()));
}return false;
},"~O");
Clazz.overrideMethod(c$,"getKey",
function(){
return this.key;
});
Clazz.overrideMethod(c$,"getValue",
function(){
return this.value;
});
Clazz.overrideMethod(c$,"hashCode",
function(){
return(this.key==null?0:this.key.hashCode())^(this.value==null?0:this.value.hashCode());
});
Clazz.overrideMethod(c$,"setValue",
function(object){
var result=this.value;
this.value=object;
return result;
},"~O");
Clazz.overrideMethod(c$,"toString",
function(){
return this.key+"="+this.value;
});
Clazz.declareInterface(java.util.MapEntry,"Type");
});
