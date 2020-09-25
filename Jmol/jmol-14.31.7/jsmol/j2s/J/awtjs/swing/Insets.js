Clazz.declarePackage ("JS");
c$ = Clazz.decorateAsClass (function () {
this.top = 0;
this.left = 0;
this.bottom = 0;
this.right = 0;
Clazz.instantialize (this, arguments);
}, JS, "Insets");
Clazz.makeConstructor (c$, 
function (top, left, bottom, right) {
this.top = top;
this.left = left;
this.bottom = bottom;
this.right = right;
}, "~N,~N,~N,~N");
