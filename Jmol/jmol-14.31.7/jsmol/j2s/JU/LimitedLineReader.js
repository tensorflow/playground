Clazz.declarePackage ("JU");
c$ = Clazz.decorateAsClass (function () {
this.buf = null;
this.cchBuf = 0;
this.ichCurrent = 0;
Clazz.instantialize (this, arguments);
}, JU, "LimitedLineReader");
Clazz.makeConstructor (c$, 
function (bufferedReader, readLimit) {
bufferedReader.mark (readLimit + 1);
this.buf =  Clazz.newCharArray (readLimit, '\0');
this.cchBuf = Math.max (bufferedReader.read (this.buf, 0, readLimit), 0);
this.ichCurrent = 0;
bufferedReader.reset ();
}, "java.io.BufferedReader,~N");
Clazz.defineMethod (c$, "getHeader", 
function (n) {
return (n == 0 ?  String.instantialize (this.buf) :  String.instantialize (this.buf, 0, Math.min (this.cchBuf, n)));
}, "~N");
Clazz.defineMethod (c$, "readLineWithNewline", 
function () {
while (this.ichCurrent < this.cchBuf) {
var ichBeginningOfLine = this.ichCurrent;
var ch = String.fromCharCode (0);
while (this.ichCurrent < this.cchBuf && (ch = this.buf[this.ichCurrent++]) != '\r' && ch != '\n') {
}
if (ch == '\r' && this.ichCurrent < this.cchBuf && this.buf[this.ichCurrent] == '\n') ++this.ichCurrent;
var cchLine = this.ichCurrent - ichBeginningOfLine;
if (this.buf[ichBeginningOfLine] == '#') continue;
return  String.instantialize (this.buf, ichBeginningOfLine, cchLine);
}
return "";
});
