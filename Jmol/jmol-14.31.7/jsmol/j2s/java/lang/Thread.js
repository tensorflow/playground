Clazz.load(null,"java.lang.Thread",["java.lang.IllegalArgumentException","$.ThreadGroup","java.util.Date"],function(){
c$=Clazz.decorateAsClass(function(){
this.target=null;
this.group=null;
this.name=null;
this.priority=0;
Clazz.instantialize(this,arguments);
},java.lang,"Thread",null,Runnable);
c$.currentThread=Clazz.defineMethod(c$,"currentThread",
function(){
if(Thread.J2S_THREAD==null){
(Thread.J2S_THREAD=new Thread(),Thread.prototype.J2S_THREAD=Thread.J2S_THREAD);
}return Thread.J2S_THREAD;
});
c$.sleep=Clazz.defineMethod(c$,"sleep",
function(millis){
Clazz.alert("Thread.sleep is not implemented in Java2Script!");
},"~N");
Clazz.makeConstructor(c$,
function(){
});
Clazz.makeConstructor(c$,
function(target){
this.init(null,target,"Thread-"+new java.util.Date().getTime()+Math.random(),0);
},"Runnable");
Clazz.makeConstructor(c$,
function(group,target){
this.init(group,target,"Thread-"+new java.util.Date().getTime()+Math.random(),0);
},"ThreadGroup,Runnable");
Clazz.makeConstructor(c$,
function(name){
this.init(null,null,name,0);
},"~S");
Clazz.makeConstructor(c$,
function(group,name){
this.init(group,null,name,0);
},"ThreadGroup,~S");
Clazz.makeConstructor(c$,
function(target,name){
this.init(null,target,name,0);
},"Runnable,~S");
Clazz.makeConstructor(c$,
function(group,target,name){
this.init(group,target,name,0);
},"ThreadGroup,Runnable,~S");
Clazz.makeConstructor(c$,
function(group,target,name,stackSize){
this.init(group,target,name,stackSize);
},"ThreadGroup,Runnable,~S,~N");
Clazz.defineMethod(c$,"init",
($fz=function(g,target,name,stackSize){
if(g==null){
g=new ThreadGroup();
}this.group=g;
this.target=target;
this.name=name;
this.priority=5;
},$fz.isPrivate=true,$fz),"ThreadGroup,Runnable,~S,~N");
Clazz.defineMethod(c$,"start",
function(){
window.setTimeout((function(runnable){
return function(){
runnable.run();
};
})(this),0);
});
Clazz.defineMethod(c$,"run",
function(){
if(this.target!=null){
this.target.run();
}});
Clazz.defineMethod(c$,"setPriority",
function(newPriority){
if(newPriority>10||newPriority<1){
throw new IllegalArgumentException();
}this.priority=newPriority;
},"~N");
Clazz.defineMethod(c$,"getPriority",
function(){
return this.priority;
});


Clazz.defineMethod(c$,"interrupt",
function(){
 //not implemented
});

Clazz.defineMethod(c$,"setName",
function(name){
this.name=name;
},"~S");
Clazz.defineMethod(c$,"getName",
function(){
return String.valueOf(this.name);
});
Clazz.defineMethod(c$,"getThreadGroup",
function(){
return this.group;
});
Clazz.overrideMethod(c$,"toString",
function(){
var group=this.getThreadGroup();
if(group!=null){
return"Thread["+this.getName()+","+this.getPriority()+","+group.getName()+"]";
}else{
return"Thread["+this.getName()+","+this.getPriority()+","+""+"]";
}});
Clazz.defineStatics(c$,
"MIN_PRIORITY",1,
"NORM_PRIORITY",5,
"MAX_PRIORITY",10,
"J2S_THREAD",null);
});
