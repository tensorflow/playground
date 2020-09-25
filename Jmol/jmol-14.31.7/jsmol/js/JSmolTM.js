// JSmolTM.js -- JSmol TwirlyMol implementation
//
// TM for "TwirlyMol" -- which this is derived from.
// Can't say there is much of TwirlyMol left in here, as
// we are not using dojo, there are no shadows, and I use a simpler
// rendering idea. Nonetheless, TwirlyMol is the inspiration.
//
// author: Bob Hanson, hansonr@stolaf.edu	3/23/2012

// This library requires
//
//	JSmoljQuery.js
//	JSmolCore.js
//
// and is combined with those in JSmol.lite.jq.js
// or packaged without jQuery -- because you are using it already -- in JSmol.lite.js
//


// BH  3/19/2015 7:34:56 AM  Info.defaultModel not working
//
// BH 3/17/2015 3:47:31 PM  very simple scripting:
//   image      (open a new window of the image in PNG format)
//   spin on 
//   spin off
//   load $caffeine   (open a file -- can use : or $ or other known shortcuts)
//
//  These can be entered into the search box (see lite2.htm) with a preceding "!":
//
//   !image 
//
//  and concatenated with ";":
// 
//  spin off;image;spin on

   
Jmol._grabberOptions = [
	["$", "NCI(small molecules)"],
	[":", "PubChem(small molecules)"]
];

Jmol.say = function(msg) {
	alert(msg);
}

Jmol._TMApplet = function(id, Info, checkOnly){
		this._uniqueId = ("" + Math.random()).substring(3);
		this._id = id;
		this._is2D = true;
		this._isJava = false;
		this._ready = true;
		this._mouseDown = false;
		this._jmolType = "Jmol._Canvas2D (TwirlyMol)";
		if (checkOnly)
			return this;
		this._createCanvas(id, Info);
		return this;
}

Jmol._TMApplet._getApplet = function(id, Info, checkOnly) {
	if (!Jmol.featureDetection.allowHTML5)
		return null;
				checkOnly || (checkOnly = false);
	Info || (Info = {});
	var DefaultInfo = {
		color: "#FFFFFF",
 		width: 300,
		height: 300,
		addSelectionOptions: false,
		serverURL: "http://your.server.here/jsmol.php",
		defaultModel: "",
		readyFunction: null,
		use: "HTML5",
		bondWidth: 5,
		shadeAtoms: false,
		zoomScaling: 1.5,
		pinchScaling: 2.0,
		mouseDragFactor: 0.5,
		touchDragFactor: 0.15,
		multipleBondSpacing: 4,
		spinRateX: 0.0,
		spinRateY: 0.5,
		spinFPS: 20,
		spin: false,
		noscript: true,
		debug: false
	};	 
	Jmol._addDefaultInfo(Info, DefaultInfo);
	var applet = new Jmol._TMApplet(id, Info, checkOnly);
	if (checkOnly)
		return applet;
	return Jmol._registerApplet(id, applet);
}

Jmol.getTMApplet = Jmol._TMApplet._getApplet;

