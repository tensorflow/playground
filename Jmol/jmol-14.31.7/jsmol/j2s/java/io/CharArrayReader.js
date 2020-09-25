Clazz.load(["java.io.Reader"],"java.io.CharArrayReader",["java.io.IOException","java.lang.ArrayIndexOutOfBoundsException","$.IllegalArgumentException"],function(){
c$=Clazz.decorateAsClass(function(){
this.buf=null;
this.pos=0;
this.markedPos=-1;
this.count=0;
Clazz.instantialize(this,arguments);
},java.io,"CharArrayReader",java.io.Reader);
Clazz.makeConstructor(c$,
function(buf){
Clazz.superConstructor(this,java.io.CharArrayReader,[buf]);
this.buf=buf;
this.count=buf.length;
},"~A");
Clazz.makeConstructor(c$,
function(buf,offset,length){
Clazz.superConstructor(this,java.io.CharArrayReader,[buf]);
if(0<=offset&&offset<=buf.length&&length>=0){
this.buf=buf;
this.pos=offset;
this.count=this.pos+length<buf.length?length:buf.length;
}else{
throw new IllegalArgumentException();
}},"~A,~N,~N");
Clazz.overrideMethod(c$,"close",
function(){
{
if(this.isOpen()){
this.buf=null;
}}});
Clazz.defineMethod(c$,"isOpen",
($fz=function(){
return this.buf!=null;
},$fz.isPrivate=true,$fz));
Clazz.overrideMethod(c$,"mark",
function(readLimit){
{
if(this.isOpen()){
this.markedPos=this.pos;
}else{
throw new java.io.IOException(("K0060"));
}}},"~N");
Clazz.overrideMethod(c$,"markSupported",
function(){
return true;
});
Clazz.defineMethod(c$,"read",
function(){
{
if(this.isOpen()){
if(this.pos!=this.count){
return this.buf[this.pos++];
}return-1;
}throw new java.io.IOException(("K0060"));
}});
Clazz.defineMethod(c$,"read",
function(buffer,offset,len){
if(0<=offset&&offset<=buffer.length&&0<=len&&len<=buffer.length-offset){
{
if(this.isOpen()){
if(this.pos<this.count){
var bytesRead=this.pos+len>this.count?this.count-this.pos:len;
System.arraycopy(this.buf,this.pos,buffer,offset,bytesRead);
this.pos+=bytesRead;
return bytesRead;
}return-1;
}throw new java.io.IOException(("K0060"));
}}throw new ArrayIndexOutOfBoundsException();
},"~A,~N,~N");
Clazz.overrideMethod(c$,"ready",
function(){
{
if(this.isOpen()){
return this.pos!=this.count;
}throw new java.io.IOException(("K0060"));
}});
Clazz.overrideMethod(c$,"reset",
function(){
{
if(this.isOpen()){
this.pos=this.markedPos!=-1?this.markedPos:0;
}else{
throw new java.io.IOException(("K0060"));
}}});
Clazz.overrideMethod(c$,"skip",
function(n){
{
if(this.isOpen()){
if(n<=0){
return 0;
}var skipped=0;
if(n<this.count-this.pos){
this.pos=this.pos+n;
skipped=n;
}else{
skipped=this.count-this.pos;
this.pos=this.count;
}return skipped;
}throw new java.io.IOException(("K0060"));
}},"~N");
});
