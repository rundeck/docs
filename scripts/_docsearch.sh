#/bin/bash
set -eo pipefail

getapt () {
        sudo apt-get -y update
        sudo apt-get -y install curl git
}
getdocker () {
        curl -fsSL https://get.docker.com | sh
        sudo usermod -aG docker $USER
}

getdocsearch () {
        cd ~ && git clone https://github.com/algolia/docsearch-scraper.git
        cd ~/docsearch-scraper
        echo "APPLICATION_ID=$(APPLICATION_ID)" >> ~/docsearch-scraper/.env
        echo "API_KEY=$(API_KEY)" >> ~/docsearch-scraper/.env
}

pythonstuff () {
        sudo apt install -y python3-pip python3-distutils
        sh -c 'yes | pip3 install pipenv'
        pip uninstall dotenv
        pip uninstall python-dotenv
        pip install python-dotenv
        pip install dotenv
        pip install future
        pip install requests
}

execdocsearch () {
        ./docsearch docker:run ~/repo/.docsearch/config.json | grep -i "hits:" > /tmp/NB_HITS
}

hitcheck () {
        CI_NB_HITS=`cat /tmp/NB_HITS |awk '{print $3}'`
        N_CI_NB_HITS=${CI_NB_HITS//[ $'\001'-$'\037']}
        echo "CI_NB_HITS=$CI_NB_HITS"
        echo "NB_HITS=$NB_HITS"

        if [ "$N_CI_NB_HITS" -gt "$NB_HITS" ]
            then
                    echo "SUCCESS! CI_NB_HITS=$N_CI_NB_HITS"
            else
                    echo "ERROR! CI_NB_HITS=$N_CI_NB_HITS"
                    exit 1
        fi
}

main () {
        getapt
        getdocker
        getdocsearch
        pythonstuff
        execdocsearch
        hitcheck
}

main

