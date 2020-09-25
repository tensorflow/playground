Clazz.declarePackage ("JU");
Clazz.load (["java.util.Hashtable", "JU.DefaultLogger"], "JU.Logger", ["java.lang.Long"], function () {
c$ = Clazz.declareType (JU, "Logger");
c$.getProperty = Clazz.defineMethod (c$, "getProperty", 
 function (level, defaultValue) {
try {
var property = System.getProperty ("jmol.logger." + level, null);
if (property != null) {
return (property.equalsIgnoreCase ("true"));
}} catch (e) {
if (Clazz.exceptionOf (e, Exception)) {
} else {
throw e;
}
}
return defaultValue;
}, "~S,~B");
c$.setLogger = Clazz.defineMethod (c$, "setLogger", 
function (logger) {
JU.Logger._logger = logger;
JU.Logger.debugging = JU.Logger.isActiveLevel (5) || JU.Logger.isActiveLevel (6);
JU.Logger.debuggingHigh = (JU.Logger.debugging && JU.Logger._activeLevels[6]);
}, "JU.LoggerInterface");
c$.isActiveLevel = Clazz.defineMethod (c$, "isActiveLevel", 
function (level) {
return JU.Logger._logger != null && level >= 0 && level < 7 && JU.Logger._activeLevels[level];
}, "~N");
c$.setActiveLevel = Clazz.defineMethod (c$, "setActiveLevel", 
function (level, active) {
if (level < 0) level = 0;
if (level >= 7) level = 6;
JU.Logger._activeLevels[level] = active;
JU.Logger.debugging = JU.Logger.isActiveLevel (5) || JU.Logger.isActiveLevel (6);
JU.Logger.debuggingHigh = (JU.Logger.debugging && JU.Logger._activeLevels[6]);
}, "~N,~B");
c$.setLogLevel = Clazz.defineMethod (c$, "setLogLevel", 
function (level) {
for (var i = 7; --i >= 0; ) JU.Logger.setActiveLevel (i, i <= level);

}, "~N");
c$.getLevel = Clazz.defineMethod (c$, "getLevel", 
function (level) {
switch (level) {
case 6:
return "DEBUGHIGH";
case 5:
return "DEBUG";
case 4:
return "INFO";
case 3:
return "WARN";
case 2:
return "ERROR";
case 1:
return "FATAL";
}
return "????";
}, "~N");
c$.logLevel = Clazz.defineMethod (c$, "logLevel", 
function () {
return JU.Logger._logLevel;
});
c$.doLogLevel = Clazz.defineMethod (c$, "doLogLevel", 
function (log) {
JU.Logger._logLevel = log;
}, "~B");
c$.debug = Clazz.defineMethod (c$, "debug", 
function (txt) {
if (!JU.Logger.debugging) return;
try {
JU.Logger._logger.debug (txt);
} catch (t) {
}
}, "~S");
c$.info = Clazz.defineMethod (c$, "info", 
function (txt) {
try {
if (JU.Logger.isActiveLevel (4)) {
JU.Logger._logger.info (txt);
}} catch (t) {
}
}, "~S");
c$.warn = Clazz.defineMethod (c$, "warn", 
function (txt) {
try {
if (JU.Logger.isActiveLevel (3)) {
JU.Logger._logger.warn (txt);
}} catch (t) {
}
}, "~S");
c$.warnEx = Clazz.defineMethod (c$, "warnEx", 
function (txt, e) {
try {
if (JU.Logger.isActiveLevel (3)) {
JU.Logger._logger.warnEx (txt, e);
}} catch (t) {
}
}, "~S,Throwable");
c$.error = Clazz.defineMethod (c$, "error", 
function (txt) {
try {
if (JU.Logger.isActiveLevel (2)) {
JU.Logger._logger.error (txt);
}} catch (t) {
}
}, "~S");
c$.errorEx = Clazz.defineMethod (c$, "errorEx", 
function (txt, e) {
try {
if (JU.Logger.isActiveLevel (2)) {
JU.Logger._logger.errorEx (txt, e);
}} catch (t) {
}
}, "~S,Throwable");
c$.getLogLevel = Clazz.defineMethod (c$, "getLogLevel", 
function () {
for (var i = 7; --i >= 0; ) if (JU.Logger.isActiveLevel (i)) return i;

return 0;
});
c$.fatal = Clazz.defineMethod (c$, "fatal", 
function (txt) {
try {
if (JU.Logger.isActiveLevel (1)) {
JU.Logger._logger.fatal (txt);
}} catch (t) {
}
}, "~S");
c$.fatalEx = Clazz.defineMethod (c$, "fatalEx", 
function (txt, e) {
try {
if (JU.Logger.isActiveLevel (1)) {
JU.Logger._logger.fatalEx (txt, e);
}} catch (t) {
}
}, "~S,Throwable");
c$.startTimer = Clazz.defineMethod (c$, "startTimer", 
function (msg) {
if (msg != null) JU.Logger.htTiming.put (msg, Long.$valueOf (System.currentTimeMillis ()));
}, "~S");
c$.getTimerMsg = Clazz.defineMethod (c$, "getTimerMsg", 
function (msg, time) {
if (time == 0) time = JU.Logger.getTimeFrom (msg);
return "Time for " + msg + ": " + (time) + " ms";
}, "~S,~N");
c$.getTimeFrom = Clazz.defineMethod (c$, "getTimeFrom", 
 function (msg) {
var t;
return (msg == null || (t = JU.Logger.htTiming.get (msg)) == null ? -1 : System.currentTimeMillis () - t.longValue ());
}, "~S");
c$.checkTimer = Clazz.defineMethod (c$, "checkTimer", 
function (msg, andReset) {
var time = JU.Logger.getTimeFrom (msg);
if (time >= 0 && !msg.startsWith ("(")) JU.Logger.info (JU.Logger.getTimerMsg (msg, time));
if (andReset) JU.Logger.startTimer (msg);
return time;
}, "~S,~B");
c$.checkMemory = Clazz.defineMethod (c$, "checkMemory", 
function () {
var bTotal = 0;
var bFree = 0;
var bMax = 0;
{
}JU.Logger.info ("Memory: Total-Free=" + (bTotal - bFree) + "; Total=" + bTotal + "; Free=" + bFree + "; Max=" + bMax);
});
c$._logger = c$.prototype._logger =  new JU.DefaultLogger ();
Clazz.defineStatics (c$,
"LEVEL_FATAL", 1,
"LEVEL_ERROR", 2,
"LEVEL_WARN", 3,
"LEVEL_INFO", 4,
"LEVEL_DEBUG", 5,
"LEVEL_DEBUGHIGH", 6,
"LEVEL_MAX", 7,
"_activeLevels",  Clazz.newBooleanArray (7, false),
"_logLevel", false,
"debugging", false,
"debuggingHigh", false);
{
JU.Logger._activeLevels[6] = JU.Logger.getProperty ("debugHigh", false);
JU.Logger._activeLevels[5] = JU.Logger.getProperty ("debug", false);
JU.Logger._activeLevels[4] = JU.Logger.getProperty ("info", true);
JU.Logger._activeLevels[3] = JU.Logger.getProperty ("warn", true);
JU.Logger._activeLevels[2] = JU.Logger.getProperty ("error", true);
JU.Logger._activeLevels[1] = JU.Logger.getProperty ("fatal", true);
JU.Logger._logLevel = JU.Logger.getProperty ("logLevel", false);
JU.Logger.debugging = (JU.Logger._logger != null && (JU.Logger._activeLevels[5] || JU.Logger._activeLevels[6]));
JU.Logger.debuggingHigh = (JU.Logger.debugging && JU.Logger._activeLevels[6]);
}c$.htTiming = c$.prototype.htTiming =  new java.util.Hashtable ();
});
