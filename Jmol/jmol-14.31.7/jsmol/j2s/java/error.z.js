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

c$=Clazz.decorateAsClass(function(){
this.declaringClass=null;
this.methodName=null;
this.fileName=null;
this.lineNumber=0;
Clazz.instantialize(this,arguments);
},java.lang,"StackTraceElement",null,java.io.Serializable);
Clazz.makeConstructor(c$,
function(cls,method,file,line){
if(cls==null||method==null){
throw new NullPointerException();
}this.declaringClass=cls;
this.methodName=method;
this.fileName=file;
this.lineNumber=line;
},"~S,~S,~S,~N");
Clazz.overrideMethod(c$,"equals",
function(obj){
if(!(Clazz.instanceOf(obj,StackTraceElement))){
return false;
}var castObj=obj;
if((this.methodName==null)||(castObj.methodName==null)){
return false;
}if(!this.getMethodName().equals(castObj.getMethodName())){
return false;
}if(!this.getClassName().equals(castObj.getClassName())){
return false;
}var localFileName=this.getFileName();
if(localFileName==null){
if(castObj.getFileName()!=null){
return false;
}}else{
if(!localFileName.equals(castObj.getFileName())){
return false;
}}if(this.getLineNumber()!=castObj.getLineNumber()){
return false;
}return true;
},"~O");
Clazz.defineMethod(c$,"getClassName",
function(){
return(this.declaringClass==null)?"<unknown class>":this.declaringClass;
});
Clazz.defineMethod(c$,"getFileName",
function(){
return this.fileName;
});
Clazz.defineMethod(c$,"getLineNumber",
function(){
return this.lineNumber;
});
Clazz.defineMethod(c$,"getMethodName",
function(){
return(this.methodName==null)?"<unknown method>":this.methodName;
});
Clazz.overrideMethod(c$,"hashCode",
function(){
if(this.methodName==null){
return 0;
}return this.methodName.hashCode()^this.declaringClass.hashCode();
});
Clazz.defineMethod(c$,"isNativeMethod",
function(){
return this.lineNumber==-2;
});
Clazz.overrideMethod(c$,"toString",
function(){
var buf=new StringBuilder(80);
buf.append(this.getClassName());
buf.append('.');
buf.append(this.getMethodName());
if(this.isNativeMethod()){
buf.append("(Native Method)");
}else{
var fName=this.getFileName();
if(fName==null){
buf.append("(Unknown Source)");
}else{
var lineNum=this.getLineNumber();
buf.append('(');
buf.append(fName);
if(lineNum>=0){
buf.append(':');
buf.append(lineNum);
}buf.append(')');
}}return buf.toString();
});

c$=Clazz.declareType(java.lang,"Error",Throwable);

c$=Clazz.declareType(java.lang,"LinkageError",Error);

c$=Clazz.declareType(java.lang,"IncompatibleClassChangeError",LinkageError);

c$=Clazz.declareType(java.lang,"AbstractMethodError",IncompatibleClassChangeError);

c$=Clazz.declareType(java.lang,"AssertionError",Error);
Clazz.makeConstructor(c$,
function(detailMessage){
Clazz.superConstructor(this,AssertionError,[String.valueOf(detailMessage),(Clazz.instanceOf(detailMessage,Throwable)?detailMessage:null)]);
},"~O");
Clazz.makeConstructor(c$,
function(detailMessage){
this.construct(String.valueOf(detailMessage));
},"~B");
Clazz.makeConstructor(c$,
function(detailMessage){
this.construct(String.valueOf(detailMessage));
},"~N");
Clazz.makeConstructor(c$,
function(detailMessage){
this.construct(Integer.toString(detailMessage));
},"~N");
Clazz.makeConstructor(c$,
function(detailMessage){
this.construct(Long.toString(detailMessage));
},"~N");
Clazz.makeConstructor(c$,
function(detailMessage){
this.construct(Float.toString(detailMessage));
},"~N");
Clazz.makeConstructor(c$,
function(detailMessage){
this.construct(Double.toString(detailMessage));
},"~N");

c$=Clazz.declareType(java.lang,"ClassCircularityError",LinkageError);

c$=Clazz.declareType(java.lang,"ClassFormatError",LinkageError);

c$=Clazz.decorateAsClass(function(){
this.exception=null;
Clazz.instantialize(this,arguments);
},java.lang,"ExceptionInInitializerError",LinkageError);
Clazz.makeConstructor(c$,
function(){
Clazz.superConstructor(this,ExceptionInInitializerError);
this.initCause(null);
});
Clazz.makeConstructor(c$,
function(detailMessage){
Clazz.superConstructor(this,ExceptionInInitializerError,[detailMessage]);
this.initCause(null);
},"~S");
Clazz.makeConstructor(c$,
function(exception){
Clazz.superConstructor(this,ExceptionInInitializerError);
this.exception=exception;
this.initCause(exception);
},"Throwable");
Clazz.defineMethod(c$,"getException",
function(){
return this.exception;
});
Clazz.overrideMethod(c$,"getCause",
function(){
return this.exception;
});

