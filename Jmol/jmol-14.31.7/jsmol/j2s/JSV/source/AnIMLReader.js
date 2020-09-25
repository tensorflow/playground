Clazz.declarePackage ("JSV.source");
Clazz.load (["JSV.source.XMLReader"], "JSV.source.AnIMLReader", ["java.lang.Double", "JU.BC", "$.Base64", "JSV.source.JDXSource"], function () {
c$ = Clazz.decorateAsClass (function () {
this.inResult = false;
Clazz.instantialize (this, arguments);
}, JSV.source, "AnIMLReader", JSV.source.XMLReader);
Clazz.makeConstructor (c$, 
function () {
Clazz.superConstructor (this, JSV.source.AnIMLReader, []);
});
Clazz.overrideMethod (c$, "getXML", 
function (br) {
try {
this.source =  new JSV.source.JDXSource (0, this.filePath);
this.getSimpleXmlReader (br);
this.parser.nextEvent ();
this.processXML (0, 3);
if (!this.checkPointCount ()) return null;
this.xFactor = 1;
this.yFactor = 1;
this.populateVariables ();
} catch (pe) {
if (Clazz.exceptionOf (pe, Exception)) {
System.err.println ("That file may be empty...");
this.errorLog.append ("That file may be empty... \n");
} else {
throw pe;
}
}
this.processErrors ("anIML");
try {
br.close ();
} catch (e1) {
if (Clazz.exceptionOf (e1, java.io.IOException)) {
} else {
throw e1;
}
}
return this.source;
}, "java.io.BufferedReader");
Clazz.overrideMethod (c$, "processTag", 
function (tagId) {
switch (tagId) {
case 0:
this.processAuditTrail ();
return true;
case 1:
this.processExperimentStepSet ();
return true;
case 2:
this.processSampleSet ();
return true;
case 11:
this.processAuthor ();
return true;
case 3:
this.inResult = true;
return true;
default:
System.out.println ("AnIMLReader not processing tag " + JSV.source.XMLReader.tagNames[tagId]);
return false;
}
}, "~N");
Clazz.overrideMethod (c$, "processEndTag", 
function (tagId) {
switch (tagId) {
case 3:
case 1:
this.inResult = false;
break;
}
}, "~N");
Clazz.defineMethod (c$, "processAuditTrail", 
 function () {
if (this.tagName.equals ("user")) {
this.parser.qualifiedValue ();
} else if (this.tagName.equals ("timestamp")) {
this.parser.qualifiedValue ();
}});
Clazz.defineMethod (c$, "processSampleSet", 
 function () {
if (this.tagName.equals ("sample")) this.samplenum++;
 else if (this.tagName.equals ("parameter")) {
this.attrList = this.parser.getAttrValueLC ("name");
if (this.attrList.equals ("name")) {
this.parser.qualifiedValue ();
} else if (this.attrList.equals ("owner")) {
this.parser.qualifiedValue ();
} else if (this.attrList.equals ("molecular formula")) {
this.molForm = this.parser.qualifiedValue ();
} else if (this.attrList.equals ("cas registry number")) {
this.casRN = this.parser.qualifiedValue ();
}}});
Clazz.defineMethod (c$, "processExperimentStepSet", 
 function () {
if (this.tagName.equals ("result")) {
this.inResult = true;
} else if (this.tagName.equals ("sampleref")) {
if (this.parser.getAttrValueLC ("role").contains ("samplemeasurement")) this.sampleID = this.parser.getAttrValue ("sampleID");
} else if (this.tagName.equals ("author")) {
this.process (11, true);
} else if (this.tagName.equals ("timestamp")) {
this.LongDate = this.parser.thisValue ();
} else if (this.tagName.equals ("technique")) {
this.techname = this.parser.getAttrValue ("name").toUpperCase () + " SPECTRUM";
} else if (this.tagName.equals ("vectorset") || this.tagName.equals ("seriesset") && this.inResult) {
this.npoints = Integer.parseInt (this.parser.getAttrValue ("length"));
this.xaxisData =  Clazz.newDoubleArray (this.npoints, 0);
this.yaxisData =  Clazz.newDoubleArray (this.npoints, 0);
} else if (this.tagName.equals ("vector") || this.tagName.equals ("series") && this.inResult) {
var axisLabel = this.parser.getAttrValue ("name");
var dependency = this.parser.getAttrValueLC ("dependency");
if (dependency.equals ("independent")) {
this.xUnits = axisLabel;
this.getXValues ();
} else if (dependency.equals ("dependent")) {
this.yUnits = axisLabel;
this.getYValues ();
}} else if (this.tagName.equals ("parameter")) {
if ((this.attrList = this.parser.getAttrValueLC ("name")).equals ("identifier")) {
this.title = this.parser.qualifiedValue ();
} else if (this.attrList.equals ("nucleus")) {
this.obNucleus = this.parser.qualifiedValue ();
} else if (this.attrList.equals ("observefrequency")) {
this.StrObFreq = this.parser.qualifiedValue ();
this.obFreq = Double.parseDouble (this.StrObFreq);
} else if (this.attrList.equals ("referencepoint")) {
this.refPoint = Double.parseDouble (this.parser.qualifiedValue ());
} else if (this.attrList.equals ("sample path length")) {
this.pathlength = this.parser.qualifiedValue ();
} else if (this.attrList.equals ("scanmode")) {
this.parser.thisValue ();
} else if (this.attrList.equals ("manufacturer")) {
this.vendor = this.parser.thisValue ();
} else if (this.attrList.equals ("model name")) {
this.modelType = this.parser.thisValue ();
} else if (this.attrList.equals ("resolution")) {
this.resolution = this.parser.qualifiedValue ();
}}});
Clazz.defineMethod (c$, "getXValues", 
 function () {
this.parser.nextTag ();
if (this.parser.getTagName ().equals ("autoincrementedvalueset")) {
this.parser.nextTag ();
if (this.parser.getTagName ().equals ("startvalue")) this.firstX = Double.parseDouble (this.parser.qualifiedValue ());
this.nextStartTag ();
if (this.parser.getTagName ().equals ("increment")) this.deltaX = Double.parseDouble (this.parser.qualifiedValue ());
}if (!this.inResult) {
this.nextStartTag ();
this.xUnits = this.parser.getAttrValue ("label");
}this.increasing = (this.deltaX > 0 ? true : false);
this.continuous = true;
for (var j = 0; j < this.npoints; j++) this.xaxisData[j] = this.firstX + (this.deltaX * j);

this.lastX = this.xaxisData[this.npoints - 1];
});
Clazz.defineMethod (c$, "nextStartTag", 
 function () {
this.parser.nextStartTag ();
while (this.parser.getTagType () == 6) {
this.parser.nextStartTag ();
}
});
Clazz.defineMethod (c$, "getYValues", 
 function () {
var vectorType = this.parser.getAttrValueLC ("type");
if (vectorType.length == 0) vectorType = this.parser.getAttrValueLC ("vectorType");
this.parser.nextTag ();
this.tagName = this.parser.getTagName ();
if (this.tagName.equals ("individualvalueset")) {
for (var ii = 0; ii < this.npoints; ii++) this.yaxisData[ii] = Double.parseDouble (this.parser.qualifiedValue ());

} else if (this.tagName.equals ("encodedvalueset")) {
this.attrList = this.parser.getCharacters ();
var dataArray = JU.Base64.decodeBase64 (this.attrList);
if (dataArray.length != 0) {
if (vectorType.equals ("float64")) {
for (var i = 0, pt = 0; i < this.npoints; i++, pt += 8) this.yaxisData[i] = JU.BC.bytesToDoubleToFloat (dataArray, pt, false);

} else {
for (var i = 0, pt = 0; i < this.npoints; i++, pt += 4) this.yaxisData[i] = JU.BC.bytesToFloat (dataArray, pt, false);

}}}this.parser.nextStartTag ();
this.tagName = this.parser.getTagName ();
this.yUnits = this.parser.getAttrValue ("label");
this.firstY = this.yaxisData[0];
});
Clazz.defineMethod (c$, "processAuthor", 
 function () {
if (this.tagName.equals ("name")) this.owner = this.parser.thisValue ();
 else if (this.tagName.contains ("location")) this.origin = this.parser.thisValue ();
});
});
