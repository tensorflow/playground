// BH 8/25/2014 1:10:59 AM  - removed indirect access/inner class business.

Clazz.load(["java.util.AbstractCollection","$.Iterator","$.List","$.ListIterator","$.RandomAccess","$.NoSuchElementException"],"java.util.AbstractList",["java.lang.IllegalArgumentException","$.IllegalStateException","$.IndexOutOfBoundsException","$.UnsupportedOperationException","java.util.ConcurrentModificationException"],function(){
c$=Clazz.decorateAsClass(function(){
this.modCount=0;



//if(!Clazz.isClassDefined("java.util.AbstractList.SimpleListIterator")){
//java.util.AbstractList.$AbstractList$SimpleListIterator$();
//}
//if(!Clazz.isClassDefined("java.util.AbstractList.FullListIterator")){
//java.util.AbstractList.$AbstractList$FullListIterator$();
//}



Clazz.instantialize(this,arguments);
},java.util,"AbstractList",java.util.AbstractCollection,java.util.List);
Clazz.defineMethod(c$,"add",
function(location,object){
throw new UnsupportedOperationException();
},"~N,~O");
Clazz.defineMethod(c$,"add",
function(object){
this.add(this.size(),object);
return true;
},"~O");
Clazz.defineMethod(c$,"addAll",
function(location,collection){
var it=collection.iterator();
while(it.hasNext()){
this.add(location++,it.next());
}
return!collection.isEmpty();
},"~N,java.util.Collection");
Clazz.overrideMethod(c$,"clear",
function(){
this.removeRange(0,this.size());
});
Clazz.overrideMethod(c$,"equals",
function(object){
if(this===object){
return true;
}if(Clazz.instanceOf(object,java.util.List)){
var list=object;
if(list.size()!=this.size()){
return false;
}var it1=this.iterator();
var it2=list.iterator();
while(it1.hasNext()){
var e1=it1.next();
var e2=it2.next();
if(!(e1==null?e2==null:e1.equals(e2))){
return false;
}}
return true;
}return false;
},"~O");
Clazz.overrideMethod(c$,"hashCode",
function(){
var result=1;
var it=this.iterator();
while(it.hasNext()){
var object=it.next();
result=(31*result)+(object==null?0:object.hashCode());
}
return result;
});
Clazz.overrideMethod(c$,"indexOf",
function(object){
var it=this.listIterator();
if(object!=null){
while(it.hasNext()){
if(object.equals(it.next())){
return it.previousIndex();
}}
}else{
while(it.hasNext()){
if(it.next()==null){
return it.previousIndex();
}}
}return-1;
},"~O");
Clazz.overrideMethod(c$,"iterator",
function(){
return new java.util.AbstractListSimpleListIterator(this); // Clazz.innerTypeInstance(java.util.AbstractList.SimpleListIterator,this,null);
});
Clazz.overrideMethod(c$,"lastIndexOf",
function(object){
var it=this.listIterator(this.size());
if(object!=null){
while(it.hasPrevious()){
if(object.equals(it.previous())){
return it.nextIndex();
}}
}else{
while(it.hasPrevious()){
if(it.previous()==null){
return it.nextIndex();
}}
}return-1;
},"~O");
//Clazz.defineMethod(c$,"listIterator",
//function(){
//return this.listIterator(0);
//});
Clazz.defineMethod(c$,"listIterator",
function(location){
location || (location = 0);
return new java.util.AbstractListFullListIterator(this, location);//Clazz.innerTypeInstance(java.util.AbstractList.FullListIterator,this,null,location);
},"~N");
Clazz.defineMethod(c$,"remove",
function(location){
throw new UnsupportedOperationException();
},"~N");
Clazz.defineMethod(c$,"removeRange",
function(start,end){
var it=this.listIterator(start);
for(var i=start;i<end;i++){
it.next();
it.remove();
}
},"~N,~N");
Clazz.overrideMethod(c$,"set",
function(location,object){
throw new UnsupportedOperationException();
},"~N,~O");
Clazz.overrideMethod(c$,"subList",
function(start,end){
if(0<=start&&end<=this.size()){
if(start<=end){
if(Clazz.instanceOf(this,java.util.RandomAccess)){
return new java.util.AbstractList.SubAbstractListRandomAccess(this,start,end);
}return new java.util.AbstractList.SubAbstractList(this,start,end);
}throw new IllegalArgumentException();
}throw new IndexOutOfBoundsException();
},"~N,~N");



//c$.$AbstractList$SimpleListIterator$=function(){

Clazz.pu$h(self.c$);

c$=Clazz.decorateAsClass(function(){
//Clazz.prepareCallback(this,arguments);
this.pos=-1;
this.expectedModCount=0;
this.lastPosition=-1;
Clazz.instantialize(this,arguments);
},java.util,"AbstractListSimpleListIterator",null,java.util.Iterator);


Clazz.makeConstructor(c$,
function(a){
this._list = a;
this.expectedModCount=a.modCount;
}, "java.util.AbstractList");

Clazz.overrideMethod(c$,"hasNext",
function(){
return this.pos+1<this._list.size();
});
Clazz.overrideMethod(c$,"next",
function(){
if(this.expectedModCount==this._list.modCount){
try{
var a=this._list.get(this.pos+1);
this.lastPosition=++this.pos;
return a;
}catch(e){
if(Clazz.instanceOf(e,IndexOutOfBoundsException)){
throw new java.util.NoSuchElementException();
}else{
throw e;
}
}
}throw new java.util.ConcurrentModificationException();
});
Clazz.overrideMethod(c$,"remove",
function(){
if(this.expectedModCount==this._list.modCount){
try{
this._list.remove(this.lastPosition);
}catch(e){
if(Clazz.instanceOf(e,IndexOutOfBoundsException)){
throw new IllegalStateException();
}else{
throw e;
}
}
if(this._list.modCount!=this.expectedModCount){
this.expectedModCount++;
}if(this.pos==this.lastPosition){
this.pos--;
}this.lastPosition=-1;
}else{
throw new java.util.ConcurrentModificationException();
}});

c$=Clazz.p0p();
//};


//c$.$AbstractList$FullListIterator$=function(){
Clazz.pu$h(self.c$);
c$=Clazz.decorateAsClass(function(){
//Clazz.prepareCallback(this,arguments);
Clazz.instantialize(this,arguments);
},java.util,"AbstractListFullListIterator",java.util.AbstractListSimpleListIterator,java.util.ListIterator);

//,Clazz.innerTypeInstance(java.util.AbstractList.SimpleListIterator,this,null,Clazz.inheritArgs));

Clazz.makeConstructor(c$,
function(a,b){
Clazz.superConstructor(this,java.util.AbstractListFullListIterator,[a]);
if(0<=b&&b<=this._list.size()){
this.pos=b-1;
}else{
throw new IndexOutOfBoundsException();
}},"java.util.AbstractList,~N");
Clazz.overrideMethod(c$,"add",
function(a){
if(this.expectedModCount==this._list.modCount){
try{
this._list.add(this.pos+1,a);
}catch(e){
if(Clazz.instanceOf(e,IndexOutOfBoundsException)){
throw new java.util.NoSuchElementException();
}else{
throw e;
}
}
this.pos++;
this.lastPosition=-1;
if(this._list.modCount!=this.expectedModCount){
this.expectedModCount++;
}}else{
throw new java.util.ConcurrentModificationException();
}},"~O");
Clazz.overrideMethod(c$,"hasPrevious",
function(){
return this.pos>=0;
});
Clazz.overrideMethod(c$,"nextIndex",
function(){
return this.pos+1;
});
Clazz.overrideMethod(c$,"previous",
function(){
if(this.expectedModCount==this._list.modCount){
try{
var a=this._list.get(this.pos);
this.lastPosition=this.pos;
this.pos--;
return a;
}catch(e){
if(Clazz.instanceOf(e,IndexOutOfBoundsException)){
throw new java.util.NoSuchElementException();
}else{
throw e;
}
}
}throw new java.util.ConcurrentModificationException();
});
Clazz.overrideMethod(c$,"previousIndex",
function(){
return this.pos;
});
Clazz.overrideMethod(c$,"set",
function(a){
if(this.expectedModCount==this._list.modCount){
try{
this._list.set(this.lastPosition,a);
}catch(e){
if(Clazz.instanceOf(e,IndexOutOfBoundsException)){
throw new IllegalStateException();
}else{
throw e;
}
}
}else{
throw new java.util.ConcurrentModificationException();
}},"~O");
c$=Clazz.p0p();
//};




Clazz.pu$h(self.c$);
c$=Clazz.declareType(java.util.AbstractList,"SubAbstractListRandomAccess",java.util.AbstractList.SubAbstractList,java.util.RandomAccess);
c$=Clazz.p0p();




Clazz.pu$h(self.c$);
c$=Clazz.decorateAsClass(function(){
this.fullList=null;
this.offset=0;
this.$size=0;
Clazz.instantialize(this,arguments);
},java.util.AbstractList,"SubAbstractList",java.util.AbstractList);
Clazz.makeConstructor(c$,
function(a,b,c){
Clazz.superConstructor(this,java.util.AbstractList.SubAbstractList);
this.fullList=a;
this.modCount=this.fullList.modCount;
this.offset=b;
this.$size=c-b;
},"java.util.AbstractList,~N,~N");
Clazz.defineMethod(c$,"add",
function(a,b){
if(this.modCount==this.fullList.modCount){
if(0<=a&&a<=this.$size){
this.fullList.add(a+this.offset,b);
this.$size++;
this.modCount=this.fullList.modCount;
}else{
throw new IndexOutOfBoundsException();
}}else{
throw new java.util.ConcurrentModificationException();
}},"~N,~O");
Clazz.defineMethod(c$,"addAll",
function(a,b){
if(this.modCount==this.fullList.modCount){
if(0<=a&&a<=this.$size){
var c=this.fullList.addAll(a+this.offset,b);
if(c){
this.$size+=b.size();
this.modCount=this.fullList.modCount;
}return c;
}throw new IndexOutOfBoundsException();
}throw new java.util.ConcurrentModificationException();
},"~N,java.util.Collection");
Clazz.defineMethod(c$,"addAll",
function(a){
if(this.modCount==this.fullList.modCount){
var b=this.fullList.addAll(this.offset+this.$size,a);
if(b){
this.$size+=a.size();
this.modCount=this.fullList.modCount;
}return b;
}throw new java.util.ConcurrentModificationException();
},"java.util.Collection");
Clazz.defineMethod(c$,"get",
function(a){
if(this.modCount==this.fullList.modCount){
if(0<=a&&a<this.$size){
return this.fullList.get(a+this.offset);
}throw new IndexOutOfBoundsException();
}throw new java.util.ConcurrentModificationException();
},"~N");
Clazz.overrideMethod(c$,"iterator",
function(){
return this.listIterator(0);
});
Clazz.defineMethod(c$,"listIterator",
function(a){
if(this.modCount==this.fullList.modCount){
if(0<=a&&a<=this.$size){
return new java.util.AbstractList.SubAbstractList.SubAbstractListIterator(this.fullList.listIterator(a+this.offset),this,this.offset,this.$size);
}throw new IndexOutOfBoundsException();
}throw new java.util.ConcurrentModificationException();
},"~N");
Clazz.defineMethod(c$,"remove",
function(a){
if(this.modCount==this.fullList.modCount){
if(0<=a&&a<this.$size){
var b=this.fullList.remove(a+this.offset);
this.$size--;
this.modCount=this.fullList.modCount;
return b;
}throw new IndexOutOfBoundsException();
}throw new java.util.ConcurrentModificationException();
},"~N");
Clazz.defineMethod(c$,"removeRange",
function(a,b){
if(a!=b){
if(this.modCount==this.fullList.modCount){
this.fullList.removeRange(a+this.offset,b+this.offset);
this.$size-=b-a;
this.modCount=this.fullList.modCount;
}else{
throw new java.util.ConcurrentModificationException();
}}},"~N,~N");
Clazz.defineMethod(c$,"set",
function(a,b){
if(this.modCount==this.fullList.modCount){
if(0<=a&&a<this.$size){
return this.fullList.set(a+this.offset,b);
}throw new IndexOutOfBoundsException();
}throw new java.util.ConcurrentModificationException();
},"~N,~O");
Clazz.overrideMethod(c$,"size",
function(){
return this.$size;
});
Clazz.defineMethod(c$,"sizeChanged",
function(a){
if(a){
this.$size++;
}else{
this.$size--;
}this.modCount=this.fullList.modCount;
},"~B");
Clazz.pu$h(self.c$);
c$=Clazz.decorateAsClass(function(){
this.subList=null;
this.iterator=null;
this.start=0;
this.end=0;
Clazz.instantialize(this,arguments);
},java.util.AbstractList.SubAbstractList,"SubAbstractListIterator",null,java.util.ListIterator);
Clazz.makeConstructor(c$,
function(a,b,c,d){
this.iterator=a;
this.subList=b;
this.start=c;
this.end=this.start+d;
},"java.util.ListIterator,java.util.AbstractList.SubAbstractList,~N,~N");
Clazz.defineMethod(c$,"add",
function(a){
this.iterator.add(a);
this.subList.sizeChanged(true);
this.end++;
},"~O");
Clazz.overrideMethod(c$,"hasNext",
function(){
return this.iterator.nextIndex()<this.end;
});
Clazz.overrideMethod(c$,"hasPrevious",
function(){
return this.iterator.previousIndex()>=this.start;
});
Clazz.defineMethod(c$,"next",
function(){
if(this.iterator.nextIndex()<this.end){
return this.iterator.next();
}throw new java.util.NoSuchElementException();
});
Clazz.defineMethod(c$,"nextIndex",
function(){
return this.iterator.nextIndex()-this.start;
});
Clazz.defineMethod(c$,"previous",
function(){
if(this.iterator.previousIndex()>=this.start){
return this.iterator.previous();
}throw new java.util.NoSuchElementException();
});
Clazz.defineMethod(c$,"previousIndex",
function(){
var a=this.iterator.previousIndex();
if(a>=this.start){
return a-this.start;
}return-1;
});
Clazz.defineMethod(c$,"remove",
function(){
this.iterator.remove();
this.subList.sizeChanged(false);
this.end--;
});
Clazz.defineMethod(c$,"set",
function(a){
this.iterator.set(a);
},"~O");
c$=Clazz.p0p();
c$=Clazz.p0p();
});