c$=Clazz.declareType(java.lang,"IllegalAccessError",IncompatibleClassChangeError);

c$=Clazz.declareType(java.lang,"InstantiationError",IncompatibleClassChangeError);

c$=Clazz.declareType(java.lang,"VirtualMachineError",Error);

c$=Clazz.declareType(java.lang,"InternalError",VirtualMachineError);

c$=Clazz.declareType(java.lang,"NoClassDefFoundError",LinkageError);

c$=Clazz.declareType(java.lang,"NoSuchFieldError",IncompatibleClassChangeError);

c$=Clazz.declareType(java.lang,"NoSuchMethodError",IncompatibleClassChangeError);

c$=Clazz.declareType(java.lang,"OutOfMemoryError",VirtualMachineError);

c$=Clazz.declareType(java.lang,"StackOverflowError",VirtualMachineError);

c$=Clazz.declareType(java.lang,"UnknownError",VirtualMachineError);

c$=Clazz.declareType(java.lang,"UnsatisfiedLinkError",LinkageError);

c$=Clazz.declareType(java.lang,"UnsupportedClassVersionError",ClassFormatError);

c$=Clazz.declareType(java.lang,"VerifyError",LinkageError);

c$=Clazz.declareType(java.lang,"ThreadDeath",Error);
Clazz.makeConstructor(c$,
function(){
Clazz.superConstructor(this,ThreadDeath,[]);
});

c$=Clazz.declareType(java.lang,"Exception",Throwable);

c$=Clazz.declareType(java.lang,"RuntimeException",Exception);

c$=Clazz.declareType(java.lang,"ArithmeticException",RuntimeException);

c$=Clazz.declareType(java.lang,"IndexOutOfBoundsException",RuntimeException);

c$=Clazz.declareType(java.lang,"ArrayIndexOutOfBoundsException",IndexOutOfBoundsException);
Clazz.makeConstructor(c$,
function(index){
Clazz.superConstructor(this,ArrayIndexOutOfBoundsException,["Array index out of range: "+index]);
},"~N");

c$=Clazz.declareType(java.lang,"ArrayStoreException",RuntimeException);

c$=Clazz.declareType(java.lang,"ClassCastException",RuntimeException);

c$=Clazz.decorateAsClass(function(){
this.ex=null;
Clazz.instantialize(this,arguments);
},java.lang,"ClassNotFoundException",Exception);
Clazz.makeConstructor(c$,
function(){
Clazz.superConstructor(this,ClassNotFoundException,[Clazz.castNullAs("Throwable")]);
});
Clazz.makeConstructor(c$,
function(detailMessage){
Clazz.superConstructor(this,ClassNotFoundException,[detailMessage,null]);
},"~S");
Clazz.makeConstructor(c$,
function(detailMessage,exception){
Clazz.superConstructor(this,ClassNotFoundException,[detailMessage]);
this.ex=exception;
},"~S,Throwable");
Clazz.defineMethod(c$,"getException",
function(){
return this.ex;
});
Clazz.overrideMethod(c$,"getCause",
function(){
return this.ex;
});

c$=Clazz.declareType(java.lang,"CloneNotSupportedException",Exception);

c$=Clazz.declareType(java.lang,"IllegalAccessException",Exception);

c$=Clazz.declareType(java.lang,"IllegalArgumentException",RuntimeException);
Clazz.makeConstructor(c$,
function(cause){
Clazz.superConstructor(this,IllegalArgumentException,[(cause==null?null:cause.toString()),cause]);
},"Throwable");

c$=Clazz.declareType(java.lang,"IllegalMonitorStateException",RuntimeException);

c$=Clazz.declareType(java.lang,"IllegalStateException",RuntimeException);
Clazz.makeConstructor(c$,
function(cause){
Clazz.superConstructor(this,IllegalStateException,[(cause==null?null:cause.toString()),cause]);
},"Throwable");

c$=Clazz.declareType(java.lang,"IllegalThreadStateException",IllegalArgumentException);

c$=Clazz.declareType(java.lang,"InstantiationException",Exception);

c$=Clazz.declareType(java.lang,"InterruptedException",Exception);

c$=Clazz.declareType(java.lang,"NegativeArraySizeException",RuntimeException);

c$=Clazz.declareType(java.lang,"NoSuchFieldException",Exception);

c$=Clazz.declareType(java.lang,"NoSuchMethodException",Exception);

c$=Clazz.declareType(java.lang,"NullPointerException",RuntimeException);

c$=Clazz.declareType(java.lang,"NumberFormatException",IllegalArgumentException);

c$=Clazz.declareType(java.lang,"SecurityException",RuntimeException);
Clazz.makeConstructor(c$,
function(cause){
Clazz.superConstructor(this,SecurityException,[(cause==null?null:cause.toString()),cause]);
},"Throwable");

