Clazz.declarePackage ("J.adapter.readers.more");
Clazz.load (["J.adapter.smarter.AtomSetCollectionReader", "java.util.Properties"], "J.adapter.readers.more.ForceFieldReader", ["java.lang.Character", "JU.PT", "J.adapter.smarter.Atom"], function () {
c$ = Clazz.decorateAsClass (function () {
this.userAtomTypes = null;
this.atomTypes = null;
Clazz.instantialize (this, arguments);
}, J.adapter.readers.more, "ForceFieldReader", J.adapter.smarter.AtomSetCollectionReader);
Clazz.prepareFields (c$, function () {
this.atomTypes =  new java.util.Properties ();
});
Clazz.defineMethod (c$, "setUserAtomTypes", 
function () {
this.userAtomTypes = this.htParams.get ("atomTypes");
if (this.userAtomTypes != null) this.userAtomTypes = ";" + this.userAtomTypes + ";";
});
Clazz.defineMethod (c$, "getElementSymbol", 
function (atom, atomType) {
var elementSymbol = this.atomTypes.get (atomType);
if (elementSymbol != null) {
atom.elementSymbol = elementSymbol;
return true;
}var nChar = atomType.length;
var haveSymbol = (nChar < 2);
var ptType;
if (this.userAtomTypes != null && (ptType = this.userAtomTypes.indexOf (";" + atomType + "=>")) >= 0) {
ptType += nChar + 3;
elementSymbol = this.userAtomTypes.substring (ptType, this.userAtomTypes.indexOf (";", ptType)).trim ();
haveSymbol = true;
} else if (nChar == 1) {
elementSymbol = atomType.toUpperCase ();
haveSymbol = true;
} else {
var ch0 = atomType.charAt (0);
var ch1 = atomType.charAt (1);
var isXx = (JU.PT.isUpperCase (ch0) && JU.PT.isLowerCase (ch1));
if (" IM IP sz az sy ay ayt ".indexOf (atomType) >= 0) {
if (ch0 == 'I') {
elementSymbol = atom.atomName.substring (0, 2);
if (!JU.PT.isLowerCase (elementSymbol.charAt (1))) elementSymbol = elementSymbol.substring (0, 1);
} else {
elementSymbol = (ch0 == 's' ? "Si" : "Al");
}} else if (nChar == 2 && isXx) {
} else if (JU.PT.isLetter (ch0) && !JU.PT.isLetter (ch1)) {
elementSymbol = "" + Character.toUpperCase (ch0);
} else if (nChar > 2 && isXx && !JU.PT.isLetter (atomType.charAt (2))) {
elementSymbol = "" + ch0 + ch1;
} else {
ch0 = Character.toUpperCase (ch0);
var check = " " + atomType + " ";
if (" CA CB CC CD CE CF CG CH CI CJ CK CM CN CP CQ CR CT CV CW HA HP HC HO HS HW LP NA NB NC NT OH OS OW SH AH BH HT HY AC BC CS OA OB OE OT  dw hc hi hn ho hp hs hw hscp htip ca cg ci cn co coh cp cr cs ct c3h c3m c4h c4m na nb nh nho nh+ ni nn np npc nr nt nz oc oe oh op oscp otip sc sh sp br cl ca+ ar si lp nu sz oz az pz ga ge tioc titd li+ na+ rb+ cs+ mg2+ ca2+ ba2+ cu2+ cl- br- so4 sy oy ay ayt nac+ mg2c fe2c mn4c mn3c co2c ni2c lic+ pd2+ ti4c sr2c ca2c cly- hocl py vy nh4+ so4y lioh naoh koh foh cloh beoh al  CE1 CF1 CF2 CF3 CG CD2 CH1E CH2E CH3E CM CP3 CPH1 CPH2 CQ66 CR55 CR56 CR66 CS66 CT CT3 CT4 CUA1 CUA2 CUA3 CUY1 CUY2 HA HC HMU HO HT LP NC NC2 NO2 NP NR1 NR2 NR3 NR55 NR56 NR66 NT NX OA OAC OC OE OH2 OK OM OS OSH OSI OT OW PO3 PO4 PT PUA1 PUY1 SE SH1E SK SO1 SO2 SO3 SO4 ST ST2 ST2  br br- br1 cl cl- cl1 cl12 cl13 cl14 cl1p ca+ cu+2 fe+2 mg+2 zn+2 cs+ li+ na+ rb+ al4z si si4 si4c si4z ar he kr ne xe  dw hi hw ca cg ci co coh cp cr cs ct ct3 na nb nh nho ni no np nt nt2 nz oa oc oh op os ot sp bt cl\' si4l si5l si5t si6 si6o si\'  br ca cc cd ce cf cl cp cq cu cv cx cy ha hc hn ho hp hs na nb nc nd nh oh os pb pc pd pe pf px py sh ss sx sy  hn2 ho2 cz oo oz si sio hsi osi ".indexOf (check) < 0) {
} else if (" AH BH AC BC ".indexOf (check) >= 0) {
elementSymbol = "" + ch1;
} else if (" al al4z ar ba2+ beoh br br- br1 ca+ ca2+ ca2c cl cl\' cl- cl1 cl12 cl13 cl14 cl1p cloh cly- co2c cs+ cu+2 cu2+ fe+2 fe2c ga ge he kr li+ lic+ lioh lp LP mg+2 mg2+ mg2c mn3c mn4c na+ nac+ naoh ne ni2c nu pd2+ rb+ si si\' si4 si4c si4l si4z si5l si5t si6 si6o sio sr2c ti4c tioc titd xe zn+2 ".indexOf (check) >= 0) {
elementSymbol = "" + ch0 + ch1;
} else {
elementSymbol = "" + ch0;
}}if (elementSymbol == null) {
elementSymbol = "" + ch0 + Character.toLowerCase (ch1);
} else {
haveSymbol = true;
}}atom.elementSymbol = elementSymbol;
if (haveSymbol) this.atomTypes.put (atomType, elementSymbol);
return haveSymbol;
}, "J.adapter.smarter.Atom,~S");
c$.deducePdbElementSymbol = Clazz.defineMethod (c$, "deducePdbElementSymbol", 
function (isHetero, XX, group3) {
var i = XX.indexOf ('\0');
var atomType = null;
if (i >= 0) {
atomType = XX.substring (i + 1);
XX = XX.substring (0, i);
if (atomType != null && atomType.length == 1) return atomType;
}if (XX.equalsIgnoreCase (group3)) return XX;
var len = XX.length;
var ch1 = ' ';
i = 0;
while (i < len && (ch1 = XX.charAt (i++)) <= '9') {
}
var ch2 = (i < len ? XX.charAt (i) : ' ');
var full = group3 + "." + ch1 + ch2;
if (("OEC.CA ICA.CA OC1.CA OC2.CA OC4.CA").indexOf (full) >= 0) return "Ca";
if (XX.indexOf ("'") > 0 || XX.indexOf ("*") >= 0 || "HCNO".indexOf (ch1) >= 0 && ch2 <= 'H' || XX.startsWith ("CM")) return "" + ch1;
if (isHetero && J.adapter.smarter.Atom.isValidSymNoCase (ch1, ch2)) return ("" + ch1 + ch2).trim ();
if (J.adapter.smarter.Atom.isValidSym1 (ch1)) return "" + ch1;
if (J.adapter.smarter.Atom.isValidSym1 (ch2)) return "" + ch2;
return "Xx";
}, "~B,~S,~S");
Clazz.defineStatics (c$,
"ffTypes", " CA CB CC CD CE CF CG CH CI CJ CK CM CN CP CQ CR CT CV CW HA HP HC HO HS HW LP NA NB NC NT OH OS OW SH AH BH HT HY AC BC CS OA OB OE OT  dw hc hi hn ho hp hs hw hscp htip ca cg ci cn co coh cp cr cs ct c3h c3m c4h c4m na nb nh nho nh+ ni nn np npc nr nt nz oc oe oh op oscp otip sc sh sp br cl ca+ ar si lp nu sz oz az pz ga ge tioc titd li+ na+ rb+ cs+ mg2+ ca2+ ba2+ cu2+ cl- br- so4 sy oy ay ayt nac+ mg2c fe2c mn4c mn3c co2c ni2c lic+ pd2+ ti4c sr2c ca2c cly- hocl py vy nh4+ so4y lioh naoh koh foh cloh beoh al  CE1 CF1 CF2 CF3 CG CD2 CH1E CH2E CH3E CM CP3 CPH1 CPH2 CQ66 CR55 CR56 CR66 CS66 CT CT3 CT4 CUA1 CUA2 CUA3 CUY1 CUY2 HA HC HMU HO HT LP NC NC2 NO2 NP NR1 NR2 NR3 NR55 NR56 NR66 NT NX OA OAC OC OE OH2 OK OM OS OSH OSI OT OW PO3 PO4 PT PUA1 PUY1 SE SH1E SK SO1 SO2 SO3 SO4 ST ST2 ST2  br br- br1 cl cl- cl1 cl12 cl13 cl14 cl1p ca+ cu+2 fe+2 mg+2 zn+2 cs+ li+ na+ rb+ al4z si si4 si4c si4z ar he kr ne xe  dw hi hw ca cg ci co coh cp cr cs ct ct3 na nb nh nho ni no np nt nt2 nz oa oc oh op os ot sp bt cl\' si4l si5l si5t si6 si6o si\'  br ca cc cd ce cf cl cp cq cu cv cx cy ha hc hn ho hp hs na nb nc nd nh oh os pb pc pd pe pf px py sh ss sx sy  hn2 ho2 cz oo oz si sio hsi osi ",
"twoChar", " al al4z ar ba2+ beoh br br- br1 ca+ ca2+ ca2c cl cl' cl- cl1 cl12 cl13 cl14 cl1p cloh cly- co2c cs+ cu+2 cu2+ fe+2 fe2c ga ge he kr li+ lic+ lioh lp LP mg+2 mg2+ mg2c mn3c mn4c na+ nac+ naoh ne ni2c nu pd2+ rb+ si si' si4 si4c si4l si4z si5l si5t si6 si6o sio sr2c ti4c tioc titd xe zn+2 ",
"specialTypes", " IM IP sz az sy ay ayt ",
"secondCharOnly", " AH BH AC BC ");
});
