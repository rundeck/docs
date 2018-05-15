#!/bin/bash
#/ ci deploy script with various actions

set -euo pipefail
IFS=$'\n\t'
readonly ARGS=("$@")

WORKSPACE=$(pwd)

VERSION=${VERSION}
TAG=${TAG}
VERSION_FULL=${VERSION_FULL}

PROVERSION=${PROVERSION}
PROTAG=${PROTAG}
PROVERSION_FULL=${PROVERSION_FULL}

usage() {
      grep '^#/' <"$0" | cut -c4- # prints the #/ lines above as usage info
}

die(){
    echo >&2 "$@" ; exit 2
}

read_version_oss(){
	VERSION=$(shell grep version.number= version.properties | cut -d= -f 2)
	TAG=$(shell grep version.tag= version.properties | cut -d= -f 2)
	
	if [ "$TAG" != "GA" ] ; then
		VERSION_FULL=$(VERSION)-$(TAG)
	else
		VERSION_FULL=$(VERSION)
	fi
}

read_version_pro(){
	PROVERSION=$(shell grep proversion.number= version.properties | cut -d= -f 2)
	PROTAG=$(shell grep proversion.tag= version.properties | cut -d= -f 2)
	
	if [ "$PROTAG" != "GA" ] ; then
		PROVERSION_FULL=$(PROVERSION)-$(PROTAG)
	else
		PROVERSION_FULL=$(PROVERSION)
	fi
}

# setup

config_git(){
	# Configure GIT
	if [ ! -f ~/.git-credentials ] ; then 
		git config --global credential.helper "store --file=~/.git-credentials"
		echo "https://$GH_TOKEN:@github.com" > ~/.git-credentials

		git config --global user.name "$GIT_NAME"
		git config --global user.email "$GIT_EMAIL"
	fi
}

# deploy actions

clone_generated_docs_repo(){
	
	config_git

	if [ ! -d rundeck-docs ] ; then
		echo cloning rundeck-docs ...
		git clone https://${GH_TOKEN}@github.com/rundeck/rundeck-docs.git $WORKSPACE/rundeck-docs
	else
	   cd rundeck-docs
	   git pull
	   cd ..
	fi
}

gen_docs_publish_repo(){
	local RundeckVersion=$1
	
	clone_generated_docs_repo

	cd $WORKSPACE/rundeck-docs
	sh load.sh ../dist/rundeck-docs-${RundeckVersion}.zip ${RundeckVersion}
	git commit -m "Added docs for version $RundeckVersion"
	git push origin docs$RundeckVersion
}


## publish actions

clone_org_site_repo(){

	config_git

	if [ ! -d rundeck-org-site ] ; then
	   echo cloning rundeck-org-site...
	   git clone https://${GH_TOKEN}@github.com/rundeck/rundeck-org-site.git rundeck-org-site
	else
	   cd rundeck-org-site
	   git pull
	   cd ..
	fi
}

#/ add a '$version' and 'pro$proversion' submodules pointing at the version
site_add_git_submodule(){
	local RundeckVersion=$1
	local RundeckProVersion=$2

	clone_org_site_repo

	cd rundeck-org-site

	git submodule add -b docs$RundeckVersion https://github.com/rundeck/rundeck-docs.git $RundeckVersion
	git add $RundeckVersion
	# link based on pro version
	ln -s $RundeckVersion "pro$RundeckProVersion"
	git add pro$RundeckProVersion

	#commit and push the changes
	git add -u .
	git commit -m "Add docs version ${RundeckVersion} (pro$RundeckProVersion)"
	git push origin master
}

#/ update the '/docs' path in org site to match the version
site_update_primary(){
	local RundeckVersion=$1

	clone_org_site_repo

	# change docs submodule to point to new branch
	git submodule update --init docs
	cd docs
	git fetch origin docs$RundeckVersion:docs$RundeckVersion
	git checkout docs$RundeckVersion
	cd ..
	git add docs

	#commit and push the changes
	git add -u .
	git commit -m "Update docs submodule to version ${RundeckVersion} (pro$RundeckProVersion)"
	git push origin master
}

travis_publish_tag(){
	gen_docs_publish_repo ${VERSION}
	site_add_git_submodule $RundeckVersion $RundeckProVersion
	site_update_primary ${VERSION}
}

main(){
	read_version_oss
	read_version_pro

	if [[ $TRAVIS_PULL_REQUEST == 'false' && $TRAVIS_REPO_SLUG == rundeck/docs && $TRAVIS_TAG =~ ^v[[:digit:]] ]]; then
		echo "Publishing docs: $TRAVIS_TAG"

		travis_publish_tag ${TRAVIS_TAG:1}
	else
		echo "Not a tag, skipping publish..."
		if [[ $TRAVIS_BRANCH =~ ^master$ ]]; then
			echo "Master branch, TODO: publish snapshot"
		fi
	fi
}

main