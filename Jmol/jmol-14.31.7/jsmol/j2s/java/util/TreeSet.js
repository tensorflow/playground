Clazz.load(["java.util.AbstractSet","$.SortedSet","$.TreeMap"],"java.util.TreeSet",["java.lang.IllegalArgumentException"],function(){
c$=Clazz.decorateAsClass(function(){
this.backingMap=null;
Clazz.instantialize(this,arguments);
},java.util,"TreeSet",java.util.AbstractSet,[java.util.SortedSet,Cloneable,java.io.Serializable]);
Clazz.makeConstructor(c$,
($fz=function(map){
Clazz.superConstructor(this,java.util.TreeSet,[]);
this.backingMap=map;
},$fz.isPrivate=true,$fz),"java.util.SortedMap");
Clazz.makeConstructor(c$,
function(){
Clazz.superConstructor(this,java.util.TreeSet,[]);
this.backingMap=new java.util.TreeMap();
});
Clazz.makeConstructor(c$,
function(collection){
this.construct();
this.addAll(collection);
},"java.util.Collection");
Clazz.makeConstructor(c$,
function(comparator){
Clazz.superConstructor(this,java.util.TreeSet,[]);
this.backingMap=new java.util.TreeMap(comparator);
},"java.util.Comparator");
Clazz.makeConstructor(c$,
function(set){
this.construct(set.comparator());
var it=set.iterator();
while(it.hasNext()){
this.add(it.next());
}
},"java.util.SortedSet");
Clazz.overrideMethod(c$,"add",
function(object){
return this.backingMap.put(object,object)==null;
},"~O");
Clazz.overrideMethod(c$,"clear",
function(){
this.backingMap.clear();
});
Clazz.defineMethod(c$,"clone",
function(){
try{
var clone=Clazz.superCall(this,java.util.TreeSet,"clone",[]);
if(Clazz.instanceOf(this.backingMap,java.util.TreeMap)){
clone.backingMap=(this.backingMap).clone();
}else{
clone.backingMap=new java.util.TreeMap(this.backingMap);
}return clone;
}catch(e){
if(Clazz.instanceOf(e,CloneNotSupportedException)){
return null;
}else{
throw e;
}
}
});
Clazz.defineMethod(c$,"comparator",
function(){
return this.backingMap.comparator();
});
Clazz.overrideMethod(c$,"contains",
function(object){
return this.backingMap.containsKey(object);
},"~O");
Clazz.overrideMethod(c$,"first",
function(){
return this.backingMap.firstKey();
});
Clazz.overrideMethod(c$,"headSet",
function(end){
var c=this.backingMap.comparator();
if(c==null){
(end).compareTo(end);
}else{
c.compare(end,end);
}return new java.util.TreeSet(this.backingMap.headMap(end));
},"~O");
Clazz.overrideMethod(c$,"isEmpty",
function(){
return this.backingMap.isEmpty();
});
Clazz.defineMethod(c$,"iterator",
function(){
return this.backingMap.keySet().iterator();
});
Clazz.overrideMethod(c$,"last",
function(){
return this.backingMap.lastKey();
});
Clazz.overrideMethod(c$,"remove",
function(object){
return this.backingMap.remove(object)!=null;
},"~O");
Clazz.overrideMethod(c$,"size",
function(){
return this.backingMap.size();
});
Clazz.overrideMethod(c$,"subSet",
function(start,end){
var c=this.backingMap.comparator();
if(c==null){
if((start).compareTo(end)<=0){
return new java.util.TreeSet(this.backingMap.subMap(start,end));
}}else{
if(c.compare(start,end)<=0){
return new java.util.TreeSet(this.backingMap.subMap(start,end));
}}throw new IllegalArgumentException();
},"~O,~O");
Clazz.overrideMethod(c$,"tailSet",
function(start){
var c=this.backingMap.comparator();
if(c==null){
(start).compareTo(start);
}else{
c.compare(start,start);
}return new java.util.TreeSet(this.backingMap.tailMap(start));
},"~O");
});
