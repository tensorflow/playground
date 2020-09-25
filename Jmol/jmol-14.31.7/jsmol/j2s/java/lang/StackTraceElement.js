Clazz.load(null,"java.lang.StackTraceElement",["java.lang.NullPointerException","$.StringBuilder"],function(){
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
});
