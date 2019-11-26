#!/usr/bin/env bash

ls -la

rm -rf tmp

git clone https://fkasy:${GITHUB_TOKEN}@github.com/ordered-online/infrastructure --recursive --branch=master tmp

cd tmp

git submodule update --remote --recursive --force

ls -la

git status

git add -A

git commit -m "Update Submodule on ${SERVICE} from Travis CI"

git push origin master