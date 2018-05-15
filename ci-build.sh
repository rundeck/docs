#!/bin/bash
#/ ci build script 

set -euo pipefail
IFS=$'\n\t'
readonly ARGS=("$@")


usage() {
      grep '^#/' <"$0" | cut -c4- # prints the #/ lines above as usage info
}
die(){
    echo >&2 "$@" ; exit 2
}


# script for travis

build(){
	make clean
	make
	make -C pro clean
	make -C pro
}

main(){
	build
}

main