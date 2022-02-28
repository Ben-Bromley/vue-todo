#!/usr/bin/env sh

# abort on errors
set -e
# build
npm run build

# navigate into the build output directory
cd dist

git init
git add -A
git commit -m 'deploy'

# had to add ssh key, include --set-upstream, and capitalise the letters of my name for URI precision
git push -f --set-upstream git@github.com:Ben-Bromley/vuetilities.git master:gh-pages
cd -