c$=Clazz.declareType(java.lang,"StringIndexOutOfBoundsException",IndexOutOfBoundsException);
Clazz.makeConstructor(c$,
function(index){
Clazz.superConstructor(this,StringIndexOutOfBoundsException,["String index out of range: "+index]);
},"~N");

c$=Clazz.declareType(java.lang,"UnsupportedOperationException",RuntimeException);
Clazz.makeConstructor(c$,
function(){
Clazz.superConstructor(this,UnsupportedOperationException,[]);
});
Clazz.makeConstructor(c$,
function(cause){
Clazz.superConstructor(this,UnsupportedOperationException,[(cause==null?null:cause.toString()),cause]);
},"Throwable");

c$=Clazz.decorateAsClass(function(){
this.target=null;
Clazz.instantialize(this,arguments);
},java.lang.reflect,"InvocationTargetException",Exception);
Clazz.makeConstructor(c$,
function(){
Clazz.superConstructor(this,java.lang.reflect.InvocationTargetException,[Clazz.castNullAs("Throwable")]);
});
Clazz.makeConstructor(c$,
function(exception){
Clazz.superConstructor(this,java.lang.reflect.InvocationTargetException,[null,exception]);
this.target=exception;
},"Throwable");
Clazz.makeConstructor(c$,
function(exception,detailMessage){
Clazz.superConstructor(this,java.lang.reflect.InvocationTargetException,[detailMessage,exception]);
this.target=exception;
},"Throwable,~S");
Clazz.defineMethod(c$,"getTargetException",
function(){
return this.target;
});
Clazz.overrideMethod(c$,"getCause",
function(){
return this.target;
});

c$=Clazz.decorateAsClass(function(){
this.undeclaredThrowable=null;
Clazz.instantialize(this,arguments);
},java.lang.reflect,"UndeclaredThrowableException",RuntimeException);
Clazz.makeConstructor(c$,
function(exception){
Clazz.superConstructor(this,java.lang.reflect.UndeclaredThrowableException);
this.undeclaredThrowable=exception;
this.initCause(exception);
},"Throwable");
Clazz.makeConstructor(c$,
function(exception,detailMessage){
Clazz.superConstructor(this,java.lang.reflect.UndeclaredThrowableException,[detailMessage]);
this.undeclaredThrowable=exception;
this.initCause(exception);
},"Throwable,~S");
Clazz.defineMethod(c$,"getUndeclaredThrowable",
function(){
return this.undeclaredThrowable;
});
Clazz.overrideMethod(c$,"getCause",
function(){
return this.undeclaredThrowable;
});

c$=Clazz.declareType(java.io,"IOException",Exception);

c$=Clazz.declareType(java.io,"CharConversionException",java.io.IOException);

c$=Clazz.declareType(java.io,"EOFException",java.io.IOException);

c$=Clazz.declareType(java.io,"FileNotFoundException",java.io.IOException);

c$=Clazz.decorateAsClass(function(){
this.bytesTransferred=0;
Clazz.instantialize(this,arguments);
},java.io,"InterruptedIOException",java.io.IOException);

c$=Clazz.declareType(java.io,"ObjectStreamException",java.io.IOException);

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

c$=Clazz.declareType(java.io,"InvalidObjectException",java.io.ObjectStreamException);

c$=Clazz.declareType(java.io,"NotActiveException",java.io.ObjectStreamException);

c$=Clazz.declareType(java.io,"NotSerializableException",java.io.ObjectStreamException);

c$=Clazz.decorateAsClass(function(){
this.eof=false;
this.length=0;
Clazz.instantialize(this,arguments);
},java.io,"OptionalDataException",java.io.ObjectStreamException);

c$=Clazz.declareType(java.io,"StreamCorruptedException",java.io.ObjectStreamException);

c$=Clazz.declareType(java.io,"SyncFailedException",java.io.IOException);

c$=Clazz.declareType(java.io,"UnsupportedEncodingException",java.io.IOException);

c$=Clazz.declareType(java.io,"UTFDataFormatException",java.io.IOException);

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

c$=Clazz.declareType(java.util,"ConcurrentModificationException",RuntimeException);
Clazz.makeConstructor(c$,
function(){
Clazz.superConstructor(this,java.util.ConcurrentModificationException,[]);
});

c$=Clazz.declareType(java.util,"EmptyStackException",RuntimeException);

c$=Clazz.decorateAsClass(function(){
this.className=null;
this.key=null;
Clazz.instantialize(this,arguments);
},java.util,"MissingResourceException",RuntimeException);
Clazz.makeConstructor(c$,
function(detailMessage,className,resourceName){
Clazz.superConstructor(this,java.util.MissingResourceException,[detailMessage]);
this.className=className;
this.key=resourceName;
},"~S,~S,~S");
Clazz.defineMethod(c$,"getClassName",
function(){
return this.className;
});
Clazz.defineMethod(c$,"getKey",
function(){
return this.key;
});

c$=Clazz.declareType(java.util,"NoSuchElementException",RuntimeException);

c$=Clazz.declareType(java.util,"TooManyListenersException",Exception);
