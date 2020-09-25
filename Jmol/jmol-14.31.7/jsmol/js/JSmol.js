// JSmol.js -- Jmol pure JavaScript version
// author: Bob Hanson, hansonr@stolaf.edu	4/16/2012
// author: Takanori Nakane biochem_fan 6/12/2012

// BH 12/17/2015 4:43:05 PM adding Jmol._requestRepaint to allow for MSIE9 not having 3imationFrame
// BH 12/13/2015 11:44:39 AM using requestAnimationFrame instead of setTimeout (fixes Chrome slowness)
// BH 10/12/2015 1:15:39 PM fix for set echo image in JavaScript
// BH 6/12/2015 6:08:08 AM image loading from PNGJ file bytes using data uri not working
// BH 3/28/2015 6:18:33 AM refactoring to generalize for non-Jmol-related SwingJS applications
// BH 9/6/2014 5:42:32 PM  two-point gestures broken
// BH 5/8/2014 11:16:40 AM j2sPath starting with "/" fails to add idiom
// BH 1/16/2014 8:44:03 PM   __execDelayMS = 100; // FF bug when loading into a tab that is not 
//                           immediately focused and not using jQuery for adding the applet and having  
//                           multiple applets.
// BH 12/6/2013 10:12:30 AM adding corejmoljsv.z.js
// BH 9/17/2013 10:18:40 AM  file transfer functions moved to JSmolCore 
// BH 3/5/2013 9:54:16 PM added support for a cover image: Info.coverImage, coverScript, coverTitle, deferApplet, deferUncover
// BH 1/3/2013 4:54:01 AM mouse binding should return false -- see d.bind(...), and d.bind("contextmenu") is not necessary

// This library requires prior inclusion of 

//  jQuery 9 or higher
//	JSmoljQueryExt.js
//	JSmolCore.js
//  j2sjmol.js    (Clazz and associated classes)

// these:
//
//  JSmolApplet.js
//  JSmolApi.js
//  JSmolThree.js
//  JSmolGLmol.js
//  
//  are optional 

