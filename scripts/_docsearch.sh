#!/bin/bash
set -eo pipefail

getapt () {
        sudo apt-get -y update
        sudo apt-get -y install curl git
}

getdocker () {
        # Check if Docker is already installed
        if command -v docker &> /dev/null; then
                echo "Docker is already installed"
                return 0
        fi
        
        echo "Installing Docker..."
        curl -fsSL https://get.docker.com | sh
        sudo usermod -aG docker $USER
}

getdocsearch () {
        # Clone to the repo directory instead of home
        cd ~/repo && git clone https://github.com/algolia/docsearch-scraper.git
        cd ~/repo/docsearch-scraper
        echo "APPLICATION_ID=$APPLICATION_ID" >> ~/repo/docsearch-scraper/.env
        echo "API_KEY=$API_KEY" >> ~/repo/docsearch-scraper/.env
}

# pythonstuff () {
#         sudo apt install -y python3-pip python3-distutils
#         # Use pip3 consistently and fix package installation order
#         pip3 install --user pipenv
#         # Remove problematic uninstalls and use pip3
#         pip3 install --user python-dotenv
#         pip3 install --user future
#         pip3 install --user requests
# }

execdocsearch () {
        # Change to the correct directory and use direct Docker approach
        cd ~/repo/docsearch-scraper
        
        # Pull the latest image
        docker pull algolia/docsearch-scraper:latest
        
        if docker run --rm \
            --env-file=.env \
            -e CONFIG=/config/config.json \
            -v $(pwd):/docsearch-scraper \
            -v ~/repo/.docsearch:/config \
            algolia/docsearch-scraper:latest 2>&1 | tee /tmp/docsearch_output | grep -i "hits:" > /tmp/NB_HITS; then
                echo "Docsearch completed successfully"
        else
                echo "Docsearch failed, checking output..."
                cat /tmp/docsearch_output
                exit 1
        fi
}

hitcheck () {
        if [ ! -f /tmp/NB_HITS ]; then
                echo "ERROR: No hits file found"
                exit 1
        fi
        
        CI_NB_HITS=`cat /tmp/NB_HITS | awk '{print $3}'`
        N_CI_NB_HITS=${CI_NB_HITS//[ $'\001'-$'\037']}
        echo "CI_NB_HITS=$CI_NB_HITS"
        echo "NB_HITS=$NB_HITS"

        if [ "$N_CI_NB_HITS" -gt "$NB_HITS" ]; then
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
        # pythonstuff  # Not needed for direct Docker approach
        execdocsearch
        hitcheck
}

main