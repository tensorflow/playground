Clazz.declarePackage ("java.util.zip");
c$ = Clazz.decorateAsClass (function () {
this.$address = 0;
Clazz.instantialize (this, arguments);
}, java.util.zip, "ZStreamRef");
Clazz.makeConstructor (c$, 
function (address) {
this.$address = address;
}, "~N");
Clazz.defineMethod (c$, "address", 
function () {
return this.$address;
});
Clazz.defineMethod (c$, "clear", 
function () {
this.$address = 0;
});
