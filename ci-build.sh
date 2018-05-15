#!/bin/bash
#/ ci build script 

set -euo pipefail
IFS=$'\n\t'
readonly ARGS=("$@")

. ci-common.sh

# script for travis

build(){
	parse_travis_version
	
	if [ -z $VERSION ] ; then
		read_version 
	fi

	VERSION=${VERSION:-} TAG=${TAG:-}  make clean
	VERSION=${VERSION:-} TAG=${TAG:-}  make
	VERSION=${VERSION:-} TAG=${TAG:-}  make -C pro clean
	VERSION=${VERSION:-} TAG=${TAG:-}  make -C pro
}

main(){
	build
}

main