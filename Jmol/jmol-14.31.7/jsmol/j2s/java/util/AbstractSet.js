Clazz.load(["java.util.AbstractCollection","$.Set"],"java.util.AbstractSet",null,function(){
c$=Clazz.declareType(java.util,"AbstractSet",java.util.AbstractCollection,java.util.Set);
Clazz.overrideMethod(c$,"equals",
function(object){
if(this===object){
return true;
}if(Clazz.instanceOf(object,java.util.Set)){
var s=object;
return this.size()==s.size()&&this.containsAll(s);
}return false;
},"~O");
Clazz.overrideMethod(c$,"hashCode",
function(){
var result=0;
var it=this.iterator();
while(it.hasNext()){
var next=it.next();
result+=next==null?0:next.hashCode();
}
return result;
});
Clazz.overrideMethod(c$,"removeAll",
function(collection){
var result=false;
if(this.size()<=collection.size()){
var it=this.iterator();
while(it.hasNext()){
if(collection.contains(it.next())){
it.remove();
result=true;
}}
}else{
var it=collection.iterator();
while(it.hasNext()){
result=this.remove(it.next())||result;
}
}return result;
},"java.util.Collection");
});
