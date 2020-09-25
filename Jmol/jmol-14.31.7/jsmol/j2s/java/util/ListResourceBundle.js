Clazz.load(["java.util.ResourceBundle"],"java.util.ListResourceBundle",["java.util.Enumeration","$.Hashtable"],function(){
c$=Clazz.decorateAsClass(function(){
this.table=null;
Clazz.instantialize(this,arguments);
},java.util,"ListResourceBundle",java.util.ResourceBundle);
Clazz.defineMethod(c$,"getKeys",
function(){
if(this.table==null){
this.initializeTable();
}if(this.parent==null){
return this.table.keys();
}return((Clazz.isClassDefined("java.util.ListResourceBundle$1")?0:java.util.ListResourceBundle.$ListResourceBundle$1$()),Clazz.innerTypeInstance(java.util.ListResourceBundle$1,this,null));
});
Clazz.overrideMethod(c$,"handleGetObject",
function(key){
if(this.table==null){
this.initializeTable();
}return this.table.get(key);
},"~S");
Clazz.defineMethod(c$,"initializeTable",
($fz=function(){
if(this.table==null){
var contents=this.getContents();
this.table=new java.util.Hashtable(Math.floor(contents.length/3)*4+3);
for(var i=0;i<contents.length;i++){
this.table.put(contents[i][0],contents[i][1]);
}
}},$fz.isPrivate=true,$fz));
c$.$ListResourceBundle$1$=function(){
Clazz.pu$h(self.c$);
c$=Clazz.decorateAsClass(function(){
Clazz.prepareCallback(this,arguments);
this.local=null;
this.pEnum=null;
this.$nextElement=null;
Clazz.instantialize(this,arguments);
},java.util,"ListResourceBundle$1",null,java.util.Enumeration);
Clazz.prepareFields(c$,function(){
this.local=this.b$["java.util.ListResourceBundle"].table.keys();
this.pEnum=this.b$["java.util.ListResourceBundle"].parent.getKeys();
});
Clazz.defineMethod(c$,"findNext",
($fz=function(){
if(this.$nextElement!=null){
return true;
}while(this.pEnum.hasMoreElements()){
var next=this.pEnum.nextElement();
if(!this.b$["java.util.ListResourceBundle"].table.containsKey(next)){
this.$nextElement=next;
return true;
}}
return false;
},$fz.isPrivate=true,$fz));
Clazz.defineMethod(c$,"hasMoreElements",
function(){
if(this.local.hasMoreElements()){
return true;
}return this.findNext();
});
Clazz.defineMethod(c$,"nextElement",
function(){
if(this.local.hasMoreElements()){
return this.local.nextElement();
}if(this.findNext()){
var result=this.$nextElement;
this.$nextElement=null;
return result;
}return this.pEnum.nextElement();
});
c$=Clazz.p0p();
};
});
