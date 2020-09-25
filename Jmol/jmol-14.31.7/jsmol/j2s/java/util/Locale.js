Clazz.load(null,"java.util.Locale",["java.lang.InternalError","$.NullPointerException","java.util.MissingResourceException"],function(){
c$=Clazz.decorateAsClass(function(){
this.language="";
this.country="";
this.variant="";
this.hashcode=-1;
Clazz.instantialize(this,arguments);
},java.util,"Locale",null,[Cloneable,java.io.Serializable]);
Clazz.makeConstructor(c$,
function(language,country,variant){
this.language=this.convertOldISOCodes(language);
this.country=country.toUpperCase();
this.variant=variant.intern();
},"~S,~S,~S");
Clazz.makeConstructor(c$,
function(language,country){
this.construct(language,country,"");
},"~S,~S");
Clazz.makeConstructor(c$,
function(language){
this.construct(language,"","");
},"~S");
c$.getDefault=Clazz.defineMethod(c$,"getDefault",
function(){
if(java.util.Locale.defaultLocale==null){
var language="en";
var country="US";
var variant="";
navigator.userAgent.replace(/;\s*([a-zA-Z]{2,})[-_]([a-zA-Z]{2,});/,function($0,$1,$2){
language=$1;
country=$2;
});
java.util.Locale.defaultLocale=new java.util.Locale(language,country,variant);
}return java.util.Locale.defaultLocale;
});
c$.setDefault=Clazz.defineMethod(c$,"setDefault",
function(newLocale){
if(newLocale==null)throw new NullPointerException("Can't set default locale to NULL");
{
java.util.Locale.defaultLocale=newLocale;
}},"java.util.Locale");
c$.getAvailableLocales=Clazz.defineMethod(c$,"getAvailableLocales",
function(){
var lcl=java.util.Locale;
return[
lcl.ENGLISH,
lcl.ENGLISH,
lcl.FRENCH,
lcl.GERMAN,
lcl.ITALIAN,
lcl.JAPANESE,
lcl.KOREAN,
lcl.CHINESE,
lcl.SIMPLIFIED_CHINESE,
lcl.TRADITIONAL_CHINESE,
lcl.FRANCE,
lcl.GERMANY,
lcl.ITALY,
lcl.JAPAN,
lcl.KOREA,
lcl.CHINA,
lcl.PRC,
lcl.TAIWAN,
lcl.UK,
lcl.US,
lcl.CANADA,
lcl.CANADA_FRENCH
];
});
c$.getISOCountries=Clazz.defineMethod(c$,"getISOCountries",
function(){
if(java.util.Locale.isoCountries==null){
($t$=java.util.Locale.isoCountries=new Array(Math.floor(",ADAND,AEARE,AFAFG,AGATG,AIAIA,ALALB,AMARM,ANANT,AOAGO,AQATA,ARARG,ASASM,ATAUT,AUAUS,AWABW,AZAZE,BABIH,BBBRB,BDBGD,BEBEL,BFBFA,BGBGR,BHBHR,BIBDI,BJBEN,BMBMU,BNBRN,BOBOL,BRBRA,BSBHS,BTBTN,BVBVT,BWBWA,BYBLR,BZBLZ,CACAN,CCCCK,CFCAF,CGCOG,CHCHE,CICIV,CKCOK,CLCHL,CMCMR,CNCHN,COCOL,CRCRI,CUCUB,CVCPV,CXCXR,CYCYP,CZCZE,DEDEU,DJDJI,DKDNK,DMDMA,DODOM,DZDZA,ECECU,EEEST,EGEGY,EHESH,ERERI,ESESP,ETETH,FIFIN,FJFJI,FKFLK,FMFSM,FOFRO,FRFRA,FXFXX,GAGAB,GBGBR,GDGRD,GEGEO,GFGUF,GHGHA,GIGIB,GLGRL,GMGMB,GNGIN,GPGLP,GQGNQ,GRGRC,GSSGS,GTGTM,GUGUM,GWGNB,GYGUY,HKHKG,HMHMD,HNHND,HRHRV,HTHTI,HUHUN,IDIDN,IEIRL,ILISR,ININD,IOIOT,IQIRQ,IRIRN,ISISL,ITITA,JMJAM,JOJOR,JPJPN,KEKEN,KGKGZ,KHKHM,KIKIR,KMCOM,KNKNA,KPPRK,KRKOR,KWKWT,KYCYM,KZKAZ,LALAO,LBLBN,LCLCA,LILIE,LKLKA,LRLBR,LSLSO,LTLTU,LULUX,LVLVA,LYLBY,MAMAR,MCMCO,MDMDA,MGMDG,MHMHL,MKMKD,MLMLI,MMMMR,MNMNG,MOMAC,MPMNP,MQMTQ,MRMRT,MSMSR,MTMLT,MUMUS,MVMDV,MWMWI,MXMEX,MYMYS,MZMOZ,NANAM,NCNCL,NENER,NFNFK,NGNGA,NINIC,NLNLD,NONOR,NPNPL,NRNRU,NUNIU,NZNZL,OMOMN,PAPAN,PEPER,PFPYF,PGPNG,PHPHL,PKPAK,PLPOL,PMSPM,PNPCN,PRPRI,PTPRT,PWPLW,PYPRY,QAQAT,REREU,ROROM,RURUS,RWRWA,SASAU,SBSLB,SCSYC,SDSDN,SESWE,SGSGP,SHSHN,SISVN,SJSJM,SKSVK,SLSLE,SMSMR,SNSEN,SOSOM,SRSUR,STSTP,SVSLV,SYSYR,SZSWZ,TCTCA,TDTCD,TFATF,TGTGO,THTHA,TJTJK,TKTKL,TMTKM,TNTUN,TOTON,TPTMP,TRTUR,TTTTO,TVTUV,TWTWN,TZTZA,UAUKR,UGUGA,UMUMI,USUSA,UYURY,UZUZB,VAVAT,VCVCT,VEVEN,VGVGB,VIVIR,VNVNM,VUVUT,WFWLF,WSWSM,YEYEM,YTMYT,YUYUG,ZAZAF,ZMZMB,ZRZAR,ZWZWE".length/6)),java.util.Locale.prototype.isoCountries=java.util.Locale.isoCountries,$t$);
for(var i=0;i<java.util.Locale.isoCountries.length;i++)java.util.Locale.isoCountries[i]=",ADAND,AEARE,AFAFG,AGATG,AIAIA,ALALB,AMARM,ANANT,AOAGO,AQATA,ARARG,ASASM,ATAUT,AUAUS,AWABW,AZAZE,BABIH,BBBRB,BDBGD,BEBEL,BFBFA,BGBGR,BHBHR,BIBDI,BJBEN,BMBMU,BNBRN,BOBOL,BRBRA,BSBHS,BTBTN,BVBVT,BWBWA,BYBLR,BZBLZ,CACAN,CCCCK,CFCAF,CGCOG,CHCHE,CICIV,CKCOK,CLCHL,CMCMR,CNCHN,COCOL,CRCRI,CUCUB,CVCPV,CXCXR,CYCYP,CZCZE,DEDEU,DJDJI,DKDNK,DMDMA,DODOM,DZDZA,ECECU,EEEST,EGEGY,EHESH,ERERI,ESESP,ETETH,FIFIN,FJFJI,FKFLK,FMFSM,FOFRO,FRFRA,FXFXX,GAGAB,GBGBR,GDGRD,GEGEO,GFGUF,GHGHA,GIGIB,GLGRL,GMGMB,GNGIN,GPGLP,GQGNQ,GRGRC,GSSGS,GTGTM,GUGUM,GWGNB,GYGUY,HKHKG,HMHMD,HNHND,HRHRV,HTHTI,HUHUN,IDIDN,IEIRL,ILISR,ININD,IOIOT,IQIRQ,IRIRN,ISISL,ITITA,JMJAM,JOJOR,JPJPN,KEKEN,KGKGZ,KHKHM,KIKIR,KMCOM,KNKNA,KPPRK,KRKOR,KWKWT,KYCYM,KZKAZ,LALAO,LBLBN,LCLCA,LILIE,LKLKA,LRLBR,LSLSO,LTLTU,LULUX,LVLVA,LYLBY,MAMAR,MCMCO,MDMDA,MGMDG,MHMHL,MKMKD,MLMLI,MMMMR,MNMNG,MOMAC,MPMNP,MQMTQ,MRMRT,MSMSR,MTMLT,MUMUS,MVMDV,MWMWI,MXMEX,MYMYS,MZMOZ,NANAM,NCNCL,NENER,NFNFK,NGNGA,NINIC,NLNLD,NONOR,NPNPL,NRNRU,NUNIU,NZNZL,OMOMN,PAPAN,PEPER,PFPYF,PGPNG,PHPHL,PKPAK,PLPOL,PMSPM,PNPCN,PRPRI,PTPRT,PWPLW,PYPRY,QAQAT,REREU,ROROM,RURUS,RWRWA,SASAU,SBSLB,SCSYC,SDSDN,SESWE,SGSGP,SHSHN,SISVN,SJSJM,SKSVK,SLSLE,SMSMR,SNSEN,SOSOM,SRSUR,STSTP,SVSLV,SYSYR,SZSWZ,TCTCA,TDTCD,TFATF,TGTGO,THTHA,TJTJK,TKTKL,TMTKM,TNTUN,TOTON,TPTMP,TRTUR,TTTTO,TVTUV,TWTWN,TZTZA,UAUKR,UGUGA,UMUMI,USUSA,UYURY,UZUZB,VAVAT,VCVCT,VEVEN,VGVGB,VIVIR,VNVNM,VUVUT,WFWLF,WSWSM,YEYEM,YTMYT,YUYUG,ZAZAF,ZMZMB,ZRZAR,ZWZWE".substring((i*6)+1,(i*6)+3);

}var result=new Array(java.util.Locale.isoCountries.length);
System.arraycopy(java.util.Locale.isoCountries,0,result,0,java.util.Locale.isoCountries.length);
return result;
});
c$.getISOLanguages=Clazz.defineMethod(c$,"getISOLanguages",
function(){
if(java.util.Locale.isoLanguages==null){
($t$=java.util.Locale.isoLanguages=new Array(Math.floor(",aaaar,ababk,afafr,amamh,arara,asasm,ayaym,azaze,babak,bebel,bgbul,bhbih,bibis,bnben,bobod,brbre,cacat,cocos,csces,cycym,dadan,dedeu,dzdzo,elell,eneng,eoepo,esspa,etest,eueus,fafas,fifin,fjfij,fofao,frfra,fyfry,gagai,gdgdh,glglg,gngrn,guguj,hahau,heheb,hihin,hrhrv,huhun,hyhye,iaina,idind,ieile,ikipk,inind,isisl,itita,iuiku,iwheb,jajpn,jiyid,jwjaw,kakat,kkkaz,klkal,kmkhm,knkan,kokor,kskas,kukur,kykir,lalat,lnlin,lolao,ltlit,lvlav,mgmlg,mimri,mkmkd,mlmal,mnmon,momol,mrmar,msmsa,mtmlt,mymya,nanau,nenep,nlnld,nonor,ococi,omorm,orori,papan,plpol,pspus,ptpor,quque,rmroh,rnrun,roron,rurus,rwkin,sasan,sdsnd,sgsag,shsrp,sisin,skslk,slslv,smsmo,snsna,sosom,sqsqi,srsrp,ssssw,stsot,susun,svswe,swswa,tatam,tetel,tgtgk,ththa,titir,tktuk,tltgl,tntsn,toton,trtur,tstso,tttat,twtwi,uguig,ukukr,ururd,uzuzb,vivie,vovol,wowol,xhxho,yiyid,yoyor,zazha,zhzho,zuzul".length/6)),java.util.Locale.prototype.isoLanguages=java.util.Locale.isoLanguages,$t$);
for(var i=0;i<java.util.Locale.isoLanguages.length;i++)java.util.Locale.isoLanguages[i]=",aaaar,ababk,afafr,amamh,arara,asasm,ayaym,azaze,babak,bebel,bgbul,bhbih,bibis,bnben,bobod,brbre,cacat,cocos,csces,cycym,dadan,dedeu,dzdzo,elell,eneng,eoepo,esspa,etest,eueus,fafas,fifin,fjfij,fofao,frfra,fyfry,gagai,gdgdh,glglg,gngrn,guguj,hahau,heheb,hihin,hrhrv,huhun,hyhye,iaina,idind,ieile,ikipk,inind,isisl,itita,iuiku,iwheb,jajpn,jiyid,jwjaw,kakat,kkkaz,klkal,kmkhm,knkan,kokor,kskas,kukur,kykir,lalat,lnlin,lolao,ltlit,lvlav,mgmlg,mimri,mkmkd,mlmal,mnmon,momol,mrmar,msmsa,mtmlt,mymya,nanau,nenep,nlnld,nonor,ococi,omorm,orori,papan,plpol,pspus,ptpor,quque,rmroh,rnrun,roron,rurus,rwkin,sasan,sdsnd,sgsag,shsrp,sisin,skslk,slslv,smsmo,snsna,sosom,sqsqi,srsrp,ssssw,stsot,susun,svswe,swswa,tatam,tetel,tgtgk,ththa,titir,tktuk,tltgl,tntsn,toton,trtur,tstso,tttat,twtwi,uguig,ukukr,ururd,uzuzb,vivie,vovol,wowol,xhxho,yiyid,yoyor,zazha,zhzho,zuzul".substring((i*6)+1,(i*6)+3);

}var result=new Array(java.util.Locale.isoLanguages.length);
System.arraycopy(java.util.Locale.isoLanguages,0,result,0,java.util.Locale.isoLanguages.length);
return result;
});
Clazz.defineMethod(c$,"getLanguage",
function(){
return this.language;
});
Clazz.defineMethod(c$,"getCountry",
function(){
return this.country;
});
Clazz.defineMethod(c$,"getVariant",
function(){
return this.variant;
});
Clazz.overrideMethod(c$,"toString",
function(){
var l=this.language.length!=0;
var c=this.country.length!=0;
var v=this.variant.length!=0;
var result=this.language;
if(c||(l&&v)){
result+='_'+this.country;
}if(v&&(l||c)){
result+='_'+this.variant;
}return result;
});
Clazz.defineMethod(c$,"getISO3Language",
function(){
var length=this.language.length;
if(length==0){
return"";
}var index=",aaaar,ababk,afafr,amamh,arara,asasm,ayaym,azaze,babak,bebel,bgbul,bhbih,bibis,bnben,bobod,brbre,cacat,cocos,csces,cycym,dadan,dedeu,dzdzo,elell,eneng,eoepo,esspa,etest,eueus,fafas,fifin,fjfij,fofao,frfra,fyfry,gagai,gdgdh,glglg,gngrn,guguj,hahau,heheb,hihin,hrhrv,huhun,hyhye,iaina,idind,ieile,ikipk,inind,isisl,itita,iuiku,iwheb,jajpn,jiyid,jwjaw,kakat,kkkaz,klkal,kmkhm,knkan,kokor,kskas,kukur,kykir,lalat,lnlin,lolao,ltlit,lvlav,mgmlg,mimri,mkmkd,mlmal,mnmon,momol,mrmar,msmsa,mtmlt,mymya,nanau,nenep,nlnld,nonor,ococi,omorm,orori,papan,plpol,pspus,ptpor,quque,rmroh,rnrun,roron,rurus,rwkin,sasan,sdsnd,sgsag,shsrp,sisin,skslk,slslv,smsmo,snsna,sosom,sqsqi,srsrp,ssssw,stsot,susun,svswe,swswa,tatam,tetel,tgtgk,ththa,titir,tktuk,tltgl,tntsn,toton,trtur,tstso,tttat,twtwi,uguig,ukukr,ururd,uzuzb,vivie,vovol,wowol,xhxho,yiyid,yoyor,zazha,zhzho,zuzul".indexOf(","+this.language);
if(index==-1||length!=2){
throw new java.util.MissingResourceException("Couldn't find 3-letter language code for "+this.language,"LocaleElements_"+this.toString(),"ShortLanguage");
}return",aaaar,ababk,afafr,amamh,arara,asasm,ayaym,azaze,babak,bebel,bgbul,bhbih,bibis,bnben,bobod,brbre,cacat,cocos,csces,cycym,dadan,dedeu,dzdzo,elell,eneng,eoepo,esspa,etest,eueus,fafas,fifin,fjfij,fofao,frfra,fyfry,gagai,gdgdh,glglg,gngrn,guguj,hahau,heheb,hihin,hrhrv,huhun,hyhye,iaina,idind,ieile,ikipk,inind,isisl,itita,iuiku,iwheb,jajpn,jiyid,jwjaw,kakat,kkkaz,klkal,kmkhm,knkan,kokor,kskas,kukur,kykir,lalat,lnlin,lolao,ltlit,lvlav,mgmlg,mimri,mkmkd,mlmal,mnmon,momol,mrmar,msmsa,mtmlt,mymya,nanau,nenep,nlnld,nonor,ococi,omorm,orori,papan,plpol,pspus,ptpor,quque,rmroh,rnrun,roron,rurus,rwkin,sasan,sdsnd,sgsag,shsrp,sisin,skslk,slslv,smsmo,snsna,sosom,sqsqi,srsrp,ssssw,stsot,susun,svswe,swswa,tatam,tetel,tgtgk,ththa,titir,tktuk,tltgl,tntsn,toton,trtur,tstso,tttat,twtwi,uguig,ukukr,ururd,uzuzb,vivie,vovol,wowol,xhxho,yiyid,yoyor,zazha,zhzho,zuzul".substring(index+3,index+6);
});
Clazz.defineMethod(c$,"getISO3Country",
function(){
var length=this.country.length;
if(length==0){
return"";
}var index=",ADAND,AEARE,AFAFG,AGATG,AIAIA,ALALB,AMARM,ANANT,AOAGO,AQATA,ARARG,ASASM,ATAUT,AUAUS,AWABW,AZAZE,BABIH,BBBRB,BDBGD,BEBEL,BFBFA,BGBGR,BHBHR,BIBDI,BJBEN,BMBMU,BNBRN,BOBOL,BRBRA,BSBHS,BTBTN,BVBVT,BWBWA,BYBLR,BZBLZ,CACAN,CCCCK,CFCAF,CGCOG,CHCHE,CICIV,CKCOK,CLCHL,CMCMR,CNCHN,COCOL,CRCRI,CUCUB,CVCPV,CXCXR,CYCYP,CZCZE,DEDEU,DJDJI,DKDNK,DMDMA,DODOM,DZDZA,ECECU,EEEST,EGEGY,EHESH,ERERI,ESESP,ETETH,FIFIN,FJFJI,FKFLK,FMFSM,FOFRO,FRFRA,FXFXX,GAGAB,GBGBR,GDGRD,GEGEO,GFGUF,GHGHA,GIGIB,GLGRL,GMGMB,GNGIN,GPGLP,GQGNQ,GRGRC,GSSGS,GTGTM,GUGUM,GWGNB,GYGUY,HKHKG,HMHMD,HNHND,HRHRV,HTHTI,HUHUN,IDIDN,IEIRL,ILISR,ININD,IOIOT,IQIRQ,IRIRN,ISISL,ITITA,JMJAM,JOJOR,JPJPN,KEKEN,KGKGZ,KHKHM,KIKIR,KMCOM,KNKNA,KPPRK,KRKOR,KWKWT,KYCYM,KZKAZ,LALAO,LBLBN,LCLCA,LILIE,LKLKA,LRLBR,LSLSO,LTLTU,LULUX,LVLVA,LYLBY,MAMAR,MCMCO,MDMDA,MGMDG,MHMHL,MKMKD,MLMLI,MMMMR,MNMNG,MOMAC,MPMNP,MQMTQ,MRMRT,MSMSR,MTMLT,MUMUS,MVMDV,MWMWI,MXMEX,MYMYS,MZMOZ,NANAM,NCNCL,NENER,NFNFK,NGNGA,NINIC,NLNLD,NONOR,NPNPL,NRNRU,NUNIU,NZNZL,OMOMN,PAPAN,PEPER,PFPYF,PGPNG,PHPHL,PKPAK,PLPOL,PMSPM,PNPCN,PRPRI,PTPRT,PWPLW,PYPRY,QAQAT,REREU,ROROM,RURUS,RWRWA,SASAU,SBSLB,SCSYC,SDSDN,SESWE,SGSGP,SHSHN,SISVN,SJSJM,SKSVK,SLSLE,SMSMR,SNSEN,SOSOM,SRSUR,STSTP,SVSLV,SYSYR,SZSWZ,TCTCA,TDTCD,TFATF,TGTGO,THTHA,TJTJK,TKTKL,TMTKM,TNTUN,TOTON,TPTMP,TRTUR,TTTTO,TVTUV,TWTWN,TZTZA,UAUKR,UGUGA,UMUMI,USUSA,UYURY,UZUZB,VAVAT,VCVCT,VEVEN,VGVGB,VIVIR,VNVNM,VUVUT,WFWLF,WSWSM,YEYEM,YTMYT,YUYUG,ZAZAF,ZMZMB,ZRZAR,ZWZWE".indexOf(","+this.country);
if(index==-1||length!=2){
throw new java.util.MissingResourceException("Couldn't find 3-letter country code for "+this.country,"LocaleElements_"+this.toString(),"ShortCountry");
}return",ADAND,AEARE,AFAFG,AGATG,AIAIA,ALALB,AMARM,ANANT,AOAGO,AQATA,ARARG,ASASM,ATAUT,AUAUS,AWABW,AZAZE,BABIH,BBBRB,BDBGD,BEBEL,BFBFA,BGBGR,BHBHR,BIBDI,BJBEN,BMBMU,BNBRN,BOBOL,BRBRA,BSBHS,BTBTN,BVBVT,BWBWA,BYBLR,BZBLZ,CACAN,CCCCK,CFCAF,CGCOG,CHCHE,CICIV,CKCOK,CLCHL,CMCMR,CNCHN,COCOL,CRCRI,CUCUB,CVCPV,CXCXR,CYCYP,CZCZE,DEDEU,DJDJI,DKDNK,DMDMA,DODOM,DZDZA,ECECU,EEEST,EGEGY,EHESH,ERERI,ESESP,ETETH,FIFIN,FJFJI,FKFLK,FMFSM,FOFRO,FRFRA,FXFXX,GAGAB,GBGBR,GDGRD,GEGEO,GFGUF,GHGHA,GIGIB,GLGRL,GMGMB,GNGIN,GPGLP,GQGNQ,GRGRC,GSSGS,GTGTM,GUGUM,GWGNB,GYGUY,HKHKG,HMHMD,HNHND,HRHRV,HTHTI,HUHUN,IDIDN,IEIRL,ILISR,ININD,IOIOT,IQIRQ,IRIRN,ISISL,ITITA,JMJAM,JOJOR,JPJPN,KEKEN,KGKGZ,KHKHM,KIKIR,KMCOM,KNKNA,KPPRK,KRKOR,KWKWT,KYCYM,KZKAZ,LALAO,LBLBN,LCLCA,LILIE,LKLKA,LRLBR,LSLSO,LTLTU,LULUX,LVLVA,LYLBY,MAMAR,MCMCO,MDMDA,MGMDG,MHMHL,MKMKD,MLMLI,MMMMR,MNMNG,MOMAC,MPMNP,MQMTQ,MRMRT,MSMSR,MTMLT,MUMUS,MVMDV,MWMWI,MXMEX,MYMYS,MZMOZ,NANAM,NCNCL,NENER,NFNFK,NGNGA,NINIC,NLNLD,NONOR,NPNPL,NRNRU,NUNIU,NZNZL,OMOMN,PAPAN,PEPER,PFPYF,PGPNG,PHPHL,PKPAK,PLPOL,PMSPM,PNPCN,PRPRI,PTPRT,PWPLW,PYPRY,QAQAT,REREU,ROROM,RURUS,RWRWA,SASAU,SBSLB,SCSYC,SDSDN,SESWE,SGSGP,SHSHN,SISVN,SJSJM,SKSVK,SLSLE,SMSMR,SNSEN,SOSOM,SRSUR,STSTP,SVSLV,SYSYR,SZSWZ,TCTCA,TDTCD,TFATF,TGTGO,THTHA,TJTJK,TKTKL,TMTKM,TNTUN,TOTON,TPTMP,TRTUR,TTTTO,TVTUV,TWTWN,TZTZA,UAUKR,UGUGA,UMUMI,USUSA,UYURY,UZUZB,VAVAT,VCVCT,VEVEN,VGVGB,VIVIR,VNVNM,VUVUT,WFWLF,WSWSM,YEYEM,YTMYT,YUYUG,ZAZAF,ZMZMB,ZRZAR,ZWZWE".substring(index+3,index+6);
});
Clazz.defineMethod(c$,"getDisplayLanguage",
function(){
return this.getDisplayLanguage(java.util.Locale.getDefault());
});
Clazz.defineMethod(c$,"getDisplayLanguage",
function(inLocale){
return inLocale.language;
},"java.util.Locale");
Clazz.defineMethod(c$,"getDisplayCountry",
function(){
return this.getDisplayCountry(java.util.Locale.getDefault());
});
Clazz.defineMethod(c$,"getDisplayCountry",
function(inLocale){
return inLocale.country;
},"java.util.Locale");
Clazz.defineMethod(c$,"getDisplayVariant",
function(){
return this.getDisplayVariant(java.util.Locale.getDefault());
});
Clazz.defineMethod(c$,"getDisplayVariant",
function(inLocale){
return inLocale.variant;
},"java.util.Locale");
Clazz.defineMethod(c$,"getDisplayName",
function(){
return this.getDisplayName(java.util.Locale.getDefault());
});
Clazz.defineMethod(c$,"getDisplayName",
function(inLocale){
var s=inLocale.language+"_"+inLocale.country;
var v=inLocale.variant;
if(v!=null&&v.length!=0){
return s+"("+v+")";
}else{
return s;
}
},"java.util.Locale");
Clazz.defineMethod(c$,"clone",
function(){
try{
var that=Clazz.superCall(this,java.util.Locale,"clone",[]);
return that;
}catch(e){
if(Clazz.instanceOf(e,CloneNotSupportedException)){
throw new InternalError();
}else{
throw e;
}
}
});
Clazz.overrideMethod(c$,"hashCode",
function(){
if(this.hashcode==-1){
this.hashcode=this.language.hashCode()^this.country.hashCode()^this.variant.hashCode();
}return this.hashcode;
});
Clazz.overrideMethod(c$,"equals",
function(obj){
if(this===obj)return true;
if(!(Clazz.instanceOf(obj,java.util.Locale)))return false;
var other=obj;
if(this.hashCode()!=other.hashCode())return false;
if(this.language!==other.language)return false;
if(this.country!==other.country)return false;
if(this.variant!==other.variant)return false;
return true;
},"~O");
Clazz.defineMethod(c$,"convertOldISOCodes",
($fz=function(language){
language=language.toLowerCase();
if(language==="he"){
return"iw";
}else if(language==="yi"){
return"ji";
}else if(language==="id"){
return"in";
}else{
return language;
}},$fz.isPrivate=true,$fz),"~S");
c$.ENGLISH=c$.prototype.ENGLISH=new java.util.Locale("en","","");
c$.FRENCH=c$.prototype.FRENCH=new java.util.Locale("fr","","");
c$.GERMAN=c$.prototype.GERMAN=new java.util.Locale("de","","");
c$.ITALIAN=c$.prototype.ITALIAN=new java.util.Locale("it","","");
c$.JAPANESE=c$.prototype.JAPANESE=new java.util.Locale("ja","","");
c$.KOREAN=c$.prototype.KOREAN=new java.util.Locale("ko","","");
c$.CHINESE=c$.prototype.CHINESE=new java.util.Locale("zh","","");
c$.SIMPLIFIED_CHINESE=c$.prototype.SIMPLIFIED_CHINESE=new java.util.Locale("zh","CN","");
c$.TRADITIONAL_CHINESE=c$.prototype.TRADITIONAL_CHINESE=new java.util.Locale("zh","TW","");
c$.FRANCE=c$.prototype.FRANCE=new java.util.Locale("fr","FR","");
c$.GERMANY=c$.prototype.GERMANY=new java.util.Locale("de","DE","");
c$.ITALY=c$.prototype.ITALY=new java.util.Locale("it","IT","");
c$.JAPAN=c$.prototype.JAPAN=new java.util.Locale("ja","JP","");
c$.KOREA=c$.prototype.KOREA=new java.util.Locale("ko","KR","");
c$.CHINA=c$.prototype.CHINA=new java.util.Locale("zh","CN","");
c$.PRC=c$.prototype.PRC=new java.util.Locale("zh","CN","");
c$.TAIWAN=c$.prototype.TAIWAN=new java.util.Locale("zh","TW","");
c$.UK=c$.prototype.UK=new java.util.Locale("en","GB","");
c$.US=c$.prototype.US=new java.util.Locale("en","US","");
c$.CANADA=c$.prototype.CANADA=new java.util.Locale("en","CA","");
c$.CANADA_FRENCH=c$.prototype.CANADA_FRENCH=new java.util.Locale("fr","CA","");
Clazz.defineStatics(c$,
"defaultLocale",null,
"isoLanguages",null,
"compressedIsoLanguages",",aaaar,ababk,afafr,amamh,arara,asasm,ayaym,azaze,babak,bebel,bgbul,bhbih,bibis,bnben,bobod,brbre,cacat,cocos,csces,cycym,dadan,dedeu,dzdzo,elell,eneng,eoepo,esspa,etest,eueus,fafas,fifin,fjfij,fofao,frfra,fyfry,gagai,gdgdh,glglg,gngrn,guguj,hahau,heheb,hihin,hrhrv,huhun,hyhye,iaina,idind,ieile,ikipk,inind,isisl,itita,iuiku,iwheb,jajpn,jiyid,jwjaw,kakat,kkkaz,klkal,kmkhm,knkan,kokor,kskas,kukur,kykir,lalat,lnlin,lolao,ltlit,lvlav,mgmlg,mimri,mkmkd,mlmal,mnmon,momol,mrmar,msmsa,mtmlt,mymya,nanau,nenep,nlnld,nonor,ococi,omorm,orori,papan,plpol,pspus,ptpor,quque,rmroh,rnrun,roron,rurus,rwkin,sasan,sdsnd,sgsag,shsrp,sisin,skslk,slslv,smsmo,snsna,sosom,sqsqi,srsrp,ssssw,stsot,susun,svswe,swswa,tatam,tetel,tgtgk,ththa,titir,tktuk,tltgl,tntsn,toton,trtur,tstso,tttat,twtwi,uguig,ukukr,ururd,uzuzb,vivie,vovol,wowol,xhxho,yiyid,yoyor,zazha,zhzho,zuzul",
"isoCountries",null,
"compressedIsoCountries",",ADAND,AEARE,AFAFG,AGATG,AIAIA,ALALB,AMARM,ANANT,AOAGO,AQATA,ARARG,ASASM,ATAUT,AUAUS,AWABW,AZAZE,BABIH,BBBRB,BDBGD,BEBEL,BFBFA,BGBGR,BHBHR,BIBDI,BJBEN,BMBMU,BNBRN,BOBOL,BRBRA,BSBHS,BTBTN,BVBVT,BWBWA,BYBLR,BZBLZ,CACAN,CCCCK,CFCAF,CGCOG,CHCHE,CICIV,CKCOK,CLCHL,CMCMR,CNCHN,COCOL,CRCRI,CUCUB,CVCPV,CXCXR,CYCYP,CZCZE,DEDEU,DJDJI,DKDNK,DMDMA,DODOM,DZDZA,ECECU,EEEST,EGEGY,EHESH,ERERI,ESESP,ETETH,FIFIN,FJFJI,FKFLK,FMFSM,FOFRO,FRFRA,FXFXX,GAGAB,GBGBR,GDGRD,GEGEO,GFGUF,GHGHA,GIGIB,GLGRL,GMGMB,GNGIN,GPGLP,GQGNQ,GRGRC,GSSGS,GTGTM,GUGUM,GWGNB,GYGUY,HKHKG,HMHMD,HNHND,HRHRV,HTHTI,HUHUN,IDIDN,IEIRL,ILISR,ININD,IOIOT,IQIRQ,IRIRN,ISISL,ITITA,JMJAM,JOJOR,JPJPN,KEKEN,KGKGZ,KHKHM,KIKIR,KMCOM,KNKNA,KPPRK,KRKOR,KWKWT,KYCYM,KZKAZ,LALAO,LBLBN,LCLCA,LILIE,LKLKA,LRLBR,LSLSO,LTLTU,LULUX,LVLVA,LYLBY,MAMAR,MCMCO,MDMDA,MGMDG,MHMHL,MKMKD,MLMLI,MMMMR,MNMNG,MOMAC,MPMNP,MQMTQ,MRMRT,MSMSR,MTMLT,MUMUS,MVMDV,MWMWI,MXMEX,MYMYS,MZMOZ,NANAM,NCNCL,NENER,NFNFK,NGNGA,NINIC,NLNLD,NONOR,NPNPL,NRNRU,NUNIU,NZNZL,OMOMN,PAPAN,PEPER,PFPYF,PGPNG,PHPHL,PKPAK,PLPOL,PMSPM,PNPCN,PRPRI,PTPRT,PWPLW,PYPRY,QAQAT,REREU,ROROM,RURUS,RWRWA,SASAU,SBSLB,SCSYC,SDSDN,SESWE,SGSGP,SHSHN,SISVN,SJSJM,SKSVK,SLSLE,SMSMR,SNSEN,SOSOM,SRSUR,STSTP,SVSLV,SYSYR,SZSWZ,TCTCA,TDTCD,TFATF,TGTGO,THTHA,TJTJK,TKTKL,TMTKM,TNTUN,TOTON,TPTMP,TRTUR,TTTTO,TVTUV,TWTWN,TZTZA,UAUKR,UGUGA,UMUMI,USUSA,UYURY,UZUZB,VAVAT,VCVCT,VEVEN,VGVGB,VIVIR,VNVNM,VUVUT,WFWLF,WSWSM,YEYEM,YTMYT,YUYUG,ZAZAF,ZMZMB,ZRZAR,ZWZWE");
});
