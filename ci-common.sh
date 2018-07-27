#!/bin/bash

RELEASE=no
PUBLISH_TAG=no
PUBLISH_SNAPSHOT=no

VERSION=${VERSION:-}
TAG=${TAG:-}
VERSION_FULL=${VERSION_FULL:-}

TRAVIS_PULL_REQUEST=${TRAVIS_PULL_REQUEST:-}
TRAVIS_BRANCH=${TRAVIS_BRANCH:-}
TRAVIS_TAG=${TRAVIS_TAG:-}
TRAVIS_REPO_SLUG=${TRAVIS_REPO_SLUG:-}
TRAVIS=${TRAVIS:-}

usage() {
      grep '^#/' <"$0" | cut -c4- # prints the #/ lines above as usage info
}

die(){
    echo >&2 "$@" ; exit 2
}

parse_travis_version(){

	if [[ $TRAVIS_PULL_REQUEST == 'false' && $TRAVIS_REPO_SLUG == rundeck/docs && $TRAVIS_TAG =~ ^v[[:digit:]] ]]; then
		echo "On travis tag: $TRAVIS_TAG"

		local tvers=${TRAVIS_TAG:1}
		local ttag=GA
		local release=yes
		if [[ $tvers =~ -[[:alpha:][:digit:]]+$ ]] ; then
			ttag=${tvers#*-}
			tvers=${tvers%-*}
			release=no
		fi
		if [[ $ttag =~ ^maint ]] ; then
			ttag=GA
			release=no
		fi
		read_version ${tvers} ${ttag}
		PUBLISH_TAG=yes
		
		RELEASE=$release

	else
		if [[ $TRAVIS_PULL_REQUEST == 'false' ]] && [[ "$TRAVIS_REPO_SLUG" == rundeck/docs ]] && [ -n ${TRAVIS_BRANCH} ] ; then
			
			if  [[  $TRAVIS_BRANCH =~ ^[[:digit:]].*x$ ]]; then
				echo "Documentation branch ${TRAVIS_BRANCH}"
				read_version ${TRAVIS_BRANCH} SNAPSHOT
				PUBLISH_SNAPSHOT=yes
				

			elif  [[ $TRAVIS_BRANCH =~ ^master$ ]]; then
				echo "Master branch, not publishing"
			else
				echo "Not publishing branch $TRAVIS_BRANCH"
			fi
		fi
	fi
	if [ -n "$TRAVIS" ] ; then
		echo "parse_travis_version: "
		echo "	VERSION: $VERSION"
		echo "	TAG: $TAG"
		echo "	VERSION_FULL: $VERSION_FULL"
		echo "	PUBLISH_TAG: $PUBLISH_TAG"
		echo "	PUBLISH_SNAPSHOT: $PUBLISH_SNAPSHOT"
		echo "	RELEASE: $RELEASE"
	fi
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

	if [ "$TAG" != "GA" ] ; then
		VERSION_FULL=${VERSION}-${TAG}
	else
		VERSION_FULL=${VERSION}
	fi
	echo "OSS Version: $VERSION_FULL"
}
