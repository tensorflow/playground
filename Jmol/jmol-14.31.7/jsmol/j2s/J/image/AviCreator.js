Clazz.declarePackage ("J.image");
Clazz.load (["J.api.JmolMovieCreatorInterface"], "J.image.AviCreator", null, function () {
c$ = Clazz.decorateAsClass (function () {
this.errorMsg = null;
Clazz.instantialize (this, arguments);
}, J.image, "AviCreator", null, J.api.JmolMovieCreatorInterface);
Clazz.overrideMethod (c$, "createMovie", 
function (vwr, files, width, height, fps, fileName) {
return this.errorMsg;
}, "JV.Viewer,~A,~N,~N,~N,~S");
});
