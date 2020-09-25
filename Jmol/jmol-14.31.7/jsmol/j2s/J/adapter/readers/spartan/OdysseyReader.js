Clazz.declarePackage ("J.adapter.readers.spartan");
Clazz.load (["J.adapter.readers.spartan.SpartanInputReader"], "J.adapter.readers.spartan.OdysseyReader", null, function () {
c$ = Clazz.declareType (J.adapter.readers.spartan, "OdysseyReader", J.adapter.readers.spartan.SpartanInputReader);
Clazz.overrideMethod (c$, "initializeReader", 
function () {
var title = this.readInputRecords ();
this.asc.setAtomSetName (title == null ? "Odyssey file" : title);
this.continuing = false;
});
});
