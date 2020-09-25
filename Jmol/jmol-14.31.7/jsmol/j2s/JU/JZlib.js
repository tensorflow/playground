Clazz.declarePackage ("JU");
c$ = Clazz.declareType (JU, "JZlib");
c$.version = Clazz.defineMethod (c$, "version", 
function () {
return "1.1.0";
});
Clazz.defineStatics (c$,
"$version", "1.1.0",
"MAX_WBITS", 15,
"DEF_WBITS", 15,
"Z_NO_COMPRESSION", 0,
"Z_BEST_SPEED", 1,
"Z_BEST_COMPRESSION", 9,
"Z_DEFAULT_COMPRESSION", (-1),
"Z_FILTERED", 1,
"Z_HUFFMAN_ONLY", 2,
"Z_DEFAULT_STRATEGY", 0,
"Z_NO_FLUSH", 0,
"Z_PARTIAL_FLUSH", 1,
"Z_SYNC_FLUSH", 2,
"Z_FULL_FLUSH", 3,
"Z_FINISH", 4,
"Z_OK", 0,
"Z_STREAM_END", 1,
"Z_NEED_DICT", 2,
"Z_ERRNO", -1,
"Z_STREAM_ERROR", -2,
"Z_DATA_ERROR", -3,
"Z_MEM_ERROR", -4,
"Z_BUF_ERROR", -5,
"Z_VERSION_ERROR", -6,
"Z_BINARY", 0,
"Z_ASCII", 1,
"Z_UNKNOWN", 2);
