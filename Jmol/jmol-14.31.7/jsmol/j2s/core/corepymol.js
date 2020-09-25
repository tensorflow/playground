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
Clazz_declarePackage ("J.api");
Clazz_declareInterface (J.api, "JmolSceneGenerator");
Clazz_declarePackage ("J.adapter.readers.pymol");
Clazz_load (["java.util.Hashtable", "JU.Lst"], "J.adapter.readers.pymol.PickleReader", ["java.lang.Double", "$.Long", "JU.AU", "JU.Logger"], function () {
c$ = Clazz_decorateAsClass (function () {
this.vwr = null;
this.binaryDoc = null;
this.stack = null;
this.marks = null;
this.build = null;
this.memo = null;
this.logging = false;
this.id = 0;
this.markCount = 0;
this.filePt = 0;
this.emptyListPt = 0;
this.thisSection = null;
this.inMovie = false;
this.inNames = false;
this.thisName = null;
this.lastMark = 0;
this.retrieveCount = 0;
this.ipt = 0;
this.aTemp = null;
Clazz_instantialize (this, arguments);
}, J.adapter.readers.pymol, "PickleReader");
Clazz_prepareFields (c$, function () {
this.stack =  new JU.Lst ();
this.marks =  new JU.Lst ();
this.build =  new JU.Lst ();
this.memo =  new java.util.Hashtable ();
this.aTemp =  Clazz_newByteArray (16, 0);
});
Clazz_makeConstructor (c$, 
function (doc, vwr) {
this.binaryDoc = doc;
this.vwr = vwr;
this.stack.ensureCapacity (1000);
}, "javajs.api.GenericBinaryDocument,JV.Viewer");
Clazz_defineMethod (c$, "log", 
 function (s) {
this.vwr.log (s + "\0");
}, "~S");
Clazz_defineMethod (c$, "getMap", 
function (logging) {
this.logging = logging;
var b;
var i;
var mark;
var d;
var o;
var a;
var map;
var l;
this.ipt = 0;
var going = true;
while (going) {
b = this.binaryDoc.readByte ();
this.ipt++;
switch (b) {
case 125:
this.push ( new java.util.Hashtable ());
break;
case 97:
o = this.pop ();
(this.peek ()).addLast (o);
break;
case 101:
l = this.getObjects (this.getMark ());
if (this.inNames && this.markCount == 2) {
var pt = this.binaryDoc.getPosition ();
var l2 =  new JU.Lst ();
l2.addLast (Integer.$valueOf (this.filePt));
l2.addLast (Integer.$valueOf (pt - this.filePt));
l.addLast (l2);
}(this.peek ()).addAll (l);
break;
case 71:
d = this.binaryDoc.readDouble ();
this.push (Double.$valueOf (d));
break;
case 74:
i = this.binaryDoc.readIntLE ();
this.push (Integer.$valueOf (i));
break;
case 75:
i = this.binaryDoc.readByte () & 0xff;
this.push (Integer.$valueOf (i));
break;
case 77:
i = (this.binaryDoc.readByte () & 0xff | ((this.binaryDoc.readByte () & 0xff) << 8)) & 0xffff;
this.push (Integer.$valueOf (i));
break;
case 113:
i = this.binaryDoc.readByte ();
this.putMemo (i, false);
break;
case 114:
i = this.binaryDoc.readIntLE ();
this.putMemo (i, true);
break;
case 104:
i = this.binaryDoc.readByte ();
o = this.getMemo (i);
this.push (o == null ? "BINGET" + (++this.id) : o);
break;
case 106:
i = this.binaryDoc.readIntLE ();
o = this.getMemo (i);
this.push (o == null ? "LONG_BINGET" + (++this.id) : o);
break;
case 85:
i = this.binaryDoc.readByte () & 0xff;
a =  Clazz_newByteArray (i, 0);
this.binaryDoc.readByteArray (a, 0, i);
if (this.inNames && this.markCount == 3 && this.lastMark == this.stack.size ()) {
this.thisName = this.bytesToString (a);
this.filePt = this.emptyListPt;
}this.push (a);
break;
case 84:
i = this.binaryDoc.readIntLE ();
a =  Clazz_newByteArray (i, 0);
this.binaryDoc.readByteArray (a, 0, i);
this.push (a);
break;
case 88:
i = this.binaryDoc.readIntLE ();
a =  Clazz_newByteArray (i, 0);
this.binaryDoc.readByteArray (a, 0, i);
this.push (a);
break;
case 93:
this.emptyListPt = this.binaryDoc.getPosition () - 1;
this.push ( new JU.Lst ());
break;
case 99:
l =  new JU.Lst ();
l.addLast ("global");
l.addLast (this.readStringAsBytes ());
l.addLast (this.readStringAsBytes ());
this.push (l);
break;
case 98:
o = this.pop ();
this.build.addLast (o);
break;
case 40:
this.putMark (this.stack.size ());
break;
case 78:
this.push (null);
break;
case 111:
this.push (this.getObjects (this.getMark ()));
break;
case 115:
o = this.pop ();
var s = this.bytesToString (this.pop ());
(this.peek ()).put (s, o);
break;
case 117:
mark = this.getMark ();
l = this.getObjects (mark);
o = this.peek ();
if (Clazz_instanceOf (o, JU.Lst)) {
for (i = 0; i < l.size (); i++) {
var oo = l.get (i);
(o).addLast (oo);
}
} else {
map = o;
for (i = l.size (); --i >= 0; ) {
o = l.get (i);
var key = this.bytesToString (l.get (--i));
map.put (key, o);
}
}break;
case 46:
going = false;
break;
case 116:
this.push (this.getObjects (this.getMark ()));
break;
case 76:
var val =  String.instantialize (this.readStringAsBytes ());
if (val != null && val.endsWith ("L")) {
val = val.substring (0, val.length - 1);
}this.push (Long.$valueOf (val));
break;
case 82:
this.pop ();
break;
case 73:
s = this.bytesToString (this.readStringAsBytes ());
try {
this.push (Integer.$valueOf (Integer.parseInt (s)));
} catch (e) {
if (Clazz_exceptionOf (e, Exception)) {
var ll = Long.parseLong (s);
this.push (Integer.$valueOf ((ll & 0xFFFFFFFF)));
} else {
throw e;
}
}
break;
case 41:
this.push ( new JU.Lst ());
break;
default:
JU.Logger.error ("Pickle reader error: " + b + " " + this.binaryDoc.getPosition ());
}
}
if (logging) this.log ("");
JU.Logger.info ("PyMOL Pickle reader cached " + this.memo.size () + " tokens; retrieved " + this.retrieveCount);
map = this.stack.removeItemAt (0);
if (map.size () == 0) for (i = this.stack.size (); --i >= 0; ) {
o = this.stack.get (i--);
a = this.stack.get (i);
map.put (this.bytesToString (a), o);
}
this.memo = null;
return map;
}, "~B");
Clazz_defineMethod (c$, "bytesToString", 
 function (o) {
try {
return (JU.AU.isAB (o) ?  String.instantialize (o, "UTF-8") : o.toString ());
} catch (e) {
if (Clazz_exceptionOf (e, java.io.UnsupportedEncodingException)) {
return "";
} else {
throw e;
}
}
}, "~O");
Clazz_defineMethod (c$, "putMemo", 
 function (i, doCheck) {
var o = this.peek ();
if (JU.AU.isAB (o)) o = this.bytesToString (o);
if (Clazz_instanceOf (o, String)) {
this.memo.put (Integer.$valueOf (i), o);
}}, "~N,~B");
Clazz_defineMethod (c$, "getMemo", 
 function (i) {
var o = this.memo.get (Integer.$valueOf (i));
if (o == null) return o;
this.retrieveCount++;
return o;
}, "~N");
Clazz_defineMethod (c$, "getObjects", 
 function (mark) {
var n = this.stack.size () - mark;
var args =  new JU.Lst ();
args.ensureCapacity (n);
for (var i = mark; i < this.stack.size (); ++i) {
var oo = this.stack.get (i);
args.addLast (oo);
}
for (var i = this.stack.size (); --i >= mark; ) this.stack.removeItemAt (i);

return args;
}, "~N");
Clazz_defineMethod (c$, "readStringAsBytes", 
 function () {
var n = 0;
var a = this.aTemp;
while (true) {
var b = this.binaryDoc.readByte ();
if (b == 0xA) break;
if (n >= a.length) a = this.aTemp = JU.AU.arrayCopyByte (a, a.length * 2);
a[n++] = b;
}
return JU.AU.arrayCopyByte (a, n);
});
Clazz_defineMethod (c$, "putMark", 
 function (i) {
if (this.logging) this.log ("\n " + Integer.toHexString (this.binaryDoc.getPosition ()) + " [");
this.marks.addLast (Integer.$valueOf (this.lastMark = i));
this.markCount++;
switch (this.markCount) {
case 2:
var o = this.stack.get (i - 2);
if (JU.AU.isAB (o)) {
this.thisSection = this.bytesToString (o);
this.inMovie = "movie".equals (this.thisSection);
this.inNames = "names".equals (this.thisSection);
}break;
default:
break;
}
}, "~N");
Clazz_defineMethod (c$, "getMark", 
 function () {
return this.marks.removeItemAt (--this.markCount).intValue ();
});
Clazz_defineMethod (c$, "push", 
 function (o) {
if (this.logging && (Clazz_instanceOf (o, String) || Clazz_instanceOf (o, Double) || Clazz_instanceOf (o, Integer))) this.log ((Clazz_instanceOf (o, String) ? "'" + o + "'" : o) + ", ");
this.stack.addLast (o);
}, "~O");
Clazz_defineMethod (c$, "peek", 
 function () {
return this.stack.get (this.stack.size () - 1);
});
Clazz_defineMethod (c$, "pop", 
 function () {
return this.stack.removeItemAt (this.stack.size () - 1);
});
Clazz_defineStatics (c$,
"APPEND", 97,
"APPENDS", 101,
"BINFLOAT", 71,
"BININT", 74,
"BININT1", 75,
"BININT2", 77,
"BINPUT", 113,
"BINSTRING", 84,
"BINUNICODE", 88,
"BUILD", 98,
"EMPTY_DICT", 125,
"EMPTY_LIST", 93,
"GLOBAL", 99,
"LONG_BINPUT", 114,
"MARK", 40,
"NONE", 78,
"OBJ", 111,
"SETITEM", 115,
"SETITEMS", 117,
"SHORT_BINSTRING", 85,
"STOP", 46,
"BINGET", 104,
"LONG_BINGET", 106,
"TUPLE", 116,
"INT", 73,
"EMPTY_TUPLE", 41,
"LONG", 76,
"REDUCE", 82);
});
Clazz_declarePackage ("J.api");
Clazz_declareInterface (J.api, "PymolAtomReader");
Clazz_declarePackage ("J.adapter.readers.pymol");
Clazz_load (["java.util.Hashtable"], "J.adapter.readers.pymol.PyMOL", ["JU.Logger"], function () {
c$ = Clazz_declareType (J.adapter.readers.pymol, "PyMOL");
c$.getRGB = Clazz_defineMethod (c$, "getRGB", 
function (color) {
if (J.adapter.readers.pymol.PyMOL.moreColors != null) {
var key = Integer.$valueOf (color);
var c = J.adapter.readers.pymol.PyMOL.moreColors.get (key);
if (c != null) return c.intValue ();
}if (color < J.adapter.readers.pymol.PyMOL.colors.length) return (J.adapter.readers.pymol.PyMOL.colors[color]);
return 0;
}, "~N");
c$.addColor = Clazz_defineMethod (c$, "addColor", 
function (id, value) {
J.adapter.readers.pymol.PyMOL.moreColors.put (id, Integer.$valueOf (value));
}, "Integer,~N");
c$.getDefaultSetting = Clazz_defineMethod (c$, "getDefaultSetting", 
function (i, pymolVersion) {
switch (i) {
case 173:
case 236:
case 570:
case 235:
case 526:
case 210:
case 376:
case 144:
case 574:
case 146:
case 378:
case 530:
case 531:
case 532:
case 156:
return -1;
case 327:
case 569:
case 155:
case 90:
case 448:
case 214:
case 194:
case 193:
case 84:
case 88:
case 111:
case 529:
case 19:
return 1;
case 172:
case 571:
case 666:
case 524:
case 279:
case 198:
case 138:
case 6:
case 180:
case 143:
case 338:
case 49:
case 64:
case 441:
case 118:
case 581:
case 749:
case 23:
case 20:
case 237:
case 203:
case 344:
return 0;
case 92:
return 0.2;
case 96:
return 1.4;
case 65:
return 0.25;
case 192:
return 0.45;
case 453:
return 14;
case 66:
return -6;
case 328:
return 5;
case 213:
case 382:
case 431:
return 2;
case 361:
case 380:
return 4;
case 377:
return 0.4;
case 379:
return 0.6;
case 381:
return 1.5;
case 103:
return 0.5;
case 4:
return 1.4;
case 107:
return 2.5;
case 44:
return 1.49;
case 106:
return 3;
case 152:
return 20;
case 550:
return 30;
case 21:
return 0.25;
case 100:
return 1.2;
case 101:
return 0.25;
default:
JU.Logger.error ("PyMOL " + pymolVersion + " default float setting not found: " + i);
return 0;
}
}, "~N,~N");
c$.getDefaultSettingPt = Clazz_defineMethod (c$, "getDefaultSettingPt", 
function (i, pymolVersion, pt) {
switch (i) {
case 471:
pt.set (0, 0, 0.75);
break;
default:
JU.Logger.error ("PyMOL " + pymolVersion + " default point setting not found: " + i);
break;
}
return pt;
}, "~N,~N,JU.P3");
c$.getDefaultSettingS = Clazz_defineMethod (c$, "getDefaultSettingS", 
function (i, pymolVersion) {
switch (i) {
case 342:
break;
default:
JU.Logger.info ("PyMOL " + pymolVersion + " does not have String setting " + i);
break;
}
return "";
}, "~N,~N");
c$.getVArray = Clazz_defineMethod (c$, "getVArray", 
function (version) {
var va = null;
var varray = null;
switch (version) {
case 176:
va = J.adapter.readers.pymol.PyMOL.v176;
break;
case 177:
va = J.adapter.readers.pymol.PyMOL.v177;
break;
case 181:
va = J.adapter.readers.pymol.PyMOL.v181;
break;
}
if (va != null) {
varray =  Clazz_newIntArray (60, 0);
for (var i = 0; i < va.length; ) varray[va[i++]] = va[i++];

}return varray;
}, "~N");
c$.getVArrayB = Clazz_defineMethod (c$, "getVArrayB", 
function (version) {
var va = null;
var varray = null;
switch (version) {
case 176:
va = J.adapter.readers.pymol.PyMOL.v176b;
break;
case 177:
va = J.adapter.readers.pymol.PyMOL.v177b;
break;
case 181:
va = J.adapter.readers.pymol.PyMOL.v181b;
break;
}
if (va != null) {
varray =  Clazz_newIntArray (10, 0);
for (var i = 0; i < va.length; ) varray[va[i++]] = va[i++];

}return varray;
}, "~N");
Clazz_defineStatics (c$,
"OBJECT_SELECTION", -1,
"OBJECT_MOLECULE", 1,
"OBJECT_MAPDATA", 2,
"OBJECT_MAPMESH", 3,
"OBJECT_MEASURE", 4,
"OBJECT_CALLBACK", 5,
"OBJECT_CGO", 6,
"OBJECT_SURFACE", 7,
"OBJECT_GADGET", 8,
"OBJECT_CALCULATOR", 9,
"OBJECT_SLICE", 10,
"OBJECT_ALIGNMENT", 11,
"OBJECT_GROUP", 12);
c$.REP_LIST = c$.prototype.REP_LIST =  Clazz_newArray (-1, ["sticks", "spheres", "surface", "labels", "nb_spheres", "cartoon", "ribbon", "lines", "mesh", "dots", "dashes", "nonbonded", "cell", "cgo", "callback", "extent", "slice", "angles", "dihedrals", "ellipsoid", "volume"]);
Clazz_defineStatics (c$,
"REP_STICKS", 0,
"REP_SPHERES", 1,
"REP_SURFACE", 2,
"REP_LABELS", 3,
"REP_NBSPHERES", 4,
"REP_CARTOON", 5,
"REP_RIBBON", 6,
"REP_LINES", 7,
"REP_MESH", 8,
"REP_DOTS", 9,
"REP_DASHES", 10,
"REP_NONBONDED", 11,
"REP_CELL", 12,
"REP_CGO", 13,
"REP_CALLBACK", 14,
"REP_EXTENT", 15,
"REP_SLICE", 16,
"REP_ANGLES", 17,
"REP_DIHEDRALS", 18,
"REP_ELLIPSOID", 19,
"REP_VOLUME", 20,
"REP_MAX", 21,
"REP_JMOL_TRACE", 21,
"REP_JMOL_PUTTY", 22,
"REP_JMOL_MAX", 23,
"FLAG_exfoliate", 0x01000000,
"FLAG_ignore", 0x02000000,
"FLAG_no_smooth", 0x04000000,
"FLAG_polymer", 0x08000000,
"FLAG_solvent", 0x10000000,
"FLAG_organic", 0x20000000,
"FLAG_inorganic", 0x40000000);
c$.FLAG_NOSURFACE = c$.prototype.FLAG_NOSURFACE = J.adapter.readers.pymol.PyMOL.FLAG_ignore | J.adapter.readers.pymol.PyMOL.FLAG_exfoliate;
Clazz_defineStatics (c$,
"active_selections", 351,
"alignment_as_cylinders", 692,
"all_states", 49,
"ambient", 7,
"ambient_occlusion_mode", 702,
"ambient_occlusion_scale", 703,
"ambient_occlusion_smooth", 704,
"anaglyph_mode", 706,
"angle_color", 575,
"angle_label_position", 406,
"angle_size", 405,
"animation", 388,
"animation_duration", 389,
"antialias", 12,
"async_builds", 506,
"ati_bugs", 585,
"atom_name_wildcard", 413,
"atom_type_format", 660,
"auto_classify_atoms", 360,
"auto_color", 238,
"auto_color_next", 239,
"auto_copy_images", 557,
"auto_defer_atom_count", 653,
"auto_defer_builds", 567,
"auto_dss", 323,
"auto_hide_selections", 79,
"auto_indicate_flags", 147,
"auto_number_selections", 443,
"auto_overlay", 603,
"auto_remove_hydrogens", 158,
"auto_rename_duplicate_objects", 561,
"auto_sculpt", 162,
"auto_show_lines", 51,
"auto_show_nonbonded", 72,
"auto_show_selections", 78,
"auto_show_spheres", 420,
"auto_zoom", 60,
"autoclose_dialogs", 661,
"backface_cull", 75,
"batch_prefix", 187,
"bg_gradient", 662,
"bg_image_filename", 712,
"bg_image_mode", 713,
"bg_image_tilesize", 714,
"bg_image_linear", 715,
"bg_rgb", 6,
"bg_rgb_bottom", 664,
"bg_rgb_top", 663,
"bonding_vdw_cutoff", 0,
"button_mode", 63,
"button_mode_name", 330,
"cache_display", 73,
"cache_frames", 31,
"cache_max", 578,
"cache_memory", 264,
"cache_mode", 573,
"cartoon_color", 236,
"cartoon_cylindrical_helices", 180,
"cartoon_debug", 105,
"cartoon_discrete_colors", 125,
"cartoon_dumbbell_length", 115,
"cartoon_dumbbell_radius", 117,
"cartoon_dumbbell_width", 116,
"cartoon_fancy_helices", 118,
"cartoon_fancy_sheets", 119,
"cartoon_flat_cycles", 260,
"cartoon_flat_sheets", 113,
"cartoon_helix_radius", 181,
"cartoon_highlight_color", 241,
"cartoon_ladder_color", 450,
"cartoon_ladder_mode", 448,
"cartoon_ladder_radius", 449,
"cartoon_loop_cap", 432,
"cartoon_loop_quality", 93,
"cartoon_loop_radius", 92,
"cartoon_nucleic_acid_as_cylinders", 693,
"cartoon_nucleic_acid_color", 451,
"cartoon_nucleic_acid_mode", 361,
"cartoon_oval_length", 100,
"cartoon_oval_quality", 102,
"cartoon_oval_width", 101,
"cartoon_power", 94,
"cartoon_power_b", 95,
"cartoon_putty_quality", 378,
"cartoon_putty_radius", 377,
"cartoon_putty_range", 382,
"cartoon_putty_scale_max", 380,
"cartoon_putty_scale_min", 379,
"cartoon_putty_scale_power", 381,
"cartoon_putty_transform", 581,
"cartoon_rect_length", 96,
"cartoon_rect_width", 97,
"cartoon_refine", 123,
"cartoon_refine_normals", 112,
"cartoon_refine_tips", 124,
"cartoon_ring_color", 429,
"cartoon_ring_finder", 430,
"cartoon_ring_mode", 427,
"cartoon_ring_radius", 508,
"cartoon_ring_transparency", 452,
"cartoon_ring_width", 428,
"cartoon_round_helices", 111,
"cartoon_sampling", 91,
"cartoon_side_chain_helper", 383,
"cartoon_smooth_cycles", 259,
"cartoon_smooth_first", 257,
"cartoon_smooth_last", 258,
"cartoon_smooth_loops", 114,
"cartoon_throw", 122,
"cartoon_trace_atoms", 269,
"cartoon_transparency", 279,
"cartoon_tube_cap", 431,
"cartoon_tube_quality", 104,
"cartoon_tube_radius", 103,
"cartoon_use_shader", 643,
"cavity_cull", 13,
"cgo_debug", 674,
"cgo_dot_radius", 303,
"cgo_dot_width", 302,
"cgo_ellipsoid_quality", 564,
"cgo_lighting", 671,
"cgo_line_radius", 130,
"cgo_line_width", 129,
"cgo_ray_width_scale", 109,
"cgo_shader_ub_color", 669,
"cgo_shader_ub_flags", 694,
"cgo_shader_ub_normal", 670,
"cgo_sphere_quality", 189,
"cgo_transparency", 441,
"cgo_use_shader", 668,
"clamp_colors", 214,
"clean_electro_mode", 615,
"cone_quality", 583,
"connect_bonded", 487,
"connect_cutoff", 182,
"connect_mode", 179,
"coulomb_cutoff", 367,
"coulomb_dielectric", 243,
"coulomb_units_factor", 242,
"cull_spheres", 33,
"cylinder_shader_ff_workaround", 697,
"cylinders_shader_filter_faces", 687,
"dash_as_cylinders", 684,
"dash_color", 574,
"dash_gap", 59,
"dash_length", 58,
"dash_radius", 108,
"dash_round_ends", 280,
"dash_use_shader", 683,
"dash_width", 107,
"debug_pick", 209,
"default_2fofc_map_rep", 659,
"default_buster_names", 657,
"default_fofc_map_rep", 658,
"default_phenix_names", 655,
"default_phenix_no_fill_names", 656,
"default_refmac_names", 654,
"defer_builds_mode", 409,
"defer_updates", 304,
"depth_cue", 84,
"dihedral_color", 576,
"dihedral_label_position", 408,
"dihedral_size", 407,
"direct", 8,
"dist_counter", 57,
"distance_exclusion", 460,
"dot_as_spheres", 701,
"dot_color", 210,
"dot_density", 2,
"dot_hydrogens", 28,
"dot_lighting", 336,
"dot_mode", 3,
"dot_normals", 332,
"dot_radius", 29,
"dot_solvent", 206,
"dot_use_shader", 700,
"dot_width", 77,
"draw_frames", 436,
"draw_mode", 614,
"dump_binary", 749,
"dynamic_measures", 637,
"dynamic_width", 610,
"dynamic_width_factor", 611,
"dynamic_width_max", 613,
"dynamic_width_min", 612,
"edit_light", 707,
"editor_auto_dihedral", 416,
"editor_auto_origin", 439,
"editor_bond_cycle_mode", 633,
"editor_label_fragments", 321,
"ellipsoid_color", 570,
"ellipsoid_probability", 568,
"ellipsoid_quality", 563,
"ellipsoid_scale", 569,
"ellipsoid_transparency", 571,
"excl_display_lists_shaders", 682,
"fast_idle", 54,
"fetch_host", 636,
"fetch_path", 507,
"field_of_view", 152,
"fit_iterations", 185,
"fit_kabsch", 608,
"fit_tolerance", 186,
"float_labels", 232,
"fog", 88,
"fog_start", 192,
"frame", 194,
"full_screen", 142,
"gamma", 76,
"gaussian_b_adjust", 255,
"gaussian_b_floor", 272,
"gaussian_resolution", 271,
"geometry_export_mode", 586,
"gl_ambient", 14,
"gradient_max_length", 539,
"gradient_min_length", 540,
"gradient_min_slope", 541,
"gradient_normal_min_dot", 542,
"gradient_spacing", 544,
"gradient_step_size", 543,
"gradient_symmetry", 545,
"grid_max", 580,
"grid_mode", 577,
"grid_slot", 579,
"group_arrow_prefix", 547,
"group_auto_mode", 537,
"group_full_member_names", 538,
"h_bond_cone", 286,
"h_bond_cutoff_center", 282,
"h_bond_cutoff_edge", 283,
"h_bond_exclusion", 461,
"h_bond_from_proton", 556,
"h_bond_max_angle", 281,
"h_bond_power_a", 284,
"h_bond_power_b", 285,
"half_bonds", 45,
"hash_max", 22,
"heavy_neighbor_cutoff", 639,
"hide_long_bonds", 560,
"hide_underscore_names", 458,
"idle_delay", 52,
"ignore_case", 414,
"ignore_pdb_segi", 120,
"image_copy_always", 601,
"image_dots_per_inch", 434,
"INIT", 710,
"internal_feedback", 128,
"internal_gui", 99,
"internal_gui_control_size", 322,
"internal_gui_mode", 341,
"internal_gui_width", 98,
"internal_prompt", 313,
"isomesh_auto_state", 89,
"keep_alive", 607,
"label_anchor", 635,
"label_angle_digits", 531,
"label_color", 66,
"label_digits", 529,
"label_dihedral_digits", 532,
"label_distance_digits", 530,
"label_font_id", 328,
"label_outline_color", 467,
"label_position", 471,
"label_shadow_mode", 462,
"label_size", 453,
"legacy_mouse_zoom", 442,
"legacy_vdw_radii", 177,
"light", 10,
"light_count", 455,
"light2", 456,
"light3", 457,
"light4", 463,
"light5", 464,
"light6", 465,
"light7", 466,
"light8", 489,
"light9", 490,
"line_as_cylinders", 679,
"line_color", 526,
"line_radius", 110,
"line_smooth", 43,
"line_stick_helper", 391,
"line_use_shader", 645,
"line_width", 44,
"log_box_selections", 133,
"log_conformations", 134,
"logging", 131,
"map_auto_expand_sym", 600,
"matrix_mode", 438,
"max_threads", 261,
"max_triangles", 83,
"max_ups", 602,
"mesh_as_cylinders", 678,
"mesh_carve_cutoff", 591,
"mesh_carve_selection", 589,
"mesh_carve_state", 590,
"mesh_clear_cutoff", 594,
"mesh_clear_selection", 592,
"mesh_clear_state", 593,
"mesh_color", 146,
"mesh_cutoff", 588,
"mesh_grid_max", 595,
"mesh_lighting", 337,
"mesh_mode", 145,
"mesh_negative_color", 536,
"mesh_negative_visible", 535,
"mesh_normals", 334,
"mesh_quality", 204,
"mesh_radius", 74,
"mesh_skip", 528,
"mesh_solvent", 205,
"mesh_type", 335,
"mesh_use_shader", 672,
"mesh_width", 90,
"min_mesh_spacing", 1,
"moe_separate_chains", 558,
"motion_bias", 628,
"motion_hand", 631,
"motion_linear", 630,
"motion_power", 627,
"motion_simple", 629,
"mouse_grid", 587,
"mouse_limit", 211,
"mouse_restart_movie_delay", 404,
"mouse_scale", 212,
"mouse_selection_mode", 354,
"mouse_wheel_scale", 523,
"mouse_z_scale", 619,
"movie_animate_by_frame", 565,
"movie_auto_interpolate", 621,
"movie_auto_store", 620,
"movie_delay", 16,
"movie_fps", 550,
"movie_loop", 299,
"movie_panel", 618,
"movie_panel_row_height", 622,
"movie_quality", 634,
"movie_rock", 572,
"multiplex", 385,
"nb_spheres_quality", 689,
"nb_spheres_size", 688,
"nb_spheres_use_shader", 690,
"neighbor_cutoff", 638,
"no_idle", 53,
"nonbonded_as_cylinders", 686,
"nonbonded_size", 65,
"nonbonded_transparency", 524,
"nonbonded_use_shader", 685,
"normal_workaround", 40,
"normalize_ccp4_maps", 126,
"normalize_grd_maps", 314,
"normalize_o_maps", 305,
"nvidia_bugs", 433,
"offscreen_rendering_for_antialiasing", 695,
"offscreen_rendering_multiplier", 696,
"opaque_background", 435,
"orthoscopic", 23,
"overlay", 61,
"overlay_lines", 311,
"pdb_conect_all", 329,
"pdb_discrete_chains", 479,
"pdb_echo_tags", 486,
"pdb_formal_charges", 584,
"pdb_hetatm_guess_valences", 562,
"pdb_hetatm_sort", 267,
"pdb_honor_model_number", 424,
"pdb_ignore_conect", 632,
"pdb_insertions_go_first", 307,
"pdb_insure_orthogonal", 374,
"pdb_literal_names", 190,
"pdb_no_end_record", 301,
"pdb_reformat_names_mode", 326,
"pdb_retain_ids", 300,
"pdb_standard_order", 256,
"pdb_truncate_residue_name", 399,
"pdb_unbond_cations", 480,
"pdb_use_ter_records", 268,
"pickable", 50,
"png_file_gamma", 320,
"png_screen_gamma", 319,
"polar_neighbor_cutoff", 640,
"power", 11,
"pqr_workarounds", 387,
"presentation", 397,
"presentation_auto_quit", 415,
"presentation_auto_start", 417,
"presentation_mode", 398,
"preserve_chempy_ids", 154,
"pymol_space_max_blue", 217,
"pymol_space_max_green", 216,
"pymol_space_max_red", 215,
"pymol_space_min_factor", 218,
"raise_exceptions", 159,
"ramp_blend_nearby_colors", 566,
"rank_assisted_sorts", 425,
"ray_blend_blue", 318,
"ray_blend_colors", 315,
"ray_blend_green", 317,
"ray_blend_red", 316,
"ray_clip_shadows", 522,
"ray_color_ramps", 509,
"ray_default_renderer", 151,
"ray_direct_shade", 375,
"ray_hint_camera", 510,
"ray_hint_shadow", 511,
"ray_improve_shadows", 149,
"ray_interior_color", 240,
"ray_interior_mode", 476,
"ray_interior_reflect", 340,
"ray_interior_shadows", 244,
"ray_interior_texture", 245,
"ray_label_specular", 527,
"ray_legacy_lighting", 477,
"ray_max_passes", 350,
"ray_opaque_background", 137,
"ray_orthoscopic", 392,
"ray_oversample_cutoff", 270,
"ray_pixel_scale", 327,
"ray_scatter", 555,
"ray_shadow_decay_factor", 475,
"ray_shadow_decay_range", 491,
"ray_shadow_fudge", 207,
"ray_shadows", 195,
"ray_spec_local", 525,
"ray_texture", 139,
"ray_texture_settings", 140,
"ray_trace_color", 546,
"ray_trace_depth_factor", 472,
"ray_trace_disco_factor", 474,
"ray_trace_fog", 67,
"ray_trace_fog_start", 69,
"ray_trace_frames", 30,
"ray_trace_gain", 469,
"ray_trace_mode", 468,
"ray_trace_persist_cutoff", 553,
"ray_trace_slope_factor", 473,
"ray_trace_trans_cutoff", 552,
"ray_transparency_contrast", 352,
"ray_transparency_oblique", 551,
"ray_transparency_oblique_power", 554,
"ray_transparency_shadows", 199,
"ray_transparency_spec_cut", 312,
"ray_transparency_specular", 201,
"ray_triangle_fudge", 208,
"ray_volume", 665,
"reflect", 9,
"reflect_power", 153,
"render_as_cylinders", 691,
"retain_order", 266,
"ribbon_as_cylinders", 680,
"ribbon_color", 235,
"ribbon_nucleic_acid_mode", 426,
"ribbon_power", 17,
"ribbon_power_b", 18,
"ribbon_radius", 20,
"ribbon_sampling", 19,
"ribbon_side_chain_helper", 393,
"ribbon_smooth", 237,
"ribbon_throw", 121,
"ribbon_trace_atoms", 196,
"ribbon_transparency", 666,
"ribbon_use_shader", 681,
"ribbon_width", 106,
"robust_logs", 132,
"rock", 582,
"rock_delay", 56,
"roving_byres", 226,
"roving_cartoon", 228,
"roving_delay", 224,
"roving_detail", 233,
"roving_isomesh", 252,
"roving_isosurface", 253,
"roving_labels", 223,
"roving_lines", 220,
"roving_map1_level", 249,
"roving_map1_name", 246,
"roving_map2_level", 250,
"roving_map2_name", 247,
"roving_map3_level", 251,
"roving_map3_name", 248,
"roving_nb_spheres", 234,
"roving_nonbonded", 231,
"roving_origin", 219,
"roving_origin_z", 308,
"roving_origin_z_cushion", 309,
"roving_polar_contacts", 229,
"roving_polar_cutoff", 230,
"roving_ribbon", 227,
"roving_selection", 225,
"roving_spheres", 222,
"roving_sticks", 221,
"save_pdb_ss", 183,
"scene_animation", 390,
"scene_animation_duration", 411,
"scene_buttons", 599,
"scene_buttons_mode", 598,
"scene_current_name", 396,
"scene_frame_mode", 623,
"scene_loop", 400,
"scene_restart_movie_delay", 403,
"scenes_changed", 254,
"sculpt_angl_weight", 168,
"sculpt_auto_center", 478,
"sculpt_avd_excl", 505,
"sculpt_avd_gap", 503,
"sculpt_avd_range", 504,
"sculpt_avd_weight", 502,
"sculpt_bond_weight", 167,
"sculpt_field_mask", 174,
"sculpt_hb_overlap", 175,
"sculpt_hb_overlap_base", 176,
"sculpt_line_weight", 184,
"sculpt_max_max", 500,
"sculpt_max_min", 499,
"sculpt_max_scale", 497,
"sculpt_max_weight", 498,
"sculpt_memory", 178,
"sculpt_min_max", 496,
"sculpt_min_min", 495,
"sculpt_min_scale", 493,
"sculpt_min_weight", 494,
"sculpt_nb_interval", 273,
"sculpt_plan_weight", 170,
"sculpt_pyra_inv_weight", 606,
"sculpt_pyra_weight", 169,
"sculpt_tors_tolerance", 275,
"sculpt_tors_weight", 274,
"sculpt_tri_max", 484,
"sculpt_tri_min", 483,
"sculpt_tri_mode", 485,
"sculpt_tri_scale", 481,
"sculpt_tri_weight", 482,
"sculpt_vdw_scale", 163,
"sculpt_vdw_scale14", 164,
"sculpt_vdw_vis_max", 447,
"sculpt_vdw_vis_mid", 446,
"sculpt_vdw_vis_min", 445,
"sculpt_vdw_vis_mode", 444,
"sculpt_vdw_weight", 165,
"sculpt_vdw_weight14", 166,
"sculpting", 161,
"sculpting_cycles", 171,
"sdof_drag_scale", 597,
"secondary_structure", 157,
"security", 197,
"sel_counter", 5,
"selection_overlay", 81,
"selection_round_points", 459,
"selection_visible_only", 470,
"selection_width", 80,
"selection_width_max", 394,
"selection_width_scale", 395,
"seq_view", 353,
"seq_view_alignment", 513,
"seq_view_color", 362,
"seq_view_discrete_by_state", 410,
"seq_view_fill_char", 516,
"seq_view_fill_color", 517,
"seq_view_format", 357,
"seq_view_label_color", 518,
"seq_view_label_mode", 363,
"seq_view_label_spacing", 355,
"seq_view_label_start", 356,
"seq_view_location", 358,
"seq_view_overlay", 359,
"seq_view_unaligned_color", 515,
"seq_view_unaligned_mode", 514,
"session_cache_optimize", 596,
"session_changed", 521,
"session_compression", 549,
"session_file", 440,
"session_migration", 333,
"session_version_check", 200,
"shader_path", 648,
"shininess", 86,
"show_alpha_checker", 437,
"show_frame_rate", 617,
"show_progress", 262,
"simplify_display_lists", 265,
"single_image", 15,
"slice_dynamic_grid", 372,
"slice_dynamic_grid_resolution", 373,
"slice_grid", 371,
"slice_height_map", 370,
"slice_height_scale", 369,
"slice_track_camera", 368,
"slow_idle", 55,
"smooth_color_triangle", 150,
"smooth_half_bonds", 705,
"solvent_radius", 4,
"spec_count", 492,
"spec_direct", 454,
"spec_direct_power", 488,
"spec_power", 25,
"spec_reflect", 24,
"specular", 85,
"specular_intensity", 310,
"sphere_color", 173,
"sphere_mode", 421,
"sphere_point_max_size", 422,
"sphere_point_size", 423,
"sphere_quality", 87,
"sphere_scale", 155,
"sphere_solvent", 203,
"sphere_transparency", 172,
"sphere_use_shader", 646,
"spheroid_fill", 71,
"spheroid_scale", 68,
"spheroid_smooth", 70,
"ss_helix_phi_exclude", 292,
"ss_helix_phi_include", 291,
"ss_helix_phi_target", 290,
"ss_helix_psi_exclude", 289,
"ss_helix_psi_include", 288,
"ss_helix_psi_target", 287,
"ss_strand_phi_exclude", 298,
"ss_strand_phi_include", 297,
"ss_strand_phi_target", 296,
"ss_strand_psi_exclude", 295,
"ss_strand_psi_include", 294,
"ss_strand_psi_target", 293,
"state", 193,
"state_counter_mode", 667,
"static_singletons", 82,
"stereo", 365,
"stereo_angle", 41,
"stereo_double_pump_mono", 202,
"stereo_dynamic_strength", 609,
"stereo_mode", 188,
"stereo_shift", 42,
"stick_as_cylinders", 677,
"stick_ball", 276,
"stick_ball_color", 604,
"stick_ball_ratio", 277,
"stick_color", 376,
"stick_debug", 673,
"stick_fixed_radius", 278,
"stick_good_geometry", 676,
"stick_h_scale", 605,
"stick_nub", 48,
"stick_overlap", 47,
"stick_quality", 46,
"stick_radius", 21,
"stick_round_nub", 675,
"stick_transparency", 198,
"stick_use_shader", 644,
"stick_valence_scale", 512,
"stop_on_exceptions", 160,
"suppress_hidden", 548,
"surface_best", 36,
"surface_carve_cutoff", 344,
"surface_carve_normal_cutoff", 519,
"surface_carve_selection", 342,
"surface_carve_state", 343,
"surface_cavity_cutoff", 626,
"surface_cavity_mode", 624,
"surface_cavity_radius", 625,
"surface_circumscribe", 501,
"surface_clear_cutoff", 347,
"surface_clear_selection", 345,
"surface_clear_state", 346,
"surface_color", 144,
"surface_color_smoothing", 698,
"surface_color_smoothing_threshold", 699,
"surface_debug", 148,
"surface_miserable", 136,
"surface_mode", 143,
"surface_negative_color", 534,
"surface_negative_visible", 533,
"surface_normal", 37,
"surface_optimize_subsets", 384,
"surface_poor", 127,
"surface_proximity", 39,
"surface_quality", 38,
"surface_ramp_above_mode", 364,
"surface_residue_cutoff", 641,
"surface_solvent", 338,
"surface_trim_cutoff", 348,
"surface_trim_factor", 349,
"surface_type", 331,
"surface_use_shader", 642,
"suspend_undo", 708,
"suspend_undo_atom_count", 709,
"suspend_updates", 141,
"swap_dsn6_bytes", 306,
"sweep_angle", 26,
"sweep_mode", 401,
"sweep_phase", 402,
"sweep_speed", 27,
"test1", 34,
"test2", 35,
"text", 62,
"texture_fonts", 386,
"trace_atoms_mode", 520,
"transparency", 138,
"transparency_global_sort", 559,
"transparency_mode", 213,
"transparency_picking_mode", 324,
"triangle_max_passes", 339,
"trim_dots", 32,
"two_sided_lighting", 156,
"unused_boolean_def_true", 419,
"use_display_lists", 263,
"use_shaders", 647,
"valence", 64,
"valence_mode", 616,
"valence_size", 135,
"validate_object_names", 418,
"virtual_trackball", 325,
"volume_bit_depth", 649,
"volume_color", 650,
"volume_data_range", 652,
"volume_layers", 651,
"wildcard", 412,
"wizard_prompt_mode", 366,
"wrap_output", 191,
"COLOR_FRONT", -6,
"COLOR_BACK", -7,
"COLOR_BLACK", 1,
"colors",  Clazz_newIntArray (-1, [0xFFFFFFFF, 0xFF000000, 0xFF0000FF, 0xFF00FF00, 0xFFFF0000, 0xFF00FFFF, 0xFFFFFF00, 0xFFFFFF00, 0xFFFF00FF, 0xFFFF9999, 0xFF7FFF7F, 0xFF7F7FFF, 0xFFFF007F, 0xFFFF7F00, 0xFF7FFF00, 0xFF00FF7F, 0xFF7F00FF, 0xFF007FFF, 0xFFC4B200, 0xFFBF00BF, 0xFF00BFBF, 0xFF993333, 0xFF339933, 0xFF3F3FA5, 0xFF7F7F7F, 0xFF7F7F7F, 0xFF33FF33, 0xFF3333FF, 0xFFFF4C4C, 0xFFE5E5E5, 0xFFFFB233, 0xFFE5C53F, 0xFFFF3333, 0xFF33FF33, 0xFF4C4CFF, 0xFFFFFF33, 0xFFFFDD5E, 0xFFFF8C26, 0xFF1919FF, 0xFF3319E5, 0xFF4C19CC, 0xFF6619B2, 0xFF7F1999, 0xFF99197F, 0xFFB21966, 0xFFCC194C, 0xFFE51933, 0xFFFF1919, 0xFFFFA5D8, 0xFFB12121, 0xFF8D381C, 0xFFA5512B, 0xFFFCD1A5, 0xFFFF7FFF, 0xFF000000, 0xFF020202, 0xFF050505, 0xFF070707, 0xFF0A0A0A, 0xFF0C0C0C, 0xFF0F0F0F, 0xFF121212, 0xFF141414, 0xFF171717, 0xFF191919, 0xFF1C1C1C, 0xFF1E1E1E, 0xFF212121, 0xFF242424, 0xFF262626, 0xFF292929, 0xFF2B2B2B, 0xFF2E2E2E, 0xFF303030, 0xFF333333, 0xFF363636, 0xFF383838, 0xFF3B3B3B, 0xFF3D3D3D, 0xFF404040, 0xFF424242, 0xFF454545, 0xFF484848, 0xFF4A4A4A, 0xFF4D4D4D, 0xFF4F4F4F, 0xFF525252, 0xFF555555, 0xFF575757, 0xFF5A5A5A, 0xFF5C5C5C, 0xFF5F5F5F, 0xFF616161, 0xFF646464, 0xFF676767, 0xFF696969, 0xFF6C6C6C, 0xFF6E6E6E, 0xFF717171, 0xFF737373, 0xFF767676, 0xFF797979, 0xFF7B7B7B, 0xFF7E7E7E, 0xFF808080, 0xFF838383, 0xFF858585, 0xFF888888, 0xFF8B8B8B, 0xFF8D8D8D, 0xFF909090, 0xFF929292, 0xFF959595, 0xFF979797, 0xFF9A9A9A, 0xFF9D9D9D, 0xFF9F9F9F, 0xFFA2A2A2, 0xFFA4A4A4, 0xFFA7A7A7, 0xFFAAAAAA, 0xFFACACAC, 0xFFAFAFAF, 0xFFB1B1B1, 0xFFB4B4B4, 0xFFB6B6B6, 0xFFB9B9B9, 0xFFBCBCBC, 0xFFBEBEBE, 0xFFC1C1C1, 0xFFC3C3C3, 0xFFC6C6C6, 0xFFC8C8C8, 0xFFCBCBCB, 0xFFCECECE, 0xFFD0D0D0, 0xFFD3D3D3, 0xFFD5D5D5, 0xFFD8D8D8, 0xFFDADADA, 0xFFDDDDDD, 0xFFE0E0E0, 0xFFE2E2E2, 0xFFE5E5E5, 0xFFE7E7E7, 0xFFEAEAEA, 0xFFECECEC, 0xFFEFEFEF, 0xFFF2F2F2, 0xFFF4F4F4, 0xFFF7F7F7, 0xFFF9F9F9, 0xFFFCFCFC, 0xFFFFFFFF, 0xFFFF33CC, 0xFFFF00FF, 0xFFFD00FF, 0xFFFB00FF, 0xFFFA00FF, 0xFFF800FF, 0xFFF700FF, 0xFFF500FF, 0xFFF400FF, 0xFFF200FF, 0xFFF100FF, 0xFFEF00FF, 0xFFEE00FF, 0xFFEC00FF, 0xFFEB00FF, 0xFFE900FF, 0xFFE800FF, 0xFFE600FF, 0xFFE400FF, 0xFFE300FF, 0xFFE100FF, 0xFFE000FF, 0xFFDE00FF, 0xFFDD00FF, 0xFFDB00FF, 0xFFDA00FF, 0xFFD800FF, 0xFFD700FF, 0xFFD500FF, 0xFFD400FF, 0xFFD200FF, 0xFFD100FF, 0xFFCF00FF, 0xFFCE00FF, 0xFFCC00FF, 0xFFCA00FF, 0xFFC900FF, 0xFFC700FF, 0xFFC600FF, 0xFFC400FF, 0xFFC300FF, 0xFFC100FF, 0xFFC000FF, 0xFFBE00FF, 0xFFBD00FF, 0xFFBB00FF, 0xFFBA00FF, 0xFFB800FF, 0xFFB700FF, 0xFFB500FF, 0xFFB400FF, 0xFFB200FF, 0xFFB000FF, 0xFFAF00FF, 0xFFAD00FF, 0xFFAC00FF, 0xFFAA00FF, 0xFFA900FF, 0xFFA700FF, 0xFFA600FF, 0xFFA400FF, 0xFFA300FF, 0xFFA100FF, 0xFFA000FF, 0xFF9E00FF, 0xFF9D00FF, 0xFF9B00FF, 0xFF9A00FF, 0xFF9800FF, 0xFF9600FF, 0xFF9500FF, 0xFF9300FF, 0xFF9200FF, 0xFF9000FF, 0xFF8F00FF, 0xFF8D00FF, 0xFF8C00FF, 0xFF8A00FF, 0xFF8900FF, 0xFF8700FF, 0xFF8600FF, 0xFF8400FF, 0xFF8300FF, 0xFF8100FF, 0xFF8000FF, 0xFF7E00FF, 0xFF7C00FF, 0xFF7B00FF, 0xFF7900FF, 0xFF7800FF, 0xFF7600FF, 0xFF7500FF, 0xFF7300FF, 0xFF7200FF, 0xFF7000FF, 0xFF6F00FF, 0xFF6D00FF, 0xFF6C00FF, 0xFF6A00FF, 0xFF6900FF, 0xFF6700FF, 0xFF6600FF, 0xFF6400FF, 0xFF6200FF, 0xFF6100FF, 0xFF5F00FF, 0xFF5E00FF, 0xFF5C00FF, 0xFF5B00FF, 0xFF5900FF, 0xFF5800FF, 0xFF5600FF, 0xFF5500FF, 0xFF5300FF, 0xFF5200FF, 0xFF5000FF, 0xFF4F00FF, 0xFF4D00FF, 0xFF4B00FF, 0xFF4A00FF, 0xFF4800FF, 0xFF4700FF, 0xFF4500FF, 0xFF4400FF, 0xFF4200FF, 0xFF4100FF, 0xFF3F00FF, 0xFF3E00FF, 0xFF3C00FF, 0xFF3B00FF, 0xFF3900FF, 0xFF3800FF, 0xFF3600FF, 0xFF3500FF, 0xFF3300FF, 0xFF3100FF, 0xFF3000FF, 0xFF2E00FF, 0xFF2D00FF, 0xFF2B00FF, 0xFF2A00FF, 0xFF2800FF, 0xFF2700FF, 0xFF2500FF, 0xFF2400FF, 0xFF2200FF, 0xFF2100FF, 0xFF1F00FF, 0xFF1E00FF, 0xFF1C00FF, 0xFF1B00FF, 0xFF1900FF, 0xFF1700FF, 0xFF1600FF, 0xFF1400FF, 0xFF1300FF, 0xFF1100FF, 0xFF1000FF, 0xFF0E00FF, 0xFF0D00FF, 0xFF0B00FF, 0xFF0A00FF, 0xFF0800FF, 0xFF0700FF, 0xFF0500FF, 0xFF0400FF, 0xFF0200FF, 0xFF0100FF, 0xFF0000FF, 0xFF0002FF, 0xFF0003FF, 0xFF0005FF, 0xFF0006FF, 0xFF0008FF, 0xFF0009FF, 0xFF000BFF, 0xFF000CFF, 0xFF000EFF, 0xFF000FFF, 0xFF0011FF, 0xFF0012FF, 0xFF0014FF, 0xFF0015FF, 0xFF0017FF, 0xFF0018FF, 0xFF001AFF, 0xFF001CFF, 0xFF001DFF, 0xFF001FFF, 0xFF0020FF, 0xFF0022FF, 0xFF0023FF, 0xFF0025FF, 0xFF0026FF, 0xFF0028FF, 0xFF0029FF, 0xFF002BFF, 0xFF002CFF, 0xFF002EFF, 0xFF002FFF, 0xFF0031FF, 0xFF0032FF, 0xFF0034FF, 0xFF0036FF, 0xFF0037FF, 0xFF0039FF, 0xFF003AFF, 0xFF003CFF, 0xFF003DFF, 0xFF003FFF, 0xFF0040FF, 0xFF0042FF, 0xFF0043FF, 0xFF0045FF, 0xFF0046FF, 0xFF0048FF, 0xFF0049FF, 0xFF004BFF, 0xFF004DFF, 0xFF004EFF, 0xFF0050FF, 0xFF0051FF, 0xFF0053FF, 0xFF0054FF, 0xFF0056FF, 0xFF0057FF, 0xFF0059FF, 0xFF005AFF, 0xFF005CFF, 0xFF005DFF, 0xFF005FFF, 0xFF0060FF, 0xFF0062FF, 0xFF0063FF, 0xFF0065FF, 0xFF0067FF, 0xFF0068FF, 0xFF006AFF, 0xFF006BFF, 0xFF006DFF, 0xFF006EFF, 0xFF0070FF, 0xFF0071FF, 0xFF0073FF, 0xFF0074FF, 0xFF0076FF, 0xFF0077FF, 0xFF0079FF, 0xFF007AFF, 0xFF007CFF, 0xFF007DFF, 0xFF007FFF, 0xFF0081FF, 0xFF0082FF, 0xFF0084FF, 0xFF0085FF, 0xFF0087FF, 0xFF0088FF, 0xFF008AFF, 0xFF008BFF, 0xFF008DFF, 0xFF008EFF, 0xFF0090FF, 0xFF0091FF, 0xFF0093FF, 0xFF0094FF, 0xFF0096FF, 0xFF0097FF, 0xFF0099FF, 0xFF009BFF, 0xFF009CFF, 0xFF009EFF, 0xFF009FFF, 0xFF00A1FF, 0xFF00A2FF, 0xFF00A4FF, 0xFF00A5FF, 0xFF00A7FF, 0xFF00A8FF, 0xFF00AAFF, 0xFF00ABFF, 0xFF00ADFF, 0xFF00AEFF, 0xFF00B0FF, 0xFF00B1FF, 0xFF00B3FF, 0xFF00B5FF, 0xFF00B6FF, 0xFF00B8FF, 0xFF00B9FF, 0xFF00BBFF, 0xFF00BCFF, 0xFF00BEFF, 0xFF00BFFF, 0xFF00C1FF, 0xFF00C2FF, 0xFF00C4FF, 0xFF00C5FF, 0xFF00C7FF, 0xFF00C8FF, 0xFF00CAFF, 0xFF00CBFF, 0xFF00CDFF, 0xFF00CFFF, 0xFF00D0FF, 0xFF00D2FF, 0xFF00D3FF, 0xFF00D5FF, 0xFF00D6FF, 0xFF00D8FF, 0xFF00D9FF, 0xFF00DBFF, 0xFF00DCFF, 0xFF00DEFF, 0xFF00DFFF, 0xFF00E1FF, 0xFF00E2FF, 0xFF00E4FF, 0xFF00E6FF, 0xFF00E7FF, 0xFF00E9FF, 0xFF00EAFF, 0xFF00ECFF, 0xFF00EDFF, 0xFF00EFFF, 0xFF00F0FF, 0xFF00F2FF, 0xFF00F3FF, 0xFF00F5FF, 0xFF00F6FF, 0xFF00F8FF, 0xFF00F9FF, 0xFF00FBFF, 0xFF00FCFF, 0xFF00FEFF, 0xFF00FFFD, 0xFF00FFFC, 0xFF00FFFA, 0xFF00FFF9, 0xFF00FFF7, 0xFF00FFF6, 0xFF00FFF4, 0xFF00FFF3, 0xFF00FFF1, 0xFF00FFF0, 0xFF00FFEE, 0xFF00FFED, 0xFF00FFEB, 0xFF00FFEA, 0xFF00FFE8, 0xFF00FFE7, 0xFF00FFE5, 0xFF00FFE3, 0xFF00FFE2, 0xFF00FFE0, 0xFF00FFDF, 0xFF00FFDD, 0xFF00FFDC, 0xFF00FFDA, 0xFF00FFD9, 0xFF00FFD7, 0xFF00FFD6, 0xFF00FFD4, 0xFF00FFD3, 0xFF00FFD1, 0xFF00FFD0, 0xFF00FFCE, 0xFF00FFCD, 0xFF00FFCB, 0xFF00FFC9, 0xFF00FFC8, 0xFF00FFC6, 0xFF00FFC5, 0xFF00FFC3, 0xFF00FFC2, 0xFF00FFC0, 0xFF00FFBF, 0xFF00FFBD, 0xFF00FFBC, 0xFF00FFBA, 0xFF00FFB9, 0xFF00FFB7, 0xFF00FFB6, 0xFF00FFB4, 0xFF00FFB3, 0xFF00FFB1, 0xFF00FFAF, 0xFF00FFAE, 0xFF00FFAC, 0xFF00FFAB, 0xFF00FFA9, 0xFF00FFA8, 0xFF00FFA6, 0xFF00FFA5, 0xFF00FFA3, 0xFF00FFA2, 0xFF00FFA0, 0xFF00FF9F, 0xFF00FF9D, 0xFF00FF9C, 0xFF00FF9A, 0xFF00FF99, 0xFF00FF97, 0xFF00FF95, 0xFF00FF94, 0xFF00FF92, 0xFF00FF91, 0xFF00FF8F, 0xFF00FF8E, 0xFF00FF8C, 0xFF00FF8B, 0xFF00FF89, 0xFF00FF88, 0xFF00FF86, 0xFF00FF85, 0xFF00FF83, 0xFF00FF82, 0xFF00FF80, 0xFF00FF7E, 0xFF00FF7D, 0xFF00FF7B, 0xFF00FF7A, 0xFF00FF78, 0xFF00FF77, 0xFF00FF75, 0xFF00FF74, 0xFF00FF72, 0xFF00FF71, 0xFF00FF6F, 0xFF00FF6E, 0xFF00FF6C, 0xFF00FF6B, 0xFF00FF69, 0xFF00FF68, 0xFF00FF66, 0xFF00FF64, 0xFF00FF63, 0xFF00FF61, 0xFF00FF60, 0xFF00FF5E, 0xFF00FF5D, 0xFF00FF5B, 0xFF00FF5A, 0xFF00FF58, 0xFF00FF57, 0xFF00FF55, 0xFF00FF54, 0xFF00FF52, 0xFF00FF51, 0xFF00FF4F, 0xFF00FF4E, 0xFF00FF4C, 0xFF00FF4A, 0xFF00FF49, 0xFF00FF47, 0xFF00FF46, 0xFF00FF44, 0xFF00FF43, 0xFF00FF41, 0xFF00FF40, 0xFF00FF3E, 0xFF00FF3D, 0xFF00FF3B, 0xFF00FF3A, 0xFF00FF38, 0xFF00FF37, 0xFF00FF35, 0xFF00FF34, 0xFF00FF32, 0xFF00FF30, 0xFF00FF2F, 0xFF00FF2D, 0xFF00FF2C, 0xFF00FF2A, 0xFF00FF29, 0xFF00FF27, 0xFF00FF26, 0xFF00FF24, 0xFF00FF23, 0xFF00FF21, 0xFF00FF20, 0xFF00FF1E, 0xFF00FF1D, 0xFF00FF1B, 0xFF00FF1A, 0xFF00FF18, 0xFF00FF16, 0xFF00FF15, 0xFF00FF13, 0xFF00FF12, 0xFF00FF10, 0xFF00FF0F, 0xFF00FF0D, 0xFF00FF0C, 0xFF00FF0A, 0xFF00FF09, 0xFF00FF07, 0xFF00FF06, 0xFF00FF04, 0xFF00FF03, 0xFF00FF01, 0xFF00FF00, 0xFF01FF00, 0xFF03FF00, 0xFF04FF00, 0xFF06FF00, 0xFF07FF00, 0xFF09FF00, 0xFF0AFF00, 0xFF0CFF00, 0xFF0DFF00, 0xFF0FFF00, 0xFF10FF00, 0xFF12FF00, 0xFF13FF00, 0xFF15FF00, 0xFF16FF00, 0xFF18FF00, 0xFF1AFF00, 0xFF1BFF00, 0xFF1DFF00, 0xFF1EFF00, 0xFF20FF00, 0xFF21FF00, 0xFF23FF00, 0xFF24FF00, 0xFF26FF00, 0xFF27FF00, 0xFF29FF00, 0xFF2AFF00, 0xFF2CFF00, 0xFF2DFF00, 0xFF2FFF00, 0xFF30FF00, 0xFF32FF00, 0xFF34FF00, 0xFF35FF00, 0xFF37FF00, 0xFF38FF00, 0xFF3AFF00, 0xFF3BFF00, 0xFF3DFF00, 0xFF3EFF00, 0xFF40FF00, 0xFF41FF00, 0xFF43FF00, 0xFF44FF00, 0xFF46FF00, 0xFF47FF00, 0xFF49FF00, 0xFF4AFF00, 0xFF4CFF00, 0xFF4EFF00, 0xFF4FFF00, 0xFF51FF00, 0xFF52FF00, 0xFF54FF00, 0xFF55FF00, 0xFF57FF00, 0xFF58FF00, 0xFF5AFF00, 0xFF5BFF00, 0xFF5DFF00, 0xFF5EFF00, 0xFF60FF00, 0xFF61FF00, 0xFF63FF00, 0xFF64FF00, 0xFF66FF00, 0xFF68FF00, 0xFF69FF00, 0xFF6BFF00, 0xFF6CFF00, 0xFF6EFF00, 0xFF6FFF00, 0xFF71FF00, 0xFF72FF00, 0xFF74FF00, 0xFF75FF00, 0xFF77FF00, 0xFF78FF00, 0xFF7AFF00, 0xFF7BFF00, 0xFF7DFF00, 0xFF7EFF00, 0xFF80FF00, 0xFF82FF00, 0xFF83FF00, 0xFF85FF00, 0xFF86FF00, 0xFF88FF00, 0xFF89FF00, 0xFF8BFF00, 0xFF8CFF00, 0xFF8EFF00, 0xFF8FFF00, 0xFF91FF00, 0xFF92FF00, 0xFF94FF00, 0xFF95FF00, 0xFF97FF00, 0xFF98FF00, 0xFF9AFF00, 0xFF9CFF00, 0xFF9DFF00, 0xFF9FFF00, 0xFFA0FF00, 0xFFA2FF00, 0xFFA3FF00, 0xFFA5FF00, 0xFFA6FF00, 0xFFA8FF00, 0xFFA9FF00, 0xFFABFF00, 0xFFACFF00, 0xFFAEFF00, 0xFFAFFF00, 0xFFB1FF00, 0xFFB3FF00, 0xFFB4FF00, 0xFFB6FF00, 0xFFB7FF00, 0xFFB9FF00, 0xFFBAFF00, 0xFFBCFF00, 0xFFBDFF00, 0xFFBFFF00, 0xFFC0FF00, 0xFFC2FF00, 0xFFC3FF00, 0xFFC5FF00, 0xFFC6FF00, 0xFFC8FF00, 0xFFC9FF00, 0xFFCBFF00, 0xFFCDFF00, 0xFFCEFF00, 0xFFD0FF00, 0xFFD1FF00, 0xFFD3FF00, 0xFFD4FF00, 0xFFD6FF00, 0xFFD7FF00, 0xFFD9FF00, 0xFFDAFF00, 0xFFDCFF00, 0xFFDDFF00, 0xFFDFFF00, 0xFFE0FF00, 0xFFE2FF00, 0xFFE3FF00, 0xFFE5FF00, 0xFFE7FF00, 0xFFE8FF00, 0xFFEAFF00, 0xFFEBFF00, 0xFFEDFF00, 0xFFEEFF00, 0xFFF0FF00, 0xFFF1FF00, 0xFFF3FF00, 0xFFF4FF00, 0xFFF6FF00, 0xFFF7FF00, 0xFFF9FF00, 0xFFFAFF00, 0xFFFCFF00, 0xFFFDFF00, 0xFFFFFE00, 0xFFFFFC00, 0xFFFFFB00, 0xFFFFF900, 0xFFFFF800, 0xFFFFF600, 0xFFFFF500, 0xFFFFF300, 0xFFFFF200, 0xFFFFF000, 0xFFFFEF00, 0xFFFFED00, 0xFFFFEC00, 0xFFFFEA00, 0xFFFFE900, 0xFFFFE700, 0xFFFFE600, 0xFFFFE400, 0xFFFFE200, 0xFFFFE100, 0xFFFFDF00, 0xFFFFDE00, 0xFFFFDC00, 0xFFFFDB00, 0xFFFFD900, 0xFFFFD800, 0xFFFFD600, 0xFFFFD500, 0xFFFFD300, 0xFFFFD200, 0xFFFFD000, 0xFFFFCF00, 0xFFFFCD00, 0xFFFFCC00, 0xFFFFCA00, 0xFFFFC800, 0xFFFFC700, 0xFFFFC500, 0xFFFFC400, 0xFFFFC200, 0xFFFFC100, 0xFFFFBF00, 0xFFFFBE00, 0xFFFFBC00, 0xFFFFBB00, 0xFFFFB900, 0xFFFFB800, 0xFFFFB600, 0xFFFFB500, 0xFFFFB300, 0xFFFFB100, 0xFFFFB000, 0xFFFFAE00, 0xFFFFAD00, 0xFFFFAB00, 0xFFFFAA00, 0xFFFFA800, 0xFFFFA700, 0xFFFFA500, 0xFFFFA400, 0xFFFFA200, 0xFFFFA100, 0xFFFF9F00, 0xFFFF9E00, 0xFFFF9C00, 0xFFFF9B00, 0xFFFF9900, 0xFFFF9700, 0xFFFF9600, 0xFFFF9400, 0xFFFF9300, 0xFFFF9100, 0xFFFF9000, 0xFFFF8E00, 0xFFFF8D00, 0xFFFF8B00, 0xFFFF8A00, 0xFFFF8800, 0xFFFF8700, 0xFFFF8500, 0xFFFF8400, 0xFFFF8200, 0xFFFF8100, 0xFFFF7F00, 0xFFFF7D00, 0xFFFF7C00, 0xFFFF7A00, 0xFFFF7900, 0xFFFF7700, 0xFFFF7600, 0xFFFF7400, 0xFFFF7300, 0xFFFF7100, 0xFFFF7000, 0xFFFF6E00, 0xFFFF6D00, 0xFFFF6B00, 0xFFFF6A00, 0xFFFF6800, 0xFFFF6700, 0xFFFF6500, 0xFFFF6300, 0xFFFF6200, 0xFFFF6000, 0xFFFF5F00, 0xFFFF5D00, 0xFFFF5C00, 0xFFFF5A00, 0xFFFF5900, 0xFFFF5700, 0xFFFF5600, 0xFFFF5400, 0xFFFF5300, 0xFFFF5100, 0xFFFF5000, 0xFFFF4E00, 0xFFFF4D00, 0xFFFF4B00, 0xFFFF4900, 0xFFFF4800, 0xFFFF4600, 0xFFFF4500, 0xFFFF4300, 0xFFFF4200, 0xFFFF4000, 0xFFFF3F00, 0xFFFF3D00, 0xFFFF3C00, 0xFFFF3A00, 0xFFFF3900, 0xFFFF3700, 0xFFFF3600, 0xFFFF3400, 0xFFFF3300, 0xFFFF3100, 0xFFFF2F00, 0xFFFF2E00, 0xFFFF2C00, 0xFFFF2B00, 0xFFFF2900, 0xFFFF2800, 0xFFFF2600, 0xFFFF2500, 0xFFFF2300, 0xFFFF2200, 0xFFFF2000, 0xFFFF1F00, 0xFFFF1D00, 0xFFFF1C00, 0xFFFF1A00, 0xFFFF1800, 0xFFFF1700, 0xFFFF1500, 0xFFFF1400, 0xFFFF1200, 0xFFFF1100, 0xFFFF0F00, 0xFFFF0E00, 0xFFFF0C00, 0xFFFF0B00, 0xFFFF0900, 0xFFFF0800, 0xFFFF0600, 0xFFFF0500, 0xFFFF0300, 0xFFFF0200, 0xFFFF0000, 0xFFFF0001, 0xFFFF0002, 0xFFFF0004, 0xFFFF0005, 0xFFFF0007, 0xFFFF0008, 0xFFFF000A, 0xFFFF000B, 0xFFFF000D, 0xFFFF000E, 0xFFFF0010, 0xFFFF0011, 0xFFFF0013, 0xFFFF0014, 0xFFFF0016, 0xFFFF0017, 0xFFFF0019, 0xFFFF001B, 0xFFFF001C, 0xFFFF001E, 0xFFFF001F, 0xFFFF0021, 0xFFFF0022, 0xFFFF0024, 0xFFFF0025, 0xFFFF0027, 0xFFFF0028, 0xFFFF002A, 0xFFFF002B, 0xFFFF002D, 0xFFFF002E, 0xFFFF0030, 0xFFFF0031, 0xFFFF0033, 0xFFFF0035, 0xFFFF0036, 0xFFFF0038, 0xFFFF0039, 0xFFFF003B, 0xFFFF003C, 0xFFFF003E, 0xFFFF003F, 0xFFFF0041, 0xFFFF0042, 0xFFFF0044, 0xFFFF0045, 0xFFFF0047, 0xFFFF0048, 0xFFFF004A, 0xFFFF004B, 0xFFFF004D, 0xFFFF004F, 0xFFFF0050, 0xFFFF0052, 0xFFFF0053, 0xFFFF0055, 0xFFFF0056, 0xFFFF0058, 0xFFFF0059, 0xFFFF005B, 0xFFFF005C, 0xFFFF005E, 0xFFFF005F, 0xFFFF0061, 0xFFFF0062, 0xFFFF0064, 0xFFFF0065, 0xFFFF0067, 0xFFFF0069, 0xFFFF006A, 0xFFFF006C, 0xFFFF006D, 0xFFFF006F, 0xFFFF0070, 0xFFFF0072, 0xFFFF0073, 0xFFFF0075, 0xFFFF0076, 0xFFFF0078, 0xFFFF0079, 0xFFFF007B, 0xFFFF007C, 0xFFFF007E, 0xFFFF0080, 0xFFFF0081, 0xFFFF0083, 0xFFFF0084, 0xFFFF0086, 0xFFFF0087, 0xFFFF0089, 0xFFFF008A, 0xFFFF008C, 0xFFFF008D, 0xFFFF008F, 0xFFFF0090, 0xFFFF0092, 0xFFFF0093, 0xFFFF0095, 0xFFFF0096, 0xFFFF0098, 0xFFFF009A, 0xFFFF009B, 0xFFFF009D, 0xFFFF009E, 0xFFFF00A0, 0xFFFF00A1, 0xFFFF00A3, 0xFFFF00A4, 0xFFFF00A6, 0xFFFF00A7, 0xFFFF00A9, 0xFFFF00AA, 0xFFFF00AC, 0xFFFF00AD, 0xFFFF00AF, 0xFFFF00B0, 0xFFFF00B2, 0xFFFF00B4, 0xFFFF00B5, 0xFFFF00B7, 0xFFFF00B8, 0xFFFF00BA, 0xFFFF00BB, 0xFFFF00BD, 0xFFFF00BE, 0xFFFF00C0, 0xFFFF00C1, 0xFFFF00C3, 0xFFFF00C4, 0xFFFF00C6, 0xFFFF00C7, 0xFFFF00C9, 0xFFFF00CA, 0xFFFF00CC, 0xFFFF00CE, 0xFFFF00CF, 0xFFFF00D1, 0xFFFF00D2, 0xFFFF00D4, 0xFFFF00D5, 0xFFFF00D7, 0xFFFF00D8, 0xFFFF00DA, 0xFFFF00DB, 0xFFFF00DD, 0xFFFF00DE, 0xFFFF00E0, 0xFFFF00E1, 0xFFFF00E3, 0xFFFF00E4, 0xFFFF00E6, 0xFFFF00E8, 0xFFFF00E9, 0xFFFF00EB, 0xFFFF00EC, 0xFFFF00EE, 0xFFFF00EF, 0xFFFF00F1, 0xFFFF00F2, 0xFFFF00F4, 0xFFFF00F5, 0xFFFF00F7, 0xFFFF00F8, 0xFFFF00FA, 0xFFFF00FB, 0xFFFF00FD, 0xFFFFFF00, 0xFFFDFF00, 0xFFFBFF00, 0xFFFAFF00, 0xFFF8FF00, 0xFFF7FF00, 0xFFF5FF00, 0xFFF4FF00, 0xFFF2FF00, 0xFFF1FF00, 0xFFEFFF00, 0xFFEEFF00, 0xFFECFF00, 0xFFEBFF00, 0xFFE9FF00, 0xFFE8FF00, 0xFFE6FF00, 0xFFE4FF00, 0xFFE3FF00, 0xFFE1FF00, 0xFFE0FF00, 0xFFDEFF00, 0xFFDDFF00, 0xFFDBFF00, 0xFFDAFF00, 0xFFD8FF00, 0xFFD7FF00, 0xFFD5FF00, 0xFFD4FF00, 0xFFD2FF00, 0xFFD1FF00, 0xFFCFFF00, 0xFFCEFF00, 0xFFCCFF00, 0xFFCAFF00, 0xFFC9FF00, 0xFFC7FF00, 0xFFC6FF00, 0xFFC4FF00, 0xFFC3FF00, 0xFFC1FF00, 0xFFC0FF00, 0xFFBEFF00, 0xFFBDFF00, 0xFFBBFF00, 0xFFBAFF00, 0xFFB8FF00, 0xFFB7FF00, 0xFFB5FF00, 0xFFB4FF00, 0xFFB2FF00, 0xFFB0FF00, 0xFFAFFF00, 0xFFADFF00, 0xFFACFF00, 0xFFAAFF00, 0xFFA9FF00, 0xFFA7FF00, 0xFFA6FF00, 0xFFA4FF00, 0xFFA3FF00, 0xFFA1FF00, 0xFFA0FF00, 0xFF9EFF00, 0xFF9DFF00, 0xFF9BFF00, 0xFF9AFF00, 0xFF98FF00, 0xFF96FF00, 0xFF95FF00, 0xFF93FF00, 0xFF92FF00, 0xFF90FF00, 0xFF8FFF00, 0xFF8DFF00, 0xFF8CFF00, 0xFF8AFF00, 0xFF89FF00, 0xFF87FF00, 0xFF86FF00, 0xFF84FF00, 0xFF83FF00, 0xFF81FF00, 0xFF80FF00, 0xFF7EFF00, 0xFF7CFF00, 0xFF7BFF00, 0xFF79FF00, 0xFF78FF00, 0xFF76FF00, 0xFF75FF00, 0xFF73FF00, 0xFF72FF00, 0xFF70FF00, 0xFF6FFF00, 0xFF6DFF00, 0xFF6CFF00, 0xFF6AFF00, 0xFF69FF00, 0xFF67FF00, 0xFF66FF00, 0xFF64FF00, 0xFF62FF00, 0xFF61FF00, 0xFF5FFF00, 0xFF5EFF00, 0xFF5CFF00, 0xFF5BFF00, 0xFF59FF00, 0xFF58FF00, 0xFF56FF00, 0xFF55FF00, 0xFF53FF00, 0xFF52FF00, 0xFF50FF00, 0xFF4FFF00, 0xFF4DFF00, 0xFF4BFF00, 0xFF4AFF00, 0xFF48FF00, 0xFF47FF00, 0xFF45FF00, 0xFF44FF00, 0xFF42FF00, 0xFF41FF00, 0xFF3FFF00, 0xFF3EFF00, 0xFF3CFF00, 0xFF3BFF00, 0xFF39FF00, 0xFF38FF00, 0xFF36FF00, 0xFF35FF00, 0xFF33FF00, 0xFF31FF00, 0xFF30FF00, 0xFF2EFF00, 0xFF2DFF00, 0xFF2BFF00, 0xFF2AFF00, 0xFF28FF00, 0xFF27FF00, 0xFF25FF00, 0xFF24FF00, 0xFF22FF00, 0xFF21FF00, 0xFF1FFF00, 0xFF1EFF00, 0xFF1CFF00, 0xFF1BFF00, 0xFF19FF00, 0xFF17FF00, 0xFF16FF00, 0xFF14FF00, 0xFF13FF00, 0xFF11FF00, 0xFF10FF00, 0xFF0EFF00, 0xFF0DFF00, 0xFF0BFF00, 0xFF0AFF00, 0xFF08FF00, 0xFF07FF00, 0xFF05FF00, 0xFF04FF00, 0xFF02FF00, 0xFF01FF00, 0xFF00FF00, 0xFF00FF02, 0xFF00FF03, 0xFF00FF05, 0xFF00FF06, 0xFF00FF08, 0xFF00FF09, 0xFF00FF0B, 0xFF00FF0C, 0xFF00FF0E, 0xFF00FF0F, 0xFF00FF11, 0xFF00FF12, 0xFF00FF14, 0xFF00FF15, 0xFF00FF17, 0xFF00FF18, 0xFF00FF1A, 0xFF00FF1C, 0xFF00FF1D, 0xFF00FF1F, 0xFF00FF20, 0xFF00FF22, 0xFF00FF23, 0xFF00FF25, 0xFF00FF26, 0xFF00FF28, 0xFF00FF29, 0xFF00FF2B, 0xFF00FF2C, 0xFF00FF2E, 0xFF00FF2F, 0xFF00FF31, 0xFF00FF32, 0xFF00FF34, 0xFF00FF36, 0xFF00FF37, 0xFF00FF39, 0xFF00FF3A, 0xFF00FF3C, 0xFF00FF3D, 0xFF00FF3F, 0xFF00FF40, 0xFF00FF42, 0xFF00FF43, 0xFF00FF45, 0xFF00FF46, 0xFF00FF48, 0xFF00FF49, 0xFF00FF4B, 0xFF00FF4D, 0xFF00FF4E, 0xFF00FF50, 0xFF00FF51, 0xFF00FF53, 0xFF00FF54, 0xFF00FF56, 0xFF00FF57, 0xFF00FF59, 0xFF00FF5A, 0xFF00FF5C, 0xFF00FF5D, 0xFF00FF5F, 0xFF00FF60, 0xFF00FF62, 0xFF00FF63, 0xFF00FF65, 0xFF00FF67, 0xFF00FF68, 0xFF00FF6A, 0xFF00FF6B, 0xFF00FF6D, 0xFF00FF6E, 0xFF00FF70, 0xFF00FF71, 0xFF00FF73, 0xFF00FF74, 0xFF00FF76, 0xFF00FF77, 0xFF00FF79, 0xFF00FF7A, 0xFF00FF7C, 0xFF00FF7D, 0xFF00FF7F, 0xFF00FF81, 0xFF00FF82, 0xFF00FF84, 0xFF00FF85, 0xFF00FF87, 0xFF00FF88, 0xFF00FF8A, 0xFF00FF8B, 0xFF00FF8D, 0xFF00FF8E, 0xFF00FF90, 0xFF00FF91, 0xFF00FF93, 0xFF00FF94, 0xFF00FF96, 0xFF00FF97, 0xFF00FF99, 0xFF00FF9B, 0xFF00FF9C, 0xFF00FF9E, 0xFF00FF9F, 0xFF00FFA1, 0xFF00FFA2, 0xFF00FFA4, 0xFF00FFA5, 0xFF00FFA7, 0xFF00FFA8, 0xFF00FFAA, 0xFF00FFAB, 0xFF00FFAD, 0xFF00FFAE, 0xFF00FFB0, 0xFF00FFB1, 0xFF00FFB3, 0xFF00FFB5, 0xFF00FFB6, 0xFF00FFB8, 0xFF00FFB9, 0xFF00FFBB, 0xFF00FFBC, 0xFF00FFBE, 0xFF00FFBF, 0xFF00FFC1, 0xFF00FFC2, 0xFF00FFC4, 0xFF00FFC5, 0xFF00FFC7, 0xFF00FFC8, 0xFF00FFCA, 0xFF00FFCB, 0xFF00FFCD, 0xFF00FFCF, 0xFF00FFD0, 0xFF00FFD2, 0xFF00FFD3, 0xFF00FFD5, 0xFF00FFD6, 0xFF00FFD8, 0xFF00FFD9, 0xFF00FFDB, 0xFF00FFDC, 0xFF00FFDE, 0xFF00FFDF, 0xFF00FFE1, 0xFF00FFE2, 0xFF00FFE4, 0xFF00FFE6, 0xFF00FFE7, 0xFF00FFE9, 0xFF00FFEA, 0xFF00FFEC, 0xFF00FFED, 0xFF00FFEF, 0xFF00FFF0, 0xFF00FFF2, 0xFF00FFF3, 0xFF00FFF5, 0xFF00FFF6, 0xFF00FFF8, 0xFF00FFF9, 0xFF00FFFB, 0xFF00FFFC, 0xFF00FFFE, 0xFF00FDFF, 0xFF00FCFF, 0xFF00FAFF, 0xFF00F9FF, 0xFF00F7FF, 0xFF00F6FF, 0xFF00F4FF, 0xFF00F3FF, 0xFF00F1FF, 0xFF00F0FF, 0xFF00EEFF, 0xFF00EDFF, 0xFF00EBFF, 0xFF00EAFF, 0xFF00E8FF, 0xFF00E7FF, 0xFF00E5FF, 0xFF00E3FF, 0xFF00E2FF, 0xFF00E0FF, 0xFF00DFFF, 0xFF00DDFF, 0xFF00DCFF, 0xFF00DAFF, 0xFF00D9FF, 0xFF00D7FF, 0xFF00D6FF, 0xFF00D4FF, 0xFF00D3FF, 0xFF00D1FF, 0xFF00D0FF, 0xFF00CEFF, 0xFF00CDFF, 0xFF00CBFF, 0xFF00C9FF, 0xFF00C8FF, 0xFF00C6FF, 0xFF00C5FF, 0xFF00C3FF, 0xFF00C2FF, 0xFF00C0FF, 0xFF00BFFF, 0xFF00BDFF, 0xFF00BCFF, 0xFF00BAFF, 0xFF00B9FF, 0xFF00B7FF, 0xFF00B6FF, 0xFF00B4FF, 0xFF00B3FF, 0xFF00B1FF, 0xFF00AFFF, 0xFF00AEFF, 0xFF00ACFF, 0xFF00ABFF, 0xFF00A9FF, 0xFF00A8FF, 0xFF00A6FF, 0xFF00A5FF, 0xFF00A3FF, 0xFF00A2FF, 0xFF00A0FF, 0xFF009FFF, 0xFF009DFF, 0xFF009CFF, 0xFF009AFF, 0xFF0099FF, 0xFF0097FF, 0xFF0095FF, 0xFF0094FF, 0xFF0092FF, 0xFF0091FF, 0xFF008FFF, 0xFF008EFF, 0xFF008CFF, 0xFF008BFF, 0xFF0089FF, 0xFF0088FF, 0xFF0086FF, 0xFF0085FF, 0xFF0083FF, 0xFF0082FF, 0xFF0080FF, 0xFF007EFF, 0xFF007DFF, 0xFF007BFF, 0xFF007AFF, 0xFF0078FF, 0xFF0077FF, 0xFF0075FF, 0xFF0074FF, 0xFF0072FF, 0xFF0071FF, 0xFF006FFF, 0xFF006EFF, 0xFF006CFF, 0xFF006BFF, 0xFF0069FF, 0xFF0068FF, 0xFF0066FF, 0xFF0064FF, 0xFF0063FF, 0xFF0061FF, 0xFF0060FF, 0xFF005EFF, 0xFF005DFF, 0xFF005BFF, 0xFF005AFF, 0xFF0058FF, 0xFF0057FF, 0xFF0055FF, 0xFF0054FF, 0xFF0052FF, 0xFF0051FF, 0xFF004FFF, 0xFF004EFF, 0xFF004CFF, 0xFF004AFF, 0xFF0049FF, 0xFF0047FF, 0xFF0046FF, 0xFF0044FF, 0xFF0043FF, 0xFF0041FF, 0xFF0040FF, 0xFF003EFF, 0xFF003DFF, 0xFF003BFF, 0xFF003AFF, 0xFF0038FF, 0xFF0037FF, 0xFF0035FF, 0xFF0034FF, 0xFF0032FF, 0xFF0030FF, 0xFF002FFF, 0xFF002DFF, 0xFF002CFF, 0xFF002AFF, 0xFF0029FF, 0xFF0027FF, 0xFF0026FF, 0xFF0024FF, 0xFF0023FF, 0xFF0021FF, 0xFF0020FF, 0xFF001EFF, 0xFF001DFF, 0xFF001BFF, 0xFF001AFF, 0xFF0018FF, 0xFF0016FF, 0xFF0015FF, 0xFF0013FF, 0xFF0012FF, 0xFF0010FF, 0xFF000FFF, 0xFF000DFF, 0xFF000CFF, 0xFF000AFF, 0xFF0009FF, 0xFF0007FF, 0xFF0006FF, 0xFF0004FF, 0xFF0003FF, 0xFF0001FF, 0xFF0000FF, 0xFF0100FF, 0xFF0300FF, 0xFF0400FF, 0xFF0600FF, 0xFF0700FF, 0xFF0900FF, 0xFF0A00FF, 0xFF0C00FF, 0xFF0D00FF, 0xFF0F00FF, 0xFF1000FF, 0xFF1200FF, 0xFF1300FF, 0xFF1500FF, 0xFF1600FF, 0xFF1800FF, 0xFF1A00FF, 0xFF1B00FF, 0xFF1D00FF, 0xFF1E00FF, 0xFF2000FF, 0xFF2100FF, 0xFF2300FF, 0xFF2400FF, 0xFF2600FF, 0xFF2700FF, 0xFF2900FF, 0xFF2A00FF, 0xFF2C00FF, 0xFF2D00FF, 0xFF2F00FF, 0xFF3000FF, 0xFF3200FF, 0xFF3400FF, 0xFF3500FF, 0xFF3700FF, 0xFF3800FF, 0xFF3A00FF, 0xFF3B00FF, 0xFF3D00FF, 0xFF3E00FF, 0xFF4000FF, 0xFF4100FF, 0xFF4300FF, 0xFF4400FF, 0xFF4600FF, 0xFF4700FF, 0xFF4900FF, 0xFF4A00FF, 0xFF4C00FF, 0xFF4E00FF, 0xFF4F00FF, 0xFF5100FF, 0xFF5200FF, 0xFF5400FF, 0xFF5500FF, 0xFF5700FF, 0xFF5800FF, 0xFF5A00FF, 0xFF5B00FF, 0xFF5D00FF, 0xFF5E00FF, 0xFF6000FF, 0xFF6100FF, 0xFF6300FF, 0xFF6400FF, 0xFF6600FF, 0xFF6800FF, 0xFF6900FF, 0xFF6B00FF, 0xFF6C00FF, 0xFF6E00FF, 0xFF6F00FF, 0xFF7100FF, 0xFF7200FF, 0xFF7400FF, 0xFF7500FF, 0xFF7700FF, 0xFF7800FF, 0xFF7A00FF, 0xFF7B00FF, 0xFF7D00FF, 0xFF7E00FF, 0xFF8000FF, 0xFF8200FF, 0xFF8300FF, 0xFF8500FF, 0xFF8600FF, 0xFF8800FF, 0xFF8900FF, 0xFF8B00FF, 0xFF8C00FF, 0xFF8E00FF, 0xFF8F00FF, 0xFF9100FF, 0xFF9200FF, 0xFF9400FF, 0xFF9500FF, 0xFF9700FF, 0xFF9800FF, 0xFF9A00FF, 0xFF9C00FF, 0xFF9D00FF, 0xFF9F00FF, 0xFFA000FF, 0xFFA200FF, 0xFFA300FF, 0xFFA500FF, 0xFFA600FF, 0xFFA800FF, 0xFFA900FF, 0xFFAB00FF, 0xFFAC00FF, 0xFFAE00FF, 0xFFAF00FF, 0xFFB100FF, 0xFFB300FF, 0xFFB400FF, 0xFFB600FF, 0xFFB700FF, 0xFFB900FF, 0xFFBA00FF, 0xFFBC00FF, 0xFFBD00FF, 0xFFBF00FF, 0xFFC000FF, 0xFFC200FF, 0xFFC300FF, 0xFFC500FF, 0xFFC600FF, 0xFFC800FF, 0xFFC900FF, 0xFFCB00FF, 0xFFCD00FF, 0xFFCE00FF, 0xFFD000FF, 0xFFD100FF, 0xFFD300FF, 0xFFD400FF, 0xFFD600FF, 0xFFD700FF, 0xFFD900FF, 0xFFDA00FF, 0xFFDC00FF, 0xFFDD00FF, 0xFFDF00FF, 0xFFE000FF, 0xFFE200FF, 0xFFE300FF, 0xFFE500FF, 0xFFE700FF, 0xFFE800FF, 0xFFEA00FF, 0xFFEB00FF, 0xFFED00FF, 0xFFEE00FF, 0xFFF000FF, 0xFFF100FF, 0xFFF300FF, 0xFFF400FF, 0xFFF600FF, 0xFFF700FF, 0xFFF900FF, 0xFFFA00FF, 0xFFFC00FF, 0xFFFD00FF, 0xFFFF00FE, 0xFFFF00FC, 0xFFFF00FB, 0xFFFF00F9, 0xFFFF00F8, 0xFFFF00F6, 0xFFFF00F5, 0xFFFF00F3, 0xFFFF00F2, 0xFFFF00F0, 0xFFFF00EF, 0xFFFF00ED, 0xFFFF00EC, 0xFFFF00EA, 0xFFFF00E9, 0xFFFF00E7, 0xFFFF00E6, 0xFFFF00E4, 0xFFFF00E2, 0xFFFF00E1, 0xFFFF00DF, 0xFFFF00DE, 0xFFFF00DC, 0xFFFF00DB, 0xFFFF00D9, 0xFFFF00D8, 0xFFFF00D6, 0xFFFF00D5, 0xFFFF00D3, 0xFFFF00D2, 0xFFFF00D0, 0xFFFF00CF, 0xFFFF00CD, 0xFFFF00CC, 0xFFFF00CA, 0xFFFF00C8, 0xFFFF00C7, 0xFFFF00C5, 0xFFFF00C4, 0xFFFF00C2, 0xFFFF00C1, 0xFFFF00BF, 0xFFFF00BE, 0xFFFF00BC, 0xFFFF00BB, 0xFFFF00B9, 0xFFFF00B8, 0xFFFF00B6, 0xFFFF00B5, 0xFFFF00B3, 0xFFFF00B1, 0xFFFF00B0, 0xFFFF00AE, 0xFFFF00AD, 0xFFFF00AB, 0xFFFF00AA, 0xFFFF00A8, 0xFFFF00A7, 0xFFFF00A5, 0xFFFF00A4, 0xFFFF00A2, 0xFFFF00A1, 0xFFFF009F, 0xFFFF009E, 0xFFFF009C, 0xFFFF009B, 0xFFFF0099, 0xFFFF0097, 0xFFFF0096, 0xFFFF0094, 0xFFFF0093, 0xFFFF0091, 0xFFFF0090, 0xFFFF008E, 0xFFFF008D, 0xFFFF008B, 0xFFFF008A, 0xFFFF0088, 0xFFFF0087, 0xFFFF0085, 0xFFFF0084, 0xFFFF0082, 0xFFFF0081, 0xFFFF007F, 0xFFFF007D, 0xFFFF007C, 0xFFFF007A, 0xFFFF0079, 0xFFFF0077, 0xFFFF0076, 0xFFFF0074, 0xFFFF0073, 0xFFFF0071, 0xFFFF0070, 0xFFFF006E, 0xFFFF006D, 0xFFFF006B, 0xFFFF006A, 0xFFFF0068, 0xFFFF0067, 0xFFFF0065, 0xFFFF0063, 0xFFFF0062, 0xFFFF0060, 0xFFFF005F, 0xFFFF005D, 0xFFFF005C, 0xFFFF005A, 0xFFFF0059, 0xFFFF0057, 0xFFFF0056, 0xFFFF0054, 0xFFFF0053, 0xFFFF0051, 0xFFFF0050, 0xFFFF004E, 0xFFFF004D, 0xFFFF004B, 0xFFFF0049, 0xFFFF0048, 0xFFFF0046, 0xFFFF0045, 0xFFFF0043, 0xFFFF0042, 0xFFFF0040, 0xFFFF003F, 0xFFFF003D, 0xFFFF003C, 0xFFFF003A, 0xFFFF0039, 0xFFFF0037, 0xFFFF0036, 0xFFFF0034, 0xFFFF0033, 0xFFFF0031, 0xFFFF002F, 0xFFFF002E, 0xFFFF002C, 0xFFFF002B, 0xFFFF0029, 0xFFFF0028, 0xFFFF0026, 0xFFFF0025, 0xFFFF0023, 0xFFFF0022, 0xFFFF0020, 0xFFFF001F, 0xFFFF001D, 0xFFFF001C, 0xFFFF001A, 0xFFFF0018, 0xFFFF0017, 0xFFFF0015, 0xFFFF0014, 0xFFFF0012, 0xFFFF0011, 0xFFFF000F, 0xFFFF000E, 0xFFFF000C, 0xFFFF000B, 0xFFFF0009, 0xFFFF0008, 0xFFFF0006, 0xFFFF0005, 0xFFFF0003, 0xFFFF0002, 0xFFFF0000, 0xFFFF0100, 0xFFFF0200, 0xFFFF0400, 0xFFFF0500, 0xFFFF0700, 0xFFFF0800, 0xFFFF0A00, 0xFFFF0B00, 0xFFFF0D00, 0xFFFF0E00, 0xFFFF1000, 0xFFFF1100, 0xFFFF1300, 0xFFFF1400, 0xFFFF1600, 0xFFFF1700, 0xFFFF1900, 0xFFFF1B00, 0xFFFF1C00, 0xFFFF1E00, 0xFFFF1F00, 0xFFFF2100, 0xFFFF2200, 0xFFFF2400, 0xFFFF2500, 0xFFFF2700, 0xFFFF2800, 0xFFFF2A00, 0xFFFF2B00, 0xFFFF2D00, 0xFFFF2E00, 0xFFFF3000, 0xFFFF3100, 0xFFFF3300, 0xFFFF3500, 0xFFFF3600, 0xFFFF3800, 0xFFFF3900, 0xFFFF3B00, 0xFFFF3C00, 0xFFFF3E00, 0xFFFF3F00, 0xFFFF4100, 0xFFFF4200, 0xFFFF4400, 0xFFFF4500, 0xFFFF4700, 0xFFFF4800, 0xFFFF4A00, 0xFFFF4B00, 0xFFFF4D00, 0xFFFF4F00, 0xFFFF5000, 0xFFFF5200, 0xFFFF5300, 0xFFFF5500, 0xFFFF5600, 0xFFFF5800, 0xFFFF5900, 0xFFFF5B00, 0xFFFF5C00, 0xFFFF5E00, 0xFFFF5F00, 0xFFFF6100, 0xFFFF6200, 0xFFFF6400, 0xFFFF6500, 0xFFFF6700, 0xFFFF6900, 0xFFFF6A00, 0xFFFF6C00, 0xFFFF6D00, 0xFFFF6F00, 0xFFFF7000, 0xFFFF7200, 0xFFFF7300, 0xFFFF7500, 0xFFFF7600, 0xFFFF7800, 0xFFFF7900, 0xFFFF7B00, 0xFFFF7C00, 0xFFFF7E00, 0xFFFF8000, 0xFFFF8100, 0xFFFF8300, 0xFFFF8400, 0xFFFF8600, 0xFFFF8700, 0xFFFF8900, 0xFFFF8A00, 0xFFFF8C00, 0xFFFF8D00, 0xFFFF8F00, 0xFFFF9000, 0xFFFF9200, 0xFFFF9300, 0xFFFF9500, 0xFFFF9600, 0xFFFF9800, 0xFFFF9A00, 0xFFFF9B00, 0xFFFF9D00, 0xFFFF9E00, 0xFFFFA000, 0xFFFFA100, 0xFFFFA300, 0xFFFFA400, 0xFFFFA600, 0xFFFFA700, 0xFFFFA900, 0xFFFFAA00, 0xFFFFAC00, 0xFFFFAD00, 0xFFFFAF00, 0xFFFFB000, 0xFFFFB200, 0xFFFFB400, 0xFFFFB500, 0xFFFFB700, 0xFFFFB800, 0xFFFFBA00, 0xFFFFBB00, 0xFFFFBD00, 0xFFFFBE00, 0xFFFFC000, 0xFFFFC100, 0xFFFFC300, 0xFFFFC400, 0xFFFFC600, 0xFFFFC700, 0xFFFFC900, 0xFFFFCA00, 0xFFFFCC00, 0xFFFFCE00, 0xFFFFCF00, 0xFFFFD100, 0xFFFFD200, 0xFFFFD400, 0xFFFFD500, 0xFFFFD700, 0xFFFFD800, 0xFFFFDA00, 0xFFFFDB00, 0xFFFFDD00, 0xFFFFDE00, 0xFFFFE000, 0xFFFFE100, 0xFFFFE300, 0xFFFFE400, 0xFFFFE600, 0xFFFFE800, 0xFFFFE900, 0xFFFFEB00, 0xFFFFEC00, 0xFFFFEE00, 0xFFFFEF00, 0xFFFFF100, 0xFFFFF200, 0xFFFFF400, 0xFFFFF500, 0xFFFFF700, 0xFFFFF800, 0xFFFFFA00, 0xFFFFFB00, 0xFFFFFD00, 0xFFFFFF00, 0xFFFBFB03, 0xFFF8F806, 0xFFF5F509, 0xFFF2F20C, 0xFFEFEF0F, 0xFFECEC12, 0xFFE9E915, 0xFFE6E618, 0xFFE3E31B, 0xFFE0E01E, 0xFFDDDD21, 0xFFDADA24, 0xFFD7D727, 0xFFD4D42A, 0xFFD1D12D, 0xFFCECE30, 0xFFCACA34, 0xFFC7C737, 0xFFC4C43A, 0xFFC1C13D, 0xFFBEBE40, 0xFFBBBB43, 0xFFB8B846, 0xFFB5B549, 0xFFB2B24C, 0xFFAFAF4F, 0xFFACAC52, 0xFFA9A955, 0xFFA6A658, 0xFFA3A35B, 0xFFA0A05E, 0xFF9D9D61, 0xFF9A9A64, 0xFF969668, 0xFF93936B, 0xFF90906E, 0xFF8D8D71, 0xFF8A8A74, 0xFF878777, 0xFF84847A, 0xFF81817D, 0xFF7E7E80, 0xFF7B7B83, 0xFF787886, 0xFF757589, 0xFF72728C, 0xFF6F6F8F, 0xFF6C6C92, 0xFF696995, 0xFF666698, 0xFF62629C, 0xFF5F5F9F, 0xFF5C5CA2, 0xFF5959A5, 0xFF5656A8, 0xFF5353AB, 0xFF5050AE, 0xFF4D4DB1, 0xFF4A4AB4, 0xFF4747B7, 0xFF4444BA, 0xFF4141BD, 0xFF3E3EC0, 0xFF3B3BC3, 0xFF3838C6, 0xFF3535C9, 0xFF3131CD, 0xFF2E2ED0, 0xFF2B2BD3, 0xFF2828D6, 0xFF2525D9, 0xFF2222DC, 0xFF1F1FDF, 0xFF1C1CE2, 0xFF1919E5, 0xFF1616E8, 0xFF1313EB, 0xFF1010EE, 0xFF0D0DF1, 0xFF0A0AF4, 0xFF0707F7, 0xFF0404FA, 0xFF0101FD, 0xFF0200FC, 0xFF0500F9, 0xFF0800F6, 0xFF0B00F3, 0xFF0E00F0, 0xFF1100ED, 0xFF1400EA, 0xFF1700E7, 0xFF1A00E4, 0xFF1D00E1, 0xFF2000DE, 0xFF2300DB, 0xFF2600D8, 0xFF2900D5, 0xFF2C00D2, 0xFF2F00CF, 0xFF3200CC, 0xFF3600C8, 0xFF3900C5, 0xFF3C00C2, 0xFF3F00BF, 0xFF4200BC, 0xFF4500B9, 0xFF4800B6, 0xFF4B00B3, 0xFF4E00B0, 0xFF5100AD, 0xFF5400AA, 0xFF5700A7, 0xFF5A00A4, 0xFF5D00A1, 0xFF60009E, 0xFF63009B, 0xFF670097, 0xFF6A0094, 0xFF6D0091, 0xFF70008E, 0xFF73008B, 0xFF760088, 0xFF790085, 0xFF7C0082, 0xFF7F007F, 0xFF82007C, 0xFF850079, 0xFF880076, 0xFF8B0073, 0xFF8E0070, 0xFF91006D, 0xFF94006A, 0xFF970067, 0xFF9B0063, 0xFF9E0060, 0xFFA1005D, 0xFFA4005A, 0xFFA70057, 0xFFAA0054, 0xFFAD0051, 0xFFB0004E, 0xFFB3004B, 0xFFB60048, 0xFFB90045, 0xFFBC0042, 0xFFBF003F, 0xFFC2003C, 0xFFC50039, 0xFFC80036, 0xFFCB0033, 0xFFCF002F, 0xFFD2002C, 0xFFD50029, 0xFFD80026, 0xFFDB0023, 0xFFDE0020, 0xFFE1001D, 0xFFE4001A, 0xFFE70017, 0xFFEA0014, 0xFFED0011, 0xFFF0000E, 0xFFF3000B, 0xFFF60008, 0xFFF90005, 0xFFFC0002, 0xFFFD0100, 0xFFFA0400, 0xFFF70700, 0xFFF40A00, 0xFFF10D00, 0xFFEE1000, 0xFFEB1300, 0xFFE81600, 0xFFE51900, 0xFFE21C00, 0xFFDF1F00, 0xFFDC2200, 0xFFD92500, 0xFFD62800, 0xFFD32B00, 0xFFD02E00, 0xFFCD3100, 0xFFC93500, 0xFFC63800, 0xFFC33B00, 0xFFC03E00, 0xFFBD4100, 0xFFBA4400, 0xFFB74700, 0xFFB44A00, 0xFFB14D00, 0xFFAE5000, 0xFFAB5300, 0xFFA85600, 0xFFA55900, 0xFFA25C00, 0xFF9F5F00, 0xFF9C6200, 0xFF996500, 0xFF956900, 0xFF926C00, 0xFF8F6F00, 0xFF8C7200, 0xFF897500, 0xFF867800, 0xFF837B00, 0xFF807E00, 0xFF7D8100, 0xFF7A8400, 0xFF778700, 0xFF748A00, 0xFF718D00, 0xFF6E9000, 0xFF6B9300, 0xFF689600, 0xFF649A00, 0xFF619D00, 0xFF5EA000, 0xFF5BA300, 0xFF58A600, 0xFF55A900, 0xFF52AC00, 0xFF4FAF00, 0xFF4CB200, 0xFF49B500, 0xFF46B800, 0xFF43BB00, 0xFF40BE00, 0xFF3DC100, 0xFF3AC400, 0xFF37C700, 0xFF34CA00, 0xFF30CE00, 0xFF2DD100, 0xFF2AD400, 0xFF27D700, 0xFF24DA00, 0xFF21DD00, 0xFF1EE000, 0xFF1BE300, 0xFF18E600, 0xFF15E900, 0xFF12EC00, 0xFF0FEF00, 0xFF0CF200, 0xFF09F500, 0xFF06F800, 0xFF03FB00, 0xFF00FE00, 0xFF03FB03, 0xFF06F806, 0xFF09F509, 0xFF0CF20C, 0xFF0FEF0F, 0xFF12EC12, 0xFF15E915, 0xFF18E618, 0xFF1BE31B, 0xFF1EE01E, 0xFF21DD21, 0xFF24DA24, 0xFF27D727, 0xFF2AD42A, 0xFF2DD12D, 0xFF30CE30, 0xFF34CA34, 0xFF37C737, 0xFF3AC43A, 0xFF3DC13D, 0xFF40BE40, 0xFF43BB43, 0xFF46B846, 0xFF49B549, 0xFF4CB24C, 0xFF4FAF4F, 0xFF52AC52, 0xFF55A955, 0xFF58A658, 0xFF5BA35B, 0xFF5EA05E, 0xFF619D61, 0xFF649A64, 0xFF689668, 0xFF6B936B, 0xFF6E906E, 0xFF718D71, 0xFF748A74, 0xFF778777, 0xFF7A847A, 0xFF7D817D, 0xFF807E80, 0xFF837B83, 0xFF867886, 0xFF897589, 0xFF8C728C, 0xFF8F6F8F, 0xFF926C92, 0xFF956995, 0xFF986698, 0xFF9C629C, 0xFF9F5F9F, 0xFFA25CA2, 0xFFA559A5, 0xFFA856A8, 0xFFAB53AB, 0xFFAE50AE, 0xFFB14DB1, 0xFFB44AB4, 0xFFB747B7, 0xFFBA44BA, 0xFFBD41BD, 0xFFC03EC0, 0xFFC33BC3, 0xFFC638C6, 0xFFC935C9, 0xFFCD31CD, 0xFFD02ED0, 0xFFD32BD3, 0xFFD628D6, 0xFFD925D9, 0xFFDC22DC, 0xFFDF1FDF, 0xFFE21CE2, 0xFFE519E5, 0xFFE816E8, 0xFFEB13EB, 0xFFEE10EE, 0xFFF10DF1, 0xFFF40AF4, 0xFFF707F7, 0xFFFA04FA, 0xFFFD01FD, 0xFFFC02FF, 0xFFF905FF, 0xFFF608FF, 0xFFF30BFF, 0xFFF00EFF, 0xFFED11FF, 0xFFEA14FF, 0xFFE717FF, 0xFFE41AFF, 0xFFE11DFF, 0xFFDE20FF, 0xFFDB23FF, 0xFFD826FF, 0xFFD529FF, 0xFFD22CFF, 0xFFCF2FFF, 0xFFCC32FF, 0xFFC836FF, 0xFFC539FF, 0xFFC23CFF, 0xFFBF3FFF, 0xFFBC42FF, 0xFFB945FF, 0xFFB648FF, 0xFFB34BFF, 0xFFB04EFF, 0xFFAD51FF, 0xFFAA54FF, 0xFFA757FF, 0xFFA45AFF, 0xFFA15DFF, 0xFF9E60FF, 0xFF9B63FF, 0xFF9767FF, 0xFF946AFF, 0xFF916DFF, 0xFF8E70FF, 0xFF8B73FF, 0xFF8876FF, 0xFF8579FF, 0xFF827CFF, 0xFF7F7FFF, 0xFF7C82FF, 0xFF7985FF, 0xFF7688FF, 0xFF738BFF, 0xFF708EFF, 0xFF6D91FF, 0xFF6A94FF, 0xFF6797FF, 0xFF639BFF, 0xFF609EFF, 0xFF5DA1FF, 0xFF5AA4FF, 0xFF57A7FF, 0xFF54AAFF, 0xFF51ADFF, 0xFF4EB0FF, 0xFF4BB3FF, 0xFF48B6FF, 0xFF45B9FF, 0xFF42BCFF, 0xFF3FBFFF, 0xFF3CC2FF, 0xFF39C5FF, 0xFF36C8FF, 0xFF33CBFF, 0xFF2FCFFF, 0xFF2CD2FF, 0xFF29D5FF, 0xFF26D8FF, 0xFF23DBFF, 0xFF20DEFF, 0xFF1DE1FF, 0xFF1AE4FF, 0xFF17E7FF, 0xFF14EAFF, 0xFF11EDFF, 0xFF0EF0FF, 0xFF0BF3FF, 0xFF08F6FF, 0xFF05F9FF, 0xFF02FCFF, 0xFF01FFFD, 0xFF04FFFA, 0xFF07FFF7, 0xFF0AFFF4, 0xFF0DFFF1, 0xFF10FFEE, 0xFF13FFEB, 0xFF16FFE8, 0xFF19FFE5, 0xFF1CFFE2, 0xFF1FFFDF, 0xFF22FFDC, 0xFF25FFD9, 0xFF28FFD6, 0xFF2BFFD3, 0xFF2EFFD0, 0xFF31FFCD, 0xFF35FFC9, 0xFF38FFC6, 0xFF3BFFC3, 0xFF3EFFC0, 0xFF41FFBD, 0xFF44FFBA, 0xFF47FFB7, 0xFF4AFFB4, 0xFF4DFFB1, 0xFF50FFAE, 0xFF53FFAB, 0xFF56FFA8, 0xFF59FFA5, 0xFF5CFFA2, 0xFF5FFF9F, 0xFF62FF9C, 0xFF65FF99, 0xFF69FF95, 0xFF6CFF92, 0xFF6FFF8F, 0xFF72FF8C, 0xFF75FF89, 0xFF78FF86, 0xFF7BFF83, 0xFF7EFF80, 0xFF81FF7D, 0xFF84FF7A, 0xFF87FF77, 0xFF8AFF74, 0xFF8DFF71, 0xFF90FF6E, 0xFF93FF6B, 0xFF96FF68, 0xFF9AFF64, 0xFF9DFF61, 0xFFA0FF5E, 0xFFA3FF5B, 0xFFA6FF58, 0xFFA9FF55, 0xFFACFF52, 0xFFAFFF4F, 0xFFB2FF4C, 0xFFB5FF49, 0xFFB8FF46, 0xFFBBFF43, 0xFFBEFF40, 0xFFC1FF3D, 0xFFC4FF3A, 0xFFC7FF37, 0xFFCAFF34, 0xFFCEFF30, 0xFFD1FF2D, 0xFFD4FF2A, 0xFFD7FF27, 0xFFDAFF24, 0xFFDDFF21, 0xFFE0FF1E, 0xFFE3FF1B, 0xFFE6FF18, 0xFFE9FF15, 0xFFECFF12, 0xFFEFFF0F, 0xFFF2FF0C, 0xFFF5FF09, 0xFFF8FF06, 0xFFFBFF03, 0xFFFEFF00, 0xFFFBFF00, 0xFFF8FF00, 0xFFF5FF00, 0xFFF2FF00, 0xFFEFFF00, 0xFFECFF00, 0xFFE9FF00, 0xFFE6FF00, 0xFFE3FF00, 0xFFE0FF00, 0xFFDDFF00, 0xFFDAFF00, 0xFFD7FF00, 0xFFD4FF00, 0xFFD1FF00, 0xFFCEFF00, 0xFFCAFF00, 0xFFC7FF00, 0xFFC4FF00, 0xFFC1FF00, 0xFFBEFF00, 0xFFBBFF00, 0xFFB8FF00, 0xFFB5FF00, 0xFFB2FF00, 0xFFAFFF00, 0xFFACFF00, 0xFFA9FF00, 0xFFA6FF00, 0xFFA3FF00, 0xFFA0FF00, 0xFF9DFF00, 0xFF9AFF00, 0xFF96FF00, 0xFF93FF00, 0xFF90FF00, 0xFF8DFF00, 0xFF8AFF00, 0xFF87FF00, 0xFF84FF00, 0xFF81FF00, 0xFF7EFF00, 0xFF7BFF00, 0xFF78FF00, 0xFF75FF00, 0xFF72FF00, 0xFF6FFF00, 0xFF6CFF00, 0xFF69FF00, 0xFF66FF00, 0xFF62FF00, 0xFF5FFF00, 0xFF5CFF00, 0xFF59FF00, 0xFF56FF00, 0xFF53FF00, 0xFF50FF00, 0xFF4DFF00, 0xFF4AFF00, 0xFF47FF00, 0xFF44FF00, 0xFF41FF00, 0xFF3EFF00, 0xFF3BFF00, 0xFF38FF00, 0xFF35FF00, 0xFF31FF00, 0xFF2EFF00, 0xFF2BFF00, 0xFF28FF00, 0xFF25FF00, 0xFF22FF00, 0xFF1FFF00, 0xFF1CFF00, 0xFF19FF00, 0xFF16FF00, 0xFF13FF00, 0xFF10FF00, 0xFF0DFF00, 0xFF0AFF00, 0xFF07FF00, 0xFF04FF00, 0xFF01FF00, 0xFF00FC02, 0xFF00F905, 0xFF00F608, 0xFF00F30B, 0xFF00F00E, 0xFF00ED11, 0xFF00EA14, 0xFF00E717, 0xFF00E41A, 0xFF00E11D, 0xFF00DE20, 0xFF00DB23, 0xFF00D826, 0xFF00D529, 0xFF00D22C, 0xFF00CF2F, 0xFF00CC32, 0xFF00C836, 0xFF00C539, 0xFF00C23C, 0xFF00BF3F, 0xFF00BC42, 0xFF00B945, 0xFF00B648, 0xFF00B34B, 0xFF00B04E, 0xFF00AD51, 0xFF00AA54, 0xFF00A757, 0xFF00A45A, 0xFF00A15D, 0xFF009E60, 0xFF009B63, 0xFF009767, 0xFF00946A, 0xFF00916D, 0xFF008E70, 0xFF008B73, 0xFF008876, 0xFF008579, 0xFF00827C, 0xFF007F7F, 0xFF007C82, 0xFF007985, 0xFF007688, 0xFF00738B, 0xFF00708E, 0xFF006D91, 0xFF006A94, 0xFF006797, 0xFF00639B, 0xFF00609E, 0xFF005DA1, 0xFF005AA4, 0xFF0057A7, 0xFF0054AA, 0xFF0051AD, 0xFF004EB0, 0xFF004BB3, 0xFF0048B6, 0xFF0045B9, 0xFF0042BC, 0xFF003FBF, 0xFF003CC2, 0xFF0039C5, 0xFF0036C8, 0xFF0033CB, 0xFF002FCF, 0xFF002CD2, 0xFF0029D5, 0xFF0026D8, 0xFF0023DB, 0xFF0020DE, 0xFF001DE1, 0xFF001AE4, 0xFF0017E7, 0xFF0014EA, 0xFF0011ED, 0xFF000EF0, 0xFF000BF3, 0xFF0008F6, 0xFF0005F9, 0xFF0002FC, 0xFF0100FF, 0xFF0400FF, 0xFF0700FF, 0xFF0A00FF, 0xFF0D00FF, 0xFF1000FF, 0xFF1300FF, 0xFF1600FF, 0xFF1900FF, 0xFF1C00FF, 0xFF1F00FF, 0xFF2200FF, 0xFF2500FF, 0xFF2800FF, 0xFF2B00FF, 0xFF2E00FF, 0xFF3100FF, 0xFF3500FF, 0xFF3800FF, 0xFF3B00FF, 0xFF3E00FF, 0xFF4100FF, 0xFF4400FF, 0xFF4700FF, 0xFF4A00FF, 0xFF4D00FF, 0xFF5000FF, 0xFF5300FF, 0xFF5600FF, 0xFF5900FF, 0xFF5C00FF, 0xFF5F00FF, 0xFF6200FF, 0xFF6500FF, 0xFF6900FF, 0xFF6C00FF, 0xFF6F00FF, 0xFF7200FF, 0xFF7500FF, 0xFF7800FF, 0xFF7B00FF, 0xFF7E00FF, 0xFF8100FF, 0xFF8400FF, 0xFF8700FF, 0xFF8A00FF, 0xFF8D00FF, 0xFF9000FF, 0xFF9300FF, 0xFF9600FF, 0xFF9A00FF, 0xFF9D00FF, 0xFFA000FF, 0xFFA300FF, 0xFFA600FF, 0xFFA900FF, 0xFFAC00FF, 0xFFAF00FF, 0xFFB200FF, 0xFFB500FF, 0xFFB800FF, 0xFFBB00FF, 0xFFBE00FF, 0xFFC100FF, 0xFFC400FF, 0xFFC700FF, 0xFFCA00FF, 0xFFCE00FF, 0xFFD100FF, 0xFFD400FF, 0xFFD700FF, 0xFFDA00FF, 0xFFDD00FF, 0xFFE000FF, 0xFFE300FF, 0xFFE600FF, 0xFFE900FF, 0xFFEC00FF, 0xFFEF00FF, 0xFFF200FF, 0xFFF500FF, 0xFFF800FF, 0xFFFB00FF, 0xFFFE00FF, 0xFFFF03FB, 0xFFFF06F8, 0xFFFF09F5, 0xFFFF0CF2, 0xFFFF0FEF, 0xFFFF12EC, 0xFFFF15E9, 0xFFFF18E6, 0xFFFF1BE3, 0xFFFF1EE0, 0xFFFF21DD, 0xFFFF24DA, 0xFFFF27D7, 0xFFFF2AD4, 0xFFFF2DD1, 0xFFFF30CE, 0xFFFF34CA, 0xFFFF37C7, 0xFFFF3AC4, 0xFFFF3DC1, 0xFFFF40BE, 0xFFFF43BB, 0xFFFF46B8, 0xFFFF49B5, 0xFFFF4CB2, 0xFFFF4FAF, 0xFFFF52AC, 0xFFFF55A9, 0xFFFF58A6, 0xFFFF5BA3, 0xFFFF5EA0, 0xFFFF619D, 0xFFFF649A, 0xFFFF6896, 0xFFFF6B93, 0xFFFF6E90, 0xFFFF718D, 0xFFFF748A, 0xFFFF7787, 0xFFFF7A84, 0xFFFF7D81, 0xFFFF807E, 0xFFFF837B, 0xFFFF8678, 0xFFFF8975, 0xFFFF8C72, 0xFFFF8F6F, 0xFFFF926C, 0xFFFF9569, 0xFFFF9866, 0xFFFF9C62, 0xFFFF9F5F, 0xFFFFA25C, 0xFFFFA559, 0xFFFFA856, 0xFFFFAB53, 0xFFFFAE50, 0xFFFFB14D, 0xFFFFB44A, 0xFFFFB747, 0xFFFFBA44, 0xFFFFBD41, 0xFFFFC03E, 0xFFFFC33B, 0xFFFFC638, 0xFFFFC935, 0xFFFFCD31, 0xFFFFD02E, 0xFFFFD32B, 0xFFFFD628, 0xFFFFD925, 0xFFFFDC22, 0xFFFFDF1F, 0xFFFFE21C, 0xFFFFE519, 0xFFFFE816, 0xFFFFEB13, 0xFFFFEE10, 0xFFFFF10D, 0xFFFFF40A, 0xFFFFF707, 0xFFFFFA04, 0xFFFFFD01, 0xFFFFFC00, 0xFFFFF900, 0xFFFFF600, 0xFFFFF300, 0xFFFFF000, 0xFFFFED00, 0xFFFFEA00, 0xFFFFE700, 0xFFFFE400, 0xFFFFE100, 0xFFFFDE00, 0xFFFFDB00, 0xFFFFD800, 0xFFFFD500, 0xFFFFD200, 0xFFFFCF00, 0xFFFFCC00, 0xFFFFC800, 0xFFFFC500, 0xFFFFC200, 0xFFFFBF00, 0xFFFFBC00, 0xFFFFB900, 0xFFFFB600, 0xFFFFB300, 0xFFFFB000, 0xFFFFAD00, 0xFFFFAA00, 0xFFFFA700, 0xFFFFA400, 0xFFFFA100, 0xFFFF9E00, 0xFFFF9B00, 0xFFFF9700, 0xFFFF9400, 0xFFFF9100, 0xFFFF8E00, 0xFFFF8B00, 0xFFFF8800, 0xFFFF8500, 0xFFFF8200, 0xFFFF7F00, 0xFFFF7C00, 0xFFFF7900, 0xFFFF7600, 0xFFFF7300, 0xFFFF7000, 0xFFFF6D00, 0xFFFF6A00, 0xFFFF6700, 0xFFFF6300, 0xFFFF6000, 0xFFFF5D00, 0xFFFF5A00, 0xFFFF5700, 0xFFFF5400, 0xFFFF5100, 0xFFFF4E00, 0xFFFF4B00, 0xFFFF4800, 0xFFFF4500, 0xFFFF4200, 0xFFFF3F00, 0xFFFF3C00, 0xFFFF3900, 0xFFFF3600, 0xFFFF3300, 0xFFFF2F00, 0xFFFF2C00, 0xFFFF2900, 0xFFFF2600, 0xFFFF2300, 0xFFFF2000, 0xFFFF1D00, 0xFFFF1A00, 0xFFFF1700, 0xFFFF1400, 0xFFFF1100, 0xFFFF0E00, 0xFFFF0B00, 0xFFFF0800, 0xFFFF0500, 0xFFFF0200, 0xFFFD0101, 0xFFFA0404, 0xFFF70707, 0xFFF40A0A, 0xFFF10D0D, 0xFFEE1010, 0xFFEB1313, 0xFFE81616, 0xFFE51919, 0xFFE21C1C, 0xFFDF1F1F, 0xFFDC2222, 0xFFD92525, 0xFFD62828, 0xFFD32B2B, 0xFFD02E2E, 0xFFCD3131, 0xFFC93535, 0xFFC63838, 0xFFC33B3B, 0xFFC03E3E, 0xFFBD4141, 0xFFBA4444, 0xFFB74747, 0xFFB44A4A, 0xFFB14D4D, 0xFFAE5050, 0xFFAB5353, 0xFFA85656, 0xFFA55959, 0xFFA25C5C, 0xFF9F5F5F, 0xFF9C6262, 0xFF996565, 0xFF956969, 0xFF926C6C, 0xFF8F6F6F, 0xFF8C7272, 0xFF897575, 0xFF867878, 0xFF837B7B, 0xFF807E7E, 0xFF7D8181, 0xFF7A8484, 0xFF778787, 0xFF748A8A, 0xFF718D8D, 0xFF6E9090, 0xFF6B9393, 0xFF689696, 0xFF649A9A, 0xFF619D9D, 0xFF5EA0A0, 0xFF5BA3A3, 0xFF58A6A6, 0xFF55A9A9, 0xFF52ACAC, 0xFF4FAFAF, 0xFF4CB2B2, 0xFF49B5B5, 0xFF46B8B8, 0xFF43BBBB, 0xFF40BEBE, 0xFF3DC1C1, 0xFF3AC4C4, 0xFF37C7C7, 0xFF34CACA, 0xFF30CECE, 0xFF2DD1D1, 0xFF2AD4D4, 0xFF27D7D7, 0xFF24DADA, 0xFF21DDDD, 0xFF1EE0E0, 0xFF1BE3E3, 0xFF18E6E6, 0xFF15E9E9, 0xFF12ECEC, 0xFF0FEFEF, 0xFF0CF2F2, 0xFF09F5F5, 0xFF06F8F8, 0xFF03FBFB, 0xFFFFFF00, 0xFFFFFF06, 0xFFFFFF0C, 0xFFFFFF12, 0xFFFFFF18, 0xFFFFFF1E, 0xFFFFFF24, 0xFFFFFF2A, 0xFFFFFF30, 0xFFFFFF37, 0xFFFFFF3D, 0xFFFFFF43, 0xFFFFFF49, 0xFFFFFF4F, 0xFFFFFF55, 0xFFFFFF5B, 0xFFFFFF61, 0xFFFFFF68, 0xFFFFFF6E, 0xFFFFFF74, 0xFFFFFF7A, 0xFFFFFF80, 0xFFFFFF86, 0xFFFFFF8C, 0xFFFFFF92, 0xFFFFFF98, 0xFFFFFF9F, 0xFFFFFFA5, 0xFFFFFFAB, 0xFFFFFFB1, 0xFFFFFFB7, 0xFFFFFFBD, 0xFFFFFFC3, 0xFFFFFFC9, 0xFFFFFFD0, 0xFFFFFFD6, 0xFFFFFFDC, 0xFFFFFFE2, 0xFFFFFFE8, 0xFFFFFFEE, 0xFFFFFFF4, 0xFFFFFFFA, 0xFFFCFCFF, 0xFFF6F6FF, 0xFFF0F0FF, 0xFFEAEAFF, 0xFFE4E4FF, 0xFFDEDEFF, 0xFFD8D8FF, 0xFFD2D2FF, 0xFFCCCCFF, 0xFFC5C5FF, 0xFFBFBFFF, 0xFFB9B9FF, 0xFFB3B3FF, 0xFFADADFF, 0xFFA7A7FF, 0xFFA1A1FF, 0xFF9B9BFF, 0xFF9494FF, 0xFF8E8EFF, 0xFF8888FF, 0xFF8282FF, 0xFF7C7CFF, 0xFF7676FF, 0xFF7070FF, 0xFF6A6AFF, 0xFF6363FF, 0xFF5D5DFF, 0xFF5757FF, 0xFF5151FF, 0xFF4B4BFF, 0xFF4545FF, 0xFF3F3FFF, 0xFF3939FF, 0xFF3333FF, 0xFF2C2CFF, 0xFF2626FF, 0xFF2020FF, 0xFF1A1AFF, 0xFF1414FF, 0xFF0E0EFF, 0xFF0808FF, 0xFF0202FF, 0xFF0404FF, 0xFF0A0AFF, 0xFF1010FF, 0xFF1616FF, 0xFF1C1CFF, 0xFF2222FF, 0xFF2828FF, 0xFF2E2EFF, 0xFF3535FF, 0xFF3B3BFF, 0xFF4141FF, 0xFF4747FF, 0xFF4D4DFF, 0xFF5353FF, 0xFF5959FF, 0xFF5F5FFF, 0xFF6565FF, 0xFF6C6CFF, 0xFF7272FF, 0xFF7878FF, 0xFF7E7EFF, 0xFF8484FF, 0xFF8A8AFF, 0xFF9090FF, 0xFF9696FF, 0xFF9D9DFF, 0xFFA3A3FF, 0xFFA9A9FF, 0xFFAFAFFF, 0xFFB5B5FF, 0xFFBBBBFF, 0xFFC1C1FF, 0xFFC7C7FF, 0xFFCECEFF, 0xFFD4D4FF, 0xFFDADAFF, 0xFFE0E0FF, 0xFFE6E6FF, 0xFFECECFF, 0xFFF2F2FF, 0xFFF8F8FF, 0xFFFEFEFF, 0xFFFFF8F8, 0xFFFFF2F2, 0xFFFFECEC, 0xFFFFE6E6, 0xFFFFE0E0, 0xFFFFDADA, 0xFFFFD4D4, 0xFFFFCECE, 0xFFFFC7C7, 0xFFFFC1C1, 0xFFFFBBBB, 0xFFFFB5B5, 0xFFFFAFAF, 0xFFFFA9A9, 0xFFFFA3A3, 0xFFFF9D9D, 0xFFFF9696, 0xFFFF9090, 0xFFFF8A8A, 0xFFFF8484, 0xFFFF7E7E, 0xFFFF7878, 0xFFFF7272, 0xFFFF6C6C, 0xFFFF6666, 0xFFFF5F5F, 0xFFFF5959, 0xFFFF5353, 0xFFFF4D4D, 0xFFFF4747, 0xFFFF4141, 0xFFFF3B3B, 0xFFFF3535, 0xFFFF2E2E, 0xFFFF2828, 0xFFFF2222, 0xFFFF1C1C, 0xFFFF1616, 0xFFFF1010, 0xFFFF0A0A, 0xFFFF0404, 0xFFFF0202, 0xFFFF0808, 0xFFFF0E0E, 0xFFFF1414, 0xFFFF1A1A, 0xFFFF2020, 0xFFFF2626, 0xFFFF2C2C, 0xFFFF3232, 0xFFFF3939, 0xFFFF3F3F, 0xFFFF4545, 0xFFFF4B4B, 0xFFFF5151, 0xFFFF5757, 0xFFFF5D5D, 0xFFFF6363, 0xFFFF6A6A, 0xFFFF7070, 0xFFFF7676, 0xFFFF7C7C, 0xFFFF8282, 0xFFFF8888, 0xFFFF8E8E, 0xFFFF9494, 0xFFFF9B9B, 0xFFFFA1A1, 0xFFFFA7A7, 0xFFFFADAD, 0xFFFFB3B3, 0xFFFFB9B9, 0xFFFFBFBF, 0xFFFFC5C5, 0xFFFFCBCB, 0xFFFFD2D2, 0xFFFFD8D8, 0xFFFFDEDE, 0xFFFFE4E4, 0xFFFFEAEA, 0xFFFFF0F0, 0xFFFFF6F6, 0xFFFFFCFC, 0xFFFAFFFA, 0xFFF4FFF4, 0xFFEEFFEE, 0xFFE8FFE8, 0xFFE2FFE2, 0xFFDCFFDC, 0xFFD6FFD6, 0xFFD0FFD0, 0xFFC9FFC9, 0xFFC3FFC3, 0xFFBDFFBD, 0xFFB7FFB7, 0xFFB1FFB1, 0xFFABFFAB, 0xFFA5FFA5, 0xFF9FFF9F, 0xFF99FF99, 0xFF92FF92, 0xFF8CFF8C, 0xFF86FF86, 0xFF80FF80, 0xFF7AFF7A, 0xFF74FF74, 0xFF6EFF6E, 0xFF68FF68, 0xFF61FF61, 0xFF5BFF5B, 0xFF55FF55, 0xFF4FFF4F, 0xFF49FF49, 0xFF43FF43, 0xFF3DFF3D, 0xFF37FF37, 0xFF30FF30, 0xFF2AFF2A, 0xFF24FF24, 0xFF1EFF1E, 0xFF18FF18, 0xFF12FF12, 0xFF0CFF0C, 0xFF06FF06, 0xFF00FF00, 0xFF06FF06, 0xFF0CFF0C, 0xFF12FF12, 0xFF18FF18, 0xFF1EFF1E, 0xFF24FF24, 0xFF2AFF2A, 0xFF30FF30, 0xFF37FF37, 0xFF3DFF3D, 0xFF43FF43, 0xFF49FF49, 0xFF4FFF4F, 0xFF55FF55, 0xFF5BFF5B, 0xFF61FF61, 0xFF68FF68, 0xFF6EFF6E, 0xFF74FF74, 0xFF7AFF7A, 0xFF80FF80, 0xFF86FF86, 0xFF8CFF8C, 0xFF92FF92, 0xFF98FF98, 0xFF9FFF9F, 0xFFA5FFA5, 0xFFABFFAB, 0xFFB1FFB1, 0xFFB7FFB7, 0xFFBDFFBD, 0xFFC3FFC3, 0xFFC9FFC9, 0xFFD0FFD0, 0xFFD6FFD6, 0xFFDCFFDC, 0xFFE2FFE2, 0xFFE8FFE8, 0xFFEEFFEE, 0xFFF4FFF4, 0xFFFAFFFA, 0xFFFFFCFF, 0xFFFFF6FF, 0xFFFFF0FF, 0xFFFFEAFF, 0xFFFFE4FF, 0xFFFFDEFF, 0xFFFFD8FF, 0xFFFFD2FF, 0xFFFFCCFF, 0xFFFFC5FF, 0xFFFFBFFF, 0xFFFFB9FF, 0xFFFFB3FF, 0xFFFFADFF, 0xFFFFA7FF, 0xFFFFA1FF, 0xFFFF9BFF, 0xFFFF94FF, 0xFFFF8EFF, 0xFFFF88FF, 0xFFFF82FF, 0xFFFF7CFF, 0xFFFF76FF, 0xFFFF70FF, 0xFFFF6AFF, 0xFFFF63FF, 0xFFFF5DFF, 0xFFFF57FF, 0xFFFF51FF, 0xFFFF4BFF, 0xFFFF45FF, 0xFFFF3FFF, 0xFFFF39FF, 0xFFFF33FF, 0xFFFF2CFF, 0xFFFF26FF, 0xFFFF20FF, 0xFFFF1AFF, 0xFFFF14FF, 0xFFFF0EFF, 0xFFFF08FF, 0xFFFF02FF, 0xFFFF04FF, 0xFFFF0AFF, 0xFFFF10FF, 0xFFFF16FF, 0xFFFF1CFF, 0xFFFF22FF, 0xFFFF28FF, 0xFFFF2EFF, 0xFFFF35FF, 0xFFFF3BFF, 0xFFFF41FF, 0xFFFF47FF, 0xFFFF4DFF, 0xFFFF53FF, 0xFFFF59FF, 0xFFFF5FFF, 0xFFFF65FF, 0xFFFF6CFF, 0xFFFF72FF, 0xFFFF78FF, 0xFFFF7EFF, 0xFFFF84FF, 0xFFFF8AFF, 0xFFFF90FF, 0xFFFF96FF, 0xFFFF9DFF, 0xFFFFA3FF, 0xFFFFA9FF, 0xFFFFAFFF, 0xFFFFB5FF, 0xFFFFBBFF, 0xFFFFC1FF, 0xFFFFC7FF, 0xFFFFCEFF, 0xFFFFD4FF, 0xFFFFDAFF, 0xFFFFE0FF, 0xFFFFE6FF, 0xFFFFECFF, 0xFFFFF2FF, 0xFFFFF8FF, 0xFFFFFEFF, 0xFFF8FFFF, 0xFFF2FFFF, 0xFFECFFFF, 0xFFE6FFFF, 0xFFE0FFFF, 0xFFDAFFFF, 0xFFD4FFFF, 0xFFCEFFFF, 0xFFC7FFFF, 0xFFC1FFFF, 0xFFBBFFFF, 0xFFB5FFFF, 0xFFAFFFFF, 0xFFA9FFFF, 0xFFA3FFFF, 0xFF9DFFFF, 0xFF96FFFF, 0xFF90FFFF, 0xFF8AFFFF, 0xFF84FFFF, 0xFF7EFFFF, 0xFF78FFFF, 0xFF72FFFF, 0xFF6CFFFF, 0xFF66FFFF, 0xFF5FFFFF, 0xFF59FFFF, 0xFF53FFFF, 0xFF4DFFFF, 0xFF47FFFF, 0xFF41FFFF, 0xFF3BFFFF, 0xFF35FFFF, 0xFF2EFFFF, 0xFF28FFFF, 0xFF22FFFF, 0xFF1CFFFF, 0xFF16FFFF, 0xFF10FFFF, 0xFF0AFFFF, 0xFF04FFFF, 0xFF02FFFF, 0xFF08FFFF, 0xFF0EFFFF, 0xFF14FFFF, 0xFF1AFFFF, 0xFF20FFFF, 0xFF26FFFF, 0xFF2CFFFF, 0xFF32FFFF, 0xFF39FFFF, 0xFF3FFFFF, 0xFF45FFFF, 0xFF4BFFFF, 0xFF51FFFF, 0xFF57FFFF, 0xFF5DFFFF, 0xFF63FFFF, 0xFF6AFFFF, 0xFF70FFFF, 0xFF76FFFF, 0xFF7CFFFF, 0xFF82FFFF, 0xFF88FFFF, 0xFF8EFFFF, 0xFF94FFFF, 0xFF9BFFFF, 0xFFA1FFFF, 0xFFA7FFFF, 0xFFADFFFF, 0xFFB3FFFF, 0xFFB9FFFF, 0xFFBFFFFF, 0xFFC5FFFF, 0xFFCBFFFF, 0xFFD2FFFF, 0xFFD8FFFF, 0xFFDEFFFF, 0xFFE4FFFF, 0xFFEAFFFF, 0xFFF0FFFF, 0xFFF6FFFF, 0xFFFCFFFF, 0xFFFFFFFA, 0xFFFFFFF4, 0xFFFFFFEE, 0xFFFFFFE8, 0xFFFFFFE2, 0xFFFFFFDC, 0xFFFFFFD6, 0xFFFFFFD0, 0xFFFFFFC9, 0xFFFFFFC3, 0xFFFFFFBD, 0xFFFFFFB7, 0xFFFFFFB1, 0xFFFFFFAB, 0xFFFFFFA5, 0xFFFFFF9F, 0xFFFFFF99, 0xFFFFFF92, 0xFFFFFF8C, 0xFFFFFF86, 0xFFFFFF80, 0xFFFFFF7A, 0xFFFFFF74, 0xFFFFFF6E, 0xFFFFFF68, 0xFFFFFF61, 0xFFFFFF5B, 0xFFFFFF55, 0xFFFFFF4F, 0xFFFFFF49, 0xFFFFFF43, 0xFFFFFF3D, 0xFFFFFF37, 0xFFFFFF30, 0xFFFFFF2A, 0xFFFFFF24, 0xFFFFFF1E, 0xFFFFFF18, 0xFFFFFF12, 0xFFFFFF0C, 0xFFFFFF06, 0xFFFFFF00, 0xFFFFFF06, 0xFFFFFF0C, 0xFFFFFF12, 0xFFFFFF18, 0xFFFFFF1E, 0xFFFFFF24, 0xFFFFFF2A, 0xFFFFFF30, 0xFFFFFF37, 0xFFFFFF3D, 0xFFFFFF43, 0xFFFFFF49, 0xFFFFFF4F, 0xFFFFFF55, 0xFFFFFF5B, 0xFFFFFF61, 0xFFFFFF68, 0xFFFFFF6E, 0xFFFFFF74, 0xFFFFFF7A, 0xFFFFFF80, 0xFFFFFF86, 0xFFFFFF8C, 0xFFFFFF92, 0xFFFFFF98, 0xFFFFFF9F, 0xFFFFFFA5, 0xFFFFFFAB, 0xFFFFFFB1, 0xFFFFFFB7, 0xFFFFFFBD, 0xFFFFFFC3, 0xFFFFFFC9, 0xFFFFFFD0, 0xFFFFFFD6, 0xFFFFFFDC, 0xFFFFFFE2, 0xFFFFFFE8, 0xFFFFFFEE, 0xFFFFFFF4, 0xFFFFFFFA, 0xFFFCFFFC, 0xFFF6FFF6, 0xFFF0FFF0, 0xFFEAFFEA, 0xFFE4FFE4, 0xFFDEFFDE, 0xFFD8FFD8, 0xFFD2FFD2, 0xFFCCFFCC, 0xFFC5FFC5, 0xFFBFFFBF, 0xFFB9FFB9, 0xFFB3FFB3, 0xFFADFFAD, 0xFFA7FFA7, 0xFFA1FFA1, 0xFF9BFF9B, 0xFF94FF94, 0xFF8EFF8E, 0xFF88FF88, 0xFF82FF82, 0xFF7CFF7C, 0xFF76FF76, 0xFF70FF70, 0xFF6AFF6A, 0xFF63FF63, 0xFF5DFF5D, 0xFF57FF57, 0xFF51FF51, 0xFF4BFF4B, 0xFF45FF45, 0xFF3FFF3F, 0xFF39FF39, 0xFF33FF33, 0xFF2CFF2C, 0xFF26FF26, 0xFF20FF20, 0xFF1AFF1A, 0xFF14FF14, 0xFF0EFF0E, 0xFF08FF08, 0xFF02FF02, 0xFF04FF04, 0xFF0AFF0A, 0xFF10FF10, 0xFF16FF16, 0xFF1CFF1C, 0xFF22FF22, 0xFF28FF28, 0xFF2EFF2E, 0xFF35FF35, 0xFF3BFF3B, 0xFF41FF41, 0xFF47FF47, 0xFF4DFF4D, 0xFF53FF53, 0xFF59FF59, 0xFF5FFF5F, 0xFF65FF65, 0xFF6CFF6C, 0xFF72FF72, 0xFF78FF78, 0xFF7EFF7E, 0xFF84FF84, 0xFF8AFF8A, 0xFF90FF90, 0xFF96FF96, 0xFF9DFF9D, 0xFFA3FFA3, 0xFFA9FFA9, 0xFFAFFFAF, 0xFFB5FFB5, 0xFFBBFFBB, 0xFFC1FFC1, 0xFFC7FFC7, 0xFFCEFFCE, 0xFFD4FFD4, 0xFFDAFFDA, 0xFFE0FFE0, 0xFFE6FFE6, 0xFFECFFEC, 0xFFF2FFF2, 0xFFF8FFF8, 0xFFFEFFFE, 0xFFF8F8FF, 0xFFF2F2FF, 0xFFECECFF, 0xFFE6E6FF, 0xFFE0E0FF, 0xFFDADAFF, 0xFFD4D4FF, 0xFFCECEFF, 0xFFC7C7FF, 0xFFC1C1FF, 0xFFBBBBFF, 0xFFB5B5FF, 0xFFAFAFFF, 0xFFA9A9FF, 0xFFA3A3FF, 0xFF9D9DFF, 0xFF9696FF, 0xFF9090FF, 0xFF8A8AFF, 0xFF8484FF, 0xFF7E7EFF, 0xFF7878FF, 0xFF7272FF, 0xFF6C6CFF, 0xFF6666FF, 0xFF5F5FFF, 0xFF5959FF, 0xFF5353FF, 0xFF4D4DFF, 0xFF4747FF, 0xFF4141FF, 0xFF3B3BFF, 0xFF3535FF, 0xFF2E2EFF, 0xFF2828FF, 0xFF2222FF, 0xFF1C1CFF, 0xFF1616FF, 0xFF1010FF, 0xFF0A0AFF, 0xFF0404FF, 0xFF0202FF, 0xFF0808FF, 0xFF0E0EFF, 0xFF1414FF, 0xFF1A1AFF, 0xFF2020FF, 0xFF2626FF, 0xFF2C2CFF, 0xFF3232FF, 0xFF3939FF, 0xFF3F3FFF, 0xFF4545FF, 0xFF4B4BFF, 0xFF5151FF, 0xFF5757FF, 0xFF5D5DFF, 0xFF6363FF, 0xFF6A6AFF, 0xFF7070FF, 0xFF7676FF, 0xFF7C7CFF, 0xFF8282FF, 0xFF8888FF, 0xFF8E8EFF, 0xFF9494FF, 0xFF9B9BFF, 0xFFA1A1FF, 0xFFA7A7FF, 0xFFADADFF, 0xFFB3B3FF, 0xFFB9B9FF, 0xFFBFBFFF, 0xFFC5C5FF, 0xFFCBCBFF, 0xFFD2D2FF, 0xFFD8D8FF, 0xFFDEDEFF, 0xFFE4E4FF, 0xFFEAEAFF, 0xFFF0F0FF, 0xFFF6F6FF, 0xFFFCFCFF, 0xFFFFFAFF, 0xFFFFF4FF, 0xFFFFEEFF, 0xFFFFE8FF, 0xFFFFE2FF, 0xFFFFDCFF, 0xFFFFD6FF, 0xFFFFD0FF, 0xFFFFC9FF, 0xFFFFC3FF, 0xFFFFBDFF, 0xFFFFB7FF, 0xFFFFB1FF, 0xFFFFABFF, 0xFFFFA5FF, 0xFFFF9FFF, 0xFFFF99FF, 0xFFFF92FF, 0xFFFF8CFF, 0xFFFF86FF, 0xFFFF80FF, 0xFFFF7AFF, 0xFFFF74FF, 0xFFFF6EFF, 0xFFFF68FF, 0xFFFF61FF, 0xFFFF5BFF, 0xFFFF55FF, 0xFFFF4FFF, 0xFFFF49FF, 0xFFFF43FF, 0xFFFF3DFF, 0xFFFF37FF, 0xFFFF30FF, 0xFFFF2AFF, 0xFFFF24FF, 0xFFFF1EFF, 0xFFFF18FF, 0xFFFF12FF, 0xFFFF0CFF, 0xFFFF06FF, 0xFFFF00FF, 0xFFFF06FF, 0xFFFF0CFF, 0xFFFF12FF, 0xFFFF18FF, 0xFFFF1EFF, 0xFFFF24FF, 0xFFFF2AFF, 0xFFFF30FF, 0xFFFF37FF, 0xFFFF3DFF, 0xFFFF43FF, 0xFFFF49FF, 0xFFFF4FFF, 0xFFFF55FF, 0xFFFF5BFF, 0xFFFF61FF, 0xFFFF68FF, 0xFFFF6EFF, 0xFFFF74FF, 0xFFFF7AFF, 0xFFFF80FF, 0xFFFF86FF, 0xFFFF8CFF, 0xFFFF92FF, 0xFFFF98FF, 0xFFFF9FFF, 0xFFFFA5FF, 0xFFFFABFF, 0xFFFFB1FF, 0xFFFFB7FF, 0xFFFFBDFF, 0xFFFFC3FF, 0xFFFFC9FF, 0xFFFFD0FF, 0xFFFFD6FF, 0xFFFFDCFF, 0xFFFFE2FF, 0xFFFFE8FF, 0xFFFFEEFF, 0xFFFFF4FF, 0xFFFFFAFF, 0xFFFFFFFC, 0xFFFFFFF6, 0xFFFFFFF0, 0xFFFFFFEA, 0xFFFFFFE4, 0xFFFFFFDE, 0xFFFFFFD8, 0xFFFFFFD2, 0xFFFFFFCC, 0xFFFFFFC5, 0xFFFFFFBF, 0xFFFFFFB9, 0xFFFFFFB3, 0xFFFFFFAD, 0xFFFFFFA7, 0xFFFFFFA1, 0xFFFFFF9B, 0xFFFFFF94, 0xFFFFFF8E, 0xFFFFFF88, 0xFFFFFF82, 0xFFFFFF7C, 0xFFFFFF76, 0xFFFFFF70, 0xFFFFFF6A, 0xFFFFFF63, 0xFFFFFF5D, 0xFFFFFF57, 0xFFFFFF51, 0xFFFFFF4B, 0xFFFFFF45, 0xFFFFFF3F, 0xFFFFFF39, 0xFFFFFF33, 0xFFFFFF2C, 0xFFFFFF26, 0xFFFFFF20, 0xFFFFFF1A, 0xFFFFFF14, 0xFFFFFF0E, 0xFFFFFF08, 0xFFFFFF02, 0xFFFFFF04, 0xFFFFFF0A, 0xFFFFFF10, 0xFFFFFF16, 0xFFFFFF1C, 0xFFFFFF22, 0xFFFFFF28, 0xFFFFFF2E, 0xFFFFFF35, 0xFFFFFF3B, 0xFFFFFF41, 0xFFFFFF47, 0xFFFFFF4D, 0xFFFFFF53, 0xFFFFFF59, 0xFFFFFF5F, 0xFFFFFF65, 0xFFFFFF6C, 0xFFFFFF72, 0xFFFFFF78, 0xFFFFFF7E, 0xFFFFFF84, 0xFFFFFF8A, 0xFFFFFF90, 0xFFFFFF96, 0xFFFFFF9D, 0xFFFFFFA3, 0xFFFFFFA9, 0xFFFFFFAF, 0xFFFFFFB5, 0xFFFFFFBB, 0xFFFFFFC1, 0xFFFFFFC7, 0xFFFFFFCE, 0xFFFFFFD4, 0xFFFFFFDA, 0xFFFFFFE0, 0xFFFFFFE6, 0xFFFFFFEC, 0xFFFFFFF2, 0xFFFFFFF8, 0xFFFFFFFE, 0xFFFFF8F8, 0xFFFFF2F2, 0xFFFFECEC, 0xFFFFE6E6, 0xFFFFE0E0, 0xFFFFDADA, 0xFFFFD4D4, 0xFFFFCECE, 0xFFFFC7C7, 0xFFFFC1C1, 0xFFFFBBBB, 0xFFFFB5B5, 0xFFFFAFAF, 0xFFFFA9A9, 0xFFFFA3A3, 0xFFFF9D9D, 0xFFFF9696, 0xFFFF9090, 0xFFFF8A8A, 0xFFFF8484, 0xFFFF7E7E, 0xFFFF7878, 0xFFFF7272, 0xFFFF6C6C, 0xFFFF6666, 0xFFFF5F5F, 0xFFFF5959, 0xFFFF5353, 0xFFFF4D4D, 0xFFFF4747, 0xFFFF4141, 0xFFFF3B3B, 0xFFFF3535, 0xFFFF2E2E, 0xFFFF2828, 0xFFFF2222, 0xFFFF1C1C, 0xFFFF1616, 0xFFFF1010, 0xFFFF0A0A, 0xFFFF0404, 0xFFFF0202, 0xFFFF0808, 0xFFFF0E0E, 0xFFFF1414, 0xFFFF1A1A, 0xFFFF2020, 0xFFFF2626, 0xFFFF2C2C, 0xFFFF3232, 0xFFFF3939, 0xFFFF3F3F, 0xFFFF4545, 0xFFFF4B4B, 0xFFFF5151, 0xFFFF5757, 0xFFFF5D5D, 0xFFFF6363, 0xFFFF6A6A, 0xFFFF7070, 0xFFFF7676, 0xFFFF7C7C, 0xFFFF8282, 0xFFFF8888, 0xFFFF8E8E, 0xFFFF9494, 0xFFFF9B9B, 0xFFFFA1A1, 0xFFFFA7A7, 0xFFFFADAD, 0xFFFFB3B3, 0xFFFFB9B9, 0xFFFFBFBF, 0xFFFFC5C5, 0xFFFFCBCB, 0xFFFFD2D2, 0xFFFFD8D8, 0xFFFFDEDE, 0xFFFFE4E4, 0xFFFFEAEA, 0xFFFFF0F0, 0xFFFFF6F6, 0xFFFFFCFC, 0xFFFAFFFF, 0xFFF4FFFF, 0xFFEEFFFF, 0xFFE8FFFF, 0xFFE2FFFF, 0xFFDCFFFF, 0xFFD6FFFF, 0xFFD0FFFF, 0xFFC9FFFF, 0xFFC3FFFF, 0xFFBDFFFF, 0xFFB7FFFF, 0xFFB1FFFF, 0xFFABFFFF, 0xFFA5FFFF, 0xFF9FFFFF, 0xFF99FFFF, 0xFF92FFFF, 0xFF8CFFFF, 0xFF86FFFF, 0xFF80FFFF, 0xFF7AFFFF, 0xFF74FFFF, 0xFF6EFFFF, 0xFF68FFFF, 0xFF61FFFF, 0xFF5BFFFF, 0xFF55FFFF, 0xFF4FFFFF, 0xFF49FFFF, 0xFF43FFFF, 0xFF3DFFFF, 0xFF37FFFF, 0xFF30FFFF, 0xFF2AFFFF, 0xFF24FFFF, 0xFF1EFFFF, 0xFF18FFFF, 0xFF12FFFF, 0xFF0CFFFF, 0xFF06FFFF, 0xFF191999, 0xFF000000, 0xFF020202, 0xFF050505, 0xFF070707, 0xFF0A0A0A, 0xFF0C0C0C, 0xFF0F0F0F, 0xFF121212, 0xFF141414, 0xFF171717, 0xFF191919, 0xFF1C1C1C, 0xFF1E1E1E, 0xFF212121, 0xFF242424, 0xFF262626, 0xFF292929, 0xFF2B2B2B, 0xFF2E2E2E, 0xFF303030, 0xFF333333, 0xFF363636, 0xFF383838, 0xFF3B3B3B, 0xFF3D3D3D, 0xFF404040, 0xFF424242, 0xFF454545, 0xFF484848, 0xFF4A4A4A, 0xFF4D4D4D, 0xFF4F4F4F, 0xFF525252, 0xFF555555, 0xFF575757, 0xFF5A5A5A, 0xFF5C5C5C, 0xFF5F5F5F, 0xFF616161, 0xFF646464, 0xFF676767, 0xFF696969, 0xFF6C6C6C, 0xFF6E6E6E, 0xFF717171, 0xFF737373, 0xFF767676, 0xFF797979, 0xFF7B7B7B, 0xFF7E7E7E, 0xFF808080, 0xFF838383, 0xFF858585, 0xFF888888, 0xFF8B8B8B, 0xFF8D8D8D, 0xFF909090, 0xFF929292, 0xFF959595, 0xFF979797, 0xFF9A9A9A, 0xFF9D9D9D, 0xFF9F9F9F, 0xFFA2A2A2, 0xFFA4A4A4, 0xFFA7A7A7, 0xFFAAAAAA, 0xFFACACAC, 0xFFAFAFAF, 0xFFB1B1B1, 0xFFB4B4B4, 0xFFB6B6B6, 0xFFB9B9B9, 0xFFBCBCBC, 0xFFBEBEBE, 0xFFC1C1C1, 0xFFC3C3C3, 0xFFC6C6C6, 0xFFC8C8C8, 0xFFCBCBCB, 0xFFCECECE, 0xFFD0D0D0, 0xFFD3D3D3, 0xFFD5D5D5, 0xFFD8D8D8, 0xFFDADADA, 0xFFDDDDDD, 0xFFE0E0E0, 0xFFE2E2E2, 0xFFE5E5E5, 0xFFE7E7E7, 0xFFEAEAEA, 0xFFECECEC, 0xFFEFEFEF, 0xFFF2F2F2, 0xFFF4F4F4, 0xFFF7F7F7, 0xFFF9F9F9, 0xFFFCFCFC, 0xFFFFFFFF, 0xFFFF00FF, 0xFFFD00FF, 0xFFFC00FF, 0xFFFA00FF, 0xFFF900FF, 0xFFF700FF, 0xFFF600FF, 0xFFF500FF, 0xFFF300FF, 0xFFF200FF, 0xFFF000FF, 0xFFEF00FF, 0xFFED00FF, 0xFFEC00FF, 0xFFEB00FF, 0xFFE900FF, 0xFFE800FF, 0xFFE600FF, 0xFFE500FF, 0xFFE300FF, 0xFFE200FF, 0xFFE100FF, 0xFFDF00FF, 0xFFDE00FF, 0xFFDC00FF, 0xFFDB00FF, 0xFFD900FF, 0xFFD800FF, 0xFFD700FF, 0xFFD500FF, 0xFFD400FF, 0xFFD200FF, 0xFFD100FF, 0xFFCF00FF, 0xFFCE00FF, 0xFFCD00FF, 0xFFCB00FF, 0xFFC900FF, 0xFFC700FF, 0xFFC400FF, 0xFFC200FF, 0xFFC000FF, 0xFFBE00FF, 0xFFBC00FF, 0xFFBA00FF, 0xFFB800FF, 0xFFB500FF, 0xFFB300FF, 0xFFB100FF, 0xFFAF00FF, 0xFFAD00FF, 0xFFAB00FF, 0xFFA900FF, 0xFFA600FF, 0xFFA400FF, 0xFFA200FF, 0xFFA000FF, 0xFF9E00FF, 0xFF9C00FF, 0xFF9A00FF, 0xFF9700FF, 0xFF9500FF, 0xFF9300FF, 0xFF9100FF, 0xFF8F00FF, 0xFF8D00FF, 0xFF8B00FF, 0xFF8800FF, 0xFF8600FF, 0xFF8400FF, 0xFF8200FF, 0xFF8000FF, 0xFF7D00FF, 0xFF7900FF, 0xFF7600FF, 0xFF7200FF, 0xFF6F00FF, 0xFF6B00FF, 0xFF6800FF, 0xFF6400FF, 0xFF6000FF, 0xFF5D00FF, 0xFF5900FF, 0xFF5600FF, 0xFF5200FF, 0xFF4F00FF, 0xFF4B00FF, 0xFF4700FF, 0xFF4400FF, 0xFF4000FF, 0xFF3D00FF, 0xFF3900FF, 0xFF3600FF, 0xFF3200FF, 0xFF2E00FF, 0xFF2B00FF, 0xFF2700FF, 0xFF2400FF, 0xFF2000FF, 0xFF1D00FF, 0xFF1900FF, 0xFF1500FF, 0xFF1200FF, 0xFF0E00FF, 0xFF0B00FF, 0xFF0700FF, 0xFF0400FF, 0xFF0000FF, 0xFF0000FF, 0xFF0000FF, 0xFF0000FF, 0xFF0000FF, 0xFF0000FF, 0xFF0000FF, 0xFF0000FF, 0xFF0000FF, 0xFF0000FF, 0xFF0000FF, 0xFF0000FF, 0xFF0000FF, 0xFF0000FF, 0xFF0000FF, 0xFF0000FF, 0xFF0000FF, 0xFF0000FF, 0xFF0000FF, 0xFF0000FF, 0xFF0000FF, 0xFF0000FF, 0xFF0000FF, 0xFF0000FF, 0xFF0000FF, 0xFF0000FF, 0xFF0000FF, 0xFF0000FF, 0xFF0000FF, 0xFF0000FF, 0xFF0000FF, 0xFF0000FF, 0xFF0000FF, 0xFF0000FF, 0xFF0000FF, 0xFF0000FF, 0xFF0000FF, 0xFF0001FF, 0xFF0003FF, 0xFF0004FF, 0xFF0005FF, 0xFF0007FF, 0xFF0008FF, 0xFF000AFF, 0xFF000BFF, 0xFF000DFF, 0xFF000EFF, 0xFF000FFF, 0xFF0011FF, 0xFF0012FF, 0xFF0014FF, 0xFF0015FF, 0xFF0017FF, 0xFF0018FF, 0xFF0019FF, 0xFF001BFF, 0xFF001CFF, 0xFF001EFF, 0xFF001FFF, 0xFF0021FF, 0xFF0022FF, 0xFF0023FF, 0xFF0025FF, 0xFF0026FF, 0xFF0028FF, 0xFF0029FF, 0xFF002BFF, 0xFF002CFF, 0xFF002DFF, 0xFF002FFF, 0xFF0030FF, 0xFF0032FF, 0xFF0033FF, 0xFF0036FF, 0xFF0038FF, 0xFF003AFF, 0xFF003CFF, 0xFF003EFF, 0xFF0040FF, 0xFF0042FF, 0xFF0045FF, 0xFF0047FF, 0xFF0049FF, 0xFF004BFF, 0xFF004DFF, 0xFF004FFF, 0xFF0051FF, 0xFF0054FF, 0xFF0056FF, 0xFF0058FF, 0xFF005AFF, 0xFF005CFF, 0xFF005EFF, 0xFF0060FF, 0xFF0063FF, 0xFF0065FF, 0xFF0067FF, 0xFF0069FF, 0xFF006BFF, 0xFF006DFF, 0xFF006FFF, 0xFF0072FF, 0xFF0074FF, 0xFF0076FF, 0xFF0078FF, 0xFF007AFF, 0xFF007CFF, 0xFF007EFF, 0xFF0081FF, 0xFF0083FF, 0xFF0085FF, 0xFF0087FF, 0xFF0089FF, 0xFF008BFF, 0xFF008DFF, 0xFF0090FF, 0xFF0092FF, 0xFF0094FF, 0xFF0096FF, 0xFF0098FF, 0xFF009AFF, 0xFF009CFF, 0xFF009FFF, 0xFF00A1FF, 0xFF00A3FF, 0xFF00A5FF, 0xFF00A7FF, 0xFF00A9FF, 0xFF00ABFF, 0xFF00AEFF, 0xFF00B0FF, 0xFF00B2FF, 0xFF00B4FF, 0xFF00B6FF, 0xFF00B8FF, 0xFF00BAFF, 0xFF00BDFF, 0xFF00BFFF, 0xFF00C1FF, 0xFF00C3FF, 0xFF00C5FF, 0xFF00C7FF, 0xFF00C9FF, 0xFF00CBFF, 0xFF00CDFF, 0xFF00CEFF, 0xFF00D0FF, 0xFF00D1FF, 0xFF00D3FF, 0xFF00D4FF, 0xFF00D5FF, 0xFF00D7FF, 0xFF00D8FF, 0xFF00DAFF, 0xFF00DBFF, 0xFF00DDFF, 0xFF00DEFF, 0xFF00DFFF, 0xFF00E1FF, 0xFF00E2FF, 0xFF00E4FF, 0xFF00E5FF, 0xFF00E7FF, 0xFF00E8FF, 0xFF00E9FF, 0xFF00EBFF, 0xFF00ECFF, 0xFF00EEFF, 0xFF00EFFF, 0xFF00F1FF, 0xFF00F2FF, 0xFF00F3FF, 0xFF00F5FF, 0xFF00F6FF, 0xFF00F8FF, 0xFF00F9FF, 0xFF00FBFF, 0xFF00FCFF, 0xFF00FDFF, 0xFF00FFFE, 0xFF00FFFD, 0xFF00FFFB, 0xFF00FFFA, 0xFF00FFF8, 0xFF00FFF7, 0xFF00FFF6, 0xFF00FFF4, 0xFF00FFF3, 0xFF00FFF1, 0xFF00FFF0, 0xFF00FFEE, 0xFF00FFED, 0xFF00FFEC, 0xFF00FFEA, 0xFF00FFE9, 0xFF00FFE7, 0xFF00FFE6, 0xFF00FFE4, 0xFF00FFE3, 0xFF00FFE2, 0xFF00FFE0, 0xFF00FFDF, 0xFF00FFDD, 0xFF00FFDC, 0xFF00FFDA, 0xFF00FFD9, 0xFF00FFD8, 0xFF00FFD6, 0xFF00FFD5, 0xFF00FFD3, 0xFF00FFD2, 0xFF00FFD0, 0xFF00FFCF, 0xFF00FFCE, 0xFF00FFCC, 0xFF00FFCA, 0xFF00FFC8, 0xFF00FFC6, 0xFF00FFC4, 0xFF00FFC2, 0xFF00FFC0, 0xFF00FFBD, 0xFF00FFBB, 0xFF00FFB9, 0xFF00FFB7, 0xFF00FFB5, 0xFF00FFB3, 0xFF00FFB1, 0xFF00FFAE, 0xFF00FFAC, 0xFF00FFAA, 0xFF00FFA8, 0xFF00FFA6, 0xFF00FFA4, 0xFF00FFA2, 0xFF00FF9F, 0xFF00FF9D, 0xFF00FF9B, 0xFF00FF99, 0xFF00FF97, 0xFF00FF95, 0xFF00FF93, 0xFF00FF90, 0xFF00FF8E, 0xFF00FF8C, 0xFF00FF8A, 0xFF00FF88, 0xFF00FF86, 0xFF00FF84, 0xFF00FF81, 0xFF00FF7F, 0xFF00FF7D, 0xFF00FF7B, 0xFF00FF79, 0xFF00FF77, 0xFF00FF75, 0xFF00FF72, 0xFF00FF70, 0xFF00FF6E, 0xFF00FF6C, 0xFF00FF6A, 0xFF00FF68, 0xFF00FF66, 0xFF00FF63, 0xFF00FF61, 0xFF00FF5F, 0xFF00FF5D, 0xFF00FF5B, 0xFF00FF59, 0xFF00FF57, 0xFF00FF54, 0xFF00FF52, 0xFF00FF50, 0xFF00FF4E, 0xFF00FF4C, 0xFF00FF4A, 0xFF00FF48, 0xFF00FF45, 0xFF00FF43, 0xFF00FF41, 0xFF00FF3F, 0xFF00FF3D, 0xFF00FF3B, 0xFF00FF39, 0xFF00FF36, 0xFF00FF34, 0xFF00FF32, 0xFF00FF31, 0xFF00FF2F, 0xFF00FF2E, 0xFF00FF2D, 0xFF00FF2B, 0xFF00FF2A, 0xFF00FF28, 0xFF00FF27, 0xFF00FF25, 0xFF00FF24, 0xFF00FF23, 0xFF00FF21, 0xFF00FF20, 0xFF00FF1E, 0xFF00FF1D, 0xFF00FF1B, 0xFF00FF1A, 0xFF00FF19, 0xFF00FF17, 0xFF00FF16, 0xFF00FF14, 0xFF00FF13, 0xFF00FF11, 0xFF00FF10, 0xFF00FF0F, 0xFF00FF0D, 0xFF00FF0C, 0xFF00FF0A, 0xFF00FF09, 0xFF00FF07, 0xFF00FF06, 0xFF00FF05, 0xFF00FF03, 0xFF00FF02, 0xFF00FF00, 0xFF00FF00, 0xFF02FF00, 0xFF03FF00, 0xFF04FF00, 0xFF06FF00, 0xFF07FF00, 0xFF09FF00, 0xFF0AFF00, 0xFF0CFF00, 0xFF0DFF00, 0xFF0EFF00, 0xFF10FF00, 0xFF11FF00, 0xFF13FF00, 0xFF14FF00, 0xFF16FF00, 0xFF17FF00, 0xFF18FF00, 0xFF1AFF00, 0xFF1BFF00, 0xFF1DFF00, 0xFF1EFF00, 0xFF20FF00, 0xFF21FF00, 0xFF22FF00, 0xFF24FF00, 0xFF25FF00, 0xFF27FF00, 0xFF28FF00, 0xFF2AFF00, 0xFF2BFF00, 0xFF2CFF00, 0xFF2EFF00, 0xFF2FFF00, 0xFF31FF00, 0xFF32FF00, 0xFF34FF00, 0xFF36FF00, 0xFF38FF00, 0xFF3AFF00, 0xFF3DFF00, 0xFF3FFF00, 0xFF41FF00, 0xFF43FF00, 0xFF45FF00, 0xFF47FF00, 0xFF49FF00, 0xFF4CFF00, 0xFF4EFF00, 0xFF50FF00, 0xFF52FF00, 0xFF54FF00, 0xFF56FF00, 0xFF58FF00, 0xFF5BFF00, 0xFF5DFF00, 0xFF5FFF00, 0xFF61FF00, 0xFF63FF00, 0xFF65FF00, 0xFF67FF00, 0xFF6AFF00, 0xFF6CFF00, 0xFF6EFF00, 0xFF70FF00, 0xFF72FF00, 0xFF74FF00, 0xFF76FF00, 0xFF79FF00, 0xFF7BFF00, 0xFF7DFF00, 0xFF7FFF00, 0xFF81FF00, 0xFF83FF00, 0xFF85FF00, 0xFF88FF00, 0xFF8AFF00, 0xFF8CFF00, 0xFF8EFF00, 0xFF90FF00, 0xFF92FF00, 0xFF94FF00, 0xFF97FF00, 0xFF99FF00, 0xFF9BFF00, 0xFF9DFF00, 0xFF9FFF00, 0xFFA1FF00, 0xFFA3FF00, 0xFFA6FF00, 0xFFA8FF00, 0xFFAAFF00, 0xFFACFF00, 0xFFAEFF00, 0xFFB0FF00, 0xFFB2FF00, 0xFFB5FF00, 0xFFB7FF00, 0xFFB9FF00, 0xFFBBFF00, 0xFFBDFF00, 0xFFBFFF00, 0xFFC1FF00, 0xFFC4FF00, 0xFFC6FF00, 0xFFC8FF00, 0xFFCAFF00, 0xFFCCFF00, 0xFFCDFF00, 0xFFCFFF00, 0xFFD0FF00, 0xFFD2FF00, 0xFFD3FF00, 0xFFD4FF00, 0xFFD6FF00, 0xFFD7FF00, 0xFFD9FF00, 0xFFDAFF00, 0xFFDCFF00, 0xFFDDFF00, 0xFFDEFF00, 0xFFE0FF00, 0xFFE1FF00, 0xFFE3FF00, 0xFFE4FF00, 0xFFE6FF00, 0xFFE7FF00, 0xFFE8FF00, 0xFFEAFF00, 0xFFEBFF00, 0xFFEDFF00, 0xFFEEFF00, 0xFFF0FF00, 0xFFF1FF00, 0xFFF2FF00, 0xFFF4FF00, 0xFFF5FF00, 0xFFF7FF00, 0xFFF8FF00, 0xFFFAFF00, 0xFFFBFF00, 0xFFFCFF00, 0xFFFEFF00, 0xFFFFFE00, 0xFFFFFD00, 0xFFFFFD00, 0xFFFFFC00, 0xFFFFFB00, 0xFFFFFB00, 0xFFFFFA00, 0xFFFFF900, 0xFFFFF800, 0xFFFFF800, 0xFFFFF700, 0xFFFFF600, 0xFFFFF600, 0xFFFFF500, 0xFFFFF400, 0xFFFFF300, 0xFFFFF300, 0xFFFFF200, 0xFFFFF100, 0xFFFFF100, 0xFFFFF000, 0xFFFFEF00, 0xFFFFEE00, 0xFFFFEE00, 0xFFFFED00, 0xFFFFEC00, 0xFFFFEC00, 0xFFFFEB00, 0xFFFFEA00, 0xFFFFE900, 0xFFFFE900, 0xFFFFE800, 0xFFFFE700, 0xFFFFE700, 0xFFFFE600, 0xFFFFE500, 0xFFFFE400, 0xFFFFE300, 0xFFFFE200, 0xFFFFE100, 0xFFFFE000, 0xFFFFDF00, 0xFFFFDE00, 0xFFFFDD00, 0xFFFFDC00, 0xFFFFDA00, 0xFFFFD900, 0xFFFFD800, 0xFFFFD700, 0xFFFFD600, 0xFFFFD500, 0xFFFFD400, 0xFFFFD300, 0xFFFFD200, 0xFFFFD100, 0xFFFFD000, 0xFFFFCF00, 0xFFFFCE00, 0xFFFFCD00, 0xFFFFCB00, 0xFFFFCA00, 0xFFFFC900, 0xFFFFC800, 0xFFFFC700, 0xFFFFC600, 0xFFFFC500, 0xFFFFC400, 0xFFFFC300, 0xFFFFC200, 0xFFFFC100, 0xFFFFC000, 0xFFFFBF00, 0xFFFFBE00, 0xFFFFBC00, 0xFFFFBB00, 0xFFFFBA00, 0xFFFFB900, 0xFFFFB800, 0xFFFFB700, 0xFFFFB600, 0xFFFFB500, 0xFFFFB400, 0xFFFFB300, 0xFFFFB200, 0xFFFFB100, 0xFFFFB000, 0xFFFFAF00, 0xFFFFAD00, 0xFFFFAC00, 0xFFFFAB00, 0xFFFFAA00, 0xFFFFA900, 0xFFFFA800, 0xFFFFA700, 0xFFFFA600, 0xFFFFA500, 0xFFFFA400, 0xFFFFA300, 0xFFFFA200, 0xFFFFA100, 0xFFFFA000, 0xFFFF9E00, 0xFFFF9D00, 0xFFFF9C00, 0xFFFF9B00, 0xFFFF9A00, 0xFFFF9900, 0xFFFF9800, 0xFFFF9700, 0xFFFF9700, 0xFFFF9600, 0xFFFF9500, 0xFFFF9500, 0xFFFF9400, 0xFFFF9300, 0xFFFF9200, 0xFFFF9200, 0xFFFF9100, 0xFFFF9000, 0xFFFF9000, 0xFFFF8F00, 0xFFFF8E00, 0xFFFF8D00, 0xFFFF8D00, 0xFFFF8C00, 0xFFFF8B00, 0xFFFF8B00, 0xFFFF8A00, 0xFFFF8900, 0xFFFF8800, 0xFFFF8800, 0xFFFF8700, 0xFFFF8600, 0xFFFF8600, 0xFFFF8500, 0xFFFF8400, 0xFFFF8300, 0xFFFF8300, 0xFFFF8200, 0xFFFF8100, 0xFFFF8100, 0xFFFF8000, 0xFFFF7F00, 0xFFFF7E00, 0xFFFF7E00, 0xFFFF7D00, 0xFFFF7C00, 0xFFFF7C00, 0xFFFF7B00, 0xFFFF7A00, 0xFFFF7900, 0xFFFF7900, 0xFFFF7800, 0xFFFF7700, 0xFFFF7700, 0xFFFF7600, 0xFFFF7500, 0xFFFF7400, 0xFFFF7400, 0xFFFF7300, 0xFFFF7200, 0xFFFF7200, 0xFFFF7100, 0xFFFF7000, 0xFFFF6F00, 0xFFFF6F00, 0xFFFF6E00, 0xFFFF6D00, 0xFFFF6D00, 0xFFFF6C00, 0xFFFF6B00, 0xFFFF6A00, 0xFFFF6A00, 0xFFFF6900, 0xFFFF6800, 0xFFFF6800, 0xFFFF6700, 0xFFFF6600, 0xFFFF6600, 0xFFFF6500, 0xFFFF6400, 0xFFFF6300, 0xFFFF6300, 0xFFFF6200, 0xFFFF6100, 0xFFFF6100, 0xFFFF6000, 0xFFFF5F00, 0xFFFF5E00, 0xFFFF5E00, 0xFFFF5D00, 0xFFFF5C00, 0xFFFF5C00, 0xFFFF5B00, 0xFFFF5A00, 0xFFFF5900, 0xFFFF5900, 0xFFFF5800, 0xFFFF5700, 0xFFFF5700, 0xFFFF5600, 0xFFFF5500, 0xFFFF5400, 0xFFFF5400, 0xFFFF5300, 0xFFFF5200, 0xFFFF5200, 0xFFFF5100, 0xFFFF5000, 0xFFFF4F00, 0xFFFF4F00, 0xFFFF4E00, 0xFFFF4D00, 0xFFFF4D00, 0xFFFF4C00, 0xFFFF4B00, 0xFFFF4A00, 0xFFFF4A00, 0xFFFF4900, 0xFFFF4800, 0xFFFF4800, 0xFFFF4700, 0xFFFF4600, 0xFFFF4500, 0xFFFF4500, 0xFFFF4400, 0xFFFF4300, 0xFFFF4300, 0xFFFF4200, 0xFFFF4100, 0xFFFF4000, 0xFFFF4000, 0xFFFF3F00, 0xFFFF3E00, 0xFFFF3E00, 0xFFFF3D00, 0xFFFF3C00, 0xFFFF3B00, 0xFFFF3B00, 0xFFFF3A00, 0xFFFF3900, 0xFFFF3900, 0xFFFF3800, 0xFFFF3700, 0xFFFF3600, 0xFFFF3600, 0xFFFF3500, 0xFFFF3400, 0xFFFF3400, 0xFFFF3300, 0xFFFF3200, 0xFFFF3000, 0xFFFF2F00, 0xFFFF2D00, 0xFFFF2C00, 0xFFFF2B00, 0xFFFF2900, 0xFFFF2800, 0xFFFF2600, 0xFFFF2500, 0xFFFF2300, 0xFFFF2200, 0xFFFF2100, 0xFFFF1F00, 0xFFFF1E00, 0xFFFF1C00, 0xFFFF1B00, 0xFFFF1900, 0xFFFF1800, 0xFFFF1700, 0xFFFF1500, 0xFFFF1400, 0xFFFF1200, 0xFFFF1100, 0xFFFF0F00, 0xFFFF0E00, 0xFFFF0D00, 0xFFFF0B00, 0xFFFF0A00, 0xFFFF0800, 0xFFFF0700, 0xFFFF0500, 0xFFFF0400, 0xFFFF0300, 0xFFFF0100, 0xFFFF0000, 0xFFFF0000, 0xFFFF0000, 0xFFFF0000, 0xFFFF0000, 0xFFFF0000, 0xFFFF0000, 0xFFFF0000, 0xFFFF0000, 0xFFFF0000, 0xFFFF0000, 0xFFFF0000, 0xFFFF0000, 0xFFFF0000, 0xFFFF0000, 0xFFFF0000, 0xFFFF0000, 0xFFFF0000, 0xFFFF0000, 0xFFFF0000, 0xFFFF0000, 0xFFFF0000, 0xFFFF0000, 0xFFFF0000, 0xFFFF0000, 0xFFFF0000, 0xFFFF0000, 0xFFFF0000, 0xFFFF0000, 0xFFFF0000, 0xFFFF0000, 0xFFFF0000, 0xFFFF0000, 0xFFFF0000, 0xFFFF0000, 0xFFFF0000, 0xFFFF0000, 0xFFFF0004, 0xFFFF0007, 0xFFFF000B, 0xFFFF000E, 0xFFFF0012, 0xFFFF0015, 0xFFFF0019, 0xFFFF001D, 0xFFFF0020, 0xFFFF0024, 0xFFFF0027, 0xFFFF002B, 0xFFFF002E, 0xFFFF0032, 0xFFFF0036, 0xFFFF0039, 0xFFFF003D, 0xFFFF0040, 0xFFFF0044, 0xFFFF0047, 0xFFFF004B, 0xFFFF004F, 0xFFFF0052, 0xFFFF0056, 0xFFFF0059, 0xFFFF005D, 0xFFFF0060, 0xFFFF0064, 0xFFFF0068, 0xFFFF006B, 0xFFFF006F, 0xFFFF0072, 0xFFFF0076, 0xFFFF0079, 0xFFFF007D, 0xFFFF0080, 0xFFFF0082, 0xFFFF0084, 0xFFFF0086, 0xFFFF0088, 0xFFFF008B, 0xFFFF008D, 0xFFFF008F, 0xFFFF0091, 0xFFFF0093, 0xFFFF0095, 0xFFFF0097, 0xFFFF009A, 0xFFFF009C, 0xFFFF009E, 0xFFFF00A0, 0xFFFF00A2, 0xFFFF00A4, 0xFFFF00A6, 0xFFFF00A9, 0xFFFF00AB, 0xFFFF00AD, 0xFFFF00AF, 0xFFFF00B1, 0xFFFF00B3, 0xFFFF00B5, 0xFFFF00B8, 0xFFFF00BA, 0xFFFF00BC, 0xFFFF00BE, 0xFFFF00C0, 0xFFFF00C2, 0xFFFF00C4, 0xFFFF00C7, 0xFFFF00C9, 0xFFFF00CB, 0xFFFF00CD, 0xFFFF00CE, 0xFFFF00CF, 0xFFFF00D1, 0xFFFF00D2, 0xFFFF00D4, 0xFFFF00D5, 0xFFFF00D7, 0xFFFF00D8, 0xFFFF00D9, 0xFFFF00DB, 0xFFFF00DC, 0xFFFF00DE, 0xFFFF00DF, 0xFFFF00E1, 0xFFFF00E2, 0xFFFF00E3, 0xFFFF00E5, 0xFFFF00E6, 0xFFFF00E8, 0xFFFF00E9, 0xFFFF00EB, 0xFFFF00EC, 0xFFFF00ED, 0xFFFF00EF, 0xFFFF00F0, 0xFFFF00F2, 0xFFFF00F3, 0xFFFF00F5, 0xFFFF00F6, 0xFFFF00F7, 0xFFFF00F9, 0xFFFF00FA, 0xFFFF00FC, 0xFFFF00FD, 0xFFFFFF7F, 0xFF7FFFFF, 0xFFFF7F7F, 0xFFA5E5A5, 0xFF999919, 0xFF991999, 0xFF199999, 0xFFBFBFFF, 0xFFFFCC7F, 0xFFCCFFFF, 0xFF66B2B2, 0xFF84BF00, 0xFFB24C66, 0xFFB78C4C, 0xFF8CB266, 0xFF8C3F99, 0xFFB27F7F, 0xFFFF7F7F, 0xFFFFBFDD, 0xFF3FFFBF, 0xFFBFFF3F, 0xFF337FCC, 0xFFD8D8FF, 0xFFD8337F, 0xFFBA8C84, 0xFFD9FFFF, 0xFFCC7FFF, 0xFFC2FF00, 0xFFFFB5B5, 0xFFB3FFFF, 0xFFB3E3F5, 0xFFAB5CF2, 0xFF8AFF00, 0xFFBFA6A6, 0xFFF0C8A0, 0xFFFF7F00, 0xFF1FF01F, 0xFF7FD1E3, 0xFF8F3FD4, 0xFF3DFF00, 0xFFE6E6E6, 0xFFBFC2C7, 0xFFA6A6AB, 0xFF8A99C7, 0xFF9C7AC7, 0xFFE06633, 0xFFF090A0, 0xFF50D050, 0xFFC87F33, 0xFF7D7FB0, 0xFFC28F8F, 0xFF668F8F, 0xFFBD7FE3, 0xFFFFA100, 0xFFA62929, 0xFF5CB8D1, 0xFF702EB0, 0xFF00FF00, 0xFF94FFFF, 0xFF94E0E0, 0xFF73C2C9, 0xFF54B5B5, 0xFF3B9E9E, 0xFF248F8F, 0xFF0A7D8C, 0xFF006985, 0xFFC0C0C0, 0xFFFFD98F, 0xFFA67573, 0xFF667F7F, 0xFF9E63B5, 0xFFD47A00, 0xFF940094, 0xFF429EB0, 0xFF57178F, 0xFF00C900, 0xFF70D4FF, 0xFFFFFFC7, 0xFFD9FFC7, 0xFFC7FFC7, 0xFFA3FFC7, 0xFF8FFFC7, 0xFF61FFC7, 0xFF45FFC7, 0xFF30FFC7, 0xFF1FFFC7, 0xFF00FF9C, 0xFF00E675, 0xFF00D452, 0xFF00BF38, 0xFF00AB24, 0xFF4DC2FF, 0xFF4DA6FF, 0xFF2194D6, 0xFF267DAB, 0xFF266696, 0xFF175487, 0xFFD0D0E0, 0xFFFFD123, 0xFFB8B8D0, 0xFFA6544D, 0xFF575961, 0xFF9E4FB5, 0xFFAB5C00, 0xFF754F45, 0xFF428296, 0xFF420066, 0xFF007D00, 0xFF70ABFA, 0xFF00BAFF, 0xFF00A1FF, 0xFF008FFF, 0xFF007FFF, 0xFF006BFF, 0xFF545CF2, 0xFF785CE3, 0xFF8A4FE3, 0xFFA136D4, 0xFFB31FD4, 0xFFB31FBA, 0xFFB30DA6, 0xFFBD0D87, 0xFFC70066, 0xFFCC0059, 0xFFD1004F, 0xFFD90045, 0xFFE00038, 0xFFE6002E, 0xFFEB0026, 0xFFE5E5E5]));
c$.moreColors = c$.prototype.moreColors =  new java.util.Hashtable ();
Clazz_defineStatics (c$,
"LEN", 0,
"RESV", 1,
"CUSTOMTYPE", 2,
"PRIORITY", 3,
"BFACTOR", 4,
"OCCUPANCY", 5,
"VDW", 6,
"PARTIALCHARGE", 7,
"COLOR", 9,
"ID", 10,
"FLAGS", 11,
"UNIQUEID", 13,
"DISCRETESTATE", 14,
"ELECRADIUS", 15,
"RANK", 16,
"TEXTTYPE", 17,
"CUSTOM", 18,
"LABEL", 19,
"VISREP", 20,
"HETATM", 21,
"BONDED", 22,
"MASK", 24,
"HBDONOR", 25,
"HBACCEPT", 26,
"HASSETTING", 27,
"FORMALCHARGE", 28,
"MMSTEREO", 29,
"CARTOON", 30,
"GEOM", 31,
"VALENCE", 32,
"PROTONS", 33,
"CHAIN", 34,
"SEGI", 35,
"NAME", 36,
"ELEM", 37,
"RESI", 38,
"SSTYPE", 39,
"ALTLOC", 40,
"RESN", 41,
"INSCODE", 42,
"CHEMFLAG", 43,
"PROTEKTED", 44,
"ANISOU", 45,
"HETMASK", 46,
"BONMASK", 47,
"MASMASK", 48,
"HBDMASK", 49,
"HBAMASK", 50,
"SETMASK", 51,
"v176",  Clazz_newIntArray (-1, [0, 164, 1, 0, 2, 4, 3, 8, 4, 12, 5, 16, 6, 20, 7, 24, 9, 32, 10, 36, 11, 40, 13, 48, 14, 52, 15, 56, 16, 60, 17, -64, 18, -68, 19, -72, 20, 76, 28, 80, 29, 82, 30, 83, 21, 84, 22, 85, 43, 86, 31, 87, 32, 88, 24, 90, 44, 91, 33, 92, 25, 93, 26, 94, 27, 95, 46, 0x01, 47, 0x01, 48, 0x01, 49, 0x01, 50, 0x01, 51, 0x01, 34, 96, 35, 100, 36, 105, 37, 110, 38, 115, 39, 122, 40, 124, 41, 126, 45, 132]),
"v177",  Clazz_newIntArray (-1, [0, 144, 1, 8, 2, 12, 3, 16, 4, 20, 5, 24, 6, 28, 7, 32, 9, 40, 10, 44, 11, 48, 13, 56, 14, 60, 15, 64, 16, 68, 17, -72, 18, -76, 19, -80, 20, 84, 21, 96, 22, 96, 24, 96, 25, 97, 26, 97, 27, 97, 46, 0x01, 47, 0x02, 48, 0x08, 49, 0x01, 50, 0x02, 51, 0x04, 28, 98, 29, 99, 30, 100, 31, 101, 32, 102, 33, 103, 34, 104, 35, 108, 36, 113, 37, 118, 38, 123, 39, 129, 40, 131, 41, 133, 43, 140, 44, 141]),
"v181",  Clazz_newIntArray (-1, [0, 120, 45, 0, 35, -12, 34, -16, 41, -20, 36, -24, 17, -28, 18, -32, 19, -36, 1, 40, 2, 44, 3, 48, 4, 52, 5, 56, 6, 60, 7, 64, 9, 68, 10, 72, 11, 76, 13, 80, 14, 84, 15, 88, 16, 92, 20, 96, 21, 100, 22, 100, 24, 100, 25, 100, 26, 100, 27, 100, 46, 0x01, 47, 0x02, 48, 0x04, 49, 0x08, 50, 0x10, 51, 0x20, 28, 101, 30, 102, 31, 103, 32, 104, 33, 105, 42, 106, 37, 107, 39, 112, 40, 114, 29, 116, 43, 117, 44, 118]),
"BATOM1", 1,
"BATOM2", 2,
"BORDER", 3,
"BID", 4,
"BUNIQUEID", 5,
"BHASSETTING", 6,
"v176b",  Clazz_newIntArray (-1, [0, 32, 1, 0, 2, 4, 3, 8, 4, 12, 5, 16, 6, 26]),
"v177b",  Clazz_newIntArray (-1, [0, 24, 1, 0, 2, 4, 4, 8, 5, 12, 3, 20, 6, 23]),
"v181b",  Clazz_newIntArray (-1, [0, 20, 1, 0, 2, 4, 4, 8, 5, 12, 3, 16, 6, 18]));
});
Clazz_declarePackage ("J.adapter.readers.pymol");
Clazz_load (null, "J.adapter.readers.pymol.JmolObject", ["java.lang.Float", "JU.P3", "$.PT", "$.SB", "J.adapter.readers.pymol.PyMOLReader", "JU.BSUtil", "$.Escape"], function () {
c$ = Clazz_decorateAsClass (function () {
this.id = 0;
this.bsAtoms = null;
this.info = null;
this.size = -1;
this.colors = null;
this.modelIndex = -2147483648;
this.jmolName = null;
this.argb = 0;
this.translucency = 0;
this.visible = true;
this.rd = null;
this.cacheID = null;
Clazz_instantialize (this, arguments);
}, J.adapter.readers.pymol, "JmolObject");
Clazz_makeConstructor (c$, 
function (id, branchNameID, bsAtoms, info) {
this.id = id;
this.bsAtoms = bsAtoms;
this.info = info;
this.jmolName = branchNameID;
}, "~N,~S,JU.BS,~O");
Clazz_defineMethod (c$, "offset", 
function (modelOffset, atomOffset) {
if (modelOffset > 0) {
if (this.modelIndex != -2147483648) this.modelIndex += modelOffset;
switch (this.id) {
case 1610625028:
case 12294:
return;
case 4115:
var i = (this.info).intValue ();
if (i >= 0) this.info = Integer.$valueOf (modelOffset + i);
return;
case 1073742031:
var movie = this.info;
var frames = movie.get ("frames");
for (var j = frames.length; --j >= 0; ) frames[j] += modelOffset;

return;
}
}if (atomOffset <= 0) return;
if (this.id == 12290) {
var map = (this.info).values ();
for (var o, $o = map.iterator (); $o.hasNext () && ((o = $o.next ()) || true);) JU.BSUtil.offset (o, 0, atomOffset);

return;
}if (this.bsAtoms != null) JU.BSUtil.offset (this.bsAtoms, 0, atomOffset);
if (this.colors != null) {
var colixes = this.colors[0];
var c =  Clazz_newShortArray (colixes.length + atomOffset, 0);
System.arraycopy (colixes, 0, c, atomOffset, colixes.length);
this.colors[0] = c;
}}, "~N,~N");
Clazz_defineMethod (c$, "finalizeObject", 
function (pymolScene, m, mepList, doCache) {
var sm = m.sm;
var color = "color";
var sID;
var sb = null;
if (this.bsAtoms != null) this.modelIndex = this.getModelIndex (m);
switch (this.id) {
case 2097194:
sm.vwr.displayAtoms (this.bsAtoms, false, false, 1275069441, true);
return;
case 12295:
var bs = sm.vwr.getModelUndeletedAtomsBitSet (this.argb);
JU.BSUtil.invertInPlace (bs, sm.vwr.ms.ac);
sm.vwr.select (bs, false, 0, true);
sm.restrictSelected (false, true);
return;
case 1610625028:
case 12294:
if (this.bsAtoms == null) {
if (this.info == null) {
sm.vwr.displayAtoms (null, true, false, 0, true);
}sm.vwr.setObjectProp (this.info, this.id);
} else {
sm.vwr.displayAtoms (this.bsAtoms, this.id == 1610625028, false, 1275069441, true);
}return;
case 12290:
sm.vwr.defineAtomSets (this.info);
return;
case 1073742031:
sm.vwr.am.setMovie (this.info);
return;
case 4115:
var frame = (this.info).intValue ();
if (frame >= 0) {
sm.vwr.setCurrentModelIndex (frame);
} else {
sm.vwr.setAnimationRange (-1, -1);
sm.vwr.setCurrentModelIndex (-1);
}return;
case 1073742139:
sm.vwr.stm.saveScene (this.jmolName, this.info);
sm.vwr.stm.saveOrientation (this.jmolName, (this.info).get ("pymolView"));
return;
case 5:
sm.loadShape (this.id);
sm.setShapePropertyBs (this.id, "pymolLabels", this.info, this.bsAtoms);
return;
case 1677721602:
break;
case 659488:
case 1:
if (this.size != -1) {
sm.setShapeSizeBs (1, this.size, null, this.bsAtoms);
var bsBonds = (sm.getShapePropertyIndex (1, "sets", 0))[1];
pymolScene.setUniqueBonds (bsBonds, this.id == 1);
this.size = -1;
}this.id = 1;
break;
case 1140850689:
this.id = 0;
break;
case 0:
break;
case 10:
case 9:
sm.loadShape (this.id);
var bsCarb = m.getAtoms (2097188, null);
JU.BSUtil.andNot (this.bsAtoms, bsCarb);
break;
case 16:
sm.loadShape (this.id);
sm.setShapePropertyBs (this.id, "ignore", JU.BSUtil.copyInvert (this.bsAtoms, sm.vwr.ms.ac), null);
break;
default:
if (!this.visible) return;
break;
}
switch (this.id) {
case 23:
sm.vwr.setCGO (this.info);
break;
case 16:
case 0:
case 7:
case 20:
case 11:
case 9:
case 10:
case 24:
if (Clazz_instanceOf (this.info, Array)) {
sm.loadShape (this.id);
sm.setShapePropertyBs (this.id, "params", this.info, this.bsAtoms);
}break;
case 6:
if (this.modelIndex < 0) return;
sm.loadShape (this.id);
var md = this.info;
md.setModelSet (m);
var points = md.points;
for (var i = points.size (); --i >= 0; ) (points.get (i)).mi = this.modelIndex;

sm.setShapePropertyBs (this.id, "measure", md, this.bsAtoms);
return;
case 135180:
sID = (this.bsAtoms == null ? this.info : this.jmolName);
if (sm.getShapeIdFromObjectName (sID) >= 0) {
sm.vwr.setObjectProp (sID, 1610625028);
return;
}sb =  new JU.SB ();
sb.append ("isosurface ID ").append (JU.PT.esc (sID));
if (this.modelIndex < 0) this.modelIndex = sm.vwr.am.cmi;
if (this.bsAtoms == null) {
sb.append (" model ").append (m.getModelNumberDotted (this.modelIndex)).append (" color density sigma 1.0 ").append (JU.PT.esc (this.cacheID)).append (" ").append (JU.PT.esc (sID));
if (doCache) sb.append (";isosurface cache");
} else {
var lighting = (this.info)[0];
var only = (this.info)[1];
only = " only";
var bsCarve = (this.info)[2];
var carveDistance = ((this.info)[3]).floatValue ();
var resolution = "";
if (lighting == null) {
lighting = "mesh nofill";
resolution = " resolution 1.5";
}var haveMep = JU.PT.isOneOf (sID, mepList);
var model = m.getModelNumberDotted (this.modelIndex);
var ignore = "";
var type = (this.size < 0 ? " sasurface " : " solvent ");
sb.append (" model ").append (model).append (resolution).append (" select ").append (JU.Escape.eBS (this.bsAtoms)).append (only).append (ignore).append (type).appendF (Math.abs (this.size / 1000));
if (!haveMep) {
if (this.argb == 0) sb.append (" map property color");
 else sb.append (";color isosurface ").append (JU.Escape.escapeColor (this.argb));
}sb.append (";isosurface frontOnly ").append (lighting);
if (this.translucency > 0) sb.append (";color isosurface translucent " + this.translucency);
if (bsCarve != null && !bsCarve.isEmpty ()) sb.append (";isosurface slab within " + carveDistance + " {" + model + " and " + JU.Escape.eBS (bsCarve) + "}");
if (doCache && !haveMep) sb.append (";isosurface cache");
}break;
case 1073742016:
var mep = this.info;
sID = mep.get (mep.size () - 2).toString ();
var mapID = mep.get (mep.size () - 1).toString ();
var min = J.adapter.readers.pymol.PyMOLReader.floatAt (J.adapter.readers.pymol.PyMOLReader.listAt (mep, 3), 0);
var max = J.adapter.readers.pymol.PyMOLReader.floatAt (J.adapter.readers.pymol.PyMOLReader.listAt (mep, 3), 2);
sb =  new JU.SB ();
sb.append (";isosurface ID ").append (JU.PT.esc (sID)).append (" map ").append (JU.PT.esc (this.cacheID)).append (" ").append (JU.PT.esc (mapID)).append (";color isosurface range " + min + " " + max + ";isosurface colorscheme rwb;set isosurfacekey true");
if (this.translucency > 0) sb.append (";color isosurface translucent " + this.translucency);
if (doCache) sb.append (";isosurface cache");
break;
case 1073742018:
this.modelIndex = sm.vwr.am.cmi;
var mesh = this.info;
sID = mesh.get (mesh.size () - 2).toString ();
sb =  new JU.SB ();
sb.append ("isosurface ID ").append (JU.PT.esc (sID)).append (" model ").append (m.getModelNumberDotted (this.modelIndex)).append (" color ").append (JU.Escape.escapeColor (this.argb)).append ("  ").append (JU.PT.esc (this.cacheID)).append (" ").append (JU.PT.esc (sID)).append (" mesh nofill frontonly");
var list = J.adapter.readers.pymol.PyMOLReader.sublistAt (mesh, [2, 0]);
var within = J.adapter.readers.pymol.PyMOLReader.floatAt (list, 11);
list = J.adapter.readers.pymol.PyMOLReader.listAt (list, 12);
if (within > 0) {
var pt =  new JU.P3 ();
sb.append (";isosurface slab within ").appendF (within).append (" [ ");
for (var j = list.size () - 3; j >= 0; j -= 3) {
J.adapter.readers.pymol.PyMOLReader.pointAt (list, j, pt);
sb.append (JU.Escape.eP (pt));
}
sb.append (" ]");
}if (doCache && !JU.PT.isOneOf (sID, mepList)) sb.append (";isosurface cache");
sb.append (";set meshScale ").appendI (Clazz_doubleToInt (this.size / 500));
break;
case 134222850:
sb = this.info;
break;
case 1112152078:
sm.loadShape (this.id = 10);
sm.setShapePropertyBs (this.id, "putty", this.info, this.bsAtoms);
break;
}
if (sb != null) {
sm.vwr.runScriptCautiously (sb.toString ());
return;
}if (this.size != -1 || this.rd != null) sm.setShapeSizeBs (this.id, this.size, this.rd, this.bsAtoms);
if (this.argb != 0) sm.setShapePropertyBs (this.id, color, Integer.$valueOf (this.argb), this.bsAtoms);
if (this.translucency > 0) {
sm.setShapePropertyBs (this.id, "translucentLevel", Float.$valueOf (this.translucency), this.bsAtoms);
sm.setShapePropertyBs (this.id, "translucency", "translucent", this.bsAtoms);
} else if (this.colors != null) sm.setShapePropertyBs (this.id, "colors", this.colors, this.bsAtoms);
}, "J.adapter.readers.pymol.PyMOLScene,JM.ModelSet,~S,~B");
Clazz_defineMethod (c$, "getModelIndex", 
 function (m) {
if (this.bsAtoms == null) return -1;
var iAtom = this.bsAtoms.nextSetBit (0);
if (iAtom >= m.at.length) System.out.println ("PyMOL LOADING ERROR IN MERGE");
return (iAtom < 0 ? -1 : m.at[iAtom].mi);
}, "JM.ModelSet");
Clazz_defineMethod (c$, "setColors", 
function (colixes, translucency) {
this.colors =  Clazz_newArray (-1, [colixes, Float.$valueOf (translucency)]);
}, "~A,~N");
Clazz_defineMethod (c$, "setSize", 
function (size) {
this.size = Clazz_floatToInt (size * 1000);
}, "~N");
});
Clazz_declarePackage ("J.adapter.readers.pymol");
Clazz_load (["java.util.Hashtable", "JU.BS"], "J.adapter.readers.pymol.PyMOLGroup", null, function () {
c$ = Clazz_decorateAsClass (function () {
this.name = null;
this.objectNameID = null;
this.list = null;
this.object = null;
this.visible = true;
this.occluded = false;
this.bsAtoms = null;
this.firstAtom = 0;
this.type = 0;
this.parent = null;
Clazz_instantialize (this, arguments);
}, J.adapter.readers.pymol, "PyMOLGroup");
Clazz_prepareFields (c$, function () {
this.list =  new java.util.Hashtable ();
this.bsAtoms =  new JU.BS ();
});
Clazz_makeConstructor (c$, 
function (name) {
this.name = name;
}, "~S");
Clazz_defineMethod (c$, "addList", 
function (child) {
var group = this.list.get (child.name);
if (group != null) return;
this.list.put (child.name, child);
child.parent = this;
}, "J.adapter.readers.pymol.PyMOLGroup");
Clazz_defineMethod (c$, "set", 
function () {
if (this.parent != null) return;
});
Clazz_defineMethod (c$, "addGroupAtoms", 
function (bs) {
this.bsAtoms.or (bs);
if (this.parent != null) this.parent.addGroupAtoms (this.bsAtoms);
}, "JU.BS");
Clazz_overrideMethod (c$, "toString", 
function () {
return this.name;
});
});
Clazz_declarePackage ("J.adapter.readers.pymol");
Clazz_load (["J.api.JmolSceneGenerator", "java.util.Hashtable", "JU.BS", "$.Lst", "$.P3"], "J.adapter.readers.pymol.PyMOLScene", ["java.lang.Boolean", "$.Double", "$.Float", "JU.AU", "$.CU", "$.PT", "$.SB", "J.adapter.readers.pymol.JmolObject", "$.PyMOL", "$.PyMOLGroup", "$.PyMOLReader", "J.atomdata.RadiusData", "J.c.VDW", "JM.Text", "JU.BSUtil", "$.C", "$.Escape", "$.Logger", "$.Point3fi"], function () {
c$ = Clazz_decorateAsClass (function () {
this.vwr = null;
this.pymolVersion = 0;
this.bsHidden = null;
this.bsNucleic = null;
this.bsNonbonded = null;
this.bsLabeled = null;
this.bsHydrogen = null;
this.bsNoSurface = null;
this.htSpacefill = null;
this.ssMapAtom = null;
this.atomColorList = null;
this.occludedObjects = null;
this.labels = null;
this.colixes = null;
this.frameObj = null;
this.groups = null;
this.objectSettings = null;
this.bsCartoon = null;
this.htCarveSets = null;
this.htDefinedAtoms = null;
this.htHiddenObjects = null;
this.moleculeNames = null;
this.jmolObjects = null;
this.htAtomMap = null;
this.htObjectAtoms = null;
this.htObjectGroups = null;
this.htMeasures = null;
this.htObjectSettings = null;
this.objectInfo = null;
this.settings = null;
this.htStateSettings = null;
this.stateSettings = null;
this.uniqueSettings = null;
this.uniqueList = null;
this.bsUniqueBonds = null;
this.bgRgb = 0;
this.dotColor = 0;
this.surfaceMode = 0;
this.surfaceColor = 0;
this.cartoonColor = 0;
this.ribbonColor = 0;
this.sphereColor = 0;
this.labelFontId = 0;
this.labelColor = 0;
this.cartoonTranslucency = 0;
this.ribbonTranslucency = 0;
this.labelSize = 0;
this.meshWidth = 0;
this.nonbondedSize = 0;
this.nonbondedTranslucency = 0;
this.sphereScale = 0;
this.sphereTranslucency = 0;
this.stickTranslucency = 0;
this.transparency = 0;
this.cartoonLadderMode = false;
this.cartoonRockets = false;
this.haveNucleicLadder = false;
this.labelPosition = null;
this.labelPosition0 = null;
this.objectName = null;
this.objectNameID = null;
this.objectJmolName = null;
this.objectType = 0;
this.bsAtoms = null;
this.objectHidden = false;
this.reader = null;
this.uniqueIDs = null;
this.cartoonTypes = null;
this.sequenceNumbers = null;
this.newChain = null;
this.radii = null;
this.baseModelIndex = 0;
this.baseAtomIndex = 0;
this.stateCount = 0;
this.mepList = "";
this.doCache = false;
this.haveScenes = false;
this.bsCarve = null;
this.solventAccessible = false;
this.bsLineBonds = null;
this.bsStickBonds = null;
this.thisState = 0;
this.currentAtomSetIndex = 0;
this.surfaceInfoName = null;
this.ptTemp = null;
Clazz_instantialize (this, arguments);
}, J.adapter.readers.pymol, "PyMOLScene", null, J.api.JmolSceneGenerator);
Clazz_prepareFields (c$, function () {
this.bsHidden =  new JU.BS ();
this.bsNucleic =  new JU.BS ();
this.bsNonbonded =  new JU.BS ();
this.bsLabeled =  new JU.BS ();
this.bsHydrogen =  new JU.BS ();
this.bsNoSurface =  new JU.BS ();
this.htSpacefill =  new java.util.Hashtable ();
this.ssMapAtom =  new java.util.Hashtable ();
this.atomColorList =  new JU.Lst ();
this.occludedObjects =  new java.util.Hashtable ();
this.labels =  new java.util.Hashtable ();
this.bsCartoon =  new JU.BS ();
this.htCarveSets =  new java.util.Hashtable ();
this.htDefinedAtoms =  new java.util.Hashtable ();
this.htHiddenObjects =  new java.util.Hashtable ();
this.moleculeNames =  new JU.Lst ();
this.jmolObjects =  new JU.Lst ();
this.htAtomMap =  new java.util.Hashtable ();
this.htObjectAtoms =  new java.util.Hashtable ();
this.htObjectGroups =  new java.util.Hashtable ();
this.htMeasures =  new java.util.Hashtable ();
this.htObjectSettings =  new java.util.Hashtable ();
this.objectInfo =  new java.util.Hashtable ();
this.htStateSettings =  new java.util.Hashtable ();
this.labelPosition0 =  new JU.P3 ();
this.bsLineBonds =  new JU.BS ();
this.bsStickBonds =  new JU.BS ();
this.ptTemp =  new JU.P3 ();
});
Clazz_defineMethod (c$, "clearReaderData", 
 function () {
this.reader = null;
this.colixes = null;
this.atomColorList = null;
this.objectSettings = null;
this.stateSettings = null;
if (this.haveScenes) return;
this.settings = null;
this.groups = null;
this.labels = null;
this.ssMapAtom = null;
this.htSpacefill = null;
this.htAtomMap = null;
this.htMeasures = null;
this.htObjectGroups = null;
this.htObjectAtoms = null;
this.htObjectSettings = null;
this.htStateSettings = null;
this.htHiddenObjects = null;
this.objectInfo = null;
this.occludedObjects = null;
this.bsHidden = this.bsNucleic = this.bsNonbonded = this.bsLabeled = this.bsHydrogen = this.bsNoSurface = this.bsCartoon = null;
});
Clazz_defineMethod (c$, "setUniqueBond", 
function (index, uniqueID) {
if (uniqueID < 0) return;
if (this.uniqueList == null) {
this.uniqueList =  new java.util.Hashtable ();
this.bsUniqueBonds =  new JU.BS ();
}this.uniqueList.put (Integer.$valueOf (index), Integer.$valueOf (uniqueID));
this.bsUniqueBonds.set (index);
}, "~N,~N");
Clazz_defineMethod (c$, "setStateCount", 
function (stateCount) {
this.stateCount = stateCount;
}, "~N");
Clazz_makeConstructor (c$, 
function (reader, vwr, settings, uniqueSettings, pymolVersion, haveScenes, baseAtomIndex, baseModelIndex, doCache, filePath) {
this.reader = reader;
this.vwr = vwr;
this.settings = settings;
this.uniqueSettings = uniqueSettings;
this.pymolVersion = pymolVersion;
this.haveScenes = haveScenes;
this.baseAtomIndex = baseAtomIndex;
this.baseModelIndex = baseModelIndex;
this.doCache = doCache;
this.surfaceInfoName = filePath + "##JmolSurfaceInfo##";
this.setVersionSettings ();
settings.trimToSize ();
this.bgRgb = this.colorSetting (6);
this.labelPosition0 = this.pointSetting (471);
}, "J.api.PymolAtomReader,JV.Viewer,JU.Lst,java.util.Map,~N,~B,~N,~N,~B,~S");
Clazz_defineMethod (c$, "colorSetting", 
 function (i) {
var pos = J.adapter.readers.pymol.PyMOLReader.listAt (this.settings, i);
var o = (pos == null || pos.size () != 3 ? null : pos.get (2));
if (o == null) return Clazz_floatToInt (J.adapter.readers.pymol.PyMOL.getDefaultSetting (i, this.pymolVersion));
return (Clazz_instanceOf (o, Integer) ? (o).intValue () : JU.CU.colorPtToFFRGB (J.adapter.readers.pymol.PyMOLReader.pointAt (o, 0, this.ptTemp)));
}, "~N");
Clazz_defineMethod (c$, "pointSetting", 
 function (i) {
var pt =  new JU.P3 ();
var pos = J.adapter.readers.pymol.PyMOLReader.listAt (this.settings, i);
if (pos != null && pos.size () == 3) return J.adapter.readers.pymol.PyMOLReader.pointAt (pos.get (2), 0, pt);
return J.adapter.readers.pymol.PyMOL.getDefaultSettingPt (i, this.pymolVersion, pt);
}, "~N");
Clazz_defineMethod (c$, "ensureCapacity", 
function (n) {
this.atomColorList.ensureCapacity (this.atomColorList.size () + n);
}, "~N");
Clazz_defineMethod (c$, "setReaderObjectInfo", 
function (name, type, groupName, isHidden, listObjSettings, listStateSettings, ext) {
this.objectName = name;
this.objectHidden = isHidden;
this.objectNameID = (this.objectName == null ? null : this.fixName (this.objectName + ext));
this.objectSettings =  new java.util.Hashtable ();
this.stateSettings =  new java.util.Hashtable ();
if (this.objectName != null) {
this.objectJmolName = this.getJmolName (name);
if (groupName != null) {
this.htObjectGroups.put (this.objectName, groupName);
this.htObjectGroups.put (this.objectNameID, groupName);
}this.objectInfo.put (this.objectName,  Clazz_newArray (-1, [this.objectNameID, Integer.$valueOf (type)]));
if (this.htObjectSettings.get (this.objectName) == null) {
this.listToSettings (listObjSettings, this.objectSettings);
this.htObjectSettings.put (this.objectName, this.objectSettings);
}if (this.htStateSettings.get (this.objectNameID) == null) {
this.listToSettings (listStateSettings, this.stateSettings);
this.htStateSettings.put (this.objectNameID, this.stateSettings);
}}this.getObjectSettings ();
}, "~S,~N,~S,~B,JU.Lst,JU.Lst,~S");
Clazz_defineMethod (c$, "listToSettings", 
 function (list, objectSettings) {
if (list != null && list.size () != 0) {
for (var i = list.size (); --i >= 0; ) {
var setting = list.get (i);
objectSettings.put (setting.get (0), setting);
}
}}, "JU.Lst,java.util.Map");
Clazz_defineMethod (c$, "getObjectSettings", 
 function () {
this.transparency = this.floatSetting (138);
this.dotColor = Clazz_floatToInt (this.floatSetting (210));
this.nonbondedSize = this.floatSetting (65);
this.nonbondedTranslucency = this.floatSetting (524);
this.sphereScale = this.floatSetting (155);
this.cartoonColor = Clazz_floatToInt (this.floatSetting (236));
this.ribbonColor = Clazz_floatToInt (this.floatSetting (235));
this.sphereColor = Clazz_floatToInt (this.floatSetting (173));
this.cartoonTranslucency = this.floatSetting (279);
this.ribbonTranslucency = this.floatSetting (666);
this.stickTranslucency = this.floatSetting (198);
this.sphereTranslucency = this.floatSetting (172);
this.cartoonLadderMode = this.booleanSetting (448);
this.cartoonRockets = this.booleanSetting (180);
this.surfaceMode = Clazz_floatToInt (this.floatSetting (143));
this.surfaceColor = Clazz_floatToInt (this.floatSetting (144));
this.solventAccessible = this.booleanSetting (338);
this.meshWidth = this.floatSetting (90);
var carveSet = this.stringSetting (342).trim ();
if (carveSet.length == 0) {
this.bsCarve = null;
} else {
this.bsCarve = this.htCarveSets.get (carveSet);
if (this.bsCarve == null) this.htCarveSets.put (carveSet, this.bsCarve =  new JU.BS ());
}this.labelPosition =  new JU.P3 ();
try {
var setting = this.getObjectSetting (471);
J.adapter.readers.pymol.PyMOLReader.pointAt (J.adapter.readers.pymol.PyMOLReader.listAt (setting, 2), 0, this.labelPosition);
} catch (e) {
if (Clazz_exceptionOf (e, Exception)) {
} else {
throw e;
}
}
this.labelPosition.add (this.labelPosition0);
this.labelColor = Clazz_floatToInt (this.floatSetting (66));
this.labelSize = this.floatSetting (453);
this.labelFontId = Clazz_floatToInt (this.floatSetting (328));
});
Clazz_defineMethod (c$, "setAtomInfo", 
function (uniqueIDs, cartoonTypes, sequenceNumbers, newChain, radii) {
this.uniqueIDs = uniqueIDs;
this.cartoonTypes = cartoonTypes;
this.sequenceNumbers = sequenceNumbers;
this.newChain = newChain;
this.radii = radii;
}, "~A,~A,~A,~A,~A");
Clazz_defineMethod (c$, "setSceneObject", 
 function (name, istate) {
this.objectName = name;
this.objectType = this.getObjectType (name);
this.objectJmolName = this.getJmolName (name);
this.objectNameID = (istate == 0 && this.objectType != 0 ? this.getObjectID (name) : this.objectJmolName + "_" + istate);
this.bsAtoms = this.htObjectAtoms.get (name);
this.objectSettings = this.htObjectSettings.get (name);
this.stateSettings = this.htStateSettings.get (name + "_" + istate);
var groupName = this.htObjectGroups.get (name);
this.objectHidden = (this.htHiddenObjects.containsKey (name) || groupName != null && !this.groups.get (groupName).visible);
this.getObjectSettings ();
}, "~S,~N");
Clazz_defineMethod (c$, "buildScene", 
function (name, thisScene, htObjNames, htSecrets) {
var frame = thisScene.get (2);
var smap =  new java.util.Hashtable ();
smap.put ("pymolFrame", frame);
smap.put ("generator", this);
smap.put ("name", name);
var view = J.adapter.readers.pymol.PyMOLReader.listAt (thisScene, 0);
if (view != null) smap.put ("pymolView", this.getPymolView (view, false));
var visibilities = thisScene.get (1);
smap.put ("visibilities", visibilities);
var sname = "_scene_" + name + "_";
var reps =  new Array (J.adapter.readers.pymol.PyMOL.REP_LIST.length);
for (var j = J.adapter.readers.pymol.PyMOL.REP_LIST.length; --j >= 0; ) {
var list = htObjNames.get (sname + J.adapter.readers.pymol.PyMOL.REP_LIST[j]);
var data = J.adapter.readers.pymol.PyMOLReader.listAt (list, 5);
if (data != null && data.size () > 0) reps[j] = J.adapter.readers.pymol.PyMOLReader.listToMap (data);
}
smap.put ("moleculeReps", reps);
sname = "_!c_" + name + "_";
var colorection = J.adapter.readers.pymol.PyMOLReader.listAt (thisScene, 3);
var n = colorection.size ();
n -= n % 2;
var colors =  new Array (Clazz_doubleToInt (n / 2));
for (var j = 0, i = 0; j < n; j += 2) {
var color = J.adapter.readers.pymol.PyMOLReader.intAt (colorection, j);
var c = htSecrets.get (sname + color);
if (c != null && c.size () > 1) colors[i++] =  Clazz_newArray (-1, [Integer.$valueOf (color), c.get (1)]);
}
smap.put ("colors", colors);
this.addJmolObject (1073742139, null, smap).jmolName = name;
}, "~S,JU.Lst,java.util.Map,java.util.Map");
Clazz_overrideMethod (c$, "generateScene", 
function (scene) {
JU.Logger.info ("PyMOLScene - generateScene " + scene.get ("name"));
this.jmolObjects.clear ();
this.bsHidden.clearAll ();
this.occludedObjects.clear ();
this.htHiddenObjects.clear ();
var frame = scene.get ("pymolFrame");
this.thisState = frame.intValue ();
this.addJmolObject (4115, null, Integer.$valueOf (this.thisState - 1));
try {
this.generateVisibilities (scene.get ("visibilities"));
this.generateColors (scene.get ("colors"));
this.generateShapes (scene.get ("moleculeReps"));
this.finalizeVisibility ();
this.offsetObjects ();
this.finalizeObjects ();
} catch (e) {
if (Clazz_exceptionOf (e, Exception)) {
JU.Logger.info ("PyMOLScene exception " + e);
e.printStackTrace ();
} else {
throw e;
}
}
}, "java.util.Map");
Clazz_defineMethod (c$, "generateColors", 
 function (colors) {
if (colors == null) return;
for (var i = colors.length; --i >= 0; ) {
var item = colors[i];
var color = (item[0]).intValue ();
var icolor = J.adapter.readers.pymol.PyMOL.getRGB (color);
var molecules = item[1];
var bs = this.getSelectionAtoms (molecules, this.thisState,  new JU.BS ());
this.addJmolObject (1140850689, bs, null).argb = icolor;
}
}, "~A");
Clazz_defineMethod (c$, "processSelection", 
function (selection) {
var id = J.adapter.readers.pymol.PyMOLReader.stringAt (selection, 0);
id = "_" + (id.equals ("sele") ? id : "sele_" + id);
var g = this.getGroup (id);
this.getSelectionAtoms (J.adapter.readers.pymol.PyMOLReader.listAt (selection, 5), 0, g.bsAtoms);
}, "JU.Lst");
Clazz_defineMethod (c$, "getSelectionAtoms", 
 function (molecules, istate, bs) {
if (molecules != null) for (var j = molecules.size (); --j >= 0; ) this.selectAllAtoms (J.adapter.readers.pymol.PyMOLReader.listAt (molecules, j), istate, bs);

return bs;
}, "JU.Lst,~N,JU.BS");
Clazz_defineMethod (c$, "selectAllAtoms", 
 function (obj, istate, bs) {
var name = J.adapter.readers.pymol.PyMOLReader.stringAt (obj, 0);
this.setSceneObject (name, istate);
var atomList = J.adapter.readers.pymol.PyMOLReader.listAt (obj, 1);
var k0 = (istate == 0 ? 1 : istate);
var k1 = (istate == 0 ? this.stateCount : istate);
for (var k = k0; k <= k1; k++) {
var atomMap = this.htAtomMap.get (this.fixName (name + "_" + k));
if (atomMap == null) continue;
this.getBsAtoms (atomList, atomMap, bs);
}
}, "JU.Lst,~N,JU.BS");
Clazz_defineMethod (c$, "generateVisibilities", 
 function (vis) {
if (vis == null) return;
var bs =  new JU.BS ();
this.addJmolObject (12294, null, null);
for (var e, $e = this.groups.entrySet ().iterator (); $e.hasNext () && ((e = $e.next ()) || true);) e.getValue ().visible = true;

for (var e, $e = vis.entrySet ().iterator (); $e.hasNext () && ((e = $e.next ()) || true);) {
var name = e.getKey ();
if (name.equals ("all")) continue;
var list = e.getValue ();
var tok = (J.adapter.readers.pymol.PyMOLReader.intAt (list, 0) == 1 ? 1610625028 : 12294);
if (tok == 12294) this.htHiddenObjects.put (name, Boolean.TRUE);
switch (this.getObjectType (name)) {
case 12:
var g = this.groups.get (name);
if (g != null) g.visible = (tok == 1610625028);
break;
}
}
this.setGroupVisibilities ();
for (var e, $e = vis.entrySet ().iterator (); $e.hasNext () && ((e = $e.next ()) || true);) {
var name = e.getKey ();
if (name.equals ("all")) continue;
this.setSceneObject (name, this.thisState);
if (this.objectHidden) continue;
var list = e.getValue ();
var tok = (this.objectHidden ? 12294 : 1610625028);
bs = null;
var info = this.objectJmolName;
switch (this.objectType) {
case 0:
case 12:
continue;
case 1:
bs = this.vwr.getDefinedAtomSet (info);
if (bs.nextSetBit (0) < 0) continue;
break;
case 4:
if (tok == 1610625028) {
var mdList = this.htMeasures.get (name);
if (mdList != null) this.addMeasurements (mdList, mdList[0].points.size (), null, this.getBS (J.adapter.readers.pymol.PyMOLReader.listAt (list, 2)), J.adapter.readers.pymol.PyMOLReader.intAt (list, 3), null, true);
}info += "_*";
break;
case 6:
case 3:
case 2:
break;
}
this.addJmolObject (tok, bs, info);
}
}, "java.util.Map");
Clazz_defineMethod (c$, "generateShapes", 
 function (reps) {
if (reps == null) return;
this.addJmolObject (12295, null, null).argb = this.thisState - 1;
for (var m = 0; m < this.moleculeNames.size (); m++) {
this.setSceneObject (this.moleculeNames.get (m), this.thisState);
if (this.objectHidden) continue;
var molReps =  new Array (23);
for (var i = 0; i < 23; i++) molReps[i] =  new JU.BS ();

for (var i = reps.length; --i >= 0; ) {
var repMap = reps[i];
var list = (repMap == null ? null : repMap.get (this.objectName));
if (list != null) this.selectAllAtoms (list, this.thisState, molReps[i]);
}
this.createShapeObjects (molReps, true, -1, -1);
}
}, "~A");
Clazz_defineMethod (c$, "getBS", 
 function (list) {
var bs =  new JU.BS ();
for (var i = list.size (); --i >= 0; ) bs.set (J.adapter.readers.pymol.PyMOLReader.intAt (list, i));

return bs;
}, "JU.Lst");
Clazz_defineMethod (c$, "getBsAtoms", 
 function (list, atomMap, bs) {
for (var i = list.size (); --i >= 0; ) bs.set (atomMap[J.adapter.readers.pymol.PyMOLReader.intAt (list, i)]);

}, "JU.Lst,~A,JU.BS");
Clazz_defineMethod (c$, "setReaderObjects", 
function () {
this.clearReaderData ();
this.finalizeObjects ();
if (!this.haveScenes) {
this.uniqueSettings = null;
this.bsUniqueBonds = this.bsStickBonds = this.bsLineBonds = null;
}});
Clazz_defineMethod (c$, "finalizeObjects", 
 function () {
this.vwr.setStringProperty ("defaults", "PyMOL");
for (var i = 0; i < this.jmolObjects.size (); i++) {
try {
var obj = this.jmolObjects.get (i);
obj.finalizeObject (this, this.vwr.ms, this.mepList, this.doCache);
} catch (e) {
if (Clazz_exceptionOf (e, Exception)) {
System.out.println (e);
e.printStackTrace ();
} else {
throw e;
}
}
}
this.finalizeUniqueBonds ();
this.jmolObjects.clear ();
});
Clazz_defineMethod (c$, "offsetObjects", 
function () {
for (var i = 0, n = this.jmolObjects.size (); i < n; i++) this.jmolObjects.get (i).offset (this.baseModelIndex, this.baseAtomIndex);

});
Clazz_defineMethod (c$, "getJmolObject", 
 function (id, bsAtoms, info) {
if (this.baseAtomIndex > 0) bsAtoms = JU.BSUtil.copy (bsAtoms);
return  new J.adapter.readers.pymol.JmolObject (id, this.objectNameID, bsAtoms, info);
}, "~N,JU.BS,~O");
Clazz_defineMethod (c$, "addJmolObject", 
 function (id, bsAtoms, info) {
return this.addObject (this.getJmolObject (id, bsAtoms, info));
}, "~N,JU.BS,~O");
Clazz_defineMethod (c$, "getPymolView", 
 function (view, isViewObj) {
var pymolView =  Clazz_newFloatArray (21, 0);
var depthCue = this.booleanSetting (84);
var fog = this.booleanSetting (88);
var fog_start = this.floatSetting (192);
var pt = 0;
var i = 0;
for (var j = 0; j < 3; j++) pymolView[pt++] = J.adapter.readers.pymol.PyMOLReader.floatAt (view, i++);

if (isViewObj) i++;
for (var j = 0; j < 3; j++) pymolView[pt++] = J.adapter.readers.pymol.PyMOLReader.floatAt (view, i++);

if (isViewObj) i++;
for (var j = 0; j < 3; j++) pymolView[pt++] = J.adapter.readers.pymol.PyMOLReader.floatAt (view, i++);

if (isViewObj) i += 5;
for (var j = 0; j < 8; j++) pymolView[pt++] = J.adapter.readers.pymol.PyMOLReader.floatAt (view, i++);

var isOrtho = this.booleanSetting (23);
var fov = this.floatSetting (152);
pymolView[pt++] = (isOrtho ? fov : -fov);
pymolView[pt++] = (depthCue ? 1 : 0);
pymolView[pt++] = (fog ? 1 : 0);
pymolView[pt++] = fog_start;
return pymolView;
}, "JU.Lst,~B");
Clazz_defineMethod (c$, "globalSetting", 
function (i) {
var setting = J.adapter.readers.pymol.PyMOLReader.listAt (this.settings, i);
if (setting != null && setting.size () == 3) return (setting.get (2)).floatValue ();
return J.adapter.readers.pymol.PyMOL.getDefaultSetting (i, this.pymolVersion);
}, "~N");
Clazz_defineMethod (c$, "addGroup", 
function (object, parent, type, bsAtoms) {
if (this.groups == null) this.groups =  new java.util.Hashtable ();
var myGroup = this.getGroup (this.objectName);
myGroup.object = object;
myGroup.objectNameID = this.objectNameID;
myGroup.visible = !this.objectHidden;
myGroup.type = type;
if (!myGroup.visible) {
this.occludedObjects.put (this.objectNameID, Boolean.TRUE);
this.htHiddenObjects.put (this.objectName, Boolean.TRUE);
}if (parent != null && parent.length != 0) this.getGroup (parent).addList (myGroup);
if (bsAtoms != null) myGroup.addGroupAtoms (bsAtoms);
return myGroup;
}, "JU.Lst,~S,~N,JU.BS");
Clazz_defineMethod (c$, "getGroup", 
function (name) {
var g = this.groups.get (name);
if (g == null) {
this.groups.put (name, (g =  new J.adapter.readers.pymol.PyMOLGroup (name)));
this.defineAtoms (name, g.bsAtoms);
}return g;
}, "~S");
Clazz_defineMethod (c$, "finalizeVisibility", 
function () {
this.setGroupVisibilities ();
if (this.groups != null) for (var i = this.jmolObjects.size (); --i >= 0; ) {
var obj = this.jmolObjects.get (i);
if (obj.jmolName != null && this.occludedObjects.containsKey (obj.jmolName)) obj.visible = false;
}
if (!this.bsHidden.isEmpty ()) this.addJmolObject (2097194, this.bsHidden, null);
});
Clazz_defineMethod (c$, "setCarveSets", 
function (htObjNames) {
if (this.htCarveSets.isEmpty ()) return;
for (var e, $e = this.htCarveSets.entrySet ().iterator (); $e.hasNext () && ((e = $e.next ()) || true);) this.getSelectionAtoms (J.adapter.readers.pymol.PyMOLReader.listAt (htObjNames.get (e.getKey ()), 5), 0, e.getValue ());

}, "java.util.Map");
Clazz_defineMethod (c$, "setGroupVisibilities", 
 function () {
if (this.groups == null) return;
var list = this.groups.values ();
var bsAll =  new JU.BS ();
for (var g, $g = list.iterator (); $g.hasNext () && ((g = $g.next ()) || true);) {
bsAll.or (g.bsAtoms);
if (g.parent == null) this.setGroupVisible (g, true);
 else if (g.list.isEmpty ()) g.addGroupAtoms ( new JU.BS ());
}
this.defineAtoms ("all", bsAll);
});
Clazz_defineMethod (c$, "defineAtoms", 
 function (name, bs) {
this.htDefinedAtoms.put (this.getJmolName (name), bs);
}, "~S,JU.BS");
Clazz_defineMethod (c$, "getJmolName", 
 function (name) {
return "__" + this.fixName (name);
}, "~S");
Clazz_defineMethod (c$, "createShapeObjects", 
function (reps, allowSurface, ac0, ac) {
if (ac >= 0) {
this.bsAtoms = JU.BSUtil.newBitSet2 (ac0, ac);
var jo;
jo = this.addJmolObject (1140850689, this.bsAtoms, null);
this.colixes = JU.AU.ensureLengthShort (this.colixes, ac);
for (var i = ac; --i >= ac0; ) this.colixes[i] = this.atomColorList.get (i).intValue ();

jo.setColors (this.colixes, 0);
jo.setSize (0);
jo = this.addJmolObject (1, this.bsAtoms, null);
jo.setSize (0);
}this.createShapeObject (7, reps[7]);
this.createShapeObject (0, reps[0]);
this.fixReps (reps);
this.createSpacefillObjects ();
for (var i = 0; i < 23; i++) switch (i) {
case 7:
case 0:
continue;
case 8:
case 2:
if (!allowSurface) continue;
switch (this.surfaceMode) {
case 0:
reps[i].andNot (this.bsNoSurface);
break;
case 1:
case 3:
break;
case 2:
case 4:
reps[i].andNot (this.bsHydrogen);
break;
}
default:
this.createShapeObject (i, reps[i]);
continue;
}

this.bsAtoms = null;
}, "~A,~B,~N,~N");
Clazz_defineMethod (c$, "addLabel", 
function (atomIndex, uniqueID, atomColor, labelPos, label) {
var icolor = Clazz_floatToInt (this.getUniqueFloatDef (uniqueID, 66, this.labelColor));
if (icolor == -7 || icolor == -6) {
} else if (icolor < 0) {
icolor = atomColor;
}if (labelPos == null) {
var offset = this.getUniquePoint (uniqueID, 471, null);
if (offset == null) offset = this.labelPosition;
 else offset.add (this.labelPosition);
this.setLabelPosition (offset, labelPos);
}this.labels.put (Integer.$valueOf (atomIndex), this.newTextLabel (label, labelPos, icolor, this.labelFontId, this.labelSize));
}, "~N,~N,~N,~A,~S");
Clazz_defineMethod (c$, "getUniqueFloatDef", 
function (id, key, defaultValue) {
var setting;
if (id <= 0 || (setting = this.uniqueSettings.get (Integer.$valueOf ((id << 10) + key))) == null) return defaultValue;
var v = (setting.get (2)).floatValue ();
if (JU.Logger.debugging) JU.Logger.debug ("Pymol unique setting for " + id + ": [" + key + "] = " + v);
return v;
}, "~N,~N,~N");
Clazz_defineMethod (c$, "getUniquePoint", 
function (id, key, pt) {
var setting;
if (id <= 0 || (setting = this.uniqueSettings.get (Integer.$valueOf ((id << 10) + key))) == null) return pt;
pt =  new JU.P3 ();
J.adapter.readers.pymol.PyMOLReader.pointAt (setting.get (2), 0, pt);
JU.Logger.info ("Pymol unique setting for " + id + ": " + key + " = " + pt);
return pt;
}, "~N,~N,JU.P3");
Clazz_defineMethod (c$, "getObjectSetting", 
function (i) {
return this.objectSettings.get (Integer.$valueOf (i));
}, "~N");
Clazz_defineMethod (c$, "booleanSetting", 
function (i) {
return (this.floatSetting (i) != 0);
}, "~N");
Clazz_defineMethod (c$, "floatSetting", 
function (i) {
var setting = this.getSetting (i);
if (setting != null && setting.size () == 3) return (setting.get (2)).floatValue ();
return J.adapter.readers.pymol.PyMOL.getDefaultSetting (i, this.pymolVersion);
}, "~N");
Clazz_defineMethod (c$, "stringSetting", 
function (i) {
var setting = this.getSetting (i);
if (setting != null && setting.size () == 3) return J.adapter.readers.pymol.PyMOLReader.stringAt (setting, 2);
return J.adapter.readers.pymol.PyMOL.getDefaultSettingS (i, this.pymolVersion);
}, "~N");
Clazz_defineMethod (c$, "getSetting", 
 function (i) {
var setting = null;
if (this.stateSettings != null) setting = this.stateSettings.get (Integer.$valueOf (i));
if (setting == null && this.objectSettings != null) setting = this.objectSettings.get (Integer.$valueOf (i));
if (setting == null && i < this.settings.size ()) setting = this.settings.get (i);
return setting;
}, "~N");
Clazz_defineMethod (c$, "setLabelPosition", 
function (offset, labelPos) {
labelPos[0] = 1;
labelPos[1] = offset.x;
labelPos[2] = offset.y;
labelPos[3] = offset.z;
return labelPos;
}, "JU.P3,~A");
Clazz_defineMethod (c$, "addCGO", 
function (data, color) {
data.addLast (this.objectName);
var jo = this.addJmolObject (23, null, data);
jo.argb = color;
jo.translucency = this.floatSetting (441);
return this.fixName (this.objectName);
}, "JU.Lst,~N");
Clazz_defineMethod (c$, "addMeasurements", 
function (mdList, nCoord, list, bsReps, color, offsets, haveLabels) {
var isNew = (mdList == null);
var n = (isNew ? Clazz_doubleToInt (Clazz_doubleToInt (list.size () / 3) / nCoord) : mdList.length);
if (n == 0) return false;
var drawLabel = haveLabels && bsReps.get (3);
var drawDashes = bsReps.get (10);
var rad = this.floatSetting (107) / 20;
if (rad == 0) rad = 0.05;
if (!drawDashes) rad = -5.0E-4;
if (color < 0) color = Clazz_floatToInt (this.floatSetting (574));
var c = J.adapter.readers.pymol.PyMOL.getRGB (color);
var colix = JU.C.getColix (c);
var clabel = (this.labelColor < 0 ? color : this.labelColor);
if (isNew) {
mdList =  new Array (n);
this.htMeasures.put (this.objectName, mdList);
}var bs = JU.BSUtil.newAndSetBit (0);
for (var index = 0, p = 0; index < n; index++) {
var md;
var offset;
if (isNew) {
var points =  new JU.Lst ();
for (var i = 0; i < nCoord; i++, p += 3) points.addLast (J.adapter.readers.pymol.PyMOLReader.pointAt (list, p,  new JU.Point3fi ()));

offset = J.adapter.readers.pymol.PyMOLReader.floatsAt (J.adapter.readers.pymol.PyMOLReader.listAt (offsets, index), 0,  Clazz_newFloatArray (7, 0), 7);
if (offset == null) offset = this.setLabelPosition (this.labelPosition,  Clazz_newFloatArray (7, 0));
md = mdList[index] = this.vwr.newMeasurementData (this.objectNameID + "_" + (index + 1), points);
md.note = this.objectName;
} else {
md = mdList[index];
offset = md.text.pymolOffset;
}var nDigits = Clazz_floatToInt (this.floatSetting (J.adapter.readers.pymol.PyMOLScene.MEAS_DIGITS[nCoord - 2]));
var strFormat = nCoord + ": " + (drawLabel ? "%0." + (nDigits < 0 ? 1 : nDigits) + "VALUE" : "");
var text = this.newTextLabel (strFormat, offset, clabel, Clazz_floatToInt (this.floatSetting (328)), this.floatSetting (453));
md.set (12290, null, null, null, strFormat, "angstroms", null, false, false, null, false, Clazz_floatToInt (rad * 2000), colix, text, NaN);
this.addJmolObject (6, bs, md);
}
return true;
}, "~A,~N,JU.Lst,JU.BS,~N,JU.Lst,~B");
Clazz_defineMethod (c$, "getViewScript", 
function (view) {
var sb =  new JU.SB ();
var pymolView = this.getPymolView (view, true);
sb.append (";set translucent " + (this.globalSetting (213) != 2) + ";set zshadePower 1;set traceAlpha " + (this.globalSetting (111) != 0));
var rockets = this.cartoonRockets;
sb.append (";set cartoonRockets " + rockets);
if (rockets) sb.append (";set rocketBarrels " + rockets);
sb.append (";set cartoonLadders " + this.haveNucleicLadder);
sb.append (";set ribbonBorder " + (this.globalSetting (118) != 0));
sb.append (";set cartoonFancy " + (this.globalSetting (118) == 0));
var s = "000000" + Integer.toHexString (this.bgRgb & 0xFFFFFF);
s = "[x" + s.substring (s.length - 6) + "]";
sb.append (";background " + s);
sb.append (";moveto 0 PyMOL " + JU.Escape.eAF (pymolView));
sb.append (";save orientation 'default';");
return sb;
}, "JU.Lst");
Clazz_defineMethod (c$, "getColix", 
function (colorIndex, translucency) {
var colix = (colorIndex == -7 ? (JU.C.getBgContrast (this.bgRgb) == 8 ? 4 : 8) : colorIndex == -6 ? JU.C.getBgContrast (this.bgRgb) : JU.C.getColixO (Integer.$valueOf (J.adapter.readers.pymol.PyMOL.getRGB (colorIndex))));
return JU.C.getColixTranslucent3 (colix, translucency > 0, translucency);
}, "~N,~N");
Clazz_defineMethod (c$, "setAtomColor", 
function (atomColor) {
this.atomColorList.addLast (Integer.$valueOf (this.getColix (atomColor, 0)));
}, "~N");
Clazz_defineMethod (c$, "setFrameObject", 
function (type, info) {
if (info != null) {
this.frameObj = this.getJmolObject (type, null, info);
return;
}if (this.frameObj == null) return;
this.frameObj.finalizeObject (this, this.vwr.ms, null, false);
this.frameObj = null;
}, "~N,~O");
Clazz_defineMethod (c$, "fixName", 
 function (name) {
var chars = name.toLowerCase ().toCharArray ();
for (var i = chars.length; --i >= 0; ) if (!JU.PT.isLetterOrDigit (chars[i])) chars[i] = '_';

return String.valueOf (chars);
}, "~S");
Clazz_defineMethod (c$, "getObjectID", 
function (name) {
return this.objectInfo.get (name)[0];
}, "~S");
Clazz_defineMethod (c$, "getObjectType", 
 function (name) {
var o = this.objectInfo.get (name);
return (o == null ? 0 : (o[1]).intValue ());
}, "~S");
Clazz_defineMethod (c$, "setAtomMap", 
function (atomMap, ac0) {
this.htAtomMap.put (this.objectNameID, atomMap);
var bsAtoms = this.htDefinedAtoms.get (this.objectJmolName);
if (bsAtoms == null) {
bsAtoms = JU.BS.newN (ac0 + atomMap.length);
JU.Logger.info ("PyMOL molecule " + this.objectName);
this.htDefinedAtoms.put (this.objectJmolName, bsAtoms);
this.htObjectAtoms.put (this.objectName, bsAtoms);
this.moleculeNames.addLast (this.objectName);
}return bsAtoms;
}, "~A,~N");
Clazz_defineMethod (c$, "newTextLabel", 
 function (label, labelOffset, colorIndex, fontID, fontSize) {
var face;
var factor = 1;
switch (fontID) {
default:
case 11:
case 12:
case 13:
case 14:
face = "SansSerif";
break;
case 0:
case 1:
face = "Monospaced";
break;
case 9:
case 10:
case 15:
case 16:
case 17:
case 18:
face = "Serif";
break;
}
var style;
switch (fontID) {
default:
style = "Plain";
break;
case 6:
case 12:
case 16:
case 17:
style = "Italic";
break;
case 7:
case 10:
case 13:
style = "Bold";
break;
case 8:
case 14:
case 18:
style = "BoldItalic";
break;
}
var font = this.vwr.getFont3D (face, style, fontSize == 0 ? 12 : fontSize * factor);
var t = JM.Text.newLabel (this.vwr, font, label, this.getColix (colorIndex, 0), 0, 0, 0);
if (t != null) t.pymolOffset = labelOffset;
return t;
}, "~S,~A,~N,~N,~N");
Clazz_defineMethod (c$, "setVersionSettings", 
 function () {
if (this.pymolVersion < 100) {
this.addSetting (550, 2, Integer.$valueOf (0));
this.addSetting (529, 2, Integer.$valueOf (2));
this.addSetting (471, 4,  Clazz_newDoubleArray (-1, [1, 1, 0]));
if (this.pymolVersion < 99) {
this.addSetting (448, 2, Integer.$valueOf (0));
this.addSetting (431, 2, Integer.$valueOf (0));
this.addSetting (361, 2, Integer.$valueOf (1));
}}});
Clazz_defineMethod (c$, "addSetting", 
 function (key, type, val) {
var settingCount = this.settings.size ();
if (settingCount <= key) for (var i = key + 1; --i >= settingCount; ) this.settings.addLast (null);

if (type == 4) {
var d = val;
var list;
val = list =  new JU.Lst ();
for (var i = 0; i < 3; i++) list.addLast (Double.$valueOf (d[i]));

}var setting =  new JU.Lst ();
setting.addLast (Integer.$valueOf (key));
setting.addLast (Integer.$valueOf (type));
setting.addLast (val);
this.settings.set (key, setting);
}, "~N,~N,~O");
Clazz_defineMethod (c$, "fixReps", 
 function (reps) {
this.htSpacefill.clear ();
this.bsCartoon.clearAll ();
for (var iAtom = this.bsAtoms.nextSetBit (0); iAtom >= 0; iAtom = this.bsAtoms.nextSetBit (iAtom + 1)) {
var rad = 0;
var uniqueID = (this.reader == null ? this.uniqueIDs[iAtom] : this.reader.getUniqueID (iAtom));
if (reps[1].get (iAtom)) {
rad = (this.reader == null ? this.radii[iAtom] : this.reader.getVDW (iAtom)) * this.getUniqueFloatDef (uniqueID, 155, this.sphereScale);
} else if (reps[4].get (iAtom)) {
rad = this.nonbondedSize;
}if (rad != 0) {
var r = Float.$valueOf (rad);
var bsr = this.htSpacefill.get (r);
if (bsr == null) this.htSpacefill.put (r, bsr =  new JU.BS ());
bsr.set (iAtom);
}var cartoonType = (this.reader == null ? this.cartoonTypes[iAtom] : this.reader.getCartoonType (iAtom));
if (reps[5].get (iAtom)) {
switch (cartoonType) {
case 1:
case 4:
reps[21].set (iAtom);
case -1:
reps[5].clear (iAtom);
this.bsCartoon.clear (iAtom);
break;
case 7:
reps[22].set (iAtom);
reps[5].clear (iAtom);
this.bsCartoon.clear (iAtom);
break;
default:
this.bsCartoon.set (iAtom);
}
}}
reps[5].and (this.bsCartoon);
this.cleanSingletons (reps[5]);
this.cleanSingletons (reps[6]);
this.cleanSingletons (reps[21]);
this.cleanSingletons (reps[22]);
this.bsCartoon.and (reps[5]);
}, "~A");
Clazz_defineMethod (c$, "cleanSingletons", 
 function (bs) {
if (bs.isEmpty ()) return;
bs.and (this.bsAtoms);
var bsr =  new JU.BS ();
var n = bs.length ();
var pass = 0;
while (true) {
for (var i = 0, offset = 0, iPrev = -2147483648, iSeqLast = -2147483648, iSeq = -2147483648; i < n; i++) {
if (iPrev < 0 || (this.reader == null ? this.newChain[i] : this.reader.compareAtoms (iPrev, i))) offset++;
iSeq = (this.reader == null ? this.sequenceNumbers[i] : this.reader.getSequenceNumber (i));
if (iSeq != iSeqLast) {
iSeqLast = iSeq;
offset++;
}if (pass == 0) {
if (bs.get (i)) bsr.set (offset);
} else if (!bsr.get (offset)) bs.clear (i);
iPrev = i;
}
if (++pass == 2) break;
var bsnot =  new JU.BS ();
for (var i = bsr.nextSetBit (0); i >= 0; i = bsr.nextSetBit (i + 1)) if (!bsr.get (i - 1) && !bsr.get (i + 1)) bsnot.set (i);

bsr.andNot (bsnot);
}
}, "JU.BS");
Clazz_defineMethod (c$, "createShapeObject", 
 function (shapeID, bs) {
if (bs.isEmpty ()) return;
var jo = null;
switch (shapeID) {
case 11:
bs.and (this.bsNonbonded);
if (bs.isEmpty ()) return;
this.setUniqueObjects (7, bs, 0, 0, 524, this.nonbondedTranslucency, 0, this.nonbondedSize, 0.5);
break;
case 4:
case 1:
this.setUniqueObjects (0, bs, 173, this.sphereColor, 172, this.sphereTranslucency, 155, this.sphereScale, 1);
break;
case 19:
var ellipsoidTranslucency = this.floatSetting (571);
var ellipsoidColor = Clazz_floatToInt (this.floatSetting (570));
var ellipsoidScale = this.floatSetting (569);
this.setUniqueObjects (20, bs, 570, ellipsoidColor, 571, ellipsoidTranslucency, 569, ellipsoidScale, 50);
break;
case 9:
this.setUniqueObjects (16, bs, 210, this.dotColor, 0, 0, 155, this.sphereScale, 1);
break;
case 2:
var withinDistance = this.floatSetting (344);
jo = this.addJmolObject (135180, bs,  Clazz_newArray (-1, [this.booleanSetting (156) ? "FULLYLIT" : "FRONTLIT", (this.surfaceMode == 3 || this.surfaceMode == 4) ? " only" : "", this.bsCarve, Float.$valueOf (withinDistance)]));
jo.setSize (this.floatSetting (4) * (this.solventAccessible ? -1 : 1));
jo.translucency = this.transparency;
if (this.surfaceColor >= 0) jo.argb = J.adapter.readers.pymol.PyMOL.getRGB (this.surfaceColor);
jo.modelIndex = this.currentAtomSetIndex;
jo.cacheID = this.surfaceInfoName;
this.setUniqueObjects (24, bs, 144, this.surfaceColor, 138, this.transparency, 0, 0, 0);
break;
case 8:
jo = this.addJmolObject (135180, bs, null);
jo.setSize (this.floatSetting (4));
jo.translucency = this.transparency;
this.setUniqueObjects (24, bs, 144, this.surfaceColor, 138, this.transparency, 0, 0, 0);
break;
case 3:
bs.and (this.bsLabeled);
if (bs.isEmpty ()) return;
jo = this.addJmolObject (5, bs, this.labels);
break;
case 10:
case 7:
jo = this.addJmolObject (659488, bs, null);
jo.setSize (this.floatSetting (44) / 15);
var color = Clazz_floatToInt (this.floatSetting (526));
if (color >= 0) jo.argb = J.adapter.readers.pymol.PyMOL.getRGB (color);
break;
case 0:
jo = this.addJmolObject (1, bs, null);
jo.setSize (this.floatSetting (21) * 2);
jo.translucency = this.stickTranslucency;
var col = Clazz_floatToInt (this.floatSetting (376));
if (col >= 0) jo.argb = J.adapter.readers.pymol.PyMOL.getRGB (col);
break;
case 5:
this.createCartoonObject ("H", (this.cartoonRockets ? 181 : 100));
this.createCartoonObject ("S", 96);
this.createCartoonObject ("L", 92);
this.createCartoonObject (" ", 92);
break;
case 22:
this.createPuttyObject (bs);
break;
case 21:
this.createTraceObject (bs);
break;
case 6:
this.createRibbonObject (bs);
break;
default:
JU.Logger.error ("Unprocessed representation type " + shapeID);
}
}, "~N,JU.BS");
Clazz_defineMethod (c$, "setUniqueObjects", 
 function (shape, bs, setColor, color, setTrans, trans, setSize, size, f) {
var n = bs.cardinality ();
var colixes = (setColor == 0 ? null :  Clazz_newShortArray (n, 0));
var atrans = (setTrans == 0 ? null :  Clazz_newFloatArray (n, 0));
var sizes =  Clazz_newFloatArray (n, 0);
for (var pt = 0, i = bs.nextSetBit (0); i >= 0; i = bs.nextSetBit (i + 1), pt++) {
var id = (this.reader == null ? this.uniqueIDs[i] : this.reader.getUniqueID (i));
if (colixes != null) {
var c = Clazz_floatToInt (this.getUniqueFloatDef (id, setColor, color));
if (c > 0) colixes[pt] = this.getColix (c, 0);
}if (atrans != null) {
atrans[pt] = this.getUniqueFloatDef (id, setTrans, trans);
}sizes[pt] = this.getUniqueFloatDef (id, setSize, size) * f;
}
return this.addJmolObject (shape, bs,  Clazz_newArray (-1, [colixes, atrans, sizes]));
}, "~N,JU.BS,~N,~N,~N,~N,~N,~N,~N");
Clazz_defineMethod (c$, "createSpacefillObjects", 
 function () {
for (var e, $e = this.htSpacefill.entrySet ().iterator (); $e.hasNext () && ((e = $e.next ()) || true);) {
var r = e.getKey ().floatValue ();
var bs = e.getValue ();
this.addJmolObject (1140850689, bs, null).rd =  new J.atomdata.RadiusData (null, r, J.atomdata.RadiusData.EnumType.ABSOLUTE, J.c.VDW.AUTO);
}
this.htSpacefill.clear ();
});
Clazz_defineMethod (c$, "createTraceObject", 
 function (bs) {
this.checkNucleicObject (bs, true);
if (bs.isEmpty ()) return;
var r = this.floatSetting (103);
var jo = this.setUniqueObjects (10, bs, 236, this.cartoonColor, 0, 0, 0, 0, 0);
jo.setSize (r * 2);
jo.translucency = this.cartoonTranslucency;
}, "JU.BS");
Clazz_defineMethod (c$, "checkNucleicObject", 
 function (bs, isTrace) {
var jo;
var bsNuc = JU.BSUtil.copy (this.bsNucleic);
bsNuc.and (bs);
if (!bsNuc.isEmpty ()) {
if (isTrace && this.cartoonLadderMode) this.haveNucleicLadder = true;
jo = this.addJmolObject (11, bsNuc, null);
jo.translucency = this.cartoonTranslucency;
jo.setSize (this.floatSetting (103) * 2);
bs.andNot (bsNuc);
}}, "JU.BS,~B");
Clazz_defineMethod (c$, "createPuttyObject", 
 function (bs) {
var info =  Clazz_newFloatArray (-1, [this.floatSetting (378), this.floatSetting (377), this.floatSetting (382), this.floatSetting (379), this.floatSetting (380), this.floatSetting (381), this.floatSetting (581)]);
this.addJmolObject (1112152078, bs, info).translucency = this.cartoonTranslucency;
}, "JU.BS");
Clazz_defineMethod (c$, "createRibbonObject", 
 function (bs) {
var isTrace = (this.floatSetting (19) > 1);
var r = this.floatSetting (20) * 2;
var rayScale = this.floatSetting (327);
if (r == 0) r = this.floatSetting (106) * (isTrace ? 1 : (rayScale <= 1 ? 0.5 : rayScale)) * 0.1;
var jo = this.setUniqueObjects ((isTrace ? 10 : 9), bs, 235, this.ribbonColor, 0, 0, 0, 0, 0);
jo.setSize (r);
jo.translucency = this.ribbonTranslucency;
}, "JU.BS");
Clazz_defineMethod (c$, "createCartoonObject", 
 function (key, sizeID) {
var bs = JU.BSUtil.copy (this.ssMapAtom.get (key));
if (bs == null) return;
bs.and (this.bsCartoon);
if (bs.isEmpty ()) return;
if (key.equals (" ")) {
this.checkNucleicObject (bs, false);
if (bs.isEmpty ()) return;
}var jo = this.setUniqueObjects (11, bs, 236, this.cartoonColor, 0, 0, 0, 0, 0);
jo.setSize (this.floatSetting (sizeID) * 2);
jo.translucency = this.cartoonTranslucency;
}, "~S,~N");
Clazz_defineMethod (c$, "addObject", 
 function (obj) {
this.jmolObjects.addLast (obj);
return obj;
}, "J.adapter.readers.pymol.JmolObject");
Clazz_defineMethod (c$, "setGroupVisible", 
 function (g, parentVis) {
var vis = parentVis && g.visible;
if (vis) return;
g.visible = false;
this.occludedObjects.put (g.objectNameID, Boolean.TRUE);
this.htHiddenObjects.put (g.name, Boolean.TRUE);
switch (g.type) {
case 1:
this.bsHidden.or (g.bsAtoms);
break;
default:
g.occluded = true;
break;
}
for (var gg, $gg = g.list.values ().iterator (); $gg.hasNext () && ((gg = $gg.next ()) || true);) {
this.setGroupVisible (gg, vis);
}
}, "J.adapter.readers.pymol.PyMOLGroup,~B");
Clazz_defineMethod (c$, "getSSMapAtom", 
function (ssType) {
var bs = this.ssMapAtom.get (ssType);
if (bs == null) this.ssMapAtom.put (ssType, bs =  new JU.BS ());
return bs;
}, "~S");
Clazz_defineMethod (c$, "setAtomDefs", 
function () {
this.setGroupVisibilities ();
var defs =  new java.util.Hashtable ();
for (var e, $e = this.htDefinedAtoms.entrySet ().iterator (); $e.hasNext () && ((e = $e.next ()) || true);) {
var bs = e.getValue ();
if (!bs.isEmpty ()) defs.put (e.getKey (), bs);
}
this.addJmolObject (12290, null, defs);
return defs;
});
Clazz_defineMethod (c$, "needSelections", 
function () {
return this.haveScenes || !this.htCarveSets.isEmpty ();
});
Clazz_defineMethod (c$, "setUniqueBonds", 
function (bsBonds, isSticks) {
if (isSticks) {
this.bsStickBonds.or (bsBonds);
this.bsStickBonds.andNot (this.bsLineBonds);
} else {
this.bsLineBonds.or (bsBonds);
this.bsLineBonds.andNot (this.bsStickBonds);
}}, "JU.BS,~B");
Clazz_defineMethod (c$, "finalizeUniqueBonds", 
 function () {
if (this.uniqueList == null) return;
var bondCount = this.vwr.ms.bondCount;
var bonds = this.vwr.ms.bo;
for (var i = this.bsUniqueBonds.nextSetBit (0); i >= 0; i = this.bsUniqueBonds.nextSetBit (i + 1)) {
var rad = NaN;
var id = this.uniqueList.get (Integer.$valueOf (i)).intValue ();
if (this.bsLineBonds.get (i)) {
rad = this.getUniqueFloatDef (id, 44, NaN) / 30;
} else if (this.bsStickBonds.get (i)) {
rad = this.getUniqueFloatDef (id, 21, NaN);
}var c = Clazz_floatToInt (this.getUniqueFloatDef (id, 376, 2147483647));
if (c != 2147483647) c = J.adapter.readers.pymol.PyMOL.getRGB (c);
var valence = this.getUniqueFloatDef (id, 64, NaN);
var t = this.getUniqueFloatDef (id, 198, NaN);
if (i < 0 || i >= bondCount) return;
var b = bonds[i];
this.setBondParameters (b, this.thisState - 1, rad, valence, c, t);
}
});
Clazz_defineMethod (c$, "setBondParameters", 
function (b, modelIndex, rad, pymolValence, argb, trans) {
if (modelIndex >= 0 && b.atom1.mi != modelIndex) return;
if (!Float.isNaN (rad)) b.mad = Clazz_floatToShort (rad * 2000);
var colix = b.colix;
if (argb != 2147483647) colix = JU.C.getColix (argb);
if (!Float.isNaN (trans)) b.colix = JU.C.getColixTranslucent3 (colix, trans != 0, trans);
 else if (b.colix != colix) b.colix = JU.C.copyColixTranslucency (b.colix, colix);
if (pymolValence == 1) b.order |= 98304;
 else if (pymolValence == 0) b.order |= 65536;
}, "JM.Bond,~N,~N,~N,~N,~N");
Clazz_defineMethod (c$, "addMesh", 
function (tok, obj, objName, isMep) {
var jo = this.addJmolObject (tok, null, obj);
this.setSceneObject (objName, -1);
var meshColor = Clazz_floatToInt (this.floatSetting (146));
if (meshColor < 0) meshColor = J.adapter.readers.pymol.PyMOLReader.intAt (J.adapter.readers.pymol.PyMOLReader.listAt (obj, 0), 2);
if (!isMep) {
jo.setSize (this.meshWidth);
jo.argb = J.adapter.readers.pymol.PyMOL.getRGB (meshColor);
}jo.translucency = this.transparency;
jo.cacheID = this.surfaceInfoName;
}, "~N,JU.Lst,~S,~B");
Clazz_defineMethod (c$, "addIsosurface", 
function (objectName) {
var jo = this.addJmolObject (135180, null, objectName);
jo.cacheID = this.surfaceInfoName;
return jo;
}, "~S");
Clazz_defineStatics (c$,
"MEAS_DIGITS",  Clazz_newIntArray (-1, [530, 531, 532]));
});
Clazz_declarePackage ("J.adapter.readers.pymol");
Clazz_load (["J.adapter.readers.pdb.PdbReader", "J.api.PymolAtomReader", "JU.BS", "$.P3"], "J.adapter.readers.pymol.PyMOLReader", ["java.lang.Boolean", "java.util.Hashtable", "JU.AU", "$.BC", "$.CU", "$.Lst", "$.PT", "$.V3", "J.adapter.readers.pymol.PickleReader", "$.PyMOL", "$.PyMOLScene", "J.adapter.smarter.Atom", "$.Bond", "$.Structure", "J.c.STR", "JU.BSUtil", "$.BoxInfo", "$.Logger"], function () {
c$ = Clazz_decorateAsClass (function () {
this.allowSurface = true;
this.doResize = false;
this.doCache = false;
this.isStateScript = false;
this.sourcePNGJ = false;
this.ac0 = 0;
this.$ac = 0;
this.stateCount = 0;
this.structureCount = 0;
this.isHidden = false;
this.bsStructureDefined = null;
this.bsBytesExcluded = null;
this.atomMap = null;
this.ssMapSeq = null;
this.pymolScene = null;
this.xyzMin = null;
this.xyzMax = null;
this.nModels = 0;
this.logging = false;
this.reps = null;
this.isMovie = false;
this.pymolFrame = 0;
this.allStates = false;
this.totalAtomCount = 0;
this.pymolVersion = 0;
this.trajectoryStep = null;
this.trajectoryPtr = 0;
this.objectName = null;
this.volumeData = null;
this.mapObjects = null;
this.haveMeasurements = false;
this.frames = null;
this.uniqueSettings = null;
this.atoms = null;
this.haveScenes = false;
this.baseModelIndex = 0;
this.sceneOrder = null;
this.bondCount = 0;
this.haveBinaryArrays = true;
this.ptTemp = null;
this.aTemp = null;
Clazz_instantialize (this, arguments);
}, J.adapter.readers.pymol, "PyMOLReader", J.adapter.readers.pdb.PdbReader, J.api.PymolAtomReader);
Clazz_prepareFields (c$, function () {
this.bsStructureDefined =  new JU.BS ();
this.xyzMin = JU.P3.new3 (1e6, 1e6, 1e6);
this.xyzMax = JU.P3.new3 (-1000000.0, -1000000.0, -1000000.0);
this.reps =  new Array (23);
this.ptTemp =  new JU.P3 ();
this.aTemp =  Clazz_newByteArray (16, 0);
});
Clazz_overrideMethod (c$, "setup", 
function (fullPath, htParams, reader) {
this.isBinary = this.mustFinalizeModelSet = true;
this.setupASCR (fullPath, htParams, reader);
}, "~S,java.util.Map,~O");
Clazz_defineMethod (c$, "initializeReader", 
function () {
this.baseAtomIndex = (this.htParams.get ("baseAtomIndex")).intValue ();
this.baseModelIndex = (this.htParams.get ("baseModelIndex")).intValue ();
this.asc.setInfo ("noAutoBond", Boolean.TRUE);
this.asc.setCurrentModelInfo ("pdbNoHydrogens", Boolean.TRUE);
this.asc.setInfo ("isPyMOL", Boolean.TRUE);
if (this.isTrajectory) this.trajectorySteps =  new JU.Lst ();
this.isStateScript = this.htParams.containsKey ("isStateScript");
this.sourcePNGJ = this.htParams.containsKey ("sourcePNGJ");
this.doResize = this.checkFilterKey ("DORESIZE");
this.allowSurface = !this.checkFilterKey ("NOSURFACE");
this.doCache = this.checkFilterKey ("DOCACHE");
if (this.doCache && this.sourcePNGJ) this.doCache = false;
 else if (this.sourcePNGJ && !this.doCache) this.sourcePNGJ = false;
if (this.doCache) this.bsBytesExcluded =  new JU.BS ();
Clazz_superCall (this, J.adapter.readers.pymol.PyMOLReader, "initializeReader", []);
});
Clazz_overrideMethod (c$, "processBinaryDocument", 
function () {
var logFile = this.vwr.getLogFileName ();
this.logging = (logFile.length > 0);
JU.Logger.info (this.logging ? "PyMOL (1) file data streaming to " + logFile : "To view raw PyMOL file data, use 'set logFile \"some_filename\" ");
var reader =  new J.adapter.readers.pymol.PickleReader (this.binaryDoc, this.vwr);
var map = reader.getMap (this.logging && JU.Logger.debuggingHigh);
reader = null;
this.process (map);
});
Clazz_overrideMethod (c$, "setAdditionalAtomParameters", 
function (atom) {
}, "J.adapter.smarter.Atom");
Clazz_overrideMethod (c$, "finalizeSubclassReader", 
function () {
this.finalizeReaderPDB ();
this.asc.setTensors ();
});
Clazz_overrideMethod (c$, "finalizeModelSet", 
function () {
this.pymolScene.setReaderObjects ();
if (this.haveMeasurements) {
this.appendLoadNote (this.vwr.getMeasurementInfoAsString ());
this.setLoadNote ();
}if (this.haveScenes) {
var scenes =  new Array (this.sceneOrder.size ());
for (var i = scenes.length; --i >= 0; ) scenes[i] = J.adapter.readers.pymol.PyMOLReader.stringAt (this.sceneOrder, i);

this.vwr.ms.msInfo.put ("scenes", scenes);
}this.vwr.ms.setTrajectoryBs (JU.BSUtil.newBitSet2 (this.baseModelIndex, this.vwr.ms.mc));
if (!this.isStateScript) this.pymolScene.setFrameObject (0, null);
if (this.bsBytesExcluded != null) {
var nExcluded = this.bsBytesExcluded.cardinality ();
var bytes0 = this.vwr.fm.getFileAsBytes (this.filePath, null);
var bytes =  Clazz_newByteArray (bytes0.length - nExcluded, 0);
for (var i = this.bsBytesExcluded.nextClearBit (0), n = bytes0.length, pt = 0; i < n; i = this.bsBytesExcluded.nextClearBit (i + 1)) bytes[pt++] = bytes0[i];

bytes0 = null;
var fileName = this.filePath;
this.vwr.cachePut (fileName, bytes);
}});
Clazz_defineMethod (c$, "process", 
 function (map) {
this.pymolVersion = (map.get ("version")).intValue ();
this.appendLoadNote ("PyMOL version: " + this.pymolVersion);
var settings = this.fixSettings (J.adapter.readers.pymol.PyMOLReader.getMapList (map, "settings"));
var lst = J.adapter.readers.pymol.PyMOLReader.listAt (settings, 749);
this.haveBinaryArrays = (lst != null && J.adapter.readers.pymol.PyMOLReader.floatAt (lst, 2) == 1);
this.sceneOrder = J.adapter.readers.pymol.PyMOLReader.getMapList (map, "scene_order");
this.haveScenes = this.getFrameScenes (map);
var file = J.adapter.readers.pymol.PyMOLReader.listAt (settings, 440);
if (file != null && file.size () > 2) JU.Logger.info ("PyMOL session file: " + file.get (2));
this.setUniqueSettings (J.adapter.readers.pymol.PyMOLReader.getMapList (map, "unique_settings"));
this.pymolScene =  new J.adapter.readers.pymol.PyMOLScene (this, this.vwr, settings, this.uniqueSettings, this.pymolVersion, this.haveScenes, this.baseAtomIndex, this.baseModelIndex, this.doCache, this.filePath);
var logFile = this.vwr.getLogFileName ();
this.logging = (logFile.length > 0);
JU.Logger.info (this.logging ? "PyMOL file data streaming to " + logFile : "To view raw PyMOL file data, use 'set logFile \"some_filename\" ");
var names = J.adapter.readers.pymol.PyMOLReader.getMapList (map, "names");
for (var e, $e = map.entrySet ().iterator (); $e.hasNext () && ((e = $e.next ()) || true);) {
var name = e.getKey ();
JU.Logger.info (name);
if (name.equals ("names")) {
for (var i = 1; i < names.size (); i++) {
var obj = J.adapter.readers.pymol.PyMOLReader.listAt (names, i);
JU.Logger.info ("  " + J.adapter.readers.pymol.PyMOLReader.stringAt (obj, 0));
}
}}
if (this.logging) {
if (this.logging) this.vwr.log ("$CLEAR$");
for (var e, $e = map.entrySet ().iterator (); $e.hasNext () && ((e = $e.next ()) || true);) {
var name = e.getKey ();
if (!"names".equals (name)) {
this.vwr.log ("\n===" + name + "===");
this.vwr.log (JU.PT.rep (e.getValue ().toString (), "[", "\n["));
}}
this.vwr.log ("\n===names===");
for (var i = 1; i < names.size (); i++) {
this.vwr.log ("");
var list = names.get (i);
this.vwr.log (" =" + J.adapter.readers.pymol.PyMOLReader.bytesToString (list.get (0)) + "=");
try {
this.vwr.log (JU.PT.rep (list.toString (), "[", "\n["));
} catch (e) {
}
}
}this.addColors (J.adapter.readers.pymol.PyMOLReader.getMapList (map, "colors"), this.pymolScene.globalSetting (214) != 0);
this.allStates = (this.pymolScene.globalSetting (49) != 0);
this.pymolFrame = Clazz_floatToInt (this.pymolScene.globalSetting (194));
this.getAtomAndStateCount (names);
this.pymolScene.setStateCount (this.stateCount);
var pymolState = Clazz_floatToInt (this.pymolScene.globalSetting (193));
if (!this.isMovie) this.pymolScene.setFrameObject (4115, (this.allStates ? Integer.$valueOf (-1) : Integer.$valueOf (pymolState - 1)));
this.appendLoadNote ("frame=" + this.pymolFrame + " state=" + pymolState + " all_states=" + this.allStates);
if (!this.isStateScript && this.doResize) {
var width = 0;
var height = 0;
var main = J.adapter.readers.pymol.PyMOLReader.getMapList (map, "main");
if (main != null) {
width = J.adapter.readers.pymol.PyMOLReader.intAt (main, 0);
height = J.adapter.readers.pymol.PyMOLReader.intAt (main, 1);
}var note;
if (width > 0 && height > 0) {
note = "PyMOL dimensions width=" + width + " height=" + height;
this.asc.setInfo ("preferredWidthHeight",  Clazz_newIntArray (-1, [width, height]));
this.vwr.resizeInnerPanel (width, height);
} else {
note = "PyMOL dimensions?";
}this.appendLoadNote (note);
}var mov;
if (!this.isStateScript && !this.allStates && (mov = J.adapter.readers.pymol.PyMOLReader.getMapList (map, "movie")) != null) {
var frameCount = J.adapter.readers.pymol.PyMOLReader.intAt (mov, 0);
if (frameCount > 0) this.processMovie (mov, frameCount);
}if (this.totalAtomCount == 0) this.asc.newAtomSet ();
if (this.allStates && this.desiredModelNumber == -2147483648) {
} else if (this.isMovie) {
switch (this.desiredModelNumber) {
case -2147483648:
break;
default:
this.desiredModelNumber = this.frames[(this.desiredModelNumber > 0 && this.desiredModelNumber <= this.frames.length ? this.desiredModelNumber : this.pymolFrame) - 1];
this.pymolScene.setFrameObject (4115, Integer.$valueOf (this.desiredModelNumber - 1));
break;
}
} else if (this.desiredModelNumber == 0) {
this.desiredModelNumber = pymolState;
} else {
}var n = names.size ();
for (var j = 0; j < this.stateCount; j++) {
if (!this.doGetModel (++this.nModels, null)) continue;
this.model (this.nModels);
this.pymolScene.currentAtomSetIndex = this.asc.iSet;
if (this.isTrajectory) {
this.trajectoryStep =  new Array (this.totalAtomCount);
this.trajectorySteps.addLast (this.trajectoryStep);
this.trajectoryPtr = 0;
}for (var i = 1; i < n; i++) this.processObject (J.adapter.readers.pymol.PyMOLReader.listAt (names, i), true, j);

}
for (var i = 1; i < n; i++) this.processObject (J.adapter.readers.pymol.PyMOLReader.listAt (names, i), false, 0);

this.pymolScene.setReaderObjectInfo (null, 0, null, false, null, null, null);
if (this.mapObjects != null && this.allowSurface) this.processMeshes ();
if (this.isTrajectory) {
this.appendLoadNote ("PyMOL trajectories read: " + this.trajectorySteps.size ());
this.asc.finalizeTrajectoryAs (this.trajectorySteps, null);
}this.processDefinitions ();
this.processSelectionsAndScenes (map);
this.pymolScene.finalizeVisibility ();
if (!this.isStateScript) {
this.vwr.initialize (false, true);
this.addJmolScript (this.pymolScene.getViewScript (J.adapter.readers.pymol.PyMOLReader.getMapList (map, "view")).toString ());
}if (this.$ac == 0) this.asc.setInfo ("dataOnly", Boolean.TRUE);
this.pymolScene.offsetObjects ();
}, "java.util.Map");
Clazz_defineMethod (c$, "fixSettings", 
 function (settings) {
var n = settings.size ();
for (var i = 0; i < n; i++) {
var i2 = J.adapter.readers.pymol.PyMOLReader.intAt (settings.get (i), 0);
if (i2 == -1) {
JU.Logger.info ("PyMOL reader adding null setting #" + i);
settings.set (i,  new JU.Lst ());
} else {
while (i < i2) {
JU.Logger.info ("PyMOL reader adding null setting #" + i);
settings.add (i++,  new JU.Lst ());
n++;
}
}}
return settings;
}, "JU.Lst");
Clazz_defineMethod (c$, "getFrameScenes", 
 function (map) {
if (this.sceneOrder == null) return false;
var scenes = map.get ("scene_dict");
for (var i = 0; i < this.sceneOrder.size (); i++) {
var name = J.adapter.readers.pymol.PyMOLReader.stringAt (this.sceneOrder, i);
var thisScene = J.adapter.readers.pymol.PyMOLReader.getMapList (scenes, name);
if (thisScene == null || thisScene.get (2) == null) this.sceneOrder.removeItemAt (i--);
}
return (this.sceneOrder != null && this.sceneOrder.size () != 0);
}, "java.util.Map");
Clazz_defineMethod (c$, "setUniqueSettings", 
 function (list) {
this.uniqueSettings =  new java.util.Hashtable ();
var max = 0;
if (list != null && list.size () != 0) {
for (var i = list.size (); --i >= 0; ) {
var atomSettings = list.get (i);
var id = J.adapter.readers.pymol.PyMOLReader.intAt (atomSettings, 0);
if (id > max) max = id;
var mySettings = atomSettings.get (1);
for (var j = mySettings.size (); --j >= 0; ) {
var setting = mySettings.get (j);
var uid = (id << 10) + J.adapter.readers.pymol.PyMOLReader.intAt (setting, 0);
this.uniqueSettings.put (Integer.$valueOf (uid), setting);
}
}
}return max;
}, "JU.Lst");
Clazz_defineMethod (c$, "addColors", 
 function (colors, isClamped) {
if (colors == null || colors.size () == 0) return;
for (var i = colors.size (); --i >= 0; ) {
var c = J.adapter.readers.pymol.PyMOLReader.listAt (colors, i);
J.adapter.readers.pymol.PyMOL.addColor (c.get (1), isClamped ? J.adapter.readers.pymol.PyMOLReader.colorSettingClamped (c, this.ptTemp) : J.adapter.readers.pymol.PyMOLReader.getColorPt (c.get (2), this.ptTemp));
}
}, "JU.Lst,~B");
Clazz_defineMethod (c$, "getAtomAndStateCount", 
 function (names) {
var n = 0;
for (var i = 1; i < names.size (); i++) {
var execObject = J.adapter.readers.pymol.PyMOLReader.listAt (names, i);
var type = J.adapter.readers.pymol.PyMOLReader.intAt (execObject, 4);
if (!this.checkObject (execObject)) continue;
if (type == 1) {
var pymolObject = J.adapter.readers.pymol.PyMOLReader.listAt (execObject, 5);
var states = J.adapter.readers.pymol.PyMOLReader.listAt (pymolObject, 4);
var ns = states.size ();
if (ns > this.stateCount) this.stateCount = ns;
var nAtoms;
var nBonds;
if (this.haveBinaryArrays) {
nBonds = Clazz_doubleToInt ((J.adapter.readers.pymol.PyMOLReader.listAt (pymolObject, 6).get (1)).length / 20);
nAtoms = Clazz_doubleToInt ((J.adapter.readers.pymol.PyMOLReader.listAt (pymolObject, 7).get (1)).length / 120);
n += nAtoms;
} else {
nBonds = J.adapter.readers.pymol.PyMOLReader.listAt (pymolObject, 6).size ();
nAtoms = J.adapter.readers.pymol.PyMOLReader.listAt (pymolObject, 7).size ();
}System.out.println ("Object " + this.objectName + " nBonds=" + nBonds + ", nAtoms = " + nAtoms);
for (var j = 0; j < ns; j++) {
var state = J.adapter.readers.pymol.PyMOLReader.listAt (states, j);
var idxToAtm = J.adapter.readers.pymol.PyMOLReader.listAt (state, 3);
if (idxToAtm == null) {
this.isTrajectory = false;
} else {
var m = idxToAtm.size ();
n += m;
if (this.isTrajectory && m != nAtoms) this.isTrajectory = false;
}}
}}
this.totalAtomCount = n;
JU.Logger.info ("PyMOL total atom count = " + this.totalAtomCount);
JU.Logger.info ("PyMOL state count = " + this.stateCount);
}, "JU.Lst");
Clazz_defineMethod (c$, "checkObject", 
 function (execObject) {
this.objectName = J.adapter.readers.pymol.PyMOLReader.stringAt (execObject, 0);
this.isHidden = (J.adapter.readers.pymol.PyMOLReader.intAt (execObject, 2) != 1);
return (this.objectName.indexOf ("_") != 0);
}, "JU.Lst");
Clazz_defineMethod (c$, "processMovie", 
 function (mov, frameCount) {
var movie =  new java.util.Hashtable ();
movie.put ("frameCount", Integer.$valueOf (frameCount));
movie.put ("currentFrame", Integer.$valueOf (this.pymolFrame - 1));
var haveCommands = false;
var haveViews = false;
var haveFrames = false;
var list = J.adapter.readers.pymol.PyMOLReader.listAt (mov, 4);
for (var i = list.size (); --i >= 0; ) if (J.adapter.readers.pymol.PyMOLReader.intAt (list, i) != 0) {
this.frames =  Clazz_newIntArray (list.size (), 0);
for (var j = this.frames.length; --j >= 0; ) this.frames[j] = J.adapter.readers.pymol.PyMOLReader.intAt (list, j) + 1;

movie.put ("frames", this.frames);
haveFrames = true;
break;
}
var cmds = J.adapter.readers.pymol.PyMOLReader.listAt (mov, 5);
var cmd;
for (var i = cmds.size (); --i >= 0; ) if ((cmd = J.adapter.readers.pymol.PyMOLReader.stringAt (cmds, i)) != null && cmd.length > 1) {
cmds = J.adapter.readers.pymol.PyMOLReader.fixMovieCommands (cmds);
if (cmds != null) {
movie.put ("commands", cmds);
haveCommands = true;
break;
}}
var views = J.adapter.readers.pymol.PyMOLReader.listAt (mov, 6);
var view;
for (var i = views.size (); --i >= 0; ) if ((view = J.adapter.readers.pymol.PyMOLReader.listAt (views, i)) != null && view.size () >= 12 && view.get (1) != null) {
haveViews = true;
views = J.adapter.readers.pymol.PyMOLReader.fixMovieViews (views);
if (views != null) {
movie.put ("views", views);
break;
}}
this.appendLoadNote ("PyMOL movie frameCount = " + frameCount);
if (haveFrames && !haveCommands && !haveViews) {
this.isMovie = true;
this.pymolScene.setReaderObjectInfo (null, 0, null, false, null, null, null);
this.pymolScene.setFrameObject (1073742031, movie);
} else {
}}, "JU.Lst,~N");
c$.fixMovieViews = Clazz_defineMethod (c$, "fixMovieViews", 
 function (views) {
return views;
}, "JU.Lst");
c$.fixMovieCommands = Clazz_defineMethod (c$, "fixMovieCommands", 
 function (cmds) {
return cmds;
}, "JU.Lst");
Clazz_defineMethod (c$, "processObject", 
 function (execObject, moleculeOnly, iState) {
if (execObject == null) return;
var type = J.adapter.readers.pymol.PyMOLReader.intAt (execObject, 4);
var startLen = execObject.get (execObject.size () - 1);
if ((type == 1) != moleculeOnly || !this.checkObject (execObject)) return;
var pymolObject = J.adapter.readers.pymol.PyMOLReader.listAt (execObject, 5);
var stateSettings = null;
if (type == 1) {
var states = J.adapter.readers.pymol.PyMOLReader.listAt (pymolObject, 4);
var state = J.adapter.readers.pymol.PyMOLReader.listAt (states, iState);
var idxToAtm = J.adapter.readers.pymol.PyMOLReader.listAt (state, 3);
if (iState > 0 && (idxToAtm == null || idxToAtm.size () == 0)) return;
stateSettings = J.adapter.readers.pymol.PyMOLReader.listAt (state, 7);
} else if (iState > 0) {
return;
}JU.Logger.info ("PyMOL model " + (this.nModels) + " Object " + this.objectName + (this.isHidden ? " (hidden)" : " (visible)"));
if (!this.isHidden && !this.isMovie && !this.allStates) {
if (this.pymolFrame > 0 && this.pymolFrame != this.nModels) {
this.pymolFrame = this.nModels;
this.allStates = true;
this.pymolScene.setFrameObject (4115, Integer.$valueOf (-1));
}}var objectHeader = J.adapter.readers.pymol.PyMOLReader.listAt (pymolObject, 0);
var parentGroupName = (execObject.size () < 8 ? null : J.adapter.readers.pymol.PyMOLReader.stringAt (execObject, 6));
if ("".equals (parentGroupName.trim ())) parentGroupName = null;
this.pymolScene.setReaderObjectInfo (this.objectName, type, parentGroupName, this.isHidden, J.adapter.readers.pymol.PyMOLReader.listAt (objectHeader, 8), stateSettings, (moleculeOnly ? "_" + (iState + 1) : ""));
var bsAtoms = null;
var doExclude = (this.bsBytesExcluded != null);
var msg = null;
switch (type) {
default:
msg = "" + type;
break;
case -1:
this.pymolScene.processSelection (execObject);
break;
case 1:
doExclude = false;
bsAtoms = this.processMolecule (pymolObject, iState);
break;
case 4:
doExclude = false;
this.processMeasure (pymolObject);
break;
case 3:
case 2:
this.processMap (pymolObject, type == 3, false);
break;
case 8:
this.processGadget (pymolObject);
break;
case 12:
if (parentGroupName == null) parentGroupName = "";
break;
case 6:
msg = "CGO";
this.processCGO (pymolObject);
break;
case 11:
msg = "ALIGNEMENT";
break;
case 9:
msg = "CALCULATOR";
break;
case 5:
msg = "CALLBACK";
break;
case 10:
msg = "SLICE";
break;
case 7:
msg = "SURFACE";
break;
}
if (parentGroupName != null || bsAtoms != null) this.pymolScene.addGroup (execObject, parentGroupName, type, bsAtoms);
if (doExclude) {
var i0 = J.adapter.readers.pymol.PyMOLReader.intAt (startLen, 0);
var len = J.adapter.readers.pymol.PyMOLReader.intAt (startLen, 1);
this.bsBytesExcluded.setBits (i0, i0 + len);
JU.Logger.info ("cached PSE file excludes PyMOL object type " + type + " name=" + this.objectName + " len=" + len);
}if (msg != null) JU.Logger.error ("Unprocessed object type " + msg + " " + this.objectName);
}, "JU.Lst,~B,~N");
Clazz_defineMethod (c$, "processCGO", 
 function (pymolObject) {
if (this.isStateScript) return;
if (this.isHidden) return;
var data = J.adapter.readers.pymol.PyMOLReader.sublistAt (pymolObject, [2, 0]);
var color = J.adapter.readers.pymol.PyMOL.getRGB (J.adapter.readers.pymol.PyMOLReader.intAt (J.adapter.readers.pymol.PyMOLReader.listAt (pymolObject, 0), 2));
var name = this.pymolScene.addCGO (data, color);
if (name != null) this.appendLoadNote ("CGO " + name);
}, "JU.Lst");
Clazz_defineMethod (c$, "processGadget", 
 function (pymolObject) {
if (this.objectName.endsWith ("_e_pot")) this.processMap (pymolObject, true, true);
}, "JU.Lst");
Clazz_defineMethod (c$, "processMap", 
 function (pymolObject, isObject, isGadget) {
if (isObject) {
if (this.sourcePNGJ) return;
if (this.isHidden && !isGadget) return;
if (this.mapObjects == null) this.mapObjects =  new JU.Lst ();
this.mapObjects.addLast (pymolObject);
} else {
if (this.volumeData == null) this.volumeData =  new java.util.Hashtable ();
this.volumeData.put (this.objectName, pymolObject);
if (!this.isHidden && !this.isStateScript) this.pymolScene.addIsosurface (this.objectName);
}pymolObject.addLast (this.objectName);
}, "JU.Lst,~B,~B");
Clazz_defineMethod (c$, "processMeasure", 
 function (pymolObject) {
if (this.isStateScript) return;
if (this.isHidden) return;
JU.Logger.info ("PyMOL measure " + this.objectName);
var measure = J.adapter.readers.pymol.PyMOLReader.sublistAt (pymolObject, [2, 0]);
var pt;
var nCoord = (Clazz_instanceOf (measure.get (pt = 1), JU.Lst) ? 2 : Clazz_instanceOf (measure.get (pt = 4), JU.Lst) ? 3 : Clazz_instanceOf (measure.get (pt = 6), JU.Lst) ? 4 : 0);
if (nCoord == 0) return;
var setting = J.adapter.readers.pymol.PyMOLReader.listAt (pymolObject, 0);
var bsReps = J.adapter.readers.pymol.PyMOLReader.getBsReps (J.adapter.readers.pymol.PyMOLReader.listAt (setting, 3));
var list = J.adapter.readers.pymol.PyMOLReader.listAt (measure, pt);
var offsets = J.adapter.readers.pymol.PyMOLReader.listAt (measure, 8);
var haveLabels = (measure.size () > 8);
var color = J.adapter.readers.pymol.PyMOLReader.intAt (setting, 2);
if (this.pymolScene.addMeasurements (null, nCoord, list, bsReps, color, offsets, haveLabels)) this.haveMeasurements = true;
}, "JU.Lst");
Clazz_defineMethod (c$, "processMolecule", 
 function (pymolObject, iState) {
var states = J.adapter.readers.pymol.PyMOLReader.listAt (pymolObject, 4);
var state = J.adapter.readers.pymol.PyMOLReader.listAt (states, iState);
var idxToAtm;
var coords;
var labelPositions;
var idxArray = null;
var coordsArray = null;
var labelArray = null;
var nBonds = J.adapter.readers.pymol.PyMOLReader.intAt (pymolObject, 2);
var nAtoms = J.adapter.readers.pymol.PyMOLReader.intAt (pymolObject, 3);
var n = nAtoms;
if (this.haveBinaryArrays && JU.AU.isAB (state.get (3))) {
idxToAtm = coords = labelPositions = null;
idxArray =  Clazz_newIntArray (nAtoms, 0);
coordsArray =  Clazz_newFloatArray (nAtoms * 3, 0);
this.fillFloatArrayFromBytes (state.get (2), coordsArray);
this.fillIntArrayFromBytes (state.get (3), idxArray);
var b = state.get (8);
if (b != null) {
labelArray =  Clazz_newFloatArray (nAtoms * 7, 0);
this.fillFloatArrayFromBytes (b, labelArray);
}} else {
coords = J.adapter.readers.pymol.PyMOLReader.listAt (state, 2);
idxToAtm = J.adapter.readers.pymol.PyMOLReader.listAt (state, 3);
labelPositions = J.adapter.readers.pymol.PyMOLReader.listAt (state, 8);
if (idxToAtm != null) n = idxToAtm.size ();
}if (n == 0) return null;
this.$ac = this.ac0 = this.asc.ac;
if (nAtoms == 0) return null;
this.ssMapSeq =  new java.util.Hashtable ();
if (iState == 0) this.processMolCryst (J.adapter.readers.pymol.PyMOLReader.listAt (pymolObject, 10));
var bonds = this.getBondList (J.adapter.readers.pymol.PyMOLReader.listAt (pymolObject, 6));
var pymolAtoms = J.adapter.readers.pymol.PyMOLReader.listAt (pymolObject, 7);
this.atomMap =  Clazz_newIntArray (nAtoms, 0);
var bsAtoms = this.pymolScene.setAtomMap (this.atomMap, this.ac0);
for (var i = 0; i < 23; i++) this.reps[i] = JU.BS.newN (1000);

if (iState == 0 || !this.isTrajectory) {
this.pymolScene.ensureCapacity (n);
var lexStr = null;
var atomArray = null;
var vArray = null;
if (this.haveBinaryArrays) {
var ver = J.adapter.readers.pymol.PyMOLReader.intAt (pymolAtoms, 0);
atomArray = pymolAtoms.get (1);
lexStr = this.getLexStr (pymolAtoms.get (2));
System.out.println ("PyMOL atom dump version " + ver);
vArray = (this.haveBinaryArrays ? J.adapter.readers.pymol.PyMOL.getVArray (ver) : null);
}for (var idx = 0; idx < n; idx++) {
var a = this.addAtom (pymolAtoms, (idxToAtm != null ? J.adapter.readers.pymol.PyMOLReader.intAt (idxToAtm, idx) : idxArray != null ? idxArray[idx] : idx), atomArray, vArray, lexStr, idx, coords, coordsArray, labelPositions, labelArray, bsAtoms, iState);
if (a != null) this.trajectoryStep[this.trajectoryPtr++] = a;
}
}this.addBonds (bonds);
this.addMolStructures ();
this.atoms = this.asc.atoms;
if (!this.isStateScript) this.createShapeObjects ();
this.ssMapSeq = null;
JU.Logger.info ("reading " + (this.$ac - this.ac0) + " atoms and " + nBonds + " bonds");
JU.Logger.info ("----------");
return bsAtoms;
}, "JU.Lst,~N");
Clazz_defineMethod (c$, "getLexStr", 
 function (lex) {
var pt = 0;
var n = JU.BC.bytesToInt (lex, pt, false);
var index =  Clazz_newIntArray (n, 0);
var imax = 0;
for (var i = 0; i < n; i++) {
pt += 4;
var ipt = index[i] = JU.BC.bytesToInt (lex, pt, false);
if (ipt > imax) imax = ipt;
}
var tokens =  new Array (imax + 1);
tokens[0] = " ";
pt += 4;
for (var i = 0; i < n; i++) {
var s = tokens[index[i]] = this.getCStr (lex, pt);
pt += s.length + 1;
}
return tokens;
}, "~A");
Clazz_defineMethod (c$, "getCStr", 
 function (lex, pt) {
try {
var a = this.aTemp;
var apt = 0;
var b = 0;
while ((b = lex[pt++]) != 0) {
if (apt >= a.length) a = this.aTemp = JU.AU.doubleLengthByte (a);
a[apt++] = b;
}
return  String.instantialize (JU.AU.arrayCopyByte (a, apt), "UTF-8");
} catch (e) {
if (Clazz_exceptionOf (e, java.io.UnsupportedEncodingException)) {
return null;
} else {
throw e;
}
}
}, "~A,~N");
Clazz_defineMethod (c$, "processMolCryst", 
 function (cryst) {
if (cryst == null || cryst.size () == 0) return;
var l = J.adapter.readers.pymol.PyMOLReader.sublistAt (cryst, [0, 0]);
var a = J.adapter.readers.pymol.PyMOLReader.sublistAt (cryst, [0, 1]);
this.setUnitCell (J.adapter.readers.pymol.PyMOLReader.floatAt (l, 0), J.adapter.readers.pymol.PyMOLReader.floatAt (l, 1), J.adapter.readers.pymol.PyMOLReader.floatAt (l, 2), J.adapter.readers.pymol.PyMOLReader.floatAt (a, 0), J.adapter.readers.pymol.PyMOLReader.floatAt (a, 1), J.adapter.readers.pymol.PyMOLReader.floatAt (a, 2));
this.setSpaceGroupName (J.adapter.readers.pymol.PyMOLReader.stringAt (cryst, 1));
}, "JU.Lst");
Clazz_defineMethod (c$, "getBondList", 
 function (bonds) {
var asSingle = !this.pymolScene.booleanSetting (64);
var b = null;
var vArray = null;
var n = bonds.size ();
var len = 0;
if (this.haveBinaryArrays && n == 2) {
var ver = J.adapter.readers.pymol.PyMOLReader.intAt (bonds, 0);
System.out.println ("PyMOL bond dump version " + ver);
vArray = J.adapter.readers.pymol.PyMOL.getVArrayB (ver);
b = bonds.get (1);
len = vArray[0];
n = Clazz_doubleToInt (b.length / len);
}var bondList =  new JU.Lst ();
bondList.ensureCapacity (n);
var ia;
var ib;
var order;
var uid = -1;
for (var i = 0, apt = 0; i < n; i++) {
if (this.haveBinaryArrays) {
ia = JU.BC.bytesToInt (b, apt + vArray[1], false);
ib = JU.BC.bytesToInt (b, apt + vArray[2], false);
uid = (b[apt + vArray[6]] == 0 ? -1 : JU.BC.bytesToInt (b, apt + vArray[5], false));
order = b[apt + vArray[3]];
apt += len;
} else {
var lst = J.adapter.readers.pymol.PyMOLReader.listAt (bonds, i);
ia = J.adapter.readers.pymol.PyMOLReader.intAt (lst, 0);
ib = J.adapter.readers.pymol.PyMOLReader.intAt (lst, 1);
order = J.adapter.readers.pymol.PyMOLReader.intAt (lst, 2);
uid = (lst.size () > 6 && J.adapter.readers.pymol.PyMOLReader.intAt (lst, 6) != 0 ? J.adapter.readers.pymol.PyMOLReader.intAt (lst, 5) : -1);
}if (order < 1 || order > 3) order = 1;
order |= (asSingle || order == 1 ? 65536 : 98304);
var bond =  new J.adapter.smarter.Bond (ia, ib, order);
bond.uniqueID = uid;
bondList.addLast (bond);
}
return bondList;
}, "JU.Lst");
Clazz_defineMethod (c$, "fillIntArrayFromBytes", 
 function (b, array) {
for (var i = 0, pt = 0; i < b.length; i += 4) array[pt++] = JU.BC.bytesToInt (b, i, false);

}, "~A,~A");
Clazz_defineMethod (c$, "fillFloatArrayFromBytes", 
 function (b, array) {
try {
for (var i = 0, pt = 0; i < b.length; i += 4) array[pt++] = JU.BC.bytesToFloat (b, i, false);

} catch (e) {
if (Clazz_exceptionOf (e, Exception)) {
} else {
throw e;
}
}
}, "~A,~A");
Clazz_defineMethod (c$, "addAtom", 
 function (pymolAtoms, apt, atomArray, vArray, lexStr, icoord, coords, coordArray, labelPositions, labelArray, bsState, iState) {
this.atomMap[apt] = -1;
var chainID;
var altLoc;
var group3;
var name;
var sym;
var label;
var ssType;
var resi;
var insCode = null;
var bfactor;
var occupancy;
var radius;
var partialCharge;
var seqNo;
var intReps;
var formalCharge;
var atomColor;
var serNo;
var cartoonType;
var flags;
var uniqueID = -1;
var isHetero;
var bonded;
var anisou = null;
var bsReps = null;
if (this.haveBinaryArrays) {
var vpt;
var pt = apt * vArray[0];
seqNo = this.atomInt (atomArray, pt, vArray[1]);
chainID = this.atomStr (atomArray, pt, vArray[34], lexStr);
resi = this.atomStr (atomArray, pt, vArray[38], lexStr);
group3 = this.atomStr (atomArray, pt, vArray[41], lexStr);
if (group3.length > 3) group3 = group3.substring (0, 3);
name = this.atomStr (atomArray, pt, vArray[36], lexStr);
sym = this.atomStr (atomArray, pt, vArray[37], lexStr);
label = this.atomStr (atomArray, pt, vArray[19], lexStr);
ssType = this.atomStr (atomArray, pt, vArray[39], null);
altLoc = this.atomStr (atomArray, pt, vArray[40], null);
if ((vpt = vArray[42]) == 0) {
resi = this.atomStr (atomArray, pt, vArray[38], null);
} else {
var b = atomArray[pt + vpt];
insCode = (b == 0 ? " " : "" + String.fromCharCode (b));
}bfactor = this.atomFloat (atomArray, pt, vArray[4]);
occupancy = this.atomFloat (atomArray, pt, vArray[5]);
radius = this.atomFloat (atomArray, pt, vArray[6]);
partialCharge = this.atomFloat (atomArray, pt, vArray[7]);
formalCharge = atomArray[pt + vArray[28]];
if (formalCharge > 125) formalCharge -= 512;
intReps = this.atomInt (atomArray, pt, vArray[20]);
atomColor = this.atomInt (atomArray, pt, vArray[9]);
serNo = this.atomInt (atomArray, pt, vArray[10]);
cartoonType = this.atomInt (atomArray, pt, vArray[30]);
flags = this.atomInt (atomArray, pt, vArray[11]);
uniqueID = this.atomInt (atomArray, pt, vArray[13]);
if (uniqueID == 0) uniqueID = -1;
anisou =  Clazz_newFloatArray (8, 0);
if ((vpt = vArray[45]) > 0) for (var i = 0; i < 6; i++) anisou[i] = JU.BC.bytesToShort (atomArray, pt + vpt + (i << 1), false);

bonded = this.atomBool (atomArray, pt, vArray[22], vArray[47]);
isHetero = this.atomBool (atomArray, pt, vArray[21], vArray[46]);
} else {
var a = J.adapter.readers.pymol.PyMOLReader.listAt (pymolAtoms, apt);
seqNo = J.adapter.readers.pymol.PyMOLReader.intAt (a, 0);
chainID = J.adapter.readers.pymol.PyMOLReader.stringAt (a, 1);
if (chainID.length == 0) chainID = " ";
altLoc = J.adapter.readers.pymol.PyMOLReader.stringAt (a, 2);
resi = J.adapter.readers.pymol.PyMOLReader.stringAt (a, 3);
group3 = J.adapter.readers.pymol.PyMOLReader.stringAt (a, 5);
name = J.adapter.readers.pymol.PyMOLReader.stringAt (a, 6);
sym = J.adapter.readers.pymol.PyMOLReader.stringAt (a, 7);
label = J.adapter.readers.pymol.PyMOLReader.stringAt (a, 9);
ssType = J.adapter.readers.pymol.PyMOLReader.stringAt (a, 10);
if (ssType.length == 0) ssType = " ";
ssType = ssType.substring (0, 1);
bfactor = J.adapter.readers.pymol.PyMOLReader.floatAt (a, 14);
occupancy = J.adapter.readers.pymol.PyMOLReader.floatAt (a, 15);
radius = J.adapter.readers.pymol.PyMOLReader.floatAt (a, 16);
partialCharge = J.adapter.readers.pymol.PyMOLReader.floatAt (a, 17);
formalCharge = J.adapter.readers.pymol.PyMOLReader.intAt (a, 18);
isHetero = (J.adapter.readers.pymol.PyMOLReader.intAt (a, 19) != 0);
bsReps = J.adapter.readers.pymol.PyMOLReader.getBsReps (J.adapter.readers.pymol.PyMOLReader.listAt (a, 20));
intReps = (bsReps == null ? J.adapter.readers.pymol.PyMOLReader.intAt (a, 20) : 0);
atomColor = J.adapter.readers.pymol.PyMOLReader.intAt (a, 21);
serNo = J.adapter.readers.pymol.PyMOLReader.intAt (a, 22);
cartoonType = J.adapter.readers.pymol.PyMOLReader.intAt (a, 23);
flags = J.adapter.readers.pymol.PyMOLReader.intAt (a, 24);
bonded = (J.adapter.readers.pymol.PyMOLReader.intAt (a, 25) != 0);
uniqueID = (a.size () > 40 && J.adapter.readers.pymol.PyMOLReader.intAt (a, 40) == 1 ? J.adapter.readers.pymol.PyMOLReader.intAt (a, 32) : -1);
if (a.size () > 46) anisou = J.adapter.readers.pymol.PyMOLReader.floatsAt (a, 41,  Clazz_newFloatArray (8, 0), 6);
}if (insCode == null) {
var len = resi.length;
var ch = (len > 0 ? resi.charAt (len - 1) : ' ');
insCode = (JU.PT.isDigit (ch) ? " " : "" + ch);
}if (group3.length > 3) group3 = group3.substring (0, 3);
if (group3.equals (" ")) group3 = "UNK";
if (sym.equals ("A")) sym = "C";
var ichain = this.vwr.getChainID (chainID, true);
var atom = this.processAtom ( new J.adapter.smarter.Atom (), name, (altLoc.length == 0 ? ' ' : altLoc.charAt (0)), group3, ichain, seqNo, insCode.charAt (0), isHetero, sym);
if (!this.filterPDBAtom (atom, this.fileAtomIndex++)) return null;
var x;
var y;
var z;
icoord *= 3;
if (this.haveBinaryArrays) {
x = coordArray[icoord];
y = coordArray[++icoord];
z = coordArray[++icoord];
} else {
x = J.adapter.readers.pymol.PyMOLReader.floatAt (coords, icoord);
y = J.adapter.readers.pymol.PyMOLReader.floatAt (coords, ++icoord);
z = J.adapter.readers.pymol.PyMOLReader.floatAt (coords, ++icoord);
}JU.BoxInfo.addPointXYZ (x, y, z, this.xyzMin, this.xyzMax, 0);
if (this.isTrajectory && iState > 0) return null;
var isNucleic = (J.adapter.readers.pymol.PyMOLReader.nucleic.indexOf (group3) >= 0);
if (bsState != null) bsState.set (this.$ac);
if (seqNo >= -1000 && (!ssType.equals (" ") || name.equals ("CA") || isNucleic)) {
var bs = this.ssMapSeq.get (ssType);
if (bs == null) this.ssMapSeq.put (ssType, bs =  new JU.BS ());
bs.set (seqNo - -1000);
ssType += ichain;
bs = this.ssMapSeq.get (ssType);
if (bs == null) this.ssMapSeq.put (ssType, bs =  new JU.BS ());
bs.set (seqNo - -1000);
}atom.bfactor = bfactor;
atom.foccupancy = occupancy;
atom.radius = radius;
if (atom.radius == 0) atom.radius = 1;
atom.partialCharge = partialCharge;
atom.vib = JU.V3.new3 (uniqueID, cartoonType, NaN);
if (anisou != null && anisou[0] != 0) this.asc.setAnisoBorU (atom, anisou, 12);
this.pymolScene.setAtomColor (atomColor);
this.processAtom2 (atom, serNo, x, y, z, formalCharge);
if (!bonded) this.pymolScene.bsNonbonded.set (this.$ac);
if (!label.equals (" ")) {
this.pymolScene.bsLabeled.set (this.$ac);
var labelPos =  Clazz_newFloatArray (7, 0);
if (labelArray != null) {
for (var i = 0; i < 7; i++) labelPos[i] = labelArray[apt * 7 + i];

} else {
var labelOffset = J.adapter.readers.pymol.PyMOLReader.listAt (labelPositions, apt);
if (labelOffset != null) {
for (var i = 0; i < 7; i++) labelPos[i] = J.adapter.readers.pymol.PyMOLReader.floatAt (labelOffset, i);

}}this.pymolScene.addLabel (this.$ac, uniqueID, atomColor, labelPos, label);
}if (this.isHidden) this.pymolScene.bsHidden.set (this.$ac);
if (isNucleic) this.pymolScene.bsNucleic.set (this.$ac);
for (var i = 0; i < 21; i++) if (bsReps == null ? ((intReps & (1 << i)) != 0) : bsReps.get (i)) this.reps[i].set (this.$ac);

if (atom.elementSymbol.equals ("H")) this.pymolScene.bsHydrogen.set (this.$ac);
if ((flags & J.adapter.readers.pymol.PyMOL.FLAG_NOSURFACE) != 0) this.pymolScene.bsNoSurface.set (this.$ac);
this.atomMap[apt] = this.$ac++;
return null;
}, "JU.Lst,~N,~A,~A,~A,~N,JU.Lst,~A,JU.Lst,~A,JU.BS,~N");
Clazz_defineMethod (c$, "atomBool", 
 function (atomArray, pt, offset, mask) {
return ((atomArray[pt + offset] & mask) != 0);
}, "~A,~N,~N,~N");
Clazz_defineMethod (c$, "atomFloat", 
 function (atomArray, pt, offset) {
try {
return JU.BC.bytesToFloat (atomArray, pt + offset, false);
} catch (e) {
if (Clazz_exceptionOf (e, Exception)) {
return 0;
} else {
throw e;
}
}
}, "~A,~N,~N");
Clazz_defineMethod (c$, "atomStr", 
 function (atomArray, pt, offset, lexStr) {
if (offset < 0) return lexStr[JU.BC.bytesToInt (atomArray, pt - offset, false)];
var s = this.getCStr (atomArray, pt + offset);
return (s.length == 0 ? " " : s);
}, "~A,~N,~N,~A");
Clazz_defineMethod (c$, "atomInt", 
 function (atomArray, pt, offset) {
return JU.BC.bytesToInt (atomArray, pt + offset, false);
}, "~A,~N,~N");
Clazz_defineMethod (c$, "addBonds", 
 function (bonds) {
var n = bonds.size ();
for (var i = 0; i < n; i++) {
var bond = bonds.get (i);
bond.atomIndex1 = this.atomMap[bond.atomIndex1];
bond.atomIndex2 = this.atomMap[bond.atomIndex2];
if (bond.atomIndex1 < 0 || bond.atomIndex2 < 0) continue;
this.pymolScene.setUniqueBond (this.bondCount++, bond.uniqueID);
this.asc.addBond (bond);
}
}, "JU.Lst");
Clazz_defineMethod (c$, "addMolStructures", 
 function () {
this.addMolSS ("H", J.c.STR.HELIX);
this.addMolSS ("S", J.c.STR.SHEET);
this.addMolSS ("L", J.c.STR.TURN);
this.addMolSS (" ", J.c.STR.NONE);
});
Clazz_defineMethod (c$, "addMolSS", 
 function (ssType, type) {
if (this.ssMapSeq.get (ssType) == null) return;
var istart = -1;
var iend = -1;
var ichain = 0;
var atoms = this.asc.atoms;
var bsSeq = null;
var bsAtom = this.pymolScene.getSSMapAtom (ssType);
var n = this.$ac + 1;
var seqNo = -1;
var thischain = 0;
var imodel = -1;
var thisModel = -1;
for (var i = this.ac0; i < n; i++) {
if (i == this.$ac) {
thischain = 0;
} else {
seqNo = atoms[i].sequenceNumber;
thischain = atoms[i].chainID;
thisModel = atoms[i].atomSetIndex;
}if (thischain != ichain || thisModel != imodel) {
ichain = thischain;
imodel = thisModel;
bsSeq = this.ssMapSeq.get (ssType + thischain);
--i;
if (istart < 0) continue;
} else if (bsSeq != null && seqNo >= -1000 && bsSeq.get (seqNo - -1000)) {
iend = i;
if (istart < 0) istart = i;
continue;
} else if (istart < 0) {
continue;
}if (type !== J.c.STR.NONE) {
var pt = this.bsStructureDefined.nextSetBit (istart);
if (pt >= 0 && pt <= iend) continue;
this.bsStructureDefined.setBits (istart, iend + 1);
var structure =  new J.adapter.smarter.Structure (imodel, type, type, type.toString (), ++this.structureCount, type === J.c.STR.SHEET ? 1 : 0, null);
var a = atoms[istart];
var b = atoms[iend];
var i0 = this.asc.getAtomSetAtomIndex (thisModel);
structure.set (a.chainID, a.sequenceNumber, a.insertionCode, b.chainID, b.sequenceNumber, b.insertionCode, istart - i0, iend - i0);
this.asc.addStructure (structure);
}bsAtom.setBits (istart, iend + 1);
istart = -1;
}
}, "~S,J.c.STR");
Clazz_defineMethod (c$, "createShapeObjects", 
 function () {
this.pymolScene.createShapeObjects (this.reps, this.allowSurface && !this.isHidden, this.ac0, this.$ac);
});
Clazz_defineMethod (c$, "processMeshes", 
 function () {
var fileName = this.vwr.fm.getFilePath (this.pymolScene.surfaceInfoName, true, false);
this.vwr.cachePut (fileName, this.volumeData);
for (var i = this.mapObjects.size (); --i >= 0; ) {
var obj = this.mapObjects.get (i);
var objName = obj.get (obj.size () - 1).toString ();
var isMep = objName.endsWith ("_e_pot");
var mapName;
var tok;
if (isMep) {
tok = 1073742016;
var root = objName.substring (0, objName.length - 3);
mapName = root + "map";
var isosurfaceName = this.pymolScene.getObjectID (root + "chg");
if (isosurfaceName == null) continue;
obj.addLast (isosurfaceName);
this.pymolScene.mepList += ";" + isosurfaceName + ";";
} else {
tok = 1073742018;
mapName = J.adapter.readers.pymol.PyMOLReader.stringAt (J.adapter.readers.pymol.PyMOLReader.sublistAt (obj, [2, 0]), 1);
}var surface = this.volumeData.get (mapName);
if (surface == null) continue;
obj.addLast (mapName);
this.volumeData.put (objName, obj);
this.volumeData.put ("__pymolSurfaceData__", obj);
if (!this.isStateScript) this.pymolScene.addMesh (tok, obj, objName, isMep);
this.appendLoadNote ("PyMOL object " + objName + " references map " + mapName);
}
});
Clazz_defineMethod (c$, "processDefinitions", 
 function () {
var s = this.vwr.getAtomDefs (this.pymolScene.setAtomDefs ());
if (s.length > 2) s = s.substring (0, s.length - 2);
this.appendLoadNote (s);
});
Clazz_defineMethod (c$, "processSelectionsAndScenes", 
 function (map) {
if (!this.pymolScene.needSelections ()) return;
var htObjNames = J.adapter.readers.pymol.PyMOLReader.listToMap (J.adapter.readers.pymol.PyMOLReader.getMapList (map, "names"));
if (this.haveScenes) {
var scenes = map.get ("scene_dict");
this.finalizeSceneData ();
var htSecrets = J.adapter.readers.pymol.PyMOLReader.listToMap (J.adapter.readers.pymol.PyMOLReader.getMapList (map, "selector_secrets"));
for (var i = 0; i < this.sceneOrder.size (); i++) {
var name = J.adapter.readers.pymol.PyMOLReader.stringAt (this.sceneOrder, i);
var thisScene = J.adapter.readers.pymol.PyMOLReader.getMapList (scenes, name);
if (thisScene == null) continue;
this.pymolScene.buildScene (name, thisScene, htObjNames, htSecrets);
this.appendLoadNote ("scene: " + name);
}
}this.pymolScene.setCarveSets (htObjNames);
}, "java.util.Map");
Clazz_defineMethod (c$, "finalizeSceneData", 
 function () {
var cartoonTypes =  Clazz_newIntArray (this.$ac, 0);
var uniqueIDs =  Clazz_newIntArray (this.$ac, 0);
var sequenceNumbers =  Clazz_newIntArray (this.$ac, 0);
var newChain =  Clazz_newBooleanArray (this.$ac, false);
var radii =  Clazz_newFloatArray (this.$ac, 0);
var lastAtomChain = -2147483648;
var lastAtomSet = -2147483648;
for (var i = 0; i < this.$ac; i++) {
cartoonTypes[i] = this.getCartoonType (i);
uniqueIDs[i] = this.getUniqueID (i);
sequenceNumbers[i] = this.getSequenceNumber (i);
radii[i] = this.getVDW (i);
if (lastAtomChain != this.atoms[i].chainID || lastAtomSet != this.atoms[i].atomSetIndex) {
newChain[i] = true;
lastAtomChain = this.atoms[i].chainID;
lastAtomSet = this.atoms[i].atomSetIndex;
}}
this.pymolScene.setAtomInfo (uniqueIDs, cartoonTypes, sequenceNumbers, newChain, radii);
});
c$.intAt = Clazz_defineMethod (c$, "intAt", 
function (list, i) {
return (list == null ? -1 : (list.get (i)).intValue ());
}, "JU.Lst,~N");
c$.pointAt = Clazz_defineMethod (c$, "pointAt", 
function (list, i, pt) {
pt.set (J.adapter.readers.pymol.PyMOLReader.floatAt (list, i++), J.adapter.readers.pymol.PyMOLReader.floatAt (list, i++), J.adapter.readers.pymol.PyMOLReader.floatAt (list, i));
return pt;
}, "JU.Lst,~N,JU.P3");
c$.floatsAt = Clazz_defineMethod (c$, "floatsAt", 
function (a, pt, data, len) {
if (a == null) return null;
for (var i = 0; i < len; i++) data[i] = J.adapter.readers.pymol.PyMOLReader.floatAt (a, pt++);

return data;
}, "JU.Lst,~N,~A,~N");
c$.floatAt = Clazz_defineMethod (c$, "floatAt", 
function (list, i) {
return (list == null || i >= list.size () ? 0 : (list.get (i)).floatValue ());
}, "JU.Lst,~N");
c$.listAt = Clazz_defineMethod (c$, "listAt", 
function (list, i) {
if (list == null || i >= list.size ()) return null;
var o = list.get (i);
return (Clazz_instanceOf (o, JU.Lst) ? o : null);
}, "JU.Lst,~N");
c$.sublistAt = Clazz_defineMethod (c$, "sublistAt", 
function (mesh, pt) {
for (var i = 0; i < pt.length; i++) mesh = mesh.get (pt[i]);

return mesh;
}, "JU.Lst,~A");
c$.listToMap = Clazz_defineMethod (c$, "listToMap", 
function (list) {
var map =  new java.util.Hashtable ();
for (var i = list.size (); --i >= 0; ) {
var item = J.adapter.readers.pymol.PyMOLReader.listAt (list, i);
if (item != null && item.size () > 0) map.put (J.adapter.readers.pymol.PyMOLReader.stringAt (item, 0), item);
}
return map;
}, "JU.Lst");
c$.stringAt = Clazz_defineMethod (c$, "stringAt", 
function (list, i) {
var o = list.get (i);
if (Clazz_instanceOf (o, String)) return o;
var a = list.get (i);
return (a.length == 0 ? " " : J.adapter.readers.pymol.PyMOLReader.bytesToString (a));
}, "JU.Lst,~N");
c$.bytesToString = Clazz_defineMethod (c$, "bytesToString", 
 function (object) {
try {
return  String.instantialize (object, "UTF-8");
} catch (e) {
if (Clazz_exceptionOf (e, Exception)) {
return object.toString ();
} else {
throw e;
}
}
}, "~O");
c$.colorSettingClamped = Clazz_defineMethod (c$, "colorSettingClamped", 
function (c, ptTemp) {
return J.adapter.readers.pymol.PyMOLReader.getColorPt (c.get (c.size () < 6 || J.adapter.readers.pymol.PyMOLReader.intAt (c, 4) == 0 ? 2 : 5), ptTemp);
}, "JU.Lst,JU.P3");
c$.getColorPt = Clazz_defineMethod (c$, "getColorPt", 
function (o, ptTemp) {
return (o == null ? 0 : Clazz_instanceOf (o, Integer) ? (o).intValue () : JU.CU.colorPtToFFRGB (J.adapter.readers.pymol.PyMOLReader.pointAt (o, 0, ptTemp)));
}, "~O,JU.P3");
c$.getMapList = Clazz_defineMethod (c$, "getMapList", 
 function (map, key) {
return map.get (key);
}, "java.util.Map,~S");
c$.getBsReps = Clazz_defineMethod (c$, "getBsReps", 
 function (list) {
if (list == null) return null;
var bsReps =  new JU.BS ();
var n = Math.min (list.size (), 21);
for (var i = 0; i < n; i++) {
if (J.adapter.readers.pymol.PyMOLReader.intAt (list, i) == 1) bsReps.set (i);
}
return bsReps;
}, "JU.Lst");
Clazz_overrideMethod (c$, "getUniqueID", 
function (iAtom) {
return Clazz_floatToInt (this.atoms[iAtom].vib.x);
}, "~N");
Clazz_overrideMethod (c$, "getCartoonType", 
function (iAtom) {
return Clazz_floatToInt (this.atoms[iAtom].vib.y);
}, "~N");
Clazz_overrideMethod (c$, "getVDW", 
function (iAtom) {
return this.atoms[iAtom].radius;
}, "~N");
Clazz_overrideMethod (c$, "getSequenceNumber", 
function (iAtom) {
return this.atoms[iAtom].sequenceNumber;
}, "~N");
Clazz_overrideMethod (c$, "compareAtoms", 
function (iPrev, i) {
return this.atoms[iPrev].chainID != this.atoms[i].chainID;
}, "~N,~N");
Clazz_defineStatics (c$,
"MIN_RESNO", -1000,
"nucleic", " A C G T U ADE THY CYT GUA URI DA DC DG DT DU ");
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
