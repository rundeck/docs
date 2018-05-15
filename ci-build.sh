#!/bin/bash
#/ ci build script 

set -euo pipefail
IFS=$'\n\t'
readonly ARGS=("$@")


. ci-common.sh
MAKE_ARGS=

TRAVIS_PULL_REQUEST=${TRAVIS_PULL_REQUEST:-}
TRAVIS_BRANCH=${TRAVIS_BRANCH:-}
TRAVIS_TAG=${TRAVIS_TAG:-}
TRAVIS_REPO_SLUG=${TRAVIS_REPO_SLUG:-}
VERSION=${VERSION:-}
TAG=${TAG:-}
# script for travis

build(){

	if [[ $TRAVIS_PULL_REQUEST == 'false' && $TRAVIS_REPO_SLUG == rundeck/docs && $TRAVIS_TAG =~ ^v[[:digit:]] ]]; then
		echo "Building docs: $TRAVIS_TAG"

		read_version ${TRAVIS_TAG:1} GA
	else
		if [[ $TRAVIS_PULL_REQUEST == 'false' ]] && [ -n ${TRAVIS_BRANCH} ] ; then
			echo "Build on branch ${TRAVIS_BRANCH}"
			if  [[  $TRAVIS_BRANCH =~ ^[[:digit:]] ]]; then
				read_version ${TRAVIS_BRANCH} SNAPSHOT
			fi
		fi
	fi
	if [ -z $VERSION ] ; then
		read_version 
	fi

	echo args "${VERSION} ${TAG}"
	VERSION=${VERSION:-} TAG=${TAG:-}  make clean
	VERSION=${VERSION:-} TAG=${TAG:-}  make
	VERSION=${VERSION:-} TAG=${TAG:-}  make -C pro clean
	VERSION=${VERSION:-} TAG=${TAG:-}  make -C pro
}

main(){
	build
}

main