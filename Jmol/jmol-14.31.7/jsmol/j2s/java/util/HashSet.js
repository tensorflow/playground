Clazz.load(["java.util.AbstractSet","$.Set"],"java.util.HashSet",["java.util.HashMap"],function(){
c$=Clazz.decorateAsClass(function(){
this.backingMap=null;
Clazz.instantialize(this,arguments);
},java.util,"HashSet",java.util.AbstractSet,[java.util.Set,Cloneable,java.io.Serializable]);
Clazz.makeConstructor(c$,
function(){
this.construct(new java.util.HashMap());
});
Clazz.makeConstructor(c$,
function(capacity){
this.construct(new java.util.HashMap(capacity));
},"~N");
Clazz.makeConstructor(c$,
function(capacity,loadFactor){
this.construct(new java.util.HashMap(capacity,loadFactor));
},"~N,~N");
Clazz.makeConstructor(c$,
function(collection){
this.construct(new java.util.HashMap(collection.size()<6?11:collection.size()*2));
for(var e,$e=collection.iterator();$e.hasNext()&&((e=$e.next())||true);){
this.add(e);
}
},"java.util.Collection");
Clazz.makeConstructor(c$,
function(backingMap){
Clazz.superConstructor(this,java.util.HashSet,[]);
this.backingMap=backingMap;
},"java.util.HashMap");
Clazz.overrideMethod(c$,"add",
function(object){
return this.backingMap.put(object,this)==null;
},"~O");
Clazz.overrideMethod(c$,"clear",
function(){
this.backingMap.clear();
});
Clazz.defineMethod(c$,"clone",
function(){
try{
var clone=Clazz.superCall(this,java.util.HashSet,"clone",[]);
clone.backingMap=this.backingMap.clone();
return clone;
}catch(e){
if(Clazz.instanceOf(e,CloneNotSupportedException)){
return null;
}else{
throw e;
}
}
});
Clazz.overrideMethod(c$,"contains",
function(object){
return this.backingMap.containsKey(object);
},"~O");
Clazz.overrideMethod(c$,"isEmpty",
function(){
return this.backingMap.isEmpty();
});
Clazz.defineMethod(c$,"iterator",
function(){
return this.backingMap.keySet().iterator();
});
Clazz.overrideMethod(c$,"remove",
function(object){
return this.backingMap.remove(object)!=null;
},"~O");
Clazz.overrideMethod(c$,"size",
function(){
return this.backingMap.size();
});
Clazz.defineMethod(c$,"createBackingMap",
function(capacity,loadFactor){
return new java.util.HashMap(capacity,loadFactor);
},"~N,~N");
});
