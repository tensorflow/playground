Clazz.declarePackage ("J.console");
Clazz.load (["J.api.JmolAppConsoleInterface", "$.JmolCallbackListener", "java.util.Hashtable"], "J.console.GenericConsole", ["java.lang.Boolean", "JU.PT", "J.c.CBK", "J.i18n.GT", "JS.T", "JV.Viewer"], function () {
c$ = Clazz.decorateAsClass (function () {
this.input = null;
this.output = null;
this.vwr = null;
this.menuMap = null;
this.editButton = null;
this.runButton = null;
this.historyButton = null;
this.stateButton = null;
this.clearOutButton = null;
this.clearInButton = null;
this.loadButton = null;
this.defaultMessage = null;
this.label1 = null;
this.nTab = 0;
this.incompleteCmd = null;
Clazz.instantialize (this, arguments);
}, J.console, "GenericConsole", null, [J.api.JmolAppConsoleInterface, J.api.JmolCallbackListener]);
Clazz.prepareFields (c$, function () {
this.menuMap =  new java.util.Hashtable ();
});
Clazz.defineMethod (c$, "setViewer", 
function (vwr) {
this.vwr = vwr;
if (J.console.GenericConsole.labels == null) {
var l =  new java.util.Hashtable ();
l.put ("title", J.i18n.GT.$ ("Jmol Script Console") + " " + JV.Viewer.getJmolVersion ());
this.setupLabels (l);
J.console.GenericConsole.labels = l;
}}, "JV.Viewer");
Clazz.defineMethod (c$, "addButton", 
function (b, label) {
b.addConsoleListener (this);
this.menuMap.put (label, b);
return b;
}, "J.api.JmolAbstractButton,~S");
Clazz.defineMethod (c$, "getLabel1", 
function () {
return null;
});
Clazz.defineMethod (c$, "setupLabels", 
function (labels) {
labels.put ("saveas", J.i18n.GT.$ ("&Save As..."));
labels.put ("file", J.i18n.GT.$ ("&File"));
labels.put ("close", J.i18n.GT.$ ("&Close"));
this.setupLabels0 (labels);
}, "java.util.Map");
Clazz.defineMethod (c$, "setupLabels0", 
function (labels) {
labels.put ("help", J.i18n.GT.$ ("&Help"));
labels.put ("search", J.i18n.GT.$ ("&Search..."));
labels.put ("commands", J.i18n.GT.$ ("&Commands"));
labels.put ("functions", J.i18n.GT.$ ("Math &Functions"));
labels.put ("parameters", J.i18n.GT.$ ("Set &Parameters"));
labels.put ("more", J.i18n.GT.$ ("&More"));
labels.put ("Editor", J.i18n.GT.$ ("Editor"));
labels.put ("State", J.i18n.GT.$ ("State"));
labels.put ("Run", J.i18n.GT.$ ("Run"));
labels.put ("Clear Output", J.i18n.GT.$ ("Clear Output"));
labels.put ("Clear Input", J.i18n.GT.$ ("Clear Input"));
labels.put ("History", J.i18n.GT.$ ("History"));
labels.put ("Load", J.i18n.GT.$ ("Load"));
labels.put ("label1", J.i18n.GT.$ ("press CTRL-ENTER for new line or paste model data and press Load"));
labels.put ("default", J.i18n.GT.$ ("Messages will appear here. Enter commands in the box below. Click the console Help menu item for on-line help, which will appear in a new browser window."));
}, "java.util.Map");
Clazz.defineMethod (c$, "setLabels", 
function () {
var doTranslate = J.i18n.GT.setDoTranslate (true);
this.editButton = this.setButton ("Editor");
this.stateButton = this.setButton ("State");
this.runButton = this.setButton ("Run");
this.clearOutButton = this.setButton ("Clear Output");
this.clearInButton = this.setButton ("Clear Input");
this.historyButton = this.setButton ("History");
this.loadButton = this.setButton ("Load");
this.defaultMessage = J.console.GenericConsole.getLabel ("default");
this.setTitle ();
J.i18n.GT.setDoTranslate (doTranslate);
});
c$.getLabel = Clazz.defineMethod (c$, "getLabel", 
function (key) {
return J.console.GenericConsole.labels.get (key);
}, "~S");
Clazz.defineMethod (c$, "displayConsole", 
function () {
this.layoutWindow (null);
this.outputMsg (this.defaultMessage);
});
Clazz.defineMethod (c$, "updateLabels", 
function () {
return;
});
Clazz.defineMethod (c$, "completeCommand", 
function (thisCmd) {
if (thisCmd.length == 0) return null;
var strCommand = (this.nTab <= 0 || this.incompleteCmd == null ? thisCmd : this.incompleteCmd);
this.incompleteCmd = strCommand;
var splitCmd = J.console.GenericConsole.splitCommandLine (thisCmd);
if (splitCmd == null) return null;
var asCommand = splitCmd[2] == null;
var inBrace = (splitCmd[3] != null);
var notThis = splitCmd[asCommand ? 1 : 2];
var s = splitCmd[1];
if (notThis.length == 0) return null;
var token = JS.T.getTokenFromName (s.trim ().toLowerCase ());
var cmdtok = (token == null ? 0 : token.tok);
var isSelect = JS.T.tokAttr (cmdtok, 12288);
splitCmd = J.console.GenericConsole.splitCommandLine (strCommand);
var cmd = null;
if (!asCommand && (notThis.charAt (0) == '"' || notThis.charAt (0) == '\'')) {
var q = notThis.charAt (0);
notThis = JU.PT.trim (notThis, "\"\'");
var stub = JU.PT.trim (splitCmd[2], "\"\'");
cmd = this.nextFileName (stub, this.nTab);
if (cmd != null) cmd = splitCmd[0] + splitCmd[1] + q + cmd + q;
} else {
var map = null;
if (!asCommand) {
notThis = s;
if (inBrace || splitCmd[2].startsWith ("$") || isSelect) {
map =  new java.util.Hashtable ();
this.vwr.getObjectMap (map, inBrace || isSelect ? '{' : splitCmd[2].startsWith ("$") ? '$' : '0');
}}cmd = JS.T.completeCommand (map, s.equalsIgnoreCase ("set "), asCommand, asCommand ? splitCmd[1] : splitCmd[2], this.nTab);
cmd = splitCmd[0] + (cmd == null ? notThis : asCommand ? cmd : splitCmd[1] + cmd);
}return (cmd == null || cmd.equals (strCommand) ? null : cmd);
}, "~S");
Clazz.defineMethod (c$, "doAction", 
function (source) {
if (source === this.runButton) {
this.execute (null);
} else if (source === this.editButton) {
this.vwr.getProperty ("DATA_API", "scriptEditor", null);
} else if (source === this.historyButton) {
this.clearContent (this.vwr.getSetHistory (2147483647));
} else if (source === this.stateButton) {
this.clearContent (this.vwr.getStateInfo ());
} else if (source === this.clearInButton) {
this.input.setText ("");
return;
}if (source === this.clearOutButton) {
this.output.setText ("");
return;
}if (source === this.loadButton) {
this.vwr.loadInlineAppend (this.input.getText (), false);
return;
}if (this.isMenuItem (source)) {
this.execute ((source).getName ());
return;
}}, "~O");
Clazz.defineMethod (c$, "execute", 
function (strCommand) {
var cmd = (strCommand == null ? this.input.getText () : strCommand);
if (strCommand == null) this.input.setText (null);
var strErrorMessage = this.vwr.script (cmd + "\u0001## EDITOR_IGNORE ##");
if (strErrorMessage != null && !strErrorMessage.equals ("pending")) this.outputMsg (strErrorMessage);
}, "~S");
Clazz.defineMethod (c$, "destroyConsole", 
function () {
if (this.vwr.isApplet) this.vwr.getProperty ("DATA_API", "getAppConsole", Boolean.FALSE);
});
c$.setAbstractButtonLabels = Clazz.defineMethod (c$, "setAbstractButtonLabels", 
function (menuMap, labels) {
for (var key, $key = menuMap.keySet ().iterator (); $key.hasNext () && ((key = $key.next ()) || true);) {
var m = menuMap.get (key);
var label = labels.get (key);
if (key.indexOf ("Tip") == key.length - 3) {
m.setToolTipText (labels.get (key));
} else {
var mnemonic = J.console.GenericConsole.getMnemonic (label);
if (mnemonic != ' ') m.setMnemonic (mnemonic);
label = J.console.GenericConsole.getLabelWithoutMnemonic (label);
m.setText (label);
}}
}, "java.util.Map,java.util.Map");
c$.getLabelWithoutMnemonic = Clazz.defineMethod (c$, "getLabelWithoutMnemonic", 
function (label) {
if (label == null) {
return null;
}var index = label.indexOf ('&');
if (index == -1) {
return label;
}return label.substring (0, index) + ((index < label.length - 1) ? label.substring (index + 1) : "");
}, "~S");
c$.getMnemonic = Clazz.defineMethod (c$, "getMnemonic", 
function (label) {
if (label == null) {
return ' ';
}var index = label.indexOf ('&');
if ((index == -1) || (index == label.length - 1)) {
return ' ';
}return label.charAt (index + 1);
}, "~S");
c$.map = Clazz.defineMethod (c$, "map", 
function (button, key, label, menuMap) {
var mnemonic = J.console.GenericConsole.getMnemonic (label);
if (mnemonic != ' ') (button).setMnemonic (mnemonic);
if (menuMap != null) {
if (key.indexOf ("NMR.") >= 0) System.out.println ("genericconsole mapping " + key + " to " + label);
menuMap.put (key, button);
}}, "~O,~S,~S,java.util.Map");
Clazz.overrideMethod (c$, "notifyEnabled", 
function (type) {
switch (type) {
case J.c.CBK.ECHO:
case J.c.CBK.MEASURE:
case J.c.CBK.MESSAGE:
case J.c.CBK.PICK:
return true;
case J.c.CBK.ANIMFRAME:
case J.c.CBK.APPLETREADY:
case J.c.CBK.ATOMMOVED:
case J.c.CBK.CLICK:
case J.c.CBK.DRAGDROP:
case J.c.CBK.ERROR:
case J.c.CBK.EVAL:
case J.c.CBK.HOVER:
case J.c.CBK.IMAGE:
case J.c.CBK.LOADSTRUCT:
case J.c.CBK.MINIMIZATION:
case J.c.CBK.SERVICE:
case J.c.CBK.RESIZE:
case J.c.CBK.SCRIPT:
case J.c.CBK.SYNC:
case J.c.CBK.STRUCTUREMODIFIED:
break;
}
return false;
}, "J.c.CBK");
Clazz.overrideMethod (c$, "notifyCallback", 
function (type, data) {
var strInfo = (data == null || data[1] == null ? null : data[1].toString ());
switch (type) {
case J.c.CBK.ECHO:
this.sendConsoleEcho (strInfo);
break;
case J.c.CBK.MEASURE:
var mystatus = data[3];
if (mystatus.indexOf ("Picked") >= 0 || mystatus.indexOf ("Sequence") >= 0) this.sendConsoleMessage (strInfo);
 else if (mystatus.indexOf ("Completed") >= 0) this.sendConsoleEcho (strInfo.substring (strInfo.lastIndexOf (",") + 2, strInfo.length - 1));
break;
case J.c.CBK.MESSAGE:
this.sendConsoleMessage (data == null ? null : strInfo);
break;
case J.c.CBK.PICK:
this.sendConsoleMessage (strInfo);
break;
}
}, "J.c.CBK,~A");
Clazz.overrideMethod (c$, "getText", 
function () {
return this.output.getText ();
});
Clazz.overrideMethod (c$, "sendConsoleEcho", 
function (strEcho) {
if (strEcho == null) {
this.updateLabels ();
this.outputMsg (null);
strEcho = this.defaultMessage;
} else if (strEcho.equals ("\0")) {
{
Clazz.Console.clear();
}strEcho = null;
}this.outputMsg (strEcho);
}, "~S");
Clazz.defineMethod (c$, "outputMsg", 
 function (message) {
var n = (message == null ? -1 : message.length);
switch (n) {
case -1:
this.output.setText ("");
return;
default:
if (message.charAt (n - 1) == '\n') break;
case 0:
message += "\n";
}
this.output.append (message);
}, "~S");
Clazz.defineMethod (c$, "clearContent", 
function (text) {
this.output.setText (text);
}, "~S");
Clazz.overrideMethod (c$, "sendConsoleMessage", 
function (strInfo) {
if (strInfo != null && this.output.getText ().startsWith (this.defaultMessage)) this.outputMsg (null);
this.outputMsg (strInfo);
}, "~S");
Clazz.overrideMethod (c$, "setCallbackFunction", 
function (callbackType, callbackFunction) {
}, "~S,~S");
Clazz.overrideMethod (c$, "zap", 
function () {
});
Clazz.defineMethod (c$, "recallCommand", 
function (up) {
var cmd = this.vwr.getSetHistory (up ? -1 : 1);
if (cmd != null) this.input.setText (JU.PT.escUnicode (cmd));
}, "~B");
Clazz.defineMethod (c$, "processKey", 
function (kcode, kid, isControlDown) {
var mode = 0;
switch (kid) {
case 401:
switch (kcode) {
case 9:
var s = this.input.getText ();
if (s.endsWith ("\n") || s.endsWith ("\t")) return 0;
mode = 1;
if (this.input.getCaretPosition () == s.length) {
var cmd = this.completeCommand (s);
if (cmd != null) this.input.setText (JU.PT.escUnicode (cmd).$replace ('\t', ' '));
this.nTab++;
return mode;
}break;
case 27:
mode = 1;
this.input.setText ("");
break;
}
this.nTab = 0;
if (kcode == 10 && !isControlDown) {
this.execute (null);
return mode;
}if (kcode == 38 || kcode == 40) {
this.recallCommand (kcode == 38);
return mode;
}break;
case 402:
if (kcode == 10 && !isControlDown) return mode;
break;
}
return mode | 2;
}, "~N,~N,~B");
c$.splitCommandLine = Clazz.defineMethod (c$, "splitCommandLine", 
 function (cmd) {
var sout =  new Array (4);
var isEscaped1 = false;
var isEscaped2 = false;
var isEscaped = false;
if (cmd.length == 0) return null;
var ptQ = -1;
var ptCmd = 0;
var ptToken = 0;
var nBrace = 0;
var ch;
for (var i = 0; i < cmd.length; i++) {
switch (ch = cmd.charAt (i)) {
case '"':
if (!isEscaped && !isEscaped1) {
isEscaped2 = !isEscaped2;
if (isEscaped2) ptQ = ptToken = i;
}break;
case '\'':
if (!isEscaped && !isEscaped2) {
isEscaped1 = !isEscaped1;
if (isEscaped1) ptQ = ptToken = i;
}break;
case '\\':
isEscaped = !isEscaped;
continue;
case ' ':
if (!isEscaped && !isEscaped1 && !isEscaped2) {
ptToken = i + 1;
ptQ = -1;
}break;
case ';':
if (!isEscaped1 && !isEscaped2) {
ptCmd = ptToken = i + 1;
ptQ = -1;
nBrace = 0;
}break;
case '{':
case '}':
if (!isEscaped1 && !isEscaped2) {
nBrace += (ch == '{' ? 1 : -1);
ptToken = i + 1;
ptQ = -1;
}break;
default:
if (!isEscaped1 && !isEscaped2) ptQ = -1;
}
isEscaped = false;
}
sout[0] = cmd.substring (0, ptCmd);
sout[1] = (ptToken == ptCmd ? cmd.substring (ptCmd) : cmd.substring (ptCmd, (ptToken > ptQ ? ptToken : ptQ)));
sout[2] = (ptToken == ptCmd ? null : cmd.substring (ptToken));
sout[3] = (nBrace > 0 ? "{" : null);
return sout;
}, "~S");
Clazz.defineStatics (c$,
"labels", null);
});
