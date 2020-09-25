Clazz.declarePackage ("JU");
Clazz.load (["JU.BinaryDocument", "$.CompoundDocHeader", "$.Lst"], "JU.CompoundDocument", ["java.io.DataInputStream", "JU.CompoundDocDirEntry", "$.SB", "$.ZipData"], function () {
c$ = Clazz.decorateAsClass (function () {
this.header = null;
this.directory = null;
this.rootEntry = null;
this.jzt = null;
this.SAT = null;
this.SSAT = null;
this.sectorSize = 0;
this.shortSectorSize = 0;
this.nShortSectorsPerStandardSector = 0;
this.nIntPerSector = 0;
this.nDirEntriesperSector = 0;
Clazz.instantialize (this, arguments);
}, JU, "CompoundDocument", JU.BinaryDocument);
Clazz.prepareFields (c$, function () {
this.header =  new JU.CompoundDocHeader (this);
this.directory =  new JU.Lst ();
});
Clazz.makeConstructor (c$, 
function () {
Clazz.superConstructor (this, JU.CompoundDocument);
this.isBigEndian = true;
});
Clazz.defineMethod (c$, "setDocStream", 
function (jzt, bis) {
this.jzt = jzt;
if (!this.isRandom) {
this.stream =  new java.io.DataInputStream (bis);
}this.stream.mark (2147483647);
if (!this.readHeader ()) return;
this.getSectorAllocationTable ();
this.getShortSectorAllocationTable ();
this.getDirectoryTable ();
}, "javajs.api.GenericZipTools,java.io.BufferedInputStream");
Clazz.defineMethod (c$, "getDirectory", 
function () {
return this.directory;
});
Clazz.defineMethod (c$, "getDirectoryListing", 
function (separator) {
var sb =  new JU.SB ();
for (var i = 0; i < this.directory.size (); i++) {
var thisEntry = this.directory.get (i);
if (!thisEntry.isEmpty) sb.append (separator).append (thisEntry.entryName).append ("\tlen=").appendI (thisEntry.lenStream).append ("\tSID=").appendI (thisEntry.SIDfirstSector).append (thisEntry.isStandard ? "\tfileOffset=" + this.getOffset (thisEntry.SIDfirstSector) : "");
}
return sb.toString ();
}, "~S");
Clazz.defineMethod (c$, "getAllData", 
function () {
return this.getAllDataFiles (null, null);
});
Clazz.overrideMethod (c$, "getAllDataMapped", 
function (prefix, binaryFileList, fileData) {
fileData.put ("#Directory_Listing", this.getDirectoryListing ("|"));
binaryFileList = "|" + binaryFileList + "|";
for (var i = 0; i < this.directory.size (); i++) {
var thisEntry = this.directory.get (i);
if (!thisEntry.isEmpty && thisEntry.entryType != 5) {
var name = thisEntry.entryName;
System.out.println ("CompoundDocument file " + name);
var isBinary = (binaryFileList.indexOf ("|" + name + "|") >= 0);
if (isBinary) name += ":asBinaryString";
fileData.put (prefix + "/" + name, this.appendData ( new JU.SB (), name, thisEntry, isBinary).toString ());
}}
this.close ();
}, "~S,~S,java.util.Map");
Clazz.overrideMethod (c$, "getAllDataFiles", 
function (binaryFileList, firstFile) {
var data =  new JU.SB ();
data.append ("Compound Document File Directory: ");
data.append (this.getDirectoryListing ("|"));
data.append ("\n");
var thisEntry;
binaryFileList = "|" + binaryFileList + "|";
for (var i = 0, n = this.directory.size (); i < n; i++) {
thisEntry = this.directory.get (i);
var name = thisEntry.entryName;
switch (thisEntry.entryType) {
case 5:
break;
case 1:
data.append ("NEW Directory ").append (name).append ("\n");
break;
case 2:
if (name.endsWith (".gz")) name = name.substring (0, name.length - 3);
this.appendData (data, name, thisEntry, binaryFileList.indexOf ("|" + thisEntry.entryName + "|") >= 0);
break;
}
}
this.close ();
return data;
}, "~S,~S");
Clazz.defineMethod (c$, "appendData", 
 function (data, name, thisEntry, isBinary) {
data.append ("BEGIN Directory Entry ").append (name).append ("\n");
data.appendSB (this.getEntryAsString (thisEntry, isBinary));
data.append ("\nEND Directory Entry ").append (name).append ("\n");
return data;
}, "JU.SB,~S,JU.CompoundDocDirEntry,~B");
Clazz.defineMethod (c$, "getFileAsString", 
function (entryName) {
for (var i = 0; i < this.directory.size (); i++) {
var thisEntry = this.directory.get (i);
if (thisEntry.entryName.equals (entryName)) return this.getEntryAsString (thisEntry, false);
}
return  new JU.SB ();
}, "~S");
Clazz.defineMethod (c$, "getOffset", 
 function (SID) {
return (SID + 1) * this.sectorSize;
}, "~N");
Clazz.defineMethod (c$, "gotoSector", 
 function (SID) {
this.seek (this.getOffset (SID));
}, "~N");
Clazz.defineMethod (c$, "readHeader", 
 function () {
if (!this.header.readData ()) return false;
this.sectorSize = 1 << this.header.sectorPower;
this.shortSectorSize = 1 << this.header.shortSectorPower;
this.nShortSectorsPerStandardSector = Clazz.doubleToInt (this.sectorSize / this.shortSectorSize);
this.nIntPerSector = Clazz.doubleToInt (this.sectorSize / 4);
this.nDirEntriesperSector = Clazz.doubleToInt (this.sectorSize / 128);
return true;
});
Clazz.defineMethod (c$, "getSectorAllocationTable", 
 function () {
var nSID = 0;
var thisSID;
this.SAT =  Clazz.newIntArray (this.header.nSATsectors * this.nIntPerSector + 109, 0);
try {
for (var i = 0; i < 109; i++) {
thisSID = this.header.MSAT0[i];
if (thisSID < 0) break;
this.gotoSector (thisSID);
for (var j = 0; j < this.nIntPerSector; j++) {
this.SAT[nSID++] = this.readInt ();
}
}
var nMaster = this.header.nAdditionalMATsectors;
thisSID = this.header.SID_MSAT_next;
var MSAT =  Clazz.newIntArray (this.nIntPerSector, 0);
out : while (nMaster-- > 0 && thisSID >= 0) {
this.gotoSector (thisSID);
for (var i = 0; i < this.nIntPerSector; i++) MSAT[i] = this.readInt ();

for (var i = 0; i < this.nIntPerSector - 1; i++) {
thisSID = MSAT[i];
if (thisSID < 0) break out;
this.gotoSector (thisSID);
for (var j = this.nIntPerSector; --j >= 0; ) this.SAT[nSID++] = this.readInt ();

}
thisSID = MSAT[this.nIntPerSector - 1];
}
} catch (e) {
if (Clazz.exceptionOf (e, Exception)) {
System.out.println (e.toString ());
} else {
throw e;
}
}
});
Clazz.defineMethod (c$, "getShortSectorAllocationTable", 
 function () {
var nSSID = 0;
var thisSID = this.header.SID_SSAT_start;
var nMax = this.header.nSSATsectors * this.nIntPerSector;
this.SSAT =  Clazz.newIntArray (nMax, 0);
try {
while (thisSID > 0 && nSSID < nMax) {
this.gotoSector (thisSID);
for (var j = 0; j < this.nIntPerSector; j++) {
this.SSAT[nSSID++] = this.readInt ();
}
thisSID = this.SAT[thisSID];
}
} catch (e) {
if (Clazz.exceptionOf (e, Exception)) {
System.out.println (e.toString ());
} else {
throw e;
}
}
});
Clazz.defineMethod (c$, "getDirectoryTable", 
 function () {
var thisSID = this.header.SID_DIR_start;
var thisEntry;
this.rootEntry = null;
try {
while (thisSID > 0) {
this.gotoSector (thisSID);
for (var j = this.nDirEntriesperSector; --j >= 0; ) {
thisEntry =  new JU.CompoundDocDirEntry (this);
thisEntry.readData ();
this.directory.addLast (thisEntry);
if (thisEntry.entryType == 5) this.rootEntry = thisEntry;
}
thisSID = this.SAT[thisSID];
}
} catch (e) {
if (Clazz.exceptionOf (e, Exception)) {
System.out.println (e.toString ());
} else {
throw e;
}
}
});
Clazz.defineMethod (c$, "getEntryAsString", 
 function (thisEntry, asBinaryString) {
if (thisEntry.isEmpty) return  new JU.SB ();
return (thisEntry.isStandard ? this.getStandardStringData (thisEntry.SIDfirstSector, thisEntry.lenStream, asBinaryString) : this.getShortStringData (thisEntry.SIDfirstSector, thisEntry.lenStream, asBinaryString));
}, "JU.CompoundDocDirEntry,~B");
Clazz.defineMethod (c$, "getStandardStringData", 
 function (thisSID, nBytes, asBinaryString) {
var data =  new JU.SB ();
var byteBuf =  Clazz.newByteArray (this.sectorSize, 0);
var gzipData =  new JU.ZipData (nBytes);
try {
while (thisSID > 0 && nBytes > 0) {
this.gotoSector (thisSID);
nBytes = this.getSectorData (data, byteBuf, this.sectorSize, nBytes, asBinaryString, gzipData);
thisSID = this.SAT[thisSID];
}
if (nBytes == -9999) return  new JU.SB ();
} catch (e) {
if (Clazz.exceptionOf (e, Exception)) {
System.out.println (e.toString ());
} else {
throw e;
}
}
if (gzipData.isEnabled) gzipData.addTo (this.jzt, data);
return data;
}, "~N,~N,~B");
Clazz.defineMethod (c$, "getSectorData", 
 function (data, byteBuf, nSectorBytes, nBytes, asBinaryString, gzipData) {
this.readByteArray (byteBuf, 0, byteBuf.length);
var n = gzipData.addBytes (byteBuf, nSectorBytes, nBytes);
if (n >= 0) return n;
if (asBinaryString) {
for (var i = 0; i < nSectorBytes; i++) {
data.append (Integer.toHexString (byteBuf[i] & 0xFF)).appendC (' ');
if (--nBytes < 1) break;
}
} else {
for (var i = 0; i < nSectorBytes; i++) {
if (byteBuf[i] == 0) return -9999;
data.appendC (String.fromCharCode (byteBuf[i]));
if (--nBytes < 1) break;
}
}return nBytes;
}, "JU.SB,~A,~N,~N,~B,JU.ZipData");
Clazz.defineMethod (c$, "getShortStringData", 
 function (shortSID, nBytes, asBinaryString) {
var data =  new JU.SB ();
if (this.rootEntry == null) return data;
var thisSID = this.rootEntry.SIDfirstSector;
var ptShort = 0;
var byteBuf =  Clazz.newByteArray (this.shortSectorSize, 0);
var gzipData =  new JU.ZipData (nBytes);
try {
while (thisSID >= 0 && shortSID >= 0 && nBytes > 0) {
while (shortSID - ptShort >= this.nShortSectorsPerStandardSector) {
ptShort += this.nShortSectorsPerStandardSector;
thisSID = this.SAT[thisSID];
}
this.seek (this.getOffset (thisSID) + (shortSID - ptShort) * this.shortSectorSize);
nBytes = this.getSectorData (data, byteBuf, this.shortSectorSize, nBytes, asBinaryString, gzipData);
shortSID = this.SSAT[shortSID];
}
} catch (e) {
if (Clazz.exceptionOf (e, Exception)) {
System.out.println (data.toString ());
System.out.println ("reader error in CompoundDocument " + e.toString ());
} else {
throw e;
}
}
if (gzipData.isEnabled) gzipData.addTo (this.jzt, data);
return data;
}, "~N,~N,~B");
});
