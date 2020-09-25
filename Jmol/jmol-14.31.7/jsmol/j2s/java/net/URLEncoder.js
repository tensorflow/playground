Clazz.declarePackage("java.net");
c$=Clazz.declareType(java.net,"URLEncoder");
c$.encode=Clazz.defineMethod(c$,"encode",
function(s){
return encodeURIComponent(arguments[0]);
},"~S");
c$.encode=Clazz.defineMethod(c$,"encode",
function(s,enc){
return encodeURIComponent(arguments[0]);
},"~S,~S");
Clazz.defineStatics(c$,
"digits","0123456789ABCDEF");
