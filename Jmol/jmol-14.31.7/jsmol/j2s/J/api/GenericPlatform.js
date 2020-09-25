Clazz.declarePackage ("J.api");
Clazz.load (["J.api.FontManager"], "J.api.GenericPlatform", null, function () {
c$ = Clazz.declareInterface (J.api, "GenericPlatform", J.api.FontManager);
Clazz.defineStatics (c$,
"CURSOR_DEFAULT", 0,
"CURSOR_CROSSHAIR", 1,
"CURSOR_WAIT", 3,
"CURSOR_ZOOM", 8,
"CURSOR_HAND", 12,
"CURSOR_MOVE", 13);
});
