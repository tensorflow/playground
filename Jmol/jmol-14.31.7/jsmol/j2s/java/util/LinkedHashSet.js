Clazz.load(["java.util.HashSet","$.Set"],"java.util.LinkedHashSet",["java.util.LinkedHashMap"],function(){
c$=Clazz.declareType(java.util,"LinkedHashSet",java.util.HashSet,[java.util.Set,Cloneable,java.io.Serializable]);
Clazz.makeConstructor(c$,
function(){
Clazz.superConstructor(this,java.util.LinkedHashSet,[new java.util.LinkedHashMap()]);
});
Clazz.makeConstructor(c$,
function(capacity){
Clazz.superConstructor(this,java.util.LinkedHashSet,[new java.util.LinkedHashMap(capacity)]);
},"~N");
Clazz.makeConstructor(c$,
function(capacity,loadFactor){
Clazz.superConstructor(this,java.util.LinkedHashSet,[new java.util.LinkedHashMap(capacity,loadFactor)]);
},"~N,~N");
Clazz.makeConstructor(c$,
function(collection){
Clazz.superConstructor(this,java.util.LinkedHashSet,[new java.util.LinkedHashMap(collection.size()<6?11:collection.size()*2)]);
for(var e,$e=collection.iterator();$e.hasNext()&&((e=$e.next())||true);){
this.add(e);
}
},"java.util.Collection");
Clazz.overrideMethod(c$,"createBackingMap",
function(capacity,loadFactor){
return new java.util.LinkedHashMap(capacity,loadFactor);
},"~N,~N");
});
