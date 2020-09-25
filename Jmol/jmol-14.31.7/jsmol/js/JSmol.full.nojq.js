// JSmoljQueryExt.js
// 9/2/2013 7:43:12 AM BH Opera/Safari fix for binary file reading
// 3/11/2014 6:31:01 AM BH fix for MSIE not working locally

;(function($) {

	function createXHR(isMSIE) {
		try {
			return (isMSIE ? new window.ActiveXObject( "Microsoft.XMLHTTP" ) : new window.XMLHttpRequest());
		} catch( e ) {}
	}

 $.ajaxSettings.xhr = (window.ActiveXObject === undefined ? createXHR :  
	function() {
		return (this.url == document.location || this.url.indexOf("http") == 0 || !this.isLocal) &&  // BH MSIE fix
			/^(get|post|head|put|delete|options)$/i.test( this.type ) &&
			createXHR() || createXHR(1);
	});


// Bind script tag hack transport
		$.ajaxTransport( "+script", function(s) {

	// This transport only deals with cross domain requests
	// BH: No! This is not compatible with Chrome
	if ( true || s.crossDomain ) {

		var script,
			head = document.head || jQuery("head")[0] || document.documentElement;

		return {

			send: function( _, callback ) {
				script = document.createElement("script");
				//script.async = true;

				if ( s.scriptCharset ) {
					script.charset = s.scriptCharset;
				}

				script.src = s.url;

				// Attach handlers for all browsers
				script.onload = script.onreadystatechange = function( _, isAbort ) {

					if ( isAbort || !script.readyState || /loaded|complete/.test( script.readyState ) ) {

						// Handle memory leak in IE
						script.onload = script.onreadystatechange = null;
						// Remove the script
						if ( script.parentNode ) {
							script.parentNode.removeChild( script );
						}

						// Dereference the script
						script = null;

						// Callback if not abort
						if ( !isAbort ) {
							callback( 200, "success" );
						}
					}
				};

				// Circumvent IE6 bugs with base elements (#2709 and #4378) by prepending
				// Use native DOM manipulation to avoid our domManip AJAX trickery
				head.insertBefore( script, head.firstChild );
			},

			abort: function() {
				if ( script ) {
					script.onload( undefined, true );
				}
			}
		};
	}
});
 
	// incorporates jquery.iecors MSIE asynchronous cross-domain request for MSIE < 10

	$.extend( $.support, { iecors: !!window.XDomainRequest });

	if ($.support.iecors) {
		// source: https://github.com/dkastner/jquery.iecors
		// author: Derek Kastner dkastner@gmail.com http://dkastner.github.com    
		$.ajaxTransport(function(s) {
		
			return {
				send: function( headers, complete ) {				
					// Note that xdr is not synchronous.
					// This is only being used in JSmol for transport of java code packages.
					var xdr = new window.XDomainRequest();
					xdr.onload = function() {          
						var headers = { 'Content-Type': xdr.contentType };
						complete(200, 'OK', { text: xdr.responseText }, headers);
					};
					if ( s.xhrFields ) {
						xdr.onerror = s.xhrFields.error;
						xdr.ontimeout = s.xhrFields.timeout;
					}
					xdr.open( s.type, s.url );
					xdr.send( ( s.hasContent && s.data ) || null );
				},
				abort: function() {        
					xdr.abort();
				}
			};
		});

	} else {

	// adds support for synchronous binary file reading

		$.ajaxSetup({
			accepts: { binary: "text/plain; charset=x-user-defined" },
			responseFields: { binary: "response" }
		})


		$.ajaxTransport('binary', function(s) {
		
			var callback;
			return {
				// synchronous or asynchronous binary transfer only
				send: function( headers, complete ) {        
					var xhr = s.xhr();
					console.log("xhr.open binary async=" + s.async + " url=" + s.url);
					xhr.open( s.type, s.url, s.async );					
					var isOK = false;
					try {
						if (xhr.hasOwnProperty("responseType")) {
								xhr.responseType = "arraybuffer";
								isOK = true;
						} 
					} catch(e) {
					  //
					}
					try {
						if (!isOK && xhr.overrideMimeType) {
							xhr.overrideMimeType('text/plain; charset=x-user-defined');
						}
					} catch(e) {
							//
					}
					if ( !s.crossDomain && !headers["X-Requested-With"] ) {
						headers["X-Requested-With"] = "XMLHttpRequest";
					}
					try {
						for (var i in headers )
							xhr.setRequestHeader( i, headers[ i ] );
					} catch(_) {}

					xhr.send( ( s.hasContent && s.data ) || null );

 					// Listener
					callback = function( _, isAbort ) {

					var 
						status = xhr.status,
						statusText = "",
						responseHeaders = xhr.getAllResponseHeaders(),
						responses = {},
						xml;

					try {

						// Firefox throws exceptions when accessing properties
						// of an xhr when a network error occured
						// http://helpful.knobs-dials.com/index.php/Component_returned_failure_code:_0x80040111_(NS_ERROR_NOT_AVAILABLE)
						// Was never called and is aborted or complete
						if ( callback && ( xhr.readyState === 4 ) ) {

							// Only called once
							callback = undefined;

							// When requesting binary data, IE6-9 will throw an exception
							// on any attempt to access responseText (#11426)
							try {
								responses.text = (typeof xhr.responseText === "string" ? xhr.responseText : null);
							} catch( _ ) {
							}
							try {
								responses.binary = xhr.response;
							} catch( _ ) {
							}

							// Firefox throws an exception when accessing
							// statusText for faulty cross-domain requests
							try {
								statusText = xhr.statusText;
							} catch( _ ) {
								// We normalize with Webkit giving an empty statusText
								statusText = "";
							}
							// Filter status for non standard behaviors

							// If the request is local and we have data: assume a success
							// (success with no data won't get notified, that's the best we
							// can do given current implementations)
							if ( !status && s.isLocal && !s.crossDomain ) {
								status = (responses.text ? 200 : 404);
							// IE - #1450: sometimes returns 1223 when it should be 204
							} else if ( status === 1223 ) {
								status = 204;
							}
							complete( status, statusText, responses, responseHeaders );
						}
					} catch( e ) {
						alert(e)
						complete( -1, e );
					}
					};
					
					if ( !s.async ) {
						// if we're in sync mode we fire the callback
						callback();
					} else if ( xhr.readyState === 4 ) {
						// (IE6 & IE7) if it's in cache and has been
						// retrieved directly we need to fire the callback
						setTimeout( callback );
					} else {
						// Add to the list of active xhr callbacks
						xhr.onreadystatechange = callback;
					}
					
				},
				abort: function() {}
			};
		});
	}
})( jQuery );
	 
/*
 * jQuery outside events - v1.1 - 3/16/2010
 * http://benalman.com/projects/jquery-outside-events-plugin/
 * 
 * Copyright (c) 2010 "Cowboy" Ben Alman
 * Dual licensed under the MIT and GPL licenses.
 * http://benalman.com/about/license/
 * 
 * Modified by Bob Hanson for JSmol-specific events and to add parameter reference to actual jQuery event.
 * Used for closing the pop-up menu.
 *   
 */

;(function($,doc,eventList,id){  
	// was 'click dblclick mousemove mousedown mouseup mouseover mouseout change select submit keydown keypress keyup'
	$.map(
		eventList.split(' '),
		function( event_name ) { jq_addOutsideEvent( event_name ); }
	);
	jq_addOutsideEvent( 'focusin',  'focus' + id );
	jq_addOutsideEvent( 'focusout', 'blur' + id );
	function jq_addOutsideEvent( event_name, outside_event_name ) {
		outside_event_name = outside_event_name || event_name + id;
		var elems = $(),
			event_namespaced = event_name + '.' + outside_event_name + '-special-event';
		$.event.special[ outside_event_name ] = {    
			setup: function(){
				elems = elems.add( this );
				if ( elems.length === 1 ) {
					$(doc).bind( event_namespaced, handle_event );
				}
			},
			teardown: function(){
				self.Jmol && Jmol._setMouseOwner(null);
				elems = elems.not( this );
				if ( elems.length === 0 ) {
					$(doc).unbind( event_namespaced );
				}
			},
			add: function( handleObj ) {
				var old_handler = handleObj.handler;
				handleObj.handler = function( event, elem ) {
					event.target = elem;
					old_handler.apply( this, arguments );
				};
			}
		};
		function handle_event( event ) {
			$(elems).each(function(){
				self.Jmol && (outside_event_name.indexOf("mouseup") >= 0 || outside_event_name.indexOf("touchend") >= 0) && Jmol._setMouseOwner(null);
				var elem = $(this);
				if ( this !== event.target && !elem.has(event.target).length ) {
					//BH: adds event to pass that along to our handler as well.
					elem.triggerHandler( outside_event_name, [ event.target, event ] );
				}
			});
		};
	};
})(jQuery,document,"click mousemove mouseup touchmove touchend", "outjsmol");
// JSmolCore.js -- Jmol core capability 

// allows Jmol applets to be created on a page with more flexibility and extendability
// provides an object-oriented interface for JSpecView and syncing of Jmol/JSpecView

// see JSmolApi.js for public user-interface. All these are private functions


// BH 4/30/2019 fixes write xyz "https://...."
// BH 7/6/2017 2:22:07 AM adds BZ2 as binary
// BH 4/13/2017 11:23:05 PM adds "binary pmesh" .pmb extension
// BH 1/14/2017 6:28:07 AM adds &debugCore
// BH 10/20/2016 10:00:43 AM JmolTracker.php
// BH 9/19/2016 8:22:48 AM drag-drop broken for https (imageDrop.htm)
// BH 9/18/2016 btoa() does not work with UTF-8 data (set language es;write menu t.mnu)
// BH 8/26/2016 11:29:48 AM RCSB ligand 
// BH 8/26/2016 11:29:48 AM generic fixProtocol for .gov/ to https
// BH 8/26/2016 6:56:31 AM chemapps.stolaf.edu exclusively https
// BH 8/25/2016 9:47:26 PM bug fix: NCI/CADD now requires "get3d=true" not "get3d=True"
// BH 7/31/2016 6:42:06 AM changes mouse wheel from -1 to 507
// BH 6/27/2016 1:16:57 AM adds Jmol.playAudio(fname)
// BH 4/26/2016 4:16:07 PM adds Jmol.loadFileFromDialog(applet)
// BH 4/21/2016 9:25:39 AM adds [URL] button to file load option
// BH 4/20/2016 2:44:50 PM fixes async load problem with Safari
// BH 4/18/2016 10:25:08 PM adds preliminary =xxxx.mmtf reader
// BH 4/13/2016 9:12:31 PM  url.indexOf("http://www.rcsb.org/pdb/files/") == 0 && url.indexOf("/ligand/") < 0 ? 
// BH 4/11/2016 5:34:16 PM adds direct conversion to http://files.rcsb.org/view from http://www.rcsb.org/pdb/files/1xpb.pdb
// BH 4/3/2016 9:10:31 PM adding materialsproject.org for AJAX.
// BH 3/23/2016 1:21:39 PM adding http://files.rcsb.org/view/%FILE.pdb as default RCSB site for "="

// BH 2/29/2016 3:59:55 PM broken cursor_wait image path when Info.j2sPath is not "j2s"
// BH 2/19/2016 10:32:18 AM typo fixed for makeLiveImage
// BH 2/14/2016 12:31:02 PM fixed local reader not disappearing after script call
// BH 2/14/2016 12:30:41 PM Info.appletLoadingImage: "j2s/img/JSmol_spinner.gif", 
   // can be set to "none" or some other image; see Jmol._hideLoadingSpinner(applet)
   // implemented only for JSmolApplet, not others
// BH 2/14/2016 12:27:09 PM Jmol.setCursor 
// BH 2/14/2016 6:48:33 AM _setCursor() and cursor_wait   http://ajaxload.info/
// BH 1/15/2016 4:23:14 PM adding Info.makeLiveImage
// BH 12/30/2015 8:18:42 PM adding AMS call to database list; allowing for ?ALLOWSORIGIN? to override settings here
// BH 12/17/2015 4:43:05 PM adding Jmol._requestRepaint to allow for MSIE9 not having requestAnimationFrame
// BH 12/16/2015 3:01:06 PM adding $.ajaxSetup({ mimeType: "text/plain" });
// BH 12/14/2015 6:42:03 PM adding check for MS Edge browser, which does not support dataURI
// BH 12/2/2015 1:18:15 PM adding .dcd as binary file type
// BH 12/1/2015 10:05:55 AM loading identical HTML5 page after Java page causes bad NPObject error 
// BH 10/26/2015 12:47:16 PM adding two rcsb sites for direct access
// BH 10/23/2015 9:20:39 PM minor coding adjustment
// BH 10/13/2015 9:32:08 PM adding Jmol.__$ as jquery object used 
// BH 15/09/2015 18:06:39 fixing mouse check for swingjs-ui since SVG element className is not a string 
// BH 8/12/2015 11:43:52 PM adding isHttps2Http forcing call to server proxy
// BH 8/9/2015 6:33:33 PM correcting bug in load ASYNC for x-domain access
// BH 7/7/2015 1:42:31 PM Jmol._persistentMenu
// BH 6/29/2015 10:14:47 AM adds Jmol.$getSize(obj)
// BH 5/30/2015 9:33:12 AM adds class swingjs-ui to ignore 
// BH 5/9/2015 3:38:52 PM adds data-ignoreMouse attribute for JTextField
// BH 3/30/2015 9:46:53 PM adds JSAppletPanel for ready callback
// BH 12/6/2014 3:32:54 PM Jmol.setAppletCss() broken
// BH 9/13/2014 2:15:51 PM embedded JSME loads from SEARCH when Jmol should 
// BH 8/14/2014 2:52:38 PM drag-drop cache should not be cleared if SPT file is dropped
// BH 8/5/2014 6:39:54 AM unnecessary messages about binary for PDB finally removed
// BH 8/4/2014 5:30:00 AM automatically switch to no document after page loading
// BH 8/2/2014 5:22:40 PM drag-drop broken in JSmol/HTML5 
// BH 7/23/2014 5:34:08 PM setting a parameter such as readyFunction to null stops file loading
// BH 7/3/2014 12:30:28 AM lost drag-drop of models
// BH 7/2/2014 4:47:55 AM adding pdbe.org to direct database calls
// BH 5/30/2014 7:20:07 AM better dragging for console and menu
// BH 4/27/2014 6:31:52 PM allows _USE=SIGNED HTML5 as well as _USE=JAVA HTML5
// BH 3/8/2014 5:50:51 PM adds support for dataURI download in FF and Chrome
// BH 3/8/2014 8:43:10 AM moves PubChem access to https
// BH 3/4/2014 8:40:15 PM adds Jmol.Cache for JSV/Jmol sharing files
// BH 2/10/2014 10:07:14 AM added Info.z and Info.zIndexBase
// BH 2/9/2014 9:56:06 PM updated JSmolCore.js with option to extend Viewer with code PRIOR to loading Viewer classes
// BH 2/6/2014 8:46:25 AM disabled Jmol._tracker for localhost and 127.x.x.x 
// BH 1/29/2014 8:02:23 AM Jmol.View and Info.viewSet
// BH 1/21/2014 12:06:59 PM adding Jmol.Info.cacheFiles (applet, true/false) and applet._cacheFiles and Jmol._fileCache
// BH 1/13/2014 2:12:38 PM adding "http://www.nmrdb.org/tools/jmol/predict.php":"%URL", to _DirectDatabaseCalls
// BH 12/21/2013 6:38:35 PM applet sync broken
// BH 12/6/2013 6:18:32 PM cover.htm and coverImage fix
// BH 12/4/2013 7:44:26 PM fix for JME independent search box
// BH 12/3/2013 6:30:08 AM fix for ready function returning Boolean instead of boolean in HTML5 version
// BH 11/30/2013 10:31:37 AM added type:"GET" for jQuery.ajax() requests instead of using defaults
// BH 11/30/2013 10:31:37 AM added cache:true for jQuery.ajax() requests; can override with cache:"NO", not cache:false
// BH 11/28/2013 11:09:27 AM added Jmol._alertNoBinary:true
// BH 11/26/2013 8:19:55 PM fix !xxxx search commmand entry and stop MSIE from duplicating command
// BH 11/25/2013 7:38:31 AM adds Jmol._tracker: option for GoogleAnalytics tracking
// BH 11/25/2013 7:39:03 AM adds URL options _J2S=  _JAR=  _USE=
// BH 11/23/2013 10:51:37 PM  adds JNLP support for local applet
// BH 11/2/2013 12:05:11 PM JSmolJSME fixes; https access fixed
// BH 10/31/2013 7:50:06 PM Jmol.Dialog as SwingController; Jmol._mouseOwner added
// BH 10/19/2013 7:05:04 AM adding Jmol._ajaxCall for Error Contacting Server; database POST method enabled
// BH 10/17/2013 1:40:51 PM  adding javajs/swing and Jmol.Dialog
// BH 9/30/2013 6:42:24 PM: pdb.gz switch  pdb should only be for www.rcsb.org
// BH 9/17/2013 10:17:51 AM: asynchronous file reading and saving
// BH 8/16/2013 12:02:20 PM: JSmoljQueryExt.js pulled out
// BH 8/16/2013 12:02:20 PM: Jmol._touching used properly

// BH 3/22/2013 5:53:02 PM: Adds noscript option, JSmol.min.core.js
// BH 1/17/2013 5:20:44 PM: Fixed problem with console not getting initial position if no first click
// 1/13/2013 BH: Fixed MSIE not-reading-local-files problem.
// 11/28/2012 BH: Fixed MacOS Safari binary ArrayBuffer problem
// 11/21/2012 BH: restructuring of files as JS... instead of J...
// 11/20/2012 BH: MSIE9 cannot do a synchronous file load cross-domain. See Jmol._getFileData
// 11/4/2012 BH: RCSB REST format change "<structureId>" to "<dimStructure.structureId>"
// 9/13/2012 BH: JmolCore.js changes for JSmol doAjax() method -- _3ata()
// 6/12/2012 BH: JmolApi.js: adds Jmol.setInfo(applet, info, isShown) -- third parameter optional 
// 6/12/2012 BH: JmolApi.js: adds Jmol.getInfo(applet) 
// 6/12/2012 BH: JmolApplet.js: Fixes for MSIE 8
// 6/5/2012  BH: fixes problem with Jmol "javascript" command not working and getPropertyAsArray not working
// 6/4/2012  BH: corrects problem with MSIE requiring mouse-hover to activate applet
// 5/31/2012 BH: added JSpecView interface and api -- see JmolJSV.js
//               also changed "jmolJarPath" to just "jarPath"
//               jmolJarFile->jarFile, jmolIsSigned->isSigned, jmolReadyFunction->readyFunction
//               also corrects a double-loading issue
// 5/14/2012 BH: added AJAX queue for ChemDoodle option with multiple canvases 
// 8/12/2012 BH: adds support for MSIE xdr cross-domain request (jQuery.iecors.js)

	// BH 4/25 -- added text option. setAppletCss(null, "style=\"xxxx\"")
	// note that since you must add the style keyword, this can be used to add any attribute to these tags, not just css. 

// required/optional libraries (preferably in the following order):

//    jquery/jquery.js     -- at least jQuery.1.9
//    js/JSmoljQueryext.js -- required for binary file transfer; otherwise standard jQuery should be OK
//    js/JSmolCore.js      -- required
//    js/j2sjmol.js        -- required
//    js/JSmol.js          -- required
//    js/JSmolApplet.js    -- required; internal functions for _Applet and _Image; must be after JSmolCore
//    js/JSmolControls.js  -- optional; internal functions for buttons, links, menus, etc.; must be after JSmolCore
//    js/JSmolConsole.js   -- optional; for the pop-up console
//    js/JSmolApi.js       -- required; all user functions; must be after JSmolCore
//    js/JSmolTHREE.js     -- optional; WebGL library required for JSmolGLmol.js
//    js/JSmolGLmol.js     -- optional; WebGL version of JSmol.
//    js/JSmolJME.js       -- optional; JSME (2D editor)
//    jsme/jsme/jsme.nocache.js   --  required for JSME 
//    js/JSmolMenu.js      -- optional; required for menuing in JSV
//    js/JSmolJSV.js       -- optional; for creating and interacting with a JSpecView applet 

// most of these will be loaded automatically, and for most installations, all you need is JSmol.min.js


// Allows Jmol-like objects to be displayed on Java-challenged (iPad/iPhone)
// or applet-challenged (Android/iPhone) platforms, with automatic switching to 

// For your installation, you should consider putting JmolData.jar and jsmol.php 
// on your own server. Nothing more than these two files is needed on the server, and this 
// allows more options for MSIE and Chrome when working with cross-domain files (such as RCSB or pubChem) 

// The NCI and RCSB databases are accessed via direct AJAX if available (xhr2/xdr).


if(typeof(jQuery)=="undefined") alert ("Note -- JSmoljQuery is required for JSmol, but it's not defined.")

// An example of how to extend Jmol with code PRIOR to JSmolCore.js or JSmol.min.js follows:
//
// 
//	Jmol = {
//  	z:3000,
//		extend: function(what, obj) {if (what == "viewer") { obj._testing = true } }
//	}

self.Jmol || (Jmol = {});

if (!Jmol._version)
Jmol = (function(document) {
	var z=Jmol.z || 9000;
	var getZOrders = function(z) {
		return {
			rear:z++,
			header:z++,
			main:z++,
			image:z++,
			front:z++,
			fileOpener:z++,
			coverImage:z++,
			dialog:z++, // could be several of these, JSV only
			menu:z+90000, // way front
			console:z+91000, // even more front
      consoleImage:z+91001, // bit more front; increments
			monitorZIndex:z+99999 // way way front
		}
	};
	var j = {
		_version: "$Date: 2019-06-08 00:17:46 -0500 (Sat, 08 Jun 2019) $", // svn.keywords:lastUpdated
		_alertNoBinary: true,
		// this url is used to Google Analytics tracking of Jmol use. You may remove it or modify it if you wish. 
		_allowedJmolSize: [25, 2048, 300],   // min, max, default (pixels)
		/*  By setting the Jmol.allowedJmolSize[] variable in the webpage
				before calling Jmol.getApplet(), limits for applet size can be overriden.
				2048 standard for GeoWall (http://geowall.geo.lsa.umich.edu/home.html)
		*/
		_appletCssClass: "",
		_appletCssText: "",
		_fileCache: null, // enabled by Jmol.setFileCaching(applet, true/false)
		_jarFile: null,  // can be set in URL using _JAR=
		_j2sPath: null,  // can be set in URL using _J2S=
		_use: null,      // can be set in URL using _USE=
		_j2sLoadMonitorOpacity: 90, // initial opacity for j2s load monitor message
		_applets: {},
		_asynchronous: true,
		_ajaxQueue: [],
    _persistentMenu: false,
		_getZOrders: getZOrders,
		_z:getZOrders(z),
		_debugCode: true,  // set false in process of minimization
    _debugCore: false, // set true using URL &debugCore
		db: {
			_databasePrefixes: "$=:",
			_fileLoadScript: ";if (_loadScript = '' && defaultLoadScript == '' && _filetype == 'Pdb') { select protein or nucleic;cartoons Only;color structure; select * };",
			_nciLoadScript: ";n = ({molecule=1}.length < {molecule=2}.length ? 2 : 1); select molecule=n;display selected;center selected;",
			_pubChemLoadScript: "",
			_DirectDatabaseCalls:{
				// these sites are known to implement access-control-allow-origin *
        // null here means no conversion necessary 
				"cactus.nci.nih.gov": null,
        ".x3dna.org": null,
        "rruff.geo.arizona.edu": null, 
        ".rcsb.org": null, 
				"ftp.wwpdb.org": null,
				"pdbe.org": null, 
				"materialsproject.org": null, 
				".ebi.ac.uk": null, 
				"pubchem.ncbi.nlm.nih.gov":null,
				"www.nmrdb.org/tools/jmol/predict.php":null,
				"$": "https://cactus.nci.nih.gov/chemical/structure/%FILENCI/file?format=sdf&get3d=True",
				"$$": "https://cactus.nci.nih.gov/chemical/structure/%FILENCI/file?format=sdf",
				"=": "https://files.rcsb.org/download/%FILE.pdb",
				"*": "https://www.ebi.ac.uk/pdbe/entry-files/download/%FILE.cif",
				"==": "https://files.rcsb.org/ligands/download/%FILE.cif",
				":": "https://pubchem.ncbi.nlm.nih.gov/rest/pug/compound/%FILE/SDF?record_type=3d"
			},
			_restQueryUrl: "http://www.rcsb.org/pdb/rest/search",
			_restQueryXml: "<orgPdbQuery><queryType>org.pdb.query.simple.AdvancedKeywordQuery</queryType><description>Text Search</description><keywords>QUERY</keywords></orgPdbQuery>",
			_restReportUrl: "http://www.pdb.org/pdb/rest/customReport?pdbids=IDLIST&customReportColumns=structureId,structureTitle"
		},
		_debugAlert: false,
		_document: document,
		_isXHTML: false,
		_lastAppletID: null,
		_mousePageX: null,
		_mouseOwner: null,
		_serverUrl: "https://your.server.here/jsmol.php",
		_syncId: ("" + Math.random()).substring(3),
		_touching: false,
		_XhtmlElement: null,
		_XhtmlAppendChild: false
	}
	
	var ref = document.location.href.toLowerCase();
  j._debugCore = (ref.indexOf("j2sdebugcore") >= 0);
	j._httpProto = (ref.indexOf("https") == 0 ? "https://" : "http://"); 
	j._isFile = (ref.indexOf("file:") == 0);
	if (j._isFile) // ensure no attempt to read XML in local request:
	  $.ajaxSetup({ mimeType: "text/plain" });
	j._ajaxTestSite = j._httpProto + "google.com";
	var isLocal = (j._isFile || ref.indexOf("http://localhost") == 0 || ref.indexOf("http://127.") == 0);
	j._tracker = (!isLocal && 'https://chemapps.stolaf.edu/jmol/JmolTracker.php?id=UA-45940799-1');
	
	j._isChrome = (navigator.userAgent.toLowerCase().indexOf("chrome") >= 0);
	j._isSafari = (!j._isChrome && navigator.userAgent.toLowerCase().indexOf("safari") >= 0);
	j._isMsie = (window.ActiveXObject !== undefined);
  j._isEdge = (navigator.userAgent.indexOf("Edge/") >= 0);
	j._useDataURI = !j._isSafari && !j._isMsie && !j._isEdge; // safari may be OK here -- untested

  window.requestAnimationFrame || (window.requestAnimationFrame = window.setTimeout);
	for(var i in Jmol) j[i] = Jmol[i]; // allows pre-definition
	return j;
})(document, Jmol);


(function (Jmol, $) {

  Jmol.__$ = $; // local jQuery object -- important if any other module needs to access it (JSmolMenu, for example)

// this library is organized into the following sections:

	// jQuery interface 
	// protected variables
	// feature detection
	// AJAX-related core functionality
	// applet start-up functionality
	// misc core functionality
	// mouse events


	////////////////////// jQuery interface ///////////////////////

	// hooks to jQuery -- if you have a different AJAX tool, feel free to adapt.
	// There should be no other references to jQuery in all the JSmol libraries.

	// automatically switch to returning HTML after the page is loaded
	$(document).ready(function(){ Jmol._document = null });

	Jmol.$ = function(objectOrId, subdiv) {
		// if a subdiv, then return $("#objectOrId._id_subdiv") 
		// or if no subdiv, then just $(objectOrId)
		if (objectOrId == null)alert (subdiv + arguments.callee.caller.toString());
			return $(subdiv ? "#" + objectOrId._id + "_" + subdiv : objectOrId);
	} 

	Jmol._$ = function(id) {
		// either the object or $("#" + id)
		return (typeof id == "string" ? $("#" + id) : id);
	}

	/// special functions:

	Jmol.$ajax = function(info) {
		Jmol._ajaxCall = info.url;
		info.cache = (info.cache != "NO");
    info.url = Jmol._fixProtocol(info.url);
		// don't let jQuery add $_=... to URL unless we 
		// use cache:"NO"; other packages might use $.ajaxSetup() to set this to cache:false
		return $.ajax(info);
	}

  Jmol._fixProtocol = function(url) {
    if (url.indexOf("get3d=True") >= 0)
      url = url.replace(/get3d\=True/, "get3d=true"); // NCI/CADD change 08/2016
  	return (    
    url.indexOf("http://www.rcsb.org/pdb/files/") == 0 && url.indexOf("/ligand/") < 0 ? 
      "http://files.rcsb.org/view/" + url.substring(30).replace(/\.gz/,"")    
    : url.indexOf("http://") == 0 && (
      Jmol._httpProto == "https://"
      || url.indexOf(".gov/") > 0 
      || url.indexOf("http://www.materialsproject") == 0) 
      ? "https" + url.substring(4) : url);
  }
  
	Jmol._getNCIInfo = function(identifier, what, fCallback) {
		return Jmol._getFileData("https://cactus.nci.nih.gov/chemical/structure/"+identifier +"/" + (what == "name" ? "names" : what));
	}
	
	Jmol.$appEvent = function(app, subdiv, evt, f) {
		var o = Jmol.$(app, subdiv); 
		o.off(evt) && f && o.on(evt, f);
	}   

	Jmol.$resize = function (f) {
		return $(window).resize(f);
	}

	//// full identifier expected (could be "body", for example):

	Jmol.$after = function (what, s) {
		return $(what).after(s);
	}

	Jmol.$append = function (what, s) {
		return $(what).append(s);
	}

	Jmol.$bind = function(what, list, f) {
		return (f ? $(what).bind(list, f) : $(what).unbind(list));
	}

	Jmol.$closest = function(what, d) {
		return $(what).closest(d);
	}
	
	Jmol.$get = function(what, i) {
	return $(what).get(i);
	}
 
	// element id expected
			 
	Jmol.$documentOff = function(evt, id) {
		return $(document).off(evt, "#" + id);
	}

	Jmol.$documentOn = function(evt, id, f) {
		return $(document).on(evt, "#" + id, f);
	}

	Jmol.$getAncestorDiv = function(id, className) {
		return $("div." + className + ":has(#" + id + ")")[0];
	}

	Jmol.$supportsIECrossDomainScripting = function() {
		return $.support.iecors;
	}

	//// element id or jQuery object expected:

	Jmol.$attr = function (id, a, val) {
		return Jmol._$(id).attr(a, val);
	}

	Jmol.$css = function(id, style) {
		return Jmol._$(id).css(style);
	}
	 
	Jmol.$find = function(id, d) {
		return Jmol._$(id).find(d);
	}
	
	Jmol.$focus = function(id) {
		return Jmol._$(id).focus();
	}

	Jmol.$html = function(id, html) {
		return Jmol._$(id).html(html);
	}
	 
	Jmol.$offset = function(id) {
		return Jmol._$(id).offset();
	}

	Jmol.$windowOn = function(evt, f) {
		return $(window).on(evt, f);
	}

	Jmol.$prop = function(id, p, val) {
		var o = Jmol._$(id);
		return (arguments.length == 3 ? o.prop(p, val) : o.prop(p));
	}

	Jmol.$remove = function(id) {
		return Jmol._$(id).remove();
	}

	Jmol.$scrollTo = function (id, n) {
		var o = Jmol._$(id);
		return o.scrollTop(n < 0 ? o[0].scrollHeight : n);
	}

	Jmol.$setEnabled = function(id, b) {
		return Jmol._$(id).attr("disabled", b ? null : "disabled");  
	}

  Jmol.$getSize = function(id) {
		var o = Jmol._$(id);
    return [ o.width(), o.height() ]
  }
  
	Jmol.$setSize = function(id, w, h) {
		return Jmol._$(id).width(w).height(h);
	}

  Jmol.$is = function(id, test) { // e.g. :visible
    return Jmol._$(id).is(test);
  }
  
	Jmol.$setVisible = function(id, b) {
		var o = Jmol._$(id);
		return (b ? o.show() : o.hide());  
	}

	Jmol.$submit = function(id) {
		return Jmol._$(id).submit();
	}

	Jmol.$val = function (id, v) {
		var o = Jmol._$(id);
		return (arguments.length == 1 ? o.val() : o.val(v));
	}

	////////////// protected variables ///////////


	Jmol._clearVars = function() {
		// only on page closing -- appears to improve garbage collection

		delete jQuery;
		delete $;
		delete Jmol;
		delete SwingController;
		delete J;
		delete JM;
		delete JS;
		delete JSV;
		delete JU;
		delete JV;
		delete java;
		delete javajs;
		delete Clazz;
		delete c$; // used in p0p; could be gotten rid of
	}

	////////////// feature detection ///////////////

	Jmol.featureDetection = (function(document, window) {

		var features = {};
		features.ua = navigator.userAgent.toLowerCase()

		features.os = (function(){
			var osList = ["linux","unix","mac","win"]
			var i = osList.length;

			while (i--){
				if (features.ua.indexOf(osList[i])!=-1) return osList[i]
			}
			return "unknown";
		})();

		features.browser = function(){
			var ua = features.ua;
			var browserList = ["konqueror","webkit","omniweb","opera","webtv","icab","msie","mozilla"];
			for (var i = 0; i < browserList.length; i++)
			if (ua.indexOf(browserList[i])>=0) 
				return browserList[i];
			return "unknown";
		}
		features.browserName = features.browser();
		features.browserVersion= parseFloat(features.ua.substring(features.ua.indexOf(features.browserName)+features.browserName.length+1));
		features.supportsXhr2 = function() {return ($.support.cors || $.support.iecors)}
		features.allowDestroy = (features.browserName != "msie");
		features.allowHTML5 = (features.browserName != "msie" || navigator.appVersion.indexOf("MSIE 8") < 0);
		features.getDefaultLanguage = function() {
			return navigator.language || navigator.userLanguage || "en-US";
		};

		features._webGLtest = 0;

		features.supportsWebGL = function() {
		if (!Jmol.featureDetection._webGLtest) { 
			var canvas;
			Jmol.featureDetection._webGLtest = ( 
				window.WebGLRenderingContext 
					&& ((canvas = document.createElement("canvas")).getContext("webgl") 
				|| canvas.getContext("experimental-webgl")) ? 1 : -1);
		}
		return (Jmol.featureDetection._webGLtest > 0);
	};

	features.supportsLocalization = function() {
		//<meta charset="utf-8">                                     
		var metas = document.getElementsByTagName('meta'); 
		for (var i= metas.length; --i >= 0;) 
			if (metas[i].outerHTML.toLowerCase().indexOf("utf-8") >= 0) return true;
		return false;
		};

	features.supportsJava = function() {
		if (!Jmol.featureDetection._javaEnabled) {
			if (Jmol._isMsie) {
				if (!navigator.javaEnabled()) {
					Jmol.featureDetection._javaEnabled = -1;
				} else {
					//more likely -- would take huge testing
					Jmol.featureDetection._javaEnabled = 1;
				}
			} else {
				Jmol.featureDetection._javaEnabled = (navigator.javaEnabled() && (!navigator.mimeTypes || navigator.mimeTypes["application/x-java-applet"]) ? 1 : -1);
			}
		}
		return (Jmol.featureDetection._javaEnabled > 0);
	};

	features.compliantBrowser = function() {
		var a = !!document.getElementById;
		var os = features.os;
		// known exceptions (old browsers):
		if (features.browserName == "opera" && features.browserVersion <= 7.54 && os == "mac"
			|| features.browserName == "webkit" && features.browserVersion < 125.12
			|| features.browserName == "msie" && os == "mac"
			|| features.browserName == "konqueror" && features.browserVersion <= 3.3
		) a = false;
		return a;
	}

	features.isFullyCompliant = function() {
		return features.compliantBrowser() && features.supportsJava();
	}

	features.useIEObject = (features.os == "win" && features.browserName == "msie" && features.browserVersion >= 5.5);
	features.useHtml4Object = (features.browserName == "mozilla" && features.browserVersion >= 5) ||
		(features.browserName == "opera" && features.browserVersion >= 8) ||
		(features.browserName == "webkit"/* && features.browserVersion >= 412.2 && features.browserVersion < 500*/); // 500 is a guess; required for 536.3

	features.hasFileReader = (window.File && window.FileReader);

	return features;

})(document, window);


		////////////// AJAX-related core functionality //////////////

	Jmol._ajax = function(info) {
		if (!info.async) {
			return Jmol.$ajax(info).responseText;
		}
		Jmol._ajaxQueue.push(info)
		if (Jmol._ajaxQueue.length == 1)
			Jmol._ajaxDone()
	}
	Jmol._ajaxDone = function() {
		var info = Jmol._ajaxQueue.shift();
		info && Jmol.$ajax(info);
	}

	Jmol._grabberOptions = [
		["$", "NCI(small molecules)"],
		[":", "PubChem(small molecules)"],
		["=", "RCSB(macromolecules)"],
		["*", "PDBe(macromolecules)"]
	];

	Jmol._getGrabberOptions = function(applet) {
		// feel free to adjust this look to anything you want
		if (Jmol._grabberOptions.length == 0)
			return ""


		var s = '<input type="text" id="ID_query" onfocus="jQuery(this).select()" onkeypress="if(13==event.which){Jmol._applets[\'ID\']._search();return false}" size="32" value="" />';
		var b = '<button id="ID_submit" onclick="Jmol._applets[\'ID\']._search()">Search</button></nobr>'
		if (Jmol._grabberOptions.length == 1) {
			s = '<nobr>' + s + '<span style="display:none">';
			b = '</span>' + b;
		} else {
			s += '<br /><nobr>'
		}
		s += '<select id="ID_select">'
		for (var i = 0; i < Jmol._grabberOptions.length; i++) {
			var opt = Jmol._grabberOptions[i];
			s += '<option value="' + opt[0] + '" ' + (i == 0 ? 'selected' : '') + '>' + opt[1] + '</option>';
		}
		s = (s + '</select>' + b).replace(/ID/g, applet._id);
		return '<br />' + s;
	}

	Jmol._getScriptForDatabase = function(database) {
		return (database == "$" ? Jmol.db._nciLoadScript : database == ":" ? Jmol.db._pubChemLoadScript : Jmol.db._fileLoadScript);
	}

	 //   <dataset><record><structureId>1BLU</structureId><structureTitle>STRUCTURE OF THE 2[4FE-4S] FERREDOXIN FROM CHROMATIUM VINOSUM</structureTitle></record><record><structureId>3EUN</structureId><structureTitle>Crystal structure of the 2[4Fe-4S] C57A ferredoxin variant from allochromatium vinosum</structureTitle></record></dataset>

	Jmol._setInfo = function(applet, database, data) {
		var info = [];
		var header = "";
		if (data.indexOf("ERROR") == 0)
			header = data;
		else
			switch (database) {
			case "=":
				var S = data.split("<dimStructure.structureId>");
				var info = ["<table>"];
				for (var i = 1; i < S.length; i++) {
					info.push("<tr><td valign=top><a href=\"javascript:Jmol.search(" + applet._id + ",'=" + S[i].substring(0, 4) + "')\">" + S[i].substring(0, 4) + "</a></td>");
					info.push("<td>" + S[i].split("Title>")[1].split("</")[0] + "</td></tr>");
				}
				info.push("</table>");
				header = (S.length - 1) + " matches";
				break;      
			case "$": // NCI
			case ":": // pubChem
			break;
			default:
				return;
		}
		applet._infoHeader = header;
		applet._info = info.join("");
		applet._showInfo(true);
	}

	Jmol._loadSuccess = function(a, fSuccess) {
		if (!fSuccess)
			return;
		Jmol._ajaxDone();
		fSuccess(a);
	}

	Jmol._loadError = function(fError){
		Jmol._ajaxDone();
		Jmol.say("Error connecting to server: " + Jmol._ajaxCall);  
		null!=fError&&fError()
	}

	Jmol._isDatabaseCall = function(query) {
		return (Jmol.db._databasePrefixes.indexOf(query.substring(0, 1)) >= 0);
	}

	Jmol._getDirectDatabaseCall = function(query, checkXhr2) {
		if (checkXhr2 && !Jmol.featureDetection.supportsXhr2())
			return query;
		var pt = 2;
		var db = query.substring(0,pt)
		var call = Jmol.db._DirectDatabaseCalls[db] || Jmol.db._DirectDatabaseCalls[db = query.substring(0,--pt)];
		if (call) {
      // one of the special set :, =, $, ==
			if (db == ":") {
        // PubChem
				var ql = query.toLowerCase();
				if (!isNaN(parseInt(query.substring(1)))) {
					query = "cid/" + query.substring(1);
				} else if (ql.indexOf(":smiles:") == 0) {
					call += "?POST?smiles=" + query.substring(8);
					query = "smiles";
				} else if (ql.indexOf(":cid:") == 0) {
					query = "cid/" + query.substring(5);
				} else {
					if (ql.indexOf(":name:") == 0)
						query = query.substring(5);
					else if (ql.indexOf(":cas:") == 0)
						query = query.substring(4);
					query = "name/" + encodeURIComponent(query.substring(pt));
				}
			} else {
				query = encodeURIComponent(query.substring(pt));		
			}
      if (query.indexOf(".mmtf") >= 0) {
        query = "https://mmtf.rcsb.org/v1.0/full/" + query.replace(/\.mmtf/, "");
			} else if (call.indexOf("FILENCI") >= 0) {
				query = query.replace(/\%2F/g, "/");				
				query = call.replace(/\%FILENCI/, query);
			} else {
				query = call.replace(/\%FILE/, query);
			}
		}
		return query;
	}

	Jmol._getRawDataFromServer = function(database,query,fSuccess,fError,asBase64,noScript){
	  // note that this method is now only enabled for "_"
	  // server-side processing of database queries was too slow and only useful for 
	  // the IMAGE option, which has been abandoned.
		var s = 
			"?call=getRawDataFromDatabase&database=" + database + (query.indexOf("?POST?") >= 0 ? "?POST?" : "")
				+ "&query=" + encodeURIComponent(query)
				+ (asBase64 ? "&encoding=base64" : "")
				+ (noScript ? "" : "&script=" + encodeURIComponent(Jmol._getScriptForDatabase(database)));
		return Jmol._contactServer(s, fSuccess, fError);
	}

	Jmol._checkFileName = function(applet, fileName, isRawRet) {
		if (Jmol._isDatabaseCall(fileName)) {
			if (isRawRet)
				Jmol._setQueryTerm(applet, fileName);
			fileName = Jmol._getDirectDatabaseCall(fileName, true);
			if (Jmol._isDatabaseCall(fileName)) {
				// xhr2 not supported (MSIE)
				fileName = Jmol._getDirectDatabaseCall(fileName, false);
				isRawRet && (isRawRet[0] = true);
			}
		}
		return fileName;
	}
	
	Jmol._checkCache = function(applet, fileName, fSuccess) {
		if (applet._cacheFiles && Jmol._fileCache && !fileName.endsWith(".js")) {
			var data = Jmol._fileCache[fileName];
			if (data) {
				System.out.println("using "  + data.length + " bytes of cached data for "  + fileName);
				fSuccess(data);
				return null;
			} else {
				fSuccess = function(fileName, data) { fSuccess(Jmol._fileCache[fileName] = data) };     
			}
		}
		return fSuccess;
	}
	
  Jmol.playAudio = function(filePath) {
    Jmol.playAudio(null, filePath);
  }
  
  Jmol.playAudio = function(applet, params) {
  
    var get = (params.get ? function(key){return params.get(key)} : null);
    var put = (params.put ? function(key,val){return params.put(key,val)} : null);
    var filePath = (get ? get("audioFile") : params);
    var jmolAudio = get && get("audioPlayer");
    var audio = document.createElement("audio");
    put && put("audioElement", audio);
    var callback = null;
    if (jmolAudio) {
      callback = function(type){jmolAudio.processUpdate(type)};
      jmolAudio.myClip = {
         open: function() {callback("open")},
         start: function() { audio.play(); callback("start")},
         loop: function(n) { audio.loop = (n != 0); },
         stop: function() { audio.pause(); },
         close: function() { callback("close") },
         setMicrosecondPosition: function(us) { audio.currentTime = us / 1e6; }
      };
    }    
    audio.controls = "true";
    audio.src = filePath;
    if (get && get("loop"))
      audio.loop = "true";
    if (callback) {
      audio.addEventListener("pause", function() {
          callback("pause");
      });
      audio.addEventListener("play", function() {
          callback("play");
      });
      audio.addEventListener("playing", function() {
          callback("playing");
      });
      audio.addEventListener("ended", function() {
          callback("ended");
      });
      callback("open")
    }
  }
  
	Jmol._loadFileData = function(applet, fileName, fSuccess, fError){
		var isRaw = [];
		fileName = Jmol._checkFileName(applet, fileName, isRaw);
		fSuccess = Jmol._checkCache(applet, fileName, fSuccess);
		if (isRaw[0]) {
				Jmol._getRawDataFromServer("_",fileName,fSuccess,fError);   
				return;
		} 
		var info = {
			type: "GET",
			dataType: "text",
			url: fileName,
			async: Jmol._asynchronous,
			success: function(a) {Jmol._loadSuccess(a, fSuccess)},
			error: function() {Jmol._loadError(fError)}
		}
		Jmol._checkAjaxPost(info);
		Jmol._ajax(info);
	}

	Jmol._getInfoFromDatabase = function(applet, database, query){
		if (database == "====") {
			var data = Jmol.db._restQueryXml.replace(/QUERY/,query);
			var info = {
				dataType: "text",
				type: "POST",
				contentType:"application/x-www-form-urlencoded",
				url: Jmol.db._restQueryUrl,
				data: encodeURIComponent(data) + "&req=browser",
				success: function(data) {Jmol._ajaxDone();Jmol._extractInfoFromRCSB(applet, database, query, data)},
				error: function() {Jmol._loadError(null)},
				async: Jmol._asynchronous
			}
			return Jmol._ajax(info);
		}   
		query = "?call=getInfoFromDatabase&database=" + database
				+ "&query=" + encodeURIComponent(query);
		return Jmol._contactServer(query, function(data) {Jmol._setInfo(applet, database, data)});
	}

	Jmol._extractInfoFromRCSB = function(applet, database, query, output) {
		var n = output.length/5;
		if (n == 0)
			return; 
		if (query.length == 4 && n != 1) {
			var QQQQ = query.toUpperCase();
			var pt = output.indexOf(QQQQ);
			if (pt > 0 && "123456789".indexOf(QQQQ.substring(0, 1)) >= 0)
				output = QQQQ + "," + output.substring(0, pt) + output.substring(pt + 5);
			if (n > 50)
				output = output.substring(0, 250);
			output = output.replace(/\n/g,",");
			var url = Jmol._restReportUrl.replace(/IDLIST/,output);
			Jmol._loadFileData(applet, url, function(data) {Jmol._setInfo(applet, database, data) });   
		}
	}

	Jmol._checkAjaxPost = function(info) {
		var pt = info.url.indexOf("?POST?");
		if (pt > 0) {
			info.data = info.url.substring(pt + 6);
			info.url = info.url.substring(0, pt);
			info.type = "POST";
			info.contentType = "application/x-www-form-urlencoded";
		}
	}
	Jmol._contactServer = function(data,fSuccess,fError){
		var info = {
			dataType: "text",
			type: "GET",
			url: Jmol._serverUrl + data,
			success: function(a) {Jmol._loadSuccess(a, fSuccess)},
			error:function() { Jmol._loadError(fError) },
			async:fSuccess ? Jmol._asynchronous : false
		}
		Jmol._checkAjaxPost(info);
		return Jmol._ajax(info);
	}

	Jmol._setQueryTerm = function(applet, query) {
		if (!query || !applet._hasOptions || query.substring(0, 7) == "http://")
			return;
		if (Jmol._isDatabaseCall(query)) {
			var database = query.substring(0, 1);
			query = query.substring(1);
			if (query.substring(0,1) == database && "=$".indexOf(database) >= 0)
				query = query.substring(1);
			var d = Jmol._getElement(applet, "select");
			if (d && d.options)
				for (var i = 0; i < d.options.length; i++)
					if (d[i].value == database)
						d[i].selected = true;
		}
		Jmol.$val(Jmol.$(applet, "query"), query);
	}

	Jmol._search = function(applet, query, script) {
		arguments.length > 1 || (query = null);
		Jmol._setQueryTerm(applet, query);
		query || (query = Jmol.$val(Jmol.$(applet, "query")))
		if (query.indexOf("!") == 0) {
		// command prompt in this box as well
		// remove exclamation point "immediate" indicator
			applet._script(query.substring(1));
			return;
		} 
		query && (query = query.replace(/\"/g, ""));
		applet._showInfo(false);
		Jmol._searchMol(applet, query, script, true);
	}

	Jmol._searchMol = function(applet, query, script, checkView) {
		var database;
		if (Jmol._isDatabaseCall(query)) {
			database = query.substring(0, 1);
			query = query.substring(1);
		} else {
			database = (applet._hasOptions ? Jmol.$val(Jmol.$(applet, "select")) : "$");
		}
		if (database == "=" && query.length == 3)
			query = "=" + query; // this is a ligand      
		var dm = database + query;
		if (!query || dm.indexOf("?") < 0 && dm == applet._thisJmolModel) {
			return;    
		}
		applet._thisJmolModel = dm;
		var view;
		if (checkView && applet._viewSet != null && (view = Jmol.View.__findView(applet._viewSet, {chemID:dm})) != null) {
			Jmol.View.__setView(view, applet, false);
			return;
		}

		if (database == "$" || database == ":")
			applet._jmolFileType = "MOL";
		else if (database == "=")
			applet._jmolFileType = "PDB";
		applet._searchDatabase(query, database, script);
	}

	Jmol._searchDatabase = function(applet, query, database, script) {
		applet._showInfo(false);
		if (query.indexOf("?") >= 0) {
			Jmol._getInfoFromDatabase(applet, database, query.split("?")[0]);
			return true;
		}
		if (Jmol.db._DirectDatabaseCalls[database]) {
			applet._loadFile(database + query, script);
			return true;
		}
		return false;
	}

	Jmol._syncBinaryOK="?";

	Jmol._canSyncBinary = function(isSilent) {
		if (Jmol._isAsync) return true;
		if (self.VBArray) return (Jmol._syncBinaryOK = false);
		if (Jmol._syncBinaryOK != "?") return Jmol._syncBinaryOK;
		Jmol._syncBinaryOK = true;
		try {
			var xhr = new window.XMLHttpRequest();
			xhr.open( "text", Jmol._ajaxTestSite, false );
			if (xhr.hasOwnProperty("responseType")) {
				xhr.responseType = "arraybuffer";
			} else if (xhr.overrideMimeType) {
				xhr.overrideMimeType('text/plain; charset=x-user-defined');
			}
		} catch( e ) {
			var s = "JSmolCore.js: synchronous binary file transfer is requested but not available";
			System.out.println(s);
			if (Jmol._alertNoBinary && !isSilent)
				alert (s)
			return Jmol._syncBinaryOK = false;
		}
		return true;  
	}

	Jmol._binaryTypes = ["mmtf",".gz",".bz2",".jpg",".gif",".png",".zip",".jmol",".bin",".smol",".spartan",".pmb",".mrc",".map",".ccp4",".dn6",".delphi",".omap",".pse",".dcd",".uk/pdbe/densities/"];

	Jmol.isBinaryUrl = function(url) {
		for (var i = Jmol._binaryTypes.length; --i >= 0;)
			if (url.indexOf(Jmol._binaryTypes[i]) >= 0) return true;
		return false;
	}

	Jmol._getFileData = function(fileName, fSuccess, doProcess) {
		// use host-server PHP relay if not from this host
		var isBinary = Jmol.isBinaryUrl(fileName);
		var isPDB = (fileName.indexOf(".gz") >= 0 && fileName.indexOf("rcsb.org") >= 0);
		if (isPDB) {
			// avoid unnecessary binary transfer
			fileName = fileName.replace(/\.gz/,"");
			isBinary = false;
		}
		var asBase64 = (isBinary && !fSuccess && !Jmol._canSyncBinary(isPDB));
		var isPost = (fileName.indexOf("?POST?") >= 0);
		if (fileName.indexOf("file:/") == 0 && fileName.indexOf("file:///") != 0)
			fileName = "file://" + fileName.substring(5);      /// fixes IE problem
		var isMyHost = (fileName.indexOf("://") < 0 || fileName.indexOf(document.location.protocol) == 0 && fileName.indexOf(document.location.host) >= 0);
    var isHttps2Http = (Jmol._httpProto == "https://" && fileName.indexOf("http://") == 0);
		var isDirectCall = Jmol._isDirectCall(fileName);
    if (!isDirectCall && fileName.indexOf("?ALLOWSORIGIN?") >= 0) {
      isDirectCall = true;
			fileName = fileName.replace(/\?ALLOWSORIGIN\?/,"");
    }
		//if (fileName.indexOf("http://pubchem.ncbi.nlm.nih.gov/") == 0)isDirectCall = false;

		var cantDoSynchronousLoad = (!isMyHost && Jmol.$supportsIECrossDomainScripting());
		var data = null;
		if (isHttps2Http || asBase64 || !isMyHost && !isDirectCall || !fSuccess && cantDoSynchronousLoad ) {
				data = Jmol._getRawDataFromServer("_",fileName, fSuccess, fSuccess, asBase64, true);
		} else {
			fileName = fileName.replace(/file:\/\/\/\//, "file://"); // opera
			var info = {dataType:(isBinary ? "binary" : "text"),async:!!fSuccess};
			if (isPost) {
				info.type = "POST";
				info.url = fileName.split("?POST?")[0]
				info.data = fileName.split("?POST?")[1]
			} else {
				info.type = "GET";
				info.url = fileName;
			}
			if (fSuccess) {
				info.success = function(data) { fSuccess(Jmol._xhrReturn(info.xhr))};
				info.error = function() { fSuccess(info.xhr.statusText)};
			}
			info.xhr = Jmol.$ajax(info);
			if (!fSuccess) {
				data = Jmol._xhrReturn(info.xhr);
			}
		}
		if (!doProcess)
			return data;
		if (data == null) {
			data = "";
			isBinary = false;
		}
		isBinary && (isBinary = Jmol._canSyncBinary(true));
		return (isBinary ? Jmol._strToBytes(data) : JU.SB.newS(data));
	}
	
	Jmol._xhrReturn = function(xhr){
		if (!xhr.responseText || self.Clazz && Clazz.instanceOf(xhr.response, self.ArrayBuffer)) {
			// Safari or error 
			return xhr.response || xhr.statusText;
		} 
		return xhr.responseText;
	}

	Jmol._isDirectCall = function(url) {
    if (url.indexOf("?ALLOWSORIGIN?") >= 0)
      return true;
		for (var key in Jmol.db._DirectDatabaseCalls) {
			if (key.indexOf(".") >= 0 && url.indexOf(key) >= 0)
				return true;
		}
		return false;
	}

	Jmol._cleanFileData = function(data) {
		if (data.indexOf("\r") >= 0 && data.indexOf("\n") >= 0) {
			return data.replace(/\r\n/g,"\n");
		}
		if (data.indexOf("\r") >= 0) {
			return data.replace(/\r/g,"\n");
		}
		return data;
	};

	Jmol._getFileType = function(name) {
		var database = name.substring(0, 1);
		if (database == "$" || database == ":")
			return "MOL";
		if (database == "=")
			return (name.substring(1,2) == "=" ? "LCIF" : "PDB");
		// just the extension, which must be PDB, XYZ..., CIF, or MOL
		name = name.split('.').pop().toUpperCase();
		return name.substring(0, Math.min(name.length, 3));
	};

	Jmol._getZ = function(applet, what) {
		return applet && applet._z && applet._z[what] || Jmol._z[what];
	}
	
	Jmol._incrZ = function(applet, what) {
		return applet && applet._z && ++applet._z[what] || ++Jmol._z[what];
	}
	
  Jmol._hideLocalFileReader = function(applet, cursor) {
    applet._localReader && Jmol.$setVisible(applet._localReader, false);
    applet._readingLocal = false;
    Jmol.setCursor(applet, 0);
  }
  
  Jmol.loadFileFromDialog = function(applet) {
    Jmol.loadFileAsynchronously(null, applet, null, null);
  }
  
	Jmol.loadFileAsynchronously = function(fileLoadThread, applet, fileName, appData) {
		if (fileName && fileName.indexOf("?") != 0) {
			// LOAD ASYNC command
			var fileName0 = fileName;
			fileName = Jmol._checkFileName(applet, fileName);
			var fSuccess = function(data) {Jmol._setData(fileLoadThread, fileName, fileName0, data, appData, applet)};
			fSuccess = Jmol._checkCache(applet, fileName, fSuccess);
			if (fileName.indexOf("|") >= 0)
				fileName = fileName.split("|")[0];
			return (fSuccess == null ? null : Jmol._getFileData(fileName, fSuccess));		
		}
		// we actually cannot suggest a fileName, I believe.
		if (!Jmol.featureDetection.hasFileReader) {
        var msg = "Local file reading is not enabled in your browser";
				return (fileLoadThread ? fileLoadThread.setData(msg, null, null, appData, applet) : alert(msg));
    }
		if (!applet._localReader) {
			var div = '<div id="ID" style="z-index:'+Jmol._getZ(applet, "fileOpener") + ';position:absolute;background:#E0E0E0;left:10px;top:10px"><div style="margin:5px 5px 5px 5px;"><button id="ID_loadurl">URL</button><input type="file" id="ID_files" /><button id="ID_loadfile">load</button><button id="ID_cancel">cancel</button></div><div>'
			Jmol.$after("#" + applet._id + "_appletdiv", div.replace(/ID/g, applet._id + "_localReader"));
			applet._localReader = Jmol.$(applet, "localReader");
		}
		Jmol.$appEvent(applet, "localReader_loadurl", "click");
		Jmol.$appEvent(applet, "localReader_loadurl", "click", function(evt) {
      var file = prompt("Enter a URL");
      if (!file)return
      Jmol._hideLocalFileReader(applet, 0);
      Jmol._setData(null, file, file, null, appData, applet);
		});
		Jmol.$appEvent(applet, "localReader_loadfile", "click");
		Jmol.$appEvent(applet, "localReader_loadfile", "click", function(evt) {
			var file = Jmol.$(applet, "localReader_files")[0].files[0];   
			var reader = new FileReader();
			reader.onloadend = function(evt) {
				if (evt.target.readyState == FileReader.DONE) { // DONE == 2
          Jmol._hideLocalFileReader(applet, 0);
					Jmol._setData(fileLoadThread, file.name, file.name, evt.target.result, appData, applet);
				}
			};
      try {
			  reader.readAsArrayBuffer(file);
      } catch (e) {
        alert("You must select a file first.");
      }
		});
		Jmol.$appEvent(applet, "localReader_cancel", "click");
		Jmol.$appEvent(applet, "localReader_cancel", "click", function(evt) {
      Jmol._hideLocalFileReader(applet);
      if (fileLoadThread)
  			fileLoadThread.setData("#CANCELED#", null, null, appData, applet);
		});
		Jmol.$setVisible(applet._localReader, true);
    applet._readingLocal = true;
	}

  Jmol._setData = function(fileLoadThread, filename, filename0, data, appData, applet) {
  	data && (data = Jmol._strToBytes(data));
		if (data != null && (fileLoadThread == null || filename.indexOf(".jdx") >= 0))
			Jmol.Cache.put("cache://" + filename, data); 
    if (fileLoadThread == null) {
      applet._applet.openFileAsyncSpecial(data == null ? filename : "cache://" + filename, 1);
    } else {          
		  fileLoadThread.setData(filename, filename0, data, appData);
    }    
  }

	Jmol.doAjax = function(url, postOut, dataOut) {
		// called by org.jmol.awtjs2d.JmolURLConnection.doAjax()
		url = url.toString();
		if (dataOut) {

			if (url.indexOf("http://") != 0 && url.indexOf("https://") != 0)
				return Jmol._saveFile(url, dataOut);
			var info = {async:false,url:url,type:"POST",
				data:typeof data == "string" ? dataOut :";base64," + (JU || J.util).Base64.getBase64(dataOut).toString(), processData:false
			};
			return Jmol.$ajax(info).responseText;
		}
		if (postOut)
			url += "?POST?" + postOut;
		return Jmol._getFileData(url, null, true);
	}

	// Jmol._localFileSaveFunction --  // do something local here; Maybe try the FileSave interface? return true if successful
	 
	Jmol._saveFile = function(filename, data, mimetype, encoding) {
		if (Jmol._localFileSaveFunction && Jmol._localFileSaveFunction(filename, data))
			return "OK";
		var filename = filename.substring(filename.lastIndexOf("/") + 1);
		mimetype || (mimetype = (filename.indexOf(".pdf") >= 0 ? "application/pdf" 
			: filename.indexOf(".png") >= 0 ? "image/png" 
			: filename.indexOf(".gif") >= 0 ? "image/gif" 
			: filename.indexOf(".jpg") >= 0 ? "image/jpg" : ""));
		var isString = (typeof data == "string");
		
	if (isString && data.indexOf(";base64,") >= 0) {
	  data = data.split(";base64,")[1];
	} else {	
   	data = (JU || J.util).Base64.getBase64(isString ? data.getBytes("UTF-8") : data).toString();
   	}
		encoding || (encoding = "base64");
		
		var url = Jmol._serverUrl;
		url && url.indexOf("your.server") >= 0 && (url = "");
		if (Jmol._useDataURI || !url) {
			// Asynchronous output generated using an anchor tag
			// btoa does not work with UTF-8 data///encoding || (data = btoa(data));
			var a = document.createElement("a");
			a.href = "data:" + mimetype + ";base64," + data;
			a.type = mimetype || (mimetype = "text/plain;charset=utf-8");	
			a.download = filename;
			a.target = "_blank";
				$("body").append(a);
			a.click();
			a.remove();		
		} else {
		// Asynchronous outputto be reflected as a download
			if (!Jmol._formdiv) {
					var sform = '<div id="__jsmolformdiv__" style="display:none">\
						<form id="__jsmolform__" method="post" target="_blank" action="">\
						<input name="call" value="saveFile"/>\
						<input id="__jsmolmimetype__" name="mimetype" value=""/>\
						<input id="__jsmolencoding__" name="encoding" value=""/>\
						<input id="__jsmolfilename__" name="filename" value=""/>\
						<textarea id="__jsmoldata__" name="data"></textarea>\
						</form>\
						</div>'
				Jmol.$after("body", sform);
				Jmol._formdiv = "__jsmolform__";
			}
			Jmol.$attr(Jmol._formdiv, "action", url + "?" + (new Date()).getMilliseconds());
			Jmol.$val("__jsmoldata__", data);
			Jmol.$val("__jsmolfilename__", filename);
			Jmol.$val("__jsmolmimetype__", mimetype);
			Jmol.$val("__jsmolencoding__", encoding);
			Jmol.$submit("__jsmolform__");
			Jmol.$val("__jsmoldata__", "");
			Jmol.$val("__jsmolfilename__", "");
		}
		return "OK";
	}

	Jmol._strToBytes = function(s) {
		if (Clazz.instanceOf(s, self.ArrayBuffer))
			return Clazz.newByteArray(-1, s);
		var b = Clazz.newByteArray(s.length, 0);
		for (var i = s.length; --i >= 0;)
			b[i] = s.charCodeAt(i) & 0xFF;
		return b;
	}

	////////////// applet start-up functionality //////////////

	Jmol._setConsoleDiv = function (d) {
		if (!self.Clazz)return;
		Clazz.setConsoleDiv(d);
	}

	Jmol._registerApplet = function(id, applet) {
		return window[id] = Jmol._applets[id] = Jmol._applets[id + "__" + Jmol._syncId + "__"] = applet;
	} 

	Jmol._readyCallback = function (appId,fullId,isReady,javaApplet,javaAppletPanel) {
		appId = appId.split("_object")[0];
    var applet = Jmol._applets[appId];
		isReady = (isReady.booleanValue ? isReady.booleanValue() : isReady);
		// necessary for MSIE in strict mode -- apparently, we can't call 
		// jmol._readyCallback, but we can call Jmol._readyCallback. Go figure...
    if (isReady) {
      // when leaving page, Java applet may be dead 
      applet._appletPanel = (javaAppletPanel || javaApplet);
      applet._applet = javaApplet;
    }
		Jmol._track(applet)._readyCallback(appId, fullId, isReady);
	}

	Jmol._getWrapper = function(applet, isHeader) {

			// id_appletinfotablediv
			//     id_appletdiv
			//     id_coverdiv
			//     id_infotablediv
			//       id_infoheaderdiv
			//          id_infoheaderspan
			//          id_infocheckboxspan
			//       id_infodiv


			// for whatever reason, without DOCTYPE, with MSIE, "height:auto" does not work, 
			// and the text scrolls off the page.
			// So I'm using height:95% here.
			// The table was a fix for MSIE with no DOCTYPE tag to fix the miscalculation
			// in height of the div when using 95% for height. 
			// But it turns out the table has problems with DOCTYPE tags, so that's out. 
			// The 95% is a compromise that we need until the no-DOCTYPE MSIE solution is found. 
			// (100% does not work with the JME linked applet)
		var s;
		// ... here are just for clarification in this code; they are removed immediately
		if (isHeader) {
			var img = ""; 
			if (applet._coverImage){
				var more = " onclick=\"Jmol.coverApplet(ID, false)\" title=\"" + (applet._coverTitle) + "\"";
				var play = "<image id=\"ID_coverclickgo\" src=\"" + applet._makeLiveImage + "\" style=\"width:25px;height:25px;position:absolute;bottom:10px;left:10px;"
					+ "z-index:" + Jmol._getZ(applet, "coverImage")+";opacity:0.5;\"" + more + " />"  
				img = "<div id=\"ID_coverdiv\" style=\"background-color:red;z-index:" + Jmol._getZ(applet, "coverImage")+";width:100%;height:100%;display:inline;position:absolute;top:0px;left:0px\"><image id=\"ID_coverimage\" src=\""
				 + applet._coverImage + "\" style=\"width:100%;height:100%\"" + more + "/>" + play + "</div>";
			}
      
      var wait = (applet._isJava ? "" : "<image id=\"ID_waitimage\" src=\"" + applet._j2sPath + "/img/cursor_wait.gif\" style=\"display:none;position:absolute;bottom:10px;left:10px;"
					+ "z-index:" + Jmol._getZ(applet, "coverImage")+";\" />");  

			var css = Jmol._appletCssText.replace(/\'/g,'"');
      var spinner = applet._getSpinner && applet._getSpinner();
      applet._spinner = spinner = (!spinner || spinner == "none" ? "" : "background-image:url("+spinner + "); background-repeat:no-repeat; background-position:center;");    
			css = spinner + (css.indexOf("style=\"") >= 0 ? css.split("style=\"")[1] : "\" " + css);
			s = "\
...<div id=\"ID_appletinfotablediv\" style=\"width:Wpx;height:Hpx;position:relative;font-size:14px;text-align:left\">IMG WAIT\
......<div id=\"ID_appletdiv\" style=\"z-index:" + Jmol._getZ(applet, "header") + ";width:100%;height:100%;position:absolute;top:0px;left:0px;" + css + ">";
			var height = applet._height;
			var width = applet._width;
			if (typeof height !== "string" || height.indexOf("%") < 0) 
				height += "px";
			if (typeof width !== "string" || width.indexOf("%") < 0)
				width += "px";
			s = s.replace(/IMG/, img).replace(/WAIT/, wait).replace(/Hpx/g, height).replace(/Wpx/g, width);
		} else {
			s = "\
......</div>\
......<div id=\"ID_2dappletdiv\" style=\"position:absolute;width:100%;height:100%;overflow:hidden;display:none\"></div>\
......<div id=\"ID_infotablediv\" style=\"width:100%;height:100%;position:absolute;top:0px;left:0px\">\
.........<div id=\"ID_infoheaderdiv\" style=\"height:20px;width:100%;background:yellow;display:none\"><span id=\"ID_infoheaderspan\"></span><span id=\"ID_infocheckboxspan\" style=\"position:absolute;text-align:right;right:1px;\"><a href=\"javascript:Jmol.showInfo(ID,false)\">[x]</a></span></div>\
.........<div id=\"ID_infodiv\" style=\"position:absolute;top:20px;bottom:0px;width:100%;height:100%;overflow:auto\"></div>\
......</div>\
...</div>";
		}
		return s.replace(/\.\.\./g,"").replace(/[\n\r]/g,"").replace(/ID/g, applet._id);
	}

  Jmol._hideLoadingSpinner = function(applet) {
    if (applet._spinner)
      Jmol.$css(Jmol.$(applet, "appletdiv"), {"background-image": ""});
  }
  
	Jmol._documentWrite = function(text) {
		if (Jmol._document) {
			if (Jmol._isXHTML && !Jmol._XhtmlElement) {
				var s = document.getElementsByTagName("script");
				Jmol._XhtmlElement = s.item(s.length - 1);
				Jmol._XhtmlAppendChild = false;
			}
			if (Jmol._XhtmlElement)
				Jmol._domWrite(text);
			else
				Jmol._document.write(text);
		}
		return text;
	}

	Jmol._domWrite = function(data) {
		var pt = 0
		var Ptr = []
		Ptr[0] = 0
		while (Ptr[0] < data.length) {
			var child = Jmol._getDomElement(data, Ptr);
			if (!child)
				break;
			if (Jmol._XhtmlAppendChild)
				Jmol._XhtmlElement.appendChild(child);
			else
				Jmol._XhtmlElement.parentNode.insertBefore(child, _jmol.XhtmlElement);
		}
	}

	Jmol._getDomElement = function(data, Ptr, closetag, lvel) {

		// there is no "document.write" in XHTML

		var e = document.createElement("span");
		e.innerHTML = data;
		Ptr[0] = data.length;

/*
	// unnecessary ?  

		closetag || (closetag = "");
		lvel || (lvel = 0);
		var pt0 = Ptr[0];
		var pt = pt0;
		while (pt < data.length && data.charAt(pt) != "<") 
			pt++
		if (pt != pt0) {
			var text = data.substring(pt0, pt);
			Ptr[0] = pt;
			return document.createTextNode(text);
		}
		pt0 = ++pt;
		var ch;
		while (pt < data.length && "\n\r\t >".indexOf(ch = data.charAt(pt)) < 0) 
			pt++;
		var tagname = data.substring(pt0, pt);
		var e = (tagname == closetag  || tagname == "/" ? ""
			: document.createElementNS ? document.createElementNS('http://www.w3.org/1999/xhtml', tagname)
			: document.createElement(tagname));
		if (ch == ">") {
			Ptr[0] = ++pt;
			return e;
		}
		while (pt < data.length && (ch = data.charAt(pt)) != ">") {
			while (pt < data.length && "\n\r\t ".indexOf(ch = data.charAt(pt)) >= 0) 
				pt++;
			pt0 = pt;
			while (pt < data.length && "\n\r\t =/>".indexOf(ch = data.charAt(pt)) < 0) 
				pt++;
			var attrname = data.substring(pt0, pt).toLowerCase();
			if (attrname && ch != "=")
				e.setAttribute(attrname, "true");
			while (pt < data.length && "\n\r\t ".indexOf(ch = data.charAt(pt)) >= 0) 
				pt++;
			if (ch == "/") {
				Ptr[0] = pt + 2;
				return e;
			} else if (ch == "=") {
				var quote = data.charAt(++pt);
				pt0 = ++pt;
				while (pt < data.length && (ch = data.charAt(pt)) != quote) 
					pt++;
				var attrvalue = data.substring(pt0, pt);
				e.setAttribute(attrname, attrvalue);
				pt++;
			}
		}
		Ptr[0] = ++pt;
		while (Ptr[0] < data.length) {
			var child = Jmol._getDomElement(data, Ptr, "/" + tagname, lvel+1);
			if (!child)
				break;
			e.appendChild(child);
		}
*/
		return e;    
	}

	Jmol._setObject = function(obj, id, Info) {
		obj._id = id;
		obj.__Info = {};
		Info.z && Info.zIndexBase && (Jmol._z = Jmol._getZOrders(Info.zIndexBase));
		for (var i in Info)
			obj.__Info[i] = Info[i];
		(obj._z = Info.z) || Info.zIndexBase && (obj._z = obj.__Info.z = Jmol._getZOrders(Info.zIndexBase));
		obj._width = Info.width;
		obj._height = Info.height;
		obj._noscript = !obj._isJava && Info.noscript;
		obj._console = Info.console;
		obj._cacheFiles = !!Info.cacheFiles;
		obj._viewSet = (Info.viewSet == null || obj._isJava ? null : "Set" + Info.viewSet);
		if (obj._viewSet != null) {
			Jmol.View.__init(obj);
			obj._currentView = null;
		}
		!Jmol._fileCache && obj._cacheFiles && (Jmol._fileCache = {});
		if (!obj._console)
			obj._console = obj._id + "_infodiv";
		if (obj._console == "none")
			obj._console = null;

		obj._color = (Info.color ? Info.color.replace(/0x/,"#") : "#FFFFFF");
		obj._disableInitialConsole = Info.disableInitialConsole;
		obj._noMonitor = Info.disableJ2SLoadMonitor;
		Jmol._j2sPath && (Info.j2sPath = Jmol._j2sPath);
		obj._j2sPath = Info.j2sPath;
		obj._coverImage = Info.coverImage;
    obj._makeLiveImage = Info.makeLiveImage || Info.j2sPath + "/img/play_make_live.jpg";
		obj._isCovered = !!obj._coverImage; 
		obj._deferApplet = Info.deferApplet || obj._isCovered && obj._isJava; // must do this if covered in Java
		obj._deferUncover = Info.deferUncover && !obj._isJava; // can't do this with Java
		obj._coverScript = Info.coverScript;
		obj._coverTitle = Info.coverTitle;

		if (!obj._coverTitle)
			obj._coverTitle = (obj._deferApplet ? "activate 3D model" : "3D model is loading...")
		obj._containerWidth = obj._width + ((obj._width==parseFloat(obj._width))? "px":"");
		obj._containerHeight = obj._height + ((obj._height==parseFloat(obj._height))? "px":"");
		obj._info = "";
		obj._infoHeader = obj._jmolType + ' "' + obj._id + '"'
		obj._hasOptions = Info.addSelectionOptions;
		obj._defaultModel = Info.defaultModel;
		obj._readyScript = (Info.script ? Info.script : "");
		obj._readyFunction = Info.readyFunction;
		if (obj._coverImage && !obj._deferApplet)
			obj._readyScript += ";javascript " + id + "._displayCoverImage(false)";
		obj._src = Info.src;

	}

	Jmol._addDefaultInfo = function(Info, DefaultInfo) {
		for (var x in DefaultInfo)
			if (typeof Info[x] == "undefined")
				Info[x] = DefaultInfo[x];
		Jmol._use && (Info.use = Jmol._use);
		if (Info.use.indexOf("SIGNED") >= 0) {
			if (Info.jarFile.indexOf("Signed") < 0)
				Info.jarFile = Info.jarFile.replace(/Applet/,"AppletSigned");
			Info.use = Info.use.replace(/SIGNED/, "JAVA");
			Info.isSigned = true;
		}
	}

	Jmol._syncedApplets = [];
	Jmol._syncedCommands = [];
	Jmol._syncedReady = [];
	Jmol._syncReady = false;
	Jmol._isJmolJSVSync = false;

	Jmol._setReady = function(applet) {
		Jmol._syncedReady[applet] = 1;
		var n = 0;
		for (var i = 0; i < Jmol._syncedApplets.length; i++) {
			if (Jmol._syncedApplets[i] == applet._id) {
				Jmol._syncedApplets[i] = applet;
				Jmol._syncedReady[i] = 1;
			} else if (!Jmol._syncedReady[i]) {
				continue;
			}
			n++;
		}
		if (n != Jmol._syncedApplets.length)
			return;
		Jmol._setSyncReady();
	}

	Jmol._setDestroy = function(applet) {
		//MSIE bug responds to any link click even if it is just a JavaScript call

		if (Jmol.featureDetection.allowDestroy)
			Jmol.$windowOn('beforeunload', function () { Jmol._destroy(applet); } );
	}

	Jmol._destroy = function(applet) {
		try {
			if (applet._appletPanel) applet._appletPanel.destroy();
			applet._applet = null;
			Jmol._unsetMouse(applet._canvas)
			applet._canvas = null;
			var n = 0;
			for (var i = 0; i < Jmol._syncedApplets.length; i++) {
				if (Jmol._syncedApplets[i] == applet)
					Jmol._syncedApplets[i] = null;
				if (Jmol._syncedApplets[i])
					n++;
			}
			if (n > 0)
				return;
			Jmol._clearVars();
		} catch(e){}
	}

	////////////// misc core functionality //////////////

	Jmol._setSyncReady = function() {
		Jmol._syncReady = true;
		var s = ""
		for (var i = 0; i < Jmol._syncedApplets.length; i++)
			if (Jmol._syncedCommands[i])
				s += "Jmol.script(Jmol._syncedApplets[" + i + "], Jmol._syncedCommands[" + i + "]);"
		setTimeout(s, 50);  
	}

	Jmol._mySyncCallback = function(appFullName,msg) {
		app = Jmol._applets[appFullName];
		if (app._viewSet) {
			// when can we do this?
//			if (app._viewType == "JSV" && !app._currentView.JMOL)
				Jmol.View.updateFromSync(app, msg);
			return;
		}
		if(!Jmol._syncReady || !Jmol._isJmolJSVSync)
			return 1; // continue processing and ignore me
		for (var i = 0; i < Jmol._syncedApplets.length; i++) {
			if (msg.indexOf(Jmol._syncedApplets[i]._syncKeyword) >= 0)
				Jmol._syncedApplets[i]._syncScript(msg);
		}
		return 0 // prevents further Jmol sync processing 
	}              

	Jmol._getElement = function(applet, what) {
		var d = document.getElementById(applet._id + "_" + what);
		return (d || {});
	} 
	 
	Jmol._evalJSON = function(s,key){
		s = s + "";
		if(!s)
			return [];
		if(s.charAt(0) != "{") {
			if(s.indexOf(" | ") >= 0)
				s = s.replace(/\ \|\ /g, "\n");
			return s;
		}
		var A = (new Function( "return " + s ) )();
		return (!A ? null : key && A[key] != undefined ? A[key] : A);
	}

	Jmol._sortMessages = function(A){
		/*
		 * private function
		 */
		function _sortKey0(a,b){
			return (a[0]<b[0]?1:a[0]>b[0]?-1:0);
		}

		if(!A || typeof (A) != "object")
			return [];
		var B = [];
		for(var i = A.length - 1; i >= 0; i--)
			for(var j = 0, jj= A[i].length; j < jj; j++)
				B[B.length] = A[i][j];
		if(B.length == 0)
			return;
		B = B.sort(_sortKey0);
		return B;
	}

	//////////////////// mouse events //////////////////////

	Jmol._setMouseOwner = function(who, tf) {
		if (who == null || tf)
			Jmol._mouseOwner = who;
		else if (Jmol._mouseOwner == who)
			Jmol._mouseOwner = null;
	}

	Jmol._jsGetMouseModifiers = function(ev) {
		var modifiers = 0;
		switch (ev.button) {
		case 0:
			modifiers = 16;//J.api.Event.MOUSE_LEFT;
			break;
		case 1:
			modifiers = 8;//J.api.Event.MOUSE_MIDDLE;
			break;
		case 2:
			modifiers = 4;//J.api.Event.MOUSE_RIGHT;
			break;
		}
		if (ev.shiftKey)
			modifiers += 1;//J.api.Event.SHIFT_MASK;
		if (ev.altKey)
			modifiers += 8;//J.api.Event.ALT_MASK;
		if (ev.ctrlKey)
			modifiers += 2;//J.api.Event.CTRL_MASK;
		return modifiers;
	}

	Jmol._jsGetXY = function(canvas, ev) {
		if (!canvas.applet._ready || Jmol._touching && ev.type.indexOf("touch") < 0)
			return false;
		//ev.preventDefault(); // removed 5/9/2015 -- caused loss of focus on text-box clicking in SwingJS
		var offsets = Jmol.$offset(canvas.id);
		var x, y;
		var oe = ev.originalEvent;
		// drag-drop jQuery event is missing pageX
		ev.pageX || (ev.pageX = oe.pageX);
		ev.pageY || (ev.pageY = oe.pageY);
		Jmol._mousePageX = ev.pageX;
		Jmol._mousePageY = ev.pageY;
		if (oe.targetTouches && oe.targetTouches[0]) {
			x = oe.targetTouches[0].pageX - offsets.left;
			y = oe.targetTouches[0].pageY - offsets.top;
		} else if (oe.changedTouches) {
			x = oe.changedTouches[0].pageX - offsets.left;
			y = oe.changedTouches[0].pageY - offsets.top;
		} else {
			x = ev.pageX - offsets.left;
			y = ev.pageY - offsets.top;
		}
		return (x == undefined ? null : [Math.round(x), Math.round(y), Jmol._jsGetMouseModifiers(ev)]);
	}

  Jmol.setCursor = function(applet, c) {
    if (applet._isJava || applet._readingLocal)
      return;
    var curs;
    switch(c) {
    case 1: 
      curs = "crosshair";
      break;
    case 3: // wait
      curs = "wait";
      Jmol.$setVisible(Jmol.$(applet, "waitimage"), true);
      break;
    case 8: // zoom
      curs = "ns-resize"; 
      break;
    case 12: // hand
      curs = "grab"; 
      break;
    case 13: 
      curs = "move";
      break;
    default:
      Jmol.$setVisible(Jmol.$(applet, "waitimage"), false);
      curs = "default";
      break;
    }
    applet._canvas.style.cursor = curs;
  }
  
	Jmol._gestureUpdate = function(canvas, ev) {
		ev.stopPropagation();
		ev.preventDefault();
		var oe = ev.originalEvent;
		switch (ev.type) {
		case "touchstart":
			Jmol._touching = true;
			break;
		case "touchend":
			Jmol._touching = false;
			break;
		}
		if (!oe.touches || oe.touches.length != 2) return false;
		switch (ev.type) {
		case "touchstart":
			canvas._touches = [[],[]];
			break;
		case "touchmove":
			var offsets = Jmol.$offset(canvas.id);
			var t0 = canvas._touches[0];
			var t1 = canvas._touches[1];
			t0.push([oe.touches[0].pageX - offsets.left, oe.touches[0].pageY - offsets.top]);
			t1.push([oe.touches[1].pageX - offsets.left, oe.touches[1].pageY - offsets.top]);
			var n = t0.length;
			if (n > 3) {
				t0.shift();
				t1.shift();
			}
			if (n >= 2)
				canvas.applet._processGesture(canvas._touches);
			break;
		}
		return true;
	}

	Jmol._jsSetMouse = function(canvas) {

    var doIgnore = function(ev) { return (!ev.target || ("" + ev.target.className).indexOf("swingjs-ui") >= 0) };

		Jmol.$bind(canvas, 'mousedown touchstart', function(ev) {
      if (doIgnore(ev))
        return true;
			Jmol._setMouseOwner(canvas, true);
			ev.stopPropagation();
      var ui = ev.target["data-UI"];
      if (!ui || !ui.handleJSEvent(canvas, 501, ev)) 
  			ev.preventDefault();
			canvas.isDragging = true;
			if ((ev.type == "touchstart") && Jmol._gestureUpdate(canvas, ev))
				return !!ui;
			Jmol._setConsoleDiv(canvas.applet._console);
			var xym = Jmol._jsGetXY(canvas, ev);
			if(xym) {
		  	if (ev.button != 2)
          Jmol.Swing.hideMenus(canvas.applet);
        canvas.applet._processEvent(501, xym); //java.awt.Event.MOUSE_DOWN
      }
			return !!ui;
		});
    
		Jmol.$bind(canvas, 'mouseup touchend', function(ev) {
      if (doIgnore(ev))
        return true;
			Jmol._setMouseOwner(null);
			ev.stopPropagation();
      var ui = ev.target["data-UI"];
      if (!ui || !ui.handleJSEvent(canvas, 502, ev))
  			ev.preventDefault();
			canvas.isDragging = false;
			if (ev.type == "touchend" && Jmol._gestureUpdate(canvas, ev))
				return !!ui;
			var xym = Jmol._jsGetXY(canvas, ev);
			if(xym)
  			canvas.applet._processEvent(502, xym);//java.awt.Event.MOUSE_UP
			return !!ui;
		});
    
		Jmol.$bind(canvas, 'mousemove touchmove', function(ev) { // touchmove
      if (doIgnore(ev))
        return true;
		  // defer to console or menu when dragging within this canvas
			if (Jmol._mouseOwner && Jmol._mouseOwner != canvas && Jmol._mouseOwner.isDragging) {
        if (!Jmol._mouseOwner.mouseMove)
          return true;
	   			Jmol._mouseOwner.mouseMove(ev);
				return false;
			}
			return Jmol._drag(canvas, ev);
		});
		
		Jmol._drag = function(canvas, ev) {
      
			ev.stopPropagation();
			ev.preventDefault();
      
			var isTouch = (ev.type == "touchmove");
			if (isTouch && Jmol._gestureUpdate(canvas, ev))
				return false;
			var xym = Jmol._jsGetXY(canvas, ev);
			if(!xym) return false;
      
			if (!canvas.isDragging)
				xym[2] = 0;

      var ui = ev.target["data-UI"];
      if (canvas.isdragging && (!ui || !ui.handleJSEvent(canvas, 506, ev))) {}
			canvas.applet._processEvent((canvas.isDragging ? 506 : 503), xym); // java.awt.Event.MOUSE_DRAG : java.awt.Event.MOUSE_MOVE
			return !!ui;
}
		
		Jmol.$bind(canvas, 'DOMMouseScroll mousewheel', function(ev) { // Zoom
      if (doIgnore(ev))
        return true;
			ev.stopPropagation();
			ev.preventDefault();
			// Webkit or Firefox
			canvas.isDragging = false;
			var oe = ev.originalEvent;
			var scroll = (oe.detail ? oe.detail : (Jmol.featureDetection.os == "mac" ? 1 : -1) * oe.wheelDelta); // Mac and PC are reverse; but 
			var modifiers = Jmol._jsGetMouseModifiers(ev);
			canvas.applet._processEvent(507,[scroll < 0 ? -1 : 1,0,modifiers]);
			return false;
		});

		// context menu is fired on mouse down, not up, and it's handled already anyway.

		Jmol.$bind(canvas, "contextmenu", function() {return false;});

		Jmol.$bind(canvas, 'mouseout', function(ev) {
      if (doIgnore(ev))
        return true;
      if (Jmol._mouseOwner && !Jmol._mouseOwner.mouseMove) 
        Jmol._setMouseOwner(null);
			if (canvas.applet._appletPanel)
				canvas.applet._appletPanel.startHoverWatcher(false);
			//canvas.isDragging = false;
			var xym = Jmol._jsGetXY(canvas, ev);
			if (!xym)
				return false;
			//canvas.applet._processEvent(502, xym);//J.api.Event.MOUSE_UP
			//canvas.applet._processEvent(505, xym);//J.api.Event.MOUSE_EXITED
			return false;
		});

		Jmol.$bind(canvas, 'mouseenter', function(ev) {
      if (doIgnore(ev))
        return true;
			if (canvas.applet._appletPanel)
				canvas.applet._appletPanel.startHoverWatcher(true);
			if (ev.buttons === 0 || ev.which === 0) {
				canvas.isDragging = false;
				var xym = Jmol._jsGetXY(canvas, ev);
				if (!xym)
					return false;
				canvas.applet._processEvent(504, xym);//J.api.Event.MOUSE_ENTERED	
				canvas.applet._processEvent(502, xym);//J.api.Event.MOUSE_UP
				return false;
			}
		});

	Jmol.$bind(canvas, 'mousemoveoutjsmol', function(evspecial, target, ev) {
      if (doIgnore(ev))
        return true;
		if (canvas == Jmol._mouseOwner && canvas.isDragging) {
			return Jmol._drag(canvas, ev);
		}
	});

		if (canvas.applet._is2D)
			Jmol.$resize(function() {
				if (!canvas.applet)
					return;
				canvas.applet._resize();
			});
 
		Jmol.$bind('body', 'mouseup touchend', function(ev) {
      if (doIgnore(ev))
        return true;
			if (canvas.applet)
				canvas.isDragging = false;
			Jmol._setMouseOwner(null);
		});

	}

	Jmol._jsUnsetMouse = function(canvas) {
		canvas.applet = null;
		Jmol.$bind(canvas, 'mousedown touchstart mousemove touchmove mouseup touchend DOMMouseScroll mousewheel contextmenu mouseout mouseenter', null);
		Jmol._setMouseOwner(null);
	}


////// Jmol.Swing interface  for Javascript implementation of Swing dialogs and menus

Jmol.Swing = {
	// a static class
	count:0,
	menuInitialized:0,
	menuCounter:0,
	htDialogs:{}
};

(function(Swing) {

SwingController = Swing; // see javajs.api.SwingController

Swing.setDraggable = function(Obj) {
	
	var proto = Obj.prototype;
	if (proto.setContainer)
		return;
	
	// for menus, console, and 
	proto.setContainer = function(container) {
		this.container = container;
		container.obj = this;
		this.isDragging = false;
		this.ignoreMouse = false;
		var me = this;
		container.bind('mousedown touchstart', function(ev) {
			if (me.ignoreMouse) {
				me.ignoreMouse = false;
				return true;
			}
			Jmol._setMouseOwner(me, true);
			me.isDragging = true;
			me.pageX = ev.pageX;
			me.pageY = ev.pageY;
			return false;
		});
		container.bind('mousemove touchmove', function(ev) {
			if (me.isDragging && Jmol._mouseOwner == me) {
				me.mouseMove(ev);
				return false;
			}
		});
		container.bind('mouseup touchend', function(ev) {
			me.mouseUp(ev);
			Jmol._setMouseOwner(null);
		});
	};

	proto.mouseUp = function(ev) {
		if (this.isDragging && Jmol._mouseOwner == this) {
			this.pageX0 += (ev.pageX - this.pageX);
			this.pageY0 += (ev.pageY - this.pageY);
			this.isDragging = false;
			return false;
		}
		Jmol._setMouseOwner(null);
	}

	proto.setPosition = function() {
		if (Jmol._mousePageX === null) {
			var id = this.applet._id + "_" + (this.applet._is2D ? "canvas2d" : "canvas");
			var offsets = Jmol.$offset(id);
			Jmol._mousePageX = offsets.left;
			Jmol._mousePageY = offsets.top;
		}
		this.pageX0 = Jmol._mousePageX;
		this.pageY0 = Jmol._mousePageY;
		var pos = { top: Jmol._mousePageY + 'px', left: Jmol._mousePageX + 'px' };
		this.container.css(pos);
	};

	proto.mouseMove = function(ev) {
		if (this.isDragging && Jmol._mouseOwner == this) {
			this.timestamp = System.currentTimeMillis(); // used for menu closure
			var x = this.pageX0 + (ev.pageX - this.pageX);
			var y = this.pageY0 + (ev.pageY - this.pageY);
      Jmol._mousePageX = x;
      Jmol._mousePageY = y;
			this.container.css({ top: y + 'px', left: x + 'px' })
		}
	};

	proto.dragBind = function(isBind) {
		this.applet._ignoreMouse = !isBind;
		this.container.unbind('mousemoveoutjsmol');
		this.container.unbind('touchmoveoutjsmol');
		this.container.unbind('mouseupoutjsmol');
		this.container.unbind('touchendoutjsmol');
		Jmol._setMouseOwner(null);
		if (isBind) {
			var me = this;
			this.container.bind('mousemoveoutjsmol touchmoveoutjsmol', function(evspecial, target, ev) {
				me.mouseMove(ev);
			});
			this.container.bind('mouseupoutjsmol touchendoutjsmol', function(evspecial, target, ev) {
				me.mouseUp(ev);
			});
		}
	};
}

// Dialog //

Swing.JSDialog = function () {
}

Swing.setDraggable(Swing.JSDialog);

///// calls from javajs and other Java-derived packages /////

Swing.getScreenDimensions = function(d) {
	d.width = $(window).width();
	d.height = $(window).height();
}

Swing.dispose = function(dialog) {
	Jmol.$remove(dialog.id + "_mover");
	delete Swing.htDialogs[dialog.id]
	dialog.container.obj.dragBind(false);
//  var btns = $("#" + dialog.id + " *[id^='J']"); // add descendents with id starting with "J"
//  for (var i = btns.length; --i >= 0;)
//    delete Dialog.htDialogs[btns[i].id]
	//System.out.println("JSmolCore.js: dispose " + dialog.id)
}
 
Swing.register = function(dialog, type) {
	dialog.id = type + (++Swing.count);
	Swing.htDialogs[dialog.id] = dialog;
	//System.out.println("JSmolCore.js: register " + dialog.id)

}

Swing.setDialog = function(dialog) {
	Jmol._setMouseOwner(null);
	Jmol.$remove(dialog.id);
	//System.out.println("removed " + dialog.id)
	var id = dialog.id + "_mover";
	var container = Jmol._$(id);
	var jd;
	//System.out.println("JSmolCore.js: setDialog " + dialog.id);
	if (container[0]) {
		container.html(dialog.html);
		jd = container[0].jd;
	} else {
		Jmol.$after("body","<div id='" + id + "' style='position:absolute;left:0px;top:0px;'>" + dialog.html + "</div>");
		var jd = new Swing.JSDialog();
		container = Jmol._$(id);
		dialog.container = container;
		jd.applet = dialog.manager.vwr.html5Applet;
		jd.setContainer(container);
		jd.dialog = dialog;
		jd.setPosition();  
		jd.dragBind(true);
		container[0].jd = jd; 
	}
	Jmol.$bind("#" + dialog.id + " .JButton", "mousedown touchstart", function(event) { jd.ignoreMouse=true });
	Jmol.$bind("#" + dialog.id + " .JComboBox", "mousedown touchstart", function(event) { jd.ignoreMouse=true });
	Jmol.$bind("#" + dialog.id + " .JCheckBox", "mousedown touchstart", function(event) { jd.ignoreMouse=true });
	Jmol.$bind("#" + dialog.id + " .JTextField", "mousedown touchstart", function(event) { jd.ignoreMouse=true });
	Jmol.$bind("#" + dialog.id + " .JTable", "mousedown touchstart", function(event) { jd.ignoreMouse=true });
	Jmol.$bind("#" + dialog.id + " .JScrollPane", "mousedown touchstart", function(event) { jd.ignoreMouse=true });
	Jmol.$bind("#" + dialog.id + " .JEditorPane", "mousedown touchstart", function(event) { jd.ignoreMouse=true });

}
 
Swing.setSelected = function(chk) {
 Jmol.$prop(chk.id, 'checked', !!chk.selected);
}

Swing.setSelectedIndex = function(cmb) {
 Jmol.$prop(cmb.id, 'selectedIndex', cmb.selectedIndex);
}

Swing.setText = function(btn) {
 Jmol.$prop(btn.id, 'value', btn.text);
}

Swing.setVisible = function(c) {
	Jmol.$setVisible(c.id, c._visible);
}

Swing.setEnabled = function(c) {
	Jmol.$setEnabled(c.id, c.enabled);
}

/// callbacks from the HTML elements ////
 
Swing.click = function(element, keyEvent) {
	var component = Swing.htDialogs[element.id];
	if (component) {
		//System.out.println("click " + element + " " + component)
		var info = component.toString();
		// table cells will have an id but are not registered
		if (info.indexOf("JCheck") >= 0) {
				component.selected = element.checked;
		} else if (info.indexOf("JCombo") >= 0) {
			component.selectedIndex = element.selectedIndex;
		} else if (component.text != null) {  // JButton, JTextField
			component.text = element.value;
			if (keyEvent && ((keyEvent.charCode || keyEvent.keyCode) != 13))
				return;
		}    
	}
	var dialog = Swing.htDialogs[Jmol.$getAncestorDiv(element.id, "JDialog").id];
	var key = (component ? component.name :  dialog.registryKey + "/" + element.id);
	//System.out.println("JSmolCore.js: click " + key); 
	dialog.manager.actionPerformed(key);
}

Swing.setFront = function(dialog) {
  var applet = dialog.manager.vwr.html5Applet;
	if (dialog.zIndex != Jmol._getZ(applet, "dialog"))
	 dialog.zIndex = Jmol._incrZ(applet, "dialog");
	dialog.container && ((dialog.container[0] || dialog.container).style.zIndex = dialog.zIndex);
}

Swing.hideMenus = function(applet) {
	// called from LEFT-DOWN mouse event
	var menus = applet._menus;
	if (menus)
		for (var i in menus)
			if (menus[i]._visible)
				Swing.hideMenu(menus[i]);
}

Swing.windowClosing = function(element) {
	var dialog = Swing.htDialogs[Jmol.$getAncestorDiv(element.id, "JDialog").id];
	if (dialog.registryKey) {
		//System.out.println("JSmolCore.js: windowClosing " + dialog.registryKey); 
		dialog.manager.processWindowClosing(dialog.registryKey);
	} else {
		//System.out.println("JSmolCore.js: windowClosing " + dialog.title); 
		dialog.dispose();
	}
}

})(Jmol.Swing);

Jmol._track = function(applet) {
	// this function inserts an iFrame that can be used to track your page's applet use. 
	// By default it tracks to a page at St. Olaf College, but you can change that. 
	// and you can use
	//
	// delete Jmol._tracker
	//
	// yourself to not have you page execute this 
	//
	if (Jmol._tracker){
		try {  
			var url = Jmol._tracker + "&applet=" + applet._jmolType + "&version=" + Jmol._version 
				+ "&appver=" + Jmol.___JmolVersion + "&url=" + encodeURIComponent(document.location.href);
			var s = '<iframe style="display:none" width="0" height="0" frameborder="0" tabindex="-1" src="' + url + '"></iframe>'
			Jmol.$after("body", s);
		} catch (e) {
			// ignore
		}
		delete Jmol._tracker;
	}
	return applet;
}

var __profiling;

Jmol.getProfile = function(doProfile) {
  if (!self.Clazz || !self.JSON)
    return;
  if (!__profiling)
    Clazz._startProfiling(__profiling = (arguments.length == 0 || doProfile));
	return Clazz.getProfile();
}

Jmol._getInChIKey = function(applet, data) {
	if (data.indexOf("MOL=") >= 0)
		data = data.split("MOL=")[1].split("\"")[0];

}

Jmol._getAttr = function(s, a) {
	var pt = s.indexOf(a + "=");
	return (pt >= 0 && (pt = s.indexOf('"', pt)) >= 0 
		? s.substring(pt+1, s.indexOf('"', pt+1)) : null);
}

Jmol.User = {
	viewUpdatedCallback: null
}

Jmol.View = {

// The objective of Jmol.View is to coordinate
// asynchronous applet loading and atom/peak picking
// among any combination of Jmol, JME, and JSV.
// 
// basic element is a view object:
//   view = {
//     viewType1: viewRecord1,
//     viewType2: viewRecord2,
//     viewType3: viewRecord3
//   }
// where viewType is one of (Jmol, JME, JSV)
// and a viewRecord is an object
// with elements .chemID, .applet, .data, .script
//
// Jmol.View.sets is a list of cached views[0..n]
// for a given group of applet objects with common Info.viewSet
//
// Bob Hanson 1/22/2014 7:05:38 AM

	count: 0,
	applets: {},
	sets: {}
};

(function(View) {

// methods called from other modules have no "_" in their name

View.resetView = function(applet, appletNot) {
  debugger;
  if (appletNot) {
  	if (!appletNot._viewSet)
  		return;
    var set = Jmol.View.applets[appletNot._viewSet]
    for (var applet in set) {
      if (applet == appletNot)
        continue;
      Jmol.View.resetView(applet);
    }
    return;
  }
  if (applet) {
  	applet._reset();
    Jmol.View.updateView(applet);
  }
}

View.updateView = function(applet, Info, _View_updateView) {
	// Info.chemID, Info.data, possibly Info.viewID if no chemID
	// return from applet after asynchronous download of new data
	if (applet._viewSet == null)
		return;
  Info || (Info = {});
	Info.chemID || (applet._searchQuery = null);
	Info.data || (Info.data = "N/A");
	Info.type = applet._viewType;
	if((applet._currentView = View.__findView(applet._viewSet, Info)) == null)
		applet._currentView = View.__createViewSet(applet._viewSet, Info.chemID, Info.viewID || Info.chemID);
	applet._currentView[Info.type].data = Info.data;
	applet._currentView[Info.type].smiles = applet._getSmiles();
	if (Jmol.User.viewUpdatedCallback)
		Jmol.User.viewUpdatedCallback(applet, "updateView");
	View.__setView(applet._currentView, applet, false);
}

View.updateFromSync = function(applet, msg) {
	applet._updateMsg = msg;
	var id = Jmol._getAttr(msg, "sourceID") || Jmol._getAttr(msg, "file");
	if (!id)
		return;
	var view = View.__findView(applet._viewSet, {viewID:id});
	if (view == null)
		return Jmol.updateView(applet, msg); // JSV has been updated internally
	if (view != applet._currentView)
		View.__setView(view, applet, true);
	var A = ((id = Jmol._getAttr(msg, "atoms")) && msg.indexOf("selectionhalos ON") >= 0  
		? eval("[" + id + "]") : []);
	setTimeout(function(){if (applet._currentView == view)View.updateAtomPick(applet, A)}, 10);
	if (Jmol.User.viewUpdatedCallback)
		Jmol.User.viewUpdatedCallback(applet, "updateFromSync");
}

View.updateAtomPick = function(applet, A, _View_updateAtomPick) {
	var view = applet._currentView;
	if (view == null)
		return;
	for (var viewType in view) {
		if (viewType != "info" && view[viewType].applet != applet)
			view[viewType].applet._updateAtomPick(A);
	}
	if (Jmol.User.viewUpdatedCallback)
		Jmol.User.viewUpdatedCallback(applet, "updateAtomPick");
}

View.dumpViews = function(setID) {
	var views = View.sets[setID];
	if (!views)
	  return;
	var s = "View set " + setID + ":\n";
	var applets = View.applets[setID];
	for (var i in applets)
		s += "\napplet " + applets[i]._id
			+ " currentView=" + (applets[i]._currentView ? applets[i]._currentView.info.viewID : null);
	for (var i = views.length; --i >= 0;) {
		var view = views[i];
		s += "\n\n<b>view=" + i 
			+ " viewID=" + view.info.viewID 
			+ " chemID=" + view.info.chemID + "</b>\n"
		var v;
		for (var viewType in view) 
			if (viewType != "info")
				s += "\nview=" + i + " type=" + viewType + " applet=" 
					+ ((v = view[viewType]).applet ? v.applet._id : null) 
					+ " SMILES=" + v.smiles + "\n"
					+ " atomMap=" + JSON.stringify(v.atomMap) + "\n"
					+ " data=\n" + v.data + "\n"
	}
	return s
}


// methods starting with "__" are "private" to JSmolCore.js

View.__init = function(applet) {
  var set = applet._viewSet;
	var a = View.applets;
	a[set] || (a[set] = {});
	a[set][applet._viewType] = applet;
}

View.__findView = function(set, Info) {
	var views = View.sets[set];
	if (views == null)
		views = View.sets[set] = [];
	for (var i = views.length; --i >= 0;) {
		var view = views[i];
		if (Info.viewID) {
			if (view.info.viewID == Info.viewID)
				return view;
		} else if (Info.chemID != null && Info.chemID == view.info.chemID) {
				return view;
		} else {
			for (var viewType in view) { 
				if (viewType != "info") {
					if (Info.data != null && view[viewType].data != null ? Info.data == view[viewType].data 
						: Info.type == viewType)
							return view;
				}
			}
		}
	}
	return null;  
}

View.__createViewSet = function(set, chemID, viewID, _createViewSet) {
	View.count++;
	var view = {info:{chemID: chemID, viewID: viewID || "model_" + View.count}};

	for (var id in Jmol._applets) {
		var a = Jmol._applets[id];
		if (a._viewSet == set)
			view[a._viewType] = {applet:a, data: null};
	}
	View.sets[set].push(view);
	return view;
}

View.__setView = function(view, applet, isSwitch, _setView) {
	// called from Jmol._searchMol and Jmol.View.setCurrentView 
	// to notify the applets in the set that there may be new data for them
	// skip the originating applet itself and cases where the data has not changed.
	// stop at first null data, because that will initiate some sort of asynchronous
	// call that will be back here afterward.

	for (var viewType in view) {
			if (viewType == "info") 
				continue;
		var rec = view[viewType];
		var a = rec.applet;
		var modified = (isSwitch || a != null && a._molData == "<modified>");

		if (a == null || a == applet && !modified)
			continue; // may be a mol3d required by JSV but not having a corresponding applet
		var wasNull = (rec.data == null);
		var haveView = (a._currentView != null);
		a._currentView = view; 
		if (haveView && view[viewType].data == rec.data && !wasNull & !modified)
			continue;
		a._loadModelFromView(view);
		if (wasNull)
			break;
	}

	// Either all are taken care of or one was null,
	// in which case we have started an asynchronous
	// process to get the data, and we can quit here.
	// In either case, we are done.
}

}) (Jmol.View);

Jmol.Cache = {fileCache: {}};

Jmol.Cache.get = function(filename) {
	return Jmol.Cache.fileCache[filename];
}

Jmol.Cache.put = function(filename, data) {
  Jmol.Cache.fileCache[filename] = data;
}

	Jmol.Cache.setDragDrop = function(me) {
		Jmol.$appEvent(me, "appletdiv", "dragover", function(e) {
			e = e.originalEvent;
			e.stopPropagation();
			e.preventDefault();
			e.dataTransfer.dropEffect = 'copy';
		});
		Jmol.$appEvent(me, "appletdiv", "drop", function(e) {
			var oe = e.originalEvent;
			oe.stopPropagation();
			oe.preventDefault();
			var file = oe.dataTransfer.files[0];
			if (file == null) {
				// FF and Chrome will drop an image here
				// but it will be only a URL, not an actual file. 
				try {
				  file = "" + oe.dataTransfer.getData("text");
				  if (file.indexOf("file:/") == 0 || file.indexOf("http:/") == 0 || file.indexOf("https:/") == 0) {
				  	me._scriptLoad(file);
				  	return;
			  	}
				} catch(e) {
				  return;
				}
			  // some other format
			  return;
			}
			// MSIE will drop an image this way, though, and load it!
			var reader = new FileReader();
			reader.onloadend = function(evt) {
				if (evt.target.readyState == FileReader.DONE) {
					var cacheName = "cache://DROP_" + file.name;
					var bytes = Clazz.newByteArray(-1, evt.target.result);
					if (!cacheName.endsWith(".spt"))
						me._appletPanel.cacheFileByName("cache://DROP_*",false);
					if (me._viewType == "JSV" || cacheName.endsWith(".jdx")) // shared by Jmol and JSV
						Jmol.Cache.put(cacheName, bytes);
					else
						me._appletPanel.cachePut(cacheName, bytes);
					var xym = Jmol._jsGetXY(me._canvas, e);
					if(xym && (!me._appletPanel.setStatusDragDropped || me._appletPanel.setStatusDragDropped(0, xym[0], xym[1], cacheName))) {
						me._appletPanel.openFileAsyncSpecial(cacheName, 1);
					}
				}
			};
			reader.readAsArrayBuffer(file);
		});
	}
  
})(Jmol, jQuery);
Jmol._debugCode = false;
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
// JmolApplet.js -- Jmol._Applet and Jmol._Image

// BH 1/28/2018 7:15:09 AM adding _notifyAudioEnded
// BH 2/14/2016 12:31:02 PM fixed local reader not disappearing after script call
// BH 2/14/2016 12:30:41 PM Info.appletLoadingImage: "j2s/img/JSmol_spinner.gif", // can be set to "none" or some other image
// BH 2/14/2016 12:27:09 PM Jmol.setCursor, proto._getSpinner 
// BH 1/15/2016 4:23:14 PM adding Info.makeLiveImage
// BH 4/17/2015 2:33:32 PM update for SwingJS 
// BH 10/19/2014 8:08:51 PM moved applet._cover and applet._displayCoverImage to 
// BH 5/8/2014 11:20:21 AM trying to fix AH nd JG problem with multiple applets
// BH 1/27/2014 8:36:43 AM adding Info.viewSet
// BH 12/13/2013 9:04:53 AM _evaluate DEPRECATED (see JSmolApi.js Jmol.evaulateVar
// BH 11/24/2013 11:41:31 AM streamlined createApplet, with added JNLP for local reading
// BH 10/11/2013 7:17:10 AM streamlined and made consistent with JSV and JSME
// BH 7/16/2012 1:50:03 PM adds server-side scripting for image
// BH 8/11/2012 11:00:01 AM adds Jmol._readyCallback for MSIE not in Quirks mode
// BH 8/12/2012 3:56:40 AM allows .min.png to be replaced by .all.png in Image file name
// BH 8/13/2012 6:16:55 PM fix for no-java message not displaying
// BH 11/18/2012 1:06:39 PM adds option ">" in database query box for quick command execution
// BH 12/17/2012 6:25:00 AM change ">" option to "!"

;(function (Jmol, document) {

	// _Applet -- the main, full-featured, Jmol object

	Jmol._Applet = function(id, Info, checkOnly){
		window[id] = this;
		this._jmolType = "Jmol._Applet" + (Info.isSigned ? " (signed)" : "");
		this._viewType = "Jmol";
		this._isJava = true;
		this._syncKeyword = "Select:";
		this._availableParams = ";progressbar;progresscolor;boxbgcolor;boxfgcolor;allowjavascript;boxmessage;\
									;messagecallback;pickcallback;animframecallback;appletreadycallback;atommovedcallback;\
									;echocallback;evalcallback;hovercallback;language;loadstructcallback;measurecallback;\
									;minimizationcallback;resizecallback;scriptcallback;statusform;statustext;statustextarea;\
									;synccallback;usecommandthread;syncid;appletid;startupscript;menufile;";
		if (checkOnly)
			return this;
		this._isSigned = Info.isSigned;
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
			Jmol._jarFile && (jarFile = Jmol._jarFile);
			if(this._jarFile) {
				var f = this._jarFile;
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
				this_isSigned = Info.isSigned = (jarFile.indexOf("Signed") >= 0);
			}
 			this._jarPath = Info.jarPath = jarPath || ".";
			this._jarFile = Info.jarFile = (typeof(jarFile) == "string" ? jarFile : (jarFile ?  "JmolAppletSigned" : "JmolApplet") + "0.jar");
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
			readyFunction: null,
			use: "HTML5",//other options include JAVA, WEBGL, and IMAGE
			jarPath: "java",
			jarFile: "JmolApplet0.jar",
			isSigned: false,
			j2sPath: "j2s",
			coverImage: null,     // URL for image to display
      makeLiveImage: null,  // URL for small image to click to make live (defaults to j2s/img/play_make_live.jpg)
			coverTitle: "",       // tip that is displayed before model starts to load
			coverCommand: "",     // Jmol command executed upon clicking image
			deferApplet: false,   // true == the model should not be loaded until the image is clicked
			deferUncover: false,  // true == the image should remain until command execution is complete 
			disableJ2SLoadMonitor: false,
			disableInitialConsole: true, // new default since now we have the spinner 2/14/2016 12:26:28 PM
      //appletLoadingImage: "j2s/img/JSmol_spinner.gif", // can be set to "none" or some other image
			debug: false
		};	 
		Jmol._addDefaultInfo(Info, DefaultInfo);
		Jmol._debugAlert = Info.debug;

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
				applet = Applet._getCanvas(id, Info, checkOnly, true);
				break;
			case "HTML5":               
  			if (Jmol.featureDetection.allowHTML5){
				  applet = Applet._getCanvas(id, Info, checkOnly, false);
        } else {
          List.push("JAVA");
        }
				break;
//			case "IMAGE":
//				applet = new Jmol._Image(id, Info, checkOnly);
//				break;
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
    Info._platform = "J.awtjs2d.Platform";
		if (webGL && Jmol.featureDetection.supportsWebGL()) {
			Jmol._Canvas3D.prototype = Jmol.GLmol.extendApplet(Jmol._jsSetPrototype(new Applet(id, Info, true)));
			return new Jmol._Canvas3D(id, Info, "Jmol", checkOnly);
		}
		if (!webGL) {
			Jmol._Canvas2D.prototype = Jmol._jsSetPrototype(new Applet(id, Info, true));
			return new Jmol._Canvas2D(id, Info, "Jmol", checkOnly);
		}
		return null;
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
			//jnlp = " jnlp_href=\"" + jarFile.replace(/\.jar/,".jnlp") + "\"";
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
		if (applet._deferApplet)
			applet._javaCode = t, t="";
		t = Jmol._getWrapper(applet, true) + t + Jmol._getWrapper(applet, false) 
			+ (Info.addSelectionOptions ? Jmol._getGrabberOptions(applet) : "");
		if (Jmol._debugAlert)
			alert (t);
		applet._code = Jmol._documentWrite(t);
	}

	proto._newApplet = function(viewerOptions) {
		if (!this._is2D)  
			viewerOptions.put("script", (viewerOptions.get("script") || "") + ";set multipleBondSpacing 0.35;");
		this._viewerOptions = viewerOptions;
		return new J.appletjs.Jmol(viewerOptions);
	}
	
	proto._addCoreFiles = function() {
		Jmol._addCoreFile("jmol", this._j2sPath, this.__Info.preloadCore);
		if (!this._is2D) {
	 		Jmol._addExec([this, null, "J.export.JSExporter","load JSExporter"])
	//		Jmol._addExec([this, this.__addExportHook, null, "addExportHook"])
		}
		if (Jmol._debugCode)
			Jmol._addExec([this, null, "J.appletjs.Jmol", "load Jmol"]);
  }
  
	proto._create = function(id, Info){
		Jmol._setObject(this, id, Info);
		var params = {
			syncId: Jmol._syncId,
			progressbar: "true",                      
			progresscolor: "blue",
			boxbgcolor: this._color || "black",
			boxfgcolor: "white",
			boxmessage: "Downloading JmolApplet ...",
			script: (this._color ? "background \"" + this._color +"\"": ""),
			code: "JmolApplet.class"
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

	proto._restoreState = function(clazzName, state) {
		System.out.println("\n\nasynchronous restore state for " + clazzName + " " + state)
		var applet = this;
		var vwr = applet._applet && applet._applet.viewer;
		switch (state) {
		case "setOptions":
			return function(_setOptions) {applet.__startAppletJS(applet)};
		case "render":
			return function() {setTimeout(function(){vwr.refresh(2)},10)};
		default:
			switch (clazzName) {
			// debug mode only, when core.z.js has not been loaded and prior to start
			case "J.shape.Balls":
			case "J.shape.Sticks":
			case "J.shape.Frank":
				return null;
			}
			
			//if (vwr.rm.repaintPending)
				//return function() {setTimeout(function(){vwr.refresh(2)},10)};
			if (vwr && vwr.isScriptExecuting && vwr.isScriptExecuting()) {
				if (Jmol._asyncCallbacks[clazzName]) {
					System.out.println("...ignored");
					return 1;
				}
				var sc = vwr.getEvalContextAndHoldQueue(vwr.eval);
				var pc = sc.pc - 1;
				sc.asyncID = clazzName;
				Jmol._asyncCallbacks[clazzName] = function(pc) {sc.pc=pc; System.out.println("sc.asyncID="+sc.asyncID+" sc.pc = " + sc.pc);vwr.eval.resumeEval(sc)};
				vwr.eval.pc = vwr.eval.pcEnd;
				System.out.println("setting resume for pc=" + sc.pc + " " + clazzName + " to " + Jmol._asyncCallbacks[clazzName] + "//" )
				return function() {System.out.println("resuming " + clazzName + " " + Jmol._asyncCallbacks[clazzName]);Jmol._asyncCallbacks[clazzName](pc)};					
			}
			System.out.println(clazzName + "?????????????????????" + state)
			return function() {setTimeout(function(){vwr.refresh(2)},10)};
			//return null;
		}
	}

  proto._notifyAudioEnded = function(htParams) {
    this._applet.notifyAudioEnded(htParams);
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
			this._script('load "' + this._src + '"');
		this._showInfo(true);
		this._showInfo(false);
		Jmol.Cache.setDragDrop(this);
		this._readyFunction && this._readyFunction(this);
		Jmol._setReady(this);
		var app = this._2dapplet;
		if (app && app._isEmbedded && app._ready && app.__Info.visible) {
      var me = this;
      // for some reason, JSME doesn't get the width/height correctly the first time
			me._show2d(true);me._show2d(false);me._show2d(true);
    }
    Jmol._hideLoadingSpinner(this);
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

	proto._show2d = function(tf) {
		this._2dapplet._show2d(tf);
		if (this._2dapplet._isEmbedded) {
			this._showInfo(false);
			this._show(!tf);
			// for whatever reason this must be here
			this._2dapplet.__showContainer(true, true);
		}
	}

  proto._getSpinner = function() {
    return (this.__Info.appletLoadingImage || this._j2sPath + "/img/JSmol_spinner.gif");
  }

  proto._getAtomCorrelation = function(molData, isC13) {
    // get the first atom mapping available by loading the model structure into model 2, 

    var n = this._evaluate("{*}.count");
    if (n == 0)return;

    this._loadMolData(molData, "atommap = compare({1.1} {2.1} 'MAP' " + (isC13 ? "" : "'H'") + "); zap 2.1", true);
    var map = this._evaluate("atommap");
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
		this._readyScript += script;
		return true;
	}

	proto._script = function(script) {
		if (!this._ready)
				return this._addScript(script);
		Jmol._setConsoleDiv(this._console);
    Jmol._hideLocalFileReader(this);
		this._applet.script(script);
	}

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

	proto._evaluateDEPRECATED = function(molecularMath) {   // DEPRECATED!!!	
	// DEPRECATED!!!	
		//carries out molecular math on a model
		var result = "" + this._getPropertyAsJavaObject("evaluate", molecularMath);
		var s = result.replace(/\-*\d+/, "");
		if(s == "" && !isNaN(parseInt(result)))
			return parseInt(result);
		var s = result.replace(/\-*\d*\.\d*/, "")
		if(s == "" && !isNaN(parseFloat(result)))
			return parseFloat(result);
		return result;
	// DEPRECATED!!!	
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
		if (this._2dapplet && this._2dapplet._isEmbedded && !Jmol.$(this, "appletdiv:visible")[0])
			return this._2dapplet._searchDatabase(query, database, script); 
		this._showInfo(false);
		if (query.indexOf("?") >= 0) {
			Jmol._getInfoFromDatabase(this, database, query.split("?")[0]);
			return;
		}
		script || (script = Jmol._getScriptForDatabase(database));
		var dm = database + query;
		this._currentView = null;
		this._searchQuery = dm;
 		this._loadFile(dm, script, dm);
	}

	proto._loadFile = function(fileName, script, chemID, _jmol_loadFile){
		this._showInfo(false);
		script || (script = "");
		this._thisJmolModel = "" + Math.random();
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
		if (doscript)
			this._script("zap;set echo middle center;echo Retrieving data...");
		if (!this._isSigned || this._viewSet != null)
			return false;
		if (doscript)
			this._script("load async \"" + file + "\";" + script);
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
			// first component only
			script += ";if ({*}.molecule.max > 1 || {*}.modelindex.max > 0){ delete molecule > 1 or modelindex > 0;x = getProperty('extractModel',{*});load inline @x};"
		}
		if (!script && this._noscript) {
			this._applet.loadInlineString(mol, "", false);
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

  proto._reset = function(_jmol_resetView) {
    this._scriptWait("zap", true);
  }
  
	proto._updateView = function(_jmol_updateView) {
		if (this._viewSet == null || !this._applet)
			return;
		// called from model change without chemical identifier, possibly by user action and call to Jmol.updateView(applet)
		chemID = "" + this._getPropertyAsJavaObject("variableInfo","script('show chemical inchiKey')");
		if (chemID.length < 36) // InChIKey=RZVAJINKPMORJF-BGGKNDAXNA-N
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

	proto._cover = function (doCover) {
		if (doCover || !this._deferApplet) {
			this._displayCoverImage(doCover);
			return;
		}
		// uncovering UNMADE applet upon clicking image
		var s = (this._coverScript ? this._coverScript : "");
		this._coverScript = "";
		if (this._deferUncover)
			s += ";refresh;javascript " + this._id + "._displayCoverImage(false)";
		this._script(s, true);
		if (this._deferUncover && this._coverTitle == "activate 3D model")
			Jmol._getElement(this, "coverimage").title = "3D model is loading...";
		if (!this._isJava)
			this._newCanvas(false);
		if (this._defaultModel)	
			Jmol._search(this, this._defaultModel);
		this._showInfo(false);
		if (!this._deferUncover)
			this._displayCoverImage(false);
		if (this._isJava)
			Jmol.$html(Jmol.$(this, "appletdiv"), this._javaCode);
		if (this._init)
			this._init();
	};

	proto._displayCoverImage = function(TF) {
		if (!this._coverImage || this._isCovered == TF) return;
		this._isCovered = TF;
		Jmol._getElement(this, "coverdiv").style.display = (TF ? "block" : "none");
	};

  proto._getSmiles = function() {
		return this._evaluate("{visible}.find('SMILES')");   
  }
  
  proto._getMol = function() {
		return this._evaluate("getProperty('ExtractModel',{visible})");   
  }

  proto._getMol2D = function() {
		return this._evaluate("script('select visible;show chemical sdf')"); // 2D equivalent no longer!
  }
  
  
})(Jmol._Applet, Jmol._Applet.prototype);

/* ****************************************


	// _Image -- an alternative to _Applet
	// commented out here, as it has found no use

	Jmol._Image = function(id, Info, checkOnly){
		this._jmolType = "image";
		if (checkOnly)
			return this;
		this._create(id, Info);
		return this;
	}

;(function (Image, proto) {

	Jmol._Applet._setCommonMethods(proto);

	proto._create = function(id, Info) {
		Jmol._setObject(this, id, Info);
		thisnfo);
		this._src || (this._src = "");
		var t = Jmol._getWrapper(this, true) 
			+ '<img id="'+id+'_image" width="' + Info.width + '" height="' + Info.height + '" src=""/>'
		 	+	Jmol._getWrapper(this, false)
			+ (Info.addSelectionOptions ? Jmol._getGrabberOptions(this) : "");
		if (Jmol._debugAlert)
			alert (t);
		this._code = Jmol._documentWrite(t);
		this._ready = false;
		if (Jmol._document)
			this._readyCallback(id, null, this._ready = true, null);
	}

	proto._canScript = function(script) {
		var slc = script.toLowerCase().replace(/[\",\']/g, '');
		var ipt = slc.length;
		return (script.indexOf("#alt:LOAD") >= 0 || slc.indexOf(";") < 0 && slc.indexOf("\n") < 0
			&& (slc.indexOf("script ") == 0 || slc.indexOf("load ") == 0)
			&& (slc.indexOf(".png") == ipt - 4 || slc.indexOf(".jpg") == ipt - 4));
	}

	proto._script = function(script) {
		var slc = script.toLowerCase().replace(/[\",\']/g, '');
		// single command only
		// "script ..." or "load ..." only
		// PNG or PNGJ or JPG only
		// automatically switches to .all.png(j) from .min.png(j)
		var ipt = slc.length;
		if (slc.indexOf(";") < 0 && slc.indexOf("\n") < 0
			&& (slc.indexOf("script ") == 0 || slc.indexOf("load ") == 0)
			&& (slc.indexOf(".png") == ipt - 4 || slc.indexOf(".pngj") == ipt - 5 || slc.indexOf(".jpg") == ipt - 4)) {
			var imageFile = script.substring(script.indexOf(" ") + 1);
			ipt = imageFile.length;
			for (var i = 0; i < ipt; i++) {
				switch (imageFile.charAt(i)) {
				case " ":
					continue;
				case '"':
					imageFile = imageFile.substring(i + 1, imageFile.indexOf('"', i + 1))
					i = ipt;
					continue;
				case "'":
					imageFile = imageFile.substring(i + 1, imageFile.indexOf("'", i + 1))
					i = ipt;
					continue;
				default:
					imageFile = imageFile.substring(i)
					i = ipt;
					continue;
				}
			}
			imageFile = imageFile.replace(/\.min\.png/,".all.png")
			document.getElementById(this._id + "_image").src = imageFile
		} else if (script.indexOf("#alt:LOAD ") >= 0) {
			imageFile = script.split("#alt:LOAD ")[1]
			if (imageFile.indexOf("??") >= 0) {
				var db = imageFile.split("??")[0];
				imageFile = prompt(imageFile.split("??")[1], "");
				if (!imageFile)
					return;
				if (!Jmol.db._DirectDatabaseCalls[imageFile.substring(0,1)])
					imageFile = db + imageFile;
			}
			this._loadFile(imageFile);
		}
	}

	proto._show = function(tf) {
		Jmol._getElement(this, "appletdiv").style.display = (tf ? "block" : "none");
	}

	proto._loadFile = function(fileName, params){
		this._showInfo(false);
		this._thisJmolModel = "" + Math.random();
		params = (params ? params : "");
		var database = "";
		if (Jmol._isDatabaseCall(fileName)) {
			database = fileName.substring(0, 1); 
			fileName = Jmol._getDirectDatabaseCall(fileName, false);
		} else if (fileName.indexOf("://") < 0) {
			var ref = document.location.href
			var pt = ref.lastIndexOf("/");
			fileName = ref.substring(0, pt + 1) + fileName;
		}

		var src = Jmol._serverUrl 
				+ "?call=getImageForFileLoad"
				+ "&file=" + escape(fileName)
				+ "&width=" + this._width
				+ "&height=" + this._height
				+ "&params=" + encodeURIComponent(params + ";frank off;");
		Jmol._getElement(this, "image").src = src;
	}

	proto._searchDatabase = function(query, database, script){
		if (query.indexOf("?") == query.length - 1) {
			Jmol._getInfoFromDatabase(this, database, query.split("?")[0]);
			return;
		}
		this._showInfo(false);
		script || (script = Jmol._getScriptForDatabase(database));
		var src = Jmol._serverUrl 
			+ "?call=getImageFromDatabase"
			+ "&database=" + database
			+ "&query=" + query
			+ "&width=" + this._width
			+ "&height=" + this._height
			+ "&script=" + encodeURIComponent(script + ";frank off;");
		Jmol._getElement(this, "image").src = src;
	}
})(Jmol._Image, Jmol._Image.prototype);

************************************ */

	Jmol.jmolSmiles = function(jmol, withStereoChemistry) {
		return jmol._getSmiles();
	}


})(Jmol, document);
// JSmolControls.js
// BH 11/13/2015 7:12:40 PM addded indeterminate checkbox masters
// BH 5/29/2014 8:14:06 AM added default command for command input box
// BH 5/15/2014 -- removed script check prior to execution
// BH 12/3/2013 12:39:48 PM added up/down arrow key-driven command history for commandInput (changed keypress to keydown)
// BH 5/16/2013 8:14:47 AM fix for checkbox groups and default radio names
// BH 8:36 AM 7/27/2012  adds name/id for cmd button 
// BH 8/12/2012 6:51:53 AM adds function() {...} option for all controls:
//    Jmol.jmolButton(jmol, function(jmol) {...}, "xxxx")

(function(Jmol) {

	// private

	var c = Jmol.controls = {

		_hasResetForms: false,	
		_scripts: [""],
		_checkboxMasters: {},
		_checkboxItems: {},
		_actions: {},

		_buttonCount: 0,
		_checkboxCount: 0,
		_radioGroupCount: 0,
		_radioCount: 0,
		_linkCount: 0,
		_cmdCount: 0,
		_menuCount: 0,

		_previousOnloadHandler: null,	
		_control: null,
		_element: null,

		_appletCssClass: null,
		_appletCssText: "",
		_buttonCssClass: null,
		_buttonCssText: "",
		_checkboxCssClass: null,
		_checkboxCssText: "",
		_radioCssClass: null,
		_radioCssText: "",
		_linkCssClass: null,
		_linkCssText: "",
		_menuCssClass: null,
		_menuCssText: ""
	};

	c._addScript = function(appId,script) {
		var index = c._scripts.length;
		c._scripts[index] = [appId, script];
		return index;
	}

	c._getIdForControl = function(appletOrId, script) {
	//alert(appletOrId + " " + typeof appletOrId + " " + script + appletOrId._canScript)
		return (typeof appletOrId == "string" ? appletOrId 
			: !script || !appletOrId._canScript || appletOrId._canScript(script) ? appletOrId._id
			: null);
	}

	c._radio = function(appletOrId, script, labelHtml, isChecked, separatorHtml, groupName, id, title) {
		var appId = c._getIdForControl(appletOrId, script);
		if (appId == null)
			return null;
		++c._radioCount;
		groupName != undefined && groupName != null || (groupName = "jmolRadioGroup" + (c._radioGroupCount - 1));
		if (!script)
			return "";
		id != undefined && id != null || (id = "jmolRadio" + (c._radioCount - 1));
		labelHtml != undefined && labelHtml != null || (labelHtml = script.substring(0, 32));
		separatorHtml || (separatorHtml = "");
		var eospan = "</span>";
		c._actions[id] = c._addScript(appId, script);
		var t = "<span id=\"span_"+id+"\""+(title ? " title=\"" + title + "\"":"")+"><input name='"
			+ groupName + "' id='"+id+"' type='radio'"
			+ " onclick='Jmol.controls._click(this);return true;'"
			+ " onmouseover='Jmol.controls._mouseOver(this);return true;'"
			+ " onmouseout='Jmol.controls._mouseOut()' " +
		 (isChecked ? "checked='true' " : "") + c._radioCssText + " />";
		if (labelHtml.toLowerCase().indexOf("<td>")>=0) {
			t += eospan;
			eospan = "";
		}
		t += "<label for=\"" + id + "\">" + labelHtml + "</label>" +eospan + separatorHtml;
		return t;
	}

/////////// events //////////

	c._scriptExecute = function(element, scriptInfo) {
		var applet = Jmol._applets[scriptInfo[0]];
		var script = scriptInfo[1];
		if (typeof(script) == "object")
			script[0](element, script, applet);
		else if (typeof(script) == "function")
			script(applet);
		else
			Jmol.script(applet, script);
	}

	c.__checkScript = function(applet, d) {
		var ok = (d.value.indexOf("JSCONSOLE ") >= 0 || applet._scriptCheck(d.value) === "");
		d.style.color = (ok ? "black" : "red");
		return ok;
	} 

	c.__getCmd = function(dir, d) {
		if (!d._cmds || !d._cmds.length)return
		var s = d._cmds[d._cmdpt = (d._cmdpt + d._cmds.length + dir) % d._cmds.length]
		setTimeout(function(){d.value = s},10);    
		d._cmdadd = 1;
		d._cmddir = dir;
	}

	c._commandKeyPress = function(e, id, appId) {
	var keycode = (e == 13 ? 13 : window.event ? window.event.keyCode : e ? e.keyCode || e.which : 0);
	var d = document.getElementById(id);
		var applet = Jmol._applets[appId];
	switch (keycode) {
	case 13:
		var v = d.value;
		if ((c._scriptExecute(d, [appId, v]) || 1)) {
			 if (!d._cmds){
				 d._cmds = [];
				 d._cmddir = 0;
				 d._cmdpt = -1;
				 d._cmdadd = 0;      
	}
			 if (v && d._cmdadd == 0) {
					++d._cmdpt;
					d._cmds.splice(d._cmdpt, 0, v);
					d._cmdadd = 0;
					d._cmddir = 0;
			 } else {
					//d._cmdpt -= d._cmddir;
					d._cmdadd = 0;
			 }
			 d.value = "";
		}
		return false;
	case 27:
		setTimeout(function() {d.value = ""}, 20);
		return false;
	case 38: // up
		c.__getCmd(-1, d);
		break;
	case 40: // dn
		c.__getCmd(1, d);
		break;
	default:
		d._cmdadd = 0;
	}
	setTimeout(function() {c.__checkScript(applet, d)}, 20);
	return true;
 }

	c._click = function(obj, scriptIndex) {
		c._element = obj;
		if (arguments.length == 1)
			scriptIndex = c._actions[obj.id];
		c._scriptExecute(obj, c._scripts[scriptIndex]);
	}

	c._menuSelected = function(menuObject) {
		var scriptIndex = menuObject.value;
		if (scriptIndex != undefined) {
			c._scriptExecute(menuObject, c._scripts[scriptIndex]);
			return;
		}
		var len = menuObject.length;
		if (typeof len == "number")
			for (var i = 0; i < len; ++i)
				if (menuObject[i].selected) {
					c._click(menuObject[i], menuObject[i].value);
					return;
				}
		alert("?Que? menu selected bug #8734");
	}

	c._cbNotifyMaster = function(m){
  	//called when a group item is checked
    var allOn = true;
    var allOff = true;
    var mixed = false;
    var cb;
    for (var id in m.chkGroup){ //siblings of m
      cb = m.chkGroup[id]; 
		  if (cb.checked)
        allOff = false;
      else
        allOn = false;
      if (cb.indeterminate)
        mixed = true;
		}
	  cb = m.chkMaster;
		if (allOn) { cb.checked = true; }
		else if (allOff) { cb.checked = false; }
		else { mixed = true; }
		cb.indeterminate = mixed;
    (m = c._checkboxItems[cb.id]) && (cb = m.chkMaster) 
      && c._cbNotifyMaster(c._checkboxMasters[cb.id])
	}
  
	c._cbNotifyGroup = function(m, isOn){
		//called when a master item is checked
		for (var chkBox in m.chkGroup){
			var item = m.chkGroup[chkBox]
			if (item.checked != isOn) {
				item.checked = isOn;
				c._cbClick(item);
			}
			if (c._checkboxMasters[item.id])
				c._cbNotifyGroup(c._checkboxMasters[item.id], isOn)
		}
	}

	c._cbSetCheckboxGroup = function(chkMaster, chkboxes, args){
		var id = chkMaster;
		if(typeof(id)=="number")id = "jmolCheckbox" + id;
		chkMaster = document.getElementById(id);
		if (!chkMaster)alert("jmolSetCheckboxGroup: master checkbox not found: " + id);
		var m = c._checkboxMasters[id] = {};
		m.chkMaster = chkMaster;
		m.chkGroup = {};
		var i0;
		if (typeof(chkboxes)=="string") {
			chkboxes = args;
			i0 = 1;
		} else {
			i0 = 0;
		}
		for (var i = i0; i < chkboxes.length; i++){
			var id = chkboxes[i];
			if(typeof(id)=="number")id = "jmolCheckbox" + id;
			var checkboxItem = document.getElementById(id);
			if (!checkboxItem)alert("jmolSetCheckboxGroup: group checkbox not found: " + id);
			m.chkGroup[id] = checkboxItem;
			c._checkboxItems[id] = m;
		}
	}

	c._cbClick = function(ckbox) {
		c._control = ckbox;
		var whenChecked = c._actions[ckbox.id][0];
		var whenUnchecked = c._actions[ckbox.id][1];
		c._click(ckbox, ckbox.checked ? whenChecked : whenUnchecked);
		if(c._checkboxMasters[ckbox.id])
			c._cbNotifyGroup(c._checkboxMasters[ckbox.id], ckbox.checked)
		if(c._checkboxItems[ckbox.id])
			c._cbNotifyMaster(c._checkboxItems[ckbox.id])
	}

	c._cbOver = function(ckbox) {
		var whenChecked = c._actions[ckbox.id][0];
		var whenUnchecked = c._actions[ckbox.id][1];
		window.status = c._scripts[ckbox.checked ? whenUnchecked : whenChecked];
	}

	c._mouseOver = function(obj, scriptIndex) {
		if (arguments.length == 1)
			scriptIndex = c._actions[obj.id];
		window.status = c._scripts[scriptIndex];
	}

	c._mouseOut = function() {
		window.status = " ";
		return true;
	}

// from JmolApplet

	c._onloadResetForms = function() {
		// must be evaluated ONLY once -- is this compatible with jQuery?
		if (c._hasResetForms)
			return;
		c._hasResetForms = true;
		c._previousOnloadHandler = window.onload;
		window.onload = function() {
			if (c._buttonCount+c._checkboxCount+c._menuCount+c._radioCount+c._radioGroupCount > 0) {
				var forms = document.forms;
				for (var i = forms.length; --i >= 0; )
					forms[i].reset();
			}
			if (c._previousOnloadHandler)
				c._previousOnloadHandler();
		}
	}

// from JmolApi

	c._getButton = function(appletOrId, script, label, id, title) {
		var appId = c._getIdForControl(appletOrId, script);
		if (appId == null)
			return "";
		//_jmolInitCheck();
		id != undefined && id != null || (id = "jmolButton" + c._buttonCount);
		label != undefined && label != null || (label = script.substring(0, 32));
		++c._buttonCount;
		c._actions[id] = c._addScript(appId, script);
		var t = "<span id=\"span_"+id+"\""+(title ? " title=\"" + title + "\"":"")+"><input type='button' name='" + id + "' id='" + id +
						"' value='" + label +
						"' onclick='Jmol.controls._click(this)' onmouseover='Jmol.controls._mouseOver(this);return true' onmouseout='Jmol.controls._mouseOut()' " +
						c._buttonCssText + " /></span>";
		if (Jmol._debugAlert)
			alert(t);
		return Jmol._documentWrite(t);
	}

	c._getCheckbox = function(appletOrId, scriptWhenChecked, scriptWhenUnchecked,
			labelHtml, isChecked, id, title) {

		var appId = c._getIdForControl(appletOrId, scriptWhenChecked);
		if (appId != null)
			appId = c._getIdForControl(appletOrId, scriptWhenUnchecked);
		if (appId == null)
			return "";

		//_jmolInitCheck();
		id != undefined && id != null || (id = "jmolCheckbox" + c._checkboxCount);
		++c._checkboxCount;
		if (scriptWhenChecked == undefined || scriptWhenChecked == null ||
				scriptWhenUnchecked == undefined || scriptWhenUnchecked == null) {
			alert("jmolCheckbox requires two scripts");
			return;
		}
		if (labelHtml == undefined || labelHtml == null) {
			alert("jmolCheckbox requires a label");
			return;
		}
		c._actions[id] = [c._addScript(appId, scriptWhenChecked),c._addScript(appId, scriptWhenUnchecked)];
		var eospan = "</span>"
		var t = "<span id=\"span_"+id+"\""+(title ? " title=\"" + title + "\"":"")+"><input type='checkbox' name='" + id + "' id='" + id +
						"' onclick='Jmol.controls._cbClick(this)" +
						"' onmouseover='Jmol.controls._cbOver(this)" +
						";return true' onmouseout='Jmol.controls._mouseOut()' " +
			(isChecked ? "checked='true' " : "")+ c._checkboxCssText + " />"
		if (labelHtml.toLowerCase().indexOf("<td>")>=0) {
			t += eospan
			eospan = "";
		}
		t += "<label for=\"" + id + "\">" + labelHtml + "</label>" +eospan;
		if (Jmol._debugAlert)
			alert(t);
		return Jmol._documentWrite(t);
	}

	c._getCommandInput = function(appletOrId, label, size, id, title, cmd0) {
		var appId = c._getIdForControl(appletOrId, "x");
		if (appId == null)
			return "";
		//_jmolInitCheck();
		id != undefined && id != null || (id = "jmolCmd" + c._cmdCount);
		label != undefined && label != null || (label = "Execute");
		size != undefined && !isNaN(size) || (size = 60);
		cmd0 != undefined || (cmd0 = "help");
		++c._cmdCount;
		var t = "<span id=\"span_"+id+"\""+(title ? " title=\"" + title + "\"":"")+"><input name='" + id + "' id='" + id +
						"' size='"+size+"' onkeydown='return Jmol.controls._commandKeyPress(event,\""+id+"\",\"" + appId + "\")' value='" + cmd0 + "'/><input " +
						" type='button' name='" + id + "Btn' id='" + id + "Btn' value = '"+label+"' onclick='Jmol.controls._commandKeyPress(13,\""+id+"\",\"" + appId + "\")' /></span>";
		if (Jmol._debugAlert)
			alert(t);
		return Jmol._documentWrite(t);
	}

	c._getLink = function(appletOrId, script, label, id, title) {
		var appId = c._getIdForControl(appletOrId, script);
		if (appId == null)
			return "";
		//_jmolInitCheck();
		id != undefined && id != null || (id = "jmolLink" + c._linkCount);
		label != undefined && label != null || (label = script.substring(0, 32));
		++c._linkCount;
		var scriptIndex = c._addScript(appId, script);
		var t = "<span id=\"span_"+id+"\""+(title ? " title=\"" + title + "\"":"")+"><a name='" + id + "' id='" + id +
						"' href='javascript:Jmol.controls._click(null,"+scriptIndex+");' onmouseover='Jmol.controls._mouseOver(null,"+scriptIndex+");return true;' onmouseout='Jmol.controls._mouseOut()' " +
						c._linkCssText + ">" + label + "</a></span>";
		if (Jmol._debugAlert)
			alert(t);
		return Jmol._documentWrite(t);
	}

	c._getMenu = function(appletOrId, arrayOfMenuItems, size, id, title) {
		var appId = c._getIdForControl(appletOrId, null);
		var optgroup = null;
		//_jmolInitCheck();
		id != undefined && id != null || (id = "jmolMenu" + c._menuCount);
		++c._menuCount;
		var type = typeof arrayOfMenuItems;
		if (type != null && type == "object" && arrayOfMenuItems.length) {
			var len = arrayOfMenuItems.length;
			if (typeof size != "number" || size == 1)
				size = null;
			else if (size < 0)
				size = len;
			var sizeText = size ? " size='" + size + "' " : "";
			var t = "<span id=\"span_"+id+"\""+(title ? " title=\"" + title + "\"":"")+"><select name='" + id + "' id='" + id +
							"' onChange='Jmol.controls._menuSelected(this)'" +
							sizeText + c._menuCssText + ">";
			for (var i = 0; i < len; ++i) {
				var menuItem = arrayOfMenuItems[i];
				type = typeof menuItem;
				var script = null;
				var text = null;
				var isSelected = null;
				if (type == "object" && menuItem != null) {
					script = menuItem[0];
					text = menuItem[1];
					isSelected = menuItem[2];
				} else {
					script = text = menuItem;
				}
				appId = c._getIdForControl(appletOrId, script);
				if (appId == null)
					return "";
				text == null && (text = script);
				if (script=="#optgroup") {
					t += "<optgroup label='" + text + "'>";
				} else if (script=="#optgroupEnd") {
					t += "</optgroup>";
				} else {
					var scriptIndex = c._addScript(appId, script);
					var selectedText = isSelected ? "' selected='true'>" : "'>";
					t += "<option value='" + scriptIndex + selectedText + text + "</option>";
				}
			}
			t += "</select></span>";
			if (Jmol._debugAlert)
				alert(t);
			return Jmol._documentWrite(t);
		}
	}

	c._getRadio = function(appletOrId, script, labelHtml, isChecked, separatorHtml, groupName, id, title) {
		//_jmolInitCheck();
		if (c._radioGroupCount == 0)
			++c._radioGroupCount;
		groupName || (groupName = "jmolRadioGroup" + (c._radioGroupCount - 1));
		var t = c._radio(appletOrId, script, labelHtml, isChecked, separatorHtml, groupName, (id ? id : groupName + "_" + c._radioCount), title ? title : 0);
		if (t == null)
			return "";
		if (Jmol._debugAlert)
			alert(t);
		return Jmol._documentWrite(t);
	}

	c._getRadioGroup = function(appletOrId, arrayOfRadioButtons, separatorHtml, groupName, id, title) {
		/*

			array: [radio1,radio2,radio3...]
			where radioN = ["script","label",isSelected,"id","title"]

		*/

		//_jmolInitCheck();
		var type = typeof arrayOfRadioButtons;
		if (type != "object" || type == null || ! arrayOfRadioButtons.length) {
			alert("invalid arrayOfRadioButtons");
			return;
		}
		separatorHtml != undefined && separatorHtml != null || (separatorHtml = "&#xa0; ");
		var len = arrayOfRadioButtons.length;
		++c._radioGroupCount;
		groupName || (groupName = "jmolRadioGroup" + (c._radioGroupCount - 1));
		var t = "<span id='"+(id ? id : groupName)+"'>";
		for (var i = 0; i < len; ++i) {
			if (i == len - 1)
				separatorHtml = "";
			var radio = arrayOfRadioButtons[i];
			type = typeof radio;
			var s = null;
			if (type == "object") {
				t += (s = c._radio(appletOrId, radio[0], radio[1], radio[2], separatorHtml, groupName, (radio.length > 3 ? radio[3]: (id ? id : groupName)+"_"+i), (radio.length > 4 ? radio[4] : 0), title));
			} else {
				t += (s = c._radio(appletOrId, radio, null, null, separatorHtml, groupName, (id ? id : groupName)+"_"+i, title));
			}
			if (s == null)
				return "";
		}
		t+="</span>"
		if (Jmol._debugAlert)
			alert(t);
		return Jmol._documentWrite(t);
	}


})(Jmol);
// JmolApi.js -- Jmol user functions  Bob Hanson hansonr@stolaf.edu

// BH 1/19/2017 8:05:05 AM <br>
// BH 4/1/2016 12:59:45 PM fix applet_or_identifier reference in Jmol.getChemicalInfo
// BH 5/29/2014 8:14:06 AM added default command for command input box
// BH 3/10/2014 10:35:25 AM adds Jmol.saveImage(applet)
// BH 1/22/2014 7:31:59 AM Jmol._Image removed -- just never found useful to have
//    a server-side process with only a client-side image. Response time is too slow.
// BH 12/13/2013 8:39:00 AM Jmol.evaulate is DEPRECATED -- use Jmol.evaluateVar
// BH 11/25/2013 6:55:53 AM adds URL flags _USE=, _JAR=, _J2S=
// BH 9/3/2013 5:48:03 PM simplification of Jmol.getAppletHTML()
// BH 5/16/2013 9:01:41 AM checkbox group fix
// BH 1/15/2013 10:55:06 AM updated to default to HTML5 not JAVA

// This file is part of JSmol.min.js. 
// If you do not use that, then along with this file you need several other files. See JSmolCore.js for details.

// default settings are below. Generally you would do something like this:

// jmol = "jmol"
// Info = {.....your settings if not default....}
// Jmol.jmolButton(jmol,....)
// jmol = Jmol.getApplet(jmol, Info)
// Jmol.script(jmol,"....")
// Jmol.jmolLink(jmol,....)
// etc. 
// first parameter is always the applet id, either the string "jmol" or the object defined by Jmol.getApplet()
// no need for waiting to start giving script commands. You can also define a callback function as part of Info.

// see JmolCore.js for details

// BH 8/12/2012 5:15:11 PM added Jmol.getAppletHtml()

;(function (Jmol) {
	var getField = function(key) {
		key = "&" + key + "=";
		return decodeURI(("&" + document.location.search.substring(1) + key).split(key)[1].split("&")[0]);
	}
	Jmol._j2sPath = getField("_J2S");
		// allows URL-line setting of Info.j2sPath
	Jmol._jarFile = getField("_JAR");
		// allows URL-line setting of Info.jarPath and Info.jarFile
	Jmol._use = getField("_USE");
		// allows URL-line setting of Info.use
		// defaults to "HTML5"
		// looking for "_USE=xxxx" 
		// _USE=SIGNED implies JAVA, sets Info.isSigned, and adds "Signed" to applet jar name if necessary

	Jmol.getVersion = function(){return Jmol._jmolInfo.version};

	Jmol.getApplet = function(id, Info, checkOnly) {
		// requires JmolApplet.js and, if JAVA, java/JmolApplet*.jar
		// or if HTML5, then j2s/ subdirectory (core, java, JZ, J)
		/*
		var DefaultInfo = {
			color: "#FFFFFF", // applet object background color, as for older jmolSetBackgroundColor(s)
			width: 300,
			height: 300,
			addSelectionOptions: false,
			serverURL: "http://your.server.here/jsmol.php",
	 console: null,  // div for where the JavaScript console will be.
			defaultModel: "",
			script: null,
			src: null,
			readyFunction: null,
			use: "HTML5",//other options include JAVA, WEBGL//, and IMAGE (removed)
			jarPath: "java",
			jarFile: "JmolApplet0.jar",
			isSigned: false,
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

		*/
		return Jmol._Applet._get(id, Info, checkOnly);
	}

	Jmol.getJMEApplet = function(id, Info, linkedApplet, checkOnly) {
		// Java Molecular Editor
		// requires JmolJME.js and jme/ subdirectory
		/*
		var DefaultInfo = {
			width: 300,
			height: 300,
			jarPath: "jme",
			jarFile: "JME.jar",
			use: "HTML", // or JAVA
			options: "autoez"
			// see http://www2.chemie.uni-erlangen.de/services/fragment/editor/jme_functions.html
			// rbutton, norbutton - show / hide R button
			// hydrogens, nohydrogens - display / hide hydrogens
			// query, noquery - enable / disable query features
			// autoez, noautoez - automatic generation of SMILES with E,Z stereochemistry
			// nocanonize - SMILES canonicalization and detection of aromaticity supressed
			// nostereo - stereochemistry not considered when creating SMILES
			// reaction, noreaction - enable / disable reaction input
			// multipart - possibility to enter multipart structures
			// number - possibility to number (mark) atoms
			// depict - the applet will appear without editing butons,this is used for structure display only
		};		    
		*/
		return Jmol._JMEApplet._get(id, Info, linkedApplet, checkOnly);
	}

	Jmol.getJSVApplet = function(id, Info, checkOnly) {
		// JSpecView
		// requires JmolJSV.js and, if JAVA, either JSpecViewApplet.jar or JSpecViewAppletSigned.jar
		// or if HTML5, then j2s/ subdirectory (core, java, JZ, J, JSV)
		/*
		var DefaultInfo = {
			width: 500,
			height: 300,
			debug: false,
			jarPath: ".",
			jarFile: "JSpecViewApplet.jar", // or "JSpecViewAppletSigned.jar"
			uee: "HTML5", // or JAVA
			isSigned: false,
			initParams: null,
			readyFunction: null,
			script: null
		};
		*/
		return Jmol._JSVApplet._get(id, Info, checkOnly);
	}	


////////////////// scripting ///////////////////

	Jmol.loadFile = function(applet, fileName, params){
		applet._loadFile(fileName, params);
	}

	Jmol.script = function(applet, script) {
		if (applet._checkDeferred(script)) 
			return;
		applet._script(script);
	}

/**
 * returns false if cannot check, empty string if OK, or error message if not OK
 */	
	Jmol.scriptCheck = function(applet, script) {
		return applet && applet._scriptCheck && applet._ready && applet._scriptCheck(script);
	}

	Jmol.scriptWait = function(applet, script) {
		return applet._scriptWait(script);
	}

	Jmol.scriptEcho = function(applet, script) {
		return applet._scriptEcho(script);
	}

	Jmol.scriptMessage = function(applet, script) {
		return applet._scriptMessage(script);
	}

	Jmol.scriptWaitOutput = function(applet, script) {
		return applet._scriptWait(script);
	}

	Jmol.scriptWaitAsArray = function(applet, script) {
		return applet._scriptWaitAsArray(script);
	}

	Jmol.search = function(applet, query, script) {
		applet._search(query, script);
	}

////////////////// "get" methods ///////////////////


	Jmol.evaluateVar = function(applet,expr) {
		return applet._evaluate(expr);
	}

	// DEPRECATED -- use Jmol.evaluateVar
	Jmol.evaluate = function(applet,molecularMath) {
		return applet._evaluateDEPRECATED(molecularMath);
	}

	// optional Info here	
	Jmol.getAppletHtml = function(applet, Info) {
		if (Info) {
			var d = Jmol._document;
			Jmol._document = null;
			applet = Jmol.getApplet(applet, Info);
			Jmol._document = d;
		}  
		return applet._code;
	}

	Jmol.getPropertyAsArray = function(applet,sKey,sValue) {
		return applet._getPropertyAsArray(sKey,sValue);
	}

	Jmol.getPropertyAsJavaObject = function(applet,sKey,sValue) {
		return applet._getPropertyAsJavaObject(sKey,sValue);
	}

	Jmol.getPropertyAsJSON = function(applet,sKey,sValue) {
		return applet._getPropertyAsJSON(sKey,sValue);
	}

	Jmol.getPropertyAsString = function(applet,sKey,sValue) {
		return applet._getPropertyAsString(sKey,sValue);
	}

	Jmol.getStatus = function(applet,strStatus) {
		return applet._getStatus(strStatus);
	}


////////////////// general methods ///////////////////

	Jmol.resizeApplet = function(applet,size) {
		return applet._resizeApplet(size);
	}

	Jmol.restoreOrientation = function(applet,id) {
		return applet._restoreOrientation(id);
	}

	Jmol.restoreOrientationDelayed = function(applet,id,delay) {
		return applet._restoreOrientationDelayed(id,delay);
	}

	Jmol.saveOrientation = function(applet,id) {
		return applet._saveOrientation(id);
	}

	Jmol.say = function(msg) {
		alert(msg);
	}

//////////// console functions /////////////

	Jmol.clearConsole = function(applet) {
		applet._clearConsole();
	}

	Jmol.getInfo = function(applet) {
		return applet._info;
	}

	Jmol.setInfo = function(applet, info, isShown) {
		applet._info = info;
		if (arguments.length > 2)
			applet._showInfo(isShown);
	}

	Jmol.showInfo = function(applet, tf) {
		applet._showInfo(tf);
	}

	Jmol.show2d = function(applet, tf) {
		// only when JME or JSME is synced with Jmol
		applet._show2d(tf);
	}


//////////// controls and HTML /////////////


	Jmol.jmolBr = function() {
		return Jmol._documentWrite("<br>");
	}

	Jmol.jmolButton = function(appletOrId, script, label, id, title) {
		return Jmol.controls._getButton(appletOrId, script, label, id, title);
	}

	Jmol.jmolCheckbox = function(appletOrId, scriptWhenChecked, scriptWhenUnchecked,
			labelHtml, isChecked, id, title) {
		return Jmol.controls._getCheckbox(appletOrId, scriptWhenChecked, scriptWhenUnchecked,
			labelHtml, isChecked, id, title);
	}


	Jmol.jmolCommandInput = function(appletOrId, label, size, id, title, cmd0) {
		return Jmol.controls._getCommandInput(appletOrId, label, size, id, title, cmd0);
	}

	Jmol.jmolHtml = function(html) {
		return Jmol._documentWrite(html);
	}

	Jmol.jmolLink = function(appletOrId, script, label, id, title) {
		return Jmol.controls._getLink(appletOrId, script, label, id, title);
	}

	Jmol.jmolMenu = function(appletOrId, arrayOfMenuItems, size, id, title) {
		return Jmol.controls._getMenu(appletOrId, arrayOfMenuItems, size, id, title);
	}

	Jmol.jmolRadio = function(appletOrId, script, labelHtml, isChecked, separatorHtml, groupName, id, title) {
		return Jmol.controls._getRadio(appletOrId, script, labelHtml, isChecked, separatorHtml, groupName, id, title);
	}

	Jmol.jmolRadioGroup = function (appletOrId, arrayOfRadioButtons, separatorHtml, groupName, id, title) {
		return Jmol.controls._getRadioGroup(appletOrId, arrayOfRadioButtons, separatorHtml, groupName, id, title);
	}

	Jmol.setCheckboxGroup = function(chkMaster, chkBoxes) {
		// chkBoxes can be an array or any number of additional string arguments
		Jmol.controls._cbSetCheckboxGroup(chkMaster, chkBoxes, arguments);
	}

	Jmol.setDocument = function(doc) {

		// If doc is null or 0, Jmol.getApplet() will still return an Object, but the HTML will
		// put in applet._code and not written to the page. This can be nice, because then you 
		// can still refer to the applet, but place it on the page after the controls are made. 
		//
		// This really isn't necessary, though, because there is a simpler way: Just define the 
		// applet variable like this:
		//
		// jmolApplet0 = "jmolApplet0"
		//
		// and then, in the getApplet command, use
		//
		// jmolapplet0 = Jmol.getApplet(jmolApplet0,....)
		// 
		// prior to this, "jmolApplet0" will suffice, and after it, the Object will work as well
		// in any button creation 
		//		 
		//  Bob Hanson 25.04.2012

		Jmol._document = doc;
	}

	Jmol.setXHTML = function(id) {
		Jmol._isXHTML = true;
		Jmol._XhtmlElement = null;
		Jmol._XhtmlAppendChild = false;
		if (id){
			Jmol._XhtmlElement = document.getElementById(id);
			Jmol._XhtmlAppendChild = true;
		}
	}

	////////////////////////////////////////////////////////////////
	// Cascading Style Sheet Class support
	////////////////////////////////////////////////////////////////

	// BH 4/25 -- added text option. setAppletCss(null, "style=\"xxxx\"")
	// note that since you must add the style keyword, this can be used to add any attribute to these tags, not just css. 

	Jmol.setAppletCss = function(cssClass, text) {
		cssClass != null && (Jmol._appletCssClass = cssClass);
		Jmol._appletCssText = text ? text + " " : cssClass ? "class=\"" + cssClass + "\" " : "";
	}

	Jmol.setButtonCss = function(cssClass, text) {
		cssClass != null && (Jmol.controls._buttonCssClass = cssClass);
		Jmol.controls._buttonCssText = text ? text + " " : cssClass ? "class=\"" + cssClass + "\" " : "";
	}

	Jmol.setCheckboxCss = function(cssClass, text) {
		cssClass != null && (Jmol.controls._checkboxCssClass = cssClass);
		Jmol.controls._checkboxCssText = text ? text + " " : cssClass ? "class=\"" + cssClass + "\" " : "";
	}

	Jmol.setRadioCss = function(cssClass, text) {
		cssClass != null && (Jmol.controls._radioCssClass = cssClass);
		Jmol.controls._radioCssText = text ? text + " " : cssClass ? "class=\"" + cssClass + "\" " : "";
	}

	Jmol.setLinkCss = function(cssClass, text) {
		cssClass != null && (Jmol.controls._linkCssClass = cssClass);
		Jmol.controls._linkCssText = text ? text + " " : cssClass ? "class=\"" + cssClass + "\" " : "";
	}

	Jmol.setMenuCss = function(cssClass, text) {
		cssClass != null && (Jmol.controls._menuCssClass = cssClass);
		Jmol.controls._menuCssText = text ? text + " ": cssClass ? "class=\"" + cssClass + "\" " : "";
	}

	Jmol.setAppletSync = function(applets, commands, isJmolJSV) {
		Jmol._syncedApplets = applets;   // an array of appletIDs
		Jmol._syncedCommands = commands; // an array of commands; one or more may be null 
		Jmol._syncedReady = {};
		Jmol._isJmolJSVSync = isJmolJSV;
	}

	/*
	Jmol._grabberOptions = [
		["$", "NCI(small molecules)"],
		[":", "PubChem(small molecules)"],
		["=", "RCSB(macromolecules)"]
	];
	*/

	Jmol.setGrabberOptions = function(options) {
		Jmol._grabberOptions = options;
	}

	Jmol.setAppletHtml = function (applet, divid) {
		if (!applet._code) 
			return;
		Jmol.$html(divid, applet._code);
		if (applet._init && !applet._deferApplet)
			applet._init();
	}

	Jmol.coverApplet = function(applet, doCover) {
		if (applet._cover)
			applet._cover(doCover);
	}

	Jmol.setFileCaching = function(applet, doCache) {
		if (applet) {
			applet._cacheFiles = doCache;
		} else {
			Jmol.fileCache = (doCache ? {} : null);
		}
	}  

	Jmol.resetView = function(applet, appletNot) {
    Jmol.View.resetView(applet, appletNot);
	}

	Jmol.updateView = function(applet, param1, param2) {
		applet._updateView(param1, param2);
	}

	Jmol.getChemicalInfo = function(appletOrIdentifier, what, fCallback) {
		what || (what = "name");
		if (typeof appletOrIdentifier != "string") 
			appletOrIdentifier = appletOrIdentifier._getSmiles();
		return Jmol._getNCIInfo(appletOrIdentifier, what, fCallback);
	}

	Jmol.saveImage = function(app, type, fname) {
		// see: https://svgopen.org/2010/papers/62-From_SVG_to_Canvas_and_Back/index.html
		// From SVG to Canvas and Back
		// Samuli Kaipiainen University of Helsinki, Department of Computer Science samuli.kaipiainen@cs.helsinki.fi
		// Matti Paksula University of Helsinki, Department of Computer Science matti.paksula@cs.helsinki.fi
		type = (type || "png").toLowerCase();
		fname || (fname = app.id + "." + type.toLowerCase());
		if (fname.indexOf(".") < 0) fname += "." + type;
		switch (app._viewType) {
		case "Jmol":
			return app._script("write PNGJ \"" + fname + "\"");
		case "JSV":
			if (type == "PDF")
				return app._script("write PDF");
			break;
		case "JME":
			return app._script("print");			
		}
		Jmol._saveFile(fname,app._canvas.toDataURL("image/png"));
	}
		
		
})(Jmol);
// j2sjmol.js 
// NOTE: updates to this file should be copies to j2sSwingJS.js

// latest author: Bob Hanson, St. Olaf College, hansonr@stolaf.edu
 
// Requires JSmolCore.js and (for now; probably) JSmol.js
// This version of j2slib requires jQuery and works in both Chrome and MSIE locally,
// though Chrome cannot read local data files, and MSIE cannot read local binary data files.

// Java programming notes by Bob Hanson:
//   
//   There are a few motifs to avoid when optimizing Java code to work smoothly
//   with the J2S compiler:
//   
//   arrays: 
//   
// 1. an array with null elements cannot be typed and must be avoided.
// 2. instances of Java "instance of" involving arrays must be found and convered to calls to Clazz.isA...
// 3. new int[n][] must not be used. Use instead JU.AU.newInt2(n);
// 4. new int[] { 1, 2, 3 } has problems because it creates simply [ ] and not IntArray32
//   
//   numbers:
//   
// 1. Remember that EVERY number in JavaScript is a double -- doesn't matter if it is in IntArray32 or not. 
// 2. You cannot reliably use Java long, because doubles consume bits for the exponent which cannot be tested.
// 3. Bit 31 of an integer is unreliable, since (int) -1 is now  , not just 0zFFFFFFFF, and 
//    FFFFFFFF + 1 = 100000000, not 0. In JavaScript, 0xFFFFFFFF is 4294967295, not -1.
//    This means that writeInt(b) will fail if b is negative. What you need is instead
//    writeInt((int)(b & 0xFFFFFFFFl) so that JavaScript knocks off the high bits explicitly. 
//
//   general:
//
// 1. j2sRequireImport xxxx is needed if xxxx is a method used in a static function
// 2. URL.getContent() is not supported. Use other means based on URL.toString()
// 3. It is critical for performance to avoid any significant amount of function overloading.
//    In particular, methods such as xxx(int a, int b) and xxx(float a, int b) MUST be renamed,
//    because JavaScript only has Number, and there is absolutely no way to tell these apart.
//    It's probably bad Java programming, anyway.
// 4. Calls to super(...) can almost always be avoided. These trigger the SAEM
//    (searchAndExecuteMethod) call, and it is very destructive to performance.
//    Just find another way to do it.   

 // NOTES by Bob Hanson: 
  // J2S class changes:

 // BH 10/16/2017 6:30:14 AM fix for prepareCallback reducing arguments length to -1
 // BH 7/7/2017 7:10:39 AM fixes Clazz.clone for arrays
 // BH 1/14/2017 6:23:54 AM adds URL switch  j2sDebugCore
 // BH 1/8/2016 6:21:38 PM adjustments to prevent multiple load of corejmol.js 
 // BH 12/30/2015 9:13:40 PM Clazz.floatToInt should return 0 for NaN
 // BH 12/23/2015 9:23:06 AM allowing browser to display stack for TypeError in exceptionOf
 // BH 12/21/2015 6:14:59 PM adding typeArray.buffer.slice to be compatible with Safari
 // BH 12/20/2015 6:13:52 AM adding Int8Array; streamlining array checking
 // BH 12/18/2015 5:02:52 PM adding .slice and also better array copy
 // BH 7/24/2015 6:48:50 AM adding optional ?j2sdebug flag on page URL
 //                      -- switches to using j2s/core/corexxx.js, not j2s/core/corexxx.z.js 
 //                      -- adds ";//# sourceURL="+file  in eval(js)
 //                      -- enables DebugJS.$(msg) call to debugger;
 //  see https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/debugger
 //  see https://developer.mozilla.org/en-US/docs/Tools/Debugger/How_to/Debug_eval_sources
 // BH 7/23/2015 6:45:55 PM added sourceURL in each js class eval(), allowing full 
 //                         breakpoint debugging and code checking in Firefox and Chrome
 // BH 7/19/2015 6:18:17 PM added os.name, line.separator, etc. to System.getProperty()
 // BH 7/19/2015 5:39:10 PM added java.lang.System = System
 // BH 7/19/2015 10:33:10 AM fix for SAEM equating "null" with number or boolean
 // BH 7/18/2015 6:08:05 PM for Jmol I was able to remove the $private/$fx business, but now
 //    I see that in general that cannot be done. Thinking about a strategy...
 // BH 7/18/2015 4:43:38 PM better handling of TypeError and InternalError for e.getMessage() and e.getStackTrace()
 // BH 7/17/2015 11:51:15 AM adds class.getResource(name) and class.getResourceAsStream(name) 
 // BH 7/16/2015 7:56:49 PM general instantiation using any constructor (in Java here):
 // BH  x = class.forName("my.class.name").newInstance()
 // BH or
 // BH  x = class.forName("my.class.name").getConstructor(String.class,String.class).newInstance(new Object[] {"test", "now"})
 // BH 7/15/2015 11:34:58 PM adding System.lineSeparator()
 // BH 7/15/2015 7:32:41 AM adding class.getCanonicalName == getName
 // BH 5/31/2015 5:38:14 PM  NPEExceptionPredicate fix
 // BH 4/25/2015 9:16:12 AM SAEM misrepresnting Number as Object in parameters and Integer as Number 
 // BH 4/24/2015 7:32:54 AM Object.hashCode() and System.getIdentityHashCode() fail. changed to:     return this._$hashcode || (this._$hashcode = ++Clazz._hashCode)
 // BH 4/23/2015 9:08:59 AM Clazz.instanceOf(a, b) needs to check for a == b.   
 // BH 4/23/2015 9:08:59 AM xx.getContentType() is nonfunctional. Array.newInstance now defines a wrapper for .getClass().getComponentType() that works  
 // BH 4/12/2015 11:48:03 AM added Clazz.getStackTrace(-n) -- reports actual parameter values for n levels
 // BH 4/10/2015 8:23:05 AM adding Int32Array.prototype.clone and Float64.prototype.clone
 // BH 4/5/2015 8:12:57 AM refactoring j2slib (this file) to make private functions really private using var
 // BH 4/3/2015 6:14:34 AM adding anonymous local "ClazzLoader" (Clazz._Loader) --> "_Loader"
 // BH 4/3/2015 6:14:34 AM adding Clazz._Loader._classPending, Clazz._Loader._classCount
 // BH 4/3/2015 6:14:34 AM adding Clazz._Loader._checkLoad 
 //  -- forces asynchronous class loading
 //  -- builds Clazz._Loader._classPending and Clazz._classCount
 //  -- allows reporting 
 
 // BH 3/24/2015 4:11:26 AM better file load failure message in _Loader.evaluate 
 // BH 2/28/2015 7:30:25 AM corrects newIntArray32() and newArray() for pre-defined arrays 
 //   		int[] a =  new int[] {1,2,3,343};
 //   		int[][] b = new int[][] {new int[]{4,5},new int[]{5,6}}; 

 // BH 9/29/2014 11:34:19 PM removing support for getClass().isArray() 
 // BH 8/29/2014 9:15:57 AM total reworking of Java2Script in preparation for all-asynchronous loading
 //                         (currently sync loading is only for 
 // 												   LOAD command and load() function without ASYNC
 //                            getInterface() 
 //                         see JSmol.js and Jmol._isAsync flag
 // BH 5/11/2015 5:58:42 AM adding __signatures for debugging SAEM issues 
 // BH 3/29/2015 8:12:44 PM System.getProperty(x, "") does not return ""
 // BH 8/23/2014 10:04:19 AM cleaning up a few general methods; Clazz.removeArrayItem
 // BH 6/1/2014 10:58:46 AM fix for Clazz.isAP() not working
 // BH 5/26/2014 5:19:29 PM removing superConstructor call in creating Enum constants
 // BH 4/1/2014 7:55:54 PM removing all $fz references and instances where sub/super classes have same private function names
 // BH 4/1/2014 4:47:30 PM all $_X removed; this is taken care of by Google Closure Compiler
 // BH 4/1/2014 6:40:08 AM removing ClassLoader -- equals Clazz._Loader
 // BH 4/1/2014 6:40:08 AM removing ClassLoaderProgressMonitor -- equals _LoaderProgressMonitor
 // BH 4/1/2014 6:17:21 AM removing Class  -- only used for "Class.forName" in Jmol, which ANT will now change to "Clazz._4Name"
 // BH 3/7/2014 9:05:06 AM Array.prototype.toString should not be aliased. -- http://sourceforge.net/p/jmol/bugs/560/ with Google Visualization

 // BH 1/30/2014 12:54:22 PM gave all field variables prefix underscore. This allows Google Closure Compiler to skip them.  
 // BH 12/3/2013 3:39:57 PM window["j2s.lib"].base implemented
 // BH 12/1/2013 5:34:21 AM removed _LoaderProgressMonitor.initialize and all Clazz.event business; handled by Jmol.clearVars()
 // BH 11/30/2013 12:43:58 PM adding Clazz.arrayIs() -- avoids Number.constructor.toString() infinite recursion
 // BH 11/29/2013 6:33:51 AM adding Clazz._profiler -- reports use of SAEM
 // BH 11/10/2013 9:02:20 AM fixing fading in MSIE  
 // BH 11/3/2013 7:21:39 AM additional wrapping functions for better compressibility
 // BH 10/30/2013 8:10:58 AM added getClass().getResource() -- returning a relative string, not a URL
 // BH 10/30/2013 6:43:00 AM removed second System def and added System.$props and default System.property "line.separator" 
 // BH 6/15/2013 8:02:07 AM corrections to Class.isAS to return true if first element is null
 // BH 6/14/2013 4:41:09 PM corrections to Clazz.isAI and related methods to include check for null object
 // BH 3/17/2013 11:54:28 AM adds stackTrace for ERROR 

 // BH 3/13/2013 6:58:26 PM adds Clazz.clone(me) for BS clone 
 // BH 3/12/2013 6:30:53 AM fixes Clazz.exceptionOf for ERROR condition trapping
 // BH 3/2/2013 9:09:53 AM delete globals c$ and $fz
 // BH 3/2/2013 9:10:45 AM optimizing defineMethod using "look no further" "@" parameter designation (see "\\@" below -- removed 3/23/13)
 // BH 2/27/2013 optimizing Clazz.getParamsType for common cases () and (Number)
 // BH 2/27/2013 optimizing SAEM delegation for hashCode and equals -- disallows overloading of equals(Object)
 
 // BH 2/23/2013 found String.replaceAll does not work -- solution was to never call it.
 // BH 2/9/2013 9:18:03 PM Int32Array/Float64Array fixed for MSIE9
 // BH 1/25/2013 1:55:31 AM moved package.js from j2s/java to j2s/core 
 // BH 1/17/2013 4:37:17 PM String.compareTo() added
 // BH 1/17/2013 4:52:22 PM Int32Array and Float64Array may not have .prototype.sort method
 // BH 1/16/2013 6:20:34 PM Float64Array not available in Safari 5.1
 // BH 1/14/2013 11:28:58 PM  Going to all doubles in JavaScript (Float64Array, not Float32Array)
 //   so that (new float[] {13.48f})[0] == 13.48f, effectively

 // BH 1/14/2013 12:53:41 AM  Fix for Opera 10 not loading any files
 // BH 1/13/2013 11:50:11 PM  Fix for MSIE not loading (nonbinary) files locally
 
 // BH 12/1/2012 9:52:26 AM Compiler note: Thread.start() cannot be executed within the constructor;
 
 // BH 11/24/2012 11:08:39 AM removed unneeded sections
 // BH 11/24/2012 10:23:22 AM  all XHR uses sync loading (_Loader.setLoadingMode)
 // BH 11/21/2012 7:30:06 PM 	if (base)	map["@" + pkg] = base;  critical for multiple applets

 // BH 10/8/2012 3:27:41 PM         if (clazzName.indexOf("Array") >= 0) return "Array"; in Clazz.getClassName for function
 // BH removed Clazz.ie$plit = "\\2".split (/\\/).length == 1; unnecessary; using RegEx slows process significantly in all browsers
 // BH 10/6/12 added Int32Array, Float32Array, newArrayBH, upgraded java.lang and java.io
 // BH added Integer.bitCount in core.z.js
 // BH changed alert to Clazz.alert in java.lang.Class.js *.ClassLoader.js, java.lang.thread.js
 // BH removed toString from innerFunctionNames due to infinite recursion
 // BH note: Logger.error(null, e) does not work -- get no constructor for (String) (TypeError)
 // BH added j2s.lib.console
 // BH allowed for alias="."
 // BH removed alert def --> Clazz.alert
 // BH added wrapper at line 2856 
 // BH newArray fix at line 2205
 // BH System.getProperty fix at line 6693
 // BH added Enum .value() method at line 2183
 // BH added System.getSecurityManager() at end
 // BH added String.contains() at end
 // BH added System.gc() at end
 // BH added Clazz.exceptionOf = updated
 // BH added String.getBytes() at end
 

LoadClazz = function() {

// BH This is the ONLY global used in J2S now. I do not think it is necessary,
// but it is created by the compiler, and I have not found a work-around.
// it is used as a local variable in class definitions to point to the 
// current method. See Clazz.p0p and Clazz.pu$h

c$ = null;

if (!window["j2s.clazzloaded"])
	window["j2s.clazzloaded"] = false;

if (window["j2s.clazzloaded"])return;

window["j2s.clazzloaded"] = true;

window["j2s.object.native"] = true;

 // Clazz changes:

 /* http://j2s.sf.net/ *//******************************************************************************
 * Copyright (c) 2007 java2script.org and others.
 * All rights reserved. This program and the accompanying materials
 * are made available under the terms of the Eclipse Public License v1.0
 * which accompanies this distribution, and is available at
 * http://www.eclipse.org/legal/epl-v10.html
 *
 * Contributors:
 *     Zhou Renjian - initial API and implementation
 *****************************************************************************/
/*******
 * @author zhou renjian
 * @create Nov 5, 2005
 *******/
 

/**
 * Class Clazz. All the methods are static in this class.
 */
/* static */
/*Class = */ Clazz = {
  _isQuiet: false,
  _debugging: false
};

;(function(Clazz, Jmol) {


try {
Clazz._debugging = (document.location.href.indexOf("j2sdebug") >= 0);
} catch (e) {
}
var __debuggingBH = false;
var _globals = ["j2s.clazzloaded", "j2s.object.native"];
Clazz.setGlobal = function(a, v) {
	_globals.push(a);
	window[a] = v;
}

Clazz.getGlobals = function() {
	return _globals.sort().join("\n");
}

Clazz.setConsoleDiv = function(d) {
	window["j2s.lib"] && (window["j2s.lib"].console = d);
};

// BH Clazz.getProfile monitors exactly what is being delegated with SAEM,
// which could be a bottle-neck for function calling.
// This is critical for performance optimization.

// Jmol.getProfile()

var _profile = null;

Clazz._startProfiling = function(doProfile) {
  _profile = (doProfile && self.JSON ? {} : null);
}

NullObject = function () {};

/* protected */
Clazz._supportsNativeObject = window["j2s.object.native"];

if (Clazz._supportsNativeObject) {
	Clazz._O = function () {};
	Clazz._O.__CLASS_NAME__ = "Object";
	Clazz._O["getClass"] = function () { return Clazz._O; }; 
} else {
	Clazz._O = Object;
}

Clazz.Console = {};
Clazz.dateToString = Date.prototype.toString;
Clazz._hashCode = 0;

var addProto = function(proto, name, func) {
	return proto[name] = func;
};

;(function(proto) {
	addProto(proto, "equals", function (obj) {
		return this == obj;
	});

	addProto(proto, "hashCode", function () {
  
    return this._$hashcode || (this._$hashcode = ++Clazz._hashCode)

/*  
		try {
			return this.toString ().hashCode ();
		} catch (e) {
			var str = ":";
			for (var s in this) {
				str += s + ":"
			}
			return str.hashCode ();
		}
*/
	});

	addProto(proto, "getClass", function () { return Clazz.getClass (this); });

	addProto(proto, "clone", function () { return Clazz.clone(this); });

	Clazz.clone = function(me) {
		// BH allows @j2sNative access without super constructor
    // BH 7/7/2017 7:20:47 AM array clone must preserve length for java.util.Hashtable.clone()
		var o = (me instanceof Array ? new Array(me.length) : new me.constructor());
		for (var i in me) {
			o[i] = me[i];
      }
		return o;
	}
/*
 * Methods for thread in Object
 */
	addProto(proto, "finalize", function () {});
	addProto(proto, "notify", function () {});
	addProto(proto, "notifyAll", function () {});
	addProto(proto, "wait", function () {});
	addProto(proto, "to$tring", Object.prototype.toString);
	addProto(proto, "toString", function () { return (this.__CLASS_NAME__ ? "[" + this.__CLASS_NAME__ + " object]" : this.to$tring.apply(this, arguments)); });
	Clazz._extendedObjectMethods = [ "equals", "hashCode", "getClass", "clone", "finalize", "notify", "notifyAll", "wait", "to$tring", "toString" ];

})(Clazz._O.prototype);

Clazz.extendJO = function(c, name) {  
	if (name)
		c.__CLASS_NAME__ = c.prototype.__CLASS_NAME__ = name;
	if (Clazz._supportsNativeObject) {
		for (var i = 0; i < Clazz._extendedObjectMethods.length; i++) {
			var p = Clazz._extendedObjectMethods[i];
			addProto(c.prototype, p, Clazz._O.prototype[p]);
		}
	}
};

/**
 * Try to fix bug on Safari
 */
//InternalFunction = Object;

Clazz.extractClassName = function(clazzStr) {
	// [object Int32Array]
	var clazzName = clazzStr.substring (1, clazzStr.length - 1);
	return (clazzName.indexOf("Array") >= 0 ? "Array" // BH -- for Float64Array and Int32Array
		: clazzName.indexOf ("object ") >= 0 ? clazzName.substring (7) // IE
		: clazzName);
}
/**
 * Return the class name of the given class or object.
 *
 * @param clazzHost given class or object
 * @return class name
 */
/* public */
Clazz.getClassName = function (obj) {
	if (obj == null)
		return "NullObject";
	if (obj instanceof Clazz.CastedNull)
		return obj.clazzName;
	switch(typeof obj) {
	case "number":
		return "n";
	case "boolean":
		return "b";
	case "string":
		// Always treat the constant string as String object.
		// This will be compatiable with Java String instance.
		return "String";
	case "function":
		if (obj.__CLASS_NAME__)
			return (arguments[1] ? obj.__CLASS_NAME__ : "Class"); /* user defined class name */
		var s = obj.toString();
		var idx0 = s.indexOf("function");
		if (idx0 < 0)
			return (s.charAt(0) == '[' ? Clazz.extractClassName(s) : s.replace(/[^a-zA-Z0-9]/g, ''));
		var idx1 = idx0 + 8;
		var idx2 = s.indexOf ("(", idx1);
		if (idx2 < 0)
			return "Object";
		s = s.substring (idx1, idx2);
		if (s.indexOf("Array") >= 0)
			return "Array"; 
		s = s.replace (/^\s+/, "").replace (/\s+$/, "");
		return (s == "anonymous" || s == "" ? "Function" : s);
	case "object":
		if (obj.__CLASS_NAME__) // user defined class name
			return obj.__CLASS_NAME__;
		if (!obj.constructor)
			return "Object"; // For HTML Element in IE
		if (!obj.constructor.__CLASS_NAME__) {
			if (obj instanceof Number)
				return "Number";
			if (obj instanceof Boolean)
				return "Boolean";
			if (obj instanceof Array || obj.BYTES_PER_ELEMENT)
				return "Array";
			var s = obj.toString();
      // "[object Int32Array]"
			if (s.charAt(0) == '[')
				return Clazz.extractClassName(s);
		}
  	return Clazz.getClassName (obj.constructor, true);
	}
  // some new, unidentified class
  return "Object";
};
/**
 * Return the class of the given class or object.
 *
 * @param clazzHost given class or object
 * @return class name
 */
/* public */
Clazz.getClass = function (clazzHost) {
	if (!clazzHost)
		return Clazz._O;	// null/undefined is always treated as Object
	if (typeof clazzHost == "function")
		return clazzHost;
	var clazzName;
	if (clazzHost instanceof Clazz.CastedNull) {
		clazzName = clazzHost.clazzName;
	} else {
		switch (typeof clazzHost) {
		case "string":
			return String;
	  case "object":
			if (!clazzHost.__CLASS_NAME__)
				return (clazzHost.constructor || Clazz._O);
			clazzName = clazzHost.__CLASS_NAME__;
		break;
		default:
			return clazzHost.constructor;
		}
	}
	return Clazz.evalType(clazzName, true);
};


/* private */
var checkInnerFunction = function (hostSuper, funName) {
	for (var k = 0; k < Clazz.innerFunctionNames.length; k++)
		if (funName == Clazz.innerFunctionNames[k] && 
				Clazz._innerFunctions[funName] === hostSuper[funName])
			return true;
	return false;
};

var args4InheritClass = function () {};

Clazz.inheritArgs = new args4InheritClass ();

/**
 * Inherit class with "extends" keyword and also copy those static members. 
 * Example, as in Java, if NAME is a static member of ClassA, and ClassB 
 * extends ClassA then ClassB.NAME can be accessed in some ways.
 *
 * @param clazzThis child class to be extended
 * @param clazzSuper super class which is inherited from
 * @param objSuper super class instance
 */
/* protected */
Clazz.inheritClass = function (clazzThis, clazzSuper, objSuper) {
	//var thisClassName = Clazz.getClassName (clazzThis);
	for (var o in clazzSuper) {
		if (o != "b$" && o != "prototype" && o != "superClazz"
				&& o != "__CLASS_NAME__" && o != "implementz"
				&& !checkInnerFunction (clazzSuper, o)) {
			clazzThis[o] = clazzSuper[o];
		}
	}
	if (Clazz.unloadedClasses[Clazz.getClassName(clazzThis, true)]) {
		// Don't change clazzThis.protoype! Keep it!
	} else if (objSuper) {
		// ! Unsafe reference prototype to an instance!
		// Feb 19, 2006 --josson
		// OK for this reference to an instance, as this is anonymous instance,
		// which is not referenced elsewhere.
		// March 13, 2006
		clazzThis.prototype = objSuper; 
	} else if (clazzSuper !== Number) {
		clazzThis.prototype = new clazzSuper (Clazz.inheritArgs);
	} else { // Number
		clazzThis.prototype = new Number ();
	}
	clazzThis.superClazz = clazzSuper;
	/*
	 * Is it necessary to reassign the class name?
	 * Mar 10, 2006 --josson
	 */
	//clazzThis.__CLASS_NAME__ = thisClassName;
	clazzThis.prototype.__CLASS_NAME__ = clazzThis.__CLASS_NAME__;
};

/**
 * Implementation of Java's keyword "implements".
 * As in JavaScript there are on "implements" keyword implemented, a property
 * of "implementz" is added to the class to record the interfaces the class
 * is implemented.
 * 
 * @param clazzThis the class to implement
 * @param interfacez Array of interfaces
 */
/* public */
Clazz.implementOf = function (clazzThis, interfacez) {
	if (arguments.length >= 2) {
		if (!clazzThis.implementz)
			clazzThis.implementz = [];
		var impls = clazzThis.implementz;
		if (arguments.length == 2) {
			if (typeof interfacez == "function") {
				impls.push(interfacez);
				copyProperties(clazzThis, interfacez);
			} else if (interfacez instanceof Array) {
				for (var i = 0; i < interfacez.length; i++) {
					impls.push(interfacez[i]);
					copyProperties(clazzThis, interfacez[i]);
				}
			}
		} else {
			for (var i = 1; i < arguments.length; i++) {
				impls.push(arguments[i]);
				copyProperties(clazzThis, arguments[i]);
			}
		}
	}
};

/*
 * Copy members of interface
 */
/* private */
var copyProperties = function(clazzThis, clazzSuper) {
	for (var o in clazzSuper)
		if (o != "b$" 
				&& o != "prototype" && o != "superClazz"
				&& o != "__CLASS_NAME__" && o != "implementz"
				&& (typeof clazzSuper[o] != "function" || !checkInnerFunction(clazzSuper, o)))
			clazzThis[o] = clazzThis.prototype[o] = clazzSuper[o];
};

/**
 * TODO: More should be done for interface's inheritance
 */
/* public */
Clazz.extendInterface = Clazz.implementOf;

/* protected */
Clazz.equalsOrExtendsLevel = function (clazzThis, clazzAncestor) {
	if (clazzThis === clazzAncestor)
		return 0;
	if (clazzThis.implementz) {
		var impls = clazzThis.implementz;
		for (var i = 0; i < impls.length; i++) {
			var level = Clazz.equalsOrExtendsLevel (impls[i], clazzAncestor);
			if (level >= 0)
				return level + 1;
		}
	}
	return -1;
};

/* protected */
Clazz.getInheritedLevel = function (clazzTarget, clazzBase) {
	if (clazzTarget === clazzBase)
		return 0;
	var isTgtStr = (typeof clazzTarget == "string");
	if (isTgtStr && ("void" == clazzTarget || "unknown" == clazzTarget))
		return -1;
	var isBaseStr = (typeof clazzBase == "string");
	if (isBaseStr && ("void" == clazzBase || "unknown" == clazzBase))
		return -1;
	if (clazzTarget === (isTgtStr ? "NullObject" : NullObject)) {
		switch (clazzBase) {
    case "n":
    case "b":
      return -1;
		case Number:
		case Boolean:
		case NullObject:
			break;
		default:
			return 0;
		}
	}
	if (isTgtStr)
		clazzTarget = Clazz.evalType(clazzTarget);
	if (isBaseStr)
		clazzBase = Clazz.evalType(clazzBase);
	if (!clazzBase || !clazzTarget)
		return -1;
	var level = 0;
	var zzalc = clazzTarget; // zzalc <--> clazz
	while (zzalc !== clazzBase && level < 10) {
		/* maybe clazzBase is interface */
		if (zzalc.implementz) {
			var impls = zzalc.implementz;
			for (var i = 0; i < impls.length; i++) {
				var implsLevel = Clazz.equalsOrExtendsLevel (impls[i], clazzBase);
				if (implsLevel >= 0)
					return level + implsLevel + 1;
			}
		}
		zzalc = zzalc.superClazz;
		if (!zzalc)
			return (clazzBase === Object || clazzBase === Clazz._O ? 
				// getInheritedLevel(String, CharSequence) == 1
				// getInheritedLevel(String, Object) == 1.5
				// So if both #test(CharSequence) and #test(Object) existed,
				// #test("hello") will correctly call #test(CharSequence)
				// instead of #test(Object).
				level + 1.5 // 1.5! Special!
			: -1);
		level++;
	}
	return level;
};


/**
 * Implements Java's keyword "instanceof" in JavaScript's way.
 * As in JavaScript part of the object inheritance is implemented in only-
 * JavaScript way.
 *
 * @param obj the object to be tested
 * @param clazz the class to be checked
 * @return whether the object is an instance of the class
 */
/* public */
Clazz.instanceOf = function (obj, clazz) {
  // allows obj to be a class already, from arrayX.getClass().isInstance(y)
	return (obj != null && clazz && (obj == clazz || obj instanceof clazz || Clazz.getInheritedLevel(Clazz.getClassName(obj), clazz) >= 0));
};

/**
 * Call super method of the class. 
 * The same effect as Java's expression:
 * <code> super.* () </code>
 * 
 * @param objThis host object
 * @param clazzThis class of declaring method scope. It's hard to determine 
 * which super class is right class for "super.*()" call when it's in runtime
 * environment. For example,
 * 1. ClasssA has method #run()
 * 2. ClassB extends ClassA overriding method #run() with "super.run()" call
 * 3. ClassC extends ClassB
 * 4. objC is an instance of ClassC
 * Now we have to decide which super #run() method is to be invoked. Without
 * explicit clazzThis parameter, we only know that objC.getClass() is ClassC 
 * and current method scope is #run(). We do not known we are in scope 
 * ClassA#run() or scope of ClassB#run(). if ClassB is given, Clazz can search
 * all super methods that are before ClassB and get the correct super method.
 * This is the reason why there must be an extra clazzThis parameter.
 * @param funName method name to be called
 * @param funParams Array of method parameters
 */
/* public */
Clazz.superCall = function (objThis, clazzThis, funName, funParams) {
	var fx = null;
	var i = -1;
	var clazzFun = objThis[funName];
	if (clazzFun) {
		if (clazzFun.claxxOwner) { 
			// claxxOwner is a mark for methods that is single.
			if (clazzFun.claxxOwner !== clazzThis) {
				// This is a single method, call directly!
				fx = clazzFun;
        
			}
		} else if (!clazzFun.stacks && !(clazzFun.lastClaxxRef
					&& clazzFun.lastClaxxRef.prototype[funName]
					&& clazzFun.lastClaxxRef.prototype[funName].stacks)) { // super.toString
			fx = clazzFun;
		} else { // normal wrapped method
			var stacks = clazzFun.stacks;
			if (!stacks)
				stacks = clazzFun.lastClaxxRef.prototype[funName].stacks;
			for (i = stacks.length; --i >= 0;) {
				/*
				 * Once super call is computed precisely, there are no need 
				 * to calculate the inherited level but just an equals
				 * comparision
				 */
				//var level = Clazz.getInheritedLevel (clazzThis, stacks[i]);
				if (clazzThis === stacks[i]) { // level == 0
					if (i > 0) {
						fx = stacks[--i].prototype[funName];
					} else {
						/*
						 * Will this case be reachable?
						 * March 4, 2006
						 * Should never reach here if all things are converted
						 * by Java2Script
						 */
						fx = stacks[0].prototype[funName]["\\unknown"];
					}
					break;
				} else if (Clazz.getInheritedLevel (clazzThis, stacks[i]) > 0) {
					fx = stacks[i].prototype[funName];
					break;
				}
			} // end of for loop
		} // end of normal wrapped method
	} // end of clazzFun
	if (!fx) {
		if (funName != "construct") {
			Clazz.alert (["j2slib","no class found",(funParams).typeString])
			newMethodNotFoundException(objThis, clazzThis, funName, 
					Clazz.getParamsType(funParams).typeString);	
		}
		/* there are members which are initialized out of the constructor */
		/* No super constructor! */
		return;
	}
	/* there are members which are initialized out of the constructor */
	if (i == 0 && funName == "construct") {
		var ss = clazzFun.stacks;
		if (ss && !ss[0].superClazz && ss[0].con$truct)
			ss[0].con$truct.apply (objThis, []);
	}
	/*# {$no.debug.support} >>x #*/
	/* not used in Jmol
	if (Clazz.tracingCalling) {
		var caller = arguments.callee.caller;
		if (caller === Clazz.superConstructor) {
			caller = caller.arguments.callee.caller;
		}
		Clazz._callingStackTraces.push(new Clazz.callingStack (caller, clazzThis));
		var ret = fx.apply (objThis, (funParams == null) ? [] : funParams);
		Clazz._callingStackTraces.pop();
		return ret;
	}
	*/
	/*# x<< #*/
	return fx.apply (objThis, funParams || []);
};

/**
 * Call super constructor of the class. 
 * The same effect as Java's expression: 
 * <code> super () </code>
 */
/* public */
Clazz.superConstructor = function (objThis, clazzThis, funParams) {
	Clazz.superCall (objThis, clazzThis, "construct", funParams);
	/* If there are members which are initialized out of the constructor */
	if (clazzThis.con$truct) {
		clazzThis.con$truct.apply (objThis, []);
	}
};

/**
 * Class for null with a given class as to be casted.
 * This class will be used as an implementation of Java's casting way.
 * For example,
 * <code> this.call ((String) null); </code>
 */
/* public */
Clazz.CastedNull = function (asClazz) {
	if (asClazz) {
		if (asClazz instanceof String) {
			this.clazzName = asClazz;
		} else if (asClazz instanceof Function) {
			this.clazzName = Clazz.getClassName (asClazz, true);
		} else {
			this.clazzName = "" + asClazz;
		}
	} else {
		this.clazzName = "Object";
	}
	this.toString = function () {
		return null;
	};
	this.valueOf = function () {
		return null;
	};
};

/**
 * API for Java's casting null.
 * @see Clazz.CastedNull
 *
 * @param asClazz given class
 * @return an instance of class Clazz.CastedNull
 */
/* public */
Clazz.castNullAs = function (asClazz) {
	return new Clazz.CastedNull (asClazz);
};

/////////////////////////// Exception handling ////////////////////////////

/*
 * Use to mark that the Throwable instance is created or not.
 * 
 * Called from java.lang.Throwable, as defined in JSmolJavaExt.js
 * 
 * The underscore is important - it tells the JSmol ANT task to NOT 
 * turn this into Clazz_initializingException, because coreBottom2.js does 
 * not include that call, and so Google Closure Compiler does not minify it.
 *        
 */
/* public */
Clazz._initializingException = false;

/**
 * BH: used in Throwable
 *  
 */  
/* public */
Clazz._callingStackTraces = [];

/** 
 * MethodException will be used as a signal to notify that the method is
 * not found in the current clazz hierarchy.
 */
/* private */
var MethodException = function () {
	this.toString = function () {
		return "J2S MethodException";
	};
};
/* private */
//var MethodNotFoundException = function () {
//	this.toString = function () {
//		return "J2S MethodNotFoundException";
//	};
//};

  var _isNPEExceptionPredicate;

/* super private */
;(function() { 
  /* sgurin: native exception detection mechanism. Only NullPointerException detected and wrapped to java excepions */
  /** private utility method for creating a general regexp that can be used later  
   * for detecting a certain kind of native exceptions. use with error messages like "blabla IDENTIFIER blabla"
   * @param msg String - the error message
   * @param spliterName String, must be contained once in msg
   * spliterRegex String, a string with the regexp literal for identifying the spitter in exception further error messages.
   */
  // reproduce NullPointerException for knowing how to detect them, and create detector function Clazz._isNPEExceptionPredicate
  var $$o$$ = null;
  
  try {
  	$$o$$.hello();
  } catch (e) {
    var _ex_reg = function(msg, spliterName, spliterRegex) {
    	if(!spliterRegex) 
    		spliterRegex="[^\\s]+";	
    	var idx = msg.indexOf (spliterName), 
    		str = msg.substring (0, idx) + spliterRegex + msg.substring(idx + spliterName.length), 
    		regexp = new RegExp("^"+str+"$");
    	return regexp;
    };
  	if(/Opera[\/\s](\d+\.\d+)/.test(navigator.userAgent)) {// opera throws an exception with fixed messages like "Statement on line 23: Cannot convert undefined or null to Object Backtrace: Line....long text... " 
  		var idx1 = e.message.indexOf(":"), idx2 = e.message.indexOf(":", idx1+2);
  		var _NPEMsgFragment = e.message.substr(idx1+1, idx2-idx1-20);
  		_isNPEExceptionPredicate = function(e) { return e.message.indexOf(_NPEMsgFragment)!=-1; };
  	}	else if(navigator.userAgent.toLowerCase().indexOf("webkit")!=-1) { //webkit, google chrome prints the property name accessed. 
  		var _exceptionNPERegExp = _ex_reg(e.message, "hello");
  		_isNPEExceptionPredicate = function(e) { return _exceptionNPERegExp.test(e.message); };
  	}	else {// ie, firefox and others print the name of the object accessed: 
  		var _exceptionNPERegExp = _ex_reg(e.message, "$$o$$");
  		_isNPEExceptionPredicate = function(e) { return _exceptionNPERegExp.test(e.message); };
  	}		
  };
})();

/**sgurin
 * Implements Java's keyword "instanceof" in JavaScript's way **for exception objects**.
 * 
 * calls Clazz.instanceOf if e is a Java exception. If not, try to detect known native 
 * exceptions, like native NullPointerExceptions and wrap it into a Java exception and 
 * call Clazz.instanceOf again. if the native exception can't be wrapped, false is returned.
 * 
 * @param obj the object to be tested
 * @param clazz the class to be checked
 * @return whether the object is an instance of the class
 * @author: sgurin
 */
Clazz.exceptionOf = function(e, clazz) {
	if(e.__CLASS_NAME__)
		return Clazz.instanceOf(e, clazz);
  if (!e.getMessage) {
    // Firefox at least now has a nice stack report
    e.getMessage = function() {return "" + e + (e.stack ? "\n" + e.stack : "")};
  }
  if (!e.printStackTrace) {
   e.printStackTrace = function(){};
  }
	if(clazz == Error) {
		if (("" + e).indexOf("Error") < 0)
      return false;
		System.out.println (Clazz.getStackTrace());
    return true;
		// everything here is a Java Exception, not a Java Error
	}
	return (clazz == Exception || clazz == Throwable
		|| clazz == NullPointerException && _isNPEExceptionPredicate(e));
};

/**
 * BH need to limit this, as JavaScript call stack may be recursive
 */ 
Clazz.getStackTrace = function(n) {
	n || (n = 25);
  // updateNode and updateParents cause infinite loop here
	var s = "\n";
	var c = arguments.callee;
  var showParams = (n < 0)
  if (showParams)
    n = -n;
 try {
  for (var i = 0; i < n; i++) {
    if (!(c = c.caller))
      break;
    var sig = (c.toString ? c.toString().substring(0, c.toString().indexOf("{")) : "<native method>");
		s += i + " " + (c.exName ? (c.claxxOwner ? c.claxxOwner.__CLASS_NAME__ + "."  : "") + c.exName  + sig.replace(/function /,""): sig) + "\n";
		if (c == c.caller) {
      s += "<recursing>\n";
      break;
    }
    if (showParams) {
      var args = c.arguments;
      for (var j = 0; j < args.length; j++) {
        var sa = "" + args[j];
        if (sa.length > 60)
          sa = sa.substring(0, 60) + "...";
        s += " args[" + j + "]=" + sa.replace(/\s+/g," ") + "\n";
      }
    }
  }
 }catch(e){}
	return s;
}

///////////////////// method creation ////////////////////////////////

/**
 * Make constructor for the class with the given function body and parameters
 * signature.
 * 
 * @param clazzThis host class
 * @param funBody constructor body
 * @param funParams constructor parameters signature
 */
/* public */
Clazz.makeConstructor = function (clazzThis, funBody, funParams) {
	Clazz.defineMethod (clazzThis, "construct", funBody, funParams);
	if (clazzThis.con$truct) {
		clazzThis.con$truct.index = clazzThis.con$truct.stacks.length;
	}
	//clazzThis.con$truct = clazzThis.prototype.con$truct = null;
};

/**
 * Override constructor for the class with the given function body and
 * parameters signature.
 * 
 * @param clazzThis host class
 * @param funBody constructor body
 * @param funParams constructor parameters signature
 */
/* public */
Clazz.overrideConstructor = function (clazzThis, funBody, funParams) {
	Clazz.overrideMethod (clazzThis, "construct", funBody, funParams);
	if (clazzThis.con$truct) {
		clazzThis.con$truct.index = clazzThis.con$truct.stacks.length;
	}
	//clazzThis.con$truct = clazzThis.prototype.con$truct = null;
};


/*
 * Define method for the class with the given method name and method
 * body and method parameter signature.
 *
 * @param clazzThis host class in which the method to be defined
 * @param funName method name
 * @param funBody function object, e.g function () { ... }
 * @param funParams paramether signature, e.g ["string", "number"]
 * @return method of the given name. The method may be funBody or a wrapper
 * of the given funBody.
 */
/* public */
Clazz.defineMethod = function (clazzThis, funName, funBody, funParams) {
	//if (Clazz.assureInnerClass) 
    //Clazz.assureInnerClass(clazzThis, funBody);
	funBody.exName = funName;
	var fpName = formatParameters(funParams);
	var proto = clazzThis.prototype;
	var f$ = proto[funName];
  if (Clazz._Loader._checkLoad)
    checkDuplicate(clazzThis, funName, fpName);
	if (!f$ || (f$.claxxOwner === clazzThis && f$.funParams == fpName)) {
		// property "funParams" will be used as a mark of only-one method
		funBody.funParams = fpName; 
		funBody.claxxOwner = clazzThis;
		funBody.exClazz = clazzThis; // make it traceable
		return addProto(proto, funName, funBody);
	}
  // we have found a duplicate
	var oldFun = null;
	var oldStacks = f$.stacks;
		if (!oldStacks) {
			/* method is not defined by Clazz.defineMethod () */
      oldStacks = [];
			oldFun = f$;
			if (f$.claxxOwner) {
				oldStacks[0] = oldFun.claxxOwner;
			}
		}
		/*
	 * Method that is already defined in super class will be overridden
	 * with a new proxy method with class hierarchy stored in a stack.
	 * That is to say, the super methods are lost in this class' proxy
	 * method. 
	 * When method are being called, methods defined in the new proxy 
	 * method will be searched through first. And if no method fitted,
	 * it will then try to search method in the super class stacks.
	 */
	if (!f$.stacks || f$.claxxReference !== clazzThis) {
		//Generate a new delegating method for the class                
    var id = ++SAEMid;
  	var delegate = function () {
  		return searchAndExecuteMethod(id, this, arguments.callee.claxxReference, arguments.callee.methodName, arguments);
  	};
  	delegate.methodName = funName;
  	delegate.claxxReference = clazzThis;
		f$ = addProto(proto, funName, delegate);				
		// Keep the class inheritance stacks
		var arr = [];
		for (var i = 0; i < oldStacks.length; i++)
			arr[i] = oldStacks[i];
		f$.stacks = arr;
	}
	var ss = f$.stacks;
	if (findArrayItem(ss, clazzThis) < 0) ss.push(clazzThis);

	if (oldFun) {
		if (oldFun.claxxOwner === clazzThis) {
			f$[oldFun.funParams] = oldFun;
			oldFun.claxxOwner = null;
			// property "funParams" will be used as a mark of only-one method
			oldFun.funParams = null; // null ? safe ? // safe for != null
		} else if (!oldFun.claxxOwner) {
			/*
			 * The function is not defined Clazz.defineMethod ().
			 * Try to fixup the method ...
			 * As a matter of lost method information, I just suppose
			 * the method to be fixed is with void parameter!
			 */
			f$["\\unknown"] = oldFun;
		}
	}
	funBody.exClazz = clazzThis; // make it traceable
	f$[fpName] = funBody;
	return f$;
};                                                

duplicatedMethods = {};

var checkDuplicate = function(clazzThis, funName, fpName) {
	var proto = clazzThis.prototype;
	var f$ = proto[funName];
  if (f$ && (f$.claxxOwner || f$.claxxReference) === clazzThis) {
    key = clazzThis.__CLASS_NAME__ + "." + funName + fpName;
    var m = duplicatedMethods[key];
    if (m) {
      var s = "Warning! Duplicate method found for " + key;
      System.out.println(s);
      Clazz.alert(s);
      duplicatedMethods[key] = m + 1; 
    } else {
      duplicatedMethods[key] = 1;
    }
  }
}

Clazz.showDuplicates = function(quiet) {
  var s = "";
  var a = duplicatedMethods;
  var n = 0;
  for (var key in a)
    if (a[key] > 1) {
      s += a[key] + "\t" + key + "\n";
      n++;
    }
  s = "Duplicates: " + n + "\n\n" + s;
  System.out.println(s);
  if (!quiet)
    alert(s);
}

var findArrayItem = function(arr, item) {
	if (arr && item)
		for (var i = arr.length; --i >= 0;)
			if (arr[i] === item)
				return i;
	return -1;
}

var removeArrayItem = function(arr, item) {
	var i = findArrayItem(arr, item);
	if (i >= 0) {
		var n = arr.length - 1;
		for (; i < n; i++)
			arr[i] = arr[i + 1];
		arr.length--;
		return true;
	}
}

/*
 * Other developers may need to extend this formatParameters method
 * to deal complicated situation.
 */
/* protected */
var formatParameters = function (funParams) {
	return (funParams ? funParams.replace (/~([NABSO])/g, 
      function ($0, $1) {
      	switch ($1) {
      	case 'N':
      		return "n";
      	case 'B':
      		return "b";
      	case 'S':
      		return "String";
      	case 'O':
      		return "Object";
      	case 'A':
      		return "Array";
      	}
      	return "Unknown";
      }).replace (/\s+/g, "").replace (/^|,/g, "\\").replace (/\$/g, "org.eclipse.s") : "\\void");
};

/*
 * Override the existed methods which are in the same name.
 * Overriding methods is provided for the purpose that the JavaScript
 * does not need to search the whole hierarchied methods to find the
 * correct method to execute.
 * Be cautious about this method. Incorrectly using this method may
 * break the inheritance system.
 *
 * @param clazzThis host class in which the method to be defined
 * @param funName method name
 * @param funBody function object, e.g function () { ... }
 * @param funParams paramether signature, e.g ["string", "number"]
 */
/* public */
Clazz.overrideMethod = function(clazzThis, funName, funBody, funParams) {
	//if (Clazz.assureInnerClass) Clazz.assureInnerClass (clazzThis, funBody);
	funBody.exName = funName;
	var fpName = formatParameters(funParams);
  if (Clazz._Loader._checkLoad)
    checkDuplicate(clazzThis, funName, fpName);
	/*
	 * Replace old methods with new method. No super methods are kept.
	 */
	funBody.funParams = fpName; 
	funBody.claxxOwner = clazzThis;
	return addProto(clazzThis.prototype, funName, funBody);
};

//////////////  Overridden and Overloaded Java Method Handling //////////////////
//                       SAEM (SearchAndExecuteMethod)
// adapted by BH
//

/*
 * BH Clazz.getProfile monitors exactly what is being delegated with SAEM,
 * which could be a bottle-neck for function calling.
 * This is critical for performance optimization.
 */ 

  var __signatures = ""; 

Clazz.getProfile = function() {
  	var s = "";
	if (_profile) {
		var l = [];
		for (var i in _profile) {
			var n = "" + _profile[i];
			l.push("        ".substring(n.length) + n + "\t" + i);
		}
		s = l.sort().reverse().join("\r\n");
		_profile = {};
	}
	return s; //+ __signatures;
}

var addProfile = function(c, f, p, id) {
	var s = c.__CLASS_NAME__ + " " + f + " ";// + JSON.stringify(p);
  if (__signatures.indexOf(s) < 0)
    __signatures += s + "\n";    
	_profile[s] || (_profile[s] = 0);
	_profile[s]++;
}

/**
 * Called also by Throwable
 *  
/* public */
Clazz.getParamsType = function (funParams) {
	// bh: optimization here for very common cases
	var n = funParams.length;
	switch (n) {
	case 0:
		var params = ["void"];
		params.typeString = "\\void";
		return params;
	case 1:
	  // BH just so common
    switch (typeof obj) {
    case "number":
			var params = ["n"];
			params.typeString = "\\n";
			return params;
    case "boolean":
			var params = ["b"];
			params.typeString = "\\b";
			return params;
		}
	}

	var params = [];
	params.hasCastedNull = false;
	if (funParams) {
		for (var i = 0; i < n; i++) {
			params[i] = Clazz.getClassName (funParams[i]);
			if (funParams[i] instanceof Clazz.CastedNull) {
				params.hasCastedNull = true;
			}
		}
	}
	params.typeString = "\\" + params.join ('\\');
	return params;
};

var SAEMid = 0;
//xxxSAEMlist = "";

//var SAEMarray = [];
/**
 * BH: OK, this was an idea that doesn't work. The idea was to tag SAEM calls
 * and then refer back to an array. But the id number cannot be put in the right place.
 * 
 * Say we have this:
 * 
 * StringBuffer sb = new StringBuffer(); 
 * sb.append("").append(1);
 * 
 * Here we have two different append methods to call. They are saved under two
 * names:  StringBuffer.prototype.append["\\String"] 
 *     and StringBuffer.prototype.append["\\Number"]
 * 
 * The job of generateDelegatingMethod is to discriminate between those two. We can do
 * that, but the real issue is that we have to do that EVERY time a call is made.
 * This is a problem that must be handled at compile time. There is no way to 
 * make .append("") to go one way the first time and another way the second time. 
 * What we need at run time is something like this:
 * 
 * Clazz.delegate(sb.append,1,[""]) and Clazz.delegate(sb.append,2,[1])
 * The we would be able to log those numbers at run time and refer to them.
 *                     
 * The only real way to avoid SAEM is: 
 * 
 * 1) to never call super() -- always call a differently named function in a superclass.
 * 2) don't overload functions 
 *  
 */   


/**
 * Search the given class prototype, find the method with the same
 * method name and the same parameter signatures by the given 
 * parameters, and then run the method with the given parameters.
 *
 * @param objThis the current host object
 * @param claxxRef the current host object's class
 * @param fxName the method name
 * @param funParams the given arguments
 * @return the result of the specified method of the host object,
 * the return maybe void.
 * @throws MethodNotFoundException if no matched method is found
 */
/* protected */
var searchAndExecuteMethod = function (id, objThis, claxxRef, fxName, args, _saem) {

//  var fx = SAEMarray[id];
//  if (fx) {
//    return fx.apply(objThis, args);
//  }


	fx = objThis[fxName];
	var params = Clazz.getParamsType(args);


//var s = "SAEM " + claxxRef.__CLASS_NAME__ + "." + fxName + "(" + params+ ")\n";
//if (xxxSAEMlist.length > 300)xxxSAEMlist = "";
//xxxSAEMlist += s;
 

  if (!fx)    
    try {System.out.println(Clazz.getStackTrace(5))} catch (e){}
	_profile && addProfile(claxxRef, fxName, params, id);
	// Cache last matched method
	if (fx.lastParams == params.typeString && fx.lastClaxxRef === claxxRef) {
		var methodParams;
		if (params.hasCastedNull) {
			methodParams = [];
			// For Clazz.CastedNull instances, the type name is
			// already used to indentified the method in searchMethod.
			for (var k = 0; k < args.length; k++)
				methodParams[k] = (args[k] instanceof Clazz.CastedNull ? null : args[k]);
		} else {
//      if (fx.lastMethod) SAEMarray[id] = fx.lastMethod;
			methodParams = args;
		}
		return (fx.lastMethod ? fx.lastMethod.apply(objThis, methodParams) : null);
	}
	fx.lastParams = params.typeString;
	fx.lastClaxxRef = claxxRef;

	var stacks = fx.stacks;
	if (!stacks)
		stacks = claxxRef.prototype[fxName].stacks;
	var length = stacks.length;

	/*
	 * Search the inheritance stacks to get the given class' function
	 */
	var began = false; // began to search its super classes
	for (var i = length; --i >= 0;) {
		if (began || stacks[i] === claxxRef) {
			/*
			 * First try to search method within the same class scope
			 * with stacks[i] === claxxRef
			 */
			var clazzFun = stacks[i].prototype[fxName];
			var ret = tryToSearchAndExecute(id, fxName, objThis, clazzFun, params,
					args, fx);
			if (!(ret instanceof MethodException)) {
				return ret;
			}
			/*
			 * As there are no such methods in current class, Clazz will try 
			 * to search its super class stacks. Here variable began indicates
			 * that super searchi is began, and there is no need checking
			 * <code>stacks[i] === claxxRef</code>
			 */
			began = true; 
		} // end of if
	} // end of for
	if ("construct" == fxName) {
		/*
		 * For non existed constructors, just return without throwing
		 * exceptions. In Java codes, extending Object can call super
		 * default Object#constructor, which is not defined in JS.
		 */
		return;
	}
	newMethodNotFoundException(objThis, claxxRef, 
			fxName, params.typeString);
};


/* private */
var tryToSearchAndExecute = function(id, fxName, objThis, clazzFun, params, args, fx, _ttsaem) {
	var method = [];
	var generic = true;
	for (var fn in clazzFun) {
		if (fn.charCodeAt(0) == 92) { // 92 == '\\'.charCodeAt (0)
			var ps = fn.substring(1).split("\\");
			(ps.length == params.length) && method.push(ps);
  		generic = false;
			continue;
		}
		/*
		 * When there is only one method in the class, use the args
		 * to identify the parameter type.
		 *
		 * AbstractCollection.remove (Object)
		 * AbstractList.remove (int)
		 * ArrayList.remove (int)
		 *
		 * Then calling #remove (Object) method on ArrayList instance will 
		 * need to search up to the AbstractCollection.remove (Object),
		 * which contains only one method.
		 */
		/*
		 * See Clazz#defineMethod --Mar 10, 2006, josson
		 */
		if (generic && fn == "funParams" && clazzFun.funParams) {
			fn = clazzFun.funParams;
			var ps = fn.substring(1).split ("\\");
			(ps.length == params.length) && (method[0] = ps);
			break;
		}
	}
  var debug = false;//(method.length > 1 && method.join().indexOf("Listen")< 0 && params.join().indexOf("Null") >= 0)
  if (debug)alert(fxName + " -- " + method.join("|") + " -- searching for method with " + params)
  if (method.length == 0 || !(method = searchMethod(method, params, debug)))
	  return new MethodException();
  if (debug) alert("OK: \\" + method)
	var f = (generic ? clazzFun : clazzFun["\\" + method]);
	//if (generic) 
  //{ /* Use the generic method */
		/*
		 * Will this case be reachable?
		 * March 4, 2006 josson
		 * 
		 * Reachable for calling #remove (Object) method on 
		 * ArrayList instance
		 * May 5, 2006 josson
		 */
	var methodParams = null;
	if (params.hasCastedNull) {
		methodParams = [];
		for (var k = 0; k < args.length; k++) {
			if (args[k] instanceof Clazz.CastedNull) {
				/*
				 * For Clazz.CastedNull instances, the type name is
				 * already used to indentify the method in searchMethod.
				 */
				methodParams[k] = null;
			} else {
				methodParams[k] = args[k];
			}
		}
	} else {
		methodParams = args;
	}
	fx.lastMethod = f;
  //if (!params.hasCastedNull) SAEMarray[id] = f;
	return f.apply(objThis, methodParams);
};

/**
 * Search the existed polymorphic methods to get the matched method with
 * the given parameter types.
 *
 * @param existedMethods Array of string which contains method parameters
 * @param paramTypes Array of string that is parameter type.
 * @return string of method parameters seperated by "\\"
 */
/* private */
var searchMethod = function(roundOne, paramTypes, debug) {

// Filter out all the fitted methods for the given parameters
	var roundTwo = [];
	var len = roundOne.length;
	for (var i = 0; i < len; i++) {
		var fittedLevel = [];
		var isFitted = true;
		var len2 = roundOne[i].length;
		for (var j = 0; j < len2; j++) {
    
			fittedLevel[j] = Clazz.getInheritedLevel (paramTypes[j], 
					roundOne[i][j]);
      //if (debug)alert([paramTypes[j],fittedLevel[j],roundOne[i][j]])    
			if (fittedLevel[j] < 0) {
				isFitted = false;
				break;
			}
		}
		if (isFitted) {
			fittedLevel[paramTypes.length] = i; // Keep index for later use
			roundTwo.push(fittedLevel);
		}
	}
	if (roundTwo.length == 0)
		return null;
	// Find out the best method according to the inheritance.
	var resultTwo = roundTwo;
	var min = resultTwo[0];
	for (var i = 1; i < resultTwo.length; i++) {
		var isVectorLesser = true;
		for (var j = 0; j < paramTypes.length; j++) {
			if (min[j] < resultTwo[i][j]) {
				isVectorLesser = false;;
				break;
			}
		}
		if (isVectorLesser)
			min = resultTwo[i];
	}
	var index = min[paramTypes.length]; // Get the previously stored index
	/*
	 * Return the method parameters' type string as indentifier of the
	 * choosen method.
	 */
	return roundOne[index].join ('\\');
};

////////////////////////////////// package loading ///////////////////////

/*
 * all root packages. e.g. java.*, org.*, com.*
 */
/* protected */
Clazz.allPackage = {};

/**
 * Will be used to keep value of whether the class is defined or not.
 */
/* protected */
Clazz.allClasses = {};

Clazz.lastPackageName = null;
Clazz.lastPackage = null;

/* protected */
Clazz.unloadedClasses = [];

/* public */
Clazz.declarePackage = function (pkgName) {
	if (Clazz.lastPackageName == pkgName)
		return Clazz.lastPackage;
	if (pkgName && pkgName.length) {
		var pkgFrags = pkgName.split (/\./);
		var pkg = Clazz.allPackage;
		for (var i = 0; i < pkgFrags.length; i++) {
			if (!pkg[pkgFrags[i]]) {
				pkg[pkgFrags[i]] = { 
					__PKG_NAME__ : (pkg.__PKG_NAME__ ? 
						pkg.__PKG_NAME__ + "." + pkgFrags[i] : pkgFrags[i])
				}; 
				// pkg[pkgFrags[i]] = {};
				if (i == 0) {
					// eval ...
					Clazz.setGlobal(pkgFrags[i], pkg[pkgFrags[i]]);
				}
			}
			pkg = pkg[pkgFrags[i]]
		}
		Clazz.lastPackageName = pkgName;
		Clazz.lastPackage = pkg;
		return pkg;
	}
};

/* protected */
Clazz.evalType = function (typeStr, isQualified) {
	var idx = typeStr.lastIndexOf(".");
	if (idx != -1) {
		var pkgName = typeStr.substring (0, idx);
		var pkg = Clazz.declarePackage (pkgName);
		var clazzName = typeStr.substring (idx + 1);
		return pkg[clazzName];
	} 
	if (isQualified)
		return window[typeStr];
	switch (typeStr) {
	case "string":
		return String;
	case "number":
		return Number;
  case "object":
		return Clazz._O;
	case "boolean":
		return Boolean;
	case "function":
		return Function;
  case "void":
  case "undefined":
  case "unknown":
		return typeStr;
	case "NullObject":
		return NullObject;
	default:
		return window[typeStr];
	}
};

/**
 * Define a class or interface.
 *
 * @param qClazzName String presents the qualified name of the class
 * @param clazzFun Function of the body
 * @param clazzParent Clazz to inherit from, may be null
 * @param interfacez Clazz may implement one or many interfaces
 *   interfacez can be Clazz object or Array of Clazz objects.
 * @return Ruturn the modified Clazz object
 */
/* public */
Clazz.defineType = function (qClazzName, clazzFun, clazzParent, interfacez) {
	var cf = Clazz.unloadedClasses[qClazzName];
	if (cf) {
		clazzFun = cf;
	}
	var idx = qClazzName.lastIndexOf (".");
	if (idx != -1) {
		var pkgName = qClazzName.substring (0, idx);
		var pkg = Clazz.declarePackage (pkgName);
		var clazzName = qClazzName.substring (idx + 1);
		if (pkg[clazzName]) {
			// already defined! Should throw exception!
			return pkg[clazzName];
		}
		pkg[clazzName] = clazzFun;
	} else {
		if (window[qClazzName]) {
			// already defined! Should throw exception!
			return window[qClazzName];
		}
		Clazz.setGlobal(qClazzName, clazzFun);
	}
	Clazz.decorateAsType(clazzFun, qClazzName, clazzParent, interfacez);
	/*# {$no.javascript.support} >>x #*/
	var iFun = Clazz._innerFunctions;
	clazzFun.defineMethod = iFun.defineMethod;
	clazzFun.defineStaticMethod = iFun.defineStaticMethod;
	clazzFun.makeConstructor = iFun.makeConstructor;
	/*# x<< #*/
	return clazzFun;
};

var isSafari = (navigator.userAgent.indexOf ("Safari") != -1);
var isSafari4Plus = false;
if (isSafari) {
	var ua = navigator.userAgent;
	var verIdx = ua.indexOf("Version/");
	if (verIdx  != -1) {
		var verStr = ua.substring(verIdx + 8);
		var verNumber = parseFloat(verStr);
		isSafari4Plus = verNumber >= 4.0;
	}
}

/* public */
Clazz.instantialize = function (objThis, args) {


	if (args && args.length == 1 && args[0] 
			&& args[0] instanceof args4InheritClass) {
		return;
	}
	if (objThis instanceof Number) {
		objThis.valueOf = function () {
			return this;
		};
	}
	if (isSafari4Plus) { // Fix bug of Safari 4.0+'s over-optimization
		var argsClone = [];
		for (var k = 0; k < args.length; k++) {
			argsClone[k] = args[k];
		}
		args = argsClone;
	}

	var c = objThis.construct;
	if (c) {
		if (!objThis.con$truct) { // no need to init fields
			c.apply (objThis, args);
		} else if (!objThis.getClass ().superClazz) { // the base class
			objThis.con$truct.apply (objThis, []);
			c.apply (objThis, args);
		} else if ((c.claxxOwner 
				&& c.claxxOwner === objThis.getClass ())
				|| (c.stacks 
				&& c.stacks[c.stacks.length - 1] == objThis.getClass ())) {
			/*
			 * This #construct is defined by this class itself.
			 * #construct will call Clazz.superConstructor, which will
			 * call #con$truct back
			 */
			c.apply (objThis, args);
		} else { // constructor is a super constructor
			if (c.claxxOwner && !c.claxxOwner.superClazz 
						&& c.claxxOwner.con$truct) {
				c.claxxOwner.con$truct.apply (objThis, []);
			} else if (c.stacks && c.stacks.length == 1
					&& !c.stacks[0].superClazz) {
				c.stacks[0].con$truct.apply (objThis, []);
			}
			c.apply (objThis, args);
			objThis.con$truct.apply (objThis, []);
		}
	} else if (objThis.con$truct) {
		objThis.con$truct.apply (objThis, []);
	}
};

/**
 * Once there are other methods registered to the Function.prototype, 
 * those method names should be add to the following Array.
 */
/*
 * static final member of interface may be a class, which may
 * be function.
 */
/* protected */
Clazz.innerFunctionNames = [
	"isInstance", "equals", "hashCode", /*"toString",*/ "getName", "getCanonicalName", "getClassLoader", "getResource", "getResourceAsStream" /*# {$no.javascript.support} >>x #*/, "defineMethod", "defineStaticMethod",
	"makeConstructor" /*# x<< #*/
];

/*
 * Static methods
 */
Clazz._innerFunctions = {
	/*
	 * Similar to Object#equals
	 */
   
  isInstance: function(c) {
    return Clazz.instanceOf(c, this);
  },
  
	equals : function (aFun) {
		return this === aFun;
	},

	hashCode : function () {
		return this.getName ().hashCode ();
	},

	toString : function () {
		return "class " + this.getName ();
	},

	/*
	 * Similar to Class#getName
	 */
	getName : function () {
		return Clazz.getClassName (this, true);
	},
	getCanonicalName : function () {
		return this.__CLASS_NAME__;
	},
	getClassLoader : function () {
		var clazzName = this.__CLASS_NAME__;
		var baseFolder = Clazz._Loader.getClasspathFor(clazzName);
		var x = baseFolder.lastIndexOf (clazzName.replace (/\./g, "/"));
		if (x != -1) {
			baseFolder = baseFolder.substring (0, x);
		} else {
			baseFolder = Clazz._Loader.getClasspathFor(clazzName, true);
		}
		var loader = Clazz._Loader.requireLoaderByBase(baseFolder);
		loader.getResourceAsStream = Clazz._innerFunctions.getResourceAsStream;
		loader.getResource = Clazz._innerFunctions.getResource; // BH
		return loader;
	},

	getResource : function(name) {
		var stream = this.getResourceAsStream(name);
    return (stream ? stream.url : null);
	},

	getResourceAsStream : function (name) {
		if (!name)
			return null;
		name = name.replace (/\\/g, '/');
		var baseFolder = null;
    var fname = name;
		var clazzName = this.__CLASS_NAME__;
		if (arguments.length == 2 && name.indexOf ('/') != 0) { // additional argument
			name = "/" + name;
		}
		if (name.indexOf ('/') == 0) {
			//is.url = name.substring (1);
			if (arguments.length == 2) { // additional argument
				baseFolder = arguments[1];
				if (!baseFolder)
					baseFolder = Clazz.binaryFolders[0];
			} else if (Clazz._Loader) {
				baseFolder = Clazz._Loader.getClasspathFor(clazzName, true);
			}
			if (!baseFolder) {
				fname = name.substring (1);
			} else {
				baseFolder = baseFolder.replace (/\\/g, '/');
				var length = baseFolder.length;
				var lastChar = baseFolder.charAt (length - 1);
				if (lastChar != '/') {
					baseFolder += "/";
				}
				fname = baseFolder + name.substring (1);
			}
		} else {
			if (this.base) {
				baseFolder = this.base;
			} else if (Clazz._Loader) {
				baseFolder = Clazz._Loader.getClasspathFor(clazzName);
				var x = baseFolder.lastIndexOf (clazzName.replace (/\./g, "/"));
				if (x != -1) {
					baseFolder = baseFolder.substring (0, x);
				} else {
					//baseFolder = null;
					var y = -1;
					if (baseFolder.indexOf (".z.js") == baseFolder.length - 5
							&& (y = baseFolder.lastIndexOf ("/")) != -1) {
						baseFolder = baseFolder.substring (0, y + 1);
						var pkgs = clazzName.split (/\./);
						for (var k = 1; k < pkgs.length; k++) {
							var pkgURL = "/";
							for (var j = 0; j < k; j++) {
								pkgURL += pkgs[j] + "/";
							}
							if (pkgURL.length > baseFolder.length) {
								break;
							}
							if (baseFolder.indexOf (pkgURL) == baseFolder.length - pkgURL.length) {
								baseFolder = baseFolder.substring (0, baseFolder.length - pkgURL.length + 1);
								break;
							}
						}
					} else {
						baseFolder = Clazz._Loader.getClasspathFor(clazzName, true);
					}
				}
			} else {
				var bins = Clazz.binaryFolders;
				if (bins && bins.length) {
					baseFolder = bins[0];
				}
			}
			if (!baseFolder)
				baseFolder = "j2s/";
			baseFolder = baseFolder.replace (/\\/g, '/');
			var length = baseFolder.length;
			var lastChar = baseFolder.charAt (length - 1);
			if (lastChar != '/') {
				baseFolder += "/";
			}
			if (this.base) {
				fname = baseFolder + name;
			} else {
				var idx = clazzName.lastIndexOf ('.');
				if (idx == -1 || this.base) {
					fname = baseFolder + name;
				} else {
					fname = baseFolder + clazzName.substring (0, idx)
							.replace (/\./g, '/') +  "/" + name;
				}
			}            
		}
    var url = null;
    try {
      if (fname.indexOf(":/") < 0) {
        var d = document.location.href.split("?")[0].split("/");
        d[d.length - 1] = fname;
        fname = d.join("/");
      }
      url = new java.net.URL(fname);
    } catch (e) {
    }
		var data = (url == null ? null : Jmol._getFileData(fname.toString()));
    if (!data || data == "error" || data.indexOf("[Exception") == 0)
      return null;
    var bytes = new java.lang.String(data).getBytes();      
    var is = new java.io.BufferedInputStream ( new java.io.ByteArrayInputStream (bytes)); 
    is.url = url;
		return is;
	}/*# {$no.javascript.support} >>x #*/,

	/*
	 * For JavaScript programmers
	 */
	defineMethod : function (methodName, funBody, paramTypes) {
		Clazz.defineMethod (this, methodName, funBody, paramTypes);
	},

	/*
	 * For JavaScript programmers
	 */
	defineStaticMethod : function (methodName, funBody, paramTypes) {
		Clazz.defineMethod (this, methodName, funBody, paramTypes);
		this[methodName] = this.prototype[methodName];
	},

	/*
	 * For JavaScript programmers
	 */
	makeConstructor : function (funBody, paramTypes) {
		Clazz.makeConstructor (this, funBody, paramTypes);
	}
	/*# x<< #*/
};


var cStack = [];

/**
 * BH: I would like to be able to remove "self.c$" here, but that is tricky.
 */
  
Clazz.pu$h = function (c) {
  c || (c = self.c$); // old style
	c && cStack.push(c);
};

Clazz.p0p = function () {
	return cStack.pop();
};

/* protected */
Clazz.decorateAsClass = function (clazzFun, prefix, name, clazzParent, 
		interfacez, parentClazzInstance, _decorateAsClass) {
    
	var prefixName = null;
	if (prefix) {
		prefixName = prefix.__PKG_NAME__;
		if (!prefixName)
			prefixName = prefix.__CLASS_NAME__;      
	}
	var qName = (prefixName ? prefixName + "." : "") + name;
  
    if (Clazz._Loader._classPending[qName]) {
      delete Clazz._Loader._classPending[qName];
      Clazz._Loader._classCountOK++;
      Clazz._Loader._classCountPending--;
    }
  if (Clazz._Loader && Clazz._Loader._checkLoad) {
    System.out.println("decorating class " + prefixName + "." + name);
  }
	var cf = Clazz.unloadedClasses[qName];
	if (cf) {
		clazzFun = cf;
	}
	var qName = null;
	decorateFunction(clazzFun, prefix, name);
	if (parentClazzInstance) {
		Clazz.inheritClass (clazzFun, clazzParent, parentClazzInstance);
	} else if (clazzParent) {
		Clazz.inheritClass (clazzFun, clazzParent);
	}
	if (interfacez) {
		Clazz.implementOf (clazzFun, interfacez);
	}
	return clazzFun;
};

/* private */
var decorateFunction = function (clazzFun, prefix, name, _decorateFunction) {
	var qName;
	if (!prefix) {
		// e.g. Clazz.declareInterface (null, "ICorePlugin", org.eclipse.ui.IPlugin);
		qName = name;
		Clazz.setGlobal(name, clazzFun);
	} else if (prefix.__PKG_NAME__) {
		// e.g. Clazz.declareInterface (org.eclipse.ui, "ICorePlugin", org.eclipse.ui.IPlugin);
		qName = prefix.__PKG_NAME__ + "." + name;
		prefix[name] = clazzFun;
		if (prefix === java.lang)
			Clazz.setGlobal(name, clazzFun);
	} else {
		// e.g. Clazz.declareInterface (org.eclipse.ui.Plugin, "ICorePlugin", org.eclipse.ui.IPlugin);
		qName = prefix.__CLASS_NAME__ + "." + name;
		prefix[name] = clazzFun;
	}
	Clazz.extendJO(clazzFun, qName);
	var inF = Clazz.innerFunctionNames;
	for (var i = 0; i < inF.length; i++) {
		clazzFun[inF[i]] = Clazz._innerFunctions[inF[i]];
	}

	if (Clazz._Loader) 
    Clazz._Loader.updateNodeForFunctionDecoration(qName);
};

/* protected */
Clazz.declareInterface = function (prefix, name, interfacez, _declareInterface) {
	var clazzFun = function () {};
	decorateFunction(clazzFun, prefix, name);
	if (interfacez) {
		Clazz.implementOf (clazzFun, interfacez);
	}
	return clazzFun;
};

/* public */
Clazz.declareType = function (prefix, name, clazzParent, interfacez, 
		parentClazzInstance, _declareType) {
	var f = function () {
		Clazz.instantialize (this, arguments);
	};
	return Clazz.decorateAsClass (f, prefix, name, clazzParent, interfacez, 
			parentClazzInstance);
};

/* public */
Clazz.declareAnonymous = function (prefix, name, clazzParent, interfacez, 
		parentClazzInstance, _declareAnonymous) {
	var f = function () {
		Clazz.prepareCallback(this, arguments);
		Clazz.instantialize (this, arguments);
	};
	return Clazz.decorateAsClass (f, prefix, name, clazzParent, interfacez, 
			parentClazzInstance);
};

/* public */
Clazz.decorateAsType = function (clazzFun, qClazzName, clazzParent, 
		interfacez, parentClazzInstance, inheritClazzFuns, _decorateAsType) {
	Clazz.extendJO(clazzFun, qClazzName);
	clazzFun.equals = Clazz._innerFunctions.equals;
	clazzFun.getName = Clazz._innerFunctions.getName;
	if (inheritClazzFuns) {
		for (var i = 0; i < Clazz.innerFunctionNames.length; i++) {
			var methodName = Clazz.innerFunctionNames[i];
			clazzFun[methodName] = Clazz._innerFunctions[methodName];
		}
	}
	if (parentClazzInstance) {
		Clazz.inheritClass (clazzFun, clazzParent, parentClazzInstance);
	} else if (clazzParent) {
		Clazz.inheritClass (clazzFun, clazzParent);
	}
	if (interfacez) {
		Clazz.implementOf (clazzFun, interfacez);
	}
	return clazzFun;
};


////////////////////////// default package declarations ////////////////////////

/* sgurin: preserve Number.prototype.toString */
Number.prototype._numberToString=Number.prototype.toString;


Clazz.declarePackage ("java.io");
//Clazz.declarePackage ("java.lang");
Clazz.declarePackage ("java.lang.annotation"); // java.lang
Clazz.declarePackage ("java.lang.instrument"); // java.lang
Clazz.declarePackage ("java.lang.management"); // java.lang
Clazz.declarePackage ("java.lang.reflect"); // java.lang
Clazz.declarePackage ("java.lang.ref");  // java.lang.ref
java.lang.ref.reflect = java.lang.reflect;
Clazz.declarePackage ("java.util");
//var reflect = Clazz.declarePackage ("java.lang.reflect");
Clazz.declarePackage ("java.security");


/*
 * Consider these interfaces are basic!
 */
Clazz.declareInterface (java.io,"Closeable");
Clazz.declareInterface (java.io,"DataInput");
Clazz.declareInterface (java.io,"DataOutput");
Clazz.declareInterface (java.io,"Externalizable");
Clazz.declareInterface (java.io,"Flushable");
Clazz.declareInterface (java.io,"Serializable");
Clazz.declareInterface (java.lang,"Iterable");
Clazz.declareInterface (java.lang,"CharSequence");
Clazz.declareInterface (java.lang,"Cloneable");
Clazz.declareInterface (java.lang,"Appendable");
Clazz.declareInterface (java.lang,"Comparable");
Clazz.declareInterface (java.lang,"Runnable");
Clazz.declareInterface (java.util,"Comparator");

java.lang.ClassLoader = {
	__CLASS_NAME__ : "ClassLoader"
};

/******************************************************************************
 * Copyright (c) 2007 java2script.org and others.
 * All rights reserved. This program and the accompanying materials
 * are made available under the terms of the Eclipse Public License v1.0
 * which accompanies this distribution, and is available at
 * http://www.eclipse.org/legal/epl-v10.html
 *
 * Contributors:
 *     Zhou Renjian - initial API and implementation
 *****************************************************************************/
/*******
 * @author zhou renjian
 * @create March 10, 2006
 *******/

/**
 * Once ClassExt.js is part of Class.js.
 * In order to make the Class.js as small as possible, part of its content
 * is moved into this ClassExt.js.
 *
 * See also http://j2s.sourceforge.net/j2sclazz/
 */
 
/**
 * Clazz.MethodNotFoundException is used to notify the developer about calling
 * methods with incorrect parameters.
 */
/* protected */
// Override the Clazz.MethodNotFoundException in Class.js to give details
var newMethodNotFoundException = function (obj, clazz, method, params) {
	var paramStr = "";
	if (params) {
		paramStr = params.substring (1).replace (/\\/g, ",");
	}
	var leadingStr = "";
	if (method && method != "construct") {
		leadingStr = "Method";
	} else {
		leadingStr = "Constructor";
	}
	var message = leadingStr + " " + Clazz.getClassName (clazz, true) + "." 
					+ method + "(" + paramStr + ") is not found!";
  throw new java.lang.NoSuchMethodException(message);        
};

/**
 * Prepare "callback" for instance of anonymous Class.
 * For example for the callback:
 *     this.callbacks.MyEditor.sayHello();
 *     
 * This is specifically for inner classes that are referring to 
 * outer class methods and fields.   
 *
 * @param objThis the host object for callback
 * @param args arguments object. args[0] will be classThisObj -- the "this"
 * object to be hooked
 * 
 * Attention: parameters should not be null!
 */
/* protected */
Clazz.prepareCallback = function (innerObj, args) {
	var outerObj = args[0];
	var cbName = "b$"; // "callbacks";
	if (innerObj && outerObj && outerObj !== window) {
		var className = Clazz.getClassName(outerObj, true);		
		var obs = {};
		if (innerObj[cbName]) // must make a copy!
			for (var s in innerObj[cbName])
				obs[s] = innerObj[cbName][s];
		innerObj[cbName] = obs;
		
		/*
		 * TODO: the following line is SWT-specific! Try to move it out!
		 */
		//			obs[className.replace (/org\.eclipse\.swt\./, "$wt.")] = outerObj;

  	// all references to outer class and its superclass objects must be here as well
		obs[className] = outerObj;
		var clazz = Clazz.getClass(outerObj);
		while (clazz.superClazz) {
			clazz = clazz.superClazz;
			/*
			 * TODO: the following line is SWT-specific! Try to move it out!
			 */
			//				obs[Clazz.getClassName (clazz, true)
			//						.replace (/org\.eclipse\.swt\./, "$wt.")] = outerObj;
			obs[Clazz.getClassName(clazz, true)] = outerObj;
		}
		var cbs = outerObj[cbName];
		if (cbs)
			for (var s in cbs)
				obs[s] = cbs[s];
	}
	// remove "this" argument
	// note that args is an instance of arguments -- NOT an array; does not have the .shift() method!
	for (var i = 0; i < args.length - 1; i++)
		args[i] = args[i + 1];
  if (args.length > 0)
  	args.length--;
};

/**
 * Construct instance of the given inner class.
 *
 * @param classInner given inner class, alway with name like "*$*"
 * @param innerObj this instance which can be used to call back.
 * @param finalVars final variables which the inner class may use
 * @return the constructed object
 *
 * @see Clazz#cloneFinals
 */
/* public */
Clazz.innerTypeInstance = function (clazzInner, innerObj, finalVars) {
	if (!clazzInner)
		clazzInner = arguments.callee.caller;
	var obj;
	if (finalVars || innerObj.$finals) {
			obj = new clazzInner(innerObj, Clazz.inheritArgs);
		// f$ is short for the once choosen "$finals"
		if (finalVars) {
			if (innerObj.f$) {
				var o = {};
				for (var attr in innerObj.f$)
					o[attr] = innerObj.f$[attr];
				for (var attr in finalVars)
					o[attr] = finalVars[attr];
				obj.f$ = o;
			} else {
				obj.f$ = finalVars;
			}
		} else if (innerObj.f$) {
			obj.f$ = innerObj.f$;
		}
	} else {
		switch (arguments.length) {
		case 3:
			return new clazzInner(innerObj);
		case 4:
			return (innerObj.__CLASS_NAME__ == clazzInner.__CLASS_NAME__
					&& arguments[3] === Clazz.inheritArgs ? innerObj : new clazzInner(innerObj, arguments[3]));
		case 5:
			return new clazzInner(innerObj, arguments[3], arguments[4]);
		case 6:
			return new clazzInner(innerObj, arguments[3], arguments[4], 
					arguments[5]);
		case 7:
			return new clazzInner(innerObj, arguments[3], arguments[4], 
					arguments[5], arguments[6]);
		case 8:
			return new clazzInner(innerObj, arguments[3], arguments[4], 
					arguments[5], arguments[6], arguments[7]);
		case 9:
			return new clazzInner(innerObj, arguments[3], arguments[4], 
					arguments[5], arguments[6], arguments[7], arguments[8]);
		case 10:
			return new clazzInner(innerObj, arguments[3], arguments[4], 
					arguments[5], arguments[6], arguments[7], arguments[8],
					arguments[9]);
		default:
			//Should construct instance manually.
			obj = new clazzInner(innerObj, Clazz.inheritArgs);
			break;
		}
	}
	var n = arguments.length - 3;
	var args = new Array(n);
	for (var i = n; --i >= 0;)
		args[i] = arguments[i + 3];
	Clazz.instantialize(obj, args);
	return obj;
};

/**
 * Clone variables whose modifier is "final".
 * Usage: var o = Clazz.cloneFinals ("name", name, "age", age);
 *
 * @return Object with all final variables
 */
/* public */
Clazz.cloneFinals = function () {
	var o = {};
	var len = arguments.length / 2;
	for (var i = len; --i >= 0;)
		o[arguments[i + i]] = arguments[i + i + 1];
	return o;
};

/* public */
Clazz.isClassDefined = Clazz.isDefinedClass = function(clazzName) {
	if (!clazzName) 
		return false;		/* consider null or empty name as non-defined class */
	if (Clazz.allClasses[clazzName])
		return true;
	var pkgFrags = clazzName.split (/\./);
	var pkg = null;
	for (var i = 0; i < pkgFrags.length; i++)
		if (!(pkg = (pkg ? pkg[pkgFrags[i]] : Clazz.allPackage[pkgFrags[0]]))) {
			return false;
    }
  return (pkg && (Clazz.allClasses[clazzName] = true));
};
/**
 * Define the enum constant.
 * @param classEnum enum type
 * @param enumName enum constant
 * @param enumOrdinal enum ordinal
 * @param initialParams enum constant constructor parameters
 * @return return defined enum constant
 */
/* public */
Clazz.defineEnumConstant = function (clazzEnum, enumName, enumOrdinal, initialParams, clazzEnumExt) {
	var o = (clazzEnumExt ? new clazzEnumExt() : new clazzEnum());
	// BH avoids unnecessary calls to SAEM
	o.$name = enumName;
	o.$ordinal = enumOrdinal;
	//Clazz.superConstructor (o, clazzEnum, [enumName, enumOrdinal]);
	if (initialParams && initialParams.length)
		o.construct.apply (o, initialParams);
	clazzEnum[enumName] = o;
	clazzEnum.prototype[enumName] = o;
	if (!clazzEnum["$ values"]) {         // BH added
		clazzEnum["$ values"] = []          // BH added
		clazzEnum.values = function() {     // BH added
			return this["$ values"];          // BH added
		};                                  // BH added
	}
	clazzEnum["$ values"].push(o);
	return o;
};

//////// (int) conversions //////////

Clazz.floatToInt = function (x) {
	return isNaN(x) ? 0 : x < 0 ? Math.ceil(x) : Math.floor(x);
};

Clazz.floatToByte = Clazz.floatToShort = Clazz.floatToLong = Clazz.floatToInt;
Clazz.doubleToByte = Clazz.doubleToShort = Clazz.doubleToLong = Clazz.doubleToInt = Clazz.floatToInt;

Clazz.floatToChar = function (x) {
	return String.fromCharCode (x < 0 ? Math.ceil(x) : Math.floor(x));
};

Clazz.doubleToChar = Clazz.floatToChar;



///////////////////////////////// Array additions //////////////////////////////
//
// BH: these are necessary for integer processing, especially
//
//

var getArrayType = function(n, nbits) {
		if (!n) n = 0;
    if (typeof n == "object") {
      var b = n;
    } else {
  		var b = new Array(n);
	   	for (var i = 0; i < n; i++)b[i] = 0
    }
    b.BYTES_PER_ELEMENT = nbits >> 3;
    b._fake = true;    
		return b;
} 

var arraySlice = function(istart, iend) {
  // could be Safari or could be fake
  istart || (istart = 0);
  iend || (iend = this.length);
  if (this._fake) {    
    var b = new this.constructor(iend - istart); 
    System.arraycopy(this, istart, b, 0, iend - istart); 
    return b; 
  }
  return new this.constructor(this.buffer.slice(istart * this.BYTES_PER_ELEMENT, iend * this.BYTES_PER_ELEMENT));
};
      
if ((Clazz.haveInt32 = !!(self.Int32Array && self.Int32Array != Array)) == true) {
	if (!Int32Array.prototype.sort)
		Int32Array.prototype.sort = Array.prototype.sort
} else {
	Int32Array = function(n) { return getArrayType(n, 32); };
	Int32Array.prototype.sort = Array.prototype.sort
  Int32Array.prototype.toString = function(){return "[object Int32Array]"};
}
if (!Int32Array.prototype.slice)
  Int32Array.prototype.slice = function() {return arraySlice.apply(this, arguments)};
Int32Array.prototype.clone = function() { var a = this.slice(); a.BYTES_PER_ELEMENT = 4; return a; };

if ((Clazz.haveFloat64 = !!(self.Float64Array && self.Float64Array != Array)) == true) {
	if (!Float64Array.prototype.sort)
		Float64Array.prototype.sort = Array.prototype.sort
} else {
	Float64Array = function(n) { return getArrayType(n, 64); };
	Float64Array.prototype.sort = Array.prototype.sort
	Float64Array.prototype.toString = function() {return "[object Float64Array]"};
// Darn! Mozilla makes this a double, not a float. It's 64-bit.
// and Safari 5.1 doesn't have Float64Array 
}
if (!Float64Array.prototype.slice)
  Float64Array.prototype.slice = function() {return arraySlice.apply(this, arguments)};
Float64Array.prototype.clone =  function() { return this.slice(); };

/**
 * Make arrays.
 *
 * @return the created Array object
 */
/* public */
Clazz.newArray = function (a, b, c, d) {
  if (a != -1 || arguments.length == 2) { 
    // Clazz.newArray(36,null)
    // Clazz.newArray(3, 0)
    // Clazz.newArray(-1, ["A","B"])
    // Clazz.newArray(3, 5, null)
    return newTypedArray(arguments, 0);
  }
  // truncate array using slice
  // Clazz.newArray(-1, array, ifirst, ilast+1)
  // from JU.AU; slice, ensuring BYTES_PER_ELEMENT is set correctly
  a = b.slice(c, d);
  a.BYTES_PER_ELEMENT = b.BYTES_PER_ELEMENT;
  return a;
};


var newTypedArray = function(args, nBits) {
	var dim = args[0];
	if (typeof dim == "string")
		dim = dim.charCodeAt(0); // char
	var last = args.length - 1;
	var val = args[last];
  if (last > 1) {
     // array of arrays
     // Clazz.newArray(3, 5, null)
    var xargs = new Array(last); // 2 in this case
    for (var i = 0; i < last; i++)
    	xargs[i] = args[i + 1];
    var arr = new Array(dim);
  	for (var i = 0; i < dim; i++)
  		arr[i] = newTypedArray(xargs, nBits); // Call recursively
    return arr;
  }
  // Clazz.newArray(36,null)
  // Clazz.newArray(3, 0)
  // Clazz.newArray(-1, ["A","B"])
  if (nBits > 0 && dim < 0)
    dim = val; // because we can initialize an array using new Int32Array([...])
  switch (nBits) {
  case 8:
  	var arr = new Int8Array(dim);
    arr.BYTES_PER_ELEMENT = 1;
    return arr;
  case 32:
  	var arr = new Int32Array(dim);
    arr.BYTES_PER_ELEMENT = 4;
    return arr;
  case 64:
    var arr = new Float64Array(dim);
    arr.BYTES_PER_ELEMENT = 8;
    return arr;
  default:
  	var arr = (dim < 0 ? val : new Array(dim));
    arr.BYTES_PER_ELEMENT = 0;
    if (dim > 0 && val != null)
    	for (var i = dim; --i >= 0;)
     		arr[i] = val;
    return arr;
  }
}

/**
 * Make arrays.
 *
 * @return the created Array object
 */
/* public */
Clazz.newByteArray  = function () {
	return newTypedArray(arguments, 8);
}

/**
 * Make arrays.
 *
 * @return the created Array object
 */
/* public */
Clazz.newIntArray  = function () {
	return newTypedArray(arguments, 32);
}

/**
 * Make arrays.
 *
 * @return the created Array object
 */
/* public */
Clazz.newFloatArray  = function () {
	return newTypedArray(arguments, 64);
}

Clazz.newDoubleArray = Clazz.newFloatArray;
Clazz.newLongArray = Clazz.newShortArray = Clazz.newIntArray;
Clazz.newCharArray = Clazz.newBooleanArray = Clazz.newArray;
if ((Clazz.haveInt8 = !!self.Int8Array) == true) {
	if (!Int8Array.prototype.sort)
		Int8Array.prototype.sort = Array.prototype.sort
  if (!Int8Array.prototype.slice)
    Int8Array.prototype.slice = function() {return arraySlice.apply(this, arguments)}; 
} else {
  Clazz.newByteArray = Clazz.newIntArray;
}
Int8Array.prototype.clone = function() { var a = this.slice(); a.BYTES_PER_ELEMENT = 1;return a; };

Clazz.isAB = function(a) {
	return (a && typeof a == "object" && a.BYTES_PER_ELEMENT == 1);
}
Clazz.isAI = function(a) {
	return (a && typeof a == "object" && a.BYTES_PER_ELEMENT == 4);
}

Clazz.isAF = function(a) {
	return (a && typeof a == "object" && a.BYTES_PER_ELEMENT == 8);
}

Clazz.isAS = function(a) { // just checking first parameter
	return (a && typeof a == "object" && a.constructor == Array && (typeof a[0] == "string" || typeof a[0] == "undefined"));
}

Clazz.isAII = function(a) { // assumes non-null a[0]
	return (a && typeof a == "object" && Clazz.isAI(a[0]));
}

Clazz.isAFF = function(a) { // assumes non-null a[0]
	return (a && typeof a == "object" && Clazz.isAF(a[0]));
}

Clazz.isAFFF = function(a) { // assumes non-null a[0]
	return (a && typeof a == "object" && Clazz.isAFF(a[0]));
}

Clazz.isASS = function(a) {
	return (a && typeof a == "object" && Clazz.isAS(a[0]));
}

Clazz.isAFloat = function(a) { // just checking first parameter
	return (a && typeof a == "object" && a.constructor == Array && Clazz.instanceOf(a[0], Float));
}

Clazz.isAP = function(a) {
	return (a && Clazz.getClassName(a[0]) == "JU.P3");
}


/**
 * Make the RunnableCompatiability instance as a JavaScript function.
 *
 * @param jsr Instance of RunnableCompatiability
 * @return JavaScript function instance represents the method run of jsr.
 */
/* public */
/*
Clazz.makeFunction = function (jsr) {
// never used in Jmol -- called by Enum, but not accessible to it -- part of SWT
	return function(e) {
		if (!e)
			e = window.event;
		if (jsr.setEvent)
			jsr.setEvent(e);
		jsr.run();
		switch (jsr.returnSet) {
		case 1: 
			return jsr.returnNumber;
		case 2:
			return jsr.returnBoolean;
		case 3:
			return jsr.returnObject;
		}
	};
};
*/

/* protected */
Clazz.defineStatics = function (clazz) {
	for (var j = arguments.length, i = (j - 1) / 2; --i >= 0;) {
		var val = arguments[--j]
		var name = arguments[--j];
		clazz[name] = clazz.prototype[name] = val;
	}
};

/* public */
Clazz.prepareFields = function (clazz, fieldsFun) {
	var stacks = [];
	if (clazz.con$truct) {
		var ss = clazz.con$truct.stacks;
		var idx = 0;//clazz.con$truct.index;
		for (var i = idx; i < ss.length; i++) {
			stacks[i] = ss[i];
		}
	}
	addProto(clazz.prototype, "con$truct", clazz.con$truct = function () {
		var stacks = arguments.callee.stacks;
		if (stacks) {
			for (var i = 0; i < stacks.length; i++) {
				stacks[i].apply (this, []);
			}
		}
	});
	stacks.push(fieldsFun);
	clazz.con$truct.stacks = stacks;
	clazz.con$truct.index = 0;
};

/*
 * Serialize those public or protected fields in class 
 * net.sf.j2s.ajax.SimpleSerializable.
 */
/* protected */
/*
Clazz.registerSerializableFields = function (clazz) {
	var args = arguments;
	var length = args.length;
	var newArr = [];
	if (clazz.declared$Fields) {
		for (var i = 0; i < clazz.declared$Fields.length; i++) {
			newArr[i] = clazz.declared$Fields[i];
		}
	}
	clazz.declared$Fields = newArr;

	if (length > 0 && length % 2 == 1) {
		var fs = clazz.declared$Fields;
		var n = (length - 1) / 2;
		for (var i = 1; i <= n; i++) {
			var o = { name : args[i + i - 1], type : args[i + i] };
			var existed = false;
			for (var j = 0; j < fs.length; j++) {
				if (fs[j].name == o.name) { // reloaded classes
					fs[j].type = o.type; // update type
					existed = true;
					break;
				}
			}
			if (!existed)
				fs.push(o);
		}
	}
};
*/
/*
 * Get the caller method for those methods that are wrapped by 
 * Clazz.searchAndExecuteMethod.
 *
 * @param args caller method's arguments
 * @return caller method, null if there is not wrapped by 
 * Clazz.searchAndExecuteMethod or is called directly.
 */
/* protected */
/*
Clazz.getMixedCallerMethod = function (args) {
	var o = {};
	var argc = args.callee.caller; // tryToSearchAndExecute
	if (argc && argc !== tryToSearchAndExecute) // inherited method's apply
		argc = argc.arguments.callee.caller;
	if (argc !== tryToSearchAndExecute
		|| (argc = argc.arguments.callee.caller) !== Clazz.searchAndExecuteMethod)
		return null;
	o.claxxRef = argc.arguments[1];
	o.fxName = argc.arguments[2];
	o.paramTypes = Clazz.getParamsType(argc.arguments[3]);	
	argc = argc.arguments.callee.caller // Clazz.generateDelegatingMethod 
					&& argc.arguments.callee.caller; // the private method's caller
	if (!argc)
		return null;
	o.caller = argc;
	return o;
};
*/
/* BH -- The issue here is a subclass calling its private method FOO when
 *       there is also a private method of the same name in its super class.
 *       This can ALWAYS be avoided and, one could argue, is bad 
 *       program design anyway. In Jmol, the presence of this possibility
 *       creates over 8000 references to the global $fx, which was only
 *       checked in a few rare cases. We can then also remove $fz references.
 *         
 */

/*
 * Check and return super private method.
 * In order make private methods be executed correctly, some extra javascript
 * must be inserted into the beggining of the method body of the non-private 
 * methods that with the same method signature as following:
 * <code>
 *			var $private = Clazz.checkPrivateMethod (arguments);
 *			if ($private) {
 *				return $private.apply (this, arguments);
 *			}
 * </code>
 * Be cautious about this. The above codes should be insert by Java2Script
 * compiler or with double checks to make sure things work correctly.
 *
 * @param args caller method's arguments
 * @return private method if there are private method fitted for the current 
 * calling environment
 */
/* public */

Clazz.checkPrivateMethod = function () {
  // get both this one and the one calling it
  me = arguments.callee.caller;
  caller = arguments.callee.caller.caller;
  var stack = me.stacks;
  // if their classes are the same, no issue
  var mySig = "\\" + Clazz.getParamsType(arguments[0]).join("\\")
  if (!me.privateNote) {
    me.privateNote = "You are seeing this note because the method " 
    + me.exName + mySig + " in class " 
    + me.exClazz.__CLASS_NAME__
    + " has a superclass method by the same name (possibly with the same parameters) that is private and "
    + " therefore might be called improperly from this class. If your "
    + " code does not run properly, or you want to make it run faster, change the name of this method to something else."
    System.out.println(me.privateNote);
    alert(me.privateNote);
  }
  /*
  alert([me.exClazz.__CLASS_NAME__, me.exName,
    caller.exClazz.__CLASS_NAME__, caller.exName,stack,mySig])
  if (stack == null || caller.exClazz == me.exClazz)
    return null;
  // I am being called by a different class...
  
  for (var i = stack.length; --i >= 0;) {
    if (stacks[i] != caller.claxxRef)
      continue;
    // and it is on MY class stack
//    if (
     
  }
  */
  
/*	var m = Clazz.getMixedCallerMethod (args);
	if (m == null) return null;
	var callerFx = m.claxxRef.prototype[m.caller.exName];
	if (callerFx == null) return null; // may not be in the class hierarchies
	var ppFun = null;
	if (callerFx.claxxOwner ) {
		ppFun = callerFx.claxxOwner.prototype[m.fxName];
	} else {
		var stacks = callerFx.stacks;
		for (var i = stacks.length - 1; i >= 0; i--) {
			var fx = stacks[i].prototype[m.caller.exName];
			if (fx === m.caller) {
				ppFun = stacks[i].prototype[m.fxName];
			} else if (fx ) {
				for (var fn in fx) {
					if (fn.indexOf ('\\') == 0 && fx[fn] === m.caller) {
						ppFun = stacks[i].prototype[m.fxName];
						break;
					}
				}
			}
			if (ppFun) {
				break;
			}
		}
	}
	if (ppFun && ppFun.claxxOwner == null) {
		ppFun = ppFun["\\" + m.paramTypes];
	}
	if (ppFun && ppFun.isPrivate && ppFun !== args.callee) {
		return ppFun;
	}
*/  
	return null;
};


//$fz = null; // for private method declaration


// /*# {$no.debug.support} >>x #*/
// /*
//  * Option to switch on/off of stack traces.
//  */
// /* protect */
//Clazz.tracingCalling = false;

// /* private */
// Clazz.callingStack = function (caller, owner) {
// 	this.caller = caller;
// 	this.owner = owner;
// };

/*# x<< #*/

/**
 * The first folder is considered as the primary folder.
 * And try to be compatiable with _Loader system.
 */
/* private */


/*** not used in Jmol
 * *
if (window["_Loader"] && _Loader.binaryFolders) {
	Clazz.binaryFolders = _Loader.binaryFolders;
} else {
	Clazz.binaryFolders = ["j2s/", "", "j2slib/"];
}

Clazz.addBinaryFolder = function (bin) {
	if (bin) {
		var bins = Clazz.binaryFolders;
		for (var i = 0; i < bins.length; i++) {
			if (bins[i] == bin) {
				return ;
			}
		}
		bins[bins.length] = bin;
	}
};
Clazz.removeBinaryFolder = function (bin) {
	if (bin) {
		var bins = Clazz.binaryFolders;
		for (var i = 0; i < bins.length; i++) {
			if (bins[i] == bin) {
				for (var j = i; j < bins.length - 1; j++) {
					bins[j] = bins[j + 1];
				}
				bins.length--;
				return bin;
			}
		}
	}
	return null;
};
Clazz.setPrimaryFolder = function (bin) {
	if (bin) {
		Clazz.removeBinaryFolder (bin);
		var bins = Clazz.binaryFolders;
		for (var i = bins.length - 1; i >= 0; i--) {
			bins[i + 1] = bins[i];
		}
		bins[0] = bin;
	}
};

***/


///////////////// special definitions of standard Java class methods ///////////

/**
 * This is a simple implementation for Clazz#load. It just ignore dependencies
 * of the class. This will be fine for jar *.z.js file.
 * It will be overriden by _Loader#load.
 * For more details, see _Loader.js
 */
/* protected */
/*
Clazz.load = function (musts, clazz, optionals, declaration) {
	// not used in Jmol
	if (declaration)
		declaration ();
};
*/

/*
 * Invade the Object prototype!
 * TODO: make sure that invading Object prototype does not affect other
 * existed library, such as Dojo, YUI, Prototype, ...
 */
java.lang.Object = Clazz._O;

Clazz._O.getName = Clazz._innerFunctions.getName;

java.lang.System = System = {
	props : null, //new java.util.Properties (),
	$props : {},
	arraycopy : function (src, srcPos, dest, destPos, length) {  
		if (src !== dest || srcPos > destPos) {
			for (var i = length; --i >= 0;)
				dest[destPos++] = src[srcPos++];
		} else {
      destPos += length;
      srcPos += length;
			for (var i = length; --i >= 0;)
				src[--destPos] = src[--srcPos];
		}
	},
	currentTimeMillis : function () {
		return new Date ().getTime ();
	},
	gc : function() {}, // bh
	getProperties : function () {
		return System.props;
	},
	getProperty : function (key, def) {
		if (System.props)
			return System.props.getProperty (key, def);
		var v = System.$props[key];
    if (typeof v != "undefined")
      return v;
    if (key.indexOf(".") > 0) {
      v = null;    
      switch (key) {
      case "java.version":
        v = "1.6";
      case "file.separator":
      case "path.separator":
        v = "/";
        break;        
      case "line.separator":
        v = (navigator.userAgent.indexOf("Windows") >= 0 ? "\r\n" : "\n");
        break;
      case "os.name":
      case "os.version":
        v = navigator.userAgent;
        break;
      }
      if (v)
        return System.$props[key] = v;
    }
    return (arguments.length == 1 ? null : def == null ? key : def); // BH
	},
	getSecurityManager : function() { return null },  // bh
	setProperties : function (props) {
		System.props = props;
	},
  lineSeparator : function() { return '\n' }, // bh
	setProperty : function (key, val) {
		if (!System.props)
			return System.$props[key] = val; // BH
		System.props.setProperty (key, val);
	}
};

System.identityHashCode=function(obj){
  if(obj==null)
    return 0;
    
        return obj._$hashcode || (obj._$hashcode = ++Clazz._hashCode)

/*    
  try{
    return obj.toString().hashCode();
  }catch(e){
    var str=":";
    for(var s in obj){
     str+=s+":"
    }
    return str.hashCode();
  }
*/  
}

System.out = new Clazz._O ();
System.out.__CLASS_NAME__ = "java.io.PrintStream";
System.out.print = function () {};
System.out.printf = function () {};
System.out.println = function () {};
System.out.write = function () {};

System.err = new Clazz._O ();
System.err.__CLASS_NAME__ = "java.io.PrintStream";
System.err.print = function () {};
System.err.printf = function () {};
System.err.println = function () {};
System.err.write = function () {};

Clazz.popup = Clazz.assert = Clazz.log = Clazz.error = window.alert;

Thread = function () {};
Thread.J2S_THREAD = Thread.prototype.J2S_THREAD = new Thread ();
Thread.currentThread = Thread.prototype.currentThread = function () {
	return this.J2S_THREAD;
};

/* not used in Jmol
Clazz.intCast = function (n) { // 32bit
	var b1 = (n & 0xff000000) >> 24;
	var b2 = (n & 0xff0000) >> 16;
	var b3 = (n & 0xff00) >> 8;
	var b4 = n & 0xff;
	if ((b1 & 0x80) != 0) {
		return -(((b1 & 0x7f) << 24) + (b2 << 16) + (b3 << 8) + b4 + 1);
	} else {
		return (b1 << 24) + (b2 << 16) + (b3 << 8) + b4;
	}
};
Clazz.shortCast = function (s) { // 16bit
	var b1 = (n & 0xff00) >> 8;
	var b2 = n & 0xff;
	if ((b1 & 0x80) != 0) {
		return -(((b1 & 0x7f) << 8) + b2 + 1);
	} else {
		return (b1 << 8) + b4;
	}
};

Clazz.byteCast = function (b) { // 8bit
	if ((b & 0x80) != 0) {
		return -((b & 0x7f) + 1);
	} else {
		return b & 0xff;
	}
};

Clazz.charCast = function (c) { // 8bit
	return String.fromCharCode (c & 0xff).charAt (0);
};

Clazz.floatCast = function (f) { // 32bit
	return f;
};

*/


/*
 * Try to fix JavaScript's shift operator defects on long type numbers.
 */

/* not used in Jmol

Clazz.longMasks = [];

Clazz.longReverseMasks = [];

Clazz.longBits = [];

;(function () {
	var arr = [1];
	for (var i = 1; i < 53; i++) {
		arr[i] = arr[i - 1] + arr[i - 1]; // * 2 or << 1
	}
	Clazz.longBits = arr;
	Clazz.longMasks[52] = arr[52];
	for (var i = 51; i >= 0; i--) {
		Clazz.longMasks[i] = Clazz.longMasks[i + 1] + arr[i];
	}
	Clazz.longReverseMasks[0] = arr[0];
	for (var i = 1; i < 52; i++) {
		Clazz.longReverseMasks[i] = Clazz.longReverseMasks[i - 1] + arr[i];
	}
}) ();


Clazz.longLeftShift = function (l, o) { // 64bit
	if (o == 0) return l;
	if (o >= 64) return 0;
	if (o > 52) {
		error ("[Java2Script] Error : JavaScript does not support long shift!");
		return l;
	}
	if ((l & Clazz.longMasks[o - 1]) != 0) {
		error ("[Java2Script] Error : Such shift operator results in wrong calculation!");
		return l;
	}
	var high = l & Clazz.longMasks[52 - 32 + o];
	if (high != 0) {
		return high * Clazz.longBits[o] + (l & Clazz.longReverseMasks[32 - o]) << 0;
	} else {
		return l << o;
	}
};

Clazz.intLeftShift = function (n, o) { // 32bit
	return (n << o) & 0xffffffff;
};

Clazz.longRightShift = function (l, o) { // 64bit
	if ((l & Clazz.longMasks[52 - 32]) != 0) {
		return Math.round((l & Clazz.longMasks[52 - 32]) / Clazz.longBits[32 - o]) + (l & Clazz.longReverseMasks[o]) >> o;
	} else {
		return l >> o;
	}
};

Clazz.intRightShift = function (n, o) { // 32bit
	return n >> o; // no needs for this shifting wrapper
};

Clazz.long0RightShift = function (l, o) { // 64bit
	return l >>> o;
};

Clazz.int0RightShift = function (n, o) { // 64bit
	return n >>> o; // no needs for this shifting wrapper
};

*/
// Compress the common public API method in shorter name
//$_L=Clazz.load;
//$_W=Clazz.declareAnonymous;$_T=Clazz.declareType;
//$_J=Clazz.declarePackage;$_C=Clazz.decorateAsClass;
//$_Z=Clazz.instantialize;$_I=Clazz.declareInterface;$_D=Clazz.isClassDefined;
//$_H=Clazz.pu$h;$_P=Clazz.p0p;$_B=Clazz.prepareCallback;
//$_N=Clazz.innerTypeInstance;$_K=Clazz.makeConstructor;$_U=Clazz.superCall;$_R=Clazz.superConstructor;
//$_M=Clazz.defineMethod;$_V=Clazz.overrideMethod;$_S=Clazz.defineStatics;
//$_E=Clazz.defineEnumConstant;
//$_F=Clazz.cloneFinals;
//$_Y=Clazz.prepareFields;$_A=Clazz.newArray;$_O=Clazz.instanceOf;
//$_G=Clazz.inheritArgs;$_X=Clazz.checkPrivateMethod;$_Q=Clazz.makeFunction;
//$_s=Clazz.registerSerializableFields;
//$_k=Clazz.overrideConstructor;


/////////////////////// inner function support /////////////////////////////////

/* public */
Clazz.innerFunctionNames = Clazz.innerFunctionNames.concat ([
    "getSuperclass", "isAssignableFrom", 
    "getConstructor", 
    "getDeclaredMethod", "getDeclaredMethods",
    "getMethod", "getMethods",   
		"getModifiers", /*"isArray",*/ "newInstance"]);

/* public */
Clazz._innerFunctions.getSuperclass = function () {
	return this.superClazz;	
};

/* public */
Clazz._innerFunctions.isAssignableFrom = function (clazz) {
	return Clazz.getInheritedLevel (clazz, this) >= 0;	
};

/* public */
Clazz._innerFunctions.getConstructor = function () {
	return new java.lang.reflect.Constructor (this, [], [], 
			java.lang.reflect.Modifier.PUBLIC);
};
/**
 * TODO: fix bug for polymorphic methods!
 */
/* public */
Clazz._innerFunctions.getDeclaredMethods = Clazz._innerFunctions.getMethods = function () {
	var ms = [];
	var p = this.prototype;
	for (var attr in p) {
		if (typeof p[attr] == "function" && !p[attr].__CLASS_NAME__) {
			/* there are polynormical methods. */
			ms.push(new java.lang.reflect.Method (this, attr,
					[], java.lang.Void, [], java.lang.reflect.Modifier.PUBLIC));
		}
	}
	p = this;
	for (var attr in p) {
		if (typeof p[attr] == "function" && !p[attr].__CLASS_NAME__) {
			ms.push(new java.lang.reflect.Method (this, attr,
					[], java.lang.Void, [], java.lang.reflect.Modifier.PUBLIC
					| java.lang.reflect.Modifier.STATIC));
		}
	}
	return ms;
};
/* public */
Clazz._innerFunctions.getDeclaredMethod = Clazz._innerFunctions.getMethod = function (name, clazzes) {
	var p = this.prototype;
	for (var attr in p) {
		if (name == attr && typeof p[attr] == "function" 
				&& !p[attr].__CLASS_NAME__) {
			/* there are polynormical methods. */
			return new java.lang.reflect.Method (this, attr,
					[], java.lang.Void, [], java.lang.reflect.Modifier.PUBLIC);
		}
	}
	p = this;
	for (var attr in p) {
		if (name == attr && typeof p[attr] == "function" 
				&& !p[attr].__CLASS_NAME__) {
			return new java.lang.reflect.Method (this, attr,
					[], java.lang.Void, [], java.lang.reflect.Modifier.PUBLIC
					| java.lang.reflect.Modifier.STATIC);
		}
	}
	return null;
};
/* public */
Clazz._innerFunctions.getModifiers = function () {
	return java.lang.reflect.Modifier.PUBLIC;
};

Clazz._innerFunctions.newInstance = function (a) {
	var clz = this;
  switch(a == null ? 0 : a.length) {
  case 0:
    return new clz();
  case 1:
  	return new clz(a[0]);
  case 2:
  	return new clz(a[0], a[1]);
  case 3:
  	return new clz(a[0], a[1], a[2]);
  case 4:
  	return new clz(a[0], a[1], a[2], a[3]);
  default:
    var x = "new " + clz.__CLASS_NAME__ + "(";
    for (var i = 0; i < a.length; i++)
     x += (i == 0 ? "" : ",") + "a[" + i + "]";
    x += ")";
    return eval(x);
  }
};

//Object.newInstance = Clazz._innerFunctions.newInstance;
;(function(){  // BH added wrapper here
	var inF = Clazz.innerFunctionNames;
	for (var i = 0; i < inF.length; i++) {
		Clazz._O[inF[i]] = Clazz._innerFunctions[inF[i]];
		Array[inF[i]] = Clazz._innerFunctions[inF[i]];
	}
	//Array["isArray"] = function () {
	//	return true;
	//};
})();

//////////////////////////// hotspot and unloading /////////////////////////////
/* For hotspot and unloading */

// not used in Jmol

/*
if (window["Clazz"] && !window["Clazz"].unloadClass) {

/ * public * /
Clazz.unloadClass = function (qClazzName) {
	var cc = Clazz.evalType (qClazzName);
	if (cc) {
		Clazz.unloadedClasses[qClazzName] = cc;
		var clazzName = qClazzName;
		var pkgFrags = clazzName.split (/\./);
		var pkg = null;
		for (var i = 0; i < pkgFrags.length - 1; i++)
			pkg = (pkg ? pkg[pkgFrags[i]] : Clazz.allPackage[pkgFrags[0]]);
		if (!pkg) {
			Clazz.allPackage[pkgFrags[0]] = null;
			window[pkgFrags[0]] = null;
			// also try to unload inner or anonymous classes
			for (var c in window) {
				if (c.indexOf (qClazzName + "$") == 0) {
					Clazz.unloadClass (c);
					window[c] = null;
				}
			}
		} else {
			pkg[pkgFrags[pkgFrags.length - 1]] = null;
			// also try to unload inner or anonymous classes
			for (var c in pkg) {
				if (c.indexOf (pkgFrags[pkgFrags.length - 1] + "$") == 0) {
					Clazz.unloadClass (pkg.__PKG_NAME__ + "." + c);
					pkg[c] = null;
				}
			}
		}

		if (Clazz.allClasses[qClazzName]) {
			Clazz.allClasses[qClazzName] = false;
			// also try to unload inner or anonymous classes
			for (var c in Clazz.allClasses) {
				if (c.indexOf (qClazzName + "$") == 0) {
					Clazz.allClasses[c] = false;
				}
			}
		}

		for (var m in cc) {
			cleanDelegateMethod (cc[m]);
		}
		for (var m in cc.prototype) {
			cleanDelegateMethod (cc.prototype[m]);
		}

		if (Clazz._Loader) {
			Clazz._Loader.unloadClassExt(qClazzName);
		}

		return true;
	}
	return false;
};

/ * private * /
var cleanDelegateMethod = function (m) {
	if (!m) 
		return;
	if (typeof m == "function" && m.lastMethod
			&& m.lastParams && m.lastClaxxRef) {
		m.lastMethod = null;
		m.lastParams = null;
		m.lastClaxxRef = null;
	}
};

} // if (window["Clazz"] && !window["Clazz"].unloadClass)
*/

/******************************************************************************
 * Copyright (c) 2007 java2script.org and others.
 * All rights reserved. This program and the accompanying materials
 * are made available under the terms of the Eclipse Public License v1.0
 * which accompanies this distribution, and is available at
 * http://www.eclipse.org/legal/epl-v10.html
 *
 * Contributors:
 *     Zhou Renjian - initial API and implementation
 *****************************************************************************/
/*******
 * @author zhou renjian
 * @create July 10, 2006
 *******/

//if (window["ClazzNode"] == null) {
/**
 * TODO:
 * Make optimization over class dependency tree.
 */

/*
 * ClassLoader Summary
 * 
 * ClassLoader creates SCRIPT elements and setup class path and onload 
 * callback to continue class loading.
 *
 * In the onload callbacks, _Loader will try to calculate the next-to-be-
 * load *.js and load it. In *.js, it will contains some codes like
 * Clazz.load (..., "$wt.widgets.Control", ...);
 * to provide information to build up the class dependency tree.
 *
 * Some known problems of different browsers:
 * 1. In IE, loading *.js through SCRIPT will first triggers onreadstatechange 
 * event, and then executes inner *.js source.
 * 2. In Firefox, loading *.js will first executes *.js source and then 
 * triggers onload event.
 * 3. In Opera, similar to IE, but trigger onload event. (TODO: More details 
 * should be studied. Currently, Opera supports no multiple-thread-loading)
 * 
 * For class dependency tree, actually, it is not a tree. It is a reference
 * net with nodes have n parents and n children. There is a root, which 
 * ClassLoader knows where to start searching and loading classes, for such
 * a net. Each node is a class. Each class may require a set of must-classes, 
 * which must be loaded before itself getting initialized, and also need a set
 * of optional classes, which also be loaded before being called.
 *
 * The class loading status will be in 6 stages.
 * 1. Unknown, the class is newly introduced by other class.
 * 2. Known, the class is already mentioned by other class.
 * 3. Loaded, *.js source is in memory, but may not be initialized yet. It 
 * requires all its must-classes be intiailized, which is in the next stage.
 * 4. Musts loaded, all must classes is already loaded and declared.
 * 5. Delcared, the class is already declared (_Loader#isClassDefined).
 * 6. Optionals loaded, all optional classes is loaded and declared.
 *
 * The ClassLoader tries to load all necessary classes in order, and intialize
 * them in order. For such job, it will traverse the dependency tree, and try 
 * to next class to-be-loaded. Sometime, the class dependencies may be in one
 * or more cycles, which must be broken down so classes is loaded in correct
 * order.
 *
 * Loading order and intializing order is very important for the ClassLoader.
 * The following technical options are considered:
 * 1. SCRIPT is loading asynchronously, which means controling order must use
 * callback methods to continue.
 * 2. Multiple loading threads are later introduced, which requires the 
 * ClassLoader should use variables to record the class status.
 * 3. Different browsers have different loading orders, which means extra tests
 * should be tested to make sure loading order won't be broken.
 * 4. Java2Script simulator itself have some loading orders that must be 
 * honored, which means it should be integrated seamlessly to Clazz system.
 * 5. Packed *.z.js is introduced to avoid lots of small *.js which requires 
 * lots of HTTP connections, which means that packed *.z.js should be treated
 * specially (There will be mappings for such packed classes).
 * 6. *.js or *.css loading may fail according to network status, which means
 * another loading try should be performed, so _Loader is more robust.
 * 7. SWT lazy loading is later introduced, which means that class loading
 * process may be paused and should be resumed later.
 *
 * Some known bugs:
 * <code>$_L(["$wt.graphics.Drawable","$wt.widgets.Widget"],
 *  "$wt.widgets.Control", ...</code>
 * has errors while must classes in different order such as
 * <code>$_L(["$wt.widgets.Widget", "$wt.graphics.Drawable"],
 *  "$wt.widgets.Control", ...</code>
 * has no error.
 * 
 * Other maybe bug scenarios:
 * 1. In <code>_Loader.maxLoadingThreads = 1;</code> single loading thread 
 * mode, there are no errors, but in default multiple thread loading mode, 
 * there are errors.
 * 2. No errors in one browser, but has errors on other browsers (Browser 
 * script loading order differences).
 * 3. First time loading has errors, but reloading it gets no errors (Maybe 
 * HTTP connections timeout, but should not accur in local file system, or it
 * is a loading bug by using JavaScript timeout thread).
 */

/*
 * The following comments with "#" are special configurations for a much
 * smaller *.js file size.
 *
 * @see net.sf.j2s.lib/src/net/sf/j2s/lib/build/SmartJSCompressor.java
 */
/**
 * Static class loader class
 */
Clazz._Loader = Clazz.ClazzLoader = function () {};

/**
 * Class dependency tree node
 */
/* private */
var Node = function () {
	this.parents = [];
	this.musts = [];
	this.optionals = [];
	this.declaration = null;
	this.name = null; // id
	this.path = null;
//	this.requires = null;
//	this.requiresMap = null;
	this.onLoaded = null;
	this.status = 0;
	this.random = 0.13412;
};


;(function(Clazz, _Loader) {

_Loader._checkLoad = Jmol._checkLoad;
 
_Loader.updateNodeForFunctionDecoration = function(qName) {
	var node = findNode(qName);
	if (node && node.status == Node.STATUS_KNOWN) {
		window.setTimeout((function(nnn) {
			return function() {
				updateNode(nnn);
			};
		})(node), 1);
	}
}

Node.prototype.toString = function() {
	return this.name || this.path || "ClazzNode";
}

Node.STATUS_UNKNOWN = 0;
Node.STATUS_KNOWN = 1;
Node.STATUS_CONTENT_LOADED = 2;
Node.STATUS_MUSTS_LOADED = 3;
Node.STATUS_DECLARED = 4;
Node.STATUS_LOAD_COMPLETE = 5;

						 
var loaders = [];

/* public */
_Loader.requireLoaderByBase = function (base) {
	for (var i = 0; i < loaders.length; i++) {
		if (loaders[i].base == base) {
			return loaders[i];
		}
	}
	var loader = new _Loader ();
	loader.base = base; 
	loaders.push(loader);
	return loader;
};

/**
 * Class dependency tree
 */
var clazzTreeRoot = new Node();

/**
 * Used to keep the status whether a given *.js path is loaded or not.
 */
/* private */
var loadedScripts = {};

/**
 * Multiple threads are used to speed up *.js loading.
 */
/* private */
var inLoadingThreads = 0;

/**
 * Maximum of loading threads
 */
/* private */
var maxLoadingThreads = 6;

var userAgent = navigator.userAgent.toLowerCase ();
var isOpera = (userAgent.indexOf ("opera") != -1);
var isIE = (userAgent.indexOf ("msie") != -1) && !isOpera;
var isGecko = (userAgent.indexOf ("gecko") != -1);

/*
 * Opera has different loading order which will result in performance degrade!
 * So just return to single thread loading in Opera!
 *
 * FIXME: This different loading order also causes bugs in single thread!
 */
if (isOpera) {
	maxLoadingThreads = 1;
	var index = userAgent.indexOf ("opera/");
	if (index != -1) {
		var verNumber = 9.0;
		try {
			verNumber = parseFloat(userAgent.subString (index + 6));
		} catch (e) {}
		if (verNumber >= 9.6) {
			maxLoadingThreads = 6;
		}
	} 
}

/**
 * Try to be compatiable with Clazz system.
 * In original design _Loader and Clazz are independent!
 *  -- zhourenjian @ December 23, 2006
 */
var isClassdefined;
var definedClasses;

if (self.Clazz && Clazz.isClassDefined) {
	isClassDefined = Clazz.isClassDefined;
} else {
	definedClasses = {};
	isClassDefined = function (clazzName) {
		return definedClasses[clazzName] == true;
	};
}

/**
 * Expand the shortened list of class names.
 * For example:
 * JU.Log, $.Display, $.Decorations
 * will be expanded to 
 * JU.Log, JU.Display, JU.Decorations
 * where "$." stands for the previous class name's package.
 *
 * This method will be used to unwrap the required/optional classes list and 
 * the ignored classes list.
 */
/* private */
var unwrapArray = function (arr) {
	if (!arr || arr.length == 0)
		return [];
	var last = null;
	for (var i = 0; i < arr.length; i++) {
		if (!arr[i])
			continue;
		if (arr[i].charAt (0) == '$') {
			if (arr[i].charAt (1) == '.') {
				if (!last)
					continue;
				var idx = last.lastIndexOf (".");
				if (idx != -1) {
					var prefix = last.substring (0, idx);
					arr[i] = prefix + arr[i].substring (1);
				}
			} else {
				arr[i] = "org.eclipse.s" + arr[i].substring (1);
			}
		}
		last = arr[i];
	}
	return arr;
};

/**
 * Used to keep to-be-loaded classes.
 */
/* private */
var classQueue = [];

/* private */
var classpathMap = {};

/* private */
var pkgRefCount = 0;

/* public */
_Loader.loadPackageClasspath = function (pkg, base, isIndex, fSuccess, mode, pt) {
	var map = classpathMap;
	mode || (mode = 0);
	fSuccess || (fSuccess = null);
	pt || (pt = 0);

	/*
	 * In some situation, maybe,
	 * _Loader.packageClasspath ("java", ..., true);
	 * is called after other _Loader#packageClasspath, e.g.
	 * <code>
	 * _Loader.packageClasspath ("org.eclipse.swt", "...", true);
	 * _Loader.packageClasspath ("java", "...", true);
	 * </code>
	 * which is not recommended. But _Loader should try to adjust orders
	 * which requires "java" to be declared before normal _Loader
	 * #packageClasspath call before that line! And later that line
	 * should never initialize "java/package.js" again!
	 */
	var isPkgDeclared = (isIndex && map["@" + pkg]);
	if (mode == 0 && isIndex && !map["@java"] && pkg.indexOf ("java") != 0 && needPackage("java")) {
		_Loader.loadPackage("java", fSuccess ? function(_package){_Loader.loadPackageClasspath(pkg, base, isIndex, fSuccess, 1)} : null);
		if (fSuccess)
			return;
	}
	if (pkg instanceof Array) {
		unwrapArray(pkg);
		if (fSuccess) {
			if (pt < pkg.length)
				_Loader.loadPackageClasspath(pkg[pt], base, isIndex, function(_loadPackageClassPath){_Loader.loadPackageClasspath(pkg, base, isIndex, fSuccess, 1, pt + 1)}, 1);
			else
				fSuccess();
		} else {
			for (var i = 0; i < pkg.length; i++)
				_Loader.loadPackageClasspath(pkg[i], base, isIndex, null);
		}
		return;
	}
	switch (pkg) {
	case "java.*":
		pkg = "java";
		// fall through
	case "java":
		if (base) {
			// support ajax for default
			var key = "@net.sf.j2s.ajax";
			if (!map[key])
				map[key] = base;
			key = "@net.sf.j2s";
			if (!map[key])
				map[key] = base;
		}		
		break;
	case "swt":
		pkg = "org.eclipse.swt";
		break;
	case "ajax":
		pkg = "net.sf.j2s.ajax";
		break;
	case "j2s":
		pkg = "net.sf.j2s";
		break;
	default:
		if (pkg.lastIndexOf(".*") == pkg.length - 2)
			pkg = pkg.substring(0, pkg.length - 2);
		break;
	}
	if (base) // critical for multiple applets
		map["@" + pkg] = base;
	if (isIndex && !isPkgDeclared && !window[pkg + ".registered"]) {
		pkgRefCount++;
		if (pkg == "java")
			pkg = "core" // JSmol -- moves java/package.js to core/package.js
		_Loader.loadClass(pkg + ".package", function () {
					if (--pkgRefCount == 0)
						runtimeLoaded();
					//fSuccess && fSuccess();
				}, true, true, 1);
		return;
	}
	fSuccess && fSuccess();
};

/**
 * BH: allows user/developer to load classes even though wrapping and Google
 * Closure Compiler has not been run on the class.
 *   
 */
Clazz.loadClass = function (name, onLoaded, async) {
  if (!self.Class) {
    Class = Clazz;
    Class.forName = Clazz._4Name;
    JavaObject = Clazz._O;
    // maybe more here
  }
  return (name && _Loader.loadClass(name, onLoaded, true, async, 1));
}

/**
 * Load the given class ant its related classes.
 */
/* public */
_Loader.loadClass = function (name, onLoaded, forced, async, mode) {

  //System.out.println("loadClass " + name)
  
  mode || (mode = 0); // BH: not implemented
  (async == null) && (async = false);
  
 	if (typeof onLoaded == "boolean")
		return Clazz.evalType(name);

	// Make sure that packageClasspath ("java", base, true); 
	// is called before any _Loader#loadClass is called.

	if (needPackage("java")) {
		_Loader.loadPackage("java");
  }
    
// BH unnecessary	
// if (needPackage("core")) {
//		_Loader.loadPackage("core");
//    }	

//	var swtPkg = "org.eclipse.swt";
//	if (name.indexOf (swtPkg) == 0 || name.indexOf ("$wt") == 0) {
//		_Loader.assurePackageClasspath (swtPkg);
//	}
//	if (name.indexOf ("junit") == 0) {
//		_Loader.assurePackageClasspath ("junit");
//	}

	// Any _Loader#loadClass calls will be queued until java.* core classes are loaded.

	_Loader.keepOnLoading = true;
	
	if (!forced && (pkgRefCount && name.lastIndexOf(".package") != name.length - 8
			|| name.indexOf("java.") != 0 && !isClassDefined(runtimeKeyClass)
		 )) {	
		queueBe4KeyClazz.push([name, onLoaded]);
    
    
  System.out.println("loadclass-queuing" + name+ runtimeKeyClass + " "+ isClassDefined(runtimeKeyClass))

		return;    
	}
	var b;
	if ((b = isClassDefined(name)) || isClassExcluded(name)) {
		if (b && onLoaded) {
			var nn = findNode(name);
			if (!nn || nn.status >= Node.STATUS_LOAD_COMPLETE) {
				if (async) {
					window.setTimeout(onLoaded, 25);
				} else {
					onLoaded();
				}
			}
		}
		return;
	}
	var path = _Loader.getClasspathFor(name);
  var existed = loadedScripts[path];
  	var qq = classQueue;
	if (!existed)
		for (var i = qq.length; --i >= 0;)
			if (qq[i].path == path || qq[i].name == name) {
				existed = true;
				break;
			}
	if (existed) {
		if (onLoaded) {
			var n = findNode(name);
			if (n) {
				if (!n.onLoaded) {
					n.onLoaded = onLoaded;
				} else if (onLoaded != n.onLoaded) {
					n.onLoaded = (function (nF, oF) { return function () { nF(); oF() };	}) (n.onLoaded, onLoaded);
				}
			}
		}
		return;
	}

	var n = (Clazz.unloadedClasses[name] && findNode(name) || new Node());
	n.name = name;
	n.path = path;
	n.isPackage = (path.lastIndexOf("package.js") == path.length - 10);
	mappingPathNameNode(path, name, n);
	n.onLoaded = onLoaded;
	n.status = Node.STATUS_KNOWN;
	var needBeingQueued = false;
	for (var i = qq.length; --i >= 0;) {
		if (qq[i].status != Node.STATUS_LOAD_COMPLETE) {
			needBeingQueued = true;
			break;
		}
	}
	
	if (n.isPackage) {//forced
		// push class to queue
		var pt = qq.length;
		for (; --pt >= 0;) {
			if (qq[pt].isPackage) 
				break;
			qq[pt + 1] = qq[pt];
		}
		qq[++pt] = n;
	} else if (needBeingQueued) {
		qq.push(n);
	}
	if (!needBeingQueued) { // can be loaded directly
		var bSave = false;
		if (onLoaded) {	
			bSave = isLoadingEntryClass;
			isLoadingEntryClass = true;
		}
    if (forced)onLoaded = null;
		addChildClassNode(clazzTreeRoot, n, true);
		loadScript(n, n.path, n.requiredBy, false, onLoaded ? function(_loadClass){ isLoadingEntryClass = bSave; onLoaded()}: null);
	}
};

/*
 * Check whether given package's classpath is setup or not.
 * Only "java" and "org.eclipse.swt" are accepted in argument.
 */
/* private */
var needPackage = function(pkg) {
  // note that false != null and true != null
	return (window[pkg + ".registered"] != null && !classpathMap["@" + pkg]);
}

/* private */
_Loader.loadPackage = function(pkg, fSuccess) {
	fSuccess || (fSuccess = null);
	window[pkg + ".registered"] = false;
	_Loader.loadPackageClasspath(pkg, 
		(_Loader.J2SLibBase || (_Loader.J2SLibBase = (_Loader.getJ2SLibBase() || "j2s/"))), 
		true, fSuccess);
};

/**
 * Register classes to a given *.z.js path, so only a single *.z.js is loaded
 * for all those classes.
 */
/* public */
_Loader.jarClasspath = function (jar, clazzes) {
	if (!(clazzes instanceof Array))
		clazzes = [clazzes];
	unwrapArray(clazzes);
  if (Jmol._debugCore)
    jar = jar.replace(/\.z\./, ".")
	for (var i = clazzes.length; --i >= 0;)
		classpathMap["#" + clazzes[i]] = jar;
	classpathMap["$" + jar] = clazzes;
};

/**
 * Usually be used in .../package.js. All given packages will be registered
 * to the same classpath of given prefix package.
 */
/* public */
_Loader.registerPackages = function (prefix, pkgs) {
	//_Loader.checkInteractive ();
	var base = _Loader.getClasspathFor (prefix + ".*", true);
	for (var i = 0; i < pkgs.length; i++) {
		if (window["Clazz"]) {
			Clazz.declarePackage (prefix + "." + pkgs[i]);
		}
		_Loader.loadPackageClasspath (prefix + "." + pkgs[i], base);
	}
};

/**
 * Using multiple sites to load *.js in multiple threads. Using multiple
 * sites may avoid 2 HTTP 1.1 connections recommendation limit.
 * Here is a default implementation for http://archive.java2script.org.
 * In site archive.java2script.org, there are 6 sites:
 * 1. http://archive.java2script.org or http://a.java2script.org
 * 2. http://erchive.java2script.org or http://e.java2script.org
 * 3. http://irchive.java2script.org or http://i.java2script.org
 * 4. http://orchive.java2script.org or http://o.java2script.org
 * 5. http://urchive.java2script.org or http://u.java2script.org
 * 6. http://yrchive.java2script.org or http://y.java2script.org
 */
/* protected */
	/*
_Loader.multipleSites = function (path) {
	var deltas = window["j2s.update.delta"];
	if (deltas && deltas instanceof Array && deltas.length >= 3) {
		var lastOldVersion = null;
		var lastNewVersion = null;
		for (var i = 0; i < deltas.length / 3; i++) {
			var oldVersion = deltas[i + i + i];
			if (oldVersion != "$") {
				lastOldVersion = oldVersion;
			}
			var newVersion = deltas[i + i + i + 1];
			if (newVersion != "$") {
				lastNewVersion = newVersion;
			}
			var relativePath = deltas[i + i + i + 2];
			var key = lastOldVersion + "/" + relativePath;
			var idx = path.indexOf (key);
			if (idx != -1 && idx == path.length - key.length) {
				path = path.substring (0, idx) + lastNewVersion + "/" + relativePath;
				break;
			}
		}
	}
	var length = path.length;
	if (maxLoadingThreads > 1 
			&& ((length > 15 && path.substring (0, 15) == "http://archive.")
			|| (length > 9 && path.substring (0, 9) == "http://a."))) {
		var index = path.lastIndexOf("/");
		if (index < length - 3) {
			var arr = ['a', 'e', 'i', 'o', 'u', 'y'];
			var c1 = path.charCodeAt (index + 1);
			var c2 = path.charCodeAt (index + 2);
			var idx = (length - index) * 3 + c1 * 5 + c2 * 7; // Hash
			return path.substring (0, 7) + arr[idx % 6] + path.substring (8);
		}
	}
	return path;
};
	*/

/**
 * Return the *.js path of the given class. Maybe the class is contained
 * in a *.z.js jar file.
 * @param clazz Given class that the path is to be calculated for. May
 * be java.package, or java.lang.String
 * @param forRoot Optional argument, if true, the return path will be root
 * of the given classs' package root path.
 * @param ext Optional argument, if given, it will replace the default ".js"
 * extension.
 */
/* public */
_Loader.getClasspathFor = function (clazz, forRoot, ext) {
	var path = classpathMap["#" + clazz];
	if (!path || forRoot || ext) {
		var base;
		var idx;
		if (path) {
			clazz = clazz.replace(/\./g, "/");	
			if ((idx = path.lastIndexOf(clazz)) >= 0 
				|| (idx = clazz.lastIndexOf("/")) >= 0 
					&& (idx = path.lastIndexOf(clazz.substring(0, idx))) >= 0)
				base = path.substring(0, idx);
		} else {
			idx = clazz.length + 2;
			while ((idx = clazz.lastIndexOf(".", idx - 2)) >= 0)
				if ((base = classpathMap["@" + clazz.substring(0, idx)]))
					break;
			if (!forRoot)
				clazz = clazz.replace (/\./g, "/");	
		}
		if (base == null) {
			var bins = "binaryFolders";
			base = (window["Clazz"] && Clazz[bins] && Clazz[bins].length ? Clazz[bins][0] 
				: _Loader[bins]	&& _Loader[bins].length ? _Loader[bins][0]
				: "j2s");
		}
		path = (base.lastIndexOf("/") == base.length - 1 ? base : base + "/") + (forRoot ? ""
			: clazz.lastIndexOf("/*") == clazz.length - 2 ? clazz.substring(0, idx + 1)
			: clazz + (!ext ? ".js" : ext.charAt(0) != '.' ? "." + ext : ext));
	}		
	return path;//_Loader.multipleSites(path);
};

/**
 * To ignore some classes.
 */
/* public */
_Loader.ignore = function () {
	var clazzes = (arguments.length == 1 && arguments[0] instanceof Array ?
			clazzes = arguments[0] : null);
	var n = (clazzes ? clazzes.length : arguments.length);
	if (!clazzes) {
		clazzes = new Array(n);
		for (var i = 0; i < n; i++)
			clazzes[i] = arguments[i];
	}
	unwrapArray(clazzes);
	for (var i = 0; i < n; i++)
		excludeClassMap["@" + clazzes[i]] = 1;
};

/**
 * The following *.script* can be overriden to indicate the 
 * status of classes loading.
 *
 * TODO: There should be a Java interface with name like INativeLoaderStatus
 */
/* public */
_Loader.onScriptLoading = function (file){};

/* public */
_Loader.onScriptLoaded = function (file, isError){};

/* public */
_Loader.onScriptInitialized = function (file){};

/* public */
_Loader.onScriptCompleted = function (file){};

/* public */
_Loader.onClassUnloaded = function (clazz){};

/**
 * After all the classes are loaded, this method will be called.
 * Should be overriden to run *.main([]).
 */
/* public */
_Loader.onGlobalLoaded = function () {};

/* public */
_Loader.keepOnLoading = true; // never set false in this code


/* private */
var mapPath2ClassNode = {};

/* private */
var isClassExcluded = function (clazz) {
	return excludeClassMap["@" + clazz];
};

/* Used to keep ignored classes */
/* private */
var excludeClassMap = {};

/* private */
var evaluate = function(file, file0, js, isLoaded) {
  if (!isLoaded)
 		try {
			eval(js + ";//# sourceURL="+file);
		} catch (e) {      
      if (Clazz._isQuiet) 
        return;
			var s = "[Java2Script] The required class file \n\n" + file + (js.indexOf("[Exception") == 0 && js.indexOf("data: no") ? 
         "\nwas not found.\n"
        : "\ncould not be loaded. Script error: " + e.message + " \n\ndata:\n\n" + js) + "\n\n" + Clazz.getStackTrace();
  		alert(s)
			Clazz.alert(s);
			throw e;
		}
	_Loader.onScriptLoaded(file, false);
	tryToLoadNext(file0);
}

/* private */
var failedHandles = {};

/* private */
var generateRemovingFunction = function (node) {
	return function () {
		if (node.readyState != "interactive") {
			try {
				if (node.parentNode)
					node.parentNode.removeChild (node);
			} catch (e) { }
			node = null;
		}
	};
};

/* private */
var removeScriptNode = function (n) {
	if (window["j2s.script.debugging"]) {
		return;
	}
	// lazily remove script nodes.
	window.setTimeout (generateRemovingFunction (n), 1);
};

/* public */
Clazz._4Name = function(clazzName, applet, state) {
	if (Clazz.isClassDefined(clazzName))
		return Clazz.evalType(clazzName);
	var f = (Jmol._isAsync && applet ? applet._restoreState(clazzName, state) : null);
	if (f == 1)
		return null; // must be already being created
	if (_Loader.setLoadingMode(f ? _Loader.MODE_SCRIPT : "xhr.sync")) {
		_Loader.loadClass(clazzName, f, false, true, 1);
		return null; // this will surely throw an error, but that is OK
	}
	//alert ("Using Java reflection: " + clazzName + " for " + applet._id + " \n"+ Clazz.getStackTrace());
	_Loader.loadClass(clazzName);
	return Clazz.evalType(clazzName);
};

/**
 * BH: possibly useful for debugging
 */ 
Clazz.currentPath= "";

/**
 * Load *.js by adding script elements into head. Hook the onload event to
 * load the next class in dependency tree.
 */
/* private */
var loadScript = function (node, file, why, ignoreOnload, fSuccess, _loadScript) {

	Clazz.currentPath = file;
  
	if (ignoreOnload)alert("WHY>>")
//BH removed	// maybe some scripts are to be loaded without needs to know onload event.
//	if (!ignoreOnload && loadedScripts[file]) {
//		_Loader.tryToLoadNext(file);
//		return;
//	}

  var isLoaded = loadedScripts[file];
	loadedScripts[file] = true;
	// also remove from queue
	removeArrayItem(classQueue, file);

  // forces not-found message
  // at least for now, force synchronous transfer of all class files
  isUsingXMLHttpRequest = true;
  isAsynchronousLoading = false;
  
  
  if (_Loader._checkLoad) {
    System.out.println("\t" + file + (why ? "\n -- required by " + why : "") + "  ajax=" + isUsingXMLHttpRequest + " async=" + isAsynchronousLoading)
  }

  var file0 = file;
  if (Clazz._debugging) {
    file = file.replace(/\.z\.js/,".js");
  }

  if (!isLoaded)
    System.out.println("loadScript " + file)

	_Loader.onScriptLoading(file);
	if (isUsingXMLHttpRequest && !isAsynchronousLoading) {
		// alert("\t" + file + (why ? "\n -- required by " + why : "") + "  ajax=" + isUsingXMLHttpRequest + " async=" + isAsynchronousLoading + " " + Clazz.getStackTrace())
		// synchronous loading
		// works in MSIE locally unless a binary file :)
		// from Jmol.api.Interface only
		var data = Jmol._getFileData(file);
    try{
		  evaluate(file, file0, data, isLoaded);
    }catch(e) {
      alert(e + " loading file " + file + " " + node.name + " " + Clazz.getStackTrace());
    }
    if (fSuccess) {
//      System.out.println("firing in loadScript " + file + " " + (fSuccess && fSuccess.toString()))
      fSuccess(); 
    }
		return;
	}
  // only when running asynchronously    
	var info = {
		dataType:"script",
		async:true, 
		type:"GET", 
		url:file,
		success:W3CScriptOnCallback(file, false, fSuccess),
		error:W3CScriptOnCallback(file, true, fSuccess)
	};
	inLoadingThreads++;
  if (isLoaded)
    setTimeout(info.success, 0);
  else
	 Jmol.$ajax(info);
};

/* private */
var W3CScriptOnCallback = function (path, forError, fSuccess) {
  var s = Clazz.getStackTrace();
	return function () {
	if (forError && __debuggingBH)Clazz.alert ("############ forError=" + forError + " path=" + path + " ####" + (forError ? "NOT" : "") + "LOADED###");
		if (isGecko && this.timeoutHandle)
			window.clearTimeout(this.timeoutHandle), this.timeoutHandle = null;
		if (inLoadingThreads > 0)
			inLoadingThreads--;
		this.onload = null;
		this.onerror = null;
		if (forError) 
			alert ("There was a problem loading " + path);
		_Loader.onScriptLoaded(path, true);
		var node = this;			
		var f;
    if (fSuccess)
      f = function(_W3scriptFS){removeScriptNode(node);tryToLoadNext(path, fSuccess); };
    else
      f = function(_W3script){removeScriptNode(node);tryToLoadNext(path)};
		if (loadingTimeLag >= 0)
			window.setTimeout(function() { tryToLoadNext(path, f); }, loadingTimeLag);
		else
			tryToLoadNext(path, f);
	};
};

/* private */
var isLoadingEntryClass = true;

/* private */
var besidesJavaPackage = false;

/**
 * After class is loaded, this method will be executed to check whether there
 * are classes in the dependency tree that need to be loaded.
 */
/* private */
var tryToLoadNext = function (file, fSuccess) {
	var node = mapPath2ClassNode["@" + file];
	if (!node) // maybe class tree root
		return;
	var n;
  // check for content loaded
	var clazzes = classpathMap["$" + file];
	if (clazzes) {
		for (var i = 0; i < clazzes.length; i++) {
			var name = clazzes[i];
			if (name != node.name && (n = findNode(name))) {
				if (n.status < Node.STATUS_CONTENT_LOADED) {
					n.status = Node.STATUS_CONTENT_LOADED;
					updateNode(n);
				}
			} else {
				n = new Node();
				n.name = name;
				var pp = classpathMap["#" + name];
				if (!pp) {
					alert (name + " J2S error in tryToLoadNext");
					error("Java2Script implementation error! Please report this bug!");
				}
				n.path = pp;
				mappingPathNameNode (n.path, name, n);
				n.status = Node.STATUS_CONTENT_LOADED;
				addChildClassNode(clazzTreeRoot, n, false);
				updateNode(n);
			}
		}
	}
	if (node instanceof Array) {
		for (var i = 0; i < node.length; i++) {
			if (node[i].status < Node.STATUS_CONTENT_LOADED) {
				node[i].status = Node.STATUS_CONTENT_LOADED;
				updateNode(node[i]);
			}
		}
	} else if (node.status < Node.STATUS_CONTENT_LOADED) {
		var stillLoading = false;
		var ss = document.getElementsByTagName ("SCRIPT");
		for (var i = 0; i < ss.length; i++) {
			if (isIE) {
				if (ss[i].onreadystatechange && ss[i].onreadystatechange.path == node.path
						&& ss[i].readyState == "interactive") {
					stillLoading = true;
					break;
				}
			} else if (ss[i].onload && ss[i].onload.path == node.path) {
				stillLoading = true;
				break;
			}
		}
		if (!stillLoading) {
			node.status = Node.STATUS_CONTENT_LOADED;
			updateNode(node);
		}
	}
	/*
	 * Maybe in #optinalLoaded inside above _Loader#updateNode calls, 
	 * _Loader.keepOnLoading is set false (Already loaded the wanted
	 * classes), so here check to stop.
	 */
	 
	if (!_Loader.keepOnLoading) // set externally
		return;

 // check for a "must" class that has content and load it
	var cq;
	var working = true;
	if ((n = findNextMustClass(Node.STATUS_KNOWN))) {
		loadClassNode(n);
		while (inLoadingThreads < maxLoadingThreads) {
			if (!(n = findNextMustClass(Node.STATUS_KNOWN)))
				break;
			loadClassNode(n); // will increase inLoadingThreads!
		}
	} else if ((cq = classQueue).length != 0) { 
		/* queue must be loaded in order! */
		n = cq.shift();
		if (!loadedScripts[n.path] 
				|| cq.length != 0 
				|| !isLoadingEntryClass
				|| n.musts.length
				|| n.optionals.length) {
			addChildClassNode(clazzTreeRoot, n, true);
			loadScript(n, n.path, n.requiredBy, false);
		} else if (isLoadingEntryClass) {
			/*
			 * The first time reaching here is the time when ClassLoader
			 * is trying to load entry class. Class with #main method and
			 * is to be executed is called Entry Class.
			 *
			 * Here when loading entry class, ClassLoader should not call
			 * the next following loading script. This is because, those
			 * scripts will try to mark the class as loaded directly and
			 * then continue to call #onLoaded callback method,
			 * which results in an script error!
			 */
			isLoadingEntryClass = false;
		}
	} else if ((n = findNextRequiredClass(Node.STATUS_KNOWN))) {
		loadClassNode(n);
		while (inLoadingThreads < maxLoadingThreads) {
			if (!(n = findNextRequiredClass(Node.STATUS_KNOWN)))
				break;
			loadClassNode(n); // will increase inLoadingThreads!
		}
	} else {
		working = false;
	}
	if (working || inLoadingThreads > 0)
		return;
  // 
  // now check all classes that MUST be loaded prior to initialization 
  // of some other class (static calls, extends, implements)
  // and all classes REQUIRED somewhere in that class, possibly by the constructor
  // (that is, "new xxxx()" called somewhere in code) and update them
  // that have content but are not declared already 
	var f = [findNextMustClass,findNextRequiredClass];
	var lastNode = null;
	for (var i = 0; i < 2; i++)
		while ((n = f[i](Node.STATUS_CONTENT_LOADED))) {
			if (i == 1 && lastNode === n) // Already existed cycle ?
				n.status = Node.STATUS_LOAD_COMPLETE;
			updateNode(n);
			lastNode = n;
		}
    
  // check for load cycles
  
	while (true) {
		tracks = [];
		if (!checkCycle(clazzTreeRoot, file))
			break;
	}
  
  // and update all MUST and REQUIRED classes that are declared already 
  
	for (var i = 0; i < 2; i++) {
		lastNode = null;
		while ((n = f[i](Node.STATUS_DECLARED))) {
			if (lastNode === n) 
				break;
			updateNode(lastNode = n);
		}
	}
	var done = [];
	for (var i = 0; i < 2; i++) 
		while ((n = f[i](Node.STATUS_DECLARED)))
			done.push(n), n.status = Node.STATUS_LOAD_COMPLETE;
	if (done.length) {
		for (var i = 0; i < done.length; i++)
			destroyClassNode(done[i]);
		for (var i = 0; i < done.length; i++)
			if ((f = done[i].onLoaded))
				done[i].onLoaded = null, f();
	}
  
  
  
  
  
  
  
	//System.out.println(node.name + " loaded completely" + _Loader.onGlobalLoaded + "\n\n")
  if (fSuccess) {
    //System.out.println("tryToLoadNext firing " + _Loader._classCountOK + "/" + _Loader._classCountPending + " "   + fSuccess.toString() + " " + Clazz.getStackTrace())
	  fSuccess();
  } else if (_Loader._classCountPending) {
    for (var name in _Loader._classPending) {
      var n = findNode(name);
      System.out.println("class left pending " + name + " " + n);
      if (n) {
        updateNode(n);
        break;
      }
    }
  } else {
    
 // System.out.println("I think I'm done " 
  // + _Loader._classCountOK + "/" + _Loader._classCountPending + " " 
   //+ _Loader.onGlobalLoaded.toString() + " " + Clazz.getStackTrace()
 //  )
    if (_Loader._checkLoad) {
      System.out.println("I think I'm done: SAEM call count: " + SAEMid);
      Clazz.showDuplicates(true);
    }
  }
	_Loader.onGlobalLoaded();
};


var tracks = [];

/*
 * There are classes reference cycles. Try to detect and break those cycles.
 */
/* private */
var checkCycle = function (node, file) {
	var ts = tracks;
	var len = ts.length;
  // add this node to tracks
	ts.push(node);
	var i = len;
	for (; --i >= 0;)
		if (ts[i] === node && ts[i].status >= Node.STATUS_DECLARED) 
			break;
	if (i >= 0) {
    // this node is already in tracks, and it has been declared already
    // for each node in tracks, set its status to "LOAD_COMPLETE"
    // update all parents, remove all parents, and fire its onLoaded function
    // then clear tracks and return true (keep checking)  
    if (_Loader._checkLoad) {
      var msg = "cycle found loading " + file + " for " + node;
      System.out.println(msg)
    } 
		for (; i < len; i++) {
      var n = ts[i];
			n.status = Node.STATUS_LOAD_COMPLETE;
			destroyClassNode(n); // Same as above
			for (var k = 0; k < n.parents.length; k++)
				updateNode(n.parents[k]);
			n.parents = [];
      var f = n.onLoaded;
      if (_Loader._checkLoad) {
        var msg = "cycle setting status to LOAD_COMPLETE for " + n.name + (f ? " firing " + f.toString() : "");
        System.out.println(msg)
      } 
			if (f)
				n.onLoaded = null, f();
		}
		ts.length = 0;
		return true;
	}
	var a = [node.musts, node.optionals];
	for (var j = 0; j < 2; j++)
		for (var r = a[j], i = r.length; --i >= 0;)
			if (r[i].status == Node.STATUS_DECLARED && checkCycle(r[i], file)) 
				return true;
  // reset _tracks to its original length      
	ts.length = len;
	return false; // done 
};


_Loader._classCountPending = 0;
_Loader._classCountOK = 0;
_Loader._classPending = {};

_Loader.showPending = function() {
  var a = [];
  for (var name in _Loader._classPending) {
    var n = findNode(name);
    if (!n) {
      alert("No node for " + name);
      continue;
    }
    a.push(n);
    System.out.println(showNode("", "", n, "", 0));     
  }  
  return a;
}

var showNode = function(s, names, node, inset, level) {
  names += "--" + node.name;
  s += names + "\n";
  if (level > 5) {
    s += inset + " ...\n";
    return s;
  }
  inset += "\t";
  s += inset + "status: " + node.status + "\n";
  if (node.parents && node.parents.length && node.parents[0] && node.parents[0].name) {
    s += inset + "parents: " + node.parents.length + "\n";
    for (var i = 0; i < node.parents.length; i++) {
      s = showNode(s, names, node.parents[i], inset + "\t", level+1);
    }
    s += "\n";
  }
//  if (node.requiredBy) {
//    s += inset + "requiredBy:\n";
//    s = showNode(s, names, node.requiredBy, inset + "\t", level+1);
//    s += "\n";
//  }
  return s;    
}     

/**
 * Update the dependency tree nodes recursively.
 */
/* private */
updateNode = function(node, _updateNode) {
	if (!node.name || node.status >= Node.STATUS_LOAD_COMPLETE) {
		destroyClassNode(node);
		return;
	}
	var ready = true;
  // check for declared and also having MUSTS
	if (node.musts.length && node.declaration) {
		for (var mustLength = node.musts.length, i = mustLength; --i >= 0;) {
			var n = node.musts[i];
			n.requiredBy = node;
			if (n.status < Node.STATUS_DECLARED && isClassDefined (n.name)) {
				var nns = []; // a stack for onLoaded events
				n.status = Node.STATUS_LOAD_COMPLETE;
				destroyClassNode(n); // Same as above
				if (n.declaration	&& n.declaration.clazzList) {
					// For those classes within one *.js file, update them synchronously.
					for (var j = 0, list = n.declaration.clazzList, l = list.length; j < l; j++) {
						var nn = findNode (list[j]);
						if (nn && nn.status != Node.STATUS_LOAD_COMPLETE
								&& nn !== n) {
							nn.status = n.status;
							nn.declaration = null;
							destroyClassNode(nn);
							nn.onLoaded && nns.push(nn);
						}
					}
					n.declaration = null;
				}
        // fire all onLoaded events
				if (n.onLoaded)
					nns.push(n);
				for (var j = 0; j < nns.length; j++) {
					var onLoaded = nns[j].onLoaded;
					if (onLoaded) {
						nns[j].onLoaded = null;
						onLoaded();
					}
				}
			} else {
				(n.status == Node.STATUS_CONTENT_LOADED) && updateNode(n); // musts may be changed
				if (n.status < Node.STATUS_DECLARED)
					ready = false;
			}
			if (node.musts.length != mustLength) {
				// length changed -- restart!
				i = mustLength = node.musts.length;
				ready = true;
			}
		}
	}
	if (!ready)
		return;
	if (node.status < Node.STATUS_DECLARED) {
		var decl = node.declaration;
		if (decl)
			decl(), decl.executed = true;
    if(_Loader._checkLoad) {
            if (_Loader._classPending[node.name]) {
              delete _Loader._classPending[node.name];
              _Loader._classCountOK;
              _Loader._classCountPending--;
//              System.out.println("OK " + (_Loader._classCountOK) + " FOR " + node.name)
            }
    }
		node.status = Node.STATUS_DECLARED;
		if (definedClasses)
			definedClasses[node.name] = true;
		_Loader.onScriptInitialized(node.path);
		if (node.declaration && node.declaration.clazzList) {
			// For those classes within one *.js file, update them synchronously.
			for (var j = 0, list = node.declaration.clazzList, l = list.length; j < l; j++) {
				var nn = findNode(list[j]);
				if (nn && nn.status != Node.STATUS_DECLARED
						&& nn !== node) {
					nn.status = Node.STATUS_DECLARED;
					if (definedClasses)
						definedClasses[nn.name] = true;
					_Loader.onScriptInitialized(nn.path);
				}
			}
		}
	}
	var level = Node.STATUS_DECLARED;
	if (node.optionals.length == 0 && node.musts.length == 0
			|| node.status > Node.STATUS_KNOWN && !node.declaration
			|| checkStatusIs(node.musts, Node.STATUS_LOAD_COMPLETE)
					&& checkStatusIs(node.optionals, Node.STATUS_LOAD_COMPLETE)) { 
		level = Node.STATUS_LOAD_COMPLETE;
		if (!doneLoading(node, level))
			return false;
			// For those classes within one *.js file, update them synchronously.
		if (node.declaration && node.declaration.clazzList) {
			for (var j = 0, list = node.declaration.clazzList, l = list.length; j < l; j++) {
				var nn = findNode(list[j]);
				if (nn && nn.status != level && nn !== node) {
					nn.declaration = null;
					if (!doneLoading(nn, level))
						return false;
				}
			}
		}
	}
  // _Loader.updateParents = function (node, level, _updateParents)
	if (node.parents && node.parents.length) {
  	for (var i = 0; i < node.parents.length; i++) {
  		var p = node.parents[i];
  		if (p.status < level) 
  			updateNode(p, p.name);
  	}
  	if (level == Node.STATUS_LOAD_COMPLETE)
  		node.parents = [];
  }
};

/* private */
var checkStatusIs = function(arr, status){
	for (var i = arr.length; --i >= 0;)
		if (arr[i].status < status)
			return false;
	return true;
}
/* private */
var doneLoading = function(node, level, _doneLoading) {
	node.status = level;
	_Loader.onScriptCompleted(node.path);
  
	var onLoaded = node.onLoaded;
	if (onLoaded) {
		node.onLoaded = null;
		onLoaded();
		if (!_Loader.keepOnLoading)
			return false;
	}
  
	destroyClassNode(node);
	return true;
}

/*
 * Be used to record already used random numbers. And next new random
 * number should not be in the property set.
 */
/* private */
var usedRandoms = {
  "r0.13412" : 1
};

/* private */
var getRnd = function() {
	while (true) { // get a unique random number
		var rnd = Math.random();
		var s = "r" + rnd;
		if (!usedRandoms[s])
			return (usedRandoms[s] = 1, clazzTreeRoot.random = rnd);
	}
}

/* protected */
var findNode = function(clazzName) {
	getRnd();
	return findNodeUnderNode(clazzName, clazzTreeRoot);
};

/* private */
var findNextRequiredClass = function(status) {
	getRnd();
	return findNextRequiredNode(clazzTreeRoot, status);
};

/* private */
var findNextMustClass = function(status) {
	return findNextMustNode(clazzTreeRoot, status);
};

/* private */
var findNodeUnderNode = function(clazzName, node) {
	var n;
	// node, then musts then optionals
	return (node.name == clazzName ? node 
		: (n = findNodeWithin(clazzName, node.musts))
		|| (n = findNodeWithin(clazzName, node.optionals)) 
		? n : null);
};

/* private */
var findNodeWithin = function(name, arr) {
	var rnd = clazzTreeRoot.random;
	for (var i = arr.length; --i >= 0;) {
		var n = arr[i];
		if (n.name == name)
			return n;
		if (n.random != rnd) {
			n.random = rnd;
			if ((n = findNodeUnderNode(name, n)))
				return n;
		}
	}
	return null;
}

/* private */
var checkStatus = function(n, status) {
	return (n.status == status 
			&& (status != Node.STATUS_KNOWN || !loadedScripts[n.path])
			&& (status == Node.STATUS_DECLARED	|| !isClassDefined (n.name)));
}

/* private */
var findNextMustNode = function(node, status) {
	for (var i = node.musts.length; --i >= 0;) {
		var n = node.musts[i];
		if (checkStatus(n, status) || (n = findNextMustNode(n, status)))
			return n;	
	}
	return (checkStatus(node, status) ? node : null); 
};

/* private */
var findNextRequiredNode = function (node, status) {
	// search musts first
	// search optionals second
	// search itself last
	var n;
	return ((n = searchClassArray(node.musts, status))
		|| (n = searchClassArray(node.optionals, status))
		|| checkStatus(n = node, status) ? n : null);
};

/* private */
var searchClassArray = function (arr, status) {
	if (arr) {
		var rnd = clazzTreeRoot.random;
		for (var i = 0; i < arr.length; i++) {
			var n = arr[i];
			if (checkStatus(n, status))
				return n;
			if (n.random != rnd) {
				n.random = rnd; // mark as visited!
				if ((n = findNextRequiredNode(n, status)))
					return n;
			}
		}
	}
	return null;
};

/**
 * This map variable is used to mark that *.js is correctly loaded.
 * In IE, _Loader has defects to detect whether a *.js is correctly
 * loaded or not, so inner loading mark is used for detecting.
 */
/* private */
var innerLoadedScripts = {};

/**
 * This method will be called in almost every *.js generated by Java2Script
 * compiler.
 */
/* public */
var load = function (musts, name, optionals, declaration) {
  // called as name.load in Jmol
	if (name instanceof Array) {
		unwrapArray(name);
		for (var i = 0; i < name.length; i++)
			load(musts, name[i], optionals, declaration, name);
		return;
	}	

  if (_Loader._checkLoad) {
    if (_Loader._classPending[name]) {
      //alert("duplicate load for " + name)
    } else {
      _Loader._classPending[name] = 1;
      if (_Loader._classCountPending++ == 0)
        _Loader._classCountOK = 0;
      System.out.println("Loading class " + name);
    }
  }

//	if (clazz.charAt (0) == '$')
//		clazz = "org.eclipse.s" + clazz.substring (1);
	var node = mapPath2ClassNode["#" + name];
	if (!node) { // load called inside *.z.js?
		var n = findNode(name);
		node = (n ? n : new Node());
		node.name = name;
		node.path = classpathMap["#" + name] || "unknown";
		mappingPathNameNode(node.path, name, node);
		node.status = Node.STATUS_KNOWN;
		addChildClassNode(clazzTreeRoot, node, false);
	}
	processRequired(node, musts, true);
	if (arguments.length == 5 && declaration) {
		declaration.status = node.status;
		declaration.clazzList = arguments[4];
	}
	node.declaration = declaration;
	if (declaration) 
		node.status = Node.STATUS_CONTENT_LOADED;
	processRequired(node, optionals, false);
};

/* private */
var processRequired = function(node, arr, isMust) {
	if (arr && arr.length) {
		unwrapArray(arr);
		for (var i = 0; i < arr.length; i++) {
			var name = arr[i];
			if (!name)
				continue;
			if (isClassDefined(name)
					|| isClassExcluded(name))
				continue;
			var n = findNode(name);
			if (!n) {
				n = new Node();
				n.name = name;
				n.status = Node.STATUS_KNOWN;
			}
			n.requiredBy = node;
			addChildClassNode(node, n, isMust);
		}
	}
}

/*
 * Try to be compatiable of Clazz
 */
if (window["Clazz"]) {
	Clazz.load = load;
} else {
  _Loader.load = load;
}  
/**
 * Map different class to the same path! Many classes may be packed into
 * a *.z.js already.
 *
 * @path *.js path
 * @name class name
 * @node Node object
 */
/* private */
var mappingPathNameNode = function (path, name, node) {
	var map = mapPath2ClassNode;
	var keyPath = "@" + path;
	var v = map[keyPath];
	if (v) {
		if (v instanceof Array) {
			var existed = false;
			for (var i = 0; i < v.length; i++) {
				if (v[i].name == name) {
					existed = true;
					break;
				}
			}
			if (!existed)
				v.push(node);
		} else {
			map[keyPath] = [v, node];
		}
	} else {
		map[keyPath] = node;
	}
	map["#" + name] = node;
};

/* protected */
var loadClassNode = function (node) {
	var name = node.name;
	if (!isClassDefined (name) 
			&& !isClassExcluded (name)) {
		var path = _Loader.getClasspathFor (name/*, true*/);
		node.path = path;
		mappingPathNameNode (path, name, node);
		if (!loadedScripts[path]) {
			loadScript(node, path, node.requiredBy, false);
			return true;
		}
	}
	return false;
};


/**
 * Used in package
/* public */
var runtimeKeyClass = _Loader.runtimeKeyClass = "java.lang.String";

/**
 * Queue used to store classes before key class is loaded.
 */
/* private */
var queueBe4KeyClazz = [];

/* private */
var J2sLibBase;

/**
 * Return J2SLib base path from existed SCRIPT src attribute.
 */
/* public */
_Loader.getJ2SLibBase = function () {
	var o = window["j2s.lib"];
	return (o ? o.base + (o.alias == "." ? "" : (o.alias ? o.alias : (o.version ? o.version : "1.0.0")) + "/") : null);
};

/**
 * Indicate whether _Loader is loading script synchronously or 
 * asynchronously.
 */
/* private */
var isAsynchronousLoading = true;

/* private */
var isUsingXMLHttpRequest = false;

/* private */
var loadingTimeLag = -1;

_Loader.MODE_SCRIPT = 4;
_Loader.MODE_XHR = 2;
_Loader.MODE_SYNC = 1;

/**
 * String mode:
 * asynchronous modes:
 * async(...).script, async(...).xhr, async(...).xmlhttprequest,
 * script.async(...), xhr.async(...), xmlhttprequest.async(...),
 * script
 * 
 * synchronous modes:
 * sync(...).xhr, sync(...).xmlhttprequest,
 * xhr.sync(...), xmlhttprequest.sync(...),
 * xmlhttprequest, xhr
 *                                                    
 * Integer mode:
 * Script 4; XHR 2; SYNC bit 1; 
 */
/* public */
_Loader.setLoadingMode = function (mode, timeLag) {
	var async = true;
	var ajax = true;
	if (typeof mode == "string") {
		mode = mode.toLowerCase();
		if (mode.indexOf("script") >= 0)
			ajax = false;
		else
			async = (mode.indexOf("async") >=0);
		async = false; // BH
	} else {
		if (mode & _Loader.MODE_SCRIPT)
			ajax = false;
		else
			async = !(mode & _Loader.MODE_SYNC);
	}
	isUsingXMLHttpRequest = ajax;
	isAsynchronousLoading = async;
	loadingTimeLag = (async && timeLag >= 0 ? timeLag: -1);
	return async;
};

/* private */
var runtimeLoaded = function () {
	if (pkgRefCount	|| !isClassDefined(runtimeKeyClass))
		return;
	var qbs = queueBe4KeyClazz;
	for (var i = 0; i < qbs.length; i++)
		_Loader.loadClass(qbs[i][0], qbs[i][1]);
	queueBe4KeyClazz = [];
};

/*
 * Load those key *.z.js. This *.z.js will be surely loaded before other 
 * queued *.js.
 */
/* public */
_Loader.loadZJar = function (zjarPath, keyClass) {
// used only by package.js for core.z.js
	var f =	null;
	var isArr = (keyClass instanceof Array);
	if (isArr)
		keyClass = keyClass[keyClass.length - 1];
	else
		f = (keyClass == runtimeKeyClass ? runtimeLoaded : null);			
	_Loader.jarClasspath(zjarPath, isArr ? keyClass : [keyClass]);
	// BH note: runtimeKeyClass is java.lang.String	
	_Loader.loadClass(keyClass, f, true);
};

var NodeMap = {};
var _allNodes = [];

/**
 * The method help constructing the multiple-binary class dependency tree.
 */
/* private */
var addChildClassNode = function (parent, child, isMust) {
	var existed = false;
	var arr;
	if (isMust) {
		arr = parent.musts;
		if (!child.requiredBy)
			child.requiredBy = parent;
//		if (!parent.requiresMap){
//			parent.requires = [];
//			parent.requiresMap = {};
//		}
//		if (!parent.requiresMap[child.name]) {
//			parent.requiresMap[child.name] = 1;
//			parent.requires.push[child];
//		}
	} else {
		arr = parent.optionals;
	}
	if (!NodeMap[child.name]) {
		_allNodes.push(child)
		NodeMap[child.name]=child
	}
	for (var i = 0; i < arr.length; i++) {
		if (arr[i].name == child.name) {
			existed = true;
			break;
		}
	}
	if (!existed) {
		arr.push(child);
		if (isLoadingEntryClass 
				&& child.name.indexOf("java") != 0 
				&& child.name.indexOf("net.sf.j2s.ajax") != 0) {
			if (besidesJavaPackage)
				isLoadingEntryClass = false;
			besidesJavaPackage = true;
//		} else if (child.name.indexOf("org.eclipse.swt") == 0 
//				|| child.name.indexOf("$wt") == 0) {
//			window["swt.lazy.loading.callback"] = swtLazyLoading;
//			if (needPackage("org.eclipse.swt"))
//				return _Loader.loadPackage("org.eclipse.swt", function() {addParentClassNode(child, parent)});
		}
	}
	addParentClassNode(child, parent);
};

/* private */
var addParentClassNode = function(child, parent) {
	if (parent.name && parent != clazzTreeRoot && parent != child)
		for (var i = 0; i < child.parents.length; i++)
			if (child.parents[i].name == parent.name)
				return;
	child.parents.push(parent);
}

/* private */
var destroyClassNode = function (node) {
	var parents = node.parents;
	if (parents)
		for (var k = parents.length; --k >= 0;)
			removeArrayItem(parents[k].musts, node) || removeArrayItem(parents[k].optionals, node);
};

/*
/ * public * /
_Loader.unloadClassExt = function (qClazzName) {
	if (definedClasses)
		definedClasses[qClazzName] = false;
	if (classpathMap["#" + qClazzName]) {
		var pp = classpathMap["#" + qClazzName];
		classpathMap["#" + qClazzName] = null;
		var arr = classpathMap["$" + pp];
		removeArrayItem(arr, qClazzName) && (classpathMap["$" + pp] = arr);
	}
	var n = findNode(qClazzName);
	if (n) {
		n.status = Node.STATUS_KNOWN;
		loadedScripts[n.path] = false;
	}
	var path = _Loader.getClasspathFor (qClazzName);
	loadedScripts[path] = false;
	innerLoadedScripts[path] && (innerLoadedScripts[path] = false);
	_Loader.onClassUnloaded(qClazzName);
};
/ * private * /
var assureInnerClass = function (clzz, fun) {
	clzz = clzz.__CLASS_NAME__;
	if (Clazz.unloadedClasses[clzz]) {
		if (clzz.indexOf("$") >= 0)
			return;
		var list = [];
		var key = clzz + "$";
		for (var s in Clazz.unloadedClasses)
			if (Clazz.unloadedClasses[s] && s.indexOf(key) == 0)
				list.push(s);
		if (!list.length) 
			return;
		fun = "" + fun;
		var idx1, idx2;
		if ((idx1 = fun.indexOf(key)) < 0 || (idx2 = fun.indexOf("\"", idx1 + key.length)) < 0) 
			return;
		clzz = fun.substring(idx1, idx2);
		if (!Clazz.unloadedClasses[clzz] || (idx1 = fun.indexOf("{", idx2) + 1) == 0)
			return;
		if ((idx2 = fun.indexOf("(" + clzz + ",", idx1 + 3)) < 0
			|| (idx2 = fun.lastIndexOf("}", idx2 - 1)) < 0)
				return;
		eval(fun.substring(idx1, idx2));
		Clazz.unloadedClasses[clzz] = null;
	}
};
*/
Clazz.binaryFolders =  _Loader.binaryFolders = [ _Loader.getJ2SLibBase() ];

})(Clazz, Clazz._Loader);

//}
/******************************************************************************
 * Copyright (c) 2007 java2script.org and others.
 * All rights reserved. This program and the accompanying materials
 * are made available under the terms of the Eclipse Public License v1.0
 * which accompanies this distribution, and is available at
 * http://www.eclipse.org/legal/epl-v10.html
 *
 * Contributors:
 *     Zhou Renjian - initial API and implementation
 *****************************************************************************/
/*******
 * @author zhou renjian
 * @create Jan 11, 2007
 *******/

Clazz._LoaderProgressMonitor = {};

;(function(CLPM, Jmol) {

var fadeOutTimer = null;
var fadeAlpha = 0;
var monitorEl = null;
var lastScrollTop = 0;
var bindingParent = null;

CLPM.DEFAULT_OPACITY = (Jmol && Jmol._j2sLoadMonitorOpacity ? Jmol._j2sLoadMonitorOpacity : 55);

/* public */
/*CLPM.initialize = function (parent) {
	bindingParent = parent;
	if (parent && !attached) {
		attached = true;
		//Clazz.addEvent (window, "unload", cleanup);
		// window.attachEvent ("onunload", cleanup);
	}
};
*/

/* public */
CLPM.hideMonitor = function () {
  	monitorEl.style.display = "none";
}

/* public */
CLPM.showStatus = function (msg, fading) {
	if (!monitorEl) {
		createHandle ();
		if (!attached) {
			attached = true;
			//Clazz.addEvent (window, "unload", cleanup);
			// window.attachEvent ("onunload", cleanup);
		}
	}
	clearChildren(monitorEl);
  if (msg == null) {
    if (fading) {
      fadeOut();
    } else {
    	CLPM.hideMonitor();
    }
    return;
  }
  
	monitorEl.appendChild(document.createTextNode ("" + msg));
	if (monitorEl.style.display == "none") {
		monitorEl.style.display = "";
	}
	setAlpha(CLPM.DEFAULT_OPACITY);
	var offTop = getFixedOffsetTop();
	if (lastScrollTop != offTop) {
		lastScrollTop = offTop;
		monitorEl.style.bottom = (lastScrollTop + 4) + "px";
	}
	if (fading) {
		fadeOut();
	}
};

/* private static */ 
var clearChildren = function (el) {
	if (!el)
		return;
	for (var i = el.childNodes.length; --i >= 0;) {
		var child = el.childNodes[i];
		if (!child)
			continue;
		if (child.childNodes && child.childNodes.length)
			clearChildren (child);
		try {
			el.removeChild (child);
		} catch (e) {};
	}
};
/* private */ 
var setAlpha = function (alpha) {
	if (fadeOutTimer && alpha == CLPM.DEFAULT_OPACITY) {
		window.clearTimeout (fadeOutTimer);
		fadeOutTimer = null;
	}
	fadeAlpha = alpha;
	var ua = navigator.userAgent.toLowerCase();
	monitorEl.style.filter = "Alpha(Opacity=" + alpha + ")";
	monitorEl.style.opacity = alpha / 100.0;
};
/* private */ 
var hidingOnMouseOver = function () {
  CLPM.hideMonitor();
};

/* private */ 
var attached = false;
/* private */ 
var cleanup = function () {
	//if (monitorEl) {
	//	monitorEl.onmouseover = null;
	//}
	monitorEl = null;
	bindingParent = null;
	//Clazz.removeEvent (window, "unload", cleanup);
	//window.detachEvent ("onunload", cleanup);
	attached = false;
};
/* private */ 
var createHandle = function () {
	var div = document.createElement ("DIV");
	div.id = "_Loader-status";
	div.style.cssText = "position:absolute;bottom:4px;left:4px;padding:2px 8px;"
			+ "z-index:" + (window["j2s.lib"].monitorZIndex || 10000) + ";background-color:#8e0000;color:yellow;" 
			+ "font-family:Arial, sans-serif;font-size:10pt;white-space:nowrap;";
	div.onmouseover = hidingOnMouseOver;
	monitorEl = div;
	if (bindingParent) {
		bindingParent.appendChild(div);
	} else {
		document.body.appendChild(div);
	}
	return div;
};
/* private */ 

var fadeOut = function () {
	if (monitorEl.style.display == "none") return;
	if (fadeAlpha == CLPM.DEFAULT_OPACITY) {
		fadeOutTimer = window.setTimeout(function () {
					fadeOut();
				}, 750);
		fadeAlpha -= 5;
	} else if (fadeAlpha - 10 >= 0) {
		setAlpha(fadeAlpha - 10);
		fadeOutTimer = window.setTimeout(function () {
					fadeOut();
				}, 40);
	} else {
		monitorEl.style.display = "none";
	}
};
/* private */
var getFixedOffsetTop = function (){
	if (bindingParent) {
		var b = bindingParent;
		return b.scrollTop;
	}
	var dua = navigator.userAgent;
	var b = document.body;
	var p = b.parentNode;
	var pcHeight = p.clientHeight;
	var bcScrollTop = b.scrollTop + b.offsetTop;
	var pcScrollTop = p.scrollTop + p.offsetTop;
	return (dua.indexOf("Opera") < 0 && document.all ? (pcHeight == 0 ? bcScrollTop : pcScrollTop)
		: dua.indexOf("Gecko") < 0 ? (pcHeight == p.offsetHeight 
				&& pcHeight == p.scrollHeight ? bcScrollTop : pcScrollTop) : bcScrollTop);
};

/* not used in Jmol
if (window["ClazzLoader"]) {
	_Loader.onScriptLoading = function(file) {
		CLPM.showStatus("Loading " + file + "...");
	};
	_Loader.onScriptLoaded = function(file, isError) {
		CLPM.showStatus(file + (isError ? " loading failed." : " loaded."), true);
	};
	_Loader.onGlobalLoaded = function(file) {
		CLPM.showStatus("Application loaded.", true);
	};
	_Loader.onClassUnloaded = function(clazz) {
		CLPM.showStatus("Class " + clazz + " is unloaded.", true);
  };
}
*/

})(Clazz._LoaderProgressMonitor, Jmol);

//}
/******************************************************************************
 * Copyright (c) 2007 java2script.org and others.
 * All rights reserved. This program and the accompanying materials
 * are made available under the terms of the Eclipse Public License v1.0
 * which accompanies this distribution, and is available at
 * http://www.eclipse.org/legal/epl-v10.html
 *
 * Contributors:
 *     Zhou Renjian - initial API and implementation
 *****************************************************************************/
/*******
 * @author zhou renjian
 * @create Nov 5, 2005
 *******/

;(function(Con, Sys) {
/**
 * Setting maxTotalLines to -1 will not limit the console result
 */
/* protected */
Con.maxTotalLines =	10000;

/* protected */
Con.setMaxTotalLines = function (lines) {
	Con.maxTotalLines = (lines > 0 ? lines : 999999);
}

/* protected */
Con.maxLatency = 40;

/* protected */
Con.setMaxLatency = function (latency) {
	Con.maxLatency = (latency > 0 ? latency : 40);
};

/* protected */
Con.pinning  = false;

/* protected */
Con.enablePinning = function (enabled) {
	Con.pinning = enabled;
};

/* private */
Con.linesCount = 0;

/* private */
Con.metLineBreak = false;


/*
 * Give an extension point so external script can create and bind the console
 * themself.
 *
 * TODO: provide more template of binding console window to browser.
 */
/* protected */
Con.createConsoleWindow = function (parentEl) {
	var console = document.createElement ("DIV");
	console.style.cssText = "font-family:monospace, Arial, sans-serif;";
	document.body.appendChild (console);
	return console;
};

var c160 = String.fromCharCode(160); //nbsp;
c160 += c160+c160+c160;

/* protected */
Con.consoleOutput = function (s, color) {
	var o = window["j2s.lib"];
	var console = (o && o.console);
	if (console && typeof console == "string")
		console = document.getElementById(console)
	if (!console)
		return false; // BH this just means we have turned off all console action
	if (Con.linesCount > Con.maxTotalLines) {
		for (var i = 0; i < Con.linesCount - Con.maxTotalLines; i++) {
			if (console && console.childNodes.length > 0) {
				console.removeChild (console.childNodes[0]);
			}
		}
		Con.linesCount = Con.maxTotalLines;
	}

	var willMeetLineBreak = false;
	s = (typeof s == "undefined" ? "" : s == null ? "null" : "" + s);
	s = s.replace (/\t/g, c160);
	if (s.length > 0)
		switch (s.charAt(s.length - 1)) {
		case '\n':
		case '\r':
			s = (s.length > 1 ? s.substring (0, s.length - (s.charAt (s.length - 2) == '\r' ? 2 : 1)) : "");
			willMeetLineBreak = true;
			break;
		}

	var lines = null;
	s = s.replace (/\t/g, c160);
	lines = s.split(/\r\n|\r|\n/g);
	for (var i = 0, last = lines.length - 1; i <= last; i++) {
		var lastLineEl = null;
		if (Con.metLineBreak || Con.linesCount == 0 
				|| console.childNodes.length < 1) {
			lastLineEl = document.createElement ("DIV");
			console.appendChild (lastLineEl);
			lastLineEl.style.whiteSpace = "nowrap";
			Con.linesCount++;
		} else {
			try {
				lastLineEl = console.childNodes[console.childNodes.length - 1];
			} catch (e) {
				lastLineEl = document.createElement ("DIV");
				console.appendChild (lastLineEl);
				lastLineEl.style.whiteSpace = "nowrap";
				Con.linesCount++;
			}
		}
		var el = document.createElement ("SPAN");
		lastLineEl.appendChild (el);
		el.style.whiteSpace = "nowrap";
		if (color)
			el.style.color = color;
		var l = lines[i]
		if (l.length == 0)
			l = c160;
		el.appendChild(document.createTextNode(l));
		if (!Con.pinning)
			console.scrollTop += 100;
		Con.metLineBreak = (i != last || willMeetLineBreak);
	}

	var cssClazzName = console.parentNode.className;
	if (!Con.pinning && cssClazzName
			&& cssClazzName.indexOf ("composite") != -1) {
		console.parentNode.scrollTop = console.parentNode.scrollHeight;
	}
	Con.lastOutputTime = new Date ().getTime ();
};

/*
 * Clear all contents inside the console.
 */
/* public */
Con.clear = function () {
	try {
		Con.metLineBreak = true;
		var o = window["j2s.lib"];
		var console = o && o.console;
		if (!console || !(console = document.getElementById (console)))
			return;
		var childNodes = console.childNodes;
		for (var i = childNodes.length; --i >= 0;)
			console.removeChild (childNodes[i]);
		Con.linesCount = 0;
	} catch(e){};
};

/* public */
Clazz.alert = function (s) {
	Con.consoleOutput (s + "\r\n");
};


/* public */
Sys.out.print = function (s) { 
	Con.consoleOutput (s);
};
/* public */
Sys.out.println = function(s) { 
	Con.consoleOutput(typeof s == "undefined" ? "\r\n" : s == null ?  s = "null\r\n" : s + "\r\n");
};

Sys.out.write = function (buf, offset, len) {
	Sys.out.print(String.instantialize(buf).substring(offset, offset+len));
};

/* public */
Sys.err.__CLASS_NAME__ = "java.io.PrintStream";

/* public */
Sys.err.print = function (s) { 
	Con.consoleOutput (s, "red");
};

/* public */
Sys.err.println = function (s) {
	Con.consoleOutput (typeof s == "undefined" ? "\r\n" : s == null ?  s = "null\r\n" : s + "\r\n", "red");
};

Sys.err.write = function (buf, offset, len) {
	Sys.err.print(String.instantialize(buf).substring(offset, offset+len));
};

})(Clazz.Console, System);

})(Clazz, Jmol); // requires JSmolCore.js

}; // called by external application 
Jmol.___JmolDate="$Date: 2020-09-22 08:42:29 -0500 (Tue, 22 Sep 2020) $"
Jmol.___fullJmolProperties="src/org/jmol/viewer/Jmol.properties"
Jmol.___JmolVersion="14.31.7"
