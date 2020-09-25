(function(Clazz
,Clazz_getClassName
,Clazz_newLongArray
,Clazz_doubleToByte
,Clazz_doubleToInt
,Clazz_doubleToLong
,Clazz_declarePackage
,Clazz_instanceOf
,Clazz_load
,Clazz_instantialize
,Clazz_decorateAsClass
,Clazz_floatToInt
,Clazz_floatToLong
,Clazz_makeConstructor
,Clazz_defineEnumConstant
,Clazz_exceptionOf
,Clazz_newIntArray
,Clazz_defineStatics
,Clazz_newFloatArray
,Clazz_declareType
,Clazz_prepareFields
,Clazz_superConstructor
,Clazz_newByteArray
,Clazz_declareInterface
,Clazz_p0p
,Clazz_pu$h
,Clazz_newShortArray
,Clazz_innerTypeInstance
,Clazz_isClassDefined
,Clazz_prepareCallback
,Clazz_newArray
,Clazz_castNullAs
,Clazz_floatToShort
,Clazz_superCall
,Clazz_decorateAsType
,Clazz_newBooleanArray
,Clazz_newCharArray
,Clazz_implementOf
,Clazz_newDoubleArray
,Clazz_overrideConstructor
,Clazz_clone
,Clazz_doubleToShort
,Clazz_getInheritedLevel
,Clazz_getParamsType
,Clazz_isAF
,Clazz_isAB
,Clazz_isAI
,Clazz_isAS
,Clazz_isASS
,Clazz_isAP
,Clazz_isAFloat
,Clazz_isAII
,Clazz_isAFF
,Clazz_isAFFF
,Clazz_tryToSearchAndExecute
,Clazz_getStackTrace
,Clazz_inheritArgs
,Clazz_alert
,Clazz_defineMethod
,Clazz_overrideMethod
,Clazz_declareAnonymous
//,Clazz_checkPrivateMethod
,Clazz_cloneFinals
){
var $t$;
//var c$;
// coreconsole.z.js

// Note that this was written before I had Swing working. But this works fine. -- BH

// BH 6/29/2015 9:50:21 AM adds option for user to set console as a div on a page.
//    as "jmolApplet0_console" where jmolApplet0 is the id of the applet.
//   for example: <div id="jmolApplet0_console" style="width:600px;height:362px"></div>
// BH 3/7/2015 1:16:00 PM adds Jmol.Console.Image user-settable divs 
//   jmolApplet0_Image_holder, jmolApplet0_Image_app_holder, jmolApplet0_Image_xxxx_holder
// BH 2/24/2015 4:07:57 PM 14.3.12 adds Jmol.Console.Image (for show IMAGE)
// BH 8/12/2014 12:35:07 PM 14.2.5 console problems with key events
// BH 6/27/2014 8:23:49 AM 14.2.0 console broken for Safari and Chrome
// BH 6/1/2014 8:32:12 AM added Help button; better mouse/keypress handling
// BH 1/5/2013 12:45:19 PM

Jmol.Console = {
	buttons:{},
	buttonWidth:100,
	click:function(id) {
		Jmol.Console.buttons[id].console.appletConsole.doAction(Jmol.Console.buttons[id]);
	}	
}

Jmol.consoleGetImageDialog = function(vwr, title, imageMap) {
  // JmolObjectInterface
  return new Jmol.Console.Image(vwr, title, imageMap);
}

Jmol.Console.Image = function(vwr, title, imageMap) {

  // page designer may indicate one of three divs for images on the page:
  
  // <appletID>_Image_app_holder for IMAGE command by itself (current app image)
  // <appletID>_Image_<cleaned id or filename>_holder  for IMAGE ID "xxx" ... or IMAGE "xxx"
  //   where cleaning is with .replace(/\W/g,"_")
  // <appletID>_Image_holder for all images not identified as above
  // if a page div is not identified, then the image will be placed in a new floating div
  
  this.vwr = vwr;
  this.title = title;
  this.imageMap = imageMap;
	this.applet = vwr.html5Applet;
  var id = this.applet._id + "_Image";
  this.id = id + "_" + (title == "" ? "app" : title).replace(/\W/g,"_");
  var jqobj = Jmol._$(this.id + "_holder");
  if (!jqobj[0] && (jqobj = Jmol._$(id + "_holder"))[0])
    this.id = id;
  if (jqobj[0])
    this.div = jqobj;
  else
    Jmol.Console.createDOM(this, '<div id="$ID" class="jmolImage" style="display:block;background-color:yellow;position:absolute;z-index:' + ++Jmol._z.consoleImage +'"><div id="$ID_title"></div><div id="$ID_holder"></div></div>');
  System.out.println("image " + this.id + " created");
  var obj = imageMap.get(this.id);
  if (obj)
    obj.closeMe();
  imageMap.put(this.id, this);
  imageMap.put(title, this);
}

Jmol.Console.Image.setCanvas = function(obj, canvas) {
  // this method can be customized as desired
  // it puts the canvas into a holder div 
	Jmol.$append(Jmol._$(obj.id + "_holder"), canvas);
	Jmol.$html(obj.id + "_title", "<table style='width:100%'><tr><td>&nbsp;&nbsp;&nbsp;&nbsp;<a href=\"javascript:Jmol.Console.buttons['"+obj.id+"'].closeMe()\">close</a></td><td align=right>" + obj.title + " [" + canvas.width + " x " + canvas.height + "]</td></tr></table>");
}

Jmol.Console.Image.closeImage = function(obj) {
  // this method can be customized as desired
  obj.imageMap.remove(obj.title);
  obj.imageMap.remove(obj.id);
  if (obj.div) {
    Jmol.$remove(obj.cid);
  } else {
    obj.dragBind(false);  
    Jmol.$remove(obj.id);
  }
}

Jmol.Console.Image.prototype.setImage = function(canvas) {
  // called by Jmol asynchronously after image is loaded
  if (this.cid)
    Jmol.$remove(this.cid);
  var c = document.createElement("canvas");
  c.width = canvas.width;
  c.height = canvas.height;
  var cdx = c.getContext("2d");
  if (canvas.buf32) {
    // image buffer from current view
    // (note that buf32.length will be the same as buf8.length when images are antialiased) 
  	var imgData = cdx.getImageData(0, 0, c.width, c.height);
    var buf8 = imgData.data;
    var buf32 = canvas.buf32;
    var n = buf8.length >> 2;
    for (var i = 0, j = 0; i < n; i++) {
      buf8[j++] = (buf32[i] >> 16) & 0xFF;
      buf8[j++] = (buf32[i] >> 8) & 0xFF;
      buf8[j++] = buf32[i] & 0xFF;
      buf8[j++] = 0xFF;
    }
    cdx.putImageData(imgData, 0, 0);
  } else {
    // asynchronous load of image from file
    cdx.drawImage(canvas,0,0);
  }    
  this.cid = c.id = this.id + "_image"; 
  Jmol.Console.Image.setCanvas(this, c);
}

Jmol.Console.Image.prototype.closeMe = function() {
  // called by Jmol
  Jmol.Console.Image.closeImage(this);
}

Jmol.Swing.setDraggable(Jmol.Console.Image);

Jmol.Console.createDOM = function(obj, s, userConsole) {
  var id = obj.id;
  Jmol.Console.buttons[id] = obj;
	s = s.replace(/\$ID/g,id);
  if (userConsole && userConsole[0]) {
    Jmol.$html(userConsole,s);
  } else {
  	Jmol.$after("body", s);
  	obj.setContainer(Jmol._$(id));
  	obj.setPosition();
  	obj.dragBind(true);
  }
}

Jmol.Console.JSConsole = function(appletConsole) {
	this.applet = appletConsole.vwr.html5Applet;
	var id = this.id = this.applet._id+"_console";
	var console = this;
	console.appletConsole = appletConsole;
	console.input = appletConsole.input = new Jmol.Console.Input(console);
	console.output = appletConsole.output = new Jmol.Console.Output(console);
  // check to see if the user already has a div on the page with id such as "jmolApplet0_console" 
  var userConsole = Jmol.$("#" + id); 
	// set up this.appletConsole.input, this.appletconsole.output
	// set up buttons, which are already made by this time: 	
	// I would prefer NOT to use jQueryUI for this - just simple buttons with simple actions

	// create and insert HTML code
	var s = '<div id=$ID_title></div><div id=$ID_label1></div><div id=$ID_outputdiv style="position:relative;left:2px"></div><div id=$ID_inputdiv style="position:relative;left:2px"></div><div id=$ID_buttondiv></div>'  
  var w = 600, h = 362;
  if (userConsole[0]) {
      var dims = Jmol.$getSize(userConsole);
      if (dims[0] == 0)
        Jmol.$setSize(userConsole, w, h);
      w = dims[0] || w;
      h = dims[1] || h;
  } else {
    s = '<div id="$ID" class="jmolConsole" style="display:block;background-color:yellow;width:'+w+'px;height:'+h+'px;position:absolute;z-index:'
	   	+ Jmol._z.console +'">' + s + '</div>';
  }
  Jmol.Console.createDOM(this, s, userConsole);
	var setBtn = function(console, btn) {
		btn.console = console;
		btn.id = id + "_" + btn.label.replace(/\s/g,"_");
		Jmol.Console.buttons[btn.id] = btn;
		return btn.html();
	}
	s = setBtn(console, appletConsole.runButton)
		+ setBtn(console, appletConsole.loadButton)
		+ setBtn(console, appletConsole.clearInButton)
		+ setBtn(console, appletConsole.clearOutButton)
		+ setBtn(console, appletConsole.historyButton)
		+ setBtn(console, appletConsole.stateButton);
	Jmol.$html(id + "_buttondiv", s);
  s = "";
  if (!userConsole[0])
	 s += "&nbsp;&nbsp;&nbsp;&nbsp;<a href=\"javascript:Jmol.Console.buttons['"+id+"'].setVisible(false)\">close</a>";
	s += "&nbsp;&nbsp;&nbsp;&nbsp;<a href=\"javascript:Jmol.script("+console.applet._id+",'help')\">help</a>";
	Jmol.$html(id + "_label1", s);
  if (userConsole[0]) {
    // leaves a little slop for margins
    w = w - 10;
    h = (h - Jmol.$getSize(id + "_label1")[1] - Jmol.$getSize(id + "_buttondiv")[1] - 20)/3;
  } else {
    w = w - 10;
    h = (h - 62)/3;
  }
	Jmol.$html(id + "_inputdiv", '<textarea id="' + id + '_input" style="width:'+w+'px;height:'+h+'px"></textarea>');
	Jmol.$html(id + "_outputdiv", '<textarea id="' + id + '_output" style="width:'+w+'px;height:'+(h*2)+'px"></textarea>');

	Jmol.$bind("#" + id + "_input", "keydown keypress keyup", function(event) { console.input.keyEvent(event) });
	Jmol.$bind("#" + id + "_input", "mousedown touchstart", function(event) { console.ignoreMouse=true });
	Jmol.$bind("#" + id + "_output", "mousedown touchstart", function(event) { console.ignoreMouse=true });

	console.setButton = function(text) {
		return new Jmol.Console.Button(this, text);
	}  

	console.setVisible = function(b) {	
		if (b)
			this.container.show();
		else
			this.container.hide();
		this.dragBind(b);
	}

	console.setTitle = function(title) {
		//Jmol.$html(this.id + "_title", title);
	}
  
  console.setVisible(false);
}

Jmol.Swing.setDraggable(Jmol.Console.JSConsole);

Jmol.Console.Input = function(console) {

	this.console = console;
	this.id = console.id + "_input";

	// something like this....

	this.getText = function() {
		return Jmol.$val(this.id);
	}

	this.setText = function(text) {
		if (text == null)
			text = "";
		Jmol.$val(this.id, text);
	}

	this.keyEvent = function(ev) {
		// chrome/safari 
		// for left paren:
		//             keyCode   which   key    originalEvent.keyIdentifier
		//  keydown     57         57     -      U+0039      
		//  keypress    40         40     -      Down    // why Down??
	  //
		// for down arrow
		//  keydown     40         40     -      Down
			
		// ff, msie
		// for left paren:
		//             keyCode   which   key    originalEvent.keyIdentifier
		//  keydown     57         57     (      -      
		//  keypress    0          40     (      -
		//
		// for down arrow
		//  keydown     40         40     Down   -
	
		// in all cases: normal keys (as well as backspace[8] and delete[46]) are keydown keypress keyup 
		//               special keys just keydown keyup
	  //               keyup is only once when repeated; same as keydown
	
		// ff/msie delivers key, chrome/safari does not 
		// chrome/safari has "feature" that keyIdentifier for "(" is reported as "Down" and similar issues for many other keys
		
    //System.out.println(ev.type + " key:" + (!ev.key) + " keyCode:" + ev.keyCode + " which:" + ev.which + " " + ev.key + "--" + ev.originalEvent.keyIdentifier);

		var mode;
		var type = ev.type;
		var isCtrl = ev.ctrlKey;
		var kcode = ev.keyCode;
		if (kcode == 13)
			kcode=10; 
		// keycode is deprecated, but is essential still
		if (type == "keyup") { 
			mode = (kcode == 38 || kcode == 40 ? 1 : this.console.appletConsole.processKey(kcode, 402/*java.awt.event.KeyEvent.KEY_RELEASED*/, isCtrl));
			if ((mode & 1) == 1)
				ev.preventDefault();
			return;
		}

		// includes keypress and keydown

		// only  assign "key" for keydown, as keypress gives erroneous identifier in chrome/safari
		var isKeydown = (type == "keydown");
		var key = (isKeydown ? (ev.key || ev.originalEvent.keyIdentifier) : "");

		switch (kcode) {
		case 38: // up-arrow, possibly
		case 40: // down-arrow, possibly
			// must be keydown, not keypress to be arrow key				
			if (!isKeydown)
				kcode = 0;
			break;
		case 8: // bs
		case 9: // tab
		case 10: // CR
		case 27: // esc
		// only these are of interest to Jmol
			break;
		default:
			kcode = 0; // nothing to report
		}					
		mode = this.console.appletConsole.processKey(kcode, 401/*java.awt.event.KeyEvent.KEY_PRESSED*/, isCtrl);
		if (isCtrl && kcode == 10)
			this.setText(this.getText() + "\n")
		if (mode == 0 && ev.keyCode == 9) {
			var me = this;
			setTimeout(function(){me.setText(me.getText() + "\t"); Jmol.$focus(me.id)},10);
		}
		// ignore if...
		if ((mode & 1) == 1 // Jmol has handled the key press
			|| key == "Up" || key == "Down" // up and down arrows
			|| isKeydown && ev.keyCode != 8 && ev.keyCode < 32 // a special character other than backspace, when keyDown 
			) {
			ev.preventDefault();
		}
	}

	this.getCaretPosition = function() {
		var el = Jmol._$(this.id)[0];
		if('selectionStart' in el)
			return el.selectionStart;
		if(!('selection' in document))
			return 0;
		el.focus();
		var sel = document.selection.createRange();
		var len = document.selection.createRange().text.length;
		sel.moveStart('character', -el.value.length);
		return sel.text.length - len;
	}

}

Jmol.Console.Output = function(console) {
	this.id = console.id + "_output";
	this.getText = function() {
		return Jmol.$val(this.id);
	}

	this.setText = function(text) {
		if (text == null)
			text = "";
		Jmol.$val(this.id, text);
	}

	this.append = function(message, att) {
		this.setText(this.getText() + message);
		Jmol.$scrollTo(this.id, -1); 		 
	}
}

Jmol.Console.Button = function(text) {
	this.label = text;
}

Jmol.Console.Button.prototype.addConsoleListener = function(appletConsole) {
	this.appletConsole = appletConsole;
	Jmol.Console.buttons[this.id] = this;
}

Jmol.Console.Button.prototype.html = function() {
	var s = '<input type="button" id="' + this.id + '" style="width:' + Jmol.Console.buttonWidth + 'px" value="' + this.label + '" onClick="Jmol.Console.click(\'' + this.id + '\')"/>'
	return s;
}

Clazz_declarePackage ("J.console");
Clazz_declareInterface (J.console, "GenericTextArea");
Clazz_declarePackage ("J.console");
Clazz_load (["J.api.JmolAppConsoleInterface", "$.JmolCallbackListener", "java.util.Hashtable"], "J.console.GenericConsole", ["java.lang.Boolean", "JU.PT", "J.c.CBK", "J.i18n.GT", "JS.T", "JV.Viewer"], function () {
c$ = Clazz_decorateAsClass (function () {
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
Clazz_instantialize (this, arguments);
}, J.console, "GenericConsole", null, [J.api.JmolAppConsoleInterface, J.api.JmolCallbackListener]);
Clazz_prepareFields (c$, function () {
this.menuMap =  new java.util.Hashtable ();
});
Clazz_defineMethod (c$, "setViewer", 
function (vwr) {
this.vwr = vwr;
if (J.console.GenericConsole.labels == null) {
var l =  new java.util.Hashtable ();
l.put ("title", J.i18n.GT.$ ("Jmol Script Console") + " " + JV.Viewer.getJmolVersion ());
this.setupLabels (l);
J.console.GenericConsole.labels = l;
}}, "JV.Viewer");
Clazz_defineMethod (c$, "addButton", 
function (b, label) {
b.addConsoleListener (this);
this.menuMap.put (label, b);
return b;
}, "J.api.JmolAbstractButton,~S");
Clazz_defineMethod (c$, "getLabel1", 
function () {
return null;
});
Clazz_defineMethod (c$, "setupLabels", 
function (labels) {
labels.put ("saveas", J.i18n.GT.$ ("&Save As..."));
labels.put ("file", J.i18n.GT.$ ("&File"));
labels.put ("close", J.i18n.GT.$ ("&Close"));
this.setupLabels0 (labels);
}, "java.util.Map");
Clazz_defineMethod (c$, "setupLabels0", 
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
Clazz_defineMethod (c$, "setLabels", 
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
c$.getLabel = Clazz_defineMethod (c$, "getLabel", 
function (key) {
return J.console.GenericConsole.labels.get (key);
}, "~S");
Clazz_defineMethod (c$, "displayConsole", 
function () {
this.layoutWindow (null);
this.outputMsg (this.defaultMessage);
});
Clazz_defineMethod (c$, "updateLabels", 
function () {
return;
});
Clazz_defineMethod (c$, "completeCommand", 
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
Clazz_defineMethod (c$, "doAction", 
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
Clazz_defineMethod (c$, "execute", 
function (strCommand) {
var cmd = (strCommand == null ? this.input.getText () : strCommand);
if (strCommand == null) this.input.setText (null);
var strErrorMessage = this.vwr.script (cmd + "\u0001## EDITOR_IGNORE ##");
if (strErrorMessage != null && !strErrorMessage.equals ("pending")) this.outputMsg (strErrorMessage);
}, "~S");
Clazz_defineMethod (c$, "destroyConsole", 
function () {
if (this.vwr.isApplet) this.vwr.getProperty ("DATA_API", "getAppConsole", Boolean.FALSE);
});
c$.setAbstractButtonLabels = Clazz_defineMethod (c$, "setAbstractButtonLabels", 
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
c$.getLabelWithoutMnemonic = Clazz_defineMethod (c$, "getLabelWithoutMnemonic", 
function (label) {
if (label == null) {
return null;
}var index = label.indexOf ('&');
if (index == -1) {
return label;
}return label.substring (0, index) + ((index < label.length - 1) ? label.substring (index + 1) : "");
}, "~S");
c$.getMnemonic = Clazz_defineMethod (c$, "getMnemonic", 
function (label) {
if (label == null) {
return ' ';
}var index = label.indexOf ('&');
if ((index == -1) || (index == label.length - 1)) {
return ' ';
}return label.charAt (index + 1);
}, "~S");
c$.map = Clazz_defineMethod (c$, "map", 
function (button, key, label, menuMap) {
var mnemonic = J.console.GenericConsole.getMnemonic (label);
if (mnemonic != ' ') (button).setMnemonic (mnemonic);
if (menuMap != null) {
if (key.indexOf ("NMR.") >= 0) System.out.println ("genericconsole mapping " + key + " to " + label);
menuMap.put (key, button);
}}, "~O,~S,~S,java.util.Map");
Clazz_overrideMethod (c$, "notifyEnabled", 
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
Clazz_overrideMethod (c$, "notifyCallback", 
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
Clazz_overrideMethod (c$, "getText", 
function () {
return this.output.getText ();
});
Clazz_overrideMethod (c$, "sendConsoleEcho", 
function (strEcho) {
if (strEcho == null) {
this.updateLabels ();
this.outputMsg (null);
strEcho = this.defaultMessage;
} else if (strEcho.equals ("\0")) {
{
Clazz_Console.clear();
}strEcho = null;
}this.outputMsg (strEcho);
}, "~S");
Clazz_defineMethod (c$, "outputMsg", 
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
Clazz_defineMethod (c$, "clearContent", 
function (text) {
this.output.setText (text);
}, "~S");
Clazz_overrideMethod (c$, "sendConsoleMessage", 
function (strInfo) {
if (strInfo != null && this.output.getText ().startsWith (this.defaultMessage)) this.outputMsg (null);
this.outputMsg (strInfo);
}, "~S");
Clazz_overrideMethod (c$, "setCallbackFunction", 
function (callbackType, callbackFunction) {
}, "~S,~S");
Clazz_overrideMethod (c$, "zap", 
function () {
});
Clazz_defineMethod (c$, "recallCommand", 
function (up) {
var cmd = this.vwr.getSetHistory (up ? -1 : 1);
if (cmd != null) this.input.setText (JU.PT.escUnicode (cmd));
}, "~B");
Clazz_defineMethod (c$, "processKey", 
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
c$.splitCommandLine = Clazz_defineMethod (c$, "splitCommandLine", 
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
Clazz_defineStatics (c$,
"labels", null);
});
Clazz_declarePackage ("J.consolejs");
Clazz_load (["J.console.GenericConsole"], "J.consolejs.AppletConsole", null, function () {
c$ = Clazz_decorateAsClass (function () {
this.jsConsole = null;
Clazz_instantialize (this, arguments);
}, J.consolejs, "AppletConsole", J.console.GenericConsole);
Clazz_makeConstructor (c$, 
function () {
Clazz_superConstructor (this, J.consolejs.AppletConsole, []);
});
Clazz_overrideMethod (c$, "start", 
function (vwr) {
this.setViewer (vwr);
this.setLabels ();
this.displayConsole ();
}, "JV.Viewer");
Clazz_overrideMethod (c$, "layoutWindow", 
function (enabledButtons) {
{
this.jsConsole = new Jmol.Console.JSConsole(this);
}this.setTitle ();
}, "~S");
Clazz_overrideMethod (c$, "setTitle", 
function () {
if (this.jsConsole != null) this.jsConsole.setTitle (J.console.GenericConsole.getLabel ("title"));
});
Clazz_overrideMethod (c$, "setVisible", 
function (visible) {
this.jsConsole.setVisible (visible);
}, "~B");
Clazz_overrideMethod (c$, "setButton", 
function (text) {
{
return new Jmol.Console.Button(text);
}}, "~S");
Clazz_overrideMethod (c$, "dispose", 
function () {
this.setVisible (false);
});
Clazz_overrideMethod (c$, "isMenuItem", 
function (source) {
return false;
}, "~O");
Clazz_overrideMethod (c$, "getScriptEditor", 
function () {
return null;
});
Clazz_overrideMethod (c$, "nextFileName", 
function (stub, nTab) {
return null;
}, "~S,~N");
Clazz_overrideMethod (c$, "newJMenu", 
function (key) {
return null;
}, "~S");
Clazz_overrideMethod (c$, "newJMenuItem", 
function (key) {
return null;
}, "~S");
});
})(Clazz
,Clazz.getClassName
,Clazz.newLongArray
,Clazz.doubleToByte
,Clazz.doubleToInt
,Clazz.doubleToLong
,Clazz.declarePackage
,Clazz.instanceOf
,Clazz.load
,Clazz.instantialize
,Clazz.decorateAsClass
,Clazz.floatToInt
,Clazz.floatToLong
,Clazz.makeConstructor
,Clazz.defineEnumConstant
,Clazz.exceptionOf
,Clazz.newIntArray
,Clazz.defineStatics
,Clazz.newFloatArray
,Clazz.declareType
,Clazz.prepareFields
,Clazz.superConstructor
,Clazz.newByteArray
,Clazz.declareInterface
,Clazz.p0p
,Clazz.pu$h
,Clazz.newShortArray
,Clazz.innerTypeInstance
,Clazz.isClassDefined
,Clazz.prepareCallback
,Clazz.newArray
,Clazz.castNullAs
,Clazz.floatToShort
,Clazz.superCall
,Clazz.decorateAsType
,Clazz.newBooleanArray
,Clazz.newCharArray
,Clazz.implementOf
,Clazz.newDoubleArray
,Clazz.overrideConstructor
,Clazz.clone
,Clazz.doubleToShort
,Clazz.getInheritedLevel
,Clazz.getParamsType
,Clazz.isAF
,Clazz.isAB
,Clazz.isAI
,Clazz.isAS
,Clazz.isASS
,Clazz.isAP
,Clazz.isAFloat
,Clazz.isAII
,Clazz.isAFF
,Clazz.isAFFF
,Clazz.tryToSearchAndExecute
,Clazz.getStackTrace
,Clazz.inheritArgs
,Clazz.alert
,Clazz.defineMethod
,Clazz.overrideMethod
,Clazz.declareAnonymous
//,Clazz.checkPrivateMethod
,Clazz.cloneFinals
);
