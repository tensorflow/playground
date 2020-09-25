Clazz.load(["java.util.AbstractList","$.List","$.RandomAccess"],"java.util.Vector",["java.lang.ArrayIndexOutOfBoundsException","$.IllegalArgumentException","$.IndexOutOfBoundsException","$.StringBuffer","java.lang.reflect.Array","java.util.Arrays","$.Collections","$.Enumeration","$.NoSuchElementException"],function(){
c$=Clazz.decorateAsClass(function(){
this.elementCount=0;
this.elementData=null;
this.capacityIncrement=0;
Clazz.instantialize(this,arguments);
},java.util,"Vector",java.util.AbstractList,[java.util.List,java.util.RandomAccess,Cloneable,java.io.Serializable]);
Clazz.makeConstructor(c$,
function(){
this.construct(10,0);
});
Clazz.makeConstructor(c$,
function(capacity){
this.construct(capacity,0);
},"~N");
Clazz.makeConstructor(c$,
function(capacity,capacityIncrement){
Clazz.superConstructor(this,java.util.Vector,[]);
this.elementCount=0;
try{
this.elementData=this.newElementArray(capacity);
}catch(e){
if(Clazz.instanceOf(e,NegativeArraySizeException)){
throw new IllegalArgumentException();
}else{
throw e;
}
}
this.capacityIncrement=capacityIncrement;
},"~N,~N");
Clazz.makeConstructor(c$,
function(collection){
this.construct(collection.size(),0);
var it=collection.iterator();
while(it.hasNext()){
this.elementData[this.elementCount++]=it.next();
}
},"java.util.Collection");
Clazz.defineMethod(c$,"newElementArray",
($fz=function(size){
return new Array(size);
},$fz.isPrivate=true,$fz),"~N");
Clazz.defineMethod(c$,"add",
function(location,object){
this.insertElementAt(object,location);
},"~N,~O");
Clazz.defineMethod(c$,"add",
function(object){
this.addElement(object);
return true;
},"~O");
Clazz.defineMethod(c$,"addAll",
function(location,collection){
if(0<=location&&location<=this.elementCount){
var size=collection.size();
if(size==0){
return false;
}var required=size-(this.elementData.length-this.elementCount);
if(required>0){
this.growBy(required);
}var count=this.elementCount-location;
if(count>0){
System.arraycopy(this.elementData,location,this.elementData,location+size,count);
}var it=collection.iterator();
while(it.hasNext()){
this.elementData[location++]=it.next();
}
this.elementCount+=size;
this.modCount++;
return true;
}throw new ArrayIndexOutOfBoundsException(location);
},"~N,java.util.Collection");
Clazz.defineMethod(c$,"addAll",
function(collection){
return this.addAll(this.elementCount,collection);
},"java.util.Collection");
Clazz.defineMethod(c$,"addElement",
function(object){
if(this.elementCount==this.elementData.length){
this.growByOne();
}this.elementData[this.elementCount++]=object;
this.modCount++;
},"~O");
Clazz.defineMethod(c$,"capacity",
function(){
return this.elementData.length;
});
Clazz.overrideMethod(c$,"clear",
function(){
this.removeAllElements();
});
Clazz.defineMethod(c$,"clone",
function(){
try{
var vector=Clazz.superCall(this,java.util.Vector,"clone",[]);
vector.elementData=this.elementData.clone();
return vector;
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
return this.indexOf(object,0)!=-1;
},"~O");
Clazz.defineMethod(c$,"copyInto",
function(elements){
System.arraycopy(this.elementData,0,elements,0,this.elementCount);
},"~A");
Clazz.defineMethod(c$,"elementAt",
function(location){
if(location<this.elementCount){
return this.elementData[location];
}throw new ArrayIndexOutOfBoundsException(location);
},"~N");
Clazz.defineMethod(c$,"elements",
function(){
return((Clazz.isClassDefined("java.util.Vector$1")?0:java.util.Vector.$Vector$1$()),Clazz.innerTypeInstance(java.util.Vector$1,this,null));
});
Clazz.defineMethod(c$,"ensureCapacity",
function(minimumCapacity){
if(this.elementData.length<minimumCapacity){
var next=(this.capacityIncrement<=0?this.elementData.length:this.capacityIncrement)+this.elementData.length;
this.grow(minimumCapacity>next?minimumCapacity:next);
}},"~N");
Clazz.overrideMethod(c$,"equals",
function(object){
if(this===object){
return true;
}if(Clazz.instanceOf(object,java.util.List)){
var list=object;
if(list.size()!=this.size()){
return false;
}var index=0;
var it=list.iterator();
while(it.hasNext()){
var e1=this.elementData[index++];
var e2=it.next();
if(!(e1==null?e2==null:e1.equals(e2))){
return false;
}}
return true;
}return false;
},"~O");
Clazz.defineMethod(c$,"firstElement",
function(){
if(this.elementCount>0){
return this.elementData[0];
}throw new java.util.NoSuchElementException();
});
Clazz.overrideMethod(c$,"get",
function(location){
return this.elementAt(location);
},"~N");
Clazz.defineMethod(c$,"grow",
($fz=function(newCapacity){
var newData=this.newElementArray(newCapacity);
System.arraycopy(this.elementData,0,newData,0,this.elementCount);
this.elementData=newData;
},$fz.isPrivate=true,$fz),"~N");
Clazz.defineMethod(c$,"growByOne",
($fz=function(){
var adding=0;
if(this.capacityIncrement<=0){
if((adding=this.elementData.length)==0){
adding=1;
}}else{
adding=this.capacityIncrement;
}var newData=this.newElementArray(this.elementData.length+adding);
System.arraycopy(this.elementData,0,newData,0,this.elementCount);
this.elementData=newData;
},$fz.isPrivate=true,$fz));
Clazz.defineMethod(c$,"growBy",
($fz=function(required){
var adding=0;
if(this.capacityIncrement<=0){
if((adding=this.elementData.length)==0){
adding=required;
}while(adding<required){
adding+=adding;
}
}else{
adding=(Math.floor(required/this.capacityIncrement))*this.capacityIncrement;
if(adding<required){
adding+=this.capacityIncrement;
}}var newData=this.newElementArray(this.elementData.length+adding);
System.arraycopy(this.elementData,0,newData,0,this.elementCount);
this.elementData=newData;
},$fz.isPrivate=true,$fz),"~N");
Clazz.overrideMethod(c$,"hashCode",
function(){
var result=1;
for(var i=0;i<this.elementCount;i++){
result=(31*result)+(this.elementData[i]==null?0:this.elementData[i].hashCode());
}
return result;
});
Clazz.defineMethod(c$,"indexOf",
function(object){
return this.indexOf(object,0);
},"~O");
Clazz.defineMethod(c$,"indexOf",
function(object,location){
if(object!=null){
for(var i=location;i<this.elementCount;i++){
if(object.equals(this.elementData[i])){
return i;
}}
}else{
for(var i=location;i<this.elementCount;i++){
if(this.elementData[i]==null){
return i;
}}
}return-1;
},"~O,~N");
Clazz.defineMethod(c$,"insertElementAt",
function(object,location){
if(0<=location&&location<=this.elementCount){
if(this.elementCount==this.elementData.length){
this.growByOne();
}var count=this.elementCount-location;
if(count>0){
System.arraycopy(this.elementData,location,this.elementData,location+1,count);
}this.elementData[location]=object;
this.elementCount++;
this.modCount++;
}else{
throw new ArrayIndexOutOfBoundsException(location);
}},"~O,~N");
Clazz.overrideMethod(c$,"isEmpty",
function(){
return this.elementCount==0;
});
Clazz.defineMethod(c$,"lastElement",
function(){
try{
return this.elementData[this.elementCount-1];
}catch(e){
if(Clazz.instanceOf(e,IndexOutOfBoundsException)){
throw new java.util.NoSuchElementException();
}else{
throw e;
}
}
});
Clazz.defineMethod(c$,"lastIndexOf",
function(object){
return this.lastIndexOf(object,this.elementCount-1);
},"~O");
Clazz.defineMethod(c$,"lastIndexOf",
function(object,location){
if(location<this.elementCount){
if(object!=null){
for(var i=location;i>=0;i--){
if(object.equals(this.elementData[i])){
return i;
}}
}else{
for(var i=location;i>=0;i--){
if(this.elementData[i]==null){
return i;
}}
}return-1;
}throw new ArrayIndexOutOfBoundsException(location);
},"~O,~N");
Clazz.defineMethod(c$,"remove",
function(location){
if(location<this.elementCount){
var result=this.elementData[location];
this.elementCount--;
var size=this.elementCount-location;
if(size>0){
System.arraycopy(this.elementData,location+1,this.elementData,location,size);
}this.elementData[this.elementCount]=null;
this.modCount++;
return result;
}throw new ArrayIndexOutOfBoundsException(location);
},"~N");
Clazz.defineMethod(c$,"remove",
function(object){
return this.removeElement(object);
},"~O");
Clazz.defineMethod(c$,"removeAllElements",
function(){
java.util.Arrays.fill(this.elementData,0,this.elementCount,null);
this.modCount++;
this.elementCount=0;
});
Clazz.defineMethod(c$,"removeElement",
function(object){
var index;
if((index=this.indexOf(object,0))==-1){
return false;
}this.removeElementAt(index);
return true;
},"~O");
Clazz.defineMethod(c$,"removeElementAt",
function(location){
if(0<=location&&location<this.elementCount){
this.elementCount--;
var size=this.elementCount-location;
if(size>0){
System.arraycopy(this.elementData,location+1,this.elementData,location,size);
}this.elementData[this.elementCount]=null;
this.modCount++;
}else{
throw new ArrayIndexOutOfBoundsException(location);
}},"~N");
Clazz.overrideMethod(c$,"removeRange",
function(start,end){
if(start>=0&&start<=end&&end<=this.size()){
if(start==end){
return;
}if(end!=this.elementCount){
System.arraycopy(this.elementData,end,this.elementData,start,this.elementCount-end);
var newCount=this.elementCount-(end-start);
java.util.Arrays.fill(this.elementData,newCount,this.elementCount,null);
this.elementCount=newCount;
}else{
java.util.Arrays.fill(this.elementData,start,this.elementCount,null);
this.elementCount=start;
}this.modCount++;
}else{
throw new IndexOutOfBoundsException();
}},"~N,~N");
Clazz.overrideMethod(c$,"set",
function(location,object){
if(location<this.elementCount){
var result=this.elementData[location];
this.elementData[location]=object;
return result;
}throw new ArrayIndexOutOfBoundsException(location);
},"~N,~O");
Clazz.defineMethod(c$,"setElementAt",
function(object,location){
if(location<this.elementCount){
this.elementData[location]=object;
}else{
throw new ArrayIndexOutOfBoundsException(location);
}},"~O,~N");
Clazz.defineMethod(c$,"setSize",
function(length){
if(length==this.elementCount){
return;
}this.ensureCapacity(length);
if(this.elementCount>length){
java.util.Arrays.fill(this.elementData,length,this.elementCount,null);
}this.elementCount=length;
this.modCount++;
},"~N");
Clazz.overrideMethod(c$,"size",
function(){
return this.elementCount;
});
Clazz.overrideMethod(c$,"subList",
function(start,end){
return new java.util.Collections.SynchronizedRandomAccessList(Clazz.superCall(this,java.util.Vector,"subList",[start,end]),this);
},"~N,~N");
Clazz.defineMethod(c$,"toArray",
function(){
var result=new Array(this.elementCount);
System.arraycopy(this.elementData,0,result,0,this.elementCount);
return result;
});
Clazz.defineMethod(c$,"toArray",
function(contents){
if(this.elementCount>contents.length){
var ct=contents.getClass().getComponentType();
contents=java.lang.reflect.Array.newInstance(ct,this.elementCount);
}System.arraycopy(this.elementData,0,contents,0,this.elementCount);
if(this.elementCount<contents.length){
contents[this.elementCount]=null;
}return contents;
},"~A");
Clazz.overrideMethod(c$,"toString",
function(){
if(this.elementCount==0){
return"[]";
}var length=this.elementCount-1;
var buffer=new StringBuffer(this.size()*16);
buffer.append('[');
for(var i=0;i<length;i++){
if(this.elementData[i]===this){
buffer.append("(this Collection)");
}else{
buffer.append(this.elementData[i]);
}buffer.append(", ");
}
if(this.elementData[length]===this){
buffer.append("(this Collection)");
}else{
buffer.append(this.elementData[length]);
}buffer.append(']');
return buffer.toString();
});
Clazz.defineMethod(c$,"trimToSize",
function(){
if(this.elementData.length!=this.elementCount){
this.grow(this.elementCount);
}});
c$.$Vector$1$=function(){
Clazz.pu$h(self.c$);
c$=Clazz.decorateAsClass(function(){
Clazz.prepareCallback(this,arguments);
this.pos=0;
Clazz.instantialize(this,arguments);
},java.util,"Vector$1",null,java.util.Enumeration);
Clazz.overrideMethod(c$,"hasMoreElements",
function(){
return this.pos<this.b$["java.util.Vector"].elementCount;
});
Clazz.overrideMethod(c$,"nextElement",
function(){
{
if(this.pos<this.b$["java.util.Vector"].elementCount){
return this.b$["java.util.Vector"].elementData[this.pos++];
}}throw new java.util.NoSuchElementException();
});
c$=Clazz.p0p();
};
Clazz.defineStatics(c$,
"DEFAULT_SIZE",10);
});
