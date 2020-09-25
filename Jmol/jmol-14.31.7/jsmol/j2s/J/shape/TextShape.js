Clazz.declarePackage ("J.shape");
Clazz.load (["J.shape.Shape", "java.util.Hashtable"], "J.shape.TextShape", ["JU.P3", "$.PT", "JU.C", "$.Logger"], function () {
c$ = Clazz.decorateAsClass (function () {
this.objects = null;
this.currentObject = null;
this.currentFont = null;
this.currentColor = null;
this.currentBgColor = null;
this.currentTranslucentLevel = 0;
this.currentBgTranslucentLevel = 0;
this.thisID = null;
this.isHover = false;
this.isAll = false;
Clazz.instantialize (this, arguments);
}, J.shape, "TextShape", J.shape.Shape);
Clazz.prepareFields (c$, function () {
this.objects =  new java.util.Hashtable ();
});
Clazz.defineMethod (c$, "setPropTS", 
function (propertyName, value, bsSelected) {
if ("text" === propertyName) {
var text = value;
if (this.currentObject != null) {
this.currentObject.setText (text);
} else if (this.isAll) {
for (var t, $t = this.objects.values ().iterator (); $t.hasNext () && ((t = $t.next ()) || true);) t.setText (text);

}return;
}if ("font" === propertyName) {
this.currentFont = value;
if (this.currentObject != null) {
this.currentObject.setFont (this.currentFont, true);
this.currentObject.setFontScale (0);
} else if (this.isAll) {
for (var t, $t = this.objects.values ().iterator (); $t.hasNext () && ((t = $t.next ()) || true);) t.setFont (this.currentFont, true);

}return;
}if ("allOff" === propertyName) {
this.currentObject = null;
this.isAll = true;
this.objects =  new java.util.Hashtable ();
return;
}if ("delete" === propertyName) {
if (this.currentObject != null) {
this.objects.remove (this.currentObject.target);
this.currentObject = null;
} else if (this.isAll || this.thisID != null) {
var e = this.objects.values ().iterator ();
while (e.hasNext ()) {
var text = e.next ();
if (this.isAll || JU.PT.isMatch (text.target.toUpperCase (), this.thisID, true, true)) {
e.remove ();
}}
}return;
}if ("off" === propertyName) {
if (this.isAll) {
this.objects =  new java.util.Hashtable ();
this.isAll = false;
this.currentObject = null;
}if (this.currentObject == null) {
return;
}this.objects.remove (this.currentObject.target);
this.currentObject = null;
return;
}if ("model" === propertyName) {
var modelIndex = (value).intValue ();
if (this.currentObject != null) {
this.currentObject.modelIndex = modelIndex;
} else if (this.isAll) {
for (var t, $t = this.objects.values ().iterator (); $t.hasNext () && ((t = $t.next ()) || true);) t.modelIndex = modelIndex;

}return;
}if ("align" === propertyName) {
var align = value;
if (this.currentObject != null) {
if (!this.currentObject.setAlignmentLCR (align)) JU.Logger.error ("unrecognized align:" + align);
} else if (this.isAll) {
for (var obj, $obj = this.objects.values ().iterator (); $obj.hasNext () && ((obj = $obj.next ()) || true);) obj.setAlignmentLCR (align);

}return;
}if ("bgcolor" === propertyName) {
this.currentBgColor = value;
if (this.currentObject != null) {
this.currentObject.bgcolix = JU.C.getColixO (value);
} else if (this.isAll) {
var e = this.objects.values ().iterator ();
while (e.hasNext ()) {
e.next ().bgcolix = JU.C.getColixO (value);
}
}return;
}if ("color" === propertyName) {
this.currentColor = value;
if (this.currentObject != null) {
this.currentObject.colix = JU.C.getColixO (value);
} else if (this.isAll || this.thisID != null) {
var e = this.objects.values ().iterator ();
while (e.hasNext ()) {
var text = e.next ();
if (this.isAll || JU.PT.isMatch (text.target.toUpperCase (), this.thisID, true, true)) {
text.colix = JU.C.getColixO (value);
}}
}return;
}if ("target" === propertyName) {
var target = value;
this.isAll = target.equals ("all");
if (this.isAll || target.equals ("none")) {
this.currentObject = null;
}return;
}var isBackground;
if ((isBackground = ("bgtranslucency" === propertyName)) || "translucency" === propertyName) {
var isTranslucent = ("translucent" === value);
if (isBackground) this.currentBgTranslucentLevel = (isTranslucent ? this.translucentLevel : 0);
 else this.currentTranslucentLevel = (isTranslucent ? this.translucentLevel : 0);
if (this.currentObject != null) {
this.currentObject.setTranslucent (this.translucentLevel, isBackground);
} else if (this.isAll) {
var e = this.objects.values ().iterator ();
while (e.hasNext ()) {
e.next ().setTranslucent (this.translucentLevel, isBackground);
}
}return;
}if (propertyName === "deleteModelAtoms") {
var modelIndex = ((value)[2])[0];
var e = this.objects.values ().iterator ();
while (e.hasNext ()) {
var text = e.next ();
if (text.modelIndex == modelIndex) {
e.remove ();
} else if (text.modelIndex > modelIndex) {
text.modelIndex--;
}}
return;
}this.setPropS (propertyName, value, bsSelected);
}, "~S,~O,JU.BS");
Clazz.overrideMethod (c$, "getShapeState", 
function () {
return null;
});
Clazz.overrideMethod (c$, "initModelSet", 
function () {
this.currentObject = null;
this.isAll = false;
});
Clazz.overrideMethod (c$, "setModelVisibilityFlags", 
function (bsModels) {
if (!this.isHover) for (var t, $t = this.objects.values ().iterator (); $t.hasNext () && ((t = $t.next ()) || true);) t.visible = (t.modelIndex < 0 || bsModels.get (t.modelIndex));

}, "JU.BS");
Clazz.overrideMethod (c$, "checkObjectClicked", 
function (x, y, modifiers, bsVisible, drawPicking) {
if (this.isHover || modifiers == 0) return null;
var isAntialiased = this.vwr.antialiased;
for (var obj, $obj = this.objects.values ().iterator (); $obj.hasNext () && ((obj = $obj.next ()) || true);) {
if (obj.checkObjectClicked (isAntialiased, x, y, bsVisible)) {
if (obj.script != null) this.vwr.evalStringQuiet (obj.script);
var map =  new java.util.Hashtable ();
map.put ("pt", (obj.xyz == null ?  new JU.P3 () : obj.xyz));
var modelIndex = obj.modelIndex;
if (modelIndex < 0) modelIndex = 0;
map.put ("modelIndex", Integer.$valueOf (modelIndex));
map.put ("model", this.vwr.getModelNumberDotted (modelIndex));
map.put ("id", obj.target);
map.put ("type", "echo");
return map;
}}
return null;
}, "~N,~N,~N,JU.BS,~B");
Clazz.overrideMethod (c$, "checkObjectHovered", 
function (x, y, bsVisible) {
if (this.isHover) return false;
var haveScripts = false;
var isAntialiased = this.vwr.antialiased;
for (var obj, $obj = this.objects.values ().iterator (); $obj.hasNext () && ((obj = $obj.next ()) || true);) {
if (obj.script != null) {
haveScripts = true;
if (obj.checkObjectClicked (isAntialiased, x, y, bsVisible)) {
this.vwr.setCursor (12);
return true;
}}}
if (haveScripts) this.vwr.setCursor (0);
return false;
}, "~N,~N,JU.BS");
});
