Clazz.load(["java.util.Collection"],"java.util.AbstractCollection",["java.lang.StringBuilder","$.UnsupportedOperationException","java.lang.reflect.Array"],function(){
c$=Clazz.declareType(java.util,"AbstractCollection",null,java.util.Collection);
Clazz.makeConstructor(c$,
function(){
});
Clazz.overrideMethod(c$,"add",
function(object){
throw new UnsupportedOperationException();
},"~O");
Clazz.overrideMethod(c$,"addAll",
function(collection){
var result=false;
var it=collection.iterator();
while(it.hasNext()){
if(this.add(it.next())){
result=true;
}}
return result;
},"java.util.Collection");
Clazz.overrideMethod(c$,"clear",
function(){
var it=this.iterator();
while(it.hasNext()){
it.next();
it.remove();
}
});
Clazz.overrideMethod(c$,"contains",
function(object){
var it=this.iterator();
if(object!=null){
while(it.hasNext()){
if(object.equals(it.next())){
return true;
}}
}else{
while(it.hasNext()){
if(it.next()==null){
return true;
}}
}return false;
},"~O");
Clazz.overrideMethod(c$,"containsAll",
function(collection){
var it=collection.iterator();
while(it.hasNext()){
if(!this.contains(it.next())){
return false;
}}
return true;
},"java.util.Collection");
Clazz.overrideMethod(c$,"isEmpty",
function(){
return this.size()==0;
});
Clazz.overrideMethod(c$,"remove",
function(object){
var it=this.iterator();
if(object!=null){
while(it.hasNext()){
if(object.equals(it.next())){
it.remove();
return true;
}}
}else{
while(it.hasNext()){
if(it.next()==null){
it.remove();
return true;
}}
}return false;
},"~O");
Clazz.overrideMethod(c$,"removeAll",
function(collection){
var result=false;
var it=this.iterator();
while(it.hasNext()){
if(collection.contains(it.next())){
it.remove();
result=true;
}}
return result;
},"java.util.Collection");
Clazz.overrideMethod(c$,"retainAll",
function(collection){
var result=false;
var it=this.iterator();
while(it.hasNext()){
if(!collection.contains(it.next())){
it.remove();
result=true;
}}
return result;
},"java.util.Collection");
Clazz.defineMethod(c$,"toArray",
function(){
var size=this.size();
var index=0;
var it=this.iterator();
var array=new Array(size);
while(index<size){
array[index++]=it.next();
}
return array;
});
Clazz.defineMethod(c$,"toArray",
function(contents){
var size=this.size();
var index=0;
if(size>contents.length){
var ct=contents.getClass().getComponentType();
contents=java.lang.reflect.Array.newInstance(ct,size);
}for(var entry,$entry=this.iterator();$entry.hasNext()&&((entry=$entry.next())||true);){
contents[index++]=entry;
}
if(index<contents.length){
contents[index]=null;
}return contents;
},"~A");
Clazz.overrideMethod(c$,"toString",
function(){
if(this.isEmpty()){
return"[]";
}var buffer=new StringBuilder(this.size()*16);
buffer.append('[');
var it=this.iterator();
while(it.hasNext()){
var next=it.next();
if(next!==this){
buffer.append(next);
}else{
buffer.append("(this Collection)");
}if(it.hasNext()){
buffer.append(", ");
}}
buffer.append(']');
return buffer.toString();
});
});
