#!/bin/bash


usage() {
      grep '^#/' <"$0" | cut -c4- # prints the #/ lines above as usage info
}

die(){
    echo >&2 "$@" ; exit 2
}

#/ read_version_oss <VERS> <TAG>
#/ uses <VERS>-<TAG>, or version.number/version.tag from version.properties as version number
read_version(){
	local myvers=${1:-}
	local mytag=${2:-}
	if [ -n "$myvers" ] ; then
		VERSION=$myvers
		TAG=$mytag
	else
		VERSION=$(grep ^version.number= version.properties | cut -d= -f 2)
		TAG=$(grep ^version.tag= version.properties | cut -d= -f 2)
	fi

	if [ -n "$mytag" ] ; then	
		PROTAG=$mytag
	else
		PROTAG=$(grep ^proversion.tag= version.properties | cut -d= -f 2)
	fi
	
	PROVERSION=$(grep ^proversion.number= version.properties | cut -d= -f 2)
	
	
	if [ "$PROTAG" != "GA" ] ; then
		PROVERSION_FULL=${PROVERSION}-${PROTAG}
	else
		PROVERSION_FULL=${PROVERSION}
	fi
	if [ "$TAG" != "GA" ] ; then
		VERSION_FULL=${VERSION}-${TAG}
	else
		VERSION_FULL=${VERSION}
	fi
	echo "OSS Version: $VERSION_FULL"
	echo "PRO Version: $PROVERSION_FULL"
}
