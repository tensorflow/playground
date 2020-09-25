Clazz.declarePackage ("JV.binding");
Clazz.load (["JV.binding.JmolBinding"], "JV.binding.PfaatBinding", null, function () {
c$ = Clazz.declareType (JV.binding, "PfaatBinding", JV.binding.JmolBinding);
Clazz.makeConstructor (c$, 
function () {
Clazz.superConstructor (this, JV.binding.PfaatBinding, []);
this.set ("extendedSelect");
});
Clazz.overrideMethod (c$, "setSelectBindings", 
function () {
this.bindAction (33040, 30);
this.bindAction (33040, 33);
this.bindAction (33041, 35);
this.bindAction (33049, 32);
this.bindAction (33048, 34);
});
});
