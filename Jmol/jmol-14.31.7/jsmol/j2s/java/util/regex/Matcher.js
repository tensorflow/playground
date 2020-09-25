//Udo Borkowski 6/13/2016 12:39:12 AM "matches"
//BH 12/25/2016 7:28:07 AM fix for find() not updating this.leftBound
//BH fix for String not having .length() or .subSequence()
//BH fix for not reinitializing correctly
//BH note that start(groupIndex) is not implemented for groupIndex > 0

Clazz.declarePackage("java.util.regex");
Clazz.load(["java.util.regex.MatchResult"],"java.util.regex.Matcher",["java.lang.IllegalArgumentException","$.IndexOutOfBoundsException","$.NullPointerException","$.StringBuffer"],function(){
c$=Clazz.decorateAsClass(function(){
this.pat=null;
this.string=null;
this.strString=null;
this.leftBound=-1;
this.rightBound=-1;
this.appendPos=0;
this.replacement=null;
this.processedRepl=null;
this.replacementParts=null;
this.results=null;
Clazz.instantialize(this,arguments);
},java.util.regex,"Matcher",null,java.util.regex.MatchResult);

Clazz.defineMethod(c$,"reset",
function(newSequence){
if(newSequence==null){
throw new NullPointerException("Empty new sequence!");
}this.string=newSequence;
this.strString = null;
return this.reset();
},"CharSequence");

Clazz.defineMethod(c$,"reset",
function(){
this.leftBound=0;
this.rightBound=this.string.length();
this.appendPos=0;
this.replacement=null;
{
var flags=""+(this.pat.regexp.ignoreCase?"i":"")
+(this.pat.regexp.global?"g":"")
+(this.pat.regexp.multiline?"m":"");
this.pat.regexp=new RegExp(this.pat.regexp.source,flags);
}return this;
});

Clazz.defineMethod(c$,"find",
function(startIndex){
return this.findFrom(startIndex);
},"~N");

Clazz.defineMethod(c$,"find",
function(){
// 'find next'
return this.findImpl();
});

Clazz.defineMethod(c$,"findFrom",
function(startIndex){
// BH for SAEM
var stringLength=this.string.length();
if(startIndex<0||startIndex>stringLength)throw new IndexOutOfBoundsException("Out of bound "+startIndex);
this.leftBound = startIndex;
this.rightBound = stringLength;
return this.findImpl();
},"~N");

Clazz.defineMethod(c$,"findImpl",
function(){
// BH for SAEM
if (this.strString == null)
  this.strString = this.string.toString();
var s = (this.rightBound == this.strString.length ? this.strString : this.string.subSequence(0,this.rightBound));
this.pat.regexp.lastIndex = this.leftBound;
this.results=this.pat.regexp.exec(s);
this.leftBound = this.pat.regexp.lastIndex;
return(this.results!=null);
});

Clazz.defineMethod(c$,"start",
function(){
return this.start(0);
});

Clazz.defineMethod(c$,"start",
function(groupIndex){
return this.startImpl(groupIndex);
},"~N");

Clazz.defineMethod(c$,"startImpl",
function(groupIndex){
// BH SAEM
// NOTE: TODO groupIndex is not implemented!
return this.pat.regexp.lastIndex - this.results[0].length;
},"~N");

Clazz.defineMethod(c$,"end",
function(){
return this.end(0);
});

Clazz.defineMethod(c$,"end",
function(groupIndex){
  return this.pat.regexp.lastIndex;
},"~N");


Clazz.defineMethod(c$,"appendReplacement",
function(sb,replacement){
this.processedRepl=this.processReplacement(replacement);
sb.append(this.string.subSequence(this.appendPos,this.start()));
sb.append(this.processedRepl);
this.appendPos=this.end();
return this;
},"StringBuffer,~S");
Clazz.defineMethod(c$,"processReplacement",
($fz=function(replacement){
if(this.replacement!=null&&this.replacement.equals(replacement)){
if(this.replacementParts==null){
return this.processedRepl;
}else{
var sb=new StringBuffer();
for(var i=0;i<this.replacementParts.length;i++){
sb.append(this.replacementParts[i]);
}
return sb.toString();
}}else{
this.replacement=replacement;
var repl=replacement.toCharArray();
var res=new StringBuffer();
this.replacementParts=null;
var index=0;
var replacementPos=0;
var nextBackSlashed=false;
while(index<repl.length){
if((repl[index]).charCodeAt(0)==('\\').charCodeAt(0)&&!nextBackSlashed){
nextBackSlashed=true;
index++;
}if(nextBackSlashed){
res.append(repl[index]);
nextBackSlashed=false;
}else{
if((repl[index]).charCodeAt(0)==('$').charCodeAt(0)){
if(this.replacementParts==null){
this.replacementParts=new Array(0);
}try{
var gr=Integer.parseInt(String.instantialize(repl,++index,1));
if(replacementPos!=res.length()){
this.replacementParts[this.replacementParts.length]=res.subSequence(replacementPos,res.length());
replacementPos=res.length();
}this.replacementParts[this.replacementParts.length]=((Clazz.isClassDefined("java.util.regex.Matcher$1")?0:java.util.regex.Matcher.$Matcher$1$()),Clazz.innerTypeInstance(java.util.regex.Matcher$1,this,null));
var group=this.group(gr);
replacementPos+=group.length;
res.append(group);
}catch(e$$){
if(Clazz.instanceOf(e$$,IndexOutOfBoundsException)){
var iob=e$$;
{
throw iob;
}
}else if(Clazz.instanceOf(e$$,Exception)){
var e=e$$;
{
throw new IllegalArgumentException("Illegal regular expression format");
}
}else{
throw e$$;
}
}
}else{
res.append(repl[index]);
}}index++;
}
if(this.replacementParts!=null&&replacementPos!=res.length()){
this.replacementParts[this.replacementParts.length]=res.subSequence(replacementPos,res.length());
}return res.toString();
}},$fz.isPrivate=true,$fz),"~S");


Clazz.defineMethod(c$,"region",
function(leftBound,rightBound){
if(leftBound>rightBound||leftBound<0||rightBound<0||leftBound>this.string.length()||rightBound>this.string.length()){
throw new IndexOutOfBoundsException(leftBound+" is out of bound of "+rightBound);
}this.leftBound=leftBound;
this.rightBound=rightBound;
this.results=null;
this.appendPos=0;
this.replacement=null;
return this;
},"~N,~N");
Clazz.defineMethod(c$,"appendTail",
function(sb){
return sb.append(this.string.subSequence(this.appendPos,this.string.length()));
},"StringBuffer");
Clazz.defineMethod(c$,"replaceFirst",
function(replacement){
this.reset();
if(this.findImpl()){
var sb=new StringBuffer();
this.appendReplacement(sb,replacement);
return this.appendTail(sb).toString();
}return this.string.toString();
},"~S");
Clazz.defineMethod(c$,"replaceAll",
function(replacement){
var sb=new StringBuffer();
this.reset();
while(this.findImpl()){
this.appendReplacement(sb,replacement);
}
return this.appendTail(sb).toString();
},"~S");
Clazz.defineMethod(c$,"pattern",
function(){
return this.pat;
});
Clazz.defineMethod(c$,"group",
function(groupIndex){
if(this.results==null||groupIndex<0||groupIndex>this.results.length){
return null;
}return this.results[groupIndex];
},"~N");
Clazz.defineMethod(c$,"group",
function(){
return this.group(0);
});

Clazz.defineMethod(c$,"findAt",
($fz=function(startIndex){
// BH  what is this? 
return-1;
},$fz.isPrivate=true,$fz),"~N");

Clazz.defineMethod(c$,"matches",
function(){
// UB: the find must match the complete input and not modify the RE object
var old_lastIndex = this.pat.regexp.lastIndex;
try {
this.findImpl();
var r = this.results;
return r && r.length > 0 && r[0].length === r.input.length;
} finally {
// Restore the old state of the RE object
this.pat.regexp.lastIndex = old_lastIndex;
}
});

c$.quoteReplacement=Clazz.defineMethod(c$,"quoteReplacement",
function(string){
if(string.indexOf('\\') < 0 && string.indexOf ('$')<0)return string;
var res=new StringBuffer(string.length*2);
var ch;
var len=string.length;
for(var i=0;i<len;i++){
switch(ch=string.charAt(i)){
case'$':
res.append('\\');
res.append('$');
break;
case'\\':
res.append('\\');
res.append('\\');
break;
default:
res.append(ch);
}
}
return res.toString();
},"~S");
Clazz.defineMethod(c$,"lookingAt",
function(){
return false;
});
Clazz.overrideMethod(c$,"groupCount",
function(){
return this.results==null?0:this.results.length;
});
Clazz.defineMethod(c$,"toMatchResult",
function(){
return this;
});
Clazz.defineMethod(c$,"useAnchoringBounds",
function(value){
return this;
},"~B");
Clazz.defineMethod(c$,"hasAnchoringBounds",
function(){
return false;
});
Clazz.defineMethod(c$,"useTransparentBounds",
function(value){
return this;
},"~B");
Clazz.defineMethod(c$,"hasTransparentBounds",
function(){
return false;
});
Clazz.defineMethod(c$,"regionStart",
function(){
return this.leftBound;
});
Clazz.defineMethod(c$,"regionEnd",
function(){
return this.rightBound;
});
Clazz.defineMethod(c$,"requireEnd",
function(){
return false;
});
Clazz.defineMethod(c$,"hitEnd",
function(){
return false;
});
Clazz.defineMethod(c$,"usePattern",
function(pat){
if(pat==null){
throw new IllegalArgumentException("Empty pattern!");
}this.pat=pat;
this.results=null;
return this;
},"java.util.regex.Pattern");
Clazz.makeConstructor(c$,
function(pat,cs){
this.pat=pat;
if (typeof cs.length == "number")
 cs = new StringBuffer(cs);
this.string=cs;
this.leftBound=0;
this.rightBound=this.string.length();
},"java.util.regex.Pattern,CharSequence");
c$.$Matcher$1$=function(){
Clazz.pu$h(c$);
c$=Clazz.decorateAsClass(function(){
Clazz.prepareCallback(this,arguments);
this.grN=0;
Clazz.instantialize(this,arguments);
},java.util.regex,"Matcher$1");
Clazz.prepareFields(c$,function(){
this.grN=gr;
});
Clazz.overrideMethod(c$,"toString",
function(){
return this.b$["java.util.regex.Matcher"].group(this.grN);
});
c$=Clazz.p0p();
};
Clazz.defineStatics(c$,
"MODE_FIND",1,
"MODE_MATCH",2);
});
