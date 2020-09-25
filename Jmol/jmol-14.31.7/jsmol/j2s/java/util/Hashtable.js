// BH 7/7/2017 7:10:39 AM fixes Clazz.clone for arrays
// BH 3/30/2015 11:01:35 PM incorrect constructor for HashtableKeySet and HashtableEntrySet (extends, not implements)
// BH 8/24/2014 8:48:58 PM all synchronization and inner classes removed
// BH 3/21/2014 6:44:21 AM  to reduce this.b$[....] phrases to simply this.h$
// BH added ability to use a non-Java key for HTML elements, for example.


Clazz.load([],"java.util.HashtableIterator",[],function(){
c$=Clazz.decorateAsClass(function(){
this.position=0;
this.expectedModCount=0;
this.type=null;
this.lastEntry=null;
this.lastPosition=0;
this.canRemove=false;
Clazz.instantialize(this,arguments);
},java.util,"HashtableIterator",null,java.util.Iterator);
Clazz.makeConstructor(c$,
function(a){
this.type=a;
this.h$ = a.h$;
this.position=this.h$.lastSlot;
this.expectedModCount=this.h$.modCount;
},"java.util.AbstractSet");
Clazz.overrideMethod(c$,"hasNext",
function(){
if(this.lastEntry&&this.lastEntry.next){
return true;
}while(this.position>=this.h$.firstSlot){
if(this.h$.elementData[this.position]==null){
this.position--;
}else{
return true;
}}
return false;
});
Clazz.overrideMethod(c$,"next",
function(){
if(this.expectedModCount==this.h$.modCount){
if(this.lastEntry){
this.lastEntry=this.lastEntry.next;
}if(this.lastEntry==null){
while(this.position>=this.h$.firstSlot&&(this.lastEntry=this.h$.elementData[this.position])==null){
this.position--;
}
if(this.lastEntry){
this.lastPosition=this.position;
this.position--;
}}if(this.lastEntry){
this.canRemove=true;
return this.type.get(this.lastEntry);
}throw new java.util.NoSuchElementException();
}throw new java.util.ConcurrentModificationException();
});
Clazz.overrideMethod(c$,"remove",
function(){
if(this.expectedModCount==this.h$.modCount){
if(this.canRemove){
this.canRemove=false;
{
var a=false;
var b=this.h$.elementData[this.lastPosition];
if(b===this.lastEntry){
this.h$.elementData[this.lastPosition]=b.next;
a=true;
}else{
while(b&&b.next!==this.lastEntry){
b=b.next;
}
if(b){
b.next=this.lastEntry.next;
a=true;
}}if(a){
this.h$.modCount++;
this.h$.elementCount--;
this.expectedModCount++;
return;
}}}else{
throw new IllegalStateException();
}}throw new java.util.ConcurrentModificationException();
});
});



////////////////////////////


Clazz.load([],"java.util.HashtableEnumerator",[],function(){
c$=Clazz.decorateAsClass(function(){
this.key=false;
this.start=0;
this.entry=null;
Clazz.instantialize(this,arguments);
},java.util,"HashtableEnumerator",null,java.util.Enumeration);

Clazz.makeConstructor(c$,
function(a, b){
this.key = a;
this.h$ = b;
if (this.h$)this.start=this.h$.lastSlot+1;
},"~B,java.util.Hashtable");
Clazz.overrideMethod(c$,"hasMoreElements",
function(){
if (!this.h$)return false;
if(this.entry)return true;

while(--this.start>=this.h$.firstSlot){
if(this.h$.elementData[this.start]){
this.entry=this.h$.elementData[this.start];
return true;
}}
return false;
});
Clazz.overrideMethod(c$,"nextElement",
function(){
if(this.hasMoreElements()){
var a=this.key?this.entry.key:this.entry.value;
this.entry=this.entry.next;
return a;
}
throw new java.util.NoSuchElementException();
});
});

////////////////////////////

