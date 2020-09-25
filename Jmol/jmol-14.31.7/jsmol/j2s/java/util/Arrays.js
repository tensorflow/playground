// BH adjusted to have only one sort method.
// BH 4/7/2017 1:49:45 PM fixing "instanceof Comparable"
// BH adding copyOf 7/12/2016 10:35:01 AM
Clazz.load(["java.util.AbstractList","$.RandomAccess"],"java.util.Arrays",["java.lang.ArrayIndexOutOfBoundsException","$.IllegalArgumentException","$.NullPointerException"],function(){
c$=Clazz.declareType(java.util,"Arrays");

c$.sort=Clazz.overrideMethod(c$,"sort",
function(a,c,d,e){
  switch (arguments.length) {
  case 1:
    var aux=a.sort(function(o1,o2){
      if(typeof o1=="string"||Clazz.instanceOf(o1, Comparable)){
        return o1.compareTo(o2);
      }
      return o1-o2;
      });
    for(var i=0;i<a.length;i++){
      a[i]=aux[i];
    }
    return;
  case 2:
    var aux=a.sort(function(o1,o2){
      if(c!=null){
        return c.compare(o1,o2);
      }else if(typeof o1=="string"||Clazz.instanceOf(o1, Comparable)){
        return o1.compareTo(o2);
      }
      return o1-o2;
      });
    for(var i=0;i<a.length;i++){
      a[i]=aux[i];
    }
    return;
  case 3:
    var fromIndex = c;
    var toIndex = d;
    this.rangeCheck(a.length,fromIndex,toIndex);
    var aux=new Array();
    for(var i=fromIndex;i<toIndex;i++){
      aux[i-fromIndex]=a[i];
    }
    aux=aux.sort(function(o1,o2){
      if(typeof o1=="string"||Clazz.instanceOf(o1, Comparable)){
        return o1.compareTo(o2);
      }
      return o1-o2;
      });
    for(var i=fromIndex;i<toIndex;i++){
      a[i]=aux[i-fromIndex];
    }
    return;
  case 4:  
    var fromIndex = c;
    var toIndex = d;
    c = e;
    this.rangeCheck(a.length,fromIndex,toIndex);
    var aux=new Array();
    for(var i=fromIndex;i<toIndex;i++){
      aux[i-fromIndex]=a[i];
    }
    aux=aux.sort(function(o1,o2){
      if(c!=null){
        return c.compare(o1,o2);
      }else if(typeof o1=="string"||Clazz.instanceOf(o1, Comparable)){
        return o1.compareTo(o2);
      }
      return o1-o2;
      });
    for(var i=fromIndex;i<toIndex;i++){
      a[i]=aux[i-fromIndex];
    }
  }
});

c$.rangeCheck=Clazz.defineMethod(c$,"rangeCheck",
($fz=function(arrayLen,fromIndex,toIndex){
if(fromIndex>toIndex)throw new IllegalArgumentException("fromIndex("+fromIndex+") > toIndex("+toIndex+")");
if(fromIndex<0)throw new ArrayIndexOutOfBoundsException(fromIndex);
if(toIndex>arrayLen)throw new ArrayIndexOutOfBoundsException(toIndex);
},$fz.isPrivate=true,$fz),"~N,~N,~N");
c$.binarySearch=Clazz.defineMethod(c$,"binarySearch",
function(a,key){
var low=0;
var high=a.length-1;
while(low<=high){
var mid=(low+high)>>1;
var midVal=a[mid];
if(midVal<key)low=mid+1;
else if(midVal>key)high=mid-1;
else return mid;
}
return-(low+1);
},"~A,~N");
c$.binarySearch=Clazz.defineMethod(c$,"binarySearch",
function(a,key){
var low=0;
var high=a.length-1;
while(low<=high){
var mid=(low+high)>>1;
var midVal=a[mid];
var cmp=(midVal).compareTo(key);
if(cmp<0)low=mid+1;
else if(cmp>0)high=mid-1;
else return mid;
}
return-(low+1);
},"~A,~O");
c$.binarySearch=Clazz.defineMethod(c$,"binarySearch",
function(a,key,c){
if(c==null)return java.util.Arrays.binarySearch(a,key);
var low=0;
var high=a.length-1;
while(low<=high){
var mid=(low+high)>>1;
var midVal=a[mid];
var cmp=c.compare(midVal,key);
if(cmp<0)low=mid+1;
else if(cmp>0)high=mid-1;
else return mid;
}
return-(low+1);
},"~A,~O,java.util.Comparator");
c$.equals=Clazz.defineMethod(c$,"equals",
function(a,a2){
if(a===a2)return true;
if(a==null||a2==null)return false;
var length=a.length;
if(a2.length!=length)return false;
for(var i=0;i<length;i++){
var o1=a[i];
var o2=a2[i];
{
if(!(o1==null?o2==null:(o1.equals==null?o1==o2:o1.equals(o2))))return false;
}}
return true;
},"~A,~A");

c$.fill=Clazz.overrideMethod(c$,"fill",
function(a,fromIndex,toIndex,val){
if (arguments.length == 2) {
		val = fromIndex;
		fromIndex = 0;
		toIndex = a.length;
	}	
	java.util.Arrays.rangeCheck(a.length,fromIndex,toIndex);
	for(var i=fromIndex;i<toIndex;i++)a[i]=val;
});

c$.copyOf=Clazz.overrideMethod(c$,"copyOf",
function(a,len){
  var b = Clazz.newArray(len,null)
  for(var i=Math.min(a.length, len);--i >= 0;)b[i]=a[i];
  return b;
});

c$.asList=Clazz.defineMethod(c$,"asList",
function(a){
return new java.util.Arrays.ArrayList(arguments.length == 1 && Clazz.getClassName(a) == "Array" ? a : arguments); // BH must be T...
},"~A");
Clazz.pu$h(self.c$);
c$=Clazz.decorateAsClass(function(){
this.a=null;
Clazz.instantialize(this,arguments);
},java.util.Arrays,"ArrayList",java.util.AbstractList,[java.util.RandomAccess,java.io.Serializable]);
Clazz.makeConstructor(c$,
function(a){
Clazz.superConstructor(this,java.util.Arrays.ArrayList,[]);
if(a==null)throw new NullPointerException();
this.a=a;
},"~A");
Clazz.overrideMethod(c$,"size",
function(){
return this.a.length;
});
Clazz.defineMethod(c$,"toArray",
function(){
return this.a.clone();
});
Clazz.overrideMethod(c$,"get",
function(a){
return this.a[a];
},"~N");
Clazz.overrideMethod(c$,"set",
function(a,b){
var c=this.a[a];
this.a[a]=b;
return c;
},"~N,~O");
Clazz.overrideMethod(c$,"indexOf",
function(a){
if(a==null){
for(var b=0;b<this.a.length;b++)if(this.a[b]==null)return b;

}else{
for(var b=0;b<this.a.length;b++)if(a.equals(this.a[b]))return b;

}return-1;
},"~O");
Clazz.overrideMethod(c$,"contains",
function(a){
return this.indexOf(a)!=-1;
},"~O");
c$=Clazz.p0p();
Clazz.defineStatics(c$,
"INSERTIONSORT_THRESHOLD",7);
});
