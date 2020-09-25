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
