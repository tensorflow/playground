// JSmolGLmol.js -- Jmol GLmol  extension	 author: Bob Hanson, hansonr@stolaf.edu	4/16/2012
//                                                       biochem_fan 6/12/2012

// BH 2/9/2014 6:34:17 PM updated for integration of org.jmol.exportjs into org.jmol.export

// This library requires
//
//  JSmol.min.js
//  JSmolThree.js
//
// prior to JmolGlmol.js

/*

BH: added drawSphere and getMat methods


 GLmol - Molecular Viewer on WebGL/Javascript (0.44)
	(C) Copyright 2011-2012, biochem_fan
		License: dual license of MIT or LGPL3

	 This program uses
		Three.js 
			https://github.com/mrdoob/three.js
			Copyright (c) 2010-2012 three.js Authors. All rights reserved.
		jQuery
			http://jquery.org/
			Copyright (c) 2011 John Resig

	// ParseXYZ by Bob Hanson hansonr@stolaf.edu 6/12/2012

 */

(function(THREE) {
// Workaround for Intel GMA series (gl_FrontFacing causes compilation error)
THREE.ShaderLib.lambert.fragmentShader = THREE.ShaderLib.lambert.fragmentShader.replace("gl_FrontFacing", "true");
THREE.ShaderLib.lambert.vertexShader = THREE.ShaderLib.lambert.vertexShader.replace(/\}$/, "#ifdef DOUBLE_SIDED\n if (transformedNormal.z < 0.0) vLightFront = vLightBack;\n #endif\n }");
})(THREE);


