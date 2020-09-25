Clazz.declarePackage ("JU");
Clazz.load (["J.api.JmolPatternMatcher"], "JU.PatternMatcher", ["java.util.regex.Pattern"], function () {
c$ = Clazz.declareType (JU, "PatternMatcher", null, J.api.JmolPatternMatcher);
Clazz.makeConstructor (c$, 
function () {
});
Clazz.overrideMethod (c$, "compile", 
function (sFind, isCaseInsensitive) {
return java.util.regex.Pattern.compile (sFind, isCaseInsensitive ? 2 : 0);
}, "~S,~B");
});
