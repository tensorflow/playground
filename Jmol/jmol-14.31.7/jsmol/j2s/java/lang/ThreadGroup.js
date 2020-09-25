Clazz.load(null,"java.lang.ThreadGroup",["java.lang.NullPointerException","$.Thread"],function(){
c$=Clazz.decorateAsClass(function(){
this.parent=null;
this.name=null;
this.maxPriority=0;
Clazz.instantialize(this,arguments);
},java.lang,"ThreadGroup");
Clazz.makeConstructor(c$,
function(){
this.name="system";
this.maxPriority=10;
});
Clazz.makeConstructor(c$,
function(name){
this.construct(Thread.currentThread().getThreadGroup(),name);
},"~S");
Clazz.makeConstructor(c$,
function(parent,name){
if(parent==null){
throw new NullPointerException();
}this.name=name;
this.parent=parent;
this.maxPriority=10;
},"ThreadGroup,~S");
Clazz.defineMethod(c$,"getName",
function(){
return this.name;
});
Clazz.defineMethod(c$,"getParent",
function(){
return this.parent;
});
Clazz.defineMethod(c$,"getMaxPriority",
function(){
return this.maxPriority;
});
});