;(function(Jmol) {

Jmol._Canvas3D = function(id, Info, type, checkOnly){
	this._uniqueId = ("" + Math.random()).substring(3);
	this._id = id;
	this._is2D = false;
	this._isJava = false;
  this._rendered = false;
	this._jmolType = "Jmol._Canvas3D (Jmol/GLmol)";
	this._platform = "J.awtjs.Platform";
	if (checkOnly)
		return this;
	window[id] = this;
	this._createCanvas(id, Info, new Jmol.GLmol);
	if (!Jmol._document || this._deferApplet)
		return this;
	this._init();
	return this;
};

Jmol.GLmol = function() {
	return this;
};

;(function(GLmol) {


GLmol.extendApplet = function(applet) {

	applet._refresh = function() {
	
		// Called by org.jmol.Viewer.viewer.refresh
			
		// pixelsPerAngstrom can be used to calculate the new camera position.
		// modelRadius is half the distance across the screen. 
		// 100% implies that camera Z position is 3.5 * modelRadius, with a field of view of 16.24 degrees (2 * atan(1/7))
		
		if (!this._applet)
			return
			
		var view = this._applet.getGLmolView();
		var gl = this._GLmol;
		var rg = gl.rotationGroup;
		if (!rg)
			return
		var mg = gl.modelGroup;
		var rQ = view.quaternion;
		rg.quaternion = new THREE.Quaternion(-rQ.q3, -rQ.q0, rQ.q1, rQ.q2);
		// cameraDistance is in units of screenPixelCount; distance is to front of scene, not to the center.
		// scaled linearly by zoom
		var sppa = view.scale;
		rg.position.z = gl.CAMERA_Z + (view.cameraDistance+view.pixelCount*0.5)/sppa;
		//model "position" is moved such that {0 0 0} is the fixedRotationCenter 
		mg.position.x = -view.center.x; 
		mg.position.y = -view.center.y;
		mg.position.z = -view.center.z; 
		//there is also the fixedTranslation to worry about (from CTRL-ALT-drag)
		if (view.perspective) {
			gl.camera = gl.perspectiveCamera;
			gl.camera.fov = gl.fov;
		} else {
			gl.camera = gl.orthoscopicCamera;
			gl.camera.right = view.width * 0.5 / sppa;
			gl.camera.left = -gl.camera.right;
			gl.camera.top = view.height * 0.5 / sppa;
			gl.camera.bottom = -gl.camera.top;
		}
		gl.camera.updateProjectionMatrix();
		var me = this;
		requestAnimationFrame(function() {me._GLmol.show();});
	}
	return applet;
}

GLmol.extendJSExporter = function(exporter){

	// This method will be called just after org.jmol.export.JSExporter has loaded,
	//  as one of its static calls.  
	
	// exporter is org.jmol.export.JSExporter.protothpe
	
	// What we are doing here is overriding methods of org.jmol.export.JSExporter.
	// These methods are called by that general class and implemened here usring
	// GLmol and THREE.  
	
				
	exporter.jsInitExport = function(applet) {
		applet._GLmol.initializeJmolExport();
	}

	exporter.jsSphere = function(applet, id, found, pt, o) {
		applet._GLmol.addJmolSphere(pt, o[0], o[1]);
	}
	exporter.jsCylinder = function(applet, id, found, pt1, pt2, o) {
		applet._GLmol.addJmolCylinder(pt1, pt2, o[0], o[1], o[2])
	}

	exporter.jsTriangle = function(applet, color, pt1, pt2, pt3) {
		applet._GLmol.addJmolTriangle(color, pt1, pt2, pt3)
	}

	exporter.jsEndExport = function(applet) {
		applet._GLmol.finalizeJmolExport();
		applet._refresh();
	}

	exporter.jsSurface = function(applet, vertices, normals, indices, 
			nVertices, nPolygons, nFaces, bsPolygons, faceVertexMax,
			color, vertexColors, polygonColors) {
	// notes: Color is only used if both vertexColors and polygonColors are null.
	//        Only one of vertexColors or polygonColors will NOT be null.
	//        Int facevertexMax is either 3 or 4; indices may have MORE than that number
	//        of vertex indices, because the last one may be a flag indicating which 
	//        edges to display when just showing mesh edges. When there are quadrilaterals,
	//        then nPolygons != nFaces, and you need to create both 3-sides and 4-sided faces
	//				based on the length of the individual indices[i] array.  

	// nFaces was determined as follows:

	//    boolean isAll = (bsPolygons == null);
	//    if (isAll) {
	//      for (int i = nPolygons; --i >= 0;)
	//        nFaces += (faceVertexMax == 4 && indices[i].length == 4 ? 2 : 1);    
	//    } else {
	//      for (int i = bsPolygons.nextSetBit(0); i >= 0; i = bsPolygons.nextSetBit(i + 1))
	//        nFaces += (faceVertexMax == 4 && indices[i].length == 4 ? 2 : 1);      


		var params = {};
		if (vertexColors != null) {
			params.vertexColors = THREE.VertexColors;
			var vc = new Array(vertexColors.length);
			for (var i = vertexColors.length; --i >= 0;)
				vc[i] = new THREE.Color(vertexColors[i]);
		} else if (polygonColors != null) {
			params.vertexColors = THREE.FaceColors;
		} else {
			params.color = color;
		}
		var geo = new THREE.Geometry();
		for (var i = 0; i < nVertices; i++)
			geo.vertices.push(new THREE.Vector3(vertices[i].x, vertices[i].y, vertices[i].z));
		for (var i = 0; i < nPolygons; i++) {
			var h = indices[i][0], k = indices[i][1], l = indices[i][2];
			var m = indices[i][3];
			var is3 = (faceVertexMax == 3 || indices[i].length == 3);
			var f = (is3 ? new THREE.Face3(h, k, l) : new THREE.Face4(h, k, l, m));
			// we can use the normals themselves, because they have .x .y .z
			f.vertexNormals[0] = normals[h];
			f.vertexNormals[1] = normals[k];
			f.vertexNormals[2] = normals[l];
			if (is3) {
				if (vertexColors != null)
					f.vertexColors = [vc[h], vc[k], vc[l]];
			} else {
				f.vertexNormals[3] = normals[m];
			}

			if (polygonColors != null)
				f.color = new THREE.Color(polygonColors[i]);
			geo.faces.push(f);
		}

		var obj = new THREE.Mesh(geo, new THREE.MeshLambertMaterial(params));
		obj.doubleSided = true; // generally?
	  //obj.material.wireframe = true;
		applet._GLmol.modelGroup.add(obj);
	}

}

GLmol.getMat = function(me, color) {
	if (!me._mat || me._matColor != color) {
		me._matColor = color;
		me._mat = new THREE.MeshLambertMaterial({color: color, specular:0xFFFFFF });
	}
	return me._mat;
};

GLmol.setPt = function(p,q) {p.x = q.x;p.y=q.y;p.z=q.z;};


// The GLmol object is defined by the following functions: 

;(function(gp){

gp.create = function() {
	this.container = Jmol.$(this.applet, "appletdiv");
	this.WIDTH = this.container.width(), this.HEIGHT = this.container.height();
	this.ASPECT = this.WIDTH / this.HEIGHT;
	this.NEAR = 1, FAR = 800;
	this.CAMERA_Z = -150;

	this.applet.aaScale = 2;
	this.renderer = new THREE.WebGLRenderer({
    antialias: true,
    preserveDrawingBuffer: true 
  });
	var canvas = this.renderer.domElement;
	canvas.width = this.container.width();
	canvas.height = this.container.height();
	canvas.applet = this.applet;
	Jmol._jsSetMouse(canvas);
	this.applet._canvas = canvas;
	canvas.style.width = "100%";
	canvas.style.height = "100%";
	canvas.id = this.id+"_canvas";
	this.container.append(canvas);
	this.renderer.setSize(this.WIDTH * this.applet.aaScale, this.HEIGHT * this.applet.aaScale); // fake of full scene antialiasing
	this.renderer.sortObjects = false; // hopefully improve performance
	this.camera = new THREE.PerspectiveCamera(16.26, this.ASPECT, 1, 800); // will be updated anyway
	this.camera.position = new THREE.Vector3(0, 0, this.CAMERA_Z);
	this.camera.lookAt(new THREE.Vector3(0, 0, 0));
	this.perspectiveCamera = this.camera;
	this.orthoscopicCamera = new THREE.OrthographicCamera();
	this.orthoscopicCamera.position.z = this.CAMERA_Z;
	this.orthoscopicCamera.lookAt(new THREE.Vector3(0, 0, 0));

	var me = this;
	Jmol.$resize(function() { // only window can capture resize event
		me.WIDTH = me.container.width();
		me.HEIGHT = me.container.height();
		me.ASPECT = me.WIDTH / me.HEIGHT;
		me.renderer.setSize(me.WIDTH, me.HEIGHT);
		me.camera.aspect = me.ASPECT;
		me.camera.updateProjectionMatrix();
		me.show();
	});

	this.scene = null;
	this.rotationGroup = null; // which contains modelGroup
	this.modelGroup = null;

	this.bgColor = 0x000000;
	this.fov = 16.26;
	this.fogStart = 0.4;
	this.slabNear = -50; // relative to the center of rotationGroup
	this.slabFar = 50;

	// Default values
	this.sphereQuality = 16; //16;
	this.cylinderQuality = 16; //8;
 
};

gp.getView = function() {
	if (!this.modelGroup) return [0, 0, 0, 0, 0, 0, 0, 1];
	var pos = this.modelGroup.position;
	var q = this.rotationGroup.quaternion;
	return [pos.x, pos.y, pos.z, this.rotationGroup.position.z, q.x, q.y, q.z, q.w];
};

gp.setView = function(arg) {
	if (!this.modelGroup || !this.rotationGroup) return;
	this.modelGroup.position.x = arg[0];
	this.modelGroup.position.y = arg[1];
	this.modelGroup.position.z = arg[2];
	this.rotationGroup.position.z = arg[3];
	this.rotationGroup.quaternion.x = arg[4];
	this.rotationGroup.quaternion.y = arg[5];
	this.rotationGroup.quaternion.z = arg[6];
	this.rotationGroup.quaternion.w = arg[7];
	this.show();
};

gp.setBackground = function(hex, a) {
	a = a | 1.0;
	this.bgColor = hex;
	this.renderer.setClearColorHex(hex, a);
	this.scene.fog.color = new THREE.Color(hex);
};

gp.setupLights = function(scene) {
	var directionalLight =  new THREE.DirectionalLight(0xFFFFFF);
	directionalLight.position = new THREE.Vector3(1, 1, -2.5).normalize();
	directionalLight.intensity = 1.0;
	scene.add(directionalLight);
	var ambientLight = new THREE.AmbientLight(0x101010);
	scene.add(ambientLight);
};

gp.setSlabAndFog = function() {
	var center = this.rotationGroup.position.z - this.camera.position.z;
	if (center < 1) center = 1;
	this.camera.near = center + this.slabNear;
	if (this.camera.near < 1) this.camera.near = 1;
	this.camera.far = center + this.slabFar;
	if (this.camera.near + 1 > this.camera.far) this.camera.far = this.camera.near + 1;
	this.scene.fog.near = this.camera.near + this.fogStart * (this.camera.far - this.camera.near);
//   if (this.scene.fog.near > center) this.scene.fog.near = center;
	this.scene.fog.far = this.camera.far;
	this.camera.updateProjectionMatrix();
};

gp.initializeScene = function() {
	// CHECK: Should I explicitly call scene.deallocateObject?
	this.scene = new THREE.Scene();
	this.scene.fog = new THREE.Fog(this.bgColor, 100, 200);

	this.modelGroup = new THREE.Object3D();
	this.rotationGroup = new THREE.Object3D();
	this.rotationGroup.useQuaternion = true;
	this.rotationGroup.quaternion = new THREE.Quaternion(0, -1, 0, 0); // was 1 0 0 0
	this.rotationGroup.add(this.modelGroup);

	this.scene.add(this.rotationGroup);
	this.setupLights(this.scene);
};

gp.show = function() {
	if (!this.scene) return;
	var time = new Date();
	this.setSlabAndFog();
	this.renderer.render(this.scene, this.camera);
  if (!this._rendered) {
    this._rendered = true;
    Jmol._hideLoadingSpinner(this.applet);
  }
	//console.log("rendered in " + (+new Date() - time) + "ms");
};

gp.initializeJmolExport = function() {
	this._view = this.getView();
	this.initializeScene();
	this.tpt1 = new THREE.Vector3();
	this.tpt2 = new THREE.Vector3();
	this._m = new THREE.Matrix4();
	this._geoTriangles = null;	
	if (!this.sphereGeometry) {
		this.sphereGeometry = new THREE.SphereGeometry(1, this.sphereQuality, this.sphereQuality); // r, seg, ring
		this.sphereGeometry0 = new THREE.SphereGeometry(1, this.sphereQuality / 4, this.sphereQuality / 4); // r, seg, ring
		var cg = this.cylinderGeometry = {};
		cg['c'] = new THREE.CylinderGeometry(1, 1, 1, this.cylinderQuality, 1, true);
		cg['c'].faceUvs = [];
		cg['c'].faceVertexUvs = [];
		cg['c0'] = new THREE.CylinderGeometry(1, 1, 1, this.cylinderQuality/4, 1, true);
		cg['c0'].faceUvs = [];
		cg['c0'].faceVertexUvs = [];
		cg['n'] = new THREE.CylinderGeometry(1, 1, 1, this.cylinderQuality, 1, false);
		cg['n'].faceUvs = [];
		cg['n'].faceVertexUvs = [];
		cg['n0'] = new THREE.CylinderGeometry(1, 1, 1, this.cylinderQuality/4, 1, false);
		cg['n0'].faceUvs = [];
		cg['n0'].faceVertexUvs = [];
	}
};

gp.drawSphere = function(group, pt, color, radius) {
	var isRough = (radius < 0.05); // typical mesh dot
	var geom = (isRough ? this.sphereGeometry0 : this.sphereGeometry);
	var sphere = new THREE.Mesh(geom, GLmol.getMat(this, color));
	group.add(sphere);
	sphere.scale.x = sphere.scale.y = sphere.scale.z = radius;
	sphere.position.x = pt.x;
	sphere.position.y = pt.y;
	sphere.position.z = pt.z;
}

gp.addJmolSphere = function(pt, color, radius) {
	this.drawSphere(this.modelGroup, pt, color, radius);
}

gp.addJmolCylinder = function(pt1, pt2, color, length, radius) {
	GLmol.setPt(this.tpt1,pt1);
	GLmol.setPt(this.tpt2,pt2);
	this.drawCylinder(this.modelGroup, this.tpt1, this.tpt2, 0 + radius, color, true);
};

gp.addJmolTriangle = function(color, pt1, pt2, pt3) {
	var geo = this._geoTriangles;
	if (!geo)
		geo = this._geoTriangles = new THREE.Geometry();
	var n = geo.vertices.length;
	geo.vertices.push(new THREE.Vector3(pt1.x, pt1.y, pt1.z));	
	geo.vertices.push(new THREE.Vector3(pt2.x, pt2.y, pt2.z));	
	geo.vertices.push(new THREE.Vector3(pt3.x, pt3.y, pt3.z));	
	var f = new THREE.Face3(n, n+1, n+2, null, new THREE.Color(color));
	geo.faces.push(f);
};

gp.finalizeJmolExport = function() {	

	if (this._geoTriangles) {
		var geo = this._geoTriangles;
		geo.computeFaceNormals();
		var params = {vertexColors: THREE.FaceColors};
		var obj = new THREE.Mesh(geo, new THREE.MeshLambertMaterial(params));
		obj.doubleSided = true; // generally?
//			    obj.material.wireframe = true;
		this.modelGroup.add(obj);
	}
	this.setView(this._view);
};

gp.drawCylinder = function(group, from, to, radius, color, cap) {
	if (!from || !to) return;

	midpoint = new THREE.Vector3().add(from, to).multiplyScalar(0.5);

	var isRough = (radius < 0.05);
	var geom = this.cylinderGeometry[(cap ? "c" : "n") + (isRough ? "0" : "")];
	var cylinder = new THREE.Mesh(geom, GLmol.getMat(this, color));
	cylinder.position = midpoint;
	cylinder.lookAt(from);
	cylinder.updateMatrix();
	cylinder.matrixAutoUpdate = false;
	cylinder.matrix.multiplySelf(this._m.makeScale(radius, radius, from.distanceTo(to)).rotateX(Math.PI / 2));
	group.add(cylinder);
};

})(GLmol.prototype);

})(Jmol.GLmol);

})(Jmol);

 