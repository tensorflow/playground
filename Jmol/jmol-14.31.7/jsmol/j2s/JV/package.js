var path = ClazzLoader.getClasspathFor ("JV.package");
path = path.substring (0, path.lastIndexOf ("package.js"));
ClazzLoader.jarClasspath (path + "ActionManager.js", [
"JV.MotionPoint",
"$.ActionManager",
"$.Gesture"]);
ClazzLoader.jarClasspath (path + "StateManager.js", [
"JV.Connection",
"$.Scene",
"$.StateManager",
"$.Connections"]);
