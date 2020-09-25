Clazz.load(["java.io.Closeable","$.Flushable","java.lang.Appendable"],"java.io.Writer",["java.lang.NullPointerException","$.StringIndexOutOfBoundsException"],function(){
c$=Clazz.decorateAsClass(function(){
this.lock=null;
Clazz.instantialize(this,arguments);
},java.io,"Writer",null,[Appendable,java.io.Closeable,java.io.Flushable]);
Clazz.makeConstructor(c$,
function(){
this.lock=this;
});
Clazz.makeConstructor(c$,
function(lock){
if(lock!=null){
this.lock=lock;
}else{
throw new NullPointerException();
}},"~O");
Clazz.defineMethod(c$,"write",
function(buf){
this.write(buf,0,buf.length);
},"~A");
Clazz.defineMethod(c$,"write",
function(oneChar){
{
var oneCharArray=Clazz.newArray(1,'\0');
oneCharArray[0]=String.fromCharCode(oneChar);
this.write(oneCharArray);
}},"~N");
Clazz.defineMethod(c$,"write",
function(str){
var buf=Clazz.newArray(str.length,'\0');
str.getChars(0,buf.length,buf,0);
{
this.write(buf);
}},"~S");
Clazz.defineMethod(c$,"write",
function(str,offset,count){
if(count>=0){
var buf=Clazz.newArray(count,'\0');
str.getChars(offset,offset+count,buf,0);
{
this.write(buf);
}}else{
throw new StringIndexOutOfBoundsException();
}},"~S,~N,~N");
Clazz.defineMethod(c$,"append",
function(c){
this.write(c.charCodeAt(0));
return this;
},"~N");
Clazz.defineMethod(c$,"append",
function(csq){
if(null==csq){
this.write("null");
}else{
this.write(csq.toString());
}return this;
},"CharSequence");
Clazz.defineMethod(c$,"append",
function(csq,start,end){
if(null==csq){
this.write("null".substring(start,end));
}else{
this.write(csq.subSequence(start,end).toString());
}return this;
},"CharSequence,~N,~N");
Clazz.defineStatics(c$,
"TOKEN_NULL","null");
});
