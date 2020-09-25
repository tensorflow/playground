Clazz.load(["java.util.Hashtable"],"java.util.Properties",["java.lang.NullPointerException","$.StringBuffer"],function(){
c$=Clazz.decorateAsClass(function(){
this.builder=null;
this.defaults=null;
Clazz.instantialize(this,arguments);
},java.util,"Properties",java.util.Hashtable);

Clazz.makeConstructor(c$,
function(properties){
Clazz.superConstructor(this,java.util.Properties,[]);
this.defaults=properties;
},"java.util.Properties");
Clazz.defineMethod(c$,"dumpString",
($fz=function(buffer,string,key){
var i=0;
if(!key&&i<string.length&&(string.charAt(i)).charCodeAt(0)==(' ').charCodeAt(0)){
buffer.append("\\ ");
i++;
}for(;i<string.length;i++){
var ch=string.charAt(i);
switch(ch){
case'\t':
buffer.append("\\t");
break;
case'\n':
buffer.append("\\n");
break;
case'\f':
buffer.append("\\f");
break;
case'\r':
buffer.append("\\r");
break;
default:
if("\\#!=:".indexOf(ch)>=0||(key&&(ch).charCodeAt(0)==(' ').charCodeAt(0))){
buffer.append('\\');
}if((ch).charCodeAt(0)>=(' ').charCodeAt (0) && (ch).charCodeAt (0) <= ('~').charCodeAt(0)){
buffer.append(ch);
}else{
var hex=Integer.toHexString(ch.charCodeAt(0));
buffer.append("\\u");
for(var j=0;j<4-hex.length;j++){
buffer.append("0");
}
buffer.append(hex);
}}
}
},$fz.isPrivate=true,$fz),"StringBuilder,~S,~B");
Clazz.defineMethod(c$,"getProperty",
function(name){
var result=this.get(name);
var property=Clazz.instanceOf(result,String)?result:null;
if(property==null&&this.defaults!=null){
property=this.defaults.getProperty(name);
}return property;
},"~S");
Clazz.defineMethod(c$,"getProperty",
function(name,defaultValue){
var result=this.get(name);
var property=Clazz.instanceOf(result,String)?result:null;
if(property==null&&this.defaults!=null){
property=this.defaults.getProperty(name);
}if(property==null){
return defaultValue;
}return property;
},"~S,~S");
Clazz.defineMethod(c$,"list",
function(out){
if(out==null){
throw new NullPointerException();
}var buffer=new StringBuffer(80);
var keys=this.propertyNames();
while(keys.hasMoreElements()){
var key=keys.nextElement();
buffer.append(key);
buffer.append('=');
var property=this.get(key);
var def=this.defaults;
while(property==null){
property=def.get(key);
def=def.defaults;
}
if(property.length>40){
buffer.append(property.substring(0,37));
buffer.append("...");
}else{
buffer.append(property);
}out.println(buffer.toString());
buffer.setLength(0);
}
},"java.io.PrintStream");
Clazz.defineMethod(c$,"list",
function(writer){
if(writer==null){
throw new NullPointerException();
}var buffer=new StringBuffer(80);
var keys=this.propertyNames();
while(keys.hasMoreElements()){
var key=keys.nextElement();
buffer.append(key);
buffer.append('=');
var property=this.get(key);
var def=this.defaults;
while(property==null){
property=def.get(key);
def=def.defaults;
}
if(property.length>40){
buffer.append(property.substring(0,37));
buffer.append("...");
}else{
buffer.append(property);
}writer.println(buffer.toString());
buffer.setLength(0);
}
},"java.io.PrintWriter");
Clazz.defineMethod(c$,"load",
function($in){

},"java.io.InputStream");
Clazz.defineMethod(c$,"propertyNames",
function(){
if(this.defaults==null){
return this.keys();
}var set=new java.util.Hashtable(this.defaults.size()+this.size());
var keys=this.defaults.propertyNames();
while(keys.hasMoreElements()){
set.put(keys.nextElement(),set);
}
keys=this.keys();
while(keys.hasMoreElements()){
set.put(keys.nextElement(),set);
}
return set.keys();
});
Clazz.defineMethod(c$,"save",
function(out,comment){
try{
this.store(out,comment);
}catch(e){
if(Clazz.instanceOf(e,java.io.IOException)){
}else{
throw e;
}
}
},"java.io.OutputStream,~S");
Clazz.defineMethod(c$,"setProperty",
function(name,value){
return this.put(name,value);
},"~S,~S");
Clazz.defineMethod(c$,"store",
function(out,comment){

},"java.io.OutputStream,~S");
Clazz.defineMethod(c$,"loadFromXML",
function($in){

},"java.io.InputStream");
Clazz.defineMethod(c$,"storeToXML",
function(os,comment){

},"java.io.OutputStream,~S");
Clazz.defineMethod(c$,"storeToXML",
function(os,comment,encoding){

},"java.io.OutputStream,~S,~S");
Clazz.defineMethod(c$,"substitutePredefinedEntries",
($fz=function(s){
return s.replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll("\u0027","&apos;").replaceAll("\"","&quot;");
},$fz.isPrivate=true,$fz),"~S");
Clazz.defineStatics(c$,
"PROP_DTD_NAME","http://java.sun.com/dtd/properties.dtd",
"PROP_DTD","<?xml version=\"1.0\" encoding=\"UTF-8\"?>    <!ELEMENT properties (comment?, entry*) >    <!ATTLIST properties version CDATA #FIXED \"1.0\" >    <!ELEMENT comment (#PCDATA) >    <!ELEMENT entry (#PCDATA) >    <!ATTLIST entry key CDATA #REQUIRED >",
"NONE",0,
"SLASH",1,
"UNICODE",2,
"CONTINUE",3,
"KEY_DONE",4,
"IGNORE",5,
"lineSeparator",null);

});
