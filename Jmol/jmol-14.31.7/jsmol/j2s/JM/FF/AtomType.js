Clazz.declarePackage ("JM.FF");
c$ = Clazz.decorateAsClass (function () {
this.elemNo = 0;
this.descr = null;
this.smartsCode = null;
this.mmType = 0;
this.hType = 0;
this.formalCharge = 0;
this.fcadj = 0;
this.sbmb = false;
this.arom = false;
this.pilp = false;
this.mltb = 0;
this.val = 0;
Clazz.instantialize (this, arguments);
}, JM.FF, "AtomType");
Clazz.makeConstructor (c$, 
function (elemNo, mmType, hType, formalCharge, val, descr, smartsCode) {
this.elemNo = elemNo;
this.mmType = mmType;
this.hType = hType;
this.formalCharge = formalCharge;
this.val = val;
this.descr = descr;
this.smartsCode = smartsCode;
}, "~N,~N,~N,~N,~N,~S,~S");
