/* Jmol 11.7 script library Jmol.js  15:32 06.12.2008 Bob Hanson

 checkbox heirarchy -- see http://chemapps.stolaf.edu/jmol/docs/examples-11/check.htm

    based on:
 *
 * Copyright (C) 2004-2005  Miguel, Jmol Development, www.jmol.org
 *
 * Contact: hansonr@stolaf.edu
 *
 *  This library is free software; you can redistribute it and/or
 *  modify it under the terms of the GNU Lesser General Public
 *  License as published by the Free Software Foundation; either
 *  version 2.1 of the License, or (at your option) any later version.
 *
 *  This library is distributed in the hope that it will be useful,
 *  but WITHOUT ANY WARRANTY; without even the implied warranty of
 *  MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the GNU
 *  Lesser General Public License for more details.
 *
 *  You should have received a copy of the GNU Lesser General Public
 *  License along with this library; if not, write to the Free Software
 *  Foundation, Inc., 59 Temple Place, Suite 330, Boston, MA
 *  02111-1307  USA.
 */

// for documentation see www.jmol.org/jslibrary

try{if(typeof(_jmol)!="undefined")exit()

// place "?NOAPPLET" on your command line to check applet control action with a textarea
// place "?JMOLJAR=xxxxx" to use a specific jar file

// bob hanson -- jmolResize(w,h) -- resizes absolutely or by percent (w or h 0.5 means 50%)
// bob hanson -- jmolEvaluate -- evaluates molecular math 8:37 AM 2/23/2007
// bob hanson -- jmolScriptMessage -- returns all "scriptStatus" messages 8:37 AM 2/23/2007
// bob hanson -- jmolScriptEcho -- returns all "scriptEcho" messages 8:37 AM 2/23/2007
// bob hanson -- jmolScriptWait -- 11:31 AM 5/2/2006
// bob hanson -- remove trailing separatorHTML in radio groups -- 12:18 PM 5/6/2006
// bob hanson -- adds support for dynamic DOM script nodes 7:04 AM 5/19/2006
// bob hanson -- adds try/catch for wiki - multiple code passes 7:05 AM 5/19/2006
// bob hanson -- auto-initiates to defaultdir/defaultjar -- change as desired.
// bob hanson -- adding save/restore orientation w/ and w/o delay 11:49 AM 5/25/2006
// bob hanson -- adding AjaxJS service 11:16 AM 6/3/2006
// bob hanson -- fix for iframes not available for finding applet
// bob hanson -- added applet fake ?NOAPPLET URL flag
// bob hanson -- added jmolSetCallback(calbackName, funcName) 3:32 PM 6/13/2006
//			used PRIOR to jmolApplet() or jmolAppletInline()
//               added 4th array element in jmolRadioGroup -- title
//               added <span> and id around link, checkbox, radio, menu
//               fixing AJAX loads for MSIE/Opera-Mozilla incompatibility
//            -- renamed Jmol-11.js from Jmol-new.js; JmolApplet.jar from JmolAppletProto.jar
//	 	 renamed Jmol.js for Jmol 11 distribution
//            -- modified jmolRestoreOrientation() to be immediate, no 1-second delay
// bob hanson -- jmolScriptWait always returns a string -- 11:23 AM 9/16/2006
// bh         -- jmolCommandInput()
// bh         -- jmolSetTranslation(TF) -- forces translation even if there might be message callback issues
// bh         -- minor fixes suggested by Angel
// bh         -- adds jmolSetSyncId() and jmolGetSyncId()
// bh 3/2008  -- adds jmolAppendInlineScript() and jmolAppendInlineArray()
// bh 3/2008  -- fixes IE7 bug in relation to jmolLoadInlineArray()
// bh 6/2008  -- adds jmolSetAppletWindow()
// Angel H. 6/2008  -- added html <label> tags to checkboxes and radio buttons [in jmolCheckbox() and _jmolRadio() functions]
// bh 7/2008  -- code fix "for(i..." not "for(var i..."
// bh 12/2008 -- jmolLoadInline, jmolLoadInlineArray, jmolLoadInlineScript, jmolAppendInlineScript, jmolAppendInlineArray all return error message or null (Jmol 11.7.16)
// bh 12/2008 -- jmolScriptWaitOutput() -- waits for script to complete and delivers output normally sent to console

var defaultdir = "."
var defaultjar = "JmolApplet.jar"


// Note added 12:41 PM 9/21/2008 by Bob Hanson, hansonr@stolaf.edu:

// JMOLJAR=xxxxx.jar on the URL for this page will override
// the JAR file specified in the jmolInitialize() call.

// The idea is that it can be very useful to test a web page with different JAR files
// Or for an expert user to substitute a signed applet for an unsigned one
// so as to use a broader range of models or to create JPEG files, for example.

// If the JAR file is not in the current directory (has any sort of "/" in its name)
// then the user is presented with a warning and asked whether it is OK to change Jar files.
// The default action, if the user just presses "OK" is to NOT allow the change. 
// The user must type the word "yes" in the prompt box for the change to be approved.

// If you don't want people to be able to switch in their own JAR file on your page,
// simply set this next line to read "var allowJMOLJAR = false".


var allowJMOLJAR = true  


var undefined; // for IE 5 ... wherein undefined is undefined

////////////////////////////////////////////////////////////////
// Basic Scripting infrastruture
////////////////////////////////////////////////////////////////

function jmolInitialize(codebaseDirectory, fileNameOrUseSignedApplet) {
  if (_jmol.initialized)
    return;
  _jmol.initialized = true;
  if(allowJMOLJAR && document.location.search.indexOf("JMOLJAR=")>=0) {
    var f = document.location.search.split("JMOLJAR=")[1].split("&")[0];
    if (f.indexOf("/") >= 0) {
      alert ("This web page URL is requesting that the applet used be " + f + ". This is a possible security risk, particularly if the applet is signed, because signed applets can read and write files on your local machine or network.")
      var ok = prompt("Do you want to use applet " + f + "? ","yes or no")
      if (ok == "yes") {
        codebaseDirectory = f.substring(0, f.lastIndexOf("/"));
        fileNameOrUseSignedApplet = f.substring(f.lastIndexOf("/") + 1);
      } else {
	_jmolGetJarFilename(fileNameOrUseSignedApplet);
        alert("The web page URL was ignored. Continuing using " + _jmol.archivePath + ' in directory "' + codebaseDirectory + '"');
      }
    } else {
      fileNameOrUseSignedApplet = f;
    }
  }
  _jmolSetCodebase(codebaseDirectory);
  _jmolGetJarFilename(fileNameOrUseSignedApplet);
  _jmolOnloadResetForms();
}

function jmolSetTranslation(TF) {
  _jmol.params.doTranslate = ''+TF;
}

function _jmolGetJarFilename(fileNameOrFlag) {
  _jmol.archivePath =
    (typeof(fileNameOrFlag) == "string"  ? fileNameOrFlag : (fileNameOrFlag ?  "JmolAppletSigned" : "JmolApplet") + "0.jar");
}

function jmolSetDocument(doc) {
  _jmol.currentDocument = doc;
}

function jmolSetAppletColor(boxbgcolor, boxfgcolor, progresscolor) {
  _jmolInitCheck();
  _jmol.params.boxbgcolor = boxbgcolor;
  if (boxfgcolor)
    _jmol.params.boxfgcolor = boxfgcolor
  else if (boxbgcolor == "white" || boxbgcolor == "#FFFFFF")
    _jmol.params.boxfgcolor = "black";
  else
    _jmol.params.boxfgcolor = "white";
  if (progresscolor)
    _jmol.params.progresscolor = progresscolor;
  if (_jmol.debugAlert)
    alert(" boxbgcolor=" + _jmol.params.boxbgcolor +
          " boxfgcolor=" + _jmol.params.boxfgcolor +
          " progresscolor=" + _jmol.params.progresscolor);
}

function jmolSetAppletWindow(w) {
  _jmol.appletWindow = w;
}

function jmolApplet(size, script, nameSuffix) {
  _jmolInitCheck();
  return _jmolApplet(size, null, script, nameSuffix);
}

////////////////////////////////////////////////////////////////
// Basic controls
////////////////////////////////////////////////////////////////

function jmolButton(script, label, id, title) {
  _jmolInitCheck();
  if (id == undefined || id == null)
    id = "jmolButton" + _jmol.buttonCount;
  if (label == undefined || label == null)
    label = script.substring(0, 32);
  ++_jmol.buttonCount;
  var scriptIndex = _jmolAddScript(script);
  var t = "<span id=\"span_"+id+"\""+(title ? " title =\"" + title + "\"":"")+"><input type='button' name='" + id + "' id='" + id +
          "' value='" + label +
          "' onClick='_jmolClick(" + scriptIndex + _jmol.targetText +
          ")' onMouseover='_jmolMouseOver(" + scriptIndex +
          ");return true' onMouseout='_jmolMouseOut()' " +
          _jmol.buttonCssText + "/></span>";
  if (_jmol.debugAlert)
    alert(t);
  return _jmolDocumentWrite(t);
}

function jmolCheckbox(scriptWhenChecked, scriptWhenUnchecked,
                      labelHtml, isChecked, id, title) {
  _jmolInitCheck();
  if (id == undefined || id == null)
    id = "jmolCheckbox" + _jmol.checkboxCount;
  ++_jmol.checkboxCount;
  if (scriptWhenChecked == undefined || scriptWhenChecked == null ||
      scriptWhenUnchecked == undefined || scriptWhenUnchecked == null) {
    alert("jmolCheckbox requires two scripts");
    return;
  }
  if (labelHtml == undefined || labelHtml == null) {
    alert("jmolCheckbox requires a label");
    return;
  }
  var indexChecked = _jmolAddScript(scriptWhenChecked);
  var indexUnchecked = _jmolAddScript(scriptWhenUnchecked);
  var eospan = "</span>"
  var t = "<span id=\"span_"+id+"\""+(title ? " title =\"" + title + "\"":"")+"><input type='checkbox' name='" + id + "' id='" + id +
          "' onClick='_jmolCbClick(this," +
          indexChecked + "," + indexUnchecked + _jmol.targetText +
          ")' onMouseover='_jmolCbOver(this," + indexChecked + "," +
          indexUnchecked +
          ");return true' onMouseout='_jmolMouseOut()' " +
	  (isChecked ? "checked " : "") + _jmol.checkboxCssText + "/>" 
  if (labelHtml.toLowerCase().indexOf("<td>")>=0) {
	t += eospan
	eospan = "";
  }
  t += "<label for=\"" + id + "\">" + labelHtml + "</label>" +eospan;
  if (_jmol.debugAlert)
    alert(t);
  return _jmolDocumentWrite(t);
}

function jmolStartNewRadioGroup() {
  ++_jmol.radioGroupCount;
}

function jmolRadioGroup(arrayOfRadioButtons, separatorHtml, groupName, id, title) {
  /*

    array: [radio1,radio2,radio3...]
    where radioN = ["script","label",isSelected,"id","title"]

  */

  _jmolInitCheck();
  var type = typeof arrayOfRadioButtons;
  if (type != "object" || type == null || ! arrayOfRadioButtons.length) {
    alert("invalid arrayOfRadioButtons");
    return;
  }
  if (separatorHtml == undefined || separatorHtml == null)
    separatorHtml = "&nbsp; ";
  var len = arrayOfRadioButtons.length;
  jmolStartNewRadioGroup();
  if (!groupName)
    groupName = "jmolRadioGroup" + (_jmol.radioGroupCount - 1);
  var t = "<span id='"+(id ? id : groupName)+"'>";
  for (var i = 0; i < len; ++i) {
    if (i == len - 1)
      separatorHtml = "";
    var radio = arrayOfRadioButtons[i];
    type = typeof radio;
    if (type == "object") {
      t += _jmolRadio(radio[0], radio[1], radio[2], separatorHtml, groupName, (radio.length > 3 ? radio[3]: (id ? id : groupName)+"_"+i), (radio.length > 4 ? radio[4] : 0), title);
    } else {
      t += _jmolRadio(radio, null, null, separatorHtml, groupName, (id ? id : groupName)+"_"+i, title);
    }
  }
  t+="</span>"
  if (_jmol.debugAlert)
    alert(t);
  return _jmolDocumentWrite(t);
}


function jmolRadio(script, labelHtml, isChecked, separatorHtml, groupName, id, title) {
  _jmolInitCheck();
  if (_jmol.radioGroupCount == 0)
    ++_jmol.radioGroupCount;
  var t = _jmolRadio(script, labelHtml, isChecked, separatorHtml, groupName, (id ? id : groupName + "_" + _jmol.radioCount), title ? title : 0);
  if (_jmol.debugAlert)
    alert(t);
  return _jmolDocumentWrite(t);
}

function jmolLink(script, label, id, title) {
  _jmolInitCheck();
  if (id == undefined || id == null)
    id = "jmolLink" + _jmol.linkCount;
  if (label == undefined || label == null)
    label = script.substring(0, 32);
  ++_jmol.linkCount;
  var scriptIndex = _jmolAddScript(script);
  var t = "<span id=\"span_"+id+"\""+(title ? " title =\"" + title + "\"":"")+"><a name='" + id + "' id='" + id + 
          "' href='javascript:_jmolClick(" + scriptIndex + _jmol.targetText + ");' onMouseover='_jmolMouseOver(" + scriptIndex +
          ");return true;' onMouseout='_jmolMouseOut()' " +
          _jmol.linkCssText + ">" + label + "</a></span>";
  if (_jmol.debugAlert)
    alert(t);
  return _jmolDocumentWrite(t);
}

function jmolCommandInput(label, size, id, title) {
  _jmolInitCheck();
  if (id == undefined || id == null)
    id = "jmolCmd" + _jmol.cmdCount;
  if (label == undefined || label == null)
    label = "Execute";
  if (size == undefined || isNaN(size))
    size = 60;
  ++_jmol.cmdCount;
  var t = "<span id=\"span_"+id+"\""+(title ? " title =\"" + title + "\"":"")+"><input name='" + id + "' id='" + id + 
          "' size='"+size+"'><input type=button value = '"+label+"' onClick='jmolScript(document.getElementById(\""+id+"\").value" + _jmol.targetText + ")'/></span>";
  if (_jmol.debugAlert)
    alert(t);
  return _jmolDocumentWrite(t);
}

function jmolMenu(arrayOfMenuItems, size, id, title) {
  _jmolInitCheck();
  if (id == undefined || id == null)
    id = "jmolMenu" + _jmol.menuCount;
  ++_jmol.menuCount;
  var type = typeof arrayOfMenuItems;
  if (type != null && type == "object" && arrayOfMenuItems.length) {
    var len = arrayOfMenuItems.length;
    if (typeof size != "number" || size == 1)
      size = null;
    else if (size < 0)
      size = len;
    var sizeText = size ? " size='" + size + "' " : "";
    var t = "<span id=\"span_"+id+"\""+(title ? " title =\"" + title + "\"":"")+"><select name='" + id + "' id='" + id +
            "' onChange='_jmolMenuSelected(this" + _jmol.targetText + ")'" +
            sizeText + _jmol.menuCssText + ">";
    for (var i = 0; i < len; ++i) {
      var menuItem = arrayOfMenuItems[i];
      type = typeof menuItem;
      var script, text;
      var isSelected = undefined;
      if (type == "object" && menuItem != null) {
        script = menuItem[0];
        text = menuItem[1];
        isSelected = menuItem[2];
      } else {
        script = text = menuItem;
      }
      if (text == undefined || text == null)
        text = script;		
	  if (script=="#optgroup") {
        t += "<optgroup label='" + text + "'>";	  
	  } else if (script=="#optgroupEnd") {
        t += "</optgroup>";	  
	  } else {		
        var scriptIndex = _jmolAddScript(script);
        var selectedText = isSelected ? "' selected>" : "'>";
        t += "<option value='" + scriptIndex + selectedText + text + "</option>";
	  }
    }
    t += "</select></span>";
    if (_jmol.debugAlert)
      alert(t);
    return _jmolDocumentWrite(t);
  }
}

function jmolHtml(html) {
  return _jmolDocumentWrite(html);
}

function jmolBr() {
  return _jmolDocumentWrite("<br />");
}

////////////////////////////////////////////////////////////////
// advanced scripting functions
////////////////////////////////////////////////////////////////

function jmolDebugAlert(enableAlerts) {
  _jmol.debugAlert = (enableAlerts == undefined || enableAlerts)
}

function jmolAppletInline(size, inlineModel, script, nameSuffix) {
  _jmolInitCheck();
  return _jmolApplet(size, _jmolSterilizeInline(inlineModel),
                     script, nameSuffix);
}

function jmolSetTarget(targetSuffix) {
  _jmol.targetSuffix = targetSuffix;
  _jmol.targetText = targetSuffix ? ",\"" + targetSuffix + "\"" : "";
}

function jmolScript(script, targetSuffix) {
  if (script) {
    _jmolCheckBrowser();
    if (targetSuffix == "all") {
      with (_jmol) {
	for (var i = 0; i < appletSuffixes.length; ++i) {
	  var applet = _jmolGetApplet(appletSuffixes[i]);
          if (applet) applet.script(script);
        }
      }
    } else {
      var applet=_jmolGetApplet(targetSuffix);
      if (applet) applet.script(script);
    }
  }
}

function jmolLoadInline(model, targetSuffix) {
  if (!model)return "ERROR: NO MODEL"
  var applet=_jmolGetApplet(targetSuffix);
  if (!applet)return "ERROR: NO APPLET"
  if (typeof(model) == "string")
    return applet.loadInlineString(model, "", false);
  else
    return applet.loadInlineArray(model, "", false);
}


function jmolLoadInlineScript(model, script, targetSuffix) {
  if (!model)return "ERROR: NO MODEL"
  var applet=_jmolGetApplet(targetSuffix);
  if (!applet)return "ERROR: NO APPLET"
  return applet.loadInlineString(model, script, false);
}


function jmolLoadInlineArray(ModelArray, script, targetSuffix) {
  if (!model)return "ERROR: NO MODEL"
  if (!script)script=""
  var applet=_jmolGetApplet(targetSuffix);
  if (!applet)return "ERROR: NO APPLET"
  try {
    return applet.loadInlineArray(ModelArray, script, false);
  } catch (err) {
    //IE 7 bug
    return applet.loadInlineString(ModelArray.join("\n"), script, false);
  }
}

function jmolAppendInlineArray(ModelArray, script, targetSuffix) {
  if (!model)return "ERROR: NO MODEL"
  if (!script)script=""
  var applet=_jmolGetApplet(targetSuffix);
  if (!applet)return "ERROR: NO APPLET"
  try {
    return applet.loadInlineArray(ModelArray, script, true);
  } catch (err) {
    //IE 7 bug
    return applet.loadInlineString(ModelArray.join("\n"), script, true);
  }
}

function jmolAppendInlineScript(model, script, targetSuffix) {
  if (!model)return "ERROR: NO MODEL"
  var applet=_jmolGetApplet(targetSuffix);
  if (!applet)return "ERROR: NO APPLET"
  return applet.loadInlineString(model, script, true);
}

function jmolCheckBrowser(action, urlOrMessage, nowOrLater) {
  if (typeof action == "string") {
    action = action.toLowerCase();
    if (action != "alert" && action != "redirect" && action != "popup")
      action = null;
  }
  if (typeof action != "string")
    alert("jmolCheckBrowser(action, urlOrMessage, nowOrLater)\n\n" +
          "action must be 'alert', 'redirect', or 'popup'");
  else {
    if (typeof urlOrMessage != "string")
      alert("jmolCheckBrowser(action, urlOrMessage, nowOrLater)\n\n" +
            "urlOrMessage must be a string");
    else {
      _jmol.checkBrowserAction = action;
      _jmol.checkBrowserUrlOrMessage = urlOrMessage;
    }
  }
  if (typeof nowOrLater == "string" && nowOrLater.toLowerCase() == "now")
    _jmolCheckBrowser();
}

////////////////////////////////////////////////////////////////
// Cascading Style Sheet Class support
////////////////////////////////////////////////////////////////

function jmolSetAppletCssClass(appletCssClass) {
  if (_jmol.hasGetElementById) {
    _jmol.appletCssClass = appletCssClass;
    _jmol.appletCssText = appletCssClass ? "class='" + appletCssClass + "' " : "";
  }
}

function jmolSetButtonCssClass(buttonCssClass) {
  if (_jmol.hasGetElementById) {
    _jmol.buttonCssClass = buttonCssClass;
    _jmol.buttonCssText = buttonCssClass ? "class='" + buttonCssClass + "' " : "";
  }
}

function jmolSetCheckboxCssClass(checkboxCssClass) {
  if (_jmol.hasGetElementById) {
    _jmol.checkboxCssClass = checkboxCssClass;
    _jmol.checkboxCssText = checkboxCssClass ? "class='" + checkboxCssClass + "' " : "";
  }
}

function jmolSetRadioCssClass(radioCssClass) {
  if (_jmol.hasGetElementById) {
    _jmol.radioCssClass = radioCssClass;
    _jmol.radioCssText = radioCssClass ? "class='" + radioCssClass + "' " : "";
  }
}

function jmolSetLinkCssClass(linkCssClass) {
  if (_jmol.hasGetElementById) {
    _jmol.linkCssClass = linkCssClass;
    _jmol.linkCssText = linkCssClass ? "class='" + linkCssClass + "' " : "";
  }
}

function jmolSetMenuCssClass(menuCssClass) {
  if (_jmol.hasGetElementById) {
    _jmol.menuCssClass = menuCssClass;
    _jmol.menuCssText = menuCssClass ? "class='" + menuCssClass + "' " : "";
  }
}

////////////////////////////////////////////////////////////////
// functions for INTERNAL USE ONLY which are subject to change
// use at your own risk ... you have been WARNED!
////////////////////////////////////////////////////////////////
var _jmol = {
  currentDocument: document,

  debugAlert: false,
  
  codebase: "",
  modelbase: ".",
  
  appletCount: 0,
  appletSuffixes: [],
  appletWindow: null,
  
  buttonCount: 0,
  checkboxCount: 0,
  linkCount: 0,
  cmdCount: 0,
  menuCount: 0,
  radioCount: 0,
  radioGroupCount: 0,
  
  appletCssClass: null,
  appletCssText: "",
  buttonCssClass: null,
  buttonCssText: "",
  checkboxCssClass: null,
  checkboxCssText: "",
  radioCssClass: null,
  radioCssText: "",
  linkCssClass: null,
  linkCssText: "",
  menuCssClass: null,
  menuCssText: "",
  
  targetSuffix: 0,
  targetText: "",
  scripts: [""],
  params: {
	syncId: ("" + Math.random()).substring(3),
	progressbar: "true",
	progresscolor: "blue",
	boxbgcolor: "black",
	boxfgcolor: "white",
	boxmessage: "Downloading JmolApplet ..."
  },
  ua: navigator.userAgent.toLowerCase(),
  uaVersion: parseFloat(navigator.appVersion),
  
  os: "unknown",
  browser: "unknown",
  browserVersion: 0,
  hasGetElementById: !!document.getElementById,
  isJavaEnabled: navigator.javaEnabled(),
  isNetscape47Win: false,
  isIEWin: false,
  useIEObject: false,
  useHtml4Object: false,
  
  windowsClassId: "clsid:8AD9C840-044E-11D1-B3E9-00805F499D93",
  windowsCabUrl:
   "http://java.sun.com/update/1.5.0/jinstall-1_5_0_05-windows-i586.cab",

  isBrowserCompliant: false,
  isJavaCompliant: false,
  isFullyCompliant: false,

  initialized: false,
  initChecked: false,
  
  browserChecked: false,
  checkBrowserAction: "alert",
  checkBrowserUrlOrMessage: null,

  archivePath: null, // JmolApplet0.jar OR JmolAppletSigned0.jar

  previousOnloadHandler: null,
  ready: {}
}

with (_jmol) {
  function _jmolTestUA(candidate) {
    var ua = _jmol.ua;
    var index = ua.indexOf(candidate);
    if (index < 0)
      return false;
    _jmol.browser = candidate;
    _jmol.browserVersion = parseFloat(ua.substring(index+candidate.length+1));
    return true;
  }
  
  function _jmolTestOS(candidate) {
    if (_jmol.ua.indexOf(candidate) < 0)
      return false;
    _jmol.os = candidate;
    return true;
  }
  
  _jmolTestUA("konqueror") ||
  _jmolTestUA("safari") ||
  _jmolTestUA("omniweb") ||
  _jmolTestUA("opera") ||
  _jmolTestUA("webtv") ||
  _jmolTestUA("icab") ||
  _jmolTestUA("msie") ||
  (_jmol.ua.indexOf("compatible") < 0 && _jmolTestUA("mozilla"));
  
  _jmolTestOS("linux") ||
  _jmolTestOS("unix") ||
  _jmolTestOS("mac") ||
  _jmolTestOS("win");

  isNetscape47Win = (os == "win" && browser == "mozilla" &&
                     browserVersion >= 4.78 && browserVersion <= 4.8);

  if (os == "win") {
    isBrowserCompliant = hasGetElementById;
  } else if (os == "mac") { // mac is the problem child :-(
    if (browser == "mozilla" && browserVersion >= 5) {
      // miguel 2004 11 17
      // checking the plugins array does not work because
      // Netscape 7.2 OS X still has Java 1.3.1 listed even though
      // javaplugin.sf.net is installed to upgrade to 1.4.2
      eval("try {var v = java.lang.System.getProperty('java.version');" +
           " _jmol.isBrowserCompliant = v >= '1.4.2';" +
           " } catch (e) { }");
    } else if (browser == "opera" && browserVersion <= 7.54) {
      isBrowserCompliant = false;
    } else {
      isBrowserCompliant = hasGetElementById &&
        !((browser == "msie") ||
          (browser == "safari" && browserVersion < 125.12));
    }
  } else if (os == "linux" || os == "unix") {
    if (browser == "konqueror" && browserVersion <= 3.3)
      isBrowserCompliant = false;
    else
      isBrowserCompliant = hasGetElementById;
  } else { // other OS
    isBrowserCompliant = hasGetElementById;
  }

  // possibly more checks in the future for this
  isJavaCompliant = isJavaEnabled;

  isFullyCompliant = isBrowserCompliant && isJavaCompliant;

  // IE5.5 works just fine ... but let's push them to Sun Java
  isIEWin = (os == "win" && browser == "msie" && browserVersion >= 5.5);
  useIEObject = isIEWin;
  useHtml4Object =
   (os != "mac" && browser == "mozilla" && browserVersion >= 5) ||
   (os == "win" && browser == "opera" && browserVersion >= 8) ||
   (os == "mac" && browser == "safari" && browserVersion >= 412.2);

 doTranslate = true;
 haveSetTranslate = false;
}


function jmolSetCallback(callbackName,funcName) {
  _jmol.params[callbackName] = funcName
}

function jmolSetSyncId(n) {
  return _jmol.params["syncId"] = n
}

function jmolGetSyncId() {
  return _jmol.params["syncId"]
}

function jmolSetLogLevel(n) {
  _jmol.params.logLevel = ''+n;
}

	/*  AngelH, mar2007:
		By (re)setting these variables in the webpage before calling jmolApplet(), 
		a custom message can be provided (e.g. localized for user's language) when no Java is installed.
	*/
if (noJavaMsg==undefined) var noJavaMsg = 
        "You do not have Java applets enabled in your web browser, or your browser is blocking this applet.<br />\n" +
        "Check the warning message from your browser and/or enable Java applets in<br />\n" +
        "your web browser preferences, or install the Java Runtime Environment from <a href='http://www.java.com'>www.java.com</a><br />";
if (noJavaMsg2==undefined) var noJavaMsg2 = 
        "You do not have the<br />\n" +
        "Java Runtime Environment<br />\n" +
        "installed for applet support.<br />\n" +
        "Visit <a href='http://www.java.com'>www.java.com</a>";
function _jmolApplet(size, inlineModel, script, nameSuffix) {
	/*  AngelH, mar2007
		Fixed percent / pixel business, to avoid browser errors:
		put "px" where needed, avoid where not.		
	*/
  with (_jmol) {
    if (! nameSuffix)
      nameSuffix = appletCount;
    appletSuffixes.push(nameSuffix);
    ++appletCount;
    if (! script)
      script = "select *";
    var sz = _jmolGetAppletSize(size);
    var widthAndHeight = " width='" + sz[0] + "' height='" + sz[1] + "' ";
    var tHeader, tFooter;
    if (!codebase)
	jmolInitialize(".");
    if (useIEObject || useHtml4Object) {
      params.name = 'jmolApplet' + nameSuffix;
      params.archive = archivePath;
      params.mayscript = 'true';
      params.codebase = codebase;
    }
    if (useIEObject) { // use MSFT IE6 object tag with .cab file reference
      winCodebase = (windowsCabUrl ? " codebase='" + windowsCabUrl + "'\n" : "");
      params.code = 'JmolApplet';
      tHeader = 
        "<object name='jmolApplet" + nameSuffix +
        "' id='jmolApplet" + nameSuffix + "' " + appletCssText + "\n" +
	" classid='" + windowsClassId + "'\n" + winCodebase + widthAndHeight + ">\n";
      tFooter = "</object>";
    } else if (useHtml4Object) { // use HTML4 object tag
      tHeader = 
        "<object name='jmolApplet" + nameSuffix +
        "' id='jmolApplet" + nameSuffix + "' " + appletCssText + "\n" +
	" classid='java:JmolApplet'\n" +
        " type='application/x-java-applet'\n" +
        widthAndHeight + ">\n";
      tFooter = "</object>";
    } else { // use applet tag
      tHeader = 
        "<applet name='jmolApplet" + nameSuffix +
        "' id='jmolApplet" + nameSuffix +
        "' " + appletCssText +
        " code='JmolApplet'" +
        " archive='" + archivePath + "' codebase='" + codebase + "'\n" +
		widthAndHeight +
        " mayscript='true'>\n";
      tFooter = "</applet>";
    }
    var visitJava;
    if (isIEWin || useHtml4Object) {
		var szX = "width:" + sz[0]
		if ( szX.indexOf("%")==-1 ) szX+="px" 
		var szY = "height:" + sz[1]
		if ( szY.indexOf("%")==-1 ) szY+="px" 
      visitJava =
        "<p style='background-color:yellow; color:black; " +
		szX + ";" + szY + ";" +
        // why doesn't this vertical-align work?
	"text-align:center;vertical-align:middle;'>\n" +
		noJavaMsg +
        "</p>";
    } else {
      visitJava =
        "<table bgcolor='yellow'><tr>" +
        "<td align='center' valign='middle' " + widthAndHeight + "><font color='black'>\n" +
		noJavaMsg2 +
        "</font></td></tr></table>";
    }
    params.loadInline = (inlineModel ? inlineModel : "");
    params.script = (script ? _jmolSterilizeScript(script) : "");
    var t = tHeader + _jmolParams() + visitJava + tFooter;
    jmolSetTarget(nameSuffix);
    ready["jmolApplet" + nameSuffix] = false;
    if (_jmol.debugAlert)
      alert(t);
    return _jmolDocumentWrite(t);
  }
}

function _jmolParams() {
 var t = "";
 for (i in _jmol.params)
	if(_jmol.params[i]!="")
		 t+="  <param name='"+i+"' value='"+_jmol.params[i]+"' />\n";
 return t
}

function _jmolInitCheck() {
  if (_jmol.initChecked)
    return;
  _jmol.initChecked = true;
  jmolInitialize(defaultdir, defaultjar)
}

function _jmolCheckBrowser() {
  with (_jmol) {
    if (browserChecked)
      return;
    browserChecked = true;
  
    if (isFullyCompliant)
      return true;

    if (checkBrowserAction == "redirect")
      location.href = checkBrowserUrlOrMessage;
    else if (checkBrowserAction == "popup")
      _jmolPopup(checkBrowserUrlOrMessage);
    else {
      var msg = checkBrowserUrlOrMessage;
      if (msg == null)
        msg = "Your web browser is not fully compatible with Jmol\n\n" +
              "browser: " + browser +
              "   version: " + browserVersion +
              "   os: " + os +
              "\n\n" + ua;
      alert(msg);
    }
  }
  return false;
}

function _jmolDocumentWrite(text) {
  if (_jmol.currentDocument)
    _jmol.currentDocument.write(text);
  return text;
}

function _jmolPopup(url) {
  var popup = window.open(url, "JmolPopup",
                          "left=150,top=150,height=400,width=600," +
                          "directories=yes,location=yes,menubar=yes," +
                          "toolbar=yes," +
                          "resizable=yes,scrollbars=yes,status=yes");
  if (popup.focus)
    poup.focus();
}

function _jmolReadyCallback(name) {
  if (_jmol.debugAlert)
    alert(name + " is ready");
  _jmol.ready["" + name] = true;
}

function _jmolSterilizeScript(script) {
  var inlineScript = script.replace(/'/g, "&#39;");
  if (_jmol.debugAlert)
    alert("script:\n" + inlineScript);
  return inlineScript;
}

function _jmolSterilizeInline(model) {
  var inlineModel =
    model.replace(/\r|\n|\r\n/g, "|").replace(/'/g, "&#39;");
  if (_jmol.debugAlert)
    alert("inline model:\n" + inlineModel);
  return inlineModel;
}

	/*  AngelH, mar2007:
		By (re)setting this variable in the webpage before calling jmolApplet(), limits for applet size can be overriden.
	*/

	/* hansonr, jun2007:
		2048 standard for GeoWall (http://geowall.geo.lsa.umich.edu/home.html)
	*/

if (allowedJmolSize==undefined) var allowedJmolSize = [1, 2048, 300]   // min, max, default (pixels)
function _jmolGetAppletSize(size) {
	/*  AngelH, mar2007
		Accepts single number or 2-value array, each one can be either:
	   percent (text string ending %), decimal 0 to 1 (percent/100), number, or text string (interpreted as nr.)
	   Size is now returned as string or number, no "px".
	*/
  var width, height;
  if ( (typeof size) == "object" && size != null ) {
    width = size[0]; height = size[1];
  } else {
    width = height = size;
  }
  // if percent, leave it as it is:
  if ( width.toString().charAt(width.toString().length-1) != "%" ) {
    width = parseFloat(width);	// convert to nr., or strip text, or make zero
	if ( width <= 1 && width > 0 ) { width = (width*100)+"%" }	// decimal: convert to percent and quit
	else if ( width >= allowedJmolSize[0] && width <= allowedJmolSize[1] ) { width = parseInt(width) }	// accept only that range (pixels)
	else { width = allowedJmolSize[2] }	// default size 300 pixels
  }
  if ( height.toString().charAt(height.toString().length-1) != "%" ) {
    height = parseFloat(height);
	if ( height <= 1 && height > 0 ) { height = (height*100)+"%" }
	else if ( height >= allowedJmolSize[0] && height <= allowedJmolSize[1] ) { height = parseInt(height) }
	else { height = allowedJmolSize[2] }
  }
  return [width, height];
}

function _jmolRadio(script, labelHtml, isChecked, separatorHtml, groupName, id, title) {
  ++_jmol.radioCount;
  if (groupName == undefined || groupName == null)
    groupName = "jmolRadioGroup" + (_jmol.radioGroupCount - 1);
  if (!script)
    return "";
  if (labelHtml == undefined || labelHtml == null)
    labelHtml = script.substring(0, 32);
  if (! separatorHtml)
    separatorHtml = "";
  var scriptIndex = _jmolAddScript(script);
  var eospan = "</span>"
  var t = "<span id=\"span_"+id+"\""+(title ? " title =\"" + title + "\"":"")+"><input name='" 
	+ groupName + "' id='"+id+"' type='radio' onClick='_jmolClick(" +
         scriptIndex + _jmol.targetText + ");return true;' onMouseover='_jmolMouseOver(" +
         scriptIndex + ");return true;' onMouseout='_jmolMouseOut()' " +
	 (isChecked ? "checked " : "") + _jmol.radioCssText + "/>"
  if (labelHtml.toLowerCase().indexOf("<td>")>=0) {
	t += eospan
	eospan = "";
  }
  t += "<label for=\"" + id + "\">" + labelHtml + "</label>" +eospan + separatorHtml;

  return t;
}

function _jmolFindApplet(target) {
  // first look for the target in the current window
  var applet = _jmolFindAppletInWindow(_jmol.appletWindow != null ? _jmol.appletWindow : window, target);
  // THEN look for the target in child frames
  if (applet == undefined)
    applet = _jmolSearchFrames(window, target);
  // FINALLY look for the target in sibling frames
  if (applet == undefined)
    applet = _jmolSearchFrames(top, target); // look starting in top frame
  return applet;
}

function _jmolGetApplet(targetSuffix){
 var target = "jmolApplet" + (targetSuffix ? targetSuffix : "0");
 var applet = _jmolFindApplet(target);
 if (applet) return applet
 if(!_jmol.alerted)alert("could not find applet " + target);
 _jmol.alerted = true;
 return null
}

function _jmolSearchFrames(win, target) {
  var applet;
  var frames = win.frames;
  if (frames && frames.length) { // look in all the frames below this window
   try{
    for (var i = 0; i < frames.length; ++i) {
      applet = _jmolSearchFrames(frames[i], target);
      if (applet)
        return applet;
    }
   }catch(e) {
	if (_jmol.debugAlert)
		alert("Jmol.js _jmolSearchFrames cannot access " + win.name + ".frame[" + i + "] consider using jmolSetAppletWindow()") 
   }
  }
  return applet = _jmolFindAppletInWindow(win, target)
}

function _jmolFindAppletInWindow(win, target) {
    var doc = win.document;
    // getElementById fails on MacOSX Safari & Mozilla	
    if (_jmol.useHtml4Object || _jmol.useIEObject)
      return doc.getElementById(target);
    else if (doc.applets)
      return doc.applets[target];
    else
      return doc[target]; 
}

function _jmolAddScript(script) {
  if (! script)
    return 0;
  var index = _jmol.scripts.length;
  _jmol.scripts[index] = script;
  return index;
}

function _jmolClick(scriptIndex, targetSuffix, elementClicked) {
  _jmol.element = elementClicked;
  jmolScript(_jmol.scripts[scriptIndex], targetSuffix);
}

function _jmolMenuSelected(menuObject, targetSuffix) {
  var scriptIndex = menuObject.value;
  if (scriptIndex != undefined) {
    jmolScript(_jmol.scripts[scriptIndex], targetSuffix);
    return;
  }
  var len = menuObject.length;
  if (typeof len == "number") {
    for (var i = 0; i < len; ++i) {
      if (menuObject[i].selected) {
        _jmolClick(menuObject[i].value, targetSuffix);
	return;
      }
    }
  }
  alert("?Que? menu selected bug #8734");
}


_jmol.checkboxMasters = {};
_jmol.checkboxItems = {};

function jmolSetCheckboxGroup(chkMaster,chkBox) {
	var id = chkMaster;
	if(typeof(id)=="number")id = "jmolCheckbox" + id;
	chkMaster = document.getElementById(id);
	if (!chkMaster)alert("jmolSetCheckboxGroup: master checkbox not found: " + id);
	var m = _jmol.checkboxMasters[id] = {};
	m.chkMaster = chkMaster;
	m.chkGroup = {};
	for (var i = 1; i < arguments.length; i++){
		var id = arguments[i];
		if(typeof(id)=="number")id = "jmolCheckbox" + id;
		checkboxItem = document.getElementById(id);
		if (!checkboxItem)alert("jmolSetCheckboxGroup: group checkbox not found: " + id);
		m.chkGroup[id] = checkboxItem;
		_jmol.checkboxItems[id] = m;
	}
}

function _jmolNotifyMaster(m){
	//called when a group item is checked
	var allOn = true;
	var allOff = true;
	for (var chkBox in m.chkGroup){
		if(m.chkGroup[chkBox].checked)
			allOff = false;
		else
			allOn = false;
	}
	if (allOn)m.chkMaster.checked = true;	
	if (allOff)m.chkMaster.checked = false;
	if ((allOn || allOff) && _jmol.checkboxItems[m.chkMaster.id])
		_jmolNotifyMaster(_jmol.checkboxItems[m.chkMaster.id])
}

function _jmolNotifyGroup(m, isOn){
	//called when a master item is checked
	for (var chkBox in m.chkGroup){
		var item = m.chkGroup[chkBox]
		item.checked = isOn;
		if (_jmol.checkboxMasters[item.id])
			_jmolNotifyGroup(_jmol.checkboxMasters[item.id], isOn)
	}
}

function _jmolCbClick(ckbox, whenChecked, whenUnchecked, targetSuffix) {
  _jmol.control = ckbox
  _jmolClick(ckbox.checked ? whenChecked : whenUnchecked, targetSuffix);
  if(_jmol.checkboxMasters[ckbox.id])
	_jmolNotifyGroup(_jmol.checkboxMasters[ckbox.id], ckbox.checked)
  if(_jmol.checkboxItems[ckbox.id])
	_jmolNotifyMaster(_jmol.checkboxItems[ckbox.id])
}

function _jmolCbOver(ckbox, whenChecked, whenUnchecked) {
  window.status = _jmol.scripts[ckbox.checked ? whenUnchecked : whenChecked];
}

function _jmolMouseOver(scriptIndex) {
  window.status = _jmol.scripts[scriptIndex];
}

function _jmolMouseOut() {
  window.status = " ";
  return true;
}

function _jmolSetCodebase(codebase) {
  _jmol.codebase = codebase ? codebase : ".";
  if (_jmol.debugAlert)
    alert("jmolCodebase=" + _jmol.codebase);
}

function _jmolOnloadResetForms() {
  // must be evaluated ONLY once
  _jmol.previousOnloadHandler = window.onload;
  window.onload =
  function() {
    with (_jmol) {
      if (buttonCount+checkboxCount+menuCount+radioCount+radioGroupCount > 0) {
        var forms = document.forms;
        for (var i = forms.length; --i >= 0; )
          forms[i].reset();
      }
      if (previousOnloadHandler)
        previousOnloadHandler();
    }
  }
}

////////////////////////////////////
/////extensions for getProperty/////
////////////////////////////////////


function _jmolEvalJSON(s,key){
 s=s+""
 if(!s)return []
 if(s.charAt(0)!="{"){
	if(s.indexOf(" | ")>=0)s=s.replace(/\ \|\ /g, "\n")
	return s
 }
 var A = eval("("+s+")")
 if(!A)return
 if(key && A[key])A=A[key]
 return A
}

function _jmolEnumerateObject(A,key){
 var sout=""
 if(typeof(A) == "string" && A!="null"){
	sout+="\n"+key+"=\""+A+"\""
 }else if(!isNaN(A)||A==null){
	sout+="\n"+key+"="+(A+""==""?"null":A)
 }else if(A.length){
    sout+=key+"=[]"
    for(var i=0;i<A.length;i++){
	sout+="\n"
	if(typeof(A[i]) == "object"||typeof(A[i]) == "array"){
		sout+=_jmolEnumerateObject(A[i],key+"["+i+"]")
	}else{
		sout+=key+"["+i+"]="+(typeof(A[i]) == "string" && A[i]!="null"?"\""+A[i].replace(/\"/g,"\\\"")+"\"":A[i])
	}
    }
 }else{
    if(key != ""){
	sout+=key+"={}"
	key+="."
    }
    
    for(var i in A){
	sout+="\n"
	if(typeof(A[i]) == "object"||typeof(A[i]) == "array"){
		sout+=_jmolEnumerateObject(A[i],key+i)
	}else{
		sout+=key+i+"="+(typeof(A[i]) == "string" && A[i]!="null"?"\""+A[i].replace(/\"/g,"\\\"")+"\"":A[i])
	}
    }
 } 
 return sout
}


function _jmolSortKey0(a,b){
 return (a[0]<b[0]?1:a[0]>b[0]?-1:0)
}

function _jmolSortMessages(A){
 if(!A || typeof(A)!="object")return []
 var B = []
 for(var i=A.length-1;i>=0;i--)for(var j=0;j<A[i].length;j++)B[B.length]=A[i][j]
 if(B.length == 0) return
 B=B.sort(_jmolSortKey0)
 return B
}

/////////additional extensions //////////


function _jmolDomScriptLoad(URL){
 //open(URL) //to debug
 _jmol.servercall=URL
 var node = document.getElementById("_jmolScriptNode")
 if (node && _jmol.browser!="msie"){
    document.getElementsByTagName("HEAD")[0].removeChild(node)
    node=null
 }
 if (node) {
   node.setAttribute("src",URL)
 } else {
   node=document.createElement("script")
   node.setAttribute("id","_jmolScriptNode")
   node.setAttribute("type","text/javascript")
   node.setAttribute("src",URL)
   document.getElementsByTagName("HEAD")[0].appendChild(node)
 }
}


function _jmolExtractPostData(url){
 S=url.split("&POST:")
 var s=""
 for(var i=1;i<S.length;i++){
	KV=S[i].split("=")
	s+="&POSTKEY"+i+"="+KV[0]
	s+="&POSTVALUE"+i+"="+KV[1]
 }
 return "&url="+escape(S[0])+s
}

function _jmolLoadModel(targetSuffix,remoteURL,array,isError,errorMessage){
 //called by server, but in client
 //overload this function to customize return
 _jmol.remoteURL=remoteURL
 if(isError)alert(errorMessage)
 jmolLoadInlineScript(array.join("\n"),_jmol.optionalscript,targetSuffix)
}

//////////user property/status functions/////////

function jmolGetStatus(strStatus,targetSuffix){
 return _jmolSortMessages(jmolGetPropertyAsArray("jmolStatus",strStatus,targetSuffix))
}

function jmolGetPropertyAsArray(sKey,sValue,targetSuffix) {
 return _jmolEvalJSON(jmolGetPropertyAsJSON(sKey,sValue,targetSuffix),sKey)
}

function jmolGetPropertyAsString(sKey,sValue,targetSuffix) {
 var applet = _jmolGetApplet(targetSuffix);
 if(!sValue)sValue=""
 return (applet ? applet.getPropertyAsString(sKey,sValue) + "" : "")
}

function jmolGetPropertyAsJSON(sKey,sValue,targetSuffix) {
 if(!sValue)sValue = ""
 var applet = _jmolGetApplet(targetSuffix);
 try {
  return (applet ? applet.getPropertyAsJSON(sKey,sValue) + "" : "")
 } catch(e) {
  return ""
 }
}

function jmolGetPropertyAsJavaObject(sKey,sValue,targetSuffix) {
 if(!sValue)sValue = ""
 var applet = _jmolGetApplet(targetSuffix);
 return (applet ? applet.getProperty(sKey,sValue) : null)
}


function jmolDecodeJSON(s) {
 return _jmolEnumerateObject(_jmolEvalJSON(s),"")
}


///////// synchronous scripting ////////

function jmolScriptWait(script, targetSuffix) {
  if(!targetSuffix)targetSuffix="0"
  var Ret=jmolScriptWaitAsArray(script, targetSuffix)
  var s = ""
  for(var i=Ret.length;--i>=0;)
  for(var j=0;j< Ret[i].length;j++)
	s+=Ret[i][j]+"\n"
  return s
}

function jmolScriptWaitOutput(script, targetSuffix) {
  if(!targetSuffix)targetSuffix="0"
  var ret = ""
  try{
   if (script) {
    _jmolCheckBrowser();
    var applet=_jmolGetApplet(targetSuffix);
    if (applet) ret += applet.scriptWaitOutput(script);
   }
  }catch(e){
  }
 return ret;
}

function jmolEvaluate(molecularMath, targetSuffix) {

  //carries out molecular math on a model

  if(!targetSuffix)targetSuffix="0"
  var result = "" + jmolGetPropertyAsJavaObject("evaluate", molecularMath, targetSuffix);
  var s = result.replace(/\-*\d+/,"")
  if (s == "" && !isNaN(parseInt(result)))return parseInt(result);
  var s = result.replace(/\-*\d*\.\d*/,"")
  if (s == "" && !isNaN(parseFloat(result)))return parseFloat(result);
  return result;
}

function jmolScriptEcho(script, targetSuffix) {
  // returns a newline-separated list of all echos from a script
  if(!targetSuffix)targetSuffix="0"
  var Ret=jmolScriptWaitAsArray(script, targetSuffix)
  var s = ""
  for(var i=Ret.length;--i>=0;)
  for(var j=Ret[i].length;--j>=0;)
        if (Ret[i][j][1] == "scriptEcho")s+=Ret[i][j][3]+"\n"
  return s.replace(/ \| /g, "\n")
}


function jmolScriptMessage(script, targetSuffix) {
  // returns a newline-separated list of all messages from a script, ending with "script completed\n"
  if(!targetSuffix)targetSuffix="0"
  var Ret=jmolScriptWaitAsArray(script, targetSuffix)
  var s = ""
  for(var i=Ret.length;--i>=0;)
  for(var j=Ret[i].length;--j>=0;)
        if (Ret[i][j][1] == "scriptStatus")s+=Ret[i][j][3]+"\n"
  return s.replace(/ \| /g, "\n")
}


function jmolScriptWaitAsArray(script, targetSuffix) {
 var ret = ""
 try{
  jmolGetStatus("scriptEcho,scriptMessage,scriptStatus,scriptError",targetSuffix)
  if (script) {
    _jmolCheckBrowser();
    var applet=_jmolGetApplet(targetSuffix);
    if (applet) ret += applet.scriptWait(script);
    ret = _jmolEvalJSON(ret,"jmolStatus")
    if(typeof ret == "object")
	return ret
  }
 }catch(e){
 }
  return [[ret]]
}



////////////   save/restore orientation   /////////////

function jmolSaveOrientation(id, targetSuffix) {  
 if(!targetSuffix)targetSuffix="0"
  return _jmol["savedOrientation"+id] = jmolGetPropertyAsArray("orientationInfo","info",targetSuffix).moveTo
}

function jmolRestoreOrientation(id, targetSuffix) {
 if(!targetSuffix)targetSuffix="0"
 var s=_jmol["savedOrientation"+id]
 if (!s || s == "")return
 s=s.replace(/1\.0/,"0")
 return jmolScriptWait(s,targetSuffix)
}

function jmolRestoreOrientationDelayed(id, delay, targetSuffix) {
 if(arguments.length < 2)delay=1;
 if(!targetSuffix)targetSuffix="0"
 var s=_jmol["savedOrientation"+id]
 if (!s || s == "")return
 s=s.replace(/1\.0/,delay)
 return jmolScriptWait(s,targetSuffix)
}

////////////  add parameter /////////////
/*
 * for adding callbacks or other parameters. Use:

   jmolSetDocument(0)
   var s= jmolApplet(....)
   s = jmolAppletAddParam(s,"messageCallback", "myFunctionName")
   document.write(s)
   jmolSetDocument(document) // if you want to then write buttons and such normally
 
 */

function jmolAppletAddParam(appletCode,name,value){
  if(value == "")return appletCode
  return appletCode.replace(/\<param/,"\n<param name='"+name+"' value='"+value+"' />\n<param")
}

///////////////auto load Research Consortium for Structural Biology (RCSB) data ///////////

function jmolLoadAjax_STOLAF_RCSB(fileformat,pdbid,optionalscript,targetSuffix){

 if(!_jmol.thismodel)_jmol.thismodel = "1crn"
 if(!_jmol.serverURL)_jmol.serverURL="http://fusion.stolaf.edu/chemistry/jmol/getajaxjs.cfm"
 if(!_jmol.RCSBserver)_jmol.RCSBserver="http://www.rcsb.org"
 if(!_jmol.defaultURL_RCSB)_jmol.defaultURL_RCSB=_jmol.RCSBserver+"/pdb/files/1CRN.CIF"
 if(!fileformat)fileformat="PDB"
 if(!pdbid)pdbid=prompt("Enter a 4-digit PDB ID:",_jmol.thismodel)
 if(!pdbid || pdbid.length != 4)return ""
 if(!targetSuffix)targetSuffix="0"
 if(!optionalscript)optionalscript=""
 var url=_jmol.defaultURL_RCSB.replace(/1CRN/g,pdbid.toUpperCase())
 if(fileformat!="CIF")url=url.replace(/CIF/,fileformat)
 _jmol.optionalscript=optionalscript
 _jmol.thismodel=pdbid
 _jmol.thistargetsuffix=targetSuffix
 _jmol.thisurl=url
 _jmol.modelArray = []
 url=_jmol.serverURL+"?returnfunction=_jmolLoadModel&returnArray=_jmol.modelArray&id="+targetSuffix+_jmolExtractPostData(url)
 _jmolDomScriptLoad(url)
 return url
}

/////////////// St. Olaf College AJAX server -- ANY URL ///////////

function jmolLoadAjax_STOLAF_ANY(url, userid, optionalscript,targetSuffix){
 _jmol.serverURL="http://fusion.stolaf.edu/chemistry/jmol/getajaxjs.cfm"
 if(!_jmol.thisurlANY)_jmol.thisurlANY = "http://www.stolaf.edu/depts/chemistry/mo/struc/data/ycp3-1.mol"
 if(!url)url=prompt("Enter any (uncompressed file) URL:", _jmol.thisurlANY)
 if(!userid)userid="0"
 if(!targetSuffix)targetSuffix="0"
 if(!optionalscript)optionalscript=""
 _jmol.optionalscript=optionalscript
 _jmol.thistargetsuffix=targetSuffix
 _jmol.modelArray = []
 _jmol.thisurl = url
 url=_jmol.serverURL+"?returnfunction=_jmolLoadModel&returnArray=_jmol.modelArray&id="+targetSuffix+_jmolExtractPostData(url)
 _jmolDomScriptLoad(url)
}


/////////////// Mineralogical Society of America (MSA) data /////////

function jmolLoadAjax_MSA(key,value,optionalscript,targetSuffix){

 if(!_jmol.thiskeyMSA)_jmol.thiskeyMSA = "mineral"
 if(!_jmol.thismodelMSA)_jmol.thismodelMSA = "quartz"
 if(!_jmol.ajaxURL_MSA)_jmol.ajaxURL_MSA="http://rruff.geo.arizona.edu/AMS/result.php?mineral=quartz&viewing=ajaxjs"
 if(!key)key=prompt("Enter a field:", _jmol.thiskeyMSA)
 if(!key)return ""
 if(!value)value=prompt("Enter a "+key+":", _jmol.thismodelMSA)
 if(!value)return ""
 if(!targetSuffix)targetSuffix="0"
 if(!optionalscript)optionalscript=""
 if(optionalscript == 1)optionalscript='load "" {1 1 1}'
 var url=_jmol.ajaxURL_MSA.replace(/mineral/g,key).replace(/quartz/g,value)
 _jmol.optionalscript=optionalscript
 _jmol.thiskeyMSA=key
 _jmol.thismodelMSA=value
 _jmol.thistargetsuffix=targetSuffix
 _jmol.thisurl=url
 _jmol.modelArray = []
 loadModel=_jmolLoadModel
 _jmolDomScriptLoad(url)
 return url
}



function jmolLoadAjaxJS(url, userid, optionalscript,targetSuffix){
 if(!userid)userid="0"
 if(!targetSuffix)targetSuffix="0"
 if(!optionalscript)optionalscript=""
 _jmol.optionalscript=optionalscript
 _jmol.thismodel=userid
 _jmol.thistargetsuffix=targetSuffix
 _jmol.modelArray = []
 _jmol.thisurl = url
 url+="&returnFunction=_jmolLoadModel&returnArray=_jmol.modelArray&id="+targetSuffix
 _jmolDomScriptLoad(url)
}


//// in case Jmol library has already been loaded:

}catch(e){}

///////////////moving atoms //////////////

// HIGHLY experimental!!

function jmolSetAtomCoord(i,x,y,z,targetSuffix){
    _jmolCheckBrowser();
      var applet=_jmolGetApplet(targetSuffix);
      if (applet) applet.getProperty('jmolViewer').setAtomCoord(i,x,y,z)
}

function jmolSetAtomCoordRelative(i,x,y,z,targetSuffix){
    _jmolCheckBrowser();
      var applet=_jmolGetApplet(targetSuffix);
      if (applet) applet.getProperty('jmolViewer').setAtomCoordRelative(i,x,y,z)
}


///////////////applet fake for testing buttons/////////////


if(document.location.search.indexOf("NOAPPLET")>=0){
	jmolApplet = function(w){
		var s="<table style='background-color:black' width="+w+"><tr height="+w+">"
		+"<td align=center valign=center style='background-color:white'>"
		+"Applet would be here"
		+"<p><textarea id=fakeApplet rows=5 cols=50></textarea>"
		+"</td></tr></table>"
		return _jmolDocumentWrite(s)
	}

	_jmolFindApplet = function(){return jmolApplet0}

	jmolApplet0 = {
	 script: function(script){document.getElementById("fakeApplet").value="\njmolScript:\n"+script}
	,scriptWait: function(script){document.getElementById("fakeApplet").value="\njmolScriptWait:\n"+script}	
	,loadInline: function(data,script){document.getElementById("fakeApplet").value="\njmolLoadInline data:\n"+data+"\n\nscript:\n"+script}
	}
}


///////////////////////////////////////////

//new 9:49 AM 3/6/2007:

//both w and h are optional. 
//if either is between 0 and 1, then it is taken as percent/100.
//if either is greater than 1, then it is taken as a size. 
function jmolResize(w,h) {
 _jmol.alerted = true;
 var percentW = (!w ? 100 : w <= 1  && w > 0 ? w * 100 : 0)
 var percentH = (!h ? percentW : h <= 1 && h > 0 ? h * 100 : 0)
 if (_jmol.browser=="msie") {
   var width=document.body.clientWidth;
   var height=document.body.clientHeight;
 } else {
   var netscapeScrollWidth=15;
   var width=window.innerWidth - netscapeScrollWidth;
   var height=window.innerHeight-netscapeScrollWidth;
 }
 var applet = _jmolGetApplet(0);
 if(!applet)return;
 applet.style.width = (percentW ? width * percentW/100 : w)+"px"
 applet.style.height = (percentH ? height * percentH/100 : h)+"px"
 title=width +  " " + height + " " + (new Date())
}

