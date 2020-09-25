Clazz.load(["java.util.AbstractMap","$.AbstractSet","$.Iterator","$.Map","$.MapEntry"],"java.util.IdentityHashMap",["java.lang.IllegalArgumentException","$.IllegalStateException","java.util.AbstractCollection","$.ConcurrentModificationException","java.util.MapEntry.Type","java.util.NoSuchElementException"],function(){
c$=Clazz.decorateAsClass(function(){
this.elementData=null;
this.$size=0;
this.threshold=0;
this.modCount=0;
Clazz.instantialize(this,arguments);
},java.util,"IdentityHashMap",java.util.AbstractMap,[java.util.Map,java.io.Serializable,Cloneable]);
Clazz.makeConstructor(c$,
function(){
this.construct(21);
});
Clazz.makeConstructor(c$,
function(maxSize){
Clazz.superConstructor(this,java.util.IdentityHashMap,[]);
if(maxSize>=0){
this.$size=0;
this.threshold=this.getThreshold(maxSize);
this.elementData=this.newElementArray(this.computeElementArraySize());
}else{
throw new IllegalArgumentException();
}},"~N");
Clazz.defineMethod(c$,"getThreshold",
($fz=function(maxSize){
return maxSize>3?maxSize:3;
},$fz.isPrivate=true,$fz),"~N");
Clazz.defineMethod(c$,"computeElementArraySize",
($fz=function(){
return(Math.floor((this.threshold*10000)/7500))*2;
},$fz.isPrivate=true,$fz));
Clazz.defineMethod(c$,"newElementArray",
($fz=function(s){
return new Array(s);
},$fz.isPrivate=true,$fz),"~N");
Clazz.makeConstructor(c$,
function(map){
this.construct(map.size()<6?11:map.size()*2);
this.putAllImpl(map);
},"java.util.Map");
Clazz.defineMethod(c$,"massageValue",
($fz=function(value){
return((value===java.util.IdentityHashMap.NULL_OBJECT)?null:value);
},$fz.isPrivate=true,$fz),"~O");
Clazz.overrideMethod(c$,"clear",
function(){
this.$size=0;
for(var i=0;i<this.elementData.length;i++){
this.elementData[i]=null;
}
this.modCount++;
});
Clazz.overrideMethod(c$,"containsKey",
function(key){
if(key==null){
key=java.util.IdentityHashMap.NULL_OBJECT;
}var index=this.findIndex(key,this.elementData);
return this.elementData[index]===key;
},"~O");
Clazz.overrideMethod(c$,"containsValue",
function(value){
if(value==null){
value=java.util.IdentityHashMap.NULL_OBJECT;
}for(var i=1;i<this.elementData.length;i=i+2){
if(this.elementData[i]===value){
return true;
}}
return false;
},"~O");
Clazz.overrideMethod(c$,"get",
function(key){
if(key==null){
key=java.util.IdentityHashMap.NULL_OBJECT;
}var index=this.findIndex(key,this.elementData);
if(this.elementData[index]===key){
var result=this.elementData[index+1];
return this.massageValue(result);
}return null;
},"~O");
Clazz.defineMethod(c$,"getEntry",
($fz=function(key){
if(key==null){
key=java.util.IdentityHashMap.NULL_OBJECT;
}var index=this.findIndex(key,this.elementData);
if(this.elementData[index]===key){
return this.getEntry(index);
}return null;
},$fz.isPrivate=true,$fz),"~O");
Clazz.defineMethod(c$,"getEntry",
($fz=function(index){
var key=this.elementData[index];
var value=this.elementData[index+1];
if(key===java.util.IdentityHashMap.NULL_OBJECT){
key=null;
}if(value===java.util.IdentityHashMap.NULL_OBJECT){
value=null;
}return new java.util.IdentityHashMap.IdentityHashMapEntry(key,value);
},$fz.isPrivate=true,$fz),"~N");
Clazz.defineMethod(c$,"findIndex",
($fz=function(key,array){
var length=array.length;
var index=this.getModuloHash(key,length);
var last=(index+length-2)%length;
while(index!=last){
if(array[index]===key||(array[index]==null)){
break;
}index=(index+2)%length;
}
return index;
},$fz.isPrivate=true,$fz),"~O,~A");
Clazz.defineMethod(c$,"getModuloHash",
($fz=function(key,length){
return((System.identityHashCode(key)&0x7FFFFFFF)%(Math.floor(length/2)))*2;
},$fz.isPrivate=true,$fz),"~O,~N");
Clazz.overrideMethod(c$,"put",
function(key,value){
var _key=key;
var _value=value;
if(_key==null){
_key=java.util.IdentityHashMap.NULL_OBJECT;
}if(_value==null){
_value=java.util.IdentityHashMap.NULL_OBJECT;
}var index=this.findIndex(_key,this.elementData);
if(this.elementData[index]!==_key){
this.modCount++;
if(++this.$size>this.threshold){
this.rehash();
index=this.findIndex(_key,this.elementData);
}this.elementData[index]=_key;
this.elementData[index+1]=null;
}var result=this.elementData[index+1];
this.elementData[index+1]=_value;
return this.massageValue(result);
},"~O,~O");
Clazz.overrideMethod(c$,"putAll",
function(map){
this.putAllImpl(map);
},"java.util.Map");
Clazz.defineMethod(c$,"rehash",
($fz=function(){
var newlength=this.elementData.length<<1;
if(newlength==0){
newlength=1;
}var newData=this.newElementArray(newlength);
for(var i=0;i<this.elementData.length;i=i+2){
var key=this.elementData[i];
if(key!=null){
var index=this.findIndex(key,newData);
newData[index]=key;
newData[index+1]=this.elementData[i+1];
}}
this.elementData=newData;
this.computeMaxSize();
},$fz.isPrivate=true,$fz));
Clazz.defineMethod(c$,"computeMaxSize",
($fz=function(){
this.threshold=(Math.floor((Math.floor(this.elementData.length/ 2)) * 7500 /10000));
},$fz.isPrivate=true,$fz));
Clazz.overrideMethod(c$,"remove",
function(key){
if(key==null){
key=java.util.IdentityHashMap.NULL_OBJECT;
}var hashedOk;
var index;
var next;
var hash;
var result;
var object;
index=next=this.findIndex(key,this.elementData);
if(this.elementData[index]!==key){
return null;
}result=this.elementData[index+1];
var length=this.elementData.length;
while(true){
next=(next+2)%length;
object=this.elementData[next];
if(object==null){
break;
}hash=this.getModuloHash(object,length);
hashedOk=hash>index;
if(next<index){
hashedOk=hashedOk||(hash<=next);
}else{
hashedOk=hashedOk&&(hash<=next);
}if(!hashedOk){
this.elementData[index]=object;
this.elementData[index+1]=this.elementData[next+1];
index=next;
}}
this.$size--;
this.modCount++;
this.elementData[index]=null;
this.elementData[index+1]=null;
return this.massageValue(result);
},"~O");
Clazz.overrideMethod(c$,"entrySet",
function(){
return new java.util.IdentityHashMap.IdentityHashMapEntrySet(this);
});
Clazz.overrideMethod(c$,"keySet",
function(){
if(this.$keySet==null){
this.$keySet=((Clazz.isClassDefined("java.util.IdentityHashMap$1")?0:java.util.IdentityHashMap.$IdentityHashMap$1$()),Clazz.innerTypeInstance(java.util.IdentityHashMap$1,this,null));
}return this.$keySet;
});
Clazz.overrideMethod(c$,"values",
function(){
if(this.valuesCollection==null){
this.valuesCollection=((Clazz.isClassDefined("java.util.IdentityHashMap$2")?0:java.util.IdentityHashMap.$IdentityHashMap$2$()),Clazz.innerTypeInstance(java.util.IdentityHashMap$2,this,null));
}return this.valuesCollection;
});
Clazz.overrideMethod(c$,"equals",
function(object){
if(this===object){
return true;
}if(Clazz.instanceOf(object,java.util.Map)){
var map=object;
if(this.size()!=map.size()){
return false;
}var set=this.entrySet();
return set.equals(map.entrySet());
}return false;
},"~O");
Clazz.defineMethod(c$,"clone",
function(){
try{
return Clazz.superCall(this,java.util.IdentityHashMap,"clone",[]);
}catch(e){
if(Clazz.instanceOf(e,CloneNotSupportedException)){
return null;
}else{
throw e;
}
}
});
Clazz.overrideMethod(c$,"isEmpty",
function(){
return this.$size==0;
});
Clazz.overrideMethod(c$,"size",
function(){
return this.$size;
});
Clazz.defineMethod(c$,"putAllImpl",
($fz=function(map){
if(map.entrySet()!=null){
Clazz.superCall(this,java.util.IdentityHashMap,"putAll",[map]);
}},$fz.isPrivate=true,$fz),"java.util.Map");
c$.$IdentityHashMap$1$=function(){
Clazz.pu$h(self.c$);
c$=Clazz.declareAnonymous(java.util,"IdentityHashMap$1",java.util.AbstractSet);
Clazz.overrideMethod(c$,"contains",
function(object){
return this.b$["java.util.IdentityHashMap"].containsKey(object);
},"~O");
Clazz.overrideMethod(c$,"size",
function(){
return this.b$["java.util.IdentityHashMap"].size();
});
Clazz.overrideMethod(c$,"clear",
function(){
this.b$["java.util.IdentityHashMap"].clear();
});
Clazz.overrideMethod(c$,"remove",
function(key){
if(this.b$["java.util.IdentityHashMap"].containsKey(key)){
this.b$["java.util.IdentityHashMap"].remove(key);
return true;
}return false;
},"~O");
Clazz.overrideMethod(c$,"iterator",
function(){
return new java.util.IdentityHashMap.IdentityHashMapIterator(((Clazz.isClassDefined("java.util.IdentityHashMap$1$1")?0:java.util.IdentityHashMap.$IdentityHashMap$1$1$()),Clazz.innerTypeInstance(java.util.IdentityHashMap$1$1,this,null)),this.b$["java.util.IdentityHashMap"]);
});
c$=Clazz.p0p();
};
c$.$IdentityHashMap$1$1$=function(){
Clazz.pu$h(self.c$);
c$=Clazz.declareAnonymous(java.util,"IdentityHashMap$1$1",null,java.util.MapEntry.Type);
Clazz.overrideMethod(c$,"get",
function(entry){
return entry.key;
},"java.util.MapEntry");
c$=Clazz.p0p();
};
c$.$IdentityHashMap$2$=function(){
Clazz.pu$h(self.c$);
c$=Clazz.declareAnonymous(java.util,"IdentityHashMap$2",java.util.AbstractCollection);
Clazz.overrideMethod(c$,"contains",
function(object){
return this.b$["java.util.IdentityHashMap"].containsValue(object);
},"~O");
Clazz.overrideMethod(c$,"size",
function(){
return this.b$["java.util.IdentityHashMap"].size();
});
Clazz.overrideMethod(c$,"clear",
function(){
this.b$["java.util.IdentityHashMap"].clear();
});
Clazz.overrideMethod(c$,"iterator",
function(){
return new java.util.IdentityHashMap.IdentityHashMapIterator(((Clazz.isClassDefined("java.util.IdentityHashMap$2$1")?0:java.util.IdentityHashMap.$IdentityHashMap$2$1$()),Clazz.innerTypeInstance(java.util.IdentityHashMap$2$1,this,null)),this.b$["java.util.IdentityHashMap"]);
});
Clazz.overrideMethod(c$,"remove",
function(object){
var it=this.iterator();
while(it.hasNext()){
if(object===it.next()){
it.remove();
return true;
}}
return false;
},"~O");
c$=Clazz.p0p();
};
c$.$IdentityHashMap$2$1$=function(){
Clazz.pu$h(self.c$);
c$=Clazz.declareAnonymous(java.util,"IdentityHashMap$2$1",null,java.util.MapEntry.Type);
Clazz.overrideMethod(c$,"get",
function(entry){
return entry.value;
},"java.util.MapEntry");
c$=Clazz.p0p();
};
Clazz.pu$h(self.c$);
c$=Clazz.declareType(java.util.IdentityHashMap,"IdentityHashMapEntry",java.util.MapEntry);
Clazz.overrideMethod(c$,"equals",
function(a){
if(this===a){
return true;
}if(Clazz.instanceOf(a,java.util.Map.Entry)){
var b=a;
return(this.key===b.getKey())&&(this.value===b.getValue());
}return false;
},"~O");
Clazz.overrideMethod(c$,"hashCode",
function(){
return System.identityHashCode(this.key)^System.identityHashCode(this.value);
});
Clazz.overrideMethod(c$,"toString",
function(){
return this.key+"="+this.value;
});
c$=Clazz.p0p();
Clazz.pu$h(self.c$);
c$=Clazz.decorateAsClass(function(){
this.position=0;
this.lastPosition=0;
this.associatedMap=null;
this.expectedModCount=0;
this.type=null;
this.canRemove=false;
Clazz.instantialize(this,arguments);
},java.util.IdentityHashMap,"IdentityHashMapIterator",null,java.util.Iterator);
Clazz.makeConstructor(c$,
function(a,b){
this.associatedMap=b;
this.type=a;
this.expectedModCount=b.modCount;
},"java.util.MapEntry.Type,java.util.IdentityHashMap");
Clazz.overrideMethod(c$,"hasNext",
function(){
while(this.position<this.associatedMap.elementData.length){
if(this.associatedMap.elementData[this.position]==null){
this.position+=2;
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
}var a=this.associatedMap.getEntry(this.position);
this.lastPosition=this.position;
this.position+=2;
this.canRemove=true;
return this.type.get(a);
});
Clazz.overrideMethod(c$,"remove",
function(){
this.checkConcurrentMod();
if(!this.canRemove){
throw new IllegalStateException();
}this.canRemove=false;
this.associatedMap.remove(this.associatedMap.elementData[this.lastPosition]);
this.position=this.lastPosition;
this.expectedModCount++;
});
c$=Clazz.p0p();
Clazz.pu$h(self.c$);
c$=Clazz.decorateAsClass(function(){
this.associatedMap=null;
Clazz.instantialize(this,arguments);
},java.util.IdentityHashMap,"IdentityHashMapEntrySet",java.util.AbstractSet);
Clazz.makeConstructor(c$,
function(a){
Clazz.superConstructor(this,java.util.IdentityHashMap.IdentityHashMapEntrySet,[]);
this.associatedMap=a;
},"java.util.IdentityHashMap");
Clazz.defineMethod(c$,"hashMap",
function(){
return this.associatedMap;
});
Clazz.overrideMethod(c$,"size",
function(){
return this.associatedMap.$size;
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
return b!=null&&b.equals(a);
}return false;
},"~O");
Clazz.overrideMethod(c$,"iterator",
function(){
return new java.util.IdentityHashMap.IdentityHashMapIterator(((Clazz.isClassDefined("java.util.IdentityHashMap$IdentityHashMapEntrySet$1")?0:java.util.IdentityHashMap.IdentityHashMapEntrySet.$IdentityHashMap$IdentityHashMapEntrySet$1$()),Clazz.innerTypeInstance(java.util.IdentityHashMap$IdentityHashMapEntrySet$1,this,null)),this.associatedMap);
});
c$.$IdentityHashMap$IdentityHashMapEntrySet$1$=function(){
Clazz.pu$h(self.c$);
c$=Clazz.declareAnonymous(java.util,"IdentityHashMap$IdentityHashMapEntrySet$1",null,java.util.MapEntry.Type);
Clazz.overrideMethod(c$,"get",
function(a){
return a;
},"java.util.MapEntry");
c$=Clazz.p0p();
};
c$=Clazz.p0p();
Clazz.defineStatics(c$,
"DEFAULT_MAX_SIZE",21,
"loadFactor",7500);
c$.NULL_OBJECT=c$.prototype.NULL_OBJECT=new Clazz._O();
});
