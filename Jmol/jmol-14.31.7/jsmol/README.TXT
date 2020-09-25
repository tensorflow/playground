@source http://chemapps.stolaf.edu/jmol/jsmol
@author hansonr@stolaf.edu project started 8/26/2012

last revision: 11/26/2013

Language localization in Java applets is now handled in a new way, 
using jsmol/idioma/*.po files directly instead of a fleet of JAR
files, as was developed for HTML5. This means that web page developers
who are being selective about which files to upload should
upload jsmol/idioma along with jsmol/j2s and/or jsmol/java if they want
to enable language localization in menus and the conosole. 

JME.jar is not trusted-signed and has been dropped from this distibution.
  
revision: 11/23/2013

All Jmol and JSpecView code in JSmol is now signed with a 
secure code signing certificate in the name of "Integrated Graphics" 
(Robert M. Hanson DBA Integrated Graphics, registered in the state 
of Minnesota) by authority of Starfield Technologies/GoDaddy.com.

WHEN RUNNING JMOL/JAVA OR JSPECVIEW/JAVA BE CERTAIN THAT THE 
WARNING STATES THAT THE ORGANIZATION IS "Integrated Graphics".
IF IT DOES NOT, THEN IT IS POSSIBLE THAT THE OPEN-SOURCE 
JMOL PROJECT HAS BEEN COMPROMISED. PLEASE NOTIFY hansonr@stolaf.edu
IMMEDIATELY IF THIS IS THE CASE AND CONSIDER NOT USING THE APPLET.

revision: 8/17/13 (updated 11/26/2013)

JSmol -- Java(Script) web-based molecular viewer

see http://jmol.sourceforge.net  http://jsmol.sourceforge.net

http://chemapps.stolaf.edu/jmol/jsmol/jsmol.htm

This zip directory contains a complete Java->JavaScript code conversion for Jmol. 

Note that JSmol is not a <i>different</i> program than Jmol.
JSmol <i>is</i> Jmol, just compiled into JavaScript as well as Java byte code.
All development is done working with the trunk Jmol Java source, 
but compilation of that code creates both Java .class files and equivalent JavaScript .js files 

As such, JSmol has all of the features of Jmol: 

 full file reading (including binary formats)
 full Jmol scripting (including atom selection and Jmol Math)
 full Jmol shape object support
 full rendering, including pixel-based translucency
 full Jmol WRITE capability (requires server-side jsmol.php)
 full language localizaion using GetText
  
Wiki: http://wiki.jmol.org/index.php/Jmol_JavaScript_Object#JSmol

Status:

 complete Jmol code implementation in JavaScript
 Java2Script js compiler adapted successfully
 HTML5: slower rendering; but a full implementation of Jmol
 WebGL: partial only; fast rendering, including cartoons and isosurfaces (vdw, sasurface), not text
 
To do:

 WebGL option is limited; still no text, for example, and is not being actively pursued
 due to graphical limitations and absence on iPad.  

What's here:

MAIN DIRECTORIES:

idioma/       *.po language localization files for both Java and HTML5.

j2s/          java/       JavaScript versions of Java classes
              J/          JavaScript versions of Jmol classes (org.jmol)
              JZ/         JavaScript versions of JZlib (com.jcraft.jzlib)
              core/       package.js and selected minimized core JS files,
              img/        images used in the HTML5 version of JSmol (cover image "play" button) 
            
java/       Java JAR files for JmolApplet and JSpecView

jme/  (not) JME.jar is not trusted-signed and has been dropped from this distibution
jsme/       JSME files -- JavaScript Molecular Editor (Peter Ertl and Bruno Bienfait) -- see jsmetest.htm

ADDITIONAL DIRECTORIES:

data/       all the model and script files used by these test pages
flot/       files required by jmol-flot-energy.htm 
jquery/     original jQuery files adapted to make js/JSmoljQuery.js
            (modifications primarily allow binary AJAX)
js/         JSmolXXXX.js JavaScript files that are included in JSmol.min.js 
            as well as uncompressed coreXXX.js files; useful for debugging
            These include:
            
				j2sjmol.js
				JSmol.js
				JSmolApi.js
				JSmolApplet.js
				JSmolControls.js
				JSmolCore.js
				JSmolGLmol.js
				JSmolJME.js
				JSmoljQueryExt.js
				JSmolJSV.js
				JSmolThree.js
				JSmolTM.js

php/        contains jsmol.php, which is necessary on a server for some browsers
            to access binary files via AJAX.

FILES:

JSmol.min.js
============

All of the necessary files to start JSmol, minimized with the 
Google Closure Compiler, including:

   		jquery.js
   		JSmoljQueryExt.js
   		JSmolCore.js
   		JSmol.js
   		JSmolApplet.js
   		JSmolControls.js
   		JSmolApi.js
   		j2sjmol.js

JSmol.min.nojq.js
============

All of the above, but without jquery.js. 
(You must include jQuery separately.)

JSmol.lite.js
============

A very light-weight non-Jmol model viewer. Just balls and sticks. 

  		jquery.js
   		JSmoljQueryExt.js
  		JSmolCore.js
  		JSmolTM.js
 
JSmol.lite.nojq.js
============

A super light-weight non-Jmol model viewer. Just balls and sticks; no jQuery. 
(You must include jQuery separately.)

   		JSmoljQueryExt.js
  		JSmolCore.js
  		JSmolTM.js

jsmol.htm
=========

The main test page. Use this page as your starting point for the pages you write.
jsmol.htm is a general test of the integration of JSmol with JmolJSO.
It uses JSmol.min.js, which will call for files in j2s/ as needed.

On the server side, it uses jsmol.php for delivering cross-domain models into the viewer. 

lite.htm
==========

A demo of JSmol.lite.js reading a file from PubChem

liteNCI.htm
==========

A demo of JSmol.lite.js reading a file from NCI

lite3.htm
==========

A demo of JSmol.lite.js using HTML-encoded structure

lite4.htm
==========

A demo of JSmol.lite.js using site-based structure file

resize.htm
==========

A test of applet resizing


simple.htm
==========

A JavaScript equivalent of http://chemapps.stolaf.edu/jmol/simple.htm

simple2.htm
===========

An early JavaScript equivalent of http://chemapps.stolaf.edu/jmol/simple2.htm


sync2.htm
=========

Illustrating applet synchronization in JSmol/HTML5


vibrate.htm
===========

A page quickly made from the original Java version in http://chemapps.stolaf.edu/jmol/examples-12

test2.htm
=========

Bob's main test page that does not use JSmol.min.js and instead uses the files in js/
This Jmol page will automatically switch to different modes
depending upon browser capabilities. It is set to use HTML5, but you can change that.
Read the information in the file for details.

It uses the unminimized set of JSmolXXXX.js files
test2.htm bypassses j2s/core files and reads files
directly from j2s/J, and j2s/java. Note that in this mode
the popup menu and the Jmol console are not available.
It can uses the signed Jmol applet, the unsigned Jmol applet
with server-side help, or <a href="jsmol.sourceforge.net">JSmol</a> using 
HTML5 when WebGL is not available (iPad/iPhone/Android).
JSmol implements <a href="java2script.sourceforge.net">Java2Script</a> 
to recreate the entire Jmol Java applet in JavaScript.

Note that if test2.htm is on your LOCAL MACHINE, then the unsigned applet,
which is in java/, will not find the data files, which are in data/,
and even if you use the signed applet, then some browsers may not be able to
find those files on your local machine. Firefox/Windows is fine.

On the server side, it uses jsmol.php for 
delivering cross-domain models into the viewer. 


=======================================================

Credits:

Jmol code conversion to JavaScript by Bob Hanson. 
GLmol interface written by Takanori Nakane. 
Java2Script written by Zhou Renjian, et al.
Jzlib written by Atsuhiko Yamanaka.
Testing assistance by Duncan Blue, St. Olaf '17


=======================================================

Developer notes:

The creation of the files in j2s is now very easy. 
See README-DEVELOPER.TXT in the main directory.

We start with two Sourceforge projects in Eclipse: Jmol and JSmol.
Eclipse (must be 3.5 or 3.6) needs to include the Java2Script plug-in.

All the PROGRAMMING is done in the Jmol project.
JavaDoc @j2sNative sections allow indicating specific JavaScript/Java-only segments 

See development notes in JSmol project ANT task file buildfromjmol.xml

=======================================================

revision 8/17/2013 -- better description of compiled JavaScript files.
                   -- addition of JSmoljQueryExt.js

revision 7/28/2013 -- reorganization of directories

revision 12:32 PM 11/2/2012  -- java/jmolcore.z.js

revision 1:19 PM 11/13/2012  -- full binary file reading on all tested browsers

revision 9:20 PM 11/18/2012  -- full threading -- hover, spin, animation, vibration, timeout, delay, moveto

revision 11/21/2012 10:26:18 AM  -- Spartan binary file reading, measurements working

revision 8:11 AM 11/22/2012  -- color Labels fix; adds _version information; adds Jmol.debugCode (true to skip core.z.js)

revision 8:12 PM 11/23/2012  -- adds MO homo SQUARED

revision 12:23 PM 11/24/2012 -- j2sjmol.js code trimming, Jmol.clearConsole(applet), 
				automatic switching of consoles between applets on mouseClick and scipting,
                                better handling of console vs information

revision 5:46 AM 11/26/2012  -- clean, ordered execution solves multithreading issues in Firefox and for multiple applets

revision 6:48 AM 12/7/2012   -- threading work complete -- script queuing, !quit, !exit, TRY/CATCH, FUNCTION, DELAY, MOVE, etc.

revision 12/24/2012 9:48:49 PM -- JavaScript popup menu and (preliminary) console

revision 7:45 PM 1/2/2013  -- Chrome displaying default popup menu with menu right-mouse click

revision 9:22 AM 1/15/2013 -- Full writing of PNG, PNGJ, JMOL, ZIP and general WRITE command; requires jsmol.php on server currently
                           -- JavaScript version completely switched to double precision; subtle differences with Jmol may arise.

revision 1/17/2013 6:00:50 PM -- SMILES matching compare({*},{*},"isomer") fails (Java new int[n][] in SmilesMatcher)

revision 10:57 AM 2/23/2013 -- rearranging of files in jsmol/ directory; move of j2s/org/mol to j2s/J

revision 12:25 PM 3/16/2013 -- fully optimized with Mar 03 13 Java2Script compiler.

revision 3/18/2013 10:21:04 PM  -- localization working -- set LANGUAGE

revision 3/23/2013 1:12:18 AM -- added Info.coverImage, Info.coverTitle, Info.coverScript
                             -- j2s/img directory added, with play_make_live.jpg (Jonathan Gutow)
                             -- minimization fixed
                             -- JSmolJME upgraded to allow HTML5 option with JSME (Peter Ertl, Bruno Bienfait)
                              
revision 3/24/2013 3:39:35 AM -- JSmol.lite.js -- just reads MOL files and displays simply; 125K uncompressed; 44K compressed
                          