//CHECKJS  E:\js\gca\site\scroller.js 8/18/2008 6:51:31 PM
// scroller.js gives simple div-based scroll
// Bob Hanson 9:22 PM 7/21/2005
// VERY simple div-based scroller.
// body needs onload=initScrollers()
//   then, somewhere: document.write(newScroller())
//   with optional parameters: newScroller(name,caption,fCallback,width,x,y,isvertical,minvalue,maxvalue,initialvalue,factor)
// fCallback must be string form of function, using _n, _v, _p (name, value, position)
// For example, "newChart(Chart,'_n','_v','_p')
// to set a scroller value from code, use resetScroller()
Scrollers={}
isScrollerInitialized=false

function checkScroll(name){
	var pos=0
	var value=0
	var d=0
	var S=Scrollers[name]
	d=document.getElementById("scr_"+name)
	pos=(S.isvertical?d.scrollTop:d.scrollLeft)
	if(pos!=S.pos){
		S.pos=pos //0 to 20*width
		S.value=value=scrollValue(name)
		setScrollCaption(name)
		if(S.isinitialized)setTimeout(strScrollValues(S,S.callback),10)
	}
}

function initScrollers(){
	setTimeout('resetScroller("",-1)',100)
}

function newScroller(name,caption,fCallback,width,x,y,isvertical,minvalue,maxvalue,initialvalue,factor,fmouseup){
	if(!name)name="scroll-test"
	if(!caption)caption="testing: pos=_p value=_v"
	if(!fCallback)fCallback="testScroll"
	if(!width)width=300
	if(isNaN(x))x=100
	if(isNaN(y))y=100
	if(!isvertical)isvertical=0
	if(!minvalue)minvalue=0
	if(!maxvalue)maxvalue=100
	if(isNaN(initialvalue))initialvalue=(maxvalue + minvalue)/2
	if(!factor)factor=4
	var s=""
	var sout=""
	var S=Scrollers[name]={}
	S.name=name
	S.caption=caption
	S.width=width
	S.x=x
	S.y=y
	S.isvertical=isvertical
	S.maxvalue=maxvalue
	S.minvalue=minvalue
	S.callback=fCallback
	S.value=initialvalue
	S.factor=factor
	S.initialvalue=initialvalue
	var pos = (x < 0 ? "" : "position:absolute:left:" +  (isvertical ? (x-20) + ";top:" + y : x+";top:"+(y-40)))
	if(isvertical){
		sout="\n<div id=scr_"+name+"_outer style=\" " + pos + ";width:1000;height:"+width+"\">"
		+"\n<div id=scr_"+name+"  onscroll=\"checkScroll('"+name+"')\" style=\" width:30;height:"+width+";overflow:auto\">"
		+"\n<img src=transp.gif width=1 height="+(width*(factor+1))+">"
		+"\n</div><span id=scr_"+name+"_caption>"+caption+"</span></div>"
	}else{
		sout="\n<div id=scr_"+name+"_outer style=\" " + pos + ";height:10;width:"+width+"\">"
		+"\n<div id=scr_"+name+"  onscroll=\"checkScroll('"+name+"')\" style=\"height:30;width:"+width+";overflow:auto\">"
		+"<img src=transp.gif height=1 width="+(width*(factor+1))+">"
		+"</div><span id=scr_"+name+"_caption>"+caption+"</span></div>"
	}
	S.div=sout
	return sout
}

function resetScroller(which,value){
	for(var name in Scrollers){if(!which||name==which){
			Scrollers[name].isinitialized=false
			setScrollValue(name,0)
			setScrollValue(name,(value>=0?value:Scrollers[name].initialvalue),1)
			Scrollers[name].isinitialized=true
	}}
}

function scrollValue(name){
	var S=Scrollers[name]
	var value=S.pos/(S.width*S.factor)*(S.maxvalue - S.minvalue) + S.minvalue
	if(S.magnitude>1)value=Math.floor(value)
	if(S.magnitude==1)value=Math.floor(value*100)/100
	return value
}

function setScrollCaption(name){
	var caption=""
	var S=Scrollers[name]
	if(S.caption.indexOf("_")>=0){
		caption=strScrollValues(S,S.caption)
		//document.title=name+" "+caption
		document.getElementById("scr_"+name+"_caption").innerHTML=caption
	}
}

function setScrollPosition(name,pos){
	var d=0
	var S=Scrollers[name]
	d=document.getElementById("scr_"+name)
	if(S.isvertical){
		d.scrollTop=pos
	}else{
		d.scrollLeft=pos
	}
	S.pos=pos
	S.value=scrollValue(name)
	setScrollCaption(name)
}

function setScrollValue(name,value,dotrigger){
	var S=Scrollers[name]
	var pos=Math.floor((value - S.minvalue)/(S.maxvalue - S.minvalue)*S.width*S.factor)
	S.pos=pos
	S.value=scrollValue(name)
	setScrollPosition(name,pos)
	//	if(dotrigger)checkScroll(name)
}

function strScrollValues(S,what){
	return (what + "('_n',_v,_p)").replace(/\_n/,S.name).replace(/\_p/,S.pos).replace(/\_v/,S.value)
}

function testScroll(name,value,position){
	document.title="this is function testScroll('"+name+"',"+value+","+position+")"
}

