Clazz.load(["java.util.AbstractList"],"java.util.AbstractSequentialList",["java.lang.IndexOutOfBoundsException"],function(){
c$=Clazz.declareType(java.util,"AbstractSequentialList",java.util.AbstractList);
Clazz.defineMethod(c$,"add",
function(location,object){
this.listIterator(location).add(object);
},"~N,~O");
Clazz.defineMethod(c$,"addAll",
function(location,collection){
var it=this.listIterator(location);
var colIt=collection.iterator();
var next=it.nextIndex();
while(colIt.hasNext()){
it.add(colIt.next());
it.previous();
}
return next!=it.nextIndex();
},"~N,java.util.Collection");
Clazz.overrideMethod(c$,"get",
function(location){
try{
return this.listIterator(location).next();
}catch(e){
if(Clazz.instanceOf(e,java.util.NoSuchElementException)){
throw new IndexOutOfBoundsException();
}else{
throw e;
}
}
},"~N");
Clazz.overrideMethod(c$,"iterator",
function(){
return this.listIterator(0);
});
Clazz.defineMethod(c$,"remove",
function(location){
try{
var it=this.listIterator(location);
var result=it.next();
it.remove();
return result;
}catch(e){
if(Clazz.instanceOf(e,java.util.NoSuchElementException)){
throw new IndexOutOfBoundsException();
}else{
throw e;
}
}
},"~N");
Clazz.overrideMethod(c$,"set",
function(location,object){
var it=this.listIterator(location);
var result=it.next();
it.set(object);
return result;
},"~N,~O");
});
