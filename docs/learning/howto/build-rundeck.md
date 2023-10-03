# Build Rundeck on Ubuntu Linux and macOS from source code
Rundeck Community users occasionally contribute their knowledge to the source code (for example, they may have fixed a bug). In this article, we will show you how to build Rundeck from the source code available on GitHub so you can contribute back to the project or add any custom new functionality.

## Requirements
* A GitHub account
* Ubuntu Linux 22.04 Operating System with `git` [installed](https://www.digitalocean.com/community/tutorials/how-to-install-git-on-ubuntu-20-04).

## Cloning and building Rundeck

### On Ubuntu
Here are the steps to clone and build the Rundeck Open Source Project from the official repository under Ubuntu Linux-based systems.
1. Install npm:
	```
	sudo apt-get install npm
	```
2. Install nodejs:
	```
	curl -sL https://deb.nodesource.com/setup_12.x | sudo bash -
	sudo apt-get -y install nodejs
	```
3. Fork the Rundeck repository on your GitHub account.  Go to the Rundeck project in Github: `https://github.com/rundeck/rundeck` and click on the "Fork" button. Follow the fork process and you will see a copy of the Rundeck repository in your GitHub account.
	![](/assets/img/buildrd1.png)
4. Download your forked Rundeck source code from GitHub:
	```
	git clone https://github.com/YourGitHub/rundeck
	```
5. Build Rundeck following these steps:
	```
	cd rundeck
	./gradlew clean build -x test -x integrationTest
	```
The last step skips the basic integration tests, you can avoid that by using the`./gradlew build` command. However, it takes more time to finish.
6. Now, the WAR file is located at r`undeck/rundeckapp/build/libs/` path.

### On MacOS
The process is pretty similar.
1. Update/upgrade [brew](https://brew.sh/) on your computer:
	```
	brew update
	```
	and then:
	```
	brew upgrade
	```
2. Install npm:
	```
	brew install npm
	```
3. install nodejs
	```
	brew install node
	```
4. Fork the Rundeck repository on your GitHub account by visiting the Rundeck project in Github URL: `https://github.com/rundeck/rundeck` and clicking on the "Fork" button. Follow the fork process and you will see a copy of the Rundeck repository in your GitHub account.
	![](/assets/img/buildrd1.png)
5. Download your Rundeck fork source code from GitHub:
	```
	git clone https://github.com/YourGitHub/rundeck
	```
6. Build Rundeck following these steps:
	```
	cd rundeck
	./gradlew clean build -x test -x integrationTest
	```
	
## Contributing to Rundeck
After testing your changes you can create a pull request in the official Rundeck GitHub Repository. 

### Push Changes
First, push your changes to your repository following these steps:
1. To add files changes for commit, use the following command
	```
	git add .
	```
2. Then, make a local commit by
	```
	git commit
	```
3. Once you make your local commit, you can push it to your remote GitHub fork.
	```
	git push
	```

### Create Pull Request
With your repository updated, you can start the Pull Request process by following these steps:
1. Go to your GitHub forked Rundeck repository.
2. Click on the "Pull Request" tab.
3. Click on "New Pull Request".
4. Click on "Create Pull Request". 
The Pull Request has been created and the Rundeck Development team will check the changes before approving them.

## Resources
[Rundeck GitHub Repository](https://github.com/rundeck/rundeck).