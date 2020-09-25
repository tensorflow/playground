// BH minor efficiencies only

Clazz.load(["java.util.AbstractMap","$.AbstractSet","$.Iterator","$.Map","$.MapEntry"],"java.util.HashMap",["java.lang.IllegalArgumentException","$.IllegalStateException","java.util.AbstractCollection","$.Arrays","$.ConcurrentModificationException","java.util.MapEntry.Type","java.util.NoSuchElementException"],function(){
c$=Clazz.decorateAsClass(function(){
this.elementCount=0;
this.elementData=null;
this.loadFactor=0;
this.threshold=0;
this.modCount=0;
Clazz.instantialize(this,arguments);
},java.util,"HashMap",java.util.AbstractMap,[java.util.Map,Cloneable,java.io.Serializable]);
Clazz.defineMethod(c$,"newElementArray",
function(s){
return new Array(s);
},"~N");
Clazz.makeConstructor(c$,
function(){
this.construct(16);
});
Clazz.makeConstructor(c$,
function(capacity){
Clazz.superConstructor(this,java.util.HashMap,[]);
if(capacity>=0){
this.elementCount=0;
this.elementData=this.newElementArray(capacity==0?1:capacity);
this.loadFactor=0.75;
this.computeMaxSize();
}else{
throw new IllegalArgumentException();
}},"~N");
Clazz.makeConstructor(c$,
function(capacity,loadFactor){
Clazz.superConstructor(this,java.util.HashMap,[]);
if(capacity>=0&&loadFactor>0){
this.elementCount=0;
this.elementData=this.newElementArray(capacity==0?1:capacity);
this.loadFactor=loadFactor;
this.computeMaxSize();
}else{
throw new IllegalArgumentException();
}},"~N,~N");
Clazz.makeConstructor(c$,
function(map){
this.construct(map.size()<6?11:map.size()*2);
this.putAllAM(map);
},"java.util.Map");


/*
Clazz.makeConstructor(c$,
function(capacity,loadFactor){
this.doConstruct(capacity,loadFactor);
},"~N,~N");

Clazz.defineMethod(c$, "doConstruct",
function(capacity,loadFactor) {
capacity || (capacity = 16);
loadFactor || (loadFactor = 0.75);
if (typeof capacity != "number") {
 var map = capacity;
 this.loadFactor=loadFactor;
 this.elementData=this.newElementArray(map.size()<6?11:map.size()*2);
 this.computeMaxSize();
 this.putAllAM(map);
 return;
}

//Clazz.superConstructor(this,java.util.HashMap,[]);
if(capacity>=0&&loadFactor>0){
this.elementData=this.newElementArray(capacity==0?1:capacity);
this.loadFactor=loadFactor;
this.computeMaxSize();
}else{
throw new IllegalArgumentException();
}
},"~N,~N");

//Clazz.makeConstructor(c$,
//function(map){
//this.construct(map.size()<6?11:map.size()*2);
//Clazz.superCall(this,java.util.HashMap,"putAll",[map]);
//},"java.util.Map");

*/
Clazz.overrideMethod(c$,"clear",
function(){
if(this.elementCount>0){
this.elementCount=0;
java.util.Arrays.fill(this.elementData,null);
this.modCount++;
}});
Clazz.defineMethod(c$,"clone",
function(){
  return this.cloneHM();
});

Clazz.defineMethod(c$,"cloneHM",
function(){
try{
var map=this.cloneAM();//Clazz.superCall(this,java.util.HashMap,"clone",[]);
map.elementData=this.newElementArray(this.elementData.length);
var entry;
for(var i=0;i<this.elementData.length;i++){
if((entry=this.elementData[i])!=null){
map.elementData[i]=entry.clone();
}}
return map;
}catch(e){
if(Clazz.instanceOf(e,CloneNotSupportedException)){
return null;
}else{
throw e;
}
}
});
Clazz.defineMethod(c$,"computeMaxSize",
($fz=function(){
this.threshold=Math.round((this.elementData.length*this.loadFactor));
},$fz.isPrivate=true,$fz));
Clazz.overrideMethod(c$,"containsKey",
function(key){
return this.getEntry(key)!=null;
},"~O");
Clazz.defineMethod(c$,"keysEqual",
function(k1,entry){
var k1Hash=k1==null?0:k1.hashCode();
if(k1Hash!=entry.origKeyHash){
return false;
}if(k1==null&&entry.key==null){
return true;
}return k1.equals(entry.key);
},"~O,java.util.HashMap.Entry");
Clazz.overrideMethod(c$,"containsValue",
function(value){
if(value!=null){
for(var i=this.elementData.length;--i>=0;){
var entry=this.elementData[i];
while(entry!=null){
if(value.equals(entry.value)){
return true;
}entry=entry.next;
}
}
}else{
for(var i=this.elementData.length;--i>=0;){
var entry=this.elementData[i];
while(entry!=null){
if(entry.value==null){
return true;
}entry=entry.next;
}
}
}return false;
},"~O");
Clazz.overrideMethod(c$,"entrySet",
function(){
return new java.util.HashMap.HashMapEntrySet(this);
});
Clazz.overrideMethod(c$,"get",
function(key){
var m=this.getEntry(key);
if(m!=null){
return m.value;
}return null;
},"~O");
Clazz.defineMethod(c$,"getEntry",
function(key){
var index=this.getModuloHash(key);
return this.findEntry(key,index);
},"~O");
Clazz.defineMethod(c$,"getModuloHash",
function(key){
if(key==null){
return 0;
}return(key.hashCode()&0x7FFFFFFF)%this.elementData.length;
},"~O");
Clazz.defineMethod(c$,"findEntry",
function(key,index){
var m;
m=this.elementData[index];
if(key!=null){
while(m!=null&&!this.keysEqual(key,m)){
m=m.next;
}
}else{
while(m!=null&&m.key!=null){
m=m.next;
}
}return m;
},"~O,~N");
Clazz.overrideMethod(c$,"isEmpty",
function(){
return this.elementCount==0;
});
Clazz.overrideMethod(c$,"keySet",
function(){
if(this.$keySet==null){
this.$keySet=((Clazz.isClassDefined("java.util.HashMap$1")?0:java.util.HashMap.$HashMap$1$()),Clazz.innerTypeInstance(java.util.HashMap$1,this,null));
}return this.$keySet;
});
Clazz.overrideMethod(c$,"put",
function(key,value){
var index=this.getModuloHash(key);
var entry=this.findEntry(key,index);
if(entry==null){
this.modCount++;
if(++this.elementCount>this.threshold){
this.rehash();
index=key==null?0:(key.hashCode()&0x7FFFFFFF)%this.elementData.length;
}entry=this.createEntry(key,index,value);
return null;
}var result=entry.value;
entry.value=value;
return result;
},"~O,~O");
Clazz.defineMethod(c$,"createEntry",
function(key,index,value){
var entry=new java.util.HashMap.Entry(key,value);
entry.next=this.elementData[index];
this.elementData[index]=entry;
return entry;
},"~O,~N,~O");
Clazz.defineMethod(c$,"putAll",
function(map){
if(!map.isEmpty()){
var capacity=this.elementCount+map.size();
if(capacity>this.threshold){
this.rehash(capacity);
}
this.putAllAM(map);

}},"java.util.Map");
Clazz.defineMethod(c$,"rehash",
function(capacity){
var length=(capacity==0?1:capacity<<1);
var newData=this.newElementArray(length);
for(var i=0;i<this.elementData.length;i++){
var entry=this.elementData[i];
while(entry!=null){
var key=entry.key;
var index=key==null?0:(key.hashCode()&0x7FFFFFFF)%length;
var next=entry.next;
entry.next=newData[index];
newData[index]=entry;
entry=next;
}
}
this.elementData=newData;
this.computeMaxSize();
},"~N");
Clazz.defineMethod(c$,"rehash",
function(){
this.rehash(this.elementData.length);
});
Clazz.overrideMethod(c$,"remove",
function(key){
var entry=this.removeEntry(key);
if(entry!=null){
return entry.value;
}return null;
},"~O");
Clazz.defineMethod(c$,"removeEntry",
function(key){
var index=0;
var entry;
var last=null;
if(key!=null){
index=(key.hashCode()&0x7FFFFFFF)%this.elementData.length;
entry=this.elementData[index];
while(entry!=null&&!this.keysEqual(key,entry)){
last=entry;
entry=entry.next;
}
}else{
entry=this.elementData[0];
while(entry!=null&&entry.key!=null){
last=entry;
entry=entry.next;
}
}if(entry==null){
return null;
}if(last==null){
this.elementData[index]=entry.next;
}else{
last.next=entry.next;
}this.modCount++;
this.elementCount--;
return entry;
},"~O");
Clazz.overrideMethod(c$,"size",
function(){
return this.elementCount;
});
Clazz.overrideMethod(c$,"values",
function(){
if(this.valuesCollection==null){
this.valuesCollection=((Clazz.isClassDefined("java.util.HashMap$2")?0:java.util.HashMap.$HashMap$2$()),Clazz.innerTypeInstance(java.util.HashMap$2,this,null));
}return this.valuesCollection;
});
c$.$HashMap$1$=function(){
Clazz.pu$h(self.c$);
c$=Clazz.declareAnonymous(java.util,"HashMap$1",java.util.AbstractSet);
Clazz.overrideMethod(c$,"contains",
function(object){
return this.b$["java.util.HashMap"].containsKey(object);
},"~O");
Clazz.overrideMethod(c$,"size",
function(){
return this.b$["java.util.HashMap"].size();
});
Clazz.overrideMethod(c$,"clear",
function(){
this.b$["java.util.HashMap"].clear();
});
Clazz.overrideMethod(c$,"remove",
function(key){
if(this.b$["java.util.HashMap"].containsKey(key)){
this.b$["java.util.HashMap"].remove(key);
return true;
}return false;
},"~O");
Clazz.overrideMethod(c$,"iterator",
function(){
return new java.util.HashMap.HashMapIterator(((Clazz.isClassDefined("java.util.HashMap$1$1")?0:java.util.HashMap.$HashMap$1$1$()),Clazz.innerTypeInstance(java.util.HashMap$1$1,this,null)),this.b$["java.util.HashMap"]);
});
c$=Clazz.p0p();
};
c$.$HashMap$1$1$=function(){
Clazz.pu$h(self.c$);
c$=Clazz.declareAnonymous(java.util,"HashMap$1$1",null,java.util.MapEntry.Type);
Clazz.overrideMethod(c$,"get",
function(entry){
return entry.key;
},"java.util.MapEntry");
c$=Clazz.p0p();
};
c$.$HashMap$2$=function(){
Clazz.pu$h(self.c$);
c$=Clazz.declareAnonymous(java.util,"HashMap$2",java.util.AbstractCollection);
Clazz.overrideMethod(c$,"contains",
function(object){
return this.b$["java.util.HashMap"].containsValue(object);
},"~O");
Clazz.overrideMethod(c$,"size",
function(){
return this.b$["java.util.HashMap"].size();
});
Clazz.overrideMethod(c$,"clear",
function(){
this.b$["java.util.HashMap"].clear();
});
Clazz.overrideMethod(c$,"iterator",
function(){
return new java.util.HashMap.HashMapIterator(((Clazz.isClassDefined("java.util.HashMap$2$1")?0:java.util.HashMap.$HashMap$2$1$()),Clazz.innerTypeInstance(java.util.HashMap$2$1,this,null)),this.b$["java.util.HashMap"]);
});
c$=Clazz.p0p();
};
c$.$HashMap$2$1$=function(){
Clazz.pu$h(self.c$);
c$=Clazz.declareAnonymous(java.util,"HashMap$2$1",null,java.util.MapEntry.Type);
Clazz.overrideMethod(c$,"get",
function(entry){
return entry.value;
},"java.util.MapEntry");
c$=Clazz.p0p();
};
Clazz.pu$h(self.c$);
c$=Clazz.decorateAsClass(function(){
this.origKeyHash=0;
this.next=null;
Clazz.instantialize(this,arguments);
},java.util.HashMap,"Entry",java.util.MapEntry);
Clazz.makeConstructor(c$,
function(a,b){
Clazz.superConstructor(this,java.util.HashMap.Entry,[a,b]);
this.origKeyHash=(a==null?0:a.hashCode());
},"~O,~O");
Clazz.defineMethod(c$,"clone",
function(){
var a=Clazz.superCall(this,java.util.HashMap.Entry,"clone",[]);
if(this.next!=null){
a.next=this.next.clone();
}return a;
});
c$=Clazz.p0p();
Clazz.pu$h(self.c$);
c$=Clazz.decorateAsClass(function(){
this.position=0;
this.expectedModCount=0;
this.type=null;
this.canRemove=false;
this.entry=null;
this.lastEntry=null;
this.associatedMap=null;
Clazz.instantialize(this,arguments);
},java.util.HashMap,"HashMapIterator",null,java.util.Iterator);
Clazz.makeConstructor(c$,
function(a,b){
this.associatedMap=b;
this.type=a;
this.expectedModCount=b.modCount;
},"java.util.MapEntry.Type,java.util.HashMap");
Clazz.overrideMethod(c$,"hasNext",
function(){
if(this.entry!=null){
return true;
}while(this.position<this.associatedMap.elementData.length){
if(this.associatedMap.elementData[this.position]==null){
this.position++;
}else{
return true;
}}
return false;
});
Clazz.defineMethod(c$,"checkConcurrentMod",
function(){
if(this.expectedModCount!=this.associatedMap.modCount){
throw new java.util.ConcurrentModificationException();
}});
Clazz.overrideMethod(c$,"next",
function(){
this.checkConcurrentMod();
if(!this.hasNext()){
throw new java.util.NoSuchElementException();
}var a;
if(this.entry==null){
a=this.lastEntry=this.associatedMap.elementData[this.position++];
this.entry=this.lastEntry.next;
}else{
if(this.lastEntry.next!==this.entry){
this.lastEntry=this.lastEntry.next;
}a=this.entry;
this.entry=this.entry.next;
}this.canRemove=true;
return this.type.get(a);
});
Clazz.overrideMethod(c$,"remove",
function(){
this.checkConcurrentMod();
if(!this.canRemove){
throw new IllegalStateException();
}this.canRemove=false;
this.associatedMap.modCount++;
if(this.lastEntry.next===this.entry){
while(this.associatedMap.elementData[--this.position]==null){
;}
this.associatedMap.elementData[this.position]=this.associatedMap.elementData[this.position].next;
this.entry=null;
}else{
this.lastEntry.next=this.entry;
}this.associatedMap.elementCount--;
this.expectedModCount++;
});
c$=Clazz.p0p();
Clazz.pu$h(self.c$);
c$=Clazz.decorateAsClass(function(){
this.associatedMap=null;
Clazz.instantialize(this,arguments);
},java.util.HashMap,"HashMapEntrySet",java.util.AbstractSet);
Clazz.makeConstructor(c$,
function(a){
Clazz.superConstructor(this,java.util.HashMap.HashMapEntrySet,[]);
this.associatedMap=a;
},"java.util.HashMap");
Clazz.defineMethod(c$,"hashMap",
function(){
return this.associatedMap;
});
Clazz.overrideMethod(c$,"size",
function(){
return this.associatedMap.elementCount;
});
Clazz.overrideMethod(c$,"clear",
function(){
this.associatedMap.clear();
});
Clazz.overrideMethod(c$,"remove",
function(a){
if(this.contains(a)){
this.associatedMap.remove((a).getKey());
return true;
}return false;
},"~O");
Clazz.overrideMethod(c$,"contains",
function(a){
if(Clazz.instanceOf(a,java.util.Map.Entry)){
var b=this.associatedMap.getEntry((a).getKey());
return a.equals(b);
}return false;
},"~O");
Clazz.overrideMethod(c$,"iterator",
function(){
return new java.util.HashMap.HashMapIterator(((Clazz.isClassDefined("java.util.HashMap$HashMapEntrySet$1")?0:java.util.HashMap.HashMapEntrySet.$HashMap$HashMapEntrySet$1$()),Clazz.innerTypeInstance(java.util.HashMap$HashMapEntrySet$1,this,null)),this.associatedMap);
});
c$.$HashMap$HashMapEntrySet$1$=function(){
Clazz.pu$h(self.c$);
c$=Clazz.declareAnonymous(java.util,"HashMap$HashMapEntrySet$1",null,java.util.MapEntry.Type);
Clazz.overrideMethod(c$,"get",
function(a){
return a;
},"java.util.MapEntry");
c$=Clazz.p0p();
};
c$=Clazz.p0p();
Clazz.defineStatics(c$,
"DEFAULT_SIZE",16);
});
