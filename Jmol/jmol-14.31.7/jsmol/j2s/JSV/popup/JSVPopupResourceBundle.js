Clazz.declarePackage ("JSV.popup");
Clazz.load (["J.popup.PopupResource"], "JSV.popup.JSVPopupResourceBundle", null, function () {
c$ = Clazz.declareType (JSV.popup, "JSVPopupResourceBundle", J.popup.PopupResource);
Clazz.overrideMethod (c$, "getMenuName", 
function () {
return "appMenu";
});
Clazz.makeConstructor (c$, 
function () {
Clazz.superConstructor (this, JSV.popup.JSVPopupResourceBundle, [null, null]);
});
Clazz.overrideMethod (c$, "buildStructure", 
function (menuStructure) {
this.addItems (JSV.popup.JSVPopupResourceBundle.menuContents);
this.addItems (JSV.popup.JSVPopupResourceBundle.structureContents);
if (menuStructure != null) this.setStructure (menuStructure, null);
}, "~S");
Clazz.overrideMethod (c$, "getWordContents", 
function () {
return  Clazz.newArray (-1, []);
});
Clazz.overrideMethod (c$, "getMenuAsText", 
function (title) {
return this.getStuctureAsText (title, JSV.popup.JSVPopupResourceBundle.menuContents, JSV.popup.JSVPopupResourceBundle.structureContents);
}, "~S");
Clazz.defineStatics (c$,
"menuContents",  Clazz.newArray (-1, [ Clazz.newArray (-1, ["appMenu", "_SIGNED_FileMenu Spectra... ShowMenu OptionsMenu ZoomMenu - Integration Peaks Measurements - Script... Properties"]),  Clazz.newArray (-1, ["appletMenu", "_SIGNED_FileMenu Spectra... - OptionsMenu ZoomMenu - Integration Peaks Measurements - Script... - Print... - AboutMenu"]),  Clazz.newArray (-1, ["_SIGNED_FileMenu", "Open_File... Open_Simulation... Open_URL... - Add_File... Add_Simulation... Add_URL... - Save_AsMenu Export_AsMenu - Close_Views Close_Simulations Close_All"]),  Clazz.newArray (-1, ["Save_AsMenu", "Original... JDXMenu CML XML(AnIML)"]),  Clazz.newArray (-1, ["JDXMenu", "XY DIF DIFDUP FIX PAC SQZ"]),  Clazz.newArray (-1, ["Export_AsMenu", "PDF - JAVAJPG PNG"]),  Clazz.newArray (-1, ["ShowMenu", "Show_Header Show_Source Show_Overlay_Key"]),  Clazz.newArray (-1, ["OptionsMenu", "Toggle_Grid Toggle_X_Axis Toggle_Y_Axis Toggle_Coordinates Toggle_Trans/Abs Reverse_Plot Points_Only - Predicted_Solution_Colour Fill_Solution_Colour_(all)  Fill_Solution_Colour_(none)"]),  Clazz.newArray (-1, ["ZoomMenu", "Next_Zoom Previous_Zoom Reset_Zoom - Set_X_Scale... Reset_X_Scale"]),  Clazz.newArray (-1, ["AboutMenu", "VERSION"])]),
"structureContents",  Clazz.newArray (-1, [ Clazz.newArray (-1, ["Open_File...", "load ?"]),  Clazz.newArray (-1, ["Open_URL...", "load http://?"]),  Clazz.newArray (-1, ["Open_Simulation...", "load $?"]),  Clazz.newArray (-1, ["Add_File...", "load append ?"]),  Clazz.newArray (-1, ["Add_URL...", "load append http://?"]),  Clazz.newArray (-1, ["Add_Simulation...", "load append $?; view \"1HNMR\""]),  Clazz.newArray (-1, ["Close_All", "close all"]),  Clazz.newArray (-1, ["Close_Views", "close views"]),  Clazz.newArray (-1, ["Close Simulations", "close simulations"]),  Clazz.newArray (-1, ["Show_Header", "showProperties"]),  Clazz.newArray (-1, ["Show_Source", "showSource"]),  Clazz.newArray (-1, ["Show_Overlay_Key...", "showKey"]),  Clazz.newArray (-1, ["Next_Zoom", "zoom next;showMenu"]),  Clazz.newArray (-1, ["Previous_Zoom", "zoom prev;showMenu"]),  Clazz.newArray (-1, ["Reset_Zoom", "zoom clear"]),  Clazz.newArray (-1, ["Reset_X_Scale", "zoom out"]),  Clazz.newArray (-1, ["Set_X_Scale...", "zoom"]),  Clazz.newArray (-1, ["Spectra...", "view"]),  Clazz.newArray (-1, ["Overlay_Offset...", "stackOffsetY"]),  Clazz.newArray (-1, ["Script...", "script INLINE"]),  Clazz.newArray (-1, ["Properties", "showProperties"]),  Clazz.newArray (-1, ["Toggle_X_Axis", "XSCALEON toggle;showMenu"]),  Clazz.newArray (-1, ["Toggle_Y_Axis", "YSCALEON toggle;showMenu"]),  Clazz.newArray (-1, ["Toggle_Grid", "GRIDON toggle;showMenu"]),  Clazz.newArray (-1, ["Toggle_Coordinates", "COORDINATESON toggle;showMenu"]),  Clazz.newArray (-1, ["Reverse_Plot", "REVERSEPLOT toggle;showMenu"]),  Clazz.newArray (-1, ["Points_Only", "POINTSONLY toggle;showMenu"]),  Clazz.newArray (-1, ["Measurements", "SHOWMEASUREMENTS"]),  Clazz.newArray (-1, ["Peaks", "SHOWPEAKLIST"]),  Clazz.newArray (-1, ["Integration", "SHOWINTEGRATION"]),  Clazz.newArray (-1, ["Toggle_Trans/Abs", "IRMODE TOGGLE"]),  Clazz.newArray (-1, ["Predicted_Solution_Colour", "GETSOLUTIONCOLOR"]),  Clazz.newArray (-1, ["Fill_Solution_Colour_(all)", "GETSOLUTIONCOLOR fillall"]),  Clazz.newArray (-1, ["Fill_Solution_Colour_(none)", "GETSOLUTIONCOLOR fillallnone"]),  Clazz.newArray (-1, ["Print...", "print"]),  Clazz.newArray (-1, ["Original...", "write SOURCE"]),  Clazz.newArray (-1, ["CML", "write CML"]),  Clazz.newArray (-1, ["XML(AnIML)", "write XML"]),  Clazz.newArray (-1, ["XY", "write XY"]),  Clazz.newArray (-1, ["DIF", "write DIF"]),  Clazz.newArray (-1, ["DIFDUP", "write DIFDUP"]),  Clazz.newArray (-1, ["FIX", "write FIX"]),  Clazz.newArray (-1, ["PAC", "write PAC"]),  Clazz.newArray (-1, ["SQZ", "write SQZ"]),  Clazz.newArray (-1, ["JPG", "write JPG"]),  Clazz.newArray (-1, ["SVG", "write SVG"]),  Clazz.newArray (-1, ["PNG", "write PNG"]),  Clazz.newArray (-1, ["PDF", "write PDF"])]));
});
