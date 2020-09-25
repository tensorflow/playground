Clazz.load(["java.util.Vector"],"java.util.Observable",["java.lang.NullPointerException"],function(){
c$=Clazz.decorateAsClass(function(){
this.observers=null;
this.changed=false;
Clazz.instantialize(this,arguments);
},java.util,"Observable");
Clazz.prepareFields(c$,function(){
this.observers=new java.util.Vector();
});
Clazz.makeConstructor(c$,
function(){
});
Clazz.defineMethod(c$,"addObserver",
function(observer){
if(observer==null){
throw new NullPointerException();
}if(!this.observers.contains(observer))this.observers.addElement(observer);
},"java.util.Observer");
Clazz.defineMethod(c$,"clearChanged",
function(){
this.changed=false;
});
Clazz.defineMethod(c$,"countObservers",
function(){
return this.observers.size();
});
Clazz.defineMethod(c$,"deleteObserver",
function(observer){
this.observers.removeElement(observer);
},"java.util.Observer");
Clazz.defineMethod(c$,"deleteObservers",
function(){
this.observers.setSize(0);
});
Clazz.defineMethod(c$,"hasChanged",
function(){
return this.changed;
});
Clazz.defineMethod(c$,"notifyObservers",
function(){
this.notifyObservers(null);
});
Clazz.defineMethod(c$,"notifyObservers",
function(data){
if(this.changed){
var clone=this.observers.clone();
var size=clone.size();
for(var i=0;i<size;i++){
clone.elementAt(i).update(this,data);
}
this.clearChanged();
}},"~O");
Clazz.defineMethod(c$,"setChanged",
function(){
this.changed=true;
});
});
