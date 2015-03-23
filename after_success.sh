#!/bin/bash

git clone "https://${GH_TOKEN}@github.com/skunenieki/skunenieki.github.io.git"
cp -r public/* skunenieki.github.io/
export C=`git rev-parse --verify HEAD`
cd skunenieki.github.io
git status
git config user.name "Martins Sipenko"
git config user.email "martins.sipenko@gmail.com"
git config push.default simple
git add --all .
git commit --allow-empty -m "Updating to $TRAVIS_REPO_SLUG@$C."
git push --quiet origin master
cd -

