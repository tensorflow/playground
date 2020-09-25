c$=Clazz.decorateAsClass(function(){
this.detailMessage=null;
this.cause=null;
this.stackTrace=null;
Clazz.instantialize(this,arguments);
},java.lang,"Throwable",null,java.io.Serializable);
Clazz.prepareFields(c$,function(){
this.cause=this;
});
Clazz.makeConstructor(c$,
function(){
this.fillInStackTrace();
});
Clazz.makeConstructor(c$,
function(message){
this.fillInStackTrace();
this.detailMessage=message;
},"~S");
Clazz.makeConstructor(c$,
function(message,cause){
this.fillInStackTrace();
this.detailMessage=message;
this.cause=cause;
},"~S,Throwable");
Clazz.makeConstructor(c$,
function(cause){
this.fillInStackTrace();
this.detailMessage=(cause==null?null:cause.toString());
this.cause=cause;
},"Throwable");
Clazz.defineMethod(c$,"getMessage",
function(){
{
if(typeof this.message!="undefined"){
return this.message;
}
}return this.detailMessage;
});
Clazz.defineMethod(c$,"getLocalizedMessage",
function(){
return this.getMessage();
});
Clazz.defineMethod(c$,"getCause",
function(){
return(this.cause===this?null:this.cause);
});
Clazz.defineMethod(c$,"initCause",
function(cause){
if(this.cause!==this)throw new IllegalStateException("Can't overwrite cause");
if(cause===this)throw new IllegalArgumentException("Self-causation not permitted");
this.cause=cause;
return this;
},"Throwable");
Clazz.overrideMethod(c$,"toString",
function(){
var s=this.getClass().getName();
var message=this.getLocalizedMessage();
return(message!=null)?(s+": "+message):s;
});
Clazz.defineMethod(c$,"printStackTrace",
function(){
System.err.println(this);
for(var i=0;i<this.stackTrace.length;i++){
var t=this.stackTrace[i];
var x=t.methodName.indexOf("(");
var n=t.methodName.substring(0,x).replace(/\s+/g,"");
if(n!="construct"||t.nativeClazz==null
||Clazz.getInheritedLevel(t.nativeClazz,Throwable)<0){
System.err.println(t);
}
}
});
Clazz.defineMethod(c$,"printStackTrace",
function(s){
this.printStackTrace();
},"java.io.PrintStream");
Clazz.defineMethod(c$,"printStackTrace",
function(s){
this.printStackTrace();
},"java.io.PrintWriter");
Clazz.defineMethod(c$,"fillInStackTrace",
function(){
this.stackTrace=new Array();
var caller=arguments.callee.caller;
var superCaller=null;
var callerList=new Array();
var index=Clazz.callingStackTraces.length-1;
var noLooping=true;
while(index>-1||caller!=null){
var clazzName=null;
var nativeClazz=null;
if(!noLooping||caller==Clazz.tryToSearchAndExecute||caller==Clazz.superCall||caller==null){
if(index<0){
break;
}
noLooping=true;
superCaller=Clazz.callingStackTraces[index].caller;
nativeClazz=Clazz.callingStackTraces[index].owner;
index--;
}else{
superCaller=caller;
if(superCaller.claxxOwner!=null){
nativeClazz=superCaller.claxxOwner;
}else if(superCaller.exClazz!=null){
nativeClazz=superCaller.exClazz;
}
}
var st=new StackTraceElement(
((nativeClazz!=null&&nativeClazz.__CLASS_NAME__.length!=0)?
nativeClazz.__CLASS_NAME__:"anonymous"),
((superCaller.exName==null)?"anonymous":superCaller.exName)
+" ("+Clazz.getParamsType(superCaller.arguments)+")",
null,-1);
st.nativeClazz=nativeClazz;
this.stackTrace[this.stackTrace.length]=st;
for(var i=0;i<callerList.length;i++){
if(callerList[i]==superCaller){

var st=new StackTraceElement("lost","missing",null,-3);
st.nativeClazz=null;
this.stackTrace[this.stackTrace.length]=st;
noLooping=false;

}
}
if(superCaller!=null){
callerList[callerList.length]=superCaller;
}
caller=superCaller.arguments.callee.caller;
}
Clazz.initializingException=false;
return this;
});
Clazz.defineMethod(c$,"setStackTrace",
function(stackTrace){
var defensiveCopy=stackTrace.clone();
for(var i=0;i<defensiveCopy.length;i++)if(defensiveCopy[i]==null)throw new NullPointerException("stackTrace["+i+"]");

this.stackTrace=defensiveCopy;
},"~A");
