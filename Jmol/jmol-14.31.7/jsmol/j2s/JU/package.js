var path = ClazzLoader.getClasspathFor ("JU.package");
path = path.substring (0, path.lastIndexOf ("package.js"));
ClazzLoader.jarClasspath (path + "Int2IntHash.js", [
"JU.Int2IntHash",
"$.Int2IntHashEntry"]);
