#! /bin/bash

# To use this, be on the master branch and run this command.
# It will automagically merge master into gh-pages and push it. When it's done,
# it switches you over to master again

git checkout gh-pages
git merge master
git push origin gh-pages
git checkout master
