Clazz.load(null,"java.lang.StrictMath",["java.lang.Double","$.Float"],function(){
c$=Clazz.declareType(java.lang,"StrictMath");
c$.abs=Clazz.defineMethod(c$,"abs",
function(d){
return Math.abs(d);
},"~N");
c$.acos=Clazz.defineMethod(c$,"acos",
function(d){
return Math.acos(d);
},"~N");
c$.asin=Clazz.defineMethod(c$,"asin",
function(d){
return Math.asin(d);
},"~N");
c$.atan=Clazz.defineMethod(c$,"atan",
function(d){
return Math.atan(d);
},"~N");
c$.atan2=Clazz.defineMethod(c$,"atan2",
function(d1,d2){
return Math.atan2(d1,d2);
},"~N,~N");
c$.ceil=Clazz.defineMethod(c$,"ceil",
function(d){
return Math.ceil(d);
},"~N");
c$.cosh=Clazz.defineMethod(c$,"cosh",
function(d){
return Math.cosh(d);
},"~N");
c$.cos=Clazz.defineMethod(c$,"cos",
function(d){
return Math.cos(d);
},"~N");
c$.exp=Clazz.defineMethod(c$,"exp",
function(d){
return Math.exp(d);
},"~N");
c$.floor=Clazz.defineMethod(c$,"floor",
function(d){
return Math.floor(d);
},"~N");
c$.log=Clazz.defineMethod(c$,"log",
function(d){
return Math.log(d);
},"~N");
c$.log10=Clazz.defineMethod(c$,"log10",
function(d){
return Math.log10(d);
},"~N");
c$.max=Clazz.defineMethod(c$,"max",
function(d1,d2){
return Math.max(d1,d2);
},"~N,~N");
c$.min=Clazz.defineMethod(c$,"min",
function(d1,d2){
return Math.min(d1,d2);
},"~N,~N");
c$.pow=Clazz.defineMethod(c$,"pow",
function(d1,d2){
return Math.pow(d1,d2);
},"~N,~N");
c$.random=Clazz.defineMethod(c$,"random",
function(){
return Math.random();
});
c$.rint=Clazz.defineMethod(c$,"rint",
function(d){
return Math.round(d);
},"~N");
c$.round=Clazz.defineMethod(c$,"round",
function(d){
return Math.round(d);
},"~N");
c$.signum=Clazz.defineMethod(c$,"signum",
function(d){
if(Double.isNaN(d)){
return NaN;
}var sig=d;
if(d>0){
sig=1.0;
}else if(d<0){
sig=-1.0;
}return sig;
},"~N");
c$.signum=Clazz.defineMethod(c$,"signum",
function(f){
if(Float.isNaN(f)){
return NaN;
}var sig=f;
if(f>0){
sig=1.0;
}else if(f<0){
sig=-1.0;
}return sig;
},"~N");
c$.sinh=Clazz.defineMethod(c$,"sinh",
function(d){
return Math.sinh(d);
},"~N");
c$.sin=Clazz.defineMethod(c$,"sin",
function(d){
return Math.sin(d);
},"~N");
c$.sqrt=Clazz.defineMethod(c$,"sqrt",
function(d){
return Math.sqrt(d);
},"~N");
c$.tan=Clazz.defineMethod(c$,"tan",
function(d){
return Math.tan(d);
},"~N");
c$.tanh=Clazz.defineMethod(c$,"tanh",
function(d){
return Math.tanh(d);
},"~N");
c$.toDegrees=Clazz.defineMethod(c$,"toDegrees",
function(angrad){
return angrad*180/3.141592653589793;
},"~N");
c$.toRadians=Clazz.defineMethod(c$,"toRadians",
function(angdeg){
return angdeg/180*3.141592653589793;
},"~N");
Clazz.defineStatics(c$,
"E",2.718281828459045,
"PI",3.141592653589793,
"$random",null);
});