Clazz.load(["java.util.AbstractSet"],"java.util.HashtableEntrySet",[],function(){
c$=Clazz.decorateAsClass(function(){
Clazz.instantialize(this,arguments);
},java.util,"HashtableEntrySet",java.util.AbstractSet,null);

Clazz.makeConstructor(c$,
function(a){
this.h$ = a;
},"java.util.Hashtable");
Clazz.overrideMethod(c$,"size",
function(){
return this.h$.elementCount;
});
Clazz.overrideMethod(c$,"clear",
function(){
this.h$.clear();
});
Clazz.overrideMethod(c$,"remove",
function(object){
if(this.contains(object)){
this.h$.remove((object).getKey());
return true;
}return false;
},"~O");
Clazz.defineMethod(c$,"contains",
function(object){
var entry=this.h$.getEntry((object).getKey());
return object.equals(entry);
},"~O");

Clazz.overrideMethod(c$,"get",
function(entry){
return entry;
},"java.util.MapEntry");

Clazz.defineMethod(c$,"iterator",
function(){
return new java.util.HashtableIterator(this);
});
});


////////////////////////////

Clazz.load(["java.util.AbstractSet"],"java.util.HashtableKeySet",[],function(){
c$=Clazz.decorateAsClass(function(){
Clazz.instantialize(this,arguments);
},java.util,"HashtableKeySet",java.util.AbstractSet,null);

Clazz.makeConstructor(c$,
function(a){
this.h$ = a;
},"java.util.Hashtable");

Clazz.overrideMethod(c$,"contains",
function(object){
return this.h$.containsKey(object);
},"~O");
Clazz.overrideMethod(c$,"size",
function(){
return this.h$.elementCount;
});
Clazz.overrideMethod(c$,"clear",
function(){
this.h$.clear();
});
Clazz.overrideMethod(c$,"remove",
function(key){
if(this.h$.containsKey(key)){
this.h$.remove(key);
return true;
}return false;
},"~O");

Clazz.overrideMethod(c$,"get",
function(entry){
return entry.key;
},"java.util.MapEntry");

Clazz.overrideMethod(c$,"iterator",
function(){
return new java.util.HashtableIterator(this);
});
});

////////////////////////////

Clazz.load(["java.util.AbstractCollection"],"java.util.HashtableValueCollection",[],function(){
c$=Clazz.decorateAsClass(function(){
Clazz.instantialize(this,arguments);
},java.util,"HashtableValueCollection",java.util.AbstractCollection,null);

Clazz.makeConstructor(c$,
function(a){
this.h$ = a;
},"java.util.Hashtable");
Clazz.overrideMethod(c$,"contains",
function(object){
return this.h$.contains(object);
},"~O");
Clazz.overrideMethod(c$,"size",
function(){
return this.h$.elementCount;
});
Clazz.overrideMethod(c$,"clear",
function(){
this.h$.clear();
});

Clazz.overrideMethod(c$,"get",
function(entry){
return entry.value;
},"java.util.MapEntry");

Clazz.overrideMethod(c$,"iterator",
function(){
return new java.util.HashtableIterator(this);
});
});
////////////////////////////


Clazz.load(["java.util.MapEntry"],"java.util.HashtableEntry",[],function(){
c$=Clazz.decorateAsClass(function(){
this.next=null;
this.hashcode=0;
Clazz.instantialize(this,arguments);
},java.util,"HashtableEntry",java.util.MapEntry);
Clazz.overrideConstructor(c$,
function(a,b){
this.key = a;
this.value = b;
this.hashcode=a.hashCode();
});
Clazz.defineMethod(c$,"clone",
function(){
var a=Clazz.superCall(this,java.util.HashtableEntry,"clone",[]);
if(this.next!=null){
a.next=this.next.clone();
}
return a;
});
Clazz.overrideMethod(c$,"setValue",
function(a){
if(a==null){
throw new NullPointerException();
}var b=this.value;
this.value=a;
return b;
},"~O");
Clazz.defineMethod(c$,"getKeyHash",
function(){
return this.key.hashCode();
});
Clazz.defineMethod(c$,"equalsKey",
function(a,b){
return this.hashcode==(!a.hashCode || a.hashCode())&&this.key.equals(a);
},"~O,~N");
Clazz.overrideMethod(c$,"toString",
function(){
return this.key+"="+this.value;
});
});



////////////////////////////


