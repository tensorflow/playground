Clazz.declarePackage("java.util.regex");
Clazz.load(["java.lang.IllegalArgumentException"],"java.util.regex.PatternSyntaxException",null,function(){
c$=Clazz.decorateAsClass(function(){
this.desc=null;
this.pattern=null;
this.index=-1;
Clazz.instantialize(this,arguments);
},java.util.regex,"PatternSyntaxException",IllegalArgumentException);
Clazz.makeConstructor(c$,
function(desc,pattern,index){
Clazz.superConstructor(this,java.util.regex.PatternSyntaxException,[]);
this.desc=desc;
this.pattern=pattern;
this.index=index;
},"~S,~S,~N");
Clazz.defineMethod(c$,"getPattern",
function(){
return this.pattern;
});
Clazz.overrideMethod(c$,"getMessage",
function(){
var s=this.desc;
if(this.index>=0){
s+=" near index "+this.index;
}s+="\r\n"+this.pattern;
if(this.index>=0){
s+="\r\n";
for(var i=0;i<this.index;i++)s+=(' ').charCodeAt(0);

s+=('^').charCodeAt(0);
}return s;
});
Clazz.defineMethod(c$,"getDescription",
function(){
return this.desc;
});
Clazz.defineMethod(c$,"getIndex",
function(){
return this.index;
});
});
