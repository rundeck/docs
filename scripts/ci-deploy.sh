#!/bin/bash
#/ ci deploy script with various actions

set -euo pipefail
IFS=$'\n\t'
readonly ARGS=("$@")
SCPTDIR=$( cd "$(dirname "$0")" && pwd)

. "$SCPTDIR/ci-common.sh"

DRYRUN=${DEPLOY_DRYRUN:-false}
WORKSPACE=$(pwd)

GH_TOKEN=${GH_TOKEN:-}

git_push(){
	local FARGS=("$@")
	if [ "$DRYRUN" == "true" ] ; then
		echo DRYRUN: git push "${FARGS[@]}"
	else
		git push "${FARGS[@]}"
	fi
}


# setup

config_git(){
	# Configure GIT
	if [ ! -f ~/.git-credentials ] && [ "$DRYRUN" != "true" ] ; then 
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
	   git pull origin master
	   git checkout master
	   rm -rf ./temp
	   #clean
	   cd ..
	fi
}

#/ add the docs to the docs$version branch in the rundeck-docs repo
gen_docs_publish_repo(){
	local RundeckVersion=$1
	local BRANCH="docs$RundeckVersion"
	local DOCS_ZIP="$WORKSPACE/dist/rundeck-docs-${RundeckVersion}.zip"

	clone_generated_docs_repo


	cd "$WORKSPACE/rundeck-docs"

	#/ try to fetch existing branch
	set +e
	git fetch origin "$BRANCH"
	local err=$?
	set -e
	echo "remote git fetch result: $err"
	if [  $err == 0 ] ; then
		echo "local checkout"
		set +e
		git branch -l | grep -q "$BRANCH"
		err=$?
		set -e
		echo "local branch already exists? $err"
		git checkout "$BRANCH"
	else
	    git checkout -b "$BRANCH"
	fi

	
	cd "$WORKSPACE"
	mkdir temp
	cd temp
	echo unzip "$DOCS_ZIP"
	unzip "$DOCS_ZIP"
	
	cd "$WORKSPACE/rundeck-docs"
	#/ remove any existing files
	git rm -r ./*
	cp -r "$WORKSPACE"/temp/html/* .
	rm -rf "$WORKSPACE/temp"
	git add .
	git commit -m "Added docs for version $RundeckVersion"
	git_push origin "$BRANCH"
}


## publish actions

clone_org_site_repo(){

	config_git
	cd $WORKSPACE

	if [ ! -d rundeck-org-site ] ; then
	   echo cloning rundeck-org-site...
	   git clone https://${GH_TOKEN}@github.com/rundeck/rundeck-org-site.git rundeck-org-site
	else
	   cd rundeck-org-site
	   git pull origin master
	   cd ..
	fi
}

#/ add a '$version' submodules pointing at the version
site_add_or_update_git_submodule(){
	local RundeckVersion=$1
	local update=${2:-no}

	clone_org_site_repo

	cd rundeck-org-site
	if [ -d $RundeckVersion ] && [ $update == 'yes' ] ; then
		git submodule update --init $RundeckVersion
		cd $RundeckVersion

		git pull origin docs$RundeckVersion

		cd ..
		git add $RundeckVersion
		
	else

		git submodule add -b docs$RundeckVersion https://github.com/rundeck/rundeck-docs.git $RundeckVersion
		git add $RundeckVersion
	fi

	#commit and push the changes
	git add -u .
	git commit -m "Add docs version ${RundeckVersion} "
	git_push origin master
}

#/ update the '/docs' path in org site to match the version
site_update_primary(){
	local RundeckVersion=$1

	clone_org_site_repo

	cd rundeck-org-site

	# change docs submodule to point to new branch
	git submodule update --init docs
	cd docs
	git fetch origin docs$RundeckVersion:docs$RundeckVersion
	git checkout docs$RundeckVersion
	cd ..
	git add docs

	#commit and push the changes
	git add -u .
	git commit -m "Update docs submodule to version ${RundeckVersion}"
	git_push origin master
}

publish_tag(){
	gen_docs_publish_repo ${VERSION_FULL}
	site_add_or_update_git_submodule ${VERSION_FULL} yes
}
publish_snapshot(){

	gen_docs_publish_repo ${VERSION_FULL}
	site_add_or_update_git_submodule ${VERSION_FULL} yes
}

main(){

	parse_travis_version
	
	if [ -z "$VERSION" ] ; then
		read_version 
	fi
	
	if [ "$PUBLISH_TAG" == 'yes' ]; then
		echo "Publishing docs via tag: $VERSION_FULL"
		publish_tag 
	fi
	
	if [ "$TAG" == "GA" ] && [ "$RELEASE" == "yes" ]; then
		echo "Update /docs to version: $VERSION_FULL"
		site_update_primary "${VERSION_FULL}"
	fi

	if [ "$PUBLISH_SNAPSHOT" == 'yes' ] ; then
		echo "Publish SNAPSHOT via branch ${VERSION}"
		publish_snapshot
	fi
}

main