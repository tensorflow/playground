// JmolAstex.js -- for the AstexViewer

/*
<applet
	width="100%" height="100%" name="av"
	code="MoleculeViewerApplet.class"
	archive="/pdbe-srv/view/openastex/OpenAstexViewer.jar">
<param name="scriptFile" value="/pdbe-srv/view/openastex/default.script">
<param name="molecule1" value="/pdbe-srv/view/files/2x9t.pdb">
</applet>
*/

;(function (Jmol, document) {

	// _Applet -- the main, full-featured, Jmol object

	Jmol._Astex = function(id, Info, checkOnly){
	
	alert("The JavaScript implementation of AstexViewer is in development; not all functionality is available.")
	
		Jmol.db._fileLoadScript = ";secstruc all;schematic -name 'cartoons' -colorbyss true all;display lines off all;";
		Jmol.db._nciLoadScript = "display sticks all; display lines nonel;";
		Jmol.db._pubChemLoadScript = "display sticks all; display lines nonel;";
		
		window[id] = this;
		this._jmolType = "Jmol._Astex";
		this._viewType = "Astex";
		this._isJava = true;
		this._syncKeyword = "Astex:";
		this._availableParams = ";molecule1;scriptfile;";
		if (checkOnly)
			return this;
		this._isSigned = true;
		this._readyFunction = Info.readyFunction;
		this._ready = false;
		this._isJava = true; 
		this._isInfoVisible = false;
		this._applet = null;
		this._memoryLimit = Info.memoryLimit || 512;
		this._canScript = function(script) {return true;};
		this._savedOrientations = [];
		this._initialize = function(jarPath, jarFile) {
			var doReport = false;
			Jmol._jarFileAstex && (jarFile = Jmol._jarFileAstex);
			if(this._jarFileAstex) {
				var f = this._jarFileAstex;
				if(f.indexOf("/") >= 0) {
					alert ("This web page URL is requesting that the applet used be " + f + ". This is a possible security risk, particularly if the applet is signed, because signed applets can read and write files on your local machine or network.");
					var ok = prompt("Do you want to use applet " + f + "? ", "yes or no")
					if(ok == "yes") {
						jarPath = f.substring(0, f.lastIndexOf("/"));
						jarFile = f.substring(f.lastIndexOf("/") + 1);
					} else {
						doReport = true;
					}
				} else {
					jarFile = f;
				}
			}
 			this._jarPath = Info.jarPath = jarPath || ".";
			this._jarFile = Info.jarFile = (typeof(jarFile) == "string" ? jarFile : "OpenAstexViewer.jar" );
			if (doReport)
				alert ("The web page URL was ignored. Continuing using " + this._jarFile + ' in directory "' + this._jarPath + '"');
			Jmol.controls == undefined || Jmol.controls._onloadResetForms();		
		}		
		this._create(id, Info);
		return this;
	}

	;(function(Applet, proto) {
	Applet._get = function(id, Info, checkOnly) {
	// note that the variable name the return is assigned to MUST match the first parameter in quotes
	// applet = Jmol.getApplet("applet", Info)

		checkOnly || (checkOnly = false);
		Info || (Info = {});
		var DefaultInfo = {
			color: "#FFFFFF", // applet object background color, as for older jmolSetBackgroundColor(s)
			width: 300,
			height: 300,
			addSelectionOptions: false,
			serverURL: "http://your.server.here/jsmol.php",
			defaultModel: "",
			script: null,
			src: null,
			//scriptFile: "http://www.ebi.ac.uk/pdbe/pdbe-srv/view/openastex/default.script",
			//molecule1: "http://www.ebi.ac.uk/pdbe/entry-files/pdb1crn.ent",
			readyFunction: null,
			use: "HTML5",//other options include JAVA, WEBGL, and IMAGE
			jarPath: "java",
			jarFile: "OpenAstexViewer.jar",
			isSigned: true,
			j2sPath: "j2s",
			coverImage: null,     // URL for image to display
			coverTitle: "",       // tip that is displayed before model starts to load
			coverCommand: "",     // Jmol command executed upon clicking image
			deferApplet: false,   // true == the model should not be loaded until the image is clicked
			deferUncover: false,  // true == the image should remain until command execution is complete 
			disableJ2SLoadMonitor: false,
			disableInitialConsole: false,
			debug: false
		};	 
		Jmol._addDefaultInfo(Info, DefaultInfo);
		Jmol._debugAlert = Info.debug;
			if (!Jmol.featureDetection.allowHTML5)Info.use = "JAVA";

		Info.serverURL && (Jmol._serverUrl = Info.serverURL);

		var javaAllowed = false;
		var applet = null;
		var List = Info.use.toUpperCase().split("#")[0].split(" ");
		for (var i = 0; i < List.length; i++) {
			switch (List[i]) {
			case "JAVA":
				javaAllowed = true;
				if (Jmol.featureDetection.supportsJava())
					applet = new Applet(id, Info, checkOnly);
				break;
			case "WEBGL":
			case "HTML5":
				applet = Applet._getCanvas(id, Info, checkOnly);
				break;
			}
			if (applet != null)
				break;		  
		}
		if (applet == null) {
			if (checkOnly || !javaAllowed)
				applet = {_jmolType : "none" };
			else if (javaAllowed)
 		  	applet = new Applet(id, Info);
		}

		// keyed to both its string id and itself
		return (checkOnly ? applet : Jmol._registerApplet(id, applet));  
	}

	Applet._getCanvas = function(id, Info, checkOnly, webGL) {
    Info._isLayered = false;
  	Info._isAstex = true;
  	Info._platform = "astex.awtjs2d.Platform";
		Jmol._Canvas2D.prototype = Jmol._jsSetPrototype(new Applet(id, Info, true));
		return new Jmol._Canvas2D(id, Info, "Astex", checkOnly);
	};


	/*  AngelH, mar2007:
		By (re)setting these variables in the webpage before calling Jmol.getApplet(),
		a custom message can be provided (e.g. localized for user's language) when no Java is installed.
	*/
	Applet._noJavaMsg =
			"Either you do not have Java applets enabled in your web<br />browser or your browser is blocking this applet.<br />\
			Check the warning message from your browser and/or enable Java applets in<br />\
			your web browser preferences, or install the Java Runtime Environment from <a href='http://www.java.com'>www.java.com</a>";

	Applet._setCommonMethods = function(p) {
		p._showInfo = proto._showInfo;	
		p._search = proto._search;
		p._getName = proto._getName;
		p._readyCallback = proto._readyCallback;
	}

	Applet._createApplet = function(applet, Info, params) {
		applet._initialize(Info.jarPath, Info.jarFile);
		var jarFile = applet._jarFile;
		var jnlp = ""
		if (Jmol._isFile) {
			// local installations need jnlp here and should reference JmolApplet(Signed).jar, not JmolApplet(Signed)0.jar  
			jarFile = jarFile.replace(/0\.jar/,".jar");
			jnlp = ""//" jnlp_href=\"" + jarFile.replace(/\.jar/,".jnlp") + "\"";
		}
		// size is set to 100% of containers' size, but only if resizable. 
		// Note that resizability in MSIE requires: 
		// <!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
		var w = (applet._containerWidth.indexOf("px") >= 0 ? applet._containerWidth : "100%");
		var h = (applet._containerHeight.indexOf("px") >= 0 ? applet._containerHeight : "100%");
		var widthAndHeight = " style=\"width:" + w + ";height:" + h + "\" ";
		var attributes = "name='" + applet._id + "_object' id='" + applet._id + "_object' " + "\n"
				+ widthAndHeight + jnlp + "\n"
		params.codebase = applet._jarPath;
		params.codePath = params.codebase + "/";
		if (params.codePath.indexOf("://") < 0) {
			var base = document.location.href.split("#")[0].split("?")[0].split("/");
			base[base.length - 1] = params.codePath;
			params.codePath = base.join("/");
		}
		params.archive = jarFile;
		params.mayscript = 'true';
		params.java_arguments = "-Xmx" + Math.round(Info.memoryLimit || applet._memoryLimit) + "m";
		params.permissions = (applet._isSigned ? "all-permissions" : "sandbox");
		params.documentLocation = document.location.href;
		params.documentBase = document.location.href.split("#")[0].split("?")[0];

		params.jarPath = Info.jarPath;
		Jmol._syncedApplets.length && (params.synccallback = "Jmol._mySyncCallback");
		applet._startupScript && (params.script = applet._startupScript);
		var t = "\n"; 
 		for (var i in params)
			if(params[i])
		 		t += "  <param name='"+i+"' value='"+params[i]+"' />\n";
		if (Jmol.featureDetection.useIEObject || Jmol.featureDetection.useHtml4Object) {
			t = "<object " + attributes
				+ (Jmol.featureDetection.useIEObject ? 
					 " classid='clsid:8AD9C840-044E-11D1-B3E9-00805F499D93' codebase='http://java.sun.com/update/1.6.0/jinstall-6u22-windows-i586.cab'>"
				 : " type='application/x-java-applet'>")
				 + t + "<p style='background-color:yellow;" + widthAndHeight.split('"')[1] 
				+ ";text-align:center;vertical-align:middle;'>\n" + Applet._noJavaMsg + "</p></object>\n";
		} else { // use applet tag
			t = "<applet " + attributes
				+ " code='" + params.code + "' codebase='" + applet._jarPath + "' archive='" + jarFile + "' mayscript='true'>\n"
				+ t + "<table bgcolor='yellow'><tr><td align='center' valign='middle' " + widthAndHeight + ">\n"
				+ Applet._noJavaMsg + "</td></tr></table></applet>\n";
		}	
		t = Jmol._getWrapper(applet, true) + t + Jmol._getWrapper(applet, false) 
			+ (Info.addSelectionOptions ? Jmol._getGrabberOptions(applet) : "");
//		if (Jmol._debugAlert)
			alert (t);
		applet._code = Jmol._documentWrite(t);
	}

	proto._newApplet = function(viewerOptions) {
		return new astex.MoleculeViewerAppletJS(viewerOptions);
	}

	proto._addCoreFiles = function() {
		Jmol._addCoreFile("astex", this._j2sPath, this.__Info.preloadCore);
		if (Jmol._debugCode) {
		// no min package for that
			Jmol._addExec([this, null, "astex.MoleculeViewerAppletJS", "load Astex"]);
		}
  }
  
	proto._create = function(id, Info){
		Jmol._setObject(this, id, Info);
		var params = {
			syncId: Jmol._syncId,
			progressbar: "true",                      
			progresscolor: "blue",
			boxbgcolor: this._color || "black",
			boxfgcolor: "white",
			boxmessage: "Downloading OpenAstexViewer ...",
			script: "",//(this._color ? "background \"" + this._color +"\"": ""),
			code: "astex.MoleculeViewerApplet.class"
		};

		Jmol._setAppletParams(this._availableParams, params, Info);
		
		function sterilizeInline(model) {
			model = model.replace(/\r|\n|\r\n/g, (model.indexOf("|") >= 0 ? "\\/n" : "|")).replace(/'/g, "&#39;");
			if(Jmol._debugAlert)
				alert ("inline model:\n" + model);
			return model;
		}

		params.loadInline = (Info.inlineModel ? sterilizeInline(Info.inlineModel) : "");
		params.appletReadyCallback = "Jmol._readyCallback";
		if (Jmol._syncedApplets.length)
			params.synccallback = "Jmol._mySyncCallback";
		params.java_arguments = "-Xmx" + Math.round(Info.memoryLimit || this._memoryLimit) + "m";

		this._initialize(Info.jarPath, Info.jarFile);
		Applet._createApplet(this, Info, params);
	}

	proto._readyCallback = function(id, fullid, isReady) {
		if (!isReady)
			return; // ignore -- page is closing
		Jmol._setDestroy(this);
		this._ready = true;
		var script = this._readyScript;
		if (this._defaultModel)
			Jmol._search(this, this._defaultModel, (script ? ";" + script : ""));
		else if (script)
			this._script(script);
		else if (this._src)
			this._script('molecule remove *; object remove *;molecule load "' + this._src + '"');
		this._showInfo(true);
		this._showInfo(false);
		Jmol.Cache.setDragDrop(this);
		this._readyFunction && this._readyFunction(this);
		Jmol._setReady(this);
		var app = this._2dapplet;
		if (app && app._isEmbedded && app._ready && app.__Info.visible)
			this._show2d(true);
	}

	proto._showInfo = function(tf) {
		if(tf && this._2dapplet)
			this._2dapplet._show(false);
		Jmol.$html(Jmol.$(this, "infoheaderspan"), this._infoHeader);
		if (this._info)
			Jmol.$html(Jmol.$(this, "infodiv"), this._info);
		if ((!this._isInfoVisible) == (!tf))
			return;
		this._isInfoVisible = tf;
		// 1px does not work for MSIE
		if (this._isJava) {
			var x = (tf ? 2 : "100%");
			Jmol.$setSize(Jmol.$(this, "appletdiv"), x, x);
		}
		Jmol.$setVisible(Jmol.$(this, "infotablediv"), tf);
		Jmol.$setVisible(Jmol.$(this, "infoheaderdiv"), tf);
		this._show(!tf);
	}
/*
	proto._show2d = function(tf) {
		this._2dapplet._show2d(tf);
		if (this._2dapplet._isEmbedded) {
			this._showInfo(false);
			this._show(!tf);
		}
	}

  proto._getAtomCorrelation = function(molData) {
    // get the first atom mapping available by loading the model structure into model 2, 
    this._loadMolData(molData, "atommap = compare({1.1} {2.1} 'MAP' 'H'); zap 2.1", true);
    var map = jmol._evaluate("atommap");
    var n = jmol._evaluate("{*}.count");
    var A = [];
    var B = [];
    // these are Jmol atom indexes. The second number will be >= n, and all must be incremented by 1.
		for (var i = 0; i < map.length; i++) {
		  var c = map[i];
		  A[c[0] + 1] = c[1] - n + 1;
		  B[c[1] - n + 1] = c[0] + 1;
		}
		return {fromJmol:A, toJmol:B}; // forward and rev.		
  }
  */
	proto._show = function(tf) {
		var x = (!tf ? 2 : "100%");
		Jmol.$setSize(Jmol.$(this, "object"), x, x);
		if (!this._isJava)
			Jmol.$setVisible(Jmol.$(this, "appletdiv"), tf);
	}

	proto._clearConsole = function () {
		if (this._console == this._id + "_infodiv")
			this.info = "";
		if (!self.Clazz)return;
		Jmol._setConsoleDiv(this._console);
		Clazz.Console.clear();
	}

	proto._addScript = function(script) {      
		this._readyScript || (this.readyScript = "");
		this._readyScript && (this._readyScript += ";");
		this._readyScript += script + ";";
		return true;
	}

	proto._script = function(script) {
		if (!this._ready)
				return this._addScript(script);
		Jmol._setConsoleDiv(this._console);
		this._applet.script(script + ";");
	}
/*
	proto._syncScript = function(script) {
		this._applet.syncScript(script);
	}

	proto._scriptCheck = function(script) {
		return this._ready && this._applet.scriptCheck(script);  
	}

	proto._scriptWait = function(script, noReturn) {
		var Ret = this._scriptWaitAsArray(script);
		var s = "";
		if (!noReturn)
		for(var i = Ret.length; --i >= 0; )
			for(var j = 0, jj = Ret[i].length; j < jj; j++)
				s += Ret[i][j] + "\n";
		return s;
	}

	proto._scriptEcho = function(script) {
		// returns a newline-separated list of all echos from a script
		var Ret = this._scriptWaitAsArray(script);
		var s = "";
		for(var i = Ret.length; --i >= 0; )
			for(var j = Ret[i].length; --j >= 0; )
				if(Ret[i][j][1] == "scriptEcho")
					s += Ret[i][j][3] + "\n";
		return s.replace(/ \| /g, "\n");
	}

	proto._scriptMessage = function(script) {
		// returns a newline-separated list of all messages from a script, ending with "script completed\n"
		var Ret = this._scriptWaitAsArray(script);
		var s = "";
		for(var i = Ret.length; --i >= 0; )
			for(var j = Ret[i].length; --j >= 0; )
				if(Ret[i][j][1] == "scriptStatus")
					s += Ret[i][j][3] + "\n";
		return s.replace(/ \| /g, "\n");
	}

	proto._scriptWaitOutput = function(script) {
		var ret = "";
		try {
			if(script) {
				ret += this._applet.scriptWaitOutput(script);
			}
		} catch(e) {
		}
		return ret;
	}

	proto._scriptWaitAsArray = function(script) {
		var ret = "";
		try {
			this._getStatus("scriptEcho,scriptMessage,scriptStatus,scriptError");
			if(script) {
				ret += this._applet.scriptWait(script);
				ret = Jmol._evalJSON(ret, "jmolStatus");
				if( typeof ret == "object")
					return ret;
			}
		} catch(e) {
		}
		return [[ret]];
	}

	proto._getStatus = function(strStatus) {
		return Jmol._sortMessages(this._getPropertyAsArray("jmolStatus",strStatus));
	}

	proto._getPropertyAsArray = function(sKey,sValue) {
		return Jmol._evalJSON(this._getPropertyAsJSON(sKey,sValue),sKey);
	}

	proto._getPropertyAsString = function(sKey,sValue) {
		sValue == undefined && ( sValue = "");
		return this._applet.getPropertyAsString(sKey, sValue) + "";
	}

	proto._getPropertyAsJSON = function(sKey,sValue) {
		sValue == undefined && ( sValue = "");
		try {
			return (this._applet.getPropertyAsJSON(sKey, sValue) + "");
		} catch(e) {
			return "";
		}
	}

	proto._getPropertyAsJavaObject = function(sKey,sValue) {		
		sValue == undefined && ( sValue = "");
		return this._applet.getProperty(sKey,sValue);
	}

  proto._evaluate = function(expr) {  
  	expr != null || (expr = "");
		return this._getPropertyAsArray("variableInfo", expr);

  }

	
	proto._saveOrientation = function(id) {	
		return this._savedOrientations[id] = this._getPropertyAsArray("orientationInfo","info").moveTo;
	}

	proto._restoreOrientation = function(id) {
		var s = this._savedOrientations[id];
		if(!s || s == "")
			return s = s.replace(/1\.0/, "0");
		return this._scriptWait(s);
	}


	proto._restoreOrientationDelayed = function(id,delay) {
		arguments.length < 1 && ( delay = 1);
		var s = this._savedOrientations[id];
		if(!s || s == "")
			return s = s.replace(/1\.0/, delay);
		return this._scriptWait(s);
	}
*/
	proto._resizeApplet = function(size) {
		// See _jmolGetAppletSize() for the formats accepted as size [same used by jmolApplet()]
		//  Special case: an empty value for width or height is accepted, meaning no change in that dimension.

		/*
		 * private functions
		 */
		function _getAppletSize(size, units) {
			/* Accepts single number, 2-value array, or object with width and height as mroperties, each one can be one of:
			 percent (text string ending %), decimal 0 to 1 (percent/100), number, or text string (interpreted as nr.)
			 [width, height] array of strings is returned, with units added if specified.
			 Percent is relative to container div or element (which should have explicitly set size).
			 */
			var width, height;
			if(( typeof size) == "object" && size != null) {
				width = size[0]||size.width;
				height = size[1]||size.height;
			} else {
				width = height = size;
			}
			return [_fixDim(width, units), _fixDim(height, units)];
		}

		function _fixDim(x, units) {
			var sx = "" + x;
			return (sx.length == 0 ? (units ? "" : Jmol._allowedJmolSize[2]) 
				: sx.indexOf("%") == sx.length - 1 ? sx 
				: (x = parseFloat(x)) <= 1 && x > 0 ? x * 100 + "%" 
				: (isNaN(x = Math.floor(x)) ? Jmol._allowedJmolSize[2] 
				: x < Jmol._allowedJmolSize[0] ? Jmol._allowedJmolSize[0] 
				: x > Jmol._allowedJmolSize[1] ? Jmol._allowedJmolSize[1] 
				: x)
				+ (units ? units : "")
			);
		}

		var sz = _getAppletSize(size, "px");
		var d = Jmol._getElement(this, "appletinfotablediv");
		d.style.width = sz[0];
		d.style.height = sz[1];
		this._containerWidth = sz[0];
		this._containerHeight = sz[1];
		if (this._is2D)
			Jmol.repaint(this, true);
	}

	proto._search = function(query, script){
		Jmol._search(this, query, script);
	}

	proto._searchDatabase = function(query, database, script, _jmol_searchDatabase){
		if (this._2dapplet && this._2dapplet._isEmbedded && Jmol.$(this, "2dappletdiv:visible")[0])
			return this._2dapplet._searchDatabase(query, database, script); 
		this._showInfo(false);
		if (query.indexOf("?") >= 0) {
			Jmol._getInfoFromDatabase(this, database, query.split("?")[0]);
			return;
		}
		script || (script = Jmol._getScriptForDatabase(database));
		this._currentView = null;
		var dm = database + query;
		this._searchQuery = dm;
 		this._loadFile(dm, script, dm);
	}

	proto._loadFile = function(fileName, script, chemID, _jmol_loadFile){
		this._showInfo(false);
		script || (script = "");
		this._thisJmolModel = "" + Math.random();
		fileName = Jmol._getDirectDatabaseCall(fileName);
		this._fileName = fileName;
		if (!this._scriptLoad(fileName, script)) {
			// we load the data here instead of in Jmol in the case of
			// JSmol/Java/Sandboxed or when part of a view set 
			var me = this;      
			Jmol._loadFileData(this, fileName, 
				function(data){me.__loadModel(data, script, chemID)},
				function() {me.__loadModel(null)}
			);
		}
	}
					 
	proto._scriptLoad = function(file, script, _jmol_scriptLoad) {
		script || (script = "");
		var doscript = (this._isJava || !this._noscript);
		if (!this._isSigned || this._viewSet != null)
			return false;
		if (doscript)
			this._script("molecule remove *; object remove *;molecule load \"" + file + "\";" + script);
		else
			this._applet.openFile(file);
		this._checkDeferred("");
		return true;
	}

	proto.__loadModel = function(mol, script, chemID, _jmol__loadModel) {
		if (mol == null)
			return;
		if (this._viewSet != null) {
			script || (script = ""); 
		}
		if (!script && this._noscript) {
			this._applet.loadInline(mol, '\0');
		} else {
		  this._loadMolData(mol, script, false);
		}
		if (this._viewSet != null) {
			Jmol.View.updateView(this, {chemID:chemID, data:mol});
		}      
	}

  proto._loadMolData = function(mol, script, isAppend) {
		script || (script = "");
		var name = (isAppend ? "append" : "model");
		script = 'load DATA "' + name + '"' + mol + '\nEND "'+ name +'" ;' + script;
		this._applet.scriptWait(script);
  }
  
	proto._loadModelFromView = function(view, _jmol_loadModelFromView) {
		// request from Jmol.View to update view with view.JME.data==null or needs changing
		this._currentView = view;
		var rec = view.Jmol;
		if (rec.data != null) {
			this.__loadModel(rec.data, null, view.info.chemID);
			return;
		}
		if (view.info.chemID != null) {
			Jmol._searchMol(this, view.info.chemID, null, false);
			return;
		}
		rec = view.JME;
		if (rec) {
			rec.applet._show2d(false, this);
			return;
		}
	}

	proto._updateView = function(_jmol_updateView) {
		if (this._viewSet == null || !this._applet)
			return;
		// called from model change without chemical identifier, possibly by user action and call to Jmol.updateView(applet)
		chemID = "" + this._getPropertyAsJavaObject("variableInfo","script('show chemical inchiKey')");
		if (chemID.length() < 36) // InChIKey=RZVAJINKPMORJF-BGGKNDAXNA-N
			chemID = null;
		else
			chemID = chemID.substring(36).split('\n')[0];
		Jmol.View.updateView(this, {chemID:chemID, data: "" + this._getPropertyAsJavaObject("evaluate", "extractModel", "{visible}")});
	}

	proto._atomPickedCallback = function(imodel, iatom, _jmol_atomPickedCallback) {
		// direct callback from Jmol HTML5 applet
		if (iatom < 0) {
		// TODO could be a model change? 
		} else {
			var A = [iatom + 1];
			Jmol.View.updateAtomPick(this, A);
			this._updateAtomPick(A);
		}
	}

	proto._updateAtomPick = function(A) {
			this._script(A.length == 0 ? "select none" : "select on visible and (@" + A.join(",@") + ")");
	}

  proto._isDeferred = function () {
      return !this._canvas && this._cover && this._isCovered && this._deferApplet
  }

	proto._checkDeferred = function(script) {
		if (this._isDeferred()) {
			this._coverScript = script;
			this._cover(false);
			return true;
		}
		return false;
	}
/*
  proto._getSmiles = function() {
		return this._evaluate("{visible}.find('SMILES')");   
  }
  
  proto._getMol = function() {
		return this._evaluate("getProperty('ExtractModel',{visible})");   
  }

  proto._getMol2D = function() {
		return jmol._evaluate("script('select visible;show chemical sdf')"); // 2D equivalent
  }
  
  */
})(Jmol._Astex, Jmol._Astex.prototype);


})(Jmol, document);

	Jmol.getAstexApplet = function(id, Info, checkOnly) {
		return Jmol._Astex._get(id, Info, checkOnly);
	}
