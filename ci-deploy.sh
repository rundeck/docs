#!/bin/bash
#/ ci deploy script with various actions

set -euo pipefail
IFS=$'\n\t'
readonly ARGS=("$@")

. ci-common.sh

DRYRUN=false
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

gen_docs_publish_repo(){
	local RundeckVersion=$1
	
	clone_generated_docs_repo

	cd $WORKSPACE/rundeck-docs
	sh load.sh $WORKSPACE/dist/rundeck-docs-${RundeckVersion}.zip ${RundeckVersion}
	git pull
	git commit -m "Added docs for version $RundeckVersion"
	git_push origin docs$RundeckVersion
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

#/ add a '$version' and 'pro$proversion' submodules pointing at the version
site_add_or_update_git_submodule(){
	local RundeckVersion=$1
	local RundeckProVersion=$2
	local update=${3:-no}

	clone_org_site_repo

	cd rundeck-org-site
	if [ -d $RundeckVersion ] && [ $update == 'yes'] ; then
		git submodule update --init $RundeckVersion
		cd $RundeckVersion

		git fetch origin docs$RundeckVersion:docs$RundeckVersion
		git checkout docs$RundeckVersion

		cd ..
		git add $RundeckVersion
		
		# link based on pro version
		if [ ! -f "pro$RundeckProVersion" ] ; then
			ln -s $RundeckVersion "pro$RundeckProVersion"
			git add pro$RundeckProVersion
		fi
	else

		git submodule add -b docs$RundeckVersion https://github.com/rundeck/rundeck-docs.git $RundeckVersion
		git add $RundeckVersion
		# link based on pro version
		ln -s $RundeckVersion "pro$RundeckProVersion"
		git add pro$RundeckProVersion
	fi

	#commit and push the changes
	git add -u .
	git commit -m "Add docs version ${RundeckVersion} (pro$RundeckProVersion)"
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
	git commit -m "Update docs submodule to version ${RundeckVersion} (pro$RundeckProVersion)"
	git_push origin master
}

publish_tag(){
	local do_release=${1:-no}
	gen_docs_publish_repo ${VERSION_FULL}
	site_add_or_update_git_submodule ${VERSION_FULL} ${PROVERSION_FULL}

	if [ "$TAG" == "GA" ] && [ "$do_release" == "yes" ]; then
		site_update_primary ${VERSION_FULL}
	fi
}
publish_snapshot(){

	gen_docs_publish_repo ${VERSION_FULL}
	site_add_or_update_git_submodule ${VERSION_FULL} ${PROVERSION_FULL} yes
}

main(){

	parse_travis_version
	
	if [ -z $VERSION ] ; then
		read_version 
	fi
	if [ $PUBLISH_TAG == 'yes' ]; then
		echo "Publishing docs via tag: $VERSION_FULL"
		echo "(RELEASE: $RELEASE)"
		publish_tag ${RELEASE}
	else
		if [ $PUBLISH_SNAPSHOT == 'yes' ] ; then
			echo "Publish SNAPSHOT via branch ${VERSION}"
			publish_snapshot
		fi
	fi
}

main