Clazz.declarePackage ("JU");
Clazz.load (null, "JU.TempArray", ["java.lang.Boolean", "$.Float", "JU.P3", "$.P3i"], function () {
c$ = Clazz.decorateAsClass (function () {
this.lengthsFreePoints = null;
this.freePoints = null;
this.lengthsFreeScreens = null;
this.freeScreens = null;
this.lengthsFreeEnum = null;
this.freeEnum = null;
Clazz.instantialize (this, arguments);
}, JU, "TempArray");
Clazz.prepareFields (c$, function () {
this.lengthsFreePoints =  Clazz.newIntArray (6, 0);
this.freePoints =  new Array (6);
this.lengthsFreeScreens =  Clazz.newIntArray (6, 0);
this.freeScreens =  new Array (6);
this.lengthsFreeEnum =  Clazz.newIntArray (2, 0);
this.freeEnum =  new Array (2);
});
Clazz.makeConstructor (c$, 
function () {
});
Clazz.defineMethod (c$, "clear", 
function () {
this.clearTempPoints ();
this.clearTempScreens ();
});
c$.findBestFit = Clazz.defineMethod (c$, "findBestFit", 
 function (size, lengths) {
var iFit = -1;
var fitLength = 2147483647;
for (var i = lengths.length; --i >= 0; ) {
var freeLength = lengths[i];
if (freeLength >= size && freeLength < fitLength) {
fitLength = freeLength;
iFit = i;
}}
if (iFit >= 0) lengths[iFit] = 0;
return iFit;
}, "~N,~A");
c$.findShorter = Clazz.defineMethod (c$, "findShorter", 
 function (size, lengths) {
for (var i = lengths.length; --i >= 0; ) if (lengths[i] == 0) {
lengths[i] = size;
return i;
}
var iShortest = 0;
var shortest = lengths[0];
for (var i = lengths.length; --i > 0; ) if (lengths[i] < shortest) {
shortest = lengths[i];
iShortest = i;
}
if (shortest < size) {
lengths[iShortest] = size;
return iShortest;
}return -1;
}, "~N,~A");
Clazz.defineMethod (c$, "clearTempPoints", 
 function () {
for (var i = 0; i < 6; i++) {
this.lengthsFreePoints[i] = 0;
this.freePoints[i] = null;
}
});
Clazz.defineMethod (c$, "allocTempPoints", 
function (size) {
var tempPoints;
var iFit = JU.TempArray.findBestFit (size, this.lengthsFreePoints);
if (iFit > 0) {
tempPoints = this.freePoints[iFit];
} else {
tempPoints =  new Array (size);
for (var i = size; --i >= 0; ) tempPoints[i] =  new JU.P3 ();

}return tempPoints;
}, "~N");
Clazz.defineMethod (c$, "freeTempPoints", 
function (tempPoints) {
for (var i = 0; i < this.freePoints.length; i++) if (this.freePoints[i] === tempPoints) {
this.lengthsFreePoints[i] = tempPoints.length;
return;
}
var iFree = JU.TempArray.findShorter (tempPoints.length, this.lengthsFreePoints);
if (iFree >= 0) this.freePoints[iFree] = tempPoints;
}, "~A");
Clazz.defineMethod (c$, "clearTempScreens", 
 function () {
for (var i = 0; i < 6; i++) {
this.lengthsFreeScreens[i] = 0;
this.freeScreens[i] = null;
}
});
Clazz.defineMethod (c$, "allocTempScreens", 
function (size) {
var tempScreens;
var iFit = JU.TempArray.findBestFit (size, this.lengthsFreeScreens);
if (iFit > 0) {
tempScreens = this.freeScreens[iFit];
} else {
tempScreens =  new Array (size);
for (var i = size; --i >= 0; ) tempScreens[i] =  new JU.P3i ();

}return tempScreens;
}, "~N");
Clazz.defineMethod (c$, "freeTempScreens", 
function (tempScreens) {
for (var i = 0; i < this.freeScreens.length; i++) if (this.freeScreens[i] === tempScreens) {
this.lengthsFreeScreens[i] = tempScreens.length;
return;
}
var iFree = JU.TempArray.findShorter (tempScreens.length, this.lengthsFreeScreens);
if (iFree >= 0) this.freeScreens[iFree] = tempScreens;
}, "~A");
Clazz.defineMethod (c$, "allocTempEnum", 
function (size) {
var tempEnum;
var iFit = JU.TempArray.findBestFit (size, this.lengthsFreeEnum);
if (iFit > 0) {
tempEnum = this.freeEnum[iFit];
} else {
tempEnum =  new Array (size);
}return tempEnum;
}, "~N");
Clazz.defineMethod (c$, "freeTempEnum", 
function (tempEnum) {
for (var i = 0; i < this.freeEnum.length; i++) if (this.freeEnum[i] === tempEnum) {
this.lengthsFreeEnum[i] = tempEnum.length;
return;
}
var iFree = JU.TempArray.findShorter (tempEnum.length, this.lengthsFreeEnum);
if (iFree >= 0) this.freeEnum[iFree] = tempEnum;
}, "~A");
c$.getSlabWithinRange = Clazz.defineMethod (c$, "getSlabWithinRange", 
function (min, max) {
return  Clazz.newArray (-1, [Integer.$valueOf (1073742114),  Clazz.newArray (-1, [Float.$valueOf (min), Float.$valueOf (max)]), Boolean.FALSE, null]);
}, "~N,~N");
c$.getSlabObjectType = Clazz.defineMethod (c$, "getSlabObjectType", 
function (tok, data, isCap, colorData) {
return  Clazz.newArray (-1, [Integer.$valueOf (tok), data, Boolean.$valueOf (isCap), colorData]);
}, "~N,~O,~B,~O");
Clazz.defineStatics (c$,
"freePointsSize", 6,
"freeScreensSize", 6,
"freeEnumSize", 2);
});
