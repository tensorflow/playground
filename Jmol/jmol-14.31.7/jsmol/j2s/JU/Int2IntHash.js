Clazz.declarePackage ("JU");
c$ = Clazz.decorateAsClass (function () {
this.entryCount = 0;
this.entries = null;
Clazz.instantialize (this, arguments);
}, JU, "Int2IntHash");
Clazz.makeConstructor (c$, 
function (initialCapacity) {
this.entries =  new Array (initialCapacity);
}, "~N");
Clazz.defineMethod (c$, "get", 
function (key) {
var entries = this.entries;
var hash = (key & 0x7FFFFFFF) % entries.length;
for (var e = entries[hash]; e != null; e = e.next) if (e.key == key) return e.value;

return -2147483648;
}, "~N");
Clazz.defineMethod (c$, "put", 
function (key, value) {
var entries = this.entries;
var n = entries.length;
var hash = (key & 0x7FFFFFFF) % n;
for (var e = entries[hash]; e != null; e = e.next) if (e.key == key) {
e.value = value;
return;
}
if (this.entryCount > n) {
var oldSize = n;
n += n + 1;
var newEntries =  new Array (n);
for (var i = oldSize; --i >= 0; ) {
for (var e = entries[i]; e != null; ) {
var t = e;
e = e.next;
hash = (t.key & 0x7FFFFFFF) % n;
t.next = newEntries[hash];
newEntries[hash] = t;
}
}
entries = this.entries = newEntries;
hash = (key & 0x7FFFFFFF) % n;
}entries[hash] =  new JU.Int2IntHashEntry (key, value, entries[hash]);
++this.entryCount;
}, "~N,~N");
c$ = Clazz.decorateAsClass (function () {
this.key = 0;
this.value = 0;
this.next = null;
Clazz.instantialize (this, arguments);
}, JU, "Int2IntHashEntry");
Clazz.makeConstructor (c$, 
function (key, value, next) {
this.key = key;
this.value = value;
this.next = next;
}, "~N,~N,JU.Int2IntHashEntry");