Clazz.load(["java.util.Dictionary","$.Enumeration","$.HashtableEnumerator","$.Iterator","$.Map","$.MapEntry","$.NoSuchElementException"],"java.util.Hashtable",["java.lang.IllegalArgumentException","$.IllegalStateException","$.NullPointerException","$.StringBuilder","java.util.AbstractCollection","$.AbstractSet","$.Arrays","$.Collections","$.ConcurrentModificationException","java.util.MapEntry.Type","java.util.HashtableEntry"],function(){
c$=Clazz.decorateAsClass(function(){
this.elementCount=0;
this.elementData=null;
this.loadFactor=0;
this.threshold=0;
this.firstSlot=0;
this.lastSlot=-1;
this.modCount=0;
Clazz.instantialize(this,arguments);
},java.util,"Hashtable",java.util.Dictionary,[java.util.Map,Cloneable,java.io.Serializable]);	
c$.newEntry=Clazz.defineMethod(c$,"newEntry",
($fz=function(key,value,hash){
return new java.util.HashtableEntry(key,value);
},$fz.isPrivate=true,$fz),"~O,~O,~N");
Clazz.overrideConstructor(c$,
function(){
this.elementCount=0;
this.elementData=this.newElementArray(11);
this.firstSlot=this.elementData.length;
this.loadFactor=0.75;
this.computeMaxSize();
});
Clazz.defineMethod(c$,"newElementArray",
($fz=function(size){
return new Array(size);
},$fz.isPrivate=true,$fz),"~N");
Clazz.overrideMethod(c$,"clear",
function(){
this.elementCount=0;
for (var i = this.elementData.length; --i >= 0;)
	  this.elementData[i] = null;
this.modCount++;
});
Clazz.defineMethod(c$,"clone",
function(){
try{
var hashtable=Clazz.superCall(this,java.util.Hashtable,"clone",[]);
hashtable.elementData=new Array(this.elementData.length);
for(var i = this.elementData.length; --i >= 0;)
 if (this.elementData[i] != null)
  hashtable.elementData[i]=this.elementData[i].clone();
return hashtable;
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
Clazz.defineMethod(c$,"contains",
function(value){
if(value==null){
throw new NullPointerException();
}for(var i=this.elementData.length;--i>=0;){
var entry=this.elementData[i];
while(entry){
if(value.equals(entry.value)){
return true;
}entry=entry.next;
}
}
return false;
},"~O");
Clazz.overrideMethod(c$,"containsKey",
function(key){
	if(!key.hashCode)  {
	  key.hashCode = function(){return 1};
	  if (!key.equals)
	  	key.equals = function(a) {return this == a};
	}
return this.getEntry(key)!=null	;
},"~O");
Clazz.overrideMethod(c$,"containsValue",
function(value){
return this.contains(value);
},"~O");
Clazz.overrideMethod(c$,"elements",
function(){
if(this.elementCount==0){
return java.util.Hashtable.EMPTY_ENUMERATION;
}
return new java.util.HashtableEnumerator(false, this);
});
Clazz.overrideMethod(c$,"entrySet",
function(){
return new java.util.HashtableEntrySet(this);
});
Clazz.overrideMethod(c$,"equals",
function(object){
if(this===object){
return true;
}if(Clazz.instanceOf(object,java.util.Map)){
var map=object;
if(this.size()!=map.size()){
return false;
}var entries=this.entrySet();
for(var e,$e=map.entrySet().iterator();$e.hasNext()&&((e=$e.next())||true);){
if(!entries.contains(e)){
return false;
}}
return true;
}return false;
},"~O");
Clazz.overrideMethod(c$,"get",
function(key){
	if(!key.hashCode) { 
	  key.hashCode = function(){return 1};
  	if (!key.equals)
  		key.equals = function(a) {return this == a};
	}
var hash=key.hashCode();
var index=(hash&0x7FFFFFFF)%this.elementData.length;
var entry=this.elementData[index];
while(entry){
if(entry.equalsKey(key,hash)){
return entry.value;
}entry=entry.next;
}
return null;
},"~O");
Clazz.defineMethod(c$,"getEntry",
function(key){
var hash=key.hashCode();
var index=(hash&0x7FFFFFFF)%this.elementData.length;
var entry=this.elementData[index];
while(entry){
if(entry.equalsKey(key,hash)){
return entry;
}entry=entry.next;
}
return null;
},"~O");
Clazz.overrideMethod(c$,"hashCode",
function(){
var result=0;
var it=this.entrySet().iterator();
while(it.hasNext()){
var entry=it.next();
var key=entry.getKey();
var value=entry.getValue();
var hash=(key!==this?key.hashCode():0)^(value!==this?(value!=null?value.hashCode():0):0);
result+=hash;
}
return result;
});
Clazz.overrideMethod(c$,"isEmpty",
function(){
return this.elementCount==0;
});
Clazz.overrideMethod(c$,"keys",
function(){
if(this.elementCount==0){
return java.util.Hashtable.EMPTY_ENUMERATION;
}
return new java.util.HashtableEnumerator(true, this); 
});
Clazz.overrideMethod(c$,"keySet",
function(){
return new java.util.HashtableKeySet(this);
});
Clazz.overrideMethod(c$,"put",
function(key,value){
if(key!=null&&value!=null){
	if(!key.hashCode)  {
	  key.hashCode = function(){return 1};
	  if (!key.equals)
	  	key.equals = function(a) {return this == a};
	}
	var hash=key.hashCode();
	var index=(hash&0x7FFFFFFF)%this.elementData.length;
	var entry=this.elementData[index];
	while(entry!=null&&!entry.equalsKey(key,hash)){
	entry=entry.next;
}
if(entry==null){
this.modCount++;
if(++this.elementCount>this.threshold){
this.rehash();
index=(hash&0x7FFFFFFF)%this.elementData.length;
}if(index<this.firstSlot){
this.firstSlot=index;
}if(index>this.lastSlot){
this.lastSlot=index;
}

entry=java.util.Hashtable.newEntry(key,value,hash);
entry.next=this.elementData[index];
this.elementData[index]=entry;
return null;
}var result=entry.value;
entry.value=value;
return result;
}throw new NullPointerException();
},"~O,~O");
Clazz.overrideMethod(c$,"putAll",
function(map){
for(var entry,$entry=map.entrySet().iterator();$entry.hasNext()&&((entry=$entry.next())||true);){
this.put(entry.getKey(),entry.getValue());
}
},"java.util.Map");

Clazz.defineMethod(c$,"rehash",
function(){
var length=(this.elementData.length<<1)+1;
if(length==0){
length=1;
}var newFirst=length;
var newLast=-1;
var newData=this.newElementArray(length);
for(var i=this.lastSlot+1;--i>=this.firstSlot;){
var entry=this.elementData[i];
while(entry!=null){
var index=(entry.getKeyHash()&0x7FFFFFFF)%length;
if(index<newFirst){
newFirst=index;
}if(index>newLast){
newLast=index;
}var next=entry.next;
entry.next=newData[index];
newData[index]=entry;
entry=next;
}
}
this.firstSlot=newFirst;
this.lastSlot=newLast;
this.elementData=newData;
this.computeMaxSize();
});
Clazz.overrideMethod(c$,"remove",
function(key){
var hash=key.hashCode();
var index=(hash&0x7FFFFFFF)%this.elementData.length;
var last=null;
var entry=this.elementData[index];
while(entry!=null&&!entry.equalsKey(key,hash)){
last=entry;
entry=entry.next;
}
if(entry!=null){
this.modCount++;
if(last==null){
this.elementData[index]=entry.next;
}else{
last.next=entry.next;
}this.elementCount--;
var result=entry.value;
entry.value=null;
return result;
}return null;
},"~O");
Clazz.overrideMethod(c$,"size",
function(){
return this.elementCount;
});
Clazz.overrideMethod(c$,"toString",
function(){
if(this.isEmpty()){
return"{}";
}var buffer=new StringBuilder(this.size()*28);
buffer.append('{');
for(var i=this.lastSlot;i>=this.firstSlot;i--){
var entry=this.elementData[i];
while(entry!=null){
if(entry.key!==this){
buffer.append(entry.key);
}else{
buffer.append("(this Map)");
}buffer.append('=');
if(entry.value!==this){
buffer.append(entry.value);
}else{
buffer.append("(this Map)");
}buffer.append(", ");
entry=entry.next;
}
}
if(this.elementCount>0){
buffer.setLength(buffer.length()-2);
}buffer.append('}');
return buffer.toString();
});
Clazz.overrideMethod(c$,"values",
function(){
return new java.util.HashtableValueCollection(this);
});
java.util.Hashtable.EMPTY_ENUMERATION = new java.util.HashtableEnumerator();
});
