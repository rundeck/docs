#!/bin/bash -e
	
export IFS=$'\n'
basepath=dist/html/
input=$(echo "$@" | sed -e 's#docs/en/##g')
count=0
for line in $(rg --with-filename --type markdown '^.*\[[^\]]*\]\(([^\)]*)\).*$' -r '$1' $input | sort -u); do
    url=$(echo "$line" | cut -d : -f 2-)
    if [[ $url != http* ]] && [[ $url != \#* ]]; then
        file=$(echo "$line" | cut -d : -f 1)
        url="${url%#*}"
        fullpath="$basepath$(dirname "$file")/$url"
        if [[ ! -e $fullpath ]]; then
            echo "$line"
            count=$(($count+1))
        fi
    fi
done

if [[ $count -gt 0 ]]; then
    exit 1
else
    exit 0
fi
