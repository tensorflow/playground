All JSmol distribution is now through the Jmol project.

See http://sourceforge.net/projects/jmol/files/

After unzipping a Jmol distribution file, 
look for JSmol.zip and unzip that. 

Depending upon what you want to use HTML5 or JAVA:

HTML5
-----

JSmol.min.js   required if no other jQuery
or
JSmol.min.nojq.js  required if you provide jQuery

j2s/     required (JavaScript files)
idioma/  recommended (adds language localization)


JAVA
----

JSmol.min.js   required if no other jQuery
or
JSmol.min.nojq.js  required if you provide jQuery

java/    required (JAR files)
idioma/  recommended (adds language localization)


DEBUGGING without minimized files:
---------------------------------
in addition to the above...
jquery/  required (unless you are providing your own version of jQuery)
js/      required (contains unminified JSmol*.js files and j2sjmol.js)

<script type="text/javascript" src="jquery/jquery.js"></script>
<script type="text/javascript" src="js/JSmoljQueryExt.js"></script>
<script type="text/javascript" src="js/JSmolCore.js"></script>
<script type="text/javascript" src="js/JSmolApplet.js"></script>
<script type="text/javascript" src="js/JSmolApi.js"></script>
<script type="text/javascript" src="js/JSmolControls.js"></script>
<script type="text/javascript" src="js/j2sjmol.js"></script>
<script type="text/javascript" src="js/JSmol.js"></script>
<script type="text/javascript" src="js/JSmolConsole.js"></script>
<script type="text/javascript" src="js/JSmolMenu.js"></script>



