#!/bin/bash
#/ ci build script 

set -euo pipefail
IFS=$'\n\t'
readonly ARGS=("$@")
SCPTDIR=$( cd "$(dirname "$0")" && pwd)

. "$SCPTDIR/ci-common.sh"

# script for travis

build(){
	parse_travis_version
	
	if [ -z "$VERSION" ] ; then
		read_version 
	fi

	VERSION=${VERSION:-} TAG=${TAG:-}  make clean
	VERSION=${VERSION:-} TAG=${TAG:-}  make
}

main(){
	build
}

main