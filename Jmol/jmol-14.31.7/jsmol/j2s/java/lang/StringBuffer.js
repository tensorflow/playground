Clazz.load(["java.lang.AbstractStringBuilder","$.Appendable"],"java.lang.StringBuffer",["java.lang.Character","$.Double","$.Float","$.Long"],function(){
c$=Clazz.declareType(java.lang,"StringBuffer",AbstractStringBuilder,[Appendable,java.io.Serializable,CharSequence]);
Clazz.makeConstructor(c$,
function(cs){
if(cs==null){
throw new NullPointerException();
}
Clazz.superConstructor(this,StringBuffer,[cs.toString()]);
},"CharSequence");
Clazz.defineMethod(c$,"append",
function(b){
return this.append(b?"true":"false");
},"~B");
Clazz.defineMethod(c$,"append",
function(ch){
this.append0(ch);
return this;
},"~N");
Clazz.defineMethod(c$,"append",
function(d){
return this.append(Double.toString(d));
},"~N");
Clazz.defineMethod(c$,"append",
function(obj){
if(obj==null){
this.appendNull();
}else{
this.append0(obj.toString());
}return this;
},"~O");
Clazz.defineMethod(c$,"append",
function(string){
this.append0(string);
return this;
},"~S");
Clazz.defineMethod(c$,"append",
function(sb){
if(sb==null){
this.appendNull();
}else{
{
this.append0(sb.getValue(),0,sb.length());
}}return this;
},"StringBuffer");
Clazz.defineMethod(c$,"append",
function(chars){
this.append0(chars);
return this;
},"~A");
Clazz.defineMethod(c$,"append",
function(chars,start,length){
this.append0(chars,start,length);
return this;
},"~A,~N,~N");
Clazz.defineMethod(c$,"append",
function(s){
if(s==null){
this.appendNull();
}else{
this.append0(s.toString());
}return this;
},"CharSequence");
Clazz.defineMethod(c$,"append",
function(s,start,end){
this.append0(s,start,end);
return this;
},"CharSequence,~N,~N");
Clazz.defineMethod(c$,"appendCodePoint",
function(codePoint){
return this.append(Character.toChars(codePoint));
},"~N");
Clazz.defineMethod(c$,"$delete",
function(start,end){
this.delete0(start,end);
return this;
},"~N,~N");
Clazz.defineMethod(c$,"deleteCharAt",
function(location){
this.deleteCharAt0(location);
return this;
},"~N");
Clazz.defineMethod(c$,"insert",
function(index,ch){
this.insert0(index,ch);
return this;
},"~N,~N");
Clazz.defineMethod(c$,"insert",
function(index,b){
return this.insert(index,b?"true":"false");
},"~N,~B");
Clazz.defineMethod(c$,"insert",
function(index,i){
return this.insert(index,Integer.toString(i));
},"~N,~N");
Clazz.defineMethod(c$,"insert",
function(index,l){
return this.insert(index,Long.toString(l));
},"~N,~N");
Clazz.defineMethod(c$,"insert",
function(index,d){
return this.insert(index,Double.toString(d));
},"~N,~N");
Clazz.defineMethod(c$,"insert",
function(index,f){
return this.insert(index,Float.toString(f));
},"~N,~N");
Clazz.defineMethod(c$,"insert",
function(index,obj){
return this.insert(index,obj==null?"null":obj.toString());
},"~N,~O");
Clazz.defineMethod(c$,"insert",
function(index,string){
this.insert0(index,string);
return this;
},"~N,~S");
Clazz.defineMethod(c$,"insert",
function(index,chars){
this.insert0(index,chars);
return this;
},"~N,~A");
Clazz.defineMethod(c$,"insert",
function(index,chars,start,length){
this.insert0(index,chars,start,length);
return this;
},"~N,~A,~N,~N");
Clazz.defineMethod(c$,"insert",
function(index,s){
this.insert0(index,s==null?"null":s.toString());
return this;
},"~N,CharSequence");
Clazz.defineMethod(c$,"insert",
function(index,s,start,end){
this.insert0(index,s,start,end);
return this;
},"~N,CharSequence,~N,~N");
Clazz.defineMethod(c$,"replace",
function(start,end,string){
this.replace0(start,end,string);
return this;
},"~N,~N,~S");
Clazz.defineMethod(c$,"reverse",
function(){
this.reverse0();
return this;
});
Clazz.overrideMethod(c$,"subSequence",
function(start,end){
return Clazz.superCall(this,StringBuffer,"substring",[start,end]);
},"~N,~N");
});
