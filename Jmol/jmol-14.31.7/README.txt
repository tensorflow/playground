==============================================================================
===                                  Jmol                                  ===
==============================================================================
      Jmol: an open-source Java viewer for chemical structures in 3D, 
     with features for chemicals, crystals, materials and biomolecules.
==============================================================================

Note 3/23/2018: All Jmol Development is moving to GitHub. 

https://github.com/BobHanson/Jmol-SwingJS

Bob Hanson

 


Jmol is an open-source molecule viewer and editor written in Java.

Full information is available at http://www.jmol.org/

Usage questions and comments should be posted to jmol-users@lists.sourceforge.net

Development questions, suggestions and comments should be posted
to jmol-developers@lists.sf.net


List of files included:
-------------------


1 == Files with information ==

1.1 === README.txt ===
This file.

1.2 === LEAME.txt ===
The Spanish version of README.txt

1.3 === COPYRIGHT.txt ===
The copyright explanations regarding Jmol and its 3rd-party components.

1.4 === LICENSE.txt ===
The GNU Lesser General Public License, under which Jmol is released.

1.5 === CHANGES.txt ===
A list with a history of the feature additions in each version of Jmol.


2 == Batch and shell files ==
These can be used to start Jmol application from a command line and, 
particularly, to impose a certain combination of parameters 
(see http://wiki.jmol.org/index.php/Jmol_Application#Command_line_options).

2.1 === jmol ===
???? (Some kind of batch file)

2.2 === jmol.bat ===
A batch file to start Jmol application under Windows.

2.3 === jmol.mac ===
??? (Some kind of batch file, for the MacOS)

2.4 === jmol.sh ===
A shell script to start Jmol application under Unix-like systems, like Linux, 
BSD, Solaris and Cygwin for Windows.


3 == Files of Jmol application ==
This is used as a standalone program.

3.1 === Jmol.jar ===
The application executable file (a program written in Java). This works as any 
other program: opens in its own window, can be resized or minimized, admits 
drag-and-drop of files over it, has a top menu bar, can open and save files, 
etc. It can be open from the command line (particulary, using the shell or batch
files described above), but if Java is properly configured in your system, it's
usually enough to double-click on the file 
(see http://wiki.jmol.org/index.php/Jmol_Application#Starting_Jmol_Application 
for more details).

3.2 === JmolData.jar ===
This is a slimmed down version of Jmol.jar that lacks all visualization 
capabilities. So, it betrays the whole (classic) concept of what Jmol is, but 
with JmolData and some clever scripting you can get just about any information 
you want out of a model and output it any way you want.

It operates only from the command line, designed for extracting data from a 
model or set of models. You are limited to commands that don't have to do with 
visualization: there are bonds but no "sticks", atoms but no "dots", helices but
no "cartoons".


4 == Files of Jmol applet ==
These are used inside web pages, and include:
  Applet files  |  Core Javascript libraries  |  Optional Javascript libraries

4.1 === Applet files ===

4.1.1 ==== JmolApplet0.jar, JmolApplet0(severalSuffixes).jar ====
The applet, i.e. a version of the program that will only run when embedded in 
a web page.

The applet is divided up into several pieces according to their function, so 
that if a page does not require a component, that component is not downloaded 
from the server. 
It is still recommended that you put all JmolApplet0*.jar files on your server 
even if your page does not use the capabilities provided by some of the files, 
because the pop-up menu and Jmol console both allow users to access parts of 
Jmol you might not have considered.

This split version is the one that will be used by default if you use Jmol.js 
(which is the recommended method).
For that, use the simplest form of jmolInitialize(), just indicating the 
directory or folder containing the set of jar files:
 jmolInitialize("directory-containing-jar-files")
for example,
 jmolInitialize(".")  
     (if jar files are in the same folder as the web page)
 jmolInitialize("../jmol") 
     (if jar files are in a parallel folder, named 'jmol')

4.1.2 ==== JmolAppletSigned0.jar, JmolAppletSigned0(severalSuffixes).jar ====
An equivalent version of the applet, but this is a "signed" applet (a term in 
Java security language). This means it must be authorized by the web 
page visitor for it to run, but then it will have less security restrictions for
 file access. For example, it can access files on any part of the user's hard 
 disk or from any other web server.

Typically users get a message asking if they want to accept the "certificate" or
 if they "trust" the applet (''see notes below''). JmolAppletSigned.jar should 
 be used with this in mind. Other than reading files, Jmol does not currently 
 use other capabilities of signed applets, such as accessing the system 
 clipboard or writing files. Use only if you know what you are doing and have 
 considered the security issues.

To use this with Jmol.js, use the form:
 jmolInitialize("directory-containing-jar-files", true)
or
 jmolInitialize("directory-containing-jar-files", "JmolAppletSigned0.jar")

Notes:
* The security feature requesting to trust the applet may not always be enabled 
  on users' systems. 
* The message requesting permission will be displayed for each of the 14 (or 
  more) loadable files. 
* The user may have the option to trust the applet permanently and so avoid 
  having to give permission every time (s)he visits a page that uses Jmol.

4.1.3 ==== JmolApplet.jar ====
This is an all-in-one or monolithic file, kept mainly for compatibility with old
pages that call it explicitly. 
This single file is equivalent to the whole set of JmolApplet0*.jar files, 
explained above.
The recommended procedure is not to use this monolithic file, but the split 
version (JmolApplet0.jar etc.). In particular, Jmol.js uses the split version 
by default.

You may wish to use this if you want to keep your website simple or you just 
want to upload a single jar file whenever new versions are released. 
However, this will load Jmol slower than the split versions (described above), 
as all the modules (adding up to 2.4 MB), needed or not, must get loaded onto a 
user's machine before any structure is displayed.

To invoke JmolApplet.jar from Jmol.js, either:

a) put it in the directory containing the HTML page requiring it and do not use 
   jmolInitialize(), 

