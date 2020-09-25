Clazz.declarePackage("java.net");
Clazz.load(null,"java.net.URLDecoder",["java.lang.NullPointerException"],function(){
c$=Clazz.declareType(java.net,"URLDecoder");
c$.decode=Clazz.defineMethod(c$,"decode",
function(s){
return decodeURIComponent(s);
},"~S");
c$.decode=Clazz.defineMethod(c$,"decode",
function(s,enc){
return decodeURIComponent(s);
},"~S,~S");
});
