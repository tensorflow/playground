Array.getComponentType=function(){
return Object;
};c$=Clazz.declareType(java.lang.reflect,"Array");
c$.newInstance=Clazz.defineMethod(c$,"newInstance",
function(componentType,size){
return Clazz.newArray(length);
},"Class,~N");
