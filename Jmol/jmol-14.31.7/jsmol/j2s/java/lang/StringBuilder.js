Clazz.load(["java.lang.AbstractStringBuilder","$.Appendable"],"java.lang.StringBuilder",["java.lang.Double","$.Float","$.Long"],function(){
c$=Clazz.declareType(java.lang,"StringBuilder",AbstractStringBuilder,[Appendable,CharSequence,java.io.Serializable]);
Clazz.makeConstructor(c$,
function(seq){
Clazz.superConstructor(this,StringBuilder,[seq.toString()]);
},"CharSequence");
Clazz.defineMethod(c$,"append",
function(b){
this.append0(b?"true":"false");
return this;
},"~B");
Clazz.defineMethod(c$,"append",
function(c){
this.append0(c);
return this;
},"~N");
Clazz.defineMethod(c$,"append",
function(i){
this.append0(Integer.toString(i));
return this;
},"~N");
Clazz.defineMethod(c$,"append",
function(lng){
this.append0(Long.toString(lng));
return this;
},"~N");
Clazz.defineMethod(c$,"append",
function(f){
this.append0(Float.toString(f));
return this;
},"~N");
Clazz.defineMethod(c$,"append",
function(d){
this.append0(Double.toString(d));
return this;
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
function(str){
this.append0(str);
return this;
},"~S");
Clazz.defineMethod(c$,"append",
function(sb){
if(sb==null){
this.appendNull();
}else{
this.append0(sb.getValue(),0,sb.length());
}return this;
},"StringBuffer");
Clazz.defineMethod(c$,"append",
function(ch){
this.append0(ch);
return this;
},"~A");
Clazz.defineMethod(c$,"append",
function(str,offset,len){
this.append0(str,offset,len);
return this;
},"~A,~N,~N");
Clazz.defineMethod(c$,"append",
function(csq){
if(csq==null){
this.appendNull();
}else{
this.append0(csq.toString());
}return this;
},"CharSequence");
Clazz.defineMethod(c$,"append",
function(csq,start,end){
this.append0(csq,start,end);
return this;
},"CharSequence,~N,~N");
Clazz.defineMethod(c$,"$delete",
function(start,end){
this.delete0(start,end);
return this;
},"~N,~N");
Clazz.defineMethod(c$,"deleteCharAt",
function(index){
this.deleteCharAt0(index);
return this;
},"~N");
Clazz.defineMethod(c$,"insert",
function(offset,b){
this.insert0(offset,b?"true":"false");
return this;
},"~N,~B");
Clazz.defineMethod(c$,"insert",
function(offset,c){
this.insert0(offset,c);
return this;
},"~N,~N");
Clazz.defineMethod(c$,"insert",
function(offset,i){
this.insert0(offset,Integer.toString(i));
return this;
},"~N,~N");
Clazz.defineMethod(c$,"insert",
function(offset,l){
this.insert0(offset,Long.toString(l));
return this;
},"~N,~N");
Clazz.defineMethod(c$,"insert",
function(offset,f){
this.insert0(offset,Float.toString(f));
return this;
},"~N,~N");
Clazz.defineMethod(c$,"insert",
function(offset,d){
this.insert0(offset,Double.toString(d));
return this;
},"~N,~N");
Clazz.defineMethod(c$,"insert",
function(offset,obj){
this.insert0(offset,obj==null?"null":obj.toString());
return this;
},"~N,~O");
Clazz.defineMethod(c$,"insert",
function(offset,str){
this.insert0(offset,str);
return this;
},"~N,~S");
Clazz.defineMethod(c$,"insert",
function(offset,ch){
this.insert0(offset,ch);
return this;
},"~N,~A");
Clazz.defineMethod(c$,"insert",
function(offset,str,strOffset,strLen){
this.insert0(offset,str,strOffset,strLen);
return this;
},"~N,~A,~N,~N");
Clazz.defineMethod(c$,"insert",
function(offset,s){
this.insert0(offset,s==null?"null":s.toString());
return this;
},"~N,CharSequence");
Clazz.defineMethod(c$,"insert",
function(offset,s,start,end){
this.insert0(offset,s,start,end);
return this;
},"~N,CharSequence,~N,~N");
Clazz.defineMethod(c$,"replace",
function(start,end,str){
this.replace0(start,end,str);
return this;
},"~N,~N,~S");
Clazz.defineMethod(c$,"reverse",
function(){
this.reverse0();
return this;
});
});
