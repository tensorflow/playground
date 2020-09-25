Clazz.declarePackage ("java.awt.event");
Clazz.load (["java.awt.event.InputEvent"], "java.awt.event.KeyEvent", ["java.lang.IllegalArgumentException"], function () {
c$ = Clazz.decorateAsClass (function () {
this.keyCode = 0;
this.keyChar = '\0';
this.keyLocation = 0;
Clazz.instantialize (this, arguments);
}, java.awt.event, "KeyEvent", java.awt.event.InputEvent);
Clazz.makeConstructor (c$, 
function (source, id, when, modifiers, keyCode, keyChar, keyLocation) {
Clazz.superConstructor (this, java.awt.event.KeyEvent, [source, id, when, modifiers]);
if (id == 400) {
if (keyChar == '\uffff') {
throw  new IllegalArgumentException ("invalid keyChar");
}if (keyCode != 0) {
throw  new IllegalArgumentException ("invalid keyCode");
}if (keyLocation != 0) {
throw  new IllegalArgumentException ("invalid keyLocation");
}}this.keyCode = keyCode;
this.keyChar = keyChar;
if ((keyLocation < 0) || (keyLocation > 4)) {
throw  new IllegalArgumentException ("invalid keyLocation");
}this.keyLocation = keyLocation;
if ((this.getModifiers () != 0) && (this.getModifiersEx () == 0)) {
this.setNewModifiers ();
} else if ((this.getModifiers () == 0) && (this.getModifiersEx () != 0)) {
this.setOldModifiers ();
}}, "~O,~N,~N,~N,~N,~S,~N");
Clazz.makeConstructor (c$, 
function (source, id, when, modifiers, keyCode, keyChar) {
this.construct (source, id, when, modifiers, keyCode, keyChar, 0);
}, "java.awt.Component,~N,~N,~N,~N,~S");
Clazz.defineMethod (c$, "getKeyCode", 
function () {
return this.keyCode;
});
Clazz.defineMethod (c$, "setKeyCode", 
function (keyCode) {
this.keyCode = keyCode;
}, "~N");
Clazz.defineMethod (c$, "getKeyChar", 
function () {
return this.keyChar;
});
Clazz.defineMethod (c$, "setKeyChar", 
function (keyChar) {
this.keyChar = keyChar;
}, "~S");
Clazz.defineMethod (c$, "setModifiers", 
function (modifiers) {
this.modifiers = modifiers;
if ((this.getModifiers () != 0) && (this.getModifiersEx () == 0)) {
this.setNewModifiers ();
} else if ((this.getModifiers () == 0) && (this.getModifiersEx () != 0)) {
this.setOldModifiers ();
}}, "~N");
Clazz.defineMethod (c$, "getKeyLocation", 
function () {
return this.keyLocation;
});
c$.getKeyText = Clazz.defineMethod (c$, "getKeyText", 
function (keyCode) {
return "[" + keyCode + "]";
}, "~N");
c$.getKeyModifiersText = Clazz.defineMethod (c$, "getKeyModifiersText", 
function (modifiers) {
return "[" + modifiers + "]";
}, "~N");
Clazz.defineMethod (c$, "isActionKey", 
function () {
switch (this.keyCode) {
case 36:
case 35:
case 33:
case 34:
case 38:
case 40:
case 37:
case 39:
case 65368:
case 226:
case 224:
case 227:
case 225:
case 112:
case 113:
case 114:
case 115:
case 116:
case 117:
case 118:
case 119:
case 120:
case 121:
case 122:
case 123:
case 61440:
case 61441:
case 61442:
case 61443:
case 61444:
case 61445:
case 61446:
case 61447:
case 61448:
case 61449:
case 61450:
case 61451:
case 154:
case 145:
case 20:
case 144:
case 19:
case 155:
case 24:
case 28:
case 29:
case 30:
case 31:
case 21:
case 25:
case 240:
case 241:
case 242:
case 243:
case 244:
case 245:
case 256:
case 257:
case 258:
case 259:
case 260:
case 261:
case 262:
case 263:
case 65481:
case 65483:
case 65485:
case 65487:
case 65489:
case 65488:
case 65482:
case 65480:
case 156:
case 524:
case 525:
return true;
}
return false;
});
Clazz.defineMethod (c$, "paramString", 
function () {
return "" + this;
});
Clazz.defineMethod (c$, "setNewModifiers", 
 function () {
if ((this.modifiers & 1) != 0) {
this.modifiers |= 64;
}if ((this.modifiers & 8) != 0) {
this.modifiers |= 512;
}if ((this.modifiers & 2) != 0) {
this.modifiers |= 128;
}if ((this.modifiers & 4) != 0) {
this.modifiers |= 256;
}if ((this.modifiers & 32) != 0) {
this.modifiers |= 8192;
}if ((this.modifiers & 16) != 0) {
this.modifiers |= 1024;
}});
Clazz.defineMethod (c$, "setOldModifiers", 
 function () {
if ((this.modifiers & 64) != 0) {
this.modifiers |= 1;
}if ((this.modifiers & 512) != 0) {
this.modifiers |= 8;
}if ((this.modifiers & 128) != 0) {
this.modifiers |= 2;
}if ((this.modifiers & 256) != 0) {
this.modifiers |= 4;
}if ((this.modifiers & 8192) != 0) {
this.modifiers |= 32;
}if ((this.modifiers & 1024) != 0) {
this.modifiers |= 16;
}});
Clazz.defineStatics (c$,
"KEY_FIRST", 400,
"KEY_LAST", 402,
"KEY_TYPED", 400,
"KEY_PRESSED", 401,
"KEY_RELEASED", 402,
"VK_ENTER", '\n',
"VK_BACK_SPACE", '\b',
"VK_TAB", '\t',
"VK_CANCEL", 0x03,
"VK_CLEAR", 0x0C,
"VK_SHIFT", 0x10,
"VK_CONTROL", 0x11,
"VK_ALT", 0x12,
"VK_PAUSE", 0x13,
"VK_CAPS_LOCK", 0x14,
"VK_ESCAPE", 0x1B,
"VK_SPACE", 0x20,
"VK_PAGE_UP", 0x21,
"VK_PAGE_DOWN", 0x22,
"VK_END", 0x23,
"VK_HOME", 0x24,
"VK_LEFT", 0x25,
"VK_UP", 0x26,
"VK_RIGHT", 0x27,
"VK_DOWN", 0x28,
"VK_COMMA", 0x2C,
"VK_MINUS", 0x2D,
"VK_PERIOD", 0x2E,
"VK_SLASH", 0x2F,
"VK_0", 0x30,
"VK_1", 0x31,
"VK_2", 0x32,
"VK_3", 0x33,
"VK_4", 0x34,
"VK_5", 0x35,
"VK_6", 0x36,
"VK_7", 0x37,
"VK_8", 0x38,
"VK_9", 0x39,
"VK_SEMICOLON", 0x3B,
"VK_EQUALS", 0x3D,
"VK_A", 0x41,
"VK_B", 0x42,
"VK_C", 0x43,
"VK_D", 0x44,
"VK_E", 0x45,
"VK_F", 0x46,
"VK_G", 0x47,
"VK_H", 0x48,
"VK_I", 0x49,
"VK_J", 0x4A,
"VK_K", 0x4B,
"VK_L", 0x4C,
"VK_M", 0x4D,
"VK_N", 0x4E,
"VK_O", 0x4F,
"VK_P", 0x50,
"VK_Q", 0x51,
"VK_R", 0x52,
"VK_S", 0x53,
"VK_T", 0x54,
"VK_U", 0x55,
"VK_V", 0x56,
"VK_W", 0x57,
"VK_X", 0x58,
"VK_Y", 0x59,
"VK_Z", 0x5A,
"VK_OPEN_BRACKET", 0x5B,
"VK_BACK_SLASH", 0x5C,
"VK_CLOSE_BRACKET", 0x5D,
"VK_NUMPAD0", 0x60,
"VK_NUMPAD1", 0x61,
"VK_NUMPAD2", 0x62,
"VK_NUMPAD3", 0x63,
"VK_NUMPAD4", 0x64,
"VK_NUMPAD5", 0x65,
"VK_NUMPAD6", 0x66,
"VK_NUMPAD7", 0x67,
"VK_NUMPAD8", 0x68,
"VK_NUMPAD9", 0x69,
"VK_MULTIPLY", 0x6A,
"VK_ADD", 0x6B,
"VK_SEPARATER", 0x6C,
"VK_SEPARATOR", 108,
"VK_SUBTRACT", 0x6D,
"VK_DECIMAL", 0x6E,
"VK_DIVIDE", 0x6F,
"VK_DELETE", 0x7F,
"VK_NUM_LOCK", 0x90,
"VK_SCROLL_LOCK", 0x91,
"VK_F1", 0x70,
"VK_F2", 0x71,
"VK_F3", 0x72,
"VK_F4", 0x73,
"VK_F5", 0x74,
"VK_F6", 0x75,
"VK_F7", 0x76,
"VK_F8", 0x77,
"VK_F9", 0x78,
"VK_F10", 0x79,
"VK_F11", 0x7A,
"VK_F12", 0x7B,
"VK_F13", 0xF000,
"VK_F14", 0xF001,
"VK_F15", 0xF002,
"VK_F16", 0xF003,
"VK_F17", 0xF004,
"VK_F18", 0xF005,
"VK_F19", 0xF006,
"VK_F20", 0xF007,
"VK_F21", 0xF008,
"VK_F22", 0xF009,
"VK_F23", 0xF00A,
"VK_F24", 0xF00B,
"VK_PRINTSCREEN", 0x9A,
"VK_INSERT", 0x9B,
"VK_HELP", 0x9C,
"VK_META", 0x9D,
"VK_BACK_QUOTE", 0xC0,
"VK_QUOTE", 0xDE,
"VK_KP_UP", 0xE0,
"VK_KP_DOWN", 0xE1,
"VK_KP_LEFT", 0xE2,
"VK_KP_RIGHT", 0xE3,
"VK_DEAD_GRAVE", 0x80,
"VK_DEAD_ACUTE", 0x81,
"VK_DEAD_CIRCUMFLEX", 0x82,
"VK_DEAD_TILDE", 0x83,
"VK_DEAD_MACRON", 0x84,
"VK_DEAD_BREVE", 0x85,
"VK_DEAD_ABOVEDOT", 0x86,
"VK_DEAD_DIAERESIS", 0x87,
"VK_DEAD_ABOVERING", 0x88,
"VK_DEAD_DOUBLEACUTE", 0x89,
"VK_DEAD_CARON", 0x8a,
"VK_DEAD_CEDILLA", 0x8b,
"VK_DEAD_OGONEK", 0x8c,
"VK_DEAD_IOTA", 0x8d,
"VK_DEAD_VOICED_SOUND", 0x8e,
"VK_DEAD_SEMIVOICED_SOUND", 0x8f,
"VK_AMPERSAND", 0x96,
"VK_ASTERISK", 0x97,
"VK_QUOTEDBL", 0x98,
"VK_LESS", 0x99,
"VK_GREATER", 0xa0,
"VK_BRACELEFT", 0xa1,
"VK_BRACERIGHT", 0xa2,
"VK_AT", 0x0200,
"VK_COLON", 0x0201,
"VK_CIRCUMFLEX", 0x0202,
"VK_DOLLAR", 0x0203,
"VK_EURO_SIGN", 0x0204,
"VK_EXCLAMATION_MARK", 0x0205,
"VK_INVERTED_EXCLAMATION_MARK", 0x0206,
"VK_LEFT_PARENTHESIS", 0x0207,
"VK_NUMBER_SIGN", 0x0208,
"VK_PLUS", 0x0209,
"VK_RIGHT_PARENTHESIS", 0x020A,
"VK_UNDERSCORE", 0x020B,
"VK_WINDOWS", 0x020C,
"VK_CONTEXT_MENU", 0x020D,
"VK_FINAL", 0x0018,
"VK_CONVERT", 0x001C,
"VK_NONCONVERT", 0x001D,
"VK_ACCEPT", 0x001E,
"VK_MODECHANGE", 0x001F,
"VK_KANA", 0x0015,
"VK_KANJI", 0x0019,
"VK_ALPHANUMERIC", 0x00F0,
"VK_KATAKANA", 0x00F1,
"VK_HIRAGANA", 0x00F2,
"VK_FULL_WIDTH", 0x00F3,
"VK_HALF_WIDTH", 0x00F4,
"VK_ROMAN_CHARACTERS", 0x00F5,
"VK_ALL_CANDIDATES", 0x0100,
"VK_PREVIOUS_CANDIDATE", 0x0101,
"VK_CODE_INPUT", 0x0102,
"VK_JAPANESE_KATAKANA", 0x0103,
"VK_JAPANESE_HIRAGANA", 0x0104,
"VK_JAPANESE_ROMAN", 0x0105,
"VK_KANA_LOCK", 0x0106,
"VK_INPUT_METHOD_ON_OFF", 0x0107,
"VK_CUT", 0xFFD1,
"VK_COPY", 0xFFCD,
"VK_PASTE", 0xFFCF,
"VK_UNDO", 0xFFCB,
"VK_AGAIN", 0xFFC9,
"VK_FIND", 0xFFD0,
"VK_PROPS", 0xFFCA,
"VK_STOP", 0xFFC8,
"VK_COMPOSE", 0xFF20,
"VK_ALT_GRAPH", 0xFF7E,
"VK_BEGIN", 0xFF58,
"VK_UNDEFINED", 0x0,
"CHAR_UNDEFINED", 0xFFFF,
"KEY_LOCATION_UNKNOWN", 0,
"KEY_LOCATION_STANDARD", 1,
"KEY_LOCATION_LEFT", 2,
"KEY_LOCATION_RIGHT", 3,
"KEY_LOCATION_NUMPAD", 4);
});
