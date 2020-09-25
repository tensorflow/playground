/*
*  JSpecView Utility functions
*  Version 2.0, Copyright(c) 2006-2012, Dept of Chemistry, University of the West Indies, Mona
*  Robert J Lancashire  robert.lancashire@uwimona.edu.jm
*
*
*  12:19 PM 3/8/2012 added support for JSpecViewAppletPro  -- BH
*  5/21/2012 -- incorporated as JmolJSV.js into Jmol
* 
*/

// BH 2019.04.27 fixes 1H+13C viewing
// BH 1/14/2017 7:12:47 PM adds proto._showTooltip
// BH 4/24/2016 4:42:06 PM working around Resolver 2D issues
// BH 2/2/2014 11:39:44 AM Jmol/JSME/JSV working triad
// BH 1/30/2014 1:04:09 PM adds Info.viewSet 
// BH 10/10/2013 1:25:28 PM JSV HTML5 option
/*
	Inserts the JSpecView applet in any compatible User Agent using the <object> tag
	uses IE conditional comments to distinguish between IE and Mozilla
	see http://msdn.microsoft.com/workshop/author/dhtml/overview/ccomment_ovw.asp
*/

;(function (Jmol, document, $) {

	Jmol._JSVApplet = function(id, Info, checkOnly){
		this._version="2.0";
		this._jmolType = "Jmol._JSVApplet" + (Info.isSigned ? " (signed)" : "");
		this._viewType = "JSV";
		this._id = id;
		this._uniqueId = ("" + Math.random()).substring(3);
		this._isJava = true;
		Jmol._setObject(this, id, Info);
		this._startupScript = Jmol._JSVApplet.getStartupScript(this, Info);
		this._syncKeyword = "JSpecView:"
		if (checkOnly)
			return this;
		this._width = Info.width;
		this._height = Info.height;
		this._isSigned = Info.isSigned;
		this._isJava = true;
		this._isPro = this._isSigned;
		this._dataMultiplier=1;
		this._hasOptions = Info.addSelectionOptions;
		this._info = "";
		this._infoHeader = this._jmolType + ' "' + this._id + '"'
		this._defaultModel = Info.defaultModel;
		this._readyFunction = Info.readyFunction;
		this._ready = false; 
		this._applet = null;
		this._jarFile = Info.jarFile || (Info.isSigned ? "JSpecViewAppletSigned.jar" : "JSpecViewApplet.jar"); 
		this._jarPath =	Info.jarPath || "java"; 
		this._memoryLimit = Info.memoryLimit || 512;
		this._canScript = function(script) {return true;};
		this._containerWidth = this._width + ((this._width==parseFloat(this._width))? "px":"");
		this._containerHeight = this._height + ((this._height==parseFloat(this._height))? "px":"");
		this._initialize = function(codebaseDirectory, fileNameOrUseSignedApplet) {
			Jmol.controls == undefined || Jmol.controls._onloadResetForms();		
		}		
		this._create(id, Info);
		return this;
	}

;(function (Applet, proto) {
	Applet._get = function(id, Info, checkOnly) {
	// note that the variable name the return is assigned to MUST match the first parameter in quotes
	// applet = Jmol.getJSVApplet("applet", Info)

		Info || (Info = {});
		var DefaultInfo = {
			width: 800,
			height: 300,
			debug: false,
			color: "#A0A0A0",
			jarPath: "java",
			jarFile: "JSpecViewApplet.jar",
			j2sPath: "j2s",
			use: "HTML5",
			isSigned: false,
			initParams: null,
			readyFunction: null,
			script: null
		};
		Jmol._addDefaultInfo(Info, DefaultInfo);

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
      	Info._isLayered = true;
  			Info._isJSV = true;
			  Info._platform = "JSV.awtjs2d.Platform";
				Jmol._Canvas2D.prototype = Jmol._jsSetPrototype(new Applet(id,Info, true));
			 	applet = new Jmol._Canvas2D(id, Info, "JSV", checkOnly);
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
		return (checkOnly ? applet : Jmol._registerApplet(id, applet));
	}

	Applet.getStartupScript = function(applet, Info) {
		return (Info.initParams ? Info.initParams : "") 
				+ ';appletID ' + applet._id + ';syncID '+ Jmol._syncId
				+ ';backgroundcolor ' + applet._color
				+ ';appletReadyCallbackFunctionName Jmol._readyCallback'// + applet._id + '._readyCallback'
				+ ';syncCallbackFunctionName Jmol._mySyncCallback;';	
	}

	proto._newApplet = function(viewerOptions) {
		return (this._isPro ? new JSV.appletjs.JSVAppletPro(viewerOptions) 
				: new JSV.appletjs.JSVApplet(viewerOptions));
	}

	proto._addCoreFiles = function() {
		Jmol._addCoreFile("jsv", this._j2sPath, this.__Info.preloadCore);
		if (Jmol._debugCode) {
		// no min package for that
			Jmol._addExec([this, null, "JSV.appletjs.JSVApplet", "load JSV"]);
			if (this._isPro)
				Jmol._addExec([this, null, "JSV.appletjs.JSVAppletPro", "load JSV(signed)"]);
		}
  }

	proto._create = function(id, Info){

		Jmol._setObject(this, id, Info);
		this._startupScript = Applet.getStartupScript(this, Info);

		var params = {
			boxbgcolor: this._color,
			boxfgcolor: "white",
			syncId: Jmol._syncId,
			code:"jspecview.applet.JSVApplet" + (this._isSigned ? "Pro" : "")
			};

		Jmol._Applet._createApplet(this, Info, params);
	}

	proto._cover = function (doCover) {
		// TODO: cover options here, including Java
		if (!this._isJava)
			this._newCanvas(false);
		this._showInfo(false);
		this._init();
	};

	proto._readyCallback = function(id, fullid, isReady) {
	 if (!isReady)
			return; // ignore -- page is closing
		this._ready = true;
		this._readyScript && setTimeout(id + "._script(" + id + "._readyScript)",50);
		this._showInfo(true);
		this._showInfo(false);
		this._readyFunction && this._readyFunction(this);
		Jmol.Cache.setDragDrop(this);
		Jmol._setReady(this);
	}	
		
	proto._checkDeferred = function(script) {
		return false;
	}	

	proto._scriptLoad = function(file, script, _jsv_scriptLoad) {
		script || (script = "");
		var doscript = (this._isJava || !this._noscript);
		if (!this._isSigned || this._viewSet != null)
			return false;
		if (doscript)
			this._script("load \"" + file + "\";" + script);
		else
			this._applet.openFile(file);
		this._checkDeferred("");
		return true;
	}

	proto._clearConsole = Jmol._Applet.prototype._clearConsole;
	proto._showInfo = Jmol._Applet.prototype._showInfo;
	proto._show = Jmol._Applet.prototype._show;

	proto._search = function(query, script){
		query || (query = Jmol.$val(Jmol.$(this, "query")))
		var a = this;
		if (a._viewSet && !query.startsWith("!")) {
			a = Jmol.View.applets[a._viewSet];
			a = a.Jmol || a.JSV || this;
		}
		Jmol._search(a, query);
	}

	proto._searchDatabase = function(query, database) {
		return this._applet.runScript("load ID \"" + query + "\" \"" + database + query + "\"")
	}

	proto._script = function(script) {
		if (!this._ready) {
			this._readyScript || (this._readyScript = ";");
			this._readyScript += ";" + script;
			return; 
		}
		this._applet.runScript(script);
	}

	proto._syncScript = function(script) {
		this._applet.syncScript(script);
	}

	proto._getPropertyAsJSON = function(sKey) {
		return "" + this._applet.getPropertyAsJSON(sKey);
	}

	proto._getPropertyAsJavaObject = function(sKey) {	
		return this._applet.getPropertyAsJavaObject(sKey);
	}

	proto._getPropertyAsArray = function(sKey,sValue) {
		return Jmol._evalJSON(this._getPropertyAsJSON(sKey,sValue),sKey);
	}

	proto._resizeApplet = Jmol._Applet.prototype._resizeApplet;

	proto._loadFile = function(fileName, params){
		this._showInfo(false);
		params || (params = "");
		this._thisJSVModel = "" + Math.random();
		// TODO
//		this._script("zap;set echo middle center;echo Retrieving data...");
		if (this._jvsIsSigned && this._viewSet == null) {
			this._script("load \"" + fileName + "\"" + params);
			return;
		}
		var me = this;
		Jmol._loadFileData(this, fileName, function(data){me._loadInline(data)}, function(data){me._loadInline(null)});
	}

  proto._showTooltip = function(text) {
    var s = "<span id='" + this._id + "_tooltip' style='position:absolute;z-index:10000000;left:0px;top:0px;background-color:yellow'></span>";
    var t = this._tooltip;
    if (!t) {    
      Jmol.$after("body",s);
      t = this._tooltip = Jmol.$(this, "tooltip");
    }
    t.hide();
    this._tooltipTimer && clearTimeout(this._tooltipTimer);
    this._tooltipTimer1 && clearTimeout(this._tooltipTimer1); 
    var me = this;
    this._tooltipTimer1 = setTimeout(function(){
      t[0].style.left = (Jmol._mousePageX+10) + "px";
      t[0].style.top = (Jmol._mousePageY+20) + "px";
      t[0].innerHTML = text;
      t.show();
      me._tooltipTimer = setTimeout(function(){t.hide()},4000);
    },50);
  }
  
	proto._loadInline = function(data) {
		// called when loading JDX data
		this._currentView = null;
		if (data != null)
			this._applet.loadInline(data);
		if (this._viewSet != null)
			Jmol.View.updateView(this, {data:data});
	}

	proto._loadModelFromView = function(view, _jsv_loadModelFromView) {
		// called request to update view with view.JSV.data==null from Jmol.View
		// we must get the simulation from MOL data

		this._currentView = view;
		var molData = null;
		var rec = view.JSV;
		var vJmol = view.Jmol;
		var vJME = view.JME;
		if (!vJME && !vJmol && view.info.chemID == null) {
			rec.data = "N/A"; // this has to be a simulation to work
			return;
		}
		var v = null;
		if (vJmol) {
			molData = vJmol.data;
			if (molData ? true : vJmol.applet && vJME && vJME.data)
				v = vJmol 
		}
		if (!molData && !v && (v = vJME) != null)
			molData = vJME.data;
			
			
		if (v && !molData) {
			// complete Jmol or JME needs first
			v.applet._loadModelFromView(view);
			return;
		}

		if (this._getAppletInfo("SOURCEID") == view.info.viewID) {
			this._applet.runScriptNow("SELECT ID \"" + view.info.viewID + "\"");
			return;
		}
		// get the simulation into JSpecView
		var script = this.__Info.preloadScript;
		if (this._addC13)
			script = "CLOSE ALL";
		else if (script == null)
			script = "CLOSE VIEWS;CLOSE SIMULATIONS > 1";
		script += "; LOAD ID \"" + view.info.viewID + "\" APPEND \"http://SIMULATION/MOL=" + molData.replace(/\n/g,"\\n") + "\"";
  	if (this._addC13)
      script += "; LOAD ID \"" + view.info.viewID + "__C13\" APPEND \"http://SIMULATION/C13/MOL=" + molData.replace(/\n/g,"\\n") + "\"";
		this._applet.runScriptNow(script);
		// update Jmol and/or JME to correspond with the model returned.
		molData = this._getAppletInfo("DATA_mol");
		if (!molData)
			return;
		Jmol.View.updateView(this, {chemID:view.info.chemID, data:molData});
		this._propagateView(view, molData);
	}

	proto._propagateView = function(view, molData, _jsv_propagateView) {
		var vJmol = view.Jmol;
		var vJME = view.JME;
		if (vJmol) {
			vJmol.data = molData;
			if (vJmol.applet)
				vJmol.applet._loadModelFromView(this._currentView);
			if (vJME)
				vJME.applet._loadFromJmol(vJmol.applet, "jmeh");
		} else if (vJME) {
			vJME.data = molData;
			vJME.applet._loadModelFromView(this._currentView);
		}
		this.__selectSpectrum();
	}
	
  proto._reset = function(_jmol_resetView) {
    this._script("view clear");
  }
  

	proto._updateView = function(msgOrPanel, peakData, _jsv_updateView) {
		if (this._viewSet == null || !this._applet || msgOrPanel && msgOrPanel.vwr)
			return;
		// JSV applet will call this, but we don't care for now 
		if (!peakData) {
			// comming from JSmolCore.js -- view not found; new load
			// generally we will IGNORE THIS as an actual spectrum load, but if there
			// is a MOL file, that should be recognized.
			var msg = msgOrPanel;			
			if (msg && (msg.indexOf("http://SIMULATION" >= 0) || msg.indexOf("cache://") >= 0)) {
				var molData = this._getAppletInfo("DATA_mol");
				if (molData) {
					Jmol.View.updateView(this, { chemID: "", viewID: Jmol._getAttr(msg, "sourceID") || Jmol._getAttr(msg, "file"), data:molData});
					this._propagateView(this._currentView, molData);
				}
			}
			return;
		}
 		// called from file load or panel selection or peak selection
		Jmol.View.updateFromSync(this, peakData);
	}
 
	proto.__selectSpectrum = function() {
	// not entirely clear why this should be necessary, but it is, especially
	// after a peak pick
		var me = this;
		setTimeout(function() {me._applet.runScript("SELECT ID \"" + me._currentView.info.viewID + "\"")},10);
	}
	 
	proto._updateAtomPick = function(A) {
		// from JSmolCore.js
		// send the message to JSpecView to highlight a peak;
		// will result in a return to _updateView providing a <PeakData record
		this._applet.syncScript('<PeakData atom="' + A[0] + '" sourceID="' + this._currentView.info.viewID + '">');
		// seems to be necessary when there are two spectra and when this atom is clicked,
		// this structure is not yet highlighted.
		this.__selectSpectrum();
	}

	proto._getAppletInfo = function(key) {
		return "" + this._applet.getPropertyAsJavaObject(key).get(key)
	}

	proto.__loadModel = function(data, chemID, viewID) {
	// retun from asynchronous call in loadModelFromView 
		if (data == null)
			return;
		Jmol.View.updateView(this, {chemID:chemID, data:data, viewID:viewID});
	}

	proto._showStatus = function(msg, title) {
	 // from JSV
		title && (msg = title + "\n\n\n" + msg);
		alert (msg);
	}
	
	proto._getSmiles = function() {
	 return null;
	}

})(Jmol._JSVApplet, Jmol._JSVApplet.prototype);

////// additional API for JSpecView ////////////

	/**
	 * returns a Java Map<String, Object>
	 * -- use key = "" for full set
	 * -- key can drill down into spectra selecting specific subsets of data 
	 */ 

	Jmol.jsvGetPropertyAsJavaObject = function(jsvApplet, key) {
		return jsvApplet._applet.getPropertyAsJavaObject(key)
	}

	/**
	 * returns a JSON equivalent of jsvGetPropertyAsJavaObject
	 * -- use key = "" for full set	
	 * -- key can drill down into spectra selecting specific subsets of data 
	 */ 

	Jmol.jsvGetPropertyAsJSON = function(jsvApplet, key) {
		return "" + jsvApplet._applet.getPropertyAsJSON(key)
	}

	Jmol.jsvIsPro = function(jsvApplet) {
		return (jsvApplet._applet.isPro() ? true : false);
	}

	Jmol.jsvIsSigned = function(jsvApplet) {
		return (jsvApplet._applet.isSigned() ? true : false);
	}

	/**
	 * Returns the calculated colour of a visible spectrum (Transmittance)
	 * 
	 * @return Color as a string
	 */
	Jmol.jsvGetSolnColour = function(jsvApplet) {
		return "" + jsvApplet._applet.getSolnColour();
	}

	/**
	 * Method that can be called from another applet or from javascript to return
	 * the coordinate of clicked point in the plot area of the <code>
	 * JSVPanel</code>
	 * 
	 * @return A String representation of the coordinate
	 */

	Jmol.jsvGetCoordinate = function(jsvApplet) {
		return "" + jsvApplet._applet.getCoordinate();
	}

	/**
	 * Delivers spectrum coded as desired: XY, SQZ, PAC, DIF, DIFDUP, FIX, AML, CML
	 * 
	 * @param type
	 * @param n -- nth spectrum in set: -1 for current; 0->[nSpec-1] for a specific one
	 * @return data or "only <nSpec> spectra available"
	 * 
	 */

	Jmol.jsvExport = function(jsvApplet, exportType, n) {
		return "" + jsvApplet._applet.exportSpectrum(exportType, n);
	}

	/**
	 * runs a script right now, without queuing it, and returns 
	 * only after completion 
	 * returns TRUE if succesful (ureliably; under development)
	 */	 
	Jmol.jsvRunScriptNow = function(jsvApplet, script) {
		return (jsvApplet._applet.runScriptNow(script) ? true : false);
	}

	/**
	 * runs a script using a queue, possibly waiting until an applet is ready
	 * same as Jmol.script(jsvApplet, script) 
	 * 
	 * @param script
	 */
	Jmol.jsvRunScript = function(jsvApplet, script) {
		jsvApplet.runScript(script); 
	}

	/**
	 * Loads in-line JCAMP-DX data into the existing applet window
	 * 
	 * @param data
	 *      String
	 */

	Jmol.jsvLoadInline = function(jsvApplet, data, params) {
		jsvApplet._loadInline(data);
		// currently params are ignored
	}

	Jmol.jsvSetFilePath = function(jsvApplet, tmpFilePath) {
		jsvApplet._applet.setFilePath(tmpFilePath);
	}

	/**
	 * Sets the spectrum to the specified block number
	 * same as SPECTRUMNUMBER n
	 * @param n -- starting with 1
	 */
	Jmol.jsvSetSpectrumNumber = function(jsvApplet, n) {
		jsvApplet._applet.setSpectrumNumber(n);
	}

	/**
	 * toggles the grid on/off
	 */

	Jmol.jsvToggleGrid = function(jsvApplet) {
		jsvApplet._applet.toggleGrid();
	}

	/**
	 * toggles the coordinate display
	 */
	Jmol.jsvToggleCoordinate = function(jsvApplet) {
		jsvApplet._applet.toggleCoordinate();
	}

	/**
	 * toggles the integration graph on/off
	 */
	Jmol.jsvToggleIntegration = function(jsvApplet) {
		jsvApplet._applet.toggleIntegration();
	}

	/**
	 * adds a highlight to a portion of the plot area
	 * 
	 * @param x1
	 *        the starting x value
	 * @param x2
	 *        the ending x value
	 * @param r
	 *        the red portion of the highlight color or -1
	 * @param g
	 *        the green portion of the highlight color or -1
	 * @param b
	 *        the blue portion of the highlight color or -1
	 * @param a
	 *        the alpha portion of the highlight color or -1
	 */
	Jmol.jsvAddHighlight = function(jsvApplet, x1, x2, r, g, b, a) {
		if (arguments.length == 7)
			jsvApplet._applet.addHighlight(x1, x2, r, g, b, a);
	}

	/**
	 * removes all highlights from the plot area
	 */
	Jmol.jsvRemoveAllHighlights = function(jsvApplet) {
		jsvApplet._applet.removeAllHighlights();
	}

	/**
	 * removes a highlight from the plot area
	 * 
	 * @param x1
	 *        the starting x value
	 * @param x2
	 *        the ending x value
	 */
	Jmol.jsvRemoveHighlight = function(jsvApplet, x1, x2) {
		jsvApplet._applet.removeHighlight(x1, x2);
	}

	/**
	 * Method that can be called from another applet or from javascript that
	 * toggles reversing the plot on a <code>JSVPanel</code>
	 */
	Jmol.jsvReversePlot = function(jsvApplet) {
		jsvApplet._applet.reversePlot();
	}

	/**
	 * Writes a message to the status label
	 * 
	 * @param msg
	 *        the message
	 */
	Jmol.jsvWriteStatus = function(jsvApplet, msg) {
		jsvApplet._applet.writeStatus(msg);
	}

	Jmol.jsvSetVisible = function(jsvApplet, TF) {
		jsvApplet._applet.setVisible(TF);
	}

	Jmol.getJSVAppletHtml = function(applet, Info) {
		// optional Info here	
		if (Info) {
			var d = Jmol._document;
			Jmol._document = null;
			applet = Jmol.getJSVApplet(applet, Info);
			Jmol._document = d;
		}
		return applet._code;
	}
	
Jmol.newGrayScaleImage = function(context, image, width, height, grayBuffer) {
	var c;
  image || (image = Jmol.$(context.canvas.applet, "image")[0]);
	if (image == null) {
		var appId = context.canvas.applet._id;
    var id = appId + "_imagediv";
		c = document.createElement("canvas");
		c.id = id;
		c.style.width = width + "px";
		c.style.height = height + "px";
		c.width = width;
		c.height = height;

		var layer = document.getElementById(appId + "_contentLayer");
		image = new Image();
		image.canvas = c;
		image.appId = appId;
		image.id = appId + "_image";
		image.layer = layer;
		image.w = width;
		image.h = height;
		image.onload = function(e) {
			try {
			  URL.revokeObjectURL(image.src);
			} catch (e) {}
		};
		var div = document.createElement("div");
		image.div = div;
		div.style.position="absolute";
		layer.appendChild(div);
		div.appendChild(image);
	}
	c = image.canvas.getContext("2d");
	var imageData = c.getImageData(0, 0, width, height);
	var buf = imageData.data;
	var ng = grayBuffer.length;
	var pt = 0;
	for (var i = 0; i < ng; i++) {
		buf[pt++] = buf[pt++] = buf[pt++] = grayBuffer[i];
		buf[pt++] = 0xFF;
	}
	c.putImageData(imageData, 0, 0);
	image.canvas.toBlob(function(blob){image.src = URL.createObjectURL(blob)});
	return image;
}

})(Jmol, document, jQuery);
