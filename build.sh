#!/bin/sh

echo 'Compiling Vue app my-account...'
# cd to path of currently running file
# wp-content/themes/gabb-redesign/vue/my-account
cd $(dirname $(realpath $0))
echo 'Installing my-account vue app...'
npm install --no-audit
echo 'Building my-account vue app...'
npm run build || exit 1
echo 'Build my-account complete.'
echo 'Finished compiling my-account Vue app.'
