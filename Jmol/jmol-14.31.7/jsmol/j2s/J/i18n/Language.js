Clazz.declarePackage ("J.i18n");
Clazz.load (null, "J.i18n.Language", ["J.i18n.GT"], function () {
c$ = Clazz.decorateAsClass (function () {
this.code = null;
this.language = null;
this.nativeLanguage = null;
this.display = false;
Clazz.instantialize (this, arguments);
}, J.i18n, "Language");
c$.getLanguageList = Clazz.defineMethod (c$, "getLanguageList", 
function () {
return  Clazz.newArray (-1, [ new J.i18n.Language ("ar", J.i18n.GT.$ ("Arabic"), "العربية", false),  new J.i18n.Language ("ast", J.i18n.GT.$ ("Asturian"), "Asturian", false),  new J.i18n.Language ("az", J.i18n.GT.$ ("Azerbaijani"), "azərbaycan dili", false),  new J.i18n.Language ("bs", J.i18n.GT.$ ("Bosnian"), "bosanski jezik", false),  new J.i18n.Language ("ca", J.i18n.GT.$ ("Catalan"), "Català", true),  new J.i18n.Language ("cs", J.i18n.GT.$ ("Czech"), "Čeština", true),  new J.i18n.Language ("da", J.i18n.GT.$ ("Danish"), "Dansk", true),  new J.i18n.Language ("de", J.i18n.GT.$ ("German"), "Deutsch", true),  new J.i18n.Language ("el", J.i18n.GT.$ ("Greek"), "Ελληνικά", false),  new J.i18n.Language ("en_AU", J.i18n.GT.$ ("Australian English"), "Australian English", false),  new J.i18n.Language ("en_GB", J.i18n.GT.$ ("British English"), "British English", true),  new J.i18n.Language ("en_US", J.i18n.GT.$ ("American English"), "American English", true),  new J.i18n.Language ("es", J.i18n.GT.$ ("Spanish"), "Español", true),  new J.i18n.Language ("et", J.i18n.GT.$ ("Estonian"), "Eesti", false),  new J.i18n.Language ("eu", J.i18n.GT.$ ("Basque"), "Euskara", true),  new J.i18n.Language ("fi", J.i18n.GT.$ ("Finnish"), "Suomi", true),  new J.i18n.Language ("fo", J.i18n.GT.$ ("Faroese"), "Føroyskt", false),  new J.i18n.Language ("fr", J.i18n.GT.$ ("French"), "Français", true),  new J.i18n.Language ("fy", J.i18n.GT.$ ("Frisian"), "Frysk", false),  new J.i18n.Language ("gl", J.i18n.GT.$ ("Galician"), "Galego", false),  new J.i18n.Language ("hr", J.i18n.GT.$ ("Croatian"), "Hrvatski", false),  new J.i18n.Language ("hu", J.i18n.GT.$ ("Hungarian"), "Magyar", true),  new J.i18n.Language ("hy", J.i18n.GT.$ ("Armenian"), "Հայերեն", false),  new J.i18n.Language ("id", J.i18n.GT.$ ("Indonesian"), "Indonesia", true),  new J.i18n.Language ("it", J.i18n.GT.$ ("Italian"), "Italiano", true),  new J.i18n.Language ("ja", J.i18n.GT.$ ("Japanese"), "日本語", true),  new J.i18n.Language ("jv", J.i18n.GT.$ ("Javanese"), "Basa Jawa", false),  new J.i18n.Language ("ko", J.i18n.GT.$ ("Korean"), "한국어", true),  new J.i18n.Language ("ms", J.i18n.GT.$ ("Malay"), "Bahasa Melayu", true),  new J.i18n.Language ("nb", J.i18n.GT.$ ("Norwegian Bokmal"), "Norsk Bokmål", false),  new J.i18n.Language ("nl", J.i18n.GT.$ ("Dutch"), "Nederlands", true),  new J.i18n.Language ("oc", J.i18n.GT.$ ("Occitan"), "Occitan", false),  new J.i18n.Language ("pl", J.i18n.GT.$ ("Polish"), "Polski", false),  new J.i18n.Language ("pt", J.i18n.GT.$ ("Portuguese"), "Português", false),  new J.i18n.Language ("pt_BR", J.i18n.GT.$ ("Brazilian Portuguese"), "Português brasileiro", true),  new J.i18n.Language ("ru", J.i18n.GT.$ ("Russian"), "Русский", true),  new J.i18n.Language ("sl", J.i18n.GT.$ ("Slovenian"), "Slovenščina", false),  new J.i18n.Language ("sr", J.i18n.GT.$ ("Serbian"), "српски језик", false),  new J.i18n.Language ("sv", J.i18n.GT.$ ("Swedish"), "Svenska", true),  new J.i18n.Language ("ta", J.i18n.GT.$ ("Tamil"), "தமிழ்", false),  new J.i18n.Language ("te", J.i18n.GT.$ ("Telugu"), "తెలుగు", false),  new J.i18n.Language ("tr", J.i18n.GT.$ ("Turkish"), "Türkçe", true),  new J.i18n.Language ("ug", J.i18n.GT.$ ("Uyghur"), "Uyƣurqə", false),  new J.i18n.Language ("uk", J.i18n.GT.$ ("Ukrainian"), "Українська", true),  new J.i18n.Language ("uz", J.i18n.GT.$ ("Uzbek"), "O'zbek", false),  new J.i18n.Language ("zh_CN", J.i18n.GT.$ ("Simplified Chinese"), "简体中文", true),  new J.i18n.Language ("zh_TW", J.i18n.GT.$ ("Traditional Chinese"), "繁體中文", true)]);
});
Clazz.makeConstructor (c$, 
 function (code, language, nativeLanguage, display) {
this.code = code;
this.language = language;
this.nativeLanguage = nativeLanguage;
this.display = display;
}, "~S,~S,~S,~B");
c$.getSupported = Clazz.defineMethod (c$, "getSupported", 
function (list, code) {
for (var i = list.length; --i >= 0; ) if (list[i].code.equalsIgnoreCase (code)) return list[i].code;

for (var i = list.length; --i >= 0; ) if (list[i].code.startsWith (code)) return list[i].code;

return null;
}, "~A,~S");
});