or 

b) identify it explicitly in jmolInitialize(), for example:
 jmolInitialize("directory-containing-jar-files", "JmolApplet.jar")

4.1.4 ==== JmolAppletSigned.jar ====
An equivalent version of the monolithic applet, but this is a "signed" applet 
(a term in Java security language). This means it must be authorized by the web 
page visitor for it to run, but then it will have less security restrictions for
 file access. For example, it can access files on any part of the user's hard 
 disk or from any other web server.

Typically users get a message asking if they want to accept the "certificate" or
if they "trust" the applet, but this security feature is not always enabled.
JmolAppletSigned.jar should be used with this in mind. Other than reading files,
Jmol does not currently utilize other capabilities of signed applets, such as 
accessing the System clipboard or writing files. Use only if you know what you 
are doing and have considered the security issues.

To invoke JmolAppletSigned.jar from Jmol.js, use:
 jmolInitialize("directory-containing-jar-files", "JmolAppletSigned.jar")

4.1.5 ==== Notes ====
# Given the descriptions, you will realize that the distribution package 
  contains 4 full copies of the applet (signed or unsigned, split or not).

  
4.2 === Core Javascript libraries ===  

4.2.1 ==== Jmol.js ====
The classic library, written in JavaScript language, that assists in the 
programming of web pages that use Jmol applet, without the need to know and 
write detailed JmolApplet code.

This library uses by default the split version of the applet (unsigned or 
signed).

Fully documented at http://jmol.org/jslibrary/

Jmol.js is phased out in Jmol v13, in favour of the object-oriented method 
and set of .js files (described next).

4.2.2 ==== JmolApplet.js ====
Creates the object for a Jmol applet.
 
4.2.3 ==== JmolCore.js ====
Contains functions that make the Jmol applets work but are not to be used by 
the webpage author (private functions). 

4.2.4 ==== JmolControls.js ====
Support for user-interface controls like buttons, links, checkboxes, etc. 

4.2.5 ==== JmolApi.js ====
Contains the Application Programming Interface, that is, functions that may be 
used by the webpage author to interface with the Jmol applets.


4.3 === Optional Javascript libraries ===

4.3.1 ==== JmolCD.js ====
The ChemDoodle extension: provides the means for using ChemDoodle Web Components 
(that uses JavaScript + HTML5 canvas or WebGL) instead of the
Jmol applets, for systems where Java is not available.

4.3.2 ==== JmolGLmol.js ====
The GLmol extension: provides the means for using GLmol (that uses WebGL + 
JavaScript) instead of the Jmol applets, for systems where Java is not available.

4.3.3 ==== JmolJME.js ====
Provides the means for adding a JME applet in the webpage (drawing of 2D chemical 
formulas) and communicate with Jmol applets.

4.3.4 ==== JmolJSV.js ====
Provides the means for adding a JSpecView applet (viewer for spectral data) in 
the webpage and communicate with Jmol applets.


5 == Accessory apps and applets ==

5.1 === ChimeToJmol.jar ===
Undocumented and experimental.
An application to convert Chime-using html pages into pages with JmolApplets. 

5.2 === JSpecViewApplet, JSpecViewAppletSigned ===
Unsigned and signed versions of the JSpecView applet, a viewer for spectral data 
that may be intercommunicated with Jmol applets. 
(See supporting .js file above) 

5.3 === JmolSmilesApplet.jar ===
This is currently not included in the distribution, but may be obtained from the
development site.

This is a lightweight applet, with no visible interface, that allows to check 
SMILES strings. This is particularly useful for comparison of stereochemistry, 
for example from structures drawn using the JME applet.

The same functionality is included in the regular JmolApplet.
