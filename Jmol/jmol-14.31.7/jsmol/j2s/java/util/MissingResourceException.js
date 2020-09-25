Clazz.load(["java.lang.RuntimeException"],"java.util.MissingResourceException",null,function(){
c$=Clazz.decorateAsClass(function(){
this.className=null;
this.key=null;
Clazz.instantialize(this,arguments);
},java.util,"MissingResourceException",RuntimeException);
Clazz.makeConstructor(c$,
function(detailMessage,className,resourceName){
Clazz.superConstructor(this,java.util.MissingResourceException,[detailMessage]);
this.className=className;
this.key=resourceName;
},"~S,~S,~S");
Clazz.defineMethod(c$,"getClassName",
function(){
return this.className;
});
Clazz.defineMethod(c$,"getKey",
function(){
return this.key;
});
});
