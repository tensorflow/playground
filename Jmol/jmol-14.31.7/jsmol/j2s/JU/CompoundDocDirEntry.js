Clazz.declarePackage ("JU");
c$ = Clazz.decorateAsClass (function () {
this.cd = null;
this.unicodeName64 = null;
this.nBytesUnicodeName = 0;
this.entryType = 0;
this.uniqueID16 = null;
this.userflags4 = null;
this.SIDfirstSector = 0;
this.lenStream = 0;
this.unused = null;
this.entryName = null;
this.isStandard = false;
this.isEmpty = false;
Clazz.instantialize (this, arguments);
}, JU, "CompoundDocDirEntry");
Clazz.prepareFields (c$, function () {
this.unicodeName64 =  Clazz.newByteArray (64, 0);
this.uniqueID16 =  Clazz.newByteArray (16, 0);
this.userflags4 =  Clazz.newByteArray (4, 0);
this.unused =  Clazz.newByteArray (8, 0);
});
Clazz.makeConstructor (c$, 
function (compoundDocument) {
this.cd = compoundDocument;
}, "JU.CompoundDocument");
Clazz.defineMethod (c$, "readData", 
function () {
try {
this.cd.readByteArray (this.unicodeName64, 0, 64);
this.nBytesUnicodeName = this.cd.readShort ();
this.entryType = this.cd.readByte ();
this.cd.readByte ();
this.cd.readInt ();
this.cd.readInt ();
this.cd.readInt ();
this.cd.readByteArray (this.uniqueID16, 0, 16);
this.cd.readByteArray (this.userflags4, 0, 4);
this.cd.readByteArray (this.unused, 0, 8);
this.cd.readByteArray (this.unused, 0, 8);
this.SIDfirstSector = this.cd.readInt ();
this.lenStream = this.cd.readInt ();
this.cd.readByteArray (this.unused, 0, 4);
} catch (e) {
if (Clazz.exceptionOf (e, Exception)) {
System.out.println (e.toString ());
return false;
} else {
throw e;
}
}
this.entryName = "";
for (var i = 0; i < this.nBytesUnicodeName - 2; i += 2) this.entryName += String.fromCharCode (this.unicodeName64[i]);

this.isStandard = (this.entryType == 5 || this.lenStream >= this.cd.header.minBytesStandardStream);
this.isEmpty = (this.entryType == 0 || this.lenStream <= 0);
return true;
});
Clazz.overrideMethod (c$, "toString", 
function () {
return this.entryName + " " + this.lenStream;
});
