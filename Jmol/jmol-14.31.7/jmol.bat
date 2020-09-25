@echo off
rem Set JMOL_HOME to the Jmol installation directory.
rem
if "%JMOL_HOME%x"=="x" set JMOL_HOME="."
java -Xmx512m -jar "%JMOL_HOME%\Jmol.jar" %1 %2 %3 %4 %5 %6 %7 %8 %9