;(function(tm){

tm._CPK = ["#FF1493", "#FFFFFF", "#D9FFFF", 
	"#CC80FF", "#C2FF00", "#FFB5B5", "#909090", "#3050F8", "#FF0D0D", "#90E050", "#B3E3F5", 
	"#AB5CF2", "#8AFF00", "#BFA6A6", "#F0C8A0", "#FF8000", "#FFFF30", "#1FF01F", "#80D1E3",
	"#8F40D4", "#3DFF00", "#E6E6E6", "#BFC2C7", "#A6A6AB", "#8A99C7", "#9C7AC7", "#E06633", 
		"#F090A0", "#50D050", "#C88033", "#7D80B0", "#C28F8F", "#668F8F", "#BD80E3", "#FFA100", "#A62929", "#5CB8D1", 
	"#702EB0", "#00FF00", "#94FFFF", "#94E0E0", "#73C2C9", "#54B5B5", "#3B9E9E", "#248F8F", 
		"#0A7D8C", "#006985", "#C0C0C0", "#FFD98F", "#A67573", "#668080", "#9E63B5", "#D47A00", "#940094", "#429EB0", 
	"#57178F", "#00C900"] // through barium
	//  "#70D4FF", "#FFFFC7", "#D9FFC7", "#C7FFC7", "#A3FFC7", "#8FFFC7", "#61FFC7", "#45FFC7", "#30FFC7", "#1FFFC7", "#00FF9C", "#00E675", "#00D452", "#00BF38", "#00AB24", "#4DC2FF", "#4DA6FF", "#2194D6", "#267DAB", "#266696", "#175487", "#D0D0E0", "#FFD123", "#B8B8D0", "#A6544D", "#575961", "#9E4FB5", "#AB5C00", "#754F45", "#428296", "#420066", "#007D00", "#70ABFA", "#00BAFF", "#00A1FF", "#008FFF", "#0080FF", "#006BFF", "#545CF2", "#785CE3", "#8A4FE3", "#A136D4", "#B31FD4", "#B31FBA", "#B30DA6", "#BD0D87", "#C70066", "#CC0059", "#D1004F", "#D90045", "#E00038", "#E6002E", "#EB0026"]; 
tm._elem = ['X', 'H', 'He', 
	'Li', 'Be', 'B', 'C', 'N', 'O', 'F', 'Ne', 
	'Na', 'Mg', 'Al', 'Si', 'P', 'S', 'Cl', 'Ar', 
	'K', 'Ca', 'Sc', 'Ti', 'V', 'Cr', 'Mn', 'Fe', 'Co', 'Ni', 'Cu', 'Zn', 'Ga', 'Ge', 'As', 'Se', 'Br', 'Kr', 
	'Rb', 'Sr', 'Y', 'Zr', 'Nb', 'Mo', 'Tc', 'Ru', 'Rh', 'Pd', 'Ag', 'Cd', 'In', 'Sn', 'Sb', 'Te', 'I', 'Xe', 
	'Cs', 'Ba', 
		'La', 'Ce', 'Pr', 'Nd', 'Pm', 'Sm', 'Eu', 'Gd', 'Tb', 'Dy', 'Ho', 'Er', 'Tm', 'Yb', 
			 'Lu', 'Hf', 'Ta', 'W', 'Re', 'Os', 'Ir', 'Pt', 'Au', 'Hg', 'Tl', 'Pb','Bi', 'Po', 'At', 'Rn', 
	'Fr', 'Ra', 
		'Ac', 'Th', 'Pa', 'U', 'Np', 'Pu', 'Am', 'Cm', 'Bk', 'Cf', 'Es'];
tm._elemNo = {};

;(function(proto) {

// A user-available function

proto.spin = function(TF) {
	this.__Info.spin = TF;
	this._spin(TF);
}

proto._spin = function(TF) {
	if (this._spinThread)clearTimeout(this._spinThread);
	if (this.spinFPS == 0 || this.spinRateX == 0 && this.spinRateY == 0)
		TF = false;
	if (!TF) return;
	var me = this;
	var delay = 1000 / this.spinFPS;
	if (!this._mouseDown) {
		this._rotate(this.spinRateY, this.spinRateX);
		this._draw();
	}
	this._spinThread = setTimeout(function(){me._spin(true)}, delay);
}

proto._initParams = function() {
	this.zoom = this.__Info.defaultZoom || 100;
	this.doSpin = this.__Info.spin || false;
	this.center2D = [this._canvas.width/2, this._canvas.height/2, 0];
	this._getCenterAndRadius();
	this.rotation = new tm.M3();
	this.shadeAtoms = false;
	this._setParams();
}

proto._setParams = function() {
	this.bondWidth = this.__Info.bondWidth || 5;
	this.zoomScaling = this.__Info.zoomScaling || 1.5;
	this.pinchScaling = this.__Info.pinchScaling || 1;
	this.mouseDragFactor = this.__Info.mouseDragFactor || 0.5;
	this.touchDragFactor = this.__Info.touchDragFactor || 0.15;
	this.multipleBondSpacing = this.__Info.multipleBondSpacing || 4;
	this.spinRateX = this.__Info.spinRateX || 0;
	this.spinRateY = this.__Info.spinRateY || 0;
	this.spinFPS = this.__Info.spinFPS || 0;
	var p = this.shadeAtoms;
	this.shadeAtoms = this.__Info.shadeAtoms || false;
	if (this.shadeAtoms && !p)
		this._setAtomShades();
}

proto._setAtomShades = function() {
	if (!this.atoms)
		return;
	for (var i = this.atoms.length; --i >= 0;)
		this.atoms[i].color50 = this._getColor(this.atoms[i].color, 0.5);
}
proto._createCanvas = function(id, Info) {
	Jmol._setObject(this, id, Info);
	this._color = this._color.replace(/0x/,"#");
	var t = Jmol._getWrapper(this, true);
	if (Jmol._document) {
		Jmol._documentWrite(t);
		this._createCanvas2d(false);				
		t = "";
	} else {
		t += '<script type="text/javascript">' + id + '._createCanvas2d(false)</script>';
	}
	t += Jmol._getWrapper(this, false);
	if (Info.addSelectionOptions)
		t += Jmol._getGrabberOptions(this, "");
	if (Jmol._debugAlert && !Jmol._document)
		alert(t);    
	this._code = Jmol._documentWrite(t);
};

proto._createCanvas2d = function(doReplace) {
	var canvas = document.createElement( 'canvas' );
	var container = Jmol.$(this, "appletdiv");
	if (doReplace) {
		container[0].removeChild(this._canvas);
		Jmol._jsUnsetMouse(this._canvas);
	}
	var w = Math.round(container.width());
	var h = Math.round(container.height());
	canvas.applet = this;
	this._canvas = canvas;
	canvas.style.width = "100%";
	canvas.style.height = "100%";
	canvas.width = w;
	canvas.height = h; // w and h used in setScreenDimension
	canvas.id = this._id + "_canvas2d";
	container.append(canvas);
	setTimeout(this._id+"._start()",10);
}

proto._start = function() {
	Jmol._jsSetMouse(this._canvas);  
	if (this._defaultModel)
		Jmol._search(this, this._defaultModel, (this._readyScript ? this._readyScript : ""));
	else if (this._src)
		this._loadFile(this._src);
	this._showInfo(true);
	this._showInfo(false);
}      

proto._search = function(query, script){
	Jmol._search(this, query, script);
}

proto._searchDatabase = function(query, database, script){
	this._showInfo(false);
	if (query.indexOf("?") >= 0) {
		Jmol._getInfoFromDatabase(this, database, query.split("?")[0]);
		return;
	}
	var dm = database + query; 
	this._loadFile(dm, script);
}

proto.__loadModel = function(mol) {
	this._spin(false);
	if (mol == "''")mol = this._mol;
	if (!mol) {
		alert("No model data.");
		return;
	}
	this._parse(mol);
	this._initParams();
	this._draw();
	this._showInfo(false);
	if (this.doSpin) 
		this._spin(true);
};

proto._showInfo = function(tf) {
	Jmol.$html(Jmol.$(this, "infoheaderspan"), this._infoHeader);
	if (this._info)
		Jmol.$html(Jmol.$(this, "infodiv"), this._info);
	if ((!this._isInfoVisible) == (!tf))
		return;
	this._isInfoVisible = tf;
	Jmol.$setVisible(Jmol.$(this, "infotablediv"), tf);
	Jmol.$setVisible(Jmol.$(this, "infoheaderdiv"), tf);
	this._show(!tf);
}

proto._show = function(tf) {
	Jmol.$setVisible(Jmol.$(this, "appletdiv"), tf);
	if (tf)
		this._draw();
}

proto._resize = function() {
	var s = "__resizeTimeout_" + this._id;
	// only at end
	if (Jmol[s])
		clearTimeout(Jmol[s]);
	var me = this;
	Jmol[s] = setTimeout(function() {me._draw();Jmol[s]=null}, 100);
}

proto._canScript = function(script) {return true};

proto._script = function(cmd) {
  var s = cmd.split(";");
  for (var i = 0; i < s.length; i++) {
    cmd = s[i].trim();
    if (cmd == "image") {
            window.open(this._canvas.toDataURL("image/png"));
    } else if (cmd.indexOf("load ") == 0) {
      this._loadFile(cmd.substring(5).trim());
    } else if (cmd.indexOf("spin ") == 0) {
      this.spin(cmd.toLowerCase().indexOf("off") < 0);
    }
  }
}

proto._loadFile = function(fileName){
	this._showInfo(false);
	this._thisJmolModel = fileName;
	var app = this;
	Jmol._loadFileData(this, fileName, function(data){app.__loadModel(data)});
}

proto._processEvent = function(type, xym) {
	switch(type) {
	case 502: // mouse_up
	case 503: // mouse_move
		this._mouseDown = false;
	default:
		return;
	case 501: // mouse_down
		this._mouseX = xym[0];
		this._mouseY = xym[1];
		this._mouseDown = true;
		return;
	case 506: // mouse_drag
		var dx = xym[0] - this._mouseX;
		var dy = xym[1] - this._mouseY;
		dx = (dx < 0 ? -1 : dx > 0 ? 1 : 0)
		dy = (dy < 0 ? -1 : dy > 0 ? 1 : 0)

		switch (xym[2]) {
		case 17: // left-shift
			this._zoomBy(dy);
			break;
		case 24: // left-alt
			this.center2D[0] += dx;
			this.center2D[1] += dy;
			break;
		default:
			this._rotate(dx, dy);
			break;
		}
		this._mouseX = xym[0];
		this._mouseY = xym[1];
		break;
	case -1:  // mouse_scroll
		this._zoomBy(xym[1])
		break;
	}
	this._draw();
}

proto._processGesture = function (touches) {
	if (touches[0].length < 2) return;
	var t1 = touches[0];
	var t2 = touches[1];
	var t10 = t1[0];
	var t11 = t1[t2.length - 1];
	var x10 = t10[0];
	var x11 = t11[0];
	var dx1 = x11 - x10;
	var y10 = t10[1];
	var y11 = t11[1];
	var dy1 = y11 - y10;
	var v1 = [dx1, dy1, 0];
	var d1 = tm._length(v1);
	var t20 = t2[0];
	var t21 = t2[t2.length - 1];
	var x20 = t20[0];
	var x21 = t21[0];
	var dx2 = x21 - x20;
	var y20 = t20[1];
	var y21 = t21[1];
	var dy2 = y21 - y20;
	var v2 = [dx2, dy2, 0];
	var d2 = tm._length(v2);
	if (d1 < 3 || d2 < 3) return;
	tm._scale(v1, 1/d1);
	tm._scale(v2, 1/d2);
	var cos12 = tm._dot(v1,v2);
	if (cos12 > 0.8) {
		var deltaX = Math.round(x11 - t1[t1.length - 2][0]);
		var deltaY = Math.round(y11 - t1[t1.length - 2][1]);
		this.center2D[0] += deltaX;
		this.center2D[1] += deltaY;
	} else if (cos12 < -0.8) {
		v1 = [x20 - x10, y20 - y10, 0]
		v2 = [x21 - x11, y21 - y11, 0];
		var dx = tm._length(v2) - tm._length(v1);
		this.zoom += (dx < 0 ? -1 : 1) * this.pinchScaling;
	}
	this._draw();
}

proto._zoomBy = function(dz) {
	this.zoom += dz * this.zoomScaling;
	if (this.zoom < 5) this.zoom = 5;
	if (this.zoom > 500) this.zoom = 500;
}

proto._getRotationScaling = function() {
	return [1 / Math.max(this._canvas.width, 500) * this.mouseDragFactor * tm.deg_per_radian, 
		1 / Math.max(this._canvas.height, 500) * this.mouseDragFactor * tm.deg_per_radian];
}

proto._rotate = function(dx, dy) {
	var f = this._getRotationScaling();
	if (dy) {
		tm._m3.rotX(dy * f[1]);
		this.rotation.mul(tm._m3);
	}  
	if (dx) {
		tm._m3.rotY(dx * f[0]);
		this.rotation.mul(tm._m3);
	}
}

proto._getCenterAndRadius = function() {
	var p = this;
	var size = Math.min(p._canvas.width, p._canvas.height);
	var min = [999999, 999999, 999999];
	var max = [-999999, -999999, -999999];
	for (var i= p.atoms.length; --i >= 0;)
		for (var j = 3; --j >= 0;) {
			var v = p.atoms[i].xyz[j];
			if (v < min[j]) min[j]=v;
			if (v > max[j]) max[j]=v;
		}
	var c = [0, 0, 0];
	for (var j = 3; --j >= 0;)
		c[j] = (max[j] + min[j])/2;
	var r = 0;
	for (var i= p.atoms.length; --i >= 0;) {
		var a = p.atoms[i];
		var d = tm._distance(a.xyz, c) + (a.elemNo == 1 ? 1 : 1.5);//a.radius;
		if (d > r)
			r = d;
	}
	this.center = c;
	this.modelRadius = (r == 0 ? 10 : r);
}

proto._setScreenCoords = function() {
	var c = this.center;
	var mat = this.rotation;
	var sc = this.center2D;
	var f = Math.min(this._canvas.width, this._canvas.height) / 2 / this.modelRadius * this.zoom / 100;
	for (var i=this.atoms.length; --i >= 0;) {
		var a = this.atoms[i];
		this._transform(a.xyz, a.sxyz, c, mat, f, sc);
		a.srad = f * a.radius;
	}
	for (var i=this.bonds.length; --i >= 0;) {
		var b = this.bonds[i];
		this._transform(b.xyz, b.sxyz, c, mat, f, sc);
		this._transform(b.pts[0], b.spts[0], c, mat, f, sc);
		this._transform(b.pts[1], b.spts[1], c, mat, f, sc);
	}
}

proto._transform = function(pt, spt, c, mat, f, sc) {
	var a = tm._temp1;
	var b = tm._temp2;
	for (var i = 3; --i >= 0;)
		a[i] = (pt[i] - c[i]) * f;
	mat.transform(a, b);
	b[1] = -b[1];
	b[2] = -b[2];
	for (var i = 3; --i >= 0;)
		spt[i] = b[i] + sc[i];  
}


//  adaptable --- 

proto._parse = function(data) {
	// just MOL data for now
	this._parseSDF(data);
}

proto._parseSDF = function(sdf) {
	this._mol = sdf;
	if (!tm._elemNo["H"])
		for (var i = tm._elem.length; --i >= 0;)
			tm._elemNo[tm._elem[i]] = i;
	var lines = sdf.split("\n");
	var pt = 3;
	var line = lines[pt++];
	this.nAtoms = parseFloat(line.substring(0, 3));
	this.nBonds = parseFloat(line.substring(3, 6));
	this.atoms = Array(this.nAtoms);
	this.bonds = Array(this.nBonds);
	this.elements = Array(this.nAtoms + this.nBonds)
	var ept = 0;
	var x, y, z;
	for (var i = 0; i < this.nAtoms; i++) {
		line = lines[pt++];
		x = parseFloat(line.substring(0, 10));
		y = parseFloat(line.substring(10, 20));
		z = parseFloat(line.substring(20, 30));
		var e = line.substring(31, 34).replace(/\s+/g, '');
		var elemNo = tm._elemNo[e] || 0;
		var radius = (elemNo == 1 ? 0.23 : 0.35);
		var color = tm._CPK[elemNo] || tm._CPK[0];
		this.elements[ept++] = this.atoms[i] = {type:0, elemNo: elemNo, xyz:[x, y, z], sxyz:[0, 0, 0], radius: radius, color: color, color50: color};
	}
	for (var i = 0; i < this.nBonds; i++) {
		line = lines[pt++]
		var a1 = this.atoms[parseFloat(line.substring(0, 3)) - 1];
		var a2 = this.atoms[parseFloat(line.substring(3, 6)) - 1];
		var order = Math.abs(parseFloat(line.substring(6, 9)));
		switch (order) {
		case 4: // JmolAdapter.ORDER_AROMATIC;
		case 5: // JmolAdapter.ORDER_PARTIAL12;
		case 6: // JmolAdapter.ORDER_AROMATIC_SINGLE;
		case 8: // JmolAdapter.ORDER_PARTIAL01;
			order = 1;
			break;
		case 7: // JmolAdapter.ORDER_AROMATIC_DOUBLE;
			order = 2; 
			break;
		}
		var xyz = tm._getPointAlong(a1.xyz, a2.xyz, 0.5);
		var d = tm._distance(a1.xyz, xyz); 
		var p1 = (a1.radius < d ? tm._getPointAlong(a1.xyz, xyz, a1.radius/d) : [0, 0, 99999]);
		var p2 = (a2.radius < d ? tm._getPointAlong(a2.xyz, xyz, a2.radius/d) : [0, 0, 99999]);
		this.elements[ept++] = this.bonds[i] = {type:1, atoms: [a1, a2], xyz:xyz, pts:[p1,p2], sxyz:[0, 0, 0], spts:[[0,0,0],[0,0,0]], order: order, color: 0};
	}
	//alert(this.atoms.length + " atoms " + this.bonds.length + " bonds")
}

proto._getColor = function(c, f) {
	if (c == "#FFFFFF") c = "#D0D0D0"; 
	var n = parseInt("0x" + c.substring(1), 16);
	var r=(n >> 16) & 0xFF;
	var g=(n >> 8) & 0xFF;
	var b=(n) & 0xFF;
	if (r != 255)
		r += Math.floor((255 - r) * f);
	if (g != 255)
		g += Math.floor((255 - g) * f);
	if (b != 255)
		b += Math.floor((255 - b) * f);
	var s = "000000" + ((r << 16) | (g << 8) | b).toString(16);
	return "#"+s.substring(s.length - 6, s.length);
}

proto._draw = function() {
	if (!this.atoms)return;
	this._setParams();
	this._setScreenCoords();
	var es = this.elements;  
	es.sort(tm._zorder);
	var ctx=this._canvas.getContext("2d");
	ctx.fillStyle=this._color;
	ctx.fillRect(0,0,this._canvas.width, this._canvas.height);
	for (var i = es.length; --i >= 0;) {
		var e = es[i];
		if (e.type == 0)
			this._drawAtom(ctx, e);
		else
			this._drawBond(ctx, e);
	}
}

///////////////// drawing ///////////////////



proto._drawAtom = function(ctx, a) {
	ctx.beginPath();
	// context.fillStyle = "rgba(0, 0, 0, 1)";

	if (this.shadeAtoms) {
		var offset = a.srad / 4;
		var grad = ctx.createRadialGradient(a.sxyz[0]-offset,a.sxyz[1]-offset, offset, a.sxyz[0],a.sxyz[1], a.srad);
		grad.addColorStop(0.0, a.color50);
		grad.addColorStop(1.0, (a.color == "#FFFFFF" ? "#D0D0D0" : a.color));
		ctx.fillStyle = grad;  
		ctx.arc(a.sxyz[0],a.sxyz[1],a.srad,0,tm._pi2);
		ctx.fill();
	} else {
		ctx.fillStyle = a.color;
		ctx.arc(a.sxyz[0],a.sxyz[1],a.srad,0,tm._pi2);
		ctx.fill();
		ctx.strokeStyle = "#000000";
		ctx.lineWidth = 1;
		ctx.stroke();
	}
}

proto._drawBond = function(ctx, b) {
	if (b.pts[0][2] != 99999)
		this._drawBondLines(ctx, b, b.spts[0], b.atoms[0].color);       
	if (b.pts[1][2] != 99999)
		this._drawBondLines(ctx, b, b.spts[1], b.atoms[1].color); 
}

proto._drawBondLines = function(ctx, b, pt, ac) {
	var t = tm._temp;
	t.width = this.bondWidth;
	t.color = (b.color ? b.color : ac);
	if (b.order == 1) {
		t.pt1 = pt;
		t.pt2 = b.sxyz;
		this._drawLine(ctx, t);
		return;
	}
	t.pt1 = tm._temp1;
	t.pt2 = tm._temp2;
	t.pta = pt;
	t.ptb = b.sxyz;
	t.dx = t.ptb[0] - t.pta[0];
	t.dy = t.ptb[1] - t.pta[1];
	t.mag2d = Math.round(Math.sqrt(t.dx * t.dx + t.dy * t.dy));
	t.bondOrder = b.order;
	this._resetAxisCoordinates(t);
	while (t.bondOrder > 0) {
		this._drawLine(ctx, t);
		t.bondOrder--;
		this._stepAxisCoordinates(t);
	}
}

proto._drawLine = function(ctx, t) {
		ctx.beginPath();
		ctx.strokeStyle = t.color;
		ctx.moveTo(t.pt1[0], t.pt1[1]);
		ctx.lineTo(t.pt2[0], t.pt2[1]);
		ctx.lineWidth = t.width;
		ctx.stroke();
}

proto._resetAxisCoordinates = function(t) {
	var space = t.mag2d >> 3;
	if (this.multipleBondSpacing != 1) space *= this.multipleBondSpacing;
	var step = t.width + space;
	t.dxStep = Math.round(step * t.dy / t.mag2d);
	t.dyStep = Math.round(step * -t.dx / t.mag2d);
	t.pt1[0] = t.pta[0];
	t.pt1[1] = t.pta[1];
	t.pt2[0] = t.ptb[0];
	t.pt2[1] = t.ptb[1];
	var f = (t.bondOrder - 1);
	t.pt1[0] -= Math.round(t.dxStep * f / 2);
	t.pt1[1] -= Math.round(t.dyStep * f / 2);
	t.pt2[0] -= Math.round(t.dxStep * f / 2);
	t.pt2[1] -= Math.round(t.dyStep * f / 2);
}

proto._stepAxisCoordinates = function(t) {
	t.pt1[0] += t.dxStep;
	t.pt1[1] += t.dyStep;
	t.pt2[0] += t.dxStep;
	t.pt2[1] += t.dyStep;
}

})(tm.prototype)

tm._distance = function(a,b){
	var d = 0;
	for (var i = 3; --i >= 0;) {
		var dx = a[i] - b[i];
		d += dx * dx;
	}
	return Math.sqrt(d);
} 

tm._dot = function(a,b){
	var d = 0;
	for (var i = 3; --i >= 0;)
		d += a[i] * b[i];
	return d;
} 

tm._setPt = function(a,b){
	for (var i = 3; --i >= 0;)
		b[i] = a[i];
	return b;
} 

tm._scale = function(a, f){
	for (var i = 3; --i >= 0;)
		a[i] *= f;
} 

tm._length = function(a){
	var d = 0;
	for (var i = 3; --i >= 0;)
		d += a[i] * a[i];
	return Math.sqrt(d);
} 

tm._getPointAlong = function(a, b, f) {
	return [(b[0] - a[0]) * f + a[0], 
		(b[1] - a[1]) * f + a[1], 
		(b[2] - a[2]) * f + a[2]];
}
	 
tm._zorder = function(a, b) {
	var x = a.sxyz[2];
	var y = b.sxyz[2];
	return (x < y ? -1 : x > y ? 1 : 0);
}

tm.M3 = function() {
	this.m00 = 1.0;
	this.m01 = 0.0;
	this.m02 = 0.0;
	this.m10 = 0.0;
	this.m11 = 1.0;
	this.m12 = 0.0;
	this.m20 = 0.0;
	this.m21 = 0.0;
	this.m22 = 1.0;
}

tm.M3.prototype.set = function (m00, m01, m02, m10, m11, m12, m20, m21, m22) {
	this.m00 = m00;
	this.m01 = m01;
	this.m02 = m02;
	this.m10 = m10;
	this.m11 = m11;
	this.m12 = m12;
	this.m20 = m20;
	this.m21 = m21;
	this.m22 = m22;
}

tm.M3.prototype.transform = function(a, b) {
	b[0] = this.m00 * a[0] + this.m01 * a[1] + this.m02 * a[2];
	b[1] = this.m10 * a[0] + this.m11 * a[1] + this.m12 * a[2];
	b[2] = this.m20 * a[0] + this.m21 * a[1] + this.m22 * a[2];
}

tm.M3.prototype.rotX = function(angle) {
	var c = Math.cos(angle);
	var s = Math.sin(angle);
	this.m00 = 1.0;
	this.m01 = 0.0;
	this.m02 = 0.0;
	this.m10 = 0.0;
	this.m11 = c;
	this.m12 = -s;
	this.m20 = 0.0;
	this.m21 = s;
	this.m22 = c;
}

tm.M3.prototype.rotY = function(angle) {
	var c = Math.cos(angle);
	var s = Math.sin(angle);
	this.m00 = c;
	this.m01 = 0.0;
	this.m02 = s;
	this.m10 = 0.0;
	this.m11 = 1.0;
	this.m12 = 0.0;
	this.m20 = -s;
	this.m21 = 0.0;
	this.m22 = c;
}  

tm.M3.prototype.mul = function(m) {
	var m2 = this;
	this.set(m.m00 * m2.m00 + m.m01 * m2.m10 + m.m02 * m2.m20, m.m00 * m2.m01 + m.m01 * m2.m11 + m.m02 * m2.m21, m.m00 * m2.m02 + m.m01 * m2.m12 + m.m02 * m2.m22, m.m10 * m2.m00 + m.m11 * m2.m10 + m.m12 * m2.m20, m.m10 * m2.m01 + m.m11 * m2.m11 + m.m12 * m2.m21, m.m10 * m2.m02 + m.m11 * m2.m12 + m.m12 * m2.m22, m.m20 * m2.m00 + m.m21 * m2.m10 + m.m22 * m2.m20, m.m20 * m2.m01 + m.m21 * m2.m11 + m.m22 * m2.m21, m.m20 * m2.m02 + m.m21 * m2.m12 + m.m22 * m2.m22);
}

tm._pi2 = 2*Math.PI;
tm.deg_per_radian = 180 / Math.PI;
tm._z3 = [0,0,0];
tm._temp1 = [0,0,0];
tm._temp2 = [0,0,0];
tm._temp = {};
tm._m3 = new tm.M3();

})(Jmol._TMApplet);
