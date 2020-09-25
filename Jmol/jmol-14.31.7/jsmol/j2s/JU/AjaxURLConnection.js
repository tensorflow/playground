Clazz.declarePackage ("JU");
Clazz.load (["java.net.URLConnection"], "JU.AjaxURLConnection", ["JU.AU", "$.Rdr", "$.SB"], function () {
c$ = Clazz.decorateAsClass (function () {
this.bytesOut = null;
this.postOut = "";
Clazz.instantialize (this, arguments);
}, JU, "AjaxURLConnection", java.net.URLConnection);
Clazz.defineMethod (c$, "doAjax", 
 function () {
var jmol = null;
{
jmol = Jmol;
}return jmol.doAjax (this.url, this.postOut, this.bytesOut, false);
});
Clazz.overrideMethod (c$, "connect", 
function () {
});
Clazz.defineMethod (c$, "outputBytes", 
function (bytes) {
this.bytesOut = bytes;
}, "~A");
Clazz.defineMethod (c$, "outputString", 
function (post) {
this.postOut = post;
}, "~S");
Clazz.overrideMethod (c$, "getInputStream", 
function () {
var is = null;
var o = this.doAjax ();
if (JU.AU.isAB (o)) is = JU.Rdr.getBIS (o);
 else if (Clazz.instanceOf (o, JU.SB)) is = JU.Rdr.getBIS (JU.Rdr.getBytesFromSB (o));
 else if (Clazz.instanceOf (o, String)) is = JU.Rdr.getBIS ((o).getBytes ());
return is;
});
Clazz.defineMethod (c$, "getContents", 
function () {
return this.doAjax ();
});
});
