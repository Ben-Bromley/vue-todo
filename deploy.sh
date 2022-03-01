#!/usr/bin/env sh

# abort on errors
set -e
# build
npm run build

# navigate into the build output directory
cd dist

# the block below duplicate index.html into a 404 page
# this ensures that navigating directly to a sub page or refreshing a sub page works

# copy the contents of index.html
fallback=$(<index.html)
# paste contents into 404.html
echo $fallback > 404.html


# do the git stuff
git init
git add -A
git commit -m 'deploy'

# to get this working, I had to add an ssh key, include --set-upstream, and capitalise the letters of my name for URI precision
git push -f --set-upstream git@github.com:Ben-Bromley/vuetilities.git master:gh-pages
cd -
