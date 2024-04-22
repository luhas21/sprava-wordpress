#!/bin/bash

rsync -avz --delete --exclude='podklady' --exclude='.git' --exclude='.gitignore' --exclude='d' --exclude='.DS_Store' /Users/petrsahula/Local\ Sites/sprva-wordpress/app/public/wp-content/themes/sprava-wordpress scp@w01.tempurl.host:site/public_html/wp-content/themes/sprava-wordpress
