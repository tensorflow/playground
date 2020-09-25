#!/bin/sh

# Collect -D & -m options as java arguments
command=java
while [ `echo $1 | egrep '^-D|^-m' | wc -l` != 0 ]; do
	command="$command $1"
	shift
done

# Determine installation location
if [ "$JMOL_HOME" = "" ]; then
	binDir=${0%/*}
	if [ "$binDir" = "$0" ]; then
		# Ran from local directory
		binDir=$PWD
	fi
	# Resolve symlinks.
	program="$0"
	while [ -L "$program" ]; do
		ls=`/bin/ls -ld "$program"`
		link=`/usr/bin/expr "$ls" : '.*-> \(.*\)$'`
		if /usr/bin/expr "$link" : '.*/.*' > /dev/null; then
		program="$link"
		else
		program="`/usr/bin/dirname $program`/$link"
		fi
	done
	binDir=`dirname $program`
fi

JMOL_HOME=${JMOL_HOME:-$binDir}
libDir=${JMOL_HOME}/jars

if [ ! -e ${JMOL_HOME}/Jmol.jar ]; then
	echo "Jmol could not find its installed files."
	exit
fi

$command -Djmol.home="$JMOL_HOME" -jar ${JMOL_HOME}/Jmol.jar "$@"
