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
	VERSION=${VERSION:-} TAG=${TAG:-}  make -C pro clean
	VERSION=${VERSION:-} TAG=${TAG:-}  make -C pro
	mkdir -p en/dist/html; mv pro/en/dist/html en/dist/html/pro
	VERSION=${VERSION:-} TAG=${TAG:-}  make
}

main(){
	build
}

main