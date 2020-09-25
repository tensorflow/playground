Clazz.declarePackage ("JV.binding");
Clazz.load (["JV.binding.JmolBinding"], "JV.binding.RasmolBinding", null, function () {
c$ = Clazz.declareType (JV.binding, "RasmolBinding", JV.binding.JmolBinding);
Clazz.makeConstructor (c$, 
function () {
Clazz.superConstructor (this, JV.binding.RasmolBinding, []);
this.set ("selectOrToggle");
});
Clazz.overrideMethod (c$, "setSelectBindings", 
function () {
this.bindAction (33040, 30);
this.bindAction (33041, 35);
});
});
