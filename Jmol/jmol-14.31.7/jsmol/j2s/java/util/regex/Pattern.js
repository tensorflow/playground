Clazz.declarePackage("java.util.regex");
Clazz.load(null,"java.util.regex.Pattern",["java.lang.IllegalArgumentException","$.StringBuffer","java.util.regex.Matcher"],function(){
c$=Clazz.decorateAsClass(function(){
this.$flags=0;
this.regexp=null;
Clazz.instantialize(this,arguments);
},java.util.regex,"Pattern",null,java.io.Serializable);
Clazz.defineMethod(c$,"matcher",
function(cs){
return new java.util.regex.Matcher(this,cs);
},"CharSequence");
Clazz.defineMethod(c$,"split",
function(input,limit){
var res=new Array(0);
var mat=this.matcher(input);
var index=0;
var curPos=0;
if(input.length()==0){
return[""];
}else{
while(mat.find()&&(index+1<limit||limit<=0)){
res[res.length]=input.subSequence(curPos,mat.start()).toString();
curPos=mat.end();
index++;
}
res[res.length]=input.subSequence(curPos,input.length()).toString();
index++;
if(limit==0){
while(--index>=0&&res[index].toString().length==0){
res.length--;
}
}}return res;
},"CharSequence,~N");
Clazz.defineMethod(c$,"split",
function(input){
return this.split(input,0);
},"CharSequence");
Clazz.defineMethod(c$,"pattern",
function(){
{
return this.regexp.source;
}return null;
});
Clazz.defineMethod(c$,"toString",
function(){
return this.pattern();
});
Clazz.defineMethod(c$,"flags",
function(){
return this.$flags;
});
c$.compile=Clazz.defineMethod(c$,"compile",
function(regex,flags){
if((flags!=0)&&((flags|239)!=239)){
throw new IllegalArgumentException("Illegal flags");
}var flagStr="g";
if((flags&8)!=0){
flagStr+="m";
}if((flags&2)!=0){
flagStr+="i";
}var pattern=new java.util.regex.Pattern();
{
pattern.regexp=new RegExp(regex,flagStr);
}return pattern;
},"~S,~N");
c$.compile=Clazz.defineMethod(c$,"compile",
function(pattern){
return java.util.regex.Pattern.compile(pattern,0);
},"~S");
c$.matches=Clazz.defineMethod(c$,"matches",
function(regex,input){
return java.util.regex.Pattern.compile(regex).matcher(input).matches();
},"~S,CharSequence");
c$.quote=Clazz.defineMethod(c$,"quote",
function(s){
var sb=new StringBuffer().append("\\Q");
var apos=0;
var k;
while((k=s.indexOf("\\E",apos))>=0){
sb.append(s.substring(apos,k+2)).append("\\\\E\\Q");
apos=k+2;
}
return sb.append(s.substring(apos)).append("\\E").toString();
},"~S");
Clazz.makeConstructor(c$,
($fz=function(){
},$fz.isPrivate=true,$fz));
Clazz.defineStatics(c$,
"UNIX_LINES",1,
"CASE_INSENSITIVE",2,
"COMMENTS",4,
"MULTILINE",8,
"LITERAL",16,
"DOTALL",32,
"UNICODE_CASE",64,
"CANON_EQ",128,
"flagsBitMask",239);
});
