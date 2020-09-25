var path = ClazzLoader.getClasspathFor ("javajs.img.package");
path = path.substring (0, path.lastIndexOf ("package.js"));
ClazzLoader.jarClasspath (path + "JpgEncoder.js", [
"javajs.img.DCT",
"$.Huffman",
"$.JpgEncoder",
"$.JpegObj"]);