;(function (Jmol) {

	Jmol._isAsync = false; // testing only
	Jmol._asyncCallbacks = {};
	
	Jmol._coreFiles = []; // required for package.js


///////////////////
// This section provides an asynchronous loading sequence
//

// methods and fields starting with double underscore are private to this .js file

  var __clazzLoaded = false;
	var __execLog = [];
	var __execStack = [];
	var __execTimer = 0;
	var __coreSet = [];
	var __coreMore = [];
	var __execDelayMS = 100; // must be > 55 ms for FF

	var __nextExecution = function(trigger) {
    arguments.length || (trigger = true);
		delete __execTimer;
		var es = __execStack;
		var e;
		while (es.length > 0 && (e = es[0])[4] == "done")
			es.shift();
		if (es.length == 0)
			return;
		if (!Jmol._isAsync && !trigger) {
			setTimeout(__nextExecution,10)
			return;
		}
		e.push("done");
		var s = "JSmol exec " + e[0]._id + " " + e[3] + " " + e[2];
		if (self.System)
			System.out.println(s);
			//alert(s)
		if (self.console)console.log(s + " -- OK")
		__execLog.push(s);
		e[1](e[0],e[2]);	
	};

	var __loadClazz = function(applet) {
		if (!__clazzLoaded) {
			__clazzLoaded = true;
			// create the Clazz object
			LoadClazz();
			if (applet._noMonitor)
				Clazz._LoaderProgressMonitor.showStatus = function() {}
			LoadClazz = null;
      if (applet.__Info.uncompressed)
        Clazz.loadClass(); // for now; allows for no compression 
			Clazz._Loader.onGlobalLoaded = function (file) {
			 // not really.... just nothing more yet to do yet
				Clazz._LoaderProgressMonitor.showStatus("Application loaded.", true);
				if (!Jmol._debugCode || !Jmol.haveCore) {
					Jmol.haveCore = true;
					__nextExecution();
				}
			};
		  // load package.js and j2s/core/core.z.js
			Clazz._Loader.loadPackageClasspath("java", null, true, __nextExecution);
			return;
		}
		__nextExecution();
	};

	var __loadClass = function(applet, javaClass) {
		Clazz._Loader.loadClass(javaClass, function() {__nextExecution()});
	};

	Jmol.showExecLog = function() { return __execLog.join("\n") }; 

	Jmol._addExec = function(e) {
    e[1] || (e[1] = __loadClass);
		var s = "JSmol load " + e[0]._id + " " + e[3];
		if (self.console)console.log(s + "...")
		__execLog.push(s);   
		__execStack.push(e);
	}

	Jmol._addCoreFile = function(type, path, more) {
  
    // BH 3/15: idea here is that when both Jmol and JSV are present, 
    // we want to load a common core file -- jmoljsv.z.js --
    // instead of just one. Otherwise we do a lot of duplication.
    // It is not clear how this would play with other concurrent
    // apps. So this will take some thinking. But the basic idea is that
    // core file to load is 
     
    type = type.toLowerCase().split(".")[0]; // package name only 

    // return if type is already part of the set.    
		if (__coreSet.join("").indexOf(type) >= 0) return;
    
    // create a concatenated lower-case name for a core file that includes
    // all Java applets on the page
    
		__coreSet.push(type);
		__coreSet.sort();
		Jmol._coreFiles = [path + "/core/core" + __coreSet.join("") + ".z.js" ];
		if (more && (more = more.split(" ")))
			for (var i = 0; i < more.length; i++)
				if (__coreMore.join("").indexOf(more[i]) < 0)
					__coreMore.push(path + "/core/core" + more[i] + ".z.js")
		for (var i = 0; i < __coreMore.length; i++)
			Jmol._coreFiles.push(__coreMore[i]);
	}      		

	Jmol._Canvas2D = function(id, Info, type, checkOnly){
		// type: Jmol or JSV
		this._uniqueId = ("" + Math.random()).substring(3);
		this._id = id;
		this._is2D = true;
		this._isJava = false;
		this._jmolType = "Jmol._Canvas2D (" + type + ")";
    this._isLayered = Info._isLayered || false;
    this._isSwing = Info._isSwing || false;
    this._isJSV = Info._isJSV || false;
    this._isAstex = Info._isAstex || false;            
    this._platform = Info._platform || "";
		if (checkOnly)
			return this;
		window[id] = this;
		this._createCanvas(id, Info);
		if (!Jmol._document || this._deferApplet)
			return this;
		this._init();
		return this;
	};

	Jmol._setAppletParams = function(availableParams, params, Info, isHashtable) {
		for (var i in Info)
			if(!availableParams || availableParams.indexOf(";" + i.toLowerCase() + ";") >= 0){
				if (Info[i] == null || i == "language" && !Jmol.featureDetection.supportsLocalization())
					continue;
				if (isHashtable)
					params.put(i, (Info[i] === true ? Boolean.TRUE: Info[i] === false ? Boolean.FALSE : Info[i]))
				else
					params[i] = Info[i];
			}
	}     
	 
	Jmol._jsSetPrototype = function(proto) {
		proto._init = function() {
	 		this._setupJS();
			this._showInfo(true); 
			if (this._disableInitialConsole)
				this._showInfo(false);
		};

		proto._createCanvas = function(id, Info, glmol) {
			Jmol._setObject(this, id, Info);
			if (glmol) {
				this._GLmol = glmol;
		 		this._GLmol.applet = this;
				this._GLmol.id = this._id;
			}      
			var t = Jmol._getWrapper(this, true);
			if (this._deferApplet) {
			} else if (Jmol._document) {
				Jmol._documentWrite(t);
				this._newCanvas(false);				        
				t = "";
			} else {
				this._deferApplet = true;
				t += '<script type="text/javascript">' + id + '._cover(false)</script>';
			}
			t += Jmol._getWrapper(this, false);
			if (Info.addSelectionOptions)
				t += Jmol._getGrabberOptions(this);
			if (Jmol._debugAlert && !Jmol._document)
				alert(t);
			this._code = Jmol._documentWrite(t);
		};

		proto._newCanvas = function(doReplace) {
			if (this._is2D)
				this._createCanvas2d(doReplace);
			else
				this._GLmol.create();
		};

//////// swingjs.api.HTML5Applet interface    
    proto._getHtml5Canvas = function() { return this._canvas }; 
    proto._getWidth = function() { return this._canvas.width }; 
    proto._getHeight = function() { return this._canvas.height };
    proto._getContentLayer = function() { return Jmol.$(this, "contentLayer")[0] };
    proto._repaintNow = function() { Jmol.repaint(this, false) }; 
////////


		proto._createCanvas2d = function(doReplace) {
			var container = Jmol.$(this, "appletdiv");
			//if (doReplace) {
      
			try {
			container[0].removeChild(this._canvas);
			if (this._canvas.frontLayer)
				container[0].removeChild(this._canvas.frontLayer);
			if (this._canvas.rearLayer)
				container[0].removeChild(this._canvas.rearLayer);
			if (this._canvas.contentLayer)
				container[0].removeChild(this._canvas.contentLayer);
			Jmol._jsUnsetMouse(this._mouseInterface);
			} catch (e) {}
			//}
			var w = Math.round(container.width());
			var h = Math.round(container.height());
			var canvas = document.createElement( 'canvas' );
			canvas.applet = this;
			this._canvas = canvas;
			canvas.style.width = "100%";
			canvas.style.height = "100%";
			canvas.width = w;
			canvas.height = h; // w and h used in setScreenDimension
			canvas.id = this._id + "_canvas2d";
			container.append(canvas);
			Jmol._$(canvas.id).css({"z-index":Jmol._getZ(this, "main")});
			if (this._isLayered){
				var img = document.createElement("div");
				canvas.contentLayer = img;
				img.id = this._id + "_contentLayer";
				container.append(img);
				Jmol._$(img.id).css({zIndex:Jmol._getZ(this, "image"),position:"absolute",left:"0px",top:"0px",
        width:(this._isSwing ? w : 0) + "px", height:(this._isSwing ? h : 0) +"px", overflow:"hidden"});
        if (this._isSwing) {
        	var d = document.createElement("div");
          d.id = this._id + "_swingdiv";
        	Jmol._$(this._id + "_appletinfotablediv").append(d);
				  Jmol._$(d.id).css({zIndex:Jmol._getZ(this, "rear"),position:"absolute",left:"0px",top:"0px", width:w +"px", height:h+"px", overflow:"hidden"});
  				this._mouseInterface = canvas.contentLayer;
          canvas.contentLayer.applet = this;
        } else {
  				this._mouseInterface = this._getLayer("front", container, w, h, false);
        }
				//this._getLayer("rear", container, w, h, true);
				//Jmol._$(canvas.id).css({background:"rgb(0,0,0,0.001)", "z-index":Jmol._z.main}); 
			} else {
				this._mouseInterface = canvas;
			}
			Jmol._jsSetMouse(this._mouseInterface);
		}
    
    proto._getLayer = function(name, container, w, h, isOpaque) {
  		var c = document.createElement("canvas");
			this._canvas[name + "Layer"] = c;
			c.style.width = "100%";
			c.style.height = "100%";
			c.id = this._id + "_" + name + "Layer";
			c.width = w;
			c.height = h; // w and h used in setScreenDimension
			container.append(c);
			c.applet = this;
			Jmol._$(c.id).css({background:(isOpaque ? "rgb(0,0,0,1)" : "rgb(0,0,0,0.001)"), "z-index": Jmol._getZ(this,name),position:"absolute",left:"0px",top:"0px",overflow:"hidden"});
			return c;	
    }
    
    
		proto._setupJS = function() {
			window["j2s.lib"] = {
				base : this._j2sPath + "/",
				alias : ".",
				console : this._console,
				monitorZIndex : Jmol._getZ(this, "monitorZIndex")
			};
			var isFirst = (__execStack.length == 0);
			if (isFirst)
				Jmol._addExec([this, __loadClazz, null, "loadClazz"]);
      this._addCoreFiles();
			Jmol._addExec([this, this.__startAppletJS, null, "start applet"])
			this._isSigned = true; // access all files via URL hook
			this._ready = false; 
			this._applet = null;
			this._canScript = function(script) {return true;};
			this._savedOrientations = [];
			__execTimer && clearTimeout(__execTimer);
			__execTimer = setTimeout(__nextExecution, __execDelayMS);
		};

		proto.__startAppletJS = function(applet) {
			if (Jmol._version.indexOf("$Date: ") == 0)
				Jmol._version = (Jmol._version.substring(7) + " -").split(" -")[0] + " (JSmol/j2s)"
			var viewerOptions = Clazz._4Name("java.util.Hashtable").newInstance();
			Jmol._setAppletParams(applet._availableParams, viewerOptions, applet.__Info, true);
			viewerOptions.put("appletReadyCallback","Jmol._readyCallback");
			viewerOptions.put("applet", true);
			viewerOptions.put("name", applet._id);// + "_object");
			viewerOptions.put("syncId", Jmol._syncId);
			if (Jmol._isAsync)
				viewerOptions.put("async", true);
			if (applet._color) 
				viewerOptions.put("bgcolor", applet._color);
			if (applet._startupScript)
				viewerOptions.put("script", applet._startupScript)
			if (Jmol._syncedApplets.length)
				viewerOptions.put("synccallback", "Jmol._mySyncCallback");
			viewerOptions.put("signedApplet", "true");
			viewerOptions.put("platform", applet._platform);
			if (applet._is2D)
				viewerOptions.put("display",applet._id + "_canvas2d");

			// viewerOptions.put("repaintManager", "J.render");
			viewerOptions.put("documentBase", document.location.href);
			var codePath = applet._j2sPath + "/";
      
			if (codePath.indexOf("://") < 0) {
				var base = document.location.href.split("#")[0].split("?")[0].split("/");
				if (codePath.indexOf("/") == 0)
					base = [base[0], codePath.substring(1)];
				else
					base[base.length - 1] = codePath;
				codePath = base.join("/");
			}
			viewerOptions.put("codePath", codePath);
			Jmol._registerApplet(applet._id, applet);
			try {
				applet._newApplet(viewerOptions);
			} catch (e) {
				System.out.println((Jmol._isAsync ? "normal async abort from " : "") + e);
				return;
			}
      
			applet._jsSetScreenDimensions();
			__nextExecution();
		};

    if (!proto._restoreState)
	   	proto._restoreState = function(clazzName, state) {
        // applet-dependent
		  }
	
		proto._jsSetScreenDimensions = function() {
				if (!this._appletPanel)return
				// strangely, if CTRL+/CTRL- are used repeatedly, then the
				// applet div can be not the same size as the canvas if there
				// is a border in place.
				var d = Jmol._getElement(this, (this._is2D ? "canvas2d" : "canvas"));
				this._appletPanel.setScreenDimension(d.width, d.height);
		};

		proto._show = function(tf) {
			Jmol.$setVisible(Jmol.$(this,"appletdiv"), tf);
			if (tf)
				Jmol.repaint(this, true);
		};

		proto._canScript = function(script) {return true};
		proto.equals = function(a) { return this == a };
		proto.clone = function() { return this };
		proto.hashCode = function() { return parseInt(this._uniqueId) };  


		proto._processGesture = function(touches) {
			return this._appletPanel.processTwoPointGesture(touches);
		}

		proto._processEvent = function(type, xym) {
			this._appletPanel.processMouseEvent(type,xym[0],xym[1],xym[2],System.currentTimeMillis());
		}

		proto._resize = function() {
			var s = "__resizeTimeout_" + this._id;
			// only at end
			if (Jmol[s])
				clearTimeout(Jmol[s]);
			var me = this;
			Jmol[s] = setTimeout(function() {Jmol.repaint(me, true);Jmol[s]=null}, 100);
		}

		return proto;
	};

	Jmol.repaint = function(applet, asNewThread) {
    // JmolObjectInterface 
		// asNewThread: true is from RepaintManager.repaintNow()
		// false is from Repaintmanager.requestRepaintAndWait()
		// called from apiPlatform Display.repaint()

		//alert("_repaint " + Clazz.getStackTrace())
		if (!applet || !applet._appletPanel)return;

		// asNewThread = false;
		var container = Jmol.$(applet, "appletdiv");
		var w = Math.round(container.width());
		var h = Math.round(container.height());
		if (applet._is2D && (applet._canvas.width != w || applet._canvas.height != h)) {
			applet._newCanvas(true);
			applet._appletPanel.setDisplay(applet._canvas);
		}
		applet._appletPanel.setScreenDimension(w, h);
    var f = function(){
      if (applet._appletPanel.paint)
        applet._appletPanel.paint(null);
      else
        applet._appletPanel.update(null)
    };
		if (asNewThread) {
			requestAnimationFrame(f); // requestAnimationFrame or (MSIE 9) setTimeout
		} else {
      f();
		}
		// System.out.println(applet._appletPanel.getFullName())
	}

  /**
   * loadImage is called for asynchronous image loading.   
   * If bytes are not null, they are from a ZIP file. They are processed sychronously
   * here using an image data URI. Can all browsers handle MB of data in data URI?
   *
   */        
	Jmol.loadImage = function(platform, echoName, path, bytes, fOnload, image) {
    // JmolObjectInterface  
		var id = "echo_" + echoName + path + (bytes ? "_" + bytes.length : "");
		var canvas = Jmol.getHiddenCanvas(platform.vwr.html5Applet, id, 0, 0, false, true);
//    System.out.println(["JSmol.js loadImage ",id,path,canvas,image])
    if (canvas == null) { 
  		if (image == null) {
  			image = new Image();
        if (bytes == null) {
          image.onload = function() {Jmol.loadImage(platform, echoName, path, null, fOnload, image)};
    			image.src = path;
          return null;
        }
        System.out.println("Jsmol.js Jmol.loadImage using data URI for " + id) 
        image.src = (typeof bytes == "string" ? bytes : 
          "data:" + JU.Rdr.guessMimeTypeForBytes(bytes) + ";base64," + JU.Base64.getBase64(bytes));
      }
  		var width = image.width;
  		var height = image.height;
      if (echoName == "webgl") {
       // will be antialiased
       width /= 2;
       height /= 2; 
      } 
		  canvas = Jmol.getHiddenCanvas(platform.vwr.html5Applet, id, width, height, true, false);
  		canvas.imageWidth = width;
  		canvas.imageHeight = height;
  		canvas.id = id;
  		canvas.image=image;
  		Jmol.setCanvasImage(canvas, width, height);
		// return a null canvas and the error in path if there is a problem
    } else {
      System.out.println("Jsmol.js Jmol.loadImage reading cached image for " + id) 
    }
    return (bytes == null? fOnload(canvas,path) : canvas);
	};

Jmol._canvasCache = {};

	Jmol.getHiddenCanvas = function(applet, id, width, height, forceNew, checkOnly) {
		id = applet._id + "_" + id;
    var d = Jmol._canvasCache[id];
    if (checkOnly)
      return d; 
    if (forceNew || !d || d.width != width || d.height != height) {
      d = document.createElement( 'canvas' );
  			// for some reason both these need to be set, or maybe just d.width?
  		d.width = d.style.width = width;
  		d.height = d.style.height = height;
  		d.id = id;
      Jmol._canvasCache[id] = d;
      //System.out.println("JSmol.js loadImage setting cache" + id + " to " + d)
    }
    
		return d;
   	}

	Jmol.setCanvasImage = function(canvas, width, height) {
    // called from org.jmol.awtjs2d.Platform
		canvas.buf32 = null;
		canvas.width = width;
		canvas.height = height;
		canvas.getContext("2d").drawImage(canvas.image, 0, 0, canvas.image.width, canvas.image.height, 0, 0, width, height);
	};
  
  Jmol.applyFunc = function(f,a) {
    // JmolObjectInterface
    return f(a);
  }
  
})(Jmol);
