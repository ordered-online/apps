#!/usr/bin/env bash

git clone https://fkasy:${GITHUB_TOKEN}@github.com/ordered-online/documentation --branch=master tmp

cd tmp

cp ../README.md ${SERVICE}.md

ls -la

git status

git add ${SERVICE}.md

git commit -m "Build Documentation on ${SERVICE} from Travis CI"

git push origin master