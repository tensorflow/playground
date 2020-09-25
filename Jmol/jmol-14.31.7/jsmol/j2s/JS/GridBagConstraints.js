Clazz.declarePackage ("JS");
Clazz.load (null, "JS.GridBagConstraints", ["JS.Insets"], function () {
c$ = Clazz.decorateAsClass (function () {
this.gridx = 0;
this.gridy = 0;
this.gridwidth = 0;
this.gridheight = 0;
this.weightx = 0;
this.weighty = 0;
this.anchor = 0;
this.fill = 0;
this.insets = null;
this.ipadx = 0;
this.ipady = 0;
Clazz.instantialize (this, arguments);
}, JS, "GridBagConstraints");
Clazz.makeConstructor (c$, 
function (gridx, gridy, gridwidth, gridheight, weightx, weighty, anchor, fill, insets, ipadx, ipady) {
this.gridx = gridx;
this.gridy = gridy;
this.gridwidth = gridwidth;
this.gridheight = gridheight;
this.weightx = weightx;
this.weighty = weighty;
this.anchor = anchor;
this.fill = fill;
if (insets == null) insets =  new JS.Insets (0, 0, 0, 0);
this.insets = insets;
this.ipadx = ipadx;
this.ipady = ipady;
}, "~N,~N,~N,~N,~N,~N,~N,~N,JS.Insets,~N,~N");
Clazz.defineMethod (c$, "getStyle", 
function (margins) {
return "style='" + (margins ? "margin:" + this.insets.top + "px " + (this.ipady + this.insets.right) + "px " + this.insets.bottom + "px " + (this.ipadx + this.insets.left) + "px;" : "text-align:" + (this.anchor == 13 ? "right" : this.anchor == 17 ? "left" : "center")) + "'";
}, "~B");
Clazz.defineStatics (c$,
"NONE", 0,
"CENTER", 10,
"WEST", 17,
"EAST", 13);
});
